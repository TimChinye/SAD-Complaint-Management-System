# Refined User Stories for the Complaint Management System (CMS)

This document provides a refined set of user stories derived from the initial project brief. To ensure a professional, industry-standard approach to requirements definition, two key methodologies were adopted, as detailed below.

### User Story Structuring: The Connextra Template

Each user story is structured using the three-part **Connextra Template**: `As a <role>, I want to <goal>, so that <benefit>`. This format ensures that every requirement is framed from a user's perspective, clearly defining the actor, their objective, and the underlying value of the feature. This methodology was studied and applied based on the principles outlined by leading agile practitioners.

*   **Reference Source:** https://www.mountaingoatsoftware.com/agile/user-stories
*   **Reference Source:** https://www.mountaingoatsoftware.com/blog/why-the-three-part-user-story-template-works-so-well

### Acceptance Criteria: Gherkin Syntax (`Given-When-Then`)

To ensure each user story is unambiguous, testable, and has a clearly defined scope, acceptance criteria (AC) are provided in the **Gherkin syntax**: `Given-When-Then` (as suggested by the blog linked eaerlier). This format, central to Behaviour-Driven Development (BDD), describes the system's behavior by defining a prerequisite state, a user action, and an expected outcome. The application of this technique was informed by established guides on agile development.

*   **Reference Source:** https://martinfowler.com/bliki/GivenWhenThen.html
*   **Reference Source:** https://guides.visual-paradigm.com/give-when-then-acceptance-criteria-for-user-stories-in-agile-development/

### User Story ID Convention

User stories are assigned a unique identifier based on the following convention: `US-<Actor>-<Number>`.

| Prefix | Actor / Role          | Description                                                    |
| :----- | :-------------------- | :------------------------------------------------------------- |
| `US-C` | **C**onsumer          | The end-users of the tenant companies (e.g; bank customers).   |
| `US-A` | **A**gent             | The tenant's frontline Help Desk Agent.                        |
| `US-S` | **S**upport Person    | The tenant's specialist responsible for resolving complaints.    |
| `US-M` | **M**anager           | The tenant's Help Desk Manager overseeing the process.         |
| `US-SA`| **S**ystem **A**dmin  | The global platform administrator employed by ABC Limited.     |
| `US-G` | **G**eneral           | Stories that apply globally or to multiple roles. |

---

## 1. Consumer Role

These stories cover the experience of the end-users of the tenant companies (e.g; customers of NatWest or Vodafone).

#### US-C01: Register a new complaint online

*   **As a** consumer,
*   **I want to** register a new complaint through the online portal,
*   **So that** I can have my issue formally logged and tracked.

*   **Acceptance Criteria:**
    *   **Given** I am an authenticated consumer on the complaint submission page,
    *   **When** I provide a concise title for my complaint,
    *   **And** I select a relevant category from a predefined list (e.g; "Billing," "Fraud," "Technical Issue"),
    *   **And** I provide a detailed description of the issue (minimum 50 characters),
    *   **And** I optionally upload up to 3 supporting files (e.g; screenshots, receipts; max 5MB each),
    *   **Then** the complaint is created with a "New" status,
    *   **And** I am shown a confirmation page with a unique reference number (e.g; `CMS-NAT-12345`),
    *   **And** I receive an email confirmation containing the same reference number and a link to view my complaint.

#### US-C02: View the status of my complaints

*   **As a** consumer,
*   **I want to** view a list of all my submitted complaints and their current status,
*   **So that** I can stay informed about the progress of my issues.

*   **Acceptance Criteria:**
    *   **Given** I am an authenticated consumer,
    *   **When** I navigate to the "My Complaints" dashboard,
    *   **Then** I see a list of all complaints I have submitted,
    *   **And** each list item displays the reference number, title, date submitted, and current status (e.g; "New," "In Progress," "Resolved," "Closed"),
    *   **And** I can click on a complaint to view its full details.

#### US-C03: Confirm resolution of a complaint

*   **As a** consumer,
*   **I want to** confirm that my problem has been solved to my satisfaction,
*   **So that** the complaint can be officially closed.

*   **Acceptance Criteria:**
    *   **Given** my complaint is in the "Resolved" state,
    *   **When** I view the complaint's detail page,
    *   **Then** I see a prominent option to "Accept and Close" or "Re-open" the complaint,
    *   **And** when I click "Accept and Close," the complaint status changes to "Closed,"
    *   **And** I receive a final confirmation email.

---

## 2. Help Desk Agent Role

These stories cover the functionality required by the tenant's frontline support staff who interact directly with consumers.

#### US-A01: Log a complaint on behalf of a consumer

*   **As a** Help Desk Agent,
*   **I want to** create a new complaint on behalf of a consumer who has called in,
*   **So that** their issue is captured in the system even if they don't use the online portal.

*   **Acceptance Criteria:**
    *   **Given** I am an authenticated Help Desk Agent,
    *   **When** I search for a consumer by their name, email, or account number,
    *   **And** I select the correct consumer from the search results,
    *   **Then** I am presented with the same complaint submission form as the consumer,
    *   **And** when I submit the form, the new complaint is created and correctly associated with that consumer's account.

#### US-A02: Assign a complaint to a specialist

