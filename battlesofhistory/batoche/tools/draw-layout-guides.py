#!/usr/bin/env python3
"""Batoche 1885: layout guides and clean bases for three maps, from REAL elevation (AWS terrain tiles via the Talas tools).
    python3 battlesofhistory/batoche/tools/draw-layout-guides.py
Outputs to batoche/images/layout/:
  battle-guide.png / battle-base.png   Batoche itself, about 4.4 x 3.3 km (9-12 May 1885)
  region-guide.png / region-base.png   the South Branch from Clarke's Crossing to Batoche and Duck Lake (Fish Creek, the Northcote)
  campaign-guide.png / campaign-base.png  the North-West, spring 1885 (railway, the three columns, all the battles)
  maps.json (the frames' corners).
The rivers on the battle and region maps come from the elevation (the South Saskatchewan's surface is the lowest ground);
on the campaign map from Natural Earth (public domain). Places: see batoche/RESEARCH-NOTES.md. Positions marked
'approx.' are still to be checked against the research (Hildebrandt 1985, Parks Canada, the 1885 sketch map)."""
import json, math, os, sys
import numpy as np
from PIL import Image, ImageDraw
from scipy.ndimage import binary_opening, binary_closing, label, minimum_filter, gaussian_filter
HERE = os.path.dirname(os.path.abspath(__file__)); TT = os.path.join(HERE, '..', '..', 'talas', 'tools')
sys.path.insert(0, TT)
src = open(os.path.join(TT, 'draw-layout-guides.py')).read().split('# ---------- places (lat, lon) ----------')[0]
# west longitudes: label them °W, and allow finer grid steps
src = src.replace("('%.2f°E' if step < 1 else '%.0f°E') % lon", "('%.3f°W' if step < .01 else '%.2f°W' if step < 1 else '%.0f°W') % -lon")
src = src.replace("('%.2f°N' if step < 1 else '%.0f°N') % lat", "('%.3f°N' if step < .01 else '%.2f°N' if step < 1 else '%.0f°N') % lat")
src = src.replace("'Real terrain (SRTM).", "'Real terrain.").replace("%.3f°N %.3f°E (top left) to %.3f°N %.3f°E (bottom right)", "%.3f°N %.3f°W (top left) to %.3f°N %.3f°W (bottom right)")
src = src.replace("% (W, H, self.km_w, self.km_h, W / self.km_w, self.lat1, self.lon0, self.lat0, self.lon1, note)", "% (W, H, self.km_w, self.km_h, W / self.km_w, self.lat1, -self.lon0, self.lat0, -self.lon1, note)")
G = {'__file__': os.path.join(TT, 'draw-layout-guides.py')}; exec(compile(src, 'dlg', 'exec'), G)
OUT = os.path.join(HERE, '..', 'images', 'layout'); G['OUT'] = OUT
Guide, F, RED, BLUE, BLACK, GREY, ORANGE, PURPLE, WATER, WHITE = (G[k] for k in ('Guide', 'F', 'RED', 'BLUE', 'BLACK', 'GREY', 'ORANGE', 'PURPLE', 'WATER', 'WHITE'))
W, H = G['W'], G['H']; CACHE = G['CACHE']
GREEN, BROWN = (20, 120, 50), (120, 80, 40)
# the Métis side is blue in the battle card (sideColors ['#c0392b', '#2f6fc4']): Field Force red, defenders blue
FF, MET = RED, BLUE


def river_from_dem(g, window_px, rise, min_px, cap=None, span=.3):
    """Water = ground within `rise` metres of the lowest point nearby (the river surface is flat and lowest),
    below `cap` metres, in long pieces only (rivers cross the map; prairie sloughs are round and small)."""
    e = gaussian_filter(g.e, 1)
    low = minimum_filter(e, size=window_px)
    w = e < low + rise
    if cap: w &= e < cap
    w = binary_closing(binary_opening(w, iterations=2), iterations=2)
    lab, n = label(w); keep = np.zeros(n + 1, bool)
    from scipy.ndimage import find_objects
    for i, sl in enumerate(find_objects(lab), 1):
        if sl is None: continue
        hh, ww = sl[0].stop - sl[0].start, sl[1].stop - sl[1].start
        keep[i] = max(hh / H, ww / W) > span and (lab[sl] == i).sum() > min_px
    w = keep[lab]
    rgb = g.rgb.copy(); rgb[w] = WATER
    g.im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); g.d = ImageDraw.Draw(g.im)
    g.im.save(os.path.join(OUT, g.name.replace('-guide.png', '-base.png')), optimize=True)
    return w


