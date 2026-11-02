#!/usr/bin/env python3
"""Tidy a prepared sprite sheet (after prepare-sprite-sheet.py): in every cell keep only the figure (the largest piece and
anything touching its outline, such as a spear or a banner) and drop specks and stray lines; then, with --mirror-west,
rebuild row 4 (walking west) as the mirror image of row 2 (walking east).
    python3 -I tools/clean-sprite-sheet.py SHEET.png [cell, e.g. 160 or 240x200] [--mirror-west]"""
import sys
import numpy as np
from PIL import Image
from scipy.ndimage import label, binary_dilation
path = sys.argv[1]; args = [a for a in sys.argv[2:] if not a.startswith('--')]
CW, CH = (map(int, args[0].split('x')) if 'x' in args[0] else (int(args[0]),) * 2) if args else (160, 160)
im = np.asarray(Image.open(path).convert('RGBA')).copy()
for r in range(4):
    for c in range(4):
        cell = im[r * CH:(r + 1) * CH, c * CW:(c + 1) * CW]
        a = cell[..., 3] > 40; lab, n = label(a)
        if not n: continue
        sizes = np.bincount(lab.ravel()); sizes[0] = 0; big = sizes.argmax()
        keep = binary_dilation(lab == big, iterations=6)
        ok = [i for i in range(1, n + 1) if sizes[i] >= 12 and (keep & (lab == i)).any()]
        mask = np.isin(lab, ok) | (lab == big)
        cell[~mask] = 0
if '--mirror-west' in sys.argv:
    for c in range(4):
        e = im[1 * CH:2 * CH, c * CW:(c + 1) * CW]
        im[3 * CH:4 * CH, c * CW:(c + 1) * CW] = e[:, ::-1]
Image.fromarray(im).save(path, optimize=True)
print(path, 'cleaned')
