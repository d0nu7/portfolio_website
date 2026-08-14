/*
 * Every interface string CLOSER shows, in both languages.
 *
 * Entries are either a { de, en } pair or a function taking the language and
 * returning the string, for the few lines that need a name substituted.
 */

const COPY = {
  tagline: {
    de: 'Zwei Menschen. Ein Handy. Kein Small Talk.',
    en: 'Two people. One phone. No small talk.',
  },
  introBlurb: {
    de: '36 Fragen, drei Akte, etwa 45 Minuten. Nichts, was ihr sagt, wird eingegeben, bewertet oder gespeichert.',
    en: 'Thirty-six questions, three acts, about forty-five minutes. Nothing you say is typed in, scored or stored.',
  },
  introFoot: {
    de: 'Setzt euch gegenüber. Legt das Handy zwischen euch.',
    en: 'Sit across from each other. Put the phone between you.',
  },
  begin: { de: 'Starten', en: 'Begin' },
  continue: { de: 'Weiter', en: 'Continue' },
  startOver: { de: 'Von vorne', en: 'Start over' },

  whoIsPlaying: { de: 'Wer spielt', en: 'Who is playing' },
  firstName: { de: 'Erster Name', en: 'First name' },
  secondName: { de: 'Zweiter Name', en: 'Second name' },
  namePlaceholder: { de: 'Name', en: 'Their name' },
  namesNote: {
    de: 'Die Namen werden nur dafür verwendet, zu sagen, wer dran ist.',
    en: 'Names are only used to say whose turn it is.',
  },

  pickMode: { de: 'Modus wählen', en: 'Pick a mode' },
  clockLabel: {
    de: '15-Minuten-Uhr pro Akt anzeigen',
    en: 'Show a 15 minute clock per act',
  },
  on: { de: 'An', en: 'On' },
  off: { de: 'Aus', en: 'Off' },
  startActOne: { de: 'Akt I starten', en: 'Start act I' },
  modeNote: {
    de: 'So oder so: keine Punkte, kein Gewinner.',
    en: 'Either way, no points and no winner.',
  },

  complete: { de: 'ABGESCHLOSSEN', en: 'COMPLETE' },
  breakHeadline: {
    de: 'Ihr wisst jetzt Dinge voneinander, die ihr vor fünfzehn Minuten noch nicht wusstet.',
    en: 'You now know things about each other you did not know fifteen minutes ago.',
  },
  breakSip: {
    de: 'Trinkt etwas. Steht auf. Lacht.',
    en: 'Take a sip. Stand up. Laugh.',
  },

  forOnly: (lang, who) => (lang === 'de' ? `Nur für ${who}` : `For ${who} only`),
  secretHeadline: (lang, other) =>
    lang === 'de'
      ? `Denk an eine Frage, von der du insgeheim hoffst, dass ${other} sie dir heute Abend stellt.`
      : `Think of one question you secretly hope ${other} asks you tonight.`,
  secretNote: {
    de: 'Sag sie nicht laut. Tipp sie nirgends ein. Behalte sie einfach im Kopf.',
    en: 'Do not say it out loud. Do not type it anywhere. Just hold on to it.',
  },
  secretCta: { de: 'Ich hab eine', en: 'I have one' },
  handPhoneTo: (lang, other) =>
    lang === 'de' ? `Gib das Handy jetzt an ${other}.` : `Then hand the phone to ${other}.`,
  putPhoneDown: {
    de: 'Legt das Handy wieder hin.',
    en: 'Put the phone back down.',
  },

  oneLastQuestion: { de: 'Eine letzte Frage.', en: 'One last question.' },
  ready: { de: 'Bereit', en: 'Ready' },

  goesFirst: (lang, who) => (lang === 'de' ? `${who} beginnt.` : `${who} goes first.`),
  answerTogether: { de: 'Antwortet gleichzeitig.', en: 'Answer together.' },
  dontOverthink: (lang, who) =>
    lang === 'de' ? `${who}, nicht zu lange nachdenken.` : `${who}, do not overthink it.`,
  takeYourTime: {
    de: 'Jetzt könnt ihr euch so viel Zeit dafür nehmen, wie ihr wollt.',
    en: 'Now take as long as you like with it.',
  },
  next: { de: 'Weiter', en: 'Next' },
  weAnswered: { de: 'Wir haben geantwortet', en: 'We answered' },
  stay: { de: 'Bleiben', en: 'Stay' },
  skip: { de: 'Diese überspringen', en: 'Skip this one' },
  noSkips: { de: 'Keine Skips mehr', en: 'No skips left' },

  predictLabel: { de: 'Tippen', en: 'Predict' },
  predictText: (lang, guesser, answerer) =>
    lang === 'de'
      ? `${guesser}, rate, was ${answerer} sagen wird. Lass sie oder ihn erst danach antworten.`
      : `${guesser}, guess what ${answerer} is going to say. Then let them answer.`,
  bothLabel: { de: 'Beide', en: 'Both' },
  bothText: {
    de: 'Antwortet gleichzeitig. Sagt das Erste, was euch einfällt.',
    en: 'Answer at the same time. Say the first thing out loud.',
  },
  bothCta: { de: 'Zähl uns an', en: 'Count us in' },
  quickLabel: { de: 'Nicht nachdenken', en: 'No thinking' },
  quickText: {
    de: 'Antworte, bevor der Countdown abgelaufen ist. Danach könnt ihr in Ruhe weiterreden.',
    en: 'Answer before the count runs out. You can keep talking about it afterwards.',
  },
  quickCta: { de: 'Los', en: 'Go' },

  deeperLabel: { de: 'Tiefer', en: 'Go deeper' },
  deeperHeadline: { de: 'Willst du mehr wissen?', en: 'Want to know more?' },
  deeperText: {
    de: 'Das Spiel gibt euch keine Anschlussfrage. Stellt die, die ihr wirklich stellen wollt.',
    en: 'The game will not hand you a follow-up. Ask the one you actually want to ask.',
  },
  deeperCta: { de: 'Eine Frage mehr', en: 'Ask one more question' },

  forgetTheGame: {
    de: 'Vergesst das Spiel für einen Moment.',
    en: 'Forget the game for a moment.',
  },

  thatsIt: { de: 'Das war’s.', en: 'That’s it.' },
  putAway: {
    de: 'Ihr könnt das Handy jetzt weglegen.',
    en: 'You can put the phone away now.',
  },
  unlessOneMore: {
    de: 'Außer ihr wollt noch eine',
    en: 'Unless you want one more',
  },

  secretCheckKicker: {
    de: 'Die Frage, die du im Kopf hattest',
    en: 'The question you were holding',
  },
  didTheyAsk: { de: 'Hat sie oder er sie gestellt?', en: 'Did they ask it?' },
  maybeYouShould: {
    de: 'Dann solltest du sie vielleicht stellen.',
    en: 'Then maybe you should.',
  },
  yes: { de: 'Ja', en: 'Yes' },
  no: { de: 'Nein', en: 'No' },

  question37: { de: 'Frage 37', en: 'Question 37' },
  done: { de: 'Fertig', en: 'Done' },

  endTagline: {
    de: 'Je näher ihr euch kommt, desto weniger braucht ihr das Spiel.',
    en: 'The closer you get, the less you need the game.',
  },
  playAgain: { de: 'Nochmal spielen', en: 'Play again' },

  strangers: { de: 'Fremde', en: 'Strangers' },
  close: { de: 'Nah', en: 'Close' },
  overTime: { de: 'über der Zeit', en: 'over time' },
};

export default COPY;
