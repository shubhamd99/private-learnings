# System Design: Autocomplete / Search Bar (Frontend Interview)

The RADIO framework is a structured way to answer frontend system design questions.
R - Requirements
A - Architecture
D - Data Model
I - Interface (API)
O - Optimizations

> Walk through this order in an interview:
> Requirements → Architecture → API → Caching → Optimizations → UX → Accessibility

---

## 1. Requirements

**Core features:**

- User types in a text box → dropdown appears with matching suggestions
- User can click or keyboard-navigate to select a result
- Works for text results (Google) and rich results like avatars + names (Facebook)

**Out of scope (unless asked):** fuzzy search, full search results page, server-side ranking

**Platform:** Web. Mobile responsive is a bonus.

---

## 2. Architecture

### Data flow:

```
User types
  ↓
Input Field UI  — captures keystrokes, sends query to Controller
  ↓
Controller      — checks cache first, fetches from API if cache is empty
  ↓
Cache           — stores past query results in memory (avoid repeat network calls)
  ↓
Results UI      — dropdown popup showing the list of suggestions
```

### What is the Controller?

The brain of the component. It:

- Holds current query + results in state
- Decides whether to use cached results or fire a new API call
- Handles debouncing (wait until user stops typing before fetching)

---

## 3. Component API (Props)

This is a reusable component — it needs a clean public API.

### Core props:

```
apiUrl          — where to fetch suggestions from
limit           — max number of results to show (e.g. 10)
minQueryLength  — don't fetch until user types at least N chars (e.g. 3)
debounceDuration  — wait X ms after user stops typing before fetching (e.g. 300ms)
apiTimeoutDuration — if request takes longer than X ms, cancel it and show an error
```

### Event callbacks:

```
onSelect   — fires when user picks a result
onInput    — fires on every keystroke
onFocus    — fires when input gains focus
onBlur     — fires when input loses focus
onChange   — fires when the selected value changes
```

### UI Customization — 3 options (pick based on use case):

| Option                    | Example                            | Pros                           | Cons                                 |
| ------------------------- | ---------------------------------- | ------------------------------ | ------------------------------------ |
| Theming object            | `theme={{ textColor: 'red' }}`     | Simplest to use                | Rigid — only what you expose         |
| className                 | `className="my-styles"`            | Full CSS control               | Still limited to component structure |
| renderItem (Render Props) | `renderItem={(item) => <MyRow />}` | Total freedom over each result | More code for the caller             |

**renderItem is the best** — parent controls what each result looks like. The component doesn't need to know about your images, icons, or design system. This is called **Inversion of Control** — the component gives control back to the caller.

### Cache props:

```
cacheDuration  — how long to keep cached results before they expire (TTL)
dataSource     — fetch strategy: "network-only", "cache-first", "cache-only"
               — network-only: always fetch fresh (stock prices)
               — cache-first: use cache if available, else fetch (Google)
               — cache-only: never fetch, only serve from cache (offline mode)
```

### Server API:

```
GET /api/search?query=face&limit=10
```

Server returns a ranked list of suggestions. The frontend just displays them.

---

## 4. Caching Strategies

Caching avoids re-fetching for the same query. Critical for performance.

### Strategy 1: Simple Hash Map — use for short-lived pages (e.g. Google)

Store every query string → array of results.

```js
cache = {
  f: ["Facebook", "Figma", "Firefox"],
  fa: ["Facebook", "Fahrenheit"],
  fac: ["Facebook"],
};
```

- **Pro:** O(1) lookup, super simple
- **Con:** Wastes memory — the same result appears in many keys

### Strategy 2: Flat List Filtering — ❌ avoid this

Fetch a big array of all results once, then filter client-side with JS as user types.

- **Pro:** Only one network request
- **Con:** Slow — JS filtering blocks the UI thread on large lists. Breaks backend ranking order (backend sorts results by relevance; client-side filter ignores that). Not recommended.

### Strategy 3: Normalized Map — use for long-lived SPAs (e.g. Facebook)

Store results once by ID. Each query key just stores a list of IDs.

```js
entities = {
  1: { id: 1, name: "Facebook", photo: "..." },
  2: { id: 2, name: "Fahrenheit" },
};
cache = {
  fa: [1, 2],
  fac: [1],
};
```

- **Pro:** No duplicate data. If a result's data changes, update it once — reflected everywhere.
- **Con:** Slightly more logic needed to join IDs → entities before rendering

**Which to use:**
| App type | Strategy | Why |
|---|---|---|
| Google search | Hash Map (Strategy 1) | Page reloads often, memory not a concern |
| Facebook / long SPA | Normalized Map (Strategy 3) | Stays open a long time, memory matters |
| Stock prices / crypto | No cache | Data changes every second, cache is useless |
| Any case | ❌ Flat List (Strategy 2) | Blocks UI thread, breaks ranking — never use |

### Cache Extras:

- **Zero-state / initial results:** When user focuses the input but hasn't typed yet → show trending searches or recent history. Cache key = `""` (empty string).
- **TTL (cache duration):** Set an expiry so old results don't show stale data. Short TTL for fast-changing data, long TTL for stable data.
- **Cache eviction:** If cache grows too large, delete the oldest or least-used entries to free memory.

---

## 5. Network Optimizations

### Debouncing — don't fire on every keystroke

```
User types: f → fa → fac → face
Without debounce: 4 API calls
With debounce (300ms): only 1 API call (after user stops at "face")
```

Wait 300ms after the last keystroke before sending the request.

### Race Conditions — old responses arriving late

