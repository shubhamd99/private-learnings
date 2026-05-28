// memoize single args
function memoizeSingleArg(fn) {
  const cache = new Map();

  return function (arg) {
    const key = arg;

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(arg);
    cache.set(key, result);

    return result;
  };
}

function square(num) {
  console.log("Calculating square...");
  return num * num;
}

const memoizedSquare = memoizeSingleArg(square);

console.log(memoizedSquare(4)); // Calculating square... 16
console.log(memoizedSquare(4)); // 16 (from cache)
console.log(memoizedSquare(5)); // Calculating square... 25

// memoize multiple args
function memoizeMultipleArgs(fn) {
  const cache = new Map();

  return function (...args) {
    const key = args.join("-");

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);

    return result;
  };
}

function add(a, b, c) {
  console.log("Calculating sum...");
  return a + b + c;
}

const memoizedAdd = memoizeMultipleArgs(add);

console.log(memoizedAdd(1, 2, 3)); // Calculating sum... 6
console.log(memoizedAdd(1, 2, 3)); // 6 (from cache)
console.log(memoizedAdd(2, 3, 4)); // Calculating sum... 9

// memoize with object as arg
function memoizeObjectArg(fn) {
  const cache = new Map();

  return function (obj) {
    const key = JSON.stringify(obj);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(obj);
    cache.set(key, result);

    return result;
  };
}

function getFullName(user) {
  console.log("Calculating full name...");
  return `${user.firstName} ${user.lastName}`;
}

const memoizedFullName = memoizeObjectArg(getFullName);

console.log(memoizedFullName({ firstName: "Shubham", lastName: "D" })); // Calculating full name... Shubham D
console.log(memoizedFullName({ firstName: "Shubham", lastName: "D" })); // Shubham D (from cache)
console.log(memoizedFullName({ firstName: "Jane", lastName: "Doe" })); // Calculating full name... Jane Doe

// memoize one: only latest value in cache
function memoizeOne(fn) {
  let lastArgs = null;
  let lastResult;

  return function (...args) {
    const isSameArgs =
      lastArgs !== null &&
      lastArgs.length === args.length &&
      // Index matters here because we compare argument positions.
      // Example: merge(obj1, obj2) and merge(obj2, obj1) can return different results.
      // Object.is compares primitives by value and objects/arrays by reference.
      args.every((arg, index) => Object.is(arg, lastArgs[index]));

    if (isSameArgs) {
      return lastResult;
    }

    lastArgs = args;
    lastResult = fn(...args);

    return lastResult;
  };
}

function mergeObjects(...objects) {
  console.log("Merging objects...");
  return Object.assign({}, ...objects);
}

const baseUser = { id: 1, name: "Shubham" };
const userUpdates = { role: "Frontend" };
const userMeta = { source: "api", active: true };
const memoizedMergeObjects = memoizeOne(mergeObjects);

console.log(memoizedMergeObjects(baseUser, userUpdates, userMeta)); // Merging objects... { id: 1, name: "Shubham", role: "Frontend", source: "api", active: true }
console.log(memoizedMergeObjects(baseUser, userUpdates, userMeta)); // Same result from cache
console.log(
  memoizedMergeObjects({ id: 1, name: "Shubham" }, userUpdates, userMeta),
); // Merging objects... new object reference
console.log(memoizedMergeObjects(baseUser, userUpdates, userMeta)); // Merging objects... only latest call was cached

// memoize one with nested object support
function deepEqual(value1, value2) {
  if (Object.is(value1, value2)) {
    return true;
  }

  if (
    typeof value1 !== "object" ||
    typeof value2 !== "object" ||
    value1 === null ||
    value2 === null
  ) {
    return false;
  }

  if (Array.isArray(value1) !== Array.isArray(value2)) {
    return false;
  }

  const keys1 = Object.keys(value1);
  const keys2 = Object.keys(value2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  // Key order does not matter here.
  // We take each key from value1 and check if the same key exists in value2.
  // Then we compare values by key name, not by key position.
  for (const key of keys1) {
    if (!Object.hasOwn(value2, key)) {
      return false;
    }

    if (!deepEqual(value1[key], value2[key])) {
      return false;
    }
  }

  return true;
}

function memoizeOneDeep(fn) {
  let lastArgs = null;
  let lastResult;

  return function (...args) {
    const isSameArgs =
      lastArgs !== null &&
      lastArgs.length === args.length &&
      args.every((arg, index) => deepEqual(arg, lastArgs[index]));

    if (isSameArgs) {
      return lastResult;
    }

    lastArgs = args;
    lastResult = fn(...args);

    return lastResult;
  };
}

function mergeNestedObjects(...objects) {
  console.log("Merging nested objects...");
  return Object.assign({}, ...objects);
}

const memoizedMergeNestedObjects = memoizeOneDeep(mergeNestedObjects);

console.log(
  memoizedMergeNestedObjects(
    { id: 1, profile: { name: "Shubham", skills: ["JS", "React"] } },
    { meta: { active: true } },
  ),
); // Merging nested objects...

console.log(
  memoizedMergeNestedObjects(
    { id: 1, profile: { name: "Shubham", skills: ["JS", "React"] } },
    { meta: { active: true } },
  ),
); // Same result from cache because nested values are equal

console.log(
  memoizedMergeNestedObjects(
    { profile: { skills: ["JS", "React"], name: "Shubham" }, id: 1 },
    { meta: { active: true } },
  ),
); // Same result from cache because object key order does not matter

console.log(
  memoizedMergeNestedObjects(
    { id: 1, profile: { name: "Shubham", skills: ["JS", "React", "CSS"] } },
    { meta: { active: true } },
  ),
); // Merging nested objects... nested array changed
