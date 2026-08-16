import {
  ROUTE_PRESETS,
  DEEPER_AND_STAY,
  ROUTE_NEUTRAL_BLURB,
  RESPONSE_CARDS,
} from '../shared';

/* ======================================================================
 * OLD FRIENDS (iteration 8 catalog rollout) -- content transcribed
 * verbatim from docs/closer/content/question-catalog.de-en.md
 * section 7. Same route-column shape as FRIENDS (every third question
 * per act); Quick/Standard end on Q34/Q35, Q36 is Full-only -- see the
 * relaxed "ends on last:true" test in closer.test.js.
 *
 * Response Cards (not yet a CloserGame.js feature, see FRIENDS' own note
 * above): after Q02/Q04 FOLLOW UP; after Q12 REFLECT; after Q20/Q30
 * VALIDATE; after Q34 FOLLOW UP (see catalog section 7 for exact wording).
 * ====================================================================== */

const OLD_FRIENDS_ACTS = [
  {
    id: 'then',
    title: { de: 'DAMALS', en: 'THEN' },
    intro: {
      de: 'Fangt bei eurer gemeinsamen Geschichte an – ohne Nähe oder Versöhnung vorauszusetzen.',
      en: 'Start with your shared history—without assuming closeness or reconciliation.',
    },
    breakText: {
      de: 'Ihr habt gerade ein Stück gemeinsame Geschichte wieder aufleben lassen.',
      en: "You've just brought a piece of shared history back to life.",
    },
    breakSub: {
      de: 'Trinkt einen Schluck. Lächelt.',
      en: 'Take a sip. Smile.',
    },
    questions: [
      {
        id: 'old-friends-q01',
        de: 'Was ist deine erste klare Erinnerung an uns?',
        en: 'What is your first clear memory of us?',
      },
      {
        id: 'old-friends-q02',
        de: 'Welche einzelne gemeinsame Szene kannst du heute noch besonders deutlich vor dir sehen?',
        en: 'What single moment we shared can you still picture especially clearly?',
        responseCard: RESPONSE_CARDS.followUpDetail,
      },
      {
        id: 'old-friends-q03',
        de: 'Welcher Ort, Gegenstand, Geruch oder Klang gehört für dich zu einer Erinnerung an uns?',
        en: 'What place, object, smell, or sound belongs to one of your memories of us?',
      },
      {
        id: 'old-friends-q04',
        de: 'An welches kleine gemeinsame Detail habe ich vielleicht nicht mehr gedacht?',
        en: 'What small detail from something we shared might I have forgotten?',
        responseCard: RESPONSE_CARDS.followUpDetail,
      },
      {
        id: 'old-friends-q05',
        de: 'Bei welchem konkreten Moment haben wir einmal besonders ehrlich miteinander gelacht?',
        en: 'During what specific moment did we once laugh most genuinely together?',
      },
      {
        id: 'old-friends-q06',
        de: 'Welcher damals gewöhnliche Moment zwischen uns fühlt sich rückblickend bedeutungsvoll an?',
        en: 'What ordinary moment between us feels meaningful in hindsight?',
      },
      {
        id: 'old-friends-q07',
        de: 'Welche frühere Version von mir ist dir besonders im Gedächtnis geblieben?',
        en: 'What earlier version of me has stayed in your memory most clearly?',
      },
      {
        id: 'old-friends-q08',
        de: 'Was hat dir unsere Freundschaft in dieser Phase deines Lebens gegeben?',
        en: 'What did our friendship give you during that phase of your life?',
      },
      {
        id: 'old-friends-q09',
        de: 'Welche unserer alten Geschichten bedeutet dir heute etwas anderes als damals?',
        en: 'Which story from our past means something different to you now than it did then?',
      },
      {
        id: 'old-friends-q10',
        de: 'Wofür möchtest du mir aus dieser Zeit danken – und welche Eigenschaft von mir wurde darin sichtbar?',
        en: 'What would you like to thank me for from that time, and what quality of mine did it reveal?',
      },
      {
        id: 'old-friends-q11',
        de: 'Welche konkrete Erinnerung zeigt, wann wir als Team besonders gut funktioniert haben?',
        en: 'What specific memory shows a time when we worked especially well as a team?',
      },
      {
        id: 'old-friends-q12',
        de: 'Welche gemeinsame Erinnerung erzählen wir unterschiedlich – und was ist an beiden Versionen interessant?',
        en: 'Which shared memory do we tell differently, and what is interesting about both versions?',
        responseCard: RESPONSE_CARDS.reflectBothVersions,
      },
    ],
  },
  {
    id: 'inbetween',
    title: { de: 'DAZWISCHEN', en: 'IN BETWEEN' },
    intro: {
      de: 'Jetzt geht es um die Zeit dazwischen – ohne dass sie erklärt oder gelöst werden muss.',
      en: "Now it's about the time in between—without needing it explained or solved.",
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
        id: 'old-friends-q13',
        de: 'Was hat sich in deinem Leben am stärksten verändert, seit wir uns besonders nah waren?',
        en: 'What has changed most in your life since the time when we were especially close?',
      },
      {
        id: 'old-friends-q14',
        de: 'Welcher Teil deines heutigen Lebens passt am wenigsten zu dem Bild, das ich früher von dir hatte?',
        en: 'What part of your life today fits least with the picture I used to have of you?',
      },
      {
        id: 'old-friends-q15',
        de: 'Welche Entscheidung aus der Zeit dazwischen hat die heutige Version von dir besonders geprägt?',
        en: 'What decision from the time in between most shaped who you are today?',
      },
      {
        id: 'old-friends-q16',
        de: 'Was wünschst du dir, dass ich über die Zeit dazwischen verstehe?',
        en: 'What would you like me to understand about the time in between?',
      },
      {
        id: 'old-friends-q17',
        de: 'Was hast du in dieser Zeit über dich gelernt, das du früher noch nicht wissen konntest?',
        en: 'What did you learn about yourself during that time that you could not have known before?',
      },
      {
        id: 'old-friends-q18',
        de: 'Was war an unserer Distanz leichter oder schwerer, als du erwartet hattest?',
        en: 'What about the distance between us was easier or harder than you expected?',
      },
      {
        id: 'old-friends-q19',
        de: 'Was hat dir geholfen, mit weniger Kontakt auf eine für dich gute Weise umzugehen?',
        en: 'What helped you handle having less contact in a way that worked for you?',
      },
      {
        id: 'old-friends-q20',
        de: 'Gibt es etwas aus der Zeit dazwischen, das du erzählen möchtest, ohne dass es erklärt oder gelöst werden muss?',
        en: 'Is there something from the time in between you would like to share without needing it to be explained or solved?',
        stayEnabled: true,
        responseCard: RESPONSE_CARDS.validateNoJustify,
      },
      {
        id: 'old-friends-q21',
        de: 'Welche alte Annahme über die andere Person bist du heute bereit zu überprüfen?',
        en: 'What old assumption about the other person are you ready to reconsider today?',
      },
      {
        id: 'old-friends-q22',
        de: 'Was fühlt sich zwischen uns noch immer mühelos an?',
        en: 'What still feels effortless between us?',
      },
      {
        id: 'old-friends-q23',
        de: 'Wie hat sich die Art von Unterstützung verändert, die dir heute wirklich hilft?',
        en: 'How has the kind of support that genuinely helps you changed over time?',
      },
      {
        id: 'old-friends-q24',
        de: 'Welcher Teil deines heutigen Lebens würde mich vermutlich am meisten überraschen?',
        en: 'What part of your life today would probably surprise me most?',
      },
    ],
  },
  {
    id: 'again',
    title: { de: 'WIEDER', en: 'AGAIN' },
    intro: {
      de: 'Dieser Akt fragt, was heute stimmig wäre – ohne eine Wiederannäherung vorauszusetzen.',
      en: 'This act asks what would feel right today—without assuming a reconnection.',
    },
    questions: [
      {
        id: 'old-friends-q25',
        de: 'Welche Form von Kontakt würde sich heute für dich stimmig anfühlen – ohne etwas für später festlegen zu müssen?',
        en: 'What kind of contact would feel right to you today without deciding anything about the future?',
      },
      {
        id: 'old-friends-q26',
        de: 'Welche alte Tradition sollten wir behalten, verändern oder bewusst ruhen lassen?',
        en: 'What old tradition should we keep, adapt, or consciously leave at rest?',
      },
      {
        id: 'old-friends-q27',
        de: 'Welche Gewohnheit oder Erwartung aus früher darf dort bleiben?',
        en: 'What habit or expectation from the past is allowed to stay there?',
      },
      {
        id: 'old-friends-q28',
        de: 'Welche gemeinsame Tradition wäre schön wiederzubeleben oder neu zu erfinden?',
        en: 'What shared tradition would be good to revive or reinvent?',
      },
      {
        id: 'old-friends-q29',
        de: 'Über welches Thema von heute wärst du neugierig, ohne dass daraus ein schwieriges Gespräch werden muss?',
        en: 'What present-day topic are you curious to discuss without it having to become a difficult conversation?',
      },
      {
        id: 'old-friends-q30',
        de: 'Was brauchst du heute, um dich von mir als die Person gesehen zu fühlen, die du inzwischen bist?',
        en: 'What do you need today to feel seen by me as the person you have become?',
        twist: 'deeper',
        responseCard: RESPONSE_CARDS.validateNoJustify,
      },
      {
        id: 'old-friends-q31',
        de: 'Gibt es ein Gespräch, für das heute mehr Raum wäre als früher?',
        en: 'Is there a conversation that has more room to happen today than it did before?',
      },
      {
        id: 'old-friends-q32',
        de: 'Falls wir wieder mehr Kontakt haben: Woran würden wir merken, dass er für uns beide gut ist?',
        en: 'If we have more contact again, what would show us that it is good for both of us?',
      },
      {
        id: 'old-friends-q33',
        de: 'Welche Grenze oder Erwartung sollten wir klar aussprechen, statt sie aus früher abzuleiten?',
        en: 'What boundary or expectation should we say out loud instead of carrying it over from the past?',
      },
      {
        id: 'old-friends-q34',
        de: 'Wenn wir eine echte neue Erinnerung schaffen: Welche dürfte es sein?',
        en: 'If we create a genuine new memory together, what would you like it to be?',
        responseCard: RESPONSE_CARDS.followUpFirstStep,
      },
      {
        id: 'old-friends-q35',
        de: 'Welche Seite der anderen Person möchtest du heute neu kennenlernen?',
        en: 'What side of the other person would you like to get to know again as they are today?',
      },
      {
        id: 'old-friends-q36',
        de: 'Welche Eigenschaft schätzt du an der Person vor dir heute – unabhängig von eurer gemeinsamen Geschichte?',
        en: 'What quality do you appreciate in the person in front of you today, apart from your shared history?',
        last: true,
      },
    ],
  },
];

