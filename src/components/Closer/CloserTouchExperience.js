import React, { useEffect, useState } from 'react';

import { pick } from '../../constants/closer';
import CloserHandoff from './CloserHandoff';
import {
  ActNumeral,
  ActTitle,
  Body,
  Button,
  Foot,
  GhostButton,
  Kicker,
  Lede,
  Question,
  ResponseCard,
  ResponseCardLabel,
  Small,
  TextButton,
} from './CloserStyles';

const COPY = {
  chooseTogether: { de: 'Getrennt entscheiden', en: 'Choose separately' },
  yes: { de: 'Ja', en: 'Yes' },
  adjust: { de: 'Anpassen', en: 'Adjust' },
  skip: { de: 'Auslassen', en: 'Skip' },
  forPerson: (lang, name) => lang === 'de' ? `NUR FÜR ${name}` : `FOR ${name.toUpperCase()} ONLY`,
  handoff: (lang, name) => lang === 'de' ? `GIB DAS HANDY AN ${name.toUpperCase()}` : `PASS THE PHONE TO ${name.toUpperCase()}`,
  iAm: (lang, name) => lang === 'de' ? `Ich bin ${name}` : `I'm ${name}`,
  gateIntro: {
    de: 'Wähle nur für die genaue Einladung auf diesem Bildschirm. Deine Auswahl wird sofort verdeckt.',
    en: 'Choose only for the exact invitation on this screen. Your choice is masked immediately.',
  },
  open: { de: 'JA + JA', en: 'YES + YES' },
  openBody: {
    de: 'Diese genaue Option ist jetzt zum Ausprobieren offen. Sie ist kein Versprechen weiterzumachen. Beide Personen können jederzeit stoppen.',
    en: 'This exact option is now open to try. It is not a promise to continue. Either person can stop at any time.',
  },
  roles: (lang, receiver, giver) => lang === 'de'
    ? `${receiver} empfängt · ${giver} bietet an`
    : `${receiver} receives · ${giver} offers`,
  ready: { de: 'Fertig', en: 'Ready' },
  repeat: { de: 'Neu entscheiden', en: 'Choose again' },
  pause: { de: 'Pause', en: 'Pause' },
  stop: { de: 'Stopp', en: 'Stop' },
  more: { de: 'Mehr', en: 'More' },
  softer: { de: 'Sanfter', en: 'Softer' },
  slower: { de: 'Langsamer', en: 'Slower' },
  notThere: { de: 'Nicht dort', en: 'Not there' },
  different: { de: 'Anders', en: 'Different' },
  reduceNow: { de: 'Gilt sofort. Die empfangende Person gibt die Richtung vor.', en: 'Applies immediately. The receiver directs.' },
  adjustTitle: { de: 'ETWAS ÄNDERN', en: 'ADJUST' },
  adjustBody: {
    de: 'Der Kontakt stoppt. Ändert genau eine Sache: Stelle · Kleidung · Druck · Tempo · Bewegung · Dauer · Position · Rolle · keine Berührung. Benennt danach die neue genaue Option und entscheidet erneut.',
    en: 'Contact stops. Change exactly one thing: area · clothing · pressure · pace · movement · duration · position · role · no touch. Then state the revised exact option and choose again.',
  },
  revised: { de: 'Neue Option steht fest', en: 'Revised option is clear' },
  skippedTitle: { de: 'AUSGELASSEN', en: 'SKIPPED' },
  skippedBody: { de: 'Es geht nichts verloren. Diese Option bleibt geschlossen.', en: 'Nothing is lost. This option stays closed.' },
  next: { de: 'Weiter', en: 'Continue' },
  pausedTitle: { de: 'PAUSE', en: 'PAUSE' },
  pausedBody: {
    de: 'Der Kontakt endet jetzt. Nehmt den Raum, den ihr braucht. Für jede Wiederaufnahme entscheidet ihr erneut.',
    en: 'Contact stops now. Take the space you need. Any restart requires a fresh choice.',
  },
  resume: { de: 'Neu entscheiden', en: 'Choose again' },
  moreSpace: { de: 'Mehr Abstand · weiter', en: 'More space · continue' },
  end: { de: 'Session beenden', en: 'End session' },
  actRenewal: {
    de: 'Der nächste Akt enthält Nähe, äußerliche Berührung und optionale Küsse. Möchtest du jetzt weitere Kategorien in Betracht ziehen?',
    en: 'The next act includes closeness, external touch, and optional kissing. Do you want to consider further categories now?',
  },
  renewalAccepted: {
    de: 'Ihr habt beide unabhängig gewählt fortzufahren. Jede konkrete Einladung braucht weiterhin ein eigenes Ja + Ja.',
    en: 'You both independently chose to continue. Every exact invitation still needs its own Yes + Yes.',
  },
  closeTitle: { de: 'FÜRSORGE UND RAUM', en: 'CARE AND SPACE' },
  closeBody: {
    de: 'Wählt, was jetzt passt: Abstand · ruhige Nähe · eine bereits gewählte niedrige Berührung · Wasser oder praktische Bequemlichkeit · ein kurzer Check-in · direkt schließen. Die Session erlaubt nichts, was danach passiert.',
    en: 'Choose what fits now: space · quiet nearness · one already chosen low-intensity touch · water or practical comfort · one short check-in · close now. The session authorizes nothing that happens afterward.',
  },
  noSave: { de: 'Diese Session wird nicht gespeichert und kann nicht fortgesetzt werden.', en: 'This session is not saved and cannot be resumed.' },
};

