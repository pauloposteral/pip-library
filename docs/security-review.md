# Independent candidate review

Status: review completed; two Important findings fixed and regression-tested by the implementer. Public-release approval remains BLOCKED.

An independent Codex review agent inspected all 68 files, lockfile, policies, skills, examples, workflow and the complete initial local history. Reviewed root commit: `118d138963e981e2b269fda85ffe0401a39fe741`; tree `b32e7bb544c7f277e822c830ebe8514bfde192f5`. It also inspected the factual client-registration documentation updates and their source receipts.

The reviewer found no Critical issue and no actual private payload, Engine code, customer data, binary assets or imported private history in that snapshot. The initial review ran 40 passing tests, file validation, history checks and Git object integrity checks. This is an AI-assisted independent review, not an external certification or a Claude review.

| Finding | Resolution | Verification |
| --- | --- | --- |
| Mixed MCP roots could hide an unapproved endpoint | Validate the exact root for each example filename and reject other roots | New regression failed before correction and passed after |
| Historical filenames were not scanned | Scan historical paths and reject private references and unapproved types | New two-commit deleted-path fixture failed before correction and passed after |

Fix commit: `3af56d8b4e422c68affeb82f2ee1ce435611434d` (local tested history; remote commit mapping is recorded separately). The verified post-fix local suite reported 42 passed, 0 failed, 0 skipped; offline validation and two-commit history scan passed. The independent reviewer did not perform a second pass after fixes. The implementer reconciled the fixes with the findings and ran their regressions and the full suite. Do not call this an independently reverified final release.

The independent-review workflow is recorded as PASS for completed review and closure of its two Important findings with executed regressions. This status does not expand the reviewed snapshot or assert a second independent pass. Later changes are factual evidence documentation, status metadata and hashes; the maintainer inspected that diff. Overall publication remains BLOCKED by hosted CI and client compatibility gates. The separately reviewed metadata-gate increment and final remote privacy verification are recorded below.

## Deferred minor findings

1. Separate prepublication readiness from a future automated postpublication public-access gate. Current public access is unverified and no public-release claim is made.
2. Add a dedicated content-free security-contact issue form; current blank issues are disabled, so the fallback is awkward.
3. Add explicit long-form social copy and an elevator-pitch variant to the launch kit.

## Scope limits

The review does not establish legal ownership or owner license approval, audit every line of upstream action/dependency source, verify all live external links, certify mobile rendering, prove client-mediated invocation or permission-denial behavior, or prove absence of every possible secret. Remote visibility, CI and publication checks require separate evidence. No paid inference, telemetry, billing or production activation was performed.

## Transport metadata correction

Final remote metadata inspection found a personal author/committer email added by the GitHub connector. The affected staging repository remains private and is preserved. The same candidate files were moved through an authorized GitHub CLI using fresh noreply commits in the definitive repository. The release review must inspect both file bytes and author/committer metadata; a matching file tree alone does not verify commit privacy. No raw personal email is included in this receipt.

**Historical finding, contained:** the earlier review repository had authored noreply commits but GitHub's generated PR test-merge object retained the account's personal author email. That repository remains private. The owner-authorized account email-privacy setting was enabled before creating the final destination. No claim is made that earlier private cached objects were deleted. A release-gate regression rejects absent or blocked Git metadata evidence, even when all other approval flags pass.

The new metadata-gate increment received a separate, scoped independent review. No Important or Critical finding was reported. The reviewer independently passed direct gate assertions and 70-file validation; its full npm test attempt was blocked before tests by temporary environment disk exhaustion (ENOSPC). The implementer's executed regression was RED (42 passed, 1 failed) then GREEN (43 passed, 0 failed). The gate checks a recorded review status and receipt; it does not query remote GitHub metadata itself. This increment changes validator code and its regression test in addition to evidence documentation. Earlier functionality was not re-reviewed. The minor wording and evidence-table clarifications were subsequently applied.

## Final destination boundary

**VERIFIED on 2026-10-30 UTC:** the definitive repository is `pauloposteral/pip-public-library` (repository ID `1439255503`). It was created after authorized account email privacy was enabled. It received approved file bytes and fresh noreply commits, not earlier Git objects or PR refs.

Authenticated Git API inspection verified root `1a120a8b52fcf44fce72ba0bd985162748fc1697` has no parents; candidate `eb919c6452f19b1cb5f61262bf25f13b8d40ca4a` has only that root as parent. All author and committer identities use noreply addresses, including GitHub-generated PR merge `82c2bc5b52538a67c72065d6059768b7eacce132`. The four returned refs were main, the candidate branch, PR head and PR merge. Both specifically identified earlier affected objects returned authenticated HTTP 404 in this destination. Earlier preparation and review repositories, including their objects, remain private and preserved; this receipt does not assert their deletion.

