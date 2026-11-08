#!/usr/bin/env python3
"""Siege of Tyre: a perspective guide for painters — the island city seen from the mainland beach, looking west,
built from the island's outline on our siege map (terrain-siege.jpg, 600 px to the km). Widths true to the map; heights exaggerated.
    python3 -I battlesofhistory/tyre/tools/draw-view-guide.py"""
import os, numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy import ndimage
H0 = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'images')
a = np.asarray(Image.open(os.path.join(H0, 'terrain-siege.jpg')).convert('RGB')).astype(int)
water = a[..., 2] > a[..., 0] + 20
lab, _ = ndimage.label(ndimage.binary_opening(~water, iterations=3)); isl = lab == lab[950, 780]
edge = isl & ~ndimage.binary_erosion(isl, iterations=14)
MPP = 1000 / 600; CAM = (1700, 900); CH = 15; AIMY = 990; F = 1000; VX = 2.5
TEMPLE = (780, 950); HARB = {'N': (955, 640), 'S': (950, 1150)}
W, Hh, HOR = 1600, 900, 430
def proj(x, y, z):
    d = (CAM[0] - x) * MPP; return W / 2 - F * (y - AIMY) * MPP / d, HOR + F * (CH - z * VX) / d, d
img = Image.new('RGB', (W, Hh)); dr = ImageDraw.Draw(img)
for yy in range(HOR):
    t = yy / HOR; dr.line([(0, yy), (W, yy)], fill=(int(120 + 80 * t), int(170 + 60 * t), int(225 + 20 * t)))
for yy in range(HOR, Hh):
    t = (yy - HOR) / (Hh - HOR); dr.line([(0, yy), (W, yy)], fill=(int(20 + 30 * t), int(70 + 60 * t), int(130 + 50 * t)))
try: fnt = ImageFont.truetype('DejaVuSans-Bold.ttf', 20); fs = ImageFont.truetype('DejaVuSans.ttf', 16)
except Exception: fnt = fs = ImageFont.load_default()
# Schematic, not a render: from a low viewpoint the near wall would hide everything, which helps no one. The bands are
# placed where the island's parts fall in the view (x from the true perspective), heights exaggerated so they read.
xs_all = [proj(x, y, 0)[0] for y, x in zip(*np.where(edge))]; XL, XR = min(xs_all), max(xs_all)
hx = {k: proj(*v, 0)[0] for k, v in HARB.items()}; tx0 = proj(*TEMPLE, 0)[0]
SEA = HOR + 12; WALL = 70; ROOF = 45
dr.polygon([(XL, SEA), (XL + 30, SEA - WALL * .6), (XR - 30, SEA - WALL * .6), (XR, SEA)], fill=(150, 160, 150))   # the island's low ends
for k in range(40):   # houses behind the wall: many storeys, crowded, flat roofs
    x0 = XL + 40 + (XR - XL - 80) * k / 40; hgt = ROOF + (k * 37 % 23); dr.rectangle([x0, SEA - WALL - hgt, x0 + (XR - XL) / 40 - 2, SEA - WALL + 4], fill=(226, 212, 182), outline=(170, 150, 120))
dr.rectangle([tx0 - 70, SEA - WALL - ROOF - 38, tx0 + 70, SEA - WALL], fill=(242, 224, 166), outline=(150, 120, 70), width=2)   # the temple on its platform
for dx in (-22, 22): dr.rectangle([tx0 + dx - 5, SEA - WALL - ROOF - 52, tx0 + dx + 5, SEA - WALL - 20], fill=(236, 206, 120), outline=(120, 90, 40))   # entrance pillars: a little taller than the front
dr.rectangle([XL + 25, SEA - WALL, XR - 25, SEA], fill=(196, 170, 120), outline=(120, 100, 70), width=2)   # the sea wall, straight out of the water
for x in range(int(XL + 25), int(XR - 25), 18): dr.line([(x, SEA - WALL), (x, SEA)], fill=(170, 145, 100))
for k, x in hx.items(): dr.rectangle([x - 45, SEA - 34, x + 45, SEA], fill=(40, 90, 140)); dr.polygon([(x - 30, SEA - 4), (x + 30, SEA - 4), (x + 22, SEA - 14), (x - 22, SEA - 14)], fill=(90, 60, 40))   # harbour mouth with a ship
def label(px, py, text, dy=-80):
    dr.line([(px, py), (px, py + dy)], fill=(255, 255, 255), width=2)
    tw = dr.textlength(text, font=fnt); dr.rectangle([px - tw / 2 - 6, py + dy - 26, px + tw / 2 + 6, py + dy], fill=(0, 0, 0))
    dr.text((px - tw / 2, py + dy - 24), text, font=fnt, fill=(255, 235, 160))
label(tx0, SEA - WALL - ROOF - 55, 'temple of Melqart, in the middle: two entrance pillars, not towering', -60)
label(hx['N'], SEA, 'north harbour (toward Sidon)', 120)
label(hx['S'], SEA, 'south harbour (toward Egypt)', 120)
label((XL + XR) / 2 + 300, SEA - 35, 'sea wall facing the mainland: plain stone, ~45 m (Arrian)', 200)
dr.rectangle([0, 760, W, Hh], fill=(196, 168, 112)); dr.text((24, 800), 'FOREGROUND: the mainland shore (camera on a low rise, ~15 m up, looking WEST)', font=fnt, fill=(40, 30, 10))
dr.text((24, 830), 'Strait about 700 m wide. Island about 1.5 km long (left = south, right = north). Widths true to the map; heights exaggerated.', font=fs, fill=(40, 30, 10))
dr.text((24, 20), 'SIEGE OF TYRE: VIEW GUIDE, from our siege map. The island fills most of the horizon; walls rise straight from the sea.', font=fs, fill=(0, 0, 0))
# inset: the map from above with the camera
m = Image.open(os.path.join(H0, 'terrain-siege.jpg')).convert('RGB').resize((300, 225)); md = ImageDraw.Draw(m)
cx, cy = CAM[0] / 8, CAM[1] / 8; md.polygon([(cx, cy), (500 / 8, 420 / 8), (500 / 8, 1560 / 8)], outline=(255, 255, 0)); md.ellipse([cx - 5, cy - 5, cx + 5, cy + 5], fill=(255, 40, 40))
img.paste(m, (W - 316, 16)); dr.rectangle([W - 316, 16, W - 16, 241], outline=(255, 255, 255), width=2); dr.text((W - 310, 245), 'camera (red) on the beach', font=fs, fill=(0, 0, 0))
img.save(os.path.join(H0, 'layout', 'view-from-mainland-guide.png')); print('ok')
