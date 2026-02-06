//  Implement a hook in react that helps to determine if the application is in focus or not

// This will help stop the background processing when the user is not focused or on the tab.

// To create the useHasFocus() we will have to listen to the focus and blur events on the window.

// Use useState() to persist the state and useEffect() to assign and remove the event listeners.

// Whenever the window is blurred set the focus state to false
// else whenever the window is focused, update the state to true.

// Use the document.hasFocus() to get the initial state.

import { useState, useEffect } from "react";

const useHasFocus = () => {
  // get the initial state
  const [focus, setFocus] = useState(document.hasFocus());

  useEffect(() => {
    // helper functions to update the status
    const onFocus = () => setFocus(true);
    const onBlur = () => setFocus(false);

    // assign the listener
    // update the status on the event
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    // cleanup the listener
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  // return the status
  return focus;
};

// Example usage
function App() {
  const hasFocus = useHasFocus();

  return (
    <div>
      <h1>useHasFocus</h1>
      <p>Application has focus: {hasFocus ? "Yes" : "No"}</p>
    </div>
  );
}

export default App;
