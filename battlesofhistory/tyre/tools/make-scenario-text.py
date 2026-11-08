#!/usr/bin/env python3
"""Siege of Tyre: write the text part of scenario.js (welcome, intro, events, outcome, the "From the record" pictures) from
NARRATION-SCRIPT.md, word for word (the narrators recorded exactly this text), with the pictures for each slide.
Captions and credits come from images/README.md, or from the script's "From the record" section where it gives one.
The maps, armies and moves are in scenario.js below the marker line; that part is kept.
Made from fishcreek/tools/make-scenario-text.py.
    python3 battlesofhistory/tyre/tools/make-scenario-text.py"""
import re, json, os
HERE = os.path.dirname(os.path.abspath(__file__)); V = os.path.join(HERE, '..')
md = open(os.path.join(V, 'NARRATION-SCRIPT.md')).read()

CAP = {}
for line in open(os.path.join(V, 'images', 'README.md')):
    if not line.startswith('| ') or line.startswith('| file') or line.startswith('|---'): continue
    cells = [c.strip() for c in line.strip().strip('|').split('|')]
    if len(cells) < 3: continue
    for f in re.split(r',\s*', cells[0]):
        if f.endswith(('.jpg', '.png')): CAP[f] = (cells[1], cells[2])
def media(file, at=0, fit=None, caption=None, credit=None):
    what, lic = CAP.get(file, ('', ''))
    m = {'at': at, 'file': file, 'caption': caption or re.sub(r'\*', '', what), 'credit': credit or re.sub(r'\*', '', lic)}
    if fit: m['fit'] = fit
    return m

# Tags: the confidence words, and the four ancient writers (a writer's name: "the account we are following")
TAGS = ('established', 'disputed', 'estimate', 'reconstruction', 'arrian', 'diodorus', 'curtius', 'plutarch', 'geology')
def tags_in(s):
    out = []
    for note in re.findall(r'\*\(([^)]*)\)\*', s):
        out += [w for w in re.findall(r'[a-z]+', note.lower()) if w in TAGS]
    return out
def tag_of(s):
    t = tags_in(s)
    if 'disputed' in t: return 'disputed'
    return t[0] if t else 'established'
def clean(s):
    s = re.sub(r'\s*\*\([^)]*\)\*\s*', ' ', s); s = s.replace('*', ''); s = re.sub(r'\s+', ' ', s).strip(); return s

welcome = clean(re.search(r'## Welcome\n(.*?)\n\n', md, re.S).group(1))
intro_md = re.search(r'## Introduction\n(.*?)\n---', md, re.S).group(1)
intro = []
for blk in re.split(r'\n### \d+\. ', '\n' + intro_md.strip())[1:]:
    title, body = blk.split('\n', 1)
    lines = [l for l in re.split(r'\n- ', '\n' + body.strip()) if l.strip()]
    intro.append({'title': title.strip(), 'lines': [{'text': clean(l), 'tag': tag_of(l)} for l in lines]})

ev_md = re.search(r'## The reenactment[^\n]*\n.*?\n\n(1\. .*?)\n## The outcome', md, re.S).group(1)
events = []
for blk in re.split(r'\n\d+\. ', '\n' + ev_md.strip())[1:]:
    head, body = blk.split('\n', 1)
    m = re.match(r'\*\*(.+?)\*\* · (.+)', head.strip())
    text = clean(' '.join(p.strip() for p in body.strip().split('\n')))
    last = re.findall(r'\*\([^)]*\)\*', body)   # the chapter's tag: from its closing note (a mid-line note marks one number only)
    events.append({'title': m.group(1), 'clock': (m.group(2).strip() if re.search(r'\b\d{3}\b', m.group(2)) else '332 BCE · ' + m.group(2).strip()), 'tag': tag_of(last[-1]) if last else 'established', 'text': text})

out_md = re.search(r'## The outcome\n(.*?)\n## The aftermath', md, re.S).group(1) + '\n' + re.search(r'## The aftermath \(debrief\)\n(.*?)\n---', md, re.S).group(1)
outcome = [{'text': clean(l), 'tag': tag_of(l)} for l in re.split(r'\n- ', '\n' + out_md.strip()) if l.strip()]

# ---- "From the record": the pictures whose captions the script writes (only those already downloaded)
rec_md = re.search(r'## "From the record"[^\n]*\n(.*?)\n## Notes for review', md, re.S).group(1)
record = {}
for blk in re.split(r'\n### ', '\n' + rec_md.strip())[1:]:
    m = re.search(r'\*\*Picture:\*\* images/(\S+?),', blk)
    if not m or not os.path.exists(os.path.join(V, 'images', m.group(1))): continue
    f = m.group(1)
    cap = re.search(r'\*\*Caption:\*\*\n(.*?)\n\n', blk + '\n\n', re.S).group(1)
    paras = [clean(p.replace('\n>', ' ').lstrip('> ')) for p in re.split(r'\n>\s*\n', cap)]
    cr = re.search(r'\*\*Credit:\*\* (.+)', blk)
    record[f] = media(f, 0, None, ' '.join(p for p in paras if p), cr.group(1).strip() if cr else None)
