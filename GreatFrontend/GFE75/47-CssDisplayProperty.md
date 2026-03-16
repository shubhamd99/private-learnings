# CSS Display Property

The `display` property determines how an element is rendered in the document layout.

## Common Values

| Value              | Description                                                                                            |
| :----------------- | :----------------------------------------------------------------------------------------------------- |
| **`none`**         | Removes the element (and its children) from the document layout completely, as if it didn't exist.     |
| **`block`**        | Takes up the full width available, forcing a line break before and after the element.                  |
| **`inline`**       | Allows elements to sit side-by-side. Width and height properties have no effect.                       |
| **`inline-block`** | Sits side-by-side like `inline`, but allows you to safely set `width` and `height`.                    |
| **`flex`**         | Acts as a block-level flex container, enabling the flexbox layout model for its children.              |
| **`grid`**         | Acts as a block-level grid container, enabling a 2D grid layout system.                                |
| **`table`**        | Behaves like a standard HTML `<table>` element.                                                        |
| **`table-row`**    | Behaves like an HTML `<tr>` element.                                                                   |
| **`table-cell`**   | Behaves like an HTML `<td>` element.                                                                   |
| **`list-item`**    | Behaves like an HTML `<li>` element, which allows setting `list-style-type` and `list-style-position`. |

---

## Flexbox (`display: flex`)

Flexbox is a 1-dimensional (1D) layout model designed to distribute space along a single axis (either row or column).

**Key Container Properties:**

- `flex-direction`: Defines the main axis (`row`, `row-reverse`, `column`, `column-reverse`).
- `justify-content`: Aligns items along the **main axis** (e.g., `center`, `flex-start`, `space-between`, `space-evenly`).
- `align-items`: Aligns items along the **cross axis** (e.g., `center`, `flex-start`, `stretch`).
- `flex-wrap`: Controls whether items wrap onto multiple lines (`nowrap`, `wrap`).
- `gap`: Sets the spacing between items.

**Key Child (Item) Properties:**

- `flex-grow`: How much remaining space the item should take up.
- `flex-shrink`: How much an item should shrink if there is not enough space.
- `flex-basis`: The initial main size of the item before remaining space is distributed.
- `flex`: Shorthand for `flex-grow`, `flex-shrink`, and `flex-basis`.
- `align-self`: Overrides the container's `align-items` rule for a specific child.

---

## Grid (`display: grid`)

CSS Grid is a powerful 2-dimensional (2D) layout model designed for placing elements in both rows and columns simultaneously.

**Key Container Properties:**

- `grid-template-columns`: Defines the number and size of columns (e.g., `1fr 1fr 1fr` creates 3 equal-width columns).
- `grid-template-rows`: Defines the number and size of rows.
- `grid-template-areas`: A visual way to define the layout by naming track areas.
- `gap` / `row-gap` / `column-gap`: Spacing between rows and/or columns.
- `align-items` / `justify-items`: Aligns grid items within their specific individual cells.
- `align-content` / `justify-content`: Aligns the entire grid structure within the overall grid container.

**Key Child (Item) Properties:**

- `grid-column`: Shorthand for start and end column lines (e.g., `grid-column: 1 / 3` spans the first two columns).
- `grid-row`: Shorthand for start and end row lines.
- `grid-area`: Assigns an item to a named area defined by the container's `grid-template-areas`.

---

> **Reference:** For a complete list of values, refer to [CSS Display | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/display).
