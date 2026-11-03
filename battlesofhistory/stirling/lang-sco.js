/* Battle o Stirlin Brig: Scots (Lowland Scots) text of the narration and captions.
   Matches stirling/scenario.js item for item; every line keeps the same number of sentences as the English, so the
   captions stay in step with the English narration (no Scots voice: the narrators speak English).
   Written in modern Scots, after the fact-checked English; to be read over by a Scots speaker. */
window.STIRLING_LANG = window.STIRLING_LANG || {};
window.STIRLING_LANG.sco = {
  name: 'Scots',
  title: 'Battle o Stirlin Brig',
  date: '11 September 1297',
  place: 'Stirlin, on the Watter o Forth, Scotland',
  tagline: 'The Scots o Moray an Wallace agin the English airmy o Edward I',
  titleCard: { title: 'BATTLE O STIRLIN BRIG', date: '11 September 1297', place: 'Stirlin, on the Watter o Forth, Scotland',
    dateNote: 'The Scots unner Wallace an Moray wait abuin the Watter o Forth while the English cross a nairae timmer brig, twa horsemen side by side.',
    sides: 'The Scots unner Andrew Moray an William Wallace  ·  The English airmy o Edward I unner the Earl o Surrey' },
  tags: { established: 'Siccar', guisborough: 'Guisborough', chronicle: 'Ither chronicles', later: 'Later accoont', disputed: 'Argied ower', estimate: 'Guess', reconstruction: 'Reconstruction' },
  sides: { allied: 'Scotland', french: 'England' },
  scaleLabel: '500 m',

  welcome: 'Walcome tae Battles o History. The day we’re learnin aboot the Battle o Stirlin Brig, fochten on the 11t o September 1297, atween the Scots unner William Wallace an Andrew Moray an the English airmy o King Edward the First.',

  intro: [
    { title: 'BATTLE O STIRLIN BRIG', lines: [
      'On the 11t o September 1297, a Scots airmy waitit on the heich grund abuin the Watter o Forth while an English airmy crossed a nairae timmer brig taewart it.',
      'Maist o whit we ken comes fae English chroniclers, that wrote within a wheen o years an hadnae muckle love for the Scots. This introduction sinders whit they say fae whit historians hae pieced thegither. Tak tent o the colour o ilka tag.' ] },
    { title: 'A kinrick conquest', lines: [
      'In 1296 King Edward the First o England invadit Scotland. His airmy sacked the toun o Berwick an destroyed the Scots airmy at Dunbar.',
      'The Scots keeng, John Balliol, gied up his throne. Edward taen the Stane o Destiny fae Scone, whaur Scots keengs were croont, an gart the Scots lords sweir leal tae him.',
      'He left Scotland in the hauns o his officials: the Earl o Surrey as his lieutenant, an Hugh de Cressingham as thesaurer, that wis hatit for his taxes.' ] },
    { title: 'The risins o 1297', lines: [
      'In Mey 1297 William Wallace, a man fae a smaw laird’s faimily, wis said tae hae killt the English shirra o Lanark. His rebellion spreid throu the sooth o Scotland.',
      'In the north, Andrew Moray, heir tae a great faimily o the Moray Firth, cam hame fae English captivity an led a growin rebellion. His men attackit English garrisons an shoogled their haud on the north.',
      'By the end o the simmer the twa had jined forces near Stirlin.' ] },
    { title: 'The key tae Scotland', lines: [
      'Stirlin Castle staunds on a rock abuin the Watter o Forth. Ablow it, the watter winds in muckle loops ower saft, weet grund.',
      'Here wis the lawest brig ower the Forth, the main road atween the sooth o Scotland an the north. Whaever held it held the gate intae the north.',
      'Ower the watter, a nairae causey ran ower the boggy meedies tae the fit o a stey hill, the Abbey Craig. The Scots waitit there.' ] },
    { title: 'The airmies', lines: [
      'Naebody coontit aither airmy. Guisborough says the English had fifty thoosand fit, an the Scots forty thoosand. Historians agree thir figures canna be richt.',
      'We dinnae ken the exact strenth o aither airmy. Modren historians think there wis several thoosand men on ilka side. The English had faur mair hivvy-airmoured horsemen, wi Welsh an English fit sodgers; the Scots leaned maistly on spearmen on fit.',
      'The Scots were led thegither by Wallace an Moray. The English were commandit by the Earl o Surrey, an auld sodger that had won at Dunbar the year afore.' ] },
    { title: 'The brig', lines: [
      'The brig o 1297 wis made o timmer, sae nairae that anely twa horsemen could ride side by side.',
      'Archaeologists hae fund the remains o an aulder medieval brig jist upstream o the stane Auld Brig that staunds the day: fower stane piers still lie in the watter. This is thocht tae be the place o the 1297 crossin, though the remains hivnae been siccarly dated tae the battle.',
      'The battle map is pentit ontae the real coorse o the watter, traced fae the grund. Whaur the airmies stood on it is oor reconstruction.' ] }
  ],

  campaign: { title: 'The road tae Stirlin', subtitle: 'Simmer 1297',
    events: [
      { title: 'The English mairch north', clock: 'Late August 1297', text: 'Surrey gethers his airmy in the Borders an mairches north throu Edinburgh tae Stirlin, whaur the English haud the castle. The Scots are awready waitin ower the watter.' },
      { title: 'Wallace an Moray', clock: 'Early September', text: 'Wallace comes fae the sooth an Moray fae the north. They jine their forces at the crossin o the Forth, an tak up a poseetion on the heich grund near the Abbey Craig, leukin doun on the brig.' }
    ],
    towns: ['Stirlin', 'Berwick', 'Roxburgh', 'Edinburgh', 'Falkirk', 'Lanark', 'Perth', 'Inverness', 'Aiberdeen', 'Dundee', 'Dunbar', 'Scone'],
    formations: { 'c-eng': { name: 'The English airmy o Surrey' }, 'c-moray': { name: 'Andrew Moray’s airmy o the north' }, 'c-wallace': { name: 'William Wallace’s airmy o the sooth' } } },

  events: [
    { title: 'Waitin', clock: '10 September', text: 'Twa Scots lords servin wi the English, James the Steward an the Earl o Lennox, ask Surrey tae wait while they try tae talk the Scots intae giein in. They come back wi naethin.' },
    { title: 'A fause stert', clock: '11 September, dawin', text: 'Guisborough tells an unco story: thoosands o Welsh fit sodgers crossed early in the mornin, anely tae be cried back acause Surrey wisnae up yet. Whether this really happent is no siccar; it micht hae been tellt tae mak Surrey leuk glaikit. He tells forby o Surrey makkin young men knichts afore the battle.' },
    { title: 'The friars', clock: 'Mornin', text: 'Surrey sends twa friars ower tae offer the Scots peace. Accordin tae Guisborough, Wallace sends back his answer: the Scots hivnae come tae mak peace, but tae fecht, an free their kinrick.' },
    { title: 'Lundie’s rede', clock: 'Mornin', text: 'Sir Richard Lundie, a Scots knicht servin the English, warns agin forcin the brig. Accordin tae Guisborough, he offers tae tak horsemen an fit ower a ford nearhaun tae come at the Scots fae ahint. Whaur that ford wis, naebody kens. Cressingham, impatient at the cost o the campaign, priggs for an attack straucht ower the brig, an Surrey agrees.' },
    { title: 'Twa by twa', clock: 'Later that mornin', text: 'The English stert tae cross, twa horsemen side by side. Cressingham is amang them that cross. On the faur bank they gether aside the causey, shiftin oot the road tae leave the crossin open for them ahint, wi boggy meedies aw roond.' },
    { title: 'The Scots attack', clock: 'Later that mornin', text: 'The Scots watch an wait. When a muckle pairt o the English airmy is ower an cut aff fae the lave by the watter, they come doun fae the heich grund an block the gate back tae the brig. Them that hae crossed are trappit.' },
    { title: 'The girn', clock: 'Durin the fechtin', text: 'On the faur bank the English horsemen hae nae room tae chairge on the saft grund. Mony are killt. Ithers try tae soum the Forth in their airmour an droun.' },
    { title: 'Cressingham', clock: 'Durin the fechtin', text: 'Hugh de Cressingham, the hatit thesaurer, is killt in the fechtin. English chroniclers wrote efter that the Scots tirred the skin aff his body as an affront tae their bate enemy.' },
    { title: 'Thweng', clock: 'Durin the fechtin', text: 'Sir Marmaduke Thweng, a Yorkshire knicht, hacks his road back ower the brig, ane o the gey few tae win awa. Surrey maks him keeper o Stirlin Castle.' },
    { title: 'The brig', clock: 'Efter the fechtin', text: 'The brig canna be crossed ony mair. Accoonts differ on hou: Guisborough says Surrey ordert it destroyed as he retreatit; the later Scalacronica says the Scots broke it. We canna be siccar whit ane is richt.' },
    { title: 'The scatter', clock: 'Efter the fechtin', text: 'Surrey rides sooth for Berwick wi the lave o his airmy. The Steward an the Earl o Lennox, that hae been waitin in the wuids, nou turn on the fleein English an grip their baggage.' }
  ],

  outcome: [
    'The Scots won a hale victory. Guisborough says a hunner English knichts an five thoosand fit sodgers dee’d, figures that micht be ower heich. Naebody wrote doun the Scots losses.',
    'Andrew Moray wis woundit at Stirlin Brig an dee’d efter, likely in November 1297. His name comes afore Wallace’s on an offeecial letter o the 11t o October, sae his leadership wis aye recognised efter the victory.',
    'On the 11t o October, at Haddington, Moray an Wallace wrote tae the merchants o Lübeck an Hamburg that their ships could aince mair trade sauf in Scots ports. The letter survives.',
    'The Scots reidit deep intae the north o England. Wallace wis made a knicht an named Guardian o Scotland, rulin in the name o the absent King John.',
    'Edward the First cam north himsel. On the 22nt o Julie 1298 he defeatit Wallace at Falkirk.',
    'Stirlin Brig shawed hou cannie uise o grund an timin could ding a pouerfu airmy. Seeventeen year efter, at Bannockburn, a few mile awa, Scots fit sodgers wad win anither great victory agin an English airmy.',
    'Blind Harry’s poem o aboot 1470 tells o a wricht that pued a pin tae cowp the brig. It’s a legend; nae early source mentions it.'
  ],

  leaders: { wallace: 'William Wallace', moray: 'Andrew Moray', surrey: 'Earl o Surrey', cressingham: 'Hugh de Cressingham', thweng: 'Sir Marmaduke Thweng', lundie: 'Sir Richard Lundie' },
  formations: {
    sspear1: { name: 'Scots spearmen (Moray)', division: 'Moray' }, sspear2: { name: 'Scots spearmen (Wallace)', division: 'Wallace' },
    sarch: { name: 'Scots bowmen', division: 'Bowmen' }, shorse: { name: 'Scots horsemen', division: 'Horse' },
    van: { name: 'English vanguard: knichts an men-at-airms', division: 'Vanguard' }, vfoot: { name: 'English vanguard: fit', division: 'Vanguard' },
    welsh: { name: 'Welsh an English fit', division: 'Main body' }, main: { name: 'Surrey’s main body', division: 'Main body' },
    baggage: { name: 'The English baggage', division: 'Baggage' }, steward: { name: 'The Steward an the Earl o Lennox', division: 'Steward' } },
  units: [
    { name: 'Scots spearmen', desc: 'The hert o the Scots airmy: men on fit wi lang spears.' },
    { name: 'Scots bowmen', desc: 'Bowmen, mony fae the forest o Selkirk.' },
    { name: 'Scots horsemen', desc: 'A smaw mountit force o knichts an licht horse.' },
    { name: 'English knichts an men-at-airms', desc: 'Airmoured horsemen in mail, the strenth o Edward I’s airmies.' },
    { name: 'Welsh an English fit', desc: 'Fit sodgers, mony o them fae Wales, wi spears an bows.' }
  ],
  labels: ['Stirlin Castle', 'Stirlin', 'Abbey Craig', 'Cambuskenneth Abbey', 'the causey', 'Watter o Forth']
};
