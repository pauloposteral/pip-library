# VS Code and Copilot public MCP guide

Official source checked: [VS Code MCP servers](https://code.visualstudio.com/docs/copilot/customization/mcp-servers), 2026-10-30 UTC.

Use the current “MCP: Add Server” or customization flow in your installed version. Select HTTP and `https://mypip.site/mcp`, named `pip_publico`. Review the destination and trust prompt.

Current documentation distinguishes portable `mcpServers` configuration from the legacy VS Code `servers` format:

| Destination | Example | Limitation |
| --- | --- | --- |
| Project-root `.mcp.json` | [portable.json](../../examples/mcp/portable.json) | Workspace-root support can depend on an experimental setting/harness |
| Copilot global MCP file | [portable.json](../../examples/mcp/portable.json) | Resolve actual location through client UI; do not overwrite other entries |
| `.vscode/mcp.json` | [vscode.json](../../examples/mcp/vscode.json) | Legacy compatibility format, marked deprecated in current guided flow |

Do not copy the top-level key between formats unchanged. After adding the server, inspect discovery and invoke `get_faq`; capture installed versions and actual results. Remove only the `pip_publico` entry to undo setup. Respect workspace and organization restrictions.

GitHub's cloud coding agent and code-review integrations use separate repository/provider settings; this local example does not configure them. No VS Code/Copilot client was available for end-to-end execution here, so that status remains NOT RUN.
