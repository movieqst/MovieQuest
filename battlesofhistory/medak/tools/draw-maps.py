#!/usr/bin/env python3
"""Medak Pocket (1993): base maps (to repaint) and guides for ChatGPT, one map per chat, as for Mogadishu and Somalia 1988.
    python3 battlesofhistory/medak/tools/draw-maps.py [croatia lika pocket]
  croatia  Croatia and the Krajina, 1993: Zagreb, Karlovac, Gospic, Knin, the Adriatic (320 x 240 km)
  lika     Gospic and the Medak pocket (26 x 19.5 km)
  pocket   the pocket itself: Divoselo, Citluk, Pocitelj on the lower Velebit slopes (12 x 9 km)
Terrain: AWS elevation tiles (the Guide of somalia1988/tools/draw-layout-guides.py). Roads, rivers, railway, village names:
OpenStreetMap (tools/osm-lika.json, (c) OpenStreetMap contributors, ODbL). The villages of 1993: GHS-BUILT-S 1990 (tools/
ghsl-lika.json, EC JRC, CC BY 4.0): minor roads and tracks only where buildings stood by 1990; main roads everywhere. The
guides carry neutral labels only (places, rivers, mountains): no front lines; the page draws those itself. Writes
images/layout/<map>-base.png, <map>-guide.png and maps.json."""
import os, sys, json, math
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.join(HERE, '..', '..')
SOM = os.path.join(ROOT, 'somalia1988', 'tools', 'draw-layout-guides.py')
src = open(SOM).read().split('MAPS = {')[0]
NS = {'__file__': SOM, '__name__': 'medak'}; exec(compile(src, 'som-dlg', 'exec'), NS)
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy import ndimage as ndi
G, Guide, frame43, sea_mask, DRY, CACHE, clean = (NS[k] for k in ('G', 'Guide', 'frame43', 'sea_mask', 'DRY', 'CACHE', 'clean'))
RED, BLUE, BLACK, GREY, WATER = (NS[k] for k in ('RED', 'BLUE', 'BLACK', 'GREY', 'WATER'))
OUT = os.path.join(HERE, '..', 'images', 'layout'); os.makedirs(OUT, exist_ok=True); G['OUT'] = OUT; NS['OUT'] = OUT
OSM = json.load(open(os.path.join(HERE, 'osm-lika.json'))); GH = json.load(open(os.path.join(HERE, 'ghsl-lika.json')))
try: FONT = lambda s: ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', s)
except OSError: FONT = lambda s: ImageFont.load_default()
MAIN = {'motorway', 'trunk', 'trunk_link', 'primary', 'primary_link', 'secondary', 'secondary_link', 'tertiary', 'tertiary_link'}
SIDE = {'unclassified', 'residential', 'living_street', 'pedestrian', 'track', 'service'}
THRESH = 300
ALLSIDE = False   # the pocket map keeps every lane: its villages stood in 1993 (most were destroyed then and are smaller today)
MAPS = {  # name: (frame, zoom, town data, title)
  'croatia': (frame43(44.90, 15.70, 320), 8, None, 'CROATIA AND THE KRAJINA, 1993'),
  'lika':    (frame43(44.52, 15.43, 26), 13, 'lika', 'GOSPIĆ AND THE MEDAK POCKET, 1993'),
  'pocket':  (frame43(44.485, 15.400, 12), 14, 'lika', 'THE MEDAK POCKET: Divoselo, Čitluk, Počitelj, 1993'),
}
# neutral labels for the painter: (lat, lon, label, approximate?)
PLACES = {
  'croatia': [(45.815, 15.982, 'ZAGREB', 0), (45.487, 15.548, 'Karlovac', 0), (44.546, 15.375, 'Gospić', 0), (44.041, 16.199, 'Knin', 0),
              (44.119, 15.231, 'Zadar', 0), (44.817, 15.871, 'Bihać', 0), (45.327, 14.442, 'Rijeka', 0), (45.266, 15.229, 'Ogulin', 0),
              (44.989, 14.906, 'Senj', 0), (44.456, 15.508, 'Medak', 0)],
  'lika': [(44.5464, 15.3754, 'GOSPIĆ', 0), (44.5085, 15.3537, 'Divoselo', 0), (44.4741, 15.4038, 'Lički Čitluk', 0), (44.4489, 15.4451, 'Počitelj', 0),
           (44.4552, 15.5079, 'Medak', 0), (44.6026, 15.4103, 'Lički Osik', 0), (44.4975, 15.4184, 'Ornice', 0), (44.4869, 15.4516, 'Lički Ribnik', 0),
           (44.5197, 15.4375, 'Bilaj', 0), (44.5414, 15.3497, 'Kaniža', 0), (44.5138, 15.3249, 'Lički Novi', 0), (44.5339, 15.4694, 'Barlete', 0)],
  'pocket': [(44.5085, 15.3537, 'Divoselo', 0), (44.4741, 15.4038, 'Lički Čitluk', 0), (44.4489, 15.4451, 'Počitelj', 0), (44.4975, 15.4184, 'Ornice', 0),
             (44.4869, 15.4516, 'Lički Ribnik', 0), (44.5138, 15.3249, 'Lički Novi', 0), (44.5153, 15.4209, 'Novoselo Bilajsko', 0)],
}
AREAS = {
  'croatia': [(44.5, 14.4, 'ADRIATIC SEA'), (44.55, 15.05, 'Velebit mountains'), (44.4, 16.6, 'BOSNIA AND HERZEGOVINA'), (45.6, 15.2, 'CROATIA')],
  'lika': [(44.47, 15.31, 'Velebit slopes'), (44.53, 15.40, 'Lika river')],
  'pocket': [(44.465, 15.345, 'Velebit slopes')],
}


