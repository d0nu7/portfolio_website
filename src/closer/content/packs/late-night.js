import {
  ROUTE_PRESETS,
  NO_TWISTS,
  ROUTE_NEUTRAL_BLURB,
} from '../shared';

/* ======================================================================
 * LATE NIGHT (18+) -- content transcribed verbatim from
 * docs/closer/content/CLOSER_Fragenkatalog_DE_EN.md section 10, for a
 * future session to wire up. Every other iteration-8 pack above is
 * registered in PACKS below; this one deliberately ISN'T, and
 * LATE_NIGHT_PACK is not exported. Two things the catalog itself
 * requires are still missing:
 *
 *   1. A technical consent-gate UI this pack specifically needs and no
 *      other pack does: a pre-pack 18+ + voluntary-participation notice
 *      each person confirms SEPARATELY before any question is visible,
 *      and a SECOND, renewed opt-in before Act II specifically (before
 *      touch/fantasy/kink questions appear) -- see the catalog's
 *      "Verbindlicher Hinweis vor dem Pack" and "Erneuter Opt-in vor Akt
 *      II" sections. CloserGame.js has no generic per-pack gating
 *      mechanism today; every other pack only needs the ordinary style/
 *      route selection already built.
 *   2. The catalog's own explicit sign-off is conditional, not granted:
 *      "Vor öffentlicher Freigabe bleibt eine gesonderte österreichische
 *      Jugend-, Medien- und Datenschutzprüfung erforderlich; dieser
 *      Fragenkatalog ist keine rechtliche Freigabe." (A separate Austrian
 *      youth-protection/media/data-protection review is still required
 *      before public release; this catalog is not itself a legal
 *      clearance.) That review is RaDi's to commission, not something
 *      this session can satisfy.
 *
 * The holistic review's own recommended rollout order put LATE NIGHT
 * explicitly last, "nur mit 18+-/Consent-Abnahme aktivieren" (activate
 * only with the 18+/consent gate) -- keeping this pack's data present
 * but unregistered follows that instruction directly: nothing here is
 * reachable in the running app (getPack()'s fallback to `classic` means
 * an unregistered packId is simply treated as an unrecognised one, same
 * as a typo) until both gaps above are actually closed and the pack is
 * deliberately added to PACKS.
 *
 * Also disables `both` for anything touching boundaries/consent/safer
 * sex/fantasies/physical needs, per the catalog's own "Redaktionelle
 * Spielregeln" -- moot today since no question carries any twist yet
 * (same stance as every other iteration-8 pack), but noted here for
 * whoever builds the gate and revisits twists for this pack.
 * ====================================================================== */

const LATE_NIGHT_CONSENT_NOTICE = {
  de: 'Nur für Erwachsene ab 18 Jahren. Beide Personen nehmen freiwillig teil und können jede Frage überspringen oder das Spiel jederzeit beenden. Eine Antwort beschreibt nur Gedanken, Gefühle oder Vorlieben. Sie ist niemals Zustimmung zu einer Handlung. Zustimmung muss außerhalb des Spiels konkret, freiwillig, informiert und jederzeit widerrufbar eingeholt werden.',
  en: 'For adults aged 18 and over only. Both people are taking part voluntarily and may skip any question or end the game at any time. An answer only describes thoughts, feelings or preferences. It is never consent to an action. Consent must be sought outside the game and must be specific, voluntary, informed and withdrawable at any time.',
};

const LATE_NIGHT_ACT_II_OPT_IN = {
  de: 'Ich möchte freiwillig mit expliziteren Gesprächsfragen fortfahren. Ich kann jede Frage überspringen oder hier beenden.',
  en: 'I freely choose to continue with more explicit conversation prompts. I may skip any question or end here.',
};

