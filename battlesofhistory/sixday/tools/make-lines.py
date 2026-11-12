#!/usr/bin/env python3
"""Six-Day War: the long lines drawn on the Region map (writes sixday/lines.js, window.SIXDAY_LINES), from Natural Earth
(public domain), simplified. Each is { map, pts: [[lon, lat], ...], col, dash, label } (see engine.js, drawFronts).
    python3 battlesofhistory/sixday/tools/make-lines.py
  armistice  the 1949 armistice lines around Israel (Natural Earth's Israel without the Golan Heights)
  cease67    the ceasefire lines of 10-11 June 1967: Israel with Sinai, the Gaza Strip, the West Bank and the Golan Heights;
             Sinai is cut from Egypt along the Suez Canal and the Gulf of Suez with a hand-drawn polygon (approximate)
Both are approximate at the scale of the Region map (about 650 km across); they are not survey lines."""
import json, os
from shapely.geometry import shape, Polygon
from shapely.ops import unary_union
CACHE = os.path.expanduser('~/.cache/talas-dem'); OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'lines.js')
U = {f['properties']['NAME']: shape(f['geometry']) for f in json.load(open(os.path.join(CACHE, 'ne_50m_admin_0_map_units.geojson')))['features']}
GOLAN_BOX = Polygon([(35.60, 32.68), (35.95, 32.68), (36.05, 33.40), (35.60, 33.40)])
ISR = U['Israel'].difference(U['Israel'].intersection(GOLAN_BOX)).buffer(0); GOLAN = U['Israel'].intersection(GOLAN_BOX).buffer(0)
SINAI_CUT = Polygon([(32.30, 31.40), (32.40, 30.60), (32.56, 30.0), (32.62, 29.85), (32.75, 29.6), (33.2, 29.0), (33.6, 28.3), (34.2, 27.6), (35.2, 27.6), (35.2, 31.4)])
SINAI = U['Egypt'].intersection(SINAI_CUT).buffer(0)
def outline(g, tol=.012):
    g = g.buffer(.004).buffer(-.004).simplify(tol, preserve_topology=True)
    polys = [g] if g.geom_type == 'Polygon' else sorted(g.geoms, key=lambda p: -p.area)
    return [[round(x, 3), round(y, 3)] for x, y in polys[0].exterior.coords]
lines = {
  'armistice': dict(map='region', pts=outline(ISR), col='#2b2b2b', dash=[], label='Israel’s armistice lines of 1949'),
  'cease67': dict(map='region', pts=outline(unary_union([ISR, SINAI, U['Gaza'], U['West Bank'], GOLAN])), col='#c0392b', dash=[14, 8], label='the ceasefire lines, 10–11 June 1967 (approx.)'),
}
open(OUT, 'w').write('/* Lines for the Region map, made by tools/make-lines.py from Natural Earth (public domain); approximate. */\n'
                     'window.SIXDAY_LINES = ' + json.dumps({'fronts': lines, 'arrows': {}}, separators=(',', ':'), ensure_ascii=False) + ';\n')
print('wrote', OUT, {k: len(v['pts']) for k, v in lines.items()})
