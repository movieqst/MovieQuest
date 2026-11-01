# Dunkirk art prompts (one per map)

Give ChatGPT the prompt **and** the matching layout guide from this folder. These rules apply to every map:
- **Orientation:** north is up.
- **No added marks:** no text, labels, arrows, units or borders (the game adds its own).
- **Size:** 4:3 landscape. If it can't do 4800 × 3600, make the largest 4:3 it can.

If the result moves anything, reply: *"Keep the coastline, canals and towns exactly where they are on the layout
image; do not reinterpret the layout."* (I can also trace the game's map from the painting, as we did for Kadesh.)

---

## 1. The trap (campaign map)  →  `images/map1.jpg`  ·  attach `dunkirk-1-campaign-guide.png`

> Paint a top-down campaign map of north-east France and western Belgium in May 1940, in the style of a hand-coloured
> 1940 War Office staff map. The palette is muted olive farmland, darker woods, and pale grey-green sea. Towns are
> small clusters of red roofs. Roads are thin cream lines; canals and rivers are clear blue lines.
>
> Follow the attached layout exactly:
> - the coastline from Boulogne to Zeebrugge
> - the blue waterways: the Aa canal, the Lys, the Yser and the Scheldt
> - the yellow roads
> - every black town dot
>
> The red boxes and the dashed pink line are for the game only: paint plain countryside there. No armies, no arrows,
> no text.

## 2. The perimeter and the beaches  →  `images/map2.jpg`  ·  attach `dunkirk-2-perimeter-guide.png`

> Paint a detailed, slightly oblique top-down view of the coast at Dunkirk, France, in early June 1940, in the style of
> a realistic strategy-game battle map. The light is overcast, with soft grey light. Follow the attached layout
> exactly.
>
> - **The sea:** grey-green, with long low surf lines along the shore.
> - **The beach and dunes:** a wide pale sand beach, and behind it a strip of grassy sand dunes (the cream band).
> - **Dunkirk:** a brick town with a wrecked harbour of docks and basins. A long, narrow wooden-topped breakwater (the
>   East Mole) runs out to sea at the red line.
> - **The oil tanks:** west of the port (in their red box) they burn with orange fire, sending up a huge black smoke
>   column that drifts east along the coast.
> - **Malo-les-Bains, Bray-Dunes and La Panne:** small seaside resorts with villas along the beach. At the boxes
>   marked JETTY, lines of army lorries are driven into the shallow water to make piers.
> - **Inland:** flat Flanders farmland with drainage ditches. The light-green area is flooded fields with water
>   standing in them.
> - **The canals:** the blue lines are straight canals with tree-lined banks.
> - **The roads:** the yellow lines are roads, with abandoned army lorries and guns along the ones near the coast.
> - **The towns:** Bergues is a small walled town with star-shaped ramparts; Furnes and Nieuport are small Flemish
>   towns.
>
> No ships, no soldiers, no aircraft, no text (the game draws them). Leave the boxes marked SHIPS OFFSHORE and GUN
> RANGE as plain sea.

## 3. The crossing (sea map)  →  `images/map3.jpg`  ·  attach `dunkirk-3-channel-guide.png`

> Paint a top-down view of the Strait of Dover in 1940, in the style of a painted naval chart: a deep grey-green sea
> with soft wave texture. Follow the attached layout exactly.
>
> - **England (top left):** green fields and the white chalk cliffs at Dover and the South Foreland. Small harbour
>   towns at Dover, Deal and Ramsgate.
> - **France and Belgium (bottom and right):** the flat sandy coast, with Calais and Dunkirk as small grey towns. A
>   thin column of black smoke rises from Dunkirk.
> - **The sandbanks:** the brown ellipses are pale sandbanks just under the surface: the Goodwin Sands, Dyck,
>   Ruytingen and Kwinte Bank.
>
> The dashed coloured lines are shipping routes for the game: do not paint them. No ships, no text, no frame.

---

## 4. Animation pieces for map 2 (the painting stays still; the game animates on top)

ChatGPT cannot redraw the same painting exactly, so whole-map "frames" would make the fields and coast wobble.
Instead the game plays these small sheets over the painting. The waves are done in code over the sea only.

**Flames**  →  `images/fx/flames.png`  (attach `map2.jpg` for style)

