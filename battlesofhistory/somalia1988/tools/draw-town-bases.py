#!/usr/bin/env python3
"""Somalia 1988: the three town maps (Hargeisa, Burao, Berbera) with real streets, riverbeds and runways, so the painter
has something exact to follow (the first bases were bare terrain, and ChatGPT invented the towns).
  - streets, riverbeds (tog), runways and the coast: OpenStreetMap (tools/osm-towns.json, © OpenStreetMap contributors, ODbL);
  - the town as it was about 1990: GHS-BUILT-S R2023A, 1990 (tools/ghsl-towns.json, European Commission JRC, CC BY 4.0).
    Today's towns are far larger (Hargeisa grew several times over after 1991), so side streets are kept only where the
    1990 grid already shows buildings; main roads, the riverbeds and the runways are kept everywhere.
Starts from the terrain bases made by draw-layout-guides.py (<town>-base.png, kept as <town>-terrain.png).
Writes images/layout/<town>-base.png (to repaint) and <town>-guide.png (the same, with neutral labels for the painter).
    python3 battlesofhistory/somalia1988/tools/draw-town-bases.py"""
import os, json, shutil
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy import ndimage as ndi
HERE = os.path.dirname(os.path.abspath(__file__)); LAY = os.path.join(HERE, '..', 'images', 'layout')
OSM = json.load(open(os.path.join(HERE, 'osm-towns.json')))
GH = json.load(open(os.path.join(HERE, 'ghsl-towns.json')))
FRAMES = {m['file'].split('-')[0]: m for m in json.load(open(os.path.join(LAY, 'maps.json')))}
MAIN = {'trunk', 'trunk_link', 'primary', 'primary_link', 'secondary', 'secondary_link', 'tertiary', 'tertiary_link'}
SIDE = {'unclassified', 'residential', 'living_street'}
THRESH = 300          # m2 of buildings in a ~90 m cell: 'built up in 1990'
# neutral landmarks for the painter (the page puts the history on top itself): (lat, lon, label)
MARKS = {
    'hargeisa': [(9.5606, 44.0650, 'TOWN CENTRE'), (9.5149, 44.0850, 'AIRPORT (runway)')],
    'burao': [(9.522, 45.535, 'TOWN CENTRE'), (9.5327, 45.5596, 'AIRSTRIP')],
    'berbera': [(10.44, 45.012, 'OLD TOWN AND PORT'), (10.3845, 44.9362, 'AIRPORT (long runway)')],
}
RIVERS = {'hargeisa': 'Hargeisa riverbed (tog, dry)', 'burao': 'Togdheer riverbed (dry)', 'berbera': ''}
try: F = lambda s: ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', s)
except OSError: F = lambda s: ImageFont.load_default()

