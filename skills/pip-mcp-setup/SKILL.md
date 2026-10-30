---
name: pip-mcp-setup
description: "Configure and verify the public PIP information MCP in a supported client. Use when a user asks to connect PIP to Codex, Claude Code, VS Code/Copilot or Lovable, or troubleshoot its public MCP setup."
---

# PIP Public MCP Setup

Identify the client, version, configuration scope and existing server entries. Read its current official documentation. Preserve unrelated configuration and do not overwrite a whole file to add one server.

The approved URL is `https://mypip.site/mcp`. Only `get_faq`, `list_proposed_plans` and `get_join_status` are public. No token is required by the verified public endpoint. Do not substitute a technical endpoint or grant private project permissions. Never use a personal assistant subscription as permission for paid provider calls.

For Codex, add a `[mcp_servers.pip_publico]` TOML table with the URL or use `codex mcp add pip_publico --url https://mypip.site/mcp`. For Claude Code, use `claude mcp add --transport http --scope local pip_publico https://mypip.site/mcp`. Explain scope before writing configuration. For VS Code/Copilot, check the current portable `mcpServers` format versus legacy `servers` format. For Lovable, use its personal custom MCP chat connector form with the public URL and no authentication; skill installation does not create a connector.

Verify four distinct stages: valid configuration, registration, tool discovery, and an actual `get_faq` invocation. Record version, UTC time, discovered names, success/error and limitations. The raw server supports the legacy `2025-03-26` handshake; do not infer compatibility with every newer protocol from that fact. If discovery differs from the approved three tools, stop before invocation and report the difference.

If the client denies permission, report BLOCKED and retain its policy. Do not bypass a denial, broaden scopes, install an unrelated service or call a model just to claim compatibility. No installed client means NOT RUN for that client, even if a raw HTTP probe works.

## Limitations and attribution

This skill provides original PIP by POSTERAL setup guidance. It does not install itself, grant access, execute code remotely or activate billing. Client commands may change; verify current official docs. Provider names indicate interoperability, not affiliation. Follow the distribution's license decision.
