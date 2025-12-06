 # 006. Multi-Tenancy Data Isolation Strategy

*   **Status**: Accepted
*   **Date**: 05/12/2025
*   **Technical Story**: Relates to NFR-03 (Security - Tenant Isolation). We must select a data isolation strategy that ensures tenant data is secure and not visible to other tenants.

## Context and Problem Statement

The Complaint Management System (CMS) is a multi-tenant platform. As defined in NFR-03, the system must enforce strict data isolation between tenants (e.g; NatWest's data must be completely separate from Barclays' data). This is the most critical security requirement of the system, as any breach of this isolation would destroy customer trust and be a catastrophic business failure.

We must choose a data architecture pattern that enforces this isolation reliably and efficiently at the persistence layer. This decision will affect the database schema, the application logic of every service, performance, and operational complexity.

## Decision Drivers

*   **Security & Isolation:** The primary driver. The chosen strategy must make it impossible for one tenant's users or queries to access another tenant's data.
*   **Scalability:** The solution must scale to support hundreds or thousands of tenants, each with potentially millions of their own users and complaints.
*   **Cost-Effectiveness:** The solution should be cost-effective in terms of infrastructure and maintenance.
*   **Ease of Implementation:** The strategy should be implemented with confidence and without excessive complexity in the application code.
*   **Tenant Onboarding:** The process of adding a new tenant to the system should be simple and automated.

## Considered Options

### Option 1: Shared Database, Shared Schema (Row-Level Security)
In this model, all tenants share the same database and the same set of tables. A `tenant_id` column is added to every table that contains tenant-specific data (e.g; `complaints`, `users`, `comments`). Every single database query in the application logic **must** include a `WHERE tenant_id = ?` clause to filter for the current tenant's data.

*   **Pros**:
    *   **Most cost-effective.** Uses the fewest database resources.
    *   **Simple tenant onboarding.** Adding a new tenant is just an `INSERT` statement in the `tenants` table.
    *   Simplifies cross-tenant analytics (for the System Administrator).
*   **Cons**:
    *   **Lowest level of isolation.** Security is purely enforced by the application logic. A single buggy query that forgets the `WHERE` clause could expose all data.
    *   Potential for "noisy neighbor" performance issues, where a heavy-load tenant can impact others.

### Option 2: Shared Database, Schema-per-Tenant
In this model, all tenants share a single database server, but each tenant gets its own dedicated schema (a logical namespace for tables). For example, `natwest.complaints` and `barclays.complaints`. The application connects to the database and sets the active schema based on the current user's tenant.

*   **Pros**:
    *   **Strong logical isolation.** It's impossible for a query in one schema to accidentally access data in another.
    *   Simpler application logic (no need for the `WHERE tenant_id = ?` clause everywhere).
*   **Cons**:
    *   More complex tenant onboarding (requires running DDL statements to create a new schema and all its tables).
    *   Can be difficult to manage schema migrations across hundreds of schemas.
    *   Many database technologies have limits on the number of schemas/tables.

### Option 3: Database-per-Tenant
This model provides the highest level of isolation by provisioning a completely separate database instance for each tenant. The application logic would dynamically change its database connection string based on the user's tenant.

*   **Pros**:
    *   **Maximum security and isolation.** Data is physically separate.
    *   Eliminates the "noisy neighbor" performance problem entirely.
*   **Cons**:
    *   **Highest cost and operational complexity.** Managing hundreds or thousands of separate databases is a significant overhead.
    *   Very complex and slow tenant onboarding process.
    *   Makes cross-tenant analytics extremely difficult.

## Decision Outcome

**Chosen option**: "Option 1: Shared Database, Shared Schema (Row-Level Security via `tenant_id`)".

This strategy provides the best balance of cost-effectiveness, scalability, and ease of implementation for our SaaS platform. The simplicity of onboarding new tenants is a major operational advantage that aligns with our business goals.

We acknowledge that this model places the burden of security enforcement on the application code. We will mitigate this critical risk by:
1.  **Mandating a strict code review process** for all database queries to ensure the `tenant_id` filter is always present.
2.  **Implementing a centralized data access layer** (e.g; Repositories) that automatically applies the tenant filter, abstracting this concern away from the core business logic.
3.  **Using automated tests** that specifically attempt to perform cross-tenant data access and fail if the security boundary is breached.

With these safeguards in place, this model provides a pragmatic and scalable foundation for the CMS.