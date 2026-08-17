import React, { useEffect, useId, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

/*
 * A milestone celebration, not a score. The two lights visibly travel
 * towards one another and a thread is drawn between them. Each later stage
 * starts closer together, so the visual progression matches the product idea.
 * The layer never captures input. While it is visible, the covered scene is
 * inert and the separate global Menu remains usable. Reduced motion renders
 * the same full-sized scene as a stable card without movement.
 */

const STAGES = {
  start: { left: 60, right: 260, halo: 54 },
  actI: { left: 84, right: 236, halo: 68 },
  actII: { left: 110, right: 210, halo: 82 },
  finale: { left: 160, right: 160, halo: 112 },
};

const overlayLife = keyframes`
  0% { opacity: 0; }
  10%, 56% { opacity: 1; }
  100% { opacity: 0; }
`;

const sceneArrive = keyframes`
  0% { opacity: 0; transform: translateY(18px) scale(0.9); }
  18%, 52% { opacity: 1; transform: translateY(0) scale(1); }
  100% { opacity: 0; transform: translateY(-4px) scale(1.025); }
`;

const leftTravel = keyframes`
  0% { opacity: 0; transform: translateX(-54px) scale(0.55); }
  20% { opacity: 1; }
  62%, 100% { opacity: 1; transform: translateX(0) scale(1); }
`;

const rightTravel = keyframes`
  0% { opacity: 0; transform: translateX(54px) scale(0.55); }
  20% { opacity: 1; }
  62%, 100% { opacity: 1; transform: translateX(0) scale(1); }
`;

const drawThread = keyframes`
  0%, 18% { opacity: 0; stroke-dashoffset: 360; }
  28% { opacity: 1; }
  72%, 100% { opacity: 1; stroke-dashoffset: 0; }
`;

const bloom = keyframes`
  0%, 22% { opacity: 0; transform: scale(0.35); }
  58% { opacity: 0.42; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.35); }
`;

const burst = keyframes`
  0%, 44% { opacity: 0; transform: translate(0, 0) scale(0.4); }
  58% { opacity: 0.9; }
  100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(1); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20;
  display: grid;
  place-items: center;
  padding: max(7.2rem, calc(4.8rem + env(safe-area-inset-top))) 2rem
    max(4rem, calc(2rem + env(safe-area-inset-bottom)));
  pointer-events: none;
  background:
    radial-gradient(circle at 50% 44%, ${({ $accent }) => `${$accent}24`} 0, transparent 44%),
    rgba(8, 9, 12, 0.9);
  animation: ${overlayLife} ${({ $duration }) => $duration}ms ease both;
`;

const Scene = styled.div`
  width: min(88vw, 38rem);
  text-align: center;
  animation: ${sceneArrive} ${({ $duration }) => $duration}ms cubic-bezier(0.2, 0.8, 0.2, 1)
    both;
`;

const Visual = styled.svg`
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
  filter: drop-shadow(0 0 18px ${({ $accent }) => `${$accent}70`});
`;

const Thread = styled.path`
  fill: none;
  stroke-dasharray: 360;
  animation: ${drawThread} ${({ $duration }) => $duration}ms cubic-bezier(0.22, 1, 0.36, 1)
    both;
`;

const LeftLight = styled.g`
  transform-box: fill-box;
  transform-origin: center;
  animation: ${leftTravel} ${({ $duration }) => $duration}ms cubic-bezier(0.22, 1, 0.36, 1)
    both;
`;

const RightLight = styled.g`
  transform-box: fill-box;
  transform-origin: center;
  animation: ${rightTravel} ${({ $duration }) => $duration}ms cubic-bezier(0.22, 1, 0.36, 1)
    both;
`;

const Halo = styled.circle`
  transform-box: fill-box;
  transform-origin: center;
  animation: ${bloom} ${({ $duration }) => $duration}ms ease-out both;
`;

const Spark = styled.circle`
  transform-box: fill-box;
  transform-origin: center;
  animation: ${burst} ${({ $duration }) => $duration}ms ease-out both;
`;

const Eyebrow = styled.p`
  margin: -1rem 0 0.8rem;
  color: ${({ $accent }) => $accent};
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.32em;
  text-transform: uppercase;
`;

const Milestone = styled.p`
  margin: 0;
  color: #f2f3f5;
  font-size: clamp(2.8rem, 9vw, 4.8rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 0.98;
`;

const Detail = styled.p`
  margin: 1.4rem auto 0;
  max-width: 28rem;
  color: rgba(242, 243, 245, 0.72);
  font-size: 1.35rem;
  line-height: 1.5;
`;

const ReducedOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20;
  display: grid;
  place-items: center;
  padding: max(7.2rem, calc(4.8rem + env(safe-area-inset-top))) 2rem
    max(4rem, calc(2rem + env(safe-area-inset-bottom)));
  pointer-events: none;
  background:
    radial-gradient(circle at 50% 44%, ${({ $accent }) => `${$accent}24`} 0, transparent 44%),
    rgba(8, 9, 12, 0.94);
`;

const ReducedScene = styled.div`
  width: min(88vw, 38rem);
  text-align: center;
`;

const ReducedThread = styled.path`
  fill: none;
  opacity: 0.85;
`;

const SPARKS = [
  [-72, -50],
  [-34, -82],
  [34, -82],
  [72, -50],
  [-78, 34],
  [-38, 74],
  [38, 74],
  [78, 34],
];

function MilestoneScene({ stage, accent, label, detail, duration, reducedMotion }) {
  const geometry = STAGES[stage] || STAGES.start;
  const gradientId = useId().replace(/:/g, '');
  const path = stage === 'finale'
    ? 'M 76 112 C 106 42, 214 42, 244 112 C 214 182, 106 182, 76 112'
    : `M ${geometry.left} 112 C 135 70, 185 154, ${geometry.right} 112`;
  const Wrapper = reducedMotion ? ReducedOverlay : Overlay;
  const SceneWrapper = reducedMotion ? ReducedScene : Scene;

  return (
    <Wrapper
      $accent={accent}
      $duration={duration}
      role="presentation"
      aria-hidden="true"
      data-testid="close-pulse"
      data-stage={stage}
      data-reduced={reducedMotion ? 'true' : 'false'}
      data-duration={duration}
    >
      <SceneWrapper {...(!reducedMotion ? { $duration: duration } : {})}>
        <Visual viewBox="0 0 320 224" $accent={accent} data-testid="milestone-visual">
          <defs>
            <linearGradient id={gradientId} x1="0" x2="1">
              <stop offset="0" stopColor={accent} stopOpacity="0.25" />
              <stop offset="0.5" stopColor="#F2F3F5" />
              <stop offset="1" stopColor={accent} stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {reducedMotion ? (
            <circle cx="160" cy="112" r={geometry.halo} fill={accent} opacity="0.16" />
          ) : (
            <Halo $duration={duration} cx="160" cy="112" r={geometry.halo} fill={accent} />
          )}

          {reducedMotion ? (
            <ReducedThread d={path} stroke={`url(#${gradientId})`} strokeWidth="3" />
          ) : (
            <Thread
              $duration={duration}
              d={path}
              stroke={`url(#${gradientId})`}
              strokeWidth="3"
              strokeLinecap="round"
            />
          )}

          {SPARKS.map(([dx, dy], index) =>
            reducedMotion ? null : (
              <Spark
                key={`${dx}-${dy}`}
                $duration={duration}
                cx="160"
                cy="112"
                r={index % 2 === 0 ? 2.2 : 1.6}
                fill={index % 2 === 0 ? accent : '#F2F3F5'}
                style={{ '--dx': `${dx}px`, '--dy': `${dy}px` }}
              />
            )
          )}

          {reducedMotion ? (
            <>
              <circle cx={geometry.left} cy="112" r="20" fill={accent} opacity="0.2" />
              <circle cx={geometry.left} cy="112" r="10" fill={accent} />
              <circle cx={geometry.right} cy="112" r="20" fill={accent} opacity="0.2" />
              <circle cx={geometry.right} cy="112" r="10" fill={accent} />
            </>
          ) : (
            <>
              <LeftLight $duration={duration} data-testid="milestone-left-light">
                <circle cx={geometry.left} cy="112" r="20" fill={accent} opacity="0.18" />
                <circle cx={geometry.left} cy="112" r="10" fill={accent} />
                <circle cx={geometry.left - 3} cy="109" r="2.4" fill="#F2F3F5" opacity="0.9" />
              </LeftLight>
              <RightLight $duration={duration} data-testid="milestone-right-light">
                <circle cx={geometry.right} cy="112" r="20" fill={accent} opacity="0.18" />
                <circle cx={geometry.right} cy="112" r="10" fill={accent} />
                <circle cx={geometry.right - 3} cy="109" r="2.4" fill="#F2F3F5" opacity="0.9" />
              </RightLight>
            </>
          )}
        </Visual>
        <Eyebrow $accent={accent}>CLOSER</Eyebrow>
        <Milestone>{label}</Milestone>
        {detail ? <Detail>{detail}</Detail> : null}
      </SceneWrapper>
    </Wrapper>
  );
}

// Keep the original compact rhythm. Only the final scene/overlay fade is
// intentionally slower: it begins about twice as early within the unchanged
// duration instead of stretching every movement and hold phase.
const FULL_DURATION_MS = 2100;
const FINALE_DURATION_MS = 2500;
const REDUCED_DURATION_MS = 1200;

export default function ClosePulse({
  stage,
  accent,
  label,
  detail,
  reducedMotion,
  onDone,
}) {
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef(null);
  const duration = reducedMotion
    ? REDUCED_DURATION_MS
    : stage === 'finale'
    ? FINALE_DURATION_MS
    : FULL_DURATION_MS;

  useEffect(() => {
    setVisible(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timeoutRef.current);
  }, [duration, stage]);

  useEffect(() => {
    if (!visible) onDone();
  }, [visible, onDone]);

  if (!visible || !stage) return null;

  return (
    <MilestoneScene
      stage={stage}
      accent={accent}
      label={label}
      detail={detail}
      duration={duration}
      reducedMotion={reducedMotion}
    />
  );
}
