#!/usr/bin/env python3
"""Granicus and Issus: base maps (to repaint) and layout guides for ChatGPT, from REAL elevation (AWS terrain tiles), with
the same Guide class as the Six-Day War and Vukovar maps.
    python3 battlesofhistory/granicus-issus/tools/draw-layout-guides.py [campaign granicus issus]
Writes granicus-issus/images/layout/<map>-base.png, <map>-guide.png and maps.json (the frames' corners).
  campaign  the march of 334-333 BC: the Hellespont to Issus, Sardis to Gordium (about 1,180 x 890 km)
  granicus  the Biga Cayi north of Biga, the conventional site of the battle (8 x 6 km). Disputed: Korpe (2024) argues for
            a site farther south; the river's course has moved since antiquity
  issus     the coastal strip at the Payas river, the most often proposed Pinarus, between the Amanus mountains and the
            Gulf of Iskenderun (12 x 9 km). Disputed: Kuru Cay and Deli Cay to the north are the other candidates
Sea = ground at or below sea level touching the edge; rivers on the battle maps = the cheapest path down the valley floor
between the points given (approximate, from the elevation; not survey lines). Places: research/RESEARCH-CHATGPT-1.md
part C and modern maps; 'approx.' where marked."""
import os, sys, json, math, tempfile
HERE = os.path.dirname(os.path.abspath(__file__))
SD = os.path.join(HERE, '..', '..', 'sixday', 'tools', 'draw-layout-guides.py')
src = open(SD).read().split('want = sys.argv')[0]
NS = {'__file__': SD, '__name__': 'granicus-issus'}; exec(compile(src, 'sixday-dlg', 'exec'), NS)
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi
from skimage.graph import route_through_array
G, Guide, RED, BLUE, BLACK, GREY, WATER, WHITE, CACHE, clean = (NS[k] for k in ('G', 'Guide', 'RED', 'BLUE', 'BLACK', 'GREY', 'WATER', 'WHITE', 'CACHE', 'clean'))
OUT = os.path.join(HERE, '..', 'images', 'layout'); os.makedirs(OUT, exist_ok=True); G['OUT'] = OUT; NS['OUT'] = OUT
W, H = 2400, 1800
def frame43(lat_c, lon_c, km_w):
    km_h = km_w * 3 / 4; dla = km_h / 111.32; dlo = km_w / (111.32 * math.cos(math.radians(lat_c)))
    return lat_c - dla / 2, lat_c + dla / 2, lon_c - dlo / 2, lon_c + dlo / 2
def sea_mask(g):
    low = g.e <= .5; lab, n = ndi.label(low); edge = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    return np.isin(lab, list(edge))
def river(g, pts, sea, half):
    """Cheapest path along the valley floor through pts: (lat, lon), or ('E'|'W'|'N'|'S', a, b) = the lowest point on that
    edge between two latitudes (E/W) or longitudes (N/S), or 'SEA' = the nearest sea pixel to the previous point."""
    e = ndi.gaussian_filter(g.e.astype(float), 1.5); c = 1 + ((e - e.min()) / 4.0) ** 2; h, w = e.shape; P = []   # bounded cost: low ground cheap, slopes dear (an exponential overflowed on the Amanus)
    for p in pts:
        if p == 'SEA':
            y0, x0 = P[-1]; ys, xs = np.nonzero(sea); k = np.argmin((ys - y0) ** 2 + (xs - x0) ** 2); P.append((int(ys[k]), int(xs[k]))); continue
        if isinstance(p[0], str):
            s, a, b = p
            if s in 'EW':
                ya, yb = sorted(int(g.xy(la, g.lon0)[1]) for la in (a, b)); col = w - 1 if s == 'E' else 0
                P.append((ya + int(np.argmin(e[ya:yb, col])), col))
            else:
                xa, xb = sorted(int(g.xy(g.lat0, lo)[0]) for lo in (a, b)); row = 0 if s == 'N' else h - 1
                P.append((row, xa + int(np.argmin(e[row, xa:xb]))))
            continue
        x, y = g.xy(*p); P.append((min(max(int(y), 0), h - 1), min(max(int(x), 0), w - 1)))
    m = np.zeros(e.shape, bool)
    for a, b in zip(P, P[1:]):
        for y, x in route_through_array(c, a, b, fully_connected=True, geometric=True)[0]: m[y, x] = True
    return ndi.binary_dilation(m, iterations=half)
