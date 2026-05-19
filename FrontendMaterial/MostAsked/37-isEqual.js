function isEqual(a, b) {
  // Handles primitives, NaN, +0/-0, same reference
  if (Object.is(a, b)) return true;

  // If one is primitive/null and other is object
  if (
    a === null ||
    b === null ||
    typeof a !== "object" ||
    typeof b !== "object"
  ) {
    return false;
  }

  // Get all keys including Symbol keys
  // For arrays -> ["0", "1", ..., "length"] - arrays are objects + Reflect.ownKeys() gives numeric indexes
  const keysA = Reflect.ownKeys(a); // Reflect API Reflect.ownKeys() was introduced in ES6 (ECMAScript 2015).
  const keysB = Reflect.ownKeys(b);

  // Different number of keys => not equal
  if (keysA.length !== keysB.length) return false;

  // Compare every key recursively
  for (const key of keysA) {
    // Key missing in second object
    if (!keysB.includes(key)) return false;

    // Deep compare values, Arrays work automatically because indexes are keys
    // Example: [1,2] => "0", "1", "length"
    if (!isEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
}

const id = Symbol("id");

const obj1 = {
  name: "Shubham",
  age: 26,
  skills: ["React", "RN"],
  address: {
    city: "Pune",
  },
  [id]: 101,
};

const obj2 = {
  name: "Shubham",
  age: 26,
  skills: ["React", "RN"],
  address: {
    city: "Pune",
  },
  [id]: 101,
};

console.log(isEqual(obj1, obj2)); // true

function isEqualAllTypes(a, b, visited = new WeakMap()) {
  // Handles primitives, NaN, +0, -0, same reference
  if (Object.is(a, b)) return true;

  // If one is primitive/null and other is object
  if (
    a === null ||
    b === null ||
    typeof a !== "object" ||
    typeof b !== "object"
  ) {
    return false;
  }

  // Handle circular references
  if (visited.has(a)) {
    return visited.get(a) === b;
  }
  visited.set(a, b);

  // Different constructors
  if (a.constructor !== b.constructor) return false;

  // Date
  if (a instanceof Date) {
    return Object.is(a.getTime(), b.getTime());
  }

  // RegExp
  if (a instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }

  // Array
  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i], visited)) return false;
    }

    return true;
  }

  // Map
  if (a instanceof Map) {
    if (a.size !== b.size) return false;

    for (const [key, value] of a) {
      if (!b.has(key)) return false;
      if (!isEqual(value, b.get(key), visited)) return false;
    }

    return true;
  }

  // Set
  if (a instanceof Set) {
    if (a.size !== b.size) return false;

    for (const value of a) {
      if (!b.has(value)) return false;
    }

    return true;
  }

  // Object keys including Symbol keys
  const keysA = Reflect.ownKeys(a);
  const keysB = Reflect.ownKeys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;

    if (!isEqual(a[key], b[key], visited)) {
      return false;
    }
  }

  return true;
}

const sym1 = Symbol("id");

const obj3 = {
  name: "Shubham",
  age: 26,
  createdAt: new Date("2025-01-01"),
  pattern: /abc/gi,
  skills: ["React", "RN"],
  scores: new Map([
    ["math", 90],
    ["science", 95],
  ]),
  tags: new Set(["frontend", "mobile"]),
  nested: {
    city: "Pune",
  },
  [sym1]: 100,
};

const obj4 = {
  name: "Shubham",
  age: 26,
  createdAt: new Date("2025-01-01"),
  pattern: /abc/gi,
  skills: ["React", "RN"],
  scores: new Map([
    ["math", 90],
    ["science", 95],
  ]),
  tags: new Set(["frontend", "mobile"]),
  nested: {
    city: "Pune",
  },
  [sym1]: 100,
};

console.log(isEqualAllTypes(obj3, obj4));
