import {
  ROUTE_PRESETS,
  DEEPER_AND_STAY,
  ROUTE_NEUTRAL_BLURB,
} from '../shared';

/* ======================================================================
 * DATE NIGHT (iteration 8 catalog rollout) -- content transcribed
 * verbatim from docs/closer/content/question-catalog.de-en.md section
 * 4. Same no-twists-yet stance as FIRST_DATE above (no question is marked
 * with a twist in the catalog); a single WARM style for now.
 * ====================================================================== */

const DATE_NIGHT_ACTS = [
  {
    id: 'spark',
    title: { de: 'FUNKE', en: 'SPARK' },
    intro: {
      de: 'Es geht um Anziehung und Wärme – prickelnd, aber ohne Druck.',
      en: 'This is about attraction and warmth—a spark, without any pressure.',
    },
    breakText: {
      de: 'Ihr wisst jetzt ein bisschen mehr darüber, was zwischen euch funkt.',
      en: "You now know a little more about what sparks between you.",
    },
    breakSub: {
      de: 'Trinkt einen Schluck. Lächelt euch an.',
      en: 'Take a sip. Smile at each other.',
    },
    questions: [
      {
        id: 'date-night-q01',
        de: 'Welche kleine Sache findest du überraschend attraktiv?',
        en: 'What small thing do you find surprisingly attractive?',
      },
      {
        id: 'date-night-q02',
        de: 'Welches Kompliment bleibt bei dir besonders lange hängen?',
        en: 'What kind of compliment tends to stay with you?',
      },
      {
        id: 'date-night-q03',
        de: 'Woran merkst du, dass jemand mit dir flirtet?',
        en: 'How can you tell when someone is flirting with you?',
      },
      {
        id: 'date-night-q04',
        de: 'Bei welcher Art von Date vergisst du leicht die Zeit?',
        en: 'What kind of date makes it easy for you to lose track of time?',
      },
      {
        id: 'date-night-q05',
        de: 'Welcher konkrete Moment zwischen euch hatte zuletzt einen besonderen Funken?',
        en: 'What recent moment between you had a special spark?',
      },
      {
        id: 'date-night-q06',
        de: 'Welche Seite an deinem Gegenüber entdeckst du immer wieder gern neu?',
        en: 'What side of the person across from you do you still enjoy rediscovering?',
      },
      {
        id: 'date-night-q07',
        de: 'Welche Art von Ausstrahlung zieht deine Aufmerksamkeit sofort an?',
        en: 'What kind of presence catches your attention immediately?',
      },
      {
        id: 'date-night-q08',
        de: 'Welche spielerische Geste lässt dich merken, dass du gemeint bist?',
        en: 'What playful gesture makes you feel singled out in the best way?',
      },
      {
        id: 'date-night-q09',
        de: 'Was macht einen gewöhnlichen Moment für dich romantisch?',
        en: 'What turns an ordinary moment into a romantic one for you?',
      },
      {
        id: 'date-night-q10',
        de: 'Welche gemeinsame Erinnerung gibt dir sofort ein warmes Gefühl?',
        en: 'What shared memory gives you an instant warm feeling?',
      },
      {
        id: 'date-night-q11',
        de: 'Welche Art von Vorfreude genießt du besonders?',
        en: 'What kind of anticipation do you enjoy most?',
      },
      {
        id: 'date-night-q12',
        de: 'Welche Kleinigkeit an deinem Gegenüber ist dir heute positiv aufgefallen?',
        en: 'What small thing about the person across from you have you appreciated tonight?',
      },
    ],
  },
  {
    id: 'tension',
    title: { de: 'SPANNUNG', en: 'TENSION' },
    intro: {
      de: 'Jetzt geht es um Nähe, Berührung und Wünsche – immer nur, wenn ihr wollt.',
      en: "Now it's about closeness, touch and desire—only ever if you want to.",
    },
    breakText: {
      de: 'Die Spannung darf bleiben, wo sie gerade ist.',
      en: 'The tension is welcome to stay exactly where it is.',
    },
    breakSub: {
      de: 'Macht weiter, wenn ihr so weit seid.',
      en: "Continue when you're ready.",
    },
    questions: [
      {
        id: 'date-night-q13',
        de: 'Wann fühlst du dich besonders begehrt?',
        en: 'When do you feel most desired?',
      },
      {
        id: 'date-night-q14',
        de: 'Welche Form von Nähe lässt dich entspannen?',
        en: 'What kind of closeness helps you relax?',
      },
      {
        id: 'date-night-q15',
        de: 'Was würdest du bei einem Date gern öfter selbst initiieren?',
        en: 'What would you like to initiate more often on a date?',
      },
      {
        id: 'date-night-q16',
        de: 'Welche unausgesprochene Spannung zwischen zwei Menschen findest du schön?',
        en: 'What kind of unspoken tension between two people do you enjoy?',
      },
      {
        id: 'date-night-q17',
        de: 'Welche verspielte Aufmerksamkeit lässt dich besonders gewählt fühlen?',
        en: 'What kind of playful attention makes you feel especially chosen?',
      },
      {
        id: 'date-night-q18',
        de: 'Welche Art von Berührung fühlt sich für dich besonders zärtlich an?',
        en: 'What kind of touch feels especially tender to you?',
      },
      {
        id: 'date-night-q19',
        de: 'Welche Atmosphäre spricht deine Sinne besonders an?',
        en: 'What kind of atmosphere awakens your senses?',
      },
      {
        id: 'date-night-q20',
        de: 'Falls Küsse für dich dazugehören: Welche Art von Kuss fühlt sich besonders innig an?',
        en: 'If kissing is part of intimacy for you, what kind of kiss feels especially close?',
      },
      {
        id: 'date-night-q21',
        de: 'Welche neue gemeinsame Erfahrung könnte zwischen euch einen Funken wecken?',
        en: 'What new experience together could bring out a fresh spark between you?',
        twist: 'deeper',
      },
      {
        id: 'date-night-q22',
        de: 'Welches flirtende Kompliment würdest du heute gern hören?',
        en: 'What flirty compliment would you enjoy hearing tonight?',
      },
      {
        id: 'date-night-q23',
        de: 'Welches Tempo lässt Anziehung für dich wachsen?',
        en: 'What pace allows attraction to grow for you?',
      },
      {
        id: 'date-night-q24',
        de: 'Was lässt Anziehung für dich verspielt statt druckvoll wirken?',
        en: 'What makes attraction feel playful rather than pressured to you?',
      },
    ],
  },
  {
    id: 'openness',
    title: { de: 'OFFEN', en: 'OPENNESS' },
    intro: {
      de: 'Dieser Akt öffnet Verlangen und Grenzen ehrlich, ohne dass daraus ein Versprechen für heute wird.',
      en: "This act opens up desire and boundaries honestly, without turning into a promise for tonight.",
    },
    questions: [
      {
        id: 'date-night-q25',
        de: 'Was hilft dir, dich sicher genug zu fühlen, um dich fallen zu lassen?',
        en: 'What helps you feel safe enough to let your guard down?',
      },
      {
        id: 'date-night-q26',
        de: 'Welche Grenze macht Intimität für dich erst möglich?',
        en: 'What boundary helps make intimacy possible for you?',
      },
      {
        id: 'date-night-q27',
        de: 'Was sollte ein Mensch über dein Verlangen verstehen, ohne es persönlich zu nehmen?',
        en: 'What should someone understand about your desire without taking it personally?',
      },
      {
        id: 'date-night-q28',
        de: 'Was macht es dir leicht, ein ehrliches Ja oder Nein auszusprechen?',
        en: 'What makes it easier for you to give an honest yes or no?',
      },
      {
        id: 'date-night-q29',
        de: 'Welche Form von Nähe fühlt sich gut an, auch wenn sie nirgendwohin führen muss?',
        en: 'What kind of closeness feels good even when it does not have to lead anywhere?',
        stayEnabled: true,
      },
      {
        id: 'date-night-q30',
        de: 'Welche romantische Initiative lässt dich wirklich gesehen fühlen?',
        en: 'What romantic initiative makes you feel truly seen?',
      },
      {
        id: 'date-night-q31',
        de: 'Welche Reaktion hilft dir, wenn eure Wünsche gerade nicht übereinstimmen?',
        en: 'What kind of response helps when your wishes do not match in the moment?',
      },
      {
        id: 'date-night-q32',
        de: 'Welches kleine Sinnesdetail dieses Abends – ein Blick, ein Geräusch, ein Geschmack oder etwas anderes – möchtest du in Erinnerung behalten?',
        en: 'What small sensory detail from tonight—a look, a sound, a taste, or something else—would you like to remember?',
      },
      {
        id: 'date-night-q33',
        de: 'Welchen Wunsch würdest du gern teilen, wenn daraus keine Erwartung entsteht?',
        en: 'What wish would you like to share if it came with no expectation?',
        stayEnabled: true,
      },
      {
        id: 'date-night-q34',
        de: 'Wie sieht für dich ein schöner Ausklang nach einem besonders nahen Date aus?',
        en: 'What does a lovely ending to an especially close date look like to you?',
      },
      {
        id: 'date-night-q35',
        de: 'Welche kleine neue Erfahrung würdest du bei einem nächsten Date gern teilen?',
        en: 'What small new experience would you enjoy sharing on a future date?',
      },
      {
        id: 'date-night-q36',
        de: 'Welcher Gedanke aus diesem Abend soll noch ein wenig nachklingen?',
        en: 'What thought from tonight would you like to linger a little longer?',
        last: true,
      },
    ],
  },
];

