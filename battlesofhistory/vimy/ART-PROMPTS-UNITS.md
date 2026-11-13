# Vimy Ridge: soldier art for the battle page (prompts for ChatGPT)

**How to send them back**
- Ask ChatGPT for **one sheet per picture**. Pictures with several sheets glued together came out with cut-off rows and white strips on Stirling.
- Name each file with the **bold name** below, zip them up and send the zip.
- I key out the green and cut each sheet to size.

**Accuracy for 9 April 1917** (from our research):
- **Weather:** it was Easter Monday, cold, with sleet and snow blowing from behind the Canadians into the Germans' faces. The ground was chalky mud full of shell holes.
- **Canadians:**
  - khaki British-pattern service dress with puttees, a "Brodie" steel helmet (often covered in sacking) and khaki 1908 web equipment;
  - the Lee-Enfield rifle (SMLE), not the Ross, which was withdrawn in 1916;
  - a small coloured cloth patch on each upper sleeve (the battalion and division patch).
- **Germans:**
  - field-grey (feldgrau) uniform and the M1916 steel helmet (Stahlhelm), often with a cloth cover;
  - the Gewehr 98 rifle, stick grenades and a gas-mask canister.
- **No tanks or cavalry in the attack:** the eight tanks bogged down, and the cavalry came only at the end.

---

## Shared block (paste first, then one description at a time)
```text
Make a sprite sheet for a historical battle game seen from above at an angle (three-quarter view, like a classic real-time strategy game).
- ONE square image, at least 1024 x 1024 pixels: a 4 x 4 grid of equal cells on a flat pure green background (#00FF00). No shadows on the background, no grid lines, no borders, no text. Only ONE sheet in the picture.
- The same single figure (or group) in every cell, the same size in every cell, fully inside its cell with green space all round, feet near the bottom.
- Row 1: facing the viewer (south). Row 2: facing RIGHT (east). Row 3: facing away (north). Row 4: facing LEFT (west).
- The 4 columns are 4 frames of the movement described.
- Painterly but crisp, rich muted colour, readable at small size. Historically accurate for the Battle of Vimy Ridge, northern France, 9 April 1917: grey sky, sleet and snow, chalky mud.
```

## A. Walking sheets (the 4 columns are a walk cycle)
1. **canadian-infantry:** `A Canadian infantryman of 1917 advancing: khaki service dress with puttees, a "Brodie" steel helmet with a sacking cover, khaki web equipment with ammunition pouches, a small pack, a Lee-Enfield rifle with fixed bayonet held across the body, a small coloured patch on the upper sleeve; mud on boots and puttees, flecks of snow on the shoulders.`
2. **canadian-lewis-gunner:** `A Canadian Lewis gunner of 1917 advancing: khaki uniform and Brodie helmet, carrying a Lewis light machine-gun with its flat round drum magazine on top, a canvas bag of spare drums on the hip.`
3. **canadian-bomber:** `A Canadian "bomber" of 1917 advancing: khaki uniform and Brodie helmet, rifle slung on the back, a canvas bucket of Mills grenades in one hand and a grenade ready in the other.`
4. **german-infantry:** `A German infantryman of 1917 moving: a field-grey (feldgrau) tunic and trousers, an M1916 steel helmet (Stahlhelm) with a cloth cover, leather belt and ammunition pouches, a gas-mask canister, a Gewehr 98 rifle with bayonet, two stick grenades tucked in the belt, ankle boots with puttees.`
5. **german-machine-gun:** `A German MG 08 machine-gun crew of 1917, two men in field-grey with Stahlhelms, carrying the heavy water-cooled MG 08 on its sledge mount between them.`
6. **stretcher-bearers:** `Two Canadian stretcher-bearers of 1917 in khaki with Brodie helmets and Red Cross armbands, carrying a wounded soldier on a canvas stretcher through the mud.`
7. **german-prisoners:** `A small group of three German prisoners of 1917 in field-grey, without weapons or helmets, hands raised or on their heads, walking.`

