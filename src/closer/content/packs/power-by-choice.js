import { NO_TWISTS, ROUTE_NEUTRAL_BLURB, ROUTE_PRESETS } from '../shared';

const questions = [
  [
    ['Was ist für dich erotisch daran, Kontrolle zu übernehmen, sie abzugeben oder zwischen beidem zu wechseln?', 'What feels erotic to you about taking control, giving it up, or moving between the two?'],
    ['Welche Seite von Machtaustausch zieht dich am stärksten an – Befehle, Gehorsam, Rituale, Lob, Erniedrigung, Service, Orgasmuskontrolle oder etwas anderes?', 'Which side of power exchange draws you most—commands, obedience, ritual, praise, degradation, service, orgasm control, or something else?'],
    ['Was bedeuten Begriffe wie dominant, submissiv, Switch, Top oder Bottom für dich – wenn sie überhaupt etwas bedeuten?', 'What do terms such as dominant, submissive, switch, top, or bottom mean to you—if they mean anything at all?'],
    ['Wenn du an eine freiwillige erotische Machtszene denkst: Welches erste Bild oder welcher Moment kommt dir in den Kopf?', 'When you imagine a chosen erotic power scene, what first image or moment comes to mind?'],
    ['Was kann Autorität für dich erotisch machen, statt bloß streng oder kontrollierend zu wirken?', 'What can make authority feel erotic to you rather than merely strict or controlling?'],
    ['Was könnte sich an Hingabe lustvoll anfühlen – Entlastung, Intensität, Verletzlichkeit, Aufmerksamkeit oder etwas anderes?', 'What could feel pleasurable about surrender—release, intensity, vulnerability, attention, or something else?'],
    ['Welche Sprache kann für dich erotische Macht tragen – ein Titel, ein Befehl, eine Erlaubnis, Lob oder etwas anderes?', 'What language can carry erotic power for you—a title, a command, permission, praise, or something else?'],
    ['Wie wirken Lob und Erniedrigung auf dich: Was könnte dich anmachen, und welche Worte würden die Stimmung sofort zerstören?', 'How do praise and degradation affect you: what might turn you on, and what words would immediately ruin the mood?'],
    ['Welche Wirkung können Kleidung, Körperhaltung, Knien, Warten oder ein Ritual in einer Machtfantasie haben?', 'What effect can clothing, posture, kneeling, waiting, or ritual have in a power fantasy?'],
    ['Was hält eine Machtfantasie für dich verspielt und erotisch, statt sie wie eine Prüfung oder Aufführung wirken zu lassen?', 'What keeps a power fantasy playful and erotic for you rather than making it feel like a test or performance?'],
    ['Was könnte an Service oder daran, bedient zu werden, erotisch sein?', 'What could feel erotic about service or being served?'],
    ['Wo möchtest du eine klare Grenze zwischen freiwillig gewählten erotischen Rollen und Entscheidungen im Alltag ziehen?', 'Where would you want a clear boundary between chosen erotic roles and everyday decisions?'],
  ],
  [
    ['Welcher Befehl könnte für dich heiß sein, ihn zu geben oder zu erhalten – zumindest in der Fantasie?', 'What command might feel hot for you to give or receive—at least in fantasy?'],
    ['Welche Titel oder Besitzsprache könnten dich anmachen, und welche würden überhaupt nicht zu dir passen?', 'What titles or ownership language might turn you on, and what would not suit you at all?'],
    ['Welche Art von Ritual oder Service könnte erotische Spannung aufbauen, bevor überhaupt etwas Körperliches passiert?', 'What kind of ritual or service could build erotic tension before anything physical happens?'],
    ['Welche Form von Kontrolle reizt dich am meisten – über Bewegung, Sprache, Blickkontakt, Tempo, Berührung oder Orgasmus?', 'What kind of control excites you most—over movement, speech, eye contact, pace, touch, or orgasm?'],
    ['Welche Art von Lob oder Erniedrigung würdest du gern hören, und wie müsste sie klingen, damit sie wirklich wirkt?', 'What kind of praise or degradation would you like to hear, and how would it need to sound to truly work for you?'],
    ['Welche Fantasie rund um Fesseln, Schläge oder Sinnesreize findest du interessant – auch wenn sie nur Gesprächsstoff bleibt?', 'What fantasy involving restraint, impact, or sensory play interests you—even if it remains only something to discuss?'],
    ['Was reizt dich an Orgasmuskontrolle, Erlaubnis, Edging oder bewusstem Verweigern – oder lässt dich daran kalt?', 'What excites you about orgasm control, permission, edging, or deliberate denial—or leaves you cold?'],
    ['Welche Körperhaltung oder Form des Präsentierens könnte sich in einer Machtfantasie besonders aufgeladen anfühlen?', 'What posture or form of presentation could feel especially charged in a power fantasy?'],
    ['Was könnte daran erotisch sein, beobachtet, vorgeführt oder ganz bewusst im Mittelpunkt der Aufmerksamkeit zu sein?', 'What could feel erotic about being watched, displayed, or deliberately made the centre of attention?'],
    ['Welcher Teil einer Machtfantasie müsste am klarsten besprochen werden, damit sie aufregend statt verunsichernd wirkt?', 'Which part of a power fantasy would need the clearest discussion for it to feel exciting rather than unsettling?'],
    ['Welche Worte oder Signale sollen in einer intensiven Dynamik eindeutig langsamer, Pause und Stopp bedeuten?', 'What words or signals should unambiguously mean slow down, pause, and stop in an intense dynamic?'],
    ['Bei welchen Themen – etwa Fesseln, Schlägen oder intensiven Sinnesreizen – würdest du zuerst fundiertes Wissen statt spontanes Ausprobieren wollen?', 'For which topics—such as restraint, impact, or intense sensory play—would you want sound knowledge before any spontaneous experimentation?'],
  ],
  [
    ['Wie soll eine erotische Machtdynamik enden: sofort auflösen, langsam ausklingen oder noch eine Weile spielerisch nachwirken?', 'How should an erotic power dynamic end: dissolve immediately, fade gradually, or linger playfully for a while?'],
    ['Welche Form von Fürsorge passt nach einer intensiven Situation zu dir – Nähe, Worte, praktische Hilfe, Humor, Ruhe oder etwas anderes?', 'What kind of care suits you after an intense situation—closeness, words, practical help, humour, quiet, or something else?'],
    ['Was hilft dir, nach einer Rolle wieder vollständig im gleichwertigen Alltag anzukommen?', 'What helps you return fully to an equal everyday relationship after a role ends?'],
    ['Welche Worte oder Gesten würden dir nach einer intensiven Rolle das Gefühl geben, begehrt und gut aufgehoben zu sein?', 'What words or gestures would make you feel desired and cared for after an intense role?'],
    ['Welche Privatsphäre rund um Fantasien, Rollen oder solche Gespräche ist dir wichtig?', 'What privacy around fantasies, roles, or conversations like this matters to you?'],
    ['Wie sollte jemand reagieren, wenn eure Rollenwünsche oder Kinks nicht übereinstimmen?', 'How would you like someone to respond if your desired roles or kinks do not match?'],
    ['Was soll dein Gegenüber darüber verstehen, was erotische Macht für dich reizvoll macht?', 'What would you like the other person to understand about what makes erotic power appealing to you?'],
    ['Welche Machtfantasie würdest du gern einmal genauer beschreiben, ohne daraus einen Plan zu machen?', 'What power fantasy would you like to describe in more detail without turning it into a plan?'],
    ['Welcher Teil einer Fantasie soll für dich lieber Fantasie bleiben – und was macht ihn gerade dort so reizvoll?', 'What part of a fantasy would you rather keep as fantasy—and what makes it so compelling there?'],
    ['Was hast du heute gehört, das dich überrascht, neugierig gemacht oder vielleicht angemacht hat?', 'What did you hear today that surprised you, made you curious, or perhaps turned you on?'],
    ['Was muss außerhalb jeder freiwillig gewählten Machtdynamik über Gleichwertigkeit, Freiheit und Respekt unverändert bleiben?', 'What must remain unchanged about equality, freedom, and respect outside every chosen power dynamic?'],
    ['Wenn aus diesem Gespräch kein Plan entsteht: Welches Element möchtest du trotzdem in deiner Fantasie mitnehmen?', 'If no plan comes from this conversation, what element would you still like to carry into your imagination?'],
  ],
];

