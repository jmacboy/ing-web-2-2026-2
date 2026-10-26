# Shared Axios client

## Objective
Extract the Axios base URL and bearer-token request interceptor into a shared module, then use it from `PersonService` so other API services can import the same configured client.

## Problem and rationale
`PersonService` currently owns its Axios instance and interceptor, so other services cannot reuse the configuration. A shared client under `src/config/` will centralize the API origin and authorization behavior.

## Scope and constraints
- Keep the configured API origin at `http://localhost:3000` and use service-relative paths.
- Add the bearer token only when `getToken()` returns a token.
- Do not change backend endpoints, authentication semantics, or unrelated working-tree changes.
- Authorized edit surfaces: `src/config/axiosClient.js`, `src/services/PersonService.js`, and this task document.
- Delivery strategy: `ask-on-risk` (default); forecast is below 400 authored changed lines.

## Tasks
- [x] T1 — Create a reusable Axios client with base URL and request authorization interceptor; migrate `PersonService` to import it.
  - Route: delegated direct; two non-trivial source files and read-to-write preparation.
  - Acceptance: all PersonService operations use the shared client and existing `/personas` endpoints; other services can import the exported client.
  - Checks: `yarn lint`; `yarn build`. No test script or meaningful deterministic test runner is currently declared, so no RED/GREEN test-first cycle applies.

## Progress and evidence
- Branch: `feature/shared-axios-client`.
- `src/config/axiosClient.js` exports an Axios instance configured with base URL `http://localhost:3000` and a request interceptor that adds Bearer authorization when a token exists.
- `src/services/PersonService.js` now uses that shared instance for all existing `/personas` endpoints.
- `yarn build`: passed (parent spot check and writer run).
- `yarn lint`: failed on the pre-existing unused `setIsLoggedIn` in `src/hooks/useAuth.jsx:7`; that unrelated file was not changed.
- `git diff --check`: passed.
- Review assessment: unassessable because the worktree contains other untracked files; native STATUS selection is needed before any review.
- Current status: implementation and checks complete; work-unit commit pending.

## Next step
Commit the authorized files as one work unit, then record the commit identity and mirror this document to Engram.
