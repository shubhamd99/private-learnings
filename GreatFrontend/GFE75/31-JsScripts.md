# JavaScript Loading: `<script>`, `<script async>`, and `<script defer>`

Different script tags change how the browser loads and executes JavaScript files, significantly impacting page load performance and rendering times.

## Summary

### 1. **`<script>` (Default)**
* **Behavior**: **Blocks HTML parsing**. The browser pauses rendering, downloads, and executes the script immediately.
* **Execution**: Executes in the exact order they appear in the HTML.
* **Use Case**: Critical scripts essential for the initial page render.

```html
<!doctype html>
<html>
  <head>
    <title>Regular Script</title>
  </head>
  <body>
    <!-- Content before the script -->
    <h1>Regular Script Example</h1>
    <p>This content will be rendered before the script executes.</p>

    <!-- Regular script -->
    <script src="regular.js"></script>

    <!-- Content after the script -->
    <p>This content will be rendered after the script executes.</p>
  </body>
</html>
```

### 2. **`<script async>`**
* **Behavior**: **Downloads in parallel** (asynchronously) to HTML parsing. Executes **immediately** once available, which will temporarily interrupt HTML parsing.
* **Execution**: Order is **not guaranteed** (whichever downloads first runs first).
* **Use Case**: Independent third-party scripts that don't rely on the DOM or other scripts, such as analytics, ads, and tracking scripts.

```html
<!doctype html>
<html>
  <head>
    <title>Async Script</title>
  </head>
  <body>
    <!-- Content before the script -->
    <h1>Async Script Example</h1>
    <p>This content will be rendered before the async script executes.</p>

    <!-- Async script -->
    <script async src="async.js"></script>

    <!-- Content after the script -->
    <p>This content may be rendered before or after the async script executes.</p>
  </body>
</html>
```

### 3. **`<script defer>`**
* **Behavior**: **Downloads in parallel** (asynchronously) to HTML parsing. Execution is **deferred explicitly** until HTML parsing is fully completed (but right before the `DOMContentLoaded` event fires).
* **Execution**: Guaranteed to execute **in order of appearance**.
* **Use Case**: Scripts that depend on the fully-parsed DOM or depend on other scripts.

```html
<!doctype html>
<html>
  <head>
    <title>Deferred Script</title>
  </head>
  <body>
    <!-- Content before the script -->
    <h1>Deferred Script Example</h1>
    <p>This content will be rendered before the deferred script executes.</p>

    <!-- Deferred script -->
    <script defer src="deferred.js"></script>

    <!-- Content after the script -->
    <p>This content will be rendered before the deferred script executes.</p>
  </body>
</html>
```

---

## Comparison Table

| Feature | `<script>` | `<script async>` | `<script defer>` |
| :--- | :--- | :--- | :--- |
| **Parsing Behavior** | Blocks HTML parsing | Runs parallel to parsing | Runs parallel to parsing |
| **Execution Order**| In order of appearance| Not guaranteed | In order of appearance |
| **DOM Dependency** | No | No | Yes (waits for DOM) |

---

## Important Notes

* **Main Thread Blocking**: Even with `async` and `defer`, the scripts are eventually executed on the main thread. Computationally expensive scripts will still block the UI and cause lag.
  * *Tip: Use libraries like **Partytown** to relocate third-party script execution into web workers, offloading the main thread.*
* **Src Requirement**: The `async` and `defer` attributes are entirely ignored for inline scripts (scripts lacking a `src` attribute).
* **`document.write()`**: Not permitted. Any call to `document.write()` inside an `async` or `defer` script will be completely ignored by the browser.
