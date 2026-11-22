# Take-off scripts: one 10-second video per departure, with the references to hand the editor
Written 22 November 2026. Four take-off videos are enough: Whiteman is the only confirmed departure and gets two (the strike force east, the decoys west); the tankers and the fighters get one each as unnamed bases; the submarine launch is the fifth "departure" and goes with the Isfahan clip. Each script is 10 seconds, with beats by the second, a caption, and the exact reference files from `art/` and this folder that the video editor should load for it.

Style line for all: *photoreal cinematic, 16:9, 24 fps, 10 seconds, slow camera, night palette of moonlight blue with sodium-orange base lights, light grain, no people, no visible unit markings, no flame trails beyond engine glow, captions only as listed.*

## Video 1: Whiteman, the strike force leaves (confirmed)
**References for the editor:** `art/painted-whiteman.png` (the painted basemap), `basemap-whiteman.png` (the OSM reference with the true runway line), `art/sheet-b2.png` (the B-2 from six views).
> 0–2 s: top-down on the painted Whiteman map at night; the camera tilts down and forward until the map becomes the real ground: the north–south runway with white edge lights, the apron and the row of bomber docks to its west. 2–4 s: low beside the runway threshold at the south end; a B-2 flying-wing taxis out of the dark, turns onto the runway and stops, anti-collision lights blinking. 4–7 s: engines spool up, it rolls away from the camera to the north, nose lifts, gear folds. 7–10 s: the camera rises and follows it as it banks east; a second and a third B-2 are seen taxiing to the threshold behind. Caption at 1 s: "WHITEMAN AIR FORCE BASE, MISSOURI · 21 JUNE 2025 · seven B-2s depart east (US official)".

## Video 2: Whiteman, the decoys leave west (confirmed as a flight, not a destination)
**References:** `art/painted-whiteman.png`, `art/sheet-b2.png`, `art/painted-world-flight.png` (the dim Pacific line).
> 0–3 s: the same runway from the north end, looking south; a B-2 lifts off toward the camera and passes low overhead, the underside filling the frame for a moment. 3–6 s: the camera turns to follow it; it banks right, to the west, and a second follows the same turn. 6–10 s: dissolve to the painted world map; the dim line draws from Missouri out over the Pacific, labelled "decoy", while the gold line draws east. Caption at 2 s: "the decoy flight: west over the Pacific (US official); reported heading toward Guam, unconfirmed".

## Video 3: a tanker base at dusk (not named)
**References:** `art/sheet-kc135r.png` (with the boom-extended view), `art/sheet-kc46a.png` if a second type is wanted; no basemap, because the base is not named.
> 0–3 s: flat green farmland at dusk, long golden light, a single runway with a row of grey tankers nose-to-tail on the apron; a KC-135 at the threshold. 3–6 s: it rolls, lifts off and climbs into the orange sky, four fat engines, the boom stowed under the tail. 6–10 s: cut to high altitude in the last light: the tanker ahead, the boom extended, a B-2's nose sliding in beneath it until the boom connects; hold. Caption at 1 s: "one of the tanker bases; the full list was not published"; at 7 s: "about 18 hours each way, refuelling several times (US official)".

## Video 4: a fighter base in the Middle East at night (not named; composite)
**References:** `art/sheet-f35a.png`, `art/sheet-f16c.png`; no basemap.
> 0–3 s: a desert airfield at night, sunshades and hardened shelters along the runway, floodlights, a city's glow far off; two F-35As at the holding point, canopies closed, wingtip lights. 3–6 s: they run up together and roll; afterburner glow but no flame trail; they lift off as a pair and the gear folds. 6–10 s: the camera pans up as they climb away to the north-east; two F-16s taxi into the holding point behind. Caption at 1 s: "a US base in the region; which bases the fighters flew from was not published"; at 7 s: "fighters swept ahead of the bombers over Iran (US official)".

## Video 5: the submarine launch (not named; belongs with the Isfahan clip)
**References:** `art/sheet-submarine.png`, `art/sheet-tomahawk.png`, `art/sheet-tomahawk-3view.jpg`, `art/painted-iran.png` (for the sea south of Iran).
> 0–3 s: open sea at night, long swell, half moon; a dark hull awash with its sail above the water, no markings; hatches open along the forward deck. 3–6 s: a Tomahawk breaks the surface in a column of white spray, the booster burning pale, the wings still folded; it tilts north. 6–8 s: the booster drops away, the wings swing out, the missile levels off low over the water; a second launch behind it. 8–10 s: dissolve to the painted Iran map; a thin line draws from the sea south of Iran to Isfahan. Caption at 1 s: "a US guided-missile submarine, not named (press: Ohio class)"; at 7 s: "more than two dozen Tomahawks at Isfahan, the last weapons to strike (US official)".

## What to give the video editor, by clip
| Clip | Maps | Aircraft and weapons |
|---|---|---|
| Take-off videos 1–2 (Whiteman) | painted-whiteman, basemap-whiteman, painted-world-flight | sheet-b2 |
| Take-off video 3 (tankers) | none | sheet-kc135r, sheet-kc46a |
| Take-off video 4 (fighters) | none | sheet-f35a, sheet-f16c |
| Clip 1 of the storyboard (take-off and globe) | painted-whiteman, painted-world-flight | sheet-b2 |
| Clips 2–4 (Fordow, Natanz, Isfahan) | painted-iran; the three site maps once repainted (see REPROMPTS-SITE-MAPS.md); for now basemap-fordow, basemap-natanz, basemap-isfahan | sheet-b2, sheet-gbu57 (Fordow and Natanz); sheet-submarine, sheet-tomahawk, sheet-tomahawk-3view (Isfahan) |
| Clip 5 (the way home) | painted-world-flight, painted-whiteman | sheet-b2, sheet-kc135r |
| Clip 6 (conclusion) | painted-iran | none |
| Andersen (only if the decoy destination is shown) | painted-andersen, basemap-andersen | sheet-b2 |

Credit line to include in the video: "Maps painted with ChatGPT over OpenStreetMap (© OpenStreetMap contributors, ODbL) and Natural Earth data; aircraft reference sheets AI-generated."
