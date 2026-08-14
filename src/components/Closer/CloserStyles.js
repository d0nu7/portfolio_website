import styled, { createGlobalStyle, keyframes, css } from 'styled-components';

/*
 * CLOSER lives outside the portfolio's look: near-black, editorial, mostly
 * type and empty space. It does not use the site Layout, so no header, no
 * footer and no burger menu.
 */

export const CloserGlobal = createGlobalStyle`
  html, body {
    background: #08090c;
    color: #f2f3f5;
    overscroll-behavior: none;
  }
  body {
    /* The phone is passed around; text selection just gets in the way. */
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    user-select: none;
  }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: none; }
`;

const fade = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const pulse = keyframes`
  0%, 100% { opacity: .35; }
  50%      { opacity: .9; }
`;

export const Screen = styled.main`
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  padding: 2.4rem 2.4rem calc(2.4rem + env(safe-area-inset-bottom));
  max-width: 640px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;

  /* A single soft light, dimmed act by act. */
  &::before {
    content: '';
    position: fixed;
    top: -30vh;
    left: 50%;
    width: 120vw;
    height: 80vh;
    transform: translateX(-50%);
    pointer-events: none;
    background: radial-gradient(
      closest-side,
      ${({ $accent }) => $accent || '#13ADC7'} 0%,
      transparent 100%
    );
    opacity: ${({ $glow }) => ($glow === undefined ? 0.2 : $glow)};
    filter: blur(40px);
    transition: opacity 1.2s ease;
  }

  @media ${(props) => props.theme.breakpoints.xs} {
    padding: 1.8rem 1.8rem calc(1.8rem + env(safe-area-inset-bottom));
  }
`;

export const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: ${({ $center }) => ($center ? 'center' : 'flex-start')};
  position: relative;
  z-index: 1;
  animation: ${fadeUp} 0.55s ease both;
`;

export const Foot = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding-top: 2.4rem;
`;

/* ---------- chrome ---------- */

export const TopBar = styled.header`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  min-height: 2.4rem;
  opacity: ${({ $chrome }) => ($chrome === undefined ? 1 : $chrome)};
  transition: opacity 1s ease;
`;

export const Count = styled.span`
  font-size: 1.3rem;
  letter-spacing: 0.18em;
  color: rgba(242, 243, 245, 0.45);
  font-variant-numeric: tabular-nums;
`;

export const Tokens = styled.span`
  font-size: 1.4rem;
  letter-spacing: 0.3em;
  color: ${({ $accent }) => $accent};
  opacity: 0.8;

  span {
    opacity: 0.18;
  }
`;

/*
 * The only progress CLOSER shows. It moves with the questions, never with the
 * answers -- there is deliberately nothing here that could read as a score.
 */
export const Bar = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-top: 1.6rem;
  font-size: 0.95rem;
  letter-spacing: 0.22em;
  color: rgba(242, 243, 245, 0.3);
  opacity: ${({ $chrome }) => ($chrome === undefined ? 1 : $chrome)};
  transition: opacity 1s ease;
`;

export const Track = styled.div`
  flex: 1;
  height: 1px;
  background: rgba(242, 243, 245, 0.14);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: ${({ $pct }) => $pct}%;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${({ $accent }) => $accent};
    transform: translate(-50%, -50%);
    transition: left 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  }
`;

export const Hairline = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 1.6rem;
  height: 1px;
  background: linear-gradient(
    to right,
    rgba(242, 243, 245, 0.22) ${({ $pct }) => $pct}%,
    rgba(242, 243, 245, 0.05) ${({ $pct }) => $pct}%
  );
  transition: background 0.8s ease;
`;

/* ---------- type ---------- */

export const Kicker = styled.p`
  font-size: 1.2rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: ${({ $accent }) => $accent || 'rgba(242,243,245,.4)'};
  margin-bottom: 2rem;
  animation: ${fade} 0.6s ease both;
`;

export const Question = styled.h1`
  font-size: clamp(2.8rem, 7.4vw, 4.6rem);
  line-height: 1.16;
  letter-spacing: -0.025em;
  font-weight: 500;
  margin: 0;
  text-wrap: balance;
`;

export const Wordmark = styled.h1`
  font-size: clamp(4.4rem, 15vw, 8rem);
  line-height: 1;
  letter-spacing: 0.02em;
  font-weight: 700;
  margin: 0 0 2.4rem;
`;

export const Lede = styled.p`
  font-size: 1.8rem;
  line-height: 1.6;
  color: rgba(242, 243, 245, 0.55);
  margin: 0;
  max-width: 34ch;

  & + & {
    margin-top: 1.6rem;
  }
`;

export const Small = styled.p`
  font-size: 1.3rem;
  line-height: 1.6;
  color: rgba(242, 243, 245, 0.35);
  margin: 0;
`;

export const ActNumeral = styled.p`
  font-size: 1.3rem;
  letter-spacing: 0.4em;
  color: rgba(242, 243, 245, 0.4);
  margin: 0 0 1.6rem;
`;

export const ActTitle = styled.h1`
  font-size: clamp(4rem, 13vw, 6.4rem);
  line-height: 1;
  letter-spacing: -0.03em;
  font-weight: 600;
  margin: 0 0 2rem;
  color: ${({ $accent }) => $accent};
`;

/* ---------- the twist banner ---------- */

export const Twist = styled.div`
  border-left: 2px solid ${({ $accent }) => $accent};
  padding: 0.2rem 0 0.2rem 1.6rem;
  margin-bottom: 2.8rem;
  animation: ${fadeUp} 0.5s ease both;

  strong {
    display: block;
    font-size: 1.1rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: ${({ $accent }) => $accent};
    margin-bottom: 0.6rem;
  }

  span {
    font-size: 1.6rem;
    line-height: 1.45;
    color: rgba(242, 243, 245, 0.7);
  }
`;

