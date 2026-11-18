/*
  Historical Scenario File — the Battle of Bunker Hill, 17 June 1775
  -----------------------------------------------------------------
  The narrated introduction (`intro`), the chapters (`events`) and the debrief (`outcome`), word for word from
  NARRATION-SCRIPT.md (draft 3). This part is written by tools/make-scenario-text.py; the maps, armies and moves are set in
  the block below the marker line.
*/
window.BUNKERHILL_SCENARIO = window.BUNKERHILL_SCENARIO || {};
Object.assign(window.BUNKERHILL_SCENARIO, {
  "id": "bunkerhill",
  "title": "Battle of Bunker Hill",
  "date": "17 June 1775",
  "place": "Breed’s Hill and Bunker Hill, on the Charlestown peninsula, across the water from Boston",
  "tagline": "British forces under General William Howe against New England provincial troops under Colonel William Prescott",
  "welcome": "Welcome to Battles of History. Today we are learning about the Battle of Bunker Hill, fought on the seventeenth of June 1775, across the river from Boston. In one night, New England soldiers dug an earthen fort on a hill above Charlestown, across the water from Boston. The next afternoon, British soldiers crossed the water to take it. They did, at a terrible cost. We will tell you what is known, who said what, and what is still argued about. Some chapters describe deaths. We tell them plainly and without detail.",
  "intro": [
    {
      "title": "BUNKER HILL, 1775",
      "scriptMap": "",
      "lines": [
        {
          "text": "On the night of the sixteenth of June 1775, about a thousand New England soldiers dug an earthen fort, called a redoubt, on Breed's Hill, on the Charlestown peninsula, across the water from British-held Boston.",
          "tag": [
            "established",
            "letter"
          ]
        },
        {
          "text": "The next afternoon, British soldiers under General William Howe landed on the peninsula and attacked it.",
          "tag": "established"
        },
        {
          "text": "The British were driven back before a final assault took the fort, after the defenders had nearly run out of ammunition.",
          "tag": [
            "established",
            "letter"
          ]
        },
        {
          "text": "The British won the hill, but more than a thousand of their soldiers were killed or wounded.",
          "tag": "record"
        }
      ]
    },
    {
      "title": "A war has begun",
      "scriptMap": "",
      "lines": [
        {
          "text": "Two months earlier, on the nineteenth of April, British soldiers and Massachusetts militia had fought at Lexington and Concord.",
          "tag": "established"
        },
        {
          "text": "Since then, thousands of militiamen from all over New England had surrounded Boston, where the British army was based.",
          "tag": "established"
        },
        {
          "text": "Boston was then almost an island: a hilly peninsula joined to the mainland only by a narrow neck of land.",
          "tag": "established"
        },
        {
          "text": "On this page, the British are red and the New England provincials are blue.",
          "tag": "page"
        }
      ]
    },
    {
      "title": "Who is who",
      "scriptMap": "",
      "lines": [
        {
          "text": "On the British side: General Thomas Gage, the governor and commander in Boston; General William Howe, who led the attack; Brigadier Robert Pigot; and General Henry Clinton.",
          "tag": "established"
        },
        {
          "text": "On the provincial side: Colonel William Prescott, who commanded the fort; General Israel Putnam; the engineer Colonel Richard Gridley; Colonels John Stark and James Reed of New Hampshire; Captain Thomas Knowlton of Connecticut; and Doctor Joseph Warren, a leader of Massachusetts, who fought as a volunteer.",
          "tag": "established"
        },
        {
          "text": "Many provincials wore their own civilian clothes. There was no standard uniform across the force, and the Stars and Stripes had yet to be adopted.",
          "tag": "established"
        }
      ]
    },
    {
      "title": "How this page tells it",
      "scriptMap": "",
      "lines": [
        {
          "text": "Each line is tagged with where it comes from. Some famous words were written down only years later. We tell you which.",
          "tag": "page"
        },
        {
          "text": "The maps are painted from maps drawn in 1775 and 1777. Much of today's Boston was water then.",
          "tag": "page"
        },
        {
          "text": "The numbers of soldiers and of losses are on screen, in tables, with who counted them.",
          "tag": "page"
        }
      ]
    }
  ],
  "events": [
    {
      "part": 1,
      "partTitle": "The siege",
      "title": "Boston surrounded",
      "scriptMap": "Boston",
      "clock": "April to June 1775",
      "tag": [
        "established",
        "estimate"
      ],
      "lines": [
        {
          "text": "After Lexington and Concord, the New England militia camped in a great half-circle around Boston, from Cambridge to Roxbury. General Artemas Ward commanded them from Cambridge.",
          "tag": "established"
        },
        {
          "text": "Several thousand British troops were stationed in Boston, with the warships of the Royal Navy.",
          "tag": "estimate"
        },
        {
          "text": "In May, three more British generals arrived: Howe, Clinton and Burgoyne.",
          "tag": "established"
        },
        {
          "text": "The British planned to seize the hills around the town. The provincials learned of it.",
          "tag": "established"
        }
      ],
      "text": "After Lexington and Concord, the New England militia camped in a great half-circle around Boston, from Cambridge to Roxbury. General Artemas Ward commanded them from Cambridge. Several thousand British troops were stationed in Boston, with the warships of the Royal Navy. In May, three more British generals arrived: Howe, Clinton and Burgoyne. The British planned to seize the hills around the town. The provincials learned of it."
    },
    {
      "part": 1,
      "partTitle": "The siege",
      "title": "Orders to fortify",
      "scriptMap": "Boston",
      "clock": "15 and 16 June 1775",
      "tag": [
        "record",
        "letter",
        "established",
        "disputed"
      ],
      "lines": [
        {
          "text": "On the fifteenth of June, the Massachusetts Committee of Safety recommended that the hill called Bunker's Hill, in Charlestown, be \"securely kept and defended\".",
          "tag": "record"
        },
        {
          "text": "Colonel Prescott later wrote that, on the evening of the sixteenth, he received orders to march to Breed's Hill, with a party of about a thousand men.",
          "tag": "letter"
        },
        {
          "text": "They set out from Cambridge after dark, crossed the narrow Charlestown Neck, and climbed onto the peninsula.",
          "tag": "established"
        },
        {
          "text": "Why they built on Breed's Hill, closer to Boston, and not on Bunker Hill behind it, is still argued about.",
          "tag": "disputed"
        }
      ],
      "text": "On the fifteenth of June, the Massachusetts Committee of Safety recommended that the hill called Bunker's Hill, in Charlestown, be \"securely kept and defended\". Colonel Prescott later wrote that, on the evening of the sixteenth, he received orders to march to Breed's Hill, with a party of about a thousand men. They set out from Cambridge after dark, crossed the narrow Charlestown Neck, and climbed onto the peninsula. Why they built on Breed's Hill, closer to Boston, and not on Bunker Hill behind it, is still argued about."
    },
    {
      "part": 1,
      "partTitle": "The siege",
      "title": "A fort in one night",
      "scriptMap": "Peninsula",
      "clock": "16 to 17 June 1775, night",
      "tag": [
        "letter",
        "estimate",
        "established"
      ],
      "lines": [
        {
          "text": "About midnight, Prescott wrote, \"we began the entrenchment\".",
          "tag": "letter"
        },
        {
          "text": "Through the short summer night they dug a roughly square earthwork, about forty metres across, with earthen walls about as high as a person.",
          "tag": "estimate"
        },
        {
          "text": "Boston was asleep less than a mile away across the water.",
          "tag": "established"
        }
      ],
      "text": "About midnight, Prescott wrote, \"we began the entrenchment\". Through the short summer night they dug a roughly square earthwork, about forty metres across, with earthen walls about as high as a person. Boston was asleep less than a mile away across the water."
    },
    {
      "part": 2,
      "partTitle": "The battle",
      "title": "Dawn",
      "scriptMap": "Boston",
      "clock": "17 June 1775, dawn",
      "tag": [
        "letter",
        "established",
        "scholarship"
      ],
      "lines": [
        {
          "text": "At daybreak, General Gage wrote, the alarm was given by the guns of the warship Lively.",
          "tag": "letter"
        },
        {
          "text": "Soon other warships and a battery on Copp's Hill in Boston were firing at the new fort.",
          "tag": "established"
        },
        {
          "text": "The historian Richard Frothingham identifies one man killed in the morning bombardment as Asa Pollard of Billerica.",
          "tag": "scholarship"
        },
        {
          "text": "The provincials kept digging. After daybreak, Prescott says, his men extended a breastwork, a low earthen wall, north from the fort while British guns were firing.",
          "tag": "letter"
        }
      ],
      "text": "At daybreak, General Gage wrote, the alarm was given by the guns of the warship Lively. Soon other warships and a battery on Copp's Hill in Boston were firing at the new fort. The historian Richard Frothingham identifies one man killed in the morning bombardment as Asa Pollard of Billerica. The provincials kept digging. After daybreak, Prescott says, his men extended a breastwork, a low earthen wall, north from the fort while British guns were firing."
    },
    {
      "part": 2,
      "partTitle": "The battle",
      "title": "The British plan",
      "scriptMap": "Boston",
      "clock": "17 June 1775, morning",
      "tag": "established",
      "lines": [
        {
          "text": "In Boston, Gage met his generals. According to accounts of the council, Clinton proposed landing behind the fort, at Charlestown Neck, to cut it off.",
          "tag": "established"
        },
        {
          "text": "Gage chose instead to land in front of it, at Moulton's Point, and to attack up the hill. Howe would command.",
          "tag": "established"
        },
        {
          "text": "Preparing the landing took several hours.",
          "tag": "established"
        }
      ],
      "text": "In Boston, Gage met his generals. According to accounts of the council, Clinton proposed landing behind the fort, at Charlestown Neck, to cut it off. Gage chose instead to land in front of it, at Moulton's Point, and to attack up the hill. Howe would command. Preparing the landing took several hours."
    },
    {
      "part": 2,
      "partTitle": "The battle",
      "title": "The landing",
      "scriptMap": "Peninsula",
      "clock": "17 June 1775, early afternoon",
      "tag": [
        "letter",
        "established"
      ],
      "lines": [
        {
          "text": "Early in the afternoon, boats rowed the first British troops across: ten companies of grenadiers, ten of light infantry, and four infantry battalions.",
          "tag": "letter"
        },
        {
          "text": "They landed unopposed at Moulton's Point. More came after them.",
          "tag": "established"
        },
        {
          "text": "Howe later put his strength at about twenty-two hundred rank-and-file soldiers when the attack began.",
          "tag": "letter"
        }
      ],
      "text": "Early in the afternoon, boats rowed the first British troops across: ten companies of grenadiers, ten of light infantry, and four infantry battalions. They landed unopposed at Moulton's Point. More came after them. Howe later put his strength at about twenty-two hundred rank-and-file soldiers when the attack began."
    },
    {
      "part": 2,
      "partTitle": "The battle",
      "title": "The rail fence",
      "scriptMap": "Peninsula",
      "clock": "17 June 1775, afternoon",
      "tag": "established",
      "lines": [
        {
          "text": "Meanwhile, more provincials had crossed the Neck under fire from the ships: the New Hampshire men of Colonels Stark and Reed.",
          "tag": "established"
        },
        {
          "text": "With Knowlton's Connecticut men, they lined a rail fence, and a stone wall down to the Mystic River, on the open left of the fort.",
          "tag": "established"
        },
        {
          "text": "Joseph Warren arrived, and joined the defenders in the fort as a volunteer.",
          "tag": "established"
        }
      ],
      "text": "Meanwhile, more provincials had crossed the Neck under fire from the ships: the New Hampshire men of Colonels Stark and Reed. With Knowlton's Connecticut men, they lined a rail fence, and a stone wall down to the Mystic River, on the open left of the fort. Joseph Warren arrived, and joined the defenders in the fort as a volunteer."
    },
    {
      "part": 2,
      "partTitle": "The battle",
      "title": "The first attack",
      "scriptMap": "Peninsula",
      "clock": "17 June 1775, mid-afternoon",
      "tag": [
        "established",
        "letter",
        "tradition"
      ],
      "lines": [
        {
          "text": "Howe's light infantry advanced along the narrow beach by the Mystic. His grenadiers advanced on the rail fence. Pigot's regiments advanced on the fort.",
          "tag": "established"
        },
        {
          "text": "The provincials held their fire until the British were close. Then they fired.",
          "tag": [
            "established",
            "letter"
          ]
        },
        {
          "text": "The attack was driven back, with heavy British losses.",
          "tag": "established"
        },
        {
          "text": "\"Don't fire until you see the whites of their eyes\" is a famous order. It comes from later accounts. We don't know who, if anyone, said it at Bunker Hill.",
          "tag": "tradition"
        }
      ],
      "text": "Howe's light infantry advanced along the narrow beach by the Mystic. His grenadiers advanced on the rail fence. Pigot's regiments advanced on the fort. The provincials held their fire until the British were close. Then they fired. The attack was driven back, with heavy British losses. \"Don't fire until you see the whites of their eyes\" is a famous order. It comes from later accounts. We don't know who, if anyone, said it at Bunker Hill."
    },
    {
      "part": 2,
      "partTitle": "The battle",
      "title": "Charlestown burns",
      "scriptMap": "Peninsula",
      "clock": "17 June 1775, afternoon",
      "tag": [
        "established",
        "letter"
      ],
      "lines": [
        {
          "text": "Provincials fired on the British flank from the houses of Charlestown.",
          "tag": "established"
        },
        {
          "text": "During the fighting, British forces set the town on fire. Most of its people had already fled. The fire destroyed much of the town.",
          "tag": "established"
        },
        {
          "text": "From Boston, General Burgoyne watched Charlestown go up in flames.",
          "tag": "letter"
        }
      ],
      "text": "Provincials fired on the British flank from the houses of Charlestown. During the fighting, British forces set the town on fire. Most of its people had already fled. The fire destroyed much of the town. From Boston, General Burgoyne watched Charlestown go up in flames."
    },
    {
      "part": 2,
      "partTitle": "The battle",
      "title": "The second attack",
      "scriptMap": "Peninsula",
      "clock": "17 June 1775, afternoon",
      "tag": [
        "established",
        "scholarship"
      ],
      "lines": [
        {
          "text": "The British re-formed and attacked again.",
          "tag": "established"
        },
        {
          "text": "Again they were driven back.",
          "tag": "established"
        },
        {
          "text": "British field guns supported the advance, though their effectiveness varied.",
          "tag": "established"
        },
        {
          "text": "The battle is usually told as three attacks. Accounts from different parts of the field count them differently.",
          "tag": "scholarship"
        }
      ],
      "text": "The British re-formed and attacked again. Again they were driven back. British field guns supported the advance, though their effectiveness varied. The battle is usually told as three attacks. Accounts from different parts of the field count them differently."
    },
    {
      "part": 2,
      "partTitle": "The battle",
      "title": "The third attack",
      "scriptMap": "Redoubt",
      "clock": "17 June 1775, late afternoon",
      "tag": [
        "letter",
        "established"
      ],
      "lines": [
        {
          "text": "More British troops crossed to the peninsula. General Clinton followed, and helped rally the troops. The British attacked the fort again, with bayonets.",
          "tag": [
            "letter",
            "established"
          ]
        },
        {
          "text": "Inside, the powder was nearly gone. Prescott wrote that his men \"could keep up only a scattering fire\".",
          "tag": "letter"
        },
        {
          "text": "British soldiers climbed over the walls, and the defenders were forced to retreat.",
          "tag": [
            "letter",
            "established"
          ]
        },
        {
          "text": "Joseph Warren was killed in the final fighting. British Major John Pitcairn was mortally wounded.",
          "tag": "established"
        }
      ],
      "text": "More British troops crossed to the peninsula. General Clinton followed, and helped rally the troops. The British attacked the fort again, with bayonets. Inside, the powder was nearly gone. Prescott wrote that his men \"could keep up only a scattering fire\". British soldiers climbed over the walls, and the defenders were forced to retreat. Joseph Warren was killed in the final fighting. British Major John Pitcairn was mortally wounded."
    },
    {
      "part": 3,
      "partTitle": "After the battle",
      "title": "The retreat",
      "scriptMap": "Peninsula",
      "clock": "17 June 1775, evening",
      "tag": "established",
      "lines": [
        {
          "text": "The men at the rail fence held long enough to cover the retreat.",
          "tag": "established"
        },
        {
          "text": "General Putnam tried to make a stand on Bunker Hill, and could not.",
          "tag": "established"
        },
        {
          "text": "The provincials crossed back over Charlestown Neck, under fire from the ships. The British did not follow beyond the Neck.",
          "tag": "established"
        }
      ],
      "text": "The men at the rail fence held long enough to cover the retreat. General Putnam tried to make a stand on Bunker Hill, and could not. The provincials crossed back over Charlestown Neck, under fire from the ships. The British did not follow beyond the Neck."
    },
    {
      "part": 3,
      "partTitle": "After the battle",
      "title": "The cost",
      "scriptMap": "Peninsula",
      "clock": "17 June 1775",
      "tag": [
        "record",
        "estimate",
        "letter"
      ],
      "lines": [
        {
          "text": "The British official return counted two hundred and twenty-six killed and eight hundred and twenty-eight wounded.",
          "tag": "record"
        },
        {
          "text": "About four hundred and fifty provincials were killed, wounded, captured or reported missing. Counts from the time differ. You can see them on screen.",
          "tag": [
            "record",
            "estimate"
          ]
        },
        {
          "text": "\"The success is too dearly bought,\" General Howe wrote afterward.",
          "tag": "letter"
        },
        {
          "text": "General Gage wrote to London that \"the rebels are not the despicable rabble too many have supposed them to be\".",
          "tag": "letter"
        },
        {
          "text": "In December, fourteen people, including Colonel Prescott, signed a petition asking Massachusetts to reward Salem Poor, a Black soldier, who they said \"behaved like an experienced officer\".",
          "tag": "record"
        }
      ],
      "text": "The British official return counted two hundred and twenty-six killed and eight hundred and twenty-eight wounded. About four hundred and fifty provincials were killed, wounded, captured or reported missing. Counts from the time differ. You can see them on screen. \"The success is too dearly bought,\" General Howe wrote afterward. General Gage wrote to London that \"the rebels are not the despicable rabble too many have supposed them to be\". In December, fourteen people, including Colonel Prescott, signed a petition asking Massachusetts to reward Salem Poor, a Black soldier, who they said \"behaved like an experienced officer\"."
    },
    {
      "part": 3,
      "partTitle": "After the battle",
      "title": "Bunker Hill remembered",
      "scriptMap": "Boston",
      "clock": "1775 to today",
      "tag": [
        "established",
        "archaeology"
      ],
      "lines": [
        {
          "text": "On the second of July, George Washington arrived at Cambridge to command the new Continental Army. In March 1776, his army fortified Dorchester Heights, and the British left Boston.",
          "tag": "established"
        },
        {
          "text": "Gage was recalled to England, and Howe took command.",
          "tag": "established"
        },
        {
          "text": "The fighting reached both hills. The fort stood on the one we now call Breed's Hill, and the battle took the name of Bunker Hill. The granite Bunker Hill Monument, dedicated in 1843, stands where the fort was.",
          "tag": "established"
        },
        {
          "text": "In 2026, City of Boston archaeologists found part of the fort's ditch, with musket balls and gunflints.",
          "tag": "archaeology"
        }
      ],
      "text": "On the second of July, George Washington arrived at Cambridge to command the new Continental Army. In March 1776, his army fortified Dorchester Heights, and the British left Boston. Gage was recalled to England, and Howe took command. The fighting reached both hills. The fort stood on the one we now call Breed's Hill, and the battle took the name of Bunker Hill. The granite Bunker Hill Monument, dedicated in 1843, stands where the fort was. In 2026, City of Boston archaeologists found part of the fort's ditch, with musket balls and gunflints."
    }
  ],
  "outcome": [
    {
      "text": "On the night of the sixteenth of June 1775, New England provincials built a fort on Breed's Hill, above Boston.",
      "tag": "established",
      "heading": "What happened"
    },
    {
      "text": "On the seventeenth, British soldiers attacked it. They were driven back before a final assault took the fort, after the defenders had nearly run out of ammunition.",
      "tag": "established"
    },
    {
      "text": "The provincials retreated. The British held the peninsula, and the siege of Boston went on.",
      "tag": "established"
    },
    {
      "text": "More than a thousand British soldiers were killed or wounded. About four hundred and fifty provincials were killed, wounded, captured or reported missing.",
      "tag": [
        "record",
        "estimate"
      ],
      "heading": "The cost"
    },
    {
      "text": "Charlestown was burned.",
      "tag": "established"
    },
    {
      "text": "Why the fort was built on Breed's Hill.",
      "tag": "disputed",
      "heading": "What is still argued about"
    },
    {
      "text": "Whether anyone said \"the whites of their eyes\".",
      "tag": "tradition"
    },
    {
      "text": "Exactly how many men fought on each side.",
      "tag": "estimate"
    }
  ]
});

