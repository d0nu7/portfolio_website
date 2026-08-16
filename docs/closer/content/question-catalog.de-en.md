# CLOSER – complete question catalog DE/EN

**Updated:** 16 August 2026
**Status:** Editorial content specification for implementation
**Scope:** 9 packs · 324 master questions · German and English · curated duration routes · pack-specific finales

---

## 1. Authoritative interpretation

- A **pack/mode** determines *what* is asked: `classic`, `first-date`, `date-night`, `couples`, `friends`, `old-friends`, `deep`, `chaos`, or `late-night`.
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

In tables with a **Route** column, `Q/S/F` means Quick, Standard, and Full; `S/F` means Standard and Full; and `F` means Full only. Selected IDs always retain their listed order.

`DEEP` intentionally has no Quick route. `CLASSIC Full` is the complete original CLOSER experience; shorter Classic routes must be described as curated extracts.

### Privately saved question

In Standard and Full, each person privately receives this choice unless the pack explicitly sets `privateMoment: 'none'`. Quick intentionally omits the multi-step handoff. Late Night currently opts out on every route:

- **DE:** „Denk an eine Frage, die du deinem Gegenüber später gerne stellen würdest. Sag sie nicht laut. Gib sie nirgendwo ein. Merk sie dir einfach.“
- **EN:** “Think of one question you would like to ask the other person later. Don’t say it out loud. Don’t type it anywhere. Just remember it.”

Equal alternative: **„Heute keine“ / “Not today”**. The pack-specific Question 37 accounts for whether zero, one, or two genuinely saved questions remain open.

**Authoritative state contract:** „Heute keine“ must not be stored as `false` in `secretAsked`; there, `false` means an existing question is still open. The current implementation correctly represents this with two separate values per person:

- `hasSecretQuestion: true | false | null` – was a question saved at all?
- `secretAsked: true | false | null` – has the person already asked their own saved question during the conversation?

Semantically, `hasSecretQuestion === false` → `none`; existing question plus `secretAsked === false` → `pending`; and existing question plus `secretAsked === true` → `asked`. A later enum refactor to `none | pending | asked` is possible but not required. The current model derives the open questions and three branches as follows:

- `neither`: two saved questions remain open;
- `one`: exactly one saved question remains open;
- `both`: no saved question remains open; only the optional pack-specific bonus question appears. This includes questions already asked or explicitly declined. If both people selected **Heute keine**, the UI may additionally show the existing no-secret copy.

`Question 37` may remain as the internal mechanic name for packs that support the saved-question finale. Full displays **FRAGE 37 / QUESTION 37**; Standard uses the neutral label **FINALE**. Quick ends after its last regular question without a private handoff, and packs with `privateMoment: 'none'` use their own direct finale. Listed response cards are optional listening cues and do not count as questions.

The stated durations are **pilot ranges**, not promises. They must be calibrated through real user testing and must never trigger automatic progress or visible time pressure.

---

## 2. CLASSIC

**Goal:** Preserve the existing 36-question experience in content, meaning, and order.
**Acts:** NEUGIERIG → NÄHER → OFFEN
**Duration:** Quick extract 20–30 min · Standard extract 35–50 min · Full 45–75 min
**Default:** Full
**Note:** The version below matches the current branch. Only five German phrasings were minimally made gender-neutral (Q01, Q06, Q27, Q28, Q36); question content, intensity, and order remain unchanged.

### Curated routes

- **Quick:** Q01, Q04, Q09, Q12 · Q13, Q14, Q16, Q17 · Q25, Q26, Q31, Q36
- **Standard:** Q01, Q02, Q03, Q04, Q08, Q09, Q11, Q12 · Q13, Q14, Q15, Q16, Q17, Q18, Q20, Q21 · Q25, Q26, Q27, Q28, Q29, Q30, Q31, Q36
- **Full:** Q01–Q36 in the order shown below

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

