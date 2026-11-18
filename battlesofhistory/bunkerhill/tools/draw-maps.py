#!/usr/bin/env python3
"""Battle of Bunker Hill (1775): base maps (to repaint) and guides for ChatGPT, one map per chat.
    python3 battlesofhistory/bunkerhill/tools/draw-maps.py
The 1775 shoreline is not today's (about a sixth of Boston is made land), so these bases are NOT drawn from modern data:
they are cut from Lieutenant Thomas Hyde Page's manuscript "A Plan of the Action at Bunkers-Hill" (1775, after Captain
John Montresor's survey; Library of Congress, Geography and Map Division, gm71000613; public domain), images/map-page-1775.jpg.
Georeference: a similarity transform (scale, rotation, shift) from two points that are known today, the redoubt on Breed's
Hill (the Bunker Hill Monument, 42.37636 N 71.06078 W) and Copp's Hill (42.36722 N 71.05639 W). It gives 0.87 m per pixel,
within 4% of the plan's own scale of yards (0.91 m per pixel) and a rotation under 1 degree, so the plan is close to
north-up. Positions taken from it (the landing place, the Neck, the rail fence) are the plan's, not modern guesses.
  peninsula  the Charlestown peninsula: the Neck, both hills, the redoubt, Charlestown, Moulton's Point (about 2.1 x 1.6 km)
  redoubt    the redoubt, the breastwork and the ground toward the Mystic (about 0.9 x 0.65 km)
Writes images/layout/<map>-base.png, <map>-guide.png and maps.json."""
import os, json, math
from PIL import Image, ImageDraw, ImageFont
HERE = os.path.dirname(os.path.abspath(__file__)); IMG = os.path.join(HERE, '..', 'images'); OUT = os.path.join(IMG, 'layout'); os.makedirs(OUT, exist_ok=True)
SRC = Image.open(os.path.join(IMG, 'map-page-1775.jpg')).convert('RGB')
FONT = lambda s: ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', s)
LAT0 = 42.375; KX = 111320 * math.cos(math.radians(LAT0)); KY = 111320
# control points: plan pixel (x, y) -> (lat, lon)
CP = [((1228, 1357), (42.37636, -71.06078)), ((1655, 2515), (42.36722, -71.05639))]   # the redoubt and the Copp's Hill redoubt as drawn on the plan
def en(la, lo): return ((lo + 71.06) * KX, (la - LAT0) * KY)
(p1, g1), (p2, g2) = CP
E1, N1 = en(*g1); E2, N2 = en(*g2)
du, dv = p2[0] - p1[0], -(p2[1] - p1[1]); dE, dN = E2 - E1, N2 - N1
s = math.hypot(dE, dN) / math.hypot(du, dv); rot = math.atan2(dN, dE) - math.atan2(dv, du)
ca, sa = s * math.cos(rot), s * math.sin(rot)
def px2geo(x, y):
    u, v = x - p1[0], -(y - p1[1]); E = E1 + ca * u - sa * v; N = N1 + sa * u + ca * v
    return LAT0 + N / KY, -71.06 + E / KX
def geo2px(la, lo):
    E, N = en(la, lo); E -= E1; N -= N1; d = s * s
    u = (ca * E + sa * N) / d; v = (-sa * E + ca * N) / d
    return p1[0] + u, p1[1] - v
print('scale %.3f m/px, rotation %.2f deg' % (s, math.degrees(rot)))
# places in plan pixels (read off the plan)
PL = {'redoubt': (1228, 1357), 'copps': (1655, 2515), 'neck': (300, 340), 'moulton': (2195, 1255), 'charlestown': (1000, 1850),
      'bunker': (760, 760), 'breastwork': (1240, 1230), 'mystic': (1700, 560), 'charles': (200, 1800), 'morton': (2000, 1300)}
