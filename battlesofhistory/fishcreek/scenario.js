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

