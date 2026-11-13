#!/usr/bin/env python3
"""Vimy Ridge: border and town overlays for the opening globe dive (writes vimy/borders.js).
    python3 battlesofhistory/vimy/tools/make-borders.py
Stop 1 (high up): today's countries (Natural Earth admin-0 map units, public domain), then April 1917: the Western Front
   (approximate trace, Nieuport to the Swiss border, after the German withdrawal to the Hindenburg Line in March 1917),
   German-occupied France and Belgium, unoccupied France, the United Kingdom, neutral Netherlands and Switzerland.
Stop 2 (lower): today's towns and cities, then the towns of 1917 behind each side's lines.
Needs ~/.cache/talas-dem/ne_50m_admin_0_map_units.geojson (github.com/nvkelso/natural-earth-vector, geojson/)."""
import json, os
from shapely.geometry import shape, box, Polygon, LineString
from shapely.ops import unary_union, split
CACHE = os.path.expanduser('~/.cache/talas-dem')
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'borders.js')
VIEW = box(-8, 42, 16, 56)
units = {f['properties']['NAME']: shape(f['geometry']) for f in json.load(open(os.path.join(CACHE, 'ne_50m_admin_0_map_units.geojson')))['features']}

def rings(geom, tol=.03, min_area=.03):
    geom = geom.intersection(VIEW).simplify(tol, preserve_topology=True)
    polys = [geom] if geom.geom_type == 'Polygon' else list(getattr(geom, 'geoms', []))
    return [[[round(x, 2), round(y, 2)] for x, y in p.exterior.coords[:-1]] for p in polys if p.geom_type == 'Polygon' and p.area >= min_area]

MODERN = [('France', (2.4, 47.0)), ('Belgium', (4.6, 50.6)), ('Netherlands', (5.6, 52.3)), ('Germany', (9.8, 51.0)), ('Luxembourg', None),
          ('Switzerland', (8.2, 46.8)), ('England', (-1.6, 52.6)), ('Wales', None), ('Scotland', None), ('Italy', None), ('Spain', None), ('Austria', None)]
modern = []
for n, lab in MODERN:
    g = unary_union([units[k] for k in ('Flemish', 'Walloon', 'Brussels')]) if n == 'Belgium' else units[n]
    modern.append(dict(name=n, label=list(lab) if lab else None, rings=rings(g)))

# The Western Front in April 1917 (approximate trace from period maps): Nieuport - Ypres - Armentieres - Lens/Vimy - Arras -
# the Hindenburg Line (St-Quentin) - Soissons - Reims - the Argonne - Verdun - St-Mihiel - Pont-a-Mousson - the Vosges - Swiss border.
FRONT = [(2.75, 51.15), (2.88, 50.95), (2.90, 50.85), (2.95, 50.75), (2.90, 50.62), (2.80, 50.45), (2.76, 50.36), (2.78, 50.28),
         (2.90, 50.15), (3.05, 50.05), (3.20, 49.90), (3.25, 49.80), (3.30, 49.60), (3.40, 49.45), (3.55, 49.40), (3.90, 49.32),
         (4.10, 49.25), (4.50, 49.20), (4.90, 49.20), (5.30, 49.20), (5.45, 49.05), (5.55, 48.90), (5.70, 48.85), (6.00, 48.90),
         (6.20, 48.80), (6.50, 48.60), (6.90, 48.45), (7.05, 48.20), (7.15, 47.90), (7.20, 47.60), (7.15, 47.49)]
