/*
  Historical Scenario File — Battle of Batoche, 9–12 May 1885
  -----------------------------------------------------------------
  The narrated introduction (`intro`), the reenactment chapters (`events`) and the debrief (`outcome`), word for word from
  NARRATION-SCRIPT.md, which is what the narrators recorded (audio/<voice>/). This part is written by
  tools/make-scenario-text.py; the map, armies and moves are set in the block below the marker line.
  Tags: established, account (one witness or historian), disputed, estimate, reconstruction.
*/
window.BATOCHE_SCENARIO = window.BATOCHE_SCENARIO || {};
Object.assign(window.BATOCHE_SCENARIO, {
  id: 'batoche',
  title: 'Battle of Batoche',
  date: '9–12 May 1885',
  place: 'Batoche, on the South Saskatchewan River (today in Saskatchewan, Canada)',
  tagline: 'The North-West Field Force vs. the Métis and First Nations fighters',
  confidence: {
    established:    { label: 'Established',    color: '#5fcf8a', desc: 'Agreed by historians.' },
    account:        { label: 'Account',        color: '#ffd27a', desc: 'One witness or one historian, named where it matters; not confirmed by other sources.' },
    disputed:       { label: 'Disputed',       color: '#ff9a86', desc: 'The sources disagree, or historians do.' },
    estimate:       { label: 'Estimate',       color: '#e9c77a', desc: 'An estimate, not a recorded figure.' },
    reconstruction: { label: 'Reconstruction', color: '#c8a2ff', desc: 'Our own choice, to make the battle visible: where each army stood and how it moved.' }
  },
  sides: {
    allied: { name: 'North-West Field Force', short: 'Field Force', army: 'The North-West Field Force of Major-General Frederick Middleton', color: '#c0392b', light: '#ffd6d0' },
    french: { name: 'Métis and First Nations fighters', short: 'Defenders', army: 'The Métis, Cree and Dakota fighters of Louis Riel and Gabriel Dumont', color: '#2e5aa8', light: '#d0dcff' }
  },
  welcome: "Welcome to Battles of History. Today we are learning about the Battle of Batoche, fought from the 9th to the 12th of May 1885, on the South Saskatchewan River in what is now Saskatchewan, Canada, between a Canadian government army under Major-General Frederick Middleton and the Métis and First Nations fighters of Louis Riel and Gabriel Dumont.",
  intro: [
  {
    "title": "BATTLE OF BATOCHE",
    "lines": [
      {
        "text": "In the spring of 1885, a Canadian army marched north across the prairies to the Métis village of Batoche. For four days a few hundred men in rifle pits held it off. On the fourth day, the army broke through.",
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
        "caption": "\"Hostilities open at Batoche\": the start of the battle, 9 May 1885, smoke over the field beyond a rail fence",
        "credit": "Photo: Captain James Peters (1853–1927), 1885. Library and Archives Canada, C-003464 (MIKAN 3246023). Public domain in Canada (created before 1949) and in the US (published before 1931). Wikimedia Commons: HostilitiesOpenAtBatoche.jpg"
      },
      {
        "at": 14,
        "file": "capture-of-batoche-curzon.jpg",
        "caption": "\"The Capture of Batoche\": the charge of 12 May seen from the heights, the village and river beyond (an artist's view, published weeks after the battle)",
        "credit": "Fred W. Curzon (c. 1862–1890), Blatchly lithograph, 1885. McCord Stewart Museum, M4846. Public domain (PD-Art). Wikimedia Commons: The_Capture_of_Batoche.jpg"
      }
    ]
  },
  {
    "title": "The Métis of the South Saskatchewan",
    "lines": [
      {
        "text": "The Métis are a people born of the fur trade, with First Nations and European roots, their own language, Michif, and their own way of life on the plains: buffalo hunting, freighting and farming.",
        "tag": "established"
      },
      {
        "text": "Many had moved west from Red River, in Manitoba, after 1870. At Batoche and the nearby settlements they farmed long, narrow river lots running back from the South Saskatchewan, as they had at Red River.",
        "tag": "established"
      },
      {
        "text": "The village took its name from its founder, the trader Xavier Letendre, known as Batoche. It had a ferry on the Carlton Trail, stores, houses and a new church, Saint-Antoine-de-Padoue.",
        "tag": "established"
      }
    ],
    "media": [
      {
        "at": 0,
        "file": "batoche-village-1885.jpg",
        "caption": "The village of Batoche, about 1885: log cabin, frame houses and the two-storey store, looking across the prairie (some walls show damage)",
        "credit": "Photographer unknown, c. 1885. Bibliothèque et Archives nationales du Québec, P600,S6,D5,P1309. Public domain in Canada (photo before 1949) and in the US (published before 1931). Wikimedia Commons: Batoche_1885.jpg (1280 px copy)"
      },
      {
        "at": 12,
        "file": "metis-flag.png",
        "caption": "The Métis flag: a white infinity sign on a blue field. An account from 1815 describes a red flag with a horizontal figure eight, and Peter Fiddler recorded a blue one carried by Métis under Cuthbert Grant in 1816. It is a central symbol of the Métis Nation today. No source shows it flying at Batoche in 1885, so it is shown here as history, not on the battlefield.",
        "credit": "Drawing by Xasartha (2014) after Flags of the World (crwflags.com/fotw/flags/ca_metis.html). Public domain: a simple flag design, ineligible for copyright. Wikimedia Commons: Flag_of_the_Metis_(francophone).PNG (586 × 292)",
        "fit": "contain"
      },
      {
        "at": 24,
        "file": "michif-chart.png",
        "caption": "Michif, the language of the Métis. It is one of the world’s rare mixed languages: most nouns, with their articles, come from French, and most verbs come from Plains Cree, with the Cree endings that show who acts and when. It grew in the fur-trade families of the 1700s and 1800s and was spoken at Red River and at Batoche, alongside French, Cree and English. Like Cree it was passed on mainly by speaking. Today only a few thousand people speak it (1,845 reported in the 2021 census), and Métis communities are working to keep it alive. The linguist Peter Bakker described how it was formed in A Language of Our Own (1997).",
        "credit": "Drawn for this project after Peter Bakker, A Language of Our Own (1997); batoche/tools/make-michif-chart.py. Free to use.",
        "fit": "contain"
      },
      {
        "at": 36,
        "file": "batoche-rectory-church-2017.jpg",
        "caption": "The rectory and Saint-Antoine-de-Padoue church (1884) at Batoche National Historic Site, among the few buildings left standing after the battle",
        "credit": "Photo: David Stanley, 30 July 2017. CC BY 2.0 (https://creativecommons.org/licenses/by/2.0/). Wikimedia Commons: Batoche_National_Historic_Site_(27568738179).jpg"
      }
    ]
  },
  {
    "title": "Grievances",
    "lines": [
      {
        "text": "By the 1880s the buffalo were gone. The Cree and other First Nations who had signed treaties faced hunger, and felt that the government was not keeping its promises.",
        "tag": "established"
      },
      {
        "text": "The Métis feared for their land. Government surveyors used square lots, and title to the river lots was slow to come. Year after year they sent petitions to Ottawa, with little answer.",
        "tag": "established"
      },
      {
        "text": "In 1884 a group of Métis, Gabriel Dumont among them, rode to Montana to ask Louis Riel to come back and lead them. Riel had led the Red River Resistance of 1869 and 1870, which brought Manitoba into Canada, and had lived in exile since.",
        "tag": "established"
      }
    ],
    "media": [
      {
        "at": 0,
        "file": "st-laurent-mission-1891.jpg",
        "caption": "\"La Mission de Saint-Laurent près Batoche\", winter 1891: the Métis mission a few km from Batoche, six years after the battle. Black lantern-slide frame cropped",
        "credit": "Charles Gailly de Taurines (1857–1941), glass slide reproduced by Molteni, 1891. Bibliothèque nationale de France, Société de Géographie SG XGA-58. Public domain (France: author died over 70 years ago; US: published before 1931)"
      },
      {
        "at": 10,
        "file": "cree-syllabics-chart.png",
        "caption": "nēhiyawēwin, the Cree language. Cree is an Algonquian language spoken from the Rocky Mountains to Labrador; around Batoche people spoke Plains Cree, and Michif, the Métis language, joins Cree verbs to French nouns. For centuries Cree lived by the spoken word: stories, prayers, law and history were told and remembered, alongside pictographs painted on rock. In 1840 and 1841 at Norway House, the missionary James Evans, working with Cree and Ojibwe helpers, printed the first books in syllabics; Cree tradition credits a man named Calling Badger. Each shape stands for a consonant, and turning it changes the vowel. The script spread quickly, and by 1885 many Cree could read and write it. Today Cree is spoken by more people than any other Indigenous language in Canada. The Saskatchewan River takes its name from the Cree kisiskāciwani-sīpiy, \"the swift-flowing river\".",
        "credit": "Drawn for this project with Noto Sans Canadian Aboriginal (SIL Open Font License); batoche/tools/make-cree-chart.py. Free to use. The chart covers the main signs only, without the long-vowel dots.",
        "fit": "contain"
      },
      {
        "at": 26,
        "file": "riel-1884-bennetto.jpg",
        "caption": "Louis Riel, carte de visite of about 1884 (thick curly hair, heavy moustache). The University of Manitoba dates it 1870; the Virtual Métis Museum's 1884 is likelier, as the studio only opened in Winnipeg in 1880. Face reference for the Riel art",
        "credit": "Photo: I. Bennetto & Co., Winnipeg (Israel Bennetto, 1860–1946). University of Manitoba Archives, PC 107. Public domain in Canada (photo before 1949) and in the US (published before 1931). Wikimedia Commons: LouisRiel1870.jpg"
      }
    ]
  },
  {
    "title": "March 1885",
    "lines": [
      {
        "text": "In March 1885 Riel and his followers declared a provisional government at Batoche. Gabriel Dumont, a buffalo hunter famous on the plains, led its fighters.",
        "tag": "established"
      },
      {
        "text": "On the 26th of March, at Duck Lake, Métis and First Nations fighters defeated a force of North-West Mounted Police and volunteers. Further west, Cree fighters killed nine people at Frog Lake and took Fort Pitt, though the Cree leaders did not all agree on using force.",
        "tag": "established"
      },
      {
        "text": "Ottawa sent an army west on the new Canadian Pacific Railway, still unfinished in places north of Lake Superior. Its commander was a British officer, Major-General Frederick Middleton.",
        "tag": "established"
      }
    ],
    "media": [
      {
        "at": 0,
        "file": "dumont-1885-buckskin.jpg",
        "caption": "Gabriel Dumont in the 1880s, standing with his rifle: a full dark beard, a dark wide-brimmed hat, a fringed hide (buckskin) jacket with fur at the cuffs, a pale neckerchief and a dark shirt. The main reference for the Dumont sprites and portrait",
        "credit": "Photographer unknown; published in the Canadian Pictorial and Illustrated War News, 1885. Library and Archives Canada, R5839-2-7-F (MIKAN 3629842). Public domain in Canada (photo before 1949) and in the US (published before 1931). Wikimedia Commons: Gabriel_Dumont_(CPIWN,_1885).jpg",
        "fit": "contain"
      },
      {
        "at": 18,
        "file": "riel-c1880-lac.jpg",
        "caption": "Louis Riel seated, reading: curly dark hair, full beard, a tweed suit and waistcoat. LAC dates it about 1875; its subject heading says about 1883. Second face reference for the Riel art and portrait",
        "credit": "Photographer unknown; a copy made from a tintype (ferrotype). Library and Archives Canada, accession 1984-296, PA-139073. Public domain (photo before 1949; author unknown, over 70 years). Wikimedia Commons: LouisRielPortrait2.jpg",
        "fit": "contain"
      },
      {
        "at": 34,
        "file": "middleton-1885-topley.jpg",
        "caption": "Major-General Sir Frederick Middleton, September 1885, in his campaign dress: a light-coloured (grey or khaki) jacket and breeches, a dark field cap, a belt with a revolver holster, a sword, tall black riding boots, and a big white moustache. The main reference for the Middleton sprites and portrait",
        "credit": "Photo: William James Topley (1845–1930), Ottawa. Library and Archives Canada, PA-026732 (MIKAN 3420736). Public domain (the photographer died in 1930). Wikimedia Commons: FrederickMiddleton.jpg",
        "fit": "contain"
      }
    ]
  },
  {
    "title": "The road to Batoche",
    "lines": [
      {
        "text": "Middleton marched north from the railway at Qu'Appelle toward Batoche.",
        "tag": "established"
      },
      {
        "text": "On the 24th of April, at Fish Creek, Dumont's men ambushed his column from a wooded coulee and stopped it. That battle has its own page.",
        "tag": "established"
      },
      {
        "text": "Middleton waited about two weeks for supplies, more men, and a river steamer, the Northcote. Then, on the 7th of May, he marched on Batoche.",
        "tag": "established"
      }
    ],
    "media": [
      {
        "at": 0,
        "file": "heroes-of-batoche-belleville.jpg",
        "caption": "\"The Heroes of Batoche\": A Company, 15th Battalion Argyll Light Infantry (Belleville, Ontario), the company it sent to the Midland Battalion, which charged at Batoche on 12 May. 34 men named on the mount",
        "credit": "Photo: Brock and Company, Belleville, c. 1885–86 (Ponton papers). Community Archives of Belleville & Hastings County, HC02208. Public domain in Canada (photo before 1949) and the US (published before 1931); Public Domain Mark on Flickr. Wikimedia Commons: Hastings_County_Archives_HC02208_(25856530818).jpg (1280 px copy)"
      }
    ]
  },
  {
    "title": "The armies and the ground",
    "lines": [
      {
        "text": "Middleton counted 886 men on land: militia from Winnipeg, Toronto and Ontario towns, mounted scouts, and gunners of A Battery. He had four nine-pounder guns, a Gatling gun, and about fifty more men on the steamer.",
        "tag": "established"
      },
      {
        "text": "The defenders were Métis, Cree and Dakota fighters, perhaps 250 to 300 at the start. Their numbers changed as the battle went on. They had hunting rifles, shotguns and old muzzle-loaders, and little ammunition.",
        "tag": "estimate"
      },
      {
        "text": "The village lay on the east bank of the river. To the south, the church and the rectory stood on higher ground, with the cemetery beyond. Along the wooded slopes and ravines, the defenders had dug rifle pits: shallow holes with a low wall of earth and logs, hard to see and hard to hit.",
        "tag": "established"
      }
    ],
    "media": [
      {
        "at": 0,
        "file": "rml-9-pounder-gun.jpg",
        "caption": "An RML 9-pounder 8-cwt field gun, the type \"A\" Battery, Royal Regiment of Canadian Artillery, used at Fish Creek and Batoche (museum piece, NB Military History Museum, CFB Gagetown)",
        "credit": "Photo: Skaarup.HA, 15 November 2012. CC BY-SA 3.0 (https://creativecommons.org/licenses/by-sa/3.0/). Wikimedia Commons: RML_9-pounder_8-cwt_Field_Gun,_NBMHM,_CFB_Gagetown_(5).JPG (1280 px copy)"
      },
      {
        "at": 14,
        "file": "howard-gatling-1885.jpg",
        "caption": "Captain Arthur L. Howard (\"Gatling Howard\") with his Gatling gun, 1885: a short pointed beard and moustache, a light-coloured peaked cap, a dark jacket; the gun's cluster of barrels, the tall feed magazine standing on top, and big wooden spoked wheels. The main reference for the Howard and Gatling sprites",
        "credit": "Photographer unknown, about 1885. Library and Archives Canada, C-001882 (Public Archives Canada C-1882, as credited in Hildebrandt, The Battle of Batoche, 1985/1989). Public domain in Canada (a photo taken before 1949; checked with ChatGPT, 5 November 2026). US status not checked; the site is Canadian. Credit on the page: \"Library and Archives Canada, C-1882\". A better scan could be ordered from LAC.",
        "fit": "contain"
      },
      {
        "at": 28,
        "file": "battlefield-sketch-1885.jpg",
        "caption": "\"Sketch of Battle Field of Batoche fought May 12th 1885\", Plate VII: the river, Batoche crossing, rifle pits, church and cemetery, the entrenched camp, the direction of attack and the feigned attack. Main reference for the battle map",
        "credit": "Unknown surveyor, Canada Bank Note Co. lithograph, in Sessional Papers of the Dominion of Canada, vol. 19 no. 5 (1886, no. 6). Digitized by Library and Archives Canada (nlc-4369). Public domain (Crown copyright expired; published before 1931). Wikimedia Commons: Batoche_Battle_Field_1885.jpg (900 × 668 version)",
        "fit": "contain"
      }
    ]
  }
],
  events: [
  {
    "title": "The plan",
    "clock": "Morning, 9 May",
    "tag": "established",
    "text": "Middleton plans a joint attack. His column will come up from the south-east by land, while the Northcote, with soldiers behind barricades on her decks, comes down the river behind the village."
  },
  {
    "title": "The steamer",
    "clock": "Morning, 9 May",
    "tag": "established",
    "text": "The Northcote arrives before the land column is ready. Fighters on both banks open fire on her. At the Batoche ferry, the ferryman Alex P. Fisher, helped by Pascal Montour, has lowered the ferry cable across the river. It catches the steamer and knocks down her smokestacks. Damaged, she drifts on downstream and never lands her soldiers."
  },
  {
    "title": "The church",
    "clock": "Morning, 9 May",
    "tag": "established",
    "text": "The column reaches the church and the rectory. The priests, the sisters, and Métis women and children are sheltering inside. A bullet through the rectory wall wounds Father Moulin in the leg. Witnesses say a white cloth was shown, and Middleton ordered the firing stopped."
  },
  {
    "title": "The rifle pits",
    "clock": "Midday, 9 May",
    "tag": "established",
    "text": "Beyond the church, the ground drops toward the river. The soldiers push to the edge of Mission Ridge and run into fire from pits they cannot see. The guns are pulled forward onto the ridge, and the defenders creep through the bush toward them. Captain Howard's Gatling gun opens fire and covers the infantry as they fall back."
  },
  {
    "title": "The steamer's fighters",
    "clock": "During the fighting, 9 May",
    "tag": "account",
    "text": "When the Northcote came by, Philippe Garnot took about twenty men from the pits to fire on her. That thinned the line facing Middleton's first advance. The defenders, scouts under Patrice Fleury and Ambroise Champagne watching both banks, also pressed the soldiers' flanks. Hildebrandt argues that these Métis attacks deserve more credit than the usual story gives them."
  },
  {
    "title": "The zareba",
    "clock": "Evening and night, 9 May",
    "tag": "established",
    "text": "Middleton pulls his army back into a camp walled with wagons and earth, a zareba, about a kilometre south-east of the church. Through the night, rifle fire from the bush keeps the camp awake."
  },
  {
    "title": "Sunday",
    "clock": "10 May",
    "tag": "established",
    "text": "The soldiers move out again, cautiously. They dig shallow pits halfway toward the cemetery but cannot take the heights. The guns shell the rifle pits, the cemetery and the buildings across the river. The camp's walls are built higher."
  },
  {
    "title": "Testing the line",
    "clock": "11 May",
    "tag": "established",
    "text": "Middleton rides out with Boulton's mounted men and Howard's Gatling gun onto the open prairie to the north, the Jolie Prairie. The Gatling fires a few rounds into the rifle pits. Defenders hurry across to meet him, and he sees that the line in front of his infantry grows thin when they do."
  },
  {
    "title": "Running short",
    "clock": "10 and 11 May",
    "tag": "account",
    "text": "In the pits, cartridges are running out. Witnesses describe men searching the ground the soldiers have left for dropped cartridges, and melting down lead. Hildebrandt writes that some fired nails when the bullets made from scavenged lead ran out; how often that happened is uncertain."
  },
  {
    "title": "The feint",
    "clock": "Morning, 12 May",
    "tag": "established",
    "text": "Middleton tries the trick again. He leads the mounted men, a nine-pounder and the Gatling out onto the Jolie Prairie, to draw the defenders north. The infantry are to attack when they hear his guns. A rider comes out under a white flag: John Astley, a surveyor held prisoner by Riel, with a letter warning that if the women and children are harmed, the prisoners will be too. Middleton answers that the families should gather in one house under a white flag."
  },
  {
    "title": "The signal",
    "clock": "Midday, 12 May",
    "tag": "established",
    "text": "The infantry do not move: a strong east wind carries the sound of the guns away, and Colonel Van Straubenzie hears nothing. The planned attack never begins. Middleton rides back, furious: \"I lost both my temper and my head,\" he wrote later. His men sit down to their lunch of hard biscuit. Across the lines, seeing the soldiers pull back, many Métis think peace has come and go back to their families."
  },
  {
    "title": "The charge",
    "clock": "Afternoon, 12 May",
    "tag": "established",
    "text": "In the afternoon the Midland and the Royal Grenadiers go forward near the cemetery, with the 90th Winnipeg Rifles in support, and the advance becomes a charge. Who ordered it is still argued: Lieutenant-Colonel Williams, Colonel Van Straubenzie, or nobody, as the soldiers simply ran forward. The thin line in the pits breaks. A Métis witness remembered Riel kneeling, his arms crossed, praying with the people around him as the defence gave way."
  },
  {
    "title": "The village",
    "clock": "Late afternoon, 12 May",
    "tag": "established",
    "text": "The soldiers pour down toward the village. Fighting goes on in the bush and around the houses. Captain John French of French's Scouts is shot at an upstairs window of Batoche's house. Prisoners held by Riel's government are set free. Among the defenders killed that day is Joseph Ouellette, an old man, said to be over ninety."
  },
  {
    "title": "After the fighting",
    "clock": "Evening, 12 May",
    "tag": "account",
    "text": "Batoche has fallen. Families who had sheltered by the river come out to find their homes searched and their belongings taken. Later testimony said that soldiers took belongings, among them a woman's wedding ring."
  }
],
  outcome: [
  {
    "text": "The army won. Hildebrandt counts twenty-five dead in the four days: soldiers, Métis and First Nations.",
    "tag": "estimate"
  },
  {
    "text": "By the last day, only 50 to 60 defenders were still fighting, with about 40 rifles between them; the rest had double-barrelled shotguns.",
    "tag": "estimate"
  },
  {
    "text": "On the 15th of May, Louis Riel gave himself up. Gabriel Dumont stayed near Batoche for some days; when he heard that Riel had surrendered, he escaped to the United States.",
    "tag": "established"
  },
  {
    "text": "Poundmaker surrendered at the end of May, and Big Bear in early July. Both were sent to prison.",
    "tag": "established"
  },
  {
    "text": "Riel was tried for high treason at Regina. The jury found him guilty but asked for mercy. He was hanged on the 16th of November 1885. Eleven days later, on the 27th of November, six Cree and two Nakoda (Assiniboine) men were hanged together at Battleford.",
    "tag": "established"
  },
  {
    "text": "Riel's death divided Canada for a generation, French against English, Catholic against Protestant.",
    "tag": "established"
  },
  {
    "text": "Dumont later toured the United States with Buffalo Bill's Wild West show. After an amnesty he came home, and he died near Batoche in 1906.",
    "tag": "established"
  },
  {
    "text": "Today Batoche is a National Historic Site. Riel, once hanged as a traitor, is remembered as the founder of Manitoba, and statues of Riel and Dumont stand in Winnipeg and Saskatoon.",
    "tag": "established"
  }
]
});

