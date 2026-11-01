/* Dunkirk, 26 May – 4 June 1940 — scenario data for engine.js.

  Three painted maps, all 2400 x 1800 "world pixels", north up:
    campaign  images/map1.jpg  north-east France and Belgium, about 183 x 142 km (painted to the layout guide)
    beaches   images/map2.jpg  Dunkirk, the beaches and the canal perimeter (a closer view than the guide; positions
                               below are read off the painting itself)
    channel   images/map3.jpg  the Strait of Dover and the three sea routes, about 147 x 98 km
  On the campaign and Channel maps positions come from latitude and longitude (helpers m1 and m3 below), so they sit on
  the real places. Confidence tags:
    established    — generally accepted by historians
    official       — from the British official accounts (Gort's and Ramsay's despatches, the Official History)
    german         — from German records and accounts
    estimate       — a modern estimate or a figure the sources disagree on
    reconstruction — our own choice to make the reenactment watchable (positions, timings, which ship where) */
(() => {
const m1 = (lat, lon) => ({ x: Math.round((lon - 1.45) / 2.6 * 2400), y: Math.round((51.48 - lat) / 1.28 * 1800) });
const m3 = (lat, lon) => ({ x: Math.round((lon - .95) / 2.1 * 2400), y: Math.round((51.60 - lat) / .88 * 1800) });
const R1 = pts => pts.map(([a, b]) => { const p = m1(a, b); return [p.x, p.y]; });
const R3 = pts => pts.map(([a, b]) => { const p = m3(a, b); return [p.x, p.y]; });
const DK3 = [51.065, 2.37], DOVER = [51.10, 1.345];
const ROUTE_Z = [DK3, [51.04, 2.20], [51.03, 2.05], [51.02, 1.88], [51.03, 1.70], [51.07, 1.52], DOVER];
const ROUTE_X = [DK3, [51.11, 2.30], [51.20, 2.15], [51.30, 1.90], [51.35, 1.65], [51.33, 1.58], [51.24, 1.46], DOVER];
const ROUTE_Y = [DK3, [51.10, 2.48], [51.17, 2.60], [51.22, 2.63], [51.33, 2.45], [51.42, 2.10], [51.42, 1.75], [51.33, 1.58], [51.24, 1.46], DOVER];
const BACK = r => r.slice().reverse();
// beach map (map2) landmarks, read off the painting
const MOLE_TIP = { x: 829, y: 552 }, MOLE_BASE = { x: 900, y: 722 }, SEAWARD = -1.86;

window.DUNKIRK_SCENARIO = {
  id: 'dunkirk',
  title: 'Dunkirk evacuation',
  date: '26 May – 4 June 1940',
  place: 'Dunkirk, northern France',
  tagline: 'The British, French and Belgian armies against the German Army and Luftwaffe',
  duration: 216,
  titleCard: {
    title: 'DUNKIRK',
    date: '26 May – 4 June 1940',
    place: 'Dunkirk and the Strait of Dover',
    sides: 'British, French and Belgian armies  ·  the German Army and Luftwaffe'
  },
  confidence: {
    established:    { label: 'Established',     color: '#5fcf8a', desc: 'Generally accepted by historians.' },
    official:       { label: 'British official', color: '#9fc8ff', desc: 'From the British official accounts: the despatches of Lord Gort and Admiral Ramsay, and the Official History.' },
    german:         { label: 'German account',  color: '#f0a070', desc: 'From German war diaries, orders and memoirs.' },
    estimate:       { label: 'Estimate',        color: '#7fb8ff', desc: 'A modern estimate, or a figure the sources give differently.' },
    reconstruction: { label: 'Reconstruction',  color: '#c9a0ff', desc: 'Our own choice to make the reenactment watchable: positions, timings and which ship is shown where.' }
  },
  sides: {
    british: { name: 'British Expeditionary Force', color: '#b8342c', light: '#ffc4b8' },
    french:  { name: 'French Army',                 color: '#2f5fb8', light: '#bcd2ff' },
    belgian: { name: 'Belgian Army',                color: '#c9a227', light: '#ffe9a8' },
    german:  { name: 'German Army and Luftwaffe',   color: '#4b4f55', light: '#e2e4e6' },
    navy:    { name: 'Royal Navy and the little ships', color: '#1f3f73', light: '#cfe0ff' }
  },

  /* ---------- the three maps ---------- */
  startMap: 'campaign',
  maps: {
    campaign: { file: 'map1.jpg', zoom: .46, seaEdges: ['top', 'left'], waves: { strength: .45 },
      scale: { px: 131, label: '10 km' },
      labels: [
        Object.assign(m1(51.035, 2.375), { text: 'Dunkirk', dot: true }), Object.assign(m1(50.955, 1.86), { text: 'Calais', dot: true, small: true }),
        Object.assign(m1(50.725, 1.61), { text: 'Boulogne', dot: true, small: true }), Object.assign(m1(50.63, 3.06), { text: 'Lille', dot: true }),
        Object.assign(m1(50.29, 2.78), { text: 'Arras', dot: true, small: true }), Object.assign(m1(50.85, 2.885), { text: 'Ypres', dot: true, small: true }),
        Object.assign(m1(51.215, 2.925), { text: 'Ostend', dot: true, small: true }), Object.assign(m1(51.05, 3.72), { text: 'Ghent', dot: true, small: true }),
        Object.assign(m1(50.80, 2.485), { text: 'Cassel', dot: true, small: true }), Object.assign(m1(50.80, 2.07), { text: 'AA CANAL', small: true }),
        Object.assign(m1(51.30, 1.75), { text: 'English Channel', small: true })
      ] },
    beaches: { file: 'map2.jpg', zoom: .9, seaEdges: ['top'], waves: { strength: .9 },
      scale: { px: 140, label: '≈ 2 km (the painting is not to scale)' },
      labels: [
        { x: 640, y: 905, text: 'DUNKIRK' }, { x: 760, y: 500, text: 'East Mole', small: true }, { x: 1080, y: 790, text: 'Malo-les-Bains', small: true },
        { x: 1250, y: 735, text: 'Zuydcoote', small: true }, { x: 1640, y: 615, text: 'Bray-Dunes', small: true }, { x: 2010, y: 480, text: 'La Panne', small: true },
        { x: 862, y: 1520, text: 'Bergues', dot: false }, { x: 2210, y: 990, text: 'Furnes', small: true }, { x: 1700, y: 900, text: 'flooded fields', small: true },
        { x: 1380, y: 1235, text: 'Bergues–Furnes canal', small: true, rotate: -.36 }, { x: 230, y: 760, text: 'oil tanks', small: true },
        { x: 1200, y: 300, text: 'to Dover ↑', small: true }
      ] },
    channel: { file: 'map3-nosmoke.jpg', altFile: 'map3.jpg', altFrom: 62, zoom: .46, seaEdges: ['top', 'left'], waves: { strength: .5 }, clouds: true,
      scale: { px: 163, label: '10 km' },
      routes: [
        { name: 'ROUTE Z · 39 sea miles', color: '#ff8a7a', pts: R3(ROUTE_Z), labelAt: (p => [p.x, p.y + 40])(m3(51.02, 1.95)) },
        { name: 'ROUTE X · 55 sea miles', color: '#ffc46b', pts: R3(ROUTE_X), labelAt: (p => [p.x, p.y])(m3(51.25, 2.05)) },
        { name: 'ROUTE Y · 87 sea miles', color: '#8fe0a0', pts: R3(ROUTE_Y), labelAt: (p => [p.x, p.y])(m3(51.44, 1.95)) }
      ],
      labels: [
        Object.assign(m3(51.125, 1.31), { text: 'Dover', dot: true }), Object.assign(m3(51.335, 1.42), { text: 'Ramsgate', dot: true, small: true }),
        Object.assign(m3(50.955, 1.86), { text: 'Calais', dot: true, small: true }), Object.assign(m3(51.035, 2.375), { text: 'Dunkirk', dot: true }),
        Object.assign(m3(51.215, 2.925), { text: 'Ostend', dot: true, small: true }), Object.assign(m3(51.25, 1.56), { text: 'Goodwin Sands', small: true }),
        Object.assign(m3(51.235, 2.66), { text: 'Kwinte Buoy', small: true })
      ] }
  },

  /* The oil tanks west of the port were set alight in the air raids of 27 May; from then the smoke and flames move on the
     beach map and the smoke shows on the Channel map. */
  fireFrom: 62,
  fx: { map: 'beaches',
    smoke: { file: 'fx/smoke.png', cols: 4, rows: 4, cellW: 354, cellH: 264, x: 11, y: 21, w: 1863, h: 1389 },
    flames: { file: 'fx/flames.png', cols: 4, rows: 2, cellW: 229, cellH: 256 },
    tanks: [ { x: 150, y: 834, h: 52, phase: 3 }, { x: 212, y: 837, h: 58, phase: 0 }, { x: 272, y: 829, h: 50, phase: 5 }, { x: 307, y: 827, h: 46, phase: 2 } ] },

  /* Date and running total of men landed in England (Admiralty figures by day; sources differ slightly). */
  calendar: [
    { t: 0,   date: '20 May', note: 'German tanks reach the sea' },
    { t: 12,  date: '21 May', note: 'The counter-attack at Arras' },
    { t: 24,  date: '24 May', note: 'The halt order' },
    { t: 36,  date: '25 May', note: 'Back to the coast' },
    { t: 50,  date: '26 May', total: 0 },
    { t: 62,  date: '27 May', total: 7669 },
    { t: 88,  date: '28 May', total: 25473 },
    { t: 102, date: '29 May', total: 72783 },
    { t: 128, date: '30 May', total: 126606 },
    { t: 142, date: '31 May', total: 194620 },
    { t: 156, date: '1 June', total: 259049 },
    { t: 170, date: '2 June', total: 285305 },
    { t: 182, date: '3 June', total: 312051 },
    { t: 194, date: '4 June', total: 338226 }
  ],

  /* ---------- Opening narration ---------- */
  intro: [
    {
      title: 'DUNKIRK, 1940',
      map: 'campaign',
      media: [
        { at: 0, file: '01-destroyer-dover.jpg', caption: 'Troops brought back from Dunkirk crowd the deck of a destroyer as she comes in to berth at Dover, 31 May 1940.', ref: 'Imperial War Museum H 1637', credit: 'Photo: Lt. Puttnam and Lt. Malindine, War Office official photographers. Public domain (UK Crown copyright expired)' }
      ],
      subtitle: '26 May – 4 June 1940 · the Strait of Dover',
      focus: m1(51.0, 2.4), zoom: .6,
      markers: [ Object.assign(m1(51.035, 2.375), { label: 'Dunkirk' }) ],
      auto: 14,
      lines: [
        { text: 'In nine days at the end of May 1940, more than 338,000 British and French soldiers were carried across the Channel from the harbour and beaches of Dunkirk.', tag: 'established' },
        { text: 'It was a defeat: the army left its guns, tanks and lorries behind. It was also a rescue that let Britain fight on.', tag: 'established' },
        { text: 'This introduction separates what the records show from what we have reconstructed for the map. Watch for the coloured tags.', tag: 'reconstruction' }
      ]
    },
    {
      title: 'The trap',
      map: 'campaign',
      focus: m1(50.75, 2.6), zoom: .5,
      markers: [ Object.assign(m1(50.62, 3.3), { label: 'British and French armies' }), Object.assign(m1(50.45, 1.9), { label: 'German tanks reach the sea, 20 May' }) ],
      auto: 20,
      lines: [
        { text: 'On 10 May the German Army invaded the Netherlands, Belgium and France. The British and the best French armies advanced into Belgium to meet it.', tag: 'established' },
        { text: 'The main German blow came further south, through the Ardennes. Its tanks crossed the Meuse at Sedan and raced west to the Channel coast, which they reached on 20 May.', tag: 'established' },
        { text: 'The armies in Belgium were cut off from the rest of France: the British Expeditionary Force, the French First Army and the Belgian Army, with their backs to the sea.', tag: 'established' }
      ]
    },
    {
      title: 'The armies',
      map: 'campaign',
      focus: m1(50.8, 2.8), zoom: .5,
      markers: [ Object.assign(m1(50.62, 3.35), { label: 'BEF' }), Object.assign(m1(51.02, 3.55), { label: 'Belgian Army' }), Object.assign(m1(50.42, 3.3), { label: 'French First Army' }) ],
      auto: 20,
      lines: [
        { text: 'The British Expeditionary Force, under Lord Gort, had about 390,000 men in France, of whom around 250,000 were in the fighting area in the north.', tag: 'estimate', cite: 'Ellis, The War in France and Flanders (1953), ch. 1 and appendices' },
        { text: 'Beside them stood the French First Army and the Belgian Army. Against them came two German army groups, with most of the tank divisions in the west.', tag: 'established' },
        { text: 'The armies on this map are shown as blocks with the usual military symbols: a cross for infantry, an oval for tanks.', tag: 'reconstruction' }
      ]
    },
    {
      title: 'The ships',
      map: 'channel',
      media: [
        { at: 0, file: '02-beach-queues.jpg', caption: 'British troops line up on the beach at Dunkirk to wait for the boats, late May 1940.', ref: 'Imperial War Museum NYP 68075', credit: 'Photo: unknown War Office photographer. Public domain (UK Crown copyright expired)' }
      ],
      focus: m3(51.15, 1.9), zoom: .5,
      markers: [ Object.assign(m3(51.125, 1.31), { label: 'Dover: Admiral Ramsay' }), Object.assign(m3(51.035, 2.375), { label: 'Dunkirk' }) ],
      auto: 20,
      lines: [
        { text: 'From his headquarters in the cliffs at Dover, Vice-Admiral Bertram Ramsay planned the evacuation. Its code name was Operation Dynamo.', tag: 'established' },
        { text: 'The Admiralty expected to lift perhaps 45,000 men in two days before the Germans closed in.', tag: 'official', cite: 'Ramsay’s despatch, London Gazette supplement 38017 (1947)' },
        { text: 'Destroyers, minesweepers, ferries and paddle steamers would do most of the work, joined later by hundreds of small boats: the little ships.', tag: 'established' }
      ]
    },
    {
      title: 'How to read this reenactment',
      map: 'channel',
      focus: m3(51.15, 1.9), zoom: .5,
      markers: [],
      auto: 16,
      lines: [
        { text: 'The story moves between three maps: the campaign in France and Belgium, the beaches and canals around Dunkirk, and the sea crossing.', tag: 'reconstruction' },
        { text: 'The date and the number of men brought home so far are shown in the top corner of the map.', tag: 'official', cite: 'Admiralty daily figures, as given by Ellis (1953), appendix' },
        { text: 'Positions, and which ship is shown where, are a reconstruction. Press “Explain this moment” at any point to pause and read more.', tag: 'reconstruction' }
      ]
    },
    {
      title: 'Cut off. What happens next?',
      map: 'campaign',
      focus: m1(50.9, 2.5),
      markers: [],
      choice: true,
      lines: [
        { text: 'The story continues on the map.', tag: 'established' },
        { text: 'Watch the reenactment: sixteen narrated chapters, from the German tanks reaching the sea to the last ship leaving Dunkirk, then a debrief on what it meant.', tag: 'established' },
        { text: 'Take command is coming later for this battle.', tag: 'reconstruction' }
      ]
    }
  ],

  /* ---------- Formations ---------- */
  formations: [
    // campaign map
    Object.assign({ id: 'bef', side: 'british', name: 'British Expeditionary Force', division: 'BEF', type: 'army', map: 'campaign', speed: 30, count: 'About 250,000 men in the north', confidence: 'estimate', note: 'Nine divisions under Lord Gort, holding the Escaut (Scheldt) line east of Lille when the German tanks reached the sea.' }, m1(50.62, 3.38)),
    Object.assign({ id: 'fr1', side: 'french', name: 'French First Army', division: 'French 1st Army', type: 'army', map: 'campaign', speed: 26, count: 'About a dozen divisions', confidence: 'estimate', note: 'Fought its way back toward Lille, where much of it was surrounded. Its stand there until 31 May held German divisions away from the Dunkirk perimeter.' }, m1(50.40, 3.32)),
    Object.assign({ id: 'bel', side: 'belgian', name: 'Belgian Army', division: 'Belgian Army', type: 'army', map: 'campaign', speed: 24, count: 'About 22 divisions', confidence: 'estimate', note: 'Held the line of the Lys on the British left until King Leopold III surrendered on 28 May.' }, m1(51.02, 3.58)),
    Object.assign({ id: 'pzw', side: 'german', name: 'Panzer Group Kleist', division: 'Panzers', kind: 'armour', type: 'army', map: 'campaign', speed: 60, hidden: true, count: 'Several tank divisions', confidence: 'established', note: 'The tank divisions that broke through at Sedan and reached the sea at Abbeville on 20 May, then turned north along the coast.' }, m1(50.25, 1.75)),
    Object.assign({ id: 'pzs', side: 'german', name: 'Panzer divisions of Hoth’s corps', division: 'Panzers (Rommel)', kind: 'armour', type: 'army', map: 'campaign', speed: 50, hidden: true, count: 'Two tank divisions', confidence: 'established', note: 'Including Rommel’s 7th Panzer Division, which was struck at Arras on 21 May.' }, m1(50.23, 2.95)),
    Object.assign({ id: 'agb', side: 'german', name: 'German Army Group B', division: 'Army Group B', type: 'army', map: 'campaign', speed: 26, count: 'Infantry armies pressing from the east', confidence: 'established', note: 'The infantry armies that had advanced through Belgium and pushed the Allies back from the east.' }, m1(50.88, 3.98)),
    Object.assign({ id: 'frank', side: 'british', name: 'Frankforce (Arras counter-attack)', division: 'Frankforce', type: 'unit', kind: 'mixed', map: 'campaign', speed: 40, hidden: true, count: 'Two tank battalions and two infantry battalions', confidence: 'established', note: 'The British counter-attack south of Arras on 21 May. It failed, but it alarmed the German command.' }, m1(50.36, 2.92)),
    Object.assign({ id: 'calais', side: 'british', name: 'Calais garrison (30th Brigade)', division: 'Calais', type: 'unit', map: 'campaign', count: 'About 4,000 British and French troops', confidence: 'established', note: 'Held Calais until 26 May, keeping German tanks busy while the corridor to Dunkirk formed.' }, m1(50.955, 1.86)),

    // beach map: the perimeter
    { id: 'b-bergues', side: 'british', name: 'British rearguard at Bergues', division: 'Rearguard, Bergues', type: 'unit', map: 'beaches', x: 900, y: 1380, count: 'Battalions of 1st Division', confidence: 'official', note: 'The old walled town of Bergues anchored the corner of the canal line. The British held it until 1 June, then the French.' },
    { id: 'b-canal', side: 'british', name: 'British divisions on the Bergues–Furnes canal', division: 'BEF on the canal', type: 'unit', map: 'beaches', x: 1500, y: 1150, count: 'Several divisions, thinning daily', confidence: 'official', note: 'Gort’s corps held the eastern half of the perimeter, along the canal from Bergues to Furnes.' },
    { id: 'b-furnes', side: 'british', name: 'British troops at Furnes and Nieuport', division: 'BEF, Furnes', type: 'unit', map: 'beaches', x: 2150, y: 880, count: 'II Corps, then 3rd and 4th Divisions', confidence: 'official', note: 'The eastern corner, where the gap left by the Belgian surrender had to be filled on 28 May.' },
    { id: 'b-nieuport', side: 'british', name: 'British troops at Nieuport', division: 'Nieuport', type: 'unit', map: 'beaches', x: 2290, y: 540, hidden: true, count: 'Hurried in on 28 May', confidence: 'official', note: 'Rushed to the coast end of the line when the Belgian Army stopped fighting.' },
    { id: 'f-west', side: 'french', name: 'French XVI Corps (west of Dunkirk)', division: 'French, Mardyck canal', type: 'unit', map: 'beaches', x: 230, y: 1130, count: 'Admiral Abrial’s command', confidence: 'established', note: 'The French held the western half of the perimeter throughout, and the whole of it at the end.' },
    { id: 'f-bergues', side: 'french', name: 'French troops south of Dunkirk', division: 'French rearguard', type: 'unit', map: 'beaches', x: 560, y: 1450, count: 'French divisions', confidence: 'established', note: 'Held the line after the British had gone, until the morning of 4 June.' },
    { id: 'g-west', side: 'german', name: 'German divisions west of Dunkirk', division: 'German, Gravelines', type: 'unit', map: 'beaches', x: 150, y: 1720, count: 'Infantry and tanks from the Aa canal', confidence: 'established', note: 'Pressing on the French sector from the west.' },
    { id: 'g-south', side: 'german', name: 'German divisions south of Bergues', division: 'German, Bergues', type: 'unit', map: 'beaches', x: 900, y: 1740, count: 'Infantry divisions', confidence: 'established', note: 'Attacked the canal line around Bergues.' },
    { id: 'g-se', side: 'german', name: 'German divisions on the canal', division: 'German, Hondschoote', type: 'unit', map: 'beaches', x: 1650, y: 1560, count: 'Infantry divisions', confidence: 'established', note: 'Crossed the Bergues–Furnes canal in places on 1 June.' },
    { id: 'g-east', side: 'german', name: 'German divisions from Belgium', division: 'German, Furnes', type: 'unit', map: 'beaches', x: 2390, y: 1100, hidden: true, count: 'Army Group B', confidence: 'established', note: 'Came up through Belgium after the surrender to attack Nieuport and Furnes.' },
    // the queues on the beaches and the mole
    { id: 'q-mole', side: 'british', name: 'Men queueing on the East Mole', division: 'Mole', type: 'queue', map: 'beaches', x: MOLE_BASE.x, y: MOLE_BASE.y, facing: -1.97, cols: 2, rows: 30, hidden: true, count: 'Thousands an hour at its best', confidence: 'established', note: 'The long breakwater of the outer harbour. Ships tied up alongside it, and most of the men left this way.' },
    { id: 'q-malo', side: 'british', name: 'Men queueing on Malo beach', division: 'Malo', type: 'queue', map: 'beaches', x: 1065, y: 745, facing: SEAWARD, cols: 3, rows: 22, hidden: true, count: '', confidence: 'established', note: '' },
    { id: 'q-bray', side: 'british', name: 'Men queueing at Bray-Dunes', division: 'Bray-Dunes', type: 'queue', map: 'beaches', x: 1700, y: 552, facing: SEAWARD, cols: 3, rows: 24, hidden: true, count: '', confidence: 'established', note: '' },
    { id: 'q-panne', side: 'british', name: 'Men queueing at La Panne', division: 'La Panne', type: 'queue', map: 'beaches', x: 2050, y: 418, facing: SEAWARD, cols: 3, rows: 20, hidden: true, count: '', confidence: 'established', note: '' },
    // ships off the beaches
    { id: 'dd-mole', side: 'navy', name: 'Destroyer alongside the mole', type: 'ship', cls: 'destroyer', map: 'beaches', x: 760, y: 470, facing: -2.0, speed: 30, hidden: true, crowded: true },
    { id: 'ferry-mole', side: 'navy', name: 'Cross-Channel ferry', type: 'ship', cls: 'ferry', map: 'beaches', x: 660, y: 330, facing: 1.2, speed: 30, hidden: true, crowded: true },
    { id: 'dd-1', side: 'navy', name: 'Destroyer off Bray-Dunes', type: 'ship', cls: 'destroyer', map: 'beaches', x: 1560, y: 330, facing: .35, speed: 28, hidden: true },
    { id: 'dd-2', side: 'navy', name: 'Destroyer off La Panne', type: 'ship', cls: 'destroyer', map: 'beaches', x: 1930, y: 220, facing: .3, speed: 28, hidden: true },
    { id: 'sw-1', side: 'navy', name: 'Minesweeper', type: 'ship', cls: 'sweeper', map: 'beaches', x: 1180, y: 450, facing: .3, speed: 24, hidden: true },
    { id: 'ps-1', side: 'navy', name: 'Paddle steamer', type: 'ship', cls: 'steamer', map: 'beaches', x: 1320, y: 420, facing: -.2, speed: 22, hidden: true },
    { id: 'lit-1', side: 'navy', name: 'Little ships', type: 'ship', cls: 'little', map: 'beaches', x: 1300, y: 120, facing: 1.4, speed: 30, hidden: true },
    { id: 'lit-2', side: 'navy', name: 'Little ships', type: 'ship', cls: 'little', map: 'beaches', x: 1700, y: 80, facing: 1.4, speed: 30, hidden: true },
    { id: 'lit-3', side: 'navy', name: 'Little ships', type: 'ship', cls: 'little', map: 'beaches', x: 2100, y: 40, facing: 1.4, speed: 30, hidden: true },
    { id: 'lit-4', side: 'navy', name: 'Little ships', type: 'ship', cls: 'little', map: 'beaches', x: 1000, y: 160, facing: 1.4, speed: 30, hidden: true },
    // aircraft over the beaches
    { id: 'stuka-1', side: 'german', name: 'Stuka dive bombers', label: 'Ju 87 Stukas', type: 'aircraft', cls: 'stuka', count: 3, map: 'beaches', x: -200, y: 1200, speed: 260, hidden: true },
    { id: 'stuka-2', side: 'german', name: 'Stuka dive bombers', label: 'Ju 87 Stukas', type: 'aircraft', cls: 'stuka', count: 3, map: 'beaches', x: 2600, y: 900, speed: 260, hidden: true },
    { id: 'bomb-1', side: 'german', name: 'German bombers', label: 'He 111 bombers', type: 'aircraft', cls: 'bomber', count: 3, map: 'beaches', x: 2600, y: 1500, speed: 200, hidden: true },
    { id: 'raf-1', side: 'british', name: 'RAF fighters', label: 'RAF Spitfires', type: 'aircraft', cls: 'spitfire', count: 3, map: 'beaches', x: 1200, y: -200, speed: 300, hidden: true },

    // Channel map: convoys on the routes
    Object.assign({ id: 'z-ferry', side: 'navy', name: 'Ferries on route Z', label: 'ferries, route Z', type: 'ship', cls: 'ferry', map: 'channel', speed: 70, hidden: true, scale: 1.2 }, m3(...DOVER)),
    Object.assign({ id: 'x-dd', side: 'navy', name: 'Destroyers on route X', label: 'destroyers, route X', type: 'ship', cls: 'destroyer', map: 'channel', speed: 80, hidden: true, scale: 1.2, crowded: true }, m3(...DK3)),
    Object.assign({ id: 'y-dd', side: 'navy', name: 'Destroyer Wakeful', label: 'HMS Wakeful', type: 'ship', cls: 'destroyer', map: 'channel', speed: 80, hidden: true, scale: 1.2, crowded: true }, m3(...DK3)),
    Object.assign({ id: 'eboat', side: 'german', name: 'German E-boat S-30', label: 'E-boat', type: 'ship', cls: 'eboat', map: 'channel', speed: 90, hidden: true, scale: 1.4 }, m3(51.30, 2.95)),
    Object.assign({ id: 'little-fleet', side: 'navy', name: 'The little ships', label: 'little ships from Ramsgate', type: 'ship', cls: 'little', map: 'channel', speed: 45, hidden: true, scale: 1.8 }, m3(51.32, 1.44)),
    Object.assign({ id: 'last-ship', side: 'navy', name: 'HMS Shikari', label: 'HMS Shikari, the last ship', type: 'ship', cls: 'destroyer', map: 'channel', speed: 75, hidden: true, scale: 1.2, crowded: true }, m3(...DK3)),
    Object.assign({ id: 'luft-3', side: 'german', name: 'German bombers', label: 'Luftwaffe', type: 'aircraft', cls: 'bomber', count: 3, map: 'channel', speed: 220, hidden: true }, m3(50.80, 2.90))
  ],

  /* ---------- Watch mode: the story, chapter by chapter ---------- */
  events: [
    { t: 0, map: 'campaign', title: 'The tanks reach the sea', tag: 'established', focus: m1(50.6, 2.4),
      text: '20 May. German tank divisions that broke through at Sedan reach the Channel coast near Abbeville. The Allied armies in Belgium are cut off from the rest of France.',
      explain: 'The Allied plan had sent the best British and French troops forward into Belgium. The German main effort went through the wooded Ardennes, which the French thought too difficult for tanks, and cut in behind them.',
      orders: [ { id: 'pzw', visible: true, route: R1([[50.25, 1.75], [50.45, 1.80], [50.62, 1.85]]) }, { id: 'pzs', visible: true, to: m1(50.26, 2.75) },
        { id: 'bef', to: m1(50.64, 3.25) }, { id: 'agb', to: m1(50.86, 3.75) } ] },
    { t: 12, map: 'campaign', title: 'Counter-attack at Arras', tag: 'established', focus: m1(50.35, 2.8),
      text: '21 May. British tanks and infantry strike south of Arras into Rommel’s 7th Panzer Division. The attack is beaten off, but it shakes the German command.',
      explain: 'Only two tank battalions took part, many of their tanks slow Matildas armed with machine guns. Rommel reported being attacked by hundreds of tanks. The scare fed the German caution of the following days.',
      cite: 'Rommel’s report of 21 May; Ellis (1953), ch. 6',
      orders: [ { id: 'frank', visible: true, route: R1([[50.36, 2.92], [50.30, 2.78], [50.25, 2.70]]) }, { id: 'pzs', to: m1(50.32, 2.62), strengthTo: 80, over: 6 },
        { id: 'pzw', route: R1([[50.62, 1.85], [50.73, 1.72], [50.88, 1.86]]) } ] },
    { t: 24, map: 'campaign', title: 'The halt order', tag: 'german', focus: m1(50.85, 2.2),
      text: '24 May. With Boulogne taken and Calais surrounded, the German tanks stop on the Aa canal, about 25 km from Dunkirk. They wait there for three days.',
      explain: 'Rundstedt, commanding Army Group A, halted the tanks to rest and repair them, and Hitler confirmed the order. Göring promised the Luftwaffe could finish the trapped armies alone. Why the order was given is still argued about.',
      cite: 'Halder’s war diary, 24–26 May 1940; Army Group A war diary',
      orders: [ { id: 'pzw', route: R1([[50.88, 1.86], [50.93, 2.05], [50.90, 2.16]]) }, { id: 'pzs', to: m1(50.55, 2.55) }, { id: 'frank', to: m1(50.45, 2.95), state: 'rout', strengthTo: 50, over: 4, then: 'withdrawn' },
        { id: 'agb', to: m1(50.85, 3.45) }, { id: 'bel', to: m1(51.04, 3.40) } ] },
    { t: 36, map: 'campaign', title: 'Back to the coast', tag: 'established', focus: m1(50.8, 2.7),
      text: '25–28 May. Gort gives up the planned attack south and orders his army back to Dunkirk. A corridor is held open while the divisions march north, with rearguards at Cassel and Wormhout.',
      explain: 'Gort decided on the evening of 25 May without waiting for London or the French command: he sent the two divisions meant for the attack south to fill a gap opening on the Belgian front. Many historians count it the decision that saved the army.',
      cite: 'Gort’s despatch, London Gazette supplement 35305 (1941)',
      orders: [ { id: 'bef', route: R1([[50.64, 3.25], [50.72, 3.00], [50.82, 2.75], [50.93, 2.58], [51.0, 2.48]]) }, { id: 'fr1', to: m1(50.60, 3.06), strengthTo: 45, over: 12 },
        { id: 'bel', to: m1(51.08, 3.20), strengthTo: 60, over: 10 }, { id: 'agb', to: m1(50.90, 3.20) }, { id: 'calais', state: 'destroyed' } ] },
    { t: 50, map: 'channel', title: 'Operation Dynamo begins', tag: 'official', focus: m3(51.12, 1.9),
      text: '26 May, 18:57. The Admiralty signals Ramsay to begin Operation Dynamo. The first ships sail for Dunkirk on the short route, route Z, along the French coast.',
      explain: 'Some men had already been brought home from Dunkirk over the previous days: wounded and rear-area troops. Dynamo was the order to bring off the fighting army. Nobody expected more than a fraction of it to be saved.',
      cite: 'Ramsay’s despatch, London Gazette supplement 38017 (1947)',
      orders: [ { id: 'z-ferry', visible: true, route: R3(ROUTE_Z.slice().reverse()) } ] },
    { t: 62, map: 'channel', title: 'Route Z under fire', tag: 'official', focus: m3(51.05, 1.95),
      text: '27 May. German guns near Calais shell the ships on route Z, the shortest route. By daylight it can no longer be used, and ships must take routes much longer around the sandbanks.',
      explain: 'Route Z was 39 sea miles; the longer route Y, east around the banks, was 87, more than doubling the turnaround time. Minesweepers set to work clearing a middle route, X.',
      cite: 'Ramsay’s despatch, London Gazette supplement 38017 (1947)',
      orders: [ { fx: 'bombs', at: m3(51.035, 1.86), n: 8, r: 45, sea: true, every: .5 }, { id: 'z-ferry', route: R3(ROUTE_Z), state: 'move' }, { id: 'x-dd', visible: true, route: R3(BACK(ROUTE_Y)) } ] },
    { t: 74, map: 'beaches', title: 'The East Mole', tag: 'established', focus: { x: 900, y: 650 },
      text: '27 May. The harbour is wrecked and burning. Captain William Tennant, sent to run the evacuation ashore, tries the long breakwater of the outer harbour, the East Mole, as a quay. It works.',
      explain: 'The mole was never built for ships to tie up to: it was a narrow concrete and timber walkway on piles. But destroyers could lie alongside it, and men could file along it four abreast. Most of the army would leave this way.',
      cite: 'Tennant’s report; Ellis (1953), ch. 12',
      orders: [ { fx: 'bombs', at: { x: 700, y: 820 }, n: 7, r: 110 }, { id: 'q-mole', visible: true }, { id: 'dd-mole', visible: true, to: { x: 812, y: 585 }, speed: 20 },
        { id: 'q-malo', visible: true, strength: 40 } ] },
    { t: 88, map: 'beaches', title: 'The perimeter', tag: 'official', focus: { x: 1500, y: 1050 },
      text: '28 May. King Leopold surrenders the Belgian Army. British troops race to close the gap at Nieuport. The perimeter is now a line of canals around Dunkirk: French in the west, British from Bergues to Nieuport.',
      explain: 'The French opened sluices to flood the low fields, making the ground hard for tanks. Inside the line the roads filled with abandoned lorries and guns, wrecked on purpose so the Germans could not use them.',
      cite: 'Gort’s despatch, London Gazette supplement 35305 (1941)',
      orders: [ { id: 'b-nieuport', visible: true, to: { x: 2270, y: 560 } }, { id: 'g-east', visible: true, to: { x: 2330, y: 1000 } }, { id: 'g-south', to: { x: 900, y: 1600 } }, { id: 'g-west', to: { x: 200, y: 1560 } },
        { id: 'q-bray', visible: true, strength: 50 }, { id: 'q-panne', visible: true, strength: 50 }, { id: 'q-malo', strength: 80 }, { id: 'dd-1', visible: true }, { id: 'dd-2', visible: true } ] },
    { t: 102, map: 'beaches', title: 'Air attack on the ships', tag: 'established', focus: { x: 1100, y: 600 },
      text: '29 May. The Luftwaffe attacks the harbour and the ships in strength. The destroyer Grenade is hit alongside the mole and sinks; others are lost or damaged. Still, 47,000 men are brought home.',
      explain: 'The smoke from the burning oil tanks hid the harbour on some days and marked it on others. RAF fighters flew patrols over Dunkirk from bases in England, but at the edge of their range they could not be there all the time, and the men on the beaches rarely saw them.',
      cite: 'Ramsay’s despatch; Ellis (1953), ch. 13',
      orders: [ { id: 'stuka-1', visible: true, route: [[-200, 1100], [700, 620], [1600, 200], [2700, -200]], then: 'withdrawn' }, { fx: 'bombs', at: { x: 820, y: 600 }, n: 6, r: 70, sea: true, every: .4 },
        { id: 'dd-mole', state: 'sinking' }, { id: 'raf-1', visible: true, route: [[1400, -200], [1200, 600], [900, 1100], [500, 2000]], then: 'withdrawn' }, { id: 'ferry-mole', visible: true, to: { x: 800, y: 530 } },
        { id: 'sw-1', visible: true }, { id: 'ps-1', visible: true } ] },
    { t: 116, map: 'channel', title: 'Night on route Y', tag: 'official', focus: m3(51.25, 2.45),
      text: 'Night of 28–29 May. Off the Kwinte Buoy on route Y, a German E-boat torpedoes the destroyer Wakeful, crowded with troops. She breaks in two and sinks in seconds; nearly all the 640 soldiers aboard are lost.',
      explain: 'The long route Y passed close to the Belgian coast at its eastern end, within reach of German E-boats at night and aircraft by day. Losses like the Wakeful’s are why route X, through the minefields, was cleared and used from 29 May.',
      cite: 'Ramsay’s despatch; Ellis (1953), ch. 13',
      orders: [ { id: 'y-dd', visible: true, route: R3(ROUTE_Y.slice(0, 4)) }, { id: 'eboat', visible: true, to: m3(51.24, 2.68) }, { id: 'x-dd', route: R3(ROUTE_X) } ] },
    { t: 128, map: 'beaches', title: 'The little ships', tag: 'established', focus: { x: 1500, y: 400 },
      text: '30 May. Small boats arrive off the beaches in numbers: yachts, fishing boats, lifeboats and pleasure launches, many crewed by their owners. They ferry men out from the shallows to the bigger ships.',
      explain: 'The Small Vessels Pool had been gathering boats for a week. Most were taken over and crewed by the Navy, but many civilians went too. Their great value was reaching the beaches, where the larger ships could not come in close.',
      cite: 'Ramsay’s despatch; Masefield, The Nine Days Wonder (1941)',
      orders: [ { id: 'lit-1', visible: true, to: { x: 1560, y: 470 } }, { id: 'lit-2', visible: true, to: { x: 1880, y: 360 } }, { id: 'lit-3', visible: true, to: { x: 2180, y: 260 } }, { id: 'lit-4', visible: true, to: { x: 1180, y: 640 } },
        { id: 'q-bray', strength: 100 }, { id: 'q-panne', strength: 100 }, { id: 'q-malo', strength: 100 } ] },
    { t: 142, map: 'beaches', title: 'The biggest day', tag: 'official', focus: { x: 1300, y: 600 },
      text: '31 May. 68,014 men are brought home, the most of any day. Lord Gort hands over command to Major-General Harold Alexander and sails for England, as ordered.',
      explain: 'The beaches were hard to work from: heavy surf on 31 May overturned boats, and men waded out to their shoulders. The lorry jetties, lines of army lorries driven into the sea and decked over, helped boats come alongside.',
      cite: 'Admiralty daily returns; Ellis (1953), ch. 14',
      orders: [ { id: 'dd-1', to: { x: 1600, y: 380 } }, { id: 'lit-1', to: { x: 1620, y: 420 } }, { id: 'lit-2', to: { x: 1820, y: 330 } },
        { id: 'g-se', to: { x: 1600, y: 1300 } }, { id: 'g-east', to: { x: 2280, y: 950 } }, { id: 'b-canal', strengthTo: 70, over: 10 }, { id: 'b-furnes', strengthTo: 60, over: 10 } ] },
    { t: 156, map: 'beaches', title: '1 June: the worst day at sea', tag: 'official', focus: { x: 1000, y: 550 },
      text: '1 June. In clear weather the Luftwaffe sinks the destroyers Keith, Basilisk and Havant and many other vessels. German troops cross the canal near Bergues. From now on ships may come only at night.',
      explain: 'The day’s losses decided Ramsay to stop sailings in daylight. Even so, more than 64,000 men were brought off on 1 June.',
      cite: 'Ramsay’s despatch, London Gazette supplement 38017 (1947)',
      orders: [ { id: 'stuka-2', visible: true, route: [[2600, 800], [1700, 450], [900, 400], [-300, 300]], then: 'withdrawn' }, { id: 'bomb-1', visible: true, route: [[2600, 1500], [1500, 800], [700, 500], [-300, 0]], then: 'withdrawn' },
        { fx: 'bombs', at: { x: 1600, y: 360 }, n: 7, r: 90, sea: true, every: .4 }, { id: 'dd-1', state: 'sinking' }, { id: 'ps-1', state: 'sinking' },
        { id: 'g-south', to: { x: 900, y: 1470 } }, { id: 'b-bergues', to: { x: 780, y: 1150 }, strengthTo: 50, over: 6 }, { id: 'g-se', to: { x: 1500, y: 1210 } } ] },
    { t: 170, map: 'beaches', title: 'The last British troops', tag: 'official', focus: { x: 900, y: 700 },
      text: '2 June. The British rearguard falls back through the town to the mole. At 23:30 Captain Tennant signals Dover: “BEF evacuated.”',
      explain: 'About 198,000 British soldiers were brought home. Tens of thousands of British troops had already been captured or killed in the campaign, and the army left behind almost all its equipment: some 2,500 guns, 64,000 vehicles and 76,000 tons of ammunition.',
      cite: 'Tennant’s signal, 2 June 1940; Ellis (1953), ch. 15 and appendices',
      orders: [ { id: 'b-canal', to: { x: 1300, y: 850 }, strengthTo: 20, over: 8, then: 'withdrawn' }, { id: 'b-furnes', to: { x: 1900, y: 600 }, then: 'withdrawn' }, { id: 'b-nieuport', to: { x: 2100, y: 450 }, then: 'withdrawn' },
        { id: 'b-bergues', to: { x: 900, y: 780 }, then: 'withdrawn' }, { id: 'q-bray', state: 'withdrawn' }, { id: 'q-panne', state: 'withdrawn' }, { id: 'q-malo', strength: 30 },
        { id: 'g-east', to: { x: 2000, y: 750 } }, { id: 'g-se', to: { x: 1400, y: 950 } }, { id: 'lit-3', to: { x: 2300, y: 0 }, then: 'withdrawn' } ] },
    { t: 182, map: 'beaches', title: 'The French rearguard', tag: 'established', focus: { x: 700, y: 1000 },
      text: '3 June. French troops hold the shrinking line while their comrades are taken off from the mole. Ships return night after night until the end.',
      explain: 'The French had defended the western sector from the beginning and the whole line at the end. About 139,000 French soldiers were brought to England; most went back to France within days to fight on, until France asked for an armistice on 17 June.',
      cite: 'Ellis (1953), ch. 15; French official history',
      orders: [ { id: 'f-west', to: { x: 420, y: 1000 }, strengthTo: 50, over: 8 }, { id: 'f-bergues', to: { x: 640, y: 1150 }, strengthTo: 50, over: 8 }, { id: 'g-west', to: { x: 320, y: 1300 } }, { id: 'g-south', to: { x: 820, y: 1250 } },
        { id: 'q-mole', strength: 70 }, { id: 'ferry-mole', to: { x: 815, y: 560 } }, { id: 'q-malo', state: 'withdrawn' } ] },
    { t: 194, map: 'channel', title: 'The last ship', tag: 'official', focus: m3(51.08, 1.85),
      text: '4 June, 03:40. The destroyer Shikari leaves the mole, the last ship out. At 10:20 the Germans enter Dunkirk; about 35,000 French soldiers of the rearguard are taken prisoner.',
      explain: 'The Admiralty ended Operation Dynamo at 14:23 on 4 June. In nine days about 338,000 men had been landed in England, of them about 139,000 French and other Allied soldiers.',
      cite: 'Ramsay’s despatch; Ellis (1953), ch. 15',
      orders: [ { id: 'last-ship', visible: true, route: R3(ROUTE_X) }, { id: 'luft-3', visible: true, route: R3([[50.80, 2.90], [51.10, 2.40], [51.40, 1.60]]), then: 'withdrawn' } ] },
    { t: 206, map: 'channel', title: 'Operation Dynamo ends', tag: 'established', focus: m3(51.15, 1.6), end: true,
      text: '4 June. That afternoon Churchill tells the House of Commons that “we must be very careful not to assign to this deliverance the attributes of a victory. Wars are not won by evacuations.”',
      explain: 'The same speech ends with “we shall fight on the beaches”. The army that came home without its weapons became the core of the forces that held Britain in 1940 and fought on until 1945.',
      cite: 'Hansard, House of Commons, 4 June 1940',
      orders: [] }
  ],

  outcome: [
    { text: 'About 338,000 men were brought to England between 26 May and 4 June: about 198,000 British and 139,000 French and other Allied soldiers.', tag: 'official', cite: 'Admiralty figures, as given by Ellis (1953)' },
    { text: 'Of the more than 900 vessels that took part, about 240 were lost, among them six British and three French destroyers; the totals vary between sources. The RAF lost about 145 aircraft over Dunkirk.', tag: 'estimate' },
    { text: 'The BEF left behind nearly all its heavy equipment: about 2,500 guns, 64,000 vehicles and 76,000 tons of ammunition.', tag: 'official', cite: 'Ellis (1953), appendices' },
    { text: 'About 35,000 French soldiers of the rearguard were captured when the town fell on 4 June. France signed an armistice on 22 June.', tag: 'estimate' },
    { text: 'Britain fought on. The rescued soldiers became the core of the army that would return to France in 1944.', tag: 'established' }
  ],

  welcome: 'Welcome to Battles of History. Today we are learning about Dunkirk, where in nine days at the end of May 1940 more than three hundred thousand British and French soldiers were rescued from the beaches and harbour of Dunkirk in France.',
  establishing: [
    { file: 'establish-1-channel.jpg', secs: 5, pulse: { x: .617, y: .596 }, credit: 'Artist rendering: the Strait of Dover with Dunkirk on the French coast. Battle Games, AI-generated.' }
  ],
  imageBase: 'images/',
  voices: [],

  commandLines: {},

  units: [
    { id: 'british-infantry', side: 'british', type: 'unit', kind: 'infantry', name: 'British infantry', desc: 'The British Expeditionary Force: regular and Territorial divisions, mostly on foot.', tag: 'established',
      photos: ['02-beach-queues.jpg', '01-destroyer-dover.jpg'],
      lines: [
        { text: 'The BEF went to France in 1939: by May 1940 it had ten infantry divisions in the field and three more for labour and line-of-communication work, plus one tank brigade.', tag: 'official', cite: 'Ellis (1953), ch. 1' },
        { text: 'The soldier wore the steel helmet and serge battledress, and carried the Lee-Enfield rifle. Each section had a Bren light machine gun.', tag: 'established' },
        { text: 'At Dunkirk most men came home with their rifles and little else. The army’s guns, lorries and tanks were wrecked and left behind.', tag: 'established' }
      ] },
    { id: 'french-infantry', side: 'french', type: 'unit', kind: 'infantry', name: 'French infantry', desc: 'The French First Army and the troops of the Dunkirk garrison.', tag: 'established',
      photos: [],
      lines: [
        { text: 'France had the largest army in western Europe. The divisions trapped in the north were among its best and most modern.', tag: 'established' },
        { text: 'Part of the First Army, surrounded at Lille, fought on until 31 May and held off several German divisions that might otherwise have reached the perimeter.', tag: 'established' },
        { text: 'French troops held the western half of the perimeter throughout and the whole line at the end. About 139,000 were brought to England.', tag: 'estimate' }
      ] },
    { id: 'german-panzer', side: 'german', type: 'unit', kind: 'armour', name: 'German panzer division', desc: 'Tanks, motorised infantry and dive bombers working together.', tag: 'established',
      photos: [],
      lines: [
        { text: 'The ten German tank divisions of 1940 were concentrated for the blow through the Ardennes and the drive to the sea.', tag: 'established' },
        { text: 'Most German tanks were lighter than the best French and British ones. Their strength was speed, radio, and close work with the Luftwaffe.', tag: 'established' },
        { text: 'On 24 May the tanks were halted on the Aa canal for three days. By the time they moved again, the perimeter was in place.', tag: 'german', cite: 'Army Group A war diary; Halder’s war diary' }
      ] },
    { id: 'destroyer', side: 'navy', type: 'ship', cls: 'destroyer', name: 'Royal Navy destroyer', desc: 'Fast warships that carried more men than any other kind of vessel.', tag: 'established',
      photos: ['01-destroyer-dover.jpg'],
      lines: [
        { text: 'Destroyers brought home more men than any other kind of ship, often 600 to 900 at a time, packed on deck and below.', tag: 'estimate' },
        { text: 'Six British destroyers were sunk and many more damaged: Grafton, Grenade, Wakeful, Basilisk, Havant and Keith.', tag: 'official', cite: 'Ramsay’s despatch' },
        { text: 'Ships in this reenactment are shown where the story needs them; their exact positions are a reconstruction.', tag: 'reconstruction' }
      ] },
    { id: 'little-ships', side: 'navy', type: 'ship', cls: 'little', name: 'The little ships', desc: 'Yachts, fishing boats, lifeboats and launches, many crewed by volunteers.', tag: 'established',
      photos: [],
      lines: [
        { text: 'Hundreds of small craft were gathered from the Thames and the south coast from 27 May onward.', tag: 'established' },
        { text: 'Their main work was ferrying men from the shallows to the larger ships offshore. Many were lost or wrecked on the beaches.', tag: 'established' },
        { text: 'The Association of Dunkirk Little Ships still keeps more than a hundred of them sailing today.', tag: 'established' }
      ] },
    { id: 'stuka', side: 'german', type: 'aircraft', cls: 'stuka', name: 'Ju 87 Stuka', desc: 'The German dive bomber, with its wailing siren.', tag: 'established',
      photos: [],
      lines: [
        { text: 'Dive bombers attacked the harbour, the mole and the ships, while twin-engined bombers struck the town and the beaches.', tag: 'established' },
        { text: 'The soft sand of the beaches absorbed much of the blast: bombs that would have been deadly on hard ground often did less harm there.', tag: 'established' },
        { text: 'Göring had promised the Luftwaffe would destroy the trapped armies. Bad weather on several days, and the RAF, stopped it doing so.', tag: 'german' }
      ] },
    { id: 'spitfire', side: 'british', type: 'aircraft', cls: 'spitfire', name: 'RAF fighters', desc: 'Spitfires and Hurricanes flying from bases in south-east England.', tag: 'established',
      photos: [],
      lines: [
        { text: 'Fighter Command flew patrols over Dunkirk throughout the evacuation, often fighting inland or above the clouds where the men on the beaches could not see them.', tag: 'established' },
        { text: 'The RAF lost about 145 aircraft over Dunkirk. The Luftwaffe lost a similar number.', tag: 'estimate' }
      ] }
  ],

  citations: {
    established: { title: 'Established', intro: 'Accepted by historians on the evidence of British, French and German records.', items: [
      { ref: 'L. F. Ellis, The War in France and Flanders 1939–1940 (HMSO, 1953)', note: 'The British Official History; chapters 12–15 cover the evacuation.' },
      { ref: 'W. Lord, The Miracle of Dunkirk (1982)', note: 'A narrative built on hundreds of interviews.' },
      { ref: 'H. Sebag-Montefiore, Dunkirk: Fight to the Last Man (2006)', note: 'The land battle and the rearguards.' }
    ] },
    official: { title: 'British official accounts', intro: 'The commanders’ reports, published after the war in the London Gazette, and the Official History.', items: [
      { ref: 'Lord Gort’s despatches, London Gazette supplement 35305 (17 October 1941)', note: 'The BEF from 1939 to the evacuation, including the perimeter and its canal line.' },
      { ref: 'Admiral Ramsay’s report on Operation Dynamo, London Gazette supplement 38017 (17 July 1947)', note: 'The naval side: routes X, Y and Z, ships and losses.' },
      { ref: 'L. F. Ellis, The War in France and Flanders 1939–1940 (HMSO, 1953), appendices', note: 'Daily evacuation figures and losses.' }
    ] },
    german: { title: 'German account', intro: 'German war diaries and orders, which show why the tanks halted and how the German command saw the battle.', items: [
      { ref: 'Franz Halder, war diary, May–June 1940', note: 'The Army chief of staff’s daily notes, including his frustration at the halt order.' },
      { ref: 'Army Group A war diary', note: 'Rundstedt’s headquarters and the halt of 24 May.' }
    ] },
    estimate: { title: 'Estimate', intro: 'Figures the sources give differently, or modern estimates.', items: [
      { ref: 'Admiralty and War Office figures', note: 'Daily totals differ slightly between sources; this reenactment uses the Admiralty figures that sum to 338,226.' }
    ] },
    reconstruction: { title: 'Reconstruction', intro: 'Choices made so the evacuation can be watched in a few minutes.', items: [
      { ref: 'The maps', note: 'Painted for this game from layout guides drawn from real coordinates (tools/draw-layout-guides.py). The beach map is a closer, less exact view.' },
      { ref: 'Ships and aircraft', note: 'A handful of ships and aircraft stand for hundreds. Which ship is shown where is our choice.' }
    ] }
  },

  library: [
    { title: 'Despatch: Operations of the British Expeditionary Force, 1939–1940 (Lord Gort)', author: 'Lord Gort', year: '1941', kind: 'Official report', about: 'Gort’s two despatches, published in the London Gazette.', citedIn: 'British official accounts', rights: 'Published 1941. UK Crown copyright has expired.', local: null, archive: 'https://www.thegazette.co.uk/London/issue/35305/supplement/5899' },
    { title: 'Report: The Evacuation of the Allied Armies from Dunkirk (Admiral Ramsay)', author: 'Vice-Admiral Sir Bertram Ramsay', year: '1947', kind: 'Official report', about: 'Ramsay’s report on Operation Dynamo, published in the London Gazette.', citedIn: 'British official accounts', rights: 'Published 1947. UK Crown copyright has expired.', local: null, archive: 'https://www.ibiblio.org/hyperwar/UN/UK/LondonGazette/38017.pdf' },
    { title: 'The War in France and Flanders 1939–1940', author: 'L. F. Ellis', year: '1953', kind: 'Official History', about: 'The British Official History of the campaign.', citedIn: 'Established', rights: 'Published 1953 by HMSO. UK Crown copyright has expired.', local: null, archive: 'https://www.ibiblio.org/hyperwar/UN/UK/UK-NWE-Flanders/' },
    { title: 'The Nine Days Wonder', author: 'John Masefield', year: '1941', kind: 'Contemporary account', about: 'The Poet Laureate’s short account of the evacuation, written within a year.', citedIn: 'The little ships', rights: 'Still in copyright: listed for reference.', local: null, linkOnly: true }
  ],

  sources: [
    { title: 'Gort’s and Ramsay’s despatches', note: 'The army and navy commanders’ own reports, London Gazette 1941 and 1947.' },
    { title: 'The British Official History', note: 'L. F. Ellis, The War in France and Flanders 1939–1940 (1953).' },
    { title: 'German war diaries', note: 'Halder and Army Group A, on the halt order and the battle for the perimeter.' },
    { title: 'Photographs', note: 'Imperial War Museum, UK Crown copyright expired.' }
  ]
};
})();
