#!/usr/bin/env python3
"""Sekigahara maps from REAL elevation (AWS terrain tiles via the Talas tools); sea from Natural Earth land-50m.
    python3 battlesofhistory/sekigahara/tools/draw-layout-guides.py
Outputs to sekigahara/images/layout/:
  japan-guide.png / japan-base.png    Japan 1600, the campaign (Aizu, Edo, Ueda, Fushimi, Gifu, Ogaki, Osaka ...)
  battle-guide.png / battle-base.png  the valley of Sekigahara, with the traditional camp sites
  maps.json                           the frames' corners
Camp sites: the traditional sites as marked today (RESEARCH.md §3); several coordinates are estimates (marked ~)."""
import json, math, os, sys
import numpy as np
from PIL import Image, ImageDraw
HERE = os.path.dirname(os.path.abspath(__file__)); TT = os.path.join(HERE, '..', '..', 'talas', 'tools')
sys.path.insert(0, TT)
src = open(os.path.join(TT, 'draw-layout-guides.py')).read().split('# ---------- places (lat, lon) ----------')[0]
src = src.replace("('%.2f°E' if step < 1", "('%.3f°E' if step < .02 else '%.2f°E' if step < 1").replace("('%.2f°N' if step < 1", "('%.3f°N' if step < .02 else '%.2f°N' if step < 1")
G = {'__file__': os.path.join(TT, 'draw-layout-guides.py')}; exec(compile(src, 'dlg', 'exec'), G)
OUT = os.path.join(HERE, '..', 'images', 'layout'); G['OUT'] = OUT
Guide, F, RED, BLUE, BLACK, GREY, ORANGE, PURPLE, WATER, WHITE = (G[k] for k in ('Guide', 'F', 'RED', 'BLUE', 'BLACK', 'GREY', 'ORANGE', 'PURPLE', 'WATER', 'WHITE'))
W, H = G['W'], G['H']; CACHE = G['CACHE']
LAND50 = os.environ.get('LAND50', os.path.expanduser('~/.cache/talas-dem/land-50m.json'))
EAST, WEST = (40, 90, 200), (200, 40, 40)

def topo_polys(path):
    t = json.load(open(path)); sc, tr = t['transform']['scale'], t['transform']['translate']; arcs = []
    for a in t['arcs']:
        x = y = 0; pts = []
        for dx, dy in a: x += dx; y += dy; pts.append((x * sc[0] + tr[0], y * sc[1] + tr[1]))
        arcs.append(pts)
    ring = lambda ids: [p for i in ids for p in (arcs[i] if i >= 0 else arcs[~i][::-1])]
    for geo in t['objects']['land']['geometries']:
        for poly in (geo['arcs'] if geo['type'] == 'MultiPolygon' else [geo['arcs']]): yield [ring(r) for r in poly]

def save_maps(gs):
    p = os.path.join(OUT, 'maps.json'); M = json.load(open(p)) if os.path.exists(p) else []
    names = [g['file'] for g in gs]; M = [m for m in M if m['file'] not in names] + gs
    json.dump(M, open(p, 'w'), indent=1)

# ---------------- Japan 1600 ----------------
G['RAMP'][:] = [(0, (150, 178, 120)), (200, (166, 184, 124)), (600, (176, 170, 120)), (1200, (150, 132, 104)), (2000, (138, 128, 112)), (3000, (230, 230, 232))]
LAT0, LAT1, LON0, LON1 = 31.0, 39.6, 129.0, 142.6
g = Guide('japan-guide.png', LAT0, LAT1, LON0, LON1, 7, None, None)
lm = Image.new('L', (W, H), 0); dl = ImageDraw.Draw(lm)
for poly in topo_polys(LAND50):
    for k, r in enumerate(poly):
        if any(LON0 - 2 < x < LON1 + 2 and LAT0 - 2 < y < LAT1 + 2 for x, y in r): dl.polygon(g.P([(y, x) for x, y in r]), fill=0 if k else 255)
