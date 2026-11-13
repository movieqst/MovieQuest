#!/usr/bin/env python3
"""Vukovar: build the town map (images/town-painting.jpg) on the real geography.
The first town painting (kept as images/town-painting-v1.jpg) had the Danube up to 500 m and the Vuka up to 1 km from
their real places. This script:
  1. erases the painted Vuka (its course is wrong) and fills it with meadow texture from nearby;
  2. stretches the painting so both banks of the Danube lie on OpenStreetMap's banks (thin-plate spline through matched
     bank points, tools/town-warp-pairs.json; frame edges and open country pinned in place);
  3. lays the painted quarters that match the real rivers on top (images/layout/painted/town-qN-*.png);
  4. lays the painted water-tower close-up on top (images/layout/painted/tower-close-chatgpt-v2.png);
each colour-matched to the map underneath and feathered in. Rerun when a better quarter arrives (add it to LAYERS).
    python3 battlesofhistory/vukovar/tools/build-town-map.py"""
import os, json, sys
import numpy as np, cv2
from PIL import Image, ImageDraw
from scipy import ndimage as ndi
from scipy.interpolate import RBFInterpolator
HERE = os.path.dirname(os.path.abspath(__file__)); IMG = os.path.join(HERE, '..', 'images'); LAY = os.path.join(IMG, 'layout')
sys.path.insert(0, HERE); import vk_osm
T = dict(lat0=45.32, lat1=45.398, lon0=18.932, lon1=19.0800085)            # the town map (scenario.js GEO.town)
SRC = os.path.join(IMG, 'town-painting-v1.jpg')
img = np.asarray(Image.open(SRC).convert('RGB')); H, W = img.shape[:2]       # 2400 x 1800
k = W / 1200                                                                 # the pairs are in 1200 x 900 units

# 1. the painted Vuka, traced on the painting (1200 x 900), erased and refilled with meadow from 180 px further west
vp = [(x * k, y * k) for x, y in [(0, 535), (30, 500), (80, 482), (150, 478), (205, 470), (235, 450), (248, 420), (240, 390), (215, 362),
      (212, 350), (240, 345), (300, 355), (360, 375), (395, 400), (405, 430), (415, 470), (440, 505), (480, 520), (530, 521), (565, 522)]]
a = img.astype(int); r, g, b = a[..., 0], a[..., 1], a[..., 2]
band = Image.new('L', (W, H), 0); ImageDraw.Draw(band).line(vp, fill=255, width=70, joint='curve')
vk = ndi.binary_dilation((np.asarray(band) > 0) & (b > r - 6) & (g > r + 2) & (a.sum(-1) < 450), iterations=4)
line = Image.new('L', (W, H), 0); ImageDraw.Draw(line).line(vp, fill=255, width=26, joint='curve'); vk |= np.asarray(line) > 0
soft = ndi.gaussian_filter(ndi.binary_dilation(vk, iterations=6).astype(float), 5)[..., None]
OX = int(180 * k)
donor = np.where((np.arange(W) < OX)[None, :, None], np.roll(img, -OX, axis=1), np.roll(img, OX, axis=1)).astype(float)   # 180 px to the west (east at the left edge)
fill = cv2.cvtColor(cv2.inpaint(cv2.cvtColor(img, cv2.COLOR_RGB2BGR), (vk * 255).astype(np.uint8), 9, cv2.INPAINT_TELEA), cv2.COLOR_BGR2RGB).astype(float)
# keep the inpainted colour on average, but take the texture (detail) from the donor
det = donor - ndi.gaussian_filter(donor, (6, 6, 0))
clean = img.astype(float) * (1 - soft) + (ndi.gaussian_filter(fill, (6, 6, 0)) + det) * soft

# 2. the Danube onto OpenStreetMap's banks
P = json.load(open(os.path.join(HERE, 'town-warp-pairs.json')))
pairs = [(p, q) for p, q in P['bank'] if not (p[0] > 980 and p[1] > 650)]          # not the side channel in the south-east
pairs = [(p, q) for p, q in pairs if np.hypot(q[0] - p[0], q[1] - p[1]) < 95]
pairs += [((652, 623), (645, 610)), ((594, 708), (570, 718))]                     # water tower, barracks (real <- painted)
Tp = np.array([p for p, q in pairs], float); Qp = np.array([q for p, q in pairs], float); w, h = 1200, 900
anc = [(x, y) for x in range(0, w + 1, 60) for y in (0, h)] + [(x, y) for y in range(0, h + 1, 60) for x in (0, w)] + \
      [(x, y) for x in range(30, w, 75) for y in range(30, h, 75)]
