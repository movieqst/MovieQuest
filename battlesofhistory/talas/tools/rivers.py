"""Rivers from the elevation itself: fill pits, D8 flow directions, flow accumulation (pysheds)."""
import numpy as np
if not hasattr(np, "in1d"): np.in1d = np.isin

def accumulation(e, lat0, lat1, lon0, lon1):
    from pysheds.grid import Grid
    from pysheds.view import Raster, ViewFinder
    from affine import Affine
    H, W = e.shape
    aff = Affine((lon1 - lon0) / W, 0, lon0, 0, -(lat1 - lat0) / H, lat1)
    vf = ViewFinder(affine=aff, shape=e.shape, crs='EPSG:4326', nodata=np.float32(-9999))
    r = Raster(e.astype(np.float64), viewfinder=vf)
    g = Grid(viewfinder=vf)
    f = g.fill_pits(r); f = g.fill_depressions(f); f = g.resolve_flats(f)
    fd = g.flowdir(f)
    acc = g.accumulation(fd)
    return np.asarray(acc), np.asarray(fd)
