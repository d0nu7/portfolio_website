# CLOSER – complete question catalog DE/EN

**Updated:** 17 August 2026
**Status:** Editorial source of truth for implemented packs
**Scope:** 14 packs · 489 master questions or action cards · German and English · curated duration routes · pack-specific finales

---

## 1. Authoritative interpretation

- A **pack/mode** determines *what* is asked. Nine packs are currently implemented: `classic`, `first-date`, `date-night`, `couples`, `friends`, `old-friends`, `deep`, `chaos`, and `late-night`.
- `road-trip`, `family`, and `colleagues` are implemented specialist packs. They start hidden in the configurable pack library until a user enables them.
- A **style** only determines *how* the game is played, for example `CALM` or `PLAYFUL`. Styles do not own duplicate question lists.
- Every pack has a master bank of **3 acts with 12 questions each**.
- A stable implementation ID combines the pack and table ID, for example `first-date-q01`, `friends-q24`, or `late-night-q36`.
- `quick`, `standard`, and `full` are **fixed curated routes**. Questions are never selected randomly from the master bank.
- Unless stated otherwise, both people answer the same question; the starting person alternates between questions.
- Either person may pass on any question without explaining why. A worthwhile conversation matters more than completing the list.
- The new packs are **research-informed**, but neither their individual questions nor the complete experiences have been scientifically validated.
- The German and English versions are editorial equivalents. They should sound natural in each language rather than matching word for word.

### Routes

| Route | Scope | Principle |
|---|---:|---|
| Quick | 12 questions, 4 per act | self-contained short arc |
| Standard | 24 questions, 8 per act | default for most packs |
| Full | 36 questions, 12 per act | complete master bank |

In tables with a **Route** column, `Q/S/F` means Quick, Standard, and Full; `Q/F` means Quick and Full; `S/F` means Standard and Full; and `F` means Full only. `COLLEAGUES` intentionally uses `Q/S`, `S`, and `Reserve`: Reserve questions belong to its editorial master bank but to no playable route. Selected IDs always retain their listed order.

`DEEP` intentionally has no Quick route. `COLLEAGUES` intentionally has no Full route until user sessions demonstrate a credible, non-intrusive use case. `CLASSIC Full` is the complete original CLOSER experience; shorter Classic routes must be described as curated extracts. The 36 Classic rows are immutable and protected by an automated content fingerprint.

### Private Moments (FR-005)

This section is the authoritative editorial catalog for the implemented Private Moment behavior and supersedes the former universal saved-question flow. Role A is the person selected to open Q1; role B is the other person. Quick has no Private Moment. Late Night’s consent/readiness gates are a separate safety mechanism and never create a secret task.

| Pack | Decision | Routes | Trigger | Use and irreversible discard |
|---|---|---|---|---|
| Classic | optional | Full | before Q28 | resolve saved-question categories after Q36, then dynamic Question 37; discard on resolution/end |
| First Date | optional | Standard, Full | after Act I | optional A/B finale; discard at finale/end |
| Date Night | optional | Standard, Full | after Act I | optional A/B finale; discard at finale/end |
| Couples | optional | Standard, Full | after Act I | shared use after Act II; discard immediately afterward |
| Friends | optional | Standard, Full | after Act II | optional A/B finale; discard at finale/end |
| Old Friends | optional | Standard only | after Act I | immediate shared use; discard immediately afterward |
| Deep | optional | Standard, Full | after Act I | shared close after Act II; discard immediately afterward |
| Chaos | optional | Standard, Full | before Q16 | supplement Q16; discard when leaving Q16 |
| Late Night | consent/readiness | Quick, Standard, Full | entry and after Act I | collective result only; no generic Question 37 |
| Road Trip | none | all | — | — |
| Family | none | all | — | — |
| Colleagues | none | all available routes | — | — |

Shared optional-moment copy:

- **Offer DE:** „Gleich sieht jede Person eine andere, freiwillige Karte. Jede Person kann sie im Kopf behalten oder „Heute nicht“ wählen. Keine Wahl wird der anderen Person angezeigt. Gebt nichts ein und macht keinen Screenshot.“
- **Offer EN:** “Each person will see a different optional card. Each person may keep it in mind or choose ‘Not today.’ Their choice will not be shown to the other person. Do not type anything or take a screenshot.”
- **Shared actions:** **Private Karten ansehen / View private cards**, **Für beide auslassen / Skip for both**, and on each private card **Heute nicht / Not today**.
- **First handoff DE/EN:** „Gib das Handy an {who}. Erst {who} tippt weiter. Wenn ein privater Blick auf den Bildschirm gerade nicht möglich ist, lasst diesen Moment aus.“ / “Pass the phone to {who}. Only {who} should continue. If they cannot view the screen privately right now, skip this moment.”
- **Second handoff DE/EN:** „Gib das Handy an {who}. Was die erste Person gesehen oder gewählt hat, bleibt verborgen.“ / “Pass the phone to {who}. What the first person saw or chose remains private.”
- **Return DE:** „Legt das Handy wieder zwischen euch. Niemand muss sagen, was auf der eigenen Karte stand oder welche Wahl getroffen wurde.“
- **Return EN:** “Put the phone back between you. Nobody needs to say what their card said or which choice they made.”

No answer or private free text enters application state. Non-Classic accept/decline choices produce identical durable state. Classic stores only `none | pending | asked | discarded`, never the saved question. Late Night individual choices are in-memory only and excluded from local storage. Resume and background return direct private content to a named handoff cover; an incomplete Late Night gate restarts from A. Early exit and completion scrub remaining private categories.

#### Classic — `classic-saved-questions`

- **A DE:** „Denk an etwas, das {other} heute gesagt hat und worüber du ehrlich neugierig bist. Formuliere im Kopf eine offene Nachfrage dazu. Sag sie nicht laut und gib sie nirgends ein. Du darfst sie später stellen oder jederzeit verwerfen.“
- **A EN:** “Think of something {other} said tonight that made you genuinely curious. Form one open follow-up question in your mind. Do not say it aloud or type it anywhere. You may ask it later or discard it at any time.”
- **B DE:** „Denk an eine Seite von {other}s Sicht, die heute noch keinen Raum hatte. Formuliere im Kopf eine offene Frage, die keine Antwort unterstellt. Sag sie nicht laut und gib sie nirgends ein. Du darfst sie später stellen oder jederzeit verwerfen.“
- **B EN:** “Think of a part of {other}’s perspective that has not had room tonight. Form one open question that does not assume its answer. Do not say it aloud or type it anywhere. You may ask it later or discard it at any time.”
- **Private check DE/EN:** „Was ist aus deiner vorgemerkten Frage geworden?“ / “What happened to the question you saved?” Actions: **Schon gestellt / Already asked**, **Noch offen / Still open**, **Verwerfen / Let it go**.
- **Two pending DE:** „Zwei vorgemerkte Fragen sind noch offen. Ihr könnt hier enden. Wenn ihr beide weitermachen möchtet, beginnt {A}; vor {B}s Frage entscheidet ihr erneut. Jede Frage und jede Antwort darf ohne Begründung ausgelassen werden.“
- **Two pending EN:** “Two saved questions are still open. You can end here. If you both want to continue, {A} goes first; you will choose again before {B}’s question. Either question or answer may be passed without explanation.”
- **One pending DE:** „Eine vorgemerkte Frage ist noch offen. {who} darf sie {other} stellen, wenn ihr beide weitermachen möchtet. Die Frage und die Antwort dürfen ausgelassen werden.“
- **One pending EN:** “One saved question is still open. {who} may ask {other} if you both want to continue. Either the question or the answer may be passed.”
- **Turn DE/EN:** „{who}, du darfst deine vorgemerkte Frage stellen. {other} darf ohne Begründung passen.“ / “{who}, you may ask the question you saved. {other} may pass without explanation.”
- **None pending DE:** „Keine vorgemerkte Frage ist mehr offen. Ihr könnt hier enden – oder gemeinsam eine freiwillige letzte Frage nehmen. Keine Antwort ist geschuldet.“
- **None pending EN:** “No saved question remains open. You can end here—or take one optional shared closer. No answer is owed.”
- **Bonus DE/EN:** „Welche Frage hätte dieses Gespräch gut abgerundet? Ihr müsst sie nicht beantworten.“ / “What question would have rounded out this conversation well? You do not have to answer it.”

#### First Date — `first-date-curiosities`

- **A DE:** „Denk an eine leichte Nachfrage zu etwas, wofür sich {other} begeistert oder worauf sich {other} freut. Sie darf neugierig sein, aber nichts über Anziehung, Zustimmung oder ein weiteres Date voraussetzen. Behalte sie im Kopf; gib sie nirgends ein.“
- **A EN:** “Think of one light follow-up about something {other} enjoys or is looking forward to. It may be curious, but it must not assume attraction, consent, or another date. Keep it in mind; do not type it anywhere.”
- **B DE:** „Denk an eine leichte Frage zu einer alltäglichen Vorliebe von {other} – etwa zu Essen, Routinen, Orten oder kleinen Freuden. Mach daraus keinen Kompatibilitätstest. Behalte sie im Kopf; gib sie nirgends ein.“
- **B EN:** “Think of one light question about an everyday preference of {other}—such as food, routines, places, or small pleasures. Do not turn it into a compatibility test. Keep it in mind; do not type it anywhere.”
- **Finale DE:** „Wenn ihr möchtet, könnt ihr die zwei verschiedenen privaten Fragen jetzt nacheinander nutzen. {A} beginnt mit einer Nachfrage zu einer Begeisterung; danach kann {B} eine Frage zu einer Alltagsvorliebe stellen. Jede Frage und jede Antwort darf ausgelassen werden. Keine Antwort verspricht ein weiteres Date.“
- **Finale EN:** “If you like, you may use the two different private questions now. {A} begins with a follow-up about an interest; {B} may then ask about an everyday preference. Either question or answer may be passed. No answer promises another date.”
- **Each turn DE/EN:** „{who}, wenn du eine Frage behalten hast, kannst du sie jetzt stellen. {other} darf ohne Begründung passen.“ / “{who}, if you kept a question, you may ask it now. {other} may pass without explanation.”
- **Skipped DE/EN:** „Ihr könnt hier enden. Nichts aus diesem Gespräch verspricht ein weiteres Date.“ / “You can end here. Nothing in this conversation promises another date.”

#### Date Night — `date-night-appreciation`

- **A DE:** „Wähle eine konkrete, nicht körperbewertende Sache, die du heute an {other}s Art, Aufmerksamkeit oder Ausstrahlung schätzt. Du kannst sie im Finale benennen. Ein Kompliment ist keine Einladung zu mehr Nähe.“
- **A EN:** “Choose one specific, non-body-evaluating thing you appreciate about {other}’s manner, attention, or presence tonight. You may name it in the finale. A compliment is not an invitation to greater intimacy.”
- **B DE:** „Wähle ein kleines Detail, das ein mögliches künftiges Date angenehm machen könnte – eine Stimmung, einen Ortstyp, ein Essen, eine Aktivität oder etwas anderes. Behalte es als Möglichkeit, nicht als Einladung oder Versprechen.“
- **B EN:** “Choose one small detail that could make a possible future date enjoyable—a mood, type of place, food, activity, or something else. Hold it as a possibility, not an invitation or promise.”
- **Finale DE:** „Wenn ihr möchtet, kann {A} zuerst die Wertschätzung teilen; danach kann {B} das mögliche Detail für ein künftiges Date nennen. Beides darf privat bleiben. Niemand muss reagieren oder zustimmen; daraus entstehen weder ein Plan noch Zustimmung zu Nähe.“
- **Finale EN:** “If you like, {A} may share the appreciation first; {B} may then name the possible future-date detail. Either may remain private. Nobody has to respond or agree; neither creates a plan or consent to intimacy.”
- **A turn DE/EN:** „{who}, wenn du eine Wertschätzung behalten hast, kannst du sie jetzt in einem Satz teilen. {other} muss sie nicht erwidern.“ / “{who}, if you kept an appreciation in mind, you may share it in one sentence. {other} does not have to reciprocate.”
- **B turn DE/EN:** „{who}, wenn du ein mögliches Detail behalten hast, kannst du es jetzt nennen. Es ist kein Plan und keine Einladung.“ / “{who}, if you kept a possible detail in mind, you may name it now. It is not a plan or invitation.”
- **Skipped DE/EN:** „Ihr könnt hier enden. Was ihr geteilt habt, ist keine Einladung zu mehr Nähe und kein Plan für später.“ / “You can end here. What you shared is not an invitation to greater intimacy or a plan for later.”

#### Couples — `couples-listening`

- **A DE:** „Nimm dir für Akt II vor, auf eine schwierige Antwort zuerst mit Zuhören zu reagieren: kurz spiegeln oder nachfragen, bevor du etwas lösen möchtest. Du musst dieses Vorhaben nicht ankündigen.“
- **A EN:** “For Act II, intend to meet a difficult answer with listening first: briefly reflect or ask before trying to solve anything. You do not need to announce this intention.”
- **B DE:** „Denk an eine konkrete Stärke, die {other} in schwierige gemeinsame Momente einbringt. Du kannst sie am Ende von Akt II in einem Satz benennen. Nutze sie nicht, um etwas Schwieriges kleinzureden oder eine Gegenleistung zu erwarten.“
- **B EN:** “Think of one specific quality {other} brings to difficult moments between you. You may name it in one sentence at the end of Act II. Do not use it to minimize anything difficult or expect something in return.”
- **Use DE:** „Bevor ihr weitergeht: Wer eine Stärke im Kopf behalten hat, kann sie jetzt in einem Satz benennen. Zuhören reicht; niemand muss erwidern. Eine Wertschätzung löscht nichts Schwieriges aus. Die private Zuhör-Intention endet hier.“
- **Use EN:** “Before continuing: anyone who kept a quality in mind may name it in one sentence now. Listening is enough; nobody has to reciprocate. Appreciation does not erase anything difficult. The private listening intention ends here.”

#### Friends — `friends-memory-celebration`

- **A DE/EN:** „Denk an eine gemeinsame Erinnerung, die du im Finale gern kurz nennen würdest. Wähle etwas, das dir wichtig ist, ohne dass {other} dieselbe Bedeutung oder Version bestätigen muss.“ / “Think of one shared memory you might like to name briefly in the finale. Choose something that matters to you without requiring {other} to confirm the same meaning or version.”
- **B DE/EN:** „Denk an etwas, das {other} heute erzählt hat und das du ehrlich mitfeiern möchtest – klein oder groß. Kein Rat, kein Vergleich und kein nächster Schritt.“ / “Think of something {other} shared tonight that you would genuinely like to celebrate—large or small. No advice, comparison, or next step.”
- **Finale DE/EN:** „Wenn ihr möchtet, kann {A} zuerst eine gemeinsame Erinnerung nennen und sagen, was sie {A} bedeutet. Danach kann {B} etwas aus dem heutigen Gespräch würdigen. Beides darf privat bleiben; niemand muss zustimmen, erwidern oder Nähe versprechen.“ / “If you like, {A} may first name a shared memory and say what it means to {A}. {B} may then appreciate something from tonight’s conversation. Either may remain private; nobody has to agree, reciprocate, or promise closeness.”
- **A turn DE/EN:** „{who}, wenn du eine Erinnerung behalten hast, kannst du sie jetzt nennen und sagen, was sie dir bedeutet. {other} muss dieselbe Version nicht bestätigen.“ / “{who}, if you kept a memory in mind, you may name it and say what it means to you. {other} does not have to confirm the same version.”
- **B turn DE/EN:** „{who}, wenn du etwas aus dem Gespräch mitfeiern möchtest, kannst du es jetzt würdigen. Rat oder ein nächster Schritt sind nicht nötig.“ / “{who}, if you kept something from the conversation that you want to celebrate, you may appreciate it now. No advice or next step is needed.”
- **Skipped DE/EN:** „Ihr könnt hier enden – oder noch eine freiwillige Frage nehmen: Was möchtest du, dass die andere Person aus diesem Gespräch über dich mitnimmt?“ / “You can end here—or take one optional final question: What would you like the other person to take away from this conversation about you?”

#### Old Friends — `old-friends-memory-lenses`

- **A DE/EN:** „Denk an ein konkretes sinnliches Detail aus der letzten gemeinsamen Erinnerung, über die ihr gesprochen habt – einen Ort, Klang, Gegenstand oder etwas Ähnliches. Behalte es als deine Erinnerung, nicht als Beweis. Wenn keine gemeinsame Erinnerung aufkam, wähle „Heute nicht“.“ / “Think of one concrete sensory detail from the most recent shared memory you discussed—a place, sound, object, or something similar. Hold it as your memory, not as evidence. If no shared memory came up, choose ‘Not today.’”
- **B DE/EN:** „Denk bei derselben Erinnerung daran, wie der Moment sich für dich angefühlt hat oder was er dir heute bedeutet. Behalte es als deine Perspektive, nicht als Korrektur. Wenn keine gemeinsame Erinnerung aufkam, wähle „Heute nicht“.“ / “For that same memory, think about how the moment felt to you or what it means to you today. Hold it as your perspective, not as a correction. If no shared memory came up, choose ‘Not today.’”
- **Immediate use DE/EN:** „Falls ihr in Akt I über eine gemeinsame Erinnerung gesprochen habt, kann {A} jetzt ein konkretes Detail nennen; danach kann {B} sagen, wie sich derselbe Moment angefühlt hat oder was er heute bedeutet. Unterschiedliche Erinnerungen dürfen nebeneinanderstehen. Ihr sucht keine richtige Version, und beides darf privat bleiben.“ / “If a shared memory came up in Act I, {A} may name one concrete detail now; {B} may then say how the same moment felt or what it means today. Different memories may stand side by side. You are not looking for the correct version, and either part may remain private.”

#### Deep — `deep-listening`

