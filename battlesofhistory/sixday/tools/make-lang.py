#!/usr/bin/env python3
"""Six-Day War: the Arabic and Hebrew narration for the page (writes sixday/lang-ar.js and lang-he.js, as
window.SIXDAY_LANG.ar / .he), from NARRATION-SCRIPT-AR.md and NARRATION-SCRIPT-HE.md, word for word (the voices recorded
exactly this text, tools/sixday-ar-voices-lines.tsv and sixday-he-voices-lines.tsv). The same lists in the same order as
the English scenario (../lang.js replaces the text item by item). The rest of the page's words (buttons, cards, map
labels, captions of photos) are in lang/page-ar.json and lang/page-he.json, merged in here.
    python3 battlesofhistory/sixday/tools/make-lang.py"""
import re, json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__)); V = os.path.join(HERE, '..')

def clean(s):
    s = re.sub(r'\s*\*\([^)]*\)\*\s*', ' ', s); s = s.replace('*', ''); s = re.sub(r'\s*-{3,}\s*$', '', s.strip()); return re.sub(r'\s+', ' ', s).strip()
def bullets(body): return [clean(l) for l in re.split(r'\n- ', '\n' + body.strip()) if l.strip() and not l.strip().startswith('*') and not l.strip().startswith('---')]
def strip_en(h): return re.sub(r'\s*\[[^\]]*\]\s*$', '', h).strip()

def parse(path):
    md = open(path, encoding='utf-8').read()
    secs = re.split(r'^## ', md, flags=re.M)[1:]
    out = {'intro': [], 'events': [], 'outcome': [], 'parts': []}
    for sec in secs:
        head, body = sec.split('\n', 1); en = (re.search(r'\[([^\]]*)\]\s*$', head) or [None, ''])[1]
        if en == 'Welcome': out['welcome'] = clean(body.split('\n\n')[0] if body.strip() else body)
        elif en == 'Introduction':
            for blk in re.split(r'\n### \d+\. ', '\n' + body.strip())[1:]:
                t, b = blk.split('\n', 1); out['intro'].append({'title': strip_en(t), 'lines': bullets(b)})
        elif en.startswith('Part '):
            ptitle = strip_en(head).split(':', 1)[-1].strip(); out['parts'].append(ptitle)
            for blk in re.split(r'\n### \d+\. ', '\n' + body.split('\n---')[0].strip())[1:]:
                t, b = blk.split('\n', 1); mm = re.search(r'^\*[^:*]+: (.+?) · (.+?)\*', b, re.M)
                ls = bullets(b); out['events'].append({'title': strip_en(t), 'partTitle': ptitle, 'clock': mm.group(2) if mm else '', 'lines': ls, 'text': ' '.join(ls)})
        elif en == 'Debrief':
            for s2 in re.split(r'\n### ', '\n' + body.split('\n---')[0].strip())[1:]:
                h, b = s2.split('\n', 1)
                for i, l in enumerate(bullets(b)): out['outcome'].append({'text': l, **({'heading': strip_en(h)} if i == 0 else {})})
    return out

# the English, to check the shape
sys.path.insert(0, HERE)
import subprocess
EN = json.loads(subprocess.run(['node', '-e', "global.window={};require(process.argv[1]);const S=window.SIXDAY_SCENARIO;console.log(JSON.stringify({intro:S.intro.map(s=>s.lines.length),events:S.events.map(e=>e.lines.length),outcome:S.outcome.length}))",
                               os.path.join(V, 'scenario.js')], capture_output=True, text=True).stdout)
META = {'ar': ('NARRATION-SCRIPT-AR.md', 'العربية', [{'id': 'ar-kareem', 'name': 'كريم · بالعربية', 'speaker': 0}]),
        'he': ('NARRATION-SCRIPT-HE.md', 'עברית', [{'id': 'he-noa', 'name': 'נועה · בעברית', 'speaker': 0}])}
for code, (f, name, voices) in META.items():
    L = parse(os.path.join(V, f)); bad = []
    if [len(s['lines']) for s in L['intro']] != EN['intro']: bad.append(('intro', [len(s['lines']) for s in L['intro']], EN['intro']))
    if [len(e['lines']) for e in L['events']] != EN['events']: bad.append(('events', [len(e['lines']) for e in L['events']], EN['events']))
    if len(L['outcome']) != EN['outcome']: bad.append(('outcome', len(L['outcome']), EN['outcome']))
    for b in bad: print(code, 'SHAPE DIFFERS', b)
    L.update(name=name, dir='rtl', voices=voices)
    page = os.path.join(V, 'lang', 'page-' + code + '.json')
    if os.path.exists(page): L.update(json.load(open(page, encoding='utf-8')))
    open(os.path.join(V, 'lang-' + code + '.js'), 'w', encoding='utf-8').write(
        f'/* The Six-Day War in {name}: made by tools/make-lang.py from {f} (narration) and lang/page-{code}.json (the rest of the page). */\n'
        'window.SIXDAY_LANG = window.SIXDAY_LANG || {};\nwindow.SIXDAY_LANG.' + code + ' = ' + json.dumps(L, ensure_ascii=False, indent=1) + ';\n')
    print(code, 'intro', len(L['intro']), 'events', len(L['events']), 'outcome', len(L['outcome']), 'welcome', bool(L.get('welcome')))
