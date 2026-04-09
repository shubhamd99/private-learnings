// Group By / Merge Array of Objects
// Given an array of objects, group them by a key and merge values.
// (Similar to the gym sessions mergeData problem)
//
// Input (groupBy):
//   items = [{ name: "Alice", dept: "eng" }, { name: "Bob", dept: "eng" }, { name: "Carol", dept: "hr" }]
//   key   = "dept"
// Output: { "eng": [Alice, Bob], "hr": [Carol] }
//
// Input (mergeByKey):
//   items = [{ user: 1, duration: 30 }, { user: 2, duration: 50 }, { user: 1, duration: 20 }]
// Output: [{ user: 1, duration: 50 }, { user: 2, duration: 50 }]

// ---- VARIATION 1: Group by a key (return Map of arrays) ----
// Idea: iterate items, use the grouping key as a Map key, push each item into its group.

function groupBy(items, keyFn) {
  const map = new Map();

  for (const item of items) {
    const key = typeof keyFn === "function" ? keyFn(item) : item[keyFn];
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(item);
  }

  return map;
}

// Example
const people = [
  { name: "Alice", dept: "eng" },
  { name: "Bob", dept: "eng" },
  { name: "Carol", dept: "hr" },
];
console.log(groupBy(people, "dept"));
// Map { "eng" => [{Alice}, {Bob}], "hr" => [{Carol}] }

// ---- VARIATION 2: Merge (accumulate) by key ----
// Idea: same Map approach but accumulate numeric fields instead of collecting arrays.
// This is the gym sessions / mergeData pattern.

function mergeByKey(items, keyField, sumField) {
  const map = new Map();

  for (const item of items) {
    const key = item[keyField];
    if (map.has(key)) {
      map.get(key)[sumField] += item[sumField]; // accumulate
    } else {
      map.set(key, { ...item }); // clone to avoid mutating input
    }
  }

  return Array.from(map.values());
}

// Example
const sessions = [
  { user: 1, duration: 30 },
  { user: 2, duration: 50 },
  { user: 1, duration: 20 },
];
console.log(mergeByKey(sessions, "user", "duration"));
// [{ user: 1, duration: 50 }, { user: 2, duration: 50 }]

// Time: O(n) for both
// Space: O(n)
