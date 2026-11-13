# Six-Day War: the maps

Plan for the map art, 6 November 2026. Built on research/INDEX.md, sinai.md, jordan-front.md, golan.md,
air-naval-liberty.md, crisis-diplomacy-aftermath.md, chatgpt-v2/MASTER-DOSSIER.md section 7 and RESEARCH.md section 8,
and on the chapter list in plan/timeline.md section 2. Map names below match the names in timeline.md.

**Conventions**
- Every map is 2400 × 1800 px, north up, plain lat/long (equirectangular) frame.
- Frames are exactly 4:3 in kilometres. Height is Δlat × the north-south length of a degree at the centre latitude
  (about 110.9 km). Width is Δlon × 111.41 km × cos(centre latitude). The script is in the scratchpad (frames.py).
- **Corners:** TL means top-left (north-west). BR means bottom-right (south-east). Decimal degrees, WGS84.
- **Confidence:** *verified* means the point was read on a named page or gazetteer, this round or an earlier one.
  *estimate* means it was placed from distances or descriptions and must be checked on a dated map before painting.

**Network limits this round:** Wikipedia, Wikiwand, OpenStreetMap/Nominatim and GeoNames could not be opened from
this session. Only web search worked. So "verified" below means the coordinate was printed in a search result from
the named source (often a Wikipedia mirror or the NGA GeoNames server). Opening OSM in a browser and clicking each
point is still the final check (about an hour's work).

---

## 1. Map list (9 maps + 1 optional close-up)

| # | Map (timeline.md name) | Scale | Size (km) | m/px | Chapters |
|---|---|---|---|---|---|
| 1 | Region | campaign | 650 × 487.5 | 271 | 1–5, 7, 22 (inset), 26 |
| 2 | Air strike (Egypt, Sinai and the Straits) | campaign | 622 × 466.5 | 259 | 6, 19, 22 (alt.) |
| 3 | North Sinai (Gaza–Rafah–El Arish) | operational | 120 × 90 | 50 | 8, 9 |
| 4 | Abu-Ageila / Um Katef | battle | 10 × 7.5 | 4.2 | 10, 11 |
| 5 | Central Sinai, the passes and the Canal | operational | 268 × 201 | 112 | 16, 20, 21 |
| 6 | Jerusalem | battle | 8.8 × 6.6 | 3.7 | 12–15, 18 |
| 6b | Ammunition Hill (optional close-up) | battle | 3.2 × 2.4 | 1.3 | 14 |
| 7 | West Bank | operational | 188 × 141 | 78 | 17 |
| 8 | Golan: Tel Faher (battle) | battle | 10 × 7.5 | 4.2 | 23, 24 |
| 9 | Golan front (to Quneitra) | operational | 112 × 84 | 47 | 25 (and 23 overview) |

**Why the Golan needs two maps:** Tel Faher and Quneitra are about 16 km apart (11 km north–south and 12.7 km
east–west), so one battle map cannot hold both. Chapter 24 needs soldiers in trenches. Chapter 25 is a race along
roads. If only one Golan map can be built first, build map 8 and let chapter 25 use the Region map with a zoomed inset.

### Map 1: Region (Cairo to Damascus)
- **Purpose:** the crisis (UNEF, troop movements, the pact, the Straits as an arrow off the bottom edge), the second air wave
  to Jordan, Syria and Iraq, the USS Liberty inset, and the final lines and refugees.
- **Frame:** TL **33.8033 N, 30.5502 E**. BR **29.4067 N, 37.3998 E**. Size 650 × 487.5 km.
- **Off the frame:** Sharm el-Sheikh/Tiran (27.9 N) and H-3 (39.74 E) are drawn as labelled edge arrows. Beni Suef,
  Luxor and Hurghada are also edge arrows. Sharm is shown in full on map 2.
- **Must show (1967):**
  - National borders as of 4 June 1967.
  - The 1949 armistice lines (Egypt, Jordan, Syria, Lebanon), with the Syrian demilitarised zones and the
    Mount Scopus enclave as a dot.
  - The UNEF line along the Gaza Strip and the Sinai border (dashed, labelled "UNEF, withdrawn 19 May").
  - The Gaza Strip under Egyptian administration and the West Bank under Jordan.
  - The Suez Canal at its 1967 width, with no 2015 parallel channel.
  - The Dead Sea at its 1967 level (about −394 m). It was still one lake reaching the southern basin.
  - The Sea of Galilee.
  - Main 1967 roads: the Sinai coast road, the central road and the Mitla road; Amman–Jerusalem; Damascus–Quneitra.
  - Railways: El Qantara–El Arish–Rafah, and the Hejaz railway stub.
  - Capitals; major airfields (glyphs); Port Said; Alexandria (edge); Eilat; Aqaba.
- **Must not show:**
  - Post-1967 lines: the 1974 UNDOF zone, the 1979–82 Sinai withdrawal phases, the MFO zones, the 1994 Israel–Jordan border.
  - Modern Cairo satellite cities (6th of October, New Cairo, the New Administrative Capital).
  - The 2015 "New Suez Canal" branch, the Ahmed Hamdi tunnel (1981), the Mubarak Peace Bridge (2001) and the Peace (al-Salam) Canal.
  - Today's shrunken Dead Sea and its Jordanian and Israeli evaporation-pond outlines. The Israeli Dead Sea Works ponds that
    already existed may stay as a light tint.
  - The 1970s Golan and West Bank settlements.

### Map 2: Air strike (Egypt, Sinai and the Straits)
- **Purpose:**
  - Operation Focus, 5 June. The jets fly west over the sea and turn south into the Delta, entering from the north
    and east edges, and every Egyptian field is a pin.
  - Sharm el-Sheikh and the Straits, chapter 19.
  - The Liberty (alternative to the Region inset).
- **Frame:** TL **31.9042 N, 30.4532 E**. BR **27.6958 N, 36.8868 E**. Size 622 × 466.5 km.
- **On the frame:**
  - Egyptian fields: Cairo West, Inshas, Almaza, Helwan, Bilbeis, Beni Suef, Abu Suweir, Fayid, Kabrit, El Arish,
    Jebel Libni, Bir Gifgafa, Bir Thamada.
  - Israeli bases: Hatzor and Tel Nov. Ramat David is just off the top edge.
  - Eilat, Aqaba, Tiran, Sharm el-Sheikh/Ras Nasrani, and the Liberty position.
  - Luxor, Hurghada and Ras Banas are off the bottom edge: draw them as edge arrows with their claimed losses.
- **Must show (1967):**
  - The Nile and Delta branches and canals.
  - The 1967 Delta coastline. Draw it slightly further out at the Rosetta and Damietta tips than the 2000s coast, and
    mark it as approximate.
  - The Suez Canal with the Great and Little Bitter Lakes; Lake Timsah; Lake Bardawil; the Gulfs of Suez and Aqaba.
  - The 1967 Sinai road skeleton (see map 5).
  - Sharm el-Sheikh as a small bay with a garrison and airstrip only.
  - The Ras Nasrani coastal battery facing the Enterprise Passage.
- **Must not show:**
  - The Sharm el-Sheikh/Naama Bay resort city and Sharm international airport in its modern size.
  - The Ofira settlement (1971–82).
  - Taba (1989), El Gora and the MFO South Camp (1982), Bardawil international airport, and modern Delta new towns.
  - The Bar-Lev Line (1968–73).
  - The 2015 Canal branch, the East Port Said harbour and the Suez Canal economic zone works.

### Map 3: North Sinai (Gaza–Rafah–El Arish)
- **Purpose:** Tal's breakthrough (Khan Yunis, Rafah, Sheikh Zuweid, Jiradi, El Arish), Gaza City and Ali Muntar,
  UNEF camps, and Yoffe's dune crossing toward Bir Lahfan.
- **Frame:** TL **31.5359 N, 33.6409 E**. BR **30.7241 N, 34.8991 E**. Size 120 × 90 km.
- **What fits:** Gaza City is 3.8 km inside the top edge, El Arish is in the west, Abu-Ageila and Nitzana are in the
  south-east, and Nahal Oz and Kissufim are on the Israeli side. Kusseima (30.68 N) is just off the frame: use an edge arrow.
- **Must show (1967):**
  - The Gaza Strip boundary (1949 line) and the 1906 Egypt–Mandate frontier south of Rafah.
  - The coast road and the El Qantara–Rafah railway, with Rafah junction.
  - The Jiradi defile: about 11 km of road between dunes.
  - The Rafah–El Arish and El Arish–Bir Lahfan–Abu-Ageila roads.
  - The Wadi El Arish; the El Arish airfield; the Egyptian Rafah defences (schematic).
  - UNEF camps: the Indian Battalion near Khan Yunis, Rafah Camp, and the Swedish Battalion.
  - Gaza refugee camps at their 1967 extent (Jabalia, Beach, Nuseirat, Bureij, Maghazi, Deir al-Balah, Khan Yunis, Rafah).
- **Must not show:**
  - The modern Rafah crossing terminal, the Philadelphi Corridor and the post-2014 Egyptian buffer-zone clearances.
  - The Gaza and Israel border fences and walls.
  - The 1970s–2005 Gaza settlements (Gush Katif); Yamit and the Rafah Salient settlements (1970s–82).
  - Al-Arish port (enlarged) and the modern El Arish ring roads.
  - The modern Sheikh Zuweid–Rafah town sprawl, and post-1967 dense building in the Gaza Strip.

### Map 4: Abu-Ageila / Um Katef (battle)
- **Purpose:** the approach to Um Katef and the night assault (chapters 10–11).
- **Frame (provisional):** TL **30.8858 N, 34.0677 E**. BR **30.8182 N, 34.1723 E**. Size 10 × 7.5 km.
- **Why provisional:** Um Katef, the Ruafa dam, Position 181 and the helicopter landing zone are all estimates.
  - Wikipedia's battle infobox gives a point at 34.2558 E, about 13 km east of the junction at 34.1177 E. It is
    probably a rough marker, not the plateau.
  - One unverified source says the defences were three parallel trenches about 5 km long each, about 25 km from the
    border. That puts Um Katef only a few km east of the junction, which matches our frame.
  - **Before painting:** georeference the maps in Gawrych, *Key to the Sinai* (CSI 1990, public domain; see section 4).
    Then re-centre the frame so that the junction, all three trench lines, the Ruafa dam and the artillery park fit.
    If the trenches run further east than 34.17 E, widen the frame to 10 km and move it east.
- **Must show (1967):**
  - The Abu-Ageila crossroads: the roads to Nitzana (east), El Arish/Bir Lahfan (north-west) and Kusseima (south-east).
  - Um Katef ridge with three trench lines; the minefields on the eastern front only.
  - The artillery park; the Ruafa dam on the Wadi El Arish (it existed by 1948); Position 181; the Batur track.
  - The sand dunes north of the road, which made the 99th Brigade's march possible.
  - The landing zone about 5 km north of the guns.
  - Egyptian tank positions (schematic).
- **Must not show:**
  - The modern International Coastal–Nitzana highway alignment, if it differs from the 1967 track.
  - Modern Rawafaa dam works and reservoir, if enlarged after 1967.
  - Post-1979 Egyptian army camps and the post-2013 counter-insurgency checkpoints.
  - Modern farms or irrigated circles near Abu-Ageila. Check the imagery: north Sinai irrigation is mostly post-1990.

### Map 5: Central Sinai, the passes and the Canal
- **Purpose:**
  - The retreat order and the collapse (chapter 16).
  - Mitla and Giddi (chapter 20); Bir Gifgafa; the Nakhl ambush.
  - The Canal on 8–9 June (chapter 21), with the final Sinai line.
  - Sharm el-Sheikh is shown on map 2, not here.
- **Frame:** TL **31.6015 N, 32.1514 E**. BR **29.7885 N, 34.9486 E**. Size 268 × 201 km.
- **What fits:** from Port Said and El Qantara to Rafah and Nitzana; Ismailia, the Bitter Lakes and Suez. Nakhl
  (29.90 N) and Kuntilla (30.0 N, 34.68 E) are inside the frame. Ras Sudr is off the frame; use an edge arrow.
- **Must show (1967):**
  - The three east–west axes: the coast road through Romani; the central road (Ismailia–Tasa–Bir Gifgafa–Jebel
    Libni–Abu-Ageila); and the southern road (Suez–Mitla–Bir Thamada–Nakhl–Kuntilla).
  - The Giddi road, with the Mitla, Giddi and Khatmia passes as narrow defiles in the Gebel Um Mahasa / Gebel Giddi ridge.
  - Bir Hasana; Bir Lahfan; the Jebel Libni hill and airfield.
  - The 1967 Canal with the Ismailia and Qantara ferries, but not the modern bridges.
  - The Egyptian second and third lines (schematic).
- **Must not show:**
  - The Ahmed Hamdi tunnel, the Peace Bridge, and the 2015 Canal branch with its new tunnels.
  - The Bar-Lev Line strongpoints and the 1973 crossing earthworks.
  - The Sinai II buffer zones and the Umm Khashib early-warning station (1975).
  - The Israeli Refidim and Bir Thamada bases as they were rebuilt in 1967–79. Bir Gifgafa stays as a 1967 Egyptian field.
  - Modern asphalt routes and new towns (Bir al-Abd sprawl, Nekhel bypass).

### Map 6: Jerusalem (battle)
- **Purpose:**
  - Government House (chapters 12–13); Ammunition Hill (chapter 14); around the walls and the Mount Scopus link-up (chapter 15).
  - The Lions' Gate and the Western Wall (chapter 18).
  - The Mughrabi Quarter (chapter 26, as a layer).
- **Frame:** TL **31.8090 N, 35.1880 E**. BR **31.7494 N, 35.2810 E**. Size 8.8 × 6.6 km.
- **What fits:** Givat HaMivtar and French Hill at the top; Government House (31.7543) 500 m above the bottom edge;
  Eizariya at the right edge; West Jerusalem to the Mahane Yehuda market.
- **Must show (1967):**
  - **The 1949 armistice line ("Green Line")** through the city, with the no man's land strips (Musrara, Mandelbaum,
    Abu Tor, the Government House zone) and the Mandelbaum Gate crossing.
  - The Mount Scopus Israeli enclave (Hebrew University and Hadassah). Augusta Victoria and Isawiya were in the
    demilitarised zone.
  - The Government House demilitarised zone.
  - The Old City walls with the seven open gates. The Golden Gate is sealed. The New Gate was open.
  - The Old City in 1967:
    - the Mughrabi Quarter in place, up to the Wall: a 3.6 m alley and no plaza;
    - the Jewish Quarter in ruins since 1948;
    - the Haram al-Sharif.
  - The Police School and the Ammunition Hill trenches.
  - The Rockefeller Museum and the American Colony.
  - The Nablus Road, the Jericho road over the Mount of Olives, and the Ramallah road.
  - The 1967 street network from the 1946 Survey of Palestine sheets plus 1967 changes.
