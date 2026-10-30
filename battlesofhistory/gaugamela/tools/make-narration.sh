#!/usr/bin/env bash
# Pre-records every narration line as audio/<name>.mp3 using Piper TTS.
#   PIPER=/path/to/piper MODEL=/path/to/voice.onnx SPEAKER=400 VOICE=narrator-1 tools/make-narration.sh
# Clips go to audio/$VOICE/ ; the voice list the game offers is scenario.voices.
# Voice used for the shipped clips: Piper "en-us-libritts-high", speaker 400
# (LibriTTS dataset, CC BY 4.0; Piper is MIT licensed).
set -euo pipefail
cd "$(dirname "$0")/.."
PIPER=${PIPER:-piper}; MODEL=${MODEL:?set MODEL to the .onnx voice}; SPEAKER=${SPEAKER:-400}; VOICE=${VOICE:-narrator-1}
LENGTH=${LENGTH:-1.08}                 # >1 = slower delivery
PIPER_ARGS=${PIPER_ARGS:-}             # e.g. "--noise-scale 0.4 --noise-w 0.3" for a flatter, calmer read
AF=${AF:-"highpass=f=70,agate=threshold=0.035:ratio=6:attack=8:release=160:knee=2,volume=1.6,alimiter=limit=0.95"}
OUT=audio/$VOICE; mkdir -p "$OUT"
TMP=$(mktemp -d); node tools/narration-lines.js > "$TMP/lines.json"
node -e 'JSON.parse(require("fs").readFileSync(process.argv[1])).forEach(l=>console.log(l.file+"\t"+l.text))' "$TMP/lines.json" | while IFS=$'\t' read -r name text; do
  [ -s "$OUT/$name.mp3" ] && [ -z "${FORCE:-}" ] && continue
  printf '%s\n' "$text" | "$PIPER" -m "$MODEL" -s "$SPEAKER" --length-scale "$LENGTH" --sentence-silence 0.35 $PIPER_ARGS -f "$TMP/$name.wav" >/dev/null 2>&1
  ffmpeg -nostdin -loglevel error -y -i "$TMP/$name.wav" -af "$AF" -ac 1 -ar 22050 -codec:a libmp3lame -b:a 48k "$OUT/$name.mp3"
  echo "$OUT/$name.mp3"
done
rm -rf "$TMP"
