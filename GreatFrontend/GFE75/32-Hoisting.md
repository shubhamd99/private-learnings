# Hoisting in JavaScript

## What is Hoisting?
**Hoisting** is a JavaScript mechanism where variable and function declarations are conceptually "moved" (or hoisted) to the top of their containing scope during the compilation phase, before the code is executed. 

**Key Rule:** Only the **declaration** is hoisted, not the **initialization** or assignment.

---

## Quick Summary Table: Accessing Before Declaration

| Declaration Type | Access Before Declaration Behavior |
| --- | --- |
| `var` | `undefined` |
| `let` / `const` | `ReferenceError` (Temporal Dead Zone) |
| `class` | `ReferenceError` |
| Function Expression (`var`) | `undefined` (Calling it throws a `TypeError: not a function`) |
| Function Declaration | **Normal** (Works perfectly) |
| `import` Statement | **Normal** (Side effects execute before rest of code) |

---

## Detailed Breakdown & Examples

### 1. Variables (`var`, `let`, `const`)
- **`var`:** The declaration is hoisted, and its initial value is set to `undefined`. 
  ```javascript
  console.log(foo); // undefined
  var foo = 1;
  ```
- **`let` & `const`:** The declaration is hoisted, but they are **not initialized**. Accessing them before their line of declaration causes a `ReferenceError`. The period between the start of the block and the actual declaration is called the **Temporal Dead Zone (TDZ)**.
  ```javascript
  console.log(y); // ReferenceError: Cannot access 'y' before initialization
  let y = 'local';
  ```

### 2. Classes
Like `let` and `const`, class declarations are hoisted but not initialized. Accessing them early throws a `ReferenceError`.
```javascript
new Foo(); // ReferenceError: Cannot access 'Foo' before initialization
class Foo {}
```

### 3. Functions
- **Function Declarations:** Both the declaration and the definition are fully hoisted. You can call the function safely before it appears in code.
  ```javascript
  foo(); // 'FOOOOO'
  function foo() { console.log('FOOOOO'); }
  ```
- **Function Expressions:** If defined using `var`, only the `var` declaration is hoisted (initialized to `undefined`). The function definition stays where it is.
  ```javascript
  console.log(bar); // undefined
  bar(); // TypeError: bar is not a function
  var bar = function() { console.log('BARRRR'); };
  ```
*(Note: Generator functions and async functions follow the same rules as standard functions depending on whether they are declarations or expressions).*

### 4. Imports
Import declarations are hoisted to the top of the module scope. Variables introduced by the import are available throughout the module, and the module's side effects run before the rest of the file's code.
```javascript
foo.doSomething(); // Works normally
import foo from './modules/foo';
```

---

## Under the Hood (ECMAScript Specifications)
In reality, the engine doesn't physically move your code. It works by scanning the scope before execution starts:
- **`var` bindings:** Created and immediately initialized with `undefined`.
- **`let` / `const` bindings:** Created, but they remain uninitialized until their actual line of code evaluates (this creates the Temporal Dead Zone). Accessing them early throws an error because the engine marks them as `<value unavailable>`.

---

## Modern Best Practices
1. **Avoid `var`:** Exclusively use `let` and `const` for predictable and safe scoping rules.
2. **Top-level Declarations:** Manually declare and initialize variables (and `import` statements) at the top of their scope to eliminate the mental overhead of tracking hoisting behavior.
3. **Use Linters:** Employ tools like ESLint with the following rules:
   - `no-use-before-define`: Warns if you reference an identifier before it is declared.
   - `no-undef`: Warns about usage of completely undeclared variables.
