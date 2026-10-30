# Contributing

Start with a focused issue describing the user problem, current behavior, desired behavior and a small reproduction. Do not include secrets, personal data, private endpoints or proprietary code. Security reports follow [SECURITY](SECURITY.md).

For a contribution:

1. Work on a branch and keep the change narrowly scoped.
2. Use original work or identify the author, source and redistribution license.
3. Preserve honest status labels. Mark sample data `synthetic: true`.
4. With Node 24, run `npm ci --ignore-scripts`, `npm test`, and `npm run validate`.
5. For changed public files, update the reviewed allowlist and manifest using `node tools/update-manifest.mjs` only after a human checks provenance and scope. A regenerated hash is not approval.
6. Include the commands, exit codes, relevant commit, limitations and licensing statement in the PR.

Maintainers review all files, dependency changes and historical commits before public release. No contributor-provided workflow runs with write credentials or production secrets. Maintainers must not run untrusted PR code on their workstation without isolation.

Maintainer: Posteral. There is no guaranteed support response time. New original contributions must use MIT unless agreed otherwise in writing. Respect the exclusions in legal/LICENSE-SCOPE.md. Public contribution intake starts after the verified public launch.
