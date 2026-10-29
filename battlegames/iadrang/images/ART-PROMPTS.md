# Art prompts for the Battle of the Ia Drang

Give ChatGPT (or any image generator) the prompt **and** the attached layout
guide. The guides are the game's real maps with every feature outlined, so the
painting lands where the engine expects it. Save results into this `images/`
folder with the file names shown. The game picks them up automatically.

Hard rules for every image: **north is up**, nothing mirrored or rotated;
**no text, labels, arrows, legends or borders** in the image (the game adds
its own); keep the exact aspect ratio stated.

---

## 1. The two battlefields

### LZ X-Ray  →  `images/terrain-xray.jpg`   (guide: `iadrang-xray-layout-guide.png`)

Size: 4800 × 3600 pixels (4:3). If the generator cannot do that, make the
largest 4:3 it can and I will upscale.

> Paint a top-down, slightly oblique view of a landing zone in the Central
> Highlands of South Vietnam in November 1965, in the style of a detailed,
> realistic strategy-game map (a Total War campaign map or an Osprey battle
> painting): rich brushwork, hard dry-season sunlight from the upper left,
> soft shadows, tawny and olive colours, no cartoon look.
>
> Use the attached layout image as the exact plan. Keep every feature in the
> same place and at the same size as the coloured outlines:
> - The blue-edged region on the left is the lower slope of the Chu Pong
>   massif, rising toward the west: darker green, denser jungle, with the
>   ground climbing steadily off the left edge of the picture.
> - The red ellipse is the clearing, LZ X-Ray: open ground of dry tawny
>   grass with bare patches, a few head-high reddish termite mounds, no trees.
> - The yellow line is a dry creek bed: a sandy channel a metre deep with
>   stones, roots and a few pools, with low banks.
> - Green ellipses marked WOODS are scrub forest: trees up to thirty metres
>   with open ground beneath, scattered rather than solid.
> - Yellow ellipses marked ELEPHANT GRASS are belts of grass taller than a
>   man, yellow-green, matted.
> - Orange circles are termite mounds: reddish-brown, two to three metres high.
> - The magenta line is a foot trail.
> - Everything else is open scrub: dry grass, bushes, scattered trees.
> - No people, no vehicles, no smoke, no text.
> Finish as a seamless painting with no vignette, frame or border.

### LZ Albany  →  `images/terrain-albany.jpg`   (guide: `iadrang-albany-layout-guide.png`)

Same size and style. The differences:

> There is no mountain. The small red ellipse near the top right is the
> Albany clearing, a smaller patch of open ground; the tiny red ellipse in the
> middle is a second small clearing. The magenta trail runs diagonally from
> the bottom left to the clearing at the top right through elephant grass and
> scrub woods. The yellow line at the bottom right is a shallow stream bed.
> Much more elephant grass than at X-Ray: this is where a column was ambushed
> in grass taller than a man.

If the result moves the clearing or the creek, reply: "Keep the clearing
inside the red ellipse and the creek exactly on the yellow line; do not
reinterpret the layout."

---

## 2. Unit sprite sheets  →  `images/units/<name>.png`

Each sheet is one unit drawn in **4 directions**, one row per direction, in
the order **S (facing the viewer), E, N (back to the viewer), W**. Each row
has **4 frames** of a walking cycle (the game uses frames 1 and 2 for standing).
Sixteen cells in all. Transparent background (PNG). Feet at the bottom centre
of each cell; the same scale across all sheets.

| Sheet | Cell size | Sheet size | Figure height |
|---|---|---|---|
| infantry sheets | 160 × 160 | 640 wide × 640 tall | about 120 px |
| `us-huey.png` | 240 × 200 | 960 wide × 800 tall | about 160 px long |

Common style line for all:

> Realistic painted game sprite, Vietnam War 1965, three-quarter top-down
> view as in a classic isometric strategy game, soft hard-sun lighting from
> the upper left, crisp silhouette, transparent background, no text, no
> shadows baked in (the game adds them).

### `us-rifle.png`
> US Army rifleman, 1st Cavalry Division, 1965: olive-green jungle fatigues,
> M1 steel helmet with cloth cover, web harness with canteens and ammunition
> pouches, black boots, M16 rifle carried at the ready.

### `us-weapons.png`
> US Army machine gunner, 1965: same uniform and helmet, M60 machine gun
> carried with a belt of ammunition over the shoulder; in the standing frames
> he kneels behind the gun on its bipod.

### `us-huey.png`
> Bell UH-1D Huey helicopter in US Army olive drab, 1965, seen from above and
> slightly to the side, doors open, a door gunner's M60 on a mount, main
> rotor as a blurred disc, skids down. Four frames differ only in the rotor
> blur angle.

### `pavn-assault.png`
> North Vietnamese Army soldier, 1965: khaki-green uniform, pith sun helmet,
> sandals or canvas boots, chest rig of AK-47 magazines, AK-47 rifle; in one
> row variant an RPG-2 rocket launcher over the shoulder.

### `pavn-heavy.png`
> North Vietnamese heavy weapons crewman, 1965: same uniform and pith helmet,
> carrying an 82 mm mortar tube or a belt of 12.7 mm ammunition; in the
> standing frames he kneels beside a mortar on its baseplate.

### `pavn-recon.png`
> North Vietnamese reconnaissance soldier, 1965: dark green or black
> clothing, no helmet, a scarf or soft cap, light pack, AK-47, crouched and
> moving carefully.

---

## 3. Portraits  →  `images/portraits/<name>.jpg`

One painted portrait per unit card, landscape 3:2, about 900 × 600 pixels,
same realistic style, no text. The card shows a 84 × 60 crop, the write-up
shows the full picture.

- `us-rifle.jpg`: a US rifleman in a foxhole at the edge of a clearing, M16 in hand, termite mound behind, helicopters in the sky.
- `us-weapons.jpg`: an M60 team firing from behind a termite mound, mortar crew in the background.
- `us-huey.jpg`: a Huey landing in a dusty clearing under fire, soldiers jumping out, door gunner firing.
- `us-support.jpg`: fighter-bombers dropping napalm along a tree line while a 105 mm battery fires in the foreground.
- `pavn-assault.jpg`: North Vietnamese infantry in pith helmets charging through elephant grass with AK-47s and an RPG.
- `pavn-heavy.jpg`: a 12.7 mm machine gun crew dug in among termite mounds on a jungle slope.
- `pavn-recon.jpg`: two scouts in dark clothing watching a clearing from the bank of a dry creek bed.