def towns_layer(g, m, rgb, town):
    """Streets, riverbeds, runway and the town of 1990 (or today's main streets for Rabat) onto rgb (H x W x 3 float)."""
    H, W = rgb.shape[:2]; la0, la1, lo0, lo1 = m
    px = lambda la, lo: ((lo - lo0) / (lo1 - lo0) * W, (la1 - la) / (la1 - la0) * H)
    mpp = (lo1 - lo0) * 111320 * math.cos(math.radians((la0 + la1) / 2)) / W
    sea = (rgb[..., 2] > rgb[..., 0] + 25) & (rgb[..., 2] > 120)
    O = OSM[town]
    if town in GH:
        gg = GH[town]; G90 = np.array(gg['e1990'], float)
        yy, xx = np.mgrid[0:H, 0:W]
        lat = la1 - (yy + .5) / H * (la1 - la0); lon = lo0 + (xx + .5) / W * (lo1 - lo0)
        r = (gg['lat1'] - lat) / abs(gg['step']) - .5; c = (lon - gg['lon0']) / gg['step'] - .5
        B = (ndi.map_coordinates(ndi.gaussian_filter(G90, .6), [r, c], order=1, mode='nearest') >= THRESH) & ~sea
        rgb[B] = rgb[B] * .5 + np.array((200, 182, 150)) * .5
        def keep(p):
            v = []
            for la, lo in p:
                rr = int((gg['lat1'] - la) / abs(gg['step'])); cc = int((lo - gg['lon0']) / gg['step'])
                v.append(0 <= rr < G90.shape[0] and 0 <= cc < G90.shape[1] and G90[max(0, rr - 1):rr + 2, max(0, cc - 1):cc + 2].max() >= THRESH)
            return sum(v) >= .6 * len(v)
    else:
        keep = lambda p: False                                  # Rabat: today's main streets only
    # water: rivers and riverbeds, lakes
    wv = Image.new('L', (W, H), 0); dw = ImageDraw.Draw(wv)
    for w in O['water']:
        q = [px(*p) for p in w['p']]
        if w['k'] == 'water' and w['closed'] and len(q) > 2: dw.polygon(q, fill=255)
        elif w['k'] in ('river', 'stream'): dw.line(q, fill=255, width=max(3, round((40 if w['k'] == 'river' else 12) / mpp)), joint='curve')
    WV = (np.asarray(wv) > 0) & ~sea; rgb[WV] = (92, 124, 132)
    rd = Image.new('L', (W, H), 0); dr = ImageDraw.Draw(rd); kept = dropped = 0
    for o in O['roads']:
        q = [px(*a) for a in o['p']]
        if not any(0 <= x < W and 0 <= y < H for x, y in q): continue
        if o['k'] in MAIN: dr.line(q, fill=255, width=max(3, round(12 / mpp)), joint='curve')
        elif o['k'] in SIDE:
            if keep(o['p']) or ALLSIDE: dr.line(q, fill=200, width=max(2, round(7 / mpp)), joint='curve'); kept += 1
            else: dropped += 1
    R = np.asarray(rd); on = (R > 0) & ~sea
    rgb[on & (R == 255)] = (218, 204, 172); rgb[on & (R == 200)] = (206, 192, 162); rgb[(R > 0) & WV] = (150, 145, 135)
    rl = Image.new('L', (W, H), 0); dl = ImageDraw.Draw(rl)
    for o in O.get('rail', []): dl.line([px(*p) for p in o['p']], fill=255, width=max(2, round(8 / mpp)))
    rgb[np.asarray(rl) > 0] = (120, 110, 100)
    rw = Image.new('L', (W, H), 0); dk = ImageDraw.Draw(rw)
    for o in O['runway']: dk.line([px(*p) for p in o['p']], fill=255, width=max(4, round(45 / mpp)))
    rgb[np.asarray(rw) > 0] = (92, 90, 86)
    return kept, dropped


