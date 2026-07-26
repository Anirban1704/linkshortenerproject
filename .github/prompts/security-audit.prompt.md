---
name: security-audit
description: To perform a security audit.
agent: ask
---

To perform a security audit of this codebase to detect potential security vulnerabilities of this project.

1) Audit the codebase.

2) Output your findings as a markdown formatted table with the following columns: "Id", "Severity", "Issue", "File path", "Line number", "Recommendation" (Id should start from 1 and auto-increment, File path should be an actual link to the file.)

3) Ask the user which issue they want to fix by eaither "all" or a comma seperated list of Ids.

4) Only After their response, run a seperated sub-agent (#runSubAgent) to fix the issue that the user has specified. Each sub-agent should report back with a simple `subAgentSuccess: true | false`.