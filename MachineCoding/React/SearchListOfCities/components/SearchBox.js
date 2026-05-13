import React from "react";

export default function SearchBox({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search city..."
      className="search-input"
    />
  );
}
