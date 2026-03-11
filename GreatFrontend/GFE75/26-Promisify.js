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
