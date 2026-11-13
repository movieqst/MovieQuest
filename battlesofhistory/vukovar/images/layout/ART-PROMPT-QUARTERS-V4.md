# Vukovar town map: quarters 1, 2 and 4 (prompts for ChatGPT, version 4, 13 November 2026)

**Why version 4.** The earlier quarter prompts were written for the old bases and described the river wrongly ("the
Danube fills much of quarter 2", "the Danube on the right" in quarter 1). ChatGPT followed the words, not the picture.
These prompts give the river's exact position, measured from OpenStreetMap, as percentages of the picture.
(Quarter 3 and the tower close-up are done.)

## How to do it (for each quarter, the same steps)

1. Open a **new chat** in ChatGPT (one chat per quarter).
2. Attach the three pictures **in this order**: the quarter's **base** (`town-qN-base.png`), its **guide**
   (`town-qN-guide.png`), then **`style-tower-close.png`**.
3. Paste **the common text** (below) and then **that quarter's text**, as one message.
4. If ChatGPT offers an **Edit** option for the first picture, use it on the whole picture.
5. When the picture comes back, look at the river: does it enter and leave the picture where the prompt says? If not,
   reply: *"The river is in the wrong place. Put it exactly where it is in the first picture, entering at … and leaving at …"*
   (copy the numbers from the prompt).
6. Download the original (PNG) and send it to Claude.

## Common text (paste first, every time)
```text
Repaint the FIRST picture (the base map) as a realistic aerial photograph of Vukovar, Croatia, in late October 1991, before the war damage. This is an EDIT of the first picture: keep its framing, size and every shape exactly.
The three pictures: (1) BASE: the real terrain, rivers and streets, top-down, north at the top. Everything must stay exactly where it is in this picture. (2) GUIDE: the same area with labels and red crosses, only to tell you what is where; do not copy any text, lines or crosses. (3) STYLE: a painting of a different, smaller part of the town in exactly the look we want; copy ONLY its colours, light, autumn mood and level of detail, NOT its river, streets or layout.
RULES:
- Straight down from above, like a satellite photo: no tilt, no horizon, no perspective. Tall buildings show only their roofs.
- The rivers: same course, same width, same banks as the dark blue in the base. Do not widen, narrow, straighten, move or add any river.
- The streets: every light line in the base is a street or road; paint it as a 1991 street with trees, exactly on its line. Do not add streets.
- Brown/shaded areas in the base: the town in 1991 (red-tiled houses with gardens, orchards, trees). Areas without streets or shading: fields, meadows, woods, no buildings.
- Autumn colours, soft clear light. No people, vehicles, smoke, damage, text, labels, grid or frame.
- Output: the same landscape shape as the base (4:3), as large as possible.
```

## Quarter 1 (north-west: Borovo Naselje)
Attach `town-q1-base.png`, `town-q1-guide.png`, `style-tower-close.png`.
```text
QUARTER 1, north-west of Vukovar: Borovo Naselje.
THE DANUBE (check this carefully, it is the most important thing): it ENTERS through the TOP edge, between 56% and 76% of the width from the left. It bends LEFT and DOWN: at half height it is a narrower river between 46% and 52% of the width (the middle of the picture). Then it swings RIGHT again and LEAVES through the BOTTOM edge between 85% and 98% of the width. So the river runs through the MIDDLE of the picture in a curve, NOT along the right edge.
WEST of the river (left part of the picture): Borovo Naselje, a planned 1930s factory town, around 34% from the left and 45% from the top: very large shoe and rubber factory halls (long parallel halls, sawtooth roofs, a tall chimney), a grid of streets with blocks of flats and small houses with gardens, a railway along the river. Lužac, a smaller settlement, around 47% from the left, 88% from the top. Fields elsewhere.
EAST of the river (right part, about a third of the picture): Serbia, flat floodplain: willow and poplar woods, meadows, small oxbow ponds. No town there.
Bottom right corner: the northern edge of Vukovar with the hospital (cross "HOSPITAL", 74% from the left, 93% from the top).
```

## Quarter 2 (north-east: the Serbian floodplain)
Attach `town-q2-base.png`, `town-q2-guide.png`, `style-tower-close.png`.
```text
QUARTER 2, north-east of Vukovar.
THE DANUBE ONLY TOUCHES THE BOTTOM-LEFT CORNER: it comes in through the LEFT edge between 79% and 94% of the height and leaves through the BOTTOM edge between 4% and 17% of the width. That is all: about 2% of the picture is river. Do NOT paint a big river across this picture.
Everything else (98% of the picture) is the flat floodplain on the Serbian side of the Danube: dense willow and poplar woods in autumn colours, open meadows, small oxbow ponds and thin winding side channels where the base shows them, a few dirt tracks. No town, no buildings, except a few red roofs of Vukovar in the very bottom-left corner.
```

## Quarter 4 (south-east: the town centre and the water tower)
Attach `town-q4-base.png`, `town-q4-guide.png`, `style-tower-close.png`.
```text
QUARTER 4, south-east of Vukovar: the town centre, the water tower and the Danube.
THE DANUBE (check this carefully): it ENTERS at the TOP-LEFT corner (the left edge from the top down to 27% of the height). It runs DIAGONALLY DOWN TO THE RIGHT: at the middle of the picture (50% from the left) the water spans from 31% to 48% of the height; it LEAVES through the RIGHT edge between 47% and 73% of the height. It is NOT along the top edge. Above (north of) the river: Serbia, flat floodplain woods and meadows. Below (south of) the river: Croatia.
THE TOWN is only in the LEFT part of the picture (about the left 20%), below the river: red-tiled houses, gardens, trees along the streets of the base.
LANDMARKS, each exactly on its red cross in the guide (percent from the left, percent from the top):
- WATER TOWER at 16%, 44%, on the river bank: a tall concrete water tower seen from straight above: we see its ROUND TOP (a light grey disk) with a short shadow, in a small round park. Do not draw it from the side.
- Franciscan church and monastery at 10%, 36%: a baroque church with a bell tower and a monastery round a courtyard, on the hill above the river.
- JNA BARRACKS at 8%, 61%: a walled compound of long low buildings with red roofs around a large parade ground.
- Eltz Palace at 2%, 17% (at the left edge): a long baroque palace with a park, north of the small river Vuka.
EAST of the town (the middle and right of the picture, below the river): the Vučedol slopes above the Danube with vineyards and orchards, then large harvested fields and strip fields with rows of trees along the roads.
```
