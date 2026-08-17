# CLOSER – feature requests

**Updated:** 17 August 2026
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

**Status:** Delivered; owner-supplied operator details incorporated 2026-08-16; RaDi decided on 2026-08-17 not to commission professional legal advice at the current stage

Add bilingual Imprint and Privacy views to the global CLOSER menu so installed-PWA users can reach them without returning to the portfolio footer.

Requirements:

- Include the real operator name, geographical address, and direct email contact. — Done; also added the VAT ID (`ATU77589478`) and phone number RaDi supplied, since Austrian ECG §5 requires both where they exist and the Imprint previously omitted them. The contact email was corrected from a placeholder (`contact@radi.solutions`, the general portfolio address) to RaDi's actual address for this business (`radomir.dinic@radi.solutions`).
- Describe locally stored names/settings/progress, state that answers are not stored, and explain deletion. — Verified directly against the current code: the game save uses `closer:v1`, current pack visibility uses `closer:preferences:v2`, the former `closer:preferences:v1` is read only for migration and removed by local-data deletion, and install-hint dismissal uses `closer:installHintDismissed`. No analytics/tracking dependency is present, and fonts are self-hosted via `@fontsource`.
- Describe hosting/request-log processing accurately without claiming that the app controls a provider's exact retention policy. — The current wording is already deliberately hedged ("can depend on the Vercel service and settings applicable at that time") rather than naming a specific plan tier, so it doesn't need updating for the fact the project is on Vercel's free (Hobby) plan specifically — a plan-tier change wouldn't make the existing generic wording inaccurate, only a change to what Vercel processes at the platform level would.
- Deliberately NOT added: bank details (IBAN/BIC), even though RaDi supplied them. Austrian ECG §5 does not require payment/banking details in an Imprint, CLOSER takes no payments, and publishing IBAN/BIC on a public legal page is an avoidable disclosure with no legal upside here — flagged rather than silently included or silently dropped.
- State purposes, legal basis, recipients/transfers where applicable, retention logic, rights, and the Austrian data-protection complaint route. — Unchanged; already present in the existing draft.
- Keep the links constantly, easily, and directly accessible. — Unchanged; already delivered.
- Professional review decision. — RaDi decided not to commission legal advice at the current stage. The in-app text remains a practical transparency baseline, not lawyer-certified legal advice. Reopen the decision after material changes to processing, monetization, product risk, or applicable operator details.

### FR-003 – Deployment security headers

**Status:** Delivered; live response verified 2026-08-16

