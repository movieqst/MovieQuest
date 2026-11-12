# Six-Day War: the fifth map, Abu-Ageila / Um Katef (prompt for ChatGPT, 12 November 2026)

The ground around Abu-Ageila is almost flat desert, and the real elevation cannot show where the Um Katef ridge was, so this
map is a **schematic**: `abuageila-guide.png` places the junction, the three roads, the Wadi El Arish, the Ruafa dam, the Batur
track with Position 181, the Um Katef ridge and the dunes where our research puts them (made by
`tools/draw-abuageila-guide.py`). On the page it carries the note "positions approximate". The page draws the trench lines,
bunkers, minefields, units and arrows itself, so the painting must leave the ridge bare.

**Attach:** `abuageila-guide.png`. Paste the prompt. Ask for **exactly 2400 × 1800 pixels**.

```text
Paint the attached layout guide (abuageila-guide.png) as a realistic, high aerial photograph of the desert around the Abu-Ageila crossroads in north-eastern Sinai in early June 1967, seen straight down, north at the top, 16 km across and 12 km from top to bottom. The guide is a plan: keep every feature exactly where it is drawn, but do not copy its colours, lines, labels or grid.
GEOMETRY IS FIXED: return exactly 2400 x 1800 pixels. Do not crop, zoom, rotate or shift anything.
PAINT, 1967 ONLY:
- The top third (the pale area): soft rolling SAND DUNES, pale cream and gold, with wind ripples and long crests running roughly west to east.
- The rest: flat, firm, pale khaki gravel and sand desert with scattered low dry scrub, a few low rocky rises and shallow dry gullies.
- The WADI EL ARISH (the blue band): a broad DRY river bed, NOT water: a wide, flat, slightly darker band of sand and gravel with braided dry channels, a few green tamarisk bushes and acacia trees along its edges, winding exactly along the blue band.
- The RUAFA DAM (the small dark rectangle on the wadi): a short low stone dam across the dry bed, with a little sand silted up on its south side.
- The three ROADS from the junction (the cream lines with dark edges): narrow single-lane asphalt roads, grey-black, slightly sand-blown, running exactly along the drawn lines to the edges of the map.
- The BATUR TRACK (the thin brown line from the top right, through Position 181, to the dam): a faint dirt track of two wheel ruts.
- The ABU-AGEILA junction (the black dot): a handful of small flat-roofed mud-brick and stone huts, a well with a few palm trees, beside the crossroads.
- The UM KATEF RIDGE (the wide brown band east of the junction): a low, rounded, bare ridge of pale sandstone and gravel, slightly darker than the plain, about 5 km long, crossed by the road to the east. Leave it BARE: no trenches, no bunkers, no wire.
- Position 181 (the brown dot on the track): bare ground on a very low rise; nothing built.
Soft early-morning light from the east, long faint shadows. Natural colours, photographic, not a painting style.
DO NOT ADD: trenches, bunkers, gun pits, tanks, vehicles, soldiers, wrecks, craters or smoke (the game draws those); anything built after 1967 (modern highways, the enlarged Rawafaa reservoir, farms or irrigation circles, army camps, checkpoints, power lines); water in the wadi. No text, labels, borders, grid lines, arrows, dots or flags.
```

**When it comes back:** I check it by drawing the guide's lines over the painting, as for the other maps. If it is accepted, it is scaled up as `../terrain-abuageila.jpg`.
