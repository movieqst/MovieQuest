# Vukovar: a sharper town map in four quarters (prompts for ChatGPT, 13 November 2026, version 3)

**Version 3: why the quarters came back wrong, and what changes.** Quarters 1–3 of version 2 put the Danube and the Vuka
up to 700 m from their real places. The likely cause: the third picture, the *style* image, was cut from the old town map,
whose river is in the wrong place, and ChatGPT copied its river. The tower close-up, sent without that image, came back
right (91.5 % match). So now:
- the style picture is **`style-tower-close.png`**, ChatGPT's own good tower close-up (same look, correct geography);
- use **Edit** mode on each base (upload the base, choose Edit, select the whole picture), one quarter per chat;
- attach only **base, guide, style-tower-close.png**, in that order.

---
*Version 2 notes:*

**Version 2:** the bases now carry the real streets, railway and river outlines (OpenStreetMap), with the side streets
limited to the town of about 1990 (EU GHSL 1990 built-up map), and the town of 1990 lightly shaded. The Franciscan church,
Eltz Palace and the barracks crosses are at their real positions. Same files, same prompts below, plus one rule on streets.

The town map (`../town-painting.jpg`, 12 × 9 km) came back from ChatGPT at about 1450 px wide, stretched to 2400: soft. The
water tower also stands about 60 m from its real place, and is drawn from the side. This time the town map is painted in
**four overlapping quarters** (each 6.4 × 4.8 km), so each one has about 2.4 times the detail; Claude joins them with soft
seams. Made by `tools/draw-town-quarters.py`.

For each quarter there are three images:
- `town-qN-base.png`: the real terrain and water, **the one to repaint** (it fixes the framing);
- `town-qN-guide.png`: what is where; the **red crosses** are landmarks to put exactly on the cross;
- `style-tower-close.png`: the style to copy (the good tower close-up). **Do not use the old `town-qN-style.png`.**

Quarters: **1** top left (Borovo Naselje, Lužac, the Vuka), **2** top right (the Danube bend, the hospital),
**3** bottom left (Sajmište, the fields to the south-west), **4** bottom right (the town centre, the water tower, the
barracks, Mitnica, Vučedol).

**How:** one new chat per quarter, in **Edit** mode on the base. Paste the first prompt, attach the three images **in this order: base,
guide, style-tower-close.png**, paste that quarter's prompt, and ask for **exactly 2400 × 1800 px, landscape**. Send the four results back
to Claude in a zip, as originals (PNG if offered).

## Paste once
```text
I am making an educational, narrated reenactment of the Battle of Vukovar (Croatia, autumn 1991) for students aged 12 and up. I need a painted map of the town, made in four overlapping quarters that will be joined into one map, so the four paintings must match each other in style, colour and light.
For each quarter I attach three images in this order: (1) the BASE, real terrain and water, which you repaint; (2) the GUIDE, which says what is where; (3) the STYLE, a painting of the town centre in exactly the look we want: copy only its style, colours, light and level of detail. It shows a DIFFERENT, smaller area: do NOT copy its river, streets or layout; the river and streets come only from the base.
Rules for every quarter:
- Keep every street, road (light lines) and the railway (dark line) exactly where it is in the base, as 1991 streets lined with trees; do not add or move streets. Where the base has no streets and no shading, there were few buildings in 1991: keep it fields, meadows and orchards.
- Keep EXACTLY the framing of the base: same size (2400 x 1800, landscape 4:3), north at the top. Do not crop, zoom, rotate or shift. The Danube, the river Vuka, the islands and the slopes stay exactly where they are in the base.
- Seen from almost straight above (a high aerial photograph), not from the side: buildings show their roofs, and tall things like towers are seen from above with their foot exactly at their place, not leaning over the map.
- Wherever the guide has a red cross, the landmark named next to it must stand exactly on that cross.
- Late October 1991, soft clear light, autumn colours. The town as it was before the war: no damage, no smoke, no fires, no vehicles, no soldiers, no people.
- No text, labels, lines, grid, crosses, borders, compass or frame: do not copy anything drawn on the guide.
```

