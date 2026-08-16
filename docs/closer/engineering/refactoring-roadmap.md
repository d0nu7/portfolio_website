# CLOSER – refactoring roadmap

**Updated:** 16 August 2026
**Basis:** independent code review, the consolidated Claude refactoring analysis, product review, and current regression findings
**Goal:** improve correctness and maintainability incrementally without a high-risk rewrite or unrelated product changes

This is the only active refactoring roadmap. Dated iteration reports were removed after their durable findings were folded into this document and the living review trackers.

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
  CloserGame.js                # browser effects, orchestration, and rendering
src/constants/closer.js        # compatibility exports, resolution, and compileRun()
```

The remaining architectural problem is not bundle size. It is that `CloserGame.js` still owns a large number of phase-specific render branches and performs transitions through direct state updates. This makes consent, handoffs, resume, and finale behavior harder to reason about as a system.

### Target run definition

After pack, route, and style resolution, compile one immutable definition:

```js
{
  packId,
  routeId,
  styleId,
  questions: [{ id, actIndex, sourceIndex, content }],
  actStarts: [0, 4, 8],
  timing: { totalMinutes, actMinutes },
  privateMoment: null,
  contentRevision,
  fingerprint
}
```

`compileRun()` is now wired into the controller and save parser as the single
runtime source for run structure. The first pure transition slice resolves
question destinations from that definition. Continue one characterized phase
family at a time; do not combine the remaining controller migration into one
large patch.

## 3. Work phases

### Phase 0 – release correctness

Status: substantially complete; regressions remain tracked in [bugs.md](../reviews/bugs.md).

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

Status: partially complete. This is the largest remaining engineering task.

**Execution freeze (16 August 2026):** routes, content, private moments,
finales, consent, Pass, setup navigation, animation, legal copy, PWA behavior,
and infrastructure are frozen while FR-011 is in progress. Only
behavior-preserving engine extraction, its tests, and directly related
documentation are in scope.

1. [x] Make `compileRun()` the runtime source for question order, act boundaries, timing, private-moment placement, and fingerprinting.
2. [ ] Define explicit events such as `START_RUN`, `ANSWER_DONE`, `PASS`, `END_ACT`, `CONFIRM_CONSENT`, `END_RUN`, and `RESUME`. The frozen event inventory now lives in the [transition matrix](transition-matrix.md); event migration remains incremental.
3. [ ] Move allowed transitions into a pure reducer or equivalent pure transition function. Setup/entry, consent, act-entry/break, private-moment capture/resolution, final-question reveal, Question 37, end-run reasons, and compiled question destinations are migrated and characterized in `src/closer/engine/transitions.js`. Canonical state creation and save parsing are extracted to `src/closer/engine/persistence.js`, and guarded browser storage lives in `src/closer/infrastructure/storage.js`; resume orchestration and preference events remain in the controller.
4. [ ] Keep rendering declarative: phase selectors decide which screen is shown; screen components emit events.
5. [x] Replace the broad persisted-state parser with genuinely phase-discriminated schemas and invariants (BUG-008 — scoped to two verified phase-family checks; see bugs.md for what was deliberately left out and why).
6. [x] Persist the active timer segment on lifecycle boundaries so an abrupt process kill loses as little time as possible (BUG-009).
7. [x] Keep non-run preferences in a separately versioned preference record.
8. [x] Pause active time while the page is hidden and request Wake Lock again after visibility returns.

Do this in small, behavior-preserving slices. Consent and private handoffs need dedicated tests before each transition is moved.

Acceptance:

- A transition matrix covers every phase and event.
- Invalid phase/data combinations are rejected before rendering.
- Resume reconstructs the same immutable run or rejects the save safely.
- Restart always produces the canonical state for the selected pack.

### Phase 4 – UI and accessibility

Status: core primitives exist; visual and device verification remains open.

- [x] Use a shared semantic dialog/bottom sheet with focus trap, Escape handling, and focus return.
- [x] Extract repeated handoff and choice-list presentation.
- [x] Raise known text and accent combinations to at least WCAG AA contrast.
- [x] Add `:focus-visible` treatment and basic accessibility smoke tests.
- [x] Fail E2E tests on unexpected console errors and page errors.
- [x] Verify focus is moved into each dialog subview, not only on initial mount.
- [x] Reserve permanent layout space for Menu and timer controls at 320–430 px.
- [x] Verify the milestone celebration is large, legible, non-blocking, and meaningfully reduced under `prefers-reduced-motion`.
- [x] Preserve AA text contrast for question count and elapsed time without compound parent opacity.
- [ ] Run VoiceOver, TalkBack, WebKit/iOS, and real installed-PWA checks.

### Phase 5 – refined game mechanics

Status: editorial and implementation work open.

- [ ] Curate replacement questions by pack, act, and intensity before adding a replacement-question joker.
- [ ] Replace the universal saved question with optional pack- and route-specific private moments.
- [ ] Keep Quick free of multi-screen private rituals.
- [ ] Let CHAOS use at most a short secret spark.
- [ ] Give Late Night only readiness/consent checks; do not generate secret sexual or physical tasks.
- [ ] Calibrate all route estimates through moderated sessions.

See [gameplay and safety](../product/gameplay-and-safety.md) for the product contract and [feature requests](../reviews/feature-requests.md) for acceptance criteria.

### Phase 6 – privacy, PWA, and deployment

Status: partially complete; legal text requires owner review.

- [x] Keep imprint and privacy information directly reachable within the CLOSER menu in both languages.
- [ ] Verify the legal copy against the final operator details and obtain professional review where appropriate.
- [x] Verify the new deployment-level security headers against the deployed static export (FR-003, `curl -I https://radi.solutions/closer/` confirms all six headers are actually served, not only configured).
- [ ] Decide whether offline operation justifies a service worker and document the update/cache strategy before adding one.
- [ ] Complete real Android and iOS installed-PWA checks.
- [ ] Evaluate `closer.radi.solutions` as a separate Vercel project only after the app behavior stabilizes.

