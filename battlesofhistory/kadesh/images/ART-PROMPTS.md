# Art prompts for the Battle of Kadesh

Give ChatGPT (or any image generator) the prompt **and** the attached file
`kadesh-layout-guide.png`. The guide is the game's real map with every feature
boxed, so the painting lands where the engine expects it. Save results into
this `images/` folder with the file names shown. The game picks them up
automatically; nothing needs editing.

Hard rules for every image: **north is up**, nothing mirrored or rotated;
**no text, labels, arrows, legends or borders** in the image (the game adds
its own); keep the exact aspect ratio stated.

---

## 1. The battlefield  →  `images/terrain.jpg`

Size: 4800 × 3600 pixels (4:3). If the generator cannot do that, make the
largest 4:3 it can and I will upscale.

> Paint a top-down, slightly oblique view of the battlefield of Kadesh on the
> Orontes River, Syria, in the late Bronze Age, 1274 BCE, in the style of a
> detailed, realistic strategy-game map (think Total War campaign map or an
> Osprey battle-map painting): rich brushwork, natural lighting from the
> upper left, soft shadows, muted ochre and olive colours, no cartoon look.
>
> Use the attached layout image as the exact plan. Keep every feature in the
> same place and at the same size as the coloured outlines:
> - The Orontes River follows the long cyan line on the right, winding from
>   the bottom right (south-east) toward the top (north) in tight bends and loops: a
>   slow river with muddy banks, reeds, sandbars and shallows, and a strip of
>   green irrigated fields along both banks.
> - A smaller stream (the al-Muqadiyah) follows the second cyan line on the
>   left. It rises at a round spring pool (the box marked SPRING POOL, lower
>   left of centre), winds north-east well apart from the river, closes in
>   on it near the city, runs along the west side of the city, curves round the city's north side and joins the river at
>   the north-east corner. It is narrower than the river, in a small ravine
>   with dark green trees and bushes along its banks. The city stands in the
>   fork between the two waters.
> - Kadesh, in the red box beside the river, is a fortified Bronze Age city on
>   a low mound (a tell) with mud-brick walls, square towers, a citadel, and a
>   water-filled moat all round: on the south side it is a dug canal
>   linking the stream to the river, which makes the city an island. Paint only the mound, moat and
>   ground; keep walls low in the picture (the game draws standing walls on
>   top).
> - The Egyptian camp box is a rectangle of trampled ground with faint tent
>   marks, no tents (the game draws them).
> - The FORD boxes are shallow, stony crossings with ripples (three on the
>   river, one with stepping stones on the stream). The BRIDGE box is a small
>   wooden bridge where the yellow road crosses the stream.
> - The yellow line is a dusty dirt road with wheel ruts.
> - Red ellipses marked FOREST are groves of oak, pine and tamarisk; those
>   marked HILL are low rocky rises with scrub.
> - The rest is open steppe: dry grass, bare patches, scattered scrub, small
>   irrigated fields near the river in greens and golds, goat tracks.
> - No armies, no people, no animals, no text.
> Finish as a seamless painting with no vignette, frame or border.

If the result moves the river or city, reply: "Keep the river exactly on the
cyan lines (river and stream) and the city inside the red box; do not
reinterpret the layout."

---

## 2. Unit sprite sheets  →  `images/units/<name>.png`

Each sheet is one unit drawn in **8 directions**, one row per direction,
in the order: **S, SW, W, NW, N, NE, E, SE** (top row faces the viewer).
Each row has **8 frames**: 4 standing/idle, then 4 walking. 64 cells in all.
Cell size 128 × 128 px, so the sheet is 1024 wide × 1024 tall. Transparent
background (PNG). Figure feet at the bottom centre of each cell, consistent
scale across all sheets (an infantryman about 90 px tall, a chariot about
120 px long).

Common style line for all six:

> Realistic painted game sprite, late Bronze Age, three-quarter top-down
> view as in a classic isometric strategy game, soft lighting from the upper
> left, crisp silhouette, transparent background, no text, no shadows
> baked in (the game adds them).

### `egyptian-spearman.png`
> Egyptian New Kingdom infantryman: short white linen kilt, bare chest or
> leather bands, striped cloth headcloth, tall rounded-top shield of hide
> over wood, bronze-tipped spear, bronze khopesh sickle-sword at the belt.

### `egyptian-archer.png`
> Egyptian New Kingdom archer: white kilt, headcloth, composite bow, quiver
> on the back, no shield.

### `egyptian-chariot.png`
> Egyptian war chariot: light, two spoked wheels (six spokes), open-backed
> cab of wood and leather, two horses with plumed headdresses and blue and
> gold trappings, crew of two: a driver and an archer with a composite bow.

### `hittite-spearman.png`
> Hittite infantryman: knee-length red-brown tunic, wide belt, conical
> bronze helmet with cheek pieces and a crest, round shield, long thrusting
> spear, short sword.

### `hittite-archer.png`
> Hittite allied archer: tunic, cap or conical helmet, composite bow,
> quiver, no shield.

### `hittite-chariot.png`
> Hittite war chariot: heavier than the Egyptian, cab of wood with a solid
> front, two wheels, two horses in red and bronze trappings, crew of three:
> a driver, a shield bearer with a figure-of-eight shield, and a spearman.

If the generator cannot produce a clean grid in one go, ask for one
direction per image (8 images of 8 frames each, 1024 × 128) and I will
assemble the sheet.

---

## 3. Unit portraits for the side panel  →  `images/portraits/<name>.jpg`

Same six names as the sprite sheets. 512 × 384 px (4:3) each.

> Painted portrait of a [unit description from above] standing in
> three-quarter view on the dry steppe of Syria, late Bronze Age, warm
> evening light, realistic, detailed, in the style of a strategy-game unit
> card. No text.

---

## 4. Intro slideshow photos

These are **photographs of real objects and places**, not generated art.
See `README.md` in this folder for the list and where to find them on
Wikimedia Commons. Do not generate these: a made-up "relief" would be
passed off as evidence, which the game's confidence tags promise not to do.

---

## 5. Establishing map (shown for 5 seconds between the globe and the battlefield)  →  `images/establish-1-near-east.jpg`

Size: 1672 × 941 pixels (16:9). Attach a Google Maps satellite screenshot of the
eastern Mediterranean (Egypt to southern Turkey) as a geography reference.

> Paint an illustrated antique-style map of the eastern Mediterranean world
> around 1274 BCE, north up, in warm parchment and ochre tones with soft relief
> shading, like a museum atlas plate. Follow the attached satellite map for the
> real coastline: the Nile delta and valley at the bottom left, Cyprus, the
> Levant coast running north, the bend of the coast into Anatolia at the top.
> Show the Lebanon mountains as a ridge parallel to the coast and the Orontes
> River rising in the Bekaa valley behind them and flowing **north** past
> Kadesh, then turning west to the sea near Antioch. Kadesh is a small walled
> city on the Orontes about 25 km south-west of modern Homs, just south of a
> small lake, about 30 km inland from the coast at the gap in the mountains
> (between Tripoli and Homs). Shade Egypt's lands (the Nile, Sinai and Canaan)
> in a soft blue tint and the Hittite Empire (Anatolia and northern Syria down
> to just north of Kadesh) in a soft red tint, with Kadesh on the frontier
> between them. Label only: EGYPT, HATTI, KADESH, Orontes, Nile, Mediterranean
> Sea. No modern borders, no modern cities.

The game draws its own pulsing ring on Kadesh: when the new picture comes back,
tell me and I will move the ring onto the painted city.
