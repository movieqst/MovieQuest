"""Puts the Givenchy sheet (trenches to 8 April 1916, 1:10,000) into the October and December 1916 trench layers, in place of
the February 1916 sheet (36C SW Ed 6) over the ground it covers: newer by two months and twice as detailed. Only north of the
February sheet's south edge (row 1691 of 3600), so the south sheets of October and December, which are newer, are untouched.
Run after render2.py giv (which writes ov_giv.png and inside_giv.npy)."""
import numpy as np
from PIL import Image
W,H=4800,3600; T='/home/user/MovieQuest/battlesofhistory/vimy/images/trenches/'
ov=np.asarray(Image.open('ov_giv.png')).copy()
# The Souchez brook and the other streams are printed in the same blue as the British front line. The sheet shows only the
# British front line (a dashed blue line), not the British trench system, so blue more than about 250 m west of the front
# line of April 1917 (lines.js, 'canadianFront') is water, and is dropped.
import re, json
L=json.loads(re.search(r'canadianFront:\s*(\[\[.*?\]\])', open('/home/user/MovieQuest/battlesofhistory/vimy/lines.js').read()).group(1))
fy=np.array([p[1] for p in L],float)*2; fx=np.array([p[0] for p in L],float)*2
frontx=np.interp(np.arange(H), fy, fx)
isblue=(ov[...,2]>ov[...,0])&(ov[...,3]>0); cols=np.arange(W)[None,:]
ov[isblue & (cols < frontx[:,None]-100)]=0
ins=np.unpackbits(np.load('inside_giv.npy'))[:W*H].reshape(H,W).astype(bool); ins[1691:]=False
for n in ('trenches-1916-10.png','trenches-1916-12.png'):
    a=np.asarray(Image.open(T+n)).copy(); a[ins]=ov[ins]; Image.fromarray(a,'RGBA').save(T+n,optimize=True); print(n,'replaced',ins.mean().round(3))