MAPS = {'peninsula': (0, 260, 2400, 2060, 'THE CHARLESTOWN PENINSULA, 17 JUNE 1775'), 'redoubt': (820, 900, 1820, 1650, 'THE REDOUBT ON BREED\'S HILL AND THE GROUND TO THE MYSTIC, 1775')}
LABELS = {
  'peninsula': [('redoubt', 'the redoubt (Breed\'s Hill)'), ('bunker', 'Bunker Hill'), ('charlestown', 'CHARLESTOWN'), ('neck', 'Charlestown Neck'),
                ('moulton', 'Moulton\'s Point'), ('mystic', 'MYSTIC RIVER'), ('charles', 'CHARLES RIVER'), ('morton', 'Morton\'s Hill')],
  'redoubt': [('redoubt', 'the redoubt'), ('breastwork', 'the breastwork (north)')],
}
meta = []
for name, (x0, y0, x1, y1, title) in MAPS.items():
    crop = SRC.crop((x0, y0, x1, y1)).resize((2400, 1800), Image.LANCZOS)
    crop.save(os.path.join(OUT, name + '-base.png'), optimize=True)
    g = crop.copy(); d = ImageDraw.Draw(g); k = 2400 / (x1 - x0)
    P = lambda p: ((p[0] - x0) * k, (p[1] - y0) * k)
    for key, text in LABELS[name]:
        x, y = P(PL[key])
        if 0 <= x < 2400 and 0 <= y < 1800:
            d.ellipse((x - 9, y - 9, x + 9, y + 9), fill=(200, 30, 30)); f = FONT(34)
            w = d.textlength(text, font=f); tx = min(max(x - w / 2, 10), 2390 - w)
            d.text((tx, y - 56 if y > 120 else y + 18), text, font=f, fill=(255, 255, 255), stroke_width=5, stroke_fill=(20, 20, 20))
    # a lat/lon grid
    la_a, lo_a = px2geo(x0, y1); la_b, lo_b = px2geo(x1, y0)
    step = .002 if name == 'peninsula' else .001
    lo = math.ceil(min(lo_a, lo_b) / step) * step
    while lo < max(lo_a, lo_b):
        xa, ya = geo2px(max(la_a, la_b), lo); xb, yb = geo2px(min(la_a, la_b), lo)
        d.line([P((xa, ya)), P((xb, yb))], fill=(40, 90, 200), width=2); d.text((P((xa, ya))[0] + 4, 60), '%.3fW' % -lo, font=FONT(22), fill=(40, 90, 200)); lo += step
    la = math.ceil(min(la_a, la_b) / step) * step
    while la < max(la_a, la_b):
        xa, ya = geo2px(la, min(lo_a, lo_b)); xb, yb = geo2px(la, max(lo_a, lo_b))
        d.line([P((xa, ya)), P((xb, yb))], fill=(40, 90, 200), width=2); d.text((6, P((xa, ya))[1] + 4), '%.3fN' % la, font=FONT(22), fill=(40, 90, 200)); la += step
    d.rectangle((0, 0, 2400, 52), fill=(20, 20, 20)); d.text((12, 8), 'N ↑  ' + title + ': layout guide (from Page\'s plan, 1775, LOC gm71000613). Labels for the painter only.', font=FONT(28), fill=(255, 210, 120))
    g.save(os.path.join(OUT, name + '-guide.png'), optimize=True)
    corners = [px2geo(x0, y0), px2geo(x1, y0), px2geo(x0, y1), px2geo(x1, y1)]
    meta.append({'file': name + '-guide.png', 'width': 2400, 'height': 1800, 'plan_px': [x0, y0, x1, y1], 'corners_latlon_tl_tr_bl_br': corners,
                 'm_per_px': s * (x1 - x0) / 2400, 'rotation_deg': math.degrees(rot)})
    print(name, 'km %.2f x %.2f' % (s * (x1 - x0) / 1000, s * (y1 - y0) / 1000))
places = {k: px2geo(*v) for k, v in PL.items()}
json.dump({'maps': meta, 'places_from_plan': places, 'scale_m_per_plan_px': s, 'rotation_deg': math.degrees(rot)}, open(os.path.join(OUT, 'maps.json'), 'w'), indent=1)
print({k: (round(a, 5), round(b, 5)) for k, (a, b) in places.items()})
