# Vukovar: the area map and the town map (paintings for ChatGPT)

Made by `tools/draw-layout-guides.py` from real elevation. For each map, give ChatGPT the **base** (the real terrain and water, to paint over) and the **guide** (what is where). Ask for the paintings one at a time, in the same chat. Send the results back to Claude as originals in a zip (PNG if offered).

The front lines, arrows, units and names are **not** painted. The page draws them live on top, so they can change from chapter to chapter.

## Paste this once
```text
I am making an educational, narrated reenactment of the Battle of Vukovar (Croatia, autumn 1991) for students aged 12 and up. I need two painted maps in the same style, made by repainting the base images I attach. The paintings will be laid exactly over real map coordinates, so for each one keep EXACTLY the framing, the size (2400 x 1800, landscape 4:3), and the position and shape of the Danube, the rivers and the hills of the base image. Use the guide image only to know what is where.
Style: a realistic, painted aerial view, as from a high aircraft on a clear late-October day: soft light, autumn colours. Calm and respectful, not dramatic: no smoke columns, no fires, no burning, no destroyed buildings, no vehicles, no soldiers, no people. No text, labels, lines, grid, borders, compass or frame.
The land in 1991: the flat, fertile plain of eastern Slavonia. Large fields of harvested maize (corn) stubble in pale yellow-brown, ploughed brown fields, some green winter wheat, long narrow strip fields, rows of trees along roads, a few dark oak woods. The Danube is wide, grey-green and slow, with sandy banks, willow woods and river islands; the land across the river (Serbia) is low and flat, with floodplain woods.
```

## 1. The area map: paste with `area-base.png` and `area-guide.png`
```text
Map 1, the area map (27 x 21 km). Repaint "area-base.png"; the guide "area-guide.png" shows what is where.
- The Danube on the right, curving around the top right and down to the bottom right, as in the base.
- The Vuka: a small, winding river with marshy meadows and willows along its valley, from the left edge through the middle of the map to the Danube at Vukovar. The Bosut: a small river through Vinkovci at the bottom left.
- Towns as clusters of red-roofed houses and grey blocks, sized as the grey "built-up" shapes in the guide: Vinkovci (bottom left, a town with a railway junction), Vukovar (on the Danube, centre right), and Borovo Naselje (just north of Vukovar, with a large factory complex of long grey halls).
- Villages as small clusters of houses along one or two streets, at the white dots in the guide (Nuštar, Marinci, Bogdanovci, Bršadin, Lipovača, Pačetin, Tordinci, Ćerić, Mirkovci, Petrovci, Negoslavci, Ovčara (a farm), Sotin, Trpinja, Borovo).
- The higher, drier plateau south of the Vuka in lighter yellow-brown fields, cut by shallow green gullies; the lower ground north of the Vuka greener.
- Straight country roads joining the villages (Vinkovci–Nuštar–Marinci–Bogdanovci–Vukovar; the road south from Vukovar to Negoslavci; the road north to Borovo Naselje and Trpinja).
- Do NOT paint the coloured front lines, dots or text of the guide.
```

## 2. The town map: paste with `town-base.png` and `town-guide.png`
```text
Map 2, the town map (12 x 9 km). Repaint "town-base.png" in the same style; the guide "town-guide.png" shows what is where.
- The Danube across the top right, wide, with a long wooded island; the flat floodplain woods of Serbia on the far bank.
- The Vuka: a small winding river with willows that loops north through marshy meadows (Lužac) and then runs south-east through the town into the Danube in the town centre.
- Vukovar in 1991: a small Central European river town. Along the Danube: the old baroque centre with church towers and a palace, red-tiled roofs, tree-lined streets. On the hill south of the Vuka: streets of family houses with gardens and orchards (Mitnica, Sajmište), and the JNA barracks (a walled compound of long low buildings with a parade ground, at the red square in the guide).
- On the Danube road, between the Danube and the town, a large hospital complex (the black square "Hospital" in the guide).
- At the "Water tower" square in the guide: a tall concrete water tower, a slender stem widening into a round tank at the top, the tallest thing in the town (undamaged: this map shows the town as it was).
- North of the Vuka: Borovo Naselje, a planned factory town with a huge shoe and rubber factory (long grey and red-brick halls, chimneys) and blocks of flats and houses in a grid, at the grey shape in the guide.
- Fields, orchards and vineyards on the edges; the road south to Negoslavci leaves at the bottom.
- Do NOT paint the coloured front lines, squares, dots or text of the guide.
```

## Notes
- **What these maps show:** the land as it was before the destruction. The page shows the damage through the story and the photos, not on the map.
- **What's real:** the terrain, the Danube and the rivers come from real elevation. The built-up areas come from the CIA's map of 1991 (*Balkan Battlegrounds*, map 2, public domain). Village positions are approximate.
- **If ChatGPT changes the shape of the Danube or the frame,** ask it to "keep the base image's outlines exactly", or ask Claude for a tighter guide.
