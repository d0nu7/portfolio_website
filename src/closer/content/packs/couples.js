import {
  DEEPER_AND_STAY,
  ROUTE_NEUTRAL_BLURB,
} from '../shared';

/* ======================================================================
 * COUPLES (iteration 8 catalog rollout) -- content transcribed verbatim
 * from docs/closer/content/CLOSER_Fragenkatalog_DE_EN.md section 5.
 *
 * Quick and Standard deliberately end on Q35, one question short of the
 * pack's real closer (Q36, `last: true`) -- the catalog's own curation,
 * not an error here. Q36 is reserved for the Full route; see the
 * relaxed "ends on last:true" test in closer.test.js (only enforced for
 * the full route, for exactly this reason).
 * ====================================================================== */

const COUPLES_ACTS = [
  {
    id: 'noticing',
    numeral: { de: 'AKT I', en: 'ACT I' },
    title: { de: 'SEHEN', en: 'NOTICING' },
    intro: {
      de: 'Fangt damit an, was zwischen euch gerade gut läuft.',
      en: "Start with what's already going well between you.",
    },
    breakText: {
      de: 'Ihr habt euch gerade bewusst füreinander Zeit genommen.',
      en: "You've just taken deliberate time for each other.",
    },
    breakSub: {
      de: 'Trinkt einen Schluck. Atmet.',
      en: 'Take a sip. Breathe.',
    },
    questions: [
      {
        id: 'couples-q01',
        de: 'Welcher kleine Moment zwischen euch hat dir zuletzt gutgetan?',
        en: 'What small moment between you felt good to you recently?',
      },
      {
        id: 'couples-q02',
        de: 'Was macht ihr als Paar gerade richtig?',
        en: 'What are the two of you doing well as a couple right now?',
      },
      {
        id: 'couples-q03',
        de: 'Welches Alltagsritual möchtest du unbedingt behalten?',
        en: 'What everyday ritual in your relationship would you really like to keep?',
      },
      {
        id: 'couples-q04',
        de: 'Wann fühlt ihr euch in eurer Beziehung besonders als Team?',
        en: 'When do the two of you feel most like a team?',
      },
      {
        id: 'couples-q05',
        de: 'Welche Eigenschaft deines Gegenübers wurde in einem Moment sichtbar, für den du diese Woche dankbar bist?',
        en: 'Which quality in your partner showed up in a moment you felt grateful for this week?',
      },
      {
        id: 'couples-q06',
        de: 'Welche gute Nachricht oder kleine Freude möchtest du gerade gemeinsam feiern – und welche Reaktion würde sich gut anfühlen?',
        en: 'What piece of good news or small joy would you like to celebrate together right now—and what response would feel good?',
      },
      {
        id: 'couples-q07',
        de: 'Welche alltägliche Bemühung deines Gegenübers bedeutet dir mehr, als diese Person vermutlich merkt?',
        en: 'What everyday effort from your partner means more to you than they probably realize?',
      },
      {
        id: 'couples-q08',
        de: 'Was tut dein Gegenüber beim Zuhören, das dich besonders verstanden fühlen lässt?',
        en: 'What does your partner do while listening that makes you feel especially understood?',
      },
      {
        id: 'couples-q09',
        de: 'Welche kleine Gewohnheit zwischen euch fühlt sich für dich nach Zuhause an?',
        en: 'What small habit between you feels like home to you?',
      },
      {
        id: 'couples-q10',
        de: 'Welcher Moment hat dich zuletzt stolz auf euch als Paar gemacht?',
        en: 'What recent moment made you feel proud of the two of you as a couple?',
      },
      {
        id: 'couples-q11',
        de: 'Welche Seite von dir kommt in eurer Beziehung leichter zum Vorschein?',
        en: 'What part of you comes out more easily in your relationship?',
      },
      {
        id: 'couples-q12',
        de: 'Welches ehrliche Kompliment über eure Beziehung kannst du gut annehmen?',
        en: 'What sincere compliment about your relationship can you truly accept?',
      },
    ],
  },
  {
    id: 'repair',
    numeral: { de: 'AKT II', en: 'ACT II' },
    title: { de: 'REPARIEREN', en: 'REPAIR' },
    intro: {
      de: 'Kein Therapieersatz -- nur ein bisschen mehr Verständnis für das, was manchmal schwer ist.',
      en: "Not a substitute for therapy -- just a little more understanding for what's sometimes hard.",
    },
    breakText: {
      de: 'Auch das gehört zu einer guten Beziehung.',
      en: 'This is part of a good relationship too.',
    },
    breakSub: {
      de: 'Macht weiter, wenn ihr so weit seid.',
      en: "Continue when you're ready.",
    },
    questions: [
      {
        id: 'couples-q13',
        de: 'Welche Bitte fällt dir deinem Gegenüber schwer auszusprechen?',
        en: 'What request do you find difficult to make of your partner?',
      },
      {
        id: 'couples-q14',
        de: 'Wie wünschst du dir Trost, wenn es dir nicht gut geht?',
        en: 'How do you like to be comforted when you are having a hard time?',
      },
      {
        id: 'couples-q15',
        de: 'Welches Bedürfnis bleibt hinter einem wiederkehrenden Missverständnis zwischen euch oft unsichtbar?',
        en: 'What need often goes unseen beneath a recurring misunderstanding between you?',
        stayEnabled: true,
      },
      {
        id: 'couples-q16',
        de: 'Woran merkst du, dass eine Entschuldigung bei dir wirklich ankommt?',
        en: 'What tells you that an apology has truly landed?',
      },
      {
        id: 'couples-q17',
        de: 'Welche Reaktion wünschst du dir zuerst, wenn du Stress teilst?',
        en: 'What kind of response do you want first when you share something stressful?',
      },
      {
        id: 'couples-q18',
        de: 'Welche Formulierung hilft dir, um Raum zu bitten, ohne Distanz zu meinen?',
        en: 'What words help you ask for space without meaning emotional distance?',
      },
      {
        id: 'couples-q19',
        de: 'Was macht ein schwieriges Gespräch für dich sicherer?',
        en: 'What helps a difficult conversation feel safer to you?',
      },
      {
        id: 'couples-q20',
        de: 'Wie kann dein Gegenüber auf eine gute Nachricht von dir so reagieren, dass du dich wirklich begleitet fühlst?',
        en: 'How can your partner respond to your good news in a way that makes you feel truly supported?',
      },
      {
        id: 'couples-q21',
        de: 'Welches Signal sollte für euch bedeuten, kurz innezuhalten statt weiterzudrängen?',
        en: 'What signal should tell the two of you to pause rather than push on?',
      },
      {
        id: 'couples-q22',
        de: 'Welcher frühere schwierige Moment zeigt dir, dass ihr wieder zueinanderfinden könnt?',
        en: 'What past difficult moment reminds you that the two of you can find your way back to each other?',
        stayEnabled: true,
      },
      {
        id: 'couples-q23',
        de: 'Welche kleine Veränderung würde in eurem Alltag gerade spürbar Druck herausnehmen?',
        en: 'What small change would noticeably ease the pressure in your everyday life right now?',
      },
      {
        id: 'couples-q24',
        de: 'Was soll dein Gegenüber verstehen, bevor diese Person versucht, ein Problem für dich zu lösen?',
        en: 'What would you like your partner to understand before they try to solve a problem for you?',
      },
    ],
  },
  {
    id: 'choosing',
    numeral: { de: 'AKT III', en: 'ACT III' },
    title: { de: 'WÄHLEN', en: 'CHOOSING' },
    intro: {
      de: 'Dieser Akt schaut nach vorn -- auf das, was ihr als Paar als Nächstes wählt.',
      en: "This act looks ahead -- at what the two of you choose next as a couple.",
    },
    questions: [
      {
        id: 'couples-q25',
        de: 'Wovon möchtest du in den nächsten drei Monaten mehr gemeinsam erleben?',
        en: 'What would you like the two of you to experience more of over the next three months?',
      },
      {
        id: 'couples-q26',
        de: 'Welchen gemeinsamen Wunsch habt ihr zu lange verschoben?',
        en: 'What shared wish have the two of you postponed for too long?',
      },
      {
        id: 'couples-q27',
        de: 'Wie könnt ihr eure Nähe schützen, wenn der Alltag stressig wird?',
        en: 'How can the two of you protect your closeness when everyday life gets stressful?',
      },
      {
        id: 'couples-q28',
        de: 'Welches kleine Versprechen könnt ihr euch für diese Woche geben?',
        en: 'What small promise can the two of you make for this week?',
      },
      {
        id: 'couples-q29',
        de: 'Welche neue gemeinsame Erfahrung würdet ihr im nächsten Monat gern ausprobieren?',
        en: 'What new experience would the two of you like to try in the next month?',
      },
      {
        id: 'couples-q30',
        de: 'Welche neue Tradition würde gut zu euch passen?',
        en: 'What new tradition would suit the two of you?',
      },
      {
        id: 'couples-q31',
        de: 'Wie sieht ein gewöhnlicher gemeinsamer Tag aus, auf den du dich auch in einigen Jahren freuen würdest?',
        en: 'What would an ordinary day together look like if it still felt worth looking forward to years from now?',
        twist: 'deeper',
      },
      {
        id: 'couples-q32',
        de: 'Welche Eigenschaft möchtet ihr als Team stärker entwickeln?',
        en: 'What quality would you like to grow stronger in as a team?',
      },
      {
        id: 'couples-q33',
        de: 'Welche Seite eurer Beziehung möchtest du auch in stressigen Zeiten bewusst wählen?',
        en: 'What part of your relationship do you want to keep choosing even during stressful times?',
      },
      {
        id: 'couples-q34',
        de: 'Zu welchem Gespräch möchtet ihr regelmäßig zurückkehren?',
        en: 'What conversation would you like to return to regularly?',
      },
      {
        id: 'couples-q35',
        de: 'Welche Unterstützung deines Gegenübers würde dir bei einem aktuellen Ziel wirklich helfen?',
        en: 'What support from your partner would genuinely help with one of your current goals?',
      },
      {
        id: 'couples-q36',
        de: 'Welcher Satz aus diesem Gespräch soll euch morgen noch begleiten?',
        en: 'What line from this conversation would you like to carry into tomorrow?',
        last: true,
      },
    ],
  },
];

