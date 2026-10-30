# Official sources checked

Documentation was retrieved on 2026-10-30 UTC. Only short original summaries and original configuration examples are included; provider documentation is not redistributed.

- [Codex MCP](https://developers.openai.com/codex/mcp): configuration table, HTTP URL, CLI and enabled-tool controls.
- [Codex app-server](https://developers.openai.com/codex/app-server): separate thread creation, model turns and direct MCP calls; follow-up documentation and installed RPC schema checked.
- [Node 24 filesystem API](https://nodejs.org/docs/latest-v24.x/api/fs.html): Windows directory junction semantics; consulted through Context7 for the portable link fixture.
- [Claude Code MCP](https://code.claude.com/docs/en/mcp): HTTP setup and local/project/user scopes.
- [VS Code MCP](https://code.visualstudio.com/docs/copilot/customization/mcp-servers): portable and legacy configuration distinctions.
- [Lovable custom MCP](https://docs.lovable.dev/integrations/custom-mcp): personal chat connector, direct URL and no-auth option.
- [Agent Skills format](https://agentskills.io/specification): frontmatter name and description requirements.
- [MCP specification](https://modelcontextprotocol.io/specification): current protocol differs from legacy initialization; this candidate explicitly tests the server's negotiated legacy revision only.
- [GitHub Actions security](https://docs.github.com/en/actions/reference/security/secure-use): immutable action references and minimal permissions.
- [MIT license](https://opensource.org/license/mit): standard grant text, applied after the recorded owner approval in [the license decision](license-decision.md).
- [Superpowers license](https://github.com/obra/superpowers/blob/main/LICENSE): Jesse Vincent attribution, link-only use.

Documentation checking does not prove a successful client installation. See [compatibility](compatibility.md).
