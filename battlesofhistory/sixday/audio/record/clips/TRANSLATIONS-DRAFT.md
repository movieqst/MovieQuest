# 1967 air force radio clips: draft English translations (from Whisper "small", 8 November 2026)

The `.srt` files beside each clip are Whisper's Hebrew (small model, run on the site owner's PC). Whisper's Hebrew of noisy 1967 radio is rough: many words are misheard. Below, each clip's usable lines are translated, with how sure we are.
- **sure**: clear Hebrew, plain meaning;
- **likely**: Whisper's words are garbled, but the meaning is clear from the sounds and the context;
- **unclear**: not used.

Call signs (Parkan, Kishon, Rabat, Ben Aharon, Yavne, "Seven") are left as they are. **Before publishing, a Hebrew speaker should listen to the four chosen clips** against these captions.

## Chosen for the page (best first)

### 1. mordechai-lavon-1-2643 (from 26:43): "What is Israel Radio saying?"
| time | English | |
|---|---|---|
| 0:00 | Alex, Lazar… do you have a radio? | likely |
| 0:07 | Here's the radio: the Egyptian report claims forty Zionist planes. | likely |
| 0:13 | Forty of our planes? | sure |
| 0:15 | No… they have two planes down. | likely |
| 0:21 | What is Kol Israel [Israel Radio] reporting? | likely |
| 0:24 | Kol Israel says… armoured forces… [unclear] | unclear end |
| 0:28 | What's happening in Jerusalem? | sure |
| 0:31 | In Jerusalem, right now, nothing. | sure |

Why: two radios telling two stories on the first morning. Cairo radio's claims of Israeli losses are well recorded; the page should say so, and give the real Israeli losses from the narration's sources. "Nothing in Jerusalem" places it before Jordan opened fire (late morning, 5 June).

### 2. danny-manor-1-3143 (from 31:43): "Four Ilyushins at Abu Suweir"
| time | English | |
|---|---|---|
| 0:08 | Who's going to Abu Suweir? | sure |
| 0:09 | Yes. | sure |
| 0:10 | There are still four Ilyushins in square thirty-two. | likely ("Ilyushins": Whisper wrote עילים; the Il-28 bombers) |
| 0:21 | At Abu Suweir. | sure |
| 0:25 | Okay, four Ilyushins. | likely |
| 0:27 | We'll take care of them. | likely |

Why: Abu Suweir is the airfield where Danny Manor was shot down later that morning (Times of Israel, 2017). The Egyptian Il-28 bombers were a main target of the strikes.

### 3. megiddo-2-0223 (from 2:23): "Scramble another pair"
| time | English | |
|---|---|---|
| 0:00 | …at Ramat David… | likely |
| 0:06 | Okay, who do you have in the air now? | sure |
| 0:12 | Scramble another pair. | sure |
| 0:15 | Copy. | sure |
| 0:17 | What's happening with 6662 over there? | sure |
| 0:30 | Okay, what's after him? | likely |

Why: the defence of Israel's own airfields while the strike aircraft were away. Ramat David is the air base nearest Megiddo.

### 4. mordechai-lavon-3-3002 (from 30:02): "Where is the ship?"
| time | English | |
|---|---|---|
| 0:00 | His task now is the search at sea. This is Seven. | likely |
| 0:05 | What are you saying? | sure |
| 0:09 | We've sent him off to the search and rescue. | likely |
| 0:13 | This is Seven. | sure |
| 0:16 | Now they've spotted him, and he's asking where the ship is that's looking for him. | likely |
| 0:21 | Where is the ship he's looking for? | likely |
| 0:26 | Yavne, this is Ben Aharon. | likely (call signs) |

Why: Lavon came down in the sea off Gaza and was picked up by a United Nations boat (Times of Israel, 2017).

## Kept for the library, not chosen
- **mordechai-lavon-2-2746:** "I have no contact." "No report." Then a rumour, probably "Lavon? The Egyptians took him", and "No!" "No, no." Dramatic, but the key name is too garbled to caption safely. Try the medium model.
- **danny-manor-3-5507:** "Do you see them?" "Minya… Minya is closed" (El Minya airfield?), "Who's speaking?" "Control." "Kishon went…" "Where do you see Kishon?" Partly clear.
- **megiddo-3-0537:** "Parkan." "One pair hit… in the Damascus area." "There are more MiGs on the ground… there are still more on the ground." "No, from Damascus, at the border." Good content, but "Damascus" is Whisper's guess (דמטיק).
- **first-wave-1, -2, -3:** mostly call signs ("Rabat", "Eagle") and "copy". Little to caption.
- **danny-manor-2-4531:** "Parkan, come in, come in." The rest unclear.
- **megiddo-1-0129:** Whisper produced nonsense (mixed languages): too noisy. Not used.

## Next
1. Run the **medium** model on the four chosen clips for better Hebrew (`whisper CLIP.mp3 --model medium --language Hebrew --output_format srt`).
2. A Hebrew speaker checks the captions.
3. Then the captions go on the page, timed to these `.srt` times, in closed-caption style, with "Translated from Hebrew" and the IDF Spokesperson's Unit credit (CC BY-SA 3.0).
