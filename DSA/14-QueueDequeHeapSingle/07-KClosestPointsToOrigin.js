// https://leetcode.com/problems/k-closest-points-to-origin/

// Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k,
// return the k closest points to the origin (0, 0).
// The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).
// You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).

// Input: points = [[1,3],[-2,2]], k = 1
// Output: [[-2,2]]
// Explanation:
// The distance between (1, 3) and the origin is sqrt(10).
// The distance between (-2, 2) and the origin is sqrt(8).
// Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
// We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].

// Our solution - Max Heap of size k - Time: O(n log k) Space: O(k)
// Optimal solution - Pattern: Quickselect - Time: O(n) Space: O(1)

/*
Logic:
We need k points closest to origin (0, 0).

Distance from origin:
sqrt(x^2 + y^2)

But we do not need actual sqrt because comparing distances works same with:
x^2 + y^2

Use a max heap of size k.

Why max heap?
We keep only k closest points.

The farthest point among those k closest should be at the top.
If a new point is closer, remove the farthest and keep the new point.

Steps:
1. For each point, calculate squared distance.
2. Push point into max heap.
3. If heap size > k, pop the farthest point.
4. At the end, heap contains k closest points.
*/

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function (points, k) {
  const heap = new MaxHeapByDistance();

  for (const point of points) {
    heap.push(point);

    if (heap.size() > k) {
      heap.pop();
    }
  }

  const result = [];

  while (heap.size() > 0) {
    result.push(heap.pop());
  }

  return result;
};

class MaxHeapByDistance {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }

  distance(point) {
    const [x, y] = point;
    return x * x + y * y;
  }

  push(point) {
    this.heap.push(point);
    this.bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const max = this.heap[0];

    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);

    return max;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);

      if (this.distance(this.heap[parent]) >= this.distance(this.heap[index])) {
        break;
      }

      [this.heap[parent], this.heap[index]] = [
        this.heap[index],
        this.heap[parent],
      ];

      index = parent;
    }
  }

  bubbleDown(index) {
    const n = this.heap.length;

    while (true) {
      let largest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      if (
        left < n &&
        this.distance(this.heap[left]) > this.distance(this.heap[largest])
      ) {
        largest = left;
      }

      if (
        right < n &&
        this.distance(this.heap[right]) > this.distance(this.heap[largest])
      ) {
        largest = right;
      }

      if (largest === index) break;

      [this.heap[index], this.heap[largest]] = [
        this.heap[largest],
        this.heap[index],
      ];

      index = largest;
    }
  }
}
