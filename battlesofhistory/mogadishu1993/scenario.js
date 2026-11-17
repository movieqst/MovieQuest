/*
  Historical Scenario File — the Battle of Mogadishu, 3–4 October 1993
  -----------------------------------------------------------------
  The narrated introduction (`intro`), the chapters (`events`) and the debrief (`outcome`), word for word from
  NARRATION-SCRIPT.md (draft 2). This part is written by tools/make-scenario-text.py; the maps, armies and moves are set in
  the block below the marker line.
*/
window.MOGADISHU_SCENARIO = window.MOGADISHU_SCENARIO || {};
Object.assign(window.MOGADISHU_SCENARIO, {
  "id": "mogadishu1993",
  "title": "Battle of Mogadishu",
  "date": "3–4 October 1993",
  "place": "Mogadishu, Somalia; with the Somalia Affair at Beledweyne, March 1993",
  "tagline": "Aidid’s Somali National Alliance and other armed Somalis against US Task Force Ranger and the US and UN forces with it",
  "welcome": "Welcome to Battles of History. Today we are learning about the Battle of Mogadishu, fought in the capital of Somalia on the third and fourth of October 1993. It began as a raid by American special forces, and became an overnight street battle. But the battle was the end of a longer story: a civil war, a famine, and an international mission that set out to feed people and ended up at war. Part of that story happened to Canadians, in a town called Beledweyne. And many people know this battle from a film. We will tell you what is known, who says what, and what is still not known. Some chapters describe deaths, and the killing of a prisoner. We tell them plainly and without detail.",
  "intro": [
    {
      "title": "MOGADISHU 1993",
      "scriptMap": "",
      "lines": [
        {
          "text": "On the third of October 1993, American soldiers raided a building in central Mogadishu, looking for leaders of General Mohamed Farrah Aidid's movement.",
          "tag": "established"
        },
        {
          "text": "Two American helicopters were shot down. American soldiers remained around the first crash site overnight, until a rescue convoy of American, Malaysian and Pakistani troops reached them the next morning.",
          "tag": "established"
        },
        {
          "text": "Eighteen American soldiers and one Malaysian soldier were killed in the battle. The Somali dead included civilians and fighters. Estimates differ greatly, and no reliable total is known.",
          "tag": [
            "established",
            "disputed"
          ]
        },
        {
          "text": "Within days, President Bill Clinton set a deadline for withdrawing American combat forces from Somalia.",
          "tag": "established"
        },
        {
          "text": "Earlier that year, in another Somali town, Canadian soldiers had killed two Somali men. What followed in Canada became known as the Somalia Affair.",
          "tag": "established"
        }
      ]
    },
    {
      "title": "Somalia",
      "scriptMap": "Somalia",
      "lines": [
        {
          "text": "Somalia lies in the Horn of Africa, along the Indian Ocean and the Gulf of Aden. Mogadishu, its capital, is a port on the Indian Ocean.",
          "tag": "established"
        },
        {
          "text": "Most Somalis share a language and a religion, Islam. Somali society is organised into clans: large families tracing their descent through the father's line.",
          "tag": "established"
        },
        {
          "text": "Somalia also has minority communities, among them the farming peoples of the south, with their own histories.",
          "tag": "established"
        },
        {
          "text": "Clans are not armies. But in the war that followed 1991, armed movements drew their fighters and their support largely from particular clans.",
          "tag": "established"
        }
      ]
    },
    {
      "title": "The fall of Siad Barre",
      "scriptMap": "Somalia",
      "lines": [
        {
          "text": "General Mohamed Siad Barre ruled Somalia from 1969. In his last years his army fought rebel movements in the north and the south. Our page Somalia 1988 tells the story of the war in the north.",
          "tag": "established"
        },
        {
          "text": "In late January 1991, rebels of the United Somali Congress took Mogadishu, and Barre fled the capital.",
          "tag": "established"
        },
        {
          "text": "His forces regrouped in the south-west and tried to retake the capital, but he never returned to power.",
          "tag": "established"
        },
        {
          "text": "Somalia was left without a national government.",
          "tag": "established"
        }
      ]
    },
    {
      "title": "Who is who",
      "scriptMap": "",
      "lines": [
        {
          "text": "The United Somali Congress drew mostly on the Hawiye clan-family. It split almost at once into two factions.",
          "tag": "established"
        },
        {
          "text": "Ali Mahdi Mohamed declared himself interim president.",
          "tag": "established"
        },
        {
          "text": "General Mohamed Farrah Aidid refused to accept him. Aidid's faction later formed the Somali National Alliance, the SNA.",
          "tag": "established"
        },
        {
          "text": "Later in this story come the United Nations missions, called UNOSOM; a coalition led by the United States, called UNITAF; and an American special-operations force, Task Force Ranger.",
          "tag": "established"
        }
      ]
    },
    {
      "title": "Two stories, one mission",
      "scriptMap": "Somalia",
      "lines": [
        {
          "text": "This page follows two stories. Most of it is about Mogadishu and the battle of October 1993.",
          "tag": "page"
        },
        {
          "text": "Part 3 is about Canadian soldiers at Beledweyne, a town on the Shabelle River in central Somalia, in March 1993.",
          "tag": "page"
        },
        {
          "text": "The two stories happened in different places, under different missions, about seven months apart. They are linked by the intervention itself: an international effort to feed Somalia that turned to force.",
          "tag": "established"
        }
      ]
    },
    {
      "title": "How this page tells it",
      "scriptMap": "",
      "lines": [
        {
          "text": "Many numbers in this story are disputed. The tables on screen give each one with the name of whoever counted it, and what they counted.",
          "tag": "page"
        },
        {
          "text": "Courts, a national inquiry, governments, human-rights groups and journalists all appear. We tell you which one says what.",
          "tag": "page"
        },
        {
          "text": "The film Black Hawk Down has shaped how many people remember this battle. Part 7 compares the film with the history.",
          "tag": "page"
        }
      ]
    }
  ],
  "events": [
    {
      "part": 1,
      "partTitle": "War and famine, 1991 to 1992",
      "title": "A divided city",
      "scriptMap": "Mogadishu",
      "clock": "November 1991 to March 1992",
      "tag": [
        "established",
        "estimate",
        "report",
        "government"
      ],
      "lines": [
        {
          "text": "From November 1991, the forces of Ali Mahdi and General Aidid fought for Mogadishu. Ali Mahdi's forces controlled the north of the city, and Aidid's the south.",
          "tag": "established"
        },
        {
          "text": "The human-rights groups Africa Watch and Physicians for Human Rights estimated about fourteen thousand people killed and twenty-seven thousand wounded in Mogadishu, from November 1991 to the end of February 1992. Many of them were civilians.",
          "tag": [
            "estimate",
            "report"
          ]
        },
        {
          "text": "Through the fighting, Somali doctors and nurses kept caring for the wounded and the sick.",
          "tag": "report"
        },
        {
          "text": "At the end of March 1992, both leaders signed agreements with the United Nations on monitoring a ceasefire.",
          "tag": "government"
        }
      ],
      "text": "From November 1991, the forces of Ali Mahdi and General Aidid fought for Mogadishu. Ali Mahdi's forces controlled the north of the city, and Aidid's the south. The human-rights groups Africa Watch and Physicians for Human Rights estimated about fourteen thousand people killed and twenty-seven thousand wounded in Mogadishu, from November 1991 to the end of February 1992. Many of them were civilians. Through the fighting, Somali doctors and nurses kept caring for the wounded and the sick. At the end of March 1992, both leaders signed agreements with the United Nations on monitoring a ceasefire."
    },
    {
      "part": 1,
      "partTitle": "War and famine, 1991 to 1992",
      "title": "The famine",
      "scriptMap": "Somalia",
      "clock": "1991 to 1992",
      "tag": [
        "report",
        "established",
        "estimate",
        "government"
      ],
      "lines": [
        {
          "text": "War, looting and drought disrupted farming and food supplies. Hunger and disease spread.",
          "tag": "report"
        },
        {
          "text": "The famine was worst between the Juba and Shabelle rivers, around Baidoa and Bardera.",
          "tag": "established"
        },
        {
          "text": "In 1992, United Nations officials estimated that perhaps three hundred thousand people had died since November 1991, and that at least one and a half million were at immediate risk.",
          "tag": [
            "estimate",
            "government"
          ]
        },
        {
          "text": "A report by the United States Centers for Disease Control, using Red Cross and Red Crescent records, described a sharp fall in weekly deaths in Baidoa between September and November 1992, before the troops landed.",
          "tag": "report"
        }
      ],
      "text": "War, looting and drought disrupted farming and food supplies. Hunger and disease spread. The famine was worst between the Juba and Shabelle rivers, around Baidoa and Bardera. In 1992, United Nations officials estimated that perhaps three hundred thousand people had died since November 1991, and that at least one and a half million were at immediate risk. A report by the United States Centers for Disease Control, using Red Cross and Red Crescent records, described a sharp fall in weekly deaths in Baidoa between September and November 1992, before the troops landed."
    },
    {
      "part": 1,
      "partTitle": "War and famine, 1991 to 1992",
      "title": "A small United Nations mission",
      "scriptMap": "Mogadishu",
      "clock": "April to November 1992",
      "tag": "established",
      "lines": [
        {
          "text": "On the twenty-fourth of April 1992, the United Nations Security Council created the United Nations Operation in Somalia, UNOSOM, with fifty unarmed observers to watch the ceasefire.",
          "tag": "established"
        },
        {
          "text": "In September 1992, a battalion of about five hundred Pakistani soldiers began arriving, to protect Mogadishu's port and airport and the food deliveries.",
          "tag": "established"
        },
        {
          "text": "The mission depended on the consent of the factions, in a country with no government to give it. It could not stop the looting of aid.",
          "tag": "established"
        },
        {
          "text": "The United States flew in food from August 1992, in an airlift called Operation Provide Relief.",
          "tag": "established"
        }
      ],
      "text": "On the twenty-fourth of April 1992, the United Nations Security Council created the United Nations Operation in Somalia, UNOSOM, with fifty unarmed observers to watch the ceasefire. In September 1992, a battalion of about five hundred Pakistani soldiers began arriving, to protect Mogadishu's port and airport and the food deliveries. The mission depended on the consent of the factions, in a country with no government to give it. It could not stop the looting of aid. The United States flew in food from August 1992, in an airlift called Operation Provide Relief."
    },
    {
      "part": 2,
      "partTitle": "The intervention",
      "title": "\"All necessary means\"",
      "scriptMap": "Somalia",
      "clock": "December 1992",
      "tag": "established",
      "lines": [
        {
          "text": "On the third of December 1992, the Security Council voted fifteen to none for Resolution 794. It allowed member states to use \"all necessary means\" to make Somalia safe for relief work.",
          "tag": "established"
        },
        {
          "text": "The force was the Unified Task Force, UNITAF, which the Americans called Operation Restore Hope. It was authorised by the United Nations, but commanded by the United States.",
          "tag": "established"
        },
        {
          "text": "On the ninth of December 1992, American Marines came ashore at Mogadishu.",
          "tag": "established"
        }
      ],
      "text": "On the third of December 1992, the Security Council voted fifteen to none for Resolution 794. It allowed member states to use \"all necessary means\" to make Somalia safe for relief work. The force was the Unified Task Force, UNITAF, which the Americans called Operation Restore Hope. It was authorised by the United Nations, but commanded by the United States. On the ninth of December 1992, American Marines came ashore at Mogadishu."
    },
    {
      "part": 2,
      "partTitle": "The intervention",
      "title": "The coalition",
      "scriptMap": "Somalia",
      "clock": "December 1992 to May 1993",
      "tag": [
        "estimate",
        "report",
        "established"
      ],
      "lines": [
        {
          "text": "Human Rights Watch described UNITAF as about thirty-seven thousand troops, including twenty-four thousand Americans, from more than twenty countries.",
          "tag": [
            "estimate",
            "report"
          ]
        },
        {
          "text": "Southern Somalia was divided into relief sectors. Their lead contingents included Americans in Mogadishu and Bardera, Australians at Baidoa, Italians at Gialalassi, French at Oddur, and Canadians at Beledweyne.",
          "tag": "established"
        },
        {
          "text": "The soldiers guarded convoys, ports and food stores, and seized weapons.",
          "tag": "established"
        },
        {
          "text": "Relief was already reducing deaths before UNITAF arrived.",
          "tag": "report"
        }
      ],
      "text": "Human Rights Watch described UNITAF as about thirty-seven thousand troops, including twenty-four thousand Americans, from more than twenty countries. Southern Somalia was divided into relief sectors. Their lead contingents included Americans in Mogadishu and Bardera, Australians at Baidoa, Italians at Gialalassi, French at Oddur, and Canadians at Beledweyne. The soldiers guarded convoys, ports and food stores, and seized weapons. Relief was already reducing deaths before UNITAF arrived."
    },
    {
      "part": 2,
      "partTitle": "The intervention",
      "title": "Canada at Beledweyne",
      "scriptMap": "Beledweyne",
      "clock": "December 1992 to June 1993",
      "tag": [
        "government",
        "established",
        "press",
        "inquiry"
      ],
      "lines": [
        {
          "text": "Canada's part was called Operation Deliverance. Its core was the Canadian Airborne Regiment Battle Group: about nine hundred soldiers, most of them paratroopers, with armoured cars of the Royal Canadian Dragoons and a mortar company of the Royal Canadian Regiment.",
          "tag": "government"
        },
        {
          "text": "Helicopters of 427 Squadron flew with them, and the supply ship HMCS Preserver supported the mission offshore. In all, about fourteen hundred Canadians served.",
          "tag": "government"
        },
        {
          "text": "Their sector was centred on Beledweyne, which the Canadians called Belet Huen.",
          "tag": "established"
        },
        {
          "text": "They escorted convoys, repaired roads and bridges, cleared mines and helped reopen hospitals.",
          "tag": "press"
        },
        {
          "text": "In May 1993 they passed to the new United Nations mission, and most of them went home in June.",
          "tag": "government"
        },
        {
          "text": "Canada's national inquiry later found that most of these soldiers did their best, in a mission for which they had been badly prepared.",
          "tag": "inquiry"
        }
      ],
      "text": "Canada's part was called Operation Deliverance. Its core was the Canadian Airborne Regiment Battle Group: about nine hundred soldiers, most of them paratroopers, with armoured cars of the Royal Canadian Dragoons and a mortar company of the Royal Canadian Regiment. Helicopters of 427 Squadron flew with them, and the supply ship HMCS Preserver supported the mission offshore. In all, about fourteen hundred Canadians served. Their sector was centred on Beledweyne, which the Canadians called Belet Huen. They escorted convoys, repaired roads and bridges, cleared mines and helped reopen hospitals. In May 1993 they passed to the new United Nations mission, and most of them went home in June. Canada's national inquiry later found that most of these soldiers did their best, in a mission for which they had been badly prepared."
    },
    {
      "part": 2,
      "partTitle": "The intervention",
      "title": "A camp in the dark",
      "scriptMap": "Beledweyne",
      "clock": "early 1993",
      "tag": [
        "court",
        "inquiry"
      ],
      "lines": [
        {
          "text": "The Canadian camp at Beledweyne held food, fuel and equipment, in a region of deep poverty. People entered the camp at night, and some took things.",
          "tag": "court"
        },
        {
          "text": "Officers of the Airborne Regiment gave orders about how to deal with intruders. Those orders later came before courts martial and the national inquiry.",
          "tag": [
            "court",
            "inquiry"
          ]
        },
        {
          "text": "The inquiry found that problems of discipline and leadership in the regiment were known before it was sent, and were not dealt with.",
          "tag": "inquiry"
        }
      ],
      "text": "The Canadian camp at Beledweyne held food, fuel and equipment, in a region of deep poverty. People entered the camp at night, and some took things. Officers of the Airborne Regiment gave orders about how to deal with intruders. Those orders later came before courts martial and the national inquiry. The inquiry found that problems of discipline and leadership in the regiment were known before it was sent, and were not dealt with."
    },
    {
      "part": 3,
      "partTitle": "The Somalia Affair",
      "title": "The fourth of March",
      "scriptMap": "Beledweyne",
      "clock": "4 March 1993",
      "tag": [
        "established",
        "inquiry",
        "court"
      ],
      "lines": [
        {
          "text": "On the night of the fourth of March 1993, soldiers of the Airborne's reconnaissance platoon shot two Somali men near the Canadian compound.",
          "tag": "established"
        },
        {
          "text": "Ahmed Arush was killed. Abdi Hunde Bei Sabrie was wounded.",
          "tag": "established"
        },
        {
          "text": "A Canadian army surgeon, Major Barry Armstrong, raised concerns about how Arush had died.",
          "tag": "inquiry"
        },
        {
          "text": "The officer in command, Captain Michel Rainville, was tried in 1994 and acquitted.",
          "tag": "court"
        },
        {
          "text": "The inquiry found serious failures in the response to the shooting, and examined the cover-up that followed.",
          "tag": "inquiry"
        }
      ],
      "text": "On the night of the fourth of March 1993, soldiers of the Airborne's reconnaissance platoon shot two Somali men near the Canadian compound. Ahmed Arush was killed. Abdi Hunde Bei Sabrie was wounded. A Canadian army surgeon, Major Barry Armstrong, raised concerns about how Arush had died. The officer in command, Captain Michel Rainville, was tried in 1994 and acquitted. The inquiry found serious failures in the response to the shooting, and examined the cover-up that followed."
    },
    {
      "part": 3,
      "partTitle": "The Somalia Affair",
      "title": "The sixteenth of March",
      "scriptMap": "Beledweyne",
      "clock": "16 March 1993",
      "tag": [
        "established",
        "court",
        "page",
        "inquiry"
      ],
      "lines": [
        {
          "text": "On the sixteenth of March 1993, Canadian soldiers captured sixteen-year-old Shidane Abukar Arone and brought him into Canadian custody.",
          "tag": "established"
        },
        {
          "text": "That night, he was tortured and killed in Canadian custody.",
          "tag": "court"
        },
        {
          "text": "Soldiers took photographs that night. They later became evidence. This page does not show them.",
          "tag": [
            "established",
            "page"
          ]
        },
        {
          "text": "The inquiry tied the handling of the fourth of March to what happened twelve days later.",
          "tag": "inquiry"
        }
      ],
      "text": "On the sixteenth of March 1993, Canadian soldiers captured sixteen-year-old Shidane Abukar Arone and brought him into Canadian custody. That night, he was tortured and killed in Canadian custody. Soldiers took photographs that night. They later became evidence. This page does not show them. The inquiry tied the handling of the fourth of March to what happened twelve days later."
    },
    {
      "part": 3,
      "partTitle": "The Somalia Affair",
      "title": "Before the courts",
      "scriptMap": "Beledweyne",
      "clock": "1993 to 2008",
      "tag": [
        "established",
        "court",
        "witness",
        "inquiry"
      ],
      "lines": [
        {
          "text": "Master Corporal Clayton Matchee was charged with second-degree murder and torture. After an attempt to take his own life in custody, he suffered a permanent brain injury.",
          "tag": "established"
        },
        {
          "text": "In 1994 he was found unfit to stand trial. In 2008 the charges were withdrawn, because he would never be fit. He was never tried, and no court decided his guilt.",
          "tag": "court"
        },
        {
          "text": "His wife later said that an anti-malaria drug, mefloquine, given to soldiers in Somalia, had changed his behaviour. No court tested her claim. The inquiry discussed the drug, but could not reach a final conclusion about its role in misconduct.",
          "tag": [
            "witness",
            "inquiry"
          ]
        },
        {
          "text": "Private Kyle Brown was convicted of manslaughter and torture in March 1994. He was sentenced to five years in prison and dismissed from the army with disgrace. His appeal was dismissed in January 1995.",
          "tag": "court"
        }
      ],
      "text": "Master Corporal Clayton Matchee was charged with second-degree murder and torture. After an attempt to take his own life in custody, he suffered a permanent brain injury. In 1994 he was found unfit to stand trial. In 2008 the charges were withdrawn, because he would never be fit. He was never tried, and no court decided his guilt. His wife later said that an anti-malaria drug, mefloquine, given to soldiers in Somalia, had changed his behaviour. No court tested her claim. The inquiry discussed the drug, but could not reach a final conclusion about its role in misconduct. Private Kyle Brown was convicted of manslaughter and torture in March 1994. He was sentenced to five years in prison and dismissed from the army with disgrace. His appeal was dismissed in January 1995."
    },
    {
      "part": 3,
      "partTitle": "The Somalia Affair",
      "title": "Officers on trial",
      "scriptMap": "Beledweyne",
      "clock": "1994 to 1996",
      "tag": [
        "court",
        "inquiry"
      ],
      "lines": [
        {
          "text": "Sergeant Mark Boland, in charge of the guard that night, pleaded guilty to negligent performance of duty. On appeal, his sentence was increased to a year in prison.",
          "tag": "court"
        },
        {
          "text": "Major Anthony Seward, the company commander, was acquitted of causing bodily harm, and convicted of negligent performance of duty. On appeal, his punishment was raised to three months in prison and dismissal.",
          "tag": "court"
        },
        {
          "text": "The regiment's commander, Lieutenant Colonel Carol Mathieu, was charged over his orders about intruders. He was acquitted. An appeal court ordered a new trial, and he was acquitted again.",
          "tag": "court"
        },
        {
          "text": "The courts decided the guilt of individuals. The inquiry looked at the leadership, and was critical of senior officers.",
          "tag": "inquiry"
        }
      ],
      "text": "Sergeant Mark Boland, in charge of the guard that night, pleaded guilty to negligent performance of duty. On appeal, his sentence was increased to a year in prison. Major Anthony Seward, the company commander, was acquitted of causing bodily harm, and convicted of negligent performance of duty. On appeal, his punishment was raised to three months in prison and dismissal. The regiment's commander, Lieutenant Colonel Carol Mathieu, was charged over his orders about intruders. He was acquitted. An appeal court ordered a new trial, and he was acquitted again. The courts decided the guilt of individuals. The inquiry looked at the leadership, and was critical of senior officers."
    },
    {
      "part": 3,
      "partTitle": "The Somalia Affair",
      "title": "A regiment disbanded",
      "scriptMap": "Beledweyne",
      "clock": "1995",
      "tag": [
        "established",
        "government"
      ],
      "lines": [
        {
          "text": "In January 1995, two videos became public: one recorded in Somalia, and one of a hazing ritual inside the regiment in Canada in 1992, with racist content.",
          "tag": "established"
        },
        {
          "text": "The government decided to disband the Canadian Airborne Regiment. It closed in March 1995.",
          "tag": "government"
        },
        {
          "text": "The regiment had served Canada since 1968. Many of its soldiers had served honourably, in Somalia and elsewhere.",
          "tag": "established"
        }
      ],
      "text": "In January 1995, two videos became public: one recorded in Somalia, and one of a hazing ritual inside the regiment in Canada in 1992, with racist content. The government decided to disband the Canadian Airborne Regiment. It closed in March 1995. The regiment had served Canada since 1968. Many of its soldiers had served honourably, in Somalia and elsewhere."
    },
    {
      "part": 3,
      "partTitle": "The Somalia Affair",
      "title": "The inquiry",
      "scriptMap": "Beledweyne",
      "clock": "1995 to 1997",
      "tag": [
        "government",
        "inquiry",
        "established"
      ],
      "lines": [
        {
          "text": "On the twentieth of March 1995, the government appointed the Commission of Inquiry into the Deployment of Canadian Forces to Somalia, chaired by Justice Gilles Létourneau.",
          "tag": "government"
        },
        {
          "text": "The inquiry found that senior officers had failed in their leadership, and examined altered and missing documents.",
          "tag": "inquiry"
        },
        {
          "text": "The inquiry found that General Jean Boyle, later Chief of the Defence Staff, had been a party to the decision to release altered documents. That is an inquiry finding, not a criminal verdict.",
          "tag": "inquiry"
        },
        {
          "text": "In January 1997, the government set a deadline of June 1997, and the hearings were cut short. The government cited time and cost. The commissioners wrote that this left their work on Somalia itself unfinished.",
          "tag": [
            "government",
            "inquiry"
          ]
        },
        {
          "text": "The commission handed in its report at the end of June 1997. It was published in July, as Dishonoured Legacy: The Lessons of the Somalia Affair.",
          "tag": "established"
        }
      ],
      "text": "On the twentieth of March 1995, the government appointed the Commission of Inquiry into the Deployment of Canadian Forces to Somalia, chaired by Justice Gilles Létourneau. The inquiry found that senior officers had failed in their leadership, and examined altered and missing documents. The inquiry found that General Jean Boyle, later Chief of the Defence Staff, had been a party to the decision to release altered documents. That is an inquiry finding, not a criminal verdict. In January 1997, the government set a deadline of June 1997, and the hearings were cut short. The government cited time and cost. The commissioners wrote that this left their work on Somalia itself unfinished. The commission handed in its report at the end of June 1997. It was published in July, as Dishonoured Legacy: The Lessons of the Somalia Affair."
    },
    {
      "part": 3,
      "partTitle": "The Somalia Affair",
      "title": "The victims",
      "scriptMap": "Beledweyne",
      "clock": "1993 to 1999",
      "tag": [
        "established",
        "inquiry"
      ],
      "lines": [
        {
          "text": "Ahmed Arush and Shidane Arone were Somalis who came near a foreign army's camp, in a time of hunger and war.",
          "tag": "established"
        },
        {
          "text": "Shidane Arone's family later sought damages from the Canadian government in an Ontario court.",
          "tag": "established"
        },
        {
          "text": "In Canada, the affair prompted demands for changes in military leadership and military justice.",
          "tag": "inquiry"
        }
      ],
      "text": "Ahmed Arush and Shidane Arone were Somalis who came near a foreign army's camp, in a time of hunger and war. Shidane Arone's family later sought damages from the Canadian government in an Ontario court. In Canada, the affair prompted demands for changes in military leadership and military justice."
    },
    {
      "part": 4,
      "partTitle": "UNOSOM II and the hunt for Aidid",
      "title": "A bigger mandate",
      "scriptMap": "Mogadishu",
      "clock": "March to May 1993",
      "tag": [
        "established",
        "government"
      ],
      "lines": [
        {
          "text": "On the twenty-sixth of March 1993, the Security Council created a new mission, UNOSOM II. It was commanded by the United Nations and allowed to use force. Its mandate included disarming the factions and helping rebuild Somalia's institutions.",
          "tag": "established"
        },
        {
          "text": "On the fourth of May 1993, UNITAF handed over to UNOSOM II.",
          "tag": "established"
        },
        {
          "text": "Its force commander was Turkish Lieutenant General Çevik Bir. Retired American Admiral Jonathan Howe led the mission for the Secretary-General.",
          "tag": "established"
        },
        {
          "text": "About eleven hundred American soldiers formed a Quick Reaction Force: a reserve ready to move fast in an emergency. It supported UNOSOM II, while remaining under an American chain of command.",
          "tag": "government"
        }
      ],
      "text": "On the twenty-sixth of March 1993, the Security Council created a new mission, UNOSOM II. It was commanded by the United Nations and allowed to use force. Its mandate included disarming the factions and helping rebuild Somalia's institutions. On the fourth of May 1993, UNITAF handed over to UNOSOM II. Its force commander was Turkish Lieutenant General Çevik Bir. Retired American Admiral Jonathan Howe led the mission for the Secretary-General. About eleven hundred American soldiers formed a Quick Reaction Force: a reserve ready to move fast in an emergency. It supported UNOSOM II, while remaining under an American chain of command."
    },
    {
      "part": 4,
      "partTitle": "UNOSOM II and the hunt for Aidid",
      "title": "The fifth of June",
      "scriptMap": "Mogadishu",
      "clock": "5 June 1993",
      "tag": [
        "established",
        "government",
        "sna",
        "disputed"
      ],
      "lines": [
        {
          "text": "On the fifth of June 1993, Pakistani peacekeepers inspected SNA weapon stores, including one at Radio Mogadishu, which Aidid's movement used.",
          "tag": "established"
        },
        {
          "text": "They were attacked in several places in the city. The United Nations investigator Tom Farer reported twenty-four Pakistani soldiers killed and fifty-six wounded.",
          "tag": "government"
        },
        {
          "text": "Farer's investigation concluded that there was \"clear and convincing\" evidence that Aidid had authorised the attack. It was an investigation, not a trial. Aidid denied it.",
          "tag": [
            "government",
            "sna"
          ]
        },
        {
          "text": "A later United Nations commission, in 1994, discussed the evidence again. Responsibility remained contested.",
          "tag": [
            "government",
            "disputed"
          ]
        }
      ],
      "text": "On the fifth of June 1993, Pakistani peacekeepers inspected SNA weapon stores, including one at Radio Mogadishu, which Aidid's movement used. They were attacked in several places in the city. The United Nations investigator Tom Farer reported twenty-four Pakistani soldiers killed and fifty-six wounded. Farer's investigation concluded that there was \"clear and convincing\" evidence that Aidid had authorised the attack. It was an investigation, not a trial. Aidid denied it. A later United Nations commission, in 1994, discussed the evidence again. Responsibility remained contested."
    },
    {
      "part": 4,
      "partTitle": "UNOSOM II and the hunt for Aidid",
      "title": "Resolution 837",
      "scriptMap": "Mogadishu",
      "clock": "June 1993",
      "tag": [
        "established",
        "report",
        "government",
        "sna"
      ],
      "lines": [
        {
          "text": "On the sixth of June, the Security Council condemned the attack and authorised action against those responsible, including their arrest for trial.",
          "tag": "established"
        },
        {
          "text": "From the twelfth of June, United Nations and American forces attacked SNA sites in Mogadishu.",
          "tag": "established"
        },
        {
          "text": "On the thirteenth of June, Pakistani United Nations troops reportedly shot dead about twenty Somali demonstrators, according to Amnesty International.",
          "tag": "report"
        },
        {
          "text": "Admiral Howe ordered Aidid's arrest and offered a reward of twenty-five thousand dollars.",
          "tag": "report"
        },
        {
          "text": "United Nations leaders presented the campaign as enforcing the mandate and arresting those responsible. Aidid's supporters described it as foreign intervention against their side.",
          "tag": [
            "government",
            "sna"
          ]
        }
      ],
      "text": "On the sixth of June, the Security Council condemned the attack and authorised action against those responsible, including their arrest for trial. From the twelfth of June, United Nations and American forces attacked SNA sites in Mogadishu. On the thirteenth of June, Pakistani United Nations troops reportedly shot dead about twenty Somali demonstrators, according to Amnesty International. Admiral Howe ordered Aidid's arrest and offered a reward of twenty-five thousand dollars. United Nations leaders presented the campaign as enforcing the mandate and arresting those responsible. Aidid's supporters described it as foreign intervention against their side."
    },
    {
      "part": 4,
      "partTitle": "UNOSOM II and the hunt for Aidid",
      "title": "The twelfth of July",
      "scriptMap": "Mogadishu",
      "clock": "12 July 1993",
      "tag": [
        "established",
        "government",
        "press",
        "disputed",
        "estimate",
        "report",
        "sna"
      ],
      "lines": [
        {
          "text": "On the twelfth of July 1993, American helicopters attacked a house in Mogadishu, the Abdi House, where, by the American and United Nations account, SNA leaders were meeting.",
          "tag": [
            "established",
            "government"
          ]
        },
        {
          "text": "Other accounts describe a meeting of clan elders, some of them discussing peace proposals.",
          "tag": [
            "press",
            "disputed"
          ]
        },
        {
          "text": "The United Nations first said at least thirteen people were killed. Human Rights Watch reported that the Red Cross counted at least fifty-four dead. The SNA said seventy-three.",
          "tag": [
            "estimate",
            "government",
            "report",
            "sna"
          ]
        },
        {
          "text": "Afterwards, an angry crowd killed four journalists who came to the scene: Dan Eldon, Hos Maina, Anthony Macharia and Hansi Krauss.",
          "tag": "established"
        },
        {
          "text": "After the raid, Aidid's movement attacked American forces directly.",
          "tag": "established"
        }
      ],
      "text": "On the twelfth of July 1993, American helicopters attacked a house in Mogadishu, the Abdi House, where, by the American and United Nations account, SNA leaders were meeting. Other accounts describe a meeting of clan elders, some of them discussing peace proposals. The United Nations first said at least thirteen people were killed. Human Rights Watch reported that the Red Cross counted at least fifty-four dead. The SNA said seventy-three. Afterwards, an angry crowd killed four journalists who came to the scene: Dan Eldon, Hos Maina, Anthony Macharia and Hansi Krauss. After the raid, Aidid's movement attacked American forces directly."
    },
    {
      "part": 4,
      "partTitle": "UNOSOM II and the hunt for Aidid",
      "title": "Task Force Ranger",
      "scriptMap": "Mogadishu",
      "clock": "August to September 1993",
      "tag": [
        "established",
        "government"
      ],
      "lines": [
        {
          "text": "On the eighth of August 1993, a roadside bomb killed four American military police.",
          "tag": "established"
        },
        {
          "text": "The United States sent a special-operations task force under Major General William Garrison. It was ordered out on the twenty-second of August, and its main parts were in Mogadishu by the twenty-eighth.",
          "tag": "government"
        },
        {
          "text": "It was made of Army Rangers, the Delta Force, helicopter crews of the 160th Special Operations Aviation Regiment, Navy SEALs, and Air Force rescue specialists.",
          "tag": "government"
        },
        {
          "text": "Its first raid detained United Nations workers by mistake. In six raids before October it arrested SNA members, but never found Aidid.",
          "tag": "government"
        },
        {
          "text": "On the twenty-fifth of September, Aidid's fighters shot down an American Black Hawk helicopter, and three American soldiers were killed.",
          "tag": "established"
        }
      ],
      "text": "On the eighth of August 1993, a roadside bomb killed four American military police. The United States sent a special-operations task force under Major General William Garrison. It was ordered out on the twenty-second of August, and its main parts were in Mogadishu by the twenty-eighth. It was made of Army Rangers, the Delta Force, helicopter crews of the 160th Special Operations Aviation Regiment, Navy SEALs, and Air Force rescue specialists. Its first raid detained United Nations workers by mistake. In six raids before October it arrested SNA members, but never found Aidid. On the twenty-fifth of September, Aidid's fighters shot down an American Black Hawk helicopter, and three American soldiers were killed."
    },
    {
      "part": 5,
      "partTitle": "The battle, 3 and 4 October 1993",
      "title": "The raid",
      "scriptMap": "Battle",
      "clock": "3 October 1993, about 3:30 pm",
      "tag": [
        "government",
        "established"
      ],
      "lines": [
        {
          "text": "On Sunday the third of October 1993, Task Force Ranger received word that two of Aidid's senior advisers were meeting in a building near the Olympic Hotel, close to the Bakara Market.",
          "tag": "government"
        },
        {
          "text": "At about half past three in the afternoon, the helicopters took off. Soldiers of the Delta Force landed at the building, and Rangers slid down ropes to guard the streets around it. A convoy of trucks and Humvees drove in to take the prisoners away.",
          "tag": "established"
        },
        {
          "text": "They took twenty-four prisoners. Aidid was not there.",
          "tag": "established"
        },
        {
          "text": "Then the force came under fire from across the neighbourhood, from SNA fighters and other armed men.",
          "tag": "established"
        }
      ],
      "text": "On Sunday the third of October 1993, Task Force Ranger received word that two of Aidid's senior advisers were meeting in a building near the Olympic Hotel, close to the Bakara Market. At about half past three in the afternoon, the helicopters took off. Soldiers of the Delta Force landed at the building, and Rangers slid down ropes to guard the streets around it. A convoy of trucks and Humvees drove in to take the prisoners away. They took twenty-four prisoners. Aidid was not there. Then the force came under fire from across the neighbourhood, from SNA fighters and other armed men."
    },
    {
      "part": 5,
      "partTitle": "The battle, 3 and 4 October 1993",
      "title": "Super Six-One",
      "scriptMap": "Battle",
      "clock": "3 October 1993, late afternoon",
      "tag": "established",
      "lines": [
        {
          "text": "Later that afternoon, a Black Hawk called Super Six-One was shot down by a rocket-propelled grenade, a few streets from the target. Both pilots were killed.",
          "tag": "established"
        },
        {
          "text": "Most of the raiding force moved on foot to the crash site, to protect the crew.",
          "tag": "established"
        },
        {
          "text": "The convoy with the prisoners tried to reach them, lost its way in narrow streets under fire, and had to turn back.",
          "tag": "established"
        }
      ],
      "text": "Later that afternoon, a Black Hawk called Super Six-One was shot down by a rocket-propelled grenade, a few streets from the target. Both pilots were killed. Most of the raiding force moved on foot to the crash site, to protect the crew. The convoy with the prisoners tried to reach them, lost its way in narrow streets under fire, and had to turn back."
    },
    {
      "part": 5,
      "partTitle": "The battle, 3 and 4 October 1993",
      "title": "Super Six-Four",
      "scriptMap": "Battle",
      "clock": "3 October 1993, late afternoon",
      "tag": [
        "established",
        "government"
      ],
      "lines": [
        {
          "text": "Soon afterwards, a second Black Hawk, Super Six-Four, flown by Michael Durant, came down less than a mile to the south.",
          "tag": "established"
        },
        {
          "text": "Two Delta Force snipers, Master Sergeant Gary Gordon and Sergeant First Class Randy Shughart, volunteered to be put down to protect the crew.",
          "tag": "government"
        },
        {
          "text": "Both were killed. Durant, the only survivor, was taken prisoner.",
          "tag": "established"
        },
        {
          "text": "Gordon and Shughart received the Medal of Honor after their deaths, for their actions in Mogadishu.",
          "tag": "government"
        }
      ],
      "text": "Soon afterwards, a second Black Hawk, Super Six-Four, flown by Michael Durant, came down less than a mile to the south. Two Delta Force snipers, Master Sergeant Gary Gordon and Sergeant First Class Randy Shughart, volunteered to be put down to protect the crew. Both were killed. Durant, the only survivor, was taken prisoner. Gordon and Shughart received the Medal of Honor after their deaths, for their actions in Mogadishu."
    },
    {
      "part": 5,
      "partTitle": "The battle, 3 and 4 October 1993",
      "title": "The night",
      "scriptMap": "Battle",
      "clock": "3 to 4 October 1993, night",
      "tag": "established",
      "lines": [
        {
          "text": "American soldiers spent the night around the first crash site, in houses and courtyards, under fire.",
          "tag": "established"
        },
        {
          "text": "Helicopters flew all night to support them.",
          "tag": "established"
        },
        {
          "text": "Around them, the people of the neighbourhood were caught in the fighting. The Somali dead and wounded included both fighters and civilians.",
          "tag": "established"
        }
      ],
      "text": "American soldiers spent the night around the first crash site, in houses and courtyards, under fire. Helicopters flew all night to support them. Around them, the people of the neighbourhood were caught in the fighting. The Somali dead and wounded included both fighters and civilians."
    },
    {
      "part": 5,
      "partTitle": "The battle, 3 and 4 October 1993",
      "title": "The rescue convoy",
      "scriptMap": "Battle",
      "clock": "4 October 1993, about 2 am",
      "tag": [
        "established",
        "witness",
        "press"
      ],
      "lines": [
        {
          "text": "A rescue force gathered at Mogadishu's New Port: American soldiers of the 10th Mountain Division, with Malaysian armoured carriers and Pakistani tanks, serving with the United Nations.",
          "tag": "established"
        },
        {
          "text": "The Malaysian commander, Brigadier-General Abdul Latif Ahmad, later said a hundred and thirteen Malaysian soldiers took part, in thirty-two armoured carriers.",
          "tag": [
            "witness",
            "press"
          ]
        },
        {
          "text": "The convoy left late that evening, fought through the city, and reached the trapped soldiers at about two in the morning.",
          "tag": "established"
        },
        {
          "text": "A Malaysian soldier, Mat Aznan Awang, was killed in the rescue.",
          "tag": "press"
        }
      ],
      "text": "A rescue force gathered at Mogadishu's New Port: American soldiers of the 10th Mountain Division, with Malaysian armoured carriers and Pakistani tanks, serving with the United Nations. The Malaysian commander, Brigadier-General Abdul Latif Ahmad, later said a hundred and thirteen Malaysian soldiers took part, in thirty-two armoured carriers. The convoy left late that evening, fought through the city, and reached the trapped soldiers at about two in the morning. A Malaysian soldier, Mat Aznan Awang, was killed in the rescue."
    },
    {
      "part": 5,
      "partTitle": "The battle, 3 and 4 October 1993",
      "title": "The Mogadishu Mile",
      "scriptMap": "Battle",
      "clock": "4 October 1993, about 6 am",
      "tag": "established",
      "lines": [
        {
          "text": "Shortly before six in the morning, the convoy pulled out. There was not room in the vehicles for everyone, so some soldiers had to move on foot, under fire, to meet vehicles further on. This became known as the Mogadishu Mile.",
          "tag": "established"
        },
        {
          "text": "The main rescue convoy reached the stadium held by the Pakistani battalion at about half past six.",
          "tag": "established"
        }
      ],
      "text": "Shortly before six in the morning, the convoy pulled out. There was not room in the vehicles for everyone, so some soldiers had to move on foot, under fire, to meet vehicles further on. This became known as the Mogadishu Mile. The main rescue convoy reached the stadium held by the Pakistani battalion at about half past six."
    },
    {
      "part": 5,
      "partTitle": "The battle, 3 and 4 October 1993",
      "title": "Who died",
      "scriptMap": "Battle",
      "clock": "3 and 4 October 1993",
      "tag": [
        "established",
        "sna",
        "report",
        "disputed",
        "estimate"
      ],
      "lines": [
        {
          "text": "Eighteen American soldiers were killed in the battle, and more than seventy were wounded. Two days later, a mortar strike killed one more.",
          "tag": "established"
        },
        {
          "text": "One Malaysian soldier was killed. Malaysian and Pakistani soldiers were wounded.",
          "tag": "established"
        },
        {
          "text": "The Somali dead included both fighters and civilians. An SNA officer, Captain Haad, later said a hundred and thirty-three of its militiamen were killed. That counts only the militia. Human Rights Watch reported more than two hundred Somalis killed. No reliable total is known.",
          "tag": [
            "sna",
            "report",
            "disputed"
          ]
        },
        {
          "text": "By the end of October, Africa Watch estimated that United States and United Nations forces had killed at least five to six hundred Somalis in the whole confrontation, including this battle.",
          "tag": [
            "estimate",
            "report"
          ]
        }
      ],
      "text": "Eighteen American soldiers were killed in the battle, and more than seventy were wounded. Two days later, a mortar strike killed one more. One Malaysian soldier was killed. Malaysian and Pakistani soldiers were wounded. The Somali dead included both fighters and civilians. An SNA officer, Captain Haad, later said a hundred and thirty-three of its militiamen were killed. That counts only the militia. Human Rights Watch reported more than two hundred Somalis killed. No reliable total is known. By the end of October, Africa Watch estimated that United States and United Nations forces had killed at least five to six hundred Somalis in the whole confrontation, including this battle."
    },
    {
      "part": 6,
      "partTitle": "Aftermath",
      "title": "The pilot and the deadline",
      "scriptMap": "Mogadishu",
      "clock": "October 1993 to March 1994",
      "tag": [
        "established",
        "government"
      ],
      "lines": [
        {
          "text": "Television reports of the American deaths and of the captured pilot shocked many Americans.",
          "tag": "established"
        },
        {
          "text": "On the seventh of October 1993, President Clinton sent more troops, but set the end of March 1994 as the deadline for withdrawing American combat forces, with a small support force allowed to remain.",
          "tag": "government"
        },
        {
          "text": "Michael Durant was released on the fourteenth of October, after eleven days, together with a Nigerian peacekeeper. President Clinton said no deal had been made.",
          "tag": [
            "established",
            "government"
          ]
        },
        {
          "text": "Defence Secretary Les Aspin had refused a request for tanks and armoured vehicles before the raid. He resigned in December 1993.",
          "tag": "established"
        }
      ],
      "text": "Television reports of the American deaths and of the captured pilot shocked many Americans. On the seventh of October 1993, President Clinton sent more troops, but set the end of March 1994 as the deadline for withdrawing American combat forces, with a small support force allowed to remain. Michael Durant was released on the fourteenth of October, after eleven days, together with a Nigerian peacekeeper. President Clinton said no deal had been made. Defence Secretary Les Aspin had refused a request for tanks and armoured vehicles before the raid. He resigned in December 1993."
    },
    {
      "part": 6,
      "partTitle": "Aftermath",
      "title": "Leaving",
      "scriptMap": "Somalia",
      "clock": "1994 to 1995",
      "tag": [
        "government",
        "established"
      ],
      "lines": [
        {
          "text": "The American combat forces left Somalia by the end of March 1994. A small number of American troops stayed until September.",
          "tag": "government"
        },
        {
          "text": "UNOSOM II continued for another year. American troops returned briefly to help the final United Nations withdrawal, in March 1995.",
          "tag": "government"
        },
        {
          "text": "Somalia remained without an effective national government for many years.",
          "tag": "established"
        }
      ],
      "text": "The American combat forces left Somalia by the end of March 1994. A small number of American troops stayed until September. UNOSOM II continued for another year. American troops returned briefly to help the final United Nations withdrawal, in March 1995. Somalia remained without an effective national government for many years."
    },
    {
      "part": 6,
      "partTitle": "Aftermath",
      "title": "A long shadow",
      "scriptMap": "Somalia",
      "clock": "1994",
      "tag": [
        "established",
        "scholarship"
      ],
      "lines": [
        {
          "text": "In April 1994, genocide began in Rwanda. United Nations peacekeepers were already in Rwanda. After the genocide began, their force was cut back, and enough reinforcements did not arrive in time to stop it.",
          "tag": "established"
        },
        {
          "text": "The United States decided not to send its own troops.",
          "tag": "established"
        },
        {
          "text": "Some former officials and historians say the memory of Mogadishu weighed on these decisions. Others point out that a stricter American policy on peacekeeping was already being written before the battle.",
          "tag": "scholarship"
        },
        {
          "text": "Somalia influenced policy, but it was not the only reason for the failure to act.",
          "tag": "scholarship"
        }
      ],
      "text": "In April 1994, genocide began in Rwanda. United Nations peacekeepers were already in Rwanda. After the genocide began, their force was cut back, and enough reinforcements did not arrive in time to stop it. The United States decided not to send its own troops. Some former officials and historians say the memory of Mogadishu weighed on these decisions. Others point out that a stricter American policy on peacekeeping was already being written before the battle. Somalia influenced policy, but it was not the only reason for the failure to act."
    },
    {
      "part": 7,
      "partTitle": "The film and the history",
      "title": "Mogadishu in Morocco",
      "scriptMap": "Rabat",
      "clock": "March to June 2001",
      "tag": [
        "established",
        "government",
        "page"
      ],
      "lines": [
        {
          "text": "In 2001, the director Ridley Scott made the film Black Hawk Down, from a book by the journalist Mark Bowden.",
          "tag": "established"
        },
        {
          "text": "Filming began on the eighth of March 2001, at Kénitra, and continued until June, mostly in Rabat and the neighbouring city of Salé.",
          "tag": "established"
        },
        {
          "text": "Streets in Salé were painted and signed to stand in for Mogadishu.",
          "tag": "established"
        },
        {
          "text": "The United States Army lent helicopters and soldiers from the units that fought in Mogadishu.",
          "tag": "government"
        },
        {
          "text": "On this map, the film's places are approximate. The real places are on the Battle map.",
          "tag": "page"
        }
      ],
      "text": "In 2001, the director Ridley Scott made the film Black Hawk Down, from a book by the journalist Mark Bowden. Filming began on the eighth of March 2001, at Kénitra, and continued until June, mostly in Rabat and the neighbouring city of Salé. Streets in Salé were painted and signed to stand in for Mogadishu. The United States Army lent helicopters and soldiers from the units that fought in Mogadishu. On this map, the film's places are approximate. The real places are on the Battle map."
    },
    {
      "part": 7,
      "partTitle": "The film and the history",
      "title": "What the film changes",
      "scriptMap": "Rabat",
      "clock": "2001 to 2002",
      "tag": [
        "witness",
        "press",
        "film",
        "government",
        "established",
        "page"
      ],
      "lines": [
        {
          "text": "The film follows the battle from the American side. At its premiere in 2002, the Army's vice chief of staff, General Jack Keane, called it authentic, and the Ranger veteran Matt Eversmann praised it, while noting changes made \"for the sake of filmmaking\".",
          "tag": [
            "witness",
            "press"
          ]
        },
        {
          "text": "The film briefly introduces the famine and the intervention, but gives little of the political history that led to the raid.",
          "tag": "film"
        },
        {
          "text": "It gives little part to the Malaysian and Pakistani soldiers of the rescue convoy. In 2002, Malaysia's defence minister, Najib Razak, publicly regretted that.",
          "tag": [
            "government",
            "press"
          ]
        },
        {
          "text": "Somalis appear mostly as a crowd. Some Somali viewers and critics objected to that portrayal.",
          "tag": [
            "film",
            "press"
          ]
        },
        {
          "text": "Some characters are combined or renamed.",
          "tag": "established"
        },
        {
          "text": "The historical Mogadishu Mile ended at a meeting with vehicles, which carried the soldiers on.",
          "tag": "established"
        },
        {
          "text": "The film ends soon after the battle. It does not show Durant's eleven days in captivity, or what followed.",
          "tag": "film"
        },
        {
          "text": "A film can help us imagine what it was like for the people it shows. History asks also about the people it does not show.",
          "tag": "page"
        }
      ],
      "text": "The film follows the battle from the American side. At its premiere in 2002, the Army's vice chief of staff, General Jack Keane, called it authentic, and the Ranger veteran Matt Eversmann praised it, while noting changes made \"for the sake of filmmaking\". The film briefly introduces the famine and the intervention, but gives little of the political history that led to the raid. It gives little part to the Malaysian and Pakistani soldiers of the rescue convoy. In 2002, Malaysia's defence minister, Najib Razak, publicly regretted that. Somalis appear mostly as a crowd. Some Somali viewers and critics objected to that portrayal. Some characters are combined or renamed. The historical Mogadishu Mile ended at a meeting with vehicles, which carried the soldiers on. The film ends soon after the battle. It does not show Durant's eleven days in captivity, or what followed. A film can help us imagine what it was like for the people it shows. History asks also about the people it does not show."
    }
  ],
  "outcome": [
    {
      "text": "After Barre's fall in 1991, war between the factions, looting and drought caused a famine. United Nations officials estimated that perhaps three hundred thousand people died.",
      "tag": [
        "estimate",
        "government"
      ],
      "heading": "What happened"
    },
    {
      "text": "The world sent first a small United Nations mission, then a large coalition led by the United States, to protect food deliveries.",
      "tag": "established"
    },
    {
      "text": "After the attack on Pakistani peacekeepers in June 1993, United Nations and American forces fought General Aidid's movement. The October battle became a turning point in the intervention.",
      "tag": "established"
    },
    {
      "text": "American soldiers were trapped overnight, and were rescued by a convoy of American, Malaysian and Pakistani troops.",
      "tag": "established"
    },
    {
      "text": "Afterwards the American combat forces withdrew, and the United Nations followed in 1995.",
      "tag": "established"
    },
    {
      "text": "Eighteen American soldiers and one Malaysian soldier were killed in the battle.",
      "tag": "established",
      "heading": "The numbers (see the tables on screen)"
    },
    {
      "text": "The Somali dead included civilians and fighters. Estimates differ greatly, and no reliable total is known.",
      "tag": "disputed"
    },
    {
      "text": "Each count on this page counts something different: all deaths, or fighters only, or a longer period. They cannot be added together.",
      "tag": "page"
    },
    {
      "text": "Canadian soldiers killed Ahmed Arush on the fourth of March 1993, and Shidane Arone in their custody on the sixteenth of March 1993.",
      "tag": "established",
      "heading": "The Somalia Affair"
    },
    {
      "text": "Courts martial convicted Kyle Brown, Mark Boland and Anthony Seward. Clayton Matchee was never tried.",
      "tag": "court"
    },
    {
      "text": "The national inquiry found failures of leadership and examined a cover-up. The government cut its work short.",
      "tag": [
        "inquiry",
        "government"
      ]
    },
    {
      "text": "The Canadian Airborne Regiment was disbanded in 1995.",
      "tag": "established"
    },
    {
      "text": "How many Somalis died in the battle, and in the months of fighting before it.",
      "tag": "disputed",
      "heading": "Still unknown"
    },
    {
      "text": "Who was responsible for the attack of the fifth of June remained contested.",
      "tag": "disputed"
    }
  ]
});

