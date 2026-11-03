#!/usr/bin/env python3
"""The Silk Road around 751: a relief map from the Mediterranean to Chang'an, with the main overland routes, the
cities of the time and Talas marked. Real elevation (AWS terrain tiles), coastlines from Natural Earth land-50m
(world-atlas), rivers and lakes from Natural Earth.
    python3 silk-road-map.py LAND_50M_TOPOJSON
Writes images/layout/silk-road-751-base.jpg (relief only, no text: the picture for ChatGPT to repaint) and
silk-road-751-guide.jpg (the same with routes, cities and labels), 3600 x 1800 (2:1), equal steps of longitude and
latitude, and records the corners in layout/maps.json."""
import json, math, os, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
sys.path.insert(0, os.path.dirname(__file__))
from dem import dem

LON0, LON1, LAT0, LAT1 = 26.0, 118.0, 14.0, 52.0
W, H = 3600, 1800
OUT = os.path.join(os.path.dirname(__file__), '..', 'images', 'layout')
CACHE = os.path.expanduser('~/.cache/talas-dem')
fx = lambda lon: (lon - LON0) / (LON1 - LON0) * W
fy = lambda lat: (LAT1 - lat) / (LAT1 - LAT0) * H
F = lambda s, b=True: ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf' % ('-Bold' if b else ''), s)
FS = lambda s: ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf', s)

# ---- land / sea from the land-50m TopoJSON ----
def topo_polys(path):
    t = json.load(open(path)); sc, tr = t['transform']['scale'], t['transform']['translate']
    arcs = []
    for a in t['arcs']:
        x = y = 0; pts = []
        for dx, dy in a: x += dx; y += dy; pts.append((x * sc[0] + tr[0], y * sc[1] + tr[1]))
        arcs.append(pts)
    ring = lambda ids: [p for i in ids for p in (arcs[i] if i >= 0 else arcs[~i][::-1])]
    out = []
    for g in t['objects']['land']['geometries']:
        polys = g['arcs'] if g['type'] == 'MultiPolygon' else [g['arcs']]
        for poly in polys: out.append([ring(r) for r in poly])
    return out

land = Image.new('L', (W, H), 0); dl = ImageDraw.Draw(land)
for poly in topo_polys(sys.argv[1]):
    for k, r in enumerate(poly):
        dl.polygon([(fx(x), fy(y)) for x, y in r], fill=0 if k else 255)

def lines(path):
    for ft in json.load(open(path))['features']:
        g = ft['geometry']
        if not g: continue
        cs = g['coordinates']
        if g['type'] in ('LineString',): yield ft['properties'], [cs]
        elif g['type'] in ('MultiLineString', 'Polygon'): yield ft['properties'], cs
        elif g['type'] == 'MultiPolygon': yield ft['properties'], [r for p in cs for r in p]

# lakes (the Caspian is sea in land-50m; the Aral, Balkhash, Issyk-Kul are lakes)
for pr, rings in lines(os.path.join(CACHE, 'ne_10m_lakes.geojson')):
    for r in rings[:1]:
        if len(r) > 2 and (pr.get('scalerank', 9) or 9) <= 4: dl.polygon([(fx(x), fy(y)) for x, y in r], fill=0)
LAND = np.asarray(land) > 127

# ---- relief ----
e = dem(LAT0, LAT1, LON0, LON1, W, H, 6)
e = np.where(LAND, np.maximum(e, 0), e)
gy, gx = np.gradient(e.astype(np.float64))
kmx = (LON1 - LON0) / W * 111.32 * math.cos(math.radians(35)) * 1000; kmy = (LAT1 - LAT0) / H * 111.32 * 1000
sx, sy = gx / kmx * 6, gy / kmy * 6
az, alt = math.radians(315), math.radians(40)
shade = (math.sin(alt) - (np.cos(alt) * (np.sin(az) * sx - np.cos(az) * -sy))) / np.sqrt(1 + sx * sx + sy * sy)
shade = np.clip(shade, 0, 1)
# colour by height: green lowlands, ochre steppe and desert, brown mountains, snow
stops = [(0, (128, 146, 96)), (300, (160, 160, 106)), (800, (190, 172, 122)), (1500, (172, 140, 100)),
         (2500, (140, 112, 86)), (3800, (150, 140, 135)), (4800, (225, 225, 228)), (9000, (250, 250, 252))]
