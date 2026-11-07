# Siege of Tyre, 332 BCE: map features that must be drawn schematically
**Claude historical QA, 7 November 2026.** This works from:
- Part C of `TYRE-ROUND-2-PART-2.md`;
- `TYRE-MAP-GUIDE.md` and `TYRE-MAP-FEATURES.csv`;
- the Greek of Arrian 2.15–25 and Diodorus 17.40–46.

**Not read here:** the modern papers (Brocard et al. 2024; Marriner et al. 2007/2008). Their figures are quoted only as the dossier and the earlier fact-check report them.

**Unit conversions used (approximate):**

| Unit | Approximate length |
|---|---|
| stade (στάδιον) | 177–185 m |
| plethron | 29.6–30.8 m |
| fathom (ὀργυιά) | 1.78–1.85 m |
| foot | 0.296–0.308 m |
| cubit | 0.44–0.46 m |

**No feature in this list gets a WGS84 coordinate from the ancient texts.** Coordinates come only from georeferencing the modern studies, with recorded error.

## Legend conventions (proposed)
- **Soft band:** an edge known only within a tolerance. Draw it as a feathered stroke whose width equals the stated uncertainty.
- **Hatched sector:** an event known to have happened somewhere along a stretch of wall or shore.
- **Symbolic marker (◇):** a place known to exist, with its position unknown. Draw the icon inside the city, away from the walls, never on a "real" spot. Tooltip: "position unknown".
- **Source tag:** each overlay carries one, e.g. "Arrian 2.24.1" or "Diodorus only".
- **Two-source features:** where Arrian and Diodorus disagree, draw Arrian's version on the main track and Diodorus's version on a toggled "Diodorus says" layer.

---

## 1. Physical setting

| Feature | Known | Not known | How to show |
|---|---|---|---|
| **Island outline (pre-332)** | **Ancient:** an island "fortified on all sides with high walls" (*τείχεσιν ὑψηλοῖς πάντῃ*, Arrian 2.18.2). **Modern:** Brocard 2024 reconstructs a rocky island about 1,500 × 600 m, about 450 m longer to the south than today's headland. | The ancient sources give no size or shape. Brocard's outline is a model from cores, not surveyed wall lines. Sea level was more than 2.5 m lower (per the earlier fact-check), so the shoreline position depends on it. | Trace Brocard Fig. 9 by hand after georeferencing, with a soft band of at least ±50 m, wider at the southern extension. Never use the modern peninsula. |
| **Strait width** | **Diodorus:** the city was "separated from the mainland by four stades" (*τέτταρσι σταδίοις*, 17.40.4), about 710–740 m. **Brocard:** ~750 m. **Marriner:** ~1,000 m. | Arrian gives **no** distance (correcting the earlier fact-check). The modern figures may be measured between different endpoints (island rock edge or wall; ancient or modern mainland shore). Check in the papers before choosing. | Draw ~750 m as the working width. Give the mainland shore a soft band reaching toward 1,000 m. Caption: "four stades (Diodorus); ~750 m (Brocard); ~1,000 m (Marriner)". |
| **Water depth / the shoal** | Arrian 2.18.3: a "shoaly strait" (*πορθμὸς τεναγώδης*), "shallow and muddy" near the mainland (*βραχέα καὶ πηλώδη*), and near the city the deepest part of the passage, "about three fathoms at most" (*τριῶν μάλιστα ὀργυιῶν*), about 5.5 m. Stakes drove easily into the mud. Brocard: a pre-existing submerged sandy bank. | There are no soundings. The depth at any one point is unknown, and the ancient sea level differed from today's. | A colour gradient from pale and muddy at the mainland to darker near the island. One label, "deepest ~3 fathoms (Arrian)", placed near the island end of the strait, not at a point. No contour lines with numbers. |
| **Mainland shore** | Old Tyre lay on the mainland, and its stones went into the mole (Diodorus 17.40.5). The mountains behind supplied timber (Diodorus 17.42.6, *ἐκ τῆς ὀρεινῆς*). | The ancient shoreline line is unknown. The isthmus that grew later covers the original beach. | Today's shore moved landward where the tombolo now is (as in the map guide), with a soft band. Label the mountains in the distance only. |
| **Winds** | **Fireship:** the Tyrians waited for a wind blowing onto the mole (2.19.3). **Diodorus's storm:** an *ἀργέστης*, a north-westerly by the Greek wind-names (17.42.5). **Final assault:** made in "calm weather" (*νηνεμίαν*, 2.23.1). | The fireship's wind direction is not given. | A wind arrow is used only in the storm overlay (NW, "Diodorus"). For the fireship, a generic "onshore toward the mole" cue with no compass claim. The final assault shows calm water. |

