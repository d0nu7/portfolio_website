# FR-020 — cross-pack evidence and question audit

**Audit date:** 17 August 2026
**Status:** Research and editorial memo; no catalog or runtime content changed
**Authoritative content snapshot:** `docs/closer/content/question-catalog.de-en.md`, updated 17 August 2026
**Scope:** Classic, First Date, Date Night, Couples, Friends, Old Friends, Deep, Chaos, Late Night, Road Trip, Family, Colleagues, and the available Students/FH Salzburg requirements draft

> **Interpretation boundary.** The non-Classic packs are original editorial products. Research can support mechanisms such as reciprocal disclosure, responsiveness, gratitude, shared remembering, or high-quality sexual communication; it does not validate these exact questions, routes, translations, mechanics, duration ranges, or the CLOSER product as an intervention.

## 1. Executive recommendation

The catalog is substantially stronger than a typical conversation-game bank. It has stable bilingual IDs, deliberately curated three-act routes, unconditional Pass, unusually clear specialist-pack boundaries, and mostly good control of gender, anatomy, relationship-form, and lifestyle assumptions. No pack needs a wholesale rewrite. The recommended course is **keep the architecture, make a small set of traceable changes, and test before claiming outcomes or calibrating time**.

The highest-priority findings are:

1. **Classic must be positioned more narrowly.** Only Full closely follows the 36-item, 45-minute research procedure. Quick and Standard are CLOSER extracts; German wording is an editorial adaptation; app mechanics, route selection, Pass, private moments, and finales are also adaptations. Aron et al. found greater immediate closeness than small talk in one laboratory comparison, not love, compatibility, relationship repair, or a lasting effect. The original authors also warned participants not to infer obligation or an expected friendship. [Aron et al. (1997)](https://doi.org/10.1177/0146167297234003)
2. **FR-005 is now coherent and implemented, but still unvalidated with users.** The 17 August catalog, gameplay contract, feature request, and owner record agree on asymmetric per-pack cards, route triggers, ephemeral/categorical state, decline paths, and no private moment for Road Trip, Family, or Colleagues. Keep the pack-specific cards pending physical-device and moderated-session validation. Two focused changes remain: make the shared `Karten zeigen / Show cards` action unambiguously mean viewing private cards, and do not stack Chaos Q16's `BOTH` twist with `chaos-private-sparks`. Classic's private moment and Question 37 remain CLOSER adaptations, not part of Aron et al.
3. **Thirty-seven atomic proposals are documented, but only a few are safety-critical.** The register includes question wording, route metadata, response cards, claims, one shared Private Moment action, and one conditional PLAYFUL interaction. The clearest changes concern `late-night-q26/q27` (ambiguous signals), `family-q14` (asking rather than inferring support), `road-trip:finale:quick` (copy that can outlive the parked/no-driver condition), `couples-q29` (remove `PREDICT`), and route access for `late-night-q34`.
4. **Couples and Old Friends have the largest route-level clustering problem.** Couples repeats good-news response in Q06/Q20 and concentrates shared-future commitments in Act III. Old Friends' shortened routes overrepresent distance and renewed contact despite the stated no-reconciliation promise. Small replacements and route swaps fix most of this.
5. **Six material DE/EN shifts need correction or cognitive testing:** `first-date-q25/q34` (German obligation versus English hope), `date-night-q25` (non-equivalent surrender/defense idioms), `friends-q24` (English problem severity), `deep-q34` (quiet versus space), and `late-night-q22` (desire/pleasure construct). Natural equivalence is the right target, but equivalence must be tested rather than asserted.
6. **Duration ranges are hypotheses.** Chaos is almost certainly too compressed at 8–12/18–25/30–40 minutes for co-creation; Deep and Late Night also have optimistic lower bounds once two answers, gates, transitions, and response cards are counted. Do not change published numbers from desk review alone. Run at least five completed sessions per pack/route as the repository proposes, report medians and spread, and call that an early pilot rather than validation.
7. **Accessibility requires an owner decision beyond wording.** A speech-only product excludes some people who sign or use AAC and may burden people with speech, language-processing, cognitive, hearing, or fatigue-related access needs. The safer architecture is "answers remain outside CLOSER" rather than "answers must be spoken," while continuing to prohibit in-app answer entry or storage. W3C guidance supports adequate time and adaptable presentation; AAC evidence also emphasizes adapting to a person's communication method, but neither source validates CLOSER. [W3C cognitive accessibility](https://www.w3.org/WAI/cognitive/), [Hanley et al. (2023)](https://doi.org/10.1177/17446295221115914)
8. **Specialist packs need specialist gates, not just friendly copy.** Late Night needs sexual-health/consent, trauma, accessibility, and legal review; Road Trip needs road-safety/human-factors and jurisdictional review; Family needs family-systems/estrangement and trauma review; Colleagues and Students/FH need employment/academic-power, privacy, accessibility, and organizational/brand review.

## 2. Scope, constraints, and method

### 2.1 Materials audited

The audit read the complete bilingual catalog and the following product-context files in full:

- `docs/closer/content/question-design-research.md`
- `docs/closer/content/question-catalog.de-en.md`
- `docs/closer/reviews/feature-requests.md`
- `docs/closer/product/gameplay-and-safety.md`
- `docs/closer/product/radi-owner-todo.md`

The catalog was treated as the wording and route source of truth. The other files were treated as requirements and design hypotheses, not scientific evidence. The catalog, gameplay contract, feature request, and owner record were re-read after their concurrent **17 August 2026 FR-005 update**: the pack-specific Private Moment matrix is approved and implemented; physical-device and moderated-session validation remains open. Runtime content was inspected to understand response-card, PLAYFUL, route, and Private Moment interactions, not as scientific evidence.

### 2.2 Search strategy

This was a structured evidence audit, **not a preregistered systematic review**. Searches covered publication inception through 17 August 2026 and used PubMed/PMC, DOI and publisher records, author/institutional manuscripts where necessary, and authoritative public guidance from W3C, NHTSA, and the Austrian government. Stable DOI, PubMed, government, or standards URLs were preferred over blogs and secondary summaries.

Representative searches included:

- `experimental generation interpersonal closeness Aron 1997 DOI`
- `self-disclosure liking meta-analysis`, `turn-taking reciprocal self-disclosure`, `perceived partner responsiveness intimacy`
- `deep conversation miscalibrated expectations`, `follow-up questions liking responsiveness`
- `capitalization positive events relationship`, `everyday gratitude romantic relationships`, `shared novel activities relationship quality`
- `humor romantic relationships meta-analysis`, `shared laughter relationship well-being`, `specific we memories closeness`, `nostalgia social connectedness`
- `sexual communication satisfaction meta-analysis`, `queer couples sexual communication dyadic 2026`, `internal external sexual consent scales`, `complexities sexual consent review`
- `family storytelling functioning`, `chosen family`, `adult sibling estrangement reconciliation`
- `psychological safety learning teams`, `employee silence`, `workplace voice power`
- `passenger conversation simulated driving`, `distracted driving official`, `Austria phone driving law`
- `translation adaptation guidelines`, `cognitive interview translated questions`, `cognitive accessibility enough time`, `AAC adult communication partners systematic review`

Included sources were meta-analyses/reviews, relevant experimental or dyadic studies, validated conceptual/measurement work, and official guidance. Excluded as evidence were commercial conversation products, unsourced popular claims, clinical techniques with no plausible transfer, and studies whose only relevance was a shared keyword. When a study concerned romantic, heterosexual, student, family-triad, workplace-team, clinical, or online populations, that boundary is stated rather than silently generalized.

Known gaps are important: no published study evaluates a CLOSER pack; no corpus of pass/abandonment/timing data exists; most pack-level recommendations rely on indirect relationship science plus editorial risk analysis; and this audit did not run a full PsycINFO/Scopus export, dual-reviewer screening, or formal risk-of-bias tool.

### 2.3 Source-quality and recommendation labels

| Label | Meaning in this memo |
|---|---|
| **Established evidence** | Replicated mechanism, meta-analysis, or strong experimental evidence, still bounded by population and outcome. |
| **Limited/indirect evidence** | Relevant primary evidence but different population, context, measure, or intervention. |
| **Professional guidance** | Authoritative safety, accessibility, translation, or public-policy guidance; not an efficacy finding. |
| **Community practice** | A traceable community-developed convention with uncertain or absent empirical evaluation; none is used as primary support for an FR-020 edit. |
| **Expert/specialist recommendation** | A named professional review judgment required for release; it must be documented separately and is not converted into scientific evidence. |
| **Editorial inference** | A transparent design judgment about pressure, redundancy, route arc, wording, or product fit. |
| **Unresolved** | Requires bilingual cognitive interview, moderated session, specialist review, or owner decision. |

Recommendation classifications use the requested vocabulary: **Keep**, **Rewrite**, **Move to another act**, **Change route membership**, **Replace**, **Remove**, **Needs user-session evidence**, and **Needs specialist review**. "Keep" never means scientifically validated.

## 3. Evidence and claim map used across packs

| Mechanism or claim | What the evidence supports | Population/design and transfer limit | CLOSER use |
|---|---|---|---|
| Progressive reciprocal disclosure | The 45-minute Aron procedure increased immediate reported closeness versus small talk in Study 1. A meta-analysis found disclosure–liking associations in several directions. [Aron et al. (1997)](https://doi.org/10.1177/0146167297234003), [Collins & Miller (1994)](https://doi.org/10.1037/0033-2909.116.3.457) | Laboratory procedure; older and culturally narrow literature; no proof of love, durable relationship change, or effect of altered lists. | Supports reciprocal turn-taking and a gradual curve, not efficacy claims for new packs. |
| Responsiveness and follow-up | Diary and experimental work links disclosure plus perceived responsiveness to intimacy; turn-taking outperformed block disclosure in getting-acquainted studies. [Laurenceau et al. (1998)](https://doi.org/10.1037/0022-3514.74.5.1238), [Sprecher et al. (2013)](https://doi.org/10.1016/j.jesp.2013.03.017), [Sprecher & Treger (2015)](https://doi.org/10.1111/pere.12090) | Mostly self-report, short interactions, and Western samples; a response card is not itself tested. | Supports alternating starters and sparse optional listening cues. |
| Deeper conversation | Experiments found people often underestimated care/enjoyment and reported more connection after deeper than shallow conversations. [Kardas et al. (2022)](https://doi.org/10.1037/pspa0000281) | Mostly strangers in structured experiments; does not mean maximum vulnerability is best or safe. | Supports a voluntary path to meaning, not trauma-heavy prompts or pressure. |
| Good-news response, gratitude, novelty | Positive-event sharing and active-constructive responses, gratitude, and shared novel/arousing activities were associated with or experimentally affected proximal relationship outcomes in specific studies. [Gable et al. (2004)](https://doi.org/10.1037/0022-3514.87.2.228), [Algoe et al. (2010)](https://doi.org/10.1111/j.1475-6811.2010.01273.x), [Aron et al. (2000)](https://doi.org/10.1037/0022-3514.78.2.273) | Predominantly cohabiting/romantic couples; some evidence is diary-correlational; asking a gratitude question is not the studied intervention. | Supports positive-first Couples/Date Night content, with no promise of repair or satisfaction. |
| Humor and shared laughter | Positive/relational humor correlated positively, and negative humor negatively, with romantic relationship satisfaction in a meta-analysis. Shared laughter correlated with well-being in 71 heterosexual romantic couples. [Hall (2017)](https://doi.org/10.1111/pere.12183), [Kurtz & Algoe (2015)](https://doi.org/10.1111/pere.12095) | Romantic samples; largely correlational; shared laughter may be an indicator, not a cause. | Indirect support for affiliative, non-humiliating Chaos prompts; no claim Chaos improves relationships. |
| Shared memory and nostalgia | Specific co-experienced memories and autobiographical memory sharing have been linked to closeness; nostalgia can increase social connectedness in experiments. [Wildschut et al. (2006)](https://doi.org/10.1037/0022-3514.91.5.975), [Beike et al. (2017)](https://doi.org/10.1080/09658211.2017.1313990), [Guan & Wang (2022)](https://doi.org/10.1177/00220221211072809) | Close-other/parent and hypothetical cross-cultural designs; not evidence for reconciliation after distance. | Supports specific-memory prompts in Friends/Old Friends/Family/Road Trip, while allowing divergent versions. |
| Sexual communication | A meta-analysis of 93 studies/38,499 people in current relationships found sexual communication associated with relationship and sexual satisfaction, with quality more strongly associated than frequency. A 2026 cross-sectional dyadic study of 112 queer couples broadened the sample but remained correlational. [Mallory (2022)](https://doi.org/10.1037/fam0000946), [Sorg et al. (2026)](https://doi.org/10.1080/00224499.2026.2630962) | Association is not causation; participants were in relationships; measures and cultures varied; neither study tested a shared-device prompt sequence. | Supports careful Late Night conversation, never claims of improved sex, arousal, or satisfaction. |
| Internal and external consent | Conceptual and measurement work distinguishes internal willingness from external communication and shows consent is contextual and multidimensional. [Muehlenhard et al. (2016)](https://doi.org/10.1080/00224499.2016.1146651), [Jozkowski et al. (2014)](https://doi.org/10.1007/s10508-013-0225-7) | Much evidence concerns US college students and consent at a prior sexual event. The scales do not validate CLOSER questions. | Supports explicit opt-in, re-checking, withdrawal, and the rule that an answer is never permission. |
| Family narratives and autonomy | Joint family storytelling variables correlated with family satisfaction/functioning in family triads; qualitative sibling-estrangement work found varied reconciliation preferences. [Koenig Kellas (2005)](https://doi.org/10.1080/03637750500322453), [Blake et al. (2023)](https://doi.org/10.1177/0192513X211064876) | Conventional family samples and correlational/qualitative designs; not an adult dyadic game or therapy. | Supports plural memories and explicit non-reconciliation framing; not healing or functioning claims. |
| Workplace voice and safety | Team psychological safety was associated with learning behavior, while interview research documents silence and fear of negative consequences. [Edmondson (1999)](https://doi.org/10.2307/2666999), [Milliken et al. (2003)](https://doi.org/10.1111/1467-6486.00387) | Organizational/team-level conditions and hierarchy; friendly prompts cannot neutralize employment power. | Supports Colleagues exclusions and voluntary peer-only use; never claim the pack creates psychological safety. |
| Road safety | A simulator study found passenger conversation adapted to traffic better than remote phone conversation, but did not test a structured game. Official guidance treats device use and distraction as road-safety risks. [Drews et al. (2008)](https://doi.org/10.1037/a0013119), [NHTSA](https://www.nhtsa.gov/campaign/distracted-driving), [Austrian government](https://www.oesterreich.gv.at/de/themen/mobilitaet/kfz/10/4/Seite.063140) | Simulator, different conversation, different jurisdictions. No evidence that Road Trip is safe while moving. | Supports the current parked/no-participating-driver release only. |
| Translation/adaptation | International guidance emphasizes construct definition, cultural adaptation, review, empirical confirmation, and documentation; cognitive interviewing can detect meaning shifts that back-translation alone misses. [International Test Commission](https://www.intestcom.org/files/guideline_test_adaptation_2ed.pdf), [US Census cognitive-testing method](https://www.census.gov/library/working-papers/2008/adrm/ssm2008-02.html) | CLOSER prompts are not psychometric tests, so the guidance is a quality analogue, not a validation path. | Use independent bilingual review plus DE/EN paraphrase interviews; do not call translations validated. |
| Cognitive and communication access | W3C guidance stresses enough time and adaptable content. AAC research emphasizes communication-partner adaptation to the person's method. [W3C](https://www.w3.org/WAI/cognitive/), [Hanley et al. (2023)](https://doi.org/10.1177/17446295221115914) | Web guidance plus an AAC review focused on adults with severe/profound intellectual disability and professional partners; transfer is indirect. | Keep timers nonbinding, all speed twists bypassable, and decide whether answers may be signed/AAC-mediated outside the app. |

## 4. Pack-by-pack decision table

| Pack | Current strength | Evidence basis | Evidence limitation | Questionable/redundant IDs | Translation issues | Intensity or route issues | Recommended action | Priority | Moderated testing before change? |
|---|---|---|---|---|---|---|---|---|---|
| **Classic** | Recognizable 36-item progressive reference; Full defaults correctly. | Original 45-minute laboratory procedure found greater immediate closeness than small talk. | Only the complete procedure/proximal outcome; no love, durability, relationship breadth, German validation, or app validation. | Question audit prohibited; positioning overreaches. | Five acknowledged DE editorial changes; not a validated translation. | Quick/Standard are unstudied extracts; Pass, styles, private moment, and finale are adaptations. | **Keep** Q01–Q36/order; rewrite positioning/citation and route labels only. | **P0 claims** | No question change; yes for label/timing comprehension. |
| **First Date** | Best low-familiarity ramp: concrete warmth → listening/values → boundaries. | Reciprocal disclosure and responsiveness plausibly support the shape. | No study validates dating outcomes, these items, or shared-device delivery. | Q27/Q35/Q36 are a close but purposeful boundary cluster. | Q25/Q34 DE obligation versus EN hope. | Quick is coherent; Standard/Full lower bounds are tight; the approved interest/preference Private Moment is well-bounded but untested. | **Rewrite** Q25/Q34 DE; **Keep** private copy pending sessions. | P1 | Yes: first-meeting pairs, private handoff, and DE/EN interpretation. |
| **Date Night** | Clear non-explicit adult identity and non-goal closeness finish. | Romantic novelty/responsiveness evidence is relevant. | Mostly romantic-couple samples; no evidence the pack creates attraction. | Q02/Q22 both compliments but differ in function; Q13 appropriately overlaps Late Night Q11 at lower explicitness. | Q25 uses non-equivalent surrender/defense idioms. | Q02 `PREDICT` and Q19 `NO THINKING` are risky; approved appreciation/future-detail private finale needs rejection/asymmetry testing. | **Rewrite** Q25; **Keep** private copy; **Needs user-session evidence** for private finale and PLAYFUL actions. | P1 | Yes: varied attraction/relationship forms and independent private choices. |
| **Couples** | Positive-first opening and useful support-preference content. | Gratitude, good-news response, responsiveness, and novelty are relevant mechanisms. | Does not establish repair, therapy, or relationship improvement by this pack. | Q06/Q20 duplicate; Q28 promise; Q25/Q26/Q29/Q30 future cluster; Q29 prediction. | No material question-text mismatch found. | `REPAIR` overclaims; Quick timing optimistic; approved listening/quality private moment fits but can feel clinical. | **Replace** Q20; **Rewrite** Q28/Act II label; **Remove** Q29 prediction; **Keep** private copy pending sessions. | **P0 mechanic/claim**, P1 content | Yes: ordinary stress only, including private-use screen; not crisis/abuse. |
| **Friends** | Explicitly platonic; strong support preferences and appreciation. | General responsiveness/positive-event evidence is relevant. | Direct friendship-intervention evidence is limited. | Q13/Q14/Q15/Q18/Q20/Q21/Q24 support cluster; Q25/Q26/Q33/Q34 future cluster. | Q24 EN is more problem-loaded than DE. | Q34 makes Quick planning-heavy; Q36 is a softer Quick closer; approved memory/celebration private finale makes Q36 duplicative in Standard. | **Rewrite** Q24; swap Q34/Q36 in **Quick only**; **Remove** Q36 response card; **Keep** private copy pending evidence. | P1 | Yes: varied age/closeness, memory disagreement, private-finale asymmetry. |
| **Old Friends** | Pack-specific concrete shared memory; explicitly allows different versions/no reconciliation. | Memory/nostalgia work supports specific remembering and possible proximal connection. | Does not establish reconnection; close-other/parent/hypothetical populations. | Q13 assumes special closeness; Q19 assumes less-contact coping; Q18/Q19/Q21 may activate estrangement. | Q13/Q19 are semantically aligned across languages but share the same presuppositions. | Quick/Standard overrepresent revival; Q34 card creates a first step; Standard-only memory-lenses private moment can activate disagreement. | **Rewrite** Q13/Q19/card; **Change route membership** Q28/Q36; **Keep** private copy pending sessions. | **P0 pressure**, P1 quality | Yes: reconnecting/non-reconnecting pairs, different memories; exclude unsafe contact. |
| **Deep** | Deliberate identity/hope/meaning design; correctly omits Quick. | Deep-conversation/responsiveness findings support voluntary depth. | No therapeutic effect, maximum-disclosure rule, or validation of these items. | Standard Q17 loss while Q15 Full-only; Q34/card implies continuing care; Q01/Q21 card invents `cost`. | Q34 `Ruhe` versus `space`. | Lower bounds optimistic; cards and approved reflection/silence private intentions can feel clinical or role-prescriptive. | **Change route membership** Q15/Q17; **Rewrite** Q34/response cards; **Keep** private copy pending sessions. | P1 | Yes: neurodivergence, role effects, varied closeness, distress-stop protocol. |
| **Chaos** | Distinctive affiliative co-creation and genuine but non-traumatic finish. | Humor/laughter findings are relevant by analogy. | Mostly correlational and romantic samples; no `any relationship` causal inference. | Q24 €10; Q26 voice-only frame; Q18/Q24/Q28 planning neighbors. | No material cross-language mismatch beyond shared design issues. | Timings likely short; approved private sparks already supplement Q16, so stacking `BOTH` is redundant; action density may increase screen focus. | **Rewrite** Q24/Q26; conditionally **Remove** Q16 `BOTH` with private sparks; **Keep** private copy pending sessions. | P1 | Yes: private handoff, stacked-mechanic confusion, phone intrusion—not funniness scores. |
| **Late Night (18+)** | Strong independent adult/voluntary gates, no secret task/action, and clear consent disclaimers. | Sexual-communication meta-analysis and consent research support careful discussion. | Satisfaction associations noncausal; consent work college-heavy; queer dyadic study cross-sectional; no shared-device validation. | Q26 ambiguity risk; Q27 lacks explicit pause; Q34 access is Full-only. | Q22 `Lust` versus `pleasure`. | Gate time omitted; Standard lacks Q34; private readiness decisions must remain ephemeral; all PLAYFUL/proxy/speed actions incompatible; Q37 must not render. | **Rewrite** Q22/Q26/Q27; **Change route membership** Q30/Q34; **Keep** independent gates; **Needs specialist review**. | **P0 safety** | Yes, after consent/sexual-health, trauma, accessibility, legal review. |
| **Road Trip** | Clear parked/no-driver contract; no distracting mechanics; broadly accessible travel framing. | Simulator evidence plus official distraction guidance support conservatism. | Passenger conversation study did not test a structured game; laws differ. | No question edit; Q02/Q09 sensory but hypothetically answerable; Quick finale outlives restriction. | No material mismatch found. | All timings apply only parked/no participating driver; no private/timer/handoff/PLAYFUL. | **Keep** Q01–Q36; **Rewrite** Quick finale; specialist review for any moving concept. | **P0 safety copy** | Yes: parked/public transport only. |
| **Family** | Plural family definition; autonomy; explicit no-therapy/no-reconciliation boundary. | Family narrative and estrangement work provide indirect context. | Conventional/correlational or qualitative samples; no healing/reconciliation inference. | Q01/Q05 assume active/shared family connection; Q14 encourages cue-reading; Q24 can elicit difficult history. | Issues are equivalent in both languages, requiring bilingual rewrites. | Quick becomes personal early; direct finale/no-private/no-PREDICT are correct. | **Rewrite** Q01/Q05/Q14; retain restricted mechanics; **Needs specialist review**. | **P0 inclusion**, P1 wording | Yes: chosen/adoptive/blended/infrequent-contact forms. |
| **Colleagues** | Strong peer-only, non-assessment, no-commitment guards; no Full/private/PLAYFUL/timer. | Workplace safety/voice research establishes contextual power and silence risks. | Team/organizational constructs; copy cannot neutralize employment power; no game validation. | Q18/Q24/Q25/Q29/Q36 can become work information. | No material mismatch found; still needs bilingual workplace comprehension. | Quick first; Standard gated; duration role/sector dependent. | **Keep** bank; **Needs user-session evidence** before Standard; **Needs specialist review**. | **P0 context gate** | Yes: voluntary peers only, never leverage/mandatory use. |
| **Students / FH Salzburg draft** | Durable Students base/versioned campus-overlay framing; excludes academic power uses. | General disclosure/context literature can inform a later design. | No questions/routes/durations/claims to audit; no evidence of institutional outcomes. | No IDs; risk is Colleagues overlap, endorsement, changing facts, academic power. | No bilingual bank exists. | Start CALM, Quick or Quick+Standard, no private/PLAYFUL/Full for symmetry. | **Keep** framing; separate research/content phase; **Needs specialist review**. | P1 planned | Required before implementation; naming/brand/local owner approval. |

## 5. Question-ID and pack issue inventory

This section records every issue found that is material enough to affect a release decision. It is deliberately narrower than a copy-edit: clear, equivalent questions are not listed merely to prove they were read. All 432 catalog questions were checked in both languages, in route context, along with act copy, finales, response cards, and declared mechanics. Exact replacement text appears only in Section 13 so that recommendations cannot be mistaken for approved catalog edits.

### 5.1 Classic

- **Q01–Q36 — Keep; immutable.** No rewriting, retranslation, reordering, shortening, or route-driven question editing is recommended. The original study tested the whole progressive procedure, not CLOSER's Quick/Standard subsets or its app mechanics. The five documented German gender-neutral editorial changes mean the DE list should not be described as a validated or verbatim translation.
- **Pack source/description — Rewrite positioning only.** `Für tiefes Kennenlernen – jede Intensität, jede Beziehung.` / `For deep connection — any intensity, any relationship.` overgeneralizes both population and outcome. The research supports greater *immediate reported closeness* after the complete laboratory procedure versus small talk; the authors expressly did not show love, friendship formation, or durability. [Aron et al. (1997)](https://doi.org/10.1177/0146167297234003)
- **Routes — Keep, but distinguish.** Full may be described as closely following the 36-question sequence. Quick and Standard must be described as curated CLOSER extracts, not validated shorter versions. Pass, styles, response cards, private moments, and any Q37 are product adaptations.
- **`classic-saved-questions` — Keep exact approved copy; adaptation audit only.** Full's before-Q28 A/B prompts, categorical `none | pending | asked | discarded` checks, and dynamic Q37 are answer-free and bounded, but are not in the original procedure. Under the immutable constraint, do not rewrite them here; physically test private handoff, discard/check comprehension, role effort, resume shields, and every finale branch.

### 5.2 First Date

- **Q25 — Rewrite DE only.** `Was soll ... bemerken` reads as what the other person *should* notice, whereas EN asks what the speaker *hopes* is noticed. This is a modal/obligation mismatch.
- **Q34 — Rewrite DE only.** The same `soll`/`hope` mismatch appears in the closing act and can turn self-description into a desired impression-management outcome.
- **Q27/Q35/Q36 — Keep as a purposeful safety cluster.** They separately address a boundary, saying no without mood-management, and a pressure-free ending. Do not collapse them without session evidence.
- **Quick route — Keep.** It samples warmth, listening/values, and boundaries without placing Q35 or a future-date assumption in the required arc.
- **`first-date-curiosities` — Keep exact approved copy; Needs user-session evidence.** Interest and everyday-preference prompts explicitly prohibit attraction, consent, compatibility testing, or another-date inference. Test whether the two roles feel equally light and whether the private/finale sequence itself adds pressure on a first meeting.

### 5.3 Date Night

- **Q25 — Rewrite both languages.** German `sich fallen lassen` can imply surrender or lowered vigilance; English `let your guard down` is not an exact equivalent and carries the same avoidable vulnerability ideal. Ask instead about safety and ease with closeness.
- **Q02/Q22 — Keep.** Both concern compliments, but Q02 asks what stays with the person and Q22 asks for a flirtatious compliment tonight. Their act positions and interpersonal stakes differ.
- **Q02 `PREDICT` and Q19 `NO THINKING` — Needs user-session evidence.** Guessing which compliment matters risks turning a preference into a partner-knowledge test; speed-answering a sensory preference may exclude slower processors. Q32 `BOTH` is less risky because it asks for an individual non-goal form of closeness rather than a correct guess.
- **`date-night-appreciation` — Keep exact approved copy; Needs user-session evidence.** The non-body appreciation is bounded. The possible future-date detail expressly says it is neither plan nor invitation, but unequal hopes can still make the two-turn reveal feel rejecting. Test private decline, one-sided sharing, and the skipped finale without asking which person declined.

### 5.4 Couples

- **Q06/Q20 — Replace Q20.** Both ask how the partner should respond to the speaker's good news. Repetition does not reproduce the active-constructive-response paradigm and crowds out perspective-taking after misunderstanding. The supporting study does not validate either item. [Gable et al. (2004)](https://doi.org/10.1037/0022-3514.87.2.228)
- **Q28 — Rewrite.** Asking for a weekly `Versprechen`/`promise` conflicts with the product rule that no answer creates an obligation. Convert it to an optional, nonbinding change.
- **Q29 `PREDICT` — Remove.** A wrong prediction about a desired future experience can read as deficient partner knowledge; the base question can remain sequential.
- **Act II `REPARIEREN / REPAIR` — Rewrite label.** The questions elicit needs, pauses, apologies, and support preferences; they do not repair a relationship. Gratitude, capitalization, and responsiveness findings do not authorize a therapeutic outcome claim. [Algoe et al. (2010)](https://doi.org/10.1111/j.1475-6811.2010.01273.x), [Laurenceau et al. (1998)](https://doi.org/10.1037/0022-3514.74.5.1238)
- **Q25/Q26/Q29/Q30 — Keep as a monitored future cluster.** Each has a different horizon, but test whether Act III feels like planning homework.
- **`couples-listening` — Keep exact approved copy; Needs user-session evidence.** It is a listening intention plus a non-reciprocal quality, not a secret repair task. Test whether `difficult answer`, reflection, and the after-Act-II use screen feel clinical, corrective, or like performance of good listening.

### 5.5 Friends

- **Q24 — Rewrite both languages.** DE asks what a friend may sit with; EN asks `What are you dealing with`, which presupposes a problem and is more exposing. A parallel `current topic` construction preserves optionality.
- **Q34/Q36 — Change Quick membership only.** Q34 turns the Quick closer into year-ahead joint planning; Q36 is a concrete gratitude alternative. Keep Q34 in Standard because its approved Private Moment already ends Standard with memory/celebration; adding Q36 there would stack appreciation. Represent Q34 as Standard/Full and Q36 as Quick/Full, or list route arrays explicitly.
- **Q36 response card — Remove pending evidence.** Requiring a reflection immediately after thanks can feel scripted and shifts a warm closer into a comprehension check. The question itself already invites specific appreciation.
- **Q13/Q14/Q15/Q18/Q20/Q21/Q24 — Keep as differentiated support content.** The cluster covers support type, recognizing advice/company, listening behavior, useful follow-up, good-news response, hard-day response, and no-solution presence. Monitor repetition and pass clustering rather than deleting by semantic count alone.
- **`friends-memory-celebration` — Keep exact approved copy; Needs user-session evidence.** Its explicit allowance for different memory meaning, privacy, non-reciprocation, and no promise is strong. Test whether A's memory and B's celebration feel equally valued and whether absent/different memories make either role awkward.

### 5.6 Old Friends

- **Q13 — Rewrite both languages.** `seit wir uns besonders nah waren` / `since ... especially close` presupposes a peak of mutual closeness. The pack explicitly allows old friends who do not define the past that way.
- **Q19 — Rewrite both languages.** The current question presupposes less contact and successful coping. Make the premise conditional and ask about experience rather than a successful strategy.
- **Q28/Q36 — Change route membership.** Move revival/reinvention Q28 from Quick and Standard to Full; add present-day appreciation Q36 to Quick and Standard. This makes the route more neutral toward reconnection.
- **Q34 response card — Rewrite.** `first step` converts a hypothetical memory into a plan. Ask what would matter about the idea without requiring enactment.
- **Q18/Q19/Q21 — Keep Full/conditional as routed, then test.** These can activate distance, old assumptions, or estrangement. The qualitative estrangement literature shows no universal preference for reconciliation. [Blake et al. (2023)](https://doi.org/10.1177/0192513X211064876)
- **`old-friends-memory-lenses` — Keep exact approved copy; Needs user-session evidence.** `your memory, not evidence`, `your perspective, not a correction`, and no correct version are appropriate. Test the Standard-only immediate use when no shared memory arose or the pair silently anchored to different scenes.

### 5.7 Deep

- **Q15/Q17 — Change route membership.** Standard currently includes loss (`Q17`) while the less acute but still reflective compliment-reception question (`Q15`) is Full-only. Swap them: Q15 Standard/Full, Q17 Full.
- **Q34 — Rewrite EN and its response card.** DE offers `Ruhe`, meaning quiet; EN offers `giving you space`, meaning distance/autonomy. Use `quiet` for equivalence. The response card's `künftig / from now on` implies a continuing care commitment; reframe it as an optional one-sentence understanding with no commitment.
- **Q01/Q21 response card — Rewrite.** `what ... cost` adds adversity that Q01 does not contain and Q21 need not foreground. Honor what the moment means without inventing cost.
- **Q17 — Keep available in Full.** Deep conversation evidence does not justify deleting loss, but neither does it make loss necessary for a 24-item Standard route. [Kardas et al. (2022)](https://doi.org/10.1037/pspa0000281)
- **`deep-listening` — Keep exact approved copy; Needs user-session evidence.** The reflection/silence intentions correctly prohibit diagnosis and demanded disclosure, but stable A/B roles may produce noticeably different response styles. Test whether the hidden instruction feels helpful, artificial, or evaluative and whether the use screen supports recovery.

### 5.8 Chaos

- **Q24 — Rewrite both languages.** A fixed ten-euro maximum is currency- and purchasing-power-specific. Preserve the constraint as `what is available to you`; retain no-dare/no-humiliation safeguards.
- **Q26 — Rewrite both languages.** Requiring a voice message is an unnecessary speech/hearing and modality assumption when the creative object can simply be a short message.
- **Q16 `BOTH` with `chaos-private-sparks` — Remove the stacked twist.** In Standard/Full, the approved private moment already adds two hidden constraints immediately before a base question that says `Erfindet gemeinsam / Invent ... together`. Use the joint base question plus optional sparks, without another `BOTH` presentation. Quick has no private moment and can retain ordinary PLAYFUL eligibility if separately tested.
- **Q18/Q24/Q28 — Keep as differentiated co-creation, monitor density.** They concern an immediate unprepared adventure, a resource-constrained feasible adventure, and a silly shared idea. Test whether the sequence returns too much attention to the phone.
- **`chaos-private-sparks` — Keep exact approved copy; Needs user-session evidence.** The constraints are genuinely asymmetric, harmless, ignorable, and immediately discarded. Test whether not knowing the other constraint aids play or creates avoidable instruction-tracking.

### 5.9 Late Night (18+)

- **Q22 — Rewrite both languages.** DE asks what builds `Lust` (desire/arousal), while EN asks what builds `pleasure`; neither outcome should be implied as required. Ask neutrally what role pace, repetition, variety, or pauses play in the person's sexual experience.
- **Q26 — Rewrite both languages.** `words or signals` can be read as approving ambiguous nonverbal inference. Ask for clear words or deliberately agreed signals; this still does not turn a stated preference into consent.
- **Q27 — Rewrite both languages.** Make pause explicit whenever a signal is unclear, followed by a check-in. Consent scholarship describes willingness and communication as contextual and multidimensional; it does not validate a universal cue set. [Muehlenhard et al. (2016)](https://doi.org/10.1080/00224499.2016.1146651), [Jozkowski et al. (2014)](https://doi.org/10.1007/s10508-013-0225-7)
- **Q30/Q34 — Change Standard membership.** Move the broad `must never be assumed` question Q30 to Full and bring Q34's physical needs/sensitivities/accessibility into Standard. Q31 still keeps concrete safer-sex conversation in Standard. This change requires specialist and moderated review; it is not a claim that Q34 captures all disability or access needs.
- **Generic Q37 — Keep absent.** Late Night uses independent readiness gates and its exact direct safety finale; no saved-question/secret-task branch may render. No PLAYFUL, proxy answer, simultaneous answer, speed action, touch task, or action expectation is compatible with this pack.
- **Independent readiness/consent gates — Keep exact approved copy; Needs specialist review and user-session evidence.** The 17 August flow makes A/B choices independently, persists neither decision, reveals only a collective result, restarts an interrupted gate, and ends neutrally after either decline. Verify shoulder-surfing, focus/resume, equal visual prominence, comprehension that the choice covers conversation only, and the direct finale.

### 5.10 Road Trip

- **Q01–Q36 — Keep.** No question-level flaw justifies pre-pilot editing. Sensory questions Q02/Q09 can be answered hypothetically and do not require a particular ability.
- **Quick finale — Rewrite.** `Let the conversation continue—or simply enjoy the road` may persist after the parked/no-driver contract ends. End the round and repeat that a participant who resumes driving does not handle/read the phone.
- **All routes — Keep restricted.** Passenger conversation adapted to road demands better than remote phone conversation in one simulator study, but that does not establish the safety of a structured shared-device game. [Drews et al. (2008)](https://doi.org/10.1037/a0013119), [NHTSA](https://www.nhtsa.gov/campaign/distracted-driving)

### 5.11 Family

- **Q01 — Rewrite both languages.** The declarative `thing connects you` presupposes an active connection. Ask whether there is such a thing, and allow merely being brought to mind.
- **Q05 — Rewrite both languages.** `eurer / your ... family` presupposes a shared family version. Ask about each person's own idea of family; this better matches chosen, blended, adoptive, infrequent-contact, and differently understood ties.
- **Q14 — Rewrite both languages.** Asking how the other person can *tell* support versus space encourages cue-reading. Ask how they should check. The response remains a preference, not a standing instruction.
- **Q02/Q24 — Keep, test carefully.** Q02 invites a shared story but allows the speaker to say none comes to mind; Q24 may surface difficult history and remains Full-only. Family-narrative findings are correlational and from more conventional family samples, not evidence of healing. [Koenig Kellas (2005)](https://doi.org/10.1080/03637750500322453)

### 5.12 Colleagues

- **Q01–Q36 — Keep wording pending sessions.** No desk rewrite can neutralize workplace power. Q18 (capacity), Q24 (availability), Q25 (strength), Q29 (recognition), and Q36 (working preference) can become work information despite the non-assessment copy.
- **Standard route — Needs user-session evidence before release.** Pilot Quick first among voluntary peers. Do not infer psychological safety from completion or positive ratings: organizational psychological safety is a team/context condition, and silence research documents perceived negative consequences. [Edmondson (1999)](https://doi.org/10.2307/2666999), [Milliken et al. (2003)](https://doi.org/10.1111/1467-6486.00387)
- **Mechanics — Keep restricted.** No Full, private moment, PLAYFUL, timer pressure, manager/report pairing, assessment use, mandatory workshop use, or promise-making.

### 5.13 Students / FH Salzburg

- **No question-ID audit is possible.** The feature request is a requirements draft, not a pack. It has no approved questions, bilingual catalog, curated routes, duration model, finales, or claims.
- **Keep base/overlay split.** Build a durable Students base first and version the FH Salzburg overlay separately. Do not copy Colleagues prompts wholesale: student belonging, peer interaction, academic power, and institutional endorsement require their own research and testing.
- **Initial mechanics — Conservative proposal.** CALM only; Quick-only or Quick+Standard; no Full, private moment, PLAYFUL, timer pressure, staff/student or assessor/student pairings, or institutional-outcome claims. FH naming/logo/local facts require an accountable campus owner and explicit approval.

## 6. Cross-pack duplication and differentiation

The catalog does not contain many word-for-word duplicates. It does contain recurring constructs. That is expected in a relationship-neutral library, but the clusters below should be tracked so a future mixed-pack or recommendation feature does not serve near-neighbors back-to-back.

| Cluster | Principal IDs | Audit judgment | Product rule |
|---|---|---|---|
| **Good-news response** | Couples Q06/Q20; Friends Q08/Q20; Colleagues Q19 reserve | Couples Q06/Q20 are true within-pack duplication; replace Q20. Friends separates good-news content from preferred response. Workplace support is context-specific. | Deduplicate Couples. Add a cross-pack semantic tag such as `positive_event_response`; avoid consecutive delivery in mixed mode. |
| **Support without immediate fixing** | Couples Q14/Q17/Q24; Friends Q13/Q14/Q21/Q24; Deep Q20/Q24/Q34; Old Friends Q20/Q23; Colleagues Q19 reserve | Mostly legitimate context adaptations, but dense in Friends/Deep. | Tag `support_preference` and `listen_before_solve`; session-test perceived repetition within each route. |
| **Recognition/compliment** | First Date Q19; Date Night Q02/Q22; Couples Q12; Friends Q22/Q36; Deep Q15; Chaos Q22; Family Q25; Colleagues Q29 | Legitimate differences in source, flirtation, gratitude, self-reception, humor, family, and workplace context. | Keep; never describe compliments as an evidence-based intervention merely because gratitude/laughter studies exist. |
| **Shared future/activity** | Date Night Q21/Q35; Couples Q25/Q26/Q28–Q30; Friends Q25/Q26/Q33/Q34; Old Friends Q25/Q28/Q32/Q34; Chaos Q18/Q24/Q28/Q36; Road Trip Q25/Q26/Q29/Q31/Q32/Q35; Family Q28/Q32 | Highest pressure and fatigue cluster. Different packs often converge on planning in Act III. | Apply a `future_plan` tag; never stack more than one in Quick; maintain explicit hypothetical/no-obligation wording. |
| **Seen/misunderstood identity** | First Date Q22/Q24/Q25/Q30; Couples Q11/Q15; Friends Q11/Q12/Q29; Old Friends Q14–Q17/Q23/Q24/Q30/Q35; Deep Q02/Q04/Q05/Q08/Q10–Q12/Q16/Q29/Q31/Q33; Chaos Q20/Q29/Q30/Q32; Family Q15–Q17/Q20/Q21; Colleagues Q25/Q36 | Core theme rather than accidental duplication; intensity varies markedly. | Tag `identity_seen`; preserve act/route differences and avoid recommending Deep merely because a person completed a lighter variant. |
| **Specific memory** | Classic Q17/Q18; Date Night Q05/Q10/Q32; Friends Q04/Q10; Old Friends Q01–Q12; Road Trip Q13/Q14/Q17/Q19–Q21/Q24/Q28/Q36; Family Q02/Q06/Q08/Q09; Chaos Q31/Q35 | Pack specificity usually differentiates the same mechanism. Old Friends and Road Trip are intentionally memory-led. | Tag memory valence and whether it presupposes co-experience; allow divergent memories and `none comes to mind`. |
| **Boundary/no/check-in** | First Date Q27/Q32/Q35; Date Night Q26/Q28/Q31/Q33; Couples Q18/Q21; Friends Q23; Old Friends Q25/Q33; Late Night Q25–Q35; Family Q14/Q18/Q19/Q22/Q23/Q27/Q29/Q30/Q31; Colleagues Q18/Q24 | Safety repetition is often desirable, especially across contexts. Late Night is uniquely specific. | Do not globally deduplicate. Never transfer a yes/no answer across questions or sessions. |
| **Classic surface overlap** | Classic Q04 vs First Date Q01; Classic Q16 vs Friends Q07; Classic Q17 vs memory packs; Classic Q31 vs appreciation items | Classic remains immutable. Newer questions are more contextual and less archaic/assumption-heavy. | Preserve Classic. Use content analytics to prevent a user who just played Classic receiving obvious neighbors, rather than rewriting Classic. |

No overlap justifies claiming that all packs instantiate the Aron procedure. Reciprocity, gradual depth, specificity, and responsiveness are design influences; the newer packs are original research-informed adaptations.

## 7. German–English equivalence audit

### 7.1 Material mismatches

The material mismatches are First Date Q25/Q34 (`soll` versus `hope`), Date Night Q25 (`sich fallen lassen` versus `let your guard down`), Friends Q24 (neutral `Thema` versus problem-loaded `dealing with`), Deep Q34 (`Ruhe` versus `space`), and Late Night Q22 (`Lust` versus `pleasure`). Exact corrections are in Section 13.

Several non-material variants are idiomatic rather than literal and can remain: First Date Q07 `small recent moment made you feel proud` is a natural rendering; Couples Q31's English conditional is slightly smoother than DE but retains the ordinary-future-day construct; Chaos Q28 uses `What could you do together` for `Welcher gemeinsame Plan`, preserving hypothetical meaning; Family Q36 `next chapter` is an idiomatic `Lebensabschnitt`. These should still appear in cognitive interviews.

The complete 17 August FR-005 shell and pack-specific Private Moment copy was rechecked in both languages. No additional material DE/EN meaning mismatch was found in the A/B cards, handoffs, use screens, decline/accepted results, or finales. The shared action `Karten zeigen / Show cards` is semantically aligned but ambiguous in the same privacy-relevant direction in both languages; Section 13 proposes `Private Karten ansehen / View private cards`. Product approval is not translation validation, so every private branch remains in the cognitive-interview sample.

### 7.2 Translation process required before release

Independent bilingual review, not machine translation or back-translation alone, should adjudicate construct, presupposition, agency, politeness, emotional intensity, and naturalness. In separate DE and EN cognitive interviews, participants should paraphrase the question and explain what kind of answer it invites **without being required to disclose the answer itself**. Log whether `we/you`, relationship labels, time horizons, modality, and obligation differ. The International Test Commission guidance is an analogue rather than a claim that CLOSER is a psychometric test. [International Test Commission](https://www.intestcom.org/files/guideline_test_adaptation_2ed.pdf), [US Census cognitive-testing method](https://www.census.gov/library/working-papers/2008/adrm/ssm2008-02.html)

Classic DE requires a separate label: it is a documented editorial translation with five gender-neutral deviations, not a validated German administration of the 1997 study.

## 8. Intensity, route, and duration audit

### 8.1 Route-shape decisions

- **Keep:** Classic question order; First Date Quick; Date Night routes; Road Trip routes; Family route shape apart from wording; Colleagues Quick-first; no Deep Quick; no Colleagues Full.
- **Change before broad release:** Friends Quick Q34/Q36; Old Friends Q28/Q36; Deep Q15/Q17; Late Night Q30/Q34.
- **Mechanic-specific intensity:** Styles, response cards, and private handoffs can raise intensity even when the base question is unchanged. Route review must score `question + action + response card + private moment + finale`, not question text alone.
- **Specialist routes:** Late Night, Road Trip, Family, Colleagues, and Students/FH remain behind their documented audience/context checks. A route name is not a safety classification.

### 8.2 Duration estimates

No catalog duration is empirically calibrated. The following are **planning bands for session recruitment and instrumentation**, not replacement promises. They assume two spoken turns per question, normal pauses, handoffs, passes, gates, and occasional follow-up. Do not publish them until observed session distributions exist.

| Pack | Catalog estimate | Conservative audit planning band | Decision |
|---|---|---|---|
| Classic | 20–30 / 35–50 / 45–75 | Keep for now; compare Full with the original 45-minute procedure context | Instrument all routes; label shorter routes extracts. |
| First Date | 15–20 / 25–35 / 45–60 | 15–25 / 30–45 / 50–75 | Standard/Full lower bounds look optimistic; include Private Moment time. |
| Date Night | 15–20 / 25–40 / 45–70 | 15–25 / 30–50 / 50–80 | Include action-card and Private Moment time. |
| Couples | 12–18 / 25–40 / 50–75 | 15–25 / 30–50 / 55–85 | Conflict/support turns and the Standard/Full private-use screen may be longer. |
| Friends | 15–20 / 30–45 / 50–70 | 15–25 / 35–55 / 60–90 | Support/memory stories and the Standard/Full private finale add time. |
| Old Friends | 15–20 / 25–40 / 50–75 | 20–30 / 35–55 / 60–95 | Specific memories, time-apart context, and Standard memory lenses are narration-heavy. |
| Deep | — / 30–45 / 60–90 | — / 40–60 / 70–110 | Private listening intentions, silence, passes, and recovery time are valid use. |
| Chaos | 8–12 / 18–25 / 30–40 | 12–18 / 25–35 / 40–55 | Collaborative invention and the Standard/Full Q16 private handoff are slower than a simple answer. |
| Late Night | 15–20 / 25–40 / 40–60 | 20–30 / 35–50 / 55–75 | Include two-person gates and unhurried consent/boundary answers. |
| Road Trip | 15–20 / 30–45 / 50–70 | Keep as recruitment bands only | Test only within the release's parked/no-driver context. |
| Family | 15–25 / 30–50 / 55–85 | Keep as recruitment bands only | Sample family forms/contact patterns before revision. |
| Colleagues | 15–25 / 30–50 / — | Keep as recruitment bands only | Quick pilot first; workplace context drives variance. |
| Students/FH | None | No estimate | Set only after a bank and route exist. |

Observed elapsed-time percentiles should replace intuition. Report median, interquartile range, P90, route completion, passes, early endings, and time per question; never turn the displayed estimate into a countdown.

## 9. Inclusion, accessibility, and context audit

- **Answer mode:** Product policy should explicitly allow speech, signing, AAC, typing by the participant, drawing/gesture where mutually understood, or a trusted communication method. A partner must not answer on someone's behalf unless the person explicitly directs that facilitation. This is professional/accessibility guidance, not evidence that CLOSER is accessible to every user. [Hanley et al. (2023)](https://doi.org/10.1177/17446295221115914)
- **Processing time:** `NO THINKING`, countdown language, automatic progress, and forced simultaneous answers must always be bypassable. The interface needs pause, repeat, persistent Pass/End, no inactivity penalty, and enough time. [W3C cognitive accessibility guidance](https://www.w3.org/WAI/cognitive/)
- **Sensory assumptions:** Chaos Q26 should not require voice; Playful eye-contact or whisper actions need non-visual/non-auditory alternatives. Road Trip must not add sighting tasks, alerts, or audio surprises. Late Night Q34 belongs in Standard so access needs are not a Full-only afterthought.
- **Relationship plurality:** Keep First Date's no-outcome framing; Date Night and Couples must not assume marriage, monogamy, cohabitation, sex, or permanence; Friends stays explicitly platonic; Old Friends does not require renewed contact; Family includes chosen/adoptive/blended ties and no reconciliation; Late Night does not infer orientation, anatomy, orgasm, exclusivity, experience, or future action.
- **Economic/cultural reach:** Replace Chaos's fixed €10. Avoid passports, flying, alcohol, home ownership, parenthood, holidays, or shared-childhood defaults unless conditional. Memory sharing varies by cultural context, so do not treat elaboration or agreement as the quality metric. [Guan & Wang (2022)](https://doi.org/10.1177/00220221211072809)
- **Power and coercion:** Colleagues and Students/FH cannot be made voluntary by copy when a manager, teacher, assessor, mentor, client, scholarship decision-maker, or event organizer controls consequences. Exclude those pairings from initial release. Late Night needs independent adult/voluntary confirmation and a neutral end after either decline.
- **Distress and safety:** Deep, Old Friends, Family, and Late Night tests need a non-probing stop protocol and neutral recovery screen. Do not recruit pairs in active abuse, coercion, crisis, or unsafe contact to prove safety. The app is not therapy, mediation, or crisis support.

## 10. Response cards, private moments, PLAYFUL, and finales

### 10.1 Response cards

Response cards are plausible applications of responsiveness research, not tested micro-interventions. They must remain optional, short, non-clinical, and never require agreement, disclosure, action, repair, or memory accuracy. Recommended release edits are: remove Friends Q36 REFLECT; rewrite Old Friends Q34 FOLLOW UP; soften Deep Q01/Q21 CELEBRATE and Q34 REFLECT. Keep Friends Q08/Q33 CELEBRATE, Q18 FOLLOW UP, Q21/Q24 VALIDATE; Old Friends Q02/Q04 FOLLOW UP, Q12 REFLECT, Q20/Q30 VALIDATE; Deep Q13 FOLLOW UP and Q17/Q19/Q24 VALIDATE pending sessions.

### 10.2 Private moments

FR-005 is no longer an unresolved generic saved-question concept. On 17 August 2026, RaDi approved and the product implemented an authoritative pack/route/trigger/use matrix with asymmetric A/B content, shared skip, private decline, named handoff covers, no private free text, categorical/ephemeral state, resume shielding, and irreversible discard. That is a materially stronger design contract; it is still **product-approved, not empirically validated**. The shared shell and every eligible pack need physical-device, accessibility, privacy, and moderated-session validation.

The shared action `Karten zeigen / Show cards` is the only shell copy recommended for immediate rewriting: it can sound as though the cards will be shown to both people. Use `Private Karten ansehen / View private cards` and retain the existing named covers. All other shared shell copy can remain pending sessions.

| Pack | Approved 17 August contract | FR-020 audit | Recommendation and validation gate |
|---|---|---|---|
| Classic | Optional Full; before Q28; A open follow-up/B unheard perspective; categorical check after Q36 and dynamic Q37 | Properly category-only and answer-free, but wholly a CLOSER adaptation. B's `unheard perspective` may be cognitively harder than A's curiosity task. | **Keep** exact copy under Classic immutability; label as adaptation. Test handoff privacy, A/B task equivalence, discard/check states, and every Q37 branch. |
| First Date | Optional Standard/Full after Act I; A interest follow-up/B everyday preference; two-turn finale | Strong no-attraction/no-consent/no-next-date boundaries; roles are plausibly low-stakes but not identical in effort. | **Keep** exact copy; test one/both declines, no-interest answer, impression-management pressure, and finale length. |
| Date Night | Optional Standard/Full after Act I; A non-body appreciation/B possible future-date detail; two-turn finale | Explicit no-invitation/no-plan/no-consent wording is strong. The asymmetric reveal can still expose unequal interest. | **Keep** exact copy; test non-reciprocation, perceived rejection, private retention, and neutral ending. |
| Couples | Optional Standard/Full after Act I; A listening intention/B positive quality; shared use after Act II | Avoids a secret repair assignment, promise, or behavior contract. Reflection/quality language may nevertheless feel therapeutic or evaluative. | **Keep** exact copy; test ordinary-stress dyads for clinical tone, performance pressure, and whether appreciation minimizes difficulty. |
| Friends | Optional Standard/Full after Act II; A memory/B celebration; two-turn finale | Explicitly permits different memory meaning, privacy, and no reciprocity. A/B contributions may feel unequal; Standard Q36 would duplicate appreciation. | **Keep** exact copy; use Q36 only in Quick/Full if the proposed route swap is adopted. Test absent/different memory and asymmetric value. |
| Old Friends | Optional Standard only after Act I; A sensory detail/B feeling or present meaning; immediate use | `my memory, not evidence` and no-correct-version framing are strong. Both people may silently anchor to different memories, and any memory task can intensify estrangement. | **Keep** exact copy; test explicit `none came up`, divergent scenes, safe decline, and non-reconciliation contexts. |
| Deep | Optional Standard/Full after Act I; A reflects/B allows silence; shared close after Act II | Appropriate anti-diagnosis/no-more-disclosure wording. Stable hidden roles may produce noticeably different response behavior and feel like a technique. | **Keep** exact copy; test role effects, slower/AAC communication, clinical tone, and the end-versus-continue recovery choice. |
| Chaos | Optional Standard/Full immediately before Q16; two hidden creative constraints; discard at Q16 exit | Harmless, genuinely asymmetric, ignorable, and transient. The base question is already joint; adding `BOTH` creates three stacked instructions. | **Keep** private copy; **Remove** `BOTH` whenever `chaos-private-sparks` is active. Test recall load, handoff cost, and screen intrusion. |
| Late Night | Required independent readiness at entry and after Act I; in-memory decisions; collective result; no secret task; direct safety finale | Strongest privacy/consent lifecycle. It correctly limits consent to conversation, conceals who declined, restarts incomplete gates, and never enters generic Q37. | **Keep** exact copy subject to consent/sexual-health, trauma, accessibility, privacy, and legal review; verify equal visual prominence and background/resume behavior physically. |
| Road Trip | None | Correct for attention and device safety. | **Keep none**; reopening requires a separate road-safety decision. |
| Family | None | Correct given family pressure, role expectations, and possible unsafe contact. | **Keep none**; reopening requires a separate family-safety decision. |
| Colleagues | None | Correct because a private card cannot neutralize organizational power or confidentiality risk. | **Keep none**; reopening requires employment/privacy review. |
| Students/FH draft | No implemented decision | Academic power and institutional endorsement make hidden prompts premature. | **None in the initial design**; revisit only after a question bank, audience boundary, and specialist review exist. |

### 10.3 PLAYFUL assignments

PLAYFUL is an interaction risk layer, not merely a tone. Current declared candidates require this disposition:

- **Keep pending sessions:** First Date Q29/Q35 `STAY`, Q22 `DEEPER`; Date Night Q21 `DEEPER`, Q29/Q33 `STAY`, Q32 `BOTH`; Couples Q03 `NO THINKING`, Q09 `BOTH`, Q15/Q22 `STAY`, Q31 `DEEPER`; Friends Q04 `BOTH`, Q24 `STAY`, Q30 `DEEPER`; Old Friends Q20 `STAY`, Q30 `DEEPER`; Deep Q12 `DEEPER`, Q19/Q31 `STAY`; Chaos Q02 `PREDICT`, Q07 `BOTH`, Q28 `NO THINKING`, Q34 `DEEPER`.
- **Remove now:** Couples Q29 `PREDICT`.
- **Needs focused evidence:** Date Night Q02 `PREDICT` and Date Night Q19 `NO THINKING`. Prediction must never score partner knowledge; `NO THINKING` needs a visible slower-answer alternative.
- **Conditionally remove:** Chaos Q16 `BOTH` whenever the Standard/Full `chaos-private-sparks` moment is active. Quick has no private moment; any remaining `BOTH` presentation still needs a modality that does not force speech, eye contact, or synchronized speed.
- **Disable:** all PLAYFUL for Late Night, Road Trip, Family, Colleagues, and first Students/FH release. Classic question content remains outside this audit; any app style must be described as an adaptation.

### 10.4 Finales and Q37

- The approved route-specific semantics now govern: Quick ends directly except Late Night's direct safety reminder; Classic Full alone uses the categorical saved-question Q37; First Date, Date Night, and Friends use their optional two-turn finales on Standard/Full; Couples, Old Friends, Deep, and Chaos consume private content at their earlier pack-specific use point; Road Trip, Family, and Colleagues use direct finales; Late Night never enters generic Q37.
- `End here` must be equally prominent, and one person's end choice ends neutrally. No finale may require reciprocity, agreement, a plan, a promise, touch, eye contact, or explanation for passing.
- Rewrite Road Trip Quick. Keep Late Night out of generic Q37 and retain its direct safety finale. Keep Family and Colleagues direct finales and their no-private rules. Test all First Date/Date Night/Friends one-sided and skipped branches; test Classic's `none/pending/asked/discarded` checks without storing the question itself.
- An answer to a private/finale question is information, never permission for an action. This must be repeated for Late Night and encoded as a general product invariant.

## 11. Claims and public positioning

### 11.1 Claims the product must avoid

- `scientifically proven questions`, `validated pack`, `validated German/English translation`, or `based on 36 questions that make people fall in love`;
- promises that a pack builds, deepens, repairs, heals, reconnects, creates psychological safety, improves sex/satisfaction, prevents conflict, treats trauma, or produces a lasting relationship outcome;
- `safe while driving`, `distraction-free`, `trauma-informed`, `therapy-grade`, `accessible/inclusive for everyone`, or duration guarantees;
- citing a study beside a new question in a way that implies the item, sequence, route, app mechanic, or population was tested;
- using `no pressure`, `safe`, or `consensual` as an observed fact rather than a design aim and a condition that depends on context.

### 11.2 Defensible wording

- `Research-informed conversation design` or `adapted from findings on reciprocal disclosure, responsiveness, gratitude, memory, or communication`, followed by the relevant population and limitation.
- `The Classic Full route closely follows the 36-question sequence used in Aron et al. (1997); CLOSER's shorter routes and app mechanics are adaptations.`
- `Designed to reduce pressure` and `includes Pass and End controls`; not `pressure-free` unless user evidence supports how it is experienced.
- `In the cited study...` followed by the measured proximal result, sample/context, comparison, and noncausal/transfer boundary.
- `Estimated play time` once calibrated, with `take as long as you need` and no countdown.

All public research copy needs a source owner, stable link, access date where web guidance may change, and a review trigger when content, mechanics, routes, or population claims change.

## 12. Validation plan and release gates

### 12.1 Moderated session design

Run separate CALM and eligible PLAYFUL sessions. An early directional minimum is **five completed dyads per pack/route/language condition**, but this is not representative and cannot establish safety or efficacy. Recruit intentionally across relationship form, age, disability/communication method, cultural and linguistic background, familiarity, and relevant pack context. Specialist packs require their named reviewers before sessions.

Do not record or code the substance of intimate answers unless separately, explicitly consented and essential. Prefer operational observations: comprehension request, Pass, End, pause, screen dwell, handoff difficulty, action opt-out, mechanic confusion, and recovery need. After play, separately ask each participant to rate relevance, clarity, felt pressure, experienced intensity, phone intrusion, feeling heard, emotional recovery, and likelihood of choosing that route again; ratings describe experience, not relationship improvement.

### 12.2 Bilingual cognitive interviews

For every proposed rewrite and a stratified sample of retained questions, ask DE and EN participants to paraphrase, identify the assumed relationship/context, name whether action or disclosure feels expected, and compare lighter/deeper neighboring questions. Use independent bilingual adjudication. A mismatch is material when it changes agent, obligation, intimacy, time horizon, valence, modality, or what counts as an answer.

### 12.3 Decision thresholds and stop rules

- **Automatic review:** repeated paraphrase mismatch; two or more participants in a small cell reading an answer as a promise/consent test; concentrated Pass/End at the same ID; a route consistently exceeding its band; visible distress without easy recovery; inaccessible mechanic with no equivalent path; or a specialist identifying a foreseeable harm.
- **Do not average away:** one credible coercion, workplace-retaliation, road-safety, sexual-consent, or privacy failure. Pause that feature path and review it.
- **Release gate:** resolved P0 wording/mechanics; bilingual equivalence sign-off; specialist sign-off where named; physical-device verification; successful FR-005 handoff/resume/decline/finale branch validation; analytics limited to operational events; and public claims checked against Section 11.
- **Post-release:** monitor Pass/End and abandonment by pack/route/question without storing answer content; review semantic-repeat exposure; provide an accessible feedback route; re-audit whenever a question, route, style, response card, gate, finale, or claim changes.

## 13. Exact proposed bilingual content-change register

This is the only proposed-edit register. **Nothing in it is approved merely by appearing here.** Every entry names a stable content or editorial ID, quotes the current DE/EN exactly, supplies exact proposed DE/EN, and states classification, basis, downside, and gate. Question IDs follow the catalog's stable `pack-qNN` convention. Editorial IDs after a colon are introduced here so non-question changes can be reviewed and implemented atomically.

### 13.1 Positioning, question wording, and act labels

#### `classic:blurb`

- **Current DE:** „Für tiefes Kennenlernen – jede Intensität, jede Beziehung.“
- **Current EN:** “For deep connection — any intensity, any relationship.”
- **Proposed DE:** „Die vollständige Route folgt eng einer Forschungsaufgabe zu unmittelbarer zwischenmenschlicher Nähe. Kürzere Routen sind CLOSER-Auszüge.“
- **Proposed EN:** “The Full route closely follows a research task on immediate interpersonal closeness. Shorter routes are CLOSER extracts.”
- **Classification / priority:** **Rewrite**; P0 claim correction; Classic-permitted positioning change.
- **Basis:** Established but narrow laboratory evidence; only the full procedure was studied. [Aron et al. (1997)](https://doi.org/10.1177/0146167297234003)
- **Rationale:** Removes `any intensity, any relationship` and distinguishes Full from untested subsets without changing Classic content.
- **Downside / gate:** Less emotive marketing copy. Claims/editorial sign-off; no question testing required.

#### `classic:research-note` (new)

- **Current DE:** — no equivalent note.
- **Current EN:** — no equivalent note.
- **Proposed DE:** „CLASSIC Full folgt eng der 36-Fragen-Abfolge aus Aron et al. (1997). In einer Laborstudie berichteten Teilnehmende nach der vollständigen, etwa 45-minütigen Aufgabe mehr unmittelbare Nähe als nach Small Talk. Quick, Standard, die deutsche Redaktion und alle App-Mechaniken sind CLOSER-Adaptionen. Liebe, Kompatibilität oder dauerhafte Wirkung wurden nicht gezeigt.“
- **Proposed EN:** “CLASSIC Full closely follows the 36-question sequence in Aron et al. (1997). In a laboratory study, participants reported greater immediate closeness after the complete, approximately 45-minute task than after small talk. Quick, Standard, the German editorial version, and all app mechanics are CLOSER adaptations. Love, compatibility, and lasting effects were not demonstrated.”
- **Classification / priority:** **Rewrite/Add claim context**; P0; Classic-permitted citation/adaptation distinction.
- **Basis:** Original procedure and authors' stated outcome boundary. [Aron et al. (1997)](https://doi.org/10.1177/0146167297234003)
- **Rationale:** Makes the comparison, outcome, route distinction, translation status, and non-findings visible at the point of claim.
- **Downside / gate:** Long for a card; may need progressive disclosure, but shortening must retain all limitations. Claims/editorial sign-off.

#### `first-date-q25`

- **Current DE:** „Was soll eine Person an dir bemerken, ohne dass du es beweisen musst?“
- **Current EN:** “What do you hope someone notices about you without making you prove it?”
- **Proposed DE:** „Was hoffst du, dass eine Person an dir bemerkt, ohne dass du es beweisen musst?“
- **Proposed EN:** “What do you hope someone notices about you without making you prove it?”
- **Classification / priority:** **Rewrite** DE; P1 bilingual equivalence.
- **Basis:** Editorial inference plus translation/adaptation guidance.
- **Rationale:** Replaces obligation-like `soll` with the hope expressed in EN.
- **Downside / gate:** Slightly longer German. Confirm naturalness and non-obligation in DE cognitive interviews.

#### `first-date-q34`

- **Current DE:** „Was soll dein Gegenüber von dir aus diesem Abend in Erinnerung behalten?“
- **Current EN:** “What do you hope the other person remembers about you from tonight?”
- **Proposed DE:** „Was möchtest du, dass dein Gegenüber von dir aus diesem Abend in Erinnerung behält?“
- **Proposed EN:** “What do you hope the other person remembers about you from tonight?”
- **Classification / priority:** **Rewrite** DE; P1 bilingual equivalence.
- **Basis:** Editorial inference plus translation/adaptation guidance.
- **Rationale:** Aligns desired recollection without framing it as what the other person should do.
- **Downside / gate:** `möchtest` is desire rather than the exact nuance of `hope`; compare natural paraphrases in DE/EN sessions.

#### `date-night-q25`

- **Current DE:** „Was hilft dir, dich sicher genug zu fühlen, um dich fallen zu lassen?“
- **Current EN:** “What helps you feel safe enough to let your guard down?”
- **Proposed DE:** „Was hilft dir, dich bei Nähe sicher und ungezwungen zu fühlen?“
- **Proposed EN:** “What helps you feel safe and at ease with closeness?”
- **Classification / priority:** **Rewrite** both; P1 pressure and equivalence.
- **Basis:** Editorial safety inference; the responsiveness literature does not require surrendered vigilance. [Laurenceau et al. (1998)](https://doi.org/10.1037/0022-3514.74.5.1238)
- **Rationale:** Removes two non-equivalent surrender/defense idioms and asks directly about safety/ease.
- **Downside / gate:** Less evocative and may overlap Q14; compare perceived redundancy and intensity in Date Night sessions.

#### `couples-q20`

- **Current DE:** „Wie kann dein Gegenüber auf eine gute Nachricht von dir so reagieren, dass du dich wirklich begleitet fühlst?“
- **Current EN:** “How can your partner respond to your good news in a way that makes you feel truly supported?”
- **Proposed DE:** „Was hilft dir nach einem Missverständnis, wieder neugierig auf die Sicht deines Gegenübers zu werden?“
- **Proposed EN:** “What helps you become curious about your partner’s perspective again after a misunderstanding?”
- **Classification / priority:** **Replace**; P1 within-pack duplicate.
- **Basis:** Established/indirect evidence supports constructive positive-event response, but Q06 already covers it; the replacement is an editorial gap-fill, not an evidence-validated intervention. [Gable et al. (2004)](https://doi.org/10.1037/0022-3514.87.2.228)
- **Rationale:** Removes the only clear same-pack construct duplicate and adds self-directed perspective curiosity without demanding agreement or repair.
- **Downside / gate:** Loses repetition of a positive mechanism and introduces conflict context. Moderate after ordinary, low-stakes misunderstandings; reject if it feels therapeutic or blame-seeking.

#### `couples-q28`

- **Current DE:** „Welches kleine Versprechen könnt ihr euch für diese Woche geben?“
- **Current EN:** “What small promise can the two of you make for this week?”
- **Proposed DE:** „Welche kleine Veränderung könnte euch diese Woche guttun, ohne dass daraus eine Verpflichtung wird?“
- **Proposed EN:** “What small change might feel helpful to the two of you this week without becoming an obligation?”
- **Classification / priority:** **Rewrite**; P0 mechanic/content contract.
- **Basis:** Product safety invariant plus editorial inference; no cited relationship study supports requiring a promise.
- **Rationale:** Preserves practical relevance while explicitly removing commitment.
- **Downside / gate:** Less action-oriented; test whether it still feels useful and whether participants nevertheless infer a joint assignment.

#### `couples:act-ii-label`

- **Current DE:** „REPARIEREN“ (arc: „SEHEN → REPARIEREN → WÄHLEN“)
- **Current EN:** “REPAIR” (arc: “NOTICING → REPAIR → CHOOSING”)
- **Proposed DE:** „ABSTIMMEN“ (arc: „SEHEN → ABSTIMMEN → WÄHLEN“)
- **Proposed EN:** “CHECKING IN” (arc: “NOTICING → CHECKING IN → CHOOSING”)
- **Classification / priority:** **Rewrite** label; P0 claim correction.
- **Basis:** Evidence supports proximal responsiveness/communication constructs, not a repair outcome. [Laurenceau et al. (1998)](https://doi.org/10.1037/0022-3514.74.5.1238)
- **Rationale:** Accurately frames needs, comfort, apology, pause, and support questions as calibration.
- **Downside / gate:** Less emotionally decisive; bilingual editorial review and route-heading comprehension check.

#### `friends-q24`

- **Current DE:** „Welches aktuelle Thema darf eine befreundete Person einfach mit dir aushalten, ohne es lösen zu müssen?“
- **Current EN:** “What are you dealing with right now that a friend can simply sit with you in, without having to solve it?”
- **Proposed DE:** „Welches aktuelle Thema würdest du gern mit einer befreundeten Person teilen können, ohne dass es gelöst werden muss?“
- **Proposed EN:** “What current topic would you like to be able to share with a friend without it needing to be solved?”
- **Classification / priority:** **Rewrite** both; P1 equivalence/pressure.
- **Basis:** Responsiveness evidence is indirect; language-equivalence editorial finding. [Sprecher & Treger (2015)](https://doi.org/10.1111/pere.12090)
- **Rationale:** Removes EN's problem presupposition and makes sharing optional in both languages.
- **Downside / gate:** Less vivid `sit with` language; check whether it becomes too abstract.

#### `old-friends-q13`

- **Current DE:** „Was hat sich in deinem Leben am stärksten verändert, seit wir uns besonders nah waren?“
- **Current EN:** “What has changed most in your life since the time when we were especially close?”
- **Proposed DE:** „Was hat sich in deinem Leben seit der Zeit, aus der ihr euch kennt, am stärksten verändert?“
- **Proposed EN:** “What has changed most in your life since the period when the two of you first knew each other?”
- **Classification / priority:** **Rewrite** both; P0 relationship-presupposition fix.
- **Basis:** Editorial inclusion inference; memory studies do not establish mutually defined prior closeness. [Beike et al. (2017)](https://doi.org/10.1080/09658211.2017.1313990)
- **Rationale:** Retains the before/now comparison without asserting an especially close past.
- **Downside / gate:** German is less elegant and the time anchor is broader; test alternative natural phrasings without restoring the assumption.

#### `old-friends-q19`

- **Current DE:** „Was hat dir geholfen, mit weniger Kontakt auf eine für dich gute Weise umzugehen?“
- **Current EN:** “What helped you handle having less contact in a way that worked for you?”
- **Proposed DE:** „Wie hast du die Zeit mit weniger oder anderem Kontakt erlebt – falls das auf euch zutrifft?“
- **Proposed EN:** “How did you experience the period of less or different contact, if that applies to the two of you?”
- **Classification / priority:** **Rewrite** both; P0 pressure/presupposition fix.
- **Basis:** Editorial inference informed by varied estrangement/reconciliation preferences. [Blake et al. (2023)](https://doi.org/10.1177/0192513X211064876)
- **Rationale:** Makes reduced contact conditional and removes the assumption of successful coping.
- **Downside / gate:** More open and potentially more emotionally demanding. Moderate with pairs who do and do not want renewed contact.

#### `deep-q34`

- **Current DE:** „Wie kann die andere Person nach diesem Gespräch gut für dich da sein – durch Zuhören, Nachfragen, Ruhe oder etwas anderes?“
- **Current EN:** “After this conversation, how can the other person best be there for you: by listening, asking questions, giving you space, or something else?”
- **Proposed DE:** „Wie kann die andere Person nach diesem Gespräch gut für dich da sein – durch Zuhören, Nachfragen, Ruhe oder etwas anderes?“
- **Proposed EN:** “After this conversation, how can the other person best be there for you: through listening, questions, quiet, or something else?”
- **Classification / priority:** **Rewrite** EN; P1 bilingual equivalence.
- **Basis:** Editorial translation finding.
- **Rationale:** Aligns `Ruhe` with `quiet`; `space` is already a distinct relational option elsewhere.
- **Downside / gate:** `quiet` may mean environmental quiet rather than shared silence; compare paraphrases, and rewrite both if neither language is clear.

#### `chaos-q24`

- **Current DE:** „Plant ein tatsächlich machbares Mini-Abenteuer für höchstens zehn Euro – ohne Mutprobe und ohne jemanden bloßzustellen.“
- **Current EN:** “Plan a genuinely doable mini-adventure for no more than ten euros—with no dares and no embarrassing anyone.”
- **Proposed DE:** „Plant ein tatsächlich machbares Mini-Abenteuer mit dem, was euch zur Verfügung steht – ohne Mutprobe und ohne jemanden bloßzustellen.“
- **Proposed EN:** “Plan a genuinely doable mini-adventure using what is available to you—with no dares and no embarrassing anyone.”
- **Classification / priority:** **Rewrite** both; P1 economic/cultural inclusion.
- **Basis:** Editorial inclusion inference; humor evidence does not privilege spending. [Hall (2017)](https://doi.org/10.1111/pere.12183)
- **Rationale:** Removes euro/currency and purchasing-power assumptions while preserving feasibility and anti-humiliation constraints.
- **Downside / gate:** `what is available` can include more than money and be less game-like; test clarity and harmlessness.

#### `chaos-q26`

- **Current DE:** „Welche kurze Sprachnachricht würdest du deinem Ich in fünf Jahren schicken?“
- **Current EN:** “What short voice message would you send to yourself five years from now?”
- **Proposed DE:** „Welche kurze Nachricht würdest du deinem Ich in fünf Jahren schicken?“
- **Proposed EN:** “What short message would you send to yourself five years from now?”
- **Classification / priority:** **Rewrite** both; P1 accessibility.
- **Basis:** Professional/accessibility guidance by analogy. [Hanley et al. (2023)](https://doi.org/10.1177/17446295221115914)
- **Rationale:** Keeps the imaginative task while allowing speech, text, sign, AAC, or another mode.
- **Downside / gate:** Loses the spontaneous vocal-note flavor; verify that PLAYFUL presentation does not silently reintroduce speech.

#### `late-night-q22`

- **Current DE:** „Wodurch baut sich Lust für dich eher auf: Tempo, Wiederholung, Abwechslung, Pausen – oder etwas anderes?“
- **Current EN:** “What tends to build pleasure for you: pace, repetition, variety, pauses—or something else?”
- **Proposed DE:** „Welche Rolle spielen Tempo, Wiederholung, Abwechslung oder Pausen für dein sexuelles Erleben?“
- **Proposed EN:** “What role do pace, repetition, variety, or pauses play in your sexual experience?”
- **Classification / priority:** **Rewrite** both; P0 equivalence and outcome neutrality; **Needs specialist review**.
- **Basis:** Sexual-communication evidence supports conversation quality but not a required desire/pleasure outcome. [Mallory (2022)](https://doi.org/10.1037/fam0000946)
- **Rationale:** Aligns languages under a neutral umbrella and permits `no role` as an answer.
- **Downside / gate:** More clinical and less sensual. Sexual-health, consent, and bilingual cognitive review required.

#### `late-night-q26`

- **Current DE:** „Mit welchen Worten oder Zeichen möchtest du Zustimmung, Pause und Stopp ausdrücken?“
- **Current EN:** “What words or signals do you want to use to express consent, pause and stop?”
- **Proposed DE:** „Welche eindeutigen Worte oder bewusst vereinbarten Zeichen möchtest du für Zustimmung, Pause und Stopp verwenden?“
- **Proposed EN:** “What clear words or deliberately agreed signals would you like to use for consent, pause, and stop?”
- **Classification / priority:** **Rewrite** both; P0 consent clarity; **Needs specialist review**.
- **Basis:** Consent is contextual and multidimensional; preference discussion never substitutes for in-the-moment consent. [Muehlenhard et al. (2016)](https://doi.org/10.1080/00224499.2016.1146651), [Jozkowski et al. (2014)](https://doi.org/10.1007/s10508-013-0225-7)
- **Rationale:** Reduces the chance that ambiguous behavior is treated as a sufficient signal.
- **Downside / gate:** `agreed signals` could still be overgeneralized beyond a specific context; retain the pack-wide rule that consent must be specific, voluntary, informed, and withdrawable, and have consent specialists adjudicate.

#### `late-night-q27`

- **Current DE:** „Wie soll die andere Person nachfragen, wenn dein Signal nicht eindeutig ist?“
- **Current EN:** “How would you like the other person to check in when your signal is unclear?”
- **Proposed DE:** „Wenn ein Signal nicht eindeutig ist: Wie soll die andere Person pausieren und nachfragen?“
- **Proposed EN:** “When a signal is unclear, how should the other person pause and check in?”
- **Classification / priority:** **Rewrite** both; P0 consent process; **Needs specialist review**.
- **Basis:** Professional/editorial application of consent's contextual and withdrawable nature. [Muehlenhard et al. (2016)](https://doi.org/10.1080/00224499.2016.1146651)
- **Rationale:** Makes pause, not continued action while interpreting, the default under ambiguity.
- **Downside / gate:** A conversational answer cannot establish a universal procedure; specialist review and in-context comprehension testing required.

#### `family-q01`

- **Current DE:** „Welche kleine Sache verbindet dich im Alltag mit der anderen Person, auch wenn ihr nicht am selben Ort lebt?“
- **Current EN:** “What small thing connects you to the other person in everyday life, even if you do not live in the same place?”
- **Proposed DE:** „Gibt es eine kleine Sache, die dich im Alltag mit der anderen Person verbindet oder an sie denken lässt – auch wenn ihr nicht am selben Ort lebt?“
- **Proposed EN:** “Is there a small thing that connects you with the other person in everyday life or brings them to mind—even if you do not live in the same place?”
- **Classification / priority:** **Rewrite** both; P0 inclusion/presupposition.
- **Basis:** Editorial inference; the family-narrative literature does not justify assuming current closeness. [Koenig Kellas (2005)](https://doi.org/10.1080/03637750500322453)
- **Rationale:** Allows no active connection and offers a lower-demand memory association.
- **Downside / gate:** Yes/no opening may invite a one-word answer; test a follow-up-neutral presentation such as `If so, what?` only if it does not create pressure.

#### `family-q05`

- **Current DE:** „Welches Essen, Ritual oder Ereignis gehört für dich zu eurer persönlichen Version von Familie?“
- **Current EN:** “What food, ritual, or occasion belongs to your personal version of family?”
- **Proposed DE:** „Welches Essen, Ritual, Ereignis oder Alltagsdetail verbindest du mit deiner persönlichen Vorstellung von Familie?“
- **Proposed EN:** “What food, ritual, occasion, or everyday detail do you associate with your own idea of family?”
- **Classification / priority:** **Rewrite** both; P0 inclusion/presupposition.
- **Basis:** Editorial inclusion inference.
- **Rationale:** Removes a necessarily shared family version and broadens the answer beyond formal occasions.
- **Downside / gate:** Less dyad-specific; test whether the revised Quick route still feels relational rather than generic.

#### `family-q14`

- **Current DE:** „Woran darf die andere Person erkennen, ob du gerade Unterstützung von ihr oder lieber Freiraum möchtest?“
- **Current EN:** “How can the other person tell whether you want their support or would prefer some space?”
- **Proposed DE:** „Wie soll die andere Person nachfragen, ob du gerade Unterstützung oder lieber Freiraum möchtest?“
- **Proposed EN:** “How would you like the other person to ask whether you want support or would prefer some space?”
- **Classification / priority:** **Rewrite** both; P1 autonomy/clarity.
- **Basis:** Editorial application of responsiveness and the catalog's no-mind-reading principle.
- **Rationale:** Replaces cue inference with an explicit check-in preference.
- **Downside / gate:** May sound procedural; verify across chosen, blended, adoptive, and infrequent-contact family dyads.

### 13.2 Exact route, mechanic, and response-card changes

For route-only and mechanic-only entries, proposed question wording remains exactly the same in both languages; the changed metadata is quoted separately.

#### `private-moments:shared-action-show-cards`

- **Current DE:** „Karten zeigen“
- **Current EN:** “Show cards”
- **Proposed DE:** „Private Karten ansehen“
- **Proposed EN:** “View private cards”
- **Classification / priority:** **Rewrite** shared action; P1 privacy/comprehension.
- **Basis / rationale:** Professional privacy/accessibility guidance plus editorial inference. `Show` can imply exposing the two cards to each other, while the approved flow requires separate named handoffs and hidden choices.
- **Downside / gate:** Longer control label; `private` may still need explanation. Test at 320 px, with screen readers, and in cognitive walkthroughs; preserve the existing shared offer and named handoff covers.

#### `classic:route-labels`

- **Current DE:** „Quick“ · „Standard“ · „Full“
- **Current EN:** “Quick” · “Standard” · “Full”
- **Proposed DE:** „Quick · CLOSER-Auszug“ · „Standard · CLOSER-Auszug“ · „Full · vollständige 36-Fragen-Abfolge“
- **Proposed EN:** “Quick · CLOSER extract” · “Standard · CLOSER extract” · “Full · complete 36-question sequence”
- **Classification / priority:** **Rewrite route labels**; P0 claim distinction; Classic-permitted metadata change.
- **Basis / rationale:** Only the complete sequence corresponds closely to the studied procedure; route extraction is an adaptation. [Aron et al. (1997)](https://doi.org/10.1177/0146167297234003)
- **Downside / gate:** Longer controls may wrap on small screens. Physical-device layout and comprehension check; do not shorten away `extract`.

#### `couples-q29:playful-predict`

- **Current DE:** „Welche neue gemeinsame Erfahrung würdet ihr im nächsten Monat gern ausprobieren?“ with `PREDICT` enabled.
- **Current EN:** “What new experience would the two of you like to try in the next month?” with `PREDICT` enabled.
- **Proposed DE:** Same question; remove `PREDICT` and answer sequentially.
- **Proposed EN:** Same question; remove `PREDICT` and answer sequentially.
- **Classification / priority:** **Remove** mechanic; P0 pressure.
- **Basis / rationale:** Editorial risk: a guess can become a partner-knowledge score and add pressure to a future-oriented answer; no cited evidence supports prediction.
- **Downside / gate:** Less PLAYFUL variety. Can be restored only after dyadic sessions show no testing/blame interpretation and an accessible non-predict path remains.

#### `friends-q34:route`

- **Current DE/EN:** Q34 `Q/S/F`: „Wofür wären wir in einem Jahr dankbar, wenn wir es jetzt gemeinsam planen?“ / “What would we be grateful for a year from now if we planned it together today?”
- **Proposed DE/EN:** Same wording; `S/F` (remove from Quick only).
- **Classification / priority:** **Change route membership**; P1 pressure/fatigue.
- **Basis / rationale:** Editorial route inference; removes a joint year-ahead planning task from Quick while retaining Standard's existing future arc. Standard already ends with the approved memory/celebration private finale.
- **Downside / gate:** Quick loses its longest-horizon prompt and is no longer a strict subset of Standard when paired with Q36. Verify the compiler supports explicit route lists and test Quick arc completeness.

#### `friends-q36:route`

- **Current DE/EN:** Q36 `F`: „Wofür möchtest du der anderen Person heute danken – und was sagt das über sie aus?“ / “What would you like to thank the other person for today, and what does it say about who they are?”
- **Proposed DE/EN:** Same wording; `Q/F` (add to Quick only; retain Full; do not add to Standard).
- **Classification / priority:** **Change route membership**; P1 positive closer.
- **Basis:** Indirect gratitude evidence plus editorial route judgment. The item itself is not the studied gratitude interaction. [Algoe et al. (2010)](https://doi.org/10.1111/j.1475-6811.2010.01273.x)
- **Rationale:** Replaces planning pressure with specific present appreciation in Quick. Keeping it out of Standard avoids stacking it with the approved finale's celebration role and preserves 12/24/36 route counts when paired with Q34.
- **Downside / gate:** Introduces a `Q/F` membership shape not currently described in the catalog shorthand; direct gratitude may be awkward in lower-closeness friendships. Use explicit route lists or document the code, then test Pass/pressure and no-reciprocation comprehension.

#### `friends-q36:response-reflect`

- **Current DE:** „Sag in einem Satz, was du an der Antwort verstanden hast.“
- **Current EN:** “In one sentence, say what you understood from the answer.”
- **Proposed DE:** — remove this response card.
- **Proposed EN:** — remove this response card.
- **Classification / priority:** **Remove**; P1 scripted-response risk.
- **Basis / rationale:** Editorial inference. Gratitude already asks for meaning; a mandatory-sounding comprehension reflection can cool or evaluate the closer.
- **Downside / gate:** Loses an explicit listening cue. Retain only if sessions show it feels supportive and optional rather than evaluative.

#### `old-friends-q28:route`

- **Current DE/EN:** Q28 `Q/S/F`: „Welche gemeinsame Tradition wäre schön wiederzubeleben oder neu zu erfinden?“ / “What shared tradition would be good to revive or reinvent?”
- **Proposed DE/EN:** Same wording; `F` only.
- **Classification / priority:** **Change route membership**; P0 reconnection pressure.
- **Basis / rationale:** Editorial inference informed by varied reconciliation preferences. Moves explicit revival out of Quick/Standard.
- **Downside / gate:** Shorter routes lose a future-facing shared idea. Test with both reconnecting and non-reconnecting pairs.

#### `old-friends-q36:route`

- **Current DE/EN:** Q36 `F`: „Welche Eigenschaft schätzt du an der Person vor dir heute – unabhängig von eurer gemeinsamen Geschichte?“ / “What quality do you appreciate in the person in front of you today, apart from your shared history?”
- **Proposed DE/EN:** Same wording; `Q/S/F`.
- **Classification / priority:** **Change route membership**; P0 route neutrality.
- **Basis / rationale:** Editorial route judgment. Provides a present-focused closer without requiring renewed contact and preserves route counts when paired with Q28.
- **Downside / gate:** Appreciation can still imply warmth that not every pair feels; Pass remains prominent and sessions include cordial-but-not-close dyads.

#### `old-friends-q34:response-follow-up`

- **Current DE:** „Was wäre ein kleiner, realistischer erster Schritt?“
- **Current EN:** “What would be one small, realistic first step?”
- **Proposed DE:** „Was daran wäre dir wichtig?“
- **Proposed EN:** “What about that would matter to you?”
- **Classification / priority:** **Rewrite** response card; P0 obligation/reconnection pressure.
- **Basis / rationale:** Editorial inference; asks for meaning rather than converting a hypothetical memory into a plan.
- **Downside / gate:** Less action-oriented and may partially repeat the base answer; test usefulness or remove the card entirely.

#### `deep-q15:route`

- **Current DE/EN:** Q15 `F`: „Welches ehrliche Kompliment kannst du nur schwer annehmen – und warum?“ / “What sincere compliment do you find hard to accept, and why?”
- **Proposed DE/EN:** Same wording; `S/F`.
- **Classification / priority:** **Change route membership**; P1 intensity calibration.
- **Basis / rationale:** Editorial route judgment; supplies a personal but less loss-centered Standard item when paired with Q17's move.
- **Downside / gate:** Shame/self-worth may still be intense and `why` can feel demanding. Compare experienced intensity with Q17.

#### `deep-q17:route`

- **Current DE/EN:** Q17 `S/F`: „Welche Veränderung oder welcher Verlust hat dich stark geprägt?“ / “What change or loss has had a powerful influence on who you are?”
- **Proposed DE/EN:** Same wording; `F` only.
- **Classification / priority:** **Change route membership**; P1 intensity calibration.
- **Basis / rationale:** Deep-conversation evidence supports voluntary depth but does not make loss disclosure necessary in Standard. [Kardas et al. (2022)](https://doi.org/10.1037/pspa0000281)
- **Downside / gate:** Standard loses a potentially meaningful major-life-change prompt. Retain in Full and compare route depth/completion.

#### `deep-q01+q21:response-celebrate`

- **Current DE:** „Würdige kurz, was dieser Moment die Person gekostet oder ihr bedeutet hat.“
- **Current EN:** “Take a moment to honor what that moment cost the person or meant to them.”
- **Proposed DE:** „Würdige kurz, was der Person daran wichtig ist.“
- **Proposed EN:** “Take a moment to acknowledge what matters to the person about it.”
- **Classification / priority:** **Rewrite** response card; P1 adversity presupposition.
- **Basis / rationale:** Editorial inference; removes invented `cost` and applies to both an inner change (Q01) and a difficult decision (Q21).
- **Downside / gate:** More generic; test whether it adds value beyond attentive listening.

#### `deep-q34:response-reflect`

- **Current DE:** „Sag in einem Satz, was du künftig beachten möchtest.“
- **Current EN:** “In one sentence, say what you would like to keep in mind from now on.”
- **Proposed DE:** „Wenn du möchtest: Sag in einem Satz, was du verstanden hast. Daraus entsteht keine Zusage.“
- **Proposed EN:** “If you like, say in one sentence what you understood. This creates no commitment.”
- **Classification / priority:** **Rewrite** response card; P0 continuing-care implication.
- **Basis / rationale:** Editorial application of optional responsiveness; removes `from now on` commitment.
- **Downside / gate:** Explicit disclaimer can feel legalistic after a deep exchange. Test against removing the card entirely.

#### `chaos-q16:playful-both-with-private-sparks`

- **Current DE:** Base question „Erfindet gemeinsam das absurdeste Unternehmen, das überraschend funktionieren könnte.“; private supplement „Wenn du einen privaten Funken behalten hast, baue ihn ein. Niemand muss erraten, welche Karte die andere Person gesehen hat, und beide Funken dürfen ignoriert werden.“; `BOTH` enabled.
- **Current EN:** Base question “Invent the most absurd business together that might actually work.”; private supplement “If you kept a private spark, work it in. Nobody has to guess which card the other person saw, and either spark may be ignored.”; `BOTH` enabled.
- **Proposed DE:** Same base question and supplement; do not apply `BOTH` when `chaos-private-sparks` is active. Use the ordinary joint question plus optional private sparks.
- **Proposed EN:** Same base question and supplement; do not apply `BOTH` when `chaos-private-sparks` is active. Use the ordinary joint question plus optional private sparks.
- **Classification / priority:** Conditional **Remove** mechanic; P1 instruction load.
- **Basis / rationale:** Editorial interaction audit. The base instruction is already joint and the approved Standard/Full private moment adds two hidden constraints immediately before Q16; `BOTH` would stack a third presentation rule without evidence of benefit.
- **Downside / gate:** Style behavior now depends on whether the private moment was skipped, complicating consistency. Prefer disabling `BOTH` for Q16 on all Standard/Full runs if conditional presentation is confusing; test recall, collaboration, and screen attention.

#### `late-night-q30:route`

- **Current DE/EN:** Q30 `S/F`: „Welche Grenze, Verhütung oder Schutzmaßnahme darf niemals bloß angenommen werden?“ / “What boundary, contraception or protection measure must never simply be assumed?”
- **Proposed DE/EN:** Same wording; `F` only.
- **Classification / priority:** **Change route membership**; P0; **Needs specialist review**.
- **Basis / rationale:** Route tradeoff: Q31 retains concrete testing/barrier/contraception/protection discussion in Standard, while Q34 access needs move in.
- **Downside / gate:** Removes a broad non-assumption safeguard from Standard and may create a safety regression. Consent/sexual-health specialists must approve the pair as a single atomic route change; otherwise keep Q30 and expand/rebalance Standard differently.

#### `late-night-q34:route`

- **Current DE/EN:** Q34 `F`: „Gibt es körperliche Bedürfnisse, Empfindlichkeiten oder Zugänglichkeitsaspekte, über die du vor Intimität sprechen möchtest?“ / “Are there any physical needs, sensitivities or accessibility considerations you would want to discuss before intimacy?”
- **Proposed DE/EN:** Same wording; `S/F`.
- **Classification / priority:** **Change route membership**; P0 accessibility; **Needs specialist review**.
- **Basis / rationale:** Access and physical needs should not require choosing the longest/most explicit route; paired with Q30 to preserve route count.
- **Downside / gate:** The item may expose disability/health information and is not comprehensive. Independent Pass, no follow-up pressure, disability/access review, and the paired Q30 safety review are mandatory.

#### `road-trip:finale:quick`

- **Current DE:** „Gute Weiterreise. Lasst das Gespräch weiterlaufen – oder genießt einfach die Strecke.“
- **Current EN:** “Enjoy the rest of the journey. Let the conversation continue—or simply enjoy the road.”
- **Proposed DE:** „Hier endet die Runde. Wenn eine teilnehmende Person weiterfährt, legt das Smartphone weg; die sichere Weiterreise hat Vorrang.“
- **Proposed EN:** “This round ends here. If either participant resumes driving, put the phone away; a safe onward journey comes first.”
- **Classification / priority:** **Rewrite** finale; P0 road safety; **Needs specialist review**.
- **Basis:** Official road-safety guidance and conservative product boundary; no study establishes a structured game as safe while moving. [NHTSA](https://www.nhtsa.gov/campaign/distracted-driving), [Austrian government](https://www.oesterreich.gv.at/de/themen/mobilitaet/kfz/10/4/Seite.063140)
- **Rationale:** Prevents the app invitation from outliving the parked/no-participating-driver condition.
- **Downside / gate:** More abrupt and regulatory; road-safety/legal review and parked/public-transport sessions.

### 13.3 Items explicitly not proposed for change

For audit traceability: Classic Q01–Q36/order/translations and approved private copy are immutable within this audit and have no proposed edit; Colleagues Q01–Q36 remain unchanged pending peer sessions and employment/privacy review; Road Trip Q01–Q36 remain unchanged; Students/FH has no question IDs yet. Date Night Q02/Q19 mechanics are **Needs user-session evidence**, not proposed edits. Duration planning bands in Section 8 are not proposed catalog copy. FR-005's pack-specific cards are product-approved and implemented; apart from the shared action-label rewrite and conditional Chaos Q16 mechanic above, their exact copy is **Keep pending physical-device and moderated-session validation**.

## 14. Source register and link verification

### 14.1 Relationship and conversation mechanisms

- Aron, A., Melinat, E., Aron, E. N., Vallone, R. D., & Bator, R. J. (1997). *The experimental generation of interpersonal closeness: A procedure and some preliminary findings.* Personality and Social Psychology Bulletin, 23(4), 363–377. [DOI](https://doi.org/10.1177/0146167297234003)
- Collins, N. L., & Miller, L. C. (1994). *Self-disclosure and liking: A meta-analytic review.* Psychological Bulletin, 116(3), 457–475. [DOI](https://doi.org/10.1037/0033-2909.116.3.457), [PubMed](https://pubmed.ncbi.nlm.nih.gov/7809308/)
- Laurenceau, J.-P., Barrett, L. F., & Pietromonaco, P. R. (1998). *Intimacy as an interpersonal process: The importance of self-disclosure, partner disclosure, and perceived partner responsiveness in interpersonal exchanges.* Journal of Personality and Social Psychology, 74(5), 1238–1251. [DOI](https://doi.org/10.1037/0022-3514.74.5.1238)
- Sprecher, S., Treger, S., Wondra, J. D., Hilaire, N., & Wallpe, K. (2013). *Taking turns: Reciprocal self-disclosure promotes liking in initial interactions.* Journal of Experimental Social Psychology. [DOI](https://doi.org/10.1016/j.jesp.2013.03.017)
- Sprecher, S., & Treger, S. (2015). *The benefits of turn-taking reciprocal self-disclosure in get-acquainted interactions.* Personal Relationships. [DOI](https://doi.org/10.1111/pere.12090)
- Kardas, M., Kumar, A., & Epley, N. (2022). *Overly shallow? Miscalibrated expectations create a barrier to deeper conversation.* Journal of Personality and Social Psychology. [DOI](https://doi.org/10.1037/pspa0000281)
- Gable, S. L., Reis, H. T., Impett, E. A., & Asher, E. R. (2004). *What do you do when things go right? The intrapersonal and interpersonal benefits of sharing positive events.* Journal of Personality and Social Psychology, 87(2), 228–245. [DOI](https://doi.org/10.1037/0022-3514.87.2.228)
- Algoe, S. B., Gable, S. L., & Maisel, N. C. (2010). *It’s the little things: Everyday gratitude as a booster shot for romantic relationships.* Personal Relationships. [DOI](https://doi.org/10.1111/j.1475-6811.2010.01273.x)
- Aron, A., Norman, C. C., Aron, E. N., McKenna, C., & Heyman, R. E. (2000). *Couples’ shared participation in novel and arousing activities and experienced relationship quality.* Journal of Personality and Social Psychology, 78(2), 273–284. [DOI](https://doi.org/10.1037/0022-3514.78.2.273)

### 14.2 Humor and memory

- Hall, J. A. (2017). *Humor in romantic relationships: A meta-analysis.* Personal Relationships. [DOI](https://doi.org/10.1111/pere.12183)
- Kurtz, L. E., & Algoe, S. B. (2015). *Putting laughter in context: Shared laughter as behavioral indicator of relationship well-being.* Personal Relationships. [DOI](https://doi.org/10.1111/pere.12095)
- Wildschut, T., Sedikides, C., Arndt, J., & Routledge, C. (2006). *Nostalgia: Content, triggers, functions.* Journal of Personality and Social Psychology, 91(5), 975–993. [DOI](https://doi.org/10.1037/0022-3514.91.5.975)
- Beike, D. R., Cole, H. E., & Merrick, C. R. (2017). *Sharing specific “we” autobiographical memories in close relationships: The role of contact frequency.* Memory, 25(10), 1425–1434. [DOI](https://doi.org/10.1080/09658211.2017.1313990)
- Guan, L., & Wang, Q. (2022). *Does sharing memories make us feel closer? The roles of memory type and culture.* Journal of Cross-Cultural Psychology. [DOI](https://doi.org/10.1177/00220221211072809)

### 14.3 Sexual communication and consent

- Mallory, A. B. (2022). *Dimensions of couples’ sexual communication, relationship satisfaction, and sexual satisfaction: A meta-analysis* (93 studies; 38,499 participants in current relationships). Journal of Family Psychology, 36(3), 358–371. [DOI](https://doi.org/10.1037/fam0000946)
- Sorg, M., Reindl, I. M., & Greitemeyer, T. (2026). *Sexual communication and satisfaction in queer relationships: A dyadic approach* (112 queer couples; cross-sectional actor-partner analysis). The Journal of Sex Research. [DOI](https://doi.org/10.1080/00224499.2026.2630962), [PubMed](https://pubmed.ncbi.nlm.nih.gov/41805159/)
- Muehlenhard, C. L., Humphreys, T. P., Jozkowski, K. N., & Peterson, Z. D. (2016). *The complexities of sexual consent among college students: A conceptual and empirical review.* The Journal of Sex Research. [DOI](https://doi.org/10.1080/00224499.2016.1146651)
- Jozkowski, K. N., Sanders, S., Peterson, Z. D., Dennis, B., & Reece, M. (2014). *Consenting to sexual activity: The development and psychometric assessment of dual measures of consent.* Archives of Sexual Behavior, 43(3), 437–450. [DOI](https://doi.org/10.1007/s10508-013-0225-7)

### 14.4 Family, workplace, and context safety

- Koenig Kellas, J. (2005). *Family ties: Communicating identity through jointly told family stories.* Communication Monographs. [DOI](https://doi.org/10.1080/03637750500322453)
- Blake, L., Bland, B., & Rouncefield-Swales, A. (2023). *Estrangement between siblings in adulthood: A qualitative exploration.* Journal of Family Issues, 44(7), 1859–1879. [DOI](https://doi.org/10.1177/0192513X211064876)
- Edmondson, A. (1999). *Psychological safety and learning behavior in work teams.* Administrative Science Quarterly, 44(2), 350–383. [DOI](https://doi.org/10.2307/2666999)
- Milliken, F. J., Morrison, E. W., & Hewlin, P. F. (2003). *An exploratory study of employee silence: Issues that employees don’t communicate upward and why.* Journal of Management Studies. [DOI](https://doi.org/10.1111/1467-6486.00387)
- Drews, F. A., Pasupathi, M., & Strayer, D. L. (2008). *Passenger and cell phone conversations in simulated driving.* Journal of Experimental Psychology: Applied. [DOI](https://doi.org/10.1037/a0013119)
- US National Highway Traffic Safety Administration. *Distracted driving.* [Official guidance](https://www.nhtsa.gov/campaign/distracted-driving)
- Austrian federal government. *Handyverbot am Steuer* (current official road-rule page). [Official guidance](https://www.oesterreich.gv.at/de/themen/mobilitaet/kfz/10/4/Seite.063140)

### 14.5 Translation and accessibility guidance

- International Test Commission. *The ITC Guidelines for Translating and Adapting Tests (Second edition).* [Official PDF](https://www.intestcom.org/files/guideline_test_adaptation_2ed.pdf)
- US Census Bureau. *Cognitive testing of translated questionnaires.* [Official working paper](https://www.census.gov/library/working-papers/2008/adrm/ssm2008-02.html)
- W3C Web Accessibility Initiative. *Cognitive Accessibility Guidance.* [Official topic page](https://www.w3.org/WAI/cognitive/)
- Hanley, E., Martin, A.-M., Dalton, C., & Lehane, E. (2023). *Communication partners experiences of communicating with adults with severe/profound intellectual disability through augmentative and alternative communication: A mixed methods systematic review.* Journal of Intellectual Disabilities, 27(4), 1107–1134. [DOI](https://doi.org/10.1177/17446295221115914)

Stable DOI, PubMed, standards, and government URLs above were resolved or opened during this audit on **17 August 2026**. The Austrian link replaces an obsolete `eausweise.oesterreich.gv.at` path found in earlier notes. Web guidance should receive an annual link/content check; DOI-backed article claims should be re-reviewed when the cited population, intervention, or outcome is generalized.

## 15. Final release recommendation

Release work should proceed in this order: (1) P0 claim and safety-copy corrections; (2) exact bilingual wording/route changes after the named specialist gates; (3) physical-device and moderated-session validation, including every approved FR-005 handoff/decline/resume/use/finale branch; (4) calibration of durations and eligible PLAYFUL/response-card behavior; (5) only then expansion of Private Moments to any new pack or a Students/FH content build. Classic stays immutable. The most consequential current risks are not a shortage of research references; they are overclaiming transfer, obligation introduced by mechanics, unvalidated private-moment behavior, specialist-context power, and untested DE/EN interpretation.

The defensible product position is therefore: **CLOSER uses research-informed principles to design voluntary two-person conversations; individual questions, translations, routes, styles, and outcomes are not scientifically validated unless and until separately demonstrated.**
