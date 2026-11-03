/*
  Historical Scenario File — Battle of Stirling Bridge, 11 September 1297
  ----------------------------------------------------------------------
  The narrated introduction (`intro`), the reenactment chapters (`events`) and the debrief (`outcome`). Their text is
  taken word for word from NARRATION-SCRIPT.md, which is what the narrators recorded (audio/<voice>/).
  The engine is the Talas build (engine.js): a campaign part on the map of Scotland and the battle on the painted map of
  the River Forth at Stirling. Positions, formations and orders are set in the block at the end of this file.
  Tags: established, guisborough (Walter of Guisborough), chronicle (other chronicles), later (later accounts),
  disputed, estimate, reconstruction.
*/
window.STIRLING_SCENARIO = {
  id: 'stirling',
  title: 'Battle of Stirling Bridge',
  date: '11 September 1297',
  place: 'Stirling, on the River Forth, Scotland',
  tagline: 'The Scots of Moray and Wallace vs. the English army of Edward I',

  confidence: {
    established:    { label: 'Established',     color: '#5fcf8a', desc: 'Agreed by the chronicles and by modern historians (Historic Environment Scotland, BTL28).' },
    guisborough:    { label: 'Guisborough',     color: '#ffd27a', desc: 'From the chronicle of Walter of Guisborough, an English monk writing soon after: the fullest account, but dramatic and hostile to Cressingham. His speeches are his own words, not a record.' },
    chronicle:      { label: 'Other chronicles', color: '#9fd8c8', desc: 'From other English and Scottish chronicles (Lanercost, Langtoft, Scalacronica, Fordun), some written much later.' },
    later:          { label: 'Later account',   color: '#b0b8c0', desc: 'Written long after the battle, like Blind Harry’s poem of about 1470.' },
    disputed:       { label: 'Disputed',        color: '#ff9a86', desc: 'The sources disagree, or historians do.' },
    estimate:       { label: 'Estimate',        color: '#e9c77a', desc: 'A modern estimate, not a recorded figure.' },
    reconstruction: { label: 'Reconstruction',  color: '#c8a2ff', desc: 'Our own choice, to make the battle visible: where each unit stood and how it moved.' }
  },

  /* The engine's two sides: 'allied' is the Scots (blue), 'french' the English (red). */
  sides: {
    allied: { name: 'Scotland', short: 'Scots',   army: 'The Scots under Andrew Moray and William Wallace', color: '#2e5aa8', light: '#d0dcff' },
    french: { name: 'England',  short: 'English', army: 'The English army of Edward I under the Earl of Surrey', color: '#c0392b', light: '#ffd6d0' }
  },

  welcome: "Welcome to Battles of History. Today we are learning about the Battle of Stirling Bridge, fought on the 11th of September 1297, between the Scots under William Wallace and Andrew Moray and the English army of King Edward the First.",

  /* ---------- Opening narration ---------- */
  intro: [
  {
    "title": "BATTLE OF STIRLING BRIDGE",
    "lines": [
      {
        "text": "On the 11th of September 1297, a Scottish army waited on the high ground above the River Forth while an English army crossed a narrow wooden bridge towards it.",
        "tag": "established"
      },
      {
        "text": "Most of what we know comes from English chroniclers, who wrote within a few years and did not like the Scots. This introduction separates what they say from what historians have pieced together. Watch the colour of each tag.",
        "tag": "reconstruction"
      }
    ]
  },
  {
    "title": "A kingdom conquered",
    "lines": [
      {
        "text": "In 1296 King Edward the First of England invaded Scotland. His army sacked the town of Berwick and destroyed the Scottish army at Dunbar.",
        "tag": "established"
      },
      {
        "text": "The Scottish king, John Balliol, gave up his throne. Edward took the Stone of Destiny from Scone, where Scottish kings were crowned, and made the Scottish lords swear loyalty to him.",
        "tag": "established"
      },
      {
        "text": "He left Scotland in the hands of his officials: the Earl of Surrey as his lieutenant, and Hugh de Cressingham as treasurer, who was hated for his taxes.",
        "tag": "established"
      }
    ]
  },
  {
    "title": "The risings of 1297",
    "lines": [
      {
        "text": "In May 1297 William Wallace, a man from a lesser Scottish landholding family, was reported to have killed the English sheriff of Lanark. His rebellion spread through southern Scotland.",
        "tag": "established"
      },
      {
        "text": "In the north, Andrew Moray, heir to a great family of the Moray Firth, returned from English captivity and led a growing rebellion. His forces attacked English garrisons and threatened their hold on the north.",
        "tag": "established"
      },
      {
        "text": "By the end of the summer the two had joined forces near Stirling.",
        "tag": "established"
      }
    ]
  },
  {
    "title": "The key to Scotland",
    "lines": [
      {
        "text": "Stirling Castle stands on a rock above the River Forth. Below it, the river winds in great loops across soft, wet ground.",
        "tag": "established"
      },
      {
        "text": "Here was the lowest bridge over the Forth, the main road between the south of Scotland and the north. Whoever held it held the way into the north.",
        "tag": "established"
      },
      {
        "text": "Across the river, a narrow causeway ran over the marshy meadows to the foot of a steep hill, the Abbey Craig. The Scots waited there.",
        "tag": "established"
      }
    ]
  },
  {
    "title": "The armies",
    "lines": [
      {
        "text": "No one counted either army. Guisborough says the English had fifty thousand foot, and the Scots forty thousand. Historians agree these figures are impossible.",
        "tag": "guisborough"
      },
      {
        "text": "We do not know the exact strength of either army. Modern historians suggest several thousand men on each side. The English had far more heavily armoured cavalry, with Welsh and English foot soldiers; the Scots relied mainly on spearmen on foot.",
        "tag": "estimate"
      },
      {
        "text": "The Scots were led together by Wallace and Moray. The English were commanded by the Earl of Surrey, an old soldier who had won at Dunbar the year before.",
        "tag": "established"
      }
    ]
  },
  {
    "title": "The bridge",
    "lines": [
      {
        "text": "The bridge of 1297 was made of timber, so narrow that only two horsemen could ride side by side.",
        "tag": "guisborough"
      },
      {
        "text": "Archaeologists have found the remains of an earlier medieval bridge just upstream of today's stone Old Bridge: four stone piers still lie in the river. This is thought to be the site of the 1297 crossing, although the remains have not been securely dated to the battle.",
        "tag": "established"
      },
      {
        "text": "The battle map is painted onto the real course of the river, traced from the ground. Where the armies stood on it is our reconstruction.",
        "tag": "reconstruction"
      }
    ]
  }
],

  /* ---------- The reenactment: the first two chapters on the map of Scotland, the rest on the battle map ---------- */
  events: [
  {
    "title": "The English march north",
    "clock": "Late August 1297",
    "tag": "established",
    "text": "Surrey gathers his army in the Borders and marches north through Edinburgh to Stirling, where the English hold the castle. The Scots are already waiting across the river."
  },
  {
    "title": "Wallace and Moray",
    "clock": "Early September",
    "tag": "established",
    "text": "Wallace comes from the south and Moray from the north. They join their forces at the crossing of the Forth, and take up a position on the high ground near the Abbey Craig, looking down on the bridge."
  },
  {
    "title": "Waiting",
    "clock": "10 September",
    "tag": "guisborough",
    "text": "Two Scottish lords serving with the English, James the Steward and the Earl of Lennox, ask Surrey to wait while they try to talk the Scots into surrender. They come back with nothing."
  },
  {
    "title": "A false start",
    "clock": "11 September, dawn",
    "tag": "guisborough",
    "text": "Guisborough tells a strange story: thousands of Welsh foot soldiers crossed early in the morning, only to be called back because Surrey had not yet risen. Whether this really happened is uncertain; it may have been told to make Surrey look foolish. He also describes Surrey knighting young men before the battle."
  },
  {
    "title": "The friars",
    "clock": "Morning",
    "tag": "guisborough",
    "text": "Surrey sends two friars across to offer the Scots peace. According to Guisborough, Wallace sends back his answer: the Scots have not come to make peace, but to fight, and free their kingdom."
  },
  {
    "title": "Lundie's advice",
    "clock": "Morning",
    "tag": "guisborough",
    "text": "Sir Richard Lundie, a Scottish knight serving the English, warns against forcing the bridge. According to Guisborough, he offers to take horsemen and foot across a nearby ford to come at the Scots from behind. Where that ford was is unknown. Cressingham, impatient at the cost of the campaign, urges an attack straight over the bridge, and Surrey agrees."
  },
  {
    "title": "Two by two",
    "clock": "Later that morning",
    "tag": "guisborough",
    "text": "The English begin to cross, two horsemen abreast. Cressingham is among those who cross. On the far bank they gather beside the causeway, moving aside to leave the crossing open for those behind, with marshy meadows all around."
  },
  {
    "title": "The Scots attack",
    "clock": "Later that morning",
    "tag": "guisborough",
    "text": "The Scots watch and wait. When a large part of the English army is across and cut off from the rest by the river, they come down from the high ground and block the way back to the bridge. Those who have crossed are trapped."
  },
  {
    "title": "The trap",
    "clock": "During the fighting",
    "tag": "guisborough",
    "text": "On the far bank the English horsemen have no room to charge on the soft ground. Many are killed. Others try to swim the Forth in their armour and drown."
  },
  {
    "title": "Cressingham",
    "clock": "During the fighting",
    "tag": "established",
    "text": "Hugh de Cressingham, the hated treasurer, is killed in the fighting. English chroniclers later wrote that the Scots stripped skin from his body as an insult to their defeated enemy."
  },
  {
    "title": "Thweng",
    "clock": "During the fighting",
    "tag": "guisborough",
    "text": "Sir Marmaduke Thweng, a Yorkshire knight, cuts his way back across the bridge, one of the very few to escape. Surrey makes him keeper of Stirling Castle."
  },
  {
    "title": "The bridge",
    "clock": "After the fighting",
    "tag": "disputed",
    "text": "The bridge can no longer be crossed. Accounts disagree about how: Guisborough says Surrey ordered it destroyed as he retreated; the later Scalacronica says the Scots broke it. We cannot be certain which is right."
  },
  {
    "title": "The rout",
    "clock": "After the fighting",
    "tag": "guisborough",
    "text": "Surrey rides south for Berwick with the rest of his army. The Steward and the Earl of Lennox, who have been waiting in the woods, now turn on the fleeing English and seize their baggage."
  }
],

  outcome: [
  {
    "text": "The Scots won a complete victory. Guisborough says a hundred English knights and five thousand foot soldiers died, figures that may be too high. No one recorded the Scottish losses.",
    "tag": "guisborough"
  },
  {
    "text": "Andrew Moray was wounded at Stirling Bridge and later died, probably in November 1297. His name appears before Wallace's on an official letter of the 11th of October, so his leadership was still recognised after the victory.",
    "tag": "established"
  },
  {
    "text": "On the 11th of October, at Haddington, Moray and Wallace wrote to the merchants of Lübeck and Hamburg that their ships could once again trade safely in Scottish ports. The letter survives.",
    "tag": "established"
  },
  {
    "text": "The Scots raided deep into the north of England. Wallace was knighted and named Guardian of Scotland, ruling in the name of the absent King John.",
    "tag": "established"
  },
  {
    "text": "Edward the First came north himself. On the 22nd of July 1298 he defeated Wallace at Falkirk.",
    "tag": "established"
  },
  {
    "text": "Stirling Bridge showed how careful use of ground and timing could defeat a powerful army. Seventeen years later, at Bannockburn, a few miles away, Scottish infantry would win another great victory against an English army.",
    "tag": "established"
  },
  {
    "text": "Blind Harry's poem of about 1470 tells of a carpenter who pulled a pin to collapse the bridge. It is a legend; no early source mentions it.",
    "tag": "later"
  }
],

  commandLines: {},
  imageBase: 'images/',
  audioBase: 'audio/',
  voices: [
    { id: 'clear',    name: 'Narrator 1 · clear',  speaker: 25 },
    { id: 'light',    name: 'Narrator 2 · light',  speaker: 60 },
    { id: 'bright',   name: 'Narrator 3 · bright', speaker: 0 },
    { id: 'deep',     name: 'Narrator 4 · deep',   speaker: 400 },
    { id: 'warm',     name: 'Narrator 5 · warm',   speaker: 7 },
    { id: 'computer', name: 'Computer · calm',     speaker: 500, length: 1.3, piperArgs: '--noise-scale 0.4 --noise-w 0.3', mix: 'highpass=f=90,lowpass=f=4800,bass=g=4:f=140,acompressor=threshold=0.25:ratio=3:attack=20:release=250,volume=1.4,alimiter=limit=0.95' }
  ]
};