- **Must not show:**
  - Neighbourhoods built after 1967: Ramat Eshkol, Ma'alot Dafna, French Hill (Givat Shapira), Givat HaMivtar
    housing, the Armon HaNatziv/East Talpiot neighbourhood, Gilo, Pisgat Ze'ev and Ramot.
  - The Hebrew University's later Mount Scopus campus. Show only the 1925–48 buildings.
  - Route 1 / the Begin road along the old seam, the light rail and the Chords Bridge.
  - The separation barrier.
  - The Western Wall plaza (created 10–11 June 1967, after the battle; show it only in the chapter 26 layer).
  - The rebuilt Jewish Quarter.
  - The Ammunition Hill memorial museum (1975). After 20 January 2026 the UNRWA compound (the old Police School
    building) was demolished, so today's imagery shows neither as it was.
  - The Mamilla mall; the Jerusalem Hyatt on Mount Scopus.

### Map 6b (optional): Ammunition Hill close-up
- **Frame:** TL **31.8058 N, 35.2131 E**. BR **31.7842 N, 35.2469 E**. Size 3.2 × 2.4 km.
- **Purpose:** only if chapter 14 needs soldiers at trench scale. At 3.7 m/px on map 6 the hill is about 80 px across.
- **What fits:** the Mandelbaum Gate at the south-west, Ammunition Hill and the Police School, Sheikh Jarrah,
  Givat HaMivtar and the foot of Mount Scopus.
