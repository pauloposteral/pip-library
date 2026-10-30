# Getting started

Use a standalone clone, extracted source directory, or registered linked Git worktree for validation. A root `.git` pointer is excluded only after reciprocal worktree metadata and Git's reported paths match. Malformed, copied, nested or symlinked pointers remain rejected. Do not add Git metadata to the export inventory.

## Use a template

Open [product-brief.md](../templates/product-brief.md), copy it into your project and replace the prompts. No software installation or paid account is needed. Follow the [worked example](../examples/blueprint/task-list.md) and record tests only after executing them.

## Use a skill

Read the skill before installing it. Each skill is self-contained and contains usable output structures. In a compatible client, copy only the skill directory you want into that client's documented skills directory. For example, Codex project skills use `.agents/skills/`; Claude Code project skills use `.claude/skills/`. Confirm discovery in your installed client; these paths are not a claim of a completed installation. VS Code/Copilot support depends on version and organization policy; follow its official [Agent Skills guide](https://code.visualstudio.com/docs/copilot/customization/agent-skills).

Available skills: [pip-blueprint](../skills/pip-blueprint/SKILL.md), [pip-release-evidence](../skills/pip-release-evidence/SKILL.md), [pip-mcp-setup](../skills/pip-mcp-setup/SKILL.md). Merely reading instructions does not configure MCP or authorize a deployment.

## Validate the distribution

Install Node 24, then in the repository run:

```bash
npm ci --ignore-scripts
npm run check
```

No paid model call or analytics event is made. The optional `npm run mcp:smoke` contacts the public endpoint and invokes FAQ only. The separate `npm run release:check` must stay blocked until approvals are complete.

## Optional MCP

Pick one guide: [Codex](integrations/codex.md), [Claude Code](integrations/claude-code.md), [VS Code/Copilot](integrations/vscode-copilot.md), [Lovable](integrations/lovable.md). Do not connect every provider to try a template. Record client version, registration, discovery and invocation separately using [compatibility](compatibility.md).

The full validation path is verified on Linux, including linked worktrees and inherited `core.autocrlf=true`. The committed `.gitattributes` preserves LF checkout bytes. A targeted Windows probe reproduced the old symlink-permission error and verified the directory-junction fixture used by the corrected tests. The complete Windows suite remains unverified; see [validation evidence](validation-evidence.md). Do not regenerate hashes merely to hide checkout conversion differences.
