# 009. Support for Federated Identity and Single Sign-On (SSO)

*   **Status**: Accepted
*   **Date**: 06/12/2025
*   **Technical Story**: Allow tenant employees to log in using their existing corporate identity providers (e.g; Microsoft 365, Google Workspace) for enhanced security and usability.

## Context and Problem Statement

Forcing employees of our large enterprise tenants (like banks and telecoms) to create and manage a separate password for the CMS is both a usability burden and a security risk. These organizations have their own robust Identity Providers (IdPs) like Microsoft Entra ID (formerly Azure AD) or Google Workspace. They prefer to manage their user access centrally.

We need to support federated identity, allowing tenant employees to "Login with Microsoft" or "Login with Google." This enhances security by leveraging the IdP's policies (like MFA) and improves the user experience through Single Sign-On (SSO).

## Decision Drivers

*   **Enhanced Security:** Delegate the responsibility of credential management and advanced security policies (like MFA, conditional access) to the tenant's trusted IdP.
*   **Improved User Experience:** Allows users to log in with a single click without needing another password.
*   **Enterprise Readiness:** Support for SSO is a standard and often mandatory requirement for selling software to large enterprises.
*   **Simplified User Management:** Tenants can deprovision users from their central directory, and access to the CMS is automatically revoked.

## Considered Options

### Option 1: Implement OpenID Connect (OIDC) and OAuth 2.0 Flows
Adopt the industry-standard protocols for authentication and authorization. The Authentication Service will act as a client to the tenant's IdP (e.g; Microsoft).

*   **Process**:
    1.  A user from "NatWest" attempts to log in.
    2.  Our Auth Service redirects them to the NatWest Microsoft login page.
    3.  User authenticates with Microsoft.
    4.  Microsoft redirects back to our Auth Service with an authorization code.
    5.  Our Auth Service exchanges the code for an ID token, validates it, and then issues its *own internal JWT* (from ADR-008) for our microservices.
*   **Pros**:
    *   The standard, most secure, and most flexible approach.
    *   Supported by all major identity providers.
    *   Clear separation of concerns: the IdP handles *authentication*, our Auth Service handles creating a *session* (our JWT) for our own system.
*   **Cons**:
    *   Can be complex to implement the full OIDC flow correctly.

### Option 2: Do Not Support Federation
Require all users to create a local username and password within the CMS.

*   **Pros**:
    *   Simpler to implement initially.
*   **Cons**:
    *   **Fails to meet the security expectations of enterprise customers.**
    *   Creates a poor user experience.
    *   A significant competitive disadvantage and a barrier to sales.

## Decision Outcome

**Chosen option**: "Option 1: Implement OpenID Connect (OIDC) and OAuth 2.0 Flows".

Supporting federated identity via OIDC is a critical business and security decision. It positions the CMS as a modern, enterprise-ready platform. While the implementation is more complex than a simple password system, the security and usability benefits are immense and align with the expectations of our target customers.

Our Authentication Service will be designed to handle multiple OIDC providers, configured on a per-tenant basis. After a successful federated login, the service will issue our internal, stateless JWT as decided in ADR-008. This allows the rest of our internal microservices to remain unaware of the initial authentication method, keeping the core architecture clean and decoupled.