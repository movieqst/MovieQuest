# Six-Day War 1967: painting the maps (first release)

`sixday/tools/draw-layout-guides.py` draws each map from **real elevation data**. Each map has two pictures:
- **`*-base.png`:** terrain, sea and lakes only. This is the picture ChatGPT repaints.
- **`*-guide.png`:** places, today's borders (for orientation only) and a latitude/longitude grid.

All are 2400 × 1800 pixels (4:3), north at the top. The game places soldiers on exact pixels, so **each painting must line up exactly with its base**. Attach the base first and the guide second, then paste the prompt.

**Rule for every map:** June 1967 only.
- No Israeli settlements built after 1967.
- No separation barrier, no modern highways, no post-1967 towns or suburbs.
- No text, labels, borders, grids, arrows or dots.

## 1. Region: Cairo to Damascus (region-base.png)
```text
Repaint the first image (region-base.png) as a realistic, high aerial view of the eastern Mediterranean in early June 1967, about 650 km across, like a gentle satellite photograph. The second image is a guide only: do not copy its labels, borders or grid.
ALIGNMENT: exactly the same framing, 4:3, north at the top. Do not crop, zoom, rotate or shift. It covers 33.80°N 30.55°E (top left) to 29.41°N 37.40°E (bottom right). Every coastline, the Nile and its delta, the Suez Canal, the Gulf of Suez, the Gulf of Aqaba, the Dead Sea, the Jordan River and the Sea of Galilee stay EXACTLY where they are in the first image.
PAINT: the deep blue Mediterranean; the green Nile delta and valley; the yellow-tan Sinai desert with dark mountains in the south; the green coastal plain and hills of Israel and Lebanon; the brown hills of the West Bank and Jordan; the dark basalt of the Golan and southern Syria; the steppe and desert east of the Jordan. Early summer: dry, golden fields. Soft natural colours, light relief shading.
NO text, labels, borders, grid lines, arrows, dots, cities' lights or roads.
```

## 2. The air strike: Egypt, Sinai and the Straits (airstrike-base.png)
```text
Repaint the first image (airstrike-base.png) as a realistic, high aerial view of Egypt and Sinai in June 1967, about 620 km across, like a gentle satellite photograph. The second image is a guide only: do not copy its labels.
ALIGNMENT: exactly the same framing, 4:3, north at the top. It covers 31.90°N 30.45°E (top left) to 27.70°N 36.89°E (bottom right). Every coastline, the Nile, the Suez Canal and its lakes, the Gulf of Suez, the Gulf of Aqaba, the Straits of Tiran and the islands stay EXACTLY where they are in the first image.
PAINT: the green Nile delta and valley around Cairo; the yellow-tan sands of northern Sinai with dunes along the coast; the gravel plains of central Sinai; the dark red-brown granite mountains of southern Sinai; turquoise coral shallows along the Red Sea coasts; the Arabian desert east of the Gulf of Aqaba. Soft natural colours, light relief shading.
NO text, labels, borders, grid lines, arrows, dots, airfields drawn as symbols, or roads.
```

## 3. Jerusalem (jerusalem-base.png)
```text
Repaint the first image (jerusalem-base.png) as a realistic aerial view of Jerusalem on 5-7 June 1967, about 8.8 km across, seen straight down. The second image shows what is where; do not copy its labels.
ALIGNMENT: exactly the same framing, 4:3, north at the top. It covers 31.809°N 35.188°E (top left) to 31.749°N 35.281°E (bottom right). The hills and valleys stay EXACTLY where the shading shows them: the Kidron valley east of the Old City, the Hinnom valley to its south, Mount Scopus and the Mount of Olives ridge to the east.
PAINT, as in June 1967:
- The walled Old City (about 1 km square) with its stone walls and gates, the Temple Mount / Haram al-Sharif platform with the golden Dome of the Rock, and tightly packed limestone houses.
- West Jerusalem to the west, with stone buildings and tree-lined streets.
- The 1949 armistice line: a no-man's-land strip of ruined buildings, barbed wire and empty ground running north to south just west of the Old City wall, past the Mandelbaum Gate area.
- East Jerusalem north of the Old City (Sheikh Jarrah, the American Colony).
- Ammunition Hill to the north: a bare hill with zig-zag trenches and bunkers, and the Police School building nearby.
- The Mount Scopus enclave (the Hebrew University buildings and Hadassah hospital) and the Augusta Victoria hospital on the ridge.
- Olive groves, terraces and bare limestone hills around the city; Government House on a ridge to the south.
Early summer, dry, bright Mediterranean light.
NO text, labels, grid lines or dots. NO post-1967 buildings, Israeli neighbourhoods built after 1967 (Ramot, Gilo, French Hill), the separation barrier, light rail or modern highways. No people (the game draws the soldiers).
```

## 4. Golan: Tel Faher (golan-base.png)
```text
Repaint the first image (golan-base.png) as a realistic aerial view of the edge of the Golan Heights above the Hula valley on 9 June 1967, about 10 km across, seen straight down. The second image shows what is where; do not copy its labels.
ALIGNMENT: exactly the same framing, 4:3, north at the top. It covers 33.258°N 35.638°E (top left) to 33.190°N 35.745°E (bottom right). The steep escarpment and the slopes stay EXACTLY where the shading shows them.
PAINT, as in June 1967:
- Below the escarpment to the west: the green, farmed Hula valley with Israeli kibbutz fields.
- The escarpment: a steep, rocky slope of dark basalt boulders and thorn scrub, cut by gullies.
- On top: the Syrian fortified positions: Tel Faher, Tel Azaziat and Burj Babil, with zig-zag trenches, concrete bunkers, barbed wire and minefields, among dark basalt rocks and dry grass.
- A few Syrian villages of dark basalt houses, and a dirt road climbing the slope.
- The Banias spring and its trees at the north.
Early summer, dry yellow grass, bright light.
NO text, labels, grid lines or dots. NO modern memorials, wind turbines, Israeli settlements built after 1967, or paved highways. No people.
```

---
## After ChatGPT
Send me each painting. I check it lines up by laying the base over it, as for Batoche and Fish Creek.
- **Abu-Ageila** comes later, once its position is checked against the old Sinai maps.
- The other maps follow in the build order in `sixday/plan/maps.md`.
