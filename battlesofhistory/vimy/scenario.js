/* Battle of Vimy Ridge, 9-12 April 1917: scenario (the battle page is still to be built).
   For now it holds the library of sources, which library.html?battle=vimy lists. */
window.VIMY_SCENARIO = window.VIMY_SCENARIO || {};
Object.assign(window.VIMY_SCENARIO, {
  id: 'vimy',
  title: 'Battle of Vimy Ridge',
  library: (() => {
    const NLS = 'Ordnance Survey / Field Survey (GSGS), Crown copyright expired. Scan: National Library of Scotland, CC BY ("Reproduced with the permission of the National Library of Scotland").';
    const M = (id, title, year, about) => ({ title, author: 'British Army trench map (Ordnance Survey / GSGS)', year, kind: 'Trench map',
      about, citedIn: 'The trenches-and-tunnels timeline', rights: NLS, local: 'trench-maps/nls/nls-' + id + '.jpg', localLabel: '🗺 Open the map (large image) ▸',
      link: 'https://maps.nls.uk/view/' + id, linkLabel: 'National Library of Scotland viewer' });
    return [
      { title: 'Canadian Expeditionary Force 1914–1919', author: 'G. W. L. Nicholson', year: 1962, kind: 'Official history',
        about: 'The official history of the Canadian Army in the First World War. Chapter VIII (pp. 233–268) is the Battle of Vimy Ridge; Map 7 shows the Black, Red, Blue and Brown lines and the advance of 9–12 April.',
        citedIn: 'The narration and the battle lines', rights: 'Canadian Crown copyright, 1962; public domain in Canada.', localLabel: '🗺 Map 7',
        local: 'nicholson-map7-vimy-ridge-9-12-april-1917.jpg', localNote: 'The full book is free from the Department of National Defence (Directorate of History and Heritage).' },
      M('101465023', 'Sheet 36C S.W. (Vimy–Lens), 1:20,000, Edition 6', 'Trenches to 15 February 1916', 'The whole of Vimy Ridge and Lens while the French still held the line, a month before the British took over. German trenches in red, French and British in blue.'),
      M('101465071', 'Sheet 51B N.W. (Arras), 1:20,000, Edition 4A', 'Trenches to 10 October 1916', 'The south half of the ridge (Neuville-St-Vaast, Thélus, Farbus) as the Canadian Corps arrived.'),
      M('101464753', 'Sheet 51B.NW.1 Roclincourt, 1:10,000, Edition 5A', 'Trenches to 27 December 1916', 'The south half of the battlefield in fine detail, every German trench named: Zwölfer Graben, Hapsburger Weg, the Albrecht Stellung.'),
      M('101464744', 'Sheet 36C.SW.1 Lens, 1:10,000, Edition 8A', 'Trenches to 10 February 1917', 'Lens, Liévin and Angres: the north-east edge of the battlefield, toward the Pimple.'),
      M('101465068', 'Sheet 51B N.W. (Arras), 1:20,000, Edition 6A', 'Trenches to 4 March 1917', 'Five weeks before the attack: the trench system the Canadians faced on 9 April.'),
      M('101465065', 'Sheet 51B N.W. (Arras), 1:20,000, Edition 7A', 'Trenches to 25 May 1917', 'After the battle: the new front on the plain below the ridge.')
    ];
  })()
});
