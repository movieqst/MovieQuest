# Dunkirk, 26 May – 4 June 1940: map plan

What the reenactment shows: an army of nearly 400,000 men is trapped against the sea. They hold a canal line while ships
carry them home, first from the harbour, then from the open beaches and the harbour's long breakwater (the East Mole).
That needs **three maps at three scales**, because the story moves from the land campaign to the beaches to the sea.
No single map can show all three: the campaign is about 180 km across, the beaches about 50 km, and the crossing
about 150 km.

The layout guides are in `images/layout/` (drawn from real coordinates by `tools/draw-layout-guides.py`) and the
ChatGPT prompts are in `images/layout/ART-PROMPTS.md`.

---

## The three maps

### Map 1: The trap (campaign map, 20–28 May) · about 183 × 142 km · `dunkirk-1-campaign-guide.png`

- **Area:** Calais and Boulogne to Ghent, and the coast down to Arras.
- **Purpose:** shows *why* the army is at Dunkirk. It is the short opening, about a quarter of the run time.
- **On it:**
  - towns: Lille, Arras, Ypres, Cassel, Hazebrouck, Bergues
  - waterways: the Aa canal (where the German tanks stopped on 24 May), the Lys, the Yser and the Scheldt
  - the roads north to the coast
- **Units:** army-sized blocks with arrows, not men. The panzer divisions sweep up the coast from the west; Army Group
  B pushes from the east. The Allied pocket narrows into a corridor toward Dunkirk.
- **Events:**
  - 20 May: the Germans reach the sea at Abbeville
  - 21 May: the Arras counter-attack
  - 24 May: the halt order on the Aa canal
  - 25 May: Gort decides to fall back to the coast
  - 26–28 May: the corridor holds; the rearguard fights at Cassel and Wormhout
  - 28 May: Belgium surrenders, opening a gap in the east
  - French First Army holds at Lille until 31 May
- **Look:** a period staff map, with land in muted greens and browns, canals in blue and roads as thin lines. The
  game's blocks and arrows go on top.

### Map 2: The perimeter and the beaches (27 May – 4 June) · about 53 × 38 km · `dunkirk-2-perimeter-guide.png`

- **Area:** Gravelines to Nieuport, from the canals to about 10 km offshore.
- **Purpose:** the main map, about half the run time.
- **The perimeter**, a canal line taken from the official dispatch:
  - the French hold the west: the Mardyck canal and the Canal de la Colme
  - the British hold Bergues to Furnes and Nieuport, along the Bergues–Furnes canal and the Furnes–Nieuport canal
  - the Dunkirk–Furnes canal is the inner stop line
- **Inside the perimeter:**
  - the fields flooded around Les Moëres
  - lines of abandoned lorries
  - the burning oil tanks west of the port, under a black smoke column that hangs over everything
- **The town and harbour:** the wrecked harbour, the **East Mole** (a long breakwater, about 1.3 km), and Bastion 32,
  the French headquarters.
- **The three beaches:** Malo-les-Bains, Bray-Dunes and La Panne. Long queues of men stand in the water, with
  improvised jetties made from lorries driven into the sea.
- **Offshore:**
  - destroyers, minesweepers and paddle steamers
  - from 30 May, the little ships
  - small boats ferrying men out to them
- **Units:** British and French infantry, guns and rearguards on the canals; German divisions pressing at Bergues,
  Furnes and Nieuport; ships; and the Luftwaffe (Stukas and bombers) against the RAF over the beaches.
- **Events:**
  - 27 May: Captain Tennant finds that the East Mole can be used
  - 28–31 May: the numbers rise each day
  - 29 May: heavy air attacks; the Grafton, Grenade and Wakeful are lost
  - 31 May: Gort leaves
  - 1 June: the worst day for ship losses; daylight sailings stop
  - 2 June: the last British troops leave
  - 3 June: the French rearguard
  - 4 June: the last ship leaves before dawn; the port falls that morning
- **Look:** the same style as the Kadesh and Waterloo battlefields: a painted, slightly oblique view with sand dunes,
  grey sea, flooded fields and the smoke column.

### Map 3: The crossing (26 May – 4 June) · about 147 × 98 km · `dunkirk-3-channel-guide.png`

- **Area:** Dover, Ramsgate and the Downs to Dunkirk and Ostend.
- **Purpose:** the sea war, about a quarter of the run time, shown between beach chapters.
- **The three routes:**
  - **Z**, 39 sea miles: the shortest, along the French coast past Calais. It came under German guns from 27 May, so
    it was used at night only.
  - **X**, 55 sea miles: through the sandbanks. It was mined.
  - **Y**, 87 sea miles: east past the Kwinte Buoy, then north and west round the banks. The longest, open to air
    attack.
