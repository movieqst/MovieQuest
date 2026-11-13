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

window.BH_UI.zh = {
  // top bar and controls
  '◀ Back': '◀ 上一页', 'Back': '上一页', 'Ⅱ Pause': 'Ⅱ 暂停', '▶ Resume': '▶ 继续', 'Next ▶': '下一页 ▶', 'Skip intro ⏭': '跳过介绍 ⏭',
  '🗺 Map': '🗺 地图', '🎨 Art': '🎨 彩绘', '✏ Drawn': '✏ 线描', '📜 Intro': '📜 介绍', '▶ Watch': '▶ 观看', '⚔ Command': '⚔ 指挥',
  '◀ Battles': '◀ 返回', '⛶ Full': '⛶ 全屏', '🔊 Voice': '🔊 语音', '🔇 Voice': '🔇 语音', '🔊 Voice on': '🔊 语音开', '🔇 Voice off': '🔇 语音关',
  '▴ Controls': '▴ 设置', '▾ Controls': '▾ 设置', 'Controls': '设置', '⏩ FF': '⏩ 快进', '⏭ Skip': '⏭ 下一章', 'Follow': '跟随',
  'Restart': '重新开始', 'Explain': '讲解', 'Halt': '停止', 'Fall back': '后撤', 'Select all': '全选', 'Speed': '速度', 'Side': '阵营',
  'Narrator': '旁白', 'Narration speed': '旁白语速', '⚔ Armies': '⚔ 军队', '📝 View text': '📝 显示文字', '📝 View text narration': '📝 显示旁白文字',
  '⇄ Map': '⇄ 地图', '⇄ Enlarge': '⇄ 放大', '◀ Previous unit': '◀ 上一个', 'Next unit ▶': '下一个 ▶', 'Close': '关闭', 'Continue ▶': '继续 ▶', 'Play': '播放',
  // start screen and menus
  '🔊 Begin with narration': '🔊 开始（有旁白）', 'Begin with narration': '开始（有旁白）', 'Begin without sound': '开始（无声音）',
  'Narration is pre-recorded, so it plays in any browser.': '旁白为预先录制，任何浏览器都能播放。',
  '▶ Play the reenactment': '▶ 播放战役重现', '▶ Watch reenactment': '▶ 观看战役重现', '▶ Watch the battle unfold': '▶ 观看战役经过', '▶ Watch again': '▶ 再看一遍',
  '⚔ Take command': '⚔ 亲自指挥', '📜 Back to the introduction': '📜 回到介绍', '◀ Battles of History': '◀ 历史上的战役', 'All the battles': '所有战役',
  // panels
  'Battlefield map': '战场地图', 'Narration': '旁白', 'Introduction': '介绍', 'The armies': '双方军队', 'From the record': '史料图片',
  'Battle log': '战斗记录', 'Battle timeline': '时间线', 'Battlefield briefing': '战场简介', 'Selected formation': '所选部队', 'Historical debrief': '历史总结',
  'Sources & further reading': '史料与延伸阅读', 'Spoken narration': '语音旁白', 'Orders': '命令', 'The campaign': '西征', 'The battle': '战役',
  'The reenactment': '战役重现', 'What the sources say happened next': '史料记载的后续', 'The historical outcome': '历史结局', 'Where this comes from': '史料出处',
  'Click a formation on the map to see who they are.': '点击地图上的部队，查看他们是谁。',
  'Click to jump · double-click for fullscreen · Map button for the whole battlefield': '单击跳转 · 双击全屏 · “地图”按钮查看整个战场',
  'Point at a button to see the order': '把鼠标放在按钮上查看命令', 'No photograph yet.': '暂无图片。', 'More ▸': '更多 ▸', '▴ Show fewer': '▴ 收起',
  // footer
  '📚 Library': '📚 图书馆', '🖼 Art gallery': '🖼 画廊', '📷 Photographs': '📷 照片', 'All battles’ pictures': '所有战役的图片',
  '📚 Library of sources: the old books themselves ▸': '📚 史料图书馆：古书原本 ▸',
  'Standalone HTML · no install, account, network or WebGL required · historical facts are tagged by confidence; positions, timings and the map are a reconstruction.':
    '独立网页 · 无需安装、账号或网络 · 史实按可信程度标注；位置、时间和地图为复原。',
  // tooltips
  'Timeline: click anywhere to jump to that moment': '时间线：点击任意位置跳到该时刻', 'Pause and explain this moment (E)': '暂停并讲解这一刻 (E)',
  'Explain this moment': '讲解这一刻', 'Skip to the next chapter (N)': '跳到下一章 (N)', 'Zoom in (+)': '放大 (+)', 'Zoom out (−)': '缩小 (−)',
  'Fullscreen (or double-click the minimap)': '全屏（或双击小地图）', 'Whole battlefield; drag a box to zoom back in (M)': '整个战场；拖出方框可放大 (M)',
  'Fast forward: press for 2×, again for 4×, again for normal (.)': '快进：按一次2倍，再按4倍，再按恢复正常 (.)',
  "Choose the narrator's voice": '选择旁白声音', 'Narration: on/off, narrator, speed': '旁白：开关、声音、语速',
  'Hide the text': '隐藏文字', 'Hide the narration text': '隐藏旁白文字', 'Hide the text; the narration continues': '隐藏文字；旁白继续',
  'Painted battlefield (click for the drawn map)': '彩绘战场（点击切换线描地图）', 'Drawn battlefield (click for the painting)': '线描战场（点击切换彩绘）',
  'Enlarge the photo; the map shrinks into this corner': '放大图片；地图缩到这个角落', 'Back to the map': '回到地图',
  'The armies: full write-ups and photographs of every unit': '双方军队：每支部队的详细介绍和图片', 'Watch the reenactment': '观看战役重现', 'Take command': '亲自指挥', 'Click for the full write-up and photographs': '点击查看详细介绍和图片', 'Click to replay from here': '点击从这里重新播放',
  // this battle's page
  'BATTLE OF TALAS': '怛罗斯之战', 'Battle of Talas — Historical Reenactment': '怛罗斯之战 — 历史重现', 'Historical reenactment · July 751 · runs locally, no install': '历史重现 · 公元751年7月 · 无需安装',
  '⚔ Play as Tang': '⚔ 扮演唐军', '⚔ Play as Abbasid': '⚔ 扮演阿拔斯军', 'Tang': '唐', 'Abbasid': '阿拔斯',
  // tags
  'Established': '公认', 'Estimate': '估计', 'Reconstruction': '复原'
};
window.BH_UI_PATTERNS.zh = [
  [/^Historical introduction · (\d+) \/ (\d+)$/, (m, a, b) => `历史介绍 · ${a} / ${b}`],
  [/^Next narration ▶ (\d+)$/, (m, a) => `下一段旁白 ▶ ${a}`],
  [/^(\d+) visits?$/, (m, a) => `${a} 次访问`],
  [/^Specific record: (.*)$/, (m, a) => `具体出处：${a}`],
  [/^▾ (\d+) more units?$/, (m, a) => `▾ 另外 ${a} 支部队`]
];

