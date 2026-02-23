# Risk Matrix

Use this matrix to prioritize mitigation before implementation and release.

## Scale

- **Probability:** Low / Medium / High
- **Impact:** Low / Medium / High
- **Priority:** Low / Medium / High

## Priority Matrix

|                        | Low impact | Medium impact | High impact |
| ---------------------- | ---------- | ------------- | ----------- |
| **High probability**   | Medium     | High          | High        |
| **Medium probability** | Low        | Medium        | High        |
| **Low probability**    | Low        | Low           | Medium      |

## Mitigation Policy

- **High**: must mitigate before merge. Generates mandatory task in the plan.
- **Medium**: mitigate in the same iteration. Generates task in the plan.
- **Low**: document and monitor. No task required in the plan.

## Example Entries

| Risk                                   | Probability | Impact | Priority | Mitigation                               |
| -------------------------------------- | ----------- | ------ | -------- | ---------------------------------------- |
| Unauthorized update path               | Medium      | High   | High     | Centralized authorization checks + tests |
| Duplicate records on concurrent writes | High        | High   | High     | Unique constraints + idempotency         |
| Slow listing endpoint at scale         | Medium      | Medium | Medium   | Pagination limits + indexing             |
| Non-critical UI alignment issue        | Low         | Low    | Low      | Backlog item                             |
