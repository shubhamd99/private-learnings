// What it does
// Promise.race() takes an array of promises and returns a single promise that:
// Resolves or Rejects as soon as any one promise settles — returns that value or error
// Literally a race — first one wins, rest are ignored

function myPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) return; // never settles for empty array

    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then((value) => {
          resolve(value); // first to resolve wins
        })
        .catch((reason) => {
          reject(reason); // first to reject wins
        });
    });
  });
}

// Usage
const p1 = new Promise((resolve) => setTimeout(() => resolve(1), 3000));
const p2 = new Promise((resolve) => setTimeout(() => resolve(2), 1000));
const p3 = new Promise((resolve) => setTimeout(() => resolve(3), 2000));

myPromiseRace([p1, p2, p3])
  .then((result) => console.log(result)) // 2
  .catch((err) => console.log(err));
