# Basemaps for the video and the painting prompts that go with them
Drawn 22 November 2026 from OpenStreetMap data (© OpenStreetMap contributors, ODbL) through the OSM API, and from Natural Earth for the two wide maps. Each image is the geography reference; the prompt beside it asks ChatGPT to paint over it without moving anything. Give ChatGPT the image and the prompt together.

Common style line for every painting: *cinematic documentary map painting, 16:9, 4K, based exactly on the attached reference (keep every road, runway, building block, fence, coastline and label exactly where it is), muted night tones (slate blue, dust brown, bone, olive), gentle relief shading, thin cream roads, elegant serif labels, no satellite-photo texture, no aircraft, no flags, nothing drawn inside the fenced sites beyond what the reference shows.*

| File | What it is | Source |
|---|---|---|
| basemap-whiteman.png | Whiteman AFB, 10 km across: runway 01/19, the apron and the row of B-2 docks west of it, the base housing, Knob Noster and US 50 to the north | OSM |
| basemap-andersen.png | Andersen AFB, Guam, 10 km across: two parallel runways 06/24 on the plateau, cliffs and sea, Yigo to the south-west | OSM |
| map-world-flight.png | the whole world, flat, with the schematic route and the decoy line | Natural Earth |
| map-iran-neighbours.png | Iran with every neighbour, the Caspian, the Gulf, the Strait of Hormuz, the three sites | Natural Earth |
| basemap-fordow.png | Fordow, 20 km across: the fenced plant on its ridge, the access road from the motorway, the villages; Qom lies just off the bottom-left | OSM |
| basemap-natanz.png | Natanz, 20 km across: the walled complex beside the Kashan–Isfahan road and its junction; the mountain with the new tunnels is south of it | OSM |
| basemap-isfahan.png | Isfahan, 30 km across: the city with the Zayandeh river, the ring roads, Sepahan Shahr; the nuclear centre's mark is approximate because OSM carries no label for it | OSM |

## Prompts
1. **Whiteman.** "Paint the attached map of Whiteman Air Force Base, Missouri, at night: flat farmland in dark greens and browns with the field grid faintly visible, the base's single long runway in near-black with white edge lights, the taxiway and the big apron in grey, the line of identical bomber hangars along the apron, the housing streets with sodium-orange street lights, the small town of Knob Noster glowing at the top, US Highway 50 running across. Title top centre in gold small caps: WHITEMAN AIR FORCE BASE, MISSOURI · 21 JUNE 2025. Label the runway '01/19'."
2. **Andersen.** "Paint the attached map of Andersen Air Force Base on the northern tip of Guam in late-afternoon light: deep Pacific blue with white surf along the cliffs, the green jungle plateau, the two long parallel runways in dark grey, the apron and hangars, the village streets to the south-west. Title: ANDERSEN AIR FORCE BASE, GUAM · reported decoy destination (unconfirmed)."
3. **World.** "Paint the attached flat world map: dark navy oceans, parchment-and-olive continents with faint relief, no borders, a thin dark margin at the edges only, no stars. Keep the gold dots at Missouri and Iran, the gold route line across the Atlantic and the Mediterranean, and the dim 'decoy' line over the Pacific exactly as drawn. Caption: 'Routes schematic; the real routes were not published.'"
4. **Iran.** "Paint the attached map of Iran and its neighbours: navy seas with depth shading, parchment and olive land with the Zagros and Elburz ranges and the central deserts in gentle relief, thin cream borders, the three site names in red with dots, the Strait of Hormuz circled in gold, Al Udeid in gold. Title top right: IRAN AND ITS NEIGHBOURS · JUNE 2025."
5. **Fordow.** "Paint the attached map of the Fordow area at night under a half moon: bare brown ridges and dry valleys with strong relief (the plant sits on the flank of a ridge), the motorway as a thin cream line crossing from bottom-left to top-right, the access road to the fenced compound, the village clusters, the industrial estate at bottom-left. Keep the red ring and label FORDOW where it is. Title: FORDOW · north-east of Qom."
6. **Natanz.** "Paint the attached map of the Natanz area at night: pale flat desert with the mountains along the bottom-left in relief, the Kashan–Isfahan road and its junction in cream, the walled complex as a dark rectangle with its inner streets, the small villages. Keep the red ring and label NATANZ. Add a small red mark on the mountain south of the complex labelled 'new tunnels'. Title: NATANZ · Iran's main enrichment site."
7. **Isfahan.** "Paint the attached map of Isfahan and its south-eastern outskirts at night: the city as a warm glow of dense streets around the Zayandeh river, the ring roads in cream, the suburbs thinning into dry fields and hills to the south-east. Keep the red ring labelled ISFAHAN nuclear technology centre (approximate) and the gold ring for the academy where they are. Title: ISFAHAN · the nuclear technology centre south-east of the city."

## Caveats
- Elevation is not in OSM; the relief in the paintings is the painter's, so compare it with a terrain map before relying on it for the Fordow ridge.
- The Isfahan centre is not labelled in OSM. Its mark is placed from press coordinates about 12 km south-east of the city centre and should be checked.
- The earlier schematic Whiteman and Andersen basemaps are replaced by these.
