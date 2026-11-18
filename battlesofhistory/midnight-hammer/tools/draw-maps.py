#!/usr/bin/env python3
"""Operation Midnight Hammer (June 2025): base maps (to repaint) and guides for ChatGPT, one map per chat, as for Medak.
    python3 battlesofhistory/midnight-hammer/tools/draw-maps.py [region sites fordow]
  region  Iran, the Persian Gulf and Qatar (1800 x 1350 km): Tehran, Qom, Fordow, Natanz, Isfahan, Al Udeid
  sites   the three nuclear sites between Tehran and Isfahan (560 x 420 km)
  fordow  the Fordow site in the mountains north-east of Qom (8 x 6 km)
The flight from Missouri is drawn on the page's globe, not on a painted map.
Terrain: AWS elevation tiles (the Guide of somalia1988/tools/draw-layout-guides.py). Rivers, lakes and borders: Natural
Earth. Fordow's roads and streams: OpenStreetMap (tools/osm-fordow.json, (c) OpenStreetMap contributors, ODbL); today's
OSM, so its surface details are approximate for June 2025. Site coordinates: Wikipedia (Fordow 34.8845 N 50.9981 E;
Natanz 33.725 N 51.725 E; Isfahan Nuclear Technology Center 32.574 N 51.826 E; Al Udeid 25.119 N 51.319 E): to check on
OSM. The guides carry neutral labels only: no targets, aim points, flight paths or damage. Writes
images/layout/<map>-base.png, <map>-guide.png and maps.json."""
import os, sys, json, math
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.join(HERE, '..', '..')
SOM = os.path.join(ROOT, 'somalia1988', 'tools', 'draw-layout-guides.py')
src = open(SOM).read().split('MAPS = {')[0]
NS = {'__file__': SOM, '__name__': 'medak'}; exec(compile(src, 'som-dlg', 'exec'), NS)
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy import ndimage as ndi
G, Guide, frame43, sea_mask, DRY, CACHE, clean = (NS[k] for k in ('G', 'Guide', 'frame43', 'sea_mask', 'DRY', 'CACHE', 'clean'))
RED, BLUE, BLACK, GREY, WATER = (NS[k] for k in ('RED', 'BLUE', 'BLACK', 'GREY', 'WATER'))
OUT = os.path.join(HERE, '..', 'images', 'layout'); os.makedirs(OUT, exist_ok=True); G['OUT'] = OUT; NS['OUT'] = OUT
OSM = json.load(open(os.path.join(HERE, 'osm-fordow.json'))); GH = {}
try: FONT = lambda s: ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', s)
except OSError: FONT = lambda s: ImageFont.load_default()
MAIN = {'motorway', 'trunk', 'trunk_link', 'primary', 'primary_link', 'secondary', 'secondary_link', 'tertiary', 'tertiary_link'}
SIDE = {'unclassified', 'residential', 'living_street', 'pedestrian', 'track', 'service'}
THRESH = 300
ALLSIDE = False   # the Fordow map keeps every road and track
MAPS = {  # name: (frame, zoom, town data, title)
  'region': (frame43(31.0, 51.5, 1800), 6, None, 'IRAN, THE PERSIAN GULF AND QATAR, JUNE 2025'),
  'sites':  (frame43(34.2, 51.4, 560), 8, None, 'TEHRAN, QOM, FORDOW, NATANZ AND ISFAHAN, JUNE 2025'),
  'fordow': (frame43(34.884, 50.998, 8), 14, 'fordow', 'THE FORDOW SITE NEAR QOM, JUNE 2025'),
}
# neutral labels for the painter: (lat, lon, label, approximate?)
PLACES = {
  'region': [(35.6889, 51.3897, 'TEHRAN', 0), (34.64, 50.876, 'Qom', 0), (34.8845, 50.9981, 'Fordow', 0), (33.725, 51.725, 'Natanz', 0),
             (32.665, 51.670, 'Isfahan', 0), (25.2867, 51.5333, 'Doha', 0), (25.1186, 51.3186, 'Al Udeid', 0), (28.926, 50.851, 'Bushehr', 0),
             (29.61, 52.54, 'Shiraz', 0), (33.31, 44.36, 'Baghdad', 0), (29.37, 47.98, 'Kuwait', 0), (26.22, 50.59, 'Manama', 0),
             (24.45, 54.38, 'Abu Dhabi', 0), (27.18, 56.27, 'Bandar Abbas', 0), (31.32, 48.67, 'Ahvaz', 0)],
  'sites': [(35.6889, 51.3897, 'TEHRAN', 0), (34.64, 50.876, 'Qom', 0), (34.8845, 50.9981, 'Fordow site', 0), (33.725, 51.725, 'Natanz site', 0),
            (33.9825, 51.4325, 'Kashan', 0), (32.665, 51.670, 'ISFAHAN', 0), (32.574, 51.826, 'Isfahan nuclear centre', 0), (33.507, 51.914, 'Natanz town', 0),
            (34.09, 49.69, 'Arak', 0)],
  'fordow': [(34.8845, 50.9981, 'Fordow site (approx.)', 1)],
}
AREAS = {
  'region': [(27.3, 51.2, 'PERSIAN GULF'), (24.6, 58.6, 'GULF OF OMAN'), (32.6, 54.5, 'IRAN'), (36.95, 51.5, 'CASPIAN SEA'), (33.0, 42.6, 'IRAQ'), (26.0, 46.0, 'SAUDI ARABIA'),
             (25.6, 51.15, 'QATAR'), (31.3, 50.3, 'Zagros mountains'), (36.3, 53.5, 'Alborz mountains')],
  'sites': [(34.75, 51.95, 'Namak salt lake'), (33.55, 50.55, 'mountains'), (34.35, 52.6, 'Dasht-e Kavir desert')],
  'fordow': [],
}


