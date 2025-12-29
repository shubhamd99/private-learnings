// Algorithm to count the number of sub string occurrence in a string
// Overlapping
// Non-Overlapping

//Overlapping (Will check at every next character)
// 2
//'aa' found at first and second position and 'aa' also found at second and third position
//Non-Overlapping (Will check at an interval of sub-strings length)
// 1
//'aa' found at first and second position then it will check for 3 and 4 the position, as 4 the elements does not exit so it returns 1 count only.

// Naive approach using brute force method

// Non-overlapping
// We will start at 0 position and check if sub-string exist's in the given string.
// As we are not checking overlapping sub-strings so we will increment the position with the length of sub-string.
// We continue this until no sub-string is found.
// To solve this we will be using String indexOf() method.

// Time Complexity: O(n * m) where n is the length of the string and m is the length of the sub-string.
// We are using String indexOf() method for checking the sub-string at interval of sub-strings length(m) and we are doing it on whole string(n), so Time Complexity is O(m * n).
// Space Complexity: O(1). We are using fixed space to store the values so the Space Complexity is O(1).
/**
 *
 * @param {string} string
 * @param {string} subString
 * @returns
 */
function countSubStringsNonOverlapping(string, subString) {
  // An empty substring "" is considered to exist between every character
  if (subString.length <= 0) return subString.length + 1;

  let count = 0; // number of matches found
  let pos = 0; // current search position
  let step = subString.length; // how far to jump after a match

  while (true) {
    // Searches for subString starting from index pos
    pos = string.indexOf(subString, pos);

    // -1 -> nothing found
    if (pos >= 0) {
      ++count; // The variable is incremented first, and then the new value is returned and used in the expression.
      pos += step; // Moves search forward by substring length
    } else {
      break;
    }
  }

  return count;
}

console.log(countSubStringsNonOverlapping("foofoobar", "foo"));
console.log(countSubStringsNonOverlapping("aaaa", "aaa"));

//  Output:
//  2
//  1

// Overlapping
// We will start at 0 position and check if sub-string exist's in the given string.
// As we are checking overlapping sub-strings so we will increment the position by 1.
// We continue this until no sub-string is found.
// To solve this we will be using String indexOf() method.

// Time Complexity: O(n * m) where n is the length of the string and m is the length of the sub-string.
// Space Complexity: O(1).
/**
 *
 * @param {string} string
 * @param {string} subString
 * @returns
 */
function countSubStrings(string, subString) {
  // An empty substring "" is considered to exist between every character
  if (subString.length <= 0) return subString.length + 1;

  let count = 0;
  let pos = 0;
  let step = 1;

  while (true) {
    pos = string.indexOf(subString, pos);
    if (pos >= 0) {
      ++count;
      pos += step;
    } else {
      break;
    }
  }

  return count;
}

console.log(countSubStrings("foofoobar", "foo")); // 2
console.log(countSubStrings("aaaa", "aaa")); // 2
