#!/usr/bin/env python3
"""Closed-caption timings from the recordings themselves.

    python3 battlesofhistory/tools/caption-timings.py [battle ...]

For every recorded clip (intro slides and reenactment chapters, every voice, every battle) it finds the pauses the
recorder leaves between sentences and works out when each caption sentence starts. It writes
<battle>/audio/<voice>/timings.json  ({ clip: [start of each caption sentence, in seconds] }), which desktop.js uses to
switch the caption exactly when the narrator starts the next sentence, and CAPTION-CHECK.md, which lists clips that do not
fit their text (usually because the text was changed after recording): those are the ones to re-record.
Needs ffmpeg and node."""
import json, os, re, subprocess, sys, statistics

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
BATTLES = sys.argv[1:] or sorted(d for d in os.listdir(ROOT) if os.path.isfile(os.path.join(ROOT, d, 'scenario.js')) and os.path.isdir(os.path.join(ROOT, d, 'audio')))
SENT = re.compile(r'[^.!?。！？]+[.!?。！？]+["”’)」]*|[^.!?。！？]+$')   # the same rule as the caption code in desktop.js
def sentences(t): return [x.strip() for x in (SENT.findall(t) or [t]) if x.strip()]

DUMP = r"""
const S = require(process.argv[1] + '/../tools/load-scenario.js')(process.argv[1], process.argv[2]), out = {};   // the page's text, in the voice's language
let ic = 0; (S.intro || []).forEach((sl, i) => { if (sl.extra) return; ic++; if (sl.choice) return; out['intro-' + ic] = { pre: [sl.title + '.'], text: (sl.lines || []).map(l => l.text).join(' ') }; });
if (S.parts) S.parts.forEach(p => p.events.forEach((e, i) => { out['event-' + p.id + '-' + (i + 1)] = { pre: [], text: e.text }; if (S.parts.length === 1) out['event-' + (i + 1)] = { pre: [], text: e.text }; }));
else (S.events || []).forEach((e, i) => { out['event-' + (e.clipNo || i + 1)] = { pre: [], text: e.text }; });
if (S.campaign) S.campaign.events.forEach((e, i) => { out[e.clipNo ? 'event-' + e.clipNo : 'event-campaign-' + (i + 1)] = { pre: [], text: e.text }; });   // Waterloo's opening part, on its own map
if (S.welcome) out['welcome'] = { pre: [], text: S.welcome };
process.stdout.write(JSON.stringify(out));
"""

def probe(path):
    r = subprocess.run(['ffmpeg', '-nostdin', '-i', path, '-af', 'silencedetect=noise=-38dB:d=0.18', '-f', 'null', '-'], capture_output=True, text=True).stderr
    dur = float(re.search(r'Duration: (\d+):(\d+):([\d.]+)', r).groups()[2]) + 60 * float(re.search(r'Duration: (\d+):(\d+)', r).group(2))
    sil = [(float(a), float(b)) for a, b in re.findall(r'silence_start: ([\d.]+).*?silence_end: ([\d.]+)', r, re.S)]
    return dur, sil

def fit(spoken, dur, sil):
    """Start time of each spoken sentence. Boundaries are first estimated from sentence lengths between the start and end
    of speech, then moved onto the nearest real pause (the start of speech after it); boundaries with no pause near them
    (e.g. a full stop after an abbreviation) keep the estimate. Returns (starts, how many boundaries found a pause)."""
    lead = sil[0][1] if sil and sil[0][0] < .05 else 0.0
    tail = sil[-1][0] if sil and sil[-1][1] > dur - .1 else dur
    pauses = [s for s in sil if s[0] > lead + .2 and s[1] < tail - .05]
    L = [len(x) for x in spoken]; tot = sum(L) or 1; span = max(.5, tail - lead)
    starts, acc, found, last = [lead], 0, 0, lead
    for i in range(1, len(spoken)):
        acc += L[i - 1]; est = lead + span * acc / tot; win = max(1.2, span * L[i - 1] / tot * .45)
        cands = [p for p in pauses if p[1] > last + .3 and abs(p[1] - est) < win]
        if cands:
            best = max(cands, key=lambda p: (p[1] - p[0]) - abs(p[1] - est) / win * .25); t = best[1]; found += 1
        else: t = max(est, last + .3)
        starts.append(round(t, 2)); last = t
    return starts, found, span, tot

report = ['# Closed-caption check', '', 'Made by `tools/caption-timings.py`. Each row is a recorded clip that does not fit its text well:',
          'its length is far from what the text predicts, or the narrator\'s pauses do not line up with the sentences.',
          'Usually the text was changed after the clip was recorded. Re-record the clips listed here (all voices shown).', '']
flagged_total = 0
for b in BATTLES:
    CL = {}
    def clips_for(lang):   # a voice folder named xx-something (fr-tom) reads the battle's lang-xx.js text
        if lang not in CL: CL[lang] = json.loads(subprocess.check_output(['node', '-e', DUMP, os.path.join(ROOT, b), lang]))
        return CL[lang]
    adir = os.path.join(ROOT, b, 'audio'); rows = []
    for v in sorted(d for d in os.listdir(adir) if os.path.isdir(os.path.join(adir, d))):
        m = re.match(r'([a-z]{2})(?:-|$)', v); lang = m.group(1) if m and os.path.exists(os.path.join(ROOT, b, 'lang-%s.js' % m.group(1))) else 'en'
        clips = clips_for(lang)
        timings, rates, info = {}, [], []
        for name, c in clips.items():
            f = os.path.join(adir, v, name + '.mp3')
            if not os.path.exists(f): continue
            disp = sentences(c['text']); spoken = c['pre'] + disp
            dur, sil = probe(f); starts, found, span, chars = fit(spoken, dur, sil)
            timings[name] = starts[len(c['pre']):]
            rates.append(chars / span); info.append((name, chars / span, found, len(spoken) - 1, span))
        if not timings: continue
        json.dump(timings, open(os.path.join(adir, v, 'timings.json'), 'w'), separators=(',', ':'))
        med = statistics.median(rates)
        for name, rate, found, need, span in info:
            off = abs(rate / med - 1)   # short clips, and slides full of dates and numbers, vary naturally: only big misfits count
            if (off > .45 and span > 8) or (need >= 3 and found < need * .5): rows.append((name, v, f'{rate / med:.0%} of the usual speed', f'{found}/{need} pauses found'))
    if rows:
        report += [f'## {b}', '', '| clip | voice | speech rate | sentence pauses |', '|---|---|---|---|'] + [f'| {a} | {v} | {r} | {p} |' for a, v, r, p in sorted(rows)] + ['']
        flagged_total += len(rows)
    print(f'{b}: {sum(1 for _ in os.scandir(adir))} voices, {len(rows)} clips flagged')
if not flagged_total: report.append('Every clip fits its text.')
open(os.path.join(ROOT, 'CAPTION-CHECK.md'), 'w').write('\n'.join(report) + '\n')
print('report: CAPTION-CHECK.md,', flagged_total, 'flagged')
