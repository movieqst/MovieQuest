#!/usr/bin/env python3
"""Vukovar: the CIA's dated front lines and attack arrows (research/cia-lines.geojson, from tools/trace-cia-map.py) as
lines.js for the page: window.VUKOVAR_LINES = { fronts: { sep14|sep30|nov10: [part, ...] }, arrows: { key: [arrow, ...] } },
every point [lon, lat]. The engine draws them over the map that is showing (S.geo gives each map's corners).
    python3 battlesofhistory/vukovar/tools/make-lines.py"""
import json, os, re
HERE = os.path.dirname(os.path.abspath(__file__)); V = os.path.join(HERE, '..')
F = json.load(open(os.path.join(V, 'research', 'cia-lines.geojson')))['features']
KEY = {'14 September': 'sep14', '30 September': 'sep30', '10 November': 'nov10', '16 October': 'oct16', '3 November': 'nov3', '8 November': 'nov8'}
def key(d):
    for k, v in KEY.items():
        if d.startswith(k): return v
    return 'undated'
out = {'fronts': {}, 'arrows': {}}
for f in F:
    p, c = f['properties'], [[round(x, 5), round(y, 5)] for x, y in f['geometry']['coordinates']]
    if p['kind'] == 'front line': out['fronts'].setdefault(key(p['date']), []).append(c)
    else: out['arrows'].setdefault(key(p['date']), []).append(c)
js = ('/* The CIA\'s front lines and attack arrows for Vukovar 1991 (Balkan Battlegrounds vol. I, map 2, public domain), traced and\n'
      '   georeferenced by tools/trace-cia-map.py; written by tools/make-lines.py. [lon, lat] points. */\n'
      'window.VUKOVAR_LINES = ' + json.dumps(out, separators=(',', ':')) + ';\n')
open(os.path.join(V, 'lines.js'), 'w').write(js)
print({k: len(v) for k, v in out['fronts'].items()}, {k: len(v) for k, v in out['arrows'].items()})
