# CLOSER – RaDi owner TODO

**Updated:** 17 August 2026

**Purpose:** Decisions, editorial work, and real-world validation that require RaDi as product owner. Technical implementation details remain in the [feature-request tracker](../reviews/feature-requests.md) and [refactoring roadmap](../engineering/refactoring-roadmap.md).

Checkboxes reflect the repository state: `[x]` is complete or explicitly decided; `[ ]` still requires RaDi, real participants, external review, or a separately commissioned engineering effort.

## Recommended order

1. Decide whether to obtain professional Austrian legal review for the implemented legal text.
2. Complete physical-device release checks for the current product.
3. Decide whether offline support and a separate subdomain are actually wanted.
4. Run moderated sessions for the new specialist packs and PLAYFUL rollout.
5. Define and approve pack-specific private moments.
6. Build and approve replacement-question pools.

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
- [ ] Decide whether professional Austrian legal review is required before broader release.
- [ ] If reviewed, record approval date, reviewer, and required corrections in the legal copy or release notes.

Done when: RaDi has confirmed whether further identifiers apply, made an explicit legal-review decision, and any resulting corrections are implemented in DE and EN.

### Delivered items – physical-device sign-off

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

- [ ] Choose eligible routes for each pack. Quick should normally have none.
- [ ] Choose one clear private-moment concept per eligible pack.
- [ ] Write exact German and English copy for both people and every handoff.
- [ ] Add an unconditional decline path and truthful follow-up copy.
- [ ] Specify when the private information is revealed, used, or discarded.
- [ ] Review every card for pressure, manipulation, assumed attraction, covert touch, humiliation, diagnosis, or unwanted disclosure.
- [ ] Keep Late Night free of secret sexual or physical tasks; use readiness and consent checks only.

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

Done when: each eligible pack has approved DE/EN copy, route placement, a decline path, and an explicit reveal/use rule.

### FR-006 – Curate replacement-question pools

This starts only after the private-moment direction is settled and the core catalog is considered stable.

- [ ] Decide whether the joker is needed after observing real sessions.
- [ ] Define how many replacements each pack, act, route, and intensity needs.
- [ ] Write and review every replacement in German and English.
- [ ] Assign stable IDs and catalog metadata.
- [ ] Check for duplicates, near-duplicates, intensity jumps, and route mismatch.
- [ ] Confirm that **Another question** is optional variety and never replaces **Pass**.
- [ ] Approve behavior when no valid replacement remains.

Done when: implementation can select a valid replacement deterministically without repeats, pressure, or missing-language fallbacks.

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

- [ ] Decide **yes** or **no**: must an installed game start and complete without a network connection?
- [ ] If no, document that installability/fullscreen presentation is the only current PWA goal.
- [ ] If yes, approve the precached app shell and content scope.
- [ ] If yes, define cache invalidation using the content revision.
- [ ] If yes, define update notification, stale-version recovery, and offline test devices.

Recommendation: do not add a service worker merely to earn a PWA label. Add it only if offline play is a real user requirement and the update strategy is owned.

Done when: the decision and rationale are recorded; a **yes** includes an approved caching and recovery contract.

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
- **Pack/route/style terminology:** defer the persisted `modeId` rename to a separately approved save migration; FR-011 deliberately preserves it.

## Decision log

| Date | FR | Decision | Rationale | Follow-up owner |
|---|---|---|---|---|
| 2026-08-16 | FR-002 | Publish supplied phone number and VAT ID; use `radomir.dinic@radi.solutions` | Real operator details and existing identifiers belong in the Imprint | Complete |
| 2026-08-16 | FR-002 | Do not publish IBAN/BIC | No payment flow or identified Imprint requirement justifies the additional public disclosure | Complete |
| 2026-08-16 | FR-011 | Freeze all product behavior and authorize incremental run-definition and transition-core work | A stable target and characterization coverage reduce the risk of changing fragile phase paths during the refactor | Engineering |
| 2026-08-16 | FR-012 | Shelve TTS indefinitely; do not merge the existing voice branch | TTS is not currently planned and must not complicate the active engine refactor | Reopen only by explicit RaDi decision |
| 2026-08-16 | FR-011 | Complete the incremental transition, persistence, storage, and view extraction without product changes | The characterized slices pass the automated release gate and preserve save compatibility | Complete |
