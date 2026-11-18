#!/usr/bin/env python3
"""Ukraine and Russia: Escalation, 1991-2014: the eight base maps (to repaint) and guides for ChatGPT, one map per chat.
    python3 battlesofhistory/ukraine-escalation/tools/draw-maps.py [europe ukraine crimea sevastopol kerch pipelines kyiv georgia]
  europe      Europe and the western Soviet Union, 1991 (4000 x 3000 km)            slides: I2
  ukraine     Ukraine, the Black Sea and the Sea of Azov (1600 x 1200 km)            slides: ch. 1, 14, debrief
  crimea      the Crimean peninsula (360 x 270 km)                                  slides: ch. 5, 14
  sevastopol  Sevastopol's bays (24 x 18 km)                                        slides: ch. 6
  kerch       the Kerch Strait and the island of Tuzla (40 x 30 km)                 slides: ch. 7
  pipelines   from Russia across Ukraine to central Europe (3000 x 2250 km)         slides: ch. 9 (the page draws the pipelines)
  kyiv        central Kyiv: the Maidan to the Rada (3 x 2.25 km)                    slides: ch. 12, 13
  georgia     Georgia and the Caucasus, August 2008 (700 x 525 km)                  slides: ch. 10
Terrain: AWS elevation tiles, through the Mogadishu tool (somalia1988 -> sixday -> batoche -> talas). Rivers and lakes:
Natural Earth (public domain). Central Kyiv: OpenStreetMap ((c) OpenStreetMap contributors, ODbL), tools/osm-kyiv.json,
today's streets and buildings (the centre was little changed between 2014 and today). The paintings carry no borders: the
page draws the borders of the time itself. Borders on the guides are Natural Earth's, for orientation only; its disputed
line across the Perekop isthmus is left out (in 1991-2014 that was the boundary of Crimea inside Ukraine). Labels are for
the painter only. Writes images/layout/<map>-base.png, <map>-guide.png and maps.json."""
import os, sys, json, math
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.join(HERE, '..', '..')
MOG = os.path.join(ROOT, 'mogadishu1993', 'tools', 'draw-maps.py')
src = open(MOG).read().split('want = sys.argv')[0]
NS = {'__file__': MOG, '__name__': 'ukraine-escalation'}; exec(compile(src, 'mog-maps', 'exec'), NS)
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi
G, Guide, frame43, sea_mask, CACHE, clean = (NS[k] for k in ('G', 'Guide', 'frame43', 'sea_mask', 'CACHE', 'clean'))
BLUE, BLACK, GREY, WATER = (NS[k] for k in ('BLUE', 'BLACK', 'GREY', 'WATER'))
OUT = os.path.join(HERE, '..', 'images', 'layout'); os.makedirs(OUT, exist_ok=True); G['OUT'] = OUT; NS['OUT'] = OUT
KY = json.load(open(os.path.join(HERE, 'osm-kyiv.json')))
KC = json.load(open(os.path.join(HERE, 'osm-kerch-coast.json')))   # OpenStreetMap coastline of the Kerch Strait (the elevation misses Tuzla)
F, RED, WHITE = (G[k] for k in ('F', 'RED', 'WHITE')); W, H = 2400, 1800


