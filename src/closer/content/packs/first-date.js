import {
  ROUTE_PRESETS,
  DEEPER_AND_STAY,
  ROUTE_NEUTRAL_BLURB,
} from '../shared';

/* ======================================================================
 * FIRST DATE (iteration 8 catalog rollout, FR8-01/FR8-03) -- the pilot
 * pack the holistic review recommended shipping first. Content is
 * transcribed verbatim from docs/closer/content/question-catalog.de-en.md
 * section 3; that file is the source of truth for any future wording
 * change to this pack -- edit it there first, then mirror here.
 *
 * Deliberately no twists (predict/both/nothinking/deeper) or stayEnabled
 * on any question: the catalog doesn't mark any FIRST DATE question with a
 * twist, and assigning one now would be inventing a content decision that
 * belongs to the same editorial review CLASSIC's twists went through
 * (spec feedback 11, iteration 6), not something to guess at while wiring
 * up the pack. FIRST DATE therefore ships with a single CALM style; a
 * second, twist-bearing style can be added later once specific questions
 * are chosen for it.
 * ====================================================================== */

const FIRST_DATE_ACTS = [
  {
    id: 'curiosity',
    title: { de: 'NEUGIER', en: 'CURIOSITY' },
    intro: {
      de: 'Fangt leicht an. Es geht um Neugier, nicht um Tiefe – ihr könnt jederzeit weitergehen.',
      en: 'Start light. This is about curiosity, not depth—you can move on whenever you like.',
    },
    breakText: {
      de: 'Ihr wisst jetzt ein paar Dinge übereinander, die ihr vor diesem Akt noch nicht wusstet.',
      en: "You now know a few things about each other you didn't before this act.",
    },
    breakSub: {
      de: 'Trinkt einen Schluck. Lächelt.',
      en: 'Take a sip. Smile.',
    },
    questions: [
      {
        id: 'first-date-q01',
        de: 'Wie sieht für dich ein perfekter ungeplanter Abend aus?',
        en: 'What does your perfect spontaneous evening look like?',
      },
      {
        id: 'first-date-q02',
        de: 'Über welches Thema kannst du reden, ohne die Zeit zu bemerken?',
        en: 'What topic can you talk about and completely lose track of time?',
      },
      {
        id: 'first-date-q03',
        de: 'Welche Kleinigkeit bringt dich fast immer zum Lachen?',
        en: 'What small thing can almost always make you laugh?',
      },
      {
        id: 'first-date-q04',
        de: 'Worauf freust du dich gerade wirklich?',
        en: 'What are you genuinely looking forward to right now?',
      },
      {
        id: 'first-date-q05',
        de: 'Welche einfache Freude hat zuletzt einen gewöhnlichen Tag besser gemacht?',
        en: 'What simple pleasure recently made an ordinary day better?',
      },
      {
        id: 'first-date-q06',
        de: 'Was machst du gern, ohne darin besonders gut sein zu müssen?',
        en: 'What do you enjoy doing without needing to be particularly good at it?',
      },
      {
        id: 'first-date-q07',
        de: 'Auf welchen kleinen Moment der letzten Zeit bist du stolz – und warum?',
        en: 'What small recent moment made you feel proud, and why?',
      },
      {
        id: 'first-date-q08',
        de: 'Wofür begeisterst du dich gerade mehr, als andere vielleicht erwarten würden?',
        en: 'What are you more excited about lately than people might expect?',
      },
      {
        id: 'first-date-q09',
        de: 'An welchem Ort fühlst du dich überraschend schnell wohl?',
        en: 'Where do you find it surprisingly easy to feel at home?',
      },
      {
        id: 'first-date-q10',
        de: 'Welche kleine Gewohnheit macht deinen Alltag spürbar besser?',
        en: 'What small habit makes a real difference to your day?',
      },
      {
        id: 'first-date-q11',
        de: 'Was würdest du gern nur zum Vergnügen lernen?',
        en: 'What would you love to learn purely for the fun of it?',
      },
      {
        id: 'first-date-q12',
        de: 'Welche kleine Entscheidung hat dir in letzter Zeit überraschend gutgetan?',
        en: 'What small decision has turned out surprisingly well for you lately?',
      },
    ],
  },
  {
    id: 'signal',
    title: { de: 'SIGNAL', en: 'SIGNALS' },
    intro: {
      de: 'Jetzt geht es um das, was sich zwischen euch beiden gerade zeigt.',
      en: "Now it's about what's showing up between the two of you right now.",
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
        id: 'first-date-q13',
        de: 'Was hilft dir, dich mit einer neuen Person schnell wohlzufühlen?',
        en: 'What helps you feel comfortable around someone new?',
      },
      {
        id: 'first-date-q14',
        de: 'Welche Eigenschaft fällt dir an anderen Menschen positiv auf?',
        en: 'What quality in other people tends to catch your attention in a good way?',
      },
      {
        id: 'first-date-q15',
        de: 'Was macht ein Date für dich gut – unabhängig davon, wie es danach weitergeht?',
        en: 'What makes a date worthwhile, regardless of what happens afterward?',
      },
      {
        id: 'first-date-q16',
        de: 'Was möchtest du über einen Menschen wissen, bevor du dir ein Urteil bildest?',
        en: 'What do you want to know about someone before you form an opinion of them?',
      },
      {
        id: 'first-date-q17',
        de: 'Welches Verhalten gibt dir das Gefühl, dass dir wirklich zugehört wird?',
        en: 'What does someone do that makes you feel genuinely heard?',
      },
      {
        id: 'first-date-q18',
        de: 'Wie zeigst du, dass dich eine Antwort wirklich interessiert?',
        en: 'How do you show someone that you are genuinely interested in their answer?',
      },
      {
        id: 'first-date-q19',
        de: 'Welche Art von Kompliment erreicht dich wirklich?',
        en: 'What kind of compliment truly lands with you?',
      },
      {
        id: 'first-date-q20',
        de: 'Welche Art von gemeinsamem Schweigen fühlt sich für dich angenehm an?',
        en: 'What kind of shared silence feels comfortable to you?',
      },
      {
        id: 'first-date-q21',
        de: 'Welcher Wert zeigt sich in deinem Alltag besonders deutlich?',
        en: 'Which of your values shows up most clearly in your everyday life?',
      },
      {
        id: 'first-date-q22',
        de: 'Welche gute Eigenschaft an dir erkennen Menschen oft erst mit der Zeit?',
        en: 'What good quality in you do people often discover only with time?',
        twist: 'deeper',
      },
      {
        id: 'first-date-q23',
        de: 'Welche Mischung aus Planung und Spontaneität passt gut zu dir?',
        en: 'What balance of planning and spontaneity suits you best?',
      },
      {
        id: 'first-date-q24',
        de: 'Welche Version von dir lernen neue Menschen meistens zuerst kennen?',
        en: 'Which version of you do new people usually meet first?',
      },
    ],
  },
  {
    id: 'clarity',
    title: { de: 'KLARHEIT', en: 'CLARITY' },
    intro: {
      de: 'Dieser Akt bringt Klarheit über Erwartungen und Grenzen. Nichts davon ist ein Versprechen für später.',
      en: "This act brings clarity about expectations and boundaries. None of it is a promise about what comes next.",
    },
    questions: [
      {
        id: 'first-date-q25',
        de: 'Was soll eine Person an dir bemerken, ohne dass du es beweisen musst?',
        en: 'What do you hope someone notices about you without making you prove it?',
      },
      {
        id: 'first-date-q26',
        de: 'Woran merkst du, dass du jemanden gern wiedersehen möchtest?',
        en: 'How do you know when you would like to see someone again?',
      },
      {
        id: 'first-date-q27',
        de: 'Welche Grenze macht Dating für dich leichter und sicherer?',
        en: 'What boundary makes dating feel easier and safer for you?',
      },
      {
        id: 'first-date-q28',
        de: 'Welche Art von Verbindung hoffst du zu finden, ohne heute schon mehr versprechen zu müssen?',
        en: 'What kind of connection are you hoping for without having to promise anything tonight?',
      },
      {
        id: 'first-date-q29',
        de: 'Welches Tempo fühlt sich beim Kennenlernen für dich gut an?',
        en: 'What pace feels right to you when getting to know someone?',
        stayEnabled: true,
      },
      {
        id: 'first-date-q30',
        de: 'Welche Wahrheit über deinen Alltag ist wichtig, um dich gerade gut kennenzulernen?',
        en: 'What truth about your day-to-day life right now would help someone understand you better?',
      },
      {
        id: 'first-date-q31',
        de: 'Wie zeigt sich Verlässlichkeit für dich am Anfang eines Kennenlernens?',
        en: 'What does reliability look like to you early on?',
      },
      {
        id: 'first-date-q32',
        de: 'Wie soll eine Person nachfragen, wenn sie deine Gefühle nicht sicher einschätzen kann?',
        en: 'How would you like someone to ask when they are unsure how you feel?',
      },
      {
        id: 'first-date-q33',
        de: 'Was lässt dich respektiert fühlen, wenn Interessen oder Meinungen auseinandergehen?',
        en: 'What makes you feel respected when interests or opinions differ?',
      },
      {
        id: 'first-date-q34',
        de: 'Was soll dein Gegenüber von dir aus diesem Abend in Erinnerung behalten?',
        en: 'What do you hope the other person remembers about you from tonight?',
      },
      {
        id: 'first-date-q35',
        de: 'Was hilft dir, ehrlich Nein zu sagen, ohne dich für die Stimmung verantwortlich zu fühlen?',
        en: 'What helps you say an honest no without feeling responsible for the mood?',
        stayEnabled: true,
      },
      {
        id: 'first-date-q36',
        de: 'Was würde diesen Abend für dich gut und druckfrei abrunden?',
        en: 'What would make this evening feel complete and pressure-free for you?',
        last: true,
      },
    ],
  },
];

