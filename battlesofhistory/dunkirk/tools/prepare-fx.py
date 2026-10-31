# Builds images/fx/smoke.png, flames.png and fx.json from the ChatGPT sheets (smoke-grid.png and fire-grid.png).
#   python3 -I tools/prepare-fx.py <folder holding dk-smoke/ and dk-fire/> images/map2.jpg images/fx
# Smoke: the 16 whole-map frames are matched to map2.jpg, and only the smoke is kept (how much each pixel darkens
# against the clean sea, limited to grey pixels). Flames: alpha from brightness on the black background.
from PIL import Image, ImageFilter
import numpy as np, sys, json
SP=sys.argv[1]; MAP2=sys.argv[2]; OUT=sys.argv[3]
# ---------- smoke: register grid cells to map2 (2400x1800)
sheet=Image.open(SP+'/dk-smoke/smoke-grid.png').convert('RGB'); cw,ch=362,272; I=4
fr=[np.asarray(sheet.crop((c*cw+I,r*ch+I,(c+1)*cw-I,(r+1)*ch-I))).astype(float) for r in range(4) for c in range(4)]
fh,fw=fr[0].shape[:2]
med=np.median(np.stack(fr),axis=0)
m2=Image.open(MAP2).convert('RGB')
g=lambda im: np.asarray(im.convert('L').filter(ImageFilter.GaussianBlur(1))).astype(float)
R=np.asarray(Image.fromarray(med.astype('uint8')).convert('L').filter(ImageFilter.GaussianBlur(1))).astype(float)
mask=np.zeros_like(R); mask[int(fh*.55):,:]=1
best=None
for s in np.arange(0.17,0.23,0.004):
    M=g(m2.resize((int(2400*s),int(1800*s)))); mh,mw=M.shape
    for oy in range(0,max(1,mh-fh+1),2):
        for ox in range(0,max(1,mw-fw+1),2):
            P=M[oy:oy+fh,ox:ox+fw]
            if P.shape!=R.shape: continue
            a=P-P[mask>0].mean(); b=R-R[mask>0].mean()
            c=(a*b*mask).sum()/np.sqrt((a*a*mask).sum()*(b*b*mask).sum())
            if best is None or c>best[0]: best=(c,s,ox,oy)
c,s,ox,oy=best; print('smoke reg corr %.3f scale %.3f off %d,%d'%(c,s,ox,oy))
x0,y0=ox/s,oy/s; Wm,Hm=fw/s,fh/s
st=np.stack(fr); v=st.mean(axis=3); clean=np.percentile(v,90,axis=0)
cells=[]
for f in fr:
    vv=f.mean(axis=2); sat=f.max(axis=2)-f.min(axis=2)
    a=(clean-vv)/np.maximum(clean-42,20); a=np.clip((a-0.12)/0.88,0,1)*np.clip((40-sat)/25,0,1)
    cells.append(Image.fromarray((a*235).astype('uint8')).filter(ImageFilter.GaussianBlur(0.8)))
# pack 16 alpha cells (fw x fh each) into a 4x4 RGBA sheet, smoke colour
S=Image.new('RGBA',(fw*4,fh*4),(46,45,48,0))
for i,A in enumerate(cells):
    L=Image.new('RGBA',(fw,fh),(46,45,48,0)); L.putalpha(A); S.paste(L,((i%4)*fw,(i//4)*fh))
S.save(OUT+'/smoke.png',optimize=True)
# ---------- fire: 8 cells, alpha from brightness, common crop
fs=Image.open(SP+'/dk-fire/fire-grid.png').convert('RGB'); cw,ch=444,444
cs=[np.asarray(fs.crop((c*cw,r*ch,(c+1)*cw,(r+1)*ch))).astype(float) for r in range(2) for c in range(4)]
al=[np.clip((f.max(axis=2)-18)/170,0,1) for f in cs]
ys,xs=np.where(np.max(np.stack(al),axis=0)>0.05); bx0,bx1,by0,by1=xs.min(),xs.max()+1,ys.min(),ys.max()+1
bw,bh=bx1-bx0,by1-by0; sc=256/max(bw,bh); tw,th=int(bw*sc),int(bh*sc)
F=Image.new('RGBA',(tw*4,th*2),(0,0,0,0))
for i,(f,a) in enumerate(zip(cs,al)):
    rgb=np.clip(f/np.maximum(a[...,None],1e-3),0,255)   # un-premultiply against black
    im=np.dstack([rgb,a*255]).astype('uint8')[by0:by1,bx0:bx1]
    F.paste(Image.fromarray(im,'RGBA').resize((tw,th),Image.LANCZOS),((i%4)*tw,(i//4)*th))
F.save(OUT+'/flames.png',optimize=True)
json.dump({'smoke':{'cols':4,'rows':4,'cellW':fw,'cellH':fh,'x':round(x0),'y':round(y0),'w':round(Wm),'h':round(Hm)},
           'flames':{'cols':4,'rows':2,'cellW':tw,'cellH':th,'baseFrac':round(1-0,2)}},open(OUT+'/fx.json','w'),indent=1)
print('flames cell',tw,th,'smoke cell',fw,fh,'placed',round(x0),round(y0),round(Wm),round(Hm))
