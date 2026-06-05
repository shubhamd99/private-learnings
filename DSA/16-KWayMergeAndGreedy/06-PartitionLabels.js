// https://leetcode.com/problems/partition-labels/

// You are given a string s.
// We want to partition the string into as many parts as possible so that each letter appears in at most one part
// For example, the string "ababcc" can be partitioned into ["abab", "cc"],
// but partitions such as ["aba", "bcc"] or ["ab", "ab", "cc"] are invalid.

// Note that the partition is done so that after concatenating all the parts in order, the resultant string should be s.
// Return a list of integers representing the size of these parts.

// Input: s = "ababcbacadefegdehijhklij"
// Output: [9,7,8]
// Explanation:
// The partition is "ababcbaca", "defegde", "hijhklij".
// This is a partition so that each letter appears in at most one part.
// A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits s into less parts.

// Input: s = "eccbbbbdec"
// Output: [10]

/**
 * Approach:
 * We need to partition a string into as many parts as possible such that no
 * letter appears in more than one part. We return the sizes of these parts.
 *
 * Idea:
 * We can use a Greedy approach.
 * If a letter (like 'a') appears in a partition, that partition MUST stretch
 * far enough to include the very last occurrence of 'a' in the entire string.
 * So, we can figure out the "farthest reach" or "end boundary" for each partition.
 *
 * Steps:
 * 1. Find the Last Occurrences: Make a first pass through the string to record
 *    the last index where every character appears. We can store this in a map/object.
 * 2. Initialize Variables:
 *    - `result` array to store the sizes of our partitions.
 *    - `currentEnd = 0` to track the boundary of the current partition we are building.
 *    - `currentSize = 0` to track how big the current partition is getting.
 * 3. Make a Second Pass: Iterate through the string again character by character:
 *    - Increment `currentSize` by 1.
 *    - Check the last occurrence of the current character. If its last occurrence
 *      is further than our `currentEnd`, we MUST stretch our `currentEnd` to
 *      include it. `currentEnd = Math.max(currentEnd, lastOccurrence)`.
 *    - If our current index `i` reaches `currentEnd`, it means we have safely
 *      enclosed all occurrences of every character we've seen so far into this
 *      partition! We can "cut" the string here.
 *    - Push `currentSize` into `result`, and reset `currentSize = 0` for the next partition.
 * 4. Return `result`.
 *
 * Time Complexity: O(N)
 * - N is the length of the string. We iterate through the string twice
 *   (once to find last occurrences, once to build partitions), which is O(2N) -> O(N).
 *
 * Space Complexity: O(1)
 * - We store the last occurrence of characters. Since there are at most 26 lowercase
 *   English letters, the map/object size is bounded by 26, which is O(1) constant space.
 */

/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function (s) {
  const result = [];

  // Step 1: Record the last occurrence of each character
  const lastOccurrence = {};
  for (let i = 0; i < s.length; i++) {
    lastOccurrence[s[i]] = i;
  }

  // Step 2 & 3: Iterate and greedily find partition boundaries
  let currentEnd = 0;
  let currentSize = 0;

  for (let i = 0; i < s.length; i++) {
    currentSize++;

    // Stretch the boundary if this character appears later in the string
    currentEnd = Math.max(currentEnd, lastOccurrence[s[i]]);

    // If we reach the boundary, we make a cut
    if (i === currentEnd) {
      result.push(currentSize);
      currentSize = 0; // Reset for the next partition
    }
  }

  return result;
};
