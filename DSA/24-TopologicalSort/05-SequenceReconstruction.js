// https://leetcode.com/problems/sequence-reconstruction/description/

/**
 * Approach:
 * We need to determine if a set of sequences can uniquely reconstruct a given
 * target array `nums`.
 *
 * Idea:
 * We can model this as a Topological Sort problem. Each number is a node, and
 * each adjacent pair in the `sequences` arrays represents a directed edge
 * (prerequisite). We build the graph and calculate in-degrees. Then, we run BFS
 * (Kahn's Algorithm). The critical insight is that for a topological sort to be
 * 100% unique, there must only ever be EXACTLY ONE node with an in-degree of 0
 * at any given time. If the queue size ever becomes > 1, there is ambiguity
 * (multiple valid choices), so we return false. We also verify that the single
 * forced path perfectly matches the target `nums` array.
 *
 * Steps:
 * 1. Setup Graph: Initialize `adjList` (using Sets to avoid duplicate edges)
 *    and `inDegree` arrays of size `n + 1` (since numbers are 1-indexed).
 * 2. Build Graph: Loop through every `seq` in `sequences`.
 *    - For each adjacent pair `u = seq[j]` and `v = seq[j+1]`, add `v` to `u`'s
 *      adjacency Set. If it's a brand new edge, increment `inDegree[v]`.
 * 3. Initial Queue: Push all nodes from `1` to `n` that have `inDegree === 0`.
 * 4. Run BFS:
 *    - Guard Clause: `if (queue.length > 1) return false;` (Ambiguity detected!)
 *    - Pop the only node `curr`.
 *    - Check if `curr` matches the expected number in `nums[index]`. If not, return false.
 *    - Iterate through `curr`'s neighbors, decrementing their `inDegree`.
 *    - If a neighbor hits 0, push it to the queue.
 * 5. Return true if we successfully processed all `n` nodes.
 *
 * Time Complexity: O(V + E)
 * - V is `n` (the length of nums). E is the total number of elements across all
 *   subsequences in `sequences`. We visit each node and edge once.
 *
 * Space Complexity: O(V + E)
 * - To store the graph (adjacency list and in-degrees) and the queue.
 */

/**
 * @param {number[]} nums
 * @param {number[][]} sequences
 * @return {boolean}
 */
var sequenceReconstruction = function (nums, sequences) {
  const n = nums.length;

  // Setup graph (1-indexed, so we use size n + 1)
  const inDegree = new Array(n + 1).fill(0);
  const adjList = new Array(n + 1);

  for (let i = 0; i <= n; i++) {
    adjList[i] = new Set();
  }

  // Build the graph
  for (let i = 0; i < sequences.length; i++) {
    const seq = sequences[i];

    // Loop through the sequence to process adjacent pairs
    for (let j = 0; j < seq.length - 1; j++) {
      const u = seq[j];
      const v = seq[j + 1];

      // If we haven't already recorded this specific prerequisite...
      if (!adjList[u].has(v)) {
        adjList[u].add(v); // u unlocks v
        inDegree[v]++; // v requires 1 more prereq
      }
    }
  }

  // Find starting classes (0 prereqs)
  const queue = [];
  for (let i = 1; i <= n; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  // Run the highly restrictive BFS
  let index = 0; // To track our position in the target `nums` array

  while (queue.length > 0) {
    // THE MAGIC CHECK: Is there more than 1 choice?
    if (queue.length > 1) {
      return false; // Multiple choices = not a unique sequence!
    }

    // Because we guarantee queue.length is exactly 1, we can just use pop/shift
    const currentCourse = queue.pop();

    // Does the only class we can take match the target order?
    if (currentCourse !== nums[index]) {
      return false;
    }

    index++; // Move forward in our target array

    // Unlock the next classes
    const unlockedCourses = adjList[currentCourse];
    for (const nextCourse of unlockedCourses) {
      inDegree[nextCourse]--;

      if (inDegree[nextCourse] === 0) {
        queue.push(nextCourse);
      }
    }
  }

  // Did we successfully recreate the entire sequence?
  return index === n;
};
