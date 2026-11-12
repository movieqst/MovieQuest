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

## The closer view (12 November 2026): close-base.png + close-guide.png

The first stop now zooms to the user's frame (13–29°E, 40–49°N). This closer painting covers that view with a margin on
every side, at a sharper scale; made by `tools/draw-region-guide.py close`. **Attach:** `close-base.png`, then
`close-guide.png`. Ask for **exactly 2400 × 1800 pixels**.

```text
Repaint the first image (close-base.png) as a realistic, high aerial view of south-eastern Europe in the autumn of 1991, like a gentle satellite photograph, about 1,700 km across. The second image is a guide only: do not copy its labels, borders, dots or grid.
ALIGNMENT: exactly the same framing, 4:3, north at the top. Do not crop, zoom, rotate or shift. It covers 50.0°N 10.0°E (top left) to 38.5°N 31.5°E (bottom right) in a simple latitude-longitude grid, so the land looks a little wider than on a globe: keep it exactly like that. Every coastline, island, lake and river stays EXACTLY where it is in the first image: the Adriatic coast with all its Croatian islands, the Italian coast and the heel of Italy, northern Greece and the Aegean coast, the Black Sea coast, the Danube delta, the Bosphorus and the Sea of Marmara, Lake Balaton, Lake Ohrid and Lake Prespa, the Danube, the Sava, the Drava, the Tisza and the Morava.
PAINT, AUTUMN 1991, NATURAL COLOURS: the eastern Alps (top left) with rock, dark forest and a little early snow on the highest peaks; the Carpathians in a great curve through Romania, dark green forest and russet beech woods; the Dinaric mountains along the Adriatic in grey limestone and dark forest; the wide flat Pannonian plain (Hungary, northern Serbia and eastern Croatia, around Vukovar where the Danube turns south) in a patchwork of harvested fields, brown and gold, with the Danube winding through it; the Wallachian plain north of Bulgaria in the same autumn fields; green-brown hills in the central Balkans; dry olive-green and ochre lowlands in Italy, Greece and Turkey; the seas in deep blue, a little darker in the Black Sea, with soft light at the coasts. Faint grey patches for the big cities only (Vienna, Budapest, Belgrade, Bucharest, Sofia, Istanbul, Zagreb), seen from very high, no detail.
DO NOT ADD: borders, roads, railways, text, labels, dots, grid lines, flags, arrows, clouds over the land, or anything that looks like a map symbol. A photograph from orbit, not a painted poster.
```

**When it comes back:** checked against the base's coastlines; if accepted it goes in as `../close-painting.jpg` and replaces
the wider painting at the first stop.

**Result (12 November 2026):** ChatGPT's closer painting came back slightly zoomed out and shifted (its coastlines did not sit
on the base's). Instead of a redo, it was warped into place: the scale and shift that best match its seas to the base's
(x × 1.094, y × 1.016, plus a small shift; 94 % agreement) were found by search, and the strips it does not reach (about 1.4°
on the left, a sliver on the right, all outside the first stop's view) were filled from the wider painting with a soft blend.
The original is kept as `close-painting-original.png`; the aligned map is `../close-painting.jpg`, laid on the globe over
the wider painting at the first stop.
