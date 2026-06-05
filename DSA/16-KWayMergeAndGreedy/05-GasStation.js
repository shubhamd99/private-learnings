// https://leetcode.com/problems/gas-station/description/
// A greedy algorithm always picks what looks best right now, without worrying about the future.

// There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i].

// You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station
// to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations.

// Given two integer arrays gas and cost, return the starting gas station's index if you can travel around the
// circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique.

// Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
// Output: 3
// Explanation:
// Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
// Travel to station 4. Your tank = 4 - 1 + 5 = 8
// Travel to station 0. Your tank = 8 - 2 + 1 = 7
// Travel to station 1. Your tank = 7 - 3 + 2 = 6
// Travel to station 2. Your tank = 6 - 4 + 3 = 5
// Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.
// Therefore, return 3 as the starting index.

/**
 * Approach:
 * We need to find a starting gas station from which we can complete a full
 * circular route without our gas tank ever dropping below 0.
 *
 * Idea:
 * We can use a Greedy approach based on two key observations:
 * 1. If the total gas available across ALL stations is less than the total cost
 *    to travel between ALL stations, completing the circuit is mathematically
 *    impossible. We should return -1 immediately.
 * 2. If the total gas is >= total cost, a valid starting station is GUARANTEED
 *    to exist.
 * 3. As we drive from station to station, if our current gas tank drops below 0
 *    at station `i`, it means NO station from our starting point up to `i` could
 *    possibly be the correct starting station. The next logical place to try
 *    starting is `i + 1`.
 *
 * Steps:
 * 1. Initialize `totalGas = 0` and `totalCost = 0` to track the overall feasibility.
 * 2. Initialize `currentGas = 0` to track our tank on the current attempted route.
 * 3. Initialize `startStation = 0` as our hypothesized starting point.
 * 4. Iterate through each station `i`:
 *    - Add `gas[i]` to `totalGas` and `cost[i]` to `totalCost`.
 *    - Update our `currentGas` by adding what we gain and subtracting what it
 *      costs to move to the next station: `currentGas += gas[i] - cost[i]`.
 *    - If `currentGas < 0`, it means our car broke down before reaching `i + 1`.
 *      Our hypothesized `startStation` (and any station between it and `i`) is invalid.
 *      So, we set `startStation = i + 1` and reset `currentGas = 0`.
 * 5. After the loop, if `totalGas < totalCost`, return -1 (impossible).
 * 6. Otherwise, return `startStation`.
 *
 * Time Complexity: O(N)
 * - N is the number of gas stations. We make exactly one pass through the arrays.
 *
 * Space Complexity: O(1)
 * - We only use a few integer variables (`totalGas`, `totalCost`, `currentGas`,
 *   `startStation`), requiring constant extra space.
 */

/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
  let totalGas = 0;
  let totalCost = 0;

  let currentGas = 0;
  let startStation = 0;

  for (let i = 0; i < gas.length; i++) {
    totalGas += gas[i];
    totalCost += cost[i];

    // Simulate the drive from station i to i + 1
    // gas[i] (Income): This is the amount of gas you pump into your car at the current station.
    // cost[i] (Expense): This is the amount of gas your car burns to drive from the current station to the next one.
    currentGas += gas[i] - cost[i];

    // If we run out of gas, we can't start from `startStation` or anywhere
    // before `i`. The next possible start is `i + 1`.
    if (currentGas < 0) {
      startStation = i + 1;
      currentGas = 0; // Reset tank for the new starting point
    }
  }

  // totalGas is every single drop of fuel that exists at all the stations combined.
  // totalCost is the exact amount of fuel required to drive the entire circle once.
  // If you sum up all the gas available on the entire route, and it is strictly less than the
  // total amount of gas needed to drive the route... it is mathematically impossible to finish the loop.

  // If we don't have enough gas overall to cover the total cost, it's impossible.
  if (totalGas < totalCost) {
    return -1;
  }

  return startStation;
};
