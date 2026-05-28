// Two strings are anagrams if they contain the same characters
// with the same frequency — just in different order.

// "listen" and "silent"  → anagram
// "hello"  and "world"   → not anagram

// listen → l,i,s,t,e,n
// silent → s,i,l,e,n,t  ← same letters, different order

function isAnagram(str1, str2) {
  // remove spaces and lowercase both
  const clean1 = str1.replace(/\s/g, "").toLowerCase();
  const clean2 = str2.replace(/\s/g, "").toLowerCase();

  // different lengths -> not anagram
  if (clean1.length !== clean2.length) {
    return false;
  }

  // sort both and compare
  return clean1.split("").sort().join("") === clean2.split("").sort().join("");
}

// Usage
console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world")); // false
console.log(isAnagram("Astronomer", "Moon starer")); // true
console.log(isAnagram("abc", "ab")); // false

// Optimal approach — frequency counter O(n)
function isAnagram2(str1, str2) {
  const clean1 = str1.replace(/\s/g, "").toLowerCase();
  const clean2 = str2.replace(/\s/g, "").toLowerCase();

  // different lengths -> not anagram
  if (clean1.length !== clean2.length) {
    return false;
  }

  const freq = {};

  // count characters in str1
  for (let char of clean1) {
    if (freq[char] === undefined) {
      freq[char] = 0; // first time seeing this char
    }
    freq[char] = freq[char] + 1; // increment
  }

  // decrement for str2
  for (let char of clean2) {
    if (!freq[char]) {
      return false; // char not found
    }
    freq[char] = freq[char] - 1; // decrement
  }

  return true; // all counts balanced
}

console.log(isAnagram2("listen", "silent")); // true
console.log(isAnagram2("hello", "world")); // false
console.log(isAnagram2("Astronomer", "Moon starer")); // true
console.log(isAnagram2("abc", "ab")); // false

// Approach
// Sort and compare - Time O(n log n) and Space O(n)
// Frequency counter - Time O(n) and Space O(n)
