#!/usr/bin/env python3
"""Operation Midnight Hammer: OpenStreetMap roads, streams and place names around the Fordow site, written to
tools/osm-fordow.json for tools/draw-maps.py (the Fordow map only; the larger maps use Natural Earth).
    python3 battlesofhistory/midnight-hammer/tools/fetch-osm.py CACHE_DIR
OSM data (c) OpenStreetMap contributors, ODbL. Downloads 0.05-degree tiles from the OSM API (generic client name)."""
import os, sys, json, time, urllib.request, xml.etree.ElementTree as ET
HERE = os.path.dirname(os.path.abspath(__file__)); CACHE = sys.argv[1]
LA0, LA1, LO0, LO1 = 34.84, 34.93, 50.93, 51.07
def get(b, name):
    f = os.path.join(CACHE, name + '.osm')
    if not os.path.exists(f):
        url = 'https://api.openstreetmap.org/api/0.6/map?bbox=%.4f,%.4f,%.4f,%.4f' % b
        req = urllib.request.Request(url, headers={'User-Agent': 'history-map-builder/1.0'})
        try: data = urllib.request.urlopen(req, timeout=120).read()
        except Exception as e:
            print('split', name, e); x0, y0, x1, y1 = b; dx, dy = (x1 - x0) / 3, (y1 - y0) / 3
            return [p for i in range(3) for j in range(3) for p in get((x0 + i * dx, y0 + j * dy, x0 + (i + 1) * dx, y0 + (j + 1) * dy), f'{name}-{i}{j}')]
        open(f, 'wb').write(data); time.sleep(1)
    return [f]
files = []
n = 0
lo = LO0
while lo < LO1 - 1e-9:
    la = LA0
    while la < LA1 - 1e-9:
        files += get((lo, la, min(lo + .05, LO1), min(la + .05, LA1)), 'fordow-%02d' % n); n += 1; la += .05
    lo += .05
nodes, ways, places = {}, {}, {}
for f in files:
    r = ET.parse(f).getroot()
    for nd in r.iter('node'):
        nodes[nd.get('id')] = (float(nd.get('lat')), float(nd.get('lon')))
        t = {x.get('k'): x.get('v') for x in nd.iter('tag')}
        if t.get('place') in ('town', 'village', 'hamlet', 'suburb', 'isolated_dwelling') and t.get('name'): places[nd.get('id')] = (t['name'], t['place'])
    for w in r.iter('way'):
        t = {x.get('k'): x.get('v') for x in w.iter('tag')}
        ways[w.get('id')] = ([x.get('ref') for x in w.iter('nd')], t)
out = {'roads': [], 'water': [], 'rail': [], 'runway': [], 'places': []}
for wid, (refs, t) in ways.items():
    p = [nodes[x] for x in refs if x in nodes]
    if len(p) < 2: continue
    p = [[round(a, 6), round(b, 6)] for a, b in p]
    if 'highway' in t: out['roads'].append({'k': t['highway'], 'p': p})
    elif t.get('waterway') in ('river', 'stream', 'canal'): out['water'].append({'k': t['waterway'], 'p': p, 'closed': False})
    elif t.get('natural') == 'water' or t.get('landuse') == 'reservoir': out['water'].append({'k': 'water', 'p': p, 'closed': refs[0] == refs[-1]})
    elif t.get('railway') == 'rail': out['rail'].append({'k': 'rail', 'p': p})
for nid, (name, kind) in places.items(): la, lo = nodes[nid]; out['places'].append({'name': name, 'k': kind, 'lat': la, 'lon': lo})
json.dump({'fordow': out}, open(os.path.join(HERE, 'osm-fordow.json'), 'w'), separators=(',', ':'))
print('roads', len(out['roads']), 'water', len(out['water']), 'rail', len(out['rail']), 'places', len(out['places']))