/* Scots and Scottish Gaelic: the main buttons and panels (Stirling Bridge). The Gaelic is a first translation, to be checked. */
window.BH_UI.sco = {
  'Next ▶': 'Neist ▶', 'Skip intro ⏭': 'Hap the intro ⏭', '📜 Intro': '📜 Intro', '▶ Watch reenactment': '▶ Watch the reenactment', '▶ Watch again': '▶ Watch again',
  '🔊 Voice': '🔊 Vyce', '🔊 Voice on': '🔊 Vyce on', '🔇 Voice off': '🔇 Vyce aff', '▴ Controls': '▴ Controls', '▾ Controls': '▾ Controls', '⏩ FF': '⏩ Faister', '⏭ Skip': '⏭ Neist chaipter',
  'Restart': 'Stert again', 'Explain': 'Expleen', 'Close': 'Steek', 'Continue ▶': 'Cairry on ▶', 'Speed': 'Speed', 'Narrator': 'Tellar',
  '🔊 Begin with narration': '🔊 Stert wi the tellin', 'Begin with narration': 'Stert wi the tellin', 'Begin without sound': 'Stert wi nae soond',
  'Narration': 'The tellin', 'Introduction': 'Introduction', 'The armies': 'The airmies', 'Battle log': 'Battle log', 'Battlefield map': 'Battle map',
  'BATTLE OF STIRLING BRIDGE': 'BATTLE O STIRLIN BRIG', 'Historical reenactment · 11 September 1297 · runs locally, no install': 'Historical reenactment · 11 September 1297 · rins on yer ain machine', 'From the record': 'Fae the record', '▶ Watch': '▶ Watch', '🗺 Map': '🗺 Map', '◀ Battles': '◀ Battles', '⛶ Full': '⛶ Fu screen',
  '🖼 Slideshow': '🖼 Pictur show', '📚 Library': '📚 Leebrary', '◀ Battles of History': '◀ Battles o History', 'Sources & further reading': 'Sources an mair tae read'
};
window.BH_UI.gd = {
  'Next ▶': 'An ath fhear ▶', 'Skip intro ⏭': 'Leum thar an ro-ràdh ⏭', '📜 Intro': '📜 Ro-ràdh', '▶ Watch reenactment': '▶ Coimhead air a’ bhlàr', '▶ Watch again': '▶ Coimhead a-rithist',
  '🔊 Voice': '🔊 Guth', '🔊 Voice on': '🔊 Guth air', '🔇 Voice off': '🔇 Guth dheth', '▴ Controls': '▴ Smachd', '▾ Controls': '▾ Smachd', '⏩ FF': '⏩ Nas luaithe', '⏭ Skip': '⏭ An ath chaibideil',
  'Restart': 'Tòisich a-rithist', 'Explain': 'Mìnich', 'Close': 'Dùin', 'Continue ▶': 'Lean air adhart ▶', 'Speed': 'Astar', 'Narrator': 'Neach-aithris',
  '🔊 Begin with narration': '🔊 Tòisich le aithris', 'Begin with narration': 'Tòisich le aithris', 'Begin without sound': 'Tòisich gun fhuaim',
  'Narration': 'Aithris', 'Introduction': 'Ro-ràdh', 'The armies': 'Na feachdan', 'Battle log': 'Leabhar a’ bhlàir', 'Battlefield map': 'Mapa a’ bhlàir',
  'BATTLE OF STIRLING BRIDGE': 'BLÀR DROCHAID SHRUIGHLEA', 'Historical reenactment · 11 September 1297 · runs locally, no install': 'Ath-chruthachadh eachdraidheil · 11 Sultain 1297', 'From the record': 'Bhon chlàr', '▶ Watch': '▶ Coimhead', '🗺 Map': '🗺 Mapa', '◀ Battles': '◀ Blàran', '⛶ Full': '⛶ Làn-sgrìn', '🎨 Art': '🎨 Ealain',
  '🖼 Slideshow': '🖼 Taisbeanadh dhealbhan', '📚 Library': '📚 Leabharlann', '◀ Battles of History': '◀ Blàran na h-Eachdraidh', 'Sources & further reading': 'Tùsan is leughadh a bharrachd'
};

