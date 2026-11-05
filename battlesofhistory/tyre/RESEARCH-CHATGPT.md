# BATTLES OF HISTORY — SIEGE OF TYRE (332 BCE)
## Extended research dossier — Claude review edition | 5 November 2026

**Scope:** Historical reconstruction, event sequence, archaeological geography, cartographic requirements, game implementation, and verification tasks. **Status:** Research draft, NOT an approved final historical simulation. No unsupported exact daily dates or georeferenced wall positions are asserted.

## 1. Executive assessment

Tyre was a fortified Phoenician island city under the Achaemenid imperial sphere. After Issus (333 BCE), Alexander marched south along the Levantine coast. Tyre refused his proposed entry to sacrifice to Heracles/Melqart. Alexander initiated a causeway siege; the defenders attacked construction and siege equipment, while the Macedonians gained naval superiority with Phoenician and Cypriot ships. After prolonged naval and engineering operations, a breach and coordinated assault took the city in summer 332 BCE. Ancient reports describe extensive killing and enslavement. The siege is especially suited to an RTS with a historical-view mode because the map and tactical capabilities change over time.

**Historical evidence labels:** [A] ancient narrative testimony; [G] geological/archaeological study; [I] inference; [U] unresolved. **Confidence:** High = independently strong / multiple lines of evidence; Medium = plausible but dependent on ancient narration; Low = speculative details. Do not mistake precise prose in an ancient author for independently established fact.

## 2. Primary and modern evidence hierarchy

1. Arrian, *Anabasis* 2.16–24: main event-sequence backbone, composed centuries after the events, drawing on earlier accounts. Open translation: https://www.gutenberg.org/files/46976/old/46976-h/46976-h.htm
2. Diodorus Siculus, *Bibliotheca historica* 17.40–46: compare siege operations, figures and fire attack; check precise section divisions in edition used.
3. Quintus Curtius Rufus, *Historiae Alexandri Magni* Book 4 (Tyre narrative): compare dramatic details critically.
4. Plutarch, *Life of Alexander*, sections around Tyre: selective biographical evidence, not a continuous engineering record.
5. Marriner et al. (2007), 'Holocene morphogenesis of Alexander the Great’s isthmus at Tyre in Lebanon', PNAS: https://pmc.ncbi.nlm.nih.gov/articles/PMC1890475/
6. Brocard et al. (2024), 'Growth of the sandy isthmus of Tyre and ensuing relocation of its harbors', *Quaternary Science Reviews* 324, 108463: https://doi.org/10.1016/j.quascirev.2023.108463 ; full article https://www.ancientportsantiques.com/wp-content/uploads/Documents/AUTHORS/AdG/TyreCauseway-Brocard2024.pdf
7. Marriner et al. (2008), 'Alexander the Great’s tombolos at Tyre and Alexandria', *Geomorphology* 100:377–400: https://doi.org/10.1016/j.geomorph.2008.01.013

**Source caution:** Arrian, Diodorus and Curtius are literary narratives written later, not three independent contemporary eyewitness records. Their casualty numbers, speeches, motives and engineering measurements require qualification. The 2024 geological article has more recent interpretations than the 2007 study; do not treat either paper's map as a fully surveyed 332 BCE street plan.

## 3. Geography: what must be shown in 332 BCE

