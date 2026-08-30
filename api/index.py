import sys
from pathlib import Path

# Add 'Backend/Rag Chatbot' to sys.path so Chatbot module can be imported
root_dir = Path(__file__).resolve().parent.parent
rag_dir = root_dir / "Backend" / "Rag Chatbot"
backend_dir = root_dir / "Backend"

for p in [str(rag_dir), str(backend_dir), str(root_dir)]:
    if p not in sys.path:
        sys.path.insert(0, p)

from Chatbot import app
