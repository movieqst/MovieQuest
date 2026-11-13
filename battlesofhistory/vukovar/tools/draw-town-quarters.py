#!/usr/bin/env python3
"""Vukovar: a sharper town map, painted in four overlapping quarters. ChatGPT paints about 1450 x 1090 px whatever size we
ask for, so the whole town map (12 x 9 km on 2400 x 1800) comes back soft. Each quarter covers 55 % of the town map's width
and height (6.6 x 5 km), so each is painted at about 2.4 times the detail; the quarters overlap by 10 % so they can be
joined with a soft seam. Same frame as the town map (images/town-painting.jpg), so nothing else on the page changes.
    python3 battlesofhistory/vukovar/tools/draw-town-quarters.py
Writes images/layout/town-q1..q4-base.png (terrain and water, to repaint), -guide.png (places, built-up areas of 1991,
the exact foot of the water tower and other landmarks) and -style.png (the same area cut from the present painting, so
the four quarters keep its look), and town-quarters.json (the corners)."""
import os, json
HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, 'draw-layout-guides.py')).read().split('# ================= 1.')[0]
NS = {'__file__': os.path.join(HERE, 'draw-layout-guides.py'), '__name__': 'town-quarters'}; exec(compile(src, 'dlg', 'exec'), NS)
from PIL import Image
globals().update({k: NS[k] for k in ('G', 'Guide', 'water', 'shade_builtup', 'RAMP', 'OUT', 'BLACK', 'GREY', 'BLUE', 'RED', 'WHITE', 'W', 'H',
                                      'TOWER', 'HOSPITAL', 'BARRACKS', 'VELEPROMET', 'LUZAC', 'MILOVO', 'MITNICA', 'SAJMISTE', 'BOROVO_N', 'VUKA_TOWN', 'VUKA_MOUTH', 'VUCEDOL')})
T = dict(lat0=45.32, lat1=45.398, lon0=18.932, lon1=19.0800085)   # the town map's frame (scenario.js GEO.town)
F, O = .55, .45                                                    # each quarter: 55 % of the frame; offsets 0 or 45 %
PAINT = Image.open(os.path.join(HERE, '..', 'images', 'town-painting.jpg')).convert('RGB')
# landmarks the painter must place exactly: (lat, lon, label, what it is)
MARKS = [(*TOWER, 'WATER TOWER', 'foot of the tower exactly here'), (*HOSPITAL, 'HOSPITAL', ''), (*BARRACKS, 'JNA BARRACKS', ''),
         (45.3478, 19.0004, 'Franciscan church', 'approx.'), (45.3497, 19.0012, 'Eltz Palace', 'approx.')]
# the water, traced once on the whole town map (the Vuka needs the west edge of the whole frame), then cut per quarter
import numpy as np
G['RAMP'][:] = RAMP
gw = Guide('town-water-tmp.png', T['lat0'], T['lat1'], T['lon0'], T['lon1'], 15, None, None)
water(gw, 74.5, [[('W', 45.33, 45.37), VUKA_TOWN, VUKA_MOUTH]], 3)
WMASK = Image.fromarray((np.all(np.asarray(gw.im) == np.array(NS['WATER']), axis=2) * 255).astype('uint8'))
for f in ('town-water-tmp.png', 'town-water-tmp-base.png'):
    try: os.remove(os.path.join(OUT, f))
    except OSError: pass
metas = []
for q, (fx, fy) in enumerate([(0, 0), (O, 0), (0, O), (O, O)], 1):
    lon0 = T['lon0'] + fx * (T['lon1'] - T['lon0']); lon1 = lon0 + F * (T['lon1'] - T['lon0'])
    lat1 = T['lat1'] - fy * (T['lat1'] - T['lat0']); lat0 = lat1 - F * (T['lat1'] - T['lat0'])
    G['RAMP'][:] = RAMP
    g = Guide('town-q%d-guide.png' % q, lat0, lat1, lon0, lon1, 15, None, None)
    mw, mh = WMASK.size; m = np.asarray(WMASK.crop((round(fx * mw), round(fy * mh), round((fx + F) * mw), round((fy + F) * mh))).resize((W, H), Image.BILINEAR)) > 127
    rgb = g.rgb.copy(); rgb[m] = NS['WATER']; g.im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); g.d = NS['ImageDraw'].Draw(g.im)
    g.im.save(os.path.join(OUT, 'town-q%d-base.png' % q), optimize=True)
    shade_builtup(g)
    inside = lambda la, lo: lat0 < la < lat1 and lon0 < lo < lon1
    for la, lo, name, sub in MARKS:
        if not inside(la, lo): continue
        x, y = g.xy(la, lo); r = 18
        g.d.ellipse([x - r, y - r, x + r, y + r], outline=RED, width=5); g.d.line([x - 34, y, x + 34, y], fill=RED, width=3); g.d.line([x, y - 34, x, y + 34], fill=RED, width=3)
        g.d.text((x + 40, y - 30), name, fill=BLACK, font=NS['F'](30), stroke_width=4, stroke_fill=WHITE)
        if sub: g.d.text((x + 40, y + 4), sub, fill=RED, font=NS['F'](22), stroke_width=3, stroke_fill=WHITE)
    for (la, lo), name in [(LUZAC, 'Lužac'), (MILOVO, 'Milovo brdo'), (MITNICA, 'Mitnica'), (SAJMISTE, 'Sajmište'), (BOROVO_N, 'BOROVO NASELJE (factory town)'), (VUCEDOL, 'Vučedol'), (VELEPROMET, 'Velepromet (approx.)')]:
        if inside(la, lo): g.town(la, lo, name, '', 26, BLACK, 8, -30)
    if inside(45.372, 19.02): g.text(45.372, 19.02, 'DANUBE', BLUE, 44, True)
    if inside(45.3478, 18.962): g.text(45.3478, 18.962, 'Vuka', BLUE, 30, True)
    g.frame('VUKOVAR TOWN MAP, QUARTER %d of 4 (layout guide)' % q, 'Real elevation; 1991 built-up areas from the CIA map; red crosses: landmarks to place exactly. Do not paint labels or marks.', .01)
    metas.append(dict(g.save(), quarter=q, fx=fx, fy=fy))
    # the same area of the present painting, for the style
    pw, ph = PAINT.size; PAINT.crop((round(fx * pw), round(fy * ph), round((fx + F) * pw), round((fy + F) * ph))).resize((W, H), Image.LANCZOS).save(os.path.join(OUT, 'town-q%d-style.png' % q), optimize=True)
json.dump(metas, open(os.path.join(OUT, 'town-quarters.json'), 'w'), indent=1)
for m in metas: print(m['quarter'], m['file'], round(m['km_w'], 2), 'x', round(m['km_h'], 2), 'km')
