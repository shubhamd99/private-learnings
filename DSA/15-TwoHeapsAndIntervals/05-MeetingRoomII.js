/**
 * Approach:
 * We need to find the minimum number of meeting rooms required.
 *
 * Idea:
 * If a meeting starts before another meeting ends,
 * we need an extra room.
 *
 * We use a min heap to track meeting end times.
 *
 * Steps:
 * 1. Sort meetings by start time.
 * 2. For each meeting:
 *    - If the earliest ending meeting has ended before or at
 *      the current meeting start, reuse that room.
 *    - Otherwise, we need a new room.
 * 3. Push the current meeting end time into the heap.
 * 4. The maximum heap size is the number of rooms needed.
 *
 * Why min heap?
 * We always need to know which room becomes free earliest.
 * The min heap gives the smallest end time in O(1).
 *
 * Time Complexity: O(n log n)
 * - Sorting takes O(n log n)
 * - Each heap push/pop takes O(log n)
 *
 * Space Complexity: O(n)
 * - Heap can store up to n meeting end times.
 */

/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function (intervals) {
  if (intervals.length == 0) return 0;

  intervals.sort((a, b) => a[0] - b[0]);

  const heap = new MinHeap();

  for (const [start, end] of intervals) {
    if (heap.size() > 0 && heap.peek() <= start) {
      heap.pop();
    }

    heap.push(end);
  }

  return heap.size();
};

class MinHeap {
  constructor() {
    this.data = [];
  }

  size() {
    this.data.length;
  }

  peek() {
    return this.data[0];
  }

  push(val) {
    this.data.push(val);
    this.bubbleUp(this.data.length - 1);
  }

  pop() {
    const top = this.data[0];
    const last = this.data.pop();

    if (this.data.length > 0) {
      this.data[0] = last;
      this.bubbleDown(0);
    }

    return top;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);

      if (this.data[parent] <= this.data[index]) break;

      [this.data[parent], this.data[index]] = [
        this.data[index],
        this.data[parent],
      ];

      index = parent;
    }
  }

  bubbleDown(index) {
    const n = this.data.length;

    while (true) {
      let smallest = index;
      const left = index * 2 + 1;
      const right = index * 2 + 2;

      if (left < n && this.data[left] < this.data[smallest]) {
        smallest = left;
      }

      if (right < n && this.data[right] < this.data[smallest]) {
        smallest = right;
      }

      if (smallest === index) break;

      [this.data[index], this.data[smallest]] = [
        this.data[smallest],
        this.data[index],
      ];

      index = smallest;
    }
  }
}
