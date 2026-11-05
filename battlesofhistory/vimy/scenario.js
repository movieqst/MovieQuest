/*
  Historical Scenario File — Battle of Vimy Ridge, 9–12 April 1917
  ------------------------------------------------------------------
  The narrated introduction (`intro`), the reenactment chapters (`events`) and the debrief (`outcome`), word for word from
  NARRATION-SCRIPT.md, which is what the narrators recorded (audio/<voice>/). This part is written by
  tools/make-scenario-text.py; the maps, armies and moves are set in the block below the marker line.
  Tags: established, account (one participant or witness), disputed, estimate, reconstruction.
*/
window.VIMY_SCENARIO = window.VIMY_SCENARIO || {};
Object.assign(window.VIMY_SCENARIO, {
  id: 'vimy',
  title: 'Battle of Vimy Ridge',
  date: '9–12 April 1917',
  place: 'Vimy Ridge, near Arras, northern France',
  tagline: 'The Canadian Corps vs. the German Sixth Army',
  confidence: {
    established:    { label: 'Established',    color: '#5fcf8a', desc: 'In the official history (Nicholson, 1962) and agreed by modern historians.' },
    account:        { label: 'One account',    color: '#ffd27a', desc: 'From one participant or witness, such as a Victoria Cross citation or a man’s own report.' },
    disputed:       { label: 'Disputed',       color: '#ff9a86', desc: 'The sources disagree, or historians do.' },
    estimate:       { label: 'Estimate',       color: '#e9c77a', desc: 'An estimate, not an exact figure.' },
    reconstruction: { label: 'Reconstruction', color: '#c8a2ff', desc: 'Our own choice, to make the battle visible: where each unit stood and how it moved.' }
  },
  sides: {
    allied: { name: 'Canadian Corps', short: 'Canadians', army: 'The Canadian Corps under Lieutenant-General Sir Julian Byng', color: '#2e5aa8', light: '#d0dcff' },
    french: { name: 'German Sixth Army', short: 'Germans', army: 'The German Sixth Army (Group Vimy) under General von Falkenhausen', color: '#c0392b', light: '#ffd6d0' }
  },
  welcome: "Welcome to Battles of History. Today we are learning about the Battle of Vimy Ridge, fought from the 9th to the 12th of April 1917, between the Canadian Corps and the German Sixth Army.",
  intro: [
  {
    "title": "BATTLE OF VIMY RIDGE",
    "lines": [
      {
        "text": "On Easter Monday, the 9th of April 1917, the four divisions of the Canadian Corps attacked together for the first time, against a ridge in northern France that the Germans had held since 1914.",
        "tag": "established"
      },
      {
        "text": "This introduction separates what the records show from what we have reconstructed for the map. Watch the colour of each tag.",
        "tag": "reconstruction"
      }
    ],
    "media": [
      {
        "at": 0,
        "file": "cover.jpg",
        "caption": "Will Longstaff, Ghosts of Vimy Ridge (about 1929): the ghosts of the Canadian Corps around the Vimy Memorial",
        "credit": "House of Commons Heritage Collection O-4714. Public domain (the artist died in 1953)"
      },
      {
        "at": 12,
        "file": "35-29th-battalion-advancing-over-no-mans-land.jpg",
        "caption": "The 29th Infantry Battalion advancing over No Man's Land through the German barbed wire and heavy fire during the Battle of Vimy Ridge, April 1917: men in Brodie helmets walk forward through smoke and shell bursts, fallen soldiers in the foreground",
        "credit": "Photo: Capt. H. E. Knobel, Canada, Dept. of National Defence, April 1917. Library and Archives Canada PA-001020. Public domain in Canada (Crown copyright expired; photo before 1949) and in the US (published before 1931). Wikimedia Commons: 29th_Infantry_Batallion_advancing_over_No_man's_Land_through_the_German_barbed_wire (A001020)"
      }
    ],
    "trenches": "trenches-1917-03.png"
  },
  {
    "title": "The ridge",
    "lines": [
      {
        "text": "Vimy Ridge rises gently from the west and falls steeply on its east side to the Douai plain. Its highest point, Hill 145, looks out over the coalfields of Lens and the German rear.",
        "tag": "established"
      },
      {
        "text": "The French lost tens of thousands of men attacking it in 1915. The British took over in 1916 and fought a war underground, of mines and craters. In October 1916 the Canadians arrived.",
        "tag": "established"
      },
      {
        "text": "Whoever held the crest could see everything that moved for miles. That is why it mattered.",
        "tag": "established"
      }
    ],
    "media": [
      {
        "at": 0,
        "file": "22-vimy-from-the-ridge-1917.jpg",
        "caption": "View over the crest of Vimy Ridge to the ruined village of Vimy, April 1917",
        "credit": "William Ivor Castle; LAC PA-001446; PD-Canada. Wikimedia Commons: Vimy_as_seen_from_Vimy_Ridge_1917-04.jpg"
      },
      {
        "at": 14,
        "file": "29-trenches-from-kite-balloon-nov-1917.jpg",
        "caption": "Trenches behind the Canadians at Vimy Ridge, photographed from a kite balloon, November 1917: zig-zag trenches, communication trenches, roads, shell holes and huts seen from above (camera location on Commons: 50°22′11″N 2°47′29″E)",
        "credit": "Canada, Dept. of National Defence, November 1917. Library and Archives Canada PA-002218 (MIKAN 3395593). Public domain in Canada (Crown copyright expired); on Commons via LAC's Flickr under CC BY 2.0. Wikimedia Commons: Trenches_behind_the_Canadians_at_Vimy_Ridge._Photograph_taken_from_a_kite_balloon"
      }
    ],
    "trenches": "trenches-1916-02.png"
  },
  {
    "title": "The plan",
    "lines": [
      {
        "text": "Vimy was the northern part of a larger British offensive at Arras. The Canadians' task was to take the ridge and guard the left flank of the Third Army's attack to the south.",
        "tag": "established"
      },
      {
        "text": "Their commander, Lieutenant-General Sir Julian Byng, planned the attack in four stages, each marked on the map by a coloured line: Black, Red, Blue and Brown. The whole ridge was to be taken in about six hours.",
        "tag": "established"
      },
      {
        "text": "Every man rehearsed his part on a full-size copy of the battlefield, laid out with tape and flags behind the lines. By the day of the attack, all ranks knew just where they had to go.",
        "tag": "established"
      }
    ],
    "media": [
      {
        "at": 0,
        "file": "21-byng-april-1917.jpg",
        "caption": "Lieutenant-General Sir Julian Byng, commander of the Canadian Corps, April 1917, the month of Vimy (negative O-1369)",
        "credit": "Photographer unknown, Canadian official photograph, April 1917. Canadian Museum of History, George Metcalf Archival Collection, CWM 19920085-262; IWM CO 1370. Public domain in Canada (Crown copyright expired; photo before 1949) and in the US (published before 1931). Wikimedia Commons: Julian_Byng_(April_1917).jpg"
      },
      {
        "at": 16,
        "file": "09-pack-horses-ammunition.jpg",
        "caption": "Pack horses carry shells to the 20th Battery, Canadian Field Artillery, through the mud of Neuville-Saint-Vaast, April 1917",
        "credit": "Photo: W. I. Castle; LAC PA-001231 (MIKAN 3194763). Public domain"
      }
    ],
    "trenches": "trenches-1917-03.png"
  },
  {
    "title": "The guns",
    "lines": [
      {
        "text": "Nine hundred and eighty-three guns and mortars supported the Canadians: one heavy gun for every twenty yards of front.",
        "tag": "established"
      },
      {
        "text": "The bombardment began on the 20th of March. From the 2nd of April it rose to a fury the Germans called \"the week of suffering\". More than a million shells fell on the ridge.",
        "tag": "established"
      },
      {
        "text": "A new fuze, the 106, burst shells on contact, cutting the barbed wire that had stopped attacks before.",
        "tag": "established"
      }
    ],
    "media": [
      {
        "at": 0,
        "file": "30-loading-a-large-naval-gun.jpg",
        "caption": "Loading a large naval gun on the Canadian front, taken during the Battle of Vimy Ridge, April 1917: gunners under a timber frame ram a shell into the breech of a heavy gun on caterpillar wheels (negative O-1249)",
        "credit": "Canada, Dept. of National Defence, April 1917. Library and Archives Canada PA-001151 (MIKAN 3517339). Public domain in Canada (Crown copyright expired); on Commons via LAC's Flickr under CC BY 2.0. Wikimedia Commons: Loading_a_large_naval_gun_on_the_Canadian_front,_taken_during_the_Battle_of_Vimy_Ridge"
      },
      {
        "at": 9,
        "file": "32-6-inch-gun-firing-april-1917.jpg",
        "caption": "A British 6-inch Mk VII gun on an improvised \"Percy Scott\" field carriage firing during the Battle of Vimy Ridge, April 1917, its crew standing back from the blast (negative O-1252)",
        "credit": "Canada, Dept. of National Defence, April 1917, photographer not identified. Library and Archives Canada PA-001187 (MIKAN 3521906); LAC: \"Restrictions on use: Nil. Copyright: Expired\". Public domain in Canada and in the US (published before 1931). Wikimedia Commons: 6_inch_Mk_VII_field_gun_firing_LAC_3521906.jpg"
      },
      {
        "at": 22,
        "file": "18-18-pounder-shrapnel-shell-cutaway.jpg",
        "caption": "A cut-away 18-pounder shrapnel shell (Canadian War Museum, artifact 20020045-592): the lead balls set in resin, the powder charge behind them, and the cordite cartridge. The time fuze fired the charge over the target, throwing the balls forward like a shotgun blast against wire and troops",
        "credit": "Photo: Dickbauch, 2005, released into the public domain (File:Sectioned British 18-pounder shrapnel round photograph.jpg)"
      }
    ],
    "trenches": "trenches-1917-03.png"
  },
  {
    "title": "Underground",
    "lines": [
      {
        "text": "Under the Canadian lines, tunnellers dug eleven subways, almost four miles in all, so that the attackers could reach the front unseen and unshelled. Later guides count twelve or thirteen.",
        "tag": "disputed"
      },
      {
        "text": "The Grange Subway, dug by 172 Tunnelling Company of the Royal Engineers, still survives.",
        "tag": "established"
      },
      {
        "text": "Mines were dug under the German line too, but most were never fired: commanders feared new craters would block their own men.",
        "tag": "established"
      }
    ],
    "media": [
      {
        "at": 0,
        "file": "28-mine-exploding-on-vimy-ridge.jpg",
        "caption": "\"A mine exploding on Vimy Ridge\", 1917: a column of earth thrown into the air over the ridge (Canadian official negative O-1455)",
        "credit": "Canadian official photograph, 1917. Archives of Ontario I0004806 (Canadian Expeditionary Force photograph albums). Public domain in Canada (Crown copyright expired; photo before 1949) and in the US (published before 1931). Wikimedia Commons: A_mine_exploding_on_Vimy_Ridge_(I0004806).jpg (1280 px copy; original 2175 × 1637)"
      },
      {
        "at": 18,
        "file": "31-memorial-and-cratered-ground-2009.jpg",
        "caption": "The Canadian National Vimy Memorial on Hill 145 today, beyond the grassed-over shell craters: uncleared ground, still closed to visitors because of unexploded munitions",
        "credit": "Photo: Dhirun4, 12 November 2009. Released into the public domain by the author. Wikimedia Commons: Vimy_ridge_memorial_from_the_nearby_carpark.jpg"
      }
    ],
    "trenches": "trenches-1916-10.png"
  },
  {
    "title": "The defenders",
    "lines": [
      {
        "text": "Three German divisions held the ridge: Bavarians at Thélus, Prussians of the 79th Reserve Division at Vimy, and the 16th Bavarian Division opposite Souchez.",
        "tag": "established"
      },
      {
        "text": "Their front line was a maze of trenches and deep dug-outs. Behind it ran a second line along the crest, and a third on the plain.",
        "tag": "established"
      },
      {
        "text": "But their reserve divisions waited fifteen miles back, too far to help in the first hours.",
        "tag": "established"
      }
    ],
    "media": [
      {
        "at": 0,
        "file": "07-battered-german-trench.jpg",
        "caption": "A battered German trench on Vimy Ridge, captured by the Canadians, April 1917",
        "credit": "Canada, Dept. of National Defence; LAC PA-001150 (MIKAN 3521598). Public domain"
      },
      {
        "at": 16,
        "file": "01-machine-gun-crews.jpg",
        "caption": "Canadian machine gunners dig in, in shell holes on Vimy Ridge, April 1917",
        "credit": "Canada, Dept. of National Defence; Library and Archives Canada PA-001017; IWM CO 1146. Public domain"
      }
    ],
    "trenches": "trenches-1917-03.png"
  }
],
  events: [
  {
    "title": "The night before",
    "clock": "8 April, night",
    "tag": "established",
    "text": "Easter Sunday night. Fifteen thousand men of the first wave file out into no man's land, into shell-holes and ditches, some within a hundred yards of the German outposts. By four o'clock every man is in place, with a hot meal and a rum ration."
  },
  {
    "title": "Zero hour",
    "clock": "9 April, 5:30",
    "tag": "established",
    "text": "At half past five the guns open all at once. Snow and sleet blow from behind the Canadians into the Germans' faces. Twenty-one battalions rise and walk forward behind a curtain of shells that moves a hundred yards every three minutes."
  },
  {
    "title": "The Black Line",
    "clock": "6:15",
    "tag": "established",
    "text": "Many defenders are still in their dug-outs when the Canadians reach the first trench. By a quarter past six the 1st and 2nd Divisions hold the Black Line. The 2nd Canadian Mounted Rifles pull a hundred and fifty surprised Germans out of a single tunnel."
  },
  {
    "title": "Milne and Sifton",
    "clock": "morning",
    "tag": "established",
    "text": "Private William Milne of the 16th Battalion crawls up to a machine-gun that is holding up his company and puts it out of action. Lance-Sergeant Ellis Sifton of the 18th leaps into a German trench, takes a hidden gun, and holds off a counter-attack alone. Both win the Victoria Cross. Both are killed that day."
  },
  {
    "title": "The Red Line and La Folie Farm",
    "clock": "7:00 to 8:00",
    "tag": "established",
    "text": "The 3rd Division crosses the crest and finds La Folie Farm a heap of rubble. In the south, the 21st Battalion finds two German headquarters in a cave under Les Tilleuls. By eight o'clock the right of the corps is on the Red Line."
  },
  {
    "title": "Hill 145",
    "clock": "9 April, morning",
    "tag": "disputed",
    "text": "In the north, the 4th Division meets disaster. A stretch of German trench left untouched by the guns cuts down half the 87th Battalion's first wave. Germans emerge from tunnels behind the attackers, and machine-guns on The Pimple rake the slope. Who asked for that trench to be spared is disputed: the official history blames the 87th's commander; other historians point to Brigadier-General Odlum's own notes."
  },
  {
    "title": "Thélus",
    "clock": "late morning",
    "tag": "established",
    "text": "The reserve brigades pass through to the Blue Line. Thélus falls exactly as the men had rehearsed it. As the snow stops, the sun breaks through. In the official historian's words: \"the Germans saw that the Ridge was lost, the Canadians knew that it was won.\""
  },
  {
    "title": "The Brown Line",
    "clock": "early afternoon",
    "tag": "established",
    "text": "The last stage goes down the steep east face into Farbus Wood and the Bois de la Ville, with a downhill bayonet charge against guns firing point-blank. A Bavarian regimental commander and his staff are captured. By early afternoon three divisions hold their final objectives, on schedule."
  },
  {
    "title": "The cavalry",
    "clock": "4:20 p.m.",
    "tag": "established",
    "text": "Byng sends patrols of the Canadian Light Horse, about twenty men, toward Willerval on the plain. Machine-guns cut them down, but German reports of a strong force of cavalry breaking through cause alarm all along the line."
  },
  {
    "title": "MacDowell",
    "clock": "9 April",
    "tag": "established",
    "text": "On Hill 145, Captain Thain MacDowell of the 38th Battalion and two runners, Kobus and Hay, find a deep German dug-out. MacDowell convinces the men inside that he has a large force behind him. Two officers and seventy-five men surrender to three Canadians. He wins the Victoria Cross."
  },
  {
    "title": "Hill 145 falls",
    "clock": "10 April, 3:15 p.m.",
    "tag": "established",
    "text": "The 10th Brigade, held back for The Pimple, is sent in instead. The 44th and 50th Battalions charge down the eastern slope and take the summit. Private John Pattison of the 50th destroys a machine-gun post and wins the Victoria Cross."
  },
  {
    "title": "The Pimple",
    "clock": "12 April, 5:00",
    "tag": "established",
    "text": "In a gale of snow and sleet, the 44th, 50th and 46th Battalions attack The Pimple, held by fresh Prussian Guards. By six o'clock it is taken. At daybreak the sky clears, and the Canadians look out over the Douai plain and the suburbs of Lens."
  },
  {
    "title": "The cost",
    "clock": "9–14 April",
    "tag": "established",
    "text": "The whole ridge is in Canadian hands. More than four thousand prisoners and fifty-four guns are taken. The Canadian Corps loses 10,602 men, 3,598 of them killed."
  }
],
  outcome: [
  {
    "text": "The Germans fell back to a new line on the plain. The ridge stayed in Allied hands for the rest of the war.",
    "tag": "established"
  },
  {
    "text": "Vimy was a local victory inside a larger battle at Arras that did not break through. Four months later the Canadians were still fighting near Lens.",
    "tag": "established"
  },
  {
    "text": "For the first time, all four Canadian divisions had fought together. Arthur Currie, who led the 1st Division, soon commanded the whole Corps.",
    "tag": "established"
  },
  {
    "text": "In Canada, Vimy became a symbol of the nation's coming of age. Historians debate how much of that was the battle, and how much the meaning given to it later.",
    "tag": "disputed"
  },
  {
    "text": "On Hill 145 today stands the Canadian National Vimy Memorial, with the names of more than eleven thousand Canadians killed in France who have no known grave.",
    "tag": "established"
  }
]
});