def river_paths(g, ends, half_width):
    """Rivers too long for the flat-surface trick: the cheapest path down the valley floor between two edge points
    (lowest point in each given edge window), drawn about 2 x half_width px wide."""
    from skimage.graph import route_through_array
    from scipy.ndimage import binary_dilation
    e = gaussian_filter(g.e, 1.5); c = np.exp((e - e.min()) / 6.0); w = np.zeros(e.shape, bool)
    def edge(side, a, b):
        a, b = int(a * (W if side in 'tb' else H)), int(b * (W if side in 'tb' else H))
        if side == 'b': return (H - 1, a + int(np.argmin(e[-1, a:b])))
        if side == 't': return (0, a + int(np.argmin(e[0, a:b])))
        if side == 'l': return (a + int(np.argmin(e[a:b, 0])), 0)
        return (a + int(np.argmin(e[a:b, -1])), W - 1)
    for s, t in ends:
        path, _ = route_through_array(c, edge(*s), edge(*t), fully_connected=True, geometric=True)
        for y, x in path: w[y, x] = True
    w = binary_dilation(w, iterations=half_width)
    rgb = g.rgb.copy(); rgb[w] = WATER
    g.im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); g.d = ImageDraw.Draw(g.im)
    g.im.save(os.path.join(OUT, g.name.replace('-guide.png', '-base.png')), optimize=True)
    return w


os.makedirs(OUT, exist_ok=True); metas = []

# ---------- places (lat, lon); see RESEARCH-NOTES.md ----------
CHURCH = (52.7525, -106.1182)        # Saint-Antoine-de-Padoue and the rectory (Google Maps)
CEMETERY = (52.7490, -106.1200)      # ~400 m south of the church (Parks Canada map)
EAST_VILLAGE = (52.7620, -106.1330)  # East Village, Batoche's store, the Carlton Trail crossing (Parks Canada map, approx.)
FERRY = (52.7618, -106.1372)         # old ferry site / dock (approx.)
RIFLE_PITS = (52.7585, -106.1225)    # Métis rifle pits between the village and the church (approx.)
MISSION_RIDGE = (52.7522, -106.1225) # Mission Ridge, just west of the church on the valley edge (approx.)
ZAREBA = (52.7460, -106.1060)        # Middleton's zareba, ~1 km SE of the church (approx.)
CARON = (52.7470, -106.1085)         # Caron home (approx.)
VISITOR = (52.7542, -106.1126)       # modern visitor centre (reference)

# ================= 1. the battle map =================
G['RAMP'][:] = [(430, (150, 178, 120)), (440, (160, 184, 124)), (455, (176, 190, 128)), (470, (190, 194, 134)), (485, (200, 196, 140)), (500, (206, 198, 146))]
LAT0, LAT1, LON0, LON1 = 52.7395, 52.7692, -106.1526, -106.0874
g = Guide('battle-guide.png', LAT0, LAT1, LON0, LON1, 15, None, None)
river_from_dem(g, 301, 2.5, 20000, cap=441)
g.town(*CHURCH, 'CHURCH & RECTORY', 'Saint-Antoine-de-Padoue (1884)', 28, BLACK, 12, -34, walled=True)
g.town(*CEMETERY, 'Cemetery', '', 22, GREY, 8, 24)
g.town(*EAST_VILLAGE, 'BATOCHE (East Village)', "Letendre's store, the Carlton Trail crossing", 28, MET, 12, -34)
g.town(*FERRY, 'ferry', '', 22, GREY, 7, 24, walled=True)
g.zone([(52.7610, -106.1290), (52.7605, -106.1170), (52.7560, -106.1160), (52.7565, -106.1280)], 'Métis rifle pits\n(approx. area)', MET)
g.zone([(52.7540, -106.1260), (52.7540, -106.1215), (52.7495, -106.1225), (52.7495, -106.1265)], 'Mission Ridge\n(rifle pits, guns)', MET, at=(52.7518, -106.1300))
g.town(*ZAREBA, 'ZAREBA', "Middleton's fortified camp (approx.)", 28, FF, 12, 30, walled=True)
g.town(*CARON, 'Caron home', '', 20, GREY, 7, -24)
g.arrow([(52.7395, -106.0960), (52.7440, -106.1030), ZAREBA], FF, 'from Fish Creek', 7, at=0)
g.arrow([ZAREBA, (52.7500, -106.1120), (52.7540, -106.1180), (52.7590, -106.1250), (52.7615, -106.1310)], FF, '12 May charge (route approx.)', 7, at=.5)
g.line([(52.7692, -106.0940), (52.7470, -106.1000), (52.7395, -106.0960)], (40, 40, 40), 5, dash=10)
g.text(52.7660, -106.0905, 'Hwy 225 (modern)', GREY, 20, True)
g.text(52.7690 - .0035, -106.1050, 'Carlton Trail (approx.)', BROWN, 22, True)
g.line([FERRY, (52.7640, -106.1250), (52.7670, -106.1100), (52.7692, -106.0990)], BROWN, 5, dash=14)
g.text(52.7450, -106.1410, 'South Saskatchewan River', BLUE, 28, True)
g.text(52.7655, -106.1460, 'west bank', GREY, 24, True)
g.text(52.7430, -106.1230, 'the Northcote steamed down\nthe river past Batoche, 9 May', BLUE, 22, True)
g.frame('BATOCHE, 9-12 May 1885: battle map guide', 'River from the elevation. Places: Parks Canada map; most positions approx., to check.', .01)
metas.append(g.save())

