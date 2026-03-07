// ⁠⁠Check path exists or not in given Object.
// Write method findPath(key, path) and it return value
// if path exists for the given object,
// else return undefined value.
// Ex -> findPath(obj, 'a.b.c') where obj ={ a: {b: c: 10}}

function findPath(obj, path) {
  const keys = path.split("."); // 'a.b.c' → ['a', 'b', 'c']

  let current = obj;

  for (let key of keys) {
    if (current === null || current === undefined || !(key in current)) {
      return undefined; // Path doesn't exist
    }
    current = current[key]; // Move to the next level
  }

  return current; // Return the value at the specified path
}

// Usage
const obj = {
  a: {
    b: {
      c: 10,
    },
  },
  x: {
    y: 20,
  },
};

console.log(findPath(obj, "a.b.c")); // 10
console.log(findPath(obj, "a.b")); // { c: 10 }
console.log(findPath(obj, "x.y")); // 20
console.log(findPath(obj, "a.b.z")); // undefined path doesn't exist
console.log(findPath(obj, "a.x.y")); // undefined path doesn't exist

// Recursive approach
function findPathRecursive(obj, path) {
  const keys = path.split(".");
  const [first, ...rest] = keys;

  if (!(first in obj)) return undefined; // key doesn't exist

  if (rest.length === 0) return obj[first]; // last key → return value

  return findPathRecursive(obj[first], rest.join(".")); // recurse deeper
}

console.log(findPathRecursive(obj, "a.b.c")); // 10
console.log(findPathRecursive(obj, "a.b.z")); // undefined
