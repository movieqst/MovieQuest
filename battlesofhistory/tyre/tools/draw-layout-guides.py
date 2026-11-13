#!/usr/bin/env python3
"""Siege of Tyre, 332 BCE: map bases and layout guides from REAL elevation (AWS terrain tiles), with the same
tools as the Six-Day War and Batoche maps.
    python3 battlesofhistory/tyre/tools/draw-layout-guides.py [campaign coast region siege]
Outputs tyre/images/layout/<map>-base.png (terrain and water only, for ChatGPT to repaint) and <map>-guide.png
(places, grid, today's coastline dashed), and maps.json.

The two close maps (region, siege) show the coast of 332 BCE, not today's: the sandy isthmus that grew against
Alexander's mole is turned back into sea, the island is the old rocky island (today's old town west of about
35.1975 E) plus the low rocky shelf to the south that Brocard et al. 2024 reconstruct (~450 m beyond today's
headland; Hammond's "Island of Hercules"), and the mainland shore is drawn about 750 m east of the island
(Brocard 2024; Diodorus 17.40.4: four stades). All of this is a RECONSTRUCTION: see TYRE-MAP-UNCERTAINTIES.md.
The harbours are schematic indentations: the one facing Sidon on the north-east, the one facing Egypt on the
south-east (Arrian 2.20.10, 2.24.1)."""
import os, sys, json, math
import numpy as np
from PIL import Image, ImageDraw
from scipy.ndimage import label, gaussian_filter, distance_transform_edt
HERE = os.path.dirname(os.path.abspath(__file__))
SIX = os.path.join(HERE, '..', '..', 'sixday', 'tools', 'draw-layout-guides.py')
src = open(SIX).read().split('want = sys.argv')[0]
NS = {'__file__': SIX, '__name__': 'tyre'}; exec(compile(src, 'sixday-dlg', 'exec'), NS)
G, Guide, clean, CACHE = NS['G'], NS['Guide'], NS['clean'], NS['CACHE']
RED, BLUE, BLACK, GREY, WATER, WHITE, F = (NS[k] for k in ('RED', 'BLUE', 'BLACK', 'GREY', 'WATER', 'WHITE', 'F'))
W, H = G['W'], G['H']
OUT = os.path.join(HERE, '..', 'images', 'layout'); os.makedirs(OUT, exist_ok=True)
G['OUT'] = OUT; NS['OUT'] = OUT
SEA = np.array([70, 112, 150.]); SHALLOW = np.array([118, 168, 178.]); BANK = np.array([150, 190, 182.])

def fit(la_top, la_bot, lo_left):
    """4:3 frame from the top and bottom latitude and the left longitude."""
    km_h = (la_top - la_bot) * 111.32; km_w = km_h * 4 / 3
    return la_top, lo_left, la_bot, lo_left + km_w / (111.32 * math.cos(math.radians((la_top + la_bot) / 2)))

MAPS = {  # name: (frame TL lat, TL lon, BR lat, BR lon), zoom, kind, title
  'campaign': (fit(37.9, 29.4, 26.9), 7, 'wide', 'THE CAMPAIGN, 333-332 BCE: Issus to Egypt'),
  'coast': (fit(35.25, 32.75, 34.2), 9, 'wide', 'THE PHOENICIAN COAST, 332 BCE: Arwad to Acre'),
  'region': (fit(33.50, 33.18, 35.07), 13, 'close', 'TYRE AND ITS MAINLAND, 332 BCE (coast reconstructed)'),
  'siege': (fit(33.2855, 33.2585, 35.1795), 14, 'close', 'THE SIEGE OF TYRE, 332 BCE (island and strait reconstructed)'),
}

# ---------- the reconstructed coast of 332 BCE (lat, lon) ----------
ISLAND = [(33.2777, 35.1905), (33.2780, 35.1932), (33.2775, 35.1956), (33.2762, 35.1961), (33.2754, 35.1968),
          (33.2757, 35.1977), (33.2748, 35.1979), (33.2728, 35.1979), (33.2708, 35.1977), (33.2692, 35.1975),
          (33.2686, 35.1965), (33.2679, 35.1962), (33.2673, 35.1972), (33.2664, 35.1968), (33.2652, 35.1953),
          (33.2641, 35.1943), (33.2633, 35.1928), (33.2638, 35.1911), (33.2657, 35.1899), (33.2690, 35.1894),
          (33.2722, 35.1892), (33.2748, 35.1894), (33.2767, 35.1897)]
