/*
  Historical Scenario File — Siege of Tyre, 332 BCE
  -----------------------------------------------------------------
  The narrated introduction (`intro`), the reenactment chapters (`events`), the debrief (`outcome`) and the captions of the
  "From the record" pictures (`record`), word for word from NARRATION-SCRIPT.md (draft 2), which is what the narrators
  recorded (audio/<voice>/). This part is written by tools/make-scenario-text.py; the map, armies and moves are set in the
  block below the marker line.
  Tags: established, disputed, estimate, reconstruction; a writer's name (Arrian, Diodorus, Curtius, Plutarch) marks whose
  account the line follows; geology marks the modern study of the coast (Brocard et al. 2024).
*/
window.TYRE_SCENARIO = window.TYRE_SCENARIO || {};
Object.assign(window.TYRE_SCENARIO, {
  id: 'tyre',
  title: 'Siege of Tyre',
  date: '332 BCE',
  place: 'Tyre, an island city off the coast of Phoenicia (today Sour, in southern Lebanon)',
  tagline: 'Alexander of Macedon vs. the island city of Tyre',
  confidence: {
    established:    { label: 'Established',    color: '#5fcf8a', desc: 'The ancient writers agree, or it is secure modern knowledge.' },
    arrian:         { label: 'Arrian',         color: '#ffd27a', desc: 'From Arrian, Anabasis, Book II (2nd century CE): the account this page follows for the order of events.' },
    diodorus:       { label: 'Diodorus',       color: '#f0b46a', desc: 'From Diodorus of Sicily, Library, Book XVII (1st century BCE).' },
    curtius:        { label: 'Curtius',        color: '#e6a0c8', desc: 'From Quintus Curtius Rufus, History of Alexander, Book IV (probably 1st century CE).' },
    plutarch:       { label: 'Plutarch',       color: '#9fd0ff', desc: 'From Plutarch, Life of Alexander, 24–25 (around 100 CE).' },
    geology:        { label: 'Geology',        color: '#7fd6c8', desc: 'From the modern study of Tyre’s coastline (Brocard et al., Quaternary Science Reviews, 2024).' },
    disputed:       { label: 'Disputed',       color: '#ff9a86', desc: 'The ancient writers disagree, or the story is doubtful.' },
    estimate:       { label: 'Estimate',       color: '#e9c77a', desc: 'A rounded or converted number (stades into metres, for example).' },
    reconstruction: { label: 'Reconstruction', color: '#c8a2ff', desc: 'Our own placing of something no source pins down: where each ship and soldier stood, and the exact line of walls and harbours.' }
  },
  sides: {
    allied: { name: 'Alexander’s army and fleet', short: 'Macedonians', army: 'Alexander of Macedon, with his army and the fleets of the cities that joined him', color: '#c0392b', light: '#ffd6d0' },
    french: { name: 'The city of Tyre', short: 'Tyrians', army: 'The Phoenician island city of Tyre, its walls and its fleet', color: '#2e5aa8', light: '#d0dcff' }
  },
  welcome: "Welcome to Battles of History. Today we are learning about the Siege of Tyre, fought in 332 BCE on the coast of what is now Lebanon. On one side was Alexander the Great, king of Macedon, with his army and, later, a fleet of ships from the cities that had joined him. On the other was Tyre, a Phoenician city built on an island, with its walls, its harbours and its fleet. The siege lasted about seven months.",
  intro: [
  {
    "title": "SIEGE OF TYRE",
    "lines": [
      {
        "text": "In 332 BCE, Alexander of Macedon tried to take the island city of Tyre. To reach it, his men built a road of stone and earth across the sea. The Tyrians fought back by sea, by fire and with machines of their own. After about seven months, the city fell.",
        "tag": "established"
      },
      {
        "text": "That road across the sea is called a mole: a bank of stones and earth built out into the water. Sand later piled up against it. The island of Tyre is joined to the mainland to this day.",
        "tag": "established"
      }
    ],
    "media": [
      {
        "at": 0,
        "file": "cover.jpg",
        "caption": "An artist’s impression of the siege, made for this page (AI-generated): Alexander points toward the island city while his men build the mole. Not evidence: the walls look medieval, and Arrian describes a mole of stones and earth, not a timber trestle.",
        "credit": "Battle Games, AI-generated (ChatGPT) for this project. An artist's impression for the title card, not evidence: the walls look medieval, and the mole is drawn as a timber trestle. Arrian describes a mole of stones and earth, with towers built on it"
      },
      {
        "at": 16,
        "file": "record-tyre-south-side-2021.jpg",
        "caption": "Tyre today, from the beach to the south. The modern town stands on the sandy neck of land that grew against Alexander's mole. The low headland at the far left is the old island. In 332 BCE, all of the land in the middle of this picture was sea.",
        "credit": "Roman Deckert, CC BY-SA 4.0, via Wikimedia Commons."
      }
    ]
  },
  {
    "title": "After Issus",
    "lines": [
      {
        "text": "In late 333 BCE, Alexander defeated the Persian king, Darius the Third, at Issus, near today's border between Turkey and Syria. Then he marched south, down the coast of Phoenicia, the land of the great trading cities of the Levant.",
        "tag": "established"
      },
      {
        "text": "One by one, most of the Phoenician cities came over to him. Aradus did, and Byblos. The people of Sidon invited him in.",
        "tag": "arrian"
      },
      {
        "text": "Tyre also sent envoys to meet him on the road. Among them was the son of the king. They said that Tyre would do whatever Alexander commanded.",
        "tag": "arrian"
      },
      {
        "text": "King Azemilcus himself was away, at sea with his ships in the Persian fleet.",
        "tag": "arrian"
      },
      {
        "text": "Alexander had a reason to want every port on this coast. The Persian fleet was mostly Phoenician and Cypriot ships. If the ports were his, Arrian has him say, that fleet would have nowhere to go, and the road to Egypt would be open.",
        "tag": "arrian"
      }
    ],
    "media": [
      {
        "at": 26,
        "file": "art-envoys.jpg",
        "caption": "Envoys from Tyre, among them the king’s son, meet Alexander on the road and promise to do whatever he commands (Arrian). An artist’s impression made for this page, not evidence: the faces and the city in the distance are imagined.",
        "credit": "AI-generated (ChatGPT) for this project: an artist's impression, not evidence. Redrawn with Macedonian linen corslets, bronze helmets and round shields; the city in the distance is imagined."
      }
    ]
  },
  {
    "title": "The island city",
    "lines": [
      {
        "text": "Tyre stood on a rocky island, a little way off the coast. Diodorus says four stades of sea lay between them: about seven hundred metres.",
        "tag": "diodorus"
      },
      {
        "text": "A modern study of the coast reconstructs the island as about one and a half kilometres long and six hundred metres wide. That is a best estimate, not a measured shoreline.",
        "tag": "estimate"
      },
      {
        "text": "High walls ran all round it. On the side facing the mainland, Arrian says they were about a hundred and fifty feet high, built of large stones set in mortar.",
        "tag": "arrian"
      },
      {
        "text": "The city had two harbours: one facing north, toward Sidon, and one facing south, toward Egypt.",
        "tag": "established"
      },
      {
        "text": "Its oldest and holiest place was the temple of its god Melqart, whom the Greeks called Heracles. Arrian describes it as the oldest temple that people remembered. On the mainland opposite stood an older settlement, called Old Tyre.",
        "tag": "arrian"
      },
      {
        "text": "Tyre was a city of seafarers. Its colonists had founded Carthage, in North Africa.",
        "tag": "established"
      },
      {
        "text": "Diodorus calls the Carthaginians the Tyrians' descendants, and the Tyrians hoped Carthage would help them.",
        "tag": "diodorus"
      }
    ],
    "media": [
      {
        "at": 0,
        "file": "art-island.jpg",
        "caption": "Tyre before the siege, seen from the mainland: the sea wall, a walled harbour at each end, and the temple of Melqart in the middle. An artist’s impression made for this page from our map; the exact shape of the harbours is not known.",
        "credit": "AI-generated (ChatGPT) for this project from our layout guide (images/layout/view-from-mainland-guide.png): an artist's impression. The island's width and the temple's place follow our map; the harbours' exact shapes are not known."
      },
      {
        "at": 53,
        "file": "record-tyre-heritage-panorama-2024.jpg",
        "caption": "The Al Mina part of the Tyre World Heritage Site, with the sea and the hills of the mainland on the left: the hills that supplied timber for the mole, Diodorus says.",
        "credit": "Osmhsn2004, CC0 1.0, via Wikimedia Commons."
      }
    ]
  },
  {
    "title": "The refusal",
    "lines": [
      {
        "text": "Alexander said he wished to enter Tyre and sacrifice to Heracles in his temple.",
        "tag": "arrian"
      },
      {
        "text": "The Tyrians gave their answer. Arrian reports it like this: they would do anything else he asked, but they would let neither Persians nor Macedonians into their city, while the war was still undecided.",
        "tag": "arrian"
      },
      {
        "text": "Curtius adds an offer. There was a temple of Hercules on the mainland, at Old Tyre, the envoys said. Alexander could sacrifice there.",
        "tag": "curtius"
      },
      {
        "text": "The writers explain the refusal differently. In Arrian, the Tyrians say they want to stay out of a war between two great powers. Diodorus says the Tyrians wanted to please Darius, trusted in their island, and hoped for help from Carthage.",
        "tag": "disputed"
      },
      {
        "text": "Arrian says Alexander sent the envoys back in anger.",
        "tag": "arrian"
      },
      {
        "text": "Curtius alone adds that heralds sent to urge peace were killed and thrown into the sea. No other surviving writer tells this.",
        "tag": "disputed"
      }
    ],
    "media": []
  },
  {
    "title": "The two sides",
    "lines": [
      {
        "text": "How many men Alexander had at Tyre, no ancient writer reliably says. Nor do they count the city's defenders. This page gives no army numbers.",
        "tag": "established"
      },
      {
        "text": "What Alexander had was the army that had won at Issus. What he did not have was a fleet that could face Tyre's.",
        "tag": "arrian"
      },
      {
        "text": "Tyre had walls, engines, and, Diodorus says, eighty triremes. A trireme was a warship powered by three levels of rowers, with a bronze ram at the bow. It also had smaller boats that could carry archers, slingers and catapults.",
        "tag": "diodorus"
      },
      {
        "text": "The Tyrians voted to send their children, their women and their old people to Carthage. Diodorus says only a part of them got away before the siege closed in. Curtius tells a similar story.",
        "tag": "diodorus"
      },
      {
        "text": "Diodorus says the Tyrians mocked Alexander. Did he think he could overcome Poseidon, the god of the sea?",
        "tag": "diodorus"
      }
    ],
    "media": []
  },
  {
    "title": "How this page tells it",
    "lines": [
      {
        "text": "No one who was at Tyre left an account that survives. Our four main writers lived hundreds of years later: Diodorus of Sicily, in the first century BCE; Curtius, probably in the first century CE; Plutarch, around 100 CE; and Arrian, in the second century CE. They used older histories that are now lost.",
        "tag": "established"
      },
      {
        "text": "They often disagree: about what happened, in what order, and how many died. When they do, this page tells you who says what.",
        "tag": "established"
      },
      {
        "text": "After each line you will see a tag. A writer's name tells you which ancient account we are following. \"Established\" means the sources agree. \"Disputed\" means they do not. \"Estimate\" marks a rounded number, and \"reconstruction\" marks our own best placing on the map.",
        "tag": "established"
      },
      {
        "text": "The map follows Arrian's order of events. The shape of the island comes from a modern study of the coast. The exact places of the walls, harbours and temple are not known: the map shows our best placing, and an area, not a point, where no one can be sure.",
        "tag": "reconstruction"
      }
    ],
    "media": []
  }
],
  events: [
  {
    "title": "The mole begins",
    "clock": "332 BCE · Early in the siege",
    "tag": "arrian",
    "text": "Alexander decides to build a wide causeway of stone and earth out to the island. Arrian says he dreamed that Heracles took him by the hand and led him into the city, and his seer, Aristander, said that Tyre would fall, but only after great labour. Plutarch tells the dream differently: Heracles held out his hand to him from the walls and called to him. His men start to build the mole out from the mainland, toward the city. Diodorus says they pulled down Old Tyre for its stones, and that people from the nearby towns were brought in to carry them. Arrian describes the water: shallow and muddy near the shore, and about three fathoms deep, a little over five metres, close to the city. Arrian explains that stakes drove easily into the mud, and the mud held the stones together. Diodorus gives the width of the mole as two plethra, about sixty metres. Near the shore, the work goes quickly."
  },
  {
    "title": "The sea fights back",
    "clock": "332 BCE · Early in the siege",
    "tag": "arrian",
    "text": "The further the mole reaches, the deeper the water and the closer the walls. Now the builders are within range. Arrian says the Tyrians still ruled the sea. From their triremes they row up along the sides of the mole and strike at the workers. From the walls, they shoot down on them. Many of the workers have little protection. Alexander answers with screens to shield them, and builds two towers at the head of the mole, covered with animal hides, with engines on top to shoot back."
  },
  {
    "title": "The fireship",
    "clock": "332 BCE · Early in the siege",
    "tag": "arrian",
    "text": "The Tyrians make a weapon of their own. They take an old horse transport, a wide ship, and fill it with dry wood, pitch and sulphur. On two masts they hang cauldrons of things that burn. They weigh down the stern, so that the bow rides high. With a wind blowing toward the mole, their triremes tow the ship in, and the men aboard set it alight and get away. The ship drives against the head of the mole, and both towers catch fire. Tyrian boats close in, tear up the stakes along the mole and burn the engines that the fire had missed. This is Arrian's story. Alexander orders the mole made wider, so that it can carry more towers, and the work begins again."
  },
  {
    "title": "The storm",
    "clock": "332 BCE · Early in the siege, in Diodorus",
    "tag": "disputed",
    "text": "Diodorus does not mention the fireship. Instead he describes a powerful north-west wind that smashed much of the mole. Alexander had whole trees cut in the mountains and brought down, branches and all, to rebuild it. Diodorus also tells of fear inside the city. Some Tyrians said that their god Apollo meant to leave them for Alexander, so they bound his statue with golden chains. Plutarch tells a similar story, but in his version they tied the statue with ropes and nailed it to its base. How the storm fits into Arrian's order of events, the surviving accounts do not tell us."
  },
  {
    "title": "The fleet changes sides",
    "clock": "332 BCE · Middle of the siege",
    "tag": "arrian",
    "text": "Alexander goes to Sidon to gather ships. The kings of Aradus and Byblos hear that their cities are now in his hands. They leave the Persian fleet, and bring their ships to him: about eighty Phoenician ships, with the ships of Sidon. Ten come from Rhodes, three each from Soli and Mallus, in Asia Minor, and ten from Lycia. There is one Macedonian ship: a penteconter, a ship of fifty oars, under Proteas. Not long after, the kings of Cyprus sail in with about a hundred and twenty more. Arrian's numbers come to well over two hundred ships. Plutarch gives two hundred. Now Alexander, too, has a fleet. Many of its crews are Phoenician, like the Tyrians themselves."
  },
  {
    "title": "Ten days in the mountains",
    "clock": "332 BCE · While the fleet was fitted out",
    "tag": "arrian",
    "text": "While the ships are made ready, Alexander leaves Sidon. He takes some squadrons of cavalry, the archers, the Agrianians, light troops from the hills north of Macedon, and the hypaspists, the foot guards who fought close to the king. He marches into the Antilebanon mountains, against the Arab peoples there. Some places he takes by force; others come to terms. Within ten days he is back in Sidon, where four thousand Greek mercenaries have arrived to join him. Plutarch, quoting an older writer named Chares, tells a story from this march. Alexander's old tutor, Lysimachus, could not keep up, and Alexander stayed behind with him, cut off from his army for a night, at great risk. It is Plutarch's story, written centuries after the event."
  },
  {
    "title": "The blockade",
    "clock": "332 BCE · After the fleet arrived",
    "tag": "arrian",
    "text": "Alexander sails for Tyre with his fleet in battle order. The Tyrians had meant to fight at sea. When they see how many ships are coming, they stay in harbour. They block both harbour mouths with their triremes. At the north harbour, the Phoenicians ram three of them, and the crews swim ashore. Then Alexander sets his watch. The Cypriots, under the admiral Andromachus, guard the harbour toward Sidon. The Phoenicians guard the harbour toward Egypt, on the far side of the mole, close to Alexander's own tent. Alexander now tries to cut the city off by land and by sea."
  },
  {
    "title": "Stones, divers and chains",
    "clock": "332 BCE · Middle of the siege",
    "tag": "arrian",
    "text": "Alexander now brings his engines by sea. He mounts them on horse transports and slow triremes and moves them up to the walls. But many stones lie in the water at the foot of the walls, and they keep the ships away. Who put them there, Arrian does not say. The Macedonians anchor and try to haul them out. Tyrian ships, shielded with protective covers, row in and cut the anchor ropes. Alexander guards his anchors with shielded boats of his own. Then Tyrian divers swim out under the water and cut the ropes again. At last the Macedonians use chains instead of ropes. From the mole, they loop ropes around the stones, drag them clear, and drop them into deep water."
  },
  {
    "title": "Machines against machines",
    "clock": "332 BCE · Late in the siege",
    "tag": "diodorus",
    "text": "On the walls, the Tyrians answer engine with engine. Diodorus describes their devices. Spinning wheels, divided into sections, meant to knock aside the bolts and stones shot at them. Soft padding, and hides stuffed with seaweed, to soak up stones. Nets to snag the attackers, and hooked tridents on lines to drag them off the bridges. Long poles with blades to cut the ropes of the rams. And sand, heated red-hot in bronze shields and thrown down on the men below. Diodorus says it ran in under their armour. Curtius describes the hot sand too. Diodorus adds that the Tyrians built a second wall behind the first. Where it ran, no one knows."
  },
  {
    "title": "The midday sortie",
    "clock": "332 BCE · Late in the siege, at midday",
    "tag": "arrian",
    "text": "The Tyrians plan a surprise. Behind sails stretched across the mouth of the north harbour, they man thirteen of their best ships. Three are quinqueremes and three are quadriremes, warships larger than triremes, with more rowers to each oar. Seven are triremes. At midday, when many of the sailors outside have left their ships for their daily needs, and Alexander has gone back to his tent, they row out quietly, in single file. They fall on the Cypriot ships at anchor. At the first charge they sink the quinquereme of King Pnytagoras of Salamis, in Cyprus. They also sink the ships of Androcles of Amathus and Pasicrates of Curium, and drive others onto the shore. But Alexander comes back sooner than usual. He rows round the island with his own ships. The Tyrians on the walls shout and signal to their ships to come back. Only a few make it back in time. Many of the Tyrian ships are disabled, and two are captured at the harbour mouth. Few of their men are killed: most swim back into the harbour."
  },
  {
    "title": "The first breach",
    "clock": "332 BCE · Late in the siege",
    "tag": "arrian",
    "text": "Now the rams go to work. On the side facing the mole, the wall is too strong for them to break. On the side toward Sidon, they fail too. On the side facing south, toward Egypt, they shake the wall until part of it falls. Alexander sends men across on bridges from the ships. The Tyrians drive them back without much trouble. Diodorus tells it differently. In his account, a stretch of wall about thirty metres long falls, and the attackers burst in, but are thrown out, and the Tyrians rebuild the gap that same night. After this, he says, the mole reached the wall."
  },
  {
    "title": "The final assault",
    "clock": "332 BCE · Three days later",
    "tag": "arrian",
    "text": "Alexander waits for calm weather. Then he brings the engine ships back to the south wall, and the rams open a wide breach. Two ships carry bridges. On one, commanded by Admetus, are the hypaspists. On the other, the infantry battalion of Coenus. At the same time Alexander sends triremes against both harbours, and ships with archers and catapults circle the walls. The bridges go down onto the rubble. Admetus is the first man onto the wall. A spear strikes him, and he falls dead. Alexander follows him up with his own men, and they take the wall. Diodorus tells this part differently too. In his account, Admetus died earlier, from the blow of an axe, in an attack that failed. That night, he says, Alexander thought of giving up the siege. In his account the city was finally entered near its shipyards. Plutarch adds a story about the day itself. Aristander had promised that Tyre would fall within the month. Plutarch says that on the last day of the month, with the city still standing, Alexander ordered that day counted as only the twenty-eighth, and pressed the attack."
  },
  {
    "title": "The harbours are forced",
    "clock": "332 BCE · The same day",
    "tag": "arrian",
    "text": "At the south harbour, the one facing Egypt, the Phoenician squadron breaks through the booms, the floating barriers across its mouth. Inside, they ram the Tyrian ships afloat and drive others ashore. At the north harbour, which Arrian says had no boom at all, the Cypriots sail straight in, and enter the city from that side. The attackers now have several ways into the city: the south wall and both harbours."
  },
  {
    "title": "Inside the city",
    "clock": "332 BCE · The same day",
    "tag": "arrian",
    "text": "The Tyrians fall back from the walls. Many gather to make a stand at a shrine of Agenor, a hero of Tyre. Arrian says the Macedonians were enraged, by the long siege, and because the Tyrians had killed Macedonian prisoners on the walls, in sight of the camp, and thrown them into the sea. That is Arrian's explanation for their anger, not an excuse for it. Diodorus says the Tyrian fighters blocked their narrow streets and fought until almost all of them were cut down. Curtius says that sailors from Sidon, serving in Alexander's fleet, hid Tyrians aboard their ships and carried them to safety."
  },
  {
    "title": "The sanctuary",
    "clock": "Hecatombaeon, July–August 332 BCE",
    "tag": "arrian",
    "text": "Some Tyrians reach the temple of Heracles, Melqart's temple. Among them are King Azemilcus, now back in his city, and the leading men of Tyre. With them are envoys from Carthage, who had come to honour Heracles, by an ancient custom, in their mother city. How or when the king came home from the Persian fleet, no source says. Arrian says Alexander spared those who had taken refuge in the temple. Arrian dates the fall of Tyre to the Athenian month of Hecatombaeon: about July or August of 332 BCE."
  }
],
  outcome: [
  {
    "text": "Tyre fell after about seven months. Diodorus, Plutarch and Curtius give that length. Arrian dates the fall, but does not say how long the siege took.",
    "tag": "diodorus"
  },
  {
    "text": "Each writer gives his own numbers for the Tyrians, and they cannot be added together.",
    "tag": "established"
  },
  {
    "text": "Arrian says about eight thousand Tyrians were killed, and about thirty thousand were sold as slaves, Tyrians and foreigners caught in the city.",
    "tag": "arrian"
  },
  {
    "text": "Diodorus says more than seven thousand were killed in the street fighting. Afterwards, he says, Alexander had the young men, no fewer than two thousand, hung up and killed. The women and children were enslaved, and more than thirteen thousand captives were left.",
    "tag": "diodorus"
  },
  {
    "text": "Curtius says six thousand fighting men were killed in the city, and two thousand were crucified. He adds that fifteen thousand were saved, hidden by the Sidonians. That is his number for those rescued, not for all who survived.",
    "tag": "curtius"
  },
  {
    "text": "On Alexander's side, Arrian counts Admetus and twenty hypaspists killed in the final assault. Across the whole siege, he says, about four hundred Macedonians died.",
    "tag": "arrian"
  },
  {
    "text": "Then Alexander made his sacrifice to Heracles in the temple he had asked to enter at the start. His army marched past in armour, and his fleet sailed past in review. There were games and a torch race in honour of Heracles. In the temple he dedicated the engine that had broken the wall, and the sacred ship of Heracles that his fleet had captured.",
    "tag": "arrian"
  },
  {
    "text": "Earlier, during the siege, Arrian says, envoys from Darius had come with an offer of peace. Alexander turned it down.",
    "tag": "arrian"
  },
  {
    "text": "Alexander marched south. Gaza resisted him too. After Gaza, he entered Egypt.",
    "tag": "established"
  },
  {
    "text": "Some of the people Tyre sent away before the siege reached Carthage. Diodorus is not consistent: in one place he says only a part of them got away, in another that most of the captives had been taken to Carthage.",
    "tag": "disputed"
  },
  {
    "text": "Curtius says the Carthaginians had sent word that they could give no military help. How many reached safety, no one can say.",
    "tag": "disputed"
  },
  {
    "text": "Tyre did not disappear. It was resettled and rebuilt, and became a busy port again under later Greek kings and under Rome. Most of the ruins on the old island today are Roman and Byzantine.",
    "tag": "established"
  },
  {
    "text": "The mole changed the coast for good. Sand carried along the shore piled up against it, and over the centuries the island became a peninsula. Diodorus says the city \"became a peninsula\" during the siege itself. Modern geologists say the sandy neck grew over centuries, and that a sandy bank under the water had helped the builders from the start.",
    "tag": "diodorus"
  },
  {
    "text": "Today Tyre, called Sour in Arabic, is a city in southern Lebanon. Its ancient ruins were listed as a UNESCO World Heritage Site in 1984. The town stands on the sand that grew against Alexander's mole.",
    "tag": "established"
  }
],
  record: {
  "record-tyre-south-side-2021.jpg": {
    "at": 0,
    "file": "record-tyre-south-side-2021.jpg",
    "caption": "Tyre today, from the beach to the south. The modern town stands on the sandy neck of land that grew against Alexander's mole. The low headland at the far left is the old island. In 332 BCE, all of the land in the middle of this picture was sea.",
    "credit": "Roman Deckert, CC BY-SA 4.0, via Wikimedia Commons."
  },
  "record-egyptian-harbour-columns-2019.jpg": {
    "at": 0,
    "file": "record-egyptian-harbour-columns-2019.jpg",
    "caption": "Ancient columns lying in the water of Tyre's southern harbour, the one Arrian calls the harbour toward Egypt. In the final assault the Phoenician ships broke its booms and forced their way in. The columns are much later than the siege, probably Roman. The harbour's shape has changed since 332 BCE.",
    "credit": "Roman Deckert, CC BY-SA 4.0, via Wikimedia Commons."
  },
  "record-al-mina-ruins-2008.jpg": {
    "at": 0,
    "file": "record-al-mina-ruins-2008.jpg",
    "caption": "The Al Mina excavations, on the old island of Tyre: Roman and Byzantine baths, a colonnaded street, and marble columns by the sea. These are the ruins of the city that grew again after the siege, on the island Alexander besieged. Nothing standing here dates from 332 BCE.",
    "credit": "© Vyacheslav Argenberg / www.vascoplanet.com, CC BY 4.0, via Wikimedia Commons."
  },
  "record-tyre-heritage-panorama-2024.jpg": {
    "at": 0,
    "file": "record-tyre-heritage-panorama-2024.jpg",
    "caption": "The Al Mina part of the Tyre World Heritage Site, with the sea and the hills of the mainland on the left: the hills that supplied timber for the mole, Diodorus says.",
    "credit": "Osmhsn2004, CC0 1.0, via Wikimedia Commons."
  }
}
});

