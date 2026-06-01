// https://leetcode.com/problems/insert-interval/description/

// You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi]
// intervals is sorted in ascending order by starti
// You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

// Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and
// intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).

// Return intervals after the insertion.
// Note that you don't need to modify intervals in-place. You can make a new array and return it.

// Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
// Output: [[1,5],[6,9]]

// Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
// Output: [[1,2],[3,10],[12,16]]
// Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

/**
 * Steps:
 * 1. Add all intervals that end before newInterval starts.
 *    These intervals cannot overlap with newInterval.
 *
 * 2. Merge all intervals that overlap with newInterval.
 *    If interval.start <= newInterval.end, they overlap.
 *    Update newInterval start and end using min/max.
 *
 * 3. Add the final merged newInterval.
 *
 * 4. Add all remaining intervals.
 *    These intervals start after newInterval ends, so no overlap.
 *
 * Example:
 * intervals = [[1,3],[6,9]]
 * newInterval = [2,5]
 *
 * [1,3] overlaps with [2,5]
 * merge => [1,5]
 *
 * [6,9] does not overlap
 *
 * answer = [[1,5],[6,9]]
 *
 * Time Complexity: O(n)
 * - We visit each interval once.
 *
 * Space Complexity: O(n)
 * - result stores the final intervals.
 */

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  const result = [];
  let i = 0;
  const n = intervals.length;

  // Step 1: Add intervals that come before newInterval.
  while (i < n && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }

  // Step 2: Merge overlapping intervals with newInterval.
  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }

  // Step 3: Add the merged newInterval.
  result.push(newInterval);

  // Step 4: Add intervals that come after newInterval.
  while (i < n) {
    result.push(intervals[i]);
    i++;
  }

  return result;
};

/**
 * Example:
 * intervals = [[1,3],[6,9]]
 * newInterval = [2,5]
 *
 * Initial:
 * result = []
 * i = 0
 *
 * --------------------------------------------------
 * Step 1: Add intervals that come before newInterval
 * --------------------------------------------------
 *
 * Check intervals[i][1] < newInterval[0]
 *
 * intervals[0] = [1,3]
 * intervals[0][1] = 3
 * newInterval[0] = 2
 *
 * Check:
 * 3 < 2 // false
 *
 * So [1,3] does not come completely before [2,5].
 * It may overlap, so we stop Step 1.
 *
 * result = []
 * i = 0
 *
 * --------------------------------------------------
 * Step 2: Merge overlapping intervals with newInterval
 * --------------------------------------------------
 *
 * Check intervals[i][0] <= newInterval[1]
 *
 * intervals[0] = [1,3]
 * intervals[0][0] = 1
 * newInterval[1] = 5
 *
 * Check:
 * 1 <= 5 // true
 *
 * So [1,3] overlaps with [2,5].
 *
 * Merge:
 * newInterval[0] = Math.min(2, 1) = 1
 * newInterval[1] = Math.max(5, 3) = 5
 *
 * newInterval becomes:
 * [1,5]
 *
 * Move to next interval:
 * i = 1
 *
 * Now check intervals[1] = [6,9]
 *
 * intervals[1][0] = 6
 * newInterval[1] = 5
 *
 * Check:
 * 6 <= 5 // false
 *
 * So [6,9] does not overlap with [1,5].
 * Stop merging.
 *
 * result = []
 * newInterval = [1,5]
 * i = 1
 *
 * --------------------------------------------------
 * Step 3: Add merged newInterval
 * --------------------------------------------------
 *
 * Push newInterval into result.
 *
 * result = [[1,5]]
 *
 * --------------------------------------------------
 * Step 4: Add remaining intervals
 * --------------------------------------------------
 *
 * i = 1
 * intervals[1] = [6,9]
 *
 * Push [6,9] into result.
 *
 * result = [[1,5],[6,9]]
 *
 * Final answer:
 * [[1,5],[6,9]]
 */
