// Create a hook in React to detect if element is within the viewport.

// Tracking the component's visibility can be really handy in multiple cases
//  especially for performance
// when you want to load to the media like image, video, audio, etc.
// only when the component is in the viewport or is visible.

// Another case is when you want to track the user activity like when the user
// is a starring a product (product is in the viewport) so that you can use this data for recommendations

// For this, we can create a useOnScreen() hook that will return a boolean value
// if the component or HTML element is the viewport or not.

// There are two ways to implement it.
// Using Intersection Observer.
// Using getBoundingClientRect().

import { useEffect, useRef, useState } from "react";

// Using Intersection Observer

// With useRef() we will create a reference to the DOM element which we want to track
// and then pass this to the useOnScreen() hook.
function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  // monitor the interaction
  const observer = new IntersectionObserver(
    ([entry]) => {
      // update the state on interaction change
      setIntersecting(entry.isIntersecting);
    },
    {
      // 1.0 means trigger when 100% of the element is visible
      // 0.5 means trigger when 50% of the element is visible
      // 0.0 means trigger when 0% of the element is visible
      threshold: 1.0,
    },
  );

  useEffect(() => {
    // assign the observer
    observer.observe(ref.current);

    // remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
}

const Element = ({ number }) => {
  const ref = useRef();
  const isVisible = useOnScreen(ref);

  // With useRef() we will create a reference to the DOM element
  // and then pass this to the useOnScreen() hook.
  return (
    <div
      ref={ref}
      style={{
        height: "100px",
        width: "100px",
        margin: "10px",
        backgroundColor: isVisible ? "green" : "red",
      }}
    >
      {number}
      {isVisible ? `I am on screen` : `I am invisible`}
    </div>
  );
};

const DummyComponent = () => {
  const arr = [];
  for (let i = 0; i < 20; i++) {
    arr.push(<Element key={i} number={i} />);
  }

  return arr;
};

export default DummyComponent;

// Using getBoundingClientRect()
// Unlike Intersection Observer, here we will have to perform simple calculations
// to determine if the element is in the viewport or not.

// If the top of the element is greater than zero but
// less than the window.innerHeight then it is in the viewport
// We can also add some offset in case we want a buffer.

// Assign a scroll event on the window and
// inside the listener get the getBoundingClientRect()
// of the element. Perform the calculation and update the state accordingly.

function useOnScreen2(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  // determine if the element is visible
  const observer = function () {
    const offset = 50;
    const top = ref.current.getBoundingClientRect().top;
    // if top is greater than 0 means element is below the viewport
    // if top is less than window.innerHeight means element is above the viewport
    setIntersecting(top + offset >= 0 && top - offset <= window.innerHeight);
  };

  useEffect(() => {
    // first check
    observer();

    // assign the listener
    window.addEventListener("scroll", observer);

    // remove the listener on unmount
    return () => {
      window.removeEventListener("scroll", observer);
    };
  }, []);

  return isIntersecting;
}

const Element2 = ({ number }) => {
  const ref = useRef();
  const isVisible = useOnScreen2(ref);

  return (
    <div
      ref={ref}
      style={{
        height: "100px",
        width: "100px",
        margin: "10px",
        backgroundColor: isVisible ? "green" : "red",
      }}
    >
      {number}
      {isVisible ? `I am on screen` : `I am invisible`}
    </div>
  );
};

const DummyComponent2 = () => {
  const arr = [];
  for (let i = 0; i < 20; i++) {
    arr.push(<Element2 key={i} number={i} />);
  }

  return arr;
};

// export default DummyComponent2;
