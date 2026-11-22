#!/usr/bin/env python3
"""Operation Midnight Hammer: the 'World' map for the flight chapters (Missouri, the Atlantic, the Mediterranean, Iran), a
relief render from real elevation data (AWS terrain tiles) with Natural Earth lakes and rivers, through the Ukraine tool
(ukraine-escalation/tools/draw-maps.py). Used as it is (no painting): equirectangular, about 14,000 km wide at 40°N, so the
far north is stretched. Writes images/world-painting.jpg and adds its corners to images/layout/maps.json.
    python3 battlesofhistory/midnight-hammer/tools/draw-world.py"""
import os, json
HERE = os.path.dirname(os.path.abspath(__file__)); UK = os.path.join(HERE, '..', '..', 'ukraine-escalation', 'tools', 'draw-maps.py')
src = open(UK).read().split('\nwant = sys.argv')[0]
NS = {'__file__': UK, '__name__': 'mh-world'}; exec(compile(src, 'uk-maps', 'exec'), NS)
G, Guide, frame43, sea_mask, CACHE, clean, GREEN, WATER = (NS[k] for k in ('G', 'Guide', 'frame43', 'sea_mask', 'CACHE', 'clean', 'GREEN', 'WATER'))
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi
OUT = os.path.join(HERE, '..', 'images', 'layout'); G['OUT'] = OUT; NS['OUT'] = OUT
la0, la1, lo0, lo1 = frame43(36.0, -19.0, 14000)
G['RAMP'][:] = GREEN
g = Guide('world-guide.png', la0, la1, lo0, lo1, 3, None, None)
sea = sea_mask(g); lab, n = ndi.label(g.e <= .5); sz = ndi.sum(np.ones_like(lab), lab, range(1, n + 1))
sea |= np.isin(lab, [i + 1 for i, v in enumerate(sz) if v > 3000])
rgb = g.rgb.copy().astype(float); rgb[sea] = (40, 72, 112)
g.im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); g.d = ImageDraw.Draw(g.im)
g.lakes(clean(os.path.join(CACHE, 'ne_10m_lakes.geojson')))
g.im.convert('RGB').save(os.path.join(OUT, '..', 'world-painting.jpg'), quality=88)
g.frame('THE WORLD: Missouri to Iran', 'Real elevation; lakes: Natural Earth.', 10)
meta = g.save(); mj = os.path.join(OUT, 'maps.json'); old = {m['file']: m for m in json.load(open(mj))}; old[meta['file']] = meta
json.dump(list(old.values()), open(mj, 'w'), indent=1); print(meta)
