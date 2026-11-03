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
