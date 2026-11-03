# Sekigahara 1600: painting the maps

Both maps are drawn from **real elevation data** by `sekigahara/tools/draw-layout-guides.py`. Each has a labelled `-guide` version and a plain `-base` version (terrain only). The game places armies on these exact pixels, so a painting must line up exactly.

| Map | Area | Size |
|---|---|---|
| `japan-guide/base` | 39.6°N 129.0°E to 31.0°N 142.6°E, about 1,240 × 960 km | 2400 × 1800 |
| `battle-guide/base` | 35.386°N 136.432°E to 35.334°N 136.516°E, about 7.6 × 5.8 km | 2400 × 1800 |

## 1. Japan 1600 (attach japan-base and japan-guide)
```text
Repaint the first image (japan-base) as a realistic satellite-style view of central and western Japan in autumn: green lowlands and rice plains, forested mountains in deep green and autumn colours, snow only on the highest peaks of the Japanese Alps, deep blue sea. The second image is only a guide to what is where; do not copy its labels or lines.

ALIGNMENT IS THE MOST IMPORTANT THING. Your picture is a repaint of the first image, not a new map. It will be laid exactly on top of it in a game.
- The same 4:3 framing. Do not crop, zoom, rotate or shift. North at the top, seen straight down.
- Every coastline, island, bay, lake (Lake Biwa) and mountain range stays EXACTLY where it is in the first image.

NO text, labels, letters, numbers, grid lines, arrows, dashed lines, dots or boxes. NO modern cities, roads, railways or airports. Paint right to the edges.
```

## 2. The valley of Sekigahara (attach battle-base and battle-guide)
```text
Repaint the first image (battle-base) as a realistic, straight-down aerial view of the valley of Sekigahara, Japan, on a damp autumn morning in October 1600. The second image is only a guide to what is where; do not copy its labels, squares or lines.

ALIGNMENT IS THE MOST IMPORTANT THING. Your picture is a repaint of the first image, not a new picture. It will be laid exactly on top of it in a game.
- The same 4:3 framing. Do not crop, zoom, rotate or shift. North at the top, seen straight down, like an aerial photograph about 7.6 km across.
- Every hill, ridge, valley and stream stays EXACTLY where it is in the first image.

WHAT TO PAINT (1600, no modern things):
- The flat valley floor: small irrigated rice fields after the harvest (stubble, a few pools of water), dry fields, grassy banks, scattered trees.
- The hills all round: thick forest of cedar, pine and oak, with some autumn red and gold.
- One unpaved road (the Nakasendō) running east to west across the valley floor, and smaller tracks branching north-west and south.
- A small village or two of thatched-roof farmhouses along the road near the centre of the valley.
- On top of Mount Matsuo (the hill at the lower left, where the guide says KOBAYAKAWA): a small hill fort of earthworks and wooden palisades.
- Small wooden palisades and simple earth banks at the camp sites marked by the squares in the guide. No soldiers, no flags.
- Thin streams in the same places as the blue lines in the guide.

STYLE: photorealistic aerial view, soft grey autumn light after rain, a little mist low in the valley (thin enough to see the ground through it).
NO text, labels, letters, numbers, grid lines, arrows, squares, dots or coloured lines. Paint right to the edges.
NO modern things: no roads, cars, railways, power lines, buildings or the modern town.
```

## Result: the valley (3 November 2026, second version)
- **`images/terrain-battle.jpg`:** ChatGPT's painting, scaled to 2400 × 1800. The first try is kept as `terrain-battle-draft1.jpg`.
- **The camps:** the hills, valley floor and road follow the guide. The camps are within about 100–450 m of the traditional points.
- **Camp positions in the game:** the game places each army on the camp **as painted**, in world pixels at 2400 × 1800, so the picture and the armies agree. The traditional point (from the guide) is given after each:

| Camp | Painted (world px) | Traditional point |
|---|---|---|
| Ishida (Sasao) | 730, 480 | 758, 484 |
| Shimazu | 910, 570 | 786, 588 |
| Konishi | 600, 610 | 671, 623 |
| Ukita | 660, 755 | 585, 761 |
| Ōtani (Yamanaka) | 485, 870 | 500, 827 |
| Kobayakawa (Matsuo) | 790, 1295 | 638, 1339 |
| Ieyasu, first HQ (Momokubari) | 1830, 930 | 1800, 900 |
| Ieyasu, later HQ (Jinbano) | 1160, 755 | 1014, 693 |

- **The streams** only roughly follow the real ones. The game doesn't use them.
- **Credit:** Battle Games, AI-generated (ChatGPT) from our guide map.

## Result: Japan 1600 (3 November 2026)
- **`images/map-japan.jpg`:** the autumn satellite view. 99% of the land and sea matches the Natural Earth coastline.
- **`images/map-japan-night.jpg`:** a moonlit version of the same view. The red coast overlay lies on its coast all round, so it lines up as well. It can be used for the night march (chapter 1) or as an establishing picture.
- **Credit:** Battle Games, AI-generated (ChatGPT) from our guide map.
