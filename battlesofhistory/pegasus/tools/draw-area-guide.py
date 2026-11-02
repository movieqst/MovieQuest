#!/usr/bin/env python3
"""Pegasus Bridge area map (Ouistreham to Caen, the canal and the Orne, 6 June 1944): guide, clean base and marked base
from REAL elevation (the sea from height 0). Uses the Talas tools.
    python3 battlesofhistory/pegasus/tools/draw-area-guide.py"""
import json, math, os, sys
import numpy as np
from PIL import Image, ImageDraw
HERE = os.path.dirname(os.path.abspath(__file__)); TT = os.path.join(HERE, '..', '..', 'talas', 'tools')
sys.path.insert(0, TT)
src = open(os.path.join(TT, 'draw-layout-guides.py')).read().split('# ---------- places (lat, lon) ----------')[0]
G = {'__file__': os.path.join(TT, 'draw-layout-guides.py')}; exec(compile(src, 'dlg', 'exec'), G)
OUT = os.path.join(HERE, '..', 'images', 'layout'); G['OUT'] = OUT; os.makedirs(OUT, exist_ok=True)
Guide, BLACK, BLUE, ORANGE, GREY, F, WATER = G['Guide'], G['BLACK'], G['BLUE'], G['ORANGE'], G['GREY'], G['F'], G['WATER']
LAT0, LAT1, LON0, LON1 = 49.170, 49.310, -0.420, -0.134
T = {'Ouistreham': (49.283, -0.252), 'Colleville': (49.287, -0.302), 'Hermanville': (49.285, -0.316), 'Bénouville': (49.243, -0.283),
     'Le Port': (49.246, -0.276), 'Ranville': (49.230, -0.258), 'Hérouvillette': (49.220, -0.245), 'Amfreville': (49.250, -0.236),
     'Bréville': (49.244, -0.224), 'Merville battery': (49.271, -0.196), 'Blainville': (49.230, -0.300), 'Caen': (49.185, -0.365)}
BRIDGES = {'Canal bridge (Pegasus)': (49.2417, -0.2747), 'River bridge (Horsa)': (49.2410, -0.2600)}
CANAL = [(49.186, -0.352), (49.205, -0.322), (49.225, -0.293), (49.2417, -0.2747), (49.262, -0.262), (49.279, -0.250), (49.288, -0.247)]
ORNE = [(49.183, -0.338), (49.196, -0.312), (49.206, -0.300), (49.214, -0.281), (49.227, -0.271), (49.2410, -0.2600), (49.252, -0.257), (49.262, -0.249), (49.272, -0.240), (49.282, -0.232), (49.292, -0.226)]
ZONES = {'LZ X': [(49.2428, -0.2735), (49.2428, -0.2700), (49.2395, -0.2700), (49.2395, -0.2735)],
         'LZ Y': [(49.2470, -0.2690), (49.2470, -0.2640), (49.2435, -0.2640), (49.2435, -0.2690)],
         'DZ N (Ranville)': [(49.240, -0.255), (49.240, -0.238), (49.225, -0.238), (49.225, -0.255)]}

g = Guide('area-guide.png', LAT0, LAT1, LON0, LON1, 13, 40, [(40, 3), (400, 6), (3000, 10)], river_from=(49.05, 49.40, -0.65, 0.05, 2400, 1200, 11))
sea = g.e <= 0.8
def paint_sea(path):
    im = np.asarray(Image.open(path).convert('RGB')).copy(); im[sea] = WATER; Image.fromarray(im).save(path, optimize=True)
paint_sea(os.path.join(OUT, 'area-base.png'))
arr = np.asarray(g.im).copy(); arr[sea] = WATER; g.im = Image.fromarray(arr); g.d = ImageDraw.Draw(g.im)
# the canal and the Orne come from the elevation itself (traced above)
for n, pts in ZONES.items(): g.zone(pts, n, ORANGE)
for n, (la, lo) in T.items(): g.town(la, lo, n, '', 22, r=7)
for n, (la, lo) in BRIDGES.items(): g.town(la, lo, n, '', 20, (200, 40, 40), r=6, dy=26)
g.text(49.302, -0.30, 'SWORD BEACH', BLUE, 26, True); g.text(49.295, -0.17, 'Bay of the Seine', BLUE, 26, True)
g.text(49.215, -0.315, 'Caen canal', (70, 120, 200), 22, True); g.text(49.205, -0.285, 'Orne', BLUE, 22, True)
g.frame('PEGASUS BRIDGE 1944: the area, Ouistreham to Caen', 'Sea from height 0; the canal and the Orne traced from the elevation.', .02)
json.dump([g.save()], open(os.path.join(OUT, 'maps.json'), 'w'), indent=1)

im = Image.open(os.path.join(OUT, 'area-base.png')).convert('RGB'); d = ImageDraw.Draw(im); xy = g.xy

leg = []
for k, (n, (la, lo)) in enumerate(list(T.items()) + list(BRIDGES.items()), 1):
    x, y = xy(la, lo); px = 30 if n == 'Caen' else 14; col = (255, 40, 40) if 'bridge' in n else (255, 0, 255)
    d.ellipse([x - px, y - px, x + px, y + px], outline=col, width=6); d.text((x, y - px - 4), str(k), fill=col, font=F(28, True), anchor='mb', stroke_width=4, stroke_fill=(255, 255, 255)); leg.append(f'{k}: {n}')
for n, pts in ZONES.items(): d.polygon([xy(*p) for p in pts], outline=(255, 140, 0), width=5)
im.save(os.path.join(OUT, 'area-base-marked.png'), optimize=True)
open(os.path.join(OUT, 'area-places.txt'), 'w').write('\n'.join(leg) + '\n'); print('\n'.join(leg))
