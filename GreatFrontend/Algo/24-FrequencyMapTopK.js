// Frequency Map — Return Top K Results
// Given an array, return the k most frequent elements.
//
// Input:  nums = [1, 1, 1, 2, 2, 3], k = 2
// Output: [1, 2]   → 1 appears 3 times, 2 appears 2 times
//
// Input:  nums = [1], k = 1
// Output: [1]

// ---- SIMPLE VERSION (for interviews) ----
// Idea: build a frequency map, then sort entries by count descending, return top k keys.

function topKFrequent(nums, k) {
  const freq = new Map();

  // pass 1: count frequency
  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  // pass 2: sort by frequency descending, take top k
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1]) // sort by count desc
    .slice(0, k)
    .map(([num]) => num);
}

// Examples
console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2)); // [1, 2]
console.log(topKFrequent([1], 1)); // [1]

// ---- BUCKET SORT VARIATION (O(n)) ----
// Idea: use the frequency as an array index (bucket).
// Max frequency possible is n, so create buckets of size n+1.
// Fill buckets, then read from the end (highest freq) until k elements collected.

function topKFrequentBucket(nums, k) {
  const freq = new Map();
  for (const num of nums) freq.set(num, (freq.get(num) || 0) + 1);

  // buckets[i] = list of numbers with frequency i
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, count] of freq) buckets[count].push(num);

  const result = [];
  // read from highest frequency bucket down
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }

  return result.slice(0, k);
}

console.log(topKFrequentBucket([1, 1, 1, 2, 2, 3], 2)); // [1, 2]

// Time: O(n log n) sort version, O(n) bucket version
// Space: O(n)
