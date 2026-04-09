// Merge Intervals
// Given an array of intervals [start, end], merge all overlapping intervals.
//
// Input:  [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]   → [1,3] and [2,6] overlap → merged to [1,6]
//
// Input:  [[1,4],[4,5]]
// Output: [[1,5]]   → touching intervals are considered overlapping

// ---- SIMPLE VERSION (for interviews) ----
// Idea: sort intervals by start time.
// Then iterate — if current interval overlaps with the last merged one,
// extend its end. Otherwise push it as a new interval.
// Two intervals overlap if current.start <= last.end.

function merge(intervals) {
  // sort by start time
  intervals.sort((a, b) => a[0] - b[0]);

  const result = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const last = result[result.length - 1];
    const current = intervals[i];

    if (current[0] <= last[1]) {
      // overlapping — extend the end if needed
      last[1] = Math.max(last[1], current[1]);
    } else {
      // no overlap — add as new interval
      result.push(current);
    }
  }

  return result;
}

// Examples
console.log(
  merge([
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ]),
); // [[1,6],[8,10],[15,18]]
console.log(
  merge([
    [1, 4],
    [4, 5],
  ]),
); // [[1,5]]

// Time: O(n log n) — dominated by sorting
// Space: O(n) — output array
