/*
  Historical Scenario File — Battle of Talas, July 751
  ----------------------------------------------------
  The narrated introduction (`intro`), the reenactment chapters (`events`) and the debrief (`outcome`).
  STATUS: the text is written and ready to record; maps, formations and the orders that move them are added when the
  engine is built (see RESEARCH.md and images/layout/).

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

  sides: {
    tang:  { name: 'Tang China',          short: 'Tang',     army: 'The Anxi army of Gao Xianzhi, with allies from Ferghana and the Karluk Turks', color: '#c0392b' },
    arab:  { name: 'Abbasid Caliphate',   short: 'Abbasid',  army: 'The army of Khurasan under Ziyad ibn Salih', color: '#2e3a46' }
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
      lines: [
        { text: 'Gao Xianzhi led thirty thousand Tang and allied soldiers, according to the Comprehensive Mirror. Other Chinese accounts give twenty or sixty thousand, while Arab accounts give much larger figures.', tag: 'tang' },
        { text: 'Its core was the professional army of Anxi, with armoured infantry and crossbows, under hard veterans like the general Li Siye. With them marched allies from the kingdom of Ferghana, and the Karluks, a Turkic people.', tag: 'established' },
        { text: 'The Abbasid army was commanded by Ziyad ibn Salih, sent by Abu Muslim from Khurasan. No reliable figure for its size survives. Modern estimates vary widely, and none can be confirmed.', tag: 'estimate' }
      ] },
    { title: 'The sources',
      lines: [
        { text: 'The Chinese sources include the two Tang histories and the Comprehensive Mirror. Du You’s Tongdian also preserves passages from the travel account of his relative Du Huan, who was captured.', tag: 'established' },
        { text: 'The Arabic accounts are brief and sometimes tell a different story, especially about why the armies fought and how many men were lost.', tag: 'established' },
        { text: 'No source describes how the armies stood or what happened on each of the five days. In this reenactment, those parts are our reconstruction, and they are marked as such.', tag: 'reconstruction' }
      ] },
    { title: 'The ground',
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
