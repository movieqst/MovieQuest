#!/usr/bin/env python3
"""A slideshow GIF of one copy's photos, for the top of its eBay listing.

  python3 tools/make-gif.py images/the_wizard-1989-dvd-7.jpg ... -o images/the-wizard-1989-dvd-2.gif

Movie, 11 Oct: "a moving main photo and in that GIF just scroll through the
different views". eBay's own photo section keeps only a GIF's first frame,
so the GIF lives on moviequest.ca and the listing description shows it.

Every frame is fitted onto the same canvas (no stretching), 600 px on the long
side by default, held FRAME_MS each, looping forever.
"""
import argparse
from PIL import Image, ImageOps

FRAME_MS = 1500


def frames(paths, size, background):
    for p in paths:
        img = ImageOps.exif_transpose(Image.open(p)).convert('RGB')
        img.thumbnail((size, size), Image.LANCZOS)
        canvas = Image.new('RGB', (size, size), background)
        canvas.paste(img, ((size - img.width) // 2, (size - img.height) // 2))
        # One palette per frame keeps photos looking like photos.
        yield canvas.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.FLOYDSTEINBERG)


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument('photos', nargs='+')
    ap.add_argument('-o', '--out', required=True)
    ap.add_argument('--size', type=int, default=600)
    ap.add_argument('--ms', type=int, default=FRAME_MS)
    ap.add_argument('--background', default='#0a0a0a')
    a = ap.parse_args()
    shots = list(frames(a.photos, a.size, a.background))
    shots[0].save(a.out, save_all=True, append_images=shots[1:], duration=a.ms, loop=0, optimize=True, disposal=1)
    print(f'{a.out}: {len(shots)} frames, {a.size}px, {a.ms} ms each')


if __name__ == '__main__':
    main()
