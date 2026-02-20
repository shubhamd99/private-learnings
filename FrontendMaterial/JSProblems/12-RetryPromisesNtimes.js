// This question was asked in Google's frontend interview and Impact Analytics SSE – Frontend interview.
// The problem statement reads as Implement a function in JavaScript that retries promises
// N number of times with a delay between each call

// Input:
// retry(asyncFn, retries = 3, delay = 50, finalError = 'Failed');

// Output:
// ... attempt 1 -> failed
// ... attempt 2 -> retry after 50ms -> failed
// ... attempt 3 -> retry after 50ms -> failed
// ... Failed.

// We have to create a retry function that Keeps on retrying
// until the promise resolves with delay and max retries.

// Delay function
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Using then…catch.
// To retry the promise we have to call the same function recursively with reduced max tries,
// if the promise fails that is in the catch block

const retryWithDelay = (
  operation,
  retries = 3,
  delay = 50,
  finalErr = "Retry failed",
) => {
  return operation().catch((err) => {
    console.log("Error: ", err);

    if (retries <= 0) {
      throw finalErr;
    }

    return wait(delay).then(() =>
      retryWithDelay(operation, retries - 1, delay, finalErr),
    );
  });
};

// Test function
const getTestFunc = () => {
  let callCounter = 0;
  return async () => {
    callCounter += 1;
    // if called less than 5 times
    // throw error
    if (callCounter < 5) {
      throw new Error("Not yet");
    }
  };
};

// Test the code
const test = async () => {
  await retryWithDelay(getTestFunc(), 10);
  console.log("success");
  await retryWithDelay(getTestFunc(), 10);
  console.log("will fail before getting here");
};

// Print the result
test().catch(console.error);

// Output:
// "success" // 1st test
// "Retry failed" // 2nd test

const timedFail = () => {
  console.log("Time:", Date.now());
  return Promise.reject();
};

retryWithDelay(timedFail, 3, 1000).catch(() => {});
