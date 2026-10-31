#!/usr/bin/env python3
"""Draws the three Dunkirk layout guides (images/layout/*.png) from real latitude/longitude points.

    python3 battlesofhistory/dunkirk/tools/draw-layout-guides.py

Each guide is 2400 x 1800 (north up), plain colours with every feature outlined and labelled, for ChatGPT to paint
over (see images/layout/ART-PROMPTS.md). Coastlines and canals are traced from town positions and period maps, so they
are good to about a kilometre on the perimeter map and a few kilometres on the others. Needs Pillow.
"""
import math, os
from PIL import Image, ImageDraw, ImageFont

OUT = os.path.join(os.path.dirname(__file__), '..', 'images', 'layout')
W, H = 2400, 1800
F = lambda s, bold=False: ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf' % ('-Bold' if bold else ''), s)
SEA, LAND, FLOOD, DUNE = (150, 190, 215), (222, 210, 170), (165, 200, 190), (240, 228, 190)
RED, CYAN, YEL, MAG, WHITE, BLACK = (230, 30, 30), (0, 170, 220), (240, 190, 0), (200, 0, 170), (255, 255, 255), (20, 20, 20)


class Map:
    def __init__(self, name, lon0, lon1, lat0, lat1):
        self.name, self.lon0, self.lon1, self.lat0, self.lat1 = name, lon0, lon1, lat0, lat1
        self.im = Image.new('RGB', (W, H), SEA); self.d = ImageDraw.Draw(self.im)
        kx = math.cos(math.radians((lat0 + lat1) / 2)) * 111.32
        self.km_w, self.km_h = (lon1 - lon0) * kx, (lat1 - lat0) * 111.32

    def xy(self, lat, lon):
        return ((lon - self.lon0) / (self.lon1 - self.lon0) * W, (self.lat1 - lat) / (self.lat1 - self.lat0) * H)

    def P(self, pts): return [self.xy(a, b) for a, b in pts]

    def poly(self, pts, fill, outline=None, width=1): self.d.polygon(self.P(pts), fill=fill, outline=outline, width=width)

    def line(self, pts, col, w=6, dash=None):
        q = self.P(pts)
        if not dash: self.d.line(q, fill=col, width=w, joint='curve'); return
        for (x1, y1), (x2, y2) in zip(q, q[1:]):
            L = math.hypot(x2 - x1, y2 - y1); n = max(1, int(L // dash))
            for i in range(0, n, 2):
                t0, t1 = i / n, min(1, (i + 1) / n)
                self.d.line([(x1 + (x2 - x1) * t0, y1 + (y2 - y1) * t0), (x1 + (x2 - x1) * t1, y1 + (y2 - y1) * t1)], fill=col, width=w)

    def text(self, lat, lon, s, col=BLACK, size=26, bold=False, anchor='mm'):
        x, y = self.xy(lat, lon); f = F(size, bold)
        self.d.text((x, y), s, fill=col, font=f, anchor=anchor, stroke_width=3, stroke_fill=WHITE)

    def town(self, lat, lon, s, size=24, dx=0, dy=-26):
        x, y = self.xy(lat, lon); self.d.ellipse([x - 9, y - 9, x + 9, y + 9], fill=BLACK)
        self.d.text((x + dx, y + dy), s, fill=BLACK, font=F(size, True), anchor='mm', stroke_width=3, stroke_fill=WHITE)

    def box(self, lat, lon, w, h, s, col=RED):
        x, y = self.xy(lat, lon); self.d.rectangle([x - w / 2, y - h / 2, x + w / 2, y + h / 2], outline=col, width=4)
        self.d.text((x - w / 2 + 4, y - h / 2 - 6), s, fill=col, font=F(22, True), anchor='ld', stroke_width=3, stroke_fill=WHITE)

    def ellipse(self, lat, lon, rx, ry, s, col=RED):
        x, y = self.xy(lat, lon); self.d.ellipse([x - rx, y - ry, x + rx, y + ry], outline=col, width=4)
        self.d.text((x, y), s, fill=col, font=F(22, True), anchor='mm', stroke_width=3, stroke_fill=WHITE)

    def frame(self, title, note):
        d = self.d
        d.text((30, 26), 'N ↑  ' + title, fill=RED, font=F(40, True), stroke_width=3, stroke_fill=WHITE)
        d.text((30, 76), 'map %d x %d px = about %.0f x %.0f km (%.0f px per km). Paint at 2x = %d x %d. %s' % (W, H, self.km_w, self.km_h, W / self.km_w, W * 2, H * 2, note),
               fill=BLACK, font=F(22), stroke_width=3, stroke_fill=WHITE)
        # scale bar: 10 km or 1 km
        km = 10 if self.km_w > 80 else 5 if self.km_w > 30 else 1; px = W / self.km_w * km
        d.rectangle([W - 60 - px, H - 60, W - 60, H - 48], fill=BLACK); d.text((W - 60 - px / 2, H - 70), '%d km' % km, fill=BLACK, font=F(24, True), anchor='mb', stroke_width=3, stroke_fill=WHITE)

    def save(self): os.makedirs(OUT, exist_ok=True); self.im.save(os.path.join(OUT, self.name)); print(self.name, '%.0f x %.0f km' % (self.km_w, self.km_h))


# ---------- shared geography (lat, lon) ----------
FR_COAST = [(50.40, 1.56), (50.52, 1.58), (50.64, 1.57), (50.725, 1.595), (50.77, 1.61), (50.87, 1.585), (50.885, 1.66), (50.93, 1.72), (50.945, 1.75),
            (50.965, 1.85), (50.985, 1.97), (51.005, 2.08), (51.012, 2.12), (51.025, 2.20), (51.035, 2.27), (51.045, 2.33), (51.053, 2.37), (51.058, 2.40),
            (51.067, 2.45), (51.080, 2.49), (51.090, 2.53), (51.103, 2.585), (51.118, 2.64), (51.132, 2.69), (51.150, 2.725), (51.175, 2.78), (51.23, 2.92),
            (51.29, 3.07), (51.335, 3.20), (51.36, 3.30), (51.38, 3.37), (51.42, 3.50), (51.46, 3.60), (51.50, 3.70)]
EN_COAST = [(51.00, 0.98), (51.06, 1.12), (51.08, 1.18), (51.105, 1.27), (51.12, 1.32), (51.135, 1.36), (51.155, 1.385), (51.20, 1.405), (51.22, 1.40),
            (51.26, 1.39), (51.29, 1.37), (51.31, 1.38), (51.33, 1.42), (51.36, 1.445), (51.385, 1.42), (51.39, 1.38), (51.385, 1.30), (51.375, 1.20),
            (51.37, 1.13), (51.36, 1.00), (51.40, 0.90), (51.45, 0.85), (51.50, 0.80)]
TOWNS_FR = {'Boulogne': (50.725, 1.61), 'Calais': (50.955, 1.86), 'Gravelines': (50.987, 2.128), 'Dunkirk': (51.035, 2.375), 'Bergues': (50.968, 2.434),
            'Nieuport': (51.13, 2.75), 'Furnes': (51.073, 2.663), 'Ostend': (51.215, 2.925)}


def coast_land(m, coast, corner_pts):
    m.poly(coast + corner_pts, LAND)
    m.line(coast, (90, 110, 120), 3)


# ======================================================================================== 1. The trap (campaign map)
def map_campaign():
    m = Map('dunkirk-1-campaign-guide.png', 1.45, 4.05, 50.20, 51.48)
    coast_land(m, [(50.20, 1.57)] + FR_COAST, [(51.50, 4.05), (50.20, 4.05)])
    m.poly([(51.50, 3.62), (51.43, 3.60), (51.40, 3.80), (51.37, 4.05), (51.50, 4.05)], SEA)          # Scheldt mouth (approx.)
    # rivers and canal lines the armies used
    aa = [(51.005, 2.115), (50.94, 2.16), (50.86, 2.20), (50.75, 2.25), (50.67, 2.33), (50.63, 2.43), (50.60, 2.55)]           # Aa canal / La Bassée line
    lys = [(50.60, 2.30), (50.64, 2.55), (50.67, 2.75), (50.69, 2.88), (50.73, 3.05), (50.80, 3.25), (50.90, 3.42), (51.05, 3.72)]
    yser = [(51.15, 2.73), (51.06, 2.78), (50.95, 2.83), (50.88, 2.88), (50.81, 2.85)]
    scheldt = [(50.30, 3.30), (50.48, 3.40), (50.60, 3.39), (50.75, 3.48), (50.88, 3.60), (51.05, 3.72), (51.20, 4.10)]
    for r, s in [(aa, 'AA CANAL (German halt line, 24 May)'), (lys, 'River LYS'), (yser, 'YSER'), (scheldt, 'SCHELDT (Escaut)')]: m.line(r, CYAN, 7)
    m.text(50.80, 2.08, 'AA CANAL', CYAN, 26, True); m.text(50.68, 3.05, 'LYS', CYAN, 26, True); m.text(50.98, 2.92, 'YSER', CYAN, 26, True); m.text(50.52, 3.52, 'SCHELDT', CYAN, 26, True)
    # roads of the retreat
    for r in [[(50.63, 3.06), (50.69, 2.88), (50.85, 2.725), (51.073, 2.663)], [(50.63, 3.06), (50.725, 2.54), (50.80, 2.485), (50.968, 2.434), (51.035, 2.375)],
              [(50.29, 2.78), (50.63, 3.06)], [(50.85, 2.885), (50.85, 2.725)]]:
        m.line(r, YEL, 6)
    towns = {**TOWNS_FR, 'Lille': (50.63, 3.06), 'Arras': (50.29, 2.78), 'Ypres': (50.85, 2.885), 'Cassel': (50.80, 2.485), 'Hazebrouck': (50.725, 2.54),
             'Armentières': (50.69, 2.88), 'Poperinge': (50.855, 2.725), 'Saint-Omer': (50.75, 2.25), 'Bruges': (51.21, 3.22), 'Ghent': (51.05, 3.72),
             'Béthune': (50.53, 2.64), 'Tournai': (50.605, 3.39), 'Courtrai': (50.83, 3.265), 'Zeebrugge': (51.33, 3.20), 'Wormhout': (50.88, 2.47)}
    for k, v in towns.items(): m.town(*v, k, 24)
    # the corridor (Allied pocket about 26-28 May), approximate
    corridor = [(51.13, 2.72), (51.05, 2.78), (50.92, 2.95), (50.82, 3.05), (50.70, 3.20), (50.56, 3.15), (50.52, 2.98), (50.60, 2.70), (50.70, 2.52),
                (50.80, 2.42), (50.92, 2.30), (51.00, 2.17), (51.03, 2.26)]
    m.line(corridor + [corridor[0]], MAG, 6, dash=26)
    m.text(50.72, 2.80, 'ALLIED POCKET', MAG, 30, True); m.text(50.685, 2.80, '(about 26–28 May, shrinking north)', MAG, 22)
    m.box(51.12, 3.00, 330, 120, 'BELGIAN ARMY (surrenders 28 May)'); m.box(50.47, 3.12, 260, 110, 'FRENCH 1st ARMY (Lille)')
    m.box(50.62, 2.03, 300, 120, 'PANZER DIVISIONS (west)'); m.box(50.70, 3.70, 300, 120, 'ARMY GROUP B (east)')
    m.text(50.32, 1.95, '← to the Somme and Abbeville: the coast reached 20 May', BLACK, 24)
    m.frame('DUNKIRK 1: THE TRAP (campaign map, 20–28 May 1940)', 'Places true to life; pocket and army boxes approximate.')
    m.save()


# ======================================================================================== 2. The perimeter and the beaches
def map_perimeter():
    m = Map('dunkirk-2-perimeter-guide.png', 2.06, 2.82, 50.90, 51.245)
    # dunes strip just behind the coast, then land
    coast_land(m, FR_COAST, [(50.90, 2.82), (50.90, 2.06), (51.00, 2.06)])
    dune = [(lat - .006, lon) for lat, lon in FR_COAST if 2.06 <= lon <= 2.82]
    m.poly([p for p in FR_COAST if 2.06 <= p[1] <= 2.82] + dune[::-1], DUNE)
    # flooded fields (inundations opened by the French) south of the Dunkirk-Furnes canal, around Les Moëres
    m.poly([(51.035, 2.47), (51.045, 2.56), (51.03, 2.63), (51.00, 2.62), (50.99, 2.55), (51.005, 2.48)], FLOOD, outline=CYAN, width=3)
    m.text(51.018, 2.55, 'FLOODED FIELDS', (0, 110, 150), 24, True); m.text(51.005, 2.55, '(Les Moëres inundations)', (0, 110, 150), 20)
    # canals (cyan)
    canals = {
        'MARDYCK CANAL': [(51.035, 2.265), (51.00, 2.285), (50.975, 2.31)],
        'CANAL DE LA (HAUTE) COLME': [(50.975, 2.31), (50.972, 2.37), (50.968, 2.434)],
        'BERGUES–FURNES CANAL (Basse Colme)': [(50.968, 2.434), (50.975, 2.50), (50.983, 2.585), (51.02, 2.625), (51.073, 2.663)],
        'FURNES–NIEUPORT CANAL': [(51.073, 2.663), (51.10, 2.70), (51.13, 2.745)],
        'DUNKIRK–FURNES CANAL': [(51.03, 2.39), (51.045, 2.47), (51.058, 2.55), (51.066, 2.61), (51.073, 2.663)],
        'BERGUES–DUNKIRK CANAL': [(50.968, 2.434), (51.00, 2.41), (51.03, 2.385)],
        'AA (Gravelines)': [(51.005, 2.118), (50.96, 2.14), (50.92, 2.16)],
        'BOURBOURG CANAL': [(50.946, 2.196), (50.96, 2.26), (50.975, 2.31)],
    }
    for k, pts in canals.items(): m.line(pts, CYAN, 7)
    # the perimeter (magenta): French west of Bergues, British Bergues to Nieuport (about 29 May)
    m.line(canals['MARDYCK CANAL'] + canals['CANAL DE LA (HAUTE) COLME'][1:], MAG, 4, dash=20)
    m.line(canals['BERGUES–FURNES CANAL (Basse Colme)'] + canals['FURNES–NIEUPORT CANAL'][1:], MAG, 4, dash=20)
    m.text(50.955, 2.30, 'PERIMETER: FRENCH SECTOR', MAG, 24, True); m.text(50.952, 2.55, 'PERIMETER: BRITISH SECTOR (Bergues–Furnes–Nieuport)', MAG, 24, True)
    m.text(51.000, 2.275, 'Mardyck canal', (0, 110, 150), 20); m.text(50.985, 2.36, 'Canal de la Colme', (0, 110, 150), 20)
    m.text(50.995, 2.60, 'Bergues–Furnes canal', (0, 110, 150), 20); m.text(51.052, 2.43, 'Dunkirk–Furnes canal', (0, 110, 150), 20)
    # roads (yellow)
    for r in [[(51.035, 2.375), (50.968, 2.434), (50.90, 2.45)], [(51.035, 2.375), (51.06, 2.50), (51.085, 2.56), (51.10, 2.59), (51.12, 2.66), (51.13, 2.75)],
              [(50.968, 2.434), (50.983, 2.585), (50.95, 2.70)], [(51.073, 2.663), (51.00, 2.75), (50.93, 2.80)], [(51.035, 2.375), (51.00, 2.25), (50.987, 2.128)]]:
        m.line(r, YEL, 6)
    for k, v in {**TOWNS_FR, 'Malo-les-Bains': (51.053, 2.405), 'Zuydcoote': (51.064, 2.49), 'Bray-Dunes': (51.077, 2.525), 'La Panne (De Panne)': (51.097, 2.59),
                 'Adinkerke': (51.075, 2.60), 'Ghyvelde': (51.052, 2.53), 'Hondschoote': (50.983, 2.585), 'Spycker': (50.97, 2.32), 'Mardyck': (51.025, 2.255),
                 'Bourbourg': (50.946, 2.196), 'Teteghem': (51.02, 2.44), 'Uxem': (51.02, 2.49), 'Koksijde': (51.11, 2.64)}.items():
        if 2.06 <= v[1] <= 2.82: m.town(*v, k, 22)
    # harbour, mole, beaches, anchorage (red boxes)
    m.line([(51.054, 2.383), (51.066, 2.372)], RED, 9); m.text(51.078, 2.335, 'EAST MOLE (about 1.3 km)', RED, 22, True)
    m.line([(51.050, 2.355), (51.062, 2.352)], (120, 120, 120), 8)
    m.box(51.045, 2.345, 110, 50, 'HARBOUR'); m.box(51.020, 2.32, 150, 60, 'OIL TANKS BURNING')
    for (lat, lon, w, s) in [(51.066, 2.43, 240, 'MALO BEACH'), (51.090, 2.515, 240, 'BRAY-DUNES BEACH'), (51.112, 2.595, 220, 'LA PANNE BEACH')]: m.box(lat, lon, w, 50, s)
    m.box(51.097, 2.555, 60, 40, 'JETTY'); m.box(51.121, 2.635, 60, 40, 'JETTY')
    m.box(51.165, 2.42, 900, 120, 'SHIPS OFFSHORE: destroyers, minesweepers, paddle steamers, little ships; whalers and boats ferrying to the beach')
    m.text(51.100, 2.42, 'Zuydcoote Pass (channel along the coast)', (0, 80, 120), 22)
    m.box(51.072, 2.475, 60, 30, 'HOSPITAL')
    m.box(51.026, 2.392, 50, 30, 'BASTION 32')
    m.ellipse(51.095, 2.20, 120, 50, 'GUN RANGE FROM GRAVELINES/MARDYCK')
    m.text(51.20, 2.30, 'to Dover ↑ (routes X, Y, Z: see map 3)', BLACK, 24)
    m.frame('DUNKIRK 2: THE PERIMETER AND THE BEACHES (27 May – 4 June 1940)', 'Canal line from the official dispatch.')
    m.save()


# ======================================================================================== 3. The Channel crossing
def map_channel():
    m = Map('dunkirk-3-channel-guide.png', 0.95, 3.05, 50.72, 51.60)
    m.poly(FR_COAST + [(51.50, 3.05), (50.72, 3.05), (50.72, 0.95), (50.40, 0.95)], LAND); m.line(FR_COAST, (90, 110, 120), 3)
    m.poly(EN_COAST + [(51.60, 0.80), (51.60, 0.95), (50.95, 0.95)], LAND); m.line(EN_COAST, (90, 110, 120), 3)
    # sandbanks (approximate)
    for lat, lon, rx, ry, s in [(51.25, 1.55, 40, 150, 'GOODWIN SANDS'), (51.13, 2.18, 120, 40, 'RUYTINGEN'), (51.07, 1.85, 140, 35, 'DYCK'), (51.21, 2.62, 110, 35, 'KWINTE BANK')]:
        m.ellipse(lat, lon, rx, ry, s, (150, 120, 40))
    D = (51.065, 2.37); DOVER = (51.115, 1.33)
    routes = {
        'ROUTE Z (39 sea miles; under Calais guns, night only)': ([D, (51.04, 2.20), (51.03, 2.05), (51.02, 1.88), (51.03, 1.70), (51.07, 1.52), DOVER], RED),
        'ROUTE X (55 sea miles; mined)': ([D, (51.11, 2.30), (51.20, 2.15), (51.30, 1.90), (51.35, 1.65), (51.33, 1.58), (51.24, 1.46), DOVER], (230, 120, 0)),
        'ROUTE Y (87 sea miles; longest, open to air attack)': ([D, (51.10, 2.48), (51.17, 2.60), (51.22, 2.63), (51.33, 2.45), (51.42, 2.10), (51.42, 1.75), (51.33, 1.58), (51.24, 1.46), DOVER], (0, 140, 60)),
    }
    for i, (k, (pts, col)) in enumerate(routes.items()):
        m.line(pts, col, 6, dash=24); m.d.text((40, 1560 + i * 40), '- - -  ' + k, fill=col, font=F(28, True), stroke_width=3, stroke_fill=WHITE)
    m.text(51.235, 2.66, 'Kwinte Buoy', (0, 140, 60), 22, True); m.text(51.365, 1.62, 'North Goodwin', BLACK, 22, True); m.text(51.215, 1.47, 'The Downs', BLACK, 22, True)
    for k, v in {'Dover': (51.125, 1.31), 'Ramsgate': (51.335, 1.42), 'Margate': (51.39, 1.38), 'Deal': (51.22, 1.40), 'Folkestone': (51.08, 1.17),
                 '← Sheerness': (51.44, 1.05), 'Calais': (50.955, 1.86), 'Gravelines': (50.987, 2.128), 'Dunkirk': (51.035, 2.375), 'La Panne': (51.10, 2.59),
                 'Nieuport': (51.13, 2.75), 'Ostend': (51.215, 2.925), 'Boulogne': (50.725, 1.61)}.items():
        m.town(*v, k, 24)
    m.box(50.98, 1.86, 220, 70, 'GERMAN GUNS (Calais)'); m.box(51.40, 2.65, 380, 90, 'LUFTWAFFE APPROACH (from the south-east)')
    m.box(51.15, 1.34, 160, 60, 'DOVER HARBOUR'); m.box(51.04, 2.37, 130, 60, 'DUNKIRK')
    m.text(51.28, 1.13, 'ENGLAND', BLACK, 44, True); m.text(50.80, 2.40, 'FRANCE', BLACK, 44, True); m.text(51.45, 2.95, 'BELGIUM →', BLACK, 30, True)
    m.frame('DUNKIRK 3: THE CROSSING (routes X, Y, Z, 26 May – 4 June 1940)', 'Routes and sandbanks approximate.')
    m.save()


if __name__ == '__main__':
    map_campaign(); map_perimeter(); map_channel()
