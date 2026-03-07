// Write a function printAllKeysInObject(obj) that outputs
// the given object into this pattern: { 'a.b': 1, 'e.f.g': 2, 'e.f.h': 3 }

function printAllKeysInObject(obj, prefix = "") {
  const result = {};

  for (let key in obj) {
    //  fullKey is the key with the prefix (if any) added to it. If there is a prefix,
    // we concatenate it with the current key using a dot. If there is no prefix,
    // we just use the current key as is.
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof obj[key] === "object" && obj[key] !== null) {
      // object.assign is used to merge the result of the recursive call
      // into the current result object. This way,
      // we accumulate all the key-value pairs from the nested objects \
      // into a single flat object with dot-separated keys.
      Object.assign(result, printAllKeysInObject(obj[key], fullKey));
    } else {
      result[fullKey] = obj[key];
    }
  }

  return result;
}

// Usage
const obj = {
  a: { b: 1 },
  e: { f: { g: 2, h: 3 } },
};

console.log(printAllKeysInObject(obj));
// { 'a.b': 1, 'e.f.g': 2, 'e.f.h': 3 }

// ### How it works

// obj = { a: { b: 1 }, e: { f: { g: 2, h: 3 } } }

// key = 'a' → value is object → recurse with prefix 'a'
//   key = 'b' → value is 1 (not object) → store 'a.b': 1

// key = 'e' → value is object → recurse with prefix 'e'
//   key = 'f' → value is object → recurse with prefix 'e.f'
//     key = 'g' → value is 2 → store 'e.f.g': 2
//     key = 'h' → value is 3 → store 'e.f.h': 3

// Result: { 'a.b': 1, 'e.f.g': 2, 'e.f.h': 3 }

// Time O(n) — visits every key once
// Space O(n + d) — n for result, d for call stack depth