/* ======== maps, armies and moves (kept by make-scenario-text.py) ======== */
/* ======================================================================================================================
   Maps, armies and their moves.
     peninsula  images/peninsula-painting.jpg  the Charlestown peninsula (about 2.1 x 1.6 km), cut from Page's plan of 1775
                (LOC gm71000613), 0.875 m per pixel, almost exactly north-up. The main map.
     boston     images/boston-painting.jpg     Boston and the siege lines (about 10 x 7.5 km), after Pelham's plan of 1777
                (LOC gm71000619), turned 69 degrees to true north; places within about half a kilometre to a kilometre.
     redoubt    images/redoubt-painting.jpg    the redoubt and the ground to the Mystic (about 0.9 x 0.65 km), from Page.
   All are paintings made for this page (AI-generated) over the period plans (tools/draw-maps.py, tools/draw-boston-pelham.py).
   Positions are given here in the plans' own pixels (P: Page's plan; B: the Boston map), so they follow the 1775 shoreline.
   EVERY UNIT POSITION AND MOVE IS OURS, placed to follow the narration and Page's plan: a reconstruction, not a record.
   Sides (owner's default): the British 'allied' (red, named first on the card), the provincials 'french' (blue).
   No dead are drawn (owner's rule).
   ====================================================================================================================== */
