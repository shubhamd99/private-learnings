# Event Bubbling & Event Delegation

## What is Event Bubbling?
**Event bubbling** is a DOM event propagation mechanism where an event (like a click) first triggers on the target element and then propagates (bubbles) upward through its ancestors in the DOM tree, all the way to the document root. 
- *Note:* Before the bubbling phase, there is an **event capturing** phase, where the event travels down from the root to the target element.

### Example
If you have a `<button id="child">` inside a `<div id="parent">`, clicking the button triggers the button's click handler first, followed by the parent div's click handler.

```javascript
parent.addEventListener('click', () => console.log('Parent clicked'));
child.addEventListener('click', () => console.log('Child clicked'));

// Clicking the child logs:
// "Child clicked"
// "Parent clicked"
```

---

## Stopping Event Bubbling
You can prevent an event from bubbling further up the DOM tree by using `event.stopPropagation()`.

```javascript
child.addEventListener('click', (event) => {
  console.log('Child clicked');
  event.stopPropagation(); // Stops parent handlers from firing
});
```

---

## Event Delegation
**Event delegation** is a powerful technique that relies on event bubbling. Instead of attaching separate event listeners to multiple child elements (like list items), you attach a **single listener to a common ancestor**.

You then use `event.target` inside the handler to determine exactly which child element triggered the event.

### Example: Dynamic Lists
Instead of binding an event to every "Buy" button, bind it once to the parent `<ul id="product-list">`:

```javascript
const productList = document.getElementById('product-list');

productList.addEventListener('click', (event) => {
  // Check if the clicked element is a button
  if (event.target.tagName.toLowerCase() === 'button') {
    console.log('Buy button clicked for item:', event.target.id);
  }
});
```

### Benefits of Event Delegation
1. **Cleaner Code:** Reduces the number of event listeners, improving readability and maintainability.
2. **Enhanced Performance:** Lower memory usage and overhead since fewer listeners are created.
3. **Flexibility (Dynamic Elements):** Dynamically added child elements are automatically handled without needing to bind new listeners.

### Pitfalls to Avoid
- **Accidental Handling:** Ancestors might unintentionally catch events. Always verify the source using `event.target`.
- **Execution Order:** Remember that events bubble up sequentially based on the DOM hierarchy.
- **Over-delegation:** Attaching a listener unnecessarily high in the DOM (like `document.body`) can capture too many unrelated events and cause performance or logical issues.

---

## Common Practical Use Cases
1. **Large Lists/Tables:** Handling clicks on individual rows or items using a single listener on the parent container.
2. **Dropdown Menus:** A single listener on the dropdown wrapper to close the menu if the user clicks anywhere outside the trigger button.
3. **Accordion Menus:** Attaching a listener to the accordion container to toggle visibility whenever any child header is clicked.