// Arabic and Hebrew (the Six-Day War), made with sixday/lang/ui-ar.js and ui-he.js
window.BH_UI.ar = {
  // top bar and controls
  '◀ Back': '◀ رجوع', 'Back': 'رجوع', 'Ⅱ Pause': 'Ⅱ إيقاف مؤقت', '▶ Resume': '▶ استئناف', 'Next ▶': 'التالي ▶', 'Skip intro ⏭': 'تخطي المقدمة ⏭',
  '🗺 Map': '🗺 الخريطة', '🎨 Art': '🎨 لوحة', '✏ Drawn': '✏ رسم', '📜 Intro': '📜 المقدمة', '▶ Watch': '▶ مشاهدة', '⚔ Command': '⚔ القيادة',
  '◀ Battles': '◀ المعارك', '⛶ Full': '⛶ ملء الشاشة',
  '🔊 Voice': '🔊 الصوت', '🔇 Voice': '🔇 الصوت', '🔊 Voice on': '🔊 الصوت مفعل', '🔇 Voice off': '🔇 الصوت مغلق',
  '▴ Controls': '▴ أدوات التحكم', '▾ Controls': '▾ أدوات التحكم', 'Controls': 'أدوات التحكم', '⏩ FF': '⏩ تسريع', '⏭ Skip': '⏭ الفصل التالي', 'Follow': 'متابعة',
  'Restart': 'إعادة البدء', 'Explain': 'شرح', 'Halt': 'توقف', 'Fall back': 'تراجع', 'Select all': 'تحديد الكل', 'Speed': 'السرعة', 'Side': 'الطرف',
  'Allied': 'الحلفاء', 'French': 'الفرنسيون', 'Allied army': 'جيش الحلفاء', 'French army': 'الجيش الفرنسي', 'Narrator': 'الراوي', 'Narration speed': 'سرعة السرد',
  '⚔ Armies': '⚔ الجيوش', '📝 View text': '📝 عرض النص', '📝 View text narration': '📝 عرض نص السرد', '⇄ Map': '⇄ الخريطة', '⇄ Enlarge': '⇄ تكبير',
  '◀ Previous unit': '◀ الوحدة السابقة', 'Next unit ▶': 'الوحدة التالية ▶', 'Close': 'إغلاق', 'Continue ▶': 'متابعة ▶', 'Play': 'تشغيل',
  // start screen and menus
  '🔊 Begin with narration': '🔊 ابدأ مع السرد', 'Begin with narration': 'ابدأ مع السرد', 'Begin without sound': 'ابدأ دون صوت',
  'Narration is pre-recorded, so it plays in any browser.': 'السرد مسجل مسبقا، لذلك يعمل في أي متصفح.',
  '▶ Play the reenactment': '▶ تشغيل إعادة التمثيل', '▶ Watch reenactment': '▶ مشاهدة إعادة التمثيل', '▶ Watch the battle unfold': '▶ شاهد مجرى المعركة',
  '▶ Watch again': '▶ شاهد مرة أخرى', '⚔ Take command': '⚔ تولي القيادة', '⚔ Play as Allied': '⚔ العب بالحلفاء', '⚔ Play as French': '⚔ العب بالفرنسيين',
  '⚔ Command Allied': '⚔ قيادة الحلفاء', '⚔ Command French': '⚔ قيادة الفرنسيين', '📜 Back to the introduction': '📜 العودة إلى المقدمة',
  '◀ Battles of History': '◀ معارك التاريخ', 'All the battles': 'كل المعارك',
  // panels
  'Battlefield map': 'خريطة ساحة المعركة', 'Narration': 'السرد', 'Introduction': 'المقدمة', 'The armies': 'الجيوش', 'From the record': 'من الأرشيف',
  'Battle log': 'سجل المعركة', 'Battle timeline': 'التسلسل الزمني للمعركة', 'Battlefield briefing': 'تعريف بساحة المعركة', 'Selected formation': 'التشكيل المحدد',
  'Historical debrief': 'الخلاصة التاريخية', 'Sources & further reading': 'المصادر ومزيد من القراءة', 'Spoken narration': 'السرد الصوتي', 'Orders': 'الأوامر',
  'The campaign': 'الحملة', 'The battle': 'المعركة', '15–17 June': '15–17 يونيو', '18 June': '18 يونيو', 'The reenactment': 'إعادة التمثيل',
  'What the sources say happened next': 'ما تقول المصادر إنه حدث بعد ذلك', 'The historical outcome': 'النتيجة التاريخية', 'Where this comes from': 'من أين جاء هذا',
  'Click a formation on the map to see who they are.': 'انقر على تشكيل في الخريطة لتعرف من هم.',
  'Click to jump · double-click for fullscreen · Map button for the whole battlefield': 'انقر للانتقال · انقر مرتين لملء الشاشة · زر الخريطة لساحة المعركة كلها',
  'Point at a button to see the order': 'أشر إلى زر لترى الأمر', 'No photograph yet.': 'لا توجد صورة بعد.', 'More ▸': 'المزيد ▸',
  // footer
  '📚 Library': '📚 المكتبة', '🖼 Art gallery': '🖼 معرض اللوحات', '📷 Photographs': '📷 الصور', 'All battles’ pictures': 'صور كل المعارك',
  '📚 Library of sources: the old books themselves ▸': '📚 مكتبة المصادر: الكتب القديمة نفسها ▸',
  'Standalone HTML · no install, account, network or WebGL required · historical facts are tagged by confidence; positions, timings and the map are a reconstruction.':
    'صفحة HTML مستقلة · لا تحتاج إلى تثبيت أو حساب أو اتصال بالشبكة أو WebGL · الحقائق التاريخية موسومة بحسب درجة اليقين؛ أما المواقع والتوقيتات والخريطة فهي إعادة بناء.',
  // tooltips
  'Timeline: click anywhere to jump to that moment': 'التسلسل الزمني: انقر في أي مكان للانتقال إلى تلك اللحظة', 'Pause and explain this moment (E)': 'إيقاف مؤقت وشرح هذه اللحظة (E)',
  'Explain this moment': 'شرح هذه اللحظة', 'Skip to the next chapter (N)': 'الانتقال إلى الفصل التالي (N)', 'Zoom in (+)': 'تكبير (+)', 'Zoom out (−)': 'تصغير (−)',
  'Fullscreen (or double-click the minimap)': 'ملء الشاشة (أو انقر مرتين على الخريطة المصغرة)', 'Whole battlefield; drag a box to zoom back in (M)': 'ساحة المعركة كلها؛ اسحب مربعا للتكبير من جديد (M)',
  'Fast forward: press for 2×, again for 4×, again for normal (.)': 'تسريع: اضغط مرة لـ 2×، ومرة أخرى لـ 4×، ومرة ثالثة للسرعة العادية (.)',
  "Choose the narrator's voice": 'اختر صوت الراوي', 'Narration: on/off, narrator, speed': 'السرد: تشغيل/إيقاف، الراوي، السرعة',
  'Hide the text': 'إخفاء النص', 'Hide the narration text': 'إخفاء نص السرد', 'Hide the text; the narration continues': 'إخفاء النص؛ يستمر السرد',
  'Painted battlefield (click for the drawn map)': 'ساحة المعركة مرسومة بالألوان (انقر للخريطة المرسومة)', 'Drawn battlefield (click for the painting)': 'ساحة المعركة مرسومة كخريطة (انقر للوحة)',
  'Enlarge the photo; the map shrinks into this corner': 'تكبير الصورة؛ تصغر الخريطة في هذه الزاوية', 'Back to the map': 'العودة إلى الخريطة',
  'The armies: full write-ups and photographs of every unit': 'الجيوش: وصف كامل وصور لكل وحدة',
  'Watch the reenactment': 'شاهد إعادة التمثيل', 'Take command': 'تولي القيادة',
  // tags shown on chips
  'BATTLE OF WATERLOO': 'معركة واترلو', 'Battle of Waterloo — Historical Reenactment': 'معركة واترلو — إعادة تمثيل تاريخية', 'Historical reenactment · 18 June 1815 · runs locally, no install': 'إعادة تمثيل تاريخية · 18 يونيو 1815 · تعمل محليا دون تثبيت',
  '▴ Show fewer': '▴ عرض أقل',
  'Established': 'مدعوم بالأدلة', 'Account': 'رواية', 'Disputed': 'موضع خلاف', 'Estimate': 'تقدير', 'Reconstruction': 'إعادة بناء',
  // Six-Day War page
  '📻 From the record': '📻 من الأرشيف', '▶ Listen (35 s)': '▶ استمع (35 ث)', 'Ⅱ Stop': 'Ⅱ إيقاف', 'The full recording ↗': 'التسجيل الكامل ↗',
  'The books and records behind the The Six-Day War.': 'الكتب والسجلات التي يستند إليها عرض حرب الأيام الستة.', 'Library of sources': 'مكتبة المصادر'
};
window.BH_UI_PATTERNS.ar = [
  [/^Historical introduction · (\d+) \/ (\d+)$/, (m, a, b) => `مقدمة تاريخية · ${a} / ${b}`],
  [/^Next narration ▶ (\d+)$/, (m, a) => `السرد التالي ▶ ${a}`],
  [/^(\d+) visits?$/, (m, a) => (+a === 1 ? 'زيارة واحدة' : +a === 2 ? 'زيارتان' : +a >= 3 && +a <= 10 ? `${a} زيارات` : `${a} زيارة`)],
  [/^Specific record: (.*)$/, (m, a) => `مصدر محدد: ${a}`],
  [/^(\d+) formations? selected$/, (m, a) => (+a === 1 ? 'تم تحديد تشكيل واحد' : +a === 2 ? 'تم تحديد تشكيلين' : +a >= 3 && +a <= 10 ? `تم تحديد ${a} تشكيلات` : `تم تحديد ${a} تشكيلا`)],
  [/^No formation selected$/, () => 'لم يتم تحديد أي تشكيل'],
  [/^▾ (\d+) more units?$/, (m, a) => (+a === 1 ? '▾ وحدة أخرى' : +a === 2 ? '▾ وحدتان أخريان' : +a >= 3 && +a <= 10 ? `▾ ${a} وحدات أخرى` : `▾ ${a} وحدة أخرى`)],
  [/^Photo to add(.*)$/, (m, a) => `صورة ستضاف${a}`]
];

