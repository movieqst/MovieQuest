#!/usr/bin/env python3
"""Trim the white or pale slivers that AI-made portraits sometimes have along an edge, then crop back to a square.
    python3 battlesofhistory/tools/trim-portrait-edges.py <battle>/images/portraits/*.jpg   (add --dry to only report)
An edge column or row counts as a sliver when its middle part is near white (mean > 200, or > 185 once inside the band). Left and right edges only."""
import sys
import numpy as np
from PIL import Image
dry = '--dry' in sys.argv
for f in [a for a in sys.argv[1:] if not a.startswith('--')]:
    im = Image.open(f).convert('RGB'); a = np.asarray(im).astype(float).mean(2); h, w = a.shape
    col = a[h // 6: h * 5 // 6].mean(0); row = a[:, w // 6: w * 5 // 6].mean(1)
    def cut(v, n):   # the pale band at an edge: it may start up to 12 px in (a thin dark frame line); max 12% of the side
        s = next((i for i in range(12) if v[i] > 200), None)
        if s is None: return 0
        k = s
        while k < n * .12 and v[k] > 185: k += 1
        return k + 4
    # left and right only: a pale top is usually sky, which belongs in the picture
    L, R, T, B = cut(col, w), cut(col[::-1], w), 0, 0
    if not (L or R or T or B): continue
    print(f, 'trim L%d R%d T%d B%d' % (L, R, T, B))
    if dry: continue
    c = im.crop((L, T, w - R, h - B)); cw, ch = c.size; s = min(cw, ch)
    c = c.crop(((cw - s) // 2, (ch - s) // 2, (cw - s) // 2 + s, (ch - s) // 2 + s)).resize((w, h), Image.LANCZOS)
    c.save(f, quality=92)