fr, be, lu = units['France'], unary_union([units[k] for k in ('Flemish', 'Walloon', 'Brussels')]), units['Luxembourg']
# the occupied side: everything north and east of the front, closed round the far side of Belgium
east = Polygon(FRONT + [(9, 47.49), (9, 52), (2.75, 52)])
occupied = unary_union([fr.intersection(east), be.difference(box(2.5, 50.75, 2.88, 51.2).intersection(Polygon([(2.4, 51.2), (2.75, 51.15), (2.88, 50.95), (2.90, 50.80), (2.4, 50.8)]))), lu])
free_fr = fr.difference(east)
ancient = [
    dict(name='FRANCE', sub='still free', color='70,130,230', label=[1.6, 47.3], rings=rings(free_fr, .03, .05)),
    dict(name='OCCUPIED BY GERMANY', sub='northern France, Belgium, Luxembourg', color='170,170,170', label=[4.4, 50.0], rings=rings(occupied, .03, .02)),
    dict(name='GERMAN EMPIRE', sub='', color='220,70,60', label=[9.6, 50.6], rings=rings(units['Germany'], .03, .05)),
    dict(name='UNITED KINGDOM', sub='', color='220,130,60', label=[-1.6, 52.6], rings=rings(unary_union([units['England'], units['Wales'], units['Scotland']]), .03, .05)),
    dict(name='NETHERLANDS', sub='neutral', color='200,200,120', label=[5.7, 52.4], rings=rings(units['Netherlands'], .03, .05)),
    dict(name='SWITZERLAND', sub='neutral', color='200,200,120', label=[8.2, 46.85], rings=rings(units['Switzerland'], .03, .05)),
]
front = dict(name='THE WESTERN FRONT', line=[[x, y] for x, y in FRONT], color='255,80,60', label=[3.6, 49.6])

towns_today = [dict(lon=lo, lat=la, text=n, size=s, dot=True, **({'side': sd} if sd else {})) for n, lo, la, s, sd in [
    ('Arras', 2.7818, 50.2910, .62, 'b'), ('Lens', 2.8319, 50.4320, .62, 'r'), ('Liévin', 2.7787, 50.4220, .5, 'l'), ('Lille', 3.0573, 50.6292, .62, None),
    ('Douai', 3.0800, 50.3700, .55, 'r'), ('Béthune', 2.6400, 50.5300, .5, 'l'), ('Hénin-Beaumont', 2.9500, 50.4180, .45, 'r'),
    ('Saint-Pol', 2.3360, 50.3810, .45, 'l'), ('Doullens', 2.3410, 50.1570, .45, 'b'), ('Cambrai', 3.2350, 50.1760, .5, 'r')]]
towns_then = [dict(lon=lo, lat=la, text=n, sub=sub, size=s, dot=True, **({'side': sd} if sd else {})) for n, lo, la, s, sub, sd in [
    ('Arras', 2.7818, 50.2910, .58, 'British, 3 km behind the front', 'b'), ('Lens', 2.8319, 50.4320, .58, 'German-held', 'r'),
    ('Douai', 3.0800, 50.3700, .52, 'German-held', 'r'), ('Lille', 3.0573, 50.6292, .58, 'German-held since 1914', None),
    ('Béthune', 2.6400, 50.5300, .5, '', 'l'), ('Camblain-l’Abbé', 2.6390, 50.3720, .45, 'Canadian Corps HQ', 'l'), ('Cambrai', 3.2350, 50.1760, .48, 'German-held', 'r')]]

js = ('/* Overlays for the opening globe dive, made by tools/make-borders.py.\n'
      '   Stop 1: modern = today\'s countries (Natural Earth admin-0 map units, public domain); ancient = April 1917: occupied\n'
      '   and free France, the German Empire, neutral states, and the Western Front (an approximate trace). A reconstruction.\n'
      '   Stop 2: townsToday = today\'s towns; townsThen = the towns of 1917 and which side held them. */\n'
      'window.BATTLE_BORDERS = ' + json.dumps(dict(modern=modern, ancient=ancient, front=front, townsToday=towns_today, townsThen=towns_then), separators=(',', ':'), ensure_ascii=False) + ';\n')
open(OUT, 'w').write(js)
print('wrote', OUT, len(js) // 1024, 'KB')
