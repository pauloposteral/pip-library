# Worked example: a small task list

**SYNTHETIC product scenario. Planning only; no task-list application has been implemented or tested here.**

User problem: a person wants to track three errands without creating an account.

Proposed outcome: add, complete and remove locally stored tasks. No server, collaboration, analytics or payments.

| Criterion | Proposed verification | Status |
| --- | --- | --- |
| Empty or whitespace-only titles are rejected | Submit empty and whitespace values; expect visible error and unchanged list | NOT_TESTED |
| A valid title appears once | Add “Buy coffee”; expect one item | NOT_TESTED |
| Keyboard users can add and complete a task | Tab through controls, use Enter and Space | NOT_TESTED |
| Storage failure preserves current visible tasks | Simulate a rejected storage write and inspect recovery message | NOT_TESTED |

Implementation increments: define the model and input validation; add keyboard-accessible UI; add local persistence and error recovery; run the matrix and record real evidence. Clarify retention and shared-device privacy before implementation.

Use [pip-blueprint](../../skills/pip-blueprint/SKILL.md) to create your own brief. The example's useful output is a reviewable plan, not a claim of delivered software.
