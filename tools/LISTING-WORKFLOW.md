# Adding a copy: photos → website page → eBay listing

One physical copy at a time. Movie uploads its photo group; the AI does the rest.

## 1. Photos
- Photo order (Movie, 11 Oct): FRONT, SIDES (if any), BACK, INSIDE, DISC front
  (label), DISC back (shiny side). Turn sideways photos upright.
- Save them as `images/<item-id>-N.jpg`, numbering on from the item's last photo
  (an existing movie keeps all its old photos — new ones are added after them).
- Make the slideshow GIF for this copy's eBay description:

      python3 tools/make-gif.py images/<item-id>-6.jpg images/<item-id>-7.jpg ... -o images/<copy-id>.gif

  eBay's own photo section keeps only a GIF's first frame, so the GIF lives on
  moviequest.ca and the listing description shows it. The main eBay search
  photo is still uploaded to eBay as a normal picture.

- Condition defaults to **Very Good** (case, disc and overall) unless Movie
  gives a grade; he changes it on eBay if needed.
- `price` on the website is always the full eBay price, never a sale or
  discounted price (Movie, 21 Oct).

## 2. data.json
New movie → add an item. Existing movie → edit its item. Fields used:

| field | what |
|---|---|
| `photos` | every photo of every copy, in order (the website carousel) |
| `trivia` | `[{ "heading": "Behind the Scenes", "text": "..." }]` — Did You Know |
| `titleNote`, `tagline`, `runYears`, `createdBy` | optional extras for the listing title / TV series |
| `sold` | `true` marks the movie SOLD (also automatic when every copy is sold) |
| `copies` | one entry per physical copy, below |

A copy:

```json
{
  "id": "the-wizard-1989-dvd-2",
  "added": "2026-10-11",
  "format": "DVD",
  "edition": "Widescreen",
  "photos": ["images/the-wizard-1989-dvd-6.jpg", "..."],
  "gif": "images/the-wizard-1989-dvd-2.gif",
  "condition": { "overall": "Very Good", "case": "Very Good",
                 "discs": ["Very Good"], "inserts": "Chapter insert", "notes": "..." },
  "ebayUrl": "",
  "sold": false
}
```

## 3. Build
    node tools/build.mjs

Writes `movies/<item-id>/index.html` (one page per movie, with a Copies section:
one card per copy showing its slideshow GIF, grade and its own eBay link; SOLD
copies stay up with a SOLD stamp), `listings/<copy-id>.html`
(the eBay listing for that copy, with a COPY HTML button), `listings/index.html`
and `sitemap.xml`. The Pages workflow runs it on every deploy too.

## 4. eBay
Open `https://moviequest.ca/listings/<copy-id>.html`, press COPY HTML, and paste
into the eBay description (HTML view).