def frame(self, title, note, step):
    """The guide's grid, title and scale bar (the shared one has no bar under 1 km, for central Kyiv)."""
    d = self.d; fmt = '%.3f' if step < .01 else '%.2f' if step < 1 else '%.0f'
    def ticks(a, b):
        v = math.ceil(a / step - 1e-9) * step; out = []
        while v <= b + 1e-9: out.append(round(v, 6)); v += step
        return out
    for lon in ticks(self.lon0, self.lon1):
        x = self.xy(self.lat0, lon)[0]
        for y in range(0, H, 24): d.line([(x, y), (x, y + 10)], fill=(255, 255, 255), width=1)
        for yy, an in ((H - 6, 'mb'), (138, 'mt')): d.text((x, yy), (fmt + '°E') % lon, fill=BLACK, font=F(20, True), anchor=an, stroke_width=3, stroke_fill=WHITE)
    for lat in ticks(self.lat0, self.lat1):
        y = self.xy(lat, self.lon0)[1]
        for x in range(0, W, 24): d.line([(x, y), (x + 10, y)], fill=(255, 255, 255), width=1)
        for xx, an in ((6, 'lm'), (W - 6, 'rm')): d.text((xx, y), (fmt + '°N') % lat, fill=BLACK, font=F(20, True), anchor=an, stroke_width=3, stroke_fill=WHITE)
    d.rectangle([0, 0, W - 1, H - 1], outline=BLACK, width=4)
    d.text((30, 22), 'N ↑  ' + title, fill=RED, font=F(40, True), stroke_width=4, stroke_fill=WHITE)
    d.text((30, 72), 'Map %d x %d px = %.1f x %.1f km (%.1f px per km). Corners: %.4f°N %.4f°E (top left) to %.4f°N %.4f°E (bottom right). %s'
           % (W, H, self.km_w, self.km_h, W / self.km_w, self.lat1, self.lon0, self.lat0, self.lon1, note), fill=BLACK, font=F(21), stroke_width=3, stroke_fill=WHITE)
    km = next(k for k in (1000, 500, 200, 100, 50, 20, 10, 5, 2, 1, .5, .2, .1) if W / self.km_w * k < 700); px = W / self.km_w * km
    d.rectangle([W - 70 - px, H - 70, W - 70, H - 56], fill=BLACK); d.rectangle([W - 70 - px, H - 70, W - 70 - px / 2, H - 56], fill=WHITE, outline=BLACK, width=2)
    d.text((W - 70 - px / 2, H - 78), ('%g km' % km) if km >= 1 else ('%d m' % (km * 1000)), fill=BLACK, font=F(26, True), anchor='mb', stroke_width=3, stroke_fill=WHITE)
Guide.frame = frame

GREEN = [(0, (150, 176, 118)), (150, (160, 182, 122)), (400, (176, 186, 128)), (900, (170, 166, 122)), (1800, (150, 142, 120)),
         (2800, (170, 168, 160)), (3800, (236, 238, 242))]
