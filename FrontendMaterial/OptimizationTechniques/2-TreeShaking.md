# Tree Shaking in JavaScript

**Tree Shaking** is a form of dead-code elimination used to optimize JavaScript bundles by removing unused code. The term was popularized by **Rollup** and subsequently adopted by **Webpack**.

## Why is Tree Shaking Important?

- **Performance**: Keeps production builds as light as possible, reducing download, parsing, and execution time.
- **Bundle Size**: Modern component-based development often leads to large bundles with many unused utilities or functions.
- **Efficiency**: A smaller compressed file (e.g., 350kb) still needs to be uncompressed and compiled (e.g., 800-900kb), which is expensive for mobile devices.

## How It Works

Tree shaking relies on the **static structure** of ES6 module syntax (`import` and `export`).

| Feature                 | CommonJS (`require`)                | ES6 Modules (`import/export`)         |
| :---------------------- | :---------------------------------- | :------------------------------------ |
| **Import Type**         | Dynamic (Happens at runtime)        | **Static** (Determined at build time) |
| **Conditional Loading** | Supported (makes tree shaking hard) | Not supported at top-level            |
| **Tree Shaking**        | Difficult/Impossible                | **Native Support**                    |

### Mechanism:

1. **Static Analysis**: Bundlers analyze the `import` statements at the top of files to build a dependency graph.
2. **Marking**: Unused exports are marked (e.g., Webpack adds comments like `/* unused harmony export */`).
3. **Removal**: In production mode, these marked functions or variables are completely stripped from the final bundle.

## Side Effects

A "side effect" occurs when a script performs an action other than just exporting a value (e.g., modifying a global variable, adding a polyfill, or modifying an array outside its scope).

### Handling Side Effects

Bundlers are cautious. If they suspect a script has side effects, they won't "shake" it. You can hint to the bundler that your code is side-effect-free using `package.json`:

- **No side effects**:
  ```json
  {
    "sideEffects": false
  }
  ```
- **Specific side effects**:
  ```json
  {
    "sideEffects": ["./polyfills.js", "*.css"]
  }
  ```

## Summary

- **Tree Shaking** = Removing unused exports.
- **Required**: ES6 Static Modules.
- **Goal**: Minimize bundle size for better performance.
- **Configuration**: Use `sideEffects` in `package.json` to help bundlers optimize better.
