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

---

## After ChatGPT
- Send me each painting. I'll check it lines up with the base by overlaying our traced river, as we did for Stirling (it should be over 90% within about 20 m).
- ChatGPT often shifts things. If the river bends move, ask it to "keep the river exactly as in the first image".