CITY = [(80, (176, 178, 160)), (200, (184, 184, 164))]
MAPS = {  # name: (frame, zoom, kind, title)
  'europe':     (frame43(50.0, 28.0, 4000), 5, 'wide', 'EUROPE AND THE WESTERN SOVIET UNION, 1991'),
  'ukraine':    (frame43(48.5, 31.5, 1600), 6, 'wide', 'UKRAINE, THE BLACK SEA AND THE SEA OF AZOV'),
  'crimea':     (frame43(45.3, 34.4, 360), 8, 'coast', 'THE CRIMEAN PENINSULA'),
  'sevastopol': (frame43(44.60, 33.53, 24), 14, 'coast', "SEVASTOPOL'S BAYS"),
  'kerch':      (frame43(45.30, 36.55, 40), 12, 'coast', 'THE KERCH STRAIT AND TUZLA'),
  'pipelines':  (frame43(49.0, 26.0, 3000), 5, 'wide', 'FROM RUSSIA ACROSS UKRAINE TO CENTRAL EUROPE (the page draws the pipelines)'),
  'kyiv':       (frame43(50.448, 30.525, 3), 15, 'city', 'CENTRAL KYIV: THE MAIDAN TO THE RADA'),
  'georgia':    (frame43(42.3, 43.5, 700), 7, 'wide', 'GEORGIA AND THE CAUCASUS, AUGUST 2008'),
}
C = {  # cities (lat, lon)
  'Kyiv': (50.450, 30.523), 'Kharkiv': (49.993, 36.231), 'Donetsk': (48.016, 37.803), 'Luhansk': (48.574, 39.308),
  'Dnipropetrovsk (Dnipro)': (48.465, 35.046), 'Odesa': (46.482, 30.723), 'Lviv': (49.840, 24.030), 'Zaporizhzhia': (47.838, 35.139),
  'Mariupol': (47.097, 37.543), 'Mykolaiv': (46.975, 31.995), 'Simferopol': (44.952, 34.102), 'Sevastopol': (44.616, 33.525),
  'Kerch': (45.357, 36.468), 'Chernihiv': (51.498, 31.289), 'Uzhhorod': (48.621, 22.288), 'Moscow': (55.756, 37.617),
  'Minsk': (53.904, 27.562), 'Warsaw': (52.230, 21.012), 'Chisinau': (47.011, 28.863), 'Bucharest': (44.427, 26.103),
  'Rostov-on-Don': (47.236, 39.701), 'Krasnodar': (45.035, 38.975), 'Belgorod': (50.597, 36.588), 'Budapest': (47.498, 19.040),
  'Vienna': (48.208, 16.373), 'Berlin': (52.520, 13.405), 'Bratislava': (48.148, 17.107), 'Prague': (50.075, 14.437),
  'Sofia': (42.698, 23.322), 'Istanbul': (41.008, 28.978), 'Ankara': (39.933, 32.860), 'Tbilisi': (41.716, 44.783),
  'Riga': (56.949, 24.106), 'Vilnius': (54.687, 25.280), 'Tallinn': (59.437, 24.754), 'St Petersburg': (59.934, 30.335),
  'Helsinki': (60.170, 24.940), 'Stockholm': (59.330, 18.070), 'Rome': (41.900, 12.500), 'Copenhagen': (55.680, 12.570),
  'Belavezha Forest (Viskuli)': (52.570, 23.800), 'Kharkiv ': (49.993, 36.231),
}
pl = lambda *names: [(C[n][0], C[n][1], n.strip(), 0) for n in names]
PLACES = {
  'europe': pl('Moscow', 'Kyiv', 'Minsk', 'Warsaw', 'Berlin', 'Vienna', 'Budapest', 'Bucharest', 'Sofia', 'Istanbul', 'Ankara', 'Tbilisi',
               'Riga', 'Vilnius', 'Tallinn', 'St Petersburg', 'Helsinki', 'Stockholm', 'Rome', 'Copenhagen', 'Prague', 'Belavezha Forest (Viskuli)',
               'Sevastopol', 'Kharkiv', 'Chisinau'),
  'ukraine': pl('Kyiv', 'Kharkiv', 'Donetsk', 'Luhansk', 'Dnipropetrovsk (Dnipro)', 'Odesa', 'Lviv', 'Zaporizhzhia', 'Mariupol', 'Mykolaiv',
                'Simferopol', 'Sevastopol', 'Kerch', 'Chernihiv', 'Uzhhorod', 'Minsk', 'Chisinau', 'Rostov-on-Don', 'Krasnodar', 'Belgorod', 'Warsaw', 'Bucharest'),
  'crimea': pl('Simferopol', 'Sevastopol', 'Kerch') + [(44.495, 34.166, 'Yalta', 0), (45.031, 35.382, 'Feodosia', 0), (45.190, 33.367, 'Yevpatoria', 0),
             (45.709, 34.393, 'Dzhankoi', 0), (46.106, 33.692, 'Armiansk', 0), (46.172, 34.802, 'Henichesk', 0)],
  'sevastopol': [(44.605, 33.522, 'Sevastopol city centre', 0), (44.613, 33.608, 'Inkerman', 1), (44.632, 33.565, 'North Side', 1)],
  'kerch': [(45.357, 36.468, 'Kerch', 0), (45.215, 36.716, 'Taman', 0), (45.335, 36.670, 'Port Kavkaz (approx.)', 1)],
  'pipelines': pl('Kyiv', 'Uzhhorod', 'Moscow', 'Minsk', 'Warsaw', 'Bratislava', 'Vienna', 'Budapest', 'Bucharest', 'Berlin', 'Prague',
                  'Chisinau', 'Sofia', 'Istanbul', 'Kharkiv', 'Odesa', 'Lviv'),
  'kyiv': [(50.4496, 30.5254, 'MAIDAN (Independence Square)', 0), (50.4473, 30.5370, 'Verkhovna Rada (parliament)', 0),
           (50.4446, 30.5283, 'Presidential Administration, Bankova St', 0), (50.4511, 30.5240, 'Trade Union Building', 0),
           (50.4483, 30.5262, 'Hotel Ukraina (approx.)', 1), (50.4527, 30.5282, 'European Square', 0), (50.4518, 30.5312, 'Dynamo stadium', 0),
           (50.4455, 30.5395, 'Mariinskyi Park', 0)],
  'georgia': [(41.716, 44.783, 'Tbilisi', 0), (42.226, 43.970, 'Tskhinvali', 0), (41.984, 44.109, 'Gori', 0), (43.001, 41.023, 'Sukhumi', 0),
              (42.146, 41.672, 'Poti', 0), (41.643, 41.634, 'Batumi', 0), (42.270, 42.700, 'Kutaisi', 0), (42.509, 41.870, 'Zugdidi', 0),
              (43.585, 39.723, 'Sochi', 0), (43.020, 44.682, 'Vladikavkaz', 0), (42.660, 44.000, 'Roki Tunnel (approx.)', 1), (40.180, 44.510, 'Yerevan', 0)],
}
AREAS = {
  'europe': [(43.3, 34.0, 'BLACK SEA'), (57.2, 19.2, 'BALTIC SEA'), (42.5, 50.6, 'CASPIAN SEA'), (38.0, 18.5, 'MEDITERRANEAN SEA'), (56.5, 3.5, 'NORTH SEA'),
             (49.0, 31.5, 'UKRAINE'), (55.0, 42.0, 'RUSSIA'), (53.3, 28.0, 'BELARUS'), (52.0, 19.0, 'POLAND'), (47.0, 53.0, 'KAZAKHSTAN'), (39.0, 35.0, 'TURKEY'), (45.3, 34.2, 'Crimea')],
  'ukraine': [(43.9, 32.2, 'BLACK SEA'), (46.3, 36.7, 'SEA OF AZOV'), (49.4, 31.6, 'UKRAINE'), (52.3, 38.5, 'RUSSIA'), (53.0, 26.0, 'BELARUS'), (51.6, 21.9, 'POLAND'),
              (45.8, 24.0, 'ROMANIA'), (47.5, 28.3, 'MOLDOVA'), (45.35, 34.3, 'Crimea'), (48.0, 33.8, 'Dnieper')],
  'crimea': [(44.4, 33.0, 'BLACK SEA'), (46.3, 36.2, 'SEA OF AZOV'), (44.75, 34.35, 'Crimean Mountains'), (46.17, 33.62, 'Perekop isthmus'),
             (45.95, 34.55, 'Sivash'), (45.25, 36.55, 'Kerch Strait'), (45.65, 35.4, 'Arabat Spit (approx.)')],
  'sevastopol': [(44.66, 33.43, 'BLACK SEA'), (44.622, 33.560, 'Sevastopol Bay (approx.)'), (44.606, 33.533, 'South Bay (approx.)'),
                 (44.613, 33.493, 'Quarantine Bay (approx.)'), (44.598, 33.468, 'Streletska Bay (approx.)'), (44.578, 33.405, 'Kozacha Bay (approx.)')],
  'kerch': [(45.42, 36.45, 'SEA OF AZOV'), (45.19, 36.34, 'BLACK SEA'), (45.31, 36.56, 'Kerch Strait'), (45.272, 36.535, 'TUZLA island'), (45.225, 36.625, 'Tuzla Spit (approx.)'),
            (45.40, 36.68, 'Chushka Spit (approx.)'), (45.24, 36.78, 'Taman peninsula')],
  'pipelines': [(43.4, 34.0, 'BLACK SEA'), (56.5, 18.5, 'BALTIC SEA'), (49.4, 31.6, 'UKRAINE'), (54.5, 40.0, 'RUSSIA'), (53.3, 28.0, 'BELARUS'), (52.0, 19.0, 'POLAND'),
                (50.5, 10.5, 'GERMANY'), (48.7, 19.6, 'SLOVAKIA'), (47.2, 19.3, 'HUNGARY'), (45.8, 24.5, 'ROMANIA'), (42.7, 25.3, 'BULGARIA'), (40.0, 33.0, 'TURKEY')],
  'kyiv': [(50.4458, 30.5205, 'Khreshchatyk St'), (50.4472, 30.5292, 'Instytutska St'), (50.4492, 30.5322, 'Hrushevskoho St')],
  'georgia': [(42.5, 39.9, 'BLACK SEA'), (42.95, 41.45, 'ABKHAZIA'), (42.38, 43.95, 'SOUTH OSSETIA'), (41.75, 43.1, 'GEORGIA'), (44.3, 43.2, 'RUSSIA'),
              (40.4, 45.0, 'ARMENIA'), (41.0, 46.9, 'AZERBAIJAN'), (40.6, 41.3, 'TURKEY'), (43.25, 43.0, 'Caucasus mountains')],
}
SEA_NAMES = ('SEA', 'OCEAN', 'Bay', 'Strait', 'Sivash')


