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

### 3. Architecture Patterns

Choosing how the application is built and deployed at a macro level.

- **Monolithic Architecture:** A single, unified codebase where all UI and logic reside together. Easy to set up but harder to scale across multiple teams.
- **Micro-frontends:** Breaking down the frontend into smaller, independently deployable applications.
  - _iFrames:_ The oldest isolation method; robust encapsulation but poor performance and difficult cross-communication.
  - _Web Components:_ Custom elements that encapsulate UI and logic. Framework agnostic.
  - _Module Federation:_ (Webpack 5) Allows JavaScript applications to dynamically load code from another application at runtime.
  - _Microapps / Route-based:_ Different teams own different routes/pages, entirely separate applications stitched together via an NGINX proxy or a lightweight shell.

### 4. Tech Choices

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

### 5. Component Architecture

Break down the prioritized features into a logical hierarchy.

- **Routing**
- **Component Hierarchy:** Map out parent-child relationships.
- **Data Sharing:** How state is passed between components.

### 6. Data API & Protocols & Implementation

Establish a strong contract between the frontend and backend, and plan the micro-level implementation.

#### Protocols

- **Short Polling:** Client repeatedly requests data from the server at fixed intervals.
- **Long Polling:** Client requests data; server holds the connection open until new data is available.
- **WebSockets:** Full-duplex, bi-directional persistent connection over a single TCP connection. Great for real-time (chat, gaming).
- **Server-Sent Events (SSE):** Unidirectional server-to-client event stream over HTTP. Great for live feeds/notifications.
- **RPC (Remote Procedure Call):** Executing procedures on a remote server as if they were local (e.g., gRPC).
- **REST / GraphQL**
- **JSON / Protocol Buffers**

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

## 🔬 Deep Dive into Core Topics

When building scalable frontends, these non-functional requirements dictate the underlying system design.

### Availability

- **Offline Support:** Ensuring the app works without a network connection using Service Workers, caching, and background sync to queue actions when offline.

### Accessibility (a11y)

- **Keyboard Accessibility:** Ensuring all interactive elements can be navigated using `Tab`, `Enter`, `Space`, etc.
- **Semantics:** Using correct HTML5 tags (`<nav>`, `<main>`, `<article>`) instead of generic `<div>`s.
- **Screen Readers:** Utilizing proper ARIA attributes, alt text, and roles so visually impaired users can navigate the app.

### Consistency

- **CSS Properties & Architecture:** Using methodologies like BEM, CSS Modules, or utility-first (Tailwind) to prevent style clashes.
- **Polyfills:** Ensuring modern JavaScript and CSS features work consistently across older, legacy browsers.
- **Design System:** A centralized library of reusable components and design tokens (colors, typography) to maintain brand consistency.

### Credibility & Trust (SEO)

- **On-Page SEO:** Optimizing the HTML structure. Includes Title tags, meta descriptions, semantic content hierarchy (`<h1>` to `<h6>`), and ensuring fast page performance (which directly impacts ranking).
- **Off-Page SEO:** Backlinks from external domains, social signals, and advertisements driving traffic.

### Logging & Monitoring

- **Error Logging:** Capturing runtime JavaScript exceptions using tools like Sentry.
- **User Activity & Tracking:** Analytics (e.g., Google Analytics, Mixpanel) to understand user flows.
- **Feature Usage/Monitoring:** Tracking which specific buttons or features are used most frequently.
- **Infra / Capacity Monitoring:** Monitoring CDN latency, API failure rates, and bundle sizes over time.

### Database, Caching & State Management

- **Caching:**
  - _HTTP Caching:_ Utilizing `Cache-Control`, `ETag`, and CDN edges.
  - _In-Memory Caching:_ Keeping frequently accessed data in variables.
  - _Apollo Caching:_ Normalized caching specifically for GraphQL data.
- **State Management:** Deciding between Context API (simple, low frequency), Redux (complex, global, frequent updates), or Zustand (lightweight).
- **Storage Options:**
  - _Local Storage:_ 5-10MB, persistent, synchronous.
  - _Session Storage:_ Cleared when the tab closes.
  - _Cookies:_ Max 4KB, sent with every HTTP request, used primarily for auth tokens.
  - _IndexedDB:_ Asynchronous, handles large amounts of structured data (good for offline storage).

### Security

- **DDoS Mitigation:** Using Cloudflare or API rate limiting to prevent overwhelming the server.
- **Authentication vs. Authorization:** Verifying _who_ the user is (AuthN) vs. verifying _what_ they are allowed to do (AuthZ).
- **CSP (Content Security Policy):** An HTTP header that prevents XSS by restricting where resources (scripts, images) can be loaded from.
- **CORS (Cross-Origin Resource Sharing):** Restricting which domains can make API requests to your server.
- **Man in the Middle (MitM):** Enforcing HTTPS / TLS to encrypt data in transit.

### Performance & Optimization

- **Asset Optimization:** Minifying JavaScript/CSS, compressing images (WebP), and using proper font loading strategies.
- **Delivery Options:** Utilizing a Content Delivery Network (CDN) to serve static assets from edge nodes close to the user.
- **Build Assets:** Code splitting and tree-shaking to reduce bundle size.
- **Rendering Strategies:** Using SSR (Server-Side Rendering) or SSG (Static Site Generation) for faster First Contentful Paint (FCP) and better SEO.
- **Service Worker:** Acting as a network proxy to intercept requests and serve cached files instantly.
- **Web Vitals:** Optimizing LCP (Largest Contentful Paint), INP (Interaction to Next Paint), and CLS (Cumulative Layout Shift).
- **Perceived Performance:** Using skeleton screens, optimistic UI updates, and placeholders to make the app _feel_ faster than it is.

### Testing

- **Unit Testing:** Testing isolated functions or simple components (Jest, Mocha, Chai).
- **Integration Testing:** Testing how multiple components work together.
- **End-to-End (E2E) Testing:** Simulating a real user interacting with the live application in a browser (Playwright, Cypress, Selenium, Protractor).

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
