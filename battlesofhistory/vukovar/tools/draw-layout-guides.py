#!/usr/bin/env python3
"""Vukovar 1991: the AREA map (Vinkovci to the Danube, Trpinja to Negoslavci) and the TOWN map (Borovo Naselje to
Vučedol), from REAL elevation (AWS terrain tiles), with the same tools as the Vimy, Six-Day War and Tyre maps.
    python3 battlesofhistory/vukovar/tools/draw-layout-guides.py
Outputs to vukovar/images/layout/:
  area-base.png, town-base.png    terrain and water only: for ChatGPT to paint over
  area-guide.png, town-guide.png  the same with places, the 1991 built-up areas and the CIA front lines, for checking
  maps.json                       the frames' corners (the engine lays the paintings by these)
Water: the Danube is the lowest ground touching the edge; the Vuka and the Bosut are the cheapest path down their valley
floors between points we give (their source is outside the map). Built-up areas of 1991: the grey town shading on the
CIA's map 2 (tools/trace-cia-map.py georeferences it). Front lines: research/cia-lines.geojson.
Places: research/OUTLINE.md, RESEARCH-CHATGPT-FOLLOWUP.md; 'approx.' = read off the CIA map or a modern map, to check."""
import os, sys, json, math
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi
from skimage.graph import route_through_array
from pyproj import Transformer
HERE = os.path.dirname(os.path.abspath(__file__)); R = os.path.join(HERE, '..', 'research')
SIX = os.path.join(HERE, '..', '..', 'sixday', 'tools', 'draw-layout-guides.py')
src = open(SIX).read().split('want = sys.argv')[0]
NS = {'__file__': SIX, '__name__': 'vukovar'}; exec(compile(src, 'sixday-dlg', 'exec'), NS)
G, Guide = NS['G'], NS['Guide']
RED, BLUE, BLACK, GREY, WATER, WHITE, F = (NS[k] for k in ('RED', 'BLUE', 'BLACK', 'GREY', 'WATER', 'WHITE', 'F'))
W, H = G['W'], G['H']
OUT = os.path.join(HERE, '..', 'images', 'layout'); os.makedirs(OUT, exist_ok=True)
G['OUT'] = OUT; NS['OUT'] = OUT
GOLD, PURPLE, ORANGE, BROWN, GREEN = (190, 140, 20), (140, 40, 160), (225, 110, 0), (120, 80, 40), (30, 120, 50)
RAMP = [(70, (150, 172, 118)), (78, (160, 178, 122)), (84, (176, 184, 128)), (92, (192, 190, 138)), (100, (202, 194, 144)), (110, (208, 196, 148))]

# ---- the CIA map's georeference (same numbers as trace-cia-map.py) and its built-up areas
exec(open(os.path.join(HERE, 'trace-cia-map.py')).read().split('# ---- 2. colour masks')[0].split('# ---- 1. georeference')[1])
CIA = np.asarray(Image.open(os.path.join(R, 'loc-map2-battle-of-vukovar.jpg')).convert('RGB')).astype(int)
def builtup_mask():
    r, g, b = CIA[..., 0], CIA[..., 1], CIA[..., 2]; gr = (r + g + b) / 3; sat = CIA.max(2) - CIA.min(2)
    m = (sat < 22) & (gr > 150) & (gr < 212); m[:188] = 0; m[1357:] = 0; m[:, :188] = 0; m[:, 1819:] = 0
    m = ndi.binary_opening(m, iterations=4); m = ndi.binary_closing(m, iterations=3)
    lab, n = ndi.label(m); sz = ndi.sum(m, lab, range(1, n + 1)); keep = np.zeros(n + 1, bool); keep[1:] = sz > 400
    return ndi.binary_fill_holes(keep[lab])
