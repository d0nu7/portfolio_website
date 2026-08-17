import {
  ROUTE_PRESETS,
  NO_TWISTS,
  ROUTE_NEUTRAL_BLURB,
} from '../shared';

/* LATE NIGHT stays hidden until intentionally enabled in the adult pack library. */

const LATE_NIGHT_ACTS = [
  {
    id: 'atmosphere',
    title: { de: 'ATMOSPHÄRE', en: 'ATMOSPHERE' },
    intro: {
      de: 'Blicke, Worte und Vorfreude – bevor es ausdrücklich sexuell wird.',
      en: 'Looks, words, and anticipation—before things become explicitly sexual.',
    },
    breakText: {
      de: 'Ihr habt gerade ehrlich über Anziehung gesprochen.',
      en: "You've just talked honestly about attraction.",
    },
    breakSub: {
      de: 'Trinkt einen Schluck. Atmet.',
      en: 'Take a sip. Breathe.',
    },
    questions: [
      {
        id: 'late-night-q01',
        de: 'Woran merkst du, dass zwischen zwei Menschen erotische Spannung entsteht – an einem Blick, einer Stimme, einem Satz oder dem Abstand?',
        en: 'What tells you that erotic tension is building between two people—a look, a voice, a sentence, or the distance between them?',
      },
      {
        id: 'late-night-q02',
        de: 'Welche Art von Blick oder Stimme kann dich anmachen, bevor es überhaupt zu einer Berührung kommt?',
        en: 'What kind of gaze or voice can turn you on before any touch even happens?',
      },
      {
        id: 'late-night-q03',
        de: 'Welcher Geruch, welche Bewegung oder welches Kleidungsdetail kann deine Fantasie sofort beschäftigen?',
        en: 'What scent, movement, or detail of someone’s clothing can immediately capture your imagination?',
      },
      {
        id: 'late-night-q04',
        de: 'Wie zeigst du jemandem, dass du die Person begehrst, ohne ihre Reaktion vorwegzunehmen?',
        en: 'How do you show someone that you desire them without presuming how they will respond?',
      },
      {
        id: 'late-night-q05',
        de: 'Welche Art erotisches Kompliment trifft dich wirklich – über deine Ausstrahlung, deinen Körper, deine Stimme oder etwas anderes?',
        en: 'What kind of erotic compliment really lands for you—about your presence, your body, your voice, or something else?',
      },
      {
        id: 'late-night-q06',
        de: 'Magst du erotische Spannung eher langsam aufgebaut, verspielt unterbrochen oder direkt ausgesprochen – und was daran macht dich an?',
        en: 'Do you like erotic tension built slowly, interrupted playfully, or spoken directly—and what about that turns you on?',
      },
      {
        id: 'late-night-q07',
        de: 'Was macht einen ersten Kuss für dich besonders heiß oder erinnerungswürdig?',
        en: 'What makes a first kiss especially hot or memorable for you?',
      },
      {
        id: 'late-night-q08',
        de: 'Welche Mischung aus zärtlichen, direkten oder dreckigen Worten passt zu dir?',
        en: 'What mix of tender, direct, or dirty words works for you?',
      },
      {
        id: 'late-night-q09',
        de: 'Was können Kleidung, Unterwäsche oder langsames Ausziehen für deine Lust tun?',
        en: 'What can clothing, underwear, or slowly undressing add to your desire?',
      },
      {
        id: 'late-night-q10',
        de: 'Welche nichtsexuelle Berührung kann dich unerwartet erregen?',
        en: 'What non-sexual touch can arouse you unexpectedly?',
      },
      {
        id: 'late-night-q11',
        de: 'Wodurch fühlst du dich begehrt – durch Aufmerksamkeit, Worte, einen Blick, Initiative oder etwas anderes?',
        en: 'What makes you feel desired—attention, words, a look, initiative, or something else?',
      },
      {
        id: 'late-night-q12',
        de: 'Woran merkt man dir an, dass deine Erregung wächst – falls du es zeigen möchtest?',
        en: 'How might someone notice that your arousal is building—if you want to show it?',
      },
    ],
  },
  {
    id: 'desire',
    title: { de: 'WUNSCH', en: 'DESIRE' },
    intro: {
      de: 'Körper, Sex und Fantasien – direkt, neugierig und ohne daraus einen Plan zu machen.',
      en: 'Bodies, sex, and fantasies—direct, curious, and without turning them into a plan.',
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
        id: 'late-night-q13',
        de: 'An welchen Stellen deines Körpers wirst du besonders gern geküsst oder berührt – und wie?',
        en: 'Where on your body do you especially enjoy being kissed or touched—and how?',
      },
      {
        id: 'late-night-q14',
        de: 'Wie küsst du am liebsten – weich oder fordernd, langsam oder hungrig, mit Lippen, Zunge oder kleinen Bissen?',
        en: 'How do you most enjoy kissing—soft or demanding, slow or hungry, with lips, tongue, or gentle bites?',
      },
      {
        id: 'late-night-q15',
        de: 'Welche Art von Stimulation macht dich am neugierigsten – Hände, Mund, Toys, Penetration, Alternativen dazu oder eine Mischung?',
        en: 'What kind of stimulation makes you most curious—hands, mouth, toys, penetration, alternatives to it, or a mix?',
      },
      {
        id: 'late-night-q16',
        de: 'Welche Fantasie kannst du teilen, die heiß sein darf, auch wenn sie reine Fantasie bleibt?',
        en: 'What fantasy can you share that is allowed to be hot even if it remains purely a fantasy?',
      },
      {
        id: 'late-night-q17',
        de: 'Was macht Oralverkehr für dich besonders lustvoll – beim Geben oder Empfangen, durch Tempo, Druck, Rhythmus, Worte oder Blickkontakt?',
        en: 'What makes oral sex especially pleasurable for you—giving or receiving, pace, pressure, rhythm, words, or eye contact?',
      },
      {
        id: 'late-night-q18',
        de: 'Was kann Penetration oder Sex ohne Penetration für dich richtig gut machen – Position, Winkel, Tiefe, Rhythmus, Bewegung oder etwas anderes?',
        en: 'What can make penetration or sex without penetration really good for you—position, angle, depth, rhythm, movement, or something else?',
      },
      {
        id: 'late-night-q19',
        de: 'Welche Rolle spielt Solo-Sex für dich – und wie wäre es, dabei beobachtet, angeleitet oder begleitet zu werden?',
        en: 'What role does solo sex play for you—and how would it feel to be watched, guided, or accompanied?',
      },
      {
        id: 'late-night-q20',
        de: 'Welcher Kink oder welche erotische Idee macht dich neugierig, selbst wenn du noch nicht weißt, ob du sie je ausprobieren möchtest?',
        en: 'What kink or erotic idea makes you curious even if you do not yet know whether you would ever want to try it?',
      },
      {
        id: 'late-night-q21',
        de: 'Welche Art von Dirty Talk oder konkreter Anweisung würdest du beim Sex gern sagen oder hören?',
        en: 'What kind of dirty talk or specific instruction would you enjoy saying or hearing during sex?',
      },
      {
        id: 'late-night-q22',
        de: 'Welche Mischung aus Tempo, Druck, Rhythmus, Wiederholung, Pausen oder Edging bringt dich besonders in Fahrt?',
        en: 'What mix of pace, pressure, rhythm, repetition, pauses, or edging gets you especially worked up?',
      },
      {
        id: 'late-night-q23',
        de: 'Was erregt dich mehr: Lust zu geben, Lust zu empfangen, zuzusehen, geführt zu werden oder selbst zu führen?',
        en: 'What arouses you more: giving pleasure, receiving it, watching, being guided, or taking the lead?',
      },
      {
        id: 'late-night-q24',
        de: 'Was hilft dir, dich einem Orgasmus hinzugeben – und was macht Sex auch ohne Orgasmus erfüllend?',
        en: 'What helps you surrender to an orgasm—and what makes sex fulfilling even without one?',
      },
    ],
  },
  {
    id: 'trust',
    title: { de: 'VERTRAUEN', en: 'TRUST' },
    intro: {
      de: 'Was dich wirklich reizt, was nachwirkt und was du aussprechen möchtest.',
      en: 'What truly excites you, what lingers, and what you want to say aloud.',
    },
    questions: [
      {
        id: 'late-night-q25',
        de: 'Was reizt dich mehr: Vorfreude, Initiative ergreifen, Kontrolle abgeben, beobachtet werden, führen – oder etwas anderes?',
        en: 'What excites you more: anticipation, taking initiative, giving up control, being watched, leading—or something else?',
      },
      {
        id: 'late-night-q26',
        de: 'Welchen Satz würdest du in einem sehr aufgeladenen Moment besonders gern hören oder sagen?',
        en: 'What sentence would you especially like to hear or say in a highly charged moment?',
      },
      {
        id: 'late-night-q27',
        de: 'Welche Lust oder Fantasie fällt dir leichter zu denken als laut auszusprechen?',
        en: 'What desire or fantasy is easier for you to think about than to say aloud?',
      },
      {
        id: 'late-night-q28',
        de: 'Was macht einen sexuellen Moment für dich unvergesslich – Orgasmus, Nähe, Überraschung, Intensität, Lachen oder etwas anderes?',
        en: 'What makes a sexual moment unforgettable for you—orgasm, closeness, surprise, intensity, laughter, or something else?',
      },
      {
        id: 'late-night-q29',
        de: 'Wie möchtest du, dass ein Nein, eine Pause oder ein Sinneswandel aufgenommen wird, ohne die Stimmung gegen dich zu wenden?',
        en: 'How would you like a no, a pause, or a change of mind to be received without the mood being turned against you?',
      },
      {
        id: 'late-night-q30',
        de: 'Welche Absprachen zu Schutz, Tests oder Verhütung brauchst du, bevor Sex für dich entspannt werden kann?',
        en: 'What agreements about protection, testing, or contraception do you need before sex can feel relaxed for you?',
      },
      {
        id: 'late-night-q31',
        de: 'Gibt es körperliche Empfindlichkeiten, Bedürfnisse oder Zugänglichkeitsaspekte, die guten Sex für dich leichter machen?',
        en: 'Are there physical sensitivities, needs, or accessibility considerations that make good sex easier for you?',
      },
      {
        id: 'late-night-q32',
        de: 'Welche Form von Nähe, Berührung, Worten oder Abstand möchtest du nach intensivem Sex?',
        en: 'What kind of closeness, touch, words, or space do you want after intense sex?',
      },
      {
        id: 'late-night-q33',
        de: 'Welche Privatsphäre oder Absprachen zu weiteren sexuellen Kontakten sind dir wichtig?',
        en: 'What privacy or agreements about other sexual connections matter to you?',
      },
      {
        id: 'late-night-q34',
        de: 'Was würdest du am nächsten Tag nach einer besonders heißen Nacht gern spüren oder hören?',
        en: 'What would you like to feel or hear the day after an especially hot night?',
      },
      {
        id: 'late-night-q35',
        de: 'Welche Antwort aus diesem Gespräch hat dich überrascht, neugierig gemacht oder vielleicht angemacht?',
        en: 'Which answer in this conversation surprised you, made you curious, or perhaps turned you on?',
      },
      {
        id: 'late-night-q36',
        de: 'Welches erotische Detail aus diesem Gespräch darf in deiner Fantasie bleiben, auch wenn daraus heute nichts entstehen muss?',
        en: 'What erotic detail from this conversation may stay in your imagination even if nothing has to come from it today?',
        last: true,
      },
    ],
  },
];

