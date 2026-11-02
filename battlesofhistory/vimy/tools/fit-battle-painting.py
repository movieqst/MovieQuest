#!/usr/bin/env python3
"""Fit a painting of the Vimy battle map onto the real frame (images/layout/maps.json), with a thin-plate spline
through the villages: their real centres come from Nicholson's Map 7 lined up to the elevation, their painted centres
are read off the painting. The corners stay fixed.
    python3 -I fit-battle-painting.py <painting> <out terrain-battle.jpg>"""
import sys, numpy as np
from PIL import Image
from scipy.interpolate import RBFInterpolator
from scipy.ndimage import map_coordinates, zoom
src, dst = sys.argv[1:3]
B = Image.open(src).convert('RGB'); k = 2400 / B.size[0]
Bs = np.asarray(B.resize((2400, 1800), Image.LANCZOS)).astype(float)
# (real world px) -> (painting px on the original painting, scaled by k)
P = [('Ablain-St-Nazaire', (144, 228), (80, 130)), ('Souchez', (543, 233), (300, 160)), ('Givenchy', (964, 232), (570, 135)),
     ('La Chaudiere', (1425, 454), (855, 265)), ('Petit-Vimy', (1330, 641), (800, 365)), ('Vimy', (1490, 658), (900, 400)),
     ('Neuville-St-Vaast', (720, 1000), (410, 620)), ('Thelus', (1323, 1087), (840, 660)), ('Willerval', (1997, 1034), (1200, 620)),
     ('Bailleul', (2073, 1482), (1255, 880)), ('Ecurie', (810, 1648), (490, 985)), ('Arleux', (2361, 896), (1420, 540))]
real = np.array([a for _, a, _ in P] + [(0, 0), (2400, 0), (0, 1800), (2400, 1800)], float)
pic = np.array([(x * k, y * k) for _, _, (x, y) in P] + [(0, 0), (2400, 0), (0, 1800), (2400, 1800)], float)
f = RBFInterpolator(real, pic, kernel='thin_plate_spline', smoothing=5)
yy, xx = np.mgrid[0:1800:4, 0:2400:4]
c = f(np.c_[xx.ravel(), yy.ravel()].astype(float)).reshape(450, 600, 2)
sx = zoom(c[..., 0], 4, order=1); sy = zoom(c[..., 1], 4, order=1)
out = np.stack([map_coordinates(Bs[..., i], [sy, sx], order=3, mode='reflect') for i in range(3)], -1)
Image.fromarray(out.clip(0, 255).astype('uint8')).save(dst, quality=92)
for n, a, p in P: print('%-18s moved %4.0f m' % (n, np.hypot(a[0] - p[0] * k, a[1] - p[1] * k) * 5))
