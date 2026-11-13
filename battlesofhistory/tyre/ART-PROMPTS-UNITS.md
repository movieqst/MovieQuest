# Siege of Tyre, 332 BCE: sprite prompts for ChatGPT

**For ChatGPT:** our other Alexander battle is **Gaugamela (331 BCE)**, not Granicus. Tyre reuses Gaugamela's sheets: **leader-alexander** (walking and attack), **macedonian-spearman** (phalanx), **macedonian-archer** and **macedonian-cavalry**. So the new sheets are the Tyrians, the ships, the siege works and the workers: **14 sheets**, plus 2 optional.
The mole itself is NOT a sprite: the game draws it as a growing terrain layer.

## Paste this block once at the start of the chat
```text
Sprite sheets for a historical strategy game: the SIEGE OF TYRE, 332 BCE, in the same painted style as our Gaugamela sheets (Alexander, phalanx, archers, cavalry).
EVERY SHEET:
- ONE square image, 1024 x 1024 or larger, a 4 x 4 grid of equal cells on a flat pure green background (#00FF00). Nothing else in the image.
- Rows, top to bottom: facing the viewer (south), facing RIGHT (east), facing away (north), facing LEFT (west). The four columns are four frames of the action.
- One figure (or one ship) per cell, the whole of it inside its cell, the same size in every cell, seen from a 3/4 top-down angle.
- No text, numbers, flags, blood or gore. No bright green on the figures or ships.
- Send each sheet as its own full-size PNG named exactly with the bold name I give; no previews or combined images.
HISTORY (332 BCE, eastern Mediterranean, summer):
- Tyrians are PHOENICIANS: bronze helmets (conical or rounded), linen or quilted tunics in white, red-purple (Tyrian purple) and ochre, round shields, spears, bows, slings; short beards, dark hair. Not Romans, not Greeks, not Persians.
- Ships are ancient OARED warships: a bronze ram at the waterline, one or more banks of oars, a single square sail (often furled in battle), eyes painted on the bow. No later medieval or Viking ships, no cannons.
- Macedonians as in our Gaugamela sheets.
```

## Part 1: the Tyrian defenders
1. **tyre-spearman** (walk): `A Phoenician citizen-soldier of Tyre: bronze conical helmet, quilted linen tunic dyed Tyrian purple and white, round wooden shield with a bronze rim, long spear, short dark beard. Walking.`
2. **tyre-spearman-attack** (action): `The same Tyrian spearman: frames 1-2 bracing his shield, frames 3-4 thrusting his spear.`
3. **tyre-archer** (action, on the wall): `A Tyrian archer on the battlements of a stone sea wall (only the wall top and the archer in each cell): frame 1 drawing, frame 2 loosing, frame 3 reaching for an arrow, frame 4 ducking behind the parapet.`
4. **tyre-slinger** (action): `A light Tyrian slinger in a white tunic: frames 1-2 whirling a sling, frame 3 releasing, frame 4 taking a stone from his pouch.`
5. **tyre-defenders-wall** (action, the defence of the breach): `Three Tyrian defenders on a stone wall top: frames 1-2 tipping a heated bronze shield of glowing red sand over the parapet, frame 3 throwing a net, frame 4 swinging a long pole with a hook (no blood).`

## Part 2: the ships
6. **ship-tyrian-trireme** (rowing): `A Phoenician trireme of Tyre: long low black-hulled warship with three banks of oars, a bronze ram at the bow, eyes painted on the bow, a curved stern, a furled square sail, archers and marines on the deck. 4 frames of rowing (oars sweeping).`
7. **ship-allied-quinquereme** (rowing): `A larger warship of Alexander's allied fleet (from Sidon, Byblos, Arwad or Cyprus): broad, high-sided quinquereme with many oars, a big bronze ram, a raised deck with marines and bowmen, painted eyes, a red-and-white furled sail. 4 frames of rowing.`
8. **ship-ram-pair** (attack): `Two warships lashed side by side, carrying a heavy wooden battering ram slung on ropes from a frame across both decks, pointing forward over the bows, with a roof of hides over the crew: frames 1-2 drawing the ram back, frames 3-4 swinging it forward to strike.`
9. **ship-bridge** (assault): `A warship with a wooden boarding bridge raised at the bow on ropes, hypaspists (Macedonian guardsmen with round bronze shields and helmets) crowded behind it: frames 1-2 approaching, frame 3 the bridge dropping forward, frame 4 men running across it.`
10. **ship-fireship** (burning): `A Tyrian horse-transport ship turned into a fireship: a wide hull packed with brushwood and torches, two masts with yard-arms hung with cauldrons of pitch and sulphur, its stern weighed down so the bow rides high. Frames: 1 smoking, 2 bursting into flame, 3 burning fiercely with black smoke, 4 a burnt-out hulk.`
11. **ship-sinking** (damage): `A damaged oared warship: frame 1 holed and listing, frame 2 low in the water, frame 3 half sunk with broken oars, frame 4 only wreckage floating. No people visible.`