`curl -I https://radi.solutions/closer/` confirms every header in `vercel.json` is actually served on the live response, not only present in the config file: `Content-Security-Policy` (including `style-src 'self' 'unsafe-inline'`, required for styled-components' runtime style injection, and `script-src 'self' 'unsafe-inline'`), `Strict-Transport-Security: max-age=31536000`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera/geolocation/microphone/payment/usb all denied), `X-Frame-Options: DENY`.

Not verified from this environment: an actual browser console check for a CSP violation on the live deployed bundle specifically (as opposed to the local dev/build server, which the E2E console guard already covers) — this sandbox's browser tooling is blocked from navigating to external sites. The header values were written for this app's exact known runtime needs (self-hosted fonts, styled-components, no third-party requests, per the holistic review's own source inspection) and match what the local build already exercises cleanly under the same console guard, so a live-specific violation is unlikely, but this is inference from configuration intent, not a live-browser observation. A real cross-browser check on the deployed site remains worth doing once accessible.

## P1 – product quality

### FR-004 – CLOSER milestone celebration

**Status:** Delivered; compact timing and slower final fade refined on 17 August 2026; physical-device validation remains required

Replace the tiny pulse with a full, calm, pack-colored milestone scene that creates a brief sense of reward between acts while leaving conversation screens quiet.

Trigger only on public shared transitions: start, act completion, and natural finale. Private handoffs and consent/readiness decisions stay quiet. Do not use points, streaks, confetti, disclosure ratings, or rewards after consent decline/early end.

See the visual contract in [gameplay-and-safety.md](../product/gameplay-and-safety.md#8-milestone-celebration).

### FR-005 – Pack-specific private moments

**Status:** Editorial specification approved by RaDi and implemented on 17 August 2026; automated validation complete, physical-device and moderated-session validation remains

Replace the universal saved-question ritual with a small library of safe, pack-appropriate asymmetric moments.

Approved product matrix:

| Pack | Decision | Routes | Trigger | Use/discard point |
|---|---|---|---|---|
| Classic | Optional saved questions | Full | before Q28 | categorical check after Q36, then dynamic Question 37; discard at resolution/end |
| First Date | Optional asymmetric curiosities | Standard, Full | after Act I | optional two-turn finale; discard at finale/end |
| Date Night | Optional appreciation/future-date detail | Standard, Full | after Act I | optional two-turn finale; discard at finale/end |
| Couples | Optional listening intention/quality | Standard, Full | after Act I | one shared use screen after Act II; discard immediately afterward |
| Friends | Optional memory/celebration | Standard, Full | after Act II | optional two-turn finale; discard at finale/end |
| Old Friends | Optional memory detail/meaning | Standard only | after Act I | immediate shared use screen; discard immediately afterward |
| Deep | Optional reflection/silence intentions | Standard, Full | after Act I | shared close after Act II; discard immediately afterward |
| Chaos | Optional surprise constraints | Standard, Full | immediately before Q16 | supplement Q16; discard when leaving Q16 |
| Late Night | Required independent consent/readiness | all routes | entry and after Act I | collective accepted/declined result; direct safe finale after the route |
| Road Trip / Family / Colleagues | None | all routes | — | — |

Required task deliverables:

- one explicit `none | optional | consent/readiness` decision for every implemented pack;
- a threat-model review covering pressure, covert behavior, loyalty testing, unwanted disclosure, touch, sex, conflict, workplace/family power, and unsafe device handoffs;
- exact route eligibility and trigger placement;
- genuinely asymmetric card A/card B content rather than the same instruction shown twice;
- exact DE/EN copy for display, handoff, decline, reveal/use, early exit, resume, and every affected finale branch;
- a state lifecycle that stores only categorical navigation state, never an answer or private free text;
- an explicit rule for when private information is used and irreversibly discarded;
- RaDi editorial approval before implementation begins. Approval was recorded on 17 August 2026.

Road Trip, Family, and Colleagues remain `privateMoment: none` for the current release. Late Night may use only independent readiness/consent checks, never secret sexual or physical tasks. Every card needs a safe decline path, route eligibility, and dedicated DE/EN wording.

Implementation preserves A/B roles from the person selected to open Q1. Non-Classic private card choices never persist as individual accept/decline values. Classic stores only `none | pending | asked | discarded`; Late Night consent decisions exist only in memory long enough to compute a collective result and are excluded from local storage. Private card screens resume behind a named handoff cover. Natural completion and every early end scrub private categorical state. Spoken answers and private free text never enter application state.

Acceptance: the matrix, localized copy, lifecycle, threat review, route triggers, and finale semantics are implemented without borrowing from FR-006 or changing PLAYFUL eligibility. The exact bilingual catalog is in [question-catalog.de-en.md](../content/question-catalog.de-en.md#private-moments-fr-005), and the runtime/safety contract is in [gameplay-and-safety.md](../product/gameplay-and-safety.md#6-private-moments-and-finales).

### FR-006 – Curated replacement-question joker

**Status:** Dedicated editorial task defined; implementation blocked by approved pool content

After sufficient replacement questions exist, add an optional limited **Another question** action. It must not replace or weaken the unconditional Pass action.

Requirements:

- replacement pool keyed by pack, act, intensity, route, and language;
- no repeats or current-run duplicates;
- deterministic selection persisted across resume;
- no penalty, heart, or moral framing;
- disabled when no valid replacement exists.

The dedicated task must additionally decide:

- eligible packs/routes and the exact number of replacements available per run;
- whether a replacement may itself be replaced (recommended initial rule: at most once per slot);
- progress semantics (recommended: replace the current slot without increasing route length or advertised time);
- minimum editorial coverage (at least two valid alternatives for every supported context, otherwise mark it unsupported);
- exhaustion and unavailable copy;
- stable bilingual IDs, catalog location, duplicate/near-duplicate checks, and sensitive-pack exclusions;
- RaDi editorial approval before a separate implementation branch begins.

Acceptance: an implementation can choose and persist a valid replacement deterministically without weakening Pass, extending the route, repeating content, changing intensity, or falling back across languages.

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

**Status:** Not planned for the current product; reopen only if offline play becomes a real requirement

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

**Status:** Delivered on `feature/closer-roadtrip-family-colleagues`; deployment and physical-device validation remain

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
- Adult packs are grouped behind a separate collapsed **18+ content**
  disclosure at the bottom of the library. Their neutral explanation is shown
  beside the relevant toggle rather than below unrelated packs.

Recommended default: keep the currently public packs visible, keep Late Night
hidden, and introduce Road Trip, Family, and Colleagues as hidden specialist
packs. Confirm this default during implementation rather than silently changing
the first-run experience.

### FR-014 – Road Trip, Family, and Colleagues packs

**Status:** Delivered on `feature/closer-roadtrip-family-colleagues`; moderated user-session validation remains

This feature branch completes the editorial and implementation deliverables for all three packs:
three bilingual 36-question master banks (108 questions total), curated route
membership, context and safety guidance, an explicit decision to use no
private moment in any of the three packs, registry integration, direct finales,
and hidden-by-default discovery through FR-013. Moderated user sessions remain necessary before release timing
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
- Safety: the first release is parked/no-participating-driver only. A moving-vehicle design requires a separate product and safety decision.
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

### FR-016 – Pack-aware PLAYFUL styles and actions

**Status:** Initial rollout delivered; broader pack pilots and moderated user testing remain

Extend the interaction mechanics currently associated with CLASSIC PLAYFUL to
other suitable packs. This must be a pack-aware content feature, not a global
switch that enables every twist everywhere. `CHAOS` already calls its single
style PLAYFUL, and several other packs use sparse `GO DEEPER` or `STAY` cues,
but only CLASSIC currently offers a real style choice with the broader
`PREDICT`, `BOTH`, and `NO THINKING` action set.

#### Product behavior

- A pack may expose more than one style only when the styles create a
  meaningfully different experience. Packs with one valid style continue
  directly without a redundant style-selection screen.
- CALM or the existing pack-specific default preserves the current question
  wording, order, response cards, and restrained presentation.
- PLAYFUL uses the same curated route and questions while enabling a sparse,
  deterministic set of explicitly approved actions.
- Every action remains optional. The ordinary free Pass action is available
  before and during a twist and never requires a reason.
- PLAYFUL does not add scores, winners, streaks, penalties, public performance,
  dares, touch tasks, or rewards for disclosing more than feels comfortable.
- Question progress, duration estimates, private moments, and finales remain
  properties of the pack and route rather than changing implicitly with style.

#### Editorial eligibility

Each question must explicitly declare whether it may carry a playful action and
which action is allowed. A pack-level style allow-list is only the second gate;
an action renders only when both the style and that exact question permit it.
Do not infer eligibility from act number, keywords, or intensity alone.

- `NO THINKING` is limited to light, low-stakes prompts. The real question is
  visible before or together with the countdown; nobody answers unseen text.
- `PREDICT` is limited to harmless preferences or positive observations. It is
  a guess, never a test of how well someone knows the other person. Roles
  alternate, results are not scored, and the speaker always gives their own
  answer afterward.
- `BOTH` is limited to prompts that are safe to answer simultaneously. It is
  forbidden when answers concern consent, boundaries, conflict, support needs,
  identity, difficult memories, or another person's perspective.
- `GO DEEPER`, `STAY`, and response cards retain their current listening role.
  They must not be relabelled as competitive or achievement mechanics merely
  because PLAYFUL is active.

Never assign pressure or proxy mechanics to mortality, grief, trauma, health,
sex or consent, family conflict, estrangement, workplace evaluation,
confidential information, or any question where a mismatch could shame or
obligate someone.

#### Density and pacing

- Quick: at most three playful actions across the entire 12-question route.
- Standard: at most two playful actions per act and no consecutive actions.
- Full: at most two playful actions per act and no consecutive actions.
- The same high-intervention action appears at most once per act.
- `PREDICT` starters alternate across a run; one person must not repeatedly
  guess the other person's answers.
- Act transitions and finales remain quiet enough for the conversation to
  breathe. Milestone animation may celebrate progress but must not grade an
  answer or compete with an active prompt.

These values are initial editorial ceilings, not targets. A pack may use fewer
actions or no PLAYFUL style at all.

#### Initial pack matrix

| Pack | Initial recommendation |
|---|---|
| CLASSIC | Preserve ORIGINAL and the legacy PLAYFUL style. Keep the existing `datenight` style ID for save compatibility even though the visible title is PLAYFUL. Re-audit density and role balance against the shared rules. |
| DATE NIGHT | Strong first candidate. Allow a small number of light `BOTH`, `NO THINKING`, and low-stakes `PREDICT` moments; exclude attraction boundaries, touch, disagreement, and later safety questions. |
| FRIENDS | Strong first candidate. Prefer playful shared memories and harmless preferences; keep support, boundaries, and appreciation sequential. |
| COUPLES | Suitable with caution. Use positive or everyday preferences only; never turn `PREDICT` into proof that partners should know each other and never apply it to repair or unmet needs. |
| CHAOS | Treat the existing single PLAYFUL style as the thematic default. It may gain safe co-creative actions without adding a redundant style screen; avoid making an already energetic pack exhausting. |
| FIRST DATE | Pilot after the first group. Keep actions sparse and low-pressure; exclude attraction signals, boundaries, rejection, and relationship-future questions. |
| OLD FRIENDS | Pilot after the first group. Avoid guesses based on an outdated version of the other person and exclude distance, changed identity, and reconciliation-sensitive prompts. |
| DEEP | Keep the current restrained style initially. `NO THINKING`, `PREDICT`, and `BOTH` are generally incompatible with its purpose; a later alternative would need its own interaction concept rather than inherited CLASSIC actions. |
| LATE NIGHT | Explicitly excluded. Existing consent rules continue to prohibit countdown pressure, proxy answers, simultaneous boundary answers, and action-oriented twists. |
| ROAD TRIP | Disable all playful actions whenever either participant is driving. A parked or no-driver variant may be reviewed separately after the base pack is implemented and tested. |
| FAMILY | Do not use `PREDICT`; fixed family roles and assumptions make proxy answers risky. A later pilot may use a few harmless Act-I `BOTH` or `NO THINKING` actions only. |
| COLLEAGUES | Keep pressure, prediction, simultaneous answers, countdowns, and performance framing disabled. A future lighter presentation must not resemble assessment or mandatory team building. |
| STUDENTS / FH Salzburg | Decide during their own editorial design. Any playful variant remains peer-only and must not introduce academic performance, ranking, or staff–student pressure. |

#### Technical contract

- Keep style capability in pack data and question eligibility in question data;
  do not scatter pack-name conditionals through presentation components.
- `compileRun()` resolves a stable action assignment for the selected pack,
  route, and style. Do not randomize actions at render time.
- The run fingerprint includes the selected style and remains sufficient to
  reject an incompatible saved run. Adding or changing action assignments
  requires an intentional content-version decision.
- Preserve the legacy CLASSIC PLAYFUL style ID during migration. Newly added
  styles use stable, pack-local IDs and safe fallback behavior for unknown IDs.
- UI copy explains the concrete difference between the available styles without
  suggesting that PLAYFUL is better, braver, more intimate, or more complete.
- The style picker remains fully keyboard accessible, screen-reader named, and
  usable at 320 px without hiding its primary action.

#### Acceptance criteria

- An editorial matrix lists every twist-bearing question per supported pack,
  route membership, action type, safety rationale, and excluded topics.
- Automated conformance tests reject an action that is not permitted by both
  the selected style and the exact question.
- Route tests enforce the density, spacing, type-frequency, and `PREDICT`
  role-balance limits above.
- Save/resume preserves the exact question, action, countdown state, and starter
  role without rerolling or silently changing style.
- Browser tests cover Pass before and during every action type, question-first
  countdown behavior, simultaneous-answer instructions, starter alternation,
  one-style screen skipping, DE/EN copy, reduced motion, and mobile layout.
- Dedicated safety tests prove that Late Night, Power, by Choice, Slow Burn, Road Trip,
  Colleagues, and every individually excluded sensitive question cannot render
  an incompatible action even when an invalid style ID or saved state is
  supplied.
- Moderated sessions compare the default and PLAYFUL styles for conversation
  quality, pressure, confusion, action fatigue, pass rate, and whether attention
  remains on the other person rather than the phone.

### FR-017 – Extensible 18+ content library

**Status:** Delivered; three adult packs are metadata-grouped, hidden by default, and independently enabled

Keep adult material discreet without making it difficult to understand once a
person intentionally opens it. The Additional content view places every pack
whose metadata declares `contentGroup: 'adult'` in a collapsed **18+ content**
section at the bottom. Late Night is therefore the final pack in the current
list, with its explanation immediately adjacent to its toggle.

Requirements for future adult packs:

- Use pack metadata rather than pack-name conditionals to enter the adult group.
- Keep the group collapsed by default and its packs absent from the ordinary
  selector until deliberately enabled.
- Treat visibility, adult eligibility, willingness to enter the experience,
  and agreement to a particular real-world action as distinct states.
- Give every adult pack its own neutral purpose and participation contract.
- Never store answers, body preferences, fantasies, consent choices, or sexual
  history.
- Reopen the legal/youth-protection review decision before public release,
  because broader explicit content materially changes the product-risk profile.

Done when: future adult packs can join the disclosure through metadata, the
group remains keyboard/screen-reader accessible at 320 px, and every pack passes
its own participation, content, and release review.

### FR-018 – POWER, BY CHOICE adult conversation pack

**Status:** Delivered experimentally on 17 August 2026 by explicit RaDi decision; external validation remains open

Working title: **POWER & TRUST**; the evidence review recommends testing **POWER, BY CHOICE**. This is an original conversation pack about
consensual power exchange, dominance/submission preferences, negotiation,
safewords, stopping, check-ins, and aftercare. It must not imitate, quote, or use
the branding of *Fifty Shades of Grey*.

The dedicated evidence review is complete in the [integrated FR-018–020 report](../research/fr-018-fr-020-deep-research.md) and [FR-018 memo](../research/fr-018-power-trust-evidence-memo.md). It separates peer-reviewed findings, community practice, professional guidance, editorial inference, and unresolved questions.

Editorial contract:

- Adults only; do not present intoxication, coercion, or hazardous practices as
  valid consent or as instructions.
- Do not use punishment, score, countdown, prediction, or partner-test mechanics.
- Questions may explore roles and desires but never assign a role or make an
  answer proof of permission.
- Do not assume prior experience, exclusivity, a specific body, gender,
  orientation, relationship, or wish to act.
- Entry and escalation use independent opt-ins and a neutral direct ending.

The complete 36-question bilingual bank now ships as a conversation-only adult pack with Quick, Standard, and Full routes. It has no touch tasks, private moment, Question 37, timer pressure, PLAYFUL actions, score, compatibility result, or role assignment. Independent entry and Act-II choices expose only the collective outcome. RaDi accepted the name and implementation on 17 August 2026. The named kink/sexual-health, trauma, accessibility, bilingual, privacy, Austrian/EU legal, physical-device, and moderated-session reviews remain open; delivery must not be described as validation.

### FR-019 – SLOW BURN touch-forward adult experience

**Status:** Conservative consumer subset delivered experimentally on 17 August 2026 by explicit RaDi decision; external validation remains open

Working title: **SLOW BURN**. Unlike the conversation-only Late Night pack, this
is deliberately a physical, touch-forward experience for two participating
adults. The three acts may progress from atmosphere and non-intimate touch to
more sensual or erotic touch, kissing, and body-specific preferences. It may be
research-informed, but the product must not promise, score, or claim to cause
arousal.

The dedicated review is complete in the [integrated FR-018–020 report](../research/fr-018-fr-020-deep-research.md) and [FR-019 memo](../research/fr-019-slow-burn-evidence-memo.md). It distinguishes clinical, empirical, community, public-health, spiritual, and commercial claims and defines a non-contiguous eligibility set plus exact-action gating.

Interaction contract:

- Both adults knowingly choose a touch-based mode and confirm that intention
  independently before it starts.
- Every physical start or restart and every materially changed action or condition uses a fresh exact bilateral **Yes + Yes** gate. **Adjust** and **Skip** remain equal-status choices; less, slower, more space, no touch, Pause, Stop, and End take effect immediately.
- The experience may give concrete, tasteful touch or kissing invitations and
  may ask where or how touch feels good. It must also make “not there”, “not
  now”, “different”, Pause, and End equally immediate.
- Agreement to enter the mode is not a blanket agreement to every later action;
  a changed answer takes effect immediately and needs no explanation.
- No step assumes a particular anatomy, ability, orientation, relationship
  structure, experience level, or desired endpoint.
- Answers, chosen body areas, adjustments, and consent states are transient and
  never persisted.

The shipped conservative subset contains 21 bilingual cards across Quick, Standard, and Unhurried routes. Physical invitations require fresh masked **Yes / Adjust / Skip** choices from both people; only Yes + Yes opens an action. Adjust, Pause, More, Different, Not there, Stop, and End halt contact or require a new exact bilateral choice. The experience is non-resumable: no action, body area, adjustment, or consent choice is persisted, and an injected save is rejected. Category 7/C06 and penetration, breath/neck play, restraint, impact, surprise touch, and intimate-area action cards are excluded. RaDi explicitly authorized this conservative implementation on 17 August 2026. The memo's specialist, ethics, privacy, legal, accessibility, adverse-event, physical-device, and moderated-session gates remain open and should be completed before broad promotion.

### FR-020 – Cross-pack evidence and question audit

**Status:** Delivered 17 August 2026; all 37 original atomic changes plus three post-research addenda are implemented, with external validation pending

Repeat the evidence-review method across every research-informed pack without
altering the immutable Classic questions. Recheck construct fit, intensity
curves, duplicates, translation equivalence, inclusivity, pressure risks,
duration assumptions, and whether newer publications materially change any
editorial rationale. Preserve a dated source/claim map and file individual
content changes as separately reviewable proposals rather than silently editing
the authoritative catalog.

The completed [integrated report](../research/fr-018-fr-020-deep-research.md), [FR-020 audit memo](../research/fr-020-cross-pack-audit-memo.md), and [exhaustive post-research question-bank audit](../research/question-bank-full-audit-2026-08-17.md) cover the 12 packs implemented at the time plus the Students/FH Salzburg draft. That pass accounts for the then-current 432 questions and adds three exact bilingual consistency changes for Date Night Q03, Friends Q14, and Old Friends Q22. The owner subsequently approved all 40 atomic entries. Catalog copy, runtime content, route membership, response cards, PLAYFUL behavior, shared action copy, and route-specific finales are synchronized; Classic's 36 questions remain unchanged.

Implementation is complete when every approved atomic entry is synchronized across catalog and runtime, behavior-changing saves are versioned, Classic's question fingerprint stays unchanged, and wording/routes/mechanics/finales have regression coverage. Those conditions are met. Named bilingual, specialist, accessibility, physical-device, and moderated-session gates remain release evidence rather than code work.
