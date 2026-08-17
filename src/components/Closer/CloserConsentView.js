import React from 'react';

import { pick } from '../../constants/closer';
import CloserHandoff from './CloserHandoff';
import {
  Body,
  Foot,
  GhostButton,
  Kicker,
  Lede,
  Row,
} from './CloserStyles';

const PASS_PHASES = new Set([
  'consentGatePassA',
  'consentGatePassB',
  'consentAct2PassA',
  'consentAct2PassB',
]);

export const CONSENT_VIEW_PHASES = new Set([
  ...PASS_PHASES,
  'consentGateA',
  'consentGateB',
  'consentAct2A',
  'consentAct2B',
  'consentGateAccepted',
  'consentAct2Accepted',
]);

export default function CloserConsentView({
  state,
  pack,
  lang,
  accent,
  nameOf,
  t,
  tf,
  onHandoff,
  onConfirm,
  onDecline,
  onContinueAccepted,
}) {
  const act2 = state.phase.startsWith('consentAct2');
  const roleIndex = state.phase.endsWith('A') ? 0 : 1;
  const roleA = state.starterOffset === 1 ? 1 : 0;
  const person = roleIndex === 0 ? roleA : 1 - roleA;

  if (state.phase === 'consentGateAccepted' || state.phase === 'consentAct2Accepted') {
    return (
      <>
        <Body $center>
          <Kicker $accent={accent}>{t('consentAcceptedTitle')}</Kicker>
          <Lede>{pick(
            state.phase === 'consentAct2Accepted'
              ? pack.consentGate.act2Accepted
              : pack.consentGate.entryAccepted,
            lang
          )}</Lede>
        </Body>
        <Foot><GhostButton onClick={onContinueAccepted}>{t('continue')}</GhostButton></Foot>
      </>
    );
  }

  if (PASS_PHASES.has(state.phase)) {
    return (
      <CloserHandoff
        accent={accent}
        kicker={tf('passPhoneTo', nameOf(person))}
        action={tf('iAm', nameOf(person))}
        onAction={onHandoff}
      />
    );
  }

  return (
    <>
      <Body $center>
        <Kicker $accent={accent}>{tf('forOnly', nameOf(person))}</Kicker>
        <Lede>{pick(
          act2 ? pack.consentGate.act2Cards[roleIndex] : pack.consentGate.entryCards[roleIndex],
          lang
        )}</Lede>
      </Body>
      <Foot>
        <Row>
          <GhostButton onClick={onConfirm}>{t('consentAgree')}</GhostButton>
          <GhostButton onClick={onDecline}>{t('endHere')}</GhostButton>
        </Row>
      </Foot>
    </>
  );
}
