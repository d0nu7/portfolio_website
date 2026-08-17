/*
 * FR-005: approved pack-specific Private Moments.
 *
 * These objects contain only static bilingual product copy and routing
 * metadata. Participants keep every actual question, appreciation, memory,
 * intention, or spark in their own minds; none of it enters application
 * state. `routes` is an allow-list, and trigger/use question IDs are stable
 * content IDs rather than route-relative positions.
 */

const shared = {
  offer: {
    de: 'Gleich sieht jede Person eine andere, freiwillige Karte. Jede Person kann sie im Kopf behalten oder „Heute nicht“ wählen. Keine Wahl wird der anderen Person angezeigt. Gebt nichts ein und macht keinen Screenshot.',
    en: 'Each person will see a different optional card. Each person may keep it in mind or choose “Not today.” Their choice will not be shown to the other person. Do not type anything or take a screenshot.',
  },
  returnCopy: {
    de: 'Legt das Handy wieder zwischen euch. Niemand muss sagen, was auf der eigenen Karte stand oder welche Wahl getroffen wurde.',
    en: 'Put the phone back between you. Nobody needs to say what their card said or which choice they made.',
  },
};

const CLASSIC_PRIVATE_MOMENT = {
  id: 'classic-saved-questions',
  routes: ['full'],
  trigger: { kind: 'before-question', questionId: 'classic-q28' },
  use: {
    kind: 'classic-finale',
    twoPending: {
      de: 'Zwei vorgemerkte Fragen sind noch offen. Ihr könnt hier enden. Wenn ihr beide weitermachen möchtet, beginnt {A}; vor {B}s Frage entscheidet ihr erneut. Jede Frage und jede Antwort darf ohne Begründung ausgelassen werden.',
      en: 'Two saved questions are still open. You can end here. If you both want to continue, {A} goes first; you will choose again before {B}’s question. Either question or answer may be passed without explanation.',
    },
    onePending: {
      de: 'Eine vorgemerkte Frage ist noch offen. {who} darf sie {other} stellen, wenn ihr beide weitermachen möchtet. Die Frage und die Antwort dürfen ausgelassen werden.',
      en: 'One saved question is still open. {who} may ask {other} if you both want to continue. Either the question or the answer may be passed.',
    },
    nonePending: {
      de: 'Keine vorgemerkte Frage ist mehr offen. Ihr könnt hier enden – oder gemeinsam eine freiwillige letzte Frage nehmen. Keine Antwort ist geschuldet.',
      en: 'No saved question remains open. You can end here—or take one optional shared closer. No answer is owed.',
    },
    bonus: {
      de: 'Welche Frage hätte dieses Gespräch gut abgerundet? Ihr müsst sie nicht beantworten.',
      en: 'What question would have rounded out this conversation well? You do not have to answer it.',
    },
    turn: {
      de: '{who}, du darfst deine vorgemerkte Frage stellen. {other} darf ohne Begründung passen.',
      en: '{who}, you may ask the question you saved. {other} may pass without explanation.',
    },
  },
  offer: shared.offer,
  returnCopy: shared.returnCopy,
  cards: [
    {
      body: {
        de: 'Denk an etwas, das {other} heute gesagt hat und worüber du ehrlich neugierig bist. Formuliere im Kopf eine offene Nachfrage dazu. Sag sie nicht laut und gib sie nirgends ein. Du darfst sie später stellen oder jederzeit verwerfen.',
        en: 'Think of something {other} said tonight that made you genuinely curious. Form one open follow-up question in your mind. Do not say it aloud or type it anywhere. You may ask it later or discard it at any time.',
      },
      action: { de: 'Ich habe eine Frage', en: 'I have a question' },
    },
    {
      body: {
        de: 'Denk an eine Seite von {other}s Sicht, die heute noch keinen Raum hatte. Formuliere im Kopf eine offene Frage, die keine Antwort unterstellt. Sag sie nicht laut und gib sie nirgends ein. Du darfst sie später stellen oder jederzeit verwerfen.',
        en: 'Think of a part of {other}’s perspective that has not had room tonight. Form one open question that does not assume its answer. Do not say it aloud or type it anywhere. You may ask it later or discard it at any time.',
      },
      action: { de: 'Ich habe eine Frage', en: 'I have a question' },
    },
  ],
};