sea = np.asarray(lm) < 128
rgb = g.rgb.copy(); rgb[sea] = (78, 122, 166)
g.im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); g.d = ImageDraw.Draw(g.im)
g.lakes(os.path.join(CACHE, 'ne_10m_lakes.geojson'))
g.im.save(os.path.join(OUT, 'japan-base.png'), optimize=True)
P = {'Edo': (35.685, 139.752), 'Aizu': (37.488, 139.930), 'Oyama': (36.314, 139.800), 'Ueda': (36.403, 138.244),
     'Fushimi': (34.940, 135.773), 'Kyoto': (35.025, 135.762), 'Osaka': (34.687, 135.526), 'Gifu': (35.434, 136.782),
     'Ogaki': (35.363, 136.616), 'Sekigahara': (35.365, 136.465), 'Sawayama': (35.282, 136.282), 'Hiroshima': (34.403, 132.459),
     'Kagoshima': (31.597, 130.555), 'Kiyosu': (35.216, 136.840), 'Hamamatsu': (34.711, 137.725), 'Nagoya': (35.18, 136.90)}
g.line([P['Oyama'], (36.0, 139.5), (35.6, 139.1), (35.2, 138.6), P['Hamamatsu'], P['Kiyosu'], P['Gifu'], P['Ogaki']], EAST, 7, dash=20)
g.text(34.95, 138.55, 'Tōkaidō: the Eastern vanguard\nand Ieyasu march west', EAST, 24, True)
g.line([P['Edo'], (36.2, 139.0), P['Ueda'], (36.0, 137.8), (35.6, 137.3), P['Gifu']], (90, 130, 230), 6, dash=14)
g.text(36.60, 137.55, "Nakasendō: Hidetada's army,\nheld up at Ueda", (90, 130, 230), 22, True)
g.line([P['Hiroshima'], (34.6, 133.8), P['Osaka'], P['Fushimi'], P['Sawayama'], P['Ogaki']], WEST, 6, dash=16)
g.text(33.95, 133.95, 'the Western army gathers at Osaka,\ntakes Fushimi, moves to Ōgaki', WEST, 22, True)
g.line([P['Kagoshima'], (32.6, 130.4), (33.7, 131.0)], WEST, 4, dash=10); g.text(32.2, 131.6, 'Shimazu (Satsuma)', WEST, 22, True)
g.ring(*P['Sekigahara'], 28, '', RED)
x, y = g.xy(*P['Sekigahara']); g.d.text((x - 40, y - 90), 'SEKIGAHARA', fill=RED, font=F(34, True), anchor='rb', stroke_width=4, stroke_fill=WHITE)
g.d.text((x - 40, y - 56), '21 October 1600', fill=RED, font=F(24, True), anchor='rb', stroke_width=4, stroke_fill=WHITE)
for n, sub, col, dy in [('Edo', "Ieyasu's castle", EAST, -28), ('Aizu', 'Uesugi Kagekatsu', WEST, -28), ('Oyama', 'the Oyama council (disputed)', EAST, 26),
                        ('Ueda', 'Sanada hold off Hidetada', WEST, -28), ('Fushimi', '', EAST, -24), ('Osaka', 'Hideyori; Mōri Terumoto', WEST, -28),
                        ('Gifu', 'falls to the East', WEST, -28), ('Ogaki', 'Western army', WEST, 26), ('Hiroshima', 'Mōri', WEST, -28), ('Kagoshima', '', WEST, -28),
                        ('Sawayama', '', WEST, 26)]:
    g.town(*P[n], n.replace('Ogaki', 'Ōgaki'), sub, 24 if sub else 22, col, 9, dy)
g.text(38.6, 141.6, 'PACIFIC OCEAN', BLUE, 30, True); g.text(37.3, 134.4, 'SEA OF JAPAN', BLUE, 30, True)
g.text(33.4, 135.9, 'Kii', GREY, 24, True); g.text(33.7, 133.3, 'Shikoku', GREY, 24, True); g.text(32.6, 131.1, 'Kyūshū', GREY, 24, True)
g.frame('JAPAN, summer to autumn 1600: the road to Sekigahara', 'Terrain from elevation; coast Natural Earth. Routes approximate.', 1)
gj = g.save()

