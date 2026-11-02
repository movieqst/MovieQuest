#!/usr/bin/env python3
import sys, numpy as np
"""Fit a painting of the approach area (Ouistreham to Caen) onto the real map: a thin-plate spline through landmarks
(real position on the area guide -> where the painting has it), so the bridges, landing fields and labels stay where the
scenario puts them.   python3 -I fit-approach-painting.py <scratch dir> <painting> <out terrain-approach.jpg>"""
from PIL import Image, ImageDraw
from scipy.interpolate import RBFInterpolator
from scipy.ndimage import map_coordinates, zoom
S, src, dst = sys.argv[1:4]
B = np.asarray(Image.open(src).convert('RGB').resize((2400, 1800), Image.LANCZOS)).astype(float)
# real map (the area guide: 49.31 N 0.42 W to 49.17 N 0.134 W) -> where the painting has it
P = [((1219, 877), (1166, 814)), ((1341, 885), (1260, 816)), ((1440, 245), (1410, 190)), ((1467, 1157), (1460, 1150)),
     ((461, 1605), (440, 1560)), ((1880, 501), (1880, 430)), ((0, 0), (0, 0)), ((2400, 0), (2400, 0)), ((0, 1800), (0, 1800)), ((2400, 1800), (2400, 1800))]
f = RBFInterpolator(np.array([a for a, b in P], float), np.array([b for a, b in P], float), kernel='thin_plate_spline')
yy, xx = np.mgrid[0:1800:4, 0:2400:4]
c = f(np.c_[xx.ravel(), yy.ravel()].astype(float)).reshape(450, 600, 2)
sx = zoom(c[..., 0], 4, order=1); sy = zoom(c[..., 1], 4, order=1)
out = np.stack([map_coordinates(B[..., k], [sy, sx], order=1, mode='reflect') for k in range(3)], -1)
Image.fromarray(out.clip(0, 255).astype('uint8')).save(dst, quality=90)
im = Image.open(dst).convert('RGB'); d = ImageDraw.Draw(im)
for (x, y) in [(1219, 878), (1343, 887), (1250, 905), (1262, 927), (1278, 950), (1302, 835), (1286, 852), (1456, 1000), (1150, 960), (1390, 1000), (1316, 300)]:
    d.ellipse([x - 12, y - 12, x + 12, y + 12], outline=(255, 0, 0), width=4)
im.crop((900, 600, 1700, 1150)).save(S + '/approach-chk.jpg'); im.resize((900, 675)).save(S + '/approach-all.jpg')
