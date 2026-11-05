# Gaugamela: leader figures (prompts for ChatGPT)

Two leaders, each with **two sheets**: a moving sheet, and an action sheet used when there is fighting nearby. Send them back as separate full-size PNGs (about 1024 × 1024), zipped, with these names:
**leader-alexander.png**, **leader-alexander-attack.png**, **leader-darius.png**, **leader-darius-attack.png**.

**Accuracy (Arrian, Plutarch, the Alexander Mosaic):**
- **Alexander** rode **Bucephalus**, a big black horse with a white star on his forehead. Plutarch describes his armour at Gaugamela: a Sicilian tunic, a double linen corselet (linothorax) from the spoils of Issus, an iron helmet, a gorget, and a sword. The mosaic shows him bareheaded with windswept hair, and he was clean-shaven. No Hollywood bronze muscle armour, no lion-head cap, no red cloak over everything.
- **Darius III** commanded from a **tall war chariot** in the centre of his line (Arrian), as the mosaic shows. He wore a tall Persian upright tiara (kidaris), a purple and white robe, trousers and a beard, and held a bow. The chariot was drawn by horses, with a driver beside him. No Greek armour, no turban, no Arabian look.

## Shared block (paste first, then one description at a time)
```text
Make a sprite sheet for a historical battle game seen from above at an angle (three-quarter view, like a classic real-time strategy game).
- ONE square image, about 1024 x 1024 pixels: a 4 x 4 grid of equal cells on a flat pure green background (#00FF00). No shadows on the background, no grid lines, no borders, no text. Only ONE sheet in the picture.
- The same single figure (or group) in every cell, the same size in every cell, fully inside its cell with green space all round, hooves or wheels near the bottom.
- Row 1: facing the viewer (south). Row 2: facing RIGHT (east). Row 3: facing away (north). Row 4: facing LEFT (west).
- The 4 columns are 4 frames of the movement described.
- Painterly but crisp, rich colour, readable at small size. Historically accurate for the Battle of Gaugamela, 1 October 331 BC, in the dry, dusty plain of northern Mesopotamia. No bright green anywhere on the figures.
```

## 1. leader-alexander (riding; the 4 columns are a canter)
```text
Alexander the Great at Gaugamela, 331 BC, mounted: a young clean-shaven Macedonian king of 25 with windswept light-brown hair and no helmet (or a plain iron helmet with a white plume), a white linen corselet (linothorax) with a purple tunic beneath, bronze greaves, a short sword at his side and a long cavalry spear (xyston) held forward. He rides Bucephalus, a big black warhorse with a white star on his forehead, a leopard-skin saddle cloth and a simple bridle.
```

## 2. leader-alexander-attack (the same grid; action)
```text
The same Alexander on Bucephalus, in action: frames 1-2 couching the long cavalry spear and charging forward, frame 3 thrusting the spear, frame 4 drawing back with his sword raised. The horse rears slightly in frames 3-4.
```

## 3. leader-darius (in his chariot; the 4 columns are the chariot moving)
```text
Darius III, King of Persia, at Gaugamela, 331 BC, standing in a tall, richly decorated two-wheeled war chariot drawn by two horses with a driver beside him. Darius wears a tall upright Persian crown-hat (kidaris) and a flowing purple robe with a white band, trousers, a square-cut dark beard, and holds a bow. The chariot box is gilded and red. The horses have red and gold harness.
```

## 4. leader-darius-attack (the same grid; action)
```text
The same Darius in his chariot, in action: frames 1-2 drawing his bow and loosing an arrow, frames 3-4 pointing forward and commanding while the driver urges the horses on.
```

## Optional: portraits for the armies panel (square, one each)
```text
A square painted portrait, in the style of an ancient history book illustration, of [UNIT] at the Battle of Gaugamela, 331 BC, half length, against a dusty plain with the armies in the distance, in the clothing described: [DESCRIPTION]. Realistic, no text, no frame, the figure filling the picture.
```
Name them **portrait-alexander** and **portrait-darius**.

---
**On the page:** the Gaugamela page runs on an older engine with no leader figures yet. Once these sheets come back, it gets the leader feature from the newer battles (the same one Stirling and Vimy use), with Alexander leading the Companions and Darius in the centre.

## Received (5 November 2026): all four sheets approved
`images/units-raw/` holds ChatGPT's sheets. `images/units/leader-*.png` holds the same sheets cut to 240 × 200 cells.
- **Alexander:** a black Bucephalus with a leopard-skin saddle cloth, a white linen corselet over purple, bareheaded and clean-shaven. The action sheet shows the spear thrust and the raised sword. The rows face the right ways.
- **Darius:** a tall Persian crown and purple robe, a bow, a driver beside him, and a gilded red chariot with two white horses. The action sheet shows him drawing and loosing the bow, then pointing.
- **To do:** give the Gaugamela page the leader feature from the newer engine (Stirling and Vimy).
