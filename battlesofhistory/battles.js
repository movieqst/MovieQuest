/* The list of battles. Cards below the timeline are ordered by `order`: the highest number is shown first. Give a new card the next number, and bump a card's number when it is updated, so it moves to the front. The timeline uses `year`. Add a new entry here when a new battle folder is added; index.html reads it.
   Each entry: folder (the subfolder with its own index.html), title, date (text), year (a number for the
   timeline: negative for BCE), place, sides, blurb, cover (a picture inside the folder's images/),
   coverCredit, and status: 'ready' | 'in progress'. */
window.BATTLES = [
  {
    folder: 'kadesh',
    order: 1,
    era: 'Bronze Age',
    title: 'Battle of Kadesh',
    date: 'c. 1274 BCE', year: -1274,
    place: 'Orontes River, Syria',
    sides: 'Egypt under Ramesses II vs. the Hittite Empire under Muwatalli II',
    sideColors: ['#c0392b', '#2e5aa8'],
    blurb: 'The earliest battle in history we can follow move by move. Two Shasu spies, a chariot ambush on a marching column, and a pharaoh who carved his version on five temples.',
    cover: 'images/02-abu-simbel-chariot.jpg',
    coverCredit: 'Relief at Abu Simbel. Photo: Diego Delso, Wikimedia Commons, CC BY-SA 4.0',
    status: 'ready'
  },
  {
    folder: 'iadrang',
    order: 2,
    era: 'Vietnam War',
    title: 'Battle of the Ia Drang',
    date: '14–18 November 1965', year: 1965,
    place: 'Ia Drang valley, Central Highlands, South Vietnam',
    sides: 'United States 1st Cavalry Division (Airmobile) vs. the People’s Army of Vietnam',
    sideColors: ['#c0392b', '#2e5aa8'],
    blurb: 'The first battle between the US Army and the North Vietnamese regulars: three days in a clearing below a mountain at LZ X-Ray, then the ambush of a column on the way to LZ Albany.',
    cover: 'images/17-xray-perimeter.jpg',
    coverCredit: 'US Army photograph, public domain',
    status: 'ready'
  },
  {
    folder: 'pegasus',
    order: 3,
    era: 'Second World War',
    title: 'Pegasus Bridge',
    date: '5–6 June 1944', year: 1944,
    place: 'Bénouville and Ranville, Normandy',
    sides: 'British 6th Airborne Division vs. the German 716th Infantry and 21st Panzer Divisions',
    sideColors: ['#c0392b', '#2e5aa8'],
    blurb: 'The first fight of D-Day: six gliders land beside two bridges at a quarter past midnight, 181 men take both in minutes, and hold them until the commandos arrive from the beach.',
    cover: 'images/32-art-bridge-night.jpg',
    coverCredit: 'Painting: Battle Games, original artwork',
    status: 'ready'
  },
  {
    folder: 'gaugamela',
    order: 4,
    era: 'Classical Antiquity',
    title: 'Battle of Gaugamela',
    date: '1 October 331 BCE', year: -331,
    place: 'Near Gaugamela, northern Mesopotamia',
    sides: 'Macedonian army under Alexander III vs. Persian army under Darius III',
    sideColors: ['#c0392b', '#2e5aa8'],
    blurb: 'Alexander’s oblique advance, the scythed chariots, and the break in the Persian centre, on a plain whose site is not known. Watch the reconstruction or command either army.',
    cover: 'images/cover.jpg',
    coverCredit: 'Original illustration for this project',
    status: 'ready'
  },
  {
    folder: 'waterloo',
    order: 5,
    era: 'Napoleonic Wars',
    title: 'Battle of Waterloo',
    date: '18 June 1815', year: 1815,
    place: 'Mont-Saint-Jean ridge, south of Brussels',
    sides: 'Napoleon’s Armée du Nord vs. Wellington’s Anglo-Allied army and Blücher’s Prussians',
    sideColors: ['#c0392b', '#2e5aa8'],
    blurb: 'The last battle of Napoleon’s return: a ridge held by redcoat squares, cuirassiers breaking up the slope, and the Prussians arriving late in the day. Watch the reconstruction or command either army.',
    cover: 'images/cover.jpg',
    coverCredit: 'Original illustration for this project',
    status: 'in progress'
  }
];
