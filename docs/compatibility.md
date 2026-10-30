# Compatibility matrix

Evidence is scoped to the tested stage. “Documentation checked” means official guidance was read, not that a client was installed. Date: 2026-10-30 UTC.

| Client | Version observed | Config syntax | Registered | Discovered tools | FAQ invocation |
| --- | --- | --- | --- | --- | --- |
| Codex CLI | 0.166.0 | Documentation checked; TOML parsed | VERIFIED, add/list exit 0 | VERIFIED through app-server | BLOCKED: session startup timed out; invocation NOT RUN |
| Codex bundled CLI | 0.166.0-alpha.1 | Documentation and installed RPC schema checked | VERIFIED, add/list exit 0 | VERIFIED, exact three tools in 7.185 seconds | BLOCKED: local filesystem sandbox failure during thread creation; invocation NOT RUN |
| Codex CLI on Windows | 0.164.0 | Isolated task TOML; existing binary | VERIFIED through app-server initialization | VERIFIED, exact three read-only tools | VERIFIED, real client FAQ result; app-server exit 0 |
| Claude Code | 2.1.314 | Documentation checked | VERIFIED, add/get exit 0; client reported Connected | NOT RUN | NOT RUN |
| Claude Code on Windows | 2.1.310 | Official guidance and installed help checked | VERIFIED, add/get exit 0; Connected; project Pending approval/Rejected observed | NOT RUN | NOT RUN |
| VS Code/Copilot | Unavailable | JSON parsed; current and legacy formats documented | NOT RUN | NOT RUN | NOT RUN |
| Lovable chat connector | Not inspected in client | Documentation checked | NOT RUN | NOT RUN | NOT RUN |
| Raw Node HTTP probe | Node 24.22.1 | Dedicated legacy MCP probe | Not applicable | See [live receipt](mcp-verification.json) | See live receipt |

Public tool set: `get_faq`, `list_proposed_plans`, `get_join_status`. Full independent client-path verification remains a release limitation. An unavailable client is not treated as a passing test. Claude project configuration approval/rejection was observed in the follow-up; tool-invocation denial remains NOT RUN.

For the earlier Linux checks, Codex and Claude were installed solely into a disposable validation directory from official npm packages. Configuration was isolated from personal settings. Codex reported the server enabled; its auth status was Unsupported, consistent with this no-auth endpoint, not an invocation result. Claude's `mcp get` reported Connected. Neither check called a model or proves a client-mediated FAQ invocation. The first Claude launch failed because install scripts were disabled; its inspected local binary-placement script was then run, and version/add/get checks passed. No public dependency or application configuration was changed by these checks.

At 2026-10-30T02:56:42Z, Codex 0.166.0 app-server initialized and `mcpServerStatus/list` returned exactly the three approved tools, each with `readOnlyHint: true`, with no tool-list error. The subsequent ephemeral `thread/start` exceeded the probe's 40-second timeout. A second probe using unbuffered output handling produced the same timeout. The process was terminated; `mcpServer/tool/call` was never submitted. No model turn was submitted. This is a client-session validation blocker, not proof that the public endpoint failed. Raw HTTP invocation remains separately verified.

For retesting record: exact client/version, scope, install command and exit, registration result, discovery response, tool invocation result, UTC timestamp, error, source link and tester. Never log credentials or private project content.

## Independent follow-up diagnostic

At 2026-10-30T07:02:15Z, an independent reviewer used the existing bundled Codex `0.166.0-alpha.1` with isolated configuration and no inherited provider credentials. Registration/listing exited 0; discovery returned exactly the three approved read-only tools with no tool-list error. Read-only `thread/start` returned RPC -32603 in 0.078 seconds: the filesystem sandbox helper could not create a NETLINK_ROUTE socket while loading instructions. The app-server exited 0 after input closed, but the RPC stage failed. No tool call or model turn was submitted. This earlier failure on a different build does not establish the cause of the old stable-version timeout.

The official [app-server documentation](https://developers.openai.com/codex/app-server) and installed schema require a thread identifier for direct MCP invocation. No documented threadless route was found. A single sandbox-mode experiment was rejected by managed requirements before creating a thread; no protection was weakened, and the delivered diagnostic keeps read-only isolation. This rejection is not an MCP permission-denial test. Further retries that would bypass restrictions were stopped.

Claude was unavailable in the checked cloud executable locations; its earlier Connected result remains scoped to the earlier environment. Copilot and Lovable remain NOT RUN. Full client-path compatibility remains PARTIAL.

## Native Windows client follow-up

An independent reviewer used the existing Codex 0.164.0 on Windows, with a task-owned temporary configuration and empty working directory. On 2026-10-30, `codex app-server --listen stdio://` accepted initialization at 09:02:36.076Z, discovered the exact three tools at 09:02:41.728Z, started a read-only ephemeral thread at 09:02:41.986Z, and returned a real `get_faq` result at 09:02:42.789Z. The result contained one text item plus structured content, with no RPC/tool error. App-server exit: 0. The [structured receipt](mcp-verification.json) records methods, timing and response hash. This is client-mediated invocation, separate from raw HTTP success.

No model turn was submitted, no provider credential was supplied, and no client update or personal configuration change occurred. The client attempted an unauthenticated provider websocket preconnection that received HTTP 401; no authenticated model request was made. OS-global skill metadata was automatically read, so the process was not fully isolated from the host. Both temporary directories were removed after the process exited; an initial EPERM cleanup attempt was resolved without changing permissions. Read-only sandbox controls remained enabled.

This success is scoped to Windows/Codex 0.164.0. It does not diagnose or erase the earlier Linux stable timeout or bundled-alpha sandbox failure. Codex permission-denial behavior remains NOT RUN. Claude/Copilot/Lovable results remain separately scoped.

The installed Claude Code 2.1.310 was tested independently with temporary project/configuration directories. `claude mcp add --transport http --scope local pip https://mypip.site/mcp` and `claude mcp get pip` exited 0; the health result was Connected at 09:06:02.912Z. A separate project-scoped configuration returned Pending approval before approval, then Rejected with the documented disabled-server setting; both inspection commands exited 0. These are observed configuration-approval decisions, not proof of endpoint OAuth denial or rejection of a tool invocation.

Claude discovery and invocation remain NOT RUN: installed management commands and official documentation exposed no direct invocation command, while a model-driven prompt was excluded by the spending boundary. No new client installation or model call occurred. Temporary files were removed. Copilot was absent from the checked executable locations and Lovable live verification remains NOT RUN; no fallback paid build was launched.
