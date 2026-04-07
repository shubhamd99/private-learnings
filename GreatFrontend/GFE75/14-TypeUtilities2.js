// Alternative to isArray.
// export function isArrayAlt(value) {
//   // For null and undefined.
//   if (value == null) {
//     return false;
//   }

//   return value.constructor === Array;
// }

export function isArray(value) {
  return Array.isArray(value);
}

export function isFunction(value) {
  return typeof value === "function";
}

export function isObject(value) {
  // For null and undefined.
  if (value == null) {
    return false;
  }

  return typeof value === "object" || typeof value === "function";
}

export function isPlainObject(value) {
  // For null and undefined.
  if (value == null) {
    return false;
  }

  // Ensures it’s not an instance of a class (like new Date()) or an Array.
  const prototype = Object.getPrototypeOf(value);

  // covers Object.create(null) (object with no prototype at all)
  if (prototype === null) {
    return false;
  }

  // covers {} and new Object()
  return prototype === Object.prototype;
}
