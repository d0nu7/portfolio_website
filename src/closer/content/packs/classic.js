const CLASSIC_ACTS = [
  {
    id: 'curious',
    numeral: { de: 'AKT I', en: 'ACT I' },
    title: { de: 'NEUGIERIG', en: 'CURIOUS' },
    // Reworded per the iteration-6 content review's P2 finding: "start
    // light" undersold what's actually here -- question 7 asks about your
    // own death, question 10 about how you were raised. Still an honest
    // on-ramp, just not a promise the act doesn't keep.
    intro: {
      de: 'Fangt neugierig an. Einige Fragen werden schon hier persönlicher. Ihr könnt jederzeit weitergehen.',
      en: "Start with curiosity. Some questions here already get personal. You can move on whenever you're ready.",
    },
    // Time-neutral on purpose (iteration-8 holistic review, BF8-04): "vor
    // 15 Minuten" was always wrong for a shorter route's Act I, which is
    // only a few minutes long, and even in Full, pacing varies enough
    // between couples that a specific elapsed time is a claim the app
    // can't actually back up.
    breakText: {
      de: 'Ihr wisst jetzt wahrscheinlich Dinge voneinander, die ihr vor diesem Akt noch nicht wusstet.',
      en: "You probably know things about each other now that you didn't know before this act.",
    },
    breakSub: {
      de: 'Trinkt einen Schluck. Streckt euch. Atmet.',
      en: 'Take a sip. Stretch. Breathe.',
    },
    questions: [
      {
        id: 'classic-q01',
        de: 'Wenn du jeden und jede auf der Welt einladen könntest, mit wem würdest du gerne essen gehen?',
        en: 'If you could invite anyone in the world, who would you want to have dinner with?',
        twist: 'predict',
      },
      {
        id: 'classic-q02',
        de: 'Wärst du gerne berühmt? Wenn ja, wie?',
        en: 'Would you like to be famous? If so, in what way?',
        twist: 'nothinking',
      },
      {
        id: 'classic-q03',
        de: 'Probst du manchmal vor einem Telefonat, was du sagen wirst? Warum?',
        en: 'Do you ever rehearse what you are going to say before a phone call? Why?',
      },
      {
        id: 'classic-q04',
        de: 'Wie würde dein perfekter Tag aussehen?',
        en: 'What would your perfect day look like?',
      },
      {
        id: 'classic-q05',
        de: 'Wann hast du zuletzt für dich gesungen? Und für jemand anderen?',
        en: 'When did you last sing to yourself? And to someone else?',
      },
      {
        id: 'classic-q06',
        de: 'Wenn du bis 90 leben könntest und du entweder den Körper oder den Geist eines Dreißigjährigen die restlichen 60 Jahre behalten könntest – wofür würdest du dich entscheiden?',
        en: 'If you could live to 90 and keep either the body or the mind of a thirty-year-old for the last 60 years — which would you choose?',
        twist: 'both',
      },
      {
        // No twist here on purpose (regression-test iteration 6, content
        // review): PREDICT means guessing what the other person is about to
        // say out loud, which turns their own mortality into a guessing
        // game -- tonally wrong for this question, even though it's a
        // deliberate, legitimate part of CLASSIC otherwise. The question
        // itself is unchanged.
        id: 'classic-q07',
        de: 'Hast du eine Vorahnung, wie du sterben wirst?',
        en: 'Do you have a hunch about how you are going to die?',
      },
      {
        id: 'classic-q08',
        de: 'Nenne drei Dinge, die du und dein Gegenüber scheinbar gemeinsam haben.',
        en: 'Name three things you and the other person seem to have in common.',
        twist: 'both',
      },
      {
        id: 'classic-q09',
        de: 'Wofür bist du in deinem Leben am dankbarsten?',
        en: 'What are you most grateful for in your life?',
      },
      {
        id: 'classic-q10',
        de: 'Wenn du etwas daran ändern könntest, wie du aufgezogen wurdest, was wäre das?',
        en: 'If you could change one thing about the way you were raised, what would it be?',
      },
      {
        id: 'classic-q11',
        de: 'Erzähle deinem Gegenüber innerhalb von vier Minuten deine Lebensgeschichte – so detailreich wie möglich!',
        en: 'Tell the other person your life story in four minutes — in as much detail as you can.',
      },
      {
        id: 'classic-q12',
        de: 'Wenn du morgen aufwachst und eine Eigenschaft oder Fähigkeit dazugewonnen hast, welche hättest du dann gerne?',
        en: 'If you woke up tomorrow having gained one quality or ability, which would you want?',
        twist: 'nothinking',
      },
    ],
  },
  {
    id: 'closer',
    numeral: { de: 'AKT II', en: 'ACT II' },
    title: { de: 'NÄHER', en: 'CLOSER' },
    intro: {
      de: 'Die Fragen werden jetzt ein bisschen persönlicher.',
      en: 'The questions get a little more personal now.',
    },
    breakText: {
      de: 'Keine Eile.',
      en: 'No rush.',
    },
    breakSub: {
      de: 'Macht weiter, wenn ihr so weit seid.',
      en: "Continue when you're ready.",
    },
    questions: [
      {
        id: 'classic-q13',
        de: 'Wenn dir eine Kristallkugel die Wahrheit über dich, dein Leben, deine Zukunft oder irgendetwas sonst verraten könnte, was würdest du wissen wollen?',
        en: 'If a crystal ball could tell you the truth about yourself, your life, your future or anything else — what would you want to know?',
        twist: 'predict',
      },
      {
        id: 'classic-q14',
        de: 'Gibt es etwas, von dem du schon lange träumst, es zu tun? Warum hast du es noch nicht getan?',
        en: 'Is there something you have dreamed of doing for a long time? Why have you not done it yet?',
        twist: 'deeper',
      },
      {
        id: 'classic-q15',
        de: 'Was ist deine größte Leistung in deinem Leben?',
        en: 'What is the greatest achievement of your life?',
      },
      {
        id: 'classic-q16',
        de: 'Was schätzt du an einer Freundschaft am meisten?',
        en: 'What do you value most in a friendship?',
        twist: 'predict',
      },
      {
        id: 'classic-q17',
        de: 'Was ist deine wertvollste Erinnerung?',
        en: 'What is your most treasured memory?',
      },
      {
        id: 'classic-q18',
        de: 'Was ist deine schrecklichste Erinnerung?',
        en: 'What is your most terrible memory?',
      },
      {
        id: 'classic-q19',
        de: 'Wenn du wüsstest, dass du in einem Jahr plötzlich sterben wirst, würdest du irgendetwas daran ändern, wie du jetzt lebst? Warum?',
        en: 'If you knew you would die suddenly in one year, would you change anything about how you are living now? Why?',
        stayEnabled: true,
      },
      {
        id: 'classic-q20',
        de: 'Was bedeutet dir Freundschaft?',
        en: 'What does friendship mean to you?',
      },
      {
        id: 'classic-q21',
        de: 'Welche Rolle spielen Liebe und Zuneigung in deinem Leben?',
        en: 'What role do love and affection play in your life?',
      },
      {
        id: 'classic-q22',
        de: 'Wechselt euch ab, jeweils fünf positive Eigenschaften eures Gegenübers aufzuzählen.',
        en: 'Take turns naming five positive qualities of the other person.',
      },
      {
        id: 'classic-q23',
        de: 'Wie nahe und warmherzig ist deine Familie? Glaubst du, dass deine Kindheit glücklicher war als die anderer Menschen?',
        en: "How close and warm is your family? Do you think your childhood was happier than most people's?",
      },
      {
        id: 'classic-q24',
        de: 'Wie ist die Beziehung zu deiner Mutter?',
        en: 'What is your relationship with your mother like?',
        stayEnabled: true,
      },
    ],
  },
  {
    id: 'open',
    numeral: { de: 'AKT III', en: 'ACT III' },
    title: { de: 'OFFEN', en: 'OPEN' },
    // Content warning, not just a mood-setter (iteration-6 content review,
    // P1): the previous "this part gets personal" was true but nonspecific
    // -- Act III is where family, difficult memories, loss and death
    // questions concentrate (18, 19, 23, 24, 33, 35, 36).
    intro: {
      de: 'Dieser Akt berührt Familie, schwierige Erinnerungen, Verlust und Tod. Ihr müsst nichts beantworten. Überspringt oder beendet das Spiel jederzeit – ohne Erklärung.',
      en: "This act touches on family, difficult memories, loss and death. You don't have to answer anything. Pass or end the game anytime -- no explanation needed.",
    },
    questions: [
      {
        id: 'classic-q25',
        de: 'Macht jeweils drei wahre Aussagen, die "wir" beinhalten. Beispielsweise: "Wir sind beide in diesem Raum und fühlen …"',
        en: 'Each make three true statements using "we". For example: "We are both in this room and feeling …"',
      },
      {
        id: 'classic-q26',
        de: 'Vervollständige diesen Satz: Ich wünschte, ich hätte jemanden, mit dem ich … teilen kann.',
        en: 'Complete this sentence: I wish I had someone I could share … with.',
        twist: 'deeper',
      },
      {
        // Genderneutral rewording (bugfix-report iteration 7, BF-11/FR-08):
        // "für sie oder ihn" -> "für diese Person". Content, order and
        // meaning are unchanged -- only the binary pronoun is gone. English
        // was already neutral ("them").
        id: 'classic-q27',
        de: 'Wenn du mit deinem Gegenüber eng befreundet wärst: Was wäre für diese Person wichtig, über dich zu wissen?',
        en: 'If you were to become a close friend of the other person, what would be important for them to know about you?',
      },
      {
        // Same rewording as above: "an ihm oder ihr" -> "an dieser Person".
        id: 'classic-q28',
        de: 'Sag deinem Gegenüber, was du an dieser Person magst. Sei dabei sehr ehrlich und sag etwas, das du wahrscheinlich nicht zu jemandem sagen würdest, den du gerade getroffen hast.',
        en: 'Tell the other person what you like about them. Be very honest — say something you probably would not say to someone you had just met.',
      },
      {
        id: 'classic-q29',
        de: 'Teile einen peinlichen Moment deines Lebens.',
        en: 'Share an embarrassing moment from your life.',
      },
      {
        id: 'classic-q30',
        de: 'Wann hast du zuletzt vor einer anderen Person geweint? Und wann alleine?',
        en: 'When did you last cry in front of another person? And when alone?',
        stayEnabled: true,
      },
      {
        id: 'classic-q31',
        de: 'Was magst du jetzt schon an deinem Gegenüber?',
        en: 'What do you already like about the other person?',
      },
      {
        id: 'classic-q32',
        de: 'Was ist zu ernst, sodass man darüber keine Witze machen sollte?',
        en: 'What is too serious to joke about?',
      },
      {
        id: 'classic-q33',
        de: 'Wenn du heute Abend sterben würdest und keine Gelegenheit mehr hättest, mit jemandem zu reden, was würdest du am meisten bereuen, nicht gesagt zu haben? Und warum hast du es noch nicht gesagt?',
        en: 'If you were to die this evening with no chance to speak to anyone, what would you most regret not having said? And why have you not said it yet?',
        stayEnabled: true,
      },
      {
        id: 'classic-q34',
        de: 'Dein Haus und darin alles, was du besitzt, brennt. Menschen und Tiere sind in Sicherheit, und du hast die Möglichkeit, noch ein Ding zu retten. Was wäre das und wieso?',
        en: 'Your house, and everything you own in it, is burning. People and pets are safe, and you can save one more object. What would it be and why?',
      },
      {
        id: 'classic-q35',
        de: 'Von all den Menschen in deiner Familie, wessen Tod würde dich am meisten treffen? Warum?',
        en: 'Of everyone in your family, whose death would affect you most? Why?',
        stayEnabled: true,
      },
      {
        // Same rewording as questions 27/28: "wie er oder sie" -> "wie
        // diese Person".
        id: 'classic-q36',
        de: 'Teile ein persönliches Problem und frage dein Gegenüber, wie diese Person damit umgehen würde. Bitte dein Gegenüber außerdem darum, zu spiegeln, wie du dich mit dem Problem zu fühlen scheinst.',
        en: 'Share a personal problem and ask the other person how they would handle it. Then ask them to reflect back how you seem to feel about the problem you chose.',
        last: true,
      },
    ],
  },
];

