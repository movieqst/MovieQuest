#!/usr/bin/env python3
"""Scotland 1297: the campaign map for Stirling Bridge, from REAL elevation (AWS terrain tiles via the Talas tools),
sea from the elevation, rivers and lakes from Natural Earth (public domain, cached in ~/.cache/talas-dem).
    python3 battlesofhistory/stirling/tools/draw-scotland-map.py
Outputs to stirling/images/layout/: scotland-guide.png (labels, routes, 1296-97 events), scotland-base.png (terrain
only, for ChatGPT to repaint), and adds the frame to maps.json."""
import json, math, os, sys
import numpy as np
from PIL import Image, ImageDraw
HERE = os.path.dirname(os.path.abspath(__file__)); TT = os.path.join(HERE, '..', '..', 'talas', 'tools')
sys.path.insert(0, TT)
src = open(os.path.join(TT, 'draw-layout-guides.py')).read().split('# ---------- places (lat, lon) ----------')[0]
G = {'__file__': os.path.join(TT, 'draw-layout-guides.py')}; exec(compile(src, 'dlg', 'exec'), G)
OUT = os.path.join(HERE, '..', 'images', 'layout'); G['OUT'] = OUT
Guide, F, RED, BLUE, BLACK, GREY, ORANGE, PURPLE, WATER, WHITE = (G[k] for k in ('Guide', 'F', 'RED', 'BLUE', 'BLACK', 'GREY', 'ORANGE', 'PURPLE', 'WATER', 'WHITE'))
W, H = G['W'], G['H']; CACHE = G['CACHE']
G['RAMP'][:] = [(-1, (96, 140, 180)), (0, (150, 178, 120)), (100, (170, 186, 126)), (250, (184, 182, 128)), (450, (166, 150, 112)), (700, (140, 126, 104)), (1000, (150, 146, 142)), (1300, (230, 230, 232))]

LAT0, LAT1, LON0, LON1 = 54.6, 58.0, -7.6, 0.5
g = Guide('scotland-guide.png', LAT0, LAT1, LON0, LON1, 8, None, None)
# sea: Natural Earth land-50m (world-atlas TopoJSON); the elevation tiles fill in some firths
LAND50 = os.environ.get('LAND50', os.path.expanduser('~/.cache/talas-dem/land-50m.json'))
def topo_polys(path):
    t = json.load(open(path)); sc, tr = t['transform']['scale'], t['transform']['translate']; arcs = []
    for a in t['arcs']:
        x = y = 0; pts = []
        for dx, dy in a: x += dx; y += dy; pts.append((x * sc[0] + tr[0], y * sc[1] + tr[1]))
        arcs.append(pts)
    ring = lambda ids: [p for i in ids for p in (arcs[i] if i >= 0 else arcs[~i][::-1])]
    for geo in t['objects']['land']['geometries']:
        for poly in (geo['arcs'] if geo['type'] == 'MultiPolygon' else [geo['arcs']]): yield [ring(r) for r in poly]
lm = Image.new('L', (W, H), 0); dl = ImageDraw.Draw(lm)
for poly in topo_polys(LAND50):
    for k, r in enumerate(poly):
        if any(LON0 - 3 < x < LON1 + 3 and LAT0 - 3 < y < LAT1 + 3 for x, y in r): dl.polygon(g.P([(y, x) for x, y in r]), fill=0 if k else 255)
sea = (np.asarray(lm) < 128) | (g.e <= 0.5) & (np.asarray(lm) < 128)
rgb = g.rgb.copy(); rgb[sea] = (88, 132, 172)
g.im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); g.d = ImageDraw.Draw(g.im)
g.lakes(os.path.join(CACHE, 'ne_10m_lakes.geojson'))
g.geojson_lines(os.path.join(CACHE, 'ne_rivers.geojson'), WATER, 4)
g.im.save(os.path.join(OUT, 'scotland-base.png'), optimize=True)

