#!/usr/bin/env python3
"""Vukovar: a close-up base around the water tower (3.6 x 2.7 km), for a sharp painting of the town centre with the tower,
the Danube bank and the mouth of the Vuka exactly in place. Made after ChatGPT kept inventing the town layout on the
larger maps: the base here already shows the rivers with their sandy banks, the 1991 built-up area and the tower seen
from directly above (a round top with its shadow), so the painter only has to colour it in.
    python3 battlesofhistory/vukovar/tools/draw-tower-close.py
Roads, railway, the Vuka and the landmarks come from OpenStreetMap (tools/osm-vukovar.json, © OpenStreetMap contributors,
ODbL); the 1990 town from the GHSL built-up grid (tools/ghsl-vukovar.json, EC JRC, CC BY 4.0). OSM shows today's town,
so only the main roads and the railway are drawn everywhere; side streets are kept where the 1990 grid shows buildings
(see vk_osm.py), as an estimate of the town in 1991.
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
import vk_osm
F = vk_osm.Frame(la0, la1, lo0, lo1, W, H)
WM = vk_osm.water_mask(F)                                         # the Danube and the Vuka from OpenStreetMap
g = Guide('tower-guide.png', la0, la1, lo0, lo1, 15, None, None)
rgb = np.asarray(g.im).astype(float)
B90 = vk_osm.built_mask(F, 1990) & ~WM                            # the town in 1990 (GHSL), shaded
rgb[B90] = rgb[B90] * .45 + np.array((150, 120, 110)) * .55
bank = ndi.binary_dilation(WM, iterations=10) & ~WM
rgb[bank] = rgb[bank] * .3 + np.array((222, 205, 160)) * .7      # sandy banks
rgb[WM] = (70, 112, 128)                                          # the water, deep green-blue
print('side streets kept (built-up by 1990), left out (probably newer):', vk_osm.roads(F, rgb, WM))
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
PL = vk_osm.OSM['places']
cross(*PL['Franciscan monastery and church of Sts Philip and James'], 'Franciscan church', 'on the hill')
cross(*PL['Eltz Palace (Dvorac Eltz)'], 'Eltz Palace'); cross(*PL['barracks (today Vojarna 204. brigade; the JNA barracks in 1991)'], 'JNA barracks')
cross(*PL['Hotel Dunav'], 'Hotel Dunav'); cross(*PL['hospital (today Nacionalna memorijalna bolnica)'], 'HOSPITAL')
g.text(45.3525, 19.022, 'DANUBE', NS['BLUE'], 50, True); g.text(45.3485, 18.992, 'Vuka', NS['BLUE'], 40, True)
g.frame('VUKOVAR: THE WATER TOWER AND THE TOWN CENTRE (close-up, 3.6 x 2.7 km)', 'Water, roads, railway and landmarks: OpenStreetMap (© OSM contributors, ODbL); side streets only where the 1990 built-up map shows buildings, shaded (GHSL 1990, EC JRC, CC BY 4.0); the tower drawn from above at its real place.', .01)
meta = g.save(); json.dump(meta, open(os.path.join(OUT, 'tower.json'), 'w'), indent=1); print(meta)
