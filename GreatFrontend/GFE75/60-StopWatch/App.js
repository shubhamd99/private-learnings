// Build a stopwatch widget which can measure how much time has passed.
// It shows the current timer and has two buttons underneath: "Start/Stop" and "Reset".

// Start/Stop Button: Starts/stops the timer depending on whether the timer is running.

// Reset: Resets the timer to 0 and stops the timer.

// The timer shows the number of seconds elapsed, down to the millisecond.

// Clicking on the timer should start/stop the timer.
// The Start/Stop button's label should update accordingly as well.

// It'd be a nice optional addition to format the time to display in hh:mm:ss:ms format.

import Stopwatch from "./Stopwatch";

export default function App() {
  return (
    <div className="wrapper">
      <Stopwatch />
    </div>
  );
}
