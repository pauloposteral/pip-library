# Security policy

## Supported scope

The v0.1.0 candidate contains documentation, original skills, templates and local validation utilities. It is not a private execution service. No production credentials, analytics or billing are needed.

## Reporting

Use GitHub private vulnerability reporting if the repository Security tab offers it. Availability is not assumed. If unavailable, open an issue titled “Private security contact requested” with no exploit details, secrets or personal data. Wait for the maintainer to establish a secure channel. Do not send sensitive evidence to an unverified address. Posteral is the initial maintainer; no response SLA is promised.

## Review boundaries

Automation detects known patterns; it cannot prove the absence of every secret or establish copyright ownership. Review every allowlisted file and the complete new Git history manually. This release permits text files only; images, archives, symlinks and executable payloads outside the reviewed tools are rejected. Never import private repository history.

PR validation uses read-only repository permissions, no repository secrets, no deployment and no privileged PR trigger. Do not enable automatic write access to fix incoming contributions. Dependency installation uses a lockfile and disables install scripts. Node and GitHub-hosted runner versions still require periodic review.
