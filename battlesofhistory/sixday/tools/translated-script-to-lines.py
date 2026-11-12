#!/usr/bin/env python3
"""Recording list (TSV for tools/record-voices.sh) from a translated Six-Day War narration script
(NARRATION-SCRIPT-AR.md / NARRATION-SCRIPT-HE.md), cut into the same 35 clips as the English:
welcome, intro-1..7 (title + bullets), event-1..26 (chapter title + bullets), outcome (the debrief bullets).
    python3 sixday/tools/translated-script-to-lines.py sixday/NARRATION-SCRIPT-HE.md he-noa 0 > tools/sixday-he-voices-lines.tsv
Tags *(...)*, the English in [brackets], map lines and Markdown marks are dropped; only what is said aloud is kept."""
import re, sys
src, voice, speaker = sys.argv[1], sys.argv[2], sys.argv[3]
MIX = 'highpass=f=70,agate=threshold=0.035:ratio=6:attack=8:release=160:knee=2,volume=1.6,alimiter=limit=0.95'
L = open(src, encoding='utf-8').read().split('\n')
def clean(t):
    t = re.sub(r'\*\([^)]*\)\*', '', t); t = re.sub(r'\s*\[[^\]]*\]', '', t)
    return re.sub(r'\s+', ' ', t.replace('**', '').replace('*', '')).strip()
def heading_text(h): return clean(re.sub(r'^#+\s*(\d+\.\s*)?', '', h))
clips, cur, part = [], None, None
for line in L:
    if line.startswith('## '):
        h = line.lower()
        part = 'welcome' if 'welcome' in h else 'intro' if 'introduction' in h else 'debrief' if 'debrief' in h else 'notes' if 'notes' in h else 'event'
        if part == 'welcome': cur = ['welcome', []]; clips.append(cur)
        elif part == 'debrief': cur = ['outcome', []]; clips.append(cur)
        elif part == 'notes': cur = None
        continue
    if line.startswith('### '):
        if part == 'debrief': continue                      # the debrief's sub-headings are not read
        m = re.match(r'###\s*(\d+)\.', line); n = int(m.group(1))
        name = ('intro-' if part == 'intro' else 'event-') + str(n)
        t = heading_text(line); t = t[:1] + t[1:].lower() if t.isupper() else t
        cur = [name, [t + ('.' if not t.endswith(('.', '?', '!', '؟')) else '')]]; clips.append(cur); continue
    if cur is None or line.startswith('---') or line.startswith('<!--'): continue
    s = line.strip()
    if not s or (s.startswith('*') and not s.startswith('**')): continue   # blank lines and italic map lines
    if s.startswith('- '): s = s[2:]
    cur[1].append(clean(s))
for name, parts in clips:
    text = ' '.join(p for p in parts if p)
    print('\t'.join(['sixday', voice, speaker, '1.0', '-', MIX, name, text]))
print(len(clips), 'clips', file=sys.stderr)
