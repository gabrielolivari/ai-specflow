---
id: ADR-0001-generic-crud-policy
title: Generic CRUD baseline policy
date: YYYY-MM-DD
deciders: [architecture-team]
related_rfc: none
---

# Context

Projects repeatedly implement CRUD/ABM behavior with inconsistent rules, error handling, and access control.

# Decision

Adopt a baseline CRUD policy for all entities unless a spec explicitly overrides it:

1. Consistent validation and error shape across create/update inputs.
2. Pagination and sorting defaults on list operations.
3. Access control checks before mutating operations.
4. Soft delete preferred for business entities requiring auditability.
5. Contract and acceptance criteria are mandatory before implementation.

# Consequences

- Positive: More predictable behavior and lower implementation variance.
- Negative: Additional upfront specification effort.
- Follow-up: Each project maps this policy to its specific stack and modules.