const LATE_NIGHT_ACTS = [
  {
    id: 'atmosphere',
    title: { de: 'ATMOSPHÄRE', en: 'ATMOSPHERE' },
    intro: {
      de: 'Worte, Stimmung und Aufmerksamkeit -- noch nichts Explizites.',
      en: "Words, mood and attention -- nothing explicit yet.",
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
        de: 'Woran merkst du, dass ein Gespräch für dich flirtend oder erotisch wird?',
        en: 'What tells you that a conversation is becoming flirtatious or erotic for you?',
      },
      {
        id: 'late-night-q02',
        de: 'Welche Art von Blick, Stimme, Worten oder Bewegung kann auf dich besonders anziehend wirken?',
        en: 'What kind of gaze, voice, words or movement can feel especially attractive to you?',
      },
      {
        id: 'late-night-q03',
        de: 'Welche Umgebung hilft dir, dich offen für erotische Stimmung zu fühlen?',
        en: 'What kind of setting helps you feel open to an erotic mood?',
      },
      {
        id: 'late-night-q04',
        de: 'Wie zeigst du Interesse an mehr Nähe, ohne vorauszusetzen, dass die andere Person dasselbe möchte?',
        en: 'How do you show interest in more intimacy without assuming the other person wants the same thing?',
      },
      {
        id: 'late-night-q05',
        de: 'Welche Art von erotischem Kompliment fühlt sich für dich gut an – und welche eher nicht?',
        en: 'What kind of erotic compliment feels good to you—and what kind tends not to?',
      },
      {
        id: 'late-night-q06',
        de: 'Welches Tempo fühlt sich beim Flirten oder beim Aufbau von Intimität für dich angenehm an?',
        en: 'What pace feels comfortable to you when flirting or building intimacy?',
      },
      {
        id: 'late-night-q07',
        de: 'Was hilft dir, dich sicher genug für ein ausdrücklich sexuelles Gespräch zu fühlen?',
        en: 'What helps you feel safe enough to begin an explicitly sexual conversation?',
      },
      {
        id: 'late-night-q08',
        de: 'Welche Stimmung passt bei erotischen Gesprächen zu dir: verspielt, direkt, zärtlich, ernst – oder etwas anderes?',
        en: 'What tone suits you in erotic conversations: playful, direct, tender, serious—or something else?',
      },
      {
        id: 'late-night-q09',
        de: 'Welche nichtsexuelle Form von Nähe kann bei dir Lust wecken – falls es eine gibt?',
        en: 'What non-sexual form of closeness can awaken desire in you, if any?',
      },
      {
        id: 'late-night-q10',
        de: 'Wie soll jemand prüfen, ob Flirten für dich gerade willkommen ist?',
        en: 'How would you like someone to check whether flirting is welcome for you in that moment?',
      },
      {
        id: 'late-night-q11',
        de: 'Wodurch kannst du dich begehrt fühlen, ohne dich unter Druck gesetzt zu fühlen?',
        en: 'What can make you feel desired without making you feel pressured?',
      },
      {
        id: 'late-night-q12',
        de: 'Was hilft dir, während wachsender Intimität präsent und mit dir selbst verbunden zu bleiben?',
        en: 'What helps you stay present and connected to yourself as intimacy builds?',
      },
    ],
  },
  {
    id: 'desire',
    title: { de: 'WUNSCH', en: 'DESIRE' },
    // Requires the renewed opt-in above (LATE_NIGHT_ACT_II_OPT_IN) before
    // this act's questions appear -- not yet enforced anywhere, since the
    // gate itself doesn't exist yet (see the block comment above).
    intro: {
      de: 'Explizitere Fragen zu Wünschen und Fantasien. Ihr entscheidet erneut, ob ihr weitermacht.',
      en: "More explicit questions about desire and fantasy. You choose again whether to continue.",
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
        de: 'Welche Art erotischer Berührung könnte sich für dich gut anfühlen – wenn überhaupt und nur wenn du sie ausdrücklich möchtest?',
        en: 'What kind of erotic touch might feel good to you—if any, and only when you explicitly want it?',
      },
      {
        id: 'late-night-q14',
        de: 'Wie möchtest du, dass sexuelle Nähe initiiert wird?',
        en: 'How do you like sexual intimacy to be initiated?',
      },
      {
        id: 'late-night-q15',
        de: 'Welche Worte oder Laute könnten sich in einer sexuellen Situation für dich gut anfühlen – und welche eher nicht?',
        en: 'What words or sounds might feel good to you in a sexual situation—and which might not?',
      },
      {
        id: 'late-night-q16',
        de: 'Welche Fantasie kannst du teilen, ohne dass daraus eine Erwartung für heute oder später entstehen soll?',
        en: 'What fantasy could you share without it creating any expectation for today or later?',
      },
      {
        id: 'late-night-q17',
        de: 'Welche Rolle spielen Vorfreude oder spielerisches Hinauszögern für deine Lust?',
        en: 'What role do anticipation or playful delay play in your desire?',
      },
      {
        id: 'late-night-q18',
        de: 'Welche Rolle spielen Spielzeuge, erotische Medien oder andere Hilfsmittel in deiner Sexualität – wenn überhaupt?',
        en: 'What role do toys, erotic media or other aids play in your sexuality, if any?',
      },
      {
        id: 'late-night-q19',
        de: 'Was kann Sex für dich erfüllend machen, auch unabhängig von einem Orgasmus?',
        en: 'What can make sex fulfilling for you, independently of orgasm?',
      },
      {
        id: 'late-night-q20',
        de: 'Gibt es eine erotische Idee oder einen Kink, über den du neugierig sprechen möchtest, ohne heute etwas darüber entscheiden zu müssen?',
        en: 'Is there an erotic idea or kink you are curious to talk about without having to decide anything about it today?',
      },
      {
        id: 'late-night-q21',
        de: 'Wie würdest du dich damit fühlen, in einer sexuellen Situation konkrete Wünsche oder Hinweise zu geben oder zu bekommen?',
        en: 'How might you feel about giving or receiving specific requests or guidance in a sexual situation?',
      },
      {
        id: 'late-night-q22',
        de: 'Wodurch baut sich Lust für dich eher auf: Tempo, Wiederholung, Abwechslung, Pausen – oder etwas anderes?',
        en: 'What tends to build pleasure for you: pace, repetition, variety, pauses—or something else?',
      },
      {
        id: 'late-night-q23',
        de: 'Wie zeigst du gern, dass sich etwas besonders gut anfühlt?',
        en: 'How do you like to show that something feels especially good?',
      },
      {
        id: 'late-night-q24',
        de: 'Was würde es dir leichter machen, darüber zu sprechen, was du in einer sexuellen Situation häufiger, seltener oder anders erleben möchtest – falls das für dich relevant ist?',
        en: 'What would make it easier to talk about something you might want more often, less often or differently in a sexual situation, if that is relevant to you?',
      },
    ],
  },
  {
    id: 'trust',
    title: { de: 'VERTRAUEN', en: 'TRUST' },
    intro: {
      de: 'Zustimmung, Grenzen, Safer Sex und Aftercare -- konkret, nie als Handlungsaufforderung.',
      en: "Consent, boundaries, safer sex and aftercare -- concretely, never as a call to action.",
    },
    questions: [
      {
        id: 'late-night-q25',
        de: 'Woran merkst du in dir selbst ein klares Ja, ein Vielleicht oder ein Nein?',
        en: 'How do you recognise a clear yes, maybe or no within yourself?',
      },
      {
        id: 'late-night-q26',
        de: 'Mit welchen Worten oder Zeichen möchtest du Zustimmung, Pause und Stopp ausdrücken?',
        en: 'What words or signals do you want to use to express consent, pause and stop?',
      },
      {
        id: 'late-night-q27',
        de: 'Wie soll die andere Person nachfragen, wenn dein Signal nicht eindeutig ist?',
        en: 'How would you like the other person to check in when your signal is unclear?',
      },
      {
        id: 'late-night-q28',
        de: 'Was brauchst du nach einem intensiven intimen Moment: Nähe, Abstand, Berührung, Ruhe oder etwas anderes?',
        en: 'What do you need after an intense intimate moment: closeness, space, touch, quiet or something else?',
      },
      {
        id: 'late-night-q29',
        de: 'Was hilft dir, ein Nein oder einen Sinneswandel leicht auszusprechen und gut angenommen zu wissen?',
        en: 'What helps you voice a no or a change of mind easily and trust that it will be received well?',
      },
      {
        id: 'late-night-q30',
        de: 'Welche Grenze, Verhütung oder Schutzmaßnahme darf niemals bloß angenommen werden?',
        en: 'What boundary, contraception or protection measure must never simply be assumed?',
      },
      {
        id: 'late-night-q31',
        de: 'Welche Gespräche über Tests, Barrieren, Verhütung oder andere Schutzmaßnahmen brauchst du, bevor sich sexuelle Nähe sicher genug anfühlt?',
        en: 'What conversations about testing, barriers, contraception or other protection do you need before sexual intimacy feels safe enough?',
      },
      {
        id: 'late-night-q32',
        de: 'Wie möchtest du, dass erneut nach Zustimmung gefragt wird, wenn sich eine sexuelle Aktivität verändert oder intensiviert?',
        en: 'How would you like consent to be checked again when a sexual activity changes or becomes more intense?',
      },
      {
        id: 'late-night-q33',
        de: 'Welche Absprachen zu Exklusivität, weiteren Kontakten oder Privatsphäre sind für dich wichtig – falls das für eure Situation relevant ist?',
        en: 'What agreements about exclusivity, other partners or privacy matter to you, if they are relevant to your situation?',
      },
      {
        id: 'late-night-q34',
        de: 'Gibt es körperliche Bedürfnisse, Empfindlichkeiten oder Zugänglichkeitsaspekte, über die du vor Intimität sprechen möchtest?',
        en: 'Are there any physical needs, sensitivities or accessibility considerations you would want to discuss before intimacy?',
      },
      {
        id: 'late-night-q35',
        de: 'Wie wünschst du dir einen Check-in am nächsten Tag – wenn überhaupt?',
        en: 'How would you like to check in the next day, if at all?',
      },
      {
        id: 'late-night-q36',
        de: 'Welche eine Sache soll dein Gegenüber aus diesem Gespräch mitnehmen, ohne daraus eine Erwartung für heute oder später abzuleiten?',
        en: 'What is one thing you want the other person to take from this conversation without turning it into an expectation for today or later?',
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
    // PREDICT and NO THINKING are fully disabled for this pack per the
    // catalog's own "Redaktionelle Spielregeln"; BOTH is disabled too for
    // anything touching consent/boundaries/safer sex. Moot today since no
    // question carries a twist yet (NO_TWISTS already covers that) --
    // kept as its own note for whoever revisits twists for this pack.
    twists: NO_TWISTS,
  },
];

const LATE_NIGHT_SECRET_AT_INDEX = 27;

// Front-loaded 4/4/4 (Quick) and 8/8/8 (Standard) per act -- the
// catalog's own words: "vier Fragen zu Atmosphäre, vier zu Wünschen und
// vier zu Vertrauen. [...] keine zufällige Auswahl expliziter Fragen."
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
      [0, 1, 2, 3, 4, 5, 6, 7],
    ],
  },
  full: {
    ...ROUTE_PRESETS.full,
    minutes: 50,
  },
};