| Case | German | English |
|---|---|---|
| `neither` – beide vorgemerkten Fragen sind noch offen | Stellt euch nacheinander eure vorgemerkten Fragen. | Take turns asking the questions you saved for later. |
| `one` – genau eine ist noch offen | **[Name]**, stell **[anderer Name]** deine vorgemerkte Frage. | **[Name]**, ask **[other name]** the question you saved for later. |
| `both` – beide wurden bereits gestellt oder keine ist mehr offen | Stellt die Frage, von der ihr euch gewünscht hättet, dass sie heute Abend vorgekommen wäre. | Ask the question you wish had appeared tonight. |

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
| Q25 | Was soll eine Person an dir bemerken, ohne dass du es beweisen musst? | What do you hope someone notices about you without making you prove it? |
| Q26 | Woran merkst du, dass du jemanden gern wiedersehen möchtest? | How do you know when you would like to see someone again? |
| Q27 | Welche Grenze macht Dating für dich leichter und sicherer? | What boundary makes dating feel easier and safer for you? |
| Q28 | Welche Art von Verbindung hoffst du zu finden, ohne heute schon mehr versprechen zu müssen? | What kind of connection are you hoping for without having to promise anything tonight? |
| Q29 | Welches Tempo fühlt sich beim Kennenlernen für dich gut an? | What pace feels right to you when getting to know someone? |
| Q30 | Welche Wahrheit über deinen Alltag ist wichtig, um dich gerade gut kennenzulernen? | What truth about your day-to-day life right now would help someone understand you better? |
| Q31 | Wie zeigt sich Verlässlichkeit für dich am Anfang eines Kennenlernens? | What does reliability look like to you early on? |
| Q32 | Wie soll eine Person nachfragen, wenn sie deine Gefühle nicht sicher einschätzen kann? | How would you like someone to ask when they are unsure how you feel? |
| Q33 | Was lässt dich respektiert fühlen, wenn Interessen oder Meinungen auseinandergehen? | What makes you feel respected when interests or opinions differ? |
| Q34 | Was soll dein Gegenüber von dir aus diesem Abend in Erinnerung behalten? | What do you hope the other person remembers about you from tonight? |
| Q35 | Was hilft dir, ehrlich Nein zu sagen, ohne dich für die Stimmung verantwortlich zu fühlen? | What helps you say an honest no without feeling responsible for the mood? |
| Q36 | Was würde diesen Abend für dich gut und druckfrei abrunden? | What would make this evening feel complete and pressure-free for you? |

### Curated routes

- **Quick (12):** `Q01, Q02, Q04, Q07` → `Q13, Q15, Q17, Q21` → `Q25, Q27, Q28, Q36`
- **Standard (24):** `Q01, Q02, Q03, Q04, Q05, Q07, Q08, Q12` → `Q13, Q14, Q15, Q16, Q17, Q19, Q21, Q24` → `Q25, Q26, Q27, Q28, Q29, Q31, Q34, Q36`
- **Full (36):** `Q01–Q36`

### Question 37


- **`neither` / both saved questions remain open**
  - DE: „Stellt euch nacheinander eure vorgemerkten Fragen – ohne Erwartungsdruck.“
  - EN: “Take turns asking the questions you saved for later — without pressure.”
- **`one` / one saved question remains open**
  - DE: „{who}, stell {other} deine vorgemerkte Frage – ohne Erwartungsdruck.“
  - EN: “{who}, ask {other} the question you saved for later — without pressure.”
- **`both` / no saved question remains open; optional bonus question**
  - DE: „Stellt euch noch eine Frage, die diesen ersten Abend gut abrundet.“
  - EN: “Ask each other one more question that would bring this first evening to a good close.”

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
| Q03 | Woran merkst du, dass jemand mit dir flirtet? | How can you tell when someone is flirting with you? |
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
| Q25 | Was hilft dir, dich sicher genug zu fühlen, um dich fallen zu lassen? | What helps you feel safe enough to let your guard down? |
| Q26 | Welche Grenze macht Intimität für dich erst möglich? | What boundary helps make intimacy possible for you? |
| Q27 | Was sollte ein Mensch über dein Verlangen verstehen, ohne es persönlich zu nehmen? | What should someone understand about your desire without taking it personally? |
| Q28 | Was macht es dir leicht, ein ehrliches Ja oder Nein auszusprechen? | What makes it easier for you to give an honest yes or no? |
| Q29 | Welche Form von Nähe fühlt sich gut an, auch wenn sie nirgendwohin führen muss? | What kind of closeness feels good even when it does not have to lead anywhere? |
| Q30 | Welche romantische Initiative lässt dich wirklich gesehen fühlen? | What romantic initiative makes you feel truly seen? |
| Q31 | Welche Reaktion hilft dir, wenn eure Wünsche gerade nicht übereinstimmen? | What kind of response helps when your wishes do not match in the moment? |
| Q32 | Welche gute Nachricht oder kleine Freude möchtest du heute gemeinsam feiern? | What piece of good news or small joy would you like to celebrate together tonight? |
| Q33 | Welchen Wunsch würdest du gern teilen, wenn daraus keine Erwartung entsteht? | What wish would you like to share if it came with no expectation? |
| Q34 | Wie sieht für dich ein schöner Ausklang nach einem besonders nahen Date aus? | What does a lovely ending to an especially close date look like to you? |
| Q35 | Welche kleine neue Erfahrung würdest du bei einem nächsten Date gern teilen? | What small new experience would you enjoy sharing on a future date? |
| Q36 | Welcher Gedanke aus diesem Abend soll noch ein wenig nachklingen? | What thought from tonight would you like to linger a little longer? |