def towns_layer(g, m, rgb, town):
    """Streets, riverbeds, runway and the town of 1990 (or today's main streets for Rabat) onto rgb (H x W x 3 float)."""
    H, W = rgb.shape[:2]; la0, la1, lo0, lo1 = m
    px = lambda la, lo: ((lo - lo0) / (lo1 - lo0) * W, (la1 - la) / (la1 - la0) * H)
    mpp = (lo1 - lo0) * 111320 * math.cos(math.radians((la0 + la1) / 2)) / W
    sea = (rgb[..., 2] > rgb[..., 0] + 25) & (rgb[..., 2] > 120)
    O = OSM[town]
    if town in GH:
        gg = GH[town]; G90 = np.array(gg['e1990'], float)
        yy, xx = np.mgrid[0:H, 0:W]
        lat = la1 - (yy + .5) / H * (la1 - la0); lon = lo0 + (xx + .5) / W * (lo1 - lo0)
        r = (gg['lat1'] - lat) / abs(gg['step']) - .5; c = (lon - gg['lon0']) / gg['step'] - .5
        B = (ndi.map_coordinates(ndi.gaussian_filter(G90, .6), [r, c], order=1, mode='nearest') >= THRESH) & ~sea
        rgb[B] = rgb[B] * .5 + np.array((200, 182, 150)) * .5
        def keep(p):
            v = []
            for la, lo in p:
                rr = int((gg['lat1'] - la) / abs(gg['step'])); cc = int((lo - gg['lon0']) / gg['step'])
                v.append(0 <= rr < G90.shape[0] and 0 <= cc < G90.shape[1] and G90[max(0, rr - 1):rr + 2, max(0, cc - 1):cc + 2].max() >= THRESH)
            return sum(v) >= .6 * len(v)
    else:
        keep = lambda p: False                                  # Rabat: today's main streets only
    # water: rivers and riverbeds, lakes
    wv = Image.new('L', (W, H), 0); dw = ImageDraw.Draw(wv)
    for w in O['water']:
        q = [px(*p) for p in w['p']]
        if w['k'] == 'water' and w['closed'] and len(q) > 2: dw.polygon(q, fill=255)
        elif w['k'] in ('river', 'stream'): dw.line(q, fill=255, width=max(3, round((40 if w['k'] == 'river' else 12) / mpp)), joint='curve')
    WV = (np.asarray(wv) > 0) & ~sea; rgb[WV] = (92, 124, 132)
    rd = Image.new('L', (W, H), 0); dr = ImageDraw.Draw(rd); kept = dropped = 0
    for o in O['roads']:
        q = [px(*a) for a in o['p']]
        if not any(0 <= x < W and 0 <= y < H for x, y in q): continue
        if o['k'] in MAIN: dr.line(q, fill=255, width=max(3, round(12 / mpp)), joint='curve')
        elif o['k'] in SIDE:
            if keep(o['p']) or ALLSIDE: dr.line(q, fill=200, width=max(2, round(7 / mpp)), joint='curve'); kept += 1
            else: dropped += 1
    R = np.asarray(rd); on = (R > 0) & ~sea
    rgb[on & (R == 255)] = (218, 204, 172); rgb[on & (R == 200)] = (206, 192, 162); rgb[(R > 0) & WV] = (150, 145, 135)
    rl = Image.new('L', (W, H), 0); dl = ImageDraw.Draw(rl)
    for o in O.get('rail', []): dl.line([px(*p) for p in o['p']], fill=255, width=max(2, round(8 / mpp)))
    rgb[np.asarray(rl) > 0] = (120, 110, 100)
    rw = Image.new('L', (W, H), 0); dk = ImageDraw.Draw(rw)
    for o in O['runway']: dk.line([px(*p) for p in o['p']], fill=255, width=max(4, round(45 / mpp)))
    rgb[np.asarray(rw) > 0] = (92, 90, 86)
    return kept, dropped


