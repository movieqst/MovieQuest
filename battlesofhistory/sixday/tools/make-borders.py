#!/usr/bin/env python3
"""Six-Day War: border and town overlays for the opening globe dive (writes sixday/borders.js). Made from
vukovar/tools/make-borders.py.
    python3 battlesofhistory/sixday/tools/make-borders.py
Stop 1 (high up): today's borders (Natural Earth admin-0 map units, public domain), then the lines of 4 June 1967, all in
one neutral colour (the page does not colour the states as sides):
  - Israel within the 1949 armistice lines (Natural Earth's Israel without the Golan Heights);
  - Egypt with Sinai, and the Gaza Strip, run by Egypt;
  - Jordan with the West Bank and East Jerusalem;
  - Syria with the Golan Heights.
Today's map shows the Golan Heights, the West Bank and the Gaza Strip as their own outlines, named without a claim.
Stop 2 (lower): today's towns, then the same towns in June 1967 with a short note.
Needs ~/.cache/talas-dem/ne_50m_admin_0_map_units.geojson (github.com/nvkelso/natural-earth-vector, geojson/)."""
import json, os
from shapely.geometry import shape, box, Polygon
from shapely.ops import unary_union
CACHE = os.path.expanduser('~/.cache/talas-dem')
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'borders.js')
VIEW = box(24, 25, 43, 38.5)
units = {f['properties']['NAME']: shape(f['geometry']) for f in json.load(open(os.path.join(CACHE, 'ne_50m_admin_0_map_units.geojson')))['features']}

def rings(geom, tol=.02, min_area=.004):
    geom = geom.intersection(VIEW).simplify(tol, preserve_topology=True)
    polys = [geom] if geom.geom_type == 'Polygon' else list(getattr(geom, 'geoms', []))
    return [[[round(x, 3), round(y, 3)] for x, y in p.exterior.coords[:-1]] for p in polys if p.geom_type == 'Polygon' and p.area >= min_area]

# the Golan Heights: the part of Natural Earth's Israel unit east of the Jordan valley and the Sea of Galilee, north of the Yarmouk
GOLAN_BOX = Polygon([(35.60, 32.68), (35.95, 32.68), (36.05, 33.40), (35.60, 33.40)])
ISR = units['Israel'].difference(GOLAN_BOX.intersection(units['Israel']).buffer(0)).buffer(0)
GOLAN = units['Israel'].intersection(GOLAN_BOX).buffer(0)
WB, GAZA = units['West Bank'], units['Gaza']
MODERN = [('Israel', ISR, (34.85, 31.0)), ('West Bank', WB, (35.32, 32.0)), ('Gaza Strip', GAZA, None), ('Golan Heights', GOLAN, (35.78, 33.0)),
          ('Egypt', units['Egypt'], (30.6, 28.0)), ('Jordan', units['Jordan'], (36.6, 31.0)), ('Syria', units['Syria'], (37.6, 34.6)),
          ('Lebanon', units['Lebanon'], (35.9, 33.9)), ('Saudi Arabia', units['Saudi Arabia'], (38.5, 28.6)), ('Iraq', units['Iraq'], (41.5, 33.2)),
          ('Cyprus', unary_union([units['Cyprus'], units['N. Cyprus']]), (33.2, 35.1)), ('Turkey', units['Turkey'], (36.5, 37.6))]
modern = [dict(name=n, label=list(lab) if lab else None, rings=rings(g)) for n, g, lab in MODERN]

Y = '214,184,110'   # one neutral colour for all four states
ancient = [
    dict(name='ISRAEL', sub='within the 1949 armistice lines', color=Y, label=[34.85, 30.9], rings=rings(ISR)),
    dict(name='EGYPT', sub='with Sinai; the Gaza Strip run by Egypt', color=Y, label=[30.6, 28.3], rings=rings(unary_union([units['Egypt'], GAZA]).buffer(0))),
    dict(name='JORDAN', sub='with the West Bank and East Jerusalem', color=Y, label=[36.6, 31.1], rings=rings(unary_union([units['Jordan'], WB]).buffer(0))),
    dict(name='SYRIA', sub='with the Golan Heights', color=Y, label=[37.6, 34.6], rings=rings(unary_union([units['Syria'], GOLAN]).buffer(0))),
]

towns_today = [dict(lon=lo, lat=la, text=n, size=s, dot=True, **({'side': sd} if sd else {})) for n, lo, la, s, sd in [
    ('Jerusalem', 35.2137, 31.7683, .65, 'r'), ('Cairo', 31.2357, 30.0444, .6, None), ('Damascus', 36.2765, 33.5138, .6, None), ('Amman', 35.9106, 31.9539, .55, 'r'),
    ('Tel Aviv', 34.7818, 32.0853, .55, 'l'), ('Gaza', 34.4667, 31.5017, .5, 'l'), ('Ismailia', 32.2723, 30.6043, .45, 'l'), ('Eilat', 34.9519, 29.5577, .45, 'l'),
    ('Sharm el-Sheikh', 34.3275, 27.915, .45, 'r'), ('Quneitra', 35.8236, 33.1256, .45, 'r')]]
towns_then = [dict(lon=lo, lat=la, text=n, sub=sub, size=s, dot=True, **({'side': sd} if sd else {})) for n, lo, la, s, sub, sd in [
    ('Jerusalem', 35.2137, 31.7683, .62, 'divided: West Jerusalem held by Israel, East Jerusalem by Jordan', 'r'),
    ('Cairo', 31.2357, 30.0444, .55, 'Egypt’s capital', None), ('Damascus', 36.2765, 33.5138, .55, 'Syria’s capital', None),
    ('Amman', 35.9106, 31.9539, .52, 'Jordan’s capital', 'r'), ('Tel Aviv', 34.7818, 32.0853, .52, 'Israel’s largest city', 'l'),
    ('Gaza', 34.4667, 31.5017, .5, 'run by Egypt; many refugees from 1948', 'l'),
    ('Sharm el-Sheikh', 34.3275, 27.915, .45, 'above the Straits of Tiran', 'r'), ('Quneitra', 35.8236, 33.1256, .45, 'Syria’s main town on the Golan', 'r')]]

js = ('/* Overlays for the opening globe dive, made by tools/make-borders.py.\n'
      '   Stop 1: modern = today\'s borders (Natural Earth admin-0 map units, public domain); ancient = the lines of 4 June 1967,\n'
      '   one neutral colour. Stop 2: townsToday = today\'s towns; townsThen = the same towns in June 1967. */\n'
      'window.BATTLE_BORDERS = ' + json.dumps(dict(modern=modern, ancient=ancient, townsToday=towns_today, townsThen=towns_then), separators=(',', ':'), ensure_ascii=False) + ';\n')
open(OUT, 'w').write(js)
print('wrote', OUT, len(js) // 1024, 'KB', 'golan area', round(GOLAN.area, 3))
