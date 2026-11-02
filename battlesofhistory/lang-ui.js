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
  'The armies: full write-ups and photographs of every unit': '双方军队：每支部队的详细介绍和图片', 'Watch the reenactment': '观看战役重现', 'Take command': '亲自指挥',
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
