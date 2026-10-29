# Battle of the Ia Drang — Battle Games

A standalone HTML5 game about the first battle between the US Army and the
North Vietnamese regular army: LZ X-Ray (14–16 November 1965) and LZ Albany
(17 November 1965). Open `index.html` in any modern browser. No install,
account, server or WebGL.

It is the second battle in the series and the first built on the
battle-neutral engine: everything about the battle (sides, unit types,
terrain, formations, events, AI, narration lines) lives in `scenario.js`.

## Files

- `index.html` — page, layout, styles
- `engine.js` — the engine: terrain, movement, combat, helicopters, fire support, day and night, Watch and Command modes, narration, panels
- `scenario.js` — the whole battle: intro slides, two parts (X-Ray, Albany), unit write-ups, citations, voices
- `globe.js`, `world.js`, `borders.js` — the opening shot from space (land from Natural Earth; 1965 and modern borders)
- `images/` — photos, painted terrain, sprite sheets, portraits, layout guides; see `images/README.md` and `images/ART-PROMPTS.md`
- `audio/<voice>/` — pre-recorded narration clips; `tools/make-narration.sh` makes them with Piper
- `NARRATION-SCRIPT.md` — a reading script for a human narrator

## How it plays

1. **Introduction** — the globe turns once from the Ia Drang, dives through today's borders to the states of 1965, and the narrated introduction runs over the X-Ray map with a slideshow of photographs.
2. **Watch the reenactment** — the historical orders drive both parts. Every chapter has a caption, an "explain this moment" note and a confidence tag. The clock shows the real day and time; the light goes from day to dusk, night and dawn.
3. **Take command** — play either side, in either part. Right-click for orders. The Americans can call artillery and air strikes, which land after a delay on everyone inside the circle; the North Vietnamese hit hardest inside a hundred metres, where the fire support cannot be used safely.

## What is new in this engine

- **Terrain features** (`battlefield.features`): clearings, woods, elephant grass, creek beds, slopes, termite mounds, trails, landing zones and obstacles, each with its own effect on speed, cover and concealment. Terrain is drawn from the feature list; a painted `images/terrain-<part>.jpg` replaces the drawing when present.
- **Parts**: a battle can have several maps. The debrief of one part offers the next.
- **Helicopters**: `lift` orders fly a formation in or out; medevac and gunship runs are cosmetic.
- **Fire support**: `fire` orders in Watch mode; a per-part `support` table for the player in Command mode, with delay, radius, damage and cooldown. Arc Light is a line of strikes.
- **Light**: events set `light: day|dusk|night|dawn`; night cuts spotting range and adds flares.
- **Dig in**: a formation that holds for a few seconds takes half damage.
- **Belt rule**: assault infantry gets a bonus inside `ai.beltRange`; American fire support hits friends and enemies alike.
- **AI**: North Vietnamese waves from a schedule, withdrawing and regrouping when spent; American lifts on schedule, a perimeter, and fire support on anything seen at a safe distance.

## Confidence tags

Established · American account · Vietnamese account · Estimate · Reconstruction.
Click any tag for the sources behind it (`scenario.citations`).

## Adding another battle

Copy this folder, replace `scenario.js` (and `borders.js` for the globe), paint new terrain to a new layout guide (press Shift+G in the game to export one for each part), and re-run the narration script. The engine needs no changes unless the battle needs a new mechanic.