/*
 * Alle drei Werte hochskaliert wie bei DEEP (Refactoringplan Phase 4,
 * Nacharbeit) -- die Originale lagen bei 3,42:1 bis 1,57:1 auf #08090c,
 * unter WCAG AA. LATE NIGHT ist weiterhin nicht in PACKS registriert
 * (siehe unten); der Fix betrifft nur die hinterlegte Farbe, nicht die
 * Registrierung selbst:
 *   Akt I:   #B03A5B (3,42:1) -> #E54B76 (5,31:1, k=1,30)
 *   Akt II:  #6B3A6B (2,32:1) -> #B663B6 (5,15:1, k=1,70)
 *   Akt III: #3A2E44 (1,57:1) -> #9475AD (5,14:1, k=2,55)
 */
const LATE_NIGHT_ACT_STYLE = [
  { accent: '#E54B76', chrome: 1, progress: 'full', glow: 0.26 },
  { accent: '#B663B6', chrome: 0.5, progress: 'count', glow: 0.14 },
  { accent: '#9475AD', chrome: 0.22, progress: 'number', glow: 0.05 },
];

// Deliberately NOT added to PACKS -- see the block comment above.
// CloserGame.js's consent-gate UI is built and reads pack.consentGate
// generically (so it's ready for this pack or any future one that needs
// it), but this pack itself stays unregistered until the outstanding
// legal review is actually done. Exported (unlike the rest of this
// file's per-pack constants) only so closer.test.js can pin its shape
// without duplicating it into the test file.
export const LATE_NIGHT_PACK = {
  id: 'late-night',
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
  // The generic consent-gate mechanism (CloserGame.js) activates for any
  // pack that sets this -- LATE NIGHT is the only one today. `notice` gates
  // entry to the pack at all (both people confirm separately before
  // `intro`); `act2OptIn` gates entry to Act II specifically (both confirm
  // again, separately, before touch/fantasy/kink questions appear). Either
  // person declining either gate ends the pack neutrally.
  consentGate: {
    notice: LATE_NIGHT_CONSENT_NOTICE,
    act2OptIn: LATE_NIGHT_ACT_II_OPT_IN,
  },
};

/*
 * The PACKS registry. Each entry is everything CloserGame.js needs to run a
 * full playthrough: acts (and their questions), style modes, per-act look,
 * question-37 wording, and where the secret question interrupts. `classic`
 * is CLOSER as it has always been; it is the default and the fallback for
 * any packId this registry doesn't recognise (including saves from before
 * packId existed -- see getPack()).
 *
 * Adding a pack means adding another entry here with its own acts/modes/
 * actStyle/q37/secretAtIndex -- nothing in CloserGame.js hardcodes `classic`
 * or assumes there is only one pack.
 *
 * `title`/`meta`/`blurb` are what the Pack-Auswahl screen (FR8-03) shows on
 * each pack's own card -- the same three-field shape routes and modes
 * already use. `defaultRouteId` is that screen's preselection for a freshly
 * chosen pack (e.g. CLASSIC still opens on Full, FIRST DATE opens on Quick,
 * per the catalog's own per-pack "Default" line) -- distinct from the
 * global DEFAULT_ROUTE_ID constant below, which is getRoute()'s technical
 * fallback for a routeId that's missing or doesn't exist at all, not a
 * per-pack editorial choice.
 */
