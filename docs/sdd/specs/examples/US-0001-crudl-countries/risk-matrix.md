# Risk Matrix

| Risk                                            | Probability | Impact | Priority | Mitigation                                           |
| ----------------------------------------------- | ----------- | ------ | -------- | ---------------------------------------------------- |
| Duplicate records on concurrent writes          | Medium      | High   | High     | Unique DB constraints on code, iso3, numericCode     |
| Unauthorized user modifies country data         | Medium      | High   | High     | Centralized auth middleware + role check + tests     |
| Slow listing endpoint at scale (10k+ countries) | Low         | Medium | Low      | DB index on name, region, active + pagination limits |
| Soft-delete leaves orphan references            | Low         | Medium | Low      | Document soft-delete policy; future cascade story    |
| Invalid ISO codes accepted                      | Medium      | Medium | Medium   | Input validation with regex + contract tests         |
