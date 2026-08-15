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
  // No longer a single fixed estimate (iteration 7, Phase 2/FR-01): the
  // actual length now depends on the route chosen on the very next screens,
  // so this honestly gives the range rather than promising the old default.
  aboutMinutes: {
    de: '12–45 Minuten – ihr wählt die Länge.',
    en: '12–45 minutes — you choose the length.',
  },
  start: { de: 'Start', en: 'Start' },
  installHintTitle: { de: 'VOLLBILD-ERLEBNIS', en: 'FULL-SCREEN EXPERIENCE' },
  installHintBody: {
    de: 'Füge CLOSER zu deinem Home-Bildschirm hinzu,\num ohne Browserleiste zu spielen.',
    en: 'Add CLOSER to your Home Screen\nto play without the browser bar.',
  },
  installHintIOS: { de: 'Teilen → Zum Home-Bildschirm', en: 'Share → Add to Home Screen' },
  // Shown on Android/Chromium browsers that haven't (yet, or ever) fired
  // beforeinstallprompt -- e.g. Firefox, Samsung Internet, or Chrome before
  // its own install-eligibility heuristics are satisfied.
  installHintAndroid: {
    de: 'Browsermenü öffnen → App installieren / Zum Startbildschirm hinzufügen',
    en: 'Open browser menu → Install app / Add to Home screen',
  },
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
  // Symmetric, genderneutral labels (bugfix-report iteration 7, BF-11 /
  // feature-request FR-08): "Dein Name"/"Ihr Name" was asymmetric, and "Ihr"
  // reads ambiguously as a female possessive or a formal address. Person
  // 1/2 match the existing playerOne/playerTwo fallback names below.
  yourName: { de: 'Person 1 – Name (optional)', en: 'Player 1 – name (optional)' },
  theirName: { de: 'Person 2 – Name (optional)', en: 'Player 2 – name (optional)' },
  continue: { de: 'Weiter', en: 'Continue' },
  namesOptional: {
    de: 'Namen könnt ihr auch leer lassen.',
    en: 'You can leave the names empty.',
  },
  playerOne: { de: 'Person 1', en: 'Player 1' },
  playerTwo: { de: 'Person 2', en: 'Player 2' },

  /* pack (iteration 8 catalog rollout, FR8-03) ---------------------------- */
  pickPack: { de: 'Welches Pack?', en: 'Which pack?' },

  /* duration / route (iteration 7, Phase 2, FR-01/FR-02) ------------------ */
  pickDuration: { de: 'Wie viel Zeit habt ihr?', en: 'How much time do you have?' },

  /* mode ----------------------------------------------------------------- */
  pickMode: { de: 'Modus wählen', en: 'Pick a mode' },
  // Renamed from "Timer" (feature-request FR-04): this only ever shows
  // elapsed time, never counts down or alarms, so "Timer" overpromised.
  timer: { de: 'Zeit anzeigen', en: 'Show time' },
  on: { de: 'An', en: 'On' },
  off: { de: 'Aus', en: 'Off' },

  /* intro ---------------------------------------------------------------- */
  // Brief positioning, not a wall of warnings -- added per the iteration-6
  // content review's P2 finding that CLASSIC should say plainly what kind
  // of experience it is before the game starts, not imply it suits any two
  // people in any situation.
  classicPositioning: {
    de: 'CLASSIC ist ein bewusst persönliches Gespräch für zwei Erwachsene. Spielt nur, wenn ihr beide Tiefe wollt. Es ist kein Test und keine Therapie.',
    en: "CLASSIC is a deliberately personal conversation for two adults. Only play if you both want depth. It's not a test and not therapy.",
  },
  introLines: {
    de: 'Legt das Handy zwischen euch.\n\nAntwortet laut.\n\nTippt nichts ein.\n\nEs gibt keine richtigen Antworten.',
    en: "Put the phone between you.\n\nAnswer out loud.\n\nDon't type anything.\n\nThere are no right answers.",
  },
  // "Jede und jeder" -> "Alle" (BF-11/FR-08): same meaning, one word,
  // genderneutral without sounding like a deliberate correction.
  introSkips: {
    de: 'Ihr teilt euch 3 Skip Tokens.\n\nAlle dürfen eine Frage überspringen.\nOhne Begründung.',
    en: 'You share 3 Skip Tokens.\n\nAnyone can skip a question.\nNo explanation needed.',
  },
  // Rewritten to actually match what's stored (bugfix-report iteration 7,
  // BF-01): the previous "the game only remembers where you are" undersold
  // it -- localStorage also holds both optional names, language, pack/
  // style, skip/secret-question state and timer status. What's still true,
  // and stays true: answers are never typed in, recorded, or stored.
  privacy: {
    de: 'Eure Antworten werden weder eingegeben noch aufgenommen.\nAuf diesem Gerät speichert CLOSER eure optionalen Namen, Einstellungen und den Spielfortschritt, damit ihr fortsetzen könnt.\nMit „Von vorne“ oder „Lokale Spieldaten löschen“ werden diese Daten entfernt.',
    en: "Your answers are never typed in or recorded.\nOn this device, CLOSER stores your optional names, settings and game progress so you can continue later.\n“Start over” or “Delete local data” removes this data.",
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
  // Deliberately separate from the 3-token Skip above (iteration-6 content
  // review, P1): the tokens can stay a playful, limited resource, but
  // opting out of any single question -- including the last one -- must
  // never run out. No confirmation sheet, no token cost, works everywhere
  // Skip does and everywhere it doesn't (see the 'ask' render branch).
  declineToAnswer: { de: 'Lieber nicht', en: "I'd rather not" },
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

  // Reworded per the iteration-6 content review's P2 finding: STAY shows up
  // on the most emotionally loaded questions, and "Bleiben"/"Stay" read too
  // easily as an instruction to keep talking about the hard thing rather
  // than what it actually is -- the app quietly getting out of the way.
  stayTitle: {
    de: 'BLEIBEN gibt euch einfach Raum.\n\nIhr müsst nicht weiterreden und könnt jederzeit fortfahren.',
    en: "STAY just gives you space.\n\nYou don't have to keep talking, and you can continue whenever you're ready.",
  },

  // Announced once, politely, when a BOTH/NO THINKING countdown starts and
  // once when it hits zero -- never per tick (see CloserGame's `announce`
  // state and Counter, which is deliberately not itself a live region).
  countdownStart: (lang, n) =>
    lang === 'de' ? `Zähler gestartet, ${n} Sekunden.` : `Countdown started, ${n} seconds.`,
  countdownGo: { de: 'Los.', en: 'Go.' },

  /* timer ------------------------------------------------------------------ */
  // Bugfix-report iteration 7, BF-05: the previous wording ("the next act
  // is ready whenever you are") stated something false whenever the couple
  // hadn't actually reached the act boundary yet -- the state machine still
  // requires the remaining questions in this act regardless of elapsed
  // time. This is the short-term fix (an honest, non-committal message);
  // real "finish act now" / "keep going" controls are future work (FR-01/
  // FR-04, once routes exist to jump to a real act boundary).
  timerOver: {
    de: 'Ihr seid über der geplanten Zeit. Spielt in eurem Tempo weiter.',
    en: "You're past the planned time. Keep going at your own pace.",
  },

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
  // Equally-valid second path (bugfix-report iteration 7, BF-08): the
  // screen used to force "Ich hab eine" -- nobody could honestly continue
  // without either having a question ready or pretending to. No judgment,
  // no follow-up prompt -- see the noSecretToday-branch handling in
  // CloserGame.js and Question 37's own dedicated copy below.
  noSecretToday: { de: 'Heute keine', en: 'Not today' },
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
  // A function of the route's own total (iteration 7, Phase 2): a `quick`
  // playthrough only ever asked 12 questions, so a hardcoded "36" would be
  // false for it. Called via tf(), the same pattern as passPhoneTo/iAm
  // below, not t().
  allThirtySix: (lang, total) =>
    lang === 'de' ? `Das waren alle ${total}.` : `That's all ${total}.`,
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
  // "Keiner von euch" -> "Ihr habt sie beide ... nicht" (BF-11/FR-08):
  // same meaning, avoids the masculine-default-reading "keiner".
  q37Neither: {
    de: 'Ihr habt sie beide noch nicht gestellt.\n\nVielleicht ist jetzt der Moment.',
    en: "Neither of you asked it.\n\nMaybe now's the time.",
  },
  // Bugfix-report iteration 7, BF-08: shown instead of the above when
  // hasSecretQuestion is false for both people -- there is no "still
  // waiting" secret question to prompt about, so the neither/one/both
  // copy above would misdescribe what happened. Question 37 itself, if
  // taken, reuses the ordinary shared "both" bonus prompt (nothing
  // secret-question-specific to ask about instead).
  q37NoSecretQuestions: { de: 'KEINE GEHEIMFRAGEN', en: 'NO SECRET QUESTIONS' },
  q37NoSecretQuestionsText: {
    de: 'Ihr hattet heute beide keine Geheimfrage.\n\nTrotzdem noch eine Frage 37?',
    en: "Neither of you had a secret question today.\n\nStill want a Question 37?",
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

  /* in-game menu -------------------------------------------------------- */
  // Bugfix-report iteration 7, BF-04: Act III promised "skip or end the
  // game anytime", but no general end path existed outside Question 37's
  // own end buttons -- closing the PWA is not an equivalent, legible way
  // to stop. This reachable-everywhere menu (every question, countdown,
  // act break, secret-question and Q37 phase; deliberately not shown
  // during STAY, which is meant to stay a single, uncluttered space) is
  // the fix. "Spiel jetzt beenden" reuses the existing ending sequence
  // (not a separate screen) -- its copy (endingOne..Four below) is already
  // blame-free/neutral, and Question 37's own end buttons already routed
  // an early stop through the same phase, so this stays consistent with
  // that precedent rather than inventing a second kind of "the end".
  menuOpen: { de: 'Menü', en: 'Menu' },
  menuTitle: { de: 'Menü', en: 'Menu' },
  menuResume: { de: 'Weiterspielen', en: 'Keep playing' },
  menuEnd: { de: 'Spiel jetzt beenden', en: 'End the game now' },
  menuEndConfirm: { de: 'Spiel jetzt beenden?', en: 'End the game now?' },
  menuEndSub: { de: 'Ohne Begründung.', en: 'No explanation needed.' },
  menuRestart: { de: 'Von vorne beginnen', en: 'Start over' },
  // Distinct from "Von vorne" (which restarts into a fresh game): this
  // wipes CLOSER's local data and returns to the plain start screen,
  // matching BF-01's storage-copy promise literally.
  deleteLocalData: { de: 'Lokale Spieldaten löschen', en: 'Delete local data' },
  deleteLocalDataConfirm: {
    de: 'Lokale Spieldaten löschen?',
    en: 'Delete local data?',
  },
  // "Cache leeren" alone doesn't reliably clear localStorage in most
  // browsers, which is why this used to confuse people who'd tried exactly
  // that and still saw their save (iteration-8 holistic review, BF8-05) --
  // spelled out here, on the confirm step, rather than on the plain start
  // screen, which stays free of the technical distinction.
  deleteLocalDataSub: {
    de: 'Browser-Cache und lokaler Spielstand sind getrennt: „Cache leeren" allein entfernt euren Spielstand meist nicht. Diese Aktion entfernt eure optionalen Namen, Einstellungen und den Spielfortschritt von diesem Gerät. Eure Antworten waren nie gespeichert.',
    en: "Browser cache and local game data are separate: clearing your cache alone usually won't remove your save. This removes your optional names, settings and game progress from this device. Your answers were never stored.",
  },
  menuClose: { de: 'Schließen', en: 'Close' },

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
