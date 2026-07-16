// https://leetcode.com/problems/decode-ways/

// You have intercepted a secret message encoded as a string of numbers. The message is decoded via the following mapping:

// "1" -> 'A'
// "2" -> 'B'
// ...
// "25" -> 'Y'
// "26" -> 'Z'

// However, while decoding the message, you realize that there are many different ways you can decode the message
// because some codes are contained in other codes ("2" and "5" vs "25").

// For example, "11106" can be decoded into:
// "AAJF" with the grouping (1, 1, 10, 6)
// "KJF" with the grouping (11, 10, 6)
// The grouping (1, 11, 06) is invalid because "06" is not a valid code (only "6" is valid)
// Note: there may be strings that are impossible to decode.

// Given a string s containing only digits, return the number of ways to decode it.
// If the entire string cannot be decoded in any valid way, return 0.
// The test cases are generated so that the answer fits in a 32-bit integer.

// Input: s = "12"
// Output: 2
// Explanation:
// "12" could be decoded as "AB" (1 2) or "L" (12).

/**
 * Approach:
 * We need to find the total number of ways to decode a string of digits into letters,
 * where 'A' -> "1" up to 'Z' -> "26".
 *
 * Idea:
 * This problem is a constrained variation of Climbing Stairs. We use 1D Dynamic
 * Programming (Bottom-Up Tabulation) with Space Optimization. At each digit, we
 * can either decode it by itself (a 1-step) if it is between '1'-'9', or we can
 * decode it with the previous digit (a 2-step) if they form a number between
 * '10'-'26'. We maintain two variables (`oneStepBefore` and `twoStepsBefore`) to
 * track the number of valid decode ways up to that point. If a digit is a '0' and
 * cannot be paired with a previous '1' or '2', our `currentWays` will evaluate
 * to 0, which correctly kills the path.
 *
 * Steps:
 * 1. Edge Case: If the string starts with '0', it is impossible to decode. Return 0.
 * 2. Initialize our sticky notes:
 *    - `twoStepsBefore = 1` (Mathematically representing the empty string base case)
 *    - `oneStepBefore = 1`  (We already validated the first digit isn't '0')
 * 3. Loop from index 1 to the end of the string:
 *    - Initialize `currentWays = 0` for this specific digit.
 *    - 1-Step Check: If the current digit is NOT '0', we can decode it alone.
 *      Add `oneStepBefore` to `currentWays`.
 *    - 2-Step Check: Check the previous digit and current digit together. If they
 *      form "10" through "26", we can decode them together. Add `twoStepsBefore`
 *      to `currentWays`.
 *    - Shift variables forward: `twoStepsBefore = oneStepBefore`, and
 *      `oneStepBefore = currentWays`.
 * 4. After the loop, `oneStepBefore` will hold the final total number of ways.
 *
 * Time Complexity: O(N)
 * - We iterate through the string of length N exactly once, performing O(1) checks.
 *
 * Space Complexity: O(1)
 * - Thanks to Space Optimization, we only use a few variables (`oneStepBefore`,
 *   `twoStepsBefore`, `currentWays`). We completely avoided an O(N) array!
 */

/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  // If the string starts with a '0', it is completely invalid.
  if (s[0] === "0") {
    return 0;
  }

  let twoStepsBefore = 1;
  let oneStepBefore = 1;

  // Start looking at the second digit (index 1)
  for (let i = 1; i < s.length; i++) {
    let currentWays = 0;

    // 1-STEP CHECK: Is the single digit valid? (1 - 9)
    // If it's not a '0', it's valid!
    if (s[i] !== "0") {
      currentWays += oneStepBefore;
    }

    // 2-STEP CHECK: Are the two digits together valid? (10 - 26)
    // It must start with '1' (10-19) OR start with '2' and end with '0'-'6' (20-26)
    if (s[i - 1] === "1" || (s[i - 1] === "2" && s[i] <= "6")) {
      currentWays += twoStepsBefore;
    }

    // Shift our variables forward down the string!
    twoStepsBefore = oneStepBefore;
    oneStepBefore = currentWays;
  }

  // By the time we reach the end, oneStepBefore holds our final answer
  return oneStepBefore;
};

// In House Robber:

// rob1 (The smaller number) holds the older value (from 2 houses ago).
// rob2 (The bigger number) holds the newer value (from 1 house ago).
// The numbers count UP as you get closer to the present.

// In Decode Ways:

// twoStepsBefore (The bigger number) holds the older value.
// oneStepBefore (The smaller number) holds the newer value.
// The numbers count DOWN as you get closer to the present.
