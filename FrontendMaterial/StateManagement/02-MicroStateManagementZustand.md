# Micro-State Management with Zustand in React

Micro-state management is a design philosophy derived from microservices, where a monolithic frontend state is sliced into smaller, manageable chunks. These chunks can be developed and deployed independently, reducing complexity as applications scale.

## 1. Zustand Overview

Zustand is a lightweight library used to provide **module state** for React. It is characterized by:

- **Simplicity**: No boilerplate like Redux.
- **Immutable Updates**: States are never modified directly; new objects must be created.
- **Micro-State Pattern**: Focuses on slicing state into smaller modules/logic chunks.

## 2. Module State and Immutability

### Module State

Zustand stores are defined in modules and exported as hooks. They follow a **Singleton + Factory** pattern, sharing the same state across all components where the hook is used.

```javascript
import { create } from "zustand";
export const useStore = create(() => ({ count: 0 }));
```

### Immutable State

Zustand relies on object referential equality for updates. To update a state, you must provide a new object.

- **getState()**: Retrieves the current state.
- **setState()**: Updates the state. It performs a shallow merge by default (`Object.assign`).
- **subscribe()**: Registers a callback triggered on every state change.

```javascript
// Functional update
store.setState((prev) => ({ count: prev.count + 1 }));

// Shallow merge
store.setState({ message: "New Message" });
```

## 3. Optimizing Re-renders (Selectors)

Zustand allows manual render optimization through **Selectors**. Instead of pulling the entire state object, you select only what is needed.

### Standard Selector (Optimized)

The component re-renders **only** when the specific property (`count`) changes.

```javascript
const count = useStore((state) => state.count);
```

### Multiple Properties (Unoptimized vs Optimized)

- **Unoptimized**: Returning a new object in the selector triggers a re-render every time _any_ part of the state changes because the reference to the object is new.
- **Optimized**: Use multiple hook calls or `shallow` equality comparison.

```javascript
// Potentially unoptimized (returns new object)
const { count, message } = useStore((state) => ({
  count: state.count,
  message: state.message,
}));
```

## 4. Middlewares

Zustand's functionality can be extended using middlewares:

- **devtools**: Integrates the store with **Redux DevTools** for easier debugging.
- **persist**: Automatically persists the state in **localStorage** or other storage mechanisms, allowing cross-module state sharing.

```javascript
import { devtools, persist } from "zustand/middleware";

const useStore = create(
  persist(
    devtools((set) => ({
      count: 0,
      increaseCount: () => set((state) => ({ count: state.count + 1 })),
    })),
    { name: "app-storage" },
  ),
);
```

## Summary

| Feature           | Description                                                    |
| :---------------- | :------------------------------------------------------------- |
| **Model**         | Based on object immutability (aligns with React's philosophy). |
| **Reading State** | Uses selectors to prevent unnecessary re-renders.              |
| **Writing State** | Uses `setState` with functional updates or shallow merging.    |
| **Boilerplate**   | Extremely minimal compared to Redux or Context API.            |
