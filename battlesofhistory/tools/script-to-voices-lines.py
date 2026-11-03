#!/usr/bin/env python3
"""Recording list (TSV for record-voices.sh) from a NARRATION-SCRIPT.md in the Vimy/Stirling format:
## Welcome (a paragraph), ### N. Title + "- line *(tag)*" bullets (intro-N), "N. **Title** · clock" + indented text
(event-N), and the bullets of "## The outcome" and "## The aftermath" together (outcome).
    python3 script-to-voices-lines.py ../stirling/NARRATION-SCRIPT.md stirling > stirling-voices-lines.tsv
Tags *(...)* are dropped; the six English voices are those of the other battles."""
import re, sys
src, battle = open(sys.argv[1], encoding='utf-8').read(), sys.argv[2]
MIX = 'highpass=f=70,agate=threshold=0.035:ratio=6:attack=8:release=160:knee=2,volume=1.6,alimiter=limit=0.95'
CMIX = 'highpass=f=90,lowpass=f=4800,bass=g=4:f=140,acompressor=threshold=0.25:ratio=3:attack=20:release=250,volume=1.4,alimiter=limit=0.95'
VOICES = [('clear', 25, '1.08', '-', MIX), ('light', 60, '1.08', '-', MIX), ('bright', 0, '1.08', '-', MIX), ('deep', 400, '1.08', '-', MIX),
          ('warm', 7, '1.08', '-', MIX), ('computer', 500, '1.3', '--noise-scale 0.4 --noise-w 0.3', CMIX)]
SMALL = {'a', 'an', 'the', 'of', 'and', 'or', 'to', 'in', 'on', 'at', 'by', 'for'}
def clean(t): return re.sub(r'\s+', ' ', re.sub(r'\*\([^)]*\)\*', '', t).replace('**', '').replace('---', '')).strip()
def title(t):
    if t != t.upper(): return t
    w = t.lower().split(); return ' '.join(x if i and x in SMALL else x[:1].upper() + x[1:] for i, x in enumerate(w))
def section(name):
    m = re.search(r'^## ' + name + r'.*?$(.*?)(?=^## |\Z)', src, re.M | re.S); return m.group(1) if m else ''
clips = []
clips.append(('welcome', clean(section('Welcome'))))
for n, t, body in re.findall(r'^### (\d+)\. (.+?)$(.*?)(?=^### |^---|^## |\Z)', section('Introduction'), re.M | re.S):
    lines = [clean(x) for x in re.findall(r'^- (.+?)(?=^- |\Z)', body.strip() + '\n', re.M | re.S)]
    clips.append(('intro-' + n, title(clean(t)) + '. ' + ' '.join(lines)))
for n, body in re.findall(r'^(\d+)\. \*\*.+?\*\*.*?$(.*?)(?=^\d+\. \*\*|^## |\Z)', section('The reenactment'), re.M | re.S):
    clips.append(('event-' + n, clean(body)))
out = [clean(x) for s in ('The outcome', 'The aftermath') for x in re.findall(r'^- (.+?)(?=^- |\Z)', section(s).strip() + '\n', re.M | re.S)]
clips.append(('outcome', ' '.join(out)))
# names respelled for the synthesiser only (the captions keep the real spelling)
SAY = [(r'\bMoray\b', 'Murray'), (r'\bGuisborough\b', 'Gizbruh'), (r'\bLübeck\b', 'Loobeck'), (r'\bScalacronica\b', 'Scala-cronica'),
       (r'\bThweng\b', 'Thweng'), (r'\bCressingham\b', 'Cressing-um')]
def say(t):
    for a, b in SAY: t = re.sub(a, b, t)
    return t
clips = [(n, say(t)) for n, t in clips]
for v, spk, ln, args, mix in VOICES:
    for name, text in clips: print('\t'.join([battle, v, str(spk), ln, args, mix, name, text]))
