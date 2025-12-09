# 001. Use Markdown Architectural Decision Records (ADRs)

*   **Status**: Accepted
*   **Date**: 03-12-2025
*   **Technical Story**: As an architect, I need a clear and consistent way to document significant design decisions so that the project's history is traceable.

## Context and Problem Statement

As the project evolves, we will make many significant architectural decisions (e.g; choice of architectural style, database, authentication). Without a formal record, the rationale for these decisions can be lost. This leads to "architecture by archaeology," where developers must guess the original intent. It also makes onboarding new team members difficult and can lead to re-litigating past decisions. We need a lightweight, version-controllable method for recording these decisions.

## Decision Drivers

*   Traceability. The history of decisions must be clear and auditable.
*   Clarity. The rationale for each decision must be easy to understand.
*   Version Control. The decision log should live with the project code in Git.
*   Lightweight Process. The process should not create excessive overhead.

## Considered Options

*   Option 1: Lightweight Markdown ADRs. Use a simple Markdown template (like Michael Nygard's) stored as individual files in the project repository.
*   Option 2: Wiki-based Documentation. Use a tool like Confluence or Notion to create and manage a decision log.
*   Option 3: Informal Documentation. Document decisions ad-hoc in Word documents, meeting minutes, or not at all.

## Decision Outcome

**Chosen option**: "Option 1: Lightweight Markdown ADRs", because it perfectly aligns with our decision drivers, especially version control and maintaining a lightweight process.

By storing ADRs as Markdown files in the `/adrs` directory, they are versioned alongside the code and other documentation. This provides a single source of truth that evolves with the project. The plain-text format is future-proof and accessible to all developers without requiring special software. While a wiki is good for collaboration, it decouples the decisions from the codebase itself, increasing the risk of them becoming outdated. Informal documentation is not a viable option for a project requiring a clear audit trail.

### Positive Consequences

*   Decisions are immutable and have a clear history via Git.
*   Anyone can read the decision log using any text editor.
*   The process is simple to learn and follow.
*   Provides excellent context for future developers and the project marker.

### Negative Consequences

*   Less discoverable than a centralised, searchable wiki.
*   Requires discipline from the team (or in this case, the individual) to consistently create ADRs for all significant decisions.