/* ======== maps, armies and moves (kept by make-scenario-text.py) ======== */

/* ======================================================================================================================
   Maps, armies and their moves.
     somalia     images/somalia-painting.jpg     10.39 N – 0.39 S, 38.59–53.01 E (1600 × 1200 km). The main map.
     mogadishu   images/mogadishu-painting.jpg   2.004–2.085 N, 45.271–45.379 E (12 × 9 km).
     battle      images/battle-painting.jpg      2.039–2.073 N, 45.305–45.349 E (5 × 3.75 km): the Olympic Hotel to the stadium.
     beledweyne  images/beledweyne-painting.jpg  4.710–4.764 N, 45.167–45.239 E (8 × 6 km).
     rabat       images/rabat-painting.jpg       33.990–34.070 N, 6.880–6.750 W (12 × 9 km): where the film was shot.
   All are paintings made for this page (AI-generated) over OpenStreetMap streets and the 1990 built-up area (GHSL), from
   tools/draw-maps.py. A chapter shows the map named by its `altMap` (none: the Somalia map).
   EVERY UNIT POSITION AND MOVE IS OURS, placed to follow the narration: a reconstruction, not a record. The two crash sites,
   the Abdi House, Radio Mogadishu and the Canadian camp are placed approximately and labelled so.
   Sides (owner, 17 November 2026): the SNA and other armed Somalis are 'allied' (red, named first); the United States and
   the United Nations are 'french' (blue). No fallen soldiers are drawn on this page (owner's rule: no images of the dead).
   ====================================================================================================================== */
