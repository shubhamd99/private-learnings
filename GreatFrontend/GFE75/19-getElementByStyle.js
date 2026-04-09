// Implement a method getElementsByStyle() that finds DOM elements that are rendered
// by the browser using the specified style.

// E.g. getElementsByStyle(document.body, 'font-size', '12px').

const doc = new DOMParser().parseFromString(
  `<div>
    <span style="font-size: 12px">Span</span>
    <p style="font-size: 12px">Paragraph</p>
    <blockquote style="font-size: 14px">Blockquote</blockquote>
  </div>`,
  "text/html",
);

getElementsByStyle(doc.body, "font-size", "12px");
// [span, p] <-- This is an array of elements.

// Hint - You might find the Window.getComputedStyle() method helpful.

/**
 * @param {Element} element
 * @param {string} property
 * @param {string} value
 * @return {Array<Element>}
 */
export default function getElementsByStyle(element, property, value) {
  const elements = [];

  function traverse(el) {
    if (el === null) {
      return;
    }

    // Get the computed style of the element.
    const computedStyles = getComputedStyle(el);
    if (computedStyles.getPropertyValue(property) === value) {
      elements.push(el);
    }

    for (const child of el.children) {
      traverse(child);
    }
  }

  for (const child of element.children) {
    traverse(child);
  }

  return elements;
}

// Edge cases
// Element argument is not included in the results even if it matches the specified style.
// Value arguments have to be in the format of the resolved styles,
// e.g. colors have to be in rgb()/rgba() format in order to match.

// ---- SIMPLE VERSION (for interviews) ----
// Idea: walk every child of element using recursion (DFS).
// At each node, use getComputedStyle to check if the property matches.
// Skip the root element itself — only its descendants are checked.
function getElementsByStyle(element, property, value) {
  const result = [];

  // DFS: visit current node first, then recurse into each child.
  // el.children gives only element nodes (no text/comment nodes).
  function dfs(el) {
    // getComputedStyle(el) — returns the final resolved styles after applying
    //   all CSS rules, inheritance, and browser defaults (unlike el.style
    //   which only reflects inline styles).
    // .getPropertyValue(property) — reads a specific CSS property by name
    //   (e.g. 'font-size'). Returns the resolved value as a string (e.g. '12px').
    //   Colors are resolved to rgb(...) format regardless of how they were set.
    if (getComputedStyle(el).getPropertyValue(property) === value) {
      result.push(el);
    }
    for (const child of el.children) {
      dfs(child); // recurse depth-first into each child subtree
    }
  }

  // start from children so root element is excluded
  for (const child of element.children) {
    dfs(child);
  }

  return result;
}
