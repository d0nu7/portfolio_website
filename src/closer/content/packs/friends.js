import {
  ROUTE_PRESETS,
  DEEPER_AND_STAY,
  ROUTE_NEUTRAL_BLURB,
  RESPONSE_CARDS,
} from '../shared';

/* ======================================================================
 * FRIENDS (iteration 8 catalog rollout) -- content transcribed verbatim
 * from docs/closer/content/CLOSER_Fragenkatalog_DE_EN.md section 6.
 *
 * Quick/Standard end on Q34/Q35 -- Q36 (`last: true`) is marked Full-only
 * in the catalog's own per-question Route column, reserving its closing
 * "REFLECT" response card for the complete experience. See the relaxed
 * "ends on last:true" test in closer.test.js.
 *
 * Response Cards (optional listening prompts the catalog recommends after
 * specific questions) and the pack's own dynamic Q37 wording are
 * transcribed below; Response Cards are not yet a CloserGame.js UI
 * feature (see the housekeeping note in this file's own commit) -- kept
 * here as a comment so the content isn't lost before that's built.
 *
 * Response Cards: after Q08/Q33 CELEBRATE; after Q18 FOLLOW UP; after
 * Q21/Q24 VALIDATE; after Q36 REFLECT (see catalog section 6 for exact
 * wording).
 * ====================================================================== */

