/*
  Historical Scenario File — Battle of Kadesh, c. 1274 BCE
  --------------------------------------------------------
  This single file drives BOTH experiences of the battle:
    • Watch mode  — the narrated reenactment (orders in `events`)
    • Command mode — the playable battle (AI behaviour in `ai`)

  Every statement about history carries a confidence tag:
    established    — generally accepted by historians
    egyptian       — comes only from Ramesses II's own inscriptions (royal propaganda)
    hittite        — comes only from later Hittite texts
    estimate       — a modern scholarly estimate, not a recorded figure
    reconstruction — our own choice to make the battle playable (positions, timings, map scale)

  Map coordinates are in "world pixels". North is up. The Orontes flows from
  the bottom (south) to the top (north). Roughly 60 px ≈ 1 km, but the map is a
  schematic reconstruction, not a survey.
*/
window.KADESH_SCENARIO = {
  id: 'kadesh',
  title: 'Battle of Kadesh',
  date: 'c. 1274 BCE',
  place: 'Orontes River, near modern Homs, Syria',
  tagline: 'Egypt vs. the Hittite Empire',
  duration: 124,          // seconds of reenactment at 1x speed
  commandDuration: 240,   // seconds before a command-mode battle is called a stalemate
  world: { w: 2400, h: 1800 },

  confidence: {
    established:    { label: 'Established',     color: '#5fcf8a', desc: 'Generally accepted by historians.' },
    egyptian:       { label: 'Egyptian account', color: '#e9c77a', desc: 'Known only from Ramesses II’s own inscriptions, which are royal propaganda.' },
    hittite:        { label: 'Hittite account',  color: '#f0a070', desc: 'Known only from later Hittite texts.' },
    estimate:       { label: 'Estimate',        color: '#7fb8ff', desc: 'A modern scholarly estimate, not a recorded figure.' },
    reconstruction: { label: 'Reconstruction',  color: '#c9a0ff', desc: 'Our own choice to make the battle playable: positions, timings and map scale.' }
  },

  sides: {
    egypt:   { name: 'Egypt',           color: '#3985d7', light: '#c5e2ff', rally: { x: 700, y: 460 } },
    hittite: { name: 'Hittite Empire',  color: '#d44c3e', light: '#ffd0bd', rally: { x: 2080, y: 780 } }
  },

  battlefield: {
    scale: { px: 60, label: '≈ 1 km (schematic)' },
    river: [ [1300,1800],[1340,1600],[1420,1400],[1500,1200],[1540,1000],[1520,800],[1500,650],[1540,480],[1600,300],[1620,0] ],
    tributary: [ [820,840],[1000,815],[1180,785],[1350,760],[1480,745] ],
    fords: [
      { name: 'Ford of Shabtuna', x: 1345, y: 1585, note: 'Where the Egyptian army crossed to the west bank' },
      { name: 'Hittite crossing',  x: 1535, y: 1045, note: 'Reconstructed point where the Hittite chariots crossed' }
    ],
    city: { name: 'KADESH', x: 1270, y: 570, w: 190, h: 160 },
    camp: { name: 'Egyptian camp (Amun)', x: 900, y: 380, w: 240, h: 170 },
    road: [ [1250,1800],[1300,1640],[1345,1585],[1250,1450],[1180,1250],[1150,1000],[1120,800],[1060,620],[1000,560] ],
    forests: [ {x:1000,y:1500,r:170}, {x:850,y:1650,r:140}, {x:1150,y:1700,r:120}, {x:250,y:300,r:150}, {x:2200,y:1500,r:160}, {x:1900,y:150,r:130} ],
    hills: [ {x:300,y:900,rx:120,ry:60}, {x:520,y:1150,rx:90,ry:45}, {x:2150,y:1100,rx:130,ry:60}, {x:1950,y:1650,rx:110,ry:50}, {x:600,y:150,rx:100,ry:45} ],
    labels: [
      { x: 1600, y: 1420, text: 'ORONTES', rotate: -1.1 },
      { x: 950,  y: 1330, text: 'Forest of Labwi', small: true },
      { x: 150,  y: 560,  text: '← to Amurru and the coast', small: true },
      { x: 1500, y: 1790, text: 'to Shabtuna and Egypt ↓', small: true },
      { x: 1900, y: 60,   text: 'to Aleppo ↑', small: true }
    ]
  },

  /* ---------- Opening narration (the map stays visible behind it) ---------- */
  intro: [
    {
      title: 'BATTLE OF KADESH',
      media: [
        { at: 0,  file: '01-ramesseum-battle-relief.jpg', caption: 'The battle as Ramesses II had it carved: the king in his chariot, bow drawn, with the Hittites in disorder before him. Relief on the Ramesseum, Luxor.', ref: 'Ramesseum, second pylon, c. 1250 BCE', credit: 'Photo: Roland Unger, Wikimedia Commons, CC BY-SA 3.0' },
        { at: 12, file: '02-abu-simbel-chariot.jpg', caption: 'Ramesses II charging in his chariot at Kadesh, his pet lion running beside the horses. Relief in the Great Temple of Abu Simbel.', ref: 'Abu Simbel, great hall, north wall', credit: 'Photo: Diego Delso, delso.photo, Wikimedia Commons, CC BY-SA 4.0' }
      ],
      subtitle: 'c. 1274 BCE · Orontes River, Syria',
      focus: { x: 1360, y: 650 }, zoom: 1.25,
      markers: [ { x: 1365, y: 650, label: 'Kadesh' } ],
      auto: 12,
      lines: [
        { text: 'One of the earliest battles in history that we can follow move by move, thanks to the inscriptions Ramesses II carved on his temples.', tag: 'established' },
        { text: 'This introduction separates what the ancient sources actually say from what historians have reconstructed. Watch for the coloured tags.', tag: 'reconstruction' }
      ]
    },
    {
      title: 'Two empires, one border town',
      media: [
        { at: 0,  file: '03-ramesses-ii-statue.jpg', caption: 'Ramesses II enthroned between the god Amun and the goddess Mut, granite, from the temple of Amun at Karnak.', ref: 'Museo Egizio, Turin, Cat. 767', credit: 'Photo: Museo Egizio, Turin, Wikimedia Commons, CC0' },
        { at: 7,  file: '04-muwatalli-relief.jpg', caption: 'Muwatalli II, the only known portrait of the Hittite king, rock relief at Sirkeli.', ref: 'Sirkeli H\u00f6y\u00fck, Adana province, Turkey' },
        { at: 14, file: '05-tell-nebi-mend.jpg', caption: 'Tell Nebi Mend, the mound of ancient Kadesh above the Orontes.', ref: 'Near Homs, Syria; excavated 1921\u201322 and 1975\u201395' },
        { at: 21, file: '06-near-east-map.jpg', caption: 'Egypt, Hatti and the frontier at Kadesh, c. 1274 BCE.', ref: 'Modern map' }
      ],
      focus: { x: 1360, y: 650 }, zoom: 1,
      markers: [ { x: 1365, y: 650, label: 'Kadesh (Tell Nebi Mend)' } ],
      auto: 20,
      lines: [
        { text: 'Ramesses II, pharaoh of Egypt, in the fifth year of his reign, marches north against Muwatalli II, Great King of the Hittites.', tag: 'established' },
        { text: 'The prize is Kadesh, a fortified city on the Orontes, and the land of Amurru beside it: the frontier where the two empires met in Syria.', tag: 'established' },
        { text: 'Amurru had recently switched its loyalty to Egypt. Muwatalli came south with a large coalition to take the frontier back.', tag: 'established' },
        { text: 'The exact year is debated. 1274 BCE is the most common modern dating, but other chronologies give 1275 or 1285.', tag: 'estimate' }
      ]
    },
    {
      title: 'The Egyptian army',
      media: [
        { at: 0,  file: '07-egyptian-chariot.jpg', caption: 'An Egyptian chariot of the period: light, two-wheeled, built for speed.', ref: 'Chariot from the tomb of Tutankhamun, Egyptian Museum, Cairo' },
        { at: 8,  file: '08-egyptian-spearmen-model.jpg', caption: 'Egyptian spearmen with tall shields, wooden model from a tomb at Asyut.', ref: 'Tomb of Mesehti, Egyptian Museum, Cairo, c. 2000 BCE' },
        { at: 15, file: '09-egyptian-archers.jpg', caption: 'Archers in the Egyptian service, from the same tomb.', ref: 'Tomb of Mesehti, Egyptian Museum, Cairo' }
      ],
      focus: { x: 1050, y: 520 }, zoom: .8,
      markers: [ { x: 1020, y: 465, label: 'Amun division' }, { x: 1180, y: 1420, label: 'Re division' }, { x: 1480, y: 1760, label: 'Ptah division' } ],
      auto: 22,
      lines: [
        { text: 'Four divisions, each named for a god: Amun, Re, Ptah and Seth.', tag: 'established' },
        { text: 'Roughly 5,000 men per division, about 20,000 in all, with perhaps 2,000 chariots. No source gives these numbers directly.', tag: 'estimate' },
        { text: 'The Egyptian chariot carried two men, a driver and an archer. It was light and fast, built for shooting on the move.', tag: 'established' },
        { text: 'A fifth force, the Ne’arin, marched separately. The texts never say where from; most historians think along the coast through Amurru.', tag: 'egyptian', cite: 'The Poem and relief captions naming the Ne’arin of Amurru (Ramesseum, Abu Simbel)' }
      ]
    },
    {
      title: 'The Hittite army',
      media: [
        { at: 0,  file: '10-hittite-chariot-relief.jpg', caption: 'A three-man chariot of the Hittite type, with driver, shield bearer and spearman.', ref: 'Relief from Carchemish, Museum of Anatolian Civilizations, Ankara' },
        { at: 8,  file: '11-hattusa-warrior-god.jpg', caption: 'Hittite hieroglyphs at Hattusa, the capital. This chamber was built a century after Kadesh, under Suppiluliuma II.', ref: 'Chamber 2, S\u00fcdburg, Hattusa, Bo\u011fazkale, Turkey, c. 1200 BCE', credit: 'Photo: travellingrunes, Wikimedia Commons, CC BY-SA 2.0' },
        { at: 15, file: '12-hattusa-lion-gate.jpg', caption: 'Hattusa, the Hittite capital, the Lion Gate.', ref: 'Bo\u011fazkale, Turkey' }
      ],
      focus: { x: 1880, y: 620 }, zoom: .9,
      markers: [ { x: 1900, y: 450, label: 'Hittite army, concealed' } ],
      auto: 22,
      lines: [
        { text: 'Egyptian texts claim 37,000 infantry and 2,500 chariots in the first charge, with 1,000 more held back. Most historians think these figures are inflated.', tag: 'egyptian', cite: 'The Poem: Lichtheim, AEL II, pp. 57–72; Kitchen, KRI II, pp. 2–147' },
        { text: 'Muwatalli led a coalition of vassals and allies. The Egyptian list names about nineteen peoples, including Aleppo, Carchemish, Arzawa and the Dardany.', tag: 'egyptian' },
        { text: 'The Hittite chariot carried three men: a driver, a shield bearer and a spearman. It was heavier and built for shock.', tag: 'established' },
        { text: 'The whole army waited out of sight behind the city, on the far side of the river.', tag: 'egyptian' }
      ]
    },
    {
      title: 'The deception',
      media: [
        { at: 0,  file: '13-shasu-relief.jpg', caption: 'Shasu nomads as the Egyptians drew them, bound captives on a relief of Seti I.', ref: 'Karnak, north wall of the hypostyle hall' },
        { at: 10, file: '06-near-east-map.jpg', caption: 'Aleppo lies 200 km north of Kadesh: the lie that drew Ramesses forward.', ref: 'Modern map' }
      ],
      focus: { x: 1345, y: 1480 }, zoom: .8,
      markers: [ { x: 1345, y: 1585, label: 'Ford of Shabtuna' } ],
      auto: 20,
      lines: [
        { text: 'South of Kadesh, two Shasu nomads tell Ramesses the Hittites are far away at Aleppo, 200 km to the north.', tag: 'egyptian', cite: 'The Bulletin, opening section: Lichtheim, AEL II, pp. 57–72' },
        { text: 'They were sent by Muwatalli to say exactly that.', tag: 'egyptian' },
        { text: 'Ramesses races ahead with the Amun division, crosses the ford at Shabtuna, and makes camp north-west of the city.', tag: 'egyptian' },
        { text: 'His other divisions are strung out behind him over many kilometres. The spacing shown on this map is our reconstruction.', tag: 'reconstruction' }
      ]
    },
    {
      title: 'The truth',
      media: [
        { at: 0,  file: '14-beaten-spies-relief.jpg', caption: 'The two Hittite spies beaten in the Egyptian camp, as shown on the reliefs.', ref: 'Ramesseum and Luxor temple reliefs' },
        { at: 8,  file: '15-egyptian-camp-relief.jpg', caption: 'The Egyptian camp with its wall of shields, from the Kadesh reliefs.', ref: 'Abu Simbel and the Ramesseum' }
      ],
      focus: { x: 1100, y: 500 }, zoom: .9,
      markers: [ { x: 1020, y: 465, label: 'The king’s camp' }, { x: 1900, y: 450, label: 'Hittites, behind the city' } ],
      auto: 18,
      lines: [
        { text: 'Egyptian scouts capture two Hittite spies near the camp. Beaten, they confess: the Hittite army is standing right behind Kadesh.', tag: 'egyptian', cite: 'The Bulletin; relief caption at the Ramesseum and Luxor showing the two scouts being beaten' },
        { text: 'Ramesses sends his vizier racing south to hurry the Re and Ptah divisions forward.', tag: 'egyptian' },
        { text: 'It is already too late.', tag: 'established' }
      ]
    },
    {
      title: 'How to read this reenactment',
      media: [
        { at: 0,  file: '16-papyrus-sallier.jpg', caption: 'A papyrus copy of the Poem of Kadesh, written about a century after the battle.', ref: 'Papyrus Sallier III, British Museum EA 10181' },
        { at: 9,  file: '17-treaty-tablet.jpg', caption: 'The peace treaty of c. 1259 BCE, the Hittite copy on a clay tablet in Akkadian, found at Hattusa in 1906.', ref: 'Museum of the Ancient Orient, Istanbul', credit: 'Photo: Osama Shukir Muhammed Amin, Wikimedia Commons, CC BY-SA 4.0' }
      ],
      focus: { x: 1250, y: 900 }, zoom: .6,
      markers: [],
      auto: 18,
      lines: [
        { text: 'Troop positions, movements and timings on this map are a reconstruction. The ancient account is a story, not a battlefield record.', tag: 'reconstruction' },
        { text: 'Captions carry the same confidence tags. Press “Explain this moment” at any point to pause and read why a commander may have acted as he did.', tag: 'reconstruction' },
        { text: 'The camera follows the action. Drag the map, use the arrow keys, or click the minimap to look around; press Follow to return.', tag: 'reconstruction' }
      ]
    },
    {
      title: 'The trap is sprung. What happens next?',
      focus: { x: 1250, y: 900 },
      markers: [],
      choice: true,
      lines: [
        { text: 'The story continues on the battlefield. Choose how to see it.', tag: 'established' },
        { text: 'Watch the reenactment: the whole battle in sixteen narrated chapters, from the chariots crossing the Orontes to the second day and the truce, then a debrief on what the sources say really happened.', tag: 'established' },
        { text: 'Take command: lead one of the armies from this moment and see whether you can change the outcome. The debrief then compares your battle with history.', tag: 'reconstruction' }
      ]
    }
  ],

  /* ---------- Formations (shared by both modes) ---------- */
  formations: [
    // Egypt
    { id: 'guard',     side: 'egypt',   name: 'Ramesses II & household chariots', division: 'Amun', type: 'chariot',  cols: 3, rows: 2, power: 1.3, x: 1085, y: 505,
      count: 'A few hundred chariots and guards', confidence: 'reconstruction',
      note: 'The Poem has Ramesses fighting almost alone. Historians assume his guard and the chariots in camp fought beside him.' },
    { id: 'amun-inf',  side: 'egypt',   name: 'Amun division (infantry)', division: 'Amun', type: 'infantry', cols: 6, rows: 4, power: 1.0, x: 960, y: 450,
      count: 'c. 4,000 men', confidence: 'estimate',
      note: 'The first division to arrive. It was in camp, not in battle order, when the Hittite chariots struck.' },
    { id: 'amun-char', side: 'egypt',   name: 'Amun division (chariots)', division: 'Amun', type: 'chariot',  cols: 3, rows: 2, power: 1.0, x: 1085, y: 415,
      count: 'c. 500 chariots', confidence: 'estimate',
      note: 'Light two-man chariots with a driver and an archer.' },
    { id: 're-inf',    side: 'egypt',   name: 'Re division (infantry)', division: 'Re', type: 'infantry', cols: 4, rows: 7, power: 1.0, x: 1180, y: 1420, speed: 12,
      count: 'c. 4,000 men', confidence: 'estimate',
      note: 'Caught in column of march by the Hittite chariots and scattered. Its rout is one of the best-attested moments of the battle.' },
    { id: 're-char',   side: 'egypt',   name: 'Re division (chariots)', division: 'Re', type: 'chariot',  cols: 3, rows: 2, power: 1.0, x: 1120, y: 1500, speed: 12,
      count: 'c. 500 chariots', confidence: 'estimate',
      note: 'Marching with the Re division when the attack came.' },
    { id: 'ptah-inf',  side: 'egypt',   name: 'Ptah division (infantry)', division: 'Ptah', type: 'infantry', cols: 6, rows: 4, power: 1.0, x: 1480, y: 1765, speed: 14,
      count: 'c. 4,000 men', confidence: 'estimate',
      note: 'Still south of the Orontes when the battle began. Its arrival late in the day helped turn the tide.' },
    { id: 'ptah-char', side: 'egypt',   name: 'Ptah division (chariots)', division: 'Ptah', type: 'chariot',  cols: 3, rows: 2, power: 1.0, x: 1420, y: 1705, speed: 14,
      count: 'c. 500 chariots', confidence: 'estimate',
      note: 'Marching with the Ptah division.' },
    { id: 'seth-inf',  side: 'egypt',   name: 'Seth division (never engaged)', division: 'Seth', type: 'infantry', cols: 6, rows: 2, power: 1.0, x: 1720, y: 1782, speed: 10,
      count: 'c. 5,000 men', confidence: 'estimate',
      note: 'The rearmost division. It took no part in the fighting, according to the Egyptian account.' },
    { id: 'nearin',    side: 'egypt',   name: 'The Ne’arin', division: 'Ne’arin', type: 'infantry', cols: 5, rows: 3, power: 1.2, x: 60, y: 560, speed: 50, hidden: true,
      count: 'Unknown; a strong mixed force', confidence: 'egyptian',
      note: 'A separate Egyptian force that arrived from the west at the critical moment. Its route along the coast is a reconstruction.' },
    // Hittites
    { id: 'hit-inf',   side: 'hittite', name: 'Hittite infantry (main body)', division: 'Muwatalli', type: 'infantry', cols: 10, rows: 4, power: 1.2, x: 1920, y: 430, speed: 22, hidden: true,
      count: 'Egyptian texts claim 37,000', confidence: 'egyptian',
      note: 'The bulk of the Hittite army. It never crossed the river and never fought, according to the Egyptian account.' },
    { id: 'muwatalli', side: 'hittite', name: 'Muwatalli II & allied kings', division: 'Muwatalli', type: 'chariot', cols: 2, rows: 1, power: 1.0, x: 2010, y: 470, speed: 22, hidden: true,
      count: 'The king’s own retinue', confidence: 'reconstruction',
      note: 'Muwatalli stayed with his infantry on the east bank. The Egyptian account says his brothers and allied kings rode with the second chariot wave.' },
    { id: 'hit-char-a', side: 'hittite', name: 'Hittite chariots (1st wave, left)', division: 'First wave', type: 'chariot', cols: 4, rows: 2, power: 1.3, x: 1830, y: 560, speed: 60, hidden: true, ai: 'hunt',
      count: 'Part of a claimed 2,500', confidence: 'egyptian',
      note: 'Heavy three-man chariots. We show the first wave as three groups so its sweep across the field is visible.' },
    { id: 'hit-char-b', side: 'hittite', name: 'Hittite chariots (1st wave, centre)', division: 'First wave', type: 'chariot', cols: 4, rows: 2, power: 1.3, x: 1900, y: 630, speed: 60, hidden: true, ai: 'hunt',
      count: 'Part of a claimed 2,500', confidence: 'egyptian',
      note: 'Heavy three-man chariots.' },
    { id: 'hit-char-c', side: 'hittite', name: 'Hittite chariots (1st wave, right)', division: 'First wave', type: 'chariot', cols: 4, rows: 2, power: 1.3, x: 1830, y: 700, speed: 60, hidden: true, ai: 'hunt',
      count: 'Part of a claimed 2,500', confidence: 'egyptian',
      note: 'Heavy three-man chariots.' },
    { id: 'hit-char2',  side: 'hittite', name: 'Hittite chariots (2nd wave)', division: 'Second wave', type: 'chariot', cols: 5, rows: 2, power: 1.2, x: 1960, y: 770, speed: 55, hidden: true, ai: 'wave2',
      count: 'Egyptian texts claim 1,000', confidence: 'egyptian',
      note: 'Committed late in the day. The Egyptian account says it included Muwatalli’s brothers and allied kings.' }
  ],

  /* ---------- Watch mode: the historical orders, in order ---------- */
  events: [
    { t: 0, title: 'The march', tag: 'egyptian', focus: { x: 1150, y: 900 },
      text: 'Ramesses has camped north-west of Kadesh with the Amun division. Re is strung out on the road behind him, Ptah is still crossing at Shabtuna and Seth is far to the south. He believes the Hittites are 200 km away at Aleppo.',
      explain: 'Why rush ahead? Ramesses trusted the two Shasu who said the enemy was at Aleppo. Reaching Kadesh first would let him begin a siege before the Hittites arrived. The Egyptian account blames the deception, not the king, for the gap between his divisions.',
      orders: [
        { id: 're-inf', to: { x: 1150, y: 980 }, speed: 12 }, { id: 're-char', to: { x: 1100, y: 1000 }, speed: 12 },
        { id: 'ptah-inf', to: { x: 1250, y: 1000 }, speed: 14 }, { id: 'ptah-char', to: { x: 1210, y: 1010 }, speed: 14 }
      ] },
    { t: 8, title: 'Captured scouts', tag: 'egyptian', focus: { x: 1050, y: 500 },
      text: 'Two Hittite scouts are captured and beaten until they confess: the Hittite army is standing behind the city. Ramesses sends his vizier racing south to hurry the Re and Ptah divisions.',
      explain: 'The Bulletin says the scouts were beaten before they talked. The Hittite army now slides south along the east bank, keeping the city between itself and the Egyptian camp.',
      orders: [
        { id: 'hit-inf', to: { x: 1880, y: 900 }, speed: 22 }, { id: 'muwatalli', to: { x: 1990, y: 880 }, speed: 22 },
        { id: 'hit-char-a', to: { x: 1790, y: 930 }, speed: 25 }, { id: 'hit-char-b', to: { x: 1860, y: 1000 }, speed: 25 }, { id: 'hit-char-c', to: { x: 1800, y: 1060 }, speed: 25 },
        { id: 'hit-char2', to: { x: 1940, y: 870 }, speed: 25 }
      ] },
    { t: 20, title: 'The chariots cross', tag: 'egyptian', focus: { x: 1500, y: 1050 },
      text: 'Muwatalli sends his chariots across the Orontes south of Kadesh. The Egyptian account claims 2,500 chariots in this first wave.',
      explain: 'Why chariots alone? A chariot force could cross and strike fast while the infantry stayed safe behind the river. The target was not the camp but the Re division, caught in the open on the march.',
      orders: [
        { id: 'hit-char-a', visible: true, to: { x: 1450, y: 1070 }, speed: 60 }, { id: 'hit-char-b', visible: true, to: { x: 1440, y: 1125 }, speed: 60 }, { id: 'hit-char-c', visible: true, to: { x: 1445, y: 1015 }, speed: 60 }
      ] },
    { t: 26, title: 'Into the flank', tag: 'reconstruction', focus: { x: 1220, y: 1060 },
      text: 'The Hittite chariots sweep west onto the marching column of the Re division. Re is in line of march, not in battle formation.',
      explain: 'A column on the march cannot fight. Its men are spread along the road, its chariots are not harnessed for battle, and it has no flank guard. This is the moment the Hittite plan was built around.',
      orders: [
        { id: 'hit-char-a', to: { x: 1215, y: 1040 }, speed: 70 }, { id: 'hit-char-b', to: { x: 1200, y: 1110 }, speed: 70 }, { id: 'hit-char-c', to: { x: 1230, y: 975 }, speed: 70 }
      ] },
    { t: 30, title: 'Re breaks', tag: 'egyptian', focus: { x: 1150, y: 950 },
      text: 'Taken in the flank, the Re division shatters. Survivors flee north toward the king’s camp with Hittite chariots on their heels.',
      explain: 'The rout of Re is accepted by nearly all historians: the Egyptian texts had no reason to invent a disaster. How many died is unknown.',
      orders: [
        { id: 're-inf', state: 'rout', to: { x: 1020, y: 620 }, speed: 36, spread: 2.6, strengthTo: 25, over: 6 },
        { id: 're-char', state: 'rout', to: { x: 880, y: 1000 }, speed: 50, spread: 2.2, strengthTo: 40, over: 6 },
        { id: 'hit-char-a', to: { x: 1120, y: 900 }, speed: 40 }, { id: 'hit-char-b', to: { x: 1200, y: 880 }, speed: 40 }, { id: 'hit-char-c', to: { x: 1080, y: 960 }, speed: 40 }
      ] },
    { t: 42, title: 'Charge on the camp', tag: 'egyptian', focus: { x: 1040, y: 500 },
      text: 'The Hittite chariots crash into the Amun camp, driving the fleeing soldiers of Re before them.', cite: 'The Bulletin; the camp relief at Abu Simbel and the Ramesseum',
      explain: 'The camp was fortified with a wall of shields, according to the reliefs, but it was full of men who were not expecting a fight. Fugitives from Re arrived with the enemy right behind them.',
      orders: [
        { id: 'hit-char-a', to: { x: 1000, y: 520 }, speed: 60 }, { id: 'hit-char-b', to: { x: 1080, y: 565 }, speed: 60 }, { id: 'hit-char-c', to: { x: 1060, y: 440 }, speed: 60 }
      ] },
    { t: 52, title: 'Ramesses stands', tag: 'egyptian', focus: { x: 1060, y: 490 },
      text: 'The Egyptian account says the camp dissolved in panic and that Ramesses, with only his household troops, charged the Hittite chariots again and again, calling on Amun.',
      explain: 'How much of this is true? The Poem is a royal text written to glorify the king, who claims he fought alone. But a counter-attack by whatever chariots were at hand is plausible, and something stopped the Hittite charge.',
      orders: [
        { id: 'amun-inf', state: 'rout', to: { x: 640, y: 430 }, speed: 34, spread: 2.4, strengthTo: 50, over: 8 },
        { id: 'amun-char', state: 'attack', to: { x: 1130, y: 560 }, speed: 40 },
        { id: 'guard', state: 'attack', to: { x: 1060, y: 540 }, speed: 40 },
        { id: 'hit-char-a', strengthTo: 70, over: 10 }, { id: 'hit-char-b', strengthTo: 70, over: 10 }, { id: 'hit-char-c', strengthTo: 70, over: 10 }
      ] },
    { t: 60, title: 'Plunder', tag: 'egyptian', focus: { x: 1040, y: 490 },
      text: 'The Hittite crews stop to plunder the camp, according to the Egyptian account. That pause may have saved the pharaoh.',
      explain: 'Looting a captured camp was normal in ancient warfare, and it broke the momentum of the attack. Whether it happened here or is an excuse written by the Egyptians, we cannot tell.',
      orders: [ { id: 'hit-char-a', state: 'loot' }, { id: 'hit-char-b', state: 'loot' }, { id: 'hit-char-c', state: 'loot' } ] },
    { t: 62, title: 'The Ne’arin arrive', tag: 'egyptian', focus: { x: 350, y: 540 },
      text: 'A fresh Egyptian force, the Ne’arin, appears from the west. The texts never say where it came from; most historians think it marched along the coast through Amurru.',
      explain: 'Was this luck or planning? Some historians think Ramesses had arranged for the Ne’arin to meet him at Kadesh that day. The Egyptian account presents their arrival as a gift of the gods.',
      orders: [ { id: 'nearin', visible: true, at: { x: 60, y: 560 }, to: { x: 880, y: 480 }, speed: 50 } ] },
    { t: 70, title: 'The second wave', tag: 'egyptian', focus: { x: 1600, y: 620 },
      text: 'Muwatalli commits a second wave across the river north of the city: the Egyptian account says 1,000 chariots, including his own brothers and allied kings.',
      explain: 'Why not send the infantry? A river crossing under pressure is slow, and the Hittite infantry would have been exposed while fording. Chariots could cross and withdraw quickly.',
      orders: [ { id: 'hit-char2', visible: true, to: { x: 1460, y: 600 }, speed: 55 } ] },
    { t: 78, title: 'Counter-attack', tag: 'reconstruction', focus: { x: 1150, y: 520 },
      text: 'Caught between the Ne’arin and the king’s chariots, the Hittite crews are driven back east toward the river.',
      explain: 'Heavy three-man chariots that have stopped to loot lose their main advantage: speed. Fresh infantry and lighter Egyptian chariots could now take them at a disadvantage.',
      orders: [
        { id: 'nearin', state: 'attack', to: { x: 980, y: 490 }, speed: 40 },
        { id: 'hit-char-a', to: { x: 1400, y: 560 }, speed: 22, strengthTo: 35, over: 12 },
        { id: 'hit-char-b', to: { x: 1420, y: 630 }, speed: 22, strengthTo: 35, over: 12 },
        { id: 'hit-char-c', to: { x: 1380, y: 500 }, speed: 22, strengthTo: 35, over: 12 },
        { id: 'hit-char2', to: { x: 1250, y: 520 }, speed: 50 }
      ] },
    { t: 86, title: 'Ptah arrives', tag: 'egyptian', focus: { x: 1250, y: 900 },
      text: 'The Ptah division reaches the field from the south. The pendulum has swung.',
      explain: 'The Egyptian account gives Ptah credit for the recovery. With fresh infantry arriving and the Ne’arin already engaged, the Hittite chariots were outnumbered on the west bank.',
      orders: [
        { id: 'ptah-inf', to: { x: 1180, y: 720 }, speed: 18 }, { id: 'ptah-char', to: { x: 1240, y: 700 }, speed: 20 },
        { id: 'hit-char2', to: { x: 1480, y: 590 }, speed: 30, strengthTo: 45, over: 10 }
      ] },
    { t: 92, title: 'Into the Orontes', tag: 'egyptian', focus: { x: 1500, y: 580 },
      text: 'Hittite chariots are pushed back into the Orontes. The reliefs show the prince of Aleppo being held upside down to drain the water from him after he was pulled from the river.', cite: 'Relief caption (Ramesseum, Abu Simbel): the chief of Aleppo turned upside down by his soldiers to empty him of water',
      explain: 'The reliefs delight in drowning Hittites and tumbling chariots. Some of this is genuine: a chariot force retreating across a river under attack is in real danger.',
      orders: [
        { id: 'hit-char-a', to: { x: 1540, y: 560 }, speed: 20, strengthTo: 15, over: 8 },
        { id: 'hit-char-b', to: { x: 1560, y: 640 }, speed: 20, strengthTo: 15, over: 8 },
        { id: 'hit-char-c', to: { x: 1545, y: 500 }, speed: 20, strengthTo: 15, over: 8 },
        { id: 'guard', to: { x: 1380, y: 540 }, speed: 30 }, { id: 'amun-char', to: { x: 1400, y: 620 }, speed: 30 }, { id: 'nearin', to: { x: 1300, y: 500 }, speed: 30 }
      ] },
    { t: 100, title: 'Across the river', tag: 'egyptian', focus: { x: 1750, y: 700 },
      text: 'The survivors recross the river. Muwatalli’s infantry, the bulk of his army, never fought at all.',
      explain: 'Why did the infantry stay out? Perhaps Muwatalli judged the chariot raid had failed and saw no reason to risk his main body. Perhaps he never meant to fight a pitched battle at all.',
      orders: [
        { id: 'hit-char-a', state: 'rout', to: { x: 1950, y: 650 }, speed: 45, then: 'withdrawn' },
        { id: 'hit-char-b', state: 'rout', to: { x: 1980, y: 720 }, speed: 45, then: 'withdrawn' },
        { id: 'hit-char-c', state: 'rout', to: { x: 1930, y: 580 }, speed: 45, then: 'withdrawn' },
        { id: 'hit-char2', to: { x: 1960, y: 800 }, speed: 45 },
        { id: 'guard', to: { x: 1150, y: 500 }, speed: 30 }, { id: 'amun-char', to: { x: 1120, y: 430 }, speed: 30 }, { id: 'nearin', to: { x: 1000, y: 560 }, speed: 30 }
      ] },
    { t: 110, title: 'Nightfall', tag: 'reconstruction', focus: { x: 1050, y: 520 },
      text: 'The first day ends. Egyptian stragglers drift back toward the camp. Both kings still have large forces in hand.',
      explain: 'Neither side had been destroyed. Egypt had lost much of the Re division and its camp had been overrun; Hatti had lost many chariots and their crews, including senior nobles.',
      orders: [
        { id: 'amun-inf', state: 'move', to: { x: 940, y: 470 }, speed: 20, spread: 1.4 },
        { id: 're-inf', state: 'move', to: { x: 990, y: 600 }, speed: 15, spread: 1.6 },
        { id: 're-char', state: 'move', to: { x: 900, y: 650 }, speed: 25, spread: 1.3 }
      ] },
    { t: 120, title: 'Day two and after', tag: 'egyptian', focus: { x: 1360, y: 650 }, end: true,
      text: 'The Egyptian account claims fighting resumed the next morning and that Muwatalli asked for a truce. Ramesses marched home. Kadesh stayed Hittite.',
      explain: 'The second day is barely described in any source. What is certain is the result: Egypt did not take Kadesh, Amurru returned to Hittite control, and both kings claimed victory.',
      orders: [] }
  ],

  /* ---------- Command mode: how the Hittite AI behaves ---------- */
  ai: {
    hittite: {
      infantryShift: { t: 8,  to: { x: 1880, y: 900 } },
      kingShift:     { t: 8,  to: { x: 1990, y: 880 } },
      firstWave:     { t: 20, cross: [ { x: 1450, y: 1070 }, { x: 1440, y: 1125 }, { x: 1445, y: 1015 } ] },
      secondWave:    { t: 70, cross: { x: 1460, y: 600 } },
      huntRange: 900,
      holdPoint: { x: 1800, y: 900 },
      infantryReact: 420
    },
    spotRange: 340
  },

  outcome: [
    { text: 'The Hittite chariot attack was stopped and its survivors driven back across the Orontes.', tag: 'established' },
    { text: 'Muwatalli’s infantry never fought.', tag: 'egyptian' },
    { text: 'Fighting resumed on the second day and Muwatalli proposed a truce.', tag: 'egyptian' },
    { text: 'Ramesses withdrew to Egypt. Kadesh stayed Hittite, and Amurru returned to Hittite control.', tag: 'established' },
    { text: 'Later Hittite texts claim Muwatalli defeated Ramesses and advanced south into the land of Upi, around Damascus.', tag: 'hittite', cite: 'Apology of Hattusili III (CTH 81), § 10; van den Hout, Context of Scripture I, no. 1.77' },
    { text: 'Most historians call it a tactical draw at best for Egypt and a strategic success for the Hittites. Ramesses’s temples call it a glorious victory.', tag: 'established' },
    { text: 'About fifteen years later, c. 1259 BCE, Ramesses II and Hattusili III sealed the earliest surviving peace treaty known from both sides. A copy hangs at the United Nations.', tag: 'established', cite: 'Treaty CTH 91: Hittite tablets from Hattusa; Egyptian text at Karnak and the Ramesseum. Beckman, Hittite Diplomatic Texts, no. 15' }
  ],

  /* Recorded narration lives in audio/ (generated by make-narration.sh). Paths follow a convention:
     intro-N.mp3, event-N.mp3, explain-N.mp3, outcome.mp3, cmd-KEY.mp3. A slide or event may override with its own `audio`. */
  imageBase: 'images/',   // photos for the intro slideshow; see images/README.md for what to put there
  audioBase: 'audio/',
  /* Selectable narrators. Each has its own folder audio/<id>/ with the same clip names.
     All are Piper "en-us-libritts-high" speakers (LibriTTS dataset, CC BY 4.0). */
  voices: [
    { id: 'clear',    name: 'Narrator 1 \u00b7 clear',  speaker: 25 },
    { id: 'light',    name: 'Narrator 2 \u00b7 light',  speaker: 60 },
    { id: 'bright',   name: 'Narrator 3 \u00b7 bright', speaker: 0 },
    { id: 'deep',     name: 'Narrator 4 \u00b7 deep',   speaker: 400 },
    { id: 'warm',     name: 'Narrator 5 \u00b7 warm',   speaker: 7 },
    { id: 'computer', name: 'Computer \u00b7 calm',     speaker: 500, length: 1.3, piperArgs: '--noise-scale 0.4 --noise-w 0.3', mix: 'highpass=f=90,lowpass=f=4800,bass=g=4:f=140,acompressor=threshold=0.25:ratio=3:attack=20:release=250,volume=1.4,alimiter=limit=0.95' }
  ],

  /* Fixed captions used in Command mode (so they can be pre-recorded) */
  commandLines: {
    start:    'You lead the Egyptian army. Click a formation or drag a box around several, then right-click the map for orders. The Hittite army is hidden until your troops sight it.',
    starth:   'You lead the Hittite army. The Egyptians do not know you are here: the Amun division is in camp north-west of the city and Re is strung out on the road to the south. Your chariots are concealed behind Kadesh. Click a formation or drag a box around several, then right-click the map for orders.',
    scouts:   'Two Hittite scouts confess: the enemy army is behind the city. You now command the Egyptian army. Re and Ptah are still on the road; the Hittites will move first.',
    crossing: 'Dust rises south of the city. Something is crossing the Orontes.',
    nearin:   'A fresh Egyptian force appears from the west. It is under your command.',
    sighted:  'Enemy formation sighted.',
    breaks:   'One of your formations has broken and is fleeing the field.'
  },

  /* ---------- Where each confidence tag comes from: click any tag in the game ---------- */
  citations: {
    established: { title: 'Established', intro: 'Accepted by most historians because the Egyptian narrative, the Hittite references and the archaeology agree on it.', items: [
      { ref: 'K. A. Kitchen, Pharaoh Triumphant: The Life and Times of Ramesses II (Aris & Phillips, 1982), ch. 4', note: 'The standard modern account of the campaign.' },
      { ref: 'T. Bryce, The Kingdom of the Hittites, 2nd ed. (Oxford, 2005), ch. 9', note: 'The battle seen from the Hittite side.' },
      { ref: 'M. Healy, Qadesh 1300 BC: Clash of the Warrior Kings (Osprey Campaign 22, 1993)', note: 'Illustrated reconstruction with maps and orders of battle.' },
      { ref: 'A. J. Spalinger, War in Ancient Egypt: The New Kingdom (Blackwell, 2005), ch. 9', note: 'Analysis of the sources and of the Egyptian army.' },
      { ref: 'H. Goedicke (ed.), Perspectives on the Battle of Kadesh (Halgo, 1985)', note: 'Essays on the texts and the topography.' },
      { ref: 'J. H. Breasted, The Battle of Kadesh: A Study in the Earliest Known Military Strategy (Chicago, 1903)', note: 'The first modern reconstruction and the basis of most battle maps. Public domain.' }
    ] },
    egyptian: { title: 'Egyptian account', intro: 'Ramesses II had the story carved, with pictures, on at least five temples and copied on papyrus. Two texts survive, the long Poem and the shorter Bulletin, plus captions on the reliefs. They are royal propaganda: the king is the hero and the enemy numbers are suspect.', items: [
      { ref: 'The Poem (the Poem of Pentaur): Abydos, Karnak, Luxor, the Ramesseum, Abu Simbel; Papyrus Sallier III, British Museum EA 10181', note: 'The long narrative: the deception, the king alone, the Ne’arin, the second day and the truce.' },
      { ref: 'The Bulletin (also called the Record): Luxor, the Ramesseum, Abu Simbel, Abydos', note: 'The shorter, more factual report: the two Shasu, the camp, the captured scouts, the charge on the camp.' },
      { ref: 'The reliefs and their captions: Luxor, the Ramesseum, Abu Simbel, Karnak, Abydos', note: 'Pictures of the camp, the Hittite charge, the king in his chariot and the drowning in the Orontes, with named enemy officers.' },
      { ref: 'M. Lichtheim, Ancient Egyptian Literature, vol. II (California, 1976), pp. 57–72', note: 'Poem and Bulletin in English.' },
      { ref: 'A. H. Gardiner, The Kadesh Inscriptions of Ramesses II (Oxford, 1960)', note: 'Full edition of every version with commentary.' },
      { ref: 'K. A. Kitchen, Ramesside Inscriptions II (Blackwell, 1979), pp. 2–147; English in RITA II (1996)', note: 'The standard edition of the hieroglyphic text.' },
      { ref: 'J. H. Breasted, Ancient Records of Egypt III (Chicago, 1906), §§ 298–351', note: 'Older translation, public domain and widely available online.' }
    ] },
    hittite: { title: 'Hittite account', intro: 'No Hittite narrative of the battle survives. The campaign is mentioned briefly in later texts from Hattusa, which claim a Hittite success.', items: [
      { ref: 'The Apology of Hattusili III (CTH 81), § 10', note: 'Hattusili, Muwatalli’s brother, records the war with Egypt and the Hittite advance into the land of Upi near Damascus. English: Th. van den Hout in Hallo & Younger (eds.), The Context of Scripture I (Brill, 1997), no. 1.77.' },
      { ref: 'The Egyptian–Hittite peace treaty (CTH 91), c. 1259 BCE', note: 'Hittite version on clay tablets from Hattusa; Egyptian version carved at Karnak and the Ramesseum. English: G. Beckman, Hittite Diplomatic Texts, 2nd ed. (1999), no. 15. A replica hangs at the United Nations in New York.' },
      { ref: 'Royal correspondence between the courts of Ramesses II and Hattusili III', note: 'Later letters refer back to the battle and dispute each other’s version. Edition: E. Edel, Die \u00e4gyptisch-hethitische Korrespondenz aus Boghazköi (1994).' }
    ] },
    estimate: { title: 'Estimate', intro: 'No ancient source gives the size of the Egyptian army or the length of the march. These figures come from modern historians working from the number of divisions, the names of officers and comparison with other campaigns.', items: [
      { ref: 'M. Healy, Qadesh 1300 BC (Osprey, 1993), orders of battle', note: 'About 20,000 Egyptians in four divisions; the Hittite figures in the Poem treated as exaggerated.' },
      { ref: 'A. J. Spalinger, War in Ancient Egypt (2005), ch. 9', note: 'Discussion of division sizes and chariot numbers.' },
      { ref: 'K. A. Kitchen, Pharaoh Triumphant (1982), ch. 4', note: 'The battle is dated to regnal year 5; the absolute year depends on the chronology used.' }
    ] },
    reconstruction: { title: 'Reconstruction', intro: 'Choices made for this game so that the battle can be shown and played. They are not claims about what happened.', items: [
      { ref: 'The map', note: 'A schematic of the Orontes bend at Tell Nebi Mend, after the plans in Breasted (1903) and Healy (1993). Excavations of the site: M. Pézard (1921–22); P. J. Parr, University College London (1975–95).' },
      { ref: 'Positions, timings and speeds', note: 'Chosen to show the sequence in the Egyptian texts in about two minutes. Real distances were kilometres and the fighting lasted a day.' },
      { ref: 'Combat results in Command mode', note: 'A simple strength model. Nothing about it is historical.' }
    ] }
  },

  sources: [
    { title: 'The Poem (Poem of Pentaur) and the Bulletin', note: 'The two Egyptian texts of the battle, carved at Abydos, Karnak, Luxor, the Ramesseum and Abu Simbel, and copied on papyrus.' },
    { title: 'The temple reliefs', note: 'Picture-narratives of the camp, the Hittite charge, the king’s stand and the drowning of the Hittites in the Orontes.' },
    { title: 'Hittite texts', note: 'The Apology of Hattusili III and later royal letters, which mention the campaign briefly and claim a Hittite success.' },
    { title: 'Modern studies', note: 'J. H. Breasted, The Battle of Kadesh (1903); K. A. Kitchen, Pharaoh Triumphant (1982); M. Healy, Qadesh 1300 BC (Osprey, 1993).' }
  ]
};
