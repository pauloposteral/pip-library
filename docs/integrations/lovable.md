# Lovable public MCP connector

Official source checked: [Lovable custom MCP chat connectors](https://docs.lovable.dev/integrations/custom-mcp), 2026-10-30 UTC.

In Connectors, choose Add custom, then MCP server. Use the name `PIP Public Information`, direct connection, URL `https://mypip.site/mcp`, and no authentication. Review existing connectors before adding a duplicate.

The connection provides context to Lovable chats; it does not become a runtime integration in the published application. The connector and any installed PIP skill are separate. Confirm discovery of the three public tools and explicitly request `get_faq` only if authorized to use a chat. Do not send a build prompt or trigger generation merely to register a connection.

No Lovable build, generation or new connector installation was performed in this release preparation. End-to-end connector invocation is NOT RUN. Existing product identity and application configuration were not changed. Workspace policies may block custom connectors; report that restriction instead of requesting broader access.