- Ancient Tyre was an offshore island, not the broad modern peninsula. [G, High]
- Brocard et al. (2024) reconstruct a Phoenician-period rocky island approximately **1,500 m north–south by 600 m east–west**, including a southern extension no longer present in the modern rocky headland. These are study-level reconstruction dimensions, not a surveyed fortification perimeter. [G, Medium–High]
- A submerged sandbank/proto-tombolo existed between mainland and island. Alexander's builders exploited this shallower approach. [G, High]
- Causeway length differs by measurement/reconstruction: **about 750 m** in Brocard et al. (2024), versus **approximately 1,000 m** in Marriner et al. (2007). Do not silently choose one as universally definitive. The 2024 article reports a traditionally described width around **60 m**; verify whether this is source-derived rather than measured archaeology. [G/A, Medium]
- Two harbours were reported, one oriented toward Sidon (northern/Sidonian), one toward Egypt (southern/Egyptian). Their precise 332 BCE shapes, entrances and relationship to subsequent harbour structures are NOT certain. Brocard et al. discuss relocation and burial of harbour areas as the isthmus grew. [A/G, Medium]
- Ancient sea level and shoreline differ from modern. The 2024 paper estimates Phoenician-period relative sea level more than 2.5 m below modern and reconstructs a larger southern island extent. [G, Medium–High]
- Modern harbour outlines, Roman baths, Roman roads, medieval walls, current beaches and the modern peninsula must not be pasted unchanged onto the 332 BCE battlefield. [G, High]
- The island's outer sea walls were high, but exact continuous wall height, gate positions and all towers cannot be reconstructed confidently from these sources. Avoid invented precise placement. [A/U]

**Mandatory map reference:** Brocard et al. 2024 Figure 9 (pre-332 and post-332 sketch maps). Also inspect their Figures 1–3 and sediment-core locations. Maps are scientific reference images; do not redistribute copyrighted figures in a game without checking reuse rights. Create original derived cartography and credit the source.

## 4. Reconstructed chronological event sequence

**Dating warning:** Most episodes can be put in a reliable *relative order* but NOT assigned secure calendar days. The siege is conventionally dated roughly January to July/August 332 BCE and described as about seven months. Arrian places capture in the Macedonian/Athenian calendrical context of Hecatombaion; conversion to a precise modern day is uncertain. For the game use `332 BCE — siege phase` unless independent scholarship establishes a narrower range.

| ID | Approximate placement | Event | Basis | Confidence |
|---|---|---|---|---|
| T00 | Late 333 / early 332 | Alexander defeats Darius at Issus and advances down Phoenician coast; Byblos and Sidon submit. | Arrian 2.13–16 | High sequence; approximate dating |
| T01 | Early 332 | Tyrian delegation, dispute over Alexander's proposed sacrifice to Heracles/Melqart, Tyre's refusal to admit him. | Arrian 2.16–17 | Medium–High narrative |
| T02 | Early siege | Alexander orders a mole/causeway from the mainland; rubble, timber and stone are carried into the shallow sea. | Arrian 2.18; geology | High |
| T03 | Early–middle siege | Progress near mainland is easier; deeper water, naval harassment and missiles from city walls hamper work nearer island. | Arrian 2.18–19 | Medium–High |
| T04 | Middle siege | Macedonians construct siege towers on the mole; Tyrians send a fire vessel against towers and equipment, then exploit disruption. | Arrian 2.19; compare Diodorus | High for event, low for exact date |
| T05 | Middle siege | Alexander obtains fleet reinforcements, especially Phoenician and Cypriot contingents, shifting control of the sea. | Arrian 2.20 | High |
| T06 | Middle–late siege | Naval blockade and attacks on the harbours; ship-mounted siege machinery attacks wall sectors, while defenders use countermeasures. | Arrian 2.20–21 | Medium–High |
| T07 | Late siege | Tyrian ships sortie from northern harbour and engage Cypriot squadron; Alexander responds with naval force and defeats sortie. | Arrian 2.22 | Medium–High |
| T08 | Late siege | Repeated testing of wall sectors, demolition attempts, sea conditions and unsuccessful assaults precede successful breach. | Arrian 2.21–23 | Medium |
| T09 | Final assault, summer 332 | Breach exploited by Macedonian assault troops under Alexander; Phoenician and Cypriot naval contingents simultaneously force harbour approaches. | Arrian 2.23–24 | High for broad sequence |
| T10 | Immediately after capture | Fighting inside city; killing, surrender in sanctuary, enslavement of captives; dedication and ritual after victory. | Arrian 2.24 | High for broad outcome; reported counts disputed |

