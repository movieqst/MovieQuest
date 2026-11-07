# Tyre maps, round 2: the two close maps (region and siege)

**Round 1 (7 November):** the campaign and coast paintings line up with the coastline: ACCEPTED. The region and siege paintings moved Tyre to the left, made it larger and the wrong shape, and changed the strait: REDO.

**What is different now:**
- **`*-paintover.png`**: the base with the city ALREADY DRAWN on the island at its exact size and place (pale stone blocks, the sea wall, the two harbour basins). ChatGPT only paints surface detail on top of it.
- **`*-guide2.png`**: the same picture with a **thick red outline** of the island and the mainland shore, a pink box with the island's **exact pixel position**, and (siege) the width of the open water marked.

**Attach in this order:** the paintover first, then the guide2. Paste the prompt. Insist on **exactly 2400 × 1800 pixels**.

## Siege (siege-paintover.png + siege-guide2.png)
```text
Repaint the first image (siege-paintover.png) as a realistic, high aerial photograph of the island city of Tyre in early 332 BCE, BEFORE the siege works, seen straight down. The second image (siege-guide2.png) is the same picture with red outlines and measurements: it is a guide only, do not copy its lines, box or text.
GEOMETRY IS LOCKED — this is the most important rule:
- Return exactly 2400 x 1800 pixels. Do not crop, zoom, rotate, move or resize anything.
- The island city must stay EXACTLY inside the red outline: from x = 540 to x = 1025 and from y = 500 to y = 1479 (pixels, of 2400 x 1800). Same size, same shape, same place. Do not make it bigger, rounder or move it left.
- The open water between the island and the mainland stays EXACTLY as wide as in the picture: about 490 pixels at its narrowest (x 1025 to x 1515), about 800 m. Do NOT add a causeway, bridge, mole or sandbar across it.
- The mainland shore stays EXACTLY on the red line on the right.
PAINT ON TOP: keep the city where it is drawn and make it realistic: dense flat-roofed Phoenician houses of pale stone, narrow lanes, a few small squares, the temple precinct of Melqart where the light rectangle is; a massive pale stone sea wall exactly along the island's edge, highest on the east side facing the mainland; the two small harbour basins on the east side (the round bays drawn at the top right and bottom right of the island) with stone moles and a few oared warships and merchant ships moored; low rocks and surf at the southern tip. The water: clear Mediterranean, turquoise and sandy over the shallow middle of the strait and near the shores, deeper blue offshore. The mainland: a sand beach, then flat fields, palms and olive groves, a few farm buildings.
NO text, labels, grid, arrows, outlines, modern buildings, modern harbour walls, roads, Roman ruins, armies or siege engines.
```

## Region (region-paintover.png + region-guide2.png)
```text
Repaint the first image (region-paintover.png) as a realistic, high aerial view of the coast of southern Phoenicia in summer 332 BCE, about 47 km across. The second image (region-guide2.png) is a guide only: do not copy its red lines, box or text.
GEOMETRY IS LOCKED:
- Return exactly 2400 x 1800 pixels; do not crop, zoom, rotate or move anything. Every coastline, valley and ridge stays exactly where it is.
- The island city of Tyre is the SMALL pale patch offshore at x = 560 to 601, y = 1248 to 1331 (pixels, of 2400 x 1800). Keep it that small and exactly there. It is an ISLAND: keep the strip of open water between it and the coast; do not join it to the land and do not enlarge it.
PAINT ON TOP: on the tiny island, a dense walled city of pale stone (seen from high above, just a pale textured patch with a wall line); the blue sea; on the mainland, a green coastal plain with olive groves, vineyards and fields, small farms and villages, the hills rising inland cut by valleys, the Litani gorge in the north. Summer: golden fields, dark olive trees.
NO text, labels, grid, outlines, roads or modern buildings.
```