hs = np.array([s[0] for s in stops], float); cs = np.array([s[1] for s in stops], float)
rgb = np.stack([np.interp(e, hs, cs[:, i]) for i in range(3)], -1)
# deserts (drawn as sandier ground): Taklamakan, Gobi, Karakum, Kyzylkum, the Arabian and Syrian deserts, Thar, Dasht-e Kavir/Lut
DESERTS = [[(77, 38.5), (80, 37.3), (84, 37.5), (88, 38.6), (89.5, 40), (86, 40.8), (82, 40.7), (79, 40), (77, 39.6)],
           [(95, 41.5), (100, 40), (106, 41), (111, 42.5), (111, 44.5), (105, 44.5), (99, 44), (95, 43)],
           [(54, 37.6), (58, 38), (61.5, 38.5), (63.5, 39.5), (62, 41), (58, 41.3), (55, 40.5), (53.5, 39)],
           [(62.5, 41.5), (65, 40.5), (68, 41.2), (66, 43.5), (62.5, 43.6), (61, 42.5)],
           [(36, 32), (40, 33.5), (43.5, 31), (47.5, 29), (50, 25.5), (55.5, 23), (55.5, 18.5), (52, 16.5), (45, 17.5), (42, 21), (39, 26), (37, 29.5)],
           [(69.5, 24.5), (72, 24.3), (74.5, 26), (75, 28.5), (73, 29.5), (70.5, 28)],
           [(51.5, 35), (55, 35.3), (57, 33.5), (59, 31), (58.5, 29), (56.5, 30), (54, 32.5), (52, 33.5)]]
dm = Image.new('L', (W, H), 0); dd = ImageDraw.Draw(dm)
for p in DESERTS: dd.polygon([(fx(x), fy(y)) for x, y in p], fill=255)
dm = np.asarray(dm.filter(ImageFilter.GaussianBlur(25)), float)[..., None] / 255 * (e < 1600)[..., None]
rgb = rgb * (1 - dm * .75) + np.array([214, 186, 132], float) * dm * .75
rgb = rgb * (.45 + .7 * shade[..., None])
depth = np.clip(-e / 4000, 0, 1)[..., None]
sea = np.array([96, 140, 168], float) * (1 - depth) + np.array([34, 64, 96], float) * depth
rgb = np.where(LAND[..., None], rgb, sea)
img = Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8))
d = ImageDraw.Draw(img)
for pr, rings in lines(os.path.join(CACHE, 'ne_rivers.geojson')):
    sr = pr.get('scalerank', 9) or 9
    if sr > 6: continue
    for r in rings:
        if len(r) > 1: d.line([(fx(x), fy(y)) for x, y in r], fill=(70, 112, 140), width=3 if sr <= 3 else 2)
os.makedirs(OUT, exist_ok=True)
img.save(os.path.join(OUT, 'silk-road-751-base.jpg'), quality=90)

