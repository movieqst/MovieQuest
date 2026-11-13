#!/usr/bin/env bash
# Downloads a full National Library of Scotland map (maps.nls.uk, licence CC BY) in pieces, because the NLS image
# server refuses whole large images ("pixel area exceeds the maximum threshold"). The pieces are put back together later.
#   bash fetch-nls-map.sh 101464753 [101464744 ...]
# Makes ~/nls-maps/<map number>/ with info.json and tiles r<row>_c<col>.jpg (512 x 512 pieces; the server allows at most 270,000 pixels per request of the map at SCALE).
# SCALE=0.5 (default) gives half the scan's resolution, which is plenty for tracing; SCALE=1 for the full scan.
# Then:  cd ~ && zip -r nls-maps.zip nls-maps   and send nls-maps.zip back.
set -euo pipefail
SCALE=${SCALE:-0.5}; OUT=${OUT:-$HOME/nls-maps}; PIECE=${PIECE:-512}
for ID in "$@"; do
  D="$OUT/$ID"; mkdir -p "$D"; BASE="https://map-view.nls.uk/iiif/2/10146%2F$ID"
  curl -sSf "$BASE/info.json" -o "$D/info.json"
  read W H < <(python3 -c "import json,sys; j=json.load(open(sys.argv[1])); print(j['width'], j['height'])" "$D/info.json")
  R=$(python3 -c "print(int($PIECE / $SCALE))")          # region size in scan pixels for one piece
  rows=$(( (H + R - 1) / R )); cols=$(( (W + R - 1) / R )); n=0; total=$(( rows * cols ))
  echo "Map $ID: $W x $H pixels -> $total pieces"
  for ((r=0; r<rows; r++)); do for ((c=0; c<cols; c++)); do
    n=$((n+1)); f="$D/r${r}_c${c}.jpg"; [ -s "$f" ] && continue
    x=$((c*R)); y=$((r*R)); w=$(( W-x < R ? W-x : R )); h=$(( H-y < R ? H-y : R ))
    sw=$(python3 -c "print(max(1, round($w * $SCALE)))")
    curl -sSf "$BASE/$x,$y,$w,$h/$sw,/0/default.jpg" -o "$f" || { echo "piece $r,$c failed, run again to retry"; rm -f "$f"; }
    printf '\r  %d / %d' "$n" "$total"
  done; done; echo
done
echo "Done. Now run:  cd ~ && zip -r nls-maps.zip nls-maps"
