import os
import re
import json
import urllib.request
import urllib.error
from pathlib import Path
from typing import List, Optional, Dict, Any
from dotenv import load_dotenv

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

# -----------------------------
# Base Directories & Environment
# -----------------------------
SCRIPT_DIR = Path(__file__).resolve().parent
BACKEND_DIR = SCRIPT_DIR.parent
ROOT_DIR = BACKEND_DIR.parent

# Load .env from possible locations
for env_path in [BACKEND_DIR / ".env", SCRIPT_DIR / ".env", ROOT_DIR / ".env"]:
    if env_path.exists():
        load_dotenv(dotenv_path=env_path)
        break
else:
    load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "").strip()

# Preferred models in priority order
MODEL_CANDIDATES = [
    "gemini-3.6-flash",
    "gemini-3.5-flash",
    "gemini-3.7-flash",
    "gemini-3.5-flash-lite",
    "gemini-3.1-flash-lite",
]

# -----------------------------
# FastAPI App & CORS Setup
# -----------------------------
app = FastAPI(title="Hammad Portfolio AI Chatbot", version="2.5.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://portfolio-newiota.vercel.app/"],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Question(BaseModel):
    query: str
    session_id: Optional[str] = "default"


# -----------------------------
# Lightweight Fast RAG Store
# -----------------------------
DATA_DIR = SCRIPT_DIR / "Portfolio Data"
if not DATA_DIR.exists():
    alt_dir = SCRIPT_DIR / "portfolio_data"
    if alt_dir.exists():
        DATA_DIR = alt_dir


class DocumentChunk:
    def __init__(self, content: str, source: str, section: str = ""):
        self.content = content.strip()
        self.source = source
        self.section = section
        # Pre-tokenize words for fast BM25/keyword scoring
        self.words = set(re.findall(r"\w+", self.content.lower()))


class PortfolioKnowledgeBase:
    def __init__(self, data_dir: Path):
        self.data_dir = data_dir
        self.chunks: List[DocumentChunk] = []
        self.full_context: str = ""
        self.load_documents()

    def load_documents(self):
        self.chunks = []
        full_texts = []

        if not self.data_dir.exists():
            print(f"[RAG] Warning: Data directory not found at {self.data_dir}")
            return

        for file_path in sorted(self.data_dir.glob("*.txt")):
            try:
                raw_text = file_path.read_text(encoding="utf-8").strip()
                if not raw_text:
                    continue

                source_name = file_path.stem.replace("_", " ").title()
                full_texts.append(f"=== {source_name.upper()} ===\n{raw_text}")

                # Split document into logical sections / paragraphs for retrieval
                paragraphs = re.split(r"\n\s*\n+", raw_text)
                current_chunk = []
                current_length = 0

                for para in paragraphs:
                    para = para.strip()
                    if not para:
                        continue

                    # Group small paragraphs into ~400-800 character chunks
                    if current_length + len(para) > 600 and current_chunk:
                        chunk_text = "\n\n".join(current_chunk)
                        self.chunks.append(DocumentChunk(content=chunk_text, source=source_name))
                        current_chunk = [para]
                        current_length = len(para)
                    else:
                        current_chunk.append(para)
                        current_length += len(para)

                if current_chunk:
                    chunk_text = "\n\n".join(current_chunk)
                    self.chunks.append(DocumentChunk(content=chunk_text, source=source_name))

            except Exception as e:
                print(f"[RAG] Error reading {file_path}: {e}")

        self.full_context = "\n\n".join(full_texts)
        print(f"[RAG] Indexed {len(self.chunks)} knowledge chunks from {self.data_dir}")

    def retrieve(self, query: str, top_k: int = 5) -> Dict[str, Any]:
        """Fast keyword-overlap and term-density scoring for relevant context retrieval."""
        if not self.chunks:
            return {"context": self.full_context, "sources": ["Portfolio Data"]}

        query_tokens = [t.lower() for t in re.findall(r"\w+", query) if len(t) > 2]
        if not query_tokens:
            # Return high-level summary or full context
            return {
                "context": self.full_context[:4000],
                "sources": list(dict.fromkeys(c.source for c in self.chunks[:top_k]))
            }

        # Score chunks based on token matches, phrase matching, and term density
        scored_chunks = []
        query_str_lower = query.lower()

        for chunk in self.chunks:
            score = 0.0
            content_lower = chunk.content.lower()

            # Exact multi-word matching bonus
            if query_str_lower in content_lower:
                score += 15.0

            # Token overlap score
            matches = 0
            for token in query_tokens:
                if token in content_lower:
                    matches += 1
                    # Give higher weight to rarer/longer terms
                    score += 2.0 + min(len(token) * 0.2, 2.0)
                    if token in chunk.words:
                        score += 1.0

            if matches > 0:
                # Add ratio bonus
                score += (matches / len(query_tokens)) * 5.0
                scored_chunks.append((score, chunk))

        scored_chunks.sort(key=lambda x: x[0], reverse=True)
        top_chunks = [chunk for _, chunk in scored_chunks[:top_k]]

        if not top_chunks:
            # Fallback to general context
            return {
                "context": self.full_context[:5000],
                "sources": list(dict.fromkeys(c.source for c in self.chunks[:3]))
            }

        retrieved_context = "\n\n---\n\n".join(c.content for c in top_chunks)
        sources = list(dict.fromkeys(c.source for c in top_chunks))

        return {"context": retrieved_context, "sources": sources}