SHELF = [(33.2667, 35.1899), (33.2652, 35.1953), (33.2641, 35.1943), (33.2633, 35.1928), (33.2638, 35.1911), (33.2657, 35.1899)]
MAINLAND = [(33.320, 35.2135), (33.300, 35.2110), (33.285, 35.2105), (33.279, 35.2088), (33.2715, 35.2066),
            (33.265, 35.2082), (33.258, 35.2112), (33.245, 35.2140), (33.230, 35.2165)]   # the shore before the isthmus
MOLE = [(33.2716, 35.2066), (33.2716, 35.1979)]   # the line of the mole, mainland to island (along the sandbank)
NORTH_HARBOUR = (33.2760, 35.1972); SOUTH_HARBOUR = (33.2678, 35.1970)

def coast_lon(lat):
    la = [p[0] for p in MAINLAND][::-1]; lo = [p[1] for p in MAINLAND][::-1]
    return np.interp(lat, la, lo)

def inside(poly, LAT, LON):
    m = np.zeros(LAT.shape, bool); n = len(poly)
    for i in range(n):
        (y1, x1), (y2, x2) = poly[i], poly[(i + 1) % n]
        c = ((y1 > LAT) != (y2 > LAT)) & (LON < (x2 - x1) * (LAT - y1) / (y2 - y1 + 1e-12) + x1)
        m ^= c
    return m

def ancient(g, LAT, LON, land_now):
    """Land and water of 332 BCE in the Tyre area; returns (land mask, sea depth 0..1 for shading, modern land)."""
    box = (LAT > 33.23) & (LAT < 33.31)
    west = LON < coast_lon(LAT)
    island = gaussian_filter(inside(ISLAND, LAT, LON).astype(float), 3) > .5   # rounded outline
    land = land_now.copy()
    land[box & west] = False
    land[box & ~west] = True        # the mainland shore of 332 BCE as one smooth line (the elevation tiles are coarse here)
    land |= island
    # depth: shallow near both shores and along the sandbank under the mole, deeper offshore
    sea = ~land
    dist = distance_transform_edt(sea) * (g.km_w * 1000 / W)   # metres from the nearest shore
    depth = np.clip(dist / 900, 0, 1)
    bank = np.exp(-((LAT - MOLE[0][0]) * 111320 / 260) ** 2) * ((LON > 35.1975) & (LON < 35.2070))
    depth = np.clip(depth - .55 * bank, 0, 1)
    return land, depth, island

