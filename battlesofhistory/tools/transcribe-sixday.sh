#!/usr/bin/env bash
# Six-Day War radio recordings: Hebrew transcripts with Whisper, in one overnight run.
#   1. the four chosen clips with the best model (large-v3)      -> <clips>/large/*.srt
#   2. every full recording with the medium model (library copy)  -> <recordings>/transcripts/  (.srt, .txt and more)
# Safe to stop (Ctrl+C) and run again: files already transcribed are skipped.
#   bash transcribe-sixday.sh
# Then:  cd ~ && zip -r sixday-transcripts.zip "Documents/BATTLE GAMES/6day/clips/large" "Documents/BATTLE GAMES/6day/transcripts"
set -u
REC="${REC:-$HOME/Documents/BATTLE GAMES/6day}"   # the folder with the full recordings
CLIPS="${CLIPS:-$REC/clips}"                       # the 35-second clips
source "$HOME/whisper-env/bin/activate"

echo "== 1. The four chosen clips, best model (large-v3; first run downloads about 3 GB)"
cd "$CLIPS" || { echo "No clips folder: $CLIPS"; exit 1; }
for f in mordechai-lavon-1-2643.mp3 danny-manor-1-3143.mp3 megiddo-2-0223.mp3 mordechai-lavon-3-3002.mp3; do
  [ -s "large/${f%.mp3}.srt" ] && { echo "   done already: $f"; continue; }
  echo "   $f"; whisper "$f" --model large-v3 --language Hebrew --output_format srt --output_dir large 2>/dev/null
done

echo "== 2. The full recordings, medium model (several hours on this computer)"
cd "$REC" || exit 1
for f in *.mp3; do
  [ -s "transcripts/${f%.mp3}.srt" ] && { echo "   done already: $f"; continue; }
  echo "   $f"; whisper "$f" --model medium --language Hebrew --output_format all --output_dir transcripts 2>/dev/null
done
echo "All done. Now run:"
echo "  cd ~ && zip -r sixday-transcripts.zip \"Documents/BATTLE GAMES/6day/clips/large\" \"Documents/BATTLE GAMES/6day/transcripts\""