export const Turn = styled.p`
  font-size: 1.6rem;
  color: rgba(242, 243, 245, 0.5);
  margin: 0 0 2.4rem;

  b {
    color: #f2f3f5;
    font-weight: 600;
  }

  em {
    font-style: normal;
    font-weight: 600;
    color: ${({ $accent }) => $accent};
    font-variant-numeric: tabular-nums;
  }
`;

export const CounterQuestion = styled.p`
  font-size: 1.8rem;
  line-height: 1.4;
  text-align: center;
  color: rgba(242, 243, 245, 0.4);
  margin: 3.2rem 0 0;
`;

export const Counter = styled.div`
  font-size: clamp(8rem, 30vw, 14rem);
  line-height: 1;
  font-weight: 600;
  text-align: center;
  color: ${({ $accent }) => $accent};
  font-variant-numeric: tabular-nums;
  animation: ${fade} 0.3s ease both;
`;

/* ---------- controls ---------- */

const base = css`
  -webkit-appearance: none;
  appearance: none;
  font-family: inherit;
  border-radius: 999px;
  cursor: pointer;
  transition: transform 0.18s ease, background 0.25s ease, border-color 0.25s ease,
    opacity 0.25s ease;

  &:active {
    transform: scale(0.98);
  }
  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

export const Button = styled.button`
  ${base};
  width: 100%;
  padding: 1.9rem 2.4rem;
  border: 1px solid transparent;
  background: ${({ $accent }) => $accent};
  color: #08090c;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export const GhostButton = styled.button`
  ${base};
  width: 100%;
  padding: 1.9rem 2.4rem;
  border: 1px solid rgba(242, 243, 245, 0.18);
  background: transparent;
  color: rgba(242, 243, 245, 0.85);
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  &:hover {
    border-color: rgba(242, 243, 245, 0.4);
  }
`;

export const TextButton = styled.button`
  ${base};
  border: none;
  background: none;
  padding: 1.2rem 0;
  color: rgba(242, 243, 245, 0.35);
  font-size: 1.3rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  align-self: center;

  &:hover:not(:disabled) {
    color: rgba(242, 243, 245, 0.7);
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 1.2rem;

  > * {
    flex: 1;
  }
`;

export const Field = styled.label`
  display: block;

  & + & {
    margin-top: 2.4rem;
  }

  span {
    display: block;
    font-size: 1.1rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(242, 243, 245, 0.35);
    margin-bottom: 1rem;
  }

  input {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    background: none;
    border: none;
    border-bottom: 1px solid rgba(242, 243, 245, 0.2);
    border-radius: 0;
    padding: 0.8rem 0;
    color: #f2f3f5;
    font-family: inherit;
    font-size: 2.6rem;
    font-weight: 500;
    -webkit-user-select: text;
    user-select: text;

    &:focus {
      outline: none;
      border-bottom-color: ${({ $accent }) => $accent};
    }
    &::placeholder {
      color: rgba(242, 243, 245, 0.16);
    }
  }
`;

export const Choice = styled.button`
  ${base};
  display: block;
  width: 100%;
  text-align: left;
  border-radius: 18px;
  padding: 2.2rem;
  border: 1px solid
    ${({ $on, $accent }) => ($on ? $accent : 'rgba(242,243,245,.14)')};
  background: ${({ $on }) => ($on ? 'rgba(255,255,255,.05)' : 'transparent')};
  color: inherit;

  & + & {
    margin-top: 1.2rem;
  }

  strong {
    display: block;
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    margin-bottom: 0.4rem;
  }

  em {
    display: block;
    font-style: normal;
    font-size: 1.2rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${({ $accent }) => $accent};
    margin-bottom: 1rem;
  }

  span {
    display: block;
    font-size: 1.5rem;
    line-height: 1.5;
    color: rgba(242, 243, 245, 0.5);
  }
`;

export const Toggle = styled.button`
  ${base};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-radius: 999px;
  margin-top: 2rem;
  padding: 1.4rem 2rem;
  border: 1px solid rgba(242, 243, 245, 0.14);
  background: transparent;
  color: rgba(242, 243, 245, 0.6);
  font-size: 1.4rem;
  letter-spacing: 0.06em;

  b {
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${({ $on, $accent }) => ($on ? $accent : 'rgba(242,243,245,.35)')};
  }
`;

export const LangSwitch = styled.div`
  position: relative;
  z-index: 2;
  align-self: flex-end;
  display: inline-flex;
  border: 1px solid rgba(242, 243, 245, 0.14);
  border-radius: 999px;
  padding: 3px;

  button {
    ${base};
    border: none;
    background: ${({ $accent }) => $accent};
    color: #08090c;
    padding: 0.7rem 1.5rem;
    font-family: inherit;
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;

    &[aria-pressed='false'] {
      background: transparent;
      color: rgba(242, 243, 245, 0.45);
    }
  }
`;

/* ---------- STAY takeover ---------- */

export const Stay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 5;
  background: #08090c;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  padding: 3.2rem;
  text-align: center;
  animation: ${fade} 0.8s ease both;
`;

export const StayDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $accent }) => $accent};
  animation: ${pulse} 3.4s ease-in-out infinite;
`;

export const Elapsed = styled.p`
  font-size: 1.2rem;
  letter-spacing: 0.2em;
  color: rgba(242, 243, 245, 0.28);
  margin: 0;
  font-variant-numeric: tabular-nums;
`;
