// https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/

// Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the
// number could represent. Return the answer in any order.

// A mapping of digits to letters (just like on the telephone buttons) is given below.
// Note that 1 does not map to any letters.

// Input: digits = "23"
// Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

// Input: digits = "2"
// Output: ["a","b","c"]

/**
 * Approach:
 * We need to find all possible letter combinations for a given string of digits,
 * based on a standard telephone keypad mapping.
 *
 * Idea:
 * We use Backtracking. We maintain an `index` that tracks which digit in the
 * input string we are currently processing. At each step, we look up the possible
 * letters for the current digit. We loop through these letters, CHOOSE one
 * (push it to our combo array), EXPLORE the next digit (recursively call with
 * index + 1), and then UN-CHOOSE it (pop it) so we can try the next letter.
 * The base case is reached when our `index` equals the length of the digits string.
 *
 * Steps:
 * 1. Edge Case: If the `digits` string is empty, immediately return `[]`.
 * 2. Create a `phoneMap` object mapping each digit string to its letters.
 * 3. Initialize `result = []`.
 * 4. Create `backtrack(index, currentCombo)`:
 *    - Base Case: If `index === digits.length`, we have processed all numbers!
 *      Join the `currentCombo` array into a string, push it to `result`, and return.
 *    - Grab the `currentDigit` using `digits[index]`.
 *    - Grab the possible `letters` using `phoneMap[currentDigit]`.
 *    - Loop through every character in `letters`:
 *        - CHOOSE: `currentCombo.push(letters[i])`
 *        - EXPLORE: `backtrack(index + 1, currentCombo)`
 *        - UN-CHOOSE: `currentCombo.pop()`
 * 5. Call `backtrack(0, [])` to start at the first digit with an empty backpack.
 * 6. Return `result`.
 *
 * Time Complexity: O(4^N * N)
 * - Where N is the length of `digits`. The worst-case scenario is if the input
 *   contains only 7s and 9s (which have 4 letters each). There will be 4^N possible
 *   combinations. For each combination, it takes O(N) time to `.join('')` the array.
 *
 * Space Complexity: O(N)
 * - The recursion call stack will go exactly N deep. Our `currentCombo` array will
 *   hold at most N characters.
 */

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (digits.length === 0) {
    return [];
  }

  const phoneMap = {
    ["2"]: "abc",
    ["3"]: "def",
    ["4"]: "ghi",
    ["5"]: "jkl",
    ["6"]: "mno",
    ["7"]: "pqrs",
    ["8"]: "tuv",
    ["9"]: "wxyz",
  };

  const result = [];

  // Our standard recursive backtracking function
  function backtrack(index, currentCombo) {
    // BASE CASE: Did we press every number in the input?
    if (index === digits.length) {
      // We turn our array of characters ['a', 'd'] into a string "ad"
      result.push(currentCombo.join(""));
      return;
    }

    // What number are we currently pressing?
    const currentDigit = digits[index];
    // What letters belong to this number?
    const letters = phoneMap[currentDigit];

    // Loop through all the possible letters for this number
    for (let i = 0; i < letters.length; i++) {
      // 1. CHOOSE: Pick a letter and put it in the backpack
      currentCombo.push(letters[i]);

      // 2. EXPLORE: Move forward to the NEXT phone number (index + 1)
      backtrack(index + 1, currentCombo);

      // 3. UN-CHOOSE (Backtrack): Take the letter out so the loop
      // can try the next letter on this same phone button!
      currentCombo.pop();
    }
  }

  // Start at index 0 (the first phone number) with an empty backpack
  backtrack(0, []);

  return result;
};
