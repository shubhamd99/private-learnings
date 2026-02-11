# Prototype Pollution Attacks

Prototype Pollution is a vulnerability specific to JavaScript that allows an attacker to modify the prototype of an object. Since JavaScript is a prototype-based language, modifying a base prototype (like `Object.prototype`) affects all objects in the application, leading to severe security risks like **Arbitrary Code Execution (ACE)**, **Denial of Service (DoS)**, and **Privilege Escalation**.

---

## 1. Understanding the Core Concept

### What is a Prototype?

In JavaScript, objects inherit properties and methods from other objects called **Prototypes**.

- Every object has an internal `[[Prototype]]` (accessible via `__proto__`).
- **Prototype Chain**: If a property is not found on an object, JavaScript looks up the chain until it reaches `null`.

### The Vulnerability

If an application allows an attacker to control the keys of an object being merged or assigned, they can target the `__proto__` property to inject malicious data into the global `Object.prototype`.

```javascript
let user = {};
console.log(user.isAdmin); // undefined

// Attacker pollutes the prototype
Object.prototype.isAdmin = true;

console.log(user.isAdmin); // true (All objects are now affected!)
```

---

## 2. Common Attack Vectors

### A. Deep Merge Functions

Recursive functions that merge two objects without checking for "magical" keys like `__proto__`, `constructor`, or `prototype`.

```javascript
function merge(target, source) {
  for (let key in source) {
    if (typeof source[key] === "object") {
      if (!target[key]) target[key] = {};
      merge(target[key], source[key]); // Vulnerable recursive call
    } else {
      target[key] = source[key];
    }
  }
}

// Attacker input
let attackerSource = JSON.parse('{"__proto__": {"polluted": "yes"}}');
merge({}, attackerSource);
console.log({}.polluted); // "yes"
```

### B. Property Assignment / JSON Parsing

Functions that parse user-provided JSON or query strings and directly assign them to objects.

- **Example**: `Object.assign(target, JSON.parse(userInput))`

---

## 3. Impact of Attacks

1.  **Arbitrary Code Execution (ACE)**: Injecting properties that are later used in dangerous functions like `eval()` or `child_process.exec()`.
2.  **Denial of Service (DoS)**: Adding properties that cause logic to crash or enter infinite loops.
3.  **Privilege Escalation**: Setting properties like `isAdmin: true` on the prototype so all users gain admin rights.
4.  **Bypassing Security**: Overwriting validation tokens or configuration settings.

---

## 4. Prevention & Mitigation

### A. Use `Object.create(null)`

Create objects that have **no prototype** at all. They won't inherit anything from `Object.prototype`.

```javascript
const safeObj = Object.create(null);
```

### B. Input Validation & Filtering

Always check and block sensitive keys like `__proto__`, `constructor`, and `prototype` before merging.

```javascript
function isSafeKey(key) {
  return key !== "__proto__" && key !== "constructor" && key !== "prototype";
}
```

### C. Use `Map` instead of Plain Objects

`Map` is not vulnerable to prototype pollution as it doesn't use the standard prototype chain for storing data.

### D. Freeze the Prototype

Prevent any modifications to the base prototypes at the start of your application.

```javascript
Object.freeze(Object.prototype);
```

### E. Modern Safe Methods

- Use `Object.hasOwn(obj, key)` instead of just checking `obj[key]`.
- Use updated libraries (Lodash 4.17.15+ contains fixes).

---

## 5. Real-World Case Studies

| Library/Framework | CVE ID         | Description                                                                   |
| :---------------- | :------------- | :---------------------------------------------------------------------------- |
| **Lodash**        | CVE-2019-10744 | Vulnerability in `_.merge` allowed prototype pollution via `__proto__`.       |
| **jQuery**        | CVE-2019-11358 | The `$.extend(true, ...)` (deep merge) was vulnerable.                        |
| **Express.js**    | -              | Vulnerable middleware parsing user input could lead to server-side pollution. |
| **Node-Red**      | CVE-2021-22112 | Allowed injection of properties during flow configuration processing.         |

---

## 6. Detection Tools

- **Static Analysis**: ESLint rules (`no-proto`).
- **SCA Tools**: `npm audit`, Snyk, Retire.js to find vulnerable dependencies.
- **Dynamic Analysis**: Fuzz testing with malformed JSON payloads.
