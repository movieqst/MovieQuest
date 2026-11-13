/*
  Historical Scenario File — Battle of Sekigahara, 21 October 1600
  -----------------------------------------------------------------
  The narrated introduction (`intro`), the reenactment chapters (`events`) and the debrief (`outcome`), word for word from
  NARRATION-SCRIPT.md, which is what the narrators recorded (audio/<voice>/). This part is written by
  tools/make-scenario-text.py; the map, armies and moves are set in the block below the marker line.
  Tags: established, letter (the letters written days after the battle), later (later accounts), disputed, estimate, reconstruction.
*/
window.SEKIGAHARA_SCENARIO = window.SEKIGAHARA_SCENARIO || {};
Object.assign(window.SEKIGAHARA_SCENARIO, {
  id: 'sekigahara',
  title: 'Battle of Sekigahara',
  date: '21 October 1600',
  place: 'Sekigahara, Mino Province, central Japan',
  tagline: 'The Eastern Army of Tokugawa Ieyasu vs. the Western Army',
  confidence: {
    established:    { label: 'Established',    color: '#5fcf8a', desc: 'Agreed by historians.' },
    letter:         { label: 'Letter of 1600', color: '#ffd27a', desc: 'From the letters written in the first days after the battle, read by modern historians. Short, and read in more than one way.' },
    later:          { label: 'Later account',  color: '#b0b8c0', desc: 'From chronicles and stories written long after the battle: the famous version.' },
    disputed:       { label: 'Disputed',       color: '#ff9a86', desc: 'The sources disagree, or historians do.' },
    estimate:       { label: 'Estimate',       color: '#e9c77a', desc: 'An estimate, not a recorded figure.' },
    reconstruction: { label: 'Reconstruction', color: '#c8a2ff', desc: 'Our own choice, to make the battle visible: where each army stood and how it moved.' }
  },
  sides: {
    allied: { name: 'Eastern Army', short: 'East', army: 'The Eastern Army of Tokugawa Ieyasu', color: '#c0392b', light: '#ffd6d0' },
    french: { name: 'Western Army', short: 'West', army: 'The Western Army, raised in the name of Toyotomi Hideyori', color: '#2e5aa8', light: '#d0dcff' }
  },
  welcome: "Welcome to Battles of History. Today we are learning about the Battle of Sekigahara, fought on the 21st of October 1600, in central Japan, between the Eastern Army of Tokugawa Ieyasu and the Western Army raised in the name of the young heir of Toyotomi Hideyoshi.",
  intro: [
  {
    "title": "BATTLE OF SEKIGAHARA",
    "lines": [
      {
        "text": "On a wet autumn day in 1600, two enormous coalitions fought in the valley of Sekigahara. By evening, Tokugawa Ieyasu was the most powerful man in Japan.",
        "tag": "established"
      },
      {
        "text": "The famous story of this battle was written down long afterwards. This introduction separates what the letters of the time say from what later chronicles added. Watch the colour of each tag.",
        "tag": "reconstruction"
      }
    ],
    "media": [
      {
        "at": 0,
        "file": "01-sekigahara-kassen-byobu-1854.jpg",
        "caption": "Sekigahara Kassen Byōbu, a six-panel folding screen of the battle: an 1854 replica of the Hikone screen of the 1620s by Kanō Sadanobu (not a faithful copy: some omissions and changes)",
        "credit": "Collection of the Town of Sekigahara Archive of History and Cultural Anthropology; Wikimedia Commons, File:Sekigaharascreen.jpg. Public domain (artist dead more than 70 years). This copy is 1500 px wide; the Commons original is 3516 x 1796"
      }
    ]
  },
  {
    "title": "After Hideyoshi",
    "lines": [
      {
        "text": "Toyotomi Hideyoshi had united Japan after a century of civil war. When he died in 1598, his son Hideyori was five years old.",
        "tag": "established"
      },
      {
        "text": "Hideyoshi left the government to two groups that overlapped: five great lords, the Elders, and five Commissioners who ran the daily business. The strongest of the Elders was Tokugawa Ieyasu.",
        "tag": "established"
      },
      {
        "text": "Within a year the council was breaking apart. Ieyasu moved into Osaka Castle and began to act as the ruler of the country.",
        "tag": "established"
      }
    ],
    "media": [
      {
        "at": 0,
        "file": "02-sekigahara-byobu-gifu-north-view.jpg",
        "caption": "Sekigahara Kassen Byōbu-zu, a folding screen of the late Edo period (19th century): the only one of the many Sekigahara screens that shows the battlefield from the north",
        "credit": "Collection of the City of Gifu Museum of History; Wikimedia Commons, File:Sekigahara Kassen Byōbu-zu (Gifu History Museum).jpg. Public domain. This copy is 1500 px wide; the Commons original is 7700 x 3501"
      }
    ]
  },
  {
    "title": "Two coalitions",
    "lines": [
      {
        "text": "In the summer of 1600 Ieyasu marched north-east against a rival lord, Uesugi Kagekatsu. While he was away, his enemies rose in the west.",
        "tag": "established"
      },
      {
        "text": "The traditional story makes the Commissioner Ishida Mitsunari the leader of the West. Historians today point out that its official commander was the great lord Mōri Terumoto, who stayed in Osaka Castle with the boy Hideyori. Ishida was its organiser in the field.",
        "tag": "established"
      },
      {
        "text": "Many of Hideyoshi's own generals sided with Ieyasu. This was not a simple war of loyal men against traitors: Toyotomi followers fought on both sides.",
        "tag": "established"
      }
    ],
    "media": [
      {
        "at": 0,
        "file": "10-map-japan-1600-alignments.png",
        "caption": "Map (in Italian): Japan divided in 1600, Eastern coalition (Tokugawa, red), Western coalition (Ishida, blue), clans that changed sides (green: Kobayakawa, Kikkawa); the \"more detailed\" version, File:Sekigahara map2.png",
        "credit": "Matiaz78, 2020, Wikimedia Commons. CC BY-SA 4.0: credit and share alike. Note its colours are the reverse of our cards (Tokugawa red here, blue on the card). For reference; to be redrawn in English for the game",
        "fit": "contain"
      }
    ]
  },
  {
    "title": "The road to Sekigahara",
    "lines": [
      {
        "text": "The West took Fushimi Castle near Kyoto after a long siege. Its commander, Torii Mototada, died defending it for Ieyasu.",
        "tag": "established"
      },
      {
        "text": "The East took Gifu Castle and advanced on Ōgaki, where the Western army was gathered.",
        "tag": "established"
      },
      {
        "text": "Ieyasu's son and heir, Hidetada, led a major Tokugawa force by the mountain road. Delayed at Ueda Castle, he did not reach Sekigahara in time to fight.",
        "tag": "established"
      }
    ],
    "media": [
      {
        "at": 0,
        "file": "01-sekigahara-kassen-byobu-1854.jpg",
        "caption": "Sekigahara Kassen Byōbu, a six-panel folding screen of the battle: an 1854 replica of the Hikone screen of the 1620s by Kanō Sadanobu (not a faithful copy: some omissions and changes)",
        "credit": "Collection of the Town of Sekigahara Archive of History and Cultural Anthropology; Wikimedia Commons, File:Sekigaharascreen.jpg. Public domain (artist dead more than 70 years). This copy is 1500 px wide; the Commons original is 3516 x 1796"
      }
    ]
  },
  {
    "title": "The valley",
    "lines": [
      {
        "text": "Sekigahara means \"the plain of the barrier\". It is a small basin, a few kilometres across, on the Nakasendō, the great road through the mountains between eastern Japan and Kyoto, where roads branch off north and south to Ise. An army that held it held the way to the capital.",
        "tag": "established"
      },
      {
        "text": "Around it stand low hills: Mount Sasao, Mount Matsuo, Mount Nangū. Whoever held them looked down on the road.",
        "tag": "established"
      },
      {
        "text": "The letters written just after the battle do not even call it Sekigahara: one names the field Aonogahara, another Yamanaka, the village at its western end.",
        "tag": "letter"
      }
    ],
    "media": [
      {
        "at": 0,
        "file": "02-sekigahara-byobu-gifu-north-view.jpg",
        "caption": "Sekigahara Kassen Byōbu-zu, a folding screen of the late Edo period (19th century): the only one of the many Sekigahara screens that shows the battlefield from the north",
        "credit": "Collection of the City of Gifu Museum of History; Wikimedia Commons, File:Sekigahara Kassen Byōbu-zu (Gifu History Museum).jpg. Public domain. This copy is 1500 px wide; the Commons original is 7700 x 3501"
      }
    ]
  },
  {
    "title": "The armies",
    "lines": [
      {
        "text": "No reliable, complete count of the men who fought survives. Traditional totals run into the tens of thousands on each side, but many Western troops never joined the fighting.",
        "tag": "estimate"
      },
      {
        "text": "They fought with long spears, bows, swords and matchlock guns, which had come to Japan from Portuguese traders sixty years before. Each lord's men carried his own banners and crests.",
        "tag": "established"
      },
      {
        "text": "No one recorded exactly where each army stood. The positions on our map are the traditional camp sites, as marked in the valley today. Historians question some of them.",
        "tag": "reconstruction"
      }
    ],
    "media": [
      {
        "at": 0,
        "file": "01-sekigahara-kassen-byobu-1854.jpg",
        "caption": "Sekigahara Kassen Byōbu, a six-panel folding screen of the battle: an 1854 replica of the Hikone screen of the 1620s by Kanō Sadanobu (not a faithful copy: some omissions and changes)",
        "credit": "Collection of the Town of Sekigahara Archive of History and Cultural Anthropology; Wikimedia Commons, File:Sekigaharascreen.jpg. Public domain (artist dead more than 70 years). This copy is 1500 px wide; the Commons original is 3516 x 1796"
      }
    ]
  }
],
  events: [
  {
    "title": "The night march",
    "clock": "Night, 20 October",
    "tag": "established",
    "text": "In the rain, the Western army leaves Ōgaki and marches west through the dark to Sekigahara. Why it left is debated: the old story says Ieyasu lured it out; some historians now think it went to help the Western lord Ōtani Yoshitsugu, whose camp at Yamanaka was in danger."
  },
  {
    "title": "Matsuo-yama",
    "clock": "20 October",
    "tag": "letter",
    "text": "The day before, Kobayakawa Hideaki, a young Western lord with one of the largest Western contingents, takes the hill fort on Mount Matsuo and turns out its garrison. He has already been talking secretly with Ieyasu's side."
  },
  {
    "title": "The East follows",
    "clock": "Night, 20 October",
    "tag": "established",
    "text": "The Eastern army follows. By dawn its lords stand in the valley, facing the Western camps on the hills, with Ieyasu on a low hill behind them."
  },
  {
    "title": "The battle begins",
    "clock": "About ten in the morning",
    "tag": "letter",
    "text": "A letter written two days after the battle has been read as placing the start of the fighting at about ten in the morning; later accounts put it earlier. Fukushima Masanori's men attack Ukita Hideie, the strongest Western lord in the field, while other Eastern lords attack Ishida on Mount Sasao."
  },
  {
    "title": "Kobayakawa attacks",
    "clock": "Morning",
    "tag": "letter",
    "text": "Some historians read the same letter as saying that Kobayakawa, and the lords below his hill, turned against the West near the start of the fighting. Others tell the sequence differently. Our reenactment follows the letter. Kobayakawa's army comes down from Mount Matsuo and falls on Ōtani Yoshitsugu."
  },
  {
    "title": "Ōtani",
    "clock": "During the fighting",
    "tag": "established",
    "text": "Smaller Western lords camped beside him, among them Wakisaka and Ogawa, change sides as well. Ōtani's army is destroyed, and Ōtani dies on the field. Later accounts add that he had foreseen the treachery and held off the first attacks."
  },
  {
    "title": "The army that did not move",
    "clock": "During the fighting",
    "tag": "established",
    "text": "On Mount Nangū, behind the Eastern army, the great Mōri army does not come down. Its vanguard commander, Kikkawa Hiroie, has a secret agreement with the East, and blocks the road. The lords behind him never fight."
  },
  {
    "title": "The West breaks",
    "clock": "During the fighting",
    "tag": "established",
    "text": "With its western flank gone, the Western line falls apart. Konishi, Ukita and Ishida flee into the mountains."
  },
  {
    "title": "The famous story",
    "clock": "Tradition",
    "tag": "later",
    "text": "Tradition tells it differently. A thick fog fills the valley at dawn. Ii Naomasa slips past Fukushima's men to fire the first shot. For hours the battle hangs in the balance, while Kobayakawa watches from his hill. At noon Ieyasu loses patience and has his guns fire at Mount Matsuo, and only then does Kobayakawa come down. On Mount Nangū, the Mōri messengers are told the army is eating its lunch. These details are best known from accounts written long after the battle; the letters of the time do not mention them."
  },
  {
    "title": "The Shimazu breakout",
    "clock": "After the collapse",
    "tag": "established",
    "text": "The Shimazu, from the far south of Japan, had stood aside from the fighting. Now, as the Western army collapses, Shimazu Yoshihiro does not flee west. He leads a desperate breakout through the Eastern lines toward Ise. His rearguard suffers heavy losses, and his nephew Shimazu Toyohisa is killed protecting the retreat."
  },
  {
    "title": "Ieyasu on the field",
    "clock": "After the fighting",
    "tag": "established",
    "text": "By the afternoon the battle is over. Ieyasu inspects the heads of fallen enemy commanders, as was the custom. Two burial mounds in the valley, the East and West Head Mounds, are remembered as the graves of the dead."
  },
  {
    "title": "Ishida",
    "clock": "Days later",
    "tag": "established",
    "text": "Ishida Mitsunari is caught hiding in the mountains. With Konishi Yukinaga and the monk Ankokuji Ekei, he is paraded through Kyoto and beheaded, on the first day of the tenth month, the 6th of November in our calendar."
  }
],
  outcome: [
  {
    "text": "Ieyasu won a complete victory. No reliable count of the dead survives; estimates run from several thousand to over thirty thousand.",
    "tag": "estimate"
  },
  {
    "text": "Ieyasu took the lands of about eighty-eight lords who had fought against him, and cut down others. The Mōri, whose army never fought, lost most of their domain.",
    "tag": "established"
  },
  {
    "text": "In 1603 the Emperor named Ieyasu shōgun. His family would rule Japan from Edo, the city that became Tokyo, for more than two hundred and sixty years.",
    "tag": "established"
  },
  {
    "text": "The Toyotomi house survived in Osaka until Ieyasu destroyed it in 1615.",
    "tag": "established"
  },
  {
    "text": "Centuries later, the domains of the Mōri and the Shimazu, in Chōshū and Satsuma, helped overthrow the Tokugawa shogunate in 1868. That should not be understood simply as revenge for Sekigahara.",
    "tag": "established"
  },
  {
    "text": "Historians still argue about the battle: how long it lasted, when Kobayakawa turned, and who really led the West. The letters written in its first days are shorter, and stranger, than the famous story.",
    "tag": "disputed"
  }
]
});