**Important gameplay distinction:** The fire attack on the mole and the naval sortie from the northern harbour are *different episodes*. Do not merge them into one battle. The final wall breach is associated with ship-based siege engines and sea-facing wall assault; do not imply the causeway alone straightforwardly carried the final storming party into the city.

## 5. Forces, leaders and weapons

**Macedonian coalition:** Alexander III of Macedon; Macedonian infantry and hypaspists/shield-bearers; siege engineers; allied Phoenician and Cypriot warships and marines. Arrian names Coenus and Admetus in the final attack. Naval commands and unit-specific deployments need line-by-line cross-checking against 2.20–24 before labels are fixed.

**Tyrian defence:** King Azemilcus (also spelled Azemilkos/Azemilcus); Tyrian civic authorities; defending infantry, sailors, marines, artillery operators, engineers and naval crews; some mercenaries reported. A Carthaginian connection appears in accounts but do not invent a full Carthaginian relief fleet. [A]

**Ship types:** Triremes and other oared warships appropriate to the late Classical eastern Mediterranean; avoid generic Viking-style ships or later Roman galleys. Do not claim exact counts for each ship class without primary citations.

**Siege technology:** Stone-throwing and bolt-shooting artillery, mobile towers, rams and ship-mounted siege engines are relevant; exact machine dimensions and mechanical arrangements remain uncertain. Model plausible reconstructions with an `illustrative` flag.

**Casualty figures:** Arrian 2.24 reports approximately 8,000 Tyrians killed and 30,000 captives enslaved; roughly 400 Macedonian siege deaths. These are **ancient author claims, not audited counts**. Include context about massacre and enslavement, without celebratory framing or unqualified numeric certainty.

## 6. Map production specification (three base maps + overlays)

### MAP A — Eastern Mediterranean campaign context
Extent: Aegean/Anatolia through Levant and Egypt. Show Issus, Aradus, Byblos, Sidon, Tyre, Gaza, Nile Delta, and movement arrows. Distinguish 333 BCE Issus from 332 BCE siege. **Do not draw fabricated exact marching-day itineraries.** Source modern coordinates for cities from a vetted gazetteer; map the general route, not undocumented nightly camps.

### MAP B — Tyre regional coast in 332 BCE
Landscape 4:3, north up, recommended 2400×1800. Mainland coast, offshore island, submerged bank, both harbour regions, approaches by sea, and land-side siege work. Use geological study as primary geometry. Source-aligned shoreline should be a **reconstructed layer** with uncertainty bands, not asserted precise vector truth.

### MAP C — Detailed siege tactical map
Landscape 4:3, north up, recommended 2400×1800. Main playable map must have sufficient open sea for naval maneuver and enough mainland for engineering staging. Provide a 332 BCE terrain-only base; separate overlay layers for causeway progress, temporary siege towers, ships, batteries, wall-damage states and combat events. Do not permanently paint a fully built causeway onto the starting base.

### Required overlay states
S0 island intact, no causeway; S1 causeway extending; S2 towers in place; S3 fireship damage; S4 resumed causeway plus Macedonian fleet; S5 harbour blockade and sea-wall attacks; S6 Tyrian sortie; S7 breach and simultaneous harbour entry; S8 captured city. For each overlay record `earliest_possible`, `latest_possible`, `source`, `confidence`, and `gameplay_interpretation`.

### Coordinate / accuracy policy
The centre of modern Tyre may serve as a **general geographic locator only**, not as a surveyed coordinate for the ancient city walls or harbour mouths. Do not create invented decimal-degree coordinates for gates, towers, breaches, camp positions or causeway ends. Before any pixel-accurate drawing, Claude should georeference published map figures to a vetted modern coastline and identify the error margin and projection. For artwork derived from Fig. 9, identify which elements are schematic.

## 7. Historical-view game sequence and mechanics

