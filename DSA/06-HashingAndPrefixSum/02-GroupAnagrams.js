// https://leetcode.com/problems/group-anagrams/description/
// Given an array of strings strs, group the anagrams together. You can return the answer in any order.

// Input: strs = ["eat","tea","tan","ate","nat","bat"]
// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
// Explanation:
// There is no string in strs that can be rearranged to form "bat".
// The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
// The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.

// Time - O(n * k log k)
// n = number of words
// k = average/max word length
// Space complexity: O(n * k) Because we store all words in groups.
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const map = new Map();

  for (const word of strs) {
    const key = word.split("").sort().join("");

    if (!map.has(key)) {
      map.set(key, []);
    }

    map.get(key).push(word);
  }

  return Array.from(map.values());
};

/*
Logic:
Anagrams are words with the same letters and the same letter counts,
but the order can be different.

Example:
"eat", "tea", and "ate" are anagrams because each has:
e = 1, a = 1, t = 1

Instead of sorting each word, we count how many times each letter appears.
For lowercase English letters, we use an array of size 26.

Each word creates a count key.
Words with the same key are anagrams, so we put them in the same group.
*/

// Time - O(n * k)
// n = number of words
// k = average word length
// Space - O(n * k) for storing output groups
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams2 = function (strs) {
  const map = new Map();

  for (const word of strs) {
    // count[0] is count of 'a', count[1] is count of 'b', etc.
    const count = new Array(26).fill(0);

    for (char of word) {
      const index = char.charCodeAt(0) - "a".charCodeAt(0);
      count[index]++;
    }

    // Convert counts into a unique key. Anagrams will produce the same key.
    const key = count.join("#");

    if (!map.has(key)) {
      map.set(key, []);
    }

    map.get(key).push(word);
  }

  return Array.from(map.values());
};