/* Battles of History: the page's own words (buttons, menus, panels) in Hebrew, for lang.js. Same keys as lang/ui-en.json. */
window.BH_UI.he = {
  // top bar and controls
  '◀ Back': '◀ חזרה', 'Back': 'חזרה', 'Ⅱ Pause': 'Ⅱ השהיה', '▶ Resume': '▶ המשך', 'Next ▶': 'הבא ▶', 'Skip intro ⏭': 'דילוג על הפתיח ⏭',
  '🗺 Map': '🗺 מפה', '🎨 Art': '🎨 ציור', '✏ Drawn': '✏ שרטוט', '📜 Intro': '📜 פתיח', '▶ Watch': '▶ צפייה', '⚔ Command': '⚔ פיקוד',
  '◀ Battles': '◀ חזרה', '⛶ Full': '⛶ מסך מלא',
  '🔊 Voice': '🔊 קול', '🔇 Voice': '🔇 קול', '🔊 Voice on': '🔊 קול פועל', '🔇 Voice off': '🔇 קול כבוי',
  '▴ Controls': '▴ הגדרות', '▾ Controls': '▾ הגדרות', 'Controls': 'פקדים', '⏩ FF': '⏩ הרצה מהירה', '⏭ Skip': '⏭ הפרק הבא', 'Follow': 'מעקב',
  'Restart': 'מההתחלה', 'Explain': 'הסבר', 'Halt': 'עצור', 'Fall back': 'נסיגה', 'Select all': 'בחירת הכול', 'Speed': 'מהירות', 'Side': 'צד',
  'Allied': 'בעלות הברית', 'French': 'הצרפתים', 'Allied army': 'צבא בעלות הברית', 'French army': 'הצבא הצרפתי', 'Narrator': 'קריין', 'Narration speed': 'מהירות הקריינות',
  '⚔ Armies': '⚔ צבאות', '📝 View text': '📝 הצגת הטקסט', '📝 View text narration': '📝 הצגת טקסט הקריינות', '⇄ Map': '⇄ מפה', '⇄ Enlarge': '⇄ הגדלה',
  '◀ Previous unit': '◀ היחידה הקודמת', 'Next unit ▶': 'היחידה הבאה ▶', 'Close': 'סגירה', 'Continue ▶': 'המשך ▶', 'Play': 'הפעלה',
  // start screen and menus
  '🔊 Begin with narration': '🔊 התחלה עם קריינות', 'Begin with narration': 'התחלה עם קריינות', 'Begin without sound': 'התחלה בלי קול',
  'Narration is pre-recorded, so it plays in any browser.': 'הקריינות מוקלטת מראש, ולכן היא פועלת בכל דפדפן.',
  '▶ Play the reenactment': '▶ הפעלת השחזור', '▶ Watch reenactment': '▶ צפייה בשחזור', '▶ Watch the battle unfold': '▶ צפייה במהלך הקרב',
  '▶ Watch again': '▶ צפייה חוזרת', '⚔ Take command': '⚔ קחו פיקוד', '⚔ Play as Allied': '⚔ שחקו בצד בעלות הברית', '⚔ Play as French': '⚔ שחקו בצד הצרפתים',
  '⚔ Command Allied': '⚔ פקדו על בעלות הברית', '⚔ Command French': '⚔ פקדו על הצרפתים', '📜 Back to the introduction': '📜 חזרה לפתיח',
  '◀ Battles of History': '◀ קרבות בהיסטוריה', 'All the battles': 'כל הקרבות',
  // panels
  'Battlefield map': 'מפת שדה הקרב', 'Narration': 'קריינות', 'Introduction': 'פתיח', 'The armies': 'הצבאות', 'From the record': 'מן התיעוד',
  'Battle log': 'יומן הקרב', 'Battle timeline': 'ציר הזמן של הקרב', 'Battlefield briefing': 'תדריך שדה הקרב', 'Selected formation': 'היחידה שנבחרה',
  'Historical debrief': 'תחקיר היסטורי', 'Sources & further reading': 'מקורות וקריאה נוספת', 'Spoken narration': 'קריינות קולית', 'Orders': 'פקודות',
  'The campaign': 'המערכה', 'The battle': 'הקרב', '15–17 June': '15–17 ביוני', '18 June': '18 ביוני', 'The reenactment': 'השחזור',
  'What the sources say happened next': 'מה קרה אחר כך, לפי המקורות', 'The historical outcome': 'התוצאה ההיסטורית', 'Where this comes from': 'מאיפה זה בא',
  'Click a formation on the map to see who they are.': 'לחצו על יחידה במפה כדי לראות מי היא.',
  'Click to jump · double-click for fullscreen · Map button for the whole battlefield': 'לחיצה לקפיצה · לחיצה כפולה למסך מלא · כפתור המפה לכל שדה הקרב',
  'Point at a button to see the order': 'הצביעו על כפתור כדי לראות את הפקודה', 'No photograph yet.': 'עדיין אין צילום.', 'More ▸': 'עוד ▸',
  // footer
  '📚 Library': '📚 ספרייה', '🖼 Art gallery': '🖼 גלריה', '📷 Photographs': '📷 צילומים', 'All battles’ pictures': 'התמונות של כל הקרבות',
  '📚 Library of sources: the old books themselves ▸': '📚 ספריית המקורות: הספרים הישנים עצמם ▸',
  'Standalone HTML · no install, account, network or WebGL required · historical facts are tagged by confidence; positions, timings and the map are a reconstruction.':
    'דף HTML עצמאי · בלי התקנה, חשבון, רשת או WebGL · העובדות ההיסטוריות מסומנות לפי מידת הוודאות; המיקומים, הזמנים והמפה הם שחזור.',
  // tooltips
  'Timeline: click anywhere to jump to that moment': 'ציר הזמן: לחצו בכל מקום כדי לקפוץ לרגע הזה', 'Pause and explain this moment (E)': 'השהיה והסבר של הרגע הזה (E)',
  'Explain this moment': 'הסבר של הרגע הזה', 'Skip to the next chapter (N)': 'דילוג לפרק הבא (N)', 'Zoom in (+)': 'התקרבות (+)', 'Zoom out (−)': 'התרחקות (−)',
  'Fullscreen (or double-click the minimap)': 'מסך מלא (או לחיצה כפולה על המפה הקטנה)', 'Whole battlefield; drag a box to zoom back in (M)': 'כל שדה הקרב; גררו מלבן כדי להתקרב שוב (M)',
  'Fast forward: press for 2×, again for 4×, again for normal (.)': 'הרצה מהירה: לחיצה אחת ל-2×, שוב ל-4×, ושוב למהירות רגילה (.)',
  "Choose the narrator's voice": 'בחירת הקול של הקריין', 'Narration: on/off, narrator, speed': 'קריינות: הפעלה/כיבוי, קריין, מהירות',
  'Hide the text': 'הסתרת הטקסט', 'Hide the narration text': 'הסתרת טקסט הקריינות', 'Hide the text; the narration continues': 'הסתרת הטקסט; הקריינות ממשיכה',
  'Painted battlefield (click for the drawn map)': 'שדה קרב מצויר (לחצו למפה המשורטטת)', 'Drawn battlefield (click for the painting)': 'שדה קרב משורטט (לחצו לציור)',
  'Enlarge the photo; the map shrinks into this corner': 'הגדלת הצילום; המפה מתכווצת לפינה הזאת', 'Back to the map': 'חזרה למפה',
  'The armies: full write-ups and photographs of every unit': 'הצבאות: תיאור מלא וצילומים של כל יחידה',
  'Watch the reenactment': 'צפייה בשחזור', 'Take command': 'קחו פיקוד',
  'BATTLE OF WATERLOO': 'קרב ווטרלו', 'Battle of Waterloo — Historical Reenactment': 'קרב ווטרלו — שחזור היסטורי', 'Historical reenactment · 18 June 1815 · runs locally, no install': 'שחזור היסטורי · 18 ביוני 1815 · פועל מקומית, בלי התקנה',
  '▴ Show fewer': '▴ הצגת פחות',
  // tags shown on chips
  'Established': 'מבוסס', 'Account': 'גרסה', 'Disputed': 'שנוי במחלוקת', 'Estimate': 'הערכה', 'Reconstruction': 'שחזור',
  // recordings and library
  '📻 From the record': '📻 מן התיעוד', '▶ Listen (35 s)': '▶ האזנה (35 שנ׳)', 'Ⅱ Stop': 'Ⅱ עצירה', 'The full recording ↗': 'ההקלטה המלאה ↗',
  'The books and records behind the The Six-Day War.': 'הספרים והתיעוד שמאחורי מלחמת ששת הימים.', 'Library of sources': 'ספריית המקורות'
};
window.BH_UI_PATTERNS.he = [
  [/^Historical introduction · (\d+) \/ (\d+)$/, (m, a, b) => `פתיח היסטורי · ${a} / ${b}`],
  [/^Next narration ▶ (\d+)$/, (m, a) => `הקריינות הבאה ▶ ${a}`],
  [/^(\d+) visits?$/, (m, a) => (a == 1 ? 'ביקור אחד' : `${a} ביקורים`)],
  [/^Specific record: (.*)$/, (m, a) => `מקור מסוים: ${a}`],
  [/^(\d+) formations? selected$/, (m, a) => (a == 1 ? 'נבחרה יחידה אחת' : `נבחרו ${a} יחידות`)],
  [/^No formation selected$/, () => 'לא נבחרה אף יחידה'],
  [/^▾ (\d+) more units?$/, (m, a) => (a == 1 ? '▾ עוד יחידה אחת' : `▾ עוד ${a} יחידות`)],
  [/^Photo to add(.*)$/, (m, a) => `צילום שעוד יתווסף${a}`]
];

