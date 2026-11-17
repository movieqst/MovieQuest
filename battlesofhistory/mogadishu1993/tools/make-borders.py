#!/usr/bin/env python3
"""Battle of Mogadishu: border and town overlays for the opening globe dive (writes mogadishu1993/borders.js). Made from
sixday/tools/make-borders.py.
    python3 battlesofhistory/mogadishu1993/tools/make-borders.py
Stop 1 (high up): today's borders (Natural Earth admin-0 map units, public domain), then the lines of 1993 in one neutral
colour: Somalia (its northern part, Somaliland, had declared independence in 1991 without recognition), Ethiopia (Eritrea
became independent in May 1993), Kenya, Djibouti. Stop 2 (lower): today's towns, then the same towns in 1993.
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
    dict(name='SOMALIA', sub='no national government since January 1991; in the north, Somaliland had declared independence', color=Y, label=[45.4, 4.6], rings=rings(unary_union([SOM, SL]).buffer(0))),
    dict(name='ETHIOPIA', sub='Eritrea became independent in May 1993', color=Y, label=[39.5, 8.5], rings=rings(unary_union([units['Ethiopia'], units['Eritrea']]).buffer(0))),
    dict(name='KENYA', sub='', color=Y, label=[38.0, 0.5], rings=rings(units['Kenya'])),
    dict(name='DJIBOUTI', sub='', color=Y, label=[42.6, 11.7], rings=rings(units['Djibouti'])),
]
towns_today = [dict(lon=lo, lat=la, text=n, size=s, dot=True, **({'side': sd} if sd else {})) for n, lo, la, s, sd in [
    ('Mogadishu', 45.318, 2.046, .65, 'r'), ('Beledweyne', 45.203, 4.737, .5, 'r'), ('Baidoa', 43.65, 3.114, .45, 'l'), ('Kismayo', 42.545, -0.358, .45, 'l'),
    ('Hargeisa', 44.065, 9.56, .45, 'l'), ('Nairobi', 36.82, -1.29, .5, 'r'), ('Addis Ababa', 38.75, 9.03, .5, 'r')]]
towns_then = [dict(lon=lo, lat=la, text=n, sub=sub, size=s, dot=True, **({'side': sd} if sd else {})) for n, lo, la, s, sub, sd in [
    ('Mogadishu', 45.318, 2.046, .62, 'the capital, divided between rival factions', 'r'),
    ('Beledweyne', 45.203, 4.737, .5, 'the Canadian sector, 1992–1993', 'r'), ('Baidoa', 43.65, 3.114, .45, 'centre of the 1992 famine', 'l'),
    ('Kismayo', 42.545, -0.358, .45, 'port in the south', 'l'), ('Hargeisa', 44.065, 9.56, .45, 'Somaliland', 'l')]]
js = ('/* Overlays for the opening globe dive, made by tools/make-borders.py.\n'
      '   Stop 1: modern = today\'s borders (Natural Earth admin-0 map units, public domain); ancient = the lines of 1993,\n'
      '   one neutral colour. Stop 2: townsToday = today\'s towns; townsThen = the same towns in 1993. */\n'
      'window.BATTLE_BORDERS = ' + json.dumps(dict(modern=modern, ancient=ancient, townsToday=towns_today, townsThen=towns_then), separators=(',', ':'), ensure_ascii=False) + ';\n')
open(OUT, 'w').write(js); print('wrote', OUT, len(js) // 1024, 'KB')
