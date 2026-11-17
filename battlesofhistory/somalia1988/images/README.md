# Somalia 1988: pictures

| file | what | credit and licence |
|---|---|---|
| cover.jpg | The Hargeisa War Memorial on Independence Avenue: a downed Somali Air Force MiG over the words "Xus oo xasuusnow 1988" ("Remember and recall 1988"), 18 July 2019 | Photo: Gerard van de Bruinhorst, African Studies Centre Leiden (accession 4369), via Wikimedia Commons (File:ASC Leiden - van de Bruinhorst Collection - Somaliland 2019 - 4369 - Northside of the Independence Avenue of the Hargeisa War Memorial with a downed fighter jet.jpg), CC BY-SA 4.0, permission confirmed by VRT ticket #2019092710004895. Cropped at the bottom to remove the camera's date stamp. |
| hargeisa-mig-memorial-2021.jpg | The same memorial seen from the side, 12 October 2021 (kept for the page) | Photo: O.Mustafin, own work, via Wikimedia Commons (File:HG_0249.jpg), CC0 1.0 (public domain dedication). |

## Painted maps (ChatGPT, prompts in layout/ART-PROMPTS-MAPS-V3.md)

| File | Map | Check | Source |
|---|---|---|---|
| north-painting.jpg | The north, 640 × 480 km (frame in layout/maps.json) | Coast matches the base 99.6 % (IoU) | Painted with ChatGPT (AI-generated) on north-base.png; original in layout/painted/north-chatgpt-v3.png |
| core-painting.jpg | Hargeisa, Burao, Berbera, 310 × 232 km | Coast matches the base 98.9 % (IoU); Hargeisa, Berbera, Sheikh, Gebiley painted at their real places | Painted with ChatGPT (AI-generated) on core-base.png; original in layout/painted/core-chatgpt-v3.png |
| hargeisa-painting.jpg | Hargeisa, 12 × 9 km | The riverbed, the runway and the main roads lie on OpenStreetMap's (checked by overlay); some small side gullies left out | Painted with ChatGPT (AI-generated) on hargeisa-base.png; original in layout/painted/hargeisa-chatgpt-v3.png |
| burao-painting.jpg | Burao, 8 × 6 km | The Togdheer riverbed, the airstrip and the main roads lie on OpenStreetMap's (checked by overlay) | Painted with ChatGPT (AI-generated) on burao-base.png; original in layout/painted/burao-chatgpt-v3.png |
| berbera-painting.jpg | Berbera, 12 × 9 km | Sea and harbour match the base 99.0 % (IoU); the runway and the roads lie on OpenStreetMap's | Painted with ChatGPT (AI-generated) on berbera-base.png; original in layout/painted/berbera-chatgpt-v3.png |

## From the record

| File | What | Source and licence |
|---|---|---|
| record-mig17-memorial-2016.jpg | The Hargeisa War Memorial, 22 January 2016: a Somali Air Force MiG-17, the type that bombed the city in 1988, on a plinth reading "Xus oo xusuusnow 1988" ("Remember and recall 1988"), above a painted mural of the bombing. | Photo: **John Pavelka**, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:MiG-17_Jet_Memorial_(42961308501).jpg) (from Flickr, reviewed), **CC BY 2.0**. Saved at 1280 px. |
| record-memorial-rebuilt-2024.jpg | The Hargeisa War Memorial as rebuilt, 26 January 2024: the same MiG-17 on a new monument of stone columns. | Photo: **Buufin**, own work, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Hargeisa_War_Memorial.jpg), **CC0 1.0** (public domain dedication). Saved at 1280 px. |

## Units (sprite sheets)

Painted with ChatGPT (AI-generated) from the prompts in `../ART-PROMPTS-UNITS.md`; originals in `units-raw/`. Cut with
`tools/prepare-sprite-sheet.py` (infantry 160 px cells, scale 0.448 for walk and fire; tanks 240 × 200 cells, scale 0.558
for move and fire, so each pair matches); green-tinted dust on the tank sheets turned back to dust colour.

