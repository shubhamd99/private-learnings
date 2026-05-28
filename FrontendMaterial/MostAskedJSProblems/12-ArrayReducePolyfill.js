// Array.reduce() loops over every element and
// accumulates it into a single value using a callback.
// Returns that single value.

Array.prototype.myReduce = function (callback, initialValue) {
  let acc;
  let startIndex;

  if (initialValue !== undefined) {
    acc = initialValue; // use provided initial value
    startIndex = 0; // start from first element
  } else {
    acc = this[0]; // first element is accumulator
    startIndex = 1; // start from second element
  }

  for (let i = startIndex; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }

  console.log("Final accumulated value:", acc);
  return acc;
};

// Usage
const arr = [1, 2, 3, 4, 5];

arr.myReduce((acc, curr) => acc + curr, 0); // 15
arr.myReduce((acc, curr) => acc * curr, 1); // 120
arr.myReduce((acc, curr) => acc + curr); // 15 no initial value
