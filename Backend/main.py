import os
import sys
from pathlib import Path
import uvicorn

# Add 'Rag Chatbot' folder to sys.path
rag_dir = Path(__file__).resolve().parent / "Rag Chatbot"
if str(rag_dir) not in sys.path:
    sys.path.insert(0, str(rag_dir))

from Chatbot import app

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)

