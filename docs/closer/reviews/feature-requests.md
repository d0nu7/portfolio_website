# CLOSER – feature requests

**Updated:** 16 August 2026
**Status convention:** Proposed, Planned, In progress, Verification pending, Delivered, or Shelved

Product-owner decisions and editorial work are collected in the [RaDi owner TODO](../product/radi-owner-todo.md). FR-011 implementation is complete; the approved product freeze remains in place through release verification.

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

**Status:** Verification pending

`compileRun()` drives runtime run structure and save validation. All persisted
phase transitions are characterized in the pure transition core, persistence
and browser storage have explicit boundaries, and phase presentation is split
into focused views. This makes consent, resume, question routing, private
handoffs, and finale behavior auditable. The completed sequence is recorded in
the [refactoring roadmap](../engineering/refactoring-roadmap.md) and the
[transition matrix](../engineering/transition-matrix.md).

Frozen on 16 August 2026: no concurrent content, game-mechanic, animation,
legal, PWA, infrastructure, or TTS changes. Characterization tests must precede
each transition-family extraction, and visible behavior remained unchanged.

### FR-012 – TTS integration

**Status:** Shelved indefinitely; no merge planned

TTS is no longer considered by the active CLOSER roadmap. The existing voice
branch is not planned for merge and must not shape FR-011 implementation choices.
Do not generate, migrate, review, or clean up voice artifacts. Reopening FR-012
requires a new explicit product decision and a separately scoped effort.
