#!/usr/bin/env python3
"""Battle of Bunker Hill: a ROUGH FALLBACK for the overview map of Boston and the siege lines, 1775 (12 x 9 km). Not used:
the hand-drawn water outlines were too coarse (18 November 2026); the overview will be cut from a 1775-1777 plan found by
ChatGPT (research/CHATGPT-FIND-BOSTON-MAP-PROMPT.md), lined up like Page's plan in draw-maps.py.
    python3 battlesofhistory/bunkerhill/tools/draw-boston.py
Real elevation (AWS terrain tiles, via the Guide of somalia1988/tools/draw-layout-guides.py) gives the hills. The WATER OF
1775 cannot come from modern data: about a sixth of Boston is made land (Leventhal Map Center). Today's low ground is taken
as water where it touches the sea, and the main areas filled since 1775 are put back as water with hand-drawn APPROXIMATE
outlines: the Back Bay and the Charles basin, the South Bay, the Mill Pond, the waterfront east of the old shore, the flats
off Charlestown, Lechmere Point, the South Boston and East Boston flats and the airport. The Charlestown peninsula follows
Page's plan of 1775 (see draw-maps.py). These outlines are approximate (a few hundred metres at worst) and should be
checked against a plan of 1775-1777 (Page, Pelham) when one is available. Writes images/layout/boston-base.png,
boston-guide.png and maps.json (added)."""
import os, sys, json, math
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.join(HERE, '..', '..')
SOM = os.path.join(ROOT, 'somalia1988', 'tools', 'draw-layout-guides.py')
src = open(SOM).read().split('\nMAPS = {')[0]
NS = {'__file__': SOM, '__name__': 'bunkerhill'}; exec(compile(src, 'som-dlg', 'exec'), NS)
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi
G, Guide, frame43, DRY = (NS[k] for k in ('G', 'Guide', 'frame43', 'DRY'))
BLACK, GREY, BLUE = NS['BLACK'], NS['GREY'], NS['BLUE']
OUT = os.path.join(HERE, '..', 'images', 'layout'); os.makedirs(OUT, exist_ok=True); G['OUT'] = OUT; NS['OUT'] = OUT
la0, la1, lo0, lo1 = frame43(42.355, -71.075, 12)
# water of 1775 put back over today's made land (lat, lon), all approximate
WATER = {
  'Back Bay and the Charles basin': [(42.3605, -71.0712), (42.3555, -71.0700), (42.3510, -71.0680), (42.3470, -71.0668), (42.3420, -71.0690), (42.3380, -71.0735),
      (42.3345, -71.0790), (42.3380, -71.0950), (42.3440, -71.1080), (42.3480, -71.1160), (42.3540, -71.1160), (42.3575, -71.1050), (42.3600, -71.0900), (42.3612, -71.0790)],
  'west of Charles Street': [(42.3645, -71.0700), (42.3610, -71.0712), (42.3585, -71.0712), (42.3585, -71.0780), (42.3655, -71.0780)],
  'South Bay': [(42.3505, -71.0608), (42.3462, -71.0638), (42.3400, -71.0668), (42.3345, -71.0720), (42.3295, -71.0690), (42.3290, -71.0600), (42.3355, -71.0555),
      (42.3420, -71.0535), (42.3480, -71.0555), (42.3520, -71.0578)],
  'Mill Pond': [(42.3680, -71.0625), (42.3660, -71.0592), (42.3640, -71.0575), (42.3618, -71.0595), (42.3625, -71.0632), (42.3660, -71.0640)],
  'the waterfront': [(42.3648, -71.0528), (42.3605, -71.0538), (42.3575, -71.0546), (42.3545, -71.0538), (42.3515, -71.0560), (42.3498, -71.0588), (42.3478, -71.0560),
      (42.3495, -71.0470), (42.3600, -71.0465), (42.3655, -71.0490)],
  'flats off Charlestown (the Navy Yard)': [(42.3748, -71.0522), (42.3722, -71.0562), (42.3700, -71.0545), (42.3700, -71.0440), (42.3790, -71.0440), (42.3792, -71.0492)],
  'Charlestown mill pond and Miller\'s River': [(42.3782, -71.0665), (42.3722, -71.0682), (42.3700, -71.0722), (42.3742, -71.0782), (42.3802, -71.0772), (42.3832, -71.0722)],
  'Lechmere Point marsh': [(42.3722, -71.0762), (42.3662, -71.0762), (42.3662, -71.0852), (42.3702, -71.0862), (42.3742, -71.0822)],
  'South Boston flats': [(42.3500, -71.0560), (42.3450, -71.0520), (42.3402, -71.0450), (42.3402, -71.0300), (42.3532, -71.0300), (42.3532, -71.0480)],
  'East Boston flats and the airport': [(42.3655, -71.0350), (42.3550, -71.0300), (42.3550, -71.0000), (42.3802, -71.0000), (42.3802, -71.0200), (42.3702, -71.0282)],
}
PLACES = [(42.3600, -71.0588, 'BOSTON', 0), (42.3580, -71.0670, 'Beacon Hill', 0), (42.3672, -71.0564, "Copp's Hill", 0), (42.3430, -71.0660, 'Boston Neck', 1),
          (42.3310, -71.0840, 'Roxbury', 0), (42.3325, -71.0485, 'Dorchester Heights', 0), (42.3765, -71.1205, 'Cambridge (the Common)', 0), (42.3725, -71.0633, 'Charlestown', 0),
          (42.3764, -71.0608, "Breed's Hill", 0), (42.3811, -71.0657, 'Bunker Hill', 0), (42.3844, -71.0705, 'Charlestown Neck', 1), (42.3720, -71.0350, "Noddle's Island", 1),
          (42.3690, -71.0770, 'Lechmere Point', 1), (42.3825, -71.0935, 'Prospect Hill', 0), (42.3540, -71.0655, 'the Common', 0)]
