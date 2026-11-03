#!/usr/bin/env python3
"""Stirling Bridge: border and town overlays for the opening globe dive (writes stirling/borders.js).
    python3 battlesofhistory/stirling/tools/make-borders.py
Stop 1 (high up): today's countries (Natural Earth admin-0 map units, public domain), then the realms of 1297,
   built from the same shapes: Scotland without Orkney and Shetland (Norwegian until 1468-69), England with Wales
   (conquered 1283), the English lordship of Ireland, and Norway's Orkney and Shetland. Approximate.
Stop 2 (lower): today's towns and cities (Natural Earth populated places), then the towns of 1297.
Needs ~/.cache/talas-dem/ne_50m_admin_0_map_units.geojson and ne_10m_populated_places_simple.geojson
(github.com/nvkelso/natural-earth-vector, geojson/)."""
import json, os
from shapely.geometry import shape, mapping, box
from shapely.ops import unary_union
CACHE = os.path.expanduser('~/.cache/talas-dem')
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'borders.js')
VIEW = box(-14, 47, 14, 63)      # what can be seen at stop 1

units = {f['properties']['NAME']: shape(f['geometry']) for f in json.load(open(os.path.join(CACHE, 'ne_50m_admin_0_map_units.geojson')))['features']}

def rings(geom, tol=.02, min_area=.02):
    geom = geom.intersection(VIEW).simplify(tol, preserve_topology=True)
    polys = [geom] if geom.geom_type == 'Polygon' else list(getattr(geom, 'geoms', []))
    out = []
    for p in polys:
        if p.geom_type != 'Polygon' or p.area < min_area: continue
        out.append([[round(x, 2), round(y, 2)] for x, y in p.exterior.coords[:-1]])
    return out

MODERN = [('Scotland', (-4.6, 57.7)), ('England', (-1.6, 52.6)), ('Wales', (-3.7, 52.3)), ('N. Ireland', (-6.7, 54.65)),
          ('Ireland', (-8.0, 53.2)), ('Isle of Man', None), ('France', (2.4, 48.2)), ('Belgium', None), ('Netherlands', (5.6, 52.3)),
          ('Norway', (8.5, 61.0)), ('Denmark', (9.2, 56.1)), ('Germany', (9.8, 51.0)), ('Faeroe Is.', None)]
NAMES = {'N. Ireland': 'N. Ireland', 'Faeroe Is.': 'Faroe Is.'}
modern = []
for n, lab in MODERN:
    if n == 'Belgium': g = unary_union([units[k] for k in ('Flemish', 'Walloon', 'Brussels')])
    else: g = units[n]
    modern.append(dict(name=NAMES.get(n, n), label=list(lab) if lab else None, rings=rings(g)))

sc = units['Scotland']
isles = box(-3.6, 58.65, 0, 61)          # Orkney and Shetland
ancient = [
    dict(name='KINGDOM OF SCOTLAND', sub='king John Balliol deposed, 1296', color='70,130,230', label=[-4.6, 57.8],
         rings=rings(sc.difference(isles), .03, .05)),
    dict(name='KINGDOM OF ENGLAND', sub='Edward I; Wales conquered 1283', color='220,70,60', label=[-1.9, 52.4],
         rings=rings(unary_union([units['England'], units['Wales']]), .03, .05)),
    dict(name='LORDSHIP OF IRELAND', sub='under the English crown; much held by Irish kings', color='220,130,60', label=[-8.0, 53.2],
         rings=rings(unary_union([units['Ireland'], units['N. Ireland']]), .03, .05)),
    dict(name='NORWAY', sub='Orkney and Shetland', color='200,200,120', label=[-1.9, 59.9], rings=rings(sc.intersection(isles), .02, .005)),
]

# stop 2: today's towns and cities near Stirling (Natural Earth), then the towns of 1297
want = ['Glasgow', 'Edinburgh', 'Perth', 'Dundee', 'Aberdeen', 'Inverness', 'Ayr', 'Dumfries', 'Carlisle',
        'Newcastle', 'Berwick-upon-Tweed', 'Oban', 'Fort William', 'St. Andrews', 'Hawick']   # spaced out enough to read
