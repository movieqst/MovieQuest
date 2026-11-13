#!/usr/bin/env python3
"""Batoche 1885: the continent map (Canada and the northern United States), shown after the globe and before the campaign
map. Same tools and style as draw-layout-guides.py: real elevation (AWS terrain tiles), sea from the elevation, lakes and
rivers from Natural Earth (public domain).
    python3 battlesofhistory/batoche/tools/draw-continent.py
Outputs batoche/images/layout/continent-guide.png, continent-base.png and adds the frame to maps.json."""
import json, os
HERE = os.path.dirname(os.path.abspath(__file__)); BT = os.path.join(HERE, 'draw-layout-guides.py')
src = open(BT).read().split('os.makedirs(OUT, exist_ok=True); metas = []')[0]
G2 = {'__file__': BT, '__name__': 'continent'}; exec(compile(src, 'batoche-dlg', 'exec'), G2)
G, OUT = G2['G'], G2['OUT']
Guide, RED, BLUE, BLACK, GREY, WATER, WHITE, F = (G2[k] for k in ('Guide', 'RED', 'BLUE', 'BLACK', 'GREY', 'WATER', 'WHITE', 'F'))
CACHE = G2['CACHE']
import numpy as np, tempfile
from PIL import Image, ImageDraw
def clean(path):   # some Natural Earth files have features with no shape: drop them
    d = json.load(open(path)); d['features'] = [f for f in d['features'] if f.get('geometry')]
    out = os.path.join(tempfile.gettempdir(), 'clean-' + os.path.basename(path)); json.dump(d, open(out, 'w')); return out

G['RAMP'][:] = [(0, (150, 178, 120)), (300, (160, 184, 124)), (700, (184, 192, 132)), (1200, (196, 190, 138)), (2000, (178, 162, 122)), (3000, (160, 150, 140)), (4500, (230, 230, 230))]
C = dict(lat0=36.0, lat1=74.0, lon0=-142.0, lon1=-50.0)
g = Guide('continent-guide.png', C['lat0'], C['lat1'], C['lon0'], C['lon1'], 4, None, None)
sea = g.e <= 0; rgb = g.rgb.copy(); rgb[sea] = (95, 140, 190)
g.im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); g.d = ImageDraw.Draw(g.im)
g.lakes(clean(os.path.join(CACHE, 'ne_10m_lakes.geojson')))
g.geojson_lines(clean(os.path.join(CACHE, 'ne_rivers.geojson')), WATER, 3)
g.im.save(os.path.join(OUT, 'continent-base.png'), optimize=True)
# the guide: the border, the provinces, a few places, Batoche and the campaign map's frame
g.geojson_lines(clean(os.path.join(CACHE, 'ne_10m_admin_0_boundary_lines_land.geojson')), (60, 60, 60), 3)
g.geojson_lines(clean(os.path.join(CACHE, 'ne_10m_admin_1_states_provinces_lines.geojson')), (130, 130, 130), 1)
x0, y0 = g.xy(54.2, -111.3); x1, y1 = g.xy(49.85, -101.9); g.d.rectangle([x0, y0, x1, y1], outline=RED, width=4)
g.d.text((x1 + 8, y0), 'campaign map', fill=RED, font=F(20, True), anchor='lt', stroke_width=3, stroke_fill=WHITE)
x, y = g.xy(52.7525, -106.1182); g.d.rectangle([x - 9, y - 9, x + 9, y + 9], fill=RED, outline=WHITE, width=3)
g.d.text((x + 16, y - 26), 'BATOCHE', fill=RED, font=F(28, True), anchor='lb', stroke_width=4, stroke_fill=WHITE)
for n, la, lo in [('Ottawa', 45.42, -75.70), ('Winnipeg', 49.90, -97.14), ('Montreal', 45.50, -73.57), ('Toronto', 43.65, -79.38),
                  ('Victoria', 48.43, -123.37), ('Halifax', 44.65, -63.57), ('Calgary', 51.05, -114.07), ('Edmonton', 53.55, -113.49)]:
    g.town(la, lo, n, '', 20, BLACK, 6, -22)
for s, la, lo in [('CANADA', 58, -100), ('UNITED STATES', 41.5, -100), ('Hudson Bay', 60, -86), ('Pacific Ocean', 47, -134), ('Atlantic Ocean', 40, -60)]:
    g.text(la, lo, s, BLUE if 'Ocean' in s or 'Bay' in s else GREY, 30, True)
g.frame('CANADA AND THE NORTHERN UNITED STATES, 1885: where Batoche is', 'Terrain and sea from elevation; lakes, rivers and borders Natural Earth (modern borders, for orientation).', 5)
meta = g.save()
mj = os.path.join(OUT, 'maps.json'); ms = [m for m in json.load(open(mj)) if m['file'] != 'continent-guide.png'] + [meta]
json.dump(ms, open(mj, 'w'), indent=1); print(meta)
