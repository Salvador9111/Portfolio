import os
import sys
from pathlib import Path
from dotenv import load_dotenv
import uvicorn

# Determine directories
backend_dir = Path(__file__).resolve().parent
rag_dir = backend_dir / "Rag Chatbot"
root_dir = backend_dir.parent

# Ensure directories are in sys.path
for p in [str(rag_dir), str(backend_dir), str(root_dir)]:
    if p not in sys.path:
        sys.path.insert(0, p)

# Load environment variables from possible locations
for env_path in [backend_dir / ".env", root_dir / ".env", rag_dir / ".env"]:
    if env_path.exists():
        load_dotenv(dotenv_path=env_path)
        break
else:
    load_dotenv()

from Chatbot import app

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    print("=" * 60, flush=True)
    print("  Hammad's Portfolio AI Chatbot API is starting...", flush=True)
    print(f"  - Local URL:    http://localhost:{port}", flush=True)
    print(f"  - Network URL:  http://0.0.0.0:{port}", flush=True)
    print(f"  - API Docs:     http://localhost:{port}/docs", flush=True)
    print("=" * 60, flush=True)
    uvicorn.run(app, host=host, port=port)
