import React, { useCallback, useEffect, useId, useRef } from 'react';

import { Sheet, SheetPanel } from './CloserStyles';

/*
 * Das gemeinsame semantische Bottom-Sheet fuer CLOSER (Refactoringplan
 * Phase 0 "Fokus-/Dialog-Grundlagen", Code Review CR-P1-08).
 *
 * Vorher war das Menue ein reines <div>-Overlay: kein `role`, kein
 * `aria-modal`, kein Fokusmanagement. Fuer Screenreader existierte der
 * Dialog damit gar nicht als Dialog, und der Tastaturfokus blieb auf dem
 * Inhalt dahinter -- man konnte "hinter" das geoeffnete Menue tabben und
 * dort Aktionen ausloesen, die visuell verdeckt waren.
 *
 * Diese Komponente liefert die vier Grundlagen, die ein modaler Dialog
 * braucht:
 *   1. Semantik: role="dialog" + aria-modal + aria-labelledby auf die
 *      eigene Ueberschrift.
 *   2. Fokus hinein: beim Oeffnen auf das erste fokussierbare Element,
 *      ersatzweise auf das Panel selbst.
 *   3. Fokusfalle: Tab/Shift+Tab zykliert innerhalb des Panels.
 *   4. Fokus zurueck: beim Schliessen zurueck auf das ausloesende Element
 *      (typischerweise der Menue-Button), damit die Tastaturposition nicht
 *      an den Seitenanfang springt.
 * Dazu Escape zum Schliessen -- die erwartete Fluchtmoeglichkeit, und
 * konsistent mit "Beenden ist nie eine knappe Ressource".
 *
 * Der Klick auf den Hintergrund schliesst weiterhin, wie bisher.
 */

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function CloserDialog({ title, onClose, children }) {
  const panelRef = useRef(null);
  // Das Element, das den Dialog geoeffnet hat -- beim Schliessen bekommt es
  // den Fokus zurueck. Wird einmal beim Mount festgehalten, nicht bei jedem
  // Render, sonst zeigt es spaeter auf ein Element im Dialog selbst.
  const returnFocusRef = useRef(null);
  const headingId = useId();

  const focusables = useCallback(
    () => Array.from(panelRef.current?.querySelectorAll(FOCUSABLE) || []),
    []
  );

  useEffect(() => {
    returnFocusRef.current =
      typeof document !== 'undefined' ? document.activeElement : null;
    const first = focusables()[0];
    if (first) first.focus();
    else panelRef.current?.focus();

    return () => {
      const target = returnFocusRef.current;
      // Nur zurueckgeben, wenn das Element noch im Dokument haengt -- nach
      // "Von vorne" oder "Lokale Daten loeschen" ist der ausloesende Button
      // weg, und ein Fokus auf ein entferntes Element wuerde ihn still auf
      // <body> fallen lassen.
      if (target && typeof target.focus === 'function' && document.contains(target)) {
        target.focus();
      }
    };
  }, [focusables]);

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
    // Der Fokus kann auch auf dem Panel selbst liegen (leerer Dialog oder
    // direkt nach dem Oeffnen) -- dann faengt Tab regulaer vorne an.
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
