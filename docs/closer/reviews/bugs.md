# CLOSER – bug tracker

**Updated:** 18 August 2026
**Rule:** Only reproducible defects or outstanding verification live here. Closed implementation detail belongs in Git history and regression tests.

## Open verification

### BUG-010 – Physical PWA and assistive-technology coverage

**Status:** Device verification

Automated mobile Chromium, keyboard, focus, reduced-motion, contrast, console, and responsive-layout coverage passes. The remaining checks require supported physical platforms:

- Android installed PWA with gesture navigation;
- Android installed PWA with three-button navigation;
- iOS Add to Home Screen, safe areas, and home indicator;
- one TalkBack and one VoiceOver smoke test;
- milestone performance in normal and reduced-motion settings on a mid-range phone;
- critical WebKit paths and deployed console/assets;
- Menu, Pass, legal views, adult introductions, and ending controls throughout.

Record device, OS, browser/display mode, result, and any new defect. Android system navigation and the iOS home indicator cannot be hidden reliably by an ordinary PWA; the layout must accommodate them.

## Closed defects

| ID | Fixed invariant | Regression check |
|---|---|---|
| BUG-001 | Late Night never inherits generic Private Moment or Question 37 behavior. | All Late Night routes reach their direct finale. |
| BUG-002 | Retired adult consent gates cannot render unequal or misleading outcomes. | Current packs use one shared introduction and ordinary Pass/End. |
| BUG-003 | Timer and Menu do not overlap at 320–430 px. | Mobile bounding-box E2E coverage. |
| BUG-004 | Milestones are full-sized, perceptible, non-blocking, and reduced-motion safe. | Geometry, timing, pointer, and reduced-motion E2E coverage. |
| BUG-005 | Dialog focus survives submenu changes and returns to its opener. | Modal semantics, focus trap, Escape, and restoration tests. |
| BUG-006 | STAY never creates forced inactivity. | Menu and Continue remain immediately available. |
| BUG-007 | Run fingerprints include every behavior-defining pack/route/style choice. | Fingerprint unit and resume tests. |
| BUG-008 | Saves are versioned, run-validated, and checked against characterized phase invariants. | Persistence/parser tests; further tightening requires a concrete invalid state. |
| BUG-009 | Active time is checkpointed and hidden time is excluded. | Timer persistence and lifecycle E2E coverage. |
| BUG-011 | Celebrations make covered controls inert and pause background timelines. | Occlusion, ending, and timer tests. |
| BUG-012 | Pass remains available through twist lead-ins and countdowns. | Countdown/pass E2E coverage. |
| BUG-013 | Menu and legal information remain reachable on the ending. | Ending E2E coverage. |
| BUG-014 | Question count and elapsed-time text meet contrast requirements. | Contrast and mobile rendering tests. |

Also permanently covered: fresh visits do not offer Resume; Classic routes remain catalog-exact; singleton setup screens are skipped; Quick omits long private/finale ceremonies; private ownership is not reversed; restart cannot retain an incompatible style; content revisions invalidate incompatible saves; and early exits never receive a completion reward.

## Filing a new bug

Include environment, exact steps, expected/actual behavior, severity, and the smallest reproducible state. Product ideas go to [feature requests](feature-requests.md); structural proposals go to the [architecture record](../engineering/refactoring-roadmap.md).