anc = np.array(anc, float); anc = anc[np.min(np.hypot(anc[:, None, 0] - Tp[None, :, 0], anc[:, None, 1] - Tp[None, :, 1]), 1) > 140]
f = RBFInterpolator(np.r_[Tp, anc], np.r_[Qp - Tp, np.zeros_like(anc)], kernel='thin_plate_spline', smoothing=120.0)
gy, gx = np.mgrid[0:h:6, 0:w:6]; d = f(np.c_[gx.ravel(), gy.ravel()]).reshape(gy.shape + (2,))
dx = np.asarray(Image.fromarray(d[..., 0].astype(np.float32)).resize((W, H), Image.BICUBIC)) * k
dy = np.asarray(Image.fromarray(d[..., 1].astype(np.float32)).resize((W, H), Image.BICUBIC)) * k
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
town = np.stack([ndi.map_coordinates(clean[..., c].astype(np.float32), [yy + dy, xx + dx], order=3, mode='nearest') for c in range(3)], -1)


# 3-4. painted pieces that match the real rivers, placed by their corners
def place(town, path, m, feather):
    x0 = (m['lon0'] - T['lon0']) / (T['lon1'] - T['lon0']) * W; x1 = (m['lon1'] - T['lon0']) / (T['lon1'] - T['lon0']) * W
    y0 = (T['lat1'] - m['lat1']) / (T['lat1'] - T['lat0']) * H; y1 = (T['lat1'] - m['lat0']) / (T['lat1'] - T['lat0']) * H
    X0, Y0, X1, Y1 = max(0, int(np.floor(x0))), max(0, int(np.floor(y0))), min(W, int(np.ceil(x1))), min(H, int(np.ceil(y1)))
    src = np.asarray(Image.open(path).convert('RGB')).astype(np.float32); sh, sw = src.shape[:2]
    py, px = np.mgrid[Y0:Y1, X0:X1].astype(np.float32)
    u = (px + .5 - x0) / (x1 - x0) * sw - .5; v = (py + .5 - y0) / (y1 - y0) * sh - .5      # town pixel -> piece pixel
    small = cv2.resize(src, (round(x1 - x0), round(y1 - y0)), interpolation=cv2.INTER_AREA)     # no aliasing when shrinking
    us, vs = u * small.shape[1] / sw, v * small.shape[0] / sh
    patch = np.stack([ndi.map_coordinates(small[..., c], [vs, us], order=1, mode='nearest') for c in range(3)], -1)
    old = town[Y0:Y1, X0:X1]
    dist = np.minimum.reduce([px - x0, x1 - px, py - y0, y1 - py])
    inside = dist > 0
    for c in range(3):                                   # colour: match mean and spread to the map underneath
        s, t = patch[..., c][inside], old[..., c][inside]
        patch[..., c] = (patch[..., c] - s.mean()) / (s.std() + 1e-6) * t.std() + t.mean()
    al = (np.clip(dist / feather, 0, 1) ** 1.5)[..., None]
    town[Y0:Y1, X0:X1] = old * (1 - al) + patch.clip(0, 255) * al
    return town


Q = {x['quarter']: x for x in json.load(open(os.path.join(LAY, 'town-quarters.json')))}
LAYERS = [(os.path.join(LAY, 'painted', 'town-q3-chatgpt-v3.png'), Q[3], 110),
          (os.path.join(LAY, 'painted', 'tower-close-chatgpt-v2.png'), json.load(open(os.path.join(LAY, 'tower.json'))), 70)]
for path, m, fe in LAYERS: town = place(town, path, m, fe)
Image.fromarray(town.clip(0, 255).astype(np.uint8)).save(os.path.join(IMG, 'town-painting.jpg'), quality=90)

# check: the finished map's water against OpenStreetMap
F = vk_osm.Frame(T['lat0'], T['lat1'], T['lon0'], T['lon1'], w, h)
a = np.asarray(Image.open(os.path.join(IMG, 'town-painting.jpg')).resize((w, h))).astype(int); r, g, b = a[..., 0], a[..., 1], a[..., 2]
M = ndi.binary_opening((b > r + 2) & (g > r + 6) & (a.sum(-1) < 420)); B = vk_osm.water_mask(F)
print('water overlap with OpenStreetMap: %.3f (the first painting: 0.395)' % ((M & B).sum() / (M | B).sum()))
