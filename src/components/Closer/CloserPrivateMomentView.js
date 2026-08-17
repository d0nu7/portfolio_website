import React from 'react';

import { pick } from '../../constants/closer';
import CloserHandoff from './CloserHandoff';
import {
  Body,
  Button,
  Foot,
  GhostButton,
  Kicker,
  Lede,
  Question,
  Row,
  TextButton,
} from './CloserStyles';

export const PRIVATE_MOMENT_VIEW_PHASES = new Set([
  'secretOffer',
  'secretPass1',
  'secret1',
  'secretPass2',
  'secret2',
  'secretPassBack',
  'privateUse',
  'checkPass1',
  'check1',
  'checkPass2',
  'check2',
  'checkPassBack',
]);

function formatNames(text, names) {
  return String(text || '')
    .replaceAll('{A}', names[0])
    .replaceAll('{B}', names[1])
    .replaceAll('{who}', names[0])
    .replaceAll('{other}', names[1]);
}

export default function CloserPrivateMomentView({
  state,
  moment,
  lang,
  accent,
  nameOf,
  t,
  tf,
  onStart,
  onSkipAll,
  onHandoff,
  onSetCardChoice,
  onSetQuestionStatus,
  onCompleteUse,
}) {
  const phase = state.phase;
  const starterOffset = state.starterOffset === 1 ? 1 : 0;
  const rolePlayers = [starterOffset, 1 - starterOffset];
  const names = rolePlayers.map(nameOf);

  if (phase === 'secretOffer') {
    return (
      <>
        <Body $center>
          <Kicker $accent={accent}>{t('privateOfferTitle')}</Kicker>
          <Lede>{pick(moment.offer, lang)}</Lede>
        </Body>
        <Foot>
          <Row>
            <GhostButton onClick={onStart}>{t('showPrivateCards')}</GhostButton>
            <GhostButton onClick={onSkipAll}>{t('skipPrivateForBoth')}</GhostButton>
          </Row>
        </Foot>
      </>
    );
  }

  if (phase === 'secretPass1' || phase === 'secretPass2') {
    const roleIndex = phase === 'secretPass1' ? 0 : 1;
    const person = rolePlayers[roleIndex];
    return (
      <CloserHandoff
        accent={accent}
        kicker={tf('passPhoneTo', nameOf(person))}
        body={phase === 'secretPass1'
          ? tf('privateHandoffBody', nameOf(person))
          : tf('privateSecondHandoffBody', nameOf(person))}
        action={tf('iAm', nameOf(person))}
        secondaryAction={t('skipPrivateForBoth')}
        onAction={onHandoff}
        onSecondaryAction={onSkipAll}
      />
    );
  }

  if (phase === 'secret1' || phase === 'secret2') {
    const roleIndex = phase === 'secret1' ? 0 : 1;
    const person = rolePlayers[roleIndex];
    const other = 1 - person;
    const card = moment.cards[roleIndex];
    const body = formatNames(pick(card.body, lang), [nameOf(person), nameOf(other)]);
    return (
      <>
        <Body $center>
          <Kicker $accent={accent}>{tf('forOnly', nameOf(person))}</Kicker>
          <Lede>{body}</Lede>
        </Body>
        <Foot>
          <Button $accent={accent} onClick={() => onSetCardChoice(true)}>
            {pick(card.action, lang)}
          </Button>
          <TextButton onClick={() => onSetCardChoice(false)}>{t('noPrivateToday')}</TextButton>
        </Foot>
      </>
    );
  }

  if (phase === 'secretPassBack') {
    return (
      <CloserHandoff
        accent={accent}
        kicker={t('privateReturnTitle')}
        body={pick(moment.returnCopy, lang)}
        action={t('continue')}
        onAction={onHandoff}
      />
    );
  }

  if (phase === 'privateUse') {
    return (
      <>
        <Body $center>
          <Kicker $accent={accent}>{t('privateUseTitle')}</Kicker>
          <Lede>{formatNames(pick(moment.use.copy, lang), names)}</Lede>
        </Body>
        <Foot><Button $accent={accent} onClick={onCompleteUse}>{t('continue')}</Button></Foot>
      </>
    );
  }

  if (phase === 'checkPass1' || phase === 'checkPass2') {
    const person = phase === 'checkPass1' ? 0 : 1;
    return (
      <CloserHandoff
        accent={accent}
        kicker={tf('passPhoneTo', nameOf(person))}
        body={tf('privateHandoffBody', nameOf(person))}
        action={tf('iAm', nameOf(person))}
        onAction={onHandoff}
      />
    );
  }

  if (phase === 'checkPassBack') {
    return (
      <CloserHandoff
        accent={accent}
        kicker={t('privateReturnTitle')}
        body={pick(moment.returnCopy, lang)}
        action={t('continue')}
        onAction={onHandoff}
      />
    );
  }

  const person = phase === 'check1' ? 0 : 1;
  return (
    <>
      <Body $center>
        <Kicker>{tf('forOnly', nameOf(person))}</Kicker>
        <Question>{t('privateQuestionCheck')}</Question>
      </Body>
      <Foot>
        <GhostButton onClick={() => onSetQuestionStatus('asked')}>
          {t('privateAlreadyAsked')}
        </GhostButton>
        <GhostButton onClick={() => onSetQuestionStatus('pending')}>
          {t('privateStillOpen')}
        </GhostButton>
        <TextButton onClick={() => onSetQuestionStatus('discarded')}>
          {t('privateDiscard')}
        </TextButton>
      </Foot>
    </>
  );
}