/* ======================================================================================================================
   Maps, armies, leaders and their moves.
     battle map  images/terrain-battle.jpg  35.386–35.334 N, 136.432–136.516 E (about 7.6 x 5.8 km, 2400 x 1800 world px)
   The Western camps are placed where they are PAINTED (images/layout/ART-PROMPTS.md: the traditional sites, within
   100–450 m). No one recorded where each army stood; the Eastern positions and every move are our reconstruction.
   The reenactment follows the letters written days after the battle: Kobayakawa turns early, and the fight is short.
   ====================================================================================================================== */
(() => {
  const S = window.SEKIGAHARA_SCENARIO;
  const ISHIDA = { x: 730, y: 480 }, SHIMAZU = { x: 910, y: 570 }, KONISHI = { x: 600, y: 610 }, UKITA = { x: 660, y: 755 }, OTANI = { x: 485, y: 870 },
        MATSUO = { x: 790, y: 1295 }, MOMOKUBARI = { x: 1830, y: 930 }, JINBANO = { x: 1160, y: 755 }, NANGU = { x: 2300, y: 1330 },
        WAKISAKA = { x: 560, y: 1040 }, ROAD_E = { x: 2390, y: 900 }, ROAD_W = { x: 20, y: 760 }, ISE = { x: 2390, y: 1650 };
  Object.assign(S, {
    titleCard: {
      title: 'BATTLE OF SEKIGAHARA', date: '21 October 1600',
      dateNote: 'Two great coalitions meet in a wet mountain valley on the road to Kyoto. When Kobayakawa Hideaki turns against the West, its army collapses, and Tokugawa Ieyasu wins Japan.',
      dateRef: 'Keichō 5, 9th month, 15th day. The letters of the 17th; Shirane, Kasaya and other modern studies',
      place: 'Sekigahara, Mino Province, central Japan',
      sides: 'The Eastern Army of Tokugawa Ieyasu  ·  The Western Army of Ishida Mitsunari and the Mōri'
    },
    world: { w: 2400, h: 1800 },
    terrain: 'terrain-battle.jpg',
    duration: 168, commandDuration: 300, commandFocus: { x: 900, y: 800 },
    battlefield: {
      scale: { px: 315, label: '1 km' },
      labels: [
        { x: ISHIDA.x, y: ISHIDA.y - 60, text: 'Mount Sasao', small: true }, { x: MATSUO.x, y: MATSUO.y + 90, text: 'Mount Matsuo', small: true },
        { x: OTANI.x - 20, y: OTANI.y + 70, text: 'Yamanaka', small: true }, { x: MOMOKUBARI.x, y: MOMOKUBARI.y + 70, text: 'Momokubari-yama', small: true },
        { x: 1350, y: 900, text: 'Nakasendō', small: true }, { x: NANGU.x - 60, y: NANGU.y + 80, text: 'toward Mount Nangū', small: true }
      ]
    },
    globe: { target: { lon: 136.46, lat: 35.36 }, region: { lon: 135.5, lat: 37.0 }, pull: 3.4, startLat: 28,
      periodNote: 'Japan and Korea in 1600',
      stop2: { center: { lon: 136.2, lat: 35.05 }, pull: 30, todayNote: 'Today’s cities', thenNote: 'Castles and towns of 1600' },
      labels: [ { lon: 139.69, lat: 35.69, text: 'Tokyo (Edo)', size: .5, dot: true }, { lon: 135.77, lat: 35.01, text: 'Kyoto', size: .5, dot: true },
                { lon: 136.46, lat: 35.36, text: 'SEKIGAHARA', size: .85, pin: true, early: true } ] },
    establishing: [],
    imageBase: 'images/', audioBase: 'audio/',
    voices: [
      { id: 'clear', name: 'Narrator 1 · clear', speaker: 25 }, { id: 'light', name: 'Narrator 2 · light', speaker: 60 },
      { id: 'bright', name: 'Narrator 3 · bright', speaker: 0 }, { id: 'deep', name: 'Narrator 4 · deep', speaker: 400 },
      { id: 'warm', name: 'Narrator 5 · warm', speaker: 7 }, { id: 'computer', name: 'Computer · calm', speaker: 500 }
    ],
    attackSheets: { 'east-yari': 'east-yari-attack', 'west-yari': 'west-yari-attack', 'east-teppo': 'east-teppo-fire', 'west-teppo': 'west-teppo-fire' },
    fallen: { bySide: { allied: 'fallen-east', french: 'fallen-west' }, horse: 'fallen-horse' },
    sheets: ['east-yari', 'east-teppo', 'east-cavalry', 'west-yari', 'west-teppo', 'west-cavalry'],
    sheetBy: { allied: { infantry: 'east-yari', archers: 'east-teppo', cavalry: 'east-cavalry' }, french: { infantry: 'west-yari', archers: 'west-teppo', cavalry: 'west-cavalry' } },
    sideArt: { allied: { cloth: '#3a3a3a', cloth2: '#222', pennant: '#f2f2f2' }, french: { cloth: '#3a2a2a', cloth2: '#221', pennant: '#1d2f6a' } },
    ai: { plans: {} }, commandLines: {},
    debrief: { allied: { victory: { title: 'Eastern victory', text: '' }, defeat: { title: 'Eastern defeat', text: '' }, stalemate: { title: 'Stalemate', text: '' } },
               french: { victory: { title: 'Western victory', text: '' }, defeat: { title: 'Western defeat', text: '' }, stalemate: { title: 'Stalemate', text: '' } } }
  });
  S.sides.allied.rally = { x: 2200, y: 900 }; S.sides.french.rally = { x: 200, y: 700 };

  const F = (o) => Object.assign({ power: 1, confidence: 'reconstruction' }, o);
  // the Western army arrives from Ōgaki in the night: it starts on the road at the east edge
  const W0 = (k) => ({ x: ROAD_E.x - 60 - k * 40, y: ROAD_E.y + (k % 3) * 40 - 40 });
  S.formations = [
    F({ id: 'ishida',  side: 'french', name: 'Ishida Mitsunari', division: 'Ishida', type: 'infantry', cols: 6, rows: 2, ...W0(0), note: 'On Mount Sasao, at the north of the Western line.' }),
    F({ id: 'ishidag', side: 'french', name: 'Ishida’s gunners', division: 'Ishida', type: 'archers', cols: 4, rows: 1, ...W0(1), note: 'Matchlock gunners.' }),
    F({ id: 'shimazu', side: 'french', name: 'Shimazu Yoshihiro', division: 'Shimazu', type: 'infantry', cols: 4, rows: 2, ...W0(2), note: 'From the far south; stood aside from the fighting until the breakout.' }),
    F({ id: 'konishi', side: 'french', name: 'Konishi Yukinaga', division: 'Konishi', type: 'infantry', cols: 5, rows: 2, ...W0(3), note: 'A Christian lord, veteran of the Korean war.' }),
    F({ id: 'ukita',   side: 'french', name: 'Ukita Hideie', division: 'Ukita', type: 'infantry', cols: 7, rows: 2, power: 1.2, ...W0(4), note: 'The strongest Western lord in the field.' }),
    F({ id: 'ukitag',  side: 'french', name: 'Ukita’s gunners', division: 'Ukita', type: 'archers', cols: 4, rows: 1, ...W0(5), note: 'Matchlock gunners.' }),
    F({ id: 'otani',   side: 'french', name: 'Ōtani Yoshitsugu', division: 'Ōtani', type: 'infantry', cols: 5, rows: 2, x: OTANI.x, y: OTANI.y, note: 'Camped at Yamanaka, at the west end of the valley, before the night march.' }),
    F({ id: 'wakisaka', side: 'french', name: 'Wakisaka, Ogawa and other lords', division: 'Wakisaka', type: 'infantry', cols: 5, rows: 1, x: WAKISAKA.x, y: WAKISAKA.y, note: 'Western lords below Mount Matsuo, who changed sides with Kobayakawa.' }),
    F({ id: 'kobaya',  side: 'french', name: 'Kobayakawa Hideaki', division: 'Kobayakawa', type: 'infantry', cols: 7, rows: 3, power: 1.3, x: 1150, y: 1600, note: 'One of the largest Western contingents. Took Mount Matsuo the day before; in secret contact with the East.' }),
    F({ id: 'mori',    side: 'french', name: 'The Mōri army (Kikkawa Hiroie)', division: 'Mōri', type: 'infantry', cols: 7, rows: 2, x: NANGU.x, y: NANGU.y, aiHold: true, note: 'On Mount Nangū, behind the Eastern army. Kikkawa had a secret agreement with the East and blocked the road; it never fought.' }),
    F({ id: 'fukushima', side: 'allied', name: 'Fukushima Masanori', division: 'Fukushima', type: 'infantry', cols: 7, rows: 2, power: 1.2, x: 2330, y: 960, note: 'A Toyotomi general on the Eastern side; attacked Ukita.' }),
    F({ id: 'fukug',   side: 'allied', name: 'Fukushima’s gunners', division: 'Fukushima', type: 'archers', cols: 4, rows: 1, x: 2350, y: 1010, note: 'Matchlock gunners.' }),
    F({ id: 'ii',      side: 'allied', name: 'Ii Naomasa and Matsudaira Tadayoshi', division: 'Ii', type: 'cavalry', cols: 4, rows: 2, x: 2330, y: 900, note: 'Tokugawa men. Tradition says Ii fired the first shot.' }),
    F({ id: 'kuroda',  side: 'allied', name: 'Kuroda Nagamasa and Hosokawa Tadaoki', division: 'Kuroda', type: 'infantry', cols: 6, rows: 2, x: 2330, y: 840, note: 'Attacked Ishida on Mount Sasao.' }),
    F({ id: 'todo',    side: 'allied', name: 'Tōdō Takatora and Kyōgoku Takatsugu', division: 'Tōdō', type: 'infantry', cols: 5, rows: 2, x: 2350, y: 1060, note: 'Faced Ōtani in the south of the valley.' }),
    F({ id: 'honda',   side: 'allied', name: 'Honda Tadakatsu', division: 'Honda', type: 'cavalry', cols: 3, rows: 1, x: 2360, y: 1110, note: 'A Tokugawa general.' }),
    F({ id: 'tokugawa', side: 'allied', name: 'Tokugawa Ieyasu’s main army', division: 'Ieyasu', type: 'infantry', cols: 6, rows: 3, power: 1.1, x: 2370, y: 940, note: 'Ieyasu’s own troops, held back behind the line.' })
  ];
  S.leaders = [
    { id: 'ieyasu', name: 'Tokugawa Ieyasu', side: 'allied', x: 2380, y: 980 },
    { id: 'mitsunari', name: 'Ishida Mitsunari', side: 'french', x: ROAD_E.x - 40, y: ROAD_E.y - 70 },
    { id: 'kobayakawa', name: 'Kobayakawa Hideaki', side: 'french', x: 1180, y: 1560 },
    { id: 'shimazu', name: 'Shimazu Yoshihiro', side: 'french', x: ROAD_E.x - 120, y: ROAD_E.y + 60 }
  ];

  const EV = S.events; EV.forEach((e, i) => { e.clipNo = i + 1; e.orders = e.orders || []; e.t = i * 14; });
  const set = (i, o) => Object.assign(EV[i], o);
  const via = [{ x: 1700, y: 880 }, { x: 1250, y: 800 }];
  set(0, { media: '01-sekigahara-kassen-byobu-1854.jpg', music: { file: 'mountain-emperor-macleod.mp3', vol: .22 }, zoom: 'fit', markers: [ { x: 2300, y: 880, label: 'from Ōgaki, in the rain', side: 'french' } ], orders: [
    { id: 'ishida', to: ISHIDA, via, speed: 140 }, { id: 'ishidag', to: { x: ISHIDA.x + 70, y: ISHIDA.y + 40 }, via, speed: 140 },
    { id: 'shimazu', to: SHIMAZU, via, speed: 140 }, { id: 'konishi', to: KONISHI, via, speed: 140 },
    { id: 'ukita', to: UKITA, via, speed: 140 }, { id: 'ukitag', to: { x: UKITA.x + 90, y: UKITA.y - 30 }, via, speed: 140 },
    { leader: 'mitsunari', to: { x: ISHIDA.x - 40, y: ISHIDA.y - 40 }, via, speed: 140 }, { leader: 'shimazu', to: { x: SHIMAZU.x - 30, y: SHIMAZU.y - 40 }, via, speed: 140 } ] });
  set(1, { focus: MATSUO, zoom: 1.6, markers: [ Object.assign({ label: 'the hill fort on Mount Matsuo' }, MATSUO) ], orders: [
    { id: 'kobaya', to: MATSUO, speed: 50 }, { leader: 'kobayakawa', to: { x: MATSUO.x + 40, y: MATSUO.y - 50 }, speed: 50 } ] });
  set(2, { zoom: 'fit', orders: [
    { id: 'fukushima', to: { x: 900, y: 820 }, via: [{ x: 1600, y: 900 }], speed: 130 }, { id: 'fukug', to: { x: 860, y: 760 }, via: [{ x: 1600, y: 900 }], speed: 130 },
    { id: 'ii', to: { x: 1010, y: 680 }, via: [{ x: 1600, y: 880 }], speed: 130 }, { id: 'kuroda', to: { x: 1040, y: 470 }, via: [{ x: 1600, y: 860 }], speed: 130 },
    { id: 'todo', to: { x: 830, y: 990 }, via: [{ x: 1600, y: 940 }], speed: 130 }, { id: 'honda', to: { x: 1100, y: 860 }, via: [{ x: 1600, y: 920 }], speed: 130 },
    { id: 'tokugawa', to: { x: MOMOKUBARI.x - 60, y: MOMOKUBARI.y + 30 }, speed: 80 }, { leader: 'ieyasu', to: MOMOKUBARI, speed: 80 } ] });
  set(3, { music: { file: 'taiko-harding.mp3', vol: .35 }, focus: { x: 800, y: 720 }, zoom: 1.5, markers: [ { x: 760, y: 790, label: 'Fukushima attacks Ukita' } ], orders: [
    { id: 'fukushima', to: { x: UKITA.x + 70, y: UKITA.y + 10 }, speed: 40, state: 'attack' }, { id: 'fukug', to: { x: UKITA.x + 140, y: UKITA.y - 50 }, speed: 30 },
    { id: 'kuroda', to: { x: ISHIDA.x + 90, y: ISHIDA.y + 10 }, speed: 40, state: 'attack' }, { id: 'ii', to: { x: SHIMAZU.x + 60, y: SHIMAZU.y + 80 }, speed: 40 } ] });
  set(4, { focus: { x: 620, y: 1060 }, zoom: 1.5, markers: [ Object.assign({ label: 'Kobayakawa turns', side: 'allied' }, MATSUO) ], orders: [
    { id: 'kobaya', side: 'allied' }, { id: 'kobaya', to: { x: OTANI.x + 60, y: OTANI.y + 60 }, speed: 45, state: 'attack' },
    { leader: 'kobayakawa', to: { x: OTANI.x + 120, y: OTANI.y + 130 }, speed: 45 }, { id: 'todo', to: { x: OTANI.x + 110, y: OTANI.y - 10 }, speed: 35, state: 'attack' } ] });
  set(5, { focus: OTANI, zoom: 1.7, orders: [
    { id: 'wakisaka', side: 'allied' }, { id: 'wakisaka', to: { x: OTANI.x + 20, y: OTANI.y + 50 }, speed: 40, state: 'attack' },
    { id: 'otani', strengthTo: 0, over: 10 } ] });
  set(6, { focus: { x: 2050, y: 1200 }, zoom: 1.3, markers: [ Object.assign({ label: 'the Mōri army on Mount Nangū', side: 'french' }, NANGU) ], orders: [ { id: 'mori', state: 'hold' } ] });
  set(7, { zoom: 'fit', orders: [
    { id: 'konishi', state: 'rout', to: { x: 30, y: 520 }, speed: 45 }, { id: 'ukita', state: 'rout', to: { x: 30, y: 640 }, speed: 45, delay: 1 },
    { id: 'ukitag', state: 'rout', to: { x: 30, y: 700 }, speed: 45, delay: 1 }, { id: 'ishida', state: 'rout', to: { x: 120, y: 300 }, speed: 45, delay: 2 },
    { id: 'ishidag', state: 'rout', to: { x: 160, y: 280 }, speed: 45, delay: 2 }, { leader: 'mitsunari', to: { x: 80, y: 260 }, speed: 45, delay: 2 },
    { id: 'ukita', strengthTo: 30, over: 8 }, { id: 'konishi', strengthTo: 35, over: 8 }, { id: 'ishida', strengthTo: 40, over: 8 } ] });
  set(8, { media: '02-sekigahara-byobu-gifu-north-view.jpg', zoom: 'fit', markers: [ Object.assign({ label: 'tradition: the noon volley at Mount Matsuo', side: 'allied' }, MATSUO) ] });
  set(9, { music: { file: 'taiko-harding.mp3', vol: .3 }, focus: { x: 1500, y: 1000 }, zoom: 1, markers: [ { x: ISE.x - 80, y: ISE.y - 40, label: 'toward Ise', side: 'french' } ], orders: [
    { id: 'shimazu', to: ISE, via: [{ x: 1100, y: 800 }, { x: 1600, y: 1150 }], speed: 50, state: 'attack' }, { id: 'shimazu', strengthTo: 25, over: 12 },
    { leader: 'shimazu', to: { x: ISE.x - 30, y: ISE.y - 40 }, via: [{ x: 1100, y: 800 }, { x: 1600, y: 1150 }], speed: 50 } ] });
  set(10, { zoom: 'fit', markers: [ Object.assign({ label: 'Jinbano: Ieyasu inspects the heads', side: 'allied' }, JINBANO) ], orders: [
    { leader: 'ieyasu', to: JINBANO, speed: 70 }, { id: 'tokugawa', to: { x: JINBANO.x + 80, y: JINBANO.y + 40 }, speed: 70 } ] });
  set(11, { media: '01-sekigahara-kassen-byobu-1854.jpg', zoom: 'fit', orders: [ { leader: 'mitsunari', visible: false } ] });

  S.units = [
    { side: 'allied', type: 'infantry', portrait: 'ashigaru-yari', name: 'Ashigaru spearmen', desc: 'Foot soldiers with long spears (yari), the mass of every army.', tag: 'established',
      lines: [ { text: 'Ashigaru, foot soldiers, made up most of both armies. They fought in close ranks with long spears, and each carried his lord’s banner (sashimono) on his back. In the game, white banners mark the East and dark blue the West.', tag: 'established' } ] },
    { side: 'allied', type: 'archers', portrait: 'ashigaru-teppo', name: 'Matchlock gunners', desc: 'Teppō: matchlock guns, copied in Japan from Portuguese guns sixty years before.', tag: 'established',
      lines: [ { text: 'By 1600 Japanese armies had thousands of matchlocks, made in Japan since the 1540s. Gunners fired in volleys from behind the spearmen.', tag: 'established' } ] },
    { side: 'allied', type: 'cavalry', portrait: 'samurai-cavalry', name: 'Mounted samurai', desc: 'Armoured samurai on small, sturdy horses.', tag: 'established',
      lines: [ { text: 'The lords and their retainers fought on horseback with spears and swords.', tag: 'established' } ] },
    { side: 'french', type: 'infantry', portrait: 'mitsunari', name: 'Ishida Mitsunari', desc: 'Commissioner of the Toyotomi government; the West’s organiser in the field.', tag: 'disputed',
      lines: [ { text: 'The official commander of the West was Mōri Terumoto, who stayed in Osaka Castle. Ishida organised the campaign.', tag: 'disputed' } ] },
    { side: 'allied', type: 'infantry', portrait: 'ieyasu', name: 'Tokugawa Ieyasu', desc: 'The strongest of Hideyoshi’s Elders; shōgun from 1603.', tag: 'established',
      lines: [ { text: 'Aged 57 at Sekigahara. His family ruled Japan until 1868.', tag: 'established' } ] }
  ];
  const C = (title, intro, items) => ({ title, intro, items: items.map(([ref, note]) => ({ ref, note })) });
  S.citations = {
    established: C('Established', 'Agreed by historians.', [['Modern histories of Sekigahara', 'The coalitions, the camps, the outcome.']]),
    letter: C('Letters of 1600', 'Letters written in the first days after the battle.', [['Letter of the 17th day, 9th month (Ishikawa and Hikosaka); Shirane Tadao, Kasaya Kazuhiko', 'The start of the fighting, Kobayakawa turning early, the field called Aonogahara and Yamanaka.']]),
    later: C('Later account', 'Written long after the battle.', [['Edo-period chronicles', 'The fog, Ii’s first shot, the noon volley, the lunch box.']]),
    disputed: C('Disputed', 'The sources disagree, or historians do.', [['Modern scholarship', 'When Kobayakawa turned; who led the West; why the West left Ōgaki.']]),
    estimate: C('Estimate', 'An estimate, not a recorded figure.', [['Modern histories', 'The size of the armies and the number of dead.']]),
    reconstruction: C('Reconstruction', 'Our own choice, to make the battle visible.', [['Battle Games', 'The Eastern positions and every move; the painted map.']])
  };
  S.sources = [
    { title: 'The letters of the 17th day of the 9th month, 1600, and their modern readings (Shirane Tadao; Kasaya Kazuhiko)', note: 'The basis of the reenactment.' },
    { title: 'Edo-period chronicles of the battle', note: 'The famous story of chapter 9.' },
    { title: 'Sekigahara Kassen Byōbu (1854 copy) and Sekigahara Kassen Byōbu-zu (Gifu)', note: 'Public-domain screen paintings of the battle, on Wikimedia Commons.' },
    { title: 'Music: “Mountain Emperor”, Kevin MacLeod (incompetech.com)', note: 'Licensed under Creative Commons: By Attribution 3.0 (creativecommons.org/licenses/by/3.0/). Wikimedia Commons, File:Mountain Emperor (ISRC USUAN1700012).mp3. Taiko drums and gamelan (an Indonesian instrument, not Japanese): modern atmosphere for the night march and the armies taking position. Loudness evened out, fades added.' },
    { title: 'Music: Taiko, by Scott Harding, performed live by the Singapore Wind Symphony’s Percussion Ensemble (first 25 seconds)', note: 'Wikimedia Commons, File:02 Taiko2 (short).oga, CC0 1.0 (public domain). Plays as the battle begins and under the Shimazu breakout. A modern piece for Japanese drums: atmosphere, not a recording of 1600.' }
  ];
  S.library = [];
})();

// The year shown with the dates in the stamp at the top left of the map
window.SEKIGAHARA_SCENARIO.clockYear = 1600;
// Dates for the stamp on the map (the chapters' own clocks name only the night of the 20th)
(function () { const E = window.SEKIGAHARA_SCENARIO.events, D = (i, c, tag) => { if (E[i]) { E[i].clock = c; if (tag) E[i].clockTag = tag; } };
  D(3, '21 October, About ten in the morning', 'disputed'); D(4, '21 October, Morning', 'disputed');
  [5, 6, 7, 9, 10].forEach(i => { if (E[i]) E[i].clock = '21 October, ' + E[i].clock; }); D(8, '21 October, Tradition', 'disputed');
  D(11, '6 November, Days later'); })();
