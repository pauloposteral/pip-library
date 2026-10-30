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
