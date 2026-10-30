# Candidate validation evidence

Environment: Node 24.22.1, npm 11.9.0, Linux. Preparation date: 2026-10-30 UTC.

| Check | Actual result | Scope |
| --- | --- | --- |
| `npm test` against initial no-op validator | 5 passed, 35 failed, 0 skipped; exit 1 | RED demonstration; implementation absent |
| `npm test` after implementation | 40 passed, 0 failed, 0 skipped; exit 0 | Initial local validator and protocol parser |
| Independent-review regressions before fixes | 40 passed, 2 failed, 0 skipped; exit 1 | Mixed MCP roots and historical private paths |
| Provider-metadata gate regression before correction | 42 passed, 1 failed; exit 1 | Otherwise approved release incorrectly accepted blocked Git metadata evidence |
| Metadata gate after correction | 43 passed, 0 failed, 0 skipped; exit 0 | Final implementer-run suite; independent review separately passed direct assertions and file validation |
| Final MIT-licensed candidate `npm run check` | 43 passed, 0 failed, 0 skipped; 70 files valid; exit 0 | Linux standalone checkout, including license and metadata-evidence documentation; final tree is recorded in PR #1 |
| `npm run check` after review fixes | 42 passed, 0 failed, 0 skipped; exit 0 | All local checks and complete candidate validation |
| Historical linked-worktree attempt | Unit tests 42 passed; `npm run check` exit 1 | The earlier validator rejected the worktree's `.git` pointer. Corrected and revalidated in the portability increment below. |
| `npm audit --json` | 0 reported vulnerabilities; exit 0 | Registry advisory result for the locked development dependencies at preparation time |
| `node tools/mcp-smoke.mjs` | See [real receipt](mcp-verification.json) | Raw legacy MCP discovery and FAQ invocation |
| GitHub-hosted CI | SKIPPED, not passed | Original private staging run; no job steps ran. Current destination evidence is linked from PR #1. Hosted execution is unavailable within the current zero-spending constraint. |
| Unauthenticated repository/release access | HTTP 404 for both REST lookups | Candidate remains private; no v0.1.0 release exists. This is not a public-access pass. |

The local test output is an execution result, not the synthetic example report. Test counts cover the library validation code, not any private PIP application or customer project. Independent review and final candidate checks are recorded separately before a release decision.

Workflow actions resolve to upstream commits: checkout `11d5960a326750d5838078e36cf38b85af677262`, setup-node `49933ea5288caeca8642d1e84afbd3f7d6820020`. Their action metadata was inspected; this is not a line-by-line audit of bundled upstream code. Dependency installation is locked and install scripts are disabled. The workflow has `contents: read`, does not persist checkout credentials, and uses no secrets or privileged PR trigger.

Limitations: automated scanning is heuristic; a human review must inspect all exported bytes and Git history. External documentation links were checked by source retrieval; offline validation verifies local links and syntax, not every remote server's ongoing availability. No signed attestation is generated.

## Additional Windows result

An owner-account report preserved in the private preparation checkpoint records a separate Windows checkout test on Node 24.13.0/npm 11.6.2: 41 passing tests and 1 failing test because symlink creation returned EPERM. File validation reported hash mismatches after CRLF checkout conversion. Regenerating that local manifest did not validate the reviewed Git bytes and was not committed. The later targeted probe below reproduced the fixture failure directly; the subsequent complete native run passed as recorded below.

## Portability increment — 2026-10-30 UTC

Source checkpoint: `2ce9a845befb436332c37b2f421f193f619365ff`. Local code correction: `0df6b6ee277d13e30da80dc2ffe89c8d3ce09777`. The existing three source commits and trees were recovered with exact object-SHA verification; no replacement history was created remotely.