const COUPLES_Q37 = {
  neither: {
    de: 'Stellt euch nacheinander eure vorgemerkten Fragen. Zuhören reicht; ihr müsst nichts sofort lösen.',
    en: 'Take turns asking the questions you saved. Listening is enough; nothing has to be solved now.',
  },
  one: (lang, who, other) =>
    lang === 'de'
      ? `${who}, stell ${other} deine vorgemerkte Frage. Zuhören reicht; ihr müsst nichts sofort lösen.`
      : `${who}, ask ${other} the question you saved. Listening is enough; nothing has to be solved now.`,
  both: {
    de: 'Stellt euch noch eine Frage, die euch auch morgen an etwas Wertvolles zwischen euch erinnert.',
    en: 'Ask each other one more question that will remind you tomorrow of something valuable between you.',
  },
};

const COUPLES_MODES = [
  {
    id: 'grounded',
    title: { de: 'GROUNDED', en: 'GROUNDED' },
    meta: { de: 'Ruhig und ehrlich', en: 'Calm and honest' },
    blurb: ROUTE_NEUTRAL_BLURB,
    twists: DEEPER_AND_STAY,
  },
];

const COUPLES_SECRET_AT_INDEX = 27;

/*
 * Q01,Q02,Q05,Q09 / Q14,Q17,Q20,Q24 / Q25,Q28,Q29,Q35 (Quick);
 * Q01-Q06,Q09,Q10 / Q13-Q17,Q19,Q20,Q24 / Q25,Q26,Q27,Q28,Q29,Q31,Q34,Q35
 * (Standard) -- verbatim from the catalog's "Kuratierte Routen" list. Both
 * end on Q35, not Q36 -- see the block comment above COUPLES_ACTS.
 */