# ---- the guide: routes, cities, labels ----
C = {  # cities in 751, with the names of the time (modern names after "/"). Coordinates are the modern sites.
 "Chang'an": (108.94, 34.27), 'Luoyang': (112.45, 34.62), 'Lanzhou': (103.83, 36.06), 'Liangzhou': (102.64, 37.93),
 'Ganzhou': (100.45, 38.93), 'Suzhou': (98.49, 39.73), 'Dunhuang': (94.66, 40.14), 'Yumen Pass': (93.87, 40.35),
 'Yizhou / Hami': (93.51, 42.83), 'Gaochang / Turfan': (89.53, 42.86), 'Beiting': (89.1, 44.0), 'Karashahr': (86.57, 42.06),
 'Kucha': (82.96, 41.72), 'Aksu': (80.26, 41.17), 'Kashgar': (75.99, 39.47), 'Yarkand': (77.24, 38.42),
 'Khotan': (79.92, 37.11), 'Niya': (82.72, 37.06), 'Cherchen': (85.53, 38.13), 'Miran': (88.97, 39.22),
 'Suyab': (75.2, 42.84), 'TALAS': (71.37, 42.9), 'Chach / Tashkent': (69.24, 41.3), 'Ferghana / Kasan': (71.5, 41.0),
 'Samarkand': (66.97, 39.65), 'Bukhara': (64.42, 39.77), 'Merv': (61.83, 37.66), 'Nishapur': (58.8, 36.21),
 'Rayy': (51.43, 35.6), 'Hamadan': (48.52, 34.8), 'Kufa': (44.4, 32.03), 'Ctesiphon': (44.58, 33.09),
 'Damascus': (36.29, 33.51), 'Antioch': (36.16, 36.2), 'Constantinople': (28.98, 41.01), 'Balkh': (66.9, 36.76),
 'Termez': (67.28, 37.22), 'Tashkurgan': (75.23, 37.77), 'Bamiyan': (67.83, 34.82), 'Kabul': (69.17, 34.53),
 'Taxila': (72.8, 33.75), 'Kanauj': (79.92, 27.05), 'Lhasa': (91.1, 29.65), 'Gilgit': (74.3, 35.92),
 'Herat': (62.2, 34.35), 'Basra': (47.8, 30.5), 'Siraf': (52.3, 27.67), 'Guangzhou': (113.26, 23.13), 'Barygaza': (72.98, 21.7),
 'Alexandria': (29.92, 31.2), 'Atil (Khazars)': (47.0, 46.3), 'Urgench': (59.2, 42.3),
}
ROUTES = {  # (colour, width, dashed, [cities])
 'main': ((196, 40, 30), 7, False, ["Luoyang", "Chang'an", 'Lanzhou', 'Liangzhou', 'Ganzhou', 'Suzhou', 'Dunhuang']),
 'north': ((196, 40, 30), 7, False, ['Dunhuang', 'Yizhou / Hami', 'Gaochang / Turfan', 'Karashahr', 'Kucha', 'Aksu', 'Kashgar']),
 'south': ((196, 40, 30), 6, False, ['Dunhuang', 'Miran', 'Cherchen', 'Niya', 'Khotan', 'Yarkand', 'Kashgar']),
 'steppe': ((214, 120, 20), 6, False, ['Gaochang / Turfan', 'Beiting', 'Suyab', 'TALAS', 'Chach / Tashkent']),
 'aksu-suyab': ((214, 120, 20), 5, False, ['Aksu', 'Suyab']),
 'ferghana': ((196, 40, 30), 6, False, ['Kashgar', 'Ferghana / Kasan', 'Chach / Tashkent', 'Samarkand']),
 'west': ((196, 40, 30), 7, False, ['Samarkand', 'Bukhara', 'Merv', 'Nishapur', 'Rayy', 'Hamadan', 'Ctesiphon', 'Kufa']),
 'syria': ((196, 40, 30), 6, False, ['Ctesiphon', 'Antioch', 'Constantinople']),
 'damascus': ((196, 40, 30), 5, False, ['Kufa', 'Damascus', 'Alexandria']),
 'pamir': ((214, 120, 20), 5, False, ['Kashgar', 'Tashkurgan', 'Balkh', 'Termez', 'Samarkand']),
 'india': ((214, 120, 20), 5, False, ['Balkh', 'Bamiyan', 'Kabul', 'Taxila', 'Kanauj']),
 'gilgit': ((214, 120, 20), 4, True, ['Tashkurgan', 'Gilgit', 'Taxila']),
 'merv-herat': ((214, 120, 20), 4, False, ['Merv', 'Herat', 'Kabul']),
 'khwarazm': ((214, 120, 20), 4, True, ['Bukhara', 'Urgench', 'Atil (Khazars)']),
 'tibet': ((214, 120, 20), 4, True, ['Lanzhou', 'Lhasa']),
 'sea': ((40, 90, 160), 5, True, ['Basra', 'Siraf', 'Barygaza']),
}
SEA_TAIL = [(72.98, 21.7), (73.6, 14.0)]  # on toward Sri Lanka, Malacca and Guangzhou
g = img.copy(); d = ImageDraw.Draw(g)

