#!/usr/bin/env python3
"""Put a 4x4 sprite sheet's rows into the game's order (south, east, north, west).
    python3 -I tools/reorder-sheet-rows.py IN.png OUT.png 0 2 3 1        (the source row for each new row)
    python3 -I tools/reorder-sheet-rows.py IN.png OUT.png 0 m1 2 1      (mN: source row N mirrored left-right,
                                                                        e.g. a west-facing row mirrored to face east)
Rows are numbered 0-3 from the top. Use it before tools/prepare-sprite-sheet.py."""
import sys
from PIL import Image, ImageOps
src, out, spec = sys.argv[1], sys.argv[2], sys.argv[3:7]
im = Image.open(src).convert('RGBA'); W, H = im.size; h = H // 4; o = Image.new('RGBA', (W, h * 4))
for i, s in enumerate(spec):
    m = s.startswith('m'); r = int(s.lstrip('m')); row = im.crop((0, r * h, W, (r + 1) * h))
    if m:   # mirror each cell on its own, so the frames stay in order
        cw = W // 4; row = Image.merge('RGBA', row.split()); cells = [ImageOps.mirror(row.crop((c * cw, 0, (c + 1) * cw, h))) for c in range(4)]
        row = Image.new('RGBA', (W, h)); [row.paste(cl, (c * cw, 0)) for c, cl in enumerate(cells)]
    o.paste(row, (0, i * h))
o.save(out); print(out, spec)
