# Contributing

## Standards baseline

This repo references OnCulture standards **0.1 draft** at **10a1bf86aab065abd82a6cd1c1f2bd7f44a3e517**. The machine-readable pin is [.engineering-standards.json](.engineering-standards.json). Read [governance](https://github.com/onculture-build/onculture-engineering-standards/blob/10a1bf86aab065abd82a6cd1c1f2bd7f44a3e517/standards/governance.md), [engineering quality](https://github.com/onculture-build/onculture-engineering-standards/blob/10a1bf86aab065abd82a6cd1c1f2bd7f44a3e517/standards/engineering-quality.md), [testing/API contracts](https://github.com/onculture-build/onculture-engineering-standards/blob/10a1bf86aab065abd82a6cd1c1f2bd7f44a3e517/standards/testing-api-contracts.md), and the workflows in [AGENTS.md](AGENTS.md).

Repository owner: Morenike (@mo-renike). The standards are referenced as engineering guidance; this does not certify existing application compliance or approve legacy gaps.

## Changes and evidence

Describe the trigger and resulting behavior, applicable control IDs, API/tenant/security impacts, tests and residual risks. Test failure/denial/retry paths when relevant. Reuse local UI and backend infrastructure. UI reviews include loading, empty, validation, error and access-denied states, keyboard/focus/reflow checks, and honest accessibility limitations. Do not claim mocked tests establish production isolation.

Material decisions and departures use the pinned [ADR template](https://github.com/onculture-build/onculture-engineering-standards/blob/10a1bf86aab065abd82a6cd1c1f2bd7f44a3e517/templates/adr.md); record scope, owner, risk, compensating controls, named approver, expiry and remediation. Keep completed decisions/findings with this application or the team's approved system. Do not fabricate owner assignments or approval.

## Verification

- Use Yarn with the tracked yarn.lock.
- Types: `yarn tsc --noEmit`.
- Build: `yarn vite build`; the existing build script masks failures with `exit 0`, so do not use it as proof of success.
- No lint/test scripts are declared; report that gap and exercise the changed signup/payment states.

Inspect package scripts for side effects and run checks relevant to the change. Do not run production operations, live payments, database resets or seeds as routine tests. Report unavailable or failing checks instead of marking them passed.

## Review and rollout

Use the repository's existing CI and review process. No additional standards workflow or branch-protection changes are required by this integration.

Update the pin and all pinned links together in a reviewed PR when upgrading standards. Review changed obligations, owners, exceptions and rollout; do not auto-follow a moving branch. Keep owner assignments current and record adoption approval before changing adoption status or claiming GOV-001/GOV-005 are satisfied.
