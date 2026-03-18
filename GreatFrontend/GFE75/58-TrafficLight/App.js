// Build a traffic light where the lights switch from green to
// yellow to red after predetermined intervals and loop
// indefinitely. Each light should be lit for the following durations:

// Red light: 4000ms
// Yellow light: 500ms
// Green light: 3000ms

// Data Model
// Traffic lights are simple state machines where each color is a state and
// each state is shown for a fixed duration before moving to the next
// We can capture the state information (how long to remain in each color for and
// which color to transition to) using a simple JavaScript object:

// For a11y reasons, we add an aria-label to the component to indicate the current light
// and aria-live="polite" to announce the current active light.

// The contents of the component (the lights) are for visual purposes and aren't important to screen readers
// they can be hidden with aria-hidden="true".

import TrafficLight from "./TrafficLight";

// red -> green -> yellow
const config = {
  red: {
    backgroundColor: "red",
    duration: 4000,
    next: "green",
  },
  yellow: {
    backgroundColor: "yellow",
    duration: 500,
    next: "red",
  },
  green: {
    backgroundColor: "green",
    duration: 3000,
    next: "yellow",
  },
};

export default function App() {
  return (
    <div className="wrapper">
      <TrafficLight config={config} />
      <TrafficLight config={config} layout="horizontal" />
    </div>
  );
}
