// Time Complexity: O(n) -> where n is the number of elements in the array
// Space Complexity: O(n) -> due to recursion stack

/**
 * @param {Array<*|Array>} value -> array with nested arrays
 * @return {Array} -> flattened array
 */
export default function flatten(value) {
  let result = [];

  for (const item of value) {
    if (Array.isArray(item)) {
      //  JavaScript engines have a hard limit on the number of arguments a function can take (safely around ~65,000)
      // result.push(...flatten(item));
      // concat creates a new array, safely combining them
      result = result.concat(flatten(item));
    } else {
      result.push(item);
    }
  }

  return result;
}

// flatten in-place
// Time Complexity: O(n)
// Space Complexity: O(1)
function flatten2(value) {
  for (let i = 0; i < value.length; ) {
    if (Array.isArray(value[i])) {
      // remove 1 element at index i and insert all elements of value[i]
      value.splice(i, 1, ...value[i]);
    } else {
      i++;
    }
  }

  return value;
}

function flatte3(value) {
  while (value.some(Array.isArray)) {
    value = [].concat(...value);
  }

  return value;
}

function flatten4(value) {
  return value.reduce(
    (acc, curr) => acc.concat(Array.isArray(curr) ? flatten4(curr) : curr),
    [],
  );
}

// Generator function
function* flatten5(value) {
  for (const item of value) {
    if (Array.isArray(item)) {
      yield* flatten5(item);
    } else {
      yield item;
    }
  }
}
