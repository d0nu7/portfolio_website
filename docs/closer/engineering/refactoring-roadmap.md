# CLOSER – refactoring roadmap

**Updated:** 16 August 2026
**Status:** Closed
**Basis:** independent code review, the consolidated Claude refactoring analysis, product review, and current regression findings
**Outcome:** correctness and maintainability improved incrementally without a high-risk rewrite or unrelated product changes

This is the completed FR-011 implementation record. Dated iteration reports were removed after their durable findings were folded into this document and the living review trackers.

## 1. Non-negotiable product decisions

1. **Consent is free.** Either person may pass on any question without a token, penalty, or explanation.
2. **A replacement-question joker is a different mechanic.** Add it only after pack- and act-appropriate replacement questions exist; never present it as the safety exit.
3. **Choice screens require a genuine choice.** Automatically resolve a single option; treat zero options as a configuration error.
4. **Private moments must be pack- and route-specific.** A private handoff is useful only when it reveals asymmetric information or assigns a genuinely private, safe task.
5. **Quick must remain quick.** It should not inherit the long saved-question and Question 37 ceremony.
6. **Timing has one numerical source.** Route estimate, act budget, timer, and overtime must derive from the same data.
7. **Persistence is versioned and invariant-aware.** A save is valid only when its content version, run definition, and phase state agree.
8. **Milestones celebrate shared time, not disclosure.** Animation must never reward intensity, speed, or consent.
9. **Late Night discovery and consent are separate.** A discreet menu preference may reveal the pack; both adults must still consent independently for every session.
10. **TTS is not part of the active product scope.** The existing voice branch is not planned for merge and must not influence FR-011 architecture, tests, or release decisions. Reconsidering TTS requires a new explicit product decision.

## 2. Current architecture

Content is split from the public compatibility facade. `compileRun()` remains in
that facade for stable imports, while pure navigation and persistence logic now
live in dedicated engine modules.

```text
src/closer/
  content/
    shared.js
    packs/
      classic.js
      first-date.js
      date-night.js
      couples.js
      friends.js
      old-friends.js
      deep.js
      chaos.js
      late-night.js
    index.js
  engine/
    transitions.js             # pure phase transitions and named effects
    persistence.js             # initial state, save parsing, migration, validation
  infrastructure/
    storage.js                 # guarded localStorage boundary and key ownership
src/components/Closer/
  CloserGame.js                # browser effects and event orchestration
  CloserStartView.js           # start, resume, and restart-confirmation presentation
  CloserMenu.js                # global menu, preferences, and legal subviews
  CloserSetupView.js           # pure player, pack, route, and style setup views
  CloserConsentView.js         # shared private entry and Act II consent views
  CloserActView.js             # intro, act entry, and act-break presentation
  CloserPrivateMomentView.js   # private capture and post-run check handoffs
  CloserFinaleView.js          # last question, Q37 branches, and ending beats
  CloserQuestionView.js        # question, twist, countdown, pass, and stay presentation
  CloserScreenFrame.js         # shared background, blocking, menu, and celebration layers
src/constants/closer.js        # compatibility exports, resolution, and compileRun()
```

`CloserGame.js` now owns browser lifecycle effects, screen-local timing, and event
orchestration. Persisted navigation is handled by pure transition functions;
phase presentation and the shared screen stack live in focused components.

### Target run definition

After pack, route, and style resolution, compile one immutable definition:

```js
{
  packId,
  routeId,
  modeId,
  hasStyleChoice,
  requiresConsent,
  questions: [{ id, actIndex, sourceIndex, content }],
  actStarts: [0, 4, 8],
  timing: { totalMinutes, actMinutes },
  secretAtIndex,
  privateMoment,
  contentRevision,
  fingerprint
}
```

`compileRun()` is wired into the controller and save parser as the single
runtime source for run structure. Every persisted navigation family is routed
through characterized pure transitions. Screen-local countdown, focus,
animation, visibility, Wake Lock, and timer effects remain intentionally in the
controller.

## 3. Work phases

### Phase 0 – release correctness

Status: complete. Device-only release checks remain tracked in [bugs.md](../reviews/bugs.md).

- [x] Remove heart-based skipping and keep one unconditional pass action.
- [x] Skip singleton style selection.
- [x] Show pack-specific intro copy.
- [x] Route restart through a canonical initial-state factory.
- [x] Compare content version during resume.
- [x] Harden basic save validation.
- [x] Remove the multi-step saved-question sequence from Quick.
- [x] Distinguish natural completion from an early end before showing a reward.
- [x] Add reusable dialog, handoff, and choice-list primitives.
- [x] Verify the repaired menu/timer layout, celebration animation, dialog subview focus, and Late Night consent routes in the local Chromium regression suite.
- [x] Remove the six-second STAY interaction trap and provide an immediately available safe exit.
- [x] Make covered milestone scenes inert and pause their active timer and ending timelines.
- [x] Keep Pass available throughout twist lead-ins and countdowns.
- [x] Keep the global Menu and legal views reachable throughout the ending.

Acceptance: lint, unit tests, static build, and complete Chromium E2E suite pass; each corrected path has a regression test.

### Phase 1 – content identity and fidelity