- **Trace:** the trench plan from the 1967 IDF and Jordanian sketches. They are copyrighted, so use them for reference only and draw our own.

### Map 7: West Bank
- **Purpose:**
  - The West Bank campaign, 5–7 June (chapter 17).
  - Latrun and the villages; Ramallah; Jenin–Nablus (Peled); Bethlehem–Hebron; Jericho and the bridges.
  - The flight across the Jordan.
- **Frame:** TL **32.6208 N, 34.5554 E**. BR **31.3492 N, 36.5446 E**. Size 188 × 141 km.
- **What fits:** the coast from Netanya to Ashdod; Jenin (32.46) to Hebron (31.53); the Jordan Valley; Amman and
  Mafraq are at the right side, which shows how close the Jordanian air base was.
- **Must show (1967):**
  - The 1949 armistice line around the West Bank, including the Latrun no man's land and the Jerusalem corridor.
  - The Jordan River; the Allenby and Damiya bridges; the Dead Sea at its 1967 level.
  - 1967 roads: Jerusalem–Ramallah–Nablus–Jenin; Jerusalem–Jericho; Jerusalem–Bethlehem–Hebron; Qalqilya–Nablus;
    the Jenin–Nablus road via Arraba and Kabatiya.
  - The Latrun villages Imwas, Yalu and Beit Nuba, still standing on 5 June.
  - The Jericho camps (Aqabat Jabr, Ein as-Sultan, Nu'eima).
  - The Iraqi brigade's approach from the H-4/Mafraq direction (schematic).
- **Must not show:**
  - Israeli settlements (from late 1967 onward); Canada Park (planted on the Latrun villages after 1967).
  - Route 443, Route 6, the modern Route 1 to the Dead Sea, and the Allon Road.
  - The separation barrier.
  - The modern bridges and terminal at Allenby.
  - Ma'ale Adumim; the post-1967 expansion of Ramallah, al-Bireh and Amman.
  - Area A/B/C lines (1995).

### Map 8: Golan, Tel Faher (battle)
- **Purpose:** the climb and the fight at Tel Faher and Tel Azaziat, 9 June (chapter 24). Chapter 23's opening
  shot works here too (Kfar Szold and the escarpment).
- **Frame:** TL **33.2578 N, 35.6381 E**. BR **33.1902 N, 35.7453 E**. Size 10 × 7.5 km.
- **What fits:** Kfar Szold (33.1953) 330 m above the bottom edge; Givat HaEm; Dan and She'ar Yashuv; Tel Azaziat,
  Burj Babil and Tel Faher; the Banias spring (33.2486); Ein Fit and Za'ura; Jubata ez-Zeit near the right edge.
  Qala (33.1657) is off the frame; use an edge arrow.
- **Must show (1967):**
  - The 1949 armistice line and the northern demilitarised zone.
  - The escarpment, about 500 m above the Hula plain.
  - The Syrian positions at Tel Faher: barbed wire, two trench belts, bunkers.
  - The bulldozer route up from Kfar Szold.
  - The Tapline (the "oil road") and its service road.
  - The Banias–Quneitra road; the Syrian villages, standing in 1967 (Ein Fit, Za'ura, Banias village, Jubata).
- **Must not show:**
  - The Golani memorial and the lookout park (after 1967), Route 99 as rebuilt, and Route 918 as rebuilt.
  - The Israeli Golan settlements: Merom Golan (from July 1967), Snir (1967), Nimrod and others.
  - Wind turbines; the Hermon ski site; orchards planted after 1967.
  - The Banias nature-reserve paths; the post-1967 ruin of Banias village. The village was still standing on 9 June.
  - Za'ura and Ein Fit as ruins (both were razed after the war).

### Map 9: Golan front (to Quneitra)
- **Purpose:**
  - The overview for the 9 June axes (Golani in the north; Mendler's 8th Armoured; the southern thrust from Tawafiq).
  - The 10 June advance and Quneitra (chapter 25).
  - The 18:30 ceasefire line and the flight of the villagers.
- **Frame:** TL **33.4387 N, 35.3004 E**. BR **32.6813 N, 36.4996 E**. Size 112 × 84 km.
- **What fits:** Mount Hermon summit (33.416); Kiryat Shmona, Rosh Pina and Safed; the Hula Valley; the whole Sea of
  Galilee; the Yarmouk; Quneitra, Butmiya and Rafid; Damascus is off the frame at the north-east (use an edge arrow).
- **Must show (1967):**
  - The 1949 line and its three demilitarised zones.
  - Quneitra as a town of about 20,000 people, intact.
  - The Banias–Mas'ade–Quneitra road, the Quneitra–Damascus road, the Tapline, and the Rafid–Fiq roads.
  - The roughly 130 Syrian villages and farms (the Golan Marsad gazetteer gives the points).
  - The Hula Valley as drained farmland. It was drained in the 1950s; the Agamon Hula pond was re-flooded in 1994,
    so do not show it.
  - The Sea of Galilee at its 1967 level.
- **Must not show:**
  - Quneitra in ruins (destroyed in 1974 before the handover).
  - The UNDOF zone and the Alpha/Bravo lines (1974).
  - The 1973 "Valley of Tears" features; Katzrin (1977) and the other settlements; the modern Route 98 patrol road and fence.
  - The Mount Hermon Israeli military post. It was taken after the 10 June ceasefire (some sources say 12 June) and its status is unverified.

---

## 2. Place table (CSV)

**Columns:** confidence is `verified` (read on the named source), `verified-weak` (one non-authoritative
source), `derived` (worked out from distances in a named source) or `estimate`. The `round` column says whether the
check was made in this round (R5) or an earlier one (R1–R4). Map numbers refer to section 1.

```csv
place,lat,lon,source,confidence,round,maps
Cairo West AB,30.1167,30.9167,Wikipedia (30°07'N 30°55'E),verified,R4,1;2
Inshas (Inchas) AB,30.3297,31.4500,Wikipedia 30°19'47"N 31°27'E; GlobalMilitary agrees,verified,R5,1;2
Almaza AB,30.0847,31.3514,WWII landing-ground list LG-245,verified,R4,1;2
Helwan AB,29.8333,31.3167,WWII list LG-221,verified,R4,2
Bilbeis AB,30.4167,31.6000,WWII list LG-208 (1967 field identity unverified),verified,R4,1;2
Beni Suef AB,29.2119,31.0158,Wikipedia 29°12'43"N 31°00'57"E; airfield.directory 29.2083 31.0166,verified,R5,2
Abu Suweir AB,30.5722,32.0958,Wikipedia 30°34'20"N 32°05'45"E,verified,R5,1;2;5
Fayid AB,30.3303,32.2697,Wikipedia 'Fayid Air Base'; old 'RAF Fayid' page gives 30.3714 32.2706 (3 km N),verified,R5,1;2;5
Kabrit (Kibrit) AB,30.2458,32.4900,Wikipedia 30°14'45"N 32°29'24"E; GlobalMilitary,verified,R5,1;2;5
El Arish airfield,31.0733,33.8358,barracks.substack 'Mapping Egyptian Airfields' 31°04'24"N 33°50'09"E; WWII LG-236 31.0667 33.8333,verified,R5,2;3;5
Jebel Libni airfield,30.8016,33.7795,barracks.substack 30°48'05.7"N 33°46'46.1"E (single personal source),verified-weak,R5,2;5
Jebel Libni (hill / Egyptian 3rd Div area),30.66,33.65,sinai.md reconstruction; check against airfield 15 km NE,estimate,R4,5
Bir Gifgafa (Melez; Rephidim),30.4072,33.1542,Wikipedia 30°24'26"N 33°09'15"E; substack 30.4086 33.1575,verified,R5,1;2;5
Bir Thamada (Tamada) airfield,30.15,33.35,sinai.md; air file guessed 30.1 32.7 (conflict); no gazetteer hit,estimate,R4,2;5
Hatzor AB (Israel),31.7625,34.7272,general knowledge,estimate,R5,2
Tel Nov AB (Israel),31.8394,34.8217,general knowledge,estimate,R5,2
Ramat David AB (Israel),32.6651,35.1795,general knowledge,estimate,R5,1
Mafraq (King Hussein AB),32.3564,36.2592,Wikipedia 32°21'23"N 36°15'33"E; GeoNames 248251 32.35635 36.25918,verified,R5,1;7
Amman-Marka,31.9727,35.9916,Wikipedia (R4),verified,R4,1;7
al-Mezzeh AB,33.4778,36.2233,Wikipedia (R4),verified,R4,1
Dumayr AB,33.6097,36.7489,Wikipedia (R4),verified,R4,1
H-3 (Iraq),32.9294,39.7439,Wikipedia (R4); off map 1 east edge,verified,R4,1(arrow)
Luxor / Hurghada / Ras Banas,—,—,off map 2 south edge; positions estimates in air file,estimate,R4,2(arrow)
Port Said,31.2625,32.3061,Wikipedia,verified,R4,1;2;5
Ismailia,30.6043,32.2723,time-ok.com,verified,R2,1;2;5
Suez,29.9670,32.5500,Wikipedia,verified,R4,1;2;5
El Qantara (east bank),30.86,32.33,general knowledge,estimate,R4,5
Romani,30.99,32.59,sinai.md,estimate,R4,5
Gaza City,31.502,34.467,general knowledge,estimate,R4,1;3
Ali Muntar ridge,31.494,34.477,general knowledge,estimate,R4,3
Nahal Oz,31.475,34.495,general knowledge,estimate,R4,3
Deir al-Balah,31.418,34.352,general knowledge,estimate,R4,3
Khan Yunis,31.346,34.306,general knowledge,estimate,R4,3
Rafah (Gaza side),31.2972,34.2436,time-ok.com,verified,R2,3;5
Rafah (Egyptian side),31.2886,34.2411,Wikipedia 'Rafah Egypt',verified,R2,3
Rafah junction (Egyptian defences; road fork to El Arish),31.27,34.22,reconstructed from descriptions,estimate,R5,3
Sheikh Zuweid,31.2119,34.1106,Wikipedia mirror 31°12'43"N 34°06'38"E,verified,R5,3
Jiradi defile (centre),31.15,33.95,between Sheikh Zuweid and El Arish (S6); about 11 km long; no gazetteer hit,estimate,R5,3
El Arish (town),31.1319,33.8033,Wikipedia mirror 31°07'55"N 33°48'12"E; NGA 31.1286 33.7972,verified,R5,1;2;3;5
Bir Lahfan junction,30.97,33.79,sinai.md; no gazetteer hit,estimate,R4,3;5
Wadi Haridin dunes,30.90,34.00,sinai.md,estimate,R4,3
Abu-Ageila junction,30.8431,34.1177,Wikipedia settlement page 30°50'35"N 34°07'04"E; AroundUs 30.84314 34.11773,verified,R5,3;4;5
Um Katef (Umm Qatef) ridge,30.85,34.15,'plateau east of Abu-Ageila' (Wikipedia battle page); exact point not found,estimate,R5,4
Ruafa (Rawafaa) dam,30.87,34.07,on Wadi El Arish NW of junction (Hermas; Ruafa dam photo 1948); no coordinate,estimate,R5,4
Position 181,30.88,34.13,north of Um Katef on Batur track (sinai.md),estimate,R4,4
Kusseima (Qusayma),30.68,34.35,sinai.md,estimate,R4,3(arrow);5
Nitzana,30.88,34.43,general knowledge,estimate,R5,3;5
Bir Hasana,30.47,33.77,sinai.md; Survey of Egypt sheet 'Bir el Hasana' exists (to georeference),estimate,R4,5
Nakhl (Nekhel),29.900,33.750,Wikipedia,verified,R4,5
Kuntilla,30.003,34.682,bamwor.com,verified,R4,5
Mitla Pass,30.0146,32.8834,Wikipedia 30°00'52"N 32°53'00"E (alt. 30.0103 32.9058),verified,R5,1;2;5
Giddi (Gidi) Pass,30.217,33.167,Wikipedia 30°13'N 33°10'E; Mountain-forecast 30.15 33.04 (14 km apart: pass is 29 km long),verified (two values),R5,2;5
Khatmia Pass,30.30,33.00,sinai.md; no gazetteer hit,estimate,R4,5
Ras Sudr,29.5917,32.7056,Wikipedia,verified,R4,2
Abu Zenima,29.0454,33.1107,Wikipedia,verified,R4,2
El Tor,28.24,33.62,general knowledge,estimate,R4,2
Sharm el-Sheikh (town),27.9150,34.3275,Wikipedia 27°54'54"N 34°19'39"E,verified,R4,2
Ras Nasrani (battery and airstrip),27.97,34.42,Egyptian base name for later Ofira airfield; point not found,estimate,R5,2
Straits of Tiran,28.0039,34.4653,Wikipedia,verified,R5,1(arrow);2
Tiran Island,27.9403,34.5611,NGA GeoNames 27°56'25"N 34°33'40"E; Pleiades agrees,verified,R5,2
Eilat,29.5577,34.9519,general knowledge,estimate,R5,1;2
Aqaba,29.53,35.00,general knowledge,estimate,R5,1;2
Ashdod (Division 914 base),31.80,34.64,general knowledge,estimate,R4,2
USS Liberty at attack,31.3833,33.3833,US Navy court of inquiry: 31°23'N 33°23'E,verified,R4,1;2
Liberty Point Alpha,31.4533,34.0000,court record 31°27.2'N 34°00'E,verified,R4,2
Liberty Point Bravo,31.3717,33.7000,court record 31°22.3'N 33°42'E,verified,R4,2
Liberty Point Charlie,31.5167,33.0000,court record 31°31'N 33°00'E,verified,R4,2
Ammunition Hill,31.7994,35.2281,Wikipedia 31°47'58"N 35°13'41"E; AroundUs 31.7983 35.2278,verified,R2,6;6b
Police School (1935 building; later UNRWA compound),31.7985,35.2305,NLI blog + Hamichlol: school EAST of the hill linked by trench; point estimated,estimate,R5,6;6b
Mandelbaum Gate (site),31.7875,35.2268,Wikipedia 31°47'14.9"N 35°13'36.5"E (Shmuel HaNavi / St George Rd),verified,R5,6;6b
Sheikh Jarrah,31.7925,35.2295,general knowledge,estimate,R4,6;6b
Givat HaMivtar,31.801,35.2335,general knowledge,estimate,R4,6;6b
Shuafat Hill / French Hill,31.805,35.241,general knowledge,estimate,R4,6
Mount Scopus (Hebrew University enclave),31.7925,35.2442,Wikipedia 31°47'33"N 35°14'39"E,verified,R5,6
Augusta Victoria,31.7867,35.2492,Wikipedia 31°47'12"N 35°14'57"E,verified,R5,6
Rockefeller (Palestine Archaeological) Museum,31.783,35.242,address only,estimate,R4,6
Damascus Gate,31.7816,35.2305,Wikipedia,verified,R4,6
Herod's Gate,31.7839,35.2321,general knowledge,estimate,R4,6
Lions' (St Stephen's) Gate,31.7808,35.2369,Wikipedia 31°46'51"N 35°14'13"E,verified,R2,6
Temple Mount / Haram al-Sharif,31.7781,35.2358,Wikipedia,verified,R4,6
Western Wall,31.7767,35.2345,Wikipedia,verified,R4,6
Mughrabi Quarter (site),31.7765,35.2340,adjacent to Wall,estimate,R4,6
Dung Gate,31.7761,35.2352,general knowledge,estimate,R4,6
Mount Zion,31.7717,35.2286,Wikipedia,verified,R4,6
Abu Tor,31.762,35.229,general knowledge,estimate,R4,6
Government House (Armon HaNatziv; UNTSO HQ),31.7543,35.2364,AroundUs 31.75426 35.23644 (Wikimedia-based); R4 estimate 31.751 35.228 was ~800 m off,verified-weak,R5,6
Jabel Mukaber,31.7547,35.2411,Wikipedia,verified,R4,6
Sur Baher,31.7372,35.2331,Wikipedia (just below map 6),verified,R4,7
Eizariya (Bethany),31.771,35.262,general knowledge,estimate,R4,6
Latrun,31.8319,34.9814,Wikipedia,verified,R2,7
Imwas,31.8406,34.9917,Wikipedia,verified,R4,7
Yalu,31.8419,35.0233,Wikipedia,verified,R4,7
Beit Nuba,31.8383,35.0150,between Imwas and Yalu,estimate,R4,7
Nabi Samwil,31.8328,35.1803,Wikipedia,verified,R4,7
Ramallah,31.9000,35.2000,Wikipedia 31°54'N 35°12'E; Sygic 31.9031 35.1952,verified,R5,7
Qalqilya,32.19,34.97,general knowledge,estimate,R4,7
Tulkarm,32.31,35.03,general knowledge,estimate,R4,7
Jenin,32.4611,35.3000,Wikipedia,verified,R2,7
Nablus,32.2211,35.2608,Wikipedia,verified,R4,7
Bethlehem,31.7044,35.2064,Wikipedia,verified,R4,7
Hebron,31.5286,35.0969,Wikipedia,verified,R4,7
Jericho,31.8561,35.4600,Wikipedia,verified,R2,7
Allenby (King Hussein) Bridge,31.8742,35.5408,Wikipedia,verified,R2,7
Damiya (Adam) Bridge,32.1028,35.5353,Wikipedia,verified,R2,7
Kfar Szold,33.1953,35.6575,Wikipedia 33°11'43"N 35°39'27"E,verified,R2,8;9
Givat HaEm,33.213,35.665,'2 km N of Kfar Szold' (S3),derived,R4,8
Tel Azaziat,33.2254,35.6667,AroundUs community map; Wikipedia '2 km west of Tel Faher',verified-weak,R2,8;9
Burj Babil,33.2254,35.677,between Azaziat and Faher,estimate,R4,8
Tel Faher (Mitzpe Golani),33.2254,35.6882,derived: 2 km E of Tel Azaziat; no coordinate found in R5 searches,derived,R5,8;9
Kibbutz Dan,33.235,35.657,1.5 km NW of Tel Azaziat (S2),derived,R4,8
She'ar Yashuv,33.225,35.650,1.5 km W of Tel Azaziat (S2),derived,R4,8
Banias spring,33.2486,35.6944,Wikipedia 33°14'55"N 35°41'40"E,verified,R2,8;9
Ein Fit,33.2239,35.7042,Golan Marsad map book,verified,R4,8
Za'ura,33.2188,35.7099,Golan Marsad map book,verified,R4,8
Jubata ez-Zeit,33.250,35.733,Golan Marsad map book,verified,R4,8;9
Qala,33.1657,35.7121,Golan Marsad map book (probable match),verified-weak,R2,8(arrow);9
Mas'ade,33.2331,35.7575,Wikipedia,verified,R2,9
Majdal Shams,33.267,35.767,Wikipedia,verified,R4,9
Mount Hermon summit,33.4161,35.8575,Wikipedia,verified,R4,1;9
Quneitra,33.1256,35.8239,Wikipedia 33°07'32"N 35°49'26"E (alt. 33.117 35.817),verified,R2,1;9
Butmiya junction,—,—,not found; Al-Butayha (32.917 35.625) is a different place,not found,R5,9
Gonen,33.1225,35.6464,Wikipedia 33°07'21"N 35°38'47"E,verified,R5,9
Gadot,33.0181,35.6172,Golan Marsad / Wikipedia,verified,R4,9
Rafid,32.9550,35.9014,Wikipedia,verified,R2,9
Fiq,32.7667,35.7000,Wikipedia,verified,R4,9
Tel Katzir / Tawafiq,32.70,35.65,golan.md; Tawafiq not found,estimate,R4,9
Damascus,33.5130,36.2920,general knowledge (off map 9),estimate,R5,1
```

**Counts.**
- 25 points were checked or re-checked in this round (R5). Twenty-one of them agreed with earlier values.
- **Four corrections:**
  - **Government House:** about 800 m east of the earlier estimate.
  - **Police School:** it lay **east** of Ammunition Hill. jordan-front.md wrongly says "south-west foot".
  - **Giddi Pass:** two sources are 14 km apart. Use the Wikipedia point for the label; the defile runs between the two points.
  - **Jebel Libni:** the airfield (30.80, 33.78) is about 17 km from sinai.md's "Jebel Libni" point. Keep both and check
    which one the narration means.

**Could not verify this round:**
- Desert points: Jiradi, Bir Lahfan, Um Katef, the Ruafa dam, Position 181, Bir Hasana, Bir Thamada, the Khatmia Pass,
  Ras Nasrani, Rafah junction.
- Golan points: Tel Faher (it remains derived, ±300 m), Butmiya, Tawafiq, and the Syrian strongpoints (Gur el-Askar,
  Na'amush, Sir-a-Dib, Tel Hilal, Dardara).
- Israeli air bases: Hatzor, Tel Nov, Ramat David.

**How to finish them:** georeference the 1:100,000 Survey of Egypt sheets (El Arish, Bir el Hasana, Abu Aweigila)
and the Gawrych CSI maps (section 4) for Sinai. Click the points in OpenStreetMap for the Golan and the Israeli bases.

**Sites that differ today:**
- **Ammunition Hill:** a memorial and museum (1987 national memorial site). Ramat Eshkol now covers the Israeli
  start line.
- **Police School:** the 1935 building became the UNRWA compound, which was demolished in January 2026.
- **Mandelbaum Gate:** gone. A sundial on the light-rail line marks the site.
- **Government House:** still the UNTSO HQ. The Israeli neighbourhood around it dates from the 1970s.
- **Tel Faher:** now the Golani Brigade memorial park, renamed Mitzpe Golani.
- **Bir Gifgafa:** became the Israeli base Refidim, then Bardawil airport, and is now listed as Melez.
- **Kabrit:** now spelled Kibrit and listed as closed.
- **Western Wall:** the plaza dates from 10–11 June 1967.
- **Quneitra:** destroyed in 1974.
- **Latrun villages:** razed in 1967; Canada Park now covers them.

---

## 3. Base data for painting (all maps)
- **Elevation:**
  - Copernicus GLO-30 or SRTM (2000). Fine for the terrain everywhere.
  - **Repaint the water bodies at their 1967 levels:** the Dead Sea (about −394 m, one lake with the southern basin),
    the Sea of Galilee, and the Hula (drained).
  - **Hand-edit the sea coasts:** the Delta erosion, the Port Said East harbour, the Ashdod port (opened 1965, keep it),
    and the El Arish port.
- **Coastlines and rivers:** Natural Earth 10 m for maps 1–2. OSM coastline, edited as above, for maps 3–9.
- **Armistice lines:** the OSM "1949 Armistice Line" relation (border_type=armistice_line). Check it against the
  ECF/UN 1949 armistice maps and, in Jerusalem, against the 1949 city map (section 4).
  Print **"approximate"** on the Jerusalem segment: the line was drawn on 1:20,000 maps with a thick pencil, and
  no man's land was up to 100 m wide.
- **Roads:** trace from the dated maps in section 4, never from OSM. OSM shows post-1967 alignments almost everywhere.

---

## 4. Historical map sources

**Public domain** (US government works; or Israeli/Mandate/Egyptian works more than 50 years old and treated as PD
by the holding library). **Open each record and confirm the licence before using it as a "from the record" picture.**

| Source | What | Use | Licence |
|---|---|---|---|
| Gawrych, *Key to the Sinai: the battles for Abu Ageila in 1956 and 1967* (Combat Studies Institute Research Survey 7, 1990) https://www.armyupress.army.mil/Portals/7/combat-studies-institute/csi-books/key-to-the-sinai.pdf | Detailed 1967 Abu-Ageila maps: trench lines, Ruafa dam, axes | **Main reference for map 4**; georeference first | US Army work: PD (link from MCoE bibliography; not opened this round) |
| US Military Academy, Department of History maps: "Conquest of Sinai 7–8 June 1967", "Israel: the Jordan salient 5–7 June", "Battle of Golan Heights 9–10 June" (mirrored at emersonkent.com/map_archive/sinai_conquest_1967.htm; on Wikimedia Commons as "1967 Six Day War - …") | Operational maps of each front | Reference for maps 3, 5, 7, 9; possible "from the record" pictures | USMA files are treated as US government works. The 1986 Avery printed atlas (Griess, ed.) is a commercial edition, so use the online USMA files |
| CIA, "Israel and occupied territories" (1968), and the later CIA West Bank / Gaza folios (Library of Congress G&M; Princeton record princeton-dcn296xb19p shows the 1949 armistice line and the 28 June 1967 Jerusalem boundary) | Post-war lines | Map 1 final lines; map 7 | US government work: PD (LOC records say so; confirm the item) |
| CIA "6-67" base-map series (Library of Congress, e.g. "Syria" LOC 2014587893; "Israel" LOC 2001626220) | Borders and roads in the late 1960s | Maps 1, 9 | PD (CIA work) |
| Survey of Egypt / War Office 1:100,000 Northern Sinai sheets: "El Arish" (1941 RE reprint, NLI record NNL_MAPS_JER004073102, marked PD in Israel); "Bir el Hasana" sheet 9 (1936, reprinted 1956); other sheets at geo.btaa.org (Survey of Egypt "camel" records) | Wells, tracks, dunes, Wadi El Arish | **Georeference for maps 3–5** (the 1956 reprint is close to 1967) | Old Egyptian/British Crown works; NLI marks PD. UK Crown copyright on 1936–56 sheets has expired (50 years) |
| UN Cartographic Section maps (UN Digital Library, e.g. record 730754, Sinai about 1:1,000,000; UNEF deployment maps; the 1967 ceasefire-line maps in the S/7930 addenda) | UNEF line, ceasefire lines | Maps 1, 2, 9 | UN maps are generally free to reproduce with credit. Check each record's terms |
| Survey of Palestine, Jerusalem 1:10,000 (1945/46, reprinted 1949) and 1:20,000 sheet 50-G-27 (1946); Commons file "Jerusalem - Compiled, drawn and printed by the Survey of Palestine" (donated by NLI); Exeter index of the 1939 1:20,000 urban survey | 1946 street plan and buildings | **Base for map 6** (streets in 1967 were nearly the same east of the line) | Mandate Crown work, expired; NLI/Commons release |
| ECF / UN Israel–Jordan armistice maps (1949), including the Jerusalem sheet (ecf.org.il/issues/issue/175) | The Green Line as signed | Maps 6, 7 | The UN originals are PD/UN; the ECF scans are reference only unless the licence is confirmed |
| Golan Marsad *Map Book* (2025) | Coordinates and 1967 populations of about 130 Syrian villages | Map 9 village layer | Reference only (advocacy NGO, copyrighted). Use the coordinates, not the art |
| Wikimedia Commons "1967 Six Day War - Battle of Golan Heights" (CC0; Spanish version already in images/10) | Golan axes | Check against map 9 | CC0 |
| Survey of Israel 1:100,000 and 1:50,000 sheets of the 1960s (NLI maps collection) | Israeli side: roads, kibbutzim | Maps 3, 7, 8 | Israeli government works more than 50 years old: PD in Israel; check the NLI tag |

**Copyrighted (reference only, never copied):**
- Martin Gilbert's *Routledge Atlas of the Arab-Israeli Conflict*.
- The maps in Oren, Pollack, Dunstan (Osprey) and Mutawi.
- The Carta atlases.
- The IDF History Department maps, unless the item says otherwise.
- The Jewish Virtual Library map pages.
- Jerusalem Story's interactive map.
- The Steimatzky 1949 pictorial map.

---

## 5. Build order

1. **Region (map 1).** It opens and closes the page, and it carries every chapter whose own map is not built yet.
   It is built from Natural Earth and the OSM armistice lines, so it is the cheapest map. Paint the 1967 Dead Sea and
   the Canal first.
2. **Jerusalem (map 6).** It has the most chapters (5) and the best coordinates (most points verified).
   - First georeference the 1946 Survey of Palestine 1:10,000 sheet and the 1949 armistice sheet.
   - Then trace the armistice line, the walls, the 1967 street grid and the Mughrabi Quarter.
   - Add 6b only if chapter 14 playtests badly at 3.7 m/px.
3. **Air strike (map 2).** The airfield points are almost all verified. Needed for chapter 6, which is the hinge of the
   whole war. It also hosts Sharm el-Sheikh.
4. **Golan: Tel Faher (map 8).** The coordinates are good except Tel Faher itself: click it in OSM (Mitzpe Golani) before painting.
5. **Abu-Ageila (map 4).** It is in the first release, but it is **blocked on georeferencing** Gawrych's CSI maps and
   the Survey of Egypt sheet. Do that work in parallel with steps 2–4, then fix the frame.
6. **North Sinai (map 3).**
7. **Central Sinai and the passes (map 5).**
8. **West Bank (map 7).**
9. **Golan front (map 9).**

This matches the staged release in DECISIONS.md: Region, Air strike, Abu-Ageila, Jerusalem, Golan. It adds a
note that "Golan" means map 8 first, with Quneitra (chapter 25) riding on map 9 or a Region inset until map 9 exists.

**Before each map:** write its frame into the game data. Place every pin from the CSV, marking each `estimate` with a
dashed ring and the word "approx." in the narration. Check each pin against a dated map. Only then paint.
