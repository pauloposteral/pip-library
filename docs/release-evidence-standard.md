# Release evidence standard v1

A release claim must be traceable to an immutable source revision and an actual execution receipt. A screenshot or generated summary alone is insufficient.

| Check status | Meaning |
| --- | --- |
| PASS | The named check executed and met its stated expected result |
| FAIL | It executed and failed its expected result |
| BLOCKED | A named dependency prevented execution or completion |
| NOT_TESTED | No execution was attempted |
| UNVERIFIED | An assertion or artifact exists without adequate execution evidence |

Report overall task work as VERIFIED, DONE, PARTIAL, BLOCKED or NOT RUN. Do not confuse those work labels with test outcomes.

Each manifest records schema version, synthetic flag, source commit, environment, timestamp, commands, exit codes, statuses, artifact hashes, reviewer scope, limitations and release decision. Unknown values are `null`, not invented. A successful command may test only a fixture. Preserve that scope.

For real `PASS` evidence, include a 40-character source commit, command, zero exit code, execution timestamp and an artifact with SHA256. For synthetic fixtures, use `synthetic: true`, label every presentation synthetic, and never use them to approve a real release. A blocked or untested check has no fabricated exit code.

Verification procedure:

1. Establish repository authorization and exact commit.
2. Reproduce the documented check in an isolated environment.
3. Record command, versions, UTC time, raw output and exit code.
4. Hash the output, review it for sensitive data and retain the scope.
5. Compare with the acceptance criterion and have a separate reviewer inspect material release claims.
6. Decide whether to release, identifying every unresolved gate.

The validator enforces a bounded subset of this contract. A valid JSON document is not proof that its author ran the command. See [template](../templates/evidence-manifest.json) and [example](../examples/qa/README.md).
