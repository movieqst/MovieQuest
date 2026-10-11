#!/usr/bin/env node
// BUILD THE MOVIE PAGES AND THE EBAY LISTINGS FROM data.json.
//
//   node tools/build.mjs
//
// Writes, from data.json and templates/movie-page.html:
//   movies/<id>/index.html     one page per item -- its own title, description
//                              and photo preview, so a shared link or a search
//                              result shows the movie, not "Item".
//   listings/<copy-id>.html    for every copy in an item's "copies": the eBay
//                              description in the Movie Quest style, ready to
//                              copy and paste, with that copy's photos.
//   listings/index.html        every listing, newest first.
//   sitemap.xml                every movie page.
//
// Run it after any change to data.json. The Pages deploy runs it too, so the
// live site can never be out of step with data.json.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://moviequest.ca';

const esc = s => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const abs = url => (!url ? '' : /^https?:\/\//.test(url) ? url : `${SITE}/${String(url).replace(/^\/+/, '')}`);
const clip = (s, n) => { const t = String(s || '').replace(/\s+/g, ' ').trim(); return t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t; };

const items = JSON.parse(fs.readFileSync(path.join(ROOT, 'data.json'), 'utf8'));
const categories = JSON.parse(fs.readFileSync(path.join(ROOT, 'categories.json'), 'utf8'));
const catLabel = Object.fromEntries((categories.topCategories || []).map(c => [c.code, c.label]));
const template = fs.readFileSync(path.join(ROOT, 'templates', 'movie-page.html'), 'utf8');

// Photos of an item: its own list when it has one, else its single image.
const photosOf = item => (Array.isArray(item.photos) && item.photos.length ? item.photos : [item.image].filter(Boolean)).map(abs);

// ── THE MOVIE PAGE ─────────────────────────────────────────────────────────
function moviePage(item) {
  const url = `${SITE}/movies/${encodeURIComponent(item.id)}/`;
  const title = `${item.title}${item.year ? ` (${item.year})` : ''} ${item.format || ''} — Movie Quest Canada`.replace(/\s+—/, ' —');
  const desc = clip(item.desc || `${item.title} on ${item.format}.`, 200);
  const image = photosOf(item)[0] || `${SITE}/logo.jpg`;
  const head = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(desc)}">`,
    `<link rel="canonical" href="${esc(url)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="Movie Quest Canada">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(desc)}">`,
    `<meta property="og:url" content="${esc(url)}">`,
    `<meta property="og:image" content="${esc(image)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
  ].join('\n');
  // What a search engine (or a reader with scripts off) sees before the page
  // fills itself in from data.json. Removed by the page script once it loads.
  const staticBlock = `<div id="mqStatic" class="not-found">
    <h1 style="font-family:'Anton',sans-serif;color:var(--ink);">${esc(item.title)}${item.year ? ` (${esc(item.year)})` : ''}</h1>
    <p>${esc([item.format, item.condition].filter(Boolean).join(' · '))}</p>
    <p style="max-width:640px;margin:12px auto 0;">${esc(item.desc || '')}</p>
  </div>`;
  return template
    .replace('<!--MQ_HEAD-->', head)
    .replace('<!--MQ_STATIC-->', staticBlock)
    .replace('<!--MQ_DATA-->', `<script>window.MQ_ITEM_ID = ${JSON.stringify(item.id)};</script>`);
}

// ── THE EBAY LISTING ───────────────────────────────────────────────────────
// Movie's own design (the South Park listing, 11 Oct), every style inline so
// it survives eBay's description editor. Only the parts in ${} change.
const GRADES = [
  ['5 — Brand New / Sealed', 'Factory sealed. Never opened. Perfect condition.', '#fff', '#fff'],
  ['4 — Like New', 'Opened but flawless. No visible wear. Plays perfectly.', '#ff6b6b', '#ff6b6b'],
  ['3 — Very Good', "Near perfect. May have very minor flaws such as light scuffing that's difficult to see. Plays perfectly.", '#d32f2f', '#d32f2f'],
  ['2 — Good', 'Noticeable wear that does not affect playback. May include light scuffing or minor water damage to artwork.', '#8b0000', '#b71c1c'],
  ['1 — Acceptable', 'Significant flaws. Scuffing that may affect play, ripped artwork, or stickers on the case. Still functional.', '#4a0000', '#8b0000'],
];

const box = (inner, accent = 'rgb(211, 47, 47)') =>
  `<div style="color: rgb(232, 232, 232); background: rgb(17, 17, 17); padding: 16px; border-radius: 6px; margin-bottom: 16px; border-left: 3px solid ${accent};">${inner}</div>`;
const h3 = text => `<h3 style="margin: 0 0 8px 0; color: #d32f2f; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">${text}</h3>`;

function tagline(item, copy) {
  if (item.tagline) return item.tagline;
  const cats = (item.categories || []).map(c => catLabel[c]).filter(l => l && !/^\d{4}s$|^Pre-/.test(l));
  return [copy.format || item.format, copy.edition, ...cats, item.runYears].filter(Boolean).join(' / ');
}

export function ebayListing(item, copy) {
  const c = copy.condition || {};
  // Movie, 11 Oct: "put all the condition as VERY GOOD for default, and i'll
  // change it if needed".
  const grade = c.overall || item.condition || 'Very Good';
  const trivia = Array.isArray(item.trivia) && item.trivia.length
    ? item.trivia
    : (item.tidbits || []).map(text => ({ heading: '', text }));
  const discs = Array.isArray(c.discs) && c.discs.length ? c.discs : [grade];
  const row = (label, value) => `
      <div style="margin-bottom: 8px;">
        <span style="display: inline-block; width: 80px; color: #d32f2f; font-weight: bold; font-size: 13px;">${esc(label)}:</span>
        <span style="color: #ccc; font-size: 13px;">${esc(value || '...')}</span>
      </div>`;
  const photos = (copy.photos || []).map(abs);
  const titleNote = item.titleNote || [copy.edition, item.year].filter(Boolean).join(' / ');
  const credits = [
    item.starring && `<strong style="color: #ddd;">Starring:</strong> ${esc(item.starring)}`,
    item.createdBy && `<strong style="color: #ddd;">Created By:</strong> ${esc(item.createdBy)}`,
    item.director && `<strong style="color: #ddd;">Directed By:</strong> ${esc(item.director)}`,
    item.producers && `<strong style="color: #ddd;">Producers:</strong> ${esc(item.producers)}`,
    item.company && `<strong style="color: #ddd;">Production:</strong> ${esc(item.company)}`,
  ].filter(Boolean).join('<br>');

  return `<div style="max-width: 700px; margin: 0px auto; font-family: &quot;Segoe UI&quot;, Tahoma, Geneva, Verdana, sans-serif; background: rgb(10, 10, 10); border-radius: 10px; overflow: hidden; box-shadow: rgba(0, 0, 0, 0.6) 0px 4px 16px;">

  <!-- HEADER -->
  <div style="color: rgb(232, 232, 232); background: rgb(15, 15, 15); padding: 22px; text-align: center; border-bottom: 2px solid rgb(211, 47, 47);">
    <h1 style="margin: 0; font-size: 24px; color: #ffffff; letter-spacing: 2px; text-transform: uppercase;">🎬 Movie Quest Canada</h1>
    <p style="margin: 4px 0 0 0; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 3px;">DVD • Blu-ray • VHS • CDs</p>
  </div>

  <!-- MAIN CONTENT -->
  <div style="padding: 22px;">

    <!-- TITLE BLOCK -->
    <div style="color: rgb(232, 232, 232); text-align: center; margin-bottom: 22px; padding-bottom: 18px; border-bottom: 1px solid rgb(34, 34, 34);">
      <h2 style="margin: 0; font-size: 24px; color: #ffffff; line-height: 1.2;">
        <b>${esc(item.title)}</b>${titleNote ? ` <span style="font-size: 18px; color: #999;">(${esc(titleNote)})</span>` : ''}
      </h2>
      <p style="margin: 6px 0 0 0; font-size: 13px; color: #d32f2f; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">${esc(tagline(item, copy))}</p>
    </div>
${copy.gif ? `
    <!-- PHOTOS: this copy, the one you will receive, as a slideshow (tools/make-gif.py) -->
    <div style="margin-bottom: 16px; text-align: center;">
      <img src="${esc(abs(copy.gif))}" alt="${esc(item.title)} — photos of this copy" style="display: block; width: 100%; max-width: 600px; height: auto; margin: 0 auto; border-radius: 6px; border: 1px solid rgb(34, 34, 34);">
    </div>
` : photos.length ? `
    <!-- PHOTOS: this copy, the one you will receive -->
    <div style="margin-bottom: 16px;">
      ${photos.map((src, i) => `<img src="${esc(src)}" alt="${esc(item.title)} photo ${i + 1}" style="display: block; width: 100%; max-width: 656px; height: auto; margin: 0 auto 10px; border-radius: 6px; border: 1px solid rgb(34, 34, 34);">`).join('\n      ')}
    </div>
` : ''}
    <!-- SYNOPSIS -->
    ${box(`${h3('📝 Synopsis')}<p style="margin: 0; line-height: 1.6; font-size: 14px; color: #ccc;">${esc(item.desc || '')}</p>`)}

    <!-- TECHNICAL DETAILS NOTE -->
    <div style="color: rgb(232, 232, 232); background: rgb(17, 17, 17); padding: 12px 16px; border-radius: 6px; margin-bottom: 16px; border-left: 3px solid rgb(15, 52, 96);">
      <p style="margin: 0; line-height: 1.5; font-size: 13px; color: #aaa;">
        <span style="color: #4a90d9; font-weight: bold;">ℹ️ Technical Details:</span> Please check the item box photos for format, region, language, subtitles, and runtime. If you can't find what you need, contact me and I'll check the disc in my player to verify.
      </p>
    </div>
${trivia.length ? `
    <!-- MOVIE MAGAZINE -->
    <div style="color: rgb(232, 232, 232); background: rgb(17, 17, 17); padding: 18px; border-radius: 6px; margin-bottom: 16px; border: 1px solid rgb(34, 34, 34);">
      <h3 style="margin: 0 0 14px 0; color: #d32f2f; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">🎥 Did You Know?</h3>
${trivia.map((t, i) => `      <div style="${i < trivia.length - 1 ? 'margin-bottom: 12px; ' : ''}padding: 12px; background: #0a0a0a; border-radius: 4px; border-left: 3px solid #d32f2f;">
        ${t.heading ? `<span style="color: #fff; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${esc(t.heading)}</span>
        <p style="margin: 6px 0 0 0; line-height: 1.5; font-size: 13px; color: #bbb;">` : `<p style="margin: 0; line-height: 1.5; font-size: 13px; color: #bbb;">`}${esc(t.text)}</p>
      </div>`).join('\n')}
    </div>
` : ''}${credits ? `
    <!-- CAST & CREW -->
    ${box(`${h3('⭐ Cast &amp; Crew')}<p style="margin: 0; line-height: 1.6; font-size: 13px; color: #bbb;">${credits}</p>`)}
` : ''}
    <!-- CONDITION REPORT -->
    <div style="background: rgb(26, 10, 10); padding: 18px; border-radius: 6px; margin-bottom: 16px; border: 1px solid rgb(139, 0, 0);">
      <h3 style="color: rgb(211, 47, 47); margin: 0px 0px 12px; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">🔍 Overall Condition: ${esc(grade)}</h3>
      <p style="color: rgb(153, 102, 102); margin: 0px 0px 14px; font-size: 12px;"><em>Inspected and photographed by hand. What you see is what you get.</em></p>${row('Case', c.case || grade)}${discs.map((d, i) => row(discs.length > 1 ? `Disc ${i + 1}` : 'Disc', d)).join('')}${row('Inserts', c.inserts)}${row('Notes', c.notes)}
    </div>

    <!-- GRADING CHART -->
    <div style="color: rgb(232, 232, 232); background: rgb(17, 17, 17); padding: 18px; border-radius: 6px; margin-bottom: 16px; border: 1px solid rgb(34, 34, 34);">
      <h3 style="margin: 0 0 12px 0; color: #d32f2f; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">📊 Our Grading Chart</h3>
      <p style="margin: 0 0 12px 0; font-size: 12px; color: #666;">We grade every item honestly so you know exactly what to expect.</p>
${GRADES.map(([name, text, bar, ink], i) => `      <div style="${i < GRADES.length - 1 ? 'margin-bottom: 8px; ' : ''}padding: 10px 14px; background: #0a0a0a; border-radius: 4px; border-left: 3px solid ${bar};">
        <span style="color: ${ink}; font-weight: bold; font-size: 13px;">${name}</span>
        <span style="color: #888; font-size: 12px; display: block; margin-top: 2px;">${esc(text)}</span>
      </div>`).join('\n')}
    </div>

    <!-- SHIPPING -->
    ${box(`${h3('📦 Shipping &amp; Returns')}<p style="margin: 0; line-height: 1.6; font-size: 13px; color: #bbb;">Ships within 7 business days, usually sooner. Carefully packaged in a bubble mailer or sturdy cardboard envelope to ensure safe arrival. Returns accepted within 30 days if you're not satisfied. Please contact us first — we're happy to help.</p>`)}

    <!-- ADDITIONAL NOTES -->
    <div style="color: rgb(232, 232, 232); background: rgb(17, 17, 17); padding: 18px; border-radius: 6px; margin-bottom: 16px; border: 1px solid rgb(34, 34, 34);">
      <h3 style="margin: 0 0 12px 0; color: #d32f2f; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">💬 A Few Notes From Us</h3>
${[
    ['Combined Shipping:', "Buying multiple items? We'll automatically reduce your shipping fee and send you a refund for the difference."],
    ['Easy Returns:', "Please keep the cardboard envelope your item arrives in. It's designed to open cleanly without tearing, so if you ever need to return something, you can repackage it easily and send it back at no extra postage cost."],
    ['USA Customers:', 'There are <strong style="color: #fff;">no tariffs or customs fees</strong> on movie discs, DVDs, Blu-rays, or music CDs. On other items such as electronics, hats, and enamel pins, you may be charged a customs fee of approximately 30% of the item\'s value before the carrier releases the package. For small items, we may choose to pay the customs fee in advance — if so, we\'ll let you know.'],
    ['', "Thank you for browsing our store! If you have any questions at all, please send us a message. We're here to help."],
  ].map(([label, text], i, all) => `      <div style="${i < all.length - 1 ? 'margin-bottom: 10px; ' : ''}padding-left: 16px; position: relative;">
        <span style="position: absolute; left: 0; color: #d32f2f; font-size: 12px;">➤</span>
        <span style="color: #bbb; font-size: 13px; line-height: 1.5;">${label ? `<strong style="color: #ddd;">${label}</strong> ` : ''}${text}</span>
      </div>`).join('\n')}
    </div>

    <!-- TRUST BADGES -->
    <div style="color: rgb(232, 232, 232); text-align: center; padding: 14px; background: rgb(15, 15, 15); border-radius: 6px; border: 1px solid rgb(26, 26, 26);">
      <p style="margin: 0; font-size: 12px; color: #555; text-transform: uppercase; letter-spacing: 1px;">✓ Inspected &amp; Tested &nbsp;|&nbsp; ✓ Actual Photos &nbsp;|&nbsp; ✓ Fast Shipping &nbsp;|&nbsp; ✓ Top Rated Seller</p>
    </div>

  </div>

  <!-- FOOTER -->
  <div style="color: rgb(232, 232, 232); background: rgb(5, 5, 5); padding: 14px; text-align: center; border-top: 1px solid rgb(26, 26, 26);">
    <p style="margin: 0; font-size: 11px; color: #444; text-transform: uppercase; letter-spacing: 2px;">Movie Quest Canada — Quality Media, Trusted Seller</p>
  </div>

</div>`;
}

// The page Movie opens to copy a listing: the listing as eBay will show it,
// and one button that puts its HTML on the clipboard.
function listingPage(item, copy, html) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex">
<title>eBay listing — ${esc(item.title)} — Movie Quest Canada</title>
<style>
  body{margin:0;background:#2a2a2a;color:#eee;font-family:"Segoe UI",Tahoma,sans-serif;}
  .bar{position:sticky;top:0;z-index:2;background:#111;border-bottom:2px solid #d32f2f;padding:12px 16px;display:flex;gap:12px;align-items:center;flex-wrap:wrap;}
  .bar b{font-size:15px;} .bar span{color:#999;font-size:13px;}
  .bar button{margin-left:auto;background:#d32f2f;color:#fff;border:0;border-radius:4px;padding:10px 18px;font-weight:700;letter-spacing:1px;cursor:pointer;font-size:14px;}
  .bar a{color:#9ab;font-size:13px;}
  .wrap{padding:24px 16px;}
  textarea{position:absolute;left:-9999px;}
</style>
</head>
<body>
<div class="bar">
  <b>${esc(item.title)}</b><span>${esc(copy.id)}${copy.sold ? ' · SOLD' : ''}</span>
  <a href="../movies/${encodeURIComponent(item.id)}/">website page</a>
  <button id="copy" type="button">COPY HTML</button>
</div>
<div class="wrap">${html}</div>
<textarea id="src" readonly>${esc(html)}</textarea>
<script>
  document.getElementById('copy').addEventListener('click', async () => {
    const text = document.getElementById('src').value;
    const btn = document.getElementById('copy');
    try { await navigator.clipboard.writeText(text); }
    catch { const t = document.getElementById('src'); t.select(); document.execCommand('copy'); }
    btn.textContent = 'COPIED ✓';
    setTimeout(() => { btn.textContent = 'COPY HTML'; }, 2000);
  });
</script>
</body>
</html>
`;
}

