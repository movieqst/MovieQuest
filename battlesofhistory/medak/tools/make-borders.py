#!/usr/bin/env python3
"""Medak Pocket: border and town overlays for the opening globe dive (writes medak/borders.js). Made from
mogadishu1993/tools/make-borders.py.
    python3 battlesofhistory/medak/tools/make-borders.py
Stop 1 (high up): today's borders (Natural Earth admin-0 map units, public domain), then the states of 1993 in one neutral
colour, with a note: no front lines are drawn (the self-declared Republic of Serbian Krajina is named in a note, not drawn
as a state). Stop 2 (lower): today's towns, then the same towns in 1993."""
import json, os
from shapely.geometry import shape, box
from shapely.ops import unary_union
CACHE = os.path.expanduser('~/.cache/talas-dem')
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'borders.js')
VIEW = box(11, 41, 21, 48)
units = {f['properties']['NAME']: shape(f['geometry']) for f in json.load(open(os.path.join(CACHE, 'ne_50m_admin_0_map_units.geojson')))['features']}
def rings(geom, tol=.01, min_area=.002):
    geom = geom.intersection(VIEW).simplify(tol, preserve_topology=True)
    polys = [geom] if geom.geom_type == 'Polygon' else list(getattr(geom, 'geoms', []))
    return [[[round(x, 3), round(y, 3)] for x, y in p.exterior.coords[:-1]] for p in polys if p.geom_type == 'Polygon' and p.area >= min_area]
BIH = unary_union([units['Fed. of Bos. & Herz.'], units['Rep. Srpska']]).buffer(0)
SRB = unary_union([units['Serbia'], units['Kosovo']]).buffer(0)
MODERN = [('Croatia', units['Croatia'], (16.0, 45.6)), ('Bosnia and Herzegovina', BIH, (17.8, 44.2)), ('Slovenia', units['Slovenia'], (14.8, 46.1)),
          ('Serbia', units['Serbia'], (20.5, 44.0)), ('Montenegro', units['Montenegro'], (19.3, 42.8)), ('Hungary', units['Hungary'], (18.5, 46.9)),
          ('Italy', units['Italy'], (12.5, 43.5)), ('Austria', units['Austria'], (14.5, 47.3))]
modern = [dict(name=n, label=list(lab), rings=rings(g)) for n, g, lab in MODERN]
Y = '214,184,110'
ancient = [
    dict(name='CROATIA', sub='independent since 1991; about a quarter of it held by the self-declared Republic of Serbian Krajina', color=Y, label=[15.9, 45.6], rings=rings(units['Croatia'])),
    dict(name='BOSNIA AND HERZEGOVINA', sub='at war since 1992', color=Y, label=[17.8, 44.2], rings=rings(BIH)),
    dict(name='SLOVENIA', sub='', color=Y, label=[14.8, 46.1], rings=rings(units['Slovenia'])),
    dict(name='FEDERAL REPUBLIC OF YUGOSLAVIA', sub='Serbia and Montenegro', color=Y, label=[20.6, 43.8], rings=rings(unary_union([SRB, units['Montenegro']]).buffer(0))),
]
towns_today = [dict(lon=lo, lat=la, text=n, size=s, dot=True, **({'side': sd} if sd else {})) for n, lo, la, s, sd in [
    ('Gospić', 15.375, 44.546, .6, 'r'), ('Zagreb', 15.982, 45.815, .55, 'r'), ('Karlovac', 15.548, 45.487, .45, 'l'), ('Knin', 16.199, 44.041, .45, 'r'),
    ('Zadar', 15.231, 44.119, .45, 'l'), ('Rijeka', 14.442, 45.327, .45, 'l'), ('Bihać', 15.871, 44.817, .45, 'r')]]
towns_then = [dict(lon=lo, lat=la, text=n, sub=sub, size=s, dot=True, **({'side': sd} if sd else {})) for n, lo, la, s, sub, sd in [
    ('Gospić', 15.375, 44.546, .58, 'Croatian-held, near the front line', 'r'), ('Zagreb', 15.982, 45.815, .52, 'the capital of Croatia', 'r'),
    ('Knin', 16.199, 44.041, .45, 'the capital of the self-declared Krajina', 'r'), ('Zadar', 15.231, 44.119, .45, 'Croatian-held, on the coast', 'l'),
    ('Bihać', 15.871, 44.817, .45, 'Bosnia: besieged', 'r')]]
js = ('/* Overlays for the opening globe dive, made by tools/make-borders.py.\n'
      '   Stop 1: modern = today\'s borders (Natural Earth admin-0 map units, public domain); ancient = the states of 1993,\n'
      '   one neutral colour, no front lines. Stop 2: townsToday = today\'s towns; townsThen = the same towns in 1993. */\n'
      'window.BATTLE_BORDERS = ' + json.dumps(dict(modern=modern, ancient=ancient, townsToday=towns_today, townsThen=towns_then), separators=(',', ':'), ensure_ascii=False) + ';\n')
open(OUT, 'w').write(js); print('wrote', OUT, len(js) // 1024, 'KB')
