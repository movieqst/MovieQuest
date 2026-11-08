#!/usr/bin/env python3
"""Siege of Tyre: draw Alexander's mole as transparent layers over the siege map (images/trenches/mole-N.png, 2400 x 1800,
the same size as terrain-siege.jpg). The engine shows one layer at a time (S.trenchLayers; a chapter's 'trenches').
The mole runs from the beach (x 1620) straight toward the middle of the island's east wall (x 1032), at y 870.
Its width on the map is drawn wider than Diodorus's two plethra (about 60 m = 36 px) so it can be seen; widened after
the fireship (Arrian 2.19.6). Stage by stage: how far it had reached is our reconstruction, not a measured figure.
    python3 -I battlesofhistory/tyre/tools/make-mole-layers.py"""
import os, math, random
from PIL import Image, ImageDraw, ImageFilter
HERE = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(HERE, '..', 'images', 'trenches'); os.makedirs(OUT, exist_ok=True)
W, H, Y, X0 = 2400, 1800, 870, 1620
STAGES = [('mole-1.png', 1460, 52), ('mole-2.png', 1330, 52), ('mole-3.png', 1330, 80), ('mole-4.png', 1180, 80), ('mole-5.png', 1036, 84)]

def edge(x, side, w, seed):
    return Y + side * (w / 2 + 3 * math.sin(x * .05 + seed) + 2 * math.sin(x * .013 + seed * 2))

for name, xh, w in STAGES:
    rnd = random.Random(7)
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    xs = list(range(X0, xh - 1, -4)) + [xh]
    top = [(x, edge(x, -1, w, 1)) for x in xs]; bot = [(x, edge(x, 1, w, 2)) for x in reversed(xs)]
    # foam and wet stone just outside the edges
    foam = Image.new('RGBA', (W, H), (0, 0, 0, 0)); fd = ImageDraw.Draw(foam)
    fd.polygon([(x, y - 9) for x, y in top] + [(xh - 10, Y)] + [(x, y + 9) for x, y in bot], fill=(235, 245, 245, 150))
    foam = foam.filter(ImageFilter.GaussianBlur(4)); im.alpha_composite(foam)
    d.polygon(top + [(xh - 4, Y)] + bot, fill=(112, 100, 80, 255))
    # stones and earth
    for i in range(int((X0 - xh) * w / 22)):
        x = rnd.uniform(xh + 4, X0); y = rnd.uniform(edge(x, -1, w, 1) + 3, edge(x, 1, w, 2) - 3); r = rnd.uniform(2.5, 7)
        c = rnd.choice([(150, 138, 112), (128, 116, 92), (170, 158, 128), (96, 86, 68), (140, 120, 90)])
        d.ellipse([x - r, y - r * .75, x + r, y + r * .75], fill=c + (255,), outline=(70, 62, 48, 255))
    # a packed-earth track along the top
    for x in range(X0, xh, -3):
        d.ellipse([x - 3, Y - w * .16, x + 3, Y + w * .16], fill=(150, 134, 102, 255))
    # stakes along the sides (Arrian: stakes driven into the mud)
    for x in range(X0 - 10, xh + 6, -14):
        for side in (-1, 1):
            y = edge(x, side, w, 1 if side < 0 else 2) - side * 2
            d.rectangle([x - 1.5, y - 2, x + 1.5, y + 2], fill=(86, 60, 34, 255))
    # the head: rough, unfinished
    for i in range(14):
        x = xh + rnd.uniform(-6, 10); y = Y + rnd.uniform(-w / 2, w / 2); r = rnd.uniform(4, 9)
        d.ellipse([x - r, y - r, x + r, y + r], fill=(122, 110, 88, 255), outline=(70, 62, 48, 255))
    im = im.filter(ImageFilter.SMOOTH)
    im.save(os.path.join(OUT, name)); print(name, 'head at x', xh, 'width', w)
