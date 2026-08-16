import styled, { createGlobalStyle, keyframes, css } from 'styled-components';

/*
 * CLOSER lives outside the portfolio's look: near-black, editorial, mostly
 * type and empty space. It does not use the site Layout, so no header, no
 * footer and no burger menu.
 *
 * Two rules from the spec shape most of what is below. Buttons sit in the
 * lower third so the whole thing works one-handed, and no piece of
 * information is carried by colour alone.
 */

export const CLOSER_BG = '#08090c';
export const CLOSER_FG = [242, 243, 245];

/*
 * Muted text previously used 0.30-0.38 alpha on #08090c, which fell below
 * WCAG AA. This shared value resolves to 4.90:1 and is guarded by the
 * independent contrast test.
 */
export const MUTED_TEXT_ALPHA = 0.5;
export const CHROME_TEXT_ALPHA = 0.5;

export const CloserGlobal = createGlobalStyle`
  html, body {
    background: #08090c;
    color: #f2f3f5;
    overscroll-behavior: none;
  }
  body {
    /* The phone gets passed around; text selection just gets in the way. */
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    user-select: none;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: .001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: .001ms !important;
    }
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
  0%, 100% { opacity: .3; }
  50%      { opacity: .85; }
`;

const riseIn = keyframes`
  from { transform: translateY(100%); }
  to   { transform: none; }
`;

export const Screen = styled.main`
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  /* All four safe-area insets, not just the bottom -- fullscreen (and iOS's
     black-translucent status bar) can put a notch or camera cutout right
     over the top edge, not only the home-indicator gesture area. */
  padding: calc(2.4rem + env(safe-area-inset-top)) calc(2.4rem + env(safe-area-inset-right))
    calc(2.4rem + env(safe-area-inset-bottom)) calc(2.4rem + env(safe-area-inset-left));
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
    transition: opacity 1.4s ease;
  }

  @media ${(props) => props.theme.breakpoints.xs} {
    padding: calc(1.8rem + env(safe-area-inset-top)) calc(1.8rem + env(safe-area-inset-right))
      calc(1.8rem + env(safe-area-inset-bottom)) calc(1.8rem + env(safe-area-inset-left));
  }
`;

/* The celebration visually replaces the current scene for a moment. Keep
   covered controls out of pointer, keyboard, and accessibility interaction;
   the global Menu remains a separate sibling above this layer. */
export const FrameContent = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  pointer-events: ${({ $blocked }) => ($blocked ? 'none' : 'auto')};
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

/* Buttons live down here, within thumb reach. */
export const Foot = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  /* Reserve the menu's real 44px touch target plus breathing room. The
     timer used to occupy almost exactly the same pixels at 390px wide. */
  padding-right: 5.6rem;
  min-height: 2.4rem;
  /* Text must retain its own contrast. Later acts reduce game presence via
     progress treatment and glow, not by fading functional chrome. */
  opacity: 1;
`;

export const Count = styled.span`
  font-size: 1.3rem;
  letter-spacing: 0.18em;
  color: rgba(242, 243, 245, ${CHROME_TEXT_ALPHA});
  font-variant-numeric: tabular-nums;
`;

export const Bar = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  margin-top: 1.6rem;
  opacity: ${({ $chrome }) => ($chrome === undefined ? 1 : $chrome)};
  transition: opacity 1.2s ease;
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
    transition: left 0.9s cubic-bezier(0.22, 1, 0.36, 1);
  }
`;

/* ---------- type ---------- */

export const Kicker = styled.p`
  font-size: 1.2rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: ${({ $accent }) => $accent || 'rgba(242,243,245,.4)'};
  margin: 0 0 2rem;
  white-space: pre-line;
  animation: ${fade} 0.6s ease both;
`;

export const Question = styled.h1`
  font-size: clamp(2.8rem, 7.2vw, 4.4rem);
  line-height: 1.18;
  letter-spacing: -0.025em;
  font-weight: 500;
  margin: 0;
  white-space: pre-line;
  text-wrap: balance;
`;

export const Wordmark = styled.h1`
  font-size: clamp(4.4rem, 15vw, 8rem);
  line-height: 1;
  letter-spacing: 0.02em;
  font-weight: 700;
  margin: 0 0 2.8rem;
`;

export const Lede = styled.p`
  font-size: 1.8rem;
  line-height: 1.65;
  color: rgba(242, 243, 245, 0.55);
  margin: 0;
  max-width: 34ch;
  white-space: pre-line;

  & + & {
    margin-top: 2rem;
  }
`;

