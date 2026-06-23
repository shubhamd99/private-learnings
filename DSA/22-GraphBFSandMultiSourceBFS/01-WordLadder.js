// https://leetcode.com/problems/word-ladder/description/ - HARD

// Graph BFS (Breadth-First Search)
// Breadth-First Search is a traversal algorithm for a graph data structure that starts at a single,
// specific source node and explores all of its immediate neighboring nodes (depth level 1) before moving on
// to explore the neighbors of those nodes (depth level 2), and so on.

// We do this using a Queue (a First-In-First-Out waiting line). You put your starting node in the queue,
// process it, and push all its neighbors to the back of the line.

// You use Multi-source BFS whenever you need to find the shortest distance,
// but there are multiple valid starting points.
// Multi-source BFS is a variation of the standard Breadth-First Search algorithm that initializes the search
// from multiple starting nodes simultaneously. By placing all source nodes into the queue at the very beginning
// (all at depth level 0), the algorithm expands outward from all sources at the same time.

// A transformation sequence from word beginWord to word endWord using a dictionary wordList is a
// sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:
// Every adjacent pair of words differs by a single letter.
// Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
// sk == endWord
// Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the
// shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

// Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
// Output: 5
// Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.

/**
 * Approach:
 * We need to find the shortest transformation sequence from a beginWord to an
 * endWord, changing one letter at a time, using only valid dictionary words.
 *
 * Idea:
 * This is a classic shortest-path problem on an unweighted graph, making it
 * perfect for Breadth-First Search (BFS). We will use a Queue to explore the
 * graph level by level. To find neighboring nodes, instead of comparing the
 * current word to every word in the dictionary (which is slow), we will take the
 * current word, change every single character to 'a' through 'z', and check if
 * that newly generated word exists in our dictionary Set. If it does, it's a
 * valid step. We remove it from the Set (which acts as our `visited` check) and
 * push it to the queue.
 *
 * Steps:
 * 1. Setup the Set: Convert `wordList` into a `Set` for O(1) instant lookups.
 *    If `endWord` isn't even in the set, return 0 immediately.
 * 2. Initialize Queue: Push `[beginWord, 1]` to the queue (word, sequence length).
 *    Create a `head` pointer for fast O(1) shifting.
 * 3. Run BFS: Loop while queue is not empty.
 *    - Grab the front item: `const [currentWord, steps] = queue[head++]`.
 *    - Target Check: If `currentWord === endWord`, we win! Return `steps`.
 *    - Find Neighbors: Loop through every character position in `currentWord`.
 *      - Loop through the alphabet ('a' to 'z').
 *      - Create a new string by replacing the character at the current position.
 *      - If this `newWord` exists in our `wordSet`:
 *          - SINK IT (Mark as visited): `wordSet.delete(newWord)`.
 *          - Push to queue: `queue.push([newWord, steps + 1])`.
 * 4. If the queue empties and we never found the target, return 0.
 *
 * Time Complexity: O(M^2 * N)
 * - M is the length of each word, and N is the total number of words in the
 *   dictionary. For every word we process (up to N times), we do M iterations
 *   to replace characters, and in each iteration, we create a substring which
 *   takes O(M) time. So creating the neighbors takes O(M^2) time per word.
 *
 * Space Complexity: O(M * N)
 * - We store all the words in the Set, and the Queue can also hold up to N
 *   words at a time. Each word is length M.
 */

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {
  //  Create a Set for instant lookups and a "visited" notebook
  const wordSet = new Set(wordList);

  // If the destination doesn't even exist in the dictionary, it's impossible
  if (!wordSet.has(endWord)) {
    return 0;
  }

  // Initialize Queue with [word, sequenceLength]
  const queue = [[beginWord, 1]];
  const LETTERS = 26;
  let head = 0; // O(1) shift pointer

  while (head < queue.length) {
    const [currentWord, steps] = queue[head];
    head++;

    // Did we reach the finish line?
    if (currentWord === endWord) {
      return steps;
    }

    // We need to try changing EVERY letter in the current word to a-z
    for (let i = 0; i < currentWord.length; i++) {
      // Loop through all 26 letters of the alphabet
      for (let j = 0; j < LETTERS; j++) {
        // String.fromCharCode(97) is 'a', 98 is 'b', etc.
        const newChar = String.fromCharCode(97 + j);

        // Skip if it's the exact same letter we already have
        if (newChar === currentWord[i]) continue;

        // Build the new Frankenstein word!
        // We take the word up to index 'i', insert our new character,
        // and then add the rest of the word after index 'i'
        const newWord =
          currentWord.slice(0, i) + newChar + currentWord.slice(i + 1);

        // Is this a valid dictionary word?
        if (wordSet.has(newWord)) {
          // YES! Mark it as visited by deleting it from the Set
          // so we never loop back to it.
          wordSet.delete(newWord);

          // Push it to the queue to explore later
          queue.push([newWord, steps + 1]);
        }
      }
    }
  }

  // The queue emptied and we hit a dead end
  return 0;
};

