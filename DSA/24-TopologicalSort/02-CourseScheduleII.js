// https://leetcode.com/problems/course-schedule-ii/description/

/**
 * Approach:
 * We need to return a valid ordering of courses such that all prerequisites are
 * taken before their dependent courses. If a cycle exists, return an empty array.
 *
 * Idea:
 * This is the exact same Topological Sort algorithm used in Course Schedule I.
 * The only difference is that instead of maintaining a simple integer counter of
 * completed classes, we maintain an array of the completed classes. As we shift
 * courses out of the BFS queue (meaning all their prerequisites have been met),
 * we push them into our `transcript` array. If the final length of the transcript
 * equals the total number of courses, we return the transcript. Otherwise, a
 * cycle exists and we return an empty array.
 *
 * Steps:
 * 1. Initialize `inDegree` array (size `numCourses`) with 0s.
 * 2. Initialize `adjList` as an array of empty arrays (size `numCourses`).
 * 3. Build the Graph: Loop through `prerequisites`. For each `[course, prereq]`:
 *    - Add `course` to `adjList[prereq]` (prereq unlocks course).
 *    - Increment `inDegree[course]`.
 * 4. Find Starting Courses: Loop 0 to `numCourses - 1`. If `inDegree[i] === 0`,
 *    push `i` to the `queue`.
 * 5. Run BFS (Topological Sort): Initialize `transcript = []`.
 *    - While queue is not empty, grab the front `currentCourse`.
 *    - Push `currentCourse` to our `transcript`!
 *    - Loop through all the `nextCourse` options in `adjList[currentCourse]`.
 *    - Decrement `inDegree[nextCourse]--`.
 *    - If `inDegree[nextCourse] === 0`, push it to the queue.
 * 6. Final Check: Return `transcript` if its length matches `numCourses`, else `[]`.
 *
 * Time Complexity: O(V + E)
 * - V is `numCourses` (vertices), E is the length of `prerequisites` (edges).
 *   We process each node and each edge exactly once.
 *
 * Space Complexity: O(V + E)
 * - The `adjList` takes O(V + E) space. The `inDegree` array, `queue`, and
 *   `transcript` array all take O(V) space.
 */

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0);
  const adjList = [];

  for (let i = 0; i < numCourses; i++) {
    adjList.push([]);
  }

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

  let head = 0;
  const transcript = []; // <--- The ONLY difference from Course Schedule I!

  // Take the classes! (BFS)
  while (head < queue.length) {
    const currentCourse = queue[head];
    head++;

    // Add the class we just took to our final ordering
    transcript.push(currentCourse);

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
  if (transcript.length === numCourses) {
    return transcript; // Here is the valid order to take them!
  } else {
    return []; // We got trapped in a cycle, impossible to graduate.
  }
};
