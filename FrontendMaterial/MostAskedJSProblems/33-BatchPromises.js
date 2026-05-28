// processPromisesBatch will slice your items in chunks of size N, and will execute N promises at the same time.
// This ensures it won't consume a lot of CPU and memory, and exhaust the event loop.

const users = [
  { id: 1, name: "Shubham", status: "processed" },
  { id: 2, name: "Jane", status: "processed" },
  { id: 3, name: "Rahul", status: "processed" },
  { id: 4, name: "Priya", status: "processed" },
  { id: 5, name: "Amit", status: "processed" },
];

async function processUser(user) {
  // Simulate async work like API call, DB update, email send, etc.
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    id: user.id,
    name: user.name,
    status: "processed",
  };
}

async function processPromisesBatch(items, limit, fn) {
  let results = [];
  for (let start = 0; start < items.length; start += limit) {
    const end = start + limit > items.length ? items.length : start + limit;

    const slicedResults = await Promise.all(items.slice(start, end).map(fn));

    results = [...results, ...slicedResults];
  }

  return results;
}

const results = await processPromisesBatch(users, 100, processUser);

async function runInBatches(tasks, batchSize) {
  const results = [];

  for (let i = 0; i < tasks.length; i += batchSize) {
    const batch = tasks.slice(i, i + batchSize);

    const batchResults = await Promise.all(batch.map((task) => task()));

    results.push(...batchResults);
  }

  return results;
}

const tasks = [
  () => fetch("/api/1"),
  () => fetch("/api/2"),
  () => fetch("/api/3"),
  () => fetch("/api/4"),
];

runInBatches(tasks, 2);

/*
Logic:
This is a promise pool.

Instead of running fixed batches like:
run 3 tasks -> wait for all 3 -> run next 3

This keeps at most limit tasks running at the same time.

Whenever one task finishes, it immediately starts the next task.
So it uses concurrency better than fixed batches.

Example:
limit = 2

Start task 0 and task 1.
If task 0 finishes first, start task 2 immediately.
If task 1 finishes, start task 3 immediately.

At no point more than 2 tasks run together.
*/

async function runWithConcurrencyLimit(tasks, limit) {
  const results = new Array(tasks.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < tasks.length) {
      const currentIndex = nextIndex;
      nextIndex++;

      // Save result in original task order.
      results[currentIndex] = await tasks[currentIndex]();
    }
  }

  const workers = [];

  for (let i = 0; i < Math.min(limit, tasks.length); i++) {
    workers.push(worker());
  }

  await Promise.all(workers);

  return results;
}
