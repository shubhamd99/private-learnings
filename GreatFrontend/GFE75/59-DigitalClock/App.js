// Create a widget that renders the current time
// in HH:MM:SS format using a 7-segment digital display
// You are free to choose to use 12-hour or a 24-hour display.

// Each digit needs to be rendered by individual segments

// Update loop
// We need a timer to refresh the page and display the current time every second
// To create the timer, we can use a setInterval and kick off the update loop in a useEffect.

// Do remember to clear the timer upon unmounting of the component to prevent "setState on
// unmounted component" errors and memory leaks

// Store the JavaScript Date object as state as it contains all the data we need.

// For better reusability, these logic can be abstracted into a custom useCurrentDate hook.

// This part is exactly the same as the Analog Clock question.

// Rendering
// Now that we have access to the most updated Date in the Clock component
// we can render it. Firstly create two smaller components for the Digit and Separator

// Digit: renders numbers from 0-9 using the segment display
// We make use of two square <div>s and CSS borders to achieve the effect
// For each number, create a configuration of the borders that need to be shown
// and retrieve the configuration for that number

// Separator: renders the two circles that look like colons.

// To get the first digit of an hour/minute/second, we can divide by 10 and round it down
// To get the second digit, we do modulo 10 to leave only the value in the ones-place.

// Accessibility
// For a11y reasons, use a <time> element with datetime attribute set to the current time in 24-hour format
// so that screen readers can read this component. Otherwise the component will be ignored by screen readers
// Add the aria-hidden attribute to the internals of <time> since they are for presentation purposes and not useful to screen readers.

import Clock from "./Clock";

export default function App() {
  return (
    <div className="wrapper">
      <Clock />
    </div>
  );
}