### Curated routes

- **Quick (12):** `Q01, Q02, Q05, Q09` → `Q13, Q14, Q18, Q24` → `Q25, Q28, Q33, Q36`
- **Standard (24):** `Q01, Q02, Q04, Q05, Q06, Q09, Q10, Q12` → `Q13, Q14, Q15, Q18, Q20, Q21, Q23, Q24` → `Q25, Q26, Q28, Q29, Q30, Q32, Q33, Q36`
- **Full (36):** `Q01–Q36`

### Question 37


- **`neither` / both saved questions remain open**
  - DE: „Stellt euch nacheinander eure vorgemerkten Fragen, wenn es sich für euch gut anfühlt.“
  - EN: “Take turns asking the questions you saved, if that feels good to both of you.”
- **`one` / one saved question remains open**
  - DE: „{who}, stell {other} deine vorgemerkte Frage, wenn es sich für euch gut anfühlt.“
  - EN: “{who}, ask {other} the question you saved, if that feels good to both of you.”
- **`both` / no saved question remains open; optional bonus question**
  - DE: „Stellt euch noch eine Frage, die den Funken dieses Abends mit in morgen nimmt.“
  - EN: “Ask each other one more question that carries tonight’s spark into tomorrow.”

---

## 5. COUPLES

**Arc:** SEHEN → REPARIEREN → WÄHLEN
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

### Act II – REPARIEREN / REPAIR

| Nr. | Deutsch | English |
|---:|---|---|
| Q13 | Welche Bitte fällt dir deinem Gegenüber schwer auszusprechen? | What request do you find difficult to make of your partner? |
| Q14 | Wie wünschst du dir Trost, wenn es dir nicht gut geht? | How do you like to be comforted when you are having a hard time? |
| Q15 | Welches Bedürfnis bleibt hinter einem wiederkehrenden Missverständnis zwischen euch oft unsichtbar? | What need often goes unseen beneath a recurring misunderstanding between you? |
| Q16 | Woran merkst du, dass eine Entschuldigung bei dir wirklich ankommt? | What tells you that an apology has truly landed? |
| Q17 | Welche Reaktion wünschst du dir zuerst, wenn du Stress teilst? | What kind of response do you want first when you share something stressful? |
| Q18 | Welche Formulierung hilft dir, um Raum zu bitten, ohne Distanz zu meinen? | What words help you ask for space without meaning emotional distance? |
| Q19 | Was macht ein schwieriges Gespräch für dich sicherer? | What helps a difficult conversation feel safer to you? |
| Q20 | Wie kann dein Gegenüber auf eine gute Nachricht von dir so reagieren, dass du dich wirklich begleitet fühlst? | How can your partner respond to your good news in a way that makes you feel truly supported? |
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
| Q28 | Welches kleine Versprechen könnt ihr euch für diese Woche geben? | What small promise can the two of you make for this week? |
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


- **`neither` / both saved questions remain open**
  - DE: „Stellt euch nacheinander eure vorgemerkten Fragen. Zuhören reicht; ihr müsst nichts sofort lösen.“
  - EN: “Take turns asking the questions you saved. Listening is enough; nothing has to be solved now.”
- **`one` / one saved question remains open**
  - DE: „{who}, stell {other} deine vorgemerkte Frage. Zuhören reicht; ihr müsst nichts sofort lösen.“
  - EN: “{who}, ask {other} the question you saved. Listening is enough; nothing has to be solved now.”
- **`both` / no saved question remains open; optional bonus question**
  - DE: „Stellt euch noch eine Frage, die euch auch morgen an etwas Wertvolles zwischen euch erinnert.“
  - EN: “Ask each other one more question that will remind you tomorrow of something valuable between you.”

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
| Q09 | F | Bei welchem konkreten gemeinsamen Moment musstest du besonders ehrlich lachen? | During what specific moment together did you laugh most genuinely? |
| Q10 | Q/S/F | Welche konkrete Sache hat die andere Person einmal für dich getan – und welche Stärke von ihr wurde darin sichtbar? | What is one specific thing the other person once did for you, and what strength of theirs did it reveal? |
| Q11 | S/F | Welche Seite von dir hat sich verändert, seit wir uns kennen? | What side of you has changed since we have known each other? |
| Q12 | F | Über welchen Teil deines Lebens würdest du dir von befreundeten Menschen mehr neugierige Fragen wünschen? | What part of your life would you like your friends to ask more curious questions about? |

