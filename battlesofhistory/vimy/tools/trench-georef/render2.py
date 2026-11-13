"""NLS trench-map sheet -> Vimy battle frame. world px -> (undo village correction) -> grid metres -> sheet px.
Writes, per sheet, a check render (sheet colours) and the trench ink as a transparent overlay (German red, British blue)."""
import numpy as np, json, sys
from PIL import Image; Image.MAX_IMAGE_PIXELS=None
from scipy.ndimage import map_coordinates, gaussian_filter, binary_opening
from scipy.interpolate import RBFInterpolator
S=json.load(open('sheets.json')); F=json.load(open('grid2world.json'))
s=np.array(F['s']); R=np.array(F['R']); t=np.array(F['t'])
pred=np.array(F['ctrl_pred']); real=np.array(F['ctrl_world'])
# smooth correction field: similarity position -> painted (Nicholson) position, through the villages; corners pinned
pins=np.array([[-400,-400],[2800,-400],[-400,2200],[2800,2200]],float)
corr=RBFInterpolator(np.r_[pred,pins], np.r_[real-pred,np.zeros((4,2))], kernel='thin_plate_spline', smoothing=20)
K=2                                      # overlay at 2 x the battle frame (2.5 m per px)
W,H=2400*K,1800*K
yy,xx=np.mgrid[0:H,0:W].astype(np.float64); wx=(xx+.5)/K; wy=(yy+.5)/K
# undo the correction (one fixed-point step is plenty: the field is smooth and small)
Q=np.c_[wx.ravel(),wy.ravel()]; Qs=Q-corr(Q[::1]) if False else None
sub=np.c_[wx[::16,::16].ravel(),wy[::16,::16].ravel()]
from scipy.ndimage import zoom
dsub=corr(sub).reshape(wx[::16,::16].shape+(2,))
dx=zoom(dsub[...,0],(H/dsub.shape[0],W/dsub.shape[1]),order=1)[:H,:W]; dy=zoom(dsub[...,1],(H/dsub.shape[0],W/dsub.shape[1]),order=1)[:H,:W]
sx,sy=wx-dx,wy-dy
a=R.T@np.vstack([sx.ravel()-t[0], sy.ravel()-t[1]])
E=(a[0]/s[0]).reshape(H,W); N=(-a[1]/s[1]).reshape(H,W)
PV=json.load(open('prev2sheet.json'))
VIRT={'ed7a':('/home/user/MovieQuest/battlesofhistory/vimy/sources/trench-maps/36C-SW3-ed7A-north-preview.jpg','to023'),
      'giv':('/home/user/MovieQuest/battlesofhistory/vimy/sources/trench-maps/nls/nls-101464726.jpg','giv_to023'),   # 36B SE4 & 36C SW3 Givenchy, Ed 7A, trenches to 8 April 1916 (fit through 11 square centres, RMS about 7 m)
      'ed8a':('/home/user/MovieQuest/battlesofhistory/vimy/sources/trench-map-36C-SW3-vimy-ed8A-feb-1917.jpg','8a_to023')}
def render(id):
    virt=VIRT.get(id); sid='101465023' if virt else id
    sh=S[sid]; E0,E1,N0,N1=sh['grid']; tl,tr,bl,br=[np.array(c,float) for c in sh['corners']]
    u=(E-E0)/(E1-E0); v=(N0-N)/(N0-N1); inside=(u>=0)&(u<=1)&(v>=0)&(v<=1)
    px=(1-u)*(1-v)*tl[0]+u*(1-v)*tr[0]+(1-u)*v*bl[0]+u*v*br[0]; py=(1-u)*(1-v)*tl[1]+u*(1-v)*tr[1]+(1-u)*v*bl[1]+u*v*br[1]
    if virt:
        cx,cy=[np.array(v) for v in PV[virt[1]]]; M=np.array([cx[:2],cy[:2]]); Mi=np.linalg.inv(M)
        qx,qy=px-cx[2],py-cy[2]; px,py=Mi[0,0]*qx+Mi[0,1]*qy, Mi[1,0]*qx+Mi[1,1]*qy
        im=np.asarray(Image.open(virt[0]).convert('RGB'))
        inside&=(px>=0)&(py>=0)&(px<im.shape[1]-1)&(py<im.shape[0]-1)
        if id=='giv': inside&=(px>=455)&(px<=6863)&(py>=342)&(py<=4291)   # inside the neatline only (no margin notes)
    else: im=np.asarray(Image.open('/home/user/MovieQuest/battlesofhistory/vimy/sources/trench-maps/nls/nls-%s.jpg'%id).convert('RGB'))
    rgb=np.stack([map_coordinates(im[...,k],[py,px],order=1,cval=255) for k in range(3)],-1).astype(np.int16)
    r,g,b=rgb[...,0],rgb[...,1],rgb[...,2]
    if id in ('ed7a','ed8a'):   # small previews: paler, softer ink
        red=(r>150)&(r-g>35)&(r-b>35)&(np.abs(g-b)<30)&inside
        blue=(b-r>8)&(r<205)&(np.abs(g-b)<40)&inside
    else:
        red=(r>185)&(r-g>60)&(g-b<22)&inside
    if id not in ('ed7a','ed8a'): blue=((b>r+25)&(b>=g-10)&(r<175) | (g-r>12)&(b-r>12)&(np.abs(g-b)<25)&(r<170))&inside
    Image.fromarray(np.dstack([rgb.clip(0,255).astype(np.uint8),(inside*255).astype(np.uint8)]),'RGBA').resize((2400,1800)).save('check_%s.png'%id)
    from scipy.ndimage import binary_closing, binary_opening as bo
    if id in ('ed7a','ed8a'): red=binary_closing(red,iterations=2); blue=binary_closing(blue,iterations=2)
    red=bo(red,np.ones((2,2))) if id not in ('ed7a','ed8a') else red
    np.save('inside_%s.npy'%id, np.packbits(inside))
    ov=np.zeros((H,W,4),np.uint8)
    ov[red]=(200,30,30,235); ov[blue]=(40,90,215,235)
    Image.fromarray(ov,'RGBA').save('ov_%s.png'%id)
    print(id, 'inside %.2f red %.4f blue %.4f'%(inside.mean(),red.mean(),blue.mean()))
for id in sys.argv[1:]: render(id)