- Historical viewing mode: narration-driven phase sequence T00–T10 with pauses and optional annotations; uncertainty flags accessible in the UI.
- Macedonian player: allocate labour/material to causeway, protect workers, coordinate fleet blockade, deploy siege engines, identify assaultable wall sector; resource values are gameplay abstractions unless sourced.
- Tyrian player: defend walls and harbours, disrupt engineering, use fireships and timed sorties; do not promise an ahistorical Carthaginian rescue as a documented event.
- Weather/sea state: include only as a **scenario variable** unless a particular storm/event is supported by ancient text.
- Victory conditions: capture of city / preservation of city for alternative history. Clearly label counterfactual player outcomes as `alternate history`.
- Avoid glorifying the sack. End with historically contextualized account of the civilian consequences.

## 8. Unresolved questions requiring Claude's independent verification

1. Precisely how does Arrian's chronology compare with Diodorus 17.40–46 and Curtius Book 4? Create a side-by-side episode concordance with quotations limited to short excerpts.
2. Which sources provide exact numbers of ships, fleet composition, and soldiers? Separate claims from modern scholarly estimates.
3. Can a particular date of capture in July or August be defended by conversion of Hecatombaion? Document competing conversions and why they differ.
4. Is the 60 m causeway width an ancient literary statement, modern assumption, or independently evidenced archaeological measurement?
5. Which parts of the north and south harbours in Figure 9 are inferred, excavated, or geologically modeled? Verify changes in harbour interpretation since older atlases.
6. What does Arrian say about the location of the successful breach relative to the southern/Egyptian harbour? Check exact orientation and avoid confusing ship assault with mole assault.
7. Which naval officers and named unit commanders are securely documented, and at which phase?
8. What did the ancient accounts say about women, children, refugees, prisoners and sanctuary? Avoid presenting all Tyrians as combatants.
9. Check the claimed dimensions and use of siege towers, artillery, floating rams, fire ship and harbour barriers against specialist scholarship.
10. Identify reusable/public-domain historical art, modern aerial reference and GIS base data. **Do not assume a modern research figure is public domain.**
11. Compare older 2007/2008 geomorphology to Brocard 2024; document any conflict over distance, shoreline and southern harbour.
12. Produce explicit confidence-tagged map feature register and a list of items not to depict as certain.

## 9. Suggested output files for Claude

- `TYRE-FACT-CHECK.md`: claim-by-claim audit and corrections
- `TYRE-EVENTS.csv`: event ID, relative sequence, earliest/latest possible date, confidence, sources
- `TYRE-MAP-FEATURES.csv`: feature, status, evidence, coordinate source, uncertainty, drawing instructions
- `TYRE-MAP-GUIDE.md`: GIS / paleogeography workflow and reference figure citations
- `TYRE-NARRATION.md`: historically faithful chapter scripts, avoiding false precision
- `TYRE-ART-PROMPTS.md`: unit, ship, siege-engine and terrain assets
- `TYRE-SOURCES.md`: bibliography, URLs, permissions and figure references

## 10. Historical QA acceptance criteria

[ ] No modern peninsula in 332 BCE opening scene.
[ ] Ancient island longer to south than modern headland per 2024 model.
[ ] Northern/Sidonian and southern/Egyptian harbour sectors identified cautiously.
[ ] Causeway grows by stages and fire attack is represented separately.
[ ] Naval superiority is gained during siege, not assumed from start.
[ ] Tyrian harbour sortie is distinct from final assault.
[ ] Final breach and harbour penetrations occur in coordinated sequence.
[ ] Exact modern calendar dates are not invented.
[ ] Ancient casualty/slavery numbers are labeled as reported claims.
[ ] Every feature and timeline event has a source and uncertainty label.
[ ] No modern research figure is redistributed without licence review.

**Editorial note:** This dossier is a starting research package, not a substitute for Claude checking original-language passages, newer archaeology, specialist monographs and rights before production.
