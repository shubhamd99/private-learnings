import React, { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

export default function SearchBar({
  onSearch,
  onKeyDown,
  ariaExpanded,
  activeDescendant,
}) {
  const [query, setQuery] = useState("");

  // Use our custom hook to delay the query update by 500ms
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    // Only call the parent's onSearch function when the debounced value changes
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Type to search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-expanded={ariaExpanded}
        aria-controls="search-results-list"
        aria-activedescendant={activeDescendant}
        aria-autocomplete="list"
        aria-label="Search input"
      />
      {/* Optional: Show a subtle indicator while the user is actively typing and the debounce timer hasn't finished */}
      {query !== debouncedQuery && (
        <span className="search-status">Typing...</span>
      )}
    </div>
  );
}