pp = {}
for f in json.load(open(os.path.join(CACHE, 'ne_10m_populated_places_simple.geojson')))['features']:
    p = f['properties']
    if p.get('adm0name') == 'United Kingdom' and p['name'] in want and p['name'] not in pp:
        pp[p['name']] = (round(p['longitude'], 3), round(p['latitude'], 3), p.get('pop_max') or 0)
missing = [n for n in want if n not in pp]
EXTRA = {'Stirling': (-3.937, 56.117), 'Falkirk': (-3.784, 56.002), 'Berwick-upon-Tweed': (-2.005, 55.771), 'St. Andrews': (-2.795, 56.340),
         'Dunfermline': (-3.452, 56.072), 'Kirkcaldy': (-3.160, 56.110), 'Hawick': (-2.788, 55.422), 'Kilmarnock': (-4.497, 55.611),
         'Fort William': (-5.105, 56.819), 'Oban': (-5.472, 56.415), 'Ayr': (-4.629, 55.458), 'Dumfries': (-3.605, 55.070)}
# where to put each label so close towns don't collide (Stirling itself is the pulsing pin, so it isn't listed)
SIDE = {'Perth': 'l', 'Glasgow': 'l', 'St. Andrews': 'r', 'St Andrews': 'r', 'Edinburgh': 'b', 'Dunbar': 'r', 'Berwick-upon-Tweed': 'r', 'Berwick': 'r', 'Roxburgh': 'b', 'Lanark': 'b', 'Carlisle': 'b', 'Hawick': 'b', 'Newcastle': 'r'}
towns_today = []
for n in want:
    if n in pp: lon, lat, pop = pp[n]
    elif n in EXTRA: lon, lat = EXTRA[n]; pop = 0
    else: continue
    big = n in ('Glasgow', 'Edinburgh', 'Newcastle', 'Aberdeen', 'Dundee')
    towns_today.append(dict(lon=lon, lat=lat, text=n.replace('Berwick-upon-Tweed', 'Berwick'), size=.62 if big else .5, dot=True, **({'side': SIDE[n]} if n in SIDE else {})))
# 1297: royal burghs, castles and churches named in the story (approximate points)
towns_1297 = [
    ('Edinburgh', -3.200, 55.949, 'castle'), ('Berwick', -2.005, 55.771, 'sacked 1296'),
    ('Perth', -3.437, 56.395, 'Scone, where kings were crowned, is just north'), ('Dundee', -2.971, 56.462, 'burgh'),
    ('Dunbar', -2.516, 56.001, 'Scots defeated 1296'), ('Roxburgh', -2.452, 55.596, 'castle'), ('Lanark', -3.778, 55.673, 'Wallace’s rising'),
    ('Glasgow', -4.252, 55.864, 'bishop’s seat'),
    ('Aberdeen', -2.094, 57.150, 'burgh'), ('Inverness', -4.225, 57.478, 'castle'), ('Carlisle', -2.933, 54.892, 'English castle'),
    ('Newcastle', -1.618, 54.978, 'English town'), ('St Andrews', -2.795, 56.340, 'cathedral'),
]
KEEP_SUB = {'Stirling', 'Berwick', 'Dunbar', 'Lanark', 'Carlisle'}   # the rest without captions, so the central belt stays readable
towns_then = [dict(lon=lo, lat=la, text=n, sub=s if n in KEEP_SUB else '', size=.55 if n in ('Edinburgh', 'Berwick', 'Perth') else .48, dot=True, **({'side': SIDE[n]} if n in SIDE else {})) for n, lo, la, s in towns_1297]

js = ('/* Overlays for the opening globe dive, made by tools/make-borders.py.\n'
      '   Stop 1: modern = today\'s countries (Natural Earth admin-0 map units, public domain); ancient = APPROXIMATE realms of 1297\n'
      '   built from those shapes (Scotland without Orkney and Shetland, England with Wales, the lordship of Ireland). A reconstruction.\n'
      '   Stop 2: townsToday = today\'s towns and cities (Natural Earth populated places); townsThen = towns and castles of 1297. */\n'
      'window.BATTLE_BORDERS = ' + json.dumps(dict(modern=modern, ancient=ancient, townsToday=towns_today, townsThen=towns_then), separators=(',', ':'), ensure_ascii=False) + ';\n')
open(OUT, 'w').write(js)
print('wrote', OUT, len(js) // 1024, 'KB; towns today', len(towns_today), 'missing from Natural Earth:', missing)