## Part 3: the siege works
12. **siege-tower** (action): `A tall wooden siege tower on the end of a stone causeway, covered in fresh hides against fire, with archers and a small catapult on the top floor: frames 1-2 shooting, frame 3 hit by fire arrows and smoking, frame 4 burning. Wheels hidden by the causeway edge.`
13. **siege-catapult** (action): `A Macedonian torsion stone-thrower (lithobolos) on a wooden frame, with a crew of three in short tunics: frame 1 winding, frame 2 loaded, frame 3 releasing a stone, frame 4 recoil.`
14. **mole-workers** (work): `A group of labourers building a stone causeway into the sea: men carrying stones and baskets of earth, two men driving a wooden pile with a mallet, a few Macedonian soldiers with shields standing guard; behind them a screen of hides on poles. 4 frames of work. Only the workers and the near edge of the causeway in each cell.`

## Optional
15. **leader-azemilcus** (standing): `King Azemilcus of Tyre: a Phoenician king of about 50, curled dark beard, tall cylindrical cap, long embroidered robe of Tyrian purple with gold, a sceptre. Frames 1-2 standing, 3-4 raising his hand in prayer at an altar. A dignified figure, not a fighter.`
16. **tyre-civilians** (walking): `Tyrian townspeople fleeing to the temple: women in long dresses and veils, an old man, children, carrying bundles and a clay jar. 4 frames of walking. No weapons, no blood.`

**After ChatGPT:** I key out the green, cut each sheet to game size, check the row order and the 332 BCE details, and say ACCEPT or REDO for each.

## Review of the ship bundle (8 November 2026; TYRE-SHIPS-CLAUDE-REVIEW-2026-11-07.zip)

**tyrian-trireme-rowing-4-directions.png: ACCEPT** → cut as `images/units/ship-tyrian-trireme.png` (960×800, cells 240×200, rows s/e/n/w as drawn). Clean: bow towards the viewer in row 1, bow right in row 2, stern in row 3, bow left in row 4; the bow wave grows across the frames.
- Notes, not blockers: one bank of oars (a trireme had three; fine at sprite size); the sail is set (warships usually left masts and sails ashore before a battle); a trident on the sail is a Greek (Poseidon) sign, not a Tyrian one. Tyre's own coins showed Melqart riding a sea-horse, a dolphin, or an owl.
- **Mismatch to fix:** the damage sheet (`ship-tyrian-trireme-damage.png`) has a red sail with an Egyptian eye emblem, so a ship would change colour when hit. **REDO the damage sheet to match this one:** same hull and purple sail, same angle as the side view (bow right), 16 frames: rowing, holed and listing, burning, sinking. Ask for a plain purple sail or a dolphin emblem on both sheets if redone.

**boarding-bridge-and-siege-sequences-MIXED.png: not cut as a sheet.** Row by row:
- Row 1 (trireme rowing right, white sail with a purple trident): REDO not needed: duplicate of the accepted trireme in a different sail. Skip.
- Row 2 (warship lowering a boarding bridge, marines crossing): **ACCEPT as an effect** (one direction, mirror for the other). Arrian (2.23) says Alexander's ships carried bridges for the final assault on the breach. **Flag:** the flag is the "Vergina sun", which is a modern association for Macedon (from the 1977 tomb finds); ancient warships did not fly it. Ask for the flag to be removed or made a plain pennant.
- Row 3 (ladders against a wall from the ground): **REDO / not for Tyre.** The island city's walls rose from the water; the final assault came from ships with bridges onto a breach, not ladders from dry ground. (Could suit Gaza, the next siege, if we ever do it.)
- Row 4 (miners tunnelling under a wall): **not for Tyre** (an island: no mining). Alexander did mine the walls at **Gaza** two months later. Keep for that.

**previous-review files:** already decided earlier and in use (quinquereme, ram pair, fireship). `ram-ship-draft-NEEDS-REVIEW.png` stays superseded by the accepted ram sheets.

### Trireme damage, 3 versions (8 November 2026)
- **v1: ACCEPT** → `images/units/ship-tyrian-trireme-damage.png` (replaces the red-sail sheet). Clearest at sprite size: the hole and the water pouring in are easy to see in row 2, the fire grows through row 3, and row 4 ends in floating wreckage.
- v2: good too (tearing sail, strong list), but the hole is smaller. Kept as a spare in the review zip.
- v3: the holes are hard to see at sprite size.
- **Remaining mismatch:** these have the **dolphin** sail; the accepted rowing sheet (`ship-tyrian-trireme.png`) still has the **trident**. Redo the rowing sheet with the dolphin sail, same four directions, or edit the emblem by hand.
