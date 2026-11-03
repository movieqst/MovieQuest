# Stirling Bridge 1297: painting the battle map

There are two pictures, both drawn from **real elevation data** by `stirling/tools/draw-layout-guides.py`:
- `battle-guide.png` has the labels.
- `battle-base.png` has the terrain and river only.

They cover 56.1445°N 3.9640°W (top left) to 56.1175°N 3.8997°W (bottom right), about 4 × 3 km, at 2400 × 1800 pixels. The River Forth is traced from the ground itself.

The game places armies on these exact pixels, so the painting must line up exactly.

## Prompt for ChatGPT
Attach **both** pictures, then paste this:

```text
Repaint the first image (battle-base.png, the plain terrain map) as a realistic aerial view of the land at Stirling, Scotland, on 11 September 1297, early autumn, late morning. The second image (battle-guide.png) shows what is where. It is only a guide: do not copy its labels.

ALIGNMENT IS THE MOST IMPORTANT THING. Your picture is a repaint of the first image, not a new map. It will be laid exactly on top of it in a game.
- Same size and shape: 4:3 landscape, exactly the same framing. Do not crop, zoom, rotate or shift. North at the top. Seen straight down from above, like an aerial photograph.
- The River Forth stays EXACTLY where it is, with every bend in the same place and about the same width (about 60 m: a deep, dark, slow tidal river with muddy banks).
- The hills stay where they are: the castle rock at the lower left and the Abbey Craig at the top right (a steep wooded crag).

WHAT TO PAINT (1297, no modern things at all):
- One narrow WOODEN bridge at the red bar in the guide: a long timber deck on wooden trestles and stone-cased piers, only wide enough for two horsemen side by side.
- A narrow raised earth causeway running from the north end of the bridge north-east across wet meadows to the foot of the Abbey Craig (the brown dashed line in the guide).
- The low ground inside the loops of the river: wet green carse meadows with rough grass, reeds, rushes and pools, a few ditches, and no fields or roads.
- Stirling Castle on top of its rock (lower left): a 13th-century castle of stone walls, towers and timber buildings, much simpler than the castle today. The small walled town of Stirling runs down the ridge to the east of it: thatched timber and stone houses along one street.
- Cambuskenneth Abbey (inside the river loop at the lower right): a medieval stone abbey church with a tall tower, cloister buildings and gardens.
- The Abbey Craig: steep rock and woodland on top. NO monument or tower on it (the Wallace Monument was built in 1869).
- Light woods on the slopes and along the hills, small farms and strip fields on the higher ground south of the river.

STYLE: photorealistic aerial view, soft late-summer light, real grass, mud, water and stone textures, natural shadows.
NO text, labels, letters, numbers, grid lines, arrows, dashed lines, coloured circles or boxes. Paint everything right to the edges.
NO modern things: no roads, cars, railways, the stone Old Bridge, modern houses or the Wallace Monument.
```

ChatGPT often shifts things. If the river bends are not in the same places, ask it to "keep the river exactly as in the first image".

## Result (3 November 2026)
- **`images/terrain-battle.jpg`:** ChatGPT's painting, scaled to 2400 × 1800.
- **The river:** 93% of our traced river lies under its painted river, with no shift. The bridge, causeway, abbey and river loops are where they should be.
- **One known slip:** the castle is drawn about 200 m west-north-west of the real rock. It isn't a battle position, so it is left as it is.
- **Credit:** Battle Games, AI-generated (ChatGPT) from our guide map.

---

# The bridge close-up
There are two pictures, both drawn by `stirling/tools/draw-bridge-closeup.py`:
- `bridge-guide.png` has the labels.
- `bridge-base.png` has the terrain and river only.

They cover about 600 × 450 m around the HES pier site, at 2400 × 1800 pixels (4 px per metre).

**What we know about the bridge:**
- **Size:** it was narrow, two horsemen abreast (Guisborough).
- **Piers:** Stirling's burgh seal of 1296 shows it on eight piers. Four stone-reinforced piers have been found in the river, in a line running at a slant across the channel (HES SM8264; Page 2001).
- **Unknown:** the deck width, the timber details and the exact angle. Those are reconstructed.

## Prompt for ChatGPT
Attach **both** pictures, then paste this:

```text
Repaint the first image (bridge-base.png) as a realistic, close, straight-down aerial view of the wooden bridge over the River Forth at Stirling, Scotland, in September 1297. The second image (bridge-guide.png) shows where everything goes. It is only a guide: do not copy its labels. The view is about 600 metres across.

ALIGNMENT IS THE MOST IMPORTANT THING. Your picture is a repaint of the first image, not a new picture. It will be laid exactly on top of it in a game.
- The same 4:3 framing. Do not crop, zoom, rotate or shift. North at the top, seen straight down (not at an angle).
- The river keeps exactly the same banks and width (about 60 m): a dark, slow, tidal river with muddy banks and reeds.

THE BRIDGE (where the red line and the eight black squares are in the guide):
- One long, NARROW wooden bridge, only about 4 metres wide (two horsemen side by side), crossing the river at a slant, exactly along the red line.
- The deck is rough planks with a simple low timber rail on each side, held up on EIGHT piers in a straight line. Each pier is a cluster of wooden posts driven into the riverbed, with rough stones piled around its base against the current. The piers are spaced evenly across the river.
- It looks sturdy but plain: grey weathered oak, no stone arches, no towers, no gates.

AROUND IT:
- West bank (left): a muddy track climbing up toward Stirling, worn grass, a few thatched huts and a fence.
- East bank (right): the start of a narrow raised earth causeway running north-east across wet green meadows with rushes and pools (the brown line in the guide).
- Soft early-autumn light; real wood, mud, water, reed and grass textures, with natural shadows. No people or horses.

NO text, labels, letters, numbers, grid lines, arrows, coloured lines or boxes. Paint right to the edges.
NO modern things, and NOT the later stone bridge (the grey square in the guide marks where it is built centuries later: leave plain river there).
```