def dashed(pts, col, w, on=26, off=16):
    for (x1, y1), (x2, y2) in zip(pts, pts[1:]):
        L = math.hypot(x2 - x1, y2 - y1); n = max(1, int(L // (on + off)))
        for i in range(n + 1):
            a, b = i * (on + off) / L, min(1, (i * (on + off) + on) / L)
            if a < 1: d.line([(x1 + (x2 - x1) * a, y1 + (y2 - y1) * a), (x1 + (x2 - x1) * b, y1 + (y2 - y1) * b)], fill=col, width=w)

for k, (col, w, dash, names) in ROUTES.items():
    pts = [(fx(C[n][0]), fy(C[n][1])) for n in names]
    if dash: dashed(pts, (0, 0, 0), w + 4); dashed(pts, col, w)
    else: d.line(pts, fill=(0, 0, 0), width=w + 4, joint='curve'); d.line(pts, fill=col, width=w, joint='curve')
dashed([(fx(x), fy(y)) for x, y in SEA_TAIL], (40, 90, 160), 5)
d.text((fx(74.2), fy(14.6)), 'by sea to Sri Lanka, Malacca and Guangzhou', font=F(22, False), fill=(215, 235, 250), anchor='lb', stroke_width=3, stroke_fill=(30, 60, 90))

# powers of 751 (labels only; the frontiers moved constantly)
POW = [('TANG CHINA', 106, 37.5), ('Protectorate of Anxi', 85.5, 44.2), ('TIBETAN EMPIRE', 86, 32.3), ('ABBASID CALIPHATE', 53.5, 31.6),
       ('since 750', 53.5, 30.7), ('BYZANTINE EMPIRE', 33.5, 39.3), ('KHAZARS', 46, 48.3), ('UYGHUR KHAGANATE', 103, 47.5),
       ('KARLUKS', 83.0, 47.6), ('TÜRGESH (scattered)', 69.0, 47.0), ('SOGDIANA', 66.3, 40.75), ('TOKHARISTAN', 71.0, 36.75),
       ('INDIAN KINGDOMS', 80, 23.5), ('KHWARAZM', 58.3, 44.4)]
for t, x, y in POW:
    small = t.islower() or t.startswith('since') or t.startswith('Protectorate')
    d.text((fx(x), fy(y)), t, font=F(24, False) if small else FS(34), fill=(255, 246, 225), anchor='mm', stroke_width=4, stroke_fill=(40, 28, 18))
NAT = [('Taklamakan Desert', 83, 39.2), ('Gobi Desert', 104, 42.6), ('Karakum', 59.3, 39.7), ('Kyzylkum', 64.6, 43.0),
       ('T I A N   S H A N', 82, 42.6), ('P A M I R S', 73.5, 38.4), ('H I N D U   K U S H', 70, 35.6), ('K U N L U N', 86, 36.3),
       ('H I M A L A Y A', 84, 28.9), ('Caspian Sea', 51, 41.5), ('Aral Sea', 59.8, 45.6), ('Black Sea', 34.5, 43.2),
       ('Mediterranean Sea', 30, 33.6), ('Persian Gulf', 51.5, 27.2), ('Arabian Sea', 63, 18), ('Bay of Bengal', 89, 17),
       ('Red Sea', 38.5, 20.5), ('Lake Balkhash', 76.0, 45.6), ('Issyk-Kul', 77.3, 41.9), ('Oxus', 63, 38.6), ('Jaxartes', 66.4, 42.5),
       ('Yellow River', 108.5, 39.6), ('Indus', 70.4, 28.6), ('Tigris & Euphrates', 41, 34.6), ('Iranian Plateau', 56.5, 33.5),
       ('Tibetan Plateau', 86, 34.3), ('ARABIA', 45, 23.5), ('Hexi Corridor', 98.0, 41.4), ('Steppe', 66, 48)]
for t, x, y in NAT:
    d.text((fx(x), fy(y)), t, font=F(22, False), fill=(40, 34, 28) if y > 9 and not t.endswith(('Sea', 'Gulf', 'Bengal')) else (215, 235, 250), anchor='mm',
           stroke_width=3, stroke_fill=(232, 222, 196) if not t.endswith(('Sea', 'Gulf', 'Bengal')) else (30, 60, 90))

MAJOR = {"Chang'an", 'Samarkand', 'Merv', 'Kashgar', 'Dunhuang', 'Kucha', 'Constantinople', 'Kufa', 'Bukhara', 'Khotan', 'Suyab'}
OFF = {'TALAS': (0, -1), 'Chach / Tashkent': (-1, -1), 'Ferghana / Kasan': (1, -1), 'Ctesiphon': (1, -1), 'Kufa': (-1, 1), 'Basra': (1, 0), 'Samarkand': (1, 1), 'Bukhara': (-1, 1), 'Kashgar': (-1, 1), 'Khotan': (-1, 1), 'Niya': (0, 1), 'Barygaza': (-1, 0), 'Merv': (-1, 1), 'Nishapur': (0, 1), 'Lanzhou': (-1, 1),
       'Yumen Pass': (-1, -1), 'Dunhuang': (1, 1), 'Termez': (-1, -1), 'Balkh': (-1, 1), 'Kabul': (1, 1), 'Bamiyan': (-1, -1),
       'Tashkurgan': (-1, 1), 'Yarkand': (1, 0), 'Karashahr': (0, 1), "Chang'an": (0, -1), 'Aksu': (0, 1), 'Beiting': (0, -1), 'Gaochang / Turfan': (1, 1), 'Antioch': (1, -1),
       'Damascus': (1, 0), 'Alexandria': (0, 1), 'Luoyang': (0, 1), 'Liangzhou': (1, -1), 'Ganzhou': (1, -1), 'Suzhou': (-1, -1)}
for n, (x, y) in C.items():
    X, Y = fx(x), fy(y)
    if n == 'TALAS':
        for r, c in ((30, (255, 255, 255)), (24, (230, 40, 20)), (14, (255, 255, 255)), (8, (230, 40, 20))):
            d.ellipse([X - r, Y - r, X + r, Y + r], fill=c)
        d.text((X, Y - 40), 'TALAS, July 751', font=FS(40), fill=(255, 235, 120), anchor='mb', stroke_width=5, stroke_fill=(60, 10, 0))
        continue
    r = 10 if n in MAJOR else 7
    d.ellipse([X - r - 3, Y - r - 3, X + r + 3, Y + r + 3], fill=(0, 0, 0)); d.ellipse([X - r, Y - r, X + r, Y + r], fill=(255, 250, 235))
    ox, oy = OFF.get(n, (1, -1)); a = ('l' if ox > 0 else 'r' if ox < 0 else 'm') + ('b' if oy < 0 else 't' if oy > 0 else 'm')
    d.text((X + ox * 16, Y + oy * 14), n, font=F(28 if n in MAJOR else 22), fill=(255, 255, 255), anchor=a, stroke_width=4, stroke_fill=(0, 0, 0))

# title, legend, scale
d.rectangle([0, 0, W, 92], fill=(18, 14, 10))
d.text((30, 46), 'THE SILK ROAD AROUND 751', font=FS(52), fill=(233, 199, 122), anchor='lm')
d.text((W - 30, 46), "Mediterranean to Chang'an  ·  routes and cities as they were in the 8th century", font=F(26, False), fill=(230, 222, 200), anchor='rm')
lx, ly = 40, H - 250
lx = W - 760
d.rectangle([lx - 18, ly - 22, lx + 690, H - 22], fill=(18, 14, 10))
for i, (col, dash, t) in enumerate([((196, 40, 30), False, 'Main caravan routes'), ((214, 120, 20), False, 'Branch routes and passes'),
                                     ((214, 120, 20), True, 'Lesser and seasonal routes'), ((40, 90, 160), True, 'Sea route to India and China')]):
    y = ly + 12 + i * 46
    if dash: dashed([(lx, y), (lx + 90, y)], col, 7, 20, 12)
    else: d.line([(lx, y), (lx + 90, y)], fill=col, width=8)
    d.text((lx + 110, y), t, font=F(26, False), fill=(240, 232, 210), anchor='lm')
km = 1000; px = km / (111.32 * math.cos(math.radians(40))) / (LON1 - LON0) * W
d.line([(lx, H - 50), (lx + px, H - 50)], fill=(240, 232, 210), width=6); d.text((lx + px + 14, H - 50), '1,000 km (at 40°N)', font=F(24, False), fill=(240, 232, 210), anchor='lm')
d.text((24, H - 18), 'Relief: AWS Terrain Tiles (SRTM and others). Coasts, rivers, lakes: Natural Earth (public domain). Routes after the historical atlases cited in SILK-ROAD.md.',
       font=F(18, False), fill=(255, 255, 255), anchor='lb', stroke_width=3, stroke_fill=(0, 0, 0))
g.save(os.path.join(OUT, 'silk-road-751-guide.jpg'), quality=90)

mp = os.path.join(OUT, 'maps.json'); M = json.load(open(mp))
M = [m for m in M if 'silk-road' not in m['file']] + [{'file': 'silk-road-751-guide.jpg', 'lat0': LAT0, 'lat1': LAT1, 'lon0': LON0, 'lon1': LON1,
     'W': W, 'H': H, 'km_w': round((LON1 - LON0) * 111.32 * math.cos(math.radians(35)))}]
json.dump(M, open(mp, 'w'), indent=1)
print('ok')
