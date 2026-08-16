import React from 'react';

import {
  DEFAULT_ROUTE_ID,
  PACKS,
  pick,
  routeSubtitleFor,
} from '../../constants/closer';
import CloserChoiceList from './CloserChoiceList';
import {
  Body,
  Button,
  Field,
  Foot,
  Kicker,
  Small,
  TextButton,
  Toggle,
} from './CloserStyles';

export default function CloserSetupView({
  state,
  pack,
  route,
  lang,
  accent,
  preferences,
  t,
  onPatch,
  onContinue,
  onBack,
  onToggleTimer,
}) {
  if (state.phase === 'players') {
    return (
      <>
        <Body $center>
          <Kicker $accent={accent}>{t('whosPlaying')}</Kicker>
          <Field $accent={accent}>
            <span>{t('yourName')}</span>
            <input
              value={state.players[0]}
              maxLength={18}
              autoComplete="off"
              onChange={(event) => onPatch({
                players: [event.target.value, state.players[1]],
              })}
            />
          </Field>
          <Field $accent={accent}>
            <span>{t('theirName')}</span>
            <input
              value={state.players[1]}
              maxLength={18}
              autoComplete="off"
              onChange={(event) => onPatch({
                players: [state.players[0], event.target.value],
              })}
            />
          </Field>
        </Body>
        <Foot>
          <Button
            $accent={accent}
            onClick={() => onContinue({ starterOffset: Math.random() < 0.5 ? 0 : 1 })}
          >
            {t('continue')}
          </Button>
          <TextButton onClick={onBack}>{t('goBack')}</TextButton>
          <Small style={{ textAlign: 'center' }}>{t('namesOptional')}</Small>
        </Foot>
      </>
    );
  }

  if (state.phase === 'pack') {
    const items = Object.values(PACKS)
      .filter((candidate) =>
        candidate.discoverability !== 'menu-unlock' || preferences.lateNightVisible)
      .map((candidate) => ({
        id: candidate.id,
        selected: state.packId === candidate.id,
        title: pick(candidate.title, lang),
        meta: pick(candidate.meta, lang),
        blurb: pick(candidate.blurb, lang),
        onSelect: () => onPatch({
          packId: candidate.id,
          routeId: candidate.defaultRouteId || DEFAULT_ROUTE_ID,
          modeId: candidate.modes[0].id,
        }),
      }));

    return (
      <>
        <Body $center>
          <Kicker $accent={accent}>{t('pickPack')}</Kicker>
          <CloserChoiceList accent={accent} items={items} />
        </Body>
        <SetupFooter accent={accent} t={t} onContinue={onContinue} onBack={onBack} />
      </>
    );
  }

  if (state.phase === 'duration') {
    const items = Object.values(pack.routes).map((candidate) => ({
      id: candidate.id,
      selected: state.routeId === candidate.id,
      title: pick(candidate.title, lang),
      meta: pick(candidate.meta, lang),
      blurb: pick(routeSubtitleFor(state.packId, candidate.id), lang),
      onSelect: () => onPatch({ routeId: candidate.id }),
    }));

    return (
      <>
        <Body $center>
          <Kicker $accent={accent}>{t('pickDuration')}</Kicker>
          <CloserChoiceList accent={accent} items={items} />
          <Toggle
            $on={state.timerEnabled}
            $accent={accent}
            aria-pressed={state.timerEnabled}
            onClick={onToggleTimer}
          >
            {t('timer')}
            <b>{state.timerEnabled ? t('on') : t('off')}</b>
          </Toggle>
        </Body>
        <SetupFooter accent={accent} t={t} onContinue={onContinue} onBack={onBack} />
      </>
    );
  }

  if (state.phase === 'mode') {
    const items = pack.modes.map((candidate) => ({
      id: candidate.id,
      selected: state.modeId === candidate.id,
      title: pick(candidate.title, lang),
      meta: pick(candidate.meta, lang),
      blurb: pick(candidate.blurb, lang),
      onSelect: () => onPatch({ modeId: candidate.id }),
    }));

    return (
      <>
        <Body $center>
          <Kicker $accent={accent}>{t('pickMode')}</Kicker>
          <Small style={{ textAlign: 'center', marginBottom: '2rem' }}>
            {pick(route.title, lang)} · {pick(routeSubtitleFor(state.packId, route.id), lang)}
          </Small>
          <CloserChoiceList accent={accent} items={items} />
        </Body>
        <SetupFooter accent={accent} t={t} onContinue={onContinue} onBack={onBack} />
      </>
    );
  }

  return null;
}

function SetupFooter({ accent, t, onContinue, onBack }) {
  return (
    <Foot>
      <Button $accent={accent} onClick={() => onContinue()}>
        {t('continue')}
      </Button>
      <TextButton onClick={onBack}>{t('goBack')}</TextButton>
    </Foot>
  );
}
