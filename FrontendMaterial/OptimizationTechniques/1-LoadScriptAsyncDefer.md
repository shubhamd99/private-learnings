# Async vs Defer: Optimizing Script Loading

Loading web pages fast is critical for **SEO, UX, and User Satisfaction**. Since modern web apps rely heavily on JavaScript, handling its loading and execution carefully is essential for performance.

## Why Script Loading Matters

JavaScript is a **"parser-blocking resource"**. By default, when the HTML parser encounters a `<script>` tag, it stops parsing the DOM, fetches the script (if external), executes it, and only then resumes parsing. This can lead to blank pages and a poor user experience, especially on slow connections.

## Loading Strategies

### 1. Loading in the `<head>` (Default)

- **Behavior**: HTML parsing pauses while the script is downloaded and executed.
- **Risk**: Users may see a blank page if the script is large or the network is slow.

### 2. Loading at the end of `<body>`

- **Behavior**: The DOM is rendered first, and then the script is loaded.
- **Improved UX**: Provides a faster "first paint," which was the traditional way to fix performance issues in older browsers.

### 3. Using `async`

- **Behavior**: Downloads the script asynchronously while the DOM is still parsing.
- **Execution**: Pauses DOM parsing _only_ for execution.
- **Order**: Follows a **"load-first"** order. If a smaller script (5KB) finishes downloading before a larger one (10KB), it will execute first regardless of placement.
- **Dependency**: Should **not** be used for scripts with dependencies (e.g., jQuery).
- **Events**: `DOMContentLoaded` may fire before or after the script loads.

### 4. Using `defer`

- **Behavior**: Downloads the script while the DOM is parsing but executes it only **after** the parsing is finished.
- **Order**: Executes in the exact order they are placed in the HTML.
- **Events**: `DOMContentLoaded` fires only after `defer` scripts are loaded and executed.
- **Interaction**: Scripts are executed after `domInteractive` but before `domComplete`.

## Comparison Table

| Feature                | Default (`<script>`)       | `async`                             | `defer`                          |
| :--------------------- | :------------------------- | :---------------------------------- | :------------------------------- |
| **HTML Parsing**       | Paused (Blocked)           | Parallel download; Paused execution | Parallel download; Never blocked |
| **Execution Timing**   | Immediate (after download) | Immediate (after download)          | After DOM parsing completes      |
| **Order of Execution** | Source order               | **Load-first** (First finished)     | **Source order**                 |
| **DOMContentLoaded**   | Fired after execution      | No guarantee (before or after)      | Fired **after** execution        |
| **Dependencies**       | Guaranteed                 | **Not guaranteed**                  | Guaranteed                       |

## Summary: Which to Use?

- **Use `async`**: If the script is independent and execution order doesn't matter (e.g., tracking pixels, ads).
- **Use `defer`**: If the script relies on the DOM being built or depends on other scripts (e.g., UI frameworks, libraries).
- **Inline Script**: If a script is small and relied upon by an `async` script, use an inline script without attributes placed above it.
