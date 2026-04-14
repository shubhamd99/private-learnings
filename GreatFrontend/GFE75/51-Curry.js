/**
 * @param {Function} func
 * @return {Function}
 */
export default function curry(func) {
  return function curried(...args) {
    // function add(a, b, c) { return a + b + c; }
    // const curriedAdd = curry(add); // func.length = 3
    // curriedAdd(1, 2, 3)  // args = 3
    if (args.length >= func.length) {
      return func.apply(this, args);
    }

    return (arg) =>
      arg === undefined
        ? curried.apply(this, args) // no new arg — replay with same args
        : curried.apply(this, [...args, arg]); // new arg — append and recurse
  };
}

function add(a, b) {
  return a + b;
}

const curriedAdd = curry(add);
curriedAdd(3)(4); // 7

const alreadyAddedThree = curriedAdd(3);
alreadyAddedThree(4); // 7

function multiplyThreeNumbers(a, b, c) {
  return a * b * c;
}

const curriedMultiplyThreeNumbers = curry(multiplyThreeNumbers);
curriedMultiplyThreeNumbers(4)(5)(6); // 120

const containsFour = curriedMultiplyThreeNumbers(4);
const containsFourMulFive = containsFour(5);
containsFourMulFive(6); // 120

// ---- SIMPLE VERSION (for interviews) ----
// Idea: keep collecting args until we have enough to call the original function.
// Each call returns a new function that remembers all previous args (closure).

function currySimple(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func(...args);
    }
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
}