The candidate tree at that snapshot was `792e2c05c2ae66252b0fa728a6ed56c30f500920`, matching the locally tested tree. This receipt itself changes the tree. [PR #1](https://github.com/pauloposteral/pip-public-library/pull/1) records the resulting final head/tree, ref recheck and visibility checks. Recheck newly generated refs after later changes; this dated receipt is not an automatic guarantee for future commits.

## Independent portability review

An independent reviewer inspected `2ce9a845befb436332c37b2f421f193f619365ff` through `eda43b03d9935a373141aa1857312e0457f76cb0`, then inspected and independently tested the fixture correction committed locally as `0df6b6ee277d13e30da80dc2ffe89c8d3ce09777`. The scope covered the bounded worktree-metadata exemption, LF checkout policy, real link/junction rejection tests, allowlist and manifest changes. No Critical issue was found.

One Important issue was found and closed: the synthetic linked-worktree fixture omitted the LF policy and failed with inherited autocrlf enabled. Both implementer and reviewer reproduced 49 passing tests/one failure, then independently passed all 50 tests and 71-file validation after the fixture copied and allowlisted the actual policy before hashing. No remaining Critical, Important or Minor finding was identified in this scoped increment. The reviewer also validated an actual candidate clone with autocrlf enabled and its linked worktree.

The reviewer approved the portability increment, not public release. Full native Windows execution, hosted CI, client-mediated invocation, final evidence-only edits and subsequent remote Git refs remain separate checks. This is an independent AI-assisted code review, not certification of upstream internals, the private application or production services.

## Concurrent-ref review

A separate independent read-only review at 2026-10-30T09:03:34Z inspected draft PR #2 at `63ab80f8aa30e15c4ebc2fd9fe4f7c8aaa8b5e19` and draft PR #3 at `734dfcc1e003b4a33532db8b4fac148ff9ec029e`. Both are concurrent growth work, outside release PR #1. All nine current added files and all ten added commit patches were read. Known-sensitive-pattern scanning exited 0 with no matches; no actual secret, personal payload, private Engine or brand image was observed. All ten authored commits and both generated PR merge objects used noreply identities. This scoped review is not runtime acceptance.

**BLOCKED — export reconciliation:** the growth branches inherit the 71-file candidate inventory/manifest but add nine paths: `growth-agents/.env.example`, `LANGUAGE_POLICY.md`, `OPERATIONS.md`, `README.md`, `agents.json`, `runtime.mjs`, `runtime.test.mjs`, `telegram.mjs` and `validate.mjs` (all under `growth-agents/`). PR #3 therefore has 80 files, with nine unlisted and unhashed additions. Repository visibility exposes these branches and PRs even when unmerged. Preserve them and complete their own export/review reconciliation before publication; PR #1's approval cannot silently cover them.

**PARTIAL — Important static concern:** the exported `telegramCall` helper accepts `sendMessage` without the release/channel/mode checks applied by `publishApproved`, so a direct caller can bypass that wrapper. Configured credentials would be needed for an external effect. No live call or exploit was attempted; no incident is asserted. The concurrent runtime needs a complete review and meaningful mocked regression before it can be described as fully gated. The release continuation did not alter or merge these concurrent branches.

**NOT RUN:** growth runtime tests, bot operations and outreach. These findings require a fresh ref check because concurrent work may continue. The existing candidate review remains scoped to its reviewed code.

## Native verification evidence review

A separate independent review compared this evidence-only continuation against candidate `10d31811545cf743b5f122a5fd567df5288eb335` and the actual Windows, client and CI receipts. No executable, test, dependency or workflow changed. The reviewer found no Critical or Important issue; one minor phrase was narrowed to the observed Codex result shape (one text content item plus structured content). Embedded MCP receipts matched their source artifacts and the diagnostic SHA-256. The reviewer independently passed `npm run check` (50 tests, 71 files), history validation and `git diff --check`, all exit 0. `npm run release:check` still exited 1 for CI and incomplete client compatibility, with the additional repository-wide manual condition explicitly blocked. This is an evidence-consistency review, not approval of publication or the concurrent growth runtime.

## Repository-scope gate increment — 2026-11-12

Base: `50b8ec7d1edd8451658ede6e9f3367c8c2725118`. The existing `releaseIssues` function did not inspect `repository_scope`, although the real release receipt marked that field BLOCKED. With all other gates satisfied, a synthetic missing or blocked scope incorrectly returned no release issue. This was reproduced without changing any real approval.

The correction requires the existing `repository_scope.status` to be VERIFIED and its `reference` to be a non-empty string. It introduces no new receipt field. The six regression cases cover absent scope, BLOCKED scope, absent/blank/non-text reference, and successful validation only when every recorded gate passes. Baseline: 50 tests passed. Before the correction: five new cases failed and one passed. After the correction: all 56 tests passed, none failed or skipped. The updated complete 71-file candidate also passed `npm run check`; the reviewed manifest was regenerated without adding paths.

**Update 2026-11-14:** `repository_scope` is now VERIFIED for the public repository `pip-library`, which exposes only `main`; see [the publication receipt](release-preparation.md#public-repository--2026-11-14). `publication_status` stays BLOCKED until the tag and release. The paragraph below describes the state on 2026-11-12.

The actual `publication_status` and `repository_scope.status` remain BLOCKED. `npm run release:check` exits 1 for three named conditions: hosted CI, incomplete client compatibility, and repository-wide export review. This supersedes the earlier description of repository scope as an exclusively manual condition outside the automated gate. The function verifies recorded status and receipt presence; it does not authenticate a receipt, query GitHub refs, or perform the review itself.

Scope remains limited to this validator change and its evidence. All 71 base files were retrieved at the immutable base commit with Git blob hashes checked before editing. The complete remote history and all exposed branch/PR refs were not rescanned. Concurrent growth PRs #2-#5 still require export reconciliation and runtime review. Hosted CI remains skipped; clients, native Windows, bot operations, visibility and deployment were not retested or changed. This is not public-release approval.
