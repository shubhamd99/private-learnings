// What it does
// Promise.allSettled() takes an array of promises and returns a single promise that:
// - resolves when all of the promises in the array have either resolved or rejected,
// with an array of objects that each describe the outcome of each promise.
// - rejects if the argument passed to Promise.allSettled() is not an iterable (e.g., an array).

// [
//   { status: "fulfilled", value: 1 },
//   { status: "rejected",  reason: "error!" },
//   { status: "fulfilled", value: 3 }
// ]

function myPromiseAllSettled(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;

    if (promises.length === 0) {
      resolve([]);
      return;
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = {
            status: "fulfilled",
            value: value, // the resolved value
          };
        })
        .catch((reason) => {
          results[index] = {
            status: "rejected",
            reason: reason, // the error
          };
        })
        .finally(() => {
          completed++;

          if (completed === promises.length) {
            resolve(results); // always resolves with the results array
          }
        });
    });
  });
}

// Usage
const p1 = Promise.resolve(1);
const p2 = Promise.reject("error!");
const p3 = Promise.resolve(3);

myPromiseAllSettled([p1, p2, p3]).then((results) => console.log(results));

// [
//   { status: "fulfilled", value: 1 },
//   { status: "rejected",  reason: "error!" },
//   { status: "fulfilled", value: 3 }
// ]