const FIRST_DATE_Q37 = {
  neither: {
    de: 'Stellt euch nacheinander eure vorgemerkten Fragen – ohne Erwartungsdruck.',
    en: 'Take turns asking the questions you saved for later — without pressure.',
  },
  one: (lang, who, other) =>
    lang === 'de'
      ? `${who}, stell ${other} deine vorgemerkte Frage – ohne Erwartungsdruck.`
      : `${who}, ask ${other} the question you saved for later — without pressure.`,
  both: {
    de: 'Stellt euch noch eine Frage, die diesen ersten Abend gut abrundet.',
    en: 'Ask each other one more question that would bring this first evening to a good close.',
  },
};

// A single style. GO DEEPER and STAY are on, sparingly assigned below
// (one follow-up question, two stayEnabled questions) -- see the block
// comment above FIRST_DATE_ACTS for why twists started at none, and the
// note above DEEPER_AND_STAY for why only these two.
const FIRST_DATE_MODES = [
  {
    id: 'calm',
    title: { de: 'CALM', en: 'CALM' },
    meta: { de: 'Ruhig und ehrlich', en: 'Calm and honest' },
    blurb: ROUTE_NEUTRAL_BLURB,
    twists: DEEPER_AND_STAY,
  },
];

// Same relative placement as CLASSIC's (interrupts before absolute index
// 27, i.e. between the 3rd and 4th question of Act III) -- no pack-
// specific placement is given in the catalog, so this keeps a single,
// consistent convention across packs rather than inventing a bespoke one
// per pack.
const FIRST_DATE_SECRET_AT_INDEX = 27;

