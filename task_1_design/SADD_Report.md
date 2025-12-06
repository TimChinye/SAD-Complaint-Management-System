# Software Architecture Design Report (SADR)

## Complaint Management System (CMS)

---

**Author:** Tim Chinye
**Student ID:** c3032230
**Module:** 55-608809 \- Software Architecture and Design
**Date:** 03/12/2025

---

### Document Control

| Version | Date | Author | Changes |
| :---- | :---- | :---- | :---- |
| 0.1 | 03/12/2025 | Tim Chinye | Initial draft |
| 1.0 | xx/12/2025 | Tim Chinye | Final version submitted for assessment |

---

### Table of Contents

1. Introduction
2. Solution Architecture
3. Solution Design
4. Appendix

---

## 1\. Introduction

### 1.1 Purpose

This document outlines the software architecture and design for the Complaint Management System (CMS). It details the architectural goals, key design decisions, and technical specifications required to guide the development and implementation of the system, ensuring it meets all functional and non-functional requirements.

### 1.2 Scope

### 1.3 Definitions, Acronyms, and Abbreviations

| Term | Definition |
| :---- | :---- |
| ADR | Architecture Decision Record |
| CMS | Complaint Management System |
| NFR | Non-Functional Requirement |
| RBAC | Role-Based Access Control |
| JWT | JSON Web Token |

---

## 2\. Solution Architecture

### 2.1 Architectural Goals & Constraints

### 2.2 Non-Functional Requirements (NFRs)

| ID | Category | Requirement Description | Justification |
| :---- | :---- | :---- | :---- |
| NFR-01 | **Scalability**     | The system must be architected to support a baseline of 20 million consumer users per tenant and accommodate a 10% year-on-year growth in user base. | Sourced directly from the case study's user base projection (Barclays example) to ensure the system can handle the target market's load.      |
| NFR-02 | **Performance**     | All API response times for interactive user queries must be below 200ms at the 95th percentile under projected load.                                   | To provide a fluid and responsive user experience, preventing user frustration and abandonment of tasks.                                 |
| NFR-03 | **Security**        | The system must enforce strict data isolation between tenants. This will be implemented via row-level security using a `tenant_id` column in all relevant database tables. | To prevent data breaches between client companies, as formally decided in ADR-005. |
| NFR-04 | **Security**        | User authentication must be secure, including storing passwords using a strong, salted hashing algorithm (e.g; Argon2, bcrypt).                     | To protect user accounts from being compromised, even in the event of a database breach.                                                   |
| NFR-05 | **Availability**    | The core online services of the CMS must achieve 99.9% uptime (high availability), excluding planned, communicated maintenance windows.                | As per the case study's "24/7 for online services" requirement, ensuring the system is reliably available for global users at all times.     |
| NFR-06 | **Accessibility**   | All user-facing web interfaces must be compliant with Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. This will be the primary measure of compliance. | Explicitly required by the case study to ensure the system is usable by individuals with disabilities, meeting current legal and ethical standards. |
| NFR-07 | **Usability**       | The system shall provide a consistent and intuitive user experience, minimizing the cognitive load and steps required to complete key tasks.         | To enhance user satisfaction and efficiency, reducing the need for extensive user training for tenant employees.                         |
| NFR-08 | **Extensibility**   | The architecture must be modular and expose functionality through a versioned API to allow for future integration with chatbots and mobile apps.       | Directly addresses the case study's future requirements, ensuring the system is future-proof and can evolve without a complete rewrite.      |
| NFR-09 | **Maintainability** | The system will be decomposed into logically distinct modules/services to allow for independent development, testing, and deployment.               | To support developer productivity, reduce the complexity of changes, and improve the long-term maintainability of the codebase.          |

### 2.3 Technology Stack

<!-- Placeholder Start -->

| Layer | Technology | Justification |
| :---- | :---- | :---- |
| Frontend | React | Component-based architecture supports building a complex, maintainable UI. Strong community and ecosystem. |
| Backend | Microservices | As detailed in ADR-001, this style was chosen to meet scalability and independent deployment requirements. |
|  | ⇢ User Service (Python/Flask) | Excellent for rapid API development. |
|  | ⇢ Auth Service (Go) | High concurrency and performance ideal for a critical authentication service. |
| Database | PostgreSQL | Relational model ensures data integrity and consistency, which is critical for this system. See ADR-002. |

<!-- Placeholder End -->

### 2.4 C4 Model \- Level 1: System Context

**Figure 1: C4 System Context Diagram for the CMS.**

### 2.5 C4 Model \- Level 2: Container

**Figure 2: C4 Container Diagram for the CMS.**

---

## 3\. Solution Design

### 3.1 User Interface & Experience (UI/UX) Design

**Figure 3: Wireframe for the "Consumer Logs a Complaint" user journey.**

#### 3.1.1 Accessibility Considerations

As defined in **NFR-06**, the primary goal for accessibility is strict compliance with the **Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA**. All design choices, from color selection to interactive elements, will be validated against this standard. This includes ensuring a minimum contrast ratio of 4.5:1 for normal text, providing text alternatives for non-text content, and ensuring all functionality is operable via a keyboard.

However, it is a known issue within the web development community that the WCAG 2.x contrast algorithm can produce results that are not perceptually uniform. To build a product that is not only compliant but also genuinely usable and future-proof, our design process will also reference the **Accessible Perceptual Contrast Algorithm (APCA)**. APCA is the candidate contrast method for the upcoming WCAG 3.0 standard and provides a more scientifically accurate model of human visual perception.

