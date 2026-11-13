#!/usr/bin/env python3
"""Somalia 1988 (War in the North and the Isaaq Genocide): base maps (to repaint) and layout guides for ChatGPT, from
REAL elevation (AWS terrain tiles), with the same Guide class as the Six-Day War and Granicus maps.
    python3 battlesofhistory/somalia1988/tools/draw-layout-guides.py [north core hargeisa burao berbera]
Writes somalia1988/images/layout/<map>-base.png, <map>-guide.png and maps.json.
  north     the whole north-west (today's Somaliland) with Djibouti and the Ethiopian border (640 x 480 km)
  core      Hargeisa, Burao, Berbera, Sheikh, Gebiley, the border and the refugee camps in Ethiopia (310 x 232 km)
  hargeisa  the city of 1988, its airport and the sites named by Africa Watch (12 x 9 km)
  burao     the town on the Togdheer and the Goon Ad compound (8 x 6 km)
  berbera   the port town and the airport to its south-west (12 x 9 km)
Places: research/reports/Somalia 1988 Isaaq killings.md (places table). The research gives NO coordinates for the sites
inside the cities: those here are approximate (marked 'approx.') and must be checked on a dated map or with local
knowledge before the page is finished."""
import os, sys, json, math
HERE = os.path.dirname(os.path.abspath(__file__))
SD = os.path.join(HERE, '..', '..', 'sixday', 'tools', 'draw-layout-guides.py')
src = open(SD).read().split('want = sys.argv')[0]
NS = {'__file__': SD, '__name__': 'somalia1988'}; exec(compile(src, 'sixday-dlg', 'exec'), NS)
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi
G, Guide, RED, BLUE, BLACK, GREY, WATER, WHITE, CACHE, clean = (NS[k] for k in ('G', 'Guide', 'RED', 'BLUE', 'BLACK', 'GREY', 'WATER', 'WHITE', 'CACHE', 'clean'))
OUT = os.path.join(HERE, '..', 'images', 'layout'); os.makedirs(OUT, exist_ok=True); G['OUT'] = OUT; NS['OUT'] = OUT
def frame43(lat_c, lon_c, km_w):
    km_h = km_w * 3 / 4; dla = km_h / 111.32; dlo = km_w / (111.32 * math.cos(math.radians(lat_c)))
    return lat_c - dla / 2, lat_c + dla / 2, lon_c - dlo / 2, lon_c + dlo / 2
def sea_mask(g):
    low = g.e <= .5; lab, n = ndi.label(low); edge = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    return np.isin(lab, list(edge))
