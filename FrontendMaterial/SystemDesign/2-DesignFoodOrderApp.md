# 🥗 Food Delivery System Design: Interview Cheat Sheet

## 1. High-Level Architecture

- **App Family:**
  - **Customer:** Web/Mobile/PWA (Focus on SEO & Speed).
  - **Restaurant:** Web/Tablet (Focus on Inventory & Management).
  - **Delivery:** Mobile (Focus on Geolocation & Tasks).
  - **Admin:** Web (Focus on Onboarding & Analytics).
- **Infrastructure:**
  - **CDN/Edge:** Serve static assets and cached HTML closer to users.
  - **BFF (Backend for Frontend):** Use a Node.js/GraphQL layer to aggregate data from multiple microservices (Reviews, Menus, Pricing).

---

## 2. Customer App: Performance & Rendering

- **Primary Strategy:** **SSR (Server-Side Rendering)** for SEO and high conversion.
- **Fast Booting (Low Bandwidth Optimization):**
  - **Skeleton UIs:** Prevents **CLS (Cumulative Layout Shift)** and improves perceived performance.
  - **Code Splitting:** Separate bundles for Mobile vs. Desktop (don't ship unused CSS/JS).
  - **Tree Shaking:** Remove unused library code.
  - **Polyfill Service:** Only serve legacy code to old browsers; keep modern bundles lean.
- **Resilience:**
  - **PWA (Progressive Web App):** Service Workers cache core JS/CSS.
  - **Offline Mode:** Use `IndexedDB` to store the last viewed menu so users can browse during temporary disconnects.

---

## 3. Data & State Management

- **State Separation:**
  - **Server State:** `TanStack Query` (React Query) for data fetching, caching, and **SWR (Stale-While-Revalidate)**.
  - **Client State:** `Zustand` or `Redux` for small, global UI states (Cart, User Auth).
- **Data Normalization:** Store data by ID to avoid redundancy.
  ```javascript
  // Normalized Menu Structure
  {
    items: { "id123": { name: "Pizza", price: 500 } },
    categories: { "veg": ["id123"] }
  }
  ```

---

## 4. Real-Time Tracking (CAPRD Flow)

**C**onfirm → **A**rrive → **P**ickup → **R**eached → **D**elivered

- **Pub/Sub Logic:** Browser subscribes to order updates.
- **Technology Trade-offs:**
  - **WebSockets:** Best for bi-directional (Chatting with driver).
  - **SSE (Server-Sent Events):** Best for uni-directional status updates (Order is cooking -> Order is out).
  - **Short Polling:** Fallback for maps (Driver location updates every 5-10s).

---

## 5. Restaurant App: Inventory Logic

- **Single Source of Truth:** One menu item entity, even if it appears in multiple "Combos."
- **Item Locking:** Prevent race conditions. If a manager is updating a price, "lock" that item from customer checkout for a few seconds to prevent "Price Mismatch" errors.
- **Variable Pricing:** Store item IDs in combos with a price override field.

---

## 6. Advanced Senior Topics (The "Differentiators")

- **Image Optimization:** Use `<picture>` tags with WebP/AVIF. Use a **Cloudinary/Imgix** service to resize images based on user screen size.
- **Security:** \* **Idempotency Keys:** Ensure a "Pay" button click doesn't double-charge on a flaky connection.
  - **Content Security Policy (CSP):** Prevent XSS in user reviews.
- **Accessibility (a11y):** ARIA labels for "Add to Cart," keyboard navigation for menu filters.
- **Analytics:** Track "Time to Order" and "Menu Drop-off Rate" to optimize UI.

---

## 7. Codebase Strategy

- **Monorepo (Turborepo/Nx):**
  - `apps/customer`, `apps/vendor`
  - `packages/ui`: Shared Design System (Buttons, Inputs).
  - `packages/utils`: Shared Logic (Currency formatter, Date utils).
- **Testing:** \* **Cypress/Playwright:** E2E for critical "Checkout" flow.
  - **Vitest:** Unit tests for pricing/tax logic.

---

## 8. Summary Table: Why This Tech?

| Tech                     | Why?                                               |
| :----------------------- | :------------------------------------------------- |
| **Next.js (SSR)**        | SEO + Speed for India's 3G/4G market.              |
| **Tailwind/Styled-Comp** | Scoped CSS to prevent global style leaks.          |
| **Zustand**              | Lightweight alternative to Redux for simple state. |
| **Service Workers**      | High reliability on flaky networks.                |
| **GraphQL/BFF**          | Prevents "Over-fetching" data on mobile.           |