const FIRST_DATE_PRIVATE_MOMENT = {
  id: 'first-date-curiosities',
  routes: ['standard', 'full'],
  trigger: { kind: 'after-act', act: 1 },
  use: {
    kind: 'finale',
    intro: {
      de: 'Wenn ihr möchtet, könnt ihr die zwei verschiedenen privaten Fragen jetzt nacheinander nutzen. {A} beginnt mit einer Nachfrage zu einer Begeisterung; danach kann {B} eine Frage zu einer Alltagsvorliebe stellen. Jede Frage und jede Antwort darf ausgelassen werden. Keine Antwort verspricht ein weiteres Date.',
      en: 'If you like, you may use the two different private questions now. {A} begins with a follow-up about an interest; {B} may then ask about an everyday preference. Either question or answer may be passed. No answer promises another date.',
    },
    turns: [
      {
        de: '{who}, wenn du eine Frage behalten hast, kannst du sie jetzt stellen. {other} darf ohne Begründung passen.',
        en: '{who}, if you kept a question, you may ask it now. {other} may pass without explanation.',
      },
      {
        de: '{who}, wenn du eine Frage behalten hast, kannst du sie jetzt stellen. {other} darf ohne Begründung passen.',
        en: '{who}, if you kept a question, you may ask it now. {other} may pass without explanation.',
      },
    ],
    skipped: {
      de: 'Ihr könnt hier enden. Nichts aus diesem Gespräch verspricht ein weiteres Date.',
      en: 'You can end here. Nothing in this conversation promises another date.',
    },
  },
  offer: shared.offer,
  returnCopy: shared.returnCopy,
  cards: [
    {
      body: {
        de: 'Denk an eine leichte Nachfrage zu etwas, wofür sich {other} begeistert oder worauf sich {other} freut. Sie darf neugierig sein, aber nichts über Anziehung, Zustimmung oder ein weiteres Date voraussetzen. Behalte sie im Kopf; gib sie nirgends ein.',
        en: 'Think of one light follow-up about something {other} enjoys or is looking forward to. It may be curious, but it must not assume attraction, consent, or another date. Keep it in mind; do not type it anywhere.',
      },
      action: { de: 'Ich habe eine Frage', en: 'I have a question' },
    },
    {
      body: {
        de: 'Denk an eine leichte Frage zu einer alltäglichen Vorliebe von {other} – etwa zu Essen, Routinen, Orten oder kleinen Freuden. Mach daraus keinen Kompatibilitätstest. Behalte sie im Kopf; gib sie nirgends ein.',
        en: 'Think of one light question about an everyday preference of {other}—such as food, routines, places, or small pleasures. Do not turn it into a compatibility test. Keep it in mind; do not type it anywhere.',
      },
      action: { de: 'Ich habe eine Frage', en: 'I have a question' },
    },
  ],
};

