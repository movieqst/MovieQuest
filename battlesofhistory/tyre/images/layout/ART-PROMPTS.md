# Siege of Tyre, 332 BCE: painting the maps

`tyre/tools/draw-layout-guides.py` draws each map from **real elevation data**. Each map has two pictures:
- **`*-base.png`:** land and water only. This is the picture ChatGPT repaints.
- **`*-guide.png`:** places, a latitude/longitude grid, and (on the two close maps) today's coastline dashed grey for orientation.

All are **2400 × 1800 pixels** (4:3), north at the top. The game places ships and soldiers on exact pixels, so **each painting must line up exactly with its base**: attach the base first, the guide second, then paste the prompt, and ask for exactly 2400 × 1800.

**Rule for every map: 332 BCE only.** No modern towns, roads, harbours, sea walls, the isthmus, the Roman hippodrome or the Crusader cathedral. No text, labels, borders, grids, arrows or dots.

## 1. The campaign: Issus to Egypt (campaign-base.png)
```text
Repaint the first image (campaign-base.png) as a realistic, high aerial view of the eastern Mediterranean in summer, about 1,260 km across, like a gentle satellite photograph. The second image is a guide only: do not copy its labels, route line or grid.
GEOMETRY IS FIXED: return exactly 2400 x 1800 pixels, north at the top; do not crop, zoom, rotate or shift. Every coastline, island (Cyprus, Rhodes), river (the Nile and its delta, the Euphrates) and lake stays EXACTLY where it is in the first image.
PAINT: deep blue sea; the green Nile valley and delta; the yellow-tan deserts of Sinai, Syria and Arabia; the dark forested mountains of southern Anatolia and Lebanon; the dry hills of the Levant; summer colours, soft relief shading.
NO text, labels, borders, grid lines, arrows, dots, cities' lights or roads.
```

## 2. The Phoenician coast: Arwad to Acre (coast-base.png)
```text
Repaint the first image (coast-base.png) as a realistic, high aerial view of the Phoenician coast (Lebanon) in summer 332 BCE, about 370 km across. The second image is a guide only: do not copy its labels or grid.
GEOMETRY IS FIXED: exactly 2400 x 1800 pixels, north at the top; every coastline, mountain ridge, valley, river and the Sea of Galilee stays EXACTLY where it is in the first image.
PAINT: the deep blue sea; a narrow green coastal plain with olive groves and fields; the high Lebanon range with dark cedar and pine forests on its upper slopes and bare limestone peaks; the dry Beqaa valley between the ranges; the bare Antilebanon and snowless Mount Hermon; the Syrian steppe to the east. Small walled coastal towns may be hinted as tiny pale clusters only, no modern cities.
NO text, labels, borders, grid lines, arrows, dots or roads.
```

## 3. Tyre and its mainland (region-base.png)
```text
Repaint the first image (region-base.png) as a realistic, high aerial view of the coast of southern Phoenicia in summer 332 BCE, about 47 km across. The second image is a guide only: do not copy its labels, grid or the dashed grey line (that line is today's coast; ignore it).
GEOMETRY IS FIXED: exactly 2400 x 1800 pixels, north at the top. Every coastline, valley and ridge stays EXACTLY where it is in the first image. IMPORTANT: the small island offshore (left of centre, lower half) is the island city of Tyre in 332 BCE. Keep it an ISLAND, separated from the mainland by open water; do NOT join it to the coast.
PAINT: the blue Mediterranean; on the island, a dense walled city of pale stone houses filling the island; on the mainland, a green coastal plain with olive groves, vineyards and fields, small farms, and the low hills rising inland, cut by valleys (the Litani gorge in the north-east); a small village of Old Tyre on the shore south of the island. Summer: golden fields, dark olive trees.
NO text, labels, borders, grid lines, arrows, dots, roads or modern buildings.
```

## 4. The siege (siege-base.png)
```text
Repaint the first image (siege-base.png) as a realistic, high aerial photograph of the island city of Tyre in early 332 BCE, BEFORE the siege works, seen straight down, about 4 km across. The second image is a guide only: do not copy its labels, grid, rings, the red dashed line or the dashed grey line (today's coast).
GEOMETRY IS FIXED: return exactly 2400 x 1800 pixels, north at the top; do not crop, zoom, rotate or shift. The island's outline, the strait and the mainland shore stay EXACTLY where they are in the first image. The island stays an ISLAND: open water about 750 m wide between it and the mainland. Do NOT paint a causeway, mole, bridge or isthmus: the mole will be added later as a separate layer.
PAINT THE ISLAND (the city of Tyre): a crowded Phoenician city filling the whole island inside a massive pale stone sea wall that follows the shoreline, highest on the east side facing the mainland; tall flat-roofed houses of several storeys, narrow lanes, a few open squares, a large temple precinct (Melqart) near the middle; two enclosed harbours inside the wall: the small north-east bay (the harbour facing Sidon) and the south-east bay (the harbour facing Egypt), each with stone moles at the entrance and a few beached and moored oared warships and merchant ships. The paler grey area at the island's southern tip is a low rocky shelf with a few buildings and rocks at the water's edge.
PAINT THE WATER: clear Mediterranean, turquoise and sandy over the shallow bank in the middle of the strait and near the shores, deeper blue offshore; small waves.
PAINT THE MAINLAND (right side): a flat coastal plain, sand beach at the water's edge, then fields, palms and olive groves, scattered mud-brick and stone farm buildings; no large town.
NO text, labels, grid lines, arrows, dots, modern buildings, modern harbour walls, roads, cars, the Roman hippodrome or any Roman, Crusader or modern ruin. No armies or siege engines in this painting.
```

## After ChatGPT
I check each painting by laying the base's coastline over it, as for the Six-Day War. The siege map's mole, towers, ships and fires are separate sprites and layers added in the game.
