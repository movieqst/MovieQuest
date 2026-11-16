#!/usr/bin/env python3
"""Vimy in French: writes vimy/lang-fr.js (window.VIMY_LANG.fr) from lang/fr.json, checks it item for item against the
English page, and writes the recording list tools/vimy-fr-voices-lines.tsv for the two Piper voices (fr-tom, fr-siwis).
Translated by Claude from the fact-checked English, with the terms of Veterans Affairs Canada (la crête de Vimy, la cote
145, le Bourgeon, le barrage roulant, le tunnel Grange, la croix de Victoria); to be read by a native speaker.
For the voices only (not on the page): ordinals (16e, 1re) and Roman numerals (VIe) are spelled out in words.
    python3 battlesofhistory/vimy/tools/make-lang-fr.py      (needs: pip install num2words)"""
import json, os, re, subprocess
from num2words import num2words
HERE = os.path.dirname(os.path.abspath(__file__)); V = os.path.join(HERE, '..'); ROOT = os.path.join(V, '..')
L = json.load(open(os.path.join(V, 'lang', 'fr.json'), encoding='utf-8'))
NB = ' '
def typo(s):   # French spacing: a no-break space before : ; ? ! and inside « »
    s = re.sub(r' ([:;?!»])', NB + r'\1', s); s = re.sub(r'« ', '«' + NB, s)
    return s
def walk(o):
    if isinstance(o, str): return typo(o)
    if isinstance(o, list): return [walk(x) for x in o]
    if isinstance(o, dict): return {k: (v if k in ('strings',) else walk(v)) for k, v in o.items()}
    return o
strings = {k: typo(v) for k, v in L.get('strings', {}).items()}
L = walk(L); L['strings'] = strings
# the shape must match the English page exactly
EN = json.load(open(os.path.join(V, 'lang', 'en-skeleton.json'), encoding='utf-8'))
assert [len(s['lines']) for s in L['intro']] == [len(s['lines']) for s in EN['intro']], 'intro lines'
assert [len(s['media']) for s in L['intro']] == [len(s['media']) for s in EN['intro']], 'intro media'
for k in ('events', 'outcome', 'units', 'labels', 'library', 'sources'): assert len(L[k]) == len(EN[k]), k
assert set(L['formations']) == set(EN['formations']) and set(L['leaders']) == set(EN['leaders'])
assert [len(u['lines']) for u in L['units']] == [len(u.get('lines', [])) for u in EN['units']], 'unit lines'
open(os.path.join(V, 'lang-fr.js'), 'w', encoding='utf-8').write(
    '/* Bataille de la crête de Vimy: the French text of the page, made by tools/make-lang-fr.py from lang/fr.json.\n'
    '   Translated by Claude from the fact-checked English; to be read by a native speaker. */\n'
    'window.VIMY_LANG = window.VIMY_LANG || {};\nwindow.VIMY_LANG.fr = ' + json.dumps(L, ensure_ascii=False, indent=1) + ';\n')
# the recording list, from the page's own text (tools/make-lang-voices-lines.js), respelled for the voices
ROMAN = {'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5, 'VI': 6, 'VII': 7, 'VIII': 8, 'IX': 9, 'X': 10}
def say(t):
    t = t.replace(NB, ' ')
    t = re.sub(r'\b1re\b', 'première', t); t = re.sub(r'\b1er\b', 'premier', t)
    t = re.sub(r'\b(\d+)e\b', lambda m: num2words(int(m.group(1)), lang='fr', to='ordinal'), t)
    t = re.sub(r'\b(I|II|III|IV|V|VI|VII|VIII|IX|X)e\b', lambda m: num2words(ROMAN[m.group(1)], lang='fr', to='ordinal'), t)
    return t
out = subprocess.run(['node', os.path.join(ROOT, 'tools', 'make-lang-voices-lines.js'), 'vimy', 'fr', 'fr-tom,fr-siwis'], capture_output=True, text=True, check=True)
rows = [r.split('\t') for r in out.stdout.strip().split('\n')]
with open(os.path.join(ROOT, 'tools', 'vimy-fr-voices-lines.tsv'), 'w', encoding='utf-8') as f:
    for r in rows: r[7] = say(r[7]); f.write('\t'.join(r) + '\n')
print('lang-fr.js written;', len(rows), 'recording lines;', out.stderr.strip())
