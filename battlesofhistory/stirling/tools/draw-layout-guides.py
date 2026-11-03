#!/usr/bin/env python3
"""Stirling Bridge battle map: layout guide and clean base, from REAL elevation (AWS terrain tiles via the Talas tools).
The River Forth is taken from the elevation itself (its surface is the lowest ground, about 1.5 m).
    python3 battlesofhistory/stirling/tools/draw-layout-guides.py
Outputs to stirling/images/layout/: battle-guide.png (terrain, river, 1297 places, lat/lon grid, labels),
battle-base.png (terrain and river only, for ChatGPT to repaint), maps.json (the frame's corners).
Coordinates: see stirling/RESEARCH-NOTES.md (HES grid references converted with pyproj)."""
import json, math, os, sys
import numpy as np
from PIL import Image, ImageDraw
from scipy.ndimage import binary_opening, binary_closing, binary_erosion, label
HERE = os.path.dirname(os.path.abspath(__file__)); TT = os.path.join(HERE, '..', '..', 'talas', 'tools')
sys.path.insert(0, TT)
src = open(os.path.join(TT, 'draw-layout-guides.py')).read().split('# ---------- places (lat, lon) ----------')[0]
src = src.replace("('%.2f°E' if step < 1", "('%.3f°E' if step < .01 else '%.2f°E' if step < 1").replace("('%.2f°N' if step < 1", "('%.3f°N' if step < .01 else '%.2f°N' if step < 1")
G = {'__file__': os.path.join(TT, 'draw-layout-guides.py')}; exec(compile(src, 'dlg', 'exec'), G)
OUT = os.path.join(HERE, '..', 'images', 'layout'); G['OUT'] = OUT
Guide, F, RED, BLUE, BLACK, GREY, ORANGE, PURPLE, WATER, WHITE = (G[k] for k in ('Guide', 'F', 'RED', 'BLUE', 'BLACK', 'GREY', 'ORANGE', 'PURPLE', 'WATER', 'WHITE'))
W, H = G['W'], G['H']
# lowland ramp: wet carse meadows, fields, the castle rock and the Ochil foothills
G['RAMP'][:] = [(0, (150, 178, 120)), (6, (168, 190, 128)), (12, (186, 198, 136)), (30, (196, 196, 140)), (60, (188, 176, 128)), (100, (160, 146, 112)), (160, (140, 128, 104))]

# frame: 4:3, about 4.0 x 3.0 km, the castle at the left, the Abbey Craig at the top right
LAT0, LAT1, LON0, LON1 = 56.1175, 56.1445, -3.9640, -3.8997
g = Guide('battle-guide.png', LAT0, LAT1, LON0, LON1, 15, None, None)
e = g.e
water = e < 3.0
water = binary_closing(binary_opening(water, iterations=1), iterations=2)
lab, n = label(water); sizes = np.bincount(lab.ravel()); water = (sizes[lab] > 3000) & (lab > 0)   # the river, not puddles
# the elevation tiles smear the channel to ~200 m; the tidal Forth here is ~50-70 m wide, so thin it to its middle
from skimage.morphology import skeletonize
from scipy.ndimage import binary_dilation
mid = skeletonize(water)
mid = (label(mid)[0] > 0) & mid
water_full = water
water = binary_dilation(mid, iterations=19)   # a channel ~65 m wide along the middle of the low ground
rgb = g.rgb.copy(); rgb[water] = WATER
g.im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); g.d = ImageDraw.Draw(g.im)
os.makedirs(OUT, exist_ok=True); g.im.save(os.path.join(OUT, 'battle-base.png'), optimize=True)

def river_dir(lat, lon, r=40):
    x, y = g.xy(lat, lon); ys, xs = np.nonzero(water[int(y) - r:int(y) + r, int(x) - r:int(x) + r])
    c = np.cov(np.vstack([xs, ys])); w, v = np.linalg.eigh(c); return v[:, 1]   # main direction of the water nearby

BRIDGE = (56.129126, -3.936699)           # HES SM8264: pier remains, probably the 1297 timber bridge
OLD = (56.1280, -3.9369)                  # the stone Old Bridge (15th-16th c.), NOT 1297
CRAIG = (56.1382, -3.9181); ABBEY = (56.1229, -3.9174); CASTLE = (56.1236, -3.9465)
CAUSEWAYHEAD = (56.1370, -3.9250); FORD = (56.1255, -3.9256); KILDEAN = (56.1370, -3.9550); HESREF = (56.132329, -3.930745)

# the probable 1297 bridge: a bar across the river at the HES point
dx, dy = river_dir(*BRIDGE); px, py = -dy, dx; x, y = g.xy(*BRIDGE); L = 34
g.d.line([(x - px * L, y - py * L), (x + px * L, y + py * L)], fill=(120, 70, 30), width=14)
g.d.line([(x - px * L, y - py * L), (x + px * L, y + py * L)], fill=RED, width=6)
g.d.text((x - 40, y - 62), 'Probable 1297 wooden bridge', fill=RED, font=F(26, True), anchor='rb', stroke_width=4, stroke_fill=WHITE)
g.d.text((x - 40, y - 32), '(pier remains, HES SM8264)', fill=RED, font=F(20, True), anchor='rb', stroke_width=4, stroke_fill=WHITE)
xo, yo = g.xy(*OLD); g.d.rectangle([xo - 6, yo - 6, xo + 6, yo + 6], outline=GREY, width=3)
g.d.text((xo - 14, yo + 14), 'stone Old Bridge (15th-16th c., NOT on the 1297 map)', fill=GREY, font=F(20), anchor='rt', stroke_width=3, stroke_fill=WHITE)
# the causeway from the bridge across the loop to Causewayhead, below the Abbey Craig (reconstructed)
g.line([BRIDGE, (56.1318, -3.9338), (56.1350, -3.9330), CAUSEWAYHEAD], (120, 80, 40), 8, dash=18)
g.text(56.1340, -3.9400, 'causeway (reconstructed line)', (120, 80, 40), 22, True)
g.line([FORD, (56.1262, -3.9230)], PURPLE, 6, dash=12); g.text(56.1243, -3.9245, 'possible ford (HES suggestion; exact place unknown)', PURPLE, 20, True)
g.town(*CASTLE, 'STIRLING CASTLE', 'English garrison', 30, BLACK, 14, -34, walled=True)
g.town(56.1195, -3.9370, 'Stirling (burgh)', '', 24, GREY, 8, 24)
g.town(*CRAIG, 'ABBEY CRAIG', 'the Scots waited on or near this hill', 30, BLUE, 12, -34)
g.town(*ABBEY, 'Cambuskenneth Abbey', '', 24, GREY, 9, 24, walled=True)
g.town(*CAUSEWAYHEAD, 'Causewayhead', '', 22, GREY, 7, 22)
g.town(*KILDEAN, 'Kildean (old ford)', '', 22, GREY, 7, 22)
g.ring(*HESREF, .12, 'HES battlefield\nreference point', ORANGE)
g.text(56.1310, -3.9245, 'the loop of the Forth\n(soft, low carse)', BLUE, 24, True)
g.text(56.1205, -3.9230, 'River Forth', BLUE, 26, True); g.text(56.1405, -3.9575, 'River Forth', BLUE, 26, True)
g.frame('STIRLING BRIDGE, 11 September 1297: battle map guide', 'River from the elevation. Places: HES records; dashed = reconstructed.', .005)
json.dump([g.save()], open(os.path.join(OUT, 'maps.json'), 'w'), indent=1)
print('done')
