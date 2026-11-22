/* Ukraine and Russia: Escalation: the projector slideshow (owner, 18 November 2026: "like an actual slideshow, with the
   sounds of the slide moving"). The narrator's clips play one after another (welcome, four introduction slides, fifteen
   chapters); each slide drops onto the screen when the narrator starts the first line written under it in the script (from
   the caption timings of the recordings). Painted maps pan and zoom slowly while they are on the screen, with the borders of
   1991–2014, place names and, for the gas chapter, the pipeline routes drawn on top. The projector's fan, shutter, clunk
   and tray are made with the Web Audio API (no sound files). */
(() => {
  'use strict';
  const S = window.UKRESC_SCENARIO, BORD = window.UKRESC_BORDERS || {}, $ = id => document.getElementById(id);
  const IMG = S.imageBase, AUD = S.audioBase;
  const SENT = /[^.!?]+[.!?]+["”’)]*|[^.!?]+$/g;
  const sentences = t => (t.match(SENT) || [t]).map(x => x.trim()).filter(Boolean);
  const ls = { get(k) { try { return localStorage.getItem('ukresc.' + k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem('ukresc.' + k, v); } catch (e) {} } };

  // ---------- the clips: welcome, intro 1-4, chapters 1-15 ----------
  const clips = [];
  const titleSlide = S.intro[0].slides[0];
  clips.push({ id: 'welcome', label: 'Welcome', lines: [{ text: S.welcome, tag: '', cite: '' }], slides: [Object.assign({}, titleSlide, { line: 0 })], text: S.welcome, kind: 'welcome' });
  S.intro.forEach((it, i) => clips.push({ id: 'intro-' + (i + 1), label: 'Introduction ' + (i + 1) + ': ' + cap(it.title), title: cap(it.title), lines: it.lines, slides: it.slides, kind: 'intro', n: i + 1 }));
  S.events.forEach((e, i) => clips.push({ id: 'event-' + (i + 1), label: (e.debrief ? '' : (i + 1) + '. ') + e.title, title: e.title, part: e.part, lines: e.lines, slides: e.slides, kind: e.debrief ? 'debrief' : 'event', n: i + 1 }));
  function cap(t) { return t === t.toUpperCase() ? t.charAt(0) + t.slice(1).toLowerCase() : t; }
  clips.forEach(c => {   // sentence list and, for each, its line (for the caption's tag); each slide's first sentence
    c.sent = []; c.lines.forEach((l, li) => sentences(l.text).forEach(s => c.sent.push({ s, li })));
    c.slides.forEach(sl => { sl.sent = c.sent.findIndex(x => x.li >= sl.line); if (sl.sent < 0) sl.sent = c.sent.length - 1; });
  });
  const allSlides = []; clips.forEach((c, ci) => c.slides.forEach((s, si) => { if (!(c.kind === 'intro' && c.n === 1 && si === 0 && ci !== 0)) allSlides.push(s); }));

  // ---------- state ----------
  let voiceId = (S.voices[0] || {}).id;
  { const pool = S.voices.filter(v => v.id !== 'computer'); voiceId = pool[Math.floor(Math.random() * pool.length)].id; }   // a different narrator each visit, as on the other pages
  const timingsCache = {};
  let ci = 0, audio = null, playing = false, starts = [], curSlide = -1, fallback = null, clipDur = 0, gapTimer = null;
  let cc = ls.get('cc') !== '0', snd = ls.get('snd') !== '0';

  // ---------- the projector's sounds (Web Audio) ----------
  let AC = null, fanGain = null;
  function audioInit() {
    if (AC) return; const C = window.AudioContext || window.webkitAudioContext; if (!C) return; AC = new C();
    const len = AC.sampleRate * 2, buf = AC.createBuffer(1, len, AC.sampleRate), d = buf.getChannelData(0);
    let b = 0; for (let i = 0; i < len; i++) { b = .985 * b + .015 * (Math.random() * 2 - 1); d[i] = b * 6; }   // soft brown noise
    const src = AC.createBufferSource(); src.buffer = buf; src.loop = true;
    const bp = AC.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 260; bp.Q.value = .6;
    const hum = AC.createOscillator(); hum.frequency.value = 100; const hg = AC.createGain(); hg.gain.value = .12;
    fanGain = AC.createGain(); fanGain.gain.value = 0;
    src.connect(bp).connect(fanGain); hum.connect(hg).connect(fanGain); fanGain.connect(AC.destination); src.start(); hum.start();
    AC._noise = buf;
  }
  function fan(on) { if (!AC || !fanGain) return; fanGain.gain.setTargetAtTime(on && snd ? .028 : 0, AC.currentTime, .4); }
  function burst(t, dur, f, type, gain) {
    const s = AC.createBufferSource(); s.buffer = AC._noise; const fl = AC.createBiquadFilter(); fl.type = type; fl.frequency.value = f;
    const g = AC.createGain(); g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(.0005, t + dur);
    s.connect(fl).connect(g).connect(AC.destination); s.start(t, Math.random()); s.stop(t + dur + .02);
  }
  function thump(t, f, dur, gain) {
    const o = AC.createOscillator(); o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(f * .55, t + dur);
    const g = AC.createGain(); g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(.0005, t + dur);
    o.connect(g).connect(AC.destination); o.start(t); o.stop(t + dur + .02);
  }
  function whirr(t, dur) {
    const o = AC.createOscillator(); o.type = 'sawtooth'; o.frequency.setValueAtTime(95, t); o.frequency.linearRampToValueAtTime(150, t + dur * .5); o.frequency.linearRampToValueAtTime(90, t + dur);
    const lp = AC.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 650;
    const g = AC.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.035, t + .05); g.gain.linearRampToValueAtTime(0, t + dur);
    o.connect(lp).connect(g).connect(AC.destination); o.start(t); o.stop(t + dur + .02);
  }
  function changeSound() {   // the shutter click, the tray turning, the clunk of the slide dropping in
    if (!AC || !snd) return; const t = AC.currentTime + .01;
    burst(t, .025, 2600, 'highpass', .22); thump(t + .005, 180, .05, .12);
    whirr(t + .06, .26);
    burst(t + .3, .06, 900, 'lowpass', .5); thump(t + .3, 85, .16, .45); burst(t + .33, .02, 3200, 'highpass', .12);
  }

  // ---------- dust on the lens ----------
  const dust = $('dust'), dctx = dust.getContext('2d'); let specks = [];
  function dustSize() { dust.width = dust.clientWidth; dust.height = dust.clientHeight; specks = Array.from({ length: 26 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.6 + .3, vx: (Math.random() - .5) * .0004, vy: (Math.random() - .5) * .0003, a: Math.random() * .35 + .1, hair: Math.random() < .12 })); }
  function dustDraw() {
    const W = dust.width, H = dust.height; dctx.clearRect(0, 0, W, H); if (!document.body.classList.contains('on')) return;
    specks.forEach(p => {
      p.x = (p.x + p.vx + 1) % 1; p.y = (p.y + p.vy + 1) % 1; dctx.globalAlpha = p.a * (.7 + .3 * Math.random());
      dctx.fillStyle = '#2a2520'; dctx.strokeStyle = '#2a2520';
      if (p.hair) { dctx.lineWidth = .7; dctx.beginPath(); dctx.moveTo(p.x * W, p.y * H); dctx.quadraticCurveTo(p.x * W + 9, p.y * H - 6, p.x * W + 16, p.y * H + 3); dctx.stroke(); }
      else { dctx.beginPath(); dctx.arc(p.x * W, p.y * H, p.r, 0, 7); dctx.fill(); }
    });
    dctx.globalAlpha = 1;
  }

  // ---------- drawing one slide ----------
  const slideEl = $('slide'), images = {};
  function img(file) { if (!images[file]) { const im = new Image(); im.src = file; images[file] = im; } return images[file]; }
  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]); }
  let mapState = null;
  function showSlide(sl, clip) {
    mapState = null; slideEl.className = ''; slideEl.innerHTML = '';
    if (sl.kind === 'title') {
      slideEl.innerHTML = `<img class="full" src="${IMG}art/${sl.file}" alt=""><div class="titleSlide"><h1>${esc(sl.head)}</h1><p>${esc(sl.sub)}</p></div>`;
    } else if (sl.kind === 'art') {
      slideEl.innerHTML = `<img class="full" src="${IMG}art/${sl.file}" alt="${esc(sl.caption)}">` + (sl.stamp ? `<div class="stamp">${sl.stamp.map(esc).join('<br>')}</div>` : '') +
        `<div class="label">${esc(sl.caption || '')}<small>Painting made for this page with ChatGPT (AI-generated): an illustration, not a photograph</small></div>`;
    } else if (sl.kind === 'photo') {
      const im = img(IMG + 'photos/' + sl.file);
      const good = () => im.complete && im.naturalWidth > 0;
      const draw = () => {
        if (good()) { slideEl.classList.add('photoBg'); slideEl.innerHTML = `<img class="photo" src="${im.src}" alt="${esc(sl.caption)}"><div class="label">${esc(sl.caption)}<small>Photo: ${esc(sl.credit)} · Wikimedia Commons</small></div>`; }
        else slideEl.innerHTML = cardHTML({ head: sl.caption, sub: '', small: 'Photograph: ' + sl.credit + ' · Wikimedia Commons, “' + sl.commons + '” (not yet loaded)' });
      };
      draw(); if (!good()) im.onload = () => { if (current() === sl) draw(); };
    } else if (sl.kind === 'card') {
      slideEl.innerHTML = cardHTML(sl);
    } else if (sl.kind === 'map') {
      const cv = document.createElement('canvas'); slideEl.appendChild(cv);
      const lab = document.createElement('div'); lab.className = 'label';
      lab.innerHTML = esc(sl.title || '') + '<small>Painted map made for this page with ChatGPT (AI-generated) from real elevation data' + (sl.map === 'kyiv' ? ' and OpenStreetMap (© OpenStreetMap contributors)' : '') + (sl.outline.length ? '; borders of 1991–2014 from Natural Earth' : '') + '</small>';
      slideEl.appendChild(lab);
      mapState = { sl, cv, m: S.maps[sl.map], im: img(IMG + 'maps/' + S.maps[sl.map].file) };
      drawMap(0);
    }
  }
  function cardHTML(c) {
    let h = `<div class="card"><h2>${esc(c.head)}</h2>` + (c.sub ? `<div class="sub">${esc(c.sub)}</div>` : '') + '<hr>';
    if (c.quote) h += c.quote.map(q => `<blockquote>${esc(q)}</blockquote>`).join('');
    if (c.rows && c.rows.length) h += '<ul>' + c.rows.map(r => `<li>${esc(r)}</li>`).join('') + '</ul>';
    if (c.cols) h += '<div class="cols">' + c.cols.map(col => `<div><h3 class="${col.side || ''}">${esc(col.head)}</h3><ul>${col.rows.map(r => `<li>${esc(r)}</li>`).join('')}</ul></div>`).join('') + '</div>';
    if (c.bars) { const mx = 100; h += '<div class="bars">' + c.bars.map(([n, v]) => `<div class="bar"><span>${esc(n)}</span><i style="width:${v / mx * 100}%"></i><b>${v}%</b></div>`).join('') + '</div>'; }
    if (c.small) h += `<div class="small">${esc(c.small)}</div>`;
    return h + '</div>';
  }
  const PIPES = [   // schematic routes only (lat, lon): the Brotherhood and Soyuz lines to Uzhhorod and on to central Europe, the line to Poland, the Trans-Balkan line
    [[51.6, 46.5], [51.4, 40.0], [51.2, 35.3], [50.4, 31.2], [49.6, 26.0], [48.62, 22.29], [48.5, 19.5], [48.31, 16.88], [49.2, 14.2], [50.3, 12.1], [50.9, 9.6]],
    [[50.9, 46.5], [49.6, 42.0], [49.0, 39.9], [49.07, 33.42], [49.2, 28.5], [48.62, 22.29]],
    [[49.6, 26.0], [49.6, 23.0], [50.1, 20.5], [51.0, 18.5]],
    [[49.2, 28.5], [47.9, 29.9], [46.6, 29.6], [45.35, 28.84], [44.4, 28.3], [43.2, 27.9], [42.1, 27.6], [41.1, 28.9]],
  ];
  function drawMap(p) {
    const st = mapState; if (!st) return; const { sl, cv, m, im } = st;
    const W = cv.clientWidth * devicePixelRatio, H = cv.clientHeight * devicePixelRatio; if (!W) return;
    if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
    const g = cv.getContext('2d'); g.fillStyle = '#20303a'; g.fillRect(0, 0, W, H);
    if (!(im.complete && im.naturalWidth)) { im.onload = () => drawMap(st.p || 0); return; }
    st.p = p; const e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    const lerp = (a, b) => a + (b - a) * e;
    const lat = lerp(sl.from[0], sl.to[0]), lon = lerp(sl.from[1], sl.to[1]), z = lerp(sl.from[2], sl.to[2]);
    const IW = im.naturalWidth, IH = im.naturalHeight;
    const toPx = (la, lo) => [(lo - m.lon0) / (m.lon1 - m.lon0) * IW, (m.lat1 - la) / (m.lat1 - m.lat0) * IH];
    const cover = Math.max(W / IW, H / IH), s = cover * z;
    let [cx, cy] = toPx(lat, lon); const hw = W / s / 2, hh = H / s / 2;
    cx = Math.min(Math.max(cx, hw), IW - hw); cy = Math.min(Math.max(cy, hh), IH - hh);
    const T = (x, y) => [(x - cx) * s + W / 2, (y - cy) * s + H / 2];
    g.drawImage(im, cx - hw, cy - hh, hw * 2, hh * 2, 0, 0, W, H);
    const k = W / 1200;   // line widths and type scale with the screen
    // borders of 1991-2014
    sl.outline.forEach(name => {
      const col = name === 'Ukraine' ? [208, 69, 58] : name === 'Russia' ? [59, 111, 208] : [245, 240, 225];
      (BORD[name] || []).forEach(ring => {
        g.beginPath(); ring.forEach(([la, lo], i) => { const [x, y] = T(...toPx(la, lo)); i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.closePath();
        g.fillStyle = `rgba(${col},${name === 'Georgia' ? .05 : .13})`; g.fill();
        g.lineJoin = 'round'; g.strokeStyle = `rgba(${col},.35)`; g.lineWidth = 7 * k; g.stroke();
        g.strokeStyle = `rgba(${col},.95)`; g.lineWidth = 2.2 * k; g.stroke();
      });
    });
    if (sl.extra === 'pipes') {   // the gas flowing west
      g.save(); g.lineCap = 'round'; g.lineJoin = 'round';
      PIPES.forEach(r => { g.beginPath(); r.forEach(([la, lo], i) => { const [x, y] = T(...toPx(la, lo)); i ? g.lineTo(x, y) : g.moveTo(x, y); });
        g.setLineDash([]); g.strokeStyle = 'rgba(30,20,8,.55)'; g.lineWidth = 7 * k; g.stroke();
        g.setLineDash([14 * k, 10 * k]); g.lineDashOffset = -performance.now() / 40 * k; g.strokeStyle = '#ffb547'; g.lineWidth = 3.4 * k; g.stroke(); });
      g.restore(); label(g, W - 18 * k, H - 70 * k, 'pipelines: schematic routes', k, 'note', 'right');
    }
    sl.marks.forEach(([la, lo, t, kind]) => { const [x, y] = T(...toPx(la, lo)); if (x < -50 || y < -50 || x > W + 50 || y > H + 50) return;
      if (!kind) { g.beginPath(); g.arc(x, y, 5 * k, 0, 7); g.fillStyle = '#fff6dc'; g.fill(); g.lineWidth = 2 * k; g.strokeStyle = '#1b1712'; g.stroke(); label(g, x + 10 * k, y - 10 * k, t, k); }
      else label(g, x, y, t, k, kind, 'center'); });
  }
  function label(g, x, y, t, k, kind, align) {
    const size = (kind === 'area' ? 30 : kind === 'note' ? 19 : 25) * k;
    g.font = `${kind === 'area' ? 'italic ' : ''}${size}px 'Special Elite','Courier New',monospace`; g.textAlign = align || 'left'; g.textBaseline = 'middle';
    if (kind === 'area') { g.save(); g.letterSpacing = (4 * k) + 'px'; }
    g.lineWidth = 5 * k; g.strokeStyle = kind === 'water' ? 'rgba(10,30,50,.75)' : 'rgba(18,14,10,.85)'; g.strokeText(t, x, y);
    g.fillStyle = kind === 'water' ? '#cfe6ff' : kind === 'note' ? '#efe6c8' : kind === 'area' ? '#fff2cf' : '#ffffff'; g.fillText(t, x, y);
    if (kind === 'area') g.restore();
  }
  function current() { const c = clips[ci]; return c && c.slides[curSlide]; }

  // ---------- slide changes ----------
  let changing = false;
  function goSlide(k, instant) {
    const c = clips[ci]; if (k === curSlide || !c.slides[k]) return; curSlide = k;
    renderTray();
    if (instant) { showSlide(c.slides[k], c); return; }
    changeSound(); changing = true; $('shutter').classList.add('shut');
    setTimeout(() => { showSlide(c.slides[k], c); slideEl.classList.remove('drop'); void slideEl.offsetWidth; slideEl.classList.add('drop'); $('shutter').classList.remove('shut'); changing = false; }, 290);
    const nxt = c.slides[k + 1] || (clips[ci + 1] && clips[ci + 1].slides[0]); if (nxt) preload(nxt);
  }
  function preload(sl) { if (sl.kind === 'map') img(IMG + 'maps/' + S.maps[sl.map].file); else if (sl.kind === 'photo') img(IMG + 'photos/' + sl.file); else if (sl.file) img(IMG + 'art/' + sl.file); }
  function thumbOf(sl) {
    if (sl.kind === 'map') return IMG + 'maps/' + S.maps[sl.map].file;
    if (sl.kind === 'photo') return IMG + 'photos/' + sl.file;
    if (sl.file) return IMG + 'art/' + sl.file; return '';
  }
  function renderTray() {
    const c = clips[ci];
    $('tray').innerHTML = c.slides.map((sl, i) => `<div class="mount${i === curSlide ? ' cur' : ''}" data-i="${i}" title="Slide ${i + 1}"><div class="win" style="${thumbOf(sl) ? `background-image:url('${thumbOf(sl)}')` : 'background:#1c3355'}"></div><img src="${IMG}art/slide-mount.png" alt=""><span>${ci}·${i + 1}</span></div>`).join('');
    $('where').textContent = (c.kind === 'event' ? `Chapter ${c.n} of 14 · ${c.part} · ` : c.kind === 'debrief' ? 'Looking back · ' : c.kind === 'intro' ? 'Introduction · ' : '') + (c.title || 'Welcome') + ` · slide ${curSlide + 1} of ${c.slides.length}`;
  }
  $('tray').addEventListener('click', e => { const m = e.target.closest('.mount'); if (!m) return; const i = +m.dataset.i, c = clips[ci], t = starts[i];
    if (audio && isFinite(t)) { audio.currentTime = t + .01; if (!playing) play(); }
    else if (fallback && isFinite(t)) { fallback.off = t + .01; fallback.t0 = performance.now(); if (!playing) play(); }
    else goSlide(i); });

  // ---------- the clips ----------
  function loadTimings(v) {
    if (timingsCache[v]) return Promise.resolve(timingsCache[v]);
    return fetch(AUD + v + '/timings.json').then(r => r.ok ? r.json() : {}).catch(() => ({})).then(j => (timingsCache[v] = j));
  }
  let clipTok = 0;
  function startClip(i, autoplay) {
    clearTimeout(gapTimer); stopAudio(); ci = i; curSlide = -1; const c = clips[ci]; $('chapSel').value = ci; const tok = ++clipTok;
    const tag = $('chapterTag'); tag.textContent = c.kind === 'event' ? `${c.part.toUpperCase()} · CHAPTER ${c.n}: ${c.title}` : c.kind === 'debrief' ? 'LOOKING BACK' : c.kind === 'intro' ? 'INTRODUCTION' : '';
    tag.classList.toggle('show', !!tag.textContent); setTimeout(() => tag.classList.remove('show'), 4200);
    loadTimings(voiceId).then(tm => {
      if (tok !== clipTok) return;   // another chapter was chosen meanwhile
      const sentT = tm[c.id], a = new Audio(AUD + voiceId + '/' + c.id + '.mp3'); a.preload = 'auto'; audio = a;
      const fromText = d => c.slides.map(sl => sl.sent <= 0 ? 0 : (sentT && sentT[sl.sent] != null ? sentT[sl.sent] : d * charsBefore(c, sl.sent) / chars(c)));
      clipDur = estDur(c); starts = fromText(clipDur);
      a.addEventListener('loadedmetadata', () => { if (audio !== a) return; clipDur = a.duration || estDur(c); starts = fromText(clipDur); });
      a.addEventListener('ended', () => { if (audio !== a) return; playing = false; fan(true); gapTimer = setTimeout(() => { if (ci + 1 < clips.length) startClip(ci + 1, true); else finish(); }, 1600); });
      a.addEventListener('error', () => { if (audio !== a || tok !== clipTok) return; audio = null; fallback = { t0: performance.now(), off: 0, dur: estDur(c) }; clipDur = fallback.dur;
        starts = c.slides.map(sl => sl.sent <= 0 ? 0 : clipDur * charsBefore(c, sl.sent) / chars(c)); if (autoplay) play(); });
      c.sentT = sentT; fallback = null; goSlide(0, false);
      if (autoplay) play();
    });
  }
  const chars = c => c.sent.reduce((a, x) => a + x.s.length, 0) || 1;
  const charsBefore = (c, n) => c.sent.slice(0, n).reduce((a, x) => a + x.s.length, 0);
  const estDur = c => 2 + chars(c) / 14.5;
  function stopAudio() { if (audio) { audio.pause(); audio.src = ''; } audio = null; fallback = null; playing = false; }
  function now() { if (audio) return audio.currentTime; if (fallback) return fallback.off + (playing ? (performance.now() - fallback.t0) / 1000 : 0); return 0; }
  function play() {
    audioInit(); if (AC && AC.state === 'suspended') AC.resume(); fan(true); playing = true; $('playBtn').textContent = '⏸';
    if (audio) audio.play().catch(() => { playing = false; $('playBtn').textContent = '▶'; });
    else if (fallback) fallback.t0 = performance.now();
  }
  function pause() { if (fallback && playing) fallback.off = now(); playing = false; if (audio) audio.pause(); $('playBtn').textContent = '▶'; fan(false); }
  function finish() {
    fan(false); playing = false; $('playBtn').textContent = '▶';
    const P = $('endPanel');
    P.innerHTML = `<h1>The end of the slideshow</h1><p>What happened next is told on the following pages: Crimea, 2014, and then the war in the Donbas.</p>
      <p><button class="go" id="againBtn">↺ Watch again</button> <a class="btn" href="../index.html">◀ Battles of History</a></p>
      <h2>Sources</h2><ul>${S.sources.map(([a, b]) => `<li><b>${esc(a)}</b> — ${esc(b)}</li>`).join('')}</ul>
      <h2>Pictures and credits</h2><ul>${S.credits.map(x => `<li>${esc(x)}</li>`).join('')}${allSlides.filter(s => s.kind === 'photo').map(s => `<li>${esc(s.caption)}: ${esc(s.credit)} (Wikimedia Commons, “${esc(s.commons)}”)</li>`).join('')}</ul>`;
    $('end').style.display = 'flex';
    $('againBtn').onclick = () => { $('end').style.display = 'none'; startClip(0, true); };
  }

  // ---------- the loop: slide by time, captions, map motion, dust ----------
  function tick() {
    const c = clips[ci];
    if (c && (audio || fallback)) {
      const t = now(); let k = 0; starts.forEach((s, i) => { if (t >= s - .05) k = i; });
      if (k !== curSlide && !changing) goSlide(k);
      if (fallback && playing && t >= fallback.dur) { playing = false; fallback = null; gapTimer = setTimeout(() => { if (ci + 1 < clips.length) startClip(ci + 1, true); else finish(); }, 1600); }
      // caption: the sentence being spoken
      let si = 0; const st = c.sentT;
      if (st && st.length === c.sent.length) st.forEach((s, i) => { if (t >= s - .05) si = i; });
      else { const tot = chars(c), d = clipDur || estDur(c); let acc = 0; for (let i = 0; i < c.sent.length; i++) { if (t >= d * acc / tot) si = i; acc += c.sent[i].s.length; } }
      const sx = c.sent[si];
      if (sx) { const ln = c.lines[sx.li]; const html = esc(sx.s) + (ln.tag ? `<span class="tag">${esc(ln.tag)}</span>` : '') + (ln.cite ? `<span class="cite">${esc(ln.cite)}</span>` : '');
        if ($('caption')._h !== html) { $('caption').innerHTML = html; $('caption')._h = html; } }
      const d = clipDur || 1; $('prog').firstChild.style.width = Math.min(100, t / d * 100) + '%';
      if (mapState && curSlide >= 0) { const s0 = starts[curSlide] || 0, s1 = starts[curSlide + 1] != null ? starts[curSlide + 1] : d; drawMap(Math.min(1, Math.max(0, (t - s0) / Math.max(1, s1 - s0)))); }
    } else if (mapState) drawMap(mapState.p || 0);
    dustDraw(); requestAnimationFrame(tick);
  }

  // ---------- controls ----------
  $('chapSel').innerHTML = clips.map((c, i) => `<option value="${i}">${esc(c.label)}</option>`).join('');
  $('chapSel').onchange = e => startClip(+e.target.value, true);
  $('voiceSel').innerHTML = S.voices.map(v => `<option value="${v.id}"${v.id === voiceId ? ' selected' : ''}>${esc(v.name)}</option>`).join('');
  $('voiceSel').onchange = e => { voiceId = e.target.value; startClip(ci, true); };
  $('playBtn').onclick = () => playing ? pause() : (audio || fallback ? play() : startClip(ci, true));
  $('prevBtn').onclick = () => startClip(Math.max(0, now() > 3 ? ci : ci - 1), true);
  $('nextBtn').onclick = () => { if (ci + 1 < clips.length) startClip(ci + 1, true); else finish(); };
  const setCC = () => { document.body.classList.toggle('nocc', !cc); $('ccBtn').classList.toggle('off', !cc); };
  const setSnd = () => { $('sndBtn').classList.toggle('off', !snd); $('sndBtn').textContent = (snd ? '🔊' : '🔇') + ' Projector'; fan(playing); };
  $('ccBtn').onclick = () => { cc = !cc; ls.set('cc', cc ? '1' : '0'); setCC(); };
  $('sndBtn').onclick = () => { snd = !snd; ls.set('snd', snd ? '1' : '0'); setSnd(); };
  setCC(); setSnd();
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'SELECT') return;
    if (e.code === 'Space') { e.preventDefault(); $('playBtn').click(); }
    else if (e.key === 'ArrowRight') $('nextBtn').click(); else if (e.key === 'ArrowLeft') $('prevBtn').click();
  });
  $('goBtn').onclick = () => {
    $('start').style.display = 'none'; audioInit(); document.body.classList.add('on');
    if (AC && snd) { const t = AC.currentTime; thump(t, 70, .3, .5); burst(t, .08, 1200, 'lowpass', .4); }   // the switch
    const q = new URLSearchParams(location.search), n = parseInt(q.get('chapter'), 10), ev = (q.get('ev') || '').toLowerCase();   // links from the home page's chapter cards
    let first = 0; if (ev) { const k = clips.findIndex(c => (c.title || '').toLowerCase() === ev); if (k >= 0) first = k; } else if (n > 0) first = Math.min(clips.length - 1, 4 + n);
    setTimeout(() => startClip(first, true), 700);
  };
  window.addEventListener('resize', () => { dustSize(); if (mapState) drawMap(mapState.p || 0); });
  dustSize(); renderTray(); goSlide(0, true); tick();
  window.UKRESC_SHOW = { clips, startClip, state: () => ({ ci, curSlide, playing, voiceId, starts }) };   // for the tests
})();
