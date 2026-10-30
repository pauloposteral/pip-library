---
name: pip-release-evidence
description: "Inspect test receipts and prepare an honest, commit-linked release report. Use when a user asks whether work is ready to ship, requests QA evidence, or needs to distinguish tested results from claims."
---

# PIP Release Evidence

Establish the authorized repository, exact source commit and acceptance criteria. Read the original logs and artifacts; do not rely only on an agent summary. Keep private data out of public reports.

For every check, record: ID, command, environment/version, UTC timestamp, exit code, expected outcome, actual outcome and artifact SHA256. Use PASS only for observed execution that meets the criterion, FAIL for observed failure, BLOCKED for a named dependency, NOT_TESTED for no run, and UNVERIFIED for a claim without adequate evidence. A passing fixture is evidence about that fixture only.

Separate synthetic examples from real receipts. A synthetic example must have `synthetic: true` and must not approve a release. Missing commit, time, command or log is a limitation, not a value to invent.

Produce a report with source revision, check table, evidence references, unresolved risks, independent-review scope, release decision and next action. Recommend release only when all required acceptance gates are supported. A JSON schema pass alone cannot prove the truth of a receipt.

If checks are already authorized, reproduce the smallest relevant set in isolation and record exact results. Otherwise report the missing evidence. Never execute untrusted submitted scripts with credentials or change repository visibility as part of report writing.

## Boundaries and attribution

This is original PIP by POSTERAL guidance, not a hosted attestation, cryptographic signature, certification or guarantee. It does not access private PIP services. General review practices are independent of any provider. Follow the distribution's license decision and preserve upstream attribution where used.
