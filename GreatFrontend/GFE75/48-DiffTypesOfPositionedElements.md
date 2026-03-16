# CSS Positioning

A **positioned element** is an element whose computed `position` property is either `relative`, `absolute`, `fixed`, or `sticky`. (Note: `static` is not considered a "positioned element").

## Types of Positioning

- **`static` (Default)**
  - Element flows into the page normally.
  - `top`, `right`, `bottom`, `left`, and `z-index` properties **do not apply**.

- **`relative`**
  - Positioned relative to its **normal position** (itself).
  - **Does not affect layout**; it keeps its original space in the document (leaves a gap where it would have been).
  - Can be shifted using `top`, `right`, `bottom`, `left`.

- **`absolute`**
  - **Removed** from the normal document flow (does not leave a gap).
  - Positioned relative to its **closest positioned ancestor** (or the initial containing block if none exists).
  - Does not affect the position of other elements.

- **`fixed`**
  - **Removed** from the normal document flow.
  - Positioned relative to the **viewport** (browser window).
  - **Does not move** when the page is scrolled.

- **`sticky`**
  - A hybrid between `relative` and `fixed`.
  - Acts as `relative` until the element crosses a specified viewport threshold (e.g., `top: 0`), at which point it becomes `fixed`.