> Make an animation sprite sheet of oil-tank fire flames, for a game, matching the painted, slightly top-down style of
> the attached Dunkirk map. Grid: 4 columns x 2 rows = 8 frames, every cell exactly the same size, on a solid pure
> BLACK background. Each frame is the same cluster of tall orange-yellow flames rising from the same base point at the
> bottom-centre of the cell; frame to frame the flames flicker and change shape slightly, so the 8 frames play as a
> smooth loop. Same size, same base position and same viewing angle in every frame. No smoke, no tanks, no ground,
> no text, no borders between cells.

**Smoke**  →  `images/fx/smoke.png`  (attach `map2.jpg` for style)

> Make a sprite sheet of thick black oil smoke puffs, for a game, matching the painted style of the attached Dunkirk
> map. Grid: 4 columns x 2 rows = 8 different puffs, every cell exactly the same size, on a solid pure WHITE
> background. Each cell holds one rounded, billowing puff of dark grey-black smoke, centred, with soft edges that fade
> out to the white; the 8 puffs are all different shapes, from small and dense to large and wispy. Nothing else: no
> fire, no ground, no text, no borders between cells.

The black background lets the flames glow; the white background lets the smoke's darkness become its see-through
edge. Neither needs a green screen.

**Received and prepared (`images/fx/`).**
- `smoke.png`: 16 smoke-only layers, lifted from ChatGPT's whole-map smoke frames, which were matched to `map2.jpg`.
- `flames.png`: 8 flame frames, with the black background made transparent.
- `fx.json`: where each piece sits on map 2, including the four burning tanks.

The waves are done in code, because the wave frames were whole maps framed differently. Rebuild these with
`tools/prepare-fx.py`.

---

## 5. Sprites for soldiers, ships and aircraft  →  `images/units/<name>.png`

The game draws simple symbols now (army blocks, ships and aircraft seen from above). These sheets will replace them.
**Attach `map2.jpg` to every request** so the style matches, ask for one sheet at a time, and send each back as a file.
Paste each prompt exactly as it is: the FORMAT part tells ChatGPT the exact grid the game cuts the sheet into.
Start with the ships and aircraft: they show the most.

### Ships  →  `ships.png`

```
Make a game sprite sheet of six ships from the Dunkirk evacuation, 1940, seen from DIRECTLY ABOVE (straight top-down, like a map), all with their bows pointing to the RIGHT, painted realistically to match the style of the attached map.

FORMAT (must be exact):
- Image exactly 1536 x 1024 pixels: a grid of 3 columns x 2 rows of 512 x 512 cells, no gaps, lines or borders between cells.
- One ship per cell, centred, horizontal, each ship as long as about 90% of the cell width (the small boats can be shorter: about 50%).
- Solid pure green background (#00FF00) in every cell. No water, no wakes, no shadows, nothing green on the ships.
- No text, numbers or labels.

The six ships, left to right, top row then bottom row:
1. A grey Royal Navy destroyer, two funnels, guns fore and aft, the deck packed with khaki soldiers.
2. A grey Royal Navy minesweeper, smaller, one funnel.
3. A paddle steamer: black hull, white upper deck, one red funnel with a black top, round paddle boxes on each side.
4. A cross-Channel passenger ferry: black hull, white superstructure, two red funnels, decks crowded with soldiers.
5. A small white motor yacht with a wooden deck (one of the "little ships").
6. A small open wooden lifeboat with oars, a few soldiers aboard.
```

### Aircraft  →  `aircraft.png`

```
Make a game sprite sheet of three aircraft of 1940, seen from DIRECTLY ABOVE (straight top-down), all with their noses pointing to the RIGHT, painted realistically to match the style of the attached map.

FORMAT (must be exact):
- Image exactly 1536 x 512 pixels: 3 cells of 512 x 512 side by side, no gaps, lines or borders.
- One aircraft per cell, centred, wings spanning about 85% of the cell height.
- Solid pure green background (#00FF00). No shadows, no sky, nothing green on the planes.
- No text, numbers or labels.

The three aircraft, left to right:
1. A German Junkers Ju 87 Stuka dive bomber: bent "gull" wings, fixed landing gear, dark green camouflage, black crosses on the wings.
2. A German Heinkel He 111 bomber: two engines, glass nose, green camouflage, black crosses.
3. A British Supermarine Spitfire: elliptical wings, brown and green camouflage, blue-white-red roundels.
```

### British soldier  →  `british-infantry.png`

