import React from 'react';

import { PACKS, pick } from '../../constants/closer';
import CloserDialog from './CloserDialog';
import CloserLegal from './CloserLegal';
import {
  Button,
  Disclosure,
  DisclosureBody,
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
  onSetPackVisible,
}) {
  const packs = Object.values(PACKS);
  const ordinaryPacks = packs.filter((pack) => pack.contentGroup !== 'adult');
  const adultPacks = packs
    .filter((pack) => pack.contentGroup === 'adult')
    .sort((a, b) => Number(a.id === 'late-night') - Number(b.id === 'late-night'));

  const renderPackToggle = (pack) => {
    const visible = preferences.visiblePackIds.includes(pack.id);
    const lastVisible = visible && preferences.visiblePackIds.length === 1;
    return (
      <React.Fragment key={pack.id}>
        {pack.discoveryNoticeKey ? (
          <Small style={{ marginTop: '0.8rem', marginBottom: '0.8rem' }}>
            {t(pack.discoveryNoticeKey)}
          </Small>
        ) : null}
        <Toggle
          $on={visible}
          $accent={accent}
          aria-pressed={visible}
          aria-label={pack.id === 'late-night'
            ? (visible ? t('lateNightHide') : t('lateNightShow'))
            : undefined}
          disabled={lastVisible}
          onClick={() => onSetPackVisible(pack.id, !visible)}
          style={{ marginTop: '0.8rem', marginBottom: '0.8rem' }}
        >
          <span>
            {pick(pack.title, lang)}
            <small style={{ display: 'block', marginTop: '0.2rem' }}>
              {pick(pack.meta, lang)}
            </small>
          </span>
          <b>{visible ? t('on') : t('off')}</b>
        </Toggle>
        {pack.id === 'late-night' ? (
          <Small style={{ marginTop: '-0.35rem', marginBottom: '0.8rem' }}>
            {visible ? t('lateNightShown') : t('lateNightHidden')}
          </Small>
        ) : null}
      </React.Fragment>
    );
  };

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
                <Small style={{ marginBottom: '1.4rem' }}>{t('packLibraryIntro')}</Small>
                {ordinaryPacks.map(renderPackToggle)}
                {adultPacks.length ? (
                  <Disclosure $accent={accent}>
                    <summary>{t('adultContentGroup')}</summary>
                    <DisclosureBody>{adultPacks.map(renderPackToggle)}</DisclosureBody>
                  </Disclosure>
                ) : null}
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
