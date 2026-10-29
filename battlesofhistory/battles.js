/* The list of battles. Add a new entry here when a new battle folder is added; index.html reads it.
   Each entry: folder (the subfolder with its own index.html), title, date, place, sides, blurb,
   cover (a picture inside the folder's images/), coverCredit, and status: 'ready' | 'in progress'. */
window.BATTLES = [
  {
    folder: 'kadesh',
    era: 'Bronze Age',
    title: 'Battle of Kadesh',
    date: 'c. 1274 BCE',
    place: 'Orontes River, Syria',
    sides: 'Egypt under Ramesses II vs. the Hittite Empire under Muwatalli II',
    blurb: 'The earliest battle in history we can follow move by move. Two Shasu spies, a chariot ambush on a marching column, and a pharaoh who carved his version on five temples.',
    cover: 'images/02-abu-simbel-chariot.jpg',
    coverCredit: 'Relief at Abu Simbel. Photo: Diego Delso, Wikimedia Commons, CC BY-SA 4.0',
    status: 'ready'
  },
  {
    folder: 'iadrang',
    era: 'Vietnam War',
    title: 'Battle of the Ia Drang',
    date: '14–18 November 1965',
    place: 'Ia Drang valley, Central Highlands, South Vietnam',
    sides: 'United States 1st Cavalry Division (Airmobile) vs. the People’s Army of Vietnam',
    blurb: 'The first battle between the US Army and the North Vietnamese regulars: three days in a clearing below a mountain at LZ X-Ray, then the ambush of a column on the way to LZ Albany.',
    cover: 'images/17-xray-perimeter.jpg',
    coverCredit: 'US Army photograph, public domain',
    status: 'in progress'
  }
];
