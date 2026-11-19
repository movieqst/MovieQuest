#!/usr/bin/env python3
"""Ukraine and Russia: Escalation: scenario.js from NARRATION-SCRIPT.md (draft 3) and the slide list below.
    python3 battlesofhistory/ukraine-escalation/tools/make-scenario.py
The narration, tags and source references come from the script, unchanged. Each slide marker (a line starting with ▸) in
the script becomes a slide; the SLIDES list below gives, in the same order, what the projector shows for it (a painted map
with its moves and marks, a painting, a photograph with its credit, or a typed card). A slide appears when the narrator
starts the first line written under its marker (the caption timings give the time)."""
import json, os, re
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.join(HERE, '..')
md = open(os.path.join(ROOT, 'NARRATION-SCRIPT.md'), encoding='utf-8').read()
body = md.split('\n## Welcome\n', 1)[1].split('\n## Slide and picture list', 1)[0]
MAPS = {m['file'].replace('-guide.png', ''): m for m in json.load(open(os.path.join(ROOT, 'images', 'layout', 'maps.json')))}

# ---------- the slides, in script order ----------
UA, RU = 'Ukraine', 'Russia'
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
KYIV = {'maidan': (50.4496, 30.5254, 'Maidan'), 'hrush': (50.4492, 30.5322, 'Hrushevskoho St'), 'rada': (50.4473, 30.5370, 'Rada (parliament)'),
        'inst': (50.4472, 30.5292, 'Instytutska St'), 'tub': (50.4511, 30.5240, 'Trade Union Building')}
