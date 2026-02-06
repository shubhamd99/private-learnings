// We will create a custom hook in React that will help us track
// how  many times have the page is viewed on client side (in the browser)
// You  can use this to track how many times a component as mounted or any other  activity.

// To create this hook, we will rely on the localforage (indexDB), you can also use localStorage, it is upto you.

import { useEffect, useCallback, useState, useMemo } from "react";

// Utils
import localforage from "localforage";

export const useTrackPageViews = (key) => {
  const [pageViews, setPageViews] = useState(null);

  // We will use useCallback to memoize the function
  // This is done to prevent unnecessary re-renders
  const getDefaultValue = useCallback(async () => {
    try {
      const value = await localforage.getItem(key);
      // Show the past count, but store the new count.
      await localforage.setItem(key, (value ?? 0) + 1);
      setPageViews(value ?? 0);
    } catch (e) {
      setPageViews(0);
    }
  }, [setPageViews, key]);

  useEffect(() => {
    getDefaultValue();
  }, [key]);

  // We will use useMemo to return the pageViews
  // This is done to prevent unnecessary re-renders
  const _pageViews = useMemo(() => {
    return { pageViews };
  }, [pageViews]);

  return _pageViews;
};

// Here we have created a function getDefaultValu() which is wrapped
// inside the useCallback() that will be updated only when the key changes.

// Similar the value is wrapped inside the useMem()  as I am returning an object
// here which will trigger re-rendering as the  referential equality will change

// You can use useRef() as a variable rather than useState() to avoid triggering re-rendering.