const DATE_NIGHT_PRIVATE_MOMENT = {
  id: 'date-night-appreciation',
  routes: ['standard', 'full'],
  trigger: { kind: 'after-act', act: 1 },
  use: {
    kind: 'finale',
    intro: {
      de: 'Wenn ihr möchtet, kann {A} zuerst die Wertschätzung teilen; danach kann {B} das mögliche Detail für ein künftiges Date nennen. Beides darf privat bleiben. Niemand muss reagieren oder zustimmen; daraus entstehen weder ein Plan noch Zustimmung zu Nähe.',
      en: 'If you like, {A} may share the appreciation first; {B} may then name the possible future-date detail. Either may remain private. Nobody has to respond or agree; neither creates a plan or consent to intimacy.',
    },
    turns: [
      {
        de: '{who}, wenn du eine Wertschätzung behalten hast, kannst du sie jetzt in einem Satz teilen. {other} muss sie nicht erwidern.',
        en: '{who}, if you kept an appreciation in mind, you may share it in one sentence. {other} does not have to reciprocate.',
      },
      {
        de: '{who}, wenn du ein mögliches Detail behalten hast, kannst du es jetzt nennen. Es ist kein Plan und keine Einladung.',
        en: '{who}, if you kept a possible detail in mind, you may name it now. It is not a plan or invitation.',
      },
    ],
    skipped: {
      de: 'Ihr könnt hier enden. Was ihr geteilt habt, ist keine Einladung zu mehr Nähe und kein Plan für später.',
      en: 'You can end here. What you shared is not an invitation to greater intimacy or a plan for later.',
    },
  },
  offer: shared.offer,
  returnCopy: shared.returnCopy,
  cards: [
    {
      body: {
        de: 'Wähle eine konkrete, nicht körperbewertende Sache, die du heute an {other}s Art, Aufmerksamkeit oder Ausstrahlung schätzt. Du kannst sie im Finale benennen. Ein Kompliment ist keine Einladung zu mehr Nähe.',
        en: 'Choose one specific, non-body-evaluating thing you appreciate about {other}’s manner, attention, or presence tonight. You may name it in the finale. A compliment is not an invitation to greater intimacy.',
      },
      action: { de: 'Das behalte ich', en: 'I’ll keep this' },
    },
    {
      body: {
        de: 'Wähle ein kleines Detail, das ein mögliches künftiges Date angenehm machen könnte – eine Stimmung, einen Ortstyp, ein Essen, eine Aktivität oder etwas anderes. Behalte es als Möglichkeit, nicht als Einladung oder Versprechen.',
        en: 'Choose one small detail that could make a possible future date enjoyable—a mood, type of place, food, activity, or something else. Hold it as a possibility, not an invitation or promise.',
      },
      action: { de: 'Das behalte ich', en: 'I’ll keep this' },
    },
  ],
};

const COUPLES_PRIVATE_MOMENT = {
  id: 'couples-listening',
  routes: ['standard', 'full'],
  trigger: { kind: 'after-act', act: 1 },
  use: {
    kind: 'after-act',
    act: 2,
    copy: {
      de: 'Bevor ihr weitergeht: Wer eine Stärke im Kopf behalten hat, kann sie jetzt in einem Satz benennen. Zuhören reicht; niemand muss erwidern. Eine Wertschätzung löscht nichts Schwieriges aus. Die private Zuhör-Intention endet hier.',
      en: 'Before continuing: anyone who kept a quality in mind may name it in one sentence now. Listening is enough; nobody has to reciprocate. Appreciation does not erase anything difficult. The private listening intention ends here.',
    },
  },
  offer: shared.offer,
  returnCopy: shared.returnCopy,
  cards: [
    {
      body: {
        de: 'Nimm dir für Akt II vor, auf eine schwierige Antwort zuerst mit Zuhören zu reagieren: kurz spiegeln oder nachfragen, bevor du etwas lösen möchtest. Du musst dieses Vorhaben nicht ankündigen.',
        en: 'For Act II, intend to meet a difficult answer with listening first: briefly reflect or ask before trying to solve anything. You do not need to announce this intention.',
      },
      action: { de: 'Das probiere ich', en: 'I’ll try this' },
    },
    {
      body: {
        de: 'Denk an eine konkrete Stärke, die {other} in schwierige gemeinsame Momente einbringt. Du kannst sie am Ende von Akt II in einem Satz benennen. Nutze sie nicht, um etwas Schwieriges kleinzureden oder eine Gegenleistung zu erwarten.',
        en: 'Think of one specific quality {other} brings to difficult moments between you. You may name it in one sentence at the end of Act II. Do not use it to minimize anything difficult or expect something in return.',
      },
      action: { de: 'Ich habe eine Stärke im Kopf', en: 'I have a quality in mind' },
    },
  ],
};

