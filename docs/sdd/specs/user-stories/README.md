# User Stories

This folder contains real, active user stories and use-case specs for the project.

## How to use

1. Create a folder named `US-000X-short-slug`.
2. Files are generated **progressively** by each command — you do not need to create them all at once.
3. Track status using frontmatter in `spec.md` and `plan.md`.

## Progressive File Generation

Files appear as you advance through the workflow. Each command creates or updates specific artifacts:

| Step | Command / Action                  | Files created or updated                                                                     |
| ---- | --------------------------------- | -------------------------------------------------------------------------------------------- |
| 1    | Human creates folder              | User story folder `US-XXXX-slug/`                                                            |
| 2    | `/create-spec`                    | `spec.md` (initial draft)                                                                    |
| 3    | `/enrich-user-story`              | updates `spec.md` + generates `acceptance-criteria.md`, `risk-matrix.md`, draft `contracts/` |
| 4    | Human validates/refines contracts | `contracts/` (OpenAPI, schema, etc.)                                                         |
| 5    | `/plan-ticket`                    | `plan.md`, `test-plan.md`                                                                    |
| 6    | Human approves plan               | `plan.md` (status → approved)                                                                |
| 7    | `/develop-from-plan`              | Source code, `traceability.md`, `changelog.md`, `plan.md` (status → in-progress)             |
| 8    | `/review-ticket`                  | Review report (no new files, validates all existing)                                         |
| 9    | Human closes                      | `plan.md` (status → done)                                                                    |

> **Tip:** You should only see 1–3 files after step 2. The rest appear naturally as you progress.

## Complete file list (for reference)

Once all steps are done, a user story folder contains:

- `spec.md` — functional specification
- `acceptance-criteria.md` — testable conditions
- `risk-matrix.md` — risks with mitigation
- `contracts/` — API or schema definitions
- `plan.md` — execution plan with status lifecycle
- `test-plan.md` — test cases with AC mapping
- `traceability.md` — requirement → code → test → PR links
- `changelog.md` — spec change history

## Note

`examples/` is only educational.  
Production work belongs in `user-stories/`.

## Starter Sample

Use `US-0000-sample-workflow/` as a concrete starter reference.
