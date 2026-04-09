# Event Loop in JavaScript

The **Event Loop** is the core mechanism that handles asynchronous operations in JavaScript, allowing its single-threaded engine to perform tasks concurrently without blocking the execution of the program.

## Architecture & Components

1. **Call Stack**:
   - A Last-In-First-Out (LIFO) data structure that tracks the functions currently being executed.
   - All synchronous operations run here.

2. **Web APIs / Node.js APIs**:
   - Handle asynchronous operations (e.g., `setTimeout()`, HTTP requests, file I/O).
   - They run on separate threads and do not block the call stack.

3. **Microtask Queue**:
   - Holds tasks with **high priority**.
   - Examples: Promise callbacks (`.then()`, `.catch()`, `.finally()`), `await` statements, `queueMicrotask()`, and `MutationObserver`.
   - Executed immediately after the current call stack clears and **before** any macrotasks.

4. **Macrotask Queue (Task / Callback Queue)**:
   - Holds default asynchronous tasks.
   - Examples: `setTimeout()`, `setInterval()`, HTTP requests, and UI events (clicks, scrolls).
   - Executed only when both the Call Stack and Microtask Queue are empty.

## Event Loop Execution Order

1. **Synchronous Execution:** The engine executes scripts and pushes synchronous functions onto the Call Stack.
2. **Offloading:** Asynchronous tasks are offloaded to Web/Node APIs.
3. **Queueing:** Completed async tasks send their callbacks to either the Microtask or Macrotask Queue.
4. **The Loop:** When the Call Stack is empty:
   - **Step A:** Process **ALL** items in the **Microtask Queue** until it is completely empty.
   - **Step B:** Pop **ONE** item from the **Macrotask Queue** and push it to the Call Stack to execute.
   - **Step C:** Before picking another macrotask, check the **Microtask Queue** again. (The macrotask might have added new microtasks).
5. This process loops indefinitely.

## Example Scenario

```javascript
console.log("Start"); // Synchronous

setTimeout(() => {
  console.log("Timeout 1"); // Macrotask
}, 0);

Promise.resolve().then(() => {
  console.log("Promise 1"); // Microtask
});

setTimeout(() => {
  console.log("Timeout 2"); // Macrotask
}, 0);

console.log("End"); // Synchronous
```

### Console Output

```text
Start
End
Promise 1
Timeout 1
Timeout 2
```

### Explanation of the Output:

1. `Start` and `End`: Logged first because they execute synchronously on the Call Stack.
2. `Promise 1`: Logged next because promises are microtasks, handled immediately after the call stack clears.
3. `Timeout 1` and `Timeout 2`: Logged last because they are macrotasks, which only run after all microtasks have finished.

```javascript
async function fetchData() {
  // Simulating an HTTP request with Promise (like fetch())
  const result = await Promise.resolve("HTTP Response Data");
  console.log("Inside async function after await:", result); // Microtask
}

console.log("1. Script Start"); // Synchronous

setTimeout(() => {
  console.log("2. setTimeout callback"); // Macrotask
}, 0);

fetchData(); // Kicks off the async function

console.log("3. Script End"); // Synchronous
```

**Output:**

```
1. Script Start
3. Script End
Inside async function after await: HTTP Response Data
2. setTimeout callback
```

## Promise executor runs synchronously

The function you pass to `new Promise(executor)` runs **immediately and synchronously** — it is not deferred. Only the `.then()` / `.catch()` callbacks are async (microtasks).

```javascript
console.log("1");

new Promise((resolve) => {
  console.log("2 — executor runs sync"); // ← runs RIGHT NOW, not later
  resolve();
});

console.log("3");

// Output:
// 1
// 2 — executor runs sync
// 3
```

Why? The executor is just a regular function call inside the `Promise` constructor. JS runs it inline before moving on. Only after `resolve()` is called does the `.then()` callback get scheduled as a **microtask**.

```javascript
console.log("1");

new Promise((resolve) => {
  console.log("2 — executor");
  resolve();
}).then(() => {
  console.log("4 — .then is async (microtask)"); // deferred
});

console.log("3");

// Output:
// 1
// 2 — executor
// 3
// 4 — .then is async (microtask)
```

---

```
fetch()  -->  Web API (network layer, no queue involved)
                    |
                    | response arrives
                    v
              Promise resolves
                    |
                    v
         await schedules continuation --> MICROTASK QUEUE
                    |
                    v
          console.log(data)  <-- runs as microtask
```
