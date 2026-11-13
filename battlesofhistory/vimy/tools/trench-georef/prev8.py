import numpy as np, json
cols={0:1070,1:1430,2:1790,3:2150}; rows={0:3156,1:3510,2:3874,3:4230}
# square-number centres on 36C SW3 Ed 8A (1024 x 756 file) per (row, col)
p8={(0,0):(267.5,252.5),(0,1):(368.5,252.5),(0,2):(467.5,252.5),(0,3):(569,252.5),
    (1,0):(267.5,353.5),(1,1):(368.5,353.5),(1,2):(468.5,353.5),(1,3):(569,353.5),
    (2,0):(266.5,453.5),(2,1):(368.5,453.5),(2,2):(468.5,453.5),(2,3):(569,453.5),
    (3,0):(266.5,555),(3,1):(367.5,555),(3,2):(468.5,555),(3,3):(570,555)}
a=np.array(list(p8.values()),float); b=np.array([(cols[c],rows[r]) for r,c in p8],float)
A=np.c_[a,np.ones(len(a))]; cx=np.linalg.lstsq(A,b[:,0],rcond=None)[0]; cy=np.linalg.lstsq(A,b[:,1],rcond=None)[0]
r=np.hypot(A@cx-b[:,0],A@cy-b[:,1]); print('rms m',np.sqrt((r**2).mean())*2.54, r.round(1))
j=json.load(open('prev2sheet.json')); j['8a_to023']=[cx.tolist(),cy.tolist()]; json.dump(j,open('prev2sheet.json','w'))
