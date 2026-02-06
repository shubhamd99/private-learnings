// Create a function in JavaScript that accepts a function as input and a count
// and executes that input function once for a given count of calls. Known as sampling function.

// The sampling function is different than throttling as throttling limits the execution of the function once in a given amount of time
// while sampling limits the execution by executing function once in a given number of calls.

// To create a sampling function we can create a closure that will track how many times the function has been called
// and once it reaches the count, execute the input function and reset the counter.

function message() {
  console.log("hello");
}

function sampler(fn, count, context) {
  let counter = 0;

  // Collect all remaining arguments into an array.
  return function (...args) {
    // set the counters
    context = this ?? context; // If the function is called with a this value (like obj.sampled()), use that. Otherwise use the original context passed to sampler

    // Prefix Increment: ++value = Increments first → returns the NEW value
    // let x = 5;
    // console.log(++x); // 6  (x becomes 6, returns 6)
    // console.log(x);   // 6

    // Postfix Increment: value++ - Returns the OLD value → increments after
    // let x = 5;
    // console.log(x++); // 5  (returns old value)
    // console.log(x);   // 6  (now x becomes 6)

    if (++counter !== count) return;

    // Calls original fn, Uses correct this (context), Passes original arguments
    fn.apply(context, args);
    counter = 0;
  };
}

const sample = sampler(message, 4);
sample();
sample();
sample();
sample(); // this will be executed
sample();
sample();
sample();
sample(); // this will be executed
