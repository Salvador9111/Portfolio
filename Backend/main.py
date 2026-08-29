import os
import sys
from pathlib import Path
import uvicorn

# Ensure 'Rag Chatbot' directory is in sys.path
rag_dir = Path(__file__).resolve().parent / "Rag Chatbot"
if str(rag_dir) not in sys.path:
    sys.path.insert(0, str(rag_dir))

from Chatbot import app

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "127.0.0.1")
    print(f"Starting Hammad's Portfolio AI Chatbot API on http://{host}:{port} ...")
    uvicorn.run("main:app", host=host, port=port, reload=False)
