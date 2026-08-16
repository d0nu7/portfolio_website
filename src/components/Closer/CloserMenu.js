import React from 'react';

import CloserDialog from './CloserDialog';
import CloserLegal from './CloserLegal';
import {
  Button,
  GhostButton,
  MenuTrigger,
  Small,
  TextButton,
  Toggle,
} from './CloserStyles';

export default function CloserMenu({
  open,
  step,
  title,
  state,
  preferences,
  lang,
  accent,
  t,
  onOpen,
  onClose,
  onSetStep,
  onToggleTimer,
  onFinish,
  onRestart,
  onDeleteLocalData,
  onSetLateNightVisible,
}) {
  return (
    <>
      <MenuTrigger
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={onOpen}
      >
        {t('menuOpen')}
      </MenuTrigger>
      {open && (
        <CloserDialog title={title} viewKey={step ?? 'root'} onClose={onClose}>
          <>
            {step === null && (
              <>
                {state.phase !== 'start' && (
                  <Toggle
                    $on={state.timerEnabled}
                    $accent={accent}
                    aria-pressed={state.timerEnabled}
                    onClick={onToggleTimer}
                  >
                    {t('timer')}
                    <b>{state.timerEnabled ? t('on') : t('off')}</b>
                  </Toggle>
                )}
                {state.phase !== 'start' && (
                  <div style={{ marginTop: '2rem' }}>
                    <GhostButton onClick={() => onSetStep('restart')}>
                      {t('menuRestart')}
                    </GhostButton>
                  </div>
                )}
                {state.hasStarted && (
                  <div style={{ marginTop: '1.2rem' }}>
                    <GhostButton onClick={() => onSetStep('end')}>{t('menuEnd')}</GhostButton>
                  </div>
                )}
                <div style={{ marginTop: '1.2rem' }}>
                  <GhostButton onClick={() => onSetStep('additional')}>
                    {t('menuAdditionalContent')}
                  </GhostButton>
                </div>
                <div style={{ marginTop: '1.2rem' }}>
                  <GhostButton onClick={() => onSetStep('privacy')}>
                    {t('menuPrivacy')}
                  </GhostButton>
                </div>
                <div style={{ marginTop: '1.2rem' }}>
                  <GhostButton onClick={() => onSetStep('imprint')}>
                    {t('menuImprint')}
                  </GhostButton>
                </div>
                <TextButton
                  style={{ width: '100%', marginTop: '1.6rem' }}
                  onClick={() => onSetStep('delete')}
                >
                  {t('deleteLocalData')}
                </TextButton>
                <TextButton style={{ width: '100%' }} onClick={onClose}>
                  {t('menuClose')}
                </TextButton>
              </>
            )}
            {step === 'end' && (
              <>
                <Small style={{ marginBottom: '2.4rem' }}>{t('menuEndSub')}</Small>
                <Button $accent={accent} onClick={onFinish}>
                  {t('menuEnd')}
                </Button>
                <TextButton style={{ width: '100%' }} onClick={() => onSetStep(null)}>
                  {t('goBack')}
                </TextButton>
              </>
            )}
            {step === 'restart' && (
              <>
                <Small style={{ marginBottom: '2.4rem' }}>{t('startOverWarn')}</Small>
                <Button $accent={accent} onClick={onRestart}>
                  {t('startOver')}
                </Button>
                <TextButton style={{ width: '100%' }} onClick={() => onSetStep(null)}>
                  {t('goBack')}
                </TextButton>
              </>
            )}
            {step === 'delete' && (
              <>
                <Small style={{ marginBottom: '2.4rem' }}>{t('deleteLocalDataSub')}</Small>
                <Button $accent={accent} onClick={onDeleteLocalData}>
                  {t('deleteLocalData')}
                </Button>
                <TextButton style={{ width: '100%' }} onClick={() => onSetStep(null)}>
                  {t('goBack')}
                </TextButton>
              </>
            )}
            {step === 'additional' && (
              <>
                <Small style={{ marginBottom: '1.4rem' }}>{t('lateNightMenuIntro')}</Small>
                <Small style={{ marginBottom: '2.4rem' }}>
                  {preferences.lateNightVisible ? t('lateNightShown') : t('lateNightHidden')}
                </Small>
                <GhostButton onClick={() => onSetLateNightVisible(!preferences.lateNightVisible)}>
                  {preferences.lateNightVisible ? t('lateNightHide') : t('lateNightShow')}
                </GhostButton>
                <TextButton style={{ width: '100%' }} onClick={() => onSetStep(null)}>
                  {t('goBack')}
                </TextButton>
              </>
            )}
            {(step === 'imprint' || step === 'privacy') && (
              <>
                <CloserLegal view={step} lang={lang} accent={accent} />
                <TextButton
                  style={{ width: '100%', marginTop: '1.6rem' }}
                  onClick={() => onSetStep(null)}
                >
                  {t('goBack')}
                </TextButton>
              </>
            )}
          </>
        </CloserDialog>
      )}
    </>
  );
}
