// https://leetcode.com/problems/median-of-two-sorted-arrays/ - HARD
// https://www.youtube.com/watch?v=eUvfNcHhi5o

// Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
// The overall run time complexity should be O(log (m+n)).

// Input: nums1 = [1,3], nums2 = [2]
// Output: 2.00000
// Explanation: merged array = [1,2,3] and median is 2.

// Input: nums1 = [1,2], nums2 = [3,4]
// Output: 2.50000
// Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

/*
Logic:
We need the median of two sorted arrays without fully merging them.

Median means the middle value after both arrays are combined and sorted.

Instead of merging, we split both arrays into left half and right half.

Correct split condition:
Every number on the left side should be <= every number on the right side.

We binary search the split position in the smaller array.

For a cut:
nums1 left side ends at left1
nums1 right side starts at right1

nums2 left side ends at left2
nums2 right side starts at right2

The partition is correct when:
left1 <= right2
and
left2 <= right1

If correct:
- Odd total length: median is max(left1, left2)
- Even total length: median is average of max left and min right

If left1 > right2:
We took too many elements from nums1, move left.

If left2 > right1:
We took too few elements from nums1, move right.
*/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  // Always binary search on smaller array.
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }

  const m = nums1.length; // smaller array
  const n = nums2.length;
  const total = m + n;
  const half = Math.floor((total + 1) / 2); // + 1 because for odd total length, we want the left half to contain one extra element.

  let left = 0;
  let right = m;

  while (left <= right) {
    const cut1 = Math.floor((left + right) / 2);
    const cut2 = half - cut1;

    const left1 = cut1 === 0 ? -Infinity : nums1[cut1 - 1];
    const right1 = cut1 === m ? Infinity : nums1[cut1];

    const left2 = cut2 === 0 ? -Infinity : nums2[cut2 - 1];
    const right2 = cut2 === n ? Infinity : nums2[cut2];

    if (left1 <= right2 && left2 <= right1) {
      if (total % 2 === 1) {
        return Math.max(left1, left2);
      }

      return (Math.max(left1, left2) + Math.min(right1, right2)) / 2;
    }

    if (left1 > right2) {
      right = cut1 - 1;
    } else {
      left = cut1 + 1;
    }
  }
};
