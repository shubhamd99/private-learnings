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
