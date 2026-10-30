# Claude Code public MCP guide

Official source checked: [Claude Code MCP](https://code.claude.com/docs/en/mcp), 2026-10-30 UTC.

Use the [command example](../../examples/mcp/claude.md) in the intended project. `--scope local` limits the entry to your local project context. Choose `--scope project` only when deliberately sharing a reviewed `.mcp.json`; `--scope user` applies across projects. Preserve unrelated entries. HTTP JSON configuration requires `"type": "http"`.

After registration, inspect `/mcp`, confirm the three public tools, and explicitly invoke `get_faq`. Record client version, discovery and the call result. If organization policy or a tool permission denies access, record BLOCKED; do not bypass the denial. `claude mcp remove pip_publico` removes the configuration in the applicable scope.

No authentication is required for the verified public endpoint. Do not add tokens, connect private project tools or enable a separate technical plugin to make this example work. Installing a skill does not register MCP.

Claude Code 2.1.314 was installed for an isolated check. Version, add and get commands exited 0; `mcp get` reported Connected. Client-mediated tool discovery, invocation and the live denied-permission scenario remain NOT RUN. A raw protocol probe is tracked separately. No Claude API or subscription inference was initiated.
