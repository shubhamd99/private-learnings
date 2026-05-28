// https://leetcode.com/problems/task-scheduler/description/

// You are given an array of CPU tasks, each labeled with a letter from A to Z, and a number n.
// Each CPU interval can be idle or allow the completion of one task.
// Tasks can be completed in any order, but there's a constraint: there has to be
// a gap of at least n intervals between two tasks with the same label.
// Return the minimum number of CPU intervals required to complete all tasks.

// Input: tasks = ["A","A","A","B","B","B"], n = 2
// Output: 8
// Explanation: A possible sequence is: A -> B -> idle -> A -> B -> idle -> A -> B.
// After completing task A, you must wait two intervals before doing A again.
// The same applies to task B. In the 3rd interval, neither A nor B can be done, so you idle.
// By the 4th interval, you can do A again as 2 intervals have passed.

// Input: tasks = ["A","C","A","B","D","B"], n = 1
// Output: 6
// Explanation: A possible sequence is: A -> B -> C -> D -> A -> B.
// With a cooling interval of 1, you can repeat a task after just one other task.

// Input: tasks = ["A","A","A", "B","B","B"], n = 3
// Output: 10
// Explanation: A possible sequence is: A -> B -> idle -> idle -> A -> B -> idle -> idle -> A -> B.

// Our solution - Max Heap + Cooldown Queue - Time: O(T log m) Space: O(m)
// Optimal solution - Pattern: Greedy + Frequency Counting / Math Formula - Time: O(tasks.length) Space: O(1)

import MyMaxHeap from "./00-MaxHeap";

/*
Logic: Use Max Heap + Cooldown Queue.

Why Max Heap?
At every time unit, we want to run the task with the highest remaining count.
A max heap gives us that task quickly.

Max Heap behavior:
- push(count): add a task count
- pop(): remove and return the largest count
- top of heap is always the biggest count

Why Cooldown Queue?
After running a task, the same task cannot run again for n intervals.
So we store it in a queue with the time when it can be used again.

For every time unit:
1. time++
2. If heap has tasks, run the task with highest remaining count.
3. Decrease its count.
4. If it still has count left, put it into cooldown queue.
5. If a task's cooldown is over, move it back to heap.

If heap is empty but cooldown queue still has tasks,
that time unit is idle.

Time:
O(T log 26), where T is total intervals including idle time.
Since task types are only A-Z, this is effectively O(T).

Space:
O(26), because heap and queue store at most 26 task types.
So effectively O(1).
*/
/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function (tasks, n) {
  const freqMap = new Map();

  for (const task of tasks) {
    freqMap.set(task, (freqMap.get(task) || 0) + 1);
  }

  const heap = new MyMaxHeap();

  for (const count of freqMap.values()) {
    heap.push(count);
  }

  const queue = [];
  let time = 0;

  // Keep running until there are no available tasks in heap
  // and no cooling tasks waiting in queue.
  while (heap.size() > 0 || queue.length > 0) {
    time++; // Move CPU time forward by 1 interval.

    // If there is any task available to run now,
    // pick the task with highest remaining count from max heap.
    if (heap.size() > 0) {
      let count = heap.pop(); // Run this task once.
      count--; // One occurrence of this task is completed.

      // If this task still has remaining occurrences,
      // put it into cooldown queue.
      if (count > 0) {
        queue.push([count, time + n]); // It can be used again after n intervals.
      }
    }

    // Check if the first cooling task is ready to be used again.
    if (queue.length > 0 && queue[0][1] === time) {
      const [count] = queue.shift();
      // Move it back to heap so it can be scheduled again.
      // Note - No duplicate problem, because when we run a task, we first remove it from the heap
      heap.push(count);
    }
  }

  return time;
};
