# Granicus and Issus: the three painted maps (prompts for ChatGPT, 13 November 2026)

Made by `tools/draw-layout-guides.py` from real elevation. For each map give ChatGPT the **base** (the real terrain and
water, to repaint: it fixes the framing) and the **guide** (what is where). One chat; paste the first box once, then each
map's box with its two images, **base first, then guide**. Ask for **exactly 2400 × 1800 px, landscape**. Send the results
back to Claude in a zip, as originals (PNG if offered). The page draws the armies, arrows and names on top, so they are
**not** painted.

## Paste once
```text
I am making an educational, narrated reenactment of Alexander the Great's first battles against Persia, the Granicus (May 334 BC) and Issus (November 333 BC), for students aged 12 and up. I need three painted maps in the same style, each made by repainting the BASE image I attach (real terrain from elevation data); the second image, the GUIDE, only says what is where.
Rules for every map:
- Keep EXACTLY the framing of the base: 2400 x 1800 px, landscape 4:3, north at the top. Do not crop, zoom, rotate or shift. Coastlines, rivers, hills and valleys stay exactly where they are in the base.
- A realistic painted aerial view, like a gentle satellite photograph, natural colours, soft clear light.
- The land as it was about 2,350 years ago: no modern towns, roads, bridges, dams, ports, breakwaters, factories, field patterns of modern farming, power lines or reservoirs.
- No armies, people, ships, text, labels, arrows, dots, grid lines, borders or frame: do not copy anything drawn on the guide.
```

## 1. The campaign map: `campaign-base.png` + `campaign-guide.png`
```text
Map 1, the campaign map (about 1,180 x 890 km): Anatolia (today's Turkey) from the Hellespont to the Gulf of Issus, in late spring.
- The Aegean Sea with its islands on the left, the Black Sea at the top, the Mediterranean and Cyprus at the bottom: deep blue, a little lighter near the coasts.
- Anatolia: the dry central plateau in tawny and ochre with green river valleys; the Taurus mountains along the south coast in grey rock and dark pine forest with a little snow on the highest peaks; the green, fertile river valleys of the west coast (around Sardis, Ephesus, Miletus); the Amanus mountains at the corner of the Gulf of Issus (bottom right).
- The salt lake in the middle (Tuz Golu) pale white-blue, the other lakes as in the base.
- Seen from very high: no detail of towns at all.
```

## 2. The Granicus: `granicus-base.png` + `granicus-guide.png`
```text
Map 2, the river Granicus (8 x 6 km), north-western Anatolia, in May.
- The river (the blue line in the base) flows north through a green, flat valley floor: a modest river, about 20-30 m wide, fast-flowing in spring, winding a little, with gravel bars and a line of plane trees, willows and reeds along its banks.
- The banks are the key: on the EAST side (right) the bank is steep and muddy, a step of 2-4 m rising from the water to a gentle slope; on the west side the bank is lower. Show the steep east bank clearly along the whole river.
- East of the river, the ground rises gently to low hills with meadows, scattered oaks and scrub; west of the river, the flat valley floor with meadows and a few small fields.
- Late spring colours: fresh green grass, wild flowers, darker green trees. No town (the modern town of Biga is just off the bottom edge: do not paint it).
```

## 3. Issus: `issus-base.png` + `issus-guide.png`
```text
Map 3, the coast of Issus (12 x 9 km), at the north-east corner of the Mediterranean, in November.
- The sea (the Gulf of Issus) on the left, calm and blue; a natural sandy and pebbly shore along the whole coast: make the straight, artificial pieces of today's coastline in the base into a natural beach, and paint no port, pier or breakwater.
- A narrow coastal plain, about 2.5-3 km wide, between the sea and the mountains: autumn grass, brown and olive, scattered bushes, a few trees, small stony stream beds.
- The river (the blue line in the base) crossing the plain from the mountains to the sea: a small river with a stony bed and banks that are steep in places, lined with plane trees and oleander bushes.
- The Amanus mountains on the right: steep foothills rising to high ridges, covered in dark pine and oak forest with grey rock outcrops, some autumn colours.
- No town, no road, no factory, no port (a modern town, a steel works and a port stand here today: do not paint any of them).
```

## Notes
- **What is certain and what is not:** the terrain, the coast and the rivers come from real elevation. The exact
  battlefields are disputed: the **Granicus** map is the conventional site north of Biga (Körpe's 2024 research argues for
  a site farther south), and the **Issus** map is the Payas river, the most often proposed Pinarus (Kuru Çay and Deli Çay
  to the north are the other candidates). The page will say so.
- **The rivers on the battle maps** are approximate: the Granicus traced along its valley floor, and the Payas drawn as a
  smooth curve through hand-placed points, because the plain is too flat for the elevation to show its course.
