# Codex public MCP guide

Official source checked: [Codex MCP documentation](https://developers.openai.com/codex/mcp), 2026-10-30 UTC.

Inspect `codex --version` and `codex mcp --help`. To register the public information server:

```bash
codex mcp add pip_publico --url https://mypip.site/mcp
codex mcp list
```

Alternatively merge [codex.toml](../../examples/mcp/codex.toml) into your supported Codex configuration, preserving existing entries. User configuration normally lives in `~/.codex/config.toml`; project `.codex/config.toml` is subject to project trust. The example limits enabled tools to the three approved names. It contains no credentials.

In the client, inspect the discovered tools and ask it to call `get_faq` through `pip_publico`. Record actual invocation separately from registration. Do not approve unrelated capabilities. Remove the entry with `codex mcp remove pip_publico` if no longer wanted.

Codex CLI 0.166.0 was installed in an isolated validation directory. Version, add and list commands exited 0; the entry was enabled. Its app-server discovered exactly the three approved tools. Session startup then timed out before a tool invocation could be submitted; see the [compatibility receipt](../compatibility.md). This is not an end-to-end compatibility certification. A model interaction may use the user's existing provider plan; this release does not authorize or initiate paid inference.