/*
 * Question 37 is not a fixed question. It is the moment the game hands the
 * asking over, and which prompt appears depends on whether each person's
 * secret question actually got asked (spec 39).
 */
const CLASSIC_Q37 = {
  neither: {
    de: 'Stellt euch nacheinander eure vorgemerkten Fragen.',
    en: 'Take turns asking the questions you saved for later.',
  },
  one: (lang, who, other) =>
    lang === 'de'
      ? `${who}, stell ${other} deine vorgemerkte Frage.`
      : `${who}, ask ${other} the question you saved for later.`,
  both: {
    de: 'Stellt die Frage, von der ihr euch gewünscht hättet, dass sie heute Abend vorgekommen wäre.',
    en: 'Ask the question you wish had appeared tonight.',
  },
};

const CLASSIC_MODES = [
  {
    id: 'original',
    title: { de: 'ORIGINAL', en: 'ORIGINAL' },
    meta: { de: 'Zurückhaltend', en: 'Understated' },
    // Route-neutral on purpose (iteration-8 holistic review, BF8-03): a
    // hardcoded "36 Fragen/45 Minuten" here contradicted whatever route
    // (Quick/Standard/Full) was actually chosen one screen earlier. Scope
    // and time live on the route object and are shown once from there --
    // see routeSubtitleFor() and the duration screen in CloserGame.js.
    blurb: {
      de: 'Zurückhaltende Inszenierung, ausgewählte Route.',
      en: 'Understated presentation for your selected route.',
    },
    // Act I isn't twist-free any more (spec feedback 11): PREDICT is
    // restrained enough to fit ORIGINAL's tone -- it's still just reading
    // and guessing out loud, nothing performative -- so it stays on, giving
    // Act I its one remaining predict question (a second, on the "how will
    // you die" question, was removed -- see that question's own comment
    // above). BOTH and NO THINKING are more playful in character and stay
    // exclusive to the other style below.
    twists: { predict: true, both: false, nothinking: false, deeper: true, stay: true },
  },
  {
    // id stays 'datenight' on purpose (regression-test iteration 6, content
    // review): only the *displayed* name was misleading -- DATE NIGHT reads
    // as a lighter, more romantic question set, when this is actually the
    // same intense CLASSIC questions with more playful mechanics layered on
    // top. Renaming the id too would silently reassign anyone's saved,
    // in-progress game to a different style on resume (loadSaved()'s P2.4
    // normalization would fall back to pack.modes[0] for a modeId that no
    // longer exists) for a change that's purely about what's shown, not
    // what's stored. A real, separate DATE NIGHT *pack* with its own more
    // romantic/sensual questions is the review's actual recommendation for
    // that experience -- not this style being renamed to claim the name.
    id: 'datenight',
    title: { de: 'PLAYFUL', en: 'PLAYFUL' },
    meta: { de: 'Gleiche Tiefe', en: 'Same depth' },
    // Same route-neutral reasoning as ORIGINAL's blurb above (BF8-03).
    blurb: {
      de: 'Dieselben ausgewählten Fragen – mit spielerischeren Twists.',
      en: 'The same selected questions — with more playful twists.',
    },
    twists: { predict: true, both: true, nothinking: true, deeper: true, stay: true },
  },
];

