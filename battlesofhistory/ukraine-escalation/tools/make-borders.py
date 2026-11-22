#!/usr/bin/env python3
"""Borders for the slides, 1991-2014: Ukraine (with Crimea and Sevastopol), Russia, Belarus, Moldova, Georgia, from Natural
Earth 1:50m map units (public domain), simplified. Natural Earth draws Crimea inside Russia (its de facto view since 2014);
for this page's years the Crimean polygon is moved back to Ukraine. Writes borders.js (window.UKRESC_BORDERS: name -> list
of rings of [lat, lon])."""
import json, os
CACHE = os.path.expanduser('~/.cache/talas-dem'); HERE = os.path.dirname(os.path.abspath(__file__))
def inside(pt, ring):
    x, y = pt; c = False
    for i in range(len(ring)):
        x1, y1 = ring[i]; x2, y2 = ring[i - 1]
        if (y1 > y) != (y2 > y) and x < (x2 - x1) * (y - y1) / (y2 - y1) + x1: c = not c
    return c
def simplify(r, tol=.02):
    out = [r[0]]
    for p in r[1:]:
        if abs(p[0] - out[-1][0]) + abs(p[1] - out[-1][1]) >= tol: out.append(p)
    return out
d = json.load(open(os.path.join(CACHE, 'ne_50m_admin_0_map_units.geojson'))); B = {}
for f in d['features']:
    n = f['properties'].get('NAME')
    if n not in ('Ukraine', 'Russia', 'Belarus', 'Moldova', 'Georgia'): continue
    g = f['geometry']; polys = g['coordinates'] if g['type'] == 'MultiPolygon' else [g['coordinates']]
    for poly in polys:
        ring = poly[0]
        if n == 'Russia' and max(x for x, y in ring) < 70 and min(x for x, y in ring) > 20 and inside((34.10, 44.95), ring): key = 'Ukraine'   # Crimea
        elif n == 'Russia' and min(x for x, y in ring) > 60: continue   # Asia: far off every slide
        else: key = n
        B.setdefault(key, []).append([[round(y, 3), round(x, 3)] for x, y in simplify(ring)])
open(os.path.join(HERE, '..', 'borders.js'), 'w').write('/* Made by tools/make-borders.py: Natural Earth 1:50m (public domain); Crimea with Ukraine, 1991-2014. */\nwindow.UKRESC_BORDERS = ' + json.dumps(B, separators=(',', ':')) + ';\n')
print({k: (len(v), sum(len(r) for r in v)) for k, v in B.items()})
