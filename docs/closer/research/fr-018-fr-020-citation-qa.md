# Final citation, evidence-transfer, structure, and product-safety QA

**Audited file:** `docs/closer/research/fr-018-fr-020-deep-research.md`
**Final frozen snapshot:** 17 August 2026, 1,681 lines, SHA-256 `3C9CF9588E1BD91B2D008A9E6518CA7F6A9432879113AC21B35BB985700CBA07`
**QA scope:** every external URL/DOI/PMID; author/year/title and source type; population/design/result fit; causal and product-transfer language; bibliography coverage; internal consistency; required section order; placeholders; and unsafe candidate wording.

## Final disposition

**Pass — no remaining actionable citation, evidence-transfer, structural, internal-consistency, or product-safety defect was found in the frozen snapshot.** The report's own conditional-go/no-public-release decisions, specialist-review gates, and statements that candidate content is unvalidated remain necessary; this QA pass is not a clinical, legal, safety, efficacy, or release approval.

## Citation and bibliography audit

- **93 unique external targets:** 77 DOI URLs and 16 non-DOI URLs.
- **88 targets are used outside Section 11, and all 88 occur in the bibliography.** Section 11 contains 93 unique targets; the five bibliography-only targets are canonical DOI aliases for works cited in the report through PubMed/PMC or a repository. Missing used-source bibliography entries: **0**.
- All 77 DOI strings resolve to the intended records, and Crossref/publisher metadata agree with the bibliography's authors, year, title, journal, volume/issue, and pages. A valid DOI redirect that ends at a publisher anti-bot/paywall response is not a broken DOI.
- The eight records added after the first QA pass—Collins and Miller (1994), Sprecher et al. (2013), Aron et al. (2000), Kurtz and Algoe (2015), Wildschut et al. (2006), Edmondson (1999), Milliken et al. (2003), and Drews et al. (2008)—resolve and are bibliographically correct at lines **967, 982, 985, 987, 1004, 1013, 1023, and 1035**.
- The 2014 Internet Archive capture used for Williams et al.'s 4Cs article at lines **236 and 1036** returns HTTP 200 and contains the stated title, four authors, journal, volume, and publication date. It replaces the access-fragile Gale destination.
- The remaining PubMed/PMC, EUR-Lex, European Commission, NHS, ITC, Census, W3C, Austrian-government, community-history, repository, archive, and official-guidance destinations resolve or were independently verified as the intended records.

## Claim, design, and transfer audit

- The FR-020 table now links its evidence-basis claims directly to sources. Lines **625–635** correctly distinguish meta-analysis, structured experiment, diary/short experiment, observational association, qualitative interview, simulator study, and indirect transfer.
- Line **625** now describes Sprecher et al. (2013) as one structured experiment with unacquainted dyads and confines the Collins/Sprecher transfer to disclosure and reciprocal turns; it does not attribute the complete First Date ramp or dating outcomes to those studies.
- Line **629** now describes Wildschut et al.'s outcomes as proximal self-reported social-bonding/support measures rather than observed dyadic connection or reconnection.
- The claims using Aron et al. (2000), Kurtz and Algoe (2015), Drews et al. (2008), Edmondson (1999), and Milliken et al. (2003) match their populations and designs and retain explicit noncausal/product-transfer limits.
- Earlier corrected claims remain accurate: Chivers at lines **26 and 379**; Triscoli at **383**; Guan and Wang at **678**; AIM/IAM/FIM transfer limits at **355, 595, and 820**; and the NHS cold-sore basis/limit note at **1318**.
- No other cited population, design, numerical result, causal status, or product transfer produced a material finding.

## Product-safety and internal-consistency audit

- The exact authorization invariant is now consistent at lines **17, 410–412, 430, 442, 483, 553–555, 739, and 757**: every physical start/restart and every materially changed action or condition requires a newly stated exact proposition and fresh masked `Yes + Yes`. Only less, slower, more space, no touch, Pause, Stop, and End take effect immediately.
- Appendix C implements the same invariant. S04 covers unchanged restarts at **1265–1268**; S05 is correctly named `Exact action gate` at **1270**; S06–S08 route restarts, adjusted propositions, and prior eligibility through a fresh exact gate at **1281–1300**; and S09 forbids post-Pause contact without that gate at **1305–1308**.
- The C.7 routing note at line **1677** correctly refers to physical-action invitations—not category gates—and requires a choice/rest card between consecutive invitations.
- The revised PT10, PT21, and PT29 prompts at lines **1167, 1183, and 1196**, with the warning at **1205**, no longer make trust a readiness threshold, solicit structural-power disclosure in the dyad, or mediate a crossed-boundary incident.
- Shared-device choice copy at lines **250 and 1133–1148** consistently says `masked`, discloses co-present inference, and makes no privacy, secrecy, or anonymity promise.
- Residual `low-risk`/`safe setting` assurances were removed from the target FR-019 wording. The setting screen at line **436** uses observable conditions and expressly says it does not certify a setting as safe.

## Structure and completeness audit

- Required top-level order is intact: Sections **1–12**, followed within Section 12 by Appendices **A, B, and C**.
- Section 5 retains `Yes / Adjust / Skip`, non-contiguous eligibility, and the category ladder through `8+`.
- Appendix A contains **37** exact-ID proposal rows; Appendix B contains **36** sequential `PT` candidates; Appendix C contains **54** sequential, non-duplicated bilingual cards (`S00–S10`, `A01–A12`, `B01–B14`, `C01–C12`, `F01–F05`).
- There are **no genuine TBD/TODO/FIXME/placeholder markers**. The only `todo` match is the source filename `radi-owner-todo.md` at line **60**.

**QA editing boundary:** this task did not edit the master report; it updated only this QA memo after independently rechecking the final master snapshot.
