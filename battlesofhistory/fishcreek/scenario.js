/*
  Historical Scenario File — Battle of Fish Creek (Tourond's Coulee), 24 April 1885
  -----------------------------------------------------------------
  The narrated introduction (`intro`), the reenactment chapters (`events`), the debrief (`outcome`) and the captions of the
  "From the record" prints (`record`), word for word from NARRATION-SCRIPT.md (draft 2), which is what the narrators will
  record (audio/<voice>/). This part is written by tools/make-scenario-text.py; the map, armies and moves are set in the
  block below the marker line.
  Tags: established, account (one witness or historian), disputed, estimate, reconstruction.
*/
window.FISHCREEK_SCENARIO = window.FISHCREEK_SCENARIO || {};
Object.assign(window.FISHCREEK_SCENARIO, {
  id: 'fishcreek',
  title: 'Battle of Fish Creek',
  date: '24 April 1885',
  place: 'Fish Creek (Tourond’s Coulee), beside the South Saskatchewan River (today in Saskatchewan, Canada)',
  tagline: 'The North-West Field Force vs. the Métis, Dakota and Cree fighters of Gabriel Dumont',
  confidence: {
    established:    { label: 'Established',    color: '#5fcf8a', desc: 'Agreed by historians.' },
    account:        { label: 'Account',        color: '#ffd27a', desc: 'One witness or one historian, named where it matters; not confirmed by other sources.' },
    disputed:       { label: 'Disputed',       color: '#ff9a86', desc: 'The sources disagree, or historians do.' },
    estimate:       { label: 'Estimate',       color: '#e9c77a', desc: 'An estimate, not a recorded figure.' },
    reconstruction: { label: 'Reconstruction', color: '#c8a2ff', desc: 'Our own choice, to make the battle visible: where each army stood and how it moved.' }
  },
  sides: {
    allied: { name: 'North-West Field Force', short: 'Field Force', army: 'The North-West Field Force of Major-General Frederick Middleton', color: '#c0392b', light: '#ffd6d0' },
    french: { name: 'Métis, Dakota and Cree fighters', short: 'Defenders', army: 'The Métis, Dakota and Cree fighters of Gabriel Dumont', color: '#2e5aa8', light: '#d0dcff' }
  },
  welcome: "Welcome to Battles of History. Today we are learning about the Battle of Fish Creek, also called Tourond's Coulee, fought on the 24th of April 1885, beside the South Saskatchewan River in what is now Saskatchewan, Canada. On one side was a Canadian government army under Major-General Frederick Middleton. On the other were Métis, Dakota and Cree fighters led by Gabriel Dumont.",
  intro: [
  {
    "title": "BATTLE OF FISH CREEK",
    "lines": [
      {
        "text": "In April 1885, a Canadian army marched north toward the Métis village of Batoche. On the way, at a wooded valley called Tourond's Coulee, a much smaller force of Métis, Dakota and Cree fighters lay in wait. For most of a day they held the army back.",
        "tag": "established"
      },
      {
        "text": "These events were long called the North-West Rebellion. Today they are more often called the North-West Resistance, the name used by Parks Canada and the Métis Nation.",
        "tag": "established"
      }
    ],
    "media": [
      {
        "at": 0,
        "file": "cover.jpg",
        "caption": "\"The Battle of Fish Creek\", printed in Toronto in July 1885 from sketches by Fred W. Curzon, the Illustrated War News's artist with the army. The soldiers advance across the open prairie toward the wooded coulee, the guns fire, and smoke rises from a burning building. It is the army's view of the day, drawn for readers in the East. The fighters in the coulee are hardly seen: that was the point of their position.",
        "credit": "Coloured lithograph, 1885 by Fred W. Curzon, published 4 July 1885 (Library and Archives Canada C-002425). Public domain (published before 1931; artist dead over 70 years). Wikimedia Commons: Battle_of_Fish_Creek.jpg (640 × 465)"
      }
    ]
  },
  {
    "title": "The Métis and the crisis of 1885",
    "lines": [
      {
        "text": "The Métis are a people born of the fur trade, with First Nations and European roots, their own language, Michif, and their own way of life on the plains: buffalo hunting, freighting and farming.",
        "tag": "established"
      },
      {
        "text": "Along the South Saskatchewan they farmed long, narrow river lots. By the 1880s the buffalo were gone, title to their land was slow to come, and their petitions to Ottawa went mostly unanswered. The Cree and other First Nations faced hunger, and felt that the government was not keeping its treaty promises.",
        "tag": "established"
      },
      {
        "text": "In 1884 the Métis asked Louis Riel to come back from Montana and lead them. Riel had led the Red River Resistance of 1869 and 1870, which brought Manitoba into Canada. In March 1885 Riel and his followers declared a provisional government at Batoche. Gabriel Dumont, a buffalo-hunt captain famous on the plains, led its fighters.",
        "tag": "established"
      }
    ],
    "media": [
      {
        "at": 0,
        "file": "metis-flag.png",
        "caption": "The Métis flag: a white infinity sign on a blue field. A central symbol of the Métis Nation; no source shows it flying at Fish Creek in 1885, so it is shown here as history, not on the battlefield",
        "credit": "Drawing by Xasartha (2014) after Flags of the World (crwflags.com/fotw/flags/ca_metis.html). Public domain: a simple flag design, ineligible for copyright. Wikimedia Commons: Flag_of_the_Metis_(francophone).PNG (586 × 292)",
        "fit": "contain"
      },
      {
        "at": 14,
        "file": "michif-chart.png",
        "caption": "Michif, the language of the Métis: most nouns, with their articles, come from French, and most verbs from Plains Cree",
        "credit": "Drawn for this project after Peter Bakker, A Language of Our Own (1997); batoche/tools/make-michif-chart.py. Free to use.",
        "fit": "contain"
      },
      {
        "at": 30,
        "file": "riel-1884-bennetto.jpg",
        "caption": "Louis Riel, about 1884. He did not fight at Fish Creek: he turned back to Batoche on the 23rd of April",
        "credit": "Photo: I. Bennetto & Co., Winnipeg (Israel Bennetto, 1860–1946). University of Manitoba Archives, PC 107. Public domain in Canada (photo before 1949) and in the US (published before 1931). Wikimedia Commons: LouisRiel1870.jpg",
        "fit": "contain"
      }
    ]
  },
  {
    "title": "Duck Lake and the march north",
    "lines": [
      {
        "text": "On the 26th of March, at Duck Lake, Métis and First Nations fighters defeated a force of North-West Mounted Police and volunteers.",
        "tag": "established"
      },
      {
        "text": "Ottawa sent an army west on the new Canadian Pacific Railway. In less than a month, soldiers from Ontario and Manitoba were on the prairies. Their commander was a British officer, Major-General Frederick Middleton, aged fifty-nine.",
        "tag": "established"
      },
      {
        "text": "On the 6th of April Middleton left Fort Qu'Appelle and marched north, about twenty miles a day, through late snow. A newspaper picture of the march shows \"A\" Battery's guns stuck in a snowbank in the Touchwood Hills. Many of his men were farmers, clerks and shopkeepers. Some had never fired a rifle.",
        "tag": "account"
      },
      {
        "text": "At Clarke's Crossing, on the South Saskatchewan River, Middleton split his force in two, one column on each bank of the river. On the 23rd of April both columns moved off toward Batoche. That night Middleton's own column camped at the McIntosh farm, about ten kilometres short of Fish Creek.",
        "tag": "established"
      },
      {
        "text": "Splitting the army was the decision Middleton was most criticised for. If the fighting started, half his men would be on the wrong side of a wide river, with only one scow to cross it.",
        "tag": "account"
      }
    ],
    "media": [
      {
        "at": 0,
        "file": "middleton-1885-topley.jpg",
        "caption": "Major-General Frederick Middleton in his 1885 campaign dress, photographed in September 1885",
        "credit": "Photo: William James Topley (1845–1930), Ottawa. Library and Archives Canada, PA-026732 (MIKAN 3420736). Public domain (the photographer died in 1930). Wikimedia Commons: FrederickMiddleton.jpg",
        "fit": "contain"
      }
    ]
  },
  {
    "title": "Dumont's plan",
    "lines": [
      {
        "text": "Dumont wanted to fight as the buffalo hunters knew how: small groups, hidden in wooded coulees and bluffs, striking the soldiers on the march and keeping them from sleeping.",
        "tag": "account"
      },
      {
        "text": "Riel did not agree. He feared, among other things, that they might fire on French-Canadian friends among the soldiers. Dumont gave way, trusting, he said later, in Riel's faith and prayers. Riel allowed one ambush only: the one at Fish Creek.",
        "tag": "account"
      },
      {
        "text": "On the 23rd of April Dumont rode out of Batoche with about 200 men, and Riel went with them. On the way, word came that police might march on Batoche from Prince Albert. Riel turned back with about fifty men. Accounts differ on the details. Some say Gabriel's brother, Édouard Dumont, also stayed to guard the village.",
        "tag": "disputed"
      },
      {
        "text": "That night Dumont's scouts found Middleton's camp. The fighters chose to wait where the trail to Batoche dropped down into Fish Creek.",
        "tag": "account"
      },
      {
        "text": "By one account, Dumont hid about 130 men in a hollow beside the creek, and took about twenty horsemen further along. The plan was to let the column march down into the coulee, and then strike it from all sides.",
        "tag": "account"
      }
    ],
    "media": [
      {
        "at": 0,
        "file": "dumont-1885-buckskin.jpg",
        "caption": "Gabriel Dumont in the 1880s, standing with his rifle, in a fringed hide jacket and a wide-brimmed hat",
        "credit": "Photographer unknown; published in the Canadian Pictorial and Illustrated War News, 1885. Library and Archives Canada, R5839-2-7-F (MIKAN 3629842). Public domain in Canada (photo before 1949) and in the US (published before 1931). Wikimedia Commons: Gabriel_Dumont_(CPIWN,_1885).jpg",
        "fit": "contain"
      }
    ]
  },
  {
    "title": "The ground",
    "lines": [
      {
        "text": "Fish Creek is a small stream. It winds through a deep, wooded valley, a coulee, and runs into the South Saskatchewan River from the east.",
        "tag": "established"
      },
      {
        "text": "The valley takes its other name from the Tourond family. Josephte Tourond came here from Saint-François-Xavier, in Manitoba, in 1882 with her husband Joseph and their nine children. Joseph died the next year, and she farmed on as a widow. Her house stood above the coulee, and the Métis came to call the valley by her family's name.",
        "tag": "account"
      },
      {
        "text": "It was late April. The trees were still bare, and last year's grass lay dry and brown.",
        "tag": "reconstruction"
      },
      {
        "text": "The trail to Batoche ran down into the coulee, crossed the creek, and climbed out again. Below the rim, in brush and trees, the fighters dug rifle pits. They tied up their horses in the woods of the ravine. Parks Canada places the Tourond homestead on the east side of the creek, and the soldiers' positions on its west side.",
        "tag": "established"
      }
    ],
    "media": []
  },
  {
    "title": "The forces",
    "lines": [
      {
        "text": "On paper, Middleton's whole force came to about 900 men, though not all of them were in the fight. A history written in 1885 lists the column on his side of the river as about 300 men of the 90th Winnipeg Rifles, 120 gunners of \"A\" Battery with two nine-pounder guns, 40 infantry of \"C\" School, and about 60 mounted men of Boulton's Scouts, raised in southern Manitoba by Major Charles Boulton.",
        "tag": "estimate"
      },
      {
        "text": "Across the river, the other column, about 400 with its teamsters, had the 10th Royal Grenadiers from Toronto, the Winnipeg Field Battery with two more guns, and French's Scouts under Captain John French. Lieutenant-Colonel Montizambert commanded it, and Lord Melgund, Middleton's chief of staff, rode with it.",
        "tag": "estimate"
      },
      {
        "text": "Parks Canada counts about 150 defenders: Métis, Dakota and Cree. Hildebrandt says 200 Métis. Other counts run higher and lower.",
        "tag": "estimate"
      },
      {
        "text": "The Dakota came from Whitecap's band at Moose Woods, near Saskatoon. How many Dakota and Cree fought at Fish Creek, no source tells us.",
        "tag": "account"
      },
      {
        "text": "The soldiers had single-shot rifles and four cannon. The defenders had hunting rifles, some repeating Winchesters, many double-barrelled shotguns, and little ammunition. The army's rapid-firing Gatling gun had not yet arrived.",
        "tag": "established"
      }
    ],
    "media": [
      {
        "at": 0,
        "file": "rml-9-pounder-gun.jpg",
        "caption": "An RML 9-pounder field gun, the type \"A\" Battery brought to Fish Creek (museum piece, NB Military History Museum, CFB Gagetown)",
        "credit": "Photo: Skaarup.HA, 15 November 2012. CC BY-SA 3.0 (https://creativecommons.org/licenses/by-sa/3.0/). Wikimedia Commons: RML_9-pounder_8-cwt_Field_Gun,_NBMHM,_CFB_Gagetown_(5).JPG (1280 px copy)"
      }
    ]
  }
],
  events: [
  {
    "title": "The scouts",
    "clock": "Early morning, 24 April",
    "tag": "account",
    "text": "A light rain is falling. Boulton's Scouts ride ahead of the column, up the trail toward Fish Creek. They pass farmhouses that have been raided, and a camp the Métis have only just left, with its fires still smouldering. They send word back. Hildebrandt writes that this warning kept the column from walking straight into the trap."
  },
  {
    "title": "First shots",
    "clock": "About 9 a.m., 24 April",
    "tag": "established",
    "text": "Near the coulee, a scout follows fresh tracks toward Dumont's horsemen. Dumont tries to stop him; the accounts differ on how. Shots ring out. Boulton's men jump down from their horses, lie flat in the grass and fire back, while riders gallop to warn Middleton. From the coulee, the hidden fighters open fire. Parks Canada puts the start of the battle at about nine in the morning."
  },
  {
    "title": "The aides",
    "clock": "Morning, 24 April",
    "tag": "account",
    "text": "Middleton sends his aide, Captain Wise, back to hurry the main body forward. A shot from the bluffs hits Wise's horse. His other aide, Lieutenant Doucet, is wounded, and so are several men. At first the soldiers fall back a little. Boulton's small troop, about forty men, will have eight wounded by the end of the day."
  },
  {
    "title": "The guns",
    "clock": "Morning, 24 April",
    "tag": "reconstruction",
    "text": "The two nine-pounder guns of \"A\" Battery come up at a run and swing into place near the edge. One of their officers, Captain James Peters, carries a camera. He photographs his own guns going into action; one picture is inscribed about a quarter past ten. They are among the earliest surviving photographs taken during a battle. Out on the open rim, the gunners make easy targets for the riflemen below. By the end of the day \"A\" Battery has lost three men killed and twelve wounded: the first men of Canada's small regular army ever killed in battle."
  },
  {
    "title": "The Tourond house",
    "clock": "Morning, 24 April",
    "tag": "established",
    "text": "The gunners fire at the buildings above the coulee. Josephte Tourond's family has fled: her elderly mother, a sick son, daughters, daughters-in-law and grandchildren. During the battle their home is shelled into rubble; exactly when, no source says. But the rifle pits lie low in the ravine, and the shells mostly pass over them. The guns are made to hit things they can see, and in the coulee there is little to see."
  },
  {
    "title": "Into the ravine",
    "clock": "Late morning, 24 April",
    "tag": "established",
    "text": "The 90th Winnipeg Rifles try to rush down into the coulee and clear it. Each time, fire from the pits drives them back. For most of these young men, it is the first time anyone has shot at them. Soon they stop trying to rush. They crawl to the edge, lie flat, and fire down into the trees. One of Peters's photographs shows them there. An 1885 newspaper names Private Alexander Ferguson of the 90th as the first man killed."
  },
  {
    "title": "Middleton's cap",
    "clock": "Late morning, 24 April",
    "tag": "account",
    "text": "Middleton rides along the line to steady his men. A bullet passes through his fur cap. Later he told the story lightly, and called it Dumont's bullet, but no one can say who fired it. Captain Wise, peering over the edge of the ravine, is shot in the foot. By now both of Middleton's aides are wounded."
  },
  {
    "title": "The horses",
    "clock": "Around midday, 24 April",
    "tag": "established",
    "text": "The fighters' horses are tied in the woods of the ravine. From the rim, the soldiers can see them more easily than the men in the pits. Many of the horses are killed. For people of the buffalo hunt, horses meant food, freedom and speed. It is a heavy loss. Without them, the Métis will find it much harder to move fast across the prairie."
  },
  {
    "title": "The edge of the ravine",
    "clock": "Afternoon, 24 April",
    "tag": "disputed",
    "text": "The battle settles into a deadlock. The soldiers lie along the rim and fire down into the trees. The defenders stay in their pits and fire up. Neither side can move the other. Through the afternoon, many defenders slip away. Dumont keeps firing at every target he can find, to give the others heart. Dumont later said that Napoléon Nault, Riel's cousin, stayed beside him. By some counts, fewer than fifty are left in the coulee. One account says that at the worst moment only seven were still with Gabriel."
  },
  {
    "title": "The grass fire",
    "clock": "Afternoon, 24 April",
    "tag": "account",
    "text": "Dumont is down to a few cartridges; he later said he had only seven. He sets the dry grass alight, so that the wind carries fire and smoke toward the soldiers. Parks Canada says the soldiers put the fire out."
  },
  {
    "title": "The scow",
    "clock": "Afternoon, 24 April",
    "tag": "disputed",
    "text": "Across the river, the second column hears the firing. Its only scow, a flat river boat, had been sent off that morning to fetch fodder. Soldiers on the far bank shout across the water. Melgund cannot make out the words, but guesses that he is needed. When the scow is back, he takes some of the Royal Grenadiers, under Captain Mason, across the river. They come up into the line and take the place of the tired 90th. Most of the column crosses too late to fight. No source gives the time."
  },
  {
    "title": "Sleet",
    "clock": "Late afternoon, 24 April",
    "tag": "account",
    "text": "The rain turns to sleet. The firing dies down. Hildebrandt counts about six hours of fighting. On the rim, the soldiers are soaked and cold. In the coulee, the few defenders who are left are nearly out of cartridges."
  },
  {
    "title": "Riders from Batoche",
    "clock": "Evening, 24 April",
    "tag": "established",
    "text": "Late in the day, help arrives from Batoche: about seventy horsemen, led, by most accounts, by Gabriel's brother, Édouard Dumont. Many of the defenders have already gone. For those still in the pits, the riders bring hope, and a safe way home. One account says that Marguerite Caron, whose husband and son were in the coulee, urged Riel to send them."
  },
  {
    "title": "Back to camp",
    "clock": "Evening, 24 April",
    "tag": "established",
    "text": "Middleton decides not to try the coulee again. His army pulls back about a kilometre to camp, with the Grenadiers left along the ridge to cover them. Some defenders are still in their pits as the soldiers leave. They draw back to the far side of the coulee, and in the morning ride home to Batoche. The soldiers spend a cold, wet night in camp, behind a wall of wagons, caring for their wounded."
  }
],
  outcome: [
  {
    "text": "The army held the field, but it had not cleared the coulee, and its advance had stopped. A force of perhaps 150 had stopped one of about 400.",
    "tag": "established"
  },
  {
    "text": "Middleton's force had about 55 men killed or wounded. Sources differ on how many died. Parks Canada says ten dead and almost forty-five wounded; the Dictionary of Canadian Biography says six and forty-nine. Some of the wounded may have died later.",
    "tag": "estimate"
  },
  {
    "text": "Parks Canada counts six casualties among the defenders. Hildebrandt says four Métis were killed; some counts add two Dakota.",
    "tag": "estimate"
  },
  {
    "text": "The day after the battle, a soldier named Thomas Bull wrote to his father about how many of his comrades had fallen. Four days later, the gunners' commander, Captain Drury, wrote his list of wounded on a piece of birch bark. It is kept today in the Royal Canadian Artillery Museum.",
    "tag": "account"
  },
  {
    "text": "With no steamer yet on the river, many of the army's wounded were carried by wagon about forty miles to Saskatoon, by one account, where settlers nursed them in their homes. One of them, Trooper D'Arcy Baker of Boulton's Scouts, died two days after the battle and was buried beside his comrades.",
    "tag": "account"
  },
  {
    "text": "Middleton stayed at Fish Creek for about two weeks. He buried his dead, drilled his men, and waited for supplies and the river steamer Northcote, which arrived on the 5th of May. From then on, his army always marched together.",
    "tag": "established"
  },
  {
    "text": "Parks Canada calls Fish Creek a Métis psychological victory: a small force had stopped an army and lost fewer men. Hildebrandt ranks it, with Duck Lake, among the Métis' greatest military successes. Military historians answer that Middleton soon took back the lead, and Hildebrandt defends his slow, careful advance as the right way to fight an enemy in the bush.",
    "tag": "established"
  },
  {
    "text": "The victory had a cost. Many horses were lost, and much of the ammunition was spent. Riel allowed no more ambushes. Dumont said later that the soldiers could easily have been attacked on the way, \"and Riel never consented to let them do it.\"",
    "tag": "account"
  },
  {
    "text": "Middleton had learned something too. Before Batoche he said that the Métis were only dangerous \"when you play their game, bush fighting.\"",
    "tag": "account"
  },
  {
    "text": "On the 7th of May the army marched on toward Batoche. Two days later the battle there began. This time the Métis did not wait in a coulee on the trail. They dug in around their village. That battle has its own page.",
    "tag": "established"
  },
  {
    "text": "The Tourond family lost their home. The family's own memory, told apart from the shelling, is of soldiers burning it, killing their livestock and taking their belongings; they managed to hide the family clock, which survives today. Less than three weeks later they lost two sons, Calixte and Elzéar, who were killed at Batoche on the 12th of May. Josephte Tourond lived until 1928.",
    "tag": "account"
  },
  {
    "text": "The battlefield was named a National Historic Site in 1923. Today it is called the Battle of Tourond's Coulee / Fish Creek National Historic Site, to honour its Métis name. Archaeologists have found what is probably the cellar of the Tourond house, and the old trail. Middleton's camp, with a gravestone for some of the soldiers, is a separate site nearby. In Winnipeg, the Volunteer Monument remembers the 90th's dead. The Métis remember Tourond's Coulee in their own stories, and in Gabriel Dumont's account of the battle, which he dictated in 1889.",
    "tag": "established"
  }
],
  record: {
  "cover.jpg": {
    "at": 0,
    "file": "cover.jpg",
    "caption": "\"The Battle of Fish Creek\", printed in Toronto in July 1885 from sketches by Fred W. Curzon, the Illustrated War News's artist with the army. The soldiers advance across the open prairie toward the wooded coulee, the guns fire, and smoke rises from a burning building. It is the army's view of the day, drawn for readers in the East. The fighters in the coulee are hardly seen: that was the point of their position.",
    "credit": "Coloured lithograph, 1885 by Fred W. Curzon, published 4 July 1885 (Library and Archives Canada C-002425). Public domain (published before 1931; artist dead over 70 years). Wikimedia Commons: Battle_of_Fish_Creek.jpg (640 × 465)"
  },
  "record-incidents-1885.jpg": {
    "at": 0,
    "file": "record-incidents-1885.jpg",
    "caption": "Four scenes \"noted by an eye-witness\", in the 1885 paper's own words: the first advance; \"the death of Private Ferguson, 90th Batt., the first man shot dead\"; Captain Wise, Middleton's aide, who \"undertakes to avenge the death of his charger, and himself gets shot\"; and Grenadiers \"taking pot shots at the enemy\" after they crossed the river in the afternoon. These are the soldiers' stories, told for a Toronto paper. The Métis, Dakota and Cree side of the day was told later, by Gabriel Dumont and by families.",
    "credit": "From sketches by the paper's special artist F. W. Curzon, drawn by \"W.D.B.\"; The Canadian Pictorial & Illustrated War News, Toronto Lithographing Co., 1885. Public domain (published 1885). Scan: Gabriel Dumont Institute, Virtual Museum of Métis History and Culture, item 05365. Note: the captions are the 1885 paper's own words and view (the soldiers' side)."
  },
  "record-solemn-scene-1885.jpg": {
    "at": 0,
    "file": "record-solemn-scene-1885.jpg",
    "caption": "The front page of a Toronto paper, two weeks after the battle: soldiers standing by the graves of comrades killed at Fish Creek, with scouts on watch behind. It was drawn in Toronto from reports sent east. It shows that the army buried its dead near its camp, but details such as who read the service, or whether a band played, are the artist's, not a record. A gravestone for some of the soldiers still stands on the camp site.",
    "credit": "Lithograph signed \"W.D.B.\" (probably William D. Blatchly), Toronto Lithographing Co.; published by Grip Printing and Publishing Co., 1885. Public domain (published 1885). Scan: Gabriel Dumont Institute, Virtual Museum of Métis History and Culture, item 05422."
  }
}
});

