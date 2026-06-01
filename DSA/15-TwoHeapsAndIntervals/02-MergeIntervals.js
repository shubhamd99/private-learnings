// https://leetcode.com/problems/merge-intervals/description/

// Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals,
// and return an array of the non-overlapping intervals that cover all the intervals in the input.

// Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

// Input: intervals = [[4,7],[1,4]]
// Output: [[1,7]]
// Explanation: Intervals [1,4] and [4,7] are considered overlapping.

/**
 * Approach:
 * 1. Sort intervals by their start value.
 * 2. Iterate through the sorted intervals.
 * 3. Keep a result array of merged intervals.
 * 4. For each interval:
 *    - If result is empty, add the interval.
 *    - Otherwise compare it with the last interval in result.
 *    - If current start <= last end, the intervals overlap.
 *      Merge them by updating last end to max(last end, current end).
 *    - If they do not overlap, push current interval as a new interval.
 *
 * Why sorting helps:
 * After sorting by start time, overlapping intervals will appear next to each other.
 *
 * Time Complexity: O(n log n)
 * - Sorting takes O(n log n)
 * - One pass through intervals takes O(n)
 *
 * Space Complexity: O(n)
 * - result can store up to n intervals in the worst case
 */

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]); // asc order

  const result = [];

  for (const interval of intervals) {
    const start = interval[0];
    const end = interval[1];

    if (result.length === 0) {
      result.push([start, end]);
      continue;
    }

    const last = result[result.length - 1];

    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      result.push([start, end]);
    }
  }

  return result;
};

/**
 * Example:
 * intervals = [[1,3],[2,6],[8,10],[15,18]]
 *
 * Step 1:
 * Sort by start time.
 * Already sorted:
 * [[1,3],[2,6],[8,10],[15,18]]
 *
 * Step 2:
 * result = []
 *
 * Step 3:
 * Take [1,3]
 * result is empty, so push it.
 * result = [[1,3]]
 *
 * Step 4:
 * Take [2,6]
 * last interval in result = [1,3]
 *
 * Compare:
 * current start = 2
 * last end = 3
 *
 * 2 <= 3, so they overlap.
 *
 * Merge:
 * last end = max(3, 6) = 6
 *
 * result = [[1,6]]
 *
 * Step 5:
 * Take [8,10]
 * last interval in result = [1,6]
 *
 * Compare:
 * current start = 8
 * last end = 6
 *
 * 8 <= 6 is false, so they do not overlap.
 *
 * Push current interval.
 * result = [[1,6],[8,10]]
 *
 * Step 6:
 * Take [15,18]
 * last interval in result = [8,10]
 *
 * Compare:
 * current start = 15
 * last end = 10
 *
 * 15 <= 10 is false, so they do not overlap.
 *
 * Push current interval.
 * result = [[1,6],[8,10],[15,18]]
 *
 * Final answer:
 * [[1,6],[8,10],[15,18]]
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
