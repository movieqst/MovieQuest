#!/usr/bin/env python3
"""Batoche: a chart of the Plains Cree syllabics for the "From the record" panel (images/cree-syllabics-chart.png).
Drawn for this project with the Noto Sans Canadian Aboriginal font (SIL Open Font License).
    python3 battlesofhistory/batoche/tools/make-cree-chart.py FONT_DIR"""
import os, sys
from PIL import Image, ImageDraw, ImageFont
FD = sys.argv[1]; OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'images', 'cree-syllabics-chart.png')
syl = lambda s: ImageFont.truetype(os.path.join(FD, 'NotoSansCanadianAboriginal-Regular.ttf'), s)
lat = lambda s, b=False: ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSerif%s.ttf' % ('-Bold' if b else ''), s)
W, H = 1600, 1100; im = Image.new('RGB', (W, H), (232, 220, 192)); d = ImageDraw.Draw(im)
INK, RED, GREY = (40, 30, 20), (140, 40, 30), (110, 95, 75)
d.rectangle([20, 20, W - 20, H - 20], outline=INK, width=3)
d.text((W / 2, 70), 'ᓀᐦᐃᔭᐍᐏᐣ', font=syl(64), fill=RED, anchor='mm')
d.text((W / 2, 140), 'nēhiyawēwin: Plains Cree syllabics', font=lat(38, True), fill=INK, anchor='mm')
rows = [('', 'ᐁ ᐃ ᐅ ᐊ', ''), ('p', 'ᐯ ᐱ ᐳ ᐸ', 'ᑊ'), ('t', 'ᑌ ᑎ ᑐ ᑕ', 'ᐟ'), ('c', 'ᒉ ᒋ ᒍ ᒐ', 'ᐨ'), ('k', 'ᑫ ᑭ ᑯ ᑲ', 'ᐠ'),
        ('m', 'ᒣ ᒥ ᒧ ᒪ', 'ᒼ'), ('n', 'ᓀ ᓂ ᓄ ᓇ', 'ᐣ'), ('s', 'ᓭ ᓯ ᓱ ᓴ', 'ᐢ'), ('y', 'ᔦ ᔨ ᔪ ᔭ', 'ᐩ')]
x0, y0, cw, rh = 330, 215, 170, 70
for j, v in enumerate(['ê', 'i', 'o', 'a']): d.text((x0 + j * cw, y0), v, font=lat(34, True), fill=GREY, anchor='mm')
d.text((x0 + 4 * cw + 30, y0), 'final', font=lat(28, True), fill=GREY, anchor='mm')
for i, (c, s, fin) in enumerate(rows):
    y = y0 + 60 + i * rh
    d.text((x0 - 120, y), c or '–', font=lat(34, True), fill=GREY, anchor='mm')
    for j, ch in enumerate(s.split()): d.text((x0 + j * cw, y), ch, font=syl(54), fill=INK, anchor='mm')
    if fin: d.text((x0 + 4 * cw + 30, y), fin, font=syl(54), fill=INK, anchor='mm')
d.text((1350, 420), 'The shape gives\nthe consonant;\nturning it gives\nthe vowel.', font=lat(28), fill=INK, anchor='mm', align='center')
d.text((W / 2, 900), 'ᑭᓯᐢᑳᒋᐊᐧᓂ ᓰᐱᕀ', font=syl(60), fill=RED, anchor='mm')
d.text((W / 2, 975), 'kisiskāciwani-sīpiy, "the swift-flowing river": the Saskatchewan', font=lat(34), fill=INK, anchor='mm')
d.text((W / 2, 1040), 'Chart drawn for Battles of History. A dot above a sign (not shown) marks a long vowel; w is added with a small dot.', font=lat(22), fill=GREY, anchor='mm')
im.save(OUT); print(OUT, im.size)
