# CSS Box Model

The CSS box model describes the rectangular boxes generated for elements in a document. It determines how much space elements take up, their dimensions, and how their margins/borders interact.

Every box consists of four areas (from inside out):
1. **Content:** The actual content (text, images).
2. **Padding:** White space surrounding the content.
3. **Border:** A line surrounding the padding.
4. **Margin:** The outermost white space spacing it apart from other elements.

## Box Model Rules

- **Default Sizing:** By default, paddings and borders are **not** part of the specified width/height.
- **Margins:** Margins dictate the external space a box takes up on the page but are **not** counted towards the actual size/dimensions of the box itself.
- **Height Calculation:** If not specified, height expands to fit the content.
- **Width Calculation:** If not specified, a block element expands to fit its parent's width (minus padding).
  - *Note:* Inline elements (like `span`) don't have default widths and won't expand. Some block elements (`table`, `input`) have inherent widths.

## The `box-sizing` Property

This property is crucial as it dictates how total width and height are calculated.

### 1. `box-sizing: content-box` (Default)
The specified `width` and `height` apply **only** to the content area.
- **Total Width** = `width` + padding + border.
- *Example:* `width: 100px`, `padding: 10px`, `border: 5px` -> Total space occupied is **130px**.

### 2. `box-sizing: border-box`
The specified `width` and `height` **include** the content, padding, and border.
- **Total Width** = `width` (content area shrinks to absorb padding and border).
- *Example:* `width: 100px`, `padding: 10px`, `border: 5px` -> Total space occupied is **100px** (actual content width becomes 70px).
- *Tip:* This is much more intuitive, which is why most CSS frameworks (Bootstrap, Tailwind) apply `* { box-sizing: border-box; }` globally.

## Border & Margin Behavior

- **Borders:** Do not collapse or overlap. Every border is rendered individually.
- **Margin Collapsing:** **Vertical** margins between adjacent block-level elements can collapse. When they do, only the larger margin of the two is applied. **Horizontal** margins never collapse.