BUILT = builtup_mask()
def shade_builtup(g, col=(120, 110, 110), a=.45):
    """Paint the CIA's 1991 built-up areas onto the guide (sampled through the georeference)."""
    yy, xx = np.mgrid[0:H, 0:W]
    lon = g.lon0 + (xx + .5) / W * (g.lon1 - g.lon0); lat = g.lat1 - (yy + .5) / H * (g.lat1 - g.lat0)
    E, N = tou.transform(lon.ravel(), lat.ravel()); E = np.asarray(E).reshape(H, W); N = np.asarray(N).reshape(H, W)
    dv = av + sv * (E - 326000) / 1000; dh = ah - sh * (N - 5030000) / 1000
    A = np.array([[np.cos(TV), np.sin(TV)], [np.cos(TH), np.sin(TH)]]); Ai = np.linalg.inv(A)
    px = Ai[0, 0] * dv + Ai[0, 1] * dh + X0; py = Ai[1, 0] * dv + Ai[1, 1] * dh + Y0
    ok = (px >= 0) & (py >= 0) & (px < CIA.shape[1]) & (py < CIA.shape[0])
    m = np.zeros((H, W), bool); m[ok] = BUILT[py[ok].astype(int), px[ok].astype(int)]
    arr = np.asarray(g.im).astype(float); arr[m] = arr[m] * (1 - a) + np.array(col) * a
    g.im = Image.fromarray(arr.astype('uint8')); g.d = ImageDraw.Draw(g.im)
    covered = ok.mean()
    return covered

# ---- water
def water(g, danube_below, rivers, half_width):
    """Danube: ground below `danube_below` m joined to the map edge (largest piece). Rivers: cheapest path along the
    valley floor through the given (lat, lon) points, drawn about 2 x half_width px wide."""
    e = ndi.gaussian_filter(g.e, 1)
    low = e < danube_below; lab, n = ndi.label(low)
    edge = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    sizes = {i: (lab == i).sum() for i in edge}
    big = [i for i, s in sizes.items() if s > .01 * W * H]
    w = np.isin(lab, big); w = ndi.binary_opening(w, iterations=2)
    c = np.exp((e - e.min()) / 1.5)
    mx, my = g.xy(*VUKA_MOUTH); yy, xx = np.ogrid[:H, :W]; near = (xx - mx) ** 2 + (yy - my) ** 2 < (W / g.km_w * .25) ** 2
    c[ndi.binary_dilation(w, iterations=max(3, int(W / g.km_w * .08))) & ~near] = 1e6   # rivers may not run along the Danube; they join it at their mouth
    rw = np.zeros(e.shape, bool)
    for pts in rivers:
        P = []
        for p in pts:
            if p[0] == 'W':   # the lowest point on the west edge between two latitudes
                ya, yb = sorted(int(g.xy(la, g.lon0)[1]) for la in p[1:]); P.append((ya + int(np.argmin(e[ya:yb, 0])), 0)); continue
            if p[0] == 'S':   # the lowest point on the south edge between two longitudes
                xa, xb = sorted(int(g.xy(g.lat0, lo)[0]) for lo in p[1:]); P.append((H - 1, xa + int(np.argmin(e[-1, xa:xb])))); continue
            x, y = g.xy(*p); P.append((min(max(int(y), 0), H - 1), min(max(int(x), 0), W - 1)))
        for a, b in zip(P, P[1:]):
            path, _ = route_through_array(c, a, b, fully_connected=True, geometric=True)
            for y, x in path: rw[y, x] = True
    rw = ndi.binary_dilation(rw, iterations=half_width)
    rgb = g.rgb.copy(); rgb[w | rw] = WATER
    g.im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); g.d = ImageDraw.Draw(g.im)
    g.im.save(os.path.join(OUT, g.name.replace('-guide.png', '-base.png')), optimize=True)

# ---- front lines from the CIA map
LINES = json.load(open(os.path.join(R, 'cia-lines.geojson')))['features']
STYLE = {'14 September 1991': ((60, 60, 60), None), '30 September 1991': (PURPLE, 18), '10 November 1991': (ORANGE, 10)}
def front_lines(g, w):
    for f in LINES:
        if f['properties']['kind'] != 'front line': continue
        col, dash = STYLE[f['properties']['date']]
        g.line([(la, lo) for lo, la in f['geometry']['coordinates']], col, w, dash=dash)
