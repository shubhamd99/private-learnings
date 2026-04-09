// Implement a function that returns a new object after squashing the input object
// into a single level of depth where nested keys are "squashed" together
// with a period delimiter (.).

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function squashObject(obj, prefix = "") {
  const result = {};

  // typeof []   // "object"
  // typeof {}   // "object"

  // for...in works on both
  // for (let key in ['hi', 'bye']) → key = '0', '1'
  // for (let key in { a: 1, b: 2 }) → key = 'a', 'b'

  for (let key in obj) {
    // skip non-own properties
    // eg. proto properties
    if (!Object.hasOwn(obj, key)) {
      continue;
    }

    // skip empty key in path — use prefix directly
    const fullKey = !key
      ? prefix // key is empty → just use prefix
      : prefix
        ? `${prefix}.${key}` // has prefix → prefix.key
        : key; // no prefix → just key
    const value = obj[key];

    const isObject = typeof value === "object" && value !== null;
    const isArray = Array.isArray(value);

    if (isObject || isArray) {
      // recurse into both objects AND arrays
      Object.assign(result, squashObject(value, fullKey));
    } else {
      // primitive → store with full dotted key
      result[fullKey] = value;
    }
  }

  return result;
}

const object = {
  a: 5,
  b: 6,
  c: {
    f: 9,
    g: {
      m: 17,
      n: 3,
    },
  },
};

squashObject(object); // { a: 5, b: 6, 'c.f': 9, 'c.g.m': 17, 'c.g.n': 3 }

const object2 = {
  a: { b: null, c: undefined },
};
squashObject(object2); // { 'a.b': null, 'a.c': undefined }

const object3 = { a: { b: [1, 2, 3], c: ["foo"] } };
squashObject(object3); // { 'a.b.0': 1, 'a.b.1': 2, 'a.b.2': 3, 'a.c.0': 'foo' }

// Empty keys should be treated as if that "layer" doesn't exist.
const object4 = {
  foo: {
    "": { "": 1, bar: 2 },
  },
};
squashObject(object4); // { foo: 1, 'foo.bar': 2 }

// ---- SIMPLE VERSION (for interviews) ----
// Idea: recurse through the object, building up a dotted key path.
// If the value is an object/array, go deeper with the accumulated prefix.
// If it's a primitive (including null/undefined), write it to the result.
// Empty string keys are skipped in the path — use prefix directly.
function squashObject(obj, prefix = "") {
  const result = {};

  for (const key in obj) {
    // skip non-own properties
    if (!Object.hasOwn(obj, key)) continue;

    // skip empty key segment — don't add a stray dot
    const fullKey = !key ? prefix : prefix ? `${prefix}.${key}` : key;
    const value = obj[key];

    if (typeof value === "object" && value !== null) {
      // recurse into nested objects AND arrays (arrays have numeric string keys)
      Object.assign(result, squashObject(value, fullKey));
    } else {
      result[fullKey] = value; // primitive — store at dotted path
    }
  }

  return result;
}
