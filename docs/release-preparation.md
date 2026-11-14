# v0.1.0 preparation receipt

Preparation date: 2026-10-30 UTC. **Overall status: BLOCKED for public release.** This is an executed private candidate, not an announced open-source release. **Update 2026-11-14:** the reviewed tree is now public as [pauloposteral/pip-library](https://github.com/pauloposteral/pip-library); see [Public repository](#public-repository--2026-11-14). The v0.1.0 tag and release stay BLOCKED on client compatibility. Status terms describe the scope of each row: VERIFIED is observed evidence; DONE is an existing artifact; PARTIAL is incomplete scope; BLOCKED needs a named prerequisite; NOT RUN has no execution claim.

## Repository and content

| Item | Status | Evidence and limit |
| --- | --- | --- |
| Existing-work recovery | VERIFIED | Four existing launch/expansion documents, branch/PR state, application guidance, commercial authority and public MCP boundary were read. Existing application work was preserved. |
| Repository and owner | VERIFIED | [pauloposteral/pip-public-library](https://github.com/pauloposteral/pip-public-library), owned by pauloposteral, private, not a fork. Description and homepage match the approved brief. |
| Separate history | VERIFIED | Remote-bound root `1a120a8b52fcf44fce72ba0bd985162748fc1697` has no parents. All authored commits use the GitHub noreply identity. No application Git history was copied. |
| Provider-generated Git metadata | VERIFIED | The final destination's root, candidate and generated PR merge use noreply identities. All four returned refs were inspected; earlier affected objects returned authenticated 404 in this destination. Earlier checkpoints remain private and preserved. [Dated scope](security-review.md) and PR #1 record the proof; no personal address is reproduced here. |
| Implementation checkpoint | VERIFIED | The original implementation passed its independent review and corrected regressions. The final content tree and current remote commit are recorded in [PR #1](https://github.com/pauloposteral/pip-public-library/pull/1). The privacy gate and portability corrections received separate scoped reviews; local review commits and remote publication mapping are recorded separately. |
| Reviewable distribution | DONE | Candidate branch `release/v0.1.0-candidate`; PR #1 is draft. The default branch contains only the initial README until integration. Use the candidate branch for the complete package. |
| Export inventory | DONE | 71 UTF-8 text files, including this receipt and the reviewed LF checkout policy; [explicit path/provenance inventory](../export-policy.json) and [SHA-256 manifest](../MANIFEST.sha256). No media, binaries, private endpoints, Engine or customer projects are included. Manifest excludes its own hash; Git binds its bytes. |
| Original-content license | DONE | The owner-approved standard MIT grant is applied in LICENSE; [decision and exclusions](license-decision.md) preserve brand, character, proprietary-asset and private-Engine ownership. |
| Attribution | DONE | [NOTICE](../NOTICE.md), dependency license inventory and upstream links. Dependencies are not vendored; no upstream skill or character asset was copied. |
| v0.1.0 tag and GitHub release | BLOCKED | No tag or release was created. Authenticated release listing was empty. Publication gates remain unsatisfied. |
| Anonymous access | VERIFIED | 2026-11-14: an unauthenticated REST request for `pauloposteral/pip-library` returned the repository as public, default branch `main`, license MIT. The v0.1.0 release lookup still fails because no release exists. The earlier 404 results applied to the private staging repository. |
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
| Linked-worktree validation | VERIFIED | Historical pointer rejection was reproduced and corrected. At the portability code commit, locked install, full check and history scan exited 0; 50 tests passed, 71 files validated. A separate independent review also validated a real clone and linked worktree with autocrlf enabled. |
| Final portability suite | VERIFIED | `npm run check` with inherited `core.autocrlf=true`: exit 0; 50 passed, 0 failed, 0 skipped. Complete native Windows check at `10d31811545cf743b5f122a5fd567df5288eb335` also passed: 50 tests, 71 files, four remote history commits; all commands exit 0, no skips. [Exact scope](validation-evidence.md#complete-native-windows-run). |
| Git history scan | VERIFIED | `node tools/validate-library.mjs --history`: exit 0; filenames and historical blobs checked. `git fsck --full`: exit 0. |
| Dependency advisories | VERIFIED | `npm audit --json`: exit 0, zero reported vulnerabilities for locked development dependencies at check time. This is not a full source audit. |
| Independent code/security review | VERIFIED | Independent AI review inspected the initial complete export and history; no Critical finding or actual private payload found. Two Important validator weaknesses were reproduced and corrected with passing regressions. Scope and three deferred minor findings are in [the review](security-review.md). The portability increment received a separate independent review that found and reverified closure of one fixture issue. No external certification is claimed. |
| GitHub Actions | VERIFIED | 2026-11-14: on the public repository, push run [43534590972](https://github.com/pauloposteral/pip-library/actions/runs/43534590972) at `8f0f375` ran every step and passed: locked `npm ci --ignore-scripts`, `npm run check` and the history scan. Earlier history: workflow exists with read-only permissions, pinned first-party actions, no secrets, no privileged contribution trigger and no persisted checkout credential. The original private staging run was skipped with zero executed steps; hosted CI is not passed. The current destination run is recorded in PR #1. The direct skip cause is the private-repository job condition. The existing account page still displays 100% Actions budget and blocked extra usage. A fresh usage-summary API request failed with HTTP 404 and a required user-scope message; no scope expansion occurred. Included minutes remain unverified. |
| Publication gate | BLOCKED | 2026-11-14: `npm run release:check` exits 1 only because client compatibility remains incomplete. License, review, hosted CI, Git metadata and repository-scope gates pass. Disabled spending and commercial features are required. |

Tests validate the library, not the private application. Scanning is heuristic and does not prove the absence of every possible secret. The synthetic task-list and QA sample artifacts are explicitly labeled; they are not counted as executed product tests. Hashes and links do not themselves establish legal ownership.

## Public MCP and client paths

| Path | Status | Observed scope |
| --- | --- | --- |
| Raw public MCP | VERIFIED | `https://mypip.site/mcp`: initialize HTTP 200, initialized notification 202, discovery 200, all three approved tool invocations HTTP 200 with usable text and no tool errors. Exactly `get_faq`, `list_proposed_plans`, `get_join_status`, each read-only. [Timestamped receipt](mcp-verification.json) contains response hashes. The bounded follow-up invoked all three with empty arguments; the shipped smoke command remains FAQ-only. |
| Codex 0.166.0 | PARTIAL | Version/add/list commands exited 0. App-server discovery returned exactly the three tools with no tool-list error. Ephemeral session startup timed out after 40 seconds; client invocation was not submitted. No model turn ran. |
| Codex bundled 0.166.0-alpha.1 | PARTIAL | Independent follow-up: add/list exit 0, exact three tools discovered; read-only thread creation failed in local filesystem sandbox with RPC -32603. No tool/model call submitted. This does not establish the old stable timeout cause. |
| Codex Windows 0.164.0 | VERIFIED | Existing installed client, isolated task configuration; exact three read-only tools discovered, read-only ephemeral thread started and real `get_faq` returned one text content item plus structured content. App-server exit 0; zero model turns. Permission-denial NOT RUN. [Stages and limits](compatibility.md#native-windows-client-follow-up). |
| Claude Code 2.1.314 | PARTIAL | Version/add/get exited 0 in isolated configuration; client reported Connected. Client discovery and invocation NOT RUN. |
| Claude Code Windows 2.1.310 | PARTIAL | Fresh add/get exit 0 and Connected; separate project configuration showed Pending approval and Rejected. Discovery and tool invocation remain NOT RUN; no model prompt submitted. |
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

## Concurrent branches and publication scope

**Update 2026-11-14:** publication used a separate public repository, so the concurrent refs below are not exposed. See [Public repository](#public-repository--2026-11-14).

**BLOCKED:** concurrent draft PRs #2 and #3 add nine growth files outside the candidate's 71-file export inventory and hashes. Their branches remain separate and preserved. Publishing this repository would also expose those refs; the candidate review does not authorize their export automatically. A scoped independent inspection found no actual secret in the new files/patches and verified noreply metadata, but identified a static gate-bypass concern in the Telegram helper. No runtime or outreach ran. [Exact scope and finding](security-review.md#concurrent-ref-review). This manual repository-wide publication condition is additional to the automated CI/client gate; it is not silently treated as passed.

## Implementation rulings and deferred work

A metadata inspection found that the original GitHub connector attached the account's personal email to commits. A subsequent private review checkpoint had a provider-generated PR merge with the same issue. Both checkpoints and their PRs were preserved privately. After enabling the owner-authorized account email-privacy setting, the final destination was created with fresh noreply commits and approved file bytes. Authenticated checks confirmed its authored and generated commits use noreply identities and earlier affected objects are unavailable in this destination. The GitHub connector offers no per-commit author override, so the authorized GitHub CLI created explicitly attributed commit objects. Earlier private history was not transported, deleted or declared purged. The source implementation was preserved.

The export was authored in a new isolated repository because independent history is required. A linked worktree of the private source would not provide that boundary. Project skills are distributed in this repository, not installed into personal agent settings. MIT was activated after the explicit owner decision was recovered and recorded. Private hosted Actions remain disabled under the zero-spending constraint; this sacrifices hosted CI proof rather than changing the account budget. Completed independent review and executed regression fixes close its Important findings without inventing a second review. Unexecuted legal, client, public-access and commercial checks remain explicit limits.

Deferred minor findings: separate prepublication and postpublication gates; add a content-free security-contact issue form; add long social and elevator-pitch launch copy. These have not been silently fixed or declared complete.

## Next three reviewable increments

1. **PARTIAL — Remaining client verification:** native Windows validation and a real Codex FAQ invocation are now complete. Finish Claude, Copilot and Lovable stages and applicable permission-denial checks without paid model turns or changing personal settings.
2. **DONE for pip-library (2026-11-14) — CI and repository-wide review:** hosted CI passed on the public repository, which exposes only `main`. The text below is the original plan for the private staging repository.
   **Original plan:** establish verified no-cost hosted capacity and review the private-job condition before execution. Reconcile the nine extra files and static runtime concern in concurrent PRs #2/#3; preserve those branches. Recheck all refs and generated Git metadata before publication.
3. **BLOCKED — Public release and observed activation:** after gates pass, integrate the candidate, publish only this repository, tag/release v0.1.0, verify anonymous repository/README/license/skills/release access and source privacy, then begin consent-based interviews and measure real activation. Do not retroactively mark targets as achieved.

## Public repository — 2026-11-14

The reviewed candidate tree was published as a new public repository, [pauloposteral/pip-library](https://github.com/pauloposteral/pip-library). The private staging repository `pip-public-library` keeps the growth work and its PRs #2–#5; none of that is in the public repository.

| Check | Status | Observed result |
| --- | --- | --- |
| Exposed refs | VERIFIED | REST listing on 2026-11-14: one branch (`main` at `8f0f375`), 0 tags, 0 releases, 0 pull requests. The commits are the reviewed candidate history with noreply identities. |
| Anonymous access | VERIFIED | Unauthenticated REST request: public, default branch `main`, license MIT. |
| Hosted CI | VERIFIED | Push run [43534590972](https://github.com/pauloposteral/pip-library/actions/runs/43534590972) at `8f0f375`: checkout, locked install without scripts, `npm run check` and `--history` all succeeded. |
| v0.1.0 tag and release | BLOCKED | Not created. Waits on the remaining client checks and an explicit owner decision. |

Limits: no outreach, interviews or analytics started, and no client check was rerun for this update.