/* ======================================================================================================================
   Maps, armies, leaders and their moves.
     battle map  images/terrain-battle.jpg  52.5641–52.5270 N, 106.2220–106.1405 W (about 5.5 x 4.1 km, 2400 x 1800 world px,
                 435 px to the km). x = (lon + 106.222) / 0.0815 * 2400; y = (52.5641 - lat) / 0.0371 * 1800.
   ILLUSTRATIVE POSITIONS. No 1885 plan of the battle has been lined up with today's ground (RESEARCH-NOTES.md, sections 4
   and 12), so every place below except the river and the coulee is our estimate, placed on the PAINTED ground: the cart
   trail comes up from the south as painted; it drops into the coulee and crosses Fish Creek north-east of the painted farm
   buildings; the rifle pits are in the brush below the north-east rim, the Field Force line along the south-west rim, the
   horses in the woods of the ravine. The Tourond house stands on the creek's east side, as Parks Canada places it (about
   500 m north-west of the Parks Canada site point, 52.53901 N 106.152659 W, which the painting puts inside the coulee).
   The painted farm on the west rim is left as a farm the soldiers pass. The scow crossing (Melgund) is placed near the
   creek mouth; where it really was is unknown. The camp is about 1 km back down the trail (Parks Canada: "approximately
   one kilometre"; the direction is ours). Every move is our reconstruction from the narration.
   ====================================================================================================================== */