- **A DE/EN:** „Nimm dir für Akt II vor, nach einer intensiven Antwort zuerst in einem kurzen Satz zu spiegeln, was du verstanden hast – ohne die Person zu deuten oder zu diagnostizieren.“ / “For Act II, intend to respond to an intense answer first with one brief sentence reflecting what you understood—without interpreting or diagnosing the person.”
- **B DE/EN:** „Nimm dir für Akt II vor, nach einer intensiven Antwort einen Moment Stille zuzulassen, bevor du nachfragst. Nutze die Stille nicht, um mehr Offenheit zu erwarten.“ / “For Act II, intend to allow a moment of silence after an intense answer before asking anything. Do not use the silence to expect greater disclosure.”
- **Use DE/EN:** „Die privaten Zuhör-Intentionen enden hier. Nichts muss nachbesprochen, eingeordnet oder gelöst werden. Ihr könnt mit Akt III weitergehen oder das Spiel beenden.“ / “The private listening intentions end here. Nothing has to be revisited, categorized, or solved. You may continue to Act III or end the game.”

#### Chaos — `chaos-private-sparks`

- **A DE/EN:** „Dein privater Funke für die nächste gemeinsame Aufgabe: Das erfundene Unternehmen löst ein Problem, das wirklich niemand hat.“ / “Your private spark for the next shared task: the invented business solves a problem that nobody actually has.”
- **B DE/EN:** „Dein privater Funke für die nächste gemeinsame Aufgabe: Das Unternehmen bekommt einen dramatisch ernsten Namen für etwas völlig Albernes.“ / “Your private spark for the next shared task: the business gets a dramatically serious name for something completely silly.”
- **Q16 supplement DE/EN:** „Wenn du einen privaten Funken behalten hast, baue ihn ein. Niemand muss erraten, welche Karte die andere Person gesehen hat, und beide Funken dürfen ignoriert werden.“ / “If you kept a private spark, work it in. Nobody has to guess which card the other person saw, and either spark may be ignored.”

#### Late Night — independent readiness and consent

- **Entry A DE/EN:** „Entscheide nur für dich. Bist du mindestens 18 Jahre alt und möchtest du freiwillig an einem ausdrücklich sexuellen Gespräch teilnehmen? Du kannst jede Frage überspringen und jederzeit aufhören. Deine Wahl wird zunächst niemandem angezeigt.“ / “Decide only for yourself. Are you at least 18 years old, and do you freely want to take part in an explicitly sexual conversation? You may pass any question and stop at any time. Your choice will not initially be shown to anyone.”
- **Entry B DE/EN:** „Entscheide unabhängig. Die erste Wahl wird dir nicht gezeigt und verpflichtet dich zu nichts. Bist du mindestens 18 Jahre alt und möchtest du freiwillig an einem ausdrücklich sexuellen Gespräch teilnehmen? Du kannst jede Frage überspringen und jederzeit aufhören.“ / “Decide independently. The first choice is not shown to you and does not obligate you. Are you at least 18 years old, and do you freely want to take part in an explicitly sexual conversation? You may pass any question and stop at any time.”
- **Act II A DE/EN:** „Möchtest du für dich freiwillig mit ausdrücklich sexuellen Fragen über Berührung, Sex, Fantasien und Grenzen fortfahren? Du kannst jede Frage überspringen, deine Meinung ändern oder hier enden. Keine Antwort ist Zustimmung zu einer Handlung.“ / “Do you freely want to continue with explicitly sexual questions about touch, sex, fantasies, and boundaries? You may pass any question, change your mind, or end here. No answer is consent to an action.”
- **Act II B DE/EN:** „Entscheide erneut unabhängig. Die erste Wahl wird dir nicht gezeigt und verpflichtet dich zu nichts. Möchtest du freiwillig mit den ausdrücklich sexuellen Fragen fortfahren? Du kannst jede Frage überspringen, deine Meinung ändern oder hier enden. Keine Antwort ist Zustimmung zu einer Handlung.“ / “Decide independently again. The first choice is not shown to you and does not obligate you. Do you freely want to continue with the explicitly sexual questions? You may pass any question, change your mind, or end here. No answer is consent to an action.”
- **Actions DE/EN:** **Ja, freiwillig / Yes, voluntarily** and **Hier enden / End here**, with equal visual prominence.
- **Entry accepted DE/EN:** „Ihr habt beide unabhängig gewählt, LATE NIGHT zu starten. Das ist nur Zustimmung zum Gespräch, niemals zu einer Handlung.“ / “You both independently chose to start LATE NIGHT. This is consent only to the conversation, never to an action.”
- **Act II accepted DE/EN:** „Ihr habt beide unabhängig gewählt, mit Akt II fortzufahren. Jede einzelne Frage bleibt freiwillig; keine Antwort ist Zustimmung zu einer Handlung.“ / “You both independently chose to continue to Act II. Every individual question remains optional; no answer is consent to an action.”
- **Entry declined DE/EN:** „Alles gut. LATE NIGHT startet nicht. Niemand muss erklären, wer beendet hat oder warum.“ / “All good. LATE NIGHT will not start. Nobody has to explain who ended it or why.”
- **Act II declined DE/EN:** „Alles gut. LATE NIGHT endet hier, bevor die expliziteren Fragen beginnen. Niemand muss erklären, wer beendet hat oder warum.“ / “All good. LATE NIGHT ends here before the more explicit questions begin. Nobody has to explain who ended it or why.”
- **Direct finale DE/EN:** „Damit endet LATE NIGHT. Was ihr gesagt habt, ist Information – keine Zustimmung zu einer Handlung. Alles Weitere braucht außerhalb des Spiels eine konkrete, freiwillige und jederzeit widerrufbare Zustimmung.“ / “This is the end of LATE NIGHT. What you said is information—not consent to an action. Anything further requires specific, voluntary, and withdrawable consent outside the game.”

Full displays **FRAGE 37 / QUESTION 37** only for Classic’s saved-question finale. Standard uses **FINALE** for optional pack finales. Listed response cards are optional listening cues and do not count as questions.

The stated durations are **pilot ranges**, not promises. They must be calibrated through real user testing and must never trigger automatic progress or visible time pressure.

---

## 2. CLASSIC

**Goal:** Preserve the existing 36-question experience in content, meaning, and order.
**Acts:** NEUGIERIG → NÄHER → OFFEN
**Duration:** Quick extract 20–30 min · Standard extract 35–50 min · Full 45–75 min
**Default:** Full
**Note:** The version below matches the current branch. Only five German phrasings were minimally made gender-neutral (Q01, Q06, Q27, Q28, Q36); question content, intensity, and order remain unchanged.
**Positioning DE:** „Die vollständige Route folgt eng einer Forschungsaufgabe zu unmittelbarer zwischenmenschlicher Nähe. Kürzere Routen sind CLOSER-Auszüge.“
**Positioning EN:** “The Full route closely follows a research task on immediate interpersonal closeness. Shorter routes are CLOSER extracts.”
**Research note DE:** „CLASSIC Full folgt eng der 36-Fragen-Abfolge aus Aron et al. (1997). In einer Laborstudie berichteten Teilnehmende nach der vollständigen, etwa 45-minütigen Aufgabe mehr unmittelbare Nähe als nach Small Talk. Quick, Standard, die deutsche Redaktion und alle App-Mechaniken sind CLOSER-Adaptionen. Liebe, Kompatibilität oder dauerhafte Wirkung wurden nicht gezeigt.“
**Research note EN:** “CLASSIC Full closely follows the 36-question sequence in Aron et al. (1997). In a laboratory study, participants reported greater immediate closeness after the complete, approximately 45-minute task than after small talk. Quick, Standard, the German editorial version, and all app mechanics are CLOSER adaptations. Love, compatibility, and lasting effects were not demonstrated.”

### Curated routes

- **Quick · CLOSER extract:** Q01, Q04, Q09, Q12 · Q13, Q14, Q16, Q17 · Q25, Q26, Q31, Q36
- **Standard · CLOSER extract:** Q01, Q02, Q03, Q04, Q08, Q09, Q11, Q12 · Q13, Q14, Q15, Q16, Q17, Q18, Q20, Q21 · Q25, Q26, Q27, Q28, Q29, Q30, Q31, Q36
- **Full · complete 36-question sequence:** Q01–Q36 in the order shown below

### Act I – NEUGIERIG / CURIOUS

| ID | Deutsch | English |
|---|---|---|
| Q01 | Wenn du jeden und jede auf der Welt einladen könntest, mit wem würdest du gerne essen gehen? | If you could invite anyone in the world, who would you want to have dinner with? |
| Q02 | Wärst du gerne berühmt? Wenn ja, wie? | Would you like to be famous? If so, in what way? |
| Q03 | Probst du manchmal vor einem Telefonat, was du sagen wirst? Warum? | Do you ever rehearse what you are going to say before a phone call? Why? |
| Q04 | Wie würde dein perfekter Tag aussehen? | What would your perfect day look like? |
| Q05 | Wann hast du zuletzt für dich gesungen? Und für jemand anderen? | When did you last sing to yourself? And to someone else? |
| Q06 | Wenn du bis 90 leben könntest und du entweder den Körper oder den Geist eines Dreißigjährigen die restlichen 60 Jahre behalten könntest – wofür würdest du dich entscheiden? | If you could live to 90 and keep either the body or the mind of a thirty-year-old for the last 60 years — which would you choose? |
| Q07 | Hast du eine Vorahnung, wie du sterben wirst? | Do you have a hunch about how you are going to die? |
| Q08 | Nenne drei Dinge, die du und dein Gegenüber scheinbar gemeinsam haben. | Name three things you and the other person seem to have in common. |
| Q09 | Wofür bist du in deinem Leben am dankbarsten? | What are you most grateful for in your life? |
| Q10 | Wenn du etwas daran ändern könntest, wie du aufgezogen wurdest, was wäre das? | If you could change one thing about the way you were raised, what would it be? |
| Q11 | Erzähle deinem Gegenüber innerhalb von vier Minuten deine Lebensgeschichte – so detailreich wie möglich! | Tell the other person your life story in four minutes — in as much detail as you can. |
| Q12 | Wenn du morgen aufwachst und eine Eigenschaft oder Fähigkeit dazugewonnen hast, welche hättest du dann gerne? | If you woke up tomorrow having gained one quality or ability, which would you want? |

### Act II – NÄHER / CLOSER

| ID | Deutsch | English |
|---|---|---|
| Q13 | Wenn dir eine Kristallkugel die Wahrheit über dich, dein Leben, deine Zukunft oder irgendetwas sonst verraten könnte, was würdest du wissen wollen? | If a crystal ball could tell you the truth about yourself, your life, your future or anything else — what would you want to know? |
| Q14 | Gibt es etwas, von dem du schon lange träumst, es zu tun? Warum hast du es noch nicht getan? | Is there something you have dreamed of doing for a long time? Why have you not done it yet? |
| Q15 | Was ist deine größte Leistung in deinem Leben? | What is the greatest achievement of your life? |
| Q16 | Was schätzt du an einer Freundschaft am meisten? | What do you value most in a friendship? |
| Q17 | Was ist deine wertvollste Erinnerung? | What is your most treasured memory? |
| Q18 | Was ist deine schrecklichste Erinnerung? | What is your most terrible memory? |
| Q19 | Wenn du wüsstest, dass du in einem Jahr plötzlich sterben wirst, würdest du irgendetwas daran ändern, wie du jetzt lebst? Warum? | If you knew you would die suddenly in one year, would you change anything about how you are living now? Why? |
| Q20 | Was bedeutet dir Freundschaft? | What does friendship mean to you? |
| Q21 | Welche Rolle spielen Liebe und Zuneigung in deinem Leben? | What role do love and affection play in your life? |
| Q22 | Wechselt euch ab, jeweils fünf positive Eigenschaften eures Gegenübers aufzuzählen. | Take turns naming five positive qualities of the other person. |
| Q23 | Wie nahe und warmherzig ist deine Familie? Glaubst du, dass deine Kindheit glücklicher war als die anderer Menschen? | How close and warm is your family? Do you think your childhood was happier than most people's? |
| Q24 | Wie ist die Beziehung zu deiner Mutter? | What is your relationship with your mother like? |

### Act III – OFFEN / OPEN

| ID | Deutsch | English |
|---|---|---|
| Q25 | Macht jeweils drei wahre Aussagen, die "wir" beinhalten. Beispielsweise: "Wir sind beide in diesem Raum und fühlen …" | Each make three true statements using "we". For example: "We are both in this room and feeling …" |
| Q26 | Vervollständige diesen Satz: Ich wünschte, ich hätte jemanden, mit dem ich … teilen kann. | Complete this sentence: I wish I had someone I could share … with. |
| Q27 | Wenn du mit deinem Gegenüber eng befreundet wärst: Was wäre für diese Person wichtig, über dich zu wissen? | If you were to become a close friend of the other person, what would be important for them to know about you? |
| Q28 | Sag deinem Gegenüber, was du an dieser Person magst. Sei dabei sehr ehrlich und sag etwas, das du wahrscheinlich nicht zu jemandem sagen würdest, den du gerade getroffen hast. | Tell the other person what you like about them. Be very honest — say something you probably would not say to someone you had just met. |
| Q29 | Teile einen peinlichen Moment deines Lebens. | Share an embarrassing moment from your life. |
| Q30 | Wann hast du zuletzt vor einer anderen Person geweint? Und wann alleine? | When did you last cry in front of another person? And when alone? |
| Q31 | Was magst du jetzt schon an deinem Gegenüber? | What do you already like about the other person? |
| Q32 | Was ist zu ernst, sodass man darüber keine Witze machen sollte? | What is too serious to joke about? |
| Q33 | Wenn du heute Abend sterben würdest und keine Gelegenheit mehr hättest, mit jemandem zu reden, was würdest du am meisten bereuen, nicht gesagt zu haben? Und warum hast du es noch nicht gesagt? | If you were to die this evening with no chance to speak to anyone, what would you most regret not having said? And why have you not said it yet? |
| Q34 | Dein Haus und darin alles, was du besitzt, brennt. Menschen und Tiere sind in Sicherheit, und du hast die Möglichkeit, noch ein Ding zu retten. Was wäre das und wieso? | Your house, and everything you own in it, is burning. People and pets are safe, and you can save one more object. What would it be and why? |
| Q35 | Von all den Menschen in deiner Familie, wessen Tod würde dich am meisten treffen? Warum? | Of everyone in your family, whose death would affect you most? Why? |
| Q36 | Teile ein persönliches Problem und frage dein Gegenüber, wie diese Person damit umgehen würde. Bitte dein Gegenüber außerdem darum, zu spiegeln, wie du dich mit dem Problem zu fühlen scheinst. | Share a personal problem and ask the other person how they would handle it. Then ask them to reflect back how you seem to feel about the problem you chose. |

### Question 37