/* ======================================================================================================================
   Maps, armies, leaders and their moves.
     battle map  images/terrain-battle.jpg  50.402–50.322 N, 2.710–2.877 E (about 11.9 x 8.9 km, 2400 x 1800 world px, ~5 m per px)
   The front lines and the Black, Red, Blue and Brown objective lines are in lines.js (window.VIMY_LINES), traced from
   Nicholson's Map 7 lined up to the ground. The trench layers (images/trenches/) are traced from the NLS trench maps
   (tools/trench-georef/), coloured as on the 1917 maps: German red, Allied blue, as are the armies.
   Where each formation stood and how it moved, between those lines, is our reconstruction.
   ====================================================================================================================== */
(() => {
  const S = window.VIMY_SCENARIO, L = window.VIMY_LINES || {}, PL = L.places || {};
  const pt = (a) => ({ x: a[0], y: a[1] });
  // x of a traced line at height y (lines run north to south)
  const xAt = (poly, y) => { for (let i = 0; i < poly.length - 1; i++) { const [x0, y0] = poly[i], [x1, y1] = poly[i + 1]; if ((y - y0) * (y - y1) <= 0 && y1 !== y0) return x0 + (x1 - x0) * (y - y0) / (y1 - y0); } return (y < poly[0][1] ? poly[0] : poly[poly.length - 1])[0]; };
  const along = (poly, ys) => ys.map(y => [Math.round(xAt(poly, y)), y]);
  const on = (poly, y, dx) => ({ x: Math.round(xAt(poly, y) + (dx || 0)), y });
  const YS = [300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600];
  const YS_SOUTH = [700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600];
  const HILL145 = pt(PL.hill145 || [917, 502]), PIMPLE = pt(PL.pimple || [820, 140]), FOLIE = pt(PL.laFolieFarm || [1150, 740]), THELUS = pt(PL.thelus || [1300, 1080]),
        FARBUS = pt(PL.farbus || [1650, 1000]), VIMY = pt(PL.vimy || [1400, 620]), NEUVILLE = pt(PL.neuville || [700, 1040]), GIVENCHY = pt(PL.givenchy || [1000, 200]),
        WILLERVAL = { x: 1997, y: 1034 }, TILLEULS = { x: 1180, y: 1050 };

  Object.assign(S, {
    titleCard: {
      title: 'BATTLE OF VIMY RIDGE', date: '9–12 April 1917',
      dateNote: 'On Easter Monday the four divisions of the Canadian Corps attack together for the first time, behind a creeping barrage, against a ridge the Germans had held since 1914.',
      dateRef: 'G. W. L. Nicholson, Canadian Expeditionary Force 1914–1919 (1962), ch. VIII',
      place: 'Vimy Ridge, near Arras, northern France',
      sides: 'The Canadian Corps under Sir Julian Byng  ·  The German Sixth Army'
    },
    world: { w: 2400, h: 1800 },
    terrain: 'terrain-battle.jpg',
    trenchLayers: ['trenches-1916-02.png', 'trenches-1916-10.png', 'trenches-1917-03.png'],
    defaultTrench: 'trenches-1917-03.png', introTrench: 'trenches-1917-03.png', trenchAlpha: .45,
    duration: 182, commandDuration: 300, commandFocus: { x: 1100, y: 800 },
    battlefield: {
      scale: { px: 202, label: '1 km' },
      labels: [
        Object.assign({}, HILL145, { y: HILL145.y - 40, text: 'Hill 145', small: true }), Object.assign({}, PIMPLE, { y: PIMPLE.y - 30, text: 'The Pimple', small: true }),
        Object.assign({}, FOLIE, { y: FOLIE.y + 40, text: 'La Folie Farm', small: true }), Object.assign({}, THELUS, { y: THELUS.y + 50, text: 'Thélus', small: true }),
        Object.assign({}, FARBUS, { y: FARBUS.y + 50, text: 'Farbus', small: true }), Object.assign({}, VIMY, { y: VIMY.y + 50, text: 'Vimy', small: true }),
        Object.assign({}, NEUVILLE, { y: NEUVILLE.y + 60, text: 'Neuville-St-Vaast', small: true }), Object.assign({}, GIVENCHY, { y: GIVENCHY.y + 50, text: 'Givenchy', small: true }),
        { x: 543, y: 290, text: 'Souchez', small: true }, { x: 1997, y: 1090, text: 'Willerval', small: true }
      ]
    },
    globe: { target: { lon: 2.77, lat: 50.37 }, region: { lon: 3.2, lat: 49.4 }, pull: 3.2, startLat: 35,
      periodNote: 'Western Europe in April 1917',
      stop2: { center: { lon: 2.8, lat: 50.38 }, pull: 34, todayNote: 'Today’s towns and cities', thenNote: 'Towns of April 1917' },
      labels: [
        { lon: 2.3522, lat: 48.8566, text: 'Paris', size: .55, dot: true }, { lon: -0.1276, lat: 51.5072, text: 'London', size: .55, dot: true },
        { lon: 4.3517, lat: 50.8503, text: 'Brussels', size: .5, dot: true },
        { lon: 2.77, lat: 50.37, text: 'VIMY RIDGE', size: .85, pin: true, early: true }
      ] },
    establishing: [],
    imageBase: 'images/', audioBase: 'audio/',
    voices: [
      { id: 'clear',    name: 'Narrator 1 · clear',  speaker: 25 },
      { id: 'light',    name: 'Narrator 2 · light',  speaker: 60 },
      { id: 'bright',   name: 'Narrator 3 · bright', speaker: 0 },
      { id: 'deep',     name: 'Narrator 4 · deep',   speaker: 400 },
      { id: 'warm',     name: 'Narrator 5 · warm',   speaker: 7 },
      { id: 'computer', name: 'Computer · calm',     speaker: 500 }
    ],
    attackSheets: { 'canadian-infantry': 'canadian-infantry-attack', 'canadian-lewis-gunner': 'canadian-lewis-fire', 'german-infantry': 'german-infantry-attack' },
    fallen: { bySide: { allied: 'fallen-canadian', french: 'fallen-german' } },
    sheets: ['canadian-infantry', 'canadian-lewis-gunner', 'canadian-bomber', 'german-infantry', 'german-machine-gun-fire', 'german-prisoners',
             'stretcher-bearers', 'mounted-messenger-optional', 'german-field-artillery', 'canadian-mortar-crew'],
    sheetBy: { allied: { infantry: 'canadian-infantry', archers: 'canadian-lewis-gunner', cavalry: 'mounted-messenger-optional' },
               french: { infantry: 'german-infantry', archers: 'german-infantry', cavalry: 'german-machine-gun-fire' } },
    sideArt: { allied: { cloth: '#7a6a44', cloth2: '#5a4e34', pennant: '#2e5aa8' }, french: { cloth: '#5d655a', cloth2: '#4a5048', pennant: '#c0392b' } },
    ai: { plans: {} }, commandLines: {},
    debrief: { allied: { victory: { title: 'Canadian victory', text: '' }, defeat: { title: 'Canadian defeat', text: '' }, stalemate: { title: 'Stalemate', text: '' } },
               french: { victory: { title: 'German victory', text: '' }, defeat: { title: 'German defeat', text: '' }, stalemate: { title: 'Stalemate', text: '' } } }
  });
  S.sides.allied.rally = { x: 400, y: 900 }; S.sides.french.rally = { x: 2200, y: 800 };

  /* ---------- the armies: four Canadian divisions (north to south 4th, 3rd, 2nd, 1st) and the British 13th Brigade;
     three German divisions (16th Bavarian, 79th Reserve, 1st Bavarian Reserve) ---------- */
  const F = (o) => Object.assign({ power: 1, confidence: 'reconstruction' }, o);
  const CF = L.canadianFront || [[800, 0], [800, 1800]], GF = L.germanFront || [[850, 0], [850, 1800]];
  const start = (y, dx) => on(CF, y, dx === undefined ? -60 : dx), gstart = (y, dx) => on(GF, y, dx === undefined ? 70 : dx);
  S.formations = [
    F({ id: 'c4', side: 'allied', name: '4th Canadian Division', division: '4th Division', type: 'infantry', cols: 7, rows: 3, power: 1.1, ...start(450), count: 'About 15,000 men in the division (estimate)', note: 'In the north, facing Hill 145, the highest point of the ridge.' }),
    F({ id: 'c3', side: 'allied', name: '3rd Canadian Division', division: '3rd Division', type: 'infantry', cols: 7, rows: 3, power: 1.1, ...start(760), note: 'Facing La Folie Farm and the crest.' }),
    F({ id: 'c2', side: 'allied', name: '2nd Canadian Division', division: '2nd Division', type: 'infantry', cols: 7, rows: 3, power: 1.1, ...start(1110), note: 'Facing Les Tilleuls and Thélus.' }),
    F({ id: 'b13', side: 'allied', name: 'British 13th Brigade (5th Division)', division: '2nd Division', type: 'infantry', cols: 5, rows: 2, ...start(1270, -110), note: 'A British brigade under the 2nd Canadian Division for the attack.' }),
    F({ id: 'c1', side: 'allied', name: '1st Canadian Division', division: '1st Division', type: 'infantry', cols: 7, rows: 3, power: 1.1, ...start(1470), note: 'In the south, toward Farbus Wood. Led by Arthur Currie.' }),
    F({ id: 'cmg', side: 'allied', name: 'Lewis gunners', division: '1st Division', type: 'archers', cols: 4, rows: 1, ...start(1380, -90), note: 'Each platoon had its own Lewis light machine-gun.' }),
    F({ id: 'c10', side: 'allied', name: '10th Canadian Brigade', division: '4th Division', type: 'infantry', sheet: 'canadian-bomber', cols: 5, rows: 2, ...start(260, -120), note: 'Held back for the Pimple; sent to finish Hill 145 on 10 April.' }),
    F({ id: 'clh', side: 'allied', name: 'Canadian Light Horse', division: 'Corps troops', type: 'cavalry', cols: 3, rows: 1, power: .5, x: 500, y: 1320, note: 'Cavalry patrols, about twenty men, sent toward Willerval in the afternoon.' }),
    F({ id: 'cmort', side: 'allied', name: 'Trench mortars', division: 'Corps troops', type: 'infantry', sheet: 'canadian-mortar-crew', cols: 3, rows: 1, power: .4, x: 560, y: 900, note: 'Part of the 983 guns and mortars of the bombardment.' }),
    F({ id: 'g16', side: 'french', name: '16th Bavarian Division', division: '16th Bavarian', type: 'infantry', cols: 6, rows: 2, ...gstart(250), note: 'Opposite Souchez and the Pimple.' }),
    F({ id: 'g79a', side: 'french', name: '79th Reserve Division (Hill 145)', division: '79th Reserve', type: 'infantry', cols: 6, rows: 2, ...gstart(520), note: 'Prussians holding Hill 145 and the crest.' }),
    F({ id: 'gmg1', side: 'french', name: 'Machine-guns on Hill 145', division: '79th Reserve', type: 'cavalry', cols: 2, rows: 1, power: 1.2, x: HILL145.x + 20, y: HILL145.y + 30, note: 'Machine-gun posts in deep dug-outs.' }),
    F({ id: 'g79b', side: 'french', name: '79th Reserve Division (La Folie)', division: '79th Reserve', type: 'infantry', cols: 6, rows: 2, ...gstart(820), note: 'Holding the crest at La Folie Farm.' }),
    F({ id: 'g1a', side: 'french', name: '1st Bavarian Reserve Division (Thélus)', division: '1st Bavarian Reserve', type: 'infantry', cols: 6, rows: 2, ...gstart(1150), note: 'Bavarians in front of Thélus.' }),
    F({ id: 'gmg2', side: 'french', name: 'Machine-guns at Les Tilleuls', division: '1st Bavarian Reserve', type: 'cavalry', cols: 2, rows: 1, x: TILLEULS.x, y: TILLEULS.y, note: 'Machine-gun posts in the second line.' }),
    F({ id: 'g1b', side: 'french', name: '1st Bavarian Reserve Division (Farbus)', division: '1st Bavarian Reserve', type: 'infantry', cols: 6, rows: 2, ...gstart(1450), note: 'The southern end of the ridge, toward Farbus.' }),
    F({ id: 'gguns', side: 'french', name: 'German field guns, Farbus Wood', division: '1st Bavarian Reserve', type: 'cavalry', sheet: 'german-field-artillery', cols: 3, rows: 1, power: .6, x: FARBUS.x - 40, y: FARBUS.y + 80, note: 'Guns firing point-blank at the last Canadian charge.' }),
    F({ id: 'gguard', side: 'french', name: 'Prussian Guards (the Pimple)', division: '16th Bavarian', type: 'infantry', cols: 4, rows: 2, hidden: true, x: PIMPLE.x + 60, y: PIMPLE.y + 10, note: 'Fresh troops of the 5th Guard Grenadiers on the Pimple, 12 April.' }),
    F({ id: 'gpris', side: 'french', name: 'German prisoners', division: '79th Reserve', type: 'infantry', sheet: 'german-prisoners', cols: 4, rows: 2, power: .1, hidden: true, x: HILL145.x + 40, y: HILL145.y + 20, note: 'Seventy-seven men taken in one dug-out by MacDowell and two runners.' }),
    F({ id: 'csb', side: 'allied', name: 'Stretcher-bearers', division: 'Corps troops', type: 'cavalry', sheet: 'stretcher-bearers', cols: 2, rows: 1, power: .05, hidden: true, x: 820, y: 560, note: 'Bringing in the wounded.' })
  ];
  S.leaders = [
    { id: 'byng', name: 'Lt-Gen Sir Julian Byng', side: 'allied', x: 260, y: 820 },
    { id: 'currie', name: 'Maj-Gen Arthur Currie', side: 'allied', x: 560, y: 1500 },
    { id: 'macdowell', name: 'Capt. Thain MacDowell', side: 'allied', x: start(470).x + 20, y: 470 },
    { id: 'german-officer', name: 'German battalion commander', side: 'french', x: FARBUS.x - 120, y: FARBUS.y + 20 }
  ];

  /* ---------- what happens in each chapter ---------- */
  const EV = S.events; EV.forEach((e, i) => { e.clipNo = i + 1; e.orders = e.orders || []; e.t = i * 14; });
  const set = (i, o) => Object.assign(EV[i], o);
  const B = (a, b) => ({ from: along(a, YS_SOUTH), to: along(b, YS_SOUTH), secs: 13, rate: .95 });
  const BN = (a, b) => ({ from: along(a, YS), to: along(b, YS), secs: 13, rate: .95 });
  const M = f => f;   // picture file
  set(0, { media: M('33-lorry-on-shell-battered-road.jpg'), zoom: 'fit', markers: [], orders: [
    ...[['c4', 450], ['c3', 760], ['c2', 1110], ['c1', 1470]].map(([id, y]) => ({ id, to: on(CF, y, -12), speed: 14 })),
    { id: 'b13', to: on(CF, 1290, -14), speed: 14 } ] });
  set(1, { media: M('08-richard-jack-taking-of-vimy-ridge.jpg'), zoom: 'fit', barrage: BN(GF, L.black || GF), orders: [
    ...[['c4', 450], ['c3', 760], ['c2', 1110], ['c1', 1470]].map(([id, y]) => ({ id, to: on(GF, y, 20), speed: 16, state: 'attack' })),
    { id: 'b13', to: on(GF, 1290, 20), speed: 16, state: 'attack' }, { id: 'cmg', to: on(GF, 1380, -10), speed: 14 } ] });
  set(2, { media: M('35-29th-battalion-advancing-over-no-mans-land.jpg'), focus: { x: 1080, y: 1150 }, zoom: 2, orders: [
    ...[['c3', 760], ['c2', 1110], ['c1', 1470]].map(([id, y]) => ({ id, to: on(L.black, y, 10), speed: 18, state: 'attack' })),
    { id: 'b13', to: on(L.black, 1290, 10), speed: 18, state: 'attack' },
    { id: 'g79b', strengthTo: 55, over: 10 }, { id: 'g1a', strengthTo: 50, over: 10 }, { id: 'g1b', strengthTo: 55, over: 10 } ] });
  set(3, { media: M('36-advancing-through-german-wire.jpg'), focus: { x: 1150, y: 1300 }, zoom: 2.64, barrage: B(L.black, L.red),
    markers: [ { x: 1150, y: 1450, label: 'Milne, 16th Battalion' }, { x: 1120, y: 1180, label: 'Sifton, 18th Battalion' } ], orders: [
    { id: 'c1', strengthTo: 85, over: 10 }, { id: 'c2', strengthTo: 88, over: 10 }, { id: 'gmg2', strengthTo: 40, over: 10 } ] });
  set(4, { media: M('37-germans-leaving-dugouts-as-canadians-advance.jpg'), focus: FOLIE, zoom: 2,
    markers: [ Object.assign({ label: 'La Folie Farm' }, FOLIE), Object.assign({ label: 'the cave at Les Tilleuls' }, TILLEULS) ], orders: [
    { id: 'c3', to: { x: FOLIE.x + 30, y: FOLIE.y + 20 }, speed: 18, state: 'attack' },
    ...[['c2', 1110], ['c1', 1470]].map(([id, y]) => ({ id, to: on(L.red, y, 10), speed: 18, state: 'attack' })), { id: 'b13', to: on(L.red, 1290, 10), speed: 18, state: 'attack' },
    { id: 'g79b', state: 'rout', to: { x: VIMY.x, y: VIMY.y + 60 }, speed: 18 }, { id: 'gmg2', strengthTo: 0, over: 6 } ] });
  set(5, { media: M('06-bringing-in-the-wounded.jpg'), focus: HILL145, zoom: 2.86, markers: [ Object.assign({ label: 'Hill 145' }, HILL145), Object.assign({ label: 'machine-guns on the Pimple' }, PIMPLE) ], orders: [
    { id: 'c4', to: { x: HILL145.x - 40, y: HILL145.y + 10 }, speed: 14, state: 'attack' }, { id: 'c4', strengthTo: 55, over: 12 },
    { id: 'gmg1', strengthTo: 85, over: 12 }, { id: 'g16', strengthTo: 90, over: 12 } ] });
  set(6, { media: M('03-consolidating-positions.jpg'), focus: THELUS, zoom: 2, barrage: B(L.red, L.blue), orders: [
    ...[['c2', 1110], ['c1', 1450]].map(([id, y]) => ({ id, to: on(L.blue, y, -10), speed: 20, state: 'attack' })), { id: 'b13', to: on(L.blue, 1290, -10), speed: 20, state: 'attack' },
    { id: 'g1a', state: 'rout', to: { x: FARBUS.x + 80, y: FARBUS.y - 40 }, speed: 20 }, { id: 'g1a', strengthTo: 20, over: 10 } ] });
  set(7, { media: M('02-28th-battalion-signal-station.jpg'), focus: FARBUS, zoom: 2.2, barrage: B(L.blue, L.brown), orders: [
    ...[['c2', 1120], ['c1', 1450]].map(([id, y]) => ({ id, to: on(L.brown, y, -10), speed: 20, state: 'attack' })), { id: 'b13', to: on(L.brown, 1290, -10), speed: 20, state: 'attack' },
    { id: 'gguns', strengthTo: 0, over: 10 }, { leader: 'german-officer', visible: false },
    { id: 'g1b', state: 'rout', to: { x: 2300, y: 1450 }, speed: 22 }, { id: 'g1a', state: 'rout', to: { x: 2300, y: 1150 }, speed: 22 } ] });
  set(8, { media: M('25-canadian-light-horse-going-into-action.jpg'), focus: { x: 1850, y: 1050 }, zoom: 2, markers: [ Object.assign({ label: 'Willerval' }, WILLERVAL) ], orders: [
    { id: 'clh', to: { x: WILLERVAL.x - 60, y: WILLERVAL.y + 20 }, via: [on(L.brown, 1100, 20)], speed: 50, state: 'attack' }, { id: 'clh', strengthTo: 30, over: 8, delay: 6 } ] });
  set(9, { media: M('22-vimy-from-the-ridge-1917.jpg'), focus: HILL145, zoom: 3.3, markers: [ { x: HILL145.x + 40, y: HILL145.y + 20, label: 'the dug-out' } ], orders: [
    { leader: 'macdowell', to: { x: HILL145.x + 20, y: HILL145.y + 30 }, speed: 12 },
    { id: 'gpris', visible: true }, { id: 'gpris', to: { x: 520, y: 520 }, speed: 10, delay: 5 }, { id: 'csb', visible: true }, { id: 'csb', to: { x: 520, y: 600 }, speed: 8, delay: 2 } ] });
  set(10, { media: M('23-shrapnel-over-troops-digging-in.jpg'), focus: HILL145, zoom: 2.42, markers: [ Object.assign({ label: 'Hill 145 falls' }, HILL145) ], orders: [
    { id: 'c10', to: { x: HILL145.x + 60, y: HILL145.y + 10 }, via: [{ x: 760, y: 470 }], speed: 22, state: 'attack' },
    { id: 'gmg1', strengthTo: 0, over: 8 }, { id: 'g79a', state: 'rout', to: { x: VIMY.x - 40, y: VIMY.y - 80 }, speed: 18, delay: 4 }, { id: 'g79a', strengthTo: 25, over: 10 } ] });
  set(11, { media: M('01-machine-gun-crews.jpg'), focus: PIMPLE, zoom: 3.08, markers: [ Object.assign({ label: 'The Pimple, 12 April' }, PIMPLE) ], orders: [
    { id: 'gguard', visible: true }, { id: 'c10', to: { x: PIMPLE.x + 40, y: PIMPLE.y + 20 }, via: [{ x: 760, y: 300 }], speed: 20, state: 'attack' },
    { id: 'gguard', strengthTo: 10, over: 10 }, { id: 'g16', state: 'rout', to: { x: 1300, y: 150 }, speed: 20, delay: 5 } ] });
  set(12, { media: M('27-bush-a-cemetery-on-vimy-ridge.jpg'), zoom: 'fit', markers: [], orders: [ { leader: 'byng', to: { x: 700, y: 820 }, speed: 30 } ] });
  EV[12].end = false;

  /* ---------- the armies panel, the citations and the sources ---------- */
  S.units = [
    { side: 'allied', type: 'infantry', name: 'Canadian infantry', desc: 'Khaki service dress, the Brodie steel helmet and the Lee-Enfield rifle.', tag: 'established',
      lines: [ { text: 'Four Canadian divisions, about a hundred thousand men in the Corps with its supporting troops, attacked together for the first time.', tag: 'established' } ] },
    { side: 'allied', type: 'archers', name: 'Lewis gunners', desc: 'A light machine-gun with a round drum magazine, carried with each platoon.', tag: 'established',
      lines: [ { text: 'New platoon tactics gave every platoon its own Lewis gun, rifle grenades and bombers, so it could fight its way forward on its own.', tag: 'established' } ] },
    { side: 'allied', type: 'infantry', sheet: 'canadian-mortar-crew', portrait: 'canadian-artillery', name: 'Canadian guns and mortars', desc: 'The 18-pounder field gun and the trench mortar: 983 guns and mortars supported the attack.', tag: 'established',
      lines: [ { text: 'One heavy gun for every twenty yards of front. The creeping barrage moved a hundred yards every three minutes, with the infantry close behind it.', tag: 'established' } ] },
    { side: 'allied', type: 'infantry', portrait: 'british-infantry', name: 'British 13th Brigade', desc: 'A brigade of the British 5th Division, attacking with the 2nd Canadian Division.', tag: 'established',
      lines: [ { text: 'British troops fought inside the Canadian Corps at Vimy, and British gunners and tunnellers did much of the work underground and behind the lines.', tag: 'established' } ] },
    { side: 'french', type: 'infantry', name: 'German infantry', desc: 'Field-grey uniform, the 1916 steel helmet and the Gewehr 98.', tag: 'established',
      lines: [ { text: 'Three German divisions held the ridge, in deep dug-outs behind thick belts of wire.', tag: 'established' } ] },
    { side: 'french', type: 'cavalry', portrait: 'german-infantry', name: 'German machine-guns', desc: 'The MG 08, water-cooled, fired from posts in the trench lines.', tag: 'established',
      lines: [ { text: 'Machine-guns that survived the bombardment caused most of the Canadian losses, above all on Hill 145.', tag: 'established' } ] }
  ];
  const C = (title, intro, items) => ({ title, intro, items: items.map(([ref, note]) => ({ ref, note })) });
  S.citations = {
    established: C('Established', 'In the official history and agreed by modern historians.', [['G. W. L. Nicholson, Canadian Expeditionary Force 1914–1919 (1962), ch. VIII, pp. 233–268', 'The plan, the guns, the attack hour by hour, the losses.'], ['A. Godefroy; T. Cook; G. Hayes et al., Vimy Ridge: A Canadian Reassessment (2007)', 'Modern assessments.']]),
    account: C('One account', 'From one participant or witness.', [['Victoria Cross citations, London Gazette', 'Milne, Sifton, MacDowell, Pattison.']]),
    disputed: C('Disputed', 'The sources disagree, or historians do.', [['Nicholson v. later historians', 'Who asked for the trench on Hill 145 to be spared.'], ['Nicholson v. Veterans Affairs Canada', 'How many subways were dug: eleven or thirteen.']]),
    estimate: C('Estimate', 'An estimate, not an exact figure.', [['Official and modern histories', 'Strengths of the divisions.']]),
    reconstruction: C('Reconstruction', 'Our own choice, to make the battle visible.', [['Battle Games', 'Where each unit stood and how it moved between the traced lines; the painted map.']])
  };
  S.sources = [
    { title: 'G. W. L. Nicholson, Canadian Expeditionary Force 1914–1919 (Ottawa, 1962), chapter VIII and Map 7', note: 'The official history; free from the Department of National Defence.' },
    { title: 'M. Boire, “The Underground War: Military Mining Operations in Support of the Attack on Vimy Ridge”, Canadian Military History 1 (1992)', note: 'The tunnels, subways and mines.' },
    { title: 'Veterans Affairs Canada, Vimy: Tunnels and Trenches (2021)', note: 'The Grange Subway and the preserved trenches.' },
    { title: 'British trench maps, 1916–1917 (National Library of Scotland, CC BY)', note: 'Sheets 36C SW and 51B NW: the trenches on the map, traced for this page.' },
    { title: 'London Gazette nos. 30122 and 30215 (1917)', note: 'The Victoria Cross citations.' }
  ];

  /* ---------- the introduction: briefing marks on the map ---------- */
  const I = S.intro;
  const ring = (p, label, o) => ({ ring: Object.assign({}, p, { label }, o || {}) });
  const arrow = (pts, label, o) => ({ arrow: Object.assign({ pts: pts.map(p => [p.x, p.y]), label }, o || {}) });
  const unit = (p, o) => ({ unit: Object.assign({}, p, o) });
  I[0].cues = [ Object.assign({ on: 'four divisions' }, unit({ x: 650, y: 950 }, { side: 'allied', size: 'XXXX', label: 'Canadian Corps' })), Object.assign({ on: 'held since 1914' }, ring(HILL145, 'Vimy Ridge', { r: 160 })) ];
  I[1].cues = [ Object.assign({ on: 'Hill 145' }, ring(HILL145, 'Hill 145', { r: 50 })), Object.assign({ on: 'Douai plain' }, ring({ x: 2000, y: 900 }, 'the Douai plain', { r: 160 })),
                Object.assign({ on: 'underground' }, ring({ x: 830, y: 480 }, 'the crater line', { r: 70 })) ];
  I[2].cues = [ Object.assign({ on: 'Black, Red, Blue and Brown' }, arrow(L.black.map(pt), 'Black Line', { col: '#111' })), Object.assign({ on: 'Red' }, arrow(L.red.map(pt), 'Red Line', { col: '#c0392b' })),
                Object.assign({ on: 'Blue' }, arrow(L.blue.map(pt), 'Blue Line', { col: '#2e5aa8' })), Object.assign({ on: 'Brown' }, arrow(L.brown.map(pt), 'Brown Line', { col: '#8a5a2a' })) ];
  I[4].cues = [ Object.assign({ on: 'eleven subways' }, ring({ x: 780, y: 650 }, 'the subways', { r: 90 })) ];
  I[5].cues = [ Object.assign({ on: 'Bavarians at Thélus' }, ring(THELUS, 'Bavarians', { r: 80 })), Object.assign({ on: '79th Reserve' }, ring(VIMY, 'Prussians, 79th Reserve', { r: 80 })),
                Object.assign({ on: '16th Bavarian' }, ring(PIMPLE, '16th Bavarian', { r: 80 })) ];
})();

