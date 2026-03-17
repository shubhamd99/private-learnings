import { useState } from "react";
import StarRating from "./StarRating";

// The widget accepts two parameters:
// the maximum number of stars and the number of currently filled stars.

// When a star is clicked, it is filled along with all the stars to its left.

// Hovering over a star fills that star and all stars to its left.

// The stars which need to be filled during hover take priority over existing filled state

// If the cursor leaves the widget and no new selection is made, the appropriate stars
// revert to the filled state before the hovering.

// Make the star rating widget reusable such that multiple instances
// can be rendered within the same page.

// The star icons, both empty and filled, are provided to you as SVGs.

// The Star Rating widget can be improved in the following ways:
// Allow the value to be part of a form submit event data by embedding an <input>.
// Add keyboard support for better a11y.
// Add RTL (right-to-left) support.

export default function App() {
  const [rating, setRating] = useState(0);

  return (
    <div>
      <StarRating max={5} value={rating} onChange={setRating} />
    </div>
  );
}
