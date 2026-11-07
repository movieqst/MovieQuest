#!/usr/bin/env python3
"""Fish Creek: write the text part of scenario.js (welcome, intro, events, outcome, the "From the record" pictures) from
NARRATION-SCRIPT.md, word for word (the narrators will record exactly this text), with the pictures for each slide.
Captions and credits come from images/README.md; the three 1885 prints take their captions from the script's
"From the record" section. The maps, armies and moves are in scenario.js below the marker line; that part is kept.
Made from batoche/tools/make-scenario-text.py.
    python3 battlesofhistory/fishcreek/tools/make-scenario-text.py"""
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
def media(file, at=0, fit=None, caption=None):
    what, lic = CAP.get(file, ('', ''))
    m = {'at': at, 'file': file, 'caption': caption or re.sub(r'\*', '', what), 'credit': re.sub(r'\*', '', lic)}
    if fit: m['fit'] = fit
    return m

TAGS = ('established', 'account', 'disputed', 'estimate', 'reconstruction')
def tags_in(s):
    """Every confidence tag named in the *( ... )* notes of a line, in order (e.g. '(the seventy, established, ...)')."""
    out = []
    for note in re.findall(r'\*\(([^)]*)\)\*', s):
        out += [w for w in re.findall(r'[a-z]+', note) if w in TAGS]
    return out
def tag_of(s):
    t = tags_in(s); return t[0] if t else 'established'
def clean(s):
    s = re.sub(r'\s*\*\([^)]*\)\*\s*', ' ', s); s = s.replace('*', ''); s = re.sub(r'\s+', ' ', s).strip(); return s

welcome = clean(re.search(r'## Welcome\n(.*?)\n\n', md, re.S).group(1))
intro_md = re.search(r'## Introduction\n(.*?)\n---', md, re.S).group(1)
intro = []
for blk in re.split(r'\n### \d+\. ', '\n' + intro_md.strip())[1:]:
    title, body = blk.split('\n', 1)
    lines = [l for l in re.split(r'\n- ', '\n' + body.strip()) if l.strip()]
    intro.append({'title': title.strip(), 'lines': [{'text': clean(l), 'tag': tag_of(l)} for l in lines]})

DATE = '24 April'   # the one day of the battle: the clock stamp reads "24 APRIL 1885" over the script's time of day
ev_md = re.search(r'## The reenactment[^\n]*\n(.*?)\n## The (?:outcome|aftermath)', md, re.S).group(1)
events = []
for blk in re.split(r'\n\d+\. ', '\n' + ev_md.strip())[1:]:
    head, body = blk.split('\n', 1)
    m = re.match(r'\*\*(.+?)\*\* · (.+)', head.strip())
    text = clean(' '.join(p.strip() for p in body.strip().split('\n')))
    tags = tags_in(body)
    events.append({'title': m.group(1), 'clock': m.group(2).strip() + ', ' + DATE,
                   'tag': 'disputed' if 'disputed' in tags else (tags[0] if tags else 'established'), 'text': text})

out_md = re.search(r'## The outcome\n(.*?)\n## The aftermath', md, re.S).group(1) + '\n' + re.search(r'## The aftermath \(debrief\)\n(.*?)\n---', md, re.S).group(1)
outcome = [{'text': clean(l), 'tag': tag_of(l)} for l in re.split(r'\n- ', '\n' + out_md.strip()) if l.strip()]

# ---- "From the record": the three 1885 prints, their captions as the script gives them
rec_md = re.search(r'## "From the record"[^\n]*\n(.*?)\n## Notes for review', md, re.S).group(1)
record = {}
for blk in re.split(r'\n### ', '\n' + rec_md.strip())[1:]:
    f = re.search(r'\*\*Picture:\*\* images/(\S+?),', blk).group(1)
    cap = re.search(r'\*\*Caption:\*\*\n(.*?)\n\n', blk + '\n\n', re.S).group(1)
    paras = [clean(p.replace('\n>', ' ').lstrip('> ')) for p in re.split(r'\n>\s*\n', cap)]
    record[f] = media(f, 0, None, ' '.join(p for p in paras if p))

# ---- pictures for each intro slide (seconds into its narration)
IM = {0: [record['cover.jpg']],
      1: [media('metis-flag.png', 0, 'contain'), media('michif-chart.png', 14, 'contain'), media('riel-1884-bennetto.jpg', 30, 'contain')],
      2: [media('middleton-1885-topley.jpg', 0, 'contain')],
      3: [media('dumont-1885-buckskin.jpg', 0, 'contain')],
      4: [],
      5: [media('rml-9-pounder-gun.jpg', 0)]}
for i, ms in IM.items(): intro[i]['media'] = [m for m in ms if m['caption']]

def js(o): return json.dumps(o, ensure_ascii=False, indent=2)
head = f"""/*
  Historical Scenario File — Battle of Fish Creek (Tourond's Coulee), 24 April 1885
  -----------------------------------------------------------------
  The narrated introduction (`intro`), the reenactment chapters (`events`), the debrief (`outcome`) and the captions of the
  "From the record" prints (`record`), word for word from NARRATION-SCRIPT.md (draft 2), which is what the narrators will
  record (audio/<voice>/). This part is written by tools/make-scenario-text.py; the map, armies and moves are set in the
  block below the marker line.
  Tags: established, account (one witness or historian), disputed, estimate, reconstruction.
*/
window.FISHCREEK_SCENARIO = window.FISHCREEK_SCENARIO || {{}};
Object.assign(window.FISHCREEK_SCENARIO, {{
  id: 'fishcreek',
  title: 'Battle of Fish Creek',
  date: '24 April 1885',
  place: 'Fish Creek (Tourond’s Coulee), beside the South Saskatchewan River (today in Saskatchewan, Canada)',
  tagline: 'The North-West Field Force vs. the Métis, Dakota and Cree fighters of Gabriel Dumont',
  confidence: {{
    established:    {{ label: 'Established',    color: '#5fcf8a', desc: 'Agreed by historians.' }},
    account:        {{ label: 'Account',        color: '#ffd27a', desc: 'One witness or one historian, named where it matters; not confirmed by other sources.' }},
    disputed:       {{ label: 'Disputed',       color: '#ff9a86', desc: 'The sources disagree, or historians do.' }},
    estimate:       {{ label: 'Estimate',       color: '#e9c77a', desc: 'An estimate, not a recorded figure.' }},
    reconstruction: {{ label: 'Reconstruction', color: '#c8a2ff', desc: 'Our own choice, to make the battle visible: where each army stood and how it moved.' }}
  }},
  sides: {{
    allied: {{ name: 'North-West Field Force', short: 'Field Force', army: 'The North-West Field Force of Major-General Frederick Middleton', color: '#c0392b', light: '#ffd6d0' }},
    french: {{ name: 'Métis, Dakota and Cree fighters', short: 'Defenders', army: 'The Métis, Dakota and Cree fighters of Gabriel Dumont', color: '#2e5aa8', light: '#d0dcff' }}
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
