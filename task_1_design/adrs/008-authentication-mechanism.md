# 008. Service-to-Service Authentication and Authorization Mechanism

*   **Status**: Accepted
*   **Date**: 06/12/2025
*   **Technical Story**: Relates to NFR-04 (Security - Authentication). Select a secure and scalable mechanism for authenticating users and authorizing API requests across our distributed microservices.

## Context and Problem Statement

In our microservices architecture (ADR-004), a user authenticates once with the Authentication Service, but then makes subsequent API calls to various other services (Users Service, Complaint Service, etc.). We need a mechanism that allows these downstream services to securely verify the user's identity and permissions on every request, without needing to contact the Authentication Service every time. This mechanism must be secure, performant, and suitable for a distributed, stateless environment.

## Decision Drivers

*   **Security:** The mechanism must be tamper-proof and prevent unauthorized access. It must securely convey user identity and roles.
*   **Statelessness:** The backend services should not need to store session information in memory. This is crucial for horizontal scalability and resilience.
*   **Performance:** The verification process on each service must be extremely fast to avoid adding significant latency to API requests.
*   **Decentralized Verification:** Each microservice should be able to independently verify a user's request without a synchronous call to the Auth Service.
*   **Standardization:** The chosen mechanism should be a well-understood, industry-standard protocol.

## Considered Options

### Option 1: Stateless JSON Web Tokens (JWTs)
A user logs in with their credentials. The Auth Service validates them and issues a JWT, which is a cryptographically signed JSON object containing user information (e.g., `user_id`, `role`, `tenant_id`). The client sends this JWT in the `Authorization` header of every API request. Each microservice holds the public key to verify the JWT's signature and trusts the data within it.

*   **Pros**:
    *   **Stateless and Scalable:** Perfectly aligns with microservice principles.
    *   **Decentralized Verification:** Each service can verify the token independently, making it very performant.
    *   **Secure:** As long as the signing key is kept secret, the token's payload cannot be tampered with.
    *   A widely adopted industry standard (RFC 7519).
*   **Cons**:
    *   Tokens cannot be easily revoked before their expiry. (This can be mitigated with short expiry times and a refresh token mechanism).
    *   If a token is stolen, it can be used until it expires.

### Option 2: Stateful Session Tokens (The "Traditional" Way)
A user logs in. The Auth Service creates a random session ID, stores it in a central cache (like Redis) along with the user's data, and returns the session ID to the client. The client sends this ID with each request. Each microservice must then make a call to the central cache to retrieve the user's session data and verify the request.

*   **Pros**:
    *   **Centralized Control:** Sessions can be instantly revoked by deleting them from the central cache.
*   **Cons**:
    *   **Violates Statelessness:** All services are now dependent on the central session store.
    *   **Performance Bottleneck:** The session store can become a bottleneck as every API call to every service requires an extra network hop to validate the session.
    *   **Single Point of Failure:** If the session store goes down, the entire system stops working. This conflicts with our High Availability goal (NFR-05).

## Decision Outcome

**Chosen option**: "Option 1: Stateless JSON Web Tokens (JWTs)".

JWTs are the clear choice for our microservices architecture. The pattern of decentralized, stateless verification directly supports our core architectural goals of scalability, performance, and resilience. Each service can operate independently, which is crucial for maintaining the fault isolation benefits of a microservices design.

We will mitigate the risk of token theft by implementing short-lived access tokens (e.g., 15 minutes) and a more secure, long-lived refresh token mechanism to allow users to obtain new access tokens without re-entering their credentials. The user's role and `tenant_id` will be embedded directly into the JWT payload, allowing every service to make fine-grained authorization decisions instantly and securely. This approach provides a robust and modern foundation for security within our distributed system.