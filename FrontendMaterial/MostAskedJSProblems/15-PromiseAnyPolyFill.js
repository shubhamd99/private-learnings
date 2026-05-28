// What it does
// Promise.any() takes an array of promises and returns a single promise that:
// - Resolves as soon as any one promise resolves — returns that value
// - Rejects only when all promises reject — returns AggregateError

// AggregateError: All promises were rejected
// errors: ["error 1", "error 2", "error 3"]

function myPromiseAny(promises) {
  return new Promise((resolve, reject) => {
    const errors = [];
    let rejected = 0;

    if (promises.length === 0) {
      reject(new AggregateError(errors, "All promises were rejected"));
      return;
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch((error) => {
          errors[index] = error;
          rejected++;

          if (rejected === promises.length) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        });
    });
  });
}

// Usage
const p1 = Promise.reject("error 1");
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

myPromiseAny([p1, p2, p3])
  .then((result) => console.log(result)) // 2
  .catch((err) => console.log(err));

// All reject
myPromiseAny([
  Promise.reject("e1"),
  Promise.reject("e2"),
  Promise.reject("e3"),
]).catch((err) => {
  console.log(err.message); // "All promises were rejected"
  console.log(err.errors); // ["e1", "e2", "e3"]
});
