# Hydration: Progressive vs. Selective

**Hydration** is the process where client-side JavaScript attaches to server-rendered HTML to make it interactive (adding event listeners, state, etc.). It bridges the gap between the fast initial load of Server-Side Rendering (SSR) and the interactivity of Single Page Applications (SPAs).

### Why is Hydration Important?

- **Performance:** Faster Time-to-First-Paint (TTFP) as users see content before JS loads.
- **SEO:** Search engines crawl fully rendered HTML easily.
- **User Experience:** Seamless transition from static content to an interactive app.

---

## 1. Progressive Hydration

Progressive hydration hydrates specific critical parts of the page first, followed by less critical sections, rather than hydrating the entire application at once.

- **How it works:**
  1. Server sends HTML with placeholders.
  2. Critical code (above-the-fold) is loaded and hydrated first.
  3. The rest of the page is hydrated incrementally as resources allow (e.g., when the browser is idle).

- **Best For:** Applications where all content eventually needs to be interactive, but you want to prioritize the visible areas to improve perceived performance.

## 2. Selective Hydration

Selective hydration hydrates **only** the parts of the page that strictly need interactivity, often triggered by user interaction (clicks, scroll) or visibility. It may skip hydration for static parts entirely to save resources.

- **How it works:**
  1. Server sends HTML with markers for interactive zones.
  2. JS listens for user actions (e.g., scrolling to a component).
  3. Hydration triggers _only_ when the specific condition (visibility/interaction) is met for that component.

- **Best For:** Large, complex applications where many components might never be used by the user, saving distinct memory and CPU resources.

---

## Comparison: Progressive vs. Selective Hydration

| Feature         | Progressive Hydration                                                 | Selective Hydration                                                      |
| :-------------- | :-------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| **Concept**     | Hydrates the **entire** page over time, starting with critical parts. | Hydrates **only specific parts** based on need (interaction/visibility). |
| **Trigger**     | Priority-based (Critical first -> Idle second).                       | User Interaction (Click/Scroll) or Visibility.                           |
| **Performance** | Improves Perceived Performance (Time-to-Interactive for top content). | Saves resources (CPU/Memory) by avoiding unnecessary work.               |
| **Complexity**  | Moderate. Requires prioritizing components.                           | High. Requires complex logic for conditional hydration.                  |
| **Scalability** | Good for apps with clear content hierarchy.                           | Excellent for very large, dynamic apps with many hidden components.      |
| **SEO**         | Essential content is SSR'd (Good).                                    | Essential content is SSR'd (Good).                                       |

---

## Tools Supporting Hydration

- **React:** `ReactDOM.hydrate`, `React.lazy`, and `Suspense`.
- **Next.js:** Supports dynamic imports and efficient hydration patterns.
- **Vue.js:** `Vue.hydrate` and Async Components.
- **Svelte / SvelteKit:** Built-in SSR and hydration support.

## Summary

- **Choose Progressive Hydration** when your goal is to make the _whole page_ interactive as fast as possible without blocking the main thread.
- **Choose Selective Hydration** when you want to minimize resource usage by _only_ hydrating components the user actually interacts with.
