#!/usr/bin/env python3
"""Vukovar: a close-up base around the water tower (3.6 x 2.7 km), for a sharp painting of the town centre with the tower,
the Danube bank and the mouth of the Vuka exactly in place. Made after ChatGPT kept inventing the town layout on the
larger maps: the base here already shows the rivers with their sandy banks, the 1991 built-up area and the tower seen
from directly above (a round top with its shadow), so the painter only has to colour it in.
    python3 battlesofhistory/vukovar/tools/draw-tower-close.py
Writes images/layout/tower-base.png (to repaint), tower-guide.png (labels and crosses) and tower.json (the corners)."""
import os, json, math
HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, 'draw-layout-guides.py')).read().split('# ================= 1.')[0]
NS = {'__file__': os.path.join(HERE, 'draw-layout-guides.py'), '__name__': 'tower'}; exec(compile(src, 'dlg', 'exec'), NS)
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage as ndi
G, Guide, water, shade_builtup, RAMP, OUT, W, H = (NS[k] for k in ('G', 'Guide', 'water', 'shade_builtup', 'RAMP', 'OUT', 'W', 'H'))
TOWER, VUKA_TOWN, VUKA_MOUTH, BARRACKS, HOSPITAL = (NS[k] for k in ('TOWER', 'VUKA_TOWN', 'VUKA_MOUTH', 'BARRACKS', 'HOSPITAL'))
T = dict(lat0=45.32, lat1=45.398, lon0=18.932, lon1=19.0800085)    # the town map
LATC, LONC, KMW = 45.3468, 19.0075, 3.6                              # the tower, the Danube bank and the Vuka mouth
dla = KMW * .75 / 111.32; dlo = KMW / (111.32 * math.cos(math.radians(LATC)))
la0, la1, lo0, lo1 = LATC - dla / 2, LATC + dla / 2, LONC - dlo / 2, LONC + dlo / 2
# the water, traced on the whole town map (the Vuka needs the frame's west edge), then cut out and smoothed
G['RAMP'][:] = RAMP
gw = Guide('tower-water-tmp.png', T['lat0'], T['lat1'], T['lon0'], T['lon1'], 15, None, None)
water(gw, 74.5, [[('W', 45.33, 45.37), VUKA_TOWN, VUKA_MOUTH]], 2)
wm = np.all(np.asarray(gw.im) == np.array(NS['WATER']), axis=2)
for f in ('tower-water-tmp.png', 'tower-water-tmp-base.png'):
    try: os.remove(os.path.join(OUT, f))
    except OSError: pass
fx0 = (lo0 - T['lon0']) / (T['lon1'] - T['lon0']) * W; fx1 = (lo1 - T['lon0']) / (T['lon1'] - T['lon0']) * W
fy0 = (T['lat1'] - la1) / (T['lat1'] - T['lat0']) * H; fy1 = (T['lat1'] - la0) / (T['lat1'] - T['lat0']) * H
crop = Image.fromarray((wm * 255).astype('uint8')).crop((round(fx0), round(fy0), round(fx1), round(fy1))).resize((W, H), Image.BICUBIC).filter(ImageFilter.GaussianBlur(6))
WM = np.asarray(crop) > 127
lab, n = ndi.label(WM); sizes = ndi.sum(WM, lab, range(1, n + 1)); WM = lab == (1 + int(np.argmax(sizes)))   # the Danube only
# the Vuka as a gentle curve (the traced line is blocky at this scale): from the west edge, south of the old town, into the Danube
def lonlat_px(la, lo): return ((lo - lo0) / (lo1 - lo0) * W, (la1 - la) / (la1 - la0) * H)
P = [lonlat_px(*p) for p in [(45.3478, 18.9840), (45.3486, 18.9895), (45.3495, 18.9950), (45.3508, 18.9995), (45.3518, 19.0030), (45.3530, 19.0060)]]
P = [P[0]] + P + [P[-1]]; pts = []
for i in range(1, len(P) - 2):
    p0, p1, p2, p3 = P[i - 1], P[i], P[i + 1], P[i + 2]
    for t in np.linspace(0, 1, 40, endpoint=False):
        pts.append(tuple(.5 * (2 * p1[k] + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t * t + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t ** 3) for k in (0, 1)))
vk = Image.new('L', (W, H), 0); ImageDraw.Draw(vk).line(pts + [P[-2]], fill=255, width=22, joint='curve'); WM = WM | (np.asarray(vk) > 0)
g = Guide('tower-guide.png', la0, la1, lo0, lo1, 15, None, None)
shade_builtup(g, col=(150, 120, 110), a=.55)
rgb = np.asarray(g.im).astype(float)
bank = ndi.binary_dilation(WM, iterations=14) & ~WM
rgb[bank] = rgb[bank] * .3 + np.array((222, 205, 160)) * .7      # sandy banks
rgb[WM] = (70, 112, 128)                                          # the water, deep green-blue
im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); d = ImageDraw.Draw(im)
# the water tower seen from directly above: a round concrete top (about 25 m across) with its shadow to the north-east
tx, ty = g.xy(*TOWER); r = 13
d.ellipse([tx - r + 9, ty - r - 9, tx + r + 9, ty + r - 9], fill=(95, 92, 84))           # shadow (afternoon sun from the south-west)
d.ellipse([tx - r, ty - r, tx + r, ty + r], fill=(206, 200, 190), outline=(120, 112, 100), width=3)
d.ellipse([tx - 5, ty - 5, tx + 5, ty + 5], fill=(170, 160, 150))
im.save(os.path.join(OUT, 'tower-base.png'), optimize=True)
g.im = im.copy(); g.d = ImageDraw.Draw(g.im)
def cross(la, lo, name, sub=''):
    x, y = g.xy(la, lo)
    if not (0 <= x < W and 0 <= y < H): return
    g.d.ellipse([x - 26, y - 26, x + 26, y + 26], outline=NS['RED'], width=5); g.d.line([x - 44, y, x + 44, y], fill=NS['RED'], width=3); g.d.line([x, y - 44, x, y + 44], fill=NS['RED'], width=3)
    g.d.text((x + 50, y - 34), name, fill=NS['BLACK'], font=NS['F'](34), stroke_width=4, stroke_fill=NS['WHITE'])
    if sub: g.d.text((x + 50, y + 6), sub, fill=NS['RED'], font=NS['F'](26), stroke_width=3, stroke_fill=NS['WHITE'])
cross(*TOWER, 'WATER TOWER', 'the round top, exactly here')
cross(*VUKA_MOUTH, 'the Vuka meets the Danube (approx.)')
cross(45.3478, 19.0004, 'Franciscan church (approx.)'); cross(45.3497, 19.0012, 'Eltz Palace (approx.)'); cross(*BARRACKS, 'JNA barracks')
g.text(45.3525, 19.022, 'DANUBE', NS['BLUE'], 50, True); g.text(45.3485, 18.992, 'Vuka', NS['BLUE'], 40, True)
g.frame('VUKOVAR: THE WATER TOWER AND THE TOWN CENTRE (close-up, 3.6 x 2.7 km)', 'Real elevation; the Danube and the Vuka from the elevation; 1991 built-up area from the CIA map (shaded); the tower drawn from above at its real place.', .01)
meta = g.save(); json.dump(meta, open(os.path.join(OUT, 'tower.json'), 'w'), indent=1); print(meta)
