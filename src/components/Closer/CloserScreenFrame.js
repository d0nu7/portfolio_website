import React from 'react';

import ClosePulse from './ClosePulse';
import { CloserGlobal, FrameContent, Screen } from './CloserStyles';

export default function CloserScreenFrame({
  children,
  accent,
  glow,
  frameContentRef,
  menuOpen,
  menuOverlay,
  showMenu,
  pulseStage,
  pulseLabel,
  pulseDetail,
  prefersReducedMotion,
  onPulseDone,
}) {
  const contentCovered = Boolean(pulseStage) || menuOpen;

  return (
    <Screen $accent={accent} $glow={glow}>
      <CloserGlobal />
      <FrameContent
        ref={frameContentRef}
        $blocked={contentCovered}
        inert={contentCovered ? '' : undefined}
        aria-hidden={contentCovered ? 'true' : undefined}
        data-testid="closer-frame-content"
      >
        {children}
      </FrameContent>
      {showMenu && menuOverlay}
      {pulseStage && (
        <ClosePulse
          stage={pulseStage}
          accent={accent}
          label={pulseLabel}
          detail={pulseDetail}
          reducedMotion={prefersReducedMotion}
          onDone={onPulseDone}
        />
      )}
    </Screen>
  );
}