(() => {
  const S = window.MOGADISHU_SCENARIO;
  const PI = Math.PI, E = 0, Wd = PI, N = -PI / 2, So = PI / 2;
  const GEO = { somalia: { lat0: -0.38987, lat1: 10.38987, lon0: 38.58606, lon1: 53.01394 }, mogadishu: { lat0: 2.004576, lat1: 2.085424, lon0: 45.271067, lon1: 45.378933 },
                battle: { lat0: 2.0391567, lat1: 2.0728433, lon0: 45.3045278, lon1: 45.3494722 }, beledweyne: { lat0: 4.7100507, lat1: 4.7639493, lon0: 45.1669444, lon1: 45.2390556 },
                rabat: { lat0: 33.989576, lat1: 34.070424, lon0: -6.8800365, lon1: -6.7499635 } };
  const at = (g, lat, lon) => ({ x: Math.round((lon - g.lon0) / (g.lon1 - g.lon0) * 2400), y: Math.round((g.lat1 - lat) / (g.lat1 - g.lat0) * 1800) });
  const R = (la, lo) => at(GEO.somalia, la, lo), M = (la, lo) => at(GEO.mogadishu, la, lo), B = (la, lo) => at(GEO.battle, la, lo),
        K = (la, lo) => at(GEO.beledweyne, la, lo), Q = (la, lo) => at(GEO.rabat, la, lo);
  const mid = (p, q, f = .5) => ({ x: Math.round(p.x + (q.x - p.x) * f), y: Math.round(p.y + (q.y - p.y) * f) });
  const off = (p, dx, dy) => ({ x: p.x + dx, y: p.y + dy });
  // Somalia
  const rMOG = R(2.046, 45.318), rBELED = R(4.737, 45.203), rBAIDOA = R(3.114, 43.65), rKISMAYO = R(-0.358, 42.545), rBARDERA = R(2.34, 42.28), rMERCA = R(1.712, 44.77),
        rJOWHAR = R(2.781, 45.5), rODDUR = R(4.12, 43.89), rGIALA = R(3.38, 45.6), rHARGEISA = R(9.56, 44.065), rSEA = R(1.7, 46.4), rWEST = R(1.0, 38.9);
  // Mogadishu (the city)
  const mAIRPORT = M(2.0163, 45.3057), mBAKARA = M(2.0496, 45.3202), mOLYMPIC = M(2.0504, 45.3246), mSTADIUM = M(2.0671, 45.336), mVILLA = M(2.041, 45.3368),
        mPORT = M(2.033, 45.344), mLIDO = M(2.0392, 45.3617), mRADIO = M(2.043, 45.331) /* approximate */, mABDI = M(2.047, 45.326) /* approximate */,
        mNORTH = M(2.066, 45.352), mSOUTH = M(2.038, 45.314), mSEA = M(2.02, 45.36);
  // the battle area
  const bOLYMPIC = B(2.0504, 45.3246), bBAKARA = B(2.0496, 45.3202), bSTADIUM = B(2.0671, 45.336), bHAWL = B(2.0594, 45.3217),
        bCRASH1 = B(2.0545, 45.3272) /* approximate: a few streets from the target */, bCRASH2 = B(2.0425, 45.3228) /* approximate: less than a mile to the south */,
        bSW = B(2.040, 45.306), bSE = B(2.041, 45.348), bN = B(2.071, 45.320), bE = B(2.055, 45.348), bLINK = B(2.0600, 45.3300);
  // Beledweyne
  const kTOWN = K(4.7368, 45.2039), kCAMP = K(4.752, 45.222) /* approximate */, kRIVER = K(4.745, 45.195), kNORTH = K(4.762, 45.21), kSOUTH = K(4.712, 45.2);
  // Rabat and Salé
  const qNASSER = Q(34.0497, -6.8234), qSIDI = Q(34.0555, -6.819), qRAHMA = Q(34.061, -6.788), qCONSULS = Q(34.0282, -6.8342), qRABAT = Q(33.998, -6.84), qSALE = Q(34.037, -6.819),
        qNORTH = Q(34.068, -6.80);

  const RECORD = (file, caption, credit, o) => Object.assign({ file, caption, credit }, o || {});
  const IMG = {
    bravo: RECORD('record-bravo-company-3-75-rangers-1993.jpg', 'Bravo Company, 3rd Battalion, 75th Ranger Regiment, the Ranger company of Task Force Ranger, on the dunes by the sea in Somalia, 1993.', 'US Army photo, via Wikimedia Commons. Public domain.'),
    chalk: RECORD('record-rangers-chalk-four-1993.jpg', 'US Army Rangers of Chalk Four return to base after a mission in Somalia, 1993 (exact date not given).', 'US Army photo, via Wikimedia Commons. Public domain.'),
    super64: RECORD('record-super64-3-october-1993.jpg', 'The Black Hawk Super Six-Four over the coast of Mogadishu on 3 October 1993, hours before it was shot down.', 'US Army photo (USASOC), via Wikimedia Commons. Public domain.')
  };

  Object.assign(S, {
    titleCard: {
      title: 'BATTLE OF MOGADISHU', date: '3–4 October 1993',
      dateNote: 'A raid becomes an overnight street battle, at the end of an international mission that set out to feed Somalia.',
      dateRef: 'US Army Center of Military History (Stewart, CMH 70-81-1); UN documents; Human Rights Watch; Canada’s Somalia Inquiry',
      place: 'Mogadishu, Somalia (and, in March 1993, Beledweyne)',
      sides: 'The SNA and other armed Somalis  ·  US Task Force Ranger, with US and UN forces'
    },
    world: { w: 2400, h: 1800 },
    spokenTitles: true,
    mainMap: 'somalia', terrain: 'somalia-painting.jpg', geo: GEO,
    altMaps: { mogadishu: 'mogadishu-painting.jpg', battle: 'battle-painting.jpg', beledweyne: 'beledweyne-painting.jpg', rabat: 'rabat-painting.jpg' },
    altLabels: {
      mogadishu: [ { ...mAIRPORT, y: mAIRPORT.y + 34, text: 'Airport' }, { ...mBAKARA, x: mBAKARA.x - 80, text: 'Bakara Market', small: true }, { ...mOLYMPIC, y: mOLYMPIC.y - 30, text: 'Olympic Hotel', small: true },
        { ...mSTADIUM, y: mSTADIUM.y - 30, text: 'Stadium', small: true }, { ...mPORT, y: mPORT.y + 30, text: 'New Port', small: true }, { ...mVILLA, y: mVILLA.y + 28, text: 'Villa Somalia', small: true },
        { ...mSEA, text: 'INDIAN OCEAN', small: true } ],
      battle: [ { ...bOLYMPIC, y: bOLYMPIC.y - 34, text: 'Olympic Hotel' }, { ...bBAKARA, y: bBAKARA.y + 34, text: 'Bakara Market' }, { ...bSTADIUM, y: bSTADIUM.y - 34, text: 'Stadium' },
        { ...bHAWL, y: bHAWL.y - 26, text: 'Hawl Wadaag road (approx.)', small: true }, { ...off(bSE, -120, 0), text: 'to the New Port ▶', small: true }, { ...off(bSW, 110, 0), text: '◀ to the airport', small: true } ],
      beledweyne: [ { ...kTOWN, y: kTOWN.y + 34, text: 'Beledweyne' }, { ...kRIVER, y: kRIVER.y - 30, text: 'Shabelle river', small: true }, { ...kCAMP, y: kCAMP.y - 30, text: 'Canadian camp (approx.)', small: true } ],
      rabat: [ { ...qRABAT, text: 'RABAT' }, { ...qSALE, text: 'SALÉ' }, { ...qSIDI, y: qSIDI.y - 30, text: 'Sidi Moussa', small: true }, { ...qRAHMA, y: qRAHMA.y - 30, text: 'Hay Arrahma', small: true },
        { ...qCONSULS, y: qCONSULS.y + 30, text: 'Rabat medina', small: true }, { ...qNORTH, text: '▲ Kénitra, about 35 km north', small: true } ]
    },
    duration: 31 * 14 + 30, commandDuration: 300, commandFocus: rMOG,
    battlefield: {
      scale: { px: 150, label: '100 km' },
      labels: [
        { ...rMOG, y: rMOG.y + 34, text: 'Mogadishu' }, { ...rBELED, x: rBELED.x + 90, text: 'Beledweyne', small: true }, { ...rBAIDOA, y: rBAIDOA.y + 30, text: 'Baidoa', small: true },
        { ...rKISMAYO, y: rKISMAYO.y + 30, text: 'Kismayo', small: true }, { ...rBARDERA, y: rBARDERA.y + 30, text: 'Bardera', small: true }, { ...rHARGEISA, y: rHARGEISA.y + 30, text: 'Hargeisa', small: true },
        { ...R(3.0, 50.0), text: 'INDIAN OCEAN', small: true }, { ...R(7.0, 42.0), text: 'ETHIOPIA', small: true }, { ...R(1.0, 39.8), text: 'KENYA', small: true },
        { ...R(5.5, 46.5), text: 'SOMALIA' }, { ...R(4.3, 44.75), text: 'Shabelle', small: true }, { ...R(1.6, 42.4), text: 'Juba', small: true } ]
    },
    eventMarkers: true,
    trenchLayers: [], trenchAlpha: 1, defaultTrench: null, introTrench: null,
    globe: { target: { lon: 45.318, lat: 2.046 }, region: { lon: 45.5, lat: 4.5 }, pull: 4.6, fit: { lon0: 36, lon1: 55, lat0: -4, lat1: 13, margin: .03 }, lift: false, keepBorders: true, keepTowns: true, startLat: 10,
      periodNote: 'The lines of 1993',
      paintings: [ { file: 'somalia-painting.jpg', lat0: -0.38987, lat1: 10.38987, lon0: 38.58606, lon1: 53.01394 } ],
      closePull: 90, dive2Secs: 6,
      stop2: { center: { lon: 45.8, lat: 5.0 }, pull: 12, fit: { lon0: 38.6, lon1: 53.0, lat0: -.39, lat1: 10.39, margin: .02 }, todayNote: 'Today’s towns and cities', thenNote: 'The same places in 1993' },
      labels: [ { lon: 45.318, lat: 2.046, text: 'MOGADISHU', size: .8, pin: true, early: true } ] },
    establishing: [],
    imageBase: 'images/', audioBase: 'audio/',
    voices: [
      { id: 'clear', name: 'Narrator 1 · clear', speaker: 25 }, { id: 'light', name: 'Narrator 2 · light', speaker: 60 },
      { id: 'bright', name: 'Narrator 3 · bright', speaker: 0 }, { id: 'deep', name: 'Narrator 4 · deep', speaker: 400 },
      { id: 'warm', name: 'Narrator 5 · warm', speaker: 7 }, { id: 'computer', name: 'Computer · calm', speaker: 500 }
    ],
    sheets: ['us-ranger', 'us-ranger-fire', 'us-blackhawk', 'us-littlebird', 'us-humvee', 'us-truck', 'my-condor', 'pk-m48', 'sna-militia', 'sna-militia-fire', 'sna-rpg', 'sna-technical'],
    attackSheets: { 'us-ranger': 'us-ranger-fire', 'sna-militia': 'sna-militia-fire' },
    sheetBy: { allied: { infantry: 'sna-militia', archers: 'sna-rpg', cavalry: 'sna-technical' }, french: { infantry: 'us-ranger', archers: 'us-ranger', cavalry: 'us-humvee' } },
    fallen: {},   // owner's rule: no images of the dead
    sideArt: { allied: { cloth: '#d9cfb8', cloth2: '#9b5a48', pennant: '#c0392b' }, french: { cloth: '#b89a74', cloth2: '#6d5a44', pennant: '#2e5aa8' } },
    legend: [ { label: 'The SNA and other armed Somalis', short: 'SNA', color: '#c0392b', kind: 'dot' }, { label: 'United States and United Nations forces', short: 'US and UN', color: '#2e5aa8', kind: 'dot' } ],
    ai: { plans: {} }, commandLines: {},
    debrief: { allied: { victory: { title: 'After the battle', text: '' }, defeat: { title: 'After the battle', text: '' }, stalemate: { title: 'After the battle', text: '' } },
               french: { victory: { title: 'After the battle', text: '' }, defeat: { title: 'After the battle', text: '' }, stalemate: { title: 'After the battle', text: '' } } },
    sources: [
      { title: 'Richard W. Stewart, The United States Army in Somalia, 1992–1994', note: 'US Army Center of Military History, CMH 70-81-1 (public domain): the intervention, the battle (pp. 19–23) and the withdrawal.' },
      { title: 'US Forces Somalia, After Action Report and Historical Overview', note: 'US Army Center of Military History, 2003.' },
      { title: 'United Nations records', note: 'Security Council resolutions 751, 794, 814 and 837; the Farer investigation (S/26351, 1993) and the commission of inquiry (S/1994/653).' },
      { title: 'Human Rights Watch / Africa Watch', note: 'World Reports 1993 and 1994; Somalia Faces the Future (1995).' },
      { title: 'Amnesty International', note: 'News Service 63/94 (31 March 1994).' },
      { title: 'Commission of Inquiry into the Deployment of Canadian Forces to Somalia', note: 'Dishonoured Legacy: The Lessons of the Somalia Affair (1997), executive summary and volume 4. Crown copyright: cited, not copied.' },
      { title: 'Court Martial Appeal Court of Canada', note: 'R. v. Brown (1995), R. v. Boland (1995), R. v. Seward (1996), R. v. Mathieu.' },
      { title: 'Government of Canada', note: 'National Defence: Operation Deliverance; the Director of Military Prosecutions on the Matchee case (2008); Canada’s report to the UN Committee Against Torture.' },
      { title: 'President Clinton', note: 'Address to the Nation, 7 October 1993; news conference, 14 October 1993; letter to Congress, 1 March 1995.' },
      { title: 'The film', note: 'Production notes of Black Hawk Down (cinema.com); ARSOF History, “Based on an Actual Event” (2023); American Forces Press Service, 15 January 2002; AFP, 25 January 2002.' },
      { title: 'This page', note: 'The research, the narration script and ChatGPT’s review are in the mogadishu1993/research folder. Maps: OpenStreetMap (ODbL) and GHSL (CC BY 4.0) under paintings made for this page.' }
    ]
  });
  S.confidence = {
    established: { label: 'Established', color: '#5fcf8a', desc: 'Supported by the original sources checked; not a claim that every party agrees.' },
    government: { label: 'Government', color: '#9fd0ff', desc: 'An official statement, decision, count or investigation of a named government or the UN. Its contents are not thereby proved.' },
    sna: { label: 'SNA account', color: '#f0b46a', desc: 'A statement or count by General Aidid’s Somali National Alliance or one of its officers, named.' },
    inquiry: { label: 'Somalia Inquiry', color: '#b8d98a', desc: 'A finding of Canada’s Commission of Inquiry into the Deployment of Canadian Forces to Somalia (1995–1997). Not a criminal verdict.' },
    court: { label: 'Court', color: '#c8b0ff', desc: 'A court-martial outcome: conviction, acquittal, appeal, unfitness to stand trial or withdrawal of charges; the line says which.' },
    report: { label: 'Report', color: '#8fd3c8', desc: 'A human-rights, humanitarian or public-health report, named in the line.' },
    press: { label: 'Press', color: '#d7c49e', desc: 'A named newspaper, news agency or reference work.' },
    witness: { label: 'Witness', color: '#e6a0c8', desc: 'One named person’s own account or claim.' },
    scholarship: { label: 'Historians', color: '#a8b8e8', desc: 'Historians’ and analysts’ interpretations.' },
    estimate: { label: 'Estimate', color: '#e9c77a', desc: 'An uncertain number, with who made it and what it counts.' },
    disputed: { label: 'Disputed', color: '#ff9a86', desc: 'Identifiable sources disagree: the line says how.' },
    film: { label: 'The film', color: '#c9c9c9', desc: 'What the film Black Hawk Down (2001) shows: a dramatisation, not evidence.' },
    reconstruction: { label: 'Reconstruction', color: '#c8a2ff', desc: 'Our own placing on the map: unit positions and moves are drawn to follow the narration.' },
    page: { label: 'About this page', color: '#9aa6ab', desc: 'How this page works: not a claim about the past.' } };
  S.sides = {
    allied: { name: 'The SNA and other armed Somalis', short: 'SNA', army: 'General Aidid’s Somali National Alliance (SNA), its militia, and other armed men of the city', color: '#c0392b', light: '#ffd6d0' },
    french: { name: 'United States and United Nations forces', short: 'US and UN', army: 'US Task Force Ranger and the Quick Reaction Force, with Malaysian and Pakistani UN troops', color: '#2e5aa8', light: '#d0dcff' } };
  S.sides.allied.rally = bBAKARA; S.sides.french.rally = bSW;

  // the Library of sources page (library.html?battle=mogadishu1993)
  const L = (o) => Object.assign({ linkOnly: true, link: '', rights: 'Still in copyright: link only' }, o);
  S.library = [
    { title: 'The United States Army in Somalia, 1992–1994', author: 'Richard W. Stewart, US Army Center of Military History', year: '2002', kind: 'official history (CMH 70-81-1)', about: 'The Army’s short history of the intervention and the battle.', citedIn: 'Parts 1, 2, 4–6', rights: 'US government work: public domain', link: 'https://history.army.mil/portals/143/Images/Publications/catalog/70-81-1.pdf', linkLabel: 'history.army.mil (PDF)' },
    { title: 'Report of the Commission of Inquiry (Farer), S/26351', author: 'United Nations', year: '1993', kind: 'UN report', about: 'The investigation of the attack on Pakistani peacekeepers on 5 June 1993.', citedIn: 'chapter 16', rights: 'UN document: quoted, linked', link: 'https://digitallibrary.un.org/record/171873', linkLabel: 'UN Digital Library' },
    { title: 'Security Council resolution 837', author: 'United Nations Security Council', year: '1993', kind: 'UN resolution', about: 'Adopted 6 June 1993, after the attack on the Pakistani peacekeepers.', citedIn: 'chapter 17', rights: 'UN document: quoted, linked', link: 'https://digitallibrary.un.org/record/166972', linkLabel: 'UN Digital Library' },
    { title: 'Human Rights Watch World Report 1994: Somalia', author: 'Human Rights Watch', year: '1994', kind: 'report', about: 'The UN war in Mogadishu in 1993, with civilian casualties.', citedIn: 'chapters 5, 17, 18, 26', rights: 'Link only', link: 'https://www.hrw.org/reports/1994/WR94/Africa-08.htm', linkLabel: 'hrw.org' },
    { title: 'Dishonoured Legacy: The Lessons of the Somalia Affair', author: 'Commission of Inquiry into the Deployment of Canadian Forces to Somalia', year: '1997', kind: 'report', about: 'The Canadian national inquiry’s report.', citedIn: 'Part 3', rights: 'Crown copyright: cited, linked', link: 'https://publications.gc.ca/site/eng/479793/publication.html', linkLabel: 'publications.gc.ca' },
    { title: 'Medal of Honor citations: Gary Gordon and Randall Shughart', author: 'US Army', year: '1994', kind: 'citation', about: 'The official citations.', citedIn: 'chapter 22', rights: 'US government work: public domain', link: 'https://www.army.mil/medalofhonor/citations27.html', linkLabel: 'army.mil' },
    { title: 'Address to the Nation on Somalia', author: 'President Bill Clinton', year: '1993', kind: 'speech', about: '7 October 1993: reinforcements, and the deadline of 31 March 1994.', citedIn: 'chapter 27', rights: 'US government: public domain', link: 'https://www.presidency.ucsb.edu/documents/address-the-nation-somalia', linkLabel: 'The American Presidency Project' },
    L({ title: 'Black Hawk Down: A Story of Modern War', author: 'Mark Bowden', year: '1999', kind: 'book', about: 'The journalist’s account of the battle, from interviews with American and Somali participants; the basis of the film.', citedIn: 'Part 7' }),
    L({ title: 'Black Hawk Down', author: 'Ridley Scott (director)', year: '2001', kind: 'film (a dramatisation)', about: 'No images from the film are used on this page.', citedIn: 'Part 7' }),
    L({ title: 'Dark Threats and White Knights: The Somalia Affair, Peacekeeping, and the New Imperialism', author: 'Sherene Razack', year: '2004', kind: 'book', about: 'A critical study of the Somalia Affair.', citedIn: 'Part 3 (further reading)' })
  ];

  // the armies panel
  S.units = [
    { side: 'allied', type: 'infantry', sheet: 'sna-militia', portrait: false, name: 'SNA militia', desc: 'Fighters of Aidid’s Somali National Alliance, mostly in civilian dress, with rifles and rocket-propelled grenades.', tag: 'established',
      lines: [ { text: 'Many armed men of the neighbourhoods joined the fighting on 3 October. Clans are not armies: not every Habr Gidir person, or every Somali who fought, belonged to the SNA.', tag: 'established' } ] },
    { side: 'allied', type: 'cavalry', sheet: 'sna-technical', portrait: false, name: '“Technicals”', desc: 'Pickup trucks with a heavy machine gun in the back, used by every faction.', tag: 'established', lines: [] },
    { side: 'french', type: 'infantry', sheet: 'us-ranger', portrait: false, name: 'Task Force Ranger', desc: 'Army Rangers and the Delta Force, with Navy SEALs and Air Force rescue specialists, under Major General William Garrison.', tag: 'established',
      lines: [ { text: 'It answered to an American chain of command, not to the UN force commander.', tag: 'established' } ] },
    { side: 'french', type: 'cavalry', sheet: 'us-blackhawk', portrait: false, name: '160th Special Operations Aviation Regiment', desc: 'MH-60 Black Hawk and MH-6 / AH-6 Little Bird helicopters.', tag: 'established', lines: [] },
    { side: 'french', type: 'cavalry', sheet: 'us-humvee', portrait: false, name: 'Quick Reaction Force', desc: 'Soldiers of the US 10th Mountain Division, with Humvees and trucks.', tag: 'established', lines: [] },
    { side: 'french', type: 'cavalry', sheet: 'my-condor', portrait: false, name: 'Malaysian battalion (UNOSOM II)', desc: 'Condor armoured carriers in UN white; they carried the rescue force on 3–4 October.', tag: 'established', lines: [] },
    { side: 'french', type: 'cavalry', sheet: 'pk-m48', portrait: false, name: 'Pakistani battalion (UNOSOM II)', desc: 'M48 tanks in UN white; the Pakistanis held the stadium.', tag: 'established', lines: [] }
  ];

  // things that are not armies: the people of the city, food-aid lorries (hidden until a chapter shows them)
  const O = (o) => Object.assign({ hidden: true, turns: true }, o);
  S.mapObjects = [
    O({ id: 'aid1', map: 'somalia', sheet: 'aid-truck', x: rMOG.x, y: rMOG.y, h: 60, row: 3, anim: { row: 3, fps: 4 }, label: 'food aid' }),
    O({ id: 'aid2', map: 'somalia', sheet: 'aid-truck', x: rMOG.x + 30, y: rMOG.y + 10, h: 60, row: 3, anim: { row: 3, fps: 4 } }),
    O({ id: 'aidM', map: 'mogadishu', sheet: 'aid-truck', x: mPORT.x, y: mPORT.y, h: 70, row: 3, anim: { row: 3, fps: 4 }, label: 'food aid' }),
    O({ id: 'civM1', map: 'mogadishu', sheet: 'civilians', x: mBAKARA.x - 60, y: mBAKARA.y + 40, h: 50, row: 1, anim: { row: 1, fps: 3 } }),
    O({ id: 'civB1', map: 'battle', sheet: 'civilians', x: bBAKARA.x + 40, y: bBAKARA.y - 40, h: 70, row: 0, anim: { row: 0, fps: 3 } }),
    O({ id: 'civB2', map: 'battle', sheet: 'civilians', x: bCRASH1.x - 120, y: bCRASH1.y + 80, h: 70, row: 3, anim: { row: 3, fps: 3 } }),
    O({ id: 'civK', map: 'beledweyne', sheet: 'civilians', x: kTOWN.x + 60, y: kTOWN.y + 40, h: 60, row: 1, anim: { row: 1, fps: 3 } }),
    O({ id: 'aidK', map: 'beledweyne', sheet: 'aid-truck', x: kSOUTH.x, y: kSOUTH.y, h: 70, row: 2, anim: { row: 2, fps: 4 } })
  ];

  const F = (o) => Object.assign({ power: 1, confidence: 'reconstruction', noFallen: true }, o);
  const veh = (o) => F(Object.assign({ type: 'cavalry', cols: 2, rows: 1, h: 34 }, o));
  const heli = (o) => veh(Object.assign({ cols: 2, h: 44, speed: 200 }, o));
  const inf = (o) => F(Object.assign({ type: 'infantry', cols: 3, rows: 2, h: 26 }, o));
  S.formations = [
    // ---- Somalia
    inf({ id: 'sMarines', map: 'somalia', side: 'french', name: 'UNITAF', division: 'US-led coalition, December 1992', sheet: 'us-ranger', cols: 3, rows: 1, x: rSEA.x, y: rSEA.y, facing: Wd, hidden: true,
      note: 'About 37,000 troops at the largest, according to Human Rights Watch, most of them American.' }),
    // ---- Mogadishu (the city)
    inf({ id: 'mMahdi', map: 'mogadishu', side: 'allied', name: 'Ali Mahdi’s forces', division: 'North Mogadishu', sheet: 'sna-militia', x: mNORTH.x, y: mNORTH.y, facing: Wd, hidden: true }),
    inf({ id: 'mAidid', map: 'mogadishu', side: 'allied', name: 'Aidid’s forces', division: 'South Mogadishu (later the SNA)', sheet: 'sna-militia', x: mSOUTH.x, y: mSOUTH.y, facing: E, hidden: true }),
    veh({ id: 'mTech', map: 'mogadishu', side: 'allied', name: 'SNA technicals', division: 'Somali National Alliance', sheet: 'sna-technical', x: mBAKARA.x - 40, y: mBAKARA.y + 60, facing: E, hidden: true }),
    inf({ id: 'mMarines', map: 'mogadishu', side: 'french', name: 'US Marines', division: 'UNITAF, 9 December 1992', sheet: 'us-ranger', x: mSEA.x, y: mSEA.y, facing: Wd, hidden: true }),
    veh({ id: 'mPak', map: 'mogadishu', side: 'french', name: 'Pakistani battalion', division: 'UNOSOM II', sheet: 'pk-m48', x: mSTADIUM.x + 40, y: mSTADIUM.y + 40, facing: Wd, hidden: true }),
    veh({ id: 'mQRF', map: 'mogadishu', side: 'french', name: 'Quick Reaction Force', division: '10th Mountain Division (US)', sheet: 'us-humvee', x: mAIRPORT.x + 80, y: mAIRPORT.y - 40, facing: E, hidden: true }),
    heli({ id: 'mTFRh', map: 'mogadishu', side: 'french', name: 'Task Force Ranger helicopters', division: '160th SOAR', sheet: 'us-blackhawk', x: mAIRPORT.x - 40, y: mAIRPORT.y - 60, facing: E, hidden: true }),
    inf({ id: 'mTFR', map: 'mogadishu', side: 'french', name: 'Task Force Ranger', division: 'Rangers and Delta Force', sheet: 'us-ranger', x: mAIRPORT.x + 20, y: mAIRPORT.y - 20, facing: E, hidden: true }),
    // ---- the battle
    heli({ id: 'bHelo', map: 'battle', side: 'french', name: 'Assault Black Hawks', division: '160th SOAR', sheet: 'us-blackhawk', x: bSW.x, y: bSW.y, facing: N, hidden: true }),
    heli({ id: 'bLB', map: 'battle', side: 'french', name: 'Little Birds', division: '160th SOAR', sheet: 'us-littlebird', cols: 2, h: 34, x: bSW.x - 40, y: bSW.y + 40, facing: N, hidden: true }),
    heli({ id: 'bS61', map: 'battle', side: 'french', name: 'Super Six-One', division: 'MH-60 Black Hawk', sheet: 'us-blackhawk', cols: 1, x: bOLYMPIC.x - 140, y: bOLYMPIC.y - 120, facing: E, hidden: true }),
    heli({ id: 'bS64', map: 'battle', side: 'french', name: 'Super Six-Four', division: 'MH-60 Black Hawk (Michael Durant)', sheet: 'us-blackhawk', cols: 1, x: bOLYMPIC.x + 160, y: bOLYMPIC.y + 60, facing: Wd, hidden: true }),
    inf({ id: 'bDelta', map: 'battle', side: 'french', name: 'Delta Force assault team', division: 'Task Force Ranger', sheet: 'us-ranger', cols: 3, rows: 1, x: bOLYMPIC.x, y: bOLYMPIC.y, facing: E, hidden: true }),
    inf({ id: 'bRangers', map: 'battle', side: 'french', name: 'Rangers', division: 'B Company, 3rd Battalion, 75th Ranger Regiment', sheet: 'us-ranger', cols: 4, rows: 2, x: bOLYMPIC.x + 40, y: bOLYMPIC.y + 50, facing: N, hidden: true }),
    veh({ id: 'bConvoy', map: 'battle', side: 'french', name: 'Ground convoy', division: 'Task Force Ranger: Humvees and trucks', sheet: 'us-humvee', cols: 3, x: bSW.x + 60, y: bSW.y, facing: E, hidden: true }),
    veh({ id: 'bConvoyT', map: 'battle', side: 'french', name: 'Ground convoy trucks', division: 'Task Force Ranger', sheet: 'us-truck', cols: 2, x: bSW.x, y: bSW.y + 40, facing: E, hidden: true }),
    veh({ id: 'bRescueM', map: 'battle', side: 'french', name: 'Malaysian armoured carriers', division: 'UNOSOM II, with the 10th Mountain Division', sheet: 'my-condor', cols: 4, x: bSE.x, y: bSE.y, facing: Wd, hidden: true }),
    veh({ id: 'bRescueP', map: 'battle', side: 'french', name: 'Pakistani tanks', division: 'UNOSOM II', sheet: 'pk-m48', cols: 2, x: bSE.x + 40, y: bSE.y + 50, facing: Wd, hidden: true }),
    veh({ id: 'bRescueH', map: 'battle', side: 'french', name: '10th Mountain Division', division: 'Quick Reaction Force (US)', sheet: 'us-humvee', cols: 3, x: bSE.x + 80, y: bSE.y - 40, facing: Wd, hidden: true }),
    inf({ id: 'bSNA1', map: 'battle', side: 'allied', name: 'SNA militia', division: 'around the Bakara Market', sheet: 'sna-militia', cols: 4, rows: 2, x: bBAKARA.x - 120, y: bBAKARA.y + 40, facing: E, hidden: true }),
    inf({ id: 'bSNA2', map: 'battle', side: 'allied', name: 'SNA militia and armed residents', division: 'north of the target', sheet: 'sna-militia', cols: 4, rows: 2, x: bN.x, y: bN.y, facing: So, hidden: true }),
    inf({ id: 'bSNA3', map: 'battle', side: 'allied', name: 'SNA militia', division: 'to the south', sheet: 'sna-militia', cols: 3, rows: 2, x: bCRASH2.x - 200, y: bCRASH2.y + 120, facing: N, hidden: true }),
    inf({ id: 'bRPG', map: 'battle', side: 'allied', name: 'Militiamen with RPGs', division: 'Somali National Alliance', type: 'archers', sheet: 'sna-rpg', cols: 3, rows: 1, x: bCRASH1.x - 100, y: bCRASH1.y - 120, facing: So, hidden: true }),
    veh({ id: 'bTech', map: 'battle', side: 'allied', name: 'SNA technicals', division: 'Somali National Alliance', sheet: 'sna-technical', cols: 2, x: bE.x, y: bE.y, facing: Wd, hidden: true })
  ];
  S.formations.forEach(f => { if (f.hidden) f.offmap = true; });
  // the city maps are only 5-12 km across: their figures are drawn larger, so they read at the whole-map view
  S.formations.forEach(f => { const k = { battle: 3.6, mogadishu: 2.6 }[f.map] || (f.map === 'somalia' ? 1 : 1.8); f.h = Math.round((f.h || 26) * k); });
  S.leaders = [];

  const EV = S.events; EV.forEach((e, i) => { e.clipNo = i + 1; e.orders = e.orders || []; e.t = i * 14; });
  const set = (i, o) => Object.assign(EV[i], o);
  const mog = (o) => Object.assign({ altMap: 'mogadishu' }, o), bat = (o) => Object.assign({ altMap: 'battle' }, o),
        bel = (o) => Object.assign({ altMap: 'beledweyne' }, o), rab = (o) => Object.assign({ altMap: 'rabat' }, o);
  const AP = '(approximate)';

  // Part 1: war and famine
  set(0, mog({ zoom: 'fit', markers: [ { ...mNORTH, label: 'Ali Mahdi’s forces held the north' }, { ...mSOUTH, label: 'Aidid’s forces held the south' } ], orders: [
    { id: 'mMahdi', visible: true }, { id: 'mAidid', visible: true }, { id: 'mAidid', to: mid(mSOUTH, mNORTH, .4), speed: 16, state: 'attack', delay: 4 },
    { id: 'mMahdi', to: mid(mSOUTH, mNORTH, .6), speed: 16, state: 'attack', delay: 5 }, { id: 'mAidid', to: mSOUTH, speed: 16, state: 'move', delay: 22 }, { id: 'mMahdi', to: mNORTH, speed: 16, state: 'move', delay: 22 },
    { obj: 'civM1', visible: true, to: off(mBAKARA, -300, 120), speed: 12, delay: 2 } ] }));
  set(1, { zoom: 'fit', markers: [ { ...rBAIDOA, label: 'Baidoa' }, { ...rBARDERA, label: 'Bardera' }, { ...R(2.6, 43.2), label: 'worst between the Juba and Shabelle rivers' } ] });
  set(2, mog({ zoom: 'fit', markers: [ { ...mPORT, label: 'Pakistani battalion (about 500): the port and airport', side: 'french' }, { ...mAIRPORT, label: 'Airport' } ], orders: [
    { obj: 'aidM', visible: true, to: off(mBAKARA, -40, 60), via: [mVILLA], speed: 30, delay: 3 } ] }));
  // Part 2: the intervention
  set(3, { zoom: 'fit', markers: [ { ...rMOG, label: 'US Marines ashore, 9 December 1992', side: 'french' } ], orders: [
    { id: 'sMarines', visible: true, to: off(rMOG, 30, 10), speed: 30, state: 'move', delay: 4 } ] });
  set(4, { zoom: 'fit', markers: [ { ...rMOG, label: 'Mogadishu: US' }, { ...rBARDERA, label: 'Bardera: US' }, { ...rBAIDOA, label: 'Baidoa: Australia' }, { ...rGIALA, label: 'Gialalassi: Italy' },
    { ...rODDUR, label: 'Oddur: France' }, { ...rBELED, label: 'Beledweyne: Canada' } ], orders: [
    { id: 'sMarines', visible: true }, { obj: 'aid1', visible: true, to: rBAIDOA, speed: 40, delay: 3 }, { obj: 'aid2', visible: true, to: rBELED, via: [rJOWHAR], speed: 40, delay: 5 } ] });
  set(5, bel({ zoom: 'fit', markers: [ { ...kTOWN, label: 'Beledweyne (Belet Huen)' }, { ...kCAMP, label: 'the Canadian camp ' + AP, side: 'french' } ], orders: [
    { obj: 'aidK', visible: true, to: kTOWN, speed: 30, delay: 3 }, { obj: 'civK', visible: true } ] }));
  set(6, bel({ zoom: 1.4, focus: kCAMP, markers: [ { ...kCAMP, label: 'the Canadian camp ' + AP } ], orders: [ { obj: 'civK', visible: true } ] }));
  // Part 3: the Somalia Affair (no armies on the map)
  set(7, bel({ zoom: 1.4, focus: kCAMP, markers: [ { ...off(kCAMP, 60, -40), label: '4 March 1993: near the Canadian compound ' + AP } ] }));
  set(8, bel({ zoom: 1.4, focus: kCAMP, markers: [ { ...kCAMP, label: '16 March 1993: Shidane Arone, in Canadian custody' } ] }));
  for (let i = 9; i <= 13; i++) set(i, bel({ zoom: 'fit', markers: [ { ...kCAMP, label: 'Beledweyne, 1993' } ] }));
  // Part 4: UNOSOM II and the hunt for Aidid
  set(14, mog({ zoom: 'fit', markers: [ { ...mAIRPORT, label: 'UNOSOM II and the US Quick Reaction Force', side: 'french' } ], orders: [
    { id: 'mPak', visible: true }, { id: 'mQRF', visible: true }, { id: 'mAidid', visible: true, at: mSOUTH }, { id: 'mTech', visible: true } ] }));
  set(15, mog({ zoom: 1.6, focus: mid(mRADIO, mSTADIUM), markers: [ { ...mRADIO, label: 'Radio Mogadishu ' + AP }, { ...mSTADIUM, label: 'Stadium' } ], orders: [
    { id: 'mPak', to: off(mRADIO, 40, -20), speed: 20, state: 'move' }, { id: 'mAidid', to: off(mRADIO, -60, 30), speed: 18, state: 'attack', delay: 8 },
    { id: 'mPak', strengthTo: .6, over: 10, delay: 12 }, { id: 'mPak', to: mSTADIUM, speed: 20, state: 'move', delay: 24 } ] }));
  set(16, mog({ zoom: 'fit', markers: [ { ...mSOUTH, label: 'SNA sites attacked from 12 June' } ], orders: [
    { id: 'mQRF', to: off(mSOUTH, 80, 20), speed: 30, state: 'attack', delay: 3 }, { id: 'mQRF', to: off(mAIRPORT, 80, -40), speed: 30, state: 'move', delay: 20 } ] }));
  set(17, mog({ zoom: 1.6, focus: mABDI, markers: [ { ...mABDI, label: 'the Abdi House, 12 July ' + AP } ] }));
  set(18, mog({ zoom: 'fit', media: IMG.chalk, markers: [ { ...mAIRPORT, label: 'Task Force Ranger’s base at the airport', side: 'french' } ], orders: [
    { id: 'mTFRh', visible: true }, { id: 'mTFR', visible: true } ] }));
  // Part 5: the battle
  set(19, bat({ zoom: 1.7, focus: off(bOLYMPIC, -100, 40), photo: Object.assign({}, IMG.super64, { at: 25, secs: 12 }), markers: [ { ...bOLYMPIC, label: 'the target building, near the Olympic Hotel', side: 'french' } ], orders: [
    { id: 'bHelo', visible: true, to: off(bOLYMPIC, -40, -60), speed: 160, state: 'move' }, { id: 'bLB', visible: true, to: off(bOLYMPIC, 60, -80), speed: 180, state: 'move', delay: 1 },
    { id: 'bDelta', visible: true, delay: 6 }, { id: 'bRangers', visible: true, delay: 7 }, { id: 'bHelo', to: off(bOLYMPIC, -400, -300), speed: 160, state: 'move', delay: 10 },
    { id: 'bConvoy', visible: true, to: off(bOLYMPIC, -60, 60), via: [off(bBAKARA, -200, 120)], speed: 40, state: 'move', delay: 4 },
    { id: 'bConvoyT', visible: true, to: off(bOLYMPIC, -120, 80), via: [off(bBAKARA, -240, 160)], speed: 40, state: 'move', delay: 5 },
    { id: 'bSNA1', visible: true, to: off(bOLYMPIC, -160, 40), speed: 16, state: 'attack', delay: 14 }, { id: 'bSNA2', visible: true, to: off(bOLYMPIC, 40, -180), speed: 16, state: 'attack', delay: 16 },
    { id: 'bRangers', state: 'attack', delay: 16 }, { obj: 'civB1', visible: true, to: off(bBAKARA, -400, 200), speed: 14, delay: 12 } ] }));
  set(20, bat({ zoom: 1.3, focus: mid(bOLYMPIC, bCRASH1), markers: [ { ...bCRASH1, label: 'Super Six-One down ' + AP } ], orders: [
    { id: 'bS61', visible: true, to: bCRASH1, speed: 120, state: 'move' }, { id: 'bRPG', visible: true, delay: 1 }, { id: 'bS61', gone: true, delay: 5 },
    { id: 'bRangers', to: off(bCRASH1, -30, 40), speed: 18, state: 'attack', delay: 8 }, { id: 'bDelta', to: off(bCRASH1, 40, 30), speed: 18, state: 'attack', delay: 10 },
    { id: 'bConvoy', to: off(bSW, 80, -40), via: [off(bOLYMPIC, -200, 200), off(bBAKARA, -300, 60), off(bCRASH2, -300, 0)], speed: 34, state: 'move', delay: 12 },
    { id: 'bConvoyT', to: off(bSW, 40, 0), via: [off(bOLYMPIC, -240, 220), off(bBAKARA, -340, 80), off(bCRASH2, -340, 40)], speed: 34, state: 'move', delay: 13 },
    { id: 'bSNA2', to: off(bCRASH1, 0, -160), speed: 16, state: 'attack', delay: 10 } ] }));
  set(21, bat({ zoom: 1.2, focus: mid(bCRASH1, bCRASH2), markers: [ { ...bCRASH2, label: 'Super Six-Four down ' + AP } ], orders: [
    { id: 'bS64', visible: true, to: bCRASH2, speed: 120, state: 'move' }, { id: 'bS64', gone: true, delay: 6 },
    { id: 'bSNA3', visible: true, to: off(bCRASH2, -60, 60), speed: 16, state: 'attack', delay: 8 }, { id: 'bSNA1', to: off(bCRASH2, -80, -40), speed: 16, state: 'attack', delay: 9 } ] }));
  set(22, bat({ zoom: 1.4, focus: bCRASH1, markers: [ { ...bCRASH1, label: 'the night around the first crash site' } ], orders: [
    { id: 'bRangers', state: 'hold' }, { id: 'bDelta', state: 'hold' }, { id: 'bSNA2', to: off(bCRASH1, 0, -110), speed: 12, state: 'attack', delay: 2 },
    { id: 'bTech', visible: true, to: off(bCRASH1, 200, -40), speed: 20, state: 'attack', delay: 4 },
    { id: 'bLB', to: off(bCRASH1, 0, -200), speed: 120, state: 'move', delay: 3 }, { obj: 'civB2', visible: true, to: off(bCRASH1, -500, 260), speed: 14, delay: 4 } ] }));
  set(23, bat({ zoom: 'fit', markers: [ { ...off(bSE, -120, 40), label: 'from the New Port, late evening' } ], orders: [
    { id: 'bRescueM', visible: true, to: off(bCRASH1, 60, 40), via: [bE, off(bLINK, 120, 0)], speed: 34, state: 'attack' },
    { id: 'bRescueP', visible: true, to: off(bLINK, 160, 40), via: [off(bE, 40, 40)], speed: 30, state: 'attack', delay: 1 },
    { id: 'bRescueH', visible: true, to: off(bCRASH1, 120, 60), via: [off(bE, -20, -40), off(bLINK, 140, -20)], speed: 34, state: 'attack', delay: 2 },
    { id: 'bTech', strengthTo: .3, over: 8, delay: 12 }, { id: 'bSNA2', strengthTo: .5, over: 12, delay: 14 } ] }));
  set(24, bat({ zoom: 'fit', markers: [ { ...bLINK, label: 'the Mogadishu Mile: on foot to meet vehicles' }, { ...bSTADIUM, label: 'the stadium (Pakistani battalion), about 6:30 am', side: 'french' } ], orders: [
    { id: 'bRescueM', to: off(bSTADIUM, 40, 40), via: [bLINK], speed: 34, state: 'move' }, { id: 'bRescueH', to: off(bSTADIUM, 80, 0), via: [off(bLINK, 40, 0)], speed: 34, state: 'move', delay: 1 },
    { id: 'bRescueP', to: off(bSTADIUM, 0, 70), speed: 30, state: 'move', delay: 2 },
    { id: 'bRangers', to: bLINK, speed: 20, state: 'move', delay: 3 }, { id: 'bDelta', to: off(bLINK, 30, 20), speed: 20, state: 'move', delay: 3 },
    { id: 'bRangers', to: off(bSTADIUM, -40, 40), speed: 30, state: 'move', delay: 16 }, { id: 'bDelta', to: off(bSTADIUM, -60, 70), speed: 30, state: 'move', delay: 16 } ] }));
  set(25, bat({ zoom: 'fit', markers: [ { ...bCRASH1, label: 'first crash site ' + AP }, { ...bCRASH2, label: 'second crash site ' + AP }, { ...bBAKARA, label: 'the Somali dead included fighters and civilians' } ] }));
  // Part 6: aftermath
  set(26, mog({ zoom: 'fit', markers: [ { ...mAIRPORT, label: 'Airport' } ] }));
  set(27, { zoom: 'fit', markers: [ { ...rMOG, label: 'UNOSOM II’s last troops leave, March 1995' } ] });
  set(28, { zoom: 'fit', markers: [ { ...rWEST, label: '◀ Rwanda, about 1,500 km to the west' } ] });
  // Part 7: the film and the history
  set(29, rab({ zoom: 'fit', markers: [ { ...qSIDI, label: 'Salé, Sidi Moussa: streets dressed as Mogadishu ' + AP }, { ...qRAHMA, label: 'Hay Arrahma, Salé: the first crash site set ' + AP },
    { ...qNORTH, label: 'Kénitra air base, about 35 km north: filming began here, 8 March 2001' } ] }));
  set(30, rab({ zoom: 'fit', markers: [ { ...qSIDI, label: 'filmed in Salé' }, { ...qRABAT, label: 'Rabat' } ] }));


  // the counts, shown on screen (not narrated): each with who counted it and what it counts
  const TB = (title, rows, note) => ({ title, rows, note });
  EV[4].table = TB('UNITAF’s strength', [['Human Rights Watch, World Report 1994', 'about 37,000', 'troops at the largest, including 24,000 Americans']], 'Strengths changed over time; other publications give other totals for other dates.');
  EV[15].table = TB('The fifth of June', [['Farer’s UN investigation (S/26351)', '24 killed', 'Pakistani soldiers'], ['Farer’s UN investigation (S/26351)', '56 wounded', 'Pakistani soldiers']], 'An investigation, not a trial. Somali losses that day are not recorded in the sources reviewed here.');
  EV[17].table = TB('The twelfth of July: who counted', [['UNOSOM, first statement', 'at least 13', 'killed'], ['Red Cross, as reported by Human Rights Watch', 'at least 54', 'dead'], ['Amnesty International', 'more than 50', 'killed'], ['SNA, as relayed by a Canadian government chronology', '73', 'killed']], 'Overlapping assessments, not a range. They cannot be added together.');
  EV[25].table = TB('3–4 October: who counted what', [
    ['US Army', '18', 'American soldiers killed in the battle (one more killed by mortar fire on 6 October)'],
    ['US Army, Fort Drum (2016) · Army overview · Human Rights Watch', '73 · 79 · 84', 'American wounded, as each counts them'],
    ['Malaysian reporting (AFP, 2002)', '1', 'Malaysian soldier killed'],
    ['Captain Haad, an SNA officer, to PBS Frontline (1998)', '133', 'SNA militiamen killed: militia only'],
    ['Human Rights Watch, Somalia Faces the Future (1995)', 'more than 200', 'Somalis killed'],
    ['Africa Watch / Human Rights Watch estimate', 'at least 500–600', 'Somalis killed by US or UNOSOM forces from June to the end of October 1993, including the battle']],
    'No reliable total of the Somali dead is known. These counts measure different things and cannot be added together.');

  // the introduction: which map, lines and pictures each slide shows
  const IS = S.intro;
  Object.assign(IS[0], { media: [IMG.bravo, IMG.super64] });
  Object.assign(IS[1], { markers: [ { ...rMOG, label: 'Mogadishu' }, { ...rHARGEISA, label: 'Hargeisa' } ] });
  Object.assign(IS[2], { markers: [ { ...rMOG, label: 'Mogadishu, taken by the USC, January 1991' } ] });
  Object.assign(IS[3], { altMap: 'mogadishu', markers: [ { ...mNORTH, label: 'Ali Mahdi' }, { ...mSOUTH, label: 'Aidid' } ] });
  Object.assign(IS[4], { markers: [ { ...rMOG, label: 'Mogadishu: the battle, October 1993' }, { ...rBELED, label: 'Beledweyne: the Somalia Affair, March 1993' } ] });
  Object.assign(IS[5], { media: [IMG.chalk] });
})();