want = sys.argv[1:] or list(MAPS); mj = os.path.join(OUT, 'maps.json')
old = {m['file']: m for m in (json.load(open(mj)) if os.path.exists(mj) else [])}
for name in want:
    (la0, la1, lo0, lo1), zoom, town, title = MAPS[name]
    G['RAMP'][:] = DRY
    g = Guide(name + '-guide.png', la0, la1, lo0, lo1, zoom, None, None)
    sea = sea_mask(g); rgb = g.rgb.copy().astype(float); rgb[sea] = (78, 118, 160)
    note = ''
    ALLSIDE = name == 'fordow'
    if town:
        k, d = towns_layer(g, (la0, la1, lo0, lo1), rgb, town)
        note = f'side streets kept {k}, left out {d}'
    g.im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); g.d = ImageDraw.Draw(g.im)
    if name in ('region', 'sites'):
        g.geojson_lines(clean(os.path.join(CACHE, 'ne_rivers.geojson')), WATER, 3)
    g.im.save(os.path.join(OUT, name + '-base.png'), optimize=True)
    if name in ('region', 'sites'): g.geojson_lines(clean(os.path.join(CACHE, 'ne_10m_admin_0_boundary_lines_land.geojson')), (90, 90, 90), 3)
    big = name in ('region', 'sites')
    for la, lo, n, ap in PLACES[name]:
        if n and la0 < la < la1 and lo0 < lo < lo1: g.town(la, lo, n, '', 24 if big else 26, GREY if ap else BLACK, 7 if big else 9, -24)
    for la, lo, t in AREAS[name]:
        if la0 < la < la1 and lo0 < lo < lo1: g.text(la, lo, t, BLUE if t.isupper() and ('GULF' in t or 'SEA' in t) else GREY, 26, True)
    g.frame(title + ': layout guide', 'Real elevation; streets, riverbeds and coast: OpenStreetMap (c) OSM contributors, ODbL'
            + ('; side streets only where the GHSL 1990 grid shows buildings (EC JRC, CC BY)' if town in GH else '')
            + '. Labels are for the painter only.', 1 if big else .01)
    meta = g.save(); old[meta['file']] = meta; print(name, round(meta['km_w'], 1), 'x', round(meta['km_h'], 1), 'km', note)
json.dump(list(old.values()), open(mj, 'w'), indent=1)
