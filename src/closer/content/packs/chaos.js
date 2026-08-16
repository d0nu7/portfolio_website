import {
  DEEPER_ONLY,
  ROUTE_NEUTRAL_BLURB,
} from '../shared';

/* ======================================================================
 * CHAOS (iteration 8 catalog rollout) -- content transcribed verbatim
 * from docs/closer/content/CLOSER_Fragenkatalog_DE_EN.md section 9.
 * Front-loaded route shape (Quick = first 4 of each act, mostly; Standard
 * = first 8), unlike FRIENDS/OLD FRIENDS' every-third pattern -- see the
 * per-question Route column in the catalog. Quick/Standard end on Q31/
 * Q32, Q36 is Full-only -- see the relaxed "ends on last:true" test.
 *
 * Q37 here is RaDi's own longer-form prose (the catalog gives full
 * paragraphs rather than short templates, deliberately restating
 * skippability/end-anywhere inline) -- transcribed verbatim rather than
 * shortened to match other packs' terser style.
 * ====================================================================== */

const CHAOS_ACTS = [
  {
    id: 'weird',
    numeral: { de: 'AKT I', en: 'ACT I' },
    title: { de: 'SELTSAM', en: 'WEIRD' },
    intro: {
      de: 'Gemeinsames Erfinden und Lachen -- niemand wird bloßgestellt.',
      en: "Inventing things together and laughing -- nobody gets put on the spot.",
    },
    breakText: {
      de: 'Das war herrlich unnötig.',
      en: 'That was gloriously unnecessary.',
    },
    breakSub: {
      de: 'Trinkt einen Schluck. Lacht.',
      en: 'Take a sip. Laugh.',
    },
    questions: [
      {
        id: 'chaos-q01',
        de: 'Ihr eröffnet gemeinsam ein völlig unnötiges Museum. Was stellt es aus?',
        en: 'You’re opening a completely unnecessary museum together. What does it display?',
      },
      {
        id: 'chaos-q02',
        de: 'Welche völlig unwichtige Meinung würdest du bis zum Äußersten verteidigen?',
        en: 'What utterly unimportant opinion would you defend forever?',
      },
      {
        id: 'chaos-q03',
        de: 'Mit welcher fiktiven Figur würdest du für 24 Stunden das Leben tauschen – und was würdest du zuerst tun?',
        en: 'Which fictional character would you swap lives with for 24 hours—and what would you do first?',
      },
      {
        id: 'chaos-q04',
        de: 'Welche winzige, seltsame Sache macht deinen Alltag unverhältnismäßig besser?',
        en: 'What tiny, oddly specific thing makes your everyday life disproportionately better?',
      },
      {
        id: 'chaos-q05',
        de: 'Welcher Song sollte laufen, wenn du völlig übertrieben einen Raum betrittst?',
        en: 'What song should play when you make an outrageously dramatic entrance?',
      },
      {
        id: 'chaos-q06',
        de: 'Welche scheinbar nutzlose Superkraft hättest du gern – und wie würdest du sie doch sinnvoll einsetzen?',
        en: 'What seemingly useless superpower would you want—and how would you put it to surprisingly good use?',
      },
      {
        id: 'chaos-q07',
        de: 'Erfindet gemeinsam eine harmlose Verschwörungstheorie darüber, warum einzelne Socken verschwinden.',
        en: 'Invent a harmless conspiracy theory together about why single socks disappear.',
      },
      {
        id: 'chaos-q08',
        de: 'Erfindet einen Feiertag für etwas völlig Alltägliches. Was wird gefeiert und wie?',
        en: 'Invent a holiday for something completely ordinary. What does it celebrate, and how?',
      },
      {
        id: 'chaos-q09',
        de: 'Welches Tier sollte die Menschheit bei einem Treffen mit Außerirdischen vertreten – und was wäre sein erster Satz?',
        en: 'Which animal should represent humanity at a meeting with aliens—and what would its opening line be?',
      },
      {
        id: 'chaos-q10',
        de: 'Ihr eröffnet ein Restaurant mit einer völlig absurden Regel. Wie lautet sie, und warum kommen die Leute trotzdem?',
        en: 'You’re opening a restaurant with one completely absurd rule. What is it, and why do people still come?',
      },
      {
        id: 'chaos-q11',
        de: 'Welcher Alltagsgegenstand verdient ein dramatisches Biopic – und wie heißt der Film?',
        en: 'Which everyday object deserves a dramatic biopic—and what is the film called?',
      },
      {
        id: 'chaos-q12',
        de: 'Welche absurd spezifische Auszeichnung würdest du dir selbst verleihen?',
        en: 'What absurdly specific award would you give yourself?',
      },
    ],
  },
  {
    id: 'bold',
    numeral: { de: 'AKT II', en: 'ACT II' },
    title: { de: 'MUTIG', en: 'BOLD' },
    intro: {
      de: 'Kleine, machbare Risiken -- keine Mutproben, niemand wird bloßgestellt.',
      en: "Small, doable risks -- no dares, no one gets embarrassed.",
    },
    breakText: {
      de: 'Ein bisschen Chaos hat euch gutgetan.',
      en: 'A little chaos has been good for you.',
    },
    breakSub: {
      de: 'Macht weiter, wenn ihr so weit seid.',
      en: "Continue when you're ready.",
    },
    questions: [
      {
        id: 'chaos-q13',
        de: 'Welche chaotische Entscheidung war im Nachhinein genau richtig?',
        en: 'What chaotic decision turned out to be exactly right?',
      },
      {
        id: 'chaos-q14',
        de: 'Welche Regel des Erwachsenseins würdest du sofort abschaffen?',
        en: 'What rule of adulthood would you abolish immediately?',
      },
      {
        id: 'chaos-q15',
        de: 'Welches kleine, überschaubare Risiko möchtest du demnächst eingehen?',
        en: 'What small, manageable risk would you like to take soon?',
      },
      {
        id: 'chaos-q16',
        de: 'Erfindet gemeinsam das absurdeste Unternehmen, das überraschend funktionieren könnte.',
        en: 'Invent the most absurd business together that might actually work.',
      },
      {
        id: 'chaos-q17',
        de: 'Welche harmlose Fähigkeit von dir verdient viel mehr Fanfare, als sie normalerweise bekommt?',
        en: 'What harmless skill of yours deserves far more fanfare than it usually gets?',
      },
      {
        id: 'chaos-q18',
        de: 'Ihr habt spontan drei freie Stunden und dürft nichts vorbereiten. Welches Mini-Abenteuer beginnt jetzt?',
        en: 'You suddenly have three free hours and cannot prepare anything. What mini-adventure starts now?',
      },
      {
        id: 'chaos-q19',
        de: 'Welche gesellschaftliche Konvention würdest du gern einen Tag lang ignorieren, wenn niemand dadurch zu Schaden käme?',
        en: 'What social convention would you like to ignore for one day if no one could be harmed by it?',
      },
      {
        id: 'chaos-q20',
        de: 'Welche verspielte Seite von dir kommt erst zum Vorschein, wenn du dich wohlfühlst?',
        en: 'What playful side of you only appears when you feel comfortable?',
      },
      {
        id: 'chaos-q21',
        de: 'Wie müsste dich jemand einladen, damit du bei einer herrlich albernen Idee sofort mitmachst?',
        en: 'How would someone have to invite you for you to join a delightfully silly idea straight away?',
      },
      {
        id: 'chaos-q22',
        de: 'Welches unerwartete Kompliment hat dich gleichzeitig zum Lachen gebracht und wirklich erreicht?',
        en: 'What unexpected compliment both made you laugh and genuinely landed with you?',
      },
      {
        id: 'chaos-q23',
        de: 'Welchen harmlosen Plot-Twist würdest du dir für den nächsten Monat wünschen?',
        en: 'What harmless plot twist would you like the next month to bring?',
      },
      {
        id: 'chaos-q24',
        de: 'Plant ein tatsächlich machbares Mini-Abenteuer für höchstens zehn Euro – ohne Mutprobe und ohne jemanden bloßzustellen.',
        en: 'Plan a genuinely doable mini-adventure for no more than ten euros—with no dares and no embarrassing anyone.',
      },
    ],
  },
  {
    id: 'surprisinglyreal',
    numeral: { de: 'AKT III', en: 'ACT III' },
    title: { de: 'ÜBERRASCHEND ECHT', en: 'SURPRISINGLY REAL' },
    intro: {
      de: 'Ein bisschen echte Tiefe, ohne den Spaß zu verlieren.',
      en: "A little genuine depth, without losing the fun.",
    },
    questions: [
      {
        id: 'chaos-q25',
        de: 'Wofür wünschst du dir gerade mehr Erlaubnis von dir selbst?',
        en: 'What do you wish you gave yourself more permission to do right now?',
      },
      {
        id: 'chaos-q26',
        de: 'Welche kurze Sprachnachricht würdest du deinem Ich in fünf Jahren schicken?',
        en: 'What short voice message would you send to yourself five years from now?',
      },
      {
        id: 'chaos-q27',
        de: 'Was würdest du ausprobieren, wenn Peinlichkeit für einen Tag nicht existieren würde?',
        en: 'What would you try if embarrassment did not exist for one day?',
      },
      {
        id: 'chaos-q28',
        de: 'Welcher gemeinsame Plan ist so albern, dass er vielleicht großartig wäre?',
        en: 'What could you do together that sounds so silly it might be brilliant?',
      },
      {
        id: 'chaos-q29',
        de: 'Welche Begeisterung von dir wird oft unterschätzt oder missverstanden?',
        en: 'What enthusiasm of yours is often underestimated or misunderstood?',
      },
      {
        id: 'chaos-q30',
        de: 'Welche Form von Spiel oder Albernheit hilft dir, wieder bei dir anzukommen?',
        en: 'What kind of play or silliness helps you feel like yourself again?',
      },
      {
        id: 'chaos-q31',
        de: 'Wann hat gemeinsames Lachen dir zuletzt das Gefühl gegeben, jemandem wirklich nah zu sein?',
        en: 'When did laughing with someone last make you feel genuinely close to them?',
      },
      {
        id: 'chaos-q32',
        de: 'Welche Seite von dir dürfte im Alltag mehr Raum bekommen?',
        en: 'What side of you deserves more room in your everyday life?',
      },
      {
        id: 'chaos-q33',
        de: 'Wie zeigst du durch Humor, dass dir ein Mensch wichtig ist?',
        en: 'How do you use humour to show someone that they matter to you?',
      },
      {
        id: 'chaos-q34',
        de: 'Welche Antwort aus diesem Gespräch würdest du gern noch genauer hören?',
        en: 'Which answer from this conversation would you like to hear more about?',
        twist: 'deeper',
      },
      {
        id: 'chaos-q35',
        de: 'Woran würdest du dich von diesem Gespräch gern erinnern?',
        en: 'What would you like to remember about this conversation?',
      },
      {
        id: 'chaos-q36',
        de: 'Erfindet ein kleines Ritual, mit dem ihr euch eure Neugier aufeinander bewahren könnt.',
        en: 'Invent a small ritual that could help you stay curious about each other.',
        last: true,
      },
    ],
  },
];