const LATE_NIGHT_Q37 = {
  neither: {
    de: 'Zwei vorgemerkte Fragen warten noch. Ihr könnt hier enden. Nur wenn ihr beide frei weitermachen möchtet, stellt ihr sie nacheinander; vor der zweiten Frage entscheidet ihr erneut. Jede Frage und jede Antwort darf ausgelassen werden. Eine Antwort ist Information, niemals Zustimmung zu einer Handlung.',
    en: 'Two saved questions are still waiting. You can end here. Only if you both freely want to continue, ask them one at a time and choose again before the second question. Either question or answer may be passed. An answer is information, never consent to an action.',
  },
  one: (lang, who, other) =>
    lang === 'de'
      ? `Eine vorgemerkte Frage wartet noch, aber niemand schuldet sie oder eine Antwort darauf. Ihr könnt hier enden. Nur wenn ihr beide frei weitermachen möchtet, darf ${who} sie ${other} stellen. ${other} kann ohne Begründung passen. Eine Antwort ist Information, niemals Zustimmung zu einer Handlung.`
      : `One saved question is still waiting, but no one owes the question or an answer to it. You can end here. Only if you both freely want to continue may ${who} ask ${other}. ${other} may pass without giving a reason. An answer is information, never consent to an action.`,
  both: {
    de: 'Ihr könnt hier enden. Wenn ihr beide noch eine freiwillige letzte Gesprächsfrage möchtet: Was würde zukünftige Gespräche über Sex für dich noch ehrlicher und sicherer machen? Auch diese Frage darf übersprungen werden; aus keiner Antwort entsteht eine Handlungserwartung.',
    en: 'You can end here. If you both want one optional final conversation prompt: What would make future conversations about sex feel even more honest and safe for you? You may skip this question too; no answer creates an expectation of action.',
  },
};

