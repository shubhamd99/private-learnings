# UI Component API Design Best Practices

Designing intuitive and robust component APIs is a core skill for Frontend Engineers. A great API simplifies common tasks while remaining flexible enough for advanced customization.

## 1. Initialization Patterns

### 🔹 Vanilla JavaScript
The standard pattern for vanilla JS involves a function (constructor) taking a root element and a configuration object.
```javascript
function Slider(rootEl, options = {}) {
  // 1. Store references to the root and options
  // 2. Initialize internal state
  // 3. Render initial markup into rootEl
}
```

### 🔹 React
React components receive customization via **props**. Logic and presentation are encapsulated, and the mounting process is handled by a separate API (e.g., `createRoot`).
```javascript
function Slider({ min = 0, max = 100, value, onChange }) {
  return <div className="slider">...</div>;
}
```

---

## 2. Appearance & Styling Customization

### 🔹 Class Injection
Allowing developers to pass custom classes via props like `className`.
- **Pros**: Simple to use.
- **Cons**: **Non-deterministic results**. If base styles and custom styles share the same specificity, the winner depends on stylesheet loading order.
- **Solution**: Use `clsx` or `tailwind-merge` to resolve conflicts, or rely on CSS Variables.

### 🔹 CSS Selector Hooks
Provide stable, published classes or data-attributes (e.g., `[data-gfe-slider-track]`) for developers to target in their CSS.
- **Guarantee**: These selectors are part of the public API and won't change without a major version bump.

### 🔹 Theme Objects
The component accepts an object of style properties.
- **Benefit**: Resolves specificity issues by using inline styles or mapped variables.
- **Drawback**: Can lead to bloated props if not managed carefully.

### 🔹 CSS Custom Properties (Variables)
Expose variables (e.g., `--slider-color`) that fallback to defaults.
```css
.slider-track {
  background-color: var(--slider-color, #ccc);
}
```
*Tip: This is often the cleanest way to allow global/per-instance styling without JavaScript glue.*

### 🔹 Render Props & Composition
For complex components, allow the user to control the rendering of specific sub-parts by passing a function.
```javascript
<Slider renderLabel={(value) => <span>Current: {value}</span>} />
```

---

## 3. Internationalization (i18n) & Accessibility

### 🔹 Flexible Labels
**NEVER** hardcode user-facing strings. Pass them as props (e.g., `aria-label`, `prevButtonLabel`) to allow translators and accessibility tools to work correctly.

### 🔹 Right-to-Left (RTL) Support
Support languages like Arabic or Hebrew by flipping the layout.
- Use a `direction` prop or inherit from a provider.
- **Best Practice**: Use **CSS Logical Properties** (e.g., `padding-inline-start` instead of `padding-left`) to ensure styles automatically adapt to writing modes.

---

## 4. Key Takeaways for Interviews
1. **Separation of Concerns**: Keep business logic out of the UI; use hooks or store actions for state.
2. **Headless Pattern**: Favor logic-only components for maximum reusability.
3. **Compound Components**: Use patterns like `Menu` and `Menu.Item` to allow users to build their own layouts while sharing state.
