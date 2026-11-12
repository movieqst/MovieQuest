/*
  Historical Scenario File — Battle of Vukovar, 1991
  -----------------------------------------------------------------
  The narrated introduction (`intro`), the reenactment chapters (`events`), the debrief (`outcome`) and the captions of the
  "From the record" pictures (`record`), word for word from NARRATION-SCRIPT.md (draft 3, approved: ready to record).
  This part is written by tools/make-scenario-text.py; the maps, armies and moves are set in the block below the marker line.
*/
window.VUKOVAR_SCENARIO = window.VUKOVAR_SCENARIO || {};
Object.assign(window.VUKOVAR_SCENARIO, {
  id: 'vukovar',
  title: 'Battle of Vukovar',
  date: '25 August – 18 November 1991',
  place: 'Vukovar, on the Danube in eastern Croatia (then in Yugoslavia)',
  tagline: 'The Yugoslav People’s Army and the forces with it vs. the Croatian defenders of Vukovar',
  confidence: {
    established:    { label: 'Established',      color: '#5fcf8a', desc: 'Supported by reliable evidence (the source is named in the notes).' },
    icty:           { label: 'ICTY finding',     color: '#9fd0ff', desc: 'Found by the judges of the International Criminal Tribunal for the former Yugoslavia (Mrkšić et al., 2007; review 2010). Accusations and witness statements are not findings.' },
    croatian:       { label: 'Croatian account', color: '#e6a0c8', desc: 'From a Croatian institution, historian, participant or newspaper.' },
    serbian:        { label: 'Serbian account',  color: '#f0b46a', desc: 'From a Serbian institution, participant, newspaper or the JNA; a Serbian human-rights group is named as such.' },
    disputed:       { label: 'Disputed',         color: '#ff9a86', desc: 'Sources disagree: the line says who says what, or uses wording true in every version.' },
    estimate:       { label: 'Estimate',         color: '#e9c77a', desc: 'An approximate number, with what it counts and who counted it.' },
    reconstruction: { label: 'Reconstruction',   color: '#c8a2ff', desc: 'Our own placing on the map: unit positions and moves, and anything the CIA map does not draw for that day.' },
    editorial:      { label: 'About this page',  color: '#9aa6ab', desc: 'How this page works: not a claim about the past.' }
  },
  // Colours: the first-named side red (the JNA and the forces with it), the second blue (the Croatian defenders).
  sides: {
    allied: { name: 'The JNA, the Territorial Defence and volunteer units', short: 'JNA', army: 'The Yugoslav People’s Army (JNA), with the local Serb Territorial Defence and volunteer units', color: '#c0392b', light: '#ffd6d0' },
    french: { name: 'The Croatian defenders', short: 'Defenders', army: 'The Croatian National Guard, the police and local volunteers (the 204th Vukovar Brigade)', color: '#2e5aa8', light: '#d0dcff' }
  },
  welcome: "Welcome to Battles of History. Today we are learning about the Battle of Vukovar, fought in the autumn of 1991 in a town on the river Danube, in eastern Croatia. On one side were the Yugoslav People's Army, the JNA, with Territorial Defence units and volunteer groups. On the other were Croatian defenders: the National Guard, the police and local volunteers. The siege lasted about three months, and when it ended the town lay in ruins. This is a recent war, and people in Croatia and in Serbia still feel it deeply. We will tell you what is known, and who says what.",
  intro: [
  {
    "title": "BATTLE OF VUKOVAR",
    "lines": [
      {
        "text": "From late August to the eighteenth of November 1991, the JNA and the forces fighting with it besieged the town of Vukovar. Its defenders held out for about three months before the town fell.",
        "tag": "established"
      },
      {
        "text": "Thousands of people were killed or went missing, soldiers and civilians, and most of the town was destroyed. After the fall, prisoners were taken from the town's hospital and killed. An international court later judged that crime.",
        "tag": [
          "established",
          "icty"
        ]
      }
    ]
  },
  {
    "title": "Yugoslavia breaks apart",
    "lines": [
      {
        "text": "Yugoslavia was a country of six republics in south-eastern Europe. Its army, the JNA, belonged to the whole federation.",
        "tag": "established"
      },
      {
        "text": "In 1990 and 1991 the federation came apart. On the twenty-fifth of June 1991, the parliaments of Croatia and Slovenia declared independence. The implementation of Croatia's declaration was suspended for three months. On the eighth of October, Croatia's parliament cut the remaining legal ties with Yugoslavia.",
        "tag": "established"
      },
      {
        "text": "About one person in eight in Croatia was a Serb. Many of them feared what an independent Croatia would mean for them. In areas with many Serbs, local leaders set up their own authorities and barricades, and armed groups formed on both sides.",
        "tag": "established"
      },
      {
        "text": "The JNA said it was keeping the peace and defending Yugoslavia. Croatia's government saw it as an army taking Serbia's side.",
        "tag": "disputed"
      },
      {
        "text": "At Vukovar, the JNA was an attacking force.",
        "tag": "icty"
      }
    ]
  },
  {
    "title": "A town on the Danube",
    "lines": [
      {
        "text": "Vukovar lies where a small river, the Vuka, meets the Danube. Across the Danube is Serbia.",
        "tag": "established"
      },
      {
        "text": "In 1991 the town had about twenty-one thousand Croats and fourteen thousand Serbs, and people of other backgrounds: Hungarians, Rusyns and others. Neighbours, classmates and families crossed these lines.",
        "tag": "established"
      },
      {
        "text": "It had a baroque old town, a hospital, a busy river port, and, just to the north, Borovo Naselje, a factory town built around a major Yugoslav shoe factory. On a hill by the Danube road stood a tall water tower.",
        "tag": "established"
      },
      {
        "text": "The two sides name the battle differently. In Croatia it is the defence of Vukovar. In 1991, the JNA and Serb leaders called its capture a liberation. This page uses neutral words: the battle, the siege, the fall.",
        "tag": "established"
      }
    ]
  },
  {
    "title": "The two sides",
    "lines": [
      {
        "text": "The attackers were the JNA, the federal army, with tanks, artillery and aircraft. With it fought the local Serb Territorial Defence and volunteer groups, among them Željko Ražnatović's Serb Volunteer Guard, known as Arkan's Tigers, and a detachment linked to the Serbian politician Vojislav Šešelj.",
        "tag": [
          "established",
          "icty"
        ]
      },
      {
        "text": "The CIA later estimated that more than thirty-six thousand JNA, Territorial Defence and volunteer troops were around Vukovar after reinforcements. That is the CIA's estimate of the reinforced forces around Vukovar, not the number fighting in one street or at one moment.",
        "tag": "estimate"
      },
      {
        "text": "The defenders were the Croatian National Guard and the police, with local volunteers and a smaller force, the Croatian Defence Forces, known as HOS. The 204th Vukovar Brigade became the main military formation in the town's defence. The CIA estimated two thousand to two thousand three hundred defenders. Croatia's veterans ministry gives the brigade a strength of about eighteen hundred.",
        "tag": [
          "estimate",
          "croatian"
        ]
      },
      {
        "text": "These numbers count different things at different times. They are not a head-to-head count of the two sides.",
        "tag": "established"
      }
    ]
  },
  {
    "title": "How this page tells it",
    "lines": [
      {
        "text": "This war is recent. Croatian and Serbian accounts often disagree, and some questions are still in the courts.",
        "tag": "editorial"
      },
      {
        "text": "After each line you will see a tag. \"Established\" means supported by reliable evidence. \"ICTY finding\" means the judges of the international court found it to be true. \"Croatian account\" or \"Serbian account\" tells you whose account it is. \"Disputed\" means the sources disagree, and \"estimate\" marks an approximate number.",
        "tag": "editorial"
      },
      {
        "text": "The front lines on the map are traced from a map made by the CIA in 2002, from its own research. The map of the land and the town is a painting made for this page, reconstructing the landscape and the town before the destruction.",
        "tag": "reconstruction"
      },
      {
        "text": "The page tells what happened to people on both sides, without graphic detail.",
        "tag": "editorial"
      }
    ]
  }
],
  events: [
  {
    "title": "Borovo Selo",
    "clock": "2 May – 24 August 1991",
    "tag": [
      "established",
      "croatian",
      "serbian"
    ],
    "text": "On the second of May, Croatian police went into Borovo Selo, a village just north of Vukovar, where armed local Serbs had set up barricades. In the fighting, twelve Croatian policemen were killed. Borovo Selo, the village, is not Borovo Naselje, the factory town. Through the summer, barricades went up across eastern Slavonia. The JNA and local Territorial Defence units took positions around Vukovar, and inside the town, defenders organised under a series of commanders. By August, shells had already damaged the hospital's operating rooms. The Serb National Council, the council of the Serb community in Croatia, also documents killings and disappearances of Serb civilians by Croatian armed groups in Vukovar before the main siege."
  },
  {
    "title": "The siege begins",
    "clock": "25 August – 13 September 1991",
    "tag": [
      "established",
      "croatian",
      "serbian",
      "disputed"
    ],
    "text": "The twenty-fifth of August is the date usually given for the start of the battle: a large attack from several sides, and shelling almost every day from then on. At the start of September, Mile Dedaković, a former JNA lieutenant colonel known as Jastreb, the Hawk, took command of the town's defence. The hospital moved its patients into the basement. Its own history notes: \"Power and water sometimes fail; generators are switched on.\" People lived in cellars. A Croatian woman, Manda Patko, remembered: \"There were days when you couldn't even come out from the basement.\" A Serb woman of Vukovar, quoted as Kafa, remembered her street's cellar before she left on the seventh of September: \"All our neighbors were in one cellar and all stuck together. Croats, Serbs and Ruthenians.\" A track through the corn fields still linked the town with the outside."
  },
  {
    "title": "Battle for the barracks",
    "clock": "14 September 1991",
    "tag": "established",
    "text": "Across Croatia, Croatian forces began to blockade the JNA's barracks. At Vukovar, the JNA attacked from the south, from the direction of Negoslavci, and broke through to its own barracks in the south of the town. The barracks stayed a JNA stronghold inside the town. A JNA brigade, the 1st Guards Mechanised Brigade, held the southern edge of the town until early October. The map shows the CIA's front line for this day."
  },
  {
    "title": "Trpinjska cesta",
    "clock": "14 – 18 September 1991",
    "tag": [
      "established",
      "croatian"
    ],
    "text": "In the north, JNA armoured forces attacked from the direction of Trpinja toward Borovo Naselje, down the long main road, Trpinjska cesta. The JNA used M-84 tanks at Vukovar, a Yugoslav development of the Soviet T-72. The defenders of Borovo Naselje, led by Blago Zadro, fought them with mines and small teams with hand-held anti-tank weapons. Croatian veterans describe renewed attacks by \"two large columns of tanks\" on the eighteenth of September. In Croatia the road became known as a tank graveyard."
  },
  {
    "title": "The offensive from Šid",
    "clock": "20 – 25 September 1991",
    "tag": [
      "established",
      "croatian",
      "serbian"
    ],
    "text": "Around the twentieth of September, the JNA's 1st Guards Mechanised Division advanced from Šid, in Serbia, into eastern Croatia. On the twenty-fifth, the main JNA garrison withdrew from Vinkovci, the next town to the west. In Vukovar, the defenders were organised as the 204th Vukovar Brigade. Not every soldier wanted this war. A Serbian human-rights group records that about two thousand reservists from Kragujevac went home from Šid. On the twenty-third of September, a reservist, Vladimir Živković, drove an armoured vehicle to the Federal Parliament in Belgrade in protest."
  },
  {
    "title": "Two new commands",
    "clock": "30 September – early October 1991",
    "tag": [
      "established",
      "icty",
      "croatian",
      "reconstruction"
    ],
    "text": "At the turn of September and October, the JNA reorganised its forces into two operational groups, one in the south and one in the north. Operational Group South, under Colonel Mile Mrkšić, had its headquarters in a house in Negoslavci. The court found that, from the eighth of October, Mrkšić alone commanded the joint combat operations of the forces in Operational Group South's area. Operational Group North was led by General Mladen Bratić. The core of Operational Group South was the Guards Motorised Brigade, from Belgrade. With the JNA fought the local Territorial Defence and volunteer groups. The front line, which the map shows, now held Vukovar and Borovo Naselje together in one pocket. On the third and fifth of October, the JNA attacked Nuštar, the village on the road to Vinkovci, and was pushed back."
  },
  {
    "title": "The corn-field road",
    "clock": "October 1991",
    "tag": [
      "established",
      "croatian",
      "disputed"
    ],
    "text": "On the first of October, the JNA captured Marinci and cut the road west. That blocked the main supply route. The remaining tracks through the corn fields were dangerous, and Bogdanovci held out as a defended pocket on the way. Croatian forces outside tried again and again to break through to the town, but could not open a lasting corridor. Dedaković went out to Vinkovci to lead the relief from outside. In mid-October, Branko Borković, a former JNA captain, took command inside the town."
  },
  {
    "title": "The northern attack",
    "clock": "16 – 18 October 1991",
    "tag": "established",
    "text": "On the sixteenth of October, the JNA attacked Borovo Naselje and Trpinjska cesta from several directions at once. Blago Zadro, the commander in Borovo Naselje, was killed. On the seventeenth and eighteenth, there was fighting at Lužac, between Borovo Naselje and the town, including over a temporary floating bridge on the Vuka."
  },
  {
    "title": "The convoy",
    "clock": "19 October 1991",
    "tag": [
      "established",
      "disputed"
    ],
    "text": "For one day, a neutral medical convoy got through. It was organised with Médecins Sans Frontières, Doctors Without Borders. It came in from Bogdanovci along a narrow road through the corn fields. MSF records that it left the hospital at twenty past eleven in the morning on the nineteenth of October, with more than a hundred wounded patients. MSF counted a hundred and nine; the hospital, a hundred and twelve. On the way out, the convoy was forced onto a different route, and a mine injured two MSF nurses. It was a single convoy, not an opened road, and the siege went on."
  },
  {
    "title": "Bogdanovci holds out",
    "clock": "late October – early November 1991",
    "tag": [
      "established",
      "disputed"
    ],
    "text": "West of the town, the village of Bogdanovci guarded the corn-field route. On the twenty-ninth of October, the JNA renewed its attack on it. New Croatian units fought outside the ring, west of the town and toward Nuštar. The CIA later judged that the relief efforts were too weak and badly coordinated. Some people in Croatia later claimed that their own government had given Vukovar up. That claim remains disputed: failed relief attempts alone do not prove an intention to abandon the town."
  },
  {
    "title": "Lužac and the river",
    "clock": "2 – 9 November 1991",
    "tag": [
      "established",
      "disputed",
      "croatian"
    ],
    "text": "In early November, JNA attacks around Lužac and the Danube port threatened the link between Borovo Naselje and the town centre. General Mladen Bratić, commander of Operational Group North, was killed in early November. On the eighth and ninth, the CIA's account describes another JNA attack into Borovo Naselje. A Croatian account records that on the ninth, defenders pulled back to reserve positions at Lužac and Budžak."
  },
  {
    "title": "The ring closes",
    "clock": "10 November 1991",
    "tag": [
      "established",
      "reconstruction"
    ],
    "text": "On the tenth of November, Bogdanovci fell, and the remaining route through it was lost. The map shows the CIA's reconstruction of the front on that day, as the defence was being divided into separate pockets."
  },
  {
    "title": "Pockets",
    "clock": "11 – 17 November 1991",
    "tag": [
      "established",
      "croatian",
      "serbian"
    ],
    "text": "On the evening of the twelfth of November, Croatian forces outside made one last attack toward Marinci to break through. They had too few troops, and it failed. The CIA dates the loss of Borovo Naselje's grain silo to the thirteenth. By then, the defence was breaking into separate pockets. The CIA describes the attackers' infantry, tanks and engineers working together better in this last phase. At the same time, a Serbian reporter with the attacking side, Jovan Dulović, described confusion among some units. He wrote in his diary on the fourteenth of November: \"I don't see who's in command, who obeys who.\""
  },
  {
    "title": "The fall",
    "clock": "18 November 1991",
    "tag": [
      "icty",
      "established"
    ],
    "text": "On the eighteenth of November, the defenders of Mitnica, in the south-east of the town, surrendered. They insisted on surrendering to the JNA, not to the Territorial Defence. The court records that the Croatian forces in the area of Vukovar \"capitulated on 18 November 1991\". The same day, in Zagreb, an agreement provided for the hospital to be evacuated under Red Cross protection, with European monitors given access throughout. In 1991 the JNA and the Serb authorities called the day a liberation. On this page, we say the town fell. The siege had lasted about three months."
  },
  {
    "title": "After the guns",
    "clock": "18 – 20 November 1991",
    "tag": [
      "icty",
      "established",
      "disputed"
    ],
    "text": "In the days after the surrender, people from the town, civilians and defenders, were gathered and questioned at Velepromet, a warehouse in the south of the town. Some detainees were beaten and abused there. On the nineteenth of November, the JNA's Operational Group South took control of the hospital. The European monitors were kept out, and the Red Cross was given only limited access. On the twentieth, at a bridge, Major Veselin Šljivančanin stopped a Red Cross official, Nicolas Borsinger. The court found that he deliberately delayed the Red Cross. The hospital's director, Dr Vesna Bosanac, was questioned on the nineteenth, held overnight, and returned to the hospital the next morning. She was later imprisoned, and released in a prisoner exchange on the tenth of December. In Borovo Naselje, the historian Davor Marijan dates the end of organised defence to the nineteenth of November; another account gives the twentieth for the final surrender."
  }
],
  outcome: [
  {
    "text": "Vukovar fell on the eighteenth of November 1991, after about three months of siege.",
    "tag": [
      "established",
      "icty"
    ]
  },
  {
    "text": "Much of the town was destroyed.",
    "tag": "established"
  },
  {
    "text": "The brigade's records, cited by the Croatian researchers Ružić and Živić, count four hundred and twenty-two soldiers of the Vukovar brigade dead, four hundred and fifty-seven missing, and seven hundred and seventy-seven wounded, in that historical record. Some books add the dead and the missing together.",
    "tag": "croatian"
  },
  {
    "text": "A Croatian study, Dimensions of the Crime in Vukovar in 1991, cited by Ružić and Živić, gives about eleven hundred civilians killed in Vukovar.",
    "tag": [
      "croatian",
      "estimate"
    ]
  },
  {
    "text": "Using incomplete Serb records, Croatian researchers listed three hundred and fifty Serb residents of the former Vukovar municipality: two hundred and three Territorial Defence members, including six listed as missing, and a hundred and forty-seven civilians recorded as dead, in 1991. This is not a count of everyone killed by Croatian forces.",
    "tag": [
      "croatian",
      "estimate"
    ]
  },
  {
    "text": "Published estimates of the JNA's losses differ widely, and this page does not choose one total.",
    "tag": "disputed"
  },
  {
    "text": "These numbers come from different counts, so they cannot be added together.",
    "tag": "established"
  },
  {
    "text": "Ovčara. On the twentieth of November, buses carrying prisoners left the hospital at about ten in the morning. Most of the prisoners were men, and many were wounded defenders. They were driven to the JNA barracks, and from there, between one and two in the afternoon, to a hangar on the Ovčara farm, outside Vukovar. Prisoners were beaten at the hangar. That evening, no later than nine o'clock, the JNA guard was withdrawn on Colonel Mrkšić's order. That night, members of the local Territorial Defence and of volunteer units killed the prisoners and buried them in a mass grave.",
    "tag": "icty"
  },
  {
    "text": "In 1996, two hundred bodies were recovered from the grave. In 2007, the court found that a hundred and ninety-four named victims in this case had been murdered there. They were prisoners, and the law protected them from being killed.",
    "tag": "icty"
  },
  {
    "text": "After the capture, many non-Serb residents were forced to leave Vukovar.",
    "tag": "icty"
  },
  {
    "text": "Thousands of prisoners from Croatia, many of them from Vukovar, were held in camps in Serbia, such as Sremska Mitrovica and Stajićevo. The Humanitarian Law Center in Belgrade has documented how badly they were treated.",
    "tag": "established"
  },
  {
    "text": "At the international court in The Hague, Mile Mrkšić was sentenced to twenty years. Miroslav Radić, a company commander, was acquitted. Veselin Šljivančanin's sentence was raised on appeal, when he was also convicted of aiding and abetting murder. In 2010, after new evidence, a review overturned that murder conviction; his final sentence was ten years, for aiding and abetting torture. Slobodan Milošević, Serbia's president, and Goran Hadžić, the local Serb leader, died before their trials ended, so those trials ended without verdicts on their guilt. Courts in Belgrade later convicted others for Ovčara.",
    "tag": [
      "icty",
      "established"
    ]
  },
  {
    "text": "For the next four years, Vukovar was held by the Serb authorities in this part of Croatia. From January 1996, a United Nations mission ran the region. On the fifteenth of January 1998 the mission ended, and the region completed its peaceful return to Croatian administration.",
    "tag": "established"
  },
  {
    "text": "Years later, a JNA veteran, Mile Milošević, talked to a reporter about the war. He asked: \"Did it have to be that way?\"",
    "tag": "serbian"
  },
  {
    "text": "Each November, on the eighteenth, a large remembrance procession walks from the hospital to the Memorial Cemetery in Vukovar. In Serbia there is no single view: some still call the battle a liberation, while Serbian human-rights groups and journalists remember the victims.",
    "tag": "established"
  },
  {
    "text": "The water tower was restored and opened as a memorial, with its shell damage kept. It stands over the Danube as a symbol of the town.",
    "tag": "established"
  }
],
  record: {
  "record-water-tower-2003.jpg": {
    "at": 0,
    "file": "record-water-tower-2003.jpg",
    "caption": "The Vukovar water tower in the summer of 2003, still as the siege left it, its walls holed by shells. It was hit many times in 1991 and became the town's symbol. It was later restored as a memorial, keeping its shell damage.",
    "credit": "Photo: El Capitan, summer 2003, via Wikimedia Commons (File:Vukovar_turm.jpg), CC BY-SA 3.0 (also GFDL)."
  },
  "record-cia-map-2.jpg": {
    "at": 0,
    "file": "record-cia-map-2.jpg",
    "caption": "The CIA's map of the battle, from Balkan Battlegrounds (2002). It shows the front lines of 14 September, 30 September and 10 November 1991, and the units of both sides. Our map's front lines are traced from it.",
    "credit": "Central Intelligence Agency, Balkan Battlegrounds, vol. I, map 2 (2002). Public domain. Library of Congress."
  },
  "record-m84-wreck.jpg": {
    "at": 0,
    "file": "record-m84-wreck.jpg",
    "caption": "A wrecked M-84 tank photographed in Vukovar on 29 November 1991, after the battle. The M-84 is the Yugoslav development of the Soviet T-72.",
    "credit": "Photo: Peter Denton, via Wikimedia Commons (File:Croatian_War_1991_Vukovar_destroyed_tank.jpg), CC BY-SA 2.0. Mark any crop as a change."
  },
  "record-old-town-1991.jpg": {
    "at": 0,
    "file": "record-old-town-1991.jpg",
    "caption": "Vukovar's baroque old centre in late November 1991: the arcaded houses on the main street, their roofs broken and walls marked by shells.",
    "credit": "Photo: Peter Denton, via Wikimedia Commons (from Flickr), CC BY-SA 2.0."
  },
  "record-flag-1991.jpg": {
    "at": 0,
    "file": "record-flag-1991.jpg",
    "caption": "A Yugoslav flag hung on a gate in front of a ruined house in Vukovar, 29 November 1991, eleven days after the town fell. Who hung it, and when, is not recorded.",
    "credit": "Photo: Peter Denton, via Wikimedia Commons (from Flickr), CC BY-SA 2.0."
  },
  "record-street-1991.jpg": {
    "at": 0,
    "file": "record-street-1991.jpg",
    "caption": "A street in Vukovar on 29 November 1991, eleven days after the fall: damaged houses, broken roofs and rubble, and a tractor moving down the street.",
    "credit": "Photo: Peter Denton, via Wikimedia Commons (from Flickr), CC BY-SA 2.0."
  },
  "record-memorial-cemetery-2015.jpg": {
    "at": 0,
    "file": "record-memorial-cemetery-2015.jpg",
    "caption": "The Memorial Cemetery of the Homeland War Victims in Vukovar, with its eternal flame, in 2015. The remembrance procession on the eighteenth of November ends here.",
    "credit": "Photo: Tromber, 29 April 2015, via Wikimedia Commons, CC BY-SA 4.0."
  }
}
});

