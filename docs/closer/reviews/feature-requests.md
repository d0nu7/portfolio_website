# CLOSER – feature requests

**Updated:** 16 August 2026
**Status convention:** Proposed, Planned, In progress, Verification pending, Delivered, or Shelved

Product-owner decisions and editorial work are collected in the [RaDi owner TODO](../product/radi-owner-todo.md). FR-011 is delivered; later product changes require their own approved scope.

## P0 – release requirements

### FR-001 – Discreet Late Night discovery

**Status:** Delivered

Keep Late Night hidden from the default pack selector. Make it discoverable through **Menu → Additional content**, where an adult can show or hide it after a neutral 18+ explanation.

Requirements:

- Visibility is a versioned preference separate from game progress.
- Hiding the pack does not make a valid in-progress Late Night save unresolvable.
- Deleting local CLOSER data also deletes the preference.
- Revealing the pack does not bypass either in-session consent gate.
- No suggestive thumbnail, copy, or surprise reveal appears in the normal selector.

### FR-002 – In-app imprint and privacy information

**Status:** Delivered; owner-supplied operator details incorporated 2026-08-16; professional legal review still recommended, not yet obtained

Add bilingual Imprint and Privacy views to the global CLOSER menu so installed-PWA users can reach them without returning to the portfolio footer.

Requirements:

- Include the real operator name, geographical address, and direct email contact. — Done; also added the VAT ID (`ATU77589478`) and phone number RaDi supplied, since Austrian ECG §5 requires both where they exist and the Imprint previously omitted them. The contact email was corrected from a placeholder (`contact@radi.solutions`, the general portfolio address) to RaDi's actual address for this business (`radomir.dinic@radi.solutions`).
- Describe locally stored names/settings/progress, state that answers are not stored, and explain deletion. — Verified directly against the current code, not just the existing text's own claim: exactly three `localStorage` keys exist (`closer:v1` save state, `closer:preferences:v1` for the Late Night visibility preference, `closer:installHintDismissed`), no analytics/tracking dependency is in `package.json`, and `src/styles/fonts.css` confirms fonts are genuinely self-hosted via `@fontsource` rather than fetched from Google. The existing text's claims held up; no correction was needed here.
- Describe hosting/request-log processing accurately without claiming that the app controls a provider's exact retention policy. — The current wording is already deliberately hedged ("can depend on the Vercel service and settings applicable at that time") rather than naming a specific plan tier, so it doesn't need updating for the fact the project is on Vercel's free (Hobby) plan specifically — a plan-tier change wouldn't make the existing generic wording inaccurate, only a change to what Vercel processes at the platform level would.
- Deliberately NOT added: bank details (IBAN/BIC), even though RaDi supplied them. Austrian ECG §5 does not require payment/banking details in an Imprint, CLOSER takes no payments, and publishing IBAN/BIC on a public legal page is an avoidable disclosure with no legal upside here — flagged rather than silently included or silently dropped.
- State purposes, legal basis, recipients/transfers where applicable, retention logic, rights, and the Austrian data-protection complaint route. — Unchanged; already present in the existing draft.
- Keep the links constantly, easily, and directly accessible. — Unchanged; already delivered.
- Obtain owner and, where appropriate, professional legal review before treating the text as final legal advice. — **Still open.** RaDi asked directly whether a broader legal review is needed and doesn't know either; this is not something either of us can determine with confidence here. Given the site now discloses a VAT ID (indicating a registered business, not purely personal use), includes an explicit 18+ content path (Late Night), and operates under Austrian/EU jurisdiction, a short review by an Austrian lawyer or a DSGVO-focused service is a reasonable precaution before wide release — but this is judgment, not a verified legal conclusion, and the actual decision belongs to RaDi.

### FR-003 – Deployment security headers

**Status:** Delivered; live response verified 2026-08-16

