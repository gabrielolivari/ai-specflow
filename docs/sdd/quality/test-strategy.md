# Test Strategy

This framework is test-inclusive by default.

## Test Layers

1. **Unit tests**
   - Validate pure logic and domain rules.
2. **Integration tests**
   - Validate module boundaries, persistence, and service interactions.
3. **End-to-end tests**
   - Validate business-critical user flows.
4. **Contract tests**
   - Validate API contract compatibility and error behavior.

## Minimum Gate for Delivery

- Acceptance criteria mapped to test cases.
- Critical-path tests passing in CI.
- No unresolved high-severity defects.

## Suggested Mapping

- Business rule -> Unit test
- Data flow and repository behavior -> Integration test
- Main user journey -> E2E test
- Request/response schema and errors -> Contract test