# ---------------- the valley of Sekigahara ----------------
G['RAMP'][:] = [(0, (160, 182, 124)), (120, (172, 188, 128)), (200, (180, 184, 128)), (300, (166, 160, 116)), (450, (146, 136, 108)), (700, (128, 120, 104))]
LAT0, LAT1, LON0, LON1 = 35.334, 35.386, 136.432, 136.516
g = Guide('battle-guide.png', LAT0, LAT1, LON0, LON1, 14, 2.0, [(2.0, 4), (10, 7), (40, 10)])
B = {'Sasao': (35.3720, 136.4585), 'Matsuo': (35.34729, 136.45431), 'Yamanaka': (35.3621, 136.4495), 'Jinbano': (35.3660, 136.4675),
     'Momokubari': (35.3600, 136.4950), 'Nangu': (35.3545, 136.5390), 'Ukita': (35.3640, 136.4525), 'Konishi': (35.3680, 136.4555),
     'Shimazu': (35.3690, 136.4595), 'Ketsusen': (35.37045, 136.46161), 'Museum': (35.3656, 136.4664)}
EC = (30, 70, 200); WC = (200, 30, 30); NC = (130, 90, 40)
def camp(k, name, sub, col, side='n', est=False):
    x, y = g.xy(*B[k]); r = 13
    g.d.rectangle([x - r, y - r, x + r, y + r], fill=col, outline=WHITE, width=3)
    t = name + (' ~' if est else '')
    ox, oy, an = {'n': (0, -24, 'mb'), 's': (0, 24, 'mt'), 'w': (-24, 0, 'rm'), 'e': (24, 0, 'lm')}[side]
    g.d.text((x + ox, y + oy), t, fill=col, font=F(28, True), anchor=an, stroke_width=4, stroke_fill=WHITE)
    if sub:
        sy = y + oy + (8 if side == 's' else 22 if side in 'we' else -38)
        g.d.text((x + ox, sy + (26 if side == 's' else 0)), sub, fill=GREY, font=F(20), anchor={'n': 'mb', 's': 'mt', 'w': 'rt', 'e': 'lt'}[side], stroke_width=3, stroke_fill=WHITE)
camp('Sasao', 'ISHIDA', 'Mount Sasao', WC, 'n')
camp('Shimazu', 'SHIMAZU', '', WC, 'e', True)
camp('Konishi', 'KONISHI', '', WC, 'w', True)
camp('Ukita', 'UKITA', 'below Mount Tenma', WC, 'e', True)
camp('Yamanaka', 'ŌTANI', 'Yamanaka', WC, 'w', True)
camp('Matsuo', 'KOBAYAKAWA', 'Mount Matsuo (hill fort)', NC, 's')
camp('Momokubari', 'IEYASU', 'first HQ, Momokubari-yama', EC, 's', True)
camp('Jinbano', 'IEYASU', 'later HQ, Jinbano', EC, 's', True)
x, y = g.xy(*B['Ketsusen']); g.d.ellipse([x - 8, y - 8, x + 8, y + 8], outline=ORANGE, width=4)
g.d.text((x + 14, y - 14), 'decisive-battle monument', fill=ORANGE, font=F(20, True), anchor='lb', stroke_width=3, stroke_fill=WHITE)
g.d.text((W - 20, g.xy(35.3545, 0)[1]), 'Mount Nangū: MŌRI, KIKKAWA,\nCHŌSOKABE (never engaged) ~2 km →', fill=WC, font=F(24, True), anchor='rm', stroke_width=4, stroke_fill=WHITE, align='right')
g.d.text((W - 20, g.xy(35.3725, 0)[1]), 'Nakasendō to Ōgaki →', fill=BLACK, font=F(24, True), anchor='rm', stroke_width=4, stroke_fill=WHITE)
g.d.text((20, g.xy(35.3560, 0)[1]), '← Nakasendō to Ōmi and Kyoto', fill=BLACK, font=F(24, True), anchor='lm', stroke_width=4, stroke_fill=WHITE)
g.text(35.3790, 136.4440, '↖ Hokkoku road', BLACK, 22, True); g.text(35.3380, 136.4800, '↓ Ise road', BLACK, 22, True)
g.text(35.3800, 136.4950, 'the EASTERN ARMY comes from Ōgaki along the road (blue)', EC, 24, True)
g.frame('SEKIGAHARA, 21 October 1600: battle map guide', "Traditional camp sites (~ = estimated point). Streams from the terrain.", .01)
gb = g.save()
save_maps([gj, gb])
print('done')
