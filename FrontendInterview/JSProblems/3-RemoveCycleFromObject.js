// Given an object with a cycle, remove the cycle or circular reference from it.

const List = function (val) {
  this.next = null;
  this.val = val;
};

const item1 = new List(10);
const item2 = new List(20);
const item3 = new List(30);

item1.next = item2;
item2.next = item3;
item3.next = item1;

// this form a cycle, if you console.log this you will see a circular object,
// like, item1 -> item2 -> item3 -> item1 -> so on.

// If you see the above example, we have created a list object,
// that accepts a value and pointer to the next item in the list,
// similar to a linked list, and using this we have created the circular object.

// We have to create a function that will break this cycle,
// in this example to break the cycle we will have to delete the next pointer of the item3.

// Solution
// There are two places where this cycle removal can take place:
// For normal use of Object
// While creating the JSON string

// Normal use
// We can use WeakSet which is used to store only unique object references
// and detect if the given object was previously detected or not, if it was detected then delete it.

const removeCycle = (root) => {
  // You could use Set, but WeakSet has two important advantages
  // WeakSet holds weak references.
  // WeakSet only allows objects
  const seen = new WeakSet();

  function iterate(obj) {
    // Stop if value is NOT an object (numbers, strings, null, undefined, etc.)
    if (obj === null || typeof obj !== "object") return;

    // If we have already visited this object, stop to avoid infinite loops
    if (seen.has(obj)) return;
    // Mark this object as visited
    seen.add(obj);

    // ----------------------------
    // CASE 1: If `obj` is an ARRAY
    // ----------------------------
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        const value = obj[i];

        // Only objects can form cycles; skip primitives
        if (value && typeof value === "object") {
          // If we have seen this object before → CYCLE FOUND
          if (seen.has(value)) {
            // For arrays, replace cycle with null so array doesn't break
            obj[i] = null;
          } else {
            // Otherwise keep walking deeper into nested objects
            iterate(value);
          }
        }
      }
    } else {
      // ----------------------------
      // CASE 2: If `obj` is a NORMAL OBJECT
      // ----------------------------

      // Loop through own properties only
      // Avoid for in - If someone extends Object.prototype, your loop will pick those properties too
      //   Object.prototype.test = 123;
      //   const obj = { a: 1 };
      //   for (let key in obj) {
      //     console.log(key);
      //   }
      for (const key of Object.keys(obj)) {
        const value = obj[key];
        // Only objects can form cycles; skip primitives
        if (value && typeof value === "object") {
          // If this object already exists in the WeakSet → CYCLE FOUND
          if (seen.has(value)) {
            // For objects, we delete the circular reference property
            delete obj[key];
          } else {
            // Explore deeper nested objects
            iterate(value);
          }
        }
      }
    }
  }

  iterate(root);
};

removeCycle(item1);
console.log(item1);

// Two-Pointer (Floyd Cycle Detection) instead of WeakSet?
// Works only for singly linked lists
// Requires a .next pointer
// Cannot detect cycles in general JS objects
// Very fast (O(1) memory)
// Used for classic data structure problems
