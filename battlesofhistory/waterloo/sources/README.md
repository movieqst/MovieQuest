# Waterloo sources library

Our own PDF copies of public-domain books and records, listed in `scenario.js` (`library`) and shown on `library.html`.

How a book gets here (a scan from archive.org), or from Project Gutenberg:
- Gutenberg has no PDFs: download its "Read online (web)" zip and print the HTML to PDF (the Mercer PDF was made this way,
  with Chromium; the Gutenberg licence at the end of the book is kept).

From a scan:
1. On archive.org, open the book and use **Download options → PDF** (a scan of a printed copy, with searchable text).
2. Make it small: `python3 ../../tools/shrink-pdf.py BIG.pdf sources/mercer-1870-journal.pdf` (keeps the text layer).
3. Set the entry's `local` to the file name, and its `archive` link to the book's own archive.org page.

Keep each PDF under about 40 MB (GitHub refuses files over 100 MB, and the whole site should stay well under 1 GB).
Name files author-year-short-title.pdf.