// The secret question interrupts between question 27 and question 28.
const CLASSIC_SECRET_AT_INDEX = 27;

/*
 * Time routes for CLASSIC (iteration 7, Phase 2). Curated by hand against
 * the same "kuratierter Auszug, nicht algorithmisch" requirement the
 * review itself sets: each shortened route keeps a taste of all three acts
 * (curious -> closer -> open) rather than just truncating the end, keeps a
 * mix of twist types rather than dropping them all, and keeps local index
 * 11 (the closing, `last: true` question) as Act III's final entry.
 * `standard` also keeps Act III's local indices 2 and 3 (questions 27/28,
 * the pair the secret question sits between) adjacent and in order; `quick`
 * is short enough that it doesn't include that pair at all, and relies on
 * secretAtIndexFor()'s own derivation (see its comment) to place the
 * interrupt correctly regardless. `full` is exactly the pre-Phase-2 game:
 * every question, unchanged order -- `actIndices: [null, null, null]` means
 * "every local index of that act, in order" (see resolvedActs() below).
 *
 * The exact index lists below are the iteration-8 holistic review's
 * verbatim correction (BF8-02): the original Phase-2 curation put Q07 (a
 * premonition about one's own death) and Q10 (what you'd change about your
 * upbringing) third and fourth in Quick's Act I -- too hard an intensity
 * jump for a 12-question route meant as a light on-ramp. These indices are
 * the redactionally-reviewed selection in
 * docs/closer/content/CLOSER_Fragenkatalog_DE_EN.md and are the single
 * source of truth for any future change to this curation -- edit the
 * catalog first, then mirror it here.
 */
