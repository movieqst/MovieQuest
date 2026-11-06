#!/usr/bin/env python3
"""Fish Creek (Tourond's Coulee), 24 April 1885: layout guide and clean base for the battle map, from REAL elevation
(AWS terrain tiles), with the same tools as Batoche's maps (batoche/tools/draw-layout-guides.py).
    python3 battlesofhistory/fishcreek/tools/draw-layout-guides.py
Outputs fishcreek/images/layout/battle-guide.png, battle-base.png and maps.json. Positions marked approx. are still to
be checked against the research (Parks Canada, Hildebrandt's Fish Creek work, the 1886 Sessional Papers)."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
BT = os.path.join(HERE, '..', '..', 'batoche', 'tools', 'draw-layout-guides.py')
src = open(BT).read().split('os.makedirs(OUT, exist_ok=True); metas = []')[0]
G2 = {'__file__': BT, '__name__': 'fishcreek'}; exec(compile(src, 'batoche-dlg', 'exec'), G2)
OUT = os.path.join(HERE, '..', 'images', 'layout'); os.makedirs(OUT, exist_ok=True)
G = G2['G']; G['OUT'] = OUT; G2['OUT'] = OUT
Guide, river_from_dem, river_paths = G2['Guide'], G2['river_from_dem'], G2['river_paths']
RED, BLUE, BLACK, GREY, BROWN = G2['RED'], G2['BLUE'], G2['BLACK'], G2['GREY'], G2['BROWN']
import json

SITE = (52.53901, -106.152659)   # Battle of Tourond's Coulee / Fish Creek National Historic Site (Parks Canada)
G['RAMP'][:] = [(440, (150, 178, 120)), (452, (160, 184, 124)), (466, (176, 190, 128)), (480, (190, 194, 134)), (495, (200, 196, 140)), (510, (206, 198, 146))]
LAT0, LAT1, LON0, LON1 = 52.5270, 52.5641, -106.2220, -106.1405
g = Guide('battle-guide.png', LAT0, LAT1, LON0, LON1, 15, None, None)
# The South Saskatchewan: in the elevation data its surface is flat, at about 445.8 m downstream and 451.8 m upstream
# (two source tiles). Water = ground at either level, in long pieces only.
import numpy as np
from PIL import Image, ImageDraw
from scipy.ndimage import binary_opening, binary_closing, label, find_objects, gaussian_filter
e = g.e; w = (e < 446.6) | ((e > 451.4) & (e < 452.5))
w = binary_closing(binary_opening(w, iterations=2), iterations=3); lab, n = label(w); keep = np.zeros(n + 1, bool)
for i, sl in enumerate(find_objects(lab), 1):
    if sl is not None: keep[i] = max((sl[0].stop - sl[0].start) / 1800, (sl[1].stop - sl[1].start) / 2400) > .25 and (lab[sl] == i).sum() > 20000
w = keep[lab]
from scipy.ndimage import binary_dilation   # the seam between the two tiles: low ground right next to the water
w |= binary_dilation(w, iterations=70) & (e < 452.5); w = binary_closing(w, iterations=4)
rgb = g.rgb.copy(); rgb[w] = G2['WATER']
g.im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); g.d = ImageDraw.Draw(g.im)
g.im.save(os.path.join(OUT, 'battle-base.png'), optimize=True)
g.town(*SITE, "TOUROND'S COULEE", 'Parks Canada site (Fish Creek NHS)', 28, BLACK, 12, -34)
g.text(SITE[0] - .0050, SITE[1] - .004, 'the Métis and First Nations\nfighters in the coulee (approx.)', BLUE, 22, True)
g.arrow([(52.5270, -106.1500), (52.5320, -106.1510), (52.5360, -106.1530)], RED, "Middleton's column, east bank, from the south (approx.)", 7, at=0)
g.arrow([(52.5440, -106.2200), (52.5500, -106.2080)], RED, 'west bank column (approx.)', 7, at=0)
g.text(52.5500, -106.1990, 'South Saskatchewan River', BLUE, 26, True)
g.text(52.5560, -106.2120, 'west bank', GREY, 22, True)
g.text(52.5545, -106.1700, 'Fish Creek', BLUE, 22, True)
g.frame("FISH CREEK (TOUROND'S COULEE), 24 April 1885: battle map guide", 'River and coulee from the elevation. Positions approx., to check.', .01)
meta = g.save()
json.dump([meta], open(os.path.join(OUT, 'maps.json'), 'w'), indent=1)
print(meta)
