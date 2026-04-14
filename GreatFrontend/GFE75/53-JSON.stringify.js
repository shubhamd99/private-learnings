// Implement a function jsonStringify, similar to JSON.stringify
// that converts a JavaScript value into a JSON string.

// Because non-primitive values can contain both primitive and non-primitive values,
// we have to use a recursive solution.

// We can think of the values like a tree.
// Primitive values are nodes that do not have children
// and array/object types are nodes that have children of any value type

// We can convert each node into a tree by converting each of its children into strings

// We can work upwards from the "leaf" nodes
// which in this case is primitive values because they cannot contain any children
// and build the string up from the leaf nodes all the way to the root

// Let's define how to stringify each value type:
// null: Directly convert it into the string null
// Boolean: Directly convert true/false into a string via String()
// Strings: We have to wrap the value with double quotes as strings use double quotes
// Arrays: Recursively stringify each child item, then concatenate them with a comma, and wrap them in square brackets: [ and ]
// Objects: Convert each key/value pair (also called an entry) into a "key":{stringifiedValue} format by recursively stringifying the values,
// concatenate them with a comma, and wrap them in braces: { and }

// Since null, boolean, numbers can produce the desired string just by using String()
// we can handle them together as the default case at the bottom

// Arrays: Use Array.isArray()
// Objects: Use typeof value === 'object' && value !== null, typeof null is 'object' but we have to handle nulls differently
// Strings: Use typeof value === 'string'

/**
 * @param {*} value
 * @return {string}
 */
export default function jsonStringify(value) {
  // Array → recurse each item, wrap in []
  if (Array.isArray(value)) {
    const items = value.map((item) => jsonStringify(item));
    return `[${items.join(",")}]`;
  }

  // Object → recurse each value, wrap in {}
  if (typeof value === "object" && value !== null) {
    const pairs = Object.entries(value).map(
      ([key, val]) => `"${key}":${jsonStringify(val)}`,
    );
    return `{${pairs.join(",")}}`;
  }

  // String → wrap in quotes
  if (typeof value === "string") {
    return `"${value}"`;
  }

  // number, boolean, null → just convert to string
  return String(value);
}

jsonStringify({ foo: "bar" }); // '{"foo":"bar"}'
jsonStringify({ foo: "bar", bar: [1, 2, 3] }); // '{"foo":"bar","bar":[1,2,3]}'
jsonStringify({ foo: true, bar: false }); // '{"foo":true,"bar":false}'

jsonStringify(null); // 'null'
jsonStringify(true); // 'true'
jsonStringify(false); // 'false'
jsonStringify(1); // '1'
jsonStringify("foo"); // '"foo"'

// ---- SIMPLE VERSION (for interviews) ----
// Idea: handle each type case-by-case. For arrays/objects recurse into children,
// for primitives convert directly. null check must come before object check (typeof null === 'object').

function jsonStringifySimple(value) {
  if (value === null) return "null";
  if (typeof value === "string") return `"${value}"`;
  if (typeof value === "number" || typeof value === "boolean")
    return String(value);

  if (Array.isArray(value)) {
    return `[${value.map(jsonStringifySimple).join(",")}]`;
  }

  if (typeof value === "object") {
    const pairs = Object.entries(value).map(
      ([k, v]) => `"${k}":${jsonStringifySimple(v)}`,
    );
    return `{${pairs.join(",")}}`;
  }
}
