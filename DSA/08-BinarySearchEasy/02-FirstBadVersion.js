// https://leetcode.com/problems/first-bad-version/description/

// You are a product manager and currently leading a team to develop a new product.
// Unfortunately, the latest version of your product fails the quality check.
// Since each version is developed based on the previous version, all the versions after a bad version are also bad.

// Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.
// You are given an API bool isBadVersion(version) which returns whether version is bad. Implement a function to find the first bad version.
// You should minimize the number of calls to the API.

// Input: n = 5, bad = 4
// Output: 4
// Explanation:
// call isBadVersion(3) -> false
// call isBadVersion(5) -> true
// call isBadVersion(4) -> true
// Then 4 is the first bad version.

/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/*
Logic:
We need to find the first bad version.

Versions are in this order:

good good good bad bad bad
               ^
        first bad version

Once a version is bad, every version after it is also bad.

So this is a binary search problem.

We keep a search range from left to right.

If mid is bad:
That means the first bad version is either mid itself
or somewhere before mid.

So we keep mid in the search range:
right = mid

Why not right = mid - 1?
Because mid might be the first bad version.

If mid is good:
Then mid cannot be the answer.
All versions before mid are also good.
So the first bad version must be after mid:
left = mid + 1

We stop when left === right.
At that point, only one version is left,
and that must be the first bad version.
*/

// Time: O(log n) each iteration halves the search space.
// Space: O(1);
/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    let left = 0;
    let right = n;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      const isBad = isBadVersion(mid);

      if (isBadVersion(mid)) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    return left;
  };
};
