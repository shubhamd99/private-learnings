// https://leetcode.com/problems/course-schedule/

// There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1.
// You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must
// take course bi first if you want to take course ai.
// For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
// Return true if you can finish all courses. Otherwise, return false.

// Input: numCourses = 2, prerequisites = [[1,0]]
// Output: true
// Explanation: There are a total of 2 courses to take.
// To take course 1 you should have finished course 0. So it is possible.

// Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
// Output: false
// Explanation: There are a total of 2 courses to take.
// To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.

/**
 * Approach:
 * We need to determine if it is possible to finish all courses given a list of
 * prerequisite pairs. This is equivalent to finding if there is a cycle in a
 * directed graph.
 *
 * Idea:
 * 1. Build an Adjacency List (a map/array) where each course points to an array
 *    of its prerequisites.
 * 2. Use an array to keep track of the `state` of each course during DFS:
 *    - 0: Unvisited
 *    - 1: Visiting (currently in our recursive path. If we hit this, it's a CYCLE!)
 *    - 2: Safe (fully explored, no cycles found)
 * 3. Loop through every course from 0 to numCourses - 1. For each course, run DFS.
 * 4. In the DFS:
 *    - If the state is 1, return false (Cycle).
 *    - If the state is 2, return true (Safe).
 *    - Mark the state as 1. Explore all prerequisites.
 *    - If all prerequisites pass without returning false, mark the state as 2 and return true.
 *
 * Steps:
 * 1. Create `adjList` as an array of empty arrays.
 * 2. Loop through `prerequisites` and populate the `adjList`. `[A, B]` means A requires B,
 *    so `adjList[A].push(B)`.
 * 3. Create a `states` array of size `numCourses`, filled with 0 (Unvisited).
 * 4. Create the DFS helper: `dfs(course)`
 *    - Check states: return false if 1, true if 2.
 *    - Set `states[course] = 1`.
 *    - Loop through `adjList[course]`. If `dfs(prereq)` returns false, return false.
 *    - Set `states[course] = 2` (Safe!). Return true.
 * 5. Main loop: run `dfs` on every course from 0 to `numCourses - 1`. If any `dfs`
 *    returns false, immediately return false.
 * 6. If the loop finishes without returning false, return true (you can graduate!).
 *
 * Time Complexity: O(V + E)
 * - V is the number of courses (vertices), E is the number of prerequisites (edges).
 * - We build the adjacency list by looking at every edge once.
 * - During DFS, because we mark nodes as "Safe" (2), we only ever visit each
 *   vertex and traverse each edge a single time.
 *
 * Space Complexity: O(V + E)
 * - The Adjacency List takes up O(V + E) space.
 * - The `states` array takes O(V) space.
 * - The recursion call stack can go up to O(V) deep in the worst case (a single
 *   straight line of prerequisites).
 */

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  // Initialize the Adjacency List
  // Create an array where each index has its own empty array
  const adjList = Array.from({ length: numCourses }, () => []);

  // Populate the Adjacency List
  for (let i = 0; i < prerequisites.length; i++) {
    const course = prerequisites[i][0];
    const prereq = prerequisites[i][1];
    // To take 'course', you must first take 'prereq'
    adjList[course].push(prereq);
  }

  // Create our state tracker
  // 0 = Unvisited, 1 = Visiting, 2 = Safe
  const states = new Array(numCourses).fill(0);

  function dfs(course) {
    // Did we hit a course that is currently in our path? CYCLE!
    if (states[course] === 1) return false;

    // Did we hit a course we already proved is safe? SKIP IT!
    if (states[course] === 2) return true;

    // Mark this course as "Visiting"
    states[course] = 1;

    // Check all prerequisites for this course
    const prerequisitesForThisCourse = adjList[course];
    for (let i = 0; i < prerequisitesForThisCourse.length; i++) {
      const nextPrereq = prerequisitesForThisCourse[i];

      // If any prerequisite has a cycle, the whole thing fails
      if (dfs(nextPrereq) === false) {
        return false;
      }
    }

    // We checked all prerequisites and found no cycles!
    // Mark this course as "Safe" and return true.
    states[course] = 2;
    return true;
  }

  // Check every single course in the catalog
  for (let i = 0; i < numCourses; i++) {
    // If we find a cycle anywhere, we can't finish all courses
    if (dfs(i) === false) {
      return false;
    }
  }

  return true;
};
