# Battle of Mogadishu (1993): pictures

| File | What | Source and licence |
|---|---|---|
| record-super64-3-october-1993.jpg | The Black Hawk helicopter "Super 64", flown by Michael Durant, over the coast of Mogadishu on 3 October 1993, hours before it became the second helicopter shot down in the battle. | US Army photo, United States Army Special Operations Command (USASOC), as published by the Philadelphia Inquirer; [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Black_Hawk_Down_Super64_over_Mogadishu_coast.jpg). **Public domain** (work of the US federal government, PD-USGov-Military-Army). Small: as found on Commons. |
| record-rangers-chalk-four-1993.jpg | US Army Rangers of Chalk Four return to base after a mission in Somalia, 1993 (the exact date is not given). | US Army Rangers photo, from the collection published with the Philadelphia Inquirer's *Black Hawk Down: A Soldier's View*; [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Black_Hawk_Down_Rangers_return_to_base_after_mission.jpg). **Public domain** (PD-USGov-Military-Army). 300 × 211. |
| record-bravo-company-3-75-rangers-1993.jpg | Bravo Company, 3rd Battalion, 75th Ranger Regiment, the Ranger company of Task Force Ranger, on the dunes by the sea in Somalia, 1993 (group photograph; the exact date is not given). | US Army Rangers photo (source given on Commons: SuaSponte.com, Ranger History: Somalia); [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:75th_Ranger_Regiment_Bravo_Company_3rd_Battalion_Somalia_1993.jpg). **Public domain** (PD-USGov-Military-Army). Saved at 1280 px (Commons original 1760 × 1095). |

Not used: "Black_Hawk_Down_Incident.jpg" (a 2022 "own work" claim on what looks like a copied US military photo); "HH-60H_Seahawk_Iraq.jpg" (US Navy, public domain, but a Navy helicopter in Iraq in 2010, not Mogadishu 1993).

## Painted maps (ChatGPT, prompts in layout/ART-PROMPTS-MAPS.md; originals in layout/painted/)

All painted with ChatGPT (AI-generated) on the bases made by tools/draw-maps.py; checked 17 November 2026.

| File | Map | Check |
|---|---|---|
| somalia-painting.jpg | Somalia, 1992–1993 (1600 × 1200 km) | coast matches the base 99.8 % (IoU) |
| mogadishu-painting.jpg | Mogadishu, 1993 (12 × 9 km) | coast 99.0 %; streets and runway on the base's lines |
| battle-painting.jpg | the battle area (5 × 3.75 km) | streets on the base's lines (overlay) |
| beledweyne-painting.jpg | Beledweyne, 1993 (8 × 6 km) | the Shabelle's bends on the base's river (overlay) |
| rabat-painting.jpg | Rabat and Salé, 2001, for the film comparison (12 × 9 km) | coast 97.2 %; the Bou Regreg on the base's river |

## Sprite sheets (units/, 17 November 2026)

Painted by ChatGPT from `ART-PROMPTS-UNITS.md`, one sheet per chat; originals in `units-raw/` (1254 x 1254, green
background). Cut with `tools/prepare-sprite-sheet.py`, then `tools/fix-green-fringe.py`. Rows: south, east, north, west;
columns: four frames. All directions checked.
- People, 160 px cells: `us-ranger` (scale 0.438), `us-ranger-fire` (0.438, same as walk), `sna-militia` (0.432),
  `sna-militia-fire` and `sna-rpg` (0.432), `civilians` (0.435, matched to the soldiers).
- Vehicles and aircraft, 240 x 200 cells, sized against each other (M48 with its gun the longest): `pk-m48` (0.675),
  `us-truck` (0.744), `aid-truck` (0.684), `my-condor` (0.628), `sna-technical` (0.566), `us-humvee` (0.564),
  `us-blackhawk` (0.659), `us-littlebird` (0.476).
- `sna-rpg` is the agreed non-firing version: raising, aiming, holding, lowering; no flash or smoke.

## Cover

`cover.jpg`: for now a copy of `record-bravo-company-3-75-rangers-1993.jpg` (US Army, public domain), as the home-page card
picture. The owner may choose another title card.
