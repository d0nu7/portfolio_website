import React from 'react';

import { LANGS } from '../../constants/closer';
import CloserInstallHint from './CloserInstallHint';
import {
  Body,
  Button,
  Foot,
  LangSwitch,
  Lede,
  Question,
  Small,
  TextButton,
  Wordmark,
} from './CloserStyles';

export default function CloserStartView({
  mounted,
  resumable,
  confirmReset,
  lang,
  accent,
  t,
  onLanguage,
  onResume,
  onStart,
  onRestart,
  onCancelReset,
}) {
  if (confirmReset) {
    return (
      <>
        <Body $center>
          <Question>{t('startOverConfirm')}</Question>
          <Lede style={{ marginTop: '2.4rem' }}>{t('startOverWarn')}</Lede>
        </Body>
        <Foot>
          <Button $accent={accent} onClick={onRestart}>
            {t('startOver')}
          </Button>
          <TextButton onClick={onCancelReset}>{t('goBack')}</TextButton>
        </Foot>
      </>
    );
  }

  return (
    <>
      <LangSwitch $accent={accent}>
        {LANGS.map((candidate) => (
          <button
            key={candidate}
            type="button"
            aria-pressed={lang === candidate}
            onClick={() => onLanguage(candidate)}
          >
            {candidate}
          </button>
        ))}
      </LangSwitch>
      <Body $center>
        <Wordmark>CLOSER</Wordmark>
        <Lede>{t('tagline')}</Lede>
      </Body>
      <Foot>
        {mounted && resumable ? (
          <>
            <Small style={{ textAlign: 'center' }}>{t('welcomeBack')}</Small>
            <Button $accent={accent} onClick={onResume}>
              {t('continueGame')}
            </Button>
            <TextButton onClick={onRestart}>{t('startOver')}</TextButton>
          </>
        ) : (
          <>
            <Button $accent={accent} onClick={onStart}>
              {t('start')}
            </Button>
            <Small style={{ textAlign: 'center' }}>{t('aboutMinutes')}</Small>
          </>
        )}
      </Foot>
      <CloserInstallHint lang={lang} accent={accent} />
    </>
  );
}
