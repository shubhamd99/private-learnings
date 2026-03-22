# System Design: Image Carousel Component

Design an image carousel that displays images one at a time with horizontal transitions, pagination (dots), and infinite looping navigation.

## 1. Requirements Exploration
- **Images:** Configuration-driven list (URL + Alt text).
- **Responsive:** Supports Desktop, Tablet, and Mobile.
- **Navigation:** Prev/Next buttons (infinite cycle) + Progress dots (jump to index).
- **Animation:** Horizontal translation between slides.

## 2. Architecture & High-Level Design
Since the component is client-side only, a **Flux/Reducer** architecture is recommended to centralize state transitions (timer, clicks, keyboard events).

### Component Responsibilities:
- **ViewModel/Store:** Processes clicks/timers; manages current index state.
- **Image:** Renders the currently selected image using `object-fit`.
- **Navigation (Prev/Next):** Buttons to trigger state changes.
- **Progress Dots:** Visual indicator and clickable "jump" points.

## 3. Data Model & API Design

### State:
- `currentIndex`: Tracks the active image.

### Basic API (Props):
| Prop | Type | Description |
| :--- | :--- | :--- |
| `images` | `Array<Object>` | `{ src: string, alt?: string }[]` |
| `transitionDuration` | `number` | Animation speed (ms). |
| `width / height` | `px / %` | Dimensions of the container. |

### Advanced API:
- **Autoplay:** `boolean` + `interval` (ms).
- **Loop:** `boolean` (Default: true).
- **Callbacks:** `onPageSelect`, `onNextClick`, `onLoad`.

---

## 4. Implementation Details

### Layout (Flexbox Strategy)
Use `display: flex` on a container to align images horizontally.
```css
.carousel-images {
  display: flex;
  overflow: hidden; /* Hide non-visible images */
  scroll-behavior: smooth;
}
.carousel-image {
  flex-shrink: 0;
  width: 100%;
  object-fit: cover; /* Ensures image fills container without distortion */
}
```

### Scrolling Logic
Use `scrollTo` for programmatic transitions:
```javascript
container.scrollTo({
  left: selectedIndex * containerWidth,
  behavior: 'smooth',
});
```

### Vertically Centering Buttons
```css
.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}
```

---

## 5. Performance & UX

### Optimization Techniques
- **Lazy Loading:** Use `<img loading="lazy">` for off-screen images.
- **Preloading:** Airbnb Strategy (Load next 1-3 images when user hovers or clicks 'Next').
- **Device Specifics:** Use `srcset` or `<picture>` for smaller mobile images.
- **Virtualization:** For 100+ images, render only current + neighbors in the DOM.

### User Experience (Mobile & Desktop)
- **Scroll Snapping:** Use CSS `scroll-snap-type: x mandatory` for native-feeling swipe on mobile.
- **Hit Areas:** Ensure buttons are at least `44x44px` for mobile accessibility.

---

### Accessibility (a11y) & i18n
- **Semantic HTML:** Use `<button>` for controls to ensure keyboard focus (`tabindex`).
- **i18n Support:** Allow customizable `aria-labels` (e.g., "Next Slide", "Previous Slide") so developers can translate them.
- **Keyboard Support:** Listen for `ArrowLeft` and `ArrowRight` when carousel is focused.
- **Alt Text:** Always include `alt` attributes for images or use empty string for decorative ones.
- **Mobile Touch:** Use CSS `scroll-snap-type` for native swipe-to-scroll feel.