DRY = [(0, (196, 182, 146)), (300, (190, 172, 132)), (800, (178, 160, 122)), (1300, (164, 150, 116)), (1800, (150, 140, 112)), (2400, (140, 134, 112))]
MAPS = {  # name: (frame, zoom, title)
  'north':    (frame43(9.90, 45.20, 640), 8, 'THE NORTH, 1987-1991: today\'s Somaliland, Djibouti and the Ethiopian border'),
  'core':     (frame43(9.70, 44.30, 310), 10, 'HARGEISA, BURAO, BERBERA AND THE ROAD TO ETHIOPIA, 1988'),
  'hargeisa': (frame43(9.552, 44.060, 12), 14, 'HARGEISA, May-August 1988'),
  'burao':    (frame43(9.522, 45.535, 8), 14, 'BURAO, May 1988'),
  'berbera':  (frame43(10.415, 44.985, 12), 14, 'BERBERA: the town, the port and the airport, 1988'),
}
# places: (lat, lon, name, sub, approx?) per map
PL = {
 'north': [(9.56, 44.06, 'HARGEISA', '', 0), (9.52, 45.53, 'BURAO', '', 0), (10.44, 45.01, 'BERBERA', '', 0), (9.93, 45.20, 'Sheikh', '', 0), (10.62, 47.37, 'Erigavo', '', 0),
           (9.93, 47.22, 'El Afweyn', '', 1), (8.48, 47.36, 'Las Anod', '', 0), (9.94, 43.18, 'Borama', '', 0), (9.70, 43.62, 'Gebiley', '', 0), (11.59, 43.15, 'Djibouti', '', 0),
           (9.02, 43.20, 'Hartisheik camps (Ethiopia)', '', 1), (9.60, 43.34, 'Tug Wajale', '', 1), (9.82, 43.33, 'Dila', '', 1), (10.29, 44.73, 'Mandera prison (approx.)', '', 1)],
 'core':  [(9.56, 44.06, 'HARGEISA', '', 0), (9.52, 45.53, 'BURAO', '', 0), (10.44, 45.01, 'BERBERA', '', 0), (9.93, 45.20, 'Sheikh', '', 0), (9.70, 43.62, 'Gebiley', '', 0),
           (9.69, 43.76, 'Arabsiyo', '', 1), (9.60, 43.34, 'Tug Wajale', '', 1), (9.94, 43.18, 'Borama', '', 0), (9.82, 43.33, 'Dila', '', 1), (9.02, 43.20, 'Hartisheik (refugee camps)', '', 1),
           (9.43, 44.15, 'Geed-Debleh (approx.)', '', 1), (9.48, 43.93, 'Biyaha Shinaha (approx.)', '', 1), (9.67, 43.95, 'Agabar / Las Dhure camps (approx.)', '', 1),
           (10.29, 44.73, 'Mandera prison (approx.)', '', 1), (9.85, 44.55, 'Dubato / Dara-Godle villages (approx.)', '', 1), (8.95, 44.95, 'Odweine (approx.)', '', 1)],
 'hargeisa': [(9.5606, 44.0650, 'Hargeisa town centre', '', 0), (9.518, 44.088, 'AIRPORT (government-held)', '', 1), (9.545, 44.055, 'Badhka (approx.)', 'execution ground', 1),
           (9.575, 44.050, 'Malka Durduro (approx.)', '26th Division compound', 1), (9.565, 44.040, 'Birjeh (approx.)', '26th Sector HQ', 1), (9.556, 44.071, 'Qaybta (approx.)', 'regional HQ', 1),
           (9.566, 44.085, 'Dumbuluq (approx.)', '', 1), (9.548, 44.068, 'Radio Station (approx.)', '', 1)],
 'burao': [(9.522, 45.535, 'Burao town centre', '', 0), (9.535, 45.515, 'Goon Ad compound (approx.)', '', 1), (9.51, 45.555, 'Togdheer river bed', '', 1)],
 'berbera': [(10.44, 45.012, 'Berbera old town and port', '', 0), (10.389, 44.941, 'AIRPORT', '', 0), (10.380, 44.915, 'killing site ~1 km from the runway end (approx.)', 'Gersony 25-26', 1)],
}
want = sys.argv[1:] or list(MAPS); mj = os.path.join(OUT, 'maps.json'); old = {m['file']: m for m in (json.load(open(mj)) if os.path.exists(mj) else [])}
for name in want:
    (la0, la1, lo0, lo1), zoom, title = MAPS[name]
    G['RAMP'][:] = DRY
    g = Guide(name + '-guide.png', la0, la1, lo0, lo1, zoom, None, None)
    sea = sea_mask(g); rgb = g.rgb.copy(); rgb[sea] = (78, 118, 160); g.im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); g.d = ImageDraw.Draw(g.im)
    if name in ('north', 'core'):
        g.geojson_lines(clean(os.path.join(CACHE, 'ne_rivers.geojson')), WATER, 3)
    g.im.save(os.path.join(OUT, name + '-base.png'), optimize=True)
    if name in ('north', 'core'): g.geojson_lines(clean(os.path.join(CACHE, 'ne_10m_admin_0_boundary_lines_land.geojson')), (90, 90, 90), 3)
    big = name in ('north', 'core')
    for la, lo, n, sub, ap in PL[name]:
        if la0 < la < la1 and lo0 < lo < lo1: g.town(la, lo, n, sub, 22 if big else 26, GREY if ap else BLACK, 7 if big else 9, -24)
    if name == 'north':
        for t, la, lo in [('GULF OF ADEN', 11.0, 46.2), ('ETHIOPIA', 8.4, 44.0), ('DJIBOUTI', 11.3, 42.6), ('SOMALIA (Puntland today)', 8.2, 47.6), ('Guban coastal plain', 10.3, 44.2), ('Golis mountains', 10.05, 45.7)]:
            g.text(la, lo, t, BLUE if 'GULF' in t else GREY, 26, True)
    if name == 'core':
        for t, la, lo in [('GULF OF ADEN', 10.62, 45.3), ('ETHIOPIA', 8.85, 43.6), ('the Haud (grazing plateau)', 9.0, 44.8), ('Golis escarpment', 10.1, 44.9)]:
            g.text(la, lo, t, BLUE if 'GULF' in t else GREY, 26, True)
    g.frame(title + ': layout guide', 'Real elevation; coast and rivers from the elevation and Natural Earth; borders today\'s. Places in grey are approximate: to check.', 1 if name == 'north' else .5 if name == 'core' else .01)
    meta = g.save(); old[meta['file']] = meta; print(name, round(meta['km_w']), 'x', round(meta['km_h']), 'km')
json.dump(list(old.values()), open(mj, 'w'), indent=1)