// ── WRITE IT ALL ───────────────────────────────────────────────────────────
function writeIfChanged(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  if (fs.existsSync(file) && fs.readFileSync(file, 'utf8') === text) return false;
  fs.writeFileSync(file, text);
  return true;
}

export function build() {
  let changed = 0;
  const ids = new Set();
  const listings = [];
  for (const item of items) {
    if (!item.id || ids.has(item.id)) throw new Error(`data.json: missing or repeated id "${item.id}"`);
    ids.add(item.id);
    changed += writeIfChanged(path.join(ROOT, 'movies', item.id, 'index.html'), moviePage(item));
    for (const copy of item.copies || []) {
      if (!copy.id) throw new Error(`data.json: a copy of "${item.id}" has no id`);
      const html = ebayListing(item, copy);
      changed += writeIfChanged(path.join(ROOT, 'listings', `${copy.id}.html`), listingPage(item, copy, html));
      listings.push({ item, copy });
    }
  }
  listings.sort((a, b) => String(b.copy.added || '').localeCompare(String(a.copy.added || '')));
  changed += writeIfChanged(path.join(ROOT, 'listings', 'index.html'), `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex"><title>eBay listings — Movie Quest Canada</title>
<style>body{margin:0;padding:24px 16px;background:#111;color:#eee;font-family:"Segoe UI",Tahoma,sans-serif;}
h1{color:#d32f2f;letter-spacing:2px;font-size:22px;} a{color:#fff;} li{margin:8px 0;} span{color:#888;font-size:13px;}</style></head>
<body><h1>eBay LISTINGS</h1><ul>
${listings.map(({ item, copy }) => `<li><a href="${encodeURIComponent(copy.id)}.html">${esc(item.title)}</a> <span>${esc([copy.format || item.format, copy.edition, copy.added, copy.sold ? 'SOLD' : ''].filter(Boolean).join(' · '))}</span></li>`).join('\n')}
</ul></body></html>
`);
  changed += writeIfChanged(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE}/</loc></url>
${items.map(i => `  <url><loc>${SITE}/movies/${encodeURIComponent(i.id)}/</loc></url>`).join('\n')}
</urlset>
`);
  return { items: items.length, listings: listings.length, changed };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const r = build();
  console.log(`built ${r.items} movie pages, ${r.listings} eBay listings (${r.changed} files changed)`);
}