```
Make a game sprite sheet of a British infantryman of the BEF, May 1940: khaki serge battledress, flat round "Brodie" steel helmet, webbing straps and small pack, puttees and boots, carrying a Lee-Enfield rifle at the slope on his shoulder.

FORMAT (must be exact):
- Image exactly 640 x 640 pixels: a 4 x 4 grid of 160 x 160 cells, no gaps, lines or borders between cells.
- Rows, top to bottom: the figure faces TOWARD the viewer (south), then faces RIGHT (east), then faces AWAY from the viewer (north), then faces LEFT (west).
- Columns, left to right: 4 frames of a slow walking cycle that loop smoothly.
- One figure per cell, the same size in every cell (about 130 px tall), feet on the same line about 8 px above the bottom of each cell, centred left to right.
- Solid pure green background (#00FF00) in every cell. No ground shadows, and nothing green on the figure.
- Seen from about 45 degrees above, like a strategy game.
- Painted realistic style matching the attached map.
- No text, numbers or labels.
```

### French soldier  →  `french-infantry.png`

```
Make a game sprite sheet of a French infantryman of May 1940: khaki-brown greatcoat with the front corners buttoned back, Adrian steel helmet with its small crest on top, leather ammunition pouches, puttees and boots, carrying a long Lebel or MAS 36 rifle on his shoulder.

FORMAT (must be exact):
- Image exactly 640 x 640 pixels: a 4 x 4 grid of 160 x 160 cells, no gaps, lines or borders between cells.
- Rows, top to bottom: the figure faces TOWARD the viewer (south), then faces RIGHT (east), then faces AWAY from the viewer (north), then faces LEFT (west).
- Columns, left to right: 4 frames of a slow walking cycle that loop smoothly.
- One figure per cell, the same size in every cell (about 130 px tall), feet on the same line about 8 px above the bottom of each cell, centred left to right.
- Solid pure green background (#00FF00) in every cell. No ground shadows, and nothing green on the figure.
- Seen from about 45 degrees above, like a strategy game.
- Painted realistic style matching the attached map.
- No text, numbers or labels.
```

### German soldier  →  `german-infantry.png`

```
Make a game sprite sheet of a German infantryman of May 1940: field-grey tunic and trousers, the rounded "coal-scuttle" M35 steel helmet, black leather belt and Y-straps with ammunition pouches, tall black marching boots, carrying a Kar98k rifle on his shoulder. No insignia or symbols other than plain uniform details.

FORMAT (must be exact):
- Image exactly 640 x 640 pixels: a 4 x 4 grid of 160 x 160 cells, no gaps, lines or borders between cells.
- Rows, top to bottom: the figure faces TOWARD the viewer (south), then faces RIGHT (east), then faces AWAY from the viewer (north), then faces LEFT (west).
- Columns, left to right: 4 frames of a slow walking cycle that loop smoothly.
- One figure per cell, the same size in every cell (about 130 px tall), feet on the same line about 8 px above the bottom of each cell, centred left to right.
- Solid pure green background (#00FF00) in every cell. No ground shadows, and nothing green on the figure.
- Seen from about 45 degrees above, like a strategy game.
- Painted realistic style matching the attached map.
- No text, numbers or labels.
```

### German tank  →  `german-panzer.png`

```
Make a game sprite sheet of a German Panzer III tank of 1940, painted dark grey, with a small black-and-white cross on the turret side, tracks and road wheels clearly visible.

FORMAT (must be exact):
- Image exactly 640 x 640 pixels: a 4 x 4 grid of 160 x 160 cells, no gaps, lines or borders between cells.
- Rows, top to bottom: the tank faces TOWARD the viewer (south), then faces RIGHT (east), then faces AWAY from the viewer (north), then faces LEFT (west).
- Columns, left to right: 4 frames of the tank driving, the tracks moving slightly, looping smoothly.
- One tank per cell, the same size in every cell (about 120 px long), its tracks on the same line about 8 px above the bottom of each cell, centred left to right.
- Solid pure green background (#00FF00) in every cell. No ground shadows, and nothing green on the tank.
- Seen from about 45 degrees above, like a strategy game.
- Painted realistic style matching the attached map.
- No text, numbers or labels.
```

**Check each sheet before sending:** the right size and shape, the right number of cells, the rows facing toward you,
right, away and left (soldiers and tank), noses and bows pointing right (ships and aircraft), and an all-green
background.
