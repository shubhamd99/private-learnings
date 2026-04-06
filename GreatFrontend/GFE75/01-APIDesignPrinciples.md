# UI Component API Design

Designing a good component API means making it easy to use in simple cases, while still allowing customization for complex ones.

---

## 1. How to Initialize a Component

### Vanilla JavaScript
Pass in the DOM element to mount into, plus an options object for configuration.
```javascript
function Slider(rootEl, options = {}) {
  // save rootEl and options
  // set up internal state
  // render HTML into rootEl
}

const slider = new Slider(document.querySelector('#app'), { min: 0, max: 100 });
```

### React
Use props. React handles mounting — you just define what the component needs.
```javascript
function Slider({ min = 0, max = 100, value, onChange }) {
  return <div className="slider">...</div>;
}
```

---

## 2. Letting Users Customize Appearance

There are several ways to let developers style your component. Each has trade-offs.

### className prop
Let users pass in their own CSS class.
```jsx
<Slider className="my-slider" />
```
- **Problem:** If your base styles and their styles have the same CSS specificity, the order stylesheets load in determines which wins — unpredictable.
- **Fix:** Use `clsx` or `tailwind-merge` to merge classes safely, or use CSS variables instead.

### Stable CSS Hooks (data attributes)
Expose predictable class names or `data-*` attributes that users can target in their own CSS.
```html
<div data-slider-track> ... </div>
```
```css
[data-slider-track] { background: blue; }
```
- These are part of your public API — document them and don't remove them without a major version bump.

### Theme Object prop
Accept a `theme` prop with style values.
```jsx
<Slider theme={{ trackColor: 'blue', thumbSize: '20px' }} />
```
- Avoids specificity issues (applied as inline styles or CSS variables).
- Can get messy if you have too many style options.

### CSS Custom Properties (Variables) — Recommended
Define CSS variables with defaults inside the component. Users can override them globally or per-instance.
```css
.slider-track {
  background-color: var(--slider-track-color, #ccc);
}
```
```css
/* User overrides just this instance */
#my-slider { --slider-track-color: blue; }
```
- Clean separation between component styles and user customization.
- No JavaScript needed.

### Render Props — For Complex Customization
Let users control how a specific part of the component renders by passing a function.
```jsx
<Slider renderLabel={(value) => <strong>Selected: {value}</strong>} />
```
- Good when the user needs full control over a sub-element's markup.

---

## 3. Internationalization (i18n) & Accessibility

### Never hardcode text strings
Any user-visible text should be a prop so it can be translated or customized.
```jsx
// Bad
<button>Previous</button>

// Good
<button aria-label={prevButtonLabel}>...</button>
```

### Support Right-to-Left (RTL) languages
Languages like Arabic and Hebrew read right-to-left. Your layout needs to flip.
- Accept a `direction="rtl"` prop, or read it from a context/provider.
- Use **CSS Logical Properties** so styles adapt automatically:
```css
/* Instead of padding-left */
padding-inline-start: 16px;  /* works for both LTR and RTL */
```

---

## 4. Key Interview Points

| Principle | What it means |
|---|---|
| **Separation of Concerns** | Keep business logic (data fetching, state) out of the UI component. Use hooks or store actions. |
| **Headless Components** | Provide only logic/state with no UI — let consumers render whatever markup they want. Maximum reusability. |
| **Compound Components** | Pattern like `<Menu>` + `<Menu.Item>`. Users compose their own layout while still sharing internal state. |
| **Controlled vs Uncontrolled** | Controlled = parent manages state via props. Uncontrolled = component manages its own state internally. Always support both. |
| **Sensible Defaults** | Component should work out of the box with zero config, but allow full customization when needed. |