def smooth_river(g, pts, sea, half):
    """A gently winding river through hand-placed points (lat, lon), as a smooth curve (Catmull-Rom), ending in the sea.
    Used where the plain is too flat for the elevation to show the course (Issus): the points are approximate."""
    P = [g.xy(*p) for p in pts]; P = [P[0]] + P + [P[-1]]; xs = []
    for i in range(1, len(P) - 2):
        p0, p1, p2, p3 = P[i - 1], P[i], P[i + 1], P[i + 2]
        for t in np.linspace(0, 1, 40, endpoint=False):
            xs.append(tuple(.5 * ((2 * p1[k]) + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t * t + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t ** 3) for k in (0, 1)))
    xs.append(P[-2]); im = Image.new('L', (W, H), 0); ImageDraw.Draw(im).line(xs, fill=255, width=2 * half + 1, joint='curve')
    return np.asarray(im) > 0
def paint(g, name, water):
    rgb = g.rgb.copy(); rgb[water] = WATER; g.im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); g.d = ImageDraw.Draw(g.im)
    g.im.save(os.path.join(OUT, name + '-base.png'), optimize=True)

MAPS = {}
# 1. the campaign: the Hellespont to Issus; 4:3 on the ground at the centre latitude
la0, la1, lo0, lo1 = frame43(38.2, 31.4, 1180)
MAPS['campaign'] = (la0, la1, lo0, lo1, 7)
# 2. the Granicus: the Biga Cayi from the edge of Biga northward (the conventional site); 8 x 6 km
MAPS['granicus'] = frame43(40.258, 27.248, 8) + (14,)
# 3. Issus: the coastal strip at the Payas river; 12 x 9 km
MAPS['issus'] = frame43(36.765, 36.215, 12) + (14,)
want = sys.argv[1:] or list(MAPS); metas = []
mj = os.path.join(OUT, 'maps.json'); old = {m['file']: m for m in (json.load(open(mj)) if os.path.exists(mj) else [])}
for name in want:
    la0, la1, lo0, lo1, zoom = MAPS[name]
    if name == 'campaign':
        G['RAMP'][:] = [(0, (150, 160, 110)), (300, (170, 166, 118)), (800, (176, 156, 116)), (1300, (160, 140, 108)), (2000, (150, 136, 116)), (3000, (190, 186, 180))]
        g = Guide(name + '-guide.png', la0, la1, lo0, lo1, zoom, None, None)
        sea = sea_mask(g); rgb = g.rgb.copy(); rgb[sea] = (78, 118, 160); g.im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); g.d = ImageDraw.Draw(g.im)
        g.lakes(clean(os.path.join(CACHE, 'ne_10m_lakes.geojson'))); g.geojson_lines(clean(os.path.join(CACHE, 'ne_rivers.geojson')), WATER, 3)
        g.im.save(os.path.join(OUT, name + '-base.png'), optimize=True)
        for n, la, lo, sub, dy in [('Sestos', 40.23, 26.39, '', -22), ('Abydos', 40.20, 26.41, 'the crossing, spring 334', 24), ('Troy', 39.957, 26.239, '', 24),
                                   ('Zeleia (approx.)', 40.31, 27.62, 'Persian council', -22), ('GRANICUS', 40.25, 27.25, 'May 334', 24), ('Sardis', 38.49, 28.04, '', -22),
                                   ('Ephesus', 37.94, 27.34, '', 24), ('Miletus', 37.53, 27.28, 'siege', 24), ('Halicarnassus', 37.04, 27.43, 'siege', 24),
                                   ('Gordium', 39.65, 31.99, 'winter 334-333; the knot', -22), ('Ancyra', 39.94, 32.86, '', -22), ('Cilician Gates (approx.)', 37.33, 34.79, 'the pass', -22),
                                   ('Tarsus', 36.92, 34.90, '', 24), ('Soli', 36.74, 34.54, '', 24), ('ISSUS', 36.765, 36.215, 'November 333', -22),
                                   ('Myriandrus (approx.)', 36.58, 36.17, '', 24), ('Amanic Gates (approx.)', 37.20, 36.58, "Darius's pass, disputed", -22)]:
            g.town(la, lo, n, sub, 22, RED if n.isupper() else BLACK, 8 if n.isupper() else 6, dy)
        for t, la, lo in [('AEGEAN SEA', 38.6, 25.6), ('MEDITERRANEAN SEA', 35.4, 31.0), ('BLACK SEA', 41.9, 33.5), ('ANATOLIA', 39.0, 30.5), ('TAURUS MOUNTAINS', 37.4, 33.3), ('AMANUS', 36.95, 36.45)]:
            g.text(la, lo, t, BLUE if 'SEA' in t else GREY, 26, True)
        g.frame("ALEXANDER'S MARCH, 334-333 BC: layout guide (campaign map)", 'Terrain from elevation; coast and rivers today\'s (Natural Earth). Places approx. where marked; modern borders not shown.', 1)
    elif name == 'granicus':
        G['RAMP'][:] = [(0, (150, 168, 108)), (30, (160, 172, 112)), (60, (172, 170, 118)), (100, (170, 160, 116)), (160, (160, 150, 112)), (260, (150, 142, 110))]
        g = Guide(name + '-guide.png', la0, la1, lo0, lo1, zoom, None, None)
        sea = sea_mask(g); r = river(g, [('S', 27.22, 27.27), ('N', 27.23, 27.28)], sea, 7); paint(g, name, sea | r)
        g.text(40.262, 27.236, 'Biga Cayi (the Granicus)', BLUE, 28, True)
        g.town(40.228, 27.242, 'Biga (modern town: do not paint)', '', 22, GREY, 6, -22)
        g.text(40.268, 27.272, 'east bank: Persian cavalry on the slope (Arrian)', RED, 24, True)
        g.text(40.268, 27.205, 'west bank: Alexander arrives from the west', BLUE, 24, True)
        g.frame('THE GRANICUS, May 334 BC: layout guide (conventional site, north of Biga)', 'Real elevation; the river traced along the valley floor (approx.; it has moved since antiquity). The exact battlefield is disputed.', .01)
    else:
        G['RAMP'][:] = [(0, (150, 166, 106)), (40, (164, 170, 112)), (120, (172, 164, 118)), (300, (160, 146, 110)), (600, (140, 130, 104)), (1200, (130, 124, 108))]
        g = Guide(name + '-guide.png', la0, la1, lo0, lo1, zoom, None, None)
        sea = sea_mask(g); r = smooth_river(g, [(36.7835, 36.2820), (36.7880, 36.2600), (36.7860, 36.2420), (36.7800, 36.2280), (36.7745, 36.2140), (36.7712, 36.2010), (36.7700, 36.1900)], sea, 7); paint(g, name, sea | r)
        g.text(36.768, 36.24, 'Payas river (the Pinarus? the most often proposed)', BLUE, 26, True)
        g.town(36.757, 36.215, 'Payas (modern town: do not paint)', '', 22, GREY, 6, 24)
        g.text(36.795, 36.205, 'north: Darius and the Persian army', RED, 26, True); g.text(36.735, 36.205, 'south: Alexander arrives from Myriandrus', BLUE, 26, True)
        g.text(36.752, 36.172, 'GULF OF ISKENDERUN', BLUE, 30, True); g.text(36.765, 36.272, 'AMANUS foothills', GREY, 28, True)
        g.text(36.738, 36.17, 'modern steel works and port here: do not paint', GREY, 22, True)
        g.frame('ISSUS, November 333 BC: layout guide (Payas river site)', 'Real elevation; coast and river from the elevation (approx.; the 333 BC shoreline may differ). The Pinarus is disputed (Payas, Kuru Cay, Deli Cay).', .01)
    meta = g.save(); old[meta['file']] = meta; print(name, round(meta['km_w']), 'x', round(meta['km_h']), 'km')
json.dump(list(old.values()), open(mj, 'w'), indent=1)
