import numpy as np
from PIL import Image
W,H=4800,3600
def load(id):
    ov=np.asarray(Image.open('ov_%s.png'%id)).copy(); ins=np.unpackbits(np.load('inside_%s.npy'%id))[:W*H].reshape(H,W).astype(bool); return ov,ins
STAGES=[('1916-02',['101465023']),('1916-10',['101465023','101465071']),('1916-12',['101465023','101465071','101464753']),
        ('1917-03',['101465023','ed7a','101465068']),('1917-05',['101465065'])]
OUT='/home/user/MovieQuest/battlesofhistory/vimy/images/trenches/'
for name,layers in STAGES:
    acc=np.zeros((H,W,4),np.uint8)
    for id in layers:
        ov,ins=load(id); acc[ins]=ov[ins]
    Image.fromarray(acc,'RGBA').save(OUT+'trenches-%s.png'%name,optimize=True)
    print(name, (acc[...,3]>0).mean())