want = sys.argv[1:] or list(MAPS); mj = os.path.join(OUT, 'maps.json')
old = {m['file']: m for m in (json.load(open(mj)) if os.path.exists(mj) else [])}
for name in want:
    (la0, la1, lo0, lo1), zoom, town, title = MAPS[name]
    G['RAMP'][:] = DRY
    g = Guide(name + '-guide.png', la0, la1, lo0, lo1, zoom, None, None)
    sea = sea_mask(g); rgb = g.rgb.copy().astype(float); rgb[sea] = (78, 118, 160)
    note = ''
    ALLSIDE = name == 'pocket'
    if town:
        k, d = towns_layer(g, (la0, la1, lo0, lo1), rgb, town)
        note = f'side streets kept {k}, left out {d}'
    g.im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); g.d = ImageDraw.Draw(g.im)
    if name == 'croatia':
        g.geojson_lines(clean(os.path.join(CACHE, 'ne_rivers.geojson')), WATER, 3)
    g.im.save(os.path.join(OUT, name + '-base.png'), optimize=True)
    if name == 'croatia': g.geojson_lines(clean(os.path.join(CACHE, 'ne_10m_admin_0_boundary_lines_land.geojson')), (90, 90, 90), 3)
    big = name == 'croatia'
    for la, lo, n, ap in PLACES[name]:
        if n and la0 < la < la1 and lo0 < lo < lo1: g.town(la, lo, n, '', 24 if big else 26, GREY if ap else BLACK, 7 if big else 9, -24)
    for la, lo, t in AREAS[name]:
        if la0 < la < la1 and lo0 < lo < lo1: g.text(la, lo, t, BLUE if t.isupper() and ('SEA' in t) else GREY, 26, True)
    g.frame(title + ': layout guide', 'Real elevation; streets, riverbeds and coast: OpenStreetMap (c) OSM contributors, ODbL'
            + ('; side streets only where the GHSL 1990 grid shows buildings (EC JRC, CC BY)' if town in GH else '')
            + '. Labels are for the painter only.', 1 if big else .01)
    meta = g.save(); old[meta['file']] = meta; print(name, round(meta['km_w'], 1), 'x', round(meta['km_h'], 1), 'km', note)
json.dump(list(old.values()), open(mj, 'w'), indent=1)
