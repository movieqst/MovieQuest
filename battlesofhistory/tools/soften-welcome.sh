#!/usr/bin/env bash
# The welcome line starts soft: "Welcome to" at about a third of the volume, rising to full by "Battles of History"
# (over RISE seconds after the voice begins). Also adds the usual 0.3 s pause and fade-in. Safe to run twice.
#   bash tools/soften-welcome.sh battlesofhistory/*/audio/*/welcome.mp3
RISE=${RISE:-1.4}; FROM=${FROM:-0.3}
for f in "$@"; do
  ffprobe -v error -show_entries format_tags=comment -of csv=p=0 "$f" | grep -q soft-start && continue
  s=$(ffmpeg -nostdin -i "$f" -af silencedetect=noise=-45dB:d=0.02 -f null - 2>&1 | grep -m1 -o "silence_end: [0-9.]*" | cut -d' ' -f2); s=${s:-0}
  t=$(mktemp --suffix=.mp3)
  ffmpeg -nostdin -loglevel error -y -i "$f" -af "volume='$FROM+(1-$FROM)*min(1,max(0,(t-$s)/$RISE))':eval=frame,afade=t=in:st=0:d=0.12,adelay=300|300" \
    -ac 1 -ar 22050 -codec:a libmp3lame -b:a 48k -metadata comment=soft-start "$t" && mv "$t" "$f"
done
