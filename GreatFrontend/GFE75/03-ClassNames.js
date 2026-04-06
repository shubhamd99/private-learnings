// classnames is a commonly-used utility in modern front end applications to
// conditionally join CSS class names together.
// If you've written React applications, you likely have used a similar library.

//  the classNames function calls itself and its return value is a string
// that can be composed by parent recursive calls.

/**
 * @param {...(any|Object|Array<any|Object|Array>)} args
 * @return {string}
 */
export default function classNames(...args) {
  const classes = [];

  args.forEach((arg) => {
    // Ignore falsey values
    if (!arg) {
      return;
    }

    const argType = typeof arg;

    // Handle string and numbers.
    if (argType === "string" || argType === "number") {
      classes.push(arg);
      return;
    }

    // Handle arrays.
    if (Array.isArray(arg)) {
      classes.push(classNames(...arg));
      return;
    }

    // Handle objects
    if (argType === "object") {
      for (const key in arg) {
        // Ignore non-own properties and falsey values
        if (Object.hasOwn(arg, key) && arg[key]) {
          classes.push(key);
        }
      }

      return;
    }
  });

  return classes.join(" ");
}

// ---- SIMPLE VERSION (for interviews) ----
// Idea: loop through each argument — 4 cases to handle:
//   1. falsy      → skip it
//   2. string/number → add directly
//   3. array      → recurse into it
//   4. object     → add keys whose value is truthy

function classNamesSimple(...args) {
  const classes = [];

  for (const arg of args) {
    // 1. Skip falsy values (null, undefined, false, 0, "")
    if (!arg) continue;

    if (typeof arg === "string" || typeof arg === "number") {
      // 2. Strings and numbers go straight in
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      // 3. Arrays: flatten by recursing, then add the result
      classes.push(classNamesSimple(...arg));
    } else if (typeof arg === "object") {
      // 4. Objects: only add the key if it's the object's own key (not inherited) and value is truthy
      // Object.hasOwn guards against for...in picking up inherited prototype properties
      for (const key in arg) {
        if (Object.hasOwn(arg, key) && arg[key]) classes.push(key);
      }
    }
  }

  return classes.join(" ");
}
