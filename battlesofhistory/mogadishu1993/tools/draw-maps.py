#!/usr/bin/env python3
"""Battle of Mogadishu (1993): base maps (to repaint) and guides for ChatGPT, one map per chat, as for Somalia 1988.
    python3 battlesofhistory/mogadishu1993/tools/draw-maps.py [somalia mogadishu battle beledweyne rabat]
  somalia     Somalia and the intervention, 1992-1993: Mogadishu, Beledweyne, Baidoa, Kismayo ... (1600 x 1200 km)
  mogadishu   the city in 1993 (12 x 9 km)
  battle      the area of the battle, 3-4 October 1993: Bakara Market, Olympic Hotel, the stadium (5 x 3.75 km)
  beledweyne  Belet Huen, the town of the Canadian camp, 1993 (8 x 6 km)
  rabat       Rabat and Sale, Morocco: where the film Black Hawk Down was made, 2001 (12 x 9 km)
  world       Africa, Europe and the Middle East, from Mogadishu to Rabat: the first zoom toward Rabat (9000 x 6750 km)
  nafrica     North Africa and the Mediterranean, the second zoom (5000 x 3750 km)
  morocco     (the third zoom)
  morocco     Morocco and the Strait of Gibraltar, the second zoom toward Rabat (1300 x 975 km)
Terrain: AWS elevation tiles (the Guide of somalia1988/tools/draw-layout-guides.py). Streets, riverbeds, coast, runways:
OpenStreetMap (tools/osm-towns.json, (c) OpenStreetMap contributors, ODbL). The 1993 towns: GHS-BUILT-S 1990 (tools/
ghsl-towns.json, EC JRC, CC BY 4.0): side streets only where buildings stood by 1990; main roads everywhere. Rabat-Sale is
drawn with today's main streets (no 2001 filter). The guides carry neutral labels only (places, districts, the sea): the
page draws the events, units and crash sites itself. Places inside the cities are from OpenStreetMap's present-day names,
marked approx. where the 1993 site is not certain. Writes images/layout/<map>-base.png, <map>-guide.png and maps.json."""
import os, sys, json, math
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.join(HERE, '..', '..')
SOM = os.path.join(ROOT, 'somalia1988', 'tools', 'draw-layout-guides.py')
src = open(SOM).read().split('MAPS = {')[0]
NS = {'__file__': SOM, '__name__': 'mogadishu1993'}; exec(compile(src, 'som-dlg', 'exec'), NS)
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy import ndimage as ndi
G, Guide, frame43, sea_mask, DRY, CACHE, clean = (NS[k] for k in ('G', 'Guide', 'frame43', 'sea_mask', 'DRY', 'CACHE', 'clean'))
RED, BLUE, BLACK, GREY, WATER = (NS[k] for k in ('RED', 'BLUE', 'BLACK', 'GREY', 'WATER'))
OUT = os.path.join(HERE, '..', 'images', 'layout'); os.makedirs(OUT, exist_ok=True); G['OUT'] = OUT; NS['OUT'] = OUT
OSM = json.load(open(os.path.join(HERE, 'osm-towns.json'))); GH = json.load(open(os.path.join(HERE, 'ghsl-towns.json')))
try: FONT = lambda s: ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', s)
except OSError: FONT = lambda s: ImageFont.load_default()
MAIN = {'motorway', 'trunk', 'trunk_link', 'primary', 'primary_link', 'secondary', 'secondary_link', 'tertiary', 'tertiary_link'}
SIDE = {'unclassified', 'residential', 'living_street', 'pedestrian'}
THRESH = 300
MAPS = {  # name: (frame, zoom, town data, title)
  'somalia':    (frame43(5.0, 45.8, 1600), 6, None, 'SOMALIA, 1992-1993: the intervention'),
  'mogadishu':  (frame43(2.045, 45.325, 12), 14, 'mogadishu', 'MOGADISHU, 1993'),
  'battle':     (frame43(2.056, 45.327, 5), 15, 'mogadishu', 'MOGADISHU: the area of the battle, 3-4 October 1993'),
  'beledweyne': (frame43(4.737, 45.203, 8), 14, 'beledweyne', 'BELEDWEYNE (BELET HUEN), 1993'),
  'rabat':      (frame43(34.030, -6.815, 12), 14, 'rabat', 'RABAT AND SALE, MOROCCO: where the film was made, 2001'),
  'world':      (frame43(22.0, 17.5, 9000), 4, None, 'FROM SOMALIA TO MOROCCO: Mogadishu and Rabat'),
  'nafrica':    (frame43(33.0, 5.0, 5000), 5, None, 'NORTH AFRICA AND THE MEDITERRANEAN: on the way to Rabat'),
  'morocco':    (frame43(33.5, -5.5, 1300), 7, None, 'MOROCCO AND THE STRAIT OF GIBRALTAR: on the way to Rabat'),
}
# neutral labels for the painter: (lat, lon, label, approximate?)
PLACES = {
  'somalia': [(2.046, 45.318, 'MOGADISHU', 0), (4.737, 45.203, 'Beledweyne', 0), (3.114, 43.650, 'Baidoa', 0), (-0.358, 42.545, 'Kismayo', 0),
              (2.340, 42.280, 'Bardera', 0), (1.712, 44.770, 'Merca', 0), (2.781, 45.500, 'Jowhar', 0), (6.770, 47.430, 'Galkayo', 0),
              (9.560, 44.065, 'Hargeisa', 0), (10.44, 45.01, 'Berbera', 0), (2.000, 45.000, '', 0)],
  'mogadishu': [(2.0163, 45.3057, 'AIRPORT', 0), (2.0496, 45.3202, 'Bakara Market', 0), (2.0504, 45.3246, 'Olympic Hotel', 0),
                (2.0671, 45.3360, 'Stadium', 0), (2.0410, 45.3368, 'Villa Somalia', 0), (2.0330, 45.3440, 'PORT', 0), (2.0392, 45.3617, 'Lido', 0)],
  'battle': [(2.0496, 45.3202, 'Bakara Market', 0), (2.0504, 45.3246, 'Olympic Hotel', 0), (2.0671, 45.3360, 'Stadium', 0),
             (2.0594, 45.3217, 'Hawl Wadaag street (approx.)', 1)],
  'beledweyne': [(4.7368, 45.2039, 'Town centre', 0)],
  'rabat': [(34.0497, -6.8234, 'Avenue Nasser (Sidi Moussa)', 0), (34.0555, -6.8190, 'SIDI MOUSSA', 0), (34.0610, -6.7880, 'HAY RAHMA', 0),
            (34.0282, -6.8342, 'Rue des Consuls (Medina)', 0), (34.0260, -6.8368, 'RABAT MEDINA', 0), (34.0370, -6.8190, 'SALE MEDINA', 0)],
  'nafrica': [(34.020, -6.841, 'RABAT', 0), (40.417, -3.704, 'Madrid', 0), (41.903, 12.496, 'Rome', 0), (36.754, 3.059, 'Algiers', 0),
              (36.806, 10.181, 'Tunis', 0), (32.887, 13.191, 'Tripoli', 0), (30.044, 31.236, 'Cairo', 0), (48.857, 2.352, 'Paris', 0),
              (38.722, -9.139, 'Lisbon', 0), (28.124, -15.430, 'Las Palmas', 0), (37.984, 23.728, 'Athens', 0), (2.046, 45.318, 'MOGADISHU', 0), (15.50, 32.56, 'Khartoum', 0), (9.03, 38.74, 'Addis Ababa', 0),
              (51.507, -0.128, 'London', 0), (24.71, 46.68, 'Riyadh', 0), (14.69, -17.44, 'Dakar', 0), (6.52, 3.38, 'Lagos', 0)],
  'morocco': [(34.020, -6.841, 'RABAT', 0), (34.040, -6.800, 'Sale', 0), (34.261, -6.580, 'Kenitra', 0), (33.573, -7.590, 'Casablanca', 0),
              (35.759, -5.834, 'Tangier', 0), (36.140, -5.354, 'Gibraltar', 0), (34.034, -5.000, 'Fes', 0), (31.629, -7.981, 'Marrakesh', 0),
              (30.428, -9.598, 'Agadir', 0), (37.389, -5.984, 'Seville', 0), (36.721, -4.421, 'Malaga', 0), (35.697, -0.633, 'Oran', 0), (34.681, -1.908, 'Oujda', 0)],
}
AREAS = {
  'somalia': [(3.0, 50.0, 'INDIAN OCEAN'), (11.6, 47.5, 'GULF OF ADEN'), (7.0, 42.0, 'ETHIOPIA'), (1.0, 39.8, 'KENYA'), (4.6, 44.6, 'Shabelle river'), (1.6, 42.6, 'Jubba river')],
  'mogadishu': [(2.020, 45.355, 'INDIAN OCEAN')],
  'battle': [],
  'beledweyne': [(4.760, 45.185, 'Shabelle river')],
  'rabat': [(34.040, -6.870, 'ATLANTIC OCEAN'), (34.024, -6.812, 'Bou Regreg river'), (33.998, -6.840, 'RABAT'), (34.050, -6.790, 'SALE')],
  'nafrica': [(30.0, -16.0, 'ATLANTIC OCEAN'), (37.5, 6.0, 'MEDITERRANEAN SEA'), (25.0, 2.0, 'SAHARA'), (31.5, -4.5, 'MOROCCO'), (40.0, -4.0, 'SPAIN'),
              (28.5, 3.0, 'ALGERIA'), (28.0, 17.0, 'LIBYA'), (26.5, 29.5, 'EGYPT'), (6.0, 47.0, 'SOMALIA'), (0.0, 55.0, 'INDIAN OCEAN'), (20.0, 38.5, 'Red Sea'), (45.0, 15.0, 'EUROPE'), (12.0, 20.0, 'AFRICA')],
  'morocco': [(32.0, -11.0, 'ATLANTIC OCEAN'), (36.3, -2.5, 'MEDITERRANEAN SEA'), (35.95, -5.6, 'Strait of Gibraltar'), (31.3, -6.6, 'High Atlas'),
              (33.1, -5.2, 'Middle Atlas'), (35.0, -4.2, 'Rif mountains'), (37.6, -4.5, 'SPAIN'), (30.5, -2.0, 'ALGERIA'), (32.2, -7.6, 'MOROCCO')],
}

