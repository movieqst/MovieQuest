import numpy as np, json
from scipy.optimize import fsolve
S=json.load(open('sheets.json'))
def px2grid(id,p):
    tl,tr,bl,br=[np.array(c,float) for c in S[id]['corners']]; E0,E1,N0,N1=S[id]['grid']
    f=lambda uv:((1-uv[0])*(1-uv[1])*tl+uv[0]*(1-uv[1])*tr+(1-uv[0])*uv[1]*bl+uv[0]*uv[1]*br)-np.array(p,float)
    u,v=fsolve(f,[.5,.5]); return np.array([E0+u*(E1-E0), N0-v*(N0-N1)])
# (sheet, sheet px, world px from the painting fit = Nicholson Map 7 lined up to the ground)
CP=[('101465023','Souchez',(520,3140),(543,233)),('101465023','Givenchy',(1260,3180),(964,232)),
    ('101465023','La Chaudiere',(2160,3540),(1425,454)),('101465023','Petit-Vimy',(2040,3980),(1330,641)),
    ('101465023','Vimy',(2440,4020),(1490,658)),
    ('101465068','Neuville-St-Vaast',(980,660),(720,1000)),('101465068','Thelus',(2100,760),(1323,1087)),
    ('101465068','Willerval',(3240,710),(1997,1034)),('101465068','Bailleul',(3400,1540),(2073,1482)),
    ('101465068','Ecurie',(1160,1800),(810,1648))]
G=np.array([px2grid(s,p) for s,_,p,_ in CP]); Wp=np.array([w for *_,w in CP],float)
A=np.c_[G,np.ones(len(G))]
for name,M in [('affine',None)]:
    cx,_,_,_=np.linalg.lstsq(A,Wp[:,0],rcond=None); cy,_,_,_=np.linalg.lstsq(A,Wp[:,1],rcond=None)
    pred=np.c_[A@cx,A@cy]; res=np.hypot(*(pred-Wp).T)*4.94
    for (s,n,_,_),r,g in zip(CP,res,G): print('%-18s grid E %8.0f N %7.0f  residual %4.0f m'%(n,g[0],g[1],r))
    print('rms %.0f m'%np.sqrt((res**2).mean()))
    # implied scale/rotation: world px per grid metre
    print('scale x %.4f y %.4f px/m (expect %.4f)'%(np.hypot(cx[0],cy[0]),np.hypot(cx[1],cy[1]),1/4.94), 'rot deg', np.degrees(np.arctan2(cy[0],cx[0])))
    json.dump({'cx':cx.tolist(),'cy':cy.tolist(),'note':'world px = cx.(E,N,1), cy.(E,N,1); E,N grid metres'},open('grid2world.json','w'))

# ---- similarity with the true scale (grid metres are ground metres), then a smooth correction through the villages
kx,ky=2400/11.86e3*(11.86/11.86), 1800/8.91e3
s=np.array([2400/11860.0, 1800/8910.0])          # world px per metre, x and y
Gc=G-G.mean(0); Wc=Wp-Wp.mean(0)
# world y grows southward, grid N grows northward: flip N
Gm=np.c_[Gc[:,0]*s[0], -Gc[:,1]*s[1]]
H=Gm.T@Wc; U,_,Vt=np.linalg.svd(H); R=(U@Vt).T
if np.linalg.det(R)<0: Vt[-1]*=-1; R=(U@Vt).T
t=Wp.mean(0)-(R@np.c_[G.mean(0)[0]*s[0], -G.mean(0)[1]*s[1]].T).ravel()
pred=(R@np.c_[G[:,0]*s[0], -G[:,1]*s[1]].T).T+t
res=pred-Wp
print('similarity rot %.2f deg, rms %.0f m'%(np.degrees(np.arctan2(R[1,0],R[0,0])), np.sqrt((np.hypot(*res.T)**2).mean())*4.94))
for (sh,n,_,_),r in zip(CP,res): print('   %-18s %5.0f m  (dx %4.0f dy %4.0f px)'%(n,np.hypot(*r)*4.94,r[0],r[1]))
json.dump({'s':s.tolist(),'R':R.tolist(),'t':t.tolist(),'ctrl_pred':pred.tolist(),'ctrl_world':Wp.tolist(),'names':[c[1] for c in CP]},open('grid2world.json','w'),indent=1)
