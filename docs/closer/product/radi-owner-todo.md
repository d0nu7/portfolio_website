# CLOSER – RaDi owner TODO

**Updated:** 17 August 2026

**Purpose:** Decisions, editorial work, and real-world validation that require RaDi as product owner. Technical implementation details remain in the [feature-request tracker](../reviews/feature-requests.md) and [refactoring roadmap](../engineering/refactoring-roadmap.md).

Checkboxes reflect the repository state: `[x]` is complete or explicitly decided; `[ ]` still requires RaDi, real participants, external review, or a separately commissioned engineering effort.

## Recommended order

1. Continue gradual PLAYFUL testing and complete remaining physical-device checks when useful.
2. Run moderated sessions for the new specialist packs and PLAYFUL rollout.
3. Complete the dedicated Private Moments editorial task.
4. Complete the separate Replacement Question Pool editorial task.
5. Decide whether a separate subdomain is actually wanted.

## Immediate release decisions

### FR-002 – Approve legal text

Current state: bilingual Imprint and Privacy views are implemented. RaDi's supplied operator details were incorporated on 16 August 2026, and the data-handling statements were checked against the current source. The wording is not lawyer-certified.

- [x] Confirm operator name, postal address, phone number, business email, and VAT ID.
- [x] Replace the placeholder contact address with `radomir.dinic@radi.solutions`.
- [x] Publish VAT ID `ATU77589478` and the supplied phone number in the Imprint.
- [x] Keep bank details private because CLOSER takes no payments and the Imprint has no identified need for them.
- [x] Confirm the current Vercel Hobby plan and keep provider-retention wording plan-neutral.
- [x] Verify the current local-storage, answer-storage, cookie, analytics, font-hosting, hosting, transfer, and retention statements against the source.
- [ ] Confirm whether any further business, professional, trade, or regulatory identifiers apply beyond the supplied VAT ID.
- [x] Decide not to commission professional legal advice at the current stage.
- [ ] Revisit legal review before commercialization, material data-processing changes, or if the product risk/profile changes.

Current decision is complete. Reopen only if circumstances, processing, monetization, or product risk materially change.

### Delivered items – physical-device sign-off

- [x] Complete an initial Android phone smoke test; no blocking issue was observed.
- [ ] Open the deployed production build with desktop browser developer tools and confirm there are no CSP violations, console errors, or failed CLOSER assets.
- [ ] Test the installed Android PWA with gesture navigation.
- [ ] Test the installed Android PWA with three-button navigation.
- [ ] Test iOS Add to Home Screen, including safe areas and the home indicator.
- [ ] Check the milestone celebration on a mid-range phone in normal and reduced-motion settings.
- [ ] Complete one TalkBack and one VoiceOver smoke test.
- [ ] Confirm that Menu, Pass, legal views, consent gates, and ending controls remain reachable.

Done when: device, OS version, browser, result, and any defect are recorded for every check.

## Editorial content

### FR-005 – Approve pack-specific private moments

For every pack, decide whether a private handoff genuinely improves the experience. A private screen should contain asymmetric information or a meaningful private intention; otherwise, omit it.

Treat this as a dedicated editorial/product task. Do not combine it with implementation or the Replacement Question Pool task. Its output is an approved private-moment contract that can later be implemented on its own branch.

- [ ] Audit the current saved-question sequence and identify which parts should be retained, replaced, or removed.
- [ ] Decide explicitly for every implemented pack: no private moment, optional private moment, or required consent/readiness handoff.
- [ ] Choose eligible routes and one exact trigger point. Quick should normally have none.
- [ ] Define genuinely asymmetric information or intention for each participating person; mirrored cards are not sufficient.
- [ ] Specify the complete lifecycle: private display, device handoff, decline, storage state, reveal/use point, discard point, finale consequences, early exit, and resume behavior.
- [ ] Write exact gender-neutral German and English copy for every card, handoff, decline, reminder, and finale branch.
- [ ] Ensure no spoken answer or private free text is entered or stored.
- [ ] Review for pressure, manipulation, assumed attraction, covert observation or touch, humiliation, diagnosis, loyalty testing, unwanted disclosure, and relationship obligation.
- [ ] Keep Late Night free of secret sexual/physical tasks and keep Road Trip, Family, and Colleagues at `privateMoment: none` unless a separate safety decision reopens them.
- [ ] Obtain explicit RaDi approval for the editorial matrix before implementation begins.

