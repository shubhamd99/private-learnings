import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce rapid state changes (e.g. typing).
 * This significantly optimizes performance by preventing heavy list filtering
 * or API calls from firing on every single keystroke.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Stage the value update on a delay timer
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // CRITICAL FIX: The cleanup function ensures that if `value` changes again
    // BEFORE the delay timer finishes, the previous timer is strictly cleared.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