/* ======================================================================================================================
   Maps, armies, leaders and their moves.
     town map  images/town-painting.jpg  45.398–45.320 N, 18.932–19.080 E (about 11.6 x 8.7 km, 2400 x 1800 world px,
               about 207 px to the km): Borovo Naselje to Vučedol. The main map.
     area map  images/area-painting.jpg  45.432–45.247 N, 18.770–19.121 E (about 27 x 21 km): Vinkovci to the Danube.
               Chapters and slides with `altMap: 'area'` show it, without the units (only the lines and the rings).
   Both are paintings made for this page (AI-generated) over real elevation; the 1991 built-up areas follow the CIA map.
   THE LINES: the front lines of 14 September, 30 September and 10 November and the dated JNA arrows are the CIA's
   (Balkan Battlegrounds vol. I, map 2), traced in tools/trace-cia-map.py (lines.js). EVERY UNIT POSITION AND MOVE IS OURS,
   placed to follow the narration: a reconstruction (tag "reconstruction"), not a record of where each unit stood.
   ====================================================================================================================== */
(() => {
  const S = window.VUKOVAR_SCENARIO;
  const PI = Math.PI, E = 0, Wd = PI, N = -PI / 2, So = PI / 2;
  const GEO = { town: { lat0: 45.32, lat1: 45.398, lon0: 18.932, lon1: 19.0800085 }, area: { lat0: 45.247, lat1: 45.432, lon0: 18.77, lon1: 19.1209249 } };
  const at = (g, lat, lon) => ({ x: Math.round((lon - g.lon0) / (g.lon1 - g.lon0) * 2400), y: Math.round((g.lat1 - lat) / (g.lat1 - g.lat0) * 1800) });
  const T = (lat, lon) => at(GEO.town, lat, lon), A = (lat, lon) => at(GEO.area, lat, lon);
  // places on the town map (OpenStreetMap points; 'approx.' where marked)
  const TOWER = T(45.34404, 19.01228), HOSP = T(45.35772, 18.99323), BARR = T(45.33805, 19.00468), VELE = T(45.3328, 19.0022), LUZAC = T(45.36017, 18.9703),
        MILOVO = T(45.34983, 18.99202), MITNICA = T(45.33866, 19.01689), SAJM = T(45.33961, 19.00185), BOROVO = T(45.37847, 18.95992), CENTRE = T(45.3460, 19.0050),
        BRIDGE = T(45.3510, 18.9985), PORT = T(45.3650, 18.9830), TRP0 = T(45.3960, 18.9360), TRP1 = T(45.3865, 18.9480), TRPEND = T(45.3815, 18.9530),
        SOUTH = T(45.3215, 19.0040), CORNW = T(45.3430, 18.9335), CORNE = T(45.3440, 18.9760), SILO = T(45.3800, 18.9690), VUCEDOL = T(45.3370, 19.0450);
  // places on the area map (villages approx.)
  const aVUK = A(45.3460, 19.0050), aBOROVOSELO = A(45.4010, 18.9680), aBOROVON = A(45.37847, 18.95992), aVINK = A(45.2880, 18.8050), aNUSTAR = A(45.3320, 18.8420),
        aMARINCI = A(45.33823, 18.89757), aBOGD = A(45.3378, 18.93002), aNEGO = A(45.27823, 18.99726), aOVCARA = A(45.29568, 19.05894), aSID = A(45.2490, 19.1000),
        aTRPINJA = A(45.4197, 18.8986), aMIRK = A(45.2700, 18.8500);
  Object.assign(S, {
    titleCard: {
      title: 'BATTLE OF VUKOVAR', date: '25 August – 18 November 1991',
      dateNote: 'As Yugoslavia breaks apart, the JNA and the forces with it besiege a town on the Danube. After about three months, Vukovar falls.',
      dateRef: 'ICTY, Mrkšić et al. (2007); CIA, Balkan Battlegrounds (2002–2003); Marijan (2002)',
      place: 'Vukovar, on the Danube in eastern Croatia (then in Yugoslavia)',
      sides: 'The Yugoslav People’s Army (JNA) with Territorial Defence and volunteer units  ·  The Croatian National Guard, police and local volunteers'
    },
    world: { w: 2400, h: 1800 },
    terrain: 'town-painting.jpg',
    geo: GEO,
    altMaps: { area: 'area-painting.jpg' },
    altLabels: { area: [
      { ...aVUK, text: 'Vukovar' }, { ...aVINK, text: 'Vinkovci' }, { ...A(45.40, 19.06), text: 'Danube', small: true }, { ...A(45.38, 19.10), text: 'SERBIA', small: true },
      { ...A(45.352, 18.86), text: 'Vuka', small: true }, { ...aNUSTAR, y: aNUSTAR.y + 30, text: 'Nuštar', small: true }, { ...aMARINCI, y: aMARINCI.y + 30, text: 'Marinci', small: true },
      { ...aBOGD, y: aBOGD.y + 30, text: 'Bogdanovci', small: true }, { ...aBOROVON, y: aBOROVON.y - 30, text: 'Borovo Naselje', small: true }, { ...aBOROVOSELO, y: aBOROVOSELO.y - 26, text: 'Borovo Selo', small: true },
      { ...aNEGO, y: aNEGO.y + 30, text: 'Negoslavci', small: true }, { ...aOVCARA, y: aOVCARA.y + 30, text: 'Ovčara', small: true }, { ...aTRPINJA, y: aTRPINJA.y + 30, text: 'Trpinja', small: true },
      { ...aMIRK, y: aMIRK.y + 30, text: 'Mirkovci (road to Šid)', small: true } ] },
    duration: 210, commandDuration: 300, commandFocus: CENTRE,
    battlefield: {
      scale: { px: 207, label: '1 km' },
      labels: [
        { ...T(45.3405, 19.0070), text: 'Vukovar' }, { ...T(45.3870, 18.9600), text: 'Borovo Naselje' }, { ...T(45.3740, 19.0300), text: 'Danube', small: true },
        { ...T(45.3900, 19.0600), text: 'SERBIA', small: true }, { ...T(45.3485, 18.9600), text: 'Vuka', small: true }, { ...LUZAC, y: LUZAC.y + 28, text: 'Lužac', small: true },
        { ...MITNICA, y: MITNICA.y + 30, text: 'Mitnica', small: true }, { ...SAJM, y: SAJM.y - 26, text: 'Sajmište', small: true }, { ...VUCEDOL, y: VUCEDOL.y + 30, text: 'Vučedol', small: true },
        { ...T(45.3225, 19.0150), text: 'to Negoslavci ▼', small: true }, { ...T(45.3950, 18.9450), text: '◀ Trpinjska cesta, to Trpinja', small: true }, { ...T(45.3405, 18.9450), text: '◀ to Bogdanovci', small: true }
      ]
    },
    eventMarkers: true,
    trenchLayers: [], trenchAlpha: 1, defaultTrench: null, introTrench: null,
    globe: { target: { lon: 19.0012, lat: 45.3517 }, region: { lon: 21.0, lat: 44.5 }, pull: 4.6, fit: { lon0: 13, lon1: 29, lat0: 40, lat1: 49, margin: .03 }, lift: false, keepBorders: true, keepTowns: true, startLat: 35,
      periodNote: 'Yugoslavia in 1991: its six republics',
      paintings: [ { file: 'area-painting.jpg', lat0: 45.247, lat1: 45.432, lon0: 18.77, lon1: 19.1209249 }, { file: 'town-painting.jpg', lat0: 45.32, lat1: 45.398, lon0: 18.932, lon1: 19.0800085 }, { file: 'region-painting.jpg', lat0: 34.5, lat1: 51.5, lon0: 3.5, lon1: 34.5, stage: 'region' }, { file: 'close-painting.jpg', lat0: 38.5, lat1: 50.0, lon0: 10.0, lon1: 31.5, stage: 'region' } ],   // the first stop's painted map (images/layout/ART-PROMPT-REGION.md), under the outlines
      closePull: 1100, dive2Secs: 6,
      stop2: { center: { lon: 19.0, lat: 45.33 }, pull: 30, fit: { lon0: 17.75, lon1: 20.3, lat0: 44.95, lat1: 45.9, margin: .04 } /* the towns: Đakovo to Novi Sad, Sombor to Šid */, todayNote: 'Today’s towns and cities', thenNote: 'The same towns in autumn 1991' },
      labels: [
        { lon: 15.98, lat: 45.81, text: 'Zagreb', size: .55, dot: true }, { lon: 20.46, lat: 44.82, text: 'Belgrade', size: .55, dot: true },
        { lon: 18.41, lat: 43.86, text: 'Sarajevo', size: .5, dot: true }, { lon: 14.51, lat: 46.06, text: 'Ljubljana', size: .5, dot: true },
        { lon: 19.0012, lat: 45.3517, text: 'VUKOVAR', size: .85, pin: true, early: true }
      ] },
    establishing: [],
    imageBase: 'images/', audioBase: 'audio/',
    voices: [
      { id: 'clear', name: 'Narrator 1 · clear', speaker: 25 }, { id: 'light', name: 'Narrator 2 · light', speaker: 60 },
      { id: 'bright', name: 'Narrator 3 · bright', speaker: 0 }, { id: 'deep', name: 'Narrator 4 · deep', speaker: 400 },
      { id: 'warm', name: 'Narrator 5 · warm', speaker: 7 }, { id: 'computer', name: 'Computer · calm', speaker: 500 }
    ],
    sheets: ['jna-infantry', 'jna-infantry-fire', 'to-volunteer', 'to-volunteer-fire', 'jna-m84', 'jna-m84-fire', 'jna-t55', 'jna-m80', 'jna-m80-move', 'jna-guns-fire', 'jna-mortar-fire',
             'hr-defender', 'hr-defender-fire', 'hr-police', 'hr-police-fire', 'hr-antitank', 'hr-mortar-fire', 'hr-cornfield'],
    attackSheets: { 'jna-infantry': 'jna-infantry-fire', 'to-volunteer': 'to-volunteer-fire', 'jna-m84': 'jna-m84-fire', 'jna-m80': 'jna-m80-move', 'hr-defender': 'hr-defender-fire', 'hr-police': 'hr-police-fire' },
    sheetBy: { allied: { infantry: 'jna-infantry', archers: 'to-volunteer', cavalry: 'jna-m84' }, french: { infantry: 'hr-defender', archers: 'hr-police', cavalry: 'hr-antitank' } },
    fallen: { bySide: { allied: 'fallen-jna', french: 'fallen-hr' } },
    sideArt: { allied: { cloth: '#5d6150', cloth2: '#45493c', pennant: '#c0392b' }, french: { cloth: '#5a5a3e', cloth2: '#3e4a5a', pennant: '#2e5aa8' } },
    legend: [ { label: 'The JNA, the Territorial Defence and volunteer units', short: 'JNA side', color: '#c0392b', kind: 'dot' }, { label: 'The Croatian defenders', short: 'Defenders', color: '#2e5aa8', kind: 'dot' } ],
    ai: { plans: {} }, commandLines: {},
    debrief: { allied: { victory: { title: 'Vukovar falls', text: '' }, defeat: { title: 'Vukovar falls', text: '' }, stalemate: { title: 'Vukovar falls', text: '' } },
               french: { victory: { title: 'Vukovar falls', text: '' }, defeat: { title: 'Vukovar falls', text: '' }, stalemate: { title: 'Vukovar falls', text: '' } } },
    sources: [
      { title: 'ICTY, Prosecutor v. Mrkšić, Radić and Šljivančanin', note: 'Trial Judgement, 27 September 2007; Appeal Judgement, 5 May 2009; Šljivančanin Review Judgement, 8 December 2010. icty.org' },
      { title: 'CIA, Balkan Battlegrounds', note: 'A Military History of the Yugoslav Conflict, 1990–1995, vol. I (2002) and vol. II (2003). The front lines and arrows on the map are traced from vol. I, map 2 (public domain).' },
      { title: 'Davor Marijan, “Bitka za Vukovar 1991.”', note: 'Scrinia Slavonica 2 (2002), pp. 367–402. hrcak.srce.hr' },
      { title: 'Anica Marić and Ante Nazor, The Town Was the Target', note: 'Croatian Memorial-Documentation Centre of the Homeland War, 2011.' },
      { title: 'Ružić and Živić, “Ratni mortalitet Srba (bivše) Općine Vukovar tijekom 1991.”', note: 'Scrinia Slavonica 13 (2013), pp. 261–276.' },
      { title: 'MSF, Speaking Out: MSF and the War in the Former Yugoslavia 1991–2003', note: 'Laurence Binet; the convoy of 19 October 1991, pp. 36–39.' },
      { title: 'Humanitarian Law Center (Belgrade), Camps for Croats in Serbia', note: 'hlc-rdc.org' },
      { title: 'Serb National Council (SNV), Vukovar', note: 'Documentation of crimes against Serb civilians. snv.hr' },
      { title: 'Youth Initiative for Human Rights, War in Serbia (1991–2001): It Did Happen', note: '2020; the reservists at Šid, p. 40.' },
      { title: 'Voices', note: 'BIRN / Balkan Insight (2017, 2021); Kardov in Hadžić (ed.), The Violent Dissolution of Yugoslavia (2004); Jovan Dulović, Vreme News Digest 216 (1995).' },
      { title: 'This page', note: 'The research, the outline and the narration script, with every source and ChatGPT’s three reviews, are in the vukovar/research folder.' }
    ]
  });
  S.sides.allied.rally = SOUTH; S.sides.french.rally = CENTRE;
  // the Library of sources page (library.html?battle=vukovar): link cards; nothing copyrighted is kept on the site
  const L = (o) => Object.assign({ linkOnly: true, link: '', rights: 'Still in copyright: link only' }, o);
  S.library = [
    { title: 'Prosecutor v. Mrkšić, Radić and Šljivančanin: Trial Judgement', author: 'ICTY Trial Chamber II', year: '2007', kind: 'court judgement', about: 'The court’s findings on the command at Vukovar, the surrender, Velepromet, the hospital and Ovčara. With the Appeal Judgement (2009) and the Šljivančanin Review Judgement (2010).', citedIn: 'chapters 6, 14, 15 and the debrief', rights: 'Official court record: quoted, linked', link: 'https://www.icty.org/x/cases/mrksic/tjug/en/070927.pdf', linkLabel: 'Read the judgement (PDF)' },
    { title: 'Balkan Battlegrounds: A Military History of the Yugoslav Conflict, 1990–1995', author: 'Central Intelligence Agency, Office of Russian and European Analysis', year: '2002–2003', kind: 'military history and maps (2 vols.)', about: 'The CIA’s reconstruction of the battle. The front lines and dated arrows on our map are traced from vol. I, map 2.', citedIn: 'the map; chapters 3–13', rights: 'US government work: public domain', link: 'https://www.loc.gov/item/2010588135/', linkLabel: 'The maps at the Library of Congress' },
    L({ title: 'Bitka za Vukovar 1991.', author: 'Davor Marijan', year: '2002', kind: 'journal article (Scrinia Slavonica 2)', about: 'A Croatian military historian’s account from the archives: the commanders, Marinci, the relief attempts, the end in Borovo Naselje.', citedIn: 'chapters 2, 7, 12, 13, 15', link: 'https://hrcak.srce.hr/', linkLabel: 'Hrčak (journal portal)' }),
    L({ title: 'The Town Was the Target', author: 'Anica Marić and Ante Nazor', year: '2011', kind: 'book', about: 'Croatian Memorial-Documentation Centre of the Homeland War: the town in 1991, the census, the fighting at Lužac and Budžak.', citedIn: 'intro 3, chapter 11', link: 'https://centardomovinskograta.hr/' }),
    L({ title: 'MSF and the War in the Former Yugoslavia 1991–2003 (Speaking Out)', author: 'Laurence Binet / Médecins Sans Frontières', year: '2003, revised', kind: 'case study with documents', about: 'MSF’s own record of the convoy of 19 October 1991, with the meeting minutes.', citedIn: 'chapter 9', link: 'https://www.msf.org/speakingout', linkLabel: 'MSF Speaking Out' }),
    L({ title: 'Ratni mortalitet Srba (bivše) Općine Vukovar tijekom 1991.', author: 'Slaven Ružić and Dražen Živić', year: '2013', kind: 'journal article (Scrinia Slavonica 13)', about: 'The casualty records: the brigade’s dead, missing and wounded, and the Serb residents of the municipality who died in 1991.', citedIn: 'the outcome', link: 'https://hrcak.srce.hr/' }),
    L({ title: 'Camps for Croats in Serbia', author: 'Humanitarian Law Center, Belgrade', year: '2012', kind: 'report', about: 'A Serbian human-rights organisation’s documentation of the camps where prisoners from Croatia were held.', citedIn: 'the debrief', link: 'https://www.hlc-rdc.org/', linkLabel: 'Humanitarian Law Center' }),
    L({ title: 'Vukovar: crimes against Serb civilians', author: 'Serb National Council (SNV)', year: 'online', kind: 'documentation', about: 'The Serb community council’s record of Serb civilians killed and disappeared in Vukovar in 1991.', citedIn: 'chapter 1', link: 'https://snv.hr/', linkLabel: 'SNV' }),
    L({ title: 'War in Serbia (1991–2001): It Did Happen', author: 'Youth Initiative for Human Rights', year: '2020', kind: 'book', about: 'Reservists who refused to fight; Vladimir Živković’s protest at the Federal Parliament.', citedIn: 'chapter 5', link: 'https://yihr.rs/' }),
    L({ title: 'The Fall of Vukovar: Oral History of a Croatian Town’s Destruction', author: 'Sven Milekić, BIRN', year: '2021', kind: 'journalism', about: 'Survivors remember the siege; Manda Patko’s cellar.', citedIn: 'chapter 2', link: 'https://balkaninsight.com/' }),
    L({ title: 'Vukovar: the First Forgotten Casualty of the Yugoslav War', author: 'Alan Davis, IWPR', year: '2021', kind: 'journalist’s memoir', about: 'A British freelance journalist who walked into Vukovar in September 1991 and was among the last foreign reporters inside the town. An eyewitness account, written thirty years later; not used for the narration.', citedIn: 'further reading', link: 'https://iwpr.net/global-voices/vukovar-first-forgotten-casualty-yugoslav-war', linkLabel: 'Read on IWPR' })
  ];

  // the armies panel: what each unit on the map stands for (positions on the map are a reconstruction)
  S.units = [
    { side: 'allied', type: 'infantry', sheet: 'jna-infantry', portrait: false, name: 'JNA infantry', desc: 'Conscripts and reservists of the Yugoslav People’s Army, the federal army.', tag: 'established',
      lines: [ { text: 'Not every soldier wanted this war: about two thousand reservists from Kragujevac went home from Šid in September 1991.', tag: 'serbian', cite: 'Youth Initiative for Human Rights, War in Serbia (2020), p. 40' } ] },
    { side: 'allied', type: 'cavalry', sheet: 'jna-m84', portrait: false, name: 'M-84 tanks', desc: 'A Yugoslav development of the Soviet T-72.', tag: 'established',
      lines: [ { text: 'The JNA used M-84s at Vukovar. A wrecked one was photographed in the town on 29 November 1991 (Peter Denton). Which tanks were in which attack, the sources do not say.', tag: 'established' } ] },
    { side: 'allied', type: 'cavalry', sheet: 'jna-m80', portrait: false, name: 'M-80 carriers and T-55 tanks', desc: 'The JNA’s tracked infantry carrier and an older tank.', tag: 'reconstruction',
      lines: [ { text: 'Both are named in accounts of the wider campaign in eastern Slavonia; our sources do not record which were at Vukovar on a given day.', tag: 'reconstruction' } ] },
    { side: 'allied', type: 'archers', sheet: 'to-volunteer', portrait: false, name: 'Territorial Defence and volunteers', desc: 'Local Serb Territorial Defence units and volunteer groups, fighting with the JNA.', tag: 'icty',
      lines: [ { text: 'Among them were Željko Ražnatović’s Serb Volunteer Guard (Arkan’s Tigers) and a detachment linked to Vojislav Šešelj.', tag: 'icty', cite: 'ICTY, Mrkšić et al., Trial Judgement (2007), paras. 87–93' } ] },
    { side: 'allied', type: 'cavalry', sheet: 'jna-guns-fire', portrait: false, name: 'Artillery and mortars', desc: 'Guns and mortars around the town.', tag: 'established',
      lines: [ { text: 'From late August the town was shelled almost every day. The calibres and positions on the map are our reconstruction.', tag: 'established' } ] },
    { side: 'french', type: 'infantry', sheet: 'hr-defender', portrait: false, name: 'National Guard and local volunteers', desc: 'The 204th Vukovar Brigade became the main military formation in the town’s defence.', tag: 'croatian',
      lines: [ { text: 'The CIA estimated two thousand to two thousand three hundred defenders; Croatia’s veterans ministry gives the brigade a strength of about eighteen hundred. The two numbers count different things.', tag: 'estimate' } ] },
    { side: 'french', type: 'archers', sheet: 'hr-police', portrait: false, name: 'Croatian police (MUP)', desc: 'Police officers who fought as infantry.', tag: 'established',
      lines: [ { text: 'The police were a large part of the early defence.', tag: 'established' } ] },
    { side: 'french', type: 'cavalry', sheet: 'hr-antitank', portrait: false, name: 'Anti-tank teams', desc: 'Small teams with mines and hand-held anti-tank weapons.', tag: 'established',
      lines: [ { text: 'The CIA describes the defenders’ mines and small mobile anti-tank teams, above all in Borovo Naselje. The exact weapons are not confirmed in our sources.', tag: 'established', cite: 'CIA, Balkan Battlegrounds vol. I, p. 100' } ] },
    { side: 'french', type: 'cavalry', sheet: 'hr-cornfield', portrait: false, name: 'The corn-field tracks', desc: 'People, ammunition and the wounded moving through the fields at night.', tag: 'established',
      lines: [ { text: 'Tracks through the corn fields linked the town with the outside. After the JNA captured Marinci on 1 October, the remaining tracks were dangerous.', tag: 'established', cite: 'Marijan (2002), p. 381' } ] }
  ];

  const O = (o) => Object.assign({ hidden: true }, o);
  S.mapObjects = [
    O({ id: 'convoy', sheet: 'msf-convoy', x: CORNW.x, y: CORNW.y, h: 46, turns: true, anim: { row: 1, fps: 5 }, label: 'MSF convoy', labelColor: '#ffffff' }),
    O({ id: 'monitors', sheet: 'monitors', x: BRIDGE.x + 40, y: BRIDGE.y + 30, h: 42, anim: { row: 3, fps: 2 }, label: 'Red Cross / European monitors', labelColor: '#ffffff' })
  ];

  const F = (o) => Object.assign({ power: 1, confidence: 'reconstruction' }, o);
  S.formations = [
    // the JNA and the forces with it
    F({ id: 'jnaS', side: 'allied', name: 'JNA infantry (south)', division: 'Guards brigades', type: 'infantry', cols: 4, rows: 2, x: SOUTH.x - 60, y: SOUTH.y - 20, facing: N, note: 'Conscripts and reservists of the JNA. From 30 September the core of Operational Group South was the Guards Motorised Brigade from Belgrade.' }),
    F({ id: 'tankS', side: 'allied', name: 'JNA tanks (south)', division: 'Armour', type: 'cavalry', sheet: 'jna-m84', cols: 3, rows: 1, h: 34, x: SOUTH.x + 40, y: SOUTH.y - 10, facing: N, note: 'The JNA used M-84 tanks at Vukovar, a Yugoslav development of the Soviet T-72. Which tanks were in which attack, the sources do not say.' }),
    F({ id: 'toS', side: 'allied', name: 'Territorial Defence and volunteers', division: 'TO and volunteers', type: 'archers', cols: 4, rows: 1, hidden: true, x: T(45.3290, 19.0250).x, y: T(45.3290, 19.0250).y, facing: N, note: 'The local Serb Territorial Defence and volunteer groups, among them Arkan’s Serb Volunteer Guard and a detachment linked to Vojislav Šešelj (ICTY).' }),
    F({ id: 'gunsS', side: 'allied', name: 'JNA artillery', division: 'Artillery', type: 'cavalry', sheet: 'jna-guns-fire', cols: 2, rows: 1, h: 34, power: .4, x: T(45.3240, 18.9600).x, y: T(45.3240, 18.9600).y, facing: N, note: 'Guns and mortars around the town shelled it almost every day from late August.' }),
    F({ id: 'mortS', side: 'allied', name: 'JNA mortars', division: 'Mortars', type: 'cavalry', sheet: 'jna-mortar-fire', cols: 2, rows: 1, h: 32, power: .3, x: T(45.3270, 19.0400).x, y: T(45.3270, 19.0400).y, facing: Wd }),
    F({ id: 'tankN', side: 'allied', name: 'JNA tanks (north)', division: 'Armour', type: 'cavalry', sheet: 'jna-m84', cols: 3, rows: 1, h: 34, hidden: true, offmap: true, x: TRP0.x, y: TRP0.y, facing: E, note: 'Armoured columns came down Trpinjska cesta toward Borovo Naselje.' }),
    F({ id: 'jnaN', side: 'allied', name: 'JNA infantry (north)', division: 'Northern forces', type: 'infantry', cols: 4, rows: 2, hidden: true, offmap: true, x: TRP0.x + 30, y: TRP0.y - 40, facing: E }),
    F({ id: 'apcN', side: 'allied', name: 'JNA M-80 infantry carriers', division: 'Mechanised infantry', type: 'cavalry', sheet: 'jna-m80', cols: 2, rows: 1, h: 32, hidden: true, offmap: true, x: TRP0.x - 20, y: TRP0.y + 30, facing: E }),
    // the Croatian defenders
    F({ id: 'hrB', side: 'french', name: 'Defenders of Borovo Naselje', division: 'Borovo Naselje', type: 'infantry', cols: 4, rows: 2, x: BOROVO.x + 30, y: BOROVO.y + 40, facing: Wd, note: 'The National Guard, police and local volunteers of Borovo Naselje, led by Blago Zadro until he was killed on 16 October.' }),
    F({ id: 'hrAT', side: 'french', name: 'Anti-tank teams', division: 'Borovo Naselje', type: 'cavalry', sheet: 'hr-antitank', cols: 2, rows: 1, h: 30, power: .6, x: TRPEND.x + 40, y: TRPEND.y + 10, facing: Wd, note: 'Small teams with mines and hand-held anti-tank weapons.' }),
    F({ id: 'hrT', side: 'french', name: 'Defenders of the town centre', division: 'Town centre', type: 'infantry', cols: 4, rows: 2, x: CENTRE.x - 60, y: CENTRE.y + 40, facing: So, note: 'The 204th Vukovar Brigade became the main military formation in the town’s defence.' }),
    F({ id: 'hrM', side: 'french', name: 'Defenders of Mitnica', division: 'Mitnica', type: 'infantry', cols: 3, rows: 2, x: MITNICA.x, y: MITNICA.y - 30, facing: So }),
    F({ id: 'hrPol', side: 'french', name: 'Croatian police', division: 'Police (MUP)', type: 'archers', cols: 3, rows: 1, x: MILOVO.x + 40, y: MILOVO.y + 30, facing: Wd, note: 'The police were a large part of the early defence.' }),
    F({ id: 'hrMor', side: 'french', name: 'Defenders’ mortars', division: 'Mortars', type: 'cavalry', sheet: 'hr-mortar-fire', cols: 1, rows: 1, h: 30, power: .3, x: T(45.3480, 19.0100).x, y: T(45.3480, 19.0100).y, facing: So }),
    F({ id: 'hrCorn', side: 'french', name: 'Carriers on the corn-field tracks', division: 'Corn-field tracks', type: 'cavalry', sheet: 'hr-cornfield', cols: 1, rows: 1, h: 32, power: .1, hidden: true, x: CORNW.x, y: CORNW.y, facing: E, note: 'Tracks through the corn fields still linked the town with the outside until the road at Marinci was cut on 1 October; after that they were dangerous.' })
  ];
  S.leaders = [
    { id: 'mrksic', name: 'Col. Mrkšić', side: 'allied', x: SOUTH.x - 120, y: SOUTH.y - 10, facing: N, hidden: true },
    { id: 'bratic', name: 'Gen. Bratić', side: 'allied', x: TRP0.x + 120, y: TRP0.y - 60, facing: E, hidden: true },
    { id: 'dedakovic', name: 'Dedaković', side: 'french', x: CENTRE.x - 120, y: CENTRE.y + 20, facing: So, hidden: true },
    { id: 'borkovic', name: 'Borković', side: 'french', x: CENTRE.x - 120, y: CENTRE.y + 20, facing: So, hidden: true },
    { id: 'zadro', name: 'Blago Zadro', side: 'french', x: BOROVO.x + 90, y: BOROVO.y + 10, facing: Wd, hidden: true }
  ];

  const EV = S.events; EV.forEach((e, i) => { e.clipNo = i + 1; e.orders = e.orders || []; e.t = i * 14; });
  const set = (i, o) => Object.assign(EV[i], o);
  const R = S.record;
  const area = (o) => Object.assign({ altMap: 'area', zoom: 'fit' }, o);
  // 1. Borovo Selo: the area map
  set(0, area({ markers: [ { ...aBOROVOSELO, label: 'Borovo Selo, 2 May' }, { ...aVUK, label: '' } ] }));   // the map already names Vukovar
  // 2. The siege begins: shelling; the hospital goes underground; the corn-field tracks
  set(1, { zoom: 'fit', markers: [ { ...HOSP, label: 'the hospital: patients moved to the basement' }, { ...TOWER, label: 'the water tower' } ], orders: [
    { leader: 'dedakovic', visible: true, delay: 3 }, { id: 'gunsS', state: 'hold' }, { id: 'mortS', state: 'hold' },
    { id: 'hrCorn', visible: true, to: CORNE, speed: 30, state: 'move', delay: 2 } ] });
  // 3. Battle for the barracks: from the south to the barracks (CIA line and arrows of 14 September)
  set(2, { media: R['record-cia-map-2.jpg'], focus: BARR, zoom: 1.4, fronts: ['sep14'], arrows: ['sep14'], markers: [ { ...BARR, label: 'the JNA barracks', side: 'allied' } ], orders: [
    { id: 'hrCorn', gone: true }, { id: 'tankS', to: { x: BARR.x + 20, y: BARR.y + 30 }, speed: 40, state: 'move' }, { id: 'jnaS', to: { x: BARR.x - 30, y: BARR.y + 50 }, speed: 30, state: 'move' } ] });
  // 4. Trpinjska cesta: armoured columns from Trpinja; the anti-tank teams of Borovo Naselje
  set(3, { media: R['record-m84-wreck.jpg'], focus: { x: (TRP1.x + BOROVO.x) / 2, y: (TRP1.y + BOROVO.y) / 2 }, zoom: 1.6, fronts: ['sep14'], arrows: ['sep14'],
    markers: [ { ...TRP1, label: 'Trpinjska cesta' } ], orders: [
    { leader: 'zadro', visible: true }, { id: 'tankN', visible: true, at: TRP0, to: TRPEND, speed: 34, state: 'attack', delay: 1 },
    { id: 'hrAT', state: 'attack', delay: 4 }, { id: 'tankN', strengthTo: .6, over: 6, delay: 7 }, { id: 'tankN', to: TRP1, speed: 30, state: 'move', delay: 10 } ] });
  // 5. The offensive from Šid: the area map
  set(4, area({ fronts: ['sep14'], markers: [ { ...aSID, label: '▼ to Šid (Serbia)', side: 'allied' }, { ...aVINK, label: 'Vinkovci: JNA garrison leaves, 25 Sept' } ] }));
  // 6. Two new commands: the area map, the CIA line and arrows of 30 September
  set(5, area({ fronts: ['sep30'], arrows: ['sep30'], markers: [ { ...aNEGO, label: 'Negoslavci: Op. Group South', side: 'allied' }, { ...aNUSTAR, label: 'Nuštar: attacks, 3 and 5 Oct', below: true } ] }));
  // 7. The corn-field road: Marinci is cut; Dedaković goes out to Vinkovci; Borković takes over in the town
  set(6, area({ fronts: ['sep30'], markers: [ { ...aMARINCI, label: 'Marinci: captured, 1 Oct', side: 'allied', below: true }, { ...aBOGD, label: 'Bogdanovci' }, { ...aVINK, label: 'Vinkovci: Dedaković leads relief' } ], orders: [
    { leader: 'dedakovic', visible: false }, { leader: 'borkovic', visible: true } ] }));
  // 8. The northern attack: four arrows of 16 October on Borovo Naselje; Zadro is killed
  set(7, { focus: { x: (BOROVO.x + LUZAC.x) / 2, y: (BOROVO.y + LUZAC.y) / 2 }, zoom: 1.15, fronts: ['sep30'], arrows: ['oct16'], markers: [ { ...LUZAC, label: 'Lužac: floating bridge, 17–18 Oct (approx.)' } ], orders: [
    { leader: 'bratic', visible: true }, { leader: 'mrksic', visible: true },
    { id: 'jnaN', visible: true, at: { x: TRP1.x, y: TRP1.y - 40 }, to: { x: BOROVO.x - 30, y: BOROVO.y }, speed: 26, state: 'attack' },
    { id: 'apcN', visible: true, at: TRP1, to: TRPEND, speed: 30, state: 'attack', delay: 1 }, { id: 'tankN', strength: .8, to: { x: TRPEND.x - 20, y: TRPEND.y - 30 }, speed: 30, state: 'attack', delay: 2 },
    { leader: 'zadro', visible: false, delay: 8 }, { id: 'hrB', strengthTo: .75, over: 8, delay: 3 } ] });
  // 9. The convoy: in from Bogdanovci on the corn-field road, out by another way
  set(8, { zoom: 'fit', fronts: ['sep30'], markers: [ { ...HOSP, label: 'the hospital' } ], orders: [
    { obj: 'convoy', visible: true, at: CORNW, to: HOSP, via: [CORNE, MILOVO], speed: 60 },
    { obj: 'convoy', to: SOUTH, via: [SAJM], speed: 60, delay: 7 }, { obj: 'convoy', visible: false, delay: 13 } ] });
  // 10. Bogdanovci holds out: the area map
  set(9, area({ fronts: ['sep30'], markers: [ { ...aBOGD, label: 'Bogdanovci: attacked again, 29 October', side: 'french' }, { ...aNUSTAR, label: 'Nuštar' } ] }));
  // 11. Lužac and the river: the arrows of 3 and 8 November; Gen. Bratić killed in early November
  set(10, { focus: { x: (LUZAC.x + PORT.x) / 2, y: (LUZAC.y + PORT.y) / 2 }, zoom: 1.3, fronts: ['sep30'], arrows: ['nov3', 'nov8'], markers: [ { ...LUZAC, label: 'Lužac' }, { ...PORT, label: 'the port' } ], orders: [
    { id: 'jnaN', to: { x: LUZAC.x, y: LUZAC.y - 30 }, speed: 24, state: 'attack' }, { id: 'tankN', to: { x: LUZAC.x - 60, y: LUZAC.y - 60 }, speed: 26, state: 'attack' },
    { leader: 'bratic', visible: false, delay: 6 }, { id: 'hrB', strengthTo: .55, over: 8 }, { id: 'hrT', strengthTo: .8, over: 8 } ] });
  // 12. The ring closes: the area map and the CIA line of 10 November
  set(11, area({ fronts: ['nov10'], markers: [ { ...aBOGD, label: 'Bogdanovci falls, 10 November', side: 'allied' } ] }));
  // 13. Pockets: the CIA line of 10 November in the town
  set(12, { zoom: 'fit', fronts: ['nov10'], markers: [ { ...SILO, label: 'grain silo, lost 13 Nov (place approx.)', below: true } ], orders: [
    { id: 'toS', visible: true, to: { x: SAJM.x + 40, y: SAJM.y + 40 }, speed: 24, state: 'attack' }, { id: 'jnaS', to: { x: MILOVO.x - 20, y: MILOVO.y + 50 }, speed: 22, state: 'attack' },
    { id: 'hrB', strengthTo: .35, over: 10 }, { id: 'hrT', strengthTo: .55, over: 10 }, { id: 'hrM', strengthTo: .6, over: 10 }, { id: 'hrPol', strengthTo: .5, over: 10 } ] });
  // 14. The fall: Mitnica surrenders to the JNA
  set(13, { focus: MITNICA, zoom: 1.3, fronts: ['nov10'], markers: [ { ...MITNICA, label: 'Mitnica: surrendered to the JNA, 18 November' } ], orders: [
    { id: 'tankS', to: { x: TOWER.x - 40, y: TOWER.y + 40 }, speed: 30, state: 'move' }, { id: 'toS', to: { x: MITNICA.x - 60, y: MITNICA.y + 40 }, speed: 20, state: 'move' },
    { id: 'hrM', gone: true, delay: 5 }, { id: 'hrMor', gone: true, delay: 5 }, { id: 'hrT', gone: true, delay: 9 }, { id: 'hrPol', gone: true, delay: 9 }, { leader: 'borkovic', visible: false, delay: 9 } ] });
  // 15. After the guns: Velepromet, the hospital, the bridge; the monitors kept out
  set(14, { media: R['record-street-1991.jpg'], photo: R['record-flag-1991.jpg'] ? Object.assign({}, R['record-flag-1991.jpg'], { at: 22, secs: 10 }) : undefined, zoom: 'fit', markers: [ { ...VELE, label: 'Velepromet (place approx.)' }, { ...HOSP, label: 'the hospital' }, { ...BRIDGE, label: 'the bridge' } ], orders: [
    { id: 'hrB', gone: true, delay: 6 }, { id: 'hrAT', gone: true, delay: 6 }, { obj: 'monitors', visible: true, delay: 2 },
    { id: 'jnaS', to: { x: HOSP.x - 40, y: HOSP.y + 40 }, speed: 26, state: 'move' } ] });

  // the introduction: which map, lines and pictures each slide shows
  const IS = S.intro, M = (f) => R[f] ? [R[f]] : [];
  if (R['record-water-tower-2003.jpg']) R['record-water-tower-2003.jpg'].fit = 'contain';   // an upright photo: show the whole tower, not a crop
  S.outcome.forEach(l => { if (/Memorial Cemetery/.test(l.text) && R['record-memorial-cemetery-2015.jpg']) l.media = R['record-memorial-cemetery-2015.jpg']; });   // the remembrance on 18 November
  Object.assign(IS[0], { media: M('record-water-tower-2003.jpg').concat(M('record-street-1991.jpg').map(m => Object.assign({}, m, { at: 14 }))) });
  Object.assign(IS[1], { altMap: 'area', markers: [ { ...aVUK, label: 'Vukovar' }, { ...aVINK, label: 'Vinkovci' } ] });
  Object.assign(IS[2], { media: M('record-old-town-1991.jpg'), markers: [ { ...TOWER, label: 'the water tower' }, { ...HOSP, label: 'the hospital' }, { ...BOROVO, label: 'Borovo Naselje' } ] });
  Object.assign(IS[4], { altMap: 'area', fronts: ['sep14', 'sep30', 'nov10'], media: M('record-cia-map-2.jpg') });
})();
