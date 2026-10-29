// Dumps every narration line of scenario.js as JSON: [{file, text}], using the
// same file-name convention the engine expects (see scenario.audioBase).
// Usage: node tools/narration-lines.js > /tmp/lines.json
global.window = {}; require('../scenario.js'); const S = window.BATTLE_SCENARIO;
// Respellings checked against the engine's phonemizer so names, numbers and times come out right.
const ORD = { '1st': 'first', '2nd': 'second', '3rd': 'third', '4th': 'fourth', '5th': 'fifth', '7th': 'seventh', '8th': 'eighth', '9th': 'ninth', '17th': 'seventeenth', '32nd': 'thirty-second', '33rd': 'thirty-third', '66th': 'sixty-sixth', '229th': 'two hundred and twenty-ninth' };
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'], ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const two = n => n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? '-' + ONES[n % 10] : '');
const year = y => { y = +y; if (y >= 2000) return 'two thousand' + (y % 100 ? ' and ' + two(y % 100) : ''); return two(Math.floor(y / 100)) + ' ' + (y % 100 < 10 ? 'oh ' + ONES[y % 100] : two(y % 100)); };
const say = t => String(t)
  .replace(/\b(19|20)(\d\d)\b/g, (m, a, b) => year(a + b))
  .replace(/\b(\d{1,2}):(\d\d)\b/g, (m, h, mm) => { const H = +h, M = +mm, h12 = H % 12 === 0 ? 12 : H % 12; if (H === 0) return M === 0 ? 'midnight' : `${two(M)} minutes past midnight`; if (M === 0) return `${two(h12)} o'clock`; return `${two(h12)} ${M < 10 ? 'oh ' + ONES[M] : two(M)}`; })
  .replace(/\b(\d+)(st|nd|rd|th)\b/g, (m) => ORD[m] || m)
  .replace(/\bB\u00e9nouville\b/g, 'Bay-noo-veel').replace(/\bRanville\b/g, 'Rahn-veel').replace(/\bOuistreham\b/g, 'Weest-ray-am').replace(/\bGondr\u00e9e\b/g, 'Gon-dray').replace(/\bCaen\b/g, 'Kahn').replace(/\bOrne\b/g, 'Orn').replace(/\bLe Port\b/g, 'Luh Por').replace(/\bColleville\b/g, 'Coll-veel').replace(/\bBayeux\b/g, 'Bye-yuh').replace(/\bDives\b/g, 'Deev')
  .replace(/\bLovat\b/g, 'Luvvat').replace(/\bMillin\b/g, 'Millin').replace(/\bBrotheridge\b/g, 'Brother-ridge').replace(/\bWallwork\b/g, 'Wall-work').replace(/\bPine-Coffin\b/g, 'Pine Coffin').replace(/\bSchmidt\b/g, 'Shmitt').replace(/\bFeuchtinger\b/g, 'Foykh-ting-er').replace(/\bvon Luck\b/g, 'fon Look').replace(/\bNeilson\b/g, 'Neelson').replace(/\bDiduryk\b/g, 'Did-er-ick')
  .replace(/\bPIAT\b/g, 'pee-at').replace(/\bPaK 38\b/g, 'pack thirty-eight').replace(/\bPanzer IV\b/g, 'Panzer four').replace(/\bHorsas?\b/g, m => 'Hor-sa' + (m.endsWith('s') ? 's' : '')).replace(/\bAlbemarle\b/g, 'Albe-marl').replace(/\bOx and Bucks\b/g, 'Ox and Bucks').replace(/\bDeadstick\b/g, 'Dead-stick').replace(/\bbascule\b/g, 'bass-cule')
  .replace(/\bLZ\b/g, 'L Z').replace(/\bX-Ray\b/g, 'X-Ray').replace(/\bPAVN\b/g, 'North Vietnamese').replace(/\bB3 Front\b/g, 'B three Front').replace(/\bH-15\b/g, 'H fifteen')
  .replace(/\bM16\b/g, 'M sixteen').replace(/\bM60\b/g, 'M sixty').replace(/\bM79\b/g, 'M seventy-nine').replace(/\bAK-47s?\b/g, m => 'A K forty-seven' + (m.endsWith('s') ? 's' : '')).replace(/\bRPG-2\b/g, 'R P G two').replace(/\bB-52s?\b/g, m => 'B fifty-two' + (m.endsWith('s') ? 's' : '')).replace(/\bUH-1D?\b/g, 'U H one').replace(/\bC-123\b/g, 'C one twenty-three')
  .replace(/(\d+(?:\.\d+)?) mm\b/g, '$1 millimetre').replace(/(\d+) km\/h\b/g, '$1 kilometres an hour').replace(/(\d+) km\b/g, '$1 kilometres').replace(/(\d+),(\d{3})\b/g, '$1$2')
  .replace(/·/g, ',').replace(/’/g, "'").replace(/“|”/g, '"').replace(/–/g, ' to ').replace(/…/g, '...').replace(/\s+/g, ' ').trim();
const out = [];
S.intro.forEach((sl, i) => out.push({ file: `intro-${i + 1}`, text: say(sl.title + '. ' + (sl.subtitle ? sl.subtitle + '. ' : '') + sl.lines.map(l => l.text).join(' ')) }));
S.parts.forEach(p => {
  p.events.forEach((e, i) => { out.push({ file: `event-${p.id}-${i + 1}`, text: say(e.text) }); if (e.explain) out.push({ file: `explain-${p.id}-${i + 1}`, text: say(e.explain) }); });
  out.push({ file: `outcome-${p.id}`, text: say(p.outcome.map(l => l.text).join(' ')) });
  Object.keys(p.commandLines || {}).forEach(k => out.push({ file: `cmd-${p.id}-${k}`, text: say(p.commandLines[k]) }));
});
Object.keys(S.commandLines).forEach(k => out.push({ file: `cmd-${k}`, text: say(S.commandLines[k]) }));
console.log(JSON.stringify(out, null, 1));
