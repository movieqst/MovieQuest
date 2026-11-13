# Vukovar: the water tower close-up (prompt for ChatGPT, 13 November 2026, version 2 with streets)

**Version 2.** The base now has the **real streets, railway and river outlines from OpenStreetMap**, and the town as it
was **about 1990**: side streets are kept only where the EU's 1990 built-up map (GHSL, made from 1990 satellite images)
shows buildings, so streets built later are left out (main roads and the railway are older and stay). The Danube's
outline and the Vuka also come from OpenStreetMap now, and the crosses for the Franciscan church, Eltz Palace, the
barracks and Hotel Dunav are at their real OSM positions (the church and the palace were up to 600 m off before).
OpenStreetMap confirms the water tower's position (it was already right).

ChatGPT's town quarters came back as tilted views with an invented town (rivers, church and barracks in the wrong
places). This close-up (3.6 × 2.7 km around the water tower) gives it much less to invent: the base already shows the
Danube and the Vuka with their sandy banks, the streets, the town of about 1990 (brown) and the **water tower drawn from directly
above at its real place** (the small round top with a shadow, on the bluff above the Danube). Made by
`tools/draw-tower-close.py`.

**Attach:** `tower-base.png` (first) and `tower-guide.png` (both version 2). Ask for **exactly 2400 × 1800 px**.

**Tips if it drifts again:** use ChatGPT's **edit** mode (upload the base, choose "Edit", select the whole image) rather
than asking for a new picture; or ask it first to "describe the positions of the rivers and the round tower top in this
image" and then to "repaint it keeping those positions".

```text
Please EDIT this exact image (the first one, tower-base.png); do not make a new picture. It is a top-down map of the centre of Vukovar, Croatia, before the war of 1991, 3.6 x 2.7 km, north at the top. The second image is only a guide to what is where; do not copy its labels, crosses or grid.
KEEP EVERYTHING WHERE IT IS: every street and road (the light lines) and the railway (the dark line) with exactly the same course; the wide Danube (dark blue-green) and its long island exactly as drawn; the small river Vuka entering from the left edge and joining the Danube exactly where it does; the sandy banks; the brown areas (the town in 1991) with the same outlines; the small round light-grey disk with its shadow on the bluff just above the Danube (right of centre): that is the top of the water tower seen from directly above.
PAINT IT as a realistic, gentle aerial photograph seen from DIRECTLY ABOVE (a vertical satellite view: no tilt, no horizon, no perspective, nothing seen from the side), in early autumn light:
- The streets: paint them as asphalt or cobbled streets of 1991 exactly along the light lines, lined with trees; the main roads a little wider. Do not add new streets or move any.
- In the brown areas: a small Central European river town of red-tiled roofs, gardens, orchards and tree-lined streets, the houses facing the streets; near the Vuka's mouth and along the Danube the old baroque centre: north of the Vuka a long baroque palace with a park (Eltz Palace, at its cross), by the Vuka's mouth a modern hotel block (Hotel Dunav); south of it, on the hill above the Danube, a large baroque church with a bell tower and a monastery around a courtyard (the Franciscan church, at its cross).
- Outside the brown areas there were few or no buildings in 1991: keep them fields, meadows and orchards.
- The water tower: keep it as ONE round concrete top, about the size of the disk, light grey, with its short shadow, in a small grassy park. Do not draw it from the side, and do not move it.
- The barracks (bottom centre on the guide): a walled compound of long low buildings with red roofs around a large parade ground.
- Outside the town: fields, meadows and small woods; willows and poplars along the riverbanks; the far bank of the Danube (top right) in floodplain forest.
- No people, vehicles, smoke, damage, text, labels, lines or grid. Same size as the base: 2400 x 1800 pixels.
```

**When it comes back:** Claude checks the Danube, the Vuka and the tower's round top against the base. If they line up,
the close-up is blended into the town map (`../town-painting.jpg`) around the tower, so the page shows the tower in the
right place and the centre sharper; the rest of the town map stays as it is.

**Sources of the base:** map data © OpenStreetMap contributors (ODbL), extract in `../../tools/osm-vukovar.json`; the town
of 1990 from GHS-BUILT-S R2023A (European Commission, JRC; CC BY 4.0), `../../tools/ghsl-vukovar.json`; elevation from the
AWS terrain tiles. The filter is in `../../tools/vk_osm.py`.
