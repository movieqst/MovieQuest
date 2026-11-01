# Art prompts for the Battle of Edington

Give ChatGPT the prompt **and** the attached `edington-layout-guide.png`. North is up. No text, labels, arrows,
armies or frame in the picture: the game adds its own.

## The battlefield  →  `images/terrain.jpg`

Size: 4800 × 3600 pixels (4:3), or the largest 4:3 ChatGPT can make.

> Paint a top-down, slightly oblique view of a battlefield on the chalk downs of Wiltshire, England, in May 878, in
> the style of a detailed, realistic strategy-game map (like a Total War campaign map or an Osprey battle-map
> painting): rich brushwork, soft late-spring light from the upper left, natural greens and chalky creams, no cartoon
> look.
>
> Use the attached layout image as the exact plan; keep every feature where its outline is:
> - Open, rolling chalk downland with short springy grass, scattered gorse and hawthorn, and pale chalk showing
>   through on tracks and steep banks. Almost no trees on the open downs.
> - Across the top third, a long grassy ridge with a steep scarp: the high ground where the Viking army stood. The
>   slope runs down toward the middle of the map, so the West Saxons must attack uphill.
> - The middle of the map is the open down where the two shield walls meet: plain grass, a few chalk tracks, no
>   buildings, no fields.
> - At the bottom, gentler slopes leading in from the south-west and south, with a faint chalk trackway (the way
>   the Saxons came from Iley Oak).
> - The two areas marked FOREST (bottom left and bottom right) are patches of old woodland: oak, ash and hazel.
> - Far in the top corner, beyond the ridge, a hint of an old earthwork hillfort with grassy banks and ditches (the
>   Viking stronghold).
> - Small details: sheep tracks, a few burial mounds (round barrows), flints, wildflowers in the grass.
> - No armies, no people, no buildings, no modern roads or fences, no text, no frame or vignette.

If the result moves things, reply: "Keep every feature exactly where it is on the layout image; do not reinterpret
the layout." (Or send it anyway: I can trace the game's map from the painting.)

---

## Unit sprite sheets  →  `images/units/<name>.png`

Four sheets, one per soldier. The game cuts each sheet into a grid, so the layout must be exact.

**Format for every sheet:**
- **Size:** exactly **640 × 640 pixels**, a **4 × 4 grid** of 160 × 160 cells, with no gaps, lines or borders between them.
- **Rows** (top to bottom): the figure faces **toward the viewer (south)**, then **right (east)**, then **away (north)**, then **left (west)**.
- **Columns:** four frames of a slow walk cycle, left to right, that loop smoothly.
- **Placement:** one figure per cell, the same size in every cell, about 130 px tall, feet on the same line about 8 px above the bottom of the cell, centred left to right.
- **Background:** solid pure **green #00FF00** in every cell; I cut it out. No shadows on the ground, nothing green on the figure.
- **Viewing angle:** about 45° from above, like a strategy game, so you see the top of the shield and helmet.
- **Style:** painted and realistic, to match the attached battle map (`terrain.jpg`).
- **No text**, numbers or labels.

**1. `saxon-spearman.png`**

> Make a game sprite sheet of an Anglo-Saxon spearman of King Alfred's army, Wessex, 878 AD. He wears a knee-length wool tunic
> in muted red or brown, trousers with leg wraps, leather shoes, and an iron cap or a plain round helmet (no horns). He carries a
> big round wooden shield painted red with an iron boss, and a long ash spear with an iron head, held upright. A seax knife at
> his belt. Wealthier look, but no plate armour.
> [paste the format block above]

**2. `saxon-archer.png`**

> Make a game sprite sheet of an Anglo-Saxon bowman of King Alfred's army, Wessex, 878 AD. Wool tunic in earth colours, a hood or
> bare head, leg wraps, a simple wooden self bow (no curved composite bow), and a quiver of arrows at his hip. No shield, no
> armour. He walks with the bow in his left hand.
> [paste the format block above]

**3. `viking-spearman.png`**

> Make a game sprite sheet of a Viking warrior of Guthrum's Great Army, England, 878 AD. Wool tunic in blue-grey or dark green,
> a mail shirt to the hips on some, a rounded iron helmet with a nose guard (no horns), a big round wooden shield painted blue
> with an iron boss, and a spear held upright. A sword or axe at the belt.
> [paste the format block above]

**4. `viking-archer.png`**

> Make a game sprite sheet of a Viking bowman of Guthrum's army, England, 878 AD. Wool tunic and cloak in muted colours, a
> fur-trimmed cap or bare head, a long wooden self bow, and a quiver of arrows on the back. No shield, no armour.
> [paste the format block above]

**Check before sending:**
- the sheet is square
- there are 16 figures in a 4 × 4 grid
- the rows face toward you, right, away, then left
- the background is all bright green

If a row faces the wrong way, I can usually fix it. A sheet with the wrong grid needs remaking.

---

## Armies card portraits  →  `images/portraits/<name>.jpg`

One picture per card in the Armies panel. **Format:** landscape **4:3**, at least **1024 × 768**, a single realistic
painted portrait (head and upper body, slightly from below), a plain softly blurred battlefield background, natural
light, **no text, no border**. The cards crop to the centre, so keep the face and shield in the middle. Saved as JPG
with the names below.

1. `saxon-fyrd.jpg`: an ordinary West Saxon farmer-soldier of the fyrd, 878: wool tunic and cloak, no armour, a round
   red-painted shield and an ash spear, determined weathered face, the Wiltshire downs behind.
2. `saxon-thegn.jpg`: one of King Alfred's thegns, a noble warrior: mail shirt, plain iron helmet with a nose guard, a
   sword at the hip, rich red cloak with a gilt brooch, round red shield; the golden dragon banner of Wessex blurred
   behind.
3. `viking-warrior.jpg`: a veteran of the Viking Great Army: mail shirt, rounded iron helmet with a nose guard (no
   horns), fur-trimmed cloak, round blue-painted shield and a Dane axe or spear, braided beard.
4. `viking-guthrum.jpg`: Guthrum, leader of the Viking army in Wessex (his real face is unknown): a commanding older
   chieftain, fine mail, a helmet with spectacle-like eye guards, a richly patterned cloak, silver arm rings, a sword,
   a raven banner blurred behind.
