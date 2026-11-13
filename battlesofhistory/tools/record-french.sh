#!/usr/bin/env bash
# Records the French narration for Waterloo with two Piper voices (fr_FR-tom, a man; fr_FR-siwis, a woman).
#   bash record-french.sh                      (Waterloo)
#   bash record-french.sh batoche-fr-voices-lines.tsv   (or any other battle's French list)
# Downloads the two voices the first time (about 60 MB each), then makes ~/voices/waterloo/fr-tom/*.mp3 and
# ~/voices/waterloo/fr-siwis/*.mp3 (45 clips each). Safe to stop (Ctrl+C) and run again: finished clips are skipped.
# Then zip the battle's two French folders, as the last line it prints says.
set -euo pipefail
HERE=$(cd "$(dirname "$0")" && pwd); LIST="${1:-$HERE/waterloo-fr-voices-lines.tsv}"   # another battle: bash record-french.sh ../tools/batoche-fr-voices-lines.tsv
VOICES=${VOICES:-$HOME/piper-voice}; mkdir -p "$VOICES"
HF=https://huggingface.co/rhasspy/piper-voices/resolve/main/fr/fr_FR
get() { [ -s "$VOICES/$1.onnx" ] || { echo "Downloading $1 ..."; curl -sSL -o "$VOICES/$1.onnx" "$HF/$2/$3/$1.onnx"; curl -sSL -o "$VOICES/$1.onnx.json" "$HF/$2/$3/$1.onnx.json"; }; }
get fr_FR-tom-medium tom medium
get fr_FR-siwis-medium siwis medium
awk -F'\t' '$2 == "fr-tom"' "$LIST" > /tmp/fr-tom.tsv;   MODEL="$VOICES/fr_FR-tom-medium.onnx"   bash "$HERE/record-voices.sh" /tmp/fr-tom.tsv
awk -F'\t' '$2 == "fr-siwis"' "$LIST" > /tmp/fr-siwis.tsv; MODEL="$VOICES/fr_FR-siwis-medium.onnx" bash "$HERE/record-voices.sh" /tmp/fr-siwis.tsv
B=$(cut -f1 "$LIST" | head -1)   # the battle this list is for
echo "All done. Now run:  cd ~/voices && zip -r $B-fr.zip $B/fr-tom $B/fr-siwis   and send $B-fr.zip back."
