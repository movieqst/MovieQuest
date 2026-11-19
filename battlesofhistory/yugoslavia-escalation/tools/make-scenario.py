#!/usr/bin/env python3
"""Yugoslavia: Escalation: scenario.js (made from the Ukraine page's tool) from NARRATION-SCRIPT.md (draft 3) and the slide list below.
    python3 battlesofhistory/yugoslavia-escalation/tools/make-scenario.py
The narration, tags and source references come from the script, unchanged. Each slide marker (a line starting with ▸) in
the script becomes a slide; the SLIDES list below gives, in the same order, what the projector shows for it (a painted map
with its moves and marks, a painting, a photograph with its credit, or a typed card). A slide appears when the narrator
starts the first line written under its marker (the caption timings give the time)."""
import json, os, re
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.join(HERE, '..')
md = open(os.path.join(ROOT, 'NARRATION-SCRIPT.md'), encoding='utf-8').read()
body = md.split('\n## Welcome\n', 1)[1].split('\n## Slide and picture list', 1)[0]
MAPS = {m['file'].replace('-guide.png', ''): m for m in json.load(open(os.path.join(ROOT, 'images', 'layout', 'maps.json')))}
MAPS['europe'] = [m for m in json.load(open(os.path.join(ROOT, '..', 'ukraine-escalation', 'images', 'layout', 'maps.json'))) if m['file'] == 'europe-guide.png'][0]   # the Ukraine page's Europe painting

# ---------- the slides, in script order ----------
REPS = ['Slovenia', 'Croatia', 'Bosnia and Herzegovina', 'Serbia', 'Vojvodina', 'Kosovo', 'Montenegro', 'Macedonia']
def MAP(name, frm, to=None, marks=(), outline=(), extra=None, title=None, note=None):
    d = {'kind': 'map', 'map': name, 'from': list(frm), 'to': list(to or frm), 'marks': [list(m) for m in marks], 'outline': list(outline)}
    if extra: d['extra'] = extra
    if title: d['title'] = title
    if note: d['note'] = note
    return d
def ART(file, cap='', stamp=None): return {'kind': 'art', 'file': file, 'caption': cap, **({'stamp': stamp} if stamp else {})}
def PHOTO(file, cap, credit, commons): return {'kind': 'photo', 'file': file, 'caption': cap, 'credit': credit, 'commons': commons}
def CARD(head, sub='', rows=(), quote=None, bars=None, cols=None, small=None):
    d = {'kind': 'card', 'head': head, 'sub': sub, 'rows': list(rows)}
    if quote: d['quote'] = quote
    if bars: d['bars'] = bars
    if cols: d['cols'] = cols
    if small: d['small'] = small
    return d
C = {'belgrade': (44.82, 20.46, 'Belgrade'), 'zagreb': (45.81, 15.98, 'Zagreb'), 'ljubljana': (46.05, 14.51, 'Ljubljana'), 'sarajevo': (43.86, 18.41, 'Sarajevo'),
     'skopje': (41.99, 21.43, 'Skopje'), 'titograd': (42.44, 19.26, 'Titograd'), 'pristina': (42.66, 21.17, 'Pristina'), 'novisad': (45.25, 19.84, 'Novi Sad'),
     'knin': (44.04, 16.20, 'Knin'), 'srb': (44.38, 16.14, 'Srb'), 'plitvice': (44.88, 15.62, 'Plitvice'), 'pakrac': (45.44, 17.19, 'Pakrac'), 'borovo': (45.40, 18.97, 'Borovo Selo'),
     'vukovar': (45.35, 19.00, 'Vukovar'), 'split': (43.51, 16.44, 'Split'), 'kpolje': (42.64, 21.10, 'Kosovo Polje'), 'gazimestan': (42.69, 21.13, 'Gazimestan'),
     'mitrovica': (42.89, 20.87, 'Mitrovica'), 'trepca': (42.93, 20.90, 'Trepča (approx.)')}
