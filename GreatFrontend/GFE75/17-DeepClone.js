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

// ---- SIMPLE VERSION (for interviews) ----
// Idea: if value is a primitive or null, return it as-is.
// If it's an array, map each item recursively.
// If it's an object, iterate keys and recurse into each value.
function deepClone(value) {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(deepClone);

  const clone = {};
  for (const key in value) {
    clone[key] = deepClone(value[key]);
  }
  return clone;
}