const FRIENDS_PRIVATE_MOMENT = {
  id: 'friends-memory-celebration',
  routes: ['standard', 'full'],
  trigger: { kind: 'after-act', act: 2 },
  use: {
    kind: 'finale',
    intro: {
      de: 'Wenn ihr möchtet, kann {A} zuerst eine gemeinsame Erinnerung nennen und sagen, was sie {A} bedeutet. Danach kann {B} etwas aus dem heutigen Gespräch würdigen. Beides darf privat bleiben; niemand muss zustimmen, erwidern oder Nähe versprechen.',
      en: 'If you like, {A} may first name a shared memory and say what it means to {A}. {B} may then appreciate something from tonight’s conversation. Either may remain private; nobody has to agree, reciprocate, or promise closeness.',
    },
    turns: [
      {
        de: '{who}, wenn du eine Erinnerung behalten hast, kannst du sie jetzt nennen und sagen, was sie dir bedeutet. {other} muss dieselbe Version nicht bestätigen.',
        en: '{who}, if you kept a memory in mind, you may name it and say what it means to you. {other} does not have to confirm the same version.',
      },
      {
        de: '{who}, wenn du etwas aus dem Gespräch mitfeiern möchtest, kannst du es jetzt würdigen. Rat oder ein nächster Schritt sind nicht nötig.',
        en: '{who}, if you kept something from the conversation that you want to celebrate, you may appreciate it now. No advice or next step is needed.',
      },
    ],
    skipped: {
      de: 'Ihr könnt hier enden – oder noch eine freiwillige Frage nehmen: Was möchtest du, dass die andere Person aus diesem Gespräch über dich mitnimmt?',
      en: 'You can end here—or take one optional final question: What would you like the other person to take away from this conversation about you?',
    },
  },
  offer: shared.offer,
  returnCopy: shared.returnCopy,
  cards: [
    {
      body: {
        de: 'Denk an eine gemeinsame Erinnerung, die du im Finale gern kurz nennen würdest. Wähle etwas, das dir wichtig ist, ohne dass {other} dieselbe Bedeutung oder Version bestätigen muss.',
        en: 'Think of one shared memory you might like to name briefly in the finale. Choose something that matters to you without requiring {other} to confirm the same meaning or version.',
      },
      action: { de: 'Ich habe etwas im Kopf', en: 'I have something in mind' },
    },
    {
      body: {
        de: 'Denk an etwas, das {other} heute erzählt hat und das du ehrlich mitfeiern möchtest – klein oder groß. Kein Rat, kein Vergleich und kein nächster Schritt.',
        en: 'Think of something {other} shared tonight that you would genuinely like to celebrate—large or small. No advice, comparison, or next step.',
      },
      action: { de: 'Ich habe etwas im Kopf', en: 'I have something in mind' },
    },
  ],
};

const OLD_FRIENDS_PRIVATE_MOMENT = {
  id: 'old-friends-memory-lenses',
  routes: ['standard'],
  trigger: { kind: 'after-act', act: 1 },
  use: {
    kind: 'immediate',
    copy: {
      de: 'Falls ihr in Akt I über eine gemeinsame Erinnerung gesprochen habt, kann {A} jetzt ein konkretes Detail nennen; danach kann {B} sagen, wie sich derselbe Moment angefühlt hat oder was er heute bedeutet. Unterschiedliche Erinnerungen dürfen nebeneinanderstehen. Ihr sucht keine richtige Version, und beides darf privat bleiben.',
      en: 'If a shared memory came up in Act I, {A} may name one concrete detail now; {B} may then say how the same moment felt or what it means today. Different memories may stand side by side. You are not looking for the correct version, and either part may remain private.',
    },
  },
  offer: shared.offer,
  returnCopy: shared.returnCopy,
  cards: [
    {
      body: {
        de: 'Denk an ein konkretes sinnliches Detail aus der letzten gemeinsamen Erinnerung, über die ihr gesprochen habt – einen Ort, Klang, Gegenstand oder etwas Ähnliches. Behalte es als deine Erinnerung, nicht als Beweis. Wenn keine gemeinsame Erinnerung aufkam, wähle „Heute nicht“.',
        en: 'Think of one concrete sensory detail from the most recent shared memory you discussed—a place, sound, object, or something similar. Hold it as your memory, not as evidence. If no shared memory came up, choose “Not today.”',
      },
      action: { de: 'Ich habe etwas im Kopf', en: 'I have something in mind' },
    },
    {
      body: {
        de: 'Denk bei derselben Erinnerung daran, wie der Moment sich für dich angefühlt hat oder was er dir heute bedeutet. Behalte es als deine Perspektive, nicht als Korrektur. Wenn keine gemeinsame Erinnerung aufkam, wähle „Heute nicht“.',
        en: 'For that same memory, think about how the moment felt to you or what it means to you today. Hold it as your perspective, not as a correction. If no shared memory came up, choose “Not today.”',
      },
      action: { de: 'Ich habe etwas im Kopf', en: 'I have something in mind' },
    },
  ],
};

