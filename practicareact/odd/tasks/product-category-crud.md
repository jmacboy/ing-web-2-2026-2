# Product and category CRUD

## Objective
Add a user-authenticated product CRUD UI that uses categories from the existing API.

## Problem and why
The SPA has no product management interface. The Postman collection defines the backend routes and payloads needed by the form.

## Scope and constraints
- Use the existing shared Axios client and authenticated route pattern.
- Product fields: `nombre`, `precio`, `stock`, `categoriaId`; category selector populated from `/categorias`.
- Product API: GET `/productos`, GET `/productos/:id`, POST `/productos`, PUT `/productos/:id`, DELETE `/productos/:id`.
- Category API: GET `/categorias`.
- Keep existing unrelated working-tree changes untouched; no backend changes.

## Tasks
- [x] P1 — Add product/category service operations and protected product list/create/edit routes and UI.
- [ ] P2 — Complete native review, resolve intended-untracked selection, and record the work-unit commit.
- [x] P3 — Add category service, list page, form page, protected routes, and Navbar submenu entries.

## Authorized scope
`src/services/ProductoService.js`, `src/services/CategoriaService.js`, `src/pages/productos/ProductoList.jsx`, `src/pages/productos/FormProducto.jsx`, `src/pages/categorias/CategoriaList.jsx`, `src/pages/categorias/FormCategoria.jsx`, `src/routes/RouterConfig.jsx`, `src/components/Navbar.jsx`, and this task document.

## Acceptance criteria
- Authenticated users can list, create, edit, and delete products.
- Create/edit forms load categories and submit the collection's exact product fields.
- Product pages redirect unauthenticated users using the existing route guard.
- Authenticated users can list, create, edit, and delete categories; category pages use the existing route guard.
- Category API contract from Postman: GET `/categorias`, GET `/categorias/:id`, POST `/categorias` `{ nombre }`, PUT `/categorias/:id` `{ nombre }`, DELETE `/categorias/:id`.
- Navbar exposes category list/create inside the domain `Productos` submenu (with `children`), never as loose links, per project conventions.

## Applicable checks
- Test-first exception: no test runner is declared by this project; verify with `yarn lint` and `yarn build`.
- Manual API-backed flow when the local backend is available; otherwise report it as not run.

## Progress and evidence
- Contract verified from `../expressapi/postman/expressapi.postman_collection.json` (products items 85–94; categories items 97–105).
- Route: delegated direct, because implementation spans multiple non-trivial files and requires source preparation.
- Forecast: approximately 150 authored changed lines; delivery strategy `ask-on-risk`.
- Verification: `yarn lint` and `yarn build` results recorded by implementation handoff. No API-backed manual flow was run.
- `yarn build`: passed in the worker run and parent spot-check (after P3 and the service cleanup, built in 200ms).
- `yarn lint`: failed only on the unrelated existing `src/hooks/useAuth.jsx:7:24` unused `setIsLoggedIn` error (unchanged after P3).
- P3 implemented via delegated writer: `src/services/CategoriaService.js`, `src/pages/categorias/CategoriaList.jsx`, `src/pages/categorias/FormCategoria.jsx` created; `RouterConfig.jsx` gained `/categorias`, `/categorias/create`, `/categorias/:id` (product path style, AuthenticatedRoute-wrapped); `Navbar.jsx` gained category list/create entries inside the Productos submenu children.
- Parent follow-up applied: removed the stray duplicate `getCategoriaList` from `ProductoService.js` and pointed `FormProducto.jsx` at `CategoriaService.js`, so category API access lives only in its service.
- Category routes confirmed present on the local backend: `GET /categorias` answers 401 unauthenticated; the authenticated browser flow was not exercised.
- Native review is blocked at selectorless STATUS collection: it requests the exact `external.select_intended_untracked` capture for the current candidate. No such capture operation is available in this runtime's tools; do not invent a selection or command.
- Commit identity: pending native review and user-owned working-tree selection.

## Next step
P1 and P3 are complete and verified. Commit remains user-owned (project AGENTS.md forbids unauthorized commits). Native review (P2) still awaits the intended-untracked selection capture that this runtime could not provide; revisit when that capture is available or after the user directs the working-tree selection.
