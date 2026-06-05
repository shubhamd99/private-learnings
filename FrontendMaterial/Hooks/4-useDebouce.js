// Debouncing is a method or a way to execute a function when it is made sure
// that no further repeated event will be triggered in a given frame of time
// It is one of the prominent optimization technique to reduce the network or function calls.

// Because React's useEffect cleanup automatically handles destroying the old timer for us,
// we completely eliminate the need for useRef!

import { useState, useEffect } from "react";

function useDebounceValue(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set the value after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // If 'value' changes BEFORE the delay finishes, this cleanup function
    // runs and clears the timer, preventing the update!
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

function SearchApp() {
  const [searchTerm, setSearchTerm] = useState("");

  // This value will only update 500ms AFTER the user stops typing
  const debouncedSearchTerm = useDebounceValue(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log("Fetching API for:", debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
