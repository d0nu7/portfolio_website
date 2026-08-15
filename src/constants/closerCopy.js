/*
 * Every interface string CLOSER shows, in both languages.
 *
 * Entries are either a { de, en } pair or a function taking the language and
 * returning the string, for the lines that need a name substituted.
 */

const COPY = {
  /* start ---------------------------------------------------------------- */
  tagline: {
    de: 'Zwei Menschen.\nEin Handy.\nKein Small Talk.',
    en: 'Two people.\nOne phone.\nNo small talk.',
  },
  aboutMinutes: { de: 'Etwa 45 Minuten', en: 'About 45 minutes' },
  start: { de: 'Start', en: 'Start' },
  installHintTitle: { de: 'VOLLBILD-ERLEBNIS', en: 'FULL-SCREEN EXPERIENCE' },
  installHintBody: {
    de: 'Füge CLOSER zu deinem Home-Bildschirm hinzu,\num ohne Browserleiste zu spielen.',
    en: 'Add CLOSER to your Home Screen\nto play without the browser bar.',
  },
  installHintIOS: { de: 'Teilen → Zum Home-Bildschirm', en: 'Share → Add to Home Screen' },
  installHintInstall: { de: 'Installieren', en: 'Install' },
  installHintDismiss: { de: 'Nicht jetzt', en: 'Not now' },
  installHintInstalled: {
    de: 'Installiert. Startet jetzt über das neue Symbol auf deinem Home-Bildschirm.',
    en: 'Installed. From now on, launch CLOSER from the new icon on your Home Screen.',
  },
  welcomeBack: { de: 'Willkommen zurück.', en: 'Welcome back.' },
  continueGame: { de: 'Spiel fortsetzen', en: 'Continue game' },
  startOver: { de: 'Von vorne', en: 'Start over' },
  startOverConfirm: { de: 'Von vorne anfangen?', en: 'Start over?' },
  startOverWarn: {
    de: 'Euer aktueller Fortschritt geht verloren.',
    en: 'Your current progress will be lost.',
  },
  goBack: { de: 'Zurück', en: 'Go back' },

  /* players -------------------------------------------------------------- */
  whosPlaying: { de: 'Wer spielt?', en: "Who's playing?" },
  yourName: { de: 'Dein Name', en: 'Your name' },
  theirName: { de: 'Ihr Name', en: 'Their name' },
  continue: { de: 'Weiter', en: 'Continue' },
  namesOptional: {
    de: 'Namen könnt ihr auch leer lassen.',
    en: 'You can leave the names empty.',
  },
  playerOne: { de: 'Person 1', en: 'Player 1' },
  playerTwo: { de: 'Person 2', en: 'Player 2' },

  /* mode ----------------------------------------------------------------- */
  pickMode: { de: 'Modus wählen', en: 'Pick a mode' },
  timer: { de: 'Timer', en: 'Timer' },
  on: { de: 'An', en: 'On' },
  off: { de: 'Aus', en: 'Off' },

  /* intro ---------------------------------------------------------------- */
  introLines: {
    de: 'Legt das Handy zwischen euch.\n\nAntwortet laut.\n\nTippt nichts ein.\n\nEs gibt keine richtigen Antworten.',
    en: "Put the phone between you.\n\nAnswer out loud.\n\nDon't type anything.\n\nThere are no right answers.",
  },
  introSkips: {
    de: 'Ihr teilt euch 3 Skip Tokens.\n\nJede und jeder darf eine Frage überspringen.\nOhne Begründung.',
    en: 'You share 3 Skip Tokens.\n\nAnyone can skip a question.\nNo explanation needed.',
  },
  privacy: {
    de: 'Nichts, was ihr sagt, wird aufgezeichnet.\nNichts, was ihr antwortet, wird gespeichert.\nDas Spiel merkt sich nur, wo ihr gerade seid.',
    en: 'Nothing you say is recorded.\nNothing you answer is stored.\nThis game only remembers where you are in the game.',
  },
  begin: { de: 'Los geht’s', en: 'Begin' },

  /* question screen ------------------------------------------------------- */
  /* The turn indicator is composed from a name and a verb so the name can be
     set at display size -- see TurnBadge. */
  turnFirst: { de: 'beginnt', en: 'goes first' },
  turnAnswers: { de: 'antwortet', en: 'answers' },
  turnBoth: { de: 'Ihr beide', en: 'Both of you' },
  turnBothVerb: { de: 'gleichzeitig', en: 'at the same time' },
  next: { de: 'Weiter', en: 'Next' },
  skip: { de: 'Skip', en: 'Skip' },
  stay: { de: 'Bleiben', en: 'Stay' },
  takeYourTime: { de: 'Lasst euch Zeit.', en: 'Take your time.' },
  done: { de: 'Fertig', en: 'Done' },

  /* skip ------------------------------------------------------------------ */
  skipConfirmTitle: { de: 'Diese Frage überspringen?', en: 'Skip this question?' },
  skipConfirmSub: { de: 'Ohne Begründung.', en: 'No explanation needed.' },
  skipUses: {
    de: 'Das verbraucht einen eurer Skip Tokens.',
    en: 'This uses one of your skip tokens.',
  },
  skipped: { de: 'Übersprungen.', en: 'Skipped.' },
  skipsLeft: (lang, n) =>
    lang === 'de'
      ? n === 1
        ? 'Noch 1 Skip Token übrig.'
        : `Noch ${n} Skip Tokens übrig.`
      : n === 1
      ? '1 skip token left.'
      : `${n} skip tokens left.`,

  /* twists ---------------------------------------------------------------- */
  predictLabel: { de: 'TIPPEN', en: 'PREDICT' },
  predictText: (lang, guesser, answerer) =>
    lang === 'de'
      ? `Bevor ${answerer} antwortet:\n\n${guesser}, rate, was ${answerer} sagen wird.`
      : `Before ${answerer} answers:\n\n${guesser}, guess what they're going to say.`,
  ready: { de: 'Bereit', en: 'Ready' },

  bothLabel: { de: 'BEIDE', en: 'BOTH' },
  bothText: { de: 'Antwortet gleichzeitig.', en: 'Answer at the same time.' },

  nothinkingLabel: { de: 'NICHT NACHDENKEN', en: 'NO THINKING' },
  nothinkingText: {
    de: 'Antwortet mit dem Ersten,\nwas euch in den Sinn kommt.',
    en: 'Answer with the first thing\nthat comes to mind.',
  },

  deeperLabel: { de: 'TIEFER?', en: 'GO DEEPER?' },
  deeperText: {
    de: 'Stellt eine eigene Nachfrage.',
    en: 'Ask one follow-up question\nof your own.',
  },
  deeperAsk: { de: 'Nachfragen', en: 'Ask' },
  deeperOpen: {
    de: 'Vergesst das Spiel für einen Moment.\n\nFragt, was euch wirklich interessiert.',
    en: "Forget the game for a moment.\n\nAsk whatever you're curious about.",
  },

  stayTitle: {
    de: 'Bleibt hier.\n\nVergesst das Spiel für einen Moment.',
    en: 'Stay here.\n\nForget the game for a moment.',
  },

  /* timer ------------------------------------------------------------------ */
  timerOver: { de: 'Lasst euch Zeit', en: 'Take your time' },

  /* acts ------------------------------------------------------------------- */
  complete: { de: 'ABGESCHLOSSEN', en: 'COMPLETE' },

  /* secret question -------------------------------------------------------- */
  passPhoneTo: (lang, who) =>
    lang === 'de' ? `GIB DAS HANDY AN ${who.toUpperCase()}` : `PASS THE PHONE TO ${who.toUpperCase()}`,
  iAm: (lang, who) => (lang === 'de' ? `Ich bin ${who}` : `I'm ${who}`),
  forOnly: (lang, who) =>
    lang === 'de' ? `NUR FÜR ${who.toUpperCase()}` : `FOR ${who.toUpperCase()} ONLY`,
  secretTask: (lang, other) =>
    lang === 'de'
      ? `Denk an eine Frage, von der du insgeheim hoffst, dass ${other} sie dir heute Abend stellt.\n\nSag sie nicht laut.\n\nTipp sie nirgends ein.\n\nMerk sie dir einfach.`
      : `Think of one question you secretly hope ${other} asks you tonight.\n\nDon't say it out loud.\n\nDon't type it anywhere.\n\nJust remember it.`,
  iHaveOne: { de: 'Ich hab eine', en: 'I have one' },
  passPhone: { de: 'GIB DAS HANDY WEITER', en: 'PASS THE PHONE' },
  passPhoneText: (lang, other) =>
    lang === 'de'
      ? `Gib das Handy an ${other}.\n\nVerrate deine Frage nicht.`
      : `Give the phone to ${other}.\n\nDon't tell them your question.`,
  passPhoneBack: { de: 'GIB DAS HANDY ZURÜCK', en: 'PASS THE PHONE BACK' },
  passPhoneBackText: {
    de: 'Legt es wieder zwischen euch.',
    en: 'Put it back between you.',
  },

  /* finale ------------------------------------------------------------------ */
  oneLastQuestion: { de: 'EINE LETZTE FRAGE', en: 'ONE LAST QUESTION' },
  reveal: { de: 'Zeigen', en: 'Reveal' },
  allThirtySix: { de: 'Das waren alle 36.', en: "That's all 36." },
  butYouEachHad: {
    de: 'Aber ihr hattet beide\neine Frage im Kopf.',
    en: 'But you each had\none question in mind.',
  },

  didTheyAsk: (lang, other) =>
    lang === 'de'
      ? `Hat ${other} die Frage gestellt, von der du insgeheim gehofft hast, dass sie kommt?`
      : `Did ${other} ask the question you secretly hoped they would ask?`,
  yes: { de: 'Ja', en: 'Yes' },
  no: { de: 'Nein', en: 'No' },

  q37OneMore: { de: 'NOCH EINE?', en: 'ONE MORE?' },
  q37Neither: {
    de: 'Keiner von euch hat sie gestellt.\n\nVielleicht ist jetzt der Moment.',
    en: "Neither of you asked it.\n\nMaybe now's the time.",
  },
  q37OneRemains: { de: 'EINE FRAGE FEHLT NOCH', en: 'ONE QUESTION REMAINS' },
  // Deliberately name-free: earlier wording named a person here and, for one
  // of the two possible cases, named the wrong one (whoever already asked
  // vs. whoever's question was already asked are two different people).
  // Not worth the risk a second time.
  q37OneText: {
    de: 'Eine deiner Fragen wurde gestellt.\n\nEine Frage wartet noch.',
    en: 'One of your questions was asked.\n\nOne question is still waiting.',
  },
  q37AlreadyAsked: { de: 'IHR HABT SIE SCHON GESTELLT.', en: 'YOU ALREADY ASKED THEM.' },
  q37StillWantOne: { de: 'Trotzdem noch eine?', en: 'Still want one more?' },
  q37Button: { de: 'FRAGE 37', en: 'QUESTION 37' },
  q37Label: { de: 'FRAGE 37', en: 'QUESTION 37' },
  // Neither of you asked the other's secret question -- rather than one
  // shared prompt, each of you gets an explicit, ordered turn.
  q37AskSecret: (lang, who) =>
    lang === 'de' ? `${who} stellt die Geheimfrage.` : `${who} asks the secret question.`,
  end: { de: 'Ende', en: 'End' },

  /* ending ------------------------------------------------------------------ */
  endingOne: { de: 'Das war’s.', en: "That's it." },
  endingTwo: {
    de: 'Kein Score.\nKein Ergebnis.\nKeine Prozentzahl.',
    en: 'No score.\nNo result.\nNo match percentage.',
  },
  endingThree: {
    de: 'Ihr braucht das Spiel nicht mehr.',
    en: "You don't need the game anymore.",
  },
  endingFour: { de: 'Legt das Handy weg.', en: 'Put the phone away.' },
  playAgain: { de: 'Nochmal spielen', en: 'Play again' },
};

export default COPY;
