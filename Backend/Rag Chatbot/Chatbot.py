import os
import sys
from pathlib import Path
from typing import List, Optional
from dotenv import load_dotenv

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

# Google GenAI SDK & LangChain
from google import genai
from google.genai import types
from langchain_chroma import Chroma
from langchain_core.documents import Document
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_text_splitters import CharacterTextSplitter

# -----------------------------
# Base Directories & Environment
# -----------------------------
SCRIPT_DIR = Path(__file__).resolve().parent
BACKEND_DIR = SCRIPT_DIR.parent

# Search for .env in current dir and parent Backend dir
env_candidates = [
    SCRIPT_DIR / ".env",
    BACKEND_DIR / ".env",
    BACKEND_DIR.parent / ".env",
]

env_loaded = False
for env_path in env_candidates:
    if env_path.exists():
        load_dotenv(dotenv_path=env_path)
        env_loaded = True
        break

if not env_loaded:
    load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# -----------------------------
# FastAPI App & CORS Setup
# -----------------------------
app = FastAPI(title="Hammad Portfolio AI Chatbot", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for local development and portfolio hosting
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Question(BaseModel):
    query: str
    session_id: Optional[str] = "default"


# -----------------------------
# Portfolio Data Loading & Vector Store
# -----------------------------
DATA_DIR = SCRIPT_DIR / "Portfolio Data"
PERSIST_DIR = SCRIPT_DIR / "portfolio_vector_db"

MODEL_CANDIDATES = [
    "gemini-3.5-flash",
    "gemini-3.6-flash",
    "gemini-3.5-flash-lite",
    "gemini-3.1-flash-lite",
    "gemini-3.7-flash",
]


def load_portfolio_documents() -> List[Document]:
    """Load and parse all .txt documents from Portfolio Data directory."""
    documents: List[Document] = []
    
    # Check alternate naming if needed
    target_dir = DATA_DIR
    if not target_dir.exists():
        alt_dir = SCRIPT_DIR / "portfolio_data"
        if alt_dir.exists():
            target_dir = alt_dir

    if not target_dir.exists():
        print(f"Warning: Portfolio data directory not found at {target_dir}")
        return documents

    for file_path in target_dir.glob("*.txt"):
        try:
            content = file_path.read_text(encoding="utf-8").strip()
            if content:
                doc = Document(
                    page_content=content,
                    metadata={"source": file_path.stem}
                )
                documents.append(doc)
                print(f"Loaded {file_path.name} ({len(content)} characters)")
        except Exception as e:
            print(f"Error loading {file_path}: {e}")

    return documents


def get_vector_store():
    """Initializes or loads the Chroma vector database."""
    if not GOOGLE_API_KEY:
        print("Warning: GOOGLE_API_KEY is not set.")
        return None

    embedding_model = GoogleGenerativeAIEmbeddings(
        model="models/gemini-embedding-001",
        google_api_key=GOOGLE_API_KEY
    )

    if PERSIST_DIR.exists() and any(PERSIST_DIR.iterdir()):
        print(f"Loading existing vector store from {PERSIST_DIR}...")
        vectorstore = Chroma(
            persist_directory=str(PERSIST_DIR),
            embedding_function=embedding_model
        )
    else:
        print("Building new Chroma vector store from portfolio documents...")
        docs = load_portfolio_documents()
        if not docs:
            print("No documents found to index!")
            return None

        # Split documents into chunks for precise semantic retrieval
        text_splitter = CharacterTextSplitter(
            chunk_size=800,
            chunk_overlap=150,
            separator="\n"
        )
        chunks = text_splitter.split_documents(docs)
        print(f"Created {len(chunks)} chunks for vector store.")

        vectorstore = Chroma.from_documents(
            documents=chunks,
            embedding=embedding_model,
            persist_directory=str(PERSIST_DIR)
        )

    return vectorstore


# Initialize vectorstore and GenAI client on startup
genai_client: Optional[genai.Client] = None
vector_store = None
retriever = None

if GOOGLE_API_KEY:
    try:
        genai_client = genai.Client(api_key=GOOGLE_API_KEY)
        vector_store = get_vector_store()
        if vector_store:
            retriever = vector_store.as_retriever(
                search_type="similarity",
                search_kwargs={"k": 4}
            )
        print("RAG System initialized successfully!")
    except Exception as e:
        print(f"Error during RAG initialization: {e}")


def generate_rag_answer(user_query: str) -> dict:
    """Retrieves relevant context and generates an answer using Gemini."""
    if not genai_client:
        raise HTTPException(
            status_code=500,
            detail="Google API client is not configured. Please check your .env file."
        )

    # 1. Retrieve relevant context chunks
    sources = []
    context_text = ""
    
    if retriever:
        try:
            matched_docs = retriever.invoke(user_query)
            context_text = "\n\n---\n\n".join([doc.page_content for doc in matched_docs])
            sources = list(dict.fromkeys([doc.metadata.get("source", "unknown") for doc in matched_docs]))
        except Exception as e:
            print(f"Retrieval warning: {e}")

    # Fallback to full context if vector search returned nothing
    if not context_text:
        all_docs = load_portfolio_documents()
        context_text = "\n\n---\n\n".join([doc.page_content for doc in all_docs])
        sources = [doc.metadata.get("source", "portfolio") for doc in all_docs]

    # 2. Prepare System Prompt
    system_instruction = f"""You are the personal AI assistant for Muhammad Hammad Imran (preferred name: Hammad) on his portfolio website.
Your goal is to answer visitor questions accurately, professionally, and warmly based on his portfolio information.

Key Guidelines:
- Answer from Hammad's perspective ("I", "my") or represent Hammad accurately.
- Use the provided context to answer questions about skills, projects, education, background, and developer experience.
- If asked about information not in the context, politely state that you do not have that specific information.
- Keep responses clear, concise (2-4 sentences or structured bullet points when helpful).

Portfolio Context:
{context_text}
"""

    # 3. Call Gemini with automatic model fallback
    last_error = None
    for model_name in MODEL_CANDIDATES:
        try:
            response = genai_client.models.generate_content(
                model=model_name,
                contents=user_query,
                config=types.GenerateContentConfig(
                    system_instruction=system_instruction,
                    temperature=0.3
                )
            )
            if response and response.text:
                return {
                    "answer": response.text.strip(),
                    "sources": sources,
                    "model": model_name,
                    "status": "success"
                }
        except Exception as e:
            print(f"Model {model_name} failed: {e}. Trying fallback...")
            last_error = e

    raise HTTPException(
        status_code=503,
        detail=f"AI service temporarily unavailable. Details: {last_error}"
    )


# -----------------------------
# Endpoints
# -----------------------------
@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "Hammad's Portfolio RAG Chatbot API is running",
        "has_api_key": bool(GOOGLE_API_KEY),
        "vector_store_ready": vector_store is not None
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "api_key_configured": bool(GOOGLE_API_KEY)
    }


@app.post("/chat")
async def chat(question: Question):
    if not question.query or not question.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty.")

    try:
        result = generate_rag_answer(question.query.strip())
        return result
    except HTTPException:
        raise
    except Exception as e:
        print(f"Chat endpoint error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)