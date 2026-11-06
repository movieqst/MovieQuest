#!/usr/bin/env python3
"""Batoche: the three opening maps after the globe dive, with places written on them (images/establish-*.jpg), made from
the painted maps (terrain-continent, terrain-campaign, terrain-region). Positions from latitude and longitude, using each
map's corners in images/layout/maps.json.
    python3 battlesofhistory/batoche/tools/make-establishing.py"""
import json, os
from PIL import Image, ImageDraw, ImageFont
HERE = os.path.dirname(os.path.abspath(__file__)); IMG = os.path.join(HERE, '..', 'images')
FR = {m['file'].replace('-guide.png', ''): m for m in json.load(open(os.path.join(IMG, 'layout', 'maps.json')))}
def font(sz, bold=True):
    for p in ['/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf' if bold else '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf']:
        if os.path.exists(p): return ImageFont.truetype(p, sz)
    return ImageFont.load_default()
def make(name, src, places, lines=(), crop=None, out=None):
    m = FR[name]; im = Image.open(os.path.join(IMG, src)).convert('RGB'); W, H = im.size; d = ImageDraw.Draw(im)
    xy = lambda la, lo: ((lo - m['lon0']) / (m['lon1'] - m['lon0']) * W, (m['lat1'] - la) / (m['lat1'] - m['lat0']) * H)
    for pts, col, w, dash in lines:
        q = [xy(*p) for p in pts]
        for (x1, y1), (x2, y2) in zip(q, q[1:]):
            n = max(1, int(((x2 - x1) ** 2 + (y2 - y1) ** 2) ** .5 // 18)) if dash else 1
            for i in range(0, n, 2 if dash else 1): t0, t1 = i / n, min(1, (i + 1) / n); d.line([(x1 + (x2 - x1) * t0, y1 + (y2 - y1) * t0), (x1 + (x2 - x1) * t1, y1 + (y2 - y1) * t1)], fill=col, width=w)
    for pl in places:
        la, lo, txt, sub, big, col, dy = pl[:7]; dx = pl[7] if len(pl) > 7 else 0
        x, y = xy(la, lo); r = 13 if big else 8
        d.ellipse([x - r, y - r, x + r, y + r], fill=col, outline=(255, 255, 255), width=3)
        f = font(42 if big else 30); x += dx; d.text((x, y + dy), txt, font=f, fill=(255, 246, 220), anchor='mb' if dy < 0 else 'mt', stroke_width=5, stroke_fill=(20, 20, 20))
        if sub: d.text((x, y + dy + (6 if dy < 0 else (52 if big else 40))), sub, font=font(22, False), fill=(235, 225, 200), anchor='mt', stroke_width=4, stroke_fill=(20, 20, 20))
    if crop: im = im.crop(crop)
    im.save(os.path.join(IMG, out or 'establish-' + name + '.jpg'), quality=88); print(out or name, im.size)
GOLD, RED, BLUE, GREY = (233, 199, 122), (192, 57, 43), (46, 90, 168), (120, 120, 120)
B = (52.7525, -106.1182)
# 1. the continent, shown at 80% (no need for so much ocean): the crop keeps Canada and the northern United States
make('continent', 'terrain-continent.jpg', [
    (*B, 'BATOCHE', '', True, GOLD, -26), (49.90, -97.14, 'Winnipeg', '', False, GREY, -20), (45.42, -75.70, 'Ottawa', '', False, GREY, -20),
    (53.55, -113.49, 'Edmonton', '', False, GREY, -20), (51.05, -114.07, 'Calgary', '', False, GREY, 20)], crop=(240, 180, 2160, 1620))
# 2. the North-West: the railway, the columns, the battles of 1885
P = dict(QA=(50.54, -103.88), RG=(50.45, -104.61), SC=(50.29, -107.79), MJ=(50.39, -105.53), BF=(52.733, -108.31), FP=(53.575, -109.794), FL=(53.89, -110.38), CK=(52.80, -109.03),
         PA=(53.20, -105.75), DL=(52.824, -106.274), FC=(52.539, -106.153), CC=(52.32, -106.457), HB=(52.20, -105.12), TH=(51.35, -104.55), FQ=(50.77, -103.79))
make('campaign', 'terrain-campaign.jpg', [
    (*B, 'BATOCHE', '9–12 May', True, GOLD, -26, 120), (*P['DL'], 'Duck Lake', '26 March', False, BLUE, -18, -170), (*P['FC'], 'Fish Creek', '24 April', False, BLUE, 20),
    (*P['QA'], "Qu'Appelle", "Middleton's start", False, RED, 20), (*P['RG'], 'Regina', '', False, GREY, 20), (*P['BF'], 'Battleford', '', False, GREY, -18),
    (*P['FP'], 'Fort Pitt', '', False, GREY, 20), (*P['FL'], 'Frog Lake', '2 April', False, GREY, -18), (*P['CK'], 'Cut Knife', '2 May', False, GREY, 20),
    (*P['PA'], 'Prince Albert', '', False, GREY, -18)],
    lines=[([(50.62, -101.9), P['QA'], P['RG'], P['MJ'], P['SC'], (49.98, -109.0), (49.85, -109.6)], (40, 40, 40), 6, False),
           ([P['QA'], P['FQ'], P['TH'], P['HB'], P['CC'], P['FC'], B], RED, 7, True)])
# 3. the South Branch: Duck Lake, Fort Carlton, the North-West Mounted Police, Fish Creek
make('region', 'terrain-region.jpg', [
    (*B, 'BATOCHE', '', True, GOLD, -26), (52.824, -106.274, 'Duck Lake', 'fight of 26 March', False, BLUE, -18),
    (52.874, -106.531, 'Fort Carlton', 'NWMP and HBC post', False, RED, -18), (52.539, -106.153, 'Fish Creek', 'Tourond’s Coulee, 24 April', False, BLUE, 20),
    (52.32, -106.457, "Clarke's Crossing", "Middleton's camp", False, RED, 20), (52.80, -106.08, 'Saint-Laurent', 'mission', False, GREY, -18),
    (52.67, -106.122, "Gabriel's Crossing", "Dumont's ferry", False, GREY, 20)],
    lines=[([(52.32, -106.457), (52.43, -106.30), (52.539, -106.153), (52.62, -106.10), (52.70, -106.09), (52.7485, -106.1061)], RED, 7, True)])