def places(name):
    P = []   # (lat, lon, label, sub, approx, colour)
    if name == 'campaign':
        P = [(36.837, 36.205, 'Issus', 'battle, November 333 BCE', 0, BLACK), (34.856, 35.858, 'Arwad (Aradus)', 'submits; its fleet joins', 0, BLACK),
             (34.119, 35.646, 'Byblos', 'submits', 0, BLACK), (33.563, 35.371, 'Sidon', 'submits; the fleet gathers here', 0, BLACK),
             (33.271, 35.195, 'TYRE', 'besieged, about seven months, 332 BCE', 0, RED), (31.522, 34.445, 'Gaza', 'besieged next, autumn 332 BCE', 0, BLACK),
             (31.050, 32.545, 'Pelusium', 'gateway to Egypt', 1, BLACK), (29.850, 31.253, 'Memphis', 'Egypt, end of 332 BCE', 0, BLACK),
             (33.513, 36.276, 'Damascus', 'taken after Issus', 0, BLACK), (35.185, 33.902, 'Salamis', 'King Pnytagoras', 0, BLUE),
             (34.705, 33.143, 'Amathus', 'King Androcles', 0, BLUE), (34.664, 32.887, 'Curium', 'King Pasicrates', 0, BLUE),
             (36.441, 28.224, 'Rhodes', '10 ships', 0, BLUE), (36.745, 35.495, 'Mallus', '3 ships', 1, BLUE), (36.740, 34.540, 'Soli (Cilicia)', '3 ships', 1, BLUE),
             (36.55, 29.90, 'LYCIA', '10 ships', 1, BLUE), (36.85, 22.0, '', '', 1, BLUE)]
    if name == 'coast':
        P = [(34.856, 35.858, 'Arwad', '', 0, BLACK), (34.119, 35.646, 'Byblos', '', 0, BLACK), (33.888, 35.495, 'Beirut', '', 1, GREY),
             (33.563, 35.371, 'Sidon', '', 0, BLACK), (33.449, 35.296, 'Sarepta', '', 1, GREY), (33.271, 35.195, 'TYRE', 'island city', 0, RED),
             (32.927, 35.082, 'Acre', '', 0, BLACK), (33.513, 36.276, 'Damascus', '', 0, BLACK), (33.416, 35.857, 'Mount Hermon', '', 0, GREY),
             (34.05, 35.95, 'LEBANON range', 'cedar for the siege works', 1, GREY), (33.75, 36.25, 'ANTILEBANON', "Alexander's raid, about ten days", 1, RED)]
    if name == 'region':
        P = [(33.271, 35.194, 'TYRE', 'the island city', 0, RED), (33.449, 35.296, 'Sarepta', '', 1, GREY),
             (33.2363, 35.2215, 'Old Tyre (Palaetyrus / Ushu)', 'approx.: near Tell Rachidieh and the Ras el-Ain springs', 1, RED),
             (33.338, 35.250, 'mouth of the Litani', '', 1, GREY)]
    if name == 'siege':
        P = [(33.2712, 35.1932, 'TYRE', 'the island city (outline approx.)', 1, RED),
             (NORTH_HARBOUR[0] + .0012, NORTH_HARBOUR[1] + .0012, 'harbour facing Sidon', 'north; schematic', 1, BLUE),
             (SOUTH_HARBOUR[0] - .0010, SOUTH_HARBOUR[1] + .0018, 'harbour facing Egypt', 'south; schematic', 1, BLUE),
             (33.2640, 35.1928, 'low rocky shelf', 'now under the sea (Brocard 2024)', 1, GREY),
             (33.2738, 35.2025, 'the strait', 'about 750 m; shallow bank in the middle', 1, GREY),
             (33.2690, 35.2125, "Alexander's camp", 'approx.; his tent on the Egyptian side of the mole', 1, BLACK),
             (33.2735, 35.2160, 'mainland', '', 1, GREY)]
    return P

