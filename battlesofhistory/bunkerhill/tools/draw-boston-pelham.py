#!/usr/bin/env python3
"""Battle of Bunker Hill: the overview map, Boston and the siege lines (about 10 x 7.5 km), cut from Henry Pelham's
"A plan of Boston in New England with its environs ... with the military works constructed in those places in the years
1775 and 1776" (London, 1777; engraved by Francis Jukes; Library of Congress, Geography and Map Division, gm71000619;
public domain), the owner's download of the LOC service image (8,591 x 12,836 px).
    python3 battlesofhistory/bunkerhill/tools/draw-boston-pelham.py PELHAM.jp2
Pelham did not draw north at the top. His compass rose points to magnetic north, about 28 degrees above the map's horizontal;
the magnetic variation at Boston in 1775 was about 7 degrees west, so true north is about 21 degrees above it, and the map is
turned 69 degrees to bring true north to the top. His scale of miles gives 1.205 m per pixel at full size (1 mile = 1,329
px; 2 miles = 2,679 px). The cut keeps Cambridge Common at the left edge and Castle William at the right.
Writes images/layout/boston-base.png and boston-guide.png (labels for the painter, from the plan itself), adds the map to
maps.json, and keeps a 2,400 px copy of the whole plan as images/map-pelham-1777.jpg."""
import os, sys, json, math
from PIL import Image, ImageDraw, ImageFont
Image.MAX_IMAGE_PIXELS = None
HERE = os.path.dirname(os.path.abspath(__file__)); IMG = os.path.join(HERE, '..', 'images'); OUT = os.path.join(IMG, 'layout')
FONT = lambda s: ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', s)
im = Image.open(sys.argv[1]).convert('RGB')
c = im.copy(); c.thumbnail((2400, 4000)); c.save(os.path.join(IMG, 'map-pelham-1777.jpg'), quality=88)
K = .5; sm = im.resize((int(im.width * K), int(im.height * K)), Image.LANCZOS)
R = sm.rotate(69, expand=True, resample=Image.BICUBIC, fillcolor=(214, 204, 178))
BOX = (1700, 1230, 5850, 4342)
base = R.crop(BOX).resize((2400, 1800), Image.LANCZOS)
base.save(os.path.join(OUT, 'boston-base.png'), optimize=True)
M_PX = 1.205 / K * (BOX[2] - BOX[0]) / 2400   # metres per pixel of the 2400 x 1800 map
# places read off the plan (map pixels); anchor: Bunker Hill (the British works of 1775-76 on its top) = 42.3811 N, 71.0657 W
PL = {'Cambridge (the Common)': (40, 640), 'Prospect Hill': (480, 375), 'Winter Hill': (350, 40), 'Charlestown Neck': (990, 335),
      'Bunker Hill': (1075, 380), 'CHARLESTOWN': (1150, 560), 'BOSTON': (1320, 960), 'the Common': (1160, 1090), 'Boston Neck': (1100, 1430),
      'Roxbury (the road south)': (1060, 1740), 'Dorchester Heights': (1650, 1600), "Noddle's Island": (1700, 300), 'Castle William': (2310, 1420),
      'Brookline fort': (330, 1280)}
AREAS = {'CHARLES RIVER': (650, 1150), 'MYSTIC RIVER': (1150, 250), 'BACK BAY': (850, 1360), 'BOSTON HARBOR': (2000, 1150)}
ANCHOR = ('Bunker Hill', 42.3811, -71.0657)
ax, ay = PL[ANCHOR[0]]; KX = 111320 * math.cos(math.radians(ANCHOR[1]))
def geo(x, y): return ANCHOR[1] - (y - ay) * M_PX / 111320, ANCHOR[2] + (x - ax) * M_PX / KX
g = base.copy(); d = ImageDraw.Draw(g)
for t, (x, y) in PL.items():
    d.ellipse((x - 9, y - 9, x + 9, y + 9), fill=(200, 30, 30)); f = FONT(32); w = d.textlength(t, font=f); tx = min(max(x - w / 2, 8), 2392 - w)
    d.text((tx, y - 52 if y > 110 else y + 16), t, font=f, fill=(255, 255, 255), stroke_width=5, stroke_fill=(20, 20, 20))
for t, (x, y) in AREAS.items():
    f = FONT(36); w = d.textlength(t, font=f); d.text((x - w / 2, y), t, font=f, fill=(150, 210, 255), stroke_width=5, stroke_fill=(10, 30, 60))
d.rectangle((0, 0, 2400, 50), fill=(20, 20, 20))
d.text((12, 8), "N ↑  BOSTON AND THE SIEGE LINES, JUNE 1775: layout guide (Pelham's plan, 1777, LOC gm71000619, turned to true north). Labels for the painter only.", font=FONT(26), fill=(255, 210, 120))
g.save(os.path.join(OUT, 'boston-guide.png'), optimize=True)
mj = os.path.join(OUT, 'maps.json'); D = json.load(open(mj)); D['maps'] = [m for m in D['maps'] if m.get('file') != 'boston-guide.png']
D['maps'].append({'file': 'boston-guide.png', 'width': 2400, 'height': 1800, 'source': 'Pelham 1777, LOC gm71000619, turned 69 degrees', 'm_per_px': M_PX,
                  'anchor': ANCHOR, 'corners_latlon_tl_br': [geo(0, 0), geo(2400, 1800)], 'places_px': PL})
json.dump(D, open(mj, 'w'), indent=1)
print('m/px %.2f, %.1f x %.1f km' % (M_PX, M_PX * 2.4, M_PX * 1.8), 'corners', geo(0, 0), geo(2400, 1800))
for t, (x, y) in PL.items(): print('  %-24s %.4f %.4f' % ((t,) + geo(x, y)))
