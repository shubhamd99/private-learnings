# Mastering Frontend System Design

Approaching a frontend system design problem requires moving systematically from abstract requirements down to granular implementation details. This guide outlines a structured approach to solving ambiguous problems at scale.

---

## 1. Requirement Gathering & Scoping

Never jump straight into coding. Always start by clarifying the exact boundaries of the problem.

### Functional Requirements

Define **what** the product should do.

- **Module Level:** User Management, Payment Gateway, Product Listing, etc.
- **Feature Level:** Search bar, add-to-cart button, review section.
- **Focus:** Clarify if the focus is on the demand side (B2C) or supply side (B2B).

### Non-Functional Requirements

Define the **quality and constraints** of the system.

- **Environment:** Target devices (responsive vs. adaptive), network conditions, and accessibility.
- **Performance:** Tracking Web Vitals (FCP, LCP, TTI).
- **Strategy:** Rendering strategies (CSR vs. SSR), caching mechanisms, and offline support.
- **DevOps:** CI/CD pipelines and security measures (e.g., XSS prevention).

> [!TIP]
> **Scoping:** Work with the interviewer to prioritize the MVP. You cannot build everything in 45 minutes, so narrow the focus.

---

## 2. Making Strategic Tech Choices

Justifying **why** you choose a specific technology is more important than just picking what you are familiar with.

| Category             | Considerations                                                                |
| :------------------- | :---------------------------------------------------------------------------- |
| **Frameworks**       | Trade-offs of React vs. Next.js based on rendering and performance needs.     |
| **Architecture**     | Monorepos (NX, Turborepo) vs. Microfrontends for large-scale team management. |
| **State Management** | Context API vs. Redux; client-side DBs for offline support.                   |
| **Build Tools**      | Asset optimization and bundling (Webpack, Rollup).                            |

---

## 3. Component Architecture

Break down the prioritized features into a logical hierarchy.

- **Component Trees:** Map out parent-child relationships (e.g., Main Page → Listing Component → Product Cards).
- **Routing & Persistence:** Handle navigation and maintain state across routes.
- **Reusability:** Separate business logic from UI components. Ensure the UI layer remains abstract, testable, and reusable.

---

## 4. Data Modeling, APIs, and Protocols

Establish a strong contract between the frontend and backend.

### Protocols

Choose the right communication method:

- **REST/GraphQL:** Standard request-response.
- **SSE/WebSockets:** Real-time data updates.

### Data Modeling

- **Payload Design:** Detail the exact shape of request and response payloads.
- **Error Handling:** Standardize how the backend passes error statuses and localized messages.

### Implementation Details

Dive into specific UI challenges:

- **Infinite Scrolling:** Intersection Observers.
- **Search Inputs:** Debouncing and throttling.
- **Race Conditions:** Handling API cancellations.

---

## 5. HLD vs. LLD

Understand the expectation of the specific interview round.

### High-Level Design (HLD)

Focuses on macro-level architecture, module prioritization, broad tech choices, caching layers, and system scalability. Common in senior discussions.

### Low-Level Design (LLD) / Machine Coding

Focuses on micro-level implementation. Building widgets like autocomplete, customizable forms, or chat UIs. Goal: Clean, optimized code with strong component APIs.

---

## 💡 Mantras for Interview Success

- **Don't assume:** Keep checking the interviewer's expectations constantly.
- **Think out loud:** The interviewer is grading your thought process and decision-making logic, not just the final architecture.
- **Pace yourself:** Never rush straight into the implementation. Pick one problem at a time, define constraints, and iterate.

> [!IMPORTANT]
> Frontend system design is less about memorizing a specific setup and more about demonstrating a **structured approach** to solving ambiguous problems at scale.
