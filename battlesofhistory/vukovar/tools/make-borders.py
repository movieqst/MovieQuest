#!/usr/bin/env python3
"""Vukovar 1991: border and town overlays for the opening globe dive (writes vukovar/borders.js).
    python3 battlesofhistory/vukovar/tools/make-borders.py
Stop 1 (high up): today's countries (Natural Earth admin-0 map units, public domain), then 1991: the six republics of
   Yugoslavia, all in one neutral colour (the page does not colour the republics as sides). Serbia includes its two
   provinces, Vojvodina and Kosovo, as in 1991.
Stop 2 (lower): today's towns and cities, then the same towns in autumn 1991 with a short note.
Needs ~/.cache/talas-dem/ne_50m_admin_0_map_units.geojson (github.com/nvkelso/natural-earth-vector, geojson/)."""
import json, os
from shapely.geometry import shape, box
from shapely.ops import unary_union
CACHE = os.path.expanduser('~/.cache/talas-dem')
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'borders.js')
VIEW = box(10, 38, 28, 50)
units = {f['properties']['NAME']: shape(f['geometry']) for f in json.load(open(os.path.join(CACHE, 'ne_50m_admin_0_map_units.geojson')))['features']}

def rings(geom, tol=.02, min_area=.02):
    geom = geom.intersection(VIEW).simplify(tol, preserve_topology=True)
    polys = [geom] if geom.geom_type == 'Polygon' else list(getattr(geom, 'geoms', []))
    return [[[round(x, 2), round(y, 2)] for x, y in p.exterior.coords[:-1]] for p in polys if p.geom_type == 'Polygon' and p.area >= min_area]

BIH = unary_union([units['Fed. of Bos. & Herz.'], units['Rep. Srpska']])
SRB = unary_union([units['Serbia'], units['Vojvodina'], units['Kosovo']])
MODERN = [('Croatia', units['Croatia'], (16.0, 45.6)), ('Serbia', unary_union([units['Serbia'], units['Vojvodina']]), (20.9, 44.4)),
          ('Bosnia and Herzegovina', BIH, (17.8, 44.2)), ('Slovenia', units['Slovenia'], (14.8, 46.15)), ('Montenegro', units['Montenegro'], None),
          ('Kosovo', units['Kosovo'], None), ('North Macedonia', units['North Macedonia'], None), ('Hungary', units['Hungary'], (19.0, 47.2)),
          ('Austria', units['Austria'], (14.5, 47.5)), ('Italy', units['Italy'], (12.6, 43.2)), ('Romania', units['Romania'], (24.5, 45.8)),
          ('Bulgaria', units['Bulgaria'], (25.0, 42.7)), ('Albania', units['Albania'], None), ('Greece', units['Greece'], None)]
modern = [dict(name=n, label=list(lab) if lab else None, rings=rings(g)) for n, g, lab in MODERN]

Y = '214,184,110'   # one neutral colour for all six republics
ancient = [
    dict(name='CROATIA', sub='declared independence 25 June 1991', color=Y, label=[16.0, 45.55], rings=rings(units['Croatia'])),
    dict(name='SERBIA', sub='with Vojvodina and Kosovo', color=Y, label=[20.9, 44.2], rings=rings(SRB)),
    dict(name='BOSNIA AND HERZEGOVINA', sub='', color=Y, label=[17.8, 44.15], rings=rings(BIH)),
    dict(name='SLOVENIA', sub='declared independence 25 June 1991', color=Y, label=[14.8, 46.15], rings=rings(units['Slovenia'])),
    dict(name='MONTENEGRO', sub='', color=Y, label=[19.25, 42.8], rings=rings(units['Montenegro'])),
    dict(name='MACEDONIA', sub='', color=Y, label=[21.7, 41.6], rings=rings(units['North Macedonia'])),
]

towns_today = [dict(lon=lo, lat=la, text=n, size=s, dot=True, **({'side': sd} if sd else {})) for n, lo, la, s, sd in [
    ('Vukovar', 19.0033, 45.3511, .7, 'r'), ('Vinkovci', 18.8050, 45.2880, .55, 'l'), ('Osijek', 18.6955, 45.5550, .6, 'l'),
    ('Novi Sad', 19.8335, 45.2671, .6, None), ('Šid', 19.2264, 45.1283, .5, 'b'), ('Ilok', 19.3797, 45.2225, .45, 'r'),
    ('Sombor', 19.1122, 45.7742, .45, None), ('Đakovo', 18.4108, 45.3100, .45, 'l')]]
towns_then = [dict(lon=lo, lat=la, text=n, sub=sub, size=s, dot=True, **({'side': sd} if sd else {})) for n, lo, la, s, sub, sd in [
    ('Vukovar', 19.0033, 45.3511, .66, 'besieged, late August – 18 November 1991', 'r'),
    ('Vinkovci', 18.8050, 45.2880, .52, 'Croatian forces; relief attempts set out from here', 'l'),
    ('Osijek', 18.6955, 45.5550, .55, 'under attack in autumn 1991', 'l'),
    ('Novi Sad', 19.8335, 45.2671, .55, 'Novi Sad Corps (JNA)', None),
    ('Šid', 19.2264, 45.1283, .48, 'JNA offensive set out, about 20 September', 'b')]]

js = ('/* Overlays for the opening globe dive, made by tools/make-borders.py.\n'
      '   Stop 1: modern = today\'s countries (Natural Earth admin-0 map units, public domain); ancient = 1991: the six republics\n'
      '   of Yugoslavia in one neutral colour. Stop 2: townsToday = today\'s towns; townsThen = the same towns in autumn 1991. */\n'
      'window.BATTLE_BORDERS = ' + json.dumps(dict(modern=modern, ancient=ancient, townsToday=towns_today, townsThen=towns_then), separators=(',', ':'), ensure_ascii=False) + ';\n')
open(OUT, 'w').write(js)
print('wrote', OUT, len(js) // 1024, 'KB')
