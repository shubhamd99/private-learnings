// https://leetcode.com/problems/find-the-duplicate-number/description/

// Logic — Floyd's Cycle Detection (Tortoise and Hare)

// Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.
// There is only one repeated number in nums, return this repeated number.
// You must solve the problem without modifying the array nums and using only constant extra space.

// nums = [3, 1, 3, 4, 2]
// index:  0  1  2  3  4
// fast = 0
// step 1: nums[fast] = nums[0] = 3   -> this is fast.next, now at index 3
// step 2: nums[3] = 4                -> this is fast.next.next, now at index 4
// so nums[nums[fast]] = nums[nums[0]] = nums[3] = 4
// fast moved from index 0 to index 4 in one iteration, skipping index 3 in between
// that is exactly what fast.next.next does in a linked list

// The property guarantees that distance from index 0 to cycle entrance equals
// distance from meeting point to cycle entrance.
// So moving both one step at a time they will always collide exactly at the cycle entrance

// Time: O(n)
// Space: O(1)
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
  let slow = 0;
  let fast = 0;

  // Find intersection point
  while (true) {
    slow = nums[slow];
    fast = nums[nums[fast]];

    if (slow === fast) {
      break;
    }
  }

  // Find entrance to the cycle
  slow = 0;
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }

  return slow;
};
