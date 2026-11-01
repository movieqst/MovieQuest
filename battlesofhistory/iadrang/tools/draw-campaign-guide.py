#!/usr/bin/env python3
"""Ia Drang campaign map (Pleiku, Plei Me, the Chu Pong): layout guide, clean base and marked base from REAL elevation.
Uses the Talas tools (dem.py, rivers.py and the Guide class).
    python3 battlesofhistory/iadrang/tools/draw-campaign-guide.py
Outputs to iadrang/images/layout/: campaign-guide.png (labelled), campaign-base.png, campaign-base-marked.png, maps.json"""
import importlib.util, json, math, os, sys
from PIL import ImageDraw, ImageFont
HERE = os.path.dirname(os.path.abspath(__file__)); TT = os.path.join(HERE, '..', '..', 'talas', 'tools')
sys.path.insert(0, TT)
spec = importlib.util.spec_from_file_location('dlg', os.path.join(TT, 'draw-layout-guides.py'))
# load only the Guide class and helpers, not the Talas maps
src = open(os.path.join(TT, 'draw-layout-guides.py')).read().split('# ---------- places (lat, lon) ----------')[0]
G = {'__file__': os.path.join(TT, 'draw-layout-guides.py')}; exec(compile(src, 'dlg', 'exec'), G)
OUT = os.path.join(HERE, '..', 'images', 'layout'); G['OUT'] = OUT
Guide, BLACK, RED, BLUE, PURPLE, ORANGE, GREY, F = G['Guide'], G['BLACK'], G['RED'], G['BLUE'], G['PURPLE'], G['ORANGE'], G['GREY'], G['F']

# ---- places (lat, lon). Sources: Wikipedia (Siege of Plei Me, Battle of Ia Drang), the 1st Cavalry Division report
# "The Pleiku Campaign" (1966), lzxray.com. LZ Falcon/Columbus/Albany and the ambush site are approximate.
PLEIKU = (13.983, 108.000); HOLLOWAY = (13.937, 108.040); PLEIME = (13.6175, 107.9175)
XRAY = (13.5679, 107.7140); ALBANY = (13.600, 107.735); FALCON = (13.565, 107.790); COLUMBUS = (13.595, 107.790)
DUCCO = (13.800, 107.660); AMBUSH = (13.700, 107.985)
R14 = [(14.02, 108.00), PLEIKU, (13.90, 108.02), (13.80, 108.04), (13.72, 108.05), (13.60, 108.06), (13.46, 108.07)]
R6C = [(13.72, 108.05), AMBUSH, (13.66, 107.95), PLEIME]
R19 = [PLEIKU, (13.95, 107.90), (13.88, 107.78), DUCCO, (13.78, 107.55), (13.77, 107.42)]

g = Guide('campaign-guide.png', 13.46, 14.02, 107.42, 108.19, 12, 40, [(40, 3), (300, 6), (1500, 11)])
for r in (R14, R6C, R19): g.line(r, (120, 70, 30), 5, dash=18)
g.geojson_lines(os.path.join(G['CACHE'], 'ne_10m_admin_0_boundary_lines_land.geojson'), (220, 30, 30), 4)
g.text(13.70, 107.48, 'CAMBODIA', RED, 30, True)
for (la, lo), s, sub, walled, dy in [(PLEIKU, 'PLEIKU', 'town; II Corps HQ', True, 26), (HOLLOWAY, 'Camp Holloway', 'airfield', False, -30), (PLEIME, 'PLEI ME', 'Special Forces camp (triangle)', True, -30),
                                 (DUCCO, 'Duc Co', 'Special Forces camp', False, -30)]:
    g.town(la, lo, s, sub, 26, walled=walled, dy=dy)
for (la, lo), s, dy in [(XRAY, 'LZ X-RAY', -24), (ALBANY, 'LZ ALBANY', -24), (FALCON, 'LZ FALCON (guns)', 22), (COLUMBUS, 'LZ COLUMBUS (guns)', 22)]:
    g.town(la, lo, s, '', 22, ORANGE, r=8, dy=dy)
g.ring(*AMBUSH, 2, 'relief column ambush,\n23 Oct (approximate)')
g.text(13.52, 107.62, 'CHU PONG MASSIF', GREY, 30, True)
g.text(13.66, 107.62, 'Ia Drang', BLUE, 26, True)
g.text(13.99, 108.13, 'Route 19 to An Khe →', (120, 70, 30), 20, True)
g.frame('IA DRANG 1965: the campaign map, Pleiku to the Chu Pong', 'Rivers traced from the elevation; roads and the border approximate.', .1)
meta = g.save()
json.dump([meta], open(os.path.join(OUT, 'maps.json'), 'w'), indent=1)

# marked base: towns as pink circles, landing zones as orange, roads yellow, border red
from PIL import Image
im = Image.open(os.path.join(OUT, 'campaign-base.png')).convert('RGB'); d = ImageDraw.Draw(im)
xy = g.xy
def dash(pts, col, w, step=16):
    q = [xy(*p) for p in pts]
    for (x1, y1), (x2, y2) in zip(q, q[1:]):
        L = math.hypot(x2 - x1, y2 - y1); n = max(1, int(L // step))
        for i in range(0, n, 2): t0, t1 = i / n, min(1, (i + 1) / n); d.line([(x1 + (x2 - x1) * t0, y1 + (y2 - y1) * t0), (x1 + (x2 - x1) * t1, y1 + (y2 - y1) * t1)], fill=col, width=w)
for r in (R14, R6C, R19): dash(r, (255, 235, 0), 6)
for f in json.load(open(os.path.join(G['CACHE'], 'ne_10m_admin_0_boundary_lines_land.geojson')))['features']:
    gg = f['geometry']; cs = gg['coordinates'] if gg['type'] == 'MultiLineString' else [gg['coordinates']]
    for c in cs:
        if any(107.3 < x < 108.3 and 13.3 < y < 14.1 for x, y in c): dash([(y, x) for x, y in c], (255, 40, 40), 5, 12)
for (la, lo), rkm, lab, col in [(PLEIKU, 2.2, '1', (255, 0, 255)), (HOLLOWAY, 1.2, '2', (255, 0, 255)), (PLEIME, .9, '3', (255, 0, 255)), (DUCCO, .8, '4', (255, 0, 255)),
                                (XRAY, .5, 'A', (255, 140, 0)), (ALBANY, .5, 'B', (255, 140, 0)), (FALCON, .5, 'C', (255, 140, 0)), (COLUMBUS, .5, 'D', (255, 140, 0))]:
    x, y = xy(la, lo); px = max(12, rkm / g.km_w * 2400)
    d.ellipse([x - px, y - px, x + px, y + px], outline=col, width=7); d.line([(x - 12, y), (x + 12, y)], fill=col, width=4); d.line([(x, y - 12), (x, y + 12)], fill=col, width=4)
    d.text((x, y - px - 8), lab, fill=col, font=F(32, True), anchor='mb', stroke_width=4, stroke_fill=(255, 255, 255))
im.save(os.path.join(OUT, 'campaign-base-marked.png'), optimize=True); print('done')
