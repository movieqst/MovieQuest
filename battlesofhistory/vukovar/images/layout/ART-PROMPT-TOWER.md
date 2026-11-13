# Vukovar: the water tower close-up (prompt for ChatGPT, 13 November 2026)

ChatGPT's town quarters came back as tilted views with an invented town (rivers, church and barracks in the wrong
places). This close-up (3.6 × 2.7 km around the water tower) gives it much less to invent: the base already shows the
Danube and the Vuka with their sandy banks, the 1991 built-up area (brown) and the **water tower drawn from directly
above at its real place** (the small round top with a shadow, on the bluff above the Danube). Made by
`tools/draw-tower-close.py`.

**Attach:** `tower-base.png` (first) and `tower-guide.png`. Ask for **exactly 2400 × 1800 px**.

**Tips if it drifts again:** use ChatGPT's **edit** mode (upload the base, choose "Edit", select the whole image) rather
than asking for a new picture; or ask it first to "describe the positions of the rivers and the round tower top in this
image" and then to "repaint it keeping those positions".

```text
Please EDIT this exact image (the first one, tower-base.png); do not make a new picture. It is a top-down map of the centre of Vukovar, Croatia, before the war of 1991, 3.6 x 2.7 km, north at the top. The second image is only a guide to what is where; do not copy its labels, crosses or grid.
KEEP EVERYTHING WHERE IT IS: the wide Danube (dark blue-green) and its long island exactly as drawn; the small river Vuka entering from the left edge and joining the Danube exactly where it does; the sandy banks; the brown areas (the town in 1991) with the same outlines; the small round light-grey disk with its shadow on the bluff just above the Danube (right of centre): that is the top of the water tower seen from directly above.
PAINT IT as a realistic, gentle aerial photograph seen from DIRECTLY ABOVE (a vertical satellite view: no tilt, no horizon, no perspective, nothing seen from the side), in early autumn light:
- In the brown areas: a small Central European river town of red-tiled roofs, gardens, orchards and tree-lined streets; near the Vuka's mouth and along the Danube the old baroque centre, with a church and a long palace (around the crosses in the guide).
- The water tower: keep it as ONE round concrete top, about the size of the disk, light grey, with its short shadow, in a small grassy park. Do not draw it from the side, and do not move it.
- The barracks (bottom centre on the guide): a walled compound of long low buildings with red roofs around a large parade ground.
- Outside the town: fields, meadows and small woods; willows and poplars along the riverbanks; the far bank of the Danube (top right) in floodplain forest.
- No people, vehicles, smoke, damage, text, labels, lines or grid. Same size as the base: 2400 x 1800 pixels.
```

**When it comes back:** Claude checks the Danube, the Vuka and the tower's round top against the base. If they line up,
the close-up is blended into the town map (`../town-painting.jpg`) around the tower, so the page shows the tower in the
right place and the centre sharper; the rest of the town map stays as it is.