COVER = media('cover.jpg', 0, None, 'An artist’s impression of the siege, made for this page (AI-generated): Alexander points toward the island city while his men build the mole. Not evidence: the walls look medieval, and Arrian describes a mole of stones and earth, not a timber trestle.')

# ---- pictures for each intro slide (seconds into its narration)
IM = {0: [COVER, dict(record.get('record-tyre-south-side-2021.jpg', {}), at=16)],
      1: [media('art-envoys.jpg', 26, None, 'Envoys from Tyre, among them the king’s son, meet Alexander on the road and promise to do whatever he commands (Arrian). An artist’s impression made for this page, not evidence: the faces and the city in the distance are imagined.')], 2: [dict(record.get('record-tyre-heritage-panorama-2024.jpg', {}), at=0)], 3: [], 4: [], 5: []}
for i, ms in IM.items(): intro[i]['media'] = [m for m in ms if m.get('file') and os.path.exists(os.path.join(V, 'images', m['file']))]

def js(o): return json.dumps(o, ensure_ascii=False, indent=2)
head = f"""/*
  Historical Scenario File — Siege of Tyre, 332 BCE
  -----------------------------------------------------------------
  The narrated introduction (`intro`), the reenactment chapters (`events`), the debrief (`outcome`) and the captions of the
  "From the record" pictures (`record`), word for word from NARRATION-SCRIPT.md (draft 2), which is what the narrators
  recorded (audio/<voice>/). This part is written by tools/make-scenario-text.py; the map, armies and moves are set in the
  block below the marker line.
  Tags: established, disputed, estimate, reconstruction; a writer's name (Arrian, Diodorus, Curtius, Plutarch) marks whose
  account the line follows; geology marks the modern study of the coast (Brocard et al. 2024).
*/
window.TYRE_SCENARIO = window.TYRE_SCENARIO || {{}};
Object.assign(window.TYRE_SCENARIO, {{
  id: 'tyre',
  title: 'Siege of Tyre',
  date: '332 BCE',
  place: 'Tyre, an island city off the coast of Phoenicia (today Sour, in southern Lebanon)',
  tagline: 'Alexander of Macedon vs. the island city of Tyre',
  confidence: {{
    established:    {{ label: 'Established',    color: '#5fcf8a', desc: 'The ancient writers agree, or it is secure modern knowledge.' }},
    arrian:         {{ label: 'Arrian',         color: '#ffd27a', desc: 'From Arrian, Anabasis, Book II (2nd century CE): the account this page follows for the order of events.' }},
    diodorus:       {{ label: 'Diodorus',       color: '#f0b46a', desc: 'From Diodorus of Sicily, Library, Book XVII (1st century BCE).' }},
    curtius:        {{ label: 'Curtius',        color: '#e6a0c8', desc: 'From Quintus Curtius Rufus, History of Alexander, Book IV (probably 1st century CE).' }},
    plutarch:       {{ label: 'Plutarch',       color: '#9fd0ff', desc: 'From Plutarch, Life of Alexander, 24–25 (around 100 CE).' }},
    geology:        {{ label: 'Geology',        color: '#7fd6c8', desc: 'From the modern study of Tyre’s coastline (Brocard et al., Quaternary Science Reviews, 2024).' }},
    disputed:       {{ label: 'Disputed',       color: '#ff9a86', desc: 'The ancient writers disagree, or the story is doubtful.' }},
    estimate:       {{ label: 'Estimate',       color: '#e9c77a', desc: 'A rounded or converted number (stades into metres, for example).' }},
    reconstruction: {{ label: 'Reconstruction', color: '#c8a2ff', desc: 'Our own placing of something no source pins down: where each ship and soldier stood, and the exact line of walls and harbours.' }}
  }},
  sides: {{
    allied: {{ name: 'Alexander’s army and fleet', short: 'Macedonians', army: 'Alexander of Macedon, with his army and the fleets of the cities that joined him', color: '#c0392b', light: '#ffd6d0' }},
    french: {{ name: 'The city of Tyre', short: 'Tyrians', army: 'The Phoenician island city of Tyre, its walls and its fleet', color: '#2e5aa8', light: '#d0dcff' }}
  }},
  welcome: {json.dumps(welcome, ensure_ascii=False)},
  intro: {js(intro)},
  events: {js(events)},
  outcome: {js(outcome)},
  record: {js(record)}
}});
"""
p = os.path.join(V, 'scenario.js'); old = open(p).read() if os.path.exists(p) else ''
MARK = '/* ======================================================================================================================\n   Maps, armies, leaders and their moves.'
tail = old[old.index(MARK):] if MARK in old else ''
open(p, 'w').write(head + '\n' + tail)
print('intro', len(intro), 'events', len(events), 'outcome', len(outcome), 'record', len(record), 'tail kept' if tail else 'NO TAIL YET')
