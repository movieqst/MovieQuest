"""Real elevation for the Talas maps: AWS Terrain Tiles (Mapzen 'terrarium' PNGs, from SRTM ~30 m and other sources).
dem(lat0, lat1, lon0, lon1, W, H, zoom) -> float32 array H x W in metres, north up, equal steps of latitude and longitude.
Tiles are cached in $DEM_CACHE (default ~/.cache/talas-dem)."""
import math, os, io, urllib.request
import numpy as np
from PIL import Image

CACHE = os.environ.get('DEM_CACHE', os.path.expanduser('~/.cache/talas-dem'))
URL = 'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'

def tile(z, x, y):
    p = os.path.join(CACHE, str(z), str(x), '%d.png' % y)
    if not os.path.exists(p):
        os.makedirs(os.path.dirname(p), exist_ok=True)
        with urllib.request.urlopen(URL.format(z=z, x=x, y=y), timeout=60) as r: open(p, 'wb').write(r.read())
    a = np.asarray(Image.open(p).convert('RGB')).astype(np.float32)
    return a[..., 0] * 256 + a[..., 1] + a[..., 2] / 256 - 32768

def tx(lon, z): return (lon + 180) / 360 * 2 ** z
def ty(lat, z): r = math.radians(lat); return (1 - math.log(math.tan(r) + 1 / math.cos(r)) / math.pi) / 2 * 2 ** z

def dem(lat0, lat1, lon0, lon1, W, H, z):
    x0, x1 = int(tx(lon0, z)), int(tx(lon1, z)); y0, y1 = int(ty(lat1, z)), int(ty(lat0, z))
    big = np.zeros(((y1 - y0 + 1) * 256, (x1 - x0 + 1) * 256), np.float32)
    for X in range(x0, x1 + 1):
        for Y in range(y0, y1 + 1): big[(Y - y0) * 256:(Y - y0 + 1) * 256, (X - x0) * 256:(X - x0 + 1) * 256] = tile(z, X, Y)
    lons = lon0 + (np.arange(W) + .5) / W * (lon1 - lon0); lats = lat1 - (np.arange(H) + .5) / H * (lat1 - lat0)
    px = (tx(lons, z) - x0) * 256 - .5; py = (np.array([ty(l, z) for l in lats]) - y0) * 256 - .5
    from scipy.ndimage import map_coordinates
    PY, PX = np.meshgrid(py, px, indexing='ij')
    return map_coordinates(big, [PY, PX], order=1, mode='nearest').astype(np.float32)

def hillshade(e, cell_m, az=315, alt=45, exag=1.5):
    gy, gx = np.gradient(e * exag, cell_m)
    slope = np.arctan(np.hypot(gx, gy)); aspect = np.arctan2(-gx, gy)
    a, b = math.radians(az), math.radians(alt)
    return np.clip(np.sin(b) * np.cos(slope) + np.cos(b) * np.sin(slope) * np.cos(a - aspect - math.pi / 2), 0, 1)
