#!/usr/bin/env python3
"""Draws the three Talas layout guides (talas/images/layout/*.png) from REAL elevation data.

    pip install numpy scipy pillow pysheds
    python3 battlesofhistory/talas/tools/draw-layout-guides.py

- Terrain: AWS Terrain Tiles (SRTM, ~30 m), see dem.py. Hill shading and height colours come straight from it.
- Rivers: traced from the same elevation (water runs downhill: see rivers.py). The region map adds Natural Earth's large
  rivers and lakes. Modern reservoirs show as flat ground or lakes; there were none in 751.
- Places: lat/lon from the sources in ../RESEARCH.md. Medieval names first, modern ones in brackets.
- Every guide is 2400 x 1800, north up, equal steps of latitude and longitude, with a lat/lon grid on the edges so a
  painting can be lined up exactly. The engine uses the same 2400 x 1800 "world pixels".
"""
import json, math, os, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy.ndimage import binary_dilation, gaussian_filter

sys.path.insert(0, os.path.dirname(__file__))
import dem as DEM, rivers as RIV

OUT = os.path.join(os.path.dirname(__file__), '..', 'images', 'layout')
CACHE = DEM.CACHE
W, H = 2400, 1800
F = lambda s, bold=False: ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf' % ('-Bold' if bold else ''), s)
RED, BLUE, PURPLE, ORANGE, WHITE, BLACK, GREY = (220, 30, 30), (30, 70, 200), (150, 40, 170), (225, 120, 0), (255, 255, 255), (20, 20, 20), (90, 90, 90)
WATER = (110, 165, 215)
# height colours (metres -> rgb): steppe, foothills, mountains, high rock, snow
RAMP = [(0, (200, 212, 150)), (500, (208, 210, 152)), (900, (214, 203, 148)), (1400, (200, 182, 132)), (2200, (172, 150, 115)),
        (3200, (148, 128, 106)), (4000, (205, 205, 210)), (5000, (248, 248, 252))]


def colour(e):
    out = np.zeros(e.shape + (3,), np.float32)
    hs, cs = [h for h, _ in RAMP], np.array([c for _, c in RAMP], np.float32)
    for k in range(3): out[..., k] = np.interp(e, hs, cs[:, k])
    return out


