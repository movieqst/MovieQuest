# Six-Day War sprite sheets: originals from ChatGPT
Game-size cuts are in ../units/ (tools/prepare-sprite-sheet.py, 160 px cells, figures 130 px). Where ChatGPT put the
rows in another order, tools/reorder-sheet-rows.py put them back to south, east, north, west first.
These are original illustrations for this project (AI-generated): an artist's impression, not evidence.

| sheet | review (6 November 2026) |
|---|---|
| idf-infantry (from idf-infantry-alt) | PASS. Olive drab, steel helmet, webbing, Uzi. Rows were south, west, north, east: reordered. Goggles on the helmet are fine (common on armour crews and infantry). The first version (idf-infantry.png) was not used: Israeli flag patches on the sleeve, which were not worn in 1967. |
| idf-infantry-fire | PASS. Standing fire with an FN FAL-style rifle, rows in order. It asked for kneeling with a magazine change; standing fire works in the game. |
| idf-para | PASS. Paratrooper with a netted helmet, Uzi and webbing. The east row was missing (two west rows), so the west row was mirrored to face east. |
| idf-para-attack (from idf-para-attack-alt) | PASS. Fire on the move, then kneel and fire, in the same plain uniform as idf-para. The camouflage version (idf-para-attack.png) is kept in case paratrooper smocks are confirmed. No street background in either; that is fine, since the map supplies the street. |

**Style note:** these are in a crisp pixel-painted style, not the painted look of Batoche. That is fine as long as all the Six-Day War sheets keep this one style.

**Batch 2 (6 November):**

| sheet | review |
|---|---|
| egy-infantry (from egy-infantry-alt1) | PASS. Sand khaki, Soviet-style steel helmet, AK-type rifle, webbing. Two west rows and no east row, so the west row was mirrored to face east. (alt2 is nearly the same; not used.) |
| egy-infantry-fire | PASS for now. Standing and firing, rows in order. It has small Egyptian flag patches on the sleeves, probably not worn in 1967; they are tiny at game size. It is standing in the open, not the trench of the prompt. |
| idf-sherman | PASS for now. A long-gun Sherman with the crew in the hatch, rows in order. The large white Star of David on the hull is doubtful for June 1967 (IDF tanks carried white recognition marks, not big stars): a redo without it is asked for. |
| idf-centurion-fire (from idf-tank-fire-CENTURION-LIKE) | PASS, as the Centurion's firing sheet (it is a Centurion, not a Sherman). A Centurion moving sheet is still needed. |
| jor-infantry | PASS. Khaki, red-and-white shemagh, rifle, rows in order. Small flag patch on one sleeve; tiny at game size. |
| jor-infantry-fire | PASS as the general Jordanian infantry firing sheet (shemagh, standing). The Ammunition Hill trench sheet (steel helmet, rifle, firing from a trench) is still needed. |
| jor-patton, jor-patton-fire | PASS. An M48 Patton with crew, rows in order. The moving sheet has a Jordanian flag on the turret; whether Jordanian tanks bore it in 1967 is unconfirmed, and it is tiny at game size. |

**Batch 3 (6 November):** all rows in order (south, east, north, west).

| sheet | review |
|---|---|
| egy-trench-fire, jor-trench-fire, syr-trench-fire | PASS. Steel helmets, firing over sandbags that are in front in every row. The Egyptian and Jordanian ones have small flag patches; tiny at game size. |
| syr-infantry | PASS. Olive uniform, steel helmet, AK. |
| syr-t55, syr-t55-fire | PASS. A T-54/55, moving and firing. |
| idf-sherman-fire (from idf-sherman-redo) | PASS as the Super Sherman's firing sheet: no Star of David, white recognition stripes. |
| idf-mirage | PASS for now. A 4 × 4 sheet with wide cells: top, side, tail and side views, rows in order. It is painted in desert camouflage with blue roundels; in June 1967 most Israeli Mirages were bare metal (camouflage came after the war), so a bare-metal redo is asked for. |
| idf-centurion (asked as a moving sheet) | Not used: it is firing again. The moving Centurion is still needed. |

**Batch 4 (6 November):**

