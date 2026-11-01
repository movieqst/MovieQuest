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
        { text: 'In July 751, in a river valley in the middle of Asia, the army of Tang China met the army of the Abbasid Caliphate. It is the only battle ever fought between the Chinese and the Arab empires.', tag: 'established' },
        { text: 'Very little was written about it at the time. This introduction separates what the sources say from what historians have pieced together. Watch the colour of each tag.', tag: 'reconstruction' }
      ] },
    { title: 'Two empires',
      lines: [
        { text: 'In 751 Tang China was at the height of its power. From its western headquarters at Kucha, the Protectorate of Anxi, its generals watched over the oasis kingdoms of the Silk Road as far as the mountains of Central Asia.', tag: 'established' },
        { text: 'Far to the west a new power had just risen. In 750 the Abbasid family overthrew the Umayyad caliphs, with an army raised in Khurasan, in eastern Iran, under the black banners of Abu Muslim. Its frontier now reached Samarkand and Bukhara.', tag: 'established' },
        { text: 'Between them lay the cities of the Sogdians, merchants of the Silk Road, and the pastures of the Turkic peoples, who took sides as it suited them.', tag: 'established' }
      ] },
    { title: 'The spark',
      lines: [
        { text: 'In 750 the Tang general Gao Xianzhi made peace with the king of Chach, the city that is Tashkent today, then broke his word, seized the city and sent the king to the Chinese capital, Chang’an, where he was put to death.', tag: 'tang' },
        { text: 'The Chinese historians themselves blame Gao. The king’s son escaped, and the peoples of the west, angry at what had been done, called on the Arabs to help them attack the Tang garrisons.', tag: 'tang' },
        { text: 'Gao decided to strike first.', tag: 'tang' }
      ] },
    { title: 'The armies',
      lines: [
        { text: 'Gao Xianzhi led about thirty thousand men, Chinese and allied, according to the most careful Chinese account. Other sources say twenty thousand, sixty thousand or seventy thousand; the Arab writers say a hundred thousand.', tag: 'tang' },
        { text: 'Its core was the professional army of Anxi: armoured infantry with crossbows and long two-handed swords, under hard veterans like the general Li Siye. With them marched allies from the kingdom of Ferghana and horsemen of the Karluks, a Turkic people.', tag: 'established' },
        { text: 'The Abbasid army was commanded by Ziyad ibn Salih, sent by Abu Muslim from Khurasan: Arab and Persian soldiers of the revolution, with troops from the Sogdian cities. No reliable figure for its size survives; modern guesses run from twenty to forty thousand.', tag: 'estimate' }
      ] },
    { title: 'The sources',
      lines: [
        { text: 'On the Chinese side there are a few paragraphs in the Old and New Histories of the Tang and in Sima Guang’s Comprehensive Mirror, and one line in the Tongdian of Du You, whose nephew Du Huan was captured in the battle.', tag: 'established' },
        { text: 'On the Arab side there are only short notices, in al-Tabari, Ibn al-Athir and later writers. They agree with the Chinese on the outline, and on almost nothing else.', tag: 'established' },
        { text: 'No source describes how the armies stood or what happened on each of the five days. In this reenactment, those parts are our reconstruction, and they are marked as such.', tag: 'reconstruction' }
      ] },
    { title: 'The ground',
      lines: [
        { text: 'The battle was fought near the town of Talas, on the Talas river, where it leaves the mountains of Kyrgyzstan for the plain. The town lies under the modern city of Taraz in Kazakhstan.', tag: 'established' },
        { text: 'The exact battlefield has never been found. The Arab writers name the place Atlakh. Historians and archaeologists in Kazakhstan and Kyrgyzstan place it on the plain south of Taraz, and Kyrgyzstan raised a monument there in 2021.', tag: 'estimate' },
        { text: 'The maps in this reenactment are drawn from real satellite measurements of the valley. Where the armies stood on them is our reconstruction.', tag: 'reconstruction' }
      ] }
  ],

  /* ---------- The reenactment ---------- */
  events: [
    { t: 0, title: 'The march west', tag: 'tang', clock: 'Spring 751',
      text: 'Gao Xianzhi leads his army out of Kucha. His route is not recorded, but the road west ran over the passes of the Tian Shan, past the great lake of Issyk-Kul and down the valley of the Chu. The Comprehensive Mirror says he went more than seven hundred li, about three hundred and fifty kilometres, deep into enemy country.',
      explain: 'Why go so far? Gao meant to destroy the coalition before it could attack the Tang garrisons, the Four Garrisons of Anxi. It was the way he had always fought: in 747 he had crossed the Pamirs to take a Tibetan-held kingdom by surprise. But this time he was marching away from his supplies, through lands whose peoples he had just made his enemies.' },
    { t: 14, title: 'The Abbasid army', tag: 'arab', clock: 'Early summer 751',
      text: 'From Samarkand, Ziyad ibn Salih marches north-east through Chach with the troops of Khurasan, gathering the forces of the Sogdian princes on the way. The two armies are heading for the same valley.',
      explain: 'The Abbasids had only just won their civil war, and Abu Muslim, who ruled the east for them, was still putting down rebels. Sending an army to the Talas shows how seriously he took the Tang advance. The Arab sources say little more than that Ziyad met the Chinese and defeated them.' },
    { t: 28, title: 'The valley of the Talas', tag: 'established', clock: 'July 751',
      text: 'In July the armies meet near Talas, a walled town of merchants on the river. Gao’s army comes down the valley from the east; Ziyad’s comes from the west, by way of Chach.',
      explain: 'Talas was a Silk Road town on the edge of the steppe. The Chinese pilgrim Xuanzang had passed through it in 630, and it had once acknowledged the Tang. To fight there was to fight on the old border between the Chinese world and the lands of Islam.' },
    { t: 42, title: 'The armies form up', tag: 'reconstruction', clock: 'Day 1',
      text: 'The two armies face each other on the open plain. The Tang infantry form a solid line, crossbowmen in front, the long-sword men behind them. The Ferghana troops and the Karluk horsemen take the wings.',
      explain: 'No source tells us how the armies stood. We show the Tang army as it was trained to fight: crossbows to break a charge, heavy infantry to hold the line, allied cavalry on the flanks because the Tang force had few horsemen of its own. The Abbasid army, rich in cavalry, faces it with horsemen on its wings.' },
    { t: 56, title: 'The first day', tag: 'reconstruction', clock: 'Day 1',
      text: 'The Abbasid horsemen ride against the Tang line again and again. The crossbow volleys empty saddles, and the charges break against the armoured infantry. Neither side gives way.',
      explain: 'The Tang army relied on the crossbow, shot in massed volleys by men trained to reload in ranks. Against it, the Abbasid commanders could only charge, pull back and charge again. This day, and the next three, are our reconstruction of a stalemate that the Chinese sources describe in four words.' },
    { t: 70, title: 'Five days', tag: 'tang', clock: 'Days 2 to 4',
      text: 'The Comprehensive Mirror says the two armies held each other for five days. Day after day they fight on the same ground. Men and horses tire in the July heat, and the dead lie in the grass between the lines.',
      explain: 'Five days is a very long time for a battle in the open. It suggests that neither side could break the other, and that both commanders were waiting for something to change. On the fifth day, something did.' },
    { t: 86, title: 'The Karluks turn', tag: 'established', clock: 'Day 5',
      text: 'On the fifth day the Karluk horsemen, Gao’s own allies, turn their horses and attack the Tang army from the flank and the rear, while the Abbasid army attacks from the front. Caught between them, the Tang line breaks.',
      explain: 'Both the Chinese and the Arab sources agree that the Karluks changed sides. Nobody knows whether it was planned with the Abbasids beforehand or decided on the field. The Karluks had their own reasons: their pastures lay to the north and east of the Talas, and a Tang victory would have made the Tang their masters.' },
    { t: 100, title: 'The rout', tag: 'tang', clock: 'Day 5',
      text: 'The army of Anxi is destroyed. The Comprehensive Mirror says that the soldiers were killed almost to the last man, and only a few thousand were left. Many more are taken prisoner.',
      explain: 'The Chinese and the Arab figures cannot be reconciled. The Tongdian says seventy thousand were lost; the Arab historians say fifty thousand Chinese were killed and twenty thousand captured. Both are probably too high. What is certain is that Gao’s army ceased to exist.' },
    { t: 114, title: 'White Stone Ridge', tag: 'tang', clock: 'Night',
      text: 'As night falls, the general Li Siye begs Gao Xianzhi to escape. If the whole army is lost, he says, both of them will be taken. They must ride for White Stone Ridge, in the hills behind them, and make their way home. Gao agrees.',
      explain: 'This story comes from the biography of Li Siye in the Old History of the Tang. Where White Stone Ridge was, nobody has been able to work out. It must have been a pass on the road back toward the east, the way the army had come.' },
    { t: 128, title: 'The blocked road', tag: 'tang', clock: 'Night',
      text: 'The road through the hills is narrow. The troops of Ferghana, fleeing first, have jammed it with their men, horses and camels. Li Siye goes ahead with a great club and clears the road by force, striking down men and animals, and Gao Xianzhi gets through.',
      explain: 'It is the most vivid scene in the Chinese account, and not a heroic one. Li Siye saved his commander by killing his own allies. Li Siye was a giant of a man, famous for fighting on foot with a long two-handed blade, and the Tang historians clearly admired him even here.' },
    { t: 142, title: 'Duan Xiushi', tag: 'tang', clock: 'Night',
      text: 'A junior officer, Duan Xiushi, calls after Li Siye in the dark: to run from the enemy is not courage, and to save yourself by abandoning your men is not honourable. Ashamed, Li Siye turns back with him, and together they gather the scattered soldiers and lead them out.',
      explain: 'Li Siye did not punish the young officer. He remembered him, and later asked Gao Xianzhi to promote him. Both men served through the civil war that was about to tear China apart; Li Siye died fighting in it.' },
    { t: 156, title: 'The prisoners', tag: 'established', clock: 'After the battle',
      text: 'Thousands of Chinese prisoners are marched west, to Samarkand and beyond. One of them, Du Huan, a clerk of the army, will travel through the Abbasid world for eleven years before he comes home by sea in 762, and write the first Chinese account of the lands of Islam.',
      explain: 'A later Arab writer says that Chinese prisoners taken at this battle taught the people of Samarkand to make paper. Paper was probably known there already, and historians doubt the story. But Samarkand paper did become famous, and from Central Asia paper-making spread to Baghdad and on to the West.' },
    { t: 170, title: 'Gao Xianzhi’s return', tag: 'tang', clock: 'Late 751',
      text: 'Gao Xianzhi reaches Anxi with the survivors. He is not punished. The emperor gives him new commands, and the Tang garrisons stay in the oasis cities of the west.',
      explain: 'For the Tang court, Talas was a lost battle on a distant frontier, not a disaster. The Tang histories give it only a few lines. It was what happened four years later that changed everything.' },
    { t: 184, title: 'What came after', tag: 'established', clock: '751 to 790',
      text: 'In 755 the rebellion of An Lushan broke out in China. The Tang armies of the west were called home to fight it, and Gao Xianzhi himself was executed by his own side in the war. Cut off, the Tang garrisons of the west held out for decades, but the Tibetans and others took the western lands one by one.',
      explain: 'Talas is often called the battle that decided whether Central Asia would be Chinese or Muslim. Historians today are more careful. The Abbasids never tried to advance into China, and it was the An Lushan rebellion, not Talas, that ended Tang power in the west. Islam spread in Central Asia slowly, over the next three centuries, and mostly in peace.' }
  ],

  outcome: [
    { text: 'The Abbasid army won. The Tang army of Anxi was destroyed, after the Karluk Turks changed sides on the fifth day.', tag: 'established' },
    { text: 'The Chinese sources say thirty thousand Tang and allied soldiers marched, and only a few thousand came back. The Arab sources claim fifty thousand Chinese killed and twenty thousand captured.', tag: 'estimate' },
    { text: 'Gao Xianzhi, Li Siye and Duan Xiushi escaped. Du Huan was captured, travelled for eleven years in the Abbasid world, and came home to write about it.', tag: 'tang' },
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
