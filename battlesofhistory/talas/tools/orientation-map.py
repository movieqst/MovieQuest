#!/usr/bin/env python3
"""Orientation picture: the three Talas maps side by side, each with a rectangle showing where the next, closer map
lies, joined by lines. Positions come from layout/maps.json, so the rectangles are exact.
    python3 battlesofhistory/talas/tools/orientation-map.py [region-picture]"""
import json, os, sys
from PIL import Image, ImageDraw, ImageFont
I = os.path.join(os.path.dirname(__file__), '..', 'images'); L = os.path.join(I, 'layout')
F = lambda s, b=True: ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf' % ('-Bold' if b else ''), s)
M = {m['file'].split('-')[2]: m for m in json.load(open(os.path.join(L, 'maps.json')))}   # region, valley, battle
region = sys.argv[1] if len(sys.argv) > 1 else os.path.join(I, 'map1.jpg')
if not os.path.exists(region): region = os.path.join(I, 'establish-1-region-atlas.jpg')
W, H = 2400, 1580
out = Image.new('RGB', (W, H), (8, 16, 22)); d = ImageDraw.Draw(out)
GOLD, WHITE, ORANGE = (233, 199, 122), (245, 242, 232), (255, 150, 40)
# panels: (key, picture, x, y, w, h)
P = [('region', region, 30, 110, 1280, 960), ('valley', os.path.join(I, 'map2.jpg'), 1350, 110, 1020, 765), ('battle', os.path.join(I, 'map3.jpg'), 1480, 940, 760, 570)]
box = {}
for k, f, x, y, w, h in P:
    out.paste(Image.open(f).convert('RGB').resize((w, h), Image.LANCZOS), (x, y)); d.rectangle([x - 2, y - 2, x + w + 1, y + h + 1], outline=GOLD, width=3); box[k] = (x, y, w, h)

def rect(outer, inner):   # where map `inner` lies inside map `outer`, in picture pixels
    a, b = M[outer], M[inner]; x, y, w, h = box[outer]
    fx = lambda lon: x + (lon - a['lon0']) / (a['lon1'] - a['lon0']) * w; fy = lambda lat: y + (a['lat1'] - lat) / (a['lat1'] - a['lat0']) * h
    return fx(b['lon0']), fy(b['lat1']), fx(b['lon1']), fy(b['lat0'])

for outer, inner in (('region', 'valley'), ('valley', 'battle')):
    x1, y1, x2, y2 = rect(outer, inner); bx, by, bw, bh = box[inner]
    pairs = (((x2, y1), (bx, by)), ((x2, y2), (bx, by + bh))) if outer == 'region' else (((x1, y2), (bx, by)), ((x2, y2), (bx + bw, by)))
    for (ax, ay), (cx, cy) in pairs:
        d.line([(ax, ay), (cx, cy)], fill=GOLD, width=3)
    d.rectangle([x1 - 3, y1 - 3, x2 + 3, y2 + 3], outline=(0, 0, 0), width=7); d.rectangle([x1, y1, x2, y2], outline=GOLD, width=4)
# the battle plain on the battlefield map
a = M['battle']; x, y, w, h = box['battle']; fx = lambda lon: x + (lon - a['lon0']) / (a['lon1'] - a['lon0']) * w; fy = lambda lat: y + (a['lat1'] - lat) / (a['lat1'] - a['lat0']) * h
d.rectangle([fx(71.275), fy(42.865), fx(71.43), fy(42.735)], outline=ORANGE, width=4)
d.text((fx(71.3525), fy(42.735) + 8), 'the battle plain', fill=ORANGE, font=F(22), anchor='mt', stroke_width=3, stroke_fill=(0, 0, 0))
# titles
d.text((30, 28), 'BATTLE OF TALAS, 751: WHERE IT HAPPENED', fill=GOLD, font=F(46), stroke_width=0)
for k, t in (('region', '1  Central Asia: the Tang came from Kucha (east), the Abbasids from Merv (west)  ·  %d km across'),
             ('valley', '2  The Talas valley  ·  %d km across'), ('battle', '3  The battlefield, Talas city to Atlakh  ·  %d km across')):
    x, y, w, h = box[k]; d.text((x, y + h + 10), t % M[k]['km_w'], fill=WHITE, font=F(22, False))
o = os.path.join(I, 'orientation-map.jpg'); out.save(o, quality=88); print(o)
