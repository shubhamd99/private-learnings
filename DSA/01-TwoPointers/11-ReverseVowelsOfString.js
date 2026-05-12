// https://leetcode.com/problems/reverse-vowels-of-a-string/description/

// Given a string s, reverse only all the vowels in the string and return it.
// The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both lower and upper cases, more than once.

// Input: s = "IceCreAm"
// Output: "AceCreIm"
// Explanation:
// The vowels in s are ['I', 'e', 'e', 'A']. On reversing the vowels, s becomes "AceCreIm".

/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function (s) {
  const vowels = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);
  const chars = s.split("");

  let left = 0;
  let right = chars.length - 1;

  while (left < right) {
    // Move left until we find a vowel.
    while (left < right && !vowels.has(chars[left])) {
      left++;
    }

    // Move right until we find a vowel.
    while (left < right && !vowels.has(chars[right])) {
      right--;
    }

    // Swap the two vowels.
    [chars[left], chars[right]] = [chars[right], chars[left]];

    left++;
    right--;
  }

  return chars.join("");
};
