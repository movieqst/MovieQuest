#!/usr/bin/env python3
"""Batoche: a simple chart of how Michif is built (images/michif-chart.png), for the "From the record" panel.
    python3 battlesofhistory/batoche/tools/make-michif-chart.py"""
import os
from PIL import Image, ImageDraw, ImageFont
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'images', 'michif-chart.png')
F = lambda s, b=False, i=False: ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSerif%s.ttf' % ('-Bold' if b else '-Italic' if False else ''), s)
W, H = 1600, 1100; im = Image.new('RGB', (W, H), (232, 220, 192)); d = ImageDraw.Draw(im)
INK, BLUE, RED, GREY = (40, 30, 20), (40, 80, 150), (150, 50, 35), (110, 95, 75)
d.rectangle([20, 20, W - 20, H - 20], outline=INK, width=3)
d.text((W / 2, 90), 'MICHIF', font=F(80, True), fill=INK, anchor='mm')
d.text((W / 2, 170), 'the language of the Métis', font=F(40, i=True), fill=GREY, anchor='mm')
def box(x, y, w, h, col, title, lines):
    d.rounded_rectangle([x, y, x + w, y + h], 24, outline=col, width=6, fill=(240, 232, 210))
    d.text((x + w / 2, y + 60), title, font=F(46, True), fill=col, anchor='mm')
    for k, t in enumerate(lines): d.text((x + w / 2, y + 140 + k * 56), t, font=F(34), fill=INK, anchor='mm')
box(110, 270, 600, 420, RED, 'FRENCH', ['nouns:', 'people, animals,', 'things and places,', 'with their articles'])
box(890, 270, 600, 420, BLUE, 'PLAINS CREE', ['verbs:', 'the actions,', 'with Cree endings', 'for who and when'])
d.text((W / 2, 480), '+', font=F(120, True), fill=INK, anchor='mm')
d.text((W / 2, 790), 'One sentence, two languages: the nouns come from French, the verbs from Cree.', font=F(34), fill=INK, anchor='mm')
d.text((W / 2, 860), 'Born in the fur-trade families of the 1700s and 1800s, spoken at Red River and Batoche.', font=F(30), fill=GREY, anchor='mm')
d.text((W / 2, 1040), 'Chart drawn for Battles of History, after Peter Bakker, A Language of Our Own (1997).', font=F(22), fill=GREY, anchor='mm')
im.save(OUT); print(OUT)