## 2. The mole

| Feature | Known | Not known | How to show |
|---|---|---|---|
| **Root on the mainland** | Built "from the mainland toward the city" (*ἐκ τῆς ἠπείρου ὡς ἐπὶ τὴν πόλιν*, Arrian 2.18.3), with Old Tyre's stones (Diodorus 17.40.5). | The exact landfall is not known. It is usually placed on the axis of today's isthmus, but that is an inference from geology. | An approximate axis with an uncertainty band (map guide). The landfall is a soft blob, not a point. |
| **Width** | **Diodorus:** "two plethra wide" (*δίπλεθρον τῷ πλάτει*, 17.40.5), about 60 m. **Arrian:** after the fireship Alexander ordered it built "wider, starting from the mainland, to take more towers" (*πλατύτερον*, 2.19.6). | Whether 60 m is the original or the widened width; Diodorus has no fireship and no widening. No archaeological section exists. | Two widths across the states: narrower in S1–S3, wider from S4. Tag "~60 m (Diodorus, literary)". Do not show measured edges. |
| **Construction** | Stones and timber laid on top of them. Stakes in the mud, and the mud acting as binder (Arrian 2.18.3). After the storm, whole trees with their branches (Diodorus 17.42.6). | The cross-section and the rate of progress are unknown. | Texture of stone, earth and stakes. No trestle (see the cover-image note). |
| **Head and towers** | Two towers with engines at the head, screened with hides and skins (2.18.6). Burned by the fireship (2.19.4–5). Rebuilt later (2.19.6, 2.21.1). | Tower height and footprint are unknown. | Illustrative tower sprites, labelled "illustrative". |
| **Did it reach the wall?** | **Diodorus:** yes. After the first breach "the mole joined the wall and the city became a peninsula" (*χερρονήσου γενομένης*, 17.43.5). **Arrian:** engines were brought up "along the mole" against the wall, which was too strong to breach there (2.21.2, 2.22.6). The stones in the sea were lassoed "from the mole" (2.21.7). | How far it reached, and when. | S4 and later: the mole reaches the foot of the wall with a soft end. The gap is never shown precisely. |

## 3. Walls and the city

