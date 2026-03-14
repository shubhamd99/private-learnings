# Difference between `let`, `var`, and `const` in JavaScript

In JavaScript, `var`, `let`, and `const` are used to declare variables. They differ in scope, initialization, redeclaration, reassignment, and hoisting behavior.

## Quick Comparison Table

| Feature | `var` | `let` | `const` |
| :--- | :--- | :--- | :--- |
| **Scope** | Function or Global | Block | Block |
| **Initialization** | Optional | Optional | Required |
| **Redeclaration**| Yes | No | No |
| **Reassignment** | Yes | Yes | No |
| **Access before declaration**| Returns `undefined` | `ReferenceError` (TDZ) | `ReferenceError` (TDZ) |

## Key Differences Explained

### 1. Scope
- **`var`**: Scoped to the entire function (or globally if declared outside a function). It ignores block scopes (like `if` statements or `for` loops).
- **`let` and `const`**: Block-scoped. They are restricted to the nearest set of curly braces `{ ... }` they were defined in.

### 2. Initialization
- **`var` and `let`**: Can be declared without an initial value (they default to `undefined`).
- **`const`**: Must be initialized with a value at the time of declaration. Otherwise, it throws a `SyntaxError`.

### 3. Redeclaration
- **`var`**: Allows redeclaring the same variable multiple times without any errors.
- **`let` and `const`**: Throws a `SyntaxError` if you try to redeclare them in the same scope.

### 4. Reassignment
- **`var` and `let`**: Allow you to update or reassign the variable's value later.
- **`const`**: Cannot be reassigned. Attempting to do so throws a `TypeError`. *(Note: Although the reference cannot be reassigned, the contents of objects and arrays declared with `const` can still be mutated.)*

### 5. Accessing Before Declaration (Hoisting)
- **`var`**: Hoisted to the top of its scope and initialized with `undefined`. Accessing it before declaration returns `undefined` instead of crashing.
- **`let` and `const`**: Technically hoisted, but placed in a **Temporal Dead Zone (TDZ)** from the start of the block until the declaration is processed. Accessing them before the declaration throws a `ReferenceError`.

## Best Practices
1. **Use `const` by default** for variables that don't need to be reassigned to prevent accidental changes and promote predictability.
2. **Use `let`** when you need a variable that will be reassigned (e.g., loop counters or accumulators).
3. **Avoid `var`** in modern JavaScript due to its unpredictable scoping and hoisting behaviors. (If targeting older environments, use `let` and `const` with a transpiler like Babel).
