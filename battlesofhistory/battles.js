/* The list of battles. Cards below the timeline are ordered by `order`: the highest number is shown first. Give a new card the next number, and bump a card's number when it is updated, so it moves to the front. The timeline uses `year`. Add a new entry here when a new battle folder is added; index.html reads it.
   Each entry: folder (the subfolder with its own index.html), title, date (text), year (a number for the
   timeline: negative for BCE), place, sides, blurb, cover (a picture inside the folder's images/),
   coverCredit, optional coverPos (CSS background-position, to keep the subject in the crop), and status: 'ready' | 'in progress'; readyOrder (optional): the order in which battles became ready, newest shown first in the grid (default: order); for in-progress battles,
   progress (0-100, roughly how far along: research, maps, art, script, voices) decides which 4 show beside the globe. */
window.BATTLES = [
  {
    folder: 'kadesh', osmArea: 5,  lat: 34.56, lon: 36.52, osmZoom: 12, osmNote: 'Tell Nebi Mend, the site of Kadesh; the battlefield around it is not exactly known',
    order: 1,
    era: 'Bronze Age',
    title: 'Battle of Kadesh',
    date: 'c. 1274 BCE', year: -1274,
    place: 'Orontes River, Syria',
    sides: 'Egypt under Ramesses II vs. the Hittite Empire under Muwatalli II',
    blurb: 'The earliest battle in history we can follow move by move. Two Shasu spies, a chariot ambush on a marching column, and a pharaoh who carved his version on five temples.',
    cover: 'images/02-abu-simbel-chariot.jpg',
    coverCredit: 'Relief at Abu Simbel. Photo: Diego Delso, Wikimedia Commons, CC BY-SA 4.0',
    status: 'ready'
  },
  {
    folder: 'iadrang', lat: 13.57, lon: 107.72, osmZoom: 11,
    order: 2,
    era: 'Vietnam War',
    title: 'Battle of the Ia Drang',
    date: '14–18 November 1965', year: 1965,
    place: 'Ia Drang valley, Central Highlands, South Vietnam',
    sides: 'United States 1st Cavalry Division (Airmobile) vs. the People’s Army of Vietnam',
    blurb: 'The first battle between the US Army and the North Vietnamese regulars: three days in a clearing below a mountain at LZ X-Ray, then the ambush of a column on the way to LZ Albany.',
    cover: 'images/17-xray-perimeter.jpg',
    coverCredit: 'US Army photograph, public domain',
    status: 'ready'
  },
  {
    folder: 'pegasus', lat: 49.24, lon: -0.27, osmZoom: 14,
    order: 3,
    era: 'Second World War',
    title: 'Pegasus Bridge',
    date: '5–6 June 1944', year: 1944,
    place: 'Bénouville and Ranville, Normandy',
    sides: 'British 6th Airborne Division vs. the German 716th Infantry and 21st Panzer Divisions',
    blurb: 'The first fight of D-Day: six gliders land beside two bridges at a quarter past midnight, 181 men take both in minutes, and hold them until the commandos arrive from the beach.',
    cover: 'images/32-art-bridge-night.jpg',
    coverCredit: 'Painting: Battle Games, original artwork',
    status: 'ready'
  },
  {
    folder: 'gaugamela', osmArea: 12, osmSites: [[36.62, 43.44, 'Tell Gomel (most often proposed)'], [36.32, 43.40, 'a site further south (another proposal)']],  lat: 36.56, lon: 43.44, osmZoom: 10, osmNote: 'the exact site is not known',
    order: 4,
    era: 'Classical Antiquity',
    title: 'Battle of Gaugamela',
    date: '1 October 331 BCE', year: -331,
    place: 'Near Gaugamela, northern Mesopotamia',
    sides: 'Macedonian army under Alexander III vs. Persian army under Darius III',
    blurb: 'Alexander’s oblique advance, the scythed chariots, and the break in the Persian centre, on a plain whose site is not known. Watch the reconstruction or command either army.',
    cover: 'images/cover.jpg',
    coverCredit: 'Original illustration for this project',
    status: 'ready'
  },
  {
    folder: 'waterloo', lat: 50.68, lon: 4.41, osmZoom: 13,
    order: 5,
    era: 'Napoleonic Wars',
    title: 'Battle of Waterloo',
    date: '18 June 1815', year: 1815,
    place: 'Mont-Saint-Jean ridge, south of Brussels',
    sides: 'Wellington’s Anglo-Allied army and Blücher’s Prussians vs. Napoleon’s Armée du Nord',   // first side red (the redcoats), second blue
    blurb: 'The last battle of Napoleon’s return: a ridge held by redcoat squares, cuirassiers breaking up the slope, and the Prussians arriving late in the day. Watch the reconstruction or command either army.',
    cover: 'images/18-sadler-waterloo.jpg',
    coverCredit: 'The Battle of Waterloo by William Sadler, 1815; public domain',
    status: 'ready'
  },
  {
    folder: 'edington', osmSites: [[51.263, -2.142, 'Edington and Bratton Camp, Wiltshire (most often proposed)'], [51.155, -2.876, 'Edington, Somerset (another proposal)']],  lat: 51.27, lon: -2.1, osmZoom: 12, osmNote: 'the site of Ethandun is debated',
    order: 7,
    era: 'Viking Age',
    title: 'Battle of Edington',
    date: 'May 878', year: 878,
    place: 'Ethandun, Wessex (probably near Edington, Wiltshire; the site is debated)',
    sides: 'The West Saxons under Alfred the Great vs. the Viking Great Army under Guthrum',
    blurb: 'Alfred, driven into the Somerset marshes, gathers the men of Wessex and meets Guthrum’s army at Ethandun. A shield-wall battle that saved the last English kingdom.',
    cover: 'images/cover.jpg',
    coverCredit: 'Artist rendering: the shield walls meet at Ethandun. Battle Games, AI-generated',
    status: 'ready'
  },
  {
    folder: 'talas', osmArea: 25, osmSites: [[42.90, 71.37, 'Taraz (old Talas)'], [42.7153, 71.2644, 'Atlakh'], [42.6819, 71.3097, 'Joon-Döbö']],  lat: 42.9, lon: 71.4, osmZoom: 8, osmNote: 'the exact site is not known',
    order: 6,
    era: 'Tang and Abbasid',
    title: 'Battle of Talas',
    date: 'July 751', year: 751,
    place: 'Near the Talas river, Central Asia (today on the Kazakhstan–Kyrgyzstan border; the exact site is not known)',
    sides: 'The Abbasid Caliphate and its allies vs. Tang China under Gao Xianzhi',
    blurb: 'At the edge of two empires, a Tang army meets the forces of the new Abbasid Caliphate. Their Karluk allies change sides, and the Tang army is broken.',
    cover: 'images/cover.jpg',
    coverCredit: 'Tang dynasty figure of a warrior on an armoured horse, from the tomb of Crown Prince Li Chongrun. Photo: Gary Lee Todd, Wikimedia Commons, CC BY-SA 4.0',
    status: 'ready'
  },
  {
    folder: 'dunkirk', lat: 51.03, lon: 2.37, osmZoom: 11,
    order: 10,
    era: 'Second World War',
    title: 'Withdrawal at Dunkirk',
    date: '26 May – 4 June 1940', year: 1940,
    place: 'Dunkirk and its beaches, northern France',
    sides: 'The British Expeditionary Force and the French army vs. the German army and Luftwaffe',
    blurb: 'Cut off by the German advance, the British and French hold a shrinking pocket around Dunkirk while ships, from destroyers to the little ships, carry more than 330,000 men off the beaches and the mole.',
    cover: 'images/cover.jpg',
    coverCredit: 'Troops evacuated from Dunkirk on a destroyer about to berth at Dover, 31 May 1940. Photo: Puttnam and Malindine, War Office official photographers. Imperial War Museum (H 1637), public domain (Crown copyright expired)',
    status: 'ready'
  },
  {
    folder: 'stirling', lat: 56.12, lon: -3.94, osmZoom: 14,
    order: 9,
    era: 'Middle Ages',
    title: 'Battle of Stirling Bridge',
    date: '11 September 1297', year: 1297,
    place: 'Stirling, on the River Forth, Scotland',
    sides: 'The Scots under William Wallace and Andrew Moray vs. the English army of Edward I under the Earl of Surrey',
    blurb: 'Wallace and Moray wait on the high ground while the English cross a narrow wooden bridge over the Forth two at a time, then attack before the rest can follow.',
    cover: 'images/cover.jpg',
    coverCredit: 'Artist rendering: the Scots cut off the English vanguard at the north end of the bridge. Battle Games, AI-generated',
    status: 'ready'
  },
  {
    folder: 'vimy', lat: 50.38, lon: 2.77, osmZoom: 13,
    order: 11,
    era: 'First World War',
    title: 'Battle of Vimy Ridge',
    date: '9–12 April 1917', year: 1917,
    place: 'Vimy Ridge, north of Arras, northern France',
    sides: 'The German Sixth Army vs. the Canadian Corps under Julian Byng, with British support',   // German first: red, as on the 1917 trench maps
    blurb: 'For the first time all four Canadian divisions attack together. After months of tunnelling and rehearsal they advance behind a creeping barrage and take the ridge that had held out against the French and British for two years.',
    cover: 'images/cover.jpg', coverPos: '30% 18%',   // keep the memorial in view
    coverCredit: 'Will Longstaff, Ghosts of Vimy Ridge (about 1929): the ghosts of the Canadian Corps gather on the ridge around the Vimy Memorial. House of Commons Heritage Collection, public domain',
    status: 'ready'
  },
  {
    folder: 'sixday', progress: 100, lat: 31.78, lon: 35.23, osmZoom: 7, osmNote: 'the whole region: Sinai, the West Bank and the Golan Heights',
    order: 12, readyOrder: 18,
    era: 'Arab–Israeli Wars',
    title: 'The Six-Day War',
    date: '5–10 June 1967', year: 1967,
    place: 'Sinai, the West Bank and the Golan Heights',
    sides: 'Israel vs. Egypt, Jordan and Syria',
    blurb: 'In six days in June 1967, after weeks of rising tension, Israel struck the Egyptian air force on the ground, then fought on three fronts: across Sinai to the Suez Canal, into the West Bank and Jerusalem, and up the Golan Heights.',
    cover: 'images/cover.jpg', coverPos: '65% 50%',   // the half-track, not the helmet in the foreground
    coverCredit: 'Israeli half-tracks on the Golan Heights, 1967. Photo: Israel Press and Photo Agency (I.P.P.A.), Dan Hadani collection, National Library of Israel, CC BY 4.0',
    status: 'ready'
  },
  {
    folder: 'sekigahara', lat: 35.37, lon: 136.47, osmZoom: 13,
    order: 13,
    era: 'Sengoku Japan',
    title: 'Battle of Sekigahara',
    date: '21 October 1600', year: 1600,
    place: 'Sekigahara, Mino Province, Japan',
    sides: 'The Eastern Army of Tokugawa Ieyasu vs. the Western Army of Ishida Mitsunari',
    blurb: 'In a fog-filled mountain valley, the two great coalitions of Japan meet to decide who rules after Toyotomi Hideyoshi. When Kobayakawa Hideaki’s army changes sides on the hill above, the Western Army collapses, and Tokugawa Ieyasu wins the country for two and a half centuries.',
    cover: 'images/cover.jpg', coverPos: '45% 55%',
    coverCredit: 'Sekigahara Kassen Byōbu-zu, folding screen of the battle seen from the north (late Edo period, 19th century). City of Gifu Museum of History, public domain',
    status: 'ready'
  },
  {
    folder: 'batoche', progress: 90, lat: 52.75, lon: -106.12, osmZoom: 14,
    order: 14, readyOrder: 14,
    era: 'Canada, 1885',
    title: 'Battle of Batoche',
    date: '9–12 May 1885', year: 1885,
    place: 'Batoche, on the South Saskatchewan River (today in Saskatchewan, Canada)',
    sides: 'The North-West Field Force of Major-General Frederick Middleton vs. the Métis and First Nations fighters of Louis Riel and Gabriel Dumont',
    blurb: 'For four days a Canadian government army presses against the rifle pits dug by the Métis around their village on the South Saskatchewan. On the fourth day it breaks through, and the North-West Resistance of 1885 comes to an end.',
    cover: 'images/cover.jpg', coverPos: '60% 50%',
    coverCredit: 'Hostilities open at Batoche, 9 May 1885. Photograph by Captain James Peters, who served with the field force. Library and Archives Canada, C-003464, public domain',
    status: 'ready'
  },
  {
    folder: 'tyre', progress: 100, lat: 33.27, lon: 35.2, osmZoom: 14,
    order: 15, readyOrder: 16,
    era: 'Classical Antiquity',
    title: 'Siege of Tyre',
    date: '332 BCE, about seven months', year: -332,
    place: 'Tyre, an island city off the coast of Phoenicia (today in Lebanon)',
    sides: 'The Tyrians under King Azemilcus vs. the Macedonian army of Alexander III',   // Tyre first: red; Alexander blue, as his painted army
    blurb: 'Tyre refuses Alexander entry, trusting in its island walls half a mile out to sea. For seven months his army builds a causeway across the strait while the Tyrians fight back with a fireship, divers and a surprise sortie, until a fleet of Phoenician and Cypriot ships helps him breach the walls.',
    cover: 'images/cover.jpg', coverPos: '70% 40%',
    coverCredit: 'Original illustration for this project (AI-generated): an artist’s impression, not evidence',
    status: 'ready'
  },
  {
    folder: 'fishcreek', progress: 85, lat: 52.54, lon: -106.15, osmZoom: 14,
    order: 16, readyOrder: 15,
    era: 'Canada, 1885',
    title: 'Battle of Tourond\u2019s Coulee / Fish Creek',
    date: '24 April 1885', year: 1885,
    place: 'Tourond\u2019s Coulee / Fish Creek, on the South Saskatchewan River south of Batoche (today in Saskatchewan, Canada)',
    sides: 'The North-West Field Force of Major-General Frederick Middleton vs. the Métis and First Nations fighters of Gabriel Dumont',
    blurb: 'Dumont\u2019s fighters ambush Middleton\u2019s column from a wooded coulee, stop it in its tracks and hold their ground until nightfall. Middleton waits two weeks before marching on Batoche.',
    cover: 'images/cover.jpg', coverPos: '50% 50%',
    coverCredit: 'The Battle of Fish Creek, coloured lithograph, 1885. Public domain',
    status: 'ready'
  },
  {
    folder: 'bunkerhill', progress: 10, lat: 42.3763, lon: -71.0608, osmZoom: 15,
    order: 17,
    era: 'American Revolution',
    title: 'Battle of Bunker Hill',
    date: '17 June 1775', year: 1775,
    place: 'Breed\u2019s Hill and Bunker Hill, Charlestown peninsula, Massachusetts',
    sides: 'British forces under Major-General William Howe vs. New England provincial militia under Colonel William Prescott',
    blurb: 'On the night of 16 June, New England militia dig a redoubt on Breed\u2019s Hill above British-held Boston. By afternoon the Royal Navy and Howe\u2019s infantry are crossing the Charles River to storm it. The British take the hill, but at a terrible cost.',
    cover: 'images/cover.jpg', coverPos: '50% 45%',
    coverCredit: 'John Trumbull, The Battle of Bunker\u2019s Hill, June 17, 1775, oil on canvas, 1786. Yale University Art Gallery, Trumbull Collection, via Wikimedia Commons, public domain. A later painting, not evidence of the battle',
    status: 'in progress'
  },
  {
    folder: 'redriver', progress: 5, lat: 49.8873, lon: -97.1316, osmZoom: 13,
    order: 18,
    era: 'Canada, 1869–1870',
    title: 'Red River Resistance',
    date: 'October 1869 – August 1870', year: 1869,
    place: 'The Red River Settlement and Upper Fort Garry (today Winnipeg, Manitoba, Canada)',
    sides: 'The Métis provisional government of Louis Riel vs. the Canadian government and its supporters at Red River',
    blurb: 'When Canada buys Rupert’s Land from the Hudson’s Bay Company without asking the people who live there, the Métis of Red River stop the surveyors, seize Upper Fort Garry and form a provisional government under Louis Riel. Their negotiations bring Manitoba into Canada, but the execution of Thomas Scott and the military expedition of 1870 send Riel into exile.',
    cover: 'images/cover.jpg', coverPos: '50% 30%',
    coverCredit: 'Louis Riel, photograph by I. Bennetto & Co., Winnipeg (probably about 1884). University of Manitoba Archives, PC 107. Public domain. A placeholder: later than the events',
    status: 'in progress'
  },
  {
    folder: 'vukovar', progress: 100, lat: 45.3517, lon: 19.0012, osmZoom: 14,
    order: 19, readyOrder: 17,
    era: 'Croatia, 1991',
    title: 'Battle of Vukovar',
    date: '25 August – 18 November 1991', year: 1991,
    place: 'Vukovar, on the Danube in eastern Slavonia (then in Yugoslavia, today in Croatia)',
    sides: 'The Yugoslav People\u2019s Army (JNA) with Serb volunteer and Territorial Defence units vs. the Croatian National Guard, police and local volunteers',
    blurb: 'As Yugoslavia breaks apart, the Yugoslav People\u2019s Army (JNA), with local Territorial Defence and volunteer units, besieges the town of Vukovar on the Danube. For about three months a few thousand Croatian defenders hold out against a much larger force with tanks and artillery, while the town is shelled to ruins. After it falls, prisoners taken from the hospital are killed at nearby Ovčara: the international court found 194 named victims.',
    cover: 'images/cover.jpg', coverPos: '12% 35%',
    coverCredit: 'The Vukovar water tower, 2010. Photo: anjči (London, UK), Wikimedia Commons, CC BY 2.0 (creativecommons.org/licenses/by/2.0). Sky extended for this page',
    status: 'ready'
  },
  {
    folder: 'somalia1988', progress: 2, lat: 9.5600, lon: 44.0650, osmZoom: 8, osmNote: 'centred on Hargeisa; Burao and Berbera lie to the east and north-east',
    order: 20,
    era: 'Somalia, 1988',
    title: 'Somalia 1988: War in the North and the Isaaq Genocide',   // the war, and the name researchers use for the killing of Isaaq civilians (Yale GSP, Lemkin Institute, the 2002 UN-commissioned study); no court has ruled on genocide: the page explains
    date: '1987–1989 (the main attack: May–July 1988)', year: 1988,
    place: 'Hargeisa and Burao, northern Somalia (the region that declared itself Somaliland in 1991)',
    sides: 'The government of Mohamed Siad Barre and its army vs. the Somali National Movement (SNM); the Isaaq civilians of the north',
    blurb: 'In May 1988 the Somali National Movement attacked Burao and Hargeisa. The government of Siad Barre answered with bombardment and killings aimed at the Isaaq civilians of the north. Tens of thousands were killed and hundreds of thousands fled to Ethiopia. Genocide researchers call it the Isaaq genocide.',
    cover: 'images/cover.jpg', coverPos: '50% 35%',   // the downed MiG and the words 1988
    coverCredit: 'The Hargeisa War Memorial: a downed Somali Air Force MiG over the words “Xus oo xasuusnow 1988” (“Remember and recall 1988”), 2019. Photo: Gerard van de Bruinhorst, African Studies Centre Leiden, Wikimedia Commons, CC BY-SA 4.0. Cropped',
    status: 'in progress'
  },
  {
    folder: 'granicus-issus', osmArea: 10, osmSites: [[36.76, 36.21, 'Payas river'], [36.93, 36.18, 'Deli Çay']],  progress: 5, lat: 36.75, lon: 36.20, osmZoom: 12, osmNote: 'the coast of Issus at the Payas river, the most often proposed site; the Granicus is far to the north-west, near Biga',
    order: 21,
    era: 'Classical Antiquity',
    title: 'Granicus & Issus',
    date: 'May 334 – November 333 BCE', year: -334,
    place: 'The Granicus river in north-western Anatolia, and the coast of Issus between the Amanus mountains and the sea (both in today’s Turkey)',
    sides: 'Macedonian army under Alexander III vs. Persian army under Darius III',
    blurb: 'Alexander’s first two battles against Persia, a year apart: the cavalry charge across the Granicus and up its steep bank, then the long march across Anatolia, the two armies passing each other on either side of the mountains, and the clash at the river Pinarus where Darius fled and his family was captured. The story before Tyre and Gaugamela.',
    cover: 'images/cover.jpg', coverPos: '30% 40%',   // Alexander and Bucephalus
    coverCredit: 'Title painting made for this page with ChatGPT (AI-generated), checked against Arrian, Plutarch and Xenophon: an imagined scene combining the two battles, not a record',
    status: 'in progress'
  },
  {
    folder: 'yugoslavia-escalation', progress: 1, lat: 44.0, lon: 18.5, osmZoom: 6, osmNote: 'the whole of the former Yugoslavia',
    order: 22,
    era: 'Yugoslavia, 1980–1991',
    title: 'Yugoslavia: Escalation',
    date: 'May 1980 – June 1991 (the road to war)', year: 1985,
    place: 'The six republics and two autonomous provinces of Yugoslavia: Slovenia, Croatia, Bosnia and Herzegovina, Serbia (with Vojvodina and Kosovo), Montenegro and Macedonia',
    sides: 'The Yugoslav federation, its republics and their leaders, and the Yugoslav People’s Army (JNA)',
    blurb: 'How Yugoslavia came apart: Tito’s death in 1980, the debt crisis, the Kosovo protests of 1981 and 1989, the rise of Slobodan Milošević, the end of the League of Communists in January 1990, the first free elections in the republics, and the armed incidents of 1990–1991, until Slovenia and Croatia declared independence on 25 June 1991.',
    cover: 'images/cover.jpg',   // the title card: coming from the owner
    coverCredit: '',
    status: 'in progress'
  },
  {
    folder: 'tenday', progress: 1, lat: 46.05, lon: 14.51, osmZoom: 8, osmNote: 'the whole of Slovenia; the fighting was at border crossings, barracks, the airport and the roads',
    order: 23,
    era: 'Slovenia, 1991',
    title: 'The Ten-Day War',
    date: '27 June – 7 July 1991', year: 1991,
    place: 'Slovenia: its border crossings with Italy, Austria and Hungary, and the roads, barracks and airport across the republic',
    sides: 'Slovenian Territorial Defence and police vs. the Yugoslav People’s Army (JNA)',
    blurb: 'Two days after Slovenia declared independence, the Yugoslav army moved to take over its border crossings. The Slovenian Territorial Defence and police blocked the roads and surrounded the barracks. After ten days of fighting, the Brioni Agreement of 7 July ended the war, and the army later left Slovenia.',
    cover: 'images/cover.jpg', coverPos: '55% 60%',   // the tanks at the crossing
    coverCredit: 'Slovenian Territorial Defence fighters hit a Yugoslav Army (JNA) tank at the crossroads before the Rožna Dolina border crossing, Nova Gorica, June 1991. Photo: Peter Božič, Wikimedia Commons, CC BY 3.0',
    status: 'in progress'
  },
  {
    folder: 'dubrovnik', progress: 1, lat: 42.6411, lon: 18.11, osmZoom: 13, osmNote: 'the old town; the fighting reached the hills, Cavtat and the Pelješac road',
    order: 24,
    era: 'Croatia, 1991–1992',
    title: 'Siege of Dubrovnik',
    date: '1 October 1991 – 31 May 1992 (the siege lifted; fighting nearby until October 1992)', year: 1991,
    place: 'Dubrovnik and its coast, southern Croatia, with the hills of Srđ and the border with Montenegro and Herzegovina',
    sides: 'The Yugoslav People’s Army (JNA) and forces from Montenegro vs. Croatian forces defending Dubrovnik',
    blurb: 'In October 1991 the Yugoslav army and forces from Montenegro surrounded Dubrovnik. The old town, a World Heritage Site, was shelled, most heavily on 6 December 1991; the fort on Srđ hill held. A court later convicted JNA officers for the shelling of the old town. The siege was lifted in May 1992.',
    cover: 'images/cover.jpg',   // the title card: coming from the owner
    coverCredit: '',
    status: 'in progress'
  },
  {
    folder: 'sarajevo', progress: 1, lat: 43.8563, lon: 18.4131, osmZoom: 12, osmNote: 'the city and the hills around it',
    order: 25,
    era: 'Bosnia and Herzegovina, 1992–1996',
    title: 'Siege of Sarajevo',
    date: '5 April 1992 – 29 February 1996', year: 1992,
    place: 'Sarajevo, capital of Bosnia and Herzegovina, and the hills and mountains around it',
    sides: 'The Army of Republika Srpska (VRS) around the city vs. the Army of the Republic of Bosnia and Herzegovina (ARBiH) inside it',
    blurb: 'For almost four years Sarajevo was surrounded. The Bosnian Serb army held the hills; the city lived under shelling and sniper fire, without regular water, power or food. The tunnel under the airport, the market shellings and NATO’s air strikes of 1995 mark the story. The UN war crimes court convicted the Bosnian Serb commanders for a campaign of shelling and sniping against civilians.',
    cover: 'images/cover.jpg',   // the title card: coming from the owner
    coverCredit: '',
    status: 'in progress'
  },
  {
    folder: 'medak', osmArea: 6, progress: 1, lat: 44.49, lon: 15.42, osmZoom: 11, osmNote: 'approximate: the villages of the Medak pocket (Divoselo, Čitluk, Počitelj) south of Gospić',
    order: 26,
    era: 'Croatia, 1993',
    title: 'Medak Pocket',
    date: '9–17 September 1993', year: 1993,
    place: 'The Medak pocket south of Gospić, in the Lika region of Croatia',
    sides: 'Croatian Army (HV) and special police vs. Army of the Republic of Serbian Krajina (SVK)',
    blurb: 'In September 1993 the Croatian Army took a small salient of Serb-held land near Gospić. Under a ceasefire, UN peacekeepers, Canadian and French, moved in to separate the two sides and came under fire; behind the Croatian lines the villages were destroyed and Serb civilians and prisoners were killed. A Croatian court later convicted one of the commanders and acquitted another.',
    cover: 'images/cover.jpg',   // the title card: coming from the owner
    coverCredit: '',
    status: 'in progress'
  },
  {
    folder: 'mogadishu1993', progress: 1, lat: 2.0470, lon: 45.3290, osmZoom: 14, osmNote: 'approximate: central Mogadishu around the Bakara Market, where the raid and the first helicopter crash took place',
    order: 27,
    era: 'Somalia, 1993',
    title: 'Battle of Mogadishu',
    date: '3–4 October 1993', year: 1993,
    place: 'Central Mogadishu, Somalia: the Bakara Market area and the streets to the UN base and the stadium',
    sides: 'US Task Force Ranger with UN forces (UNOSOM II: Malaysian and Pakistani troops) vs. the Somali National Alliance (SNA) militia of Mohamed Farrah Aidid',
    blurb: 'A US raid to capture leaders of Mohamed Farrah Aidid’s militia turned into a night-long battle in the city after two Black Hawk helicopters were shot down. A rescue column with Malaysian and Pakistani troops reached the trapped soldiers the next morning. Eighteen Americans and one Malaysian soldier were killed; estimates of Somali dead, fighters and civilians, range from several hundred to more than a thousand. The United States soon withdrew from Somalia.',
    cover: 'images/cover.jpg',   // the title card: coming from the owner
    coverCredit: '',
    status: 'in progress'
  }
];