c = lambda *ks: [C[k] for k in ks]
SLIDES = [
  # I1-I4
  {'kind': 'title', 'file': 'art-title.jpg', 'head': 'Yugoslavia', 'sub': 'Escalation, 1980–1991'},
  MAP('europe', (50.0, 28.0, 1.0), (44.0, 18.7, 2.6), marks=c('belgrade'), outline=REPS, title='Europe, 1980s'),
  MAP('yugoslavia', (43.9, 18.7, 1.0), (43.9, 18.7, 1.06), marks=c('belgrade'), outline=REPS, extra='repnames', title='Six republics, two provinces'),
  CARD('How this page tells it', 'Each line carries a tag', rows=['record · a law, census, vote or count', 'established · agreed by the standard histories', 'account · a named person, witness or newspaper',
       'serbian / croatian / croatian serb / slovenian / kosovo albanian / federal account · one side’s claim', 'court · a tribunal finding or record', 'estimate · an uncertain number', 'scholarship · historians’ readings']),
  # 1. Many nations
  CARD('1981 federal census', '22,424,711 people', bars=[['Serbs', 36.3, 'n'], ['Croats', 19.7, 'n'], ['Muslims', 8.9, 'n'], ['Slovenes', 7.8, 'n'], ['Albanians', 7.7, 'n'], ['Macedonians', 6.0, 'n'],
       ['Yugoslavs', 5.4, 'n'], ['Montenegrins', 2.6, 'n'], ['Hungarians', 1.9, 'n']], small='Declared nationality · Archives of Yugoslavia') | {'barMax': 40},
  CARD('The 1974 constitution', 'Republics and provinces with wide powers', rows=['each with its own seat on the federal presidency', 'the federal army: the Yugoslav People’s Army (JNA)', 'each republic’s reserve force: the Territorial Defence']),
  # 2. After Tito, Tito
  PHOTO('tito-funeral.jpg', 'Tito’s funeral, Belgrade, 8 May 1980', 'unknown author, Museum of Yugoslavia · CC BY-SA 3.0 Serbia', 'Sahrana Josipa Broza Tita.jpg'),
  CARD('The collective presidency', 'From May 1980, the head of state', rows=['a member from every republic and province', 'a new chair each year'], small='“After Tito, Tito”'),
  # 3. Debt
  ART('art-banknotes.jpg', 'The 1980s: debt and austerity', stamp=['foreign debt, 1982: US$20.3 billion (World Bank)']),
  CARD('Rich and poor', '', rows=['Slovenia and Croatia: the richest republics', 'Kosovo: the poorest region'], small='Arguments over who should pay for whom'),
  # 4. Kosovo, 1981
  MAP('kosovo', (42.6, 20.9, 1.0), (42.66, 21.1, 1.3), marks=c('pristina', 'mitrovica'), outline=['Kosovo'], title='Kosovo'),
  CARD('April 1981', 'Official reports', rows=['8 demonstrators and 1 police officer killed'], small='As cited by the International Commission of Jurists · other estimates circulated'),
  # 5. The Memorandum
  CARD('September 1986', 'A leaked draft memorandum', small='Members of the Serbian Academy of Sciences and Arts · excerpts in Večernje novosti'),
  # 6. Kosovo Polje
  MAP('kosovo', (42.66, 21.1, 1.3), (42.645, 21.11, 2.4), marks=c('kpolje', 'pristina', 'gazimestan'), title='Kosovo Polje'),
  CARD('Kosovo Polje, 24 April 1987', 'Slobodan Milošević', quote=['“Niko ne sme da vas bije.”', '“No one is allowed to beat you.”'], small='Recorded on film, reproduced in the tribunal’s proceedings'),
  CARD('September 1987', 'The Eighth Session of Serbia’s party leaders', small='Ivan Stambolić removed in December 1987'),
  # 7. The rallies
  CARD('The rallies', '1988–1989', rows=['October 1988 · Vojvodina’s leaders resign', 'January 1989 · Montenegro’s leaders resign']),
  ART('art-mine.jpg', 'February 1989: the miners of Trepča'),
  CARD('March 1989', 'Serbia’s constitutional changes · the unrest in Kosovo', rows=['official toll: 25 killed, including 2 police officers'], small='US State Department, 1989 · other estimates circulated'),
  # 8. Gazimestan
  PHOTO('gazimestan.jpg', 'The Gazimestan monument, photographed in 2012', 'FitimSelimi · CC BY-SA 3.0', 'Gazimestan Kosovo.JPG'),
  CARD('Gazimestan, 28 June 1989', 'Slobodan Milošević', quote=['“Šest vekova kasnije, danas, mi ponovo bijemo bitke i suočeni smo sa bitkama. One nisu oružane, mada ni takve još nisu isključene.”',
       '“Six centuries later, today, we are again fighting battles and facing battles. They are not armed, although even such battles are not yet ruled out.”'], small='The recorded speech, in the tribunal’s proceedings'),
  # 9. Slovenia
  MAP('yugoslavia', (43.9, 18.7, 1.06), (46.0, 14.9, 2.6), marks=c('ljubljana', 'zagreb'), outline=['Slovenia'], title='Slovenia'),
  CARD('Slovenia, 1989', '', rows=['September · constitutional amendments: the right to self-determination', '1 December · a rally planned by the Božur association, banned']),
  # 10. A new dinar
  PHOTO('markovic.jpg', 'Ante Marković, Yugoslav prime minister, 1990', '© European Union, 2026 (European Commission Audiovisual Service) · CC BY 4.0', 'Visit of Ante Marković, Yugoslav Prime Minister, to the CEC (cropped).jpg'),
  ART('art-banknotes.jpg', '1 January 1990: a new dinar', stamp=['1 new dinar = 10,000 old', '7 dinars = 1 Deutschmark', 'prices in 1989: up about 2,700% (OECD)']),
  # 11. The last congress
  ART('art-congress.jpg', 'Belgrade, 20–22 January 1990: the 14th Extraordinary Congress'),
  # 12. The elections of 1990
  ART('art-ballot-1990.jpg', '1990: the first elections with many parties'),
  CARD('The elections of 1990', 'Each republic voted separately', rows=['Slovenia, April · DEMOS; Milan Kučan president', 'Croatia, April–May · HDZ; Franjo Tuđman president', 'Macedonia, Nov–Dec · no single majority',
       'Bosnia and Herzegovina, 18 Nov · SDA, SDS, HDZ', 'Serbia, 9 Dec · Milošević, about 65%', 'Montenegro, Dec · Momir Bulatović'], small='Not all were equally free'),
  CARD('1990', '', rows=['May · Slovenia’s Territorial Defence weapons ordered to army depots', 'July · Kosovo’s Albanian assembly members declare a republic; Serbia dissolves the assembly']),
  # 13. Knin
  MAP('croatia', (44.6, 17.0, 1.0), (44.2, 16.2, 2.0), marks=c('knin', 'srb', 'zagreb'), outline=['Croatia'], title='Croatia: Knin and Srb'),
  ART('art-logs.jpg', '17 August 1990: barricades around Knin'),
  CARD('22 December 1990', 'The Constitution of the Republic of Croatia', quote=['“…the national state of the Croatian nation and the state of members of other nations and minorities who are its citizens: Serbs, …”'],
       small='Preamble · article 14: equality · Narodne novine 56/1990'),
  # 14. The army and the presidency
  CARD('25 January 1991', 'An army film on Belgrade television', small='How the film was edited is disputed'),
  ART('art-street.jpg', 'Belgrade, 9 March 1991', stamp=['killed: police officer Nedeljko Kosović', 'and demonstrator Branivoje Milinović']),
  CARD('12–15 March 1991', 'The federal presidency votes', rows=['the army’s request for emergency measures: no majority', '16 March · Milošević: Serbia no longer recognises the presidency’s authority']),
  CARD('25 March 1991', 'Karađorđevo: Milošević and Tuđman meet', small='What was agreed is disputed · no agreed text has been verified'),
  # 15. Spring 1991
  MAP('croatia', (44.6, 17.0, 1.0), (44.9, 17.2, 1.15), marks=c('pakrac', 'plitvice', 'borovo', 'split', 'vukovar'), outline=['Croatia'], title='Croatia, spring 1991'),
  PHOTO('plitvice.jpg', 'The Plitvice Lakes, photographed in 2012', 'Logica olgica · CC BY-SA 4.0', 'Plitvice Lakes- National Park 4.jpg'),
  PHOTO('borovo-memorial.jpg', 'The memorial in Borovo Selo, photographed in 2007', 'Modzzak · public domain', 'Memorial in Borovo Selo.JPG'),
  # 16. The twenty-fifth of June
  CARD('The referendums', '', bars=[['Slovenia, Dec 1990 (eligible voters)', 88.5, 'n'], ['Croatia, May 1991 (participants)', 93.24, 'n']], small='Croatia: turnout 83.56%; many Serbs boycotted the vote'),
  CARD('March–June 1991', 'The presidents of the six republics meet', rows=['Split · Belgrade · Brdo · Ohrid · Cetinje · Stojčevo'], small='No agreement · 15 May: Stjepan Mesić blocked from chairing the presidency'),
  CARD('Belgrade, 21 June 1991', 'James Baker, US Secretary of State', quote=['“We worry, frankly, about history repeating itself.”'], small='As reported in the Washington Post, 22 June 1991'),
  ART('art-assembly.jpg', '25 June 1991: Slovenia and Croatia declare independence'),
  # Debrief
  MAP('yugoslavia', (43.9, 18.7, 1.0), (43.9, 18.7, 1.06), outline=REPS, extra='repnames', title='Yugoslavia, 1980–1991'),
  CARD('Not ancient hatreds', 'How historians read it', cols=[{'head': 'Susan Woodward', 'rows': ['debt, austerity, a weak federal state']}, {'head': 'V. P. Gagnon', 'rows': ['leaders using conflict to hold power']},
       {'head': 'Dejan Jović', 'rows': ['federal authority wearing away']}], small='These readings overlap.'),
  CARD('The International Criminal Tribunal for the former Yugoslavia', '', rows=['Milošević died in 2006, before his trial ended: no verdict', 'Milan Babić pleaded guilty to persecution (2004)'], small='The trials mostly concerned the wars after June 1991'),
]

