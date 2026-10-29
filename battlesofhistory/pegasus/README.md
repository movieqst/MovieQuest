# Pegasus Bridge — Battles of History

Battle three: the glider assault on the Caen Canal and River Orne bridges at Bénouville, night of 5–6 June 1944, and the thirteen hours until the commandos arrived from Sword Beach. Open `index.html` in any modern browser; no install, account, server or WebGL.

Built on the battle-neutral engine from the Ia Drang, extended for this battle:

- **Water and bridges**: water lines can be crossed only at bridge features; targets in the water are pushed to the bank.
- **Cover**: villages, buildings, the pillbox and trenches reduce damage; ponds are obstacles; roads speed vehicles.
- **Vehicles**: a tank type with armour that small arms cannot hurt (the PIAT and the anti-tank gun can), and a gunboat that moves only on water.
- **Gliders**: a `lift: 'glider'` order flies a formation in from off the map, lands it, and leaves a wreck prop on the field.
- **Objectives**: the two bridges. A bridge changes hands when the attacker holds it for twelve seconds with no defender in reach; the defender wins if both are still held when the relief arrives.
- **Attacker and defender by scenario**: `ai.attacker` and `ai.defender` name the sides; the AI schedules, support and debrief text follow.
- **Effects**: `burn` (a long fire) and `dud` (a splash) strike kinds with no damage.

Confidence tags: Established · British account · German account · Estimate · Reconstruction. Every tag opens its sources.

Files: `index.html`, `engine.js`, `scenario.js` (the whole battle), `globe.js`/`world.js`/`borders.js` (opening shot), `images/` (terrain, sprite sheets, props, portraits, maps, photographs; credits in `images/CREDITS.md`), `audio/clear/` (narration), `tools/` (narration scripts), `NARRATION-SCRIPT.md`.
