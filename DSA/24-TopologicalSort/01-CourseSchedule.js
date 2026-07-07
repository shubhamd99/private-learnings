// https://leetcode.com/problems/course-schedule/description/

// Topological Sort is an algorithm that takes a messy web of dependencies and spits out a
// perfectly valid, linear checklist of what order you should do things in.
// Whether you solve this problem using DFS (the 3-state cycle detection we did a while back) or BFS (the Topological Sort we just did),
// the Time and Space complexities are identical: O(V + E).

/**
 * Approach:
 * We need to determine if it's possible to finish all courses given a list of
 * prerequisite dependencies. This is equivalent to checking if a Directed Graph
 * has a cycle.
 *
 * Idea:
 * We will use Topological Sort (Kahn's Algorithm / BFS approach). First, we build
 * an adjacency list where each course points to the courses it unlocks. We also
 * build an `inDegree` array to count exactly how many prerequisites each course
 * requires. We push all courses with 0 prerequisites into a queue. As we process
 * courses from the queue, we decrement the `inDegree` of the courses they unlock.
 * If a course's `inDegree` hits 0, it means all its prerequisites are fulfilled,
 * so we add it to the queue. Finally, we compare the total number of courses we
 * were able to process against `numCourses`.
 *
 * Steps:
 * 1. Initialize `inDegree` array (size `numCourses`) with 0s.
 * 2. Initialize `adjList` as an array of empty arrays (size `numCourses`).
 * 3. Build the Graph: Loop through `prerequisites`. For each `[course, prereq]`:
 *    - Add `course` to `adjList[prereq]` (prereq unlocks course).
 *    - Increment `inDegree[course]`.
 * 4. Find Starting Courses: Loop 0 to `numCourses - 1`. If `inDegree[i] === 0`,
 *    push `i` to the `queue`.
 * 5. Run BFS (Topological Sort): Initialize `completedClasses = 0`.
 *    - While queue is not empty, grab the front `currentCourse`.
 *    - Increment `completedClasses++`.
 *    - Loop through all the `nextCourse` options in `adjList[currentCourse]`.
 *    - Decrement `inDegree[nextCourse]--`.
 *    - If `inDegree[nextCourse] === 0`, push it to the queue!
 * 6. Return `completedClasses === numCourses`.
 *
 * Time Complexity: O(V + E)
 * - V is `numCourses` (vertices), E is the length of `prerequisites` (edges).
 *   We process each node and each edge exactly once.
 *
 * Space Complexity: O(V + E)
 * - The `adjList` takes O(V + E) space. The `inDegree` array and `queue` take O(V) space.
 */

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0);

  const adjList = [];
  for (let i = 0; i < numCourses; i++) {
    adjList.push([]);
  }

  // Build the graph
  for (let i = 0; i < prerequisites.length; i++) {
    const course = prerequisites[i][0];
    const prereq = prerequisites[i][1];

    // The prereq unlocks the course
    adjList[prereq].push(course);

    // The course requires 1 more prereq
    inDegree[course]++;
  }

  // Find classes we can take on Day 1 (0 prereqs)
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  let head = 0; // O(1) queue shifting
  let completedClasses = 0;

  // Take the classes! (BFS)
  while (head < queue.length) {
    const currentCourse = queue[head];
    head++;

    // We successfully took a class!
    completedClasses++;

    // Look at all the courses this class just unlocked
    const unlockedCourses = adjList[currentCourse];

    for (let i = 0; i < unlockedCourses.length; i++) {
      const nextCourse = unlockedCourses[i];

      // Cross this prereq off the list for the next course
      inDegree[nextCourse]--;

      // If the next course now requires 0 prereqs, we can take it!
      if (inDegree[nextCourse] === 0) {
        queue.push(nextCourse);
      }
    }
  }

  // Did we graduate?
  return completedClasses === numCourses;
};
