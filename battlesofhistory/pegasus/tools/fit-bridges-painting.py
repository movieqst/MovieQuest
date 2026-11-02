#!/usr/bin/env python3
"""Fit a new painting of the bridges battle map onto the current one (thin-plate spline through the canal, the river,
the two bridges and the road), so units, gliders and bridges stay where the scenario puts them. Optionally turns
autumn yellows back to June greens.
    python3 -I fit-bridges-painting.py <painting> <out terrain-bridges.jpg> [--summer]"""
import sys, numpy as np
from PIL import Image
from scipy.interpolate import RBFInterpolator
from scipy.ndimage import map_coordinates, zoom
src, dst = sys.argv[1:3]; summer = '--summer' in sys.argv
B = Image.open(src).convert('RGB')
if summer:   # yellow-orange foliage (hue 32-62 degrees, saturated) toward green; red roofs and brown fields are left alone
    hsv = np.asarray(B.convert('HSV')).astype(float); h, s, v = hsv[..., 0] * 360 / 255, hsv[..., 1], hsv[..., 2]
    m = (h > 32) & (h < 64) & (s > 70); k = np.clip((s - 70) / 60, 0, 1) * m
    h2 = h + k * (88 - h) * .85; s2 = s * (1 - .25 * k)
    hsv[..., 0] = h2 * 255 / 360; hsv[..., 1] = s2; B = Image.fromarray(hsv.clip(0, 255).astype('uint8'), 'HSV').convert('RGB')
OUT_W, OUT_H = 4800, 3600; Bs = np.asarray(B.resize((2400, 1800), Image.LANCZOS)).astype(float)
# current map (2400 x 1800 world) -> where the painting has the same thing
P = [((862, 60), (805, 60)), ((860, 300), (803, 300)), ((863, 600), (801, 600)), ((866, 1000), (797, 1000)), ((866, 1300), (794, 1300)), ((862, 1700), (788, 1700)),
     ((1565, 60), (1598, 60)), ((1584, 600), (1690, 600)), ((1602, 1000), (1652, 1000)), ((1688, 1300), (1800, 1300)), ((1799, 1700), (1982, 1700)),
     ((861, 741), (792, 736)), ((1528, 747), (1608, 760)), ((300, 749), (300, 755)), ((2200, 733), (2200, 733)),
     ((0, 0), (0, 0)), ((0, 1800), (0, 1800)), ((2400, 0), (2400, 0)), ((2400, 1800), (2400, 1800))]
f = RBFInterpolator(np.array([a for a, b in P], float), np.array([b for a, b in P], float), kernel='thin_plate_spline', smoothing=2)
yy, xx = np.mgrid[0:1800:4, 0:2400:4]
c = f(np.c_[xx.ravel(), yy.ravel()].astype(float)).reshape(450, 600, 2)
sx = zoom(c[..., 0], 4, order=1); sy = zoom(c[..., 1], 4, order=1)
out = np.stack([map_coordinates(Bs[..., k], [sy, sx], order=3, mode='reflect') for k in range(3)], -1)
Image.fromarray(out.clip(0, 255).astype('uint8')).resize((OUT_W, OUT_H), Image.LANCZOS).save(dst, quality=90)
print('saved', dst)
