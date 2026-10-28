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

The *Voice* button speaks the introduction, captions and explanations with the
browser's built-in speech engine (Web Speech API). Voice quality depends on the
operating system; some Linux builds ship no voices at all, in which case the
button does nothing audible.

Recorded narration can replace it line by line: add an `audio` field with a
file path to any intro slide or event in `scenario.js`, for example
`audio: 'audio/intro-01.mp3'`. When the field is present the engine plays the
file instead of synthesising speech.

## Adding another battle

Copy `scenario.js`, change the geography, formations, events and narration,
and point `index.html` at the new file. The engine reads only the scenario
object; nothing about Kadesh is hard-coded in `engine.js` except the
command-mode AI's event times, which live in `scenario.ai`.
