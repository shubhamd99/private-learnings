// https://leetcode.com/problems/koko-eating-bananas/

// Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas.
// The guards have gone and will come back in h hours.

// Koko can decide her bananas-per-hour eating speed of k
// Each hour, she chooses some pile of bananas and eats k bananas from that pile.

// If the pile has less than k bananas, she eats all of them instead and
// will not eat any more bananas during this hour.

// Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.
// Return the minimum integer k such that she can eat all the bananas within h hours.

// Input: piles = [3,6,7,11], h = 8
// Output: 4

/*
Logic:
We need to find the minimum eating speed k.

k means:
How many bananas Koko eats per hour.

We do not know k directly, so we binary search the answer.

Possible k values:
minimum speed = 1
maximum speed = biggest pile

Why biggest pile?
If k equals the biggest pile, then every pile can be finished in at most 1 hour.
Any speed bigger than biggest pile is not useful, because a pile still takes at least 1 hour.

Important:
piles does not need to be sorted.
We are not binary searching the piles array.
We are binary searching possible speeds: 1 to max pile.

For each guessed speed mid:
Calculate how many hours Koko needs.

For one pile:
hours = Math.ceil(pile / mid)

Why Math.ceil?
Because if there are leftover bananas, they still need one full extra hour.

Example:
pile = 7, speed = 3
7 / 3 = 2.33
So Koko needs 3 hours.

If total hours <= h:
This speed works.
But maybe a smaller speed also works, so search left side.
right = mid

If total hours > h:
This speed is too slow, so search bigger speeds.
left = mid + 1

We use while (left < right):
When left === right, only one possible speed remains.
That speed is the minimum valid speed.
*/

// Time: O(log n)
// Space: O(1)
/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
  let left = 1;
  let right = Math.max(...piles); // piles does not need to be sorted.

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    let hours = 0;

    // Calculate total hours needed if Koko eats mid bananas per hour.
    for (const pile of piles) {
      // We use Math.ceil because Koko needs whole hours. If a pile does not divide evenly by speed k, she still needs one extra hour to finish the remaining bananas.
      hours += Math.ceil(pile / mid);
    }

    if (hours <= h) {
      // mid speed works, but try smaller speed.
      // Keep mid because it could be the answer.
      right = mid;
    } else {
      // mid speed is too slow, need bigger speed.
      left = mid + 1;
    }
  }

  return left;
};