const DATE_NIGHT_Q37 = {
  neither: {
    de: 'Stellt euch nacheinander eure vorgemerkten Fragen, wenn es sich für euch gut anfühlt.',
    en: 'Take turns asking the questions you saved, if that feels good to both of you.',
  },
  one: (lang, who, other) =>
    lang === 'de'
      ? `${who}, stell ${other} deine vorgemerkte Frage, wenn es sich für euch gut anfühlt.`
      : `${who}, ask ${other} the question you saved, if that feels good to both of you.`,
  both: {
    de: 'Stellt euch noch eine Frage, die den Funken dieses Abends mit in morgen nimmt.',
    en: "Ask each other one more question that carries tonight's spark into tomorrow.",
  },
};

const DATE_NIGHT_MODES = [
  {
    id: 'warm',
    title: { de: 'WARM', en: 'WARM' },
    meta: { de: 'Prickelnd, nicht explizit', en: 'A spark, not explicit' },
    blurb: ROUTE_NEUTRAL_BLURB,
    twists: DEEPER_AND_STAY,
  },
];

const DATE_NIGHT_SECRET_AT_INDEX = 27;

/*
 * Q01,Q02,Q05,Q09 / Q13,Q14,Q18,Q24 / Q25,Q28,Q33,Q36 (Quick);
 * Q01-Q02,Q04-Q06,Q09-Q10,Q12 / Q13-Q15,Q18,Q20,Q21,Q23,Q24 /
 * Q25,Q26,Q28-Q30,Q32,Q33,Q36 (Standard) -- verbatim from the catalog's
 * curated-routes list.
 */