PLACES['world'] = PLACES['nafrica']; AREAS['world'] = AREAS['nafrica']   # the same labels; those outside a frame are skipped


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
            if keep(o['p']): dr.line(q, fill=200, width=max(2, round(7 / mpp)), joint='curve'); kept += 1
            else: dropped += 1
    R = np.asarray(rd); on = (R > 0) & ~sea
    rgb[on & (R == 255)] = (218, 204, 172); rgb[on & (R == 200)] = (206, 192, 162); rgb[(R > 0) & WV] = (150, 145, 135)
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
    sea = sea_mask(g)
    if name in ('world', 'nafrica'):   # inland seas below sea level that do not touch the edge: the Black Sea, the Caspian (not the small Qattara depression)
        lab, n = ndi.label(g.e <= .5); sz = ndi.sum(np.ones_like(lab), lab, range(1, n + 1))
        sea |= np.isin(lab, [i + 1 for i, v in enumerate(sz) if v > 10000])
    rgb = g.rgb.copy().astype(float); rgb[sea] = (78, 118, 160)
    note = ''
    if town:
        k, d = towns_layer(g, (la0, la1, lo0, lo1), rgb, town)
        note = f'side streets kept {k}, left out {d}'
    g.im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); g.d = ImageDraw.Draw(g.im)
    if name in ('somalia', 'morocco'):   # (no rivers painted on the two widest maps: Natural Earth's desert wadis would come back as rivers)
        g.geojson_lines(clean(os.path.join(CACHE, 'ne_rivers.geojson')), WATER, 3)
    g.im.save(os.path.join(OUT, name + '-base.png'), optimize=True)
    if name in ('somalia', 'world', 'nafrica', 'morocco'): g.geojson_lines(clean(os.path.join(CACHE, 'ne_10m_admin_0_boundary_lines_land.geojson')), (90, 90, 90), 3)
    big = name in ('somalia', 'world', 'nafrica', 'morocco')
    for la, lo, n, ap in PLACES[name]:
        if n and la0 < la < la1 and lo0 < lo < lo1: g.town(la, lo, n, '', 24 if big else 26, GREY if ap else BLACK, 7 if big else 9, -24)
    for la, lo, t in AREAS[name]:
        if la0 < la < la1 and lo0 < lo < lo1: g.text(la, lo, t, BLUE if t.isupper() and ('OCEAN' in t or 'GULF' in t or 'SEA' in t) else GREY, 26, True)
    if name == 'rabat':
        g.text(la1 - (la1 - la0) * .06, lo0 + (lo1 - lo0) * .78, 'to Kenitra airbase and Mehdiya beach, about 35 km north', GREY, 22, True)
    g.frame(title + ': layout guide', 'Real elevation; streets, riverbeds and coast: OpenStreetMap (c) OSM contributors, ODbL'
            + ('; side streets only where the GHSL 1990 grid shows buildings (EC JRC, CC BY)' if town in GH else '')
            + '. Labels are for the painter only.', 1 if big else .01)
    meta = g.save(); old[meta['file']] = meta; print(name, round(meta['km_w'], 1), 'x', round(meta['km_h'], 1), 'km', note)
json.dump(list(old.values()), open(mj, 'w'), indent=1)
