#!/usr/bin/env bash
# Records the French narration for Waterloo with two Piper voices (fr_FR-tom, a man; fr_FR-siwis, a woman).
#   bash record-french.sh
# Downloads the two voices the first time (about 60 MB each), then makes ~/voices/waterloo/fr-tom/*.mp3 and
# ~/voices/waterloo/fr-siwis/*.mp3 (45 clips each). Safe to stop (Ctrl+C) and run again: finished clips are skipped.
# Then:  cd ~ && zip -r voices-fr.zip voices/waterloo/fr-tom voices/waterloo/fr-siwis   and send voices-fr.zip back.
set -euo pipefail
HERE=$(cd "$(dirname "$0")" && pwd); LINES="$HERE/waterloo-fr-voices-lines.tsv"
VOICES=${VOICES:-$HOME/piper-voice}; mkdir -p "$VOICES"
HF=https://huggingface.co/rhasspy/piper-voices/resolve/main/fr/fr_FR
get() { [ -s "$VOICES/$1.onnx" ] || { echo "Downloading $1 ..."; curl -sSL -o "$VOICES/$1.onnx" "$HF/$2/$3/$1.onnx"; curl -sSL -o "$VOICES/$1.onnx.json" "$HF/$2/$3/$1.onnx.json"; }; }
get fr_FR-tom-medium tom medium
get fr_FR-siwis-medium siwis medium
grep -P '^\S+\tfr-tom\t' "$LINES" > /tmp/fr-tom.tsv;   MODEL="$VOICES/fr_FR-tom-medium.onnx"   bash "$HERE/record-voices.sh" /tmp/fr-tom.tsv
grep -P '^\S+\tfr-siwis\t' "$LINES" > /tmp/fr-siwis.tsv; MODEL="$VOICES/fr_FR-siwis-medium.onnx" bash "$HERE/record-voices.sh" /tmp/fr-siwis.tsv
echo "All done. Now run:  cd ~ && zip -r voices-fr.zip voices/waterloo/fr-tom voices/waterloo/fr-siwis"