## B. Action sheets (the 4 columns are an action cycle)
8. **canadian-infantry-attack:** `The same Canadian infantryman as before, in action: frames 1-2 kneeling and firing his Lee-Enfield (frame 2 with a small muzzle flash), frames 3-4 lunging forward with the bayonet.`
9. **canadian-lewis-fire:** `The same Canadian Lewis gunner, lying prone behind the Lewis gun on its bipod and firing, with small muzzle flashes in frames 2 and 4.`
10. **german-infantry-attack:** `The same German infantryman, in action: frames 1-2 firing his Gewehr 98 from a crouch (frame 2 with a muzzle flash), frames 3-4 throwing a stick grenade.`
11. **german-machine-gun-fire:** `The German MG 08 crew in action: the gun on its sledge mount, one man firing and one feeding the ammunition belt, small muzzle flashes in frames 2 and 4.`

## C. Leaders (the same grid, on foot; columns 1-4 a walk cycle)
- **leader-byng:** `Lieutenant-General Sir Julian Byng, commander of the Canadian Corps, 1917: a tall, lean British general of 54 with a moustache, khaki service dress tunic with red gorget patches, Sam Browne belt, a peaked cap with a red band, riding breeches and boots.`
- **leader-currie:** `Major-General Arthur Currie, 1st Canadian Division, 1917: a very tall, heavily built Canadian general of 41, clean-shaven, khaki tunic with red gorget patches, peaked cap with a red band, Sam Browne belt, riding breeches and boots.`
- **leader-macdowell:** `Captain Thain MacDowell, 38th Battalion, 1917: a young Canadian infantry officer in khaki, Brodie helmet, Sam Browne belt, a revolver in his hand.`
- **leader-german-officer:** `A German infantry officer of 1917: field-grey tunic, Stahlhelm, binoculars on his chest, a Luger pistol in his hand, a map case at the belt.`

Then, for each leader, one **action** sheet with the same description, named **leader-byng-attack**, **leader-currie-attack**, **leader-macdowell-attack** and **leader-german-officer-attack**. For it, add:
`frames 1-4: pointing forward and giving orders, then raising a hand (for MacDowell and the German officer: firing the pistol, with a small flash in frame 2).`

## D. The fallen (two sheets)
```text
A sprite sheet for a battle game seen from above at an angle: ONE square image, at least 1024 x 1024 pixels, a 4 x 4 grid of equal cells on a flat pure green background (#00FF00), no text. Sixteen DIFFERENT poses of a fallen soldier lying on the ground (on his back, on his side, face down, curled up), each fully inside its cell. No blood or wounds shown: a respectful, historical look. [UNIT]
```
- **fallen-canadian:** `Canadian infantrymen of 1917 in khaki with Brodie helmets, some helmets lying beside them, rifles on the ground.`
- **fallen-german:** `German infantrymen of 1917 in field-grey with Stahlhelms, some helmets lying beside them, rifles on the ground.`

## E. Portraits for the armies panel (square, one each)
```text
A square painted portrait, in the style of a First World War illustration, of [UNIT] at Vimy Ridge on 9 April 1917, half length, standing in a muddy, shell-torn chalk landscape under a grey sky with blowing sleet, in the uniform and equipment described: [DESCRIPTION]. Realistic, no text, no frame, the figure filling the picture edge to edge.
```
Use the descriptions from section A. Name the files:
- **portrait-canadian-infantry** (use 1)
- **portrait-canadian-lewis-gunner** (use 2)
- **portrait-german-infantry** (use 4)
- **portrait-german-machine-gun** (use 5)

Plus two more:
- **portrait-canadian-artillery:** `a Canadian gunner in khaki and Brodie helmet loading a shell into an 18-pounder field gun`
- **portrait-british-infantry:** `a British infantryman of the 5th Division's 13th Brigade (which fought with the Canadians), khaki and Brodie helmet, a Lee-Enfield, 1917`

---

## Also helpful (only if easy)
- **Photos** of the Grange Subway, the craters (Crater Cemetery, the Durand and Grange groups) and the Vimy Memorial, with their licences.
- **Sound:** CC0 or public-domain recordings of artillery, a whistle, and rain or wind. No field recordings from 1917 exist, so sound effects will do.
