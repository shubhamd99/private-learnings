/**
 * @template T
 * @param {T} value
 * @return {T}
 */
export default function deepClone(obj) {
  // handle primitives and null
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // handle arrays
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }

  // handle objects
  const result = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]); // recurse into every value
    }
  }

  return result;
}
