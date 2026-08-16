import {
  DEEPER_AND_STAY,
  ROUTE_NEUTRAL_BLURB,
  RESPONSE_CARDS,
} from '../shared';

/* ======================================================================
 * DEEP (iteration 8 catalog rollout) -- content transcribed verbatim
 * from docs/closer/content/CLOSER_Fragenkatalog_DE_EN.md section 8.
 * Deliberately no Quick route ("keine Quick-Route" in the catalog) -- the
 * pack is meant for a genuinely intensive conversation, not a fast
 * on-ramp. Unlike FRIENDS/OLD FRIENDS/COUPLES/CHAOS, Standard here DOES
 * include Q36 (`last: true`), so no route-vs-closer mismatch applies.
 *
 * Response Cards (not yet a CloserGame.js feature): after Q01/Q21
 * CELEBRATE; after Q13 FOLLOW UP; after Q17/Q19/Q24 VALIDATE; after Q34
 * REFLECT (see catalog section 8 for exact wording).
 * ====================================================================== */

const DEEP_ACTS = [
  {
    id: 'beneath',
    numeral: { de: 'AKT I', en: 'ACT I' },
    title: { de: 'DARUNTER', en: 'BENEATH' },
    intro: {
      de: 'Ein bewusst intensives Gespräch -- Tiefe heißt hier nicht Trauma.',
      en: "A deliberately intensive conversation -- depth here doesn't mean trauma.",
    },
    breakText: {
      de: 'Ihr wisst jetzt ein paar Dinge übereinander, die ihr vor diesem Akt noch nicht wusstet.',
      en: "You now know a few things about each other you didn't before this act.",
    },
    breakSub: {
      de: 'Trinkt einen Schluck. Atmet.',
      en: 'Take a sip. Breathe.',
    },
    questions: [
      {
        id: 'deep-q01',
        de: 'Auf welchen konkreten Moment aus der letzten Zeit bist du still stolz – und warum?',
        en: 'What specific recent moment are you quietly proud of, and why?',
        responseCard: RESPONSE_CARDS.celebrateHonor,
      },
      {
        id: 'deep-q02',
        de: 'Welche Seite von dir wird selten gesehen, obwohl sie eigentlich kein Geheimnis ist?',
        en: 'What side of you is rarely seen even though it is not really a secret?',
      },
      {
        id: 'deep-q03',
        de: 'Welche konkrete Erfahrung kommt deinem Gefühl von Zuhause am nächsten?',
        en: 'What specific experience comes closest to your feeling of home?',
      },
      {
        id: 'deep-q04',
        de: 'Welche Wahrheit über dich selbst hast du erst spät verstanden?',
        en: 'What truth about yourself did you only come to understand later in life?',
      },
      {
        id: 'deep-q05',
        de: 'Welche Rolle spielst du oft, wenn du unsicher bist?',
        en: 'What role do you tend to play when you feel uncertain?',
      },
      {
        id: 'deep-q06',
        de: 'In welchem Umfeld fühlst du dich deiner eigenen Art zu sein am nächsten?',
        en: 'In what setting do you feel most like yourself?',
      },
      {
        id: 'deep-q07',
        de: 'Welche Emotion kannst du leicht zeigen, und welche hältst du eher zurück?',
        en: 'Which emotion can you show easily, and which one do you tend to hold back?',
      },
      {
        id: 'deep-q08',
        de: 'Welche Überzeugung über dich hast du hinter dir gelassen?',
        en: 'What belief about yourself have you left behind?',
      },
      {
        id: 'deep-q09',
        de: 'Wo erlebst du Zugehörigkeit, ohne etwas leisten oder darstellen zu müssen?',
        en: 'Where do you experience belonging without having to achieve or perform anything?',
      },
      {
        id: 'deep-q10',
        de: 'Welchen Wert aus deiner Herkunft oder Prägung hast du bewusst behalten?',
        en: 'What value from your background or upbringing have you consciously kept?',
      },
      {
        id: 'deep-q11',
        de: 'Was schützt du manchmal mit Humor oder Schweigen?',
        en: 'What do you sometimes protect with humor or silence?',
      },
      {
        id: 'deep-q12',
        de: 'Welche Hoffnung beeinflusst gerade mehr deiner Entscheidungen, als andere vermutlich merken?',
        en: 'What hope is shaping more of your decisions right now than other people probably realize?',
        twist: 'deeper',
      },
    ],
  },
  {
    id: 'truth',
    numeral: { de: 'AKT II', en: 'ACT II' },
    title: { de: 'WAHRHEIT', en: 'TRUTH' },
    intro: {
      de: 'Verstandenwerden statt Lösungen -- keine Diagnose, keine Bewertung.',
      en: 'Being understood, not solved -- no diagnosis, no judgment.',
    },
    breakText: {
      de: 'Kein Tempo ist hier falsch.',
      en: "There's no wrong pace here.",
    },
    breakSub: {
      de: 'Macht weiter, wenn ihr so weit seid.',
      en: "Continue when you're ready.",
    },
    questions: [
      {
        id: 'deep-q13',
        de: 'Wann hast du dich zuletzt wirklich verstanden gefühlt – und was hat die andere Person konkret getan?',
        en: 'When did you last feel truly understood, and what did the other person specifically do?',
        responseCard: RESPONSE_CARDS.followUpBehavior,
      },
      {
        id: 'deep-q14',
        de: 'Welches Bedürfnis fällt dir schwer auszusprechen?',
        en: 'What need do you find difficult to express?',
      },
      {
        id: 'deep-q15',
        de: 'Welches ehrliche Kompliment kannst du nur schwer annehmen – und warum?',
        en: 'What sincere compliment do you find hard to accept, and why?',
      },
      {
        id: 'deep-q16',
        de: 'Was wird an dir von nahestehenden Menschen häufig missverstanden?',
        en: 'What do people close to you often misunderstand about you?',
      },
      {
        id: 'deep-q17',
        de: 'Welche Veränderung oder welcher Verlust hat dich stark geprägt?',
        en: 'What change or loss has had a powerful influence on who you are?',
        responseCard: RESPONSE_CARDS.validateNoJudgment,
      },
      {
        id: 'deep-q18',
        de: 'Welche schwierige Emotion kannst du besser aushalten, wenn jemand auf eine bestimmte Weise bei dir bleibt?',
        en: 'What difficult emotion becomes easier to sit with when someone stays with you in a particular way?',
      },
      {
        id: 'deep-q19',
        de: 'Wofür lernst du gerade, dir selbst zu vergeben?',
        en: 'What are you learning to forgive yourself for?',
        stayEnabled: true,
        responseCard: RESPONSE_CARDS.validateNoJudgment,
      },
      {
        id: 'deep-q20',
        de: 'Bei welchem Thema wünschst du dir, dass Menschen erst zuhören, bevor sie nach einer Lösung suchen?',
        en: 'On what topic do you wish people would listen before looking for a solution?',
      },
      {
        id: 'deep-q21',
        de: 'Welche schwierige Entscheidung macht dich heute stolz auf dich?',
        en: 'What difficult decision makes you proud of yourself today?',
        responseCard: RESPONSE_CARDS.celebrateHonor,
      },
      {
        id: 'deep-q22',
        de: 'Zwischen welchen zwei wichtigen Werten entsteht in deinem Leben manchmal Spannung?',
        en: 'Which two important values sometimes come into tension in your life?',
      },
      {
        id: 'deep-q23',
        de: 'Welche Frage über dein Leben beschäftigt dich gerade, ohne eine schnelle Antwort zu brauchen?',
        en: 'What question about your life is on your mind right now without needing a quick answer?',
      },
      {
        id: 'deep-q24',
        de: 'Was bedeutet Unterstützung für dich, wenn es keine Lösung gibt?',
        en: 'What does support mean to you when there is no solution?',
        responseCard: RESPONSE_CARDS.validateNoJudgment,
      },
    ],
  },
  {
    id: 'carryforward',
    numeral: { de: 'AKT III', en: 'ACT III' },
    title: { de: 'MITNEHMEN', en: 'CARRY FORWARD' },
    intro: {
      de: 'Dieser Akt fragt, was ihr aus diesem Gespräch mitnehmt -- ohne therapeutische Wirkung zu behaupten.',
      en: "This act asks what you'll carry forward from this conversation -- without claiming any therapeutic effect.",
    },
    questions: [
      {
        id: 'deep-q25',
        de: 'Welche Wahrheit möchtest du in deinem Leben konsequenter leben?',
        en: 'What truth would you like to live by more consistently?',
      },
      {
        id: 'deep-q26',
        de: 'Welche Hoffnung möchtest du schützen, auch wenn du ihren Ausgang nicht kontrollieren kannst?',
        en: 'What hope would you like to protect even though you cannot control how it turns out?',
      },
      {
        id: 'deep-q27',
        de: 'Wovon soll dein nächstes Lebenskapitel mehr enthalten?',
        en: 'What would you like more of in the next chapter of your life?',
      },
      {
        id: 'deep-q28',
        de: 'Woran sollen sich Menschen erinnern, wenn sie an dich denken?',
        en: 'What would you like people to remember when they think of you?',
      },
      {
        id: 'deep-q29',
        de: 'Über welchen Teil deines Lebens würdest du gern öfter sprechen, wenn jemand wirklich neugierig zuhört?',
        en: 'What part of your life would you like to talk about more often if someone listened with genuine curiosity?',
      },
      {
        id: 'deep-q30',
        de: 'Was bedeutet Erfolg für dich, wenn niemand anderes ihn bewertet?',
        en: 'What does success mean to you when nobody else is judging it?',
      },
      {
        id: 'deep-q31',
        de: 'Was möchtest du über dich aussprechen dürfen, ohne dass jemand es sofort lösen oder einordnen muss?',
        en: 'What would you like to be able to say about yourself without anyone immediately trying to solve or categorize it?',
        stayEnabled: true,
      },
      {
        id: 'deep-q32',
        de: 'Womit könntest du heute beginnen, wofür dir dein zukünftiges Ich einmal dankbar wäre?',
        en: 'What could you start today that your future self might thank you for?',
      },
      {
        id: 'deep-q33',
        de: 'Welchen Teil deiner Identität möchtest du in Zukunft bewusster nähren?',
        en: 'What part of your identity would you like to nurture more intentionally in the future?',
      },
      {
        id: 'deep-q34',
        de: 'Wie kann die andere Person nach diesem Gespräch gut für dich da sein – durch Zuhören, Nachfragen, Ruhe oder etwas anderes?',
        en: 'After this conversation, how can the other person best be there for you: by listening, asking questions, giving you space, or something else?',
        responseCard: RESPONSE_CARDS.reflectKeepInMind,
      },
      {
        id: 'deep-q35',
        de: 'Welchen Satz oder Gedanken möchtest du aus diesem Gespräch mitnehmen?',
        en: 'What sentence or thought would you like to carry with you from this conversation?',
      },
      {
        id: 'deep-q36',
        de: 'Was möchtest du dir selbst nach diesem Gespräch mit etwas mehr Freundlichkeit zugestehen?',
        en: 'After this conversation, what would you like to allow yourself with a little more kindness?',
        last: true,
      },
    ],
  },
];

