// This tutorial will show how to implement infinite scroll in React.
// It was an Atlassian frontend interview question and Tekion's senior frontend interview.

// Infinite scroll or lazy loading is an optimization technique used as a pagination
// to load the next set of data once the user has scrolled through the existing one.

import { useState, useEffect, useEffectEvent } from "react";

const App = () => {
  const [count, setCount] = useState(10);

  const onScroll = useEffectEvent(() => {
    // innerHeight - height of the viewport
    // scrollY - vertical scroll position
    // document.body.offsetHeight - height of the document
    if (
      window.innerHeight + window.scrollY >=
      window.document.body.offsetHeight
    ) {
      setCount(count + 10);
    }
  });

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // generate items
  const elements = [];
  for (let i = 0; i < count; i++) {
    elements.push(
      <div
        key={i}
        style={{
          height: "150px",
          width: "auto",
          border: "1px solid black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Hello {i}
      </div>,
    );
  }

  return <div>{elements}</div>;
};

export default App;
