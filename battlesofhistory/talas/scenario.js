/*
  Historical Scenario File — Battle of Talas, July 751
  ----------------------------------------------------
  The narrated introduction (`intro`), the reenactment chapters (`events`) and the debrief (`outcome`).
  The engine is the Waterloo build (engine.js): a campaign part on the region map (images/map1.jpg) and the battle on
  the battlefield map (images/map3.jpg). Positions, formations and orders are set in the block at the end of this file.

  Every statement carries a confidence tag:
    established    — agreed by the sources on both sides and by historians
    tang           — from the Chinese sources only (the Tang histories, the Comprehensive Mirror, the Tongdian)
    arab           — from the Arabic sources only (al-Tabari, Ibn al-Athir and later writers)
    estimate       — a modern estimate, not a recorded figure
    reconstruction — our own choice, to make the battle visible (positions, formations, the day-by-day fighting)
*/
window.TALAS_SCENARIO = {
  id: 'talas',
  title: 'Battle of Talas',
  date: 'July 751',
  place: 'The Talas valley, Central Asia (today on the Kazakhstan–Kyrgyzstan border)',
  tagline: 'Tang China vs. the Abbasid Caliphate',

  confidence: {
    established:    { label: 'Established',     color: '#5fcf8a', desc: 'Agreed by the Chinese and the Arabic sources and by historians.' },
    tang:           { label: 'Chinese sources', color: '#ffd27a', desc: 'From the Tang histories, Sima Guang’s Comprehensive Mirror and Du You’s Tongdian. Written by the losing side; detailed about the retreat, silent about the enemy.' },
    arab:           { label: 'Arabic sources',  color: '#9fd8c8', desc: 'From al-Tabari, Ibn al-Athir and later Arab historians. Very short; their figures for the Chinese army and its losses are far larger than the Chinese ones.' },
    estimate:       { label: 'Estimate',        color: '#e9c77a', desc: 'A modern estimate, not a recorded figure.' },
    reconstruction: { label: 'Reconstruction',  color: '#c8a2ff', desc: 'Our own choice, to make the battle visible: positions, formations and the day-by-day fighting are not described in any source.' }
  },

  /* The engine's two sides: 'allied' is Tang China (red), 'french' the Abbasid Caliphate (black banners). */
  sides: {
    allied: { name: 'Tang China',          short: 'Tang',     army: 'The Anxi army of Gao Xianzhi, with allies from Ferghana and the Karluk Turks', color: '#c0392b', light: '#ffd6d0' },
    french: { name: 'Abbasid Caliphate',   short: 'Abbasid',  army: 'The army of Khurasan under Ziyad ibn Salih', color: '#2e3a46', light: '#d8dde4' }
  },

  welcome: 'Welcome to Battles of History. Today we are learning about the Battle of Talas, which happened in July 751, between the army of Tang China and the army of the Abbasid Caliphate.',

  /* ---------- Opening narration ---------- */
  intro: [
    { title: 'BATTLE OF TALAS',
      lines: [
        { text: 'In July 751, in a river valley in the middle of Asia, the army of Tang China met the army of the Abbasid Caliphate. It was the only major battle known between the armies of Tang China and the Arab Caliphate.', tag: 'established' },
        { text: 'Very little was written about it at the time. This introduction separates what the sources say from what historians have pieced together. Watch the colour of each tag.', tag: 'reconstruction' }
      ] },
    { title: 'Two empires',
      media: [
        { at: 0, file: '43-silk-road-751.jpg', pulse: '43-silk-road-751-glow.jpg', fit: 'contain', caption: 'The Silk Road around 751: not one road but a web of caravan routes from Chang’an to the Mediterranean, joined to the sea route through the Persian Gulf. Talas (the crossed swords) lay on the northern route, where the Tang and Abbasid worlds met. The glow marks the routes.', ref: 'Approximate; after Hansen, The Silk Road (2012), and the guide map drawn for this game (talas/SILK-ROAD.md)', credit: 'Map: Battle Games, AI-generated (ChatGPT) from our guide map' },
        { at: 39, file: '48-tang-tomb-caravan.jpg', caption: 'A caravan in clay: riders, horses and laden camels from the Tang tomb of Li Siben in Luoyang. Figures like these, of foreign grooms and camel drivers, were buried with the Tang elite; they show how much the Silk Road trade, carried by Sogdian merchants, meant to China.', ref: 'Tang dynasty tomb figures, Tomb of Li Siben, Luoyang Ancient Tombs Museum, Henan, China', credit: 'Photo: Gary Lee Todd (Flickr), CC0 public domain, via Wikimedia Commons (Tang Dynasty Tomb of Li Siben 04.jpg)' }
      ],
      lines: [
        { text: 'In 751 Tang China was at the height of its power. From its western headquarters at Kucha, the Protectorate of Anxi, its generals watched over the oasis kingdoms of the Silk Road as far as the mountains of Central Asia.', tag: 'established' },
        { text: 'Far to the west a new power had just risen. In 750 the Abbasid family overthrew the Umayyad caliphs, with an army raised in Khurasan, in eastern Iran, under the black banners of Abu Muslim. Its commanders were extending their authority across Khurasan and the contested cities of Transoxiana, including Samarkand and Bukhara.', tag: 'established' },
        { text: 'Between them lay the cities of the Sogdians, merchants of the Silk Road, and the pastures of the Turkic peoples, who took sides as it suited them.', tag: 'established' }
      ] },
    { title: 'The spark',
      lines: [
        { text: 'The Chinese histories say that in 750 the Tang general Gao Xianzhi made peace with the king of Chach, the city that is Tashkent today, then broke his word, seized the city and sent the king to the Chinese capital, Chang’an, where he was put to death.', tag: 'tang' },
        { text: 'The king’s son escaped and told neighbouring rulers what Gao had done. The Chinese histories say they then invited the Arabs to attack the Tang garrisons.', tag: 'tang' },
        { text: 'The Arab historian Ibn al-Athir tells it differently: the ruler of Ferghana asked the Chinese for help against the ruler of Chach, and Abu Muslim answered the Chinese intervention.', tag: 'arab' }
      ] },
    { title: 'The armies',
      media: [
        { at: 0, file: '46-tang-soldier-figure.jpg', caption: 'A Tang soldier, as a pottery figure from a tomb: an armoured coat with two round breastplates, shoulder guards, a helmet with neck flaps, and a long coat to the knees. His hands once held a weapon, now lost. Figures like this are our best guide to how the Anxi army looked.', ref: 'Tang dynasty tomb figure, photographed in Luoyang, China', credit: 'Photo: Gary Lee Todd (Flickr), CC0 public domain, via Wikimedia Commons (Soldier of Tang 01.jpg)' }
      ],
      lines: [
        { text: 'Gao Xianzhi led thirty thousand Tang and allied soldiers, according to the Comprehensive Mirror. Other Chinese accounts give twenty or sixty thousand, while Arab accounts give much larger figures.', tag: 'tang' },
        { text: 'Its core was the professional army of Anxi, with armoured infantry and crossbows, under hard veterans like the general Li Siye. With them marched allies from the kingdom of Ferghana, and the Karluks, a Turkic people.', tag: 'established' },
        { text: 'The Abbasid army was commanded by Ziyad ibn Salih, sent by Abu Muslim from Khurasan. No reliable figure for its size survives. Modern estimates vary widely, and none can be confirmed.', tag: 'estimate' }
      ] },
    { title: 'The sources',
      media: [
        { at: 0, file: '44-talas-runic-stone.jpg', caption: 'The first Talas inscription: a boulder from the Talas valley carved in Old Turkic runes, with a drawing of the letters below. The Turkic peoples of the valley wrote too, though nothing they wrote describes the battle. Usually dated to the 8th century; the dating is disputed.', ref: 'One of the “Talas inscriptions”, found along the Talas river; museum photograph and drawing', credit: 'Photo: irq.kaznpu.kz (Kazakh National Pedagogical University), via Wikimedia Commons (Talas tas yazma 1.jpg), “copyrighted free use”' }
      ],
      lines: [
        { text: 'The Chinese sources include the two Tang histories and the Comprehensive Mirror. Du You’s Tongdian also preserves passages from the travel account of his relative Du Huan, who was captured.', tag: 'established' },
        { text: 'The Arabic accounts are brief and sometimes tell a different story, especially about why the armies fought and how many men were lost.', tag: 'established' },
        { text: 'No source describes how the armies stood or what happened on each of the five days. In this reenactment, those parts are our reconstruction, and they are marked as such.', tag: 'reconstruction' }
      ] },
    { title: 'The ground',
      media: [
        { at: 0, file: '45-talas-river-taraz.jpg', caption: 'The Talas River at Taraz today, in winter. The river comes down from the mountains of Kyrgyzstan (on the horizon) and spreads across the plain; the city on the right stands near the site of old Talas. A yurt, the felt tent of the steppe, stands in the field on the left.', ref: 'Taraz, Kazakhstan, 6 January 2010', credit: 'Photo: upyernoz (Flickr), CC BY 2.0, via Wikimedia Commons (Talas River.jpg)' }
      ],
      lines: [
        { text: 'Ancient Taraz, the town of Talas, stood near the site of modern Taraz in Kazakhstan. The battle took place somewhere in the surrounding Talas valley.', tag: 'established' },
        { text: 'The exact battlefield has never been found. The Arab writers name the place Atlakh. Historians and archaeologists in Kazakhstan and Kyrgyzstan place it on the plain south of Taraz, and Kyrgyzstan raised a monument there in 2021.', tag: 'estimate' },
        { text: 'The maps in this reenactment are drawn from real satellite measurements of the valley. Where the armies stood on them is our reconstruction.', tag: 'reconstruction' }
      ] }
  ],

  /* ---------- The reenactment ---------- */
  events: [
    { t: 0, title: 'The march west', tag: 'reconstruction', clock: 'Spring 751',
      text: 'Gao marched west from Anxi toward Talas. His exact route is unknown; he may have crossed the Tian Shan and passed near Issyk-Kul. The Comprehensive Mirror says he marched more than seven hundred li into enemy territory. The exact distance in modern kilometres is uncertain.',
      explain: 'The Chinese account says Gao heard that the western rulers and the Arabs might attack the Anxi garrisons, and he marched west to confront them first. It was the way he had always fought: in 747 he had crossed the Pamirs to take a Tibetan-held kingdom by surprise.' },
    { t: 14, title: 'The Abbasid army', tag: 'reconstruction', clock: 'Early summer 751',
      text: 'Ziyad ibn Salih leads the Abbasid army toward Talas. His exact route is unknown, but he brings forces from the western lands to confront Gao.',
      explain: 'The Abbasids had only just won their civil war, and Abu Muslim, who ruled the east for them, was still putting down rebels. Sending an army to the Talas shows how seriously he took the Tang advance. The Arab sources say little more than that Ziyad met the Chinese and defeated them.' },
    { t: 28, title: 'The valley of the Talas', tag: 'reconstruction', clock: 'July 751',
      text: 'The armies meet in the Talas valley. Gao has advanced from the Tang frontier, while Ziyad has come from the Abbasid-controlled lands to the west.',
      explain: 'Talas was a Silk Road town on the edge of the steppe. The Chinese pilgrim Xuanzang had passed through it in 630, and it had once acknowledged the Tang. To fight there was to fight on the old border between the Chinese world and the lands of Islam.' },
    { t: 42, title: 'The armies form up', tag: 'reconstruction', clock: 'Day 1',
      text: 'The armies form their lines on the plain. We show Tang crossbowmen and heavy infantry at the centre, with allied horsemen on the wings.',
      explain: 'No source records the battle formations. These positions are based on known Tang weapons and military practice, but they remain a reconstruction.' },
    { t: 56, title: 'The first day', tag: 'reconstruction', clock: 'Day 1',
      text: 'Fighting begins between the two armies. We imagine cavalry attacks and volleys of crossbow bolts, but the sources do not tell us how the first day unfolded.',
      explain: 'Tang armies used crossbows and disciplined infantry. The Abbasids also had experienced soldiers, but neither side’s exact tactics at Talas are recorded.' },
    { t: 70, title: 'Five days', tag: 'tang', clock: 'Days 2 to 4',
      text: 'The Comprehensive Mirror says the two armies faced each other for five days. We do not know how much fighting took place on each day.',
      explain: 'Five days of confrontation suggests a difficult contest, but the sources do not tell us what either commander was planning or waiting for.' },
    { t: 86, title: 'The Karluks turn', tag: 'tang', clock: 'Day 5',
      text: 'After five days, the Karluks turn against the Tang. The Chinese account says they and the Abbasids attack Gao’s army from two sides, causing its defeat.',
      explain: 'The Chinese account says the Karluks rebelled against Gao. Their exact allegiance before the battle, and whether their attack was planned, remain disputed. The Karluks had their own political interests in the region; why they chose to attack Gao’s army is not recorded.' },
    { t: 100, title: 'The rout', tag: 'tang', clock: 'Day 5',
      text: 'Gao’s army suffers a crushing defeat. The Comprehensive Mirror says only a few thousand survive. The Arabic tradition also reports large numbers of prisoners.',
      explain: 'The Chinese accounts describe a devastating defeat, with only a few thousand survivors. Ibn al-Athir claims fifty thousand killed and twenty thousand captured, figures far above the Chinese army totals. Gao’s expeditionary army was shattered, although some survivors returned to Anxi and Tang military power there continued.' },
    { t: 114, title: 'White Stone Ridge', tag: 'tang', clock: 'Night',
      text: 'Li Siye urges Gao Xianzhi to withdraw toward White Stone Ridge. Gao first wants to gather his survivors and fight again, but Li Siye persuades him to retreat.',
      explain: 'The Old and New Histories of the Tang both name White Stone Ridge, but its exact location is unknown. We cannot place it confidently on a modern map.' },
    { t: 128, title: 'The blocked road', tag: 'tang', clock: 'Night',
      text: 'The narrow road is blocked by retreating Ferghana troops, their horses and camels. Li Siye forces a passage with a great club, killing men and animals so Gao can escape.',
      explain: 'Li Siye was a powerful infantry commander, famous for using the heavy modao blade. The Tang histories admired his fighting ability, even while recording this brutal escape.' },
    { t: 142, title: 'Duan Xiushi', tag: 'tang', clock: 'Night',
      text: 'A junior officer, Duan Xiushi, rebukes Li Siye for abandoning his men. Li Siye apologizes, then stays behind to resist pursuit and gather scattered survivors.',
      explain: 'Li Siye accepted Duan’s rebuke. After returning to Anxi, he recommended Duan for a military appointment. Both men later served during the An Lushan rebellion.' },
    { t: 156, title: 'The prisoners', tag: 'arab', clock: 'After the battle',
      text: 'Many Tang soldiers were reportedly captured, and some were taken west into Abbasid territory. One of the captives was Du Huan, who had accompanied Gao’s expedition. After travelling through the Abbasid world, he returned to China by merchant ship in 762.',
      explain: 'Nearly three centuries later, al-Tha’alibi wrote that Chinese prisoners from Talas brought paper-making to Samarkand. But paper was already known in Central Asia, so the story cannot be accepted as the origin of the craft there.' },
    { t: 170, title: 'Gao Xianzhi’s return', tag: 'established', clock: 'Late 751',
      text: 'Gao Xianzhi returns from Talas with survivors. His career continues, and he later receives another major command when rebellion threatens the Tang dynasty.',
      explain: 'Talas was a severe military defeat, but it did not immediately end Tang control of the western garrisons. A much greater crisis followed four years later.' },
    { t: 184, title: 'What came after', tag: 'established', clock: '755 to 756',
      text: 'In 755 An Lushan rebelled against the Tang. Troops from the western frontier were drawn into the struggle. In early 756 Gao Xianzhi was executed on his own emperor’s orders after accusations against him.',
      explain: 'Talas mattered politically, but it did not decide Central Asia’s religion. Islam spread over centuries through trade, political change, conversion and, at times, conquest.' }
  ],

  outcome: [
    { text: 'The Abbasid army defeated Gao Xianzhi’s Tang forces after a five-day confrontation. The Chinese account says the Karluks turned against Gao and helped defeat him.', tag: 'tang' },
    { text: 'Chinese accounts give different army sizes, from twenty to sixty thousand. The Comprehensive Mirror uses thirty thousand and says only a few thousand survived.', tag: 'tang' },
    { text: 'Du Huan was captured and spent more than a decade in the Abbasid world. He returned to China by sea in 762 and wrote about his experiences.', tag: 'established' },
    { text: 'The battle did not end Chinese power in Central Asia. The An Lushan rebellion of 755 did.', tag: 'established' }
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
   Maps, armies, leaders and their moves. All positions come from latitude and longitude on the two painted maps:
     region map  images/map1.jpg  35.0–47.9 N, 61.0–84.0 E (about 1,900 x 1,400 km)   rR(lat, lon)
     battle map  images/map3.jpg  42.60–42.93 N, 71.00–71.60 E (about 49 x 37 km)     rB(lat, lon)
   Where the armies stood, and how they moved on each day, is our reconstruction (no source describes it).
   The first two chapters play on the region map (the campaign part); the rest on the battle map.
   ====================================================================================================================== */
(() => {
  const S = window.TALAS_SCENARIO;
  const rR = (lat, lon) => ({ x: Math.round((lon - 61) / 23 * 2400), y: Math.round((47.9 - lat) / 12.9 * 1800) });
  const rB = (lat, lon) => ({ x: Math.round((lon - 71) / .6 * 2400), y: Math.round((42.93 - lat) / .33 * 1800) });
  const P = p => [p.x, p.y];
  // places
  const KUCHA = rR(41.72, 82.96), AKSU = rR(41.17, 80.26), BEDEL = rR(41.40, 78.40), ISSYK = rR(42.15, 77.30), SUYAB = rR(42.80, 75.20),
        TALAS_R = rR(42.90, 71.37), CHACH = rR(41.30, 69.24), FERGHANA = rR(41.00, 71.40), SAMARKAND = rR(39.65, 66.97), BUKHARA = rR(39.77, 64.42),
        MERV = rR(37.60, 61.83), KARLUK = rR(44.60, 78.60);
  const TALAS_B = rB(42.90, 71.37), ATLAKH = rB(42.7153, 71.2644), JOON = rB(42.6819, 71.3097);

  Object.assign(S, {
    titleCard: {
      title: 'BATTLE OF TALAS', date: 'July 751',
      dateNote: 'Tang China against the Abbasid Caliphate, in the Talas valley: five days of fighting, then the Karluks turned.',
      dateRef: 'Comprehensive Mirror (Zizhi Tongjian) 216; Old Book of Tang 109; Ibn al-Athir',
      place: 'The Talas valley, Central Asia (today on the Kazakhstan–Kyrgyzstan border)',
      sides: 'The Anxi army of Gao Xianzhi, with Ferghana and the Karluks  ·  The army of Khurasan under Ziyad ibn Salih'
    },
    world: { w: 2400, h: 1800 },
    terrain: 'map3.jpg',
    duration: 168, commandDuration: 300, commandFocus: { x: 1660, y: 680 },
    battlefield: {
      scale: { px: 490, label: '10 km' },
      labels: [
        Object.assign({}, TALAS_B, { y: TALAS_B.y + 60, text: 'Talas (Taraz)', small: true }),
        Object.assign({}, ATLAKH, { y: ATLAKH.y + 48, text: 'Atlakh', small: true }),
        { x: 2230, y: 60, text: 'road to Kulan ↗', small: true }, { x: 140, y: 1640, text: '↙ road to Chach', small: true },
        { x: 2150, y: 1220, text: 'low ridge', small: true }
      ]
    },
    globe: { target: { lon: 71.3, lat: 42.8 }, region: { lon: 70, lat: 43.5 }, pull: 3.6, startLat: 30,
      periodNote: 'Central Asia in 751 · between Tang China and the Abbasid Caliphate',
      labels: [
        { lon: 82.96, lat: 41.72, text: 'Kucha (Anxi)', size: .5, dot: true }, { lon: 108.9, lat: 34.3, text: 'Chang’an', size: .55, dot: true },
        { lon: 44.4, lat: 33.3, text: 'Baghdad (from 762)', size: .45, dot: true }, { lon: 61.83, lat: 37.6, text: 'Merv', size: .5, dot: true },
        { lon: 66.97, lat: 39.65, text: 'Samarkand', size: .5, dot: true }, { lon: 69.24, lat: 41.3, text: 'Chach', size: .45, dot: true },
        { lon: 71.37, lat: 42.9, text: 'TALAS', size: .85, pin: true, early: true }
      ] },
    establishing: [
      { file: 'establish-0-world-clean.jpg', secs: 5, pulse: { x: .62, y: .40 }, credit: 'The world in 751: Tang China in the east, the Abbasid Caliphate in the west. Artist rendering: Battle Games, AI-generated' },
      { file: 'establish-1-region-atlas.jpg', secs: 5, credit: 'Central Asia between the two empires. Artist rendering: Battle Games, AI-generated' },
      { file: 'establish-0b-talas-area-clean.jpg', secs: 6, credit: 'The Talas valley. Artist rendering: Battle Games, AI-generated' }
    ],
    // painted figures, when their sheets arrive (images/units/<name>.png): until then drawn figures stand in
    sheets: ['tang-infantry', 'tang-crossbow', 'tang-cavalry', 'abbasid-infantry', 'abbasid-cavalry', 'karluk-cavalry'],
    sheetBy: { allied: { infantry: 'tang-infantry', archers: 'tang-crossbow', cavalry: 'tang-cavalry' }, french: { infantry: 'abbasid-infantry', archers: 'abbasid-infantry', cavalry: 'abbasid-cavalry' } },
    sideArt: { allied: { cloth: '#8a3a30', cloth2: '#6a2a22', pennant: '#c0392b' }, french: { cloth: '#2a2a2c', cloth2: '#1a1a1c', head: '#e8e2d0', pennant: '#2e3a46', trim: '#e9e4d4' } },
    ai: { plans: {} }, commandLines: {},
    debrief: { allied: { victory: { title: 'Tang victory', text: '' }, defeat: { title: 'Tang defeat', text: '' }, stalemate: { title: 'Stalemate', text: '' } },
               french: { victory: { title: 'Abbasid victory', text: '' }, defeat: { title: 'Abbasid defeat', text: '' }, stalemate: { title: 'Stalemate', text: '' } } }
  });
  S.sides.allied.rally = { x: 2300, y: 200 }; S.sides.french.rally = { x: 200, y: 1600 };

  /* ---------- the battle map's armies (all start off the map; chapter 3 brings them in) ---------- */
  const F = (o) => Object.assign({ power: 1, confidence: 'reconstruction', hidden: true, offmap: true }, o);
  S.formations = [
    F({ id: 'xbow',    side: 'allied', name: 'Tang crossbowmen (Anxi army)', division: 'Crossbows', type: 'archers', cols: 7, rows: 2, x: 2350, y: 120, count: 'Part of about 30,000 (Comprehensive Mirror)', note: 'The Tang crossbow, the nu, shot further and harder than a bow. Massed in ranks, crossbowmen shot in turns so the volleys never stopped.' }),
    F({ id: 'inf',     side: 'allied', name: 'Tang heavy infantry (Anxi army)', division: 'Anxi infantry', type: 'infantry', cols: 7, rows: 3, power: 1.2, x: 2380, y: 80, count: 'Part of about 30,000 (Comprehensive Mirror)', note: 'Armoured professional soldiers of the Protectorate of Anxi, with long blades like Li Siye’s modao.' }),
    F({ id: 'tcav',    side: 'allied', name: 'Tang cavalry', division: 'Tang cavalry', type: 'cavalry', cols: 4, rows: 2, x: 2390, y: 40, note: 'Armoured horsemen of the Anxi army, held behind the line.' }),
    F({ id: 'ferghana',side: 'allied', name: 'Allies from Ferghana', division: 'Ferghana', type: 'infantry', cols: 5, rows: 2, x: 2300, y: 160, note: 'Troops of the kingdom of Ferghana, allied to the Tang. The Tang histories say it was their men, horses and camels that blocked the road in the retreat.' }),
    F({ id: 'karluk',  side: 'allied', name: 'The Karluks', division: 'Karluks', type: 'cavalry', sheet: 'karluk-cavalry', cols: 5, rows: 2, x: 2390, y: 200, note: 'Turkic horsemen marching with the Tang. The Chinese histories say they turned against Gao Xianzhi on the fifth day.' }),
    F({ id: 'ainf',    side: 'french', name: 'Abbasid infantry of Khurasan', division: 'Khurasan', type: 'infantry', cols: 8, rows: 3, power: 1.2, x: 60, y: 1700, note: 'Veterans of the Abbasid revolution, raised in Khurasan under the black banners.' }),
    F({ id: 'acavn',   side: 'french', name: 'Abbasid cavalry (north wing)', division: 'Abbasid horse', type: 'cavalry', cols: 5, rows: 2, x: 30, y: 1650, note: 'Horsemen of the Abbasid army. Their numbers are not recorded.' }),
    F({ id: 'acavs',   side: 'french', name: 'Abbasid cavalry (south wing)', division: 'Abbasid horse', type: 'cavalry', cols: 5, rows: 2, x: 30, y: 1760, note: 'Horsemen of the Abbasid army. Their numbers are not recorded.' }),
    F({ id: 'captive', side: 'allied', name: 'Tang prisoners', division: 'Captives', type: 'infantry', cols: 4, rows: 2, x: 1800, y: 700, count: 'Many, the Arabic tradition says', note: 'Among them Du Huan, who came home by sea in 762 and wrote about the lands he saw.' }),
    F({ id: 'rear',    side: 'allied', name: 'Li Siye’s rearguard', division: 'Rearguard', type: 'infantry', cols: 4, rows: 2, x: 2200, y: 260, note: 'The men Li Siye gathered after Duan Xiushi’s rebuke, to hold off the pursuit.' })
  ];
  S.leaders = [
    { id: 'gao',    name: 'Gao Xianzhi',      side: 'allied', x: 2390, y: 60,  hidden: true },
    { id: 'lisiye', name: 'Li Siye',          side: 'allied', x: 2390, y: 100, hidden: true },
    { id: 'duan',   name: 'Duan Xiushi',      side: 'allied', x: 2390, y: 140, hidden: true },
    { id: 'ziyad',  name: 'Ziyad ibn Salih',  side: 'french', x: 40,   y: 1700, hidden: true }
  ];

  /* ---------- the campaign part, on the region map ---------- */
  S.campaign = {
    title: 'The march to Talas', subtitle: 'Spring and summer 751', terrain: 'map1.jpg', scale: { px: 125, label: '100 km' }, duration: 28,
    toBattleAt: TALAS_R,
    towns: [
      Object.assign({ name: 'Kucha (Anxi)', big: true }, KUCHA), Object.assign({ name: 'Aksu' }, AKSU), Object.assign({ name: 'Suyab' }, SUYAB),
      Object.assign({ name: 'Talas', big: true }, TALAS_R), Object.assign({ name: 'Chach (Tashkent)' }, CHACH), Object.assign({ name: 'Ferghana' }, FERGHANA),
      Object.assign({ name: 'Samarkand', big: true }, SAMARKAND), Object.assign({ name: 'Bukhara' }, BUKHARA), Object.assign({ name: 'Merv', big: true }, MERV)
    ],
    formations: [
      { id: 'c-tang',  side: 'allied', name: 'The Anxi army of Gao Xianzhi', division: 'Gao Xianzhi', type: 'infantry', cols: 4, rows: 2, x: KUCHA.x, y: KUCHA.y, confidence: 'reconstruction', note: 'About 30,000 Tang and allied soldiers, the Comprehensive Mirror says. The route is not recorded.' },
      { id: 'c-ferg',  side: 'allied', name: 'Ferghana', division: 'Ferghana', type: 'infantry', cols: 3, rows: 1, x: FERGHANA.x, y: FERGHANA.y, hidden: true, offmap: true, confidence: 'reconstruction', note: 'The kingdom of Ferghana, allied to the Tang.' },
      { id: 'c-karluk',side: 'allied', name: 'The Karluks', division: 'Karluks', type: 'cavalry', cols: 3, rows: 1, x: KARLUK.x, y: KARLUK.y, hidden: true, offmap: true, confidence: 'reconstruction', note: 'Turkic horsemen from the steppes north of the Tian Shan.' },
      { id: 'c-arab',  side: 'french', name: 'The army of Khurasan', division: 'Ziyad ibn Salih', type: 'infantry', cols: 4, rows: 2, x: MERV.x, y: MERV.y, hidden: true, offmap: true, confidence: 'reconstruction', note: 'Sent by Abu Muslim from Khurasan. Its size is not recorded, and its route is not known.' }
    ],
    leaders: [
      Object.assign({ id: 'gao', name: 'Gao Xianzhi', side: 'allied' }, { x: KUCHA.x, y: KUCHA.y - 30 }),
      Object.assign({ id: 'ziyad', name: 'Ziyad ibn Salih', side: 'french', hidden: true }, { x: MERV.x, y: MERV.y - 30 }),
      Object.assign({ id: 'abumuslim', name: 'Abu Muslim · in Merv', side: 'french', noSheet: true, hidden: true }, { x: MERV.x + 60, y: MERV.y + 40 })
    ]
  };

  /* ---------- what happens in each chapter ---------- */
  const EV = S.events; EV.forEach((e, i) => { e.clipNo = i + 1; e.orders = e.orders || []; });
  const set = (i, o) => Object.assign(EV[i], o);
  // campaign (region map)
  set(0, { t: 0, music: { file: 'guqin-zuiyu-changwan.mp3', vol: .32 }, focus: { x: 1700, y: 800 }, zoom: .5, orders: [
    { id: 'c-tang', to: { x: TALAS_R.x + 70, y: TALAS_R.y + 10 }, via: [AKSU, BEDEL, ISSYK, SUYAB], speed: 120 },
    { leader: 'gao', to: { x: TALAS_R.x + 70, y: TALAS_R.y - 20 }, speed: 120 },
    { id: 'c-ferg', visible: true, to: { x: TALAS_R.x + 20, y: TALAS_R.y + 60 }, speed: 30, delay: 4 },
    { id: 'c-karluk', visible: true, to: { x: TALAS_R.x + 110, y: TALAS_R.y - 40 }, via: [{ x: 1500, y: 560 }], speed: 70, delay: 3 } ] });
  set(1, { t: 14, music: { file: 'oud-andy-jordan.mp3', vol: .32 }, focus: { x: 600, y: 1100 }, zoom: .5, orders: [
    { id: 'c-arab', visible: true, to: { x: TALAS_R.x - 70, y: TALAS_R.y + 30 }, via: [BUKHARA, SAMARKAND, CHACH], speed: 120 },
    { leader: 'ziyad', visible: true, to: { x: TALAS_R.x - 70, y: TALAS_R.y }, speed: 120 },
    { leader: 'abumuslim', visible: true } ] });
  // the battle (battle map); times restart at 0
  const L = { xbow: { x: 1790, y: 680 }, inf: { x: 1880, y: 680 }, tcav: { x: 1990, y: 690 }, ferghana: { x: 1840, y: 470 }, karluk: { x: 1840, y: 910 },
              ainf: { x: 1450, y: 690 }, acavn: { x: 1480, y: 450 }, acavs: { x: 1480, y: 930 } };
  set(2, { t: 0, zoom: 'fit', markers: [ Object.assign({ label: 'Talas' }, TALAS_B), Object.assign({ label: 'Atlakh' }, ATLAKH) ], orders: [
    // the Tang army comes down the road from Kulan; the Abbasids up the road from Chach, past Atlakh
    ...['inf', 'xbow', 'tcav', 'ferghana', 'karluk'].map((id, k) => ({ id, visible: true, at: { x: 2380 - k * 12, y: 30 + k * 40 }, to: { x: L[id].x + 160, y: L[id].y - 140 }, speed: 60, delay: k })),
    ...['ainf', 'acavn', 'acavs'].map((id, k) => ({ id, visible: true, at: { x: 40 + k * 40, y: 1720 - k * 30 }, to: { x: L[id].x - 200, y: L[id].y + 160 }, via: [{ x: ATLAKH.x + 80, y: ATLAKH.y + 60 }], speed: 60, delay: k })),
    { leader: 'gao', visible: true, at: { x: 2390, y: 50 }, to: { x: 2060, y: 600 }, speed: 60 }, { leader: 'lisiye', visible: true, at: { x: 2390, y: 90 }, to: { x: 1960, y: 640 }, speed: 60 },
    { leader: 'ziyad', visible: true, at: { x: 60, y: 1700 }, to: { x: 1250, y: 720 }, via: [{ x: ATLAKH.x + 80, y: ATLAKH.y + 60 }], speed: 60 } ] });
  set(3, { t: 14, music: null, zoom: 'fit', orders: [
    ...Object.keys(L).map(id => ({ id, to: L[id], speed: 40, then: 'hold' })),
    // a last step toward the enemy, so each line faces the other
    ...['xbow', 'inf', 'tcav', 'ferghana', 'karluk'].map(id => ({ id, to: { x: L[id].x - 4, y: L[id].y }, speed: 10, delay: 9, then: 'hold' })),
    ...['ainf', 'acavn', 'acavs'].map(id => ({ id, to: { x: L[id].x + 4, y: L[id].y }, speed: 10, delay: 9, then: 'hold' })) ] });
  set(4, { t: 28, focus: { x: 1640, y: 680 }, zoom: .9, orders: [
    { id: 'acavn', to: { x: 1760, y: 480 }, speed: 40, state: 'attack' }, { id: 'acavn', to: L.acavn, speed: 34, delay: 7 },
    { id: 'acavs', to: { x: 1760, y: 900 }, speed: 40, state: 'attack', delay: 2 }, { id: 'acavs', to: L.acavs, speed: 34, delay: 9 },
    { id: 'acavn', strengthTo: 85, over: 6 }, { id: 'acavs', strengthTo: 85, over: 6, delay: 2 }, { id: 'ferghana', strengthTo: 90, over: 6 }, { id: 'karluk', strengthTo: 92, over: 6 },
    { id: 'ainf', strengthTo: 90, over: 8 }, { id: 'xbow', strengthTo: 95, over: 8 } ] });
  set(5, { t: 42, zoom: 'fit', orders: [
    { id: 'ainf', to: { x: 1520, y: 690 }, speed: 12 }, { id: 'ainf', to: L.ainf, speed: 12, delay: 6 },
    { id: 'inf', strengthTo: 85, over: 12 }, { id: 'xbow', strengthTo: 80, over: 12 }, { id: 'ainf', strengthTo: 75, over: 12 }, { id: 'ferghana', strengthTo: 80, over: 12 } ] });
  set(6, { t: 56, focus: { x: 1840, y: 800 }, zoom: .9, orders: [
    { id: 'karluk', side: 'french' },   // the Karluks turn
    { id: 'karluk', to: { x: 1990, y: 760 }, via: [{ x: 2020, y: 940 }], speed: 40, state: 'attack' },
    { id: 'ainf', to: { x: 1720, y: 690 }, speed: 22, state: 'attack', delay: 2 },
    { id: 'acavn', to: { x: 1800, y: 500 }, speed: 40, state: 'attack', delay: 2 }, { id: 'acavs', to: { x: 1780, y: 880 }, speed: 40, state: 'attack', delay: 2 },
    { id: 'tcav', strengthTo: 45, over: 8, delay: 3 }, { id: 'xbow', strengthTo: 50, over: 8, delay: 4 }, { id: 'inf', strengthTo: 60, over: 8, delay: 4 }, { id: 'ferghana', strengthTo: 55, over: 8, delay: 4 } ] });
  set(7, { t: 70, focus: { x: 1950, y: 560 }, zoom: .8, orders: [
    ...['xbow', 'inf', 'tcav', 'ferghana'].map((id, k) => ({ id, state: 'rout', to: { x: 2250 + k * 20, y: 160 + k * 30 }, speed: 30, delay: k * .6 })),
    ...['xbow', 'inf', 'tcav', 'ferghana'].map(id => ({ id, strengthTo: 18, over: 10 })),
    { id: 'ainf', to: { x: 1900, y: 560 }, speed: 18, state: 'attack', delay: 3 }, { id: 'karluk', to: { x: 2100, y: 520 }, speed: 30, state: 'attack', delay: 2 },
    { leader: 'gao', to: { x: 2200, y: 330 }, speed: 40 }, { leader: 'lisiye', to: { x: 2170, y: 360 }, speed: 40 } ] });
  const RIDGE = { x: 2260, y: 170 };
  set(8, { t: 84, music: { file: 'guqin-zuiyu-changwan.mp3', vol: .2 }, focus: RIDGE, zoom: 1.2, markers: [ Object.assign({ label: 'White Stone Ridge (location unknown)' }, RIDGE) ], orders: [
    { leader: 'gao', to: { x: RIDGE.x - 30, y: RIDGE.y + 50 }, speed: 30 }, { leader: 'lisiye', to: { x: RIDGE.x - 70, y: RIDGE.y + 70 }, speed: 30 } ] });
  set(9, { t: 98, focus: RIDGE, zoom: 1.4, orders: [
    { id: 'ferghana', to: { x: RIDGE.x + 10, y: RIDGE.y - 10 }, speed: 16, state: 'rout' },
    { leader: 'lisiye', to: { x: RIDGE.x + 40, y: RIDGE.y - 50 }, speed: 18, delay: 2 }, { leader: 'gao', to: { x: RIDGE.x + 60, y: RIDGE.y - 80 }, speed: 18, delay: 4 },
    { id: 'ferghana', strengthTo: 8, over: 8, delay: 2 } ] });
  set(10, { t: 112, focus: { x: 2200, y: 240 }, zoom: 1.3, orders: [
    { leader: 'duan', visible: true, at: { x: 2230, y: 230 }, to: { x: 2220, y: 240 }, speed: 10 },
    { leader: 'lisiye', to: { x: 2190, y: 250 }, speed: 18 },
    { id: 'rear', visible: true, at: { x: 2260, y: 220 }, to: { x: 2160, y: 290 }, speed: 12, then: 'hold' } ] });
  set(11, { t: 126, music: null, focus: { x: 1500, y: 900 }, zoom: .8, orders: [
    { id: 'captive', visible: true, at: { x: 1860, y: 650 }, to: { x: 40, y: 1740 }, via: [{ x: ATLAKH.x + 80, y: ATLAKH.y + 60 }], speed: 30 },
    { id: 'acavs', to: { x: 60, y: 1690 }, via: [{ x: ATLAKH.x + 120, y: ATLAKH.y + 40 }], speed: 30, delay: 1 } ] });
  set(12, { t: 140, zoom: 'fit', orders: [
    { leader: 'gao', to: { x: 2390, y: 30 }, speed: 30 }, { leader: 'lisiye', to: { x: 2385, y: 50 }, speed: 30 }, { leader: 'duan', to: { x: 2380, y: 70 }, speed: 30 },
    { id: 'rear', state: 'move', to: { x: 2390, y: 40 }, speed: 30, then: 'withdrawn' } ] });
  set(13, { t: 154, zoom: 'fit', orders: [] });
  // split: the first two chapters are the campaign part (lang files split theirs the same way)
  S.campaign.events = EV.slice(0, 2); S.events = EV.slice(2);

  /* ---------- the armies panel, the citations and the sources ---------- */
  S.units = [
    { side: 'allied', type: 'infantry', sheet: 'tang-infantry', portrait: 'tang-infantry', name: 'Tang heavy infantry', desc: 'The professional soldiers of the Anxi army: armour, long blades and spears.', tag: 'established', photos: ['46-tang-soldier-figure.jpg'],
      lines: [ { text: 'The Protectorate of Anxi kept a standing army of professional soldiers in the oasis cities of the Tarim basin, far from China.', tag: 'established' },
               { text: 'Its veterans were famous for their discipline. Li Siye, the general who saved Gao Xianzhi in the retreat, fought on foot with the heavy modao blade.', tag: 'tang' } ] },
    { side: 'allied', type: 'archers', sheet: 'tang-crossbow', portrait: 'tang-crossbow', name: 'Tang crossbowmen', desc: 'The crossbow, the nu: the Tang army’s long-range weapon.', tag: 'established',
      lines: [ { text: 'Tang military writers describe crossbowmen shooting in ranks by turns, so that one rank loaded while another shot.', tag: 'established' },
               { text: 'How they were used at Talas is not recorded.', tag: 'reconstruction' } ] },
    { side: 'allied', type: 'cavalry', sheet: 'tang-cavalry', portrait: 'tang-cavalry', name: 'Tang cavalry', desc: 'Armoured horsemen of the Anxi army.', tag: 'established', photos: [{ file: '47-tang-horse-figure.jpg', caption: 'A Tang horse, as a painted pottery figure from a tomb, with its saddle and saddle cloth. The Tang prized tall horses from the west, from Ferghana and the steppe; the horses of the Anxi cavalry came from the same lands they fought over.', ref: 'Tang dynasty tomb figure, New Luoyang City Museum, Henan, China', credit: 'Photo: Gary Lee Todd (Flickr), CC0 public domain, via Wikimedia Commons (Tang Pottery Dancing Horse.jpg)' }],
      lines: [ { text: 'The western armies of the Tang used armoured horsemen alongside infantry and crossbows. Their number at Talas is not known.', tag: 'estimate' } ] },
    { side: 'allied', type: 'infantry', portrait: 'ferghana', name: 'Allies from Ferghana', desc: 'Troops of the kingdom of Ferghana, allied to the Tang.', tag: 'tang',
      lines: [ { text: 'The Tang histories say that in the retreat the road was blocked by the men, horses and camels of the Ferghana troops.', tag: 'tang' } ] },
    { side: 'allied', type: 'cavalry', sheet: 'karluk-cavalry', portrait: 'karluk', name: 'The Karluks', desc: 'Turkic horsemen of the steppe north of the Tian Shan.', tag: 'tang',
      lines: [ { text: 'The Chinese account says the Karluks rebelled against Gao Xianzhi on the fifth day and attacked his army together with the Abbasids.', tag: 'tang' },
               { text: 'Whether they had planned it, and which side they were really on before the battle, is disputed.', tag: 'estimate' } ] },
    { side: 'french', type: 'infantry', sheet: 'abbasid-infantry', portrait: 'abbasid-infantry', name: 'Abbasid infantry of Khurasan', desc: 'Veterans of the revolution under the black banners.', tag: 'established',
      lines: [ { text: 'The Abbasid revolution was won by an army raised in Khurasan, in eastern Iran, under Abu Muslim. Black was the colour of its banners and clothes.', tag: 'established' },
               { text: 'The size of the army Ziyad ibn Salih led to the Talas is not recorded.', tag: 'estimate' } ] },
    { side: 'french', type: 'cavalry', sheet: 'abbasid-cavalry', portrait: 'abbasid-cavalry', name: 'Abbasid cavalry', desc: 'Horsemen of the army of Khurasan.', tag: 'established',
      lines: [ { text: 'The Arabic sources say only that Ziyad met the Chinese and defeated them; how his horsemen fought is not described.', tag: 'arab' } ] }
  ];
  const C = (title, intro, items) => ({ title, intro, items: items.map(([ref, note]) => ({ ref, note })) });
  S.citations = {
    established: C('Established', 'Agreed by the Chinese and the Arabic sources, and by modern historians.', [['Sima Guang, Comprehensive Mirror (Zizhi Tongjian), chapter 216', 'The fullest Chinese account of the campaign.'], ['Old Book of Tang, chapter 109; New Book of Tang', 'The biographies of Gao Xianzhi, Li Siye and Duan Xiushi.']]),
    tang: C('Chinese sources', 'Written by the losing side, by court historians, decades or centuries later.', [['Comprehensive Mirror 216', 'The army of 30,000, the five days, the Karluks’ turn, a few thousand survivors.'], ['Old Book of Tang 109 (Li Siye)', 'White Stone Ridge, the blocked road, Duan Xiushi’s rebuke.'], ['Du You, Tongdian', 'Passages from Du Huan’s Jingxingji, the account of a captive.']]),
    arab: C('Arabic sources', 'Brief, and later than the events; their numbers are far above the Chinese totals.', [['Ibn al-Athir, al-Kamil fi al-Tarikh', 'Ziyad ibn Salih’s victory; 50,000 killed and 20,000 captured (claimed).'], ['al-Tha’alibi', 'The story of the Chinese prisoners and paper-making in Samarkand.']]),
    estimate: C('Estimate', 'A modern estimate, not a recorded figure.', [['Modern histories', 'The size of the Abbasid army, and the location of the battlefield.']]),
    reconstruction: C('Reconstruction', 'Our own choice, to make the battle visible.', [['Battle Games', 'Positions, formations and the fighting on each day are not described in any source.']])
  };
  S.sources = [
    { title: 'Sima Guang, Comprehensive Mirror (Zizhi Tongjian), 216', note: 'The campaign of 751 and its numbers.' },
    { title: 'Old Book of Tang 109; New Book of Tang', note: 'Gao Xianzhi, Li Siye, Duan Xiushi.' },
    { title: 'Du You, Tongdian (quoting Du Huan’s Jingxingji)', note: 'A captive’s account of the western lands.' },
    { title: 'Ibn al-Athir, al-Kamil fi al-Tarikh', note: 'The Arabic account of Ziyad ibn Salih’s victory.' },
    { title: 'Lin Meicun, The city of Talas and the Tang Silk Road (2021)', note: 'Where Talas stood.' },
    { title: 'Kazakh and Kyrgyz research on Atlakh (2021–2022)', note: 'The battlefield south of Taraz, and the memorial at Joon-Döbö.' },
    { title: 'Music: Zuiyu Changwan (The Evening Song of the Drunken Fisherman), guqin', note: 'Played by Charlie Huang, 2013, from the Ming score Tianwen Ge Qinpu (1576); Wikimedia Commons, CC BY-SA 3.0 (creativecommons.org/licenses/by-sa/3.0). A Ming-era piece, chosen for the sound of the instrument, which was already ancient in 751; we shortened it and added a fade.' },
    { title: 'Music: Oud music by Andy R. Jordan (2018)', note: 'Commissioned by the Wikimedia Foundation; Wikimedia Commons, CC BY-SA 3.0 (creativecommons.org/licenses/by-sa/3.0). A modern piece for the oud, the lute of the Abbasid world; we added a fade.' }
  ];
  S.library = [];

  /* ---------- the introduction: which map each slide shows, and its briefing marks ---------- */
  const I = S.intro; ['0', '1', '2', '3', '4'].forEach(k => { I[k].map = 'campaign'; });
  const ring = (p, label, o) => ({ ring: Object.assign({}, p, { label }, o || {}) });
  const unit = (p, o) => ({ unit: Object.assign({}, p, o) });
  const arrow = (pts, label, o) => ({ arrow: Object.assign({ pts: pts.map(P), label }, o || {}) });
  I[0].cues = [ Object.assign({ on: 'in a river valley' }, ring(TALAS_R, 'Talas', { r: 22 })) ];
  I[1].cues = [
    Object.assign({ on: 'Kucha' }, ring(KUCHA, 'Kucha: the Protectorate of Anxi', { r: 20, lx: -30, align: 'right' })),
    Object.assign({ on: 'oasis kingdoms' }, arrow([KUCHA, AKSU, ISSYK, SUYAB], 'Tang garrisons along the Silk Road', { col: '#ff9a86', dy: -20 })),
    Object.assign({ on: 'Khurasan' }, ring(MERV, 'Merv: Khurasan, Abu Muslim', { r: 20, lx: 30, align: 'left' })),
    Object.assign({ on: 'Samarkand' }, ring(SAMARKAND, 'Samarkand', { r: 16 })), Object.assign({ on: 'Bukhara' }, ring(BUKHARA, 'Bukhara', { r: 16 })),
    Object.assign({ on: 'Turkic peoples' }, ring(KARLUK, 'Turkic pastures', { r: 40 })) ];
  I[2].cues = [
    Object.assign({ on: 'king of Chach' }, ring(CHACH, 'Chach (Tashkent)', { r: 20, lx: -30, ly: 0, align: 'right' })),
    Object.assign({ on: 'Chang’an' }, arrow([CHACH, TALAS_R, SUYAB, ISSYK, AKSU, KUCHA, { x: 2390, y: 900 }], 'to Chang’an, 3,000 km east', { col: '#ff9a86', dy: 24 })),
    Object.assign({ on: 'ruler of Ferghana' }, ring(FERGHANA, 'Ferghana', { r: 20, ly: 40 })) ];
  I[3].cues = [
    Object.assign({ on: 'thirty thousand' }, unit({ x: KUCHA.x - 60, y: KUCHA.y - 70 }, { side: 'allied', size: 'XXX', label: 'Anxi army: about 30,000' })),
    Object.assign({ on: 'Ferghana' }, unit({ x: FERGHANA.x, y: FERGHANA.y + 60 }, { side: 'allied', size: 'XX', label: 'Ferghana' })),
    Object.assign({ on: 'the Karluks' }, unit(KARLUK, { side: 'allied', kind: 'cav', size: 'XX', label: 'Karluks' })),
    Object.assign({ on: 'Ziyad ibn Salih' }, unit({ x: MERV.x + 70, y: MERV.y - 80 }, { side: 'french', size: 'XXX', label: 'Army of Khurasan: size unknown' })) ];
  I[5].cues = [
    Object.assign({ on: 'Ancient Taraz' }, ring(TALAS_B, 'Talas (Taraz)', { r: 30 })),
    Object.assign({ on: 'Atlakh' }, ring(ATLAKH, 'Atlakh', { r: 26, lx: -36, ly: 0, align: 'right' })),
    Object.assign({ on: 'raised a monument' }, ring(JOON, 'Kyrgyz memorial, 2021', { r: 22, ly: 44 })),
    Object.assign({ on: 'is our reconstruction' }, ring({ x: 1660, y: 680 }, 'Our battle plain (reconstruction)', { r: 120, ly: -140 })) ];
})();
