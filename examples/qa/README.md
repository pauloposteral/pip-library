# Reproduce an evidence workflow

There are two distinct artifacts here:

- [sample-report.json](sample-report.json) is **SYNTHETIC** and says `NOT_TESTED`. It is a learning fixture, not a passed test.
- The commands below run the library's actual offline checks. Record their real output in your own project, outside this distribution's export directory.

With Node 24, run:

```bash
npm ci --ignore-scripts
npm run check > ../pip-check.log 2>&1
result=$?
printf 'exit_code=%s
' "$result"
git rev-parse HEAD
node -e "const f=require('node:fs'),c=require('node:crypto'); console.log(c.createHash('sha256').update(f.readFileSync('../pip-check.log')).digest('hex'))"
```

If `result` is zero, the recorded offline suite passed on that checkout. This does not verify a hosted service or compatibility with an installed AI client. Copy [the manifest template](../../templates/evidence-manifest.json), fill actual revision, UTC timestamp, environment, command, exit code and log hash, and leave any unexecuted checks untested. Ask an independent reviewer to inspect the receipt before a release decision.

The library's own candidate receipt is [validation evidence](../../docs/validation-evidence.md). It must never be replaced by the synthetic report.
