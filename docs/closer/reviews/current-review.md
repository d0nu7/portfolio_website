# CLOSER – current holistic review

**Reviewed:** 16 August 2026
**Scope:** current `main` implementation and live `/closer/` experience, plus editorial candidates on `feature/closer-roadtrip-family-colleagues`
**Detailed trackers:** [bugs](bugs.md) · [feature requests](feature-requests.md) · [refactoring roadmap](../engineering/refactoring-roadmap.md)

## 1. Overall assessment

CLOSER is now a coherent product rather than a single 36-question prototype. Its strongest qualities are the shared-device focus, quiet question screens, bilingual content fidelity, curated route structure, unconditional passing, and a thoughtful set of relationship-specific packs. The content is generally strong enough for broader moderated testing.

Current `main` closes the most visible defects: timer/Menu collision, undersized milestone animation, dialog subview focus, STAY lockout, discreet Late Night discovery and consent, the Late Night no-secret finale, and in-app legal reachability. FR-011 also replaces the monolithic phase controller with a compiled run definition, characterized pure transitions, explicit persistence/storage boundaries, and focused presentation components. Lint, unit/catalog tests, the production static build, and the complete local Chromium E2E suite pass. Physical Android/iOS plus assistive-technology checks remain release validation rather than unfinished refactoring.

Recommended release decision:

- **Normal packs:** suitable for a controlled public beta after deployment smoke testing and physical-device checks.
- **Late Night:** suitable for explicit testing now in the local build; broad release still waits for owner/legal review and physical-device checks.
- **Architecture:** FR-011 is complete in code through small behavior-preserving slices; retain the characterization suite as the contract for future changes.

## 2. Evidence and limitations

The review covered:

- source and state-flow inspection across the pack registry, content modules, game controller, persistence, timer, dialog, animation, PWA assets, and tests;
- the current refactoring document plus an independent assessment of its claims;
- a live mobile-like walkthrough at `https://radi.solutions/closer/`, including Classic Quick through Act I;
- live element measurements that reproduced timer/Menu overlap;
- inspection of all nine pack definitions and the complete DE/EN catalog;
- existing unit and E2E coverage, including the global console/page-error guard.

Local lint, unit/catalog, production build, and Chromium E2E gates pass. Deployment freshness, live console behavior, WebKit, and physical-device behavior remain separate verification items. No hard-coded test counts are recorded here because they become stale quickly.

No unexpected console error was observed during the reviewed live smoke path. That is useful but not equivalent to testing every deployed branch; the global console guard should continue to run over the complete E2E suite and a post-deploy smoke test.

## 3. What is already implemented well

### Product and conversation focus

- One shared phone remains a facilitator rather than a place to enter answers.
- Question screens are visually restrained and keep attention between the two people.
- Passing is unconditional and no longer competes with a heart-based Skip action.
- Quick no longer inherits the disproportionate saved-question/Question 37 ceremony.
- Route and pack introductions are more truthful and pack-specific.
- Early ending is distinguished from a natural completion reward.

### Content and modes

- The bilingual editorial catalog contains 432 stable question pairs across 12 packs: 324 implemented questions in nine packs plus 108 questions in the Road Trip, Family, and Colleagues candidates.
- All implemented questions have stable IDs and exact catalog-fidelity coverage; the three candidate banks have automated ID, route-count, bilingual-completeness, and duplicate-copy checks.
- Quick, Standard, and Full are curated sequences rather than random samples.
- Classic remains editorially immutable and fingerprint-protected, preserving its relationship to the original closeness protocol.
- The newer packs have recognizably different arcs rather than superficial theme labels.
- Response cards are sparse and framed as listening cues rather than required answers.
- Late Night wording is unusually careful about assumptions, action pressure, safer sex, boundaries, and aftercare.

### Engineering baseline

