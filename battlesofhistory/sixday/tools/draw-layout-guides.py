#!/usr/bin/env python3
"""Six-Day War: layout guides and clean bases for the first-release maps, from REAL elevation (AWS terrain tiles), with
the same tools as Batoche's maps. Frames and places from plan/maps.md (section 1 frames, section 2 place table).
    python3 battlesofhistory/sixday/tools/draw-layout-guides.py [region airstrike jerusalem golan]
Outputs sixday/images/layout/<map>-guide.png and <map>-base.png, and maps.json. Sea = ground at or below sea level that
touches the edge of the map (so the Dead Sea and the Jordan valley, below sea level, are not painted as sea; the Dead Sea
comes from Natural Earth's lakes). Borders on the guides are today's (Natural Earth), for orientation only."""
import csv, io, json, os, re, sys, tempfile
HERE = os.path.dirname(os.path.abspath(__file__)); BT = os.path.join(HERE, '..', '..', 'batoche', 'tools', 'draw-layout-guides.py')
src = open(BT).read().split('os.makedirs(OUT, exist_ok=True); metas = []')[0]
# Batoche's copy labels longitudes as west; these maps are east of Greenwich
src = src.replace("('%.3f°W' if step < .01 else '%.2f°W' if step < 1 else '%.0f°W') % -lon", "('%.3f°E' if step < .01 else '%.2f°E' if step < 1 else '%.0f°E') % lon")
src = src.replace("%.3f°N %.3f°W (top left) to %.3f°N %.3f°W (bottom right)", "%.3f°N %.3f°E (top left) to %.3f°N %.3f°E (bottom right)").replace("-self.lon0", "self.lon0").replace("-self.lon1", "self.lon1")
G2 = {'__file__': BT, '__name__': 'sixday'}; exec(compile(src, 'batoche-dlg', 'exec'), G2)
OUT = os.path.join(HERE, '..', 'images', 'layout'); os.makedirs(OUT, exist_ok=True)
G = G2['G']; G['OUT'] = OUT; G2['OUT'] = OUT
Guide, RED, BLUE, BLACK, GREY, WATER, WHITE, F, CACHE = (G2[k] for k in ('Guide', 'RED', 'BLUE', 'BLACK', 'GREY', 'WATER', 'WHITE', 'F', 'CACHE'))
import numpy as np
from PIL import Image, ImageDraw
from scipy.ndimage import label
def clean(path):
    d = json.load(open(path)); d['features'] = [f for f in d['features'] if f.get('geometry')]
    out = os.path.join(tempfile.gettempdir(), 'clean-' + os.path.basename(path)); json.dump(d, open(out, 'w')); return out
md = open(os.path.join(HERE, '..', 'plan', 'maps.md')).read()
rows = list(csv.DictReader(io.StringIO(re.search(r'```csv\n(.*?)```', md, re.S).group(1))))
MAPS = {  # name: (map number in plan/maps.md, TL lat, TL lon, BR lat, BR lon, zoom, kind, title)
  'region': (1, 33.8033, 30.5502, 29.4067, 37.3998, 7, 'wide', 'REGION, June 1967: Cairo to Damascus'),
  'airstrike': (2, 31.9042, 30.4532, 27.6958, 36.8868, 7, 'wide', 'THE AIR STRIKE, 5 June 1967: Egypt, Sinai and the Straits'),
  'jerusalem': (6, 31.8090, 35.1880, 31.7494, 35.2810, 15, 'battle', 'JERUSALEM, 5-7 June 1967: Ammunition Hill to Government House'),
  'golan': (8, 33.2578, 35.6381, 33.1902, 35.7453, 15, 'battle', 'GOLAN: TEL FAHER, 9 June 1967'),
}
want = sys.argv[1:] or list(MAPS)
mj = os.path.join(OUT, 'maps.json'); metas = {m['file']: m for m in (json.load(open(mj)) if os.path.exists(mj) else [])}
for name in want:
    num, la1, lo0, la0, lo1, zoom, kind, title = MAPS[name]
    if kind == 'wide': G['RAMP'][:] = [(0, (196, 180, 140)), (200, (205, 188, 146)), (500, (196, 176, 134)), (900, (178, 158, 120)), (1500, (160, 142, 112)), (2500, (150, 140, 128))]
    else: G['RAMP'][:] = [(400, (196, 184, 146)), (600, (190, 178, 140)), (750, (178, 168, 132)), (900, (168, 160, 128)), (1100, (160, 152, 124))]
    g = Guide(name + '-guide.png', la0, la1, lo0, lo1, zoom, None, None)
    if kind == 'wide':
        low = g.e <= .5
        # the Jordan rift (Dead Sea, Jordan valley, Sea of Galilee) lies below sea level but is not sea: left out here,
        # the lakes come from Natural Earth. The elevation tiles hold sea-floor depths, so depth alone cannot tell them apart.
        H_, W_ = low.shape; yy, xx = np.mgrid[0:H_, 0:W_]; LAT = la1 - (yy + .5) / H_ * (la1 - la0); LON = lo0 + (xx + .5) / W_ * (lo1 - lo0)
        low &= ~((LON > 35.25) & (LON < 35.85) & (LAT > 30.85) & (LAT < 33.0))
        lab, n = label(low); edge = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
        sea = np.isin(lab, list(edge)); rgb = g.rgb.copy(); rgb[sea] = (88, 128, 168)
        g.im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); g.d = ImageDraw.Draw(g.im)
        g.lakes(clean(os.path.join(CACHE, 'ne_10m_lakes.geojson'))); g.geojson_lines(clean(os.path.join(CACHE, 'ne_rivers.geojson')), WATER, 4)
    g.im.save(os.path.join(OUT, name + '-base.png'), optimize=True)
    if kind == 'wide': g.geojson_lines(clean(os.path.join(CACHE, 'ne_10m_admin_0_boundary_lines_land.geojson')), (90, 90, 90), 3)
    n_pl = 0
    for r in rows:
        if str(num) not in re.split(r'[;, ]+', r.get('maps') or ''): continue
        try: la, lo = float(r['lat']), float(r['lon'])
        except ValueError: continue
        if not (la0 <= la <= la1 and lo0 <= lo <= lo1): continue
        est = r['confidence'] not in ('verified',)
        g.town(la, lo, r['place'] + (' (approx.)' if est else ''), '', 22 if kind == 'wide' else 24, GREY if est else BLACK, 7, -22); n_pl += 1
    g.frame(title + ': layout guide', 'Terrain from elevation. Places from plan/maps.md (grey = estimate). Borders today\'s, for orientation only.', 1 if kind == 'wide' else .01)
    meta = g.save(); metas[meta['file']] = meta; print(name, n_pl, 'places')
json.dump(list(metas.values()), open(mj, 'w'), indent=1)
