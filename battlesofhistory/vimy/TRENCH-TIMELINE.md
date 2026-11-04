# Vimy Ridge: the trenches and tunnels over time (design)

A map sequence for the Vimy page: the front, trenches, craters and subways growing and changing from 1914 to April 1917. It is built **on the battle map** we already have: the same 2400 × 1800 frame, 50.402°N 2.710°E to 50.322°N 2.877°E, at 5 m per pixel.

## The stages
| # | Date | What the map shows | Source (to trace) | Confidence |
|---|---|---|---|---|
| 1 | Oct 1914 | The Germans take the ridge; the front settles on the western slopes and the Lorette spur | Nicholson pp. 50, 245; a 1915 sheet if it shows the 1914 line | approximate |
| 2 | May–Sept 1915 | The French Tenth Army climbs the slopes: Lorette, Souchez, Neuville-St-Vaast. The front moves up to the foot of the ridge, at a huge cost | **McMaster 36C SW3 "Vimy Ridge" 1915** | good if the sheet is dated |
| 3 | Mar 1916 | The British take over the sector. The trench system of both sides | **McMaster 36C SW3 1916** and **36B SE4 & 36C SW3 "Notre Dame de Lorette–Bonval Wood" 1916** | good |
| 4 | Spring 1916 | The mine war: the crater line in no man's land (Duffield, Grange, Birkin, Kennedy, Broadmarsh and others, 19 groups in all) | **McMaster Ordnance Survey trench map, 13 June 1916** | good |
| 5 | 21 May 1916 | The German attack takes 1,500 yards of British front and support trenches | the June 1916 sheet compared with the earlier one | good |
| 6 | Oct 1916 – Apr 1917 | The Canadians arrive. The subways are dug, November to March (Grange: 172 Tunnelling Company); new assembly and jumping-off trenches | **McMaster 36C SW3, trenches to 10 Feb 1917** (the sheet we have, but at high resolution); subway lines from Nicholson Map 7 and the Grange site plan | good for trenches; approximate for subways |
| 7 | 9 April 1917 | The Black, Red, Blue and Brown lines are taken; the front at last light | `lines.js` (Nicholson Map 7) | good (±100 m) |
| 8 | 10–12 April | Hill 145, then the Pimple | `lines.js` | good |
| 9 | July 1917 | The new front down on the Douai plain; the old trenches left behind | **McMaster 36C SW3 1917/07** | good |

## How each stage is made
1. **Georeference** each trench-map sheet to the battle frame. The sheets are on the British 1:10,000 grid (square 36C SW3), so their grid corners are known. Then check them against roads and villages, as was done for Nicholson's Map 7 (affine fit, residuals about 20 m).
2. **Trace by colour.** On these sheets the German trenches are printed in **red** and the British in **blue**. They are picked out by colour and thinned to centre lines, then hand-checked. The output is `trenches-<date>.json`: lines in world pixels, plus craters as circles.
3. **Compare dates.** Each trench gets a "first seen" date (the earliest sheet it appears on) and a "last seen" date. The map can then show trenches **being dug**, growing in over their period, and old ones fading.
4. **Subways.** There are 11 (Nicholson) or 12–13 (later guides). They are drawn **dashed underground**: certain where a source maps them (the Grange), and marked approximate elsewhere.
5. **Craters.** The groups are placed from the 1916 sheets. A crater appears at its first-seen date and is labelled with its group.

## On the page (later, when the battle page is built)
- A **timeline slider** under the map runs from 1914 to July 1917, with a play button. The narration chapters jump to their date.
- **Colours:** German trenches red, French then British then Canadian blue, no man's land and craters brown, subways dashed white.
- **Tags:** each stage carries its confidence tag (traced from a dated sheet = *established*; between sheets = *reconstruction*).

## What we need from you (downloads)
Our session cannot reach McMaster or Ottawa, so these have to be downloaded by hand. Please get the **largest image** (TIFF or the biggest JPG) of each:
1. **McMaster, grid 36c**, https://library.mcmaster.ca/ww1/wrz4mp.php?grid=36c :
   - 36c SW3 1:10,000 **Vimy Ridge 1915**
   - 36c SW3 1:10,000 **Vimy 1916** (ID 109WW1MAP)
   - 36b SE4 & 36c SW3 1:10,000 **Notre Dame de Lorette–Bonval Wood 1916**
   - 36c SW3 **Vimy Ridge 1917/02** (trenches to 10 February 1917)
   - 36c SW3 **Vimy Ridge 1917/07**
