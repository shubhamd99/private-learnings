# Closure

## What is a Closure?
In simple terms, a **closure** is a function that remembers and can access variables in its **lexical scope** (the outer environment where it was created), even after the outer function has finished executing. 

- **Lexical Scoping:** Variable access is determined by exactly where the function is written in the source code.
- **Function Memory:** When defined, a function retains a reference to its original creating scope (including local variables in that scope).
- **Maintaining State:** Closures allow state to be maintained securely without exposing variables globally.

### Basic Example
```javascript
function outerFunction() {
  const outerVar = 'I am outside of innerFunction';

  function innerFunction() {
    // `innerFunction` can still access `outerVar`.
    console.log(outerVar); 
  }

  return innerFunction;
}

const inner = outerFunction();
// Even though `outerFunction` is done, `inner` still remembers `outerVar`
inner(); // Outputs: "I am outside of innerFunction"
```

## ES6 Syntax & Closures
With ES6, arrow functions provide a much cleaner syntax for creating closures.

```javascript
const createCounter = () => {
  let count = 0; // "Private" state
  
  return () => {
    count += 1;
    return count;
  };
};

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

## Closures in React
Closures are everywhere in React, particularly inside components to manage state with hooks. Variable access in event handlers heavily relies on them.

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // handleClick is a closure! 
  // It has access to the outer scope variables `count` and `setCount`.
  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
```

## Why use Closures?

1. **Data Encapsulation (Privacy):** Creating private variables and functions that cannot be mutated accidentally from the outside (useful for hiding implementation details).
2. **Functional Programming:** Fundamental for techniques like currying and partial application, where functions are passed around and invoked later.
3. **Event Handlers & Callbacks:** Necessary to maintain state or access scope variables when a handler or asynchronous callback eventually executes.
4. **Module Patterns:** Enables building modules with exposed public APIs that internally rely on fully private state.