export const Small = styled.p`
  font-size: 1.3rem;
  line-height: 1.6;
  color: rgba(242, 243, 245, ${MUTED_TEXT_ALPHA});
  margin: 0;
  white-space: pre-line;
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
  margin: 0 0 2.4rem;
  color: ${({ $accent }) => $accent};
`;

/* ---------- whose turn it is ---------- */

/*
 * This is the second most important thing on a question screen after the
 * question, and it used to read as a caption. It is now a block: a rule down
 * the side, a caret, and the name at display size. The caret and the size
 * jump carry the meaning without relying on the accent colour.
 */
export const TurnBadge = styled.div`
  align-self: flex-start;
  display: flex;
  align-items: baseline;
  gap: 1.1rem;
  max-width: 100%;
  border-left: 3px solid ${({ $accent }) => $accent};
  padding: 0.4rem 0 0.4rem 1.6rem;
  margin-bottom: 3rem;
  animation: ${fadeUp} 0.5s ease both;

  &::before {
    content: '▸';
    color: ${({ $accent }) => $accent};
    font-size: 2rem;
    line-height: 1;
    align-self: center;
  }
`;

export const TurnName = styled.span`
  font-size: clamp(2.2rem, 6.4vw, 3.2rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: ${({ $accent }) => $accent};
  overflow-wrap: anywhere;
`;

export const TurnVerb = styled.span`
  font-size: 1.3rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(242, 243, 245, 0.45);
  white-space: nowrap;
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

/* ---------- twist banner ---------- */

export const TwistLabel = styled.p`
  font-size: 1.3rem;
  letter-spacing: 0.34em;
  color: ${({ $accent }) => $accent};
  margin: 0 0 2.4rem;
`;

/* ---------- response card: optional listening hint ------------------------
 * Quiet by design -- a thin accent-colored left rule, muted body text, no
 * button and no separate screen. It sits with the question, not between
 * two questions, matching the catalog rule that response cards do not count
 * as questions: nothing to tap through, nothing
 * that can be "answered wrong". */
export const ResponseCard = styled.div`
  margin-top: 2.4rem;
  padding-left: 1.6rem;
  border-left: 2px solid ${({ $accent }) => $accent}66;
  max-width: 34ch;
`;

export const ResponseCardLabel = styled.p`
  font-size: 1.1rem;
  letter-spacing: 0.28em;
  color: ${({ $accent }) => $accent};
  margin: 0 0 0.6rem;
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

  /* The neutral focus ring remains visible regardless of pack accent.
     :focus-visible avoids leaving a ring behind after a touch gesture. */
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline: 2px solid rgba(242, 243, 245, 0.85);
    outline-offset: 3px;
  }
`;

/* 60px+ tall, full width: a comfortable one-handed target. */
export const Button = styled.button`
  ${base};
  width: 100%;
  padding: 2rem 2.4rem;
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
  padding: 2rem 2.4rem;
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
  padding: 1.4rem 0;
  color: rgba(242, 243, 245, ${MUTED_TEXT_ALPHA});
  font-size: 1.3rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  align-self: center;

  &:hover:not(:disabled) {
    color: rgba(242, 243, 245, 0.75);
  }
