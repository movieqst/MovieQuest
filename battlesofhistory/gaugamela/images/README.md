# Intro slideshow photos

The introduction shows a picture beside each narrated screen, and the same
pictures appear in "From the record" and in the unit write-ups. The engine looks
for the files below in this folder; until a file is present it shows a
"Photo to add" card with the caption. Captions and reference lines live in
`scenario.js` (each intro slide's `media` list), so a photo can be swapped
without touching the code.

Every one of these subjects exists as a photograph or scan on Wikimedia Commons.
Search Commons for the subject, pick an image whose licence allows reuse
(public domain, CC0, CC BY or CC BY-SA), save it here under the file name
shown, and paste the credit line into that entry's `credit` field in
`scenario.js`, for example `credit: 'Photo: J. Smith, Wikimedia Commons, CC BY-SA 4.0'`.

| File | Slide | Subject to find | Where the object is |
|---|---|---|---|
| 01-alexander-mosaic.jpg | 1 | The Alexander Mosaic, whole | Museo Archeologico Nazionale, Naples |
| 02-mosaic-darius.jpg | 1 | Alexander Mosaic, detail of Darius in his chariot | Naples |
| 03-mosaic-alexander.jpg | 2 | Alexander Mosaic, detail of Alexander on horseback | Naples |
| 04-alexander-coin.jpg | 2 | Tetradrachm of Lysimachus with the head of Alexander (horns of Ammon) | coin collections; Commons has many |
| 05-persian-daric.jpg | 2 | Achaemenid gold daric, king as archer | coin collections |
| 06-persian-empire-map.jpg | 2 | Map of the Achaemenid empire. **Pick one that does not mark a site for the battle** — the site is not known | modern map |
| 07-alexander-sarcophagus.jpg | 3 | Alexander Sarcophagus, battle side | Istanbul Archaeology Museums |
| 08-sarcophagus-alexander.jpg | 3 | Alexander Sarcophagus, detail of the rider in the lion-skin helmet | Istanbul |
| 09-kinch-tomb.jpg | 3 | Kinch Tomb, entrance (the painting itself is lost; Kinch's 1897 drawing would be better if found) | Lefkadia, Macedonia |
| 10-persepolis-guards.jpg | 4 | Persian and Median guards, Apadana relief | Persepolis |
| 11-susa-archers.jpg | 4 | Frieze of archers, glazed brick, Susa | Musée du Louvre |
| 12-apadana-bactrians.jpg | 4 | Bactrian delegation with camel, Apadana relief | Persepolis |
| 13-ptolemy-coin.jpg | 5 | Tetradrachm struck under Ptolemy I (Alexander in elephant scalp) | Bibliothèque nationale de France |
| 14-babylonian-diary.jpg | 5 | Astronomical diary for 331 BCE (BM 36761) | British Museum |
| 15-le-brun-arbela.jpg | 6 | Charles Le Brun, *The Battle of Arbela* (1669) | Musée du Louvre |

Sizes: 1200 px on the long side is plenty. JPEG keeps the folder small.

## Unit write-ups

The armies panel reuses the pictures above (see `units[].photos` in
`scenario.js`). The Agrianian javelinmen and the Armenian and Cappadocian
cavalry have no picture yet.
| 16-susa-archer-detail.jpg | Head of an archer from the Susa frieze (unit write-ups only) | Musée du Louvre |