const CLASSIC_ROUTES = {
  quick: {
    id: 'quick',
    minutes: 15,
    title: { de: 'KURZ', en: 'QUICK' },
    meta: { de: 'Ein Ausschnitt', en: 'A taste of it' },
    // Q01, Q04, Q09, Q12 · Q13, Q14, Q16, Q17 · Q25, Q26, Q31, Q36
    actIndices: [
      [0, 3, 8, 11],
      [0, 1, 3, 4],
      [0, 1, 6, 11],
    ],
  },
  standard: {
    id: 'standard',
    minutes: 30,
    title: { de: 'STANDARD', en: 'STANDARD' },
    meta: { de: 'Kuratierte Auswahl', en: 'Curated selection' },
    // Q01-Q04, Q08, Q09, Q11, Q12 · Q13-Q18, Q20, Q21 · Q25-Q31, Q36
    actIndices: [
      [0, 1, 2, 3, 7, 8, 10, 11],
      [0, 1, 2, 3, 4, 5, 7, 8],
      [0, 1, 2, 3, 4, 5, 6, 11],
    ],
  },
  full: {
    id: 'full',
    minutes: 45,
    title: { de: 'VOLL', en: 'FULL' },
    meta: { de: 'Alle 36 Fragen', en: 'All 36 questions' },
    actIndices: [null, null, null],
  },
};

/*
 * Per-act look. The interface withdraws as the conversation takes over:
 * Act I carries a count and a progress marker in a bright accent, Act II drops
 * the marker and dims, Act III shows a bare number. Question 36 shows nothing
 * at all (handled in the component).
 */
const CLASSIC_ACT_STYLE = [
  { accent: '#13ADC7', chrome: 1, progress: 'full', glow: 0.28 },
  { accent: '#945DD6', chrome: 0.5, progress: 'count', glow: 0.15 },
  { accent: '#8b93a3', chrome: 0.22, progress: 'number', glow: 0.05 },
];

export {
  CLASSIC_ACTS,
  CLASSIC_MODES,
  CLASSIC_ACT_STYLE,
  CLASSIC_Q37,
  CLASSIC_SECRET_AT_INDEX,
  CLASSIC_ROUTES,
};
