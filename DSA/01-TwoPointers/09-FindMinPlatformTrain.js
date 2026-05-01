// Given arrival[] and departure[] times of N trains, find minimum platforms needed so no train waits.

// Intuition:
// At any point in time,
// platforms needed = trains that have arrived but not yet departed.
// To find the peak overlap, sort both arrays and use two pointers to simulate time moving forward.

// We don't actually track individual trains. After sorting, arrival[i] just means "the i-th earliest arriving train" and departure[j] means "the j-th earliest departing train". They are not the same train necessarily.
// We are not simulating specific trains. We are just asking at each step: did a new train arrive before the earliest pending departure? If yes, need one more platform. If no, one platform got freed.
// The identity of which train it is does not matter at all.

// i <= j -> Because if a train arrives at the exact same time another departs, they still need separate platforms.

// Time: O(n log n)
// Sorting both arrays is O(n log n). The while loop is O(n). Overall dominated by sort so O(n log n).
// Space: O(1)
// No extra data structure, just a few pointer variables. Sorting is done in place.

function findMinPlatforms(arrival, departure) {
  arrival.sort((a, b) => a - b);
  departure.sort((a, b) => a - b);

  let platforms = 1;
  let maxPlatforms = 1;

  let i = 1; // pointer for arrival - skip the first train in the loop since it is already accounted for by initializing platforms = 1.
  let j = 0; // pointer for departure

  while (i < arrival.length && j < arrival.length) {
    if (arrival[i] <= departure[j]) {
      // arrival time is less than departure time
      platforms++;
      i++;
    } else {
      // arrival time is greater than departure time
      platforms--;
      j++;
    }

    maxPlatforms = Math.max(maxPlatforms, platforms);
  }

  return maxPlatforms;
}

// Example:
// 24-hour military time format, but without the colon. So 900 = 9:00 AM, 1800 = 6:00 PM.
const arrival = [900, 940, 950, 1100, 1500, 1800];
const departure = [910, 1200, 1120, 1130, 1900, 2000];

console.log("Minimum platforms needed:", findMinPlatforms(arrival, departure));

// Output: 4

// Edge Cases:
// Empty arrays
// Single train
// All trains arrive at the same time
// All trains depart at the same time
