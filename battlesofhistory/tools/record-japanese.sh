#!/usr/bin/env bash
# Records Japanese narration with two Kokoro voices (jm_kumo, a man; jf_alpha, a woman). Piper has no Japanese voice.
#   bash record-japanese.sh test                 -> a short test clip per voice in ~/voices/ja-test/ (check the names!)
#   bash record-japanese.sh <battle>-ja-voices-lines.tsv
# The first run sets up ~/kokoro-env (about 1-2 GB with torch, a few minutes). Kokoro and its voices: Apache-2.0.
# Safe to stop (Ctrl+C) and run again: finished clips are skipped.
set -euo pipefail
HERE=$(cd "$(dirname "$0")" && pwd); ENV=${KOKORO_ENV:-$HOME/kokoro-env}; OUT=${OUT:-$HOME/voices}
[ -x "$ENV/bin/pip" ] || rm -rf "$ENV"   # a half-made environment (e.g. python3-venv was missing) is started again
if [ ! -x "$ENV/bin/python" ]; then
  echo "Setting up Kokoro in $ENV (first time only) ..."
  python3 -m venv "$ENV" || { rm -rf "$ENV"; v=$(python3 -c "import sys; print('%d.%d' % sys.version_info[:2])"); echo "Please run:  sudo apt install python3-venv python$v-venv   and try again."; exit 1; }
  "$ENV/bin/pip" install -q --upgrade pip
  "$ENV/bin/pip" install -q --extra-index-url https://download.pytorch.org/whl/cpu torch
  "$ENV/bin/pip" install -q kokoro soundfile "misaki[ja]"
fi
MIX='highpass=f=70,agate=threshold=0.035:ratio=6:attack=8:release=160:knee=2,volume=1.6,alimiter=limit=0.95'
LINES=${1:?usage: record-japanese.sh test | lines.tsv}
if [ "$LINES" = test ]; then
  T=$(mktemp)
  S='関ヶ原の戦い。慶長五年九月十五日、徳川家康の東軍と石田三成の西軍が、美濃国関ヶ原で戦いました。小早川秀秋は松尾山に陣を構えていました。'
  printf 'ja-test\tja-kumo\tjm_kumo\t1.0\t-\t%s\ttest\t%s\n'  "$MIX" "$S" >  "$T"
  printf 'ja-test\tja-alpha\tjf_alpha\t1.0\t-\t%s\ttest\t%s\n' "$MIX" "$S" >> "$T"
  rm -f "$OUT/ja-test/ja-kumo/test.mp3" "$OUT/ja-test/ja-alpha/test.mp3"
  "$ENV/bin/python" "$HERE/kokoro-say.py" "$T" "$OUT"; rm -f "$T"
  echo "Listen to:  $OUT/ja-test/ja-kumo/test.mp3  and  $OUT/ja-test/ja-alpha/test.mp3"
  echo "Then:  cd ~ && zip -r ja-test.zip voices/ja-test   and send ja-test.zip back."
  exit 0
fi
"$ENV/bin/python" "$HERE/kokoro-say.py" "$LINES" "$OUT"
echo "All done. Zip the battle's ja-kumo and ja-alpha folders under $OUT and send them back."
