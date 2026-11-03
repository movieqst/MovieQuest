# Stirling Bridge: art for the battle page (prompts for ChatGPT)

Send the results back as files (zipped), one image per sheet. I key out the green and cut each sheet to size.
Use the file names below (in bold) for each picture.

**Accuracy for 1297** (from our research and ChatGPT's fact-check):
- **No kilts, no tartan, no blue face paint, no Braveheart.**
- **Scots:** ordinary woollen tunics and hoods, most men without armour.
- **English:** knights in mail with surcoats.
- **Banners:** no saltire flags over every unit.

## Shared block (paste first, then one description at a time)
```text
Make a sprite sheet for a historical battle game seen from above at an angle (three-quarter view, like a classic real-time strategy game).
- ONE square image, at least 1024 x 1024 pixels: a 4 x 4 grid of equal cells on a flat pure green background (#00FF00). No shadows on the background, no grid lines, no borders, no text.
- The same single figure in every cell, the same size in every cell, fully inside its cell with green space all round, feet near the bottom.
- Row 1: walking toward the viewer (south). Row 2: walking to the RIGHT (east). Row 3: walking away (north). Row 4: walking to the LEFT (west).
- The 4 columns are 4 frames of a walk cycle (for a horse: a trot cycle).
- Painterly but crisp, rich muted colour, readable at small size. Historically accurate for Scotland, September 1297. NO kilts, NO tartan, NO face paint.
```

## A. Units (4 sheets)
1. **scots-spearman:** `A Scottish spearman of 1297: a long woollen tunic in brown or dull green, a hooded cloak, hose and simple leather shoes, a padded jacket (aketon) or no armour at all, an iron cap (kettle hat or simple helmet) or bare head, a very long spear (about 4 metres) held upright, a small round wooden shield on the back, a long knife at the belt.`
2. **scots-horseman:** `A Scottish mounted man-at-arms of 1297: a mail shirt (hauberk) and mail hood, a plain coloured surcoat, an open iron helmet, a lance and a sword; a sturdy hill pony or small horse with a simple saddle.`
3. **english-knight:** `An English knight of Edward I's army, 1297, mounted: full mail armour (hauberk, mail hood, mail leggings), a surcoat in a heraldic colour (red, or gold and blue chequers), a flat-topped great helm or a rounded helmet, a triangular heater shield, a lance with a small pennon; a big warhorse with a cloth caparison.`
4. **english-foot:** `An English or Welsh foot soldier of 1297: a padded jacket (gambeson), a simple iron helmet or bare head with a hood, hose, a spear or a longbow with a quiver of arrows at the belt, a short sword or long knife. Welsh soldiers are often barefoot or in rough shoes, with a plain tunic.`

## B. Leaders (5 sheets, the same grid; mounted unless stated)
- **leader-wallace:** `William Wallace, 1297, on foot: a tall strong Scottish man about 25, brown hair, short beard, a mail shirt under a plain dark-blue surcoat, a long two-handed sword carried on the shoulder, no helmet. Not the Braveheart film look: no kilt, no face paint.`
- **leader-moray:** `Andrew Moray, 1297, mounted: a young Scottish nobleman in mail with a surcoat of blue with three white stars, an open helmet, a sword; a grey horse.`
- **leader-surrey:** `John de Warenne, Earl of Surrey, 1297, mounted: an elderly English earl in full mail, a surcoat chequered in gold and blue (the Warenne arms), a great helm carried at the saddle, a sword; a big bay warhorse with a gold-and-blue chequered caparison.`
- **leader-cressingham:** `Hugh de Cressingham, 1297, mounted: a stout, heavy English royal official in mail with a plain red surcoat, a rounded helmet, a sword; a heavy horse.`
- **leader-thweng:** `Sir Marmaduke Thweng, 1297, mounted: a Yorkshire knight in full mail, a green surcoat, a great helm, a sword raised; a dark warhorse.`

## C. Portraits for the armies panel (4)
```text
A painted portrait, in the style of a historical book illustration, of [UNIT] at Stirling, Scotland, in September 1297, half length, standing in a green river meadow under a grey sky, with a wooden bridge and a castle on a rock in the far distance, in the clothing and equipment described: [DESCRIPTION]. Realistic, no text, no frame, the figure filling the picture edge to edge. No kilt, no tartan, no face paint.
```
Use the four unit descriptions above. Name them **portrait-scots-spearman**, **portrait-scots-horseman**, **portrait-english-knight** and **portrait-english-foot**.

## D. One establishing picture (optional)
- **establish-bridge:**
```text
A realistic painting of the wooden bridge over the River Forth at Stirling on the morning of 11 September 1297: a long, narrow timber bridge on wooden piers, only wide enough for two horsemen, crossing a dark slow river between wet green meadows; Stirling Castle on its rock in the distance behind, the steep wooded Abbey Craig on the other side. English knights in mail with coloured surcoats riding onto the bridge two by two. Early morning light, mist on the river. No modern things, no stone bridge, no Wallace Monument, no text.
```

## Received (3 November 2026)
ChatGPT's 9 sheets (4 units, 5 leaders) were cut out by `tools/prepare-sprite-sheet.py` and `clean-sprite-sheet.py`, after the white border strips from ChatGPT's composite had been keyed out. They are in `images/units/`:
- **Units:** infantry at 160 px cells; horse at 240 × 200.
- **Leaders:** `leader-<id>.png`. Wallace is on foot, at 160 px cells.

Still to come: the 4 portraits (section C) and the optional bridge painting (D).

## Received: 12 more sheets (3 November 2026)
**Used on the page:**
- **scots-archer:** the Scottish archers (a new formation, about 400 in the HES reconstruction).
- **english-spearman:** English foot.
- **english-longbowman:** the Welsh and English foot.
- **english-man-at-arms:** the vanguard's foot.
- **baggage-wagon:** the English baggage.

**Cut out but not used yet:** scots-axeman, scots-swordsman, horseman-light, pack-horse, english-crossbowman. Crossbowmen in Stirling Castle's garrison are possible but unverified.

**Not used:**
- **boulder-crew:** nothing in the sources about rolling boulders at Stirling Bridge.
- **bridge-section:** the bridge is painted on the map.