const DEEP_Q37 = {
  neither: {
    de: 'Zwei vorgemerkte Fragen sind noch offen. Wenn es sich für euch gut anfühlt, stellt sie jetzt nacheinander. Jede Frage und jede Antwort bleibt freiwillig.',
    en: 'Two saved questions are still open. If it feels right, ask them one at a time now. Every question and every answer remains optional.',
  },
  one: (lang, who, other) =>
    lang === 'de'
      ? `${who}, wenn es sich für dich gut anfühlt: Stell ${other} jetzt deine vorgemerkte Frage. Eine Antwort bleibt freiwillig.`
      : `${who}, if it feels right, ask ${other} the question you saved. Answering is still optional.`,
  both: {
    de: 'Wann hast du dich in diesem Gespräch am meisten verstanden gefühlt – und wodurch?',
    en: 'When did you feel most understood during this conversation, and what made you feel that way?',
  },
};

const DEEP_MODES = [
  {
    id: 'still',
    title: { de: 'STILL', en: 'STILL' },
    meta: { de: 'Ruhig und ehrlich', en: 'Calm and honest' },
    blurb: ROUTE_NEUTRAL_BLURB,
    twists: DEEPER_AND_STAY,
  },
];

const DEEP_SECRET_AT_INDEX = 27;

