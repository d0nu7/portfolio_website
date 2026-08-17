# CLOSER – RaDi owner TODO

**Updated:** 17 August 2026

**Purpose:** Decisions, editorial work, and real-world validation that require RaDi as product owner. Technical implementation details remain in the [feature-request tracker](../reviews/feature-requests.md) and [refactoring roadmap](../engineering/refactoring-roadmap.md).

Checkboxes reflect the repository state: `[x]` is complete or explicitly decided; `[ ]` still requires RaDi, real participants, external review, or a separately commissioned engineering effort.

## Recommended order

1. Continue gradual PLAYFUL testing and complete remaining physical-device checks when useful.
2. Run moderated sessions for the new specialist packs and PLAYFUL rollout.
3. Disposition the completed FR-018/019 research gates and commission the named validation work for the implemented 40-entry FR-020 set.
4. Complete the separate Replacement Question Pool editorial task.
5. Validate the implemented Private Moments on physical devices and in moderated sessions.
6. Decide whether a separate subdomain is actually wanted.

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

This remained a dedicated editorial/product task, independent from PLAYFUL and the Replacement Question Pool task. RaDi approved the completed specification on 17 August 2026; implementation followed only after that approval.

- [x] Audit the current saved-question sequence and identify which parts should be retained, replaced, or removed.
- [x] Decide explicitly for every implemented pack: no private moment, optional private moment, or required consent/readiness handoff.
- [x] Choose eligible routes and one exact trigger point. Quick has none; DEEP has no Quick route.
- [x] Define genuinely asymmetric information or intention for each participating person; mirrored cards are not used.
- [x] Specify the complete lifecycle: private display, device handoff, decline, storage state, reveal/use point, discard point, finale consequences, early exit, and resume behavior.
- [x] Write exact gender-neutral German and English copy for every card, handoff, decline, reminder, and finale branch.
- [x] Ensure no spoken answer or private free text is entered or stored.
- [x] Review for pressure, manipulation, assumed attraction, covert observation or touch, humiliation, diagnosis, loyalty testing, unwanted disclosure, and relationship obligation.
- [x] Keep Late Night free of secret sexual/physical tasks and keep Road Trip, Family, and Colleagues at `privateMoment: none` unless a separate safety decision reopens them.
- [x] Obtain explicit RaDi approval for the editorial matrix before implementation begins.

Editorial worksheet:

| Pack | Keep a private moment? | Eligible routes | Private information or intention | Reveal/use point | Safe decline copy | DE/EN approved |
|---|---|---|---|---|---|---|
| Classic | Optional | Full | A: open follow-up; B: unheard perspective | after Q36, dynamic Question 37 | “Heute nicht” / “Not today”; shared skip | Yes |
| First Date | Optional | Standard, Full | A: interest follow-up; B: everyday preference | two-turn finale | “Heute nicht” / “Not today”; shared skip | Yes |
| Date Night | Optional | Standard, Full | A: non-body appreciation; B: possible future-date detail | two-turn finale | “Heute nicht” / “Not today”; shared skip | Yes |
| Couples | Optional | Standard, Full | A: listening intention; B: positive quality | after Act II | “Heute nicht” / “Not today”; shared skip | Yes |
| Friends | Optional | Standard, Full | A: shared memory; B: celebration | two-turn finale | “Heute nicht” / “Not today”; shared skip | Yes |
| Old Friends | Optional | Standard only | A: concrete detail; B: feeling/meaning | immediately after private cards | “Heute nicht” / “Not today”; shared skip | Yes |
| Deep | Optional | Standard, Full | A: reflect understanding; B: allow silence/space | after Act II | “Heute nicht” / “Not today”; shared skip | Yes |
| Chaos | Optional | Standard, Full | A: problem constraint; B: naming constraint | supplement Q16, then discard | “Heute nicht” / “Not today”; shared skip | Yes |
| Late Night | Required readiness/consent only | Quick, Standard, Full | two independent decisions; no secret task | entry and after Act I; collective result only | “Nein, heute nicht” / “No, not today” | Yes |
| Road Trip | No | None | None | None | Not applicable | Yes |
| Family | No | None | None | None | Not applicable | Yes |
| Colleagues | No | None | None | None | Not applicable | Yes |

Done: every implemented pack has an explicit decision, every eligible moment has approved DE/EN copy plus a complete state/lifecycle contract, safety exclusions are documented, and implementation did not invent product behavior. Physical-device and moderated-session validation remains separate release work.

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
- **FR-018 / POWER, BY CHOICE:** RaDi approved the name and experimental conversation-only implementation on 17 August 2026. Commission the named kink/sexual-health, trauma, accessibility, bilingual, privacy, Austrian/EU legal, physical-device, and moderated-session reviews before broad promotion.
- **FR-019 / SLOW BURN:** RaDi approved the conservative 21-card consumer subset on 17 August 2026. Commission the memo's specialist, ethics, privacy, accessibility, legal, adverse-event, physical-device, and staged-session work before broad promotion. The excluded C06/intimate-area category is not approved.
- **FR-020 / Cross-pack evidence audit:** all 37 original atomic changes plus three cross-pack consistency addenda are approved and implemented. Classic's wording, translation, order, and route membership remain immutable. Remaining owner work is the named bilingual, specialist, accessibility, physical-device, and moderated-session validation—not another editorial triage pass.
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
| 2026-08-17 | FR-005 | Approve and implement the pack-specific Private Moment matrix | Asymmetric cards, explicit route triggers, ephemeral consent, private resume shields, and pack-specific finales now have a complete bilingual safety contract | Physical-device and moderated-session validation |
| 2026-08-17 | FR-017 | Group every adult pack behind one collapsed 18+ disclosure and keep Late Night last | Explicit content stays discreet while its explanation remains adjacent and understandable | Complete for current library |
| 2026-08-17 | FR-018/019 | Research POWER & TRUST and the touch-forward SLOW BURN as separate adult experiences | Their evidence, interaction, and participation requirements differ materially from Late Night | RaDi / editorial research |
| 2026-08-17 | FR-018–020 | Complete the focused evidence programme without applying candidate catalog changes | The citation-audited report supports a conversation-only FR-018 prototype, restricts FR-019 to closed moderated research, and exposes 37 original atomic cross-pack decisions plus three post-research addenda | RaDi / named specialist and editorial owners |
| 2026-08-17 | FR-020 | Approve and implement all 37 audit entries plus the three full-bank addenda | The atomic register preserves exact bilingual before/after copy, stable IDs, route/mechanic intent, downsides, and separate validation gates; Classic questions remain unchanged | Bilingual, specialist, accessibility, device, and moderated-session validation |
| 2026-08-17 | FR-018/019 | Approve experimental implementation of POWER, BY CHOICE and the conservative SLOW BURN consumer subset | The first remains conversation-only; the second uses exact masked bilateral choices, a restricted category set, and no resumable session state | Named external reviews and moderated sessions before broad promotion |
