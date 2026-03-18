import { useRef, useState } from "react";

// ─── Time Constants ────────────────────────────────────────────────────────────
// Precomputing these avoids "magic numbers" in logic and makes intent explicit.
const MS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
// Total milliseconds in one hour: 60 min × 60 sec × 1000 ms
const MS_IN_HOUR = MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MS_IN_SECOND;
// Total milliseconds in one minute: 60 sec × 1000 ms
const MS_IN_MINUTE = SECONDS_IN_MINUTE * MS_IN_SECOND;

// ─── formatTime ────────────────────────────────────────────────────────────────
// Converts a raw millisecond duration into a structured { hours, minutes, seconds, ms } object.
// Uses sequential modulo arithmetic: extract the largest unit first, remainder flows down.
// Interview note: pure function (no side effects) → easy to unit-test independently.
function formatTime(timeParam) {
  // Work on a local copy so we don't mutate the argument.
  let time = timeParam;

  // Initialise all parts to 0; only update what the duration actually contains.
  const parts = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    ms: 0,
  };

  // Extract full hours from total ms.
  if (time > MS_IN_HOUR) {
    parts.hours = Math.floor(time / MS_IN_HOUR);
    time %= MS_IN_HOUR; // Keep only the remaining ms after removing hours.
  }

  // Extract full minutes from the remainder.
  if (time > MS_IN_MINUTE) {
    parts.minutes = Math.floor(time / MS_IN_MINUTE);
    time %= MS_IN_MINUTE; // Keep only the remaining ms after removing minutes.
  }

  // Extract full seconds from the remainder.
  if (time > MS_IN_SECOND) {
    parts.seconds = Math.floor(time / MS_IN_SECOND);
    time %= MS_IN_SECOND; // Keep only the sub-second milliseconds.
  }

  // Whatever is left is the raw millisecond component (<1000 ms).
  parts.ms = time;

  return parts;
}

// ─── padTwoDigit ───────────────────────────────────────────────────────────────
// Ensures single-digit numbers are displayed with a leading zero (e.g. 3 → "03").
// Interview note: ternary keeps it concise; template literal avoids string concat overhead.
function padTwoDigit(number) {
  return number >= 10 ? String(number) : `0${number}`;
}

// ─── Stopwatch Component ────────────────────────────────────────────────────────
// Key design decisions worth knowing for interviews:
//  1. useRef for lastTickTiming: refs persist across renders without causing re-renders.
//     Perfect for mutable values that are only "infrastructure" (timing bookkeeping).
//  2. useState for totalDuration: this IS display data, so it must live in state to
//     trigger re-renders whenever the elapsed time changes.
//  3. useState for timerId: storing the interval ID in state lets us derive isRunning
//     from a single source of truth and avoids ref vs. state inconsistency.
export default function Stopwatch() {
  // useRef stores the timestamp of the last interval tick.
  // Why useRef and NOT useState?
  //   → We don't want updating lastTickTiming to trigger a re-render.
  //   → We only read it inside the setInterval callback, not in JSX.
  const lastTickTiming = useRef(null);

  // Total elapsed time in milliseconds, used to compute the displayed time.
  const [totalDuration, setTotalDuration] = useState(0);

  // Timer ID of the active interval, if one is running.
  // null  → timer is stopped.
  // number → timer is running (ID returned by window.setInterval).
  const [timerId, setTimerId] = useState(null);

  // Derived boolean: avoids duplicating "timerId != null" logic throughout the component.
  // Interview note: prefer derived state over extra state variables to keep state minimal.
  const isRunning = timerId != null;

  // ── startTimer ──────────────────────────────────────────────────────────────
  // Records the current timestamp as the baseline for the first tick,
  // then starts a high-frequency interval (~1 ms) to accumulate elapsed time.
  function startTimer() {
    // Snapshot "now" so the first interval tick can compute the correct delta.
    lastTickTiming.current = Date.now();

    setTimerId(
      window.setInterval(() => {
        const now = Date.now();
        // Delta since the last tick — real elapsed time regardless of JS event-loop delays.
        // Interview note: using deltas (now - lastTick) is more accurate than trusting the
        // interval period, because setInterval is NOT guaranteed to fire exactly on time.
        const timePassed = now - lastTickTiming.current;

        setTotalDuration(
          (duration) =>
            // Functional update form: guarantees we read the LATEST state value.
            // Avoids stale-closure bugs that arise when reading state directly
            // inside an interval callback.
            duration + timePassed,
        );

        // Advance the baseline so the next tick measures only its own delta.
        lastTickTiming.current = now;
      }, 1), // Interval of 1 ms gives centisecond resolution after dividing ms/10.
    );
  }

  // ── stopInterval ────────────────────────────────────────────────────────────
  // Clears the running interval and resets the timerId to null (→ isRunning = false).
  function stopInterval() {
    window.clearInterval(timerId);
    setTimerId(null);
  }

  // ── resetTimer ──────────────────────────────────────────────────────────────
  // Stops the timer AND resets the elapsed duration back to zero.
  // Reuses stopInterval() to avoid duplicating the clearInterval logic.
  function resetTimer() {
    stopInterval();
    setTotalDuration(0);
  }

  // ── toggleTimer ─────────────────────────────────────────────────────────────
  // Single entry point for the start/stop button: delegates to the appropriate handler
  // based on the current running state.
  function toggleTimer() {
    if (isRunning) {
      stopInterval();
    } else {
      startTimer();
    }
  }

  // Compute the broken-down time object once per render for use in JSX.
  const formattedTime = formatTime(totalDuration);

  return (
    <div>
      {/*
        Clicking the time display itself also toggles the timer —
        a UX affordance that makes the large time area a convenient tap target.
      */}
      <button
        className="time"
        onClick={() => {
          toggleTimer();
        }}
      >
        {/* Hours — only rendered when the elapsed time reaches 1+ hours to avoid clutter. */}
        {formattedTime.hours > 0 && (
          <span>
            <span className="time-number">{formattedTime.hours}</span>
            <span className="time-unit">h</span>
          </span>
        )}{" "}

        {/* Minutes — only rendered when the elapsed time reaches 1+ minutes. */}
        {formattedTime.minutes > 0 && (
          <span>
            <span className="time-number">{formattedTime.minutes}</span>
            <span className="time-unit">m</span>
          </span>
        )}{" "}

        {/* Seconds — always visible as the primary time unit. */}
        <span>
          <span className="time-number">{formattedTime.seconds}</span>
          <span className="time-unit">s</span>
        </span>{" "}

        {/*
          Centiseconds (hundredths of a second):
          Divide raw ms by 10 → range 0-99, then pad to always show 2 digits.
          Uses the smaller font variant to visually de-emphasise sub-second precision.
        */}
        <span className="time-number time-number--small">
          {padTwoDigit(Math.floor(formattedTime.ms / 10))}
        </span>
      </button>

      <div>
        {/* Start / Stop button — label reflects the current running state. */}
        <button
          onClick={() => {
            toggleTimer();
          }}
        >
          {isRunning ? "Stop" : "Start"}
        </button>{" "}

        {/* Reset button — stops the timer and zeroes the duration. */}
        <button
          onClick={() => {
            resetTimer();
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
