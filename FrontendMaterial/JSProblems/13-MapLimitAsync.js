// Implement a mapLimit function that is similar to the Array.map()
// which returns a promise that resolves on the list of output by
// mapping each input through an asynchronous iteratee function or
// rejects it if any error occurs. It also accepts a limit to decide how many
// operations can occur at a time

// This question is a polyfill of the mapLimit method from the async utility library - https://caolan.github.io/async/v3/docs.html#mapLimit.

// To implement this function we will have to use the combination of both Async.parallel and Async.series:

// First chop the input array into the subarrays of the given limit. This will return us an array of arrays like [[1, 2, 3], [4, 5]].
// The parent array will run in series that is the next subarray will execute only after the current subarray is done.
// All the elements of each sub-array will run in parallel.
// Accumulate all the results of each sub-array element and resolve the promise with this.
// If any error occurs, reject the promise with that error.

// helper function to chop array in chunks of given size
Array.prototype.chop = function (size) {
  // temp array
  const temp = [...this];

  if (!size) {
    return temp;
  }

  // output
  const output = [];
  let i = 0;

  // iterate the array
  while (i < temp.length) {
    // slice the sub-array of a given size
    // and push them in output array
    output.push(temp.slice(i, i + size));
    i += size;
  }

  return output;
};

function mapLimit(arr, limit, fn) {
  // return a new promise
  return new Promise((resolve, reject) => {
    // chop the input array into the subarray of limit
    // [[1, 2, 3], [1, 2, 3]]
    let chopped = arr.chop(limit);

    // for all the subarrays of chopped
    // run it in series
    // that is one after another
    // initially it will take an empty array to resolve
    // merge the output of the subarray and pass it on to the next

    // a - accumulator (previous result)
    // b - current value (current subarray)
    const final = chopped.reduce((a, b) => {
      return a.then((val) => {
        return new Promise((resolveInner, rejectInner) => {
          // run the sub-array values in parallel
          // pass each input to the iteratee function
          // and store their outputs
          // after all the tasks are executed
          // merge the output with the previous one and resolve
          const results = [];
          let tasksCompleted = 0;
          let hasError = false;

          b.forEach((e) => {
            fn(e, (error, value) => {
              if (hasError) return;
              if (error) {
                hasError = true;
                rejectInner(error);
              } else {
                results.push(value);
                tasksCompleted++;
                if (tasksCompleted >= b.length) {
                  resolveInner([...val, ...results]);
                }
              }
            });
          });
        });
      });
    }, Promise.resolve([]));

    // based on final promise state
    // invoke the final promise.
    final.then(resolve).catch(reject);
  });
}

// Input:
let numPromise = mapLimit([1, 2, 3, 4, 5], 3, function (num, callback) {
  setTimeout(function () {
    num = num * 2;
    console.log(num);
    callback(null, num);
  }, 2000);
});

numPromise
  .then((result) => console.log("success:" + result))
  .catch((e) => console.log("error:", e));

// Output:
// /// first batch
// 2
// 4
// 6
// /// second batch
// 8
// 10
// /// final result
// "success: [2, 4, 6, 8, 10]

let numPromise2 = mapLimit([1, 2, 3, 4, 5], 3, function (num, callback) {
  setTimeout(function () {
    num = num * 2;
    console.log(num);

    // throw error
    if (num === 6) {
      callback(true);
    } else {
      callback(null, num);
    }
  }, 2000);
});

numPromise2
  .then((result) => console.log("success:" + result))
  .catch(() => console.log("no success"));

// Output:
// first batch
// 2
// 4
// 6
// second batch
// "no success"
