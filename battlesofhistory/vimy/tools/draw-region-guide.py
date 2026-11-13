#!/usr/bin/env python3
"""Vimy Ridge: the REGION map between the globe and the battle map (Artois and French Flanders, the Channel coast to
Cambrai), from REAL elevation (AWS terrain tiles), with the same tools as the Six-Day War and Tyre maps.
    python3 battlesofhistory/vimy/tools/draw-region-guide.py
Outputs vimy/images/layout/region-base.png (terrain, sea, rivers only: for ChatGPT to paint over) and region-guide.png
(the towns of April 1917, the front line, the battle map's frame), plus region.json with the frame's corners.
The engine lays the painting onto the globe by these corners, so the globe can fade into it without a jump."""
import os, sys, json, math
import numpy as np
from PIL import Image, ImageDraw
from scipy.ndimage import label
HERE = os.path.dirname(os.path.abspath(__file__))
SIX = os.path.join(HERE, '..', '..', 'sixday', 'tools', 'draw-layout-guides.py')
src = open(SIX).read().split('want = sys.argv')[0]
NS = {'__file__': SIX, '__name__': 'vimy'}; exec(compile(src, 'sixday-dlg', 'exec'), NS)
G, Guide, clean, CACHE = NS['G'], NS['Guide'], NS['clean'], NS['CACHE']
RED, BLUE, BLACK, GREY, WATER, WHITE, F = (NS[k] for k in ('RED', 'BLUE', 'BLACK', 'GREY', 'WATER', 'WHITE', 'F'))
W, H = G['W'], G['H']
OUT = os.path.join(HERE, '..', 'images', 'layout'); os.makedirs(OUT, exist_ok=True)
G['OUT'] = OUT; NS['OUT'] = OUT
SEA = np.array([70, 112, 150.])

LA1, LA0 = 51.25, 49.95                      # top and bottom latitude
km_h = (LA1 - LA0) * 111.32; km_w = km_h * 4 / 3
LO0 = 1.55; LO1 = LO0 + km_w / (111.32 * math.cos(math.radians((LA1 + LA0) / 2)))
TOWNS = [  # (lat, lon, name, note, colour): the globe's "Towns of April 1917", plus the coast for orientation
    (50.291, 2.7818, 'Arras', 'British, 3 km behind the front', BLUE), (50.432, 2.8319, 'Lens', 'German-held', RED),
    (50.37, 3.08, 'Douai', 'German-held', RED), (50.6292, 3.0573, 'Lille', 'German-held since 1914', RED),
    (50.53, 2.64, 'Béthune', '', BLUE), (50.372, 2.639, 'Camblain-l’Abbé', 'Canadian Corps HQ', BLUE),
    (50.176, 3.235, 'Cambrai', 'German-held', RED), (51.034, 2.377, 'Dunkirk', '', BLACK), (50.951, 1.858, 'Calais', '', BLACK),
    (50.75, 2.25, 'Saint-Omer', '', BLACK), (50.85, 2.88, 'Ypres', '', BLACK)]
FRONT = [(51.15, 2.75), (50.95, 2.88), (50.85, 2.90), (50.75, 2.95), (50.62, 2.90), (50.45, 2.80), (50.36, 2.76), (50.28, 2.78), (50.15, 2.90), (50.05, 3.05), (49.95, 3.18)]
BATTLE = (50.402, 2.710, 50.322, 2.877)       # the battle map's frame (top-left lat/lon, bottom-right lat/lon)

def run():
    G['RAMP'][:] = [(0, (190, 186, 140)), (20, (186, 182, 136)), (60, (176, 172, 128)), (100, (166, 162, 122)), (150, (156, 152, 116)), (200, (148, 144, 112))]
    g = Guide('region-guide.png', LA0, LA1, LO0, LO1, 10, None, None)
    rgb = g.rgb.copy()
    low = g.e <= .5; lab, n = label(low); edge = set(np.unique(np.concatenate([lab[0], lab[:, 0]]))) - {0}
    sea = np.isin(lab, list(edge)); rgb[sea] = SEA
    g.im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); g.d = ImageDraw.Draw(g.im)
    g.geojson_lines(clean(os.path.join(CACHE, 'ne_rivers.geojson')), WATER, 3)
    g.im.save(os.path.join(OUT, 'region-base.png'), optimize=True)
    g.line(FRONT, (200, 60, 40), 5, dash=16)
    x0, y0 = g.xy(BATTLE[0], BATTLE[1]); x1, y1 = g.xy(BATTLE[2], BATTLE[3])
    g.d.rectangle([x0, y0, x1, y1], outline=(200, 60, 40), width=4); g.d.text((x1 + 8, y0), 'battle map', fill=(170, 40, 30), font=F(22, True), stroke_width=4, stroke_fill=WHITE)
    for lat, lon, s, sub, col in TOWNS: g.town(lat, lon, s, sub, 26, col, 9, -20)
    g.frame('ARTOIS AND FRENCH FLANDERS, APRIL 1917: layout guide', 'Real elevation; the front line of April 1917 dashed red; the battle map framed.', .5)
    meta = g.save(); json.dump({'lat0': LA0, 'lat1': LA1, 'lon0': LO0, 'lon1': LO1, 'width': W, 'height': H}, open(os.path.join(OUT, 'region.json'), 'w'), indent=1)
    print(meta)

if __name__ == '__main__': run()