// the Six-Day War's own page words in Arabic and Hebrew (the title block, the footer, the map's legend)
Object.assign(window.BH_UI.ar, {
  'THE SIX-DAY WAR': 'حرب الأيام الستة', 'Historical reenactment · 5–10 June 1967 · runs locally, no install': 'إعادة تمثيل تاريخية · 5–10 يونيو 1967 · تعمل محليا دون تثبيت',
  '🖼 Slideshow': '🖼 عرض الصور', '🖼 All battles’ pictures': '🖼 صور كل المعارك', '🗺 Atlas': '🗺 الأطلس', 'LEGEND': 'مفتاح الخريطة',
  'Standalone HTML · no install, account, network or WebGL required · historical facts are tagged by confidence; positions, timings and the map are a reconstruction.':
    'صفحة HTML مستقلة · لا تحتاج إلى تثبيت أو حساب أو اتصال بالشبكة أو WebGL · الحقائق التاريخية موسومة بحسب درجة اليقين؛ أما المواقع والتوقيتات والخريطة فهي إعادة بناء.'
});
Object.assign(window.BH_UI.he, {
  'THE SIX-DAY WAR': 'מלחמת ששת הימים', 'Historical reenactment · 5–10 June 1967 · runs locally, no install': 'שחזור היסטורי · 5–10 ביוני 1967 · פועל במחשב, ללא התקנה',
  '🖼 Slideshow': '🖼 מצגת תמונות', '🖼 All battles’ pictures': '🖼 התמונות של כל הקרבות', '🗺 Atlas': '🗺 אטלס', 'LEGEND': 'מקרא',
  'Standalone HTML · no install, account, network or WebGL required · historical facts are tagged by confidence; positions, timings and the map are a reconstruction.':
    'דף HTML עצמאי · בלי התקנה, חשבון, רשת או WebGL · העובדות ההיסטוריות מסומנות לפי מידת הוודאות; המיקומים, הזמנים והמפה הם שחזור.'
});
Object.assign(window.BH_UI.ar, { 'Intro': 'المقدمة', 'tap for the full text': 'انقر لقراءة النص كاملا' });
Object.assign(window.BH_UI.he, { 'Intro': 'פתיח', 'tap for the full text': 'הקישו לטקסט המלא' });
// the song card (the Six-Day War, chapter 1)
Object.assign(window.BH_UI.ar, { 'The song': 'الأغنية', '▶ Listen on YouTube ↗': '▶ استمع على يوتيوب ↗', '▶ Find it on YouTube ↗': '▶ ابحث عنها على يوتيوب ↗' });
Object.assign(window.BH_UI.he, { 'The song': 'השיר', '▶ Listen on YouTube ↗': '▶ להאזנה ביוטיוב ↗', '▶ Find it on YouTube ↗': '▶ לחיפוש ביוטיוב ↗' });

