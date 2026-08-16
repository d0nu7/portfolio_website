import React, { useCallback, useEffect, useId, useRef } from 'react';

import { Sheet, SheetPanel } from './CloserStyles';

/*
 * Shared semantic bottom sheet. It provides dialog semantics, an initial
 * focus target, a focus trap, Escape handling, and focus restoration. The
 * viewKey also moves focus when a confirmation replaces the current dialog
 * contents; otherwise focus would remain on a removed button.
 */

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function CloserDialog({ title, onClose, children, viewKey = 'root' }) {
  const panelRef = useRef(null);
  const returnFocusRef = useRef(null);
  const headingId = useId();

  const focusables = useCallback(
    () => Array.from(panelRef.current?.querySelectorAll(FOCUSABLE) || []),
    []
  );

  useEffect(() => {
    returnFocusRef.current =
      typeof document !== 'undefined' ? document.activeElement : null;
    return () => {
      const target = returnFocusRef.current;
      // Restart and data deletion can remove the opener entirely.
      if (target && typeof target.focus === 'function' && document.contains(target)) {
        target.focus();
      }
    };
  }, []);

  useEffect(() => {
    const first = focusables()[0];
    if (first) first.focus();
    else panelRef.current?.focus();
  }, [focusables, viewKey]);

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== 'Tab') return;
    const items = focusables();
    if (items.length === 0) {
      e.preventDefault();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    // The panel itself can hold focus when a view has no actions.
    if (e.shiftKey && (active === first || active === panelRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <Sheet onClick={onClose}>
      <SheetPanel
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <h2 id={headingId}>{title}</h2>
        {children}
      </SheetPanel>
    </Sheet>
  );
}