| sheet | review |
|---|---|
| idf-centurion (moving) | PASS for now. A Centurion driving, no gun flash, rows in order. It has a Star of David on the turret, which the firing sheet does not; tiny at game size. |
| idf-mirage (silver redo) | PASS. Bare metal, replacing the camouflaged one. |
| idf-supermystere | PASS. Camouflage, roundels, rows in order. |
| egy-mig21 | PASS. Rows were south, west, north, east: reordered. Sand camouflage and roundels. |
| idf-guns-fire, egy-guns-fire | PASS, adapted. The sheets are one three-quarter view in 16 frames (aim, load, fire, smoke), not four directions. The firing row was used for every direction, mirrored for the south and east rows. Ammunition boxes with flags are tiny at game size. |
| jor-hunter | REJECTED: its air intake is in the nose; a Hawker Hunter's intakes are at the wing roots. |

**Batch 5 (7 November):** all rows in order (south, east, north, west). Cut at 240 × 200 cells.

| sheet | review |
|---|---|
| egy-t55 (from egy-t55-move-v1) | ACCEPT. Chosen over v2 because it matches the firing sheet's tank exactly. v2 kept in units-raw. |
| egy-t55-fire | ACCEPT. Cut at the same scale as the moving sheet. The rear-row flash sits at the far end of the gun (pointing away), which reads correctly at game size. |
| egy-btr152 | ACCEPT. Six wheels, open troop compartment, rows in order. |
| idf-halftrack, idf-halftrack-fire | ACCEPT. M3 layout, crew in the back, a Browning on the pintle in the firing sheet. The moving frames are subtle; the engine moves the sprite, so this is fine. |
| syr-bunker-fire | ACCEPT. Basalt and sandbag position with a machine gun. The belt on a DP pan gun is a small inaccuracy, invisible at game size. |
| syr-panzer4-dugin | ACCEPT. Dug-in Panzer IV (Syria had them on the Golan); long gun, proportions fine at game size. |
| syr-t34-dugin | ACCEPT. Dug-in T-34/85 (Syria used dug-in T-34s on the heights). |

**Batch 6, leaders and the fallen (7 November):** rows in order (south, east, north, west). Leaders cut at 160 px cells, figures 130 px; the fallen at 240 × 200, 110 px.

| sheet | review |
|---|---|
| fallen-idf | ACCEPT. Sixteen still poses, no blood, rifles and helmets beside them. |
| fallen-jor | REDO, not used. Pose for pose the same as fallen-idf, in Israeli-style olive with M1 helmets and webbing, plus Jordanian flag patches. It needs khaki battledress of British style, some red-and-white shemaghs, British steel helmets, Lee-Enfields, and no flag patches. |
| leader-rabin | ACCEPT. Olive uniform, rank slides, field glasses. A fair likeness at game size. |
| leader-tal | ACCEPT for now. The prompt asked for a black armoured-corps beret and a headset; he has a helmet with goggles. Fine at game size; a beret version would be more accurate. |
| leader-sharon (from leader-sharon-redo) | ACCEPT for now. Too slim: Sharon at 39 was heavy-set with a broad face and light-brown wavy hair. A heavier redo would be better. |
| leader-gur | ACCEPT. The paratroopers' red beret is right for Gur in Jerusalem. |
| leader-nasser | REDO, not used. He is in a military uniform with ribbons; in 1967 Nasser appeared as President in a dark civilian suit and tie (the prompt asked for that), standing and gesturing. |

**Batch 7, corrections (7 November):**

| sheet | review |
|---|---|
| fallen-jor (from fallen-jor-redo) | ACCEPT after cleaning. Khaki battledress, distinct poses, Lee-Enfields. It had red blood marks; these were recoloured to khaki here (units-raw/fallen-jor-redo-cleaned.png) to match the no-blood rule. Still no shemaghs; fine. |
| leader-nasser (from leader-nasser-redo) | ACCEPT. Dark civilian suit and tie, a good likeness, rows in order. A walking sheet (the prompt asked for standing and gesturing); walking works for the Region map. |
| jor-hunter-redo-draft | FIX, not used. The intakes and the solid nose are now right, but it is one three-quarter view in 2 × 4 frames, not the four-direction sheet the game needs (top, side, tail, side, like the Mirage), and row 2 shows an afterburner flame (the Hunter had none). It also has Arabic numerals on the nose (no readable text). |
| leaders-five-concept-ONLY | Not used: a concept picture of five leaders, not production sheets. Ask for each as its own 4 × 4 sheet. |

**Batch 8 (7 November):** originals in units-raw/batch8/.

