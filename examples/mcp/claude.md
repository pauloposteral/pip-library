# Claude Code command example

Run from the intended project after reviewing its trust and configuration scope:

```bash
claude --version
claude mcp add --transport http --scope local pip_publico https://mypip.site/mcp
claude mcp get pip_publico
```

Then inspect `/mcp` in a session and explicitly request `get_faq`. A configured server is not a successful invocation. Follow [the complete guide](../../docs/integrations/claude-code.md).
