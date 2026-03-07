// What it does
// Promise.all() takes an array of promises and returns a single promise that:
// - Resolves when all promises in the array resolve
// - Rejects when any promise in the array rejects

function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;

    if (promises.length === 0) {
      resolve(results); // empty array → resolve immediately
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise) // handle non-promise values too
        .then((value) => {
          results[index] = value; // store result in correct order
          completed += 1;

          if (completed === promises.length) {
            resolve(results); // all promises resolved successfully
          }
        })
        .catch((err) => {
          reject(err); // any failure → reject immediately
        });
    });
  });
}

// Usage
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

myPromiseAll([p1, p2, p3])
  .then((results) => console.log(results)) // [1, 2, 3]
  .catch((err) => console.log(err));

// Failure case
const p4 = Promise.reject("error!");
myPromiseAll([p1, p2, p4])
  .then((results) => console.log(results)) // This will not run
  .catch((err) => console.log(err)); // "error!"
