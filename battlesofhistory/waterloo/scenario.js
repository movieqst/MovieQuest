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

  Cannon: batteries are placed as `archers`-type formations until the cannon rules are added (see
  the placeholder note on each battery). Nothing about the batteries' fire is historical yet.
*/
window.WATERLOO_SCENARIO = {
  id: 'waterloo',
  title: 'Battle of Waterloo',
  date: '18 June 1815',
  place: 'Mont-Saint-Jean ridge, south of Brussels (site: the ridge, schematic)',
  tagline: 'Napoleon vs. Wellington and Blücher',
  duration: 110,          // seconds of reenactment at 1x speed
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
      { x: 1200, y: 40,   text: 'Allied side (north)', small: true },
      { x: 1200, y: 1780, text: 'French side (south)', small: true },
      { x: 1290, y: 690,  text: 'sunken road (Ohain road)', small: true },
      { x: 1210, y: 300,  text: 'Brussels road', small: true }
    ]
  },

  /* ---------- Opening narration ---------- */
  intro: [
    {
      title: 'BATTLE OF WATERLOO',
      media: [],
      subtitle: '18 June 1815 · south of Brussels',
      focus: { x: 1200, y: 900 }, zoom: 1,
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
      focus: { x: 1200, y: 700 }, zoom: 1,
      markers: [],
      auto: 18,
      lines: [
        { text: 'Wellington placed most of his infantry on the reverse slope of the ridge, out of sight and out of the range of the French guns.', tag: 'account', cite: 'Britannica, Battle of Waterloo' },
        { text: 'The sunken road along the crest, bordered by hedges, was the line the French had to reach.', tag: 'account', cite: 'Britannica, The first hours of battle' },
        { text: 'Hougoumont, a walled farm complex, stood on the Allied right. La Haye Sainte, a farm on the Brussels road, stood in the centre.', tag: 'established' }
      ]
    },
    {
      title: 'The French army',
      media: [],
      focus: { x: 1200, y: 1200 }, zoom: .9,
      markers: [],
      auto: 18,
      lines: [
        { text: 'Napoleon massed the guns of the army in a grand battery opposite the centre-left of the Allied line. The number of guns is disputed: sources give between about forty and eighty.', tag: 'disputed', cite: 'Wikipedia, Grand Battery; sources differ' },
        { text: 'The infantry of d’Erlon’s corps went forward, and cuirassiers and lancers rode up the slope behind them.', tag: 'account' },
        { text: 'The French army numbered about 72,000, the Allied about 68,000, and the Prussians about 50,000. These are common estimates; the sources do not agree.', tag: 'estimate', cite: 'Napoleonguide orders of battle; Wikipedia infobox' }
      ]
    },
    {
      title: 'The Prussians',
      media: [],
      focus: { x: 1900, y: 1200 }, zoom: .9,
      markers: [],
      auto: 16,
      lines: [
        { text: 'Blücher had been beaten at Ligny two days before. His army withdrew, and then came toward Waterloo.', tag: 'established', cite: 'Britannica, The Battles of Quatre-Bras and Ligny' },
        { text: 'The first Prussians, Bülow’s corps, reached the French right in the late afternoon. The exact time is disputed; the sources give between about 16:30 and 17:00.', tag: 'disputed' }
      ]
    },
    {
      title: 'The sources',
      media: [],
      focus: { x: 1200, y: 900 }, zoom: .8,
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
      focus: { x: 1200, y: 900 }, zoom: .7,
      markers: [],
      auto: 14,
      lines: [
        { text: 'Positions, timings and movements on this map are a reconstruction. The ancient and modern accounts tell a story; the map shows where the story puts the troops.', tag: 'reconstruction' },
        { text: 'Press “Explain this moment” at any point to read why a commander may have acted as he did.', tag: 'reconstruction' }
      ]
    },
    {
      title: 'The armies are drawn up. What happens next?',
      focus: { x: 1200, y: 900 },
      markers: [],
      choice: true,
      lines: [
        { text: 'The story continues on the ridge. Choose how to see it.', tag: 'established' },
        { text: 'Watch the reenactment: the battle in narrated chapters, from the grand battery to the last attack, then a debrief on what the sources say.', tag: 'established' },
        { text: 'Take command: lead one of the armies from the start and see whether you can change the outcome. The debrief then compares your battle with history.', tag: 'reconstruction' }
      ]
    }
  ],

  /* ---------- Formations (shared by both modes). `power` is a game balance value, not a count of men. ---------- */
  formations: [
    // Allied, on the reverse slope and behind the crest
    { id: 'picton',  side: 'allied', name: 'British infantry, left (Picton)', division: 'Left', type: 'infantry', cols: 6, rows: 3, power: 1.2, x: 640, y: 760, hidden: true,
      count: 'Part of the Allied infantry (estimate: about 54,000 foot in all)', confidence: 'account',
      note: 'Picton’s division held the left of the ridge. Its squares were charged by the French cuirassiers.' },
    { id: 'allied-c', side: 'allied', name: 'Allied infantry, centre', division: 'Centre', type: 'infantry', cols: 6, rows: 3, power: 1.1, x: 1000, y: 760, hidden: true,
      count: 'Part of the Allied infantry', confidence: 'established',
      note: 'The centre of the Allied line behind the crest. Sources differ on the exact units there.' },
    { id: 'allied-h', side: 'allied', name: 'Hanoverian and Brunswick infantry', division: 'Right', type: 'infantry', cols: 5, rows: 3, power: 1.0, x: 1420, y: 760, hidden: true,
      count: 'Part of the Allied infantry', confidence: 'account',
      note: 'Some of these troops were new to battle, and the sources describe them differently.' },
    { id: 'uxbridge', side: 'allied', name: 'Allied cavalry (Uxbridge)', division: 'Cavalry', type: 'cavalry', cols: 6, rows: 2, power: 1.3, x: 1550, y: 700, hidden: true,
      count: 'Part of the Allied cavalry (estimate: about 13,000 horse)', confidence: 'account',
      note: 'Uxbridge’s cavalry drove back the French cuirassiers after their first charge.' },
    { id: 'greys',   side: 'allied', name: 'Scots Greys (Union Brigade)', division: 'Cavalry', type: 'cavalry', cols: 4, rows: 2, power: 1.2, x: 1700, y: 730, hidden: true,
      count: 'One brigade of heavy cavalry', confidence: 'disputed',
      note: 'The Scots Greys charged d’Erlon’s infantry. Accounts disagree on how far they got. Reported losses were heavy.' },
    { id: 'hougo',   side: 'allied', name: 'Hougoumont garrison (Guards, Nassau, Hanoverians)', division: 'Hougoumont', type: 'infantry', cols: 3, rows: 3, power: 1.2, x: 800, y: 1005,
      count: 'Light companies of the Guards and Nassau troops', confidence: 'established',
      note: 'Colonel Macdonell held the farm. The north gate was closed on the French attackers, which Wellington credited with saving the position.' },
    { id: 'lhs',     side: 'allied', name: 'La Haye Sainte garrison (King’s German Legion)', division: 'La Haye Sainte', type: 'infantry', cols: 2, rows: 3, power: 1.0, x: 1295, y: 910,
      count: 'The 2nd Light Battalion, King’s German Legion, under Major Baring', confidence: 'account',
      note: 'The farm held most of the day until its ammunition ran out, at about 18:00. The number who survived is not reliably known.' },
    { id: 'allied-guns', side: 'allied', name: 'Allied batteries on the crest', division: 'Artillery', type: 'archers', cols: 2, rows: 1, power: 1.0, x: 1000, y: 660,
      count: 'British artillery on the ridge (PLACEHOLDER: cannon rules to follow)', confidence: 'estimate',
      note: 'British batteries were placed on the ridge. Their fire is a placeholder until the cannon rules are added.' },

    // French, south of the ridge
    { id: 'bat-1',   side: 'french', name: 'Grand battery (1)', division: 'Artillery', type: 'archers', cols: 2, rows: 1, power: 1.0, x: 820,  y: 1250,
      count: 'Disputed: 40 to 84 guns in the grand battery', confidence: 'disputed',
      note: 'PLACEHOLDER: the grand battery is shown as ranged formations until the cannon rules are added.' },
    { id: 'bat-2',   side: 'french', name: 'Grand battery (2)', division: 'Artillery', type: 'archers', cols: 2, rows: 1, power: 1.0, x: 1040, y: 1250,
      count: 'Part of the grand battery', confidence: 'disputed',
      note: 'PLACEHOLDER, as above.' },
    { id: 'bat-3',   side: 'french', name: 'Grand battery (3)', division: 'Artillery', type: 'archers', cols: 2, rows: 1, power: 1.0, x: 1290, y: 1250,
      count: 'Part of the grand battery', confidence: 'disputed',
      note: 'PLACEHOLDER, as above.' },
    { id: 'derlon',  side: 'french', name: 'd’Erlon’s infantry corps', division: 'I Corps', type: 'infantry', cols: 6, rows: 4, power: 1.0, x: 1400, y: 1150,
      count: 'Part of the French infantry (estimate: about 72,000 in the army)', confidence: 'account',
      note: 'The first wave of French infantry. It was caught by the Scots Greys, according to the Allied accounts.' },
    { id: 'cuir',    side: 'french', name: 'Cuirassiers', division: 'Cavalry', type: 'cavalry', cols: 6, rows: 2, power: 1.2, x: 1000, y: 1150, hunter: true,
      count: 'Part of the French cavalry', confidence: 'account',
      note: 'The cuirassiers charged the Allied squares. Infantry in square held; the cavalry could not break them without infantry or artillery support.' },
    { id: 'lancers', side: 'french', name: 'Lancers', division: 'Cavalry', type: 'cavalry', cols: 6, rows: 2, power: 1.1, x: 1550, y: 1100, hunter: true,
      count: 'Part of the French cavalry', confidence: 'account',
      note: 'Lancers rode with the cuirassiers. Their exact role is not clear in the sources.' },
    { id: 'guard',   side: 'french', name: 'Imperial Guard', division: 'Guard', type: 'infantry', cols: 6, rows: 3, power: 1.2, x: 1700, y: 1300, hidden: true,
      count: 'The Guard (estimate: about 20,000 in the Guard)', confidence: 'account',
      note: 'The Guard’s last attack went in late in the day. The reported words attributed to its officers are disputed, and are not shown as fact.' },
    { id: 'lobau',   side: 'french', name: 'Lobau’s corps (to Plancenoit)', division: 'VI Corps', type: 'infantry', cols: 5, rows: 3, power: 1.0, x: 2000, y: 1150, hidden: true,
      count: 'Part of the French right', confidence: 'account',
      note: 'Sent against the Prussians at Plancenoit, to hold the French right.' },

    // Prussians, arriving from the east
    { id: 'bulow',   side: 'allied', name: 'Prussian IV Corps (Bülow)', division: 'Prussians', type: 'infantry', cols: 6, rows: 3, power: 1.0, x: 2300, y: 1420, offmap: true,
      count: 'About 50,000 Prussians in all (estimate). Bülow’s corps arrived first.', confidence: 'established',
      note: 'The first Prussians to reach the French right. The exact time of arrival is disputed.' }
  ],

  /* ---------- Watch mode: the historical sequence, in order ---------- */
  events: [
    { t: 0, title: 'The ridge', tag: 'account', focus: { x: 1200, y: 800 },
      text: 'Wellington’s infantry lies on the reverse slope. The guns stand on the crest. The French army waits on the far side of the valley.',
      explain: 'Why the reverse slope? Infantry behind the crest could not be shelled. They could stand up and fire when the French came over the top.',
      cite: 'Britannica, The first hours of battle',
      orders: [] },
    { t: 12, title: 'The grand battery opens', tag: 'disputed', focus: { x: 1040, y: 1100 },
      text: 'The French grand battery fires on the Allied line. The number of guns is disputed.',
      explain: 'Napoleon massed the guns to break the Allied line before the infantry attack. How many guns there were, and how much damage they did, is not agreed.',
      cite: 'Wikipedia, Grand Battery (sources differ)',
      orders: [] },
    { t: 26, title: 'The cuirassiers climb the slope', tag: 'account', focus: { x: 1200, y: 800 },
      text: 'Cuirassiers and lancers ride up the slope toward the squares of the Allied infantry.',
      explain: 'The cavalry was meant to finish what the guns had started. On the slope they met squares and the fire of British gunners.',
      cite: 'Britannica, The first hours of battle',
      orders: [
        { id: 'cuir', to: { x: 1000, y: 880 }, speed: 40 }, { id: 'lancers', to: { x: 1450, y: 900 }, speed: 40 }
      ] },
    { t: 40, title: 'Squares hold', tag: 'account', focus: { x: 800, y: 780 },
      text: 'The Allied infantry forms square. The French cavalry cannot break the squares, and falls back.',
      explain: 'A square with bayonets outward was the infantry’s answer to cavalry. Without infantry or guns to follow up, the cavalry could not break it.',
      cite: 'Wikipedia, The British Squares Receiving the Charge of the French Cuirassiers (painting-based; use for the image, not as a source for the numbers)',
      orders: [
        { id: 'cuir', to: { x: 1000, y: 1000 }, speed: 30, state: 'move' },
        { id: 'picton', visible: true, state: 'hold' }, { id: 'allied-c', visible: true, state: 'hold' }
      ] },
    { t: 55, title: 'Hougoumont and La Haye Sainte', tag: 'account', focus: { x: 1050, y: 950 },
      text: 'The French attack the two farms on the Brussels road and at the centre. The garrisons hold their walls.',
      explain: 'Hougoumont drew French troops away from the centre all day. La Haye Sainte was held until its ammunition ran out. A fortified position can tie down an attacker far larger than its garrison.',
      cite: 'Wikipedia, Hougoumont; Bexhill Museum, King’s German Legion (local history)',
      orders: [
        { id: 'derlon', to: { x: 1330, y: 1020 }, speed: 18 }, { id: 'hougo', state: 'hold' }, { id: 'lhs', state: 'hold' }
      ] },
    { t: 70, title: 'The Scots Greys charge', tag: 'disputed', focus: { x: 1500, y: 900 },
      text: 'Uxbridge’s heavy cavalry, including the Scots Greys, charges d’Erlon’s infantry. Accounts disagree on how far they got.',
      explain: 'The charge is well attested, and the losses were heavy. Whether the Greys reached the French infantry or were stopped by the press of men is disputed.',
      cite: 'Scotland’s Waterloo Day (group site; check the figures against a standard source)',
      orders: [
        { id: 'greys', visible: true, to: { x: 1400, y: 1050 }, speed: 45 },
        { id: 'uxbridge', visible: true, to: { x: 1550, y: 1000 }, speed: 40 }
      ] },
    { t: 85, title: 'The Prussians at Plancenoit', tag: 'account', focus: { x: 1950, y: 1200 },
      text: 'Bülow’s Prussians come in from the east and attack Plancenoit, on the French right. Lobau’s corps is sent to hold them.',
      explain: 'The Prussian arrival forced Napoleon to commit troops to his right, away from the centre. The exact time is disputed; the sources give between about 16:30 and 17:00.',
      cite: 'Britannica, The first hours of battle; the time is disputed',
      orders: [
        { id: 'bulow', visible: true, to: { x: 2000, y: 1300 }, speed: 30 },
        { id: 'lobau', visible: true, to: { x: 1990, y: 1220 }, speed: 30 }
      ] },
    { t: 100, title: 'The last attack', tag: 'account', focus: { x: 1200, y: 800 },
      text: 'The Imperial Guard goes forward in the last French attack. Wellington’s reserves meet it on the crest.',
      explain: 'The Guard’s attack is the last throw of the day. The words attributed to its officers are disputed, and the Record does not repeat them as fact.',
      cite: 'Napoleonguide; Britannica',
      orders: [
        { id: 'guard', visible: true, to: { x: 1200, y: 980 }, speed: 30 }
      ] },
    { t: 108, title: 'The aftermath', tag: 'established', focus: { x: 1200, y: 900 }, end: true,
      text: 'The French attack is broken. The Prussians press on, and the French army retreats south. Napoleon abdicated three days later.',
      explain: 'The battle ended the Napoleonic Wars. Its result is not in doubt; the detail of who did what, and when, is what the sources argue about.',
      cite: 'Britannica, Battle of Waterloo',
      orders: [] }
  ],

  /* ---------- Command mode: the computer’s plans for the side the player does not take ---------- */
  ai: {
    plans: {
      /* When the player takes the Allies, the French are run by the computer. */
      french: [
        { t: 0,  orders: [] },
        { t: 20, orders: [ { id: 'cuir', to: { x: 1000, y: 900 }, speed: 40, hunt: true }, { id: 'lancers', to: { x: 1450, y: 920 }, speed: 40, hunt: true } ],
          caption: { title: 'French cavalry advances', text: 'The cuirassiers and lancers are moving up the slope toward your squares.', tag: 'account' } },
        { t: 60, orders: [ { id: 'derlon', to: { x: 1330, y: 1020 }, speed: 18 } ] }
      ],
      /* When the player takes the French, the Allies are run by the computer. */
      allied: [
        { t: 0,  orders: [] },
        { t: 30, orders: [ { id: 'greys', visible: true, to: { x: 1400, y: 1000 }, speed: 35 } ],
          caption: { title: 'Allied cavalry moves', text: 'Uxbridge’s heavy cavalry is coming off the ridge toward d’Erlon’s infantry.', tag: 'account' } },
        { t: 70, orders: [ { id: 'bulow', visible: true, to: { x: 2000, y: 1300 }, speed: 30 } ],
          caption: { title: 'Prussians coming', text: 'Bülow’s corps is advancing from the east toward Plancenoit.', tag: 'established' } }
      ]
    },
    huntRange: 900,
    holdPoint: { x: 1200, y: 900 },
    spotRange: 340
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
      { ref: 'The Scots Greys charge', note: 'Accounts differ on how far they got and what the losses were.' },
      { ref: 'The words attributed to the Imperial Guard', note: 'Disputed; not shown as fact.' }
    ] },
    estimate: { title: 'Estimate', intro: 'Modern estimates, not counts. Use them as a range.', items: [
      { ref: 'Army strengths (about 72,000 French, 68,000 Allied, 50,000 Prussian)', note: 'Common estimates. Sources conflict on the French total and on gun counts.' }
    ] },
    reconstruction: { title: 'Reconstruction', intro: 'Choices made for this game so that the battle can be shown and played. They are not claims about what happened.', items: [
      { ref: 'The map', note: 'A schematic ridge, two farms, a road, and Plancenoit. Positions are from the sources’ descriptions; exact ground is not known.' },
      { ref: 'Positions, timings and speeds', note: 'Chosen to show the sequence of the day in about two minutes. The real battle lasted about ten hours.' },
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