def osm_sea(shape, m, ways, dem_sea):
    """Sea from OpenStreetMap coastlines (land on the left of each way): the coastlines cut the map into regions, and each
    region is voted sea or land from both sides of its coastline; regions with no coastline keep the elevation's answer.
    Left out: the piers of the 2018 bridge and its construction island (after this page's years)."""
    H, W = shape; la0, la1, lo0, lo1 = m
    px = lambda la, lo: ((lo - lo0) / (lo1 - lo0) * W, (la1 - la) / (la1 - la0) * H)
    keep = [w for w in ways if w['t'].get('natural') == 'coastline' and w['t'].get('man_made') != 'bridge' and 'Искусствен' not in w['t'].get('name', '')]
    bar = Image.new('L', (W, H), 0); d = ImageDraw.Draw(bar)
    for w in keep: d.line([px(*a) for a in w['p']], fill=255, width=3)
    B = np.asarray(bar) > 0; lab, n = ndi.label(~B)
    votes = np.zeros((n + 1, 2))
    for w in keep:
        q = [px(*a) for a in w['p']]
        for (x0, y0), (x1, y1) in zip(q, q[1:]):
            L = math.hypot(x1 - x0, y1 - y0)
            if L < 1: continue
            nx, ny = -(y1 - y0) / L, (x1 - x0) / L        # right-hand side on screen (y down): the sea side
            for t in np.linspace(0, 1, max(2, int(L / 4))):
                x, y = x0 + (x1 - x0) * t, y0 + (y1 - y0) * t
                for sgn, k in ((1, 0), (-1, 1)):            # 0 = sea vote, 1 = land vote
                    xx, yy = int(round(x + sgn * nx * 4)), int(round(y + sgn * ny * 4))
                    if 0 <= xx < W and 0 <= yy < H and lab[yy, xx]: votes[lab[yy, xx], k] += 1
    sea_r = votes[:, 0] > votes[:, 1]; none = votes.sum(1) == 0
    dem_frac = ndi.mean(dem_sea.astype(float), lab, range(n + 1))
    sea_r[none] = np.asarray(dem_frac)[none] > .5; sea_r[0] = False
    S = sea_r[lab]
    return ndi.binary_dilation(S, iterations=1) & (S | B)


