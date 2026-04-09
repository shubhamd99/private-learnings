// Before promises/async/await became the standard,
// it was a convention for async APIs in JavaScript to
// accept callbacks as the last argument.

/**
 * @callback func
 * @returns Function
 */
export default function promisify(func) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      // fn.call(thisArg, arg1, arg2, ...) spreads array as individual args
      func.call(this, ...args, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  };
}

// Example function with callback as last argument
// The callback has the signature `(err, value) => any`
function foo(url, options, callback) {
  apiCall(url, options)
    .then((data) => callback(null, data))
    .catch((err) => callback(err));
}

const promisifiedFoo = promisify(foo);
const data = await promisifiedFoo("example.com", { foo: 1 });

// ---- SIMPLE VERSION (for interviews) ----
// Idea: return a wrapper function that, when called, creates a Promise.
// Append a Node-style callback (err, result) to the original args.
// The callback rejects on error, resolves on success.
// Use func.call(this, ...) to preserve the calling context.
function promisify(func) {
  return function (...args) {
    const promise = new Promise((resolve, reject) => {
      // append the callback as the last argument
      func.call(this, ...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    return promise;
  };
}