P = {   # (lat, lon)
 'Stirling': (56.1236, -3.9465), 'Berwick': (55.7710, -2.0050), 'Dunbar': (56.0010, -2.5160), 'Edinburgh': (55.9486, -3.1999),
 'Lanark': (55.6730, -3.7780), 'Perth': (56.3950, -3.4370), 'Scone': (56.4210, -3.4050), 'Dundee': (56.4620, -2.9707),
 'Aberdeen': (57.1497, -2.0943), 'Inverness': (57.4778, -4.2247), 'Avoch': (57.5690, -4.1700), 'Urquhart': (57.3240, -4.4430),
 'Elgin': (57.6490, -3.3180), 'Banff': (57.6650, -2.5230), 'Glasgow': (55.8642, -4.2518), 'Dumbarton': (55.9440, -4.5700),
 'Ayr': (55.4580, -4.6290), 'Roxburgh': (55.5960, -2.4520), 'Jedburgh': (55.4780, -2.5540), 'Falkirk': (56.0019, -3.7839),
 'Haddington': (55.9560, -2.7810), 'Carlisle': (54.8920, -2.9330), 'Hexham': (54.9710, -2.1010), 'Newcastle': (54.9783, -1.6178),
 'Alnwick': (55.4130, -1.7060), 'Dumfries': (55.0700, -3.6050), 'Selkirk': (55.5480, -2.8390), 'Dunstaffnage': (56.4510, -5.4380),
}
g.line([P['Berwick'], P['Roxburgh'], P['Selkirk'], (55.80, -3.25), P['Edinburgh'], P['Falkirk'], P['Stirling']], RED, 7, dash=20)
g.text(55.46, -1.45, "Surrey's English army\nmarches north, Sept 1297\n(route reconstructed)", RED, 24, True)
g.line([P['Stirling'], P['Perth'], P['Dundee']], BLUE, 6, dash=16)
for n in ('Avoch', 'Urquhart', 'Inverness', 'Elgin', 'Banff', 'Aberdeen'):   # attacks on English garrisons across the north
    x, y = g.xy(*P[n]); g.d.ellipse([x - 22, y - 22, x + 22, y + 22], outline=BLUE, width=5)
g.arrow([(57.15, -3.6), (56.85, -3.6), P['Perth'], P['Stirling']], BLUE, '', 6)
g.text(57.05, -3.25, "Moray's rising: attacks on English garrisons\nacross the north (blue rings); route south approximate", BLUE, 24, True)
g.arrow([P['Lanark'], (55.85, -3.90), P['Stirling']], BLUE, '', 6)
g.text(55.62, -4.55, "Wallace's rising\n(Lanark, May 1297)", BLUE, 24, True)
g.ring(*P['Stirling'], 12, '', RED)
g.d.text((g.xy(*P['Stirling'])[0] - 60, g.xy(*P['Stirling'])[1] - 30), 'STIRLING BRIDGE', fill=RED, font=F(30, True), anchor='rb', stroke_width=4, stroke_fill=WHITE)
g.d.text((g.xy(*P['Stirling'])[0] - 60, g.xy(*P['Stirling'])[1] + 2), '11 Sept 1297: the crossing to the north', fill=RED, font=F(22, True), anchor='rb', stroke_width=4, stroke_fill=WHITE)
for n, sub, dy in [('Berwick', 'sacked by Edward I, Mar 1296', -28), ('Dunbar', 'Scots defeated, Apr 1296', -28), ('Roxburgh', 'English muster, July 1297', 26),
               ('Haddington', 'Lübeck letter, 11 Oct 1297', 26), ('Scone', 'the Stone taken to England, 1296', -28), ('Falkirk', 'Wallace defeated, July 1298', 26)]:
    g.town(*P[n], n, sub, 24, BLACK, 9, dy)
g.town(*P['Perth'], 'Perth', '', 22, GREY, 7, 24); g.town(*P['Banff'], 'Banff', '', 22, GREY, 7, -24)
for n in ('Edinburgh', 'Dundee', 'Aberdeen', 'Inverness', 'Elgin', 'Glasgow', 'Dumbarton', 'Ayr', 'Lanark', 'Dumfries', 'Carlisle', 'Avoch', 'Urquhart'):
    g.town(*P[n], n, '', 22, GREY, 7, -24)
g.arrow([P['Stirling'], (55.60, -3.10), P['Carlisle']], PURPLE, '', 5)
g.arrow([(55.60, -3.10), P['Hexham'], P['Newcastle']], PURPLE, '', 5)
g.text(55.15, -2.20, "the Scots raid northern England\n(Oct-Nov 1297; routes illustrative)", PURPLE, 22, True)
g.town(*P['Hexham'], 'Hexham', '', 22, GREY, 7, 24); g.town(*P['Newcastle'], 'Newcastle', '', 22, GREY, 7, 24)
g.text(57.0, -6.4, 'HIGHLANDS', GREY, 34, True); g.text(55.35, -3.4, 'SOUTHERN UPLANDS', GREY, 28, True)
g.text(56.13, -2.95, 'Firth of Forth', BLUE, 24, True); g.text(56.75, -1.4, 'NORTH SEA', BLUE, 32, True)
g.text(55.0, -1.0, 'ENGLAND', RED, 34, True); g.text(57.6, -1.5, 'SCOTLAND', BLUE, 34, True)
g.frame('SCOTLAND, 1296-1297: the road to Stirling Bridge', 'Sea and terrain from elevation; rivers and lakes Natural Earth. Routes approximate.', 1)
M = json.load(open(os.path.join(OUT, 'maps.json'))); M = [m for m in M if m['file'] != 'scotland-guide.png'] + [g.save()]
json.dump(M, open(os.path.join(OUT, 'maps.json'), 'w'), indent=1)
print('done')
