#!/usr/bin/env python3
"""Vukovar in Serbo-Croatian: writes vukovar/lang-sh.js (window.VUKOVAR_LANG.sh) from NARRATION-SCRIPT-SH.md, word for word,
plus lang/page-sh.json (the rest of the page, if present), and the recording list tools/vukovar-sh-voices-lines.tsv for
the Slovenian Piper voice Artur (sl_SI-artur-medium, CC BY 4.0), which reads the Serbo-Croatian text with Slovenian
pronunciation (it was understood far better that way than with Serbian rules: research notes in translations/).
For the voice only (not on the page): ć -> č and đ -> dž (Slovenian has neither), and the respellings in SAY below.
    python3 battlesofhistory/vukovar/tools/make-lang-sh.py"""
import re, json, os, subprocess
HERE = os.path.dirname(os.path.abspath(__file__)); V = os.path.join(HERE, '..'); ROOT = os.path.join(V, '..')
md = open(os.path.join(V, 'NARRATION-SCRIPT-SH.md'), encoding='utf-8').read()
def clean(s):
    s = re.sub(r'\s*\*\([^)]*\)\*\s*', ' ', s); s = s.replace('*', ''); s = re.sub(r'\s*-{3,}\s*$', '', s.strip()); return re.sub(r'\s+', ' ', s).strip()
def strip_en(h): return re.sub(r'\s*\[[^\]]*\]\s*$', '', h).strip()
secs = {}
for sec in re.split(r'^## ', md, flags=re.M)[1:]:
    head, body = sec.split('\n', 1); en = (re.search(r'\[([^\]]*)\]\s*$', head) or [None, ''])[1]; secs[en] = (strip_en(head), body)
L = {'name': 'Srpskohrvatski', 'welcome': clean(secs['Welcome'][1].strip().split('\n\n')[0]), 'intro': [], 'events': [], 'outcome': []}
for blk in re.split(r'\n### \d+\. ', '\n' + secs['Introduction'][1].split('\n---')[0].strip())[1:]:
    t, b = blk.split('\n', 1)
    L['intro'].append({'title': strip_en(t), 'lines': [clean(l) for l in re.split(r'\n- ', '\n' + b.strip()) if l.strip() and not l.strip().startswith('---')]})
ev = [k for k in secs if k.startswith('The reenactment')][0]
evmd = '\n1. ' + secs[ev][1].split('\n1. ', 1)[1]
for blk in re.split(r'\n\d+\. ', evmd.split('\n---')[0])[1:]:
    head, body = blk.split('\n', 1); m = re.match(r'\*\*(.+?)\*\* · (.+)', head.strip())
    L['events'].append({'title': m.group(1), 'clock': m.group(2).strip().rstrip('.') if not re.search(r'\d{4}\.$', m.group(2).strip()) else m.group(2).strip(), 'text': clean(' '.join(p.strip() for p in body.strip().split('\n')))})
for key in ('The outcome', 'The aftermath (debrief)'):
    L['outcome'] += [clean(l) for l in re.split(r'\n- ', '\n' + secs[key][1].split('\n---')[0].strip()) if l.strip()]
# the "From the record" captions, by picture file
rec = {}
for blk in re.split(r'\n### ', '\n' + secs[[k for k in secs if k.startswith('"From the record"')][0]][1])[1:]:
    m = re.search(r'images/(\S+?\.(?:jpg|png))', blk); cap = ' '.join(l.lstrip('> ').strip() for l in blk.split('\n') if l.startswith('>'))
    cr = re.search(r'\*\*[^*]+:\*\* (.+)', blk.split('**Picture')[0] + blk.split('\n')[-1]) if False else None
    if m and cap: rec[m.group(1)] = clean(cap)
L['record'] = rec
# check the shape against the English page
EN = json.loads(subprocess.run(['node', '-e', "global.window={};require(process.argv[1]);const S=window.VUKOVAR_SCENARIO;console.log(JSON.stringify({intro:S.intro.map(s=>s.lines.length),events:S.events.length,outcome:S.outcome.length,record:Object.keys(S.record)}))",
                               os.path.join(V, 'scenario.js')], capture_output=True, text=True).stdout)
assert [len(s['lines']) for s in L['intro']] == EN['intro'], ([len(s['lines']) for s in L['intro']], EN['intro'])
assert len(L['events']) == EN['events'] and len(L['outcome']) == EN['outcome'], (len(L['events']), len(L['outcome']), EN)
L['voices'] = [{'id': 'sh-artur', 'name': 'Artur · slovenski glas', 'speaker': 0}]
page = os.path.join(V, 'lang', 'page-sh.json')
if os.path.exists(page): L.update(json.load(open(page, encoding='utf-8')))
open(os.path.join(V, 'lang-sh.js'), 'w', encoding='utf-8').write('/* Vukovar in Serbo-Croatian: made by tools/make-lang-sh.py from NARRATION-SCRIPT-SH.md and lang/page-sh.json. */\n'
    'window.VUKOVAR_LANG = window.VUKOVAR_LANG || {};\nwindow.VUKOVAR_LANG.sh = ' + json.dumps(L, ensure_ascii=False, indent=1) + ';\n')
# the recording list
SAY = {'Médecins Sans Frontières': 'Medsen San Frontjer', 'MSF': 'em es ef', 'JNA': 'je en a', 'ICTY': 'i ce te je', 'CIA': 'ci i a', 'ZNG': 'zet en ge', 'HOS': 'hos',
       'TO': 'te o', 'Šljivančanin': 'Šljivančanin', 'Mrkšić': 'Mrkšič'}
def say(t):
    for a, b in SAY.items(): t = re.sub(r'(?<!\w)' + re.escape(a) + r'(?!\w)', b, t)
    return t.replace('ć', 'č').replace('Ć', 'Č').replace('đ', 'dž').replace('Đ', 'Dž').replace('„', '"').replace('“', '"')
MIX = 'highpass=f=70,agate=threshold=0.035:ratio=6:attack=8:release=160:knee=2,volume=1.6,alimiter=limit=0.95'
rows = [('welcome', L['welcome'])] + [('intro-%d' % (i + 1), s['title'] + '. ' + ' '.join(s['lines'])) for i, s in enumerate(L['intro'])] \
     + [('event-%d' % (i + 1), e['text']) for i, e in enumerate(L['events'])] + [('outcome', ' '.join(L['outcome']))]
with open(os.path.join(ROOT, 'tools', 'vukovar-sh-voices-lines.tsv'), 'w', encoding='utf-8') as f:
    for name, text in rows: f.write('\t'.join(['vukovar', 'sh-artur', '0', '1.0', '-', MIX, name, say(text)]) + '\n')
print('intro', len(L['intro']), 'events', len(L['events']), 'outcome', len(L['outcome']), 'record', len(rec), 'clips', len(rows))
