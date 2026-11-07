#!/usr/bin/env python3
"""Six-Day War: second-round inputs for ChatGPT's close-up maps (Jerusalem and the Golan), from REAL elevation.
    python3 battlesofhistory/sixday/tools/make-paintover.py [jerusalem golan]
Outputs to sixday/images/layout/:
  <map>-paintover.png  the ground already coloured from the elevation (and, in Jerusalem, the Old City walls and the
                       Haram al-Sharif platform drawn at their true size): ChatGPT only adds surface detail on top.
  <map>-guide2.png     the same with contour lines, places and a latitude/longitude grid, so no hill or valley can move.
The first round (7 November) moved the hills and drew the Old City twice its size; see images/layout/paintings/README.md."""
import os, sys, re, io, csv
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy.ndimage import gaussian_filter
HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, 'draw-layout-guides.py')).read().split('want = sys.argv')[0]
NS = {'__file__': os.path.join(HERE, 'draw-layout-guides.py'), '__name__': 'paintover'}; exec(compile(src, 'sixday-dlg', 'exec'), NS)
G, Guide, MAPS, rows, OUT, GREY, BLACK = NS['G'], NS['Guide'], NS['MAPS'], NS['rows'], NS['OUT'], NS['GREY'], NS['BLACK']
DEM = G['DEM']; W, H = G['W'], G['H']
rng = np.random.default_rng(1967)

# the Old City walls and the Haram al-Sharif / Temple Mount platform (lat, lon), traced from the gates' positions
OLD_CITY = [(31.7767, 35.2276), (31.7790, 35.2268), (31.7809, 35.2285), (31.7815, 35.2302), (31.7812, 35.2335),
            (31.7808, 35.2368), (31.7772, 35.2366), (31.7755, 35.2363), (31.7741, 35.2343), (31.7728, 35.2318),
            (31.7724, 35.2296), (31.7728, 35.2282), (31.7752, 35.2275)]
HARAM = [(31.7799, 35.2338), (31.7807, 35.2362), (31.7755, 35.2363), (31.7760, 35.2343)]
DOME = (31.7780, 35.2353); AQSA = (31.7761, 35.2356)

def ramp(e, stops):
    out = np.zeros(e.shape + (3,))
    xs = [s[0] for s in stops]
    for c in range(3): out[..., c] = np.interp(e, xs, [s[1][c] for s in stops])
    return out

for name in sys.argv[1:] or ['jerusalem', 'golan']:
    num, la1, lo0, la0, lo1, zoom, kind, title = MAPS[name]
    g = Guide(name + '-guide2.png', la0, la1, lo0, lo1, zoom, None, None)
    e = g.e; cell = g.km_w * 1000 / W
    hs = DEM.hillshade(gaussian_filter(e, 1.2), cell, exag=2.2)
    noise = gaussian_filter(rng.standard_normal(e.shape), 1.5) * 10
    if name == 'jerusalem':
        # limestone hills: pale stone on the tops, olive terraces and darker soil in the valleys
        rgb = ramp(e, [(600, (150, 136, 98)), (680, (176, 160, 118)), (740, (196, 182, 142)), (800, (212, 200, 164)), (840, (220, 210, 178))])
    else:
        # the Hula valley floor (farm fields) below about 200 m; dry yellow grass and black basalt above
        rgb = ramp(e, [(60, (96, 130, 70)), (190, (110, 132, 74)), (230, (170, 150, 96)), (400, (176, 156, 100)), (700, (168, 148, 98)), (1100, (150, 136, 100))])
        basalt = gaussian_filter(rng.random(e.shape), 4) > .535
        rgb[basalt & (e > 230)] *= .72
        fields = e < 200; tint = np.ones(e.shape + (3,))
        for _ in range(900):   # farm plots of different sizes and crops on the valley floor
            x, y, w, h = int(rng.uniform(0, W)), int(rng.uniform(0, H)), int(rng.uniform(30, 110)), int(rng.uniform(20, 70))
            tint[y:y + h, x:x + w] = rng.choice([[1.2, 1.1, .8], [1.0, 1.08, .9], [.85, .95, .8], [1.15, 1.0, .75]])
        rgb[fields] *= tint[fields]
    rgb = (rgb + noise[..., None]) * (.45 + .6 * hs[..., None])
    im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); d = ImageDraw.Draw(im)
    if name == 'jerusalem':
        oc = g.P(OLD_CITY); hm = g.P(HARAM)
        d.polygon(oc, fill=(206, 196, 172)); 
        for _ in range(2600):   # the Old City's dense houses and courtyards
            x, y = rng.uniform(min(p[0] for p in oc), max(p[0] for p in oc)), rng.uniform(min(p[1] for p in oc), max(p[1] for p in oc))
            s = rng.uniform(3, 7); c = int(rng.uniform(170, 225)); d.rectangle([x, y, x + s, y + s * rng.uniform(.6, 1.4)], fill=(c, c - 8, c - 26))
        mask = Image.new('L', (W, H), 0); ImageDraw.Draw(mask).polygon(oc, fill=255)
        im = Image.composite(im, Image.fromarray(rgb.clip(0, 255).astype('uint8')), mask); d = ImageDraw.Draw(im)
        d.polygon(hm, fill=(222, 214, 190), outline=(150, 140, 116))
        x, y = g.xy(*DOME); d.ellipse([x - 9, y - 9, x + 9, y + 9], fill=(214, 172, 60), outline=(90, 80, 60))
        x, y = g.xy(*AQSA); d.rectangle([x - 8, y - 5, x + 8, y + 5], fill=(150, 150, 150))
        d.line(oc + [oc[0]], fill=(120, 108, 84), width=9); d.line(oc + [oc[0]], fill=(214, 204, 176), width=5)
    im.save(os.path.join(OUT, name + '-paintover.png'), optimize=True)
    # guide2: contours (every 20 m in Jerusalem, 25 m on the Golan; every fifth one bold), places and the grid
    step = 20 if name == 'jerusalem' else 25
    es = gaussian_filter(e, 2); lv = np.floor(es / step)
    edge = (lv != np.roll(lv, 1, 0)) | (lv != np.roll(lv, 1, 1))
    bold = edge & ((np.maximum(lv, np.roll(lv, 1, 0)) % 5) == 0)
    a = np.asarray(im).copy().astype(float)
    from scipy.ndimage import binary_dilation
    a[edge] = a[edge] * .35 + np.array([60, 40, 20]) * .65; bold = binary_dilation(bold); a[bold] = (40, 25, 10)
    g.im = Image.fromarray(a.clip(0, 255).astype('uint8')); g.d = ImageDraw.Draw(g.im)
    for r in rows:
        if str(num) not in re.split(r'[;, ]+', r.get('maps') or ''): continue
        try: la, lo = float(r['lat']), float(r['lon'])
        except ValueError: continue
        if not (la0 <= la <= la1 and lo0 <= lo <= lo1): continue
        est = r['confidence'] not in ('verified',)
        g.town(la, lo, r['place'] + (' (approx.)' if est else ''), '', 24, GREY if est else BLACK, 7, -22)
    g.frame(title + ': guide 2 (contours every %d m)' % step, 'Terrain and contours from elevation: hills and valleys must stay exactly here. Places from plan/maps.md (grey = estimate).', .01)
    g.save(); print(name, 'done')