Editorial worksheet:

| Pack | Keep a private moment? | Eligible routes | Private information or intention | Reveal/use point | Safe decline copy | DE/EN approved |
|---|---|---|---|---|---|---|
| Classic |  |  |  |  |  |  |
| First Date |  |  |  |  |  |  |
| Date Night |  |  |  |  |  |  |
| Couples |  |  |  |  |  |  |
| Friends |  |  |  |  |  |  |
| Old Friends |  |  |  |  |  |  |
| Deep |  |  |  |  |  |  |
| Chaos |  |  |  |  |  |  |
| Late Night | Readiness/consent only |  |  |  |  |  |
| Road Trip | No | None |  |  |  | Yes |
| Family | No | None |  |  |  | Yes |
| Colleagues | No | None |  |  |  | Yes |

Done when: every implemented pack has an explicit decision, every eligible moment has approved DE/EN copy plus a complete state/lifecycle contract, safety exclusions are documented, and implementation can proceed without inventing product behavior.

### FR-006 – Curate replacement-question pools

Treat this as a separate editorial/product task. It may research and specify the mechanic in parallel, but implementation starts only after the core catalog is stable and RaDi approves the pool.

- [ ] Define the user promise: **Another question** offers optional variety; **Pass** remains free, unlimited, immediate, and visually distinct.
- [ ] Decide eligible packs/routes, the number of jokers per run, whether a replacement can itself be replaced, and whether unused jokers have any end-state meaning (recommended: none).
- [ ] Define pool keys and selection constraints by pack, act, intensity, route compatibility, and safety exclusions.
- [ ] Define progress and timing semantics: replacing a prompt keeps the same slot and must not silently extend the advertised route.
- [ ] Define deterministic selection, persisted choice, resume behavior, and exhaustion behavior without render-time randomness.
- [ ] Write complete bilingual replacement banks with stable IDs and paired DE/EN content objects.
- [ ] Provide at least two valid alternatives for every supported replacement context, or explicitly mark that context unsupported.
- [ ] Check exact and semantic duplicates against the master catalog, intensity jumps, unsafe topic substitutions, and mode-specific exclusions.
- [ ] Specify a neutral unavailable state; never charge a token or advance because the pool is empty.
- [ ] Obtain explicit RaDi editorial approval before implementation begins.

Done when: the mechanic contract and complete approved bilingual pools allow deterministic implementation without repeats, route/intensity drift, pressure, missing-language fallbacks, or ambiguity with Pass.

## Real-user validation

### FR-008 – Run moderated sessions

- [ ] Define participant groups for every relevant pack: new dates, established couples, friends, old friends, adults opting into Late Night, varied adult families, travelling pairs in parked/public-transport settings, and voluntarily participating workplace peers.
- [ ] Define a short moderator script and an explicit privacy boundary: do not record spoken answers.
- [ ] Record only operational observations such as route chosen, elapsed time, prompts reached, passes, abandonment point, perceived pacing, and usability issues.
- [ ] Include Quick, Standard, and Full where the pack supports them.
- [ ] Test DE and EN sessions.
- [ ] Separate content feedback from interface defects.
- [ ] Calculate median completion time and a useful spread for each pack/route.
- [ ] Update the question catalog’s duration ranges only after reviewing the evidence.
- [ ] Compare default and PLAYFUL styles for pressure, action fatigue, attention to the phone, and conversation quality.

Suggested minimum before changing a duration estimate: five completed sessions per pack/route, treated as an early pilot rather than a statistically representative study.

Done when: findings are summarized without answer content, duration ranges have an evidence trail, and resulting content or UX changes are filed separately.

## Infrastructure decisions

### FR-009 – Decide on offline support

- [x] Decide **no for now**: an installed game does not currently need to start and complete without a network connection.
- [x] Keep installability/fullscreen presentation as the current PWA goal and do not add a service worker.
- [ ] If yes, approve the precached app shell and content scope.
- [ ] If yes, define cache invalidation using the content revision.
- [ ] If yes, define update notification, stale-version recovery, and offline test devices.

Recommendation: do not add a service worker merely to earn a PWA label. Add it only if offline play is a real user requirement and the update strategy is owned.

Decision complete for the current release. Reopen only if offline play becomes a real user requirement.

### FR-010 – Decide on `closer.radi.solutions`

