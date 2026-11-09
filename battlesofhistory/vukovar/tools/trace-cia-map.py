#!/usr/bin/env python3
"""Vukovar: trace the CIA's map of the battle (Balkan Battlegrounds vol. I, map 2, public domain) into real coordinates.
    python3 battlesofhistory/vukovar/tools/trace-cia-map.py
1. Georeference: the map's 1-km UTM grid (zone 34) is found with a Hough transform (lines every 71.96 px, tilted 1.55 deg);
   the grid labels give the kilometre numbers. Check: the printed 19°00'E tick comes out at 18.9999°E, 45°20'N at 45.3337°N.
2. The brown front lines are picked out by colour; the orange-red attack arrows are masked off.
3. Each front line is followed through the line pixels between hand-placed waypoints (shortest path), spurs removed.
Writes research/cia-lines.geojson (lon, lat) and research/cia-lines-check.jpg (the traces drawn over the map).
The arrows are hand-placed centre lines (tail -> head) with the date printed next to them on the map."""
import os, json
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi
from skimage.graph import route_through_array
from pyproj import Transformer
HERE=os.path.dirname(os.path.abspath(__file__)); R=os.path.join(HERE,'..','research')
SRC=os.path.join(R,'loc-map2-battle-of-vukovar.jpg')

# ---- 1. georeference
X0,Y0=185,180
v=[(14,0),(85,1),(157,2),(229,3),(301,4),(1021,14),(1093,15),(1165,16),(1237,17),(1380,19)]
h=[(91,0),(163,1),(307,3),(379,4),(451,5),(523,6),(594,7),(811,10)]
sv,av=np.polyfit([k for d,k in v],[d for d,k in v],1); sh,ah=np.polyfit([k for d,k in h],[d for d,k in h],1)
print('spacing',sv,sh,'res v',np.array([d-(av+sv*k) for d,k in v]).round(1),'res h',np.array([d-(ah+sh*k) for d,k in h]).round(1))
TV=np.deg2rad(-1.55); TH=np.deg2rad(88.45)
def px2utm(x,y):
    x=x-X0;y=y-Y0
    dv=x*np.cos(TV)+y*np.sin(TV); dh=x*np.cos(TH)+y*np.sin(TH)
    return 326000+1000*(dv-av)/sv, 5030000-1000*(dh-ah)/sh
toll=Transformer.from_crs(32634,4326,always_xy=True); tou=Transformer.from_crs(4326,32634,always_xy=True)
def px2ll(x,y):
    e,n=px2utm(x,y); lon,lat=toll.transform(e,n); return lat,lon
def ll2px(lat,lon):
    e,n=tou.transform(lon,lat)
    dv=av+sv*(e-326000)/1000; dh=ah-sh*(n-5030000)/1000
    A=np.array([[np.cos(TV),np.sin(TV)],[np.cos(TH),np.sin(TH)]]); x,y=np.linalg.solve(A,[dv,dh]); return x+X0,y+Y0

# ---- 2. colour masks
im=np.asarray(Image.open(SRC).convert('RGB')).astype(int)
r,g,b=im[...,0],im[...,1],im[...,2]
frame=np.zeros(r.shape,bool); frame[188:1357,188:1819]=1
arrow=(r>=145)&(r-g>65)&(r-b>65)&frame
arrow=ndi.binary_dilation(arrow,iterations=2)
line=(r-g>18)&(r-b>14)&(r<200)&(g<150)&(np.abs(g-b)<28)&frame&~arrow

# ---- 3. trace
from skimage.graph import route_through_array
from skimage.morphology import skeletonize
cost=np.where(line,1.0,25.0)
def snap(p,r=7):
    x,y=p; ys,xs=np.nonzero(line[y-r:y+r+1,x-r:x+r+1])
    if not len(xs): return (x,y)
    i=np.argmin((xs-r)**2+(ys-r)**2); return (x-r+xs[i],y-r+ys[i])
def trace(wps):
    wps=[snap(p) for p in wps]; path=[]
    for a,b in zip(wps,wps[1:]):
        p,_=route_through_array(cost,(a[1],a[0]),(b[1],b[0]),fully_connected=True,geometric=True)
        path+= [(c,r) for r,c in p][(1 if path else 0):]
    out=[]   # cut spurs: when the path comes back near a point it left a few steps ago, drop the detour
    for q in path:
        for j in range(len(out)-1,max(-1,len(out)-25),-1):
            if abs(out[j][0]-q[0])<=1 and abs(out[j][1]-q[1])<=1 and len(out)-j>2:
                del out[j+1:]; break
        out.append(q)
    return out
def simplify(pts,tol=1.2):
    pts=np.array(pts,float)
    def rdp(a):
        if len(a)<3: return a
        s,e=a[0],a[-1]; d=e-s; n=np.hypot(*d) or 1
        dist=np.abs(d[0]*(a[:,1]-s[1])-d[1]*(a[:,0]-s[0]))/n
        i=dist.argmax()
        if dist[i]>tol: return np.vstack([rdp(a[:i+1])[:-1],rdp(a[i:])])
        return np.vstack([s,e])
    return rdp(pts)
