# Acceptance Criteria

## AC-1 Create Country

Given a valid country payload with code, iso3, numericCode, name, capital, currency, and region  
When an authorized user (`admin` or `catalog-manager`) submits a POST to `/countries`  
Then a new country record is created and returned with a UUID, `active: true`, and timestamps.

## AC-2 Duplicate Code Rejected

Given a country with code `AR` already exists  
When the user submits another country with code `AR`  
Then the request is rejected with HTTP 409 and a deterministic error message indicating the duplicate field.

## AC-3 Get Country by ID

Given a country with a known UUID exists  
When any authenticated user sends a GET to `/countries/{id}`  
Then the full country object is returned with HTTP 200.

## AC-4 Get Non-Existent Country

Given a UUID that does not match any country  
When the user sends a GET to `/countries/{id}`  
Then HTTP 404 is returned with a standard error body.

## AC-5 Full Update Country (PUT)

Given an existing country  
When an authorized user sends a PUT to `/countries/{id}` with all mutable fields  
Then all fields are replaced and the updated country is returned with HTTP 200 and `updatedAt` refreshed.

## AC-6 Partial Update Country (PATCH)

Given an existing country  
When an authorized user sends a PATCH to `/countries/{id}` with only `capital`  
Then only `capital` is updated, all other fields remain unchanged, and HTTP 200 is returned.

## AC-7 Partial Update with Empty Body

Given an existing country  
When the user sends a PATCH to `/countries/{id}` with an empty body  
Then HTTP 422 is returned with a validation error.

## AC-8 Soft Delete Country

Given an existing active country  
When an authorized user sends a DELETE to `/countries/{id}`  
Then the country's `active` field is set to `false` and HTTP 200 is returned. The record is not physically removed.

## AC-9 List Countries with Pagination

Given 25 countries exist  
When the user sends GET `/countries?page=1&limit=10`  
Then 10 countries are returned with `total: 25`, `page: 1`, `limit: 10`, and `totalPages: 3`.

## AC-10 List Countries with Search and Filter

Given countries `Argentina` (region: Americas) and `Germany` (region: Europe) exist  
When the user sends GET `/countries?search=arg&region=Americas`  
Then only `Argentina` is returned.

## AC-11 Unauthorized Write Rejected

Given a user with role `authenticated` (not `admin` or `catalog-manager`)  
When the user attempts POST, PUT, PATCH, or DELETE on `/countries`  
Then HTTP 403 is returned.
