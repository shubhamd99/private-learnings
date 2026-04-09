// Approach 1: Sequential (Bad!)
// This approach ignores the size parameter and processes each item one-by-one

/**
 * @param {Array<any>} iterable
 * @param {Function} callbackFn
 * @param {number} size
 *
 * @return {Promise}
 */
function mapAsyncLimitBad(iterable, callbackFn, size) {
  return new Promise((resolve, reject) => {
    const results = [];

    function processItem(index) {
      if (index === iterable.length) {
        resolve(results);
      }

      return callbackFn(iterable[index])
        .then((result) => {
          results.push(result);
          processItem(index + 1);
        })
        .catch(reject);
    }

    return processItem(0);
  });
}

// Approach 2: Chunks with async/await

/**
 * @param {Array<any>} iterable
 * @param {Function} callbackFn
 * @param {number} size
 *
 * @return {Promise}
 */
async function mapAsyncLimit(iterable, callbackFn, size) {
  const results = [];

  for (let i = 0; i < iterable.length; i++) {
    const chunk = iterable.slice(i, i + size);
    const chunkResults = await Promise.all(chunk.map(callbackFn));

    results.push(...chunkResults);
  }

  return results;
}

async function fetchUpperCase(q) {
  // Fake API service that converts a string to uppercase.
  const res = await fetch("https://uppercase.com?q=" + encodeURIComponent(q));
  return await res.text();
}

// Only a maximum of 2 pending requests at any one time.
const results = await mapAsyncLimit(
  ["foo", "bar", "qux", "quz"],
  fetchUpperCase,
  2,
);
console.log(results); // ['FOO', 'BAR', 'QUX', 'QUZ'];

// Approach 3: Chunkless (max concurrency)
// The previous approaches have a huge downside, that is there is some idleness
// and the available upper concurrency limit is not always fully-utilized.

async function mapAsyncLimit2(iterable, callbackFn, size = Infinity) {
  const results = [];
  const queue = [...iterable.entries()]; // [[0,A], [1,B], [2,C]...]

  // one worker function
  async function worker() {
    while (queue.length > 0) {
      const [index, item] = queue.shift(); // pick next item
      results[index] = await callbackFn(item); // wait and store
    }
  }

  // spawn 'size' workers in parallel
  const workers = Array.from({ length: Math.min(size, iterable.length) }, () =>
    worker(),
  );

  await Promise.all(workers); // wait for all workers to finish

  return results;
}

// ### Step by step trace

// iterable = [A, B, C, D, E]
// size = 2
// queue = [[0,A],[1,B],[2,C],[3,D],[4,E]]

// --- Array.from spawns 2 workers ---

// worker1 starts:
//   shift → [0, A]
//   await callbackFn(A) ← pauses here

// worker2 starts:              ← starts WHILE worker1 is paused
//   shift → [1, B]
//   await callbackFn(B) ← pauses here

// --- callbackFn(A) finishes ---
// worker1 resumes:
//   results[0] = A_result
//   loop again → shift → [2, C]
//   await callbackFn(C) ← pauses

// --- callbackFn(B) finishes ---
// worker2 resumes:
//   results[1] = B_result
//   loop again → shift → [3, D]
//   await callbackFn(D) ← pauses

// --- callbackFn(C) finishes ---
// worker1 resumes:
//   results[2] = C_result
//   loop again → shift → [4, E]
//   await callbackFn(E) ← pauses

// --- callbackFn(D) finishes ---
// worker2 resumes:
//   results[3] = D_result
//   queue.length = 0 → while exits
//   worker2 DONE

// --- callbackFn(E) finishes ---
// worker1 resumes:
//   results[4] = E_result
//   queue.length = 0 → while exits
//   worker1 DONE

// Promise.all → both done → return results

// ---- SIMPLE VERSION (for interviews) ----
// Idea: spawn exactly `size` worker coroutines in parallel.
// Each worker pulls the next item off a shared queue until it's empty.
// Because workers run concurrently, as soon as one finishes an item it
// immediately picks up the next — no idle gaps unlike the chunk approach.
//
// Key tricks:
//   iterable.entries() → [[0,A],[1,B],...] preserves original index for result ordering
//   queue.shift()      → shared mutable queue; workers race to grab items
//   results[index]     → write at original index so output order matches input
//   Array.from({length: size}, () => worker()) → spawns N promises at once
async function mapAsyncLimit(iterable, callbackFn, size = Infinity) {
  size = Math.min(size, iterable.length);
  const results = [];
  const queue = [...iterable.entries()]; // [[0,item], [1,item], ...]

  async function worker() {
    while (queue.length) {
      const [index, item] = queue.shift(); // grab next available item
      results[index] = await callbackFn(item); // store at original index
    }
  }

  // spawn min(size, total) workers — each runs concurrently
  await Promise.all(Array.from({ length: size }, worker));

  return results;
}
