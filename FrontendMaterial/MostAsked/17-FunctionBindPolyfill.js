// What it does
// bind() returns a new function with "this" permanently set to the provided object.
// Does not call the function immediately.
// takes args as comma separated values, not an array like apply().

// fn.bind(thisArg, arg1, arg2, ...);

Function.prototype.myBind = function (thisArg, ...args) {
  const fn = this; // the original function to bind 'this' here = the function myBind was called on

  return function (...newArgs) {
    return fn.apply(thisArg, [...args, ...newArgs]); // call with combined args
    //           bound this   preset    new args
  };
};

// Usage
const person = { name: "Shubham" };

function greet(greeting, punct) {
  return `${greeting} ${this.name}${punct}`;
}

const boundGreet = greet.myBind(person, "Hello");
console.log(boundGreet("!")); // "Hello Shubham!"
console.log(boundGreet("?")); // "Hello Shubham?"

// preset all args
const boundGreet2 = greet.myBind(person, "Hello", "!");
console.log(boundGreet2()); // "Hello Shubham!"

function multiply(a, b) {
  return a * b;
}

const double = multiply.myBind(null, 2); // preset a = 2
console.log(double(5)); // 10
console.log(double(10)); // 20
