#!/usr/bin/env python3
"""Vimy Ridge battle map: layout guide, clean base and Nicholson overlay, from REAL elevation (SRTM via the Talas tools)
and Nicholson's official-history Map 7 (sources/), lined up to the real terrain by its height tints.
    python3 battlesofhistory/vimy/tools/draw-layout-guides.py
Outputs to vimy/images/layout/:
  battle-guide.png        terrain + Nicholson's map blended in + lat/lon grid + labels (the reference for painters)
  battle-base.png         terrain only, with the woods and villages of 1917 as plain shapes (for ChatGPT to repaint)
  battle-nicholson.jpg    Nicholson's Map 7 warped exactly onto the battle-map frame (for checking positions)
  maps.json               the frame's corners
The battle map: 2400 x 1800 world pixels, north up, 50.402 N 2.710 E (top left) to 50.322 N 2.877 E (bottom right),
about 11.9 x 8.9 km, 5 m per pixel."""
import json, math, os, sys
import numpy as np
from PIL import Image, ImageDraw
from scipy.ndimage import map_coordinates, binary_opening, binary_closing, median_filter
HERE = os.path.dirname(os.path.abspath(__file__)); TT = os.path.join(HERE, '..', '..', 'talas', 'tools')
sys.path.insert(0, TT)
src = open(os.path.join(TT, 'draw-layout-guides.py')).read().split('# ---------- places (lat, lon) ----------')[0]
G = {'__file__': os.path.join(TT, 'draw-layout-guides.py')}; exec(compile(src, 'dlg', 'exec'), G)
OUT = os.path.join(HERE, '..', 'images', 'layout'); G['OUT'] = OUT; SRC = os.path.join(HERE, '..', 'sources')
Guide, F, RED, BLUE, BLACK, GREY = G['Guide'], G['F'], G['RED'], G['BLUE'], G['BLACK'], G['GREY']
G['RAMP'][:] = [(0, (196, 206, 150)), (60, (200, 208, 150)), (80, (208, 206, 148)), (100, (214, 200, 140)), (120, (206, 186, 128)), (140, (190, 168, 114)), (160, (176, 152, 104))]
LAT0, LAT1, LON0, LON1 = 50.322, 50.402, 2.710, 2.877
W, H = 2400, 1800

# Nicholson Map 7 warped into the frame
meta = json.load(open(os.path.join(SRC, 'nicholson-map7-georef.json'))); A = np.array(meta['A'])
M = np.asarray(Image.open(os.path.join(SRC, meta['file'])).convert('RGB')).astype(float); MH, MW = M.shape[:2]
inv = np.linalg.inv(np.array([[A[0, 0], A[1, 0], A[2, 0]], [A[0, 1], A[1, 1], A[2, 1]], [0, 0, 1]]))
gy, gx = np.mgrid[0:H, 0:W]; lon = LON0 + (gx + .5) / W * (LON1 - LON0); lat = LAT1 - (gy + .5) / H * (LAT1 - LAT0)
mx = inv[0, 0] * lon + inv[0, 1] * lat + inv[0, 2]; my = inv[1, 0] * lon + inv[1, 1] * lat + inv[1, 2]
NW = np.stack([map_coordinates(M[..., k], [my, mx], order=1, mode='constant', cval=255) for k in range(3)], -1)
os.makedirs(OUT, exist_ok=True); Image.fromarray(NW.clip(0, 255).astype('uint8')).save(os.path.join(OUT, 'battle-nicholson.jpg'), quality=90)

# woods (green hatching) and villages (dark grey hatching) picked out of Nicholson's colours
r, g, b = NW[..., 0], NW[..., 1], NW[..., 2]
woods = median_filter(((g > r + 12) & (g > b + 8)).astype(np.uint8), 9) > 0; woods = binary_closing(binary_opening(woods, iterations=2), iterations=6)
from scipy.ndimage import uniform_filter, label
grey = (((abs(r - g) < 18) & (abs(g - b) < 20) & (r < 165)) | (((r + g + b) / 3 < 120) & (r - g < 30) & (r - b < 60))).astype(float)   # grey, or dark and not red (the hatching over the height tints)
vill = uniform_filter(grey, 17) > .3   # the villages' grey hatching: dense dark-grey stripes
vill = binary_opening(vill, iterations=7)   # thin lines (the front-line dashes, text) vanish; village blocks stay
lab, n = label(vill); sizes = np.bincount(lab.ravel()); vill = (sizes[lab] > 400) & (lab > 0)
vill = binary_closing(vill, iterations=4)
# villages whose hatching is hidden under Nicholson's red overprint, drawn from the map by hand (world px)
from PIL import ImageDraw as _D
_m = Image.new('L', (W, H), 0); _d = _D.Draw(_m)
_d.polygon([(1256, 1066), (1286, 1050), (1390, 1102), (1370, 1124)], fill=255)                    # Thélus
_d.polygon([(640, 1050), (700, 920), (735, 905), (760, 930), (720, 1010), (690, 1075), (650, 1080)], fill=255)   # Neuville-Saint-Vaast
vill |= np.asarray(_m) > 0

g0 = Guide('battle-guide.png', LAT0, LAT1, LON0, LON1, 14, None, None)
base = np.asarray(g0.im).astype(float)
base[woods] = base[woods] * .55 + np.array([70, 110, 60]) * .45
base[vill] = base[vill] * .4 + np.array([120, 110, 100]) * .6
Image.fromarray(base.clip(0, 255).astype('uint8')).save(os.path.join(OUT, 'battle-base.png'), optimize=True)
gd = base * .55 + NW * .45
g0.im = Image.fromarray(gd.clip(0, 255).astype('uint8')); g0.d = ImageDraw.Draw(g0.im)
for n, la, lo in [('Hill 145 (Vimy Memorial)', 50.3797, 2.7738)]:
    x, y = g0.xy(la, lo); g0.d.ellipse([x - 9, y - 9, x + 9, y + 9], outline=RED, width=4); g0.d.text((x + 14, y), n, fill=RED, font=F(24, True), anchor='lm', stroke_width=4, stroke_fill=(255, 255, 255))
g0.frame('VIMY RIDGE, 9-12 April 1917: battle map guide', 'Nicholson Map 7 blended over the real terrain; woods green, villages grey.', .01)
json.dump([g0.save()], open(os.path.join(OUT, 'maps.json'), 'w'), indent=1)
print('done')
