---
name: pip-blueprint
description: "Draft a reviewable product brief and implementation plan from an idea. Use when a user asks to scope a feature, turn an idea into acceptance criteria, or prepare a development blueprint."
---

# PIP Blueprint

Read the user's request, existing decisions and project constraints. Do not restart recoverable work. Ask only for details that materially change the plan; label reasonable assumptions.

Produce a DRAFT with: problem, affected user, intended outcome, scope, exclusions, constraints, observable acceptance criteria, dependencies, risks and decision owner. Then propose the smallest implementation increments with files/interfaces, expected behavior, verification commands and rollback.

For each acceptance criterion, create a QA row with ID, preconditions, action, expected result, actual result, status and evidence reference. Start at NOT_TESTED. Include invalid input, denied permission and recovery when applicable. Never invent completed tests, adoption, costs or implementation.

Example request: “Plan a task list without login.” A useful result identifies local storage and shared-device privacy, rejects empty titles, covers keyboard use, and separates proposed checks from executed checks.

## Boundaries

This skill drafts documents. It grants no authority to change code, install dependencies, publish, access private data or spend money. Follow the user's existing authorization for any separately requested implementation. It does not call the PIP Engine.

## Attribution

Original PIP by POSTERAL instructions. Inspired by general evidence-based engineering practice; no upstream skill text copied. The distribution's license decision applies. PIP brand identity is not licensed by this skill.
