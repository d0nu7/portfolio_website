import React from 'react';

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
  'secretPass1',
  'secret1',
  'secretPass2',
  'secret2',
  'secretPassBack',
  'checkPass1',
  'check1',
  'checkPass2',
  'check2',
  'checkPassBack',
]);

export default function CloserPrivateMomentView({
  state,
  accent,
  nameOf,
  t,
  tf,
  onHandoff,
  onSetQuestion,
  onSetAsked,
}) {
  const phase = state.phase;

  if (phase === 'secretPass1' || phase === 'secretPass2') {
    const person = phase === 'secretPass1' ? 0 : 1;
    return (
      <CloserHandoff
        accent={accent}
        kicker={phase === 'secretPass1' ? tf('passPhoneTo', nameOf(0)) : t('passPhone')}
        body={phase === 'secretPass2'
          ? tf('passPhoneText', nameOf(1), state.hasSecretQuestion[0] === true)
          : null}
        action={phase === 'secretPass1' ? tf('iAm', nameOf(0)) : t('done')}
        onAction={onHandoff}
      />
    );
  }

  if (phase === 'secret1' || phase === 'secret2') {
    const person = phase === 'secret1' ? 0 : 1;
    return (
      <>
        <Body $center>
          <Kicker $accent={accent}>{tf('forOnly', nameOf(person))}</Kicker>
          <Lede>{tf('secretTask', nameOf(1 - person))}</Lede>
        </Body>
        <Foot>
          <Button $accent={accent} onClick={() => onSetQuestion(true)}>{t('iHaveOne')}</Button>
          <TextButton onClick={() => onSetQuestion(false)}>{t('noSecretToday')}</TextButton>
        </Foot>
      </>
    );
  }

  if (phase === 'secretPassBack' || phase === 'checkPassBack') {
    return (
      <CloserHandoff
        accent={accent}
        kicker={t('passPhoneBack')}
        body={t('passPhoneBackText')}
        action={t('continue')}
        onAction={onHandoff}
      />
    );
  }

  if (phase === 'checkPass1' || phase === 'checkPass2') {
    const person = phase === 'checkPass1' ? 0 : 1;
    return (
      <CloserHandoff
        accent={accent}
        kicker={tf('passPhoneTo', nameOf(person))}
        action={tf('iAm', nameOf(person))}
        onAction={onHandoff}
      />
    );
  }

  const person = phase === 'check1' ? 0 : 1;
  return (
    <>
      <Body $center>
        <Kicker>{tf('forOnly', nameOf(person))}</Kicker>
        <Question>{tf('didYouAsk', nameOf(1 - person))}</Question>
      </Body>
      <Foot>
        <Row>
          <GhostButton onClick={() => onSetAsked(true)}>{t('yes')}</GhostButton>
          <GhostButton onClick={() => onSetAsked(false)}>{t('no')}</GhostButton>
        </Row>
      </Foot>
    </>
  );
}