# Initialize Knowledge Base instantly
knowledge_base = PortfolioKnowledgeBase(DATA_DIR)


# -----------------------------
# Direct Gemini API Caller
# -----------------------------
def call_gemini_api(prompt: str, system_instruction: str) -> Dict[str, Any]:
    """Calls Gemini REST API with automated fallback across candidate models."""
    api_key = os.getenv("GOOGLE_API_KEY", "").strip() or GOOGLE_API_KEY
    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="Google API key is not configured in .env file."
        )

    payload = {
        "system_instruction": {
            "parts": [{"text": system_instruction}]
        },
        "contents": [
            {
                "parts": [{"text": prompt}]
            }
        ],
        "generationConfig": {
            "temperature": 0.3,
            "maxOutputTokens": 800,
        }
    }
    data_bytes = json.dumps(payload).encode("utf-8")
    last_error = None

    for model_name in MODEL_CANDIDATES:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={api_key}"
        req = urllib.request.Request(
            url,
            data=data_bytes,
            headers={"Content-Type": "application/json"}
        )
        try:
            with urllib.request.urlopen(req, timeout=15) as response:
                if response.status == 200:
                    res_json = json.loads(response.read().decode("utf-8"))
                    candidates = res_json.get("candidates", [])
                    if candidates:
                        candidate = candidates[0]
                        parts = candidate.get("content", {}).get("parts", [])
                        text = "".join(p.get("text", "") for p in parts).strip()
                        if text:
                            return {
                                "answer": text,
                                "model": model_name,
                                "status": "success"
                            }
        except urllib.error.HTTPError as e:
            err_body = e.read().decode("utf-8", errors="ignore")
            print(f"[Gemini API] Model {model_name} HTTP {e.code}: {err_body}")
            if e.code == 429:
                # Quota exceeded
                last_error = f"API Quota exceeded (HTTP 429). Please check API limits."
            else:
                last_error = f"HTTP {e.code} on {model_name}: {err_body}"
        except Exception as e:
            print(f"[Gemini API] Model {model_name} error: {e}")
            last_error = str(e)

    raise HTTPException(
        status_code=503,
        detail=f"AI service temporarily unavailable. Details: {last_error}"
    )


def generate_rag_answer(user_query: str) -> dict:
    """Retrieves relevant context and produces a warm, accurate answer about Hammad."""
    retrieval_res = knowledge_base.retrieve(user_query, top_k=5)
    context_text = retrieval_res["context"]
    sources = retrieval_res["sources"]

    system_instruction = f"""You are the personal AI assistant on Muhammad Hammad Imran's portfolio website (he goes by Hammad).
Your goal is to answer visitor questions accurately, professionally, and warmly based on his portfolio information.

Key Guidelines:
- Answer representing Hammad accurately and enthusiastically (you can use "Hammad" or speak on his behalf as his portfolio assistant).
- Use ONLY the provided portfolio context to answer questions about his background, education, skills, projects, and developer identity.
- If asked something not mentioned in the context, politely clarify that it is not covered in his portfolio information.
- Format responses clearly and concisely with markdown (bullet points, bold text for key terms) when appropriate.

Portfolio Context:
{context_text}
"""

    gemini_res = call_gemini_api(prompt=user_query, system_instruction=system_instruction)
    return {
        "answer": gemini_res["answer"],
        "sources": sources,
        "model": gemini_res["model"],
        "status": "success"
    }


# -----------------------------
# API Endpoints
# -----------------------------
@app.get("/")
def read_root():
    api_key_set = bool(os.getenv("GOOGLE_API_KEY", "").strip() or GOOGLE_API_KEY)
    return {
        "status": "online",
        "service": "Hammad's Portfolio RAG Chatbot API",
        "has_api_key": api_key_set,
        "knowledge_chunks": len(knowledge_base.chunks),
        "version": "2.5.0"
    }


@app.get("/health")
def health_check():
    api_key_set = bool(os.getenv("GOOGLE_API_KEY", "").strip() or GOOGLE_API_KEY)
    return {
        "status": "healthy",
        "api_key_configured": api_key_set,
        "knowledge_indexed": len(knowledge_base.chunks) > 0
    }


@app.post("/chat")
async def chat(question: Question):
    query_text = (question.query or "").strip()
    if not query_text:
        raise HTTPException(status_code=400, detail="Query cannot be empty.")

    try:
        result = generate_rag_answer(query_text)
        return result
    except HTTPException:
        raise
    except Exception as e:
        print(f"[Chat Endpoint Error]: {e}")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)