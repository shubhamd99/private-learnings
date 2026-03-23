# Case Study: React Performance Fixes (Airbnb Listing Pages)

**References:**
- [React Performance Fixes on Airbnb Listing Pages](https://medium.com/airbnb-engineering/react-performance-fixes-on-airbnb-listing-pages-6cd2d197d0ba)
- [Recent Web Performance Fixes on Airbnb Listing Pages](https://medium.com/airbnb-engineering/recent-web-performance-fixes-on-airbnb-listing-pages-6cd8d93df6f4)

---

## 🛠 Methodology
- **Tool:** Chrome's Performance tool in an incognito window.
- **Profiling Mode:** Enabled React's User Timing annotations using `?react_perf` in the query string.
- **Goal:** Profile interactions like scrolling, clicking, and typing, not just the initial load.

---

## 🏗 Phase 1: Initial Render Improvements

### 1. 💀 Server/Client Markup Mismatch
**Issue:** The server rendered placeholders for older browsers (feature detection), but the client would immediately replace them. This caused a checksum invalidation and manual DOM replacement.
**Fix:** Move feature-detected rendering logic into `componentDidMount` (which only runs on the client), ensuring the server and client initial render matches perfectly.

### 2. ⚡️ Pure Components
**Issue:** Large component trees (e.g., `SummaryContainer`, `BreadcrumbList`) were re-rendering unnecessarily during initial page load even if props hadn't changed.
**Fix:** Convert `React.Component` to `React.PureComponent`. This performs a shallow comparison of props and state to prevent wasted render cycles.

### 3. 👻 Conditional Rendering
**Issue:** Components like `GuestPickerTrigger` were being rendered even when they were hidden (e.g., until an input was focused).
**Fix:** Stop rendering components that aren't visible or needed. This saves render time on mount and subsequent updates.

---

## 📜 Phase 2: Scrolling Performance

### 4. 🌀 Stabilizing Function Props
**Issue:** `NavigationAnchors` was creating an anonymous function in `render` and passing it to children.
```javascript
onPress(event) { onAnchorPress(index, event); }
```
Creating a new function reference every time de-optimizes `PureComponent` because the prop value always "changes."
**Fix:** Move the logic to a bound method in the child component or pre-bind/memoize it in the parent.

### 5. 🗺 Instance Variables vs. State
**Issue:** Using React `this.state` to track non-visual data (like scroll position or "inViewport" flags). Calling `setState` triggers a re-render cycle even if nothing visual changes.
**Fix:** Store data that doesn't affect the UI's appearance in simple instance variables (e.g., `this.inViewport = false`).

### 6. 🧪 Higher-Order Components (HOC) & Referent Integrity
**Issue:** An `experiments` HOC was creating a new object literal `{ ...experiments, ...this.state.experiments }` on every render.
**Fix:** Use **Reselect** (memoized selectors) to ensure that props remain referentially equal unless the underlying data actually changes.

---

## 🖱 Phase 3: Interaction Tuning (Clicking & Typing)

### 7. 🔪 Component Extraction
**Issue:** Typing in a search input within a large header was causing the entire review section to re-render.
**Fix:** Extract the input into its own isolated component. This narrows the scope of the updates, so only the input (the part that actually changed) re-renders on keypress.

---

## 🏁 Key Learnings for Performance
- **Start fast, stay fast:** Profile interactions (scroll, click, type), not just TTI.
- **Use `React.PureComponent`** and **Reselect** liberally for referential stability.
- **Avoid object/function literals** in the `render` path of pure components.
- **Instance variables** over `state` for non-render data.
- **De-prioritize invisible UI:** Don't render what you can't see yet.
- **Loop:** Profile → Fix → Profile again to verify impact.