def legend(g, x, y, size=22):
    for i, (k, (col, dash)) in enumerate(STYLE.items()):
        yy = y + i * (size + 12)
        if dash:
            for s in range(0, 70, dash * 2): g.d.line([x + s, yy, x + min(s + dash, 70), yy], fill=col, width=6)
        else: g.d.line([x, yy, x + 70, yy], fill=col, width=6)
        g.d.text((x + 82, yy - size // 2 - 2), 'front line, ' + k + ' (CIA)', fill=BLACK, font=F(size), stroke_width=3, stroke_fill=WHITE)
    yy = y + 3 * (size + 12); g.d.rectangle([x, yy - 9, x + 70, yy + 9], fill=(170, 160, 160))
    g.d.text((x + 82, yy - size // 2 - 2), 'built-up area, 1991 (CIA map)', fill=BLACK, font=F(size), stroke_width=3, stroke_fill=WHITE)

# ---- places (lat, lon)
TOWER = (45.34404, 19.01228)        # water tower (Commons object coordinate; matches Street View)
HOSPITAL = (45.35772, 18.99323)     # Vukovar hospital, Županijska 35 (building footprint)
BARRACKS = (45.33805, 19.00468)     # JNA barracks: today's Homeland War Memorial Centre (OSM node; the 1991 compound is larger)
VELEPROMET = (45.3328, 19.0022)     # approx. (Wikipedia; not yet checked against a site plan)
LUZAC = (45.36017, 18.97030)        # OSM place=suburb
MILOVO = (45.34983, 18.99202)       # OSM place=neighbourhood
MITNICA = (45.33866, 19.01689)      # OSM label
SAJMISTE = (45.33961, 19.00185)     # OSM label
BOROVO_N = (45.37847, 18.95992)     # Borovo Naselje (OSM label)
VUKA_MOUTH = (45.3518, 19.0030)     # the Vuka joins the Danube (approx., by the White Cross memorial)
VUKA_TOWN = (45.3500, 18.9880)      # the Vuka in town, between Olajnica and Ul. Ivana Gorana Kovačića (modern map)
OVCARA_HANGAR = (45.29691, 19.04603); OVCARA_GRAVE = (45.29568, 19.05894)
NEGOSLAVCI = (45.27823, 18.99726); BOGDANOVCI = (45.33780, 18.93002); MARINCI = (45.33823, 18.89757)
VINKOVCI = (45.2880, 18.8050); NUSTAR = (45.3320, 18.8420); BRSADIN = (45.3560, 18.9050)       # approx.
TRPINJA = (45.4197, 18.8986); BOROVO = (45.4010, 18.9680); LIPOVACA = (45.3830, 18.9100)        # approx.
PACETIN = (45.3720, 18.8540); TORDINCI = (45.3700, 18.8000); CERIC = (45.3120, 18.8610)        # approx.
MIRKOVCI = (45.2700, 18.8500); PETROVCI = (45.2860, 18.9520); VUCEDOL = (45.3370, 19.0450)      # approx.
SOTIN = (45.2990, 19.1050); GRABOVO = (45.3010, 19.0400)                                         # approx.

def frame43(lat_top, lat_bot, lon_west):
    km_h = (lat_top - lat_bot) * 111.32; km_w = km_h * W / H
    return lat_bot, lat_top, lon_west, lon_west + km_w / (111.32 * math.cos(math.radians((lat_top + lat_bot) / 2)))

metas = []
# ================= 1. the area: Vinkovci to the Danube =================
G['RAMP'][:] = RAMP
LA0, LA1, LO0, LO1 = frame43(45.432, 45.247, 18.770)
g = Guide('area-guide.png', LA0, LA1, LO0, LO1, 13, None, None)
water(g, 74.5, [[('W', 45.33, 45.37), VUKA_TOWN, VUKA_MOUTH],          # Vuka
                 [('W', 45.28, 45.31), VINKOVCI, ('S', 18.80, 18.86)]], 2)   # Bosut
shade_builtup(g)
front_lines(g, 5)
g.text(45.348, 18.870, 'Vuka', BLUE, 26, True); g.text(45.262, 18.800, 'Bosut', BLUE, 24, True)
g.text(45.395, 19.050, 'DANUBE', BLUE, 34, True); g.text(45.380, 19.095, 'SERBIA', GREY, 30, True); g.text(45.405, 18.820, 'CROATIA', GREY, 30, True)
g.town(*VINKOVCI, 'Vinkovci', 'Croatian base for the relief', 30, BLUE, 12, -34)
g.town(*NUSTAR, 'Nuštar', '', 26, BLUE, 9, -26); g.town(*MARINCI, 'Marinci', 'road cut 1 Oct', 24, BLACK, 8, -26)
g.town(*BOGDANOVCI, 'Bogdanovci', 'fell 10 Nov', 26, BLACK, 9, 28)
g.text(45.3400, 19.0050, 'VUKOVAR', BLACK, 36, True)
g.town(*BOROVO_N, 'Borovo Naselje', '', 24, BLACK, 8, -26)
g.town(*BOROVO, 'Borovo Selo', '2 May 1991', 22, GREY, 7, -24)
g.town(*TRPINJA, 'Trpinja', '', 22, GREY, 7, -24); g.town(*LIPOVACA, 'Lipovača', '', 20, GREY, 6, 22)
g.town(*BRSADIN, 'Bršadin', '', 20, GREY, 6, 22); g.town(*PACETIN, 'Pačetin', '', 20, GREY, 6, -22)
g.town(*TORDINCI, 'Tordinci', '', 20, GREY, 6, -22); g.town(*CERIC, 'Ćerić', '', 20, GREY, 6, 22)
g.town(*MIRKOVCI, 'Mirkovci', 'road to Šid', 20, GREY, 6, 22); g.town(*PETROVCI, 'Petrovci', '', 20, GREY, 6, 22)
g.town(*NEGOSLAVCI, 'Negoslavci', 'JNA OG South HQ', 24, RED, 9, 28)
g.town(*OVCARA_GRAVE, 'Ovčara', '', 22, GREY, 7, 24); g.town(*SOTIN, 'Sotin', '', 20, GREY, 6, 22)
legend(g, 1450, 1150)
g.frame('VUKOVAR AND ITS SURROUNDINGS, 1991: layout guide (area map)', 'Real elevation; water from the elevation; 1991 built-up areas and front lines from the CIA map (Balkan Battlegrounds, map 2). Villages approx.', .05)
metas.append(g.save())

# ================= 2. the town: Borovo Naselje to Vučedol =================
G['RAMP'][:] = RAMP
LA0, LA1, LO0, LO1 = frame43(45.398, 45.320, 18.932)
g = Guide('town-guide.png', LA0, LA1, LO0, LO1, 15, None, None)
water(g, 74.5, [[('W', 45.33, 45.37), VUKA_TOWN, VUKA_MOUTH]], 3)
shade_builtup(g)
front_lines(g, 6)
g.text(45.3478, 18.962, 'Vuka', BLUE, 28, True); g.text(45.372, 19.020, 'DANUBE', BLUE, 40, True); g.text(45.386, 19.055, 'SERBIA', GREY, 32, True)
g.town(*TOWER, 'Water tower', '', 28, BLACK, 11, -34, walled=True)
g.town(*HOSPITAL, 'Hospital', '', 28, BLACK, 11, -34, walled=True)
g.town(*BARRACKS, 'JNA barracks', '(today the memorial centre)', 26, RED, 11, 34, walled=True)
g.town(*VELEPROMET, 'Velepromet', '(approx.)', 22, GREY, 8, 30)
g.town(*LUZAC, 'Lužac', '', 24, BLACK, 8, -26); g.town(*MILOVO, 'Milovo brdo', '', 22, BLACK, 7, -24)
g.town(*MITNICA, 'MITNICA', '', 26, BLACK, 8, 30); g.town(*SAJMISTE, 'Sajmište', '', 22, GREY, 7, -24)
g.town(*BOROVO_N, 'BOROVO NASELJE', '', 30, BLACK, 10, -36)
g.town(*VUCEDOL, 'Vučedol', '', 22, GREY, 7, 26)
g.town(45.3460, 19.0050, 'VUKOVAR', 'town centre', 34, BLACK, 0, -60)
g.text(45.3240, 19.0080, 'Sajmište road to Negoslavci', GREY, 22, True)
legend(g, 40, 1600)
g.frame('VUKOVAR, 1991: layout guide (town map)', 'Real elevation; water from the elevation; 1991 built-up areas and front lines from the CIA map. Places: OpenStreetMap points, some approx.', .01)
metas.append(g.save())

json.dump(metas, open(os.path.join(OUT, 'maps.json'), 'w'), indent=1)
for m in metas: print(m)