- Pack content is split into reviewable modules and shared content is deduplicated.
- Timing has a numerical model rather than separate display-only estimates.
- Content revision and ordered run fingerprints provide a stronger resume boundary than raw local state alone.
- Shared dialog, handoff, and choice-list components reduce repeated UI behavior.
- Contrast tests, focus-visible treatment, accessibility smokes, and a suite-wide console/page-error guard are valuable safeguards.
- Fonts are self-hosted and source inspection found no analytics, trackers, remote answer storage, or third-party font requests in CLOSER.

## 4. Priority findings

### P0 – implemented locally; deployment/device sign-off remains

1. **Late Night is now an actual hidden user path.** Tests cover default-hidden discovery, preference persistence/deletion, independent entry consent, renewed Act II consent, neutral decline, DE/EN copy, the no-secret rule, and the optional finale.
2. **Legal information is directly reachable.** Bilingual Imprint and Privacy views are available from the global menu before setup and during play.
3. **The current-worktree gate passes.** The remaining gate is a deployed smoke test plus physical Android/iOS and assistive-technology verification.

The legal material must identify the operator and explain processing, but this review is not legal advice. Austrian ECG § 5 requires service-provider information to be constantly, easily, and directly accessible. GDPR Article 13 defines the information required when personal data is collected. Useful primary references are [Austrian ECG § 5](https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Anlage=&Artikel=&FassungVom=2024-03-29&Gesetzesnummer=20001703&Paragraf=5&Uebergangsrecht=) and [GDPR Article 13](https://eur-lex.europa.eu/legal-content/EN/TXT/?toc=OJ%3AL%3A2016%3A119+%3ATOC&uri=uriserv%3AOJ.L_.2016.119.01.0001.01.ENG). Final copy should be checked against the operator’s real circumstances.

### P1 – visible product quality closed in the local build

1. **Mobile chrome:** TopBar reserves a permanent menu slot; bounding-box checks pass at 320, 360, 390, and 430 px.
2. **Milestone celebration:** the new full-screen scene has real node travel, a connecting thread, a large halo, readable copy, a longer lifecycle, and a stable reduced-motion state. Covered scene controls are inert, while Menu stays available; active time and ending beats pause until the celebration clears.
3. **Dialog focus:** each submenu view moves focus back into the updated dialog while preserving trap, Escape, and return-focus behavior.
4. **STAY:** the pause remains calm while Continue and Menu are available immediately.
5. **Safety controls:** Pass is now available before and during countdown twists, not only after the question reaches its ordinary answer state.
6. **Persistent access:** Menu, Privacy, and Imprint remain reachable through the ordinary ending sequence.
7. **Functional chrome:** question count and elapsed time retain WCAG AA text contrast instead of being faded again by the act-level chrome opacity.

### P2 – engineering resilience

1. Keep the completed transition core and compiled run definition as the required path for future persisted navigation.
2. Include style identity in the run fingerprint.
3. Replace broad persisted-state parsing with genuinely phase-specific validation.
4. Checkpoint the current timer segment on safe lifecycle boundaries.
5. Standardize pack/route/style terminology.
6. Verify the newly configured deployment-level security headers on the live responses.
7. Complete WebKit, VoiceOver, TalkBack, and real installed-PWA tests.

## 5. Mode review

| Pack | Editorial fit | Route fit | Recommendation |
|---|---|---|---|
| Classic | Strong and intentionally unchanged. Its value comes from preserving order and meaning. | Full remains the canonical experience; shorter routes must be labeled curated extracts. | Freeze question wording except clear inclusivity or correctness fixes. Do not inject newer pack mechanics. |
| First Date | Appropriate gradual ramp from light specificity to values and boundaries. It avoids early trauma and sexual pressure. | Quick is a credible default; Standard/Full support dates that naturally run longer. | After pilot sessions, watch for prompts that feel interview-like and improve them through follow-up-friendly wording. |
| Date Night | Clearly warmer and more suggestive than Classic without becoming explicit. It balances attraction, appreciation, and future novelty. | Quick and Standard fit common date contexts; Full is plausible when intentionally chosen. | Keep it sensual but non-explicit. Do not let it become a softened duplicate of Late Night. |
| Couples | Strong positive-first design with support preferences, gratitude, repair, and future choice. | Quick/check-in is useful; Standard is a realistic default for intentional time together. | Keep conflict prompts late and avoid therapeutic claims. Pilot whether Full feels emotionally tiring. |
| Friends | Distinctly platonic and strong on appreciation, support, and shared plans. | Standard is credible; Quick works for casual use. | Preserve non-romantic language and keep response cards sparse. |
| Old Friends | Its specific-memory approach is much better than generic nostalgia and does not presume reconciliation. | Standard is appropriate; Full may be long for uncertain reunions. | Make Quick especially easy to end without implying that renewed closeness is expected. |
| Deep | Meaningfully deep without relying only on trauma; identity, hope, and being understood are well represented. | No Quick is the right decision. Standard/Full match the intentional context. | Monitor emotional fatigue and keep difficult-valence prompts below roughly one third. |
| Chaos | Strongest when it uses co-creation and affiliative humor rather than performance or embarrassment. | Quick is an excellent default; Full may overextend the novelty. | Keep public dares, imitation, humiliation, and body humor out. A short secret spark can work. |
| Late Night | The questions are explicit, inclusive, and communication-centered rather than task-centered. | Quick and Standard are credible; Full needs deliberate opt-in and may run shorter or longer depending on discussion. | Keep discreet discovery, repeat consent, remove generic secret questions, and test with diverse adults before broad release. |

The full wording, route membership, and duration estimates live in the [question catalog](../content/question-catalog.de-en.md); the evidence and editorial rationale live in [question-design research](../content/question-design-research.md).

## 6. Feature audit

| Feature | Decision | Reason |
|---|---|---|
| Free Pass / “Rather not” | Keep | It is the unconditional consent and comfort control. |
| Heart-based Skip | Keep removed | It made a safety action appear costly and was redundant. |
| Replacement-question joker | Add later | It can add game value only after curated replacements exist. |
| Timer | Keep optional | Useful for route guidance, but it must remain visually secondary and never auto-advance. |
| Generic saved question in every pack | Replace | Repetition makes the private handoff feel artificial; use pack-specific private moments. |
| Question 37 label | Restrict | Literal label for Full; neutral Finale for Standard; omit extended ceremony from Quick. |
| Response cards | Keep sparse | They support responsiveness when presented as optional cues. |
| CLOSER milestone animation | Keep and improve | It can reward shared progress between acts without interrupting questions. |
| PWA manifest/fullscreen display | Keep | It removes browser chrome where the platform allows, but cannot hide OS navigation reliably. |
| Service worker/offline | Decide explicitly | Installable is not automatically offline-capable; caching introduces update risks. |
| Late Night | Reveal discreetly | The mode has product value when separate discovery and per-session consent are both enforced. |

## 7. Recommended sequence

1. Deploy the reviewed worktree and smoke-test the changed paths plus response security headers.
2. Test the deployed build on a real Android PWA and iOS Add to Home Screen; verify safe areas and system navigation rather than trying to hide them.
3. Conduct moderated sessions across all packs and routes; calibrate duration and question quality.
4. Design pack-specific private moments and only then consider a replacement-question joker.
5. Treat the frozen transition matrix and characterization suite as change-control contracts rather than reopening the controller refactor.
6. Decide on offline support and a separate `closer.radi.solutions` project after product behavior stabilizes.

## 8. Documentation decision

This review replaces dated Iteration 8/9 review files. Durable requirements are now organized by purpose:

- [gameplay and safety](../product/gameplay-and-safety.md) – authoritative product behavior;
- [question catalog](../content/question-catalog.de-en.md) – bilingual content source of truth;
- [question-design research](../content/question-design-research.md) – evidence and editorial rationale;
- [bugs](bugs.md) – reproducible defects;
- [feature requests](feature-requests.md) – additions and enhancements;
- [refactoring roadmap](../engineering/refactoring-roadmap.md) – structural engineering plan.

Git history preserves the deleted dated reports if historical detail is needed.
