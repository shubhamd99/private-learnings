# System Design: Travel Booking Website

## 1. Overview & Requirements
Design a global travel booking platform (like Airbnb, Booking.com) focusing on high performance and SEO.

### Core Features
- **Search & Filter**: Find accommodations by location, date range, guests, and amenities.
- **Listing Details**: High-quality imagery, ratings, amenities, and host info.
- **Reservation System**: Secure booking flow with payment integration.
- **User Authentication**: Browsing is public; booking requires login.

### Non-Functional Requirements
- **Performance**: <2s TTI (Time to Interactive); <100ms interaction response.
- **SEO**: High visibility in organic search is a primary discovery channel.
- **Internationalization (i18n)**: Multi-language, multi-currency, and locale-aware UI.
- **Device Support**: Mobile-first responsive design for global demographics.

---

## 2. High-Level Architecture
- **Rendering Strategy**: **Server-Side Rendering (SSR)** is mandatory for SEO and fast initial LCP.
- **Framework**: **Next.js (React)** is the industry standard for universal/isomorphic apps.
- **Navigation Model**: Often **MPA (Multi-Page App)** style because users frequently open listings in new tabs to compare options.

---

## 3. Data Model & API Design

### Entities
| Entity | Key Fields |
| :--- | :--- |
| **Search Params** | `location` (text/coords), `dates` (check-in/out), `guests`, `amenities[]` |
| **Listing** | `id`, `title`, `images[]`, `price`, `currency`, `coordinates`, `rating`, `amenities` |
| **Reservation** | `id`, `accommodation_id`, `dates`, `total_price`, `payment_last_four` |

### Core APIs
- `GET /search`: Returns paginated results. Use **Offset-based pagination** for jumping to specific pages.
    ```json
    {
      "pagination": { "size": 20, "page": 1, "total": 140, "total_pages": 7 },
      "results": [
        {
          "id": "abc-123",
          "title": "Modern Loft in Mission District",
          "images": ["url1.jpg", "url2.jpg"],
          "price": 150,
          "currency": "USD",
          "rating": 4.9,
          "coordinates": { "lat": 37.77, "lng": -122.41 }
        }
      ]
    }
    ```
- `GET /accommodation/{id}`: Rich detailed view for the listing.
    ```json
    {
      "id": "abc-123",
      "title": "Modern Loft in Mission District",
      "description": "...",
      "amenities": { "wifi": true, "kitchen": true, "parking": false },
      "house_rules": "No smoking, no pets.",
      "host": { "name": "Jane Doe", "superhost": true },
      "images": ["url1.jpg", "url2.jpg", "url3.jpg"]
    }
    ```
- `POST /reserve`: Returns reservation confirmation details.
    ```json
    {
      "id": "res-987",
      "booking_status": "confirmed",
      "total_price": 450,
      "dates": { "check_in": "2024-12-24", "check_out": "2024-12-27" },
      "payment_summary": { "last_four": "4242", "card_type": "Visa" }
    }
    ```

---

## 4. Key Optimizations

### 🚀 SEO Best Practices
- **Synchronized Search State**: All filters must be reflected in the URL for bookmarking and deep linking.
- **Readable Slug URLs**: Prefer `/san-francisco/stays` over `/search?city=123`.
- **Pre-generated Landing Pages**: Create static pages for popular search terms (e.g., "Villas in Bali") for crawler indexing.
- **Sitemaps**: Maintain large sitemaps for pre-filled listing categories.

### 🌎 Internationalization (i18n)
- **HTML Attributes**: Dynamic `lang` and `dir` (RTL support for Arabic/Hebrew).
- **UI Architecture**: Use **CSS Logical Properties** (e.g., `margin-inline-start`) instead of `left/right`.
- **Content Adaptation**: Automated translation of user-contributed reviews/descriptions.

### ⚡ Performance Engineering
- **Predictive Image Loading**:
    - Only load the first image of a carousel initially (**Lazy Load**).
    - Preload images 2-5 once the user **hovers** or **tabs** over the listing.
- **Code Splitting**: Prioritize above-the-fold assets; lazy load modals and footers.
- **Virtualized Lists**: Use windowing for infinite search result pages to maintain 60 FPS.

### 📱 Device-Specific UI
- **Mobile-Specific Interactions**: Support swipe gestures, larger touch targets, and floating action buttons (FABs).
- **Dynamic Content**: Conditional rendering of maps—mobile views may deprioritize heavy maps for listing lists.

---

## 5. User Experience (UX) & Accessibility
- **Preserving Context**: Ensure clicking "Back" from a listing restores exact scroll position and filters.
- **Accessibility (A11y)**: Semantic HTML, focus management for modals, and clear error states in booking forms.
- **Form Optimization**: Country-specific address/payment formats and optimized autofill.
