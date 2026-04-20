// Group Anagrams
// Given an array of strings, group the anagrams together.
//
// Input:  ["eat","tea","tan","ate","nat","bat"]
// Output: [["eat","tea","ate"], ["tan","nat"], ["bat"]]

// ---- SIMPLE VERSION (for interviews) ----
// Idea: anagrams have the same sorted characters.
// Use sorted string as a Map key → group words with same key together.

// Time: O(n * k log k) — n words, each sorted in O(k log k)
// Space: O(n * k) — storing all words in map

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagrams = (strs) => {
  const map = new Map();

  for (const str of strs) {
    // Sort the string to create a consistent key
    const sortedKey = str.split("").sort().join("");

    if (!map.has(sortedKey)) {
      map.set(sortedKey, []);
    }
    map.get(sortedKey).push(str);
  }

  return Array.from(map.values());
};

// Examples
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// [["eat","tea","ate"], ["tan","nat"], ["bat"]]

// Optimal Counting Approach
// This approach avoids sorting, which improves efficiency for longer strings. Instead of sorting,
// we generate a frequency count key for each string.
// Since we have a-z, we can use an array of size 26 or
// a string representation of the character counts as the key.

// Time Complexity: O(n * k), where n is the number of strings and k is the maximum length of a string.
// Space Complexity: O(n * k) - Why? In the worst-case scenario (where no strings are anagrams), the Map will store every single string from the input.
// it is linear relative to the total size of the input (total characters), because we process each character in each string exactly once.

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagramsOptimal = (strs) => {
  // Dictionary
  const map = new Map();

  for (const str of strs) {
    const count = new Array(26).fill(0);

    // Count occurrences of each character 'a'-'z'
    for (const char of str) {
      count[char.charCodeAt(0) - "a".charCodeAt(0)]++;
    }

    // Create a unique key based on the frequency array
    const key = count.join("#");

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(str);
  }

  return Array.from(map.values());
};

// The Frequency "Fingerprint"
// Instead of sorting the string (which is slow), we create an array of 26 zeros, representing the alphabet from a to z.
// As we iterate through a word like "eat", we increment the value at the index corresponding to each letter.
// 'a' maps to index 0, 'b' to index 1, and so on, using the formula: char.charCodeAt(0) - 97.
// The lowercase letter 'a' has an ASCII value of 97
// For 'a': 97 - 97 = 0 and	For 'b': 98 - 97 = 1

// Creating the Map Key
// Once the array is filled, we need to use it as a key in our Map.
// However, in JavaScript, arrays are reference types; two different arrays with the same numbers are not considered "equal" keys.
// The Solution: We convert the array into a string using .join('#').
// For "eat", the key might look like 1#0#0#0#1#0...1#... (representing 1 'a', 1 'e', and 1 't').
// Why the #? The delimiter ensures that a count of 1 and 11 doesn't get blurred together (e.g., 1#1 vs 11#).

// Examples
console.log(groupAnagramsOptimal(["eat", "tea", "tan", "ate", "nat", "bat"]));
// [["eat","tea","ate"], ["tan","nat"], ["bat"]]
