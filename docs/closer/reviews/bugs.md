# CLOSER – bug tracker

**Updated:** 16 August 2026
**Rule:** This file tracks reproducible defects only. Product additions belong in [feature-requests.md](feature-requests.md); structural work belongs in the [refactoring roadmap](../engineering/refactoring-roadmap.md).

Status values:

- **Closed:** fixed and covered by an appropriate regression check.
- **Verification pending:** a fix exists in the active worktree but the complete verification gate has not yet passed.
- **Open:** reproducible and not fully fixed.
- **Device verification:** automated coverage exists or the desktop result is acceptable, but a supported physical-device check remains required.

The closed items in this iteration passed lint, unit/catalog tests, a production static build, and the complete local Chromium E2E suite. Physical Android/iOS and deployed-response checks remain grouped under BUG-010 or the relevant feature request.

## P0 – release blockers closed in the local build

### BUG-001 – Late Night can inherit a generic private-question finale

**Status:** Closed
**Affected:** Late Night Standard/Full

Late Night must not create secret sexual or physical tasks and must not inherit the universal saved-question handoff merely because the route is not Quick.

Acceptance:

- Late Night never enters the generic saved-question capture or reveal phases.
- Quick, Standard, and Full all reach a pack-appropriate finale.
- Consent and Pass remain available; no answer is framed as permission to act.
- E2E coverage reaches every Late Night finale branch that still exists.

### BUG-002 – Consent decline is not neutral and actions are visually unequal

**Status:** Closed
**Affected:** Late Night entry gate and renewed Act II opt-in

The affirmative action used a stronger button than the decline action, and decline entered generic completion copy implying that the game had naturally succeeded.

Acceptance:

- Agree and decline actions have equal prominence, size, and focus treatment.
- A decline ends with truthful neutral copy, does not trigger a completion reward, and leaves no resumable run.
- Each person makes an independent decision at both required gates.

## P1 – high-priority defects closed in the local build

### BUG-003 – Timer overlaps the Menu button on a mobile viewport

**Status:** Closed
**Reproduced at:** 390 × 844 CSS pixels

The timer occupied approximately x=337–372 while Menu occupied x=330–374, leaving both controls in almost the same area. The removed heart mechanic is no longer present; the reproducible collision is the timer/menu layout.

Acceptance:

- Header controls have non-intersecting bounding boxes at 320, 360, 390, and 430 px.
- Long DE/EN labels, safe-area insets, timer on/off, and installed-PWA display modes do not reintroduce the overlap.
- Both controls retain a minimum comfortable touch target.

### BUG-004 – Milestone animation appears as a tiny, brief cherry-like flash

**Status:** Closed

The previous implementation used a roughly 220 × 176 SVG with small dots, nested opacity fades, and a total duration of about 800 ms. Most visible energy disappeared in the first few hundred milliseconds, so the effect did not read as a reward. It also briefly intercepted pointer events.

Acceptance:

- The scene is visually intentional at 320–430 px and remains legible on desktop.
- Normal motion lasts long enough to show arrival, connection, and release.
- The overlay never intercepts taps and never hides the menu as an actionable control.
- Reduced motion presents a stable large state rather than a near-zero-duration flash.
- Tests assert visible size, duration, pointer behavior, and reduced-motion behavior, not only DOM presence.

### BUG-005 – Dialog focus is lost when switching menu subviews

**Status:** Closed

The dialog remains mounted while its content changes, so a one-time mount focus effect can leave focus on a removed button or on the document body.

Acceptance:

- Opening Menu moves focus into the dialog.
- Every submenu transition moves focus to the new heading or first action.
- Tab remains trapped within the current view.
- Escape/Close restores focus to the opener.

### BUG-006 – STAY creates a temporary interaction trap

**Status:** Closed

During STAY, Menu and Continue are both unavailable for approximately six seconds. A person who needs to pass, end, or leave cannot act immediately.

Menu and a quiet Continue action are now available immediately without removing the intended pause.

Acceptance:

- Pass/end/navigation remains available from the start of STAY.
- The screen still encourages a pause without using forced inactivity.
- Keyboard and screen-reader users are not trapped.

### BUG-011 – Covered controls and background timelines remain active during a celebration

**Status:** Closed

The opaque celebration previously allowed taps to reach visually hidden question controls. It also allowed active conversation time and the automatic ending sequence to continue behind the animation.

Acceptance:

- The covered scene is inert to pointer, keyboard, and accessibility interaction.
- The separate global Menu remains usable.
- Active conversation time pauses for the celebration.
- Ending beats do not advance until the finale celebration has cleared.
- Focus returns to the revealed question or primary action afterward unless a dialog is open.

### BUG-012 – Pass is missing during twist lead-ins and countdowns

**Status:** Closed

The ordinary Pass action was unavailable until a twist finished, contradicting the unconditional safety contract.

Acceptance:

- Pass is available on every twist lead-in.
- Pass remains available while a countdown is running.
- Passing cancels countdown timers and announcements before advancing exactly one question.

### BUG-013 – The ordinary ending has no global Menu

**Status:** Closed

The final sequence omitted the global Menu, making Privacy and Imprint inaccessible until a new game was started.

Acceptance: Menu and all legal views remain reachable on every ordinary and consent-decline ending screen.

### BUG-014 – Question count and elapsed time fall below text contrast requirements

**Status:** Closed