const DEEP_PRIVATE_MOMENT = {
  id: 'deep-listening',
  routes: ['standard', 'full'],
  trigger: { kind: 'after-act', act: 1 },
  use: {
    kind: 'after-act',
    act: 2,
    copy: {
      de: 'Die privaten Zuhör-Intentionen enden hier. Nichts muss nachbesprochen, eingeordnet oder gelöst werden. Ihr könnt mit Akt III weitergehen oder das Spiel beenden.',
      en: 'The private listening intentions end here. Nothing has to be revisited, categorized, or solved. You may continue to Act III or end the game.',
    },
  },
  offer: shared.offer,
  returnCopy: shared.returnCopy,
  cards: [
    {
      body: {
        de: 'Nimm dir für Akt II vor, nach einer intensiven Antwort zuerst in einem kurzen Satz zu spiegeln, was du verstanden hast – ohne die Person zu deuten oder zu diagnostizieren.',
        en: 'For Act II, intend to respond to an intense answer first with one brief sentence reflecting what you understood—without interpreting or diagnosing the person.',
      },
      action: { de: 'Das probiere ich', en: 'I’ll try this' },
    },
    {
      body: {
        de: 'Nimm dir für Akt II vor, nach einer intensiven Antwort einen Moment Stille zuzulassen, bevor du nachfragst. Nutze die Stille nicht, um mehr Offenheit zu erwarten.',
        en: 'For Act II, intend to allow a moment of silence after an intense answer before asking anything. Do not use the silence to expect greater disclosure.',
      },
      action: { de: 'Das probiere ich', en: 'I’ll try this' },
    },
  ],
};

const CHAOS_PRIVATE_MOMENT = {
  id: 'chaos-private-sparks',
  routes: ['standard', 'full'],
  trigger: { kind: 'before-question', questionId: 'chaos-q16' },
  use: {
    kind: 'question',
    questionId: 'chaos-q16',
    supplement: {
      de: 'Wenn du einen privaten Funken behalten hast, baue ihn ein. Niemand muss erraten, welche Karte die andere Person gesehen hat, und beide Funken dürfen ignoriert werden.',
      en: 'If you kept a private spark, work it in. Nobody has to guess which card the other person saw, and either spark may be ignored.',
    },
  },
  offer: shared.offer,
  returnCopy: shared.returnCopy,
  cards: [
    {
      body: {
        de: 'Dein privater Funke für die nächste gemeinsame Aufgabe: Das erfundene Unternehmen löst ein Problem, das wirklich niemand hat.',
        en: 'Your private spark for the next shared task: the invented business solves a problem that nobody actually has.',
      },
      action: { de: 'Funke gemerkt', en: 'Spark saved' },
    },
    {
      body: {
        de: 'Dein privater Funke für die nächste gemeinsame Aufgabe: Das Unternehmen bekommt einen dramatisch ernsten Namen für etwas völlig Albernes.',
        en: 'Your private spark for the next shared task: the business gets a dramatically serious name for something completely silly.',
      },
      action: { de: 'Funke gemerkt', en: 'Spark saved' },
    },
  ],
};

export {
  CLASSIC_PRIVATE_MOMENT,
  FIRST_DATE_PRIVATE_MOMENT,
  DATE_NIGHT_PRIVATE_MOMENT,
  COUPLES_PRIVATE_MOMENT,
  FRIENDS_PRIVATE_MOMENT,
  OLD_FRIENDS_PRIVATE_MOMENT,
  DEEP_PRIVATE_MOMENT,
  CHAOS_PRIVATE_MOMENT,
};
