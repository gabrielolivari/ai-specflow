# Test Plan

## Scope

Validate all CRUDL flows (Create, Read, Update full/partial, soft-Delete, List), validation errors, permission checks, and edge cases for the Countries API.

## Test Types

- Unit: validation logic, soft-delete behavior
- Integration: full CRUDL flow against test database
- Contract: request/response schema against OpenAPI spec
- Manual exploratory: pagination edge cases, concurrent writes

## Cases

### Create

- TC-1: Create country with valid payload → 201 + UUID returned (unit + integration).
- TC-2: Create country with duplicate `code` → 409 Conflict (integration).
- TC-3: Create country with duplicate `iso3` → 409 Conflict (integration).
- TC-4: Create country with invalid `code` format (lowercase, 3 chars) → 422 (unit).

### Read

- TC-5: Get country by valid UUID → 200 + full country object (integration).
- TC-6: Get country by non-existent UUID → 404 (integration).

### Update (PUT)

- TC-7: Full update country with all fields → 200 + updatedAt refreshed (integration).
- TC-8: Full update with duplicate `code` of another country → 409 (integration).

### Update (PATCH)

- TC-9: Partial update only `capital` → 200 + only capital changed (integration).
- TC-10: Partial update with empty body → 422 (unit + integration).

### Delete (soft)

- TC-11: Soft-delete active country → 200 + `active: false` (integration).
- TC-12: Soft-delete non-existent UUID → 404 (integration).

### List

- TC-13: List countries with pagination → correct `total`, `page`, `totalPages` (integration).
- TC-14: List countries with `search` + `region` filter → only matching results (integration).

### Authorization

- TC-15: Unauthorized user (role: `authenticated`) attempts POST → 403 (integration).
- TC-16: Unauthorized user attempts PUT → 403 (integration).
- TC-17: Unauthorized user attempts PATCH → 403 (integration).
- TC-18: Unauthorized user attempts DELETE → 403 (integration).
- TC-19: Authorized user (`catalog-manager`) creates country → 201 (integration).

### Contract

- TC-20: POST request body matches `CountryCreate` schema (contract).
- TC-21: GET response body matches `Country` schema (contract).
- TC-22: List response body matches `CountryListResponse` schema (contract).

## AC to Test Case Mapping

| AC    | Test Cases       | Coverage                              |
| ----- | ---------------- | ------------------------------------- |
| AC-1  | TC-1             | Create with valid data                |
| AC-2  | TC-2, TC-3       | Duplicate code and iso3 rejection     |
| AC-3  | TC-5             | Get by UUID                           |
| AC-4  | TC-6             | Get non-existent UUID                 |
| AC-5  | TC-7, TC-8       | Full update + conflict                |
| AC-6  | TC-9             | Partial update single field           |
| AC-7  | TC-10            | Empty PATCH body rejected             |
| AC-8  | TC-11, TC-12     | Soft-delete + non-existent            |
| AC-9  | TC-13            | Pagination                            |
| AC-10 | TC-14            | Search + filter                       |
| AC-11 | TC-15 to TC-19   | Authorization for all write ops       |

## Environments

- Local (test database)
- CI (automated)

## Exit Criteria

- All 22 test cases pass.
- No high-severity defects open.
- Every AC (1–11) has at least one passing TC.
- Contract tests validate schema compatibility with OpenAPI spec.
