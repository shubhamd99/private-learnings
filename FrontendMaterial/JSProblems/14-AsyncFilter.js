// Implement a function that takes an array of input and an async
// iteratee function and returns a promise that resolves with the list of
// inputs that has passed the test through iteratee function in JavaScript.

// The inputs will run in parallel, but the output will be in the same order as the original.

// The asynchronous iteratee function will accept an input and a  callback.

let numPromise = filter([1, 2, 3, 4, 5], function (num, callback) {
  setTimeout(function () {
    num = num * 2;
    console.log(num);

    // throw error
    if (num === 7) {
      callback(true);
    } else {
      callback(null, num !== 4);
    }
  }, 2000);
});

numPromise
  .then((result) => console.log("success:" + result))
  .catch(() => console.log("no success"));

// Output:
// 2
// 4
// 6
// 8
// 10
// "success:1,3,4,5"

let numPromise2 = filter([6, 7, 8, 9, 10], function (num, callback) {
  setTimeout(function () {
    let originalNum = num;
    num = num * 2;
    console.log(num);

    // throw error
    if (originalNum === 7) {
      callback(true);
    } else {
      callback(null, num !== 4);
    }
  }, 2000);
});

numPromise2
  .then((result) => console.log("success2:" + result))
  .catch(() => console.log("no success2"));

// Output:
// 12
// 14
// 16
// 18
// 20
// "success2:6,8,9,10"

// Implementation:

function filter(arr, fn) {
  // return a new promise
  return new Promise((resolve, reject) => {
    const output = [];
    let track = 0;

    arr.forEach((e, i) => {
      fn(e, (error, result) => {
        // track the no of inputs processed
        track++;

        // if the input passes the test
        // add it to the current index
        if (result) {
          output[i] = e;
        }

        // if the last element of the input array
        if (track >= arr.length) {
          // filter the final output with truthy values
          // to return the value in order
          resolve(output.filter(Boolean));
        }
      });
    });
  });
}
