#!/usr/bin/env python3
"""Operation Midnight Hammer: overlays for the opening globe dive (writes midnight-hammer/borders.js).
    python3 battlesofhistory/midnight-hammer/tools/make-borders.py
Stop 1: today's outline of Iran (Natural Earth admin-0 map units, public domain). Stop 2: the cities, then the three nuclear
sites of June 2025."""
import json, os
from shapely.geometry import shape, box
CACHE = os.path.expanduser('~/.cache/talas-dem')
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'borders.js')
VIEW = box(40, 22, 64, 40)
units = {f['properties']['NAME']: shape(f['geometry']) for f in json.load(open(os.path.join(CACHE, 'ne_50m_admin_0_map_units.geojson')))['features']}
def rings(geom, tol=.02, min_area=.05):
    geom = geom.intersection(VIEW).simplify(tol, preserve_topology=True)
    polys = [geom] if geom.geom_type == 'Polygon' else list(getattr(geom, 'geoms', []))
    return [[[round(x, 3), round(y, 3)] for x, y in p.exterior.coords[:-1]] for p in polys if p.geom_type == 'Polygon' and p.area >= min_area]
modern = [dict(name='Iran', label=[54.5, 32.5], rings=rings(units['Iran']))]
ancient = []
towns_today = [dict(lon=lo, lat=la, text=n, size=sz, dot=True, side=sd) for n, lo, la, sz, sd in [
    ('Tehran', 51.39, 35.69, .6, 'r'), ('Qom', 50.88, 34.64, .45, 'l'), ('Isfahan', 51.67, 32.66, .5, 'r')]]
towns_then = [dict(lon=lo, lat=la, text=n, sub=sub, size=sz, dot=True, side=sd) for n, lo, la, sz, sub, sd in [
    ('Fordow', 51.00, 34.88, .5, 'enrichment site', 'l'), ('Natanz', 51.73, 33.73, .5, 'enrichment site', 'r'), ('Isfahan', 51.83, 32.57, .5, 'nuclear technology centre', 'r')]]
js = ('/* Overlays for the opening globe dive, made by tools/make-borders.py. */\n'
      'window.BATTLE_BORDERS = ' + json.dumps(dict(modern=modern, ancient=ancient, townsToday=towns_today, townsThen=towns_then), separators=(',', ':'), ensure_ascii=False) + ';\n')
open(OUT, 'w').write(js); print('wrote', OUT, len(js) // 1024, 'KB')
