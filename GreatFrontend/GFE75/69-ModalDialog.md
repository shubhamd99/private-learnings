# 69. Modal (Dialog) Component Design

A modal component displays content in a window overlaying the page, requiring deep focus, accessibility, and robust layout management.

## 🏗️ Architecture & Component Composition
A **Compound Component** pattern is ideal for flexibility and clean API usage.

| Component | Role |
| :--- | :--- |
| **Modal (Root)** | Handles open/closed state, portal rendering, and context provider. |
| **Modal.Overlay** | Dims the background; handles backdrop click to close. |
| **Modal.Header** | Displays title and optional close button. |
| **Modal.Body** | Main content area (usually scrollable if content exceeds `maxHeight`). |
| **Modal.Footer** | Action shelf for buttons (Cancel, Confirm). |

---

## ⚙️ API Design (Props)

### Modal (Root)
- `isOpen: boolean`: Controlled state.
- `onClose: () => void`: Callback for closing via backdrop, "Esc", or close button.
- `maxHeight: string | number`: (Default: `80vh`) Prevents modal from leaving viewport.
- `width: string | number`: (Default: `600px`).
- `as: string | Component`: To change root element (e.g., `section`).

### Sub-components
- `className`: Generic prop for custom styling via Tailwind or CSS.
- `children`: Standard React children.

---

## 🛠️ Technical Implementation Details

### 1. Breaking out of DOM Hierarchy (Portals)
Modals must be rendered via **React Portals** (typically appended to `document.body`) to avoid `overflow: hidden` or `z-index` stacking context issues from parent components.

### 2. Layout & Centering
- **Overlay**: `position: fixed`, `top/left/right/bottom: 0`, and `z-index: high`.
- **Centering**: Use `display: flex; justify-content: center; align-items: center;` on the overlay container.
- **Scroll Lock**: When `isOpen`, add `overflow: hidden;` to `document.body` to prevent background scrolling.

### 3. Rendering Strategy
- **On-demand Rendering**: Only mount the modal when `isOpen` is true. This keeps the DOM clean and improves initial page load performance.

---

## ♿ Accessibility (a11y) — *Critical for Interviews*

| Requirement | Implementation |
| :--- | :--- |
| **Roles/Attrs** | `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby` |
| **Focus Trapping** | Use a library (e.g., `react-focus-lock`) or manually handle `Tab`/`Shift+Tab` to loop focus between first and last focusable elements. |
| **Initial Focus** | Automatically focus the first focusable element (or the close button) when opened. |
| **Restore Focus** | Store the `document.activeElement` before opening and return focus to it on close. |
| **Keyboard** | `Esc` key must trigger `onClose`. |

---

## 🌎 Additional Considerations

### 1. Internationalization (i18n)
- **RTL Support**: Flip the close button position and title alignment for Right-to-Left languages. Use CSS logical properties (e.g., `margin-inline-start`) instead of `left`/`right`.
- **Text Truncation**: Ensure long titles or footer labels don't break the layout; use `text-overflow: ellipsis`.

### 2. Browser Native `<dialog>` Element
- Support exists but manually handling **Focus Trapping** and **Portal-like behavior** (breaking out of stacking contexts) is still often easier with custom React components and React Portals.
- Native `<dialog>.showModal()` handles some backdrop/focus logic automatically but styling the backdrop `::backdrop` is sometimes limited in older browsers.

---

## ✨ Quality & Performance (UX)

- **Animations**: 
  - Backdrop: Fade-in.
  - Content: Scale-up or Slide-up (independent of backdrop for premium feel).
  - *Challenge*: Handles exit transitions carefully (DOM shouldn't unmount before animation ends).
- **Responsive Design**: 
  - On mobile, convert to a "Bottom Sheet" or set `width: 100%` and `maxHeight: 100%`.
- **Stacking Modals**:
  - Each new modal should have a darker backdrop or only show one at a time.
  - `Esc` or clicking away should only close the *topmost* modal.

## ✅ Definition of Done
- [ ] Accessible (Roles, ARIA, Focus Trap).
- [ ] Responsive (Phone, Tablet, Desktop).
- [ ] Animated (Smooth transitions).
- [ ] Portal-based (No clipping issues).
