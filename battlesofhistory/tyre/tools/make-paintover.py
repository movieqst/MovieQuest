#!/usr/bin/env python3
"""Tyre: round 2 inputs for the two close maps (region, siege), after ChatGPT's first paintings moved and enlarged the island.
    python3 battlesofhistory/tyre/tools/make-paintover.py
Outputs to tyre/images/layout/:
  <map>-paintover.png  the base with the city already drawn on the island at its exact size and place (pale stone blocks,
                       the sea wall, the two harbours with water), so ChatGPT only adds surface detail on top.
  <map>-guide2.png     the paintover with a thick red outline of the island and the mainland shore, and the pixel box.
Prints the island's pixel box (left, top, right, bottom) for the prompt."""
import os, sys, math, json
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
HERE = os.path.dirname(os.path.abspath(__file__)); L = os.path.join(HERE, '..', 'images', 'layout')
sys.path.insert(0, HERE)
import importlib.util
spec = importlib.util.spec_from_file_location('dlg', os.path.join(HERE, 'draw-layout-guides.py')); D = importlib.util.module_from_spec(spec); spec.loader.exec_module(D)
meta = {m['file'].replace('-guide.png', ''): m for m in json.load(open(os.path.join(L, 'maps.json')))}
rng = np.random.default_rng(332)
for name in ('siege', 'region'):
    m = meta[name]; W, H = m['width'], m['height']
    xy = lambda la, lo: ((lo - m['lon0']) / (m['lon1'] - m['lon0']) * W, (m['lat1'] - la) / (m['lat1'] - m['lat0']) * H)
    base = Image.open(os.path.join(L, name + '-base.png')).convert('RGB')
    isl = [xy(*p) for p in D.ISLAND]
    xs = [p[0] for p in isl]; ys = [p[1] for p in isl]; box = (min(xs), min(ys), max(xs), max(ys))
    mask = Image.new('L', (W, H), 0); ImageDraw.Draw(mask).polygon(isl, fill=255)
    if name == 'siege':
        city = Image.new('RGB', (W, H), (214, 200, 168)); d = ImageDraw.Draw(city)
        for _ in range(9000):    # the houses: pale stone blocks with dark lanes between
            x, y = rng.uniform(box[0], box[2]), rng.uniform(box[1], box[3]); s = rng.uniform(8, 20); c = int(rng.uniform(178, 232))
            d.rectangle([x, y, x + s, y + s * rng.uniform(.6, 1.5)], fill=(c, c - 10, c - 30), outline=(120, 108, 86))
        cx, cy = xy(33.2712, 35.1934)   # the temple precinct of Melqart (symbolic, position unknown)
        d.rectangle([cx - 55, cy - 40, cx + 55, cy + 40], fill=(226, 216, 190), outline=(110, 100, 80), width=4)
        d.rectangle([cx - 20, cy - 14, cx + 20, cy + 14], fill=(200, 186, 150), outline=(110, 100, 80), width=3)
        img = Image.composite(city, base, mask); dd = ImageDraw.Draw(img)
        for (la, lo), r in ((D.NORTH_HARBOUR, 55), (D.SOUTH_HARBOUR, 50)):   # the harbour basins inside the wall
            x, y = xy(la, lo); dd.ellipse([x - r, y - r * .8, x + r, y + r * .8], fill=(84, 132, 150), outline=(150, 136, 110), width=8)
        dd.line(isl + [isl[0]], fill=(150, 136, 108), width=16); dd.line(isl + [isl[0]], fill=(212, 200, 170), width=8)   # the sea wall
    else:
        img = Image.composite(Image.new('RGB', (W, H), (220, 206, 176)), base, mask)
        ImageDraw.Draw(img).line(isl + [isl[0]], fill=(150, 136, 108), width=3)
    img.save(os.path.join(L, name + '-paintover.png'), optimize=True)
    g = img.copy(); gd = ImageDraw.Draw(g)
    gd.line(isl + [isl[0]], fill=(230, 20, 20), width=6 if name == 'siege' else 3)
    shore = [xy(la, lo) for la, lo in D.MAINLAND]; gd.line(shore, fill=(230, 20, 20), width=6 if name == 'siege' else 3)
    gd.rectangle(box, outline=(255, 0, 255), width=3)
    f = D.F(30 if name == 'siege' else 24, True)
    gd.text((box[0], box[1] - 8), 'Tyre island: x %d-%d, y %d-%d (of 2400 x 1800)' % (box[0], box[2], box[1], box[3]), fill=(255, 0, 255), font=f, anchor='lb', stroke_width=4, stroke_fill=(255, 255, 255))
    if name == 'siege':
        x1 = xy(33.2716, 35.1979)[0]; x2 = xy(33.2716, D.coast_lon(33.2716))[0]; y = xy(33.2716, 35.2)[1]
        gd.line([(x1, y), (x2, y)], fill=(230, 20, 20), width=4); gd.text(((x1 + x2) / 2, y - 12), 'open water %d px (~%d m)' % (x2 - x1, (x2 - x1) / W * m['km_w'] * 1000), fill=(230, 20, 20), font=f, anchor='mb', stroke_width=4, stroke_fill=(255, 255, 255))
    g.save(os.path.join(L, name + '-guide2.png'), optimize=True)
    print(name, 'island box x %d-%d y %d-%d' % (box[0], box[2], box[1], box[3]))
