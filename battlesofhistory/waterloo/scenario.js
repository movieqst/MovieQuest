/*
  Historical Scenario File — Battle of Waterloo, 18 June 1815
  ----------------------------------------------------------
  This single file drives BOTH experiences of the battle:
    • Watch mode  — the narrated reenactment (orders in `events`)
    • Command mode — the playable battle (the computer's plans in `ai.plans`)

  Every statement about history carries a confidence tag:
    established    — generally accepted by historians
    account        — from a named contemporary or later account; partial, and not always neutral
    disputed       — the sources or the scholars disagree
    estimate       — a modern scholarly estimate, not a recorded figure
    reconstruction — our own choice to make the battle playable (positions, timings, map scale)

  Map: 2400 x 1800 world pixels, north up. The Allied army holds the Mont-Saint-Jean ridge in the north;
  the French army attacks from the south. The Brussels road runs north to south through the centre.
  Hougoumont lies west of the road, La Haye Sainte east of it, and Plancenoit south-east, where the
  Prussians arrive from the east. The map is a schematic reconstruction, not a survey. There is no
  Lion's Mound: it was built after the battle.

  Cannon: batteries are `artillery` formations. They fire roundshot at long range and canister close in, only while
  unlimbered, and take time to limber and unlimber. The rules are a game model; ranges and rates are not to scale.
*/
window.WATERLOO_SCENARIO = {
  id: 'waterloo',
  title: 'Battle of Waterloo',
  date: '18 June 1815',
  place: 'Mont-Saint-Jean ridge, south of Brussels (site: the ridge, schematic)',
  tagline: 'Napoleon vs. Wellington and Blücher',
  duration: 165,          // seconds of reenactment at 1x speed
  titleCard: {
    title: 'BATTLE OF WATERLOO',
    date: '18 June 1815',
    dateNote: 'The last battle of Napoleon’s return from Elba. The French attacks failed on the ridge; the Prussians arrived on the French right and the French army broke.',
    dateRef: 'Britannica, Battle of Waterloo; Napoleonguide orders of battle',
    place: 'The Mont-Saint-Jean ridge, south of Brussels',
    sides: 'Napoleon’s Armée du Nord  ·  Wellington’s Anglo-Allied army and Blücher’s Prussians'
  },
  commandDuration: 300,
  commandFocus: { x: 1200, y: 900 },
  world: { w: 2400, h: 1800 },

  confidence: {
    established:    { label: 'Established',     color: '#5fcf8a', desc: 'Generally accepted by historians.' },
    account:        { label: 'Account',         color: '#e9c77a', desc: 'From a named contemporary or later account. These are partial, and not always neutral.' },
    disputed:       { label: 'Disputed',        color: '#ffb3a7', desc: 'The sources or the scholars disagree about this.' },
    estimate:       { label: 'Estimate',        color: '#7fb8ff', desc: 'A modern scholarly estimate, not a recorded figure.' },
    reconstruction: { label: 'Reconstruction',  color: '#c9a0ff', desc: 'Our own choice to make the battle playable: positions, timings and map scale.' }
  },

  sides: {
    allied: { name: 'Allied', color: '#c0392b', light: '#ffd6d0', rally: { x: 1200, y: 60 } },
    french: { name: 'French', color: '#2e5aa8', light: '#c9dcff', rally: { x: 1200, y: 1760 } }
  },

  /* Schematic terrain: the ridge band, the sunken road on the crest, the Brussels road, and three buildings. */
  battlefield: {
    scale: { px: 60, label: 'schematic, not to scale' },
    river: [], tributary: [], fords: [], bridge: null, city: null, camp: null, road: [],
    forests: [], hills: [], fields: [],
    labels: [
      { x: 1200, y: 40, text: 'Allied side (north)', small: true }, { x: 1200, y: 1780, text: 'French side (south)', small: true },
      { x: 1650, y: 665, text: 'Ohain road (sunken, on the crest)', small: true }, { x: 1225, y: 300, text: 'Brussels road', small: true, rotate: -1.5708 },
      { x: 1900, y: 1330, text: 'Papelotte', small: true }, { x: 2160, y: 1740, text: 'Plancenoit', small: true },
      { x: 1290, y: 1470, text: 'La Belle Alliance (Napoleon)', small: true }, { x: 1200, y: 150, text: 'Mont-Saint-Jean', small: true }
    ]
  },

  /* ---------- Opening narration ---------- */
  intro: [
    {
      title: 'BATTLE OF WATERLOO',
      media: [],
      subtitle: '18 June 1815 · south of Brussels',
      focus: { x: 1200, y: 900 }, zoom: 'fit',
      markers: [],
      auto: 14,
      lines: [
        { text: 'Napoleon had escaped from Elba and returned to power. He had 100 days, and this was the battle that decided them.', tag: 'established' },
        { text: 'The Allied army and the Prussians had been driven apart two days before. Wellington took the ridge at Mont-Saint-Jean; Blücher was coming to join him.', tag: 'established' },
        { text: 'This introduction separates what the sources say from what historians have reconstructed. Watch for the coloured tags.', tag: 'reconstruction' }
      ]
    },
    {
      title: 'The ridge',
      media: [],
      focus: { x: 1100, y: 750 }, zoom: .8,
      markers: [],
      auto: 18,
      lines: [
        { text: 'Wellington placed most of his infantry on the reverse slope of the ridge, out of sight and out of the range of the French guns.', tag: 'account', cite: 'Britannica, Battle of Waterloo' },
        { text: 'The sunken road along the crest, bordered by hedges, was the line the French had to reach.', tag: 'account', cite: 'Britannica, The first hours of battle' },
        { text: 'Hougoumont, a walled farm complex, stood on the Allied right. La Haye Sainte, a farm on the Brussels road, stood in the centre.', tag: 'established' },
        { text: 'It had rained hard all night. The French attack did not begin until the late morning, when the ground had dried a little.', tag: 'account', cite: 'Britannica, Battle of Waterloo; the reasons for the delay are debated' }
      ]
    },
    {
      title: 'The French army',
      media: [],
      focus: { x: 1250, y: 1250 }, zoom: .8,
      markers: [],
      auto: 18,
      lines: [
        { text: 'Napoleon massed the guns of the army in a grand battery opposite the centre-left of the Allied line. The number of guns is disputed: sources give between about forty and eighty.', tag: 'disputed', cite: 'Wikipedia, Grand Battery; sources differ' },
        { text: 'D’Erlon’s infantry corps attacked the Allied left. Later in the afternoon, cuirassiers and lancers charged the Allied right-centre again and again.', tag: 'established' },
        { text: 'The French army numbered about 72,000, the Allied about 68,000, and the Prussians about 50,000. These are common estimates; the sources do not agree.', tag: 'estimate', cite: 'Napoleonguide orders of battle; Wikipedia infobox' }
      ]
    },
    {
      title: 'The Prussians',
      media: [],
      focus: { x: 2000, y: 1400 }, zoom: .8,
      markers: [],
      auto: 16,
      lines: [
        { text: 'Blücher had been beaten at Ligny two days before. His army withdrew, and then came toward Waterloo.', tag: 'established', cite: 'Britannica, The Battles of Quatre-Bras and Ligny' },
        { text: 'The first Prussians, Bülow’s corps, reached the French right in the late afternoon. The exact time is disputed; the sources give between about 16:30 and 17:00.', tag: 'disputed' },
        { text: 'Napoleon had sent Marshal Grouchy with about 33,000 men to follow the Prussians. Grouchy fought their rearguard at Wavre and never reached Waterloo.', tag: 'established', cite: 'Britannica, Battle of Waterloo' }
      ]
    },
    {
      title: 'The sources',
      media: [],
      focus: { x: 1200, y: 900 }, zoom: 'fit',
      markers: [],
      auto: 16,
      lines: [
        { text: 'Many of the stories of this battle were written by the men who lived through it, decades afterwards. Some were written to defend a commander’s reputation.', tag: 'account' },
        { text: 'The French side has its own collection of eyewitness accounts, many published for the first time in recent years.', tag: 'account', cite: 'Napoleon.org, Waterloo: The Truth At Last' },
        { text: 'Where a story is famous but not confirmed, the Record says so.', tag: 'reconstruction' }
      ]
    },
    {
      title: 'How to read this reenactment',
      media: [],
      focus: { x: 1200, y: 900 }, zoom: 'fit',
      markers: [],
      auto: 14,
      lines: [
        { text: 'Positions, timings and movements on this map are a reconstruction. The eyewitness and modern accounts tell a story; the map shows where the story puts the troops.', tag: 'reconstruction' },
        { text: 'Press “Explain this moment” at any point to read why a commander may have acted as he did.', tag: 'reconstruction' }
      ]
    },
    {
      title: 'The armies are drawn up. What happens next?',
      focus: { x: 1200, y: 900 }, zoom: 'fit',
      markers: [],
      choice: true,
      lines: [
        { text: 'The story continues on the ridge. Choose how to see it.', tag: 'established' },
        { text: 'Watch the reenactment: the battle in narrated chapters, from the first shots at Hougoumont to the last attack of the Imperial Guard, then a debrief on what the sources say.', tag: 'established' },
        { text: 'Take command: lead one of the armies from the start and see whether you can change the outcome. The debrief then compares your battle with history.', tag: 'reconstruction' }
      ]
    }
  ],

  /* ---------- Formations (shared by both modes). `power` is a game balance value, not a count of men. ---------- */
  /* ---------- Formations (shared by both modes) ----------
     Positions follow the painted map: the Ohain road runs along the crest at y ≈ 700, the Brussels road down the centre
     at x ≈ 1200, Hougoumont at the left (west), La Haye Sainte beside the road, Papelotte at the right, Plancenoit at the
     bottom right. North is up: the Allied army faces south, the French north. `power` is a game balance value, not a count. */
  formations: [
    // Allied: the garrisons in front, the line behind the crest, the cavalry and reserves further back.
    { id: 'hougo',     side: 'allied', name: 'Hougoumont garrison (Guards, Nassauers, Hanoverians)', division: 'Hougoumont', type: 'infantry', cols: 4, rows: 3, power: 1.3, x: 620, y: 930, aiHold: true,
      count: 'A few battalions, fed in through the day', confidence: 'established',
      note: 'Light companies of the Foot Guards held the château and its walls, with Nassau and Hanoverian troops in the woods and orchard.' },
    { id: 'lhs',       side: 'allied', name: 'La Haye Sainte garrison (2nd Light Battalion, King’s German Legion)', division: 'La Haye Sainte', type: 'infantry', cols: 3, rows: 3, power: 1.1, x: 1300, y: 915, aiHold: true,
      count: 'About 400 at first, reinforced later', confidence: 'established',
      note: 'Major Baring’s riflemen held the farm until their ammunition ran out in the early evening.' },
    { id: 'guards-b',  side: 'allied', name: 'British Foot Guards (Maitland)', division: 'Guards', type: 'infantry', cols: 6, rows: 2, power: 1.2, x: 930, y: 600, hidden: true,
      count: 'Two battalions of the 1st Foot Guards', confidence: 'established', note: 'Behind the crest on the Allied right-centre, where the Imperial Guard attacked in the evening.' },
    { id: 'alten',     side: 'allied', name: 'Alten’s division (British, King’s German Legion, Hanoverians)', division: 'Centre', type: 'infantry', cols: 8, rows: 3, power: 1.1, x: 1150, y: 600, hidden: true,
      count: 'Part of about 68,000 Allied troops (estimate)', confidence: 'established', note: 'The centre of the line, either side of the Brussels road.' },
    { id: 'picton',    side: 'allied', name: 'Picton’s division (British and Netherlands)', division: 'Left centre', type: 'infantry', cols: 8, rows: 3, power: 1.0, x: 1520, y: 620, hidden: true,
      count: 'Part of the Allied total (estimate)', confidence: 'established', note: 'Behind the hedges of the Ohain road, east of the Brussels road. d’Erlon’s attack fell on them.' },
    { id: 'reserve',   side: 'allied', name: 'Brunswick and Nassau reserves', division: 'Reserve', type: 'infantry', cols: 6, rows: 2, power: 0.9, x: 800, y: 430, hidden: true,
      count: 'Reserve', confidence: 'established', note: 'Fed into the line during the afternoon.' },
    { id: 'household', side: 'allied', name: 'Household Brigade (Life Guards, Blues, Dragoon Guards)', division: 'Household Brigade', type: 'cavalry', cols: 5, rows: 2, power: 1.1, x: 1050, y: 440, hidden: true,
      count: 'Heavy cavalry brigade', confidence: 'established', note: 'Charged west of the Brussels road beside the Union Brigade.' },
    { id: 'greys',     side: 'allied', name: 'Union Brigade (Royals, Scots Greys, Inniskillings)', division: 'Union Brigade', type: 'cavalry', cols: 5, rows: 2, power: 1.1, x: 1600, y: 460, hidden: true, sheet: 'scots-greys',
      count: 'Heavy cavalry brigade', confidence: 'established', note: 'The English, Scottish and Irish heavy dragoons whose charge broke d’Erlon’s attack.' },
    { id: 'guns-r',    side: 'allied', name: 'Allied batteries, right of the road', division: 'Allied guns', type: 'artillery', cols: 3, rows: 1, power: 1.0, x: 950, y: 690,
      count: 'Several foot and horse batteries', confidence: 'established', note: 'On the crest. The crews ran into the squares when cavalry came close, and returned to their guns when it fell back.' },
    { id: 'guns-l',    side: 'allied', name: 'Allied batteries, left of the road', division: 'Allied guns', type: 'artillery', cols: 3, rows: 1, power: 1.0, x: 1500, y: 690,
      count: 'Several batteries', confidence: 'established', note: 'On the crest above Picton’s division.' },
    { id: 'zieten',    side: 'allied', name: 'Prussian I Corps (Zieten)', division: 'Zieten', type: 'infantry', cols: 8, rows: 2, power: 1.1, x: 2350, y: 450, offmap: true, sheet: 'prussian-infantry',
      count: 'Part of about 50,000 Prussians engaged (estimate)', confidence: 'established', note: 'Reached Wellington’s far left in the early evening.' },
    { id: 'bulow',     side: 'allied', name: 'Prussian IV Corps (Bülow)', division: 'Bülow', type: 'infantry', cols: 8, rows: 3, power: 1.2, x: 2350, y: 1450, offmap: true, sheet: 'prussian-infantry',
      count: 'The first Prussian corps to arrive', confidence: 'established', note: 'Attacked Plancenoit, behind the French right, from the late afternoon.' },

    // French: Reille on the left (west), the grand battery and d’Erlon on the right of the road, the cavalry and the Guard behind.
    { id: 'reille',    side: 'french', name: 'Reille’s II Corps (Jérôme’s division at Hougoumont)', division: 'II Corps', type: 'infantry', cols: 8, rows: 3, power: 1.0, x: 650, y: 1250,
      count: 'Part of about 72,000 French (estimate)', confidence: 'established', note: 'Its attacks on Hougoumont began the battle and went on all day.' },
    { id: 'derlon',    side: 'french', name: 'd’Erlon’s I Corps', division: 'I Corps', type: 'infantry', cols: 10, rows: 4, power: 1.2, x: 1550, y: 1230,
      count: 'Four infantry divisions', confidence: 'established', note: 'Attacked the Allied left-centre in the early afternoon in broad, deep formations.' },
    { id: 'bat-1',     side: 'french', name: 'Grand battery (west)', division: 'Grand battery', type: 'artillery', cols: 3, rows: 1, power: 1.1, x: 1320, y: 1120,
      count: 'The number of guns is disputed: about 40 to 84', confidence: 'disputed', note: 'On a low rise in front of d’Erlon’s corps. Three gun figures stand for each part of the battery.' },
    { id: 'bat-2',     side: 'french', name: 'Grand battery (centre)', division: 'Grand battery', type: 'artillery', cols: 3, rows: 1, power: 1.1, x: 1480, y: 1120,
      count: 'Part of the grand battery', confidence: 'disputed', note: 'Part of the grand battery.' },
    { id: 'bat-3',     side: 'french', name: 'Grand battery (east)', division: 'Grand battery', type: 'artillery', cols: 3, rows: 1, power: 1.1, x: 1640, y: 1120,
      count: 'Part of the grand battery', confidence: 'disputed', note: 'Part of the grand battery.' },
    { id: 'cuir',      side: 'french', name: 'Milhaud’s cuirassiers', division: 'Cuirassiers', type: 'cavalry', cols: 6, rows: 2, power: 1.2, x: 950, y: 1350, sheet: 'french-cuirassier',
      count: 'Heavy cavalry corps', confidence: 'established', note: 'Led the massed cavalry charges of the afternoon.' },
    { id: 'lancers',   side: 'french', name: 'Jacquinot’s lancers', division: 'Lancers', type: 'cavalry', cols: 5, rows: 2, power: 1.0, x: 1850, y: 1250, sheet: 'french-lancer',
      count: 'Light cavalry', confidence: 'established', note: 'Counter-charged the Union Brigade when it rode into the grand battery.' },
    { id: 'lobau',     side: 'french', name: 'Lobau’s VI Corps', division: 'VI Corps', type: 'infantry', cols: 6, rows: 2, power: 1.0, x: 1450, y: 1450, hidden: true,
      count: 'Reserve corps', confidence: 'established', note: 'Sent east to hold off the Prussians at Plancenoit.' },
    { id: 'yguard',    side: 'french', name: 'Young Guard', division: 'Young Guard', type: 'infantry', cols: 6, rows: 2, power: 1.1, x: 1250, y: 1580, hidden: true,
      count: 'Part of the Imperial Guard', confidence: 'established', note: 'Sent to Plancenoit, which changed hands several times.' },
    { id: 'guard',     side: 'french', name: 'Imperial Guard (Middle Guard)', division: 'Imperial Guard', type: 'infantry', cols: 6, rows: 3, power: 1.4, x: 1150, y: 1500, hidden: true,
      count: 'Several battalions in the last attack', confidence: 'established', note: 'Its attack on the Allied right-centre in the evening was the last French attack of the day.' }
  ],

  /* ---------- Watch mode: the day in narrated chapters ----------
     Times of day are those most historians give; several are disputed and the chapters say so. */
  events: [
    { t: 0, title: 'The ridge', tag: 'account', focus: { x: 1200, y: 800 }, zoom: 'fit',
      text: 'Wellington’s infantry lies on the reverse slope. The guns stand on the crest. The French army waits on the far side of the valley.',
      explain: 'Why the reverse slope? Infantry behind the crest could not be shelled. They could stand up and fire when the French came over the top.',
      cite: 'Britannica, The first hours of battle',
      orders: [] },
    { t: 12, title: 'Hougoumont', tag: 'established', focus: { x: 650, y: 1000 },
      text: 'The battle opens at Hougoumont, on the Allied right, in the late morning. Reille’s infantry attacks the walled farm, and the fighting there goes on all day.',
      explain: 'Many historians think the attack was meant to draw in Wellington’s reserves. Instead it drew in more and more French battalions. The defenders closed the north gate after the French forced it: a famous story, told differently by different witnesses.',
      cite: 'Britannica, Battle of Waterloo; National Army Museum, Hougoumont',
      orders: [ { id: 'reille', to: { x: 660, y: 1030 }, speed: 16, state: 'attack' } ] },
    { t: 26, title: 'The grand battery opens', tag: 'disputed', focus: { x: 1450, y: 950 },
      text: 'The French grand battery fires on the Allied line. The number of guns is disputed.',
      explain: 'Napoleon massed the guns to break the Allied line before the infantry attack. How many guns there were, and how much damage they did, is not agreed.',
      cite: 'Wikipedia, Grand Battery (sources differ)',
      orders: [ { id: 'bat-1', state: 'hold' }, { id: 'bat-2', state: 'hold' }, { id: 'bat-3', state: 'hold' } ] },
    { t: 40, title: 'd’Erlon’s attack', tag: 'established', focus: { x: 1450, y: 850 },
      text: 'D’Erlon’s corps advances against the Allied left-centre, east of the Brussels road. Picton’s division meets it at the hedges along the crest.',
      explain: 'D’Erlon’s divisions advanced in unusually broad, deep formations, which were slow to deploy and made big targets. Sir Thomas Picton was killed leading the counter-attack.',
      cite: 'Britannica, Battle of Waterloo',
      orders: [ { id: 'derlon', to: { x: 1500, y: 770 }, speed: 14, state: 'attack' }, { id: 'picton', visible: true, state: 'hold' } ] },
    { t: 54, title: 'The Union Brigade charges', tag: 'established', focus: { x: 1500, y: 900 },
      text: 'Uxbridge sends the heavy cavalry over the crest. The Union Brigade, with the Scots Greys, breaks d’Erlon’s attack and captures two eagles.',
      explain: 'Carried away, the cavalry rode on into the grand battery and was cut up by French lancers and cuirassiers. How far it got, and how many guns it put out of action, is disputed.',
      cite: 'Britannica, Battle of Waterloo; National Army Museum',
      orders: [
        { id: 'greys', visible: true, via: [{ x: 1520, y: 760 }], to: { x: 1490, y: 1090 }, speed: 48, state: 'attack' },
        { id: 'household', visible: true, to: { x: 1150, y: 880 }, speed: 42, state: 'attack' },
        { id: 'derlon', to: { x: 1560, y: 1230 }, speed: 28, state: 'move', strengthTo: 50, over: 5 },
        { id: 'lancers', to: { x: 1500, y: 1080 }, speed: 46, state: 'attack' }
      ] },
    { t: 68, title: 'Ney’s cavalry charges', tag: 'established', focus: { x: 1000, y: 800 },
      text: 'Marshal Ney sends wave after wave of cuirassiers and lancers up the slope between Hougoumont and La Haye Sainte, against the Allied right-centre.',
      explain: 'Why Ney attacked is disputed: he may have taken movement behind the crest for a retreat. The charges went in without infantry to support them.',
      cite: 'Britannica, Battle of Waterloo',
      orders: [
        { id: 'greys', to: { x: 1600, y: 470 }, speed: 30, state: 'move', strengthTo: 35, over: 4 },
        { id: 'household', to: { x: 1050, y: 450 }, speed: 30, state: 'move', strengthTo: 55, over: 4 },
        { id: 'lancers', via: [{ x: 1250, y: 1150 }], to: { x: 1130, y: 700 }, speed: 40, state: 'attack' },
        { id: 'cuir', visible: true, to: { x: 960, y: 700 }, speed: 40, state: 'attack' },
        { id: 'guards-b', visible: true, state: 'hold' }, { id: 'alten', visible: true, state: 'hold' }
      ] },
    { t: 82, title: 'Squares hold', tag: 'account', focus: { x: 1000, y: 780 },
      text: 'The Allied infantry forms square. The French cavalry cannot break the squares, and falls back.',
      explain: 'A square with bayonets outward was the infantry’s answer to cavalry. Without infantry or guns to follow up, the cavalry could not break it.',
      cite: 'Britannica, Battle of Waterloo',
      orders: [
        { id: 'cuir', to: { x: 950, y: 1250 }, speed: 30, state: 'move', strengthTo: 55, over: 5 },
        { id: 'lancers', to: { x: 1800, y: 1250 }, speed: 30, state: 'move', strengthTo: 50, over: 5 }
      ] },
    { t: 96, title: 'The Prussians at Plancenoit', tag: 'account', focus: { x: 2000, y: 1450 },
      text: 'Bülow’s Prussians come in from the east and attack Plancenoit, on the French right. Lobau’s corps is sent to hold them.',
      explain: 'The Prussian arrival forced Napoleon to commit troops to his right, away from the centre. The exact time is disputed; the sources give between about 16:30 and 17:00.',
      cite: 'Britannica, Battle of Waterloo; the time is disputed',
      orders: [
        { id: 'bulow', visible: true, to: { x: 2150, y: 1600 }, speed: 30, state: 'attack' },
        { id: 'lobau', visible: true, to: { x: 2040, y: 1520 }, speed: 25 },
        { id: 'yguard', visible: true, to: { x: 2100, y: 1660 }, speed: 22 }
      ] },
    { t: 110, title: 'La Haye Sainte falls', tag: 'established', focus: { x: 1300, y: 850 },
      text: 'Out of ammunition, the King’s German Legion is driven out of La Haye Sainte. French guns and skirmishers come up close to the centre of the Allied line.',
      explain: 'Major Baring’s men held the farm for most of the day, until their rifle ammunition ran out. With the farm lost, the Allied centre was at its weakest of the day.',
      cite: 'Britannica, Battle of Waterloo; Baring’s own account',
      orders: [
        { id: 'lhs', to: { x: 1250, y: 620 }, speed: 22, state: 'move', strengthTo: 25, over: 4 },
        { id: 'derlon', via: [{ x: 1420, y: 1000 }], to: { x: 1320, y: 900 }, speed: 18, state: 'attack' }
      ] },
    { t: 124, title: 'Zieten reaches the Allied left', tag: 'established', focus: { x: 1900, y: 650 },
      text: 'Zieten’s Prussian corps reaches Wellington’s far left. The Allied light cavalry on that flank can now move to the centre.',
      explain: 'Zieten’s arrival freed Vivian’s and Vandeleur’s cavalry brigades to steady the Allied centre, shortly before the Imperial Guard attacked.',
      cite: 'Britannica, Battle of Waterloo',
      orders: [ { id: 'zieten', visible: true, to: { x: 2050, y: 620 }, speed: 30 } ] },
    { t: 138, title: 'The last attack', tag: 'account', focus: { x: 1000, y: 800 },
      text: 'The Imperial Guard goes forward in the last French attack. Wellington’s reserves meet it on the crest.',
      explain: 'The Guard’s attack is the last throw of the day. The words attributed to its officers are disputed, and the Record does not repeat them as fact.',
      cite: 'Britannica, Battle of Waterloo',
      orders: [ { id: 'guard', visible: true, via: [{ x: 1150, y: 1150 }], to: { x: 960, y: 720 }, speed: 22, state: 'attack' }, { id: 'guards-b', visible: true, state: 'hold' } ] },
    { t: 152, title: 'The aftermath', tag: 'established', focus: { x: 1200, y: 900 }, zoom: 'fit', end: true,
      text: 'The French attack is broken. The Prussians press on, and the French army retreats south. Napoleon abdicated three days later.',
      explain: 'The battle ended the Napoleonic Wars. Its result is not in doubt; the detail of who did what, and when, is what the sources argue about.',
      cite: 'Britannica, Battle of Waterloo',
      orders: [
        { id: 'guard', to: { x: 1200, y: 1700 }, speed: 36, state: 'rout', strengthTo: 30, over: 4 },
        { id: 'derlon', to: { x: 1500, y: 1700 }, speed: 30, state: 'rout' }, { id: 'reille', to: { x: 800, y: 1700 }, speed: 30, state: 'rout' },
        { id: 'guards-b', to: { x: 1000, y: 1000 }, speed: 20 }, { id: 'alten', to: { x: 1200, y: 1000 }, speed: 20 }, { id: 'picton', to: { x: 1500, y: 1000 }, speed: 20 },
        { id: 'bulow', to: { x: 1900, y: 1500 }, speed: 25 }, { id: 'zieten', to: { x: 1900, y: 1000 }, speed: 25 }
      ] }
  ],

  /* ---------- Command mode: the computer’s plans for the side the player does not take ---------- */
  ai: {
    plans: {
      /* When the player takes the Allies, the French are run by the computer, roughly to the day’s timetable. */
      french: [
        { t: 0,   orders: [] },
        { t: 8,   orders: [ { id: 'reille', to: { x: 660, y: 1030 }, speed: 16, state: 'attack' } ],
          caption: { title: 'Hougoumont attacked', text: 'Reille’s infantry is attacking Hougoumont on your right.', tag: 'reconstruction' } },
        { t: 30,  orders: [ { id: 'derlon', to: { x: 1500, y: 720 }, speed: 14, state: 'attack' } ],
          caption: { title: 'd’Erlon advances', text: 'A French corps is advancing on your left-centre, east of the Brussels road.', tag: 'reconstruction' } },
        { t: 70,  orders: [ { id: 'cuir', to: { x: 960, y: 680 }, speed: 40, hunt: true }, { id: 'lancers', to: { x: 1130, y: 690 }, speed: 40, hunt: true } ],
          caption: { title: 'Cavalry on the slope', text: 'Massed French cavalry is coming up the slope on your right-centre. Infantry in the open is in danger.', tag: 'reconstruction' } },
        { t: 110, orders: [ { id: 'lobau', to: { x: 2040, y: 1520 }, speed: 25 }, { id: 'yguard', to: { x: 2100, y: 1660 }, speed: 22 } ] },
        { t: 160, orders: [ { id: 'guard', via: [{ x: 1150, y: 1150 }], to: { x: 960, y: 700 }, speed: 22, state: 'attack', hunt: true } ],
          caption: { title: 'The Imperial Guard', text: 'The Imperial Guard is advancing on your right-centre.', tag: 'reconstruction' } }
      ],
      /* When the player takes the French, the Allies are run by the computer: the line holds, the cavalry counter-attacks,
         and the Prussians arrive on the French right. */
      allied: [
        { t: 0,   orders: [] },
        { t: 60,  orders: [ { id: 'greys', visible: true, to: { x: 1500, y: 950 }, speed: 40, hunt: true }, { id: 'household', visible: true, to: { x: 1150, y: 900 }, speed: 40, hunt: true } ],
          caption: { title: 'Allied cavalry charges', text: 'Uxbridge’s heavy cavalry is coming over the crest.', tag: 'reconstruction' } },
        { t: 100, orders: [ { id: 'bulow', visible: true, to: { x: 2150, y: 1600 }, speed: 30, state: 'attack', hunt: true } ],
          caption: { title: 'Prussians on your right', text: 'Bülow’s Prussian corps is attacking Plancenoit, behind your right.', tag: 'reconstruction' } },
        { t: 150, orders: [ { id: 'zieten', visible: true, to: { x: 2050, y: 620 }, speed: 30 } ],
          caption: { title: 'More Prussians', text: 'Zieten’s Prussian corps has reached the Allied left.', tag: 'reconstruction' } }
      ]
    },
    huntRange: 900,
    holdPoint: { x: 1200, y: 900 },
    spotRange: 380
  },

  /* Captions shown when a command battle begins, by the player’s side */
  commandLines: {
    allied: 'You command the Allied army on the ridge. Your infantry is hidden on the reverse slope. The French guns and cavalry are coming up the valley.',
    french: 'You command the French army. Your grand battery is in the valley; the Allied infantry is hidden on the ridge. The Prussians are coming from the east.'
  },

  /* Recorded narration lives in audio/<voice>/ (clear: Narrator 1). Clips missing for a line fall back to the browser’s voice. */
  imageBase: 'images/',
  audioBase: 'audio/',
  voices: [ { id: 'clear', name: 'Narrator 1 · clear', speaker: 25 } ],

  /* What the debrief says at the end of a command battle */
  debrief: {
    allied: {
      victory:   { title: 'Allied victory', text: 'You held the ridge and broke the French attacks. The Prussians arriving on the French right would have finished the job.' },
      defeat:    { title: 'Allied defeat', text: 'The ridge fell. The sources describe the position as holding by a narrow margin; this run did not.' },
      stalemate: { title: 'Stalemate', text: 'Night falls with the ridge still held and the French still in the valley. The Prussians were not yet decisive.' }
    },
    french: {
      victory:   { title: 'French victory', text: 'You broke the Allied line on the ridge before the Prussians could decide the day.' },
      defeat:    { title: 'French defeat', text: 'The attacks failed on the ridge and the Prussians came in on your right. The sources describe the same turn of events.' },
      stalemate: { title: 'Stalemate', text: 'Night falls with both armies still in the field. The Prussians were not yet decisive.' }
    }
  },

  /* What the sources say happened next (shown after a watch-mode reenactment) */
  outcome: [
    { text: 'The French attacks on the ridge failed, and the Prussians came in on the French right.', tag: 'established' },
    { text: 'Napoleon’s army broke and retreated south. Napoleon abdicated three days later, and the Napoleonic Wars ended.', tag: 'established' },
    { text: 'The sources give very different casualty figures. Historians treat them as estimates.', tag: 'estimate' },
    { text: 'The stories of the day, such as the Hougoumont gate and the Scots Greys charge, are told from both sides, and not always accurately.', tag: 'account' }
  ],

  /* Armies panel: units shown with their drawn figures until painted sprites are added */
  units: [
    { side: 'allied', type: 'infantry', name: 'British infantry square', desc: 'Redcoats in a hollow square of bayonets. The infantry’s answer to cavalry.', tag: 'established',
      photos: [],
      lines: [
        { text: 'A square of infantry, with the front ranks kneeling, was the standard defence against cavalry. Musket fire and bayonets were the main protection.', tag: 'established', cite: 'Cambridge, Cuirassiers and hollow squares' },
        { text: 'The Brown Bess musket was a smoothbore flintlock, and its rate of fire in good conditions was about three rounds a minute, according to modern estimates.', tag: 'estimate', cite: 'Military collectors’ sources; check a military history before quoting' }
      ] },
    { side: 'french', type: 'cavalry', name: 'French cuirassier', desc: 'Heavy cavalry in breastplates, who charged the Allied squares.', tag: 'account',
      photos: [],
      lines: [
        { text: 'The cuirassiers wore breastplates. They were the heavy cavalry of the French army, and they rode up the slope in wave after wave.', tag: 'account', cite: 'Wikipedia, The British Squares Receiving the Charge of the French Cuirassiers' },
        { text: 'The sources say the cavalry could not break the squares without infantry or artillery support, and eventually fell back.', tag: 'account' }
      ] }
  ],

  /* Where each confidence tag comes from */
  citations: {
    established: { title: 'Established', intro: 'Accepted by historians because the dates, the commanders and the outcome agree across the sources.', items: [
      { ref: 'Britannica, Battle of Waterloo', note: 'The first hours of battle, and the outline of the day. https://www.britannica.com/event/Battle-of-Waterloo' },
      { ref: 'Napoleonguide, Waterloo orders of battle', note: 'Corps and unit lists, with the strength figures and their conflicts. https://napoleonguide.com/waterloo_proob.htm' },
      { ref: 'Wikipedia, Battle of Waterloo', note: 'A starting point; the infobox figures are estimates. https://en.wikipedia.org/wiki/Battle_of_Waterloo' }
    ] },
    account: { title: 'Account', intro: 'From named contemporary or later accounts. These are partial, and some were written to defend a reputation.', items: [
      { ref: 'Andrew Field, The French at Waterloo: Eyewitness Accounts (Pen & Sword)', note: 'French testimony, collected and translated.' },
      { ref: 'Waterloo: The Truth At Last (Napoleon.org listing)', note: 'Around 200 previously unpublished, mainly French, accounts. https://www.napoleon.org/en/magazine/publications/waterloo-truth-last' },
      { ref: 'National Army Museum, Defence of the Chateau de Hougoumont', note: 'The Guards’ defence of the farm. https://collection.nam.ac.uk/detail.php?acc=1975-05-7-1' }
    ] },
    disputed: { title: 'Disputed', intro: 'The sources or the scholars disagree. The game shows the disagreement rather than choosing a side.', items: [
      { ref: 'Number of guns in the grand battery', note: 'Sources give between about 40 and 84. See Wikipedia, Grand Battery.' },
      { ref: 'Time of the Prussian arrival', note: 'Sources give between about 16:30 and 17:00; some give 17:00. See Britannica.' },
      { ref: 'The Union Brigade in the grand battery', note: 'That the charge broke d’Erlon’s attack is established. How far the brigade got into the guns, and how many it put out of action, is disputed.' },
      { ref: 'Why Ney launched the cavalry charges', note: 'He may have taken Allied movement behind the crest for a retreat; the sources do not settle it.' },
      { ref: 'The words attributed to the Imperial Guard', note: 'Disputed; not shown as fact.' }
    ] },
    estimate: { title: 'Estimate', intro: 'Modern estimates, not counts. Use them as a range.', items: [
      { ref: 'Army strengths (about 72,000 French, 68,000 Allied, 50,000 Prussian)', note: 'Common estimates. Sources conflict on the French total and on gun counts.' }
    ] },
    reconstruction: { title: 'Reconstruction', intro: 'Choices made for this game so that the battle can be shown and played. They are not claims about what happened.', items: [
      { ref: 'The map', note: 'A schematic ridge, two farms, a road, and Plancenoit. Positions are from the sources’ descriptions; exact ground is not known.' },
      { ref: 'Positions, timings and speeds', note: 'Chosen to show the sequence of the day in under three minutes. The real battle lasted about nine hours, from the late morning to nightfall.' },
      { ref: 'Cannon', note: 'Ranges, reload times and the effect of roundshot and canister are a game model, not to scale.' },
      { ref: 'Combat results in Command mode', note: 'A simple strength model. Nothing about it is historical.' }
    ] }
  },

  sources: [
    { title: 'Britannica, Battle of Waterloo', note: 'Overview and the first hours of the battle.' },
    { title: 'Napoleonguide, Waterloo orders of battle', note: 'Corps and strength figures.' },
    { title: 'National Army Museum', note: 'Hougoumont and the battle record.' },
    { title: 'Andrew Field, The French at Waterloo', note: 'French eyewitness accounts.' }
  ]
};
