# What does `* { box-sizing: border-box; }` do?

## What does `*` mean?
In CSS, `*` is the **universal selector**. It matches and applies the defined styles to **every single element** on the HTML page (like `<div>`, `<p>`, `<span>`, etc.). 

## How does `box-sizing: border-box` change things?
By default, HTML elements use `box-sizing: content-box`. This means any specified width or height only applies to the element's content. Any added padding or borders will increase the element's total size, which can break layouts.

`* { box-sizing: border-box; }` changes the box model for all elements to include padding and borders in the element's total width and height.

* **Total Height** = Content Height + Vertical Padding + Vertical Border Width
* **Total Width** = Content Width + Horizontal Padding + Horizontal Border Width

| Property | `content-box` (default) | `border-box` |
| :--- | :--- | :--- |
| **content** | Included | Included |
| **padding** | Excluded | Included |
| **border** | Excluded | Included |
| **margin** | Excluded | Excluded |

## What are its advantages?

* **Intuitive and Predictable Sizing:** It aligns better with how humans and designers naturally think about sizes. If you set a section to be 50% width, it stays exactly 50% no matter the padding or borders.
* **Easier Grid Layouts:** Prevents unexpected layout shifting and breaking without having to recalculate widths when adjusting padding or borders.
* **Industry Standard:** It's such a sensible and preferred default that almost all modern CSS frameworks (like Tailwind, Bootstrap) apply it universally.
