# PIP Public Library

**From ideas to evidence.**

Open tools, agent skills, and verifiable workflows for turning ideas into trustworthy software.

**v0.1.0 candidate — public repository, MIT license. No tagged release yet: client compatibility checks are still open.**

PIP by POSTERAL helps creators distinguish a proposal, an implementation, a test result, and a release decision. A convincing demo is useful; it is not sufficient evidence that a product is ready to ship.

## Try one useful workflow

No paid account is needed to read these files. Our target is a useful first result in under two minutes; that time has not been measured.

1. Open the [product brief](templates/product-brief.md).
2. Write one observable acceptance criterion, such as: “An empty task title shows an error and is not saved.”
3. Add the criterion to the [QA matrix](templates/qa-matrix.md), initially marked `NOT_TESTED`.
4. Run the actual check in your own project. Record the command, exit code, commit and evidence. If you cannot run it, retain `NOT_TESTED` or `BLOCKED`.

Start with the [worked planning example](examples/blueprint/task-list.md) or the [reproducible evidence example](examples/qa/README.md). Read the [getting started guide](docs/getting-started.md) for skills and optional MCP setup.

## What is available in this candidate

| Resource | Scope |
| --- | --- |
| Three original skills | Blueprint drafting, release-evidence inspection, public MCP setup |
| Four Markdown templates and one JSON manifest | Planning, QA and release recording |
| Offline validation | File allowlist, hashes, syntax, local links and bounded security checks |
| Public read-only MCP | `get_faq`, `list_proposed_plans`, `get_join_status` only |
| Installation guides | [Codex](docs/integrations/codex.md), [Claude Code](docs/integrations/claude-code.md), [VS Code/Copilot](docs/integrations/vscode-copilot.md), [Lovable](docs/integrations/lovable.md) |

Actual client execution status is recorded in the [compatibility matrix](docs/compatibility.md). Configuration validation is not proof of a client connection.

## Why PIP was born

PIP was born to bridge the gap between an idea and a verifiable result. AI has made imagining and prototyping software easier. PIP exists to make visible what was planned, built, tested, left uncertain, and judged ready to ship. Read the [origin story](docs/why-pip-exists.md) and [mission](docs/mission.md).

## What comes later

PIP Assurance, PIP Cloud and the PIP Build Engine are roadmap concepts. This library does not provide private project access, autonomous execution, hosted workspaces, paid model calls or live subscription billing. See the [roadmap](docs/vision-and-roadmap.md) and [trust boundaries](docs/architecture-and-trust-boundaries.md).

## Contribute and verify

Read [CONTRIBUTING](CONTRIBUTING.md), the [code of conduct](CODE_OF_CONDUCT.md), and [SECURITY](SECURITY.md). The [release evidence standard](docs/release-evidence-standard.md) defines what a result must contain. Run `npm ci --ignore-scripts` then `npm run check` with Node 24. The publication gate is separate: `npm run release:check` deliberately fails while release approvals are missing.

## Ownership and attribution

Original PIP code, skills, templates and documentation use the [approved MIT license](LICENSE), with [brand and Engine exclusions](legal/LICENSE-SCOPE.md). PIP character and logo assets are not included. [NOTICE](NOTICE.md) records upstream references and dependency licenses.

PIP is independent of Superpowers, OpenAI, Anthropic, GitHub, Microsoft and Lovable. Their names identify compatibility or references, not endorsement. [Superpowers by Jesse Vincent](https://github.com/obra/superpowers) is an independent methodology; this release does not redistribute its skills.

[PIP website](https://mypip.site) · [Public MCP](https://mypip.site/mcp)