const choiceOrder = ['yes', 'adjust', 'skip'];

export default function CloserTouchExperience({
  run,
  pack,
  lang,
  starterOffset,
  nameOf,
  onEnd,
}) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState('actIntro');
  const [choices, setChoices] = useState([null, null]);
  const [feedback, setFeedback] = useState('');
  const current = run.questions[index];
  const content = current?.content;
  const actIndex = current?.actIndex ?? 0;
  const style = pack.actStyle[actIndex];
  const chooserA = starterOffset === 1 ? 1 : 0;
  const receiver = (index + starterOffset) % 2;
  const giver = 1 - receiver;

  useEffect(() => {
    const closeOnHide = () => {
      if (document.visibilityState === 'hidden') onEnd();
    };
    document.addEventListener('visibilitychange', closeOnHide);
    window.addEventListener('pagehide', onEnd);
    return () => {
      document.removeEventListener('visibilitychange', closeOnHide);
      window.removeEventListener('pagehide', onEnd);
    };
  }, [onEnd]);

  const beginGate = () => {
    setChoices([null, null]);
    setFeedback('');
    setPhase('handoffA');
  };

  const advance = () => {
    setFeedback('');
    if (index >= run.questions.length - 1) {
      setPhase('complete');
      return;
    }
    const nextIndex = index + 1;
    const nextAct = run.questions[nextIndex].actIndex;
    setIndex(nextIndex);
    if (nextAct !== actIndex) {
      setPhase(nextAct === 1 ? 'renewHandoffA' : 'actIntro');
    } else {
      setPhase('card');
    }
  };

  const choose = (slot, value, renewal = false) => {
    const next = [...choices];
    next[slot] = value;
    setChoices(next);
    if (slot === 0) {
      setPhase(renewal ? 'renewHandoffB' : 'handoffB');
      return;
    }
    if (renewal) {
      if (next.includes('skip')) onEnd();
      else setPhase('renewAccepted');
      return;
    }
    if (next.includes('skip')) setPhase('skipped');
    else if (next.includes('adjust')) setPhase('adjust');
    else setPhase('action');
  };

  if (phase === 'actIntro') {
    const act = run.acts[actIndex];
    return (
      <>
        <Body $center>
          <ActNumeral>{pick(act.numeral, lang)}</ActNumeral>
          <ActTitle $accent={style.accent}>{pick(act.title, lang)}</ActTitle>
          <Lede>{pick(act.intro, lang)}</Lede>
          <Small style={{ marginTop: '2.4rem', textAlign: 'center' }}>{pick(COPY.noSave, lang)}</Small>
        </Body>
        <Foot><Button $accent={style.accent} onClick={() => setPhase('card')}>{pick(COPY.next, lang)}</Button></Foot>
      </>
    );
  }

  const renewal = phase.startsWith('renew');
  if (phase === 'handoffA' || phase === 'handoffB' || phase === 'renewHandoffA' || phase === 'renewHandoffB') {
    const slot = phase.endsWith('A') ? 0 : 1;
    const person = slot === 0 ? chooserA : 1 - chooserA;
    return (
      <CloserHandoff
        accent={style.accent}
        kicker={COPY.handoff(lang, nameOf(person))}
        action={COPY.iAm(lang, nameOf(person))}
        onAction={() => setPhase(renewal ? `renewChoice${slot === 0 ? 'A' : 'B'}` : `choice${slot === 0 ? 'A' : 'B'}`)}
      />
    );
  }

  if (phase === 'choiceA' || phase === 'choiceB' || phase === 'renewChoiceA' || phase === 'renewChoiceB') {
    const slot = phase.endsWith('A') ? 0 : 1;
    const person = slot === 0 ? chooserA : 1 - chooserA;
    return (
      <>
        <Body $center>
          <Kicker $accent={style.accent}>{COPY.forPerson(lang, nameOf(person))}</Kicker>
          <Question>{renewal ? pick(COPY.actRenewal, lang) : pick(content, lang)}</Question>
          <Small style={{ marginTop: '2rem', textAlign: 'center' }}>{pick(COPY.gateIntro, lang)}</Small>
        </Body>
        <Foot>
          <div style={{ display: 'grid', gap: '0.8rem' }}>
            {choiceOrder.map((value) => (
              <GhostButton key={value} onClick={() => choose(slot, value, renewal)}>
                {pick(COPY[value], lang)}
              </GhostButton>
            ))}
          </div>
          <TextButton onClick={onEnd}>{pick(COPY.end, lang)}</TextButton>
        </Foot>
      </>
    );
  }

  if (phase === 'renewAccepted') {
    return (
      <>
        <Body $center><Kicker $accent={style.accent}>JA + JA</Kicker><Lede>{pick(COPY.renewalAccepted, lang)}</Lede></Body>
        <Foot><Button $accent={style.accent} onClick={() => { setChoices([null, null]); setPhase('actIntro'); }}>{pick(COPY.next, lang)}</Button></Foot>
      </>
    );
  }

  if (phase === 'card') {
    return (
      <>
        <Body $center>
          <Kicker $accent={style.accent}>{String(index + 1).padStart(2, '0')} / {run.questions.length}</Kicker>
          <Question>{pick(content, lang)}</Question>
          {content.requiresBilateral ? (
            <Small style={{ marginTop: '2rem', textAlign: 'center' }}>{pick(COPY.roles(lang, nameOf(receiver), nameOf(giver)), lang)}</Small>
          ) : null}
        </Body>
        <Foot>
          <Button $accent={style.accent} onClick={content.requiresBilateral ? beginGate : advance}>
            {pick(content.requiresBilateral ? COPY.chooseTogether : COPY.next, lang)}
          </Button>
          <TextButton onClick={onEnd}>{pick(COPY.end, lang)}</TextButton>
        </Foot>
      </>
    );
  }

  if (phase === 'skipped') {
    return (
      <>
        <Body $center><Kicker $accent={style.accent}>{pick(COPY.skippedTitle, lang)}</Kicker><Lede>{pick(COPY.skippedBody, lang)}</Lede></Body>
        <Foot><Button $accent={style.accent} onClick={advance}>{pick(COPY.next, lang)}</Button></Foot>
      </>
    );
  }

  if (phase === 'adjust') {
    return (
      <>
        <Body $center><Kicker $accent={style.accent}>{pick(COPY.adjustTitle, lang)}</Kicker><Lede>{pick(COPY.adjustBody, lang)}</Lede></Body>
        <Foot>
          <Button $accent={style.accent} onClick={beginGate}>{pick(COPY.revised, lang)}</Button>
          <TextButton onClick={advance}>{pick(COPY.skip, lang)}</TextButton>
          <TextButton onClick={onEnd}>{pick(COPY.end, lang)}</TextButton>
        </Foot>
      </>
    );
  }

  if (phase === 'pause') {
    return (
      <>
        <Body $center><Kicker $accent={style.accent}>{pick(COPY.pausedTitle, lang)}</Kicker><Lede>{pick(COPY.pausedBody, lang)}</Lede></Body>
        <Foot>
          <GhostButton onClick={beginGate}>{pick(COPY.resume, lang)}</GhostButton>
          <GhostButton onClick={advance}>{pick(COPY.moreSpace, lang)}</GhostButton>
          <TextButton onClick={onEnd}>{pick(COPY.end, lang)}</TextButton>
        </Foot>
      </>
    );
  }

  if (phase === 'action') {
    const cue = (key, effect) => (
      <GhostButton key={key} onClick={effect}>{pick(COPY[key], lang)}</GhostButton>
    );
    return (
      <>
        <Body $center>
          <Kicker $accent={style.accent}>{pick(COPY.open, lang)}</Kicker>
          <Question>{pick(content, lang)}</Question>
          <Lede style={{ marginTop: '2rem' }}>{pick(COPY.openBody, lang)}</Lede>
          <ResponseCard $accent={style.accent}>
            <ResponseCardLabel $accent={style.accent}>{pick(COPY.roles(lang, nameOf(receiver), nameOf(giver)), lang)}</ResponseCardLabel>
            <Small>{feedback || pick(COPY.reduceNow, lang)}</Small>
          </ResponseCard>
        </Body>
        <Foot>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.8rem' }}>
            {cue('softer', () => setFeedback(pick(COPY.reduceNow, lang)))}
            {cue('slower', () => setFeedback(pick(COPY.reduceNow, lang)))}
            {cue('more', () => setPhase('adjust'))}
            {cue('different', () => setPhase('adjust'))}
            {cue('notThere', () => setPhase('adjust'))}
            {cue('pause', () => setPhase('pause'))}
            {cue('stop', () => setPhase('skipped'))}
          </div>
          <Button $accent={style.accent} onClick={advance}>{pick(COPY.ready, lang)}</Button>
          <TextButton onClick={beginGate}>{pick(COPY.repeat, lang)}</TextButton>
          <TextButton onClick={onEnd}>{pick(COPY.end, lang)}</TextButton>
        </Foot>
      </>
    );
  }

  if (phase === 'complete') {
    return (
      <>
        <Body $center><ActTitle $accent={style.accent}>{pick(COPY.closeTitle, lang)}</ActTitle><Lede>{pick(COPY.closeBody, lang)}</Lede><Small style={{ marginTop: '2.4rem' }}>{pick(COPY.noSave, lang)}</Small></Body>
        <Foot><Button $accent={style.accent} onClick={onEnd}>{pick(COPY.end, lang)}</Button></Foot>
      </>
    );
  }

  return null;
}
