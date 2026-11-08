"""Puts the Givenchy sheet (trenches to 8 April 1916, 1:10,000) into the October and December 1916 trench layers, in place of
the February 1916 sheet (36C SW Ed 6) over the ground it covers: newer by two months and twice as detailed. Only north of the
February sheet's south edge (row 1691 of 3600), so the south sheets of October and December, which are newer, are untouched.
Run after render2.py giv (which writes ov_giv.png and inside_giv.npy)."""
import numpy as np
from PIL import Image
W,H=4800,3600; T='/home/user/MovieQuest/battlesofhistory/vimy/images/trenches/'
ov=np.asarray(Image.open('ov_giv.png')); ins=np.unpackbits(np.load('inside_giv.npy'))[:W*H].reshape(H,W).astype(bool); ins[1691:]=False
for n in ('trenches-1916-10.png','trenches-1916-12.png'):
    a=np.asarray(Image.open(T+n)).copy(); a[ins]=ov[ins]; Image.fromarray(a,'RGBA').save(T+n,optimize=True); print(n,'replaced',ins.mean().round(3))
