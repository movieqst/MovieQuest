#!/usr/bin/env python3
"""Turn a ChatGPT sprite sheet (a 4 x 4 grid on a green #00FF00 background) into the sheet the battle engines use.

    python3 -I tools/prepare-sprite-sheet.py IN.png OUT.png [cell, e.g. 160 or 240x200] [figure-height]

- keys out the green (soft edges, and green spill on the figure's outline is pulled back toward neutral)
- finds the figure in each of the 16 cells, ignoring specks
- scales every figure by the SAME amount, so the tallest is `figure-height` px (default 130)
- centres each one left to right and stands its feet 8 px above the bottom of a `cell` x `cell` cell (default 160)
Rows stay as drawn: south, east, north, west; columns are the four walking frames.
"""
import sys
from PIL import Image
import numpy as np

src, dst = sys.argv[1], sys.argv[2]
CW, CH = (map(int, sys.argv[3].split('x')) if 'x' in sys.argv[3] else (int(sys.argv[3]),) * 2) if len(sys.argv) > 3 else (160, 160)   # cell: 160 or 240x200
FIG = int(sys.argv[4]) if len(sys.argv) > 4 else 130
FOOT = 8

im = np.asarray(Image.open(src).convert('RGB')).astype(float)
H, W = im.shape[:2]
r, g, b = im[..., 0], im[..., 1], im[..., 2]
# how green each pixel is: green well above both red and blue
greenness = g - np.maximum(r, b)
alpha = np.clip(1 - (greenness - 40) / 80, 0, 1)            # >120 above: fully background; <40: fully figure
# despill: on partly green pixels, pull green down to the stronger of red and blue
spill = np.minimum(g, np.maximum(r, b) + 10)
rgb = im.copy(); rgb[..., 1] = np.where(greenness > 0, spill, g)
rgba = np.dstack([rgb, alpha * 255]).clip(0, 255).astype('uint8')

cw, ch = W / 4, H / 4
cells, boxes = [], []
for row in range(4):
    for col in range(4):
        x0, y0, x1, y1 = round(col * cw), round(row * ch), round((col + 1) * cw), round((row + 1) * ch)
        c = rgba[y0:y1, x0:x1]
        mask = c[..., 3] > 40
        # ignore tiny specks: keep rows/columns with a few solid pixels
        ys = np.where(mask.sum(1) > 2)[0]; xs = np.where(mask.sum(0) > 2)[0]
        if not len(ys) or not len(xs):
            raise SystemExit(f'cell {row},{col} looks empty')
        boxes.append((xs[0], ys[0], xs[-1] + 1, ys[-1] + 1)); cells.append(c)
tallest = max(b[3] - b[1] for b in boxes)
k = FIG / tallest
out = Image.new('RGBA', (CW * 4, CH * 4), (0, 0, 0, 0))
for i, (c, (bx0, by0, bx1, by1)) in enumerate(zip(cells, boxes)):
    fig = Image.fromarray(c[by0:by1, bx0:bx1], 'RGBA')
    fw, fh = max(1, round((bx1 - bx0) * k)), max(1, round((by1 - by0) * k))
    fig = fig.resize((fw, fh), Image.LANCZOS)
    if fw > CW - 4:   # very wide figure (a spear held sideways): shrink to fit the cell
        s = (CW - 4) / fw; fig = fig.resize((CW - 4, max(1, round(fh * s))), Image.LANCZOS); fw, fh = fig.size
    col, row = i % 4, i // 4
    out.alpha_composite(fig, (col * CW + (CW - fw) // 2, row * CH + CH - FOOT - fh))
out.save(dst, optimize=True)
print(f'{dst}: {out.size[0]}x{out.size[1]}, scale {k:.3f}, tallest figure {FIG}px')