The status text used insufficient alpha and was faded a second time by the act-level TopBar opacity.

Acceptance:

- Count and elapsed-time text reach at least 4.5:1 against the CLOSER background.
- Functional TopBar text is not dimmed by a parent opacity.
- An independent contrast calculation guards the source values.

## P2 – correctness and resilience

### BUG-007 – Run fingerprint omits a behavior-defining selection

**Status:** Closed

The fingerprint included content revision, pack, route, and question order but not the selected style/mode identity. A resumed run could therefore appear compatible after a behavior-relevant style change.

`runFingerprintFor()` now takes a `modeId` and folds it into the hashed payload; an omitted or unrecognised value resolves to the pack's first style, matching `compileRun()`'s own resolution so the two never disagree. Both the write site (`CloserGame.js`, act-start snapshot) and the resume check pass the already-canonicalized `modeId`. Covered by direct fingerprint tests (`closer.test.js`) asserting two styles of the same pack/route produce different fingerprints, and that an omitted/invalid style resolves identically to the pack's first style.

### BUG-008 – Persisted-state validation is not genuinely phase-discriminated

**Status:** Closed (scoped)

Validation checked broad shape and several invariants, but accepted combinations that were impossible for a particular phase.

`parseSaved()` is now explicitly staged, matching the recommended fix: (1) versioned envelope — shape, `stateVersion`, setup/completed/no-progress gates, `contentVersion`; (2) the immutable run reference — fingerprint/legacy-ID-list content drift, index bounds; (3) phase-specific required/forbidden fields, via two named phase-family checks derived directly from `goTo()`/`nextCheckPhase()`'s own transition conditions:

- `secretPass1`..`secretPassBack` and `checkPass1`..`checkPassBack` require the canonicalized pack/route to actually have a private moment enabled (`routeId !== 'quick' && pack.privateMoment !== 'none'`) — these phases are only ever entered once that precondition already holds.
- `consentAct2PassA`/`consentAct2A`/`consentAct2PassB`/`consentAct2B` require `breakAct === 0` — they are only ever entered from the `break` screen while `breakAct` still holds Act I's value; nothing changes it before they render.

Deliberately scoped rather than exhaustive: several other candidate invariants (an `act`-phase `pending` matching an act-start boundary, `hasSecretQuestion[i]` values for the `checkPass*`/`check*` phases) were traced from the transition code but dropped after checking them against `e2e/*.spec.js` fixtures — they either conflicted with an intentionally minimal, currently-correct test fixture (a legacy-migration test that relies on `hasRealProgress()`'s deliberately lenient `pending > 0` heuristic for pre-`hasStarted` saves), or would not actually have prevented a broken screen, only a data inconsistency invisible to the player. A stricter but unverified rule risks rejecting a legitimate resume, which is worse than the gap it closes. The two checks that shipped were each confirmed against the real fixtures and proven to reject exactly the intended case (and only that case) with direct unit tests.

Extending this further (a fuller per-phase schema, or the `act`/`break`/`hasSecretQuestion` invariants considered above) is real remaining work, not implied to be finished by this closure.

### BUG-009 – Active timer segment may be lost after abrupt termination

**Status:** Closed

Background transitions were handled, but an abrupt process kill could still lose the current uncommitted active segment: it was folded into persisted `actElapsedMs` only when the segment ended.

The running segment is now checkpointed into `actElapsedMs` every `ACTIVE_SEGMENT_CHECKPOINT_MS` (5 s) while it runs, and immediately on `pagehide` (which can fire closer to an actual termination than `visibilitychange` guarantees on every platform). `beforeunload` is deliberately not used, since it is unreliable on mobile and disables the back/forward cache. The checkpoint and the end-of-segment flush share one idempotent function, so nothing is double-counted regardless of which fires first. No separate reconciliation step was needed: each checkpoint writes the already-merged value directly, so there is no pending state left to reconcile on resume. Hidden/background time still never counts, since the segment only exists while `timerRunning` (visible, in a question, no dialog or celebration) is true.

Covered by a new E2E test that reads `localStorage` directly without ever pausing the game, so a nonzero `actElapsedMs` can only come from the periodic checkpoint, not the pre-existing end-of-segment flush; verified against the pre-fix code, where it fails.

## Device verification

### BUG-010 – Installed-PWA and assistive-technology behavior is not fully verified

**Status:** Device verification

Outstanding checks:

- Android installed PWA with gesture navigation and three-button navigation;
- iOS Add to Home Screen and safe-area behavior;
- VoiceOver and TalkBack reading order, focus, and touch comfort;
- animation performance and reduced motion on a mid-range Android device;
- WebKit critical paths and console guard.

Operating-system navigation controls and the iOS home indicator cannot be hidden reliably by an ordinary PWA. The app must accommodate them rather than treat their visibility as a defect.

## Closed regressions retained for reference

The following earlier defects are closed and should stay covered:

- a first visit incorrectly offered Resume;
- Classic curated routes drifted from the catalog;
- style selection displayed the wrong scope;
- route break copy was not route-aware;
- heart-based Skip competed with an unlimited free decline;
- non-Classic packs displayed Classic intro copy;
- Quick inherited the long saved-question/Question 37 sequence;
- saved-question ownership was reversed at the finale;
- restart could retain an incompatible style;
- hidden/background time was counted;
- content revision did not invalidate incompatible saves;
- a natural-completion reward appeared after an early end.
