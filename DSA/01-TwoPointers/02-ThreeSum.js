// https://leetcode.com/problems/3sum/

// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]]
// such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
// Notice that the solution set must not contain duplicate triplets.

// Time: O(n²) — outer loop O(n) × inner two-pointer scan O(n); sorting is O(n log n) but dominated
// Space: O(n) — sorting uses O(log n) stack space; output results array can hold O(n²) triplets in the worst case

// sort array ascending, fix one element at index i, then use two pointers (left, right) to find pairs that sum to -nums[i]

// skip duplicates at all three positions to avoid duplicate triplets in results
// comparing with i-1 because we want to know if this value was already processed in the previous iteration

// array is sorted, if nums[i] > 0 then left and right are also positive, three positives cant sum to zero
// left moved right so compare with left-1, right moved left so compare with right+1, both check the value we just came from

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b);
  const res = [];

  // Stop once nums[i] > 0 — with a sorted array, left and right are always
  // >= nums[i], so three positive numbers can never sum to zero
  // nums.length - 2 makes sure there are always at least two elements left after i for left and right to occupy.
  for (let i = 0; i < nums.length - 2 && nums[i] <= 0; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum < 0) {
        left++;
      } else if (sum > 0) {
        right--;
      } else {
        res.push([nums[i], nums[left], nums[right]]);

        left++;
        right--;

        // Skip duplicates of the value we just used on the left side
        // (nums[left - 1] is the value from the triplet just pushed)
        while (left < right && nums[left] === nums[left - 1]) left++;
        // Skip duplicates of the value we just used on the right side
        // (nums[right + 1] is the value from the triplet just pushed)
        while (left < right && nums[right] === nums[right + 1]) right--;
      }
    }
  }

  return res;
};
