import os
import fitz # PyMuPDF
from PIL import Image

output_dir = r"c:\Users\hammad\Desktop\Portfolio\Frontend\public\images\certificates"
os.makedirs(output_dir, exist_ok=True)

user_uploaded_dir = r"C:\Users\hammad\.gemini\antigravity-ide\brain\d6436dec-a639-4258-b282-8d132146c865\.user_uploaded"
downloads_dir = r"C:\Users\hammad\Downloads\Certificates"

TARGET_WIDTH = 1200
TARGET_HEIGHT = 850 # standard landscape certificate aspect ratio ~ 1.41

def save_uniform_image(im, out_path):
    im = im.convert("RGB")
    # Resize with high quality while preserving aspect ratio and fit into TARGET_WIDTH, TARGET_HEIGHT
    im.thumbnail((TARGET_WIDTH, TARGET_HEIGHT), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (TARGET_WIDTH, TARGET_HEIGHT), (255, 255, 255))
    x = (TARGET_WIDTH - im.width) // 2
    y = (TARGET_HEIGHT - im.height) // 2
    canvas.paste(im, (x, y))
    canvas.save(out_path, "PNG", quality=95)
    print(f"Saved: {out_path} ({TARGET_WIDTH}x{TARGET_HEIGHT})")

# 1. Career Essentials in Generative AI (Microsoft)
ms_pdf = os.path.join(downloads_dir, "Career Essentials in Generative AI.pdf")
ms_user = os.path.join(user_uploaded_dir, "media_1790773096631.png")
if os.path.exists(ms_pdf):
    doc = fitz.open(ms_pdf)
    pix = doc[0].get_pixmap(dpi=200)
    im = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    save_uniform_image(im, os.path.join(output_dir, "cert_microsoft_genai.png"))
elif os.path.exists(ms_user):
    save_uniform_image(Image.open(ms_user), os.path.join(output_dir, "cert_microsoft_genai.png"))

# 2. Python 101 for Data Science (IBM)
ibm_pdf = os.path.join(downloads_dir, "PYTHON Certificate.pdf")
ibm_user = os.path.join(user_uploaded_dir, "media_1790773062719.png")
if os.path.exists(ibm_pdf):
    doc = fitz.open(ibm_pdf)
    pix = doc[0].get_pixmap(dpi=200)
    im = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    save_uniform_image(im, os.path.join(output_dir, "cert_ibm_python.png"))
elif os.path.exists(ibm_user):
    save_uniform_image(Image.open(ibm_user), os.path.join(output_dir, "cert_ibm_python.png"))

# 3. Introduction to Front End Development (Simplilearn)
simp_pdf = os.path.join(downloads_dir, "Front End Certificate.pdf")
simp_user = os.path.join(user_uploaded_dir, "media_1790773006944.png")
if os.path.exists(simp_pdf):
    doc = fitz.open(simp_pdf)
    pix = doc[0].get_pixmap(dpi=200)
    im = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    save_uniform_image(im, os.path.join(output_dir, "cert_simplilearn_frontend.png"))
elif os.path.exists(simp_user):
    save_uniform_image(Image.open(simp_user), os.path.join(output_dir, "cert_simplilearn_frontend.png"))

# 4. C Programming For Beginners (Udemy)
c_pdf = os.path.join(downloads_dir, "C Programming For Beginners.pdf")
if os.path.exists(c_pdf):
    doc = fitz.open(c_pdf)
    pix = doc[0].get_pixmap(dpi=200)
    im = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    save_uniform_image(im, os.path.join(output_dir, "cert_udemy_c.png"))

# 5. GitHub Foundations (DataCamp)
gh_pdf = os.path.join(downloads_dir, "Github Foundations.pdf")
if os.path.exists(gh_pdf):
    doc = fitz.open(gh_pdf)
    pix = doc[0].get_pixmap(dpi=200)
    im = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    save_uniform_image(im, os.path.join(output_dir, "cert_datacamp_github.png"))

# 6. Elements of AI (University of Helsinki)
hel_png = os.path.join(downloads_dir, "Elements of AI.png")
hel_user = os.path.join(user_uploaded_dir, "media_1790773142183.png")
if os.path.exists(hel_png):
    save_uniform_image(Image.open(hel_png), os.path.join(output_dir, "cert_helsinki_ai.png"))
elif os.path.exists(hel_user):
    save_uniform_image(Image.open(hel_user), os.path.join(output_dir, "cert_helsinki_ai.png"))

print("Processing complete!")
