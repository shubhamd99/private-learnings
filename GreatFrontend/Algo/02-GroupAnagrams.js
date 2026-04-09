// Group Anagrams
// Given an array of strings, group the anagrams together.
//
// Input:  ["eat","tea","tan","ate","nat","bat"]
// Output: [["eat","tea","ate"], ["tan","nat"], ["bat"]]

// ---- SIMPLE VERSION (for interviews) ----
// Idea: anagrams have the same sorted characters.
// Use sorted string as a Map key → group words with same key together.

function groupAnagrams(strs) {
  const map = new Map();

  for (const str of strs) {
    const key = str.split("").sort().join(""); // "eat" → "aet"
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(str);
  }

  return Array.from(map.values());
}

// Examples
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// [["eat","tea","ate"], ["tan","nat"], ["bat"]]

// Time: O(n * k log k) — n words, each sorted in O(k log k)
// Space: O(n * k) — storing all words in map
