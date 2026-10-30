# Public disclosure policy

Approve each exported file by exact path, provenance and hash. Include hidden workflow and metadata files. Reject private repository references, internal endpoints, identifiers, customer details, secrets, signed URLs, unknown binary formats and symlinks. Review the full new Git history as well as the working tree.

The current distribution contains no images, character assets or attachments. Any later media addition requires rights review, content review and metadata inspection before the allowlist changes.

Automated checks are bounded heuristics and parsers. False positives require review; false negatives remain possible. Do not suppress a finding globally to make a release pass. Review-generated evidence must identify its scope, commit and reviewer. Public visibility is permitted only after the license, security, CI and unauthenticated verification gates are satisfied.
