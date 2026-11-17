#!/usr/bin/env python3
"""Somalia 1988: border and town overlays for the opening globe dive (writes somalia1988/borders.js). Made from
mogadishu1993/tools/make-borders.py.
    python3 battlesofhistory/mogadishu1993/tools/make-borders.py
Stop 1 (high up): today's borders (Natural Earth admin-0 map units, public domain), then the lines of 1988 in one neutral
colour: Somalia (one state in 1988, the north included), Ethiopia (Eritrea still part of it), Kenya, Djibouti. Stop 2 (lower): today's towns, then the same towns in 1988.
Needs ~/.cache/talas-dem/ne_50m_admin_0_map_units.geojson (github.com/nvkelso/natural-earth-vector, geojson/)."""
import json, os
from shapely.geometry import shape, box
from shapely.ops import unary_union
CACHE = os.path.expanduser('~/.cache/talas-dem')
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'borders.js')
VIEW = box(33, -6, 56, 17)
units = {f['properties']['NAME']: shape(f['geometry']) for f in json.load(open(os.path.join(CACHE, 'ne_50m_admin_0_map_units.geojson')))['features']}
def rings(geom, tol=.03, min_area=.01):
    geom = geom.intersection(VIEW).simplify(tol, preserve_topology=True)
    polys = [geom] if geom.geom_type == 'Polygon' else list(getattr(geom, 'geoms', []))
    return [[[round(x, 3), round(y, 3)] for x, y in p.exterior.coords[:-1]] for p in polys if p.geom_type == 'Polygon' and p.area >= min_area]
SOM, SL = units['Somalia'], units['Somaliland']
MODERN = [('Somalia', SOM, (45.2, 4.0)), ('Somaliland', SL, (45.5, 9.6)), ('Ethiopia', units['Ethiopia'], (39.5, 8.5)), ('Kenya', units['Kenya'], (38.0, 0.5)),
          ('Djibouti', units['Djibouti'], (42.6, 11.7)), ('Eritrea', units['Eritrea'], (38.6, 15.5)), ('Yemen', units['Yemen'], (47.5, 15.6))]
modern = [dict(name=n, label=list(lab), rings=rings(g)) for n, g, lab in MODERN]
Y = '214,184,110'
ancient = [
    dict(name='SOMALIA', sub='one state under Siad Barre; the north is today Somaliland', color=Y, label=[45.4, 4.6], rings=rings(unary_union([SOM, SL]).buffer(0))),
    dict(name='ETHIOPIA', sub='with Eritrea; the refugee camps lay just across the border', color=Y, label=[39.5, 8.5], rings=rings(unary_union([units['Ethiopia'], units['Eritrea']]).buffer(0))),
    dict(name='KENYA', sub='', color=Y, label=[38.0, 0.5], rings=rings(units['Kenya'])),
    dict(name='DJIBOUTI', sub='', color=Y, label=[42.6, 11.7], rings=rings(units['Djibouti'])),
]
towns_today = [dict(lon=lo, lat=la, text=n, size=s, dot=True, **({'side': sd} if sd else {})) for n, lo, la, s, sd in [
    ('Hargeisa', 44.065, 9.56, .65, 'l'), ('Burao', 45.535, 9.522, .5, 'r'), ('Berbera', 45.012, 10.44, .5, 'r'), ('Borama', 43.183, 9.936, .42, 'l'),
    ('Erigavo', 47.367, 10.617, .42, 'r'), ('Mogadishu', 45.318, 2.046, .5, 'r'), ('Djibouti', 43.145, 11.589, .45, 'l'), ('Addis Ababa', 38.75, 9.03, .5, 'r')]]
towns_then = [dict(lon=lo, lat=la, text=n, sub=sub, size=s, dot=True, **({'side': sd} if sd else {})) for n, lo, la, s, sub, sd in [
    ('Hargeisa', 44.065, 9.56, .62, 'the north’s largest city', 'l'), ('Burao', 45.535, 9.522, .5, 'attacked by the SNM, 27 May 1988', 'r'),
    ('Berbera', 45.012, 10.44, .5, 'the north’s port', 'r'), ('Mogadishu', 45.318, 2.046, .5, 'the capital', 'r'), ('Hartisheik', 43.55, 9.03, .42, 'refugee camps in Ethiopia from 1988', 'l')]]
js = ('/* Overlays for the opening globe dive, made by tools/make-borders.py.\n'
      '   Stop 1: modern = today\'s borders (Natural Earth admin-0 map units, public domain); ancient = the lines of 1988,\n'
      '   one neutral colour. Stop 2: townsToday = today\'s towns; townsThen = the same towns in 1988. */\n'
      'window.BATTLE_BORDERS = ' + json.dumps(dict(modern=modern, ancient=ancient, townsToday=towns_today, townsThen=towns_then), separators=(',', ':'), ensure_ascii=False) + ';\n')
open(OUT, 'w').write(js); print('wrote', OUT, len(js) // 1024, 'KB')