### Act II – DA SEIN / SHOWING UP

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q13 | Q/S/F | Welche Form von Unterstützung hilft dir wirklich? | What kind of support genuinely helps you? |
| Q14 | S/F | Woran kann eine befreundete Person erkennen, ob du gerade Rat oder einfach Gesellschaft möchtest? | How can a friend tell whether you want advice or simply some company? |
| Q15 | F | Was tut jemand konkret, wenn du dich in einem Gespräch wirklich gehört fühlst? | What does someone actually do that makes you feel truly heard in a conversation? |
| Q16 | Q/S/F | Was wird an dir häufig missverstanden? | What do people often misunderstand about you? |
| Q17 | S/F | Welche Emotion kannst du unter befreundeten Menschen leicht zeigen, und welche eher nicht? | Which emotion can you show easily around friends, and which one is harder to show? |
| Q18 | F | Wann hat eine befreundete Person zuletzt genau die richtige Nachfrage gestellt – und was hat sie bewirkt? | When did a friend last ask exactly the right follow-up question, and what difference did it make? |
| Q19 | Q/S/F | Wann hattest du zuletzt das Gefühl, dass dir eine befreundete Person wirklich den Rücken stärkt? | When did you last feel that a friend truly had your back? |
| Q20 | S/F | Wie wünschst du dir, dass befreundete Menschen auf eine gute Nachricht von dir reagieren? | How would you like your friends to respond when you share good news? |
| Q21 | F | Wenn du einen schweren Tag teilst: Was hilft zuerst – Zuhören, Trost, Ablenkung, Ideen, praktische Hilfe oder etwas anderes? | When you share that you have had a hard day, what helps first: listening, comfort, distraction, ideas, practical help, or something else? |
| Q22 | Q/S/F | Welche Eigenschaft der anderen Person schätzt du, die sie selbst vielleicht unterschätzt? | What quality do you appreciate in the other person that they may underestimate in themselves? |
| Q23 | S/F | Welche Grenze macht Freundschaften für dich verlässlicher und sicherer? | What boundary makes friendships feel more reliable and safe to you? |
| Q24 | F | Welches aktuelle Thema darf eine befreundete Person einfach mit dir aushalten, ohne es lösen zu müssen? | What are you dealing with right now that a friend can simply sit with you in, without having to solve it? |

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
| Q34 | Q/S/F | Wofür wären wir in einem Jahr dankbar, wenn wir es jetzt gemeinsam planen? | What would we be grateful for a year from now if we planned it together today? |
| Q35 | S/F | Was hilft unserer Freundschaft, auch in vollen oder anstrengenden Zeiten Raum zu behalten? | What helps our friendship keep a place in our lives when things are busy or difficult? |
| Q36 | F | Wofür möchtest du der anderen Person heute danken – und was sagt das über sie aus? | What would you like to thank the other person for today, and what does it say about who they are? |

### FRIENDS – recommended response cards

- After Q08 or Q33: **CELEBRATE** – „Freu dich kurz mit, bevor du deine eigene Geschichte erzählst.“ / “Take a moment to celebrate with them before sharing your own story.”
- After Q18: **FOLLOW UP** – „Frag nach einem konkreten Detail, das dir hilft, die Antwort besser zu verstehen.“ / “Ask for one specific detail that helps you understand the answer better.”
- After Q21 or Q24: **VALIDATE** – „Keine Lösung nötig. Zeig zuerst, dass du es gehört hast.“ / “No solution is needed. First, show that you heard them.”
- After Q36: **REFLECT** – „Sag in einem Satz, was du an der Antwort verstanden hast.“ / “In one sentence, say what you understood from the answer.”

### FRIENDS – dynamic Q37 copy

The keys follow the existing pack structure: `neither` means both saved questions remain; `one` means exactly one remains; `both` means no saved question remains and the displayed question is an optional bonus.

