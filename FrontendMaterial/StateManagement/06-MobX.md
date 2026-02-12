# MobX: Reactive State Management

MobX is a battle-tested library that makes state management simple and scalable by transparently applying functional reactive programming (TFRP).

## 1. What is MobX?

MobX focuses on making state changes automatic and efficient through observable properties and reactions. Its philosophy is: "Anything that can be derived from the application state, should be. Automatically."

### Key Features:

- **Observable State:** Tracks state changes automatically.
- **Reactions:** Automatically updates the UI or side effects when dependent state changes.
- **Simplicity:** Minimal boilerplate compared to Redux (no reducers or complex action creators).
- **Flexibility:** Unopinionated about data structure; works with any framework (best with React).

---

## 2. Core Concepts

### A. Observables

Represent the state that can change.

- **`observable`:** Makes properties, objects, arrays, or maps reactive.
- **Deep vs Shallow:** By default, MobX uses deep observability. `observable.shallow` tracks only top-level changes.

### B. Actions

Functions that modify the state.

- **`action`:** Marks a function as a state modifier.
- **`runInAction`:** Used to update state in asynchronous callbacks (like after an `await`).
- **Best Practice:** Always modify state within actions to ensure predictability and batching.

### C. Computed Values

Values derived from state.

- **Lazy & Cached:** Only recalculated when their dependencies change and they are being used.
- **Efficiency:** Use them for filtering, sorting, or complex calculations to avoid redundant work.

### D. Reactions (Side Effects)

Side effects that happen in response to state changes.

- **`autorun`:** Runs every time any of its used observables change.
- **`reaction`:** More granular; allows tracking specific data and executing an effect separately.
- **`when`:** Runs once when a specific condition becomes true.

### E. Stores

Objects that centralize state and logic for a specific domain. The **Root Store Pattern** is recommended for large apps to coordinate multiple stores.

---

## 3. Integration with React

MobX integrates via `mobx-react-lite` (for hooks) or `mobx-react` (for classes).

- **`observer`:** A higher-order component that makes React components reactive.
- **`useLocalObservable`:** Create observable state local to a component.
- **Provider/Context:** Use React Context to pass stores down the component tree.

---

## 4. Advanced Patterns & Optimization

- **Asynchronous Actions:** Use `async/await` with `runInAction` for API calls.
- **Performance:**
  - Wrap only the components that need to be reactive with `observer`.
  - Use `computed.struct` for structurally stable comparisons.
  - Debounce or throttle frequent actions (e.g., search input).
- **Normalization:** Keep data flat with IDs for easier updates in complex states.

---

## 5. Comparison: MobX vs. Redux vs. Context API

| Feature            | MobX                       | Redux                       | Context API                  |
| :----------------- | :------------------------- | :-------------------------- | :--------------------------- |
| **Approach**       | Reactive / Object-Oriented | Functional / Unidirectional | Built-in React State Sharing |
| **Boilerplate**    | Low                        | High                        | Very Low                     |
| **Learning Curve** | Gentle                     | Steep                       | Easy                         |
| **Predictability** | High (via actions)         | Very High (pure reducers)   | Medium                       |
| **Suitability**    | Small to Large apps        | Complex, strict apps        | Simple state sharing         |

---

## 6. Testing MobX

- **Unit Testing:** Focus on stores. Since they are plain JS objects/classes, they are easy to test with Jest.
- **Integration Testing:** Test store interactions and React component reactions using React Testing Library.
- **Tools:** Use `spy` to monitor actions and MobX DevTools for debugging state flow.

---

## 7. Real-World Case Studies

- **Small-Scale (SimpleNote):** Rapid development, minimal setup, and automatic UI updates for a single store.
- **Large-Scale (ShopEasy):** Modular architecture with multiple stores (User, Cart, Product) coordinated by a Root Store, ensuring scalability and performance under high load.
