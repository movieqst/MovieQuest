#!/usr/bin/env python3
"""Granicus and Issus: border and town overlays for the opening globe dive (writes granicus-issus/borders.js). Made from
mogadishu1993/tools/make-borders.py.
    python3 battlesofhistory/mogadishu1993/tools/make-borders.py
Stop 1 (high up): today's borders (Natural Earth admin-0 map units, public domain), then around 334 BCE in one neutral
colour: Somalia (its northern part, Somaliland, had declared independence in 1991 without recognition), Ethiopia (Eritrea
became independent in May 1993), Kenya, Djibouti. Stop 2 (lower): today's towns, then the same places around 334 BCE.
Needs ~/.cache/talas-dem/ne_50m_admin_0_map_units.geojson (github.com/nvkelso/natural-earth-vector, geojson/)."""
import json, os
from shapely.geometry import shape, box
from shapely.ops import unary_union
CACHE = os.path.expanduser('~/.cache/talas-dem')
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'borders.js')
VIEW = box(17, 27, 50, 46)
units = {f['properties']['NAME']: shape(f['geometry']) for f in json.load(open(os.path.join(CACHE, 'ne_50m_admin_0_map_units.geojson')))['features']}
def rings(geom, tol=.03, min_area=.01):
    geom = geom.intersection(VIEW).simplify(tol, preserve_topology=True)
    polys = [geom] if geom.geom_type == 'Polygon' else list(getattr(geom, 'geoms', []))
    return [[[round(x, 3), round(y, 3)] for x, y in p.exterior.coords[:-1]] for p in polys if p.geom_type == 'Polygon' and p.area >= min_area]
U = units
MODERN = [(n, U[n], lab) for n, lab in [('Turkey', (34.5, 39.2)), ('Greece', (22.0, 39.6)), ('Bulgaria', (25.3, 42.7)), ('North Macedonia', (21.7, 41.6)),
          ('Syria', (38.5, 35.0)), ('Lebanon', (35.9, 33.9)), ('Cyprus', (33.2, 35.1)), ('Iraq', (43.5, 33.0)), ('Egypt', (30.5, 27.5)), ('Israel', (34.9, 31.0)), ('Jordan', (36.6, 31.0))] if n in U]
modern = [dict(name=n, label=list(lab), rings=rings(g)) for n, g, lab in MODERN]
Y = '214,184,110'
PERSIA = unary_union([U[n] for n in ('Turkey', 'Syria', 'Lebanon', 'Israel', 'Jordan', 'Iraq', 'Egypt', 'Cyprus', 'Iran', 'West Bank', 'Gaza') if n in U]).buffer(0)
GREEK = unary_union([U[n] for n in ('Greece', 'North Macedonia') if n in U]).buffer(0)
ancient = [
    dict(name='MACEDON AND THE GREEK STATES', sub='approximate; modern borders used only as a rough outline', color=Y, label=[22.3, 40.2], rings=rings(GREEK)),
    dict(name='PERSIAN EMPIRE', sub='the Achaemenid empire of Darius III, from the Aegean to India (approximate)', color=Y, label=[36.5, 37.8], rings=rings(PERSIA)),
]
towns_today = [dict(lon=lo, lat=la, text=n, size=s, dot=True, **({'side': sd} if sd else {})) for n, lo, la, s, sd in [
    ('Istanbul', 28.98, 41.01, .55, 'r'), ('Çanakkale', 26.41, 40.15, .45, 'l'), ('Biga', 27.24, 40.23, .45, 'r'), ('İskenderun', 36.17, 36.58, .5, 'r'),
    ('Athens', 23.73, 37.98, .5, 'l'), ('Ankara', 32.86, 39.93, .5, 'r'), ('Damascus', 36.29, 33.51, .5, 'r')]]
towns_then = [dict(lon=lo, lat=la, text=n, sub=sub, size=s, dot=True, **({'side': sd} if sd else {})) for n, lo, la, s, sub, sd in [
    ('Pella', 22.52, 40.76, .5, 'capital of Macedon', 'l'), ('Granicus', 27.24, 40.23, .55, 'the first battle, 334 BCE', 'r'),
    ('Issus', 36.2, 36.75, .55, 'the second battle, 333 BCE', 'r'), ('Sardis', 28.04, 38.49, .45, 'a Persian provincial capital', 'l'),
    ('Babylon', 44.42, 32.54, .5, 'one of the Persian royal cities', 'r'), ('Athens', 23.73, 37.98, .45, '', 'l')]]
js = ('/* Overlays for the opening globe dive, made by tools/make-borders.py.\n'
      '   Stop 1: modern = today\'s borders (Natural Earth admin-0 map units, public domain); ancient = around 334 BCE,\n'
      '   one neutral colour. Stop 2: townsToday = today\'s towns; townsThen = the same places around 334 BCE. */\n'
      'window.BATTLE_BORDERS = ' + json.dumps(dict(modern=modern, ancient=ancient, townsToday=towns_today, townsThen=towns_then), separators=(',', ':'), ensure_ascii=False) + ';\n')
open(OUT, 'w').write(js); print('wrote', OUT, len(js) // 1024, 'KB')