def kyiv_layer(rgb, m):
    """Central Kyiv from OpenStreetMap: parks, water, squares, streets by class, buildings."""
    H, W = rgb.shape[:2]; la0, la1, lo0, lo1 = m
    px = lambda la, lo: ((lo - lo0) / (lo1 - lo0) * W, (la1 - la) / (la1 - la0) * H)
    mpp = (lo1 - lo0) * 111320 * math.cos(math.radians((la0 + la1) / 2)) / W
    im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); d = ImageDraw.Draw(im)
    for p in KY['green']:
        if len(p) > 2: d.polygon([px(*a) for a in p], fill=(132, 164, 104))
    for p in KY['water']:
        if len(p) > 2: d.polygon([px(*a) for a in p], fill=(92, 128, 150))
    for p in KY['squares']:
        if len(p) > 2: d.polygon([px(*a) for a in p], fill=(206, 200, 186))
    widths = {'primary': 22, 'secondary': 16, 'tertiary': 12, 'residential': 8, 'unclassified': 8, 'living_street': 6, 'service': 4,
              'pedestrian': 8, 'footway': 2.5, 'path': 2, 'steps': 2.5}
    for o in sorted(KY['roads'], key=lambda o: widths.get(o['k'], 0)):
        w = widths.get(o['k'].replace('_link', ''))
        if not w: continue
        col = (214, 208, 196) if o['k'] in ('footway', 'path', 'steps', 'pedestrian') else (198, 194, 186)
        d.line([px(*a) for a in o['p']], fill=col, width=max(2, round(w / mpp)), joint='curve')
    for p in KY['buildings']:
        if len(p) > 2: d.polygon([px(*a) for a in p], fill=(150, 138, 128), outline=(110, 102, 96))
    return np.asarray(im).astype(float)