const CHAOS_Q37 = {
  neither: {
    de: 'Zwei vorgemerkte Fragen warten noch. Wenn es sich für euch beide gut anfühlt, stellt sie nacheinander. Jede Frage und jede Antwort darf ohne Begründung ausgelassen werden – und ihr könnt jederzeit hier enden.',
    en: 'Two saved questions are still waiting. If continuing feels good to both of you, ask them one at a time. Either question or answer may be passed without explanation — and you can end here at any time.',
  },
  one: (lang, who, other) =>
    lang === 'de'
      ? `Eine vorgemerkte Frage wartet noch. Wenn es sich für euch beide weiterhin gut anfühlt, darf ${who} sie ${other} jetzt stellen. ${other} darf sie ohne Begründung überspringen. Ihr könnt auch einfach hier enden.`
      : `One saved question is still waiting. If continuing still feels good to both of you, ${who} may ask ${other} now. ${other} may pass without giving a reason. You can also simply end here.`,
  both: {
    de: 'Ihr könnt hier enden – oder gemeinsam eine freiwillige Bonusfrage nehmen: Welche Regel sollte euer nächstes absurd gutes Abenteuer haben?',
    en: 'You can end here—or take one optional bonus question together: What rule should your next absurdly good adventure have?',
  },
};

const CHAOS_MODES = [
  {
    id: 'playful',
    title: { de: 'PLAYFUL', en: 'PLAYFUL' },
    meta: { de: 'Leicht und albern', en: 'Light and silly' },
    blurb: ROUTE_NEUTRAL_BLURB,
    twists: DEEPER_ONLY,
  },
];