`curl -I https://radi.solutions/closer/` confirms every header in `vercel.json` is actually served on the live response, not only present in the config file: `Content-Security-Policy` (including `style-src 'self' 'unsafe-inline'`, required for styled-components' runtime style injection, and `script-src 'self' 'unsafe-inline'`), `Strict-Transport-Security: max-age=31536000`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera/geolocation/microphone/payment/usb all denied), `X-Frame-Options: DENY`.

Not verified from this environment: an actual browser console check for a CSP violation on the live deployed bundle specifically (as opposed to the local dev/build server, which the E2E console guard already covers) — this sandbox's browser tooling is blocked from navigating to external sites. The header values were written for this app's exact known runtime needs (self-hosted fonts, styled-components, no third-party requests, per the holistic review's own source inspection) and match what the local build already exercises cleanly under the same console guard, so a live-specific violation is unlikely, but this is inference from configuration intent, not a live-browser observation. A real cross-browser check on the deployed site remains worth doing once accessible.

## P1 – product quality

### FR-004 – CLOSER milestone celebration

**Status:** Delivered; physical-device validation remains required

Replace the tiny pulse with a full, calm, pack-colored milestone scene that creates a brief sense of reward between acts while leaving conversation screens quiet.

Trigger only on meaningful transitions: start, act completion, an earned private transition, and natural finale. Do not use points, streaks, confetti, disclosure ratings, or rewards after consent decline/early end.

See the visual contract in [gameplay-and-safety.md](../product/gameplay-and-safety.md#8-milestone-celebration).

### FR-005 – Pack-specific private moments

**Status:** Proposed

Replace the universal saved-question ritual with a small library of safe, pack-appropriate asymmetric moments.

Editorial directions:

| Pack | Suitable private direction |
|---|---|
| Classic | Preserve the original saved-question behavior only where the route justifies it. |
| First Date | Choose one harmless curiosity to ask later; no prediction of consent or attraction. |
| Date Night | Privately choose an appreciation or future-date detail to reveal. |
| Couples | Select a listening intention or one positive quality to name. |
| Friends | Choose a memory category or celebration to bring into the finale. |
| Old Friends | Privately recall one detail, then compare memories without seeking a “correct” version. |
| Deep | Choose whether listening, reflection, or space would feel most supportive. |
| Chaos | Use a short secret spark or constraint for a co-created answer. |
| Late Night | No secret sexual/physical tasks; readiness and consent checks only. |

Every card needs a safe decline path, route eligibility, and dedicated DE/EN wording.

### FR-006 – Curated replacement-question joker

**Status:** Proposed; blocked by editorial content

After sufficient replacement questions exist, add an optional limited **Another question** action. It must not replace or weaken the unconditional Pass action.

Requirements:

- replacement pool keyed by pack, act, intensity, route, and language;
- no repeats or current-run duplicates;
- deterministic selection persisted across resume;
- no penalty, heart, or moral framing;
- disabled when no valid replacement exists.

### FR-007 – Setup simplification and navigation

**Status:** Partially delivered

Singleton style and route screens are skipped. Menu was already available from the landing screen onward.

Delivered: an internal Back action at every core setup stage (players, pack, duration, style), mirroring each stage's own singleton-skip logic in reverse so Back never lands on a screen the forward flow would have skipped. User choices already survive a step back and forward again, since phase changes alone never clear `players`/`packId`/`routeId`/`modeId`. Deliberately no Back button on Intro for a pack with a consent gate (Late Night): that Intro is only ever reached after both required consent confirmations, and reversing into that flow is a distinct, safety-sensitive concern this change does not take on. Covered by `e2e/setup-back-navigation.spec.js`.

While implementing this, found and fixed an unrelated pre-existing gap: the setup screens stayed reachable in the accessibility tree while the global menu dialog was open on top of them (a background "Go back" and the dialog's own same-named control were both matchable at once). The screen behind an open dialog is now `inert`, matching the treatment the milestone celebration overlay already had.

Remaining work: distinguish pack, route, and style consistently in UI and code. The internal field is still named `modeId` throughout the codebase and the persisted save shape (matching the pre-refactor "mode" terminology); renaming it is a larger, save-compatibility-sensitive change than this pass, not something to fold into a navigation fix.

### FR-008 – Duration calibration

**Status:** Proposed

Run moderated sessions for every pack and route. Record completion time, number of prompts reached, pass frequency, and whether participants felt rushed. Update catalog ranges from observed medians and spread without storing in-product answers or adding behavioral analytics by default.

## P2 – platform and future work

### FR-009 – Offline-capable PWA

**Status:** Decision required

The manifest can remove the address bar in an installed display mode, but installability does not guarantee offline operation. Add a service worker only if offline use is a real product requirement.

Before implementation, define:

- which app-shell assets and content are precached;
- how a new content revision invalidates old caches;
- how users are informed about an available update;
- how a stale installed version recovers;
- how the worker is tested on Android and iOS.

### FR-010 – Dedicated `closer.radi.solutions` project

**Status:** Proposed

A separate Vercel project is technically feasible and can improve deployment isolation, PWA identity, security headers, and release cadence. It is not required for the game to function.

Migration requirements:

- create the subdomain project and preserve the static-export behavior;
- update canonical URLs, manifest scope/start URL, metadata, and tests;
- add an intentional redirect from `/closer/`;
- explain that existing `localStorage` progress and installed-PWA identity cannot move automatically across origins;
- verify links back to the main portfolio, imprint, and privacy information.

### FR-011 – Run-definition and transition-core integration

**Status:** Delivered

`compileRun()` drives runtime run structure and save validation. All persisted
phase transitions are characterized in the pure transition core, persistence
and browser storage have explicit boundaries, and phase presentation is split
into focused views. This makes consent, resume, question routing, private
handoffs, and finale behavior auditable. The completed sequence is recorded in
the [refactoring roadmap](../engineering/refactoring-roadmap.md) and the
[transition matrix](../engineering/transition-matrix.md).

The 16 August 2026 implementation freeze prevented concurrent content,
game-mechanic, animation, legal, PWA, infrastructure, or TTS changes.
Characterization tests preceded each transition-family extraction, and the
final automated release gate passed without a visible behavior change.

### FR-012 – TTS integration

**Status:** Shelved indefinitely; no merge planned

TTS is no longer considered by the active CLOSER roadmap. The existing voice
branch is not planned for merge and must not shape FR-011 implementation choices.
Do not generate, migrate, review, or clean up voice artifacts. Reopening FR-012
requires a new explicit product decision and a separately scoped effort.

### FR-013 – Configurable pack library

**Status:** Planned

Replace the one-off Late Night visibility control under **Menu → Additional
content** with a checklist of every registered pack. A person can choose which
packs appear on the normal pack-selection screen; hidden packs remain available
in this menu and can be restored at any time.

Product intent:

- reduce irrelevant choices without deleting content;
- allow mutually unlikely contexts such as First Date and Couples to be hidden
  independently;
- keep the ordinary pack selector focused on the situations that matter to the
  current device owner;
- preserve discreet discovery and per-session consent for Late Night.

Requirements:

- Store visibility as a separately versioned list of pack IDs, not one boolean
  per pack.
- Migrate the existing `lateNightVisible` preference without unexpectedly
  changing the visibility of current packs.
- Existing mainstream packs remain visible after migration; newly introduced
  specialist packs start hidden until selected.
- The checklist must not permit an empty selector; at least one pack remains
  visible.
- Hiding the currently selected pack during setup selects a visible fallback.
- Hiding a pack never invalidates or conceals a valid resumable game using it.
- Unknown IDs from a newer or older deployment are ignored safely.
- Resetting all local CLOSER data restores the documented default set.
- Every checklist item exposes a clear checked state, pack name, short context,
  keyboard operation, and adequate touch target.
- Late Night retains its neutral 18+ explanation and both independent consent
  gates. Making it visible is never consent to play it.

Recommended default: keep the currently public packs visible, keep Late Night
hidden, and introduce Road Trip, Family, and Colleagues as hidden specialist
packs. Confirm this default during implementation rather than silently changing
the first-run experience.

### FR-014 – Road Trip, Family, and Colleagues packs

**Status:** In progress; editorial specification completed on this feature branch, registry/UI implementation and user-session validation pending

This feature branch completes the editorial deliverable for all three packs:
three bilingual 36-question master banks (108 questions total), curated route
membership, context and safety guidance, and an explicit decision to use no
private moment in any of the three packs. The packs are not yet registered or
playable in the application. FR-013 remains the prerequisite for their UI
integration, and moderated user sessions remain necessary before release timing
and route assumptions can be treated as validated.

Add three research-informed packs after FR-013 provides a manageable library.
Each pack needs 36 stable DE/EN master questions, a three-act intensity curve,
curated routes, truthful duration estimates, pack-specific finale copy, and a
decision on whether any private moment genuinely improves the experience.

#### ROAD TRIP

- Context: two people travelling together, regardless of relationship type.
- Arc: surroundings and playful hypotheticals → travel stories and preferences
  → future places, shared wishes, and what makes a journey memorable.
- Suggested routes: Quick 12, Standard 24, Full 36.
- Safety: the driver never handles or reads the phone. Setup must explicitly
  assign control to a passenger or require the vehicle to be parked.
- Avoid navigation tasks, competitive dares, distracting countdowns, and
  assumptions about budget, passports, mobility, or international travel.

#### FAMILY

- Context: two adult family members, including chosen family; no assumption of
  biological relation, harmony, childhood together, parenthood, or desired
  reconciliation.
- Arc: everyday knowledge and positive memories → roles, support, and change →
  appreciation, boundaries, and a freely chosen future relationship.
- Suggested routes: Quick 12, Standard 24, Full 36.
- Avoid diagnosing family dynamics, forcing disclosure of conflict or trauma,
  ranking relatives, assigning blame, or presenting the game as family therapy.

#### COLLEAGUES

- Context: two colleagues participating voluntarily, ideally peers rather than
  an evaluator and the person being evaluated.
- Arc: work style and small wins → collaboration and communication → strengths,
  learning, and a healthy shared working future.
- Suggested routes: Quick 12 and Standard 24; add Full only if user sessions
  demonstrate a credible, non-intrusive use case.
- Avoid salary, health, protected characteristics, workplace investigations,
  confidential employer/client information, performance ratings, compulsory
  vulnerability, and prompts that could affect employment decisions.
- Intro copy must make Pass and ending unconditional and state that participation
  is not an assessment.

Editorial acceptance:

- Questions are clearly specific to their pack rather than lightly rewritten
  Classic/Friends prompts.
- Quick is a self-contained arc, not a random excerpt.
- Wording is gender-neutral, culturally cautious, and answerable without a
  privileged lifestyle or ideal relationship history.
- New claims remain “research-informed”; only Classic Full may be positioned as
  closely following the original closeness protocol.
- Catalog fidelity, registry conformance, route timing, save/resume, visibility
  migration, DE/EN, and mobile E2E coverage all pass before release.

### FR-015 – Students pack and FH Salzburg campus variant

**Status:** Planned; research, product framing, and bilingual editorial content pending

Add a durable general `students` pack for two voluntarily participating peers
in higher education. Treat the FH Salzburg idea as an optional campus variant or
overlay on that foundation, rather than immediately duplicating an entire
institution-specific 36-question bank. This keeps the general experience useful
outside one organization and makes the smaller local layer easier to review when
campuses, programs, terminology, or student services change.

#### STUDENTS

- Context: two adult students participating voluntarily, regardless of
  institution, program, study format, semester, age, employment status, or
  whether they already know one another.
- Possible arc: everyday student life and small wins → learning, collaboration,
  and belonging → strengths, support preferences, hopes, and a self-directed
  future.
- Research and user testing must determine whether Quick 12 and Standard 24 are
  sufficient or whether a 36-question Full route has a credible use case.
- Do not ask for grades, ranking, finances, health or disability details,
  immigration status, protected characteristics, political or religious views,
  named conflicts, misconduct reports, or confidential information from study,
  work, research, placements, clients, or patients.
- Do not frame answers as evidence of aptitude, engagement, wellbeing,
  employability, or belonging. Passing and ending remain unconditional.
- Exclude lecturer–student, assessor–assessed, supervisor–supervisee, admissions,
  scholarship, and other pairings in which one person can materially affect the
  other person's studies or opportunities.

#### FH SALZBURG variant

- Prefer a small, versioned campus overlay or locally curated route that can add
  genuinely useful FH Salzburg context without forking all general questions.
- The variant must remain a peer conversation, not institutional onboarding,
  course evaluation, marketing research, or a channel for academic complaints.
- Local prompts must avoid assuming a specific campus, degree program, mode of
  study, nationality, mobility, or access need.
- Assign an explicit content owner and review cadence for local wording and
  links. Do not encode changeable facts in the shared base pack.
- Use of the FH Salzburg name, branding, or any implication of official
  endorsement requires separate organizational approval; CLOSER must not imply
  that the institution has validated the questions or research claims.
- No answer is recorded, exported, reported to the institution, or used for an
  academic or employment decision.

Before implementation, decide whether the local experience is best represented
as a separately selectable pack, a STUDENTS setup option, or a curated event
route. It should remain hidden in the configurable pack library by default
outside an explicitly selected FH Salzburg context.