(() => {
  const S = window.BUNKERHILL_SCENARIO;
  const PI = Math.PI, E = 0, Wd = PI, N = -PI / 2, So = PI / 2;
  const GEO = { peninsula: { lat0: 42.36993, lat1: 42.38407, lon0: -71.07562, lon1: -71.05006 }, redoubt: { lat0: 42.37296, lat1: 42.37889, lon0: -71.06483, lon1: -71.05420 },
                boston: { lat0: 42.32794, lat1: 42.39533, lon0: -71.12018, lon1: -70.99855 } };
  const P = (x, y) => ({ x: Math.round(x), y: Math.round(y - 260) });                       // Page's plan -> the peninsula map
  const R = (x, y) => ({ x: Math.round((x - 820) * 2.4), y: Math.round((y - 900) * 2.4) });   // Page's plan -> the redoubt map
  const B = (x, y) => ({ x, y });                                                              // the Boston map's own pixels
  const off = (p, dx, dy) => ({ x: p.x + dx, y: p.y + dy });
  const mid = (p, q, f = .5) => ({ x: Math.round(p.x + (q.x - p.x) * f), y: Math.round(p.y + (q.y - p.y) * f) });
  const AP = '(approximate)';
  // the peninsula (from Page's plan)
  const pREDOUBT = P(1228, 1357), pBREAST = P(1240, 1150), pFENCE1 = P(1170, 1010), pFENCE2 = P(1270, 660), pBEACH = P(1300, 640), pMOULTON = P(2195, 1255),
        pMORTON = P(2000, 1300), pTOWN = P(1000, 1850), pBUNKER = P(760, 760), pNECK = P(300, 340), pSHIP1 = { x: 1800, y: 1650 }, pSHIP2 = { x: 330, y: 1650 },
        pBOATS = { x: 2280, y: 1700 }, pBEACHE = P(1650, 800), pCLINTON = P(1450, 1850);
  // the redoubt map
  const rREDOUBT = R(1228, 1357), rBREAST = R(1240, 1150), rSE = R(1550, 1550), rE = R(1600, 1150), rNW = R(900, 950);
  // the Boston map (Pelham)
  const bCAMBRIDGE = B(120, 640), bPROSPECT = B(480, 375), bWINTER = B(350, 60), bNECKC = B(990, 335), bBUNKER = B(1075, 380), bBREED = B(1115, 440), bCHARLES = B(1150, 560),
        bBOSTON = B(1320, 960), bCOMMON = B(1160, 1090), bBNECK = B(1100, 1430), bROXBURY = B(1060, 1740), bDORCH = B(1650, 1600), bNODDLE = B(1700, 300), bCASTLE = B(2310, 1420),
        bCOPPS = B(1330, 700), bHARBOR = B(1600, 820), bMOULTON = B(1370, 410);

  const PIC = (file, caption, credit) => ({ file, caption, credit });
  const IMG = {
    page: PIC('map-page-1775.jpg', 'A Plan of the Action at Bunkers-Hill, by Lieutenant Page of the Engineers, 1775: the redoubt, the lines, the British advance in red.', 'Library of Congress, Geography and Map Division (gm71000613). Public domain.'),
    pelham: PIC('map-pelham-1777.jpg', 'Henry Pelham, A Plan of Boston in New England with its Environs, published 1777, from surveys made during the siege.', 'Library of Congress, Geography and Map Division (gm71000619). Public domain.'),
    humfrey: PIC('map-humfrey-1775.jpg', 'Sketch of the action on the heights of the peninsula of Charlestown, 17 June 1775 (Humfrey).', 'Library of Congress, Geography and Map Division (gm71000617). Public domain.'),
    clinton: PIC('map-clinton-1775.jpg', 'A Plan of the Battle of Bunker Hill, signed by Major-General Henry Clinton, 4 October 1775.', 'Library of Congress, Geography and Map Division. Public domain.')
  };

  Object.assign(S, {
    titleCard: {
      title: 'BATTLE OF BUNKER HILL', date: '17 June 1775',
      dateNote: 'In one night, New England soldiers dug a fort above Charlestown. The next afternoon, British soldiers crossed the water to take it.',
      dateRef: 'Prescott to John Adams (1775); Gage’s and Howe’s letters; Frothingham; the National Park Service',
      place: 'Breed’s Hill and Bunker Hill, on the Charlestown peninsula, across the water from Boston',
      sides: 'British forces under General William Howe  ·  New England provincials under Colonel William Prescott'
    },
    world: { w: 2400, h: 1800 },
    spokenTitles: true,
    mainMap: 'peninsula', terrain: 'peninsula-painting.jpg', geo: GEO,
    altMaps: { boston: 'boston-painting.jpg', redoubt: 'redoubt-painting.jpg' },
    altLabels: {
      boston: [ { ...bBOSTON, y: bBOSTON.y + 40, text: 'BOSTON' }, { ...bCAMBRIDGE, y: bCAMBRIDGE.y + 40, text: 'Cambridge' }, { ...bCHARLES, y: bCHARLES.y + 34, text: 'Charlestown', small: true },
        { ...bBUNKER, y: bBUNKER.y - 34, text: 'Bunker Hill', small: true }, { ...bROXBURY, y: bROXBURY.y - 30, text: 'Roxbury', small: true }, { ...bDORCH, y: bDORCH.y + 34, text: 'Dorchester Heights', small: true },
        { ...bPROSPECT, y: bPROSPECT.y - 30, text: 'Prospect Hill', small: true }, { ...bNODDLE, y: bNODDLE.y + 34, text: 'Noddle’s Island', small: true }, { ...bCASTLE, x: bCASTLE.x - 60, y: bCASTLE.y - 40, text: 'Castle William', small: true },
        { ...bBNECK, x: bBNECK.x + 120, text: 'Boston Neck', small: true } ],
      redoubt: [ { ...rREDOUBT, y: rREDOUBT.y + 120, text: 'the redoubt' }, { ...rBREAST, x: rBREAST.x + 170, text: 'the breastwork', small: true } ]
    },
    duration: 14 * 14 + 30, commandDuration: 300, commandFocus: pREDOUBT,
    battlefield: {
      scale: { px: 229, label: '200 m' },
      labels: [ { ...pREDOUBT, y: pREDOUBT.y + 70, text: 'the redoubt (Breed’s Hill)' }, { ...pBUNKER, y: pBUNKER.y - 50, text: 'Bunker Hill' }, { ...pTOWN, text: 'CHARLESTOWN' },
        { ...pNECK, x: pNECK.x + 40, y: pNECK.y + 50, text: 'Charlestown Neck', small: true }, { ...pMOULTON, x: pMOULTON.x - 60, y: pMOULTON.y + 50, text: 'Moulton’s Point', small: true },
        { ...pMORTON, y: pMORTON.y - 40, text: 'Morton’s Hill', small: true }, { x: 1700, y: 200, text: 'MYSTIC RIVER', small: true }, { x: 260, y: 1500, text: 'CHARLES RIVER', small: true },
        { ...mid(pFENCE1, pFENCE2), x: mid(pFENCE1, pFENCE2).x - 110, text: 'rail fence ' + AP, small: true } ]
    },
    eventMarkers: true,
    trenchLayers: [], trenchAlpha: 1, defaultTrench: null, introTrench: null,
    globe: { target: { lon: -71.0608, lat: 42.3764 }, region: { lon: -71.06, lat: 42.36 }, pull: 4.6, fit: { lon0: -73.6, lon1: -69.8, lat0: 41.2, lat1: 43.4, margin: .03 }, lift: false, keepBorders: true, keepTowns: true, startLat: 42,
      periodNote: 'Boston in 1775',
      paintings: [ { file: 'boston-painting.jpg', lat0: 42.32794, lat1: 42.39533, lon0: -71.12018, lon1: -70.99855 } ],
      closePull: 90, dive2Secs: 6,
      stop2: { center: { lon: -71.06, lat: 42.362 }, pull: 12, fit: { lon0: -71.12, lon1: -71.0, lat0: 42.328, lat1: 42.395, margin: .02 }, todayNote: 'Today’s towns', thenNote: 'The same places in 1775' },
      labels: [ { lon: -71.0608, lat: 42.3764, text: 'BUNKER HILL', size: .8, pin: true, early: true } ] },
    establishing: [],
    imageBase: 'images/', audioBase: 'audio/',
    voices: [
      { id: 'clear', name: 'Narrator 1 · clear', speaker: 25 }, { id: 'light', name: 'Narrator 2 · light', speaker: 60 },
      { id: 'bright', name: 'Narrator 3 · bright', speaker: 0 }, { id: 'deep', name: 'Narrator 4 · deep', speaker: 400 },
      { id: 'warm', name: 'Narrator 5 · warm', speaker: 7 }, { id: 'computer', name: 'Computer · calm', speaker: 500 }
    ],
    sheets: ['british-regular', 'british-regular-fire', 'british-grenadier', 'british-light', 'british-officer', 'british-gun', 'british-boat', 'british-ship', 'prov-militia', 'prov-firing', 'prov-digging', 'prov-officer'],
    attackSheets: { 'british-regular': 'british-regular-fire', 'prov-militia': 'prov-firing' },
    sheetBy: { allied: { infantry: 'british-regular', archers: 'british-light', cavalry: 'british-gun' }, french: { infantry: 'prov-militia', archers: 'prov-militia', cavalry: 'prov-militia' } },
    fallen: {},   // owner's rule: no images of the dead
    sideArt: { allied: { pennant: '#c0392b' }, french: { pennant: '#2e5aa8' } },
    legend: [ { label: 'British forces', short: 'British', color: '#c0392b', kind: 'dot' }, { label: 'New England provincials', short: 'Provincials', color: '#2e5aa8', kind: 'dot' } ],
    ai: { plans: {} }, commandLines: {},
    debrief: { allied: { victory: { title: 'After the battle', text: '' }, defeat: { title: 'After the battle', text: '' }, stalemate: { title: 'After the battle', text: '' } },
               french: { victory: { title: 'After the battle', text: '' }, defeat: { title: 'After the battle', text: '' }, stalemate: { title: 'After the battle', text: '' } } },
    sources: [
      { title: 'William Prescott to John Adams, 25 August 1775', note: 'The provincial commander’s own account (Adams Papers, Massachusetts Historical Society).' },
      { title: 'Thomas Gage to Lord Dartmouth, 25 June 1775', note: 'The British commander’s battle report and letter (UK National Archives, CO 5/92); the return of killed and wounded.' },
      { title: 'William Howe, letter of 22 and 24 June 1775', note: 'Howe’s account of the attack (US Army Corps of Engineers documentary edition).' },
      { title: 'John Burgoyne to Lord Stanley, June 1775', note: 'An eyewitness from Boston; the printed versions of the letter differ.' },
      { title: 'Richard Frothingham, History of the Siege of Boston (1849)', note: 'The American casualty counts (Ward’s orderly book and the regimental table).' },
      { title: 'The petition for Salem Poor, 5 December 1775', note: 'Massachusetts Archives; National Park Service.' },
      { title: 'National Park Service, Boston National Historical Park', note: 'The battle, the redoubt, the burning of Charlestown, William Prescott, Salem Poor.' },
      { title: 'The maps', note: 'Thomas Hyde Page, A Plan of the Action at Bunkers-Hill (1775), and Henry Pelham, A Plan of Boston with its Environs (1777): Library of Congress, public domain.' },
      { title: 'City of Boston Archaeology, 2026', note: 'The excavation on Breed’s Hill.' },
      { title: 'This page', note: 'The research, ChatGPT’s reviews and the narration script are in the bunkerhill/research folder.' }
    ]
  });
  S.confidence = {
    established: { label: 'Established', color: '#5fcf8a', desc: 'A well-documented fact, agreed by the standard histories and the documents checked.' },
    letter: { label: 'Letter', color: '#e6c8a0', desc: 'A named person’s own letter or report, written at the time: a participant’s account.' },
    record: { label: 'Record', color: '#9fd0ff', desc: 'An official document of the time: a resolution, a return of casualties, an orderly book, a petition.' },
    estimate: { label: 'Estimate', color: '#e9c77a', desc: 'An uncertain number, with who made it and what it counts.' },
    disputed: { label: 'Disputed', color: '#ff9a86', desc: 'Identifiable sources disagree: the line says how.' },
    tradition: { label: 'Tradition', color: '#c9a0e6', desc: 'A story first told later, repeated in books, not supported by the documents of the time.' },
    scholarship: { label: 'Historians', color: '#a8b8e8', desc: 'Historians’ interpretation, named or described as such.' },
    archaeology: { label: 'Archaeology', color: '#b8d98a', desc: 'A named archaeological report.' },
    reconstruction: { label: 'Reconstruction', color: '#c8a2ff', desc: 'Our own placing on the map: unit positions and moves are drawn to follow the narration and Page’s plan.' },
    page: { label: 'About this page', color: '#9aa6ab', desc: 'How this page works: not a claim about the past.' } };
  S.sides = {
    allied: { name: 'British forces', short: 'British', army: 'British regulars and Royal Marines under General William Howe, with the Royal Navy', color: '#c0392b', light: '#ffd6d0' },
    french: { name: 'New England provincials', short: 'Provincials', army: 'Provincial soldiers of Massachusetts, New Hampshire and Connecticut', color: '#2e5aa8', light: '#d0dcff' } };
  S.sides.allied.rally = pMOULTON; S.sides.french.rally = pNECK;

  // the Library of sources page (library.html?battle=bunkerhill)
  S.library = [
    { title: 'A Plan of the Action at Bunkers-Hill', author: 'Thomas Hyde Page, after John Montresor’s survey', year: '1775', kind: 'manuscript map', about: 'The British engineer’s plan of the battle: the base of the battle maps on this page.', citedIn: 'Part 2', rights: 'Public domain', link: 'https://www.loc.gov/item/gm71000613/', linkLabel: 'Library of Congress' },
    { title: 'A Plan of Boston in New England with its Environs', author: 'Henry Pelham', year: '1777', kind: 'engraved map', about: 'Boston and the siege works of 1775 and 1776: the base of the Boston map on this page.', citedIn: 'Parts 1 and 3', rights: 'Public domain', link: 'https://www.loc.gov/item/gm71000619/', linkLabel: 'Library of Congress' },
    { title: 'Letter of William Prescott to John Adams', author: 'William Prescott', year: '1775', kind: 'letter', about: 'The provincial commander’s own account.', citedIn: 'chapters 2, 3, 4, 11', rights: 'Public domain', link: 'https://www.masshist.org/publications/adams-papers/index.php/view/ADMS-06-03-02-pb-0126', linkLabel: 'Massachusetts Historical Society' },
    { title: 'Gage to Dartmouth, 25 June 1775', author: 'General Thomas Gage', year: '1775', kind: 'letter', about: 'The British commander’s report and letter.', citedIn: 'chapters 4, 6, 11, 13', rights: 'Crown copyright: quoted, linked', link: 'https://www.nationalarchives.gov.uk/education/resources/american-revolution-early-conflicts/american-revolution-early-conflicts-source-3b/', linkLabel: 'UK National Archives' },
    { title: 'The Battle of Bunker Hill', author: 'National Park Service', year: '', kind: 'article', about: 'The battle, the redoubt and the burning of Charlestown.', citedIn: 'throughout', rights: 'US government: public domain', link: 'https://www.nps.gov/articles/000/the-battle-of-bunker-hill.htm', linkLabel: 'nps.gov' },
    { title: 'Salem Poor, Patriot of Bunker Hill', author: 'National Park Service', year: '', kind: 'article', about: 'The petition of December 1775.', citedIn: 'chapter 13', rights: 'US government: public domain', link: 'https://home.nps.gov/articles/000/salem-poor-patriot-of-bunker-hill.htm', linkLabel: 'nps.gov' },
    { title: 'History of the Siege of Boston', author: 'Richard Frothingham', year: '1849', kind: 'book', about: 'The standard 19th-century history, with the American casualty counts.', citedIn: 'chapters 4, 13', rights: 'Public domain', link: 'https://www.loc.gov/item/02004522/', linkLabel: 'Library of Congress' },
    { title: 'Archaeologists unearth new clues at the Battle of Bunker Hill site', author: 'City of Boston Archaeology', year: '2026', kind: 'report', about: 'Part of the redoubt’s ditch, musket balls and gunflints.', citedIn: 'chapter 14', rights: 'Link only', link: 'https://www.boston.gov/news/archaeologists-unearth-new-clues-battle-bunker-hill-site', linkLabel: 'boston.gov' }
  ];

  // the armies panel
  S.units = [
    { side: 'allied', type: 'infantry', sheet: 'british-regular', portrait: false, name: 'British regulars', desc: 'The 5th, 38th, 43rd, 52nd and 47th Regiments of Foot and the Royal Marines: red coats with each regiment’s facing colour.', tag: 'letter', lines: [] },
    { side: 'allied', type: 'infantry', sheet: 'british-grenadier', portrait: false, name: 'Grenadiers', desc: 'The tallest men of each regiment, in bearskin caps, gathered into one force.', tag: 'letter', lines: [] },
    { side: 'allied', type: 'infantry', sheet: 'british-light', portrait: false, name: 'Light infantry', desc: 'Each regiment’s light company, in short jackets and caps: they attacked along the Mystic beach.', tag: 'established', lines: [] },
    { side: 'allied', type: 'cavalry', sheet: 'british-gun', portrait: false, name: 'Royal Artillery', desc: 'Field guns and their crews, in blue coats.', tag: 'established', lines: [] },
    { side: 'allied', type: 'cavalry', sheet: 'british-ship', portrait: false, name: 'The Royal Navy', desc: 'HMS Lively, Somerset, Glasgow, Falcon and others, with floating batteries.', tag: 'established', lines: [] },
    { side: 'french', type: 'infantry', sheet: 'prov-militia', portrait: false, name: 'Massachusetts regiments', desc: 'Prescott’s men and others: farmers and tradesmen in their own clothes.', tag: 'letter', lines: [] },
    { side: 'french', type: 'infantry', sheet: 'prov-militia', portrait: false, name: 'New Hampshire regiments', desc: 'Colonel John Stark’s and Colonel James Reed’s men, at the rail fence and the beach.', tag: 'established', lines: [] },
    { side: 'french', type: 'infantry', sheet: 'prov-militia', portrait: false, name: 'Connecticut men', desc: 'Captain Thomas Knowlton’s detachment, at the rail fence.', tag: 'established', lines: [] }
  ];

  // smoke over the lines in the attacks (hidden until a chapter shows it)
  const O = (o) => Object.assign({ hidden: true, turns: false }, o);
  const SMOKE = (id, map, p) => O({ id, map, sheet: 'musket-smoke', x: p.x, y: p.y, h: 120, row: 0, anim: { row: 0, fps: 2 } });
  S.mapObjects = [ SMOKE('sm1', 'peninsula', off(pREDOUBT, 90, -10)), SMOKE('sm2', 'peninsula', off(pFENCE1, 40, -120)), SMOKE('sm3', 'peninsula', off(pBEACH, 60, 40)),
                   SMOKE('sm4', 'redoubt', off(rREDOUBT, 160, 60)), SMOKE('sm5', 'redoubt', off(rBREAST, 140, 0)) ];

  const F = (o) => Object.assign({ power: 1, confidence: 'reconstruction', noFallen: true }, o);
  const inf = (o) => F(Object.assign({ type: 'infantry', cols: 4, rows: 2, h: 26 }, o));
  const veh = (o) => F(Object.assign({ type: 'cavalry', cols: 1, rows: 1, h: 34 }, o));
  S.formations = [
    // ---- Boston
    inf({ id: 'bWard', map: 'boston', side: 'french', name: 'Provincial army', division: 'Cambridge (General Ward)', sheet: 'prov-militia', x: bCAMBRIDGE.x + 60, y: bCAMBRIDGE.y + 40, facing: E, hidden: true }),
    inf({ id: 'bProspect', map: 'boston', side: 'french', name: 'Provincial posts', division: 'Prospect Hill', sheet: 'prov-militia', cols: 3, x: bPROSPECT.x, y: bPROSPECT.y + 30, facing: E, hidden: true }),
    inf({ id: 'bRox', map: 'boston', side: 'french', name: 'Provincial lines', division: 'Roxbury', sheet: 'prov-militia', cols: 3, x: bROXBURY.x, y: bROXBURY.y - 60, facing: N, hidden: true }),
    inf({ id: 'bBrit', map: 'boston', side: 'allied', name: 'British army', division: 'Boston (General Gage)', sheet: 'british-regular', x: bBOSTON.x, y: bBOSTON.y + 20, facing: N, hidden: true }),
    veh({ id: 'bShip', map: 'boston', side: 'allied', name: 'Royal Navy', division: 'warships in the harbour', sheet: 'british-ship', h: 60, x: bHARBOR.x, y: bHARBOR.y, facing: Wd, hidden: true }),
    inf({ id: 'bMarch', map: 'boston', side: 'french', name: 'Prescott’s party', division: 'about 1,000 men', sheet: 'prov-militia', cols: 4, rows: 2, x: bCAMBRIDGE.x + 80, y: bCAMBRIDGE.y - 20, facing: E, hidden: true }),
    // ---- the peninsula
    veh({ id: 'pDig', map: 'peninsula', side: 'french', name: 'Diggers', division: 'Prescott’s men at work', sheet: 'prov-digging', cols: 3, rows: 1, h: 40, x: pREDOUBT.x, y: pREDOUBT.y, facing: So, hidden: true }),
    inf({ id: 'pPrescott', map: 'peninsula', side: 'french', name: 'The redoubt', division: 'Colonel Prescott', sheet: 'prov-militia', cols: 4, rows: 2, x: pREDOUBT.x, y: pREDOUBT.y, facing: E, hidden: true }),
    inf({ id: 'pBreast', map: 'peninsula', side: 'french', name: 'The breastwork', division: 'Prescott’s men', sheet: 'prov-militia', cols: 3, rows: 1, x: pBREAST.x, y: pBREAST.y, facing: E, hidden: true }),
    inf({ id: 'pFence', map: 'peninsula', side: 'french', name: 'The rail fence', division: 'New Hampshire (Stark, Reed) and Connecticut (Knowlton)', sheet: 'prov-militia', cols: 5, rows: 1, x: pNECK.x + 80, y: pNECK.y + 40, facing: E, hidden: true }),
    inf({ id: 'pBeach', map: 'peninsula', side: 'french', name: 'The stone wall on the beach', division: 'Stark’s New Hampshire men', sheet: 'prov-militia', cols: 3, rows: 1, x: pNECK.x + 60, y: pNECK.y + 80, facing: E, hidden: true }),
    inf({ id: 'pPutnam', map: 'peninsula', side: 'french', name: 'Bunker Hill', division: 'General Putnam', sheet: 'prov-officer', cols: 2, rows: 1, x: pBUNKER.x, y: pBUNKER.y, facing: E, hidden: true }),
    veh({ id: 'pBoats', map: 'peninsula', side: 'allied', name: 'The boats', division: 'from Boston', sheet: 'british-boat', cols: 3, rows: 1, h: 40, x: pBOATS.x, y: pBOATS.y, facing: N, hidden: true }),
    veh({ id: 'pShip1', map: 'peninsula', side: 'allied', name: 'Warships', division: 'Royal Navy', sheet: 'british-ship', h: 70, x: pSHIP1.x, y: pSHIP1.y, facing: Wd, hidden: true }),
    veh({ id: 'pShip2', map: 'peninsula', side: 'allied', name: 'HMS Lively', division: 'Royal Navy', sheet: 'british-ship', h: 60, x: pSHIP2.x, y: pSHIP2.y, facing: E, hidden: true }),
    inf({ id: 'pLight', map: 'peninsula', side: 'allied', name: 'Light infantry', division: 'Howe: along the Mystic beach', sheet: 'british-light', cols: 4, rows: 2, x: pMOULTON.x - 60, y: pMOULTON.y - 80, facing: Wd, hidden: true }),
    inf({ id: 'pGren', map: 'peninsula', side: 'allied', name: 'Grenadiers', division: 'Howe: against the rail fence', sheet: 'british-grenadier', cols: 4, rows: 2, x: pMORTON.x, y: pMORTON.y - 90, facing: Wd, hidden: true }),
    inf({ id: 'pPigot', map: 'peninsula', side: 'allied', name: 'Pigot’s regiments', division: 'against the redoubt', sheet: 'british-regular', cols: 5, rows: 2, x: pMORTON.x - 40, y: pMORTON.y + 80, facing: Wd, hidden: true }),
    inf({ id: 'pHowe', map: 'peninsula', side: 'allied', name: 'General Howe', division: 'commanding', sheet: 'british-officer', cols: 1, rows: 1, x: pMORTON.x + 30, y: pMORTON.y, facing: Wd, hidden: true }),
    veh({ id: 'pGun', map: 'peninsula', side: 'allied', name: 'Field guns', division: 'Royal Artillery', sheet: 'british-gun', cols: 2, rows: 1, h: 36, x: pMORTON.x - 80, y: pMORTON.y - 20, facing: Wd, hidden: true }),
    inf({ id: 'pClinton', map: 'peninsula', side: 'allied', name: 'Reinforcements', division: 'General Clinton followed', sheet: 'british-regular', cols: 4, rows: 1, x: pCLINTON.x, y: pCLINTON.y, facing: N, hidden: true }),
    // ---- the redoubt
    inf({ id: 'rProv', map: 'redoubt', side: 'french', name: 'The redoubt', division: 'Colonel Prescott', sheet: 'prov-militia', cols: 4, rows: 2, x: rREDOUBT.x, y: rREDOUBT.y, facing: E, hidden: true }),
    inf({ id: 'rBreast', map: 'redoubt', side: 'french', name: 'The breastwork', division: 'Prescott’s men', sheet: 'prov-militia', cols: 3, rows: 1, x: rBREAST.x, y: rBREAST.y, facing: E, hidden: true }),
    inf({ id: 'rPigot', map: 'redoubt', side: 'allied', name: 'Pigot’s regiments', division: 'the final assault', sheet: 'british-regular', cols: 5, rows: 2, x: rSE.x, y: rSE.y, facing: Wd, hidden: true }),
    inf({ id: 'rGren', map: 'redoubt', side: 'allied', name: 'Grenadiers and Marines', division: 'the final assault', sheet: 'british-grenadier', cols: 4, rows: 2, x: rE.x, y: rE.y, facing: Wd, hidden: true })
  ];
  S.formations.forEach(f => { if (f.hidden) f.offmap = true; });
  // figures larger on the close maps, so they read at the whole-map view
  S.formations.forEach(f => { const k = { peninsula: 2.6, redoubt: 3.6, boston: 1.6 }[f.map] || 1; f.h = Math.round((f.h || 26) * k); });
  S.leaders = [];

  const EV = S.events; EV.forEach((e, i) => { e.clipNo = i + 1; e.orders = e.orders || []; e.t = i * 14; });
  const set = (i, o) => Object.assign(EV[i], o);
  const bos = (o) => Object.assign({ altMap: 'boston' }, o), red = (o) => Object.assign({ altMap: 'redoubt' }, o);
  const smoke = (ids, delay) => ids.map(id => ({ obj: id, visible: true, delay }));

  // Part 1: the siege
  set(0, bos({ zoom: 'fit', photo: Object.assign({}, IMG.pelham, { at: 4, secs: 10 }), markers: [ { ...bCAMBRIDGE, label: 'Cambridge: General Ward’s headquarters', side: 'french' }, { ...bROXBURY, label: 'Roxbury: provincial lines', side: 'french' },
    { ...bBOSTON, label: 'Boston: the British army', side: 'allied' } ], orders: [ { id: 'bWard', visible: true }, { id: 'bProspect', visible: true }, { id: 'bRox', visible: true }, { id: 'bBrit', visible: true }, { id: 'bShip', visible: true } ] }));
  set(1, bos({ zoom: 'fit', markers: [ { ...bNECKC, label: 'Charlestown Neck' }, { ...bBREED, label: 'Breed’s Hill' } ], orders: [
    { id: 'bWard', visible: true }, { id: 'bBrit', visible: true }, { id: 'bMarch', visible: true, to: bBREED, via: [off(bCAMBRIDGE, 400, -150), bNECKC], speed: 40, state: 'move', delay: 3 } ] }));
  set(2, { zoom: 1.3, focus: pREDOUBT, photo: Object.assign({}, IMG.page, { at: 4, secs: 12 }), markers: [ { ...pREDOUBT, label: 'the redoubt: digging from about midnight' } ], orders: [ { id: 'pDig', visible: true } ] });
  // Part 2: the battle
  set(3, bos({ zoom: 'fit', markers: [ { ...bCOPPS, label: 'Copp’s Hill battery', side: 'allied' }, { ...bBREED, label: 'the new fort under fire', side: 'french' } ], orders: [
    { id: 'bShip', visible: true, to: B(1380, 580), via: [B(1540, 650)], speed: 20, state: 'attack' }, { id: 'bBrit', visible: true }, { id: 'bWard', visible: true } ] }));
  set(4, bos({ zoom: 'fit', markers: [ { ...bMOULTON, label: 'Moulton’s Point: Gage’s choice' }, { ...bNECKC, label: 'Charlestown Neck: Clinton’s proposal (according to accounts)' } ], orders: [ { id: 'bBrit', visible: true }, { id: 'bShip', visible: true } ] }));
  set(5, { zoom: 'fit', markers: [ { ...pMOULTON, label: 'the landing, early afternoon', side: 'allied' } ], orders: [
    { id: 'pDig', gone: true }, { id: 'pPrescott', visible: true }, { id: 'pBreast', visible: true }, { id: 'pShip1', visible: true }, { id: 'pShip2', visible: true },
    { id: 'pBoats', visible: true, to: off(pMOULTON, -20, 60), speed: 40, state: 'move' }, { id: 'pLight', visible: true, delay: 8 }, { id: 'pGren', visible: true, delay: 9 },
    { id: 'pPigot', visible: true, delay: 10 }, { id: 'pHowe', visible: true, delay: 10 }, { id: 'pGun', visible: true, delay: 11 }, { id: 'pBoats', gone: true, delay: 14 } ] });
  set(6, { zoom: 'fit', markers: [ { ...mid(pFENCE1, pFENCE2), label: 'the rail fence and the stone wall to the Mystic ' + AP, side: 'french' } ], orders: [
    { id: 'pFence', visible: true, to: mid(pFENCE1, pFENCE2), via: [pBUNKER], speed: 40, state: 'move' }, { id: 'pBeach', visible: true, to: pBEACH, via: [off(pBUNKER, 100, -120)], speed: 40, state: 'move', delay: 1 },
    { id: 'pPutnam', visible: true, delay: 2 } ] });
  const FIRST = [ { id: 'pLight', to: off(pBEACH, 120, 30), via: [pBEACHE], speed: 22, state: 'attack' }, { id: 'pGren', to: off(mid(pFENCE1, pFENCE2), 160, 0), speed: 20, state: 'attack', delay: 1 },
    { id: 'pPigot', to: off(pREDOUBT, 200, 40), speed: 18, state: 'attack', delay: 2 }, { id: 'pPrescott', state: 'attack', delay: 6 }, { id: 'pFence', state: 'attack', delay: 6 }, { id: 'pBeach', state: 'attack', delay: 5 },
    ...smoke(['sm1', 'sm2', 'sm3'], 6),
    { id: 'pLight', to: pBEACHE, speed: 24, state: 'move', delay: 18 }, { id: 'pGren', to: off(pMORTON, -40, -90), speed: 22, state: 'move', delay: 18 }, { id: 'pPigot', to: off(pMORTON, -60, 70), speed: 22, state: 'move', delay: 19 },
    { id: 'pPrescott', state: 'hold', delay: 22 }, { id: 'pFence', state: 'hold', delay: 22 }, { id: 'pBeach', state: 'hold', delay: 22 } ];
  set(7, { zoom: 'fit', markers: [ { ...pBEACH, label: 'the beach' }, { ...pREDOUBT, label: 'the redoubt' } ], orders: FIRST });
  set(8, { zoom: 1.4, focus: pTOWN, markers: [ { ...pTOWN, label: 'Charlestown: set on fire during the fighting' } ] });
  set(9, { zoom: 'fit', markers: [ { ...pREDOUBT, label: 'driven back again' } ], orders: FIRST.filter(o => o.id !== 'pLight') });
  set(10, red({ zoom: 'fit', markers: [ { ...rREDOUBT, label: 'the final assault: over the walls' } ], orders: [
    { id: 'rProv', visible: true, state: 'attack' }, { id: 'rBreast', visible: true, state: 'attack' }, ...smoke(['sm4', 'sm5'], 2),
    { id: 'rPigot', visible: true, to: off(rREDOUBT, 140, 80), speed: 30, state: 'attack', delay: 1 }, { id: 'rGren', visible: true, to: off(rBREAST, 160, 0), speed: 30, state: 'attack', delay: 2 },
    { id: 'rProv', to: rNW, speed: 26, state: 'move', delay: 14 }, { id: 'rBreast', to: off(rNW, -100, -120), speed: 26, state: 'move', delay: 14 },
    { id: 'rPigot', to: rREDOUBT, speed: 20, state: 'move', delay: 16 } ] }));
  // Part 3: after the battle
  set(11, { zoom: 'fit', markers: [ { ...pBUNKER, label: 'Putnam tries to make a stand' }, { ...pNECK, label: 'back over the Neck' } ], orders: [
    { id: 'pPrescott', to: pBUNKER, speed: 30, state: 'move' }, { id: 'pBreast', to: off(pBUNKER, 60, 40), speed: 30, state: 'move' }, { id: 'pFence', to: off(pBUNKER, -60, 60), speed: 26, state: 'move', delay: 2 },
    { id: 'pBeach', to: off(pBUNKER, 40, -60), speed: 26, state: 'move', delay: 2 }, { id: 'pPrescott', to: pNECK, speed: 30, state: 'move', delay: 10 }, { id: 'pBreast', to: off(pNECK, 40, 30), speed: 30, state: 'move', delay: 10 },
    { id: 'pFence', to: off(pNECK, 80, 50), speed: 30, state: 'move', delay: 12 }, { id: 'pBeach', to: off(pNECK, 30, 70), speed: 30, state: 'move', delay: 12 }, { id: 'pPutnam', to: off(pNECK, 60, 10), speed: 30, state: 'move', delay: 14 },
    { id: 'pPigot', visible: true, to: pREDOUBT, speed: 20, state: 'move' }, { id: 'pGren', visible: true, to: off(pBUNKER, 300, 200), speed: 22, state: 'move', delay: 4 }, { id: 'pClinton', visible: true, to: off(pTOWN, 200, -200), speed: 20, state: 'move', delay: 2 } ] });
  set(12, { zoom: 'fit', markers: [ { ...pREDOUBT, label: 'more than a thousand British killed or wounded; about 450 provincials killed, wounded, captured or missing' } ] });
  set(13, bos({ zoom: 'fit', markers: [ { ...bCAMBRIDGE, label: 'Cambridge: Washington arrives, 2 July 1775', side: 'french' }, { ...bDORCH, label: 'Dorchester Heights, March 1776', side: 'french' },
    { ...bBREED, label: 'the Bunker Hill Monument, on Breed’s Hill' } ] }));

  // the counts, shown on screen (not narrated): each with who counted it and what it counts
  const TB = (title, rows, note) => ({ title, rows, note });
  EV[5].table = TB('The British attack: who counted', [
    ['Gage (25 June 1775)', 'first landing', 'ten companies of grenadiers, ten of light infantry, the 5th, 38th, 43rd and 52nd battalions'],
    ['Gage', 'something above 2,000', 'after the 47th and the 1st Marines joined'],
    ['Howe (22 and 24 June 1775)', 'about 2,200', 'rank and file when the attack began'],
    ['Army Historical Foundation', 'about 2,600', 'engaged overall (an estimate)']], 'Gage says Clinton followed the reinforcements. Several thousand British troops were in Boston.');
  EV[6].table = TB('The provincials: who counted', [['Prescott (letter, 1775)', 'about 1,000', 'on the night of 16 June'], ['Modern estimates', '2,000–3,000', 'at some time during the day; no return was made on the day']], 'Fewer were in the front line at any one moment.');
  EV[12].table = TB('The losses: who counted', [
    ['British official return', '226 killed · 828 wounded', '1,054 in all'],
    ['General Ward’s orderly book (Frothingham)', '115 killed · 305 wounded · 30 captured', '450'],
    ['Frothingham’s regimental table', '140 killed · 271 wounded · 30 captured', '441'],
    ['Washington, letter of 27 July 1775', '138 killed · 276 wounded · 36 missing', '450']], 'These counts are not added together.');

  // the introduction
  const IS = S.intro;
  Object.assign(IS[0], { markers: [ { ...pREDOUBT, label: 'the redoubt on Breed’s Hill' }, { ...pMOULTON, label: 'the British landing' } ] });
  Object.assign(IS[1], { altMap: 'boston', markers: [ { ...bBOSTON, label: 'Boston: the British army' }, { ...bCAMBRIDGE, label: 'Cambridge: the provincials' } ] });
  Object.assign(IS[2], { media: [IMG.page] });
  Object.assign(IS[3], { media: [IMG.pelham] });
  // the debrief returns to the battle
  S.debriefMap = 'peninsula'; S.debriefMarkers = [ { ...pREDOUBT, label: 'the redoubt: the Bunker Hill Monument stands here today' }, { ...pBUNKER, label: 'Bunker Hill' }, { ...pMOULTON, label: 'the British landing' } ];
})();