- [ ] Decide whether deployment isolation is worth a separate Vercel project and origin.
- [ ] Choose the permanent canonical URL.
- [ ] Decide how `/closer/` redirects or explains the move.
- [ ] Accept that existing `localStorage` progress and installed-PWA identity do not migrate automatically across origins.
- [ ] Decide whether a transition period is required for existing users.
- [ ] If approved, provide or confirm DNS and Vercel project access for implementation.

Recommendation: make the move before a larger public launch, or postpone it until after pilot feedback. Avoid changing origin during an active test wave.

Done when: RaDi records **stay** or **move**, the canonical URL, migration behavior, timing, and responsible owner.

## Completed engineering effort

### FR-011 – `compileRun()` and transition core

Delivered on 16 August 2026. Runtime behavior derives from one immutable run
definition; persisted transitions, save parsing, and browser storage have
explicit tested boundaries; phase presentation is split into focused views;
save compatibility is preserved. The full implementation record and automated
verification are in the [refactoring roadmap](../engineering/refactoring-roadmap.md)
and [transition matrix](../engineering/transition-matrix.md).

No RaDi action remains for FR-011. Physical-device checks belong to the release
sign-off list above.

## Explicitly separate work

- **FR-012 / TTS:** shelved indefinitely. The voice branch is not planned for merge and is not a constraint or dependency for FR-011. Reopening it requires a new explicit decision.
- **FR-015 / Students and FH Salzburg:** remains a separate content feature requiring research, bilingual editorial review, an FH naming/endorsement decision, and a local content owner before implementation.
- **FR-017 / Adult library:** the collapsed 18+ disclosure is implemented. Every future adult pack still needs its own visibility, eligibility, participation, safety, and release decision.
- **FR-018 / POWER & TRUST:** commission and approve a dedicated evidence review before questions or implementation. Confirm or replace the working title after editorial review.
- **FR-019 / SLOW BURN:** commission and approve a dedicated evidence review and physical-interaction design. This is intentionally touch-forward, but each increase in intensity still needs an immediate bilateral choice.
- **FR-020 / Cross-pack evidence audit:** schedule after the focused adult reviews; Classic wording remains immutable.
- **Pack/route/style terminology:** defer the persisted `modeId` rename to a separately approved save migration; FR-011 deliberately preserves it.

## Decision log

| Date | FR | Decision | Rationale | Follow-up owner |
|---|---|---|---|---|
| 2026-08-16 | FR-002 | Publish supplied phone number and VAT ID; use `radomir.dinic@radi.solutions` | Real operator details and existing identifiers belong in the Imprint | Complete |
| 2026-08-16 | FR-002 | Do not publish IBAN/BIC | No payment flow or identified Imprint requirement justifies the additional public disclosure | Complete |
| 2026-08-16 | FR-011 | Freeze all product behavior and authorize incremental run-definition and transition-core work | A stable target and characterization coverage reduce the risk of changing fragile phase paths during the refactor | Engineering |
| 2026-08-16 | FR-012 | Shelve TTS indefinitely; do not merge the existing voice branch | TTS is not currently planned and must not complicate the active engine refactor | Reopen only by explicit RaDi decision |
| 2026-08-16 | FR-011 | Complete the incremental transition, persistence, storage, and view extraction without product changes | The characterized slices pass the automated release gate and preserve save compatibility | Complete |
| 2026-08-17 | FR-002 | Do not commission professional legal advice at the current stage | Revisit after material changes to risk, processing, monetization, or operator circumstances | RaDi |
| 2026-08-17 | Device check | Accept the initial Android phone smoke test | The first real-device check found no blocking issue; deeper platform/accessibility coverage can follow incrementally | RaDi |
| 2026-08-17 | FR-009 | Do not add offline support or a service worker for now | Installability and fullscreen presentation are sufficient for the current product need | Complete |
| 2026-08-17 | FR-005/006 | Split Private Moments and Replacement Question Pools into independent tasks | Both require substantial editorial decisions before safe implementation | Editorial tasks |
| 2026-08-17 | FR-017 | Group every adult pack behind one collapsed 18+ disclosure and keep Late Night last | Explicit content stays discreet while its explanation remains adjacent and understandable | Complete for current library |
| 2026-08-17 | FR-018/019 | Research POWER & TRUST and the touch-forward SLOW BURN as separate adult experiences | Their evidence, interaction, and participation requirements differ materially from Late Night | RaDi / editorial research |