want = sys.argv[1:] or list(MAPS); mj = os.path.join(OUT, 'maps.json')
old = {m['file']: m for m in (json.load(open(mj)) if os.path.exists(mj) else [])}
for name in want:
    (la0, la1, lo0, lo1), zoom, kind, title = MAPS[name]
    G['RAMP'][:] = CITY if kind == 'city' else GREEN
    g = Guide(name + '-guide.png', la0, la1, lo0, lo1, zoom, None, None)
    rgb = g.rgb.copy().astype(float)
    if kind != 'city':
        sea = sea_mask(g)
        lab, n = ndi.label(g.e <= .5); sz = ndi.sum(np.ones_like(lab), lab, range(1, n + 1))
        big = 3000 if kind == 'wide' else 20000           # the Black Sea and the Caspian on the wide maps (the Bosporus is too narrow to join them)
        sea |= np.isin(lab, [i + 1 for i, v in enumerate(sz) if v > big])
        if name == 'kerch':
            low_land = ~sea; sea = osm_sea(sea.shape, (la0, la1, lo0, lo1), KC, sea)
            rgb[~sea & (g.e <= .5)] = (176, 172, 132)     # land the elevation took for sea (Tuzla, the spits): sand and marsh
        rgb[sea] = (82, 120, 158)
    else:
        rgb = kyiv_layer(rgb, (la0, la1, lo0, lo1))
    g.im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); g.d = ImageDraw.Draw(g.im)
    if kind == 'wide':
        g.lakes(clean(os.path.join(CACHE, 'ne_10m_lakes.geojson'))); g.geojson_lines(clean(os.path.join(CACHE, 'ne_rivers.geojson')), WATER, 3)
    g.im.save(os.path.join(OUT, name + '-base.png'), optimize=True)
    if kind == 'wide' or name == 'crimea':
        g.geojson_lines(clean(os.path.join(CACHE, 'ne_10m_admin_0_boundary_lines_land.geojson')), (90, 90, 90), 3,
                        lambda p: 'isputed' not in (p.get('FEATURECLA') or ''))
    wide = kind == 'wide'
    for la, lo, s, ap in PLACES[name]:
        if la0 < la < la1 and lo0 < lo < lo1: g.town(la, lo, s, '', 24 if wide else 26, GREY if ap else BLACK, 7 if wide else 9, -24)
    for la, lo, t in AREAS[name]:
        if la0 < la < la1 and lo0 < lo < lo1: g.text(la, lo, t, BLUE if any(k in t for k in SEA_NAMES) else GREY, 26, True)
    step = {'europe': 5, 'ukraine': 2, 'crimea': .5, 'sevastopol': .05, 'kerch': .05, 'pipelines': 5, 'kyiv': .005, 'georgia': 1}[name]
    g.frame(title + ': layout guide', 'Real elevation; rivers and lakes: Natural Earth' + ('; streets and buildings: OpenStreetMap (c) OSM contributors, ODbL'
            if kind == 'city' else '') + '. Borders: for orientation only, not to paint. Labels are for the painter only.', step)
    meta = g.save(); old[meta['file']] = meta; print(name, round(meta['km_w'], 1), 'x', round(meta['km_h'], 1), 'km')
json.dump(list(old.values()), open(mj, 'w'), indent=1)