| sheet | review |
|---|---|
| jor-hunter (from hunter-aircraft-draft-A) | ACCEPT. Wing-root intakes, solid nose, no afterburner, camouflage and Jordanian markings; head-on, side, tail and side views like the Mirage sheet. Rows were south, west, north, east: reordered. Cut a little smaller than the Mirage (the Hunter was the smaller aircraft). |
| hunter-aircraft-draft-B | Not used: mixed views in a 1536 × 1024 sheet; A is better. |
| fallen-syr (from fallen-soldier-draft) | ACCEPT for now, as the Syrian fallen: olive-green uniform, Soviet-style helmets, AK rifles, no blood, 16 poses (all facing the same way). Small red-white-black flag patches, tiny at game size. |
| leader-hussein (from king-hussein-keffiyeh-draft) | ACCEPT for now. Field uniform with a red-and-white shemagh. A dark-beret version (as on 30 May in Cairo) is still wanted. |
| king-hussein-beret-draft | Not used: it is a peaked cap with a red band, not a beret. |
| leader-eshkol (from levi-eshkol-civilian-draft) | ACCEPT. Bald, glasses, dark suit: a good likeness. |
| officer-draft-A to D | Not used yet: unnamed. Each needs to be labelled with the person it was drawn for (Amer, Shazly, Riad, Dayan, Elazar…) before it can be checked against photos. |
| multi-asset-concept-not-sprite | Not used: concept only. |

**Batch 9 (7 November):** originals in units-raw/batch9/. Rows in order (south, east, north, west).

| sheet | review |
|---|---|
| leader-amer (from leader-amer-command-DRAFT) | ACCEPT. Khaki service dress, red collar tabs, gold-braided peaked cap; standing, then leaning over a map. Placed at headquarters on the Region map, so a standing sheet is right. |
| leader-assad (from leader-assad-command-DRAFT) | ACCEPT. Blue-grey Syrian air force uniform with wings and peaked cap, short moustache; standing, then on the telephone at a map table. |
| leader-elazar (from leader-elazar-walk-DRAFT) | ACCEPT. Black beret, olive field uniform, rank slides, field glasses; walking. |

**Batch 10 (7 November):** originals in units-raw/batch10/. Rows in order.

| sheet | review |
|---|---|
| leader-dayan | ACCEPT. Bald crown, black patch over the LEFT eye (checked in the front view), plain khaki shirt with no rank badges. In the side views the patch reads a little like sunglasses; invisible at game size. |
| leader-riad | ACCEPT. Egyptian general's khaki, red collar tabs, peaked cap, moustache. |
| leader-shazly | ACCEPT for now. Almost the same figure as Riad (peaked cap, moustache). The prompt asked for a lean face and a dark paratroop beret, which would tell them apart; a redo is wanted. They appear on different maps (Riad in Jordan, Shazly in Sinai), so this does not block the release. |

**Batch 11, leader corrections (7 November):** originals in units-raw/batch11/. Rows in order. They replace the earlier sheets (whose originals stay in units-raw).

| sheet | review |
|---|---|
| leader-shazly | ACCEPT, replacing the first one. Lean face, thin moustache, dark (maroon) paratroop beret: now clearly different from Riad. |
| leader-hussein-beret | ACCEPT, as a second Hussein sheet: khaki uniform and a dark beret, as in Cairo on 30 May 1967. The shemagh sheet (leader-hussein) stays for the battle scenes. |
| leader-tal | ACCEPT, replacing the helmet-and-goggles one: black armoured-corps beret, headset round his neck. |
| leader-sharon | ACCEPT, replacing the slim one: heavy-set, broad face, bare-headed. |

**Batch 12, the last Egyptian sheets (7 November):** originals in units-raw/batch12/. Rows in order.

| sheet | review |
|---|---|
| egy-airfield (from egy-airfield-ALTERNATE-DRAFT) | ACCEPT. Silver MiG-21 with Egyptian roundels: intact, hit, burning, burnt-out wreck, in four directions. Chosen over the other draft because it has no square of concrete under the jet, so it sits on the painted map. |
| fallen-egy | ACCEPT after cleaning: sand-khaki uniforms, 16 poses; the red bloodstains were recoloured to khaki here (no-blood rule). |
| egy-t34-fire (from egy-t34-dugin-DRAFT) | ACCEPT as a T-34/85 firing in the open (not dug in). The muzzle flash is at the end of the gun in every row. Small "115" numbers and flags on the turret, tiny at game size. A berm added here by hand looked crude and was not used. |
| egy-t34-dugin | ACCEPT. A T-34/85 dug into a pit behind sandbags, only the turret and a strip of hull showing; still, firing (flash at the end of the barrel in every row), smoke, recoiled. Smoke tint neutralised to grey here. |
