import React from 'react';

import { actIndexAt } from '../../closer/engine/transitions';
import { pick } from '../../constants/closer';
import {
  ActNumeral,
  ActTitle,
  Body,
  Button,
  Foot,
  Lede,
  Small,
  TextButton,
} from './CloserStyles';

export const ACT_VIEW_PHASES = new Set(['intro', 'act', 'break']);

export function actViewStyle(state, run, pack) {
  if (state.phase === 'intro') {
    return { accent: pack.actStyle[0].accent, glow: 0.24 };
  }
  const actIndex = state.phase === 'act'
    ? actIndexAt(run, state.pending)
    : state.breakAct;
  const style = pack.actStyle[actIndex];
  return {
    accent: style.accent,
    glow: state.phase === 'act' ? style.glow + 0.1 : style.glow,
  };
}

export default function CloserActView({
  state,
  run,
  pack,
  acts,
  lang,
  t,
  onBegin,
  onBack,
  onStartAct,
  onContinueFromBreak,
}) {
  if (state.phase === 'intro') {
    const accent = pack.actStyle[0].accent;
    return (
      <>
        <Body $center>
          <Lede>{pick(pack.positioning || pack.blurb, lang)}</Lede>
          <Lede style={{ marginTop: '3.2rem' }}>{t('introLines')}</Lede>
          <Lede style={{ marginTop: '3.2rem' }}>{t('introPass')}</Lede>
        </Body>
        <Foot>
          <Button $accent={accent} onClick={onBegin}>{t('begin')}</Button>
          {!pack.consentGate && (
            <TextButton onClick={onBack}>{t('goBack')}</TextButton>
          )}
          <Small style={{ textAlign: 'center' }}>{t('privacy')}</Small>
        </Foot>
      </>
    );
  }

  if (state.phase === 'act') {
    const index = actIndexAt(run, state.pending);
    const act = acts[index];
    const style = pack.actStyle[index];
    return (
      <>
        <Body $center>
          <ActNumeral>{pick(act.numeral, lang)}</ActNumeral>
          <ActTitle $accent={style.accent}>{pick(act.title, lang)}</ActTitle>
          <Lede>{pick(act.intro, lang)}</Lede>
        </Body>
        <Foot>
          <Button $accent={style.accent} onClick={onStartAct}>{t('continue')}</Button>
        </Foot>
      </>
    );
  }

  const act = acts[state.breakAct];
  const style = pack.actStyle[state.breakAct];
  return (
    <>
      <Body $center>
        <ActNumeral>{pick(act.numeral, lang)} {t('complete')}</ActNumeral>
        <ActTitle
          $accent={style.accent}
          style={{ fontSize: '3.2rem', marginBottom: '3.2rem' }}
        >
          {pick(act.title, lang)}
        </ActTitle>
        <Lede>{pick(act.breakText, lang)}</Lede>
        {act.breakSub && (
          <Lede style={{ marginTop: '2rem' }}>{pick(act.breakSub, lang)}</Lede>
        )}
      </Body>
      <Foot>
        <Button $accent={style.accent} onClick={onContinueFromBreak}>{t('continue')}</Button>
      </Foot>
    </>
  );
}
