#!/usr/bin/env python3
"""Two context maps for the Pegasus introduction, drawn from real elevation (the sea from height 0), labelled, for the
slideshow:  images/40-map-glider-route.jpg  (Tarrant Rushton to the bridges and back)
            images/41-map-21st-panzer.jpg   (where the 21st Panzer Division lay, ten miles from the bridge)
    python3 battlesofhistory/pegasus/tools/draw-context-maps.py"""
import math, os, sys
import numpy as np
from PIL import Image, ImageDraw
HERE = os.path.dirname(os.path.abspath(__file__)); TT = os.path.join(HERE, '..', '..', 'talas', 'tools')
sys.path.insert(0, TT)
src = open(os.path.join(TT, 'draw-layout-guides.py')).read().split('# ---------- places (lat, lon) ----------')[0]
G = {'__file__': os.path.join(TT, 'draw-layout-guides.py')}; exec(compile(src, 'dlg', 'exec'), G)
IMG = os.path.join(HERE, '..', 'images'); G['OUT'] = os.path.join(IMG, 'layout')
Guide, F, WATER = G['Guide'], G['F'], G['WATER']
BRIDGE = (49.2417, -0.2747)
SEA = (38, 70, 108); LAND_TINT = (0.62, 0.66, 0.58)

def night(g):   # moonlit colours: dark land, dark sea
    a = np.asarray(g.im).astype(float); sea = g.e <= 0.8
    a = a * np.array(LAND_TINT); a[sea] = SEA; g.im = Image.fromarray(a.clip(0, 255).astype('uint8')); g.d = ImageDraw.Draw(g.im)

def painted(g, name):   # a painting lined up to this map's frame (images/layout/<name>) replaces the drawn ground, when there is one
    p = os.path.join(IMG, 'layout', name)
    if os.path.exists(p): g.im = Image.open(p).convert('RGB').resize((2400, 1800)); g.d = ImageDraw.Draw(g.im); print('painted base:', name)

def label(g, la, lo, s, col=(255, 240, 200), size=34, dx=0, dy=-26, anchor='mb'):
    x, y = g.xy(la, lo); g.d.text((x + dx, y + dy), s, fill=col, font=F(size, True), anchor=anchor, stroke_width=5, stroke_fill=(10, 14, 20))

def dot(g, la, lo, r=10, col=(255, 240, 200)):
    x, y = g.xy(la, lo); g.d.ellipse([x - r, y - r, x + r, y + r], fill=col, outline=(10, 14, 20), width=3)

