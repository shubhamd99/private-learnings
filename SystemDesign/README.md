# Mastering Frontend System Design

Approaching a frontend system design problem requires moving systematically from abstract requirements down to granular implementation details. This guide outlines a structured approach to solving ambiguous problems at scale, dividing the process into High Level Design (HLD) and Low Level Design (LLD).

---

## Types of Frontend System Design Interviews

Depending on the role and company, frontend interviews generally fall into one of these four categories, requiring a mix of Business, Product, Design, Frontend, and Backend knowledge:

### 1. System Design

Focuses on the end-to-end architecture.

- Requirements
- Scoping
- Tech choices
- Component Architecture
- Data API & Implementation

### 2. Product Sense

Focuses heavily on what to build and how users interact with it, rather than technical choices.

- Requirements
- Scoping
- Data API & Implementation

### 3. UI Architecture

Focuses on the frontend ecosystem and structural decisions.

- Requirements
- Scoping
- Tech choices
- Component Architecture
- Data API & Implementation

### 4. Machine Coding / Component Design

Focuses exclusively on implementation, creating working components.

- Component Architecture
- Data API & Implementation

---

## High Level Design (HLD)

### 1. Requirements

Never jump straight into coding. Always start by clarifying the exact boundaries of the problem.

#### Functional

- B2B / B2C focus
- **Module level thinking:** User management, Help & Support, Account management, Payment gateway, Product listing, Cart Page, Subscription/Pricing.
- **Features/module:** Specific capabilities within modules.

#### Non-Functional

- Mobile/Desktop First
- Responsive/Adaptive
- Location/Devices/Internet
- Accessibility
- Asset Optimization (CSS/JS/Images)
- Performance (FCP, LCP, TTI, CLS)
- CSR/SSR (Client-Side Rendering / Server-Side Rendering)
- Authentication/Authorization
- Security
- SEO
- Caching
- Offline Support
- Micro-frontend
- Logging & Monitoring
- A/B testing
- Testing
- Internationalization (i18n) / Localization (l10n)
- Versioning
- PWA
- CI/CD Pipeline

### 2. Scoping (Prioritization)

> [!TIP]
> Work with the interviewer to prioritize the MVP. You cannot build everything in 45 minutes, so narrow the focus.

#### Functional

- B2B / B2C
- **Module level thinking:** E.g., Product listing, Cart Page
- **Features/module:** Search, Listing, Product Detail, Add Item to Cart, Add Item to Wishlist, Cart List, Add/Remove Cart Items.

#### Non-Functional

- Desktop
- Responsive
- Accessibility
- Asset Optimization (CSS/JS/Images)
- Performance (FCP, LCP, TTI, CLS)
- CSR/SSR
- Caching

### 3. Tech Choices

Justifying **why** you choose a specific technology is more important than just picking what you are familiar with.

- **Library/Framework**
- **State Management**
- **Folder structure**
- **Packages**
- **Dependencies** (e.g., Canvas/SVG, WebRTC)
- **Design System**
- **Build Tools** (Webpack, Rollup, Parcel)

---

## Low Level Design (LLD)

### 4. Component Architecture

Break down the prioritized features into a logical hierarchy.

- **Routing**
- **Component Hierarchy:** Map out parent-child relationships.
- **Data Sharing:** How state is passed between components.

### 5. Data API & Protocols & Implementation

Establish a strong contract between the frontend and backend, and plan the micro-level implementation.

#### Protocols

- REST / Graph / RPC / SSE / GraphQL
- JSON / Protocol Buffers

#### Implementation Details

- Pagination / Infinite Scroll
- Debouncing / Throttling

#### APIs

- `getProductList()`
- `getProductDetail()`
- `addProductToCart()`

#### Data Modeling

- URL
- Method
- Request (query params, body)
- Response (Data, Error)
- Status Code

#### Component

- state/props
- Event Handling
- Customization Support
- Theming
- Reusable
- Data Source

---

## 💡 Mantras for Interview Success

- **Don't assume:** Keep checking the interviewer's expectations constantly.
- **Think out loud:** The interviewer is grading your thought process and decision-making logic, not just the final architecture.
- **Pace yourself:** Never rush straight into the implementation. Pick one problem at a time, define constraints, and iterate.

> [!IMPORTANT]
> Frontend system design is less about memorizing a specific setup and more about demonstrating a **structured approach** to solving ambiguous problems at scale.

---

## 🛠️ Recommended Tools for System Design

Familiarize yourself with these diagramming tools often used during interviews to sketch out architecture and components:

- Draw.io
- Gliffy.com
- Lucidchart.com
- Miro.com
- One Note (Microsoft)
- Jamboard (Google)
