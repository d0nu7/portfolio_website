import React from 'react';

import { Q37_EVENTS, classifyPrivateQuestions } from '../../closer/engine/transitions';
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
  'privateFinaleIntro',
  'privateFinaleA',
  'privateFinaleB',
  'privateFinaleSkipped',
  'directFinale',
  'ending',
]);

function formatNames(text, replacements) {
  return Object.entries(replacements).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, value),
    String(text || '')
  );
}

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
  moment,
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
    const pendingPrivateCount = (state.privateQuestionState || []).filter(
      (value) => value === 'pending'
    ).length;
    return (
      <>
        <Body $center>
          <Question>{tf('allThirtySix', total)}</Question>
          {revealSecond && privateMomentEnabled && pendingPrivateCount > 0 && (
            <Lede style={{ marginTop: '3.2rem' }}>
              {tf('privateQuestionSummary', pendingPrivateCount)}
            </Lede>
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
      const declinedCopy = state.consentDeclinedAt === 'act2'
        ? pack.consentGate?.act2Declined
        : pack.consentGate?.entryDeclined;
      return (
        <>
          <Body $center>
            <Question>{t('consentDeclinedTitle')}</Question>
            <Lede style={{ marginTop: '2.4rem' }}>
              {declinedCopy ? pick(declinedCopy, lang) : t('consentDeclinedBody')}
            </Lede>
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

  if (state.phase === 'directFinale') {
    return (
      <>
        <Body $center>
          <Kicker>{t('finalQuestionLabel')}</Kicker>
          <Question>{pick(pack.directFinale, lang)}</Question>
        </Body>
        <Foot><TextButton onClick={() => onQ37(Q37_EVENTS.COMPLETE)}>{t('done')}</TextButton></Foot>
      </>
    );
  }

  const roleA = starterFor(0, state.starterOffset === 1 ? 1 : 0);
  const roleB = 1 - roleA;
  const roleNames = { A: nameOf(roleA), B: nameOf(roleB) };

  if (state.phase === 'privateFinaleSkipped') {
    return (
      <>
        <Body $center>
          <Kicker>{t('finalQuestionLabel')}</Kicker>
          <Question>{pick(moment.use.skipped, lang)}</Question>
        </Body>
        <Foot><TextButton onClick={() => onQ37(Q37_EVENTS.COMPLETE)}>{t('done')}</TextButton></Foot>
      </>
    );
  }

  if (state.phase === 'privateFinaleIntro') {
    return (
      <>
        <Body $center>
          <Kicker>{t('privateFinaleTitle')}</Kicker>
          <Question>{formatNames(pick(moment.use.intro, lang), roleNames)}</Question>
        </Body>
        <Foot>
          <Row>
            <GhostButton onClick={() => onQ37(Q37_EVENTS.ACCEPT_FINALE)}>
              {t('startFinale')}
            </GhostButton>
            <GhostButton onClick={() => onQ37(Q37_EVENTS.END_OPTIONAL)}>{t('endHere')}</GhostButton>
          </Row>
        </Foot>
      </>
    );
  }

  if (state.phase === 'privateFinaleA' || state.phase === 'privateFinaleB') {
    const roleIndex = state.phase === 'privateFinaleA' ? 0 : 1;
    const who = roleIndex === 0 ? roleA : roleB;
    const other = 1 - who;
    const prompt = formatNames(pick(moment.use.turns[roleIndex], lang), {
      who: nameOf(who),
      other: nameOf(other),
    });
    return (
      <>
        <Body $center>
          <Kicker>{route.id === 'full' ? t('q37Label') : t('finalQuestionLabel')}</Kicker>
          <Question>{prompt}</Question>
        </Body>
        <Foot>
          {roleIndex === 0 ? (
            <Row>
              <Button $accent={accent} onClick={() => onQ37(Q37_EVENTS.CONTINUE_SECOND_TURN)}>
                {tf('continueTo', nameOf(roleB))}
              </Button>
              <GhostButton onClick={() => onQ37(Q37_EVENTS.END_OPTIONAL)}>{t('endHere')}</GhostButton>
            </Row>
          ) : (
            <TextButton onClick={() => onQ37(Q37_EVENTS.COMPLETE)}>{t('done')}</TextButton>
          )}
        </Foot>
      </>
    );
  }

  const finaleLabel = route.id === 'full' ? t('q37Label') : t('finalQuestionLabel');
  const finaleButton = route.id === 'full' ? t('q37Button') : t('finalQuestionButton');
  const classicFinale = privateMomentEnabled && moment?.use.kind === 'classic-finale';
  const { pendingCount, pendingPlayer } = classifyPrivateQuestions(state.privateQuestionState);

  if (state.phase === 'q37intro') {
    let kicker = t('q37OneMore');
    let text;
    if (!classicFinale) {
      text = t('q37StillWantOne');
    } else if (pendingCount === 2) {
      text = formatNames(pick(moment.use.twoPending, lang), roleNames);
    } else if (pendingCount === 1) {
      kicker = t('q37OneRemains');
      text = formatNames(pick(moment.use.onePending, lang), {
        who: nameOf(pendingPlayer),
        other: nameOf(1 - pendingPlayer),
      });
    } else {
      kicker = t('q37NoSecretQuestions');
      text = pick(moment.use.nonePending, lang);
    }
    return (
      <>
        <Body $center><Kicker>{kicker}</Kicker><Question>{text}</Question></Body>
        <Foot>
          <Row>
            <GhostButton onClick={() => onQ37(Q37_EVENTS.ACCEPT_FINALE)}>
              {classicFinale && pendingCount === 2 ? finaleButton : t('continue')}
            </GhostButton>
            <GhostButton onClick={() => onQ37(Q37_EVENTS.END_OPTIONAL)}>{t('endHere')}</GhostButton>
          </Row>
        </Foot>
      </>
    );
  }

  if (state.phase === 'q37a' || state.phase === 'q37b') {
    const asker = state.phase === 'q37a' ? roleA : roleB;
    const prompt = classicFinale
      ? formatNames(pick(moment.use.turn, lang), {
          who: nameOf(asker),
          other: nameOf(1 - asker),
        })
      : tf('q37AskSecret', nameOf(asker));
    return (
      <>
        <Body $center>
          <Kicker>{finaleLabel}</Kicker>
          <Question>{prompt}</Question>
        </Body>
        <Foot>
          {state.phase === 'q37a' ? (
            <Row>
              <Button $accent={accent} onClick={() => onQ37(Q37_EVENTS.CONTINUE_SECOND_TURN)}>
                {tf('continueTo', nameOf(roleB))}
              </Button>
              <GhostButton onClick={() => onQ37(Q37_EVENTS.END_OPTIONAL)}>{t('endHere')}</GhostButton>
            </Row>
          ) : (
            <TextButton onClick={() => onQ37(Q37_EVENTS.COMPLETE)}>{t('done')}</TextButton>
          )}
        </Foot>
      </>
    );
  }

  let prompt = pick(pack.q37.byRoute?.[route.id] || pack.q37.both, lang);
  if (classicFinale) {
    prompt = pendingCount === 1
      ? formatNames(pick(moment.use.turn, lang), {
          who: nameOf(pendingPlayer),
          other: nameOf(1 - pendingPlayer),
        })
      : pick(moment.use.bonus, lang);
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