| Case | German | English |
|---|---|---|
| `neither` | Zwei vorgemerkte Fragen warten noch. Wenn es sich für euch gut anfühlt, stellt sie jetzt nacheinander. Keine Antwort ist geschuldet. | Two saved questions are waiting. If it feels right, ask them one at a time now. No answer is owed. |
| `one` | `{who}`, wenn es sich für dich gut anfühlt: Stell `{other}` jetzt deine vorgemerkte Frage. Eine Antwort bleibt freiwillig. | `{who}`, if it feels right, ask `{other}` the question you saved. Answering is still optional. |
| `both` | Was möchtest du, dass die andere Person aus diesem Gespräch über dich mitnimmt? | What would you like the other person to take away from this conversation about you? |

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
| Q13 | Q/S/F | Was hat sich in deinem Leben am stärksten verändert, seit wir uns besonders nah waren? | What has changed most in your life since the time when we were especially close? |
| Q14 | S/F | Welcher Teil deines heutigen Lebens passt am wenigsten zu dem Bild, das ich früher von dir hatte? | What part of your life today fits least with the picture I used to have of you? |
| Q15 | F | Welche Entscheidung aus der Zeit dazwischen hat die heutige Version von dir besonders geprägt? | What decision from the time in between most shaped who you are today? |
| Q16 | Q/S/F | Was wünschst du dir, dass ich über die Zeit dazwischen verstehe? | What would you like me to understand about the time in between? |
| Q17 | S/F | Was hast du in dieser Zeit über dich gelernt, das du früher noch nicht wissen konntest? | What did you learn about yourself during that time that you could not have known before? |
| Q18 | F | Was war an unserer Distanz leichter oder schwerer, als du erwartet hattest? | What about the distance between us was easier or harder than you expected? |
| Q19 | Q/S/F | Was hat dir geholfen, mit weniger Kontakt auf eine für dich gute Weise umzugehen? | What helped you handle having less contact in a way that worked for you? |
| Q20 | S/F | Gibt es etwas aus der Zeit dazwischen, das du erzählen möchtest, ohne dass es erklärt oder gelöst werden muss? | Is there something from the time in between you would like to share without needing it to be explained or solved? |
| Q21 | F | Welche alte Annahme über die andere Person bist du heute bereit zu überprüfen? | What old assumption about the other person are you ready to reconsider today? |
| Q22 | Q/S/F | Was fühlt sich zwischen uns noch immer mühelos an? | What still feels effortless between us? |
| Q23 | S/F | Wie hat sich die Art von Unterstützung verändert, die dir heute wirklich hilft? | How has the kind of support that genuinely helps you changed over time? |
| Q24 | F | Welcher Teil deines heutigen Lebens würde mich vermutlich am meisten überraschen? | What part of your life today would probably surprise me most? |

### Act III – WIEDER / AGAIN

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q25 | Q/S/F | Welche Form von Kontakt würde sich heute für dich stimmig anfühlen – ohne etwas für später festlegen zu müssen? | What kind of contact would feel right to you today without deciding anything about the future? |
| Q26 | S/F | Welche alte Tradition sollten wir behalten, verändern oder bewusst ruhen lassen? | What old tradition should we keep, adapt, or consciously leave at rest? |
| Q27 | F | Welche Gewohnheit oder Erwartung aus früher darf dort bleiben? | What habit or expectation from the past is allowed to stay there? |
| Q28 | Q/S/F | Welche gemeinsame Tradition wäre schön wiederzubeleben oder neu zu erfinden? | What shared tradition would be good to revive or reinvent? |
| Q29 | S/F | Über welches Thema von heute wärst du neugierig, ohne dass daraus ein schwieriges Gespräch werden muss? | What present-day topic are you curious to discuss without it having to become a difficult conversation? |
| Q30 | F | Was brauchst du heute, um dich von mir als die Person gesehen zu fühlen, die du inzwischen bist? | What do you need today to feel seen by me as the person you have become? |
| Q31 | Q/S/F | Gibt es ein Gespräch, für das heute mehr Raum wäre als früher? | Is there a conversation that has more room to happen today than it did before? |
| Q32 | S/F | Falls wir wieder mehr Kontakt haben: Woran würden wir merken, dass er für uns beide gut ist? | If we have more contact again, what would show us that it is good for both of us? |
| Q33 | F | Welche Grenze oder Erwartung sollten wir klar aussprechen, statt sie aus früher abzuleiten? | What boundary or expectation should we say out loud instead of carrying it over from the past? |
| Q34 | Q/S/F | Wenn wir eine echte neue Erinnerung schaffen: Welche dürfte es sein? | If we create a genuine new memory together, what would you like it to be? |
| Q35 | S/F | Welche Seite der anderen Person möchtest du heute neu kennenlernen? | What side of the other person would you like to get to know again as they are today? |
| Q36 | F | Welche Eigenschaft schätzt du an der Person vor dir heute – unabhängig von eurer gemeinsamen Geschichte? | What quality do you appreciate in the person in front of you today, apart from your shared history? |

