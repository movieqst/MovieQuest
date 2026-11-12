#!/usr/bin/env python3
"""Vukovar: a painted map for the globe's first stop (south-eastern Europe), so the globe can fade from the outlined
countries into a painting. Base and guide from real elevation (AWS terrain tiles), with the same Guide class as the other
maps (via sixday/tools/draw-layout-guides.py). The frame is wider than the screen shows, so the painting covers the view
at any screen size; the globe lays it on by its corners (scenario.js, globe.paintings).
    python3 battlesofhistory/vukovar/tools/draw-region-guide.py
Writes vukovar/images/layout/region-base.png (land, sea, lakes, rivers; no borders, no names) and region-guide.png (with
today's borders in grey and the main cities, for orientation)."""
import os, json, tempfile
HERE = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(HERE, '..', 'images', 'layout'); os.makedirs(OUT, exist_ok=True)
SD = os.path.join(HERE, '..', '..', 'sixday', 'tools', 'draw-layout-guides.py')
src = open(SD).read().split('want = sys.argv')[0]
G = {'__file__': SD, '__name__': 'vk-region'}; exec(src, G)
import numpy as np
from PIL import Image, ImageDraw
from scipy.ndimage import label
LA1, LO0, LA0, LO1 = 51.5, 3.5, 34.5, 34.5          # 31 x 17 degrees: Italy to the Black Sea, Germany to Crete
Gd = G['G']; Gd['OUT'] = OUT; G['OUT'] = OUT
Gd['RAMP'][:] = [(0, (150, 168, 108)), (200, (160, 172, 112)), (500, (170, 166, 118)), (900, (160, 146, 110)), (1500, (140, 128, 104)), (2500, (180, 176, 170))]
g = G['Guide']('region-guide.png', LA0, LA1, LO0, LO1, 6, None, None)
low = g.e <= .5
lab, n = label(low); edge = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
sea = np.isin(lab, list(edge)); rgb = g.rgb.copy(); rgb[sea] = (78, 118, 160)
g.im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); g.d = ImageDraw.Draw(g.im)
CACHE = G['CACHE']
def clean(p):
    d = json.load(open(p)); d['features'] = [f for f in d['features'] if f.get('geometry')]
    o = os.path.join(tempfile.gettempdir(), 'clean-' + os.path.basename(p)); json.dump(d, open(o, 'w')); return o
g.lakes(clean(os.path.join(CACHE, 'ne_10m_lakes.geojson'))); g.geojson_lines(clean(os.path.join(CACHE, 'ne_rivers.geojson')), G['WATER'], 4)
g.im.save(os.path.join(OUT, 'region-base.png'), optimize=True)
g.geojson_lines(clean(os.path.join(CACHE, 'ne_10m_admin_0_boundary_lines_land.geojson')), (90, 90, 90), 3)
for name, la, lo in [('Vukovar', 45.35, 19.00), ('Zagreb', 45.81, 15.98), ('Belgrade', 44.82, 20.46), ('Sarajevo', 43.86, 18.41), ('Ljubljana', 46.06, 14.51),
                     ('Budapest', 47.50, 19.04), ('Vienna', 48.21, 16.37), ('Rome', 41.90, 12.50), ('Bucharest', 44.43, 26.10), ('Sofia', 42.70, 23.32),
                     ('Athens', 37.98, 23.73), ('Istanbul', 41.01, 28.98), ('Munich', 48.14, 11.58), ('Danube delta', 45.2, 29.4)]:
    g.town(la, lo, name, '', 26, G['BLACK'], 7, -22)
g.frame('SOUTH-EASTERN EUROPE: the globe\'s first stop (Vukovar)', 'Terrain from elevation. Borders today\'s, for orientation only: do not paint them.', 1)
meta = g.save(); print(meta)