# ================= 2. the region: the South Branch =================
G['RAMP'][:] = [(420, (150, 178, 120)), (450, (168, 188, 126)), (480, (186, 194, 132)), (520, (198, 196, 140)), (560, (196, 186, 136)), (620, (180, 168, 124))]
R = dict(lat0=52.28, lat1=52.96, lon0=-107.04, lon1=-105.56)
g = Guide('region-guide.png', R['lat0'], R['lat1'], R['lon0'], R['lon1'], 12, None, None)
river_paths(g, [(('b', .35, .44), ('t', .82, .92)), (('l', .78, .96), ('t', .36, .46))], 3)   # South and North Saskatchewan
P = {
 'Batoche': CHURCH, 'Fish Creek': (52.5390, -106.1527), 'Duck Lake': (52.8242, -106.2742), 'Fort Carlton': (52.8740, -106.5310),
 'Clarke\'s Crossing': (52.3200, -106.4570), 'Gabriel\'s Crossing': (52.6700, -106.1220),
 'Rosthern': (52.6640, -106.3300), 'Duck Lake town': (52.8000, -106.2670),
}
g.town(*P['Batoche'], 'BATOCHE', '9-12 May 1885', 32, RED, 14, -36, walled=True)
g.town(*P['Fish Creek'], 'FISH CREEK', "Tourond's Coulee, 24 April (Parks Canada site)", 28, BLACK, 11, 30)
g.town(*P['Duck Lake'], 'DUCK LAKE', 'first clash, 26 March (battlefield cairn)', 28, BLACK, 11, -34)
g.town(*P['Duck Lake town'], 'Duck Lake (town)', '', 20, GREY, 6, 22)
g.town(*P['Fort Carlton'], 'Fort Carlton', 'HBC post, burned 28 March', 24, BLACK, 9, -30, walled=True)
g.town(*P["Clarke's Crossing"], "Clarke's Crossing", "Middleton's camp, April (Clarkboro ferry)", 24, BLACK, 9, 28)
g.town(*P["Gabriel's Crossing"], "Gabriel's Crossing", "Dumont's ferry, ~6 miles above Batoche (approx.)", 22, GREY, 8, 26)
g.town(*P['Rosthern'], 'Rosthern (modern)', '', 20, GREY, 6, -24)
g.arrow([P["Clarke's Crossing"], (52.4300, -106.3000), P['Fish Creek'], (52.6200, -106.1000), (52.7000, -106.0900), (52.7460, -106.1060)], RED, "Middleton's column (route approx.)", 7, at=.25)
g.text(52.470, -105.900, 'the Northcote steamed down\nthe river to Batoche, 9 May', BLUE, 22, True)
g.text(52.400, -106.650, 'South Saskatchewan River', BLUE, 26, True)
g.text(52.935, -106.700, 'North Saskatchewan River', BLUE, 22, True)
g.frame('THE SOUTH BRANCH, spring 1885: Duck Lake, Fish Creek, Batoche', 'River from the elevation. Places approx.; routes illustrative, to check.', .1)
metas.append(g.save())

