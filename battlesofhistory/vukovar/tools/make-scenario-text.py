#!/usr/bin/env python3
"""Vukovar 1991: write the text part of scenario.js (welcome, intro, events, outcome, the "From the record" pictures) from
NARRATION-SCRIPT.md, word for word (the narrators record exactly this text). The maps, armies and moves are in
scenario.js below the marker line; that part is kept. Made from tyre/tools/make-scenario-text.py.
    python3 battlesofhistory/vukovar/tools/make-scenario-text.py
Tags: each line keeps every tag its note gives, in order (established, ICTY finding, Croatian account, Serbian account,
disputed, estimate, reconstruction). A note such as "disputed for the number" keeps "disputed": the page shows a tag per
line, and the narration itself says which part is disputed."""
import re, json, os
HERE = os.path.dirname(os.path.abspath(__file__)); V = os.path.join(HERE, '..')
md = open(os.path.join(V, 'NARRATION-SCRIPT.md')).read()

def tags_in(s):
    out = []
    for note in re.findall(r'\*\(([^)]*)\)\*', s):
        for part in note.split(';'):
            w = part.strip().lower()
            t = ('icty' if w.startswith('icty') else 'croatian' if w.startswith('croatian account') else 'serbian' if w.startswith('serbian account')
                 else next((k for k in ('established', 'disputed', 'estimate', 'reconstruction') if w.startswith(k)), None))
            if t and t not in out: out.append(t)
    return out
def tags_of(s):
    t = tags_in(s)
    return t if len(t) > 1 else (t[0] if t else 'established')
def clean(s):
    s = re.sub(r'\s*\*\([^)]*\)\*\s*', ' ', s); s = s.replace('*', ''); s = re.sub(r'\s+', ' ', s).strip(); return s

welcome = clean(re.search(r'## Welcome\n(.*?)\n\n', md, re.S).group(1))
intro_md = re.search(r'## Introduction\n(.*?)\n---', md, re.S).group(1)
intro = []
for blk in re.split(r'\n### \d+\. ', '\n' + intro_md.strip())[1:]:
    title, body = blk.split('\n', 1)
    lines = [l for l in re.split(r'\n- ', '\n' + body.strip()) if l.strip()]
    intro.append({'title': title.strip(), 'lines': [dict({'text': clean(l)}, **({'tag': tags_of(l)} if tags_in(l) else {'tag': 'editorial'})) for l in lines]})

ev_md = re.search(r'## The reenactment[^\n]*\n.*?\n\n(1\. .*?)\n## The outcome', md, re.S).group(1)
events = []
for blk in re.split(r'\n\d+\. ', '\n' + ev_md.strip())[1:]:
    head, body = blk.split('\n', 1)
    m = re.match(r'\*\*(.+?)\*\* · (.+)', head.strip())
    events.append({'title': m.group(1), 'clock': m.group(2).strip(), 'tag': tags_of(body), 'text': clean(' '.join(p.strip() for p in body.strip().split('\n')))})

out_md = re.search(r'## The outcome\n(.*?)\n## The aftermath', md, re.S).group(1) + '\n' + re.search(r'## The aftermath \(debrief\)\n(.*?)\n---', md, re.S).group(1)
outcome = [{'text': clean(l), 'tag': tags_of(l)} for l in re.split(r'\n- ', '\n' + out_md.strip()) if l.strip()]

rec_md = re.search(r'## "From the record"[^\n]*\n(.*?)\n## Notes for review', md, re.S).group(1)
record = {}
for blk in re.split(r'\n### ', '\n' + rec_md.strip())[1:]:
    m = re.search(r'\*\*Picture:\*\* images/(\S+?\.(?:jpg|png))', blk)
    if not m or not os.path.exists(os.path.join(V, 'images', m.group(1))): continue
    f = m.group(1)
    cap = ' '.join(l.lstrip('> ').strip() for l in blk.split('\n') if l.startswith('>'))
    cr = re.search(r'\*\*Credit:\*\* (.+)', blk)
    record[f] = {'at': 0, 'file': f, 'caption': clean(cap), 'credit': cr.group(1).strip().replace('*', '') if cr else ''}

def js(o): return json.dumps(o, ensure_ascii=False, indent=2)
head = f"""/*
  Historical Scenario File — Battle of Vukovar, 1991
  -----------------------------------------------------------------
  The narrated introduction (`intro`), the reenactment chapters (`events`), the debrief (`outcome`) and the captions of the
  "From the record" pictures (`record`), word for word from NARRATION-SCRIPT.md (draft 3, approved: ready to record).
  This part is written by tools/make-scenario-text.py; the maps, armies and moves are set in the block below the marker line.
*/
window.VUKOVAR_SCENARIO = window.VUKOVAR_SCENARIO || {{}};
Object.assign(window.VUKOVAR_SCENARIO, {{
  id: 'vukovar',
  title: 'Battle of Vukovar',
  date: '25 August – 18 November 1991',
  place: 'Vukovar, on the Danube in eastern Croatia (then in Yugoslavia)',
  tagline: 'The Yugoslav People’s Army and the forces with it vs. the Croatian defenders of Vukovar',
  confidence: {{
    established:    {{ label: 'Established',      color: '#5fcf8a', desc: 'Supported by reliable evidence (the source is named in the notes).' }},
    icty:           {{ label: 'ICTY finding',     color: '#9fd0ff', desc: 'Found by the judges of the International Criminal Tribunal for the former Yugoslavia (Mrkšić et al., 2007; review 2010). Accusations and witness statements are not findings.' }},
    croatian:       {{ label: 'Croatian account', color: '#e6a0c8', desc: 'From a Croatian institution, historian, participant or newspaper.' }},
    serbian:        {{ label: 'Serbian account',  color: '#f0b46a', desc: 'From a Serbian institution, participant, newspaper or the JNA; a Serbian human-rights group is named as such.' }},
    disputed:       {{ label: 'Disputed',         color: '#ff9a86', desc: 'Sources disagree: the line says who says what, or uses wording true in every version.' }},
    estimate:       {{ label: 'Estimate',         color: '#e9c77a', desc: 'An approximate number, with what it counts and who counted it.' }},
    reconstruction: {{ label: 'Reconstruction',   color: '#c8a2ff', desc: 'Our own placing on the map: unit positions and moves, and anything the CIA map does not draw for that day.' }},
    editorial:      {{ label: 'About this page',  color: '#9aa6ab', desc: 'How this page works: not a claim about the past.' }}
  }},
  // Colours: the first-named side red (the JNA and the forces with it), the second blue (the Croatian defenders).
  sides: {{
    allied: {{ name: 'The JNA, the Territorial Defence and volunteer units', short: 'JNA', army: 'The Yugoslav People’s Army (JNA), with the local Serb Territorial Defence and volunteer units', color: '#c0392b', light: '#ffd6d0' }},
    french: {{ name: 'The Croatian defenders', short: 'Defenders', army: 'The Croatian National Guard, the police and local volunteers (the 204th Vukovar Brigade)', color: '#2e5aa8', light: '#d0dcff' }}
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
print('intro', len(intro), 'events', len(events), 'outcome', len(outcome), 'record', sorted(record), 'tail kept' if tail else 'NO TAIL YET')
