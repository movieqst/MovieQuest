#!/usr/bin/env python3
"""Make a scanned book PDF small enough to keep on the site, without losing its searchable text.

    python3 tools/shrink-pdf.py IN.pdf OUT.pdf [max-px] [quality]

Each page picture is re-saved as a JPEG no larger than max-px on its long side (default 1600) at the given JPEG quality
(default 60); pictures already smaller are left alone. The hidden text layer that the Internet Archive adds to its scans
(what makes the PDF searchable) is kept. Needs PyMuPDF: pip install pymupdf
"""
import sys, pymupdf

src, dst = sys.argv[1], sys.argv[2]
max_px = int(sys.argv[3]) if len(sys.argv) > 3 else 1600
quality = int(sys.argv[4]) if len(sys.argv) > 4 else 60
doc = pymupdf.open(src)
done = set()
for page in doc:
    for img in page.get_images(full=True):
        xref = img[0]
        if xref in done:
            continue
        done.add(xref)
        pix = pymupdf.Pixmap(doc, xref)
        if pix.alpha or pix.n - pix.alpha > 3:          # CMYK or with transparency: convert to plain RGB first
            pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
        k = max(pix.width, pix.height) / max_px
        if k > 1:
            pix = pymupdf.Pixmap(pix, int(pix.width / k), int(pix.height / k), None)
        page.replace_image(xref, stream=pix.tobytes('jpeg', jpg_quality=quality))
doc.save(dst, garbage=4, deflate=True)
before, after = pymupdf.os.path.getsize(src), pymupdf.os.path.getsize(dst)
print(f'{doc.page_count} pages: {before / 1e6:.1f} MB -> {after / 1e6:.1f} MB')
