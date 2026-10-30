# Compatibility matrix

Evidence is scoped to the tested stage. “Documentation checked” means official guidance was read, not that a client was installed. Date: 2026-10-30 UTC.

| Client | Version observed | Config syntax | Registered | Discovered tools | FAQ invocation |
| --- | --- | --- | --- | --- | --- |
| Codex CLI | 0.166.0 | Documentation checked; TOML parsed | VERIFIED, add/list exit 0 | VERIFIED through app-server | BLOCKED: session startup timed out; invocation NOT RUN |
| Codex bundled CLI | 0.166.0-alpha.1 | Documentation and installed RPC schema checked | VERIFIED, add/list exit 0 | VERIFIED, exact three tools in 7.185 seconds | BLOCKED: local filesystem sandbox failure during thread creation; invocation NOT RUN |
| Claude Code | 2.1.314 | Documentation checked | VERIFIED, add/get exit 0; client reported Connected | NOT RUN | NOT RUN |
| VS Code/Copilot | Unavailable | JSON parsed; current and legacy formats documented | NOT RUN | NOT RUN | NOT RUN |
| Lovable chat connector | Not inspected in client | Documentation checked | NOT RUN | NOT RUN | NOT RUN |
| Raw Node HTTP probe | Node 24.22.1 | Dedicated legacy MCP probe | Not applicable | See [live receipt](mcp-verification.json) | See live receipt |

Public tool set: `get_faq`, `list_proposed_plans`, `get_join_status`. Full independent client-path verification remains a release limitation. An unavailable client is not treated as a passing test. Permission-denied behavior in an installed client remains NOT RUN.

Codex and Claude were installed solely into a disposable validation directory from official npm packages. Configuration was isolated from personal settings. Codex reported the server enabled; its auth status was Unsupported, consistent with this no-auth endpoint, not an invocation result. Claude's `mcp get` reported Connected. Neither check called a model or proves a client-mediated FAQ invocation. The first Claude launch failed because install scripts were disabled; its inspected local binary-placement script was then run, and version/add/get checks passed. No public dependency or application configuration was changed by these checks.

At 2026-10-30T02:56:42Z, Codex 0.166.0 app-server initialized and `mcpServerStatus/list` returned exactly the three approved tools, each with `readOnlyHint: true`, with no tool-list error. The subsequent ephemeral `thread/start` exceeded the probe's 40-second timeout. A second probe using unbuffered output handling produced the same timeout. The process was terminated; `mcpServer/tool/call` was never submitted. No model turn was submitted. This is a client-session validation blocker, not proof that the public endpoint failed. Raw HTTP invocation remains separately verified.

For retesting record: exact client/version, scope, install command and exit, registration result, discovery response, tool invocation result, UTC timestamp, error, source link and tester. Never log credentials or private project content.

## Independent follow-up diagnostic

At 2026-10-30T07:02:15Z, an independent reviewer used the existing bundled Codex `0.166.0-alpha.1` with isolated configuration and no inherited provider credentials. Registration/listing exited 0; discovery returned exactly the three approved read-only tools with no tool-list error. Read-only `thread/start` returned RPC -32603 in 0.078 seconds: the filesystem sandbox helper could not create a NETLINK_ROUTE socket while loading instructions. The app-server exited 0 after input closed, but the RPC stage failed. No tool call or model turn was submitted. This earlier failure on a different build does not establish the cause of the old stable-version timeout.

The official [app-server documentation](https://developers.openai.com/codex/app-server) and installed schema require a thread identifier for direct MCP invocation. No documented threadless route was found. A single sandbox-mode experiment was rejected by managed requirements before creating a thread; no protection was weakened, and the delivered diagnostic keeps read-only isolation. This rejection is not an MCP permission-denial test. Further retries that would bypass restrictions were stopped.

Claude was unavailable in the checked cloud executable locations; its earlier Connected result remains scoped to the earlier environment. Copilot and Lovable remain NOT RUN. Full client-path compatibility remains PARTIAL.
