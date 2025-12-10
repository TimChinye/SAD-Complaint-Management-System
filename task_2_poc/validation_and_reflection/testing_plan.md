<!-- const jsonData = pm.response.json(); -->
<!-- pm.collectionVariables.set("ADMIN_JWT", jsonData.token); -->
<!-- pm.collectionVariables.set("MANAGER_JWT", jsonData.token); -->

# Proof of Concept Testing Plan

This plan outlines the key tests to validate the core architectural patterns of the CMS PoC.

## Test Cases

### TC-01: Authentication Success (System Admin)
-   **Objective:** Verify a valid user can log in and receive a JWT.
-   **Steps:**
    1.  POST to `/api/auth/login` with correct System Admin credentials.
-   **Expected Result:** `200 OK` status and a valid JWT in the response body.

### TC-02: Tenant Onboarding Success (Authorized)
-   **Objective:** Verify an authenticated System Admin can create a new tenant.
-   **Steps:**
    1.  Use the JWT from TC-01.
    2.  POST to `/api/users/tenants` with valid tenant and manager details.
-   **Expected Result:** `201 Created` status and confirmation of new tenant/user IDs. Database should be updated correctly.

### TC-03: Tenant Onboarding Failure (Unauthorized)
-   **Objective:** Verify an unauthenticated user cannot access a protected endpoint.
-   **Steps:**
    1.  POST to `/api/users/tenants` with **no** Authorization header.
-   **Expected Result:** `401 Unauthorized` status.

### TC-04: Tenant Onboarding Failure (Forbidden)
-   **Objective:** Verify a user with an incorrect role is denied access.
-   **Steps:**
    1.  Log in as a newly created `manager` user to get a manager-level JWT.
    2.  Use the manager JWT to POST to `/api/users/tenants`.
-   **Expected Result:** `403 Forbidden` status.

### TC-05: Tenant Onboarding Failure (Duplicate Email)
-   **Objective:** Verify the system correctly handles unique email constraints at the database level and returns a user-friendly error.
-   **Steps:**
    1.  Ensure a tenant with a manager (e.g., `alice.manager@natwest.com`) has been created.
    2.  Use a valid System Admin JWT.
    3.  POST to `/api/users/tenants` with details for a *new* tenant but the *existing* manager email.
-   **Expected Result:** `409 Conflict` status with the message "A user with this email already exists."