# Battle of Waterloo (in preparation)

The game itself is not built yet. This folder holds what is ready:

- `NARRATION-SCRIPT.md`: the narration, one entry per clip.
- `audio/clear/`: the 28 recorded clips (Piper `en-us-libritts-high`, speaker 25, "Narrator 1 · clear"),
  made with `../tools/script-to-narration.sh`. If the script changes, re-record with
  `bash ../tools/script-to-narration.sh NARRATION-SCRIPT.md audio/clear` (add `FORCE=1` to redo existing clips).

Notes for the build:
- Waterloo needs artillery as a new unit type (the French grand battery, the Allied guns on the crest).
- Three script lines to check before release: intro-6 says "ancient" accounts (1815); event-5 places both farms
  "on the Brussels road" (Hougoumont is on the Allied right); event-6 (Scots Greys) comes after the cavalry
  attacks of events 3 and 4, though historically it came before them.
