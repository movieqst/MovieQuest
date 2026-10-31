#!/usr/bin/env bash
# Records the "Welcome to Battles of History" line for every battle and narrator voice.
#   bash record-welcome.sh welcome-lines.tsv
# Makes ~/welcome-clips/<battle>/<voice>/welcome.mp3, then zip ~/welcome-clips and send it back.
set -euo pipefail
LINES=${1:?usage: record-welcome.sh welcome-lines.tsv}
PIPER=${PIPER:-$HOME/.local/bin/piper}; MODEL=${MODEL:-$HOME/piper-voice/en_US-libritts-high.onnx}
OUT=${OUT:-$HOME/welcome-clips}; TMP=$(mktemp -d)
while IFS=$'\t' read -r battle voice speaker length args mix text; do
  mkdir -p "$OUT/$battle/$voice"; [ "$args" = "-" ] && args=""
  printf '%s\n' "$text" | "$PIPER" -m "$MODEL" -s "$speaker" --length-scale "$length" --sentence-silence 0.35 $args -f "$TMP/w.wav" >/dev/null 2>&1
  ffmpeg -nostdin -loglevel error -y -i "$TMP/w.wav" -af "$mix" -ac 1 -ar 22050 -codec:a libmp3lame -b:a 48k "$OUT/$battle/$voice/welcome.mp3"
  echo "$OUT/$battle/$voice/welcome.mp3"
done < "$LINES"
rm -rf "$TMP"; echo "Done. Now run:  cd ~ && zip -r welcome-clips.zip welcome-clips"
