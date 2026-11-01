#!/usr/bin/env python3
"""Base map with the towns and the road marked on it (bright markers, no other labels), for one-image repaint prompts.
    python3 battlesofhistory/talas/tools/mark-base.py"""
import json, os, math
from PIL import Image, ImageDraw, ImageFont
D = os.path.join(os.path.dirname(__file__), '..', 'images', 'layout')
F = lambda s: ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', s)
maps = {m['file']: m for m in json.load(open(os.path.join(D, 'maps.json')))}
TALAS, ATLAKH, KULAN = (42.900, 71.370), (42.7153, 71.2644), (42.920, 72.740)
ROAD = [(42.93, 72.90), KULAN, (42.95, 72.30), (42.95, 71.80), (42.92, 71.55), TALAS, (42.82, 71.30), ATLAKH, (42.62, 70.95), (42.50, 70.60)]

def run(name, towns, road):
    m = maps[name]; im = Image.open(os.path.join(D, name.replace('-guide', '-base'))).convert('RGB'); d = ImageDraw.Draw(im)
    xy = lambda la, lo: ((lo - m['lon0']) / (m['lon1'] - m['lon0']) * m['width'], (m['lat1'] - la) / (m['lat1'] - m['lat0']) * m['height'])
    q = [xy(*p) for p in road]
    for (x1, y1), (x2, y2) in zip(q, q[1:]):
        L = math.hypot(x2 - x1, y2 - y1); n = max(1, int(L // 16))
        for i in range(0, n, 2): t0, t1 = i / n, min(1, (i + 1) / n); d.line([(x1 + (x2 - x1) * t0, y1 + (y2 - y1) * t0), (x1 + (x2 - x1) * t1, y1 + (y2 - y1) * t1)], fill=(255, 235, 0), width=6)
    for (la, lo), r, label in towns:
        x, y = xy(la, lo); px = r / m['km_w'] * m['width']
        d.ellipse([x - px, y - px, x + px, y + px], outline=(255, 0, 255), width=8); d.line([(x - 14, y), (x + 14, y)], fill=(255, 0, 255), width=5); d.line([(x, y - 14), (x, y + 14)], fill=(255, 0, 255), width=5)
        d.text((x, y - px - 10), label, fill=(255, 0, 255), font=F(34), anchor='mb', stroke_width=4, stroke_fill=(255, 255, 255))
    out = os.path.join(D, name.replace('-guide', '-base-marked')); im.save(out, optimize=True); print(out)

run('talas-2-valley-guide.png', [(TALAS, 2.5, '1'), (ATLAKH, 1.8, '2'), (KULAN, 1.4, '3')], ROAD)
