# Null vs Undefined vs Undeclared in JavaScript

## TL;DR Comparison

| Trait | `null` | `undefined` | Undeclared |
| :--- | :--- | :--- | :--- |
| **Meaning** | Explicitly assigned to indicate "no value" | Declared but not assigned a value | Not declared at all |
| **Type (`typeof`)** | `'object'` (historical JS bug) | `'undefined'` | `'undefined'` |
| **Equality** | `null == undefined` is `true` | `undefined == null` is `true` | Accessing throws `ReferenceError` |

---

## 1. Undeclared
- **Definition:** Variables assigned a value without prior declaration (`var`, `let`, or `const`).
- **Scope Behavior:** It becomes a global variable, which is a bad practice (pollutes the global namespace).
- **Strict Mode:** Throws a `ReferenceError` upon assignment.
- **How to Check:** Use `typeof` (it safely returns `'undefined'` without throwing an error) or wrap the usage in a `try/catch` block.
- **Verdict:** Avoid at all costs!

**Example:**
```javascript
function foo() {
  x = 1; // Throws ReferenceError in strict mode
}
foo();

// Safe check
console.log(typeof y === 'undefined'); // true
```

## 2. Undefined
- **Definition:** A variable that has been declared but has not been assigned a value. Also the default return value of functions that don't explicitly return anything.
- **How to Check:** Use strict equality (`=== undefined`) or `typeof === 'undefined'`. 
  - *Warning:* Do not use loose equality (`==`) to check strictly for `undefined`, as it also matches `null`.

**Example:**
```javascript
let foo;
console.log(foo === undefined); // true
console.log(typeof foo === 'undefined'); // true

function bar() {} 
console.log(bar()); // undefined
```

## 3. Null
- **Definition:** An intentional assignment by a developer to indicate "no value" or an empty state.
- **How to Check:** Use strict equality (`=== null`).
  - *Warning:* `typeof null` returns `'object'` (this is a known JavaScript legacy bug).
  - *Warning:* Do not use loose equality (`==`) to check strictly for `null`, as it also matches `undefined`.

**Example:**
```javascript
const foo = null;
console.log(foo === null); // true
console.log(typeof foo === 'object'); // true
```

---

## 📝 Best Practices
1. **Always declare variables** before using them (`const` or `let`) to prevent undeclared global variables.
2. **Never leave variables intentionally unassigned.** If it needs a non-value state, explicitly assign `null` to it so other developers know it's intentional.
3. **Use static analysis tools** (like ESLint or TypeScript) to automatically catch undeclared variables and type errors during development.

---

## 💻 Practice: Type Utilities

Here are implementations for common type utility functions to check for `null` and `undefined`.

```javascript
/**
 * Checks if a value is strictly null.
 * 
 * @param {*} value The value to check.
 * @returns {boolean} Returns true if value is null, else false.
 */
export function isNull(value) {
  return value === null;
}

/**
 * Checks if a value is strictly undefined.
 * 
 * @param {*} value The value to check.
 * @returns {boolean} Returns true if value is undefined, else false.
 */
export function isUndefined(value) {
  return value === undefined;
}

/**
 * Checks if a value is "nullish" (either null or undefined).
 * 
 * @param {*} value The value to check.
 * @returns {boolean} Returns true if value is null or undefined, else false.
 */
export function isNullish(value) {
  // Using loose equality == is a shortcut to check for both null and undefined
  return value == null; 
}
```