const OLD_FRIENDS_Q37 = {
  neither: {
    de: 'Zwei vorgemerkte Fragen sind noch offen. Wenn es sich für euch gut anfühlt, stellt sie jetzt nacheinander. Keine Antwort ist geschuldet.',
    en: 'Two saved questions are still open. If it feels right, ask them one at a time. No answer is owed.',
  },
  one: (lang, who, other) =>
    lang === 'de'
      ? `${who}, wenn es sich für dich gut anfühlt: Stell ${other} jetzt deine vorgemerkte Frage. Eine Antwort bleibt freiwillig.`
      : `${who}, if it feels right, ask ${other} the question you saved. Answering is still optional.`,
  both: {
    de: 'Welche Seite der Person vor dir macht dich heute neugierig – unabhängig davon, wie es weitergeht?',
    en: 'What side of the person in front of you makes you curious today, regardless of what happens next?',
  },
};

const OLD_FRIENDS_MODES = [
  {
    id: 'easy',
    title: { de: 'EASY', en: 'EASY' },
    meta: { de: 'Locker und ehrlich', en: 'Easygoing and honest' },
    blurb: ROUTE_NEUTRAL_BLURB,
    twists: DEEPER_AND_STAY,
  },
];

const OLD_FRIENDS_SECRET_AT_INDEX = 27;

