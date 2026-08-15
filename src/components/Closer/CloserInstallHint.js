import React, { useEffect, useState } from 'react';

import { pick } from '../../constants/closer';
import COPY from '../../constants/closerCopy';
import { InstallBody, InstallCard, InstallDismiss, InstallButton, InstallKicker, InstallRow } from './CloserStyles';

const DISMISS_KEY = 'closer:installHintDismissed';

function isStandalone() {
  if (typeof window === 'undefined') return false;
  return (
    // The manifest requests 'fullscreen' (falls back to 'standalone' on
    // browsers that don't support it), so an installed launch can present
    // as either display-mode -- both count as "already installed".
    window.matchMedia?.('(display-mode: fullscreen)').matches ||
    window.matchMedia?.('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  );
}

function isMobile() {
  if (typeof navigator === 'undefined') return false;
  return navigator.maxTouchPoints > 0 || /Mobi|Android/i.test(navigator.userAgent || '');
}

function isIOS() {
  if (typeof navigator === 'undefined') return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent || '') ||
    // Modern iPadOS reports as "Macintosh" in the UA string, so a touch
    // point count Macs don't have is the only reliable signal left.
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

/*
 * A dismissible nudge toward installing CLOSER as a home-screen PWA, shown
 * only ahead of a game (see the one call site on the start screen) and
 * never once installed. Section 4.4/4.5 of the review: recommend install
 * before a game begins, never claim Safari progress carries over, and let
 * it be closed for good.
 */
export default function CloserInstallHint({ lang, accent }) {
  const [dismissed, setDismissed] = useState(true); // default hidden until checked, avoids a flash
  const [standalone, setStandalone] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    try {
      setDismissed(window.localStorage.getItem(DISMISS_KEY) === '1');
    } catch (err) {
      setDismissed(false);
    }
    setStandalone(isStandalone());
    setMobile(isMobile());

    const onPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const dismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(DISMISS_KEY, '1');
    } catch (err) {
      /* fine either way -- it's just a nudge */
    }
  };

  if (standalone || !mobile || dismissed) return null;

  const t = (key) => pick(COPY[key], lang);

  if (installed) {
    return (
      <InstallCard>
        <InstallBody>{t('installHintInstalled')}</InstallBody>
      </InstallCard>
    );
  }

  return (
    <InstallCard>
      <InstallKicker>{t('installHintTitle')}</InstallKicker>
      <InstallBody>{t('installHintBody')}</InstallBody>
      <InstallRow>
        {deferredPrompt ? (
          <InstallButton
            type="button"
            $accent={accent}
            onClick={async () => {
              deferredPrompt.prompt();
              await deferredPrompt.userChoice.catch(() => {});
              setDeferredPrompt(null);
            }}
          >
            {t('installHintInstall')}
          </InstallButton>
        ) : isIOS() ? (
          <InstallBody style={{ fontSize: '1.2rem', color: 'rgba(242,243,245,.4)' }}>
            {t('installHintIOS')}
          </InstallBody>
        ) : (
          // No beforeinstallprompt yet -- Android/Chromium hasn't met its
          // own criteria to fire it (or never will, on Firefox/Samsung
          // Internet/etc.), so there is otherwise no path to install at
          // all. A manual menu instruction beats leaving the button silently
          // absent.
          <InstallBody style={{ fontSize: '1.2rem', color: 'rgba(242,243,245,.4)' }}>
            {t('installHintAndroid')}
          </InstallBody>
        )}
        <InstallDismiss type="button" onClick={dismiss}>
          {t('installHintDismiss')}
        </InstallDismiss>
      </InstallRow>
    </InstallCard>
  );
}
