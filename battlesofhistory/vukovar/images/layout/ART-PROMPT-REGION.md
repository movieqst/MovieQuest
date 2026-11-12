# Vukovar: the painted map for the globe's first stop (prompt for ChatGPT, 12 November 2026)

The globe's first stop shows south-eastern Europe with today's borders, then the six republics of 1991. This painting lies
under them (the globe lays it on by its corners and fades into it), so the outlines stay drawn by the page, not painted.
Made by `tools/draw-region-guide.py` from real elevation. The frame (31 × 17 degrees) is wider than the screen shows, so it
covers the view on any screen.

**Attach in this order:** `region-base.png`, then `region-guide.png`. Paste the prompt. Ask for **exactly 2400 × 1800 pixels**.

```text
Repaint the first image (region-base.png) as a realistic, high aerial view of south-eastern Europe in the autumn of 1991, like a gentle satellite photograph, about 2,500 km across. The second image is a guide only: do not copy its labels, borders, dots or grid.
ALIGNMENT: exactly the same framing, 4:3, north at the top. Do not crop, zoom, rotate or shift. It covers 51.5°N 3.5°E (top left) to 34.5°N 34.5°E (bottom right) in a simple latitude-longitude grid, so the land looks a little wider than on a globe: keep it exactly like that. Every coastline, island, lake and river stays EXACTLY where it is in the first image: Italy, Sicily, Sardinia and Corsica, the Adriatic coast and its islands, Greece and the Aegean islands, Crete, the Black Sea and the Danube delta, the Bosphorus, Lake Balaton, the Danube, the Sava and the Drava.
PAINT, AUTUMN 1991, NATURAL COLOURS: the Alps and the Carpathians with rock, forest and a little early snow on the highest peaks; the Dinaric mountains along the Adriatic in grey limestone and dark forest; the wide flat Pannonian plain (Hungary, northern Serbia and eastern Croatia, around Vukovar) in a patchwork of harvested fields, brown and gold; green-brown hills in the Balkans; dry olive-green and ochre lowlands in Italy, Greece and Turkey; the seas in deep Mediterranean blue, a little darker in the Black Sea, with soft light at the coasts. Faint grey patches for the big cities only (Vienna, Budapest, Belgrade, Bucharest, Athens, Istanbul, Rome, Munich), seen from very high, no detail.
DO NOT ADD: borders, roads, railways, text, labels, dots, grid lines, flags, arrows, clouds over the land, or anything that looks like a map symbol. No modern motorways or bridges standing out. A photograph from orbit, not a painted poster.
```

**When it comes back:** I check it by drawing the base's coastlines over the painting. If it is accepted, it goes in as `../region-painting.jpg`, and the globe fades into it at the first stop, under the outlines.
