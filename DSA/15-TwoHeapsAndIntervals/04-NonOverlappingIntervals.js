// https://leetcode.com/problems/non-overlapping-intervals/description/

// Given an array of intervals intervals where intervals[i] = [starti, endi],
// return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

// Note that intervals which only touch at a point are non-overlapping. For example, [1, 2] and [2, 3] are non-overlapping.

// Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
// Output: 1
// Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.

/**
 * Approach:
 * We need to remove the minimum number of intervals
 * so that the remaining intervals are non-overlapping.
 *
 * Greedy idea:
 * Sort intervals by end time.
 *
 * Why sort by end time?
 * If we always keep the interval that ends earliest,
 * we leave the most space for future intervals.
 *
 * Steps:
 * 1. Sort intervals by end value.
 * 2. Keep track of the end of the last interval we decided to keep.
 * 3. For each next interval:
 *    - If current start >= previous kept end:
 *      no overlap, so keep it.
 *    - Else:
 *      overlap, so remove it.
 *
 * Important:
 * Since intervals are sorted by end time,
 * when overlap happens, the current interval ends later or equal.
 * So removing current interval is the best greedy choice.
 *
 * Example:
 * intervals = [[1,2],[2,3],[3,4],[1,3]]
 *
 * Sort by end:
 * [[1,2],[2,3],[1,3],[3,4]]
 *
 * Keep [1,2], prevEnd = 2
 * [2,3] does not overlap, keep it, prevEnd = 3
 * [1,3] overlaps, remove it
 * [3,4] does not overlap, keep it, prevEnd = 4
 *
 * removals = 1
 *
 * Time Complexity: O(n log n)
 * - Sorting takes O(n log n)
 *
 * Space Complexity: O(1)
 * - Ignoring sorting space, we use only counters.
 */

/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
  intervals.sort((a, b) => a[1] - b[1]);

  let removals = 0;
  let prevEnd = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    const start = intervals[i][0];
    const end = intervals[i][1];

    if (start >= prevEnd) {
      prevEnd = end;
    } else {
      removals++;
    }
  }

  return removals;
};
