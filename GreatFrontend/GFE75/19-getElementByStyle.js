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
