# Movie Quest Canada (moviequest.ca): how to list a new item

You are helping the owner sell DVDs, Blu-rays, VHS and music CDs on eBay. For
every item they send photos of, you make:

1. a **website page** on moviequest.ca (`movies/<id>/`),
2. an **eBay description page** (`listings/<id>-1.html`) they copy into eBay,
3. a **zip of the photos**, turned upright and numbered, for them to upload to eBay.

Then, when they send the eBay link and price, you connect the website page to
the eBay listing. The site is static HTML on GitHub Pages; merging to `main`
publishes it. More detail on the data fields is in `tools/LISTING-WORKFLOW.md`.

---

## 0. Before you start

- Work on your session's branch, freshly reset to `origin/main`
  (`git fetch origin main && git checkout -B <branch> origin/main`). Other
  sessions merge to `main` too, so always start from the latest.
- The owner usually sends photos as a **zip** (e.g. `Hero.zip`). Photos pasted
  straight into chat while you are still replying often **do not save as
  files**, so you can see them but can't use them. If that happens, say so
  plainly and ask them to resend after your reply, or as a zip.
- Unzip each upload into its own new folder in your scratchpad and run Python
  that reads it with `python3 -I`.

## 1. Look at every photo and fix the direction

1. Make a contact sheet (all photos as small labelled thumbnails in one image)
   and look at it, so you know what each photo shows.
2. Always open photos with `ImageOps.exif_transpose(...)` first (iPhone photos
   store their rotation as a tag).
3. **Turn every sideways or upside-down photo so the main text reads upright.**
   If a photo has text running two ways, make the main item (the cover or back
   cover) read upright.
4. **Check your rotation**: make a preview of the rotated result and look at
   it before saving. Guessing the direction wrong is easy; the owner notices.
5. Leave out blurry shots and near-duplicates.
6. Writing on the shiny (play) side of a disc is a reflection; it reads
   backwards whichever way you turn it. Leave those as they are.

**Photo order** (photo 1 = main photo):
1. **Front cover, straight on, as big as possible** (no discs, no back). For a
   multi-season set, two fronts side by side is fine.
2. Front at an angle, spine.
3. Back cover (and close-ups of it).
4. Inside / open case, each disc label.
5. Shiny sides of the discs.

**Save** as `images/<id>-N.jpg` (N = 1, 2, 3…): photo 1 at 1500px max, the
rest at 960px max, JPEG quality 88.

## 2. Read the box and research

From the **back cover and disc labels**, copy exactly: studio/label, year of
the DVD release, catalogue no., UPC/ISBN, runtime, aspect ratio, audio,
subtitles, rating (US and Canadian, e.g. 14A), number of discs, episode list by
disc, special features, and the back-cover blurb (use it as the description).

Research (web search) only what the box doesn't say: cast, director/creator,
producers, a trailer on YouTube. Write **4–6 "Did You Know?" trivia items**,
each with a short heading. Tell the owner which facts came from your own
knowledge rather than a source. Leave `youtubeId` out if you can't find a
reliable trailer.

## 3. Grade the condition (the owner's rules)

- Default **Very Good** for case, discs and overall.
- Still in the shrink wrap: **Brand New (factory sealed)**. Note a store price
  sticker or splits in the wrap.
- Damage to a **disc, the cover art or an insert** (cut, tear, stain, deep
  scratch): **Good** or lower.
- Minor damage to the **plastic case or slipcover** (edge wear, corner wear,
  scuffs): stays **Very Good**, but always note it in `condition.case`.
- If you see something you aren't sure about (spots on a disc, marks on the
  art), describe exactly where it is and ask the owner.

## 4. Add the item to `data.json`

Append a new object at the end of the array. Copy the shape of a recent one
(e.g. `bionic-woman-season-2-dvd`). Key rules:

- `id`: `title-words-year-format`, e.g. `thief-1981-dvd`,
  `bionic-woman-season-2-dvd`.
- **The year always goes in or next to the title** (`titleNote`, e.g.
  `"Widescreen / 1993"`; TV sets use the airing years, e.g. `"1976–1977"`).
- `categories`: decade codes from `categories.json` (`1980s`, `2010s`…),
  plus `tvseries` for TV, `music` for CDs. Use `years: [...]` when it spans
  several years.
- `image`: `https://moviequest.ca/images/<id>-1.jpg` (the front cover).
- `photos`: every photo path, in order; the copy's `photos` the same.
- `storeUrl: ""`, `price: null`, `copies[0].ebayUrl: ""` until listed.
- `searchUrl`: `https://www.ebay.ca/sch/i.html?_nkw=<words>&campid=5339133571&customid=<id>`
- `trivia`: `[{ "heading": ..., "text": ... }]`, and `tidbits` = just the texts.
- `copies[0]`: `id` `<id>-1`, `added` today's date, `edition`, `photos`,
  `gif` `images/<id>-1.gif`, and `condition` with `overall`, `case`,
  `discs` (one grade per disc), `inserts`, `notes` (all the box details).
- Music CDs: use `artist`, `genre`, `compiledBy`, `label`, `released` and a
  `tracks` list instead of `starring` and `director`.

## 5. Build

```
python3 tools/make-gif.py images/<id>-1.jpg images/<id>-2.jpg ... -o images/<id>-1.gif
node tools/build.mjs
```

The GIF is the photo slideshow shown at the top of the eBay description (eBay
itself only shows a GIF's first frame, so it lives on moviequest.ca). The build
writes `movies/<id>/index.html` and `listings/<id>-1.html`.

## 6. Send the owner the zip and the eBay description

- **Zip**: copy the photos in order with the upload number at the front of
  the file name (`01-<id>.jpg`, `02-<id>.jpg`…), zip them in the scratchpad,
  and send the zip with `SendUserFile`.
- **eBay description**: send `listings/<id>-1.html`. Tell them: open it,
  press **COPY HTML**, then in eBay tick **Show HTML Code** and paste. (Never
  copy the page with Ctrl+A; the toolbar is not part of the listing.)
- Summarise in a few lines: title, photos used (and which you rotated or left
  out), disc details, grade and any flaw noted, trivia, anything to check.
- Commit and push to your branch.

## 7. When they send the eBay link and price

- `storeUrl` (eBay Partner Network link; always use this exact pattern):
  `https://www.ebay.ca/itm/<itemNo>?mkcid=1&mkrid=706-53473-19255-0&siteid=2&campid=5339133571&customid=<id>&toolid=10001&mkevt=1`
- `copies[0].ebayUrl`: `https://www.ebay.ca/itm/<itemNo>`
- `price`: the **full** eBay price, **never a sale price**. Read it from their
  screenshot.
- Rebuild, commit, push. Point out anything on their eBay listing that doesn't
  match the box (wrong year, "Very Good" on a sealed item, wrong seasons).

## 8. Going live

Give them the compare link to open a pull request and merge:
`https://github.com/movieqst/MovieQuest/compare/main...<your-branch>`
(or open the PR yourself if you can). After they merge, reset your branch to
`origin/main` before the next item.

## Good to know

- Commit messages: short, e.g. `Add Thinner (1996) Blu-ray: page, photos, eBay listing`.
- The homepage sorts by "Newly listed" by default, using each copy's `added`
  date, so set `added` to today.
- GoatCounter (`gc.js`) counts visits; nothing to do there per item.
- Don't edit the old `vidjoin/` folder.
