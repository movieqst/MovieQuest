/*
  Historical Scenario File — Battle of Gaugamela, 1 October 331 BCE
  -----------------------------------------------------------------
  This single file drives BOTH experiences of the battle:
    • Watch mode  — the narrated reenactment (orders in `events`)
    • Command mode — the playable battle (the computer's plans in `ai.plans`)

  Every statement about history carries a confidence tag:
    established    — generally accepted by historians
    ancient        — from the ancient literary accounts (Arrian, Diodorus, Curtius): late, sometimes contradictory
    babylonian     — from a near-contemporary Babylonian astronomical diary; how it is read is disputed
    disputed       — the sources or the scholars disagree
    estimate       — a modern scholarly estimate, not a recorded figure
    reconstruction — our own choice to make the battle playable (positions, timings, map scale)

  The site of the battle is not known, so the map is a schematic plain with no place names. Troop
  positions and timings are reconstructions. Army totals are not used as headcounts: the figures are
  game balance points (`power`), and the historical numbers are shown only as the sources give them.

  Map coordinates are in "world pixels". North is up. The Macedonians are at the south edge facing
  north; the Persians at the north edge facing south. Alexander's right is to the east.
*/
window.GAUGAMELA_SCENARIO = {
  id: 'gaugamela',
  title: 'Battle of Gaugamela',
  date: '1 October 331 BCE',
  place: 'Northern Mesopotamia (site uncertain)',
  tagline: 'Alexander III of Macedon vs. Darius III of Persia',
  duration: 84,           // seconds of reenactment at 1x speed
  /* Title card shown over the turning globe before the dive */
  titleCard: {
    title: 'BATTLE OF GAUGAMELA',
    date: '1 October 331 BCE',
    dateNote: 'The date is secure: it is tied to Babylonian chronology. Alexander had beaten Darius at Issus in 333 BCE and had taken Egypt.',
    dateRef: 'Badian, “Gaugamela”, Encyclopaedia Iranica; Lendering, Livius',
    place: 'Northern Mesopotamia, site not known',
    sides: 'Alexander III of Macedon  ·  Darius III of Persia'
  },
  commandDuration: 240,   // seconds before a command-mode battle is called a stalemate
  commandFocus: { x: 1200, y: 900 },
  world: { w: 2400, h: 1800 },

  confidence: {
    established:    { label: 'Established',     color: '#5fcf8a', desc: 'Generally accepted by historians.' },
    ancient:        { label: 'Ancient account', color: '#e9c77a', desc: 'From the ancient literary sources: Arrian, Diodorus and Curtius, written centuries later and not eyewitness reports.' },
    babylonian:     { label: 'Babylonian diary', color: '#9fc8ff', desc: 'From a near-contemporary Babylonian astronomical diary. How its wording should be read is disputed.' },
    disputed:       { label: 'Disputed',        color: '#ffb3a7', desc: 'The sources or the scholars disagree about this.' },
    estimate:       { label: 'Estimate',        color: '#7fb8ff', desc: 'A modern scholarly estimate, not a recorded figure.' },
    reconstruction: { label: 'Reconstruction',  color: '#c9a0ff', desc: 'Our own choice to make the battle playable: positions, timings and map scale.' }
  },

  sides: {
    macedon: { name: 'Macedon', color: '#3985d7', light: '#c5e2ff', rally: { x: 1200, y: 1700 } },
    persia:  { name: 'Persia',  color: '#d44c3e', light: '#ffd0bd', rally: { x: 1200, y: 110 } }
  },

  /* A schematic plain: no river, road, city or camp is placed, because no source fixes them. */
  battlefield: {
    scale: { px: 60, label: 'schematic, not to scale' },
    river: [], tributary: [], fords: [], bridge: null, city: null, camp: null, road: [],
    forests: [], hills: [], fields: [],
    labels: [
      { x: 1200, y: 1790, text: 'Schematic: the site of the battle is not known', small: true },
      { x: 1200, y: 40,   text: 'Persian front', small: true },
      { x: 1200, y: 1730, text: 'Macedonian front', small: true }
    ]
  },

  /* ---------- Opening narration (the map stays visible behind it) ---------- */
  intro: [
    {
      title: 'BATTLE OF GAUGAMELA',
      media: [
        { at: 0, file: '01-alexander-mosaic.jpg', caption: 'The Alexander Mosaic: Alexander charges at Darius, who turns to flee in his chariot. A Roman floor mosaic of about 100 BCE, probably copied from a Greek painting made within a generation of Alexander. Whether it shows Issus or Gaugamela is debated.', ref: 'House of the Faun, Pompeii; Museo Archeologico Nazionale, Naples', credit: 'Photo: Lucas (ancientartpodcast.org), Wikimedia Commons, CC BY-SA 2.0' },
        { at: 13, file: '02-mosaic-darius.jpg', caption: 'Darius III in his chariot, detail of the Alexander Mosaic. The Greek writers say he fled the field; the Babylonian diary may tell it differently.', ref: 'Museo Archeologico Nazionale, Naples', credit: 'Photo: Berthold Werner, Wikimedia Commons, CC BY-SA 3.0' }
      ],
      subtitle: '1 October 331 BCE · northern Mesopotamia',
      focus: { x: 1200, y: 900 }, zoom: 'fit',
      markers: [],
      auto: 14,
      lines: [
        { text: 'Alexander III of Macedon and Darius III of Persia met on an open plain in northern Mesopotamia. It was the decisive battle of Alexander’s conquest of the Persian empire.', tag: 'established' },
        { text: 'This introduction separates what the ancient accounts say from what historians have reconstructed. Watch for the coloured tags.', tag: 'reconstruction' }
      ]
    },
    {
      title: 'Two kings, one empire',
      media: [
        { at: 0, file: '03-mosaic-alexander.jpg', caption: 'Alexander bareheaded on his horse Bucephalus, detail of the Alexander Mosaic.', ref: 'Museo Archeologico Nazionale, Naples', credit: 'Wikimedia Commons (Alexander_the_Great_mosaic.jpg), public domain' },
        { at: 8, file: '04-alexander-coin.jpg', caption: 'Silver tetradrachm struck by Lysimachus, one of Alexander’s generals, after Alexander’s death. The portrait shows Alexander with the ram’s horns of the god Ammon.', ref: 'Silver tetradrachm, Lampsakos mint, about 297–282 BCE', credit: 'Photo: Classical Numismatic Group, Wikimedia Commons, CC BY-SA 3.0' },
        { at: 15, file: '05-persian-daric.jpg', caption: 'A gold daric, the coin of the Persian kings. It shows the king as an archer. Persian kings minted them from about 500 BCE until Alexander’s conquest.', ref: 'Achaemenid gold daric, 5th century BCE', credit: 'Photo: Deflim, Wikimedia Commons, public domain' },
        { at: 22, file: '06-persian-empire-map.jpg', caption: 'The Persian empire of the Achaemenid kings at its greatest extent, under Darius I about 500 BCE. Darius III still ruled most of it when Alexander invaded. A modern map.', ref: 'Modern map; satrapies after Encyclopaedia Iranica', credit: 'Map: Cattette, Wikimedia Commons, CC BY-SA 4.0' }
      ],
      focus: { x: 1200, y: 900 }, zoom: 'fit',
      markers: [],
      auto: 18,
      lines: [
        { text: 'Alexander had beaten Darius at Issus in 333 BCE, taken the Levant and Egypt, and crossed the Euphrates. Darius had gathered an army from across the empire to stop him.', tag: 'established' },
        { text: 'Darius chose the ground. He had the plain levelled, so that his cavalry and scythed chariots could work at full speed.', tag: 'ancient', cite: 'Arrian, Anabasis III.8–11; Iranica, Badian' },
        { text: 'The site itself is not known. The ancient accounts do not fix it, and modern scholars still disagree about where it lay.', tag: 'disputed', cite: 'Iranica, Badian: the site is not established; Lendering, Livius' }
      ]
    },
    {
      title: 'The Macedonian army',
      media: [
        { at: 0, file: '07-alexander-sarcophagus.jpg', caption: 'Macedonians and Persians in battle on the Alexander Sarcophagus, carved in the late 4th century BCE, within a few decades of Gaugamela.', ref: 'Royal necropolis of Sidon; Istanbul Archaeology Museums', credit: 'Photo: Dosseman, Wikimedia Commons, CC BY-SA 4.0' },
        { at: 11, file: '08-sarcophagus-alexander.jpg', caption: 'ARTIST RENDERING. Alexander as the horseman in a lion-skin helmet, after the Alexander Sarcophagus. Not a photograph: the face, colours and details are imagined.', ref: 'After the Alexander Sarcophagus, Istanbul Archaeology Museums', credit: 'Artist rendering: Battle Games, AI-generated' },
        { at: 22, file: '09-kinch-tomb.jpg', caption: 'The Kinch Tomb at Lefkadia, a Macedonian tomb of about 300 BCE. Inside it was a painting of a Macedonian horseman attacking a Persian foot soldier. The painting is now lost; it survives only in the drawing made when the tomb was first published in 1897.', ref: 'Kinch Tomb, Lefkadia (ancient Mieza), Macedonia', credit: 'Photo: Carole Raddato, Wikimedia Commons, CC BY-SA 2.0' }
      ],
      focus: { x: 1200, y: 1250 }, zoom: .9,
      markers: [],
      auto: 18,
      lines: [
        { text: 'The Macedonians were about 40,000 foot and 7,000 horse. These are common modern estimates; no ancient source gives a reliable count.', tag: 'estimate', cite: 'Iranica, Badian; World History Encyclopedia' },
        { text: 'The phalanx of pezhetairoi, with their long sarissa pikes, formed the centre. Alexander commanded the right, with the Companion cavalry and the hypaspists beside him. Parmenion held the left with the Thessalian horse.', tag: 'ancient', cite: 'Arrian III.11' },
        { text: 'Light troops and javelinmen screened the army and filled the gaps between units. They were the answer to the scythed chariots.', tag: 'ancient', cite: 'Arrian III.13' }
      ]
    },
    {
      title: 'The Persian army',
      media: [
        { at: 0, file: '10-persepolis-guards.jpg', caption: 'Palace guards with spears, carved along the stairway of the Apadana, the great audience hall at Persepolis.', ref: 'Persepolis, Iran, 5th century BCE', credit: 'Photo: Diego Delso, delso.photo, License CC BY-SA' },
        { at: 12, file: '11-susa-archers.jpg', caption: 'Frieze of archers in glazed brick from the palace of Darius I at Susa. Royal guardsmen of the Persian kings.', ref: 'Susa, about 510 BCE; Musée du Louvre, Paris, AOD 487', credit: 'Photo: Jastrow, Wikimedia Commons, public domain' },
        { at: 24, file: '12-apadana-delegations.jpg', caption: 'Delegations of the subject peoples, with a camel and a bull, bring gifts to the king. Relief from Persepolis. Darius’s army at Gaugamela was drawn from peoples like these, from across the empire.', ref: 'Persepolis, Iran, 5th century BCE', credit: 'Photo: Diego Delso, delso.photo, License CC BY-SA' }
      ],
      focus: { x: 1200, y: 480 }, zoom: .9,
      markers: [],
      auto: 18,
      lines: [
        { text: 'Arrian gives the Persian army a million infantry and 40,000 cavalry. Historians reject these figures as exaggerated. Darius almost certainly had far more cavalry than Alexander.', tag: 'ancient', cite: 'Arrian III.8; Iranica, Badian: the source numbers are not reliable' },
        { text: 'Arrian reports 200 scythed chariots and about 15 elephants. The chariots are well attested; the elephants were not shown fighting in any account we can rely on.', tag: 'ancient', cite: 'Arrian III.8; World History Encyclopedia' },
        { text: 'Persian cavalry from Bactria and Saka lands stood on Darius’s left, opposite Alexander. Armenian and Cappadocian horse were on his right, opposite Parmenion.', tag: 'ancient', cite: 'Arrian III.11; the attributions of commanders are not certain' }
      ]
    },
    {
      title: 'The sources',
      media: [
        { at: 0, file: '13-ptolemy-coin.jpg', caption: 'A silver coin struck in Alexandria under Ptolemy I, showing Alexander in an elephant-scalp headdress. Ptolemy fought with Alexander and later wrote a history of his campaigns. Arrian used it; it is now lost.', ref: 'Tetradrachm, Alexandria, between 305 and 282 BCE; Bibliothèque nationale de France, FG M2157', credit: 'Photo: Marie-Lan Nguyen, Wikimedia Commons, CC BY 2.5' },
        { at: 16, file: '14-babylonian-diary.jpg', caption: 'A Babylonian astronomical diary: a clay tablet of nightly notes on the sky, the weather and the markets, with the news of the day. This one, for 323–322 BCE, records the death of Alexander. The diary for 331 BCE, which records Gaugamela, is a tablet of the same kind.', ref: 'Clay tablet; British Museum, BM 45962', credit: 'Photo: Shaunnol, Wikimedia Commons, public domain' }
      ],
      focus: { x: 1200, y: 900 }, zoom: 'fit',
      markers: [],
      auto: 18,
      lines: [
        { text: 'Our main account is Arrian, writing about four centuries after the battle. He drew on lost histories, including those of Ptolemy and Aristobulus, who were with Alexander.', tag: 'ancient', cite: 'Arrian, Anabasis III.7–16' },
        { text: 'Diodorus and Curtius tell the battle differently, and sometimes more dramatically. Where they disagree with Arrian, this game says so.', tag: 'ancient', cite: 'Diodorus XVII.53–61; Curtius IV.9–16' },
        { text: 'A Babylonian astronomical diary records the battle as a Mesopotamian scribe saw it. It is the nearest thing to a contemporary record. Its wording is disputed: it may say that the king’s soldiers left him, or that the king left his soldiers.', tag: 'babylonian', cite: 'Sachs & Hunger (1988), No. −651; van der Spek (2003) and Rollinger & Ruffing read it differently' }
      ]
    },
    {
      title: 'How to read this reenactment',
      media: [
        { at: 0, file: '15-le-brun-arbela.jpg', caption: 'The Battle of Arbela, a Gobelins tapestry woven to a design by Charles Le Brun for Louis XIV: one artist’s imagination of the battle, two thousand years later. Like this map, every picture of the battle is a reconstruction.', ref: 'Tapestry after Charles Le Brun, designed between 1660 and 1672', credit: 'Wikimedia Commons, public domain' }
      ],
      focus: { x: 1200, y: 900 }, zoom: 'fit',
      markers: [],
      auto: 16,
      lines: [
        { text: 'Positions, timings and movements on this map are a reconstruction. The ancient accounts tell a story, not a battlefield record. The map has no real place names.', tag: 'reconstruction' },
        { text: 'The camera follows the action. Drag the map, use the arrow keys, or click the minimap to look around; press Follow to return. Press “Explain this moment” at any point.', tag: 'reconstruction' }
      ]
    },
    {
      title: 'The armies are drawn up. What happens next?',
      focus: { x: 1200, y: 900 }, zoom: 'fit',
      markers: [],
      choice: true,
      lines: [
        { text: 'The story continues on the plain. Choose how to see it.', tag: 'established' },
        { text: 'Watch the reenactment: the battle in seven narrated chapters, from the deployment to the aftermath, then a debrief on what the sources say.', tag: 'established' },
        { text: 'Take command: lead one of the armies from the deployment and see whether you can change the outcome. The debrief then compares your battle with history.', tag: 'reconstruction' }
      ]
    }
  ],

  /* ---------- Formations (shared by both modes) ----------
     `power` is a game balance value, not a count of men. `count` is the source's description, shown as given. */
  formations: [
    // Macedonians, south edge, facing north. From the west: Parmenion's left, the centre, Alexander's right.
    { id: 'thess',   side: 'macedon', name: 'Thessalian cavalry (Parmenion)', division: 'Parmenion', type: 'cavalry', cols: 6, rows: 2, power: 1.0, x: 560,  y: 1260,
      count: 'Part of the Macedonian horse (estimate c. 7,000 in all)', confidence: 'ancient',
      note: 'Parmenion’s left wing bore the heaviest pressure from the Persian right, according to Arrian.' },
    { id: 'agri',    side: 'macedon', name: 'Agrianian javelinmen', division: 'Light troops', type: 'archers', cols: 4, rows: 3, power: 0.8, x: 880, y: 1230,
      count: 'Light infantry screen', confidence: 'ancient',
      note: 'Light troops helped to blunt the chariot charge, according to Arrian.' },
    { id: 'phal',    side: 'macedon', name: 'Phalanx (pezhetairoi)', division: 'Centre', type: 'infantry', cols: 10, rows: 5, power: 1.3, x: 1080, y: 1300,
      count: 'Part of the c. 40,000 foot (estimate)', confidence: 'established',
      note: 'The phalanx with its long sarissa pikes formed the centre. Strong to the front, vulnerable on the flanks.' },
    { id: 'hyp',     side: 'macedon', name: 'Hypaspists', division: 'Right', type: 'infantry', cols: 4, rows: 3, power: 1.0, x: 1420, y: 1250,
      count: 'Elite infantry', confidence: 'ancient',
      note: 'The hypaspists linked the phalanx to the cavalry on the right. Their exact role in the battle is debated.' },
    { id: 'comp',    side: 'macedon', name: 'Companion cavalry (Alexander)', division: 'Right', type: 'cavalry', cols: 4, rows: 2, power: 1.4, x: 1700, y: 1230,
      count: 'Elite horse, part of the c. 7,000 (estimate)', confidence: 'established',
      note: 'Alexander led the Companions on the right. Their charge decided the battle on the Persian left-centre, according to the Greek accounts.' },
    { id: 'reserve', side: 'macedon', name: 'Second line (refused flank)', division: 'Reserve', type: 'infantry', cols: 6, rows: 2, power: 0.9, x: 1150, y: 1480,
      count: 'Reserve line', confidence: 'ancient',
      note: 'Arrian describes a second line to counter an envelopment. Its exact placement is a reconstruction.' },

    // Persians, north edge, facing south. Persian left (Alexander’s side) is to the east.
    { id: 'bact',    side: 'persia', name: 'Bactrian and Saka cavalry (Bessus)', division: 'Left', type: 'cavalry', cols: 6, rows: 2, power: 1.1, x: 1900, y: 560,
      count: 'Persian left wing', confidence: 'ancient',
      note: 'Bessus commanded the Persian left opposite Alexander, according to Arrian. The command attribution is not certain.' },
    { id: 'pcav',    side: 'persia', name: 'Armenian and Cappadocian cavalry', division: 'Right', type: 'cavalry', cols: 6, rows: 2, power: 1.0, x: 500, y: 560, hidden: true,
      count: 'Persian right wing (reported)', confidence: 'ancient',
      note: 'Opposite Parmenion. Hidden at first: the dust of the advance limited what could be seen, a point the sources stress.' },
    { id: 'chariot-1', side: 'persia', name: 'Scythed chariots (1)', division: 'Forward', type: 'chariot', cols: 2, rows: 1, power: 1.0, x: 980,  y: 820, hunter: true,
      count: 'Arrian reports 200 scythed chariots in total', confidence: 'ancient',
      note: 'The scythed chariots were sent against the Macedonian front. Their exact routes are not known.' },
    { id: 'chariot-2', side: 'persia', name: 'Scythed chariots (2)', division: 'Forward', type: 'chariot', cols: 2, rows: 1, power: 1.0, x: 1140, y: 820, hunter: true,
      count: 'Part of the 200', confidence: 'ancient', note: 'Part of the forward chariot line.' },
    { id: 'chariot-3', side: 'persia', name: 'Scythed chariots (3)', division: 'Forward', type: 'chariot', cols: 2, rows: 1, power: 1.0, x: 1300, y: 820, hunter: true,
      count: 'Part of the 200', confidence: 'ancient', note: 'Part of the forward chariot line.' },
    { id: 'chariot-4', side: 'persia', name: 'Scythed chariots (4)', division: 'Forward', type: 'chariot', cols: 2, rows: 1, power: 1.0, x: 1460, y: 820, hunter: true,
      count: 'Part of the 200', confidence: 'ancient', note: 'Part of the forward chariot line.' },
    { id: 'chariot-5', side: 'persia', name: 'Scythed chariots (5)', division: 'Forward', type: 'chariot', cols: 2, rows: 1, power: 1.0, x: 1620, y: 820, hunter: true,
      count: 'Part of the 200', confidence: 'ancient', note: 'Part of the forward chariot line.' },
    { id: 'pinf',    side: 'persia', name: 'Persian infantry (centre)', division: 'Centre', type: 'infantry', cols: 8, rows: 4, power: 1.0, x: 1020, y: 470,
      count: 'Persian centre (no reliable total)', confidence: 'ancient',
      note: 'The mixed royal and subject infantry of the centre.' },
    { id: 'merc',    side: 'persia', name: 'Greek mercenaries (reported)', division: 'Centre', type: 'infantry', cols: 4, rows: 3, power: 1.1, x: 1330, y: 470,
      count: 'Reported near the centre', confidence: 'ancient',
      note: 'Arrian and other sources report Greek mercenaries with Darius. Their number is not known.' },
    { id: 'darius',  side: 'persia', name: 'Darius and the royal guard', division: 'Centre', type: 'infantry', cols: 5, rows: 2, power: 1.2, x: 1180, y: 330,
      count: 'The king’s guard', confidence: 'established',
      note: 'Darius stood in the centre. Whether he fled first, or was abandoned by his army, is disputed.' }
  ],

  /* ---------- Watch mode: the historical sequence, in order ---------- */
  events: [
    { t: 0, title: 'Deployment', tag: 'ancient', focus: { x: 1200, y: 1120 }, zoom: 'fit',
      text: 'Darius spreads his army across the plain: his cavalry is out on both wings, the chariots stand in front of the centre, and the royal guard is behind them. Alexander has the phalanx in the centre, the Companions on the right and Parmenion on the left.',
      explain: 'Why deploy like this? Darius had the ground levelled for his cavalry and chariots, and his wings were longer than Alexander’s line. Arrian describes the deployment; the exact frontage is not known.',
      cite: 'Arrian III.8–11',
      orders: [] },
    { t: 12, title: 'The oblique advance', tag: 'ancient', focus: { x: 1550, y: 900 },
      text: 'Alexander moves his right wing obliquely to the right, away from the centre. The Persian left must follow or leave the Macedonian right free to attack the flank.',
      explain: 'The oblique move is Arrian’s account of how Alexander drew the Persian cavalry away from the centre and out of position. Its exact path is a reconstruction.',
      cite: 'Arrian III.11',
      orders: [
        { id: 'comp', to: { x: 1950, y: 1120 }, speed: 22 }, { id: 'hyp', to: { x: 1740, y: 1140 }, speed: 18 },
        { id: 'bact', to: { x: 1990, y: 640 }, speed: 22 }
      ] },
    { t: 26, title: 'The scythed chariots charge', tag: 'ancient', focus: { x: 1200, y: 980 },
      text: 'The Persian scythed chariots charge the Macedonian front. The light troops screen the gaps in the ranks and turn the chariots aside.',
      explain: 'Arrian says the chariots were blunted by light troops who opened the ranks to let them through. The number that reached the line, and the losses they suffered, are not known.',
      cite: 'Arrian III.13',
      orders: [
        { id: 'chariot-1', to: { x: 980, y: 1050 }, speed: 60 }, { id: 'chariot-2', to: { x: 1140, y: 1050 }, speed: 60 },
        { id: 'chariot-3', to: { x: 1300, y: 1050 }, speed: 60 }, { id: 'chariot-4', to: { x: 1460, y: 1050 }, speed: 60 },
        { id: 'chariot-5', to: { x: 1620, y: 1050 }, speed: 60 },
        { id: 'agri', state: 'hold' }
      ] },
    { t: 39, title: 'Alexander strikes', tag: 'reconstruction', focus: { x: 1350, y: 620 },
      text: 'Alexander leads the Companions forward into a gap in the Persian line, toward the centre where Darius stands.',
      explain: 'The Greek accounts describe a wedge toward Darius. The exact shape of the gap and the route of the charge are interpretations, not a record.',
      cite: 'Arrian III.14; the route is a reconstruction',
      orders: [
        { id: 'comp', via: [{ x: 1880, y: 900 }], to: { x: 1330, y: 560 }, speed: 36 }, { id: 'hyp', via: [{ x: 1770, y: 980 }], to: { x: 1320, y: 700 }, speed: 22 },
        // both go round the east end of the chariot line, not through it
        { id: 'darius', state: 'hold' }
      ] },
    { t: 55, title: 'The Persian centre breaks', tag: 'disputed', focus: { x: 1180, y: 380 },
      text: 'The Persian centre gives way. Darius withdraws from the field. The Persian line breaks behind him.',
      explain: 'The sources disagree about who went first. Greek writers have Darius flee before his army. A Babylonian diary may say his soldiers abandoned him. Both can be read in more than one way.',
      cite: 'Arrian III.14–15; Babylonian Astronomical Diary, No. −651; Curtius IV.16',
      orders: [
        { id: 'darius', to: { x: 1180, y: 150 }, speed: 25, state: 'move' },
        { id: 'pinf', state: 'rout', to: { x: 1000, y: 120 }, speed: 36, spread: 2.2, strengthTo: 25, over: 6 },
        { id: 'merc', state: 'hold' }
      ] },
    { t: 69, title: 'Parmenion under pressure', tag: 'disputed', focus: { x: 900, y: 1100 },
      text: 'The Persian right cavalry presses Parmenion’s left hard. Some accounts say Alexander turned back to help him. Others say he did not, or that the message never reached him.',
      explain: 'Whether Alexander turned back, and when, is one of the most disputed points of the battle. Arrian says he went to help Parmenion; other sources give a different order of events.',
      cite: 'Arrian III.15; Iranica, Badian: contested',
      orders: [
        { id: 'pcav', visible: true, to: { x: 640, y: 1150 }, speed: 22, state: 'attack' },
        { id: 'thess', state: 'hold' },
        { id: 'comp', to: { x: 1000, y: 820 }, speed: 22 }
      ] },
    { t: 80, title: 'The aftermath', tag: 'established', focus: { x: 1200, y: 900 }, end: true,
      text: 'The Persian army withdraws. Darius escapes and the Macedonians hold the field. The result is not in doubt, though the sources disagree about the rest.',
      explain: 'The battle decided who would rule the Persian empire, but Darius lived on for almost another two years. He was murdered in 330 BCE by Bessus, one of his own commanders.',
      cite: 'Arrian III.15; Iranica, Badian; World History Encyclopedia',
      orders: [] }
  ],

  /* ---------- Command mode: the computer's plans for the side the player does not take ---------- */
  ai: {
    plans: {
      /* When the player takes Macedon, Persia is run by the computer. */
      persia: [
        { t: 0,  orders: [ { id: 'bact', to: { x: 1700, y: 520 }, speed: 22 } ] },
        { t: 20, orders: [
            { id: 'chariot-1', to: { x: 980, y: 1000 }, speed: 60, hunt: true }, { id: 'chariot-2', to: { x: 1140, y: 1000 }, speed: 60, hunt: true },
            { id: 'chariot-3', to: { x: 1300, y: 1000 }, speed: 60, hunt: true }, { id: 'chariot-4', to: { x: 1460, y: 1000 }, speed: 60, hunt: true },
            { id: 'chariot-5', to: { x: 1620, y: 1000 }, speed: 60, hunt: true }
          ],
          caption: { title: 'Persian chariots advance', text: 'The scythed chariots are moving at the Macedonian front. Keep the light troops in the gaps.', tag: 'ancient' } },
        { t: 40, orders: [ { id: 'pcav', visible: true, to: { x: 640, y: 1100 }, speed: 30 } ] }
      ],
      /* When the player takes Persia, Macedon is run by the computer and marches as Arrian describes. */
      macedon: [
        { t: 0,  orders: [ { id: 'comp', to: { x: 1950, y: 1120 }, speed: 22 }, { id: 'hyp', to: { x: 1740, y: 1140 }, speed: 18 } ] },
        { t: 30, orders: [ { id: 'phal', to: { x: 1080, y: 1200 }, speed: 12 } ],
          caption: { title: 'The Macedonian right', text: 'Alexander’s right wing moves obliquely. Its exact path is not known.', tag: 'ancient' } }
      ]
    },
    huntRange: 900,            // a hunting formation looks this far for an enemy before going back to the hold point
    holdPoint: { x: 1200, y: 800 },
    spotRange: 340             // how close a formation must come before the other side sees it
  },

  /* Captions shown when a command battle begins, by the player's side */
  commandLines: {
    macedon: 'You lead the Macedonian army. Click a formation or drag a box around several, then right-click the map for orders. The Persians are in front of you; some of their cavalry is hidden in the dust.',
    persia:  'You lead the Persian army. Click a formation or drag a box around several, then right-click the map for orders. The Macedonian right is moving toward your left wing.'
  },

  /* Recorded narration lives in audio/ (generated by make-narration.sh). Paths follow a convention:
     intro-N.mp3, event-N.mp3, explain-N.mp3, outcome.mp3, cmd-KEY.mp3. A slide or event may override with its own `audio`.
     Clips not recorded (cmd-sighted, cmd-breaks) fall back to the browser's own voice. */
  imageBase: 'images/',
  audioBase: 'audio/',
  voices: [
    { id: 'clear', name: 'Narrator 1 \u00b7 clear', speaker: 25 }
  ],

  /* What the debrief says at the end of a command battle, by the player's side and the result */
  debrief: {
    macedon: {
      victory:   { title: 'Macedonian victory', text: 'You broke the Persian army. Their chariots and cavalry were beaten and the centre gave way.' },
      defeat:    { title: 'Macedonian defeat', text: 'The Macedonian army has been scattered. The sources say the battle was close, and turned on a few decisions.' },
      stalemate: { title: 'Stalemate', text: 'Night falls with both armies still in the field. The battle was not settled in the time the sources give it.' }
    },
    persia: {
      victory:   { title: 'Persian victory', text: 'You scattered the Macedonian army. The chariots and cavalry did what Darius planned for them.' },
      defeat:    { title: 'Persian defeat', text: 'Your army has been broken. The centre gave way, as it did in 331 BCE.' },
      stalemate: { title: 'Stalemate', text: 'Night falls with both armies still in the field. The battle was not settled in the time the sources give it.' }
    }
  },

  /* What the sources say happened next (shown after a watch-mode reenactment) */
  outcome: [
    { text: 'The Persian army was beaten and Darius escaped the field. The Macedonians held the battlefield.', tag: 'established' },
    { text: 'The ancient accounts give the Persian dead as about 300,000 and the Macedonian as about 100. Historians reject these figures as unreliable.', tag: 'ancient', cite: 'Arrian III.15; Iranica, Badian; World History Encyclopedia' },
    { text: 'Greek writers have Darius flee before his army. A Babylonian diary may say his soldiers left him. The order of events is not settled.', tag: 'disputed', cite: 'Babylonian Astronomical Diary, No. −651; Curtius IV.16; van der Spek (2003); Rollinger & Ruffing' },
    { text: 'Darius was murdered by Bessus in 330 BCE, and Alexander went on to Babylon, Susa and Persepolis.', tag: 'established' }
  ],

  /* ---------- The armies panel. `photos` are file names from the intro slideshow (see images/README.md); until a file is added it shows a placeholder.
     Each side shows its first two cards; the rest open from a "more" button. ---------- */
  units: [
    { side: 'macedon', type: 'infantry', name: 'Macedonian phalanx', desc: 'Long sarissa pikes, shield and helmet. The centre of Alexander’s army.', tag: 'established',
      photos: ['07-alexander-sarcophagus.jpg'],
      lines: [
        { text: 'The pezhetairoi, the foot companions, carried the sarissa, a pike about six metres long, held in both hands. Their shield was smaller than the classic hoplite shield and hung from a strap.', tag: 'established', cite: 'Arrian III.11; Polybius XVIII.12–14 on the later sarissa' },
        { text: 'The phalanx was strong to the front and weak on its flanks. A phalanx that was pushed sideways lost its order, and the Macedonians knew it.', tag: 'estimate' },
        { text: 'In this game the phalanx holds its ground when it is attacked head-on. It is vulnerable to a flank attack.', tag: 'reconstruction' }
      ] },
    { side: 'macedon', type: 'cavalry', name: 'Companion cavalry', desc: 'Alexander’s elite horse, on the right.', tag: 'ancient',
      photos: ['03-mosaic-alexander.jpg', '08-sarcophagus-alexander.jpg'],
      lines: [
        { text: 'The Companions were the king’s own cavalry, drawn from the Macedonian nobility. Arrian says they fought with thrusting spears and swords.', tag: 'ancient', cite: 'Arrian III.11–14' },
        { text: 'Cavalry does not ride through a formed spear wall. Its charge works when the enemy line is already broken.', tag: 'estimate' }
      ] },
    { side: 'macedon', type: 'archers', name: 'Agrianian javelinmen', desc: 'Light infantry from the hills north of Macedon, armed with javelins.', tag: 'ancient',
      photos: [],
      lines: [
        { text: 'The Agrianians were a hill people from the north of Macedon. They fought as light troops with javelins and were among Alexander’s most trusted soldiers.', tag: 'ancient', cite: 'Arrian III.12' },
        { text: 'Arrian says the Agrianians and other javelin-men met the scythed chariots, threw their javelins, seized the reins and pulled the drivers down.', tag: 'ancient', cite: 'Arrian III.13' },
        { text: 'In this game the javelinmen are fast and fragile. They are best used against the chariots, not against formed infantry.', tag: 'reconstruction' }
      ] },
    { side: 'macedon', type: 'infantry', name: 'Hypaspists', desc: 'Elite foot soldiers between the phalanx and the Companion cavalry.', tag: 'ancient',
      photos: ['07-alexander-sarcophagus.jpg'],
      lines: [
        { text: 'The hypaspists, the “shield-bearers”, were the king’s elite infantry. Arrian says Nicanor, a son of Parmenion, commanded them.', tag: 'ancient', cite: 'Arrian III.11' },
        { text: 'They stood between the phalanx and the cavalry on the right, linking the slow pike line to Alexander’s fast-moving horse.', tag: 'ancient', cite: 'Arrian III.11' },
        { text: 'Their equipment is debated. Some historians think they carried a shorter spear than the phalanx, others that they were armed in the same way.', tag: 'disputed' }
      ] },
    { side: 'macedon', type: 'cavalry', name: 'Thessalian cavalry', desc: 'Horsemen from Thessaly, with Parmenion on the left wing.', tag: 'ancient',
      photos: [],
      lines: [
        { text: 'Thessaly, south of Macedon, was famous for its horses and its horsemen. Its cavalry fought on the left wing under Parmenion.', tag: 'ancient', cite: 'Arrian III.11' },
        { text: 'The left wing took the heaviest pressure from the Persian right. Arrian praises the Thessalian horse for how they fought there.', tag: 'ancient', cite: 'Arrian III.15' },
        { text: 'In this game the Thessalians must hold the left long enough for Alexander’s charge on the right to decide the battle.', tag: 'reconstruction' }
      ] },
    { side: 'persia', type: 'chariot', name: 'Scythed chariot', desc: 'A horse-drawn chariot with blades on its wheels, sent against the front.', tag: 'ancient',
      photos: ['02-mosaic-darius.jpg'],
      lines: [
        { text: 'Arrian reports 200 scythed chariots. They are well attested in the ancient sources; the numbers are not reliable.', tag: 'ancient', cite: 'Arrian III.8, III.13' },
        { text: 'The chariots needed open ground and a straight run. Light troops and gaps in the ranks were the answer.', tag: 'ancient', cite: 'Arrian III.13' }
      ] },
    { side: 'persia', type: 'cavalry', name: 'Bactrian and Saka cavalry', desc: 'Mounted lancers and archers from the eastern provinces.', tag: 'ancient',
      photos: [],
      lines: [
        { text: 'The Persian cavalry from the eastern provinces, under Bessus according to Arrian, was on the left.', tag: 'ancient', cite: 'Arrian III.11' },
        { text: 'Persian cavalry should not be shown as heavily armoured knights. The sources do not describe that, and the evidence does not support it.', tag: 'estimate' }
      ] },
    { side: 'persia', type: 'infantry', name: 'Persian infantry', desc: 'Foot soldiers from many peoples of the empire, in the centre.', tag: 'ancient',
      photos: ['10-persepolis-guards.jpg', '11-susa-archers.jpg', '12-apadana-delegations.jpg', { file: '16-susa-archer-detail.jpg', caption: 'Head of a royal archer from the glazed-brick frieze at Susa: patterned robe, bow over the shoulder, quiver on the back.', ref: 'Susa, about 510 BCE; Musée du Louvre, Paris, AOD 487', credit: 'Photo: Jastrow, Wikimedia Commons, public domain' }],
      lines: [
        { text: 'Arrian lists contingents from across the Persian empire, from Babylon to the eastern provinces, placed in the centre and massed behind it.', tag: 'ancient', cite: 'Arrian III.8, III.11' },
        { text: 'The ancient numbers for the Persian army are not reliable, and no modern total is agreed.', tag: 'estimate' },
        { text: 'Historians think Darius relied mainly on his cavalry. How much of the infantry actually fought is not clear.', tag: 'estimate' }
      ] },
    { side: 'persia', type: 'infantry', name: 'Darius and the royal guard', desc: 'The Great King in the centre, among his guards and kinsmen.', tag: 'established',
      photos: ['02-mosaic-darius.jpg', '11-susa-archers.jpg', '05-persian-daric.jpg', { file: '16-susa-archer-detail.jpg', caption: 'Head of a royal archer from the glazed-brick frieze at Susa: patterned robe, bow over the shoulder, quiver on the back.', ref: 'Susa, about 510 BCE; Musée du Louvre, Paris, AOD 487', credit: 'Photo: Jastrow, Wikimedia Commons, public domain' }],
      lines: [
        { text: 'Darius III stood in the centre of his army, the usual place for a Persian king. Arrian says his kinsmen and the Persian guards were around him.', tag: 'ancient', cite: 'Arrian II.8, III.11' },
        { text: 'Among the guards Arrian names the “apple-bearers”, picked spearmen whose spears had golden apples on the butt.', tag: 'ancient', cite: 'Arrian III.11; Herodotus VII.41' },
        { text: 'Whether Darius fled before his army or was left by it is disputed. The Greek accounts and the Babylonian diary can be read differently.', tag: 'disputed' }
      ] },
    { side: 'persia', type: 'infantry', name: 'Greek mercenaries', desc: 'Greek hired soldiers fighting for the Persian king.', tag: 'ancient',
      photos: ['07-alexander-sarcophagus.jpg'],
      lines: [
        { text: 'Arrian places Greek mercenaries on either side of Darius and his guard, facing the Macedonian phalanx.', tag: 'ancient', cite: 'Arrian III.11' },
        { text: 'Greeks had served Persian kings for generations. Many had already fought against Alexander at Issus two years before.', tag: 'ancient', cite: 'Arrian II.8' },
        { text: 'Their number at Gaugamela is not known.', tag: 'estimate' }
      ] },
    { side: 'persia', type: 'cavalry', name: 'Armenian and Cappadocian cavalry', desc: 'Horsemen from the north-west of the empire, on the Persian right.', tag: 'ancient',
      photos: [],
      lines: [
        { text: 'Arrian places Armenian and Cappadocian horse in front of the Persian right wing, facing Parmenion. Other accounts give the command of the right to Mazaeus.', tag: 'ancient', cite: 'Arrian III.11; Diodorus XVII.60' },
        { text: 'The Persian right pressed Parmenion hard. Arrian says Parmenion sent to Alexander for help; whether Alexander turned back is disputed.', tag: 'disputed' },
        { text: 'In this game they start hidden in the dust of the advance and appear when your troops come close.', tag: 'reconstruction' }
      ] }
  ],

  /* Where each confidence tag comes from: click any tag in the game */
  citations: {
    established: { title: 'Established', intro: 'Accepted by most historians because the ancient accounts, the dates and the outcome agree.', items: [
      { ref: 'E. Badian, “Gaugamela”, Encyclopaedia Iranica (2000, updated 2015)', note: 'A critical synthesis: the site is not known, the army totals are not reliable, the sources are weak. https://www.iranicaonline.org/articles/gaugamela-/' },
      { ref: 'J. Lendering, “Gaugamela (331 BCE)”, Livius', note: 'Campaign narrative, the Babylonian record and criticism of the Greek accounts. https://www.livius.org/articles/battle/gaugamela-331-bce/' },
      { ref: 'World History Encyclopedia, “The Battle of Gaugamela, 331 BCE”', note: 'An accessible overview; checked against the critical sources. https://www.worldhistory.org/article/108/the-battle-of-gaugamela-331-bce/' }
    ] },
    ancient: { title: 'Ancient account', intro: 'The literary sources were written centuries after the battle and often contradict each other. Their numbers are not used as counts.', items: [
      { ref: 'Arrian, Anabasis of Alexander, Book III, chapters 7–16', note: 'The fullest continuous account, based on lost histories by Ptolemy and Aristobulus. https://iranchamber.com/history/achaemenids/arrian_battle_of_gaugamela.php' },
      { ref: 'Diodorus Siculus, Library of History, Book XVII, chapters 53–61', note: 'An alternative tradition, sometimes more dramatic.' },
      { ref: 'Quintus Curtius Rufus, History of Alexander, Book IV, chapters 9–16', note: 'Dramatic, and inconsistent with Arrian in places.' }
    ] },
    babylonian: { title: 'Babylonian diary', intro: 'A near-contemporary astronomical diary from Babylon records the battle and its aftermath in brief.', items: [
      { ref: 'A. J. Sachs and H. Hunger, Astronomical Diaries and Related Texts from Babylonia, vol. I (Vienna, 1988), No. −651', note: 'The critical edition. Its reading of the battle passage is disputed.' },
      { ref: 'B. van der Spek, Achaemenid History XIII (2003), pp. 289–346', note: 'A scholarly reading of the diary for 331 BCE.' },
      { ref: 'Rollinger and Ruffing (German-language article)', note: 'A different reading of the same passage, dividing up who left first differently.' }
    ] },
    disputed: { title: 'Disputed', intro: 'The sources or the scholars disagree. The game shows the disagreement rather than choosing a side.', items: [
      { ref: 'Darius and the order of the flight', note: 'Greek writers have Darius flee first; the Babylonian diary may say the soldiers left him. See Arrian III.14–15, Curtius IV.16 and the diary.' },
      { ref: 'Alexander and Parmenion', note: 'Whether Alexander turned back to help Parmenion, and whether his message was received, is contested. See Arrian III.15 and Iranica.' },
      { ref: 'The site of the battle', note: 'Iranica does not identify it. Some scholars favour a site near Tell Gomel in Iraqi Kurdistan, others one further south. No consensus.' }
    ] },
    estimate: { title: 'Estimate', intro: 'These figures come from modern historians, not from a source. They are rough.', items: [
      { ref: 'Macedonian army, about 40,000 foot and 7,000 horse', note: 'A common modern estimate. Iranica and World History Encyclopedia give it as a baseline.' },
      { ref: 'Persian army', note: 'No reliable total is known. Historians agree that Darius had far more cavalry than Alexander.' }
    ] },
    reconstruction: { title: 'Reconstruction', intro: 'Choices made for this game so that the battle can be shown and played. They are not claims about what happened.', items: [
      { ref: 'The map', note: 'A schematic plain with no real place names or coordinates. The site of the battle is not known.' },
      { ref: 'Positions, timings and speeds', note: 'Chosen to show the sequence in the sources in about a minute and a half. The real battle lasted hours.' },
      { ref: 'Combat results in Command mode', note: 'A simple strength model. Nothing about it is historical.' }
    ] }
  },

  sources: [
    { title: 'Arrian, Anabasis of Alexander, Book III', note: 'The main account. Written centuries after the battle, with lost sources behind it.' },
    { title: 'Babylonian Astronomical Diaries', note: 'A near-contemporary Mesopotamian record. Its reading is disputed.' },
    { title: 'Modern syntheses', note: 'Encyclopaedia Iranica (Badian); Livius (Lendering); World History Encyclopedia.' }
  ]
};