const FRIENDS_ACTS = [
  {
    id: 'light',
    title: { de: 'LEICHT', en: 'LIGHT' },
    intro: {
      de: 'Ausdrücklich freundschaftlich -- Humor und Wertschätzung, keine romantische Rahmung.',
      en: "Explicitly friendship-toned -- humor and appreciation, no romantic framing.",
    },
    breakText: {
      de: 'Ihr wisst jetzt ein paar Dinge übereinander, die ihr vor diesem Akt noch nicht wusstet.',
      en: "You now know a few things about each other you didn't before this act.",
    },
    breakSub: {
      de: 'Trinkt einen Schluck. Lacht kurz.',
      en: 'Take a sip. Have a laugh.',
    },
    questions: [
      {
        id: 'friends-q01',
        de: 'Welche kleine Sache macht dir im Moment Freude?',
        en: 'What small thing is bringing you joy at the moment?',
      },
      {
        id: 'friends-q02',
        de: 'Welche Rolle nimmst du in Gruppen oft ganz automatisch ein?',
        en: 'What role do you tend to slip into automatically in a group?',
      },
      {
        id: 'friends-q03',
        de: 'Für welches eher ungewöhnliche Thema kannst du dich überraschend stark begeistern?',
        en: 'What slightly unusual topic can you get surprisingly excited about?',
      },
      {
        id: 'friends-q04',
        de: 'Welche konkrete Erinnerung steckt hinter einem Insider zwischen uns, der immer noch lustig ist?',
        en: 'What specific memory is behind an inside joke between us that is still funny?',
      },
      {
        id: 'friends-q05',
        de: 'Woran merkst du am Ende eines freien Tages, dass du ihn gut verbracht hast?',
        en: 'At the end of a day off, what tells you that you spent it well?',
      },
      {
        id: 'friends-q06',
        de: 'Worin bist du besser, als du dir selbst meistens zugestehst?',
        en: 'What are you better at than you usually give yourself credit for?',
      },
      {
        id: 'friends-q07',
        de: 'Welche Eigenschaft ist dir in einer guten Freundschaft besonders wichtig?',
        en: 'What quality matters most to you in a good friendship?',
      },
      {
        id: 'friends-q08',
        de: 'Welche gute Nachricht aus deinem Leben verdient gerade etwas mehr Aufmerksamkeit – und warum?',
        en: 'What good news in your life deserves a little more attention right now, and why?',
        responseCard: RESPONSE_CARDS.celebrateShare,
      },
      {
        id: 'friends-q09',
        de: 'Bei welchem konkreten gemeinsamen Moment musstest du besonders ehrlich lachen?',
        en: 'During what specific moment together did you laugh most genuinely?',
      },
      {
        id: 'friends-q10',
        de: 'Welche konkrete Sache hat die andere Person einmal für dich getan – und welche Stärke von ihr wurde darin sichtbar?',
        en: 'What is one specific thing the other person once did for you, and what strength of theirs did it reveal?',
      },
      {
        id: 'friends-q11',
        de: 'Welche Seite von dir hat sich verändert, seit wir uns kennen?',
        en: 'What side of you has changed since we have known each other?',
      },
      {
        id: 'friends-q12',
        de: 'Über welchen Teil deines Lebens würdest du dir von befreundeten Menschen mehr neugierige Fragen wünschen?',
        en: 'What part of your life would you like your friends to ask more curious questions about?',
      },
    ],
  },
  {
    id: 'showingup',
    title: { de: 'DA SEIN', en: 'SHOWING UP' },
    intro: {
      de: 'Jetzt geht es um Unterstützung -- wie sie wirklich ankommt.',
      en: "Now it's about support -- how it actually lands.",
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
        id: 'friends-q13',
        de: 'Welche Form von Unterstützung hilft dir wirklich?',
        en: 'What kind of support genuinely helps you?',
      },
      {
        id: 'friends-q14',
        de: 'Woran kann eine befreundete Person erkennen, ob du gerade Rat oder einfach Gesellschaft möchtest?',
        en: 'How can a friend tell whether you want advice or simply some company?',
      },
      {
        id: 'friends-q15',
        de: 'Was tut jemand konkret, wenn du dich in einem Gespräch wirklich gehört fühlst?',
        en: 'What does someone actually do that makes you feel truly heard in a conversation?',
      },
      {
        id: 'friends-q16',
        de: 'Was wird an dir häufig missverstanden?',
        en: 'What do people often misunderstand about you?',
      },
      {
        id: 'friends-q17',
        de: 'Welche Emotion kannst du unter befreundeten Menschen leicht zeigen, und welche eher nicht?',
        en: 'Which emotion can you show easily around friends, and which one is harder to show?',
      },
      {
        id: 'friends-q18',
        de: 'Wann hat eine befreundete Person zuletzt genau die richtige Nachfrage gestellt – und was hat sie bewirkt?',
        en: 'When did a friend last ask exactly the right follow-up question, and what difference did it make?',
        responseCard: RESPONSE_CARDS.followUpUnderstand,
      },
      {
        id: 'friends-q19',
        de: 'Wann hattest du zuletzt das Gefühl, dass dir eine befreundete Person wirklich den Rücken stärkt?',
        en: 'When did you last feel that a friend truly had your back?',
      },
      {
        id: 'friends-q20',
        de: 'Wie wünschst du dir, dass befreundete Menschen auf eine gute Nachricht von dir reagieren?',
        en: 'How would you like your friends to respond when you share good news?',
      },
      {
        id: 'friends-q21',
        de: 'Wenn du einen schweren Tag teilst: Was hilft zuerst – Zuhören, Trost, Ablenkung, Ideen, praktische Hilfe oder etwas anderes?',
        en: 'When you share that you have had a hard day, what helps first: listening, comfort, distraction, ideas, practical help, or something else?',
        responseCard: RESPONSE_CARDS.validateNoSolution,
      },
      {
        id: 'friends-q22',
        de: 'Welche Eigenschaft der anderen Person schätzt du, die sie selbst vielleicht unterschätzt?',
        en: 'What quality do you appreciate in the other person that they may underestimate in themselves?',
      },
      {
        id: 'friends-q23',
        de: 'Welche Grenze macht Freundschaften für dich verlässlicher und sicherer?',
        en: 'What boundary makes friendships feel more reliable and safe to you?',
      },
      {
        id: 'friends-q24',
        de: 'Welches aktuelle Thema darf eine befreundete Person einfach mit dir aushalten, ohne es lösen zu müssen?',
        en: 'What are you dealing with right now that a friend can simply sit with you in, without having to solve it?',
        stayEnabled: true,
        responseCard: RESPONSE_CARDS.validateNoSolution,
      },
    ],
  },
  {
    id: 'ahead',
    title: { de: 'WEITER', en: 'AHEAD' },
    intro: {
      de: 'Dieser Akt blickt nach vorn -- auf das, was ihr als Freunde als Nächstes wollt.',
      en: "This act looks ahead -- at what the two of you want next as friends.",
    },
    questions: [
      {
        id: 'friends-q25',
        de: 'Was würdest du dieses Jahr gern gemeinsam machen?',
        en: 'What would you enjoy doing together this year?',
      },
      {
        id: 'friends-q26',
        de: 'Welche neue gemeinsame Erinnerung sollten wir in den nächsten Monaten schaffen?',
        en: 'What new shared memory should we create in the next few months?',
      },
      {
        id: 'friends-q27',
        de: 'Welche Art von Moment zwischen uns fühlt sich für dich besonders nach Freundschaft an?',
        en: 'What kind of moment between us feels most like friendship to you?',
      },
      {
        id: 'friends-q28',
        de: 'Wie hat dich eine Freundschaft in deinem Leben verändert?',
        en: 'How has a friendship changed you?',
      },
      {
        id: 'friends-q29',
        de: 'Was sollte die andere Person über deine heutige Version wissen, das früher noch nicht galt?',
        en: 'What should the other person know about who you are today that was not true before?',
      },
      {
        id: 'friends-q30',
        de: 'Was würdest du gern von der anderen Person lernen – nicht unbedingt als Fähigkeit, sondern als Haltung?',
        en: 'What would you like to learn from the other person, not necessarily as a skill but as a way of approaching life?',
        twist: 'deeper',
      },
      {
        id: 'friends-q31',
        de: 'Was sollten befreundete Menschen einander öfter fragen?',
        en: 'What should friends ask each other more often?',
      },
      {
        id: 'friends-q32',
        de: 'Wie könnte ich in den nächsten Monaten besser für dich da sein, ohne etwas für dich zu entscheiden?',
        en: 'How could I show up for you better over the next few months without deciding anything for you?',
      },
      {
        id: 'friends-q33',
        de: 'Welchen kleinen oder großen Erfolg sollten wir als Nächstes gemeinsam feiern?',
        en: 'What small or big success should we celebrate together next?',
        responseCard: RESPONSE_CARDS.celebrateShare,
      },
      {
        id: 'friends-q34',
        de: 'Wofür wären wir in einem Jahr dankbar, wenn wir es jetzt gemeinsam planen?',
        en: 'What would we be grateful for a year from now if we planned it together today?',
      },
      {
        id: 'friends-q35',
        de: 'Was hilft unserer Freundschaft, auch in vollen oder anstrengenden Zeiten Raum zu behalten?',
        en: 'What helps our friendship keep a place in our lives when things are busy or difficult?',
      },
      {
        id: 'friends-q36',
        de: 'Wofür möchtest du der anderen Person heute danken – und was sagt das über sie aus?',
        en: 'What would you like to thank the other person for today, and what does it say about who they are?',
        last: true,
        responseCard: RESPONSE_CARDS.reflectUnderstood,
      },
    ],
  },
];

