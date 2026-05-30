// https://leetcode.com/problems/car-fleet/description/

// A car fleet is a single car or a group of cars driving next to each other.
// The speed of the car fleet is the minimum speed of any car in the fleet.

// If a car catches up to a car fleet at the mile target, it will still be considered as part of the car fleet.

// Return the number of car fleets that will arrive at the destination.

// Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]
// Output: 3
// Explanation:
// The cars starting at 10 (speed 2) and 8 (speed 4) become a fleet, meeting each other at 12. The fleet forms at target.
// The car starting at 0 (speed 1) does not catch up to any other car, so it is a fleet by itself.
// The cars starting at 5 (speed 1) and 3 (speed 3) become a fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches target.

/*
Logic:
Calculate time each car needs to reach target.

time = (target - position) / speed

Sort cars by position descending: closest to target first.

Then scan from closest car to farthest car.

fleetTime stores the time of the fleet ahead.

If current car takes more time than fleetTime:
It cannot catch the fleet ahead, so it becomes a new fleet.

If current car takes less or equal time:
It catches the fleet ahead before or at target, so it joins that fleet.
*/

// Time: O(n log n)
// Space: O(n)
/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */
var carFleet = function (target, position, speed) {
  const cars = [];

  for (let i = 0; i < position.length; i++) {
    const time = (target - position[i]) / speed;
    cars.push([position[i], time]);
  }

  cars.sort((a, b) => b[0] - a[0]);

  let fleets = 0;
  let fleetTime = 0;

  for (const [pos, time] of cars) {
    // time > fleetTime means the current car is slower to reach the target.
    // time: how long this car takes to reach target
    // current car is slower than the fleet ahead, So it cannot catch up. Therefore it becomes a new fleet
    if (time > fleetTime) {
      fleets++;
      fleetTime = time;
    }
  }

  return fleets;
};
