import numpy as np, json
# square-number centres: preview 36C SW3 Ed 7A (1000 x 633) -> the same squares on sheet 101465023 (36C SW Ed 6)
P={10:((432,134),(1430,3156)),11:((570,134),(1790,3156)),12:((715,134),(2150,3156)),
   15:((287,275),(1070,3510)),16:((430,275),(1430,3510)),17:((572,275),(1790,3510)),18:((712,275),(2150,3510)),
   21:((287,417),(1070,3874)),22:((430,417),(1430,3874)),23:((572,417),(1790,3874)),24:((715,417),(2150,3874)),
   28:((430,557),(1430,4230)),29:((572,557),(1790,4230))}
a=np.array([v[0] for v in P.values()],float); b=np.array([v[1] for v in P.values()],float)
A=np.c_[a,np.ones(len(a))]; cx=np.linalg.lstsq(A,b[:,0],rcond=None)[0]; cy=np.linalg.lstsq(A,b[:,1],rcond=None)[0]
r=np.hypot(A@cx-b[:,0],A@cy-b[:,1]); print('residual px on 023 (2.54 m/px):',r.round(1),'rms m',np.sqrt((r**2).mean())*2.54)
json.dump({'to023':[cx.tolist(),cy.tolist()]},open('prev2sheet.json','w'))
