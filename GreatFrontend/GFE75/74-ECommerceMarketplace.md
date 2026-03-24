# E-commerce System Design (GreatFrontend)

Comprehensive system design for a high-performance e-commerce marketplace (e.g., Amazon, eBay).

## 1. Requirement Analysis

### Functional Requirements
- **Product Browsing:** Explore product listings (PLP) and details (PDP).
- **Cart Management:** Add, update quantity, and remove items.
- **Checkout:** Guest checkout support, shipping info, and payment processing.
- **Internationalization:** Support multiple currencies, languages, and address formats.

### Non-Functional Requirements
- **Performance:** TTI < 50ms, LCP < 2.5s (Critical for conversion).
- **SEO:** High search discoverability (essential for organic traffic).
- **Responsive Design:** Seamless experience across laptop, tablet, and mobile.
- **Visual Stability:** Target low CLS (< 0.1) for a premium feel.

---

## 2. High-Level Architecture

### Rendering Strategy: Universal Rendering (SSR + SPA)
- **SSR (Server-Side Rendering):** Fast first paint (LCP), SEO-friendly, and personalized content.
- **SPA (Single-Page App):** Smooth client-side navigation after hydration.
- **Data Flow:**
    - **Server:** Provides HTTP APIs for products, cart, and orders.
    - **Controller:** Manages network requests and data flow.
    - **Client Store (Zustand/Redux):** Shared state for cart counts, user sessions, and cached products.

### Pages
- **PLP (Product Listing Page):** Grid of products with name, image, and price.
- **PDP (Product Details Page):** Gallery, detailed description, specs, and "Add to Cart".
- **Cart Page:** Review items, modify quantities, and see total price (server-calculated).
- **Checkout Page:** Shipping address and payment forms.

---

## 3. Data Model

| Entity | Source | Key Fields |
| :--- | :--- | :--- |
| **Product** | Server | `id`, `name`, `unit_price`, `currency`, `image_urls`, `description` |
| **Cart** | Server/Store | `items[]`, `total_price`, `currency` (server-computed for discounts) |
| **CartItem** | Server/Store | `product_id`, `quantity`, `sub_price` |
| **Address** | User Input | `name`, `street`, `city`, `postal_code`, `country` (format varies by locale) |
| **Payment**| User Input | `card_number` (encrypted/tokenized), `expiry`, `cvv` (only store last 4 digits) |

---

## 4. API Definition (RESTful)

### Product Listing
`GET /products?page=1&size=20&country=US`
- **Pagination:** Offset-based (useful for deep-linking search results).
- **Sample Response:**
```json
{
  "pagination": { "size": 20, "page": 1, "total_pages": 4, "total": 80 },
  "results": [
    { "id": 123, "name": "Cotton T-shirt", "unit_price": 12, "currency": "USD", "primary_image": "..." }
  ]
}
```

### Product Details
`GET /products/{productId}?country=US`
- **Response:** Full product object including gallery and specs.
- **Sample Response:**
```json
{
  "id": 123,
  "name": "Cotton T-shirt",
  "image_urls": ["url1", "url2"],
  "unit_price": 12,
  "currency": "USD"
}
```

### Cart Modification
- `POST /cart/products`: Add item (returns updated cart).
- `PUT /cart/products/{productId}`: Update quantity.
- `DELETE /cart/products/{productId}`: Remove item.
- **Sample Response (Updated Cart):**
```json
{
  "id": 789,
  "total_price": 24,
  "currency": "USD",
  "items": [
    { "quantity": 2, "price": 24, "product": { "id": 123, "name": "..." } }
  ]
}
```

### Order Processing
`POST /order`
- **Payload:** `cartID`, `address_details`, `payment_token`.
- **Sample Response:**
```json
{
  "id": 456,
  "total_price": 36,
  "currency": "USD",
  "items": [...],
  "address_details": { "name": "John Doe", "city": "SF" },
  "payment_details": { "card_last_four_digits": "1234" }
}
```

---

## 5. Performance & Technical Deep-Dive

### Optimization Strategies
- **Code Splitting:** Route-based lazy loading to minimize initial JS bundle.
- **Prefetching:**
    - Prefetch PDP data when hovering over products on the PLP.
    - Prefetch Checkout page from the Cart page.
- **Image Optimization:** 
    - Use **WebP** for small file sizes with high quality.
    - **Adaptive Loading:** High-res for fiber, low-res for 3G.
    - **Lazy Loading:** Use `<img loading="lazy">` for below-the-fold content.

### Core Web Vitals (CWV)
- **LCP (Largest Contentful Paint):** Preload primary product images.
- **FID (First Input Delay):** Defer non-critical JS (analytics, modals).
- **CLS (Cumulative Layout Shift):** Use fixed aspect ratios for images and CSS grid/flex for layout stability.

### Form Optimizations (The "Conversion Killer")
- **Localized Address Forms:** Dynamic fields (e.g., "ZIP" in US vs "Postal Code" in UK).
- **Autofill Support:** Use standard `autocomplete` attributes (e.g., `shipping street-address`, `cc-number`).
- **Input Modes:** Use `inputmode="numeric"` for CC/ZIP fields to trigger correct mobile keyboards.

### SEO & Accessibility
- **Semantic HTML:** Correct use of `<h1>`-`<h6>`, `<main>`, `<article>`, and `<nav>`.
- **Structured Data:** Use **JSON-LD (Product Schema)** for rich snippets in Google.
- **A11y:** Associated `<label>` for every input, `aria-describedby` for error messages, and logical focus management.

### Security
- **HTTPS Only:** Mandatory encryption for sensitive payment data.
- **XSS Prevention:** Sanitize all user-generated content.
- **CSRF Protection:** Use secure tokens for all state-changing requests (Cart/Order).
