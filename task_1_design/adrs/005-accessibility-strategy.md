# 005. Accessibility Compliance and Color Contrast Strategy

*   **Status**: Accepted
*   **Date**: 05-12-2025
*   **Technical Story**: Relates to NFR-06 (Accessibility)

## Context and Problem Statement

The project brief explicitly requires the Complaint Management System (CMS) to meet "strict accessibility standards like WCAG 2" (defined in NFR-06 as WCAG 2.1 Level AA). This is a hard requirement for legal, ethical, and contractual reasons.

However, the web accessibility field is evolving. The color contrast algorithm used in WCAG 2.x is widely acknowledged to have perceptual inaccuracies. A scientifically superior model, the Accessible Perceptual Contrast Algorithm (APCA), has been developed and is the proposed candidate for the future WCAG 3.0 standard.

We must define a clear and defensible strategy for our UI design and testing that meets the current compliance standard while also ensuring the best possible real-world readability and future-proofing the design. A choice must be made whether to strictly adhere to the older standard or to adopt the newer, more accurate one, and how to handle potential conflicts between them.

## Decision Drivers

*   **Compliance:** Must meet the explicit project requirement of WCAG 2.1 AA compliance.
*   **Usability:** The UI must be genuinely readable and usable for people with visual impairments, beyond just passing a technical check.
*   **Future-Proofing:** The design choices should be aligned with the future direction of web standards to avoid costly redesigns when WCAG 3.0 is adopted.
*   **Developer Experience:** The chosen strategy must be clear and easy for designers and developers to test and implement.

## Considered Options

### Option 1: Strict WCAG 2.1 AA Adherence
*   Use the WCAG 2.1 contrast ratio (4.5:1 for normal text) as the sole metric for color and contrast choices.
*   **Pros**: Simple to implement and test. Directly meets the letter of the requirement.
*   **Cons**: May result in a less perceptually accessible UI. Ignores current industry best practices and the known flaws of the algorithm. Could lead to color combinations that pass technically but are still difficult for users to read.

### Option 2: APCA-Only Adherence
*   Ignore the WCAG 2.1 ratios and use only the APCA (e.g; a minimum Lc 75 for body text) as the metric for contrast.
*   **Pros**: Results in a more scientifically and perceptually accurate level of readability. Aligns the design with the future WCAG 3.0 standard.
*   **Cons**: **Fails to meet the explicit project requirement.** The system would not be officially "WCAG 2.1 compliant," which could have legal and contractual consequences for ABC Limited.

### Option 3: Dual-Compliance Strategy (WCAG 2.1 Priority with APCA Enhancement)
*   Define WCAG 2.1 AA as the **mandatory baseline** for compliance. All color combinations must pass this test.
*   Additionally, use APCA as an **internal quality gate**. Strive to select colors that *also* meet a high APCA standard (e.g; Lc 75+ for body text).
*   In the rare case of a conflict (a color pair passes one but fails the other), the WCAG 2.1 AA result will be the deciding factor for compliance sign-off.
*   **Pros**: Guarantees compliance with the project's stated requirements. Achieves a higher level of actual usability by incorporating modern research. Future-proofs the design.
*   **Cons**: Requires slightly more effort during the design and testing phase to check against two standards.

## Decision Outcome

**Chosen option**: "Option 3: Dual-Compliance Strategy".

This strategy provides the most robust and professional approach. It ensures we fulfill the non-negotiable requirement of WCAG 2.1 AA compliance, protecting ABC Limited from potential legal and contractual issues.

Simultaneously, by using APCA as a "best practice" enhancement, we are demonstrating a commitment to genuine user accessibility that goes beyond simply "checking a box." This ensures the final product is more usable and is well-positioned for the inevitable transition to WCAG 3.0. This balanced approach directly serves all our decision drivers: compliance, usability, future-proofing, and clarity for the development process. The minor overhead of dual-testing is a worthwhile investment for the significant gains in quality and risk mitigation.