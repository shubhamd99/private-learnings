// Any reusable logic that involves a React hook can be encapsulated and created a custom hook

// Following this principle I am here with another custom hook useHover()
//  that takes an element reference as input and checks if that element is being hovered or not.

// Hovering is a combination of two different events, mouse-enter and mouse-leave
// where if the mouse enters on the element area or is over it that means  we are hovering the mouse over the element
// where as if it is not, that  is mouse has left from the elements area that means it is not being  hovered anymore.

// where as if it is not, that  is mouse has left from the elements area that
// means it is not being  hovered anymore.

// When the event mouse-enter is fired, we will update the state that the element is currently being
// hovered, when the mouse-leave event is fired we will update the state the element is not being hovered

// This events will be assigned when the components mount and will be removed when the component unmounts inside the useEffect() hook.

import { useEffect, useRef, useState } from "react";

export const useHover = (documentRef) => {
  const [isHover, setIsHovered] = useState(false);

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    documentRef.current?.addEventListener("mouseenter", onMouseEnter);
    documentRef.current?.addEventListener("mouseleave", onMouseLeave);

    return () => {
      documentRef.current?.removeEventListener("mouseenter", onMouseEnter);
      documentRef.current?.addEventListener("mouseleave", onMouseLeave);
    };
  }, [documentRef.current]);

  return isHover;
};

export default function App() {
  const ref = useRef(null);
  const isHover = useHover(ref);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1 style={{ color: isHover ? "red" : "blue" }}>Hello Learnersbucket</h1>
      <h2 style={{ color: isHover ? "red" : "blue" }} ref={ref}>
        Check hovering: {isHover ? "true" : "false"}
      </h2>
    </div>
  );
}
