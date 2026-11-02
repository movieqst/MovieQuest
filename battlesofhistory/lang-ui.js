/* Battles of History: the page's own words (buttons, menus, panels) in other languages, for lang.js.
   BH_UI.<code>: exact English text -> translation. BH_UI_PATTERNS.<code>: [regex, replacement] for text with numbers. */
window.BH_UI = window.BH_UI || {};
window.BH_UI_PATTERNS = window.BH_UI_PATTERNS || {};
window.BH_UI.fr = {
  // top bar and controls
  '◀ Back': '◀ Retour', 'Back': 'Retour', 'Ⅱ Pause': 'Ⅱ Pause', '▶ Resume': '▶ Reprendre', 'Next ▶': 'Suivant ▶', 'Skip intro ⏭': 'Passer l’intro ⏭',
  '🗺 Map': '🗺 Carte', '🎨 Art': '🎨 Peinture', '✏ Drawn': '✏ Dessin', '📜 Intro': '📜 Intro', '▶ Watch': '▶ Regarder', '⚔ Command': '⚔ Commander',
  '◀ Battles': '◀ Retour', '⛶ Full': '⛶ Écran',   // short labels: the right-hand buttons are narrow
  '🔊 Voice': '🔊 Voix', '🔇 Voice': '🔇 Voix', '🔊 Voice on': '🔊 Voix activée', '🔇 Voice off': '🔇 Voix coupée',
  '▴ Controls': '▴ Réglages', '▾ Controls': '▾ Réglages', 'Controls': 'Commandes', '⏩ FF': '⏩ Accélérer', '⏭ Skip': '⏭ Chapitre suivant', 'Follow': 'Suivre',
  'Restart': 'Recommencer', 'Explain': 'Expliquer', 'Halt': 'Halte', 'Fall back': 'Repli', 'Select all': 'Tout sélectionner', 'Speed': 'Vitesse', 'Side': 'Camp',
  'Allied': 'Alliés', 'French': 'Français', 'Allied army': 'Armée alliée', 'French army': 'Armée française', 'Narrator': 'Narrateur', 'Narration speed': 'Vitesse de la narration',
  '⚔ Armies': '⚔ Armées', '📝 View text': '📝 Afficher le texte', '📝 View text narration': '📝 Afficher la narration', '⇄ Map': '⇄ Carte', '⇄ Enlarge': '⇄ Agrandir',
  '◀ Previous unit': '◀ Unité précédente', 'Next unit ▶': 'Unité suivante ▶', 'Close': 'Fermer', 'Continue ▶': 'Continuer ▶', 'Play': 'Jouer',
  // start screen and menus
  '🔊 Begin with narration': '🔊 Commencer avec la narration', 'Begin with narration': 'Commencer avec la narration', 'Begin without sound': 'Commencer sans le son',
  'Narration is pre-recorded, so it plays in any browser.': 'La narration est préenregistrée : elle fonctionne dans tous les navigateurs.',
  '▶ Play the reenactment': '▶ Lancer la reconstitution', '▶ Watch reenactment': '▶ Voir la reconstitution', '▶ Watch the battle unfold': '▶ Voir la bataille se dérouler',
  '▶ Watch again': '▶ Revoir', '⚔ Take command': '⚔ Prendre le commandement', '⚔ Play as Allied': '⚔ Jouer les Alliés', '⚔ Play as French': '⚔ Jouer les Français',
  '⚔ Command Allied': '⚔ Commander les Alliés', '⚔ Command French': '⚔ Commander les Français', '📜 Back to the introduction': '📜 Retour à l’introduction',
  '◀ Battles of History': '◀ Batailles de l’Histoire', 'All the battles': 'Toutes les batailles',
  // panels
  'Battlefield map': 'Carte du champ de bataille', 'Narration': 'Narration', 'Introduction': 'Introduction', 'The armies': 'Les armées', 'From the record': 'Archives',
  'Battle log': 'Journal de bataille', 'Battle timeline': 'Chronologie', 'Battlefield briefing': 'Présentation du champ de bataille', 'Selected formation': 'Formation sélectionnée',
  'Historical debrief': 'Bilan historique', 'Sources & further reading': 'Sources et lectures', 'Spoken narration': 'Narration parlée', 'Orders': 'Ordres',
  'The campaign': 'La campagne', 'The battle': 'La bataille', '15–17 June': '15–17 juin', '18 June': '18 juin', 'The reenactment': 'La reconstitution',
  'What the sources say happened next': 'Ce que disent les sources de la suite', 'The historical outcome': 'L’issue historique', 'Where this comes from': 'D’où cela vient',
  'Click a formation on the map to see who they are.': 'Cliquez sur une formation de la carte pour savoir qui elle est.',
  'Click to jump · double-click for fullscreen · Map button for the whole battlefield': 'Cliquez pour vous déplacer · double-clic pour le plein écran · bouton Carte pour tout le champ de bataille',
  'Point at a button to see the order': 'Survolez un bouton pour voir l’ordre', 'No photograph yet.': 'Pas encore de photographie.', 'More ▸': 'Plus ▸',
  // footer
  '📚 Library': '📚 Bibliothèque', '🖼 Art gallery': '🖼 Galerie', '📷 Photographs': '📷 Photographies', 'All battles’ pictures': 'Images de toutes les batailles',
  '📚 Library of sources: the old books themselves ▸': '📚 Bibliothèque des sources : les livres anciens eux-mêmes ▸',
  'Standalone HTML · no install, account, network or WebGL required · historical facts are tagged by confidence; positions, timings and the map are a reconstruction.':
    'Page autonome · aucune installation, aucun compte ni réseau requis · les faits historiques sont classés par degré de certitude ; positions, horaires et carte sont une reconstitution.',
  // tooltips
  'Timeline: click anywhere to jump to that moment': 'Chronologie : cliquez pour aller à ce moment', 'Pause and explain this moment (E)': 'Pause et explication de ce moment (E)',
  'Explain this moment': 'Expliquer ce moment', 'Skip to the next chapter (N)': 'Passer au chapitre suivant (N)', 'Zoom in (+)': 'Zoomer (+)', 'Zoom out (−)': 'Dézoomer (−)',
  'Fullscreen (or double-click the minimap)': 'Plein écran (ou double-clic sur la mini-carte)', 'Whole battlefield; drag a box to zoom back in (M)': 'Tout le champ de bataille ; tracez un cadre pour zoomer (M)',
  'Fast forward: press for 2×, again for 4×, again for normal (.)': 'Accélérer : une fois 2×, deux fois 4×, trois fois vitesse normale (.)',
  "Choose the narrator's voice": 'Choisir la voix du narrateur', 'Narration: on/off, narrator, speed': 'Narration : marche/arrêt, narrateur, vitesse',
  'Hide the text': 'Masquer le texte', 'Hide the narration text': 'Masquer le texte de la narration', 'Hide the text; the narration continues': 'Masquer le texte ; la narration continue',
  'Painted battlefield (click for the drawn map)': 'Champ de bataille peint (cliquez pour la carte dessinée)', 'Drawn battlefield (click for the painting)': 'Champ de bataille dessiné (cliquez pour la peinture)',
  'Enlarge the photo; the map shrinks into this corner': 'Agrandir la photo ; la carte se réduit dans ce coin', 'Back to the map': 'Retour à la carte',
  'The armies: full write-ups and photographs of every unit': 'Les armées : la fiche complète et les photos de chaque unité',
  'Watch the reenactment': 'Voir la reconstitution', 'Take command': 'Prendre le commandement',
  // tags shown on chips (the scenario's own labels are translated by its lang file)
  'BATTLE OF WATERLOO': 'BATAILLE DE WATERLOO', 'Battle of Waterloo — Historical Reenactment': 'Bataille de Waterloo — Reconstitution historique', 'Historical reenactment · 18 June 1815 · runs locally, no install': 'Reconstitution historique · 18 juin 1815 · fonctionne sans installation',
  '▴ Show fewer': '▴ Moins d’unités',
    'Established': 'Établi', 'Account': 'Témoignage', 'Disputed': 'Contesté', 'Estimate': 'Estimation', 'Reconstruction': 'Reconstitution'
};
window.BH_UI_PATTERNS.fr = [
  [/^Historical introduction · (\d+) \/ (\d+)$/, (m, a, b) => `Introduction historique · ${a} / ${b}`],
  [/^Next narration ▶ (\d+)$/, (m, a) => `Narration suivante ▶ ${a}`],
  [/^(\d+) visits?$/, (m, a) => `${a} visites`],
  [/^Specific record: (.*)$/, (m, a) => `Source précise : ${a}`],
  [/^(\d+) formations? selected$/, (m, a) => `${a} formation${a > 1 ? 's' : ''} sélectionnée${a > 1 ? 's' : ''}`],
  [/^No formation selected$/, () => 'Aucune formation sélectionnée'],
  [/^▾ (\d+) more units?$/, (m, a) => `▾ ${a} unité${a > 1 ? 's' : ''} de plus`],
  [/^Photo to add(.*)$/, (m, a) => `Photo à ajouter${a}`]
];