| Check | Status | Executed result |
| --- | --- | --- |
| Checkpoint reproduction | VERIFIED | `npm ci --ignore-scripts --no-fund --no-audit` and `npm run check`: exit 0, 43 passed, 70 files valid |
| New worktree and LF regressions before fixes | VERIFIED | `npm test`: exit 1; 46 passed, 2 failed, 0 skipped. Actual Git worktree pointer rejection and CRLF checkout byte changes reproduced |
| Initial portability correction | VERIFIED | `npm run check`: exit 0; 50 passed, 0 failed, 0 skipped; 71 files valid |
| Independent fixture finding before correction | VERIFIED | With inherited `core.autocrlf=true`, `npm test`: exit 1; 49 passed, 1 failed. The synthetic linked fixture omitted the actual LF policy |
| Corrected inherited configuration | VERIFIED | `GIT_CONFIG_COUNT=1 GIT_CONFIG_KEY_0=core.autocrlf GIT_CONFIG_VALUE_0=true npm run check`: exit 0; 50 passed, 0 failed, 0 skipped; 71 files valid. Independently rerun with the same result |
| Complete linked-worktree run | VERIFIED | At the code-correction commit, locked dependency install, `npm run check`, and `node tools/validate-library.mjs --history`: exit 0; 50 passed, 71 files valid, five commits inspected |
| Fresh dependency advisory check | VERIFIED | `npm audit --json`: exit 0; zero reported vulnerabilities in nine development dependencies |
| Targeted native Windows probe | VERIFIED | Node 24.13.0, Git 2.45.1.windows.1: original file-symlink fixture returned EPERM. Directory junction creation succeeded; both lstat and Dirent identified a symbolic link; target sentinel was preserved. Probe exited 0 and removed its own temporary fixture |
| Complete native Windows suite | VERIFIED | Subsequent exact-candidate run below: 50 passed, 0 failed, 0 skipped; 71 files and four remote history commits valid; all check commands exited 0 |

The portable security fixture uses a real directory junction on Windows and directory symlink on Linux. It verifies rejection at both ordinary and root `.git` paths without reading or modifying outside content. No tests were skipped and no OS privilege was enabled. The LF policy preserves checked-out bytes; hashes are never normalized to conceal differences.

## Complete native Windows run

Executed **2026-10-30T08:58:28.070Z–08:58:44.309Z** on Windows with Node 24.13.0 and npm 11.6.2. Exact remote commit: `10d31811545cf743b5f122a5fd567df5288eb335`; tree: `f7e5e39e37a70c1660ff6dd53bd5b34134dd9f04`. A disposable single-branch checkout used inherited `GIT_CONFIG_COUNT=1`, `GIT_CONFIG_KEY_0=core.autocrlf` and `GIT_CONFIG_VALUE_0=true`; its identity was checked before tests. No global Git settings changed.

| Command | Exit | Result |
| --- | --- | --- |
| `npm ci --offline --ignore-scripts --no-fund --no-audit` | 0 | Nine locked packages installed from the existing cache; no online dependency fallback |
| `npm run check` | 0 | 50 passed, 0 failed, 0 skipped; all 71 reviewed files valid |
| `node tools/validate-library.mjs --history` | 0 | Four remote authored commits inspected; zero issues |
| `git fsck --full` | 0 | No integrity errors |
| `git status --porcelain` | 0 | Empty output; reviewed bytes and manifest unchanged |

Real junction rejection, copied/malformed/nested Git-pointer rejection, actual linked-worktree fixtures and literal LF checkout bytes were exercised in that suite. The temporary checkout was removed after execution; process exit 0. No runner service, elevation, new global package, personal setting, billing or model call was involved. This is native local validation, not hosted CI, and proves only the named Windows/Node/npm environment and source tree. Later documentation-only receipt changes are separately validated and identified in PR #1.

## Hosted CI recheck

The job's explicit condition `github.event.repository.private == false` explains the skipped runs while the repository is private. PR run [41019726209](https://github.com/pauloposteral/pip-public-library/actions/runs/41019726209) and push run [41029203703](https://github.com/pauloposteral/pip-public-library/actions/runs/41029203703) at `10d31811545cf743b5f122a5fd567df5288eb335` were skipped with zero steps and no runner allocated. A read-only inspection of the existing account billing page still displayed Actions budget utilization of 100% and additional usage stopped for October 1–31, 2026; that page was not reloaded, so it does not establish a fresh server balance.

The current authenticated usage-summary API request exited 1 with HTTP 404 and a GitHub CLI message that the operation requires the `user` scope. No scope was added and no credential was read or copied. Remaining included minutes therefore remain unverified. Do not describe skipped jobs as executed quota failures or claim a measured remaining minute balance.

No existing authorized zero-incremental-cost private runner was established. Workflow, budget and visibility were unchanged. A future allowance reset alone will not remove the private-repository job condition; any adjustment requires verified no-cost capacity and a reviewed workflow change. Publication remains gated independently of potential free public-repository CI.
