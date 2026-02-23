# Conventions

This file defines naming, lifecycle, and ownership conventions for this framework.

## Naming

- Use case/spec folder: `US-0001-short-slug`
- RFC file: `RFC-0001-short-slug.md`
- ADR file: `ADR-0001-short-slug.md`
- Plan file: `plan.md` (inside user story folder)

### User Story Artifact Names

Inside each `docs/sdd/specs/user-stories/US-XXXX-slug/` folder, use:

- `spec.md`
- `acceptance-criteria.md`
- `risk-matrix.md`
- `contracts/` (OpenAPI/schema/events)
- `plan.md`
- `test-plan.md`
- `traceability.md`
- `changelog.md`

## Status Values

### Specs

- `draft`
- `approved`
- `implemented`
- `deprecated`

### Plans (frontmatter in `plan.md`)

- `pending`
- `approved`
- `in-progress`
- `done`

## ID Rules

- IDs are unique per artifact type.
- `US`, `RFC`, and `ADR` numbering are independent.
- Cross-link with references instead of trying to match numbers.

## Required Metadata

Every spec should include:

- `id`
- `title`
- `status`
- `owner`
- `created_at`
- `updated_at`
- `related_adrs` (if any)

### Plan Metadata (`plan.md`)

`plan.md` should include:

- `status`
- `owner`
- `created_at`

### Recommended Metadata (`spec.md`)

- `risk_profile`: `low` | `medium` | `high`

### Decision Metadata (RFC/ADR)

- RFC and ADR files do not use a `status` field.
- Decision lifecycle is handled by review/approval process and linked documents, not frontmatter status transitions.

## Ownership

- Product/feature owner drafts user story intent.
- AI may draft specs from templates.
- Human owner approves specs before implementation.
- Architecture owner approves ADRs.

### OWNERS.md Cascade Rule

`OWNERS.md` files follow a cascade model:

- If a directory does not have its own `OWNERS.md`, it inherits ownership from the nearest parent `OWNERS.md`.
- If a directory needs different ownership, it creates its own `OWNERS.md` as an override.
- Example: `docs/sdd/OWNERS.md` covers all of `docs/sdd/`, but `docs/sdd/quality/OWNERS.md` overrides it because quality has distinct primary owners (`qa`).

Note: `OWNERS.md` files are documentation for humans and AI. GitHub enforcement is handled separately by `.github/CODEOWNERS`.

## Change Policy

If behavior changes:

1. Update spec first.
2. Update acceptance criteria and contracts if needed.
3. Update `risk-matrix.md` for that user story.
4. Update spec changelog.
5. Implement and test.
6. Update traceability.

## Workflow Order (Progressive Generation)

Follow this order:

1. Create story folder.
2. Create `spec.md` (`/create-spec`).
3. Refine `spec.md` and generate `acceptance-criteria.md` + `risk-matrix.md` + draft `contracts/` (`/enrich-user-story`).
4. Human validates/refines `contracts/`.
5. Create `plan.md` + `test-plan.md` (`/plan-ticket`).
6. Implement and update `traceability.md` + `changelog.md` (`/develop-from-plan`).
7. Review against all artifacts (`/review-ticket`).

## Risk Matrix Policy (Per User Story)

- Every user story must include `risk-matrix.md`.
- For simple tickets (for example CRUDL), keep it lean: 1-3 risks.
- If no material risk is identified, include one explicit row with brief rationale.
- Keep it lightweight overall: maximum 5 risks.
- `Medium` and `High` risks must include explicit mitigation tasks.
- `Low` risks can be marked as monitor-only.

## AC to Test Case Coverage Policy

- Every acceptance criterion must map to at least one test case in `test-plan.md`.
- Work is not considered complete if AC -> TC mapping is missing or tests are unverified.

## Quality Gate Locations

Quality controls are stored under `docs/sdd/quality/`:

- Guardrails: `docs/sdd/quality/guardrails.md`
- PR checklist: `docs/sdd/quality/checklists/pr-checklist.md`
- Release checklist: `docs/sdd/quality/checklists/release-checklist.md`
- Risk prioritization guide: `docs/sdd/quality/risk-matrix.md`
- Test strategy: `docs/sdd/quality/test-strategy.md`

## Traceability PR Placeholder Policy

Use the `PR/Commit` column in `traceability.md` with these values:

- `DRAFT`: story exists but is not being executed yet.
- `AUTO_PR`: story is in execution and should be auto-linked to the current PR by workflow.
- `PR #123 (url)` or commit SHA: final persisted reference after automation or manual confirmation.

Rule of thumb:

- Keep `DRAFT` until implementation starts.
- Replace `DRAFT` with `AUTO_PR` only for rows that should be linked to the active PR.
