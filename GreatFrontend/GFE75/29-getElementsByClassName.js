// getElementsByClassName() is a method which exists on HTML Documents and
// Elements to return an HTMLCollection of descendant elements within the
// Document/Element which has the specified class name(s).

// Similar to Element.getElementsByClassName(),
// only descendants of the element argument are searched, not the element itself.

// Return an array of Elements, instead of an HTMLCollection of Elements.

const doc = new DOMParser().parseFromString(
  `<div class="foo bar baz">
    <span class="bar baz">Span</span>
    <p class="foo baz">Paragraph</p>
    <div class="foo bar"></div>
  </div>`,
  "text/html",
);

getElementsByClassName(doc.body, "foo bar");
// [div.foo.bar.baz, div.foo.bar] <-- This is an array of elements.

/**
 * Checks if set `a` is a subset of set `b`
 * meaning every element in `a` must exist in `b`
 *
 * @param {Set} requiredClasses - set of class names to search for
 * @param {DOMTokenList} elementClasses - classes that the element has
 * @returns {boolean} - true if all requiredClasses exist in elementClasses
 *
 * @example
 * requiredClasses = Set { "foo", "bar" }
 * elementClasses  = DOMTokenList ["foo", "bar", "baz"]
 * isSubset(requiredClasses, elementClasses) → true
 *
 * requiredClasses = Set { "foo", "bar" }
 * elementClasses  = DOMTokenList ["foo"]
 * isSubset(requiredClasses, elementClasses) → false
 */
function isSubset(requiredClasses, elementClasses) {
  return Array.from(requiredClasses).every((className) =>
    elementClasses.contains(className),
  );
}

/**
 * @param {Element} element
 * @param {string} classNames
 * @return {Array<Element>}
 */
export default function getElementsByClassName(element, classNames) {
  const elements = [];
  // split classNames into an array of class names and remove duplicates
  // "foo   bar".split(" ")    ["foo", "", "", "bar"]
  // "foo   bar".split(/\s+/)  ["foo", "bar"]
  const classNamesSet = new Set(classNames.trim().split(/\s+/));

  function traverse(el) {
    if (el == null) {
      return;
    }

    // check if el has all the class names
    if (isSubset(classNamesSet, el.classList)) {
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

// const el = document.createElement('div'); // DOMTokenList [value: '']
// el.classList.contains('hello');
// false

// ---- SIMPLE VERSION (for interviews) ----
// Idea: DFS through all descendants (not the root element itself).
// At each node, check if the element's classList contains ALL required classes.
// Split the input string with /\s+/ to handle multiple spaces between class names.
// classNames.trim()         // "foo   bar  baz"
//           .split(/\s+/)   // ["foo", "bar", "baz"]
function getElementsByClassName(element, classNames) {
  const result = [];
  // /\s+/ handles multiple spaces; trim() removes leading/trailing spaces
  const required = classNames.trim().split(/\s+/);

  function dfs(el) {
    // el.classList.contains checks the element's DOMTokenList
    if (required.every((cls) => el.classList.contains(cls))) {
      result.push(el);
    }
    for (const child of el.children) {
      dfs(child);
    }
  }

  // start from children — root element is excluded per spec
  for (const child of element.children) {
    dfs(child);
  }

  return result;
}
