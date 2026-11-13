#!/usr/bin/env python3
"""Re-grid a 4 x 4 sprite sheet on green whose figures do not sit in equal quarters (ChatGPT sometimes pads or shifts rows).
Finds the 4 row bands and, in each, the 4 figures, and pastes each figure centred (feet at the same height) into a clean
4 x 4 grid of equal cells. Thin straight lines left from grid borders are removed first.
    python3 -I regrid-sheet.py IN.png OUT.png"""
import sys, numpy as np
from PIL import Image
from scipy.ndimage import label, find_objects, binary_dilation
src, dst = sys.argv[1:3]
im = Image.open(src).convert('RGB'); a = np.asarray(im).astype(int); H, W = a.shape[:2]
fg = (a[..., 1] - np.maximum(a[..., 0], a[..., 2])) < 60
# thin straight lines (grid borders): columns/rows that are foreground over most of the height/width but 1-4 px wide
for axis in (0, 1):
    frac = fg.mean(axis); nb = np.maximum(np.roll(frac, 4), np.roll(frac, -4)); thin = (frac > .8) & (nb < .3)   # a long line with nothing either side
    for i in np.where(thin)[0]:
        if axis == 0: fg[:, i] = False; a[:, i] = (0, 255, 0)
        else: fg[i, :] = False; a[i, :] = (0, 255, 0)
def bands(prof, n, gap=6):
    on = prof > 0; segs = []; i = 0
    while i < len(on):
        if on[i]:
            j = i
            while j < len(on) and (on[j] or (j + gap < len(on) and on[j:j + gap].any())): j += 1
            segs.append((i, j)); i = j
        else: i += 1
    segs = sorted(segs, key=lambda s: -(prof[s[0]:s[1]].sum()))[:n]
    return sorted(segs)
clean = fg & binary_dilation(fg, iterations=1)
rows = bands(clean.sum(1) > 3, 4, 40)
out = Image.new('RGB', (1024, 1024), (0, 255, 0)); A = Image.fromarray(a.clip(0, 255).astype('uint8'))
if len(rows) != 4: print('rows found', len(rows), '- kept as is'); im.save(dst); sys.exit()
for r, (y0, y1) in enumerate(rows):
    for c in range(4):   # columns stay in equal quarters; only the rows drift
        x0, x1 = c * W // 4, (c + 1) * W // 4; m = clean[y0:y1, x0:x1]; xs = np.where(m.sum(0) > 0)[0]
        if len(xs): x0, x1 = x0 + xs[0], x0 + xs[-1] + 1
        fig = A.crop((x0, y0, x1, y1)); fw, fh = fig.size; k = min(1, 240 / fw, 240 / fh)
        if k < 1: fig = fig.resize((int(fw * k), int(fh * k))); fw, fh = fig.size
        out.paste(fig, (c * 256 + (256 - fw) // 2, r * 256 + 248 - fh))
out.save(dst); print('regridded', [(y0, y1) for y0, y1 in rows])
