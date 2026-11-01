# Talas 751: painting the maps

Three layout guides, drawn by `talas/tools/draw-layout-guides.py` from **real elevation data** (SRTM) with rivers traced
from the terrain. They are the game's mechanics maps: armies, routes and events are placed on these exact pixels.
A painting must line up with its guide **exactly**, or units will stand in rivers and towns will float in fields.

| Guide | Area | Size | Scale |
|---|---|---|---|
| `talas-1-region-guide.png` | Kucha to Merv, 47.9°N 61°E (top left) to 35°N 84°E (bottom right) | 2400 × 1800 | 1919 × 1436 km |
| `talas-2-valley-guide.png` | Kulan to Atlakh, 43.52°N 70.6°E to 42.25°N 72.9°E | 2400 × 1800 | 188 × 141 km |
| `talas-3-battle-guide.png` | Talas city to Atlakh, 42.93°N 71.0°E to 42.6°N 71.6°E | 2400 × 1800 | 49 × 37 km |

`maps.json` has the exact corners of each map.

## Rules for every painting (put these in every prompt)

```
ALIGNMENT IS THE MOST IMPORTANT THING. I am attaching a layout guide map. Your painting is a repaint of THIS map,
not a new map. It will be laid exactly on top of the guide in a game, pixel for pixel.
- Same size and shape: 4:3 landscape, exactly the guide's framing. Do not crop, zoom, rotate, tilt or shift it.
  North stays at the top. Seen from straight above (a flat map view), not from an angle.
- Every river, lake shore, mountain edge, ridge and valley stays in EXACTLY the same place and shape as in the guide.
  Trace them. Rivers keep their bends; mountain fronts keep their outline.
- Towns go exactly on the black squares and dots.
- NO text, labels, letters, numbers, grid lines, arrows, dashed lines, coloured rings or boxes in the painting:
  those are only guides for you. Remove the white grid, the title, the scale bar and the edge labels.
- Paint everything right to the edges of the frame.
STYLE: photorealistic, like a high-resolution satellite and relief view (like a real aerial photograph of the land),
not a painted or cartoon map. Real rock, snow, sand, grass and water textures; soft natural shadows.
CITIES IN 751: Sogdian / Central Asian towns of sun-dried mud brick in earth colours, thick walls, square towers, a
citadel, flat roofs. NO blue domes, NO minarets (those are 600 years later). Small and realistic, as seen from above.
```

## Prompt 1: the region (`talas-1-region-guide.png`)

```
[the alignment rules above]
Make this map of Central Asia in the year 751 photorealistic, like a satellite relief view: real mountains with snow on the high peaks of the
Tian Shan and Pamirs, the pale sand of the Taklamakan and Kyzylkum deserts, green river valleys and oases, blue lakes
(Issyk-Kul, Balkhash, the Aral Sea) and rivers exactly where the guide has them.
Show small realistic walled cities on the squares: Kucha, Suyab, Talas, Chach, Samarkand, Bukhara, Merv, and small towns
on the dots. No roads, no modern borders (the thin grey lines are modern borders: leave them out).
```

## Prompt 2: the valley (`talas-2-valley-guide.png`)

```
[the alignment rules above]
Paint this map of the Talas valley in July 751 as a hand-painted map seen from straight above, in the same style:
- The mountains (the Kyrgyz Range in the north-east, the Talas Ala-Too along the bottom) painted as real rocky
  ranges with deep valleys and a little snow on the highest peaks. Keep every ridge where the guide's shading puts it.
- The plain golden-green summer steppe, drier and paler to the north.
- The Talas and Asa rivers as blue braided rivers with pale gravel beds and thin green belts of trees (willow,
  poplar, tamarisk) along their banks; small streams as thin lines that fade out into the plain.
- Talas city (square, centre) a mud-brick walled town with a citadel, with irrigated green fields and orchards
  around it; Atlakh (square, lower left) a smaller walled town; Kulan (dot, right) a small town.
- No modern towns: the grey dots (Talas, Kyzyl-Adyr) are modern; paint only open land there.
- The dashed brown line (the Silk Road) may be a faint, unpaved track. Leave out all coloured arrows.
```

## Prompt 3: the battlefield (`talas-3-battle-guide.png`)

```
[the alignment rules above]
Paint this close map of the plain between Talas city and Atlakh in July 751, seen from straight above, detailed
enough that small soldiers can stand on it:
- Summer steppe: dry golden grass with green patches, scattered bushes, dusty patches, a few low rises; the low
  ridges (bottom left and bottom right) as brown rocky hills with grassy slopes and gullies, exactly where the guide
  shades them.
- The rivers (blue) as shallow braided summer rivers with pale stone beds, sandbars and fringes of green trees and
  reeds, each exactly where the guide draws it, wider for the thick lines, thin streams for the thin lines.
- Talas city (square, top centre): a walled mud-brick town about 1 km across, with a citadel, flat-roofed houses,
  gardens, and irrigated fields and orchards for 2 to 3 km around it.
- Atlakh (square, lower centre): a smaller walled town with fields around it.
- The brown dashed road as a faint dirt track.
- The orange box is where the armies fight: keep it OPEN ground (grass and fields, no trees, no buildings).
- The purple rings are only claims about the battle site: do NOT paint them.
```