const actMeta = [
  {
    id: 'curiosity',
    title: { de: 'NEUGIER', en: 'CURIOSITY' },
    intro: { de: 'Kontrolle, Hingabe und die Bilder, die erotische Macht für euch auflädt.', en: 'Control, surrender, and the images that make erotic power feel charged for you.' },
    breakText: { de: 'Ihr habt dem Reiz von Macht eine Sprache gegeben.', en: 'You gave language to the appeal of power.' },
  },
  {
    id: 'negotiation',
    title: { de: 'SPIELRAUM', en: 'PLAYSPACE' },
    intro: { de: 'Befehle, Rituale, Kontrolle und Fantasien – konkret, aber weiterhin nur Gespräch.', en: 'Commands, ritual, control, and fantasies—specific, while still remaining conversation.' },
    breakText: { de: 'Eine Fantasie darf intensiv sein, ohne ein Plan zu werden.', en: 'A fantasy may be intense without becoming a plan.' },
  },
  {
    id: 'care',
    title: { de: 'NACHKLANG', en: 'AFTERGLOW' },
    intro: { de: 'Was nach einer Rolle bleibt: Fürsorge, Neugier und das, was in der Fantasie weiterwirkt.', en: 'What remains after a role: care, curiosity, and what continues in the imagination.' },
    breakText: { de: 'Ihr habt Macht als Fantasie erkundet, ohne euch Rollen zuzuschreiben.', en: 'You explored power as fantasy without assigning roles to each other.' },
  },
];