**Our design strategy is therefore twofold:**
1.  **Primary Compliance:** The color palette and typography choices **must pass** WCAG 2.1 AA requirements. This is the non-negotiable baseline.
2.  **Enhanced Usability:** Wherever possible, the chosen color combinations will also be tested against APCA to ensure they meet modern standards for readability, aiming for a minimum Lc value of 75 for body text.

This dual approach ensures the system meets its immediate contractual obligations while striving for the highest level of practical accessibility for its users.

### 3.2 C4 Model \- Level 3: Component

**Figure 4: C4 Component Diagram for the Complaint Service.**

### 3.3 C4 Model \- Level 4: Code

#### 3.3.1 Structural Design (Class Diagram)

**Figure 5: Class Diagram for the ComplaintLogic component.**

#### 3.3.2 Behavioural Design (Sequence Diagram)

**Figure 6: Sequence Diagram for "Assign complaint to a support agent".**

### 3.4 Data Design

The data model for the CMS is designed to support the multi-tenancy strategy outlined in ADR-005. All tenant-specific entities include a `tenant_id` foreign key to ensure strict data isolation at the database level.

**Figure 7: Data Model (ERD) for the CMS.**

### 3.5 Security Design

#### 3.5.1 Authentication

#### 3.5.2 Authorization (RBAC)

| Role | Permissions |
| :---- | :---- |
| Consumer | Create Complaint, View Own Complaints, Add Comment to Own Complaint. |
| Agent | View Assigned Complaints, Update Complaint Status, Add Internal Notes. |
| Manager | View All Complaints (for their tenant), Assign Complaints, View Dashboards. |
| Admin | Onboard New Tenants, Create Manager Users. |

---

## 4\. Appendix

### Appendix A: Refined User Stories

### Appendix B: Identified Use Cases

### Appendix C: Architecture Decision Records Log

| ID | Title | Status | Date |
| :---- | :---- | :---- | :---- |
| ADR-001 | ADR Template Choice              | Accepted   | 03/12/2025 |
| ADR-002 | Architectural Style              | Superseded | 03/12/2025 |
| ADR-003 | Password Reset Mechanism         | Accepted   | 05/12/2025 |
| ADR-004 | Accessibility Strategy           | Accepted   | 05/12/2025 |
| ADR-005 | Re-evaluated Architectural Style | Accepted   | 05/12/2025 |
| ADR-006 | Multi-tenancy Strategy           | Accepted   | 05/12/2025 |
| ADR-007 | Database Choice                  | Proposed   | xx/12/2025 |
| ADR-008 | Authentication Mechanism         | Proposed   | xx/12/2025 |

### Appendix D: AI Transparency Statement

## AI Transparency Statement

**AITS Descriptor:** AITS 3: AI for Developing

For this assessment, I have used Artificial Intelligence (AI) in accordance with AITS 3 (AI for Developing) of the Artificial Intelligence Transparency Scale. This statement is an expansion of [the university's exemplar](https://www.shu.ac.uk/myhallam/study/assessment/artificial-intelligence-and-assessment#:~:text=an%20example%20student%20statement), adapted for a software architecture and design context rather than a traditional essay, whilst staying in accordance with the guidance provided in the assessment brief.

Specifically, I used Google's Gemini (via [AI Studio](https://aistudio.google.com/)) at different AITS levels for Task 1 and 2:


1. **AITS 2 (Shaping) for Task 1:** For the initial design phase, AI was used to help brainstorm potential Non-Functional Requirements derived from the case study and to refine the phrasing and acceptance criteria for the initial user stories. This helped to shape the problem domain and structure the planning artifacts.

2. **AITS 3 (Developing) for Task 2:** For the implementation of the Proof of Concept (PoC), I directed AI to generate boilerplate and skeleton code for specific components based on my pre-defined architecture and design. For example:
\--- Start: To be updated, for accuracy.
   * After I designed the API contract for the Complaint Service, I used AI to generate the initial Flask/FastAPI controller class with empty function signatures for the required HTTP methods (e.g; `POST`, `GET`).  
   * I generated standard configuration files, such as a basic `Dockerfile` or a `requirements.txt` file, which I then reviewed and modified.  
   * I used it to create basic, non-complex React components based on my wireframes, which I then connected and imbued with state management logic.
\--- End: To be updated, for accuracy.

My own human contribution was central to all of the project's core decisions and technical implementation. **AI-generated suggestions were treated as a starting point for my own investigation and were never directly implemented without critical evaluation and adaptation.** My contributions include:

* All high-level architectural decisions, including the selection of the microservices style, the multi-tenancy data isolation strategy, and the technology stack. These decisions are documented in my Architecture Decision Records (ADRs).  
* The creation of all design artefacts, including all C4 model diagrams (Context, Container, Component, Code), the data model (ERD), and wireframes.  
* The writing of all complex and core business logic within the PoC. AI-generated skeletons were filled in entirely by me.  
* The critical review, refactoring, security-hardening, and integration of all AI-generated code. I was solely responsible for ensuring the code was correct, secure, and fit for purpose within my architecture.

In this project, I acted as the architect and lead developer, using AI as a productivity tool to accelerate the development of standard or repetitive code segments. I directed the AI's output, critically evaluated every suggestion, and retained full ownership and responsibility for the final architecture, design, and quality of the submitted work.