const FRIENDS_Q37 = {
  neither: {
    de: 'Zwei vorgemerkte Fragen warten noch. Wenn es sich für euch gut anfühlt, stellt sie jetzt nacheinander. Keine Antwort ist geschuldet.',
    en: 'Two saved questions are waiting. If it feels right, ask them one at a time now. No answer is owed.',
  },
  one: (lang, who, other) =>
    lang === 'de'
      ? `${who}, wenn es sich für dich gut anfühlt: Stell ${other} jetzt deine vorgemerkte Frage. Eine Antwort bleibt freiwillig.`
      : `${who}, if it feels right, ask ${other} the question you saved. Answering is still optional.`,
  both: {
    de: 'Was möchtest du, dass die andere Person aus diesem Gespräch über dich mitnimmt?',
    en: 'What would you like the other person to take away from this conversation about you?',
  },
};

const FRIENDS_MODES = [
  {
    id: 'easy',
    title: { de: 'EASY', en: 'EASY' },
    meta: { de: 'Locker und ehrlich', en: 'Easygoing and honest' },
    blurb: ROUTE_NEUTRAL_BLURB,
    twists: DEEPER_AND_STAY,
  },
];

const FRIENDS_SECRET_AT_INDEX = 27;

// Every third question, repeating (Q/S/F, S/F, F) per act -- verbatim
// from the catalog's per-question Route column in section 6.
const FRIENDS_ROUTES = {
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
    minutes: 35,
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

// Bright and warm -- sunny yellow, warm orange, friendly green.
const FRIENDS_ACT_STYLE = [
  { accent: '#FFC145', chrome: 1, progress: 'full', glow: 0.28 },
  { accent: '#FF8C61', chrome: 0.5, progress: 'count', glow: 0.15 },
  { accent: '#6FCF97', chrome: 0.22, progress: 'number', glow: 0.05 },
];

export {
  FRIENDS_ACTS,
  FRIENDS_MODES,
  FRIENDS_ACT_STYLE,
  FRIENDS_Q37,
  FRIENDS_SECRET_AT_INDEX,
  FRIENDS_ROUTES,
};
