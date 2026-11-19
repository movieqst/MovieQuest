#!/usr/bin/env python3
"""Yugoslavia: Escalation, 1980-1991: the three new base maps (to repaint) and guides for ChatGPT, one map per chat
(the Europe map is the Ukraine page's). Made from bunkerhill/tools/draw-zooms.py.
  yugoslavia  the federation: six republics and two provinces (about 1100 x 825 km)
  kosovo      Kosovo: Pristina, Kosovo Polje, Gazimestan, Mitrovica and Trepca (about 160 x 120 km)
  croatia     Croatia: Zagreb, Knin, Srb, Plitvice, Pakrac, Borovo Selo, Vukovar, Split (about 560 x 420 km)
The paintings show land and water only; the page draws the borders of the republics and provinces and the names.
(Former docstring follows.) Battle of Bunker Hill: three zoom maps between the opening globe and the battle maps (owner, 18 Nov 2026: "the globe
doesn't have enough detail, doesn't show the water in Boston"), wide to narrow, like Mogadishu's zooms:
  coast    the Atlantic coast of North America, 1775 (about 3200 x 2400 km)
  newengland  New England and Long Island (about 420 x 315 km)
  bostonarea  Boston and its harbour (about 40 x 30 km)
Real elevation (AWS terrain tiles) and Natural Earth lakes and rivers, through the Ukraine tool
(ukraine-escalation/tools/draw-maps.py). Near Boston much of today's shore is later landfill: inside the frame of the page's 1775 Boston
map (images/boston-painting.jpg, after Pelham's plan of 1777) the water is taken from that map, so the base shows the 1775 shore.
Writes images/layout/<map>-base.png, <map>-guide.png and writes their corners to images/layout/zooms.json.
    python3 battlesofhistory/bunkerhill/tools/draw-zooms.py"""
