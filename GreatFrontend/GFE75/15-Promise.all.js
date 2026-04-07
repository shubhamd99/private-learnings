/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */
export default function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;

    if (promises.length === 0) {
      resolve(results); // empty array → resolve immediately
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise) // Promise.resolve handles both Promises and static values
        .then((value) => {
          results[index] = value; // store result in correct order
          completed += 1;

          // Once all are finished, resolve the full array
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject); // Short-circuit on first error
    });
  });
}
