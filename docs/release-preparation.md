# v0.1.0 preparation receipt

Preparation date: 2026-10-30 UTC. **Overall status: BLOCKED for public release.** This is an executed private candidate, not an announced open-source release. Status terms describe the scope of each row: VERIFIED is observed evidence; DONE is an existing artifact; PARTIAL is incomplete scope; BLOCKED needs a named prerequisite; NOT RUN has no execution claim.

## Repository and content

| Item | Status | Evidence and limit |
| --- | --- | --- |
| Existing-work recovery | VERIFIED | Four existing launch/expansion documents, branch/PR state, application guidance, commercial authority and public MCP boundary were read. Existing application work was preserved. |
| Repository and owner | VERIFIED | [pauloposteral/pip-public-library](https://github.com/pauloposteral/pip-public-library), owned by pauloposteral, private, not a fork. Description and homepage match the approved brief. |
| Separate history | VERIFIED | Remote-bound root `1a120a8b52fcf44fce72ba0bd985162748fc1697` has no parents. All authored commits use the GitHub noreply identity. No application Git history was copied. |
| Provider-generated Git metadata | VERIFIED | The final destination's root, candidate and generated PR merge use noreply identities. All four returned refs were inspected; earlier affected objects returned authenticated 404 in this destination. Earlier checkpoints remain private and preserved. [Dated scope](security-review.md) and PR #1 record the proof; no personal address is reproduced here. |
| Implementation checkpoint | VERIFIED | The original implementation passed its independent review and corrected regressions. The final content tree and current remote commit are recorded in [PR #1](https://github.com/pauloposteral/pip-public-library/pull/1). The initial transport changed evidence documentation; the later privacy gate and regression test received a separate scoped review. |
| Reviewable distribution | DONE | Candidate branch `release/v0.1.0-candidate`; PR #1 is draft. The default branch contains only the initial README until integration. Use the candidate branch for the complete package. |
| Export inventory | DONE | 70 UTF-8 text files, including this receipt; [explicit path/provenance inventory](../export-policy.json) and [SHA-256 manifest](../MANIFEST.sha256). No media, binaries, private endpoints, Engine or customer projects are included. Manifest excludes its own hash; Git binds its bytes. |
| Original-content license | DONE | The owner-approved standard MIT grant is applied in LICENSE; [decision and exclusions](license-decision.md) preserve brand, character, proprietary-asset and private-Engine ownership. |
| Attribution | DONE | [NOTICE](../NOTICE.md), dependency license inventory and upstream links. Dependencies are not vendored; no upstream skill or character asset was copied. |
| v0.1.0 tag and GitHub release | BLOCKED | No tag or release was created. Authenticated release listing was empty. Publication gates remain unsatisfied. |
| Anonymous access | BLOCKED | Unauthenticated repository and v0.1.0 release REST requests each returned 404. Public README, license and skills access is NOT RUN because the repository is private. |
| Original application privacy | VERIFIED | Source repository remained private at final metadata inspection. No source visibility setting was changed. |
| Origin, mission and roadmap | DONE | English [origin](why-pip-exists.md), [mission](mission.md) and [roadmap](vision-and-roadmap.md) exist in the private candidate. They are not yet publicly published. Future products are labeled future. |

## Executed validation and security

| Check | Status | Actual result |
| --- | --- | --- |
| Initial failing tests | VERIFIED | `npm test`: 5 pass, 35 fail, 0 skipped; exit 1 before validator implementation. |
| Initial implementation | VERIFIED | `npm test`: 40 pass, 0 fail, 0 skipped; exit 0. |
| Review regression failures | VERIFIED | `npm test`: 40 pass, 2 fail, 0 skipped; exit 1 before the two corrections. |
| Corrected implementation | VERIFIED | `npm run check`: 42 pass, 0 fail, 0 skipped; exit 0. File syntax, local links, skills, allowed paths, hashes, MCP configuration and workflow rules pass. |
| Metadata gate and final candidate | VERIFIED | `npm run check`: 43 pass, 0 fail, 0 skipped; 70-file validation passes, exit 0. This is the implementer's executed suite; the independent metadata review passed direct assertions and file validation but its full test launch encountered ENOSPC. |
| Linked-worktree isolation attempt | PARTIAL | Dependency install exited 0 and all 42 unit tests passed, but `npm run check` exited 1 because the `.git` pointer file was rejected as unlisted metadata. Linked-worktree validation is unsupported. A standalone clone is the supported validation shape; the final PR records its executed result. |
| Git history scan | VERIFIED | `node tools/validate-library.mjs --history`: exit 0; filenames and historical blobs checked. `git fsck --full`: exit 0. |
| Dependency advisories | VERIFIED | `npm audit --json`: exit 0, zero reported vulnerabilities for locked development dependencies at check time. This is not a full source audit. |
| Independent code/security review | VERIFIED | Independent AI review inspected the initial complete export and history; no Critical finding or actual private payload found. Two Important validator weaknesses were reproduced and corrected with passing regressions. Scope and three deferred minor findings are in [the review](security-review.md). No independent second pass or external certification is claimed. |
| GitHub Actions | PARTIAL | Workflow exists with read-only permissions, pinned first-party actions, no secrets, no privileged contribution trigger and no persisted checkout credential. The original private staging run was skipped with zero executed steps; hosted CI is not passed. The current destination run is recorded in PR #1. |
| Publication gate | BLOCKED | `npm run release:check` intentionally exits 1 while hosted CI and client compatibility remain incomplete. The license and Git metadata gates pass. Disabled spending and commercial features are required. |

Tests validate the library, not the private application. Scanning is heuristic and does not prove the absence of every possible secret. The synthetic task-list and QA sample artifacts are explicitly labeled; they are not counted as executed product tests. Hashes and links do not themselves establish legal ownership.

## Public MCP and client paths

| Path | Status | Observed scope |
| --- | --- | --- |
| Raw public MCP | VERIFIED | `https://mypip.site/mcp`: initialize HTTP 200, initialized notification 202, discovery 200, `get_faq` invocation 200. Exactly `get_faq`, `list_proposed_plans`, `get_join_status`, each read-only. [Timestamped receipt](mcp-verification.json) contains response hashes. Other tools were discovered, not invoked. |
| Codex 0.166.0 | PARTIAL | Version/add/list commands exited 0. App-server discovery returned exactly the three tools with no tool-list error. Ephemeral session startup timed out after 40 seconds; client invocation was not submitted. No model turn ran. |
| Claude Code 2.1.314 | PARTIAL | Version/add/get exited 0 in isolated configuration; client reported Connected. Client discovery and invocation NOT RUN. |
| VS Code/Copilot | NOT RUN | Official documentation checked and JSON examples parsed. No installed-client result is claimed. |
| Lovable connector | NOT RUN | Official connector documentation checked. No connector was installed, paid build triggered or runtime application integration claimed. |
| Documentation research | DONE | Context7, Firecrawl and official upstream documentation informed the guides. [Sources](sources.md) distinguish documentation from execution evidence. |

The [compatibility matrix](compatibility.md) records stage-specific results. Raw HTTP success does not certify all clients. No private technical MCP tool is advertised.

## Community, adoption and commercial boundaries

| Item | Status | Actual delivery or blocker |
| --- | --- | --- |
| Library adoption material | DONE | Three original skills; four Markdown templates plus evidence-manifest JSON; four integration guides; two worked examples; four tutorials; issue forms, contribution/code-of-conduct/security policies and changelog. |
| Growth program | PARTIAL | [90-day program](growth/30-60-90-days.md), adoption journey, launch drafts, interview guide and measurement definitions are prepared. Day 1 begins after verified publication. No posts, outreach, directory submissions or interviews were sent or conducted. |
| Adoption measurements | NOT RUN | External installs, users, repeat use and external contributors are unknown, not zero. Interviews actually completed: 0. Private staging stars/forks were 0 at inspection; those are not public adoption evidence. [Metric targets](growth/metrics.json) remain hypotheses: 5 interviews, 10 examples, 1 independently reproduced QA workflow. |
| Analytics | NOT RUN | No tracking or PostHog configuration. Consent and privacy configuration remain prerequisites. |
| Monetization readiness | BLOCKED | The library is intended to stay free. Assurance, Cloud and Build Engine remain future. USD is canonical; no price or willingness-to-pay result is validated. Research questions exist, but buyer interviews and provider cost reconciliation have not run. |
| Financial/runtime gates | BLOCKED | No billing, checkout, credits, paid model calls or Engine execution activated. Tenant isolation, billing rights, cost measurement, rate cards, reservations, provider reconciliation, payment sandbox webhooks, refunds and tax obligations still need independent acceptance before a commercial launch. |
| Branding | VERIFIED | PIP naming and approved mission retained. No replacement logo/character or unreviewed original asset was generated or published. No affiliation with other providers is implied. |

## Implementation rulings and deferred work

A metadata inspection found that the original GitHub connector attached the account's personal email to commits. A subsequent private review checkpoint had a provider-generated PR merge with the same issue. Both checkpoints and their PRs were preserved privately. After enabling the owner-authorized account email-privacy setting, the final destination was created with fresh noreply commits and approved file bytes. Authenticated checks confirmed its authored and generated commits use noreply identities and earlier affected objects are unavailable in this destination. The GitHub connector offers no per-commit author override, so the authorized GitHub CLI created explicitly attributed commit objects. Earlier private history was not transported, deleted or declared purged. The source implementation was preserved.

The export was authored in a new isolated repository because independent history is required. A linked worktree of the private source would not provide that boundary. Project skills are distributed in this repository, not installed into personal agent settings. MIT was activated after the explicit owner decision was recovered and recorded. Private hosted Actions remain disabled under the zero-spending constraint; this sacrifices hosted CI proof rather than changing the account budget. Completed independent review and executed regression fixes close its Important findings without inventing a second review. Unexecuted legal, client, public-access and commercial checks remain explicit limits.

Deferred minor findings: separate prepublication and postpublication gates; add a content-free security-contact issue form; add long social and elevator-pitch launch copy. These have not been silently fixed or declared complete.

## Next three reviewable increments

1. **PARTIAL — Validation portability:** correct Windows checkout line-ending and symlink-fixture failures without weakening secret or path checks; define support for linked worktrees and add regressions for the chosen behavior.
2. **PARTIAL — Client and CI evidence:** finish client-mediated FAQ checks and denied-permission behavior in supported clients, resolve the Codex session timeout, and run hosted CI only when a no-cost runner allowance is available. Address the deferred release/contact checks in a separate reviewed patch. Recheck generated Git metadata after every branch update.
3. **BLOCKED — Public release and observed activation:** after gates pass, integrate the candidate, publish only this repository, tag/release v0.1.0, verify anonymous repository/README/license/skills/release access and source privacy, then begin consent-based interviews and measure real activation. Do not retroactively mark targets as achieved.
