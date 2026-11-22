#!/usr/bin/env python3
"""Operation Midnight Hammer: write the text part of scenario.js (welcome, intro, events, outcome) from NARRATION-SCRIPT.md, word
for word (the narrators record exactly this text). The maps, armies and moves are in scenario.js below the marker line;
that part is kept. Made from bunkerhill/tools/make-scenario-text.py. The trailing check numbers (C1, [5]) are dropped.
    python3 battlesofhistory/midnight-hammer/tools/make-scenario-text.py
Each line keeps its tags (the word before any colon: "court: conviction" becomes the tag "court"; the spoken words already
say which outcome). Each chapter keeps its script map line ("*Map: Battle · 3 October 1993, late afternoon*"): the part
after the dot is the chapter's clock; the map name is mapped to one of the five painted maps in scenario.js."""
import re, json, os
HERE = os.path.dirname(os.path.abspath(__file__)); V = os.path.join(HERE, '..')
md = open(os.path.join(V, 'NARRATION-SCRIPT.md'), encoding='utf-8').read().split('\n## Final check')[0]
SCN = os.path.join(V, 'scenario.js')
TAGS = ('established', 'page', 'us-official', 'iran-official', 'iaea', 'qatar-official', 'us-intelligence', 'press', 'disputed', 'unknown', 'reconstruction')

def tag_list(s):
    out = []
    for note in re.findall(r'\*\(([^)]*)\)\*', s):
        for part in note.split(';'):
            w = part.strip().lower().split(':')[0].strip()
            if w not in TAGS: raise SystemExit('unknown tag: ' + part + ' in: ' + s[:80])
            if w not in out: out.append(w)
    return out
def clean(s):
    s = re.sub(r'\s*\*\([^)]*\)\*\s*', ' ', s); s = s.replace('*', ''); s = s.strip()
    while True:
        t = re.sub(r'[\s,;]*(?:C\d+(?:[–-]C?\d+)?|\[\d+\](?:[–-]\[\d+\])?)\s*$', '', s)
        if t == s: break
        s = t
    s = re.sub(r'\s*-{3,}\s*$', '', s.strip()); return re.sub(r'\s+', ' ', s).strip()
def line(l):
    t = tag_list(l) or ['established']
    return {'text': clean(l), 'tag': t if len(t) > 1 else t[0]}
def bullets(body): return [l for l in re.split(r'\n- ', '\n' + body.strip()) if l.strip() and not l.strip().startswith('*Map')]

welcome = clean(re.search(r'## Welcome\n(.*?)\n\n', md, re.S).group(1))
intro_md = re.search(r'## Introduction\n(.*?)\n## Part 1', md, re.S).group(1)
intro = []
for blk in re.split(r'\n### I\d+\. ', '\n' + intro_md.strip())[1:]:
    title, body = blk.split('\n', 1)
    mm = re.search(r'^\*Map: (.+?) · (.+?)\*', body, re.M)
    intro.append({'title': title.strip(), 'scriptMap': mm.group(1) if mm else '', 'lines': [line(l) for l in bullets(body)]})

events = []
for pm in re.finditer(r'^## Part (\d+): (.+?)$(.*?)(?=^## |\Z)', md, re.M | re.S):
    part, ptitle = int(pm.group(1)), pm.group(2).strip()
    for blk in re.split(r'\n### \d+\. ', '\n' + pm.group(3).strip())[1:]:
        title, body = blk.split('\n', 1)
        mm = re.search(r'^\*Map: (.+?) · (.+?)\*', body, re.M)
        ls = [line(l) for l in bullets(body)]
        tags = []
        for l in ls:
            for t in (l['tag'] if isinstance(l['tag'], list) else [l['tag']]):
                if t not in tags: tags.append(t)
        events.append({'part': part, 'partTitle': ptitle, 'title': title.strip(), 'scriptMap': mm.group(1) if mm else '', 'clock': mm.group(2) if mm else '',
                       'tag': tags if len(tags) > 1 else tags[0], 'lines': ls, 'text': ' '.join(l['text'] for l in ls)})

deb = re.search(r'## Debrief\n(.*?)(?=\n---|\Z)', md, re.S).group(1)
outcome = []
for sec in re.split(r'\n### ', '\n' + deb.strip())[1:]:
    head, body = sec.split('\n', 1)
    for i, l in enumerate(bullets(body)): outcome.append(dict(line(l), **({'heading': head.strip()} if i == 0 else {})))

def js(o): return json.dumps(o, ensure_ascii=False, indent=2)
head = """/*
  Historical Scenario File — Operation Midnight Hammer, 21–22 June 2025
  -----------------------------------------------------------------
  The narrated introduction (`intro`), the chapters (`events`) and the debrief (`outcome`), word for word from
  NARRATION-SCRIPT.md. This part is written by tools/make-scenario-text.py; the maps, armies and moves are set in
  the block below the marker line.
*/
window.MIDNIGHTHAMMER_SCENARIO = window.MIDNIGHTHAMMER_SCENARIO || {};
Object.assign(window.MIDNIGHTHAMMER_SCENARIO, """
text = head + js({'id': 'midnight-hammer', 'title': 'Operation Midnight Hammer', 'date': '21–22 June 2025',
                  'place': 'Fordow, Natanz and Isfahan, Iran',
                  'tagline': 'United States air and missile strikes on three Iranian nuclear sites, during the war between Israel and Iran',
                  'welcome': welcome, 'intro': intro, 'events': events, 'outcome': outcome}) + ');\n'
MARK = '/* ======== maps, armies and moves (kept by make-scenario-text.py) ======== */'
rest = open(SCN, encoding='utf-8').read().split(MARK, 1)[1] if os.path.exists(SCN) and MARK in open(SCN, encoding='utf-8').read() else '\n'
open(SCN, 'w', encoding='utf-8').write(text + '\n' + MARK + rest)
print('welcome; intro', len(intro), 'slides; events', len(events), 'chapters; outcome', len(outcome), 'lines')
