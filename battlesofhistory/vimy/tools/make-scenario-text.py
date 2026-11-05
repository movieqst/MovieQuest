#!/usr/bin/env python3
"""Vimy Ridge: write the text part of scenario.js (welcome, intro, events, outcome) from NARRATION-SCRIPT.md, word for word
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

TAG = {'established': 'established', 'account': 'account', 'disputed': 'disputed', 'estimate': 'estimate', 'reconstruction': 'reconstruction'}
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

ev_md = re.search(r'## The reenactment[^\n]*\n(.*?)\n## The aftermath', md, re.S).group(1)
events = []
for blk in re.split(r'\n\d+\. ', '\n' + ev_md.strip())[1:]:
    head, body = blk.split('\n', 1)
    m = re.match(r'\*\*(.+?)\*\* · (.+)', head.strip())
    paras = [p for p in re.split(r'\n\s*\n|\*\)\n', body) if p.strip()]
    text = clean(' '.join(p.strip() for p in body.strip().split('\n')))
    tags = re.findall(r'\*\((\w+)', body)
    events.append({'title': m.group(1), 'clock': m.group(2).strip(), 'tag': 'disputed' if 'disputed' in tags else (tags[0] if tags else 'established'), 'text': text})

out_md = re.search(r'## The aftermath \(debrief\)\n(.*?)\n---', md, re.S).group(1)
outcome = [{'text': clean(l), 'tag': tag_of(l)} for l in re.split(r'\n- ', '\n' + out_md.strip()) if l.strip()]

# ---- pictures for each intro slide (seconds into its narration)
IM = {0: [media('cover.jpg', 0), media('35-29th-battalion-advancing-over-no-mans-land.jpg', 12)],
      1: [media('22-vimy-from-the-ridge-1917.jpg', 0), media('29-trenches-from-kite-balloon-nov-1917.jpg', 14)],
      2: [media('21-byng-april-1917.jpg', 0), media('09-pack-horses-ammunition.jpg', 16)],   # 13-16: licences still to confirm, not used
      3: [media('30-loading-a-large-naval-gun.jpg', 0), media('32-6-inch-gun-firing-april-1917.jpg', 9), media('18-18-pounder-shrapnel-shell-cutaway.jpg', 22)],
      4: [media('28-mine-exploding-on-vimy-ridge.jpg', 0), media('31-memorial-and-cratered-ground-2009.jpg', 18)],
      5: [media('07-battered-german-trench.jpg', 0), media('01-machine-gun-crews.jpg', 16)]}
for i, ms in IM.items(): intro[i]['media'] = [m for m in ms if m['caption']]
# the intro slides show the trench layers as the story of the ridge goes on
TR = {0: 'battle-trenches-1917-03.png', 1: 'battle-trenches-1916-02.png', 2: 'battle-trenches-1917-03.png', 3: 'battle-trenches-1917-03.png', 4: 'battle-trenches-1916-10.png', 5: 'battle-trenches-1917-03.png'}
for i, n in TR.items(): intro[i]['trenches'] = n
intro[0]['title'] = intro[0]['title'].upper() if intro[0]['title'].isupper() else intro[0]['title']

def js(o): return json.dumps(o, ensure_ascii=False, indent=2)
head = f"""/*
  Historical Scenario File — Battle of Vimy Ridge, 9–12 April 1917
  ------------------------------------------------------------------
  The narrated introduction (`intro`), the reenactment chapters (`events`) and the debrief (`outcome`), word for word from
  NARRATION-SCRIPT.md, which is what the narrators recorded (audio/<voice>/). This part is written by
  tools/make-scenario-text.py; the maps, armies and moves are set in the block below the marker line.
  Tags: established, account (one participant or witness), disputed, estimate, reconstruction.
*/
window.VIMY_SCENARIO = window.VIMY_SCENARIO || {{}};
Object.assign(window.VIMY_SCENARIO, {{
  id: 'vimy',
  title: 'Battle of Vimy Ridge',
  date: '9–12 April 1917',
  place: 'Vimy Ridge, near Arras, northern France',
  tagline: 'The Canadian Corps vs. the German Sixth Army',
  confidence: {{
    established:    {{ label: 'Established',    color: '#5fcf8a', desc: 'In the official history (Nicholson, 1962) and agreed by modern historians.' }},
    account:        {{ label: 'One account',    color: '#ffd27a', desc: 'From one participant or witness, such as a Victoria Cross citation or a man’s own report.' }},
    disputed:       {{ label: 'Disputed',       color: '#ff9a86', desc: 'The sources disagree, or historians do.' }},
    estimate:       {{ label: 'Estimate',       color: '#e9c77a', desc: 'An estimate, not an exact figure.' }},
    reconstruction: {{ label: 'Reconstruction', color: '#c8a2ff', desc: 'Our own choice, to make the battle visible: where each unit stood and how it moved.' }}
  }},
  sides: {{
    allied: {{ name: 'Canadian Corps', short: 'Canadians', army: 'The Canadian Corps under Lieutenant-General Sir Julian Byng', color: '#c0392b', light: '#ffd6d0' }},
    french: {{ name: 'German Sixth Army', short: 'Germans', army: 'The German Sixth Army (Group Vimy) under General von Falkenhausen', color: '#2e5aa8', light: '#d0dcff' }}
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
