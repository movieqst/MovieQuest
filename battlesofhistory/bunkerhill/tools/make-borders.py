#!/usr/bin/env python3
"""Battle of Bunker Hill: overlays for the opening globe dive (writes bunkerhill/borders.js).
    python3 battlesofhistory/bunkerhill/tools/make-borders.py
Stop 1: today's outline of the United States around New England (Natural Earth admin-0 map units, public domain); no 1775
lines are drawn (the colonies' borders are not in the data; the narration says the colonies were British). Stop 2: today's
towns, then the same places in 1775."""
import json, os
from shapely.geometry import shape, box
CACHE = os.path.expanduser('~/.cache/talas-dem')
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'borders.js')
VIEW = box(-76, 40, -66, 46)
units = {f['properties']['NAME']: shape(f['geometry']) for f in json.load(open(os.path.join(CACHE, 'ne_50m_admin_0_map_units.geojson')))['features']}
def rings(geom, tol=.01, min_area=.01):
    geom = geom.intersection(VIEW).simplify(tol, preserve_topology=True)
    polys = [geom] if geom.geom_type == 'Polygon' else list(getattr(geom, 'geoms', []))
    return [[[round(x, 3), round(y, 3)] for x, y in p.exterior.coords[:-1]] for p in polys if p.geom_type == 'Polygon' and p.area >= min_area]
us = [k for k in units if k in ('United States of America', 'United States')][0]
modern = [dict(name='United States', label=[-72.6, 42.8], rings=rings(units[us]))]
ancient = []
towns_today = [dict(lon=lo, lat=la, text=n, size=s, dot=True, side=sd) for n, lo, la, s, sd in [
    ('Boston', -71.058, 42.360, .6, 'r'), ('Cambridge', -71.120, 42.376, .45, 'l'), ('Charlestown', -71.062, 42.378, .45, 'r')]]
towns_then = [dict(lon=lo, lat=la, text=n, sub=sub, size=s, dot=True, side=sd) for n, lo, la, s, sub, sd in [
    ('Boston', -71.058, 42.360, .58, 'held by the British army', 'r'), ('Cambridge', -71.120, 42.376, .45, 'the provincial headquarters', 'l'),
    ('Charlestown', -71.062, 42.378, .45, 'its peninsula: Bunker Hill and Breed’s Hill', 'r')]]
js = ('/* Overlays for the opening globe dive, made by tools/make-borders.py. */\n'
      'window.BATTLE_BORDERS = ' + json.dumps(dict(modern=modern, ancient=ancient, townsToday=towns_today, townsThen=towns_then), separators=(',', ':'), ensure_ascii=False) + ';\n')
open(OUT, 'w').write(js); print('wrote', OUT, len(js) // 1024, 'KB')