## Quarter 1 (top left): attach `town-q1-base.png`, `town-q1-guide.png`, `style-tower-close.png`
```text
Quarter 1 of 4. The north-west of the town map: Borovo Naselje and the Vuka meadows.
- Borovo Naselje, at the grey built-up shape in the guide: a planned 1930s factory town. A very large shoe and rubber factory (Bata / Borovo): long parallel halls of grey concrete and red brick with sawtooth roofs, a tall chimney, rail sidings; around it a grid of tree-lined streets with blocks of flats and small houses with gardens.
- The Danube on the right, wide and grey-green, sandy banks, willows; across it (top right) flat floodplain woods and meadows in Serbia.
- The Vuka at the bottom: a small winding river with willows and marshy meadows (Lužac), as in the base.
- Everywhere else: large harvested fields (pale maize stubble, brown ploughed land, some green winter wheat), long strip fields, rows of poplars along the roads.
- If the hospital cross is at the bottom right edge: a large hospital complex of several 3–5-storey blocks with flat roofs, on the Danube road.
```

## Quarter 2 (top right): attach `town-q2-base.png`, `town-q2-guide.png`, `style-tower-close.png`
```text
Quarter 2 of 4. The north-east of the town map: the Danube.
- The Danube fills much of this quarter, wide and grey-green, as in the base, with its islands; on the far bank (Serbia) low floodplain woods, willows, oxbow ponds and meadows.
- At the red cross "HOSPITAL" (bottom left): Vukovar hospital, a large complex of several 3–5-storey blocks with flat roofs and a courtyard, on the road along the Danube.
- On the near bank at the bottom left, the northern edge of the town: red-roofed houses with gardens; the grey built-up shapes in the guide show where.
```

## Quarter 3 (bottom left): attach `town-q3-base.png`, `town-q3-guide.png`, `style-tower-close.png`
```text
Quarter 3 of 4. The south-west of the town map.
- The Vuka at the top, winding through marshy meadows with willows, as in the base.
- The western edge of Vukovar on the right (the grey built-up shapes in the guide): streets of family houses with red tiled roofs, gardens and orchards.
- Elsewhere: the gently rolling loess plateau south of the Vuka, with large harvested fields, strip fields, a few orchards and vineyards, rows of trees along straight country roads.
```

## Quarter 4 (bottom right): attach `town-q4-base.png`, `town-q4-guide.png`, `style-tower-close.png`
```text
Quarter 4 of 4. The south-east of the town map: the town centre and the water tower. The most important quarter: place the landmarks exactly.
- At the red cross "WATER TOWER": Vukovar's water tower, a tall concrete tower whose slender stem widens into a large round tank at the top, about 50 m tall, seen from above (we see the round top of the tank, with a short shadow); its foot exactly on the cross, in a small grassy park among houses. Undamaged.
- At the red cross "JNA BARRACKS": a walled army barracks compound of long low buildings with red roofs around a large parade ground.
- At the crosses "Franciscan church" and "Eltz Palace" (top left): the baroque old town by the Danube: at "Franciscan church", on the hill south of the Vuka, a large church with a tall bell tower and a monastery round a courtyard; at "Eltz Palace", north of the Vuka, a long baroque palace with a park; between them the arcaded old streets with red tiled roofs.
- Mitnica and Sajmište: streets of family houses with gardens and orchards, as the grey built-up shapes in the guide.
- The Danube across the top, with its islands; the far bank in Serbia, flat floodplain woods.
- East of the town (right): Vučedol, slopes with vineyards and orchards above the Danube; fields to the south.
```

**When they come back:** Claude checks each quarter's Danube and Vuka against the base, puts the tower on its cross, joins
the four with soft seams into a new `../town-painting.jpg` (the old one is kept as `town-painting-2026-11.jpg`), and
checks the markers on the page.