(() => {
  const S = window.FISHCREEK_SCENARIO;
  const PI = Math.PI, NE = -PI / 4;   // the Field Force faces north-east, across the coulee
  const TOUROND = { x: 1990, y: 890 }, CROSSING = { x: 1725, y: 1065 }, PITS = { x: 1800, y: 1120 }, PITS2 = { x: 1900, y: 1240 }, FN = { x: 1770, y: 1000 },
        BLUFF = { x: 1720, y: 1560 }, CAMPSITE = { x: 1400, y: 1350 }, RIM90 = { x: 1640, y: 1250 }, GUNLINE = { x: 1565, y: 1250 }, RIMR = { x: 1830, y: 1455 },
        CAMP = { x: 1380, y: 1690 }, W_LAND = { x: 1113, y: 285 }, E_LAND = { x: 1340, y: 530 }, HORSES = { x: 1990, y: 1265 }, HORSES2 = { x: 2085, y: 1305 },
        MOUTH = { x: 1420, y: 560 }, WESTCOL = { x: 860, y: 250 };
  const TRAIL = [{ x: 1240, y: 1790 }, { x: 1270, y: 1640 }, { x: 1300, y: 1500 }, { x: 1340, y: 1390 }, { x: 1420, y: 1260 }, { x: 1500, y: 1120 }];
  const RIVER_UP = [{ x: 720, y: 1000 }, { x: 850, y: 800 }, { x: 1010, y: 600 }, { x: 1150, y: 450 }];   // the river's course, downstream to upstream
  const FIRE = [{ x: 1735, y: 1172 }, { x: 1775, y: 1218 }, { x: 1815, y: 1264 }, { x: 1855, y: 1310 }, { x: 1895, y: 1356 }];
  Object.assign(S, {
    titleCard: {
      title: 'BATTLE OF FISH CREEK', date: '24 April 1885',
      dateNote: 'At a wooded coulee on the trail to Batoche, Gabriel Dumont’s Métis, Dakota and Cree fighters ambush a Canadian army many times their number, and hold it back for most of a day.',
      dateRef: 'Parks Canada, Battle of Tourond’s Coulee / Fish Creek National Historic Site; Walter Hildebrandt, The Battle of Batoche (1989)',
      place: 'Tourond’s Coulee, beside the South Saskatchewan River, North-West Territories (today Saskatchewan, Canada)',
      sides: 'The North-West Field Force of Major-General Frederick Middleton  ·  The Métis, Dakota and Cree fighters of Gabriel Dumont'
    },
    world: { w: 2400, h: 1800 },
    terrain: 'terrain-battle.jpg',
    duration: 196, commandDuration: 300, commandFocus: { x: 1700, y: 1200 },
    battlefield: {
      scale: { px: 435, label: '1 km' },
      labels: [
        { x: 520, y: 1290, text: 'South Saskatchewan River', small: true, rotate: -.62 }, { x: 560, y: 1335, text: 'kisiskāciwani-sīpiy', small: true, rotate: -.62 },
        { x: 1560, y: 760, text: 'Fish Creek', small: true, rotate: .95 }, { x: 2190, y: 1500, text: 'Tourond’s Coulee', small: true, rotate: .5 },
        { x: 560, y: 120, text: 'west bank', small: true }, { x: 1180, y: 1720, text: 'trail from the south', small: true },
        { x: 2240, y: 440, text: 'to Batoche, about 25 km ▲', small: true }
      ]
    },
    eventMarkers: true,   // the chapters' pulsing rings are shown on the battle map
    globe: { target: { lon: -106.1527, lat: 52.539 }, region: { lon: -100, lat: 54 }, pull: 3.2, startLat: 35,
      periodNote: 'Canada in 1885',
      stop2: { center: { lon: -106.1, lat: 52.6 }, pull: 18, todayNote: 'Today’s towns', thenNote: 'The places of 1885' },
      labels: [ { lon: -75.70, lat: 45.42, text: 'Ottawa', size: .5, dot: true }, { lon: -97.14, lat: 49.90, text: 'Winnipeg', size: .5, dot: true },
                { lon: -106.1527, lat: 52.539, text: 'FISH CREEK', size: .85, pin: true, early: true } ] },
    establishing: [
      { file: 'establish-continent.jpg', secs: 5, pulse: { x: .3625, y: .574 }, credit: 'Canada and the northern United States. Painted for this project (AI-generated) over real elevation data.' },
      { file: 'establish-campaign.jpg', secs: 5, pulse: { x: .5476, y: .3818 }, credit: 'The North-West in 1885: the railway, Middleton’s march from Qu’Appelle (route approximate) and the fights of the spring. Painted for this project (AI-generated) over real elevation data.' },
      { file: 'establish-region.jpg', secs: 6, pulse: { x: .5995, y: .619 }, credit: 'The South Branch: Clarke’s Crossing, Fish Creek, Gabriel’s Crossing and Batoche. Painted for this project (AI-generated) over real elevation data.' }
    ],
    // The narration clips go in audio/<voice>/ (welcome, intro-1 … intro-6, event-1 … event-14, outcome), recorded from
    // tools/fishcreek-clear-lines.tsv. Until they are there, the page shows the text and the browser's own voice reads it.
    imageBase: 'images/', audioBase: 'audio/',
    voices: [
      { id: 'clear', name: 'Narrator 1 · clear', speaker: 25 }, { id: 'light', name: 'Narrator 2 · light', speaker: 60 },
      { id: 'bright', name: 'Narrator 3 · bright', speaker: 0 }, { id: 'deep', name: 'Narrator 4 · deep', speaker: 400 },
      { id: 'warm', name: 'Narrator 5 · warm', speaker: 7 }, { id: 'computer', name: 'Computer · calm', speaker: 500 }
    ],
    // Music: "Métis Fiddling for Dancing" (Métis Nation of Alberta), free for educational use; ../sounds/music/metis-fiddling/README.md.
    // The opening tune plays over the globe, the maps and the introduction; the fighting has none; a Red River Jig under the debrief.
    musicBase: '../sounds/music/metis-fiddling/',
    musicCredit: { instrument: 'fiddle', album: 'Métis Fiddling for Dancing', albumBy: 'Alex Kusturok, Donny L’Hirondelle & Garry Pruden · Métis Nation of Alberta',
      links: [ { label: 'Album (free download)', url: 'https://albertametis.com/culture/metis-fiddling-for-dancing/' }, { label: 'Alex Kusturok', url: 'https://alexkusturok.com' } ] },
    introMusic: { file: '06-fiddle-creek-two-step-garry-pruden.mp3', vol: .42, title: 'Fiddle Creek Two Step', artist: 'Garry Pruden' },
    outcomeMusic: { file: '10-red-river-jig-alex-kusturok.mp3', vol: .42, title: 'Red River Jig', artist: 'Alex Kusturok' },
    sfx: { rifle: ['lee-enfield-shot-02.mp3', 'lee-enfield-shot-03.mp3'], vol: .16 },
    attackSheets: { 'field-rifles': 'field-rifles-fire', 'field-grenadier': 'field-grenadier-attack', 'field-gun': 'field-gun-fire',
                    'metis-rifle': 'metis-rifle-fire', 'metis-shotgun': 'metis-shotgun-fire', 'firstnations-fighter': 'firstnations-fighter-fire' },
    fallen: { bySide: { allied: 'fallen-field', french: 'fallen-defenders' } },
    sheets: ['field-rifles', 'field-grenadier', 'field-scout', 'field-gun', 'metis-rifle', 'metis-shotgun', 'metis-horse', 'firstnations-fighter', 'ferry-scow'],
    sheetBy: { allied: { infantry: 'field-grenadier', archers: 'field-rifles', cavalry: 'field-scout' }, french: { infantry: 'metis-rifle', archers: 'metis-rifle', cavalry: 'metis-horse' } },
    sideArt: { allied: { cloth: '#7a1f1a', cloth2: '#222', pennant: '#c0392b' }, french: { cloth: '#2a3550', cloth2: '#3a2a1a', pennant: '#2e5aa8' } },
    legend: [ { label: 'North-West Field Force', color: '#c0392b', kind: 'dot' }, { label: 'Métis, Dakota and Cree defenders', color: '#2e5aa8', kind: 'dot' } ],
    clockYear: 1885,
    ai: { plans: {} }, commandLines: {},
    debrief: { allied: { victory: { title: 'Field Force victory', text: '' }, defeat: { title: 'Field Force defeat', text: '' }, stalemate: { title: 'Stalemate', text: '' } },
               french: { victory: { title: 'The defenders hold', text: '' }, defeat: { title: 'The coulee falls', text: '' }, stalemate: { title: 'Stalemate', text: '' } } }
  });
  S.sides.allied.rally = { x: 1300, y: 1700 }; S.sides.french.rally = { x: 2100, y: 700 };

  // Things on the map that change through the day (engine: S.mapObjects): the Tourond house (cells: intact, smoking,
  // burning, burnt), the smouldering camp the scouts find, the tethered horses and where they fell, the grass fire.
  const horse = (id, at, k) => ({ id, sheet: 'horses-fallen', x: at.x, y: at.y, h: 34, row: Math.floor(k / 4), col: k % 4, hidden: true, ground: true });
  S.mapObjects = [
    { id: 'farm', sheet: 'tourond-farm', x: TOUROND.x, y: TOUROND.y, h: 120, row: 0, col: 0, label: 'Tourond house' },
    { id: 'campfire', sheet: 'prairie-fire', x: CAMPSITE.x, y: CAMPSITE.y, h: 34, hidden: true, anim: { cells: [12, 13, 14, 15], fps: 1.5, mode: 'pingpong' } },
    { id: 'horses1', sheet: 'metis-horses', x: HORSES.x, y: HORSES.y, h: 52, anim: { row: 1, fps: 1.2, mode: 'pingpong' } },
    { id: 'horses2', sheet: 'metis-horses', x: HORSES2.x, y: HORSES2.y, h: 52, anim: { row: 3, fps: 1, mode: 'pingpong' } },
    horse('fallen1', { x: HORSES.x - 18, y: HORSES.y + 4 }, 0), horse('fallen2', { x: HORSES.x + 22, y: HORSES.y - 6 }, 5), horse('fallen3', { x: HORSES2.x - 20, y: HORSES2.y + 6 }, 10), horse('fallen4', { x: HORSES2.x + 18, y: HORSES2.y - 4 }, 13),
    ...FIRE.map((p, i) => ({ id: 'fire' + i, sheet: 'prairie-fire-line', x: p.x, y: p.y, h: 58, hidden: true }))
  ];

  const F = (o) => Object.assign({ power: 1, confidence: 'reconstruction' }, o);
  S.formations = [
    // Middleton's column on the east bank, up the trail from the south (Mulvany 1885, nominal strengths)
    F({ id: 'scouts', side: 'allied', name: 'Boulton’s Scouts', division: 'Boulton’s Scouts', type: 'cavalry', sheet: 'field-scout', cols: 4, rows: 1, x: 1262, y: 1660, facing: -PI / 2, confidence: 'established', note: 'Mounted volunteers raised in southern Manitoba by Major Charles Boulton: about 60 on paper, about 40 in the troop that day.' }),
    F({ id: 'r90', side: 'allied', name: '90th Winnipeg Rifles', division: '90th Rifles', type: 'archers', sheet: 'field-rifles', cols: 6, rows: 2, x: 1244, y: 1735, facing: -PI / 2, confidence: 'established', note: 'Winnipeg militia in dark rifle green: about 300 men (Mulvany). For most of them, the first time under fire.' }),
    F({ id: 'guns', side: 'allied', name: '"A" Battery', division: '"A" Battery', type: 'archers', sheet: 'field-gun', cols: 2, rows: 1, power: .8, h: 30, x: 1238, y: 1785, facing: -PI / 2, confidence: 'established', note: 'Canada’s small regular artillery from Quebec: about 120 gunners with two nine-pounder muzzle-loading guns.' }),
    // the column on the west bank of the river (Montizambert, with Lord Melgund)
    F({ id: 'gren', side: 'allied', name: '10th Royal Grenadiers', division: 'Royal Grenadiers', type: 'infantry', sheet: 'field-grenadier', cols: 5, rows: 2, x: WESTCOL.x, y: WESTCOL.y, facing: PI / 4, confidence: 'established', note: 'Toronto militia in scarlet: about 250 men, on the west bank of the river with the second column.' }),
    F({ id: 'wfb', side: 'allied', name: 'Winnipeg Field Battery', division: 'Winnipeg Battery', type: 'archers', sheet: 'field-gun', cols: 2, rows: 1, power: .8, h: 30, x: WESTCOL.x - 110, y: WESTCOL.y + 90, facing: PI / 4, confidence: 'established', note: 'Two more nine-pounders, with the west-bank column. Whether they crossed and fired that day is not known.' }),
    F({ id: 'french', side: 'allied', name: 'French’s Scouts', division: 'French’s Scouts', type: 'cavalry', sheet: 'field-scout', cols: 3, rows: 1, x: WESTCOL.x + 90, y: WESTCOL.y - 120, facing: PI / 4, confidence: 'established', note: 'Mounted scouts under Captain John French, with the west-bank column.' }),
    F({ id: 'scow', side: 'allied', name: 'The scow', division: 'the scow', type: 'cavalry', sheet: 'ferry-scow', cols: 1, rows: 1, h: 62, power: .1, x: 600, y: 1120, facing: -PI / 3, note: 'The second column’s only scow, a flat river boat: sent off that morning to fetch fodder.' }),
    F({ id: 'mason', side: 'allied', name: 'Royal Grenadiers under Captain Mason', division: 'Grenadiers (Mason)', type: 'infantry', sheet: 'field-grenadier', cols: 4, rows: 2, hidden: true, x: E_LAND.x, y: E_LAND.y, confidence: 'account', note: 'The Grenadiers Melgund brought across by scow in the afternoon (Middleton, quoted by Black, 1913).' }),
    // the defenders, hidden in the coulee until the first shots
    F({ id: 'pits', side: 'french', name: 'Métis riflemen in the pits', division: 'Métis', type: 'archers', sheet: 'metis-rifle', cols: 5, rows: 1, hidden: true, x: PITS.x, y: PITS.y, facing: 3 * PI / 4, note: 'Rifle pits dug in the brush below the rim, where the trail drops into the coulee.' }),
    F({ id: 'pits2', side: 'french', name: 'Métis with shotguns', division: 'Métis', type: 'archers', sheet: 'metis-shotgun', cols: 4, rows: 1, hidden: true, x: PITS2.x, y: PITS2.y, facing: 3 * PI / 4, note: 'Many of the defenders had double-barrelled shotguns, and little ammunition.' }),
    F({ id: 'fn', side: 'french', name: 'Dakota and Cree fighters', division: 'Dakota and Cree', type: 'archers', sheet: 'firstnations-fighter', cols: 4, rows: 1, hidden: true, x: FN.x, y: FN.y, facing: 3 * PI / 4, confidence: 'account', note: 'Dakota of Whitecap’s band from Moose Woods, and Cree. How many fought, no source tells us.' }),
    F({ id: 'horse', side: 'french', name: 'Dumont’s horsemen', division: 'Dumont’s riders', type: 'cavalry', sheet: 'metis-horse', cols: 3, rows: 1, hidden: true, x: BLUFF.x, y: BLUFF.y, facing: PI, confidence: 'account', note: 'About twenty riders Dumont took further along the trail (one account).' }),
    F({ id: 'edouard', side: 'french', name: 'Riders from Batoche', division: 'Riders from Batoche', type: 'cavalry', sheet: 'metis-horse', cols: 4, rows: 2, hidden: true, x: 2250, y: 40, facing: PI / 2, confidence: 'established', note: 'About seventy horsemen (Parks Canada), led by most accounts by Gabriel’s brother Édouard Dumont.' })
  ];
  S.leaders = [
    { id: 'middleton', name: 'Maj-Gen Middleton', side: 'allied', x: 1210, y: 1700, facing: -PI / 2 },
    { id: 'boulton', name: 'Maj. Boulton', side: 'allied', x: 1300, y: 1640, facing: -PI / 2, noAttack: true },
    { id: 'melgund', name: 'Lord Melgund', side: 'allied', x: WESTCOL.x + 120, y: WESTCOL.y + 40, facing: PI / 4, noAttack: true },
    { id: 'dumont', name: 'Gabriel Dumont', side: 'french', x: BLUFF.x + 40, y: BLUFF.y - 50, facing: PI, hidden: true }
  ];

  const EV = S.events; EV.forEach((e, i) => { e.clipNo = i + 1; e.orders = e.orders || []; e.t = i * 14; });
  const set = (i, o) => Object.assign(EV[i], o);
  const R = S.record, rim = (dx, dy) => ({ x: RIM90.x + dx, y: RIM90.y + dy }), face = { x: 1850, y: 1150 };
  // 1. The scouts: the column comes up the trail in the rain; the scouts find the abandoned camp
  set(0, { media: R['cover.jpg'], rain: .45, zoom: 'fit', markers: [ Object.assign({ label: 'a camp just left, fires still smouldering' }, CAMPSITE) ], orders: [
    { obj: 'campfire', visible: true },
    { id: 'scouts', to: { x: 1350, y: 1420 }, via: TRAIL.slice(1, 3), speed: 34 }, { leader: 'boulton', to: { x: 1395, y: 1395 }, speed: 34 },
    { id: 'r90', to: { x: 1285, y: 1590 }, via: [TRAIL[1]], speed: 14 }, { id: 'guns', to: { x: 1262, y: 1690 }, speed: 12 },
    { leader: 'middleton', to: { x: 1225, y: 1600 }, speed: 14 } ] });
  // 2. First shots: a scout follows the tracks toward Dumont's horsemen; the coulee opens fire
  set(1, { focus: { x: 1560, y: 1420 }, zoom: 1.35, markers: [ Object.assign({ label: 'Dumont’s horsemen', side: 'french' }, BLUFF) ], orders: [
    { id: 'horse', visible: true, state: 'attack' }, { leader: 'dumont', visible: true },
    { id: 'scouts', to: { x: 1500, y: 1470 }, speed: 45, state: 'attack', face: BLUFF }, { leader: 'boulton', to: { x: 1470, y: 1420 }, speed: 45 },
    { id: 'pits', visible: true, state: 'attack', delay: 5 }, { id: 'pits2', visible: true, state: 'attack', delay: 6 }, { id: 'fn', visible: true, state: 'attack', delay: 7 },
    { id: 'r90', to: { x: 1320, y: 1480 }, speed: 30 }, { leader: 'middleton', to: { x: 1290, y: 1520 }, speed: 35 } ] });
  // 3. The aides: Wise sent back for the main body; his horse hit; the soldiers fall back a little
  set(2, { media: R['record-incidents-1885.jpg'], focus: { x: 1420, y: 1460 }, zoom: 1.45, markers: [ { x: 1330, y: 1525, label: 'Captain Wise’s horse is hit', side: 'allied' } ], orders: [
    { id: 'scouts', to: { x: 1440, y: 1500 }, speed: 30, state: 'attack', face: BLUFF }, { id: 'scouts', strengthTo: 88, over: 8 },
    { leader: 'boulton', to: { x: 1420, y: 1455 }, speed: 30 }, { id: 'r90', to: { x: 1350, y: 1430 }, speed: 30 }, { id: 'guns', to: { x: 1290, y: 1560 }, via: [TRAIL[1]], speed: 30 },
    { leader: 'middleton', to: { x: 1300, y: 1470 }, speed: 30 } ] });
  // 4. The guns: "A" Battery comes up at a run to the edge; the 90th spread along the rim; Dumont's riders back into the coulee
  set(3, { focus: { x: 1640, y: 1240 }, zoom: 1.45, markers: [ Object.assign({ label: '“A” Battery at the edge', side: 'allied' }, { x: GUNLINE.x, y: GUNLINE.y - 10 }) ], orders: [
    { id: 'guns', to: GUNLINE, via: TRAIL.slice(3, 5), speed: 65, state: 'attack', face }, { id: 'guns', strengthTo: 86, over: 12 },
    { id: 'r90', to: RIM90, via: [TRAIL[3]], speed: 40, state: 'attack', face }, { leader: 'middleton', to: { x: 1520, y: 1320 }, via: [TRAIL[3]], speed: 40 },
    { id: 'scouts', to: RIMR, speed: 35, state: 'attack', face }, { leader: 'boulton', to: { x: RIMR.x - 40, y: RIMR.y + 50 }, speed: 35 },
    { id: 'horse', to: { x: 1850, y: 1180 }, via: [{ x: 1900, y: 1420 }], speed: 40, state: 'attack', face: RIM90 }, { leader: 'dumont', to: { x: 1850, y: 1075 }, via: [{ x: 1930, y: 1380 }], speed: 40 } ] });
  // 5. The Tourond house: shelled; set smoking, then burning (when exactly, no source says)
  set(4, { focus: { x: 1820, y: 1050 }, zoom: 1.4, markers: [ Object.assign({ label: 'the Tourond house' }, { x: TOUROND.x, y: TOUROND.y - 40 }) ], orders: [
    { obj: 'farm', col: 1 }, { obj: 'farm', col: 2, delay: 5 }, { id: 'guns', state: 'attack' }, { id: 'pits', state: 'attack' }, { id: 'pits2', state: 'attack' } ] });
  // 6. Into the ravine: the 90th rush down twice and are driven back to the rim, then lie flat and fire
  set(5, { media: R['record-incidents-1885.jpg'], focus: { x: 1720, y: 1180 }, zoom: 1.6, markers: [ { x: 1745, y: 1175, label: 'the 90th rush the coulee', side: 'allied' } ], orders: [
    { id: 'r90', to: { x: 1735, y: 1180 }, speed: 45, state: 'attack' }, { id: 'r90', strengthTo: 91, over: 10 },
    { id: 'r90', to: RIM90, speed: 40, state: 'attack', face, delay: 4 },
    { id: 'r90', to: { x: 1715, y: 1195 }, speed: 45, state: 'attack', delay: 7 },
    { id: 'r90', to: rim(0, 6), speed: 35, state: 'attack', face, delay: 10 }, { id: 'pits', state: 'attack' }, { id: 'fn', state: 'attack' } ] });
  // 7. Middleton's cap: he rides along the line; Wise is shot in the foot at the edge
  set(6, { media: R['record-incidents-1885.jpg'], focus: { x: 1700, y: 1340 }, zoom: 1.6, markers: [ { x: 1700, y: 1330, label: 'a bullet through Middleton’s cap', side: 'allied' } ], orders: [
    { leader: 'middleton', to: { x: 1790, y: 1420 }, via: [{ x: 1600, y: 1310 }, { x: 1700, y: 1350 }], speed: 28 },
    { id: 'r90', state: 'attack' }, { id: 'guns', state: 'attack' }, { id: 'scouts', state: 'attack' }, { id: 'pits', state: 'attack' } ] });
  // 8. The horses: tied in the woods of the ravine, seen from the rim; many are killed
  set(7, { focus: { x: 2000, y: 1290 }, zoom: 1.7, markers: [ { x: 2035, y: 1280, label: 'the horses in the ravine', side: 'french' } ], orders: [
    { id: 'scouts', state: 'attack' }, { id: 'guns', state: 'attack' },
    { obj: 'horses1', visible: false, delay: 4 }, { obj: 'fallen1', visible: true, delay: 4 }, { obj: 'fallen2', visible: true, delay: 4.5 },
    { obj: 'horses2', visible: false, delay: 6 }, { obj: 'fallen3', visible: true, delay: 6 }, { obj: 'fallen4', visible: true, delay: 6.5 } ] });
  // 9. The edge of the ravine: deadlock; many defenders slip away; Dumont and Nault keep firing; the house is rubble
  set(8, { focus: { x: 1830, y: 1150 }, zoom: 1.45, markers: [ { x: 1850, y: 1075, label: 'Dumont, with Napoléon Nault', side: 'french' } ], orders: [
    { obj: 'farm', col: 3 },
    { id: 'pits', strengthTo: 45, over: 10, state: 'attack' }, { id: 'pits2', strengthTo: 35, over: 10, state: 'attack' }, { id: 'horse', strengthTo: 45, over: 10 },
    { id: 'fn', to: { x: 2250, y: 620 }, via: [{ x: 1900, y: 900 }], speed: 22, delay: 2 }, { id: 'fn', visible: false, delay: 13 },
    { id: 'r90', state: 'attack' }, { id: 'guns', state: 'attack' } ] });
  // 10. The grass fire: Dumont, down to a few cartridges, sets the dry grass alight; the wind carries it toward the soldiers
  set(9, { focus: { x: 1790, y: 1260 }, zoom: 1.6, markers: [ { x: 1815, y: 1250, label: 'Dumont’s grass fire', side: 'french' } ], orders: [
    ...FIRE.map((p, i) => ({ obj: 'fire' + i, visible: true, anim: { cells: [...Array(16).keys()], fps: 1.25, mode: 'once', delay: i * .6 } })),
    { id: 'r90', state: 'attack' }, { id: 'pits', state: 'attack' } ] });
  // 11. The scow: back from fetching fodder, it carries Melgund and some Grenadiers across; they relieve the tired 90th
  set(10, { media: R['record-incidents-1885.jpg'], focus: { x: 1180, y: 470 }, zoom: 1.35, hold: 14, markers: [ Object.assign({ label: 'the scow crosses', side: 'allied' }, { x: 1225, y: 400 }) ], orders: [
    { id: 'scow', to: W_LAND, via: RIVER_UP, speed: 150 }, { id: 'gren', to: { x: W_LAND.x - 60, y: W_LAND.y - 40 }, speed: 40 }, { leader: 'melgund', to: { x: W_LAND.x - 40, y: W_LAND.y + 10 }, speed: 40 },
    { id: 'gren', strengthTo: 65, over: 1, delay: 7.5 }, { leader: 'melgund', visible: false, delay: 7.5 },
    { id: 'scow', to: E_LAND, speed: 60, delay: 7.6 },
    { id: 'mason', visible: true, at: E_LAND, to: { x: 1700, y: 1320 }, via: [{ x: 1300, y: 760 }, { x: 1420, y: 1000 }, { x: 1560, y: 1200 }], speed: 60, state: 'attack', face, delay: 12.6 },
    { leader: 'melgund', visible: true, at: { x: E_LAND.x - 20, y: E_LAND.y + 20 }, to: { x: 1630, y: 1340 }, speed: 60, delay: 12.6 },
    { id: 'r90', to: rim(-90, 60), speed: 25, face, delay: 13 } ] });
  // 12. Sleet: the firing dies down; the fire is out
  set(11, { rain: 1, sleet: true, zoom: 'fit', orders: [
    ...FIRE.map((p, i) => ({ obj: 'fire' + i, visible: false })), { obj: 'campfire', visible: false },
    { id: 'pits', strengthTo: 30, over: 10, state: 'hold' }, { id: 'pits2', state: 'hold' }, { id: 'horse', state: 'hold' },
    { id: 'r90', state: 'hold' }, { id: 'guns', state: 'hold' }, { id: 'scouts', state: 'hold' }, { id: 'mason', state: 'hold' } ] });
  // 13. Riders from Batoche: about seventy horsemen come down from the north
  set(12, { rain: .35, focus: { x: 2050, y: 760 }, zoom: 1.3, hold: 11, markers: [ { x: 2150, y: 470, label: 'about seventy riders from Batoche', side: 'french' } ], orders: [
    { id: 'edouard', visible: true, to: { x: 2010, y: 980 }, via: [{ x: 2190, y: 450 }], speed: 75, state: 'attack' }, { id: 'pits', state: 'attack' } ] });
  // 14. Back to camp: the army pulls back about a kilometre, the Grenadiers left along the ridge; the defenders draw back
  set(13, { media: R['record-solemn-scene-1885.jpg'], zoom: 'fit', markers: [ Object.assign({ label: 'the camp, behind a wall of wagons', side: 'allied' }, CAMP), { x: 1700, y: 1300, label: 'Grenadiers along the ridge', side: 'allied' } ], orders: [
    { id: 'r90', to: { x: CAMP.x - 40, y: CAMP.y - 10 }, via: [TRAIL[3]], speed: 30, state: 'move' }, { id: 'guns', to: { x: CAMP.x + 60, y: CAMP.y + 20 }, via: [TRAIL[3]], speed: 30, state: 'move' },
    { id: 'scouts', to: { x: CAMP.x + 70, y: CAMP.y - 60 }, speed: 30, state: 'move' }, { leader: 'middleton', to: { x: CAMP.x, y: CAMP.y - 70 }, speed: 30 }, { leader: 'boulton', to: { x: CAMP.x + 110, y: CAMP.y - 90 }, speed: 30 },
    { id: 'mason', to: { x: 1700, y: 1300 }, speed: 20, state: 'hold', face }, { leader: 'melgund', to: { x: 1640, y: 1350 }, speed: 20 },
    { id: 'pits', to: { x: 1940, y: 1010 }, speed: 18, state: 'move', delay: 3 }, { id: 'pits2', to: { x: 2010, y: 1110 }, speed: 18, state: 'move', delay: 3 },
    { id: 'horse', to: { x: 1990, y: 950 }, speed: 20, state: 'move', delay: 3 }, { id: 'edouard', to: { x: 2080, y: 900 }, speed: 20, state: 'move', delay: 3 }, { leader: 'dumont', to: { x: 1960, y: 1020 }, speed: 18, delay: 3 } ] });

  // The introduction's battle map: where the armies are at dawn, and the places the narrator names
  S.intro[3].markers = [ Object.assign({ label: 'the hollow: about 130 men', side: 'french' }, PITS), Object.assign({ label: 'Dumont and about twenty horsemen', side: 'french' }, BLUFF) ];
  Object.assign(S.intro[3], { focus: { x: 1650, y: 1350 }, zoom: 1.2 });
  S.intro[4].markers = [ Object.assign({ label: 'the Tourond house' }, { x: TOUROND.x, y: TOUROND.y - 40 }), Object.assign({ label: 'the trail crosses Fish Creek' }, CROSSING), Object.assign({ label: 'the horses' }, HORSES) ];
  Object.assign(S.intro[4], { focus: { x: 1800, y: 1100 }, zoom: 1.3 });
  S.intro[5].markers = [ Object.assign({ label: 'Middleton’s column', side: 'allied' }, { x: 1250, y: 1700 }), Object.assign({ label: 'the second column, across the river', side: 'allied' }, WESTCOL) ];

  S.units = [
    { side: 'allied', type: 'archers', sheet: 'field-rifles', portrait: 'rifles', name: '90th Winnipeg Rifles', desc: 'Winnipeg militia in dark rifle green, with Snider rifles.', tag: 'established',
      lines: [ { text: 'About 300 men in the column (Mulvany, 1885). They tried to rush the coulee and were driven back; then they lay along the edge and fired down. An 1885 newspaper names Private Alexander Ferguson as the first man killed.', tag: 'account' } ] },
    { side: 'allied', type: 'archers', sheet: 'field-gun', portrait: false, name: '“A” Battery', desc: 'Canada’s regular gunners, with two nine-pounder guns.', tag: 'established', photos: ['rml-9-pounder-gun.jpg'],
      lines: [ { text: 'Out on the open rim they were easy targets: three killed and twelve wounded by the end of the day, the first men of Canada’s small regular army killed in battle.', tag: 'account' } ] },
    { side: 'allied', type: 'cavalry', sheet: 'field-scout', portrait: 'scout', name: 'Boulton’s Scouts', desc: 'Mounted volunteers from southern Manitoba, riding ahead of the column.', tag: 'established',
      lines: [ { text: 'Their warning kept the column from walking into the trap (Hildebrandt). About forty in the troop; eight wounded by the end of the day.', tag: 'account' } ] },
    { side: 'allied', type: 'infantry', sheet: 'field-grenadier', portrait: 'grenadier', name: '10th Royal Grenadiers', desc: 'Toronto militia in scarlet, with the column on the west bank.', tag: 'established',
      lines: [ { text: 'Some of them, under Captain Mason, crossed by scow in the afternoon and took the place of the tired 90th.', tag: 'account' } ] },
    { side: 'allied', type: 'infantry', portrait: 'middleton', name: 'Maj-Gen Frederick Middleton', desc: 'A British officer, aged 59, commanding Canada’s militia.', tag: 'established', photos: ['middleton-1885-topley.jpg'],
      lines: [ { text: 'A bullet passed through his fur cap. He called it Dumont’s bullet, but no one can say who fired it.', tag: 'account' } ] },
    { side: 'french', type: 'archers', sheet: 'metis-rifle', portrait: 'metis', name: 'Métis fighters', desc: 'Buffalo hunters and farmers in rifle pits below the rim, with hunting rifles and shotguns.', tag: 'established',
      lines: [ { text: 'About 150 defenders in all, Métis, Dakota and Cree (Parks Canada); Hildebrandt says 200 Métis. By some counts fewer than fifty were left by the afternoon.', tag: 'estimate' } ] },
    { side: 'french', type: 'archers', sheet: 'firstnations-fighter', portrait: 'firstnations', name: 'Dakota and Cree fighters', desc: 'Dakota of Whitecap’s band from Moose Woods, and Cree.', tag: 'account',
      lines: [ { text: 'How many Dakota and Cree fought at Fish Creek, no source tells us.', tag: 'account' } ] },
    { side: 'french', type: 'cavalry', portrait: 'dumont', name: 'Gabriel Dumont', desc: 'Buffalo-hunt captain, aged 47; the Métis military leader.', tag: 'established', photos: ['dumont-1885-buckskin.jpg'],
      lines: [ { text: 'He kept firing at every target he could find to give the others heart, and, down to a few cartridges, set the grass alight. He dictated his account of the battle in 1889.', tag: 'account' } ] }
  ];
  const C = (title, intro, items) => ({ title, intro, items: items.map(([ref, note]) => ({ ref, note })) });
  S.citations = {
    established: C('Established', 'Agreed by historians.', [['Parks Canada, Battle of Tourond’s Coulee / Fish Creek National Historic Site', 'The site, the time of the first shots, the house shelled into rubble, the seventy riders, the casualties.'], ['Walter Hildebrandt, The Battle of Batoche (Parks Canada, 1989)', 'The march, the coulee, the six hours of fighting.'], ['Dictionary of Canadian Biography', 'Dumont, Middleton, the horses.']]),
    account: C('Account', 'One witness or one historian.', [['Middleton’s report and his account, quoted by Black (1913) and Hildebrandt (1989)', 'The aides, the cap, the scow and Melgund.'], ['Gabriel Dumont’s account, dictated in 1889', 'Nault beside him, the seven cartridges, the grass fire.'], ['Gabriel Dumont Institute, the Tourond family history', 'Josephte Tourond and her family.'], ['The Illustrated War News, 1885', 'Private Ferguson; the soldiers’ view of the day.']]),
    disputed: C('Disputed', 'The sources disagree.', [['Parks Canada; Hildebrandt (1989); the Encyclopedia of Saskatchewan', 'How many defenders stayed to the end; when the Grenadiers crossed; who led the riders from Batoche.']]),
    estimate: C('Estimate', 'An estimate, not a recorded figure.', [['C. P. Mulvany, History of the North-West Rebellion of 1885 (1885)', 'The nominal strengths of the two columns.'], ['Parks Canada; Dictionary of Canadian Biography', 'About 150 defenders; about 55 Field Force killed or wounded.']]),
    reconstruction: C('Reconstruction', 'Our own choice, to make the battle visible.', [['Battles of History', 'Every position and move on the map: no 1885 plan of the battle has been lined up with today’s ground. The painted map follows real elevation data.']])
  };
  const MUS = 'Métis Fiddling for Dancing: Alex Kusturok, Donny L’Hirondelle and Garry Pruden, fiddle; presented by the Métis Nation of Alberta (Otipemisiwak Métis Government). Recorded at Astromonical Studio, St. Paul, Alberta, engineered by Calvin Vollrath; produced by Alex Kusturok and Calvin Vollrath. On this page: “Fiddle Creek Two Step” (Garry Pruden) for the opening and “Red River Jig” (Alex Kusturok) for the debrief. Offered by the album page “FREE to anyone to use for educational purposes, for dancing, for listening, and most importantly, for the preservation of the Métis dance music”; used on that basis, with thanks. ' +
    '<a href="https://albertametis.com/culture/metis-fiddling-for-dancing/" target="_blank" rel="noopener">Album page (free download)</a> · <a href="https://alexkusturok.com" target="_blank" rel="noopener">Alex Kusturok</a>';
  S.sources = [
    { title: 'Parks Canada, Battle of Tourond’s Coulee / Fish Creek National Historic Site', note: 'The site, its plaque and the 2007 management plan.' },
    { title: 'Walter Hildebrandt, The Battle of Batoche: British Small Warfare and the Entrenched Métis, revised edition (Canadian Parks Service, 1989)', note: 'The march north and Fish Creek. parkscanadahistory.com/series/saah/battlebatoche.pdf' },
    { title: 'C. P. Mulvany, History of the North-West Rebellion of 1885 (Toronto, 1885)', note: 'The order of march of the two columns.' },
    { title: 'Dictionary of Canadian Biography: Gabriel Dumont, Frederick Middleton', note: 'biographi.ca' },
    { title: 'Gabriel Dumont Institute, Virtual Museum of Métis History and Culture', note: 'The Tourond family history; the 1885 prints.' },
    { title: 'The Illustrated War News (Toronto, 1885)', note: 'The prints on this page. Public domain. See images/README.md for every picture and its licence.' },
    { title: 'Music: Métis Fiddling for Dancing (Métis Nation of Alberta)', note: MUS },
    { title: 'Sound: rifle shots', note: 'Recorded by Kris Eyvindson for Battles of History, used with permission (a Lee-Enfield standing in for the Snider of 1885). See ../sounds/README.md.' }
  ];
  S.library = [];
})();
