/**
 * @template T, U
 * @param {(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U} callbackFn
 * @param {U} [initialValue]
 * @return {U}
 */
Array.prototype.myReduce = function (callbackFn, initialValue) {
  const array = this;
  const len = this.length;
  let accumulator = initialValue;
  let startIndex = 0;

  // If initialValue is not provided, use the first element as the initial value
  // and start iterating from the second element.
  if (initialValue === undefined) {
    if (len === 0) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    accumulator = array[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < len; i++) {
    // Skip non-existent properties (e.g., holes in sparse arrays)
    if (Object.hasOwn(array, i)) {
      accumulator = callbackFn(accumulator, array[i], i, array);
    }
  }

  return accumulator;
};