/* ======================================================================================================================
   Maps, armies, leaders and their moves.
     siege map  images/terrain-siege.jpg  33.2855–33.2585 N, 35.1795–35.2226 E (about 4.0 x 3.0 km, 2400 x 1800 world px,
                about 600 px to the km). Painted for this project over the 2024 reconstruction of the coast (Brocard et al.).
   ILLUSTRATIVE POSITIONS. The island's outline follows the modern reconstruction; the walls, the two harbours and the
   temple are symbols, not surveyed lines (TYRE-MAP-UNCERTAINTIES.md). The mole is drawn straight from the beach to the
   middle of the east wall; how far it had reached in each chapter is our reconstruction (images/trenches/mole-N.png,
   tools/make-mole-layers.py). Every ship and soldier position is ours, placed to follow the narration (Arrian's order).
   ====================================================================================================================== */
(() => {
  const S = window.TYRE_SCENARIO;
  const PI = Math.PI, E = 0, Wd = PI, N = -PI / 2, So = PI / 2;
  const MY = 870, SHORE = { x: 1640, y: MY }, H1 = 1460, H2 = 1330, H4 = 1180, H5 = 1036;   // the mole: its line and its head, stage by stage
  const CAMP = { x: 1930, y: 960 }, TENT = { x: 1820, y: 1180 }, TEMPLE = { x: 780, y: 950 }, AGENOR = { x: 700, y: 1200 },
        NHARB = { x: 955, y: 640 }, NMOUTH = { x: 1060, y: 590 }, SHARB = { x: 950, y: 1150 }, SMOUTH = { x: 1070, y: 1170 },
        WALLE = { x: 990, y: MY }, WALLN = { x: 800, y: 545 }, WALLS = { x: 850, y: 1330 }, BREACH = { x: 870, y: 1335 },
        CYP = { x: 1180, y: 520 }, PHO = { x: 1190, y: 1260 };
  const head = x => ({ x: x + 40, y: MY });
  const SH = h => Math.round(h * .72);   // ships drawn smaller than the soldiers' scale would make them, so the strait is not crowded
  Object.assign(S, {
    titleCard: {
      title: 'SIEGE OF TYRE', date: '332 BCE',
      dateNote: 'Alexander of Macedon builds a road across the sea to reach an island city. About seven months later, Tyre falls.',
      dateRef: 'Arrian, Anabasis 2.15–24; Diodorus 17.40–46; Curtius 4.2–4; Plutarch, Alexander 24–25',
      place: 'Tyre, an island off the coast of Phoenicia (today Sour, in southern Lebanon)',
      sides: 'Alexander of Macedon, his army and, later, the fleets of the cities that joined him  ·  The Phoenician island city of Tyre'
    },
    world: { w: 2400, h: 1800 },
    terrain: 'terrain-siege.jpg',
    duration: 210, commandDuration: 300, commandFocus: { x: 1300, y: 900 },
    battlefield: {
      scale: { px: 600, label: '1 km' },
      labels: [
        { x: 790, y: 1530, text: 'Tyre', small: false }, { x: 1330, y: 1600, text: 'the strait', small: true },
        { x: 2050, y: 330, text: 'the mainland', small: true }, { x: 2150, y: 1700, text: 'to Egypt ▼', small: true }, { x: 2150, y: 80, text: '▲ to Sidon', small: true },
        { x: 1110, y: 480, text: 'harbour toward Sidon', small: true }, { x: 1150, y: 1120, text: 'harbour toward Egypt', small: true }
      ]
    },
    eventMarkers: true,
    trenchLayers: ['mole-1.png', 'mole-2.png', 'mole-3.png', 'mole-4.png', 'mole-5.png'], trenchAlpha: 1, defaultTrench: null, introTrench: null,
    globe: { target: { lon: 35.1937, lat: 33.2707 }, region: { lon: 31, lat: 36 }, pull: 3.2, startLat: 25,
      periodNote: 'Early 332 BCE: approximate extents, a reconstruction',
      labels: [ { lon: 22.94, lat: 40.64, text: 'Macedon', size: .55 }, { lon: 36.17, lat: 36.84, text: 'Issus', size: .5, dot: true },
                { lon: 35.37, lat: 33.56, text: 'Sidon', size: .5, dot: true }, { lon: 34.46, lat: 31.5, text: 'Gaza', size: .5, dot: true },
                { lon: 44.4, lat: 32.5, text: 'Babylon', size: .5, dot: true }, { lon: 10.32, lat: 36.85, text: 'Carthage', size: .5, dot: true },
                { lon: 35.1937, lat: 33.2707, text: 'TYRE', size: .85, pin: true, early: true } ] },
    establishing: [
      { file: 'terrain-campaign.jpg', secs: 5, pulse: { x: .6094, y: .5446 }, credit: 'The eastern Mediterranean: Macedon, Asia Minor, Phoenicia and Egypt. Painted for this project (AI-generated) over real elevation data; coastlines of today.' },
      { file: 'terrain-coast.jpg', secs: 5, pulse: { x: .2474, y: .792 }, credit: 'The Phoenician coast: Aradus, Byblos, Sidon and Tyre, with the Lebanon and Antilebanon mountains. Painted for this project (AI-generated) over real elevation data.' },
      { file: 'terrain-region.jpg', secs: 6, pulse: { x: .2438, y: .718 }, credit: 'Tyre and the mainland opposite, with Old Tyre. The island’s outline follows the 2024 reconstruction (Brocard et al.). Painted for this project (AI-generated).' }
    ],
    imageBase: 'images/', audioBase: 'audio/',
    voices: [ { id: 'clear', name: 'Narrator 1 · clear', speaker: 25 } ],
    sheets: ['macedonian-spearman', 'macedonian-archer', 'macedonian-cavalry', 'mole-workers', 'mole-workers-2', 'siege-catapult', 'ship-allied-quinquereme', 'ship-ram-pair', 'ship-fireship-east',
             'tyre-spearman', 'tyre-archer', 'tyre-slinger', 'tyre-wall-defenders', 'tyre-civilians', 'ship-tyrian-trireme'],
    attackSheets: { 'tyre-spearman': 'tyre-spearman-attack' },
    sheetBy: { allied: { infantry: 'macedonian-spearman', archers: 'macedonian-archer', cavalry: 'macedonian-cavalry', ship: 'ship-allied-quinquereme' },
               french: { infantry: 'tyre-spearman', archers: 'tyre-archer', cavalry: 'tyre-spearman', ship: 'ship-tyrian-trireme' } },
    sideArt: { allied: { cloth: '#7a1f1a', cloth2: '#c9a24a', pennant: '#c0392b' }, french: { cloth: '#5a2a6a', cloth2: '#e6dcc0', pennant: '#2e5aa8' } },
    legend: [ { label: 'Alexander’s army and fleet', short: 'Macedonians', color: '#c0392b', kind: 'dot' }, { label: 'The city of Tyre', short: 'Tyrians', color: '#2e5aa8', kind: 'dot' } ],
    ai: { plans: {} }, commandLines: {},
    debrief: { allied: { victory: { title: 'Tyre is taken', text: '' }, defeat: { title: 'The siege fails', text: '' }, stalemate: { title: 'The siege drags on', text: '' } },
               french: { victory: { title: 'Tyre holds', text: '' }, defeat: { title: 'Tyre falls', text: '' }, stalemate: { title: 'The siege drags on', text: '' } } }
  });
  S.sides.allied.rally = { x: 2100, y: 1000 }; S.sides.french.rally = TEMPLE;

  // Things that stand on the map and change: the towers at the head of the mole, the fires, ships sinking, the bridges.
  const O = (o) => Object.assign({ hidden: true }, o);
  const sink = (id, sheet, at, h) => O({ id, sheet, x: at.x, y: at.y, h: h || 50 });
  const sinkAnim = { cells: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], fps: 1.4, mode: 'once' };
  S.mapObjects = [
    O({ id: 'tower1', sheet: 'siege-tower', x: H2 + 25, y: MY - 14, h: 78, row: 3, col: 0 }), O({ id: 'tower2', sheet: 'siege-tower', x: H2 + 25, y: MY + 24, h: 78, row: 3, col: 0 }),
    O({ id: 'fire1', sheet: 'fire', x: H2 + 25, y: MY - 8, h: 70 }), O({ id: 'fire2', sheet: 'fire', x: H2 + 30, y: MY + 28, h: 70 }), O({ id: 'fire3', sheet: 'fire', x: H2 + 5, y: MY + 8, h: 56 }),
    O({ id: 'tower3', sheet: 'siege-tower', x: H4 + 25, y: MY - 14, h: 78, row: 3, col: 0 }), O({ id: 'tower4', sheet: 'siege-tower', x: H4 + 25, y: MY + 24, h: 78, row: 3, col: 0 }),
    sink('cypA', 'ship-allied-quinquereme-damage', { x: 1170, y: 470 }, 56), sink('cypB', 'ship-allied-quinquereme-damage', { x: 1250, y: 520 }, 52), sink('cypC', 'ship-allied-quinquereme-damage', { x: 1130, y: 560 }, 52),
    sink('tN1', 'ship-tyrian-trireme-damage', { x: 1095, y: 575 }, 48), sink('tN2', 'ship-tyrian-trireme-damage', { x: 1120, y: 615 }, 46), sink('tN3', 'ship-tyrian-trireme-damage-west', { x: 1070, y: 545 }, 46),
    sink('tS1', 'ship-tyrian-trireme-damage', { x: 1010, y: 1150 }, 46), sink('tS2', 'ship-tyrian-trireme-damage-west', { x: 990, y: 1185 }, 46),
    sink('tX1', 'ship-tyrian-trireme-damage-west', { x: 1060, y: 600 }, 46), sink('tX2', 'ship-tyrian-trireme-damage', { x: 1110, y: 640 }, 46),
    O({ id: 'bridgeA', sheet: 'ship-bridge', x: 975, y: 1330, h: 66, row: 3, col: 0 }), O({ id: 'bridgeB', sheet: 'ship-bridge', x: 1005, y: 1280, h: 62, row: 3, col: 0 }),
    O({ id: 'civ1', sheet: 'tyre-civilians', x: 620, y: 1000, h: 34, anim: { row: 1, fps: 3 } }), O({ id: 'civ2', sheet: 'tyre-civilians', x: 700, y: 820, h: 34, anim: { row: 0, fps: 3 } })
  ];

  const F = (o) => Object.assign({ power: 1, confidence: 'reconstruction' }, o);
  S.formations = [
    // Alexander's side: the builders, the army on the mainland, and (later) the fleet
    F({ id: 'workers', side: 'allied', name: 'Builders of the mole', division: 'Builders', type: 'infantry', sheet: 'mole-workers', cols: 4, rows: 2, h: 30, power: .2, x: 1700, y: MY, facing: Wd, confidence: 'arrian', note: 'Soldiers and labourers. Diodorus says people from the nearby towns were brought in to carry the stones.' }),
    F({ id: 'workers2', side: 'allied', name: 'Stone carriers from Old Tyre', division: 'Stone carriers', type: 'infantry', sheet: 'mole-workers-2', cols: 3, rows: 1, h: 30, power: .2, x: 1820, y: 800, facing: Wd, confidence: 'diodorus', note: 'Diodorus: they pulled down Old Tyre, on the mainland, for its stones.' }),
    F({ id: 'phalanx', side: 'allied', name: 'Macedonian phalanx', division: 'Phalanx', type: 'infantry', cols: 6, rows: 3, x: CAMP.x, y: CAMP.y, facing: Wd, confidence: 'established', note: 'The infantry battalions that had won at Issus. How many were at Tyre, no ancient writer reliably says.' }),
    F({ id: 'archers', side: 'allied', name: 'Archers', division: 'Archers', type: 'archers', cols: 4, rows: 1, x: 1780, y: 760, facing: Wd, confidence: 'arrian' }),
    F({ id: 'hyp', side: 'allied', name: 'Hypaspists, the foot guards', division: 'Hypaspists', type: 'infantry', cols: 5, rows: 2, x: 2040, y: 1060, facing: Wd, confidence: 'arrian', note: 'The foot guards who fought close to the king. Admetus led them over the wall in the final assault (Arrian).' }),
    F({ id: 'agr', side: 'allied', name: 'Agrianians', division: 'Agrianians', type: 'archers', cols: 4, rows: 1, x: 2060, y: 1180, facing: Wd, confidence: 'arrian', note: 'Light troops from the hills north of Macedon.' }),
    F({ id: 'cav', side: 'allied', name: 'Companion cavalry', division: 'Cavalry', type: 'cavalry', cols: 4, rows: 1, x: 2150, y: 880, facing: Wd, confidence: 'arrian' }),
    F({ id: 'mercs', side: 'allied', name: 'Greek mercenaries', division: 'Greek mercenaries', type: 'infantry', cols: 5, rows: 2, offmap: true, x: 2380, y: 300, facing: Wd, confidence: 'arrian', note: 'Four thousand mercenaries from the Peloponnese, who joined Alexander at Sidon (Arrian 2.20.5).' }),
    F({ id: 'engines', side: 'allied', name: 'Stone-throwers on the mole', division: 'Engines', type: 'archers', sheet: 'siege-catapult', cols: 2, rows: 1, h: 34, hidden: true, offmap: true, x: H2 + 70, y: MY, facing: Wd, confidence: 'arrian', note: 'Torsion engines on the towers and the mole: giant crossbows that shot bolts and stones.' }),
    F({ id: 'phoen', side: 'allied', name: 'Phoenician squadron (Sidon, Aradus, Byblos)', division: 'Phoenician ships', type: 'ship', cols: 3, rows: 2, h: SH(50), offmap: true, x: 1500, y: 20, facing: So, confidence: 'arrian', note: 'About eighty Phoenician ships came over to Alexander from the Persian fleet (Arrian 2.20.1).' }),
    F({ id: 'cyp', side: 'allied', name: 'Cypriot squadron', division: 'Cypriot ships', type: 'ship', cols: 3, rows: 2, h: SH(50), offmap: true, x: 300, y: 20, facing: So, confidence: 'arrian', note: 'The kings of Cyprus brought about a hundred and twenty ships (Arrian 2.20.3).' }),
    F({ id: 'others', side: 'allied', name: 'Ships of Rhodes, Soli, Mallus and Lycia', division: 'Rhodes, Lycia…', type: 'ship', cols: 2, rows: 1, h: SH(46), offmap: true, x: 900, y: 20, facing: So, confidence: 'arrian' }),
    F({ id: 'alexfleet', side: 'allied', name: 'Alexander’s own ships', division: 'Alexander’s ships', type: 'ship', cols: 3, rows: 1, h: SH(48), hidden: true, offmap: true, x: 1250, y: 1330, facing: N, confidence: 'arrian', note: 'The quinqueremes and the five triremes manned first, with which Alexander rowed round the island (Arrian 2.22.3).' }),
    F({ id: 'ram1', side: 'allied', name: 'Engine ships', division: 'Engine ships', type: 'ship', sheet: 'ship-ram-pair', cols: 1, rows: 1, h: SH(62), hidden: true, offmap: true, x: 1300, y: 1050, facing: Wd, confidence: 'arrian', note: 'Engines mounted on horse transports and slow triremes, lashed together (Arrian 2.21.1).' }),
    F({ id: 'ram2', side: 'allied', name: 'Engine ships', division: 'Engine ships', type: 'ship', sheet: 'ship-ram-pair', cols: 1, rows: 1, h: SH(62), hidden: true, offmap: true, x: 1300, y: 700, facing: Wd, confidence: 'arrian' }),
    F({ id: 'bships', side: 'allied', name: 'Bridge ships: Admetus and Coenus', division: 'Bridge ships', type: 'ship', cols: 2, rows: 1, h: SH(54), hidden: true, offmap: true, x: 1300, y: 1450, facing: Wd, confidence: 'arrian', note: 'Two ships with bridges: the hypaspists under Admetus on one, the battalion of Coenus on the other (Arrian 2.23.2).' }),
    // Tyre: the walls, the fleet, the city
    F({ id: 'wallE', side: 'french', name: 'Defenders of the east wall', division: 'East wall', type: 'archers', sheet: 'tyre-wall-defenders', cols: 3, rows: 1, h: 34, x: WALLE.x, y: WALLE.y, facing: E, confidence: 'established', note: 'Arrian: about a hundred and fifty feet high on the side facing the mainland.' }),
    F({ id: 'slingers', side: 'french', name: 'Tyrian slingers', division: 'Slingers', type: 'archers', sheet: 'tyre-slinger', cols: 4, rows: 1, x: 1000, y: 760, facing: E }),
    F({ id: 'archersN', side: 'french', name: 'Tyrian archers', division: 'Archers', type: 'archers', sheet: 'tyre-archer', cols: 4, rows: 1, x: 1000, y: 990, facing: E }),
    F({ id: 'wallS', side: 'french', name: 'Defenders of the south wall', division: 'South wall', type: 'archers', sheet: 'tyre-wall-defenders', cols: 3, rows: 1, h: 34, x: WALLS.x, y: WALLS.y, facing: PI / 4, confidence: 'reconstruction' }),
    F({ id: 'spear', side: 'french', name: 'Tyrian citizen-soldiers', division: 'Citizen-soldiers', type: 'infantry', cols: 5, rows: 2, x: 870, y: 1050, facing: E, note: 'The men of the city, who stayed to fight when the women, children and old people were sent away (Diodorus).' }),
    F({ id: 'tfN', side: 'french', name: 'Tyrian triremes (north harbour)', division: 'Tyrian ships', type: 'ship', cols: 3, rows: 1, h: SH(46), x: NHARB.x, y: NHARB.y, facing: E, confidence: 'diodorus', note: 'Diodorus gives Tyre eighty triremes.' }),
    F({ id: 'tfS', side: 'french', name: 'Tyrian triremes (south harbour)', division: 'Tyrian ships', type: 'ship', cols: 3, rows: 1, h: SH(46), x: SHARB.x, y: SHARB.y, facing: E }),
    F({ id: 'fireship', side: 'french', name: 'The fireship', division: 'Fireship', type: 'ship', sheet: 'ship-fireship-east', cols: 1, rows: 1, h: SH(56), hidden: true, offmap: true, x: 1080, y: 760, facing: E, confidence: 'arrian', note: 'An old horse transport packed with dry wood, pitch and sulphur, its stern weighed down (Arrian 2.19).' }),
    F({ id: 'sortie', side: 'french', name: 'The thirteen ships of the sortie', division: 'Sortie', type: 'ship', cols: 4, rows: 1, h: SH(46), hidden: true, offmap: true, x: NHARB.x, y: NHARB.y + 10, facing: E, confidence: 'arrian', note: 'Three quinqueremes, three quadriremes and seven triremes, with the best crews (Arrian 2.21.8–9).' })
  ];
  S.leaders = [
    { id: 'alexander', name: 'Alexander', side: 'allied', x: 1760, y: 930, facing: Wd },
    { id: 'azemilcus', name: 'King Azemilcus', side: 'french', x: TEMPLE.x + 10, y: TEMPLE.y + 40, facing: So, hidden: true, noAttack: true }
  ];

  const EV = S.events; EV.forEach((e, i) => { e.clipNo = i + 1; e.orders = e.orders || []; e.t = i * 14; });
  const set = (i, o) => Object.assign(EV[i], o);
  const R = S.record;
  // 1. The mole begins: from the beach, the builders carry stones out into the shallows
  const ART = (file, caption) => ({ at: 0, file, caption, credit: 'AI-generated (ChatGPT) for this project: an artist’s impression, not evidence.' });
  set(0, { media: ART('art-mole-carts.jpg', 'Ox-carts bring stones from the ruins of Old Tyre and timber from the mountains out along the new mole. Diodorus says the stones came from Old Tyre; Curtius adds timber from Mount Lebanon. No writer says how they were carried: carts are our best guess.'), trenches: 'mole-1.png', zoom: 'fit', markers: [ { x: H1 + 30, y: MY - 40, label: 'the mole begins', side: 'allied' }, { x: 2200, y: 640, label: 'Old Tyre (place approximate)' } ], orders: [
    { id: 'workers', to: head(H1), speed: 20, state: 'move' }, { id: 'workers2', to: { x: 1680, y: MY + 30 }, speed: 18, state: 'move' },
    { leader: 'alexander', to: { x: 1700, y: 830 }, speed: 20 } ] });
  // 2. The sea fights back: Tyrian triremes row along the mole; the towers go up at its head
  set(1, { photo: { file: 'art-towers.jpg', at: 20, secs: 10, caption: 'Two towers at the head of the mole, covered with animal hides, with engines on top to shoot back (Arrian)', credit: 'Artist’s impression, AI-generated for this page; not evidence.' }, media: ART('art-mole-builders.jpg', 'Builders carry stones and baskets of earth and drive stakes into the mud, while Tyrian archers shoot at them from boats. Arrian says the stakes went in easily and the mud held the stones together.'), trenches: 'mole-2.png', focus: { x: 1380, y: MY }, zoom: 1.5, markers: [ { x: H2 + 30, y: MY - 70, label: 'two towers, covered with hides', side: 'allied' } ], orders: [
    { id: 'workers', to: head(H2), speed: 24, state: 'move' }, { obj: 'tower1', visible: true, delay: 3 }, { obj: 'tower2', visible: true, delay: 3.5 },
    { id: 'engines', visible: true, at: { x: H2 + 80, y: MY }, state: 'attack', delay: 4 },
    { id: 'tfN', to: { x: 1380, y: MY - 80 }, via: [NMOUTH, { x: 1200, y: 700 }], speed: 60, state: 'attack' },
    { id: 'tfS', to: { x: 1400, y: MY + 80 }, via: [SMOUTH, { x: 1200, y: 1040 }], speed: 60, state: 'attack' },
    { id: 'workers', strengthTo: 82, over: 10 }, { id: 'wallE', state: 'attack' }, { id: 'slingers', state: 'attack' } ] });
  // 3. The fireship: towed in by triremes, set alight, driven against the head of the mole; both towers burn
  set(2, { focus: { x: 1320, y: MY }, zoom: 1.6, hold: 14, markers: [ { x: H2 + 20, y: MY - 80, label: 'the fireship strikes the mole', side: 'french' } ], orders: [
    { id: 'tfN', to: { x: 1180, y: 760 }, speed: 50, state: 'move' }, { id: 'tfS', to: { x: 1220, y: 990 }, speed: 50, state: 'move' },
    { id: 'fireship', visible: true, at: { x: 1080, y: MY }, to: { x: H2 - 20, y: MY }, speed: 30, state: 'move' },
    { id: 'fireship', gone: true, delay: 8 }, { obj: 'fire3', visible: true, anim: { cells: [...Array(16).keys()], fps: 1.6, mode: 'once' }, delay: 7.5 },
    { obj: 'fire1', visible: true, anim: { cells: [...Array(16).keys()], fps: 1.5, mode: 'once' }, delay: 8.5 }, { obj: 'fire2', visible: true, anim: { cells: [...Array(16).keys()], fps: 1.5, mode: 'once' }, delay: 9 },
    { obj: 'tower1', visible: false, delay: 11 }, { obj: 'tower2', visible: false, delay: 11.5 }, { id: 'engines', strengthTo: 0, over: 4, delay: 9 },
    { id: 'workers', to: { x: 1560, y: MY }, speed: 30, state: 'move', delay: 6 }, { id: 'workers', strengthTo: 70, over: 6, delay: 8 },
    { id: 'tfN', to: { x: H2 - 50, y: MY - 50 }, speed: 45, state: 'attack', delay: 10 }, { id: 'tfS', to: { x: H2 - 50, y: MY + 55 }, speed: 45, state: 'attack', delay: 10 } ] });
  // 4. The storm (Diodorus's telling): a north-west wind breaks the mole; whole trees brought down to rebuild it
  set(3, { trenches: 'mole-1.png', rain: .9, zoom: 'fit', markers: [ { x: 1500, y: MY - 60, label: 'Diodorus: a storm smashes much of the mole', side: 'allied' } ], orders: [
    { obj: 'fire1', visible: false }, { obj: 'fire2', visible: false }, { obj: 'fire3', visible: false },
    { id: 'tfN', to: NHARB, via: [NMOUTH], speed: 50, state: 'move' }, { id: 'tfS', to: SHARB, via: [SMOUTH], speed: 50, state: 'move' },
    { id: 'workers', to: { x: 1700, y: MY + 10 }, speed: 30, state: 'move' } ] });
  // 5. The fleet changes sides: Alexander goes to Sidon; Phoenician and Cypriot ships come to him (seen arriving from the north)
  set(4, { trenches: 'mole-3.png', zoom: 'fit', markers: [ { x: 1500, y: 160, label: 'from Sidon: the Phoenician ships', side: 'allied' }, { x: 420, y: 160, label: 'the Cypriot kings', side: 'allied' } ], orders: [
    { leader: 'alexander', to: { x: 2250, y: 120 }, speed: 60 }, { leader: 'alexander', visible: false, delay: 8 },
    { id: 'phoen', visible: true, at: { x: 1700, y: 20 }, to: { x: 1700, y: 230 }, speed: 30, state: 'move', delay: 4 },
    { id: 'cyp', visible: true, at: { x: 200, y: 20 }, to: { x: 420, y: 230 }, speed: 30, state: 'move', delay: 8 },
    { id: 'others', visible: true, at: { x: 1100, y: 20 }, to: { x: 1150, y: 200 }, speed: 28, state: 'move', delay: 6 },
    { id: 'workers', to: head(H2), speed: 24, state: 'move' }, { id: 'workers', strengthTo: 90, over: 10 } ] });
  // 6. Ten days in the mountains: Alexander rides off with cavalry, archers, Agrianians and hypaspists; the mercenaries arrive
  set(5, { zoom: 'fit', markers: [ { x: 2280, y: 1000, label: 'to the Antilebanon mountains ▶', side: 'allied' } ], orders: [
    { id: 'cav', to: { x: 2380, y: 980 }, speed: 45, state: 'move' }, { id: 'agr', to: { x: 2380, y: 1080 }, speed: 30, state: 'move' }, { id: 'hyp', to: { x: 2380, y: 1150 }, speed: 30, state: 'move' },
    { id: 'archers', to: { x: 2380, y: 1030 }, speed: 30, state: 'move' },
    { id: 'cav', gone: true, delay: 9 }, { id: 'agr', gone: true, delay: 11 }, { id: 'hyp', gone: true, delay: 11 }, { id: 'archers', gone: true, delay: 11 },
    { id: 'mercs', visible: true, at: { x: 2380, y: 420 }, to: { x: 2100, y: 640 }, speed: 30, state: 'move', delay: 6 } ] });
  // 7. The blockade: the fleet sails down in battle order; the Tyrians stay in harbour; three Tyrian ships rammed at the north harbour
  set(6, { focus: { x: 1150, y: 760 }, zoom: 1.05, hold: 14, markers: [ { x: 1110, y: 560, label: 'three Tyrian ships rammed', side: 'allied' } ], orders: [
    { leader: 'alexander', visible: true, at: { x: 1700, y: 230 } , to: { x: 1760, y: 900 }, speed: 70 },
    { id: 'cav', visible: true, at: { x: 2300, y: 980 }, to: { x: 2150, y: 880 }, speed: 40, state: 'move' }, { id: 'agr', visible: true, at: { x: 2300, y: 1180 }, to: { x: 2060, y: 1180 }, speed: 30, state: 'move' },
    { id: 'hyp', visible: true, at: { x: 2300, y: 1060 }, to: { x: 2040, y: 1060 }, speed: 30, state: 'move' }, { id: 'archers', visible: true, at: { x: 2300, y: 760 }, to: { x: 1780, y: 760 }, speed: 30, state: 'move' },
    { id: 'tfN', to: { x: 1020, y: 610 }, speed: 30, state: 'move' },
    { id: 'phoen', to: { x: 1120, y: 470 }, speed: 50, state: 'attack' },
    { obj: 'tN1', visible: true, anim: sinkAnim, delay: 6 }, { obj: 'tN2', visible: true, anim: sinkAnim, delay: 6.5 }, { obj: 'tN3', visible: true, anim: sinkAnim, delay: 7 },
    { id: 'tfN', strengthTo: 40, over: 2, delay: 6 },
    { id: 'phoen', to: PHO, via: [{ x: 1500, y: 500 }, { x: 1500, y: 1100 }], speed: 55, state: 'move', delay: 11 },
    { id: 'cyp', to: CYP, via: [{ x: 700, y: 330 }], speed: 50, state: 'move', delay: 4 }, { id: 'others', to: { x: 450, y: 700 }, speed: 40, state: 'move', delay: 4 },
    { obj: 'tN1', visible: false, delay: 14 }, { obj: 'tN2', visible: false, delay: 14 }, { obj: 'tN3', visible: false, delay: 14 } ] });
  // 8. Stones, divers and chains: the engine ships come up to the walls; the stones in the water are hauled clear
  set(7, { trenches: 'mole-4.png', focus: { x: 1150, y: MY }, zoom: 1.35, markers: [ { x: 1080, y: 760, label: 'stones in the water at the foot of the walls' }, { x: 1110, y: 990, label: 'divers cut the anchor ropes', side: 'french' } ], orders: [
    { id: 'ram1', visible: true, at: { x: 1400, y: 1060 }, to: { x: 1100, y: 980 }, speed: 25, state: 'move' }, { id: 'ram2', visible: true, at: { x: 1400, y: 700 }, to: { x: 1100, y: 760 }, speed: 25, state: 'move' },
    { id: 'workers', to: head(H4), speed: 24, state: 'move' }, { id: 'engines', visible: true, at: { x: H4 + 90, y: MY }, strength: 100, state: 'attack' },
    { obj: 'tower3', visible: true, delay: 2 }, { obj: 'tower4', visible: true, delay: 2.5 },
    { id: 'tfS', to: { x: 1080, y: 1010 }, via: [SMOUTH], speed: 45, state: 'attack', delay: 3 }, { id: 'tfS', to: SHARB, via: [SMOUTH], speed: 45, state: 'move', delay: 10 } ] });
  // 9. Machines against machines: the walls answer with hot sand, nets and hooks
  set(8, { focus: { x: 1080, y: MY }, zoom: 1.6, markers: [ { x: 990, y: 800, label: 'hot sand, nets and hooks', side: 'french' } ], orders: [
    { id: 'wallE', state: 'attack' }, { id: 'slingers', state: 'attack' }, { id: 'archersN', state: 'attack' },
    { id: 'engines', state: 'attack' }, { id: 'ram1', state: 'attack' }, { id: 'ram2', state: 'attack' },
    { id: 'ram1', strengthTo: 75, over: 10 }, { id: 'engines', strengthTo: 70, over: 10 }, { id: 'wallE', strengthTo: 80, over: 10 } ] });
  // 10. The midday sortie: thirteen Tyrian ships slip out of the north harbour and fall on the Cypriots at anchor; Alexander rows round
  set(9, { focus: { x: 1000, y: 560 }, zoom: 1.2, hold: 16, markers: [ { x: 1200, y: 430, label: 'the Cypriot ships at anchor', side: 'allied' } ], orders: [
    { id: 'sortie', visible: true, at: NHARB, to: { x: 1150, y: 500 }, via: [NMOUTH], speed: 55, state: 'attack' },
    { obj: 'cypA', visible: true, anim: sinkAnim, delay: 4 }, { obj: 'cypB', visible: true, anim: sinkAnim, delay: 4.6 }, { obj: 'cypC', visible: true, anim: sinkAnim, delay: 5.2 },
    { id: 'cyp', strengthTo: 60, over: 2, delay: 4 }, { id: 'cyp', to: { x: 1350, y: 430 }, speed: 30, state: 'move', delay: 5 },
    { id: 'alexfleet', visible: true, at: { x: 1250, y: 1330 }, to: { x: 1150, y: 600 }, via: [{ x: 700, y: 1600 }, { x: 330, y: 1100 }, { x: 420, y: 380 }, { x: 900, y: 380 }], speed: 110, state: 'attack', delay: 7 },
    { leader: 'alexander', to: { x: 1250, y: 1300 }, speed: 80, delay: 5 }, { leader: 'alexander', visible: false, delay: 7 },
    { id: 'sortie', to: NHARB, via: [NMOUTH], speed: 40, state: 'move', delay: 13 }, { id: 'sortie', strengthTo: 25, over: 4, delay: 13 },
    { obj: 'tX1', visible: true, anim: sinkAnim, delay: 14 }, { obj: 'tX2', visible: true, anim: sinkAnim, delay: 14.5 } ] });
  // 11. The first breach: rams on every side; the south wall gives way; the first attack is beaten back
  set(10, { trenches: 'mole-5.png', focus: { x: 950, y: 1250 }, zoom: 1.3, markers: [ Object.assign({ label: 'part of the south wall falls', side: 'allied' }, BREACH) ], orders: [
    { obj: 'cypA', visible: false }, { obj: 'cypB', visible: false }, { obj: 'cypC', visible: false }, { obj: 'tX1', visible: false }, { obj: 'tX2', visible: false },
    { leader: 'alexander', visible: true, at: { x: 1760, y: 930 } },
    { id: 'sortie', gone: true }, { id: 'alexfleet', to: { x: 1250, y: 1330 }, via: [{ x: 1500, y: 700 }, { x: 1500, y: 1250 }], speed: 60, state: 'move' },
    { id: 'ram1', to: { x: 950, y: 1400 }, via: [{ x: 1150, y: 1250 }], speed: 25, state: 'attack' }, { id: 'ram2', to: { x: 1060, y: MY - 60 }, speed: 20, state: 'attack' },
    { id: 'workers', to: head(H5 + 20), speed: 24, state: 'move' }, { id: 'engines', at: { x: H5 + 120, y: MY }, state: 'attack' },
    { id: 'wallS', strengthTo: 65, over: 8, state: 'attack' } ] });
  // 12. The final assault: calm weather; the rams open a wide breach; the bridges go down; Admetus first onto the wall
  set(11, { focus: { x: 930, y: 1320 }, zoom: 1.7, hold: 16, markers: [ { x: 900, y: 1290, label: 'Admetus, first onto the wall', side: 'allied' } ], orders: [
    { id: 'bships', visible: true, at: { x: 1350, y: 1420 }, to: { x: 1000, y: 1310 }, speed: 45, state: 'move' },
    { id: 'bships', gone: true, delay: 8 }, { obj: 'bridgeA', visible: true, anim: { cells: [12, 13, 14, 15], fps: 1.2, mode: 'once' }, delay: 8 }, { obj: 'bridgeB', visible: true, anim: { cells: [12, 13, 14, 15], fps: 1.2, mode: 'once' }, delay: 8.3 },
    { id: 'hyp', visible: true, at: { x: 925, y: 1325 }, to: { x: 840, y: 1270 }, speed: 18, state: 'attack', delay: 11.5 }, { leader: 'alexander', visible: true, at: { x: 950, y: 1330 }, to: { x: 860, y: 1290 }, speed: 18, delay: 12.5 },
    { id: 'wallS', strengthTo: 0, over: 5, delay: 11.5 }, { id: 'hyp', strengthTo: 92, over: 4, delay: 12 },
    { id: 'phoen', to: { x: 1120, y: 1200 }, speed: 40, state: 'attack' }, { id: 'cyp', to: { x: 1120, y: 560 }, speed: 40, state: 'attack' } ] });
  // 13. The harbours are forced: the Phoenicians break the booms of the south harbour; the Cypriots sail into the north one
  set(12, { media: R['record-egyptian-harbour-columns-2019.jpg'], focus: { x: 1000, y: 900 }, zoom: 1.0, markers: [ Object.assign({ label: 'the booms broken', side: 'allied' }, { x: SMOUTH.x, y: SMOUTH.y - 30 }), Object.assign({ label: 'no boom: the Cypriots sail in', side: 'allied' }, { x: NMOUTH.x, y: NMOUTH.y - 40 }) ], orders: [
    { id: 'phoen', to: { x: 960, y: 1150 }, via: [SMOUTH], speed: 35, state: 'attack' }, { id: 'tfS', strengthTo: 10, over: 5 },
    { obj: 'tS1', visible: true, anim: sinkAnim, delay: 4 }, { obj: 'tS2', visible: true, anim: sinkAnim, delay: 4.6 },
    { id: 'cyp', to: { x: 960, y: 640 }, via: [NMOUTH], speed: 35, state: 'attack' }, { id: 'tfN', strengthTo: 0, over: 5 }, { id: 'sortie', gone: true } ] });
  // 14. Inside the city: the Tyrians fall back from the walls and make a stand at the shrine of Agenor
  set(13, { focus: { x: 780, y: 1100 }, zoom: 1.5, markers: [ Object.assign({ label: 'the shrine of Agenor (place unknown)', side: 'french' }, AGENOR) ], orders: [
    { obj: 'tS1', visible: false }, { obj: 'tS2', visible: false },
    { id: 'spear', to: AGENOR, speed: 20, state: 'attack' }, { id: 'archersN', to: { x: 760, y: 1120 }, speed: 20, state: 'attack' }, { id: 'slingers', to: { x: 730, y: 1080 }, speed: 20, state: 'attack' },
    { id: 'wallE', strengthTo: 0, over: 4 },
    { id: 'hyp', to: { x: 740, y: 1230 }, speed: 22, state: 'attack' }, { id: 'phalanx', visible: true, at: { x: 900, y: 1300 }, to: { x: 760, y: 1300 }, speed: 18, state: 'attack', delay: 3 },
    { id: 'spear', strengthTo: 15, over: 12, delay: 2 }, { id: 'archersN', strengthTo: 10, over: 12, delay: 2 }, { id: 'slingers', strengthTo: 10, over: 12, delay: 2 },
    { leader: 'alexander', to: { x: 800, y: 1250 }, speed: 18 } ] });
  // 15. The sanctuary: the king, the leading men and the Carthaginian envoys in the temple of Melqart
  set(14, { focus: { x: 790, y: 980 }, zoom: 1.8, markers: [ Object.assign({ label: 'the temple of Melqart (Heracles)' }, { x: TEMPLE.x, y: TEMPLE.y - 60 }) ], orders: [
    { obj: 'civ1', visible: true, at: { x: 640, y: 960 } }, { obj: 'civ2', visible: true, at: { x: 790, y: 860 } },
    { leader: 'azemilcus', visible: true }, { leader: 'alexander', to: { x: 840, y: 1060 }, speed: 18 },
    { id: 'spear', state: 'hold' }, { id: 'hyp', to: { x: 820, y: 1100 }, speed: 18, state: 'move' }, { id: 'phalanx', state: 'hold' } ] });
  EV[14].end = false;

  // Wider maps (engine: S.altMaps; a slide or chapter's `altMap`) when the narrator talks about other cities. Places from
  // their latitude and longitude (images/layout/maps.json): campaign 29.4–37.9 N, 26.9–40.5 E; coast 32.75–35.25 N, 34.2–38.2 E.
  S.altMaps = { campaign: 'terrain-campaign.jpg', coast: 'terrain-coast.jpg' };
  const CM = { issus: { x: 1634, y: 224 }, aradus: { x: 1579, y: 645 }, byblos: { x: 1542, y: 801 }, sidon: { x: 1493, y: 918 }, tyre: { x: 1462, y: 980 },
    gaza: { x: 1334, y: 1355 }, egypt: { x: 994, y: 1453 }, cyprus: { x: 1234, y: 576 }, rhodes: { x: 233, y: 311 }, lycia: { x: 476, y: 307 }, soli: { x: 1347, y: 244 }, mallus: { x: 1512, y: 244 } };
  const CO = { aradus: { x: 990, y: 284 }, byblos: { x: 863, y: 814 }, sidon: { x: 698, y: 1215 }, tyre: { x: 595, y: 1425 }, antileb: { x: 1104, y: 1116 }, damascus: { x: 1248, y: 1253 } };
  const ring = (p, label, r, o) => ({ ring: Object.assign({}, p, { label, r: r || 40 }, o || {}) });
  // Intro 2, "After Issus": the eastern Mediterranean, the march down the coast, the cities as they are named
  Object.assign(S.intro[1], { altMap: 'campaign', focus: { x: 1420, y: 760 }, zoom: .95, cues: [
    Object.assign({ on: 'at Issus' }, ring(CM.issus, 'Issus, 333 BCE', 45)),
    { on: 'marched south', arrow: { pts: [[1634, 250], [1600, 420], [1585, 620], [1545, 800], [1495, 915]], label: 'Alexander marches south', col: '#c0392b' } },
    Object.assign({ on: 'Aradus did' }, ring(CM.aradus, 'Aradus', 30)), Object.assign({ on: 'and Byblos' }, ring(CM.byblos, 'Byblos', 30)),
    Object.assign({ on: 'people of Sidon' }, ring(CM.sidon, 'Sidon', 30)), Object.assign({ on: 'Tyre also sent' }, ring(CM.tyre, 'Tyre', 34, { lx: -70 })),
    Object.assign({ on: 'Cypriot ships' }, ring(CM.cyprus, 'Cyprus', 60)),
    { on: 'road to Egypt', arrow: { pts: [[1455, 1010], [1400, 1200], [1330, 1360], [1000, 1450]], label: 'the road to Egypt', col: '#e9c77a' } } ] });
  // Chapter 5, the fleet changes sides: where the ships came from
  Object.assign(EV[4], { altMap: 'campaign', zoom: 'fit', markers: [ Object.assign({ label: 'Sidon: Alexander gathers the fleet', side: 'allied' }, CM.sidon), Object.assign({ label: 'Aradus' }, CM.aradus), Object.assign({ label: 'Byblos' }, CM.byblos),
    Object.assign({ label: 'Rhodes: ten ships' }, CM.rhodes), Object.assign({ label: 'Lycia: ten' }, CM.lycia), Object.assign({ label: 'Soli: three' }, CM.soli), Object.assign({ label: 'Mallus: three' }, CM.mallus),
    Object.assign({ label: 'Cyprus: about 120' }, CM.cyprus), Object.assign({ label: 'Tyre', side: 'french' }, CM.tyre) ] });
  // Chapter 6, ten days in the mountains: Sidon and the Antilebanon
  Object.assign(EV[5], { altMap: 'coast', zoom: 'fit', markers: [ Object.assign({ label: 'Sidon', side: 'allied' }, CO.sidon), Object.assign({ label: 'the Antilebanon mountains (area approximate)', side: 'allied' }, CO.antileb),
    Object.assign({ label: 'Tyre, still besieged', side: 'french' }, CO.tyre) ] });

  // The introduction's map: the island, the harbours and the temple the narrator names
  Object.assign(S.intro[2], { markers: [ Object.assign({ label: 'harbour toward Sidon' }, NHARB), Object.assign({ label: 'harbour toward Egypt' }, SHARB), Object.assign({ label: 'temple of Melqart (place approximate)' }, { x: TEMPLE.x, y: TEMPLE.y - 60 }) ], focus: { x: 1100, y: 900 }, zoom: 1.0 });
  Object.assign(S.intro[4], { markers: [ Object.assign({ label: 'Alexander’s army, on the mainland', side: 'allied' }, CAMP), Object.assign({ label: 'Tyre: walls and fleet', side: 'french' }, { x: 800, y: 760 }) ] });

  S.units = [
    { side: 'allied', type: 'infantry', sheet: 'macedonian-spearman', portrait: 'macedonian-spearman', name: 'Macedonian phalanx', desc: 'Infantry with the long pike, the sarissa, in deep blocks.', tag: 'established',
      lines: [ { text: 'At Tyre they fought less as a phalanx than as builders, guards and, at the end, as storming parties from the ships.', tag: 'arrian' } ] },
    { side: 'allied', type: 'infantry', sheet: 'mole-workers', portrait: false, name: 'The builders of the mole', desc: 'Soldiers and labourers carrying stones, earth and timber.', tag: 'arrian',
      lines: [ { text: 'Diodorus says they pulled down Old Tyre for its stones and brought people in from the nearby towns; Arrian, that the work near the shore went quickly.', tag: 'diodorus' } ] },
    { side: 'allied', type: 'ship', sheet: 'ship-allied-quinquereme', portrait: false, name: 'The allied fleet', desc: 'Ships of Sidon, Aradus, Byblos, Cyprus, Rhodes, Soli, Mallus and Lycia.', tag: 'arrian',
      lines: [ { text: 'Arrian’s numbers come to well over two hundred ships. Many of their crews were Phoenician, like the Tyrians themselves.', tag: 'arrian' } ] },
    { side: 'allied', type: 'archers', sheet: 'siege-catapult', portrait: false, name: 'Torsion engines', desc: 'Giant crossbows of wood and twisted rope that shot bolts and stones.', tag: 'established',
      lines: [ { text: 'Mounted on the towers at the head of the mole, and later on ships brought up to the walls (Arrian 2.21).', tag: 'arrian' } ] },
    { side: 'french', type: 'infantry', sheet: 'tyre-spearman', portrait: false, name: 'Tyrian citizen-soldiers', desc: 'The men of a Phoenician trading city, defending their own walls.', tag: 'established',
      lines: [ { text: 'How many defended Tyre, no ancient writer reliably says.', tag: 'established' } ] },
    { side: 'french', type: 'archers', sheet: 'tyre-wall-defenders', portrait: false, name: 'Defenders of the walls', desc: 'Archers, slingers and men with engines, nets, hooks and heated sand.', tag: 'diodorus',
      lines: [ { text: 'Diodorus describes their devices: spinning wheels, soft padding, nets, hooked tridents, blades on poles, and red-hot sand.', tag: 'diodorus' } ] },
    { side: 'french', type: 'ship', sheet: 'ship-tyrian-trireme', portrait: false, name: 'The Tyrian fleet', desc: 'Triremes, quadriremes and quinqueremes of the city’s two harbours.', tag: 'diodorus',
      lines: [ { text: 'Diodorus gives Tyre eighty triremes. Until Alexander gathered a fleet, Arrian says, the Tyrians ruled the sea.', tag: 'arrian' } ] },
    { side: 'french', type: 'infantry', sheet: 'leader-azemilcus', portrait: false, name: 'King Azemilcus', desc: 'King of Tyre, at sea with the Persian fleet when the siege began.', tag: 'arrian',
      lines: [ { text: 'He was among those who took refuge in the temple at the end. How or when he came home, no source says. No portrait of him survives: the figure is an artist’s reconstruction.', tag: 'arrian' } ] }
  ];
  const C = (title, intro, items) => ({ title, intro, items: items.map(([ref, note]) => ({ ref, note })) });
  const AR = ['Arrian, Anabasis of Alexander, Book II, 15–25', 'The main track of this page: the order of events, the fleet, the sortie, the breach and the final assault.'],
        DI = ['Diodorus of Sicily, Library of History, Book XVII, 40–46', 'The storm, the Tyrians’ devices, the first breach, the street fighting and his numbers.'],
        CU = ['Quintus Curtius Rufus, History of Alexander, Book IV, 2–4', 'The mainland temple, the heralds, Carthage, the Sidonian rescue.'],
        PL = ['Plutarch, Life of Alexander, 24–25', 'The dream, the statue, Lysimachus, the twenty-eighth day.'];
  S.citations = {
    established: C('Established', 'The ancient writers agree, or it is secure modern knowledge.', [AR, DI, CU, PL]),
    arrian: C('Arrian', 'Arrian wrote in the 2nd century CE, from earlier histories now lost.', [AR]),
    diodorus: C('Diodorus', 'Diodorus wrote in the 1st century BCE.', [DI]),
    curtius: C('Curtius', 'Curtius probably wrote in the 1st century CE.', [CU]),
    plutarch: C('Plutarch', 'Plutarch wrote around 100 CE.', [PL]),
    geology: C('Geology', 'The modern study of the coast.', [['N. Brocard et al., Quaternary Science Reviews 324 (2024)', 'The island’s shape in 332 BCE, the sandy bank under the strait, and how the isthmus grew against the mole over centuries.']]),
    disputed: C('Disputed', 'The writers disagree.', [AR, DI, CU, PL]),
    estimate: C('Estimate', 'Rounded or converted numbers.', [['Battles of History', 'Stades, plethra and fathoms converted into metres.']]),
    reconstruction: C('Reconstruction', 'Our own placing on the map.', [['Battles of History', 'Every ship and soldier position, the mole’s stages, and the exact line of walls and harbours. See TYRE-MAP-UNCERTAINTIES.md.']])
  };
  S.sources = [
    { title: 'Arrian, Anabasis of Alexander, Book II (2nd century CE)', note: 'Read in Greek (Perseus) for the details checked in draft 2 of the narration.' },
    { title: 'Diodorus of Sicily, Library of History, Book XVII (1st century BCE)', note: 'Read in Greek (Perseus).' },
    { title: 'Quintus Curtius Rufus, History of Alexander, Book IV', note: 'Through our research dossier (TYRE-ROUND-2-REVISED.md, Part F).' },
    { title: 'Plutarch, Life of Alexander, 24–25', note: '' },
    { title: 'N. Brocard et al., “Tyre’s coastline”, Quaternary Science Reviews 324 (2024)', note: 'The shape of the island and the strait; the map follows it.' },
    { title: 'Pictures', note: 'See images/README.md for every picture and its licence. The maps and sprites were painted for this project (AI-generated).' }
  ];
  S.library = [];
})();
