Software Architecture and Design Report

# Software Architecture Design Description (SADD)

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
| 0.1 | xx/09/2025 | Tim Chinye | Initial draft |
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
| NFR-01 | Scalability | The system must support an initial 20 million users and maintain API response times below 200ms under 95% load. | To ensure a responsive user experience at scale. |
| NFR-02 | Security | The system must enforce strict data isolation between tenants using a database-level `tenant_id` on all relevant tables. | To prevent data breaches between client companies. |
| NFR-03 | Accessibility | All web frontends will comply with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. | To ensure the system is usable by all individuals. |
| ... | ... | ... | ... |

### 2.3 Technology Stack

| Layer | Technology | Justification |
| :---- | :---- | :---- |
| Frontend | React | Component-based architecture supports building a complex, maintainable UI. Strong community and ecosystem. |
| Backend | Microservices | As detailed in ADR-001, this style was chosen to meet scalability and independent deployment requirements. |
|  | ⇢ User Service (Python/Flask) | Excellent for rapid API development. |
|  | ⇢ Auth Service (Go) | High concurrency and performance ideal for a critical authentication service. |
| Database | PostgreSQL | Relational model ensures data integrity and consistency, which is critical for this system. See ADR-002. |

### 2.4 C4 Model \- Level 1: System Context

**Figure 1: C4 System Context Diagram for the CMS.**

### 2.5 C4 Model \- Level 2: Container

**Figure 2: C4 Container Diagram for the CMS.**

---

## 3\. Solution Design

### 3.1 User Interface & Experience (UI/UX) Design

**Figure 3: Wireframe for the "Consumer Logs a Complaint" user journey.**

#### 3.1.1 Accessibility Considerations

### 3.2 C4 Model \- Level 3: Component

**Figure 4: C4 Component Diagram for the Complaint Service.**

### 3.3 C4 Model \- Level 4: Code

#### 3.3.1 Structural Design (Class Diagram)

**Figure 5: Class Diagram for the ComplaintLogic component.**

#### 3.3.2 Behavioural Design (Sequence Diagram)

**Figure 6: Sequence Diagram for "Assign complaint to a support agent".**

### 3.4 Data Design

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
| ADR-001 | ADR Template Choice              | Accepted | 03/12/2025 |
| ADR-002 | Architectural Style              | Proposed | 03/12/2025 |
| ADR-003 | Database Choice                  | Proposed | xx/12/2025 |
| ADR-004 | Multi-tenancy Strategy           | Proposed | xx/12/2025 |
| ADR-005 | Authentication Mechanism         | Proposed | xx/12/2025 |

### Appendix D: AI Transparency Statement

## AI Transparency Statement

**AITS Descriptor:** AITS 3: AI for Developing

For this assessment, I have used Artificial Intelligence (AI) in accordance with AITS 3 (AI for Developing) of the Artificial Intelligence Transparency Scale. This statement is an expansion of [the university's exemplar](https://www.shu.ac.uk/myhallam/study/assessment/artificial-intelligence-and-assessment#:~:text=an%20example%20student%20statement), adapted for a software architecture and design context rather than a traditional essay, whilst staying in accordance with the guidance provided in the assessment brief.

Specifically, I used Google's Gemini (via [AI Studio](https://aistudio.google.com/)) at different AITS levels for Task 1 and 2:


1. **AITS 2 (Shaping) for Task 1:** For the initial design phase, AI was used to help brainstorm potential Non-Functional Requirements derived from the case study and to refine the phrasing and acceptance criteria for the initial user stories. This helped to shape the problem domain and structure the planning artifacts.

2. **AITS 3 (Developing) for Task 2:** For the implementation of the Proof of Concept (PoC), I directed AI to generate boilerplate and skeleton code for specific components based on my pre-defined architecture and design. For example:
\--- Start: To be updated, for accuracy.
   * After I designed the API contract for the Complaint Service, I used AI to generate the initial Flask/FastAPI controller class with empty function signatures for the required HTTP methods (e.g., `POST`, `GET`).  
   * I generated standard configuration files, such as a basic `Dockerfile` or a `requirements.txt` file, which I then reviewed and modified.  
   * I used it to create basic, non-complex React components based on my wireframes, which I then connected and imbued with state management logic.
\--- End: To be updated, for accuracy.

My own human contribution was central to all of the project's core decisions and technical implementation. **AI-generated suggestions were treated as a starting point for my own investigation and were never directly implemented without critical evaluation and adaptation.** My contributions include:

* All high-level architectural decisions, including the selection of the microservices style, the multi-tenancy data isolation strategy, and the technology stack. These decisions are documented in my Architecture Decision Records (ADRs).  
* The creation of all design artefacts, including all C4 model diagrams (Context, Container, Component, Code), the data model (ERD), and wireframes.  
* The writing of all complex and core business logic within the PoC. AI-generated skeletons were filled in entirely by me.  
* The critical review, refactoring, security-hardening, and integration of all AI-generated code. I was solely responsible for ensuring the code was correct, secure, and fit for purpose within my architecture.

In this project, I acted as the architect and lead developer, using AI as a productivity tool to accelerate the development of standard or repetitive code segments. I directed the AI's output, critically evaluated every suggestion, and retained full ownership and responsibility for the final architecture, design, and quality of the submitted work.