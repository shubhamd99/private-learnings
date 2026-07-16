// Shallow Copy vs Deep Copy

const obj = { a: 1, b: { c: 2 } };

// Built in JS method
JSON.parse(JSON.stringify(obj));
structuredClone(obj); // New way

// Shallow copy — nested objects are still REFERENCED
// const shallow = { ...obj };
// shallow.b.c = 99;
// console.log(obj.b.c); // 99 ← original changed!

// Deep copy — everything is CLONED
// const deep = deepCopy(obj);
// deep.b.c = 99;
// console.log(obj.b.c); // 2 ← original safe!

function shallowCopy(obj) {
  return { ...obj };
}

function shallowCopy2(obj) {
  const result = {};

  for (let key in obj) {
    // ignore inherited properties
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key]; // just copy reference
    }
  }

  return result;
}

// Usage
const copy = shallowCopy2(obj);
copy.a = 99;
console.log(obj.a); // 1  primitive is safe
copy.b.c = 99;
console.log(obj.b.c); // 99 nested object is shared

function deepCopy(obj) {
  // handle primitives and null
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // handle arrays
  if (Array.isArray(obj)) {
    return obj.map((item) => deepCopy(item));
  }

  // handle objects
  const result = {};
  for (let key in obj) {
    // ignore inherited properties
    if (obj.hasOwnProperty(key)) {
      result[key] = deepCopy(obj[key]); // recurse into every value
    }
  }

  return result;
}

// Usage
const obj2 = { a: 1, b: { c: { d: 2 } } };
const deepCopyResult = deepCopy(obj2);

deepCopyResult.b.c.d = 99;
console.log(obj2.b.c.d); // 2 original untouched
