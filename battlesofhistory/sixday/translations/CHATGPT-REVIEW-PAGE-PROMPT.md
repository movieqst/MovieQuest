# ChatGPT review of the Arabic and Hebrew page text (13 November 2026)

The narration was reviewed before (`CHATGPT-REVIEW-AR-HE-1.md`). This review is for the rest of the page: the armies'
cards, map labels and markers, photo captions, the radio subtitles, the library notes and the buttons. They were
translated by Claude following `GLOSSARY.md`.

**Attach:** `GLOSSARY.md`, `../lang/page-ar.json`, `../lang/page-he.json`, `../lang/ui-ar.js`, `../lang/ui-he.js`.
Paste the prompt. Send the answer back to Claude as a file.

```text
You are reviewing translations for an educational, neutral history web page about the Six-Day War (June 1967), for school students. Attached: the glossary that the narration's translators followed (GLOSSARY.md), and the page's other text in Arabic (page-ar.json, ui-ar.js) and Hebrew (page-he.json, ui-he.js). In the JSON files each key is the English and each value the translation; in the .js files, the same for the buttons and menus.
Check each translation for: (1) accuracy against the English; (2) neutrality: the same attributions and hedges as the English ("Israeli sources", "approx.", "according to"), nothing added, softened or sharpened, and the glossary's terms used; (3) natural, plain Modern Standard Arabic / modern Hebrew for students, short enough for map labels and buttons; (4) consistent spelling of names and places with the glossary.
Please look especially at: military ranks (Tal and Yoffe were Major-Generals, Aluf, in 1967); the tag labels (Established, Israeli account, Arab account, Disputed, Estimate, Reconstruction); the 1967 Israeli Air Force radio lines (natural spoken military Hebrew; in Arabic a plain translation); the quoted Egyptian radio phrase "Zionist planes"; "Temple Mount / al-Haram al-Sharif" and "the Western Wall (al-Buraq Wall)"; Government House; the place names not in the glossary (Abu Suweir, Inshas, Bilbeis, Fayid, Kabrit, Ruafa dam, Jubata ez-Zeit, Nitzana).
Answer in a table per language: English | current translation | problem | suggested translation | Required / Optional. Only list items with a problem. End with any general remark.
```

**When it comes back:** Claude applies the Required items to `../lang/page-*.json` and `../lang/ui-*.js` (and the merged
copies in `../../lang-ui.js`), runs `tools/make-lang.py`, and checks the page.
