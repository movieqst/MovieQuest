#!/usr/bin/env python3
"""Batoche: write the text part of scenario.js (welcome, intro, events, outcome) from NARRATION-SCRIPT.md, word for word
(the narrators recorded exactly this text), with the pictures for each slide and chapter. Captions and credits come from
images/README.md. The maps, armies and moves are in scenario.js below the marker line; that part is kept as it is.
    python3 battlesofhistory/batoche/tools/make-scenario-text.py"""
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
    s = re.sub(r'\s*\*\([^)]*\)\*\s*', ' ', s); s = s.replace('*', ''); s = re.sub(r'\s+', ' ', s).strip(); return s

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
FLAG = ('The Métis flag: a white infinity sign on a blue field. An account from 1815 describes a red flag with a horizontal figure eight, and Peter Fiddler recorded a blue one carried by Métis under Cuthbert Grant in 1816. '
        'It is a central symbol of the Métis Nation today. No source shows it flying at Batoche in 1885, so it is shown here as history, not on the battlefield.')
CREE = ('nēhiyawēwin, the Cree language. Cree is an Algonquian language spoken from the Rocky Mountains to Labrador; around Batoche people spoke Plains Cree, '
        'and Michif, the Métis language, joins Cree verbs to French nouns. For centuries Cree lived by the spoken word: stories, prayers, law and history were told and remembered, '
        'alongside pictographs painted on rock. In 1840 and 1841 at Norway House, the missionary James Evans, working with Cree and Ojibwe helpers, printed the first books in syllabics; '
        'Cree tradition credits a man named Calling Badger. Each shape stands for a consonant, and turning it changes the vowel. The script spread quickly, and by 1885 many Cree could read and write it. '
        'Today Cree is spoken by more people than any other Indigenous language in Canada. The Saskatchewan River takes its name from the Cree kisiskāciwani-sīpiy, "the swift-flowing river".')
MICHIF = ('Michif, the language of the Métis. It is one of the world’s rare mixed languages: most nouns, with their articles, come from French, and most verbs come from Plains Cree, '
          'with the Cree endings that show who acts and when. It grew in the fur-trade families of the 1700s and 1800s and was spoken at Red River and at Batoche, alongside French, Cree and English. '
          'Like Cree it was passed on mainly by speaking. Today only a few thousand people speak it (1,845 reported in the 2021 census), and Métis communities are working to keep it alive. '
          'The linguist Peter Bakker described how it was formed in A Language of Our Own (1997).')
IM = {0: [media('cover.jpg', 0), media('capture-of-batoche-curzon.jpg', 14)],
      1: [media('batoche-village-1885.jpg', 0), dict(media('metis-flag.png', 12, 'contain'), caption=FLAG), dict(media('michif-chart.png', 24, 'contain'), caption=MICHIF), media('batoche-rectory-church-2017.jpg', 36)],
      2: [media('st-laurent-mission-1891.jpg', 0), dict(media('cree-syllabics-chart.png', 10, 'contain'), caption=CREE), media('riel-1884-bennetto.jpg', 26)],
      3: [media('dumont-1885-buckskin.jpg', 0, 'contain'), media('riel-c1880-lac.jpg', 18, 'contain'), media('middleton-1885-topley.jpg', 34, 'contain')],
      4: [media('heroes-of-batoche-belleville.jpg', 0)],
      5: [media('rml-9-pounder-gun.jpg', 0), media('howard-gatling-1885.jpg', 14, 'contain'), media('battlefield-sketch-1885.jpg', 28, 'contain')]}
for i, ms in IM.items(): intro[i]['media'] = [m for m in ms if m['caption']]

def js(o): return json.dumps(o, ensure_ascii=False, indent=2)
head = f"""/*
  Historical Scenario File — Battle of Batoche, 9–12 May 1885
  -----------------------------------------------------------------
  The narrated introduction (`intro`), the reenactment chapters (`events`) and the debrief (`outcome`), word for word from
  NARRATION-SCRIPT.md, which is what the narrators recorded (audio/<voice>/). This part is written by
  tools/make-scenario-text.py; the map, armies and moves are set in the block below the marker line.
  Tags: established, account (one witness or historian), disputed, estimate, reconstruction.
*/
window.BATOCHE_SCENARIO = window.BATOCHE_SCENARIO || {{}};
Object.assign(window.BATOCHE_SCENARIO, {{
  id: 'batoche',
  title: 'Battle of Batoche',
  date: '9–12 May 1885',
  place: 'Batoche, on the South Saskatchewan River (today in Saskatchewan, Canada)',
  tagline: 'The North-West Field Force vs. the Métis and First Nations fighters',
  confidence: {{
    established:    {{ label: 'Established',    color: '#5fcf8a', desc: 'Agreed by historians.' }},
    account:        {{ label: 'Account',        color: '#ffd27a', desc: 'One witness or one historian, named where it matters; not confirmed by other sources.' }},
    disputed:       {{ label: 'Disputed',       color: '#ff9a86', desc: 'The sources disagree, or historians do.' }},
    estimate:       {{ label: 'Estimate',       color: '#e9c77a', desc: 'An estimate, not a recorded figure.' }},
    reconstruction: {{ label: 'Reconstruction', color: '#c8a2ff', desc: 'Our own choice, to make the battle visible: where each army stood and how it moved.' }}
  }},
  sides: {{
    allied: {{ name: 'North-West Field Force', short: 'Field Force', army: 'The North-West Field Force of Major-General Frederick Middleton', color: '#c0392b', light: '#ffd6d0' }},
    french: {{ name: 'Métis and First Nations fighters', short: 'Defenders', army: 'The Métis, Cree and Dakota fighters of Louis Riel and Gabriel Dumont', color: '#2e5aa8', light: '#d0dcff' }}
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
