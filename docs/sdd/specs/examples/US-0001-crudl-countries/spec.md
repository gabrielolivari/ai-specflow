---
id: US-0001-crudl-countries
title: Countries CRUDL
status: approved
owner: platform-team
created_at: 2026-01-10
updated_at: 2026-01-18
related_adrs: [ADR-0001-generic-crud-policy]
---

# Context

Business users need a maintainable countries catalog to support configuration, localization, and reporting use cases across the platform. Countries are referenced by other modules (e.g., addresses, shipping, tax rules), so the catalog must be reliable and consistent.

# Problem Statement

There is no standardized countries CRUDL implementation aligned with shared contracts and quality gates. Teams manually manage country data in spreadsheets or seed scripts, leading to inconsistencies and duplication.

# Goals

- Enable create, read, update (full and partial), delete, and list operations for countries.
- Ensure consistent validation, permissions, and error handling.
- Provide stable pagination and search for country listing.
- Follow ISO 3166-1 standards for country codes.

# Non-Goals

- Geopolitical boundary intelligence or map rendering.
- Real-time synchronization with external country databases.
- Multi-language support for country names (future story).

# Business Rules

- `code` (ISO 3166-1 alpha-2) must be unique, uppercase, exactly 2 characters.
- `iso3` (ISO 3166-1 alpha-3) must be unique, uppercase, exactly 3 characters.
- `numericCode` (ISO 3166-1 numeric) must be unique, exactly 3 digits (zero-padded).
- Country name is required and cannot be blank.
- Soft-delete is the default deletion policy: sets `active: false` instead of physical removal.
- Only users with `admin` or `catalog-manager` role can create, update, or delete countries.
- Any authenticated user can read and list countries.

# Functional Requirements

- FR-1: Create a country with code, iso3, numericCode, name, capital, currency, region, and active flag.
- FR-2: Read a single country by its UUID.
- FR-3: Full update of a country (PUT) replacing all mutable fields.
- FR-4: Partial update of a country (PATCH) modifying only provided fields.
- FR-5: Soft-delete a country (sets `active: false`).
- FR-6: List countries with pagination (`page`, `limit`), search by `name`, and filter by `region` and `active`.

# Edge Cases

- Duplicate `code` or `iso3` on creation → reject with 409 Conflict.
- Invalid code format (not 2 uppercase letters) → reject with 422 Unprocessable Entity.
- Get or delete a non-existent country UUID → return 404 Not Found.
- Partial update with empty body → return 422 Unprocessable Entity.
- List with `page` or `limit` out of range → return empty results, not error.
- Unauthorized user attempts write operation → return 403 Forbidden.

# Dependencies

- Authentication service (JWT validation).
- Authorization layer (role-based access: `admin`, `catalog-manager`, `authenticated`).
- PostgreSQL (or project-configured relational database).

# Risks

- Duplicate records on concurrent writes → mitigated by unique constraints at DB level.
- Unauthorized access to write operations → mitigated by centralized auth middleware.
- See `risk-matrix.md` for full risk assessment.