SLIDES = [
  # I1-I4
  {'kind': 'title', 'file': 'art-title.jpg', 'head': 'Ukraine and Russia', 'sub': 'Escalation, 1991–2014'},
  MAP('europe', (50.0, 28.0, 1.0), (48.6, 31.5, 2.0), marks=[(50.45, 30.52, 'Kyiv'), (55.756, 37.617, 'Moscow'), (44.616, 33.525, 'Sevastopol')], outline=[UA, RU], title='Europe, 1991'),
  CARD('Who is who', '', cols=[{'head': 'Ukraine', 'side': 'ua', 'rows': ['Leonid Kravchuk · 1991–1994', 'Leonid Kuchma · 1994–2005', 'Viktor Yushchenko · 2005–2010', 'Viktor Yanukovych · 2010–2014']},
                                 {'head': 'Russia', 'side': 'ru', 'rows': ['Boris Yeltsin · 1991–1999', 'Vladimir Putin · 2000–2008', 'Dmitry Medvedev · 2008–2012', 'Vladimir Putin · from 2012']}],
       small='Presidents. On this page Ukraine is red and Russia is blue.'),
  CARD('How this page tells it', 'Each line carries a tag', rows=['record · a treaty, law, vote or census', 'established · agreed by the standard histories', 'account · a named person or newspaper',
                                                                 'ukrainian / russian account · one government’s claim', 'court · what a court found', 'poll · an opinion survey', 'scholarship · historians’ readings']),
  # 1. One country
  MAP('ukraine', (48.5, 31.5, 1.0), (46.4, 33.6, 1.35), marks=[(50.45, 30.52, 'Kyiv'), (44.952, 34.102, 'Simferopol'), (44.616, 33.525, 'Sevastopol'), (45.62, 34.45, 'CRIMEA', 'area')], outline=[UA], title='Ukraine'),
  CARD('The Crimean Tatars', 'Deported in May 1944 · returning from the late 1980s'),
  CARD('2001 census', 'Declared nationality', cols=[{'head': 'Ukraine', 'rows': ['Ukrainian 77.8%', 'Russian 17.3%']}, {'head': 'Crimea (without Sevastopol)', 'rows': ['Russian 58.3%', 'Ukrainian 24.3%', 'Crimean Tatar 12.0%']}],
       small='Nationality is not the same as home language or how people voted.'),
  # 2. Sovereignty
  CARD('16 July 1990', 'Declaration of State Sovereignty of Ukraine', small='Intended: a neutral state without nuclear weapons'),
  CARD('19 November 1990', 'Treaty between the Ukrainian SSR and the Russian SFSR', small='Article 6: territorial integrity within the borders then existing in the USSR'),
  # 3. Independence
  CARD('24 August 1991', 'Act of Declaration of Independence of Ukraine'),
  ART('art-ballot.jpg', '1 December 1991', stamp=['90.32% yes', 'turnout 84.18%', 'Crimea 54.19% · Sevastopol 57.07%']),
  CARD('December 1991', '', rows=['8 December · Belavezha: the CIS is founded; the USSR “ceased to exist”', '21 December · Alma-Ata Declaration', '25 December · Gorbachev resigns']),
  # 4. The weapons
  ART('art-silo.jpg', 'Nuclear forces in Ukraine, 1991 (estimate)', stamp=['about 1,900 strategic warheads', '176 ICBMs', 'about 45 strategic bombers']),
  PHOTO('trilateral-1994.jpg', 'Moscow, 14 January 1994: the presidents after signing the Trilateral Statement', 'William J. Clinton Presidential Library · public domain', 'Presidents after signing the Trilateral Statement, Moscow, 1994.png'),
  CARD('Budapest, 5 December 1994', 'Memorandum on Security Assurances', quote=['“to respect the independence and sovereignty and the existing borders of Ukraine”',
       '“to refrain from the threat or use of force against the territorial integrity or political independence of Ukraine”'], small='Signed by Kuchma, Yeltsin, Major and Clinton · UN Treaty Series I-52241'),
  ART('art-train.jpg', '1 June 1996: the last warhead trains arrive in Russia'),
  # 5. The Crimea question
  MAP('crimea', (45.3, 34.4, 1.0), (45.25, 34.3, 1.12), marks=[(44.952, 34.102, 'Simferopol'), (44.616, 33.525, 'Sevastopol'), (45.357, 36.468, 'Kerch'), (46.15, 33.69, 'Perekop')], title='Crimea'),
  CARD('Russia’s parliament and the UN', '', rows=['21 May 1992 · the 1954 decision declared void', '9 July 1993 · “federal status” claimed for Sevastopol', '20 July 1993 · UN Security Council: “without effect”']),
  CARD('Crimea, 1994–1995', '', rows=['January 1994 · Yuri Meshkov elected president of Crimea', 'March 1995 · Ukraine’s parliament abolishes the post']),
  # 6. The fleet and the treaty
  MAP('sevastopol', (44.615, 33.47, 1.25), (44.612, 33.565, 1.45), marks=[(44.62, 33.56, 'Sevastopol Bay', 'water'), (44.605, 33.522, 'Sevastopol')], title='Sevastopol'),
  ART('art-fleet.jpg', 'The Black Sea Fleet, divided in May 1997', stamp=['Russia 81.7% · Ukraine 18.3%', 'bases leased to 2017', '$97.75 million a year, against Ukraine’s debt']),
  CARD('31 May 1997', 'Treaty of Friendship, Cooperation and Partnership', small='Article 2: territorial integrity and the inviolability of borders · in force 1 April 1999'),
  # 7. Kuchma and Tuzla
  CARD('Leonid Kuchma', 'President, 1994–2005', small='“The European choice” · NATO’s Partnership for Peace, 1994'),
  MAP('kerch', (45.30, 36.55, 1.0), (45.268, 36.56, 1.7), marks=[(45.272, 36.535, 'Tuzla'), (45.357, 36.468, 'Kerch'), (45.215, 36.716, 'Taman'), (45.235, 36.60, 'the dam, 2003 (approx.)', 'note')], title='The Kerch Strait'),
  ART('art-tuzla-dam.jpg', 'Autumn 2003: a dam toward Tuzla'),
  PHOTO('putin-kuchma.jpg', '24 December 2003: Putin and Kuchma; the Azov–Kerch treaty', 'Presidential Press and Information Office (kremlin.ru) · CC BY 4.0', 'Vladimir Putin with Leonid Kuchma.jpg'),
  # 8. The Orange Revolution
  CARD('Presidential election, 2004', 'Viktor Yushchenko · Viktor Yanukovych'),
  PHOTO('orange.jpg', 'Kyiv, the Orange Revolution, 2004', 'Ввласенко · CC BY-SA 3.0', 'Orange Revolution, 2004.jpg'),
  CARD('3 December 2004', 'The Supreme Court orders the runoff held again', bars=[['Yushchenko', 52.0, 'neutral'], ['Yanukovych', 44.2, 'neutral']], small='26 December re-run'),
  # 9. Gas
  MAP('pipelines', (49.0, 26.0, 1.0), (49.0, 27.0, 1.15), marks=[(50.45, 30.52, 'Kyiv'), (48.62, 22.29, 'Uzhhorod'), (55.756, 37.617, 'Moscow'), (48.21, 16.37, 'Vienna'), (52.52, 13.40, 'Berlin')],
      outline=[UA, RU], extra='pipes', title='Gas routes across Ukraine (schematic)'),
  PHOTO('strilkove.jpg', 'A Ukrainian gas compressor station, 2013', 'Ryeland · CC BY-SA 3.0', 'Strilkove Compressor Station.jpg'),
  ART('art-pipeline-snow.jpg', 'January 2009', stamp=['1 Jan · supply for Ukraine stopped', '7 Jan · transit to Europe stopped', '20 Jan · deliveries resumed']),
  # 10. Bucharest and Georgia
  CARD('Bucharest, 3 April 2008', 'NATO summit declaration, paragraph 23', quote=['“We agreed today that these countries will become members of NATO.”'], small='No Membership Action Plan; no date'),
  CARD('Kommersant, 7 April 2008', 'Reported words, from an unnamed source', quote=['“You understand, George, that Ukraine isn’t even a state!”'], small='No verified transcript'),
  MAP('georgia', (42.3, 43.5, 1.0), (42.2, 43.3, 1.2), marks=[(42.226, 43.970, 'Tskhinvali'), (41.716, 44.783, 'Tbilisi'), (41.984, 44.109, 'Gori'), (43.001, 41.023, 'Sukhumi'),
      (42.95, 41.45, 'ABKHAZIA', 'area'), (42.40, 43.95, 'SOUTH OSSETIA', 'area')], outline=['Georgia', RU], title='Georgia, August 2008'),
  CARD('Pew survey, autumn 2009', 'Should Ukraine join NATO within ten years?', bars=[['For', 28, 'neutral'], ['Against', 51, 'neutral']]),
  # 11. Yanukovych
  PHOTO('yanukovych.jpg', 'Viktor Yanukovych, president 2010–2014', 'Administration of the President of Ukraine · CC BY 4.0', 'Viktor Yanukovych official portrait.jpg'),
  PHOTO('medvedev-yanukovych.jpg', 'Medvedev and Yanukovych, November 2010', 'kremlin.ru · CC BY 4.0', 'Dmitry Medvedev and Viktor Yanukovych (2010-11-26) 01.jpg'),
  ART('art-rada-empty.jpg', 'The Verkhovna Rada, Ukraine’s parliament'),
  CARD('Association Agreement', 'Ukraine and the European Union · initialled 2012', small='The EU asked for reforms, and an end to selective justice'),
  # 12. Euromaidan
  CARD('21 November 2013', 'The government suspends preparations to sign'),
  PHOTO('euromaidan-dec1.jpg', 'Kyiv, 1 December 2013', 'teteria sonnna · CC BY 2.0', '2013-12-01-0044 Євромайдан (13747255925).jpg'),
  CARD('17 December 2013', '', rows=['up to $15 billion of Ukrainian bonds ($3 billion bought that month)', 'gas at $268.50 per 1,000 m³']),
  MAP('kyiv', (50.448, 30.525, 1.0), (50.4488, 30.531, 1.7), marks=[KYIV['maidan'], KYIV['hrush'], KYIV['rada']], title='Central Kyiv'),
  # 13. February
  PHOTO('barricade-feb18.jpg', 'Kyiv, 18 February 2014', 'Mstyslav Chernov/Unframe · CC BY-SA 3.0', 'Barricade line separating interior troops and protesters.Development of clashes in Kyiv, Ukraine. Events of February 18, 2014.jpg'),
  PHOTO('tradeunion-fire.jpg', 'Trade Union Building fire, February 2014', 'Mstyslav Chernov/Unframe · CC BY-SA 3.0', 'Trade union building facing Maidan square is burning into flames. Clashes in Ukraine, Kyiv. Events of February 20, 2014.jpg'),
  MAP('kyiv', (50.4485, 30.527, 1.5), (50.4478, 30.529, 2.0), marks=[KYIV['maidan'], KYIV['inst']], title='Instytutska Street, 20 February 2014'),
  CARD('21 February 2014', 'The agreement on settlement of the political crisis', small='Witnessed by the foreign ministers of Germany and Poland, and Éric Fournier for France · UN S/2014/121'),
  ART('art-rada-empty.jpg', '22 February 2014', stamp=['328 in favour']),
  # 14. The twenty-seventh of February
  CARD('8 March 2015', 'Putin, in a documentary trailer', quote=['“We have to start work on returning Crimea to Russia.”'], small='His account of the night of 22–23 February 2014 · Interfax'),
  ART('art-crimea-parliament.jpg', 'Simferopol, 27 February 2014 (painting)'),
  MAP('crimea', (45.0, 34.0, 1.45), (45.3, 34.4, 1.0), marks=[(44.952, 34.102, 'Simferopol')], title='Crimea, 27 February 2014'),
  # Debrief
  MAP('ukraine', (48.5, 31.5, 1.0), (48.5, 31.5, 1.08), outline=[UA, RU], marks=[(50.45, 30.52, 'Kyiv'), (44.952, 34.102, 'Simferopol')], title='Ukraine, 1991–2014'),
  CARD('How historians read the causes', '', cols=[{'head': 'A security dilemma', 'rows': ['NATO’s growth eastward, seen from Moscow', 'e.g. Richard Sakwa']},
                                                  {'head': 'Sovereignty', 'rows': ['Ukraine’s own choices; Russia’s pressure and claims', 'e.g. Serhii Plokhy']}],
       small='Explaining why is not the same as deciding who was responsible.'),
  CARD('Still argued about', '', rows=['What the Budapest assurances obliged', 'Revolution or coup, February 2014', 'Who fired every shot on the Maidan']),
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
  'title': 'Ukraine and Russia: Escalation', 'sub': '1991 – 27 February 2014 · the background to the war of 2014–2015',
  'welcome': welcome, 'spokenTitles': True, 'intro': intro, 'events': events,
  'maps': {k: {'file': k + '-painting.jpg', 'lat0': v['lat0'], 'lat1': v['lat1'], 'lon0': v['lon0'], 'lon1': v['lon1'], 'km_w': v['km_w']} for k, v in MAPS.items()},
  'sides': {'ua': {'name': 'Ukraine', 'color': '#c0392b'}, 'ru': {'name': 'Russia', 'color': '#2e5aa8'}},
  'imageBase': 'images/', 'audioBase': 'audio/',
  'voices': [{'id': 'clear', 'name': 'Narrator 1 · clear'}, {'id': 'light', 'name': 'Narrator 2 · light'}, {'id': 'bright', 'name': 'Narrator 3 · bright'},
             {'id': 'deep', 'name': 'Narrator 4 · deep'}, {'id': 'warm', 'name': 'Narrator 5 · warm'}, {'id': 'computer', 'name': 'Computer · calm'}],
  'credits': [
    'Narration: written for this page from the research report (v2), checked three times by ChatGPT against treaty texts, UN and court records and the standard histories.',
    'Painted maps and scenes: made for this page with ChatGPT (AI-generated) from real elevation data, Natural Earth and OpenStreetMap (© OpenStreetMap contributors, ODbL): illustrations, not records.',
    'Borders: Natural Earth (public domain), with Crimea shown inside Ukraine as it was in 1991–2014.',
    'Photographs: Wikimedia Commons; each slide names its author and licence.',
    'Projector sounds: made in the browser for this page.'],
  'sources': [
    ['Memorandum on Security Assurances, Budapest, 5 December 1994', 'UN Treaty Series vol. 3007, I-52241'],
    ['Treaty of Friendship, Cooperation and Partnership, 31 May 1997', 'Ukraine and the Russian Federation'],
    ['Steven Pifer, The Trilateral Process', 'Brookings Institution, 2011'],
    ['OSCE/ODIHR election observation reports', '2004 and 2010 presidential elections'],
    ['Oxford Institute for Energy Studies', 'The Russo-Ukrainian gas disputes of 2006 and 2009'],
    ['NATO, Bucharest Summit Declaration, 3 April 2008', 'paragraph 23'],
    ['Pew Research Center, Global Attitudes, 2009', 'Ukraine and NATO'],
    ['UN Office of the High Commissioner for Human Rights', 'Accountability for killings in Ukraine, January 2014 – May 2016'],
    ['European Court of Human Rights', 'Ukraine v. Russia (re Crimea), decision of 16 December 2020; Shmorgunov and others v. Ukraine, 2021'],
    ['UN Security Council, S/PV.7125, 3 March 2014', 'and the agreement of 21 February 2014, S/2014/121'],
    ['Serhii Plokhy, The Russo-Ukrainian War (2023); Richard Sakwa, Frontline Ukraine (2015)', 'two readings of the causes'],
  ],
}
out = '/* Made by tools/make-scenario.py from NARRATION-SCRIPT.md (draft 3). Do not edit by hand. */\nwindow.UKRESC_SCENARIO = ' + json.dumps(S, ensure_ascii=False, indent=1) + ';\n'
open(os.path.join(ROOT, 'scenario.js'), 'w', encoding='utf-8').write(out)
print(len(intro), 'intro slides,', len(events), 'chapters,', slide_i, 'slides,', sum(len(e['lines']) for e in events) + sum(len(i['lines']) for i in intro), 'lines')