- **Also on it:** the Goodwin Sands, Dover harbour, the German guns at Calais, and German aircraft coming in from the
  south-east.
- **Units:** ship convoys moving along the routes (destroyers, ferries, the little ships), minesweepers clearing
  route X, air raids, and E-boats at night (the Wakeful was torpedoed on 29 May).
- **Look:** a sea chart with a grey-green Channel, the white cliffs at Dover, and the wakes of ships.

---

## Running order (which chapters play on which map)

| # | Chapter | Map |
|---|---|---|
| 1 | The breakthrough: the Germans reach the sea, 20 May | 1 |
| 2 | Arras, 21 May | 1 |
| 3 | The halt order, 24 May | 1 |
| 4 | Back to the coast; the corridor, 25–28 May | 1 |
| 5 | Operation Dynamo begins, 18:57 on 26 May | 3 |
| 6 | Route Z under fire; a slow first day, 27 May | 3 → 2 |
| 7 | The East Mole, 27 May | 2 |
| 8 | Belgium surrenders; the perimeter forms, 28 May | 2 |
| 9 | Air attack on the ships, 29 May | 2 |
| 10 | Night on route Y; E-boats, 29 May | 3 |
| 11 | The little ships, 30 May | 2 |
| 12 | The biggest day, 31 May | 2 |
| 13 | 1 June: the worst day at sea | 2 + 3 |
| 14 | The last British troops; "BEF evacuated", 2 June | 2 |
| 15 | The French rearguard, 3–4 June | 2 |
| 16 | The last ship, about 03:40 on 4 June | 3 |
| 17 | Debrief: the numbers, and what Churchill said ("wars are not won by evacuations") | – |

The figures to show on screen as the chapters play:
- **Men lifted per day:** 27 May 7,669 · 28 May 17,804 · 29 May 47,310 · 30 May 53,823 · 31 May 68,014 ·
  1 June 64,429 · 2 June 26,256 · 3 June 26,746 · 4 June 26,175
- **Total:** about 338,000

These are Admiralty figures. Sources differ a little, so they will be tagged as estimates.

---

## Establishing pictures (5 seconds each, between the globe and the first map)

0. **Straight after the globe: the Strait of Dover** (`images/establish-1-channel.jpg`), the wide ChatGPT painting
   with "UK" and "FRANCE" lettered. The pulsing ring goes on Dunkirk at `pulse: { x: .617, y: .596 }`. A smoke-free
   copy is wanted for the opening (20 May is before the oil tanks burned). The smoky one can come back when the story
   reaches the evacuation, about 27 May, for example at the first switch to map 3.
1. **Europe in May 1940:** a painted map with the German advance arrows from the Ardennes to the coast.
2. **The beaches:** the saved Imperial War Museum photo of troops queueing on the beach (NYP 68075, public domain).
3. **The destroyer coming into Dover**, the card's cover photo (IWM H 1637), at the switch to map 3.

## What the game engine needs (new for this battle)

- **Switching maps during the reenactment.** Each chapter names its map, and the camera cross-fades between them.
- **Ships.** A new kind of unit: sprites that move along the routes and sit offshore, with an "embarked" count that
  fills up.
- **Aircraft.** Short flyovers across the map, with shadows on the ground.
- **A daily counter** of men lifted, with a day and night tint on the map.
- **Take command:** probably only on map 2, holding the perimeter long enough to evacuate. This can come later;
  the reenactment comes first.

## Pictures and sprites to make (after the maps)

- **Sprites:**
  - British infantry
  - French infantry
  - German infantry
  - a German panzer
  - a British destroyer
  - a paddle steamer
  - a little ship (motor yacht or lifeboat)
  - a Stuka
  - a Spitfire
- **Portraits:** Gort, Ramsay, Tennant, Abrial and Rundstedt.
- **Photos from the Imperial War Museum and Commons:** pre-1957 UK Crown photos are public domain.

## Sources

- **Gort's despatch** (official account): The London Gazette, supplement 35305 (1941), on the perimeter and its
  canals.
- **Ramsay's report** (Royal Navy account): The London Gazette, supplement 38017 (1947), on Operation Dynamo and the
  routes X, Y and Z.
- **The Official History:** L. F. Ellis, *The War in France and Flanders 1939–1940* (HMSO, 1953), chapters 12–15.
- **Daily figures:** Britannica, "Timeline of the Dunkirk evacuation", by day, for the beaches and the harbour.
- **Background:** Imperial War Museums, "What you need to know about the Dunkirk evacuations".
