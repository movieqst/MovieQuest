#!/usr/bin/env bash
# Records every clip in a NARRATION-SCRIPT.md (the format used for Waterloo) with Piper, one MP3 per clip.
#   bash script-to-narration.sh NARRATION-SCRIPT.md OUT_DIR
# Needs: piper (pip install piper-tts), the en_US-libritts-high voice, node and ffmpeg.
# Defaults: PIPER=~/.local/bin/piper MODEL=~/piper-voice/en_US-libritts-high.onnx SPEAKER=25 (Narrator 1 · clear).
# Clip names and texts follow the engine: intro-N = title + lines; event-N, explain-N; outcome; cmd-KEY.
# ONLY="intro-2 event-4" records just the named clips (replacing them).
# Names are respelled for the synthesiser only; the script's wording is not changed.
set -euo pipefail
SCRIPT=${1:?usage: script-to-narration.sh NARRATION-SCRIPT.md OUT_DIR}; OUT=${2:?usage: script-to-narration.sh NARRATION-SCRIPT.md OUT_DIR}
PIPER=${PIPER:-$HOME/.local/bin/piper}; MODEL=${MODEL:-$HOME/piper-voice/en_US-libritts-high.onnx}; SPEAKER=${SPEAKER:-25}
LENGTH=${LENGTH:-1.08}; PIPER_ARGS=${PIPER_ARGS:-}
AF=${AF:-"highpass=f=70,agate=threshold=0.035:ratio=6:attack=8:release=160:knee=2,volume=1.6,alimiter=limit=0.95"}
mkdir -p "$OUT"; TMP=$(mktemp -d)
node - "$SCRIPT" > "$TMP/lines.tsv" <<'JS'
var fs = require('fs'), src = fs.readFileSync(process.argv[2], 'utf8').split(/\r?\n/);
var say = function (t) { return String(t)
  .replace(/\bBlücher\b/g, 'Bloocher').replace(/\bBülow\b/g, 'Boolow').replace(/\bHougoumont\b/g, 'Oogoomon').replace(/\bLa Haye Sainte\b/g, 'La Hay Sant')
  .replace(/\bMont-Saint-Jean\b/g, 'Mon San Zhon').replace(/\bd[’']Erlon/g, 'dairlon').replace(/\bPlancenoit\b/g, 'Plahnsenwah').replace(/\bLobau\b/g, 'Lobo')
  .replace(/\bLigny\b/g, 'Leenyee').replace(/\bcuirassiers\b/g, 'kweerasseers').replace(/\bGrouchy\b/g, 'Grooshee').replace(/\bWavre\b/g, 'Wahvruh').replace(/\bZieten\b/g, 'Tseeten').replace(/\bReille\b/g, 'Ray')
  .replace(/\bVandeleur\b/g, 'Vandeler').replace(/\bNey\b/g, 'Nay').replace(/\bJérôme\b/g, 'Zhayrome').replace(/\bOhain\b/g, 'Oh-an')
  .replace(/(\d+):00\b/g, '$1 hundred').replace(/(\d+):(\d\d)/g, '$1 $2').replace(/·/g, ',').replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/–/g, ' to ').replace(/\s+/g, ' ').trim(); };
var clips = [], cur = null;
var push = function (name, title) { cur = { name: name, parts: title ? [/[.?!]$/.test(title) ? title : title + '.'] : [] }; clips.push(cur); };
src.forEach(function (l) {
  var m;
  if ((m = l.match(/^##\s+\*\*(intro-\d+)\*\*:\s*(.+)$/))) push(m[1], m[2].trim());
  else if ((m = l.match(/^##\s+\*\*(event-\d+|outcome)\*\*(?::\s*.*)?$/))) push(m[1], null);           // an event's heading is its title, not narrated
  else if ((m = l.match(/^\*\*(explain-\d+)\*\*:\s*(.+)$/))) { push(m[1], null); cur.parts.push(m[2]); }
  else if ((m = l.match(/^-\s+\*\*(cmd-[\w-]+)\*\*:\s*(.+)$/))) { push(m[1], null); cur.parts.push(m[2]); cur = null; }
  else if (/^##\s/.test(l)) cur = null;
  else if (cur && (m = l.match(/^-\s+(.+)$/))) cur.parts.push(m[1]);
  else if (cur && l.trim() && !/^\*\*/.test(l)) cur.parts.push(l.trim());
});
clips.forEach(function (c) { if (c.parts.length) process.stdout.write(c.name + '\t' + say(c.parts.join(' ')) + '\n'); });
JS
echo "$(wc -l < "$TMP/lines.tsv") clips to record into $OUT"
while IFS=$'\t' read -r name text; do
  [ -n "${ONLY:-}" ] && ! [[ " $ONLY " == *" $name "* ]] && continue   # ONLY="intro-2 event-4 ..." records just those clips
  [ -s "$OUT/$name.mp3" ] && [ -z "${FORCE:-}" ] && [ -z "${ONLY:-}" ] && { echo "$OUT/$name.mp3 (already there)"; continue; }
  printf '%s\n' "$text" | "$PIPER" -m "$MODEL" -s "$SPEAKER" --length-scale "$LENGTH" --sentence-silence 0.35 $PIPER_ARGS -f "$TMP/$name.wav" >/dev/null 2>&1
  ffmpeg -nostdin -loglevel error -y -i "$TMP/$name.wav" -af "$AF" -ac 1 -ar 22050 -codec:a libmp3lame -b:a 48k "$OUT/$name.mp3"
  echo "$OUT/$name.mp3"
done < "$TMP/lines.tsv"
rm -rf "$TMP"
