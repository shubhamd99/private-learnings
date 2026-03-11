// Implement a function deepEqual that performs a deep comparison between two values
// It returns true if two input values are deemed equal, and returns false if not.

// You can assume there are only JSON-serializable values
// (numbers, strings, boolean, null, objects, arrays).
// There wouldn't be cyclic objects, i.e. objects with circular references.

/**
 * @param {*} valueA
 * @param {*} valueB
 * @return {boolean}
 */
export default function deepEqual(valueA, valueB) {
  // Check primitives for equality
  // It checks if two values are exactly the same — stricter than === in two edge cases.
  // NaN === NaN          // false (JS quirk)
  // Object.is(NaN, NaN)  // true
  if (Object.is(valueA, valueB)) {
    return true;
  }

  // The toString() method of Object instances returns a string representing this object.
  // toString internally uses this to determine the type — so we pass valueA as this using .call().
  const bothObjects =
    Object.prototype.toString.call(valueA) === "[object Object]" &&
    Object.prototype.toString.call(valueB) === "[object Object]";

  const bothArrays = Array.isArray(valueA) && Array.isArray(valueB);

  // At this point, they can still be primitives but of different types.
  // If they had the same value, they would have been handled earlier in Object.is().
  // So if they're not both objects or both arrays, they're definitely not equal.
  if (!bothObjects && !bothArrays) {
    return false;
  }

  // Compare the keys of arrays and objects.
  // work for both objects and arrays ex. [1,2,3] and {0:1, 1:2, 2:3}
  if (Object.keys(valueA).length !== Object.keys(valueB).length) {
    return false;
  }

  // Recursively compare the values of each key.
  for (const key in valueA) {
    if (Object.hasOwn(valueA, key) && !deepEqual(valueA[key], valueB[key])) {
      return false;
    }
  }

  // All checks passed, the arrays/objects are equal.
  return true;
}

// Edge cases
// Comparing nulls, Objects, Arrays.
// Equality of +0 and -0.
// Cyclic objects, i.e. objects with circular references are not handled.
// Property descriptors are not taken into account when comparing properties.
// Non-enumerable properties and symbol-keyed properties are not compared.
