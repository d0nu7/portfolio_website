import React from 'react';

import { pick } from '../../constants/closer';
import {
  Bar,
  Body,
  Button,
  Count,
  Counter,
  Elapsed,
  Flash,
  Foot,
  GhostButton,
  Lede,
  Question,
  ResponseCard,
  ResponseCardLabel,
  Row,
  Small,
  Stay,
  StayDot,
  TextButton,
  TopBar,
  Track,
  TurnBadge,
  TurnName,
  TurnVerb,
  TwistLabel,
  VisuallyHidden,
} from './CloserStyles';

export function questionFrameOptions({ justDeclined, staying, style }) {
  if (justDeclined) return {};
  if (staying) return { accent: style.accent, glow: 0.02, menu: true };
  return { menu: true };
}

function Turn({ accent, name, verb }) {
  return (
    <TurnBadge $accent={accent}>
      <TurnName $accent={accent}>{name}</TurnName>
      <TurnVerb>{verb}</TurnVerb>
    </TurnBadge>
  );
}

export default function CloserQuestionView({
  state,
  question,
  lang,
  style,
  total,
  starter,
  twist,
  step,
  count,
  announce,
  isLast,
  canStay,
  staying,
  justDeclined,
  overtime,
  elapsedLabel,
  progressPercent,
  privateSupplement,
  flashRef,
  questionHeadingRef,
  nameOf,
  t,
  tf,
  onContinueStay,
  onPass,
  onCountdown,
  onSetStep,
  onAdvance,
  onLeaveQuestion,
  onStay,
}) {
  if (staying) {
    return (
      <Stay>
        <StayDot $accent={style.accent} />
        <Lede style={{ textAlign: 'center' }}>{t('stayTitle')}</Lede>
        <TextButton onClick={onContinueStay}>{t('continue')}</TextButton>
      </Stay>
    );
  }

  if (justDeclined) {
    return (
      <Flash>
        <Question ref={flashRef} tabIndex={-1} style={{ textAlign: 'center', outline: 'none' }}>
          {t('passed')}
        </Question>
      </Flash>
    );
  }

  const questionText = pick(question, lang);
  let badge = (
    <Turn accent={style.accent} name={nameOf(starter)} verb={t('turnFirst')} />
  );
  if (twist === 'both') {
    badge = <Turn accent={style.accent} name={t('turnBoth')} verb={t('turnBothVerb')} />;
  } else if (twist === 'predict') {
    badge = <Turn accent={style.accent} name={nameOf(starter)} verb={t('turnAnswers')} />;
  }

  let inner;
  if (step === 'twist' && twist === 'both') {
    inner = (
      <>
        <Body $center>
          <TwistLabel $accent={style.accent}>{t('bothLabel')}</TwistLabel>
          {badge}
          <Question>{questionText}</Question>
          <Lede style={{ marginTop: '2.4rem' }}>{t('bothText')}</Lede>
        </Body>
        <Foot>
          <Button $accent={style.accent} onClick={() => onCountdown(3)}>
            {t('ready')}
          </Button>
          <TextButton onClick={onPass}>{t('declineToAnswer')}</TextButton>
        </Foot>
      </>
    );
  } else if (step === 'twist') {
    const copy = {
      predict: {
        label: t('predictLabel'),
        text: tf('predictText', nameOf(1 - starter), nameOf(starter)),
      },
      nothinking: { label: t('nothinkingLabel'), text: t('nothinkingText') },
    }[twist];
    inner = (
      <>
        <Body $center>
          <TwistLabel $accent={style.accent}>{copy.label}</TwistLabel>
          <Question>{copy.text}</Question>
        </Body>
        <Foot>
          <Button
            $accent={style.accent}
            onClick={() => {
              if (twist === 'predict') onSetStep('ask');
              else onCountdown(5);
            }}
          >
            {t('ready')}
          </Button>
          <TextButton onClick={onPass}>{t('declineToAnswer')}</TextButton>
        </Foot>
      </>
    );
  } else if (step === 'counting') {
    inner = (
      <>
        <Body $center>
          <TwistLabel $accent={style.accent}>
            {twist === 'both' ? t('bothLabel') : t('nothinkingLabel')}
          </TwistLabel>
          {badge}
          <Question>{questionText}</Question>
          <Counter
            $accent={style.accent}
            style={{ marginTop: '3.2rem' }}
            role="timer"
            aria-atomic="true"
          >
            {count}
          </Counter>
        </Body>
        <Foot>
          <TextButton onClick={onPass}>{t('declineToAnswer')}</TextButton>
        </Foot>
      </>
    );
  } else if (step === 'deeper') {
    inner = (
      <>
        <Body $center>
          <TwistLabel $accent={style.accent}>{t('deeperLabel')}</TwistLabel>
          <Question>{t('deeperText')}</Question>
        </Body>
        <Foot>
          <Button $accent={style.accent} onClick={() => onSetStep('deeperOpen')}>
            {t('deeperAsk')}
          </Button>
          <TextButton onClick={onAdvance}>{t('next')}</TextButton>
        </Foot>
      </>
    );
  } else if (step === 'deeperOpen') {
    inner = (
      <>
        <Body $center>
          <Lede>{t('deeperOpen')}</Lede>
        </Body>
        <Foot>
          <GhostButton onClick={onAdvance}>{t('continue')}</GhostButton>
        </Foot>
      </>
    );
  } else {
    inner = (
      <>
        <Body $center>
          {!isLast && badge}
          <Question ref={questionHeadingRef} tabIndex={-1} style={{ outline: 'none' }}>
            {questionText}
          </Question>
          {privateSupplement ? (
            <Lede style={{ marginTop: '2.4rem' }}>{pick(privateSupplement, lang)}</Lede>
          ) : null}
          {isLast && <Lede style={{ marginTop: '3.2rem' }}>{t('takeYourTime')}</Lede>}
          {question?.responseCard && (
            <ResponseCard $accent={style.accent}>
              <ResponseCardLabel $accent={style.accent}>
                {pick(question.responseCard.label, lang)}
              </ResponseCardLabel>
              <Small>{pick(question.responseCard.text, lang)}</Small>
            </ResponseCard>
          )}
        </Body>
        <Foot>
          {canStay ? (
            <Row>
              <GhostButton onClick={onStay}>{t('stay')}</GhostButton>
              <Button $accent={style.accent} onClick={onLeaveQuestion}>
                {t('next')}
              </Button>
            </Row>
          ) : (
            <Button $accent={style.accent} onClick={onLeaveQuestion}>
              {isLast ? t('done') : t('next')}
            </Button>
          )}
          <TextButton onClick={onPass}>{t('declineToAnswer')}</TextButton>
        </Foot>
      </>
    );
  }

  const progress = style.progress;
  const showChrome = !isLast && step !== 'counting';
  return (
    <>
      {showChrome && (
        <>
          <TopBar $chrome={style.chrome}>
            <Count>
              {progress === 'number'
                ? String(state.qIndex + 1).padStart(2, '0')
                : `${String(state.qIndex + 1).padStart(2, '0')} / ${total}`}
            </Count>
            {state.timerEnabled && state.hasStarted ? (
              <Elapsed $long={overtime}>{overtime ? t('timerOver') : elapsedLabel}</Elapsed>
            ) : null}
          </TopBar>
          {progress === 'full' && (
            <Bar $chrome={style.chrome}>
              <Track $pct={progressPercent} $accent={style.accent} />
            </Bar>
          )}
        </>
      )}
      {inner}
      <VisuallyHidden role="status" aria-live="polite">
        {announce}
      </VisuallyHidden>
    </>
  );
}
