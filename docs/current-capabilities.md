# Current capabilities

The candidate can be read locally, used as planning guidance and checked with Node 24. It contains three skill instructions, four Markdown templates, a JSON manifest, two worked examples and integration configuration samples.

The public endpoint is `https://mypip.site/mcp`. Its only approved tools are `get_faq`, `list_proposed_plans` and `get_join_status`. These provide public information. They do not inspect a user's private membership or authenticate a customer; join status refers to the public channel availability. Proposed plans are not checkout offers.

Tool discovery and invocation are separately recorded in [compatibility](compatibility.md). A successful raw HTTP call does not prove Codex, Claude, Copilot or Lovable works end to end.

This distribution does not ship the PIP Studio application or its deterministic browser-local generator. It does not provide private project reads, code execution, tenant storage, paid model calls or billing.
