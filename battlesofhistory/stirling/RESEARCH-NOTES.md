# Stirling Bridge: comparing the two research briefs

The two files:
- **RESEARCH.md:** Claude's brief, written from search-result extracts. HES, Wikipedia and Canmore were blocked.
- **RESEARCH-CHATGPT.md:** ChatGPT's dossier, built on the HES battlefield inventory (BTL28) and the scheduled-monument record (SM8264). It comes with `BATTLEFIELD-COORDINATES-CHATGPT.csv` and `FACT-CHECK-CHATGPT.csv`.

ChatGPT read the HES record that Claude could not, so its numbers and page references are the better base. The two briefs agree on every main point.

## Agreed (safe to narrate)
- **Background:** Edward I conquered Scotland in 1296. In 1297 there were risings under Wallace in the south and Moray in the north.
- **Commanders:** the Scots were led jointly by Wallace and Moray. The English were led by Surrey (Warenne), with Cressingham, Edward's treasurer in Scotland, beside him.
- **The bridge:** a narrow wooden bridge, which only a few horsemen could cross side by side. The Scots waited on the high ground near the Abbey Craig until part of the English army had crossed. Then they came down and cut off the bridgehead.
- **Lundie's plan:** Richard Lundie proposed crossing at a ford instead. He was overruled.
- **During the battle:** Thweng fought his way back across the bridge, and Cressingham was killed.
- **After the battle:** Surrey retreated. The Steward and Lennox fell on the fugitives and the baggage, according to Guisborough.
- **Moray:** he was wounded. His name still appears on the Lübeck letter of 11 October 1297, and he died later that autumn; the date is unknown.
- **What came next:** the raid into northern England, Wallace as Guardian, and defeat at Falkirk on 22 July 1298.
- **The 1297 bridge:** the remains of a timber bridge with stone-reinforced piers lie just upstream of the stone Old Bridge. They are *probably* the 1297 bridge, since an attempt to date them failed. The stone Old Bridge is 15th–16th century, and the Wallace Monument is Victorian. Neither belongs on a 1297 map.
- **Things no one knows:** the exact sizes of the armies, the casualties, any clock times, and Wallace's banner. No kilts, no tartan.
- **Wallace's speech:** his famous reply to the friars is Guisborough's dramatic writing, not a recorded quotation. Narrate it as "according to Guisborough…".
- **Blind Harry's collapsing-bridge trick** is legend.

## Where they differ, or one adds something
| Point | Claude | ChatGPT | Use |
|---|---|---|---|
| Guisborough's numbers | Not found | English 1,000 horse + 50,000 foot; Scots 180 horse + 40,000 foot | Quote them as the chronicle's claim, then say they're impossible |
| Cressingham's July muster | Not found | 300 horse, 10,000 foot at Roxburgh | A useful fact, but it was taken in July, not on the day of the battle |
| Modern estimates | 2,500 to 18,000 English; the "9,000" figure traced to BBC History 2014 | Reid: a little over 6,000 foot + 300 horse, Scots similar. HES model: English 350 + 6,350; Scots 180 + 6,000 + 400 archers | Use the HES model for the game, labelled "estimate" |
| English losses | Guisborough: 100 horse, 5,000 foot | The same, plus 300 Welsh | The chronicle's claim, not a count |
| Who broke the bridge | Usually Surrey's order | Guisborough: Surrey ordered it. Scalacronica: the Scots broke it. **Fire is not established** | Show the bridge **broken** after the fight, labelled disputed. No flames |
| Cressingham's death | Flayed (two versions) | Also the Bury St Edmunds chronicle: captured and beheaded | Say he was killed. Mention the skin story only briefly, as the hostile English chroniclers' claim |
| Other English chronicles | Not listed | Langtoft, Bartholomew Cotton, Bury St Edmunds (with page numbers in *English Historical Documents*) | Add to the sources list |
| Where the Scots stood | Abbey Craig, or Spittal Hill (Murray Cook) | Near the Abbey Craig | Abbey Craig, noting Cook's alternative |
| The tide | Murray Cook: the tidal range was 1–2 m higher | Not mentioned | Optional "one archaeologist thinks…" line |
| The ford | Kildean or Drip ("two miles upstream") | HES's candidate: near the present Riverside–Cambuskenneth crossing | Map it **dashed** at the HES candidate, labelled "possible ford" |
| The town's seal | The 1296 burgh seal shows the bridge with eight piers | Not mentioned | A good picture lead for the bridge |
| Picture caution | — | The Commons category "Stirling Bridge" is mostly a bridge in Fremantle, Australia | Search "Stirling Old Bridge" instead |

## Coordinates for the maps
Converted from the Ordnance Survey grid with pyproj (EPSG:27700 to WGS84) in this session:

| Place | Lat, lon | Source | Confidence |
|---|---|---|---|
| Probable 1297 bridge (piers) | 56.12913, −3.93670 | HES SM8264, NS 79719 94623 | Probable |
| Stone Old Bridge (not 1297) | 56.1280, −3.9369 | NS 797 945 | Certain |
| HES battlefield reference point | 56.13233, −3.93075 | HES BTL28, NS 80099 94969 | A reference point, not where the fighting was |
| Abbey Craig | 56.1382, −3.9181 | NS 809 956 | Certain |
| Cambuskenneth Abbey | 56.1229, −3.9174 | NS 809 939 | Certain |
| Stirling Castle | about 56.1236, −3.9465 | | Certain place; point approximate |
| Possible ford (HES candidate) | about 56.1255, −3.9256 | ChatGPT, from HES | Speculative |
| Causeway (bridge to Causewayhead) | Line from the bridge north-east toward 56.137, −3.925 | Reconstructed | Estimate |
| Kildean (old rival bridge site; a ford) | about 56.137, −3.955 | | Estimate |

The two briefs differ by about 100 m on the pier line. Claude's "~56.1296" came from search snippets, so we use the HES grid reference.

## Proposal for the reenactment
**One reenactment, following Guisborough's outline:**
1. The delays.
2. The friars, with Wallace's reply narrated as "according to Guisborough".
3. Lundie's ford, refused.
4. The vanguard crosses two by two.
5. The Scots come down from the Abbey Craig.
6. The bridgehead is cut off.
7. Thweng's escape.
8. Cressingham's death.
9. The bridge broken, disputed and with no fire.
10. Surrey retreats, and the Steward and Lennox fall on the baggage.

The debrief covers Moray, the Lübeck letter, the raid into England and Falkirk.

Clocks read "Morning", "Late morning" and so on; no exact times.

**Maps (all drawn from real elevation data):**
1. **Scotland 1297:** the Stirling crossing as the key to the north.
2. **The approach:** Stirling to the Abbey Craig and Cambuskenneth, with the loop of the Forth.
3. **The battlefield:** the bridge, the causeway, the bend in the river and the possible ford, about 2.5 × 2 km.
