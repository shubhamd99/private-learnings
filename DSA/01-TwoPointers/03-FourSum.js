// https://leetcode.com/problems/4sum/description/

// Time: O(n³) — two nested loops O(n²) × inner two-pointer scan O(n); sorting is O(n log n) but dominated
// Space: O(n) — sorting stack space; output can hold O(n³) quadruplets in the worst case

// sort array ascending, fix i and j as first two elements, use two pointers for the remaining two
// skip duplicates at all four positions to avoid duplicate quadruplets in results

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  nums = nums.sort((a, b) => a - b);
  const results = [];
  const n = nums.length;

  for (let i = 0; i < n - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    for (let j = i + 1; j < n - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;

      let left = j + 1;
      let right = n - 1; // Because arrays are zero indexed

      while (left < right) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right];

        if (sum === target) {
          results.push([nums[i], nums[j], nums[left], nums[right]]);
          left++;
          right--;

          // after finding a valid triplet, skip duplicate values for left and right to avoid pushing the same triplet again
          while (left < right && nums[left] === nums[left - 1]) left++; // moving outwards, prev value -> -1
          while (left < right && nums[right] === nums[right + 1]) right--; // moving inwards, prev value -> + 1
        } else if (sum < target) {
          left++;
        } else {
          right--;
        }
      }
    }
  }

  return results;
};
