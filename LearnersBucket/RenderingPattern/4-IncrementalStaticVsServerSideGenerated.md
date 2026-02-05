# Static Site Generation (SSG) vs Incremental Static Regeneration (ISR)

## Recap: Rendering Patterns

- **Server-Side Rendering (SSR):** For every request, the server generates a new HTML page with pre-filled data. It is good for SEO but can be resource-intensive due to re-computation on every visit.
- **Client-Side Rendering (CSR):** The browser loads a minimal HTML shell and fetches data via APIs to update the UI using JavaScript. It offers fast navigation after the initial load but relies on the client for rendering.

## Static Site Generation (SSG)

SSG generates all HTML pages **at build time**. These pre-computed pages are then served to users on request, removing the need for the server to render the page dynamically each time. Tools like Gatsby and Next.js support this pattern.

### Advantages

- **Blazing Speed:** Pre-generated HTML files can be served via a Content Delivery Network (CDN) and cached heavily, resulting in excellent performance.
- **Reduced Server Load:** Eliminates the need for per-request computation on the server.
- **SEO Friendly:** Like SSR, the content is fully available in the HTML for crawlers.

### Disadvantages

- **Build Time for Large Apps:** Generating thousands of pages at build time can be very slow.
- **Static Content:** The data is locked at build time. Updating content requires a complete rebuild and redeploy of the site.

### Best Use Cases

- Applications with content that doesn't change frequently, such as **blogs**, documentation, or marketing websites.

---

## Incremental Static Regeneration (ISR)

ISR is a hybrid approach provided by frameworks like Next.js that combines the speed of SSG with the flexibility of SSR. It allows you to create or update static pages **after** the build time without rebuilding the entire site.

### Advantages

- **Performance + Dynamic Data:** Initial requests can be served instantly from cache (like SSG), while the page is re-generated in the background for future visitors if the data has changed.
- **Scalability:** You don't need to generate all pages at build time. Pages can be lazy-loaded and cached as users visit them.

### Disadvantages

- **Slower Initial Request (Cold Start):** If a page hasn't been generated yet, the first user might experience a wait while it is built (depending on configuration).
- **Not Real-Time:** It is not suitable for applications requiring live data updates (e.g., stock tickers), as there is a delay before the new version is generated and cached.

### Best Use Cases

- Applications with content that changes occasionally but not constantly, such as **e-commerce product listings**, food ordering menus, or news sites.

---

## The Role of `use client` in Next.js (App Router)

In modern Next.js, components are **Server Components** by default. The `"use client"` directive acts as a boundary marker between server-side logic and client-side interactivity.

### What it Does

- **Enables Interactivity:** Allows use of `useState`, `useEffect`, browser APIs (like `window`), and event listeners (`onClick`).
- **The Boundary:** Everything _imported into_ a file with `"use client"` becomes part of the client bundle. Parents remain server components.

### Common Misconception

**Does `"use client"` disable SSG/SSR?**
**No.** Client components are **still pre-rendered** into HTML on the server (during build for SSG or request for SSR). The directive simply tells the browser to "hydrate" that HTML with JavaScript to make it interactive.

### Best Practice Pattern

- **Page Handling (Server Component):** Use SSG/ISR to fetch data (e.g., a Menu page fetching from DB). Zero bundle size, great SEO.
- **Interactive Bits (Client Component):** Isolate interactivity into small components (e.g., an "Add to Cart" button) that use `"use client"`.
