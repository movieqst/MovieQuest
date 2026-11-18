#!/usr/bin/env python3
"""Battle of Bunker Hill: one-per-chat ChatGPT sprite-sheet prompts -> ART-PROMPTS-UNITS.md (same format as Medak and Granicus)."""
import os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'ART-PROMPTS-UNITS.md')
HEAD = """Make ONE sprite sheet for an educational history game about the Battle of Bunker Hill (17 June 1775, near Boston), seen from above at an angle (three-quarter view, like a classic real-time strategy game).
- ONE square image, about 1024 x 1024 pixels: a 4 x 4 grid of equal cells on a flat pure green background (#00FF00). No shadows on the background, no grid lines, no borders, no text. Only ONE sheet in the picture.
- The same single subject in every cell, the same size in every cell, fully inside its cell with green space all round.
- Row 1: facing the viewer (south). Row 2: facing RIGHT (east). Row 3: facing away (north). Row 4: facing LEFT (west).
- The 4 columns are 4 frames of the movement described below.
- STYLE: painterly but crisp, rich natural colours, readable at small size; warm early-summer light. Historically accurate for June 1775: NOT Napoleonic, NOT the American Civil War; no Stars and Stripes, no Continental Army uniforms (they did not exist yet).
- No bright green anywhere on the subject. No flags, no readable text or numbers.
- Respectful and realistic: every person drawn as a real, dignified person; no caricature, no gore, no blood, no wounds, no one being hurt."""
WALK = "Rows as above; the 4 frames show walking steadily (a march)."
ACT = "Rows as above; the 4 frames show the action below."
S = [
 ("01-british-regular", "British regular infantryman (march)", WALK,
  "A British infantry private of 1775 (a battalion company of a regiment such as the 5th, 38th, 43rd or 52nd Foot): a black three-cornered (cocked) hat with white lace edge; a red wool coat with coloured lapels and cuffs (the regiment's facing colour, e.g. buff or yellow) and white lace; white waistcoat and white breeches; black gaiters to the knee; white leather crossbelts with a black cartridge box; a Brown Bess flintlock musket with a bayonet fixed, carried on the left shoulder. Disciplined, upright."),
 ("02-british-regular-fire", "the same British regular firing (action)", ACT,
  "The same British infantry private of 1775 in red coat, cocked hat and white crossbelts, firing his flintlock musket: frame 1 bringing the musket to the shoulder, frame 2 aiming level, frame 3 firing with a small puff of white powder smoke at the muzzle (no flame), frame 4 lowering the musket to reload. No one hit."),
 ("03-british-grenadier", "British grenadier (march)", WALK,
  "A British grenadier of 1775 (the tall soldiers of a regiment's grenadier company): a tall black bearskin fur cap with a metal front plate; a red coat with coloured facings and small red-and-white 'wings' on the shoulders; white waistcoat and breeches, black gaiters; white crossbelts with a cartridge box and a short sword (hanger); a Brown Bess musket with fixed bayonet on the shoulder. Tall and steady."),
 ("04-british-light-infantry", "British light infantryman (action: advancing quickly)", ACT,
  "A British light infantryman of 1775 (a regiment's light company): a short red jacket without long tails, a small black leather cap with a front flap, red waistcoat or white, short black gaiters, lighter equipment with a powder horn and cartridge pouch, a musket with bayonet. Frames: moving forward at a quick trot, crouching slightly, musket held at the ready across the body."),
 ("05-british-officer", "British officer (walk)", WALK,
  "A British infantry officer of 1775: a black cocked hat with gold lace, a scarlet coat with coloured facings and gold or silver lace, a crimson silk sash over the shoulder, a small silver gorget at the throat, white waistcoat and breeches, black boots or gaiters, a sword (drawn and held upright). Confident, pointing the way in one frame."),
 ("06-royal-artillery", "Royal Artillery field gun and crew (action)", "Rows as above; the 4 frames show the gun crew working: frame 1 loading, frame 2 aiming, frame 3 firing with a puff of white smoke at the muzzle (no flame, no explosion), frame 4 the gun recoiling a little.",
  "A British light field gun of 1775 (a small bronze 6-pounder cannon on a two-wheeled wooden carriage painted grey) with three gunners of the Royal Artillery, who wore BLUE coats with red facings, cocked hats, white breeches; one holds a rammer, one a linstock. Draw gun and crew as one group, fitting the cell."),
 ("07-british-boat", "boat with soldiers rowed across the river (move)", "Rows as above; the 4 frames show the oars moving through one stroke, with small ripples in a thin ring of dark water around the boat only.",
  "A large wooden ship's boat (a longboat or flatboat) of the Royal Navy in 1775, rowed by six sailors in plain jackets and round hats, carrying about ten British soldiers in red coats and cocked hats sitting upright with their muskets held straight up. Seen from above at an angle. Draw only a thin ring of dark blue water around the hull; everything else is the green background."),
 ("08-british-warship", "Royal Navy warship (move)", "Rows as above; the 4 frames show the ship moving slowly, with a small white wake changing slightly between frames.",
  "A Royal Navy warship of 1775 (a two-decked ship of the line like HMS Somerset, or a smaller frigate): a black hull with a yellow-ochre stripe along the gun ports, three masts with the sails mostly furled, rigging, seen from above at an angle. Draw only a thin ring of dark blue water and a small wake around the hull; everything else is the green background. No flags with readable designs (a plain red ensign at the stern is fine)."),
 ("09-provincial-militiaman", "New England militiaman (walk)", WALK,
  "A New England provincial soldier (militiaman) of June 1775, in his own civilian clothes, not a uniform: a brown or grey homespun wool coat or a linen work shirt with a waistcoat, knee breeches, long woollen stockings, buckled shoes; a felt hat (round brim or cocked); a powder horn and a shot bag on cross straps; a long flintlock musket (no bayonet) carried on the shoulder. A farmer or tradesman, determined."),
 ("10-provincial-firing", "the same militiaman firing over the earthwork (action)", "Rows as above; the 4 frames show the action below. In every frame draw a short, low wall of brown earth in front of the man (part of the redoubt), as part of the subject.",
  "The same New England militiaman of 1775 in civilian clothes and felt hat, behind a low earth wall, firing his long flintlock musket over it: frame 1 aiming, frame 2 firing with a small puff of white powder smoke (no flame), frame 3 crouching down behind the wall to reload, frame 4 rising again. No one hit."),
 ("11-provincial-digging", "militiamen digging the redoubt (action)", "Rows as above; the 4 frames show the digging motion: spade in, lift, throw the earth, step back.",
  "Two New England militiamen of 1775 in shirtsleeves, waistcoats and felt hats, digging with a long-handled spade and a pickaxe, throwing up a low mound of fresh brown earth beside them; their muskets leaning against the mound. At night: cool, dim moonlight colours, but still readable."),
 ("12-provincial-officer", "provincial officer (walk)", WALK,
  "A New England provincial officer of 1775, without a uniform: a dark blue or brown civilian coat, a waistcoat, breeches, riding boots, a cocked hat, a sword at his side (held in hand in one frame), perhaps a light-coloured banyan-style summer coat. Calm and in command, older man."),
 ("13-musket-smoke", "musket and cannon smoke (effect)", "Row 1 to Row 4 are four slightly different versions of the same effect; in each row the 4 frames show it growing and fading: frame 1 a small white puff, frame 2 larger, frame 3 largest and starting to thin, frame 4 faint and almost gone.",
  "A cloud of white-grey black-powder smoke drifting away from a volley of muskets, seen from above at an angle: soft, rounded, billowing, white to light grey. No fire, no flash, no glow, no debris."),
]
o = ["# Battle of Bunker Hill: sprite sheets, one per chat (18 November 2026)", "",
"Each sheet goes to ChatGPT in its own NEW chat, with one self-contained prompt, the same way as Medak and Granicus.",
"From the checked research report (research/reports/Battle of Bunker Hill 1775.md): the British regulars, grenadiers and",
"light infantry of 1775 (red coats with regimental facings), a Royal Artillery gun (blue coats), the boats and a warship; the",
"New England provincials in their own civilian clothes (no uniform and no Stars and Stripes in June 1775), digging, firing",
"over the earthwork and on the march. Details of dress follow modern reconstructions and are tagged as our reconstruction on",
"the page. No flags, no one hurt, no blood. Page colours (default): British red, provincials blue (rings under the figures).",
"Cut with tools/prepare-sprite-sheet.py (people 160 px cells; the gun, boat and warship 240 x 200).", ""]
for f, t, mv, subj in S:
    o += ["---", "", f"# Sprite {f}: {t}", "",
          "**How:** open a NEW chat in ChatGPT for this sheet only. Paste the text below as ONE message. Ask for a PNG, about 1024 x 1024.",
          f"Save it as **{f}.png** and send it to Claude. If it comes back with a different background, a grid of different subjects,",
          "or labels, reply: \"One subject only, 4 x 4 cells, pure green background #00FF00, no text.\"", "",
          "```text", HEAD, "", mv, "SUBJECT: " + subj, "```", ""]
open(OUT, "w").write("\n".join(o)); print(OUT, len(S))
