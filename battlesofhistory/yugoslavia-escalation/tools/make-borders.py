#!/usr/bin/env python3
"""Borders for the slides: the six republics and two provinces of Yugoslavia (1980-1991), from Natural Earth 1:50m map
units (public domain), simplified. Today's international borders between the successor states follow the old republic
borders; Natural Earth's units also give Vojvodina and Kosovo, and Bosnia and Herzegovina's parts are joined into one.
Writes borders.js (window.YUGESC_BORDERS: name -> list of rings of [lat, lon])."""
import json, os
from shapely.geometry import shape
from shapely.ops import unary_union
CACHE = os.path.expanduser('~/.cache/talas-dem'); HERE = os.path.dirname(os.path.abspath(__file__))
d = json.load(open(os.path.join(CACHE, 'ne_50m_admin_0_map_units.geojson')))
by = {}
for f in d['features']:
    p = f['properties']; n = p.get('NAME'); sov = p.get('SOVEREIGNT') or ''
    key = {'Slovenia': 'Slovenia', 'Croatia': 'Croatia', 'Montenegro': 'Montenegro', 'North Macedonia': 'Macedonia', 'Kosovo': 'Kosovo', 'Vojvodina': 'Vojvodina', 'Serbia': 'Serbia'}.get(n)
    if not key and 'Bosnia' in sov: key = 'Bosnia and Herzegovina'
    if key: by.setdefault(key, []).append(shape(f['geometry']))
out = {}
for k, gs in by.items():
    g = unary_union(gs).simplify(.01, preserve_topology=True)
    polys = [g] if g.geom_type == 'Polygon' else list(g.geoms)
    out[k] = [[[round(y, 3), round(x, 3)] for x, y in p.exterior.coords[:-1]] for p in polys if p.area > .005]
open(os.path.join(HERE, '..', 'borders.js'), 'w').write('/* Made by tools/make-borders.py: Natural Earth 1:50m (public domain): the republics and provinces of Yugoslavia. */\nwindow.YUGESC_BORDERS = ' + json.dumps(out, separators=(',', ':')) + ';\n')
print({k: sum(len(r) for r in v) for k, v in out.items()})
