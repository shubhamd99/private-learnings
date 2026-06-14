import React, { useState, useCallback, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import "./styles.css";

// Mock API call to simulate fetching data
const fetchResults = async (query) => {
  if (!query) return [];
  console.log(`[API CALL] Fetching results for: "${query}"`);

  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([`${query} result 1`, `${query} result 2`, `${query} result 3`]);
    }, 400);
  });
};

export default function App() {
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(-1);
  }, [results]);

  // We wrap handleSearch in useCallback so it maintains referential equality
  // across renders, preventing the SearchBar's useEffect from firing infinitely.
  const handleSearch = useCallback(async (query) => {
    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const data = await fetchResults(query);
    setResults(data);
    setIsSearching(false);
  }, []);

  const handleKeyDown = (e) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      alert(`Selected: ${results[activeIndex]}`);
    } else if (e.key === "Escape") {
      setResults([]);
    }
  };

  return (
    <main className="page">
      <h1>Debounced Search</h1>

      <SearchBar
        onSearch={handleSearch}
        onKeyDown={handleKeyDown}
        ariaExpanded={results.length > 0}
        activeDescendant={
          activeIndex >= 0 ? `result-item-${activeIndex}` : undefined
        }
      />

      <div className="results">
        {isSearching && <div className="loader">Loading results...</div>}

        {!isSearching && results.length > 0 && (
          <ul id="search-results-list" role="listbox">
            {results.map((item, index) => (
              <li
                key={index}
                id={`result-item-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                className={index === activeIndex ? "active" : ""}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => alert(`Selected: ${item}`)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        {!isSearching && results.length === 0 && (
          <div className="empty">No results to display.</div>
        )}
      </div>
    </main>
  );
}
