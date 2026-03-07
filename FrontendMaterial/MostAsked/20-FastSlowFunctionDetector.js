// Determine whether a given callback function (heavyProcess in this case)
// is fast or slow based on a specified timer.

function determineFastOrSlow(fn, timer) {
  const start = Date.now();

  fn();

  const end = Date.now();
  const timeTaken = end - start;

  if (timeTaken <= timer) {
    console.log(`Fast — took ${timeTaken}ms (limit: ${timer}ms)`);
  } else {
    console.log(`Slow — took ${timeTaken}ms (limit: ${timer}ms)`);
  }

  return timeTaken <= timer; // return boolean indicating if it's fast or slow
}

// Usage
function heavyProcess() {
  const wait = Date.now() + 120; // Simulate a heavy process that takes 120ms
  while (Date.now() < wait) {
    // Busy-waiting to simulate work
  }
}

function lightProcess() {
  return 1 + 1;
}

determineFastOrSlow(heavyProcess, 100); // Slow — took 120ms (limit: 100ms)
determineFastOrSlow(lightProcess, 100); // Fast — took 0ms  (limit: 100ms)
