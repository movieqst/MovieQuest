"""Vukovar map helpers: real water, roads and an estimate of the 1991 town, for the base maps given to the painter.
- osm-vukovar.json: OpenStreetMap extract (13 Nov 2026), © OpenStreetMap contributors, ODbL 1.0.
- ghsl-vukovar.json: GHS-BUILT-S R2023A built-up surface, 1990 and 2020 (European Commission JRC), CC BY 4.0.
OSM shows today's streets. A side street is kept only where the 1990 built-up grid already shows buildings around it;
main roads and the railway are kept everywhere (they are much older than 1991)."""
import os, json
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi
HERE = os.path.dirname(os.path.abspath(__file__))
OSM = json.load(open(os.path.join(HERE, 'osm-vukovar.json')))
GH = json.load(open(os.path.join(HERE, 'ghsl-vukovar.json')))
G90, G20 = np.array(GH['e1990'], float), np.array(GH['e2020'], float)
MAIN = {'primary', 'primary_link', 'secondary', 'secondary_link', 'tertiary'}
SIDE = {'unclassified', 'residential', 'living_street', 'pedestrian'}


class Frame:
    def __init__(self, la0, la1, lo0, lo1, W, H): self.la0, self.la1, self.lo0, self.lo1, self.W, self.H = la0, la1, lo0, lo1, W, H
    def px(self, la, lo): return ((lo - self.lo0) / (self.lo1 - self.lo0) * self.W, (self.la1 - la) / (self.la1 - self.la0) * self.H)
    def m_per_px(self): return (self.lo1 - self.lo0) * 111320 * np.cos(np.radians((self.la0 + self.la1) / 2)) / self.W


def built1990(la, lo, near=1):
    """Built-up surface (m2) in 1990 around (la, lo): the largest value among the cell and its neighbours."""
    r = int((GH['lat1'] - la) / GH['step']); c = int((lo - GH['lon0']) / GH['step'])
    if not (0 <= r < GH['rows'] and 0 <= c < GH['cols']): return 0
    return G90[max(0, r - near):r + near + 1, max(0, c - near):c + near + 1].max()


def built_mask(f, year=1990, thresh=400):
    """The 1990 (or 2020) built-up area on the frame, as a smooth mask: cells with at least `thresh` m2 of buildings."""
    g = G90 if year == 1990 else G20
    yy, xx = np.mgrid[0:f.H, 0:f.W]
    lat = f.la1 - (yy + .5) / f.H * (f.la1 - f.la0); lon = f.lo0 + (xx + .5) / f.W * (f.lo1 - f.lo0)
    r = (GH['lat1'] - lat) / GH['step'] - .5; c = (lon - GH['lon0']) / GH['step'] - .5
    v = ndi.map_coordinates(ndi.gaussian_filter(g, .6), [r, c], order=1, mode='nearest')
    return v >= thresh


def water_mask(f):
    """The Danube and its side channels from OSM's water areas: the outlines are drawn as walls, and every piece of the
    frame that holds a point of the Danube's centre line is water (islands stay land). Plus the Vuka from its centre line."""
    walls = Image.new('L', (f.W, f.H), 0); dw = ImageDraw.Draw(walls)
    for w in OSM['water']:
        if w['k'] in ('river', 'oxbow', None) and w.get('role') != 'main_stream' and len(w['p']) > 1: dw.line([f.px(*p) for p in w['p']], fill=255, width=3)
    wl = np.asarray(walls) > 0
    lab, n = ndi.label(~wl)
    seeds = set()
    for r in OSM['rivers']:
        if r['n'].startswith('Dunav'):
            for p in r['p']:
                x, y = f.px(*p)
                if 0 <= x < f.W and 0 <= y < f.H and lab[int(y), int(x)]: seeds.add(lab[int(y), int(x)])
    m = np.isin(lab, list(seeds)) | (wl & ndi.binary_dilation(np.isin(lab, list(seeds)), iterations=3))
    vk = Image.new('L', (f.W, f.H), 0); dv = ImageDraw.Draw(vk); wpx = max(3, round(20 / f.m_per_px()))
    for r in OSM['rivers']:
        if r['n'] == 'Vuka': dv.line([f.px(*p) for p in r['p']], fill=255, width=wpx, joint='curve')
    return m | (np.asarray(vk) > 0)


def roads(f, rgb, WM, main_m=14, side_m=9, thresh=400):
    """Draw the roads and railway onto rgb (H x W x 3 float array). Returns (side streets kept, left out)."""
    k = f.m_per_px(); wm, ws = max(2, round(main_m / k)), max(1, round(side_m / k))
    rd = Image.new('L', (f.W, f.H), 0); dr = ImageDraw.Draw(rd); kept = dropped = 0
    for o in OSM['roads']:
        q = [f.px(*a) for a in o['p']]
        if not any(0 <= x < f.W and 0 <= y < f.H for x, y in q): continue
        if o['k'] in MAIN: dr.line(q, fill=255, width=wm, joint='curve')
        elif o['k'] in SIDE:
            v = [built1990(*a) >= thresh for a in o['p']]
            if sum(v) >= .6 * len(v): dr.line(q, fill=200, width=ws, joint='curve'); kept += 1
            else: dropped += 1
    R = np.asarray(rd)
    edge = ndi.binary_dilation(R > 0, iterations=max(1, wm // 6)) & ~(R > 0) & ~WM
    rgb[edge] = rgb[edge] * .6 + np.array((120, 110, 95)) * .4
    rgb[(R == 255) & ~WM] = (196, 190, 178); rgb[(R == 200) & ~WM] = (186, 180, 168)
    rgb[WM & (R > 0)] = (150, 145, 135)                                     # bridges
    rl = Image.new('L', (f.W, f.H), 0); dl = ImageDraw.Draw(rl)
    for o in OSM['roads']:
        if o['k'] == 'rail': dl.line([f.px(*a) for a in o['p']], fill=255, width=max(2, round(5 / k)))
    rgb[np.asarray(rl) > 0] = (95, 88, 80)
    return kept, dropped