/* ---------- the library of sources (library.html?battle=vimy) ---------- */
Object.assign(window.VIMY_SCENARIO, {


  library: (() => {
    const NLS = 'Ordnance Survey / Field Survey (GSGS), Crown copyright expired. Scan: National Library of Scotland, CC BY ("Reproduced with the permission of the National Library of Scotland").';
    const M = (id, title, year, about) => ({ title, author: 'British Army trench map (Ordnance Survey / GSGS)', year, kind: 'Trench map',
      about, citedIn: 'The trenches-and-tunnels timeline', rights: NLS, local: 'trench-maps/nls/nls-' + id + '.jpg', localLabel: '🗺 Open the map (large image) ▸',
      link: 'https://maps.nls.uk/view/' + id, linkLabel: 'National Library of Scotland viewer' });
    return [
      { title: 'Canadian Expeditionary Force 1914–1919', author: 'G. W. L. Nicholson', year: 1962, kind: 'Official history',
        about: 'The official history of the Canadian Army in the First World War. Chapter VIII (pp. 233–268) is the Battle of Vimy Ridge; Map 7 shows the Black, Red, Blue and Brown lines and the advance of 9–12 April.',
        citedIn: 'The narration and the battle lines', rights: 'Canadian Crown copyright, 1962; public domain in Canada.', localLabel: '🗺 Map 7',
        local: 'nicholson-map7-vimy-ridge-9-12-april-1917.jpg', localNote: 'The full book is free from the Department of National Defence (Directorate of History and Heritage).' },
      M('101465023', 'Sheet 36C S.W. (Vimy–Lens), 1:20,000, Edition 6', 'Trenches to 15 February 1916', 'The whole of Vimy Ridge and Lens while the French still held the line, a month before the British took over. German trenches in red, French and British in blue.'),
      M('101465071', 'Sheet 51B N.W. (Arras), 1:20,000, Edition 4A', 'Trenches to 10 October 1916', 'The south half of the ridge (Neuville-St-Vaast, Thélus, Farbus) as the Canadian Corps arrived.'),
      M('101464753', 'Sheet 51B.NW.1 Roclincourt, 1:10,000, Edition 5A', 'Trenches to 27 December 1916', 'The south half of the battlefield in fine detail, every German trench named: Zwölfer Graben, Hapsburger Weg, the Albrecht Stellung.'),
      M('101464744', 'Sheet 36C.SW.1 Lens, 1:10,000, Edition 8A', 'Trenches to 10 February 1917', 'Lens, Liévin and Angres: the north-east edge of the battlefield, toward the Pimple.'),
      M('101465068', 'Sheet 51B N.W. (Arras), 1:20,000, Edition 6A', 'Trenches to 4 March 1917', 'Five weeks before the attack: the trench system the Canadians faced on 9 April.'),
      M('101465065', 'Sheet 51B N.W. (Arras), 1:20,000, Edition 7A', 'Trenches to 25 May 1917', 'After the battle: the new front on the plain below the ridge.')
    ];
  })()
});
