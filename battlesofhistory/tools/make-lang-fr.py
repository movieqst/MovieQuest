#!/usr/bin/env python3
"""A battle in French: writes <battle>/lang-fr.js from <battle>/lang/fr.json (and lang/fr-page.json, if there is one),
checks it item for item against the English page (tools/lang-skeleton.js), and writes the recording list
tools/<battle>-fr-voices-lines.tsv for the two Piper voices (fr-tom, fr-siwis; record with tools/record-french.sh).
    python3 battlesofhistory/tools/make-lang-fr.py vimy        (needs: pip install num2words)
On the page: French spacing (a no-break space before : ; ? ! and inside « »). For the voices only: ordinals (16e, 1re),
Roman numerals (VIe) and clock times (18 h 57) are spelled out in words."""
import json, os, re, subprocess, sys
from num2words import num2words
TOOLS = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(TOOLS)
battle = sys.argv[1]; B = os.path.join(ROOT, battle)
L = json.load(open(os.path.join(B, 'lang', 'fr.json'), encoding='utf-8'))
page = os.path.join(B, 'lang', 'fr-page.json')
if os.path.exists(page): L.update(json.load(open(page, encoding='utf-8')))
NB = ' '
def typo(s): return re.sub(r'« ', '«' + NB, re.sub(r' ([:;?!»])', NB + r'\1', s))
def walk(o):
    if isinstance(o, str): return typo(o)
    if isinstance(o, list): return [walk(x) for x in o]
    if isinstance(o, dict): return {k: walk(v) for k, v in o.items()}
    return o
CHOICE = L.pop('_narrateChoice', False)   # the battle's engine narrates the choice slide too (Dunkirk)
L = walk(L)
# the shape must match the English page exactly
EN = json.loads(subprocess.run(['node', os.path.join(TOOLS, 'lang-skeleton.js'), battle], capture_output=True, text=True, check=True).stdout)
json.dump(EN, open(os.path.join(B, 'lang', 'en-skeleton.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
assert [len(s['lines']) for s in L['intro']] == [len(s['lines']) for s in EN['intro']], 'intro lines'
assert [len(s['media']) for s in L['intro']] == [len(s['media']) for s in EN['intro']], 'intro media'
for k in ('events', 'outcome', 'units', 'library', 'sources'): assert len(L.get(k) or []) == len(EN.get(k) or []), k
if EN.get('labels'): assert len(L['labels']) == len(EN['labels']), 'labels'
for k in ('formations', 'leaders'): assert set(L.get(k) or {}) == set(EN.get(k) or {}), k
assert [len(u.get('lines', [])) for u in L['units']] == [len(u.get('lines', [])) for u in EN['units']], 'unit lines'
assert all(bool(a.get('explain')) == bool(b.get('explain')) for a, b in zip(L['events'], EN['events'])), 'explain'
missing = [s for s in EN.get('strings', {}) if s not in L.get('strings', {}) and not re.fullmatch(r"[A-Z][a-zé'’-]+(-[A-Za-z]+)*( [A-Z][a-z]+)?", s)]
if missing: print('not translated (left in English):', missing)
key = re.search(r'window\.(\w+_SCENARIO)', open(os.path.join(B, 'scenario.js'), encoding='utf-8').read()).group(1).replace('_SCENARIO', '_LANG')
open(os.path.join(B, 'lang-fr.js'), 'w', encoding='utf-8').write(
    '/* The French text of the page, made by tools/make-lang-fr.py from lang/fr.json. Translated by Claude from the\n'
    '   fact-checked English; to be read by a native speaker. */\n'
    f'window.{key} = window.{key} || {{}};\nwindow.{key}.fr = ' + json.dumps(L, ensure_ascii=False, indent=1) + ';\n')
# the recording list, from the page's own text, respelled for the voices
ROMAN = {'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5, 'VI': 6, 'VII': 7, 'VIII': 8, 'IX': 9, 'X': 10, 'XVI': 16}
def say(t):
    t = t.replace(NB, ' ')
    t = re.sub(r'\b(\d{1,2}) h (\d{2})\b', lambda m: m.group(1) + ' heures ' + str(int(m.group(2))), t)
    t = re.sub(r'\b(\d{1,2}) h\b', r'\1 heures', t)
    t = re.sub(r'\b1re\b', 'première', t); t = re.sub(r'\b1er\b', 'premier', t)
    t = re.sub(r'\b(\d+)e\b', lambda m: num2words(int(m.group(1)), lang='fr', to='ordinal'), t)
    t = re.sub(r'\b(XVI|VIII|VII|III|II|IV|IX|VI|V|X|I)e\b', lambda m: num2words(ROMAN[m.group(1)], lang='fr', to='ordinal'), t)
    return t
out = subprocess.run(['node', os.path.join(TOOLS, 'make-lang-voices-lines.js'), battle, 'fr', 'fr-tom,fr-siwis'] + (['--choice'] if CHOICE else []), capture_output=True, text=True, check=True)
rows = [r.split('\t') for r in out.stdout.strip().split('\n')]
with open(os.path.join(TOOLS, battle + '-fr-voices-lines.tsv'), 'w', encoding='utf-8') as f:
    for r in rows: r[7] = say(r[7]); f.write('\t'.join(r) + '\n')
print(f'{battle}/lang-fr.js written;', len(rows), 'recording lines;', out.stderr.strip())
