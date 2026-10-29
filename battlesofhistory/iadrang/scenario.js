/*
  Historical Scenario File — Battle of the Ia Drang, 14–18 November 1965
  ------------------------------------------------------------------------
  This single file drives every experience of the battle:
    • the narrated introduction (`intro`)
    • Watch mode  — the narrated reenactment (orders in each part's `events`)
    • Command mode — the playable battle (AI behaviour in each part's `ai`)
  The battle has two parts, each with its own map: LZ X-Ray (14–16 November)
  and LZ Albany (17 November).

  Every statement about history carries a confidence tag:
    established    — agreed by both sides and by historians
    us             — the American account: Moore's after-action report, Moore & Galloway, US Army histories
    pavn           — the Vietnamese account: PAVN official histories and Nguyen Huu An's memoir
    estimate       — a modern estimate, not a recorded figure
    reconstruction — our own choice to make the battle playable (positions, timings, map scale)

  Map coordinates are in "world pixels". North is up. 1 px ≈ 1 m, but the map is a
  schematic reconstruction, not a survey.
*/
window.BATTLE_SCENARIO = {
  id: 'iadrang',
  title: 'Battle of the Ia Drang',
  date: '14–18 November 1965',
  place: 'Ia Drang valley, Central Highlands, South Vietnam',
  tagline: 'The 1st Cavalry Division (Airmobile) vs. the People’s Army of Vietnam',
  titleCard: {
    title: 'BATTLE OF THE IA DRANG',
    date: '14 – 18 November 1965',
    dateNote: 'LZ X-Ray, 14–16 November; LZ Albany, 17 November. The first major battle between the US Army and the North Vietnamese regular army.',
    dateRef: 'Moore & Galloway, We Were Soldiers Once… and Young (1992); Carland, Stemming the Tide (US Army, 2000)',
    place: 'The Ia Drang valley, below the Chu Pong massif, South Vietnam',
    sides: 'United States 1st Cavalry Division (Airmobile)  ·  People’s Army of Vietnam, B3 Front'
  },

  confidence: {
    established:    { label: 'Established',        color: '#5fcf8a', desc: 'Agreed by both sides and by historians.' },
    us:             { label: 'American account',   color: '#9fc8ff', desc: 'From US sources: Moore’s after-action report, Moore and Galloway’s book, US Army histories. Enemy casualty figures in them are counts and estimates made under fire.' },
    pavn:           { label: 'Vietnamese account', color: '#ff9c8a', desc: 'From North Vietnamese sources: the PAVN official history and the memoir of Nguyen Huu An. They claim far higher American losses and lower losses of their own.' },
    estimate:       { label: 'Estimate',           color: '#e9c77a', desc: 'A modern estimate, not a recorded figure.' },
    reconstruction: { label: 'Reconstruction',     color: '#c9a0ff', desc: 'Our own choice to make the battle playable: positions, timings and map scale.' }
  },

  /* Sides: keys are used throughout the file. `text` colours names in the panels. */
  sides: {
    us:   { name: 'United States', short: 'US', army: '1st Cavalry Division (Airmobile)', color: '#3f8f4f', light: '#c9f0d0', text: '#9fe0ad', pennant: '#3f8f4f', trim: '#e9c77a', portrait: 'us', jungle: false },
    pavn: { name: 'North Vietnam', short: 'PAVN', army: 'People’s Army of Vietnam, B3 Front', color: '#d44c3e', light: '#ffd0bd', text: '#ffb3a7', pennant: '#d44c3e', trim: '#f3d9a0', portrait: 'pavn', jungle: true }
  },
  sideOrder: ['us', 'pavn'],

  /* Unit types. `kind` foot|air; `range` and `dmg` drive combat; `fig` picks the drawn figure; `sheet` the painted sprite sheet in images/units/. */
  unitTypes: {
    rifle:   { name: 'Rifle company',      side: 'us',   kind: 'foot', speed: 14, range: 95,  fig: 'rifle',   sheet: 'us-rifle',    spec: { cw: 160, ch: 160, h: 26 }, dmg: { assault: 5, heavy: 5, recon: 6, rifle: 5, weapons: 5 }, cover: 1 },
    weapons: { name: 'Weapons company',    side: 'us',   kind: 'foot', speed: 10, range: 300, fig: 'weapons', sheet: 'us-weapons',  spec: { cw: 160, ch: 160, h: 26 }, dmg: { assault: 4, heavy: 5, recon: 3, rifle: 4, weapons: 4 }, cover: 1, indirect: true },
    heli:    { name: 'UH-1 Huey',          side: 'us',   kind: 'air',  speed: 240, range: 0, fig: 'heli',    sheet: 'us-huey',     spec: { cw: 240, ch: 200, h: 34 } },
    assault: { name: 'Assault battalion',  side: 'pavn', kind: 'foot', speed: 18, range: 60,  fig: 'assault', sheet: 'pavn-assault', spec: { cw: 160, ch: 160, h: 26 }, dmg: { rifle: 7, weapons: 9, recon: 4, assault: 5, heavy: 5 }, cover: 1, belt: 1.6 },
    heavy:   { name: 'Heavy weapons',      side: 'pavn', kind: 'foot', speed: 8,  range: 260, fig: 'heavy',   sheet: 'pavn-heavy',  spec: { cw: 160, ch: 160, h: 26 }, dmg: { rifle: 4, weapons: 4, recon: 2, assault: 3, heavy: 3 }, cover: 1, indirect: true },
    recon:   { name: 'Reconnaissance',     side: 'pavn', kind: 'foot', speed: 22, range: 45,  fig: 'recon',   sheet: 'pavn-recon',  spec: { cw: 160, ch: 160, h: 26 }, dmg: { rifle: 2, weapons: 3, recon: 3, assault: 2, heavy: 2 }, cover: 1, stealth: true }
  },

  /* Opening shot: where the globe turns, what it dives to, and the labels at the end of the dive. */
  globe: {
    target: { lon: 107.72, lat: 13.57 },        // LZ X-Ray, Chu Pong massif, Gia Lai province
    region: { lon: 106, lat: 15 }, pull: 4.2,
    startLat: 14,
    periodNote: 'South-East Asia in 1965 · Vietnam divided at the 17th parallel since 1954',
    labels: [
      { lon: 105.85, lat: 21.03, text: 'Hanoi', size: .55, dot: true }, { lon: 106.7, lat: 10.8, text: 'Saigon', size: .55, dot: true },
      { lon: 108.0, lat: 13.98, text: 'Pleiku', size: .55, dot: true }, { lon: 108.65, lat: 13.9, text: 'An Khe', size: .5, dot: true },
      { lon: 107.6, lat: 13.45, text: 'Cambodia', size: .55, italic: true },
      { lon: 107.72, lat: 13.57, text: 'IA DRANG', size: .85, pin: true }
    ]
  },

  /* ---------- Opening narration (the X-Ray map stays visible behind it) ---------- */
  intro: [
    {
      title: 'BATTLE OF THE IA DRANG',
      media: [
        { at: 0,  file: '01-huey-landing-xray.jpg', caption: 'Major Bruce Crandall\u2019s UH-1D climbs away after dropping a load of infantrymen in the Ia Drang valley, November 1965. His crews flew ammunition into X-Ray and the wounded out all through the battle.', ref: 'Ia Drang valley, November 1965; US Army photograph', credit: 'Photo: United States Army, public domain (Wikimedia Commons, File:Bruce Crandall\u2019s UH-1D.jpg)' },
        { at: 12, file: '02-ia-drang-campaign-map.jpg', caption: 'The battle of the Ia Drang, 14 to 20 November 1965: Plei Me, the Chu Pong, LZ X-Ray and LZ Albany, the artillery at Falcon, and the sanctuaries across the Cambodian border. The note at the bottom warns that the whole area is heavy forest broken by elephant grass.', ref: 'US Army map of the Ia Drang campaign', credit: 'Map: United States Army, public domain (Wikimedia Commons, Iadrang-map.jpg)' }
      ],
      subtitle: '14–18 November 1965 · Central Highlands, South Vietnam',
      focus: { x: 1300, y: 880 }, zoom: 1.1,
      markers: [ { x: 1300, y: 880, label: 'LZ X-Ray' } ],
      auto: 14,
      lines: [
        { text: 'The first battle between the United States Army and the regular army of North Vietnam: three days in a clearing below a mountain, and one more on the trail to the next clearing.', tag: 'established' },
        { text: 'Both armies wrote it up, and they disagree about almost everything except that it happened. This introduction tags what each side says and what historians accept. Watch for the coloured tags.', tag: 'reconstruction' }
      ]
    },
    {
      title: 'A new kind of war',
      media: [
        { at: 0,  file: '03-1st-cav-an-khe.jpg', caption: 'The 1st Cavalry Division (Airmobile) arrives at An Khe in September 1965: the first division built around helicopters, with more than 400 aircraft.', ref: 'An Khe base camp, Binh Dinh province, 1965', credit: 'US Army, public domain' },
        { at: 9,  file: '04-ho-chi-minh-trail.jpg', caption: 'North Vietnamese regiments walked south for two months along the Ho Chi Minh trail through Laos and Cambodia to reach the Central Highlands.', ref: 'Ho Chi Minh trail, 1960s', credit: 'Public domain' },
        { at: 18, file: '05-westmoreland-1965.jpg', caption: 'General William Westmoreland, commanding US forces in Vietnam. In 1965 he moved from defending bases to seeking out and destroying North Vietnamese units.', ref: 'MACV, Saigon, 1965', credit: 'US Army, public domain' }
      ],
      focus: { x: 1300, y: 880 }, zoom: .9,
      auto: 24,
      lines: [
        { text: 'In 1965 the United States sent its own ground forces into South Vietnam. The 1st Cavalry Division (Airmobile), the first division built around the helicopter, arrived at An Khe in the Central Highlands in September.', tag: 'established' },
        { text: 'North Vietnam had sent whole regiments of its regular army, the People’s Army of Vietnam, down the Ho Chi Minh trail to the Highlands. Their plan, by their own account, was to cut South Vietnam in two from the Cambodian border to the coast.', tag: 'pavn', cite: 'Victory in Vietnam: The Official History of the People’s Army of Vietnam (1988; English 2002), ch. 7' },
        { text: 'Each side wanted to test the other. The Americans wanted to find the regulars and destroy them with helicopters, artillery and aircraft. The North Vietnamese wanted to learn how to fight the Americans, and to kill enough of them to matter.', tag: 'established' }
      ]
    },
    {
      title: 'Plei Me',
      media: [
        { at: 0,  file: '06-plei-me-camp.jpg', caption: 'The Special Forces camp at Plei Me, besieged by the North Vietnamese 33rd Regiment from 19 October 1965. The siege was the bait for an ambush of the relief column.', ref: 'Plei Me, Gia Lai province, October 1965', credit: 'US Army, public domain' },
        { at: 12, file: '07-1st-cav-sky-soldiers.jpg', caption: 'Troopers of the 1st Cavalry Division in the Highlands, late 1965. From 27 October the division searched westward for the regiments that had attacked Plei Me.', ref: 'Pleiku province, 1965', credit: 'US Army, public domain' }
      ],
      focus: { x: 1300, y: 880 }, zoom: .9,
      auto: 24,
      lines: [
        { text: 'On 19 October the PAVN 33rd Regiment besieged the Special Forces camp at Plei Me, forty kilometres south-west of Pleiku, while the 32nd Regiment waited to ambush the relief column. The siege failed, and the regiments pulled back west toward the Chu Pong massif and the Cambodian border.', tag: 'established' },
        { text: 'General Westmoreland ordered the 1st Cavalry Division to pursue. For three weeks its brigades leap-frogged west by helicopter, found caches and hospitals, and fought small actions. On 14 November the 3rd Brigade sent one battalion into the Ia Drang valley to look for the enemy at the foot of the mountain.', tag: 'established' },
        { text: 'The Vietnamese account says the B3 Front had gathered three regiments near the Chu Pong to rest and to prepare a second attack on Plei Me, and that the 66th Regiment had arrived from the trail only days before.', tag: 'pavn', cite: 'Nguyen Huu An, Chien truong moi (New Battlefield), memoir (1995); PAVN official history, ch. 7' }
      ]
    },
    {
      title: 'The American army',
      media: [
        { at: 0,  file: '08-hal-moore.jpg', caption: 'Lieutenant Colonel Harold G. Moore, commanding the 1st Battalion, 7th Cavalry. He landed with the first lift and was the last man of his battalion to leave.', ref: 'US Army photograph', credit: 'US Army, public domain' },
        { at: 10, file: '09-uh1d-troop-lift.jpg', caption: 'A flight of UH-1D Hueys comes in to pick up South Vietnamese Rangers near Saigon in 1965: the airmobile method the 1st Cavalry Division brought to the Highlands. Sixteen Hueys carried Moore\u2019s battalion to X-Ray, eight to ten men at a time, on a round trip of about thirty minutes.', ref: 'Near Saigon, 1965; Library of Congress, New York World-Telegram & Sun collection', credit: 'Photo: United States Army, public domain (Wikimedia Commons, US Army UH-1Ds near Saigon 1965.jpg)' },
        { at: 20, file: '10-105mm-howitzer.jpg', caption: 'An M101 105 mm howitzer crew on a hilltop fire base in Vietnam. Twelve guns like this at LZ Falcon, eight kilometres east of X-Ray, fired more than four thousand rounds in the first day of the battle.', ref: 'US Air War College photograph, Vietnam', credit: 'Photo: US Department of Defense, public domain (Wikimedia Commons, M101 105mm Howitzer.jpg)' },
        { at: 30, file: '18-arc-light-map.jpg', caption: 'The Arc Light boxes: each shaded square is a map grid bombed by B-52s on the date written in it, 15 to 20 November, across the Chu Pong west of X-Ray.', ref: 'Map of Arc Light strikes, Pleiku campaign, November 1965', credit: 'Wikimedia Commons (Arc Light operation at Chu Pong November 1965.jpg)' }
      ],
      focus: { x: 1300, y: 880 }, zoom: 1.2,
      markers: [ { x: 1300, y: 880, label: 'LZ X-Ray' } ],
      auto: 26,
      lines: [
        { text: 'The 1st Battalion, 7th Cavalry, Custer’s old regiment, under Lieutenant Colonel Harold G. Moore: 431 men on the day, in three rifle companies, a weapons company with mortars, and a headquarters. Rifle companies carried the new M16 rifle, M60 machine guns and M79 grenade launchers.', tag: 'us', cite: 'Moore, After Action Report, 1st Bn 7th Cav, 9 December 1965' },
        { text: 'Its strength was what it could call on: sixteen Huey transports, rocket-firing helicopters, two batteries of 105 mm howitzers at LZ Falcon eight kilometres away, fighter-bombers on call, and, for the first time in close support, B-52 bombers.', tag: 'established' },
        { text: 'Its weakness was the lift. Sixteen helicopters carried about a company each trip, and a trip took half an hour. The whole battalion needed four hours to land, and whoever was on the ground first would be alone.', tag: 'established' }
      ]
    },
    {
      title: 'The North Vietnamese army',
      media: [
        { at: 0,  file: '11-pavn-infantry.jpg', caption: 'Soldiers of the People’s Army of Vietnam on the march. The 66th Regiment reached the Chu Pong in early November 1965 after two months on the trail.', ref: 'Vietnam, 1960s', credit: 'Public domain (Vietnam News Agency)' },
        { at: 10, file: '12-nguyen-huu-an.jpg', caption: 'Nguyen Huu An, the field commander at the Ia Drang, later a general and a historian of the battle. He met Moore and Galloway in Hanoi in 1993 and walked the ground with them.', ref: 'Hanoi, 1990s', credit: 'Public domain (Vietnam)' },
        { at: 20, file: '13-ak47-rpg.jpg', caption: 'The AK-47 rifle and the RPG-2 rocket launcher: the weapons of the PAVN assault companies, with 82 mm mortars and 12.7 mm machine guns in the heavy weapons units.', ref: 'Museum display', credit: 'Wikimedia Commons' }
      ],
      focus: { x: 500, y: 800 }, zoom: .9,
      markers: [ { x: 420, y: 760, label: 'Chu Pong massif' } ],
      auto: 26,
      lines: [
        { text: 'The B3 Front under Chu Huy Man held three regiments of regulars near the Chu Pong: the 32nd and 33rd, tired from Plei Me, and the fresh 66th, with the H-15 Viet Cong battalion. On the mountain above X-Ray were the three battalions of the 66th and part of the 33rd.', tag: 'established' },
        { text: 'The Vietnamese account gives the field command to Nguyen Huu An, deputy commander of the Front, who watched the helicopters land from the slope and ordered an attack within the hour, before the Americans could dig in or bring the rest of their battalion.', tag: 'pavn', cite: 'Nguyen Huu An, New Battlefield (1995); Moore & Galloway, We Were Soldiers Once… and Young, ch. 3' },
        { text: 'Their method was to get so close that American artillery and aircraft could not be used: in An’s phrase, to grab the enemy by the belt. Assault companies with AK-47s, grenades and rocket launchers, heavy weapons on the slope, and a withdrawal into the mountain when the fight turned.', tag: 'pavn' },
        { text: 'How many fought at X-Ray is not recorded. American estimates put about two thousand North Vietnamese on the mountain against 450 Americans on the first day.', tag: 'estimate', cite: 'Carland, Stemming the Tide (2000), ch. 5' }
      ]
    },
    {
      title: 'The ground',
      media: [
        { at: 0,  file: '14-chu-pong-massif.jpg', caption: 'The Chu Pong massif, rising 500 metres above the valley floor, with the border of Cambodia along its far side.', ref: 'Ia Drang valley, Gia Lai province', credit: 'Wikimedia Commons' },
        { at: 12, file: '15-termite-mound.jpg', caption: 'A termite mound of the Highlands, head high and hard as brick. Moore put his command post behind one; the North Vietnamese used them as cover too.', ref: 'Central Highlands', credit: 'Wikimedia Commons' }
      ],
      focus: { x: 1150, y: 950 }, zoom: 1.3,
      markers: [ { x: 980, y: 880, label: 'Dry creek bed' }, { x: 1300, y: 880, label: 'The clearing' } ],
      auto: 22,
      lines: [
        { text: 'Ia means river in the Jarai language. The Ia Drang runs west from the Chu Pong into Cambodia. At the foot of the mountain lay a clearing the size of a football field, named X-Ray on the map: scrub, elephant grass, trees up to thirty metres tall, and termite mounds taller than a man.', tag: 'established' },
        { text: 'A dry creek bed ran north and south a hundred metres west of the clearing, between it and the mountain. It became the front line. It was the dry season, forty degrees in the sun, and the grass burned where the napalm fell.', tag: 'us' },
        { text: 'Our map is a reconstruction: the clearing, the creek bed and the slope are placed from the American sketch maps, with the mountain off the western edge.', tag: 'reconstruction' }
      ]
    },
    {
      title: 'The gamble',
      media: [
        { at: 0,  file: '16-xray-sketch-map.jpg', caption: 'The X-Ray perimeter on the night of 14 November, from the battalion\u2019s after-action report: C Company on the south, A and B toward the mountain, B Company of the 2nd Battalion on the east, the mortars pooled inside, and the top of the Chu Pong off to the north-west.', ref: 'Moore, After Action Report, 1st Bn 7th Cav, December 1965', credit: 'Sketch: United States Army, public domain (Wikimedia Commons)' },
        { at: 12, file: '17-xray-perimeter.jpg', caption: 'Troopers of the 1st Cavalry in the perimeter at X-Ray. The battle was fought at the range of a thrown grenade.', ref: 'LZ X-Ray, November 1965', credit: 'US Army, public domain' }
      ],
      focus: { x: 1300, y: 880 }, zoom: 1.1,
      markers: [ { x: 1300, y: 880, label: 'LZ X-Ray' } ],
      auto: 22,
      lines: [
        { text: 'On the morning of 14 November Moore flew over the valley, chose X-Ray from three possible clearings, and ordered twenty minutes of artillery, rockets and air strikes on its edges. At 10:48 the first eight Hueys touched down with B Company and the battalion commander.', tag: 'us', cite: 'Moore, After Action Report; Moore & Galloway, ch. 5–6' },
        { text: 'A kilometre away, on the slope, two regiments of the North Vietnamese army were resting. Whether the Americans had landed next to the enemy by luck or by design, the fight that followed decided how both armies would fight the rest of the war.', tag: 'established' },
        { text: 'Choose how to see it: watch the reenactment as the sources describe it, or take command of either side and try to do better.', tag: 'reconstruction' }
      ]
    },
    {
      title: 'Choose',
      choice: true,
      focus: { x: 1300, y: 880 }, zoom: 1.1,
      auto: 9999,
      lines: [
        { text: 'Watch the battle unfold, or take command.', tag: 'reconstruction' }
      ]
    }
  ],

  /* ---------- The battle, in parts. Each part has its own map, formations, events and AI. ---------- */
  parts: [
  {
    id: 'xray',
    title: 'LZ X-Ray', subtitle: '14–16 November 1965',
    duration: 256,          // seconds of reenactment at 1x speed
    commandDuration: 330,   // seconds before a command-mode battle is called a stalemate
    world: { w: 2400, h: 1800 },
    clockStart: 'Day 1 · 10:17',
    heliFrom: { x: 2460, y: 640 },   // helicopters come and go from the east edge (Plei Me and LZ Falcon lie that way)
    rally: { us: { x: 1300, y: 880 }, pavn: { x: 380, y: 1000 } },
    battlefield: {
      scale: { px: 100, label: '≈ 100 m (schematic)' },
      features: [
        { kind: 'slope', poly: [[0,0],[520,0],[690,380],[760,900],[700,1300],[900,1800],[0,1800]], name: 'CHU PONG MASSIF' },
        { kind: 'woods', x: 1300, y: 300,  rx: 620, ry: 250 }, { kind: 'woods', x: 1950, y: 650,  rx: 480, ry: 380 }, { kind: 'woods', x: 1850, y: 1420, rx: 600, ry: 360 },
        { kind: 'woods', x: 1120, y: 1520, rx: 420, ry: 260 }, { kind: 'woods', x: 960,  y: 520,  rx: 300, ry: 240 }, { kind: 'woods', x: 2150, y: 180,  rx: 380, ry: 180 },
        { kind: 'woods', x: 880,  y: 1150, rx: 260, ry: 200 }, { kind: 'woods', x: 1600, y: 1120, rx: 300, ry: 160 },
        { kind: 'grass', x: 1680, y: 980,  rx: 220, ry: 130 }, { kind: 'grass', x: 1060, y: 1230, rx: 170, ry: 110 }, { kind: 'grass', x: 1520, y: 590,  rx: 220, ry: 110 }, { kind: 'grass', x: 1250, y: 1300, rx: 200, ry: 100 },
        { kind: 'creek', pts: [[700,150],[800,420],[920,720],[1010,1040],[1120,1380],[1240,1800]], width: 26, name: 'dry creek bed' },
        { kind: 'clearing', x: 1300, y: 880, rx: 180, ry: 135, name: 'LZ X-RAY' },
        { kind: 'lz', name: 'LZ X-Ray', id: 'xray', x: 1300, y: 880, r: 150 },
        { kind: 'trail', pts: [[1300,1800],[1280,1500],[1300,1150],[1320,1000]] },
        { kind: 'mound', x: 1340, y: 840, r: 14, name: 'Moore’s command post' }, { kind: 'mound', x: 1180, y: 960, r: 10 }, { kind: 'mound', x: 1410, y: 940, r: 9 }, { kind: 'mound', x: 1230, y: 780, r: 11 },
        { kind: 'mound', x: 1050, y: 870, r: 9 }, { kind: 'mound', x: 980, y: 1000, r: 10 }, { kind: 'mound', x: 1120, y: 1060, r: 8 }, { kind: 'mound', x: 1470, y: 1040, r: 10 }, { kind: 'mound', x: 1560, y: 820, r: 9 },
        { kind: 'mound', x: 820, y: 990, r: 12, name: 'the knoll' }, { kind: 'mound', x: 860, y: 1030, r: 9 }, { kind: 'mound', x: 1400, y: 640, r: 9 }, { kind: 'mound', x: 1150, y: 700, r: 8 }, { kind: 'mound', x: 1700, y: 1200, r: 10 }
      ],
      labels: [
        { x: 330, y: 760, text: 'CHU PONG MASSIF', rotate: -1.2 },
        { x: 1300, y: 40, text: 'Ia Drang river 2 km ↑', small: true },
        { x: 2180, y: 120, text: 'to LZ Albany 4 km ↗', small: true },
        { x: 2170, y: 560, text: 'to LZ Falcon (artillery) 8 km →', small: true },
        { x: 2170, y: 1740, text: 'to Plei Me 20 km ↘', small: true },
        { x: 560, y: 1560, text: 'Cambodia 10 km ↙', small: true },
        { x: 905, y: 1180, text: 'dry creek bed', small: true, rotate: 1.25 }
      ]
    },

    formations: [
      // United States: every formation arrives by helicopter except Tully's battalion, which walks in from the east.
      { id: 'cp',     side: 'us', name: 'Moore & battalion command group', division: '1/7 CP', type: 'rifle', cols: 3, rows: 2, power: 1.1, x: 1345, y: 860, offmap: true,
        count: 'About 30 men', confidence: 'us', note: 'The battalion commander, his staff, the artillery and air controllers and the sergeant major, behind the big termite mound in the clearing.' },
      { id: 'b-co',   side: 'us', name: 'B Company, 1/7 Cavalry (Herren)', division: 'B 1/7', type: 'rifle', cols: 6, rows: 3, power: 1.0, x: 1230, y: 830, offmap: true,
        count: 'About 120 men', confidence: 'us', note: 'First on the ground. Sent toward the mountain, it made the first contact and lost a platoon on the finger.' },
      { id: 'b-2plt', side: 'us', name: 'B Co 2nd Platoon, the lost platoon (Herrick, then Savage)', division: 'Lost platoon', type: 'rifle', cols: 4, rows: 2, power: 1.0, x: 1180, y: 860, offmap: true, hidden: true,
        count: '29 men', confidence: 'us', note: 'Chased a withdrawing enemy squad, was cut off on a knoll and held out for 26 hours. Nine died, including its lieutenant; Sergeant Savage directed artillery around it all night.' },
      { id: 'a-co',   side: 'us', name: 'A Company, 1/7 Cavalry (Nadal)', division: 'A 1/7', type: 'rifle', cols: 6, rows: 3, power: 1.0, x: 1180, y: 960, offmap: true,
        count: 'About 115 men', confidence: 'us', note: 'Landed second. Held the creek bed on the south-west and twice attacked toward the lost platoon.' },
      { id: 'c-co',   side: 'us', name: 'C Company, 1/7 Cavalry (Edwards)', division: 'C 1/7', type: 'rifle', cols: 6, rows: 3, power: 1.0, x: 1320, y: 1030, offmap: true,
        count: 'About 110 men', confidence: 'us', note: 'Held the south of the perimeter. Nearly overrun at dawn on the second day; its commander was wounded and its platoon leaders killed.' },
      { id: 'd-co',   side: 'us', name: 'D Company, 1/7 Cavalry (mortars, recon)', division: 'D 1/7', type: 'weapons', cols: 4, rows: 2, power: 1.0, x: 1410, y: 790, offmap: true,
        count: 'Mortar platoon and recon platoon', confidence: 'us', note: 'The battalion’s 81 mm mortars were pooled in the clearing. The recon platoon was the reserve.' },
      { id: 'b27',    side: 'us', name: 'B Company, 2/7 Cavalry (Diduryk)', division: 'B 2/7', type: 'rifle', cols: 6, rows: 3, power: 1.0, x: 1450, y: 960, offmap: true,
        count: 'About 120 men', confidence: 'us', note: 'The first reinforcement, flown in on the evening of the first day. Beat off the last assault on the third morning.' },
      { id: 'a27',    side: 'us', name: 'A Company, 2/7 Cavalry', division: 'A 2/7', type: 'rifle', cols: 6, rows: 3, power: 1.0, x: 1300, y: 720, offmap: true,
        count: 'About 110 men', confidence: 'us', note: 'Flown in on the morning of the second day.' },
      { id: 'tully',  side: 'us', name: '2nd Battalion, 5th Cavalry (Tully)', division: '2/5 Cav', type: 'rifle', cols: 7, rows: 3, power: 1.2, x: 2380, y: 700, offmap: true, speed: 12,
        count: 'About 400 men', confidence: 'us', note: 'Marched overland from LZ Victor and arrived at noon on the second day. Its companies relieved the lost platoon.' },
      // North Vietnam: on the mountain, unseen until they attack.
      { id: '9bn-a',  side: 'pavn', name: '9th Battalion, 66th Regiment (first companies)', division: '9th Bn', type: 'assault', cols: 7, rows: 3, power: 1.1, x: 540, y: 620, hidden: true, ai: 'wave',
        count: 'A battalion of about 400', confidence: 'estimate', note: 'The first to attack, within two hours of the landing. By the Vietnamese account it had reached the mountain only days before and some of its men had never been in action.' },
      { id: '9bn-b',  side: 'pavn', name: '9th Battalion, 66th Regiment (remaining companies)', division: '9th Bn', type: 'assault', cols: 6, rows: 3, power: 1.0, x: 470, y: 860, hidden: true, ai: 'wave',
        count: 'Part of the battalion', confidence: 'estimate', note: 'Surrounded the lost platoon and fought A and B Companies in the creek bed.' },
      { id: '7bn-a',  side: 'pavn', name: '7th Battalion, 66th Regiment (first companies)', division: '7th Bn', type: 'assault', cols: 7, rows: 3, power: 1.1, x: 560, y: 1260, hidden: true, ai: 'wave',
        count: 'A battalion of about 400', confidence: 'estimate', note: 'Attacked C Company from the south on the first afternoon and again, with the Viet Cong battalion, at dawn on the second day.' },
      { id: '7bn-b',  side: 'pavn', name: '7th Battalion, 66th Regiment (remaining companies)', division: '7th Bn', type: 'assault', cols: 6, rows: 3, power: 1.0, x: 700, y: 1520, hidden: true, ai: 'wave',
        count: 'Part of the battalion', confidence: 'estimate', note: 'Probed the perimeter through the first night and joined the dawn assault.' },
      { id: 'h15',    side: 'pavn', name: 'H-15 Viet Cong Battalion', division: 'H-15', type: 'assault', cols: 6, rows: 3, power: .9, x: 1250, y: 1690, hidden: true, ai: 'wave',
        count: 'Perhaps 300', confidence: 'estimate', note: 'Local main-force Viet Cong attached to the regulars. Attacked from the south-east at dawn on the second day.' },
      { id: '8bn',    side: 'pavn', name: '8th Battalion, 66th Regiment', division: '8th Bn', type: 'assault', cols: 7, rows: 3, power: 1.1, x: 430, y: 1100, hidden: true, ai: 'wave',
        count: 'A battalion of about 400', confidence: 'estimate', note: 'Held back, then made the last assault before dawn on the third day. Marched on to ambush the column at Albany.' },
      { id: 'hw',     side: 'pavn', name: 'Heavy weapons: 12.7 mm guns and 82 mm mortars', division: 'Heavy weapons', type: 'heavy', cols: 4, rows: 2, power: 1.0, x: 640, y: 980, hidden: true,
        count: 'Several guns and mortars', confidence: 'estimate', note: 'Machine guns on the finger of the mountain covered the approaches to the lost platoon. Mortars fell on the clearing throughout.' },
      { id: 'recon',  side: 'pavn', name: 'Reconnaissance cell', division: 'Recon', type: 'recon', cols: 3, rows: 1, power: 1.0, x: 1010, y: 720, hidden: true,
        count: 'A few men', confidence: 'reconstruction', note: 'Scouts watched the clearing from the creek bed. The deserter B Company captured on the first morning had been without food for five days.' },
      { id: 'an',     side: 'pavn', name: 'Nguyen Huu An & command post', division: 'Command', type: 'recon', cols: 2, rows: 1, power: 1.0, x: 390, y: 920, hidden: true,
        count: 'The field commander and staff', confidence: 'pavn', note: 'By his own account An directed the battle from the slope with a field telephone and runners, and withdrew up the mountain under the bombing on the second day.' }
    ],

    /* ---------- Watch mode: the historical orders, in order ---------- */
    events: [
      { t: 0, title: 'Prep fires and the first lift', tag: 'us', clock: 'Day 1 · 10:17', light: 'day', focus: { x: 1300, y: 880 },
        text: 'Twenty minutes of artillery, rockets and air strikes fall on the edges of the clearing. At 10:48 the first eight Hueys land B Company and the battalion commander. The clearing is quiet. Moore sends squads into the trees to look.',
        explain: 'Why land one company into the unknown? The sixteen helicopters could carry about a company a trip, and a trip took thirty minutes. Moore chose to land the lead company and let the rest follow rather than wait for a bigger lift that did not exist. The prep fires were meant to keep any enemy heads down while the first troopers got off the aircraft.',
        orders: [
          { fire: { kind: 'arty', at: { x: 1120, y: 760 }, r: 70, delay: 1 } }, { fire: { kind: 'arty', at: { x: 1480, y: 1000 }, r: 70, delay: 2 } }, { fire: { kind: 'air', at: { x: 1100, y: 1020 }, r: 90, delay: 3.5 } }, { fire: { kind: 'arty', at: { x: 1400, y: 720 }, r: 70, delay: 4.5 } },
          { id: 'b-co', lift: true, delay: 6 }, { id: 'cp', lift: true, delay: 7 },
          { id: 'b-co', then: 'hold' }
        ] },
      { t: 14, title: 'A prisoner', tag: 'us', clock: 'Day 1 · 11:20', focus: { x: 1120, y: 800 },
        text: 'B Company captures a deserter: an unarmed North Vietnamese soldier who has eaten only bananas for five days. He says there are three battalions on the mountain that want very much to kill Americans. Moore orders B Company toward the mountain to find them before they find the clearing.',
        explain: 'The prisoner changed everything. Moore now knew he had landed beside a large force and that the rest of his battalion was still half an hour away. His choice was to push B Company out toward the creek bed and the mountain, to meet the enemy away from the landing zone where the helicopters had to come in.',
        orders: [ { id: 'recon', visible: true, to: { x: 930, y: 700 }, speed: 22, then: 'hold' }, { id: 'b-co', to: { x: 1000, y: 820 }, speed: 14 }, { id: 'b-2plt', visible: true, at: { x: 1150, y: 870 }, to: { x: 960, y: 900 }, speed: 15 } ] },
      { t: 28, title: 'A Company lands', tag: 'us', clock: 'Day 1 · 12:10', focus: { x: 1150, y: 900 },
        text: 'The second and third lifts bring A Company and part of C. A Company takes the creek bed to the south-west of the clearing. B Company reaches the creek and starts up the finger of the mountain beyond it. The first shots are heard from the slope.',
        explain: 'The creek bed ran north to south between the clearing and the mountain, a natural trench a metre deep. Holding it meant the enemy had to cross open ground to reach the landing zone. Everything the battalion did for the next two days was built on that line.',
        orders: [ { id: 'a-co', lift: true, delay: 1 }, { id: 'a-co', to: { x: 1040, y: 990 }, speed: 14, delay: 6 }, { id: 'b-co', to: { x: 900, y: 860 }, speed: 12 }, { id: 'recon', to: { x: 700, y: 760 }, speed: 22, then: 'hold' } ] },
      { t: 40, title: 'First contact', tag: 'us', clock: 'Day 1 · 12:45', focus: { x: 880, y: 860 },
        text: 'B Company’s lead platoon meets North Vietnamese soldiers coming down the slope and the fight begins. The 9th Battalion of the 66th Regiment is attacking toward the clearing. The 2nd Platoon under Lieutenant Herrick chases a withdrawing squad to the right and loses touch with the rest of the company.',
        explain: 'Both accounts agree that the first attack came from the 9th Battalion, launched within two hours of the landing. The Vietnamese account says An ordered it as soon as he was sure where the Americans were; the American account says the battalion had been resting and had to be roused. Either way the attack ran into B Company on the finger rather than into the clearing.',
        orders: [
          { id: '9bn-a', visible: true, to: { x: 820, y: 800 }, speed: 18, state: 'attack' },
          { id: 'b-co', to: { x: 900, y: 860 }, state: 'hold' }, { id: 'b-2plt', to: { x: 840, y: 1000 }, speed: 16 },
          { id: 'hw', visible: true, to: { x: 640, y: 980 }, state: 'hold' }
        ] },
      { t: 54, title: 'The lost platoon', tag: 'us', clock: 'Day 1 · 13:30', focus: { x: 820, y: 1000 },
        text: 'Herrick’s platoon is cut off on a knoll a few hundred metres beyond the creek, surrounded by the rest of the 9th Battalion. Herrick is killed, then the sergeants who take over, until Sergeant Ernie Savage is in command with the radio. He calls artillery onto the slope around him and keeps calling it for the next twenty-six hours.',
        explain: 'Twenty-nine men went up the finger; nine were killed and thirteen wounded. The platoon survived because its position on the knoll was good, because the North Vietnamese could not bring enough men against it without walking into the artillery Savage directed, and because the enemy had bigger targets. Both battalions tried to reach it that afternoon and both failed.',
        orders: [
          { id: 'b-2plt', to: { x: 820, y: 1000 }, state: 'hold', strengthTo: 45, over: 10 },
          { id: '9bn-b', visible: true, to: { x: 760, y: 1070 }, speed: 18, state: 'attack' }, { id: '9bn-a', to: { x: 880, y: 940 }, state: 'attack', strengthTo: 70, over: 12 },
          { fire: { kind: 'arty', at: { x: 720, y: 1040 }, r: 70, delay: 2 } }, { fire: { kind: 'arty', at: { x: 760, y: 920 }, r: 70, delay: 4 } }, { fire: { kind: 'arty', at: { x: 880, y: 1090 }, r: 70, delay: 6 } }, { fire: { kind: 'arty', at: { x: 700, y: 1000 }, r: 70, delay: 9 } }
        ] },
      { t: 68, title: 'Attack from the south', tag: 'established', clock: 'Day 1 · 14:30', focus: { x: 1250, y: 1050 },
        text: 'C Company has landed and spread out along the south of the clearing when the 7th Battalion of the 66th Regiment attacks it out of the trees. Mortar rounds fall on the landing zone. Helicopters land under fire with ammunition and lift out the wounded. Air strikes and artillery hit the attackers in the open ground south of the creek.',
        explain: 'The 7th Battalion came in from the south, aiming at the clearing itself. It met C Company in the open and the full weight of the artillery at LZ Falcon and the fighter-bombers overhead. The American account counts this as the attack that was broken by firepower; the Vietnamese account says its companies pressed in close enough that the Americans shelled their own perimeter.',
        orders: [
          { id: 'c-co', lift: true, delay: 1 }, { id: 'c-co', to: { x: 1300, y: 1050 }, speed: 14, delay: 5, then: 'hold' },
          { id: '7bn-a', visible: true, to: { x: 1200, y: 1180 }, speed: 18, state: 'attack' }, { id: 'hw', state: 'hold' },
          { id: 'd-co', lift: true, delay: 9 },
          { fire: { kind: 'air', at: { x: 1150, y: 1300 }, r: 100, delay: 8 } }, { fire: { kind: 'arty', at: { x: 1250, y: 1250 }, r: 70, delay: 10 } }, { fire: { kind: 'napalm', at: { x: 1060, y: 1320 }, r: 90, delay: 12 } },
          { heli: 'medevac', to: { x: 1380, y: 900 }, delay: 7 }
        ] },
      { t: 84, title: 'Into the creek bed', tag: 'us', clock: 'Day 1 · 16:20', focus: { x: 950, y: 950 },
        text: 'A and B Companies attack across the creek toward the lost platoon and are stopped by machine guns on the finger. Lieutenant Walter Marm runs at a gun behind a termite mound and destroys it with a grenade and his rifle, and is shot through the face; he will receive the Medal of Honor. At dusk Moore pulls both companies back to the creek bed.',
        explain: 'Why pull back? The attack had gained a hundred metres at a cost the battalion could not repeat, and darkness was an hour away. A perimeter that could be held through the night mattered more than the platoon on the knoll, which was still alive and still had artillery. It is the hardest decision in the American account, and Moore defends it in detail.',
        orders: [
          { id: 'a-co', to: { x: 930, y: 1000 }, speed: 12, state: 'attack', strengthTo: 70, over: 10 }, { id: 'b-co', to: { x: 880, y: 900 }, speed: 12, state: 'attack', strengthTo: 72, over: 10 },
          { id: '9bn-b', strengthTo: 55, over: 10 }, { id: '9bn-a', to: { x: 800, y: 860 }, strengthTo: 50, over: 10 }, { id: 'hw', strengthTo: 70, over: 8 },
          { id: '7bn-a', to: { x: 900, y: 1350 }, speed: 18, state: 'move', strengthTo: 60, over: 10 },
          { id: 'a-co', to: { x: 1040, y: 1000 }, speed: 12, state: 'move', delay: 9, then: 'dig' }, { id: 'b-co', to: { x: 1000, y: 840 }, speed: 12, state: 'move', delay: 9, then: 'dig' }
        ] },
      { t: 100, title: 'Reinforcements', tag: 'us', clock: 'Day 1 · 18:00', light: 'dusk', focus: { x: 1350, y: 900 },
        text: 'B Company of the 2nd Battalion, 7th Cavalry, lands at dusk and takes the east and south-east of the perimeter. The reporter Joe Galloway comes in on one of the last helicopters. The battalion digs in around the clearing with the creek bed as its western wall. Every man knows the enemy will come in the night.',
        explain: 'The perimeter now had five rifle companies and the mortars, with artillery registered on every approach. The North Vietnamese account says An had decided to let the night pass with probes and to attack with everything at first light, when the aircraft could not yet see and the Americans would be tired.',
        orders: [
          { id: 'b27', lift: true, delay: 1 }, { id: 'b27', to: { x: 1450, y: 980 }, speed: 14, delay: 5, then: 'dig' },
          { id: 'cp', state: 'dig' }, { id: 'c-co', to: { x: 1300, y: 1050 }, state: 'move', then: 'dig' }, { id: 'd-co', state: 'dig' },
          { id: '9bn-a', to: { x: 620, y: 760 }, speed: 15, state: 'move' }, { id: '9bn-b', to: { x: 700, y: 1120 }, speed: 15, state: 'move', then: 'hold' },
          { id: '7bn-b', visible: true, to: { x: 1000, y: 1420 }, speed: 15, then: 'hold' }
        ] },
      { t: 116, title: 'The first night', tag: 'established', clock: 'Day 1 · 23:00', light: 'night', focus: { x: 900, y: 1000 },
        text: 'Flares hang over the clearing. The lost platoon is attacked three times in the night and holds, with Savage walking the artillery in to within fifty metres. Probes hit C Company and the creek bed. At the command post the radios count the rounds: by morning the batteries at LZ Falcon have fired more than four thousand.',
        explain: 'Night fighting favoured the North Vietnamese, who could move close without being seen from the air, but the artillery did not need to see. The platoon on the knoll was ringed with pre-planned fires, and the perimeter had flares from a C-123 overhead. Both sides spent the night preparing for the morning.',
        orders: [
          { id: '9bn-b', to: { x: 780, y: 1060 }, speed: 15, state: 'attack', strengthTo: 45, over: 12 }, { id: 'b-2plt', strengthTo: 38, over: 12 },
          { id: '7bn-b', to: { x: 1180, y: 1200 }, speed: 15, state: 'attack', strengthTo: 80, over: 10 },
          { fire: { kind: 'arty', at: { x: 760, y: 1070 }, r: 70, delay: 3 } }, { fire: { kind: 'arty', at: { x: 880, y: 1060 }, r: 70, delay: 6 } }, { fire: { kind: 'arty', at: { x: 1150, y: 1280 }, r: 70, delay: 9 } }, { fire: { kind: 'arty', at: { x: 720, y: 960 }, r: 70, delay: 12 } },
          { id: '7bn-b', to: { x: 1050, y: 1420 }, speed: 15, state: 'move', delay: 10, then: 'hold' }, { id: '9bn-b', to: { x: 700, y: 1130 }, speed: 15, state: 'move', delay: 12, then: 'hold' }
        ] },
      { t: 134, title: 'Dawn assault', tag: 'established', clock: 'Day 2 · 06:20', light: 'dawn', focus: { x: 1280, y: 1120 },
        text: 'At first light the 7th Battalion and the H-15 Viet Cong Battalion come out of the trees at C Company from the south and south-east, hundreds of men at a run. They reach the foxholes. Captain Edwards is shot; every platoon leader in C Company is killed or wounded. The fight is at grenade range along the whole southern arc.',
        explain: 'This was the main North Vietnamese effort of the battle, and the Vietnamese account treats it as the moment the Americans nearly broke. The American account agrees that C Company lost half its strength in an hour and that the line held only because the mortars, the reserve and every available rifle were thrown into it.',
        orders: [
          { id: '7bn-a', visible: true, at: { x: 1150, y: 1420 }, to: { x: 1260, y: 1110 }, speed: 20, state: 'attack', strength: 75 }, { id: '7bn-b', to: { x: 1180, y: 1150 }, speed: 20, state: 'attack' },
          { id: 'h15', visible: true, to: { x: 1420, y: 1110 }, speed: 20, state: 'attack' },
          { id: 'c-co', strengthTo: 35, over: 14 }, { id: 'd-co', to: { x: 1340, y: 960 }, speed: 10, state: 'attack', delay: 6 }, { id: 'b27', strengthTo: 80, over: 14 },
          { id: '9bn-a', to: { x: 860, y: 820 }, speed: 18, state: 'attack', delay: 8 }, { id: 'a-co', strengthTo: 60, over: 14 }
        ] },
      { t: 150, title: 'Broken Arrow', tag: 'us', clock: 'Day 2 · 07:55', light: 'day', focus: { x: 1300, y: 950 },
        text: 'Lieutenant Charlie Hastings, the air force controller, sends the code word Broken Arrow: an American unit is about to be overrun. Every aircraft in South Vietnam is diverted to X-Ray and stacked overhead. Napalm falls so close that two canisters hit the command post, burning soldiers and cooking off ammunition. By ten o’clock the assault is broken and the survivors are pulling back into the trees.',
        explain: 'Broken Arrow put more than two hundred fighter-bomber sorties over a clearing the size of a football field. The North Vietnamese account says its battalions were caught in the open by the aircraft as they tried to close, and admits that the second morning cost the 66th Regiment heavily. The American account counts the bodies in front of C Company by the hundred.',
        orders: [
          { fire: { kind: 'air', at: { x: 1280, y: 1260 }, r: 110, delay: 1 } }, { fire: { kind: 'napalm', at: { x: 1360, y: 1230 }, r: 100, delay: 3 } }, { fire: { kind: 'air', at: { x: 1150, y: 1230 }, r: 110, delay: 4.5 } },
          { fire: { kind: 'napalm', at: { x: 1330, y: 880 }, r: 60, delay: 6 } }, { fire: { kind: 'air', at: { x: 1480, y: 1200 }, r: 110, delay: 7.5 } }, { fire: { kind: 'arty', at: { x: 1200, y: 1320 }, r: 70, delay: 9 } }, { fire: { kind: 'air', at: { x: 900, y: 850 }, r: 110, delay: 10.5 } },
          { id: 'cp', strengthTo: 88, over: 6 },
          { id: '7bn-a', strengthTo: 30, over: 10 }, { id: '7bn-b', strengthTo: 45, over: 10 }, { id: 'h15', strengthTo: 40, over: 10 }, { id: '9bn-a', strengthTo: 30, over: 10 },
          { id: '7bn-a', to: { x: 900, y: 1500 }, speed: 15, state: 'move', delay: 9, then: 'hold' }, { id: '7bn-b', to: { x: 760, y: 1480 }, speed: 15, state: 'move', delay: 10, then: 'hold' }, { id: 'h15', to: { x: 1500, y: 1650 }, speed: 15, state: 'move', delay: 10, then: 'hold' }, { id: '9bn-a', to: { x: 600, y: 700 }, speed: 15, state: 'move', delay: 11, then: 'hold' }
        ] },
      { t: 168, title: 'Relief', tag: 'us', clock: 'Day 2 · 12:05', focus: { x: 1600, y: 800 },
        text: 'A Company of the 2nd Battalion lands in the morning. At noon Lieutenant Colonel Tully’s 2nd Battalion, 5th Cavalry, marches into the clearing from the east after a two-hour walk from LZ Victor. The perimeter now holds three battalions.',
        explain: 'The relief came overland rather than by air because the landing zone was still under mortar fire and the helicopters were needed for ammunition and the wounded. The walk showed that the valley east of X-Ray was empty: the North Vietnamese were all on the mountain side.',
        orders: [
          { id: 'a27', lift: true, delay: 1 }, { id: 'a27', to: { x: 1300, y: 720 }, speed: 14, delay: 5, then: 'dig' },
          { id: 'tully', visible: true, at: { x: 2380, y: 700 }, to: { x: 1560, y: 760 }, speed: 30 },
          { id: 'c-co', to: { x: 1340, y: 1010 }, state: 'move', then: 'dig' }
        ] },
      { t: 184, title: 'The lost platoon rescued', tag: 'established', clock: 'Day 2 · 15:10', focus: { x: 860, y: 1000 },
        text: 'Three companies walk up the finger behind a wall of artillery and reach the knoll. Savage and the survivors have held for twenty-six hours. The dead and wounded are carried down to the clearing and flown out.',
        explain: 'The rescue met little resistance: the 9th Battalion had pulled back into the mountain after the morning. The Vietnamese account barely mentions the platoon; in the American account it is the heart of the story.',
        orders: [
          { id: 'tully', to: { x: 960, y: 1010 }, speed: 14, state: 'attack' }, { id: 'a27', to: { x: 920, y: 900 }, speed: 14, state: 'attack' }, { id: 'b-co', to: { x: 880, y: 960 }, speed: 12, state: 'attack' },
          { fire: { kind: 'arty', at: { x: 700, y: 1060 }, r: 70, delay: 2 } }, { fire: { kind: 'arty', at: { x: 680, y: 920 }, r: 70, delay: 5 } },
          { id: '9bn-b', to: { x: 520, y: 1150 }, speed: 15, state: 'move', then: 'hold' },
          { id: 'b-2plt', to: { x: 1200, y: 860 }, speed: 12, state: 'move', delay: 8, then: 'hold' }, { id: 'tully', to: { x: 1500, y: 760 }, speed: 14, state: 'move', delay: 10, then: 'dig' }, { id: 'a27', to: { x: 1300, y: 720 }, speed: 14, state: 'move', delay: 10, then: 'dig' }, { id: 'b-co', to: { x: 1000, y: 840 }, speed: 12, state: 'move', delay: 10, then: 'dig' }
        ] },
      { t: 198, title: 'Arc Light', tag: 'established', clock: 'Day 2 · 16:00', focus: { x: 500, y: 900 },
        text: 'B-52 bombers from Guam drop their loads along the Chu Pong massif: the first time the strategic bombers are used in support of troops in contact. The mountain shakes for five days. The North Vietnamese command post moves higher up the slope.',
        explain: 'Arc Light strikes were planned a day ahead and fell on map squares, not on targets anyone could see. Their effect on the regiments is disputed: the American account assumes heavy losses in the mountain; the Vietnamese account says the units had already dispersed and the bombs fell on empty jungle and on the wounded.',
        orders: [
          { fire: { kind: 'arclight', along: [[300, 300], [250, 1600]], n: 9, r: 130, delay: 2 } },
          { id: 'an', to: { x: 300, y: 980 }, speed: 15, state: 'move', delay: 4, then: 'hold' }, { id: 'hw', strengthTo: 50, over: 10 }, { id: '8bn', visible: true, to: { x: 520, y: 1180 }, speed: 15, then: 'hold', delay: 6 }
        ] },
      { t: 212, title: 'The second night', tag: 'us', clock: 'Day 2 · 22:00', light: 'night', focus: { x: 1400, y: 1000 },
        text: 'The second night is quieter. Patrols find the enemy dead in the grass and the trees. The 8th Battalion of the 66th Regiment, held out of the fight so far, moves into position south of the clearing.',
        explain: 'Why attack again? The Vietnamese account says the 8th Battalion was fresh and the Front wanted one more blow before the Americans left. The American account says the attack hit the strongest part of the perimeter, where B Company of the 2nd Battalion had spent two days digging.',
        orders: [ { id: '8bn', to: { x: 1250, y: 1400 }, speed: 15, state: 'move', then: 'hold' }, { id: 'b27', state: 'dig' } ] },
      { t: 226, title: 'The last assault', tag: 'established', clock: 'Day 3 · 04:22', light: 'night', focus: { x: 1420, y: 1050 },
        text: 'Before dawn on the third day the 8th Battalion attacks B Company of the 2nd Battalion from the south-east. Artillery and flares catch the assault companies in the open; by half past six it is over. At five to seven the perimeter fires a mad minute into the trees and provokes one last rush, which is cut down.',
        explain: 'The mad minute, every weapon firing for sixty seconds at first light, was meant to trigger any enemy waiting to attack. It did. The American account counts the last attack as the clearest case of the battle: a battalion attacking dug-in infantry under artillery in the open, and losing.',
        orders: [
          { id: '8bn', to: { x: 1440, y: 1080 }, speed: 20, state: 'attack' }, { id: 'b27', strengthTo: 70, over: 10 },
          { fire: { kind: 'arty', at: { x: 1460, y: 1200 }, r: 70, delay: 3 } }, { fire: { kind: 'arty', at: { x: 1360, y: 1230 }, r: 70, delay: 5 } }, { fire: { kind: 'arty', at: { x: 1540, y: 1160 }, r: 70, delay: 7 } },
          { id: '8bn', strengthTo: 45, over: 10 }, { id: '8bn', to: { x: 1300, y: 1500 }, speed: 15, state: 'move', delay: 10, then: 'hold' }
        ] },
      { t: 242, title: 'The battalion flies out', tag: 'established', clock: 'Day 3 · 10:40', light: 'day', focus: { x: 1300, y: 880 }, end: true,
        text: 'The valley is quiet. The 1st Battalion, 7th Cavalry, is flown to Camp Holloway; Moore leaves last. Seventy-nine of its men are dead and 121 wounded. The 2nd Battalion and Tully’s battalion stay the night and will march out in the morning, one to LZ Columbus and one to a clearing named Albany.',
        explain: 'Why march rather than fly? Another Arc Light strike was due on the Chu Pong and the clearing was inside its safety line, so the two battalions had to be clear of it by midday. The march to Albany, four kilometres through grass and scrub, is the subject of the second part.',
        orders: [
          { id: 'b-co', lift: 'out', delay: 1 }, { id: 'a-co', lift: 'out', delay: 2.5 }, { id: 'c-co', lift: 'out', delay: 4 }, { id: 'd-co', lift: 'out', delay: 5.5 }, { id: 'b-2plt', lift: 'out', delay: 6 }, { id: 'cp', lift: 'out', delay: 8 }
        ] }
    ],

    /* ---------- Command mode AI ---------- */
    ai: {
      spotRange: 260, nightSpot: 140, beltRange: 70,
      pavn: {
        waves: [
          { t: 24,  ids: ['9bn-a', '9bn-b'], target: 'nearest' }, { t: 62,  ids: ['7bn-a', '7bn-b'], target: 'lz' },
          { t: 118, ids: ['9bn-a', '9bn-b'], target: 'nearest' }, { t: 140, ids: ['7bn-a', '7bn-b', 'h15'], target: 'lz' }, { t: 200, ids: ['8bn', '9bn-a'], target: 'lz' }, { t: 236, ids: ['8bn', '7bn-a', 'h15'], target: 'lz' }
        ],
        withdrawAt: 30, withdrawTo: { x: 420, y: 1000 }, regroupAfter: 30, hwFrom: { x: 640, y: 980 }
      },
      us: {
        lifts: [ { t: 1, id: 'b-co' }, { t: 2, id: 'cp' }, { t: 22, id: 'a-co' }, { t: 44, id: 'c-co' }, { t: 60, id: 'd-co' }, { t: 100, id: 'b27' }, { t: 160, id: 'a27' }, { t: 175, id: 'tully', walk: { x: 2380, y: 700 } } ],
        perimeter: { 'b-co': { x: 1060, y: 820 }, 'a-co': { x: 1110, y: 1000 }, 'c-co': { x: 1300, y: 1050 }, 'd-co': { x: 1410, y: 790 }, 'b27': { x: 1460, y: 970 }, 'a27': { x: 1300, y: 720 }, 'tully': { x: 1540, y: 760 }, 'cp': { x: 1345, y: 860 } },
        fireEvery: 9, airEvery: 24
      }
    },
    /* Fire support available to the US player: delay from the call, radius, strength lost by anyone inside (friend or enemy). */
    support: {
      arty:     { name: 'Artillery (LZ Falcon)', delay: 4, r: 70,  dmg: 28, cooldown: 7,  note: '105 mm howitzers, eight kilometres east. Four to six seconds from the call.' },
      air:      { name: 'Air strike',            delay: 9, r: 110, dmg: 40, cooldown: 25, note: 'Fighter-bombers on station; slower to arrive, wider and heavier.' },
      arclight: { name: 'Arc Light (B-52s)',     delay: 14, r: 130, dmg: 55, once: true, from: 150, note: 'One strike along the mountain, available from the second day.' }
    },
    outcome: [
      { text: 'The landing zone held for three days and the 1st Battalion, 7th Cavalry, was flown out. The United States counted 79 of its own dead and 121 wounded at X-Ray.', tag: 'us', cite: 'Moore, After Action Report, 9 December 1965' },
      { text: 'American officers counted 634 North Vietnamese bodies around the perimeter and estimated 1,215 killed in all, with six prisoners taken. The counts were made under fire and the estimate is not a count.', tag: 'us' },
      { text: 'Vietnamese histories give far lower figures for their own dead and claim many more Americans killed. Neither side’s figures for the other can be checked.', tag: 'pavn', cite: 'Victory in Vietnam (PAVN official history), ch. 7; Nguyen Huu An, New Battlefield' },
      { text: 'Both sides claimed victory. The Americans had held the ground and inflicted heavy losses with firepower; the North Vietnamese had closed with a US battalion and fought it for three days without being destroyed.', tag: 'established' },
      { text: 'The next day the 2nd Battalion, 7th Cavalry, marched toward LZ Albany and was ambushed. That is the second part of this battle.', tag: 'established' }
    ],
    commandLines: {
      startus:   'You command the 1st Battalion, 7th Cavalry. Your companies arrive by helicopter one lift at a time; hold the clearing so the lifts can keep coming. Right-click for orders. Artillery and air strikes are on the menu: they fall where you point, on anyone inside the circle.',
      startpavn: 'You command the regiments on the Chu Pong. The Americans have landed one company in the clearing below you and the rest are half an hour away. Your battalions are hidden on the slope. Attack before they dig in, and get close: inside a hundred metres their artillery and aircraft cannot be used without hitting their own men.'
    }
  },
  {
    id: 'albany',
    title: 'LZ Albany', subtitle: '17 November 1965',
    duration: 112,
    commandDuration: 200,
    world: { w: 2400, h: 1800 },
    clockStart: 'Day 4 · 09:00',
    heliFrom: { x: 2460, y: 300 },
    rally: { us: { x: 1950, y: 320 }, pavn: { x: 500, y: 500 } },
    battlefield: {
      scale: { px: 100, label: '≈ 100 m (schematic)' },
      features: [
        { kind: 'woods', x: 500,  y: 400,  rx: 520, ry: 380 }, { kind: 'woods', x: 1300, y: 250,  rx: 500, ry: 220 }, { kind: 'woods', x: 2100, y: 900,  rx: 340, ry: 420 },
        { kind: 'woods', x: 1700, y: 1450, rx: 600, ry: 320 }, { kind: 'woods', x: 700,  y: 1300, rx: 380, ry: 300 }, { kind: 'woods', x: 1250, y: 650,  rx: 300, ry: 180 }, { kind: 'woods', x: 1500, y: 1050, rx: 260, ry: 170 },
        { kind: 'grass', x: 1000, y: 850,  rx: 320, ry: 200, name: 'elephant grass' }, { kind: 'grass', x: 1550, y: 750,  rx: 260, ry: 150 }, { kind: 'grass', x: 1200, y: 1250, rx: 260, ry: 160 }, { kind: 'grass', x: 400,  y: 1650, rx: 300, ry: 130 }, { kind: 'grass', x: 2000, y: 600,  rx: 200, ry: 110 },
        { kind: 'clearing', x: 1950, y: 320, rx: 130, ry: 95, name: 'LZ ALBANY' }, { kind: 'lz', name: 'LZ Albany', id: 'albany', x: 1950, y: 320, r: 110 },
        { kind: 'clearing', x: 1180, y: 960, rx: 70, ry: 50, name: 'the small clearing' },
        { kind: 'creek', pts: [[2400,1250],[2100,1300],[1800,1400],[1500,1500],[1200,1650],[950,1800]], width: 20, name: 'stream bed' },
        { kind: 'trail', pts: [[120,1720],[400,1540],[700,1300],[950,1120],[1180,960],[1420,760],[1650,560],[1850,400],[1950,320]] },
        { kind: 'mound', x: 1120, y: 1010, r: 10 }, { kind: 'mound', x: 1380, y: 820, r: 9 }, { kind: 'mound', x: 860, y: 1180, r: 11 }, { kind: 'mound', x: 1620, y: 640, r: 9 }, { kind: 'mound', x: 1900, y: 380, r: 12 }, { kind: 'mound', x: 1000, y: 1000, r: 8 }, { kind: 'mound', x: 1480, y: 700, r: 8 }
      ],
      labels: [
        { x: 160, y: 1780, text: 'from LZ X-Ray 4 km ↙', small: true },
        { x: 2200, y: 1720, text: 'to LZ Columbus 3 km ↘', small: true },
        { x: 1300, y: 40, text: 'Ia Drang river 1 km ↑', small: true },
        { x: 1060, y: 860, text: 'elephant grass', small: true, rotate: -.5 }
      ]
    },
    formations: [
      { id: 'recon2',  side: 'us', name: 'Recon platoon, 2/7 Cavalry', division: 'Recon', type: 'rifle', cols: 3, rows: 2, power: 1.0, x: 560, y: 1420, speed: 12,
        count: 'About 25 men', confidence: 'us', note: 'Led the column and captured two North Vietnamese soldiers near the small clearing.' },
      { id: 'a27x',    side: 'us', name: 'A Company, 2/7 Cavalry', division: 'A 2/7', type: 'rifle', cols: 6, rows: 3, power: 1.0, x: 470, y: 1490, speed: 12,
        count: 'About 110 men', confidence: 'us', note: 'The head of the column. Reached the Albany clearing with the battalion command group and held it.' },
      { id: 'hq27',    side: 'us', name: 'Battalion HQ, 2/7 Cavalry (McDade)', division: 'HQ 2/7', type: 'rifle', cols: 4, rows: 2, power: 1.0, x: 390, y: 1560, speed: 12,
        count: 'Command group', confidence: 'us', note: 'Lieutenant Colonel McDade had called his company commanders forward to the head of the column when the ambush began, leaving their companies without them.' },
      { id: 'd27',     side: 'us', name: 'D Company, 2/7 Cavalry', division: 'D 2/7', type: 'weapons', cols: 4, rows: 2, power: 1.0, x: 300, y: 1620, speed: 12,
        count: 'Mortars and recon', confidence: 'us', note: 'In the middle of the column.' },
      { id: 'c27',     side: 'us', name: 'C Company, 2/7 Cavalry', division: 'C 2/7', type: 'rifle', cols: 6, rows: 3, power: 1.0, x: 220, y: 1680, speed: 12,
        count: 'About 110 men', confidence: 'us', note: 'Hit hardest, in the elephant grass in the middle of the column. It lost almost half its men killed.' },
      { id: 'a15',     side: 'us', name: 'A Company, 1/5 Cavalry', division: 'A 1/5', type: 'rifle', cols: 6, rows: 3, power: 1.0, x: 130, y: 1740, speed: 12,
        count: 'About 110 men', confidence: 'us', note: 'The rear of the column. Formed its own perimeter and held through the night.' },
      { id: 'b27x',    side: 'us', name: 'B Company, 2/7 Cavalry (Diduryk)', division: 'B 2/7', type: 'rifle', cols: 6, rows: 3, power: 1.0, x: 1950, y: 360, offmap: true,
        count: 'About 100 men', confidence: 'us', note: 'Flown into the Albany clearing at dusk: the same company that had held X-Ray for two days.' },
      { id: '8bnx',    side: 'pavn', name: '8th Battalion, 66th Regiment', division: '8th Bn', type: 'assault', cols: 7, rows: 3, power: 1.1, x: 650, y: 620, hidden: true, ai: 'wave',
        count: 'About 350 after X-Ray', confidence: 'estimate', note: 'Moving north-east from the Chu Pong on the morning of the 17th, by the Vietnamese account toward LZ Columbus, when its scouts found the American column beside it.' },
      { id: '33-1',    side: 'pavn', name: '1st Battalion, 33rd Regiment', division: '33rd Regt', type: 'assault', cols: 6, rows: 3, power: 1.0, x: 1850, y: 1150, hidden: true, ai: 'wave',
        count: 'Perhaps 250', confidence: 'estimate', note: 'Came in from the east and south-east against the rear and middle of the column.' },
      { id: '8bn-b',   side: 'pavn', name: '8th Battalion (second echelon)', division: '8th Bn', type: 'assault', cols: 5, rows: 3, power: 1.0, x: 900, y: 450, hidden: true, ai: 'wave',
        count: 'Part of the battalion', confidence: 'estimate', note: 'Attacked the head of the column at the Albany clearing.' },
      { id: 'hwx',     side: 'pavn', name: 'Heavy weapons', division: 'Heavy weapons', type: 'heavy', cols: 3, rows: 2, power: 1.0, x: 1000, y: 560, hidden: true,
        count: 'Mortars and machine guns', confidence: 'estimate', note: 'Mortars fell on the column and on the clearing.' },
      { id: 'reconx',  side: 'pavn', name: 'Reconnaissance', division: 'Recon', type: 'recon', cols: 3, rows: 1, power: 1.0, x: 1250, y: 1050, hidden: true,
        count: 'A few men', confidence: 'reconstruction', note: 'Scouts walked beside the column in the grass. The two prisoners the Americans took were either deserters or scouts; the accounts differ.' }
    ],
    events: [
      { t: 0, title: 'The march to Albany', tag: 'us', clock: 'Day 4 · 09:00', light: 'day', focus: { x: 500, y: 1450 },
        text: 'On the morning of 17 November the 2nd Battalion, 7th Cavalry, with A Company of the 1st Battalion, 5th Cavalry, marches north-east from X-Ray toward a clearing called Albany, four kilometres away: about 400 men in a column half a kilometre long, through elephant grass and scrub, in the heat.',
        explain: 'The battalion had to be clear of X-Ray before a B-52 strike on the Chu Pong. Its commander, Lieutenant Colonel McDade, had held the battalion for three weeks; most of its men had not fought at X-Ray. The column moved without artillery registered ahead of it, and with no air cover on call, which the American account treats as the first mistake of the day.',
        orders: [ { id: 'recon2', to: { x: 1180, y: 980 }, speed: 13 }, { id: 'a27x', to: { x: 1100, y: 1040 }, speed: 13 }, { id: 'hq27', to: { x: 1000, y: 1100 }, speed: 13 }, { id: 'd27', to: { x: 900, y: 1170 }, speed: 13 }, { id: 'c27', to: { x: 800, y: 1240 }, speed: 13 }, { id: 'a15', to: { x: 700, y: 1310 }, speed: 13 } ] },
      { t: 16, title: 'Prisoners', tag: 'us', clock: 'Day 4 · 11:38', focus: { x: 1180, y: 980 },
        text: 'The recon platoon captures two North Vietnamese soldiers near a small clearing. The column halts in the grass while they are questioned. McDade calls his company commanders forward to the head of the column to plan the last leg. The men, awake for three nights, sit down and some fall asleep.',
        explain: 'Calling the commanders forward left every company in the middle of the column without its captain when the attack came. The two prisoners said they were deserters; the American account suspects they were scouts. By the Vietnamese account the 8th Battalion’s own reconnaissance had already found the column.',
        orders: [ { id: 'reconx', visible: true, to: { x: 1300, y: 1120 }, speed: 20, then: 'hold' }, { id: 'recon2', state: 'hold' }, { id: 'a27x', to: { x: 1150, y: 1020 }, state: 'hold' }, { id: 'hq27', to: { x: 1060, y: 1070 }, state: 'hold' }, { id: 'd27', to: { x: 960, y: 1130 }, state: 'hold' }, { id: 'c27', to: { x: 860, y: 1200 }, state: 'hold' }, { id: 'a15', to: { x: 760, y: 1280 }, state: 'hold' },
          { id: '8bnx', to: { x: 800, y: 900 }, speed: 17 }, { id: '33-1', to: { x: 1300, y: 1350 }, speed: 17 }, { id: '8bn-b', to: { x: 1300, y: 700 }, speed: 17 } ] },
      { t: 30, title: 'The ambush', tag: 'established', clock: 'Day 4 · 13:15', focus: { x: 950, y: 1150 },
        text: 'The 8th Battalion of the 66th Regiment and a battalion of the 33rd strike the column from both sides at once, in the grass, at a range of a few metres. The column is cut into pieces. C Company, in the middle, is shattered; the mortars of D Company are overrun; the head of the column fights its way into the Albany clearing with the command group.',
        explain: 'The Vietnamese account calls it a meeting engagement that its battalion turned into an ambush by attacking at once; the American account calls it an ambush of a column that had let its guard down. Both agree that the fight became hundreds of separate fights in grass taller than a man, where no one could see more than a few metres or tell friend from enemy.',
        orders: [
          { id: '8bnx', visible: true, to: { x: 920, y: 1150 }, speed: 20, state: 'attack' }, { id: '33-1', visible: true, to: { x: 980, y: 1210 }, speed: 20, state: 'attack' }, { id: '8bn-b', visible: true, to: { x: 1200, y: 980 }, speed: 20, state: 'attack' }, { id: 'hwx', visible: true, to: { x: 1000, y: 560 }, state: 'hold' },
          { id: 'c27', strengthTo: 30, over: 14, spread: 1.8 }, { id: 'd27', strengthTo: 40, over: 14, spread: 1.8 }, { id: 'hq27', strengthTo: 60, over: 14 },
          { id: 'recon2', to: { x: 1900, y: 360 }, speed: 15, state: 'move', then: 'hold' }, { id: 'a27x', to: { x: 1950, y: 330 }, speed: 15, state: 'attack', strengthTo: 70, over: 14 }, { id: 'hq27', to: { x: 1930, y: 300 }, speed: 15, state: 'move', delay: 4, then: 'dig' },
          { id: 'a15', to: { x: 720, y: 1300 }, state: 'hold', strengthTo: 75, over: 14 }
        ] },
      { t: 46, title: 'Fighting in the grass', tag: 'us', clock: 'Day 4 · 14:30', focus: { x: 1400, y: 800 },
        text: 'The head of the column forms a perimeter in the Albany clearing. In the grass the middle of the column fights in squads and pairs. Air strikes and napalm come in an hour after the first shots, so close that they burn Americans as well as North Vietnamese. The rear, A Company of the 5th Cavalry, forms its own circle and holds.',
        explain: 'Air and artillery could not be called at first because no one could say where the Americans were. When the strikes came they fell on the grass between the perimeters, where the fighting was mixed. The Vietnamese account says the aircraft forced its battalions to break off before they could finish the column.',
        orders: [
          { fire: { kind: 'air', at: { x: 1050, y: 1100 }, r: 110, delay: 2 } }, { fire: { kind: 'napalm', at: { x: 880, y: 1050 }, r: 100, delay: 4 } }, { fire: { kind: 'air', at: { x: 1250, y: 900 }, r: 110, delay: 6 } }, { fire: { kind: 'arty', at: { x: 1500, y: 650 }, r: 70, delay: 8 } }, { fire: { kind: 'napalm', at: { x: 1000, y: 1250 }, r: 100, delay: 10 } },
          { id: '8bnx', strengthTo: 60, over: 12 }, { id: '33-1', strengthTo: 60, over: 12 }, { id: '8bn-b', strengthTo: 55, over: 12 },
          { id: 'a27x', state: 'dig', to: { x: 1960, y: 340 } }, { id: 'c27', strengthTo: 22, over: 12 }, { id: 'd27', strengthTo: 30, over: 12 },
          { id: '8bn-b', to: { x: 1500, y: 650 }, speed: 15, state: 'move', delay: 8, then: 'hold' }
        ] },
      { t: 62, title: 'Reinforcement at dusk', tag: 'us', clock: 'Day 4 · 18:45', light: 'dusk', focus: { x: 1950, y: 330 },
        text: 'B Company of the 2nd Battalion, back from X-Ray, is flown into the Albany clearing at dusk through fire. A company from LZ Columbus marches in to the rear perimeter. Between the two perimeters the grass is full of wounded men who cannot be reached.',
        explain: 'Only two Hueys could land in the small clearing at a time, and the company came in by platoons under mortar fire. Its arrival secured the clearing for the night. It could not reach the men in the grass, who were half a kilometre away in the dark among the enemy.',
        orders: [ { id: 'b27x', lift: true, delay: 1 }, { id: 'b27x', to: { x: 1990, y: 360 }, speed: 14, delay: 5, then: 'dig' }, { id: '8bnx', to: { x: 800, y: 1000 }, speed: 15, state: 'move', then: 'hold' }, { id: '33-1', to: { x: 1200, y: 1300 }, speed: 15, state: 'move', then: 'hold' } ] },
      { t: 78, title: 'The night', tag: 'established', clock: 'Day 4 · 22:00', light: 'night', focus: { x: 1000, y: 1150 },
        text: 'Through the night flares light the grass. The American account says North Vietnamese soldiers moved through the field killing the wounded; the Vietnamese account does not mention it. Survivors crawl toward the perimeters. Artillery falls on the grass between them all night.',
        explain: 'Neither perimeter could send patrols into the grass without losing them. Soldiers in the open played dead or fought alone. The killing of the wounded is reported by several American survivors and by the reporter who reached Albany the next day, and is denied or passed over on the other side.',
        orders: [ { id: '8bnx', to: { x: 950, y: 1150 }, speed: 15, state: 'attack', strengthTo: 50, over: 10 }, { id: 'c27', strengthTo: 15, over: 12 }, { fire: { kind: 'arty', at: { x: 1100, y: 1150 }, r: 70, delay: 3 } }, { fire: { kind: 'arty', at: { x: 900, y: 1080 }, r: 70, delay: 6 } }, { id: '8bnx', to: { x: 700, y: 850 }, speed: 15, state: 'move', delay: 9, then: 'hold' } ] },
      { t: 94, title: 'Morning', tag: 'established', clock: 'Day 5 · 06:30', light: 'dawn', focus: { x: 1100, y: 1050 },
        text: 'At first light the North Vietnamese are gone. The battalion sweeps the grass and finds its dead: 155 killed and 124 wounded in one afternoon and night, the worst single loss of the war for an American battalion. The Americans count 403 enemy bodies in the field.',
        explain: 'Albany is the battle that neither side put at the centre of its story. The American account gave it a few lines in the first reports and it was not fully told until the survivors spoke years later. The Vietnamese account counts it as the victory of the campaign: a US battalion caught in the open and cut to pieces.',
        orders: [ { id: '8bnx', to: { x: 300, y: 500 }, speed: 15, state: 'move', then: 'withdrawn' }, { id: '33-1', to: { x: 2000, y: 1500 }, speed: 15, state: 'move', then: 'withdrawn' }, { id: '8bn-b', to: { x: 600, y: 300 }, speed: 15, state: 'move', then: 'withdrawn' }, { id: 'hwx', state: 'withdrawn' }, { id: 'reconx', state: 'withdrawn' },
          { id: 'a15', to: { x: 1100, y: 1100 }, speed: 12, state: 'move' }, { id: 'b27x', to: { x: 1300, y: 900 }, speed: 12, state: 'move' } ] },
      { t: 106, title: 'The end of the campaign', tag: 'established', clock: 'Day 5 · noon', light: 'day', focus: { x: 1500, y: 800 }, end: true,
        text: 'The battalions are flown out over the next two days. The 1st Cavalry Division counts the campaign a victory; so does the North Vietnamese army. The lessons each side drew would shape the next ten years.',
        explain: 'The Americans concluded that airmobile infantry backed by artillery and aircraft could go anywhere and win, and measured success by the body count. The North Vietnamese concluded that they could fight the Americans by closing fast and leaving before the aircraft came, and that American losses mattered in a way their own did not. Both were right about the other.',
        orders: [] }
    ],
    ai: {
      spotRange: 150, nightSpot: 100, beltRange: 60,
      pavn: {
        waves: [ { t: 20, ids: ['8bnx', '33-1'], target: 'nearest' }, { t: 34, ids: ['8bn-b'], target: 'nearest' } ],
        withdrawAt: 35, withdrawTo: { x: 500, y: 500 }, regroupAfter: 35, hwFrom: { x: 1000, y: 560 }
      },
      us: {
        lifts: [ { t: 70, id: 'b27x' } ],
        march: [ { id: 'recon2', to: { x: 1900, y: 360 } }, { id: 'a27x', to: { x: 1950, y: 340 } }, { id: 'hq27', to: { x: 1930, y: 300 } }, { id: 'd27', to: { x: 1880, y: 420 } }, { id: 'c27', to: { x: 1840, y: 460 } }, { id: 'a15', to: { x: 1800, y: 520 } } ],
        perimeter: { 'recon2': { x: 1900, y: 360 }, 'a27x': { x: 1950, y: 340 }, 'hq27': { x: 1930, y: 300 }, 'd27': { x: 1880, y: 420 }, 'c27': { x: 1840, y: 460 }, 'a15': { x: 1800, y: 520 }, 'b27x': { x: 1990, y: 360 } },
        fireEvery: 10, airEvery: 28, fireFrom: 36
      }
    },
    support: {
      arty: { name: 'Artillery (LZ Columbus)', delay: 5, r: 70, dmg: 28, cooldown: 8, from: 30, note: 'No fires were registered ahead of the column; artillery is available only once the ambush has begun.' },
      air:  { name: 'Air strike', delay: 10, r: 110, dmg: 40, cooldown: 25, from: 42, note: 'The first aircraft arrived about an hour after the first shots.' }
    },
    outcome: [
      { text: 'The column lost 155 killed and 124 wounded on 17 November, the heaviest loss of any American battalion in a single action of the war.', tag: 'us', cite: 'Carland, Stemming the Tide (2000), ch. 5; Moore & Galloway, ch. 24–26' },
      { text: 'American officers counted 403 North Vietnamese bodies in the grass; the Vietnamese account does not give its losses at Albany.', tag: 'us' },
      { text: 'The Vietnamese account treats Albany as the decisive success of the campaign and the proof of fighting close.', tag: 'pavn', cite: 'Victory in Vietnam, ch. 7' },
      { text: 'For the whole campaign from Plei Me to Albany the Americans counted 305 of their own dead and estimated more than 3,000 North Vietnamese killed. Vietnamese histories give far lower figures for their own losses.', tag: 'estimate' },
      { text: 'Westmoreland took the Ia Drang as proof that search-and-destroy with helicopters and firepower would win. Hanoi took it as proof that it could fight the Americans and outlast them. The war went on for nine more years.', tag: 'established' }
    ],
    commandLines: {
      startus:   'You command the 2nd Battalion, 7th Cavalry, on the march to Albany. Your column is strung out in the grass and the enemy is close. Keep the companies together and move them to the clearing; artillery and air become available once the fighting starts.',
      startpavn: 'You command the 8th Battalion of the 66th Regiment and a battalion of the 33rd. An American column is walking through the grass beside you, half a kilometre long and strung out. Hit it from both sides at once and close in before the aircraft come.'
    }
  }
  ],

  /* ---------- The armies panel: click a card for the write-up. `photos` are intro slideshow files or new { file, caption, ref, credit } entries. ---------- */
  units: [
    { side: 'us', type: 'rifle', name: 'US rifleman', desc: 'Airmobile infantry: M16 rifle, grenades, entrenching tool. Lands by helicopter, digs in, calls for fire.', tag: 'established',
      photos: ['17-xray-perimeter.jpg', '07-1st-cav-sky-soldiers.jpg', '16-xray-sketch-map.jpg'],
      lines: [
        { text: 'The 1st Cavalry Division was the first airmobile division: its infantry had no trucks and moved only by helicopter. A rifle company of about 120 men carried everything on its back, including the water, in forty-degree heat.', tag: 'established' },
        { text: 'The M16 was new in 1965 and the Ia Drang was its first big test. It was light and fired fast, and the American account praises it, while noting that the early rifles jammed if they were not kept clean. The M79 grenade launcher and the M60 machine gun gave each platoon its heavy fire.', tag: 'us', cite: 'Moore, After Action Report, lessons learned; Moore & Galloway, ch. 10' },
        { text: 'The battalion that landed at X-Ray was at about 60 per cent of its paper strength: 431 men instead of 767, because of malaria, leave and men whose service ended before the deployment.', tag: 'us', cite: 'Moore & Galloway, ch. 4' },
        { text: 'The riflemen’s real weapon was the radio. Every company and platoon leader could call artillery, helicopters and aircraft, and a sergeant on a knoll with a radio held off a battalion for a day.', tag: 'established' },
        { text: 'In this game a rifle company that digs in takes much less damage and holds the clearing; one caught on the move in the grass loses men fast, as C Company of the 2nd Battalion did at Albany.', tag: 'reconstruction' }
      ] },
    { side: 'us', type: 'weapons', name: 'US weapons company', desc: '81 mm mortars, M60 machine guns, the recon platoon. The battalion’s own fire support inside the perimeter.', tag: 'established',
      photos: ['10-105mm-howitzer.jpg', '17-xray-perimeter.jpg'],
      lines: [
        { text: 'Each battalion had a weapons company with a mortar platoon of 81 mm mortars and a reconnaissance platoon. At X-Ray Moore pooled all the mortars in the clearing under one officer and used the recon platoon as his reserve.', tag: 'us', cite: 'Moore, After Action Report' },
        { text: 'The 81 mm mortar reached about three kilometres and could be fired within the perimeter at enemy a hundred metres away, which the artillery eight kilometres away could not do safely.', tag: 'established' },
        { text: 'At Albany the mortar platoon of D Company was in the middle of the column and was overrun in the grass; its tubes were never fired.', tag: 'us', cite: 'Moore & Galloway, ch. 24' },
        { text: 'In this game the weapons company fires over the heads of the rifle companies at long range and should stay inside the perimeter.', tag: 'reconstruction' }
      ] },
    { side: 'us', type: 'heli', name: 'UH-1 Huey', desc: 'The lift ship and the gunship. Sixteen transports carried the battalion in; the same crews flew out the wounded.', tag: 'established',
      photos: ['01-huey-landing-xray.jpg', '09-uh1d-troop-lift.jpg', '03-1st-cav-an-khe.jpg'],
      lines: [
        { text: 'The UH-1D carried eight to ten combat-loaded soldiers and cruised at about 200 km/h. Sixteen of them, from Company A of the 229th Assault Helicopter Battalion, lifted the 1st Battalion into X-Ray in five trips over four hours.', tag: 'established' },
        { text: 'Rocket-firing Hueys of the aerial rocket artillery fired on the landing zone edges before the first lift and on the attackers through the battle.', tag: 'us' },
        { text: 'Major Bruce Crandall and Captain Ed Freeman flew into the clearing under fire again and again with ammunition and water and flew out the wounded when the medical evacuation helicopters refused the landing zone. Both received the Medal of Honor, Freeman in 2001 and Crandall in 2007.', tag: 'established' },
        { text: 'The North Vietnamese account says the helicopters were the Americans’ strength and their weakness: the landing zone had to be held at any cost, so the regiments knew exactly where to attack.', tag: 'pavn', cite: 'Nguyen Huu An, New Battlefield' },
        { text: 'In this game helicopters bring each company in on its historical lift and take the battalion out at the end. They are not ordered directly.', tag: 'reconstruction' }
      ] },
    { side: 'us', type: 'weapons', name: 'Artillery and air support', desc: '105 mm howitzers at LZ Falcon, fighter-bombers, napalm and, for the first time in close support, B-52s.', tag: 'established', nosprite: true,
      photos: ['10-105mm-howitzer.jpg', '18-arc-light-map.jpg', '14-chu-pong-massif.jpg'],
      lines: [
        { text: 'Two batteries of 105 mm howitzers, twelve guns, at LZ Falcon eight kilometres east fired more than four thousand rounds in the first twenty-four hours and about eight thousand in all. A round took about five seconds to arrive after the call.', tag: 'us', cite: 'Moore, After Action Report; Carland, Stemming the Tide, ch. 5' },
        { text: 'Air Force, Navy and Marine fighter-bombers flew more than three hundred sorties over X-Ray, with bombs, rockets, cannon and napalm. The air force controller with the battalion, Lieutenant Charlie Hastings, directed them from the command post.', tag: 'us' },
        { text: 'On 15 November B-52s from Guam bombed the Chu Pong: the first use of the strategic bombers in support of troops in contact. The strikes fell on planned map squares, not on observed targets.', tag: 'established' },
        { text: 'The North Vietnamese answer was distance: inside a hundred metres the Americans could not use artillery or aircraft without hitting their own men. At X-Ray the napalm hit the command post and at Albany it burned Americans in the grass.', tag: 'established' },
        { text: 'In Command mode as the Americans, artillery and air strikes are on the right-click menu. They land after a delay, on everyone inside the circle, friend or enemy.', tag: 'reconstruction' }
      ] },
    { side: 'pavn', type: 'assault', name: 'PAVN assault infantry', desc: 'AK-47, grenades, RPG-2. Attacks fast and close, in waves, and withdraws into the mountain.', tag: 'established',
      photos: ['11-pavn-infantry.jpg', '13-ak47-rpg.jpg', '04-ho-chi-minh-trail.jpg'],
      lines: [
        { text: 'The regiments of the B3 Front were regulars of the People’s Army of Vietnam, conscripts and volunteers from the North who had walked south for two months. The 66th Regiment reached the Chu Pong in early November 1965 and had not yet fought.', tag: 'established' },
        { text: 'An assault company carried AK-47 rifles, grenades, RPG-2 rocket launchers and light machine guns. The American account describes men in khaki with pith helmets attacking at a run, firing from the hip, and tied into the trees as snipers.', tag: 'us', cite: 'Moore & Galloway, ch. 8–12' },
        { text: 'The Vietnamese account describes the method: approach unseen, attack from several sides at once, get inside the range of the artillery, and withdraw before the aircraft arrive. Nguyen Huu An called it grabbing the enemy by the belt.', tag: 'pavn', cite: 'Nguyen Huu An, New Battlefield (1995)' },
        { text: 'How many fought and how many died is disputed. The Americans counted 634 bodies at X-Ray and 403 at Albany and estimated many more; the Vietnamese histories give lower figures and say the counts included men killed by bombing far from the clearing.', tag: 'estimate' },
        { text: 'In this game assault infantry does extra damage within seventy metres of the enemy, where American fire support cannot be used without hitting its own side, and withdraws to the mountain when it is worn down.', tag: 'reconstruction' }
      ] },
    { side: 'pavn', type: 'heavy', name: 'PAVN heavy weapons', desc: '12.7 mm machine guns and 82 mm mortars on the slope. Long range, slow to move.', tag: 'established',
      photos: ['13-ak47-rpg.jpg', '14-chu-pong-massif.jpg'],
      lines: [
        { text: 'Each battalion had a heavy weapons company with 82 mm mortars, 12.7 mm heavy machine guns and recoilless rifles, carried down the trail in pieces.', tag: 'established' },
        { text: 'Machine guns dug in among the termite mounds on the finger of the mountain stopped both attempts to reach the lost platoon on the first day. Mortar rounds fell on the clearing through the whole battle and hit the helicopters as they landed.', tag: 'us', cite: 'Moore, After Action Report' },
        { text: 'In this game the heavy weapons fire from the slope at long range and should be kept out of reach of the American rifle companies.', tag: 'reconstruction' }
      ] },
    { side: 'pavn', type: 'recon', name: 'PAVN reconnaissance and sappers', desc: 'Scouts who watched the clearing and walked beside the column. Few, fast and hard to see.', tag: 'established',
      photos: ['11-pavn-infantry.jpg', '15-termite-mound.jpg'],
      lines: [
        { text: 'Regimental reconnaissance companies went ahead of the battalions, found the enemy and guided the assault companies in. The Vietnamese account says the 66th Regiment’s scouts watched the helicopters land and reported within minutes.', tag: 'pavn' },
        { text: 'The prisoner B Company took on the first morning, unarmed and starving, is called a deserter in the American account. The two men taken near Albany said the same, and the American account doubts them.', tag: 'us', cite: 'Moore & Galloway, ch. 7 and 24' },
        { text: 'In this game the reconnaissance cells are concealed until an American formation comes close, and they are the North Vietnamese player’s eyes.', tag: 'reconstruction' }
      ] }
  ],

  /* ---------- Where each confidence tag comes from: click any tag in the game ---------- */
  citations: {
    established: { title: 'Established', intro: 'Accepted by historians because the American and the Vietnamese accounts, the official records and the later interviews agree on it.', items: [
      { ref: 'J. M. Carland, Stemming the Tide: May 1965 to October 1966 (US Army Center of Military History, 2000), ch. 5', note: 'The official US Army history of the campaign, using the after-action reports.' },
      { ref: 'H. G. Moore & J. L. Galloway, We Were Soldiers Once… and Young (Random House, 1992)', note: 'The battalion commander and the reporter who was there, with interviews of American survivors and of Nguyen Huu An and other Vietnamese officers.' },
      { ref: 'Victory in Vietnam: The Official History of the People’s Army of Vietnam, 1954–1975 (Hanoi, 1988; English translation, University Press of Kansas, 2002), ch. 7', note: 'The PAVN account of the Plei Me and Ia Drang campaign.' },
      { ref: 'J. P. Coleman, Pleiku: The Dawn of Helicopter Warfare in Vietnam (St. Martin’s, 1988)', note: 'The whole campaign, written by a 1st Cavalry officer.' },
      { ref: 'C. A. MacDonald et al., 1st Cavalry Division After Action Report, Pleiku Campaign, 23 October – 26 November 1965', note: 'The division’s own report, declassified.' }
    ] },
    us: { title: 'American account', intro: 'The American side wrote its reports within weeks. They are detailed, timed to the minute, and written by officers whose careers depended on them. Enemy casualty figures in them are body counts made under fire plus estimates.', items: [
      { ref: 'H. G. Moore, After Action Report, Ia Drang Valley Operation, 1st Battalion 7th Cavalry, 14–16 November 1965 (9 December 1965)', note: 'The battalion commander’s report, the backbone of every later account of X-Ray. Declassified and online.' },
      { ref: 'H. G. Moore & J. L. Galloway, We Were Soldiers Once… and Young (1992)', note: 'The full story of X-Ray and Albany from the American side.' },
      { ref: 'J. L. Galloway, Vietnam Story, US News & World Report, 29 October 1990', note: 'The first full account of Albany, 25 years after.' },
      { ref: 'S. L. A. Marshall interviews and the combat after-action interviews of the 1st Cavalry Division, 1965–66', note: 'Taped interviews with the participants in the weeks after the battle.' },
      { ref: 'We Were Soldiers (film, 2002)', note: 'The popular version: X-Ray only, with the ending changed. Albany is left out.' }
    ] },
    pavn: { title: 'Vietnamese account', intro: 'The North Vietnamese side published its history later and claims the campaign as a victory. Its figures for American losses are far higher than the American records, and its figures for its own losses far lower than the American estimates.', items: [
      { ref: 'Victory in Vietnam: The Official History of the People’s Army of Vietnam (1988; English 2002), ch. 7', note: 'The official account of the Plei Me campaign and the Ia Drang.' },
      { ref: 'Nguyen Huu An with Nguyen Tu Duong, Chien truong moi (New Battlefield), memoir (Hanoi, 1995)', note: 'The field commander’s memoir of the battle. Partly translated in Moore & Galloway’s second book.' },
      { ref: 'H. G. Moore & J. L. Galloway, We Are Soldiers Still (2008)', note: 'The American authors return to the valley with An and the Vietnamese veterans in 1993, and compare the two accounts.' },
      { ref: 'Interviews with Nguyen Huu An, Hanoi, 1990–93 (Galloway)', note: 'The source for An’s phrase about grabbing the enemy by the belt.' }
    ] },
    estimate: { title: 'Estimate', intro: 'Neither side recorded the other’s strength or losses. These figures come from historians comparing the reports of both sides.', items: [
      { ref: 'Carland, Stemming the Tide (2000), ch. 5', note: 'Strength of the PAVN regiments and the campaign totals as the US Army reconstructed them.' },
      { ref: 'Moore & Galloway, We Were Soldiers Once… and Young, appendix', note: 'American losses by name; enemy losses as counted and estimated.' },
      { ref: 'M. Clodfelter, Warfare and Armed Conflicts, 4th ed. (2017)', note: 'Comparison of the casualty figures claimed by each side.' }
    ] },
    reconstruction: { title: 'Reconstruction', intro: 'Choices made for this game so that the battle can be shown and played. They are not claims about what happened.', items: [
      { ref: 'The maps', note: 'Schematics of the X-Ray clearing and the Albany trail after the sketch maps in Moore’s report and in Moore & Galloway, with the Chu Pong off the western edge. About one metre per pixel, but nothing is surveyed.' },
      { ref: 'Positions, timings and strengths', note: 'Three days are shown in about four minutes. Companies are shown as blocks of figures; strength percentages stand for fighting power, not head counts.' },
      { ref: 'The belt rule and the fire support', note: 'Game rules that stand for the methods both sides describe: assault infantry is strongest when close, and American fire support hits anyone inside its circle.' }
    ] }
  },
  sources: [
    { title: 'Moore & Galloway, We Were Soldiers Once… and Young (1992)', note: 'the fullest account, from both sides' },
    { title: 'Moore, After Action Report, 1st Bn 7th Cav (1965)', note: 'the original report, declassified' },
    { title: 'Carland, Stemming the Tide (US Army CMH, 2000)', note: 'official history, free online' },
    { title: 'Victory in Vietnam (PAVN official history, 2002 translation)', note: 'the North Vietnamese version' },
    { title: 'Moore & Galloway, We Are Soldiers Still (2008)', note: 'the return to the valley with the Vietnamese veterans' },
    { title: 'Coleman, Pleiku (1988)', note: 'the whole campaign' }
  ],

  /* Recorded narration lives in audio/ (generated by tools/make-narration.sh). Paths follow a convention:
     intro-N.mp3, event-<part>-N.mp3, explain-<part>-N.mp3, outcome-<part>.mp3, cmd-KEY.mp3. */
  imageBase: 'images/',
  audioBase: 'audio/',
  /* One narrator for now. The Kadesh voices (light 60, bright 0, deep 400, warm 7, computer 500) can be added
     by running tools/make-narration.sh with those speaker numbers and listing them here. */
  voices: [
    { id: 'clear', name: 'Narrator \u00b7 clear', speaker: 25 }
  ],
  /* Fixed captions used in Command mode (so they can be pre-recorded) */
  commandLines: {
    sighted:  'Enemy formation sighted.',
    breaks:   'One of your formations has broken and is falling back.',
    lift:     'A helicopter lift is coming in. The company is yours once it is on the ground.',
    wave:     'Movement on the slope. They are coming.',
    support:  'Fire mission on the way. Anyone inside the circle will be hit.',
    arclight: 'Arc Light is available: one B-52 strike along the mountain.',
    night:    'Night. Visibility is down; the enemy can close unseen.',
    belt:     'The enemy is inside a hundred metres. Fire support on them now would hit your own men.'
  }
};
