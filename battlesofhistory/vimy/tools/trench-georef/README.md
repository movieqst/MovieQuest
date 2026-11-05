# Vimy trench maps → battle map (5 November 2026)
How the six NLS trench-map sheets were lined up with the battle frame (2400 × 1800 world px, 50.402N 2.710E top-left to 50.322N 2.877E bottom-right) and traced into `images/trenches/trenches-<date>.png` (4800 × 3600, transparent; German red, Allied blue).

1. **`sheets.json`:** each sheet's printed frame corners (scan px) and the grid values printed on its frame. All the sheets share one grid: metres W of origin and N/S of origin; 36C SW is in yards. A bilinear map turns sheet px into grid metres.
2. **`cp.py`:** fits grid metres → world px. It is a similarity transform with the true scale, through ten villages (world px from the painting fit, i.e. Nicholson Map 7 lined up to the ground). RMS is about 220 m before the village correction. `render2.py` then adds a thin-plate correction through those villages, so they land where the painting shows them.
3. **`prev.py` / `prev8.py`:** place the small 36C SW 3 copies (Ed 7A preview, Ed 8A) on sheet 36C SW through their printed square numbers. RMS is about 9 m against that sheet.
4. **`render2.py`:** samples each sheet into the frame and picks out red and blue ink. **`compose.py`:** stacks the sheets into one layer per date.

Run them from a folder holding `dem.npy`-free copies of these files; the paths to the NLS scans are absolute in the scripts.
**Accuracy:** about 100–200 m, enough for the map scale. If a full-size 1917 36C SW 3 turns up, add it to `sheets.json` (frame 116,000 → 108,000 m W, 2,240 m N → 2,760 m S) and re-run.
