import React from "react";

export default function HighlightedText({ text, query }) {
  if (!query) return text;

  const index = text.toLowerCase().indexOf(query.toLowerCase());

  if (index === -1) return text;

  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);

  return (
    <>
      {before}
      <mark>{match}</mark>
      {after}
    </>
  );
}
