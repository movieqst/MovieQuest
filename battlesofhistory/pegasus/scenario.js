/*
  Historical Scenario File — Pegasus Bridge and the Orne bridges, night of 5–6 June 1944
  -----------------------------------------------------------------------------------------
  Drives the narrated introduction, Watch mode and Command mode. Tags:
    established    — agreed by both sides and by historians
    british        — the British account: Howard's report, the regimental history, Ambrose, the veterans' interviews
    german         — the German account: 716th Infantry Division and 21st Panzer Division records, and the German veterans
    estimate       — a modern estimate, not a recorded figure
    reconstruction — our own choice to make the battle playable
  Map: 2400 x 1800 world pixels, about 1 px = 1 m, north up. The Caen Canal runs north down the left of
  centre, the River Orne to its right; the road crosses both at the two bridges.
*/
window.BATTLE_SCENARIO = {
  id: 'pegasus',
  title: 'Pegasus Bridge',
  date: 'Night of 5–6 June 1944',
  place: 'Bénouville and Ranville, Normandy, France',
  tagline: 'British 6th Airborne Division vs. the German 716th Infantry and 21st Panzer Divisions',
  titleCard: {
    title: 'PEGASUS BRIDGE',
    date: '5 – 6 June 1944',
    dateNote: 'The first action of D-Day. The gliders touched down at 00:16 British Double Summer Time; the commandos arrived from Sword Beach at 13:00.',
    dateRef: 'Howard, after-action report (June 1944); Ambrose, Pegasus Bridge (1985); Fowler, Pegasus Bridge (Osprey, 2010)',
    place: 'The Caen Canal and the River Orne at Bénouville, Normandy',
    sides: 'D Company, 2nd Ox and Bucks Light Infantry, and 7th Parachute Battalion  ·  716th Infantry Division and 21st Panzer Division'
  },

  confidence: {
    established:    { label: 'Established',     color: '#5fcf8a', desc: 'Agreed by both sides and by historians.' },
    british:        { label: 'British account', color: '#9fc8ff', desc: 'From British sources: Major Howard’s report, the war diaries, the regimental history and the veterans’ accounts gathered by Stephen Ambrose. Written by the winners, within weeks or decades.' },
    german:         { label: 'German account',  color: '#ffb3a7', desc: 'From German sources: the 716th and 21st Panzer Division records and the accounts of German veterans, including the bridge garrison commander, Major Hans Schmidt.' },
    estimate:       { label: 'Estimate',        color: '#e9c77a', desc: 'A modern estimate, not a recorded figure.' },
    reconstruction: { label: 'Reconstruction',  color: '#c9a0ff', desc: 'Our own choice to make the battle playable: positions, timings and map scale.' }
  },

  sides: {
    brit: { name: 'Britain', short: 'British', army: '6th Airborne Division and 1st Special Service Brigade', color: '#7a2f3a', light: '#f3cfd5', text: '#ffb8c4', pennant: '#7a2f3a', trim: '#e9c77a', portrait: 'brit', jungle: false,
            art: { skin: '#d9a97c', cloth: '#6f6a4a', cloth2: '#4f4a34', helmet: '#5a5a48', helmet2: '#7a7a62', weapon: '#2b2b2b' } },
    ger:  { name: 'Germany', short: 'German', army: '716th Infantry Division and 21st Panzer Division', color: '#6d7b86', light: '#d9e2ea', text: '#c7d6e2', pennant: '#6d7b86', trim: '#f3d9a0', portrait: 'ger', jungle: false,
            art: { skin: '#d9a97c', cloth: '#5f6a5c', cloth2: '#48524a', helmet: '#4d5650', helmet2: '#6a756c', weapon: '#3a2a1a' } }
  },
  sideOrder: ['brit', 'ger'],

  unitTypes: {
    airlanding: { name: 'Glider platoon',       side: 'brit', kind: 'foot',    speed: 16, range: 80,  fig: 'rifle',   sheet: 'brit-airlanding', spec: { cw: 160, ch: 160, h: 26 }, dmg: { infantry: 6, gun: 7, panzer: 1, airlanding: 5, piat: 5, para: 5, commando: 5 }, cover: 1, belt: 1.4 },
    piat:       { name: 'PIAT team',            side: 'brit', kind: 'foot',    speed: 13, range: 90,  fig: 'weapons', sheet: 'brit-piat',       spec: { cw: 160, ch: 160, h: 26 }, dmg: { infantry: 2, gun: 4, panzer: 14, airlanding: 2, piat: 2, para: 2, commando: 2 }, cover: 1, antitank: true },
    para:       { name: 'Parachute company',    side: 'brit', kind: 'foot',    speed: 15, range: 85,  fig: 'rifle',   sheet: 'brit-para',       spec: { cw: 160, ch: 160, h: 26 }, dmg: { infantry: 6, gun: 6, panzer: 1, airlanding: 5, piat: 5, para: 5, commando: 5 }, cover: 1 },
    commando:   { name: 'Commando troop',       side: 'brit', kind: 'foot',    speed: 16, range: 85,  fig: 'rifle',   sheet: 'brit-commando',   spec: { cw: 160, ch: 160, h: 26 }, dmg: { infantry: 7, gun: 7, panzer: 2, airlanding: 5, piat: 5, para: 5, commando: 5 }, cover: 1 },
    infantry:   { name: 'Infantry company',     side: 'ger',  kind: 'foot',    speed: 13, range: 85,  fig: 'rifle',   sheet: 'ger-infantry',    spec: { cw: 160, ch: 160, h: 26 }, dmg: { airlanding: 5, piat: 7, para: 5, commando: 5, infantry: 5, gun: 4, panzer: 1 }, cover: 1 },
    gun:        { name: 'Anti-tank gun',        side: 'ger',  kind: 'foot',    speed: 5,  range: 150, fig: 'weapons', sheet: 'ger-gun',         spec: { cw: 160, ch: 160, h: 26 }, dmg: { airlanding: 4, piat: 5, para: 4, commando: 4, infantry: 3, gun: 6, panzer: 10 }, cover: 1, indirect: false, slow: true },
    boat:       { name: 'Gunboat',              side: 'ger',  kind: 'vehicle', speed: 30, range: 170, fig: 'boat',    sheet: null,              spec: { cw: 240, ch: 200, h: 34 }, dmg: { airlanding: 6, piat: 6, para: 6, commando: 6, infantry: 2, gun: 2, panzer: 2 }, cover: 1, armour: .5, water: true },
    panzer:     { name: 'Panzer IV',            side: 'ger',  kind: 'vehicle', speed: 28, range: 160, fig: 'tank',    sheet: 'ger-panzer',      spec: { cw: 240, ch: 200, h: 34 }, dmg: { airlanding: 9, piat: 10, para: 9, commando: 9, infantry: 4, gun: 8, panzer: 8 }, cover: 1, armour: .25, road: true }
  },

  globe: {
    target: { lon: -0.2747, lat: 49.2425 },      // the canal bridge at Bénouville
    region: { lon: -0.8, lat: 49.3 }, pull: 4.6, startLat: 44,
    periodNote: 'Western Europe on 6 June 1944 · German-occupied France, the invasion beaches along the Normandy coast',
    labels: [
      { lon: 2.35, lat: 48.86, text: 'Paris', size: .55, dot: true }, { lon: -0.37, lat: 49.18, text: 'Caen', size: .6, dot: true },
      { lon: -0.26, lat: 49.28, text: 'Ouistreham', size: .5, dot: true }, { lon: -0.6, lat: 49.4, text: 'Sword · Juno · Gold', size: .5, italic: true }, { lon: -1.1, lat: 49.42, text: 'Omaha · Utah', size: .5, italic: true },
      { lon: -0.2747, lat: 49.2425, text: 'PEGASUS BRIDGE', size: .8, pin: true, early: true }
    ]
  },

  intro: [
    {
      title: 'PEGASUS BRIDGE',
      media: [
        { at: 0,  file: '32-art-bridge-night.jpg', caption: 'The canal bridge at Bénouville in the first minutes of 6 June 1944: the lifting bridge and its tower against the sky, the café on the far bank, three gliders in the marsh. A painting for this game.', ref: 'Painted for this game', credit: 'Painting: Battle Games, original artwork' },
        { at: 14, file: '01-pegasus-bridge-1944.jpg', caption: 'The same bridge three days later: British transport crossing, a sentry on the tower, and the Horsa gliders still lying in the field beyond. The bridge was renamed Pegasus after the flying-horse badge of the airborne forces.', ref: 'Bénouville, 9 June 1944; Imperial War Museum B 5288', credit: 'Photo: Sgt Christie, No 5 Army Film & Photographic Unit; Crown copyright expired, public domain' }
      ],
      subtitle: 'Night of 5–6 June 1944 · Bénouville, Normandy',
      focus: { x: 865, y: 730 }, zoom: 1.2,
      markers: [ { x: 865, y: 730, label: 'The canal bridge' }, { x: 1525, y: 720, label: 'The river bridge' } ],
      auto: 28,
      lines: [
        { text: 'The first fight of D-Day, and one of the most precise operations of the war: six gliders, 181 men, two bridges, and sixteen minutes past midnight.', tag: 'established' },
        { text: 'The British side wrote it up in detail and the men told it for fifty years. The German side is thinner: a coastal division’s records and a few veterans. The tags show which is which.', tag: 'reconstruction' }
      ]
    },
    {
      title: 'Why two bridges mattered',
      media: [
        { at: 0,  file: '30-art-map-normandy.jpg', caption: 'Normandy on 6 June 1944: the five invasion beaches along the coast, Caen inland, and the River Orne and the Caen Canal running side by side from Caen to the sea at Ouistreham. The red ring is the pair of bridges at Bénouville, the only crossings between Caen and the coast.', ref: 'Painted for this game; approximate', credit: 'Map: Battle Games, original artwork' },
        { at: 18, file: '12-blackening-faces-harwell.jpg', caption: 'Men of the 6th Airborne Division blackening their faces at RAF Harwell on the evening of 5 June. Howard’s six gliders took off from this airfield at four minutes to eleven that night.', ref: 'RAF Harwell, 5 June 1944; Imperial War Museum H 39066', credit: 'Photo: Capt E. G. Malindine, War Office; Crown copyright expired, public domain' }
      ],
      focus: { x: 1180, y: 720 }, zoom: .8,
      auto: 40,
      lines: [
        { text: 'The Allied landings of 6 June 1944 put five armies on the beaches of Normandy. The eastern end of the line was Sword Beach, and east of Sword ran two waterways side by side from Caen to the sea: the Caen Canal and the River Orne.', tag: 'established' },
        { text: 'The only crossings between Caen and the coast were two bridges on the road from Bénouville to Ranville, a few hundred metres apart. If the British held them, the German armour east of the Orne could not reach the beaches, and the airborne division dropped east of the river could be reinforced. If the Germans blew them, that division was cut off.', tag: 'established' },
        { text: 'The bridges had to be taken intact, by surprise, before the Germans could fire the demolition charges. That meant gliders, landing in silence, within yards of the targets, in the dark.', tag: 'established' }
      ]
    },
    {
      title: 'The British force',
      media: [
        { at: 0,  file: '03-john-howard.jpg', caption: 'Major John Howard, commanding D Company, 2nd Battalion, the Oxfordshire and Buckinghamshire Light Infantry: a former regimental sergeant-major and policeman who had trained his company for six months for this one night.', ref: 'British Army photograph, 1944', credit: 'Crown copyright expired, public domain (via ParaData)' },
        { at: 14, file: '07-horsa-under-tow.jpg', caption: 'An Airspeed Horsa glider on tow behind an Albemarle. The six Horsas were towed across the Channel by Halifax bombers and released at 6,000 feet over the coast, seven miles from the bridges.', ref: 'British Air Ministry photograph', credit: 'Crown copyright expired, public domain' },
        { at: 26, file: '13-horsa-replica-museum.jpg', caption: 'A full-size replica of a Horsa at the Memorial Pegasus museum. Twenty metres of plywood and fabric carrying thirty men, two pilots and their kit, landing at ninety miles an hour with no engine and no second chance.', ref: 'Memorial Pegasus, Ranville', credit: 'Photo: René Hourdry, 2023, CC0' }
      ],
      focus: { x: 1180, y: 1010 }, zoom: 1,
      markers: [ { x: 1180, y: 1010, label: 'LZ X' }, { x: 1790, y: 500, label: 'LZ Y' } ],
      auto: 46,
      lines: [
        { text: 'The task went to D Company of the 2nd Ox and Bucks, an airlanding battalion of the 6th Airborne Division, under Major John Howard: 139 of his own men, thirty sappers of the Royal Engineers, and twelve glider pilots of the Glider Pilot Regiment. 181 men in six Horsas, three for each bridge.', tag: 'british', cite: 'Howard, report on Operation Deadstick; Ambrose, Pegasus Bridge, ch. 2' },
        { text: 'The glider pilots were the key. Staff Sergeant Jim Wallwork, flying the lead glider, had to put thirty men down in a field the size of a football pitch, in the dark, beside a bridge, by stopwatch and compass alone. He did it to within fifty yards. Air Chief Marshal Leigh-Mallory called it the finest feat of flying of the war.', tag: 'british', cite: 'Ambrose, Pegasus Bridge, ch. 5; Leigh-Mallory’s remark is quoted in the regimental history' },
        { text: 'Behind them came the 7th Parachute Battalion, dropping north of Ranville at 00:50 to take over the bridges, and, from the beach at dawn, Lord Lovat’s 1st Special Service Brigade of commandos, due to march the six miles from Sword and relieve them by noon.', tag: 'established' },
        { text: 'The men carried Sten guns, Bren guns, grenades and the PIAT, a spring-loaded anti-tank projector with a range of a hundred yards. Howard had one PIAT team per platoon and no artillery at all.', tag: 'british' }
      ]
    },
    {
      title: 'The German garrison',
      media: [
        { at: 0,  file: '09-german-antitank-guns.jpg', caption: 'German anti-tank guns captured in Normandy, summer 1944. The garrison at the canal bridge had one gun of this family in a sandbagged pit at the east end, a 50 mm PaK 38, with a concrete pillbox and machine-gun trenches beside it.', ref: 'Normandy, 1944; National Archives of Canada', credit: 'Public domain (Archives Normandie 1939-45)' },
        { at: 16, file: '10-panzer-iv-normandy.jpg', caption: 'A captured Panzer IV of the kind the 21st Panzer Division sent down the road to the bridge at half past one in the morning. This one was taken by the British 27th Armoured Brigade in July.', ref: 'Normandy, 3 July 1944; Imperial War Museum B 6344', credit: 'Photo: Sgt J. Mapham; Crown copyright expired, public domain' }
      ],
      focus: { x: 1000, y: 760 }, zoom: 1.3,
      markers: [ { x: 1005, y: 780, label: 'Gun pit and pillbox' } ],
      auto: 44,
      lines: [
        { text: 'The bridges were guarded by about fifty men of the 716th Infantry Division, a coastal-defence formation of older men and conscripts from across occupied Europe, under Major Hans Schmidt, with a 50 mm anti-tank gun, machine guns in trenches, and the bridges wired for demolition.', tag: 'german', cite: 'Schmidt’s account in Ambrose, Pegasus Bridge, ch. 4; 716th Infantry Division war diary' },
        { text: 'The explosives were not in place. The charges were stored nearby and were to be fitted when an attack was expected. Nobody expected one that night: the weather was bad, the sentries were two, and the garrison was asleep in the village.', tag: 'german' },
        { text: 'Ten miles away lay the 21st Panzer Division, the only armoured division near the coast, with more than a hundred Panzer IV tanks. Its orders were to counter-attack any landing, but it could not move without permission from above, and permission did not come for hours.', tag: 'established' },
        { text: 'How many Germans fought at the bridges in the night is not recorded. Our garrison and the tanks that came are a reconstruction from the two accounts.', tag: 'estimate' }
      ]
    },
    {
      title: 'The ground',
      media: [
        { at: 0,  file: '31-art-map-bridges.jpg', caption: 'The battlefield: the canal and the river running north, the road from Bénouville over both bridges to Ranville, Le Port north of the canal bridge, and the two landing zones, X beside the canal bridge for gliders 1 to 3, Y beside the river bridge for gliders 4 to 6. The dashed line is the commandos’ route from Sword.', ref: 'Painted for this game; approximate', credit: 'Map: Battle Games, original artwork' },
        { at: 16, file: '33-art-cafe.jpg', caption: 'Café Gondrée, the small café at the west end of the canal bridge, at first light. Its owners had passed information on the garrison to the Resistance for months; at dawn Georges Gondrée dug up ninety-eight bottles of champagne he had buried in the garden.', ref: 'Painted for this game', credit: 'Painting: Battle Games, original artwork' },
        { at: 28, file: '06-cafe-gondree.jpg', caption: 'The café as it is today, the first house in France to be liberated, and a place of pilgrimage for the veterans every June.', ref: 'Bénouville', credit: 'Photo: Rundvald, 2009, public domain' }
      ],
      focus: { x: 865, y: 730 }, zoom: 1.4,
      markers: [ { x: 800, y: 660, label: 'Café Gondrée' } ],
      auto: 40,
      lines: [
        { text: 'The canal bridge was a steel lifting bridge, a bascule, with a counterweight tower at its west end, carrying the road from Bénouville on the west bank to the strip of land between the waterways. The river bridge, four hundred yards east, was a plain girder bridge to Ranville.', tag: 'established' },
        { text: 'Between the canal and the river lay flat marshy pasture cut by ditches and a pond: landing zone X, where three gliders were to land nose to the canal bridge. East of the river bridge lay landing zone Y. The villages of Bénouville and Le Port stood on the west bank, Ranville on the east.', tag: 'established' },
        { text: 'Our map is a reconstruction from the sketch maps in Howard’s report and the regimental history: one pixel to a metre, with the villages, the tower and the gun pit where the accounts put them.', tag: 'reconstruction' }
      ]
    },
    {
      title: 'Deadstick',
      media: [
        { at: 0,  file: '02-horsa-glider-benouville.jpg', caption: 'Glider number 1 as it lay three days later, fifty yards from the canal bridge, its nose crushed into the barbed wire. Wallwork and his co-pilot were thrown through the windscreen and were the first British soldiers on French soil on D-Day.', ref: 'Bénouville, 8 June 1944; Imperial War Museum B 5232', credit: 'Photo: Sgt Christie; Crown copyright expired, public domain' },
        { at: 16, file: '08-brotheridge-grave.jpg', caption: 'The grave of Lieutenant Den Brotheridge at Ranville. He led the first platoon across the bridge and was hit by a burst from the machine gun on the far side: the first Allied soldier killed by enemy fire on D-Day. His daughter was born a fortnight later.', ref: 'Ranville churchyard', credit: 'Photo: Dennis Peeters, 2010, public domain' }
      ],
      focus: { x: 1000, y: 860 }, zoom: 1.2,
      markers: [ { x: 1030, y: 880, label: 'Glider 1' } ],
      auto: 38,
      lines: [
        { text: 'The operation was named Deadstick, the pilots’ word for landing with no engine. The gliders cast off over the coast at 00:07 and came down through cloud, turning twice by stopwatch, to arrive out of the dark at ninety miles an hour, braked by a parachute and a skid.', tag: 'british', cite: 'Ambrose, Pegasus Bridge, ch. 5' },
        { text: 'The first glider hit the ground at sixteen minutes past midnight, forty-seven yards from the canal bridge. The second and third followed within a minute. At the river bridge two of three arrived; the sixth, released in the wrong place, landed eight miles away on the wrong river.', tag: 'established' },
        { text: 'Choose how to see it: watch the night unfold as the two sides tell it, or take command of the bridges, or of the garrison and the tanks that must take them back.', tag: 'reconstruction' }
      ]
    },
    { title: 'Choose', choice: true, focus: { x: 1180, y: 730 }, zoom: 1, auto: 9999, lines: [ { text: 'Watch the battle unfold, or take command.', tag: 'reconstruction' } ] }
  ],

  parts: [
  {
    id: 'bridges',
    title: 'The bridges', subtitle: 'Night of 5–6 June 1944',
    duration: 250,
    commandDuration: 300,
    world: { w: 2400, h: 1800 },
    clockStart: '6 June · 00:16',
    heliFrom: { x: 1760, y: -260 },            // gliders come in from the north-east, over the coast
    rally: { brit: { x: 1180, y: 860 }, ger: { x: 400, y: 1360 } },
    battlefield: {
      scale: { px: 100, label: '≈ 100 m (schematic)' },
      features: [
        { kind: 'water', pts: [[865,0],[865,1800]], width: 100, name: 'Caen Canal' },
        { kind: 'water', pts: [[1460,0],[1478,150],[1500,450],[1522,750],[1560,1000],[1590,1200],[1650,1500],[1695,1725],[1705,1800]], width: 80, name: 'River Orne' },
        { kind: 'bridge', id: 'canal', name: 'Canal bridge', x: 865, y: 732, w: 120, h: 34 },
        { kind: 'bridge', id: 'river', name: 'River bridge', x: 1526, y: 738, w: 140, h: 34 },
        { kind: 'road', pts: [[0,738],[800,732],[930,732],[1455,738],[1600,738],[2400,728]] },
        { kind: 'road', pts: [[640,1800],[650,1350],[660,1000],[700,760]] },
        { kind: 'road', pts: [[700,760],[690,600],[680,330],[670,0]] },
        { kind: 'road', pts: [[1950,728],[1960,1100],[1980,1800]] },
        { kind: 'village', x: 150, y: 810, w: 480, h: 540, name: 'B\u00e9nouville' },
        { kind: 'village', x: 300, y: 330, w: 400, h: 270, name: 'Le Port' },
        { kind: 'village', x: 1890, y: 700, w: 510, h: 650, name: 'Ranville' },
        { kind: 'building', x: 720, y: 620, w: 70, h: 50, name: 'Caf\u00e9 Gondr\u00e9e' },
        { kind: 'pillbox', x: 995, y: 670, r: 26, name: 'Pillbox' },
        { kind: 'pillbox', x: 990, y: 815, r: 24, name: 'Gun pit' },
        { kind: 'trench', pts: [[940,640],[1040,650]], name: 'MG trench' },
        { kind: 'lz', id: 'x', name: 'LZ X', poly: [[1060,900],[1500,930],[1300,1425]], x: 1290, y: 1120, r: 200 },
        { kind: 'lz', id: 'y', name: 'LZ Y', poly: [[1560,470],[1900,450],[1760,700]], x: 1740, y: 560, r: 150 },
        { kind: 'pond', x: 1305, y: 1245, rx: 60, ry: 45 },
        { kind: 'woods', x: 1180, y: 250, rx: 180, ry: 100 }, { kind: 'woods', x: 1200, y: 1620, rx: 200, ry: 100 }, { kind: 'woods', x: 2050, y: 250, rx: 260, ry: 130 }, { kind: 'woods', x: 2100, y: 1580, rx: 240, ry: 120 }, { kind: 'woods', x: 150, y: 150, rx: 120, ry: 90 },
        { kind: 'hedges', step: 220 }
      ],
      labels: [
        { x: 865, y: 1700, text: 'CAEN CANAL', rotate: -1.57 }, { x: 1690, y: 1560, text: 'RIVER ORNE', rotate: -1.3 },
        { x: 400, y: 1090, text: 'B\u00e9nouville', small: true }, { x: 500, y: 480, text: 'Le Port', small: true }, { x: 2150, y: 1020, text: 'Ranville', small: true },
        { x: 865, y: 690, text: 'Canal bridge', small: true }, { x: 1526, y: 695, text: 'River bridge', small: true },
        { x: 1290, y: 1150, text: 'LZ X', small: true }, { x: 1740, y: 580, text: 'LZ Y', small: true },
        { x: 220, y: 40, text: 'to Ouistreham and Sword Beach 6 km \u2191', small: true }, { x: 640, y: 1770, text: 'to Caen 9 km \u2193', small: true }
      ]
    },

    formations: [
      // British: the three canal-bridge gliders, the two river-bridge gliders, the sappers, then the paras and the commandos
      { id: 'g1',  side: 'brit', name: 'No 25 Platoon (Brotheridge), glider 1', division: 'Glider 1', type: 'airlanding', cols: 5, rows: 3, power: 1.2, x: 1030, y: 880, offmap: true, glider: true,
        count: '28 men and 2 pilots', confidence: 'british', note: 'Wallwork’s glider, down at 00:16 forty-seven yards from the bridge. Brotheridge led it over the bridge and was killed on the far side.' },
      { id: 'g2',  side: 'brit', name: 'No 24 Platoon (Wood), glider 2', division: 'Glider 2', type: 'airlanding', cols: 5, rows: 3, power: 1.1, x: 1090, y: 930, offmap: true, glider: true,
        count: '28 men and 2 pilots', confidence: 'british', note: 'Landed a minute later, broke its back in a ditch. Cleared the trenches on the east bank. Lieutenant Wood was wounded in both legs.' },
      { id: 'g3',  side: 'brit', name: 'No 14 Platoon (Smith), glider 3', division: 'Glider 3', type: 'airlanding', cols: 5, rows: 3, power: 1.1, x: 1140, y: 980, offmap: true, glider: true,
        count: '28 men and 2 pilots', confidence: 'british', note: 'Landed in the pond; one man drowned, the only death in the landings. Crossed the bridge to hold the west bank and the café.' },
      { id: 'hq',  side: 'brit', name: 'Major Howard and company HQ', division: 'Howard', type: 'airlanding', cols: 3, rows: 2, power: 1.0, x: 1000, y: 850, offmap: true,
        count: 'About 10 men', confidence: 'british', note: 'Howard set up beside the pillbox on the east bank, from where he could see both bridges, and sent the signal Ham and Jam: both bridges taken intact.' },
      { id: 'sap', side: 'brit', name: 'Royal Engineers (Neilson)', division: 'Sappers', type: 'airlanding', cols: 4, rows: 2, power: .8, x: 1060, y: 860, offmap: true,
        count: '30 sappers', confidence: 'british', note: 'Searched the bridges for the demolition charges and found the chambers empty: the explosives were in a shed nearby and had never been fitted.' },
      { id: 'piat', side: 'brit', name: 'PIAT team (Sergeant Thornton)', division: 'PIAT', type: 'piat', cols: 2, rows: 1, power: 1.0, x: 1010, y: 840, offmap: true,
        count: '2 men, one PIAT, two bombs', confidence: 'british', note: 'Wagger Thornton lay in a ditch at the T-junction in Bénouville and hit the leading tank with his first bomb. The second tank turned back. It was the moment of the night.' },
      { id: 'g4',  side: 'brit', name: 'No 17 Platoon (Fox), glider 5', division: 'Glider 5', type: 'airlanding', cols: 5, rows: 3, power: 1.1, x: 1760, y: 560, offmap: true, glider: true,
        count: '28 men and 2 pilots', confidence: 'british', note: 'Landed three hundred yards from the river bridge and rushed it. A machine gun fired a few bursts and the crew ran. The bridge was taken without loss.' },
      { id: 'g5',  side: 'brit', name: 'No 23 Platoon (Sweeney), glider 6', division: 'Glider 6', type: 'airlanding', cols: 5, rows: 3, power: 1.1, x: 1680, y: 620, offmap: true, glider: true,
        count: '28 men and 2 pilots', confidence: 'british', note: 'Landed seven hundred yards short and arrived at the river bridge at the run to find Fox already across. Glider 4, Priday’s, was released in the wrong place and landed on the River Dives eight miles east.' },
      { id: 'pA',  side: 'brit', name: 'A Company, 7th Parachute Battalion', division: 'A Coy 7 Para', type: 'para', cols: 6, rows: 3, power: 1.0, x: 2160, y: -20, offmap: true,
        count: 'About 60 men who found the rendezvous', confidence: 'british', note: 'The battalion was scattered in the drop; a third of it never reached the bridges. A Company held Bénouville through the morning against the counter-attacks.' },
      { id: 'pB',  side: 'brit', name: 'B Company, 7th Parachute Battalion', division: 'B Coy 7 Para', type: 'para', cols: 6, rows: 3, power: 1.0, x: 2210, y: 60, offmap: true,
        count: 'About 60 men', confidence: 'british', note: 'Took Le Port and fought the snipers in the church tower; a PIAT bomb through the tower finally silenced them.' },
      { id: 'pC',  side: 'brit', name: 'C Company and HQ, 7th Parachute Battalion (Pine-Coffin)', division: 'C Coy 7 Para', type: 'para', cols: 5, rows: 3, power: 1.0, x: 2260, y: 140, offmap: true,
        count: 'About 80 men', confidence: 'british', note: 'Lieutenant Colonel Pine-Coffin reached the canal bridge at about 03:00 and took command of the position from Howard.' },
      { id: 'cmdo', side: 'brit', name: 'No 6 Commando with Lord Lovat and Piper Millin', division: 'Lovat', type: 'commando', cols: 7, rows: 3, power: 1.2, x: 560, y: -200, offmap: true, speed: 18,
        count: 'About 400 men of the 1st Special Service Brigade', confidence: 'british', note: 'Landed on Sword at 08:40, marched inland, and reached the canal bridge at 13:00 with the pipes playing, two minutes behind the time Lovat had promised.', speed: 30 },
      // Germans: the garrison, the gun, Schmidt, the tanks, the dawn counter-attack, the gunboat
      { id: 'gar', side: 'ger', name: 'Bridge garrison, 716th Infantry Division', division: 'Garrison', type: 'infantry', cols: 5, rows: 3, power: .8, x: 1000, y: 690, hidden: true, ai: 'hold', strength: 60,
        count: 'About 50 men, most asleep in the village', confidence: 'german', note: 'Older men and conscripts from across Europe. Two sentries were on the bridge; the rest were in their billets when the gliders came down.' },
      { id: 'gun', side: 'ger', name: '50 mm anti-tank gun', division: 'PaK 38', type: 'gun', cols: 2, rows: 1, power: 1.0, x: 1005, y: 780, hidden: true, ai: 'hold', strength: 25,
        count: 'One gun in a sandbagged pit', confidence: 'german', note: 'Never fired in the assault; its crew was overrun as they ran to it. Howard’s men used it the next day.' },
      { id: 'rgar', side: 'ger', name: 'River bridge sentries', division: 'Sentries', type: 'infantry', cols: 2, rows: 2, power: .7, x: 1570, y: 740, hidden: true, ai: 'hold',
        count: 'A handful of men', confidence: 'british', note: 'A machine gun fired a few bursts and the crew ran. The river bridge cost the British nothing.' },
      { id: 'schmidt', side: 'ger', name: 'Major Schmidt’s staff car', division: 'Schmidt', type: 'infantry', cols: 2, rows: 1, power: .6, x: 2420, y: 710, hidden: true, speed: 40, ai: 'script',
        count: 'The garrison commander and his driver', confidence: 'german', note: 'Schmidt had been in Ranville with a lady friend. He drove into the British at the river bridge at half past midnight, was wounded and captured, and told his captors in English that they would be thrown back into the sea.' },
      { id: 'pz1', side: 'ger', name: 'Panzer IV, 21st Panzer Division (lead)', division: 'Panzer 1', type: 'panzer', cols: 1, rows: 1, power: 1.0, x: 560, y: 1640, hidden: true, speed: 28, ai: 'wave',
        count: 'One tank', confidence: 'british', note: 'Came up the road from the south with infantry behind it at about 01:30. Thornton’s PIAT bomb set it on fire; its ammunition cooked off for an hour and lit the whole crossroads.' },
      { id: 'pz2', side: 'ger', name: 'Panzer IV, 21st Panzer Division (second)', division: 'Panzer 2', type: 'panzer', cols: 1, rows: 1, power: 1.0, x: 540, y: 1655, hidden: true, speed: 28, ai: 'wave',
        count: 'One tank', confidence: 'british', note: 'Saw the lead tank burn and withdrew. The German armour did not try the road to the bridge again that night.' },
      { id: 'ginf1', side: 'ger', name: 'Panzergrenadiers, 192nd Regiment, 21st Panzer Division', division: '192 PzGren', type: 'infantry', cols: 6, rows: 3, power: 1.1, x: 300, y: 1640, hidden: true, ai: 'wave',
        count: 'A company, perhaps 100 men', confidence: 'estimate', note: 'The dawn counter-attack on Bénouville from the south, with mortar fire, which the 7th Parachute Battalion held off in the village for most of the morning.' },
      { id: 'ginf2', side: 'ger', name: 'Infantry, 716th Division, from Le Port', division: '716 Inf', type: 'infantry', cols: 5, rows: 3, power: .9, x: 420, y: -20, hidden: true, ai: 'wave',
        count: 'Snipers and a platoon', confidence: 'british', note: 'Snipers in the church tower of Le Port and infantry in the houses harassed the bridge all morning.' },
      { id: 'boat', side: 'ger', name: 'Gunboat from Ouistreham', division: 'Gunboat', type: 'boat', cols: 1, rows: 1, power: 1.0, x: 865, y: -200, hidden: true, speed: 30, ai: 'script',
        count: 'Two boats, one with a 20 mm gun', confidence: 'british', note: 'Came down the canal from the sea at about 09:00. A PIAT bomb hit the leading boat, which ran into the bank; the second turned back.' }
    ],

    events: [
      { t: 0, title: 'Deadstick', tag: 'established', clock: '6 June · 00:16', light: 'night', focus: { x: 1060, y: 890 },
        text: 'Sixteen minutes past midnight. Out of the dark at ninety miles an hour, the first Horsa hits the ground, bounces, smashes through the wire and stops with its nose forty-seven yards from the canal bridge. The second and third land within a minute. Nobody on the bridge has heard a thing.',
        explain: 'The gliders were released at 6,000 feet over the coast and flew seven miles by stopwatch, making two timed turns in cloud. Wallwork, in the lead, aimed for the wire at the end of the field to stop the glider before the embankment: he hit it, and the two pilots went through the windscreen. Everyone aboard was stunned for a few seconds; some of the men thought they were dead.',
        orders: [
          { id: 'g1', lift: 'glider', delay: 0 }, { id: 'hq', lift: 'glider', delay: .5 }, { id: 'sap', lift: 'glider', delay: 1 }, { id: 'piat', lift: 'glider', delay: 1 },
          { id: 'g2', lift: 'glider', delay: 4 }, { id: 'g3', lift: 'glider', delay: 7 },
          { id: 'gar', visible: false, state: 'hold' }, { id: 'gun', visible: false, state: 'hold' }
        ] },
      { t: 14, title: 'Over the bridge', tag: 'british', clock: '00:18', focus: { x: 940, y: 740 },
        text: 'Brotheridge’s platoon is out of the wreck and running for the bridge. A sentry fires a flare; the platoon charges across, firing from the hip, grenades into the pillbox and the trenches. Brotheridge is hit by a burst from the machine gun at the far end and falls at the west bank. The bridge is taken in three minutes.',
        explain: 'The plan was speed: no stealth after the landing, just the shortest run to the bridge before the sentries could reach the detonator. Corporal Bailey put a grenade through the slit of the pillbox; Lieutenant Wood’s platoon cleared the trenches on the east bank. Den Brotheridge, hit in the neck, died within the hour, the first Allied soldier killed by enemy fire on D-Day.',
        orders: [
          { id: 'g1', to: { x: 770, y: 745 }, speed: 22, state: 'attack' }, { id: 'g2', to: { x: 1000, y: 700 }, speed: 20, state: 'attack', delay: 2 }, { id: 'g3', to: { x: 960, y: 760 }, speed: 20, state: 'attack', delay: 4 },
          { id: 'gar', visible: true, state: 'hold', strengthTo: 30, over: 10 }, { id: 'gun', visible: true, strengthTo: 0, over: 8 },
          { id: 'g1', strengthTo: 88, over: 8 }, { id: 'hq', to: { x: 1000, y: 820 }, speed: 16, delay: 3, then: 'hold' }, { id: 'sap', to: { x: 930, y: 790 }, speed: 16, delay: 3, then: 'hold' }, { id: 'piat', to: { x: 735, y: 765 }, speed: 14, delay: 4, then: 'hold' }
        ] },
      { t: 26, title: 'Ham and Jam', tag: 'established', clock: '00:21', focus: { x: 1660, y: 640 },
        text: 'Four hundred yards east, two gliders have landed beside the river bridge. Fox’s platoon rushes it; a machine gun fires a few bursts and the crew run. Sweeney’s platoon arrives at the run from a field seven hundred yards short. The sappers report the demolition chambers empty. Howard’s radio sends the code words: Ham, the canal bridge; Jam, the river bridge. Both taken intact.',
        explain: 'The explosives were stored in a shed and had never been fitted to the bridges, against standing orders, because the garrison did not expect an attack. The sappers cut every wire they could find anyway. The sixth glider, Priday’s, had been cast off in the wrong place and landed on the River Dives, eight miles away; its platoon fought its way back over two days.',
        orders: [
          { id: 'g4', lift: 'glider', delay: 0 }, { id: 'g5', lift: 'glider', delay: 2 },
          { id: 'rgar', visible: true, state: 'rout', to: { x: 1960, y: 760 }, speed: 30, delay: 5, then: 'withdrawn' },
          { id: 'g4', to: { x: 1580, y: 710 }, speed: 22, state: 'attack', delay: 4, then: 'dig' }, { id: 'g5', to: { x: 1480, y: 750 }, speed: 22, state: 'move', delay: 7, then: 'dig' },
          { id: 'gar', state: 'rout', to: { x: 300, y: 460 }, speed: 24, delay: 4, then: 'withdrawn' },
          { id: 'g1', to: { x: 765, y: 770 }, state: 'dig', delay: 6 }, { id: 'g2', to: { x: 1010, y: 690 }, state: 'dig', delay: 6 }, { id: 'g3', to: { x: 770, y: 665 }, state: 'dig', delay: 6 }
        ] },
      { t: 40, title: 'The staff car', tag: 'german', clock: '00:30', focus: { x: 1760, y: 720 },
        text: 'A staff car and a motorcycle come down the road from Ranville at speed: Major Schmidt, commanding the bridge garrison, returning from an evening in the town. The British at the river bridge shoot up both. Schmidt is wounded and captured, and tells his captors in good English that they will all be thrown back into the sea.',
        explain: 'Schmidt was the one German officer who knew the demolition plan. Captured within fifteen minutes of the landing, he could not raise the alarm or order the charges fitted. The German side had no commander at the bridges for the rest of the night; the counter-attacks that came were organised from outside.',
        orders: [ { id: 'schmidt', visible: true, to: { x: 1620, y: 720 }, speed: 45, state: 'move' }, { id: 'schmidt', strengthTo: 0, over: 6, delay: 5 } ] },
      { t: 54, title: 'The drop', tag: 'established', clock: '00:50', focus: { x: 2060, y: 160 },
        text: 'Half an hour later the sky to the north-east fills with the 7th Parachute Battalion, dropping to take over the bridges. The drop is scattered by wind and flak; companies land miles apart and in the flooded fields. A third of the battalion will never reach the rendezvous.',
        explain: 'The 6th Airborne Division dropped east of the Orne to seal off the flank of the invasion. The 7th Battalion’s job was the bridges, and it got there, but with 200 men instead of 600, and without its mortars and machine guns, which had come down in the water. Howard’s company would have to hold longer than planned.',
        orders: [ { id: 'pA', visible: true, at: { x: 2160, y: -20 }, to: { x: 1840, y: 420 }, speed: 26 }, { id: 'pB', visible: true, at: { x: 2260, y: 100 }, to: { x: 1960, y: 500 }, speed: 26, delay: 6 }, { id: 'pC', visible: true, at: { x: 2360, y: 40 }, to: { x: 2020, y: 620 }, speed: 26, delay: 12 } ] },
      { t: 70, title: 'Tanks', tag: 'british', clock: '01:30', focus: { x: 640, y: 860 },
        text: 'Engines in Bénouville. Two tanks of the 21st Panzer Division come up the road from the south with infantry behind them, toward the T-junction a hundred yards from the bridge. Sergeant Thornton is in a ditch at the junction with the company’s last PIAT and two bombs. He lets the lead tank come to thirty yards and fires. It stops, burns, and its ammunition explodes for the next hour.',
        explain: 'The PIAT was a spring-loaded tube that threw a three-pound bomb a hundred yards, and it was feared for its unreliability. Thornton later said he was shaking so much he was sure he would miss. The burning tank lit the crossroads and blocked the road; the second tank withdrew, and the Germans, hearing the explosions, believed the British had anti-tank guns. No tank tried the road again that night.',
        orders: [
          { id: 'pz1', visible: true, to: { x: 700, y: 760 }, speed: 28, state: 'attack' }, { id: 'pz2', visible: true, to: { x: 640, y: 960 }, speed: 26, state: 'move', delay: 2 },
          { id: 'piat', to: { x: 740, y: 740 }, speed: 14, state: 'dig' },
          { id: 'pz1', strengthTo: 0, over: 3, delay: 9 }, { fire: { kind: 'burn', at: { x: 700, y: 765 }, r: 40, delay: 9, dmg: 0 } },
          { id: 'pz2', to: { x: 560, y: 1640 }, speed: 26, state: 'move', delay: 12, then: 'withdrawn' }
        ] },
      { t: 86, title: 'Holding the west bank', tag: 'british', clock: '02:00', focus: { x: 800, y: 740 },
        text: 'Howard’s platoons hold the crossroads, the café and the trenches on both banks. German patrols probe from Bénouville and Le Port and are driven off. The wounded are carried into the café, where the Gondrée family hand out the champagne they have kept buried since 1940.',
        explain: 'Howard had fewer than 150 men to hold two bridges and the approaches on both sides, with no artillery. He pulled the platoons into tight positions at the bridge ends, kept the PIAT at the crossroads, and waited for the paratroopers. The German response was piecemeal: no one above the garrison knew yet what had happened.',
        orders: [ { id: 'ginf2', visible: true, to: { x: 700, y: 560 }, speed: 13, state: 'attack' }, { id: 'ginf2', strengthTo: 70, over: 10, delay: 6 }, { id: 'ginf2', to: { x: 520, y: 360 }, speed: 13, state: 'move', delay: 9, then: 'hold' } ] },
      { t: 102, title: 'The paratroopers arrive', tag: 'british', clock: '03:00', focus: { x: 1300, y: 720 },
        text: 'Lieutenant Colonel Pine-Coffin crosses the river bridge with what he has gathered of the 7th Battalion, about two hundred men, and takes over the position. A Company goes into Bénouville, B Company into Le Port. Howard’s company falls back to the bridges as the reserve.',
        explain: 'From this point the bridges were held by a battalion rather than a company, but a weak one: no mortars, no machine guns, few radios. The paratroopers’ task was to hold the west bank, the villages, so that the Germans could not reach the bridges with their guns. It was in the villages, not at the bridges, that most of the day’s fighting happened.',
        orders: [
          { id: 'pC', to: { x: 1200, y: 760 }, speed: 30, then: 'dig' }, { id: 'pA', to: { x: 560, y: 910 }, speed: 34, then: 'dig' }, { id: 'pB', to: { x: 600, y: 500 }, speed: 34, then: 'dig' },
          { id: 'g1', to: { x: 965, y: 800 }, speed: 15, state: 'move', delay: 8, then: 'dig' }, { id: 'g3', to: { x: 770, y: 800 }, speed: 15, state: 'move', delay: 8, then: 'dig' }, { id: 'piat', to: { x: 620, y: 820 }, speed: 14, state: 'move', delay: 8, then: 'dig' }
        ] },
      { t: 122, title: 'Dawn attack', tag: 'established', clock: '05:30', light: 'dawn', focus: { x: 480, y: 1010 },
        text: 'First light. German infantry of the 21st Panzer Division attack Bénouville from the south with mortar fire, and press into the village. A Company of the paratroopers fights them house to house and holds. Snipers in the church tower at Le Port pick at anyone who moves on the bridge.',
        explain: 'The 21st Panzer Division had finally been released, but its main body was sent west of the Orne toward the beaches, not at the bridges. What came to Bénouville was a battalion-sized attack supported by mortars, enough to press the paratroopers hard for several hours but not to break through to the bridge.',
        orders: [
          { id: 'ginf1', visible: true, to: { x: 480, y: 1010 }, speed: 13, state: 'attack' }, { id: 'ginf2', to: { x: 620, y: 480 }, speed: 13, state: 'attack', delay: 3 },
          { fire: { kind: 'arty', at: { x: 520, y: 940 }, r: 60, delay: 2, dmg: 18 } }, { fire: { kind: 'arty', at: { x: 600, y: 860 }, r: 60, delay: 6, dmg: 18 } },
          { id: 'pA', strengthTo: 55, over: 16 }, { id: 'pB', strengthTo: 70, over: 16 }, { id: 'ginf1', strengthTo: 50, over: 16 }, { id: 'ginf2', strengthTo: 45, over: 16 }
        ] },
      { t: 146, title: 'The gunboat', tag: 'british', clock: '09:00', focus: { x: 865, y: 360 },
        text: 'Two German gunboats come down the canal from Ouistreham, the leading one firing a 20 mm cannon at the bridge. A PIAT bomb from the east bank hits it below the wheelhouse; it slews into the bank and its crew are taken prisoner. The second boat turns back for the sea.',
        explain: 'The boats were from the naval base at Ouistreham, sent to find out what was happening at the bridge. It was the second time that morning the PIAT, the weapon nobody trusted, had decided a fight. The commandos landing on Sword at that moment were four hours away.',
        orders: [ { id: 'boat', visible: true, to: { x: 865, y: 650 }, speed: 30, state: 'attack' }, { id: 'boat', strengthTo: 0, over: 4, delay: 7 }, { fire: { kind: 'smoke', at: { x: 865, y: 655 }, r: 26, delay: 8, dmg: 0, life: 30 } } ] },
      { t: 162, title: 'The bomb', tag: 'british', clock: '10:00', light: 'day', focus: { x: 865, y: 730 },
        text: 'A German fighter-bomber comes in low along the canal and drops a bomb on the canal bridge. It hits the tower, bounces off, and falls into the water without exploding. The bridge is not touched again from the air.',
        explain: 'A hit would have cut the road to the beaches for the airborne division. The dud was pure luck, and both accounts record it. Through the morning the Germans tried the bridge with tanks, infantry, a gunboat, snipers and an aircraft, and every attempt was too small and too late.',
        orders: [ { fire: { kind: 'dud', at: { x: 835, y: 755 }, r: 34, delay: 3, dmg: 0 } }, { id: 'ginf1', to: { x: 440, y: 1160 }, speed: 13, state: 'attack', strengthTo: 35, over: 12 }, { id: 'pA', strengthTo: 45, over: 12 } ] },
      { t: 182, title: 'Noon', tag: 'established', clock: '12:00', focus: { x: 560, y: 860 },
        text: 'The attacks on Bénouville slacken. The paratroopers are down to half strength in the village and have lost most of their officers, but the Germans have not reached the bridge. From the north comes the sound of the fighting at Sword, and then, faintly, bagpipes.',
        explain: 'Lovat’s brigade had landed at 08:40 and fought its way through Colleville and the gun batteries behind the beach. Lovat had promised Howard he would be at the bridge by noon. He was two minutes late, and apologised for it.',
        orders: [ { id: 'ginf1', to: { x: 300, y: 1360 }, speed: 13, state: 'move', then: 'hold' }, { id: 'ginf2', to: { x: 440, y: 260 }, speed: 13, state: 'move', then: 'hold' } ] },
      { t: 206, title: 'The commandos', tag: 'established', clock: '13:00', focus: { x: 865, y: 560 },
        text: 'At one o’clock Lord Lovat’s commandos come down the road from Le Port, green berets instead of helmets, Piper Bill Millin playing Blue Bonnets over the Border at their head. They cross the canal bridge under sniper fire at a walk, as Lovat ordered, losing several men on the span, and shake hands with the airborne on the far side.',
        explain: 'Lovat marched his men across at the walk, pipes playing, as a point: the beach and the bridge were joined. The snipers in Le Port were still active and the crossing cost lives. Howard’s report records the relief at 13:00; Lovat’s own account says 13:02 and apologises for the delay.',
        orders: [ { id: 'cmdo', visible: true, at: { x: 560, y: -200 }, to: { x: 870, y: 730 }, speed: 40, state: 'move' }, { id: 'cmdo', to: { x: 1300, y: 730 }, speed: 30, state: 'move', delay: 14, then: 'hold' }, { id: 'cmdo', strengthTo: 94, over: 10, delay: 12 } ] },
      { t: 228, title: 'Relieved', tag: 'established', clock: '21:00', light: 'dusk', focus: { x: 1200, y: 730 }, end: true,
        text: 'The commandos cross the river bridge to Ranville and the rest of the brigade follows through the afternoon. In the evening the Warwickshires of the 3rd Division arrive from the beach to take over the bridges, and Howard’s company marches to Ranville. It has lost two killed and fourteen wounded on the bridges. The 7th Battalion has lost sixty.',
        explain: 'The bridges stayed in British hands for the rest of the campaign and the 6th Airborne Division held the flank east of the Orne for two months. The canal bridge was renamed Pegasus after the airborne badge; the river bridge, later, Horsa. Howard’s company fought on in Normandy until September, and lost many more.',
        orders: [ { id: 'cmdo', to: { x: 1760, y: 720 }, speed: 30, state: 'move', then: 'hold' }, { id: 'g1', to: { x: 1200, y: 800 }, speed: 15, state: 'move', then: 'hold' }, { id: 'g3', to: { x: 1150, y: 840 }, speed: 15, state: 'move', then: 'hold' } ] }
    ],

    /* Command mode: the British player holds the bridges; the German player tries to take them back before the commandos arrive. */
    ai: {
      spotRange: 220, nightSpot: 130, beltRange: 60,
      attacker: 'ger', defender: 'brit',
      objectives: [ { id: 'canal', x: 865, y: 732, r: 90, name: 'Canal bridge' }, { id: 'river', x: 1526, y: 738, r: 80, name: 'River bridge' } ],
      ger: {
        waves: [
          { t: 20, ids: ['gar'], target: 'canal' }, { t: 40, ids: ['schmidt'], target: 'river' }, { t: 70, ids: ['pz1', 'pz2'], target: 'canal' },
          { t: 86, ids: ['ginf2'], target: 'canal' }, { t: 122, ids: ['ginf1', 'ginf2'], target: 'canal' }, { t: 146, ids: ['boat'], target: 'canal' }, { t: 175, ids: ['ginf1', 'pz2'], target: 'canal' }
        ],
        withdrawAt: 30, withdrawTo: { x: 400, y: 1360 }, regroupAfter: 35
      },
      brit: {
        lifts: [ { t: 0, id: 'g1', glider: true }, { t: .5, id: 'hq', glider: true }, { t: 1, id: 'sap', glider: true }, { t: 1, id: 'piat', glider: true }, { t: 4, id: 'g2', glider: true }, { t: 7, id: 'g3', glider: true }, { t: 26, id: 'g4', glider: true }, { t: 28, id: 'g5', glider: true },
                 { t: 54, id: 'pA', walk: { x: 2160, y: -20 } }, { t: 60, id: 'pB', walk: { x: 2260, y: 100 } }, { t: 66, id: 'pC', walk: { x: 2360, y: 40 } }, { t: 206, id: 'cmdo', walk: { x: 560, y: -200 } } ],
        perimeter: { g1: { x: 765, y: 770 }, g2: { x: 1010, y: 690 }, g3: { x: 770, y: 665 }, hq: { x: 1000, y: 820 }, sap: { x: 930, y: 790 }, piat: { x: 740, y: 740 }, g4: { x: 1580, y: 710 }, g5: { x: 1480, y: 750 }, pA: { x: 560, y: 910 }, pB: { x: 600, y: 500 }, pC: { x: 1200, y: 760 }, cmdo: { x: 1300, y: 730 } },
        fireEvery: 0, airEvery: 0
      }
    },
    support: {
      arty: { name: 'Mortars (21st Panzer)', delay: 5, r: 60, dmg: 18, cooldown: 9, from: 86, side: 'ger', note: 'Mortar fire on the villages from the south, available once the division is released.' }
    },
    outcome: [
      { text: 'Both bridges were taken intact within a quarter of an hour of the landing and held until the commandos arrived at 13:00 and the 3rd Division in the evening.', tag: 'established' },
      { text: 'D Company lost two killed, Brotheridge and Lance-Corporal Greenhalgh, who drowned in the pond, and fourteen wounded in the assault. The 7th Parachute Battalion lost about sixty killed and wounded holding Bénouville and Le Port.', tag: 'british', cite: 'Howard, report; 7th Parachute Battalion war diary' },
      { text: 'German losses at the bridges are not recorded; the garrison was scattered, one tank and one gunboat destroyed, and the counter-attacks turned back.', tag: 'german' },
      { text: 'The 21st Panzer Division, the only armour near the coast, was held back for hours by the chain of command and then sent west of the Orne. The bridges kept its eastern half from the beaches.', tag: 'established' },
      { text: 'The canal bridge was renamed Pegasus Bridge in 1944 after the badge of the airborne forces. Howard, Wallwork and Lovat came back every June for the rest of their lives; the café is still run by the Gondrée family.', tag: 'established' }
    ],
    commandLines: {
      startbrit: 'You command D Company. Your gliders are coming in on the canal bridge; two more follow at the river bridge. Take both bridges before the garrison wakes, dig in on both banks, and hold until the paratroopers arrive in the night and the commandos at one in the afternoon. You have one PIAT and no artillery.',
      startger:  'You command the German response. The bridge garrison is asleep, its commander is in Ranville, and the charges are not fitted. The British are landing now. Retake a bridge and hold it, or drive the airborne off the west bank, before the commandos arrive from the beach at one in the afternoon. The 21st Panzer Division’s tanks and infantry become yours as the night goes on.'
    }
  }
  ],

  units: [
    { side: 'brit', type: 'airlanding', name: 'Glider infantry', desc: 'Ox and Bucks Light Infantry: Sten, Bren, grenades, no helmet net left clean. Thirty men to a glider.', tag: 'established',
      photos: ['02-horsa-glider-benouville.jpg', '12-blackening-faces-harwell.jpg', '13-horsa-replica-museum.jpg', '03-john-howard.jpg'],
      lines: [
        { text: 'An airlanding battalion flew to battle in gliders rather than jumping, so it arrived as formed platoons with heavier kit. D Company of the 2nd Ox and Bucks had trained for the bridges for six months on a mock-up in Devon, by day and night, until every man knew every job.', tag: 'british', cite: 'Ambrose, Pegasus Bridge, ch. 2–3' },
        { text: 'The men wore the camouflage Denison smock and the rimless airborne helmet, faces blackened, and carried the Sten sub-machine gun, the Lee-Enfield rifle, the Bren light machine gun, grenades and, in each platoon, a PIAT. There was no artillery and no vehicle.', tag: 'established' },
        { text: 'Each Horsa carried a platoon of 28 men and two glider pilots of the Glider Pilot Regiment, who fought as infantry once down. The pilots were sergeants who had trained for a year for a single landing.', tag: 'established' },
        { text: 'The assault was planned as a race: out of the glider and over the bridge before the sentries could reach the detonator. Brotheridge’s platoon crossed the canal bridge in under three minutes. The German account agrees the garrison never had time to form.', tag: 'british', cite: 'Howard, report; Schmidt in Ambrose, ch. 4' },
        { text: 'In this game the glider platoons land as the lifts of the Vietnam engine, each glider becoming a wreck on the field; they fight best dug in at the bridge ends.', tag: 'reconstruction' }
      ] },
    { side: 'brit', type: 'piat', name: 'PIAT team', desc: 'Projector, Infantry, Anti-Tank: a spring-loaded tube that threw a three-pound bomb a hundred yards. Two men, two bombs.', tag: 'established',
      photos: ['10-panzer-iv-normandy.jpg', '09-german-antitank-guns.jpg'],
      lines: [
        { text: 'The PIAT fired a hollow-charge bomb from a heavy spring, with a range of about a hundred yards and a reputation for misfiring. It was the only anti-tank weapon the airborne could carry, and the men distrusted it.', tag: 'established' },
        { text: 'At the T-junction in Bénouville at about 01:30, Sergeant Charles Thornton of Howard’s company lay in a ditch with the last working PIAT and two bombs, let the leading tank come to thirty yards, and hit it with the first. He said afterwards he had been shaking so hard he was sure he would miss.', tag: 'british', cite: 'Thornton in Ambrose, Pegasus Bridge, ch. 7' },
        { text: 'The tank burned for an hour, its ammunition exploding, and the second tank withdrew. The German side took the explosions for anti-tank guns and did not try the road again. At 09:00 another PIAT bomb stopped a gunboat on the canal.', tag: 'established' },
        { text: 'In this game the PIAT team is the only British unit that hurts tanks. Keep it dug in at the crossroads.', tag: 'reconstruction' }
      ] },
    { side: 'brit', type: 'para', name: 'Paratroopers', desc: '7th Parachute Battalion: dropped at 00:50 to take over the bridges, scattered by the drop, fought the morning in the villages.', tag: 'established',
      photos: ['12-blackening-faces-harwell.jpg', '08-brotheridge-grave.jpg'],
      lines: [
        { text: 'The 7th Battalion of the Parachute Regiment, under Lieutenant Colonel Geoffrey Pine-Coffin, was to drop north of Ranville at 00:50, cross the bridges and hold the west bank. The drop was scattered by wind, flak and flooded fields; only about 200 of 600 men reached the bridges by 03:00, and the mortars and machine guns were lost.', tag: 'british', cite: '7th Parachute Battalion war diary; Ambrose, ch. 8' },
        { text: 'A Company held Bénouville through the morning against mortar fire and infantry of the 21st Panzer Division, house by house, and lost most of its officers. B Company took Le Port and silenced the snipers in the church tower with a PIAT bomb through the belfry.', tag: 'british' },
        { text: 'The paratroopers were the hinge of the whole position: the bridges were safe only while the villages on the west bank were held, and the villages were where the day’s casualties fell.', tag: 'established' },
        { text: 'In this game the parachute companies arrive from the north-east through the night and take over the villages; as the British player you place them.', tag: 'reconstruction' }
      ] },
    { side: 'brit', type: 'commando', name: 'Commandos', desc: '1st Special Service Brigade under Lord Lovat: green berets, bagpipes, a six-mile march from Sword Beach.', tag: 'established',
      photos: ['05-lovat-sword-beach.jpg', '34-art-commandos.jpg'],
      lines: [
        { text: 'Lord Lovat’s 1st Special Service Brigade landed on Sword Beach at 08:40 with the second wave, with Piper Bill Millin playing on the sand, and fought inland through Colleville and the coastal batteries toward the bridges.', tag: 'established' },
        { text: 'Lovat had promised Howard he would reach the bridge by noon. He arrived at 13:00, apologised for being late, and marched No 6 Commando across the canal bridge at a walk with the pipes playing, under sniper fire, losing men on the span. The scene closed the film The Longest Day.', tag: 'british', cite: 'Lovat, March Past (1978); Howard, report' },
        { text: 'The commandos crossed the river bridge to Ranville and reinforced the airborne division’s flank east of the Orne, where they fought for the next two months.', tag: 'established' },
        { text: 'In this game the commandos are the relief: their arrival at 13:00 ends the battle. The German player must win before they come.', tag: 'reconstruction' }
      ] },
    { side: 'ger', type: 'infantry', name: 'German infantry', desc: 'The 716th Division garrison: older men and conscripts asleep in the village; later the panzergrenadiers of the 21st Panzer Division.', tag: 'german',
      photos: ['09-german-antitank-guns.jpg', '11-original-bridge-museum.jpg'],
      lines: [
        { text: 'The 716th Infantry Division held thirty miles of coast with two regiments of older men and conscripts from Poland, Russia and elsewhere, with little transport and old equipment. The bridge garrison was about fifty men under Major Hans Schmidt, with two sentries on the bridge and the rest in billets.', tag: 'german', cite: '716th Infantry Division records; Schmidt in Ambrose, ch. 4' },
        { text: 'The demolition charges were stored in a shed and were to be fitted when an attack was expected. They never were. Schmidt was in Ranville that evening and drove into the British at the river bridge at 00:30.', tag: 'german' },
        { text: 'The 21st Panzer Division’s panzergrenadiers, the 192nd Regiment, were a different kind of soldier: younger, trained, with mortars and half-tracks. They attacked Bénouville at dawn and pressed the paratroopers for most of the morning.', tag: 'established' },
        { text: 'In this game the garrison starts asleep and hidden; the panzergrenadiers arrive from the south at dawn with mortar support.', tag: 'reconstruction' }
      ] },
    { side: 'ger', type: 'gun', name: 'Anti-tank gun', desc: 'A 50 mm PaK 38 in a sandbagged pit at the east end of the canal bridge, with a pillbox and machine-gun trenches.', tag: 'german',
      photos: ['09-german-antitank-guns.jpg', '01-pegasus-bridge-1944.jpg'],
      lines: [
        { text: 'The canal bridge was defended at its east end by a concrete pillbox, machine-gun trenches and a 50 mm anti-tank gun in a sandbagged pit, sited to cover the road from Ranville and the bridge itself.', tag: 'german', cite: 'Schmidt in Ambrose, ch. 4; Howard, report' },
        { text: 'The gun never fired. Its crew ran for it from their billets as the first glider platoon came over the bridge and were cut down; Corporal Bailey’s grenade silenced the pillbox. Howard’s men turned the gun round and used it against the German attacks the next day.', tag: 'british' },
        { text: 'In this game the gun is the one German weapon that can stop the British at the bridge if it is manned in time; as the German player you must get the crew to it in the first minute.', tag: 'reconstruction' }
      ] },
    { side: 'ger', type: 'panzer', name: 'Panzer IV', desc: '21st Panzer Division: the only armoured division near the coast, held back for hours, then sent the wrong way.', tag: 'established',
      photos: ['10-panzer-iv-normandy.jpg', '35-art-night-street.jpg'],
      lines: [
        { text: 'The 21st Panzer Division had about 120 Panzer IV tanks and two regiments of panzergrenadiers around Caen, ten miles from the bridges. It was the only armour that could reach the beaches on D-Day.', tag: 'established' },
        { text: 'The division could not move without orders from above, and the orders came in pieces through the night: first to attack the airborne east of the Orne, then, at midday, to cross to the west and attack the beaches. Its eastern half was held off by the airborne at the bridges and in Ranville.', tag: 'established', cite: 'Feuchtinger’s and von Luck’s accounts; Bryce in Ambrose, ch. 7' },
        { text: 'The Panzer IV carried a long 75 mm gun and 80 mm of frontal armour: nothing Howard’s men had could stop it except the PIAT at close range. The one that came to the T-junction at 01:30 was hit at thirty yards and burned.', tag: 'british' },
        { text: 'In this game the tanks move fast on roads and shrug off rifle fire; only the PIAT and the anti-tank gun hurt them. As the German player, bring them with infantry.', tag: 'reconstruction' }
      ] }
  ],

  citations: {
    established: { title: 'Established', intro: 'Accepted by historians because the British reports, the German records and the veterans of both sides agree on it.', items: [
      { ref: 'S. E. Ambrose, Pegasus Bridge: June 6, 1944 (Simon & Schuster, 1985)', note: 'The standard account, built from interviews with Howard, Wallwork, Thornton, the Gondrées and the German garrison commander Hans Schmidt.' },
      { ref: 'W. Fowler, Pegasus Bridge: Bénouville, D-Day 1944 (Osprey Raid 11, 2010)', note: 'Illustrated reconstruction with maps and the timings.' },
      { ref: 'N. Barber, The Pegasus and Orne Bridges (Pen & Sword, 2009)', note: 'The fullest modern study, with the German side.' },
      { ref: 'L. F. Ellis, Victory in the West, vol. I (HMSO, 1962), ch. 8', note: 'The British official history.' },
      { ref: 'C. Ryan, The Longest Day (1959)', note: 'The popular account and the basis of the 1962 film, which ends with Lovat’s crossing.' }
    ] },
    british: { title: 'British account', intro: 'The British side wrote its reports within weeks and the men told the story for fifty years. It is detailed and consistent, and it is the winners’ story: German numbers and intentions in it are what the British saw or guessed.', items: [
      { ref: 'Major R. J. Howard, Report on Operation Deadstick, 2nd Bn Ox and Bucks Light Infantry, June 1944', note: 'The commander’s report, the backbone of every account. The National Archives, WO 171/1357.' },
      { ref: 'War diaries, 2nd Ox and Bucks and 7th Parachute Battalion, June 1944', note: 'The National Archives, WO 171.' },
      { ref: 'Interviews with John Howard, Jim Wallwork, Wagger Thornton, Tod Sweeney, Dennis Fox and others, 1983–84, in Ambrose, Pegasus Bridge', note: 'The veterans’ memories, forty years on.' },
      { ref: 'Lord Lovat, March Past (1978)', note: 'The commando commander’s memoir, including the crossing at 13:00.' },
      { ref: 'J. Howard & P. Bates, The Pegasus Diaries (Pen & Sword, 2006)', note: 'Howard’s own diaries, published after his death.' }
    ] },
    german: { title: 'German account', intro: 'The German side is thinner: a coastal division’s records, the 21st Panzer Division’s war diary, and the memories of a few men, chiefly Major Hans Schmidt, the garrison commander, interviewed by Ambrose in the 1980s.', items: [
      { ref: 'Hans Schmidt, interviews in Ambrose, Pegasus Bridge (1985)', note: 'The garrison, the charges, the staff car, the capture.' },
      { ref: '716. Infanterie-Division and 21. Panzer-Division war diaries, June 1944 (Bundesarchiv-Militärarchiv, Freiburg)', note: 'The orders and the delays on the German side.' },
      { ref: 'H. von Luck, Panzer Commander (1989), ch. 12', note: 'A 21st Panzer regimental commander on the night of 5–6 June and the orders that did not come.' },
      { ref: 'E. Feuchtinger, statements to the Canadian Army historical section, 1945', note: 'The division commander’s account of D-Day.' }
    ] },
    estimate: { title: 'Estimate', intro: 'Neither side counted the Germans at the bridges. These figures come from historians comparing the records.', items: [
      { ref: 'Barber, The Pegasus and Orne Bridges (2009)', note: 'Garrison strength and the counter-attacks.' },
      { ref: 'Fowler, Pegasus Bridge (Osprey, 2010)', note: 'Orders of battle for both sides.' }
    ] },
    reconstruction: { title: 'Reconstruction', intro: 'Choices made for this game so that the battle can be shown and played. They are not claims about what happened.', items: [
      { ref: 'The map', note: 'A schematic of the two bridges and the villages after the sketch maps in Howard’s report and Fowler, about one metre to the pixel; nothing is surveyed.' },
      { ref: 'Positions, timings and strengths', note: 'Thirteen hours are shown in about four minutes; companies and platoons are blocks of figures; strength percentages stand for fighting power, not head counts.' },
      { ref: 'The German player', note: 'The Germans never had a single commander at the bridges that night. Command mode gives you one, and the tanks and infantry that history sent piecemeal.' }
    ] }
  },
  /* Library of sources (../library.html?battle=pegasus): public-domain books kept here as PDFs (`local`, in sources/) with links to
     where they came from; modern works still in copyright are listed with a link only. */
  library: [
    { title: "By Air to Battle: the official account of the British Airborne Divisions", author: "Air Ministry and War Office (HMSO)", year: "1945", kind: "Official account", about: "The wartime official account of the airborne forces, including the coup de main on the Orne bridges.", citedIn: "Background", rights: "Crown copyright on published works lasts 50 years, so it has expired.", local: null, archive: "https://archive.org/search?query=By+Air+to+Battle+1945+airborne+divisions" },
    { title: "Pegasus Bridge", author: "Stephen E. Ambrose", year: "1985", kind: "History", about: "The standard account, from both sides, built on interviews with the men.", citedIn: "Most chapters", rights: "Still in copyright: listed for reference.", local: null, linkOnly: true }
  ],

  sources: [
    { title: 'Ambrose, Pegasus Bridge (1985)', note: 'the standard account, from both sides' },
    { title: 'Howard, Report on Operation Deadstick (1944)', note: 'the original report' },
    { title: 'Barber, The Pegasus and Orne Bridges (2009)', note: 'the fullest modern study' },
    { title: 'Fowler, Pegasus Bridge (Osprey, 2010)', note: 'maps and orders of battle' },
    { title: 'Lovat, March Past (1978)', note: 'the commandos’ arrival' },
    { title: 'von Luck, Panzer Commander (1989)', note: 'the German armour on D-Day' }
  ],

  imageBase: 'images/',
  audioBase: 'audio/',
  /* One narrator for now. */
  voices: [
    { id: 'clear', name: 'Narrator · clear', speaker: 25 }
  ],
  commandLines: {
    sighted:  'Enemy formation sighted.',
    breaks:   'One of your formations has broken and is falling back.',
    lift:     'A glider is down. The platoon is yours once it is out of the wreck.',
    wave:     'Movement on the road. They are coming.',
    support:  'Mortar fire on the way. Anyone inside the circle will be hit.',
    night:    'Night. Visibility is down; the enemy can close unseen.',
    belt:     'The enemy is inside sixty metres. Mortar fire on them now would hit your own men.',
    objective: 'A bridge has changed hands.'
  }
};
