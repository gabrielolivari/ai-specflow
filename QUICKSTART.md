# Quickstart

Use this onboarding flow to run the framework from idea to delivered change.

## Before You Start

1. Read `CONVENTIONS.md`.
2. Read `docs/sdd/quality/guardrails.md`.
3. (Optional) Initialize `.ai/project-profile.md` from `.ai/project-profile.template.md`.

## Progressive Workflow

You do not need to create all files at once. Each step creates or updates the artifacts needed for that stage.

| Step | Command / Action                  | Main outputs                                                                          |
| ---- | --------------------------------- | ------------------------------------------------------------------------------------- |
| 1    | Create story folder               | `docs/sdd/specs/user-stories/US-000X-short-slug/`                                     |
| 2    | `create-spec`                     | `spec.md` (initial draft)                                                             |
| 3    | `enrich-user-story`               | Updated `spec.md`, `acceptance-criteria.md`, `risk-matrix.md`, draft `contracts/`     |
| 4    | Human validates/refines contracts | Finalized `contracts/`                                                                |
| 5    | `plan-ticket`                     | `plan.md`, `test-plan.md`                                                             |
| 6    | Human approves plan               | `plan.md` with `status: approved`                                                     |
| 7    | `develop-from-plan`               | Code changes, `traceability.md`, `changelog.md`, `plan.md` with `status: in-progress` |
| 8    | `review-ticket`                   | Findings and recommendation                                                           |
| 9    | Human closes                      | `plan.md` with `status: done`                                                         |

## Step-by-Step Execution

### 1) Create the user story folder

Create `docs/sdd/specs/user-stories/US-000X-short-slug/`.

### 2) Draft the initial spec

Run `create-spec` using `.ai/commands/create-spec.md`.
This creates `spec.md` with goals, non-goals, requirements, and initial context.

### 3) Enrich the story and generate quality artifacts

Run `enrich-user-story` using `.ai/commands/enrich-user-story.md`.
This updates `spec.md` and generates:

- `acceptance-criteria.md`
- `risk-matrix.md`
- Draft `contracts/` proposal

### 4) Validate contracts

Review and refine the AI-generated contract proposal in `contracts/` (OpenAPI/schema/events).
If needed, align naming and constraints with `CONVENTIONS.md`.

### 5) Plan execution

Run `plan-ticket` using `.ai/commands/plan-ticket.md`.

Expected outputs:

- `plan.md` with `status: pending`
- `test-plan.md` with AC -> TC mapping

Ensure every `Medium`/`High` risk has explicit mitigation tasks.

### 6) Human approval gate

Set `plan.md` to `status: approved` only after human approval.

### 7) Implement from approved plan

Run `develop-from-plan`.
Update code and maintain:

- `traceability.md` (`Requirement -> Code -> Test -> PR/Commit`)
- `changelog.md`

### 8) Run review and quality checks

Run `review-ticket` and address findings.
Then verify:

- `docs/sdd/quality/checklists/pr-checklist.md`
- `docs/sdd/quality/checklists/release-checklist.md` (when applicable)

### 9) Close the story

When all gates pass, set `plan.md` to `status: done`.

## Architecture Decision Trigger (RFC -> ADR)

Use RFC/ADR when the change is architectural (for example: auth model shift, major data model change, new service boundary).

- Draft RFC with `docs/sdd/decisions/rfc/RFC-template.md`
- Finalize ADR with `docs/sdd/decisions/adr/ADR-template.md`
- Link ADR in the story `spec.md`

## Useful References

- `README.md`
- `CONVENTIONS.md`
- `docs/sdd/specs/user-stories/README.md`
- `docs/sdd/quality/guardrails.md`
