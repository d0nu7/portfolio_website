import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

/*
 * CLOSER PULSE (iteration 8 feature requests, FR8-04) -- a quiet milestone
 * ritual at act breaks, the secret-question handoff, and the finale,
 * instead of a score/badge/streak. Two small light points start apart and
 * move closer together as the game progresses; a synchronized pulse marks
 * the secret handoff; a soft halo blooms and fades at the finale.
 *
 * Motion budget per the spec: 600-1000ms per milestone, never more than
 * 1200ms blocking; the "continue" affordance (tap-to-skip, here) is live
 * the entire time, not gated behind a minimum delay -- tapping anywhere
 * dismisses immediately. Only `transform`/`opacity` animate. No sound, no
 * haptic beyond what buzz() already does elsewhere in the game (none is
 * triggered from here). `prefers-reduced-motion: reduce` collapses the
 * whole thing to a single short (150ms) opacity flash.
 */

const STAGE_GEOMETRY = {
  // [leftCx, rightCx] as a percentage of the SVG's width; the two points
  // start apart (spec: "beginnen getrennt") and move closer act over act.
  start: [30, 70],
  actI: [38, 62],
  actII: [45, 55],
  secret: [45, 55],
  finale: [50, 50],
};

const fadeInOut = keyframes`
  0% { opacity: 0; }
  18% { opacity: 1; }
  82% { opacity: 1; }
  100% { opacity: 0; }
`;

const dotDrift = keyframes`
  0% { opacity: 0; transform: scale(0.7); }
  25% { opacity: 1; transform: scale(1); }
  75% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.05); }
`;

const arcReveal = keyframes`
  0% { opacity: 0; }
  35% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; }
`;

const pulseTogether = keyframes`
  0% { opacity: 0.5; transform: scale(0.85); }
  50% { opacity: 1; transform: scale(1.25); }
  100% { opacity: 0; transform: scale(1.5); }
`;

const haloBloom = keyframes`
  0% { opacity: 0; transform: scale(0.4); }
  45% { opacity: 0.9; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.6); }
`;

const reducedFlash = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

// Fixed overlay, but never intercepts layout (position: fixed, no
// document flow impact) and never blocks the screen underneath from
// already having rendered -- purely decorative, on top.
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: ${({ $blocking }) => ($blocking ? 'auto' : 'none')};
  cursor: pointer;
  background: transparent;
  animation: ${fadeInOut} ${({ $ms }) => $ms}ms ease both;
`;

const Svg = styled.svg`
  width: min(60vw, 220px);
  height: auto;
  overflow: visible;
`;

const Dot = styled.circle`
  animation: ${dotDrift} ${({ $ms }) => $ms}ms ease both;
  transform-origin: center;
  transform-box: fill-box;
`;

const Arc = styled.path`
  animation: ${arcReveal} ${({ $ms }) => $ms}ms ease both;
  fill: none;
`;

const PulseRing = styled.circle`
  animation: ${pulseTogether} ${({ $ms }) => $ms}ms ease both;
  transform-origin: center;
  transform-box: fill-box;
`;

const Halo = styled.circle`
  animation: ${haloBloom} ${({ $ms }) => $ms}ms ease both;
  transform-origin: center;
  transform-box: fill-box;
`;

const ReducedFlash = styled.div`
  position: fixed;
  inset: 0;
  z-index: 5;
  pointer-events: auto;
  cursor: pointer;
  background: ${({ $accent }) => $accent};
  animation: ${reducedFlash} 160ms ease both;
`;

// Full motion: ~800ms, comfortably inside the 600-1000ms budget.
const FULL_DURATION_MS = 800;
const REDUCED_DURATION_MS = 160;

// "Weiter spätestens nach 300-400ms bedienbar" -- the underlying screen's
// own controls must be reachable well before the pulse visual finishes
// fading, not just once it's gone entirely.
const TAP_THROUGH_MS = 350;

export default function ClosePulse({ stage, accent, reducedMotion, onDone }) {
  const [visible, setVisible] = useState(true);
  // Blocks tap-to-skip only for this short window; after it, pointer
  // events pass straight through to whatever's underneath while the
  // (purely decorative, non-blocking) fade-out keeps playing on top.
  const [blocking, setBlocking] = useState(true);
  const timeoutRef = useRef(null);
  const blockingTimeoutRef = useRef(null);

  const duration = reducedMotion ? REDUCED_DURATION_MS : FULL_DURATION_MS;

  // Intentionally keyed on `stage` only: a new stage restarts the timer;
  // `onDone`/`duration` changing mid-flight shouldn't.
  useEffect(() => {
    setVisible(true);
    setBlocking(true);
    clearTimeout(timeoutRef.current);
    clearTimeout(blockingTimeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(false), duration);
    blockingTimeoutRef.current = setTimeout(
      () => setBlocking(false),
      reducedMotion ? 0 : TAP_THROUGH_MS
    );
    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(blockingTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  useEffect(() => {
    if (!visible) onDone();
  }, [visible, onDone]);

  if (!visible || !stage) return null;

  const dismiss = () => setVisible(false);

  if (reducedMotion) {
    return (
      <ReducedFlash
        $accent={accent}
        onClick={dismiss}
        role="presentation"
        aria-hidden="true"
        data-testid="close-pulse"
        data-stage={stage}
        data-reduced="true"
      />
    );
  }

  const [leftCx, rightCx] = STAGE_GEOMETRY[stage] || STAGE_GEOMETRY.start;
  const midY = 40;
  const showArc = stage === 'actI' || stage === 'actII';
  const showPulse = stage === 'secret';
  const showHalo = stage === 'finale';

  return (
    <Overlay
      $ms={duration}
      $blocking={blocking}
      onClick={dismiss}
      role="presentation"
      aria-hidden="true"
      data-testid="close-pulse"
      data-stage={stage}
    >
      <Svg viewBox="0 0 100 80">
        {showArc && (
          <Arc
            $ms={duration}
            d={`M ${leftCx} ${midY} Q 50 ${midY - (stage === 'actII' ? 18 : 10)} ${rightCx} ${midY}`}
            stroke={accent}
            strokeWidth={1.4}
            strokeLinecap="round"
          />
        )}
        {showHalo && <Halo $ms={duration} cx={50} cy={midY} r={22} fill={accent} opacity={0.18} />}
        {showPulse && (
          <>
            <PulseRing $ms={duration} cx={leftCx} cy={midY} r={10} fill="none" stroke={accent} strokeWidth={1.2} />
            <PulseRing $ms={duration} cx={rightCx} cy={midY} r={10} fill="none" stroke={accent} strokeWidth={1.2} />
          </>
        )}
        <Dot $ms={duration} cx={leftCx} cy={midY} r={3.2} fill={accent} />
        <Dot $ms={duration} cx={rightCx} cy={midY} r={3.2} fill={accent} />
      </Svg>
    </Overlay>
  );
}
