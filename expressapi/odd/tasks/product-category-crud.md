# Product and Category CRUD

## Objective
Add Sequelize models and complete CRUD endpoints for products and categories, with each product assigned to exactly one category.

## Problem and rationale
The API has no product or category resources. The user requested product fields `id`, `nombre`, decimal `precio`, and `stock`, plus category assignment and CRUD readiness. The user confirmed a single category per product.

## Scope and constraints
- Add `Producto` fields: generated `id`, required `nombre`, decimal `precio`, integer `stock`, and required `categoriaId` foreign key.
- Add a persisted `Categoria` resource with a required `nombre`, enabling categories to be created and managed through CRUD endpoints.
- Follow the existing Express/Sequelize/CommonJS conventions and protect routes with the existing authentication middleware.
- Preserve existing API behavior and avoid reading or modifying `.env`.
- Do not add dependencies. The project has no configured test suite; run focused static checks and report their limits.
- New tables are created through the existing non-forced Sequelize synchronization. Do not enable `force: true`; no migration framework is currently configured.

## Authorized edit scope
- `models/producto.model.js`
- `models/categoria.model.js`
- `models/index.js`
- `services/producto.service.js`
- `services/categoria.service.js`
- `controllers/producto.controller.js`
- `controllers/categoria.controller.js`
- `routes/producto.routes.js`
- `routes/categoria.routes.js`
- `routes/index.js`
- `schemas/productoSchema.js`
- `schemas/categoriaSchema.js`
- `odd/tasks/product-category-crud.md`

## Tasks
- [x] PC-1 (route: delegated): implement product/category models, one-to-many association, services, validation, and authenticated full CRUD routes/controllers. Verified by JavaScript syntax checks and ESLint; no deterministic API test runner exists.

## Acceptance criteria
- Product CRUD supports list, get by ID, create, full update, partial update, and delete.
- Category CRUD supports list, get by ID, create, full update, partial update, and delete.
- Product price persists as a decimal; stock is an integer; every product references one existing category.
- Category deletion cannot silently orphan products; enforce or reject according to a safe foreign-key behavior.
- Invalid input and missing resources use established middleware responses.
- Existing routes remain unchanged.

## Checks
- Test-first exception: no existing deterministic test suite or test script is configured (`pnpm test` is a failing placeholder); do not claim RED/GREEN test evidence.
- Run ESLint on changed JavaScript files if the configured command is available and verify syntax/route registration without connecting to a real database.
- Read back the changed source and report any unverified database behavior.

## Progress and verification
- Forecast: approximately 250–400 authored changed lines, excluding generated files.
- Implemented category/product CRUD, required category association, validation schemas, and protected routes. Category deletion checks for products and the database association uses `RESTRICT`.
- `node --check` passed for all 12 changed JavaScript files; `pnpm exec eslint` passed for those files.
- No database-backed verification was performed. No migration framework exists; new tables rely on existing non-forced `sequelize.sync()` behavior, which was not exercised.

## Delivery
- Strategy: ask-on-risk. Keep this feature to one coherent work-unit commit; delivery beyond the commit remains under ordinary repository policy.

## Next step
Parent to review and create a Conventional Commit scoped to this work unit. Database-backed table creation and foreign-key enforcement remain unverified in this environment.