for town, m in ((t, FRAMES[t]) for t in ('hargeisa', 'burao', 'berbera')):
    W, H = m['width'], m['height']
    terr = os.path.join(LAY, town + '-terrain.png')
    if not os.path.exists(terr): shutil.copy(os.path.join(LAY, town + '-base.png'), terr)
    rgb = np.asarray(Image.open(terr).convert('RGB')).astype(float)
    px = lambda la, lo: ((lo - m['lon0']) / (m['lon1'] - m['lon0']) * W, (m['lat1'] - la) / (m['lat1'] - m['lat0']) * H)
    mpp = m['km_w'] * 1000 / W
    sea = (rgb[..., 2] > rgb[..., 0] + 25) & (rgb[..., 2] > 120)          # the sea of the terrain base (blue)
    # the town about 1990, smooth, from the built-up grid
    g = GH[town]; G90 = np.array(g['e1990'], float)
    yy, xx = np.mgrid[0:H, 0:W]
    lat = m['lat1'] - (yy + .5) / H * (m['lat1'] - m['lat0']); lon = m['lon0'] + (xx + .5) / W * (m['lon1'] - m['lon0'])
    r = (g['lat1'] - lat) / abs(g['step']) - .5; c = (lon - g['lon0']) / g['step'] - .5
    B90 = ndi.map_coordinates(ndi.gaussian_filter(G90, .6), [r, c], order=1, mode='nearest') >= THRESH
    B90 &= ~sea
    def built(la, lo):
        rr = int((g['lat1'] - la) / abs(g['step'])); cc = int((lo - g['lon0']) / g['step'])
        if not (0 <= rr < G90.shape[0] and 0 <= cc < G90.shape[1]): return False
        return G90[max(0, rr - 1):rr + 2, max(0, cc - 1):cc + 2].max() >= THRESH
    rgb[B90] = rgb[B90] * .5 + np.array((196, 170, 140)) * .5             # pale stone town, softly
    # riverbeds: wide pale sand with a darker edge (dry tog)
    rv = Image.new('L', (W, H), 0); dv = ImageDraw.Draw(rv)
    for w in OSM[town]['water']:
        if w['k'] in ('river', 'stream'):
            wd = 60 if w['k'] == 'river' else 22
            dv.line([px(*p) for p in w['p']], fill=255, width=max(4, round(wd / mpp)), joint='curve')
    RV = (np.asarray(rv) > 0) & ~sea
    edge = ndi.binary_dilation(RV, iterations=3) & ~RV & ~sea
    rgb[edge] = rgb[edge] * .55 + np.array((120, 110, 80)) * .45; rgb[RV] = rgb[RV] * .25 + np.array((226, 210, 172)) * .75
    # roads: main roads everywhere, side streets only in the 1990 town
    rd = Image.new('L', (W, H), 0); dr = ImageDraw.Draw(rd); kept = dropped = 0
    for o in OSM[town]['roads']:
        q = [px(*a) for a in o['p']]
        if not any(0 <= x < W and 0 <= y < H for x, y in q): continue
        if o['k'] in MAIN: dr.line(q, fill=255, width=max(3, round(12 / mpp)), joint='curve')
        elif o['k'] in SIDE:
            v = [built(*a) for a in o['p']]
            if sum(v) >= .6 * len(v): dr.line(q, fill=200, width=max(2, round(7 / mpp)), joint='curve'); kept += 1
            else: dropped += 1
    R = np.asarray(rd); on = (R > 0) & ~sea
    rgb[on & (R == 255)] = (214, 196, 160); rgb[on & (R == 200)] = (204, 186, 152)
    # runways: dark grey strips, 45 m wide
    rw = Image.new('L', (W, H), 0); dw = ImageDraw.Draw(rw)
    for o in OSM[town]['runway']: dw.line([px(*p) for p in o['p']], fill=255, width=max(4, round(45 / mpp)))
    rgb[np.asarray(rw) > 0] = (92, 90, 86)
    base = Image.fromarray(rgb.clip(0, 255).astype('uint8')); base.save(os.path.join(LAY, town + '-base.png'), optimize=True)
    # the guide: the same picture with neutral labels and red crosses
    gd = base.copy(); d = ImageDraw.Draw(gd)
    for la, lo, label in MARKS[town]:
        x, y = px(la, lo)
        d.ellipse([x - 24, y - 24, x + 24, y + 24], outline=(220, 30, 30), width=5); d.line([x - 40, y, x + 40, y], fill=(220, 30, 30), width=3); d.line([x, y - 40, x, y + 40], fill=(220, 30, 30), width=3)
        d.text((x + 46, y - 20), label, fill=(20, 20, 20), font=F(34), stroke_width=4, stroke_fill=(255, 255, 255))
    if RIVERS[town]:
        ys, xs = np.where(RV)
        if len(xs): i = len(xs) // 2; d.text((xs[i] + 30, ys[i] - 60), RIVERS[town], fill=(30, 60, 150), font=F(32), stroke_width=4, stroke_fill=(255, 255, 255))
    d.rectangle([0, 0, W, 64], fill=(255, 255, 255)); d.text((16, 12), f'N ↑  {town.upper()}, 1988 · {m["km_w"]:g} x {m["km_h"]:g} km · GUIDE ONLY: do not copy labels or crosses', fill=(200, 20, 20), font=F(34))
    gd.save(os.path.join(LAY, town + '-guide.png'), optimize=True)
    print(town, 'side streets kept (built by 1990):', kept, ' left out (newer):', dropped, ' town 1990: %.0f%% of the map' % (100 * B90.mean()))
