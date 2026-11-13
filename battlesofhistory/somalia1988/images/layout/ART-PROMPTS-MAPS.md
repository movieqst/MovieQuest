# Somalia 1988: the five painted maps (prompts for ChatGPT, 13 November 2026)

Made by `tools/draw-layout-guides.py` from real elevation. The page zooms from the wide maps to the tight ones:
**north** (640 × 480 km) → **core** (310 × 232 km) → **Hargeisa**, **Burao**, **Berbera** (8–12 km). For each map give
ChatGPT the **base** (real terrain and sea, to repaint: it fixes the framing) and the **guide** (what is where), **base
first**. Ask for **exactly 2400 × 1800 px, landscape**, one map at a time in the same chat. Send the results back to
Claude in a zip, as originals. The page draws the places, front lines, people and events on top, so they are **not**
painted. The sites inside the cities are approximate on the guides; nothing there is painted, so they can be corrected
later.

## Paste once
```text
I am making an educational, narrated history page about northern Somalia in 1988 (today's Somaliland): the war between the government of Siad Barre and the Somali National Movement, and the killing of Isaaq civilians, for students aged 12 and up. I need five painted maps in the same style, made by repainting the BASE image I attach (real terrain from elevation data); the second image, the GUIDE, only says what is where.
Rules for every map:
- Keep EXACTLY the framing of the base: 2400 x 1800 px, landscape 4:3, north at the top. Do not crop, zoom, rotate or shift. Coasts, hills, escarpments and valleys stay exactly where they are in the base.
- A realistic painted aerial view, like a gentle satellite photograph, natural colours, the soft light of the dry season.
- The land as it was in 1988, calm and before the destruction: no smoke, fires, damage, vehicles, aircraft, soldiers or people. Respectful and quiet, because many people died here.
- No modern buildings or features after 1988, no text, labels, dots, lines, borders, grid or frame: do not copy anything drawn on the guide.
```

## 1. The north: `north-base.png` + `north-guide.png`
```text
Map 1, the whole north-west of Somalia (about 640 x 480 km), with Djibouti (top left) and Ethiopia (bottom).
- The Gulf of Aden at the top, deep blue, lighter along the shore.
- The Guban: the hot, narrow coastal plain of sand, gravel and dry wadis along the gulf, pale and almost bare.
- The Golis mountains and escarpment rising steeply behind it: grey-brown rock with dark green juniper and acacia on the heights.
- South of the mountains the high plateau, and the Haud: wide, flat, red-brown semi-desert grazing land with scattered acacia bush, dry riverbeds and, in the west around Hargeisa and Gebiley, patches of farmland.
- Seen from very high: towns only as tiny pale smudges, no detail.
```

## 2. The core area: `core-base.png` + `core-guide.png`
```text
Map 2, Hargeisa, Burao, Berbera and the road to Ethiopia (about 310 x 232 km).
- The Gulf of Aden at the top right; the narrow coastal plain with Berbera on it (a small pale town by the sea).
- The Golis escarpment across the map: rugged grey-brown ridges and gorges, dark green on the tops.
- South of it the plateau: Hargeisa (a pale town of low houses, left of centre), Burao (a smaller pale town, right), the farmland of Gebiley and Arabsiyo in the west (small green and brown fields), and the dry red-brown Haud stretching south into Ethiopia with scattered acacia, thorn bush and dry riverbeds (tog).
- Unpaved roads only as faint pale tracks between the towns, if at all.
```

## 3. Hargeisa: `hargeisa-base.png` + `hargeisa-guide.png`
```text
Map 3, the city of Hargeisa in 1988 (12 x 9 km).
- A large town of low, flat-roofed houses in pale stone, whitewash and ochre, with some corrugated-iron roofs, walled compounds with acacia and neem trees, a few larger public buildings and mosques, laid out in a loose grid of unpaved streets around the centre (marked on the guide).
- A dry, sandy seasonal riverbed (tog) crossing the town, with trees along its banks.
- The airport (bottom right on the guide): one long runway on bare ground, a few low buildings.
- Around the town: dry rocky plain and low hills with acacia bush, a few farms; low ridges to the south.
- The town as it was BEFORE the war damage: intact, quiet, no people, no smoke.
```

## 4. Burao: `burao-base.png` + `burao-guide.png`
```text
Map 4, the town of Burao in 1988 (8 x 6 km).
- A town of low, flat-roofed houses in pale stone and ochre with walled compounds and trees, unpaved streets, a market area in the centre (marked on the guide).
- The Togdheer: a wide dry, sandy riverbed crossing the town (it flows only after rains), with trees along its banks.
- Outside the town: flat red-brown plain with acacia and thorn bush; a walled military compound to the north-west (the guide's "Goon Ad", approximate) as plain low buildings inside a wall.
- Intact and quiet, no people, no smoke.
```

## 5. Berbera: `berbera-base.png` + `berbera-guide.png`
```text
Map 5, the port town of Berbera in 1988 (12 x 9 km).
- The Gulf of Aden at the top, with the sheltered harbour and its sand spit as in the base; a modest port with one or two quays and a few ships' berths (no ships).
- The old town by the harbour: white and ochre coral-stone houses, a few mosques, narrow streets.
- The airport to the south-west (marked on the guide): a very long runway on the flat coastal plain, a few hangars and low buildings.
- Around: the hot, flat coastal plain of pale sand and gravel, dry wadis, sparse thorn bush.
- Intact and quiet, no people, no aircraft, no smoke.
```

## Round 2 (13 November 2026): the first paintings did not keep the framing

ChatGPT's first five paintings are beautiful but cannot be used as maps: they are **tilted, bird's-eye views with a
horizon**, not views from straight above, and on the north, core and Berbera maps the **coast is in the wrong place**
(far more sea, the coast pushed south; Berbera's harbour a different shape). The page lays each map flat by its corner
coordinates, so the painting must match the base pixel for pixel. Paste this in the same chat, then re-attach each
map's **base and guide** again with its prompt from round 1.

```text
These are beautiful, but they cannot be used: I need MAPS, not landscape views. Please redo each one with these strict rules:
1. Seen from DIRECTLY ABOVE (a vertical satellite photograph, nadir view): no tilt, no perspective, no horizon, no sky, no mountains seen from the side. North is at the top.
2. Use the BASE image as the exact canvas: repaint ON TOP of it. Every coastline, bay, harbour, hill and valley must stay exactly where it is in the base, in the same size. The sea (blue in the base) stays sea, and the land stays land: do NOT add sea where the base has land, and do not move the coast.
3. Same size and shape as the base: 2400 x 1800 pixels, landscape. Do not crop, zoom, rotate or shift.
4. Keep the lovely colours and detail of your first versions, just seen from above and lined up with the base.
```

**When they come back:** Claude draws the base's coastlines over each painting again; if the coast lines up (as the
Granicus and Issus maps did, 90–98 %), they go on the page.
