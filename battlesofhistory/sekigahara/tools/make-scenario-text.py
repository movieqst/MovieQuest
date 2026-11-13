#!/usr/bin/env python3
"""Sekigahara: write the text part of scenario.js (welcome, intro, events, outcome) from NARRATION-SCRIPT.md, word for word
(the narrators recorded exactly this text), with the pictures for each slide and chapter. Captions and credits come from
images/README.md. The maps, armies and moves are in scenario.js below the marker line; that part is kept as it is.
    python3 battlesofhistory/vimy/tools/make-scenario-text.py"""
import re, json, os
HERE = os.path.dirname(os.path.abspath(__file__)); V = os.path.join(HERE, '..')
md = open(os.path.join(V, 'NARRATION-SCRIPT.md')).read()

# ---- picture captions and credits from the README tables: | file | what | licence |
CAP = {}
for line in open(os.path.join(V, 'images', 'README.md')):
    if not line.startswith('| ') or line.startswith('| file') or line.startswith('|---'): continue
    cells = [c.strip() for c in line.strip().strip('|').split('|')]
    if len(cells) < 3: continue
    for f in re.split(r',\s*', cells[0]):
        if f.endswith(('.jpg', '.png')): CAP[f] = (cells[1], cells[2])
def media(file, at=0, fit=None):
    what, lic = CAP.get(file, ('', ''))
    m = {'at': at, 'file': file, 'caption': re.sub(r'\*', '', what), 'credit': re.sub(r'\*', '', lic)}
    if fit: m['fit'] = fit
    return m

TAG = {'established': 'established', 'letter': 'letter', 'later': 'later', 'disputed': 'disputed', 'estimate': 'estimate', 'reconstruction': 'reconstruction'}
def tag_of(s):
    m = re.search(r'\*\((\w+)', s); return TAG.get(m.group(1), 'established') if m else 'established'
def clean(s):
    s = re.sub(r'\s*\*\([^)]*\)\*\s*', ' ', s); s = re.sub(r'\s+', ' ', s).strip(); return s

welcome = clean(re.search(r'## Welcome\n(.*?)\n\n', md, re.S).group(1))
intro_md = re.search(r'## Introduction\n(.*?)\n---', md, re.S).group(1)
intro = []
for blk in re.split(r'\n### \d+\. ', '\n' + intro_md.strip())[1:]:
    title, body = blk.split('\n', 1)
    lines = [l for l in re.split(r'\n- ', '\n' + body.strip()) if l.strip()]
    intro.append({'title': title.strip(), 'lines': [{'text': clean(l), 'tag': tag_of(l)} for l in lines]})

ev_md = re.search(r'## The reenactment[^\n]*\n(.*?)\n## The (?:outcome|aftermath)', md, re.S).group(1)
events = []
for blk in re.split(r'\n\d+\. ', '\n' + ev_md.strip())[1:]:
    head, body = blk.split('\n', 1)
    m = re.match(r'\*\*(.+?)\*\* · (.+)', head.strip())
    paras = [p for p in re.split(r'\n\s*\n|\*\)\n', body) if p.strip()]
    text = clean(' '.join(p.strip() for p in body.strip().split('\n')))
    tags = re.findall(r'\*\((\w+)', body)
    events.append({'title': m.group(1), 'clock': m.group(2).strip(), 'tag': 'disputed' if 'disputed' in tags else (tags[0] if tags else 'established'), 'text': text})

out_md = re.search(r'## The outcome\n(.*?)\n## The aftermath', md, re.S).group(1) + '\n' + re.search(r'## The aftermath \(debrief\)\n(.*?)\n---', md, re.S).group(1)
outcome = [{'text': clean(l), 'tag': tag_of(l)} for l in re.split(r'\n- ', '\n' + out_md.strip()) if l.strip()]

# ---- pictures for each intro slide (seconds into its narration)
IM = {0: [media('01-sekigahara-kassen-byobu-1854.jpg', 0)],
      1: [media('02-sekigahara-byobu-gifu-north-view.jpg', 0)],
      2: [media('10-map-japan-1600-alignments.png', 0, 'contain')],
      3: [media('01-sekigahara-kassen-byobu-1854.jpg', 0)],
      4: [media('02-sekigahara-byobu-gifu-north-view.jpg', 0)],
      5: [media('01-sekigahara-kassen-byobu-1854.jpg', 0)]}
for i, ms in IM.items(): intro[i]['media'] = [m for m in ms if m['caption']]
intro[0]['title'] = intro[0]['title'].upper() if intro[0]['title'].isupper() else intro[0]['title']

def js(o): return json.dumps(o, ensure_ascii=False, indent=2)
head = f"""/*
  Historical Scenario File — Battle of Sekigahara, 21 October 1600
  -----------------------------------------------------------------
  The narrated introduction (`intro`), the reenactment chapters (`events`) and the debrief (`outcome`), word for word from
  NARRATION-SCRIPT.md, which is what the narrators recorded (audio/<voice>/). This part is written by
  tools/make-scenario-text.py; the map, armies and moves are set in the block below the marker line.
  Tags: established, letter (the letters written days after the battle), later (later accounts), disputed, estimate, reconstruction.
*/
window.SEKIGAHARA_SCENARIO = window.SEKIGAHARA_SCENARIO || {{}};
Object.assign(window.SEKIGAHARA_SCENARIO, {{
  id: 'sekigahara',
  title: 'Battle of Sekigahara',
  date: '21 October 1600',
  place: 'Sekigahara, Mino Province, central Japan',
  tagline: 'The Eastern Army of Tokugawa Ieyasu vs. the Western Army',
  confidence: {{
    established:    {{ label: 'Established',    color: '#5fcf8a', desc: 'Agreed by historians.' }},
    letter:         {{ label: 'Letter of 1600', color: '#ffd27a', desc: 'From the letters written in the first days after the battle, read by modern historians. Short, and read in more than one way.' }},
    later:          {{ label: 'Later account',  color: '#b0b8c0', desc: 'From chronicles and stories written long after the battle: the famous version.' }},
    disputed:       {{ label: 'Disputed',       color: '#ff9a86', desc: 'The sources disagree, or historians do.' }},
    estimate:       {{ label: 'Estimate',       color: '#e9c77a', desc: 'An estimate, not a recorded figure.' }},
    reconstruction: {{ label: 'Reconstruction', color: '#c8a2ff', desc: 'Our own choice, to make the battle visible: where each army stood and how it moved.' }}
  }},
  sides: {{
    allied: {{ name: 'Eastern Army', short: 'East', army: 'The Eastern Army of Tokugawa Ieyasu', color: '#c0392b', light: '#ffd6d0' }},
    french: {{ name: 'Western Army', short: 'West', army: 'The Western Army, raised in the name of Toyotomi Hideyori', color: '#2e5aa8', light: '#d0dcff' }}
  }},
  welcome: {json.dumps(welcome, ensure_ascii=False)},
  intro: {js(intro)},
  events: {js(events)},
  outcome: {js(outcome)}
}});
"""
p = os.path.join(V, 'scenario.js'); old = open(p).read()
MARK = '/* ======================================================================================================================\n   Maps, armies, leaders and their moves.'
tail = old[old.index(MARK):] if MARK in old else ''
open(p, 'w').write(head + '\n' + tail)
print('intro', len(intro), 'events', len(events), 'outcome', len(outcome), 'tail kept' if tail else 'NO TAIL YET')