| File | What |
|---|---|
| units/sna-infantry.png | Somali National Army infantryman, walking |
| units/sna-infantry-fire.png | the same, kneeling, firing, reloading, rising |
| units/sna-t55.png | Somali army T-54/55 tank, moving (type: our reconstruction; the sources say only "tanks") |
| units/sna-t55-fire.png | the same tank, firing |
| units/sna-artillery.png | Somali army towed field gun (Soviet D-44 type) and crew of three, loading and firing (type: our reconstruction) |
| units/sna-truck.png | Somali army six-wheeled cargo truck with soldiers |
| units/saf-mig17.png | Somali Air Force MiG-17, flying (confirmed type: the Hargeisa memorial; the pilot who flew his to Djibouti) |
| units/snm-fighters-fire.png | SNM fighter in shirt and macawis: aiming over a rock, firing, reloading, running on |
| units/civilians-fleeing.png | a family leaving the town on foot with their belongings |
| units/civilians-camel.png | a herder leading a camel loaded with the hut poles, mats and water containers |

Scales: all people at 0.448 (the SNM fighter, drawn closer up by ChatGPT, at 0.31 to match), the tank and truck at
0.558, the MiG at 0.682. Green halos in dust, smoke and muzzle flashes fixed with `tools/fix-green-fringe.py`.
Still wanted: 08, the SNM fighter walking.
| record-barre-reagan-1982.jpg | President Mohamed Siad Barre (right) with President Ronald Reagan (left) by the Oval Office fireplace, 11 March 1982. In 1982 the United States was Barre's Cold War ally. 348 × 238, cut from the contact sheet (the frame the archive circled). | White House photograph by **Schumacher**, roll C06755, frame 10. [Ronald Reagan Presidential Library](https://www.reaganlibrary.gov/archives/photo/c06755-01). **Public domain** (work of the US federal government). |
| record-barre-reagan-handshake-1982.jpg | Reagan greets Barre in the Oval Office, 11 March 1982. 349 × 239. | Same roll, frame 7; **public domain**. A second roll of the meeting (Evans, C06769) is in layout/. |
| record-letter-of-death-1987-p1.jpg | Page 1 of a report (*warbixin*) dated 23 January 1987, from the office of the commander of the 26th Division (Qaybta 26aad, Hargeisa) to the President of the Somali Democratic Republic and the Ministers of Defence and the Interior, stamped *sir culus* ("top secret"). It is attributed to General Mohamed Said Hersi "Morgan" and known in Somaliland as the "Letter of Death". Africa Watch (1990) published it as authentic; it has not been tested in court. **Caption on the page must say so; do not use Commons' description, which is the uploader's own wording.** | Somali Ministry of Defence document (1987), as reprinted by the Haatuf newspaper (6 October 2003); [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Letter-of-Death-1.jpg). Public domain: a Somali government document of 1987 (the term of the 1977 Somali copyright law has run out; tagged PD-Somalia on Commons). 1202 × 1654. |
| record-letter-of-death-1987-p2.jpg | Page 2 of the same report: the measures it proposes (in Somali). Same caption rules as page 1. | Same source and licence; [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Letter-of-Death-2.jpg). 1211 × 1612. |
| record-silanyo-2012.jpg | Ahmed Mohamed Mohamoud "Silanyo", chairman of the SNM from 1984 to 1990, in 2012 as President of Somaliland, arriving at the London Conference on Somalia, 23 February 2012. **Caption must give the year: this is not 1988.** | Photo: UK **Foreign and Commonwealth Office** (Flickr), [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:President_Silanyo_of_Somaliland_(6926075809).jpg), permission verified (VRT ticket 2013061310007371). **Open Government Licence v1.0**: credit line "Contains public sector information licensed under the Open Government Licence v1.0"; no suggestion of official endorsement. Saved at 1280 px. |
