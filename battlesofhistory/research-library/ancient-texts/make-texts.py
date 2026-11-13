#!/usr/bin/env python3
"""Plain-text copies of the ancient sources for the Alexander pages, from public-domain translations:
  Arrian, Anabasis (Chinnock, 1884) from Project Gutenberg #46976 (the Gutenberg header and licence footer removed);
  Diodorus book 17, Polybius book 12 and Plutarch's Alexander from Bill Thayer's LacusCurtius (one-asterisk pages:
  public domain), keeping only the translation with its chapter and section numbers: no page numbers, footnote
  markers or notes.
    python3 make-texts.py <folder with the downloaded files>
Chapter numbers are written [17] at the start of a chapter; section numbers as {2}."""
import re, sys, os, html
SRC = sys.argv[1]; OUT = os.path.dirname(os.path.abspath(__file__))
def lacus(files, title, credit):
    out = [title, credit, '']
    for f in files:
        t = open(os.path.join(SRC, f), encoding='utf-8', errors='replace').read()
        t = t.split('<HR CLASS="endnotes"')[0]
        i = t.find('<A CLASS="chapter"'); t = t[i:] if i >= 0 else t
        t = re.sub(r'(?is)<A CLASS="ref"[^>]*>.*?</A>', '', t)                    # footnote markers
        t = re.sub(r'(?is)<SPAN CLASS="pagenum"[^>]*>.*?</SPAN>', '', t)            # page numbers
        t = re.sub(r'(?is)<A CLASS="chapter"[^>]*>\s*(.*?)\s*</A>', lambda m: '\n\n[' + re.sub(r'<[^>]+>|\s', '', m.group(1)) + '] ', t)
        t = re.sub(r'(?is)<A CLASS="T?sec"[^>]*>\s*(.*?)\s*</A>', lambda m: ' {' + re.sub(r'<[^>]+>|\s', '', m.group(1)) + '} ', t)
        t = re.sub(r'(?is)<(script|style)[^>]*>.*?</\1>', '', t)
        t = re.sub(r'(?i)</?(p|div|br|tr|table|h\d)[^>]*>', '\n', t); t = re.sub(r'<[^>]+>', '', t)
        t = html.unescape(t).replace('\xa0', ' ')
        t = re.sub(r'[ \t]+', ' ', t); t = re.sub(r' *\n *', '\n', t); t = re.sub(r'\n{3,}', '\n\n', t)
        out.append(t.strip()); out.append('')
    return '\n'.join(out)
W = lambda name, text: open(os.path.join(OUT, name), 'w', encoding='utf-8').write(text.strip() + '\n')
a = open(os.path.join(SRC, 'arrian.txt'), encoding='utf-8').read()
a = a.split('*** START OF THE PROJECT GUTENBERG EBOOK')[1].split('\n', 1)[1].split('*** END OF THE PROJECT GUTENBERG EBOOK')[0]
W('arrian-anabasis-chinnock-1884.txt', 'Arrian, The Anabasis of Alexander, translated by E. J. Chinnock (London, 1884). Public domain.\n'
  'Source: Project Gutenberg eBook #46976 (https://www.gutenberg.org/ebooks/46976); the Gutenberg header and licence removed.\n\n' + a.strip())
W('diodorus-book17-welles-1963.txt', lacus(['Diodorus_Siculus_17A_.html', 'Diodorus_Siculus_17B_.html'],
  'Diodorus of Sicily, Library of History, book 17 (Alexander), translated by C. Bradford Welles (Loeb Classical Library, vol. VIII, 1963).',
  'Public domain in the United States (copyright not renewed), as stated by LacusCurtius: https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Diodorus_Siculus/17A*.html and 17B*.html. Translation only; notes omitted.'))
W('polybius-book12-paton-1925.txt', lacus(['Polybius_12_.html'],
  'Polybius, The Histories, book 12 (including 12.17–22, his criticism of Callisthenes on Issus), translated by W. R. Paton (Loeb Classical Library, vol. IV, 1925).',
  'Public domain, via LacusCurtius: https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Polybius/12*.html. Translation only; notes omitted.'))
W('plutarch-alexander-perrin-1919.txt', lacus(['Plutarch_Lives_Alexander__%s.html' % n for n in ('3', '4', '5', '6-7', '8', '9', '10')],
  'Plutarch, Life of Alexander, translated by Bernadotte Perrin (Loeb Classical Library, Plutarch\'s Lives vol. VII, 1919).',
  'Public domain, via LacusCurtius: https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Alexander*.html. Translation only; notes omitted.'))
for f in sorted(os.listdir(OUT)):
    if f.endswith('.txt'): print(f, os.path.getsize(os.path.join(OUT, f)) // 1024, 'KB')