const acts = actMeta.map((act, actIndex) => ({
  ...act,
  questions: questions[actIndex].map(([de, en], questionIndex) => ({
    id: `power-by-choice-q${String(actIndex * 12 + questionIndex + 1).padStart(2, '0')}`,
    de,
    en,
    ...(actIndex === 2 && questionIndex === 11 ? { last: true } : {}),
  })),
}));

const card = (de, en) => ({ de, en });

export const POWER_BY_CHOICE_PACK = {
  id: 'power-by-choice',
  discoverability: 'menu-unlock',
  contentGroup: 'adult',
  discoveryNoticeKey: 'powerByChoiceMenuIntro',
  privateMoment: 'none',
  title: { de: 'POWER, BY CHOICE', en: 'POWER, BY CHOICE' },
  meta: { de: '18+ · Macht, Hingabe und Fantasie', en: '18+ · Power, surrender, and fantasy' },
  blurb: {
    de: 'Ein explizites Gespräch über freiwillig gewählte erotische Macht – ohne Rollenvergabe oder Aufgaben.',
    en: 'An explicit conversation about chosen erotic power—without assigned roles or tasks.',
  },
  positioning: {
    de: 'Ein ausdrücklich erotisches Gespräch für zwei Erwachsene. Klärt vor dem Start kurz miteinander, ob das Thema für euch beide gerade passt. Sprecht Wünsche, Änderungen und ein Ende direkt miteinander aus. Fantasie, Gespräch und konkrete Zustimmung bleiben getrennt; keine Antwort erlaubt eine Handlung.',
    en: 'An explicitly erotic conversation for two adults. Before starting, briefly check with each other that the topic feels right for both of you now. Communicate wishes, changes, and an end directly to each other. Fantasy, conversation, and specific consent remain separate; no answer authorizes an action.',
  },
  acts,
  modes: [{
    id: 'conversation',
    title: { de: 'GESPRÄCH', en: 'CONVERSATION' },
    meta: { de: 'Explizit und ohne Rollenzuweisung', en: 'Explicit, with no assigned roles' },
    blurb: ROUTE_NEUTRAL_BLURB,
    twists: NO_TWISTS,
  }],
  actStyle: [
    { accent: '#DA8CFF', chrome: 1, progress: 'full', glow: 0.24 },
    { accent: '#B979E8', chrome: 0.5, progress: 'count', glow: 0.14 },
    { accent: '#9A75C4', chrome: 0.22, progress: 'number', glow: 0.06 },
  ],
  q37: { neither: card('', ''), one: () => '', both: card('', '') },
  secretAtIndex: 27,
  routes: {
    quick: { ...ROUTE_PRESETS.quick, minutes: 24, actIndices: [[0, 3, 6, 9], [0, 3, 6, 9], [0, 3, 6, 9]] },
    standard: { ...ROUTE_PRESETS.standard, minutes: 45, actIndices: [[0, 1, 3, 4, 6, 7, 9, 11], [0, 1, 3, 4, 6, 7, 9, 10], [0, 1, 3, 4, 6, 7, 9, 10]] },
    full: { ...ROUTE_PRESETS.full, minutes: 70 },
  },
  defaultRouteId: 'standard',
  defaultTimerEnabled: false,
  directFinale: {
    de: 'Damit endet POWER, BY CHOICE. Was Fantasie bleibt und was ihr später weiter besprecht, entscheidet ihr außerhalb des Spiels.',
    en: 'This is the end of POWER, BY CHOICE. What remains fantasy and what you discuss further later is for you to decide outside the game.',
  },
};