// Same every-third-question shape as FRIENDS -- verbatim from the
// catalog's per-question Route column in section 7.
const OLD_FRIENDS_ROUTES = {
  quick: {
    ...ROUTE_PRESETS.quick,
    minutes: 18,
    actIndices: [
      [0, 3, 6, 9],
      [0, 3, 6, 9],
      [0, 3, 6, 9],
    ],
  },
  standard: {
    ...ROUTE_PRESETS.standard,
    minutes: 32,
    actIndices: [
      [0, 1, 3, 4, 6, 7, 9, 10],
      [0, 1, 3, 4, 6, 7, 9, 10],
      [0, 1, 3, 4, 6, 7, 9, 10],
    ],
  },
  full: {
    ...ROUTE_PRESETS.full,
    minutes: 60,
  },
};

// Nostalgic and warm -- sepia/tan, muted taupe, soft sage.
const OLD_FRIENDS_ACT_STYLE = [
  { accent: '#C99B5F', chrome: 1, progress: 'full', glow: 0.24 },
  { accent: '#8C7A6B', chrome: 0.5, progress: 'count', glow: 0.13 },
  { accent: '#5B8C7B', chrome: 0.22, progress: 'number', glow: 0.05 },
];

export {
  OLD_FRIENDS_ACTS,
  OLD_FRIENDS_MODES,
  OLD_FRIENDS_ACT_STYLE,
  OLD_FRIENDS_Q37,
  OLD_FRIENDS_SECRET_AT_INDEX,
  OLD_FRIENDS_ROUTES,
};
