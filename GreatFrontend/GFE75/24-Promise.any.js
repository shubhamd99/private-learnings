/**
 * @param {Array} iterable
 * @return {Promise}
 */
export default function promiseAny(promises) {
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
