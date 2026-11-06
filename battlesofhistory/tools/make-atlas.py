#!/usr/bin/env python3
"""The Atlas (atlas.html): every map of every battle in one place. Run after adding a map:
    python3 battlesofhistory/tools/make-atlas.py
Finds the map pictures in each battle's images/ folder (terrain*, map*, *campaign*, *region*, *continent*, *establish*
and numbered record pictures with 'map' in the name), takes each one's description and credit from the line that names it
in that battle's images/README.md, and writes atlas-info.js."""
import json, os, re
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
src = open(os.path.join(ROOT, 'battles.js'), encoding='utf-8').read()
cards = re.findall(r"folder: '([a-z]+)'.*?title: '([^']+)'.*?year: (-?\d+).*?status: '([^']+)'", src, re.S)
NAMES = {'terrain': 'Battle map', 'terrain-battle': 'Battle map', 'terrain-campaign': 'Campaign map', 'terrain-region': 'Region map',
         'terrain-continent': 'Continent map', 'terrain-approach': 'The approach', 'terrain-bridges': 'The bridges'}
def nice(f):
    b = os.path.splitext(f)[0]
    if b in NAMES: return NAMES[b]
    b = re.sub(r'^\d+-', '', b); m = re.match(r'establish-[0-9a-z]+-(.*)', b)
    if m: b = 'Opening view: ' + m.group(1)
    b = b.replace('-', ' ').replace('_', ' ')
    return b[:1].upper() + b[1:]
items = []
for folder, title, year, status in cards:
    d = os.path.join(ROOT, folder, 'images')
    if not os.path.isdir(d): continue
    readme = open(os.path.join(d, 'README.md'), encoding='utf-8').read() if os.path.exists(os.path.join(d, 'README.md')) else ''
    for f in sorted(os.listdir(d)):
        if not re.search(r'\.(jpe?g|png|webp)$', f, re.I) or 'draft' in f or 'nosmoke' in f or '-clean' in f or f.endswith('-glow.jpg'): continue
        if not re.search(r'terrain|^map|-map|map-|campaign|region|continent|establish|atlas', f, re.I): continue
        line = next((l for l in readme.splitlines() if f in l), '')
        cells = [c.strip() for c in line.strip().strip('|').split('|')] if line.startswith('|') else []
        cells = [c for c in cells if c and c != f and not re.fullmatch(r'\d+', c)]
        what = cells[0] if cells else ''; credit = cells[-1] if len(cells) > 1 else ''
        made = bool(re.search(r'AI-generated|Original illustration|for this project|made for this', line, re.I)) or f.startswith(('terrain', 'map1', 'map2', 'map3', 'map-japan', 'establish')) or '-art-map' in f or f.startswith('art-map')
        items.append({'battle': folder, 'battleTitle': title, 'year': int(year), 'status': status, 'file': folder + '/images/' + f,
                      'title': nice(f), 'what': what, 'credit': credit, 'kind': 'game' if made else 'historical'})
items.sort(key=lambda i: (i['year'], i['battle'], i['kind'] != 'game', i['title']))
open(os.path.join(ROOT, 'atlas-info.js'), 'w', encoding='utf-8').write('// Made by tools/make-atlas.py: do not edit by hand.\nwindow.BH_ATLAS = ' + json.dumps(items, ensure_ascii=False, indent=0) + ';\n')
print(len(items), 'maps from', len({i['battle'] for i in items}), 'battles')