# ---------- parse the script ----------
TAGRE = re.compile(r'^- (.*?)\s*\*\(([^)]*)\)\*\s*(.*)$')
welcome = body.split('\n## Introduction', 1)[0].strip()
intro, events = [], []; cur = None; part = ''; slide_i = 0; sec = None
def new_item(title, kind):
    global cur
    cur = {'title': title, 'lines': [], 'slides': []}
    if kind == 'intro': intro.append(cur)
    else: cur['part'] = part; events.append(cur)
for ln in body.split('\n'):
    if ln.startswith('## Introduction'): sec = 'intro'; continue
    if ln.startswith('## Part'): sec = 'event'; part = ln.split(':', 1)[1].strip(); continue
    if ln.startswith('## Debrief'): sec = 'debrief'; part = 'Looking back'; new_item('Looking back', 'event'); cur['debrief'] = True; continue
    m = re.match(r'### (?:I?\d+\. )?(.*)', ln)
    if m:
        if sec == 'debrief': cur.setdefault('sections', []).append({'title': m.group(1), 'line': len(cur['lines'])}); continue
        new_item(m.group(1).strip(), 'intro' if sec == 'intro' else 'event'); continue
    if ln.startswith('▸'):
        sp = dict(SLIDES[slide_i]); sp['line'] = len(cur['lines']); cur['slides'].append(sp); slide_i += 1; continue
    t = TAGRE.match(ln)
    if t: cur['lines'].append({'text': t.group(1).strip(), 'tag': t.group(2).strip(), 'cite': t.group(3).strip()})