| Feature | Known | Not known | How to show |
|---|---|---|---|
| **Wall facing the mole** | "About 150 feet" high and correspondingly thick, of "large stones set in mortar" (*λίθοις μεγάλοις ἐν γύψῳ*, Arrian 2.21.4), about 45 m. The Tyrians added wooden towers on the battlements there (2.21.3). | 150 ft is Arrian's figure, not a measurement. The wall's course is not known. | An ancient-style wall along the island edge facing the mainland, visibly the highest. Tag "~150 ft (Arrian)". |
| **Other walls** | High walls everywhere (2.18.2). The engines failed on the Sidon side (2.22.6). The south side, "toward the south wind and Egypt", was breached (2.22.7). | The line, towers, gates and thickness are all unknown. | Generic wall with **illustrative** towers. No crenellated castle. |
| **Inner second wall** | **Diodorus only:** built "five cubits" (~2.3 m) behind the main wall, "ten cubits" (~4.5 m) thick, with the space filled with stones and earth (17.43.3). | Where it ran. It probably faced the mole, but the text does not say. | Optional dotted line inside the mole-facing wall on the "Diodorus says" layer. |
| **Stones in the sea** | "Many stones thrown out into the sea" kept ships off the walls (Arrian 2.21.4). | Their extent, and who placed them (C12 in the corrections). | A rock-dotted band at the foot of the sea walls in S5, cleared in patches where it was "made clean" (2.21.7). |
| **Breach (Arrian)** | South side, "toward Egypt" (2.22.7). First a partial collapse that was repulsed, then three days later a wide breach (*ἀποχρῶν εἰς πλάτος*, 2.23.1). | The precise stretch is unknown. Arrian implies but does not state that it was the same stretch both times. | A hatched sector along the south-facing wall, not a single gap icon. S7a (probe repulsed), then S7b (breach and bridges). |
| **Breach (Diodorus)** | **First:** a plethron of wall (~30 m) knocked down and then rebuilt (17.43.4–5). **Final:** near the dockyards (*περὶ τὰ νεώρια*), where the wall was weaker, plus a ram breach "in another part" (17.46.1–3). | Where the dockyards were. | "Diodorus says" layer only: a dockyard ◇ in a sector of the north or south harbour, explicitly unplaced. |
| **Palace (*βασίλεια*)** | After taking the wall, Alexander went along the battlements toward the palace "because the way down into the city looked easier there" (2.23.6). | Its location. Arrian's wording suggests it was not far from the breach, but this is inference. | ◇ near the south side, "position unknown". |
| **Agenorion** | The Tyrians rallied at "the so-called Agenorion" (*τὸ Ἀγηνόριον*), a shrine of Agenor (2.24.2). | Its location. | ◇ inside the city. |
| **Temple of Heracles (Melqart)** | "The most ancient" temple (2.16.1). Sanctuary for Azemilcus and others (2.24.5). Games and dedications in the precinct (2.24.6). | Its location and plan. Herodotus 2.44 describes it, but that is not checked here. | ◇ large, generic, central-ish. Not on any archaeological site. |
| **Apollo statue** | Chained by the Tyrians (Diodorus 17.41.8; Plutarch 24.4) and unchained after the fall (17.46.6). | Where it stood. | Optional ◇; narration only. |
| **Streets** | The Tyrians blocked the "narrow streets" (*τοὺς στενωπούς*, Diodorus 17.46.3). | Any street plan. | Generic dense housing. No surveyed streets or gates. |

## 4. Harbours, blockade and camp

| Feature | Known | Not known | How to show |
|---|---|---|---|
| **Sidonian (north) harbour** | "The harbour toward Sidon", with a narrow mouth (*διὰ στενότητα τοῦ στόματος*, 2.20.9). The mouth was blocked with bow-on triremes (2.20.8–9). The Cypriots under Andromachus blockaded it (2.20.10). The midday sortie came out of it behind a sail screen (2.21.8). It "had not even a boom" at the final assault (2.24.1). | The basin's shape, the mouth's position, any moles. "North" is our inference from "toward Sidon". Brocard notes the harbours later moved. | A schematic enclosed basin on the north side with a narrow mouth. Label "north (Sidonian) harbour, schematic". No boom symbol. |
| **Egyptian (south) harbour** | "Beyond the mole, facing Egypt" (2.20.10). The Phoenician squadron blockaded it (2.20.10, 2.24.1). It had **booms** (*κλεῖθρα*), which the Phoenicians broke at the final assault (2.24.1). | The shape and mouth position. Whether it was an enclosed basin or partly open. | A schematic basin on the south side, with a boom symbol until S7, broken in S7. Label "schematic". |
| **Blockade stations** | Cypriots off the Sidonian harbour (2.20.10, 2.21.8). Phoenicians off the Egyptian harbour (2.20.10). | Distances and anchor lines. | Two squadron icons offshore of each mouth. |
| **First anchorage** | On arrival the fleet anchored "along the beach not far from the built mole, where there seemed to be shelter from the winds" (2.20.10). | Which side of the mole. | Optional S4 marker on the mainland shore near the mole root, "approx." |
| **Alexander's tent / camp** | His tent was near the Phoenician station on the Egyptian side of the mole (*ἵνα καὶ αὐτῷ ἡ σκηνὴ ἦν*, 2.20.10). At the sortie he had gone "to the tent", away from the fleet "on the other side of the city" (2.21.8). The camp could see the walls, where prisoners were killed in its sight (2.24.3). | Whether the tent was ashore (most likely) or with the fleet, and its exact spot. | ◇ on the mainland shore **south of the mole root**, "approx. (Arrian 2.20.10)". This revises the dossier's "unknown, low" to "side known, spot unknown". |
| **Sortie route** | Out of the Sidonian harbour against the Cypriots. Alexander sailed "round the city" from the other side (*περιέπλει τὴν πόλιν*, 2.22.3). Two Tyrian ships were taken at the harbour mouth (2.22.5). | The track. Which way round Alexander sailed is not stated, though from the south station round the west side is likely. | Arrow overlays labelled "schematic route". Alexander's arrow goes round the seaward (west) side as an inference, tagged so. |
| **Ships circling the walls** | Artillery and archer ships ordered to "sail round the wall" and to run ashore wherever possible (2.23.3). | Their positions. | Generic ring of ship icons in S7. |

