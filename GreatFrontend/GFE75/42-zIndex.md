# `z-index` and Stacking Context

## What is `z-index`?
The `z-index` property in CSS controls the vertical stacking order of overlapping elements.

- **Requirement**: `z-index` only affects **positioned elements** (elements with `position` set to `relative`, `absolute`, `fixed`, or `sticky`), or `flex`/`grid` items.
- **Default Order**: Without `z-index`, elements stack in the order they appear in the DOM (the last element in the code appears on top). Positioned elements always appear on top of default `static` elements, regardless of hierarchy.

## What is a Stacking Context?
A stacking context is a self-contained environment where child elements are layered relative to their parent, **not** the document root.

- **Isolation**: Elements outside a local stacking context cannot sandwich themselves between layers inside it. 
  - *Example*: If Element B sits visually on top of Element A, a child of Element A (Element C) can **never** break out and appear higher than Element B—even if Element C has a massive `z-index` like `99999`. 
- **Self-Containment**: Once a stacking context finishes sorting out its inner child layers, the **entire element** acts as a single block within the parent's larger stacking context.

## How is a Stacking Context Formed?
A new stacking context is triggered by several CSS properties on an element. Common examples include:

- `opacity` less than `1` (e.g., `0.99`)
- `transform` that is not `none`
- `filter` that is not `none`
- Positioned elements (`absolute` or `relative`) coupled with a `z-index` other than `auto`
- Elements with `position: fixed` or `position: sticky`
- Flex or Grid children with a `z-index` other than `auto`

## Example: The Stacking Context Trap
Even if a child element has a high `z-index`, it is bounded by its parent's stacking context.

```html
<div class="parent-1"> <!-- Creates Stacking Context 1 -->
  <div class="child-a">I have z-index: 9999</div>
</div>

<div class="parent-2"> <!-- Creates Stacking Context 2 -->
  <div class="child-b">I have z-index: 1</div>
</div>
```

```css
.parent-1 {
  position: relative;
  z-index: 1; /* Creates a stacking context */
}
.child-a {
  position: absolute;
  z-index: 9999;
}

.parent-2 {
  position: relative;
  z-index: 2; /* Creates a stacking context */
}
.child-b {
  position: absolute;
  z-index: 1;
}
```

**Result**: `.child-b` will render **on top of** `.child-a`.
Why? Because `.parent-2` has a higher `z-index` (2) than `.parent-1` (1). The astronomical `z-index: 9999` of `.child-a` only matters *inside* `.parent-1`. As far as the rest of the page is concerned, everything inside `.parent-1` is just part of layer 1.
