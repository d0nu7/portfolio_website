/*
 * Shared content building blocks for all packs (refactoring roadmap phase 2).
 *
 * Extracted from closer.js without content changes. Everything here is used
 * by more than one pack; pack-specific values remain in their pack modules.
 */

const NO_TWISTS = { predict: false, both: false, nothinking: false, deeper: false, stay: false };
// The two twist combinations the iteration-8 packs actually use, once
// twists were assigned to a restrained handful of their questions: GO
// DEEPER plus STAY (most packs) and GO DEEPER alone (CHAOS, which is
// deliberately low-stakes enough that no question earns a "take a
// moment" pause). PREDICT/BOTH/NO THINKING stay off everywhere outside
// CLASSIC -- those are more elaborate interaction mechanics that would
// need their own dedicated playful-style decision, not something to
// default on while assigning a first, sparse pass of twists.
const DEEPER_AND_STAY = { predict: false, both: false, nothinking: false, deeper: true, stay: true };
const DEEPER_ONLY = { predict: false, both: false, nothinking: false, deeper: true, stay: false };
const ROUTE_NEUTRAL_BLURB = {
  de: 'Zurückhaltende Inszenierung, ausgewählte Route.',
  en: 'Understated presentation for your selected route.',
};

/*
 * Response Card labels (iteration 8 catalog: FRIENDS/OLD FRIENDS/DEEP each
 * recommend one after specific questions). The four category names are
 * identical loanwords in both languages in the catalog itself, same as
 * ORIGINAL/CALM/PLAYFUL elsewhere in this file -- still a { de, en } pair
 * for consistency with the file's own convention that every user-visible
 * string is one. `question.responseCard = { label, text }` on a question
 * object is how CloserGame.js finds these; not every question has one.
 */
const RESPONSE_CARD_LABEL = {
  celebrate: { de: 'CELEBRATE', en: 'CELEBRATE' },
  followUp: { de: 'FOLLOW UP', en: 'FOLLOW UP' },
  validate: { de: 'VALIDATE', en: 'VALIDATE' },
  reflect: { de: 'REFLECT', en: 'REFLECT' },
};

/*
 * The catalog's twelve response cards as complete reusable objects
 * (refactoring roadmap phase 1).
 *
 * Previously only the label was shared while the associated text was copied
 * at every use. Keeping label and text together prevents editorial drift.
 *
 * Each applicable question now references one of these cards.
 */
const RESPONSE_CARDS = {
  celebrateShare: {
    label: RESPONSE_CARD_LABEL.celebrate,
    text: {
      de: 'Freu dich kurz mit, bevor du deine eigene Geschichte erzählst.',
      en: 'Take a moment to celebrate with them before sharing your own story.',
    },
  },
  celebrateHonor: {
    label: RESPONSE_CARD_LABEL.celebrate,
    text: {
      de: 'Würdige kurz, was dieser Moment die Person gekostet oder ihr bedeutet hat.',
      en: 'Take a moment to honor what that moment cost the person or meant to them.',
    },
  },
  followUpDetail: {
    label: RESPONSE_CARD_LABEL.followUp,
    text: {
      de: 'Frag nach einem einzigen Detail aus dieser Szene.',
      en: 'Ask for one detail from that moment.',
    },
  },
  followUpUnderstand: {
    label: RESPONSE_CARD_LABEL.followUp,
    text: {
      de: 'Frag nach einem konkreten Detail, das dir hilft, die Antwort besser zu verstehen.',
      en: 'Ask for one specific detail that helps you understand the answer better.',
    },
  },
  followUpBehavior: {
    label: RESPONSE_CARD_LABEL.followUp,
    text: {
      de: 'Frag, welches konkrete Verhalten den Unterschied gemacht hat.',
      en: 'Ask what specific behavior made the difference.',
    },
  },
  followUpFirstStep: {
    label: RESPONSE_CARD_LABEL.followUp,
    text: {
      de: 'Was wäre ein kleiner, realistischer erster Schritt?',
      en: 'What would be one small, realistic first step?',
    },
  },
  validateNoSolution: {
    label: RESPONSE_CARD_LABEL.validate,
    text: {
      de: 'Keine Lösung nötig. Zeig zuerst, dass du es gehört hast.',
      en: 'No solution is needed. First, show that you heard them.',
    },
  },
  validateNoJudgment: {
    label: RESPONSE_CARD_LABEL.validate,
    text: {
      de: 'Keine Lösung und keine Bewertung. Zeig zuerst, dass du es gehört hast.',
      en: 'No solution and no judgment. First, show that you heard them.',
    },
  },
  validateNoJustify: {
    label: RESPONSE_CARD_LABEL.validate,
    text: {
      de: 'Du musst nichts rechtfertigen oder reparieren. Zeig zuerst, dass du es gehört hast.',
      en: 'You do not need to justify or repair anything. First, show that you heard them.',
    },
  },
  reflectUnderstood: {
    label: RESPONSE_CARD_LABEL.reflect,
    text: {
      de: 'Sag in einem Satz, was du an der Antwort verstanden hast.',
      en: 'In one sentence, say what you understood from the answer.',
    },
  },
  reflectKeepInMind: {
    label: RESPONSE_CARD_LABEL.reflect,
    text: {
      de: 'Sag in einem Satz, was du künftig beachten möchtest.',
      en: 'In one sentence, say what you would like to keep in mind from now on.',
    },
  },
  reflectBothVersions: {
    label: RESPONSE_CARD_LABEL.reflect,
    text: {
      de: 'Sucht nicht nach der richtigen Version. Benennt, was jede Erinnerung für euch bedeutet.',
      en: 'Do not look for the correct version. Name what each memory means to you.',
    },
  },
};

/*
 * Act numerals (refactoring roadmap phase 2).
 *
 * Every pack uses the same three values, derived from the act index.
 * resolvedActs() supplies them unless a pack explicitly overrides `numeral`.
 */
const ACT_NUMERALS = [
  { de: 'AKT I', en: 'ACT I' },
  { de: 'AKT II', en: 'ACT II' },
  { de: 'AKT III', en: 'ACT III' },
];

/*
 * Route presets (refactoring roadmap phase 2).
 *
 * IDs, titles and shared metadata are common across packs; only `minutes`
 * and curated `actIndices` differ. A pack can therefore write:
 *
 *   quick: { ...ROUTE_PRESETS.quick, minutes: 15, actIndices: [...] }
 *
 * and override individual fields when needed. The full route includes
 * `actIndices: [null, null, null]` because that value is identical for all
 * packs.
 */
const ROUTE_PRESETS = {
  quick: {
    id: 'quick',
    title: { de: 'KURZ', en: 'QUICK' },
    meta: { de: 'Ein Ausschnitt', en: 'A taste of it' },
  },
  standard: {
    id: 'standard',
    title: { de: 'STANDARD', en: 'STANDARD' },
    meta: { de: 'Kuratierte Auswahl', en: 'Curated selection' },
  },
  full: {
    id: 'full',
    title: { de: 'VOLL', en: 'FULL' },
    meta: { de: 'Alle 36 Fragen', en: 'All 36 questions' },
    actIndices: [null, null, null],
  },
};

export {
  NO_TWISTS,
  DEEPER_AND_STAY,
  DEEPER_ONLY,
  ROUTE_NEUTRAL_BLURB,
  RESPONSE_CARD_LABEL,
  RESPONSE_CARDS,
  ACT_NUMERALS,
  ROUTE_PRESETS,
};