2. **McMaster digital collections**: "Ordnance Survey, Trench Map, **13 June 1916**", https://digitalcollections.mcmaster.ca/node/182039
3. **Optional, for the south end (Thélus–Farbus):** the 51B NW1 sheets of the same dates, from the same McMaster grid page (grid=51b).

**Licence:** McMaster describes its trench-map scans as public domain. The maps are British Crown copyright from 1915–17, which has expired.

---

## ChatGPT's trench and tunnel research (3 November 2026): `research/CHATGPT-*.md`
**What it adds:**
- **A five-state outline:** improvised 1914, continuous 1915, the mine war 1915–16, the subways 1916–17, and preparation and attack in 1917.
- **Feature types:** firing, support, reserve and communication trenches; traverses; wire; dugouts; mine and listening galleries; subways; tramways; craters.
- **A layer plan with dates:** each segment carries a side, earliest and latest dates, confidence and source. This matches our "first seen / last seen" design.
- **Grange Subway figures** (Veterans Affairs Canada brochure): about 1.5 m wide and 2 m high, with the roof about 8 m down. The whole system was more than 10 km, with **13 major subways**, the longest about 1.7 km. Nicholson says eleven, almost four miles. The difference is down to definitions, so the count stays **disputed**.
- **Three confidence levels:** documented, inferred and illustrative. They map onto our established, reconstruction and illustrative tags.

**What it does not give:** any positions. Like us, it says the trenches, craters and subway entrances must be traced from **dated maps and plans**. The plan above stands. The **dated McMaster sheets** are still the missing piece; the VAC brochure, Nicholson's PDF and Valour Canada are blocked here too.

**Also worth downloading:** the Veterans Affairs Canada brochure *Vimy Tunnels and Trenches* (PDF). It may include a plan of the subways.

## Veterans Affairs Canada brochure, *Vimy: Tunnels and trenches* (2021)
Kept in `research/` for **reference only**. It is © Her Majesty the Queen in Right of Canada (2021), so it is **not to be shown** on the site.

**Facts for the timeline:**
- "From **1915 to 1917**, dozens of tunnels were dug at Vimy Ridge by French, British, Canadian and German forces." Both sides first dug **deep mines** to blow up positions and enemy tunnels. This went on "until **August 1916** when British tunnellers constructed **underground defences** to block mining attacks." → stages 3–4
- "In **October 1916**, tunnelling companies of the British Royal Engineers began digging **13 communication tunnels** along the **northern half** of Vimy Ridge … called subways … from **265 metres to 1.7 kilometres**" long, joining the rear to the front. More than **10 km** of tunnels in all. → stage 6
- Inside the subways: brigade headquarters, living quarters, cookhouses, stores, water reservoirs, medical posts.
- **The Grange Subway** joined the front-line trenches to support areas **1.4 km** away. It was 1.5 m wide and 2 m high, with the roof about 8 m down. It had a slightly arched roof braced with timber, chalk walls that were bright white then, and dim 220-volt electric light.
- **Digging:** mostly hand tools, about **6 m³ of subway a day** with several teams, chalk taken out in trolleys on rails, about **200 sandbags of chalk per metre**.
- **Fighting tunnels:** dug forward from the main system to lay charges or attack enemy miners, **up to 40 m deep**. Their explosions made the craters seen today, and **the craters were made in 1916** by French, British and German tunnellers. → stage 4
- **Before the attack:** troops and ammunition moved forward through the subways **up to 36 hours** beforehand. Several subways had **exits in no man's land**. About **950 men from three battalions** waited in the Grange Subway.
- **Today:** the preserved trenches have Canadian and German observation trenches as little as **25 m apart**.
- **A difference to note:** the brochure says whistles were heard at **5:25 a.m.**, while the attack time is usually given as 5:30. The narration keeps 5:30, which is Nicholson's zero hour.
- **The tour maps** in the brochure are local site plans with no grid, so they can't be placed on our map. They are useful for the look of the Grange tunnel, its stairs, exits and chambers.