/*
 * Curated routes, verbatim from the catalog's curated-routes section.
 * Local (0-based, per-act) indices derived from the catalog's absolute
 * Q-numbers: Quick Q01,Q02,Q04,Q07 / Q13,Q15,Q17,Q21 / Q25,Q27,Q28,Q36;
 * Standard Q01-Q05,Q07,Q08,Q12 / Q13-Q17,Q19,Q21,Q24 / Q25,Q26,Q27,Q28,Q29,Q31,Q34,Q36.
 */
const FIRST_DATE_ROUTES = {
  quick: {
    ...ROUTE_PRESETS.quick,
    minutes: 18,
    actIndices: [
      [0, 1, 3, 6],
      [0, 2, 4, 8],
      [0, 2, 3, 11],
    ],
  },
  standard: {
    ...ROUTE_PRESETS.standard,
    minutes: 30,
    actIndices: [
      [0, 1, 2, 3, 4, 6, 7, 11],
      [0, 1, 2, 3, 4, 6, 8, 11],
      [0, 1, 2, 3, 4, 6, 9, 11],
    ],
  },
  full: {
    ...ROUTE_PRESETS.full,
    minutes: 50,
  },
};

// Warm, distinct from CLASSIC's cool teal/purple/grey -- same progressive
// withdrawal (chrome/glow shrink act over act) since that's a general
// CLOSER design principle, not a CLASSIC-specific choice.
const FIRST_DATE_ACT_STYLE = [
  { accent: '#FF8A65', chrome: 1, progress: 'full', glow: 0.28 },
  { accent: '#F76E9E', chrome: 0.5, progress: 'count', glow: 0.15 },
  { accent: '#FFC24B', chrome: 0.22, progress: 'number', glow: 0.05 },
];

export {
  FIRST_DATE_ACTS,
  FIRST_DATE_MODES,
  FIRST_DATE_ACT_STYLE,
  FIRST_DATE_Q37,
  FIRST_DATE_SECRET_AT_INDEX,
  FIRST_DATE_ROUTES,
};
