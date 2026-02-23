// Implement a function that takes an array of input and an async
// iteratee function and returns a promise that resolves
// with the list of  inputs that has failed the test through iteratee function in JavaScript.
// This function is exactly the opposite of the Async Filter.
// The inputs will run in parallel, but the output will be in the same order as the original.
// The asynchronous iteratee function will accept an input and a  callback.

function reject(arr, fn) {
  // return a new promise
  return new Promise((resolve, reject) => {
    const output = [];
    let track = 0;

    arr.forEach((e, i) => {
      fn(e, (error, result) => {
        // reject on error
        if (error) {
          reject(error);
        }

        // track the no of inputs processed
        track++;

        // if input fails the test
        // add it to the current index
        if (!result) {
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

let numPromise = reject([1, 2, 3, 4, 5], function (num, callback) {
  setTimeout(function () {
    let originalValue = num;
    num = num * 2;
    console.log(num);

    // throw error
    if (originalValue === 7) {
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
// "success:2"
