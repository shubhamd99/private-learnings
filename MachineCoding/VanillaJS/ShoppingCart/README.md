# Vanilla JS Shopping Cart

A pure HTML, CSS, and Vanilla JS implementation of a Shopping Cart, intended for a 90-minute frontend machine coding round (e.g., Flipkart). 

It specifically avoids React and any third-party libraries to demonstrate core DOM manipulation, State Management, and Event Delegation.

## Key Concepts Demonstrated

1. **Event Delegation (Performance):**
   - Instead of running `document.querySelectorAll('.add-to-cart-btn')` and attaching individual event listeners (which causes memory leaks and is a major interview anti-pattern), a *single* event listener is attached to the parent `#product-list` container.
   - We use `e.target.classList.contains(...)` to identify what was clicked. The same concept is applied to the Cart's +/- buttons.

2. **State-Driven UI (Architecture):**
   - Even without React, the UI rendering is decoupled from state mutators. We mutate the `cart` array (`addToCart`, `updateQuantity`) and then call a single `updateCartUI()` function.
   - `updateCartUI()` calculates the totals and re-renders the DOM, ensuring the DOM and underlying JS objects never drift out of sync.

3. **Data Persistence:**
   - The `cart` state is saved to `localStorage` every time `updateCartUI()` runs. On page load, it initializes from `localStorage` (`JSON.parse(localStorage.getItem('cart')) || []`).

4. **Responsive CSS:**
   - Uses CSS Grid for the product listing (auto-flowing gracefully on mobile) and a clean, responsive bottom section for the cart layout.

## Running Locally
Simply open `index.html` in your browser. No build steps, no NPM installs.
