# Test Plan

## Scope

Define what is covered and what is not covered.

## Test Types

- Unit
- Integration
- End-to-end
- Manual exploratory

## Test Cases

- TC-1: Happy path
- TC-2: Validation failure
- TC-3: Permission failure
- TC-4: Edge case

## AC to Test Case Mapping

Every acceptance criterion must have at least one test case.

| AC   | Test Cases |
| ---- | ---------- |
| AC-1 | TC-1       |
| AC-2 | TC-2, TC-3 |

## Environments

- Local
- CI
- Staging

## Exit Criteria

- All critical test cases pass
- No high-severity defects open
- Every AC has at least one passing TC
