import { NO_TWISTS, ROUTE_NEUTRAL_BLURB, ROUTE_PRESETS } from '../shared';

const questions = [
  [
    ['Wenn du an einvernehmlichen Machtaustausch denkst: Was macht das Thema für dich neugierig, interessant oder auch uninteressant?', 'When you think about consensual power exchange, what makes the topic feel intriguing, interesting, or not for you?'],
    ['Welcher Teil des Themas interessiert dich am ehesten – Rollen, Sprache, Vertrauen, Rituale, Empfindungen, Fantasie, etwas anderes oder keiner davon?', 'Which part of the topic interests you most—roles, language, trust, ritual, sensation, fantasy, something else, or none of these?'],
    ['Was bedeuten Begriffe wie dominant, submissiv, Switch, Top oder Bottom für dich – wenn sie überhaupt etwas bedeuten?', 'What do terms such as dominant, submissive, switch, top, or bottom mean to you—if they mean anything at all?'],
    ['Wie unterscheidest du eine Fantasie, über die du gern sprichst, von etwas, das du im echten Leben vielleicht wollen würdest?', 'How do you distinguish a fantasy you enjoy discussing from something you might want in real life?'],
    ['Kann sich eine Rolle für dich wie Identität, gelegentliche Vorliebe, Experiment, gar nichts davon oder etwas anderes anfühlen?', 'Could a role feel like an identity, an occasional preference, an experiment, none of these, or something else to you?'],
    ['Wodurch könnten sich Rollenwünsche je nach Person, Situation oder Tag verändern – oder für dich gleich bleiben?', 'What might make role preferences change with the person, situation, or day—or stay the same for you?'],
    ['Was würde dieses Gespräch neugierig statt wie eine Prüfung oder Erwartung wirken lassen?', 'What would make this conversation feel curious rather than like a test or expectation?'],
    ['Welche Sprache über Macht wirkt auf dich einladend, neutral oder abschreckend?', 'What language about power feels inviting, neutral, or off-putting to you?'],
    ['Welche Annahme über Dominanz oder Submission würdest du gern aus diesem Gespräch heraushalten?', 'What assumption about dominance or submission would you most like to keep out of this conversation?'],
    ['Was würde helfen, damit dieses Gespräch angenehm, freiwillig und jederzeit leicht zu beenden bleibt?', 'What would help this conversation stay comfortable, optional, and easy to end at any time?'],
    ['Was könnte jemand zu diesem Thema sagen, ohne eigene Erfahrungen oder Interessen offenzulegen?', 'What could someone say about this topic without disclosing their own experience or interests?'],
    ['Wo möchtest du eine klare Grenze zwischen freiwillig gewählten erotischen Rollen und Entscheidungen im Alltag ziehen?', 'Where would you want a clear boundary between chosen erotic roles and everyday decisions?'],
  ],
  [
    ['Wie sollte jemand fragen, ob ein Gespräch über Machtaustausch gerade willkommen ist?', 'How would you like someone to ask whether a conversation about power exchange is welcome right now?'],
    ['Welche Informationen bräuchtest du, um eine Idee als „nur besprechbar“, „später recherchieren“, „vielleicht“ oder „nein“ einzuordnen?', 'What information would you need to place an idea under “discussion only,” “research later,” “maybe,” or “no”?'],
    ['Wie würdest du klare Neins, bedingte Vielleichts und offene Fragen benennen – oder passen andere Begriffe besser?', 'How would you name clear noes, conditional maybes, and open questions—or would different terms fit better?'],
    ['Welche Wörter oder Signale sollten in einem zukünftigen Gespräch „langsamer“, „Pause“ und „Stopp“ bedeuten?', 'What words or signals should mean “slow down,” “pause,” and “stop” in a future conversation?'],
    ['Was sollte sofort passieren, wenn jemand seine Meinung ändert?', 'What should happen immediately when someone changes their mind?'],
    ['Wenn Worte schwerfallen: Welche Anzeichen sollten zu Stopp und Nachfragen führen statt zu einer Annahme?', 'When words are difficult, what signs should lead to stopping and checking in rather than making an assumption?'],
    ['Was macht es leicht, ein „Vielleicht“ als Vielleicht stehen zu lassen, ohne Überredung?', 'What makes it easy to leave a “maybe” as a maybe without persuasion?'],
    ['Wie kann jemand prüfen, ob etwas richtig verstanden wurde, ohne deine Antwort wie einen Vertrag zu behandeln?', 'How can someone check understanding without treating your answer like a contract?'],
    ['Welche Formulierung hält eine Idee klar im Bereich „nur besprechen“, ohne daraus einen Plan oder eine Erwartung zu machen?', 'What wording keeps an idea clearly in “discussion only,” without turning it into a plan or expectation?'],
    ['Wie können zwei Menschen eine Regel im Rollenspiel von einer echten Grenze im Alltag unterscheiden?', 'How can two people distinguish a role-play rule from a real-life boundary?'],
    ['Woran würde man merken, dass eine Absprache veränderbar bleibt statt festgeschrieben zu sein?', 'What would show that an agreement remains revisable rather than fixed?'],
    ['Woran würdest du erkennen, dass Fachwissen nötig ist, statt von einer Gesprächs-App oder durch Ausprobieren zu lernen?', 'What would tell you that specialist knowledge is needed rather than learning from a conversation app or by experimenting?'],
  ],
  [
    ['Welche Reaktion würde dir zeigen, dass ein Stopp oder Meinungswechsel gut angenommen wird?', 'What response would show you that a stop or change of mind will be received well?'],
    ['Was hilft dir nach einem intensiven Gespräch zurück in den Alltag: Nähe, Abstand, Humor, Ruhe, späteres Nachfragen oder etwas anderes?', 'After an intense conversation, what helps you return to ordinary connection: closeness, space, humor, quiet, a later check-in, or something else?'],
    ['Wie könnte Fürsorge nach einer intensiven Situation für beide Menschen unterschiedlich aussehen – unabhängig von ihrer Rolle?', 'How might care after an intense situation look different for each person, regardless of role?'],
    ['Wie könnte ein hilfreiches Nachfragen am nächsten Tag klingen – falls es gewünscht ist?', 'What could a helpful next-day check-in sound like—if one is wanted?'],
    ['Welche Reaktion fühlt sich fürsorglich an, wenn jemand nur allgemein oder hypothetisch antwortet?', 'What response feels caring when someone answers only generally or hypothetically?'],
    ['Welche Privatsphäre rund um Fantasien, Rollen oder solche Gespräche wäre dir wichtig?', 'What privacy around fantasies, roles, or conversations like this would matter to you?'],
    ['Was macht den Satz „Ich möchte darüber nur sprechen“ leicht verständlich und respektierbar?', 'What makes “I only want to talk about this” easy to understand and respect?'],
    ['Wie sollte jemand reagieren, wenn eure Interessen oder Rollenwünsche nicht übereinstimmen?', 'How would you like someone to respond if your interests or role preferences do not match?'],
    ['Welche Reaktion hilft, wenn jemand kein Interesse hat, ohne nach einem tieferen Grund zu suchen?', 'What response helps when someone is not interested, without looking for a deeper reason?'],
    ['Wie sieht Fürsorge aus, wenn eine Person das Thema früher beenden möchte?', 'What does care look like when one person wants to end the topic sooner?'],
    ['Was sollte außerhalb jeder freiwillig gewählten Machtdynamik über Gleichwertigkeit und Respekt unverändert bleiben?', 'What should remain unchanged about equal worth and respect outside any chosen power dynamic?'],
    ['Welcher eine Grundsatz sollte ein zukünftiges Gespräch über freiwillig gewählte Macht leiten, ohne einen Plan zum Handeln zu bedeuten?', 'What one principle should guide a future conversation about chosen power without implying a plan to act?'],
  ],
];