// Serbo-Croatian (Vukovar), made with vukovar/lang/ui-sh.js
/* Battles of History: the page's own words (buttons, menus, panels) in Serbo-Croatian (Latin, ijekavian), for lang.js. Same keys as lang/ui-en.json.
   Follows translations/GLOSSARY-SH.md. */
window.BH_UI.sh = {
  // top bar and controls
  '◀ Back': '◀ Nazad', 'Back': 'Nazad', 'Ⅱ Pause': 'Ⅱ Pauza', '▶ Resume': '▶ Nastavi', 'Next ▶': 'Dalje ▶', 'Skip intro ⏭': 'Preskoči uvod ⏭',
  '🗺 Map': '🗺 Karta', '🎨 Art': '🎨 Slika', '✏ Drawn': '✏ Crtež', '📜 Intro': '📜 Uvod', '▶ Watch': '▶ Gledaj', '⚔ Command': '⚔ Komanduj',
  '◀ Battles': '◀ Nazad', '⛶ Full': '⛶ Ekran',   // short labels: the right-hand buttons are narrow
  '🔊 Voice': '🔊 Glas', '🔇 Voice': '🔇 Glas', '🔊 Voice on': '🔊 Glas uključen', '🔇 Voice off': '🔇 Glas isključen',
  '▴ Controls': '▴ Postavke', '▾ Controls': '▾ Postavke', 'Controls': 'Kontrole', '⏩ FF': '⏩ Ubrzaj', '⏭ Skip': '⏭ Sljedeće poglavlje', 'Follow': 'Prati',
  'Restart': 'Ispočetka', 'Explain': 'Objasni', 'Halt': 'Stani', 'Fall back': 'Povlačenje', 'Select all': 'Izaberi sve', 'Speed': 'Brzina', 'Side': 'Strana',
  'Allied': 'Saveznici', 'French': 'Francuzi', 'Allied army': 'Savezničke snage', 'French army': 'Francuska vojska', 'Narrator': 'Narator', 'Narration speed': 'Brzina naracije',
  '⚔ Armies': '⚔ Vojske', '📝 View text': '📝 Prikaži tekst', '📝 View text narration': '📝 Prikaži tekst naracije', '⇄ Map': '⇄ Karta', '⇄ Enlarge': '⇄ Uvećaj',
  '◀ Previous unit': '◀ Prethodna jedinica', 'Next unit ▶': 'Sljedeća jedinica ▶', 'Close': 'Zatvori', 'Continue ▶': 'Nastavi ▶', 'Play': 'Igraj',
  // start screen and menus
  '🔊 Begin with narration': '🔊 Počni s naracijom', 'Begin with narration': 'Počni s naracijom', 'Begin without sound': 'Počni bez zvuka',
  'Narration is pre-recorded, so it plays in any browser.': 'Naracija je unaprijed snimljena, pa radi u svakom pregledniku.',
  '▶ Play the reenactment': '▶ Pokreni prikaz događaja', '▶ Watch reenactment': '▶ Gledaj prikaz događaja', '▶ Watch the battle unfold': '▶ Gledaj tok bitke',
  '▶ Watch again': '▶ Gledaj iznova', '⚔ Take command': '⚔ Preuzmi komandu', '⚔ Play as Allied': '⚔ Igraj za saveznike', '⚔ Play as French': '⚔ Igraj za Francuze',
  '⚔ Command Allied': '⚔ Komanduj saveznicima', '⚔ Command French': '⚔ Komanduj Francuzima', '📜 Back to the introduction': '📜 Nazad na uvod',
  '◀ Battles of History': '◀ Bitke kroz historiju', 'All the battles': 'Sve bitke',
  // panels
  'Battlefield map': 'Karta bojišta', 'Narration': 'Naracija', 'Introduction': 'Uvod', 'The armies': 'Vojske', 'From the record': 'Iz zapisa',
  'Battle log': 'Dnevnik bitke', 'Battle timeline': 'Tok bitke', 'Battlefield briefing': 'Pregled bojišta', 'Selected formation': 'Izabrana formacija',
  'Historical debrief': 'Historijski pregled', 'Sources & further reading': 'Izvori i dodatna literatura', 'Spoken narration': 'Izgovorena naracija', 'Orders': 'Naredbe',
  'The campaign': 'Kampanja', 'The battle': 'Bitka', '15–17 June': '15. – 17. juna', '18 June': '18. juna', 'The reenactment': 'Prikaz događaja',
  'What the sources say happened next': 'Ono što se dalje dogodilo, prema izvorima', 'The historical outcome': 'Historijski ishod', 'Where this comes from': 'Odakle ovo potiče',
  'Click a formation on the map to see who they are.': 'Kliknite na formaciju na karti da vidite ko su.',
  'Click to jump · double-click for fullscreen · Map button for the whole battlefield': 'Kliknite za skok · dvostruki klik za cijeli ekran · dugme Karta za cijelo bojište',
  'Point at a button to see the order': 'Pokažite na dugme da vidite naredbu', 'No photograph yet.': 'Još nema fotografije.', 'More ▸': 'Više ▸',
  // footer
  '📚 Library': '📚 Biblioteka', '🖼 Art gallery': '🖼 Galerija slika', '📷 Photographs': '📷 Fotografije', 'All battles’ pictures': 'Slike svih bitaka',
  '📚 Library of sources: the old books themselves ▸': '📚 Biblioteka izvora: same stare knjige ▸',
  'Standalone HTML · no install, account, network or WebGL required · historical facts are tagged by confidence; positions, timings and the map are a reconstruction.':
    'Samostalna HTML stranica · bez instalacije, računa, mreže i WebGL-a · historijske činjenice označene su prema pouzdanosti; položaji, vrijeme i karta su rekonstrukcija.',
  // tooltips
  'Timeline: click anywhere to jump to that moment': 'Vremenska linija: kliknite bilo gdje da skočite na taj trenutak', 'Pause and explain this moment (E)': 'Pauziraj i objasni ovaj trenutak (E)',
  'Explain this moment': 'Objasni ovaj trenutak', 'Skip to the next chapter (N)': 'Preskoči na sljedeće poglavlje (N)', 'Zoom in (+)': 'Uvećaj (+)', 'Zoom out (−)': 'Umanji (−)',
  'Fullscreen (or double-click the minimap)': 'Cijeli ekran (ili dvostruki klik na malu kartu)', 'Whole battlefield; drag a box to zoom back in (M)': 'Cijelo bojište; povucite okvir da iznova uvećate (M)',
  'Fast forward: press for 2×, again for 4×, again for normal (.)': 'Ubrzanje: pritisnite za 2×, opet za 4×, opet za normalnu brzinu (.)',
  "Choose the narrator's voice": 'Izaberite glas naratora', 'Narration: on/off, narrator, speed': 'Naracija: uključeno/isključeno, narator, brzina',
  'Hide the text': 'Sakrij tekst', 'Hide the narration text': 'Sakrij tekst naracije', 'Hide the text; the narration continues': 'Sakrij tekst; naracija se nastavlja',
  'Painted battlefield (click for the drawn map)': 'Naslikano bojište (kliknite za nacrtanu kartu)', 'Drawn battlefield (click for the painting)': 'Nacrtano bojište (kliknite za sliku)',
  'Enlarge the photo; the map shrinks into this corner': 'Uvećaj fotografiju; karta se smanjuje u ovaj ugao', 'Back to the map': 'Nazad na kartu',
  'The armies: full write-ups and photographs of every unit': 'Vojske: potpuni opisi i fotografije svake jedinice',
  'Watch the reenactment': 'Gledaj prikaz događaja', 'Take command': 'Preuzmi komandu',
  'BATTLE OF WATERLOO': 'BITKA KOD WATERLOOA', 'Battle of Waterloo — Historical Reenactment': 'Bitka kod Waterlooa — historijski prikaz događaja', 'Historical reenactment · 18 June 1815 · runs locally, no install': 'Historijski prikaz događaja · 18. juna 1815. · radi lokalno, bez instalacije',
  '▴ Show fewer': '▴ Prikaži manje',
  // tags shown on chips
  'Established': 'Utvrđeno', 'Account': 'Prikaz', 'Disputed': 'Sporno', 'Estimate': 'Procjena', 'Reconstruction': 'Rekonstrukcija',
  // record panel, library, Vukovar page
  '📻 From the record': '📻 Iz zapisa', '▶ Listen (35 s)': '▶ Slušaj (35 s)', 'Ⅱ Stop': 'Ⅱ Zaustavi', 'The full recording ↗': 'Cijeli snimak ↗',
  'The books and records behind the The Six-Day War.': 'Knjige i zapisi na kojima se temelji stranica o Šestodnevnom ratu.', 'Library of sources': 'Biblioteka izvora',
  'BATTLE OF VUKOVAR': 'BITKA ZA VUKOVAR', 'Historical reenactment · Vukovar, 1991 · runs locally, no install': 'Historijski prikaz događaja · Vukovar, 1991. · radi lokalno, bez instalacije',
  '🖼 Slideshow': '🖼 Projekcija slika', '🖼 All battles’ pictures': '🖼 Slike svih bitaka', '🗺 Atlas': '🗺 Atlas', 'LEGEND': 'LEGENDA',
  'Intro': 'Uvod', 'tap for the full text': 'dodirnite za cijeli tekst'
};
// plural forms: 1, 21, 31 ... / 2–4, 22–24 ... / 5+, 11–14
window.BH_UI_PATTERNS.sh = (() => { const BH_SH_PL = (n, one, few, many) => { n = Number(n); const t = n % 10, h = n % 100;
  return (t === 1 && h !== 11) ? one : (t >= 2 && t <= 4 && (h < 12 || h > 14)) ? few : many; };
return [
  [/^Historical introduction · (\d+) \/ (\d+)$/, (m, a, b) => `Historijski uvod · ${a} / ${b}`],
  [/^Next narration ▶ (\d+)$/, (m, a) => `Sljedeća naracija ▶ ${a}`],
  [/^(\d+) visits?$/, (m, a) => `${a} ${BH_SH_PL(a, 'posjeta', 'posjete', 'posjeta')}`],
  [/^Specific record: (.*)$/, (m, a) => `Konkretan izvor: ${a}`],
  [/^(\d+) formations? selected$/, (m, a) => `${a} ${BH_SH_PL(a, 'izabrana formacija', 'izabrane formacije', 'izabranih formacija')}`],
  [/^No formation selected$/, () => 'Nijedna formacija nije izabrana'],
  [/^▾ (\d+) more units?$/, (m, a) => `▾ još ${a} ${BH_SH_PL(a, 'jedinica', 'jedinice', 'jedinica')}`],
  [/^Photo to add(.*)$/, (m, a) => `Fotografija koju treba dodati${a}`]
];
})();
Object.assign(window.BH_UI.sh, { 'front line, 14 September (CIA)': 'linija fronta, 14. septembra (CIA)', 'front line, 30 September (CIA)': 'linija fronta, 30. septembra (CIA)',
  'front line, 10 November (CIA)': 'linija fronta, 10. novembra (CIA)', 'JNA attack, as dated on the CIA map': 'napad JNA, s datumom kao na karti CIA-e' });
