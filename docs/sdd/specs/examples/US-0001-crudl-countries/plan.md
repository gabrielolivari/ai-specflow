---
id: PLAN-20260115-crudl-countries
status: approved
owner: platform-team
created_at: 2026-01-15
related_spec: US-0001-crudl-countries
---

# Objective

Implement full CRUDL operations (Create, Read, Update full/partial, Delete soft, List with pagination/search/filter) for the countries catalog, aligned with the OpenAPI contract and ISO 3166-1 standards.

# Scope

- In scope: POST, GET one, GET list, PUT, PATCH, DELETE (soft) for `/countries`.
- In scope: input validation, auth/authz middleware, unique constraints, pagination.
- Out of scope: geopolitical boundary intelligence, real-time external sync, multi-language names.

# Tasks

## Database & Model

- [x] Create `countries` table migration with all fields (id UUID PK, code, iso3, numericCode, name, capital, currency, region, active, createdAt, updatedAt).
- [x] Add unique constraints on `code`, `iso3`, `numericCode`.
- [x] Add indexes on `name`, `region`, `active` for list performance.

## Endpoints

- [x] POST `/countries` — create country with full validation (AC-1).
- [x] GET `/countries/{id}` — read single country by UUID (AC-3).
- [x] PUT `/countries/{id}` — full update of all mutable fields (AC-5).
- [x] PATCH `/countries/{id}` — partial update, reject empty body (AC-6, AC-7).
- [x] DELETE `/countries/{id}` — soft-delete, set `active: false` (AC-8).
- [x] GET `/countries` — list with `page`, `limit`, `search`, `region`, `active` filters (AC-9, AC-10).

## Validation & Error Handling

- [x] Validate `code` (2 uppercase letters), `iso3` (3 uppercase letters), `numericCode` (3 digits).
- [x] Return 409 on duplicate `code`, `iso3`, or `numericCode` with descriptive error (AC-2).
- [x] Return 404 for non-existent country UUID (AC-4).
- [x] Return 422 for invalid input or empty PATCH body (AC-7).

## Authorization (Risk Mitigation: High)

- [x] Apply auth middleware to all endpoints (JWT validation).
- [x] Restrict POST, PUT, PATCH, DELETE to `admin` and `catalog-manager` roles (AC-11).
- [x] Allow GET to any authenticated user.

## Concurrency Protection (Risk Mitigation: High)

- [x] Rely on DB unique constraints to prevent duplicate records on concurrent writes.
- [x] Return 409 Conflict when constraint violation is caught.

## ISO Code Validation (Risk Mitigation: Medium)

- [x] Validate code format with regex at request level.
- [x] Add contract tests to verify schema validation rules match OpenAPI spec.

## Testing

- [x] Unit tests: validation logic, soft-delete behavior.
- [x] Integration tests: full CRUDL flow against test database.
- [x] Contract tests: request/response against OpenAPI spec.
- [x] Auth tests: verify 403 for unauthorized users (AC-11).
- [x] Edge case tests: duplicate code, empty PATCH, non-existent ID.

# Verification

- All TC-1 through TC-22 from test-plan.md pass.
- All acceptance criteria AC-1 through AC-11 validated.
- OpenAPI contract compatibility verified.
- PR checklist and release checklist completed.

# Risks

See `risk-matrix.md` for full risk assessment. Key mitigations included in this plan:

- **High — Duplicate records:** Unique DB constraints + 409 response handling.
- **High — Unauthorized writes:** Centralized auth middleware + role-based access.
- **Medium — Invalid ISO codes:** Request-level regex validation + contract tests.
