// Coercion = JS automatically converting one type to another

const obj = {};
obj.valueOf(); // returns the object itself, not useful
// When valueOf returns the object itself, JS knows it did not get a primitive, so it then tries toString as a fallback.
// `${obj}`        // calls obj.toString() -> "[object Object]"
// obj + " hello"  // calls obj.toString() -> "[object Object] hello"

// When JS needs to coerce an object/function to a primitive, it calls valueOf() automatically
const obj = { valueOf: () => 10 };
+obj; // JS thinks "I need a number"
// calls obj.valueOf() → 10
// returns 10

// ⁠ ⁠Currying Problem: Define sum function ending without ().
// Example -> sum(0)(1)(2)(3)(4)(5)

// This is trickier — without () to signal the end,
// we need JavaScript's type coercion to extract the value.
// A function can do both! Functions are objects in JS — you can add properties to them.

// The Problem
// Every call like sum(1)(2)(3) must return something that can still be called AND hold a value.

function sum(a) {
  function inner(b) {
    return sum(a + b);
  }

  // Every object in JS has a valueOf() method inherited from Object.prototype.
  // It tells JS "what is my primitive value?"
  inner.valueOf = () => a; // attach current value

  return inner;
}

// Usage
console.log(sum(1)(2)(3)(4)(5)); // function (but holds 15)
// [Function: inner] { valueOf: [Function (anonymous)] }

// Without () or any coercion, JS has no reason to call valueOf() — so it just stays as a function.
// To get the value, we can use coercion:
console.log(+sum(1)(2)(3)(4)(5)); // 15
console.log(sum(1)(2)(3)(4)(5) + 0); // 15