const LATE_NIGHT_MODES = [
  {
    id: 'explicit',
    title: { de: 'EXPLICIT', en: 'EXPLICIT' },
    meta: { de: 'Direkt und respektvoll', en: 'Direct and respectful' },
    blurb: ROUTE_NEUTRAL_BLURB,
    // Conversation-pressure twists remain disabled for consent-sensitive content.
    twists: NO_TWISTS,
  },
];

const LATE_NIGHT_SECRET_AT_INDEX = 27;

// Curated 4/4/4 (Quick) and 8/8/8 (Standard) routes preserve the pack's
// deliberate escalation instead of sampling explicit questions randomly.
const LATE_NIGHT_ROUTES = {
  quick: {
    ...ROUTE_PRESETS.quick,
    minutes: 18,
    meta: { de: 'Eine sichere Steigerung', en: 'A safe escalation' },
    actIndices: [
      [0, 1, 2, 3],
      [0, 1, 2, 3],
      [0, 1, 2, 3],
    ],
  },
  standard: {
    ...ROUTE_PRESETS.standard,
    minutes: 32,
    actIndices: [
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 6, 7, 9],
    ],
  },
  full: {
    ...ROUTE_PRESETS.full,
    minutes: 50,
  },
};

// Accents meet WCAG AA contrast against the CLOSER background.
const LATE_NIGHT_ACT_STYLE = [
  { accent: '#E54B76', chrome: 1, progress: 'full', glow: 0.26 },
  { accent: '#B663B6', chrome: 0.5, progress: 'count', glow: 0.14 },
  { accent: '#9475AD', chrome: 0.22, progress: 'number', glow: 0.05 },
];