## 5. Mainland and campaign features

| Feature | Known | Not known | How to show |
|---|---|---|---|
| **Old Tyre (Palaetyrus)** | "The so-called Old Tyre", demolished for the mole (Diodorus 17.40.5). Arrian 2.15–25 does **not** name it, so the CSV's "Arrian 2.16.7" must go. The offer of its temple is Curtius/Justin, not checked. | Its site, extent, and identification with Ushu or a particular tell. | A mainland zone with ruins, "approx.", away from the mole root unless the modern studies support adjacency. |
| **Ras el-Ain springs** | Not in Arrian, Diodorus or Plutarch 24–25. Plutarch mentions only "a spring" near which Alexander dreamed of the satyr (24.5), unnamed. | Any role in the siege. | Keep off the tactical map. On the "Tyre today" layer only, if wanted. |
| **Sidon** | Alexander's naval base. He went there to gather triremes (2.19.6), the fleets met there (2.20.1–3), and he sailed from there (2.20.6). | — | Campaign and coastal map: a solid placename. |
| **Antilebanon expedition** | To the mountain "called Antilebanon", against "Arabia" (i.e. Arab peoples); within ten days, back to Sidon (2.20.4–5; Plutarch 24.6–8). | The route and the places taken. | One dashed loop from Sidon into the Antilebanon, labelled "approximate, ten days". It must start from **Sidon after the fleets gathered** (see the corrections, C4). |
| **Gaza / Egypt** | The next objectives (2.25.4). | — | Campaign map only. |

## 6. Revised overlay states
These follow `TYRE-MAP-GUIDE.md`, adjusted for the Greek.

| State | What it shows |
|---|---|
| S0 | Pre-mole. |
| S1–S2 | Mole stages, with the towers (2.18). |
| S3 | Fireship and burnt towers (2.19.1–5). Diodorus's north-west storm (17.42.5) goes on its own toggled overlay, never merged with S3. |
| S4 | Widened mole. Fleet anchors near the mole (2.19.6, 2.20.10). |
| S5 | Blockade stations, harbour mouths blocked, stones in the sea, cable-cutting (2.20.8–2.21.7). |
| S6 | Sortie from the north harbour; Alexander sails round (2.21.8–2.22.5). |
| S7a | Engines fail at the mole and the north side. South-side breach repulsed (2.22.6–7). |
| S7b | Three days later: bridge ships, south breach taken, south harbour boom broken, Cypriots into the north harbour (2.23.1–2.24.1). |
| S8 | Agenorion, temple sanctuary, aftermath (2.24.2–6). |

## 7. Corrections to the existing map files
- **`TYRE-MAP-FEATURES.csv`, Old Tyre:** replace "Arrian 2.16.7" with "Diodorus 17.40.5".
- **`TYRE-MAP-FEATURES.csv`, City walls:** "~150 ft … to confirm" is now confirmed at Arrian 2.21.4. Cite 2.18.2 for "high walls on all sides". 2.18.3 is the strait, not the walls.
- **`TYRE-MAP-FEATURES.csv`, Rocks:** reword "Rocks sunk at the wall foot" to "Stones lying in the sea before the walls (Arrian 2.21.4)". Arrian does not say who placed them.
- **`TYRE-MAP-FEATURES.csv`, South harbour:** add "booms (κλεῖθρα), broken by the Phoenicians, Arrian 2.24.1".
- **`TYRE-MAP-FEATURES.csv`, North harbour:** add "narrow mouth (2.20.9); no boom at the final assault (2.24.1)".
- **`TYRE-MAP-GUIDE.md`:** "the ancient writers say four stades" should read "Diodorus says four stades". Arrian gives no distance.
- **Part C, "Alexander's camp":** the side is known (south of the mole, by the Phoenician station, 2.20.10), but not the spot.