const CHAOS_SECRET_AT_INDEX = 27;

// Front-loaded per act (Quick = mostly the first 4, Standard = the first
// 8) -- verbatim from the catalog's per-question Route column in
// section 9. Act III's Quick selection is [Q25,Q26,Q28,Q31], not simply
// the first four, matching the catalog exactly.
const CHAOS_ROUTES = {
  quick: {
    id: 'quick',
    minutes: 10,
    title: { de: 'KURZ', en: 'QUICK' },
    meta: { de: 'Ein Ausschnitt', en: 'A taste of it' },
    actIndices: [
      [0, 1, 2, 3],
      [0, 1, 2, 3],
      [0, 1, 3, 6],
    ],
  },
  standard: {
    id: 'standard',
    minutes: 21,
    title: { de: 'STANDARD', en: 'STANDARD' },
    meta: { de: 'Kuratierte Auswahl', en: 'Curated selection' },
    actIndices: [
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 5, 6, 7],
    ],
  },
  full: {
    id: 'full',
    minutes: 35,
    title: { de: 'VOLL', en: 'FULL' },
    meta: { de: 'Alle 36 Fragen', en: 'All 36 questions' },
    actIndices: [null, null, null],
  },
};

// High-energy and playful -- coral red, turquoise, bright yellow.
const CHAOS_ACT_STYLE = [
  { accent: '#FF6B6B', chrome: 1, progress: 'full', glow: 0.3 },
  { accent: '#4ECDC4', chrome: 0.5, progress: 'count', glow: 0.16 },
  { accent: '#FFD93D', chrome: 0.22, progress: 'number', glow: 0.06 },
];

export {
  CHAOS_ACTS,
  CHAOS_MODES,
  CHAOS_ACT_STYLE,
  CHAOS_Q37,
  CHAOS_SECRET_AT_INDEX,
  CHAOS_ROUTES,
};