# ================= 3. the campaign: the North-West, 1885 =================
G['RAMP'][:] = [(250, (150, 178, 120)), (450, (176, 190, 128)), (600, (194, 196, 138)), (750, (200, 190, 136)), (900, (186, 172, 126)), (1100, (168, 150, 112))]
C = dict(lat0=49.85, lat1=54.2, lon0=-111.3, lon1=-101.9)
g = Guide('campaign-guide.png', C['lat0'], C['lat1'], C['lon0'], C['lon1'], 7, None, None)
g.lakes(os.path.join(CACHE, 'ne_10m_lakes.geojson'))
g.geojson_lines(os.path.join(CACHE, 'ne_rivers.geojson'), WATER, 5)
g.im.save(os.path.join(OUT, 'campaign-base.png'), optimize=True)
P = {
 'Batoche': CHURCH, 'Fish Creek': (52.5390, -106.1527), 'Duck Lake': (52.8242, -106.2742), 'Fort Carlton': (52.8740, -106.5310),
 'Prince Albert': (53.2000, -105.7500), 'Battleford': (52.7330, -108.3100), 'Cut Knife Hill': (52.8000, -109.0300),
 'Frog Lake': (53.8900, -110.3800), 'Fort Pitt': (53.5748, -109.7937), "Frenchman's Butte": (53.6273, -109.5755),
 'Qu\'Appelle': (50.5400, -103.8800), 'Fort Qu\'Appelle': (50.7700, -103.7900), 'Regina': (50.4500, -104.6100),
 'Moose Jaw': (50.3900, -105.5300), 'Swift Current': (50.2900, -107.7900), "Clarke's Crossing": (52.3200, -106.4570),
 'Humboldt': (52.2000, -105.1200), 'Touchwood Hills': (51.3500, -104.5500), 'Saskatoon': (52.1300, -106.6700),
}
g.line([(50.62, -101.9), P["Qu'Appelle"], P['Regina'], P['Moose Jaw'], P['Swift Current'], (49.98, -109.0), (49.85, -109.6)], (40, 40, 40), 6)
g.text(50.10, -106.2, 'Canadian Pacific Railway (1885)', (40, 40, 40), 24, True)
g.arrow([P["Qu'Appelle"], P["Fort Qu'Appelle"], P['Touchwood Hills'], P['Humboldt'], P["Clarke's Crossing"], P['Fish Creek'], P['Batoche']], RED, '', 7)
g.text(51.75, -103.75, "Middleton's column\n(route approx.)", RED, 24, True)
g.arrow([P['Swift Current'], (51.40, -108.00), P['Battleford'], P['Cut Knife Hill']], RED, '', 6)
g.text(51.45, -108.75, "Otter's column", RED, 24, True)
g.arrow([(53.9, -111.3), (53.75, -110.5), P['Fort Pitt'], P["Frenchman's Butte"]], RED, '', 6)
g.text(53.30, -110.45, "Strange's column\n(from Calgary and Edmonton)", RED, 22, True)
x, y = g.xy(*P['Batoche']); g.d.rectangle([x - 14, y - 14, x + 14, y + 14], fill=RED, outline=WHITE, width=3)
g.d.text((x + 26, y), 'BATOCHE', fill=RED, font=F(32, True), anchor='lb', stroke_width=4, stroke_fill=WHITE)
g.d.text((x + 26, y + 4), '9-12 May 1885', fill=RED, font=F(22, True), anchor='lt', stroke_width=4, stroke_fill=WHITE)
for n, sub, dy in [('Duck Lake', '26 March', -30), ('Fish Creek', '24 April', 28), ('Cut Knife Hill', '2 May', 28), ('Frog Lake', '2 April', 28),
                   ('Fort Pitt', '15 April', 28), ("Frenchman's Butte", '28 May', -30), ('Battleford', 'besieged, April', -30),
                   ('Regina', "Riel's trial; hanged 16 Nov 1885", 28), ("Qu'Appelle", "Middleton's start, early April", 28)]:
    g.town(*P[n], n, sub, 24, BLACK, 9, dy)
for n in ('Prince Albert', 'Swift Current', 'Moose Jaw', "Clarke's Crossing", 'Humboldt', 'Saskatoon', "Fort Qu'Appelle", 'Touchwood Hills'):
    g.town(*P[n], n, '', 20, GREY, 6, -22)
g.text(53.05, -107.4, 'North Saskatchewan River', BLUE, 24, True); g.text(51.45, -107.1, 'South Saskatchewan River', BLUE, 24, True)
g.text(51.0, -110.2, 'NORTH-WEST TERRITORIES', GREY, 30, True)
g.frame('THE NORTH-WEST, spring 1885: the road to Batoche', 'Terrain from elevation; rivers and lakes Natural Earth. Places and routes approx., to check.', 1)
metas.append(g.save())

json.dump(metas, open(os.path.join(OUT, 'maps.json'), 'w'), indent=1)
print('done')
