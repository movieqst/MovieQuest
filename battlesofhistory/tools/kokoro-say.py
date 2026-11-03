#!/usr/bin/env python3
"""Records Japanese narration clips with Kokoro (Apache-2.0 voices), for languages Piper has no voice for.

  python kokoro-say.py lines.tsv OUTDIR
lines.tsv uses the same columns as record-voices.sh:
  battle  voice  kokoro-voice  speed  -  ffmpeg-filter  clip-name  text
e.g.  sekigahara  ja-kumo  jm_kumo  1.0  -  highpass=f=70,...  intro-1  関ヶ原の戦い。…
Writes OUTDIR/<battle>/<voice>/<clip>.mp3. Clips already made are skipped, so it is safe to stop and run again.
"""
import os, subprocess, sys, tempfile

import warnings
warnings.filterwarnings('ignore')   # torch's FutureWarning/UserWarning lines are only noise here
import numpy as np
import soundfile as sf
import torch
try: torch.backends.nnpack.set_flags(False)   # stops the "Could not initialize NNPACK! Unsupported hardware" lines (harmless)
except Exception: pass
from kokoro import KPipeline

lines_path, out = sys.argv[1], sys.argv[2]
rows = [l.rstrip('\n').split('\t') for l in open(lines_path, encoding='utf-8') if l.strip()]
pipe = KPipeline(lang_code='j')
gap = np.zeros(int(24000 * 0.35), dtype=np.float32)  # the same pause between sentences as the Piper clips
tmp = tempfile.mkdtemp()
for n, (battle, voice, kvoice, speed, _args, mix, name, text) in enumerate(rows, 1):
    d = os.path.join(out, battle, voice); os.makedirs(d, exist_ok=True)
    f = os.path.join(d, name + '.mp3')
    if os.path.exists(f) and os.path.getsize(f) > 0:
        continue
    parts = []
    for r in pipe(text, voice=kvoice, speed=float(speed), split_pattern=r'(?<=[。！？])'):
        if r.audio is not None:
            parts += [np.asarray(r.audio, dtype=np.float32), gap]
    wav = os.path.join(tmp, 'c.wav')
    sf.write(wav, np.concatenate(parts[:-1]) if parts else gap, 24000)
    subprocess.run(['ffmpeg', '-nostdin', '-loglevel', 'error', '-y', '-i', wav, '-af', mix,
                    '-ac', '1', '-ar', '22050', '-codec:a', 'libmp3lame', '-b:a', '48k', f], check=True)
    print(f'[{n}/{len(rows)}] {f}', flush=True)
