# Event Delegation

**Event delegation** is a JavaScript optimization pattern where a **single event listener** is attached to a common parent (ancestor) element to manage events for multiple child elements, rather than attaching individual listeners to each child.

## How It Works
1. **Event Bubbling**: When an event occurs on a child element, it "bubbles up" the DOM tree to the parent element.
2. **Intercept & Evaluate**: The listener on the parent intercepts the event.
3. **Identify Target**: Using `event.target`, the parent checks exactly which child element triggered the event and executes the appropriate logic.

## Key Benefits
- **Improved Performance & Memory**: Attaching one listener instead of hundreds significantly reduces memory usage and improves efficiency.
- **Dynamic Element Support**: Automatically handles events for child elements added or removed dynamically. No need to manually attach/detach listeners.
- **Simplified Code**: Centralizes event-handling logic into a single place, making it easier to maintain.

## Common Use Cases
- Handling clicks on dynamic lists or grids.
- Managing forms where you can listen for `input` changes on the `<form>` wrapper instead of individual `<input>` fields.

#### Example
```javascript
// Attach one listener to the parent <ul> instead of every <li>
document.getElementById('item-list').addEventListener('click', (event) => {
  // Check if the clicked target was an <li> element
  if (event.target.tagName === 'LI') {
    console.log(`Clicked on ${event.target.textContent}`);
  }
});
```

## Pitfalls & Limitations
- **Correct Target Handling**: You must carefully check `event.target` (e.g., matching tags or classes), as the event might originate from an unintended nested element (like an `<i>` or `<span>` inside a `<button>`).
- **Non-Bubbling Events**: Event delegation **only works for events that bubble**. You cannot delegate events like `focus`, `blur`, `scroll`, `mouseenter`, `mouseleave`, or `resize`.
- **Complex Logic Overhead**: If the parent handles many different types of children, the conditional logic inside the single event listener can become complex.

## Event Delegation in React
React implements event delegation out-of-the-box under the hood:
- Instead of attaching listeners to individual DOM nodes, React attaches a **single event listener** to the root DOM container.
- When an event occurs, React captures it, wraps it in a cross-browser consistent **Synthetic Event**, and internally dispatches it to the correct component. 
- This heavily optimizes performance, especially for large component trees.