def route(g, pts, col, w=7, dash=26, arrow=True):
    q = [g.xy(*p) for p in pts]
    for (x1, y1), (x2, y2) in zip(q, q[1:]):
        L = math.hypot(x2 - x1, y2 - y1); n = max(1, int(L // dash))
        for i in range(0, n, 2): t0, t1 = i / n, min(1, (i + 1) / n); g.d.line([(x1 + (x2 - x1) * t0, y1 + (y2 - y1) * t0), (x1 + (x2 - x1) * t1, y1 + (y2 - y1) * t1)], fill=col, width=w)
    if arrow:
        (x1, y1), (x2, y2) = q[-2], q[-1]; a = math.atan2(y2 - y1, x2 - x1); L = 36
        g.d.polygon([(x2, y2), (x2 - L * math.cos(a - .45), y2 - L * math.sin(a - .45)), (x2 - L * math.cos(a + .45), y2 - L * math.sin(a + .45))], fill=col)

def title(g, t, sub):
    g.d.rectangle([0, 0, 2400, 112], fill=(8, 14, 20)); g.d.text((36, 18), t, fill=(233, 199, 122), font=F(46, True))
    g.d.text((38, 72), sub, fill=(200, 210, 214), font=F(25))

def save(g, name):
    g.im.convert('RGB').save(os.path.join(IMG, name), quality=88); print(name)

# ---- 1. the flight: Tarrant Rushton to the bridges, and the tugs' return
g = Guide('ctx-route.png', 49.05, 51.12, -2.75, 0.55, 8, None, None); night(g); painted(g, 'ctx-route-painted.jpg')   # ChatGPT's moonlit Channel, warped onto the real coastline
TR = (50.857, -2.083); CASTOFF = (49.300, -0.130)   # Tarrant Rushton airfield, Dorset; cast-off near the coast east of the Orne
out = [TR, (50.60, -1.60), (50.10, -0.90), (49.55, -0.35), CASTOFF]
back = [CASTOFF, (49.40, 0.10), (49.90, -0.30), (50.45, -1.20), TR]
route(g, back, (150, 175, 200), 5, 20); route(g, out, (255, 214, 120), 8, 28)
g.d.line([g.xy(*CASTOFF), g.xy(*BRIDGE)], fill=(120, 230, 255), width=5)
dot(g, *TR, 14); label(g, *TR, 'RAF Tarrant Rushton', dy=-30); label(g, TR[0], TR[1], 'Dorset · take-off 22:56, 5 June', (200, 210, 214), 24, dy=48, anchor='mt')
dot(g, *BRIDGE, 12, (255, 90, 80)); label(g, *BRIDGE, 'The bridges', (255, 200, 190), 34, dx=-24, dy=-12, anchor='rb')
dot(g, *CASTOFF, 9, (120, 230, 255)); label(g, *CASTOFF, 'Gliders cast off, 00:07', (160, 235, 255), 26, dx=20, dy=-14, anchor='ld')
label(g, 50.25, -1.30, 'Six Halifaxes towing six Horsa gliders', (255, 225, 160), 30, anchor='mm')
label(g, 49.95, 0.05, 'Halifaxes fly home after a diversion raid', (190, 210, 230), 26, anchor='mm')
label(g, 50.88, -0.40, 'ENGLAND', (220, 225, 210), 40, anchor='mm'); label(g, 49.20, -1.30, 'NORMANDY', (220, 225, 210), 40, anchor='mm')
label(g, 50.15, -2.30, 'English Channel', (150, 185, 215), 34, anchor='mm')
dot(g, 49.185, -0.365, 8); label(g, 49.185, -0.365, 'Caen', dx=-14, dy=6, size=24, anchor='rt')
dot(g, 50.796, -1.091, 7); label(g, 50.796, -1.091, 'Portsmouth', size=24, dy=-16)
title(g, 'The flight to the bridges, night of 5–6 June 1944', 'Gliders of the Glider Pilot Regiment, towed by Halifaxes of 298 and 644 Squadrons RAF. Routes approximate.')
save(g, '40-map-glider-route.jpg')

# ---- 2. the 21st Panzer Division and the bridge
g = Guide('ctx-21pz.png', 48.86, 49.36, -0.80, 0.20, 10, None, None); night(g)
km = lambda k: k / (g.km_w) * 2400
x, y = g.xy(*BRIDGE); r = km(16.1)   # ten miles
g.d.ellipse([x - r, y - r, x + r, y + r], outline=(255, 120, 100), width=5)
label(g, BRIDGE[0] - 0.02, BRIDGE[1] + 0.235, 'ten miles', (255, 160, 150), 26, anchor='lm', dx=10, dy=0)
dot(g, *BRIDGE, 12, (255, 90, 80)); label(g, *BRIDGE, 'Pegasus Bridge', (255, 210, 200), 32, dy=-22)
for (la, lo), n in [((49.185, -0.365), 'Caen'), ((49.283, -0.252), 'Ouistreham'), ((49.191, -0.168), 'Troarn'), ((49.072, -0.199), 'Vimont'), ((48.892, -0.199), 'Falaise')]:
    dot(g, la, lo, 8); label(g, la, lo, n, size=26, dy=-16)
PZ = [((49.017, -0.033), 'Divisional HQ, Saint-Pierre-sur-Dives'), ((49.12, -0.32), 'Panzergrenadiers south of Caen'), ((49.20, -0.12), 'Panzergrenadiers near Troarn'), ((48.98, -0.23), 'Panzer Regiment 22, around Falaise and Vimont')]
for (la, lo), n in PZ:
    x, y = g.xy(la, lo); g.d.rectangle([x - 28, y - 18, x + 28, y + 18], fill=(70, 75, 80), outline=(230, 230, 230), width=3); g.d.ellipse([x - 18, y - 10, x + 18, y + 10], outline=(230, 230, 230), width=3)
    label(g, la, lo, n, (225, 228, 232), 24, dy=24, anchor='mt')
label(g, 49.33, -0.55, 'Sword Beach', (150, 185, 215), 28, anchor='mm')
title(g, 'The 21st Panzer Division on the night of 5–6 June 1944', 'The only German armoured division near the beaches, spread south and south-east of Caen. Positions approximate.')
save(g, '41-map-21st-panzer.jpg')