// No Quick route by design (see block comment above). Standard = S/F
// column entries verbatim from the catalog's section 8.
const DEEP_ROUTES = {
  standard: {
    id: 'standard',
    minutes: 38,
    title: { de: 'STANDARD', en: 'STANDARD' },
    meta: { de: 'Kuratierte Auswahl', en: 'Curated selection' },
    actIndices: [
      [0, 1, 3, 4, 7, 8, 10, 11],
      [0, 1, 3, 4, 7, 8, 9, 11],
      [0, 1, 3, 4, 6, 7, 9, 11],
    ],
  },
  full: {
    id: 'full',
    minutes: 75,
    title: { de: 'VOLL', en: 'FULL' },
    meta: { de: 'Alle 36 Fragen', en: 'All 36 questions' },
    actIndices: [null, null, null],
  },
};

// Introspective jewel tones -- deep indigo, deep violet, near-navy grey.
const DEEP_ACT_STYLE = [
  { accent: '#4A5EAA', chrome: 1, progress: 'full', glow: 0.24 },
  { accent: '#7B4B94', chrome: 0.5, progress: 'count', glow: 0.13 },
  { accent: '#2E3A59', chrome: 0.22, progress: 'number', glow: 0.05 },
];

export {
  DEEP_ACTS,
  DEEP_MODES,
  DEEP_ACT_STYLE,
  DEEP_Q37,
  DEEP_SECRET_AT_INDEX,
  DEEP_ROUTES,
};