def run(name):
    (la1, lo0, la0, lo1), zoom, kind, title = MAPS[name]
    if kind == 'wide': G['RAMP'][:] = [(0, (196, 180, 140)), (200, (205, 188, 146)), (500, (196, 176, 134)), (900, (178, 158, 120)), (1500, (160, 142, 112)), (2500, (150, 140, 128))]
    else: G['RAMP'][:] = [(0, (204, 190, 152)), (15, (196, 182, 144)), (60, (184, 172, 134)), (150, (170, 160, 124)), (300, (158, 150, 118)), (600, (148, 140, 112))]
    g = Guide(name + '-guide.png', la0, la1, lo0, lo1, zoom, None, None)
    H_, W_ = g.e.shape; yy, xx = np.mgrid[0:H_, 0:W_]
    LAT = la1 - (yy + .5) / H_ * (la1 - la0); LON = lo0 + (xx + .5) / W_ * (lo1 - lo0)
    rgb = g.rgb.copy(); modern = None
    if kind == 'wide':
        low = g.e <= .5
        low &= ~((LON > 35.25) & (LON < 35.85) & (LAT > 30.85) & (LAT < 33.0))   # the Jordan rift lies below sea level but is not sea
        low &= ~((LON < 31.0) & (LAT < 30.75))                                    # nor the Qattara depression
        lab, n = label(low); edge = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
        sea = np.isin(lab, list(edge)); rgb[sea] = SEA
    else:
        land_now = gaussian_filter(g.e, 2.5) > .5   # smoothed, so the coarse tiles do not leave stair steps
        lab, n = label(~land_now); sizes = np.bincount(lab.ravel())
        big = [i for i in range(1, n + 1) if sizes[i] > land_now.size * .02]
        land_now = ~np.isin(lab, big)                 # inland pools and ponds stay land
        modern = land_now
        land, depth, island = ancient(g, LAT, LON, land_now)
        lab, n = label(~land); sizes = np.bincount(lab.ravel())
        land |= ~np.isin(lab, [i for i in range(1, n + 1) if sizes[i] > land.size * .02])
        sea = ~land
        col = SHALLOW[None, None, :] * (1 - depth[..., None]) + SEA[None, None, :] * depth[..., None]
        rgb[sea] = col[sea]
        shelf = inside(SHELF, LAT, LON) & ~land_now
        # the island in one colour (low rock with a little relief), so today's built-up outline does not show through
        rel = gaussian_filter(np.random.default_rng(332).standard_normal(island.shape), 3) * 9
        isl = np.array([192, 178, 142.])[None, None, :] + rel[..., None]
        rgb[island] = isl[island]
        main = np.array([198, 184, 146.])[None, None, :] + rel[..., None]
        if name == 'siege':      # at this scale the coastal plain is flat and the tiles are coarse: one even colour, gentle texture
            m = land & ~island; rgb[m] = main[m]
        else:                    # blend the strip that was sea in today's tiles, so no stair steps show
            filled = land & ~island & ~land_now
            b = gaussian_filter(filled.astype(float), 6)[..., None] * (land & ~island)[..., None]
            rgb = rgb * (1 - b) + main * b
        rgb[shelf] = (np.array([166, 158, 136.])[None, None, :] + rel[..., None])[shelf]
    g.im = Image.fromarray(rgb.clip(0, 255).astype('uint8')); g.d = ImageDraw.Draw(g.im)
    if kind == 'wide':
        g.lakes(clean(os.path.join(CACHE, 'ne_10m_lakes.geojson'))); g.geojson_lines(clean(os.path.join(CACHE, 'ne_rivers.geojson')), WATER, 4)
    g.im.save(os.path.join(OUT, name + '-base.png'), optimize=True)
    # ---------- guide ----------
    if modern is not None:   # today's coastline, dashed, for orientation only
        edge = modern ^ np.roll(modern, 1, 0) | modern ^ np.roll(modern, 1, 1)
        a = np.asarray(g.im).copy(); m = edge & (((xx // 6) + (yy // 6)) % 2 == 0); a[m] = (90, 90, 90)
        g.im = Image.fromarray(a); g.d = ImageDraw.Draw(g.im)
    if name in ('siege', 'region'):
        g.line(MOLE, (200, 60, 40), 6 if name == 'siege' else 3, dash=18)
        if name == 'siege':
            x, y = g.xy(*MOLE[0]); g.d.text((x - 20, y - 26), "line of Alexander's mole (to be built; about 60 m wide in Diodorus)", fill=(170, 40, 30), font=F(22, True), anchor='rb', stroke_width=4, stroke_fill=WHITE)
            for lat, lon in (NORTH_HARBOUR, SOUTH_HARBOUR): g.ring(lat, lon, .09, '', col=BLUE)
    for lat, lon, s, sub, approx, col in places(name):
        if not s: continue
        if s.isupper() and not sub and name in ('coast',): g.text(lat, lon, s, col, 30, True); continue
        g.town(lat, lon, s + (' (approx.)' if approx and 'approx' not in sub and name != 'siege' else ''), sub, 26 if kind == 'wide' else 24, col, 9, -20)
    if name == 'campaign':
        route = [(36.837, 36.205), (35.70, 35.85), (34.856, 35.95), (34.119, 35.70), (33.563, 35.42), (33.271, 35.25), (31.522, 34.50), (31.050, 32.60), (29.850, 31.30)]
        g.arrow(route, RED, "Alexander's march", w=6, at=.8)
    step = {'campaign': 1, 'coast': .5, 'region': .05, 'siege': .01}[name]
    note = {'campaign': "Today's coast; ancient names.", 'coast': "Today's coast; ancient names.",
            'region': "The coast of 332 BCE is reconstructed (no isthmus); today's coastline dashed grey.",
            'siege': "RECONSTRUCTION: island after Brocard et al. 2024 and Hammond; strait ~750 m; harbours schematic. Today's coastline dashed grey."}[name]
    g.frame(title + ': layout guide', note, step)
    return g.save()

if __name__ == '__main__':
    want = sys.argv[1:] or list(MAPS)
    mj = os.path.join(OUT, 'maps.json'); metas = {m['file']: m for m in (json.load(open(mj)) if os.path.exists(mj) else [])}
    for name in want:
        meta = run(name); metas[meta['file']] = meta; print(name, 'done', meta['km_w'], 'x', meta['km_h'], 'km')
    json.dump(list(metas.values()), open(mj, 'w'), indent=1)
