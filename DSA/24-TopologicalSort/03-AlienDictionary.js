// https://leetcode.com/problems/alien-dictionary/description/

/**
 * Approach:
 * We need to deduce the alphabetical order of an alien language based on a
 * sorted dictionary of words.
 *
 * Idea:
 * We model this as a Topological Sort problem. Each unique character is a node.
 * By comparing adjacent words in the dictionary, we can find the first differing
 * character, which tells us that the character from the first word has a directed
 * edge (prerequisite) to the character in the second word. We build an adjacency
 * list and an in-degree map for all unique characters. If we detect an invalid
 * prefix situation, we return "". Finally, we run standard Kahn's Algorithm (BFS)
 * to topologically sort the characters. If the resulting string contains all
 * unique characters, we return it. If it doesn't, a cycle exists (return "").
 *
 * Steps:
 * 1. Initialize Graph: Create `inDegree` Map and `adjList` Map for all unique
 *    characters found in the `words` array.
 * 2. Build the Rules (Edges): Loop through adjacent word pairs `words[i]` and `words[i+1]`.
 *    - Edge Case Check: If word1 is longer than word2, AND word1 starts with word2
 *      (e.g., "abcd" vs "abc"), this is mathematically invalid. Return "".
 *    - Find the first differing character between word1 and word2.
 *    - If `adjList` for word1's char doesn't already contain word2's char:
 *        - Add it to the `adjList`.
 *        - Increment the `inDegree` for word2's char.
 *    - Break out of the character comparison loop (only the first diff matters).
 * 3. Find Starting Letters: Push all characters with an `inDegree` of 0 into the `queue`.
 * 4. Run BFS:
 *    - Pop a char, add it to our `result` string.
 *    - Loop through its unlocked chars in `adjList`.
 *    - Decrement their `inDegree`. If it hits 0, push to the queue.
 * 5. Return `result` if its length matches the number of unique characters, else "".
 *
 * Time Complexity: O(C)
 * - Where C is the total length of all words combined. We examine each character
 *   to build the initial graph, and we compare adjacent words taking at most O(C)
 *   time. The BFS also takes O(V + E) which is bounded by O(C).
 *
 * Space Complexity: O(1) or O(U + E)
 * - Since the alien language uses English letters, there are at most 26 unique
 *   vertices and 26^2 edges. Therefore, space is strictly bounded to O(1).
 */

/**
 * @param {string[]} words
 * @return {string}
 */
var alienOrder = function (words) {
  const inDegree = new Map();
  const adjList = new Map();

  // Find all unique letters and set them up
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words[i].length; j++) {
      const char = words[i][j];

      if (!inDegree.has(char)) {
        inDegree.set(char, 0);

        // Use a Set for adjacency to prevent duplicate edges easily
        adjList.set(char, new Set());
      }
    }
  }

  // Build the rules by comparing adjacent words
  for (let i = 0; i < words.length - 1; i++) {
    const word1 = words[i];
    const word2 = words[i + 1];

    // Edge Case: Prefix violation (e.g. "abcd" comes before "abc")
    if (word1.length > word2.length && word1.startsWith(word2)) {
      return ""; // Invalid dictionary!
    }

    // Find the first differing letter
    const minLen = Math.min(word1.length, word2.length);
    for (let j = 0; j < minLen; j++) {
      const char1 = word1[j];
      const char2 = word2[j];

      if (char1 !== char2) {
        // char1 comes before char2!
        // If we haven't already recorded this specific rule...
        if (!adjList.get(char1).has(char2)) {
          adjList.get(char1).add(char2); // char1 unlocks char2
          inDegree.set(char2, inDegree.get(char2) + 1); // char2 needs 1 more prereq
        }
        // Stop checking the rest of the word! Only the first difference matters.
        break;
      }
    }
  }

  // Find letters we can write down immediately (0 prereqs)
  const queue = [];
  for (const [char, degree] of inDegree.entries()) {
    if (degree === 0) {
      queue.push(char);
    }
  }

  let result = "";
  let head = 0;

  // Run the Topological Sort (BFS)
  while (head < queue.length) {
    const currentChar = queue[head];
    head++;

    result += currentChar; // Add to our final alphabet

    // Look at all the letters this character just unlocked
    const unlockedChars = adjList.get(currentChar);

    for (const nextChar of unlockedChars) {
      // Cross this prereq off the list for the next character
      inDegree.set(nextChar, inDegree.get(nextChar) - 1);

      // If it has 0 prereqs left, throw it in the queue!
      if (inDegree.get(nextChar) === 0) {
        queue.push(nextChar);
      }
    }
  }

  // Did we get trapped in a cycle?
  // If the length of our alphabet matches the unique characters, we win!
  if (result.length === inDegree.size) {
    return result;
  } else {
    return ""; // A cycle trapped us, impossible alphabet
  }
};
