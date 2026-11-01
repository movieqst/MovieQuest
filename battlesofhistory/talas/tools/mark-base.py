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

def run(name, towns, road, box=None):
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
    if box:   # open ground to keep clear: orange dashed rectangle (lat_top, lon_left, lat_bottom, lon_right)
        (x1, y1), (x2, y2) = xy(box[0], box[1]), xy(box[2], box[3])
        for a, b in [((x1, y1), (x2, y1)), ((x2, y1), (x2, y2)), ((x2, y2), (x1, y2)), ((x1, y2), (x1, y1))]:
            L = math.hypot(b[0] - a[0], b[1] - a[1]); n = max(1, int(L // 22))
            for i in range(0, n, 2): t0, t1 = i / n, min(1, (i + 1) / n); d.line([(a[0] + (b[0] - a[0]) * t0, a[1] + (b[1] - a[1]) * t0), (a[0] + (b[0] - a[0]) * t1, a[1] + (b[1] - a[1]) * t1)], fill=(255, 140, 0), width=7)
    out = os.path.join(D, name.replace('-guide', '-base-marked')); im.save(out, optimize=True); print(out)

run('talas-2-valley-guide.png', [(TALAS, 2.5, '1'), (ATLAKH, 1.8, '2'), (KULAN, 1.4, '3')], ROAD)
run('talas-3-battle-guide.png', [(TALAS, 1.2, '1'), (ATLAKH, 0.8, '2')],
    [(42.93, 71.60), (42.915, 71.48), TALAS, (42.85, 71.32), (42.78, 71.28), ATLAKH, (42.68, 71.16), (42.62, 71.00)],
    box=(42.865, 71.275, 42.735, 71.43))