**Problem:** User types "fa" → then "face". Both requests are in flight.
"fa" is slow and arrives AFTER "face" — now the dropdown shows wrong results for "face".

**Solution:** Key the cache by query string. When a response arrives, only display it if the response's query matches the current input value. Ignore stale responses.

```
response arrives for "fa" → current input is "face" → ignore it
response arrives for "face" → current input is "face" → show it ✓
```

### Abort old requests

When the user types a new character, cancel the previous in-flight request using `AbortController`.
No wasted network bandwidth, no race condition risk.

### Retry with Exponential Backoff

If a request fails → wait 1s, retry. Fails again → wait 2s. Fails again → wait 4s.
Don't hammer the server when it's struggling.

### Offline mode

Detect with `navigator.onLine`. If offline → serve results from cache only, skip network, show "You're offline" indicator.

---

## 6. Client-Side Performance

### List Virtualization

If there are hundreds of results in the dropdown — don't render all of them in the DOM.
Only render what's visible. Recycle DOM nodes as user scrolls.
Libraries: `react-window`, `react-virtual`.

### Garbage Collection

If user has been searching for an hour, the cache could have thousands of entries.
Periodically clear old entries when the browser is idle (`requestIdleCallback`).

---

## 7. UX Details

### Loading and empty states

- Show a spinner while fetching
- Show "No results found" when the response is empty
- Show a retry button when the request fails — never leave a blank dropdown

### Dropdown positioning

Normally the dropdown opens below the input.
But if the input is near the bottom of the screen, open the dropdown **above** the input instead.
Calculate available space and flip dynamically.

### Mobile input — disable browser auto-features that interfere:

```html
<input
  autocomplete="off"
  autocorrect="off"
  autocapitalize="off"
  spellcheck="false"
/>
```

These prevent the browser from showing its own autocomplete popup on top of yours.

### Keyboard navigation:

| Key          | Action                                           |
| ------------ | ------------------------------------------------ |
| ↓ / ↑        | Move through results (wrap around at top/bottom) |
| Enter        | Select highlighted result                        |
| Escape       | Close the dropdown                               |
| `/` (global) | Focus the search input from anywhere on the page |

### Fuzzy Search (mention as enhancement)

Handles typos — "fcaebook" still finds "Facebook".

- Client-side: Levenshtein distance algorithm (counts how many edits needed to match)
- Server-side: backend handles it (preferred — keeps client bundle small)
  Not needed for MVP, but mention it shows you've thought ahead.

### Text overflow

Long result strings should truncate with `...` (CSS `text-overflow: ellipsis`).
Never let text overflow outside the dropdown box.

---

## 8. Accessibility

- Wrap the input in a `<form>` tag — mobile users get a "Search" / "Go" button on their keyboard, and Enter natively submits
- Input: `role="combobox"`, `aria-label="Search"` (if no visible label), `aria-expanded="true/false"` (tells screen reader if dropdown is open)
- Results list: `role="listbox"`, each item: `role="option"`, or use semantic `<ul>/<li>`
  - **Why semantic?** Screen readers announce "List, 5 items" automatically. Users can arrow-key through results. No extra JS needed — the browser handles it free.
- `aria-haspopup="listbox"` on input — tells screen reader "clicking this will open a dropdown list"
- `aria-live="polite"` on the results region — screen reader announces when new suggestions appear
- `aria-autocomplete` on input — two variants:
  - `"list"` → suggestions shown in a dropdown list only (Facebook, X style)
  - `"both"` → inline text completion in the input + dropdown list (Google style)

---

## 9. Performance Metrics

| Metric        | What it measures                                | Target  |
| ------------- | ----------------------------------------------- | ------- |
| **FID / INP** | How fast the page reacts when user types        | < 100ms |
| **LCP**       | First content visible (input + initial results) | < 2.5s  |
| **CLS**       | Does the dropdown opening cause layout shift?   | < 0.1   |

Dropdown should open without pushing page content around — use `position: absolute` so it overlays, not displaces, page content.

---

## Quick Cheat Sheet

| Question                             | Answer                                                                                 |
| ------------------------------------ | -------------------------------------------------------------------------------------- |
| How to avoid too many API calls?     | Debounce — wait 300ms after user stops typing                                          |
| Old response overwrites new results? | Race condition — key cache by query, ignore responses that don't match current input   |
| Cancel previous request?             | `AbortController` — abort in-flight request on next keystroke                          |
| Caching for Google-like page?        | Simple hash map — O(1) lookup, page reloads often anyway                               |
| Caching for Facebook-like SPA?       | Normalized map — no duplicate data, memory efficient for long sessions                 |
| Cache for stock prices?              | No cache — data changes every second                                                   |
| Zero-state (no typing yet)?          | Show trending/recent — cache key is `""` empty string                                  |
| Too many DOM nodes in dropdown?      | List virtualization — only render visible rows                                         |
| Dropdown cuts off at screen edge?    | Dynamic positioning — flip above input if no space below                               |
| Mobile keyboard issues?              | `autocomplete="off"`, `autocorrect="off"`, `autocapitalize="off"`                      |
| Custom result row UI?                | `renderItem` render prop — Inversion of Control                                        |
| Keyboard navigation?                 | ↓↑ to move, Enter to select, Escape to close                                           |
| Screen reader for dropdown?          | `role="combobox"` on input, `role="listbox"` on list, `aria-live="polite"` for updates |
| Server fails?                        | Exponential backoff retry — 1s → 2s → 4s                                               |
| User goes offline?                   | Detect `navigator.onLine`, serve from cache, skip network                              |
