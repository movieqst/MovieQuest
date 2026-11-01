/*
  Historical Scenario File — Battle of Edington (Ethandun), May 878
  -----------------------------------------------------------------
  Drives the reenactment (events) and the playable battle (ai.plans), as in the other battles.

  Confidence tags:
    established    — accepted by historians
    account        — from the Anglo-Saxon Chronicle or Asser's Life of King Alfred: near-contemporary, but written for Alfred's court
    disputed       — the sources or the scholars disagree
    estimate       — a modern estimate, not a recorded figure
    reconstruction — our own choice to make the battle playable

  Map: schematic open downland, north up. The West Saxons come from the south-west (from Iley and Egbert's Stone);
  the Viking army holds the high ground to the north-east, with its stronghold behind it. The site of Ethandun is
  usually placed at Edington in Wiltshire, but neither the field nor the stronghold is known for certain, so the map
  names no real features beyond the downland.
*/
window.EDINGTON_SCENARIO = {
  id: 'edington',
  title: 'Battle of Edington',
  date: 'May 878',
  place: 'Ethandun, Wessex (probably Edington, Wiltshire; schematic)',
  tagline: 'Alfred the Great vs. Guthrum',
  duration: 130,
  titleCard: {
    title: 'BATTLE OF EDINGTON',
    date: 'May 878',
    dateNote: 'The battle that saved Wessex. Driven into the marshes in the winter, Alfred gathered an army in the spring and broke the Viking Great Army at Ethandun.',
    dateRef: 'Anglo-Saxon Chronicle, 878; Asser, Life of King Alfred, ch. 52–56',
    place: 'Ethandun, on the downs of Wiltshire',
    sides: 'The West Saxons under Alfred  ·  the Viking Great Army under Guthrum'
  },
  commandDuration: 300,
  commandFocus: { x: 1200, y: 900 },
  world: { w: 2400, h: 1800 },

  confidence: {
    established:    { label: 'Established',     color: '#5fcf8a', desc: 'Accepted by historians.' },
    account:        { label: 'Chronicle',       color: '#e9c77a', desc: 'From the Anglo-Saxon Chronicle or Asser’s Life of King Alfred. Close to the events, but written for Alfred’s court.' },
    disputed:       { label: 'Disputed',        color: '#ffb3a7', desc: 'The sources or the scholars disagree about this.' },
    estimate:       { label: 'Estimate',        color: '#7fb8ff', desc: 'A modern estimate, not a recorded figure.' },
    reconstruction: { label: 'Reconstruction',  color: '#c9a0ff', desc: 'Our own choice to make the battle playable: positions, timings and map.' }
  },

  sides: {
    saxon:  { name: 'West Saxons', color: '#c0392b', light: '#ffd6d0', rally: { x: 400, y: 1700 } },
    viking: { name: 'Vikings',     color: '#2e5aa8', light: '#c9dcff', rally: { x: 2100, y: 100 } }
  },

  battlefield: {
    scale: { px: 60, label: 'schematic, not to scale' },
    river: [], tributary: [], fords: [], bridge: null, city: null, camp: null, road: [],
    forests: [{ x: 730, y: 1270, r: 140 }, { x: 1685, y: 1225, r: 130 }],   // the two woods on the painted map (images/terrain.jpg)
    hills: [],
    fields: [],
    labels: [
      { x: 1200, y: 40, text: 'Toward the Viking stronghold', small: true },
      { x: 400, y: 1780, text: 'From Iley and Egbert’s Stone', small: true },
      { x: 1200, y: 1760, text: 'Schematic: the exact site of Ethandun is not known', small: true }
    ]
  },

  intro: [
    {
      title: 'BATTLE OF EDINGTON',
      media: [
        { at: 0, file: '01-shieldwall-rendering.jpg', caption: 'ARTIST RENDERING. The two shield walls meet at Ethandun, under the dragon banner of Wessex. Asser says Alfred fought with a dense shield wall; the faces, colours and details here are imagined.', ref: 'After Asser, Life of King Alfred, ch. 56', credit: 'Artist rendering: Battle Games, AI-generated' },
        { at: 6, file: '02-alfred-statue-winchester.jpg', caption: 'King Alfred as the Victorians imagined him: Hamo Thornycroft\u2019s bronze statue in Winchester, Alfred\u2019s capital, unveiled in 1901 for the thousandth anniversary of his death. No portrait of Alfred from his own lifetime survives.', ref: 'The Broadway, Winchester, Hampshire', credit: 'Photo: Antony McCallum, WyrdLight.com, 2006. Wikimedia Commons; free to use with attribution' },
        { at: 11, file: '03-alfred-statue-1918.jpg', caption: 'An American army band at the foot of the Alfred statue in Winchester near the end of the First World War. Many US troops passed through the city on their way to France.', ref: 'Winchester, c. 1918', credit: 'Photo: Hampshire and Solent Museums, Wikimedia Commons, CC BY-SA 2.0' }
      ],
      subtitle: 'May 878 · Wessex',
      focus: { x: 1200, y: 900 }, zoom: 'fit',
      markers: [],
      auto: 14,
      lines: [
        { text: 'By 878 the Viking Great Army had conquered Northumbria, East Anglia and much of Mercia. Wessex was the last English kingdom standing.', tag: 'established' },
        { text: 'This introduction separates what the sources say from what historians have reconstructed. Watch for the coloured tags.', tag: 'reconstruction' }
      ]
    },
    {
      title: 'Surprise at Chippenham',
      media: [
        { at: 0, file: '18-chippenham-878-postcard.jpg', caption: 'ARTIST RENDERING. Chippenham, a royal estate of the kings of Wessex, stood on a rise inside a loop of the River Avon (its name means Cippa\u2019s land in the river bend). Guthrum\u2019s army struck in midwinter after Twelfth Night 878, while Alfred kept the Christmas feast there. The buildings are a reconstruction: nothing of the Saxon estate survives.', ref: 'After the Anglo-Saxon Chronicle, 878, and Asser, ch. 52', credit: 'Artist rendering: Battle Games, AI-generated' },
        { at: 7, file: '19-chippenham-today-postcard.jpg', caption: 'ARTIST\u2019S IMPRESSION. Chippenham today: a Wiltshire market town still built around the same bend of the River Avon, with St Andrew\u2019s Church on the high ground and Brunel\u2019s Great Western Railway viaduct beyond. The details here are painted, not photographed.', ref: 'Chippenham, Wiltshire', credit: 'Artist\u2019s impression: Battle Games, AI-generated' },
        { at: 14, file: '16-chronicle-peterborough.jpg', caption: 'The Anglo-Saxon Chronicle, our main source for 878: the opening page of the Peterborough copy, beginning \u201cThe island of Britain is eight hundred miles long and two hundred broad\u201d. The Chronicle records that the Vikings came to Chippenham \u201cin midwinter after Twelfth Night\u201d.', ref: 'Bodleian Library, Oxford, MS Laud Misc. 636; facsimile from B. Thorpe\u2019s edition (1861)', credit: 'Facsimile: Benjamin Thorpe, 1861. Public domain (Wikimedia Commons)' }
      ],
      focus: { x: 1200, y: 900 }, zoom: 'fit',
      markers: [],
      auto: 18,
      lines: [
        { text: 'In January 878, just after Twelfth Night, Guthrum’s army fell on the royal estate at Chippenham in the middle of winter, when no one expected an attack.', tag: 'account', cite: 'Anglo-Saxon Chronicle, 878' },
        { text: 'The Chronicle says the Vikings occupied Wessex, drove many people overseas and forced most of the rest to submit, all except King Alfred.', tag: 'account', cite: 'Anglo-Saxon Chronicle, 878' },
        { text: 'Alfred escaped with a small band into the woods and the marshes of Somerset.', tag: 'account', cite: 'Anglo-Saxon Chronicle, 878; Asser ch. 53' }
      ]
    },
    {
      title: 'Athelney',
      media: [
        { at: 0, file: '06-athelney-hill.jpg', caption: 'Athelney today: a low rise above the flat fields of the Somerset Levels. In 878 these fields were marsh and fen, and Athelney was an island in them, reached only by boat or hidden paths.', ref: 'Athelney, near Lyng, Somerset', credit: 'Photo: Simon Burchell, Wikimedia Commons, CC BY-SA 4.0' },
        { at: 5, file: '07-athelney-monument.jpg', caption: 'The monument on the hill, put up in 1801 by the local squire, John Slade, to mark where Alfred sheltered and later founded an abbey. Nothing of Alfred\u2019s fort or the abbey survives above ground.', ref: 'King Alfred\u2019s Monument, Athelney (listed building)', credit: 'Photo: Stephen Richards, geograph.org.uk, Wikimedia Commons, CC BY-SA 2.0' },
        { at: 10, file: '04-alfred-jewel-front.jpg', caption: 'The Alfred Jewel: a figure in coloured enamel under a polished rock crystal, set in gold. It was found in 1693 at North Petherton, a few miles from Athelney, and was probably the handle of a pointer used to follow the words while reading.', ref: 'Ashmolean Museum, Oxford, AN1836 p.135.371', credit: 'Photo: user Geni, Wikimedia Commons, CC BY-SA 4.0' },
        { at: 15, file: '05-alfred-jewel-side.jpg', caption: 'Its gold rim spells out in Old English \u00c6LFRED MEC HEHT GEWYRCAN, \u201cAlfred ordered me to be made\u201d. The base ends in the head of a beast.', ref: 'Ashmolean Museum, Oxford', credit: 'Photo: Richard M Buck, Wikimedia Commons, CC BY-SA 3.0' }
      ],
      focus: { x: 400, y: 1500 }, zoom: .8,
      markers: [],
      auto: 18,
      lines: [
        { text: 'At Easter Alfred built a fort at Athelney, an island in the Somerset marshes, and raided the Vikings from it with the men of Somerset.', tag: 'account', cite: 'Anglo-Saxon Chronicle, 878; Asser ch. 55' },
        { text: 'The famous story of Alfred burning a woman’s cakes was first written down about a century later. It may be a legend.', tag: 'disputed', cite: 'Life of St Neot (late 10th or 11th century)' },
        { text: 'That winter another Viking force landed in Devon and was beaten at Countisbury, a sign that Wessex could still fight back.', tag: 'account', cite: 'Anglo-Saxon Chronicle, 878; Asser ch. 54' }
      ]
    },
    {
      title: 'The muster at Egbert’s Stone',
      media: [
        { at: 0, file: '14-egberts-stone-rendering.jpg', caption: 'ARTIST RENDERING. Alfred meets the men of Somerset, Wiltshire and Hampshire at Egbert\u2019s Stone, May 878, under the dragon banner of Wessex. The stone has not survived and its exact place is unknown; its look here is imagined.', ref: 'After the Anglo-Saxon Chronicle, 878, and Asser, ch. 55', credit: 'Artist rendering: Battle Games, AI-generated' },
        { at: 9, file: '15-egberts-stone-poster.jpg', caption: 'ARTIST RENDERING. The muster and the march: from Athelney to Egbert\u2019s Stone, on to Iley Oak and then Edington. The stone is traditionally placed near King Alfred\u2019s Tower at Stourhead.', ref: 'Anglo-Saxon Chronicle, 878', credit: 'Artist rendering: Battle Games, AI-generated' }
      ],
      focus: { x: 400, y: 1500 }, zoom: .8,
      markers: [],
      auto: 18,
      lines: [
        { text: 'In the seventh week after Easter, in early May, Alfred rode to Egbert’s Stone, east of Selwood Forest.', tag: 'account', cite: 'Anglo-Saxon Chronicle, 878' },
        { text: 'The men of Somerset, Wiltshire and the part of Hampshire west of the sea came to meet him there, and were glad to see him.', tag: 'account', cite: 'Anglo-Saxon Chronicle, 878' },
        { text: 'Where Egbert’s Stone stood is not known for certain.', tag: 'disputed' }
      ]
    },
    {
      title: 'The two armies',
      media: [
        { at: 0, file: '11-gokstad-ship-model.jpg', caption: 'A quarter-size model of the Gokstad ship, a Viking longship built around 890 and found in a burial mound in Norway. Ships like this, rowed by about thirty to forty men, carried the Great Army to England.', ref: 'Marinemuseet (Royal Norwegian Navy Museum), Horten, Norway', credit: 'Photo: Wolfmann, Wikimedia Commons, CC BY-SA 4.0' },
        { at: 4, file: '13-viking-reenactors.jpg', caption: 'Viking-age reenactors in mail and iron helmets, with big round wooden shields painted in bright colours. Shields like these, overlapped edge to edge, made the shield wall.', ref: 'Magnus Barelegs Viking Festival, Delamont Country Park, County Down, 2012 (modern reenactment)', credit: 'Photo: Ardfern, Wikimedia Commons, CC BY-SA 3.0' },
        { at: 8, file: '10-viking-warrior-reconstruction.jpg', caption: 'A museum reconstruction of a well-equipped Viking warrior: an iron helmet with a nose guard and a mail shirt. Only the richer men in either army had gear like this; most fought with a spear, a shield and a long knife.', ref: 'Marinemuseet, Horten, Norway (modern reconstruction)', credit: 'Photo: Wolfmann, Wikimedia Commons, CC BY-SA 4.0' },
        { at: 12, file: '09-gjermundbu-helmet.jpg', caption: 'The Gjermundbu helmet, the best-preserved Viking helmet ever found, with its spectacle-shaped eye guard. It was made around 950 to 1000, about a century after Edington, but shows the kind of helmet a Viking leader might have worn. No Viking helmet had horns.', ref: 'Museum of Cultural History, University of Oslo', credit: 'Photo: Wolfmann, Wikimedia Commons, CC BY-SA 4.0' },
        { at: 16, file: '12-valsgarde-helmet.jpg', caption: 'An older warrior helmet, from a 7th-century boat grave at Valsg\u00e4rde in Sweden, two centuries before Edington. Helmets like this belonged to the rich warrior class of Scandinavia from which the Viking Age grew.', ref: 'Valsg\u00e4rde boat grave 5; shown in \u201cThe Vikings Begin\u201d, Nordic Museum, Seattle', credit: 'Photo: Joe Mabel, Wikimedia Commons, CC BY-SA 4.0' }
      ],
      focus: { x: 1200, y: 900 }, zoom: 'fit',
      markers: [],
      auto: 18,
      lines: [
        { text: 'Both armies fought on foot in a shield wall: a packed line of men with round shields overlapping, spears in front and more men pushing behind.', tag: 'established' },
        { text: 'No source gives the size of either army. Modern guesses run to a few thousand men on each side.', tag: 'estimate' },
        { text: 'Most men carried a spear, a shield and a long knife. Only the richer men had mail, a helmet and a sword.', tag: 'established' }
      ]
    },
    {
      title: 'The sources',
      media: [
        { at: 0, file: '17-chronicle-corpus.jpg', caption: 'A page of an eleventh-century copy of the Anglo-Saxon Chronicle, written in Old English, with the entries for 923 and 924. The Chronicle was kept year by year in several copies, starting at Alfred\u2019s court around 890.', ref: 'Corpus Christi College, Cambridge; facsimile from B. Thorpe\u2019s edition (1861)', credit: 'Facsimile: Benjamin Thorpe, 1861. Public domain (Wikimedia Commons)' },
        { at: 8, file: '08-bratton-camp-edington-hill.jpg', caption: 'From the ramparts of Bratton Camp, an Iron Age hillfort, along the chalk down toward Edington Hill. The battle is usually placed on these downs above Edington, and some historians think Bratton Camp was the stronghold where Guthrum\u2019s army was besieged afterwards.', ref: 'Bratton Camp, near Westbury, Wiltshire', credit: 'Photo: Neil Owen, geograph.org.uk, Wikimedia Commons, CC BY-SA 2.0' }
      ],
      focus: { x: 1200, y: 900 }, zoom: 'fit',
      markers: [],
      auto: 16,
      lines: [
        { text: 'The Anglo-Saxon Chronicle and Asser’s Life of King Alfred were both written within a few years of the battle, at Alfred’s court. They tell his side of the story.', tag: 'account' },
        { text: 'They say little about the fighting itself. Where the game shows more, it is a reconstruction.', tag: 'reconstruction' },
        { text: 'Ethandun is usually placed at Edington in Wiltshire, but historians still argue about the exact field.', tag: 'disputed' }
      ]
    },
    {
      title: 'The armies are drawn up. What happens next?',
      focus: { x: 1200, y: 900 }, zoom: 'fit',
      markers: [],
      choice: true,
      lines: [
        { text: 'The story continues on the downs. Choose how to see it.', tag: 'established' },
        { text: 'Watch the reenactment: the battle in narrated chapters, from the march to Ethandun to the peace that followed, then a debrief on what the sources say.', tag: 'established' },
        { text: 'Take command: lead one of the armies and see whether you can change the outcome. The debrief then compares your battle with history.', tag: 'reconstruction' }
      ]
    }
  ],

  /* Formations: a first draft for the map, to be placed when the map is drawn. `power` is a game balance value, not a count. */
  formations: [
    { id: 'alfred',   side: 'saxon',  name: 'Alfred and his household', division: 'Alfred', type: 'infantry', cols: 5, rows: 3, power: 1.3, x: 1200, y: 1560,
      count: 'The king’s companions', confidence: 'reconstruction', note: 'Alfred fought in the line with his own men. Where he stood is not recorded.' },
    { id: 'somerset', side: 'saxon',  name: 'Men of Somerset', division: 'Somerset', type: 'infantry', cols: 8, rows: 3, power: 1.0, x: 850, y: 1560,
      count: 'Part of the army (no figure)', confidence: 'account', note: 'The men who had held out with Alfred at Athelney.' },
    { id: 'wiltshire', side: 'saxon', name: 'Men of Wiltshire', division: 'Wiltshire', type: 'infantry', cols: 8, rows: 3, power: 1.0, x: 1550, y: 1560,
      count: 'Part of the army (no figure)', confidence: 'account', note: 'Came to Egbert’s Stone to join the king.' },
    { id: 'hampshire', side: 'saxon', name: 'Men of Hampshire', division: 'Hampshire', type: 'infantry', cols: 6, rows: 3, power: .9, x: 1200, y: 1700,
      count: 'Part of the army (no figure)', confidence: 'account', note: 'From the part of Hampshire west of the sea.' },
    { id: 'saxbows',  side: 'saxon',  name: 'Bowmen and javelin men', division: 'Skirmishers', type: 'archers', cols: 6, rows: 1, power: .7, x: 1200, y: 1450,
      count: 'A few', confidence: 'reconstruction', note: 'Archers and throwers are known from the period; their part in this battle is not recorded.' },
    { id: 'guthrum',  side: 'viking', name: 'Guthrum and his warband', division: 'Guthrum', type: 'infantry', cols: 5, rows: 3, power: 1.3, x: 1200, y: 600,
      count: 'The king’s own men', confidence: 'reconstruction', note: 'Guthrum survived the battle; where he stood is not recorded.' },
    { id: 'vleft',    side: 'viking', name: 'Viking shield wall (west)', division: 'Great Army', type: 'infantry', cols: 8, rows: 3, power: 1.0, x: 850, y: 600,
      count: 'Part of the Great Army', confidence: 'reconstruction', note: 'The Chronicle says Alfred fought against the whole army.' },
    { id: 'vright',   side: 'viking', name: 'Viking shield wall (east)', division: 'Great Army', type: 'infantry', cols: 8, rows: 3, power: 1.0, x: 1550, y: 600,
      count: 'Part of the Great Army', confidence: 'reconstruction', note: 'The Chronicle says Alfred fought against the whole army.' },
    { id: 'vbows',    side: 'viking', name: 'Viking bowmen', division: 'Bowmen', type: 'archers', cols: 6, rows: 1, power: .7, x: 1200, y: 760,
      count: 'A few', confidence: 'reconstruction', note: 'Bows were used in Viking armies; their part here is not recorded.' }
  ],

  events: [
    { t: 0, title: 'The march to Ethandun', tag: 'account', focus: { x: 800, y: 1400 }, zoom: 'fit',
      text: 'From Egbert’s Stone the army marched one day to Iley, and the next morning on to Ethandun, where the Viking army was waiting.',
      explain: 'Gathering an army from three shires in one place, then marching at once, gave the Vikings little warning. The Chronicle gives the route; where Iley lay is not certain.',
      cite: 'Anglo-Saxon Chronicle, 878; Asser ch. 55–56', orders: [ { id: 'alfred', to: { x: 1200, y: 1250 }, speed: 18 }, { id: 'somerset', to: { x: 850, y: 1250 }, speed: 18 }, { id: 'wiltshire', to: { x: 1550, y: 1250 }, speed: 18 }, { id: 'hampshire', to: { x: 1200, y: 1430 }, speed: 18 }, { id: 'saxbows', to: { x: 1200, y: 1130 }, speed: 18 } ] },
    { t: 12, title: 'The shield walls form', tag: 'established', focus: { x: 1200, y: 900 },
      text: 'Both armies form their shield walls: overlapping round shields, spears levelled, the best men in the front rank.',
      explain: 'A shield wall was strong while it held together. Battles were usually decided when one side’s line gave way, not by single heroes.',
      cite: 'General knowledge of early medieval warfare', orders: [ { id: 'vleft', to: { x: 850, y: 720 }, speed: 12 }, { id: 'guthrum', to: { x: 1200, y: 720 }, speed: 12 }, { id: 'vright', to: { x: 1550, y: 720 }, speed: 12 }, { id: 'vbows', to: { x: 1200, y: 860 }, speed: 12 } ] },
    { t: 26, title: 'Missiles', tag: 'reconstruction', focus: { x: 1200, y: 900 },
      text: 'Before the lines meet, arrows, spears and throwing axes fly across the gap.',
      explain: 'Throwing weapons and bows are known from the period. The sources do not describe them at Ethandun; this chapter is a reconstruction.',
      cite: 'Reconstruction', orders: [ { id: 'saxbows', to: { x: 1200, y: 990 }, speed: 20 }, { id: 'vbows', to: { x: 1200, y: 880 }, speed: 20 } ] },
    { t: 40, title: 'The clash', tag: 'account', focus: { x: 1200, y: 640 },
      text: 'Alfred’s army closes with the whole Viking army. Asser writes that he fought fiercely, with a dense shield wall.',
      explain: 'Asser’s Latin phrase is densa testudine, a close-packed wall of shields. It is the only detail of the fighting that a near-contemporary source gives.',
      cite: 'Asser, Life of King Alfred, ch. 56', orders: [ { id: 'saxbows', to: { x: 1200, y: 1500 }, speed: 30 }, { id: 'vbows', to: { x: 1200, y: 560 }, speed: 30 }, { id: 'alfred', to: { x: 1200, y: 790 }, speed: 34, state: 'attack' }, { id: 'somerset', to: { x: 850, y: 790 }, speed: 34, state: 'attack' }, { id: 'wiltshire', to: { x: 1550, y: 790 }, speed: 34, state: 'attack' }, { id: 'hampshire', to: { x: 1200, y: 930 }, speed: 30 } ] },
    { t: 56, title: 'A long struggle', tag: 'account', focus: { x: 1200, y: 640 },
      text: 'The two lines push, stab and hold. Asser says the fighting went on for a long time.',
      explain: 'In a shield-wall fight the men at the front were relieved by those behind. Exhaustion, losses and nerve decided when a line would break.',
      cite: 'Asser, Life of King Alfred, ch. 56', orders: [ { id: 'alfred', state: 'hold', strengthTo: 75, over: 14 }, { id: 'somerset', state: 'hold', strengthTo: 70, over: 14 }, { id: 'wiltshire', state: 'hold', strengthTo: 72, over: 14 }, { id: 'guthrum', strengthTo: 60, over: 14 }, { id: 'vleft', strengthTo: 55, over: 14 }, { id: 'vright', strengthTo: 55, over: 14 } ] },
    { t: 72, title: 'The Viking line breaks', tag: 'account', focus: { x: 1200, y: 700 },
      text: 'At last the Viking army gives way and flees. The West Saxons cut down many of them as they run.',
      explain: 'Most killing in battles of this kind happened after a line broke, as men fled. The number of dead is not recorded.',
      cite: 'Anglo-Saxon Chronicle, 878; Asser ch. 56', orders: [ { id: 'vleft', state: 'rout', to: { x: 900, y: 150 }, speed: 32, strengthTo: 30, over: 6, spread: 2.2 }, { id: 'vright', state: 'rout', to: { x: 1500, y: 150 }, speed: 32, strengthTo: 30, over: 6, spread: 2.2 }, { id: 'guthrum', state: 'rout', to: { x: 1250, y: 120 }, speed: 30, strengthTo: 40, over: 6 }, { id: 'vbows', state: 'rout', to: { x: 1200, y: 100 }, speed: 30 }, { id: 'alfred', to: { x: 1200, y: 600 }, speed: 18, state: 'attack' }, { id: 'somerset', to: { x: 850, y: 620 }, speed: 18, state: 'attack' }, { id: 'wiltshire', to: { x: 1550, y: 620 }, speed: 18, state: 'attack' } ] },
    { t: 88, title: 'Pursuit to the stronghold', tag: 'disputed', focus: { x: 1200, y: 300 },
      text: 'Alfred pursues the survivors to their stronghold and takes the animals and men he finds outside it.',
      explain: 'The Chronicle says only “the fortress”. It is usually taken to be Chippenham, but some historians argue for a hill fort near the battlefield.',
      cite: 'Anglo-Saxon Chronicle, 878; Asser ch. 56', orders: [ { id: 'alfred', to: { x: 1200, y: 330 }, speed: 20 }, { id: 'somerset', to: { x: 950, y: 360 }, speed: 20 }, { id: 'wiltshire', to: { x: 1450, y: 360 }, speed: 20 }, { id: 'hampshire', to: { x: 1200, y: 520 }, speed: 20 } ] },
    { t: 104, title: 'The siege', tag: 'account', focus: { x: 1200, y: 300 },
      text: 'For fourteen days the West Saxons besiege the stronghold. Hungry, cold and afraid, the Vikings ask for peace.',
      explain: 'The Vikings gave Alfred hostages and swore oaths, and promised to leave his kingdom. Unusually, they gave hostages without taking any in return.',
      cite: 'Anglo-Saxon Chronicle, 878; Asser ch. 56', orders: [] },
    { t: 118, title: 'Peace and baptism', tag: 'established', focus: { x: 1200, y: 900 }, zoom: 'fit', end: true,
      text: 'Three weeks later Guthrum and thirty of his chief men came to Alfred and were baptised, with Alfred as Guthrum’s godfather.',
      explain: 'Guthrum took the Christian name Æthelstan. His army left Wessex and settled in East Anglia, which he ruled as king until his death about 890.',
      cite: 'Anglo-Saxon Chronicle, 878 and 880; Asser ch. 56', orders: [] }
  ],

  ai: {
    plans: {
      /* The player leads the West Saxons: the Vikings hold the high ground, shoot, then counter-attack. */
      viking: [
        { t: 0, orders: [ { id: 'vleft', to: { x: 850, y: 720 }, speed: 12 }, { id: 'guthrum', to: { x: 1200, y: 720 }, speed: 12 }, { id: 'vright', to: { x: 1550, y: 720 }, speed: 12 }, { id: 'vbows', to: { x: 1200, y: 860 }, speed: 12 } ] },
        { t: 90, orders: [ { id: 'guthrum', to: { x: 1200, y: 1100 }, speed: 14, state: 'attack', hunt: true }, { id: 'vleft', to: { x: 850, y: 1100 }, speed: 14, state: 'attack', hunt: true }, { id: 'vright', to: { x: 1550, y: 1100 }, speed: 14, state: 'attack', hunt: true } ],
          caption: { title: 'The Vikings come down the hill', text: 'Guthrum’s shield wall is advancing on your line.', tag: 'reconstruction' } }
      ],
      /* The player leads the Vikings: the West Saxons march up and attack. */
      saxon: [
        { t: 0, orders: [ { id: 'alfred', to: { x: 1200, y: 1250 }, speed: 18 }, { id: 'somerset', to: { x: 850, y: 1250 }, speed: 18 }, { id: 'wiltshire', to: { x: 1550, y: 1250 }, speed: 18 }, { id: 'hampshire', to: { x: 1200, y: 1430 }, speed: 18 }, { id: 'saxbows', to: { x: 1200, y: 1130 }, speed: 18 } ] },
        { t: 45, orders: [ { id: 'alfred', to: { x: 1200, y: 760 }, speed: 15, state: 'attack', hunt: true }, { id: 'somerset', to: { x: 850, y: 760 }, speed: 15, state: 'attack', hunt: true }, { id: 'wiltshire', to: { x: 1550, y: 760 }, speed: 15, state: 'attack', hunt: true } ],
          caption: { title: 'Alfred attacks', text: 'The West Saxon shield wall is coming up the slope.', tag: 'reconstruction' } }
      ]
    },
    huntRange: 700, holdPoint: { x: 1200, y: 900 }, spotRange: 420
  },

  commandLines: {
    saxon: 'You command the West Saxons. Hold your shield wall together, wear the Viking line down, and break it.',
    viking: 'You command the Viking Great Army. Alfred’s army has come out of the marshes. Hold your line on the high ground and break theirs.'
  },

  /* Spoken before the first intro slide (clip audio/<voice>/welcome.mp3; skipped until it is recorded). */
  welcome: 'Welcome to Battles of History. Today we are learning about the Battle of Edington, which happened in May 878, between the West Saxons of Alfred the Great and the Viking Great Army of Guthrum.',
  /* Establishing pictures, between the globe and the battle map (see showEstablishing in engine.js). */
  establishing: [
    { file: 'establish-1-wiltshire.jpg', secs: 5, credit: 'Artist rendering: the Wiltshire downs, 878. Battle Games, AI-generated. The exact site of the battle is not known.' },
    { file: 'establish-2-overview.jpg', secs: 6, pulse: { x: .56, y: .547 }, credit: 'Artist rendering: Bratton Camp, Edington and the Wiltshire downs, with the battlefield shown. Battle Games, AI-generated. The exact site is not known.' }
  ],
  imageBase: 'images/',
  audioBase: 'audio/',
  voices: [ { id: 'clear', name: 'Narrator 1 · clear', speaker: 25 } ],

  debrief: {
    saxon: {
      victory:   { title: 'West Saxon victory', text: 'Your shield wall held and the Viking line broke. The sources describe the same result.' },
      defeat:    { title: 'West Saxon defeat', text: 'The West Saxon line broke. Without Edington, Wessex might have gone the way of the other English kingdoms.' },
      stalemate: { title: 'Stalemate', text: 'Night falls with both shield walls still standing.' }
    },
    viking: {
      victory:   { title: 'Viking victory', text: 'You broke Alfred’s army. Historically the opposite happened, and Wessex survived.' },
      defeat:    { title: 'Viking defeat', text: 'Your line broke, as Guthrum’s did. The sources describe the same result.' },
      stalemate: { title: 'Stalemate', text: 'Night falls with both shield walls still standing.' }
    }
  },

  outcome: [
    { text: 'Alfred’s army broke the Viking Great Army at Ethandun and besieged the survivors until they made peace.', tag: 'established' },
    { text: 'Guthrum was baptised with Alfred as his godfather, and his army left Wessex for East Anglia.', tag: 'established' },
    { text: 'Wessex survived, and Alfred’s kingdom became the core of the later kingdom of England.', tag: 'established' },
    { text: 'The size of the armies, the number of dead and the exact place of the battle are not known.', tag: 'estimate' }
  ],

  units: [
    { side: 'saxon', type: 'infantry', name: 'West Saxon fyrd', portrait: 'saxon-fyrd', desc: 'Free men of the shires, called out to fight for the king.', tag: 'established', photos: [],
      lines: [
        { text: 'The army was raised shire by shire. At Egbert’s Stone the men of Somerset, Wiltshire and part of Hampshire came to the king.', tag: 'account', cite: 'Anglo-Saxon Chronicle, 878' },
        { text: 'Most carried a spear, a round wooden shield and a long knife called a seax.', tag: 'established' }
      ] },
    { side: 'saxon', type: 'infantry', name: 'King’s thegns', portrait: 'saxon-thegn', desc: 'Alfred’s noble warriors, with mail, helmets and swords.', tag: 'established', photos: [],
      lines: [
        { text: 'Thegns were the king’s landholding warriors. They could afford mail shirts, helmets and swords, and stood in the front of the line.', tag: 'established' },
        { text: 'They rode to war but fought on foot, like the rest of the army.', tag: 'established' }
      ] },
    { side: 'viking', type: 'infantry', name: 'Viking warriors', portrait: 'viking-warrior', desc: 'Veterans of the Great Army, which had fought in England for thirteen years.', tag: 'established', photos: [],
      lines: [
        { text: 'The Great Army landed in East Anglia in 865 and had campaigned across England ever since.', tag: 'established' },
        { text: 'Their weapons were much like the English ones: spear, shield, axe and, for the richer men, sword and mail. They did not wear horned helmets.', tag: 'established' }
      ] },
    { side: 'viking', type: 'infantry', name: 'Guthrum', portrait: 'viking-guthrum', desc: 'Leader of the Viking army in Wessex, later King of East Anglia.', tag: 'established', photos: [],
      lines: [
        { text: 'Guthrum came to England with the second wave of the Great Army in 871 and led its attack on Wessex.', tag: 'established' },
        { text: 'After Edington he was baptised as Æthelstan and ruled East Anglia until about 890. A treaty with Alfred set the border between them.', tag: 'established' }
      ] }
  ],

  citations: {
    established: { title: 'Established', intro: 'Accepted by historians because the sources and the later course of events agree.', items: [
      { ref: 'Anglo-Saxon Chronicle, annals for 878 and 880', note: 'The year-by-year record kept in Alfred’s reign.' },
      { ref: 'Asser, Life of King Alfred, chapters 52–56', note: 'Written in 893 by a Welsh monk at Alfred’s court.' },
      { ref: 'R. Abels, Alfred the Great (1998)', note: 'A standard modern study.' }
    ] },
    account: { title: 'Chronicle', intro: 'From the Anglo-Saxon Chronicle or Asser. Both were written close to the events, and both at Alfred’s court.', items: [
      { ref: 'Anglo-Saxon Chronicle, 878', note: 'Chippenham, Athelney, Egbert’s Stone, Iley, Ethandun, the siege and the baptism.' },
      { ref: 'Asser, ch. 56', note: 'The dense shield wall (densa testudine) and the fourteen-day siege.' }
    ] },
    disputed: { title: 'Disputed', intro: 'The sources or the scholars disagree.', items: [
      { ref: 'The site of Ethandun', note: 'Usually Edington, Wiltshire; other places have been proposed.' },
      { ref: 'The stronghold', note: 'Usually Chippenham; some argue for a hill fort near the battlefield.' },
      { ref: 'The burning of the cakes', note: 'First told about a century after Alfred; probably a legend.' }
    ] },
    estimate: { title: 'Estimate', intro: 'Modern guesses, not recorded figures.', items: [
      { ref: 'Army sizes', note: 'No source gives them. Modern guesses run to a few thousand on each side.' }
    ] },
    reconstruction: { title: 'Reconstruction', intro: 'Choices made for this game.', items: [
      { ref: 'The map', note: 'Schematic downland; the field is not known.' },
      { ref: 'The fighting', note: 'The sources describe only the shield wall, a long fight and the flight. Missiles and the order of events on the field are reconstructions.' }
    ] }
  },

  library: [
    { title: 'Asser’s Life of King Alfred', author: 'Asser, translated by A. S. Cook', year: '893; translation 1906', kind: 'Near-contemporary life', about: 'Written by a Welsh monk who knew Alfred. Chapters 52–56 tell of Chippenham, Athelney and Ethandun.', citedIn: 'Most chapters', rights: 'Old translation, public domain.', local: null, gutenberg: 'https://www.gutenberg.org/ebooks/search/?query=Asser+Life+of+King+Alfred', archive: 'https://archive.org/search?query=Asser+Life+of+King+Alfred' },
    { title: 'The Anglo-Saxon Chronicle', author: 'translated by J. Ingram (1823)', year: '9th century; translation 1823', kind: 'Chronicle', about: 'The year-by-year record of the English kingdoms. The annal for 878 is the main account of the campaign.', citedIn: 'Most chapters', rights: 'Old translation, public domain.', local: null, gutenberg: 'https://www.gutenberg.org/ebooks/657', archive: 'https://archive.org/search?query=Anglo-Saxon+Chronicle+Ingram' }
  ],

  sources: [
    { title: 'Anglo-Saxon Chronicle, 878', note: 'The main account.' },
    { title: 'Asser, Life of King Alfred', note: 'Near-contemporary, written at Alfred’s court.' },
    { title: 'Modern studies', note: 'Abels, Alfred the Great (1998); Smyth, King Alfred the Great (1995).' }
  ]
};