const actMeta = [
  {
    id: 'curiosity',
    title: { de: 'NEUGIER', en: 'CURIOSITY' },
    intro: { de: 'Begriffe, Fantasie und persönliche Bedeutungen – ohne Rollen festzulegen.', en: 'Language, fantasy, and personal meaning—without assigning roles.' },
    breakText: { de: 'Ihr habt das Thema geöffnet, ohne daraus eine Erwartung zu machen.', en: 'You opened the topic without turning it into an expectation.' },
  },
  {
    id: 'negotiation',
    title: { de: 'ABSPRACHE', en: 'NEGOTIATION' },
    intro: { de: 'Wie Vielleicht, Nein, Stopp und veränderbare Absprachen verständlich bleiben.', en: 'How maybe, no, stop, and revisable agreements remain clear.' },
    breakText: { de: 'Klarheit ist kein Vertrag – und ein Vielleicht bleibt ein Vielleicht.', en: 'Clarity is not a contract—and a maybe remains a maybe.' },
  },
  {
    id: 'care',
    title: { de: 'FÜRSORGE', en: 'CARE' },
    intro: { de: 'Stoppen gut annehmen, Unterschiede respektieren und wieder im Alltag ankommen.', en: 'Receiving a stop well, respecting differences, and returning to ordinary connection.' },
    breakText: { de: 'Ihr habt über Fürsorge gesprochen, ohne heute etwas entscheiden zu müssen.', en: 'You discussed care without needing to decide anything today.' },
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
  meta: { de: '18+ · Rollen, Grenzen und Fürsorge', en: '18+ · Roles, boundaries, and care' },
  blurb: {
    de: 'Ein Gespräch über freiwillig gewählte erotische Macht – ohne Aufgaben oder Kompatibilitätstest.',
    en: 'A conversation about chosen erotic power—without tasks or a compatibility test.',
  },
  positioning: {
    de: 'Ein research-informiertes Gespräch für zwei Erwachsene. Klärt vor dem Start kurz miteinander, ob das Thema für euch beide gerade passt. Sagt direkt Bescheid, wenn ihr eine Frage auslassen, das Thema wechseln oder aufhören möchtet. Fantasie, Gespräch und konkrete Zustimmung bleiben getrennt; keine Antwort erlaubt eine Handlung.',
    en: 'A research-informed conversation for two adults. Before starting, briefly check with each other that the topic feels right for both of you now. Say so directly if you want to skip a question, change the subject, or stop. Fantasy, conversation, and specific consent remain separate; no answer authorizes an action.',
  },
  acts,
  modes: [{
    id: 'conversation',
    title: { de: 'GESPRÄCH', en: 'CONVERSATION' },
    meta: { de: 'Direkt und druckfrei', en: 'Direct and pressure-free' },
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
    de: 'Was würde ein zukünftiges Gespräch über freiwillig gewählte Macht für dich klarer und angenehmer machen? Ihr müsst heute nichts entscheiden oder ausprobieren.',
    en: 'What would make a future conversation about chosen power feel clearer and more comfortable for you? You do not need to decide or try anything today.',
  },
};
