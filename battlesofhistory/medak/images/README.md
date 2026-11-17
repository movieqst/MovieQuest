# Medak Pocket (1993): pictures

## Painted maps (ChatGPT, prompts in layout/ART-PROMPTS-MAPS.md; originals in layout/painted/)

All painted with ChatGPT (AI-generated) on the bases made by tools/draw-maps.py (elevation; OpenStreetMap, ODbL; GHSL 1990,
CC BY 4.0); checked 17 November 2026 by overlaying the base's roads, rivers and coast. Originals 1448 × 1086, scaled to 2400 × 1800.

| File | Map | Check |
|---|---|---|
| croatia-painting.jpg | Croatia and the Krajina, 1993 (320 × 240 km) | coast and islands match the base 95.6 % (IoU) |
| lika-painting.jpg | Gospić and the Medak pocket (26 × 19.5 km) | Gospić, the roads and the railway on the base's lines (overlay) |
| pocket-painting.jpg | the pocket's villages (12 × 9 km) | the lanes and roads on the base's lines (overlay); villages intact, before September 1993 |

## Sprite sheets (units/, 17 November 2026)

Painted by ChatGPT from `../ART-PROMPTS-UNITS.md`, one sheet per chat; originals in `units-raw/` (1254 × 1254, green
background, renamed to the prompt numbers). Cut with `tools/prepare-sprite-sheet.py`, then `tools/fix-green-fringe.py`.
Rows: south, east, north, west; all directions checked. Equipment types are our reconstruction (see the prompts).
- People, 160 px cells: `hv-infantry` (0.473) and `hv-infantry-fire` (same), `svk-infantry` (0.436) and `svk-infantry-fire`
  (same), `un-canadian` (0.458) and `un-canadian-fire` (same), `civilians` (0.45: two villagers with a cow).
- Vehicles and guns, 240 × 200 cells, sized against each other: `hv-tank` (T-55), `svk-rockets` (truck rocket launcher, the
  largest), `hv-truck` (TAM), `hv-artillery` (towed howitzer and crew), `un-french-vab`, `un-m113` (the smallest).
