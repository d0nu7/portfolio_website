import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useLanguage } from '../../i18n/LanguageContext';
import { preferredLanguage } from '../../i18n/languagePreference';

// Written in the language being offered, since that is the one the visitor reads.
const COPY = {
  de: { text: 'Diese Seite gibt es auch auf Deutsch.', go: 'Auf Deutsch lesen', close: 'Hinweis schließen', label: 'Sprache' },
  en: { text: 'This page is also available in English.', go: 'Read in English', close: 'Dismiss', label: 'Language' },
};

const Bar = styled.aside`
  position: fixed;
  z-index: 60;
  right: 16px;
  bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: min(420px, calc(100% - 32px));
  padding: 12px 12px 12px 16px;
  border: 1px solid rgba(255, 255, 255, .16);
  border-radius: 14px;
  background: var(--c-surface-2);
  box-shadow: 0 12px 32px rgba(0, 0, 0, .35);
  color: var(--c-text);
  font-size: 15px;
  line-height: 1.4;

  p { margin: 0; flex: 1; }

  a {
    flex-shrink: 0;
    padding: 8px 12px;
    border-radius: 999px;
    background: var(--c-accent);
    color: var(--c-on-accent);
    font-weight: 700;
    text-decoration: none;
    white-space: nowrap;
  }

  button {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: inherit;
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
  }

  button:hover { background: rgba(255, 255, 255, .08); }
  a:focus-visible, button:focus-visible { outline: 2px solid var(--c-text-strong); outline-offset: 2px; }

  @media (prefers-reduced-motion: no-preference) {
    animation: hint-in .3s ease-out;
    @keyframes hint-in { from { opacity: 0; transform: translateY(8px); } }
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    left: 16px;
    right: 16px;
    max-width: none;
    font-size: 14px;
  }
`;

/*
 * Offers the other language version when the visitor's saved choice or
 * browser language differs from the page. Never redirects: the URL someone
 * opened is the page they get. Following or dismissing the hint remembers
 * the choice, so it shows at most once per mismatch.
 */
const LanguageHint = () => {
  const { lang, alternate, remember } = useLanguage();
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    const want = preferredLanguage();
    setOffer(want && want !== lang && alternate(want) ? want : null);
  }, [lang, alternate]);

  if (!offer) return null;
  const c = COPY[offer];

  return (
    <Bar lang={offer} aria-label={c.label}>
      <p>{c.text}</p>
      <a href={alternate(offer)} hrefLang={offer} onClick={() => remember(offer)}>{c.go}</a>
      <button type="button" aria-label={c.close} onClick={() => { remember(lang); setOffer(null); }}>×</button>
    </Bar>
  );
};

export default LanguageHint;
