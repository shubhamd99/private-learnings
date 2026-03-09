# Front-End System Design: Autocomplete Component

## 1. Problem Statement & Requirements

Design an autocomplete UI component that allows users to enter a search term into a text box, displaying a list of selectable search results in a popup.

**Real-life examples:**

- **Google Search:** Text-based suggestions.
- **Facebook Search:** Rich results (friends, celebrities, groups).

**Key Requirements:**

- **Generic:** Usable across different websites and contexts.
- **Customizable:** Both Input UI and Results UI should support custom styling.
- **Various Data Types:** Must handle text, images, or media.
- **Cross-Device:** Works on laptops, tablets, and phones.
- **Out of initial scope:** Fuzzy search (good to discuss as a future enhancement).

---

## 2. Architecture & Components

Follows an MVC-like pattern:

- **Input Field UI:** Handles user input events and passes them to the Controller.
- **Results UI (Popup):** Displays results from the Controller; handles clicks/selections.
- **Controller (Brain):** Manages state (current query, results). Fetches from API if cache is empty.
- **Cache:** Stores past query results to prevent redundant network requests.

---

## 3. Component API Definition

Since it's a reusable component, its API must be extensive.

### Basic API (Core Functionality)

- **`apiUrl`**: Endpoint to fetch search suggestions.
- **`limit` / `resultsCount`**: Max number of results to display.
- **`events`**: Hooks for `input`, `focus`, `blur`, `change`, `select`.
- **UI Customization Options:**
  - _Theming object_ (`{ textColor: 'red' }` - simple but rigid).
  - _Classnames_ (custom CSS string overrides).
  - _Render Callback (Render Props)_ (Most flexible - `<Autocomplete renderItem={(item) => <CustomUI item={item} />} />`). Allows Inversion of Control.

### Advanced API (UX & Performance)

- **`minQueryLength`**: Don't fire API until `n` chars are typed (e.g., `3`).
- **`debounceDuration`**: Wait `x` ms (e.g., 300ms) after the user stops typing to fire the API. Reduces server load.
- **`apiTimeoutDuration`**: Abort or show an error if request takes too long.
- **Cache Options**: `cacheDuration` (TTL), `dataSource` (network-only, cache-first, etc).

### Server API (Backend expectations)

- Needs to support: `GET /api/search?query=abc&limit=10&page=1`

---

## 4. Network Optimizations

Handling race conditions and network edge cases is critical.

- **Race Conditions (Concurrent Requests):** If users type fast, an older query's response might arrive _after_ a newer query's response, overwriting the UI with stale data.
  - _Solution:_ Save results in a cache map **keyed by the exact query string**. Only display results that match the current input value. Do not rely on request ordering.
- **Failed Requests:** Implement an auto-retry and use **Exponential Backoff** to avoid server overload when the server is down.
- **Offline Mode:** Serve results purely from Cache; avoid firing network requests; show an offline indicator.

---

## 5. Caching Strategies (Crucial)

Caching avoids unnecessary network calls and instantly resolves results for typos / backspaces. It uses a Time/Space tradeoff.

### Strategy 1: Hash Map (Simple) - _Best for Short-Lived Pages (Google)_

Map every string to an array of results.

- _Pros:_ `O(1)` retrieval. Extremely simple.
- _Cons:_ High memory usage due to duplicated data (`"f" -> results`, `"fa" -> results`, `"fac" -> results`).

### Strategy 2: Flat List filtering

Fetch a giant array of results once and filter client-side via JS.

- _Pros:_ Small memory footprint.
- _Cons:_ Poor performance, blocks UI thread during filtering, ruins ranking order from backend. **Not recommended.**

### Strategy 3: Normalized Map (Database-like) - _Best for Long-Lived SPAs (Facebook)_

Store entities by ID in a normalized map, and keep an index of queries pointing to those IDs.

- _Pros:_ No duplicates. Fast lookup. Scaleable memory usage.
- _Cons:_ Requires ID mapping logic before rendering.

```javascript
// Normalized Map Example
const entities = {
  1: { id: 1, text: "Facebook" },
  2: { id: 2, text: "Face" },
};
const cache = {
  fa: [1, 2],
  fac: [1],
};
```

### Cache Eviction & "Initial Results":

- **Zero-State / Initial Results:** Focus input -> show trending, recent searches, or popular items without typing (cache key: `""`).
- **Cache Duration (TTL) based on domain:**
  - _Google:_ Long TTL (search results rarely change).
  - _Facebook:_ Moderate TTL (evict occasionally to free memory).
  - _Stock/Crypto:_ No Cache / Extremely Short TTL (prices change real-time).

---

## 6. Client-Side Performance

- **List Virtualization (Windowing):** If rendering hundreds of results, render _only_ what is currently visible in the DOM viewport, recycling DOM nodes on scroll. Prevents memory hogging and UI freezing.
- **Debouncing / Throttling:** Limit network requests to save CPU and Network payload.
- **Garbage Collection:** Purge the cache actively when total entries exceed a threshold or browser is idle.

---

## 7. User Experience (UX)

- **Empty & Loading States:** Show spinners while fetching. Show error UI with a retry button.
- **Mobile-Friendliness:** Ensure tap targets are sufficiently large. Disable native browser interference on the input:
  - `autocapitalize="off"`, `autocomplete="off"`, `autocorrect="off"`, `spellcheck="false"`.
- **Text Handling:** Long strings should confidently truncate (ellipsis `...`) or wrap. Never let text visually overflow the container.
- **Dynamic Positioning:** If the input is at the absolute bottom of the screen with no space beneath it, dynamically render the dropdown popup **above** the input.
- **Keyboard Navigation & Hotkeys:**
  - Up/Down arrows to navigate (wrap around at boundaries).
  - `Enter` to select.
  - `Escape` to dismiss dropdown.
  - Include a global hotkey (e.g., `/`) to focus the search bar.
- **Fuzzy Search:** Helps with typos (e.g., Levenshtein distance on the client, or handled by the backend).

---

## 8. Accessibility (A11y)

Do NOT skip this in interviews.

- **Roles:** Use `role="combobox"` for the input wrapper. Use `role="listbox"` and `role="option"` for the list, or stick to semantic HTML (`<ul>`, `<li>`).
- **Aria Attributes:**
  - `aria-label="Search"` on input if lacking visual label.
  - `aria-expanded="true/false"` for popup visibility state.
  - `aria-haspopup="listbox"` to indicate an interactive popup element.
  - `aria-autocomplete="list"` (recommends list completions, like Facebook/X) or `"both"` (inline + list, like Google).
- **Form Wrapping:** Wrap the input in a `<form>` tags so mobile users get proper "Go/Search" keyboard button and hitting `Enter` natively triggers a submit if needed.
- **Screen Readers:** Mark the results region with `aria-live` to dynamically announce when new suggestions appear.
