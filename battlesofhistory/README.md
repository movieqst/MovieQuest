# Battles of History

Standalone HTML5 battle games: a narrated historical introduction, a reenactment to watch, and a command mode to play either side. Every statement about history carries a confidence tag that opens the sources behind it.

Open `index.html` for the list of battles. Each battle lives in its own folder with its own `index.html`, engine, scenario file, images and narration:

- `kadesh/` — Battle of Kadesh, c. 1274 BCE (finished)
- `iadrang/` — Battle of the Ia Drang, 14–18 November 1965 (in progress; built on the battle-neutral engine)

## Adding a battle

1. Copy `iadrang/` to a new folder and replace `scenario.js` (and `borders.js` for the opening globe). The engine in that folder is battle-neutral; see its README.
2. Add an entry to `battles.js` with the folder name, title, dates, sides, a one-line blurb, a cover picture and its credit.
