#!/usr/bin/env python3
"""Waterloo campaign map (Charleroi to Brussels, 15-18 June 1815): layout guide, clean base and marked base from REAL
elevation. Uses the Talas tools (dem.py, rivers.py and the Guide class).
    python3 battlesofhistory/waterloo/tools/draw-campaign-guide.py
Outputs to waterloo/images/layout/: campaign-guide.png (labelled), campaign-base.png, campaign-base-marked.png, maps.json"""
import json, math, os, sys
from PIL import Image, ImageDraw
HERE = os.path.dirname(os.path.abspath(__file__)); TT = os.path.join(HERE, '..', '..', 'talas', 'tools')
sys.path.insert(0, TT)
src = open(os.path.join(TT, 'draw-layout-guides.py')).read().split('# ---------- places (lat, lon) ----------')[0]
G = {'__file__': os.path.join(TT, 'draw-layout-guides.py')}; exec(compile(src, 'dlg', 'exec'), G)
OUT = os.path.join(HERE, '..', 'images', 'layout'); G['OUT'] = OUT
Guide, BLACK, RED, BLUE, PURPLE, ORANGE, GREY, F = G['Guide'], G['BLACK'], G['RED'], G['BLUE'], G['PURPLE'], G['ORANGE'], G['GREY'], G['F']

# ---- places (lat, lon), from modern maps; the 1815 villages stand on the same sites
T = {'Brussels': (50.846, 4.352), 'Waterloo': (50.715, 4.399), 'Mont-Saint-Jean': (50.689, 4.405), 'La Belle Alliance': (50.672, 4.413),
     'Plancenoit': (50.664, 4.428), 'Braine-l’Alleud': (50.684, 4.371), 'Genappe': (50.611, 4.452), 'Quatre Bras': (50.571, 4.452),
     'Frasnes': (50.553, 4.437), 'Gosselies': (50.469, 4.430), 'Charleroi': (50.411, 4.444), 'Fleurus': (50.484, 4.548),
     'Ligny': (50.512, 4.578), 'Saint-Amand': (50.502, 4.553), 'Sombreffe': (50.527, 4.601), 'Gembloux': (50.561, 4.692),
     'Wavre': (50.717, 4.607), 'Nivelles': (50.598, 4.329), 'Namur': (50.467, 4.867), 'Walhain': (50.620, 4.698),
     'Tilly': (50.560, 4.548), 'Mont-Saint-Guibert': (50.634, 4.611), 'Chapelle-Saint-Lambert': (50.690, 4.505)}
ROADS = [  # the paved chaussees of 1815 (approximate lines between the towns they joined)
    [T['Charleroi'], T['Gosselies'], T['Frasnes'], T['Quatre Bras'], T['Genappe'], T['La Belle Alliance'], T['Mont-Saint-Jean'], T['Waterloo'], (50.77, 4.38), T['Brussels']],
    [T['Nivelles'], T['Quatre Bras'], (50.545, 4.53), T['Sombreffe'], (50.53, 4.70), (50.49, 4.80), T['Namur']],
    [T['Charleroi'], T['Fleurus'], T['Sombreffe'], T['Gembloux']],
    [T['Nivelles'], T['Braine-l’Alleud'], T['Mont-Saint-Jean']],
    [T['Wavre'], (50.72, 4.50), T['Waterloo']],
    [T['Wavre'], T['Mont-Saint-Guibert'], T['Gembloux'], T['Namur']]]
LAT0, LAT1, LON0, LON1 = 50.385, 50.865, 4.06, 5.064

g = Guide('campaign-guide.png', LAT0, LAT1, LON0, LON1, 12, 40, [(40, 3), (400, 6), (3000, 12)], river_from=(50.0, 51.2, 3.5, 5.6, 2600, 1800, 10))
for r in ROADS: g.line(r, (120, 70, 30), 5, dash=18)
g.zone([(50.80, 4.36), (50.80, 4.47), (50.73, 4.47), (50.73, 4.36)], 'Forest of Soignes', (30, 110, 40), at=(50.765, 4.415))
for n, (la, lo) in T.items():
    big = n in ('Brussels', 'Charleroi', 'Namur', 'Wavre', 'Nivelles')
    g.town(la, lo, n.upper() if big else n, '', 26 if big else 20, walled=big, r=11 if big else 7)
g.zone([(50.700, 4.36), (50.700, 4.45), (50.655, 4.45), (50.655, 4.36)], 'battle map\n(Waterloo, 18 June)', ORANGE, at=(50.677, 4.405))
g.text(50.43, 4.56, 'Sambre', BLUE, 24, True); g.text(50.62, 4.585, 'Dyle', BLUE, 22, True); g.text(50.48, 4.95, 'Meuse', BLUE, 24, True)
g.frame('WATERLOO 1815: the campaign map, Charleroi to Brussels', 'Rivers traced from the elevation; 1815 roads approximate.', .1)
json.dump([g.save()], open(os.path.join(OUT, 'maps.json'), 'w'), indent=1)

# marked base: towns pink (numbered), roads yellow, the battle box orange
im = Image.open(os.path.join(OUT, 'campaign-base.png')).convert('RGB'); d = ImageDraw.Draw(im); xy = g.xy
def dash(pts, col, w, step=16):
    q = [xy(*p) for p in pts]
    for (x1, y1), (x2, y2) in zip(q, q[1:]):
        L = math.hypot(x2 - x1, y2 - y1); n = max(1, int(L // step))
        for i in range(0, n, 2): t0, t1 = i / n, min(1, (i + 1) / n); d.line([(x1 + (x2 - x1) * t0, y1 + (y2 - y1) * t0), (x1 + (x2 - x1) * t1, y1 + (y2 - y1) * t1)], fill=col, width=w)
for r in ROADS: dash(r, (255, 235, 0), 6)
legend = []
for k, (n, (la, lo)) in enumerate(T.items(), 1):
    x, y = xy(la, lo); big = n in ('Brussels', 'Charleroi', 'Namur', 'Wavre', 'Nivelles'); px = 26 if big else 13
    d.ellipse([x - px, y - px, x + px, y + px], outline=(255, 0, 255), width=6); d.line([(x - 10, y), (x + 10, y)], fill=(255, 0, 255), width=4); d.line([(x, y - 10), (x, y + 10)], fill=(255, 0, 255), width=4)
    d.text((x, y - px - 6), str(k), fill=(255, 0, 255), font=F(28, True), anchor='mb', stroke_width=4, stroke_fill=(255, 255, 255)); legend.append(f'{k}: {n}')
(x1, y1), (x2, y2) = xy(50.700, 4.36), xy(50.655, 4.45)
for a, b in [((x1, y1), (x2, y1)), ((x2, y1), (x2, y2)), ((x2, y2), (x1, y2)), ((x1, y2), (x1, y1))]: dash([g.P([a])[0] if False else None] if False else [], (0, 0, 0), 1)
d.rectangle([x1, y1, x2, y2], outline=(255, 140, 0), width=6)
im.save(os.path.join(OUT, 'campaign-base-marked.png'), optimize=True)
open(os.path.join(OUT, 'campaign-towns.txt'), 'w').write('\n'.join(legend) + '\n'); print('\n'.join(legend))
