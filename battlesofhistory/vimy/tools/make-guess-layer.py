#!/usr/bin/env python3
"""Vimy: the February 1916 trench map (36C SW Ed 6) stops at the sheet edge, world y 845. No February 1916 sheet for the
south (51B NW) is online. Until one is found, the south part is filled with the trenches of the October 1916 sheet
(51B NW Ed 4A) as a GUESS: the front there did not move between February and October 1916 (the German attack of
21 May 1916 was further north, on the 36C sheet), but saps and support trenches will differ. The engine draws this layer
in purple (reddish for German, bluish for Allied) with the note "NOT VERIFIED TRENCHES IN PURPLE".
    python3 -I battlesofhistory/vimy/tools/make-guess-layer.py"""
import os
import numpy as np
from PIL import Image
T = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'images', 'trenches')
feb = np.asarray(Image.open(os.path.join(T, 'trenches-1916-02.png')))
octo = np.asarray(Image.open(os.path.join(T, 'trenches-1916-10.png'))).copy()
edge = int(np.where(feb[..., 3].max(axis=1) > 0)[0].max()) + 1   # the last row the February sheet covers
octo[:edge] = 0
# coloured here, not in the browser (a page opened from a file may not let the engine recolour pixels):
# German trenches reddish purple, British and French bluish purple
on = octo[..., 3] > 50; red = octo[..., 0].astype(int) > octo[..., 2].astype(int)
octo[on & red, :3] = (225, 70, 200); octo[on & ~red, :3] = (140, 110, 255); octo[on, 3] = 255; octo[~on] = 0
Image.fromarray(octo, 'RGBA').save(os.path.join(T, 'trenches-1916-02-guess.png'), optimize=True)
print('guess layer from row', edge, 'of', octo.shape[0], '=', edge / 2, 'world px')