import os, json, sys
HERE = os.path.dirname(os.path.abspath(__file__)); UK = os.path.join(HERE, '..', '..', 'ukraine-escalation', 'tools', 'draw-maps.py')
src = open(UK).read().split('\nwant = sys.argv')[0]
NS = {'__file__': UK, '__name__': 'yu-maps'}; exec(compile(src, 'uk-maps', 'exec'), NS)
G, Guide, frame43, sea_mask, CACHE, clean, GREEN, WATER, BLUE, BLACK, GREY, RED = (NS[k] for k in ('G', 'Guide', 'frame43', 'sea_mask', 'CACHE', 'clean', 'GREEN', 'WATER', 'BLUE', 'BLACK', 'GREY', 'RED'))
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi
OUT = os.path.join(HERE, '..', 'images', 'layout'); os.makedirs(OUT, exist_ok=True); G['OUT'] = OUT; NS['OUT'] = OUT
MAPS = {
  'yugoslavia': (frame43(43.9, 18.7, 1100), 7, 'YUGOSLAVIA, 1980-1991: SIX REPUBLICS AND TWO PROVINCES'),
  'kosovo':     (frame43(42.6, 20.9, 160), 10, 'KOSOVO, 1981-1990'),
  'croatia':    (frame43(44.6, 17.0, 560), 8, 'CROATIA, 1990-1991'),
}
PLACES = {
  'yugoslavia': [(44.82, 20.46, 'BELGRADE'), (45.81, 15.98, 'Zagreb'), (46.05, 14.51, 'Ljubljana'), (43.86, 18.41, 'Sarajevo'), (41.99, 21.43, 'Skopje'),
                 (42.44, 19.26, 'Titograd (Podgorica)'), (42.66, 21.17, 'Pristina'), (45.25, 19.84, 'Novi Sad'), (43.51, 16.44, 'Split'), (44.04, 16.20, 'Knin'),
                 (45.35, 19.00, 'Vukovar'), (42.65, 18.09, 'Dubrovnik'), (45.33, 14.44, 'Rijeka'), (43.32, 21.90, 'Nis')],
  'kosovo': [(42.66, 21.17, 'PRISTINA'), (42.64, 21.10, 'Kosovo Polje'), (42.69, 21.13, 'Gazimestan monument'), (42.89, 20.87, 'Mitrovica'),
             (42.93, 20.90, 'Trepca mine (approx.)'), (42.21, 20.74, 'Prizren'), (42.66, 20.29, 'Pec (Peja)'), (42.38, 20.43, 'Djakovica (Gjakova)'), (42.47, 21.47, 'Gnjilane (Gjilan)')],
  'croatia': [(45.81, 15.98, 'ZAGREB'), (44.04, 16.20, 'Knin'), (44.38, 16.14, 'Srb'), (44.88, 15.62, 'Plitvice Lakes'), (45.44, 17.19, 'Pakrac'),
              (45.40, 18.97, 'Borovo Selo'), (45.35, 19.00, 'Vukovar'), (43.51, 16.44, 'Split'), (42.65, 18.09, 'Dubrovnik'), (45.33, 14.44, 'Rijeka'),
              (44.54, 15.37, 'Gospic'), (45.55, 18.69, 'Osijek'), (44.12, 15.23, 'Zadar'), (46.05, 14.51, 'Ljubljana'), (44.82, 20.46, 'Belgrade'), (43.86, 18.41, 'Sarajevo'), (44.77, 17.19, 'Banja Luka')],
}
AREAS = {
  'yugoslavia': [(42.6, 16.5, 'ADRIATIC SEA'), (44.9, 21.6, 'Danube'), (45.5, 17.0, 'Drava'), (45.05, 17.5, 'Sava'), (46.9, 19.5, 'HUNGARY'), (46.6, 13.0, 'AUSTRIA'),
                 (45.6, 12.4, 'ITALY'), (44.8, 23.5, 'ROMANIA'), (42.6, 23.6, 'BULGARIA'), (40.6, 21.0, 'GREECE'), (41.3, 19.9, 'ALBANIA')],
  'kosovo': [(42.6, 20.6, 'Drenica (approx.)'), (42.83, 21.25, 'Lab river (approx.)'), (42.95, 20.55, 'Ibar river (approx.)')],
  'croatia': [(43.7, 15.4, 'ADRIATIC SEA'), (45.1, 18.2, 'Sava'), (45.7, 17.6, 'Drava'), (45.6, 19.4, 'Danube'), (44.6, 15.9, 'Lika (approx.)'), (45.25, 16.2, 'Banija (approx.)'),
              (45.15, 15.6, 'Kordun (approx.)'), (43.9, 16.6, 'northern Dalmatia (approx.)'), (45.4, 18.5, 'Slavonia'), (44.0, 18.6, 'BOSNIA AND HERZEGOVINA'), (46.3, 17.5, 'HUNGARY')],
}
mj = os.path.join(OUT, 'maps.json'); old = {m['file']: m for m in (json.load(open(mj)) if os.path.exists(mj) else [])}
for name in (sys.argv[1:] or list(MAPS)):
    (la0, la1, lo0, lo1), zoom, title = MAPS[name]
    G['RAMP'][:] = GREEN
    g = Guide(name + '-guide.png', la0, la1, lo0, lo1, zoom, None, None)
    low = g.e <= .5; lab0, n0 = ndi.label(low); edge = set(np.unique(np.concatenate([lab0[0], lab0[-1], lab0[:, 0], lab0[:, -1]]))) - {0}
    sea = np.isin(lab0, list(edge)); sz = ndi.sum(np.ones_like(lab0), lab0, range(1, n0 + 1))
    sea |= np.isin(lab0, [i + 1 for i, v in enumerate(sz) if v > 20000])
    rgb = g.rgb.copy().astype(float); rgb[sea] = (82, 120, 158)
    g.im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); g.d = ImageDraw.Draw(g.im)
    g.lakes(clean(os.path.join(CACHE, 'ne_10m_lakes.geojson'))); g.geojson_lines(clean(os.path.join(CACHE, 'ne_rivers.geojson')), WATER, 3)
    g.im.save(os.path.join(OUT, name + '-base.png'), optimize=True)
    g.geojson_lines(clean(os.path.join(CACHE, 'ne_10m_admin_0_boundary_lines_land.geojson')), (90, 90, 90), 3)
    for la, lo, t in PLACES[name]:
        if la0 < la < la1 and lo0 < lo < lo1: g.town(la, lo, t, '', 24, GREY if 'approx' in t else BLACK, 8, -24)
    for la, lo, t in AREAS[name]:
        if la0 < la < la1 and lo0 < lo < lo1: g.text(la, lo, t, BLUE if 'SEA' in t or t in ('Danube', 'Drava', 'Sava') or 'river' in t else GREY, 24, True)
    g.frame(title + ': layout guide', 'Real elevation; lakes and rivers: Natural Earth. Borders: today’s, for orientation only, not to paint. Labels are for the painter only.', {'yugoslavia': 2, 'kosovo': .25, 'croatia': 1}[name])
    meta = g.save(); old[meta['file']] = meta; print(name, round(meta['km_w']), 'x', round(meta['km_h']), 'km')
json.dump(list(old.values()), open(mj, 'w'), indent=1)
