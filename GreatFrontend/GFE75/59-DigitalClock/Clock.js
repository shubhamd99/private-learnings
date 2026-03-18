import { useEffect, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// SEGMENT DISPLAY TRICK
// Each digit on a real 7-segment display has segments: top, top-left,
// top-right, middle, bottom-left, bottom-right, bottom.
//
// Here we simulate it with just TWO <div>s stacked on top of each other.
// Each <div> is a square, and we selectively colour its CSS borders.
//
//   ┌──────┐  ← div.digit-square-top  (border-top, border-left, border-right, border-bottom act as segments)
//   │      │
//   ├──────┤  ← "middle" is the shared bottom/top border between the two divs
//   │      │
//   └──────┘  ← div.digit-square-bottom
//
// A visible border = a lit segment. Transparent border = a dark/off segment.
// ─────────────────────────────────────────────────────────────────────────────

// These four CSS class names each light up one side of a square's border.
const ALL_SIDES = [
  "digit-square-border-top",
  "digit-square-border-left",
  "digit-square-border-right",
  "digit-square-border-bottom",
];

// 0: top[T,L,R]      bottom[B,L,R]   // open middle
// 1: top[R]          bottom[R]        // just right sides
// 8: top[ALL]        bottom[ALL]      // everything on

// ─────────────────────────────────────────────────────────────────────────────
// MAP: digit (0-9) → which border-sides must be visible in each half-square
// "top" = classes for the upper <div>
// "bottom" = classes for the lower <div>
// ─────────────────────────────────────────────────────────────────────────────
const NUMBER_TO_CLASSES = {
  0: {
    top: [
      "digit-square-border-top",
      "digit-square-border-left",
      "digit-square-border-right",
    ],
    bottom: [
      "digit-square-border-bottom",
      "digit-square-border-left",
      "digit-square-border-right",
    ],
  },
  1: {
    // Only the right side is lit — vertical stroke on the right
    top: ["digit-square-border-right"],
    bottom: ["digit-square-border-right"],
  },
  2: {
    top: [
      "digit-square-border-top",
      "digit-square-border-right",
      "digit-square-border-bottom", // bottom of top-half = middle bar
    ],
    bottom: [
      "digit-square-border-top",    // top of bottom-half = middle bar (same physical line)
      "digit-square-border-left",
      "digit-square-border-bottom",
    ],
  },
  3: {
    top: [
      "digit-square-border-top",
      "digit-square-border-right",
      "digit-square-border-bottom",
    ],
    bottom: [
      "digit-square-border-top",
      "digit-square-border-right",
      "digit-square-border-bottom",
    ],
  },
  4: {
    top: [
      "digit-square-border-left",
      "digit-square-border-right",
      "digit-square-border-bottom", // middle bar
    ],
    bottom: ["digit-square-border-right", "digit-square-border-top"],
  },
  5: {
    top: [
      "digit-square-border-top",
      "digit-square-border-left",
      "digit-square-border-bottom",
    ],
    bottom: [
      "digit-square-border-top",
      "digit-square-border-right",
      "digit-square-border-bottom",
    ],
  },
  6: {
    top: [
      "digit-square-border-top",
      "digit-square-border-left",
      "digit-square-border-bottom",
    ],
    bottom: ALL_SIDES, // bottom half is fully lit (left, right, bottom + middle bar)
  },
  7: {
    top: ["digit-square-border-top", "digit-square-border-right"],
    bottom: ["digit-square-border-right"],
  },
  8: {
    // All borders on both halves = every segment lit
    top: ALL_SIDES,
    bottom: ALL_SIDES,
  },
  9: {
    top: ALL_SIDES,
    bottom: [
      "digit-square-border-top",
      "digit-square-border-right",
      "digit-square-border-bottom",
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Digit component
// Receives a single-digit number (0-9) and renders it using two border-boxes.
// We spread the active side-classes onto each <div> to colour its borders.
// ─────────────────────────────────────────────────────────────────────────────
function Digit({ number }) {
  const { top, bottom } = NUMBER_TO_CLASSES[number];

  return (
    <div>
      {/* Upper half — base classes + top-half modifier + active border classes */}
      <div className={["digit-square", "digit-square-top", ...top].join(" ")} />
      {/* Lower half — base classes + bottom-half modifier + active border classes */}
      <div
        className={["digit-square", "digit-square-bottom", ...bottom].join(" ")}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Separator component
// Renders the two dots ":" between hours, minutes, and seconds.
// ─────────────────────────────────────────────────────────────────────────────
function Separator() {
  return (
    <div className="separator">
      <div className="separator-dot" />
      <div className="separator-dot" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Custom hook: useCurrentDate
// Keeps a `Date` object in state and refreshes it every 100 ms via setInterval.
// 100 ms (vs 1000 ms) ensures the display updates near-instantly when a second
// rolls over, avoiding a visible 1-second lag at the start.
// The cleanup function clears the interval when the component unmounts,
// preventing memory leaks / "setState on unmounted component" warnings.
// ─────────────────────────────────────────────────────────────────────────────
function useCurrentDate() {
  const [date, setDate] = useState(new Date());

  // Kick off the timer.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setDate(new Date()); // create a fresh Date on every tick
    }, 100);

    // Clear the timer upon unmount.
    return () => {
      window.clearInterval(timer);
    };
  }, []); // empty deps → run once on mount

  return date;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper: padTwoDigit
// Ensures single-digit numbers are displayed as "09" instead of "9".
// e.g. 9 → "09",  12 → "12"
// ─────────────────────────────────────────────────────────────────────────────
function padTwoDigit(number) {
  return number >= 10 ? String(number) : `0${number}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Clock component (default export)
// Orchestrates the full clock UI.
//   - Reads live time via useCurrentDate()
//   - Converts 24-hour to 12-hour format
//   - Splits each time unit into two individual digits (tens + ones)
//     e.g. minutes=37 → Digit(3) + Digit(7)
//   - Wraps everything in a <time> element for screen-reader accessibility
// ─────────────────────────────────────────────────────────────────────────────
export default function Clock() {
  const date = useCurrentDate();

  // Convert to 12-hour format: getHours() gives 0-23
  // `% 12` brings it to 0-11; replace 0 with 12 (midnight/noon edge case)
  let hours = date.getHours() % 12;
  hours = hours === 0 ? 12 : hours;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Build the machine-readable datetime string in 24-hour format.
  // This goes into the HTML <time datetime="..."> attribute for accessibility.
  const dateTimeDisplay = `${padTwoDigit(
    date.getHours(),
  )}:${padTwoDigit(minutes)}:${padTwoDigit(seconds)}`;

  // Use a <time> element with `datetime` attribute set
  // to the current time in 24-hour format so that
  // screen readers can read this component.
  return (
    <time className="clock" dateTime={dateTimeDisplay}>
      {/* Hours — split into tens digit and ones digit */}
      <Digit number={parseInt(hours / 10, 10)} /> {/* e.g. 1 from "12" */}
      <Digit number={hours % 10} />               {/* e.g. 2 from "12" */}
      <Separator />
      {/* Minutes */}
      <Digit number={parseInt(minutes / 10, 10)} />
      <Digit number={minutes % 10} />
      <Separator />
      {/* Seconds */}
      <Digit number={parseInt(seconds / 10, 10)} />
      <Digit number={seconds % 10} />
    </time>
  );
}
