# Battle of Kadesh — historical reenactment & command

A standalone browser game: watch a researched reenactment of the Battle of
Kadesh (c. 1274 BCE), or take command of the Egyptian army and try to change
history. Plain HTML5 Canvas, no install, no server, no WebGL.

**Run it:** open `index.html` in Brave, Chrome or Firefox. Everything works from
a local file.

## Files

| File | What it is |
|------|------------|
| `index.html` | Page layout, styling, side panel |
| `scenario.js` | The **Historical Scenario File**: narration, formations, battle events, AI settings, outcome and sources. Both modes read this one file. |
| `engine.js` | Rendering, simulation, camera, input, narration playback |

## How it plays

1. **Historical introduction** — eight narrated screens over the live map:
   who fought, why, the two armies, the deception and the trap. Next, Back,
   Pause and Skip controls; auto-advances if you do nothing.
2. **Watch the reenactment** — the historical orders drive the armies. Captions
   narrate each event; the camera follows. Timeline markers jump to any moment
   (the simulation is deterministic, so jumps are exact). *Explain this moment*
   pauses and explains the commander's choice.
3. **Take command** — you control every Egyptian formation. The Hittite army
   is hidden until your troops sight it; it follows its historical plan (the
   chariot strike at 0:20, the second wave at 1:10) and then hunts whatever is
   nearest. A formation below 25% strength routs. The debrief compares your
   result with the historical outcome.

Controls: drag / WASD / arrows / minimap to move the camera, mouse wheel to
zoom, Space to pause, F to follow the action, E to explain the moment.
Titles use the Cinzel font from Google Fonts when online and Georgia offline.

## Confidence tags

Every historical statement carries a tag so the game never passes invention
off as fact:

- **Established** — generally accepted by historians
- **Egyptian account** — known only from Ramesses II's inscriptions (royal propaganda)
- **Hittite account** — known only from later Hittite texts
- **Estimate** — a modern scholarly estimate, not a recorded figure
- **Reconstruction** — our own choice to make the battle playable

Troop positions, timings and the map scale are reconstructions. The ancient
accounts tell a story; they are not a battlefield record.

## Voice narration

Narration is **pre-recorded** in `audio/<narrator>/` (47 MP3 clips per voice: every intro screen,
battle event, explanation, the outcome and the command-mode captions), so it
plays in any browser without depending on the operating system's voices. The
intro's first screen offers *Begin with narration*; the *Voice* button in the
header toggles it at any time. Lines without a clip (for example "the Re
division has routed") fall back to the browser's own speech engine, if it has
one.

Several narrators are offered in the header; the list is `scenario.voices` and
each has its own folder. The clips were synthesised with
[Piper](https://github.com/rhasspy/piper) (MIT) using the `en-us-libritts-high`
model (LibriTTS dataset, CC BY 4.0): narrator-1 is speaker 400, narrator-2 is
speaker 7, narrator-3 is speaker 0. To record a voice, or re-record after
changing any text:

```
PIPER=/path/to/piper MODEL=/path/to/en-us-libritts-high.onnx SPEAKER=7 VOICE=narrator-2 tools/make-narration.sh
```

File names follow a convention the engine knows (`intro-N`, `event-N`,
`explain-N`, `outcome`, `cmd-KEY`). To use a human recording for any line, drop
in a file with that name, or set an explicit `audio` path on the slide or
event in `scenario.js`.

## Citations

Every confidence tag in the game is a button. Clicking it opens the source
records behind that kind of claim (the Poem, the Bulletin, the reliefs, the
Apology of Hattusili III, the treaty, and the modern studies), and, where a
line has a `cite` field, the specific record for that line. The lists live in
`scenario.citations`.

## Map navigation

Double-click the minimap to see the whole battlefield; drag a box on the big
map to zoom into that area, or double-click the minimap again to return.
Shift-drag draws a zoom box at any time.

## Adding another battle

Copy `scenario.js`, change the geography, formations, events and narration,
and point `index.html` at the new file. The engine reads only the scenario
object; nothing about Kadesh is hard-coded in `engine.js` except the
command-mode AI's event times, which live in `scenario.ai`.
