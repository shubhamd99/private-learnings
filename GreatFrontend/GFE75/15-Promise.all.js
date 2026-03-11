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