assert slide_i == len(SLIDES), (slide_i, len(SLIDES))
for e in events: e['text'] = ' '.join(l['text'] for l in e['lines'])

S = {
  'title': 'Yugoslavia: Escalation', 'sub': 'May 1980 – 25 June 1991 · the background to the wars in the former Yugoslavia',
  'welcome': welcome, 'spokenTitles': True, 'intro': intro, 'events': events,
  'maps': {k: {'file': k + '-painting.jpg', 'lat0': v['lat0'], 'lat1': v['lat1'], 'lon0': v['lon0'], 'lon1': v['lon1'], 'km_w': v['km_w']} for k, v in MAPS.items()},
  'borderColors': {'Slovenia': [120, 200, 160], 'Croatia': [230, 200, 110], 'Bosnia and Herzegovina': [140, 180, 230], 'Serbia': [235, 150, 120], 'Vojvodina': [235, 190, 160],
                   'Kosovo': [210, 160, 210], 'Montenegro': [170, 210, 120], 'Macedonia': [240, 170, 90]},
  'borderFill': .16, 'borderNote': 'the republics and provinces from Natural Earth',
  'endNote': 'What happened next is told on the following pages: the Ten-Day War in Slovenia, and then the wars in Croatia and Bosnia and Herzegovina.',
  'imageBase': 'images/', 'audioBase': 'audio/',
  'voices': [{'id': 'clear', 'name': 'Narrator 1 · clear'}, {'id': 'light', 'name': 'Narrator 2 · light'}, {'id': 'bright', 'name': 'Narrator 3 · bright'},
             {'id': 'deep', 'name': 'Narrator 4 · deep'}, {'id': 'warm', 'name': 'Narrator 5 · warm'}, {'id': 'computer', 'name': 'Computer · calm'}],
  'credits': [
    'Narration: written for this page from the research report (v3), checked by ChatGPT against laws, census and election records, tribunal judgments and the standard histories.',
    'Painted maps and scenes: made for this page with ChatGPT (AI-generated) from real elevation data and Natural Earth: illustrations, not records.',
    'Borders: Natural Earth (public domain): the republics and provinces of Yugoslavia.',
    'Photographs: Wikimedia Commons; each slide names its author, licence and date.',
    'Projector sounds: made in the browser for this page.'],
  'sources': [
    ['Archives of Yugoslavia', 'the 1981 census'], ['OECD Economic Survey: Yugoslavia, 1990; World Bank', 'the debt, the inflation, the Marković programme'],
    ['International Commission of Jurists, States of Emergency (1983)', 'Kosovo, 1981'], ['ICTY: Milošević, Martić, Mrkšić, Prlić and Milutinović case records', 'the quotations, the Krajina, Karađorđevo, the background of 1990–1991'],
    ['The Constitution of the Republic of Croatia, Narodne novine 56/1990', 'the preamble and article 14'], ['Croatian Sabor; Slovenian government chronology', 'the referendums'],
    ['Helsinki Committee for Human Rights in Serbia, Yugoslavia 1980–1991', 'the congress, the summits'], ['Susan Woodward, Balkan Tragedy (1995); V. P. Gagnon, The Myth of Ethnic War (2004); Dejan Jović, Yugoslavia: A State that Withered Away (2009)', 'three readings of the causes'],
  ],
}
out = '/* Made by tools/make-scenario.py from NARRATION-SCRIPT.md (draft 3). Do not edit by hand. */\nwindow.YUGESC_SCENARIO = ' + json.dumps(S, ensure_ascii=False, indent=1) + ';\n'
open(os.path.join(ROOT, 'scenario.js'), 'w', encoding='utf-8').write(out)
print(len(intro), 'intro slides,', len(events), 'chapters,', slide_i, 'slides,', sum(len(e['lines']) for e in events) + sum(len(i['lines']) for i in intro), 'lines')
