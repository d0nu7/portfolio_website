/*
 * CLOSER -- game data.
 *
 * The 36 questions are RaDi's list, in his wording, with an English rendering
 * alongside. Every user-visible string in this file is a { de, en } pair; the
 * interface strings live in closerCopy.js.
 *
 * Per-question flags mark which twists a question can carry. Whether a twist
 * actually fires is decided by the mode (see MODES): ORIGINAL keeps almost all
 * of them switched off, DATE NIGHT lets them through.
 *
 *   predict  -- the other person guesses the answer first
 *   both     -- answered together, after a 3-2-1
 *   quick    -- short countdown, answer before it is composed
 *   deeper   -- offers "ask one more question" afterwards
 *   stay     -- offers STAY / NEXT afterwards
 */

export const LANGS = ['de', 'en'];

export function pick(value, lang) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[lang] ?? value.en ?? '';
  }
  return value;
}

export const ACTS = [
  {
    id: 'curious',
    numeral: { de: 'AKT I', en: 'ACT I' },
    title: { de: 'NEUGIERIG', en: 'CURIOUS' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    note: {
      de: 'Fangt leicht an. Es gibt noch nichts zu erreichen.',
      en: 'Start light. There is nowhere to get to yet.',
    },
    questions: [
      {
        de: 'Wenn du jeden und jede auf der Welt einladen könntest, mit wem würdest du gerne essen gehen?',
        en: 'If you could invite anyone in the world, who would you want to have dinner with?',
        predict: true,
      },
      {
        de: 'Wärst du gerne berühmt? Wenn ja, wie?',
        en: 'Would you like to be famous? If so, in what way?',
        quick: true,
      },
      {
        de: 'Probst du manchmal vor einem Telefonat, was du sagen wirst? Warum?',
        en: 'Do you ever rehearse what you are going to say before a phone call? Why?',
      },
      {
        de: 'Wie würde dein perfekter Tag aussehen?',
        en: 'What would your perfect day look like?',
        stay: true,
      },
      {
        de: 'Wann hast du zuletzt für dich gesungen? Und für jemand anderen?',
        en: 'When did you last sing to yourself? And to someone else?',
        quick: true,
      },
      {
        de: 'Wenn du bis 90 leben könntest und du entweder den Körper oder den Geist eines Dreißigjährigen die restlichen 60 Jahre behalten könntest – wofür würdest du dich entscheiden?',
        en: 'If you could live to 90 and keep either the body or the mind of a thirty-year-old for the last 60 years — which would you choose?',
        both: true,
      },
      {
        de: 'Hast du eine Vorahnung, wie du sterben wirst?',
        en: 'Do you have a hunch about how you are going to die?',
        predict: true,
      },
      {
        de: 'Nenne drei Dinge, die du und dein Gegenüber scheinbar gemeinsam haben.',
        en: 'Name three things you and the other person seem to have in common.',
        both: true,
      },
      {
        de: 'Wofür bist du in deinem Leben am dankbarsten?',
        en: 'What are you most grateful for in your life?',
        deeper: true,
      },
      {
        de: 'Wenn du etwas daran ändern könntest, wie du aufgezogen wurdest, was wäre das?',
        en: 'If you could change one thing about the way you were raised, what would it be?',
        stay: true,
      },
      {
        de: 'Erzähle deinem Gegenüber innerhalb von vier Minuten deine Lebensgeschichte – so detailreich wie möglich!',
        en: 'Tell the other person your life story in four minutes — in as much detail as you can.',
        stay: true,
      },
      {
        de: 'Wenn du morgen aufwachst und eine Eigenschaft oder Fähigkeit dazugewonnen hast, welche hättest du dann gerne?',
        en: 'If you woke up tomorrow having gained one quality or ability, which would you want?',
        predict: true,
      },
    ],
  },
  {
    id: 'closer',
    numeral: { de: 'AKT II', en: 'ACT II' },
    title: { de: 'NÄHER', en: 'CLOSER' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    note: {
      de: 'Ab hier wird es persönlicher. Genau darum geht es.',
      en: 'It gets more personal from here. That is the point.',
    },
    questions: [
      {
        de: 'Wenn dir eine Kristallkugel die Wahrheit über dich, dein Leben, deine Zukunft oder irgendetwas sonst verraten könnte, was würdest du wissen wollen?',
        en: 'If a crystal ball could tell you the truth about yourself, your life, your future or anything else — what would you want to know?',
        predict: true,
      },
      {
        de: 'Gibt es etwas, von dem du schon lange träumst, es zu tun? Warum hast du es noch nicht getan?',
        en: 'Is there something you have dreamed of doing for a long time? Why have you not done it yet?',
        deeper: true,
      },
      {
        de: 'Was ist deine größte Leistung in deinem Leben?',
        en: 'What is the greatest achievement of your life?',
        stay: true,
      },
      {
        de: 'Was schätzt du an einer Freundschaft am meisten?',
        en: 'What do you value most in a friendship?',
        predict: true,
      },
      {
        de: 'Was ist deine wertvollste Erinnerung?',
        en: 'What is your most treasured memory?',
        stay: true,
        deeper: true,
      },
      {
        de: 'Was ist deine schrecklichste Erinnerung?',
        en: 'What is your most terrible memory?',
      },
      {
        de: 'Wenn du wüsstest, dass du in einem Jahr plötzlich sterben wirst, würdest du irgendetwas daran ändern, wie du jetzt lebst? Warum?',
        en: 'If you knew you would die suddenly in one year, would you change anything about how you are living now? Why?',
        stay: true,
      },
      {
        de: 'Was bedeutet dir Freundschaft?',
        en: 'What does friendship mean to you?',
      },
      {
        de: 'Welche Rolle spielen Liebe und Zuneigung in deinem Leben?',
        en: 'What role do love and affection play in your life?',
        deeper: true,
      },
      {
        de: 'Wechselt euch ab, jeweils fünf positive Eigenschaften eures Gegenübers aufzuzählen.',
        en: 'Take turns naming five positive qualities of the other person.',
        both: true,
      },
      {
        de: 'Wie nahe und warmherzig ist deine Familie? Glaubst du, dass deine Kindheit glücklicher war als die anderer Menschen?',
        en: "How close and warm is your family? Do you think your childhood was happier than most people's?",
        deeper: true,
      },
      {
        de: 'Wie ist die Beziehung zu deiner Mutter?',
        en: 'What is your relationship with your mother like?',
        stay: true,
      },
    ],
  },
  {
    id: 'open',
    numeral: { de: 'AKT III', en: 'ACT III' },
    title: { de: 'OFFEN', en: 'OPEN' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    note: {
      de: 'Überspringt, was ihr überspringen wollt. Niemand fragt warum.',
      en: 'Skip anything you want to skip. No one asks why.',
    },
    questions: [
      {
        de: 'Macht jeweils drei wahre Aussagen, die "wir" beinhalten. Beispielsweise: "Wir sind beide in diesem Raum und fühlen …"',
        en: 'Each make three true statements using "we". For example: "We are both in this room and feeling …"',
        both: true,
      },
      {
        de: 'Vervollständige diesen Satz: Ich wünschte, ich hätte jemanden, mit dem ich … teilen kann.',
        en: 'Complete this sentence: I wish I had someone I could share … with.',
        deeper: true,
      },
      {
        de: 'Wenn du ein enger Freund deines Gegenübers werden solltest, was wäre für sie oder ihn wichtig, über dich zu wissen?',
        en: 'If you were to become a close friend of the other person, what would be important for them to know about you?',
        stay: true,
      },
      {
        de: 'Sag deinem Gegenüber, was du an ihm oder ihr magst. Sei dabei sehr ehrlich und sag etwas, das du wahrscheinlich nicht zu jemandem sagen würdest, den du gerade getroffen hast.',
        en: 'Tell the other person what you like about them. Be very honest — say something you probably would not say to someone you had just met.',
        deeper: true,
      },
      {
        de: 'Teile einen peinlichen Moment deines Lebens.',
        en: 'Share an embarrassing moment from your life.',
        quick: true,
      },
      {
        de: 'Wann hast du zuletzt vor einer anderen Person geweint? Und wann alleine?',
        en: 'When did you last cry in front of another person? And when alone?',
        stay: true,
      },
      {
        de: 'Was magst du jetzt schon an deinem Gegenüber?',
        en: 'What do you already like about the other person?',
        quick: true,
      },
      {
        de: 'Was ist zu ernst, sodass man darüber keine Witze machen sollte?',
        en: 'What is too serious to joke about?',
        predict: true,
      },
      {
        de: 'Wenn du heute Abend sterben würdest und keine Gelegenheit mehr hättest, mit jemandem zu reden, was würdest du am meisten bereuen, nicht gesagt zu haben? Und warum hast du es noch nicht gesagt?',
        en: 'If you were to die this evening with no chance to speak to anyone, what would you most regret not having said? And why have you not said it yet?',
        stay: true,
        deeper: true,
      },
      {
        de: 'Dein Haus und darin alles, was du besitzt, brennt. Menschen und Tiere sind in Sicherheit, und du hast die Möglichkeit, noch ein Ding zu retten. Was wäre das und wieso?',
        en: 'Your house, and everything you own in it, is burning. People and pets are safe, and you can save one more object. What would it be and why?',
        quick: true,
      },
      {
        de: 'Von all den Menschen in deiner Familie, wessen Tod würde dich am meisten treffen? Warum?',
        en: 'Of everyone in your family, whose death would affect you most? Why?',
        stay: true,
      },
      {
        de: 'Teile ein persönliches Problem und frage dein Gegenüber, wie er oder sie damit umgehen würde. Und bitte dein Gegenüber ebenso, darüber zu reflektieren, wie du wohl zu dem Problem stehst, das du gewählt hast.',
        en: 'Share a personal problem and ask the other person how they would handle it. Then ask them to reflect back how you seem to feel about the problem you chose.',
        last: true,
      },
    ],
  },
];

// Question 37 is not part of the 36. It hands the conversation over.
export const QUESTION_37 = {
  withSecret: {
    de: 'Stell die Frage, die du seit Akt II im Kopf hast.',
    en: 'Ask the question you have been holding since Act II.',
  },
  withoutSecret: [
    {
      de: 'Stell die Frage, von der du gehofft hast, dass sie heute Abend kommt.',
      en: 'Ask the question you hoped would come up tonight.',
    },
    {
      de: 'Worauf bist du gerade neugierig, hast dich aber nicht getraut zu fragen?',
      en: 'What are you curious about right now but were too afraid to ask?',
    },
  ],
};

export const MODES = [
  {
    id: 'original',
    title: { de: 'ORIGINAL', en: 'ORIGINAL' },
    meta: { de: '36 Fragen · 45 Minuten', en: '36 questions · 45 minutes' },
    blurb: {
      de: 'Drei Akte, eine Frage nach der anderen. Das Spiel hält sich raus.',
      en: 'Three acts, one question at a time. The game stays out of the way.',
    },
    twists: { predict: false, both: false, quick: false, deeper: true, stay: true },
  },
  {
    id: 'datenight',
    title: { de: 'DATE NIGHT', en: 'DATE NIGHT' },
    meta: { de: '36 Fragen · mehr Unterbrechungen', en: '36 questions · more interruptions' },
    blurb: {
      de: 'Dieselben Fragen, aber das Spiel spielt mit: raten, Countdowns, gleichzeitig antworten.',
      en: 'Same questions, but the game plays along: guesses, countdowns, answering at the same time.',
    },
    twists: { predict: true, both: true, quick: true, deeper: true, stay: true },
  },
];

// The secret question is sprung unannounced, partway through Act II.
export const SECRET_AT_INDEX = 18;

export const TOTAL_QUESTIONS = ACTS.reduce((n, a) => n + a.questions.length, 0);

export const SKIP_TOKENS = 3;

// Per-act look. The interface withdraws as the conversation takes over.
export const ACT_STYLE = [
  { accent: '#13ADC7', chrome: 1, showCount: true, showBar: true, glow: 0.28 },
  { accent: '#945DD6', chrome: 0.55, showCount: false, showBar: true, glow: 0.16 },
  { accent: '#7d8798', chrome: 0.22, showCount: false, showBar: false, glow: 0.06 },
];

export function actIndexFor(questionIndex) {
  let n = 0;
  for (let i = 0; i < ACTS.length; i += 1) {
    n += ACTS[i].questions.length;
    if (questionIndex < n) return i;
  }
  return ACTS.length - 1;
}

export function questionAt(questionIndex) {
  let n = questionIndex;
  for (let i = 0; i < ACTS.length; i += 1) {
    if (n < ACTS[i].questions.length) return ACTS[i].questions[n];
    n -= ACTS[i].questions.length;
  }
  return null;
}
