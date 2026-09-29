import React, { useCallback, useEffect, useId, useRef, useState } from 'react';

import { Backdrop, BurgerButton, Close, Panel, PanelLink, PanelList } from './NavStyles';

const LINKS = [
  ['/', 'home'],
  ['/#work', 'work'],
  ['/#now', 'now'],
  ['/#projects', 'projects'],
  ['/#talks', 'talks'],
  ['/#recognition', 'recognition'],
  ['/#about', 'about'],
  ['/#contact', 'contact'],
  ['/ki-schulungen/', 'training'],
];

/*
 * Slide-in site menu. Replaces react-burger-menu, which bundled Snap.svg
 * (~150 KB of JavaScript) for an animation this menu never used.
 *
 * Accessible by construction: a real <button> with aria-expanded, the panel
 * is a labelled <nav>, Escape and the backdrop close it, focus moves into the
 * panel on open and back to the button on close, and the panel is `inert`
 * while hidden so it cannot be tabbed into. Button geometry lives in
 * navMetrics.js (the header reserves matching space).
 */
const Nav = ({ labels }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);
  const wasOpen = useRef(false);
  const panelId = useId();

  const close = useCallback(() => setOpen(false), []);

  // `inert` keeps the hidden panel out of the tab order and the a11y tree.
  // Set imperatively: React 18 / styled-components 5 don't forward it.
  useEffect(() => {
    if (panelRef.current) panelRef.current.inert = !open;
  }, [open]);

  useEffect(() => {
    if (open) {
      panelRef.current?.querySelector('a, button')?.focus();
    } else if (wasOpen.current) {
      buttonRef.current?.focus();
    }
    wasOpen.current = open;
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  return (
    <>
      <BurgerButton
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={labels.menu}
        onClick={() => setOpen((v) => !v)}
      >
        <span /><span /><span />
      </BurgerButton>
      <Backdrop $open={open} onClick={close} aria-hidden="true" />
      <Panel id={panelId} ref={panelRef} $open={open} aria-label={labels.menu}>
        <Close type="button" onClick={close} aria-label={labels.close}>&times;</Close>
        <PanelList>
          {LINKS.map(([href, key]) => (
            <li key={key}>
              <PanelLink href={href} onClick={close} $strong={key === 'home'}>
                {key === 'home' ? 'Radomir Dinic' : labels[key]}
              </PanelLink>
            </li>
          ))}
        </PanelList>
      </Panel>
    </>
  );
};

export default Nav;