*   **As a** Help Desk Agent,
*   **I want to** assign a complex complaint to a relevant Support Person,
*   **So that** an expert can work on resolving the issue.

*   **Acceptance Criteria:**
    *   **Given** I am viewing a complaint with a "New" status,
    *   **When** I click the "Assign" button,
    *   **Then** I can select from a list of available Support Persons within my tenant organization,
    *   **And** when I confirm the assignment, the complaint's status changes to "In Progress",
    *   **And** the assigned Support Person is notified of the new assignment.

#### US-A03: Update a consumer on their complaint status

*   **As a** Help Desk Agent,
*   **I want to** view the complete history and current status of a consumer's complaint,
*   **So that** I can provide an accurate update when they call for information.

*   **Acceptance Criteria:**
    *   **Given** a consumer has called and I have located their complaint in the system,
    *   **When** I open the complaint's detail view,
    *   **Then** I can see all details, a chronological log of all status changes, and any resolution notes added by the Support Person.

---

## 3. Support Person Role

These stories focus on the specialist users responsible for the technical resolution of complaints.

#### US-S01: View my assigned complaints

*   **As a** Support Person,
*   **I want to** see a queue of all complaints assigned to me,
*   **So that** I know what work I need to do.

*   **Acceptance Criteria:**
    *   **Given** I am an authenticated Support Person,
    *   **When** I navigate to my dashboard,
    *   **Then** I see a list of complaints currently assigned to me, ordered by priority or date assigned.

#### US-S02: Update a complaint with resolution notes

*   **As a** Support Person,
*   **I want to** add notes detailing my investigation and resolution steps to a complaint,
*   **So that** there is a clear audit trail and the consumer can be informed.

*   **Acceptance Criteria:**
    *   **Given** I am viewing a complaint assigned to me,
    *   **When** I complete my work to fix the issue,
    *   **And** I add my resolution notes to a specific field in the complaint,
    *   **And** I change the complaint status to "Resolved",
    *   **Then** the notes are saved and the consumer is automatically notified that their issue has been resolved and is pending their confirmation.

---

## 4. Help Desk Manager Role

These stories cover the oversight and reporting functionality for tenant management.

#### US-M01: Monitor team performance via a dashboard

*   **As a** Help Desk Manager,
*   **I want to** view a dashboard with key performance indicators (KPIs) for my team,
*   **So that** I can assess efficiency and identify areas for improvement.

*   **Acceptance Criteria:**
    *   **Given** I am an authenticated Help Desk Manager,
    *   **When** I access the management dashboard,
    *   **Then** I see visualizations for KPIs such as:
        *   Average time to resolution (per category and overall).
        *   Number of open vs. closed complaints this month.
        *   Performance leaderboards for Support Persons and Agents.
    *   **And** the dashboard page must load in under 3 seconds.

---

## 5. System Administrator Role

These stories cover the global, platform-level administration.

#### US-SA01: Onboard a new tenant company

*   **As a** System Administrator,
*   **I want to** onboard a new company onto the CMS platform,
*   **So that** they can start using the system as a new tenant.

*   **Acceptance Criteria:**
    *   **Given** I am an authenticated System Administrator,
    *   **When** I navigate to the "Tenant Management" section and click "Add New Tenant",
    *   **And** I provide the company name (e.g; "HSBC"), a unique tenant identifier (e.g; `hsbc-uk`), and contact details,
    *   **Then** a new, fully isolated tenant is provisioned in the system,
    *   **And** I am prompted to create the first Help Desk Manager account for this new tenant.

#### US-SA02: Manage user roles for a tenant

*   **As a** System Administrator,
*   **I want to** manage the core user accounts and roles within a tenant,
*   **So that** I can handle top-level user administration tasks.

*   **Acceptance Criteria:**
    *   **Given** I am an authenticated System Administrator,
    *   **When** I select a tenant to manage,
    *   **Then** I can view a list of all its users,
    *   **And** I can create new users and assign them a role (e.g; Help Desk Manager, Agent, Support Person),
    *   **And** I can suspend or delete existing user accounts.

---

## 6. General / Implied Stories

These are essential stories that apply to most users but were not explicitly stated in the initial list.

#### US-G01: User Authentication

*   **As a** registered user (any role),
*   **I want to** log in to the system securely with my credentials,
*   **So that** I can access the features appropriate for my role.

*   **Acceptance Criteria:**
    *   **Given** I am on the login page,
    *   **When** I enter my correct email and password,
    *   **Then** I am authenticated and redirected to my role-specific dashboard,
    *   **And** if I enter incorrect credentials after 3 attempts, my account is temporarily locked for 15 minutes.

#### US-G02: Password Reset

*   **As a** registered user (any role),
*   **I want to** be able to reset my password if I forget it,
*   **So that** I can regain access to my account without needing to contact an administrator.

*   **Acceptance Criteria:**
    *   **Given** I am on the login page and have forgotten my password,
    *   **When** I click the "Forgot Password?" link,
    *   **And** I enter my registered email address,
    *   **Then** the system sends a password reset link to that email address,
    *   **And** the link is unique and expires after 1 hour,
    *   **And** when I click the link, I am taken to a page where I can securely set a new password.