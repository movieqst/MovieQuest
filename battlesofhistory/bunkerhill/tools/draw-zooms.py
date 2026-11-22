#!/usr/bin/env python3
"""Battle of Bunker Hill: three zoom maps between the opening globe and the battle maps (owner, 18 Nov 2026: "the globe
doesn't have enough detail, doesn't show the water in Boston"), wide to narrow, like Mogadishu's zooms:
  coast    the Atlantic coast of North America, 1775 (about 3200 x 2400 km)
  newengland  New England and Long Island (about 420 x 315 km)
  bostonarea  Boston and its harbour (about 40 x 30 km)
Real elevation (AWS terrain tiles) and Natural Earth lakes and rivers, through the Ukraine tool
(ukraine-escalation/tools/draw-maps.py). Near Boston much of today's shore is later landfill: inside the frame of the page's 1775 Boston
map (images/boston-painting.jpg, after Pelham's plan of 1777) the water is taken from that map, so the base shows the 1775 shore.
Writes images/layout/<map>-base.png, <map>-guide.png and writes their corners to images/layout/zooms.json.
    python3 battlesofhistory/bunkerhill/tools/draw-zooms.py"""
import os, json, sys
HERE = os.path.dirname(os.path.abspath(__file__)); UK = os.path.join(HERE, '..', '..', 'ukraine-escalation', 'tools', 'draw-maps.py')
src = open(UK).read().split('\nwant = sys.argv')[0]
NS = {'__file__': UK, '__name__': 'bh-zooms'}; exec(compile(src, 'uk-maps', 'exec'), NS)
G, Guide, frame43, sea_mask, CACHE, clean, GREEN, WATER, BLUE, BLACK, GREY, RED = (NS[k] for k in ('G', 'Guide', 'frame43', 'sea_mask', 'CACHE', 'clean', 'GREEN', 'WATER', 'BLUE', 'BLACK', 'GREY', 'RED'))
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi
OUT = os.path.join(HERE, '..', 'images', 'layout'); G['OUT'] = OUT; NS['OUT'] = OUT
MAPS = {
  'coast':      (frame43(39.0, -73.0, 3200), 5, 'THE ATLANTIC COAST OF NORTH AMERICA, 1775'),
  'newengland': (frame43(41.85, -71.6, 420), 8, 'NEW ENGLAND, 1775'),
  'bostonarea': (frame43(42.36, -71.06, 40), 13, 'BOSTON AND ITS HARBOUR, 1775'),
}
PLACES = {
  'coast': [(42.36, -71.06, 'BOSTON'), (40.71, -74.01, 'New York'), (39.95, -75.17, 'Philadelphia'), (32.78, -79.93, 'Charleston'), (46.81, -71.21, 'Quebec'),
            (45.50, -73.57, 'Montreal'), (44.65, -63.57, 'Halifax'), (38.98, -76.49, 'Annapolis'), (37.27, -76.71, 'Williamsburg'), (41.82, -71.41, 'Providence')],
  'newengland': [(42.36, -71.06, 'BOSTON'), (41.82, -71.41, 'Providence'), (43.07, -70.76, 'Portsmouth'), (42.26, -71.80, 'Worcester'), (41.96, -70.67, 'Plymouth'),
                 (42.46, -71.35, 'Concord'), (42.45, -71.23, 'Lexington'), (41.31, -72.92, 'New Haven'), (41.76, -72.69, 'Hartford'), (42.52, -70.90, 'Salem'), (41.64, -70.93, 'New Bedford')],
  'bostonarea': [(42.358, -71.058, 'BOSTON'), (42.378, -71.062, 'Charlestown'), (42.376, -71.120, 'Cambridge'), (42.331, -71.090, 'Roxbury'), (42.333, -71.04, 'Dorchester Heights'),
                 (42.418, -71.106, 'Medford'), (42.447, -71.226, 'Lexington'), (42.376, -71.0608, 'Bunker Hill (the battle)'), (42.31, -70.96, 'Castle Island (approx.)')],
}
AREAS = {
  'coast': [(36.0, -66.0, 'ATLANTIC OCEAN'), (44.0, -66.5, 'Gulf of Maine'), (42.3, -75.5, 'Appalachian Mountains'), (45.5, -76.0, 'St Lawrence River')],
  'newengland': [(41.0, -70.5, 'ATLANTIC OCEAN'), (42.3, -70.4, 'Massachusetts Bay'), (41.65, -70.1, 'Cape Cod'), (41.05, -72.6, 'Long Island Sound'), (42.6, -72.6, 'Connecticut River')],
  'bostonarea': [(42.31, -70.92, 'BOSTON HARBOUR'), (42.40, -70.90, 'Massachusetts Bay'), (42.37, -71.03, 'Noddle’s Island'), (42.373, -71.08, 'Charles River'), (42.395, -71.075, 'Mystic River')],
}
mj = os.path.join(OUT, 'zooms.json'); old = {m['file']: m for m in (json.load(open(mj)) if os.path.exists(mj) else [])}
for name in (sys.argv[1:] or list(MAPS)):
    (la0, la1, lo0, lo1), zoom, title = MAPS[name]
    G['RAMP'][:] = GREEN
    g = Guide(name + '-guide.png', la0, la1, lo0, lo1, zoom, None, None)
    lim = 2.2 if name == 'bostonarea' else .5   # near Boston the rivers and inner harbour sit a little above 0 in the tiles
    low = g.e <= lim; lab0, n0 = ndi.label(low); edge = set(np.unique(np.concatenate([lab0[0], lab0[-1], lab0[:, 0], lab0[:, -1]]))) - {0}
    sea = np.isin(lab0, list(edge)); lab, n = ndi.label(low); sz = ndi.sum(np.ones_like(lab), lab, range(1, n + 1))
    sea |= np.isin(lab, [i + 1 for i, v in enumerate(sz) if v > 20000])
    if name == 'bostonarea':   # inside the 1775 Boston map's frame, take the water from it (after Pelham's plan): the 1775 shore
        PB = dict(lat0=42.32794, lat1=42.39533, lon0=-71.12018, lon1=-70.99855)
        P = np.asarray(Image.open(os.path.join(HERE, '..', 'images', 'boston-painting.jpg')).convert('RGB')).astype(int)
        pw = (P[..., 2] > P[..., 0] + 12) & (P[..., 2] >= P[..., 1] - 5)
        pw = ndi.binary_closing(ndi.binary_opening(pw, iterations=3), iterations=3)
        H_, W_ = sea.shape; yy, xx = np.mgrid[0:H_, 0:W_]
        LAT = la1 - (yy + .5) / H_ * (la1 - la0); LON = lo0 + (xx + .5) / W_ * (lo1 - lo0)
        inb = (LAT > PB['lat0']) & (LAT < PB['lat1']) & (LON > PB['lon0']) & (LON < PB['lon1'])
        py = ((PB['lat1'] - LAT) / (PB['lat1'] - PB['lat0']) * P.shape[0]).clip(0, P.shape[0] - 1).astype(int)
        px = ((LON - PB['lon0']) / (PB['lon1'] - PB['lon0']) * P.shape[1]).clip(0, P.shape[1] - 1).astype(int)
        sea = np.where(inb, pw[py, px], sea)
    rgb = g.rgb.copy().astype(float); rgb[sea] = (82, 120, 158)
    g.im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); g.d = ImageDraw.Draw(g.im)
    if name != 'bostonarea':
        g.lakes(clean(os.path.join(CACHE, 'ne_10m_lakes.geojson'))); g.geojson_lines(clean(os.path.join(CACHE, 'ne_rivers.geojson')), WATER, 3)
    g.im.save(os.path.join(OUT, name + '-base.png'), optimize=True)
    for la, lo, t in PLACES[name]:
        if la0 < la < la1 and lo0 < lo < lo1: g.town(la, lo, t, '', 26, RED if 'Bunker' in t else BLACK, 9, -26)
    for la, lo, t in AREAS[name]:
        if la0 < la < la1 and lo0 < lo < lo1: g.text(la, lo, t, RED if '1775' in t else BLUE if ('OCEAN' in t or 'Bay' in t or 'Sound' in t or 'HARBOUR' in t or 'Gulf' in t) else GREY, 26 if '1775' in t else 24, True)
    g.frame(title + ': layout guide', 'Real elevation; lakes and rivers: Natural Earth' + ('; inner harbour: the 1775 shore after Pelham' if name == 'bostonarea' else '') + '. Labels are for the painter only.', {'coast': 5, 'newengland': 1, 'bostonarea': .05}[name])
    meta = g.save(); old[meta['file']] = meta; print(name, round(meta['km_w']), 'x', round(meta['km_h']), 'km')
json.dump(list(old.values()), open(mj, 'w'), indent=1)
