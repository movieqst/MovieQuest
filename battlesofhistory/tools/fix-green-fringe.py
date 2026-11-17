#!/usr/bin/env python3
"""After prepare-sprite-sheet.py: turn green that is still showing through dust, smoke or a muzzle-flash glow back to a
warm neutral. Only pixels that are see-through, or bright, are touched, so dull olive uniforms and vehicles keep their
colour.   python3 -I tools/fix-green-fringe.py SHEET.png [SHEET2.png ...]"""
import sys
import numpy as np
from PIL import Image
for f in sys.argv[1:]:
    a = np.asarray(Image.open(f).convert('RGBA')).astype(float); r, g, b, al = (a[..., i] for i in range(4))
    lum = (r + g + b) / 3
    bad = (al > 0) & (g > r + 2) & (g > b + 10) & ((al < 235) | (lum > 120))
    a[..., 0] = np.where(bad, np.clip(np.maximum(g, r) * 1.05, 0, 255), r)
    a[..., 1] = np.where(bad, np.clip(g * .85, 0, 255), g)
    a[..., 2] = np.where(bad, np.clip(b * .9, 0, 255), b)
    Image.fromarray(a.astype('uint8')).save(f); print(f, 'fringe pixels fixed:', int(bad.sum()))
