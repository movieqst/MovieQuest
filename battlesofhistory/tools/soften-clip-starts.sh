#!/usr/bin/env bash
# Gives narration clips a gentle start: a little silence before the voice and a short fade-in, so the narrator does not
# "cut in". Safe to run twice (a marker in the file's tags skips clips already done).
#   bash tools/soften-clip-starts.sh battlesofhistory/*/audio/*/*.mp3
LEAD_MS=${LEAD_MS:-300}; FADE=${FADE:-0.12}
for f in "$@"; do
  ffprobe -v error -show_entries format_tags=comment -of csv=p=0 "$f" | grep -q soft-start && continue
  t=$(mktemp --suffix=.mp3)
  ffmpeg -nostdin -loglevel error -y -i "$f" -af "afade=t=in:st=0:d=$FADE,adelay=$LEAD_MS|$LEAD_MS" -ac 1 -ar 22050 -codec:a libmp3lame -b:a 48k -metadata comment=soft-start "$t" && mv "$t" "$f"
done
