// Object Flatten (All Levels)

function flattenObject(obj, prefix = "") {
  const result = {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        // value is object → recurse deeper
        Object.assign(result, flattenObject(obj[key], fullKey));
      } else {
        // primitive or array → store as is
        result[fullKey] = obj[key];
      }
    }
  }

  return result;
}

// Usage
const obj = {
  a: {
    b: {
      c: 10,
      d: 20,
    },
    e: 30,
  },
  f: 40,
  g: {
    h: {
      i: {
        j: 50,
      },
    },
  },
};

console.log(flattenObject(obj));

// {
//   'a.b.c': 10,
//   'a.b.d': 20,
//   'a.e':   30,
//   'f':     40,
//   'g.h.i.j': 50
// }