// --- EXAMPLE TRACE: Word Ladder ---

// Input:
// beginWord = "hit"
// endWord   = "cog"
// wordList  = ["hot", "dot", "dog", "lot", "log", "cog"]

// Setup:
// - Convert wordList into a Set:
//   wordSet = {"hot", "dot", "dog", "lot", "log", "cog"}
// - Initialize Queue with starting word and distance 1:
//   Queue = [ ["hit", 1] ]

// ---------------------------------------------------------
// Step 1: Process "hit"
// ---------------------------------------------------------
// - Pull from Queue: currentWord = "hit", steps = 1
// - Try replacing the 1st letter (*it): ait, bit... no matches.
// - Try replacing the 2nd letter (h*t): hat, hbt... "hot"!
//   > Is "hot" in wordSet? YES!
//   > Delete "hot" from Set. (Set is now {"dot", "dog", "lot", "log", "cog"})
//   > Push ["hot", 2] to Queue.
// - Try replacing the 3rd letter (hi*): hia, hib... no matches.

// Current Queue: [ ["hot", 2] ]

// ---------------------------------------------------------
// Step 2: Process "hot"
// ---------------------------------------------------------
// - Pull from Queue: currentWord = "hot", steps = 2
// - Try replacing 1st letter (*ot): "dot"!
//   > Is "dot" in wordSet? YES!
//   > Delete "dot" from Set.
//   > Push ["dot", 3] to Queue.
// - Still replacing 1st letter (*ot): "lot"!
//   > Is "lot" in wordSet? YES!
//   > Delete "lot" from Set.
//   > Push ["lot", 3] to Queue.
// - Try replacing 2nd/3rd letters: no matches.

// Current Queue: [ ["dot", 3], ["lot", 3] ]

// ---------------------------------------------------------
// Step 3: Process "dot"
// ---------------------------------------------------------
// - Pull from Queue: currentWord = "dot", steps = 3
// - Try replacing 1st letter (*ot): "hot", "lot" (Both already deleted from Set, so ignored).
// - Try replacing 2nd letter (d*t): dat, dit... no matches.
// - Try replacing 3rd letter (do*): "dog"!
//   > Is "dog" in wordSet? YES!
//   > Delete "dog" from Set.
//   > Push ["dog", 4] to Queue.

// Current Queue: [ ["lot", 3], ["dog", 4] ]

// ---------------------------------------------------------
// Step 4: Process "lot"
// ---------------------------------------------------------
// - Pull from Queue: currentWord = "lot", steps = 3
// - Try replacing 1st letter (*ot): no matches left in Set.
// - Try replacing 2nd letter (l*t): lat, lit... no matches.
// - Try replacing 3rd letter (lo*): "log"!
//   > Is "log" in wordSet? YES!
//   > Delete "log" from Set.
//   > Push ["log", 4] to Queue.

// Current Queue: [ ["dog", 4], ["log", 4] ]

// ---------------------------------------------------------
// Step 5: Process "dog"
// ---------------------------------------------------------
// - Pull from Queue: currentWord = "dog", steps = 4
// - Try replacing 1st letter (*og): "cog"!
//   > Is "cog" in wordSet? YES!
//   > Delete "cog" from Set.
//   > Push ["cog", 5] to Queue.
// - Try replacing 2nd/3rd letters: no matches.

// Current Queue: [ ["log", 4], ["cog", 5] ]

// ---------------------------------------------------------
// Step 6: Process "log"
// ---------------------------------------------------------
// - Pull from Queue: currentWord = "log", steps = 4
// - Try replacing 1st letter (*og): "cog" (Already deleted in Step 5, so ignored).
// - Try replacing 2nd/3rd letters: no matches.

// Current Queue: [ ["cog", 5] ]

// ---------------------------------------------------------
// Step 7: Process "cog"
// ---------------------------------------------------------
// - Pull from Queue: currentWord = "cog", steps = 5
// - Check: Does currentWord === endWord? YES! ("cog" === "cog")
// - RETURN steps: 5

// Final Shortest Path Found:
// "hit" -> "hot" -> "dot" -> "dog" -> "cog" (5 words total!)