/* ======================================================================================================================
   Maps, armies, leaders and their moves.
     battle map  images/terrain-battle.jpg  52.7692–52.7395 N, 106.1526–106.0874 W (about 4.4 x 3.3 km, 2400 x 1800 world px)
   Places are where they are PAINTED: the church, the cemetery, the zareba and the village (checked against Hildebrandt's
   maps in RESEARCH-NOTES.md; the painting puts the church about 290 m south-east of his position). The rifle-pit lines
   follow Hildebrandt's maps; every move is our reconstruction from his account (1989).
   ====================================================================================================================== */
(() => {
  const S = window.BATOCHE_SCENARIO;
  const CHURCH = { x: 1296, y: 1120 }, CEMETERY = { x: 1360, y: 1235 }, ZAREBA = { x: 1780, y: 1320 }, VILLAGE = { x: 660, y: 460 },
        FERRY = { x: 520, y: 690 }, RIDGE = { x: 1150, y: 1090 }, PITS_N = { x: 1040, y: 900 }, PITS_S = { x: 1190, y: 1260 },
        JOLIE = { x: 1560, y: 700 }, WESTBANK = { x: 300, y: 820 }, HOUSE = { x: 760, y: 520 }, ROAD_SE = { x: 1990, y: 1790 };
  const RIVER = [{ x: 1540, y: 1790 }, { x: 1540, y: 1520 }, { x: 1440, y: 1400 }, { x: 1120, y: 1380 }, { x: 940, y: 1240 }, { x: 860, y: 1000 }, { x: 720, y: 800 }, FERRY];
  Object.assign(S, {
    titleCard: {
      title: 'BATTLE OF BATOCHE', date: '9–12 May 1885',
      dateNote: 'For four days a Canadian government army presses against the rifle pits dug by the Métis around their village on the South Saskatchewan. On the fourth day it breaks through, and the North-West Resistance of 1885 comes to an end.',
      dateRef: 'Walter Hildebrandt, The Battle of Batoche (Parks Canada, 1989); Dictionary of Canadian Biography',
      place: 'Batoche, on the South Saskatchewan River, North-West Territories (today Saskatchewan, Canada)',
      sides: 'The North-West Field Force of Major-General Frederick Middleton  ·  The Métis, Cree and Dakota fighters of Louis Riel and Gabriel Dumont'
    },
    world: { w: 2400, h: 1800 },
    terrain: 'terrain-battle.jpg',
    duration: 196, commandDuration: 300, commandFocus: { x: 1300, y: 1000 },
    battlefield: {
      scale: { px: 547, label: '1 km' },
      labels: [
        { x: VILLAGE.x - 40, y: VILLAGE.y - 120, text: 'Batoche', small: true }, { x: CHURCH.x - 10, y: CHURCH.y - 90, text: 'church and rectory', small: true },
        { x: CEMETERY.x + 20, y: CEMETERY.y + 70, text: 'cemetery', small: true }, { x: ZAREBA.x, y: ZAREBA.y + 120, text: 'the zareba', small: true },
        { x: JOLIE.x + 60, y: JOLIE.y - 80, text: 'Jolie Prairie', small: true }, { x: FERRY.x - 40, y: FERRY.y + 60, text: 'ferry', small: true },
        { x: 380, y: 1500, text: 'South Saskatchewan River', small: true }, { x: 380, y: 1545, text: 'kisiskāciwani-sīpiy', small: true }, { x: RIDGE.x - 140, y: RIDGE.y - 30, text: 'Mission Ridge', small: true }
      ]
    },
    globe: { target: { lon: -106.118, lat: 52.753 }, region: { lon: -100, lat: 54 }, pull: 3.2, startLat: 35,
      periodNote: 'Canada in 1885',
      stop2: { center: { lon: -106.0, lat: 52.6 }, pull: 18, todayNote: 'Today’s towns', thenNote: 'The places of 1885' },
      labels: [ { lon: -75.70, lat: 45.42, text: 'Ottawa', size: .5, dot: true }, { lon: -97.14, lat: 49.90, text: 'Winnipeg', size: .5, dot: true },
                { lon: -106.118, lat: 52.753, text: 'BATOCHE', size: .85, pin: true, early: true } ] },
    establishing: [
      { file: 'establish-continent.jpg', secs: 5, pulse: { x: .3625, y: .574 }, credit: 'Canada and the northern United States. Painted for this project (AI-generated) over real elevation data.' },
      { file: 'establish-campaign.jpg', secs: 5, pulse: { x: .551, y: .333 }, credit: 'The North-West in 1885: the railway, Middleton’s march from Qu’Appelle (route approximate) and the fights of the spring. Painted for this project (AI-generated) over real elevation data.' },
      { file: 'establish-region.jpg', secs: 6, pulse: { x: .622, y: .309 }, credit: 'The South Branch: Duck Lake, Fort Carlton of the North-West Mounted Police, Fish Creek and Batoche. Painted for this project (AI-generated) over real elevation data.' }
    ],
    imageBase: 'images/', audioBase: 'audio/',
    voices: [
      { id: 'clear', name: 'Narrator 1 · clear', speaker: 25 }, { id: 'light', name: 'Narrator 2 · light', speaker: 60 },
      { id: 'bright', name: 'Narrator 3 · bright', speaker: 0 }, { id: 'deep', name: 'Narrator 4 · deep', speaker: 400 },
      { id: 'warm', name: 'Narrator 5 · warm', speaker: 7 }, { id: 'computer', name: 'Computer · calm', speaker: 500 }
    ],
    attackSheets: { 'field-rifles': 'field-rifles-fire', 'field-grenadier': 'field-grenadier-attack', 'field-gun': 'field-gun-fire', 'field-gatling': 'field-gatling-fire',
                    'metis-rifle': 'metis-rifle-fire', 'metis-shotgun': 'metis-shotgun-fire', 'firstnations-fighter': 'firstnations-fighter-fire' },
    fallen: { bySide: { allied: 'fallen-field', french: 'fallen-defenders' } },
    sheets: ['field-rifles', 'field-grenadier', 'field-scout', 'field-gun', 'field-gatling', 'metis-rifle', 'metis-shotgun', 'metis-horse', 'firstnations-fighter', 'northcote', 'northcote-damaged'],
    sheetBy: { allied: { infantry: 'field-grenadier', archers: 'field-rifles', cavalry: 'field-scout' }, french: { infantry: 'metis-rifle', archers: 'metis-rifle', cavalry: 'metis-horse' } },
    sideArt: { allied: { cloth: '#7a1f1a', cloth2: '#222', pennant: '#c0392b' }, french: { cloth: '#2a3550', cloth2: '#3a2a1a', pennant: '#2e5aa8' } },
    legend: [ { label: 'North-West Field Force', color: '#c0392b', kind: 'dot' }, { label: 'Métis, Cree and Dakota defenders', color: '#2e5aa8', kind: 'dot' } ],
    clockYear: 1885,
    ai: { plans: {} }, commandLines: {},
    debrief: { allied: { victory: { title: 'Field Force victory', text: '' }, defeat: { title: 'Field Force defeat', text: '' }, stalemate: { title: 'Stalemate', text: '' } },
               french: { victory: { title: 'The defenders hold', text: '' }, defeat: { title: 'Batoche falls', text: '' }, stalemate: { title: 'Stalemate', text: '' } } }
  });
  S.sides.allied.rally = { x: 2200, y: 1600 }; S.sides.french.rally = { x: 300, y: 300 };

  const F = (o) => Object.assign({ power: 1, confidence: 'reconstruction' }, o);
  const A0 = (k) => ({ x: ROAD_SE.x - k * 30, y: ROAD_SE.y - k * 20 });   // the column comes up the trail from the south-east
  S.formations = [
    F({ id: 'gren', side: 'allied', name: '10th Royal Grenadiers', division: 'Grenadiers', type: 'infantry', sheet: 'field-grenadier', cols: 6, rows: 2, ...A0(1), confidence: 'established', note: 'Toronto militia: 258 men on 7 May (Hildebrandt).' }),
    F({ id: 'r90', side: 'allied', name: '90th Winnipeg Rifles', division: '90th Rifles', type: 'infantry', sheet: 'field-rifles', cols: 6, rows: 2, ...A0(2), confidence: 'established', note: 'Winnipeg militia in rifle green, the "little black devils": 270 men.' }),
    F({ id: 'midland', side: 'allied', name: 'Midland Battalion', division: 'Midland', type: 'infantry', sheet: 'field-grenadier', cols: 4, rows: 1, ...A0(3), confidence: 'established', note: 'Two companies from eastern Ontario towns, about 100 men, under Lt-Col Arthur Williams.' }),
    F({ id: 'scouts', side: 'allied', name: 'Boulton’s and French’s Scouts', division: 'Scouts', type: 'cavalry', sheet: 'field-scout', cols: 4, rows: 1, ...A0(0), confidence: 'established', note: 'Mounted volunteers: about 100 men.' }),
    F({ id: 'guns', side: 'allied', name: 'A Battery and the Winnipeg Field Battery', division: 'Artillery', type: 'archers', sheet: 'field-gun', cols: 2, rows: 1, power: .8, ...A0(4), confidence: 'established', note: 'Four nine-pounder muzzle-loading guns.' }),
    F({ id: 'gatling', side: 'allied', name: 'The Gatling gun', division: 'Gatling', type: 'archers', sheet: 'field-gatling', cols: 1, rows: 1, power: .6, ...A0(5), confidence: 'established', note: 'An early machine gun, worked by Captain Arthur Howard of Connecticut.' }),
    F({ id: 'boat', side: 'allied', name: 'The Northcote', division: 'Northcote', type: 'cavalry', sheet: 'northcote', cols: 1, rows: 1, power: .3, x: RIVER[0].x, y: RIVER[0].y, confidence: 'established', note: 'A river steamer with about fifty soldiers behind barricades of sacks and planks.' }),
    F({ id: 'boat2', side: 'allied', name: 'The Northcote, damaged', division: 'Northcote', type: 'cavalry', sheet: 'northcote-damaged', cols: 1, rows: 1, power: .3, hidden: true, x: FERRY.x, y: FERRY.y, confidence: 'established', note: 'The ferry cable knocked down her smokestacks.' }),
    F({ id: 'pitsN', side: 'french', name: 'Métis riflemen in the pits', division: 'Métis', type: 'archers', sheet: 'metis-rifle', cols: 5, rows: 1, x: PITS_N.x, y: PITS_N.y, note: 'Rifle pits between the village and the church.' }),
    F({ id: 'pitsS', side: 'french', name: 'Métis in the pits above the river', division: 'Métis', type: 'archers', sheet: 'metis-shotgun', cols: 4, rows: 1, x: PITS_S.x, y: PITS_S.y, note: 'Pits along the slope and the ravine below the cemetery; many had only shotguns.' }),
    F({ id: 'fn', side: 'french', name: 'Cree and Dakota fighters', division: 'Cree and Dakota', type: 'archers', sheet: 'firstnations-fighter', cols: 4, rows: 1, x: RIDGE.x - 60, y: RIDGE.y + 40, note: 'Cree and Dakota allies, among them White Cap’s Dakota.' }),
    F({ id: 'garnot', side: 'french', name: 'Garnot’s men', division: 'Garnot', type: 'archers', sheet: 'metis-rifle', cols: 3, rows: 1, x: PITS_N.x - 120, y: PITS_N.y + 60, note: 'About twenty men Philippe Garnot took from the pits to fire on the steamer.' }),
    F({ id: 'west', side: 'french', name: 'Fighters on the west bank', division: 'West bank', type: 'archers', sheet: 'metis-rifle', cols: 3, rows: 1, x: WESTBANK.x, y: WESTBANK.y, note: 'Positions across the river.' }),
    F({ id: 'horse', side: 'french', name: 'Scouts of Fleury and Champagne', division: 'Métis scouts', type: 'cavalry', sheet: 'metis-horse', cols: 3, rows: 1, x: 900, y: 600, note: 'Patrice Fleury watched the west bank, Ambroise Champagne the east.' })
  ];
  S.leaders = [
    { id: 'middleton', name: 'Maj-Gen Frederick Middleton', side: 'allied', x: ROAD_SE.x - 60, y: ROAD_SE.y - 80 },
    { id: 'howard', name: 'Capt. Arthur Howard', side: 'allied', x: ROAD_SE.x - 150, y: ROAD_SE.y - 60 },
    { id: 'dumont', name: 'Gabriel Dumont', side: 'french', x: PITS_N.x + 40, y: PITS_N.y - 70 },
    { id: 'riel', name: 'Louis Riel', side: 'french', x: VILLAGE.x + 80, y: VILLAGE.y + 40 }
  ];

  const EV = S.events; EV.forEach((e, i) => { e.clipNo = i + 1; e.orders = e.orders || []; e.t = i * 14; });
  EV[11].tag = 'disputed';
  const set = (i, o) => Object.assign(EV[i], o);
  const nearZ = (dx, dy) => ({ x: ZAREBA.x + dx, y: ZAREBA.y + dy });
  // 9 May
  set(0, { media: 'cover.jpg', zoom: 'fit', markers: [ { x: RIVER[0].x, y: RIVER[0].y - 60, label: 'the Northcote', side: 'allied' } ], orders: [
    { id: 'gren', to: nearZ(-120, -60), speed: 60 }, { id: 'r90', to: nearZ(-60, 40), speed: 60 }, { id: 'midland', to: nearZ(40, -80), speed: 60 },
    { id: 'scouts', to: nearZ(-200, -160), speed: 70 }, { id: 'guns', to: nearZ(-150, 20), speed: 50 }, { id: 'gatling', to: nearZ(-90, -120), speed: 50 },
    { leader: 'middleton', to: nearZ(-40, -40), speed: 60 }, { leader: 'howard', to: nearZ(-60, -150), speed: 50 } ] });
  set(1, { focus: FERRY, zoom: 1.6, markers: [ Object.assign({ label: 'the ferry cable' }, FERRY) ], orders: [
    { id: 'boat', to: FERRY, via: RIVER.slice(1, -1), speed: 70 },
    { id: 'garnot', to: { x: 820, y: 960 }, speed: 40, state: 'attack' }, { id: 'west', to: { x: 400, y: 900 }, speed: 30, state: 'attack' } ] });
  set(2, { media: 'church-interior-1926.jpg', focus: CHURCH, zoom: 1.7, markers: [ { x: CHURCH.x + 60, y: CHURCH.y, label: 'Father Moulin wounded in the rectory' } ], orders: [
    { id: 'boat', visible: false }, { id: 'boat2', visible: true, at: FERRY }, { id: 'boat2', to: { x: 600, y: 10 }, via: [{ x: 500, y: 300 }], speed: 50 },
    { id: 'gren', to: { x: CHURCH.x + 60, y: CHURCH.y - 60 }, speed: 45 }, { id: 'r90', to: { x: CHURCH.x + 140, y: CHURCH.y + 40 }, speed: 45 },
    { leader: 'middleton', to: { x: CHURCH.x + 160, y: CHURCH.y - 40 }, speed: 45 } ] });
  set(3, { media: 'howard-gatling-1885.jpg', focus: RIDGE, zoom: 1.6, markers: [ Object.assign({ label: 'Mission Ridge' }, RIDGE) ], orders: [
    { id: 'gren', to: { x: RIDGE.x + 60, y: RIDGE.y - 40 }, speed: 35, state: 'attack' }, { id: 'guns', to: { x: RIDGE.x + 120, y: RIDGE.y + 10 }, speed: 40 },
    { id: 'gatling', to: { x: CHURCH.x + 40, y: CHURCH.y - 120 }, speed: 45, state: 'attack' }, { leader: 'howard', to: { x: CHURCH.x + 10, y: CHURCH.y - 150 }, speed: 45 },
    { id: 'fn', to: { x: RIDGE.x - 20, y: RIDGE.y + 20 }, speed: 25, state: 'attack' }, { id: 'pitsS', state: 'attack' }, { id: 'pitsN', state: 'attack' } ] });
  set(4, { focus: { x: 1000, y: 1000 }, zoom: 1.3, markers: [ { x: 820, y: 960, label: 'Garnot’s men', side: 'french' } ], orders: [
    { id: 'garnot', to: { x: PITS_N.x - 100, y: PITS_N.y + 40 }, speed: 35 }, { id: 'horse', to: { x: 1500, y: 950 }, speed: 50, state: 'attack' },
    { id: 'gren', to: { x: CHURCH.x + 100, y: CHURCH.y - 20 }, speed: 30 } ] });
  set(5, { media: 'zareba-1885.jpg', focus: ZAREBA, zoom: 1.5, markers: [ Object.assign({ label: 'the zareba', side: 'allied' }, ZAREBA) ], orders: [
    { id: 'gren', to: nearZ(-80, -40), speed: 40 }, { id: 'r90', to: nearZ(-30, 50), speed: 40 }, { id: 'midland', to: nearZ(50, -60), speed: 40 },
    { id: 'guns', to: nearZ(-120, 10), speed: 35 }, { id: 'gatling', to: nearZ(-60, -100), speed: 35 }, { id: 'scouts', to: nearZ(80, 40), speed: 50 },
    { leader: 'middleton', to: nearZ(0, -10), speed: 40 }, { leader: 'howard', to: nearZ(-40, -130), speed: 40 },
    { id: 'horse', to: { x: 1450, y: 1050 }, speed: 30 }, { id: 'pitsN', state: 'hold' }, { id: 'pitsS', state: 'hold' } ] });
  // 10 May
  set(6, { focus: { x: 1500, y: 1250 }, zoom: 1.3, orders: [
    { id: 'midland', to: { x: (ZAREBA.x + CEMETERY.x) / 2, y: (ZAREBA.y + CEMETERY.y) / 2 + 20 }, speed: 25 },
    { id: 'guns', to: { x: CEMETERY.x + 160, y: CEMETERY.y - 40 }, speed: 30, state: 'attack' }, { id: 'pitsS', state: 'attack' },
    { id: 'horse', to: { x: 1100, y: 800 }, speed: 30 } ] });
  // 11 May
  set(7, { focus: JOLIE, zoom: 1.4, markers: [ Object.assign({ label: 'Jolie Prairie' }, JOLIE) ], orders: [
    { id: 'scouts', to: JOLIE, speed: 50 }, { id: 'gatling', to: { x: JOLIE.x - 60, y: JOLIE.y + 50 }, speed: 45, state: 'attack' },
    { leader: 'middleton', to: { x: JOLIE.x + 50, y: JOLIE.y + 30 }, speed: 50 }, { leader: 'howard', to: { x: JOLIE.x - 100, y: JOLIE.y + 80 }, speed: 45 },
    { id: 'pitsN', to: { x: 1250, y: 760 }, speed: 30, state: 'attack' } ] });
  set(8, { zoom: 'fit', orders: [
    { id: 'pitsN', strengthTo: 70, over: 8 }, { id: 'pitsS', strengthTo: 70, over: 8 }, { id: 'fn', strengthTo: 75, over: 8 }, { id: 'garnot', strengthTo: 65, over: 8 },
    { id: 'scouts', to: nearZ(60, 20), speed: 45 }, { id: 'gatling', to: nearZ(-60, -100), speed: 40 },
    { leader: 'middleton', to: nearZ(0, -10), speed: 45 }, { leader: 'howard', to: nearZ(-40, -130), speed: 40 } ] });
  // 12 May
  set(9, { focus: JOLIE, zoom: 1.4, markers: [ { x: JOLIE.x - 40, y: JOLIE.y - 40, label: 'Astley’s white flag' } ], orders: [
    { id: 'scouts', to: JOLIE, speed: 50 }, { id: 'gatling', to: { x: JOLIE.x - 60, y: JOLIE.y + 50 }, speed: 45, state: 'attack' },
    { id: 'guns', to: { x: JOLIE.x + 40, y: JOLIE.y + 90 }, speed: 40, state: 'attack' }, { leader: 'middleton', to: { x: JOLIE.x + 50, y: JOLIE.y + 30 }, speed: 50 },
    { leader: 'howard', to: { x: JOLIE.x - 100, y: JOLIE.y + 80 }, speed: 45 },
    { id: 'pitsN', to: { x: 1250, y: 760 }, speed: 35, state: 'attack' }, { id: 'horse', to: { x: 1300, y: 640 }, speed: 40 },
    { id: 'gren', to: nearZ(-180, -60), speed: 30 }, { id: 'midland', to: nearZ(-140, -100), speed: 30 } ] });
  set(10, { focus: { x: 1600, y: 1100 }, zoom: 1.2, markers: [ { x: ZAREBA.x - 150, y: ZAREBA.y - 90, label: 'Van Straubenzie hears nothing', side: 'allied' } ], orders: [
    { id: 'scouts', to: nearZ(60, 20), speed: 50 }, { id: 'gatling', to: nearZ(-60, -100), speed: 45 }, { id: 'guns', to: nearZ(-120, 10), speed: 40 },
    { leader: 'middleton', to: nearZ(0, -10), speed: 55 }, { leader: 'howard', to: nearZ(-40, -130), speed: 45 },
    { id: 'pitsN', to: { x: VILLAGE.x + 150, y: VILLAGE.y + 120 }, speed: 30 }, { id: 'horse', to: { x: VILLAGE.x + 100, y: VILLAGE.y + 60 }, speed: 35 } ] });
  set(11, { media: 'capture-of-batoche-curzon.jpg', focus: CEMETERY, zoom: 1.5, markers: [ { x: CEMETERY.x, y: CEMETERY.y, label: 'the charge', side: 'allied' }, { x: VILLAGE.x + 60, y: VILLAGE.y + 30, label: 'Riel at prayer', side: 'french' } ], orders: [
    { id: 'midland', to: { x: PITS_S.x, y: PITS_S.y - 10 }, via: [CEMETERY], speed: 55, state: 'attack' },
    { id: 'gren', to: { x: RIDGE.x, y: RIDGE.y - 40 }, via: [{ x: CHURCH.x + 60, y: CHURCH.y }], speed: 55, state: 'attack' },
    { id: 'r90', to: { x: PITS_N.x + 80, y: PITS_N.y + 60 }, via: [{ x: CHURCH.x + 80, y: CHURCH.y - 100 }], speed: 50, state: 'attack' },
    { id: 'guns', to: { x: CHURCH.x + 120, y: CHURCH.y - 60 }, speed: 40, state: 'attack' }, { id: 'gatling', to: { x: CHURCH.x + 30, y: CHURCH.y - 140 }, speed: 45, state: 'attack' },
    { leader: 'middleton', to: { x: CHURCH.x + 180, y: CHURCH.y - 10 }, speed: 50 },
    { id: 'pitsS', strengthTo: 25, over: 8 }, { id: 'fn', strengthTo: 30, over: 8 }, { id: 'pitsS', state: 'rout', to: { x: 900, y: 800 }, speed: 40 },
    { id: 'fn', state: 'rout', to: { x: 860, y: 700 }, speed: 40, delay: 1 } ] });
  set(12, { media: 'batoche-village-1885.jpg', focus: { x: 800, y: 600 }, zoom: 1.5, markers: [ Object.assign({ label: 'Batoche’s house: Captain French killed', side: 'allied' }, HOUSE) ], orders: [
    { id: 'gren', to: { x: HOUSE.x + 40, y: HOUSE.y + 40 }, speed: 50, state: 'attack' }, { id: 'midland', to: { x: VILLAGE.x + 60, y: VILLAGE.y + 100 }, speed: 50, state: 'attack' },
    { id: 'r90', to: { x: VILLAGE.x + 160, y: VILLAGE.y + 160 }, speed: 50, state: 'attack' }, { id: 'scouts', to: { x: HOUSE.x + 80, y: HOUSE.y - 40 }, speed: 60, state: 'attack' },
    { id: 'pitsN', state: 'rout', to: { x: 700, y: 60 }, speed: 45 }, { id: 'pitsN', strengthTo: 20, over: 8 }, { id: 'garnot', state: 'rout', to: { x: 600, y: 80 }, speed: 45 },
    { id: 'horse', state: 'rout', to: { x: 900, y: 20 }, speed: 55 }, { id: 'pitsS', to: { x: 520, y: 120 }, speed: 45 }, { id: 'fn', to: { x: 480, y: 160 }, speed: 45 },
    { leader: 'dumont', to: { x: 800, y: 60 }, speed: 45 }, { leader: 'riel', to: { x: 620, y: 80 }, speed: 40 }, { leader: 'middleton', to: { x: VILLAGE.x + 220, y: VILLAGE.y + 200 }, speed: 50 } ] });
  set(13, { media: 'riel-prisoner-1885.jpg', zoom: 'fit', orders: [ { leader: 'riel', visible: false }, { leader: 'dumont', visible: false } ] });

  S.units = [
    { side: 'allied', type: 'infantry', sheet: 'field-rifles', portrait: 'rifles', name: '90th Winnipeg Rifles', desc: 'Winnipeg militia in rifle green, with short Snider rifles.', tag: 'established',
      lines: [ { text: 'Their uniforms were so dark a green that the Métis called them the "little black devils". 270 men on 7 May.', tag: 'established' } ] },
    { side: 'allied', type: 'infantry', sheet: 'field-grenadier', portrait: 'grenadier', name: '10th Royal Grenadiers', desc: 'Toronto militia in scarlet tunics.', tag: 'established',
      lines: [ { text: 'Canada’s militia fought the 1885 campaign in its normal uniforms. 258 Grenadiers on 7 May.', tag: 'established' } ] },
    { side: 'allied', type: 'cavalry', sheet: 'field-scout', portrait: 'scout', name: 'Mounted scouts', desc: 'Boulton’s and French’s Scouts: prairie volunteers on horseback.', tag: 'established',
      lines: [ { text: 'Raised in Manitoba and around Qu’Appelle to scout ahead of the column.', tag: 'established' } ] },
    { side: 'allied', type: 'infantry', portrait: 'middleton', name: 'Maj-Gen Frederick Middleton', desc: 'A British officer, aged 59, commanding Canada’s militia.', tag: 'established',
      lines: [ { text: 'Cautious after Fish Creek. Who ordered the final charge, if anyone, is still argued.', tag: 'disputed' } ] },
    { side: 'french', type: 'archers', sheet: 'metis-rifle', portrait: 'metis', name: 'Métis fighters', desc: 'Buffalo hunters and farmers fighting from rifle pits, with hunting rifles and shotguns.', tag: 'established',
      lines: [ { text: 'By 12 May only 50 to 60 men were still fighting, with about 40 rifles between them (Hildebrandt).', tag: 'estimate' } ] },
    { side: 'french', type: 'archers', sheet: 'firstnations-fighter', portrait: 'firstnations', name: 'Cree and Dakota fighters', desc: 'First Nations allies of the Métis at Batoche.', tag: 'established',
      lines: [ { text: 'Their numbers at Batoche are not known separately; among them was White Cap’s band of Dakota.', tag: 'estimate' } ] },
    { side: 'french', type: 'cavalry', portrait: 'dumont', name: 'Gabriel Dumont', desc: 'Buffalo hunter, aged 47; the Métis military leader.', tag: 'established',
      lines: [ { text: 'He escaped to the United States after Riel’s surrender, and died near Batoche in 1906.', tag: 'established' } ] },
    { side: 'french', type: 'infantry', portrait: 'riel', name: 'Louis Riel', desc: 'Leader of the provisional government; he carried a crucifix, not a gun.', tag: 'established',
      lines: [ { text: 'Hanged at Regina on 16 November 1885; remembered today as the founder of Manitoba.', tag: 'established' } ] }
  ];
  const C = (title, intro, items) => ({ title, intro, items: items.map(([ref, note]) => ({ ref, note })) });
  S.citations = {
    established: C('Established', 'Agreed by historians.', [['Walter Hildebrandt, The Battle of Batoche: British Small Warfare and the Entrenched Métis (Parks Canada, 1989)', 'The day-by-day account, the units and their strength.'], ['Dictionary of Canadian Biography', 'Riel, Dumont, Middleton.']]),
    account: C('Account', 'One witness or one historian.', [['Hildebrandt (1989), quoting witnesses', 'Garnot’s men, the white cloth, the nails, the Métis thinking peace had come, Riel at prayer, the wedding ring.']]),
    disputed: C('Disputed', 'The sources disagree.', [['Hildebrandt (1989), pp. 73–77', 'Who ordered the final charge: Williams, Van Straubenzie or nobody.']]),
    estimate: C('Estimate', 'An estimate, not a recorded figure.', [['Hildebrandt (1989)', '250 to 300 defenders at the start, 50 to 60 at the end; twenty-five dead.']]),
    reconstruction: C('Reconstruction', 'Our own choice, to make the battle visible.', [['Battles of History', 'Every move on the map; the painted maps, lined up with real elevation data and Hildebrandt’s maps.']])
  };
  S.sources = [
    { title: 'Walter Hildebrandt, The Battle of Batoche: British Small Warfare and the Entrenched Métis, revised edition (Canadian Parks Service, 1989)', note: 'The main source for the four days. parkscanadahistory.com/series/saah/battlebatoche.pdf' },
    { title: 'Dictionary of Canadian Biography: Louis Riel, Gabriel Dumont, Frederick Middleton', note: 'biographi.ca' },
    { title: 'Parks Canada, Batoche National Historic Site', note: 'The site, the rifle pits, the zareba.' },
    { title: 'Photographs by Captain James Peters, A Battery, 1885 (Library and Archives Canada)', note: 'Public domain. See images/README.md for every picture and its licence.' }
  ];
  S.library = [];
})();
