#!/usr/bin/env python3
"""Sekigahara: border and town overlays for the opening globe dive (writes sekigahara/borders.js).
Stop 1: today's countries (Natural Earth admin-0 map units, public domain), then Japan in 1600 (one country, divided
between the two coalitions; no reliable domain map is drawn). Stop 2: today's cities, then the castles of 1600."""
import json, os
from shapely.geometry import shape, box
CACHE = os.path.expanduser('~/.cache/talas-dem'); OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'borders.js')
VIEW = box(122, 24, 150, 46)
units = {f['properties']['NAME']: shape(f['geometry']) for f in json.load(open(os.path.join(CACHE, 'ne_50m_admin_0_map_units.geojson')))['features']}
def rings(g, tol=.03, a=.02):
    g = g.intersection(VIEW).simplify(tol, preserve_topology=True); ps = [g] if g.geom_type == 'Polygon' else list(getattr(g, 'geoms', []))
    return [[[round(x, 2), round(y, 2)] for x, y in p.exterior.coords[:-1]] for p in ps if p.geom_type == 'Polygon' and p.area >= a]
modern = [dict(name=n, label=lab, rings=rings(units[n])) for n, lab in [('Japan', [138.5, 36.6]), ('South Korea', [127.9, 36.4]), ('North Korea', [127.0, 40.0]), ('China', [123.5, 30.5]), ('Russia', [134.0, 45.0])] if n in units]
ancient = [dict(name='JAPAN, 1600', sub='two coalitions after the death of Hideyoshi', color='233,199,122', label=[138.2, 36.2], rings=rings(units['Japan'], .03, .05)),
           dict(name='JOSEON KOREA', sub='invaded by Hideyoshi, 1592–98', color='170,170,170', label=[127.6, 37.5], rings=rings(units['South Korea'].union(units['North Korea']), .03, .05))]
T = lambda n, lo, la, s=.5, sd=None, sub='': dict(lon=lo, lat=la, text=n, size=s, dot=True, **({'side': sd} if sd else {}), **({'sub': sub} if sub else {}))
towns_today = [T('Nagoya', 136.906, 35.181, .62, 'r'), T('Gifu', 136.761, 35.423, .55, 'r'), T('Ōgaki', 136.613, 35.359, .5, 'b'), T('Kyoto', 135.768, 35.011, .62, 'l'),
               T('Osaka', 135.502, 34.694, .62, 'l'), T('Hikone', 136.259, 35.274, .5, 'l'), T('Tsu', 136.509, 34.718, .45, 'b')]
towns_then = [T('Ōgaki Castle', 136.613, 35.359, .5, 'b', 'the Western army’s base'), T('Gifu Castle', 136.761, 35.423, .5, 'r', 'taken by the East'),
              T('Kiyosu', 136.840, 35.217, .45, 'r', 'Eastern base'), T('Sawayama Castle', 136.272, 35.282, .45, 'l', 'Ishida’s castle'),
              T('Fushimi Castle', 135.773, 34.936, .48, 'b', 'fell to the West'), T('Kyoto', 135.768, 35.011, .55, 'l'),
              T('Osaka Castle', 135.526, 34.687, .55, 'l', 'Mōri Terumoto and the boy Hideyori')]
js = ('/* Overlays for the opening globe dive, made by tools/make-borders.py. modern: today\'s countries (Natural Earth, public domain);\n'
      '   ancient: Japan and Korea in 1600; townsToday / townsThen: today\'s cities and the castles of 1600. */\n'
      'window.BATTLE_BORDERS = ' + json.dumps(dict(modern=modern, ancient=ancient, townsToday=towns_today, townsThen=towns_then), separators=(',', ':'), ensure_ascii=False) + ';\n')
open(OUT, 'w').write(js); print('wrote', len(js) // 1024, 'KB')
