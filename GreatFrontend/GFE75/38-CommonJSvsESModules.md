# CommonJS vs ES Modules

Modules in JavaScript help organize code into reusable and maintainable units, promoting separation of concerns.

## CommonJS
- **Origin**: Older module system initially designed for server-side JavaScript (Node.js).
- **Syntax**: Uses `require()` for importing and `module.exports` or `exports` for exporting.
- **Loading**: Synchronous and dynamic (loaded at runtime).
- **Environment**: Primarily Node.js.
- **Optimization**: Limited optimization due to its dynamic nature.

**Example**:
```javascript
// my-module.js
const value = 42;
module.exports = { value };

// main.js
const myModule = require('./my-module.js');
console.log(myModule.value); // 42
```

## ES Modules (ESM)
- **Origin**: The standardized module system introduced in ES6 (ECMAScript 2015).
- **Syntax**: Uses `import` for importing and `export` for exporting.
- **Loading**: Asynchronous and static (resolved at compile-time).
- **Environment**: Designed for both modern browsers and Node.js.
- **Optimization**: Enables static analysis, allowing for powerful optimizations like **tree-shaking**.

**Example**:
```javascript
// my-module.js
export const value = 42;

// main.js
import { value } from './my-module.js';
console.log(value); // 42
```

## Key Differences

| Feature | CommonJS | ES Modules |
| :--- | :--- | :--- |
| **Syntax** | `require()` / `module.exports` | `import` / `export` |
| **Loading** | Synchronous, Dynamic (runtime) | Asynchronous, Static (compile-time) |
| **Environment** | Node.js | Browsers & Node.js |
| **File Extension** | `.js` (default) | `.mjs` or `.js` (with `"type": "module"` in `package.json`) |
| **Optimization** | Limited | Supports Tree-shaking |

## Conclusion
While **CommonJS** is still widely present in legacy Node.js codebases, **ES Modules** are the recommended standard for new projects. ESM provides better performance, static analysis tooling, and native cross-environment support.