### OLD FRIENDS – recommended response cards

- After Q02 or Q04: **FOLLOW UP** – „Frag nach einem einzigen Detail aus dieser Szene.“ / “Ask for one detail from that moment.”
- After Q12: **REFLECT** – „Sucht nicht nach der richtigen Version. Benennt, was jede Erinnerung für euch bedeutet.“ / “Do not look for the correct version. Name what each memory means to you.”
- After Q20 or Q30: **VALIDATE** – „Du musst nichts rechtfertigen oder reparieren. Zeig zuerst, dass du es gehört hast.“ / “You do not need to justify or repair anything. First, show that you heard them.”
- After Q34: **FOLLOW UP** – „Was wäre ein kleiner, realistischer erster Schritt?“ / “What would be one small, realistic first step?”

### OLD FRIENDS – dynamic Q37 copy

| Case | German | English |
|---|---|---|
| `neither` | Zwei vorgemerkte Fragen sind noch offen. Wenn es sich für euch gut anfühlt, stellt sie jetzt nacheinander. Keine Antwort ist geschuldet. | Two saved questions are still open. If it feels right, ask them one at a time. No answer is owed. |
| `one` | `{who}`, wenn es sich für dich gut anfühlt: Stell `{other}` jetzt deine vorgemerkte Frage. Eine Antwort bleibt freiwillig. | `{who}`, if it feels right, ask `{other}` the question you saved. Answering is still optional. |
| `both` | Welche Seite der Person vor dir macht dich heute neugierig – unabhängig davon, wie es weitergeht? | What side of the person in front of you makes you curious today, regardless of what happens next? |

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
| Q01 | S/F | Auf welchen konkreten Moment aus der letzten Zeit bist du still stolz – und warum? | What specific recent moment are you quietly proud of, and why? |
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
| Q15 | F | Welches ehrliche Kompliment kannst du nur schwer annehmen – und warum? | What sincere compliment do you find hard to accept, and why? |
| Q16 | S/F | Was wird an dir von nahestehenden Menschen häufig missverstanden? | What do people close to you often misunderstand about you? |
| Q17 | S/F | Welche Veränderung oder welcher Verlust hat dich stark geprägt? | What change or loss has had a powerful influence on who you are? |
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
| Q34 | S/F | Wie kann die andere Person nach diesem Gespräch gut für dich da sein – durch Zuhören, Nachfragen, Ruhe oder etwas anderes? | After this conversation, how can the other person best be there for you: by listening, asking questions, giving you space, or something else? |
| Q35 | F | Welchen Satz oder Gedanken möchtest du aus diesem Gespräch mitnehmen? | What sentence or thought would you like to carry with you from this conversation? |
| Q36 | S/F | Was möchtest du dir selbst nach diesem Gespräch mit etwas mehr Freundlichkeit zugestehen? | After this conversation, what would you like to allow yourself with a little more kindness? |

### DEEP – recommended response cards

- After Q01 or Q21: **CELEBRATE** – „Würdige kurz, was dieser Moment die Person gekostet oder ihr bedeutet hat.“ / “Take a moment to honor what that moment cost the person or meant to them.”
- After Q13: **FOLLOW UP** – „Frag, welches konkrete Verhalten den Unterschied gemacht hat.“ / “Ask what specific behavior made the difference.”
- After Q17, Q19 or Q24: **VALIDATE** – „Keine Lösung und keine Bewertung. Zeig zuerst, dass du es gehört hast.“ / “No solution and no judgment. First, show that you heard them.”
- After Q34: **REFLECT** – „Sag in einem Satz, was du künftig beachten möchtest.“ / “In one sentence, say what you would like to keep in mind from now on.”

### DEEP – dynamic Q37 copy

