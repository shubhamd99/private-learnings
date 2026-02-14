queueMicrotaskuseEffect(() => {
  // Setup code: side effect logic goes here

  return () => {
    // Cleanup code: runs before the component unmounts or before the effect re-runs
  };
}, [dependencies]); // Optional dependency array

// The useEffect() hook runs when:
// If there is no dependency, then on every render (re-rendering) of the component.
// When the dependency value changes.

// queueMicrotask - The queueMicrotask() method of the Window interface queues a microtask
// to be executed at a safe time prior to control returning to the browser's event loop

let hooksState = []; // tracks dependencies and the cleanup function
let currentHookIndex = 0; // helps to track multiple useEffects and maintain there order of execution in the component
let autoResetScheduled = false;

export function useEffectPolyfill(callback, dependencies) {
  // Auto-reset mechanism: schedule reset after current execution completes
  if (!autoResetScheduled) {
    autoResetScheduled = true;

    // Reset index after all synchronous hook calls complete
    queueMicrotask(() => {
      currentHookIndex = 0;
      autoResetScheduled = false;
    });
  }

  // post increment ++ - first return current value and then increment
  const prevHookIndex = currentHookIndex++;
  const prevHook = hooksState[prevHookIndex];

  // Determine if effect should run
  let shouldRun = !prevHook;

  if (prevHook && dependencies !== undefined) {
    shouldRun =
      dependencies.length !== prevHook.dependencies?.length ||
      dependencies.some((dep, i) => !Object.is(dep, prevHook.dependencies[i]));
  } else if (prevHook && dependencies === undefined) {
    shouldRun = true;
  }

  // Store hook state
  hooksState[prevHookIndex] = {
    dependencies,
    cleanup: prevHook?.cleanup,
  };

  // Schedule effect
  if (shouldRun) {
    queueMicrotask(() => {
      if (prevHook?.cleanup) {
        prevHook.cleanup();
      }

      const cleanup = callback();
      if (typeof cleanup === "function") {
        hooksState[prevHookIndex].cleanup = cleanup;
      }
    });
  }
}

// We are using queueMicrotask to invoke the callback after the rendering this is because,
// we cannot use React’s inbuilt scheduler for execution as we don’t integrate with
// the React’s fiber architecture.

// This is a work around, but it works.

// Also, we have added autoResetScheduled to auto reset,
// otherwise we would have to manually reset by invoking the reset functions
// after the useEffectPolyfill() hook.

// Optional: manual cleanup for unmounting
function cleanupAllEffects() {
  hooksState.forEach((hook) => hook?.cleanup?.());
  hooksState = [];
  currentHookIndex = 0;
  autoResetScheduled = false;
}

function App() {
  const [count, setCount] = useState(0);

  // Effect with dependencies (runs when dependency changes)
  useEffectPolyfill(() => {
    console.log("Count changed:", count);

    // Cleanup function
    return () => {
      console.log("Cleanup for count:", count);
    };
  }, [count]);

  // Effect with no dependencies (runs once)
  useEffectPolyfill(() => {
    console.log("Component mounted");

    return () => {
      console.log("Component will unmount");
    };
  }, []);

  // Effect with no dependency array (runs every render)
  useEffectPolyfill(() => {
    console.log("Runs on every render");
  });

  return (
    <div>
      Learnersbucket{" "}
      <button onClick={() => setCount((count) => count + 1)}>Increment</button>
    </div>
  );
}

// First render:
// Count changed: 0 // first hook
// Component mounted // second hook
// Runs on every render // third hook

// When count changes:
// Cleanup for count: 0 // first hook's cleanup
// Count changed: 1 // first hook's re-rendering
// Runs on every render // third hook

// Key concepts
// Dependency tracking – Stores previous dependencies and compares with current ones using Object.is()
// Cleanup functions – Runs cleanup from previous effect before running new one
// Effect scheduling – Uses queueMicrotask to simulate running effects after render
// Index tracking – Maintains order of effects within a component
// Three execution modes – No dependency array → runs every render, Empty array → runs once on mount, Array with values → runs when dependencies change

// Limitations of this polyfill
// Doesn’t integrate with React’s fiber architecture
// Uses queueMicrotask instead of React’s scheduler
// Doesn’t handle concurrent rendering
// Simplified cleanup mechanism
