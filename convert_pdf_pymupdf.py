import fitz
import os

os.chdir(r"d:\Portfolio\assets\certs")

pdf_path = "sap certificate.pdf"
output_path = "sap_certificate.jpg"

try:
    print(f"Converting {pdf_path}...")
    doc = fitz.open(pdf_path)
    
    # Get first page
    page = doc[0]
    
    # Render to image (150 DPI = 2x zoom)
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
    
    # Save as JPG
    pix.save(output_path)
    
    doc.close()
    
    print(f"✓ Successfully converted to {output_path}")
    print(f"File size: {os.path.getsize(output_path)} bytes")
    
except Exception as e:
    print(f"✗ Error: {e}")