Moving origins does not migrate `localStorage` saves or an installed PWA identity. A subdomain move therefore needs transition copy and an intentional redirect from `/closer/`.

### Phase 7 – TTS

Status: shelved indefinitely by product decision on 16 August 2026.

- The existing voice branch is not planned for merge.
- FR-011 must not preserve speculative TTS requirements beyond existing stable
  content IDs and backward-compatible public exports.
- Do not generate, migrate, review, or clean up voice artifacts as part of the
  active roadmap.
- Resume TTS work only after a new explicit product decision creates a separate
  scope, privacy review, and delivery plan.

## 4. Test strategy

Required pipeline:

1. `npm ci`
2. `npm run lint`
3. `npm test -- --runInBand`
4. exact catalog and schema fidelity
5. `npm run build`
6. Chromium critical paths at 320, 390, and 430 px
7. WebKit critical paths
8. fail on unexpected `pageerror` and `console.error`
9. keyboard, focus, reduced-motion, and contrast checks
10. real Android and iOS installed-PWA smoke tests before a public release

Do not run E2E tests against an old `out/` directory. `npm run test:e2e` already creates a fresh build; `npm run test:e2e:run` is only appropriate after a verified current export.

## 5. Cleanup rules

- Remove only demonstrably unused files, exports, comments, and duplicate documentation.
- Do not modify or merge voice artifacts. TTS is outside the active product scope.
- Do not rewrite published Git history merely to translate old commit messages.
- New documentation, source comments, test descriptions, and commit messages are English. Localized product copy and the bilingual question catalog remain German/English by design.
- Keep one living document per purpose. Git history preserves superseded iteration reports.
- End each phase with a full relevant test run and `git diff --check`.

## 6. Related documents

- [CLOSER documentation index](../README.md)
- [Current holistic review](../reviews/current-review.md)
- [Bug tracker](../reviews/bugs.md)
- [Feature requests](../reviews/feature-requests.md)
- [Gameplay and safety contract](../product/gameplay-and-safety.md)
- [Bilingual question catalog](../content/question-catalog.de-en.md)
- [Question-design research](../content/question-design-research.md)
- [Transition matrix](transition-matrix.md)