Classic Full uses the categorical saved-question finale defined in [Private Moments (FR-005)](#private-moments-fr-005). Classic Quick and Standard have no Private Moment; Quick ends directly and Standard uses its ordinary shared finale.

---

## 3. FIRST DATE

**Arc:** NEUGIER → SIGNAL → KLARHEIT
**Goal:** Explore interest, chemistry, and values without introducing trauma, death, past relationships, or sexuality too early.
**Duration:** Quick 15–20 min · Standard 25–35 min · Full 45–60 min
**Default:** Quick

### Act I – NEUGIER / CURIOSITY

| Nr. | Deutsch | English |
|---:|---|---|
| Q01 | Wie sieht für dich ein perfekter ungeplanter Abend aus? | What does your perfect spontaneous evening look like? |
| Q02 | Über welches Thema kannst du reden, ohne die Zeit zu bemerken? | What topic can you talk about and completely lose track of time? |
| Q03 | Welche Kleinigkeit bringt dich fast immer zum Lachen? | What small thing can almost always make you laugh? |
| Q04 | Worauf freust du dich gerade wirklich? | What are you genuinely looking forward to right now? |
| Q05 | Welche einfache Freude hat zuletzt einen gewöhnlichen Tag besser gemacht? | What simple pleasure recently made an ordinary day better? |
| Q06 | Was machst du gern, ohne darin besonders gut sein zu müssen? | What do you enjoy doing without needing to be particularly good at it? |
| Q07 | Auf welchen kleinen Moment der letzten Zeit bist du stolz – und warum? | What small recent moment made you feel proud, and why? |
| Q08 | Wofür begeisterst du dich gerade mehr, als andere vielleicht erwarten würden? | What are you more excited about lately than people might expect? |
| Q09 | An welchem Ort fühlst du dich überraschend schnell wohl? | Where do you find it surprisingly easy to feel at home? |
| Q10 | Welche kleine Gewohnheit macht deinen Alltag spürbar besser? | What small habit makes a real difference to your day? |
| Q11 | Was würdest du gern nur zum Vergnügen lernen? | What would you love to learn purely for the fun of it? |
| Q12 | Welche kleine Entscheidung hat dir in letzter Zeit überraschend gutgetan? | What small decision has turned out surprisingly well for you lately? |

### Act II – SIGNAL / SIGNALS

| Nr. | Deutsch | English |
|---:|---|---|
| Q13 | Was hilft dir, dich mit einer neuen Person schnell wohlzufühlen? | What helps you feel comfortable around someone new? |
| Q14 | Welche Eigenschaft fällt dir an anderen Menschen positiv auf? | What quality in other people tends to catch your attention in a good way? |
| Q15 | Was macht ein Date für dich gut – unabhängig davon, wie es danach weitergeht? | What makes a date worthwhile, regardless of what happens afterward? |
| Q16 | Was möchtest du über einen Menschen wissen, bevor du dir ein Urteil bildest? | What do you want to know about someone before you form an opinion of them? |
| Q17 | Welches Verhalten gibt dir das Gefühl, dass dir wirklich zugehört wird? | What does someone do that makes you feel genuinely heard? |
| Q18 | Wie zeigst du, dass dich eine Antwort wirklich interessiert? | How do you show someone that you are genuinely interested in their answer? |
| Q19 | Welche Art von Kompliment erreicht dich wirklich? | What kind of compliment truly lands with you? |
| Q20 | Welche Art von gemeinsamem Schweigen fühlt sich für dich angenehm an? | What kind of shared silence feels comfortable to you? |
| Q21 | Welcher Wert zeigt sich in deinem Alltag besonders deutlich? | Which of your values shows up most clearly in your everyday life? |
| Q22 | Welche gute Eigenschaft an dir erkennen Menschen oft erst mit der Zeit? | What good quality in you do people often discover only with time? |
| Q23 | Welche Mischung aus Planung und Spontaneität passt gut zu dir? | What balance of planning and spontaneity suits you best? |
| Q24 | Welche Version von dir lernen neue Menschen meistens zuerst kennen? | Which version of you do new people usually meet first? |

### Act III – KLARHEIT / CLARITY

| Nr. | Deutsch | English |
|---:|---|---|
| Q25 | Was hoffst du, dass eine Person an dir bemerkt, ohne dass du es beweisen musst? | What do you hope someone notices about you without making you prove it? |
| Q26 | Woran merkst du, dass du jemanden gern wiedersehen möchtest? | How do you know when you would like to see someone again? |
| Q27 | Welche Grenze macht Dating für dich leichter und sicherer? | What boundary makes dating feel easier and safer for you? |
| Q28 | Welche Art von Verbindung hoffst du zu finden, ohne heute schon mehr versprechen zu müssen? | What kind of connection are you hoping for without having to promise anything tonight? |
| Q29 | Welches Tempo fühlt sich beim Kennenlernen für dich gut an? | What pace feels right to you when getting to know someone? |
| Q30 | Welche Wahrheit über deinen Alltag ist wichtig, um dich gerade gut kennenzulernen? | What truth about your day-to-day life right now would help someone understand you better? |
| Q31 | Wie zeigt sich Verlässlichkeit für dich am Anfang eines Kennenlernens? | What does reliability look like to you early on? |
| Q32 | Wie soll eine Person nachfragen, wenn sie deine Gefühle nicht sicher einschätzen kann? | How would you like someone to ask when they are unsure how you feel? |
| Q33 | Was lässt dich respektiert fühlen, wenn Interessen oder Meinungen auseinandergehen? | What makes you feel respected when interests or opinions differ? |
| Q34 | Was möchtest du, dass dein Gegenüber von dir aus diesem Abend in Erinnerung behält? | What do you hope the other person remembers about you from tonight? |
| Q35 | Was hilft dir, ehrlich Nein zu sagen, ohne dich für die Stimmung verantwortlich zu fühlen? | What helps you say an honest no without feeling responsible for the mood? |
| Q36 | Was würde diesen Abend für dich gut und druckfrei abrunden? | What would make this evening feel complete and pressure-free for you? |

### Curated routes

- **Quick (12):** `Q01, Q02, Q04, Q07` → `Q13, Q15, Q17, Q21` → `Q25, Q27, Q28, Q36`
- **Standard (24):** `Q01, Q02, Q03, Q04, Q05, Q07, Q08, Q12` → `Q13, Q14, Q15, Q16, Q17, Q19, Q21, Q24` → `Q25, Q26, Q27, Q28, Q29, Q31, Q34, Q36`
- **Full (36):** `Q01–Q36`

### Question 37

First Date Standard and Full use the two-turn interest/everyday-preference finale defined in [Private Moments (FR-005)](#private-moments-fr-005). Quick ends directly.

---

## 4. DATE NIGHT

**Arc:** FUNKE → SPANNUNG → OFFEN
**Goal:** Warmth, attraction, playful novelty, and sensual closeness between two adults; suggestive but not explicit and without pressure to act.
**Duration:** Quick 15–20 min · Standard 25–40 min · Full 45–70 min
**Default:** Standard

### Act I – FUNKE / SPARK

| Nr. | Deutsch | English |
|---:|---|---|
| Q01 | Welche kleine Sache findest du überraschend attraktiv? | What small thing do you find surprisingly attractive? |
| Q02 | Welches Kompliment bleibt bei dir besonders lange hängen? | What kind of compliment tends to stay with you? |
| Q03 | Wie kann eine Person für dich klar zeigen, dass sie flirtet, und zugleich nachfragen, ob das willkommen ist? | How can someone make it clear to you that they are flirting while also checking whether it is welcome? |
| Q04 | Bei welcher Art von Date vergisst du leicht die Zeit? | What kind of date makes it easy for you to lose track of time? |
| Q05 | Welcher konkrete Moment zwischen euch hatte zuletzt einen besonderen Funken? | What recent moment between you had a special spark? |
| Q06 | Welche Seite an deinem Gegenüber entdeckst du immer wieder gern neu? | What side of the person across from you do you still enjoy rediscovering? |
| Q07 | Welche Art von Ausstrahlung zieht deine Aufmerksamkeit sofort an? | What kind of presence catches your attention immediately? |
| Q08 | Welche spielerische Geste lässt dich merken, dass du gemeint bist? | What playful gesture makes you feel singled out in the best way? |
| Q09 | Was macht einen gewöhnlichen Moment für dich romantisch? | What turns an ordinary moment into a romantic one for you? |
| Q10 | Welche gemeinsame Erinnerung gibt dir sofort ein warmes Gefühl? | What shared memory gives you an instant warm feeling? |
| Q11 | Welche Art von Vorfreude genießt du besonders? | What kind of anticipation do you enjoy most? |
| Q12 | Welche Kleinigkeit an deinem Gegenüber ist dir heute positiv aufgefallen? | What small thing about the person across from you have you appreciated tonight? |

### Act II – SPANNUNG / TENSION

| Nr. | Deutsch | English |
|---:|---|---|
| Q13 | Wann fühlst du dich besonders begehrt? | When do you feel most desired? |
| Q14 | Welche Form von Nähe lässt dich entspannen? | What kind of closeness helps you relax? |
| Q15 | Was würdest du bei einem Date gern öfter selbst initiieren? | What would you like to initiate more often on a date? |
| Q16 | Welche unausgesprochene Spannung zwischen zwei Menschen findest du schön? | What kind of unspoken tension between two people do you enjoy? |
| Q17 | Welche verspielte Aufmerksamkeit lässt dich besonders gewählt fühlen? | What kind of playful attention makes you feel especially chosen? |
| Q18 | Welche Art von Berührung fühlt sich für dich besonders zärtlich an? | What kind of touch feels especially tender to you? |
| Q19 | Welche Atmosphäre spricht deine Sinne besonders an? | What kind of atmosphere awakens your senses? |
| Q20 | Falls Küsse für dich dazugehören: Welche Art von Kuss fühlt sich besonders innig an? | If kissing is part of intimacy for you, what kind of kiss feels especially close? |
| Q21 | Welche neue gemeinsame Erfahrung könnte zwischen euch einen Funken wecken? | What new experience together could bring out a fresh spark between you? |
| Q22 | Welches flirtende Kompliment würdest du heute gern hören? | What flirty compliment would you enjoy hearing tonight? |
| Q23 | Welches Tempo lässt Anziehung für dich wachsen? | What pace allows attraction to grow for you? |
| Q24 | Was lässt Anziehung für dich verspielt statt druckvoll wirken? | What makes attraction feel playful rather than pressured to you? |

### Act III – OFFEN / OPENNESS

| Nr. | Deutsch | English |
|---:|---|---|
| Q25 | Was hilft dir, dich bei Nähe sicher und ungezwungen zu fühlen? | What helps you feel safe and at ease with closeness? |
| Q26 | Welche Grenze macht Intimität für dich erst möglich? | What boundary helps make intimacy possible for you? |
| Q27 | Was sollte ein Mensch über dein Verlangen verstehen, ohne es persönlich zu nehmen? | What should someone understand about your desire without taking it personally? |
| Q28 | Was macht es dir leicht, ein ehrliches Ja oder Nein auszusprechen? | What makes it easier for you to give an honest yes or no? |
| Q29 | Welche Form von Nähe fühlt sich gut an, auch wenn sie nirgendwohin führen muss? | What kind of closeness feels good even when it does not have to lead anywhere? |
| Q30 | Welche romantische Initiative lässt dich wirklich gesehen fühlen? | What romantic initiative makes you feel truly seen? |
| Q31 | Welche Reaktion hilft dir, wenn eure Wünsche gerade nicht übereinstimmen? | What kind of response helps when your wishes do not match in the moment? |
| Q32 | Welches kleine Sinnesdetail dieses Abends – ein Blick, ein Geräusch, ein Geschmack oder etwas anderes – möchtest du in Erinnerung behalten? | What small sensory detail from tonight—a look, a sound, a taste, or something else—would you like to remember? |
| Q33 | Welchen Wunsch würdest du gern teilen, wenn daraus keine Erwartung entsteht? | What wish would you like to share if it came with no expectation? |
| Q34 | Wie sieht für dich ein schöner Ausklang nach einem besonders nahen Date aus? | What does a lovely ending to an especially close date look like to you? |
| Q35 | Welche kleine neue Erfahrung würdest du bei einem nächsten Date gern teilen? | What small new experience would you enjoy sharing on a future date? |
| Q36 | Welcher Gedanke aus diesem Abend soll noch ein wenig nachklingen? | What thought from tonight would you like to linger a little longer? |

### Curated routes

- **Quick (12):** `Q01, Q02, Q05, Q09` → `Q13, Q14, Q18, Q24` → `Q25, Q28, Q33, Q36`
- **Standard (24):** `Q01, Q02, Q04, Q05, Q06, Q09, Q10, Q12` → `Q13, Q14, Q15, Q18, Q20, Q21, Q23, Q24` → `Q25, Q26, Q28, Q29, Q30, Q32, Q33, Q36`
- **Full (36):** `Q01–Q36`

### Question 37

Date Night Standard and Full use the two-turn appreciation/future-date-detail finale defined in [Private Moments (FR-005)](#private-moments-fr-005). Quick ends directly.

---

## 5. COUPLES

**Arc:** SEHEN → ABSTIMMEN → WÄHLEN
**Goal:** Care for an existing relationship, make positive experiences visible, understand support preferences, and only then carefully open repair and future topics; not a substitute for therapy.
**Duration:** Quick/check-in 12–18 min · Standard 25–40 min · Full 50–75 min
**Default:** Quick/Check-in

### Act I – SEHEN / NOTICING

| Nr. | Deutsch | English |
|---:|---|---|
| Q01 | Welcher kleine Moment zwischen euch hat dir zuletzt gutgetan? | What small moment between you felt good to you recently? |
| Q02 | Was macht ihr als Paar gerade richtig? | What are the two of you doing well as a couple right now? |
| Q03 | Welches Alltagsritual möchtest du unbedingt behalten? | What everyday ritual in your relationship would you really like to keep? |
| Q04 | Wann fühlt ihr euch in eurer Beziehung besonders als Team? | When do the two of you feel most like a team? |
| Q05 | Welche Eigenschaft deines Gegenübers wurde in einem Moment sichtbar, für den du diese Woche dankbar bist? | Which quality in your partner showed up in a moment you felt grateful for this week? |
| Q06 | Welche gute Nachricht oder kleine Freude möchtest du gerade gemeinsam feiern – und welche Reaktion würde sich gut anfühlen? | What piece of good news or small joy would you like to celebrate together right now—and what response would feel good? |
| Q07 | Welche alltägliche Bemühung deines Gegenübers bedeutet dir mehr, als diese Person vermutlich merkt? | What everyday effort from your partner means more to you than they probably realize? |
| Q08 | Was tut dein Gegenüber beim Zuhören, das dich besonders verstanden fühlen lässt? | What does your partner do while listening that makes you feel especially understood? |
| Q09 | Welche kleine Gewohnheit zwischen euch fühlt sich für dich nach Zuhause an? | What small habit between you feels like home to you? |
| Q10 | Welcher Moment hat dich zuletzt stolz auf euch als Paar gemacht? | What recent moment made you feel proud of the two of you as a couple? |
| Q11 | Welche Seite von dir kommt in eurer Beziehung leichter zum Vorschein? | What part of you comes out more easily in your relationship? |
| Q12 | Welches ehrliche Kompliment über eure Beziehung kannst du gut annehmen? | What sincere compliment about your relationship can you truly accept? |

### Act II – ABSTIMMEN / CHECKING IN

| Nr. | Deutsch | English |
|---:|---|---|
| Q13 | Welche Bitte fällt dir deinem Gegenüber schwer auszusprechen? | What request do you find difficult to make of your partner? |
| Q14 | Wie wünschst du dir Trost, wenn es dir nicht gut geht? | How do you like to be comforted when you are having a hard time? |
| Q15 | Welches Bedürfnis bleibt hinter einem wiederkehrenden Missverständnis zwischen euch oft unsichtbar? | What need often goes unseen beneath a recurring misunderstanding between you? |
| Q16 | Woran merkst du, dass eine Entschuldigung bei dir wirklich ankommt? | What tells you that an apology has truly landed? |
| Q17 | Welche Reaktion wünschst du dir zuerst, wenn du Stress teilst? | What kind of response do you want first when you share something stressful? |
| Q18 | Welche Formulierung hilft dir, um Raum zu bitten, ohne Distanz zu meinen? | What words help you ask for space without meaning emotional distance? |
| Q19 | Was macht ein schwieriges Gespräch für dich sicherer? | What helps a difficult conversation feel safer to you? |
| Q20 | Was hilft dir nach einem Missverständnis, wieder neugierig auf die Sicht deines Gegenübers zu werden? | What helps you become curious about your partner’s perspective again after a misunderstanding? |
| Q21 | Welches Signal sollte für euch bedeuten, kurz innezuhalten statt weiterzudrängen? | What signal should tell the two of you to pause rather than push on? |
| Q22 | Welcher frühere schwierige Moment zeigt dir, dass ihr wieder zueinanderfinden könnt? | What past difficult moment reminds you that the two of you can find your way back to each other? |
| Q23 | Welche kleine Veränderung würde in eurem Alltag gerade spürbar Druck herausnehmen? | What small change would noticeably ease the pressure in your everyday life right now? |
| Q24 | Was soll dein Gegenüber verstehen, bevor diese Person versucht, ein Problem für dich zu lösen? | What would you like your partner to understand before they try to solve a problem for you? |

### Act III – WÄHLEN / CHOOSING

| Nr. | Deutsch | English |
|---:|---|---|
| Q25 | Wovon möchtest du in den nächsten drei Monaten mehr gemeinsam erleben? | What would you like the two of you to experience more of over the next three months? |
| Q26 | Welchen gemeinsamen Wunsch habt ihr zu lange verschoben? | What shared wish have the two of you postponed for too long? |
| Q27 | Wie könnt ihr eure Nähe schützen, wenn der Alltag stressig wird? | How can the two of you protect your closeness when everyday life gets stressful? |
| Q28 | Welche kleine Veränderung könnte euch diese Woche guttun, ohne dass daraus eine Verpflichtung wird? | What small change might feel helpful to the two of you this week without becoming an obligation? |
| Q29 | Welche neue gemeinsame Erfahrung würdet ihr im nächsten Monat gern ausprobieren? | What new experience would the two of you like to try in the next month? |
| Q30 | Welche neue Tradition würde gut zu euch passen? | What new tradition would suit the two of you? |
| Q31 | Wie sieht ein gewöhnlicher gemeinsamer Tag aus, auf den du dich auch in einigen Jahren freuen würdest? | What would an ordinary day together look like if it still felt worth looking forward to years from now? |
| Q32 | Welche Eigenschaft möchtet ihr als Team stärker entwickeln? | What quality would you like to grow stronger in as a team? |
| Q33 | Welche Seite eurer Beziehung möchtest du auch in stressigen Zeiten bewusst wählen? | What part of your relationship do you want to keep choosing even during stressful times? |
| Q34 | Zu welchem Gespräch möchtet ihr regelmäßig zurückkehren? | What conversation would you like to return to regularly? |
| Q35 | Welche Unterstützung deines Gegenübers würde dir bei einem aktuellen Ziel wirklich helfen? | What support from your partner would genuinely help with one of your current goals? |
| Q36 | Welcher Satz aus diesem Gespräch soll euch morgen noch begleiten? | What line from this conversation would you like to carry into tomorrow? |

### Curated routes

- **Quick (12):** `Q01, Q02, Q05, Q09` → `Q14, Q17, Q20, Q24` → `Q25, Q28, Q29, Q35`
- **Standard (24):** `Q01, Q02, Q03, Q04, Q05, Q06, Q09, Q10` → `Q13, Q14, Q15, Q16, Q17, Q19, Q20, Q24` → `Q25, Q26, Q27, Q28, Q29, Q31, Q34, Q35`
- **Full (36):** `Q01–Q36`

### Question 37

Couples Standard and Full use the private listening/quality moment after Acts I and II as defined in [Private Moments (FR-005)](#private-moments-fr-005); it does not feed Question 37. Quick has no Private Moment.

In PLAYFUL, Q29 is answered sequentially. `PREDICT` is disabled for that future-oriented preference so it cannot become a partner-knowledge score.

---

## 6. FRIENDS

**Act arc:** LEICHT → DA SEIN → WEITER
**English act names:** LIGHT → SHOWING UP → AHEAD
**Goal:** Humor, appreciation, loyalty, support, and a shared future—explicitly platonic, without romantic framing.
**Duration:** Quick 15–20 min · Standard 30–45 min · Full 50–70 min
**Default:** Standard

### Act I – LEICHT / LIGHT

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q01 | Q/S/F | Welche kleine Sache macht dir im Moment Freude? | What small thing is bringing you joy at the moment? |
| Q02 | S/F | Welche Rolle nimmst du in Gruppen oft ganz automatisch ein? | What role do you tend to slip into automatically in a group? |
| Q03 | F | Für welches eher ungewöhnliche Thema kannst du dich überraschend stark begeistern? | What slightly unusual topic can you get surprisingly excited about? |
| Q04 | Q/S/F | Welche konkrete Erinnerung steckt hinter einem Insider zwischen uns, der immer noch lustig ist? | What specific memory is behind an inside joke between us that is still funny? |
| Q05 | S/F | Woran merkst du am Ende eines freien Tages, dass du ihn gut verbracht hast? | At the end of a day off, what tells you that you spent it well? |
| Q06 | F | Worin bist du besser, als du dir selbst meistens zugestehst? | What are you better at than you usually give yourself credit for? |
| Q07 | Q/S/F | Welche Eigenschaft ist dir in einer guten Freundschaft besonders wichtig? | What quality matters most to you in a good friendship? |
| Q08 | S/F | Welche gute Nachricht aus deinem Leben verdient gerade etwas mehr Aufmerksamkeit – und warum? | What good news in your life deserves a little more attention right now, and why? |
| Q09 | F | Wann hast du dich mit der anderen Person zuletzt besonders ungezwungen gefühlt – und was hat dazu beigetragen? | When did you last feel especially at ease with the other person, and what helped create that feeling? |
| Q10 | Q/S/F | Welche konkrete Sache hat die andere Person einmal für dich getan – und welche Stärke von ihr wurde darin sichtbar? | What is one specific thing the other person once did for you, and what strength of theirs did it reveal? |
| Q11 | S/F | Welche Seite von dir hat sich verändert, seit wir uns kennen? | What side of you has changed since we have known each other? |
| Q12 | F | Über welchen Teil deines Lebens würdest du dir von befreundeten Menschen mehr neugierige Fragen wünschen? | What part of your life would you like your friends to ask more curious questions about? |

### Act II – DA SEIN / SHOWING UP

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q13 | Q/S/F | Welche Form von Unterstützung hilft dir wirklich? | What kind of support genuinely helps you? |
| Q14 | S/F | Wie möchtest du gefragt werden, ob du gerade Rat, Gesellschaft oder etwas anderes möchtest? | How would you like a friend to ask whether you want advice, company, or something else? |
| Q15 | F | Was tut jemand konkret, wenn du dich in einem Gespräch wirklich gehört fühlst? | What does someone actually do that makes you feel truly heard in a conversation? |
| Q16 | Q/S/F | Woran merkst du, dass du in einer Freundschaft ganz du selbst sein kannst? | What tells you that you can be fully yourself in a friendship? |
| Q17 | S/F | Welche Emotion kannst du unter befreundeten Menschen leicht zeigen, und welche eher nicht? | Which emotion can you show easily around friends, and which one is harder to show? |
| Q18 | F | Wann hat eine befreundete Person zuletzt genau die richtige Nachfrage gestellt – und was hat sie bewirkt? | When did a friend last ask exactly the right follow-up question, and what difference did it make? |
| Q19 | Q/S/F | Wann hattest du zuletzt das Gefühl, dass dir eine befreundete Person wirklich den Rücken stärkt? | When did you last feel that a friend truly had your back? |
| Q20 | S/F | Wie wünschst du dir, dass befreundete Menschen auf eine gute Nachricht von dir reagieren? | How would you like your friends to respond when you share good news? |
| Q21 | F | Wenn du einen schweren Tag teilst: Was hilft zuerst – Zuhören, Trost, Ablenkung, Ideen, praktische Hilfe oder etwas anderes? | When you share that you have had a hard day, what helps first: listening, comfort, distraction, ideas, practical help, or something else? |
| Q22 | Q/S/F | Welche Eigenschaft der anderen Person schätzt du, die sie selbst vielleicht unterschätzt? | What quality do you appreciate in the other person that they may underestimate in themselves? |
| Q23 | S/F | Welche Grenze macht Freundschaften für dich verlässlicher und sicherer? | What boundary makes friendships feel more reliable and safe to you? |
| Q24 | F | Welches aktuelle Thema würdest du gern mit einer befreundeten Person teilen können, ohne dass es gelöst werden muss? | What current topic would you like to be able to share with a friend without it needing to be solved? |

### Act III – WEITER / AHEAD

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q25 | Q/S/F | Was würdest du dieses Jahr gern gemeinsam machen? | What would you enjoy doing together this year? |
| Q26 | S/F | Welche neue gemeinsame Erinnerung sollten wir in den nächsten Monaten schaffen? | What new shared memory should we create in the next few months? |
| Q27 | F | Welche Art von Moment zwischen uns fühlt sich für dich besonders nach Freundschaft an? | What kind of moment between us feels most like friendship to you? |
| Q28 | Q/S/F | Wie hat dich eine Freundschaft in deinem Leben verändert? | How has a friendship changed you? |
| Q29 | S/F | Was sollte die andere Person über deine heutige Version wissen, das früher noch nicht galt? | What should the other person know about who you are today that was not true before? |
| Q30 | F | Was würdest du gern von der anderen Person lernen – nicht unbedingt als Fähigkeit, sondern als Haltung? | What would you like to learn from the other person, not necessarily as a skill but as a way of approaching life? |
| Q31 | Q/S/F | Was sollten befreundete Menschen einander öfter fragen? | What should friends ask each other more often? |
| Q32 | S/F | Wie könnte ich in den nächsten Monaten besser für dich da sein, ohne etwas für dich zu entscheiden? | How could I show up for you better over the next few months without deciding anything for you? |
| Q33 | F | Welchen kleinen oder großen Erfolg sollten wir als Nächstes gemeinsam feiern? | What small or big success should we celebrate together next? |
| Q34 | S/F | Wofür wären wir in einem Jahr dankbar, wenn wir es jetzt gemeinsam planen? | What would we be grateful for a year from now if we planned it together today? |
| Q35 | S/F | Was hilft unserer Freundschaft, auch in vollen oder anstrengenden Zeiten Raum zu behalten? | What helps our friendship keep a place in our lives when things are busy or difficult? |
| Q36 | Q/F | Wofür möchtest du der anderen Person heute danken – und was sagt das über sie aus? | What would you like to thank the other person for today, and what does it say about who they are? |

### FRIENDS – recommended response cards

- After Q08 or Q33: **CELEBRATE** – „Freu dich kurz mit, bevor du deine eigene Geschichte erzählst.“ / “Take a moment to celebrate with them before sharing your own story.”
- After Q18: **FOLLOW UP** – „Frag nach einem konkreten Detail, das dir hilft, die Antwort besser zu verstehen.“ / “Ask for one specific detail that helps you understand the answer better.”
- After Q21 or Q24: **VALIDATE** – „Keine Lösung nötig. Zeig zuerst, dass du es gehört hast.“ / “No solution is needed. First, show that you heard them.”

### FRIENDS – Private Moment finale

Friends Standard and Full use the memory/celebration finale defined in [Private Moments (FR-005)](#private-moments-fr-005). Quick ends directly.

---

## 7. OLD FRIENDS

**Act arc:** DAMALS → DAZWISCHEN → WIEDER
**English act names:** THEN → IN BETWEEN → AGAIN
**Goal:** Reactivate a specific shared history while also getting to know the person as they are today—without forcing closeness, reconciliation, or any particular future.
**Duration:** Quick 15–20 min · Standard 25–40 min · Full 50–75 min
**Default:** Standard

### Act I – DAMALS / THEN

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q01 | Q/S/F | Was ist deine erste klare Erinnerung an uns? | What is your first clear memory of us? |
| Q02 | S/F | Welche einzelne gemeinsame Szene kannst du heute noch besonders deutlich vor dir sehen? | What single moment we shared can you still picture especially clearly? |
| Q03 | F | Welcher Ort, Gegenstand, Geruch oder Klang gehört für dich zu einer Erinnerung an uns? | What place, object, smell, or sound belongs to one of your memories of us? |
| Q04 | Q/S/F | An welches kleine gemeinsame Detail habe ich vielleicht nicht mehr gedacht? | What small detail from something we shared might I have forgotten? |
| Q05 | S/F | Bei welchem konkreten Moment haben wir einmal besonders ehrlich miteinander gelacht? | During what specific moment did we once laugh most genuinely together? |
| Q06 | F | Welcher damals gewöhnliche Moment zwischen uns fühlt sich rückblickend bedeutungsvoll an? | What ordinary moment between us feels meaningful in hindsight? |
| Q07 | Q/S/F | Welche frühere Version von mir ist dir besonders im Gedächtnis geblieben? | What earlier version of me has stayed in your memory most clearly? |
| Q08 | S/F | Was hat dir unsere Freundschaft in dieser Phase deines Lebens gegeben? | What did our friendship give you during that phase of your life? |
| Q09 | F | Welche unserer alten Geschichten bedeutet dir heute etwas anderes als damals? | Which story from our past means something different to you now than it did then? |
| Q10 | Q/S/F | Wofür möchtest du mir aus dieser Zeit danken – und welche Eigenschaft von mir wurde darin sichtbar? | What would you like to thank me for from that time, and what quality of mine did it reveal? |
| Q11 | S/F | Welche konkrete Erinnerung zeigt, wann wir als Team besonders gut funktioniert haben? | What specific memory shows a time when we worked especially well as a team? |
| Q12 | F | Welche gemeinsame Erinnerung erzählen wir unterschiedlich – und was ist an beiden Versionen interessant? | Which shared memory do we tell differently, and what is interesting about both versions? |

### Act II – DAZWISCHEN / IN BETWEEN

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q13 | Q/S/F | Was hat sich in deinem Leben seit der Zeit, aus der ihr euch kennt, am stärksten verändert? | What has changed most in your life since the period when the two of you first knew each other? |
| Q14 | S/F | Welcher Teil deines heutigen Lebens passt am wenigsten zu dem Bild, das ich früher von dir hatte? | What part of your life today fits least with the picture I used to have of you? |
| Q15 | F | Welche Entscheidung aus der Zeit dazwischen hat die heutige Version von dir besonders geprägt? | What decision from the time in between most shaped who you are today? |
| Q16 | Q/S/F | Was wünschst du dir, dass ich über die Zeit dazwischen verstehe? | What would you like me to understand about the time in between? |
| Q17 | S/F | Was hast du in dieser Zeit über dich gelernt, das du früher noch nicht wissen konntest? | What did you learn about yourself during that time that you could not have known before? |
| Q18 | F | Was war an unserer Distanz leichter oder schwerer, als du erwartet hattest? | What about the distance between us was easier or harder than you expected? |
| Q19 | Q/S/F | Wie hast du die Zeit mit weniger oder anderem Kontakt erlebt – falls das auf euch zutrifft? | How did you experience the period of less or different contact, if that applies to the two of you? |
| Q20 | S/F | Gibt es etwas aus der Zeit dazwischen, das du erzählen möchtest, ohne dass es erklärt oder gelöst werden muss? | Is there something from the time in between you would like to share without needing it to be explained or solved? |
| Q21 | F | Welche alte Annahme über die andere Person bist du heute bereit zu überprüfen? | What old assumption about the other person are you ready to reconsider today? |
| Q22 | Q/S/F | Gibt es etwas, das sich zwischen euch heute mühelos anfühlt – und wenn ja, was? | Is there anything between the two of you that feels effortless today—and if so, what? |
| Q23 | S/F | Wie hat sich die Art von Unterstützung verändert, die dir heute wirklich hilft? | How has the kind of support that genuinely helps you changed over time? |
| Q24 | F | Welcher Teil deines heutigen Lebens würde mich vermutlich am meisten überraschen? | What part of your life today would probably surprise me most? |

### Act III – WIEDER / AGAIN

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q25 | Q/S/F | Welche Form von Kontakt würde sich heute für dich stimmig anfühlen – ohne etwas für später festlegen zu müssen? | What kind of contact would feel right to you today without deciding anything about the future? |
| Q26 | S/F | Welche alte Tradition sollten wir behalten, verändern oder bewusst ruhen lassen? | What old tradition should we keep, adapt, or consciously leave at rest? |
| Q27 | F | Welche Gewohnheit oder Erwartung aus früher darf dort bleiben? | What habit or expectation from the past is allowed to stay there? |
| Q28 | F | Welche gemeinsame Tradition wäre schön wiederzubeleben oder neu zu erfinden? | What shared tradition would be good to revive or reinvent? |
| Q29 | S/F | Über welches Thema von heute wärst du neugierig, ohne dass daraus ein schwieriges Gespräch werden muss? | What present-day topic are you curious to discuss without it having to become a difficult conversation? |
| Q30 | F | Was brauchst du heute, um dich von mir als die Person gesehen zu fühlen, die du inzwischen bist? | What do you need today to feel seen by me as the person you have become? |
| Q31 | Q/S/F | Gibt es ein Gespräch, für das heute mehr Raum wäre als früher? | Is there a conversation that has more room to happen today than it did before? |
| Q32 | S/F | Falls wir wieder mehr Kontakt haben: Woran würden wir merken, dass er für uns beide gut ist? | If we have more contact again, what would show us that it is good for both of us? |
| Q33 | F | Welche Grenze oder Erwartung sollten wir klar aussprechen, statt sie aus früher abzuleiten? | What boundary or expectation should we say out loud instead of carrying it over from the past? |
| Q34 | Q/S/F | Wenn wir eine echte neue Erinnerung schaffen: Welche dürfte es sein? | If we create a genuine new memory together, what would you like it to be? |
| Q35 | S/F | Welche Seite der anderen Person möchtest du heute neu kennenlernen? | What side of the other person would you like to get to know again as they are today? |
| Q36 | Q/S/F | Welche Eigenschaft schätzt du an der Person vor dir heute – unabhängig von eurer gemeinsamen Geschichte? | What quality do you appreciate in the person in front of you today, apart from your shared history? |

### OLD FRIENDS – recommended response cards

- After Q02 or Q04: **FOLLOW UP** – „Frag nach einem einzigen Detail aus dieser Szene.“ / “Ask for one detail from that moment.”
- After Q12: **REFLECT** – „Sucht nicht nach der richtigen Version. Benennt, was jede Erinnerung für euch bedeutet.“ / “Do not look for the correct version. Name what each memory means to you.”
- After Q20 or Q30: **VALIDATE** – „Du musst nichts rechtfertigen oder reparieren. Zeig zuerst, dass du es gehört hast.“ / “You do not need to justify or repair anything. First, show that you heard them.”
- After Q34: **FOLLOW UP** – „Was daran wäre dir wichtig?“ / “What about that would matter to you?”

### OLD FRIENDS – Private Moment

Old Friends Standard uses the immediate detail/meaning moment defined in [Private Moments (FR-005)](#private-moments-fr-005). Quick and Full have no Private Moment.

---

## 8. DEEP

**Act arc:** DARUNTER → WAHRHEIT → MITNEHMEN
**English act names:** BENEATH → TRUTH → CARRY FORWARD
**Goal:** A deliberately intense conversation about identity, meaning, emotions, feeling understood, and hope—without equating depth with trauma or claiming therapeutic effects.
**Duration:** Standard 30–45 min · Full 60–90 min
**Default:** Standard; no Quick route

**Routes:** No Quick route. `S/F` forms the curated Standard route with 24 questions; combined with `F`, it forms Full with 36 questions.

### Act I – DARUNTER / BENEATH

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q01 | S/F | Welche innere Veränderung an dir macht dich in letzter Zeit still stolz – und woran merkst du sie? | What inner change in yourself has made you quietly proud lately—and how do you notice it? |
| Q02 | S/F | Welche Seite von dir wird selten gesehen, obwohl sie eigentlich kein Geheimnis ist? | What side of you is rarely seen even though it is not really a secret? |
| Q03 | F | Welche konkrete Erfahrung kommt deinem Gefühl von Zuhause am nächsten? | What specific experience comes closest to your feeling of home? |
| Q04 | S/F | Welche Wahrheit über dich selbst hast du erst spät verstanden? | What truth about yourself did you only come to understand later in life? |
| Q05 | S/F | Welche Rolle spielst du oft, wenn du unsicher bist? | What role do you tend to play when you feel uncertain? |
| Q06 | F | In welchem Umfeld fühlst du dich deiner eigenen Art zu sein am nächsten? | In what setting do you feel most like yourself? |
| Q07 | F | Welche Emotion kannst du leicht zeigen, und welche hältst du eher zurück? | Which emotion can you show easily, and which one do you tend to hold back? |
| Q08 | S/F | Welche Überzeugung über dich hast du hinter dir gelassen? | What belief about yourself have you left behind? |
| Q09 | S/F | Wo erlebst du Zugehörigkeit, ohne etwas leisten oder darstellen zu müssen? | Where do you experience belonging without having to achieve or perform anything? |
| Q10 | F | Welchen Wert aus deiner Herkunft oder Prägung hast du bewusst behalten? | What value from your background or upbringing have you consciously kept? |
| Q11 | S/F | Was schützt du manchmal mit Humor oder Schweigen? | What do you sometimes protect with humor or silence? |
| Q12 | S/F | Welche Hoffnung beeinflusst gerade mehr deiner Entscheidungen, als andere vermutlich merken? | What hope is shaping more of your decisions right now than other people probably realize? |

### Act II – WAHRHEIT / TRUTH

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q13 | S/F | Wann hast du dich zuletzt wirklich verstanden gefühlt – und was hat die andere Person konkret getan? | When did you last feel truly understood, and what did the other person specifically do? |
| Q14 | S/F | Welches Bedürfnis fällt dir schwer auszusprechen? | What need do you find difficult to express? |
| Q15 | S/F | Welches ehrliche Kompliment kannst du nur schwer annehmen – und warum? | What sincere compliment do you find hard to accept, and why? |
| Q16 | S/F | Was wird an dir von nahestehenden Menschen häufig missverstanden? | What do people close to you often misunderstand about you? |
| Q17 | F | Welche Veränderung oder welcher Verlust hat dich stark geprägt? | What change or loss has had a powerful influence on who you are? |
| Q18 | F | Welche schwierige Emotion kannst du besser aushalten, wenn jemand auf eine bestimmte Weise bei dir bleibt? | What difficult emotion becomes easier to sit with when someone stays with you in a particular way? |
| Q19 | F | Wofür lernst du gerade, dir selbst zu vergeben? | What are you learning to forgive yourself for? |
| Q20 | S/F | Bei welchem Thema wünschst du dir, dass Menschen erst zuhören, bevor sie nach einer Lösung suchen? | On what topic do you wish people would listen before looking for a solution? |
| Q21 | S/F | Welche schwierige Entscheidung macht dich heute stolz auf dich? | What difficult decision makes you proud of yourself today? |
| Q22 | S/F | Zwischen welchen zwei wichtigen Werten entsteht in deinem Leben manchmal Spannung? | Which two important values sometimes come into tension in your life? |
| Q23 | F | Welche Frage über dein Leben beschäftigt dich gerade, ohne eine schnelle Antwort zu brauchen? | What question about your life is on your mind right now without needing a quick answer? |
| Q24 | S/F | Was bedeutet Unterstützung für dich, wenn es keine Lösung gibt? | What does support mean to you when there is no solution? |

### Act III – MITNEHMEN / CARRY FORWARD

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q25 | S/F | Welche Wahrheit möchtest du in deinem Leben konsequenter leben? | What truth would you like to live by more consistently? |
| Q26 | S/F | Welche Hoffnung möchtest du schützen, auch wenn du ihren Ausgang nicht kontrollieren kannst? | What hope would you like to protect even though you cannot control how it turns out? |
| Q27 | F | Wovon soll dein nächstes Lebenskapitel mehr enthalten? | What would you like more of in the next chapter of your life? |
| Q28 | S/F | Woran sollen sich Menschen erinnern, wenn sie an dich denken? | What would you like people to remember when they think of you? |
| Q29 | S/F | Über welchen Teil deines Lebens würdest du gern öfter sprechen, wenn jemand wirklich neugierig zuhört? | What part of your life would you like to talk about more often if someone listened with genuine curiosity? |
| Q30 | F | Was bedeutet Erfolg für dich, wenn niemand anderes ihn bewertet? | What does success mean to you when nobody else is judging it? |
| Q31 | S/F | Was möchtest du über dich aussprechen dürfen, ohne dass jemand es sofort lösen oder einordnen muss? | What would you like to be able to say about yourself without anyone immediately trying to solve or categorize it? |
| Q32 | S/F | Womit könntest du heute beginnen, wofür dir dein zukünftiges Ich einmal dankbar wäre? | What could you start today that your future self might thank you for? |
| Q33 | F | Welchen Teil deiner Identität möchtest du in Zukunft bewusster nähren? | What part of your identity would you like to nurture more intentionally in the future? |
| Q34 | S/F | Wie kann die andere Person nach diesem Gespräch gut für dich da sein – durch Zuhören, Nachfragen, Ruhe oder etwas anderes? | After this conversation, how can the other person best be there for you: through listening, questions, quiet, or something else? |
| Q35 | F | Welchen Satz oder Gedanken möchtest du aus diesem Gespräch mitnehmen? | What sentence or thought would you like to carry with you from this conversation? |
| Q36 | S/F | Was möchtest du dir selbst nach diesem Gespräch mit etwas mehr Freundlichkeit zugestehen? | After this conversation, what would you like to allow yourself with a little more kindness? |

### DEEP – recommended response cards

- After Q01 or Q21: **CELEBRATE** – „Würdige kurz, was der Person daran wichtig ist.“ / “Take a moment to acknowledge what matters to the person about it.”
- After Q13: **FOLLOW UP** – „Frag, welches konkrete Verhalten den Unterschied gemacht hat.“ / “Ask what specific behavior made the difference.”
- After Q17, Q19 or Q24: **VALIDATE** – „Keine Lösung und keine Bewertung. Zeig zuerst, dass du es gehört hast.“ / “No solution and no judgment. First, show that you heard them.”
- After Q34: **REFLECT** – „Wenn du möchtest: Sag in einem Satz, was du verstanden hast. Daraus entsteht keine Zusage.“ / “If you like, say in one sentence what you understood. This creates no commitment.”

### DEEP – Private Moment

Deep Standard and Full use the listening-intention moment defined in [Private Moments (FR-005)](#private-moments-fr-005). Deep has no Quick route.

---

## 9. CHAOS

**Goal:** Shared invention, affiliative laughter, novelty, and unexpectedly genuine depth. CHAOS assumes neither romance nor any particular relationship type. No one is exposed or ridiculed; there are no public tasks, humiliations, body judgments, or jokes at the other person’s expense.
**Duration:** Quick 8–12 min · Standard 18–25 min · Full 30–40 min
**Default:** Quick

### Act I – SELTSAM / WEIRD

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q01 | Q/S/F | Ihr eröffnet gemeinsam ein völlig unnötiges Museum. Was stellt es aus? | You’re opening a completely unnecessary museum together. What does it display? |
| Q02 | Q/S/F | Welche völlig unwichtige Meinung würdest du bis zum Äußersten verteidigen? | What utterly unimportant opinion would you defend forever? |
| Q03 | Q/S/F | Mit welcher fiktiven Figur würdest du für 24 Stunden das Leben tauschen – und was würdest du zuerst tun? | Which fictional character would you swap lives with for 24 hours—and what would you do first? |
| Q04 | Q/S/F | Welche winzige, seltsame Sache macht deinen Alltag unverhältnismäßig besser? | What tiny, oddly specific thing makes your everyday life disproportionately better? |
| Q05 | S/F | Welcher Song sollte laufen, wenn du völlig übertrieben einen Raum betrittst? | What song should play when you make an outrageously dramatic entrance? |
| Q06 | S/F | Welche scheinbar nutzlose Superkraft hättest du gern – und wie würdest du sie doch sinnvoll einsetzen? | What seemingly useless superpower would you want—and how would you put it to surprisingly good use? |
| Q07 | S/F | Erfindet gemeinsam eine harmlose Verschwörungstheorie darüber, warum einzelne Socken verschwinden. | Invent a harmless conspiracy theory together about why single socks disappear. |
| Q08 | S/F | Erfindet einen Feiertag für etwas völlig Alltägliches. Was wird gefeiert und wie? | Invent a holiday for something completely ordinary. What does it celebrate, and how? |
| Q09 | F | Welches Tier sollte die Menschheit bei einem Treffen mit Außerirdischen vertreten – und was wäre sein erster Satz? | Which animal should represent humanity at a meeting with aliens—and what would its opening line be? |
| Q10 | F | Ihr eröffnet ein Restaurant mit einer völlig absurden Regel. Wie lautet sie, und warum kommen die Leute trotzdem? | You’re opening a restaurant with one completely absurd rule. What is it, and why do people still come? |
| Q11 | F | Welcher Alltagsgegenstand verdient ein dramatisches Biopic – und wie heißt der Film? | Which everyday object deserves a dramatic biopic—and what is the film called? |
| Q12 | F | Welche absurd spezifische Auszeichnung würdest du dir selbst verleihen? | What absurdly specific award would you give yourself? |

### Act II – MUTIG / BOLD

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q13 | Q/S/F | Welche chaotische Entscheidung war im Nachhinein genau richtig? | What chaotic decision turned out to be exactly right? |
| Q14 | Q/S/F | Welche Regel des Erwachsenseins würdest du sofort abschaffen? | What rule of adulthood would you abolish immediately? |
| Q15 | Q/S/F | Welches kleine, überschaubare Risiko möchtest du demnächst eingehen? | What small, manageable risk would you like to take soon? |
| Q16 | Q/S/F | Erfindet gemeinsam das absurdeste Unternehmen, das überraschend funktionieren könnte. | Invent the most absurd business together that might actually work. |
| Q17 | S/F | Welche harmlose Fähigkeit von dir verdient viel mehr Fanfare, als sie normalerweise bekommt? | What harmless skill of yours deserves far more fanfare than it usually gets? |
| Q18 | S/F | Ihr habt spontan drei freie Stunden und dürft nichts vorbereiten. Welches Mini-Abenteuer beginnt jetzt? | You suddenly have three free hours and cannot prepare anything. What mini-adventure starts now? |
| Q19 | S/F | Welche gesellschaftliche Konvention würdest du gern einen Tag lang ignorieren, wenn niemand dadurch zu Schaden käme? | What social convention would you like to ignore for one day if no one could be harmed by it? |
| Q20 | S/F | Welche verspielte Seite von dir kommt erst zum Vorschein, wenn du dich wohlfühlst? | What playful side of you only appears when you feel comfortable? |
| Q21 | F | Wie müsste dich jemand einladen, damit du bei einer herrlich albernen Idee sofort mitmachst? | How would someone have to invite you for you to join a delightfully silly idea straight away? |
| Q22 | F | Welches unerwartete Kompliment hat dich gleichzeitig zum Lachen gebracht und wirklich erreicht? | What unexpected compliment both made you laugh and genuinely landed with you? |
| Q23 | F | Welchen harmlosen Plot-Twist würdest du dir für den nächsten Monat wünschen? | What harmless plot twist would you like the next month to bring? |
| Q24 | F | Plant ein tatsächlich machbares Mini-Abenteuer mit dem, was euch zur Verfügung steht – ohne Mutprobe und ohne jemanden bloßzustellen. | Plan a genuinely doable mini-adventure using what is available to you—with no dares and no embarrassing anyone. |

### Act III – ÜBERRASCHEND ECHT / SURPRISINGLY REAL

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q25 | Q/S/F | Wofür wünschst du dir gerade mehr Erlaubnis von dir selbst? | What do you wish you gave yourself more permission to do right now? |
| Q26 | Q/S/F | Welche kurze Nachricht würdest du deinem Ich in fünf Jahren schicken? | What short message would you send to yourself five years from now? |
| Q27 | S/F | Was würdest du ausprobieren, wenn Peinlichkeit für einen Tag nicht existieren würde? | What would you try if embarrassment did not exist for one day? |
| Q28 | Q/S/F | Welcher gemeinsame Plan ist so albern, dass er vielleicht großartig wäre? | What could you do together that sounds so silly it might be brilliant? |
| Q29 | S/F | Welche Begeisterung von dir wird oft unterschätzt oder missverstanden? | What enthusiasm of yours is often underestimated or misunderstood? |
| Q30 | S/F | Welche Form von Spiel oder Albernheit hilft dir, wieder bei dir anzukommen? | What kind of play or silliness helps you feel like yourself again? |
| Q31 | Q/S/F | Wann hat gemeinsames Lachen dir zuletzt das Gefühl gegeben, jemandem wirklich nah zu sein? | When did laughing with someone last make you feel genuinely close to them? |
| Q32 | S/F | Welche Seite von dir dürfte im Alltag mehr Raum bekommen? | What side of you deserves more room in your everyday life? |
| Q33 | F | Wie zeigst du durch Humor, dass dir ein Mensch wichtig ist? | How do you use humour to show someone that they matter to you? |
| Q34 | F | Welche Antwort aus diesem Gespräch würdest du gern noch genauer hören? | Which answer from this conversation would you like to hear more about? |
| Q35 | F | Woran würdest du dich von diesem Gespräch gern erinnern? | What would you like to remember about this conversation? |
| Q36 | F | Erfindet ein kleines Ritual, mit dem ihr euch eure Neugier aufeinander bewahren könnt. | Invent a small ritual that could help you stay curious about each other. |

### Question 37

Chaos Standard and Full use the two private Q16 constraints defined in [Private Moments (FR-005)](#private-moments-fr-005); they are discarded when Q16 ends and do not change the ordinary finale. Q16 keeps its ordinary joint instruction but does not add the `BOTH` presentation mechanic on those routes. Quick has no Private Moment and may retain `BOTH`; it ends directly.

---

## 10. LATE NIGHT (18+)

**Goal:** Explicit sexual and intimate conversation for two voluntarily participating adults. The pack supports good communication about attraction, desire, preferences, fantasies, boundaries, safer sex, and aftercare—without asking anyone to act or assuming any particular experience, relationship, orientation, gender identity, body, or exclusivity.
**Duration:** Quick 15–20 min · Standard 25–40 min · Full 40–60 min
**Default:** Standard

### Required notice before the pack

**DE**

> Nur für Erwachsene ab 18 Jahren. Beide Personen nehmen freiwillig teil und können jede Frage überspringen oder das Spiel jederzeit beenden. Eine Antwort beschreibt nur Gedanken, Gefühle oder Vorlieben. Sie ist niemals Zustimmung zu einer Handlung. Zustimmung muss außerhalb des Spiels konkret, freiwillig, informiert und jederzeit widerrufbar eingeholt werden.

**EN**

> For adults aged 18 and over only. Both people are taking part voluntarily and may skip any question or end the game at any time. An answer only describes thoughts, feelings or preferences. It is never consent to an action. Consent must be sought outside the game and must be specific, voluntary, informed and withdrawable at any time.

### Editorial game rules

- Each person separately confirms that they are 18 or older and participating voluntarily before any question is shown.
- Either person may pass on each question individually without explanation; passing must not create pressure to justify the choice.
- Answers are always sequential. `PREDICT` and `NO THINKING` are completely disabled for this pack.
- `BOTH` is also disabled for boundaries, consent, safer sex, fantasies, and physical needs; nobody answers simultaneously or on another person’s behalf.
- There are no touch tasks, dares, or prompts to act on anything discussed.
- The Quick route is a self-contained safe progression: four questions about atmosphere, four about wishes, and four about trust. It is not a random sample of explicit questions.
- Answers may draw on personal experience, be hypothetical, or simply be “not relevant to me.”
- The duration estimate is only used when selecting a route. LATE NIGHT has no visible countdown or time pressure during play.

### Act I – ATMOSPHÄRE / ATMOSPHERE

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q01 | Q/S/F | Woran merkst du, dass ein Gespräch für dich flirtend oder erotisch wird? | What tells you that a conversation is becoming flirtatious or erotic for you? |
| Q02 | Q/S/F | Welche Art von Blick, Stimme, Worten oder Bewegung kann auf dich besonders anziehend wirken? | What kind of gaze, voice, words or movement can feel especially attractive to you? |
| Q03 | Q/S/F | Welche Umgebung hilft dir, dich offen für erotische Stimmung zu fühlen? | What kind of setting helps you feel open to an erotic mood? |
| Q04 | Q/S/F | Wie zeigst du Interesse an mehr Nähe, ohne vorauszusetzen, dass die andere Person dasselbe möchte? | How do you show interest in more intimacy without assuming the other person wants the same thing? |
| Q05 | S/F | Welche Art von erotischem Kompliment fühlt sich für dich gut an – und welche eher nicht? | What kind of erotic compliment feels good to you—and what kind tends not to? |
| Q06 | S/F | Welches Tempo fühlt sich beim Flirten oder beim Aufbau von Intimität für dich angenehm an? | What pace feels comfortable to you when flirting or building intimacy? |
| Q07 | S/F | Was hilft dir, dich sicher genug für ein ausdrücklich sexuelles Gespräch zu fühlen? | What helps you feel safe enough to begin an explicitly sexual conversation? |
| Q08 | S/F | Welche Stimmung passt bei erotischen Gesprächen zu dir: verspielt, direkt, zärtlich, ernst – oder etwas anderes? | What tone suits you in erotic conversations: playful, direct, tender, serious—or something else? |
| Q09 | F | Welche nichtsexuelle Form von Nähe kann bei dir Lust wecken – falls es eine gibt? | What non-sexual form of closeness can awaken desire in you, if any? |
| Q10 | F | Wie soll jemand prüfen, ob Flirten für dich gerade willkommen ist? | How would you like someone to check whether flirting is welcome for you in that moment? |
| Q11 | F | Wodurch kannst du dich begehrt fühlen, ohne dich unter Druck gesetzt zu fühlen? | What can make you feel desired without making you feel pressured? |
| Q12 | F | Was hilft dir, während wachsender Intimität präsent und mit dir selbst verbunden zu bleiben? | What helps you stay present and connected to yourself as intimacy builds? |

### Renewed opt-in before Act II

Before explicit questions about touch, sex, fantasies, and kinks appear, both people confirm again and separately:

- **DE:** „Ich möchte freiwillig mit expliziteren Gesprächsfragen fortfahren. Ich kann jede Frage überspringen oder hier beenden.“
- **EN:** “I freely choose to continue with more explicit conversation prompts. I may skip any question or end here.”

**Hier beenden / End here** has equal prominence and is not visually subordinate. If active consent is not given twice, the pack ends neutrally.

### Act II – WUNSCH / DESIRE

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q13 | Q/S/F | Welche Art erotischer Berührung könnte sich für dich gut anfühlen – wenn überhaupt und nur wenn du sie ausdrücklich möchtest? | What kind of erotic touch might feel good to you—if any, and only when you explicitly want it? |
| Q14 | Q/S/F | Wie möchtest du, dass sexuelle Nähe initiiert wird? | How do you like sexual intimacy to be initiated? |
| Q15 | Q/S/F | Welche Worte oder Laute könnten sich in einer sexuellen Situation für dich gut anfühlen – und welche eher nicht? | What words or sounds might feel good to you in a sexual situation—and which might not? |
| Q16 | Q/S/F | Welche Fantasie kannst du teilen, ohne dass daraus eine Erwartung für heute oder später entstehen soll? | What fantasy could you share without it creating any expectation for today or later? |
| Q17 | S/F | Welche Rolle spielen Vorfreude oder spielerisches Hinauszögern für deine Lust? | What role do anticipation or playful delay play in your desire? |
| Q18 | S/F | Welche Rolle spielen Spielzeuge, erotische Medien oder andere Hilfsmittel in deiner Sexualität – wenn überhaupt? | What role do toys, erotic media or other aids play in your sexuality, if any? |
| Q19 | S/F | Was kann Sex für dich erfüllend machen, auch unabhängig von einem Orgasmus? | What can make sex fulfilling for you, independently of orgasm? |
| Q20 | S/F | Gibt es eine erotische Idee oder einen Kink, über den du neugierig sprechen möchtest, ohne heute etwas darüber entscheiden zu müssen? | Is there an erotic idea or kink you are curious to talk about without having to decide anything about it today? |
| Q21 | F | Wie würdest du dich damit fühlen, in einer sexuellen Situation konkrete Wünsche oder Hinweise zu geben oder zu bekommen? | How might you feel about giving or receiving specific requests or guidance in a sexual situation? |
| Q22 | F | Welche Rolle spielen Tempo, Wiederholung, Abwechslung oder Pausen für dein sexuelles Erleben? | What role do pace, repetition, variety, or pauses play in your sexual experience? |
| Q23 | F | Wie zeigst du gern, dass sich etwas besonders gut anfühlt? | How do you like to show that something feels especially good? |
| Q24 | F | Was würde es dir leichter machen, darüber zu sprechen, was du in einer sexuellen Situation häufiger, seltener oder anders erleben möchtest – falls das für dich relevant ist? | What would make it easier to talk about something you might want more often, less often or differently in a sexual situation, if that is relevant to you? |

### Act III – VERTRAUEN / TRUST

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q25 | Q/S/F | Woran merkst du in dir selbst ein klares Ja, ein Vielleicht oder ein Nein? | How do you recognise a clear yes, maybe or no within yourself? |
| Q26 | Q/S/F | Welche eindeutigen Worte oder bewusst vereinbarten Zeichen möchtest du für Zustimmung, Pause und Stopp verwenden? | What clear words or deliberately agreed signals would you like to use for consent, pause, and stop? |
| Q27 | Q/S/F | Wenn ein Signal nicht eindeutig ist: Wie soll die andere Person pausieren und nachfragen? | When a signal is unclear, how should the other person pause and check in? |
| Q28 | Q/S/F | Was brauchst du nach einem intensiven intimen Moment: Nähe, Abstand, Berührung, Ruhe oder etwas anderes? | What do you need after an intense intimate moment: closeness, space, touch, quiet or something else? |
| Q29 | S/F | Was hilft dir, ein Nein oder einen Sinneswandel leicht auszusprechen und gut angenommen zu wissen? | What helps you voice a no or a change of mind easily and trust that it will be received well? |
| Q30 | F | Welche Grenze, Verhütung oder Schutzmaßnahme darf niemals bloß angenommen werden? | What boundary, contraception or protection measure must never simply be assumed? |
| Q31 | S/F | Welche Gespräche über Tests, Barrieren, Verhütung oder andere Schutzmaßnahmen brauchst du, bevor sich sexuelle Nähe sicher genug anfühlt? | What conversations about testing, barriers, contraception or other protection do you need before sexual intimacy feels safe enough? |
| Q32 | S/F | Wie möchtest du, dass erneut nach Zustimmung gefragt wird, wenn sich eine sexuelle Aktivität verändert oder intensiviert? | How would you like consent to be checked again when a sexual activity changes or becomes more intense? |
| Q33 | F | Welche Absprachen zu Exklusivität, weiteren Kontakten oder Privatsphäre sind für dich wichtig – falls das für eure Situation relevant ist? | What agreements about exclusivity, other partners or privacy matter to you, if they are relevant to your situation? |
| Q34 | S/F | Gibt es körperliche Bedürfnisse, Empfindlichkeiten oder Zugänglichkeitsaspekte, über die du vor Intimität sprechen möchtest? | Are there any physical needs, sensitivities or accessibility considerations you would want to discuss before intimacy? |
| Q35 | F | Wie wünschst du dir einen Check-in am nächsten Tag – wenn überhaupt? | How would you like to check in the next day, if at all? |
| Q36 | F | Welche eine Sache soll dein Gegenüber aus diesem Gespräch mitnehmen, ohne daraus eine Erwartung für heute oder später abzuleiten? | What is one thing you want the other person to take from this conversation without turning it into an expectation for today or later? |

### Question 37

Late Night sets `privateMoment: 'none'`, never enters a saved-question or secret-task flow, and never renders generic Question 37. All routes use the independent entry and Act II gates plus the direct safety finale defined in [Private Moments (FR-005)](#private-moments-fr-005).

### Final editorial checks for LATE NIGHT

- No question assumes that the two people have had, are having, or will have sex with each other.
- No question assumes gender, orientation, anatomy, ability to orgasm, experience, monogamy, or a current relationship.
- No question asks about assault, trauma, number of previous partners, or a “worst” sexual experience.
- Fantasies and kinks are treated as conversation topics, never as suggestions or implied offers.
- Depending on the situation, safer sex includes testing, barriers, contraception, other protective measures, relevant agreements, and accessibility; pregnancy risk is not assumed universally.
- Every question remains individually passable even after an earlier positive answer. Consent is not inferred from earlier answers, body language, or starting the pack.
- A separate Austrian youth-protection, media-law, and privacy review remains required before public release; this question catalog is not legal approval.

---

## 11. ROAD TRIP

**Editorial status:** Implemented; physical-device and moderated-session validation remains.
**Goal:** A warm, playful conversation about the present journey, travel memories, preferences, and future possibilities for two people travelling together, regardless of relationship type.
**Acts:** UNTERWEGS → GESCHICHTEN → HORIZONT
**Duration:** Quick 15–20 min · Standard 30–45 min · Full 50–70 min
**Default:** Quick
**Private moment:** `none` on every route

The pack does not assume romance, friendship, family, car ownership, international travel, a passport, a particular budget, or unrestricted mobility.

### Mandatory road-safety contract

The initial release is available only in a parked vehicle or a setting in which neither participant is responsible for driving. A driver never handles or reads the phone. This conservative restriction may be revisited only through a dedicated safety design and real-world validation; no route is described as distraction-free or certified safe.

**DE pre-start copy**

> Spielt diese Version nur im geparkten Fahrzeug oder wenn keine teilnehmende Person fährt. Wer fährt, bedient oder liest niemals das Smartphone. Unterbrecht das Spiel sofort, sobald die Umgebung Aufmerksamkeit verlangt. Ihr könnt jederzeit ohne Begründung pausieren oder aufhören.

**EN pre-start copy**

> Play this release only in a parked vehicle or when neither participant is driving. A driver must never handle or read the phone. Pause immediately whenever the surroundings require attention. Either of you may pause or stop at any time without giving a reason.

The implementation contains no moving-vehicle route, countdown, prediction, simultaneous-answer action, eye-contact task, device handoff, surprise audio, automatic progress, or task involving navigation, music, photos, maps, or typing.

### Curated routes

- **Quick:** Q01–Q04 · Q13–Q16 · Q25–Q28
- **Standard:** Q01–Q08 · Q13–Q20 · Q25–Q32
- **Full:** Q01–Q36

### Act I – UNTERWEGS / ON THE ROAD

**DE:** „Kommt leicht ins Gespräch: über das Unterwegssein, kleine Vorlieben und spielerische Ideen. Niemand muss dafür etwas suchen, anschauen oder bedienen.“

**EN:** “Ease into the conversation through the journey, small preferences, and playful ideas. Nobody needs to search for, look at, or operate anything.”

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q01 | Q/S/F | Welcher kleine Teil des Unterwegsseins tut dir heute überraschend gut? | What small part of being on the road feels unexpectedly good today? |
| Q02 | Q/S/F | Wenn diese Fahrt einen Soundtrack hätte: Welche Stimmung müsste er einfangen? | If this journey had a soundtrack, what mood would it need to capture? |
| Q03 | Q/S/F | Welche Art von Zwischenstopp macht selbst eine gewöhnliche Strecke für dich besonders? | What kind of stop can make even an ordinary route feel special to you? |
| Q04 | Q/S/F | Wenn diese Fahrt einen Filmtitel hätte, wie würde er lauten? | If this journey had a movie title, what would it be? |
| Q05 | S/F | Welche Kleinigkeit trägst du gern dazu bei, damit gemeinsames Unterwegssein angenehm wird? | What small thing do you like to contribute to make travelling together enjoyable? |
| Q06 | S/F | Was brauchst du unterwegs eher: Gespräche, Musik, Ruhe, Beobachten – oder eine Mischung daraus? | What do you tend to need on a journey: conversation, music, quiet, watching the world go by—or a mix? |
| Q07 | S/F | Wenn diese Fahrt eine Komödie wäre: Welche harmlose Nebenhandlung würde darin vorkommen? | If this journey were a comedy, what harmless subplot would it include? |
| Q08 | S/F | Welche unscheinbare Sache macht das Unterwegssein für dich spürbar angenehmer? | What easily overlooked thing makes being on the road noticeably better for you? |
| Q09 | F | Welche Landschaft oder Art von Umgebung versetzt dich in Reisestimmung – auch ganz in der Nähe? | What kind of landscape or setting puts you in a travelling mood, even close to home? |
| Q10 | F | Welche völlig unnötige Komfortfunktion dürfte in deinem erfundenen Reisefahrzeug nicht fehlen? | What completely unnecessary comfort feature would your imaginary travel vehicle need? |
| Q11 | F | Wenn diese Fahrt eine Postkarte wäre: Welcher eine Satz stünde auf der Rückseite? | If this journey were a postcard, what one sentence would be written on the back? |
| Q12 | F | Welchen unspektakulären Moment am Unterwegssein magst du besonders gern? | What unremarkable moment of a journey do you especially enjoy? |

### Act II – GESCHICHTEN / STORIES

**DE:** „Tauscht konkrete Erinnerungen und Reisegewohnheiten aus. Eine gute Geschichte darf klein sein; jede Frage darf warten.“

**EN:** “Share specific memories and travel habits. A good story can be small, and every question can wait.”

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q13 | Q/S/F | Welche konkrete Erinnerung an eine Reise oder einen Ausflug bringt dich sofort zum Lächeln? | What specific memory from a journey or outing makes you smile straight away? |
| Q14 | Q/S/F | Wann hat ein ungeplanter Moment eine Fahrt oder einen Ausflug besser gemacht als der ursprüngliche Plan? | When did an unplanned moment make a journey or outing better than the original plan? |
| Q15 | Q/S/F | Was hast du unterwegs einmal über dich gelernt, das dir vorher nicht so klar war? | What did you once learn about yourself while travelling that had not been so clear before? |
| Q16 | Q/S/F | Woran merkst du unterwegs, dass du eine Pause, Ruhe oder einen Planwechsel brauchst? | How do you notice that you need a break, some quiet, or a change of plan while travelling? |
| Q17 | S/F | Welche Reiseerinnerung ist für dich vor allem wegen eines Menschen wertvoll? | What travel memory matters to you mainly because of a person who was part of it? |
| Q18 | S/F | Welche Entscheidung triffst du unterwegs gern selbst, und welche gibst du lieber ab? | What decision do you like making yourself on a journey, and what would you rather leave to someone else? |
| Q19 | S/F | Wann hat dir jemand unterwegs das Gefühl gegeben, gut aufgehoben zu sein – und was hat die Person konkret getan? | When did someone make you feel well looked after while travelling, and what did they specifically do? |
| Q20 | S/F | Welche kleine Reisegewohnheit hast du von jemandem übernommen – und warum ist sie geblieben? | What small travel habit did you pick up from someone else, and why has it stayed with you? |
| Q21 | F | Welche Reiseerfahrung klingt von außen unscheinbar, bedeutet dir aber viel? | What travel experience might sound unremarkable to others but means a great deal to you? |
| Q22 | F | Was bedeutet „ankommen“ für dich – außer einen Ort zu erreichen? | What does “arriving” mean to you beyond reaching a place? |
| Q23 | F | Welche Gewohnheit oder Seite von dir zeigt sich unterwegs stärker als im Alltag? | What habit or side of you shows up more strongly while travelling than in everyday life? |
| Q24 | F | Welche Reiseerinnerung bedeutet dir heute etwas anderes als damals – und wodurch hat sich ihre Bedeutung verändert? | What travel memory means something different to you now than it did then, and what changed its meaning? |

### Act III – HORIZONT / HORIZON

**DE:** „Blickt auf mögliche nächste Wege und darauf, was gemeinsame Reisezeit wertvoll macht. Ein Wunsch ist keine Verabredung.“

**EN:** “Look toward possible future journeys and what makes shared travel time meaningful. A wish is not a commitment.”

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q25 | Q/S/F | Welche Art von Ort oder Gegend würdest du gern einmal entdecken – ganz in der Nähe oder weiter weg? | What kind of place or area would you like to explore one day, close to home or farther away? |
| Q26 | Q/S/F | Falls ihr wieder gemeinsam unterwegs seid: Welche Kleinigkeit würdest du gern genauso wiederholen? | If you travel together again, what small thing would you happily repeat exactly as it was? |
| Q27 | Q/S/F | Bei welcher Reisevorliebe ist es für dich völlig in Ordnung, wenn ihr unterschiedlich seid? | Which travel preference is it completely fine for the two of you to differ on? |
| Q28 | Q/S/F | Was möchtest du von dieser gemeinsamen Zeit in Erinnerung behalten? | What would you like to remember from this time together? |
| Q29 | S/F | Welche Reiseidee reizt dich, auch wenn sie vielleicht nie umgesetzt wird? | What travel idea appeals to you even if it may never happen? |
| Q30 | S/F | Was sollte eine gemeinsame Reiseplanung respektieren, damit sie sich für dich leicht und fair anfühlt? | What should shared travel planning respect so that it feels easy and fair to you? |
| Q31 | S/F | Welche Art von Abenteuer passt gerade zu deinem Leben – klein, groß oder ganz alltäglich? | What kind of adventure suits your life right now—small, big, or entirely ordinary? |
| Q32 | S/F | Wenn die andere Person auf einer künftigen Fahrt eine Sache auswählen dürfte: Welche würdest du ihr gern überlassen? | If the other person could choose one thing on a future journey, what would you happily leave to them? |
| Q33 | F | Welche Sehnsucht verbindest du mit dem Unterwegssein? | What longing do you associate with being on the road? |
| Q34 | F | Wie würdest du gern begleitet werden, wenn auf einer Reise etwas nicht nach Plan läuft? | How would you like someone to support you when something does not go to plan on a journey? |
| Q35 | F | Welcher Seite von dir möchtest du auf einer zukünftigen Reise mehr Raum geben? | What side of yourself would you like to give more room on a future journey? |
| Q36 | F | Was macht eine gemeinsame Reise für dich im Rückblick wirklich wertvoll? | Looking back, what makes a shared journey truly meaningful to you? |

### Direct finales

- **Quick DE:** „Hier endet die Runde. Wenn eine teilnehmende Person weiterfährt, legt das Smartphone weg; die sichere Weiterreise hat Vorrang.“
- **Quick EN:** “This round ends here. If either participant resumes driving, put the phone away; a safe onward journey comes first.”
- **Standard DE:** „Wenn ihr möchtet, beendet die Runde mit je einem Satz: Etwas, das ich jetzt besser über dich verstehe, ist …“
- **Standard EN:** “If you like, end the round with one sentence each: Something I understand better about you now is …”
- **Full DE:** „Welche Antwort der anderen Person hat dich heute neugieriger gemacht – und was möchtest du dazu noch fragen?“
- **Full EN:** “Which of the other person’s answers made you more curious today, and what would you like to ask next?”

Quick ends directly. Standard uses **FINALE** and Full may use **FRAGE 37 / QUESTION 37**, but neither enters saved-question branches. Every optional reflection has an equally prominent End action.

---

## 12. FAMILY

**Editorial status:** Implemented; physical-device and moderated-session validation remains.
**Goal:** Help two adults who understand each other as family see each other beyond fixed roles, exchange useful knowledge about support and boundaries, and choose what their relationship may look like next.
**Acts:** ALLTAG → ROLLEN → GESTALTEN
**Duration:** Quick 15–25 min · Standard 30–50 min · Full 55–85 min
**Default:** Standard
**Private moment:** `none` on every route

Family includes family of origin, adoptive and blended family, relatives by partnership, and chosen family. The pack does not assume biological relation, a shared household or childhood, current closeness, harmony, parenthood, or a wish to reconcile. It is not family therapy, mediation, or an assessment of family functioning.

### Required introduction

**DE**

> FAMILY ist für zwei erwachsene Menschen, die einander als Familie verstehen – biologisch, rechtlich, angeheiratet, adoptiert oder selbst gewählt. Das Spiel setzt weder Nähe noch eine gemeinsame Kindheit oder den Wunsch voraus, etwas zu klären. Jede Frage darf ohne Begründung ausgelassen und das Gespräch jederzeit beendet werden. Es geht nicht um eine richtige Version eurer Familie, sondern darum, einander zuzuhören.

**EN**

> FAMILY is for two adults who understand each other as family—through biology, law, partnership, adoption, or choice. The game does not assume closeness, a shared childhood, or a wish to resolve anything. Either person may pass on any question without explanation and end the conversation at any time. There is no single correct version of your family; the purpose is to listen to each other.

### Curated routes

- **Quick:** Q01, Q02, Q04, Q05 · Q13–Q16 · Q25, Q27, Q32, Q36
- **Standard:** Q01–Q06, Q08, Q11 · Q13–Q20 · Q25–Q29, Q31, Q32, Q36
- **Full:** Q01–Q36

### Act I – ALLTAG / EVERYDAY

**DE:** „Beginnt mit kleinen Geschichten und Alltagsdetails, die zu eurer eigenen Version von Familie gehören. Eine lange gemeinsame Vergangenheit ist hilfreich, aber nicht nötig. Unterschiedliche Erinnerungen dürfen nebeneinanderstehen; ihr sucht keine richtige Version.“

**EN:** “Begin with small stories and everyday details that belong to your own version of family. A long shared history can help, but it is not required. Different memories may stand side by side; you are not looking for one correct version.”

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q01 | Q/S/F | Gibt es eine kleine Sache, die dich im Alltag mit der anderen Person verbindet oder an sie denken lässt – auch wenn ihr nicht am selben Ort lebt? | Is there a small thing that connects you with the other person in everyday life or brings them to mind—even if you do not live in the same place? |
| Q02 | Q/S/F | Welche kleine Geschichte über euch fühlt sich für dich unverwechselbar nach Familie an? | What small story about the two of you feels unmistakably like family to you? |
| Q03 | S/F | Welche Alltagssituation zeigt besonders gut, worin ihr euch ähnelt oder unterscheidet? | What everyday situation best shows how you are alike or different? |
| Q04 | Q/S/F | Welchen kleinen Teil deines heutigen Alltags möchtest du der anderen Person näherbringen? | What small part of your life today would you like the other person to know better? |
| Q05 | Q/S/F | Welches Essen, Ritual, Ereignis oder Alltagsdetail verbindest du mit deiner persönlichen Vorstellung von Familie? | What food, ritual, occasion, or everyday detail do you associate with your own idea of family? |
| Q06 | S/F | Welcher Satz, Ausdruck oder Witz hat zwischen euch eine ganz eigene Bedeutung bekommen? | What phrase, expression, or little joke has taken on a meaning of its own between you? |
| Q07 | F | Welche alltägliche Form von Fürsorge wird in Familien leicht übersehen, obwohl sie dir etwas bedeutet? | What everyday form of care is easily overlooked in families even though it matters to you? |
| Q08 | S/F | Welcher kleine Moment hat dir zuletzt eine neue Seite der anderen Person gezeigt? | What small recent moment showed you a new side of the other person? |
| Q09 | F | Welche Familiengeschichte sollte weiterleben, auch wenn verschiedene Menschen sie unterschiedlich erzählen – und warum? | Which family story deserves to live on even if different people tell it differently, and why? |
| Q10 | F | Welche Tradition würdest du gern anpassen oder neu erfinden, damit sie heute zu den beteiligten Menschen passt? | Which tradition would you like to adapt or reinvent so it fits the people involved today? |
| Q11 | S/F | Bei welchem alltäglichen Anlass – etwa Kochen, Autofahren, Spazieren oder Nachrichten schreiben – redet ihr besonders leicht miteinander? | During what everyday activity—such as cooking, driving, walking, or messaging—do the two of you find it easiest to talk? |
| Q12 | F | Was macht eine Verbindung für dich zu Familie – unabhängig davon, ob sie biologisch, rechtlich oder selbst gewählt ist? | What makes a connection family to you, regardless of whether it is biological, legal, or chosen? |

### Act II – ROLLEN / ROLES

**DE:** „Schaut jetzt auf Rollen, Unterstützung und Veränderung. Hört zu, ohne die andere Person einzuordnen oder für sie zu entscheiden.“

**EN:** “Now look at roles, support, and change. Listen without defining the other person or deciding for them.”

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q13 | Q/S/F | Welche Stärke bringst du in familiäre Beziehungen oft ein, ohne dass sie ausdrücklich benannt wird? | What strength do you often bring to family relationships without it being named? |
| Q14 | Q/S/F | Wie soll die andere Person nachfragen, ob du gerade Unterstützung oder lieber Freiraum möchtest? | How would you like the other person to ask whether you want support or would prefer some space? |
| Q15 | Q/S/F | Welche Veränderung an dir möchtest du in deiner Familie sichtbarer machen? | What change in yourself would you like to make more visible within your family? |
| Q16 | Q/S/F | Welche Seite der anderen Person kennst du außerhalb ihrer gewohnten Familienrolle noch zu wenig? | What side of the other person do you know least outside their usual family role? |
| Q17 | S/F | Welche Rolle wird dir in Familien schnell zugeschrieben – und wie gut passt sie heute noch? | What role do people tend to assign you in families, and how well does it still fit? |
| Q18 | S/F | Was bedeutet für dich, für Familie da zu sein, ohne dich selbst zu übergehen? | What does being there for family mean to you without neglecting yourself? |
| Q19 | S/F | Welche Form von Hilfe möchtest du lieber angeboten bekommen, als dass sie einfach übernommen wird? | What kind of help would you rather be offered than have someone simply take over? |
| Q20 | S/F | Was sollte die andere Person über deine Art wissen, Familienmitgliedern Zuneigung zu zeigen? | What should the other person know about how you show affection in family relationships? |
| Q21 | F | Bei welcher persönlichen Veränderung wünschst du dir von Menschen in deiner Familie eher Verständnis als Bewertung? | For what personal change would you prefer understanding from family rather than evaluation? |
| Q22 | F | Welche unausgesprochene Erwartung in Familien würdest du lieber als offene Frage behandeln? | What unspoken expectation in families would you rather treat as an open question? |
| Q23 | F | Bei welcher familiären Aufgabe oder Verantwortung möchtest du, dass gefragt wird, statt automatisch mit dir zu rechnen? | With what family task or responsibility would you like people to ask rather than automatically count on you? |
| Q24 | F | Welche Erfahrung hat deine Vorstellung davon geprägt, wie Familie dich unterstützen sollte? | What experience has shaped your idea of how family should support you? |

### Act III – GESTALTEN / SHAPING

**DE:** „Zum Schluss geht es um Wertschätzung, Grenzen und eine frei gewählte Zukunft. Nähe kann auch bedeuten, Freiraum und Unterschiede zu respektieren.“

**EN:** “The final act is about appreciation, boundaries, and a freely chosen future. Closeness can also mean respecting space and difference.”

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q25 | Q/S/F | Welche konkrete Stärke der anderen Person möchtest du heute würdigen – und woran zeigt sie sich? | What specific strength of the other person would you like to appreciate today, and what behavior shows it? |
| Q26 | S/F | Wofür möchtest du der anderen Person danken, ohne daraus eine Verpflichtung für die Zukunft zu machen? | What would you like to thank the other person for without turning it into an obligation for the future? |
| Q27 | Q/S/F | Welche Grenze hilft dir, dass sich familiäre Nähe freiwillig und gut anfühlt? | What boundary helps family closeness feel voluntary and good to you? |
| Q28 | S/F | Welches kleine gemeinsame Ritual würdest du gern ausprobieren, ohne dass es zur Pflicht wird? | What small shared ritual would you like to try without turning it into an obligation? |
| Q29 | S/F | Wie soll die andere Person auf ein ehrliches Nein von dir reagieren? | How would you like the other person to respond to an honest no from you? |
| Q30 | F | Welche Entscheidung möchtest du selbst treffen dürfen, auch wenn Familie dazu eine Meinung hat? | What decision do you want to be free to make for yourself even when family has an opinion about it? |
| Q31 | S/F | Welche Form von Kontakt fühlt sich für dich verlässlich an, ohne häufig sein zu müssen? | What kind of contact feels dependable to you without needing to be frequent? |
| Q32 | Q/S/F | Wie soll sich eure Beziehung im nächsten Jahr anfühlen, ohne vorauszusetzen, dass sie enger werden muss? | What would you like your relationship to feel like over the next year without assuming it has to become closer? |
| Q33 | F | Welche alte Familienregel möchtest du bewusst prüfen, statt sie automatisch weiterzuführen? | What old family rule would you like to examine consciously rather than carry forward automatically? |
| Q34 | F | Was möchtest du der anderen Person künftig eher direkt sagen, statt zu hoffen, dass Familie es einfach weiß? | What would you rather tell the other person directly in future instead of hoping family should simply know? |
| Q35 | F | Welche Frage sollte man in Familien öfter stellen, bevor jemand hilft, urteilt oder plant? | What question should people in families ask more often before helping, judging, or making plans? |
| Q36 | Q/S/F | Was wünschst du der anderen Person für ihren nächsten Lebensabschnitt, ohne ihr einen Weg vorzugeben? | What do you wish for the other person's next chapter without choosing their path for them? |

### Direct finale

Quick ends after Q36 without another prompt. Standard uses **FINALE** and Full uses **FRAGE 37 / QUESTION 37** for this optional closer:

**DE:** „Ihr könnt hier enden – oder noch eine freiwillige Frage nehmen: Was soll in eurer Art, Familie zu sein, künftig mehr Platz haben?“

**EN:** “You can end here—or take one optional final question: What would you like your way of being family to make more room for in the future?”

The End action remains equally prominent. Nobody is asked to agree, reciprocate, make a promise, or define the relationship as close. `PREDICT` is disabled; `NO THINKING` is disabled in Acts II and III. The initial release does not use the deferred private-observation experiment documented during drafting.

---

## 13. COLLEAGUES

**Editorial status:** Implemented; physical-device and moderated-session validation remains.
**Goal:** Help two voluntarily participating colleagues understand practical working preferences without turning the conversation into an assessment, feedback interview, conflict intervention, or substitute for organizational responsibility.
**Acts:** RHYTHMUS → ABSTIMMUNG → BEITRAG
**Duration:** Quick 15–25 min · Standard 30–50 min
**Default:** Quick
**Private moment:** `none` on every route

COLLEAGUES is designed for peers with no meaningful power over each other’s employment conditions. It must not be used between a manager and direct report, evaluator and evaluated person, or in another dependent working relationship. Formal equality is not enough when seniority, precarious employment, or control over future work makes refusal costly.

The mode is not mandatory team building, onboarding, a performance review, a team diagnostic, mediation, an investigation, an HR interview, or a grievance channel. Do not name clients, cases, trade secrets, security details, personal records, active complaints, or confidential employer information. Do not solicit salary, health, protected characteristics, union activity, family status, disability, religion, political views, or sexual or romantic information. Answers are not recorded, scored, exported, or valid input to an employment decision.

### Required introduction

**DE**

> Dieses Gespräch ist freiwillig und keine Bewertung. Ihr könnt jede Frage ohne Begründung überspringen oder jederzeit beenden. Sprecht nur über Arbeitsweisen und Erfahrungen, die ihr sicher teilen könnt; vertrauliche Informationen und konkrete Beschwerden gehören nicht in dieses Spiel. Keine Antwort ist eine Zusage, Aufgabe oder Grundlage für eine berufliche Entscheidung. Dieser Modus ist für möglichst gleichgestellte Personen gedacht – nicht für Vorgesetzte mit direkten Mitarbeitenden oder andere Abhängigkeitsverhältnisse.

**EN**

> This conversation is voluntary and is not an assessment. You may pass on any question without explanation or end at any time. Discuss only working preferences and experiences that are safe to share; confidential information and specific complaints do not belong in this game. No answer is a commitment, assignment, or valid basis for an employment decision. This mode is designed for people on as equal a footing as possible—not managers with direct reports or other dependent working relationships.

The acknowledgement action says **Verstanden / I understand**, never **I agree**.

### Curated routes

- **Quick:** Q01, Q02, Q06, Q12 · Q13, Q15, Q18, Q24 · Q25, Q29, Q32, Q36
- **Standard:** Q01–Q04, Q06, Q08, Q10, Q12 · Q13–Q16, Q18, Q20, Q22, Q24 · Q25–Q27, Q29, Q31, Q32, Q34, Q36
- **Editorial reserve:** Q05, Q07, Q09, Q11 · Q17, Q19, Q21, Q23 · Q28, Q30, Q33, Q35

The reserve belongs to the 36-question master bank but is not playable. A future extended route requires a separate product decision and user-session evidence; it must not appear merely to match other packs.

### Act I – RHYTHMUS / RHYTHM

**DE:** „Beginnt beim Arbeitsalltag, nicht bei Leistung: kleine gute Momente, Fokus, Kommunikation und Rhythmus. Ihr könnt allgemein oder hypothetisch antworten; Projekte, Organisationen und Namen müssen nicht genannt werden.“

**EN:** “Begin with everyday work, not performance: small positive moments, focus, communication, and rhythm. You may answer generally or hypothetically; projects, organizations, and names do not need to be identified.”

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q01 | Q/S | Welcher kleine Moment hat dir in letzter Zeit gezeigt: So arbeite ich gern? | What small recent moment made you think, “This is how I like to work”? |
| Q02 | Q/S | Bei welcher Art von Aufgabe kommst du meist gut in deinen Arbeitsfluss? | What kind of task usually helps you settle into a good working flow? |
| Q03 | S | Welche kleine Bedingung hilft dir beim Konzentrieren – zum Beispiel ein klares Ziel, Ruhe, eine Frist, eine kurze Abstimmung oder etwas anderes? | What small condition helps you focus—for example, a clear goal, quiet, a deadline, a brief check-in, or something else? |
| Q04 | S | Woran merkst du, dass sich ein Arbeitstag für dich sinnvoll angefühlt hat – unabhängig davon, wie voll er war? | What tells you that a workday felt worthwhile, regardless of how busy it was? |
| Q05 | Reserve | Welche Art von Beginn macht dir den Einstieg in eine gemeinsame Aufgabe leichter? | What kind of start makes it easier for you to enter a shared task? |
| Q06 | Q/S | Wann passt für eine kurze Abstimmung bei dir eher eine Nachricht, ein Gespräch oder ein anderes Format? | For a brief check-in, when do you prefer a message, a conversation, or another format? |
| Q07 | Reserve | Welche Information möchtest du zu Beginn einer Aufgabe lieber einmal zu viel als einmal zu wenig haben? | At the start of a task, what information would you rather receive once too often than once too little? |
| Q08 | S | Wie viel Planung hilft dir, bevor du mit einer gemeinsamen Aufgabe beginnst? | How much planning helps you before starting a shared task? |
| Q09 | Reserve | Welche Art von Pause hilft dir, mit einem frischen Blick zu einer Aufgabe zurückzukehren? | What kind of break helps you return to a task with a fresh perspective? |
| Q10 | S | Wie möchtest du angesprochen werden, wenn etwas kurzfristig deine Aufmerksamkeit braucht? | How would you like someone to approach you when something needs your attention at short notice? |
| Q11 | Reserve | Welche kleine Abstimmungsgewohnheit – etwa Zuständigkeit, Zeitpunkt oder nächsten Schritt zu benennen – macht Zusammenarbeit für dich leichter? | What small coordination habit—such as naming the owner, timing, or next step—makes collaboration easier for you? |
| Q12 | Q/S | Was macht eine kurze Besprechung für dich wirklich nützlich? | What makes a short meeting genuinely useful to you? |

### Act II – ABSTIMMUNG / COORDINATION

**DE:** „Sprecht über Zusammenarbeit, nicht über konkrete andere Personen oder laufende Konflikte. Beschreibt, was euch hilft; niemand bewertet die Antwort oder muss eine Begründung liefern.“

**EN:** “Discuss collaboration, not specific other people or active conflicts. Describe what helps you; nobody is evaluating the answer or owes an explanation.”

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q13 | Q/S | Was kann eine andere Person tun, damit für dich klar ist, dass dein Beitrag wirklich willkommen ist? | What can another person do to make it clear that your contribution is genuinely welcome? |
| Q14 | S | Wenn eine gemeinsame Aufgabe unklar wird: Welche Frage bringt euch am ehesten wieder auf eine gemeinsame Linie? | When a shared task becomes unclear, what question is most likely to bring you back onto common ground? |
| Q15 | Q/S | Was hilft dir, damit eine Meinungsverschiedenheit bei der Sache bleibt und nicht persönlich wird? | What helps a disagreement stay focused on the work rather than becoming personal? |
| Q16 | S | Wenn du eine unfertige Idee teilst: Welche Reaktion hilft dir, sie weiterzuentwickeln? | When you share an unfinished idea, what kind of response helps you develop it further? |
| Q17 | Reserve | Wie möchtest du darauf hingewiesen werden, wenn noch Kontext von dir fehlt, damit Nachfragen leicht bleibt? | How would you like someone to let you know when they still need context from you, so asking remains easy? |
| Q18 | Q/S | Wie möchtest du signalisieren, dass du gerade keine zusätzliche Aufgabe übernehmen kannst, ohne dich rechtfertigen zu müssen? | How would you like to signal that you cannot take on another task right now without having to justify it? |
| Q19 | Reserve | Wenn du ein Arbeitsproblem ansprichst: Wie soll die andere Person zuerst klären, ob du Zuhören, Fragen, Optionen oder praktische Hilfe möchtest? | When you raise a work problem, how should the other person first check whether you want listening, questions, options, or practical help? |
| Q20 | S | Was macht Rückmeldung für dich nützlich, auch wenn du nicht alles davon übernimmst? | What makes feedback useful to you even when you decide not to use all of it? |
| Q21 | Reserve | Welche Information bei einer Übergabe erspart dir unnötige Rückfragen? | What information in a handoff saves you from unnecessary follow-up questions? |
| Q22 | S | Wie können zwei Menschen einer leiseren oder später entstehenden Perspektive Raum geben, ohne jemanden zum Sprechen zu drängen? | How can two people make room for a quieter or later-forming perspective without pressuring anyone to speak? |
| Q23 | Reserve | Was hilft dir, wenn sich Zuständigkeiten überschneiden, damit niemand stillschweigend etwas voraussetzen muss? | What helps when responsibilities overlap so that nobody has to rely on unspoken assumptions? |
| Q24 | Q/S | Welche Grenze bei Erreichbarkeit oder Kommunikation hilft dir, verlässlich mit anderen zusammenzuarbeiten? | What boundary around availability or communication helps you collaborate reliably with others? |

### Act III – BEITRAG / CONTRIBUTION

**DE:** „Blickt auf Stärken, Lernen, Anerkennung und gesunde Grenzen. Aus keiner Antwort entsteht ein Versprechen, eine Aufgabe oder eine Beurteilung.“

**EN:** “Look at strengths, learning, recognition, and healthy boundaries. No answer creates a promise, assignment, or assessment.”

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q25 | Q/S | Welche Art von Arbeit bringt eine Stärke von dir zum Vorschein, die du gern einsetzt? | What kind of work brings out a strength you enjoy using? |
| Q26 | S | Falls es so etwas gibt: Wobei fragen dich Menschen bei der Arbeit manchmal um Rat, und was gefällt dir daran? | If anything comes to mind, what do people at work sometimes ask your advice about, and what do you enjoy about it? |
| Q27 | S | Welche Arbeitsweise hast du von einer anderen Person übernommen, weil sie für dich gut funktioniert? | What way of working have you borrowed from someone else because it works well for you? |
| Q28 | Reserve | Welche nützliche Lektion über Zusammenarbeit hättest du gern früher gekannt? | What useful lesson about collaboration do you wish you had learned earlier? |
| Q29 | Q/S | Welche Form von Anerkennung fühlt sich für dich ehrlich und angenehm an – privat, öffentlich, kurz, konkret oder ganz anders? | What form of recognition feels sincere and comfortable to you—private, public, brief, specific, or something else? |
| Q30 | Reserve | Welcher konkrete Beitrag einer anderen Person hat deine Arbeit zuletzt leichter oder klarer gemacht? Namen sind nicht nötig. | What specific contribution from someone else recently made your work easier or clearer? No names are needed. |
| Q31 | S | Welche Art von Lernchance hilft dir zu wachsen, ohne dich dabei allein gelassen zu fühlen? | What kind of learning opportunity helps you grow without making you feel left on your own? |
| Q32 | Q/S | Welchen Teil eines gesunden Arbeitsrhythmus möchtest du auch in intensiven Phasen schützen? | What part of a healthy working rhythm do you want to protect even during intense periods? |
| Q33 | Reserve | Welche Art der Zusammenarbeit würdest du bei einer nächsten gemeinsamen Aufgabe gern wiederholen oder ausprobieren? | What way of working would you like to repeat or try on a future shared task? |
| Q34 | S | Welches kleine Thema würdest du vor einer künftigen gemeinsamen Aufgabe gern früh klären, ohne es heute festlegen zu müssen? | What small point would you like to clarify early before a future shared task, without needing to settle it today? |
| Q35 | Reserve | Was können Menschen in einem Team tun, damit frühes Nachfragen und Hilfeholen normal wirken? | What can people on a team do to make early questions and requests for help feel normal? |
| Q36 | Q/S | Was soll die andere Person über eine gute Zusammenarbeit mit dir verstehen, ohne es als Verpflichtung zu lesen? | What would you like the other person to understand about working well with you without treating it as an obligation? |

### Direct finales

- **Quick DE:** „Ihr habt Arbeitsweisen sichtbar gemacht, ohne sie zu bewerten. Ihr könnt hier enden. Nichts aus diesem Gespräch ist eine Zusage.“
- **Quick EN:** “You made working preferences more visible without evaluating them. You can end here. Nothing from this conversation is a commitment.”
- **Standard DE:** „Wenn ihr möchtet, nennt nacheinander eine Arbeitspräferenz, die ihr heute klarer verstanden habt. Spiegeln reicht; ihr müsst nichts vereinbaren.“
- **Standard EN:** “If you would like, take turns naming one working preference you understand more clearly now. Reflection is enough; you do not need to agree on anything.”

COLLEAGUES has no Full route, Question 37, or saved-question branch. Disable `PREDICT`, `NO THINKING`, simultaneous answers, countdowns, performance-oriented twists, and the timer by default. Use at most two sparse listening cues in a run; never frame turns, completion, or disclosure as a score.

---

## 14. POWER, BY CHOICE (18+)

**Goal:** A conversation-only adult pack about voluntarily chosen erotic roles, boundaries, stopping, and care. Fantasy, curiosity, discussion, and consent to a specific action remain separate. The pack contains no physical tasks, compatibility result, private moment, or PLAYFUL mechanics.

**Routes:** Quick 12 · Standard 24 · Full 36. Pilot estimates: 18–28, 35–55, and 55–85 minutes. The app currently presents rounded planning values of 24, 45, and 70 minutes.

### Act I – NEUGIER / CURIOSITY

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q01 | Q/S/F | Wenn du an einvernehmlichen Machtaustausch denkst: Was macht das Thema für dich neugierig, interessant oder auch uninteressant? | When you think about consensual power exchange, what makes the topic feel intriguing, interesting, or not for you? |
| Q02 | S/F | Welcher Teil des Themas interessiert dich am ehesten – Rollen, Sprache, Vertrauen, Rituale, Empfindungen, Fantasie, etwas anderes oder keiner davon? | Which part of the topic interests you most—roles, language, trust, ritual, sensation, fantasy, something else, or none of these? |
| Q03 | F | Was bedeuten Begriffe wie dominant, submissiv, Switch, Top oder Bottom für dich – wenn sie überhaupt etwas bedeuten? | What do terms such as dominant, submissive, switch, top, or bottom mean to you—if they mean anything at all? |
| Q04 | Q/S/F | Wie unterscheidest du eine Fantasie, über die du gern sprichst, von etwas, das du im echten Leben vielleicht wollen würdest? | How do you distinguish a fantasy you enjoy discussing from something you might want in real life? |
| Q05 | S/F | Kann sich eine Rolle für dich wie Identität, gelegentliche Vorliebe, Experiment, gar nichts davon oder etwas anderes anfühlen? | Could a role feel like an identity, an occasional preference, an experiment, none of these, or something else to you? |
| Q06 | F | Wodurch könnten sich Rollenwünsche je nach Person, Situation oder Tag verändern – oder für dich gleich bleiben? | What might make role preferences change with the person, situation, or day—or stay the same for you? |
| Q07 | Q/S/F | Was würde dieses Gespräch neugierig statt wie eine Prüfung oder Erwartung wirken lassen? | What would make this conversation feel curious rather than like a test or expectation? |
| Q08 | S/F | Welche Sprache über Macht wirkt auf dich einladend, neutral oder abschreckend? | What language about power feels inviting, neutral, or off-putting to you? |
| Q09 | F | Welche Annahme über Dominanz oder Submission würdest du gern aus diesem Gespräch heraushalten? | What assumption about dominance or submission would you most like to keep out of this conversation? |
| Q10 | Q/S/F | Was würde helfen, damit dieses Gespräch angenehm, freiwillig und jederzeit leicht zu beenden bleibt? | What would help this conversation stay comfortable, optional, and easy to end at any time? |
| Q11 | F | Was könnte jemand zu diesem Thema sagen, ohne eigene Erfahrungen oder Interessen offenzulegen? | What could someone say about this topic without disclosing their own experience or interests? |
| Q12 | S/F | Wo möchtest du eine klare Grenze zwischen freiwillig gewählten erotischen Rollen und Entscheidungen im Alltag ziehen? | Where would you want a clear boundary between chosen erotic roles and everyday decisions? |

### Act II – ABSPRACHE / NEGOTIATION

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q13 | Q/S/F | Wie sollte jemand fragen, ob ein Gespräch über Machtaustausch gerade willkommen ist? | How would you like someone to ask whether a conversation about power exchange is welcome right now? |
| Q14 | S/F | Welche Informationen bräuchtest du, um eine Idee als „nur besprechbar“, „später recherchieren“, „vielleicht“ oder „nein“ einzuordnen? | What information would you need to place an idea under “discussion only,” “research later,” “maybe,” or “no”? |
| Q15 | F | Wie würdest du klare Neins, bedingte Vielleichts und offene Fragen benennen – oder passen andere Begriffe besser? | How would you name clear noes, conditional maybes, and open questions—or would different terms fit better? |
| Q16 | Q/S/F | Welche Wörter oder Signale sollten in einem zukünftigen Gespräch „langsamer“, „Pause“ und „Stopp“ bedeuten? | What words or signals should mean “slow down,” “pause,” and “stop” in a future conversation? |
| Q17 | S/F | Was sollte sofort passieren, wenn jemand seine Meinung ändert? | What should happen immediately when someone changes their mind? |
| Q18 | F | Wenn Worte schwerfallen: Welche Anzeichen sollten zu Stopp und Nachfragen führen statt zu einer Annahme? | When words are difficult, what signs should lead to stopping and checking in rather than making an assumption? |
| Q19 | Q/S/F | Was macht es leicht, ein „Vielleicht“ als Vielleicht stehen zu lassen, ohne Überredung? | What makes it easy to leave a “maybe” as a maybe without persuasion? |
| Q20 | S/F | Wie kann jemand prüfen, ob etwas richtig verstanden wurde, ohne deine Antwort wie einen Vertrag zu behandeln? | How can someone check understanding without treating your answer like a contract? |
| Q21 | F | Welche Formulierung hält eine Idee klar im Bereich „nur besprechen“, ohne daraus einen Plan oder eine Erwartung zu machen? | What wording keeps an idea clearly in “discussion only,” without turning it into a plan or expectation? |
| Q22 | Q/S/F | Wie können zwei Menschen eine Regel im Rollenspiel von einer echten Grenze im Alltag unterscheiden? | How can two people distinguish a role-play rule from a real-life boundary? |
| Q23 | S/F | Woran würde man merken, dass eine Absprache veränderbar bleibt statt festgeschrieben zu sein? | What would show that an agreement remains revisable rather than fixed? |
| Q24 | F | Woran würdest du erkennen, dass Fachwissen nötig ist, statt von einer Gesprächs-App oder durch Ausprobieren zu lernen? | What would tell you that specialist knowledge is needed rather than learning from a conversation app or by experimenting? |

### Act III – FÜRSORGE / CARE

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q25 | Q/S/F | Welche Reaktion würde dir zeigen, dass ein Stopp oder Meinungswechsel gut angenommen wird? | What response would show you that a stop or change of mind will be received well? |
| Q26 | S/F | Was hilft dir nach einem intensiven Gespräch zurück in den Alltag: Nähe, Abstand, Humor, Ruhe, späteres Nachfragen oder etwas anderes? | After an intense conversation, what helps you return to ordinary connection: closeness, space, humor, quiet, a later check-in, or something else? |
| Q27 | F | Wie könnte Fürsorge nach einer intensiven Situation für beide Menschen unterschiedlich aussehen – unabhängig von ihrer Rolle? | How might care after an intense situation look different for each person, regardless of role? |
| Q28 | Q/S/F | Wie könnte ein hilfreiches Nachfragen am nächsten Tag klingen – falls es gewünscht ist? | What could a helpful next-day check-in sound like—if one is wanted? |
| Q29 | S/F | Welche Reaktion fühlt sich fürsorglich an, wenn jemand nur allgemein oder hypothetisch antwortet? | What response feels caring when someone answers only generally or hypothetically? |
| Q30 | F | Welche Privatsphäre rund um Fantasien, Rollen oder solche Gespräche wäre dir wichtig? | What privacy around fantasies, roles, or conversations like this would matter to you? |
| Q31 | Q/S/F | Was macht den Satz „Ich möchte darüber nur sprechen“ leicht verständlich und respektierbar? | What makes “I only want to talk about this” easy to understand and respect? |
| Q32 | S/F | Wie sollte jemand reagieren, wenn eure Interessen oder Rollenwünsche nicht übereinstimmen? | How would you like someone to respond if your interests or role preferences do not match? |
| Q33 | F | Welche Reaktion hilft, wenn jemand kein Interesse hat, ohne nach einem tieferen Grund zu suchen? | What response helps when someone is not interested, without looking for a deeper reason? |
| Q34 | Q/S/F | Wie sieht Fürsorge aus, wenn eine Person das Thema früher beenden möchte? | What does care look like when one person wants to end the topic sooner? |
| Q35 | S/F | Was sollte außerhalb jeder freiwillig gewählten Machtdynamik über Gleichwertigkeit und Respekt unverändert bleiben? | What should remain unchanged about equal worth and respect outside any chosen power dynamic? |
| Q36 | F | Welcher eine Grundsatz sollte ein zukünftiges Gespräch über freiwillig gewählte Macht leiten, ohne einen Plan zum Handeln zu bedeuten? | What one principle should guide a future conversation about chosen power without implying a plan to act? |

### Direct finale

**DE:** „Was würde ein zukünftiges Gespräch über freiwillig gewählte Macht für dich klarer und angenehmer machen? Ihr müsst heute nichts entscheiden oder ausprobieren.“

**EN:** “What would make a future conversation about chosen power feel clearer and more comfortable for you? You do not need to decide or try anything today.”

---

## 15. SLOW BURN (18+)

**Goal:** A non-resumable, touch-forward experience for two adults. Every exact physical invitation uses a fresh masked Yes/Adjust/Skip choice from both people. It contains external touch and optional kissing, but no penetration, breath or neck play, restraint, impact, surprise touch, private moment, Question 37, PLAYFUL mechanics, timer, or stored session state.

**Routes:** Quick 9 · Standard 15 · Unhurried 21. Planning estimates: approximately 20, 40, and 60 minutes. These are experience ranges, not targets or countdowns.

### Act I – ANKOMMEN / ARRIVE

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q01 | Q/S/U | Vor jeder Berührung wählt ihr jeweils eine Option: ruhiger · heller oder dunkler · wärmer oder kühler · mehr Abstand · andere Unterlage · keine Änderung. Nutzt nur Änderungen, die für euch beide passen. | Before any touch, each choose one: quieter · brighter or dimmer · warmer or cooler · more space · different surface · no change. Use only changes that work for both. |
| Q02 | S/U | Wählt jeweils eine Position, die ihr leicht verlassen oder ändern könnt: sitzend, liegend, stehend oder eine andere gut gestützte Position. Keine Position ist Teil einer Herausforderung. | Each choose a position you can leave or change easily: sitting, lying, standing, or another supported position. No position is part of the challenge. |
| Q03 | S/U | Ohne Berührung wählt jede Person einen Abstand. Verwendet den größeren gewünschten Abstand. Beide Personen können jederzeit mehr Abstand schaffen. Blickkontakt ist optional. | With no touch, each person chooses a distance. Use the greater requested distance. Either person can create more space at any time. Looking at each other is optional. |
| Q04 | Q/S/U | Zieht eine ruhige Berührung von Hand zu Hand in Betracht. Die empfangende Person benennt Handfläche, Handrücken oder eine andere gut erreichbare Stelle sowie eine Höchstdauer. Beide Personen können früher stoppen. | Consider one still hand-to-hand touch. The receiver names palm, back of hand, or another reachable part of the hand and a maximum duration. Either person may stop sooner. |
| Q05 | U | Die empfangende Person zeigt an der eigenen Hand – oder sagt bzw. tippt –, wie sanft oder fest es angenehm ist. Die gebende Person kann genau diesen Druck an der gewählten Stelle der Hand ausprobieren. | The receiver shows on their own hand—or says or taps—how light or firm feels welcome. The giver may try that exact pressure on the chosen hand area. |
| Q06 | U | Zieht eine Berührung an einer bequem erreichbaren Stelle des Unterarms in Betracht – über der Kleidung, falls dort Kleidung ist. Die empfangende Person benennt Stelle, ruhigen Kontakt oder eine Bewegung und eine Höchstdauer. | Consider touch on one comfortably reachable part of the forearm, over clothing if present. The receiver names the place, still contact or one movement, and a maximum duration. |
| Q07 | Q/S/U | Was passt jetzt? Ohne Berührung bleiben · eine bereits gewählte Berührung genau wiederholen · mehr Abstand schaffen · zum nächsten Akt wechseln · beenden. Keine Wahl ist besser oder höher. | What fits now? Stay with no touch · repeat an already chosen touch exactly · create more space · move to the next act · end. No choice is better or higher. |

### Act II – AUFBAU / BUILD

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q08 | Q/S/U | Zieht eine Form von Körperkontakt in Betracht: seitlicher Kontakt · eine kurze Umarmung · eine andere zugängliche Form, bei der beide das eigene Gewicht tragen · keine. Benennt Position und Höchstdauer. | Consider one form of body contact: side-by-side contact · a brief embrace · another accessible form where each person supports their own weight · none. Name the position and maximum duration. |
| Q09 | S/U | Zieht eine Stelle im Gesicht, an der Kopfhaut oder an den Haaren in Betracht – oder lasst diese Kategorie aus. Die empfangende Person benennt die genaue Stelle und ruhigen Kontakt oder eine sanfte Bewegung. Nicht ziehen. | Consider one place on the face, scalp, or hair—or skip this category. The receiver names the exact place and still contact or one gentle movement. Avoid pulling. |
| Q10 | S/U | Zieht eine äußerliche Stelle an Bauch, seitlichem Oberkörper, Hüften oder Außenseiten der Beine über der Kleidung in Betracht. Brust/Brüste, Gesäß, Innenseiten der Oberschenkel, Genitalien und Anus sind ausgeschlossen. Die empfangende Person benennt eine genaue Stelle. | Consider one external area on the abdomen, side of the torso, hips, or outer legs, over clothing. This excludes chest/breasts, buttocks, inner thighs, genitals, and anus. The receiver names one exact place. |
| Q11 | Q/S/U | Zieht einen Kuss an Stirn, Wange, Hand, Schulter oder einer anderen bereits geöffneten äußerlichen Stelle in Betracht – oder wählt keinen Kuss. Die empfangende Person benennt die genaue Stelle. Stoppt nach einem Kuss. | Consider one kiss on the forehead, cheek, hand, shoulder, or another already opened external area—or choose no kiss. The receiver names the exact place. Stop after one kiss. |
| Q12 | U | Zieht einen Kuss auf den Mund in Betracht. Das ist eine eigene Entscheidung, auch wenn ein anderer Kuss bereits gewählt wurde. Küsst euch einmal und stoppt; beide Personen können vorher oder währenddessen stoppen. | Consider one kiss on the mouth. This is a separate choice even if another kiss was already chosen. Kiss once and stop; either person may stop before or during contact. |
| Q13 | U | Benennt eine frühere Handlung ohne Berührung oder mit Berührung, zu der ihr zurückkehren möchtet. Bei einer Berührung entscheidet ihr neu über die genaue Handlung. Zurückzukehren ist kein Rückschritt. | Name one earlier no-touch or touch action to return to. For touch, choose again on the exact action. Returning is not a step backward. |
| Q14 | Q/S/U | Was passt jetzt? Hier bleiben · etwas Angenehmes genau wiederholen · Optionen aus Akt III in Betracht ziehen · mehr Abstand schaffen · beenden. | What fits now? Stay here · repeat an exact favorite · consider Act III choices · create more space · end. |

### Act III – WÄHLEN / CHOOSE

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q15 | Q/S/U | Wählt getrennt: bei den derzeit gewählten Optionen bleiben · eine andere passende Kategorie in Betracht ziehen · mehr Abstand schaffen · zum Abschluss wechseln · jetzt beenden. Keine Richtung ist das „höhere“ Ergebnis. | Choose separately: stay with the currently chosen options · consider one different fitting category · create more space · move to a close · end now. No direction is the “higher” result. |
| Q16 | S/U | Wählt eine bereits gewählte Handlung und wiederholt sie genauso wie zuvor. Verstärkt sie nicht. Die empfangende Person legt die Höchstdauer fest; beide Personen können früher stoppen. | Choose one already selected action to repeat exactly as it was. Do not intensify it. The receiver sets the maximum duration; either person may stop sooner. |
| Q17 | S/U | Zieht für eine bereits gewählte äußerliche Stelle nur diese Änderung in Betracht: über der Kleidung bleiben · direkt auf der Haut berühren · diese Stelle schließen. Direkter Hautkontakt schließt Brust/Brüste, Gesäß, Innenseiten der Oberschenkel, Genitalien und Anus aus. | For one already selected external area, consider only this change: stay over clothing · touch directly on skin · close this area. Direct skin contact excludes chest/breasts, buttocks, inner thighs, genitals, and anus. |
| Q18 | U | Für eine bereits gewählte äußerliche Stelle kann die empfangende Person einen Weg führen, zeigen oder beschreiben. Die gebende Person geht nicht darüber hinaus und stoppt, wenn die Führung endet. | For one already selected external area, the receiver may guide, point out, or describe one path. The giver does not continue beyond it and stops when the guidance ends. |
| Q19 | Q/S/U | Zieht bei einem bereits gewählten Kuss auf den Mund in Betracht, ohne Zeitvorgabe weiterzumachen. Beide Personen können jederzeit Abstand schaffen; Abstand bedeutet stoppen und nachfragen, nicht folgen. | For an already selected mouth kiss, consider continuing without a timer. Either person can create distance at any moment; distance means stop and check, not follow. |
| Q20 | U | Wählt eine Pause ohne Berührung. Beide Personen finden eine bequeme Position und einen passenden Abstand. Danach muss nichts passieren. | Choose a no-touch pause. Each person finds a comfortable position and distance. Nothing needs to happen next. |
| Q21 | Q/S/U | Wechselt zum Abschluss, ohne eine neue Berührungskategorie hinzuzufügen: Abstand · ruhige Nähe · bereits gewähltes Händehalten · bereits gewählte Umarmung · Wasser oder praktische Bequemlichkeit · ein kurzer Check-in-Satz · jetzt beenden. | Move to a close without adding a new touch category: space · quiet nearness · an already selected handhold · an already selected embrace · water or practical comfort · one check-in sentence · end now. |

SLOW BURN clears its volatile choices when the app is hidden, closed, refreshed, or ended. A visibility preference may remain, but the session itself is never resumable and no selected action, adjustment, body area, or consent choice is persisted.