| Case | German | English |
|---|---|---|
| `neither` | Zwei vorgemerkte Fragen sind noch offen. Wenn es sich für euch gut anfühlt, stellt sie jetzt nacheinander. Jede Frage und jede Antwort bleibt freiwillig. | Two saved questions are still open. If it feels right, ask them one at a time now. Every question and every answer remains optional. |
| `one` | `{who}`, wenn es sich für dich gut anfühlt: Stell `{other}` jetzt deine vorgemerkte Frage. Eine Antwort bleibt freiwillig. | `{who}`, if it feels right, ask `{other}` the question you saved. Answering is still optional. |
| `both` | Wann hast du dich in diesem Gespräch am meisten verstanden gefühlt – und wodurch? | When did you feel most understood during this conversation, and what made you feel that way? |

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
| Q24 | F | Plant ein tatsächlich machbares Mini-Abenteuer für höchstens zehn Euro – ohne Mutprobe und ohne jemanden bloßzustellen. | Plan a genuinely doable mini-adventure for no more than ten euros—with no dares and no embarrassing anyone. |

### Act III – ÜBERRASCHEND ECHT / SURPRISINGLY REAL

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q25 | Q/S/F | Wofür wünschst du dir gerade mehr Erlaubnis von dir selbst? | What do you wish you gave yourself more permission to do right now? |
| Q26 | Q/S/F | Welche kurze Sprachnachricht würdest du deinem Ich in fünf Jahren schicken? | What short voice message would you send to yourself five years from now? |
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

The branches reflect whether each person has already asked their own saved question. If someone selected „Heute keine“, that person has no open question. If none remain in total, only the optional bonus question is offered. **Hier enden / End here** always remains visible next to **Weiter**.

#### `neither` – both saved questions remain open

**DE**

> Zwei vorgemerkte Fragen warten noch. Wenn es sich für euch beide gut anfühlt, stellt sie nacheinander. Jede Frage und jede Antwort darf ohne Begründung ausgelassen werden – und ihr könnt jederzeit hier enden.

**EN**

> Two saved questions are still waiting. If continuing feels good to both of you, ask them one at a time. Either question or answer may be passed without explanation — and you can end here at any time.

#### `one` – exactly one saved question remains open

**DE**

> Eine vorgemerkte Frage wartet noch. Wenn es sich für euch beide weiterhin gut anfühlt, darf **{questionOwner}** sie **{otherPerson}** jetzt stellen. **{otherPerson}** darf sie ohne Begründung überspringen. Ihr könnt auch einfach hier enden.

**EN**

> One saved question is still waiting. If continuing still feels good to both of you, **{questionOwner}** may ask **{otherPerson}** now. **{otherPerson}** may pass without giving a reason. You can also simply end here.

#### `both` – no saved question remains open

**DE**

> Ihr könnt hier enden – oder gemeinsam eine freiwillige Bonusfrage nehmen: Welche Regel sollte euer nächstes absurd gutes Abenteuer haben?

**EN**

> You can end here—or take one optional bonus question together: What rule should your next absurdly good adventure have?

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
| Q22 | F | Wodurch baut sich Lust für dich eher auf: Tempo, Wiederholung, Abwechslung, Pausen – oder etwas anderes? | What tends to build pleasure for you: pace, repetition, variety, pauses—or something else? |
| Q23 | F | Wie zeigst du gern, dass sich etwas besonders gut anfühlt? | How do you like to show that something feels especially good? |
| Q24 | F | Was würde es dir leichter machen, darüber zu sprechen, was du in einer sexuellen Situation häufiger, seltener oder anders erleben möchtest – falls das für dich relevant ist? | What would make it easier to talk about something you might want more often, less often or differently in a sexual situation, if that is relevant to you? |

### Act III – VERTRAUEN / TRUST

