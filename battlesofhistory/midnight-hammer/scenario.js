/*
  Historical Scenario File — Operation Midnight Hammer, 21–22 June 2025
  -----------------------------------------------------------------
  The narrated introduction (`intro`), the chapters (`events`) and the debrief (`outcome`), word for word from
  NARRATION-SCRIPT.md. This part is written by tools/make-scenario-text.py; the maps, armies and moves are set in
  the block below the marker line.
*/
window.MIDNIGHTHAMMER_SCENARIO = window.MIDNIGHTHAMMER_SCENARIO || {};
Object.assign(window.MIDNIGHTHAMMER_SCENARIO, {
  "id": "midnight-hammer",
  "title": "Operation Midnight Hammer",
  "date": "21–22 June 2025",
  "place": "Fordow, Natanz and Isfahan, Iran",
  "tagline": "United States air and missile strikes on three Iranian nuclear sites, during the war between Israel and Iran",
  "welcome": "Welcome to Battles of History. Today we are learning about Operation Midnight Hammer: the American air strike on three nuclear sites in Iran, on the night of the twenty-first to the twenty-second of June 2025. The bombers flew from Missouri and back, using some of the largest conventional bombs in the American arsenal, against a site built inside a mountain. Reaching the targets was one question. What the bombs destroyed, and what the strike changed, are others, and they are still argued about. We will tell you what is known, who says what, and what is still not known.",
  "intro": [
    {
      "title": "OPERATION MIDNIGHT HAMMER",
      "scriptMap": "",
      "lines": [
        {
          "text": "In the early hours of the twenty-second of June 2025, Iranian time, American B-2 bombers struck Iran's uranium enrichment sites at Fordow and Natanz. A submarine fired cruise missiles at a third site, at Isfahan.",
          "tag": [
            "established",
            "us-official"
          ]
        },
        {
          "text": "It happened during a war between Israel and Iran, which had begun nine days earlier.",
          "tag": "established"
        },
        {
          "text": "The bombers returned home safely. The United States called the strike a success. International inspectors could not see what had happened underground, and estimates of the damage differed.",
          "tag": [
            "us-official",
            "iaea",
            "disputed"
          ]
        },
        {
          "text": "The next day Iran fired missiles at an American base in Qatar. Hours later, a ceasefire between Israel and Iran was announced.",
          "tag": "established"
        }
      ]
    },
    {
      "title": "Enrichment is not a bomb",
      "scriptMap": "",
      "lines": [
        {
          "text": "Enrichment raises the share of uranium two thirty-five. Most nuclear power reactors use uranium enriched to much lower levels. Enriched uranium is a material. A nuclear weapon is a separate device.",
          "tag": "established"
        },
        {
          "text": "Fordow and Natanz were uranium enrichment plants.",
          "tag": "established"
        },
        {
          "text": "The United States used conventional bombs in this operation.",
          "tag": "established"
        }
      ]
    },
    {
      "title": "Who is who",
      "scriptMap": "",
      "lines": [
        {
          "text": "Iran: the Supreme Leader, Ali Khamenei; the President, Masoud Pezeshkian; the Foreign Minister, Abbas Araghchi.",
          "tag": "established"
        },
        {
          "text": "The United States: President Donald Trump; Defense Secretary Pete Hegseth; General Dan Caine, the chairman of the Joint Chiefs of Staff; and General Erik Kurilla, who commanded American forces in the Middle East.",
          "tag": "established"
        },
        {
          "text": "On this page Iran is red and the United States is blue.",
          "tag": "page"
        },
        {
          "text": "The International Atomic Energy Agency, or IAEA, inspects nuclear sites and reports what it can verify. Rafael Grossi was its director general.",
          "tag": "established"
        }
      ]
    },
    {
      "title": "How this page tells it",
      "scriptMap": "",
      "lines": [
        {
          "text": "Each line is tagged with where it comes from. What a government says is that government's claim.",
          "tag": "page"
        },
        {
          "text": "The flights are drawn as simple arrows. The real routes were secret, and are not known in detail.",
          "tag": [
            "page",
            "reconstruction"
          ]
        },
        {
          "text": "This page shows no one hurt, and does not show how the bombs worked underground.",
          "tag": "page"
        },
        {
          "text": "The story ends with the ceasefire of June 2025. A short note at the end says what was still unknown in November 2026.",
          "tag": "page"
        }
      ]
    }
  ],
  "events": [
    {
      "part": 1,
      "partTitle": "The dispute",
      "title": "Three sites",
      "scriptMap": "Sites",
      "clock": "June 2025",
      "tag": "established",
      "lines": [
        {
          "text": "Fordow lies in the hills north-east of the city of Qom. Its enrichment halls were built deep inside a mountain, to protect them from attack.",
          "tag": "established"
        },
        {
          "text": "Natanz, further south, was Iran's main enrichment site, with halls above and below ground.",
          "tag": "established"
        },
        {
          "text": "Isfahan held a nuclear technology centre, where uranium was converted and processed.",
          "tag": "established"
        }
      ],
      "text": "Fordow lies in the hills north-east of the city of Qom. Its enrichment halls were built deep inside a mountain, to protect them from attack. Natanz, further south, was Iran's main enrichment site, with halls above and below ground. Isfahan held a nuclear technology centre, where uranium was converted and processed."
    },
    {
      "part": 1,
      "partTitle": "The dispute",
      "title": "A long dispute",
      "scriptMap": "Iran",
      "clock": "2015 to 2025",
      "tag": [
        "established",
        "iaea",
        "iran-official",
        "us-intelligence"
      ],
      "lines": [
        {
          "text": "In 2015, Iran agreed with world powers to limit its nuclear programme and accept close inspection.",
          "tag": "established"
        },
        {
          "text": "In 2018 the United States left the agreement and renewed its sanctions. In 2019, Iran began exceeding the deal's limits.",
          "tag": "established"
        },
        {
          "text": "The IAEA estimated that, by the seventeenth of May 2025, Iran held just over four hundred kilograms of uranium enriched up to sixty percent.",
          "tag": "iaea"
        },
        {
          "text": "Iran said its nuclear programme was for peaceful purposes.",
          "tag": "iran-official"
        },
        {
          "text": "In March 2025, American intelligence assessed that Iran was not building a nuclear weapon, and that its leader had not restarted the weapons programme stopped in 2003. It added that pressure on him to do so had probably grown.",
          "tag": "us-intelligence"
        }
      ],
      "text": "In 2015, Iran agreed with world powers to limit its nuclear programme and accept close inspection. In 2018 the United States left the agreement and renewed its sanctions. In 2019, Iran began exceeding the deal's limits. The IAEA estimated that, by the seventeenth of May 2025, Iran held just over four hundred kilograms of uranium enriched up to sixty percent. Iran said its nuclear programme was for peaceful purposes. In March 2025, American intelligence assessed that Iran was not building a nuclear weapon, and that its leader had not restarted the weapons programme stopped in 2003. It added that pressure on him to do so had probably grown."
    },
    {
      "part": 1,
      "partTitle": "The dispute",
      "title": "The twelfth of June",
      "scriptMap": "Iran",
      "clock": "12 June 2025",
      "tag": [
        "iaea",
        "press",
        "page",
        "iran-official"
      ],
      "lines": [
        {
          "text": "On the twelfth of June 2025, the agency's board found that Iran had breached its safeguards obligations by failing to cooperate fully and promptly with inspectors investigating undeclared nuclear material and activities.",
          "tag": "iaea"
        },
        {
          "text": "Reuters reported that nineteen countries voted for the finding, three against, and eleven abstained, in a closed-door vote. It was the first such finding against Iran in about twenty years.",
          "tag": "press"
        },
        {
          "text": "The finding was not a discovery of a bomb.",
          "tag": "page"
        },
        {
          "text": "Iran rejected it.",
          "tag": "iran-official"
        }
      ],
      "text": "On the twelfth of June 2025, the agency's board found that Iran had breached its safeguards obligations by failing to cooperate fully and promptly with inspectors investigating undeclared nuclear material and activities. Reuters reported that nineteen countries voted for the finding, three against, and eleven abstained, in a closed-door vote. It was the first such finding against Iran in about twenty years. The finding was not a discovery of a bomb. Iran rejected it."
    },
    {
      "part": 2,
      "partTitle": "War",
      "title": "The thirteenth of June",
      "scriptMap": "Iran",
      "clock": "13 to 21 June 2025",
      "tag": [
        "established",
        "page"
      ],
      "lines": [
        {
          "text": "On the thirteenth of June, Israel attacked Iran's nuclear sites and military leaders. Iran answered with missiles fired at Israel.",
          "tag": "established"
        },
        {
          "text": "Natanz and Isfahan were struck by Israel in the first days of the war. Any picture of them after the twenty-second may show damage from both attacks.",
          "tag": [
            "established",
            "page"
          ]
        },
        {
          "text": "The United States and Iran had been holding talks, through Oman. The next round, set for the fifteenth of June, was called off.",
          "tag": "established"
        }
      ],
      "text": "On the thirteenth of June, Israel attacked Iran's nuclear sites and military leaders. Iran answered with missiles fired at Israel. Natanz and Isfahan were struck by Israel in the first days of the war. Any picture of them after the twenty-second may show damage from both attacks. The United States and Iran had been holding talks, through Oman. The next round, set for the fifteenth of June, was called off."
    },
    {
      "part": 3,
      "partTitle": "The mission, 21 and 22 June",
      "title": "Whiteman",
      "scriptMap": "World",
      "clock": "21 June 2025",
      "tag": "us-official",
      "lines": [
        {
          "text": "Early on the twenty-first of June, seven B-2 stealth bombers took off from Whiteman Air Force Base, in Missouri, and flew east.",
          "tag": "us-official"
        },
        {
          "text": "At the same time, other B-2s flew west, over the Pacific Ocean. They were a decoy, to draw attention away from the real mission.",
          "tag": "us-official"
        },
        {
          "text": "Each B-2 has a crew of two. General Caine said very few people in Washington knew the timing or nature of the plan.",
          "tag": "us-official"
        }
      ],
      "text": "Early on the twenty-first of June, seven B-2 stealth bombers took off from Whiteman Air Force Base, in Missouri, and flew east. At the same time, other B-2s flew west, over the Pacific Ocean. They were a decoy, to draw attention away from the real mission. Each B-2 has a crew of two. General Caine said very few people in Washington knew the timing or nature of the plan."
    },
    {
      "part": 3,
      "partTitle": "The mission, 21 and 22 June",
      "title": "Across the world",
      "scriptMap": "World",
      "clock": "21 June 2025",
      "tag": [
        "us-official",
        "page",
        "reconstruction"
      ],
      "lines": [
        {
          "text": "The bombers flew for about eighteen hours to reach Iran, refuelling in the air from tanker aircraft several times.",
          "tag": "us-official"
        },
        {
          "text": "The bombers were supported by fighter jets and air-refuelling tankers.",
          "tag": "us-official"
        },
        {
          "text": "The Pentagon said more than one hundred and twenty-five American aircraft took part.",
          "tag": "us-official"
        },
        {
          "text": "On this map, the route is simplified. The real route was not published.",
          "tag": [
            "page",
            "reconstruction"
          ]
        }
      ],
      "text": "The bombers flew for about eighteen hours to reach Iran, refuelling in the air from tanker aircraft several times. The bombers were supported by fighter jets and air-refuelling tankers. The Pentagon said more than one hundred and twenty-five American aircraft took part. On this map, the route is simplified. The real route was not published."
    },
    {
      "part": 3,
      "partTitle": "The mission, 21 and 22 June",
      "title": "Fordow, ten past two",
      "scriptMap": "Fordow",
      "clock": "22 June 2025, 2:10 a.m. in Iran",
      "tag": [
        "us-official",
        "established"
      ],
      "lines": [
        {
          "text": "At about ten past two in the morning in Iran, which was twenty to seven in the evening in Washington, the first B-2 released its bombs over Fordow.",
          "tag": "us-official"
        },
        {
          "text": "They were GBU-57s, called Massive Ordnance Penetrators, each weighing about thirty thousand pounds. It was the first time the United States had used these conventional bombs in combat.",
          "tag": [
            "us-official",
            "established"
          ]
        },
        {
          "text": "General Caine later described about fifteen years of work on the problem by two officers of an American defence agency.",
          "tag": "us-official"
        }
      ],
      "text": "At about ten past two in the morning in Iran, which was twenty to seven in the evening in Washington, the first B-2 released its bombs over Fordow. They were GBU-57s, called Massive Ordnance Penetrators, each weighing about thirty thousand pounds. It was the first time the United States had used these conventional bombs in combat. General Caine later described about fifteen years of work on the problem by two officers of an American defence agency."
    },
    {
      "part": 3,
      "partTitle": "The mission, 21 and 22 June",
      "title": "Natanz and Isfahan",
      "scriptMap": "Sites",
      "clock": "22 June 2025, 2:10 to 2:35 a.m. in Iran",
      "tag": "us-official",
      "lines": [
        {
          "text": "Natanz was struck too. The Pentagon reported that fourteen of these bombs were used across Fordow and Natanz.",
          "tag": "us-official"
        },
        {
          "text": "An American submarine fired more than two dozen Tomahawk cruise missiles at Isfahan. The Pentagon said they were the last weapons to strike.",
          "tag": "us-official"
        },
        {
          "text": "All three sites were struck within twenty-five minutes. In all, the United States used about seventy-five precision weapons.",
          "tag": "us-official"
        }
      ],
      "text": "Natanz was struck too. The Pentagon reported that fourteen of these bombs were used across Fordow and Natanz. An American submarine fired more than two dozen Tomahawk cruise missiles at Isfahan. The Pentagon said they were the last weapons to strike. All three sites were struck within twenty-five minutes. In all, the United States used about seventy-five precision weapons."
    },
    {
      "part": 3,
      "partTitle": "The mission, 21 and 22 June",
      "title": "The way home",
      "scriptMap": "World",
      "clock": "22 June 2025",
      "tag": [
        "us-official",
        "press"
      ],
      "lines": [
        {
          "text": "General Caine said Iran's fighters did not fly, and that its air defences appeared not to have seen the bombers.",
          "tag": "us-official"
        },
        {
          "text": "He said the Pentagon was unaware of any shots fired at the strike force as it left Iranian airspace.",
          "tag": "us-official"
        },
        {
          "text": "The bombers flew home to Missouri. The whole mission lasted about a day and a half. The Pentagon called it the second-longest B-2 mission ever flown.",
          "tag": [
            "us-official",
            "press"
          ]
        },
        {
          "text": "No American aircraft was reported lost.",
          "tag": "us-official"
        }
      ],
      "text": "General Caine said Iran's fighters did not fly, and that its air defences appeared not to have seen the bombers. He said the Pentagon was unaware of any shots fired at the strike force as it left Iranian airspace. The bombers flew home to Missouri. The whole mission lasted about a day and a half. The Pentagon called it the second-longest B-2 mission ever flown. No American aircraft was reported lost."
    },
    {
      "part": 4,
      "partTitle": "What did it do?",
      "title": "\"Obliterated\"",
      "scriptMap": "Fordow",
      "clock": "21 and 22 June 2025",
      "tag": [
        "us-official",
        "iran-official"
      ],
      "lines": [
        {
          "text": "That evening, President Trump announced the strike. He said Iran's key nuclear enrichment facilities had been \"completely and totally obliterated\".",
          "tag": "us-official"
        },
        {
          "text": "The next morning, General Caine said the Pentagon's initial assessment pointed to severe damage at all three sites, and that the final assessment would take time.",
          "tag": "us-official"
        },
        {
          "text": "Iran's foreign minister, Abbas Araghchi, called the attack \"outrageous\", and said it would have \"everlasting consequences\".",
          "tag": "iran-official"
        }
      ],
      "text": "That evening, President Trump announced the strike. He said Iran's key nuclear enrichment facilities had been \"completely and totally obliterated\". The next morning, General Caine said the Pentagon's initial assessment pointed to severe damage at all three sites, and that the final assessment would take time. Iran's foreign minister, Abbas Araghchi, called the attack \"outrageous\", and said it would have \"everlasting consequences\"."
    },
    {
      "part": 4,
      "partTitle": "What did it do?",
      "title": "What the inspectors could see",
      "scriptMap": "Fordow",
      "clock": "23 June 2025",
      "tag": [
        "iaea",
        "iran-official"
      ],
      "lines": [
        {
          "text": "On the twenty-third of June, the IAEA's director general, Rafael Grossi, said craters could be seen at Fordow.",
          "tag": "iaea"
        },
        {
          "text": "Grossi expected very significant damage, but said the extent of the damage underground could not yet be assessed.",
          "tag": "iaea"
        },
        {
          "text": "Iran told the IAEA there was no rise in radiation outside the three sites.",
          "tag": [
            "iran-official",
            "iaea"
          ]
        }
      ],
      "text": "On the twenty-third of June, the IAEA's director general, Rafael Grossi, said craters could be seen at Fordow. Grossi expected very significant damage, but said the extent of the damage underground could not yet be assessed. Iran told the IAEA there was no rise in radiation outside the three sites."
    },
    {
      "part": 4,
      "partTitle": "What did it do?",
      "title": "Months, or years?",
      "scriptMap": "Fordow",
      "clock": "June and July 2025",
      "tag": [
        "us-intelligence",
        "press",
        "us-official",
        "iaea",
        "disputed"
      ],
      "lines": [
        {
          "text": "News reports on the twenty-fourth of June described a leaked preliminary assessment by the Defense Intelligence Agency. It estimated a setback of months. American officials described the assessment as low confidence.",
          "tag": [
            "us-intelligence",
            "press"
          ]
        },
        {
          "text": "On the second of July, the Pentagon said the programme had been set back by one to two years. It did not publish its evidence.",
          "tag": "us-official"
        },
        {
          "text": "In September, the IAEA reported that it lacked access to verify Iran's highly enriched uranium inventory.",
          "tag": "iaea"
        },
        {
          "text": "The two American assessments gave different estimates of the setback. The IAEA reported a separate problem: it could not verify the highly enriched uranium inventory.",
          "tag": [
            "disputed",
            "iaea"
          ]
        }
      ],
      "text": "News reports on the twenty-fourth of June described a leaked preliminary assessment by the Defense Intelligence Agency. It estimated a setback of months. American officials described the assessment as low confidence. On the second of July, the Pentagon said the programme had been set back by one to two years. It did not publish its evidence. In September, the IAEA reported that it lacked access to verify Iran's highly enriched uranium inventory. The two American assessments gave different estimates of the setback. The IAEA reported a separate problem: it could not verify the highly enriched uranium inventory."
    },
    {
      "part": 5,
      "partTitle": "Aftermath",
      "title": "Al Udeid",
      "scriptMap": "Iran",
      "clock": "23 June 2025",
      "tag": [
        "established",
        "press",
        "qatar-official"
      ],
      "lines": [
        {
          "text": "On the twenty-third of June, Iran fired missiles at Al Udeid, a Qatari air base that hosts American forces.",
          "tag": "established"
        },
        {
          "text": "Reuters reported that Iran gave advance notice.",
          "tag": "press"
        },
        {
          "text": "A Qatari military officer said one of nineteen missiles hit the base. Qatar reported no casualties.",
          "tag": "qatar-official"
        }
      ],
      "text": "On the twenty-third of June, Iran fired missiles at Al Udeid, a Qatari air base that hosts American forces. Reuters reported that Iran gave advance notice. A Qatari military officer said one of nineteen missiles hit the base. Qatar reported no casualties."
    },
    {
      "part": 5,
      "partTitle": "Aftermath",
      "title": "Ceasefire",
      "scriptMap": "Iran",
      "clock": "23 and 24 June 2025",
      "tag": [
        "us-official",
        "page",
        "established"
      ],
      "lines": [
        {
          "text": "Hours after the attack on Al Udeid, President Trump announced a ceasefire between Israel and Iran.",
          "tag": "us-official"
        },
        {
          "text": "The ceasefire followed soon afterward. The timing alone cannot tell us how much the strike contributed.",
          "tag": "page"
        },
        {
          "text": "The ceasefire took effect on the twenty-fourth of June, after twelve days of war.",
          "tag": "established"
        }
      ],
      "text": "Hours after the attack on Al Udeid, President Trump announced a ceasefire between Israel and Iran. The ceasefire followed soon afterward. The timing alone cannot tell us how much the strike contributed. The ceasefire took effect on the twenty-fourth of June, after twelve days of war."
    },
    {
      "part": 5,
      "partTitle": "Aftermath",
      "title": "Questions in Washington",
      "scriptMap": "World",
      "clock": "23 to 27 June 2025",
      "tag": [
        "us-official",
        "established",
        "iran-official",
        "disputed"
      ],
      "lines": [
        {
          "text": "President Trump told Congress the strikes were \"limited in scope and purpose\", in the \"collective self-defense\" of Israel, under his own authority as commander in chief.",
          "tag": "us-official"
        },
        {
          "text": "Some members of Congress argued that he needed their approval first. On the twenty-seventh of June, a motion to bring the war-powers resolution out of committee failed in the Senate, with forty-seven votes in favour and fifty-three against.",
          "tag": "established"
        },
        {
          "text": "Washington defended the strike as necessary and lawful. Iran condemned it as illegal. Its legality is still debated.",
          "tag": [
            "us-official",
            "iran-official",
            "disputed"
          ]
        }
      ],
      "text": "President Trump told Congress the strikes were \"limited in scope and purpose\", in the \"collective self-defense\" of Israel, under his own authority as commander in chief. Some members of Congress argued that he needed their approval first. On the twenty-seventh of June, a motion to bring the war-powers resolution out of committee failed in the Senate, with forty-seven votes in favour and fifty-three against. Washington defended the strike as necessary and lawful. Iran condemned it as illegal. Its legality is still debated."
    },
    {
      "part": 5,
      "partTitle": "Aftermath",
      "title": "What is not known",
      "scriptMap": "Fordow",
      "clock": "June 2025",
      "tag": [
        "unknown",
        "iaea"
      ],
      "lines": [
        {
          "text": "What exactly was destroyed inside Fordow is not publicly known.",
          "tag": "unknown"
        },
        {
          "text": "The IAEA had yet to verify the whereabouts and condition of the full stockpile of enriched uranium.",
          "tag": [
            "iaea",
            "unknown"
          ]
        },
        {
          "text": "The sources used for this page do not establish whether anyone was killed at the three sites in the American strikes.",
          "tag": "unknown"
        }
      ],
      "text": "What exactly was destroyed inside Fordow is not publicly known. The IAEA had yet to verify the whereabouts and condition of the full stockpile of enriched uranium. The sources used for this page do not establish whether anyone was killed at the three sites in the American strikes."
    },
    {
      "part": 5,
      "partTitle": "Aftermath",
      "title": "After June 2025",
      "scriptMap": "World",
      "clock": "to November 2026",
      "tag": [
        "press",
        "iaea",
        "established",
        "page"
      ],
      "lines": [
        {
          "text": "In November 2026, Reuters reported that the IAEA was still seeking access to the bombed sites and an accounting of the enriched uranium.",
          "tag": [
            "press",
            "iaea"
          ]
        },
        {
          "text": "A new war began on the twenty-eighth of February 2026. On the third of March, the IAEA said satellite images showed fresh damage to entrance buildings at Natanz. Later images need to be dated carefully, because they can show damage from more than one attack. That war is not told on this page.",
          "tag": [
            "established",
            "iaea",
            "page"
          ]
        },
        {
          "text": "The bombers reached their targets and came home. What the strike achieved is still argued about. History asks what happened, what was claimed, and how we know.",
          "tag": "page"
        }
      ],
      "text": "In November 2026, Reuters reported that the IAEA was still seeking access to the bombed sites and an accounting of the enriched uranium. A new war began on the twenty-eighth of February 2026. On the third of March, the IAEA said satellite images showed fresh damage to entrance buildings at Natanz. Later images need to be dated carefully, because they can show damage from more than one attack. That war is not told on this page. The bombers reached their targets and came home. What the strike achieved is still argued about. History asks what happened, what was claimed, and how we know."
    }
  ],
  "outcome": [
    {
      "text": "On the night of the twenty-first to the twenty-second of June 2025, seven American B-2 bombers struck Fordow and Natanz, and a submarine's missiles struck Isfahan.",
      "tag": "us-official",
      "heading": "What happened"
    },
    {
      "text": "The bombers flew for about a day and a half, from Missouri and back, and none was reported lost.",
      "tag": "us-official"
    },
    {
      "text": "Iran fired missiles at Al Udeid, an air base in Qatar. Qatar reported no casualties. A ceasefire took effect on the twenty-fourth of June.",
      "tag": [
        "qatar-official",
        "established"
      ]
    },
    {
      "text": "President Trump said the key enrichment facilities were \"obliterated\". General Caine said the initial assessment pointed to severe damage at all three sites.",
      "tag": "us-official",
      "heading": "The claims"
    },
    {
      "text": "In June, Grossi expected very significant damage at Fordow, and said the extent underground was unknown. In September, the agency reported that it still could not verify the highly enriched uranium inventory.",
      "tag": "iaea"
    },
    {
      "text": "Estimates of the setback ranged from months to two years.",
      "tag": [
        "us-intelligence",
        "us-official",
        "disputed"
      ]
    },
    {
      "text": "What was destroyed underground, and where the enriched uranium is.",
      "tag": "unknown",
      "heading": "Still unknown"
    },
    {
      "text": "Whether anyone was killed at the three sites in the American strikes.",
      "tag": "unknown"
    }
  ]
});

