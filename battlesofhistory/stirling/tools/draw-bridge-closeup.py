#!/usr/bin/env python3
"""Stirling Bridge close-up: the river crossing around the probable 1297 bridge (HES SM8264), about 600 x 450 m, from
real elevation (the Forth traced from the terrain), for ChatGPT to paint the wooden bridge in detail.
    python3 battlesofhistory/stirling/tools/draw-bridge-closeup.py
Outputs to stirling/images/layout/: bridge-guide.png, bridge-base.png, and adds the frame to maps.json."""
import json, math, os, sys
import numpy as np
from PIL import Image, ImageDraw
from scipy.ndimage import binary_opening, binary_closing, binary_dilation, label
from skimage.morphology import skeletonize
HERE = os.path.dirname(os.path.abspath(__file__)); TT = os.path.join(HERE, '..', '..', 'talas', 'tools')
sys.path.insert(0, TT)
import dem as DEM
src = open(os.path.join(TT, 'draw-layout-guides.py')).read().split('# ---------- places (lat, lon) ----------')[0]
src = src.replace("('%.2f°E' if step < 1", "('%.4f°E' if step < .01 else '%.2f°E' if step < 1").replace("('%.2f°N' if step < 1", "('%.4f°N' if step < .01 else '%.2f°N' if step < 1")
src = src.replace("(200, 100, 50, 20, 10, 5, 2, 1)", "(200, 100, 50, 20, 10, 5, 2, 1, .5, .2, .1)").replace("'%d km' % km", "('%d km' % km if km >= 1 else '%d m' % round(km * 1000))")
G = {'__file__': os.path.join(TT, 'draw-layout-guides.py')}; exec(compile(src, 'dlg', 'exec'), G)
OUT = os.path.join(HERE, '..', 'images', 'layout'); G['OUT'] = OUT
Guide, F, RED, BLUE, BLACK, GREY, PURPLE, WATER, WHITE = (G[k] for k in ('Guide', 'F', 'RED', 'BLUE', 'BLACK', 'GREY', 'PURPLE', 'WATER', 'WHITE'))
W, H = G['W'], G['H']
G['RAMP'][:] = [(0, (150, 178, 120)), (6, (168, 190, 128)), (12, (186, 198, 136)), (30, (196, 196, 140)), (60, (188, 176, 128))]

BRIDGE = (56.129126, -3.936699); OLD = (56.1280, -3.9369)
KM_W, KM_H = .60, .45
latc, lonc = BRIDGE[0] + .0004, BRIDGE[1] + .0004   # a little north-east, to show the bridgehead on the north bank
dlat = KM_H / 111.32 / 2; dlon = KM_W / (111.32 * math.cos(math.radians(latc))) / 2
LAT0, LAT1, LON0, LON1 = latc - dlat, latc + dlat, lonc - dlon, lonc + dlon
# the river: traced on the wider battle-map frame (where the whole channel is visible), then sampled here
BL0, BL1, BO0, BO1 = 56.1175, 56.1445, -3.9640, -3.8997
e = DEM.dem(BL0, BL1, BO0, BO1, W, H, 15)
w = binary_closing(binary_opening(e < 3.0, iterations=1), iterations=2)
lab, n = label(w); s = np.bincount(lab.ravel()); w = (s[lab] > 3000) & (lab > 0)
mid = skeletonize(w)
ys, xs = np.nonzero(mid)
lats = BL1 - (ys + .5) / H * (BL1 - BL0); lons = BO0 + (xs + .5) / W * (BO1 - BO0)

g = Guide('bridge-guide.png', LAT0, LAT1, LON0, LON1, 15, None, None)
mask = Image.new('L', (W, H), 0); dm = ImageDraw.Draw(mask)
px_per_m = W / (KM_W * 1000); r = 32 * px_per_m   # a channel ~64 m wide
for la, lo in zip(lats, lons):
    if LAT0 - .002 < la < LAT1 + .002 and LON0 - .003 < lo < LON1 + .003:
        x, y = g.xy(la, lo); dm.ellipse([x - r, y - r, x + r, y + r], fill=255)
water = np.asarray(mask) > 0
rgb = g.rgb.copy(); rgb[water] = WATER
g.im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); g.d = ImageDraw.Draw(g.im)
g.im.save(os.path.join(OUT, 'bridge-base.png'), optimize=True)

# the bridge: a narrow deck (~4 m) across the channel at the HES point, its line ~30 degrees off square to the stream
x, y = g.xy(*BRIDGE)
yy, xx = np.nonzero(water[int(y) - 300:int(y) + 300, int(x) - 300:int(x) + 300]); c = np.cov(np.vstack([xx, yy])); ev, v = np.linalg.eigh(c)
fx, fy = v[:, 1]                       # direction of the stream
ax, ay = -fy, fx                       # straight across
a = math.radians(30); bx, by = ax * math.cos(a) - ay * math.sin(a), ax * math.sin(a) + ay * math.cos(a)   # 30 deg skew
L = 52 * px_per_m                      # half length, to reach both banks
p1, p2 = (x - bx * L, y - by * L), (x + bx * L, y + by * L)
g.d.line([p1, p2], fill=(110, 70, 35), width=int(5 * px_per_m)); g.d.line([p1, p2], fill=RED, width=4)
for k in range(8):                     # eight piers, as on Stirling's 1296 burgh seal
    t = -0.8 + 1.6 * k / 7; px, py = x + bx * L * t, y + by * L * t
    g.d.rectangle([px - 14, py - 14, px + 14, py + 14], outline=BLACK, width=4)
g.d.text((60, 300), 'Probable 1297 wooden bridge: narrow deck (two horsemen abreast)\non 8 piers (Stirling burgh seal, 1296), 4 found in the river (HES SM8264)', fill=RED, font=F(26, True), stroke_width=4, stroke_fill=WHITE)
xo, yo = g.xy(*OLD); g.d.rectangle([xo - 12, yo - 12, xo + 12, yo + 12], outline=GREY, width=4)
g.d.text((xo + 20, yo + 20), 'site of the later stone Old Bridge (NOT in 1297)', fill=GREY, font=F(24, True), stroke_width=3, stroke_fill=WHITE)
# here the Forth runs north-south: the bridge joins the Stirling (west) bank to the east bank, where the causeway leads
# north-east across the river loop toward the Abbey Craig (reconstructed)
nx, ny = p1 if p1[0] > p2[0] else p2
g.d.line([(nx, ny), (nx + 180, ny - 300), (nx + 520, ny - 900)], fill=(120, 80, 40), width=int(6 * px_per_m))
g.d.text((nx + 200, ny - 330), 'causeway north-east to the Abbey Craig (reconstructed)', fill=(120, 80, 40), font=F(26, True), stroke_width=4, stroke_fill=WHITE)
sx, sy = p1 if p1[0] < p2[0] else p2
g.d.text((sx - 60, sy + 120), 'west bank: road up to Stirling and the castle', anchor='rt', fill=BLACK, font=F(26, True), stroke_width=4, stroke_fill=WHITE)
g.d.text((W * .30, H * .13), 'River Forth', fill=BLUE, font=F(34, True), stroke_width=4, stroke_fill=WHITE)
g.frame('STIRLING BRIDGE close-up, 1297: guide', 'Bridge at the HES point; skew, piers and deck width reconstructed.', .001)
M = json.load(open(os.path.join(OUT, 'maps.json'))); M = [m for m in M if m['file'] != 'bridge-guide.png'] + [g.save()]
json.dump(M, open(os.path.join(OUT, 'maps.json'), 'w'), indent=1)
print('done')
