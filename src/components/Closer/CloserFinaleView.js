import React from 'react';

import { Q37_EVENTS, classifySecretAsked } from '../../closer/engine/transitions';
import { pick, starterFor } from '../../constants/closer';
import {
  Body,
  Button,
  Foot,
  GhostButton,
  Kicker,
  Lede,
  Question,
  Row,
  Small,
  TextButton,
} from './CloserStyles';

export const ENDING_BEATS = ['endingOne', 'endingTwo', 'endingThree', 'endingFour'];
export const FINALE_VIEW_PHASES = new Set([
  'lastIntro',
  'all36',
  'q37intro',
  'q37',
  'q37a',
  'q37b',
  'ending',
]);

export function finaleViewGlow(state, beat) {
  if (state.phase !== 'ending') return 0.03;
  return beat === ENDING_BEATS.length - 1 ? 0.1 : 0.02;
}

export default function CloserFinaleView({
  state,
  pack,
  route,
  lang,
  accent,
  total,
  beat,
  revealSecond,
  privateMomentEnabled,
  nameOf,
  t,
  tf,
  onRevealLast,
  onContinueAfterQuestions,
  onQ37,
  onAdvanceBeat,
  onRestart,
}) {
  if (state.phase === 'lastIntro') {
    return (
      <>
        <Body $center><Question>{t('oneLastQuestion')}</Question></Body>
        <Foot><GhostButton onClick={onRevealLast}>{t('reveal')}</GhostButton></Foot>
      </>
    );
  }

  if (state.phase === 'all36') {
    const secretCount = state.hasSecretQuestion.filter((value) => value === true).length;
    return (
      <>
        <Body $center>
          <Question>{tf('allThirtySix', total)}</Question>
          {revealSecond && privateMomentEnabled && secretCount > 0 && (
            <Lede style={{ marginTop: '3.2rem' }}>{tf('secretSummary', secretCount)}</Lede>
          )}
        </Body>
        <Foot>
          {revealSecond && (
            <GhostButton onClick={onContinueAfterQuestions}>
              {route.id === 'quick' ? t('end') : t('continue')}
            </GhostButton>
          )}
        </Foot>
      </>
    );
  }

  if (state.phase === 'ending') {
    if (state.endReason === 'consentDeclined') {
      return (
        <>
          <Body $center>
            <Question>{t('consentDeclinedTitle')}</Question>
            <Lede style={{ marginTop: '2.4rem' }}>{t('consentDeclinedBody')}</Lede>
          </Body>
          <Foot><TextButton onClick={onRestart}>{t('playAgain')}</TextButton></Foot>
        </>
      );
    }
    const finalBeat = beat === ENDING_BEATS.length - 1;
    return (
      <>
        <Body
          $center
          onClick={() => !finalBeat && onAdvanceBeat()}
          aria-live="polite"
          aria-atomic="true"
        >
          <Question key={beat}>{t(ENDING_BEATS[beat])}</Question>
        </Body>
        <Foot>
          {finalBeat ? (
            <>
              <Small style={{ textAlign: 'center', letterSpacing: '.3em' }}>CLOSER</Small>
              <TextButton onClick={onRestart}>{t('playAgain')}</TextButton>
            </>
          ) : (
            <TextButton onClick={onAdvanceBeat}>{t('continue')}</TextButton>
          )}
        </Foot>
      </>
    );
  }

  const finaleLabel = route.id === 'full' ? t('q37Label') : t('finalQuestionLabel');
  const finaleButton = route.id === 'full' ? t('q37Button') : t('finalQuestionButton');
  const classification = classifySecretAsked(state.secretAsked, state.hasSecretQuestion);
  const { neither, bothAsked, pendingPlayer, noneHaveSecretQuestion } = classification;

  if (state.phase === 'q37intro') {
    let kicker = t('q37OneMore');
    let text = pick(pack.q37.neither, lang);
    if (!privateMomentEnabled) {
      text = t('q37StillWantOne');
    } else if (noneHaveSecretQuestion) {
      kicker = t('q37NoSecretQuestions');
      text = t('q37NoSecretQuestionsText');
    } else if (bothAsked) {
      kicker = t('q37AlreadyAsked');
      text = t('q37StillWantOne');
    } else if (!neither) {
      kicker = t('q37OneRemains');
      text = t('q37OneText');
    }
    const acceptLabel = neither ? finaleButton : t('continue');
    const optionalBonus = bothAsked || noneHaveSecretQuestion || !privateMomentEnabled;
    return (
      <>
        <Body $center><Kicker>{kicker}</Kicker><Question>{text}</Question></Body>
        <Foot>
          <Row>
            <GhostButton onClick={() => onQ37(Q37_EVENTS.ACCEPT_FINALE)}>
              {optionalBonus ? t('yes') : acceptLabel}
            </GhostButton>
            <GhostButton onClick={() => onQ37(Q37_EVENTS.END_OPTIONAL)}>{t('end')}</GhostButton>
          </Row>
        </Foot>
      </>
    );
  }

  if (state.phase === 'q37a' || state.phase === 'q37b') {
    const opener = starterFor(total, state.starterOffset);
    const asker = state.phase === 'q37a' ? opener : 1 - opener;
    return (
      <>
        <Body $center>
          <Kicker>{finaleLabel}</Kicker>
          <Question>{tf('q37AskSecret', nameOf(asker))}</Question>
        </Body>
        <Foot>
          {state.phase === 'q37a' ? (
            <Row>
              <Button $accent={accent} onClick={() => onQ37(Q37_EVENTS.CONTINUE_SECOND_TURN)}>
                {t('continue')}
              </Button>
              <GhostButton onClick={() => onQ37(Q37_EVENTS.END_OPTIONAL)}>{t('end')}</GhostButton>
            </Row>
          ) : (
            <TextButton onClick={() => onQ37(Q37_EVENTS.COMPLETE)}>{t('done')}</TextButton>
          )}
        </Foot>
      </>
    );
  }

  let prompt = pick(pack.q37.both, lang);
  if (privateMomentEnabled && !neither && !bothAsked && !noneHaveSecretQuestion) {
    prompt = pack.q37.one(lang, nameOf(pendingPlayer), nameOf(1 - pendingPlayer));
  }
  return (
    <>
      <Body $center><Kicker>{finaleLabel}</Kicker><Question>{prompt}</Question></Body>
      <Foot>
        <TextButton onClick={() => onQ37(Q37_EVENTS.COMPLETE)}>{t('done')}</TextButton>
      </Foot>
    </>
  );
}
