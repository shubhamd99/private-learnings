// This question was asked in the Meta’s frontend interview,
// where they had asked to write polyfill for the ClassNames which is a popular package
// for adding multiple CSS classes together dynamically.

// If you check the examples provided by the ClassNames package, you will realize how this utility function actually works.

console.log(classNames("foo", "bar")); // => 'foo bar'
console.log(classNames("foo", { bar: true })); // => 'foo bar'
console.log(classNames({ "foo-bar": true })); // => 'foo-bar'
console.log(classNames({ "foo-bar": false })); // => ''
console.log(classNames({ foo: true }, { bar: true })); // => 'foo bar'
console.log(classNames({ foo: true, bar: true })); // => 'foo bar'

// lots of arguments of various types
console.log(
  classNames("foo", { bar: true, duck: false }, "baz", { quux: true }),
); // => 'foo bar baz quux'

// // other falsy values are just ignored
console.log(
  classNames(null, false, "bar", undefined, 0, -1, { baz: null }, ""),
); // => 'bar -1'

const arr = ["b", { c: true, d: false }];
console.log(classNames("a", arr)); // => 'a b c'

let buttonType = "primary";
console.log(classNames({ [`btn-${buttonType}`]: true })); // => 'btn-primary'

// Following are the properties of this utility class that we can list which will help us to write a polyfill for this.

// If there are more that two classes, it will concatenate them and return as a single string.
// If the object with truthy value is passed, then the key of the object will be used as class.
// This is used to add dynamic classes.
// We can pass any type of values to the ClassNames that will be converted to a single string of classes after parsing.
// The utility method can accept any amount of arguments or array of values, all of which has to be processed.

// Now that we have our properties listed we can start implementing this utility function.

// First, we will create the main function that will iterate over all  the arguments,
// process each of argument and then convert it to the  single string of classes.

// We will iterate only if the argument is a truthy value.

function classNames(...args) {
  let classes = "";
  for (let arg of args) {
    // if arg is truthy value
    // then process it
    if (arg) {
      const newClasses = processArg(arg);
      classes = appendClass(classes, newClasses);
    }
  }

  return classes;
}

// In this we have used two helper functions processArg(arg) and appendClass(existingClasses, newClass).

// ProcessArg(arg) will convert the argument to the class based on the properties that we have listed.

function processArg(arg) {
  // return the class as it is
  if (typeof arg === "string") {
    return arg;
  }

  // convert the class to a string
  if (typeof arg === "number") {
    return "" + arg;
  }

  // -1 and 0 are falsy values and will be ignored
  //   if (typeof arg === "number") {
  //     return arg > 0 ? "" + arg : "";
  //   }

  // return empty string if no value
  if (typeof arg !== "object") {
    return "";
  }

  // if arg is array, spread all of its value as arguments to the main function and
  // recursively call it for processing
  if (Array.isArray(arg)) {
    return classNames(...arg);
  }

  // if the arg is object, check if the key is its own property (avoid checking in prototype chain)
  // and if its value is truthy create a string of classes and return it
  let classes = "";
  for (let key in arg) {
    if (arg.hasOwnProperty(key) && arg[key]) {
      const newClass = processArg(key);
      classes = appendClass(classes, newClass);
    }
  }
  return classes;
}

// Finally, create the appendClass(existingClasses, newClass) method, that will form the string by concatenating classes.
function appendClass(existingClasses, newClass) {
  if (!newClass) return existingClasses;
  return existingClasses ? existingClasses + " " + newClass : newClass;
}
