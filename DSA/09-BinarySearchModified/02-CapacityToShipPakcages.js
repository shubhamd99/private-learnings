// https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/description/

// A conveyor belt has packages that must be shipped from one port to another within days days.

// The ith package on the conveyor belt has a weight of weights[i]
// Each day, we load the ship with packages on the conveyor belt (in the order given by weights).
// We may not load more weight than the maximum weight capacity of the ship.

// Return the least weight capacity of the ship that will result in all the packages
// on the conveyor belt being shipped within "days" days.

// Input: weights = [1,2,3,4,5,6,7,8,9,10], days = 5
// Output: 15
// Explanation: A ship capacity of 15 is the minimum to ship all the packages in 5 days like this:
// 1st day: 1, 2, 3, 4, 5
// 2nd day: 6, 7
// 3rd day: 8
// 4th day: 9
// 5th day: 10

// Note that the cargo must be shipped in the order given, so using a ship of capacity 14 and splitting the packages into parts like (2, 3, 4, 5), (1, 6, 7), (8), (9), (10) is not allowed.

/*
Logic:
We need the minimum ship capacity to ship all packages within given days.

Capacity means:
How much total weight the ship can carry in one day.

Packages must be shipped in the same order as given.

We do not know the answer capacity, so we binary search it.

Smallest possible capacity:
The heaviest package.
Because the ship must be able to carry every single package.

Largest possible capacity:
Sum of all packages.
Because with that capacity, ship can carry everything in one day.

For a guessed capacity:
We simulate shipping packages.

currentLoad = total weight loaded for the current day.
neededDays = how many days we need with this capacity.

For each package:
- If it fits in current day, add it.
- If it does not fit, start a new day and load it there.

If neededDays <= days:
This capacity works, but maybe smaller capacity also works.

If neededDays > days:
This capacity is too small, so we need bigger capacity.
*/

// Time: O(log n)
// Space: O(1)
/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
var shipWithinDays = function (weights, days) {
  let left = Math.max(...weights);
  let right = 0;

  for (const weight of weights) {
    right += weight;
  }

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    let neededDays = 1; // because we start shipping on day 1.
    let currentLoad = 0;

    for (const weight of weights) {
      // If adding this package exceeds capacity,
      // ship current load and start a new day.
      if (currentLoad + weight > mid) {
        neededDays++;
        currentLoad = 0;
      }

      // Load package into current day.
      currentLoad += weight;
    }

    if (neededDays <= days) {
      // Capacity works, try smaller capacity.
      // Keep mid because it might be the minimum answer.
      right = mid;
    } else {
      // Capacity too small, need bigger capacity.
      left = mid + 1;
    }
  }

  return left;
};
