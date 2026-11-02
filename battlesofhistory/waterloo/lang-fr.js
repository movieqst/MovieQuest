/* Bataille de Waterloo — French text of the narration, captions and cards.
   Matches waterloo/scenario.js item for item (intro slides with their lines and media captions, events,
   campaign events, outcome, units and their lines, formations), so the page can switch language by index
   without changing anything else. Translated from the fact-checked English, keeping its hedges; to be
   reviewed by a native speaker. Narration recorded with the Piper voices fr_FR-tom and fr_FR-siwis.
   Not translated on purpose: ids, file names, numbers, coordinates, `ref` / `credit` / `cite` source
   citations, citation items, book titles and library authors. */
window.WATERLOO_LANG = window.WATERLOO_LANG || {};
window.WATERLOO_LANG.fr = {
  name: 'Français',
  title: 'Bataille de Waterloo',
  date: '18 juin 1815',
  place: 'Crête de Mont-Saint-Jean, au sud de Bruxelles (site : la crête, schématique)',
  tagline: 'Napoléon contre Wellington et Blücher',

  titleCard: {
    title: 'BATAILLE DE WATERLOO',
    date: '18 juin 1815',
    dateNote: 'La dernière bataille du retour de Napoléon après l’île d’Elbe. Les attaques françaises échouèrent sur la crête ; les Prussiens arrivèrent sur la droite française et l’armée française se rompit.',
    place: 'La crête de Mont-Saint-Jean, au sud de Bruxelles',
    sides: 'L’Armée du Nord de Napoléon  ·  l’armée anglo-alliée de Wellington et les Prussiens de Blücher'
  },

  confidence: {
    established: { label: 'Établi', desc: 'Généralement admis par les historiens.' },
    account: { label: 'Témoignage', desc: 'Tiré d’un récit nommé, contemporain ou postérieur. Ces récits sont partiels, et pas toujours neutres.' },
    disputed: { label: 'Contesté', desc: 'Les sources ou les spécialistes ne sont pas d’accord sur ce point.' },
    estimate: { label: 'Estimation', desc: 'Une estimation savante moderne, et non un chiffre enregistré.' },
    reconstruction: { label: 'Reconstitution', desc: 'Notre propre choix pour rendre la bataille jouable : positions, horaires et échelle de la carte.' }
  },

  sides: { allied: { name: 'Alliés' }, french: { name: 'Français' } },

  leaders: { napoleon: 'Napoléon', wellington: 'Wellington', ney: 'Ney', blucher: 'Blücher', grouchy: 'Grouchy' },

  /* battlefield.labels, same order */
  labels: [
    'Côté allié (nord)',
    'Côté français (sud)',
    'Chemin d’Ohain (creux, sur la crête)',
    'Route de Bruxelles',
    'Papelotte',
    'Plancenoit',
    'La Belle-Alliance (Napoléon)',
    'Mont-Saint-Jean'
  ],
  scaleLabel: 'schématique, pas à l’échelle',

  welcome: 'Bienvenue dans Batailles de l’Histoire. Aujourd’hui, nous découvrons la bataille de Waterloo, livrée le 18 juin 1815 entre l’armée alliée de Wellington, avec les Prussiens de Blücher, et l’armée française de Napoléon.',

  intro: [
    { title: 'BATAILLE DE WATERLOO',
      subtitle: '18 juin 1815 · au sud de Bruxelles',
      lines: [
        'Napoléon s’était échappé de l’île d’Elbe et avait repris le pouvoir. Son retour allait durer cent jours, et c’est cette bataille qui en décida l’issue.',
        'Deux jours plus tôt, l’armée alliée et les Prussiens avaient été séparés. Wellington prit position sur la crête de Mont-Saint-Jean, et Blücher venait le rejoindre.',
        'Cette introduction distingue ce que disent les sources de ce que les historiens ont reconstitué. Soyez attentifs aux étiquettes de couleur.'
      ],
      media: [
        'La Bataille de Waterloo, de Jan Willem Pieneman, peinte en 1824. Au centre, Wellington reçoit la nouvelle de l’avance prussienne. La scène est composée : une reconstitution de peintre, et non la vue d’un témoin.',
        'La Bataille de Waterloo, du peintre irlandais William Sadler, peinte en juin 1815, le mois même de la bataille : les tuniques rouges, la fumée et la ferme en feu sous un ciel d’orage. La vision d’un peintre, et non le récit d’un témoin.',
        'Napoléon dans son cabinet de travail, par Jacques-Louis David (1812). Trois ans plus tard, il s’échappa de l’île d’Elbe et revint au pouvoir pour les Cent-Jours.'
      ] },
    { title: 'La crête',
      lines: [
        'Wellington plaça l’essentiel de son infanterie sur la contre-pente de la crête, à l’abri des regards et hors de portée des canons français.',
        'Le chemin creux qui longeait la crête, bordé de haies, était la ligne que les Français devaient atteindre.',
        'Hougoumont, un ensemble de bâtiments de ferme entouré de murs, se dressait sur la droite alliée. La Haie-Sainte, une ferme au bord de la route de Bruxelles, se trouvait au centre.',
        'Il avait plu à verse toute la nuit. L’attaque française ne commença qu’en fin de matinée, quand le sol eut un peu séché.'
      ],
      media: [
        'Le duc de Wellington, par sir Thomas Lawrence (1815–1816), peint peu après la bataille.',
        'Hougoumont aujourd’hui : la cour et la petite chapelle, qui a survécu à l’incendie du château voisin pendant la bataille. Le pan de mur en ruine à côté de la chapelle est ce qui reste du château.',
        'La Haie-Sainte au bord de la route de Bruxelles, quelques années après la bataille : une lithographie d’après un dessin de Mogford. Les deux monuments sur la crête, à l’arrière-plan, ont été élevés après 1815.',
        'La ferme de la Haie-Sainte en 1816, l’année qui suivit la bataille, dessinée par Robert Hills lors d’une visite du champ de bataille. Les murs sont encore criblés d’impacts.'
      ] },
    { title: 'L’armée française',
      lines: [
        'Napoléon regroupa les canons de l’armée en une grande batterie, face au centre gauche de la ligne alliée. Le nombre de pièces est contesté : selon les sources, il y en avait entre environ quarante et quatre-vingts.',
        'Le corps d’infanterie de d’Erlon attaqua la gauche alliée. Plus tard dans l’après-midi, cuirassiers et lanciers chargèrent à maintes reprises le centre droit allié.',
        'L’armée française comptait environ 72 000 hommes, l’armée alliée environ 68 000, et les Prussiens environ 50 000. Ce sont des estimations courantes ; les sources ne concordent pas.'
      ],
      media: [
        'Le maréchal Michel Ney, gravé par Henry Richard Cook en 1817 d’après un portrait de François Gérard. Ney mena les attaques françaises contre la crête dans l’après-midi. Il fut fusillé pour trahison à Paris en décembre de la même année.',
        'Cuirassiers français chargeant les carrés britanniques, par Félix Philippoteaux (1874). Peint soixante ans plus tard ; les uniformes sont dessinés avec soin, la scène est imaginée.'
      ] },
    { title: 'Les Prussiens',
      lines: [
        'Blücher avait été battu à Ligny deux jours plus tôt. Son armée se replia, puis marcha vers Waterloo.',
        'Les premiers Prussiens, le corps de Bülow, atteignirent la droite française en fin d’après-midi. L’heure exacte est contestée ; les sources la situent entre environ 16 h 30 et 17 h.',
        'Napoléon avait envoyé le maréchal Grouchy, avec environ 33 000 hommes, poursuivre les Prussiens. Grouchy combattit leur arrière-garde à Wavre et n’atteignit jamais Waterloo.'
      ],
      media: [
        'Le feld-maréchal Gebhard Leberecht von Blücher, commandant de l’armée prussienne, alors âgé de 72 ans. Deux jours avant Waterloo, à Ligny, la cavalerie lui passa sur le corps, et il conduisit pourtant son armée au secours de Wellington.',
        'L’infanterie prussienne donne l’assaut à Plancenoit, tenu par la Jeune Garde, par Adolph Northen (1864). Peint près de cinquante ans plus tard : le peintre est né après la bataille.',
        'Emmanuel de Grouchy, ici en général d’Empire, avant que Napoléon ne le fasse maréchal en 1815. À Waterloo, il poursuivait les Prussiens vers Wavre avec environ 33 000 hommes, et n’atteignit jamais le champ de bataille.'
      ] },
    { title: 'Les sources',
      lines: [
        'Beaucoup des récits de cette bataille ont été écrits par des hommes qui l’avaient vécue, des décennies plus tard. Certains furent écrits pour défendre la réputation d’un chef.',
        'Le camp français a sa propre collection de témoignages, dont beaucoup ont été publiés pour la première fois ces dernières années.',
        'Quand une histoire est célèbre mais non confirmée, le Registre le signale.'
      ],
      media: [
        'Carte du champ de bataille tirée des Waterloo Letters, publiées en 1891 : les lettres que des officiers britanniques survivants écrivirent à William Siborne dans les années 1830, quand il construisait sa maquette de la bataille. Le sud est en haut : la Belle-Alliance en haut, Hougoumont à droite, la Haie-Sainte sur la route de Bruxelles, Mont-Saint-Jean en bas.',
        'La reliure d’origine du Journal of the Waterloo Campaign du capitaine Cavalié Mercer, frappée de l’insigne de la Royal Artillery. Rédigé à partir de notes prises sur le moment, il fut publié en 1870, deux ans après sa mort. L’intégralité du premier volume, avec son récit de la bataille, se trouve dans notre bibliothèque des sources.'
      ] },
    { title: 'Comment lire cette reconstitution',
      lines: [
        'Les positions, les horaires et les mouvements sur cette carte sont une reconstitution. Les récits des témoins et des historiens modernes racontent une histoire ; la carte montre où cette histoire place les troupes.',
        'Appuyez à tout moment sur « Expliquer ce moment » pour comprendre pourquoi un chef a pu agir comme il l’a fait.'
      ],
      media: [
        'Scotland Forever!, de Lady Butler (1881) : la charge des Scots Greys, peinte 66 ans plus tard. Une image célèbre, et une scène imaginée : comme cette carte, une reconstitution.'
      ] },
    { title: 'Les armées sont en place. Que se passe-t-il ensuite ?',
      lines: [
        'L’histoire continue sur la crête. Choisissez comment la découvrir.',
        'Regarder la reconstitution : la bataille en chapitres commentés, des premiers coups de feu à Hougoumont jusqu’à la dernière attaque de la Garde impériale, puis un bilan de ce que disent les sources.',
        'Prendre le commandement : dirigez l’une des armées dès le début et voyez si vous pouvez changer l’issue. Le bilan compare ensuite votre bataille avec l’histoire.'
      ],
      media: [
        'La rencontre de Wellington et de Blücher après la bataille, près de l’auberge de la Belle-Alliance : la gravure de Charles William Sharpe, en 1879, d’après la grande peinture murale de Daniel Maclise au palais de Westminster. Le lieu et la manière dont les deux chefs se rencontrèrent sont racontés de différentes façons.'
      ] }
  ],

  events: [
    { title: 'La crête',
      text: 'L’infanterie de Wellington est postée sur la contre-pente. Les canons sont sur la crête. L’armée française attend de l’autre côté du vallon.',
      explain: 'Pourquoi la contre-pente ? Derrière la crête, l’infanterie était à l’abri des tirs d’artillerie. Elle pouvait se lever et faire feu quand les Français arrivaient au sommet.' },
    { title: 'Hougoumont',
      text: 'La bataille s’ouvre à Hougoumont, sur la droite alliée, en fin de matinée. L’infanterie de Reille attaque la ferme fortifiée, et les combats y durent toute la journée.',
      explain: 'Beaucoup d’historiens pensent que l’attaque devait attirer les réserves de Wellington. Elle attira au contraire de plus en plus de bataillons français. Les défenseurs refermèrent la porte nord après que les Français l’eurent forcée : une histoire célèbre, que les témoins racontent chacun à leur manière.' },
    { title: 'La grande batterie ouvre le feu',
      text: 'La grande batterie française tire sur la ligne alliée. Le nombre de canons est contesté.',
      explain: 'Napoléon avait regroupé ses canons pour briser la ligne alliée avant l’attaque de l’infanterie. Le nombre de pièces, et l’ampleur des dégâts qu’elles causèrent, ne font pas l’objet d’un accord.' },
    { title: 'L’attaque de d’Erlon',
      text: 'Le corps de d’Erlon avance contre le centre gauche allié, à l’est de la route de Bruxelles. La division de Picton l’affronte aux haies qui bordent la crête.',
      explain: 'Les divisions de d’Erlon avançaient en formations exceptionnellement larges et profondes, lentes à se déployer et offrant de grandes cibles. Sir Thomas Picton fut tué en menant la contre-attaque.' },
    { title: 'La charge de la brigade de l’Union',
      text: 'Uxbridge lance la cavalerie lourde par-dessus la crête. La brigade de l’Union, avec les Scots Greys, brise l’attaque de d’Erlon et s’empare de deux aigles.',
      explain: 'Emportés par leur élan, les cavaliers poussèrent jusqu’à la grande batterie et furent taillés en pièces par les lanciers et les cuirassiers français. Jusqu’où ils allèrent, et combien de canons ils mirent hors de combat, reste contesté.' },
    { title: 'Les charges de cavalerie de Ney',
      text: 'Le maréchal Ney lance vague après vague de cuirassiers et de lanciers à l’assaut de la pente, entre Hougoumont et la Haie-Sainte, contre le centre droit allié.',
      explain: 'Pourquoi Ney attaqua, cela reste contesté : il a peut-être pris des mouvements derrière la crête pour une retraite. Les charges furent lancées sans infanterie pour les soutenir.' },
    { title: 'Les carrés tiennent',
      text: 'L’infanterie alliée se forme en carrés. La cavalerie française ne parvient pas à les enfoncer, et se replie.',
      explain: 'Le carré, baïonnettes vers l’extérieur, était la réponse de l’infanterie à la cavalerie. Sans infanterie ni canons pour exploiter la charge, la cavalerie ne pouvait pas le briser.' },
    { title: 'Les Prussiens à Plancenoit',
      text: 'Les Prussiens de Bülow arrivent par l’est et attaquent Plancenoit, sur la droite française. Le corps de Lobau est envoyé pour les contenir.',
      explain: 'L’arrivée des Prussiens obligea Napoléon à engager des troupes sur sa droite, loin du centre. L’heure exacte est contestée ; les sources la situent entre environ 16 h 30 et 17 h.' },
    { title: 'La chute de la Haie-Sainte',
      text: 'À court de munitions, la Légion allemande du roi est chassée de la Haie-Sainte. Les canons et les tirailleurs français s’approchent du centre de la ligne alliée.',
      explain: 'Les hommes du major Baring tinrent la ferme pendant la plus grande partie de la journée, jusqu’à épuisement des munitions de leurs carabines. La ferme perdue, le centre allié connut son moment le plus faible de la journée.' },
    { title: 'Zieten atteint la gauche alliée',
      text: 'Le corps prussien de Zieten atteint l’extrême gauche de Wellington. La cavalerie légère alliée de ce flanc peut désormais se porter au centre.',
      explain: 'L’arrivée de Zieten libéra les brigades de cavalerie de Vivian et de Vandeleur, qui purent raffermir le centre allié, peu avant l’attaque de la Garde impériale.' },
    { title: 'La dernière attaque',
      text: 'La Garde impériale s’avance pour la dernière attaque française. Les réserves de Wellington l’attendent sur la crête.',
      explain: 'L’attaque de la Garde est le dernier coup de dés de la journée. Les paroles attribuées à ses officiers sont contestées, et le Registre ne les rapporte pas comme des faits.' },
    { title: 'Le dénouement',
      text: 'L’attaque française est brisée. Les Prussiens poussent en avant, et l’armée française bat en retraite vers le sud. Napoléon abdiqua trois jours plus tard.',
      explain: 'La bataille mit fin aux guerres napoléoniennes. Son résultat ne fait aucun doute ; c’est sur le détail de qui fit quoi, et à quel moment, que les sources divergent.' }
  ],

  campaign: {
    title: 'La campagne',
    subtitle: '15–17 juin 1815',
    /* campaign.towns, same order */
    towns: [
      'Bruxelles', 'Waterloo', 'Mont-Saint-Jean', 'La Belle-Alliance', 'Plancenoit', 'Braine-l’Alleud',
      'Genappe', 'Quatre-Bras', 'Frasnes', 'Gosselies', 'Charleroi', 'Fleurus', 'Ligny', 'Saint-Amand',
      'Sombreffe', 'Gembloux', 'Wavre', 'Nivelles', 'Namur', 'Walhain', 'Tilly', 'Mont-Saint-Guibert',
      'Chapelle-Saint-Lambert'
    ],
    /* campaign.formations, by id */
    formations: {
      'c-reserve': { name: 'Réserve de Wellington (Picton)', division: 'Réserve alliée' },
      'c-west': { name: 'Armée de Wellington, divisions de l’ouest', division: 'Armée alliée' },
      'c-perponcher': { name: 'Division hollando-belge de Perponcher', division: 'Perponcher' },
      'c-ukcav': { name: 'Cavalerie d’Uxbridge, l’arrière-garde', division: 'Cavalerie alliée' },
      'c-zieten': { name: 'Ier corps prussien (Zieten)', division: 'Zieten' },
      'c-pirch': { name: 'IIe corps prussien (Pirch)', division: 'Pirch' },
      'c-thielmann': { name: 'IIIe corps prussien (Thielmann)', division: 'Thielmann' },
      'c-bulow': { name: 'IVe corps prussien (Bülow)', division: 'Bülow' },
      'c-reille': { name: 'IIe corps (Reille)', division: 'Reille' },
      'c-derlon': { name: 'Ier corps (d’Erlon)', division: 'd’Erlon' },
      'c-guard': { name: 'La Garde impériale', division: 'Garde impériale' },
      'c-vandamme': { name: 'IIIe corps (Vandamme)', division: 'Vandamme' },
      'c-gerard': { name: 'IVe corps (Gérard)', division: 'Gérard' },
      'c-cuir': { name: 'Cuirassiers de Kellermann', division: 'Cuirassiers' },
      'c-grouchy': { name: 'Aile de Grouchy (IIIe et IVe corps)', division: 'Grouchy' }
    },
    events: [
      { title: 'Les Cent-Jours', clock: 'De mars à juin 1815',
        text: 'En mars 1815, Napoléon s’échappa de son exil à l’île d’Elbe et reprit le trône de France. Les grandes puissances européennes le déclarèrent hors la loi et se préparèrent à le combattre. Wellington commandait des troupes britanniques, néerlandaises, belges et allemandes dans l’ouest de la Belgique, tandis que les corps prussiens de Blücher étaient répartis plus à l’est, de Charleroi vers Namur et Liège. Napoléon décida de frapper avant que les autres alliés ne puissent les rejoindre.' },
      { title: 'Le passage de la Sambre', clock: '15 juin, à l’aube',
        text: 'À l’aube du 15 juin, l’armée de Napoléon, forte d’environ 120 000 hommes, s’avança vers la Sambre. Les troupes françaises franchirent la rivière en plusieurs points et prirent Charleroi dans la matinée. Napoléon porta son coup au point de jonction des deux armées alliées, pour s’enfoncer entre elles et les battre l’une après l’autre. Les avant-postes prussiens se replièrent en combattant vers Fleurus.' },
      { title: 'Le bal de la duchesse de Richmond', clock: '15 juin, la nuit', markers: ['Le bal'],
        text: 'Ce soir-là, de nombreux officiers supérieurs et des membres de la société bruxelloise assistaient à un bal donné par la duchesse de Richmond. Wellington savait déjà que les Français avaient avancé. Pendant le bal, il reçut d’autres nouvelles. Selon un récit postérieur, il aurait reconnu que Napoléon l’avait surpris et avait gagné sur lui une journée de marche. À mesure que la nuit avançait, les officiers quittèrent le bal pour préparer leurs hommes et rejoindre les troupes en marche vers le sud.' },
      { title: 'Ligny', clock: '16 juin, l’après-midi',
        text: 'Le 16, Napoléon attaqua environ quatre-vingt mille Prussiens, issus de trois corps, rassemblés autour de Ligny et de Saint-Amand. Tout l’après-midi, les deux armées se disputèrent les villages, maison par maison. Le soir, Napoléon engagea la Garde impériale, et le centre prussien céda.' },
      { title: 'Quatre-Bras', clock: '16 juin, l’après-midi',
        text: 'Au même moment, à environ onze kilomètres à vol d’oiseau, le maréchal Ney attaqua le carrefour des Quatre-Bras. Celui-ci fut d’abord défendu par les troupes hollando-belges du général Perponcher. Wellington arriva dans la matinée, avant le début de l’attaque principale de Ney, et tout l’après-midi ses régiments arrivèrent par la route de Bruxelles pour être jetés dans la bataille. À la tombée de la nuit, Ney avait été contenu, et le carrefour était toujours aux mains des alliés.' },
      { title: 'Le corps qui ne combattit nulle part', clock: '16 juin, le soir',
        text: 'Entre les deux batailles, le corps de d’Erlon, fort d’environ vingt mille hommes, fut dirigé vers Ligny, puis rappelé par Ney. Il marcha entre les deux champs de bataille et ne combattit sur aucun. Son absence a peut-être privé les Français d’une victoire plus complète à Ligny, ou d’un succès aux Quatre-Bras. Les historiens débattent encore de ce que son arrivée aurait pu changer.' },
      { title: 'Blücher désarçonné', clock: '16 juin, la nuit',
        text: 'À Ligny, Blücher, âgé de soixante-douze ans, mena une dernière charge de cavalerie. Son cheval fut abattu et tomba sur lui. Des cavaliers français passèrent tout près, mais son aide de camp, le comte Nostitz, resta auprès de lui jusqu’à ce que des soldats prussiens puissent le dégager. Pendant que Blücher était porté disparu, son chef d’état-major, Gneisenau, dirigea les troupes vaincues d’abord vers Tilly, puis vers Wavre, les gardant à portée de Wellington.' },
      { title: 'Vers le nord, pas vers l’est', clock: '17 juin',
        text: 'En se retirant vers le nord, sur Wavre, et non vers l’est, en direction de leur pays, les Prussiens maintinrent les deux armées alliées assez proches pour se soutenir, et rendirent possible leur coopération à Waterloo. Napoléon envoya le maréchal Grouchy, avec environ trente-trois mille hommes, poursuivre les Prussiens, les attaquer si possible et les empêcher de rejoindre Wellington. Grouchy avança lentement, par Gembloux, où il fit halte pour la nuit.' },
      { title: 'Retraite sous l’orage', clock: '17 juin, l’après-midi',
        text: 'Apprenant que Blücher s’était retiré de Ligny, Wellington quitta les Quatre-Bras, son flanc gauche découvert, et marcha vers le nord, vers la crête de Mont-Saint-Jean. La cavalerie française poursuivit son arrière-garde et se heurta à la cavalerie britannique près de Genappe. Un violent orage s’abattit sur la retraite, changeant les routes et les champs en bourbier.' },
      { title: 'La veille', clock: 'Nuit du 17 au 18 juin',
        text: 'Toute la nuit, la pluie tomba sur deux armées couchées en plein champ, à quelques kilomètres l’une de l’autre. Wellington se prépara à combattre sur la crête, à condition que Blücher vienne de Wavre à son secours, et pendant la nuit les Prussiens confirmèrent leur promesse de marcher. À l’aube, le corps prussien de Bülow se mit en route vers l’ouest depuis Wavre, par des chemins boueux, pour porter secours à Wellington avant même le début de la bataille.' },
      { title: '18 juin', clock: 'le matin', markers: ['Walhain'],
        text: 'Le matin du 18 juin, Napoléon retarda son attaque, le temps que son armée se rassemble et que le sol détrempé commence à sécher. Près de Walhain, Grouchy entendit le canon de Waterloo. Le général Gérard le pressa de marcher au canon, mais Grouchy refusa et continua de poursuivre les Prussiens vers Wavre. La bataille de Waterloo avait commencé.' }
    ]
  },

  outcome: [
    'Les attaques françaises contre la crête échouèrent, et les Prussiens surgirent sur la droite française.',
    'L’armée de Napoléon se rompit et battit en retraite vers le sud. Napoléon abdiqua trois jours plus tard, et les guerres napoléoniennes prirent fin.',
    'Les sources donnent des chiffres de pertes très différents. Les historiens les traitent comme des estimations.',
    'Les récits de la journée, comme celui de la porte d’Hougoumont ou de la charge des Scots Greys, sont racontés des deux côtés, et pas toujours avec exactitude.'
  ],

  commandLines: {
    allied: 'Vous commandez l’armée alliée sur la crête. Votre infanterie est cachée sur la contre-pente. Les canons et la cavalerie français remontent le vallon.',
    french: 'Vous commandez l’armée française. Votre grande batterie est dans le vallon ; l’infanterie alliée est cachée sur la crête. Les Prussiens arrivent par l’est.'
  },

  /* ai.plans captions, same length as each side's plans; null where the English plan has no caption */
  ai: {
    french: [
      null,
      { title: 'Hougoumont attaqué', text: 'L’infanterie de Reille attaque Hougoumont, sur votre droite.' },
      { title: 'D’Erlon avance', text: 'Un corps français avance sur votre centre gauche, à l’est de la route de Bruxelles.' },
      { title: 'Cavalerie sur la pente', text: 'Une masse de cavalerie française monte la pente sur votre centre droit. L’infanterie à découvert est en danger.' },
      null,
      { title: 'La Garde impériale', text: 'La Garde impériale avance sur votre centre droit.' }
    ],
    allied: [
      null,
      { title: 'La cavalerie alliée charge', text: 'La cavalerie lourde d’Uxbridge franchit la crête.' },
      { title: 'Des Prussiens sur votre droite', text: 'Le corps prussien de Bülow attaque Plancenoit, derrière votre droite.' },
      { title: 'D’autres Prussiens', text: 'Le corps prussien de Zieten a atteint la gauche alliée.' }
    ]
  },

  debrief: {
    allied: {
      victory: { title: 'Victoire alliée', text: 'Vous avez tenu la crête et brisé les attaques françaises. Les Prussiens arrivant sur la droite française auraient achevé le travail.' },
      defeat: { title: 'Défaite alliée', text: 'La crête est tombée. Les sources décrivent une position qui tint de justesse ; cette fois-ci, elle n’a pas tenu.' },
      stalemate: { title: 'Impasse', text: 'La nuit tombe : la crête est toujours tenue, et les Français sont toujours dans le vallon. Les Prussiens n’ont pas encore été décisifs.' }
    },
    french: {
      victory: { title: 'Victoire française', text: 'Vous avez brisé la ligne alliée sur la crête avant que les Prussiens ne puissent décider du sort de la journée.' },
      defeat: { title: 'Défaite française', text: 'Les attaques ont échoué sur la crête, et les Prussiens ont surgi sur votre droite. Les sources décrivent le même retournement.' },
      stalemate: { title: 'Impasse', text: 'La nuit tombe : les deux armées sont toujours sur le terrain. Les Prussiens n’ont pas encore été décisifs.' }
    }
  },

  /* units, same order; lines same order; photos: same length as the English photos, caption text where the English photo has one, else null */
  units: [
    { name: 'Infanterie de ligne britannique',
      desc: 'Les tuniques rouges, armées du mousquet Brown Bess. En carré, la réponse à la cavalerie.',
      lines: [
        'La plupart des fantassins de Wellington attendaient derrière la crête, beaucoup couchés au sol, hors de vue des canons français.',
        'Face à la cavalerie, l’infanterie se formait en carré : un rectangle creux de plusieurs rangs d’épaisseur, baïonnettes vers l’extérieur. Ce jour-là, la cavalerie française n’enfonça aucun carré de Wellington.',
        'Un soldat entraîné, armé du Brown Bess à canon lisse, pouvait tirer environ deux ou trois coups par minute.',
        'Dans ce jeu, l’infanterie à l’arrêt est difficile à enfoncer pour la cavalerie, mais un carré est une cible dense pour les canons.'
      ] },
    { name: 'Brigade de l’Union (Scots Greys)',
      desc: 'Dragons lourds venus d’Angleterre, d’Écosse et d’Irlande.',
      lines: [
        'La brigade de l’Union devait son nom à ses trois régiments : les Royal Dragoons d’Angleterre, les Scots Greys et les Inniskilling Dragoons d’Irlande.',
        'Sa charge brisa l’attaque de d’Erlon. Le sergent Charles Ewart, des Greys, prit l’aigle du 45e de ligne français, et les Royals celle du 105e.',
        'La brigade poussa jusqu’à la grande batterie et subit de lourdes pertes face aux lanciers et aux cuirassiers français. Jusqu’où elle alla reste contesté.'
      ] },
    { name: 'Légion allemande du roi',
      desc: 'Des Hanovriens au service britannique. Ses chasseurs tinrent la Haie-Sainte.',
      photos: [
        null,
        'La Haie-Sainte après la bataille, tirée de l’histoire de la campagne par William Mudford : des charrettes emportent les blessés tandis que l’on enterre les morts. La légende de Mudford indique que la ferme fut prise quand ses défenseurs eurent épuisé leurs munitions.',
        null
      ],
      lines: [
        'La Légion allemande du roi fut levée parmi des soldats hanovriens qui rejoignirent l’armée britannique après l’occupation du Hanovre par Napoléon.',
        'Son 2e bataillon léger, sous le major George Baring, tint la ferme de la Haie-Sainte, au bord de la route de Bruxelles, pendant la plus grande partie de la journée.',
        'Baring écrivit que les munitions pour leurs carabines ne leur parvinrent jamais. En début de soirée, ils furent chassés de la ferme.'
      ] },
    { name: 'Royal Artillery',
      desc: 'Batteries à pied et batteries d’artillerie à cheval sur la crête.',
      lines: [
        'Les canons de Wellington étaient surtout des pièces de 9 et de 6 livres, dont beaucoup dans des batteries rapides d’artillerie à cheval.',
        'De près, les artilleurs tiraient à mitraille : une boîte de fer-blanc remplie de balles de mousquet, qui éclatait à la sortie de la bouche comme un fusil de chasse géant. À plus longue portée, ils tiraient des boulets pleins.',
        'Les servants avaient ordre de s’abriter dans le carré le plus proche quand la cavalerie approchait, et de retourner en courant à leurs pièces quand elle se repliait. Le capitaine Mercer écrivit qu’il garda au contraire ses hommes à leurs canons.',
        'Dans ce jeu, une batterie doit s’arrêter et se mettre en batterie avant de pouvoir tirer, et se tait tant que la cavalerie est sur ses pièces.'
      ] },
    { name: 'Infanterie prussienne',
      desc: 'Infanterie de ligne et Landwehr de l’armée de Blücher.',
      lines: [
        'L’armée de Blücher mêlait des régiments de ligne réguliers et la Landwehr, la milice levée pendant la guerre de 1813.',
        'Le corps de Bülow marcha depuis Wavre par des chemins étroits et boueux, et c’est pourquoi il n’arriva qu’en fin d’après-midi.',
        'Plancenoit changea de mains plusieurs fois avant que les Prussiens ne le tiennent dans la soirée, et leur poursuite transforma la retraite française en déroute.'
      ] },
    { name: 'Infanterie de ligne française',
      desc: 'Fantassins en habit bleu, attaquant en colonne.',
      photos: [
        'La porte sud d’Hougoumont, du côté d’où attaquaient les Français. Une plaque sur le mur, à droite de la porte, rend hommage aux Coldstream Guards, qui aidèrent à tenir la ferme toute la journée.',
        null
      ],
      lines: [
        'L’infanterie de ligne française portait l’habit bleu et le fusil de Charleville. Elle attaquait d’ordinaire en colonne et combattait en ligne.',
        'Lors de l’attaque de d’Erlon, des divisions entières avancèrent en bataillons serrés les uns derrière les autres : une masse large et profonde, lente à se déployer et difficile à manquer.',
        'À Hougoumont, l’infanterie de Reille combattit toute la journée pour une ferme qui ne devait être qu’une attaque secondaire.'
      ] },
    { name: 'Cuirassiers',
      desc: 'Cavalerie lourde portant cuirasse et casque d’acier.',
      lines: [
        'Les cuirassiers portaient une cuirasse et un casque d’acier. Ils formaient la cavalerie lourde de l’armée française.',
        'Dans l’après-midi, le maréchal Ney les lança contre les carrés alliés, charge après charge, avec trop peu d’infanterie ou d’artillerie pour exploiter leur effort.',
        'Les charges n’enfoncèrent pas un seul carré, et la cavalerie française était épuisée avant l’attaque de la Garde impériale.'
      ] },
    { name: 'Lanciers',
      desc: 'Cavalerie légère armée d’une lance d’environ 2,75 mètres.',
      lines: [
        'Une lance portait plus loin qu’un sabre, et pouvait atteindre un homme à terre. Les lanciers étaient redoutés de la cavalerie prise en désordre.',
        'Les lanciers de Jacquinot contre-chargèrent la brigade de l’Union au milieu des canons de la grande batterie et lui infligèrent de lourdes pertes.',
        'Les lanciers rouges de la Garde impériale prirent part aux grandes charges de cavalerie de l’après-midi.'
      ] },
    { name: 'Artillerie française',
      desc: 'La grande batterie et les canons des corps d’armée.',
      lines: [
        'Napoléon avait été formé comme officier d’artillerie, et il concentrait ses canons. La grande batterie se dressait sur une légère éminence, face au centre gauche allié.',
        'Le nombre de ses canons est contesté : les sources en donnent d’environ 40 à 84.',
        'Selon des témoins, beaucoup de boulets s’enfoncèrent dans le sol détrempé par la pluie de la nuit, au lieu de ricocher à travers les rangs.'
      ] },
    { name: 'Garde impériale',
      desc: 'La réserve d’élite de Napoléon, des vétérans choisis dans la ligne.',
      lines: [
        'La Garde impériale était la réserve d’élite de Napoléon. Ses soldats étaient des vétérans choisis dans le reste de l’armée.',
        'Dans la soirée, des bataillons de la Moyenne Garde attaquèrent le centre droit allié. La mousqueterie et le canon les repoussèrent, et leur retraite déclencha l’effondrement de l’armée française.',
        'La Jeune Garde et la Vieille Garde combattirent les Prussiens dans Plancenoit. Les paroles célèbres attribuées à des officiers de la Garde à la fin de la journée sont contestées.'
      ] }
  ],

  /* citations: title and intro only; the items stay in their original language */
  citations: {
    established: { title: 'Établi', intro: 'Admis par les historiens, car les dates, les chefs et l’issue concordent d’une source à l’autre.' },
    account: { title: 'Témoignage', intro: 'Tiré de récits nommés, contemporains ou postérieurs. Ils sont partiels, et certains furent écrits pour défendre une réputation.' },
    disputed: { title: 'Contesté', intro: 'Les sources ou les spécialistes divergent. Le jeu montre le désaccord au lieu de prendre parti.' },
    estimate: { title: 'Estimation', intro: 'Des estimations modernes, et non des décomptes. À utiliser comme une fourchette.' },
    reconstruction: { title: 'Reconstitution', intro: 'Des choix faits pour ce jeu afin que la bataille puisse être montrée et jouée. Ce ne sont pas des affirmations sur ce qui s’est passé.' }
  },

  /* battlefield formations, by id */
  formations: {
    hougo: { name: 'Garnison d’Hougoumont (Gardes, Nassauviens, Hanovriens)', division: 'Hougoumont',
      count: 'Quelques bataillons, engagés au fil de la journée',
      note: 'Les compagnies légères des Foot Guards tenaient le château et ses murs, avec des troupes de Nassau et de Hanovre dans le bois et le verger.' },
    lhs: { name: 'Garnison de la Haie-Sainte (2e bataillon léger de la Légion allemande du roi)', division: 'La Haie-Sainte',
      count: 'Environ 400 hommes au départ, renforcés ensuite',
      note: 'Les chasseurs du major Baring tinrent la ferme jusqu’à épuisement de leurs munitions, en début de soirée.' },
    'guards-b': { name: 'Foot Guards britanniques (Maitland)', division: 'Gardes',
      count: 'Deux bataillons du 1st Foot Guards',
      note: 'Derrière la crête, au centre droit allié, là où la Garde impériale attaqua dans la soirée.' },
    alten: { name: 'Division Alten (Britanniques, Légion allemande du roi, Hanovriens)', division: 'Centre',
      count: 'Une partie des quelque 68 000 soldats alliés (estimation)',
      note: 'Le centre de la ligne, de part et d’autre de la route de Bruxelles.' },
    picton: { name: 'Division Picton (Britanniques et Néerlandais)', division: 'Centre gauche',
      count: 'Une partie du total allié (estimation)',
      note: 'Derrière les haies du chemin d’Ohain, à l’est de la route de Bruxelles. L’attaque de d’Erlon s’abattit sur elle.' },
    reserve: { name: 'Réserves de Brunswick et de Nassau', division: 'Réserve',
      count: 'Réserve',
      note: 'Engagées dans la ligne au cours de l’après-midi.' },
    household: { name: 'Household Brigade (Life Guards, Blues, Dragoon Guards)', division: 'Household Brigade',
      count: 'Brigade de cavalerie lourde',
      note: 'Chargea à l’ouest de la route de Bruxelles, aux côtés de la brigade de l’Union.' },
    greys: { name: 'Brigade de l’Union (Royals, Scots Greys, Inniskillings)', division: 'Brigade de l’Union',
      count: 'Brigade de cavalerie lourde',
      note: 'Les dragons lourds anglais, écossais et irlandais dont la charge brisa l’attaque de d’Erlon.' },
    'guns-r': { name: 'Batteries alliées, à droite de la route', division: 'Artillerie alliée',
      count: 'Plusieurs batteries à pied et à cheval',
      note: 'Sur la crête. Les servants se réfugiaient dans les carrés quand la cavalerie approchait, et retournaient à leurs pièces quand elle se repliait.' },
    'guns-l': { name: 'Batteries alliées, à gauche de la route', division: 'Artillerie alliée',
      count: 'Plusieurs batteries',
      note: 'Sur la crête, au-dessus de la division Picton.' },
    zieten: { name: 'Ier corps prussien (Zieten)', division: 'Zieten',
      count: 'Une partie des quelque 50 000 Prussiens engagés (estimation)',
      note: 'Atteignit l’extrême gauche de Wellington en début de soirée.' },
    bulow: { name: 'IVe corps prussien (Bülow)', division: 'Bülow',
      count: 'Le premier corps prussien arrivé',
      note: 'Attaqua Plancenoit, derrière la droite française, à partir de la fin d’après-midi.' },
    reille: { name: 'IIe corps de Reille (division Jérôme à Hougoumont)', division: 'IIe corps',
      count: 'Une partie des quelque 72 000 Français (estimation)',
      note: 'Ses attaques contre Hougoumont ouvrirent la bataille et se poursuivirent toute la journée.' },
    derlon: { name: 'Ier corps de d’Erlon', division: 'Ier corps',
      count: 'Quatre divisions d’infanterie',
      note: 'Attaqua le centre gauche allié en début d’après-midi, en formations larges et profondes.' },
    'bat-1': { name: 'Grande batterie (ouest)', division: '',
      count: 'Le nombre de canons est contesté : environ 40 à 84',
      note: 'Sur une légère éminence devant le corps de d’Erlon. Trois figurines de canon représentent chaque partie de la batterie.' },
    'bat-2': { name: 'Grande batterie (centre)', division: 'Grande batterie',
      count: 'Une partie de la grande batterie',
      note: 'Une partie de la grande batterie.' },
    'bat-3': { name: 'Grande batterie (est)', division: '',
      count: 'Une partie de la grande batterie',
      note: 'Une partie de la grande batterie.' },
    cuir: { name: 'Cuirassiers de Milhaud', division: 'Cuirassiers',
      count: 'Corps de cavalerie lourde',
      note: 'Menèrent les grandes charges de cavalerie de l’après-midi.' },
    lancers: { name: 'Lanciers de Jacquinot', division: 'Lanciers',
      count: 'Cavalerie légère',
      note: 'Contre-chargèrent la brigade de l’Union quand elle pénétra dans la grande batterie.' },
    lobau: { name: 'VIe corps de Lobau', division: 'VIe corps',
      count: 'Corps de réserve',
      note: 'Envoyé à l’est pour contenir les Prussiens à Plancenoit.' },
    yguard: { name: 'Jeune Garde', division: 'Jeune Garde',
      count: 'Une partie de la Garde impériale',
      note: 'Envoyée à Plancenoit, qui changea de mains à plusieurs reprises.' },
    guard: { name: 'Garde impériale (Moyenne Garde)', division: 'Garde impériale',
      count: 'Plusieurs bataillons lors de la dernière attaque',
      note: 'Son attaque contre le centre droit allié, dans la soirée, fut la dernière attaque française de la journée.' }
  },

  /* library[i].about, same order */
  library: [
    'Capitaine de la Royal Horse Artillery. Sa batterie resta sur la crête pendant les charges de la cavalerie française ; son récit, où il raconte comment il garda ses artilleurs à leurs pièces, est l’un des plus saisissants de la journée. Rédigé à partir de notes prises sur le moment, publié cinquante ans plus tard.',
    'Lettres écrites dans les années 1830 par des officiers britanniques survivants à William Siborne, qui construisait sa maquette de la bataille. Chacun décrit ce qu’il a vu depuis l’endroit où il se trouvait.',
    'La première histoire britannique complète de la campagne, écrite à partir des lettres des officiers. Son récit du rôle des Prussiens fut contesté dès l’époque.',
    'Publié deux ans après la bataille, avec des planches en couleurs des fermes et du champ de bataille. Notre gravure de la Haie-Sainte après la bataille en est tirée.',
    'La visite du champ de bataille par un peintre, l’année qui suivit la bataille. Notre dessin de la Haie-Sainte de 1816 en est tiré.'
  ],
  /* the other text fields of each library entry, same order (localNote only where the English has one) */
  libraryDetails: [
    { kind: 'Journal de témoin', citedIn: 'Fiche Royal Artillery ; diapositive des sources',
      rights: 'Publié en 1870 ; Mercer est mort en 1868. Domaine public.',
      localNote: 'Le volume 1, qui couvre la bataille (environ pages 180 à 230 de notre PDF). Établi à partir de l’eBook Project Gutenberg n° 75872 ; le volume 2 reste à ajouter.' },
    { kind: 'Lettres d’officiers', citedIn: 'La carte de la diapositive des sources', rights: 'Publié en 1891. Domaine public.' },
    { kind: 'Histoire', citedIn: 'Contexte des chapitres', rights: 'Publié en 1844. Domaine public.' },
    { kind: 'Histoire illustrée de planches', citedIn: 'Fiche de la Légion allemande du roi', rights: 'Publié en 1817. Domaine public.' },
    { kind: 'Croquis de voyage', citedIn: 'Diapositive de la crête ; fiche de la Légion allemande du roi', rights: 'Publié en 1816. Domaine public.' }
  ],

  /* sources[i].note, same order (titles are citations and stay as they are) */
  sources: [
    'Vue d’ensemble et premières heures de la bataille.',
    'Corps d’armée et effectifs.',
    'Hougoumont et le déroulement de la bataille.',
    'Témoignages oculaires français.'
  ]
};

/* The French narrators (Piper voices fr_FR-tom and fr_FR-siwis); their clips are in audio/fr-tom/ and audio/fr-siwis/. */
window.WATERLOO_LANG.fr.voices = [
  { id: 'fr-tom',   name: 'Narrateur · Tom' },
  { id: 'fr-siwis', name: 'Narratrice · Siwis' }
];
