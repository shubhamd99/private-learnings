// Implement a function deepOmit(obj, keys) that removes specified keys
// and their corresponding values from an object
// including nested objects or arrays
// It works recursively to traverse through the entire object structure
// ensuring that all occurrences of the specified keys are removed at all levels
// The function takes in an object (obj) and an array of string keys (keys).

// Clarification questions
// Can there be values like Date, Symbol, RegExp within the objects?

// Should we recurse into Maps and Sets?
// To keep the question simple, no. There are no tests cases containing Maps and Sets but you are free to add support if you wish.

/**
 * @param {any} val
 * @param {Array<string>} keys
 * @returns any
 */
export default function deepOmit(val, keys) {
  // handle arrays
  // Case 1 — Array → recurse into each item
  if (Array.isArray(val)) {
    return val.map((item) => deepOmit(item, keys));
  }

  // Handle objects
  // Case 2 — Object → skip omitted keys, recurse into values
  if (isPlainObject(val)) {
    const newObj = {};

    for (const key in val) {
      if (!keys.includes(key)) {
        newObj[key] = deepOmit(val[key], keys); // recurse deeper
      }
    }

    return newObj;
  }

  // Case 3 — Primitive → just return as is
  return val;
}

function isPlainObject(value) {
  if (value === null) {
    return false;
  }

  // getPrototypeOf returns null for primitive values
  // prototype === Object.prototype for plain objects
  // plain objects are created using object literals or the Object constructor
  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}

deepOmit({ a: 1, b: 2, c: 3 }, ["b"]); // { a: 1, c: 3 }

const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
  },
  f: [5, 6],
};
deepOmit(obj, ["b", "c", "e"]); // { a: 1, f: [5, 6] }

// ### Trace

// deepOmit({ a:1, b:2, c: { b:3, d:4 } }, ['b'])

// isPlainObject → loop keys

//   key='a' → 'a' in ['b']? → newObj.a = deepOmit(1, ['b'])
//               → primitive → return 1
//               → newObj = { a: 1 }

//   key='b' → 'b' in ['b']? → SKIP

//   key='c' → 'c' in ['b']? → newObj.c = deepOmit({ b:3, d:4 }, ['b'])
//               isPlainObject → loop keys
//                 key='b' → SKIP
//                 key='d' → newObj.d = deepOmit(4, ['b']) → 4
//               → return { d: 4 }
//               → newObj = { a:1, c: { d:4 } }

// return { a:1, c: { d:4 } }
