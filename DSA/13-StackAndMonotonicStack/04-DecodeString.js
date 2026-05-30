// https://leetcode.com/problems/decode-string/description/

// Given an encoded string, return its decoded string.

// The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets
// is being repeated exactly k times. Note that k is guaranteed to be a positive integer.

// Input: s = "3[a]2[bc]"
// Output: "aaabcbc"
// Input: s = "3[a2[c]]"
// Output: "accaccacc"

/*
Logic: Use a stack because encoded strings can be nested.

Example: s = "3[a2[c]]"

The inner part must be solved first: 2[c] = "cc"

Then: a2[c] = "acc"

Then: 3[acc] = "accaccacc"

We keep:
currentString = string we are building right now
currentNumber = repeat count we are reading right now
stack = stores previous string and repeat count before entering [

When we see a digit:
Build the number.
Example: "12[a]" means 12, not 1 and 2.

When we see "[":
Push currentString and currentNumber to stack.
Then reset currentString and currentNumber for inside bracket.

When we see a letter:
Add it to currentString.

When we see "]":
Pop previous string and repeat count.
Repeat currentString and attach it to previous string.
*/

// Time - O(output length)
// Space - O(output length)
/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
  const stack = [];

  let currentString = "";
  let currentNumber = 0;

  for (const char of s) {
    if (!isNaN(char)) {
      // builds multi-digit numbers
      // Read 1 - currentNumber = 0 * 10 + 1 = 1
      // Read 2 - currentNumber = 1 * 10 + 2 = 12
      currentNumber = currentNumber * 10 + Number(char);
    } else if (char === "[") {
      stack.push([currentString, currentNumber]);

      currentString = "";
      currentNumber = 0;
    } else if (char === "]") {
      const [previousString, repeatCount] = stack.pop();

      currentString = previousString + currentString.repeat(repeatCount);
    } else {
      currentString += char;
    }
  }

  return currentString;
};

// s = "3[a2[c]]"

// Start:
// stack = []
// currentString = ""
// currentNumber = 0

// --------------------------------------------------
// char = "3"

// It is a digit.

// currentNumber = currentNumber * 10 + Number("3")
// currentNumber = 0 * 10 + 3
// currentNumber = 3

// stack = []
// currentString = ""
// currentNumber = 3

// --------------------------------------------------
// char = "["

// Start of a bracket section.

// Push current state:
// stack.push([currentString, currentNumber])
// stack.push(["", 3])

// Now reset for inside bracket:
// currentString = ""
// currentNumber = 0

// stack = [["", 3]]
// currentString = ""
// currentNumber = 0

// --------------------------------------------------
// char = "a"

// It is a letter.

// Add to currentString:
// currentString = "a"

// stack = [["", 3]]
// currentString = "a"
// currentNumber = 0

// --------------------------------------------------
// char = "2"

// It is a digit.

// currentNumber = currentNumber * 10 + Number("2")
// currentNumber = 0 * 10 + 2
// currentNumber = 2

// stack = [["", 3]]
// currentString = "a"
// currentNumber = 2

// --------------------------------------------------
// char = "["

// Start of another nested bracket section.

// Push current state:
// stack.push([currentString, currentNumber])
// stack.push(["a", 2])

// Reset for inside bracket:
// currentString = ""
// currentNumber = 0

// stack = [["", 3], ["a", 2]]
// currentString = ""
// currentNumber = 0

// --------------------------------------------------
// char = "c"

// It is a letter.

// Add to currentString:
// currentString = "c"

// stack = [["", 3], ["a", 2]]
// currentString = "c"
// currentNumber = 0

// --------------------------------------------------
// char = "]"

// End of current bracket section.

// Pop last saved state:
// [previousString, repeatCount] = stack.pop()
// previousString = "a"
// repeatCount = 2

// Repeat currentString:
// currentString.repeat(2) = "c".repeat(2) = "cc"

// Attach to previousString:
// currentString = previousString + repeatedString
// currentString = "a" + "cc"
// currentString = "acc"

// stack = [["", 3]]
// currentString = "acc"
// currentNumber = 0

// --------------------------------------------------
// char = "]"

// End of outer bracket section.

// Pop last saved state:
// [previousString, repeatCount] = stack.pop()
// previousString = ""
// repeatCount = 3

// Repeat currentString:
// currentString.repeat(3) = "acc".repeat(3)
// = "accaccacc"

// Attach to previousString:
// currentString = "" + "accaccacc"
// currentString = "accaccacc"

// stack = []
// currentString = "accaccacc"
// currentNumber = 0

// --------------------------------------------------

// End of string.

// Return:
// "accaccacc"
