# Batoche 1885: painting the maps

`batoche/tools/draw-layout-guides.py` draws all three maps from **real elevation data**. Each map has two pictures:
- **`*-guide.png`:** shows labels, places, arrows and a latitude/longitude grid.
- **`*-base.png`:** shows terrain and rivers only, and is the picture ChatGPT repaints.

All are 2400 × 1800 pixels (4:3), with north at the top. The exact corners are in `maps.json` and printed on each guide.

| map | covers | top left | bottom right |
|---|---|---|---|
| battle | Batoche, about 4.4 × 3.3 km | 52.7692°N 106.1526°W | 52.7395°N 106.0874°W |
| region | the South Branch, about 100 × 76 km | 52.96°N 107.04°W | 52.28°N 105.56°W |
| campaign | the North-West, about 644 × 484 km | 54.2°N 111.3°W | 49.85°N 101.9°W |

The game places soldiers on these exact pixels, so each painting must line up exactly with its base.

**Still to check:** most battle positions are approximate. They come from the Parks Canada site map and the 1885 sketch, and include the rifle pits, Mission Ridge, the zareba and the charge route. They are waiting for the research (Hildebrandt 1985). The river, hills and coulees are real.

---

## 1. The battle map
Attach **battle-base.png** first and **battle-guide.png** second, then paste:

```text
Repaint the first image (battle-base.png, the plain terrain map) as a realistic aerial view of Batoche, a Métis village on the South Saskatchewan River (in today's Saskatchewan, Canada), in mid-May 1885: early spring on the northern prairie. The second image (battle-guide.png) shows what is where. It is only a guide: do not copy its labels.

ALIGNMENT IS THE MOST IMPORTANT THING. Your picture is a repaint of the first image, not a new map. It will be laid exactly on top of it in a game.
- The same size and shape: 4:3 landscape, exactly the same framing. Do not crop, zoom, rotate or shift. North at the top, seen straight down like an aerial photograph.
- The map covers 52.7692°N 106.1526°W (top left) to 52.7395°N 106.0874°W (bottom right), about 4.4 km wide.
- The river stays EXACTLY where it is in the first image, with every bend in the same place and the same width (about 250 m): a broad, cold, muddy-brown spring river with sandbars, flowing between steep wooded banks.
- The steep valley slopes and the coulees (ravines) stay where the shading shows them.

WHAT TO PAINT (1885, no modern things):
- The river valley: steep banks of poplar (aspen), birch and willow, still mostly bare with the first pale green of spring, cut by brushy ravines running down to the river.
- On top, east of the river: rolling open prairie of last year's dry, tawny grass with new green showing, broken by many "bluffs" (clumps of aspen and willow) and small sloughs (shallow ponds).
- Long, narrow Métis river-lot farms running back from the river: small ploughed fields, rail fences, log houses and barns.
- Batoche village (the blue dot at the upper left, on the east bank): a few dozen log and frame buildings along the Carlton Trail where it comes down to the river, Letendre's two-storey white store, small houses, sheds, and a cable ferry across the river.
- The church and rectory (the black square): a small white wooden church with a bell tower and a two-storey white rectory, with a fenced cemetery just to the south.
- Dirt cart trails (the Carlton Trail, the brown dashed line) across the prairie.
- Middleton's camp, the "zareba" (the red square at the lower right): a rough square of wagons, supply boxes and earth banks, with white bell tents inside.

STYLE: photorealistic aerial view, soft cool spring light, real grass, water, wood and earth textures, natural shadows. No people (the game draws the soldiers).
NO text, labels, letters, numbers, grid lines, arrows, dashed lines, coloured circles or boxes. Paint everything right to the edges.
NO modern things: no highway, paved roads, visitor centre, parking lots, modern houses, power lines or crop circles.
```

## 2. The region map (Duck Lake, Fish Creek, Batoche)
Attach **region-base.png** first and **region-guide.png** second, then paste:

```text
Repaint the first image (region-base.png) as a realistic, high aerial view of the country around the South Saskatchewan River in spring 1885, about 100 km across. The second image is a guide only: do not copy its labels.

ALIGNMENT: exactly the same framing, 4:3, north at the top, straight down. Do not crop, zoom, rotate or shift. It covers 52.96°N 107.04°W (top left) to 52.28°N 105.56°W (bottom right). Both rivers stay EXACTLY where they are in the first image: the South Saskatchewan winding north through the middle, and the North Saskatchewan along the upper left. Both run in deep wooded valleys.

PAINT: the open northern prairie in early spring, with tawny grass and patches of green, scattered aspen bluffs and many small sloughs and ponds; more trees towards the north. Thin dark lines of woodland follow the valleys and coulees. Show a few tiny settlements and cart trails as faint marks only.
STYLE: realistic aerial landscape, soft light, no people.
NO text, labels, grid lines, arrows, dashed lines, coloured dots or boxes. NO modern roads, towns, railways or field patterns.
```

## 3. The campaign map (the North-West, 1885)
Attach **campaign-base.png** first and **campaign-guide.png** second, then paste:

```text
Repaint the first image (campaign-base.png) as a beautiful, realistic satellite-style view of the Canadian prairies in spring, about 640 km across. The second image is a guide only: do not copy its labels.

ALIGNMENT: exactly the same framing, 4:3, north at the top. Do not crop, zoom, rotate or shift. It covers 54.2°N 111.3°W (top left) to 49.85°N 101.9°W (bottom right). Every river and lake stays EXACTLY where it is in the first image (the North and South Saskatchewan and their branches, and the lakes).

PAINT: prairie grassland in the south (pale tan and green), aspen parkland in the middle (grass dotted with groves), and darker boreal forest in the north. The hills stay where the shading shows them. Rivers in deep green valleys, with lakes deep blue.
STYLE: soft, natural colours like a gentle satellite photograph, with light relief shading.
NO text, labels, grid lines, arrows, dots, lines or boxes. NO modern roads, towns, field squares or railways (the game draws the 1885 railway itself).
```

