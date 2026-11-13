#!/usr/bin/env python3
"""Six-Day War: the Abu-Ageila / Um Katef map (16 x 12 km), base and SCHEMATIC layout guide.
    python3 battlesofhistory/sixday/tools/draw-abuageila-guide.py
The elevation around Abu-Ageila is nearly flat (about 100 to 200 m) and, at this resolution, the Um Katef ridge cannot be
told from dune noise, so the guide is a schematic over the real relief, as research/sinai.md recommends ("positions
approximate"). Places: plan/maps.md (the junction is verified; the ridge, the Ruafa dam and Position 181 are estimates).
Writes images/layout/abuageila-base.png (relief only) and abuageila-guide.png (schematic, labels, grid); the frame is also in
tools/draw-layout-guides.py and maps.json."""
import os, json
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy.ndimage import gaussian_filter
HERE = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(HERE, '..', 'images', 'layout')
W, H = 2400, 1800; LA1, LO0, LA0, LO1 = 30.9190, 34.0260, 30.8110, 34.1940
P = lambda la, lo: ((lo - LO0) / (LO1 - LO0) * W, (LA1 - la) / (LA1 - LA0) * H)
F = lambda s, b=True: ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf' % ('-Bold' if b else ''), s)

# the relief, from the same AWS terrain tiles as the other maps (via draw-layout-guides.py's Guide class)
src = open(os.path.join(HERE, 'draw-layout-guides.py')).read().split('want = sys.argv')[0]
G = {'__file__': os.path.join(HERE, 'draw-layout-guides.py'), '__name__': 'abuageila'}; exec(src, G)
e = G['Guide']('abuageila-guide.png', LA0, LA1, LO0, LO1, 14, None, None).e
s = gaussian_filter(np.clip(e, 90, 210), 6); gy, gx = np.gradient(s)
sh = np.clip(0.75 + (-gx * 0.7 + gy * 0.7) * 0.25, 0.4, 1.2); t = np.clip((s - 95) / 90, 0, 1)[..., None]
rgb = (np.array([214, 196, 150]) * (1 - t) + np.array([158, 132, 96]) * t) * sh[..., None]
base = Image.fromarray(rgb.clip(0, 255).astype('uint8')); base.save(os.path.join(OUT, 'abuageila-base.png'), optimize=True)

g = base.copy(); d = ImageDraw.Draw(g, 'RGBA')
def text(xy, s, size=28, fill=(60, 40, 20)): d.multiline_text(xy, s, font=F(size), fill=fill, stroke_width=3, stroke_fill=(238, 224, 186))
J, DAM, P181 = P(30.8431, 34.1177), P(30.87, 34.07), P(30.88, 34.13)
# sand dunes to the north
d.polygon([P(30.919, 34.026), P(30.919, 34.194), P(30.885, 34.194), P(30.878, 34.16), P(30.884, 34.10), P(30.890, 34.06), P(30.888, 34.026)], fill=(240, 215, 150, 150))
text(P(30.906, 34.075), 'SAND DUNES (the 99th Brigade crossed here; no minefields: thought impassable)', 30, (120, 80, 20))
# the Wadi El Arish, a dry bed, west of the junction and past the Ruafa dam
wadi = [P(30.811, 34.112), P(30.83, 34.106), P(30.845, 34.098), P(30.858, 34.085), P(30.870, 34.070), P(30.885, 34.055), P(30.905, 34.040), P(30.919, 34.032)]
d.line(wadi, fill=(60, 110, 170, 200), width=26); text((wadi[3][0] - 470, wadi[3][1] + 20), 'WADI EL ARISH\n(dry bed)', 30, (30, 70, 140))
d.rectangle((DAM[0] - 30, DAM[1] - 10, DAM[0] + 30, DAM[1] + 10), fill=(70, 70, 70)); text((DAM[0] - 380, DAM[1] - 70), 'RUAFA DAM (approx.)', 30, (40, 40, 40))
# the Um Katef ridge: a low ridge east of the junction, astride the Nitzana road, about 5 km long
ridge = [P(30.873, 34.142), P(30.860, 34.148), P(30.848, 34.152), P(30.835, 34.155), P(30.828, 34.158)]
d.line(ridge, fill=(130, 95, 55, 210), width=90)
text((ridge[1][0] - 600, ridge[1][1] - 250), 'UM KATEF RIDGE (approx.) →\nlow sandstone ridge, about 5 km long,\na few tens of metres high.\nLeave it BARE: the page draws\nthe trenches and bunkers.', 28, (70, 40, 10))
# the roads from the junction
def road(pts):
    d.line(pts, fill=(60, 40, 20), width=12); d.line(pts, fill=(225, 205, 160), width=6)
road([J, P(30.852, 34.150), P(30.862, 34.194)]); text((1800, P(30.862, 34.194)[1] + 20), 'to NITZANA and the border →', 28)
road([J, P(30.860, 34.095), P(30.885, 34.060), P(30.919, 34.035)]); text((P(30.900, 34.045)[0] + 30, P(30.900, 34.045)[1] + 40), '← to BIR LAHFAN\n    and EL ARISH', 28)
road([J, P(30.825, 34.150), P(30.811, 34.170)]); text((P(30.815, 34.15)[0] - 520, P(30.815, 34.15)[1] - 30), 'to KUSSEIMA (south-east) ↘', 28)
# the Batur track: from the north-east, past Position 181, to the Ruafa dam
d.line([P(30.905, 34.194), P(30.893, 34.165), P181, P(30.875, 34.10), DAM], fill=(110, 70, 40, 230), width=6)
d.ellipse((P181[0] - 14, P181[1] - 14, P181[0] + 14, P181[1] + 14), fill=(80, 40, 10)); text((P181[0] + 24, P181[1] - 50), 'POSITION 181 (approx.)\non the BATUR TRACK', 30, (80, 40, 10))
d.ellipse((J[0] - 16, J[1] - 16, J[0] + 16, J[1] + 16), fill=(0, 0, 0)); text((J[0] - 150, J[1] + 24), 'ABU-AGEILA junction\n(a few huts and a well)', 30, (0, 0, 0))
# grid and title
fs = F(22, False)
for lon in np.arange(34.03, 34.195, 0.01):
    x, _ = P(30.9, lon); d.line((x, 60, x, H), fill=(255, 255, 255, 90), width=1); d.text((x + 3, H - 28), '%.2f°E' % lon, font=fs, fill='black')
for lat in np.arange(30.82, 30.92, 0.01):
    _, y = P(lat, 34.1); d.line((0, y, W, y), fill=(255, 255, 255, 90), width=1); d.text((4, y + 3), '%.2f°N' % lat, font=fs, fill='black')
d.rectangle((0, 0, W, 58), fill=(255, 255, 255))
d.text((14, 12), 'N ↑  ABU-AGEILA / UM KATEF, 5-6 June 1967: SCHEMATIC layout guide, 16 x 12 km (2 km ≈ 300 px). Positions approximate.', font=F(30), fill=(200, 0, 0))
g.save(os.path.join(OUT, 'abuageila-guide.png'), optimize=True)
mj = os.path.join(OUT, 'maps.json'); metas = {m['file']: m for m in json.load(open(mj))}
metas['abuageila-guide.png'] = {'file': 'abuageila-guide.png', 'width': W, 'height': H, 'lat0': LA0, 'lat1': LA1, 'lon0': LO0, 'lon1': LO1, 'km_w': 16.0, 'km_h': 12.0}
json.dump(list(metas.values()), open(mj, 'w'), indent=1); print('wrote abuageila-base.png, abuageila-guide.png')