L14=[(322,912),(560,757),(700,790),(870,730),(960,697),(1100,640),(1125,632),(1160,632),(1200,638),(1225,640),(1240,635),(1252,620),(1258,600),
 (1240,585),(1225,577),(1210,580),(1200,575),(1193,563),(1175,573),(1165,570),(1168,545),(1180,540),(1197,525),(1190,507),(1160,505),(1130,508),(1110,510),(1100,500),(1095,485),(1088,465),(1080,470),(1065,478),(1060,460),(1050,455),(1047,458),(1035,480),(1023,490),
 (1025,450),(1035,408),(1080,385),(1150,368),(1200,360),(1258,357),(1280,358),(1310,495),(1330,530),(1360,560),(1400,590),(1440,620),(1460,640),(1480,660),(1500,690),(1520,715),(1550,733),(1580,745),(1600,750),(1640,748),(1670,745),(1682,752),(1675,765),(1650,775),(1625,785),(1605,795),(1595,810),(1580,825),(1560,822),(1530,808),(1500,790),(1485,780),(1474,778),(1472,800),(1473,830),(1465,848),(1445,852),(1437,840),(1436,812),(1420,790),(1400,770),(1385,745),(1370,710),(1362,675),(1350,660),(1330,655),(1310,656)]
LINES={
 '14 September 1991': [L14],
 '30 September 1991': [[(1272,402),(1240,402),(1210,400),(1195,388),(1160,384),(1130,388),(1112,410),(1102,440),(1098,470),(1105,492),(1130,500),(1170,500),(1198,503),(1200,520),(1204,555),(1215,572),(1240,578),(1262,588),(1270,605),(1290,618),(1320,628),(1355,645),(1380,665),(1392,690),(1396,720),(1405,745),(1430,762),(1460,770),(1500,780),(1530,785),(1560,782),(1600,778),(1630,770),(1655,752)]],
 '10 November 1991': [[(1300,505),(1290,480),(1282,455),(1276,430),(1265,428),(1240,440),(1215,455),(1203,462),(1206,440),(1208,415),(1203,400),(1190,386),(1160,386),(1130,390),(1112,412),(1102,440),(1099,470),(1106,493),(1130,500),(1170,500),(1200,504),(1225,520),(1255,538)],
                      [(1320,540),(1318,575),(1316,600),(1325,628),(1350,640),(1375,655),(1395,668),(1430,680),(1455,686),(1462,710),(1467,740),(1480,758),(1520,775),(1560,770),(1600,766),(1630,758),(1652,745)]],
}
# the Hough-free pieces: the long southern 14 Sept line from Vinkovci joins the town loop at (1310,656)
LINES['14 September 1991'][0]+= [(1280,665),(1170,820),(1050,880),(950,930),(870,975),(790,1015),(740,1065),(700,1095),(650,1125),(610,1155),(565,1187),(520,1205),(465,1222)]
ARROWS=[  # (centre-line points tail -> head, label on the map)
 ([(1262,338),(1258,365),(1253,388)],'16 October'),
 ([(998,404),(1040,418),(1086,440)],'16 October'),
 ([(966,418),(975,450),(995,460),(1012,445),(1017,432)],'14 September'),
 ([(1342,486),(1325,500),(1312,522)],'3 November'),
 ([(1298,522),(1285,512),(1272,503)],'8 November (label placement ambiguous: may belong to the 3 November crossing)'),
 ([(1316,538),(1340,562),(1362,585)],'3 November (no label of its own: continues the 3 November crossing)'),
 ([(1242,562),(1248,535),(1258,510)],'8 November'),
 ([(1236,616),(1262,600),(1288,568)],'16 October (same start as the labelled arrow)'),
 ([(1236,602),(1205,598),(1180,612)],'16 October'),
 ([(1302,688),(1300,650),(1288,634),(1275,640),(1271,656)],'16 October'),
 ([(1222,805),(1185,785),(1126,786)],'30 September'),
 ([(968,975),(890,955),(788,942)],'30 September'),
 ([(968,975),(935,915),(893,848)],'30 September'),
 ([(968,975),(995,905),(1020,835)],'30 September'),
 ([(1458,858),(1455,830),(1453,802)],'14 September'),
 ([(1459,790),(1460,770),(1464,752)],'14 September (no label of its own: continues the arrow from the south)'),
 ([(1396,760),(1410,738),(1428,720)],'no date on the map'),
 ([(1435,712),(1455,700),(1477,693)],'no date on the map'),
 ([(1468,742),(1478,733),(1491,725)],'no date on the map'),
 ([(416,703),(470,725),(512,768)],'no date on the map (211th Brigade)'),
]
feats=[]
for k,parts in LINES.items():
    for wp in parts:
        P=simplify(trace(wp)); ll=[[round(float(px2ll(x,y)[1]),6),round(float(px2ll(x,y)[0]),6)] for x,y in P]
        feats.append({'type':'Feature','properties':{'kind':'front line','date':k,'px':P.round(1).tolist()},'geometry':{'type':'LineString','coordinates':ll}})
for pts,lab in ARROWS:
    ll=[[round(float(px2ll(x,y)[1]),6),round(float(px2ll(x,y)[0]),6)] for x,y in pts]
    feats.append({'type':'Feature','properties':{'kind':'attack arrow (JNA/TO)','date':lab,'px':pts},'geometry':{'type':'LineString','coordinates':ll}})
json.dump({'type':'FeatureCollection','features':feats},open(os.path.join(R,'cia-lines.geojson'),'w'),ensure_ascii=False)
# check image
im=Image.open(SRC).convert('RGB'); im=Image.blend(im,Image.new('RGB',im.size,'white'),.45); d=ImageDraw.Draw(im)
COL={'14 September 1991':(0,90,255),'30 September 1991':(0,170,60),'10 November 1991':(220,0,200)}
for f in feats:
    p=[tuple(q) for q in f['properties']['px']]
    if f['properties']['kind']=='front line': d.line(p,fill=COL[f['properties']['date']],width=3)
    else:
        d.line(p,fill=(255,120,0),width=3); hx,hy=p[-1]; d.ellipse([hx-5,hy-5,hx+5,hy+5],fill=(255,120,0))
im.crop((185,180,1822,1360)).convert('RGB').save(os.path.join(R,'cia-lines-check.jpg'),quality=82)
print(len(feats),'features written')
