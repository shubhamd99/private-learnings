// create a hook in React to provide an abstraction over the asynchronous operation like handling its error state
// and providing option to refetch, etc
// This is a simpler version of the React-Query's useQuery hook.

// useAsync(asyncFn, immediate) takes an async function and an immediate flag
// as input and it will provide an abstraction for complete async operation (API calls) in React,
// in return it will give the status, value, error, refetch.

// state: It will have one of the four values ["idle", "pending", "success", "error"]
// depending upon the current state of the asyncFn.

// value: If the state is success then this will have the value returned from the asyncFn.

// error: If the state is error then this will have the error returned from the asyncFn.

// refetch(): This function can be used to invoke the function again and refetch data.

// We will be using useState to monitor the status, value, & error
// and useCallback() hook to create a memoized refetch() function.

// A memoized version of the callback that only changes if one of the dependencies has changed is what useCallback returns
//  To avoid needless renderings, this is helpful when delivering callbacks to optimised child components that rely on reference equality.

import { useState, useCallback, useEffect } from "react";

const useAsync = (asyncFn, immediate = false) => {
  // four status to choose ["idle", "pending", "success", "error"]
  const [state, setState] = useState({
    status: "idle",
    value: null,
    error: null,
  });

  // return the memoized function
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const refetch = useCallback(() => {
    // reset the state before call
    setState({
      status: "pending",
      value: null,
      error: null,
    });

    return asyncFn()
      .then((response) => {
        setState({
          status: "success",
          value: response,
          error: null,
        });
      })
      .catch((error) => {
        setState({
          status: "error",
          value: null,
          error: error,
        });
      });
  }, [asyncFn]);

  // execute the function
  // if asked for immediate
  useEffect(() => {
    if (immediate) {
      refetch();
    }
  }, [refetch, immediate]);

  // state values
  const { status, value, error } = state;

  return { refetch, status, value, error };
};

// dummy api call
const fakeApiCall = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 50% chance of success and 50% chance of error
      // Math.random() returns a floating-point, pseudo-random number between 0 (inclusive) and 1 (exclusive)
      // Math.random() * 10 returns a floating-point, pseudo-random number between 0 (inclusive) and 10 (exclusive)
      const rnd = Math.random() * 10;
      rnd <= 5 ? resolve("Data....") : reject("Error....");
    }, 1000);
  });
};

const Example = () => {
  const { status, value, error } = useAsync(fakeApiCall, true);

  return (
    <div>
      <div>Status: {status}</div>
      <div>Value: {value}</div>
      <div>error: {error}</div>
    </div>
  );
};

export default Example;

// Status: success
// Value: Data....
// error:
