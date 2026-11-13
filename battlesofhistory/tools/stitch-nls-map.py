#!/usr/bin/env python3
"""Stitches the pieces fetched by fetch-nls-map.sh back into one image.
    python3 -I stitch-nls-map.py ~/nls-maps/101464753 out.jpg   (pieces are 512 px at SCALE 0.5)"""
import sys, os, json, glob, re
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
d, out, scale = sys.argv[1], sys.argv[2], 0.5
j = json.load(open(os.path.join(d, 'info.json'))); W, H = j['width'], j['height']
R = int(512 / scale)
canvas = Image.new('RGB', (round(W * scale), round(H * scale)), (255, 255, 255))
for f in glob.glob(os.path.join(d, 'r*_c*.jpg')):
    r, c = map(int, re.findall(r'r(\d+)_c(\d+)', f)[0])
    canvas.paste(Image.open(f).convert('RGB'), (c * 512, r * 512))
canvas.save(out, quality=88); print(out, canvas.size)