`;

/*
 * Unobtrusive corner trigger for the global menu. It is deliberately outside
 * the flex flow
 * so it never competes with a question's own Foot controls for thumb reach,
 * and stays in the same corner across every phase that shows it. 44px+
 * touch target, safe-area aware like the rest of CLOSER's chrome.
 */
export const MenuTrigger = styled.button`
  ${base};
  position: absolute;
  z-index: 30;
  top: calc(1.6rem + env(safe-area-inset-top));
  right: calc(1.6rem + env(safe-area-inset-right));
  min-width: 4.4rem;
  min-height: 4.4rem;
  padding: 0;
  border: none;
  background: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: rgba(242, 243, 245, ${MUTED_TEXT_ALPHA});
  font-size: 1.05rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;

  &:hover {
    color: rgba(242, 243, 245, 0.7);
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 1rem;

  > * {
    flex: 1;
  }
`;

export const Field = styled.label`
  display: block;

  & + & {
    margin-top: 2.8rem;
  }

  span {
    display: block;
    font-size: 1.1rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    /* Uses the same AA-safe muted value as other secondary copy. */
    color: rgba(242, 243, 245, ${MUTED_TEXT_ALPHA});
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

    /* Selection is marked with a glyph as well as a border colour. */
    &::after {
      content: ${({ $on }) => ($on ? "' ✓'" : "''")};
      color: ${({ $accent }) => $accent};
    }
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
  padding: 1.6rem 2rem;
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
  /* The global menu shares the top edge on setup screens. */
  margin-right: 5.6rem;
  display: inline-flex;
  border: 1px solid rgba(242, 243, 245, 0.14);
  border-radius: 999px;
  padding: 3px;

  button {
    ${base};
    box-sizing: border-box;
    border: none;
    background: ${({ $accent }) => $accent};
    color: #08090c;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    /* 44x44 minimum touch target (WCAG 2.5.5) -- was ~50x30. */
    min-width: 4.4rem;
    min-height: 4.4rem;
    padding: 0.8rem 1.6rem;
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

/* ---------- overlays ---------- */

export const Sheet = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: rgba(8, 9, 12, 0.82);
  animation: ${fade} 0.25s ease both;
`;

export const SheetPanel = styled.div`
  background: #12141b;
  border-top: 1px solid rgba(242, 243, 245, 0.1);
  border-radius: 24px 24px 0 0;
  padding: 3.2rem 2.4rem calc(2.4rem + env(safe-area-inset-bottom));
  max-width: 640px;
  max-height: min(88vh, 88dvh);
  overflow-y: auto;
  width: 100%;
  margin: 0 auto;
  animation: ${riseIn} 0.32s cubic-bezier(0.22, 1, 0.36, 1) both;

  h2 {
    font-size: 2.4rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    margin: 0 0 1rem;
  }
`;

export const Stay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 5;
  background: #08090c;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.8rem;
  padding: 3.2rem;
  text-align: center;
  animation: ${fade} 0.9s ease both;
`;

/* Same takeover, but it is only on screen for a moment, so it arrives fast. */
export const Flash = styled(Stay)`
  gap: 2rem;
  animation-duration: 0.22s;
`;

export const StayDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $accent }) => $accent};
  animation: ${pulse} 3.6s ease-in-out infinite;
`;

/*
 * $long switches from the compact clock ("3:45", wide tracking, one line)
 * to the overtime message ("The next act is ready whenever you are."),
 * which needs to wrap onto a couple of lines with normal tracking instead
 * of running off the edge of the TopBar.
 */
export const Elapsed = styled.p`
  font-size: 1.2rem;
  letter-spacing: ${({ $long }) => ($long ? '0.02em' : '0.2em')};
  color: rgba(242, 243, 245, ${CHROME_TEXT_ALPHA});
  margin: 0;
  font-variant-numeric: tabular-nums;
  text-align: right;
  max-width: ${({ $long }) => ($long ? '16ch' : 'none')};
  line-height: 1.4;
`;

/* Screen-reader-only: visually hidden but still reachable by assistive
   tech, used for the countdown's start/zero announcements. */
export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

/* ---------- install hint ---------- */

/*
 * Quiet and skippable by design -- this is a suggestion, not a gate. It only
 * ever appears ahead of a game (see CloserInstallHint), never once one is
 * running, and never in the installed PWA itself.
 */
export const InstallCard = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 2rem;
  padding: 1.8rem 2rem;
  border: 1px solid rgba(242, 243, 245, 0.12);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  animation: ${fade} 0.6s ease both;

  p {
    margin: 0;
  }

  /* At 320x568 with the card visible, the start screen ran a little taller
     than the viewport (touch targets below make that slightly worse) --
     trim the card's own spacing on short viewports rather than let the
     page scroll. */
  @media (max-height: 620px) {
    margin-top: 1.2rem;
    padding: 1.2rem 1.6rem;
  }
`;

export const InstallKicker = styled.p`
  font-size: 1.05rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(242, 243, 245, 0.4);
  margin: 0 0 0.8rem;
`;

export const InstallBody = styled.p`
  font-size: 1.35rem;
  line-height: 1.5;
  color: rgba(242, 243, 245, 0.62);
  white-space: pre-line;
  margin: 0;
`;

export const InstallRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  margin-top: 1.4rem;
`;

/*
 * Both of these read as plain small text links, but the tap target is the
 * whole 44px box -- negative margins cancel the extra padding out visually
 * so the row's spacing doesn't change, only the hit area grows.
 */
export const InstallButton = styled.button`
  ${base};
  box-sizing: border-box;
  border: none;
  background: none;
  display: inline-flex;
  align-items: center;
  min-height: 4.4rem;
  padding: 1rem 0.6rem;
  margin: -1rem -0.6rem;
  color: ${({ $accent }) => $accent};
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

export const InstallDismiss = styled.button`
  ${base};
  box-sizing: border-box;
  border: none;
  background: none;
  display: inline-flex;
  align-items: center;
  min-height: 4.4rem;
  padding: 1rem 0.6rem;
  margin: -1rem -0.6rem;
  color: rgba(242, 243, 245, ${MUTED_TEXT_ALPHA});
  font-size: 1.3rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  &:hover {
    color: rgba(242, 243, 245, 0.6);
  }
`;
