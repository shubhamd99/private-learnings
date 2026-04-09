# Event Bubbling & Event Delegation

## What is Event Bubbling?

**Event bubbling** is a DOM event propagation mechanism where an event (like a click) first triggers on the target element and then propagates (bubbles) upward through its ancestors in the DOM tree, all the way to the document root.

- _Note:_ Before the bubbling phase, there is an **event capturing** phase, where the event travels down from the root to the target element.

---

## Event Capturing (Capture Phase)

**Event capturing** is the first phase of DOM event propagation. The event starts at the `document` root and travels **down** through ancestors until it reaches the target element. It is the opposite of bubbling.

By default, `addEventListener` listens in the **bubbling phase**. To listen during the capture phase, pass `{ capture: true }` (or `true`) as the third argument.

### Full propagation order

```
document
  └── html
        └── body
              └── div#parent      ← capture fires here (top-down)
                    └── button#child  ← target (both phases meet here)
                              ↑
                    div#parent      ← bubble fires here (bottom-up)
```

### Example

```javascript
const parent = document.getElementById("parent");
const child = document.getElementById("child");

// capture phase — fires top-down BEFORE the target
parent.addEventListener("click", () => console.log("Parent CAPTURE"), true);

// bubble phase (default) — fires bottom-up AFTER the target
parent.addEventListener("click", () => console.log("Parent BUBBLE"));
child.addEventListener("click", () => console.log("Child clicked"));

// Clicking the child logs:
// "Parent CAPTURE"   ← capture fires first (down from root)
// "Child clicked"    ← target
// "Parent BUBBLE"    ← bubble fires last (up to root)
```

### When to use capturing

- Intercepting events **before** they reach the target (e.g. logging, access control)
- Handling events that **don't bubble** (e.g. `focus`, `blur`) — use `focusin`/`focusout` instead, or capture phase
- `event.stopPropagation()` in a capture listener prevents the event from reaching the target entirely

### Example

If you have a `<button id="child">` inside a `<div id="parent">`, clicking the button triggers the button's click handler first, followed by the parent div's click handler.

```javascript
parent.addEventListener("click", () => console.log("Parent clicked"));
child.addEventListener("click", () => console.log("Child clicked"));

// Clicking the child logs:
// "Child clicked"
// "Parent clicked"
```

---

## Stopping Event Bubbling

You can prevent an event from bubbling further up the DOM tree by using `event.stopPropagation()`.

```javascript
child.addEventListener("click", (event) => {
  console.log("Child clicked");
  event.stopPropagation(); // Stops parent handlers from firing
});
```

## The actual question — why we use it less now stopPropagation()

- React attaches a single event listener at the root, not on individual DOM nodes. So even if you call e.stopPropagation(), it only stops propagation within React's synthetic event system, not necessarily the native DOM tree.
- State-driven UI reduces the need
  In the past you stopped bubbling to prevent a parent from reacting to a child click. In React, you control this through state and conditional logic instead:
