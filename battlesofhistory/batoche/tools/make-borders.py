#!/usr/bin/env python3
"""Batoche: border and town overlays for the opening globe dive (writes batoche/borders.js).
Stop 1: today's Canada and United States (Natural Earth admin-0 map units, public domain), then Canada in 1885 (the
Dominion; the North-West Territories are not drawn as a separate shape). Stop 2: today's towns, then the places of 1885."""
import json, os
from shapely.geometry import shape, box
CACHE = os.path.expanduser('~/.cache/talas-dem'); OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'borders.js')
VIEW = box(-142, 36, -50, 74)
units = {f['properties']['NAME']: shape(f['geometry']) for f in json.load(open(os.path.join(CACHE, 'ne_50m_admin_0_map_units.geojson')))['features'] if f.get('geometry')}
def rings(g, tol=.08, a=.5):
    g = g.intersection(VIEW).simplify(tol, preserve_topology=True); ps = [g] if g.geom_type == 'Polygon' else list(getattr(g, 'geoms', []))
    return [[[round(x, 2), round(y, 2)] for x, y in p.exterior.coords[:-1]] for p in ps if p.geom_type == 'Polygon' and p.area >= a]
us = [k for k in units if k.startswith('United States')]
modern = [dict(name='Canada', label=[-100, 58], rings=rings(units['Canada']))] + [dict(name='United States', label=[-100, 42], rings=rings(units[k])) for k in us[:1]]
ancient = [dict(name='CANADA, 1885', sub='the Dominion; the North-West Territories governed from Ottawa', color='233,199,122', label=[-101, 57], rings=rings(units['Canada'], .1, 1))]
T = lambda n, lo, la, s=.5, sd=None, sub='': dict(lon=lo, lat=la, text=n, size=s, dot=True, **({'side': sd} if sd else {}), **({'sub': sub} if sub else {}))
towns_today = [T('Saskatoon', -106.67, 52.13, .6, 'l'), T('Prince Albert', -105.75, 53.20, .55, 'r'), T('Regina', -104.61, 50.45, .55, 'r'), T('Batoche', -106.118, 52.753, .5, 'r')]
towns_then = [T('Batoche', -106.118, 52.753, .55, 'r', 'the Métis village'), T('Duck Lake', -106.27, 52.82, .45, 'l', 'fight of 26 March'),
              T("Fort Carlton", -106.53, 52.87, .45, 'l', 'NWMP and HBC post'), T('Prince Albert', -105.75, 53.20, .45, 'r'),
              T("Qu'Appelle", -103.88, 50.54, .45, 'r', 'the railway; Middleton starts here')]
js = ('/* Overlays for the opening globe dive, made by tools/make-borders.py. modern: today\'s countries (Natural Earth, public domain);\n'
      '   ancient: Canada in 1885; townsToday / townsThen: today\'s towns and the places of 1885. */\n'
      'window.BATTLE_BORDERS = ' + json.dumps(dict(modern=modern, ancient=ancient, townsToday=towns_today, townsThen=towns_then), separators=(',', ':'), ensure_ascii=False) + ';\n')
open(OUT, 'w').write(js); print('wrote', len(js) // 1024, 'KB', [m['name'] for m in modern])
