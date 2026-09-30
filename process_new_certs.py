import os
import pymupdf
from PIL import Image

output_dir = r"c:\Users\hammad\Desktop\Portfolio\Frontend\public\images\certificates"
root_output_dir = r"c:\Users\hammad\Desktop\Portfolio\public\images\certificates"
os.makedirs(output_dir, exist_ok=True)
os.makedirs(root_output_dir, exist_ok=True)

user_uploaded_dir = r"C:\Users\hammad\.gemini\antigravity-ide\brain\d6436dec-a639-4258-b282-8d132146c865\.user_uploaded"
downloads_dir = r"C:\Users\hammad\Downloads\Certificates"

TARGET_WIDTH = 1200
TARGET_HEIGHT = 850

def save_uniform_image(im, filename):
    im = im.convert("RGB")
    im.thumbnail((TARGET_WIDTH, TARGET_HEIGHT), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (TARGET_WIDTH, TARGET_HEIGHT), (255, 255, 255))
    x = (TARGET_WIDTH - im.width) // 2
    y = (TARGET_HEIGHT - im.height) // 2
    canvas.paste(im, (x, y))
    
    p1 = os.path.join(output_dir, filename)
    p2 = os.path.join(root_output_dir, filename)
    canvas.save(p1, "PNG", quality=95)
    canvas.save(p2, "PNG", quality=95)
    print(f"Saved: {p1} and {p2}")

# 1. RAG with MongoDB
# Let's check uploaded image media_1790789119740.png or Rag with MongoDB.pdf
mongo_uploaded = os.path.join(user_uploaded_dir, "media_1790789119740.png")
mongo_pdf = os.path.join(downloads_dir, "Rag with MongoDB.pdf")
if os.path.exists(mongo_uploaded):
    save_uniform_image(Image.open(mongo_uploaded), "cert_mongodb_rag.png")
elif os.path.exists(mongo_pdf):
    doc = pymupdf.open(mongo_pdf)
    pix = doc[0].get_pixmap(dpi=200)
    im = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    save_uniform_image(im, "cert_mongodb_rag.png")

# 2. Communication and Soft Skills
comm_uploaded = os.path.join(user_uploaded_dir, "media_1790789140853.png")
comm_pdf = os.path.join(downloads_dir, "Communication Skills.pdf")
if os.path.exists(comm_uploaded):
    save_uniform_image(Image.open(comm_uploaded), "cert_digiskills_communication.png")
elif os.path.exists(comm_pdf):
    doc = pymupdf.open(comm_pdf)
    pix = doc[0].get_pixmap(dpi=200)
    im = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    save_uniform_image(im, "cert_digiskills_communication.png")

print("Processing 2 new certificates complete!")