/* ======================================================================================================================
   Maps, armies, leaders and their moves.
     campaign map  images/map-scotland.jpg   58.0–54.6 N, 7.6 W–0.5 E (about 500 x 378 km)        rS(lat, lon)
     battle map    images/terrain-battle.jpg 56.1445–56.1175 N, 3.9640–3.8997 W (about 4.0 x 3.0 km) world px
   The battle map is ChatGPT's painting of our guide; places sit where they are PAINTED (the bridge is painted about
   80 m along the river from the HES pier point, the castle about 200 m west of its rock): images/layout/ART-PROMPTS.md.
   Where the armies stood and how they moved is our reconstruction (Guisborough gives the outline only).
   ====================================================================================================================== */
(() => {
  const S = window.STIRLING_SCENARIO;
  const rS = (lat, lon) => ({ x: Math.round((lon + 7.6) / 8.1 * 2400), y: Math.round((58.0 - lat) / 3.4 * 1800) });
  const P = p => [p.x, p.y];
  // campaign places
  const STIRLING = rS(56.1236, -3.9465), BERWICK = rS(55.771, -2.005), ROXBURGH = rS(55.596, -2.452), EDINBURGH = rS(55.9486, -3.1999),
        FALKIRK = rS(56.0019, -3.7839), LANARK = rS(55.673, -3.778), SELKIRK = rS(55.548, -2.839), PERTH = rS(56.395, -3.437),
        INVERNESS = rS(57.4778, -4.2247), ABERDEEN = rS(57.1497, -2.0943), DUNDEE = rS(56.462, -2.9707), DUNBAR = rS(56.001, -2.516),
        SCONE = rS(56.421, -3.405), URQUHART = rS(57.324, -4.443), ELGIN = rS(57.649, -3.318);
  // battle-map places (world px, as painted)
  const BRIDGE = { x: 965, y: 1010 }, BW = { x: 930, y: 1000 }, BE = { x: 1000, y: 1020 }, CRAIG = { x: 1880, y: 360 }, CASTLE = { x: 380, y: 1225 },
        TOWN = { x: 640, y: 1430 }, ABBEY = { x: 1705, y: 1310 }, CWHEAD = { x: 1590, y: 450 }, FORD = { x: 1433, y: 1267 },
        CW1 = { x: 1080, y: 900 }, CW2 = { x: 1250, y: 720 }, CW3 = { x: 1420, y: 580 }, WOODS = { x: 420, y: 880 };

  Object.assign(S, {
    titleCard: {
      title: 'BATTLE OF STIRLING BRIDGE', date: '11 September 1297',
      dateNote: 'The Scots under Wallace and Moray wait above the River Forth while the English cross a narrow wooden bridge, two horsemen abreast.',
      dateRef: 'Walter of Guisborough; the Lanercost Chronicle; Historic Environment Scotland, Inventory of Historic Battlefields (BTL28)',
      place: 'Stirling, on the River Forth, Scotland',
      sides: 'The Scots under Andrew Moray and William Wallace  ·  The English army of Edward I under the Earl of Surrey'
    },
    world: { w: 2400, h: 1800 },
    terrain: 'terrain-battle.jpg',
    duration: 154, commandDuration: 300, commandFocus: { x: 1150, y: 850 },
    battlefield: {
      scale: { px: 300, label: '500 m' },
      labels: [
        Object.assign({}, CASTLE, { y: CASTLE.y - 70, text: 'Stirling Castle', small: true }),
        Object.assign({}, TOWN, { y: TOWN.y + 60, text: 'Stirling', small: true }),
        Object.assign({}, CRAIG, { y: CRAIG.y + 150, text: 'Abbey Craig', small: true }),
        Object.assign({}, ABBEY, { y: ABBEY.y + 70, text: 'Cambuskenneth Abbey', small: true }),
        Object.assign({}, CWHEAD, { x: CWHEAD.x - 120, y: CWHEAD.y + 30, text: 'the causeway', small: true }),
        { x: 1220, y: 1130, text: 'River Forth', small: true }
      ]
    },
    globe: { target: { lon: -3.94, lat: 56.13 }, region: { lon: -3.6, lat: 56.0 }, pull: 3.6, startLat: 40,
      periodNote: 'Scotland and England in 1297',
      labels: [
        { lon: -3.19, lat: 55.95, text: 'Edinburgh', size: .5, dot: true }, { lon: -2.0, lat: 55.77, text: 'Berwick', size: .45, dot: true },
        { lon: -0.13, lat: 51.51, text: 'London', size: .55, dot: true }, { lon: -3.44, lat: 56.40, text: 'Perth', size: .45, dot: true },
        { lon: -3.94, lat: 56.12, text: 'STIRLING', size: .85, pin: true, early: true }
      ] },
    establishing: [],
    // painted figures (images/units/<name>.png, cut from ChatGPT's sheets with tools/prepare-sprite-sheet.py)
    attackSheets: { 'scots-spearman': 'scots-spearman-attack', 'scots-horseman': 'scots-horseman-charge', 'english-knight': 'english-knight-charge',
                    'english-longbowman': 'english-longbow-fire', 'english-spearman': 'english-foot-attack', 'english-man-at-arms': 'english-foot-attack' },
    fallen: { soldier: 'dead-soldier', horse: 'dead-horse' },
    sheets: ['scots-spearman', 'scots-horseman', 'scots-archer', 'english-knight', 'english-foot', 'english-spearman', 'english-longbowman', 'english-man-at-arms', 'baggage-wagon'],
    sheetBy: { allied: { infantry: 'scots-spearman', cavalry: 'scots-horseman', archers: 'scots-archer' }, french: { infantry: 'english-spearman', archers: 'english-longbowman', cavalry: 'english-knight' } },
    sideArt: { allied: { cloth: '#3a4a6a', cloth2: '#2a3550', pennant: '#2e5aa8' }, french: { cloth: '#8a3a30', cloth2: '#6a2a22', pennant: '#c0392b', trim: '#e9c77a' } },
    ai: { plans: {} }, commandLines: {},
    debrief: { allied: { victory: { title: 'Scottish victory', text: '' }, defeat: { title: 'Scottish defeat', text: '' }, stalemate: { title: 'Stalemate', text: '' } },
               french: { victory: { title: 'English victory', text: '' }, defeat: { title: 'English defeat', text: '' }, stalemate: { title: 'Stalemate', text: '' } } }
  });
  S.sides.allied.rally = { x: 1880, y: 300 }; S.sides.french.rally = { x: 500, y: 1300 };

  /* ---------- the battle map's armies ---------- */
  const F = (o) => Object.assign({ power: 1, confidence: 'reconstruction' }, o);
  S.formations = [
    F({ id: 'sspear1', side: 'allied', name: 'Scottish spearmen (Moray)', division: 'Moray', type: 'infantry', cols: 8, rows: 3, power: 1.2, x: 1700, y: 520, count: 'Several thousand in all (estimate)', note: 'Andrew Moray’s men from the north: spearmen on foot, the core of the army.' }),
    F({ id: 'sspear2', side: 'allied', name: 'Scottish spearmen (Wallace)', division: 'Wallace', type: 'infantry', cols: 7, rows: 3, power: 1.2, x: 1820, y: 600, count: 'Several thousand in all (estimate)', note: 'Wallace’s men from the south and the forest of Selkirk.' }),
    F({ id: 'sarch',   side: 'allied', name: 'Scottish archers', division: 'Archers', type: 'archers', cols: 4, rows: 1, x: 1960, y: 640, count: 'A few hundred (estimate)', note: 'Historic Environment Scotland’s reconstruction gives the Scots about 400 archers, from the forest of Selkirk.' }),
    F({ id: 'shorse',  side: 'allied', name: 'Scottish horsemen', division: 'Horse', type: 'cavalry', cols: 3, rows: 1, x: 1950, y: 520, count: 'A few hundred at most (estimate)', note: 'A small mounted force; the Scots relied on their spearmen.' }),
    F({ id: 'van',     side: 'french', name: 'English vanguard: knights and men-at-arms', division: 'Vanguard', type: 'cavalry', cols: 6, rows: 2, power: 1.3, x: 760, y: 1060, note: 'Armoured horsemen, with Cressingham and Thweng among them. They crossed first.' }),
    F({ id: 'vfoot',   side: 'french', name: 'English vanguard: foot', division: 'Vanguard', type: 'infantry', sheet: 'english-man-at-arms', cols: 6, rows: 2, x: 700, y: 1140, note: 'Foot soldiers who crossed behind the horsemen.' }),
    F({ id: 'welsh',   side: 'french', name: 'Welsh and English foot', division: 'Main body', type: 'archers', cols: 7, rows: 2, x: 640, y: 1220, note: 'Guisborough says thousands of Welsh crossed early in the morning and were called back.' }),
    F({ id: 'main',    side: 'french', name: 'Surrey’s main body', division: 'Main body', type: 'cavalry', cols: 6, rows: 2, x: 560, y: 1120, note: 'The rest of the army, which never crossed.' }),
    F({ id: 'baggage', side: 'french', name: 'The English baggage', division: 'Baggage', type: 'cavalry', sheet: 'baggage-wagon', cols: 4, rows: 1, power: .3, x: 520, y: 1000, note: 'Wagons and stores, seized at the end by the Steward and Lennox.' }),
    F({ id: 'steward', side: 'french', name: 'The Steward and the Earl of Lennox', division: 'Steward', type: 'cavalry', sheet: 'scots-horseman', cols: 3, rows: 1, x: WOODS.x, y: WOODS.y, note: 'Scottish lords serving with the English. Guisborough says they waited in the woods, then fell on the fleeing English and their baggage.' })
  ];
  S.leaders = [
    { id: 'wallace',     name: 'William Wallace',          side: 'allied', x: 1900, y: 470 },
    { id: 'moray',       name: 'Andrew Moray',             side: 'allied', x: 1600, y: 440 },
    { id: 'surrey',      name: 'Earl of Surrey',           side: 'french', x: 470,  y: 1080 },
    { id: 'cressingham', name: 'Hugh de Cressingham',      side: 'french', x: 860,  y: 940 },
    { id: 'thweng',      name: 'Sir Marmaduke Thweng',     side: 'french', x: 820,  y: 1200 },
    { id: 'lundie',      name: 'Sir Richard Lundie',       side: 'french', x: 600,  y: 1060, hidden: true }
  ];

  /* ---------- the campaign part, on the map of Scotland ---------- */
  S.campaign = {
    title: 'The road to Stirling', subtitle: 'Summer 1297', terrain: 'map-scotland.jpg', scale: { px: 480, label: '100 km' }, duration: 28,
    toBattleAt: STIRLING,
    towns: [
      Object.assign({ name: 'Stirling', big: true }, STIRLING), Object.assign({ name: 'Berwick', big: true }, BERWICK), Object.assign({ name: 'Roxburgh' }, ROXBURGH),
      Object.assign({ name: 'Edinburgh', big: true }, EDINBURGH), Object.assign({ name: 'Falkirk' }, FALKIRK), Object.assign({ name: 'Lanark' }, LANARK),
      Object.assign({ name: 'Perth' }, PERTH), Object.assign({ name: 'Inverness' }, INVERNESS), Object.assign({ name: 'Aberdeen' }, ABERDEEN),
      Object.assign({ name: 'Dundee' }, DUNDEE), Object.assign({ name: 'Dunbar' }, DUNBAR), Object.assign({ name: 'Scone' }, SCONE)
    ],
    formations: [
      { id: 'c-eng',     side: 'french', name: 'The English army of Surrey', division: 'Surrey', type: 'cavalry', cols: 4, rows: 2, x: ROXBURGH.x, y: ROXBURGH.y, confidence: 'reconstruction', note: 'Mustered in the Borders; its route north is reconstructed.' },
      { id: 'c-moray',   side: 'allied', name: 'Andrew Moray’s army of the north', division: 'Moray', type: 'infantry', cols: 3, rows: 2, x: INVERNESS.x, y: INVERNESS.y, confidence: 'reconstruction', note: 'Raised in the north in the summer of 1297.' },
      { id: 'c-wallace', side: 'allied', name: 'William Wallace’s army of the south', division: 'Wallace', type: 'infantry', cols: 3, rows: 2, x: SELKIRK.x, y: SELKIRK.y, confidence: 'reconstruction', note: 'Wallace was in the forest of Selkirk in July (Cressingham’s letter).' }
    ],
    leaders: [
      Object.assign({ id: 'surrey', name: 'Earl of Surrey', side: 'french' }, { x: ROXBURGH.x, y: ROXBURGH.y - 30 }),
      Object.assign({ id: 'moray', name: 'Andrew Moray', side: 'allied' }, { x: INVERNESS.x, y: INVERNESS.y - 30 }),
      Object.assign({ id: 'wallace', name: 'William Wallace', side: 'allied' }, { x: SELKIRK.x, y: SELKIRK.y - 30 })
    ]
  };

  /* ---------- what happens in each chapter ---------- */
  const EV = S.events; EV.forEach((e, i) => { e.clipNo = i + 1; e.orders = e.orders || []; });
  const set = (i, o) => Object.assign(EV[i], o);
  set(0, { t: 0, zoom: 'fit', orders: [
    { id: 'c-eng', to: { x: STIRLING.x + 30, y: STIRLING.y + 40 }, via: [SELKIRK, EDINBURGH, FALKIRK], speed: 110 },
    { leader: 'surrey', to: { x: STIRLING.x + 40, y: STIRLING.y + 10 }, via: [SELKIRK, EDINBURGH, FALKIRK], speed: 110 } ] });
  set(1, { t: 14, zoom: 'fit', orders: [
    { id: 'c-moray', to: { x: STIRLING.x + 10, y: STIRLING.y - 50 }, via: [{ x: 1080, y: 500 }, PERTH], speed: 130 },
    { leader: 'moray', to: { x: STIRLING.x - 20, y: STIRLING.y - 70 }, via: [{ x: 1080, y: 500 }, PERTH], speed: 130 },
    { id: 'c-wallace', to: { x: STIRLING.x - 30, y: STIRLING.y - 40 }, via: [LANARK], speed: 90 },
    { leader: 'wallace', to: { x: STIRLING.x - 50, y: STIRLING.y - 60 }, via: [LANARK], speed: 90 } ] });
  // the battle
  set(2, { t: 0, zoom: 'fit', markers: [ Object.assign({ label: 'the bridge' }, BRIDGE), Object.assign({ label: 'Abbey Craig' }, CRAIG) ], orders: [
    { id: 'steward', to: { x: 900, y: 760 }, speed: 30 }, { id: 'steward', to: WOODS, speed: 30, delay: 6 } ] });
  set(3, { t: 14, focus: BRIDGE, zoom: 1.1, orders: [   // the false start: a small group crosses and is called back
    { id: 'welsh', to: { x: 1090, y: 930 }, via: [BW, BE], speed: 40 }, { id: 'welsh', to: { x: 640, y: 1220 }, via: [BE, BW], speed: 40, delay: 7 } ] });
  set(4, { t: 28, focus: { x: 1300, y: 760 }, zoom: .8, markers: [ { x: 1300, y: 760, label: 'the friars cross to the Scots' } ] });
  set(5, { t: 42, focus: { x: 900, y: 1150 }, zoom: .9, markers: [ Object.assign({ label: 'possible ford (place unknown)' }, FORD) ], orders: [
    { leader: 'lundie', visible: true, to: { x: 620, y: 1080 }, speed: 20 } ] });
  set(6, { t: 56, focus: BRIDGE, zoom: 1.1, orders: [   // two by two: the vanguard crosses and gathers east of the bridge, beside the causeway
    { id: 'van', to: { x: 1130, y: 900 }, via: [BW, BE, CW1], speed: 22, then: 'hold' },
    { leader: 'cressingham', to: { x: 1110, y: 870 }, via: [BW, BE], speed: 22 }, { leader: 'thweng', to: { x: 1160, y: 930 }, via: [BW, BE], speed: 22, delay: 1 },
    { id: 'vfoot', to: { x: 1060, y: 960 }, via: [BW, BE], speed: 18, delay: 4, then: 'hold' } ] });
  set(7, { t: 70, focus: { x: 1250, y: 800 }, zoom: .8, orders: [   // the Scots come down and cut the English off from the bridge
    { id: 'sspear1', to: { x: 1040, y: 1000 }, via: [CW3, CW2, { x: 1120, y: 1020 }], speed: 50, state: 'attack' },
    { id: 'sspear2', to: { x: 1200, y: 860 }, via: [CW3, CW2], speed: 46, state: 'attack', delay: 1 },
    { id: 'shorse', to: { x: 1300, y: 780 }, via: [CW3], speed: 50, state: 'attack', delay: 2 },
    { id: 'sarch', to: { x: 1380, y: 700 }, via: [CW3], speed: 40, delay: 2 },
    { leader: 'moray', to: { x: 1250, y: 900 }, speed: 46 }, { leader: 'wallace', to: { x: 1300, y: 820 }, speed: 46 } ] });
  set(8, { t: 84, focus: { x: 1100, y: 920 }, zoom: 1.1, orders: [
    { id: 'van', strengthTo: 25, over: 12 }, { id: 'vfoot', strengthTo: 20, over: 12 },
    { id: 'sspear1', strengthTo: 85, over: 12 }, { id: 'sspear2', strengthTo: 85, over: 12 } ] });
  set(9, { t: 98, focus: { x: 1110, y: 880 }, zoom: 1.3, orders: [ { leader: 'cressingham', visible: false } ] });
  set(10, { t: 112, focus: BRIDGE, zoom: 1.3, orders: [
    { leader: 'thweng', to: { x: 760, y: 1100 }, via: [BE, BW], speed: 30 }, { id: 'van', strengthTo: 8, over: 10 }, { id: 'vfoot', strengthTo: 5, over: 10 } ] });
  set(11, { t: 126, focus: BRIDGE, zoom: 1.2, markers: [ Object.assign({ label: 'the bridge can no longer be crossed' }, BRIDGE) ] });
  set(12, { t: 140, zoom: 'fit', orders: [
    ...['main', 'welsh'].map((id, k) => ({ id, state: 'rout', to: { x: 300 + k * 60, y: 1780 }, speed: 30, delay: k })),
    { leader: 'surrey', to: { x: 260, y: 1780 }, speed: 32 }, { leader: 'thweng', to: CASTLE, speed: 20 },
    { id: 'steward', side: 'allied' }, { id: 'steward', to: { x: 520, y: 1010 }, speed: 40, state: 'attack', delay: 2 },
    { id: 'baggage', strengthTo: 5, over: 8, delay: 4 } ] });
  S.campaign.events = EV.slice(0, 2); S.events = EV.slice(2);

  /* ---------- the armies panel, the citations and the sources ---------- */
  S.units = [
    { side: 'allied', type: 'infantry', name: 'Scottish spearmen', desc: 'The heart of the Scottish army: men on foot with long spears.', tag: 'established',
      lines: [ { text: 'Most of Moray’s and Wallace’s men fought on foot with long spears, in close formations later called schiltroms. At Stirling Bridge they attacked rather than stood.', tag: 'established' } ] },
    { side: 'allied', type: 'archers', name: 'Scottish archers', desc: 'Bowmen, many from the forest of Selkirk.', tag: 'estimate',
      lines: [ { text: 'Historic Environment Scotland’s reconstruction gives the Scots about four hundred archers; the figure is an estimate.', tag: 'estimate' } ] },
    { side: 'allied', type: 'cavalry', name: 'Scottish horsemen', desc: 'A small mounted force of knights and light horse.', tag: 'estimate',
      lines: [ { text: 'The Scots had only a few horsemen; modern estimates suggest under two hundred.', tag: 'estimate' } ] },
    { side: 'french', type: 'cavalry', name: 'English knights and men-at-arms', desc: 'Armoured horsemen in mail, the strength of Edward I’s armies.', tag: 'established',
      lines: [ { text: 'The English had far more heavily armoured cavalry than the Scots. On the soft ground beyond the bridge they had no room to charge.', tag: 'established' } ] },
    { side: 'french', type: 'archers', name: 'Welsh and English foot', desc: 'Foot soldiers, many of them from Wales, with spears and bows.', tag: 'guisborough',
      lines: [ { text: 'Guisborough says thousands of Welsh crossed early in the morning and were called back. Whether that really happened is uncertain.', tag: 'disputed' } ] }
  ];
  const C = (title, intro, items) => ({ title, intro, items: items.map(([ref, note]) => ({ ref, note })) });
  S.citations = {
    established: C('Established', 'Agreed by the chronicles and modern historians.', [['Historic Environment Scotland, Inventory of Historic Battlefields: Stirling Bridge (BTL28)', 'The battlefield, the numbers, the action, the sources and the remains.']]),
    guisborough: C('Walter of Guisborough', 'The fullest account, by an English monk writing soon after. Dramatic and hostile to Cressingham; his speeches are his own.', [['Chronicle of Walter of Guisborough', 'The delays, the friars, Lundie’s ford, the crossing, Thweng, the Steward and Lennox.']]),
    chronicle: C('Other chronicles', 'Other English and Scottish chronicles, some much later.', [['Lanercost Chronicle; Peter Langtoft; Bury St Edmunds; Scalacronica; Fordun', 'Cressingham’s death and the story of his skin; who broke the bridge.']]),
    later: C('Later account', 'Written long after the battle.', [['Blind Harry, The Wallace (c. 1470)', 'The carpenter and the pin: a legend.']]),
    disputed: C('Disputed', 'The sources disagree, or historians do.', [['Guisborough v. Scalacronica', 'Who broke the bridge, and how.'], ['HES BTL28', 'The ford, the exact place of the fighting, the numbers.']]),
    estimate: C('Estimate', 'A modern estimate, not a recorded figure.', [['Armstrong (2003); Reid (2004); HES', 'Several thousand men on each side.']]),
    reconstruction: C('Reconstruction', 'Our own choice, to make the battle visible.', [['Battle Games', 'Where each unit stood and how it moved; the painted map of 1297.']])
  };
  S.sources = [
    { title: 'Historic Environment Scotland, Inventory of Historic Battlefields: Battle of Stirling Bridge (BTL28)', note: 'The standard modern account of the battlefield.' },
    { title: 'Historic Environment Scotland, scheduled monument SM8264', note: 'The remains of the earlier bridge, upstream of the Old Bridge.' },
    { title: 'The Chronicle of Walter of Guisborough', note: 'The fullest contemporary account.' },
    { title: 'The Chronicle of Lanercost, trans. H. Maxwell (1913), pp. 163–164', note: 'A northern English view.' },
    { title: 'The Lübeck letter, 11 October 1297 (National Records of Scotland transcript)', note: 'Moray and Wallace as leaders of the army of Scotland.' },
    { title: 'P. Armstrong, Stirling Bridge and Falkirk 1297–98 (Osprey, 2003); S. Reid, Battles of the Scottish Lowlands (2004)', note: 'Modern estimates of the armies.' }
  ];
  S.library = [];

  /* ---------- the introduction: which map each slide shows, and its briefing marks ---------- */
  const I = S.intro; ['1', '2'].forEach(k => { I[k].map = 'campaign'; });
  const ring = (p, label, o) => ({ ring: Object.assign({}, p, { label }, o || {}) });
  const unit = (p, o) => ({ unit: Object.assign({}, p, o) });
  const arrow = (pts, label, o) => ({ arrow: Object.assign({ pts: pts.map(P), label }, o || {}) });
  I[0].cues = [ Object.assign({ on: 'narrow wooden bridge' }, ring(BRIDGE, 'the bridge', { r: 40 })) ];
  I[1].cues = [
    Object.assign({ on: 'Berwick' }, ring(BERWICK, 'Berwick, March 1296', { r: 24, lx: 30, align: 'left' })),
    Object.assign({ on: 'Dunbar' }, ring(DUNBAR, 'Dunbar, April 1296', { r: 24, ly: -40 })),
    Object.assign({ on: 'Scone' }, ring(SCONE, 'Scone', { r: 22, lx: -30, align: 'right' })) ];
  I[2].cues = [
    Object.assign({ on: 'sheriff of Lanark' }, ring(LANARK, 'Lanark, May 1297', { r: 24, lx: -30, align: 'right' })),
    Object.assign({ on: 'English garrisons' }, ring(INVERNESS, 'Moray’s rising', { r: 60 })),
    Object.assign({ on: 'near Stirling' }, ring(STIRLING, 'Stirling', { r: 26 })) ];
  I[3].cues = [
    Object.assign({ on: 'Stirling Castle' }, ring(CASTLE, 'Stirling Castle', { r: 60 })),
    Object.assign({ on: 'lowest bridge' }, ring(BRIDGE, 'the bridge', { r: 40 })),
    Object.assign({ on: 'narrow causeway' }, arrow([BE, CW1, CW2, CW3, CWHEAD], 'the causeway', { col: '#e9c77a', dy: -20 })),
    Object.assign({ on: 'Abbey Craig' }, ring(CRAIG, 'Abbey Craig', { r: 120 })) ];
  I[4].cues = [
    Object.assign({ on: 'Modern estimates' }, unit({ x: 1760, y: 540 }, { side: 'allied', size: 'XX', label: 'Scots: several thousand' })),
    Object.assign({ on: 'armoured cavalry' }, unit({ x: 660, y: 1120 }, { side: 'french', kind: 'cav', size: 'XX', label: 'English: several thousand' })) ];
  I[5].cues = [
    Object.assign({ on: 'two horsemen' }, ring(BRIDGE, 'the bridge of 1297', { r: 40 })),
    Object.assign({ on: 'four stone piers' }, ring(BRIDGE, 'the pier remains', { r: 70, ly: 90 })) ];
})();
