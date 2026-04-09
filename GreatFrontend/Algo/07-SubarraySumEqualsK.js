// Subarray Sum Equals K
// Count the number of contiguous subarrays whose sum equals k.
//
// Input:  nums = [1, 1, 1], k = 2
// Output: 2   → subarrays [1,1] at indices [0,1] and [1,2]
//
// Input:  nums = [1, 2, 3], k = 3
// Output: 2   → subarrays [1,2] and [3]

// ---- SIMPLE VERSION (for interviews) ----
// Idea: prefix sum + HashMap.
// As we accumulate a running sum, check if (runningSum - k) was seen before.
// If yes, there's a subarray ending here with sum = k.
// Map stores: prefixSum → how many times it has occurred.

function subarraySum(nums, k) {
  const prefixCounts = new Map();
  prefixCounts.set(0, 1); // empty prefix — sum of 0 seen once

  let runningSum = 0;
  let count = 0;

  for (const num of nums) {
    runningSum += num;

    // if (runningSum - k) exists, we found subarrays ending here with sum k
    if (prefixCounts.has(runningSum - k)) {
      count += prefixCounts.get(runningSum - k);
    }

    // record this prefix sum
    prefixCounts.set(runningSum, (prefixCounts.get(runningSum) || 0) + 1);
  }

  return count;
}

// Examples
console.log(subarraySum([1, 1, 1], 2)); // 2 (indices [0,1] and [1,2])
console.log(subarraySum([1, 2, 3], 3)); // 2 ([1,2] and [3])

// Why prefixCounts.set(0, 1)?
// Handles the case where the subarray starts from index 0.
// e.g. nums=[3], k=3 → runningSum=3, (3-3)=0 → found in map → count++

// Time: O(n)
// Space: O(n) — map stores at most n prefix sums