export const LATE_NIGHT_PACK = {
  id: 'late-night',
  discoverability: 'menu-unlock',
  contentGroup: 'adult',
  discoveryNoticeKey: 'lateNightMenuIntro',
  privateMoment: 'none',
  title: { de: 'LATE NIGHT', en: 'LATE NIGHT' },
  meta: { de: '18+ · Für zwei Erwachsene', en: '18+ · For two adults' },
  blurb: {
    de: 'Ausdrücklich sexuelle Gespräche. Keine Handlung wird verlangt.',
    en: 'Explicitly sexual conversation. No action is ever required.',
  },
  acts: LATE_NIGHT_ACTS,
  modes: LATE_NIGHT_MODES,
  actStyle: LATE_NIGHT_ACT_STYLE,
  q37: LATE_NIGHT_Q37,
  secretAtIndex: LATE_NIGHT_SECRET_AT_INDEX,
  routes: LATE_NIGHT_ROUTES,
  defaultRouteId: 'standard',
  directFinale: {
    de: 'Damit endet LATE NIGHT. Was ihr gesagt habt, ist Information – keine Zustimmung zu einer Handlung. Alles Weitere braucht außerhalb des Spiels eine konkrete, freiwillige und jederzeit widerrufbare Zustimmung.',
    en: 'This is the end of LATE NIGHT. What you said is information—not consent to an action. Anything further requires specific, voluntary, and withdrawable consent outside the game.',
  },
  positioning: {
    de: 'Ein ausdrücklich sexuelles Gespräch für zwei Erwachsene ab 18 Jahren. Klärt vor dem Start direkt miteinander, ob das Thema für euch beide gerade passt. Jede Frage kann kostenlos ausgelassen und das Spiel jederzeit beendet werden. Antworten beschreiben Gedanken oder Vorlieben; sie sind keine Zustimmung zu einer Handlung.',
    en: 'An explicitly sexual conversation for two adults aged 18 or over. Before starting, check directly with each other that the topic feels right for both of you now. Any question can be passed for free and the game can be ended at any time. Answers describe thoughts or preferences; they are not consent to an action.',
  },
};