const DATE_NIGHT_ROUTES = {
  quick: {
    ...ROUTE_PRESETS.quick,
    minutes: 18,
    actIndices: [
      [0, 1, 4, 8],
      [0, 1, 5, 11],
      [0, 3, 8, 11],
    ],
  },
  standard: {
    ...ROUTE_PRESETS.standard,
    minutes: 32,
    actIndices: [
      [0, 1, 3, 4, 5, 8, 9, 11],
      [0, 1, 2, 5, 7, 8, 10, 11],
      [0, 1, 3, 4, 5, 7, 8, 11],
    ],
  },
  full: {
    ...ROUTE_PRESETS.full,
    minutes: 55,
  },
};

// Sensual, distinct from FIRST_DATE's lighter coral/rose/gold.
const DATE_NIGHT_ACT_STYLE = [
  { accent: '#FF5C8A', chrome: 1, progress: 'full', glow: 0.3 },
  { accent: '#C24E9E', chrome: 0.5, progress: 'count', glow: 0.17 },
  { accent: '#F2A65A', chrome: 0.22, progress: 'number', glow: 0.06 },
];

export {
  DATE_NIGHT_ACTS,
  DATE_NIGHT_MODES,
  DATE_NIGHT_ACT_STYLE,
  DATE_NIGHT_Q37,
  DATE_NIGHT_SECRET_AT_INDEX,
  DATE_NIGHT_ROUTES,
};
