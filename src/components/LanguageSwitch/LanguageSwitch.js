import React from 'react';
import styled from 'styled-components';

import { LANGUAGES, useLanguage } from '../../i18n/LanguageContext';

const Group = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  margin-right: 8px;
  padding: 3px;
  border: 1px solid rgba(255, 255, 255, .14);
  border-radius: 999px;
  background: rgba(255, 255, 255, .04);

  button {
    min-width: 38px;
    min-height: 30px;
    border: 0;
    border-radius: 999px;
    padding: 0 9px;
    color: rgba(255, 255, 255, .6);
    background: transparent;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .04em;
    cursor: pointer;
    transition: color .2s ease, background-color .2s ease;
  }

  button:hover { color: #fff; }

  button[aria-pressed="true"] {
    color: var(--c-ink);
    background: var(--c-text-strong);
  }

  button:focus-visible {
    outline: 2px solid var(--c-accent);
    outline-offset: 2px;
  }

  @media ${(props) => props.theme.breakpoints.xs} {
    margin-right: 4px;
    button { min-width: 32px; padding: 0 6px; font-size: 11px; }
  }
`;

const LanguageSwitch = () => {
  const { lang, setLang } = useLanguage();
  return (
    <Group role="group" aria-label={lang === 'de' ? 'Sprache' : 'Language'}>
      {LANGUAGES.slice().reverse().map((l) => (
        <button key={l} type="button" lang={l} aria-pressed={lang === l} onClick={() => setLang(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </Group>
  );
};

export default LanguageSwitch;