/* ======== maps, armies and moves (kept by make-scenario-text.py) ======== */
/* ======================================================================================================================
   Maps, forces and their moves.
     sites   images/sites-painting.jpg   Tehran to Isfahan (560 x 420 km): Fordow, Natanz, Isfahan. The main map.
     region  images/region-painting.jpg  Iran, the Gulf and Qatar (1800 x 1350 km). The script's "Iran" map.
     fordow  images/fordow-painting.jpg  the hills north-east of Qom (8 x 6 km).
     world   images/world-painting.jpg   Missouri to Iran (about 14,000 km wide at 40°N): a relief render of real elevation,
             not a painting (tools/draw-world.py).
   The three Iran maps are paintings made for this page (AI-generated) over real elevation (tools/draw-maps.py).
   Positions are given in latitude and longitude and turned into each map's pixels (all four maps are plain lat/lon grids).
   EVERY ROUTE AND POSITION IS OURS: the real routes were secret. The flights are drawn as simple paths (reconstruction).
   Sides (owner, 18 Nov 2026): Iran 'allied' (red, named first on the card), the United States 'french' (blue).
   No one is drawn hurt; no explosions beyond a small, distant cloud of dust (owner's rule).
   ====================================================================================================================== */
(() => {
  const S = window.MIDNIGHTHAMMER_SCENARIO;
  const PI = Math.PI, E = 0, Wd = PI, N = -PI / 2, So = PI / 2;
  const GEO = { sites: { lat0: 32.31355, lat1: 36.08645, lon0: 48.35886, lon1: 54.44114 }, region: { lat0: 24.93640, lat1: 37.06360, lon0: 42.06800, lon1: 60.93200 },
                fordow: { lat0: 34.85705, lat1: 34.91095, lon0: 50.95420, lon1: 51.04180 }, world: { lat0: -11.16134, lat1: 83.16134, lon0: -96.72616, lon1: 58.72616 } };
  const LL = (map, lat, lon) => { const g = GEO[map]; return { x: Math.round((lon - g.lon0) / (g.lon1 - g.lon0) * 2400), y: Math.round((g.lat1 - lat) / (g.lat1 - g.lat0) * 1800) }; };
  const off = (p, dx, dy) => ({ x: p.x + dx, y: p.y + dy });
  const AP = '(approximate)';
  // places
  const P = { fordow: [34.8845, 50.9981], natanz: [33.725, 51.725], isfahan: [32.574, 51.826], tehran: [35.6889, 51.3897], qom: [34.64, 50.876],
              udeid: [25.1186, 51.3186], doha: [25.2867, 51.5333], whiteman: [38.7303, -93.5479], washington: [38.9, -77.04], vienna: [48.21, 16.37] };
  const s = k => LL('sites', ...P[k]), r = k => LL('region', ...P[k]), w = k => LL('world', ...P[k]);
  const fFORDOW = LL('fordow', 34.8845, 50.9981);
  // the world route (schematic: east over the Atlantic and the Mediterranean; the real route was not published)
  const wWHITE = w('whiteman'), wATL1 = LL('world', 37, -60), wATL2 = LL('world', 36, -20), wMED = LL('world', 34.5, 20), wIRAQ = LL('world', 33.5, 42),
        wIRAN = LL('world', 34.6, 51), wPACIFIC = LL('world', 33, -98), wTANK1 = LL('world', 38, -45), wTANK2 = LL('world', 35.5, 10), wMEAST = LL('world', 32, 38);

  Object.assign(S, {
    titleCard: {
      title: 'OPERATION MIDNIGHT HAMMER', date: '21–22 June 2025',
      dateNote: 'American bombers flew from Missouri to strike two enrichment sites in Iran, and a submarine fired missiles at a third. What the strike destroyed is still argued about.',
      dateRef: 'Pentagon briefings of 22 and 26 June 2025; the president’s address and notification to Congress; IAEA statements and reports; Reuters; AP',
      place: 'Fordow, Natanz and Isfahan, Iran',
      sides: 'Iran  ·  the United States'
    },
    world: { w: 2400, h: 1800 },
    spokenTitles: true,
    mainMap: 'sites', terrain: 'sites-painting.jpg', geo: { sites: GEO.sites, region: GEO.region, fordow: GEO.fordow },
    altMaps: { region: 'region-painting.jpg', fordow: 'fordow-painting.jpg', world: 'world-painting.jpg' },
    altLabels: {
      region: [ { ...r('tehran'), y: r('tehran').y - 34, text: 'TEHRAN' }, { ...r('fordow'), x: r('fordow').x - 90, text: 'Fordow', small: true }, { ...r('natanz'), x: r('natanz').x + 80, text: 'Natanz', small: true },
        { ...r('isfahan'), y: r('isfahan').y + 34, text: 'Isfahan', small: true }, { ...r('doha'), x: r('doha').x + 70, text: 'Doha', small: true }, { ...LL('region', 27.2, 51.0), text: 'PERSIAN GULF', small: true },
        { ...LL('region', 32.6, 55.0), text: 'IRAN' }, { ...LL('region', 26.0, 45.5), text: 'SAUDI ARABIA', small: true }, { ...LL('region', 33.0, 43.2), text: 'IRAQ', small: true }, { ...LL('region', 25.3, 50.9), text: 'QATAR', small: true } ],
      fordow: [ { ...fFORDOW, y: fFORDOW.y + 120, text: 'the Fordow site ' + AP } ],
      world: [ { ...wWHITE, x: wWHITE.x + 60, y: wWHITE.y + 34, text: 'Whiteman (Missouri)', small: true }, { ...w('washington'), y: w('washington').y + 34, text: 'Washington', small: true },
        { ...LL('world', 30, -40), text: 'ATLANTIC OCEAN', small: true }, { ...LL('world', 36.5, 18), text: 'Mediterranean', small: true }, { ...wIRAN, x: wIRAN.x - 20, y: wIRAN.y + 40, text: 'IRAN', small: true },
        { ...LL('world', 52, 10), text: 'EUROPE', small: true }, { ...LL('world', 15, 15), text: 'AFRICA', small: true }, { ...LL('world', 45, -98), x: 30, text: '' } ]
    },
    duration: 17 * 14 + 30, commandDuration: 300, commandFocus: s('fordow'),
    battlefield: {
      scale: { px: 429, label: '100 km' },
      labels: [ { ...s('tehran'), y: s('tehran').y - 40, text: 'TEHRAN' }, { ...s('qom'), y: s('qom').y + 40, text: 'Qom', small: true }, { ...LL('sites', 32.665, 51.670), x: LL('sites', 32.665, 51.670).x - 150, y: LL('sites', 32.665, 51.670).y + 30, text: 'ISFAHAN (city)', small: true }, { ...LL('sites', 33.98, 51.43), x: LL('sites', 33.98, 51.43).x - 80, text: 'Kashan', small: true } ]
    },
    eventMarkers: true,
    trenchLayers: [], trenchAlpha: 1, defaultTrench: null, introTrench: null,
    globe: { target: { lon: 50.9981, lat: 34.8845 }, region: { lon: 51.4, lat: 34.2 }, pull: 3.2, fit: { lon0: 48.3, lon1: 54.5, lat0: 32.3, lat1: 36.1, margin: .03 }, lift: false, keepBorders: true, keepTowns: true, startLat: 30,
      periodNote: 'Iran in June 2025',
      paintings: [ { file: 'sites-painting.jpg', ...GEO.sites } ],
      closePull: 60, dive2Secs: 6,
      stop2: { center: { lon: 51.4, lat: 34.2 }, pull: 8, fit: { lon0: 48.36, lon1: 54.44, lat0: 32.31, lat1: 36.09, margin: .02 }, todayNote: 'The three sites', thenNote: 'June 2025' },
      labels: [ { lon: 50.9981, lat: 34.8845, text: 'FORDOW', size: .8, pin: true, early: true } ] },
    establishing: [],
    imageBase: 'images/', audioBase: 'audio/',
    voices: [
      { id: 'clear', name: 'Narrator 1 · clear', speaker: 25 }, { id: 'light', name: 'Narrator 2 · light', speaker: 60 },
      { id: 'bright', name: 'Narrator 3 · bright', speaker: 0 }, { id: 'deep', name: 'Narrator 4 · deep', speaker: 400 },
      { id: 'warm', name: 'Narrator 5 · warm', speaker: 7 }, { id: 'computer', name: 'Computer · calm', speaker: 500 }
    ],
    sheets: ['b2', 'b2-release', 'kc135', 'f35a', 'f16', 'submarine', 'tomahawk'],
    attackSheets: { 'b2': 'b2-release' },
    sheetBy: { allied: { infantry: 'tomahawk', archers: 'tomahawk', cavalry: 'tomahawk' }, french: { infantry: 'b2', archers: 'b2', cavalry: 'b2' } },
    fallen: {},   // owner's rule: no one shown hurt
    sideArt: { allied: { pennant: '#c0392b' }, french: { pennant: '#2e5aa8' } },
    legend: [ { label: 'Iran', short: 'Iran', color: '#c0392b', kind: 'dot' }, { label: 'United States', short: 'US', color: '#2e5aa8', kind: 'dot' } ],
    ai: { plans: {} }, commandLines: {},
    debrief: { allied: { victory: { title: 'After the strike', text: '' }, defeat: { title: 'After the strike', text: '' }, stalemate: { title: 'After the strike', text: '' } },
               french: { victory: { title: 'After the strike', text: '' }, defeat: { title: 'After the strike', text: '' }, stalemate: { title: 'After the strike', text: '' } } },
    sources: [
      { title: 'Pentagon briefings, 22 and 26 June 2025', note: 'Secretary Hegseth and General Caine: the mission, the aircraft and weapons counts, the timings.' },
      { title: 'The president’s address of 21 June and notification to Congress of 23 June 2025', note: 'GovInfo, Daily Compilation of Presidential Documents.' },
      { title: 'International Atomic Energy Agency', note: 'The director general’s statements of June 2025; the Board resolution of 12 June 2025; report GOV/2025/50 (September 2025).' },
      { title: 'US Annual Threat Assessment, March 2025', note: 'Office of the Director of National Intelligence.' },
      { title: 'Reuters and the Associated Press', note: 'The leaked preliminary assessment; Al Udeid; the ceasefire; the IAEA in 2026.' },
      { title: 'Qatar’s Ministry of Defence, 23 June 2025', note: 'The missile attack on Al Udeid.' },
      { title: 'US Senate, roll call vote 328, 27 June 2025', note: 'The motion on the war-powers resolution.' },
      { title: 'This page', note: 'The research, ChatGPT’s reviews and the narration script are in the midnight-hammer/research folder.' }
    ]
  });
  S.confidence = {
    established: { label: 'Established', color: '#5fcf8a', desc: 'A well-documented date or fact, reported consistently. Not a claim that every party agrees about its meaning.' },
    'us-official': { label: 'US official', color: '#8fb2ff', desc: 'A US government statement: the president, the Pentagon briefings, the notification to Congress. Its contents are not thereby independently proved.' },
    'iran-official': { label: 'Iran official', color: '#ff9a86', desc: 'A statement by Iran’s government or its nuclear regulator.' },
    iaea: { label: 'IAEA', color: '#9fd0ff', desc: 'The International Atomic Energy Agency’s own statement or report, with its date.' },
    'qatar-official': { label: 'Qatar official', color: '#e6c8a0', desc: 'A statement by Qatar’s Ministry of Defence or a Qatari officer.' },
    'us-intelligence': { label: 'US intelligence', color: '#c9a0e6', desc: 'A US intelligence assessment, published or leaked, with its date and how it became known.' },
    press: { label: 'Press', color: '#e9c77a', desc: 'A named news organisation’s report.' },
    disputed: { label: 'Disputed', color: '#ff7a6a', desc: 'Identifiable sources disagree: the line says how.' },
    unknown: { label: 'Unknown', color: '#b0b8bb', desc: 'A question the available evidence does not settle.' },
    reconstruction: { label: 'Reconstruction', color: '#c8a2ff', desc: 'Our own drawing: routes, positions and the look of a weapon release, not documented details.' },
    page: { label: 'About this page', color: '#9aa6ab', desc: 'How this page works: not a claim about the past.' } };
  S.sides = {
    allied: { name: 'Iran', short: 'Iran', army: 'The Islamic Republic of Iran: the nuclear sites at Fordow, Natanz and Isfahan', color: '#c0392b', light: '#ffd6d0' },
    french: { name: 'United States', short: 'US', army: 'US Air Force bombers, fighters and tankers, and a US Navy submarine', color: '#2e5aa8', light: '#d0dcff' } };
  S.sides.allied.rally = s('tehran'); S.sides.french.rally = s('fordow');

  S.library = [
    { title: 'Pentagon briefing, 22 June 2025', author: 'Secretary Pete Hegseth and General Dan Caine', year: '2025', kind: 'briefing transcript', about: 'The mission as the Pentagon described it the morning after.', citedIn: 'Parts 3 and 4', rights: 'US government: public domain', link: 'https://www.war.gov/News/Releases/Release/Article/4222543/secretary-of-defense-pete-hegseth-and-chairman-of-the-joint-chiefs-of-staff-gen/', linkLabel: 'war.gov' },
    { title: 'Pentagon briefing, 26 June 2025', author: 'Secretary Pete Hegseth and General Dan Caine', year: '2025', kind: 'briefing transcript', about: 'The weapons, the planning and the timings.', citedIn: 'chapters 7–9', rights: 'US government: public domain', link: 'https://www.war.gov/News/Transcripts/Transcript/Article/4227366/defense-secretary-pete-hegseth-and-joint-chiefs-of-staff-chairman-gen-dan-caine/', linkLabel: 'war.gov' },
    { title: 'Address to the Nation, 21 June 2025', author: 'President Donald Trump', year: '2025', kind: 'speech', about: 'The announcement of the strike.', citedIn: 'chapter 10', rights: 'US government: public domain', link: 'https://www.govinfo.gov/content/pkg/DCPD-202500711/html/DCPD-202500711.htm', linkLabel: 'GovInfo' },
    { title: 'Letter to Congress, 23 June 2025', author: 'President Donald Trump', year: '2025', kind: 'notification', about: 'The legal basis claimed for the strike.', citedIn: 'chapter 15', rights: 'US government: public domain', link: 'https://www.govinfo.gov/content/pkg/DCPD-202500715/html/DCPD-202500715.htm', linkLabel: 'GovInfo' },
    { title: 'GOV/2025/50', author: 'International Atomic Energy Agency', year: '2025', kind: 'report', about: 'Verification in Iran after the strikes: the loss of access to the uranium inventory.', citedIn: 'chapters 12, 16', rights: 'Link only', link: 'https://www.iaea.org/sites/default/files/documents/gov2025-50.pdf', linkLabel: 'iaea.org' },
    { title: 'Annual Threat Assessment 2025', author: 'Office of the Director of National Intelligence', year: '2025', kind: 'report', about: 'The March 2025 assessment of Iran’s nuclear programme.', citedIn: 'chapter 2', rights: 'US government: public domain', link: 'https://archive.dni.gov/files/ODNI/documents/assessments/ATA-2025-Unclassified-Report.pdf', linkLabel: 'dni.gov' },
    { title: 'Senate roll call vote 328', author: 'United States Senate', year: '2025', kind: 'record', about: 'The motion on the war-powers resolution, 27 June 2025.', citedIn: 'chapter 15', rights: 'US government: public domain', link: 'https://www.senate.gov/legislative/LIS/roll_call_votes/vote1191/vote_119_1_00328.htm', linkLabel: 'senate.gov' }
  ];

  S.units = [
    { side: 'french', type: 'cavalry', sheet: 'b2', portrait: false, name: 'B-2 Spirit bombers', desc: 'Seven took part in the main strike, each with a crew of two, from Whiteman Air Force Base in Missouri.', tag: 'us-official', lines: [] },
    { side: 'french', type: 'cavalry', sheet: 'kc135', portrait: false, name: 'Air-refuelling tankers', desc: 'Tankers refuelled the bombers in the air on the long flight. Drawn as a KC-135.', tag: 'us-official', lines: [] },
    { side: 'french', type: 'cavalry', sheet: 'f35a', portrait: false, name: 'Fighter escort', desc: 'Fighter jets supported the bombers. The briefings used here did not list the types: the page draws two common US fighters (an F-35A and an F-16).', tag: 'reconstruction', lines: [] },
    { side: 'french', type: 'cavalry', sheet: 'submarine', portrait: false, name: 'A US Navy submarine', desc: 'It fired more than two dozen Tomahawk cruise missiles at Isfahan. No hull is named: a generic submarine.', tag: 'us-official', lines: [] },
    { side: 'french', type: 'cavalry', sheet: 'tomahawk', portrait: false, name: 'Tomahawk cruise missiles', desc: 'The Pentagon said they were the last weapons to strike.', tag: 'us-official', lines: [] }
  ];

  // a small, distant cloud of dust at each site (hidden until its chapter)
  const O = (o) => Object.assign({ hidden: true, turns: false }, o);
  const DUST = (id, map, p, h) => O({ id, map, sheet: 'dust', x: p.x, y: p.y, h: h || 110, row: 0, anim: { row: 0, fps: 3 } });
  S.mapObjects = [ DUST('dF', 'fordow', off(fFORDOW, 0, 30), 260), DUST('dSF', 'sites', off(s('fordow'), 0, 10)), DUST('dSN', 'sites', off(s('natanz'), 0, 10)), DUST('dSI', 'sites', off(s('isfahan'), 0, 10)) ];

  const F = (o) => Object.assign({ power: 1, confidence: 'reconstruction', noFallen: true, type: 'cavalry', cols: 1, rows: 1, side: 'french', hidden: true }, o);
  S.formations = [
    // the world
    F({ id: 'wB2', map: 'world', name: 'B-2 bombers', division: 'the strike force: seven B-2s', sheet: 'b2', cols: 3, h: 30, x: wWHITE.x, y: wWHITE.y, facing: E }),
    F({ id: 'wDecoy', map: 'world', name: 'Decoy B-2s', division: 'west over the Pacific', sheet: 'b2', cols: 2, h: 26, x: wWHITE.x, y: wWHITE.y + 20, facing: Wd }),
    F({ id: 'wTank1', map: 'world', name: 'Tankers', division: 'air refuelling', sheet: 'kc135', h: 30, x: wTANK1.x, y: wTANK1.y, facing: E }),
    F({ id: 'wTank2', map: 'world', name: 'Tankers', division: 'air refuelling', sheet: 'kc135', h: 30, x: wTANK2.x, y: wTANK2.y, facing: E }),
    F({ id: 'wFight', map: 'world', name: 'Fighter escort', division: 'fighter jets (types not narrated)', sheet: 'f35a', cols: 2, h: 26, x: wMEAST.x, y: wMEAST.y, facing: E }),
    // the three sites
    F({ id: 'sB2F', map: 'sites', name: 'B-2 bombers', division: 'to Fordow', sheet: 'b2', cols: 3, h: 70, x: 40, y: s('fordow').y + 120, facing: E }),
    F({ id: 'sB2N', map: 'sites', name: 'B-2 bombers', division: 'to Natanz', sheet: 'b2', cols: 2, h: 70, x: 40, y: s('natanz').y + 60, facing: E }),
    F({ id: 'sTom', map: 'sites', name: 'Tomahawk missiles', division: 'from the submarine, to Isfahan', sheet: 'tomahawk', cols: 3, h: 50, x: s('isfahan').x - 200, y: 1790, facing: N }),
    F({ id: 'sFight', map: 'sites', name: 'Fighter escort', division: 'fighter jets (types not narrated)', sheet: 'f16', cols: 2, h: 60, x: 40, y: s('fordow').y - 120, facing: E }),
    // Fordow
    F({ id: 'fB2', map: 'fordow', name: 'B-2 bomber', division: 'over Fordow, about 2:10 a.m. in Iran', sheet: 'b2', h: 260, x: 100, y: fFORDOW.y - 120, facing: E }),
    // the region (the Gulf): the submarine
    F({ id: 'rSub', map: 'region', name: 'A US Navy submarine', division: 'position not published ' + AP, sheet: 'submarine', h: 70, x: LL('region', 25.0, 58.0).x, y: LL('region', 25.0, 58.0).y, facing: N })
  ];
  S.formations.forEach(f => { if (f.hidden) f.offmap = true; });
  S.formations.forEach(f => { if (f.map === 'world') f.h = Math.round(f.h * 4); });   // readable on the 14,000 km map
  S.leaders = [];

  const EV = S.events; EV.forEach((e, i) => { e.clipNo = i + 1; e.orders = e.orders || []; e.t = i * 14; });
  const MAPOF = { Sites: null, Iran: 'region', Fordow: 'fordow', World: 'world' };
  EV.forEach(e => { const m = MAPOF[e.scriptMap]; if (m) e.altMap = m; e.zoom = 'fit'; });
  const set = (i, o) => Object.assign(EV[i], o);
  const mk = (p, label, side) => Object.assign({ ...p, label }, side ? { side } : {});

  // Part 1: the dispute
  set(0, { markers: [ mk(s('fordow'), 'Fordow: enrichment halls inside a mountain'), mk(s('natanz'), 'Natanz: the main enrichment site'), mk(s('isfahan'), 'Isfahan: nuclear technology centre') ] });
  set(1, { markers: [ mk(r('tehran'), 'Tehran'), mk(r('fordow'), 'Fordow'), mk(r('natanz'), 'Natanz'), mk(r('isfahan'), 'Isfahan') ] });
  set(2, { markers: [ mk(r('tehran'), 'Iran rejected the finding', 'allied') ] });
  set(3, { markers: [ mk(r('natanz'), 'Natanz: struck by Israel from 13 June'), mk(r('isfahan'), 'Isfahan: struck by Israel from 13 June') ] });
  // Part 2-3: the mission
  set(4, { markers: [ mk(wWHITE, 'Whiteman Air Force Base, Missouri', 'french') ], orders: [
    { id: 'wB2', visible: true, to: wATL1, via: [off(wWHITE, 120, 10)], speed: 60, state: 'move', delay: 2 },
    { id: 'wDecoy', visible: true, to: wPACIFIC, speed: 40, state: 'move', delay: 4 } ] });
  set(5, { markers: [ mk(wIRAN, 'Iran') ], orders: [
    { id: 'wB2', visible: true, to: wIRAQ, via: [wATL1, wATL2, wMED], speed: 140, state: 'move' },
    { id: 'wTank1', visible: true, to: off(wTANK1, 300, 20), speed: 60, state: 'move', delay: 3 }, { id: 'wTank2', visible: true, to: off(wTANK2, 300, 0), speed: 60, state: 'move', delay: 8 },
    { id: 'wFight', visible: true, to: off(wIRAQ, 40, -20), speed: 60, state: 'move', delay: 10 } ] });
  set(6, { markers: [ mk(fFORDOW, 'Fordow: about 2:10 a.m. in Iran (6:40 p.m. in Washington)') ], orders: [
    { id: 'fB2', visible: true, to: off(fFORDOW, -40, -120), speed: 160, state: 'move' }, { id: 'fB2', state: 'attack', delay: 6 },
    { obj: 'dF', visible: true, delay: 10 }, { id: 'fB2', to: { x: 2380, y: fFORDOW.y - 160 }, speed: 200, state: 'move', delay: 14 } ] });
  set(7, { markers: [ mk(s('natanz'), 'Natanz'), mk(s('isfahan'), 'Isfahan: Tomahawk missiles from a submarine') ], orders: [
    { obj: 'dSF', visible: true }, { id: 'sFight', visible: true, to: off(s('fordow'), -100, -160), speed: 120, state: 'move' },
    { id: 'sB2N', visible: true, to: off(s('natanz'), -30, -30), speed: 140, state: 'move' }, { id: 'sB2N', state: 'attack', delay: 9 }, { obj: 'dSN', visible: true, delay: 12 },
    { id: 'sTom', visible: true, to: off(s('isfahan'), 0, 20), speed: 90, state: 'move', delay: 4 }, { id: 'sTom', gone: true, delay: 16 }, { obj: 'dSI', visible: true, delay: 16 },
    { id: 'sB2N', to: { x: 40, y: s('natanz').y - 200 }, speed: 160, state: 'move', delay: 18 } ] });
  set(8, { markers: [ mk(wWHITE, 'home to Missouri', 'french') ], orders: [ { id: 'wB2', visible: true, to: off(wWHITE, 20, 0), via: [wMED, wATL2, wATL1], speed: 160, state: 'move' },
    { id: 'wTank1', gone: true }, { id: 'wTank2', gone: true }, { id: 'wFight', gone: true }, { id: 'wDecoy', gone: true } ] });
  // Part 4: what did it do?
  set(9, { markers: [ mk(fFORDOW, '“completely and totally obliterated”: President Trump, 21 June', 'french') ], orders: [ { obj: 'dF', visible: true } ] });
  set(10, { markers: [ mk(fFORDOW, 'craters visible, Grossi said; the damage underground could not yet be assessed') ] });
  set(11, { markers: [ mk(fFORDOW, 'months, or one to two years? (see the table)') ] });
  // Part 5: aftermath
  set(12, { markers: [ mk(r('udeid'), 'Al Udeid, Qatar: 23 June', 'french'), mk(LL('region', 30.5, 52.5), 'Iran fired missiles at Al Udeid', 'allied') ] });
  set(13, { markers: [ mk(LL('region', 32.0, 53.5), 'ceasefire in effect, 24 June') ] });
  set(14, { markers: [ mk(w('washington'), 'Washington: the war-powers debate', 'french') ] });
  set(15, { markers: [ mk(fFORDOW, 'what was destroyed underground: not publicly known') ] });
  set(16, { markers: [ mk(wIRAN, 'a new war from 28 February 2026: not told on this page') ] });

  // the counts, shown on screen (not narrated)
  const TB = (title, rows, note) => ({ title, rows, note });
  EV[1].table = TB('Before the strike: the IAEA estimate', [['IAEA (31 May 2025)', '408.6 kg', 'uranium enriched up to 60%, as of 17 May 2025: a stockpile estimate']],
    'In March 2025, US intelligence assessed that Iran was not building a nuclear weapon. Iran said its programme was for peaceful purposes.');
  EV[6].table = TB('What the United States reported (Pentagon, 22 and 26 June 2025)', [
    ['B-2 bombers, main strike force', '7', ''], ['US aircraft taking part', 'more than 125', ''], ['GBU-57 bombs', '14', 'across Fordow and Natanz'],
    ['Tomahawk missiles', 'more than two dozen', 'at Isfahan'], ['All precision weapons', 'about 75', ''], ['Strike window', '25 minutes', '2:10–2:35 a.m. in Iran'],
    ['Whole bomber mission', '36 to 37 hours', 'both figures appear in official accounts'], ['US aircraft lost', 'none reported', '']], 'These categories are separate and are not added together.');
  EV[11].table = TB('How far was the programme set back?', [
    ['Defense Intelligence Agency (leaked; reported 24 June 2025)', 'months', 'a preliminary assessment; US officials described it as low confidence'],
    ['Pentagon spokesman (2 July 2025)', 'one to two years', 'no evidence published'],
    ['IAEA (September 2025, GOV/2025/50)', '—', 'lacked access to verify Iran’s highly enriched uranium inventory']], 'These measure different things, at different times. None is a final answer.');
  EV[12].table = TB('Al Udeid, 23 June 2025', [['A Qatari military officer (AP)', '19 fired · 1 hit the base', ''], ['Qatar’s Ministry of Defence', 'no casualties', ''],
    ['The Pentagon (later)', 'a communications dome damaged', '']], 'Reuters reported that Iran gave advance notice.');

  // the introduction
  const IS = S.intro;
  Object.assign(IS[0], { markers: [ mk(s('fordow'), 'Fordow'), mk(s('natanz'), 'Natanz'), mk(s('isfahan'), 'Isfahan') ] });
  Object.assign(IS[1], { markers: [ mk(s('fordow'), 'an enrichment plant, not a reactor'), mk(s('natanz'), 'an enrichment plant, not a reactor') ] });
  Object.assign(IS[2], { altMap: 'region', markers: [ mk(LL('region', 32.0, 54.0), 'Iran', 'allied') ] });
  Object.assign(IS[3], { altMap: 'world', markers: [ mk(wWHITE, 'Missouri', 'french'), mk(wIRAN, 'Iran', 'allied') ] });

  // pictures over the map and in the introduction (made for the page's video, November 2026): painted maps over OpenStreetMap
  // and Natural Earth data, and AI-generated reference sheets of the aircraft and weapons. None is a photograph of the mission.
  const VC = 'Map painted with ChatGPT over OpenStreetMap data (© OpenStreetMap contributors, ODbL); AI-generated, not a photograph';
  const NC = 'Map painted with ChatGPT over Natural Earth data (public domain); AI-generated, not a photograph';
  const SC = 'AI-generated reference sheet (ChatGPT) checked against public-domain US Air Force and Navy photographs; not a photograph';
  const VP = (file, caption, credit, at, secs) => ({ file: 'video/' + file, caption, credit, at, secs });
  EV[0].photo = VP('map-iran.jpg', 'Iran and its neighbours, June 2025: the three sites, the Strait of Hormuz and Al Udeid.', NC, 2, 12);
  EV[4].photo = [ VP('map-whiteman.jpg', 'Whiteman Air Force Base, Missouri: the north–south runway and the row of bomber hangars.', VC, 1, 6), VP('sheet-b2.jpg', 'The B-2 Spirit: a flying wing with no tail, 52 metres across, a crew of two.', SC, 7.5, 6.5) ];
  EV[5].photo = [ VP('map-world.jpg', 'The flight, drawn schematically: the real routes were not published. The dim line is the decoy flight west.', NC, 1, 6), VP('sheet-kc135.jpg', 'The KC-135 tanker, with its refuelling boom extended over a B-2.', SC, 7.5, 6.5) ];
  EV[6].photo = [ VP('map-fordow.jpg', 'Fordow: the fenced plant on its ridge north-east of Qom, with the Qom–Tehran motorway to the west.', VC, 1, 6), VP('sheet-gbu57.jpg', 'The GBU-57 Massive Ordnance Penetrator, about six metres long, beside a person for scale.', SC, 7.5, 6.5) ];
  EV[7].photo = [ VP('map-natanz.jpg', 'Natanz: the walled complex on the plain beside the Kashan–Isfahan road; the new tunnels lie in the mountain to the south.', VC, 0.5, 4.5), VP('map-isfahan.jpg', 'Isfahan: the nuclear technology centre on the south-eastern edge of the city (position approximate).', VC, 5, 4.5), VP('sheet-tomahawk.jpg', 'The Tomahawk cruise missile: stowed, leaving the water, and in level flight.', SC, 9.5, 4.5) ];
  EV[8].photo = VP('sheet-submarine.jpg', 'A US guided-missile submarine, not named by the Pentagon; press reports said an Ohio-class boat.', SC, 2, 10);
  EV[12].photo = VP('map-iran.jpg', 'Al Udeid air base in Qatar, across the Gulf from Iran.', NC, 2, 10);
  Object.assign(IS[0], { media: [ { at: 0, file: 'video/map-iran.jpg', caption: 'Iran and its neighbours in June 2025: Fordow, Natanz and Isfahan in red; the Strait of Hormuz; Al Udeid in Qatar.', ref: 'Painted for this page; site positions approximate', credit: NC } ] });
  Object.assign(IS[1], { media: [ { at: 0, file: 'video/map-natanz.jpg', caption: 'Natanz, Iran’s main enrichment site: halls under earth and concrete on the open plain.', ref: 'Painted for this page', credit: VC }, { at: 12, file: 'video/sheet-gbu57.jpg', caption: 'The bombs were conventional: the GBU-57, the largest bunker-buster in the American arsenal.', ref: 'Reference sheet', credit: SC } ] });
  Object.assign(IS[2], { media: [ { at: 0, file: 'video/sheet-b2.jpg', caption: 'The B-2 Spirit stealth bomber, the aircraft of the strike force, seen from six sides.', ref: 'Reference sheet', credit: SC } ] });
  Object.assign(IS[3], { media: [ { at: 0, file: 'video/map-world.jpg', caption: 'The flights are drawn as simple lines. The real routes were secret and are not known in detail.', ref: 'Schematic', credit: NC } ] });
  // the debrief returns to the three sites
  S.debriefMap = 'sites'; S.debriefMarkers = [ mk(s('fordow'), 'Fordow'), mk(s('natanz'), 'Natanz'), mk(s('isfahan'), 'Isfahan') ];
})();
