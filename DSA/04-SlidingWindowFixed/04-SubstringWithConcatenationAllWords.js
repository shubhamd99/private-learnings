// https://leetcode.com/problems/substring-with-concatenation-of-all-words/description/

// You are given a string s and an array of strings words. All the strings of words are of the same length.
// A concatenated string is a string that exactly contains all the strings of any permutation of words concatenated.

// Input: s = "barfoothefoobarman", words = ["foo","bar"]
// Output: [0,9]
// The substring starting at 0 is "barfoo". It is the concatenation of ["bar","foo"] which is a permutation of words.
// The substring starting at 9 is "foobar". It is the concatenation of ["foo","bar"] which is a permutation of words.

// s = "barfoothefoobarman"
// words = ["foo", "bar"], wordLength = 3, windowSize = 6 (Because you need to fit all words in the window, not just one word)

// i=0  window is "barfoo"
// i=1  window is "arfoot"
// i=2  window is "rfooth"
// ...

// For each starting position i, you check if the window starting there is a valid concatenation.

// Inner while loop — extract words one by one
// i=0:
//   extract "bar" -> valid, continue
//   extract "foo" -> valid, continue
//   j reached words.length -> push 0

// i=1:
//   extract "arf" -> not in wordMap, break immediately
//   j never reached words.length -> skip

// fixed sliding window of size words.length * wordLength
// slide one character at a time, extract words of fixed length from window
// compare window frequency map with words frequency map, if match record start index

/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function (s, words) {
  const results = [];
  const wordLength = words[0].length;
  const windowSize = words.length * wordLength;
  const wordMap = {};

  // build frequency map for words
  for (const word of words) {
    wordMap[word] = (wordMap[word] || 0) + 1;
  }

  // slide window one character at a time
  for (let i = 0; i <= s.length - windowSize; i++) {
    const windowMap = {};
    let j = 0;

    // extract words of fixed length from current window
    while (j < words.length) {
      const word = s.substring(
        i + j * wordLength,
        i + j * wordLength + wordLength,
      );

      if (wordMap[word]) {
        windowMap[word] = (windowMap[word] || 0) + 1;

        // word appears more times than in wordMap, break
        if (windowMap[word] > wordMap[word]) {
          break;
        }
      } else {
        // word not in wordMap, break
        break;
      }

      j++;
    }

    // if all words matched, record start index
    if (j === words.length) {
      results.push(i);
    }
  }

  return results;
};

// Time: O(n * m)

// Outer loop runs n - windowSize times, roughly O(n)
// Inner while loop runs m times where m is words.length
// substring is O(wordLength) but since all words have the same fixed length it is a constant factor

// Overall O(n * m).
// Space: O(m)

// wordMap holds at most m unique words
// windowMap holds at most m unique words at any point
// results is output so not counted in space complexity

// Overall O(m).
