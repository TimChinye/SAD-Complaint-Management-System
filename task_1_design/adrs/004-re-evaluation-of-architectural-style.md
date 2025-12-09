# 004. Re-evaluation of Architectural Style for Scalability and Long-Term Viability

*   **Status**: Accepted
*   **Date**: 05-12-2025
*   **Technical Story**: Re-evaluate the chosen architectural style to ensure it aligns with the critical, long-term non-functional requirements of the platform. This ADR supersedes ADR-002.

## Context and Problem Statement

Our initial decision (ADR-002) selected a Monolithic architecture, prioritizing data consistency and operational simplicity. This decision was based on the premise that scalability could be addressed later through traditional methods.

However, a subsequent impact analysis of the non-functional requirements has revealed a critical strategic error in that assessment. The scalability requirement (NFR-01: 20M+ users per tenant with 10% annual growth) is not a distant, future concern; it is a foundational pillar of the business model. The pattern of scaling a monolith horizontally is inefficient and will lead to exorbitant infrastructure costs at the target scale. Furthermore, the high availability requirement (NFR-05: 99.9% uptime) is severely compromised by the monolith's lack of fault isolation.

The initial prioritisation was flawed. We over-weighted the benefits of simplified data management and under-weighted the catastrophic business risk of failing to meet the core scalability and availability NFRs.

## Decision Drivers

*   Massive Scalability (NFR-01). This is now considered the primary architectural driver. The system's success depends on its ability to scale efficiently.
*   High Availability & Fault Isolation (NFR-05). The system must be resilient. A failure in a non-critical component (e.g; a reporting module) must not impact the core complaint submission functionality.
*   Long-term Maintainability (NFR-09). The system must be able to evolve and grow without becoming an unmanageable "big ball of mud."
*   Data Consistency. Remains a critical concern, but must be addressed within the context of a distributed architecture.

## Decision Outcome

**Chosen option**: "Microservices Architecture". This decision supersedes ADR-002.

We are formally reversing the previous decision. The monolithic architecture, while seemingly safe, is a strategic dead end for this product. The business's success is predicated on achieving massive scale, and the monolith is technically and financially unviable for that goal.

We will adopt a 'Microservices Architecture'. This is a significant strategic pivot, but it is necessary to align the technical foundation with the business's core requirements. As highlighted by research on the topic, architectural granularity is not a static choice but a dynamic spectrum that must be managed throughout the system lifecycle (from Justino et al., 2025). Our pivot to microservices is a deliberate move towards a finer-grained architecture to meet the primary drivers of scalability and fault isolation.

We will address the challenge of data consistency - the primary reason for the initial monolith choice - through carefully designed API contracts and, where necessary, asynchronous event-based patterns to ensure eventual consistency. The risk of managing this complexity is now considered acceptable and necessary when weighed against the certainty of the monolith's failure at scale.

### Managing Granularity and Future Evolution

While the microservices architecture is necessary to meet our NFRs, we recognise that it is not a "fire-and-forget" solution. The choice of service boundaries and their size is a critical, ongoing challenge. As outlined by Justino et al. (2025), there is a significant risk of reaching "granularity saturation," where the operational and coordination costs of overly fragmented services begin to outweigh the benefits of modularity.

To mitigate this risk and ensure the long-term health of the architecture, we will adopt a principle of 'continuous review'. This means:
1.  Initial Boundaries Driven by Domain. Our initial service decomposition will be guided by clear business capabilities (e.g; Authentication, User Management, Complaint Management), aligning with Domain-Driven Design principles.
2.  Monitoring Key Metrics. We will monitor key indicators that can signal granularity problems, such as high inter-service communication (chattiness), frequent cross-service changes for a single feature, and rising operational costs per service.
3.  Willingness to Refactor. The architecture must be evolutionary. We will remain open to future refactoring, which may involve merging services that are too fine-grained (acting as a "Granularity Integrator") or further splitting services as domains become more complex.

This evidence-based approach ensures that our architectural decisions remain aligned with business needs and technical reality as the system evolves.

### References
*   Justino, Y., da Silva, C. E., & Duarte, R. B. (2025). *Continuously Managing Microservice Granularity: An Evidence-Based Industrial Approach*. Proceedings of the Brazilian Symposium on Software Engineering (SBES’25).