## After painting

Send each painting back. I'll check it against the guide by laying one over the other. If anything has moved, I'll mark
it and you can ask ChatGPT to fix that part ("move the river on the right to match the guide exactly").

## Map 2, one-image version (recommended): `talas-2-valley-base-marked.png`

The clean terrain base with the towns and the road marked on it, so ChatGPT needs only one picture.

```
I'm attaching a map of the Talas valley in Central Asia (188 x 141 km, north at the top), made from real satellite
elevation data. Repaint it as a photorealistic satellite photograph of this valley in July of the year 751, seen from
STRAIGHT ABOVE (no tilt, no perspective, no horizon): real rock, snow, grass, gravel and water textures, soft natural
shadows, at most a few small clouds over the high peaks.

ALIGNMENT IS THE MOST IMPORTANT THING. Your picture will be laid exactly on top of this map in a game, pixel for pixel.
- Same framing and 4:3 shape. Do not crop, zoom, shift or rotate.
- Every mountain, ridge and valley exactly where the map's shading puts it: the high range on the right, the high
  range along the bottom, and the long low ridge that runs from the left edge across the middle of the plain.
- Every river exactly where the map draws it, with the same bends. Thick blue lines: wide, shallow, braided summer
  rivers with pale gravel beds and green belts of trees and reeds. Thin lines: small streams, many nearly dry in July.

The pink circled markers are towns. Put each town EXACTLY on its marker, centred on the cross, about the size of the
circle, then remove the marker:
- 1: TALAS CITY, a mud-brick walled town with a citadel and flat roofs, with green irrigated fields and orchards
  around it, mostly on the plain to the west and south of the walls.
- 2: ATLAKH, a smaller mud-brick walled town on the river bend, with a few fields.
- 3: KULAN, a small walled village.
Earth-coloured sun-dried brick. NO blue domes, NO minarets.
The yellow dashed line is the Silk Road: paint it as a faint dusty track along exactly that line.

Everywhere else: dry golden summer steppe with green patches, paler and drier to the north. Nothing modern.
NO text, numbers, labels, markers, circles or lines in the finished picture.
```

## Map 3, one-image version (recommended): `talas-3-battle-base-marked.png`

```
I'm attaching a close map of the plain between Talas city and Atlakh in Central Asia (49 x 37 km, north at the top),
made from real satellite elevation data. Repaint it as a photorealistic satellite photograph of this plain in July of
the year 751, seen from STRAIGHT ABOVE (no tilt, no perspective, no horizon), detailed enough that small soldiers
will be drawn standing on it. Real grass, earth, rock, gravel and water textures; soft natural shadows; no clouds.

ALIGNMENT IS THE MOST IMPORTANT THING. Your picture will be laid exactly on top of this map in a game, pixel for pixel.
- Same framing and 4:3 shape. Do not crop, zoom, shift or rotate.
- The low rocky ridges (top left, top right, the long one across the lower middle, and the one along the lower
  left) exactly where the map's shading puts them: brown rock and grassy slopes cut by small gullies.
- Every river exactly where the map draws it, with the same bends. The thick blue line on the right is the Talas:
  a wide, shallow, braided summer river with pale gravel bars, channels and a belt of willows, poplars and reeds.
  The others are smaller streams with stony beds and a thin line of trees; in July some carry only a little water.

The pink circled markers are towns. Put each town EXACTLY on its marker, centred on the cross, about the size of the
circle, then remove the marker:
- 1: TALAS CITY, a walled town of sun-dried mud brick about 1 km across: a square citadel on a mound, thick walls
  with towers, flat-roofed houses packed inside, gates on the roads. Green irrigated fields, orchards and small
  canals for 2 to 3 km around it.
- 2: ATLAKH, a smaller walled mud-brick town on the stream, with fields around it.
Earth-coloured brick. NO blue domes, NO minarets.
The yellow dashed line is the road: paint it as a faint dusty track along exactly that line.

The orange dashed box is where the armies fight: keep everything inside it OPEN ground (dry golden grass, a few
fields near the town, no trees, no buildings), with the ridge across its lower edge as it is.
Everywhere else: dry golden summer steppe with green patches. Nothing modern.
NO text, numbers, labels, markers, circles, boxes or lines in the finished picture.
```
