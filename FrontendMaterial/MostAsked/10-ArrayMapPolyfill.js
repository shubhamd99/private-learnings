// Array.map() loops over every element, applies a callback, and
// returns a new array with the results. Original array is never mutated.

Array.prototype.myMap = function (callback) {
  const result = [];

  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
    //                   value  index  array
  }

  console.log(result);
  return result;
};

// Usage
const arr = [1, 2, 3, 4, 5];

arr.myMap((x) => x * 2); // [2, 4, 6, 8, 10]
arr.myMap((x) => x + 10); // [11, 12, 13, 14, 15]
arr.myMap((x, i) => `${i}:${x}`); // ["0:1", "1:2", "2:3", "3:4", "4:5"]
