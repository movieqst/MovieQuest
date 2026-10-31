#!/usr/bin/env bash
# Records the extra narrator voices (light, bright, deep, warm, computer) for Waterloo, Gaugamela and Pegasus Bridge.
#   bash record-voices.sh voices-lines.tsv
# Makes ~/voices/<battle>/<voice>/<clip>.mp3. Safe to stop (Ctrl+C) and run again: clips already made are skipped.
# Then:  cd ~ && zip -r voices.zip voices   and send voices.zip back.
set -euo pipefail
LINES=${1:?usage: record-voices.sh voices-lines.tsv}
PIPER=${PIPER:-$HOME/.local/bin/piper}; MODEL=${MODEL:-$HOME/piper-voice/en_US-libritts-high.onnx}
OUT=${OUT:-$HOME/voices}; TMP=$(mktemp -d); total=$(wc -l < "$LINES"); n=0
while IFS=$'\t' read -r battle voice speaker length args mix name text; do
  n=$((n+1)); f="$OUT/$battle/$voice/$name.mp3"; mkdir -p "$OUT/$battle/$voice"
  [ -s "$f" ] && continue
  [ "$args" = "-" ] && args=""
  printf '%s\n' "$text" | "$PIPER" -m "$MODEL" -s "$speaker" --length-scale "$length" --sentence-silence 0.35 $args -f "$TMP/c.wav" >/dev/null 2>&1
  ffmpeg -nostdin -loglevel error -y -i "$TMP/c.wav" -af "$mix" -ac 1 -ar 22050 -codec:a libmp3lame -b:a 48k "$f"
  echo "[$n/$total] $f"
done < "$LINES"
rm -rf "$TMP"; echo "Done. Now run:  cd ~ && zip -r voices.zip voices"
