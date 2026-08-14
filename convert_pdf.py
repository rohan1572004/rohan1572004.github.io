import subprocess
import sys
import os

os.chdir(r"d:\Portfolio\assets\certs")

# Install required packages
print("Installing dependencies...")
subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", "pdf2image", "pillow"])

from pdf2image import convert_from_path

pdf_path = "sap certificate.pdf"
output_path = "sap_certificate.jpg"

try:
    print(f"Converting {pdf_path}...")
    images = convert_from_path(pdf_path, first_page=1, last_page=1, dpi=150)
    if images:
        images[0].save(output_path, "JPEG", quality=85)
        print(f"✓ Successfully converted to {output_path}")
    else:
        print("✗ Failed to convert PDF")
except Exception as e:
    print(f"✗ Error: {e}")
