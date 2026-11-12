#!/usr/bin/env python3
"""Six-Day War: write the text part of scenario.js (welcome, intro, events, outcome) from NARRATION-SCRIPT.md, word for word
(the narrators recorded exactly this text). The maps, armies and moves are in scenario.js below the marker line; that part
is kept. Made from vukovar/tools/make-scenario-text.py.
    python3 battlesofhistory/sixday/tools/make-scenario-text.py
Each line keeps its tags (established, israeli, arab, disputed, estimate, reconstruction); "arab: Egyptian" becomes the tag
"arab" plus the note "Egyptian", shown on the line. Each chapter keeps its script map line ("*Map: Region · 13 to 15 May*"):
the part after the dot is the chapter's clock; the map name is mapped to one of the five painted maps in scenario.js."""
import re, json, os
HERE = os.path.dirname(os.path.abspath(__file__)); V = os.path.join(HERE, '..')
md = open(os.path.join(V, 'NARRATION-SCRIPT.md'), encoding='utf-8').read().split('\n## Notes')[0]
SCN = os.path.join(V, 'scenario.js')

def tag_list(s):
    out = []
    for note in re.findall(r'\*\(([^)]*)\)\*', s):
        for part in note.split(';'):
            w = part.strip(); lw = w.lower()
            t = ('arab' if lw.startswith('arab') else 'israeli' if lw.startswith('israeli') else
                 next((k for k in ('established', 'disputed', 'estimate', 'reconstruction') if lw.startswith(k)), None))
            if t and t not in [x[0] for x in out]: out.append((t, w.split(':', 1)[1].strip() if t == 'arab' and ':' in w else ''))
    return out
def clean(s):
    s = re.sub(r'\s*\*\([^)]*\)\*\s*', ' ', s); s = s.replace('*', ''); return re.sub(r'\s+', ' ', s).strip()
def line(l):
    t = tag_list(l); o = {'text': clean(l), 'tag': t[0][0] if t else 'established'}
    if t and t[0][1]: o['who'] = t[0][1]
    return o
def bullets(body): return [l for l in re.split(r'\n- ', '\n' + body.strip()) if l.strip() and not l.strip().startswith('*Map')]

welcome = clean(re.search(r'## Welcome\n(.*?)\n\n', md, re.S).group(1))
intro_md = re.search(r'## Introduction\n(.*?)\n---', md, re.S).group(1)
intro = []
for blk in re.split(r'\n### \d+\. ', '\n' + intro_md.strip())[1:]:
    title, body = blk.split('\n', 1)
    intro.append({'title': title.strip(), 'lines': [line(l) for l in bullets(body)]})

events = []
for pm in re.finditer(r'^## Part (\d+): (.+?)$(.*?)(?=^## |\Z)', md, re.M | re.S):
    part, ptitle = int(pm.group(1)), pm.group(2).strip()
    for blk in re.split(r'\n### \d+\. ', '\n' + pm.group(3).strip())[1:]:
        title, body = blk.split('\n', 1)
        mm = re.search(r'^\*Map: (.+?) · (.+?)\*', body, re.M)
        ls = [line(l) for l in bullets(body)]
        tags = []
        for l in ls:
            if l['tag'] not in tags: tags.append(l['tag'])
        events.append({'part': part, 'partTitle': ptitle, 'title': title.strip(), 'scriptMap': mm.group(1) if mm else '', 'clock': mm.group(2) if mm else '',
                       'tag': tags if len(tags) > 1 else tags[0], 'lines': ls, 'text': ' '.join(l['text'] for l in ls)})

deb = re.search(r'## Debrief\n(.*?)(?=\n---|\Z)', md, re.S).group(1)
outcome = []
for sec in re.split(r'\n### ', '\n' + deb.strip())[1:]:
    head, body = sec.split('\n', 1)
    for i, l in enumerate(bullets(body)): outcome.append(dict(line(l), **({'heading': head.strip()} if i == 0 else {})))

def js(o): return json.dumps(o, ensure_ascii=False, indent=2)
head = """/*
  Historical Scenario File — the Six-Day War, 5–10 June 1967
  -----------------------------------------------------------------
  The narrated introduction (`intro`), the chapters (`events`) and the debrief (`outcome`), word for word from
  NARRATION-SCRIPT.md (draft 3, final). This part is written by tools/make-scenario-text.py; the maps, armies and moves are
  set in the block below the marker line.
*/
window.SIXDAY_SCENARIO = window.SIXDAY_SCENARIO || {};
Object.assign(window.SIXDAY_SCENARIO, """
text = head + js({'id': 'sixday', 'title': 'The Six-Day War', 'date': '5–10 June 1967',
                  'place': 'Egypt, Israel, Jordan and Syria: Sinai, Gaza, Jerusalem, the West Bank and the Golan Heights',
                  'tagline': 'Israel against Egypt, Jordan and Syria, with Iraqi forces also taking part',
                  'welcome': welcome, 'intro': intro, 'events': events, 'outcome': outcome}) + ');\n'
MARK = '/* ======== maps, armies and moves (kept by make-scenario-text.py) ======== */'
rest = open(SCN, encoding='utf-8').read().split(MARK, 1)[1] if os.path.exists(SCN) and MARK in open(SCN, encoding='utf-8').read() else '\n'
open(SCN, 'w', encoding='utf-8').write(text + '\n' + MARK + rest)
print('welcome; intro', len(intro), 'slides; events', len(events), 'chapters; outcome', len(outcome), 'lines')
