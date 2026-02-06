// Implement the useLockedBody() hook in React that will lock the body from further scrolling

// The useLockedBody() hook will take the reference of the parent and
// return the lock state and the method that will toggle the lock state.

// To lock the body, we will have to remove the overflow from the body so that
// everything inside it is prevented from scrolling and hide the scrollbar

// To hide the scroll bar, get the scrollWidth of the referenced element
// and add same size right padding to the body to cover the gap.

// This complete processing will take inside useLayoutEffect() hook
// as the side effect is with the DOM.

// Use a state to monitor the toggling and depending upon the toggle state, lock or unlock the body.

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const useLockedBody = (ref, initiallyLocked = false) => {
  const [locked, setLocked] = useState(initiallyLocked);

  // handle side effects before render
  useLayoutEffect(() => {
    if (!locked) {
      return;
    }

    // save original body style
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // lock body scroll
    document.body.style.overflow = "hidden";

    // get the scrollBar width
    const root = ref.current; // or root
    // offsetWidth = width + padding + border
    // scrollWidth = width + padding
    const scrollBarWidth = root ? root.offsetWidth - root.scrollWidth : 0;

    // prevent width reflow
    if (scrollBarWidth) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    // clean up
    return () => {
      document.body.style.overflow = originalOverflow;

      if (scrollBarWidth) {
        document.body.style.paddingRight = originalPaddingRight;
      }
    };
  }, [locked]);

  // update state when dependecy changes
  // This will help to sync the state with the parent component
  useEffect(() => {
    if (locked !== initiallyLocked) {
      setLocked(initiallyLocked);
    }
  }, [initiallyLocked]);

  return [locked, setLocked];
};

const Example = () => {
  const ref = useRef();

  // call the hook which returns, current value and the toggler function
  const [locked, setLocked] = useLockedBody(ref);

  return (
    <div style={{ height: "200vh" }} id="abc" ref={ref}>
      <button onClick={() => setLocked(!locked)}>
        {locked ? "unlock scroll" : "lock scroll"}
      </button>
    </div>
  );
};

export default Example;