class Guide:
    def __init__(self, name, lat0, lat1, lon0, lon1, zoom, river_km2, river_scale, river_from=None):
        self.name, self.lat0, self.lat1, self.lon0, self.lon1 = name, lat0, lat1, lon0, lon1
        latm = (lat0 + lat1) / 2; kx = math.cos(math.radians(latm)) * 111.32
        self.km_w, self.km_h = (lon1 - lon0) * kx, (lat1 - lat0) * 111.32
        print(name, '%.0f x %.0f km' % (self.km_w, self.km_h), flush=True)
        e = DEM.dem(lat0, lat1, lon0, lon1, W, H, zoom); self.e = e
        cell = self.km_w * 1000 / W
        hs = DEM.hillshade(gaussian_filter(e, .6), cell, exag=1.6 if cell < 100 else 3)
        rgb = colour(e) * (.5 + .5 * hs[..., None]); self.rgb = rgb
        self.acc = None
        if river_km2:
            if river_from:   # trace on a wider area so rivers that rise outside this map still carry their whole catchment
                a0, a1, o0, o1, ww, hh, zz = river_from
                big = DEM.dem(a0, a1, o0, o1, ww, hh, zz); bacc, _ = RIV.accumulation(big, a0, a1, o0, o1)
                bcell = (o1 - o0) / ww * 111320 * math.cos(math.radians(latm))
                xs = ((lon0 + (np.arange(W) + .5) / W * (lon1 - lon0)) - o0) / (o1 - o0) * ww
                ys = (a1 - (lat1 - (np.arange(H) + .5) / H * (lat1 - lat0))) / (a1 - a0) * hh
                # keep the strongest flow near each pixel so thin channels are not lost when sampling
                from scipy.ndimage import maximum_filter
                bacc = maximum_filter(bacc, size=3)
                acc = bacc[np.clip(ys.astype(int), 0, hh - 1)[:, None], np.clip(xs.astype(int), 0, ww - 1)[None, :]]
                area = acc * (bcell / 1000) ** 2
            else:
                acc, _ = RIV.accumulation(e, lat0, lat1, lon0, lon1); area = acc * (cell / 1000) ** 2   # km2 drained
            self.acc = acc
            for th, wpx in river_scale:
                m = area > th * river_km2 / river_scale[0][0]
                if wpx > 1: m = binary_dilation(m, iterations=int(wpx // 2))
                rgb[m] = WATER
        self.im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); self.d = ImageDraw.Draw(self.im)
        # a clean copy (terrain and rivers only, no labels, grid or arrows) for ChatGPT to repaint realistically
        os.makedirs(OUT, exist_ok=True); self.im.save(os.path.join(OUT, name.replace('-guide.png', '-base.png')), optimize=True)

    def xy(self, lat, lon): return ((lon - self.lon0) / (self.lon1 - self.lon0) * W, (self.lat1 - lat) / (self.lat1 - self.lat0) * H)
    def P(self, pts): return [self.xy(a, b) for a, b in pts]

    def line(self, pts, col, w=6, dash=None):
        q = self.P(pts)
        if not dash: self.d.line(q, fill=col, width=w, joint='curve'); return
        for (x1, y1), (x2, y2) in zip(q, q[1:]):
            L = math.hypot(x2 - x1, y2 - y1); n = max(1, int(L // dash))
            for i in range(0, n, 2):
                t0, t1 = i / n, min(1, (i + 1) / n)
                self.d.line([(x1 + (x2 - x1) * t0, y1 + (y2 - y1) * t0), (x1 + (x2 - x1) * t1, y1 + (y2 - y1) * t1)], fill=col, width=w)

    def text(self, lat, lon, s, col=BLACK, size=26, bold=False, anchor='mm'):
        x, y = self.xy(lat, lon); self.d.text((x, y), s, fill=col, font=F(size, bold), anchor=anchor, stroke_width=4, stroke_fill=WHITE)

    def town(self, lat, lon, s, sub='', size=28, col=BLACK, r=11, dy=-30, walled=False):
        x, y = self.xy(lat, lon)
        if walled: self.d.rectangle([x - r, y - r, x + r, y + r], fill=col, outline=WHITE, width=3)
        else: self.d.ellipse([x - r, y - r, x + r, y + r], fill=col, outline=WHITE, width=3)
        self.d.text((x, y + dy), s, fill=col, font=F(size, True), anchor='mb' if dy < 0 else 'mt', stroke_width=4, stroke_fill=WHITE)
        if sub: self.d.text((x, y + dy + (4 if dy < 0 else size + 4)), sub, fill=GREY, font=F(int(size * .7)), anchor='mt' if dy < 0 else 'mt', stroke_width=3, stroke_fill=WHITE)

    def ring(self, lat, lon, rkm, s, col=PURPLE, dash=True):
        x, y = self.xy(lat, lon); r = rkm / self.km_w * W
        n = 48
        for i in range(0, n, 2 if dash else 1):
            a0, a1 = i / n * 2 * math.pi, (i + 1) / n * 2 * math.pi
            self.d.arc([x - r, y - r, x + r, y + r], math.degrees(a0), math.degrees(a1), fill=col, width=5)
        self.d.ellipse([x - 6, y - 6, x + 6, y + 6], fill=col)
        self.d.multiline_text((x, y + r + 8), s, fill=col, font=F(22, True), anchor='ma', align='center', stroke_width=4, stroke_fill=WHITE)

    def zone(self, pts, s, col=ORANGE, at=None):
        q = self.P(pts); q.append(q[0])
        for (x1, y1), (x2, y2) in zip(q, q[1:]):
            L = math.hypot(x2 - x1, y2 - y1); n = max(1, int(L // 22))
            for i in range(0, n, 2):
                t0, t1 = i / n, min(1, (i + 1) / n)
                self.d.line([(x1 + (x2 - x1) * t0, y1 + (y2 - y1) * t0), (x1 + (x2 - x1) * t1, y1 + (y2 - y1) * t1)], fill=col, width=5)
        cx, cy = at and self.xy(*at) or (sum(p[0] for p in q[:-1]) / len(pts), sum(p[1] for p in q[:-1]) / len(pts))
        for k, ln in enumerate(s.split('\n')): self.d.text((cx, cy + k * 30), ln, fill=col, font=F(24, True), anchor='mm', stroke_width=4, stroke_fill=WHITE)

    def arrow(self, pts, col, s='', w=8, at=.5):
        self.line(pts, col, w, dash=26)
        (x1, y1), (x2, y2) = self.P(pts[-2:]); a = math.atan2(y2 - y1, x2 - x1); L = 34
        self.d.polygon([(x2, y2), (x2 - L * math.cos(a - .45), y2 - L * math.sin(a - .45)), (x2 - L * math.cos(a + .45), y2 - L * math.sin(a + .45))], fill=col)
        if s:
            i = min(len(pts) - 2, int((len(pts) - 1) * at)); x, y = self.P([pts[i]])[0]
            self.d.text((x, y - 16), s, fill=col, font=F(24, True), anchor='mb', stroke_width=4, stroke_fill=WHITE)

    def geojson_lines(self, path, col, w, filt=lambda p: True):
        for f in json.load(open(path))['features']:
            if not filt(f['properties']): continue
            g = f['geometry']; cs = g['coordinates'] if g['type'] in ('MultiLineString', 'Polygon') else [g['coordinates']] if g['type'] == 'LineString' else [r for p in g['coordinates'] for r in p]
            for c in cs:
                if any(self.lon0 - 1 < x < self.lon1 + 1 and self.lat0 - 1 < y < self.lat1 + 1 for x, y in c): self.line([(y, x) for x, y in c], col, w)

    def lakes(self, path):
        for f in json.load(open(path))['features']:
            g = f['geometry']; polys = [g['coordinates']] if g['type'] == 'Polygon' else g['coordinates']
            for p in polys:
                if any(self.lon0 < x < self.lon1 and self.lat0 < y < self.lat1 for x, y in p[0]): self.d.polygon(self.P([(y, x) for x, y in p[0]]), fill=WATER, outline=(70, 120, 180))

    def frame(self, title, note, step):
        d = self.d
        # lat/lon grid: thin lines and labels on every edge, so a painting can be lined up exactly
        def rng(a, b): s = math.ceil(a / step) * step; out = []
        def ticks(a, b):
            v = math.ceil(a / step - 1e-9) * step; out = []
            while v <= b + 1e-9: out.append(round(v, 6)); v += step
            return out
        for lon in ticks(self.lon0, self.lon1):
            x = self.xy(self.lat0, lon)[0]
            for y in range(0, H, 24): d.line([(x, y), (x, y + 10)], fill=(255, 255, 255), width=1)
            for yy, an in ((H - 6, 'mb'), (138, 'mt')): d.text((x, yy), ('%.2f°E' if step < 1 else '%.0f°E') % lon, fill=BLACK, font=F(20, True), anchor=an, stroke_width=3, stroke_fill=WHITE)
        for lat in ticks(self.lat0, self.lat1):
            y = self.xy(lat, self.lon0)[1]
            for x in range(0, W, 24): d.line([(x, y), (x + 10, y)], fill=(255, 255, 255), width=1)
            for xx, an in ((6, 'lm'), (W - 6, 'rm')): d.text((xx, y), ('%.2f°N' if step < 1 else '%.0f°N') % lat, fill=BLACK, font=F(20, True), anchor=an, stroke_width=3, stroke_fill=WHITE)
        d.rectangle([0, 0, W - 1, H - 1], outline=BLACK, width=4)
        d.text((30, 22), 'N ↑  ' + title, fill=RED, font=F(40, True), stroke_width=4, stroke_fill=WHITE)
        d.text((30, 72), 'Real terrain (SRTM). Map %d x %d px = %.0f x %.0f km (%.1f px per km). Corners: %.3f°N %.3f°E (top left) to %.3f°N %.3f°E (bottom right). %s'
               % (W, H, self.km_w, self.km_h, W / self.km_w, self.lat1, self.lon0, self.lat0, self.lon1, note), fill=BLACK, font=F(21), stroke_width=3, stroke_fill=WHITE)
        km = next(k for k in (200, 100, 50, 20, 10, 5, 2, 1) if W / self.km_w * k < 700); px = W / self.km_w * km
        d.rectangle([W - 70 - px, H - 70, W - 70, H - 56], fill=BLACK); d.rectangle([W - 70 - px, H - 70, W - 70 - px / 2, H - 56], fill=WHITE, outline=BLACK, width=2)
        d.text((W - 70 - px / 2, H - 78), '%d km' % km, fill=BLACK, font=F(26, True), anchor='mb', stroke_width=3, stroke_fill=WHITE)

    def save(self):
        os.makedirs(OUT, exist_ok=True); self.im.save(os.path.join(OUT, self.name), optimize=True)
        meta = dict(file=self.name, width=W, height=H, lat0=self.lat0, lat1=self.lat1, lon0=self.lon0, lon1=self.lon1, km_w=round(self.km_w, 2), km_h=round(self.km_h, 2))
        return meta


# ---------- places (lat, lon) ----------
TALAS_CITY = (42.900, 71.370)      # old Talas/Taraz under modern Taraz (Barthold: the Green Bazaar)
ATLAKH = (42.7153, 71.2644)        # Dzhuantobe hillfort, usually taken as Atlakh (silkadv.com coordinates)
JOON_DOBO = (42.6819, 71.3097)     # Joon-Döbö village: Kyrgyz "Atlakh" memorial site
LIN_TALAS = (42.900, 71.150)       # Lin Meicun: Tang-era Talas city ~18 km west of Taraz (approximate point)
KULAN = (42.920, 72.740)           # Kulan / Julan city (Lugovoy), Jia Dan's stage before Talas
TALAS_KG = (42.520, 72.240)        # modern Talas town, Kyrgyzstan (reference only)
KYZYL_ADYR = (42.620, 71.590)      # modern Kyzyl-Adyr (reference only); the Talas leaves its valley just north of here

metas = []

# ===== 1. The region: Kucha to Merv =====
g = Guide('talas-1-region-guide.png', 35.0, 47.9, 61.0, 84.0, 7, None, None)
g.lakes(os.path.join(CACHE, 'ne_10m_lakes.geojson'))
g.geojson_lines(os.path.join(CACHE, 'ne_rivers.geojson'), WATER, 6)
# Chu and Talas are missing from Natural Earth: drawn from points traced on the elevation data
g.line([(42.05, 76.10), (42.48, 75.60), (42.82, 75.30), (42.90, 74.60), (43.20, 73.80), (43.60, 73.20), (44.10, 72.40), (44.70, 71.30), (45.20, 70.10)], WATER, 6)   # Chu
g.line([(42.40, 72.95), (42.52, 72.24), (42.58, 71.75), (42.66, 71.58), (42.82, 71.45), (42.90, 71.37), (43.15, 71.20), (43.55, 70.90), (44.00, 70.40)], WATER, 6)   # Talas
g.geojson_lines(os.path.join(CACHE, 'ne_10m_admin_0_boundary_lines_land.geojson'), (150, 150, 150), 2)
tang = [(41.72, 82.96), (41.17, 80.26), (41.42, 78.43), (42.08, 77.95), (42.40, 76.70), (42.81, 75.20), (42.92, 74.20), (42.92, 72.74), (42.90, 71.37)]
g.arrow(tang, BLUE); g.text(40.75, 79.60, 'Tang army, 751 (route reconstructed)', BLUE, 24, True)
arab = [(37.66, 62.19), (39.08, 63.57), (39.77, 64.42), (39.65, 66.96), (40.12, 67.84), (41.31, 69.24), (42.30, 69.77), (42.72, 71.26)]
g.arrow(arab, RED); g.text(38.75, 62.55, 'Abbasid army from Khurasan', RED, 24, True, 'lm')
for (lat, lon), s, sub, walled in [((41.72, 82.96), 'Kucha', 'Anxi HQ', True), ((41.17, 80.26), 'Aksu', 'Gumo', False), ((39.47, 75.99), 'Kashgar', 'Shule', False),
                                   ((42.81, 75.20), 'Suyab', '(Ak-Beshim, near Tokmok)', True), (KULAN, 'Kulan', '', False), (TALAS_CITY, 'Talas', '(Taraz)', True),
                                   ((41.31, 69.24), 'Chach', '(Tashkent)', True), ((42.30, 69.77), 'Isfijab', '(Sayram)', False), ((39.65, 66.96), 'Samarkand', '', True),
                                   ((39.77, 64.42), 'Bukhara', '', True), ((37.66, 62.19), 'Merv', 'Abu Muslim', True), ((36.76, 66.90), 'Balkh', '', False),
                                   ((40.85, 71.20), 'Akhsikath', 'Ferghana', False)]:
    g.town(lat, lon, s, sub, size=26, walled=walled, col=BLUE if lon > 74 else RED if lon < 70 else BLACK)
g.text(41.42, 78.43, '▲ Bedel pass', BLACK, 22, True, 'lm')
g.text(42.45, 77.40, 'Issyk-Kul', BLUE, 26, True)
g.text(40.70, 72.30, 'FERGHANA VALLEY', GREY, 26, True)
g.text(46.20, 79.40, 'KARLUK PASTURES (towards Lake Balkhash)', GREY, 26, True)
g.text(39.80, 81.00, 'TAKLAMAKAN DESERT', GREY, 30, True)
g.text(36.40, 79.00, 'TIBETAN EMPIRE', GREY, 30, True)
g.text(43.70, 66.00, 'KYZYLKUM', GREY, 26, True)
g.text(42.60, 80.60, 'TIAN SHAN', GREY, 30, True)
g.frame('TALAS 751, guide 1 of 3: the region (Kucha to Merv)', 'Rivers and lakes from Natural Earth; borders are modern, for reference only.', 2)
metas.append(g.save())

# ===== 2. The approach: Kulan to Atlakh =====
g = Guide('talas-2-valley-guide.png', 42.25, 43.52, 70.60, 72.90, 10, 60, [(60, 2), (600, 6), (3000, 10)])
road = [(42.93, 72.90), KULAN, (42.95, 72.30), (42.95, 71.80), (42.92, 71.55), TALAS_CITY, (42.82, 71.30), ATLAKH, (42.62, 70.95), (42.50, 70.60)]
g.line(road, (120, 70, 30), 5, dash=18)
g.text(42.985, 72.05, 'Silk Road, Kulan to Talas (approximate)', (120, 70, 30), 22, True)
g.arrow([(42.98, 72.90), (42.97, 72.40), (42.95, 71.80), (42.91, 71.48)], BLUE, 'Tang army from Suyab and Kulan', at=.34)
g.arrow([(42.50, 70.60), (42.62, 70.95), (42.70, 71.20)], RED, 'Abbasid army from Chach', at=.5)
g.town(*TALAS_CITY, 'TALAS CITY', '(old Taraz)', 30, walled=True)
g.town(*ATLAKH, 'ATLAKH', '(Dzhuantobe hillfort)', 28, walled=True, dy=34)
g.town(*KULAN, 'KULAN', '(Lugovoy)', 26)
g.town(*TALAS_KG, 'Talas', 'modern town, for reference', 22, GREY, r=7)
g.town(*KYZYL_ADYR, 'Kyzyl-Adyr', 'modern; Kirov reservoir (1975) just north', 20, GREY, r=6, dy=28)
g.text(42.73, 72.15, 'TALAS RIVER', BLUE, 26, True); g.text(42.62, 71.05, 'ASA RIVER', BLUE, 24, True)
g.text(43.08, 72.35, 'KYRGYZ RANGE (western end)', GREY, 30, True)
g.text(42.33, 71.90, 'TALAS ALA-TOO', GREY, 30, True)
g.text(43.35, 71.20, 'STEPPE (toward the Moyynkum sands)', GREY, 26, True)
g.zone([(42.83, 71.10), (42.83, 71.52), (42.62, 71.52), (42.62, 71.10)], 'battle map\n(guide 3)', BLACK)
g.frame('TALAS 751, guide 2 of 3: the approach (Kulan to Atlakh)', 'Rivers traced from the elevation.', .25)
metas.append(g.save())

# ===== 3. The battlefield: Talas city to Atlakh =====
g = Guide('talas-3-battle-guide.png', 42.60, 42.93, 71.00, 71.60, 12, 40, [(80, 3), (700, 6), (5000, 14)], river_from=(42.20, 43.00, 70.90, 73.60, 5200, 1900, 11))
g.line([(42.93, 71.60), (42.915, 71.48), TALAS_CITY, (42.85, 71.32), (42.78, 71.28), ATLAKH, (42.68, 71.16), (42.62, 71.00)], (120, 70, 30), 5, dash=18)
g.text(42.92, 71.53, 'road to Kulan', (120, 70, 30), 22, True); g.text(42.645, 71.06, 'road to Chach', (120, 70, 30), 22, True)
g.town(*TALAS_CITY, 'TALAS CITY', '(old Taraz): walled town, citadel', 30, walled=True, r=16, dy=26)
g.town(*ATLAKH, 'ATLAKH', '(Dzhuantobe hillfort): walled town', 28, walled=True, r=14, dy=36)
g.ring(*LIN_TALAS, 2.5, "Lin Meicun's Talas city?\n(about 18 km W of Taraz)")
g.ring(*JOON_DOBO, 3, 'Joon-Döbö: Kyrgyz claimed site')
g.zone([(42.865, 71.275), (42.865, 71.43), (42.735, 71.43), (42.735, 71.275)], 'BATTLE PLAIN (reconstruction):\nkeep open steppe and fields;\narmies are drawn here', ORANGE)
g.text(42.88, 71.47, 'Talas', BLUE, 26, True); g.text(42.79, 71.19, 'Asa', BLUE, 26, True)
g.text(42.705, 71.50, 'low ridge', GREY, 26, True)
g.frame('TALAS 751, guide 3 of 3: the battlefield, Talas city to Atlakh', 'Rivers from the elevation. Exact site unknown: purple rings are claims, not to be painted.', .05)
metas.append(g.save())

json.dump(metas, open(os.path.join(OUT, 'maps.json'), 'w'), indent=1)
print('done')
