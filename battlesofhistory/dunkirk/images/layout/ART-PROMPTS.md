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

**Smoke frames received (`images/fx/smoke-frames-4x4.jpg`).** ChatGPT returned 16 small whole-map frames with the
smoke rolling. They line up with `map2.jpg` (each frame covers map2 from about x 13–1871, y 13–1398, at 0.148 of
map2's scale), so the game lifts only the smoke from each frame (darkening against the frames' clean sea) and
crossfades the 16 layers over the full-size painting. The map underneath stays sharp and still. The flames will
flicker in code, or from the flame sheet above if one is made.