## 4. The continent map (Canada and the northern United States), after the globe
`batoche/tools/draw-continent.py` draws it. It covers 74°N 142°W (top left) to 36°N 50°W (bottom right), about 5,900 × 4,200 km.
Attach **continent-base.png** first and **continent-guide.png** second, then paste:

```text
Repaint the first image (continent-base.png) as a beautiful, realistic satellite-style view of Canada and the northern United States in spring, in the same style as a gentle satellite photograph. The second image is a guide only: do not copy its labels, borders or boxes.

ALIGNMENT: exactly the same framing, 4:3, north at the top. Do not crop, zoom, rotate or shift. It covers 74°N 142°W (top left) to 36°N 50°W (bottom right). Every coastline, island, lake and river stays EXACTLY where it is in the first image: Hudson Bay, the Great Lakes, the Pacific and Atlantic coasts, the Arctic islands, Lake Winnipeg, Great Slave and Great Bear Lakes.

PAINT: deep blue oceans and bays; snow and ice on the Arctic islands and the far north; dark green boreal forest across the north; the Rocky Mountains in the west with snowy peaks; the open prairie (pale tan and green) in the middle south; eastern forests in the south-east. Soft natural colours, light relief shading, a little thin cloud at most.
STYLE: realistic, gentle satellite photograph.
NO text, labels, borders, grid lines, arrows, dots, lines or boxes. NO cities, roads or night lights.
```

---

## After ChatGPT
- Send me each painting. I'll check it lines up with the base by overlaying our traced river, as we did for Stirling (it should be over 90% within about 20 m).
- ChatGPT often shifts things. If the river bends move, ask it to "keep the river exactly as in the first image".

---

## Battle map, first painting (3 November 2026)
- **`images/terrain-battle-draft1.jpg`:** ChatGPT's first painting, scaled to 2400 × 1800.
- **The river lines up very well:** 92% of our traced river is within 20 m of the painted water, and 99% within 60 m.
- **Placed close enough:** the village, the zareba camp and the ravines.
- **Two fixes to ask for:**
  1. There is a **bridge** across the river by the village. No bridge existed in 1885 (Batoche had a cable ferry), so it must go.
  2. The **church, rectory and cemetery** are about 500 m north-west of where they belong. They should sit 1.4 km south-east of the village, with the cemetery just south of the church.

### Fix prompt
Attach the painting with the marks (`batoche-fix-marks.png`) and paste:

```text
Please edit your Batoche painting, using the marks on this copy (remove the marks themselves). Keep EVERYTHING else exactly as it is: same framing, same river, same ravines, same village, same camp. Do not crop, zoom or shift.
1. Remove the bridge across the river at the red X. There was no bridge in 1885. Paint plain river there, and a small cable ferry instead: a flat wooden scow at the water's edge below the village, with a thin cable strung across the river between two posts.
2. Move the white church (with its bell tower), the two-storey white rectory and the fenced cemetery south-east, to the small magenta circle: the church and rectory side by side, and the cemetery just south of them, on the slope above the river. Where they were, paint plain fields and grass like the area around them.
No text or marks in the result.
```

## Region map, first painting (3 November 2026): rejected
ChatGPT drew its own rivers in a "Y" shape that doesn't match the base at all, so I couldn't use it. The rivers on the first base were thin and pale, so they were hard to see. The base now draws them thicker and bolder (about 500 m wide).

### Retry prompt
Attach the **new** region-base.png first and region-guide.png second (from `region-maps-v2.zip`), then paste:

```text
Repaint the first image as a realistic high aerial view of the prairie in spring 1885. The blue lines are the ONLY two rivers, and they must stay EXACTLY where they are, with every bend, as narrow dark rivers in wooded valleys:
- the North Saskatchewan, running from the lower-left corner up to the top edge (left third of the picture);
- the South Saskatchewan, running from the bottom edge (a little left of centre) up through the middle, then turning right along the top edge.
The two rivers do NOT meet inside the picture. Do not add, move or straighten any river, and do not invent other big rivers. Small creeks, sloughs and ponds are fine.
Same framing, 4:3, north at the top, straight down; do not crop, zoom or shift. Tawny spring prairie with green showing, aspen bluffs, many small sloughs, and more woods to the north. A few tiny log farms and cart trails as faint marks only.
NO text, labels, grid lines, arrows, dots or boxes. NO modern roads, towns or field squares.
```

## Battle map, second painting (3 November 2026): replaced by the third
- **`images/terrain-battle.jpg`:** the second painting, scaled to 2400 × 1800. The bridge is gone, and in its place is a cable ferry: a scow on a line across the river below the village.
- **River:** 86% of our traced river is within 20 m of the painted water, and 99% within 60 m.
- **Church:** ChatGPT did not move it. The church, rectory and cemetery are still painted about 540 m north-west of the real church, at about (1086, 778) world px instead of (1264, 1012). If we keep this painting, the game puts the church on the **painted** one, as we did with the Stirling bridge.

## Battle map, third painting (3 November 2026): current
- **`images/terrain-battle.jpg`:** the third painting, scaled to 2400 × 1800. It keeps the cable ferry, with no bridge.
- **Church, rectory and cemetery:** now near their real place. The church is painted at about (1326, 1118) world px against the real (1264, 1012), about 230 m out. The cemetery is just south of it, about 270 m east of the guide spot.
- **River:** 87% of our traced river is within 20 m of the painted water, and 99% within 60 m.
- **Game positions:** the game puts the church on the painted one.
