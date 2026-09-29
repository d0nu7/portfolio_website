import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: auto;
`;

// Visible only when focused with the keyboard.
export const SkipLink = styled.a`
  position: absolute;
  left: 16px;
  top: -100px;
  z-index: 2000;
  padding: 10px 16px;
  border-radius: 999px;
  background: var(--c-text-strong);
  color: var(--c-ink);
  font-weight: 700;

  &:focus { top: 12px; }
`;