**Subway count:** Nicholson says eleven (almost four miles); VAC says thirteen (over 10 km of tunnels in all). Keep it as **disputed**: the VAC figure counts subways, the 10 km figure counts all tunnels.

## The preserved trenches at the Vimy Memorial Park (greatwar.co.uk)
Our notes only; the site's photos are © greatwar.co.uk, so they are not to be used.
- **Location:** 50°22′17″N 2°46′17″E, which is **world px ≈ 882, 689** on our battle map, in the Grange/crater sector.
- **What they are:** a short section of the **Allied and German front lines with a few metres of no man's land** between them, where the two front lines were on 9 April 1917.
- **Not original:** the trenches were rebuilt in the **1920s–30s** by Major **Unwin Simson**, the Canadian engineer building the Memorial. He used **sandbags filled with concrete** to keep them from collapsing. On the page they are *preserved, rebuilt*, not original 1917 trenches.
- **Around them:** cratered ground, still uncleared of munitions; visitors stay on the paths.
- **Use:** a "Today" marker on the timeline's final frame, with our own text and a free photo (search Commons for "Vimy preserved trenches").
- **Position checked on Google Maps (3 Nov 2026):** the preserved trenches are at about **50.37158, 2.77125**, matching the 50°22′17″N 2°46′17″E above. The Visitor Education Centre and the **Grange Tunnel entrance** are about 100–150 m west and south-west of them, and the Memorial on Hill 145 is about 1 km north. (The satellite view is © Google/Airbus/Maxar and is not to be used. Positions only.)

## National Library of Scotland trench maps (found 3 November 2026)
NLS has dated editions of both Vimy sheets. The sheets are also listed on the NLS trench-map index.

**Received so far, as small print-PDFs only** (about 600 px of map, too small to trace):
| NLS map no. | sheet | edition / date |
|---|---|---|
| 101465023 | 36C S.W. (Vimy–Lens), 1:20,000 | Edition 6, trenches to 15 Feb 1916 |
| 101465068 | 51B N.W. (Arras; Neuville–Thélus–Farbus in the top-left corner) | edition to be read |
| 101465071 | 51B N.W. | another edition, to be read |
| 101464753 | **51B.NW.1 Roclincourt**, 1:10,000 (Neuville-St-Vaast to Thélus, the south half of the battlefield in detail) | Edition 5A, trenches to 27 Dec 1916 |
| 101464744 | **36C.SW.1 Lens**, 1:10,000 (Lens, Liévin, Angres: north-east of the ridge, toward the Pimple) | Edition 8A, trenches to 10 Feb 1917 |
| 101465065 | a neighbouring sheet with the front on its right-hand side (probably 51C N.E., west of Arras) | not needed |

**Still to get, all at full size:**
- 51B.NW Ed. 6A (4 Mar 1917)
- 51B.NW.1 Roclincourt Ed. 5A (27 Dec 1916, 1:10,000)
- 36C.SW.1 Lens Ed. 8A (10 Feb 1917, 1:10,000)
- 36C.SW.3 Givenchy (8 Apr 1916, 1:10,000)
- 51B.NW Ed. 4A (Oct 1916) and 7A (May 1917)
- 36C.SW Ed. 11A (Nov 1917)

## Where the work stands (3 November 2026)
- **Maps in hand:** six NLS sheets at full detail, in sources/trench-maps/nls/ and in the Library: Feb 1916, Oct 1916, Dec 1916, Feb 1917, Mar 1917, May 1917.
- **Tools:** tools/fetch-nls-map.sh downloads a map in 512 px pieces; tools/stitch-nls-map.py joins them.
- **Next, georeferencing:** a first affine fit of 36C S.W. from village names on the downsampled sheet was 150–800 m out, because labels were used rather than exact points. Planned method:
  1. Pick exact control points (road crossings, churches, the "1°31′ W of Brussels" meridian line printed on 36C S.W.) on full-resolution crops.
  2. Match them to the same points on battle-nicholson.jpg, which is already fitted to the battle frame.
  3. Then fit an affine or thin-plate warp per sheet.
- **Then tracing:** warp each sheet into the battle frame, pick out the red (German) and blue (British) trench ink, and save one transparent overlay per date. The page cross-fades between them on the timeline.
- **Side project for later:** nicer painted Vimy maps built on these overlays.
