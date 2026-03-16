# Block vs Inline-Block vs Inline

Here is a simplified comparison of the `block`, `inline-block`, and `inline` CSS display properties:

| Feature | `block` | `inline-block` | `inline` |
| :--- | :--- | :--- | :--- |
| **Size/Width** | Fills parent container (100%) | Depends on content | Depends on content |
| **Positioning** | Starts on a new line. Pushes other elements down. | Flows alongside other content. | Flows alongside other content. |
| **Custom Width/Height**| Respected | Respected | Ignored |
| **`vertical-align`**| No | Yes | Yes |
| **Margins & Paddings**| All sides are respected. | All sides are respected. | Horizontal works. Vertical works visually but doesn't affect surrounding element layouts. |
| **When Floated** | N/A | N/A | Becomes like a `block` element (margins/paddings affect layout). |
| **Use Cases / Tags** | Layout structure: `<div>`, `<p>`, `<section>` | UI Components: `<button>`, `<img>`, `<input>` | Text styling: `<a>`, `<span>`, `<strong>`, `<em>` |

---

## 🔑 Key Takeaways

1. **`block`**: Intended for macro-layout. Takes up the full width available and always forces a line break. Fully responsive to width, height, margins, and padding.
2. **`inline`**: Intended for text or micro-elements within a flow. It flows seamlessly with text. You cannot explicitly set its width or height, and vertical spacing won't displace neighboring elements.
3. **`inline-block`**: The hybrid approach. It flows inline with text but acts like a block internally, allowing you to explicitly set its width, height, margins, and paddings.
