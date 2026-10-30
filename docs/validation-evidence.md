# Candidate validation evidence

Environment: Node 24.22.1, npm 11.9.0, Linux. Preparation date: 2026-10-30 UTC.

| Check | Actual result | Scope |
| --- | --- | --- |
| `npm test` against initial no-op validator | 5 passed, 35 failed, 0 skipped; exit 1 | RED demonstration; implementation absent |
| `npm test` after implementation | 40 passed, 0 failed, 0 skipped; exit 0 | Initial local validator and protocol parser |
| Independent-review regressions before fixes | 40 passed, 2 failed, 0 skipped; exit 1 | Mixed MCP roots and historical private paths |
| Provider-metadata gate regression before correction | 42 passed, 1 failed; exit 1 | Otherwise approved release incorrectly accepted blocked Git metadata evidence |
| Metadata gate after correction | 43 passed, 0 failed, 0 skipped; exit 0 | Final implementer-run suite; independent review separately passed direct assertions and file validation |
| `npm run check` after review fixes | 42 passed, 0 failed, 0 skipped; exit 0 | All local checks and complete candidate validation |
| Isolated linked-worktree attempt | Unit tests 42 passed; `npm run check` exit 1 | Validator rejects the worktree's `.git` pointer file as unlisted/unhashed metadata. Linked-worktree validation is unsupported; use a standalone clone as in GitHub Actions. |
| `npm audit --json` | 0 reported vulnerabilities; exit 0 | Registry advisory result for the locked development dependencies at preparation time |
| `node tools/mcp-smoke.mjs` | See [real receipt](mcp-verification.json) | Raw legacy MCP discovery and FAQ invocation |
| GitHub-hosted CI | SKIPPED, not passed | Original private staging run; no job steps ran. Current destination evidence is linked from PR #1. Hosted execution is unavailable within the current zero-spending constraint. |
| Unauthenticated repository/release access | HTTP 404 for both REST lookups | Candidate remains private; no v0.1.0 release exists. This is not a public-access pass. |

The local test output is an execution result, not the synthetic example report. Test counts cover the library validation code, not any private PIP application or customer project. Independent review and final candidate checks are recorded separately before a release decision.

Workflow actions resolve to upstream commits: checkout `11d5960a326750d5838078e36cf38b85af677262`, setup-node `49933ea5288caeca8642d1e84afbd3f7d6820020`. Their action metadata was inspected; this is not a line-by-line audit of bundled upstream code. Dependency installation is locked and install scripts are disabled. The workflow has `contents: read`, does not persist checkout credentials, and uses no secrets or privileged PR trigger.

Limitations: automated scanning is heuristic; a human review must inspect all exported bytes and Git history. External documentation links were checked by source retrieval; offline validation verifies local links and syntax, not every remote server's ongoing availability. No signed attestation is generated.

## Additional Windows result

An owner-account report preserved in the private preparation checkpoint records a separate Windows checkout test on Node 24.13.0/npm 11.6.2: 41 passing tests and 1 failing test because symlink creation returned EPERM. File validation reported hash mismatches after CRLF checkout conversion. Regenerating that local manifest did not validate the reviewed Git bytes and was not committed. This is a reported Windows failure, not a new Linux failure or a passing Windows certification. Current end-to-end library validation is verified on Linux; Windows checkout and symlink-fixture compatibility need correction without weakening security coverage.