AREAS = [(42.3530, -71.0950, 'BACK BAY (water in 1775)'), (42.3640, -71.0900, 'CHARLES RIVER'), (42.3880, -71.0550, 'MYSTIC RIVER'), (42.3500, -71.0300, 'BOSTON HARBOR'),
         (42.3390, -71.0620, 'South Bay')]
G['RAMP'][:] = DRY
g = Guide('boston-guide.png', la0, la1, lo0, lo1, 14, None, None)
H, W = g.e.shape[:2] if g.e.ndim == 2 else g.e.shape
H, W = g.rgb.shape[:2]
e = g.e if g.e.shape[:2] == (H, W) else np.asarray(Image.fromarray(g.e.astype('float32')).resize((W, H)))
low = e <= 1.0; lab, n = ndi.label(low); edge = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
sz = ndi.sum(np.ones_like(lab), lab, range(1, n + 1)); big = [i + 1 for i, v in enumerate(sz) if v > 4000]
sea = np.isin(lab, list(edge) + big)
px = lambda la, lo: ((lo - lo0) / (lo1 - lo0) * W, (la1 - la) / (la1 - la0) * H)
m = Image.new('L', (W, H), 0); dm = ImageDraw.Draw(m)
for poly in WATER.values(): dm.polygon([px(*p) for p in poly], fill=255)
water = sea | (np.asarray(m) > 0)
water = ndi.binary_opening(ndi.binary_closing(water, iterations=2), iterations=1)
rgb = g.rgb.copy().astype(float); rgb[water] = (78, 118, 160)
g.im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); g.d = ImageDraw.Draw(g.im)
g.im.save(os.path.join(OUT, 'boston-base.png'), optimize=True)
for la, lo, t, ap in PLACES:
    if la0 < la < la1 and lo0 < lo < lo1: g.town(la, lo, t + (' (approx.)' if ap else ''), '', 26, GREY if ap else BLACK, 9, -24)
for la, lo, t in AREAS: g.text(la, lo, t, BLUE if t.isupper() else GREY, 26, True)
g.frame('BOSTON AND THE SIEGE LINES, JUNE 1775: layout guide', 'Real elevation; the 1775 water is APPROXIMATE: low ground today plus the main areas filled since 1775, drawn by hand; Charlestown after Page\'s plan of 1775. Labels are for the painter only.', .01)
meta = g.save()
mj = os.path.join(OUT, 'maps.json'); d = json.load(open(mj)); d.setdefault('maps', []); d['maps'] = [x for x in d['maps'] if x.get('file') != 'boston-guide.png'] + [meta]
json.dump(d, open(mj, 'w'), indent=1); print('boston', round(meta['km_w'], 1), 'x', round(meta['km_h'], 1), 'km')
