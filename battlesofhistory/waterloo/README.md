# Battle of Waterloo (in preparation)

The game itself is not built yet. This folder holds what is ready:

- `NARRATION-SCRIPT.md`: the narration, one entry per clip.
- `audio/clear/`: the 28 recorded clips (Piper `en-us-libritts-high`, speaker 25, "Narrator 1 · clear"),
  made with `../tools/script-to-narration.sh`. If the script changes, re-record with
  `bash ../tools/script-to-narration.sh NARRATION-SCRIPT.md audio/clear` (add `FORCE=1` to redo existing clips).

Narration: `NARRATION-SCRIPT.md` is generated from `scenario.js` with `node ../tools/scenario-to-script.js scenario.js > NARRATION-SCRIPT.md`.
Edit the scenario, regenerate the script, then record only the missing clips: `script-to-narration.sh` skips clips that
already exist, so delete a clip whose text changed before recording.
