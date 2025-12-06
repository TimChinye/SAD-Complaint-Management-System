# 006. Secure Password Reset Mechanism

*   **Status**: Proposed
*   **Date**: 05-12-2025
*   **Technical Story**: US-G02: Password Reset

## Context and Problem Statement

The system requires a mechanism for users to securely reset their passwords without administrator intervention. This is a critical feature for both usability and security. An insecure implementation could expose user accounts to takeovers. We must choose a mechanism that is secure, reliable, and provides a good user experience.

## Decision Drivers

*   **Security**: The process must be resilient to common attacks (e.g; token guessing, session fixation).
*   **Reliability**: The user must reliably receive the reset instructions (e.g; email delivery).
*   **User Experience**: The process should be simple and intuitive for the user.
*   **Scalability**: The solution should not create a bottleneck for the authentication service.

## Considered Options

*   **Option 1: Signed, Time-limited Token via Email**:
    *   **Process**: User requests reset -> System generates a unique, cryptographically signed token (like a JWT) containing user ID and an expiry timestamp -> Token is embedded in a URL and sent to the user's registered email -> User clicks link -> System validates the token's signature and expiry -> If valid, allows password change.
    *   **Pros**: Stateless (the auth service doesn't need to store the token in its database), highly secure if implemented correctly.
    *   **Cons**: Relies on email delivery. Requires a service capable of sending emails.

*   **Option 2: One-Time Code (OTC) via Email/SMS**:
    *   **Process**: User requests reset -> System generates a short, random code (e.g; 6 digits) and stores it in the database with an expiry -> Code is sent to user via email or SMS -> User enters the code on the reset page -> System verifies the code -> Allows password change.
    *   **Pros**: Simple for the user. Can be delivered via multiple channels (SMS).
    *   **Cons**: Stateful (requires database storage for the code), slightly less secure against phishing if the code is simple.

*   **Option 3: Security Questions**:
    *   **Process**: User is prompted with pre-selected security questions ("What was your first pet's name?").
    *   **Pros**: Doesn't rely on external delivery channels.
    *   **Cons**: **Considered insecure and outdated.** Answers are often guessable or socially engineered. Poor user experience (users forget answers). **This option is not recommended.**

## Decision Outcome

**Chosen option**: "Option 1: Signed, Time-limited Token via Email", because it provides the best balance of high security and a stateless design, which aligns perfectly with our microservices architecture. Using a standard like JWT for the token ensures a robust, industry-tested implementation. This approach avoids cluttering our user database with temporary codes and places the security logic within the token itself. We will leverage an external email service (like AWS SES or SendGrid) to handle the email delivery, which is a standard pattern for scalable applications.