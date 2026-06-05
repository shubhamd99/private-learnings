import { useEffect } from "react";

// The useEffect() hook runs when:
// If there is no dependency, then on every render (re-rendering) of the component.
// When the dependency value changes.

// queueMicrotask() is a built-in JavaScript function that tells the browser:
// "Please run this piece of code as soon as the current synchronous code finishes,
// but before you do anything else (like painting the screen)."

// It places your function into the Microtask Queue, which is the same queue used by Promises (.then()).

let effectHooks = [];
let hookIdTracker = 0; // Using hookIdTracker to maintain consistency!

function useMyEffect(callback, deps) {
  // Capture the current hook ID for this specific effect
  const localHookId = hookIdTracker;
  const oldHook = effectHooks[localHookId];

  // 1. Check if dependencies changed
  let hasChanged = true;
  if (oldHook && deps) {
    hasChanged = deps.some((dep, i) => !Object.is(dep, oldHook.deps[i]));
  }

  // 2. If no dependency array is passed OR dependencies changed
  if (!deps || !hasChanged) {
    // Run the previous cleanup function before running the new effect
    if (oldHook && oldHook.cleanup) {
      oldHook.cleanup();
    }

    // Run the callback as a microtask (so it doesn't block rendering)
    queueMicrotask(() => {
      const cleanup = callback();

      // Store the new dependencies and the new cleanup function
      effectHooks[localHookId] = { deps, cleanup };
    });
  } else {
    // If effect didn't run, carry over the old data so we don't lose the cleanup function
    effectHooks[localHookId] = oldHook;
  }

  // Move tracker to the next hook slot
  hookIdTracker++;
}

// ==========================================
// Your React App
// ==========================================
export default function App() {
  // IMPORTANT: We must manually reset the tracker to 0 at the top of the
  // component so it aligns perfectly with every React render cycle!
  hookIdTracker = 0;
}
