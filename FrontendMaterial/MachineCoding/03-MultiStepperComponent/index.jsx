// In this tutorial, we will see how to create a multi-stepper component in React
// that takes a list of components and generate each for each step.

// Make the component extensible bypassing the navigation options to the components
// in the list so that they can move to the next step at will

// We can break down this component in two parts.
// Create the UI for the steps
// Add navigation to the steps

// Create the UI for the steps
// Based on the number of components we receive, we have to generate that many steps.
// And each steps will have grey color by default and the active ones will have a different color.
// All the steps before the active step will be considered as done thus we will have the active class for them as well.

import React, { useState } from "react";
import "./styles.css";

// export default function Stepper({ list }: { list: React.ReactNode[] }) {
function Stepper({ list }) {
  const [currentStep, setCurrentStep] = useState(0);
  const stepsCount = list.length;
  const steps = [];

  for (let i = 0; i < stepsCount; i++) {
    // All the steps before the active step will be considered as done thus we will have the active class
    steps.push(
      <div
        className={`steps ${currentStep >= i ? "active" : ""}`}
        key={i}
        onClick={() => setCurrentStep(i)}
      >
        {i + 1}
      </div>,
    );
  }

  const onPrev = () => {
    if (currentStep !== 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onNext = () => {
    if (currentStep !== stepsCount - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Calculate the width of the progress line by
  // dividing the total width by the number of steps and multiplying by the current step
  const progressLineWidth = (100 / (list.length - 1)) * currentStep;

  return (
    <section className="stepper">
      <div className="steps-container">
        <div className="steps-wrapper">{steps}</div>
        <div
          className="progress-line"
          style={{ width: `${progressLineWidth}%` }}
        ></div>
      </div>
      <div>{React.cloneElement(list[currentStep], { onPrev, onNext })}</div>
    </section>
  );
}

function App() {
  return (
    <>
      <p className="read-the-docs">React Test App For Machine</p>
      <Stepper list={[<div />, <div />, <div />, <div />]} />
    </>
  );
}

export default App;
