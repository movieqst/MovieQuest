# Siege of Tyre, 332 BCE: corrections to the Round 2 dossier
**Claude historical QA, 7 November 2026.** This reviews `TYRE-ROUND-2-PART-1.md` (17 chapters) and `TYRE-ROUND-2-PART-2.md` (people, geography, pictures), and answers `TYRE-CLAUDE-REVIEW-HANDOFF.md`. The handoff names `TYRE-ROUND-2-RESEARCH.md` as its input, but no file of that name exists; the two Part files are the dossier.

## How this was checked
- **Arrian**, *Anabasis* 2.15–2.25, Greek text (Perseus), read section by section.
- **Diodorus**, 17.40–46, Greek text (Perseus), read section by section.
- **Plutarch**, *Alexander* 24–25, Perseus English translation. Section numbers come from the TEI milestones.
- **Curtius and Justin: not checked.** LacusCurtius (penelope.uchicago.edu) and Wikimedia Commons do not resolve from this session. Every Curtius reference in the dossier is left as "not checked". I have not supplied or corrected any Curtius section numbers.
- **Translations:** the Greek quotations are short, and the English renderings are my own.

**My own earlier errors.** Several of the errors below came from my 5 November fact-check (`TYRE-FACT-CHECK.md`). Those findings came from search snippets, not the Greek. The affected items are marked **[also FACT-CHECK #n]**, and those statements in it are now withdrawn.

**Columns used below:** *Affects* says whether the change touches **N** (narration), **M** (map) or **S** (sprites and art).

---

## A. Corrections, chapter by chapter

### C1. Ch. 2: the "mainland sanctuary" is not in Arrian
- **Dossier:** "The Tyrians proposed a mainland sanctuary rather than permitting his entry to the island temple. [ARRIAN 2.16]"
- **Greek:** Arrian says nothing of a mainland temple. At 2.16.7 the Tyrians resolved to do everything else Alexander ordered, but to admit "neither any Persian nor any Macedonian" into the city (*ἐς δὲ τὴν πόλιν μήτε τινὰ Περσῶν μήτε Μακεδόνων δέχεσθαι*). They thought this the most seemly course for now and the safest while the war's outcome was "still unclear" (*ἄδηλον ἔτι οὖσαν*).
  - Diodorus 17.40.2 says only that they "rather rashly" (*προπετέστερον*) barred his entry.
  - The offer of the temple at Old Tyre comes from the Latin tradition (Curtius/Justin), which is not checked here.
- **Reference:** Arrian 2.16.7; Diodorus 17.40.2.
- **Replacement:** "The Tyrians replied that they would do whatever else Alexander asked, but would let neither Persians nor Macedonians into their city while the war was undecided (Arrian). Later Latin writers add that they offered him the old temple on the mainland instead."
- **Confidence:** high. **Affects:** N. M also: the Palaetyrus temple marker must not be cited to Arrian. **[also FACT-CHECK #11, and the Old Tyre row of TYRE-MAP-FEATURES.csv, which cites "Arrian 2.16.7"]**

### C2. Chs. 1–2: the wrong source is cited for the Tyrians' position
- **Dossier:**
  - Ch. 1: "depicting all Tyrians as unanimous Persian loyalists goes beyond the evidence. [DIODORUS 17.40.3]"
  - Ch. 2: "compare DIODORUS 17.40.2–3".
- **Greek:** Diodorus 17.40.3 says the opposite. He gives pro-Persian motives: to oblige Darius (*Δαρείῳ χαριζόμενοι*), to win great gifts from him and to buy him time. He adds confidence in the island and reliance on "their descendants the Carthaginians" (*τοῖς ἀπογόνοις αὐτῶν Καρχηδονίοις*). The evidence for a more cautious, divided city is in Arrian:
  - 2.15.6: a Tyrian embassy sent "by the community" (*ἀπὸ τοῦ κοινοῦ*) met Alexander on the road and said Tyre would do whatever he commanded.
  - 2.15.7: the king's son was among the envoys.
  - 2.16.7: the formula of admitting neither side.
- **Reference:** Arrian 2.15.6–7, 2.16.7 for caution and neutrality; Diodorus 17.40.3 for pro-Persian motives.
- **Replacement (ch. 1 bullet 5):** "Tyre first sent envoys, including the king's son, offering to do as Alexander asked (Arrian). The ancient writers explain its later refusal differently: Arrian presents it as neutrality while the war was undecided, and Diodorus as loyalty to Darius and hope of Carthaginian help."
- **Confidence:** high. **Affects:** N.

### C3. Ch. 7: the ship counts are misread, and the total is wrong
- **Dossier:** "roughly 80 Phoenician ships, 120 Cypriot, ten Rhodian, three from Soli and Mallus, ten Lycian and one Macedonian fifty-oared ship. [ARRIAN 2.20.1–2] … total approximately 224."
- **Greek:**
  - Soli and Mallus sent "three each" (*ἐκ Σόλων καὶ Μαλλοῦ τρεῖς τρεῖς*), which makes **six**.
  - Rhodes sent "the so-called guard ship and nine others with it" (*ἥ τε περίπολος καλουμένη καὶ ξὺν ταύτῃ ἄλλαι ἐννέα*), which makes ten.
  - The Macedonian fifty-oar ship was commanded by **Proteas son of Andronicus** (2.20.2).
  - The Cypriot ships, "about a hundred and twenty" (*ναυσὶν ἑκατὸν μάλιστα καὶ εἴκοσιν*), are at **2.20.3**. They arrived at Sidon "not long after" the others.
  - The ~80 Phoenician ships (*ὀγδοήκοντα μάλιστα*, 2.20.1) came with Gerostratus of Aradus and Enylus of Byblos, who left Autophradates' fleet (2.19.6–2.20.1), together with the Sidonian triremes.
  - Arrian's sum is 80 + 10 + 6 + 10 + 1 + 120 = **about 227**, and both large figures carry *μάλιστα* ("about").
  - Plutarch rounds to "two hundred triremes" (*Alex.* 24.3).
- **Reference:** Arrian 2.19.6–2.20.3; Plutarch *Alex.* 24.3.
- **Replacement:** "Arrian lists about 80 Phoenician ships, ten from Rhodes, three each from Soli and Mallus, ten from Lycia, a Macedonian fifty-oar ship under Proteas, and then about 120 from the kings of Cyprus: some 225 in all. Plutarch rounds this to two hundred."
- **Confidence:** high. **Affects:** N, S (fleet sprite counts). **[also FACT-CHECK #3]**

### C4. Ch. 6: the Arab expedition had a stated length and leader, and comes after the fleet gathered
- **Dossier:** "precise duration uncertain … No secure … expedition duration".
- **Greek:**
  - **Leader and force:** Alexander himself (2.20.4). He took "some squadrons of the cavalry, the hypaspists, the Agrianians and the archers" (*τῶν τε ἱππέων ἴλας ἔστιν ἃς καὶ τοὺς ὑπασπιστὰς καὶ τοὺς Ἀγριᾶνάς τε καὶ τοὺς τοξότας*) to the mountain called Antilebanon.
  - **Result:** taking some places by force and others by agreement, he was back at Sidon **"within ten days"** (*ἐν δέκα ἡμέραις*). There he found **Cleander son of Polemocrates** with about 4,000 Greek mercenaries (2.20.5). Ten days, not eleven.
  - **Timing:** "while the machines were being assembled and the ships fitted out" (2.20.4). This comes **after** the Phoenician and Cypriot fleets had joined him at Sidon (2.20.1–3), so chapter 6 now sits one step too early.
  - **Plutarch:** 24.6–8 places the expedition "while the siege was in progress". The Lysimachus who lagged behind was Alexander's **old tutor**, who compared himself to Phoenix, not the later Bodyguard and king. Plutarch names **Chares** as the source (24.8).
- **Reference:** Arrian 2.20.4–5; Plutarch *Alex.* 24.6–8.
- **Replacement:** "While the new fleet was fitted out at Sidon, Alexander led cavalry, hypaspists, Agrianians and archers into the Antilebanon against Arab hill peoples, and returned to Sidon within ten days (Arrian). Plutarch, following Chares, tells how he risked his life for his elderly tutor Lysimachus on this march."
- **Structure:** **swap chapters 6 and 7** (fleet first, then the inland expedition). The count stays at 17. If the swap is not wanted, open chapter 6 with "Meanwhile, at Sidon …".
- **Confidence:** high. **Affects:** N; M (campaign-map timing).

### C5. Ch. 10: the Cypriot kings are at 2.22.2, and the sortie's outcome is overstated
- **Dossier:** "Arrian names the lost quinqueremes of Pnytagoras … Androcles … Pasicrates [ARRIAN 2.21.8–9]" and "destroying or capturing much of the attacking force [2.22.1–5]".
- **Greek:**
  - **The sortie force (2.21.8–9):** three quinqueremes, three quadriremes and seven triremes (*πεντήρεις μὲν τρεῖς καὶ τετρήρεις ἴσας, τριήρεις δὲ ἑπτὰ*). They rowed out quietly in single file without the coxswains' calls.
  - **The Cypriot losses (2.22.2):** the Tyrians sank the quinquereme of **King Pnytagoras** "at the first charge", then those of **Androcles of Amathus** and **Pasicrates of Curium**. They drove the other ships ashore and smashed them.
  - **Alexander's response:** he had gone to his tent but came back sooner than usual (2.22.1). He posted most ships at the harbour mouth and sailed **round the city** with his quinqueremes and about five triremes (2.22.3). The Tyrians on the walls shouted and signalled the recall (2.22.4).
  - **Outcome (2.22.5):** "a few ships got away first" (*ὀλίγαι … φθάνουσιν ὑπεκφυγοῦσαι*). Most were disabled (*ἄπλους*). **One quinquereme and one quadrireme** were taken at the harbour mouth. "The slaughter of the marines was not great", because they swam into the harbour.
- **Reference:** Arrian 2.21.8–2.22.5; the names at 2.22.2.
- **Replacement (bullets 3–4):** "Thirteen picked Tyrian warships sank the quinqueremes of King Pnytagoras of Salamis, Androcles of Amathus and Pasicrates of Curium, and drove other Cypriot ships ashore. Alexander, back early from his tent, rowed round the island and caught them returning: most were disabled and two were captured at the harbour mouth, though most crews swam to safety."
- **Confidence:** high. **Affects:** N, S (ship sprites: 3 + 3 + 7 Tyrian ships; Pnytagoras' ship).

### C6. Chs. 9 and 11: Arrian also has a repulsed first breach
- **Dossier:** ch. 9 puts the earlier repulsed breach only in Diodorus ("must be distinguished from Arrian's successful final breach"). Ch. 11 omits it.
- **Greek:**
  - At the **south wall**, "toward the south wind and Egypt" (*πρὸς νότον αὖ ἄνεμον καὶ πρὸς Αἴγυπτον*), the wall was shaken and partly collapsed. Alexander tried a small assault with bridges, "and the Tyrians easily beat the Macedonians off" (*οὐ χαλεπῶς ἀπεκρούσαντο*) (2.22.7).
  - Before that, the engines achieved nothing at the mole because the wall was strong, and nothing on the Sidon side (2.22.6).
  - The successful attack came **"on the third day after this"** (*τρίτῃ δὲ ἀπὸ ταύτης ἡμέρᾳ*), in **calm weather** (*νηνεμίαν τε φυλάξας*) (2.23.1).
- **Reference:** Arrian 2.22.6–2.23.1.
- **Replacement (ch. 11, add):** "Rams failed against the massive wall facing the mole and on the Sidon side. On the south side, facing Egypt, they brought part of the wall down, but a first attack over the rubble was beaten back. Three days later, in calm weather, Alexander came again."
- **Confidence:** high. **Affects:** N; M (an S7a probe state before S7).

### C7. Ch. 9: heated sand is in Diodorus, not only "Curtius Book 4"
- **Dossier:** "Some dramatic devices such as heated sand belong to particular ancient traditions … [CURTIUS Book 4; source-specific]"
- **Greek:** bronze and iron shields were filled with sand, heated "red-hot" (*διάπυρον*) and flung by a device onto the boldest attackers. The sand got under breastplates (17.44.1–3). Diodorus's other devices, with sections:
  - Rotating, partitioned wheels against bolts (17.43.1), and marble wheels (17.45.3).
  - Soft yielding structures against stones (17.43.1), and hides and double skins stuffed with seaweed (*πεφυκωμένας*, 17.45.4).
  - The inner second wall (17.43.3).
  - Hooked bronze tridents on lines (17.43.8), and fishing nets (17.43.10).
  - Scythe-armed yards cutting the rams' ropes, red-hot masses of metal, and "ravens" and iron hands (17.44.4).
  - Axes (17.45.6).
- **Reference:** Diodorus 17.43–45 (heated sand 17.44.1–3); Curtius not checked.
- **Replacement:** "[DIODORUS 17.44.1–3; Curtius also reports it, not checked]".
- **Confidence:** high. **Affects:** N, S (each device sprite should carry its Diodorus section).

### C8. Ch. 12: Admetus's role and death differ between the authors
- **Dossier:** "Admetus led the hypaspists and was killed after reaching the wall."
- **Greek, Arrian:**
  - The hypaspists boarded one of the two bridge ships, "of which Admetus had been put in charge" (*ᾗ ἐπετέτακτο Ἄδμητος*). The battalion of Coenus, "the so-called foot companions", boarded the other (2.23.2).
  - Admetus was first on the wall and was killed by a spear (*βληθεὶς λόγχῃ ἀποθνήσκει*) (2.23.5). Twenty hypaspists died with him (2.24.4).
- **Greek, Diodorus:**
  - Admetus, "one of the Macedonian commanders", dies from an axe blow to the middle of the head (*πληγεὶς πελέκει μέσην τὴν κεφαλήν*), in an **earlier, failed** wall fight (17.45.6).
  - After it Alexander sounded the recall at nightfall and thought of giving up the siege. Only **Amyntas son of Andromenes** agreed with continuing (17.45.7).
- **Reference:** Arrian 2.23.2, 2.23.5, 2.24.4; Diodorus 17.45.6–7.
- **Replacement:** "Admetus, commanding the ship that carried the hypaspists, was first onto the wall and was killed by a spear (Arrian; Diodorus places his death in an earlier, failed attack)."
- **Confidence:** high. **Affects:** N, S (Admetus sprite: spear death in the final assault in the Arrian track).

### C9. Ch. 12: the harbour entries (the boom detail is missing)
- **Dossier:** "Phoenician ships forced the southern/Egyptian harbour and Cypriot ships the northern/Sidonian harbour during the final operations. [ARRIAN 2.24.1]"
- **Greek:**
  - **The Phoenicians,** at "the harbour toward Egypt, where they had been on blockade", forced their way in "and tore apart the booms" (*βιασάμενοι καὶ τὰ κλεῖθρα διασπάσαντες*). They rammed ships afloat and drove others ashore.
  - **The Cypriots,** at the other harbour, "the one leading from Sidon", "which had not even a boom" (*οὐδὲ κλεῖθρον τοῦτόν γε ἔχοντα*), sailed in and "took the city at once that way" (2.24.1).
  - **Orders in advance:** Alexander had ordered the triremes to sail against **both harbours** during the assault (2.23.3). Ships with artillery and archers were to circle the walls.
- **Reference:** Arrian 2.23.3, 2.24.1.
- **Replacement:** "As the hypaspists took the wall, the Phoenician squadron broke the boom across the southern harbour, facing Egypt, and attacked the ships inside. The Cypriots sailed straight into the northern harbour, which had no boom, and entered the city from there."
- **Note for the handoff:** the handoff's "without a barrier *at that moment*" is a gloss. Arrian says only that this harbour "had not even a boom". Earlier (2.20.8) both mouths were blocked with triremes, which is a different kind of blocking from a boom.
- **Confidence:** high. **Affects:** N, M (boom symbol on the south harbour only), S.

### C10. Ch. 15: Diodorus's figures (sections, "more than", "hanged")
- **Dossier:** "Diodorus gives about 7,000 killed, 13,000 enslaved and 2,000 crucified. [DIODORUS 17.46.4]"
- **Greek:**
  - **Killed:** the Tyrians "blocked the narrow streets" (*ἐνέφραξαν τοὺς στενωπούς*) and "all but a few were cut down fighting, being more than seven thousand" (*πλείους τῶν ἑπτακισχιλίων*) (17.46.3).
  - **Executed:** the king "hanged" all the young men, "not fewer than two thousand" (*τοὺς δὲ νέους πάντας, ὄντας οὐκ ἐλάττους τῶν δισχιλίων, ἐκρέμασε*) (17.46.4). *ἐκρέμασε* means "hung up". The verb does not say crosses; "crucified" is a translators' and Curtius's colouring.
  - **Enslaved:** he enslaved the children and women. The captives remaining were "more than 13,000", "though most had been carried off to Carthage" (*τῶν πλείστων εἰς Καρχηδόνα κεκομισμένων*) (17.46.4).
  - **Arrian:** his 30,000 sold were "Tyrians and the foreigners caught in the city" (2.24.5). His Macedonian dead were Admetus and 20 hypaspists in the final assault, and about 400 in the whole siege (2.24.4).
- **Reference:** Diodorus 17.46.3–4; Arrian 2.24.4–5.
- **Replacement:** "Diodorus: more than 7,000 killed in the street fighting, at least 2,000 young men hanged afterwards, and more than 13,000 enslaved. Arrian: about 8,000 killed and about 30,000 Tyrians and foreigners sold."
- **Confidence:** high. **Affects:** N.

### C11. Ch. 16 (and ch. 12): "seven months" is not in Arrian; the archon's name
- **Dossier:** "The siege lasted approximately seven months … [ARRIAN 2.24.6; DIODORUS 17.46.5]"
- **Greek:**
  - Arrian gives **no length** for the siege anywhere in 2.15–2.25. He dates only the capture: *ἐπὶ ἄρχοντος Νικήτου Ἀθήνησι μηνὸς Ἑκατομβαιῶνος*, "when Niketes was archon at Athens, in the month Hecatombaeon" (2.24.6). The nominative is Νικήτης (Nicetes); "Nicetus" is a translator's form from the genitive.
  - "Seven months" is Diodorus's *πολιορκηθέντες μῆνας ἑπτά* (17.46.5) and Plutarch's "seven months" (*Alex.* 24.3). Curtius is not checked.
  - Diodorus files the whole siege under a year headed by the archon **Νικήρατος** and Olympiad 112 (17.40.1). That spelling differs from Arrian's.
  - Plutarch tells how Aristander promised the city would fall "this month" on the 30th, and Alexander ordered that day counted as the 28th (*Alex.* 25.1–2). Even the ancient day-of-month was manipulated.
  - The "January–August 332 B.C." in the Perseus Plutarch translation is an editor's insertion, not Plutarch.
- **Reference:** Arrian 2.24.6; Diodorus 17.40.1, 17.46.5; Plutarch *Alex.* 24.3, 25.1–2.
- **Replacement:** "Arrian dates the fall to the month Hecatombaeon in the archonship of Nicetes at Athens, about July–August 332 BCE. Diodorus and Plutarch say the siege had lasted seven months."
- **Confidence:** high. **Affects:** N. **[also FACT-CHECK #10]**

### C12. Ch. 8 (and Part B): the blockade sections, and the stones in the sea
- **Dossier:** "Alexander assigned Cypriot forces to the northern harbour and Phoenician forces to the southern harbour. [ARRIAN 2.20–21]"; "Tyrians placed submerged obstacles".
- **Greek, the assignment (2.20.10):** on the next day he ordered the Cypriots "with their own ships and Andromachus the admiral" (*ξὺν … Ἀνδρομάχῳ τῷ ναυάρχῳ*) to blockade "the harbour leading from Sidon". The Phoenicians were posted at "the one beyond the mole, facing Egypt, where his own tent was" (*τὸν ἐπέκεινα τοῦ χώματος τὸν πρὸς Αἴγυπτον ἀνέχοντα, ἵνα καὶ αὐτῷ ἡ σκηνὴ ἦν*). "North" and "south" are our inference from the geography.
- **Greek, before the blockade:**
  - Alexander sailed with the hypaspists on deck, the right (seaward) wing under himself with the Cypriot kings and the Phoenicians. The **left wing was held by Pnytagoras and Craterus** (*οὗτος δὲ καὶ Κρατερὸς τὸ εὐώνυμον κέρας εἶχον*) (2.20.6).
  - The Tyrians had meant to fight at sea, but at the sight of the fleet they declined (2.20.7–8). They blocked the harbour mouths with as many triremes as the mouths would hold (2.20.8).
  - Alexander decided not to force the Sidonian harbour "because of the narrowness of its mouth". The Phoenicians rammed and sank the three outermost Tyrian triremes, whose crews swam ashore (2.20.9).
- **Greek, the stones:** Arrian says "many stones thrown out into the sea" (*λίθοι πολλοὶ ἐς τὸ πέλαγος προβεβλημένοι*) kept the ships off the wall (2.21.4). He does not say who put them there.
- **Greek, the cables:**
  - First, Tyrian **armoured ships** cut the anchor cables (2.21.5). Alexander screened his anchors with armoured thirty-oars.
  - Then "divers under water" (*ὕφαλοι κολυμβηταί*) cut them, until the Macedonians used **chains** (2.21.6).
  - The stones were lassoed **from the mole** and dumped in deep water (2.21.7).
- **Replacement (bullet 4):** "Stones lying in the sea before the walls kept the engine-ships off. When the Macedonians anchored to haul them out, Tyrian armoured ships and then divers cut their cables, until they switched to anchor chains."
- **Confidence:** high, and medium on who placed the stones. **Affects:** N, M, S (diver sprite: correct; armoured cutter ships to add).

### C13. Ch. 13: Arrian does record the Tyrians killing Macedonian prisoners
- **Dossier:** ch. 2 says the envoy-killing in Curtius is "not corroborated in Arrian". That is true. But ch. 13 omits what Arrian *does* report.
- **Greek:** Arrian gives two reasons for the slaughter: anger at the length of the siege, and the Tyrians' treatment of captives. They had taken some Macedonians sailing from Sidon, killed them on the wall in view of the camp, and thrown them into the sea (*σφάξαντες ἔρριψαν εἰς τὴν θάλασσαν*) (2.24.3).
  - The Tyrians rallied at the **Agenorion** (2.24.2).
  - Coenus's battalion entered the city (2.24.3).
  - Alexander went along the battlements toward the **palace** (*ἐπὶ τὰ βασίλεια*) (2.23.6).
  - The Sidonian rescue is Curtius, not checked.
- **Replacement (add):** "Arrian says the Macedonians' fury came partly from the long siege and partly because the Tyrians had killed Macedonian prisoners on the walls in sight of the camp. Many Tyrians made a last stand at the shrine of Agenor."
- **Confidence:** high. **Affects:** N; M (Agenorion and palace as symbolic markers).

### C14. Ch. 9 versus ch. 12: Diodorus's final assault is a different scene
- **Dossier:** ch. 9 cites Diodorus 17.43 for the machines, and ch. 12 follows Arrian. That is right, but the narration needs to know what Diodorus actually describes.
- **Greek, Diodorus's final assault:**
  - It was made where the wall was weaker, "near the dockyards" (*περὶ τὰ νεώρια*), with lashed triremes carrying engines (17.46.1).
  - Alexander crossed alone by a gangway from a wooden tower (17.46.2), while elsewhere a ram brought down much of the wall (17.46.3).
- **Greek, Diodorus's first breach:**
  - The lashed triremes knocked down "a plethron of the wall" and men burst in (*κατέβαλεν ἐπὶ πλέθρον τοῦ τείχους*), but were "barely" repulsed. The Tyrians rebuilt the gap by night (17.43.4–5).
  - After this the mole reached the wall and "the city became a peninsula" (17.43.5).
- **Rule:** keep Arrian's version as the playable track (south wall, bridge ships, Admetus, Coenus, the two harbours). Diodorus's dockyard assault and Alexander's solo crossing can be a labelled "Diodorus says" aside. Never merge the two.
- **Confidence:** high. **Affects:** N, M.

### C15. Ch. 4: the Tyrians' command of the sea is stated, not inferred
- **Dossier:** "The Tyrian fleet exploited its freedom of movement … [ARRIAN 2.18–20; INFERENCE]"
- **Greek:** the Tyrians attacked the mole from triremes "since they still controlled the sea" (*ἅτε δὴ θαλασσοκρατοῦντες ἔτι*) (2.18.5; again at 2.19.6). Diodorus gives them **80 triremes** (*τριήρεις ὀγδοήκοντα*, 17.41.1), and adds small craft with catapults, archers and slingers (17.42.1).
- **Replacement:** drop "INFERENCE"; cite Arrian 2.18.5, 2.19.6 and Diodorus 17.41.1, 17.42.1.
- **Confidence:** high. **Affects:** N, S (Tyrian fleet size).

### C16. Ch. 3: section numbers and the labourers
- **Dossier:** cites only "ARRIAN 2.18", and lists "coerced and military labourers".
- **Greek, Arrian 2.18.3:**
  - The strait was "shoaly" (*πορθμὸς τεναγώδης*): shallow and muddy near the mainland, about three fathoms at most near the city (*τριῶν μάλιστα ὀργυιῶν*).
  - Stone and timber were plentiful, stakes drove easily into the mud, and the mud bound the stones.
  - Alexander supervised in person and rewarded good work (2.18.4).
  - **Arrian gives no distance in stades.** The four stades are Diodorus's alone (17.40.4).
- **Greek, Diodorus 17.40.5:**
  - "Many tens of thousands" (*πολλῶν μυριάδων*) carried the stones.
  - Alexander "took on the inhabitants of the neighbouring cities en masse" (*πανδημεὶ … προσλαβόμενος*). That compulsion is likely, but the text does not say how they were recruited.
- **Replacement (People):** "Macedonian soldiers and labourers levied from the neighbouring towns."
- **Confidence:** high. **Affects:** N, S (labourer sprites). **[also FACT-CHECK #9: "Arrian gives a similar figure, 2.18.2" is withdrawn]**

### C17. Part B: the people table
- **Pnytagoras, Androcles, Pasicrates:**
  - Cite 2.22.2, not "2.21".
  - Add for Pnytagoras: co-commander of the left wing with Craterus (2.20.6).
- **Admetus:** "commanded the ship carrying the hypaspists" (2.23.2), not "hypaspist commander". Add Diodorus's divergent death (C8).
- **Coenus:** "his battalion of foot companions boarded the second bridge ship and later entered the city" (2.23.2, 2.24.3).
- **Craterus:** confirmed at 2.20.6. Remove "check sub-section".
- **Andromachus:** confirmed at 2.20.10 as admiral (*ναύαρχος*) with the Cypriots at the Sidon harbour. Remove "verify".
- **Gerostratus (Aradus) and Enylus (Byblos):** they left Autophradates and brought their ships when they learned their cities were in Alexander's hands (2.19.6–2.20.1). Arrian records no other personal acts.
- **Azemilcus:** "was sailing with Autophradates" (*μετʼ Αὐτοφραδάτου ἔπλει*, 2.15.7). He was in the temple at the fall, with "the Tyrians most in authority" (2.24.5). His return is not stated.
- **Abdalonymus:** Diodorus 17.46.6 says Alexander made one **"Ballonymus" king of Tyre**. This is generally taken as a confusion with Sidon's new king. Keep him off the battle roster, but note the Diodorus line.
- **Diades, Hephaestion, Perdiccas:** a search of the Greek of Arrian 2.15–2.25 and Diodorus 17.40–46 finds **none of the three**, and Plutarch 24–25 does not name them either. Assign them no Tyre role. Diades is known from later technical writers, which are not checked here.
- **Missing, all attested:**
  - **Proteas** son of Andronicus (2.20.2).
  - **Cleander** son of Polemocrates, with 4,000 mercenaries (2.20.5).
  - **Aristander** the seer (Arrian 2.18.1; Plutarch 25.1).
  - **Autophradates**, the Persian admiral (2.15.7, 2.20.1).
  - **Amyntas** son of Andromenes (Diodorus 17.45.7).
  - **The Tyrian king's son**, an envoy (2.15.7).
  - **Lysimachus** the tutor (Plutarch 24.6).
- **Carthaginian envoys:** they were *θεωροί*, sacred envoys who had come to the mother city to honour Heracles "by an ancient custom" (2.24.5).
- **Confidence:** high. **Affects:** N, S (leader sheets).

### C18. Ch. 14: the victory rites
- **Dossier:** "Alexander subsequently sacrificed to Heracles and held celebrations. [ARRIAN 2.24]"
- **Greek (2.24.6):**
  - He sacrificed, held an armed parade of the army and a parade of the fleet, and staged athletic games and a torch race in the precinct.
  - He dedicated in the temple the engine that had shaken the wall, and the Tyrians' sacred ship of Heracles captured in the sea fight.
- **Greek, Diodorus 17.46.6:** adds that Alexander removed the golden chains from the Tyrians' Apollo statue and had the god called "Philalexandros". The chaining is at 17.41.8 and Plutarch 24.4.
- **Replacement:** cite 2.24.6. The rites may be summarised in one line, without celebratory imagery.
- **Confidence:** high. **Affects:** N.

### C19. Ch. 5: the storm and the night repairs (minor)
- **Dossier:** correct to keep the storm separate from the fireship. Diodorus has **no fireship at all**.
- **Greek:**
  - The storm was a great **north-west wind** (*ἀργέστης ἄνεμος μέγας*), which wrecked much of the mole (17.42.5). Alexander repaired it with whole trees, branches and all, brought down from the mountains (17.42.6).
  - Diodorus also has an earlier naval episode (17.42.3–4). Alexander manned all his ships and nearly cut off the Tyrian boats; they got home only after losing their rearmost ships.
- **Confidence:** high. **Affects:** N (optional), M (wind arrow).

### C20. Ch. 15: Carthage and the evacuation (a tension, not an error)
- **Diodorus 17.41.1:** the Tyrians voted to send "children, women and the old" to Carthage.
- **Diodorus 17.41.2:** only "a part" (*μέρος*) got away before the siege closed.
- **Diodorus 17.46.4:** yet the 13,000 remained "though most had been carried to Carthage".
- **Narration:** "some of the women, children and elderly". Do not give a number.
- **Confidence:** high. **Affects:** N.

---

## B. Answers to the handoff's eight priority checks

1. **The final assault.**
   - **Arrian:** the engines failed at the mole and on the Sidon side (2.22.6). On the Egyptian side the wall was breached and a small bridge attack was "easily" repulsed (2.22.7). Three days later, in calm weather, the ship-borne assault succeeded (2.23.1–6), with simultaneous attacks on both harbours (2.23.3, 2.24.1).
   - **Diodorus** is a different sequence:
     - A breach of a plethron is repulsed and rebuilt overnight (17.43.4–5).
     - Long wall fights follow, Admetus dies, and there is a night recall and near-abandonment (17.45.6–7).
     - The final assault is at the dockyards, with Alexander crossing alone by gangway and a ram breach elsewhere (17.46.1–3).
   - Do not fuse them (C6, C8, C14).
2. **The harbours.**
   - **Booms:** the Phoenicians broke the booms of the Egyptian-facing harbour. The Sidonian harbour "had not even a boom" (2.24.1). "At that moment" is not in the Greek (C9).
   - **The earlier blockade:** the Tyrians blocked both mouths with triremes (2.20.8). The Phoenicians sank three at the Sidon mouth (2.20.9). The Cypriots under Andromachus blockaded the Sidon harbour and the Phoenicians the Egyptian one (2.20.10).
3. **The casualties.** Arrian: 8,000 killed and 30,000 sold, including foreigners; Macedonians, 20 hypaspists and Admetus in the assault and about 400 overall (2.24.4–5). Diodorus: more than 7,000 killed (17.46.3), at least 2,000 hanged, and more than 13,000 captives (17.46.4).
   - **Within or in addition?** The 7,000 "were cut down fighting" in the streets. The 2,000 were young men the king hanged **afterwards**, a separate act. So the 2,000 are **additional** to the 7,000. Diodorus does not say whether the 13,000 includes them; the natural reading is that the 13,000 are the surviving captives besides the executed men. Confidence: medium-high.
   - Curtius is not checked.
4. **The dating.** "In the archonship of Niketes at Athens, in the month Hecatombaeon" (2.24.6). There is no day in Arrian, and no length either (C11). Plutarch's story of the day reckoned as the 28th (25.1–2) is a further reason for no day-of-month.
5. **Geography: Brocard against Marriner.** This **cannot be settled from the Greek**, and neither paper could be read here.
   - **What the Greek adds:** four stades (Diodorus 17.40.4), about 710–740 m depending on the stade used. Shallow and muddy near the mainland, about three fathoms (~5.5 m) at most near the island (Arrian 2.18.3). The mole is "two plethra" wide (17.40.5).
   - **Approach:** the four stades fit Brocard's ~750 m better than Marriner's ~1,000 m, but the endpoints of each measurement need checking in the papers. See `TYRE-MAP-UNCERTAINTIES.md`.
6. **Names and duties.** Confirmed: Azemilcus (2.15.7, 2.24.5), Admetus (2.23.2, 2.23.5, 2.24.4), Coenus (2.23.2, 2.24.3), Craterus (2.20.6), Andromachus (2.20.10), and the three Cypriot kings (2.22.2; Pnytagoras also at 2.20.6). **Diades, Hephaestion and Perdiccas do not appear** in Arrian 2.15–25, Diodorus 17.40–46 or Plutarch 24–25 (C17).
7. **Engineering.**
   - **The two plethra** (*δίπλεθρον τῷ πλάτει*, 17.40.5) is Diodorus's literary figure: ~60 m at ~30 m per plethron.
   - **Attested in Arrian:**
     - The fireship (2.19.1–5).
     - The widened mole (2.19.6).
     - Engines on horse-transports and slow triremes (2.21.1).
     - The cable cutters, first armoured ships and then divers, and the chains (2.21.5–6).
     - The stones hauled from the mole (2.21.7).
     - The walls on the mole side "about 150 feet" high, of large stones set in mortar (*ἐν γύψῳ*) (2.21.4).
     - Wooden towers on the Tyrian battlements (2.21.3).
   - **Attested in Diodorus only:** the devices listed in C7.
   - **Illustrative, not attested:** tower heights, ram housings, and the layout of the lashed ships. Diodorus says only that triremes were "yoked" (*τὰς τριήρεις ζευγνύων*, 17.43.4, 17.46.1).
8. **Images.** See `TYRE-ART-LICENCES.md`. Commons does not resolve from here, so **no licence is verified live**.

---

## C. Confirmed (claims checked against the Greek)

| Claim | Exact reference |
|---|---|
| Byblos taken by agreement; Sidon invited him in; Tyrian envoys from the community, including the king's son | Arrian 2.15.6–7 |
| Azemilcus away with Autophradates' fleet | Arrian 2.15.7 |
| Alexander wished to sacrifice to Heracles; Tyre's temple "the most ancient in human memory" | Arrian 2.15.7, 2.16.1, 2.16.7 |
| Alexander's strategic speech (Persian sea power, Egypt, Cyprus, Greece) | Arrian 2.16.8–2.17.4 |
| Dream of Heracles, interpreted by Aristander | Arrian 2.18.1 (Plutarch *Alex.* 24.3) |
| Island city with high walls on all sides | Arrian 2.18.2 |
| Mole begun; shoaly strait; three fathoms near the city | Arrian 2.18.3 |
| Easy progress near the shore; harassment from the walls and triremes in deeper water | Arrian 2.18.4–5 |
| Two towers with engines on the mole head, screened with hides and skins | Arrian 2.18.6 |
| Fireship: horse transport, two masts, double yard with cauldrons, pitch and sulphur, stern ballast, towed by triremes with a wind toward the mole, crew swam off | Arrian 2.19.1–3 |
| Towers burned; boat parties tore the palisade and burned the engines | Arrian 2.19.4–5 |
| Mole widened; Alexander to Sidon with hypaspists and Agrianians | Arrian 2.19.6 |
| ~80 Phoenician, 10 Rhodian, 3 + 3 Soli/Mallus, 10 Lycian, 1 Macedonian; ~120 Cypriot | Arrian 2.20.1–3 (C3 for the arithmetic) |
| Antilebanon expedition, ten days; Cleander with 4,000 | Arrian 2.20.4–5 |
| Fleet order: Craterus and Pnytagoras on the left | Arrian 2.20.6 |
| Harbour mouths blocked with triremes; three sunk at the Sidon mouth | Arrian 2.20.8–9 |
| Cypriots and Andromachus at the Sidon harbour; Phoenicians at the Egyptian harbour | Arrian 2.20.10 |
| Engines on the mole, on horse transports and on triremes | Arrian 2.21.1–2 |
| Wall ~150 ft on the mole side; stones in the sea | Arrian 2.21.4 |
| Armoured cutters; divers cut cables; chains; stones lassoed and dumped | Arrian 2.21.5–7 |
| Midday sortie from the Sidon harbour behind sail screens: 3 + 3 + 7 ships | Arrian 2.21.8–9 |
| Quinqueremes of Pnytagoras, Androcles and Pasicrates sunk | Arrian 2.22.2 |
| Alexander's counter-sail round the city; two Tyrian ships captured | Arrian 2.22.3–5 |
| Breach on the south/Egypt side; first attempt repulsed | Arrian 2.22.6–7 |
| Third day, calm; bridge ships; Admetus and Coenus | Arrian 2.23.1–2 |
| Triremes against both harbours; ships circle the walls | Arrian 2.23.3 |
| Admetus first on the wall, killed; Alexander takes the wall and heads for the palace | Arrian 2.23.4–6 |
| Harbours forced (Phoenicians broke the booms; Cypriots into the unbarred harbour) | Arrian 2.24.1 |
| Rally at the Agenorion; slaughter; prisoners killed earlier by the Tyrians | Arrian 2.24.2–3 |
| 8,000 Tyrians killed; Admetus and 20 hypaspists; ~400 in the whole siege | Arrian 2.24.4 |
| Pardon in the temple for Azemilcus, the leading Tyrians and the Carthaginian sacred envoys; ~30,000 sold | Arrian 2.24.5 |
| Sacrifice, parades, games, dedications; Hecatombaeon, archon Niketes | Arrian 2.24.6 |
| Darius's peace offer during the siege; Parmenion's remark | Arrian 2.25.1–3 |
| Other Phoenician cities received him; Tyre barred entry | Diodorus 17.40.2 |
| Tyrian motives as Diodorus gives them (Darius, island, Carthage) | Diodorus 17.40.3 |
| Four stades | Diodorus 17.40.4 |
| Old Tyre demolished; two-plethra mole; neighbouring townspeople levied | Diodorus 17.40.5 |
| Mockery ("would he overcome Poseidon?"); vote to send women, children and the old to Carthage; 80 triremes | Diodorus 17.41.1 |
| Only part evacuated | Diodorus 17.41.2 |
| Sea monster, bloody bread, Apollo chained | Diodorus 17.41.5–8 |
| Small craft with catapults, archers and slingers hit the workers | Diodorus 17.42.1–2 |
| North-west gale wrecks the mole; repaired with whole trees | Diodorus 17.42.5–7 |
| Tyrian devices | Diodorus 17.43.1, 17.43.3, 17.43.7–10, 17.44.1–5, 17.45.3–6 |
| First breach of a plethron repulsed; rebuilt by night; city becomes a peninsula | Diodorus 17.43.4–5 |
| Admetus killed by an axe; night recall; Amyntas | Diodorus 17.45.6–7 |
| Final assault at the dockyards | Diodorus 17.46.1–3 |
| More than 7,000 killed | Diodorus 17.46.3 |
| At least 2,000 hanged; more than 13,000 captives | Diodorus 17.46.4 |
| Seven months | Diodorus 17.46.5 |
| Apollo unchained; "Ballonymus" made king | Diodorus 17.46.6 |
| Seven months; 200 triremes; dreams; Apollo statue | Plutarch *Alex.* 24.3–5 |
| Antilebanon expedition and Lysimachus (from Chares) | Plutarch *Alex.* 24.6–8 |
| Aristander; the day reckoned as the 28th; assault the same day | Plutarch *Alex.* 25.1–2 |

**Not checked (Curtius, Justin):** the envoys killed, the offer of the Palaetyrus temple, the Carthaginian refusal of help, the Sidonian rescue, Curtius's 6,000 killed and 2,000 crucified, his seven months, and his descriptions of the mole and the storms. Keep each as "Curtius says (not checked)" until someone reads the Latin.

## D. Can the 17-chapter structure stand?
**Yes, with two changes.** Neither changes the number of chapters.
1. **Swap chapters 6 and 7.** The fleet gathers at Sidon (2.20.1–3) **before** the ten-day Antilebanon expedition (2.20.4–5).
2. **Add the repulsed first breach (2.22.6–7) to chapter 11.**

All other chapters stand once the wording and references above are applied.