Status: complete.

- [x] Assign explicit stable IDs to all 324 German/English questions.
- [x] Enforce exact pack, act, ID, route, and wording fidelity against the bilingual catalog.
- [x] Deduplicate response-card objects.
- [x] Model route durations numerically.
- [x] Add a versioned ordered run fingerprint.
- [x] Include every behavior-defining selection, including style/mode identity, in the fingerprint (BUG-007).

Acceptance: any drift between the catalog and source content fails the test suite.

### Phase 2 – content modularization

Status: complete.

- [x] Split packs into one module each.
- [x] Separate shared content and engine helpers.
- [x] Preserve the public compatibility exports during migration.
- [x] Keep Late Night content isolated in its own module.

The modularization exists for reviewability and maintenance, not as a claimed performance optimization.

### Phase 3 – run definition, transitions, and persistence

Status: complete.

**Execution freeze (16 August 2026):** routes, content, private moments,
finales, consent, Pass, setup navigation, animation, legal copy, PWA behavior,
and infrastructure remained frozen throughout FR-011. The refactoring freeze
ended with the verified completion commit; any later product work starts as a
separately approved scope.

1. [x] Make `compileRun()` the runtime source for question order, act boundaries, timing, private-moment placement, and fingerprinting.
2. [x] Define explicit events such as `START_RUN`, `ANSWER_DONE`, `PASS`, `END_ACT`, `CONFIRM_CONSENT`, `END_RUN`, and `RESUME`. The frozen event inventory and implemented families live in the [transition matrix](transition-matrix.md).
3. [x] Move allowed navigation into pure transition functions. Setup/entry, consent, acts, question completion/pass, private moments, final-question reveal, Question 37, end-run, language, timer, and compiled destinations are characterized in `src/closer/engine/transitions.js`. Canonical state creation, restart, resume preparation, and save parsing live in `src/closer/engine/persistence.js`; guarded browser storage lives in `src/closer/infrastructure/storage.js`. Screen-local effects and Late Night discovery preferences intentionally remain in the controller.
4. [x] Keep rendering declarative: phase selectors decide which screen is shown; focused screen components emit callbacks that the controller maps to explicit events. Start/resume, setup, consent, acts, private moments, the complete finale, questions/twists, global menu, and the shared screen shell are extracted.
5. [x] Replace the broad persisted-state parser with genuinely phase-discriminated schemas and invariants (BUG-008 — scoped to two verified phase-family checks; see bugs.md for what was deliberately left out and why).
6. [x] Persist the active timer segment on lifecycle boundaries so an abrupt process kill loses as little time as possible (BUG-009).
7. [x] Keep non-run preferences in a separately versioned preference record.
8. [x] Pause active time while the page is hidden and request Wake Lock again after visibility returns.

The work was delivered in small, behavior-preserving slices. Consent and private handoffs received dedicated tests before their transitions moved.

Acceptance:

- A transition matrix covers every phase and event.
- Structurally invalid saves and characterized impossible phase/run combinations are rejected before rendering.
- Resume reconstructs the same immutable run or rejects the save safely.
- Restart always produces the canonical state for the selected pack.

## 4. Verification record

The final automated gate passed:

1. `npm run lint`
2. 332 unit, schema, transition, persistence, storage, and catalog tests
3. production static export
4. 149 mobile Chromium E2E scenarios
5. console/page-error guard, keyboard, focus, reduced-motion, contrast, and 320–430 px layout coverage

Do not run E2E tests against an old `out/` directory. `npm run test:e2e` already creates a fresh build; `npm run test:e2e:run` is only appropriate after a verified current export.

Physical Android/iOS, VoiceOver, TalkBack, and WebKit checks remain release
validation, not unfinished FR-011 refactoring. They are tracked under BUG-010
and the RaDi owner TODO.

## 5. Follow-up outside FR-011

- Product mechanics and editorial ideas remain in [feature requests](../reviews/feature-requests.md).
- Device, legal, offline-PWA, and subdomain decisions remain in the [RaDi owner TODO](../product/radi-owner-todo.md).
- TTS remains shelved indefinitely and requires a new explicit product decision.
- Renaming persisted `modeId` is a separate save-migration project, not cleanup.

## 6. Maintenance rules

- Remove only demonstrably unused files, exports, comments, and duplicate documentation.
- Do not modify or merge voice artifacts. TTS is outside the active product scope.
- Do not rewrite published Git history merely to translate old commit messages.
- New documentation, source comments, test descriptions, and commit messages are English. Localized product copy and the bilingual question catalog remain German/English by design.
- Keep one living document per purpose. Git history preserves superseded iteration reports.
- End each phase with a full relevant test run and `git diff --check`.

## 7. Related documents

- [CLOSER documentation index](../README.md)
- [Current holistic review](../reviews/current-review.md)
- [Bug tracker](../reviews/bugs.md)
- [Feature requests](../reviews/feature-requests.md)
- [Gameplay and safety contract](../product/gameplay-and-safety.md)
- [Bilingual question catalog](../content/question-catalog.de-en.md)
- [Question-design research](../content/question-design-research.md)
- [Transition matrix](transition-matrix.md)
