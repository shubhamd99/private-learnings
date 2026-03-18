// Build an app where clicking the "Add" button adds progress bars to the page.
// The progress bars fill up gradually as soon as they are shown.

// Requirements
// Clicking on the "Add" button adds a progress bar to the page.
// Each progress bar start filling up smoothly as soon as they're added
// Each bar takes approximately 2000ms to completely fill up.

// Build an app where clicking the "Add" button adds progress bars to the page.
// The progress bars fill up gradually as soon as they are shown.

// Requirements
// Clicking on the "Add" button adds a progress bar to the page.
// Each progress bar start filling up smoothly as soon as they're added
// Each bar takes approximately 2000ms to completely fill up.

import { useEffect, useState } from "react";

const ProgressBar = () => {
  const [startTransition, setStartTransition] = useState(false);

  // Start transition after first render and never
  // apply this effect ever again.
  useEffect(() => {
    if (startTransition) {
      return;
    }

    setStartTransition(true);
  });

  return (
    <div className="bar">
      <div
        className={["bar-contents", startTransition && "bar-contents--filled"]
          .filter(Boolean)
          .join(" ")}
      />
    </div>
  );
};

export default function App() {
  const [bars, setBars] = useState(0);

  return (
    <div className="wrapper">
      <div>
        <button
          onClick={() => {
            setBars(bars + 1);
          }}
        >
          Add
        </button>
        <div className="bars">
          {Array(bars)
            .fill(null)
            .map((_, index) => {
              return <ProgressBar key={index} />;
            })}
        </div>
      </div>
    </div>
  );
}
