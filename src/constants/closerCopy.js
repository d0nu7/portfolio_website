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
  // The landing page shows the complete range; each route gives its estimate.
  aboutMinutes: {
    de: 'Etwa 10–75 Minuten – ihr wählt Pack und Länge.',
    en: 'About 10–75 minutes — you choose the pack and length.',
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
  // Symmetric, gender-neutral labels match the fallback player names.
  yourName: { de: 'Person 1 – Name (optional)', en: 'Player 1 – name (optional)' },
  theirName: { de: 'Person 2 – Name (optional)', en: 'Player 2 – name (optional)' },
  continue: { de: 'Weiter', en: 'Continue' },
  namesOptional: {
    de: 'Namen könnt ihr auch leer lassen.',
    en: 'You can leave the names empty.',
  },
  playerOne: { de: 'Person 1', en: 'Player 1' },
  playerTwo: { de: 'Person 2', en: 'Player 2' },

  /* pack ----------------------------------------------------------------- */
  pickPack: { de: 'Welches Pack?', en: 'Which pack?' },

  /* duration / route ----------------------------------------------------- */
  pickDuration: { de: 'Wie viel Zeit habt ihr?', en: 'How much time do you have?' },

  /* mode ----------------------------------------------------------------- */
  pickMode: { de: 'Modus wählen', en: 'Pick a mode' },
  // This shows elapsed time only; it never counts down or alarms.
  timer: { de: 'Zeit anzeigen', en: 'Show time' },
  on: { de: 'An', en: 'On' },
  off: { de: 'Aus', en: 'Off' },

  /* intro ---------------------------------------------------------------- */
  introLines: {
    de: 'Legt das Handy zwischen euch.\n\nAntwortet laut.\n\nTippt nichts ein.\n\nEs gibt keine richtigen Antworten.',
    en: "Put the phone between you.\n\nAnswer out loud.\n\nDon't type anything.\n\nThere are no right answers.",
  },
  // Passing language is inclusive and applies equally to both people.
  introPass: {
    de: 'Jede Frage darf ohne Begründung ausgelassen werden.\n\nEine Grenze kostet nichts.',
    en: 'Either of you may pass on any question without explanation.\n\nA boundary never costs anything.',
  },
  // This summary must stay aligned with the complete Privacy menu view.
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
  declineToAnswer: { de: 'Lieber nicht', en: "I'd rather not" },
  stay: { de: 'Bleiben', en: 'Stay' },
  takeYourTime: { de: 'Lasst euch Zeit.', en: 'Take your time.' },
  done: { de: 'Fertig', en: 'Done' },

  passed: { de: 'Weiter ohne Antwort.', en: 'Moving on without an answer.' },

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

  // STAY gives quiet space; it never instructs people to keep disclosing.
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
  // Overtime is guidance only; it never implies that the current act is done.
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
      ? `Denk an eine Frage, die du ${other} später gerne stellen möchtest.\n\nSag sie nicht laut.\n\nTipp sie nirgends ein.\n\nMerk sie dir einfach.`
      : `Think of one question you would like to ask ${other} later.\n\nDon't say it out loud.\n\nDon't type it anywhere.\n\nJust remember it.`,
  iHaveOne: { de: 'Ich hab eine', en: 'I have one' },
  // Declining to form a saved question is an equal, no-follow-up choice.
  noSecretToday: { de: 'Heute keine', en: 'Not today' },
  passPhone: { de: 'GIB DAS HANDY WEITER', en: 'PASS THE PHONE' },
  passPhoneText: (lang, other, hasQuestion) =>
    lang === 'de'
      ? hasQuestion
        ? `Gib das Handy an ${other}.\n\nVerrate deine Frage nicht.`
        : `Gib das Handy an ${other}.`
      : hasQuestion
      ? `Give the phone to ${other}.\n\nDon't tell them your question.`
      : `Give the phone to ${other}.`,
  passPhoneBack: { de: 'GIB DAS HANDY ZURÜCK', en: 'PASS THE PHONE BACK' },
  passPhoneBackText: {
    de: 'Legt es wieder zwischen euch.',
    en: 'Put it back between you.',
  },

  /* finale ------------------------------------------------------------------ */
  oneLastQuestion: { de: 'LETZTE RUNDE', en: 'FINAL ROUND' },
  reveal: { de: 'Zeigen', en: 'Reveal' },
  // Route totals vary, so the completion line is generated dynamically.
  allThirtySix: (lang, total) =>
    lang === 'de' ? `Das waren alle ${total}.` : `That's all ${total}.`,
  secretSummary: (lang, count) =>
    lang === 'de'
      ? count === 1
        ? 'Eine vorgemerkte Frage ist noch zu klären.'
        : 'Ihr habt beide eine Frage vorgemerkt.'
      : count === 1
      ? 'One saved question is left to resolve.'
      : 'You both saved a question for later.',

  didYouAsk: (lang, other) =>
    lang === 'de'
      ? `Hast du ${other} deine vorgemerkte Frage im Gespräch bereits gestellt?`
      : `Did you already ask ${other} the question you saved for later?`,
  yes: { de: 'Ja', en: 'Yes' },
  no: { de: 'Nein', en: 'No' },

  q37OneMore: { de: 'NOCH EINE?', en: 'ONE MORE?' },
  // When both people declined the private prompt, do not invent a question.
  q37NoSecretQuestions: { de: 'KEINE GEHEIMFRAGEN', en: 'NO SECRET QUESTIONS' },
  q37NoSecretQuestionsText: {
    de: 'Ihr hattet heute beide keine Geheimfrage.\n\nTrotzdem noch eine Frage 37?',
    en: "Neither of you had a secret question today.\n\nStill want a Question 37?",
  },
  q37OneRemains: { de: 'EINE FRAGE FEHLT NOCH', en: 'ONE QUESTION REMAINS' },
  // Deliberately name-free because ownership and asking roles differ.
  q37OneText: {
    de: 'Eine vorgemerkte Frage wartet noch.',
    en: 'One saved question is still waiting.',
  },
  q37AlreadyAsked: { de: 'IHR HABT SIE SCHON GESTELLT.', en: 'YOU ALREADY ASKED THEM.' },
  q37StillWantOne: { de: 'Trotzdem noch eine?', en: 'Still want one more?' },
  q37Button: { de: 'FRAGE 37', en: 'QUESTION 37' },
  q37Label: { de: 'FRAGE 37', en: 'QUESTION 37' },
  finalQuestionButton: { de: 'FINALE', en: 'FINALE' },
  finalQuestionLabel: { de: 'FINALE', en: 'FINALE' },
  // Neither of you asked the other's secret question -- rather than one
  // shared prompt, each of you gets an explicit, ordered turn.
  q37AskSecret: (lang, who) =>
    lang === 'de' ? `${who} stellt die vorgemerkte Frage.` : `${who} asks the saved question.`,
  end: { de: 'Ende', en: 'End' },

  /* per-pack consent gates --------------------------------------------- */
  consentAgree: { de: 'Ich stimme zu', en: 'I agree' },
  // Its separate label and equal styling keep decline calm and unambiguous.
  endHere: { de: 'Hier enden', en: 'End here' },
  consentDeclinedTitle: {
    de: 'Alles gut.',
    en: 'All good.',
  },
  consentDeclinedBody: {
    de: 'Ohne zweimalige Zustimmung startet oder vertieft sich LATE NIGHT nicht. Ihr müsst nichts erklären.',
    en: 'Without two separate yeses, LATE NIGHT does not begin or deepen. No explanation is needed.',
  },

  /* in-game menu -------------------------------------------------------- */
  // The global menu remains reachable from setup, play, STAY, and finales.
  menuOpen: { de: 'Menü', en: 'Menu' },
  menuTitle: { de: 'Menü', en: 'Menu' },
  menuResume: { de: 'Weiterspielen', en: 'Keep playing' },
  menuEnd: { de: 'Spiel jetzt beenden', en: 'End the game now' },
  menuEndConfirm: { de: 'Spiel jetzt beenden?', en: 'End the game now?' },
  menuEndSub: { de: 'Ohne Begründung.', en: 'No explanation needed.' },
  menuRestart: { de: 'Von vorne beginnen', en: 'Start over' },
  menuAdditionalContent: { de: 'Zusätzliche Inhalte', en: 'Additional content' },
  menuAdditionalContentTitle: { de: 'Zusätzliche Inhalte', en: 'Additional content' },
  lateNightMenuIntro: {
    de: 'LATE NIGHT ist ein ausdrücklich sexueller Gesprächsmodus für zwei Erwachsene (18+). Er bleibt standardmäßig verborgen. Sichtbarkeit ersetzt keine Zustimmung: Vor dem Start und vor Akt II entscheiden beide Personen jeweils privat und unabhängig.',
    en: 'LATE NIGHT is an explicitly sexual conversation mode for two adults (18+). It stays hidden by default. Visibility is not consent: before starting and before Act II, both people decide privately and independently.',
  },
  lateNightShow: { de: 'LATE NIGHT anzeigen', en: 'Show LATE NIGHT' },
  lateNightHide: { de: 'LATE NIGHT wieder verbergen', en: 'Hide LATE NIGHT again' },
  lateNightShown: {
    de: 'LATE NIGHT ist jetzt in der Spielauswahl sichtbar.',
    en: 'LATE NIGHT is now visible in the game selection.',
  },
  lateNightHidden: {
    de: 'LATE NIGHT bleibt in der Spielauswahl verborgen.',
    en: 'LATE NIGHT remains hidden from the game selection.',
  },
  menuImprint: { de: 'Impressum', en: 'Imprint' },
  menuPrivacy: { de: 'Datenschutz', en: 'Privacy' },
  // Unlike restart, this removes every local CLOSER key and preference.
  deleteLocalData: { de: 'Lokale Spieldaten löschen', en: 'Delete local data' },
  deleteLocalDataConfirm: {
    de: 'Lokale Spieldaten löschen?',
    en: 'Delete local data?',
  },
  // Explain that browser cache and persistent site data are separate.
  deleteLocalDataSub: {
    de: 'Browser-Cache und lokaler Spielstand sind getrennt: „Cache leeren" allein entfernt euren Spielstand meist nicht. Diese Aktion entfernt eure optionalen Namen, Einstellungen und den Spielfortschritt von diesem Gerät. Eure Antworten waren nie gespeichert.',
    en: "Browser cache and local game data are separate: clearing your cache alone usually won't remove your save. This removes your optional names, settings and game progress from this device. Your answers were never stored.",
  },
  menuClose: { de: 'Schließen', en: 'Close' },

  /* milestone celebration --------------------------------------------- */
  milestoneLabel: (lang, stage) => {
    const labels = {
      start: { de: 'Los geht’s', en: "Let's begin" },
      actI: { de: 'Akt I geschafft', en: 'Act I complete' },
      actII: { de: 'Akt II geschafft', en: 'Act II complete' },
      secret: { de: 'Ein Stück näher', en: 'One step closer' },
      finale: { de: 'Dieser Moment gehört euch', en: 'This moment is yours' },
    };
    return labels[stage]?.[lang] || labels.start[lang];
  },
  milestoneDetail: (lang, stage) => {
    const details = {
      start: {
        de: 'Zwei Menschen. Ein gemeinsamer Anfang.',
        en: 'Two people. One shared beginning.',
      },
      actI: {
        de: 'Die erste Verbindung steht.',
        en: 'The first connection is in place.',
      },
      actII: {
        de: 'Das Spiel wird leiser. Euer Gespräch bleibt.',
        en: 'The game gets quieter. Your conversation remains.',
      },
      secret: {
        de: 'Eine private Frage wartet auf den richtigen Moment.',
        en: 'A private question is waiting for the right moment.',
      },
      finale: {
        de: 'Kein Score. Nur das, was zwischen euch entstanden ist.',
        en: 'No score. Just what the two of you created.',
      },
    };
    return details[stage]?.[lang] || details.start[lang];
  },

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