| ID | Route | Deutsch | English |
|---|---|---|---|
| Q25 | Q/S/F | Woran merkst du in dir selbst ein klares Ja, ein Vielleicht oder ein Nein? | How do you recognise a clear yes, maybe or no within yourself? |
| Q26 | Q/S/F | Mit welchen Worten oder Zeichen möchtest du Zustimmung, Pause und Stopp ausdrücken? | What words or signals do you want to use to express consent, pause and stop? |
| Q27 | Q/S/F | Wie soll die andere Person nachfragen, wenn dein Signal nicht eindeutig ist? | How would you like the other person to check in when your signal is unclear? |
| Q28 | Q/S/F | Was brauchst du nach einem intensiven intimen Moment: Nähe, Abstand, Berührung, Ruhe oder etwas anderes? | What do you need after an intense intimate moment: closeness, space, touch, quiet or something else? |
| Q29 | S/F | Was hilft dir, ein Nein oder einen Sinneswandel leicht auszusprechen und gut angenommen zu wissen? | What helps you voice a no or a change of mind easily and trust that it will be received well? |
| Q30 | S/F | Welche Grenze, Verhütung oder Schutzmaßnahme darf niemals bloß angenommen werden? | What boundary, contraception or protection measure must never simply be assumed? |
| Q31 | S/F | Welche Gespräche über Tests, Barrieren, Verhütung oder andere Schutzmaßnahmen brauchst du, bevor sich sexuelle Nähe sicher genug anfühlt? | What conversations about testing, barriers, contraception or other protection do you need before sexual intimacy feels safe enough? |
| Q32 | S/F | Wie möchtest du, dass erneut nach Zustimmung gefragt wird, wenn sich eine sexuelle Aktivität verändert oder intensiviert? | How would you like consent to be checked again when a sexual activity changes or becomes more intense? |
| Q33 | F | Welche Absprachen zu Exklusivität, weiteren Kontakten oder Privatsphäre sind für dich wichtig – falls das für eure Situation relevant ist? | What agreements about exclusivity, other partners or privacy matter to you, if they are relevant to your situation? |
| Q34 | F | Gibt es körperliche Bedürfnisse, Empfindlichkeiten oder Zugänglichkeitsaspekte, über die du vor Intimität sprechen möchtest? | Are there any physical needs, sensitivities or accessibility considerations you would want to discuss before intimacy? |
| Q35 | F | Wie wünschst du dir einen Check-in am nächsten Tag – wenn überhaupt? | How would you like to check in the next day, if at all? |
| Q36 | F | Welche eine Sache soll dein Gegenüber aus diesem Gespräch mitnehmen, ohne daraus eine Erwartung für heute oder später abzuleiten? | What is one thing you want the other person to take from this conversation without turning it into an expectation for today or later? |

### Question 37

**Inactive editorial archive:** Late Night currently sets `privateMoment: 'none'` and must not enter a saved-question or secret-handoff flow on any route. The bilingual variants below are preserved verbatim for editorial traceability but must not be rendered. Any future Late Night finale still needs explicit opt-in, an equally prominent end option, and the repeated rule that **an answer is never consent to an action**.

#### `neither` – both saved questions remain open

**DE**

> Zwei vorgemerkte Fragen warten noch. Ihr könnt hier enden. Nur wenn ihr beide frei weitermachen möchtet, stellt ihr sie nacheinander; vor der zweiten Frage entscheidet ihr erneut. Jede Frage und jede Antwort darf ausgelassen werden. Eine Antwort ist Information, niemals Zustimmung zu einer Handlung.

**EN**

> Two saved questions are still waiting. You can end here. Only if you both freely want to continue, ask them one at a time and choose again before the second question. Either question or answer may be passed. An answer is information, never consent to an action.

#### `one` – exactly one saved question remains open

**DE**

> Eine vorgemerkte Frage wartet noch, aber niemand schuldet sie oder eine Antwort darauf. Ihr könnt hier enden. Nur wenn ihr beide frei weitermachen möchtet, darf **{questionOwner}** sie **{otherPerson}** stellen. **{otherPerson}** kann ohne Begründung passen. Eine Antwort ist Information, niemals Zustimmung zu einer Handlung.

**EN**

> One saved question is still waiting, but no one owes the question or an answer to it. You can end here. Only if you both freely want to continue may **{questionOwner}** ask **{otherPerson}**. **{otherPerson}** may pass without giving a reason. An answer is information, never consent to an action.

#### `both` – no saved question remains open

**DE**

> Ihr könnt hier enden. Wenn ihr beide noch eine freiwillige letzte Gesprächsfrage möchtet: Was würde zukünftige Gespräche über Sex für dich noch ehrlicher und sicherer machen? Auch diese Frage darf übersprungen werden; aus keiner Antwort entsteht eine Handlungserwartung.

**EN**

> You can end here. If you both want one optional final conversation prompt: What would make future conversations about sex feel even more honest and safe for you? You may skip this question too; no answer creates an expectation of action.

### Final editorial checks for LATE NIGHT

- No question assumes that the two people have had, are having, or will have sex with each other.
- No question assumes gender, orientation, anatomy, ability to orgasm, experience, monogamy, or a current relationship.
- No question asks about assault, trauma, number of previous partners, or a “worst” sexual experience.
- Fantasies and kinks are treated as conversation topics, never as suggestions or implied offers.
- Depending on the situation, safer sex includes testing, barriers, contraception, other protective measures, relevant agreements, and accessibility; pregnancy risk is not assumed universally.
- Every question remains individually passable even after an earlier positive answer. Consent is not inferred from earlier answers, body language, or starting the pack.
- A separate Austrian youth-protection, media-law, and privacy review remains required before public release; this question catalog is not legal approval.
