// https://leetcode.com/problems/3sum/

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
  nums = nums.sort((a, b) => a - b);
  const results = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    if (nums[i] > 0) break;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        results.push([nums[i], nums[left], nums[right]]);
        left++;
        right--;

        // after finding a valid triplet, skip duplicate values for left and right to avoid pushing the same triplet again
        while (left < right && nums[left] === nums[left - 1]) left++; // moving outwards, prev value -> -1
        while (left < right && nums[right] === nums[right + 1]) right--; // moving inwards, prev value -> + 1
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return results;
};