const COUPLES_ROUTES = {
  quick: {
    id: 'quick',
    minutes: 15,
    title: { de: 'KURZ', en: 'QUICK' },
    meta: { de: 'Check-in', en: 'Check-in' },
    actIndices: [
      [0, 1, 4, 8],
      [1, 4, 7, 11],
      [0, 3, 4, 10],
    ],
  },
  standard: {
    id: 'standard',
    minutes: 32,
    title: { de: 'STANDARD', en: 'STANDARD' },
    meta: { de: 'Kuratierte Auswahl', en: 'Curated selection' },
    actIndices: [
      [0, 1, 2, 3, 4, 5, 8, 9],
      [0, 1, 2, 3, 4, 6, 7, 11],
      [0, 1, 2, 3, 4, 6, 9, 10],
    ],
  },
  full: {
    id: 'full',
    minutes: 60,
    title: { de: 'VOLL', en: 'FULL' },
    meta: { de: 'Alle 36 Fragen', en: 'All 36 questions' },
    actIndices: [null, null, null],
  },
};

// Grounded, trust-oriented -- soft green (noticing/gratitude), warm amber
// (repair), calm blue (choosing/future).
const COUPLES_ACT_STYLE = [
  { accent: '#5FBF8B', chrome: 1, progress: 'full', glow: 0.26 },
  { accent: '#E0985B', chrome: 0.5, progress: 'count', glow: 0.14 },
  { accent: '#4D8FD1', chrome: 0.22, progress: 'number', glow: 0.05 },
];

export {
  COUPLES_ACTS,
  COUPLES_MODES,
  COUPLES_ACT_STYLE,
  COUPLES_Q37,
  COUPLES_SECRET_AT_INDEX,
  COUPLES_ROUTES,
};
