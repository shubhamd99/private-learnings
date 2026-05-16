# DSA Patterns Cheat Sheet

[Algorithm Visualizer](https://staying.fun/en/features/algorithm-visualize)

| #   | Pattern                              | When to Apply                                                   | Key Clue in Problem                                                           |
| --- | ------------------------------------ | --------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| 1   | Two Pointers                         | Sorted array, find pair or triplet, remove duplicates           | "sorted", "pair sum", "palindrome", "remove duplicates in place"              |
| 2   | Three Pointers (Dutch National Flag) | Partition array into three regions in one pass                  | "sort colors", "move zeroes", "three-way partition"                           |
| 3   | Fast and Slow Pointers               | Linked list cycle, find middle, find duplicate in 1 to N        | "linked list cycle", "find middle", "find duplicate"                          |
| 4   | Sliding Window (Fixed)               | Fixed size window, track property inside window                 | "subarray of size K", "average of size K window"                              |
| 5   | Sliding Window (Variable)            | Grow and shrink window based on a condition                     | "longest substring", "minimum window", "shortest subarray"                    |
| 6   | Hashing and Prefix Sum               | Frequency count, subarray sum, existence in O(1)                | "two sum", "anagram", "subarray sum equals K", "count pairs"                  |
| 7   | Kadane's Algorithm                   | Maximum or minimum contiguous subarray sum                      | "maximum subarray", "largest sum", single pass no index tracking              |
| 8   | Binary Search (Basic)                | Sorted array, search for exact target                           | "sorted array", "find position", "search target"                              |
| 9   | Binary Search (Modified)             | Answer lies in a value range, feasibility check                 | "minimum possible max", "can finish in D days", "rotated sorted array"        |
| 10  | Cyclic Sort                          | Numbers in range 1 to N, in-place rearrangement                 | "1 to N", "missing number", "find duplicate", "disappeared numbers"           |
| 11  | Linked List Manipulation             | Reverse, merge, reorder, detect cycle in linked list            | "reverse list", "merge two lists", "reorder list", "remove nth node"          |
| 12  | Stack                                | Next greater or smaller, balanced brackets, expression eval     | "next greater", "valid parentheses", "evaluate expression", "undo"            |
| 13  | Monotonic Stack                      | Maintain strictly increasing or decreasing order while scanning | "largest rectangle", "trapping rain water", "next greater element"            |
| 14  | Queue and Deque                      | Level order, BFS, sliding window maximum                        | "level order", "first in first out", "sliding window max"                     |
| 15  | Heap (Single)                        | Top K, Kth largest or smallest, priority scheduling             | "top K frequent", "Kth largest", "task scheduler"                             |
| 16  | Two Heaps                            | Dynamically balance two halves, track median                    | "median of stream", "sliding window median"                                   |
| 17  | Intervals                            | Merge, insert, check overlap, scheduling                        | "merge intervals", "meeting rooms", "insert interval", "overlap check"        |
| 18  | K-way Merge                          | Merge multiple sorted structures simultaneously                 | "K sorted lists", "K sorted arrays", "smallest range"                         |
| 19  | Greedy                               | Locally optimal pick at each step gives global optimum          | "minimum steps", "maximum events", "can you reach end", "pick best"           |
| 20  | Divide and Conquer                   | Split problem into halves, solve independently, combine         | "merge sort", "quick select", "Kth largest via partition", "max subarray D&C" |
| 21  | Matrix Manipulation                  | In-place operations on 2D grid, no graph traversal needed       | "rotate image", "spiral order", "set zeroes", "transpose"                     |
| 22  | Multi-source BFS                     | Multiple starting points spread simultaneously                  | "rotting oranges", "walls and gates", "01 matrix"                             |
| 23  | Tree DFS                             | Path from root to leaf, recursive tree logic, depth problems    | "root to leaf", "max depth", "diameter", "path sum", "subtree check"          |
| 24  | Tree BFS                             | Level by level traversal, shortest path in tree                 | "level order", "right side view", "zigzag traversal", "minimum depth"         |
| 25  | Binary Search Tree                   | Ordered tree queries, validate, insert, LCA in BST              | "validate BST", "Kth smallest in BST", "LCA in BST"                           |
| 26  | Trie                                 | Prefix matching, word search with wildcards, autocomplete       | "starts with", "prefix", "autocomplete", "word search with wildcards"         |
| 27  | Graph DFS                            | Connected components, flood fill, all paths, directed cycle     | "number of islands", "all paths", "connected components"                      |
| 28  | Graph BFS                            | Shortest path in unweighted graph, minimum steps                | "shortest path", "minimum steps", "word ladder"                               |
| 29  | Multi-source BFS                     | Multiple starting nodes, spread outward simultaneously          | "rotting oranges", "01 matrix distance", "walls and gates"                    |
| 30  | Union Find                           | Dynamic connectivity, undirected cycle detection                | "connected components", "redundant connection", "graph valid tree"            |
| 31  | Topological Sort                     | Task ordering with dependencies, directed cycle detection       | "course schedule", "prerequisites", "build order", "alien dictionary"         |
| 32  | Backtracking                         | All subsets, permutations, combinations, constraint search      | "all combinations", "generate all", "N-Queens", "word search grid"            |
| 33  | 1D Dynamic Programming               | Overlapping subproblems on single sequence                      | "number of ways", "min cost", "max profit", single array or number input      |
| 34  | 2D Dynamic Programming               | Overlapping subproblems on grid or two sequences                | "grid paths", "edit distance", "LCS", "interleaving strings"                  |
| 35  | Bit Manipulation                     | Binary representation tricks, XOR properties                    | "single number", "missing number", "count set bits", "power of two"           |
| 36  | Segment Tree and BIT                 | Range queries with point updates on mutable array               | "range sum with update", "range min max with update"                          |
| 37  | Divide and Conquer (QuickSelect)     | Kth element without full sort, partial partitioning             | "Kth largest", "find kth smallest", "median of unsorted"                      |
| 38  | Reservoir Sampling                   | Pick K random elements from unknown size stream fairly          | "random pick", "shuffle array", "sample from stream"                          |

## Final Quick Decision Tree

- Sorted array with pair condition → **Two Pointers**
- Three region partition in one pass → **Three Pointers**
- Linked list with cycle or middle → **Fast Slow Pointers**
- Contiguous subarray or substring → **Sliding Window**
- Frequency or existence lookup → **Hashing**
- Max or min subarray sum → **Kadane**
- Search in sorted or value range → **Binary Search**
- Numbers in range 1 to N → **Cyclic Sort**
- Linked list node manipulation → **Linked List**
- Brackets or next greater → **Stack or Monotonic Stack**
- Top K or Kth element → **Heap**
- Balance two halves → **Two Heaps**
- Overlapping time ranges → **Intervals**
- Multiple sorted inputs → **K-way Merge**
- Pick best at each step → **Greedy**
- Split and combine halves → **Divide and Conquer**
- 2D grid in-place → **Matrix Manipulation**
- Multiple BFS starting points → **Multi-source BFS**
- Tree recursive path logic → **Tree DFS**
- Tree level by level → **Tree BFS**
- Ordered tree queries → **BST**
- Prefix or wildcard word → **Trie**
- Graph components or all paths → **Graph DFS**
- Graph shortest path → **Graph BFS**
- Dynamic connectivity → **Union Find**
- Task ordering → **Topological Sort**
- Generate all possibilities → **Backtracking**
- Single sequence optimal → **1D DP**
- Two sequences or grid optimal → **2D DP**
- Binary tricks → **Bit Manipulation**
- Range query with updates → **Segment Tree or BIT**
- Random fair sampling → **Reservoir Sampling**

## 35-Day DSA Study Plan

### DAY 1 — Two Pointers

**When to apply:** Sorted array, find pair or triplet, remove duplicates, palindrome check.

| #   | Problem                                              | LC ID | Difficulty |
| --- | ---------------------------------------------------- | ----- | ---------- |
| 1   | Two Sum II                                           | 167   | Easy       |
| 2   | 3Sum                                                 | 15    | Medium     |
| 3   | 4Sum                                                 | 18    | Medium     |
| 4   | Container With Most Water                            | 11    | Medium     |
| 5   | Trapping Rain Water                                  | 42    | Hard       |
| 6   | Valid Palindrome                                     | 125   | Easy       |
| 7   | Longest Palindromic Substring (expand around center) | 5     | Medium     |
| 8   | Is Subsequence                                       | 392   | Easy       |
| 9   | Find the Index of the First Occurrence in a String   | 28    | Easy       |
| 10  | Reverse Vowels of a String                           | 345   | Easy       |

### DAY 2 — Three Pointers (Dutch National Flag)

**When to apply:** Partition array into three regions in single pass.

| #   | Problem          | LC ID | Difficulty |
| --- | ---------------- | ----- | ---------- |
| 1   | Sort Colors      | 75    | Medium     |
| 2   | Move Zeroes      | 283   | Easy       |
| 3   | Next Permutation | 31    | Medium     |

### DAY 3 — Fast and Slow Pointers

**When to apply:** Linked list cycle, find middle, find duplicate in range 1 to N.

| #   | Problem                   | LC ID | Difficulty |
| --- | ------------------------- | ----- | ---------- |
| 1   | Linked List Cycle         | 141   | Easy       |
| 2   | Linked List Cycle II      | 142   | Medium     |
| 3   | Find the Duplicate Number | 287   | Medium     |
| 4   | Middle of Linked List     | 876   | Easy       |
| 5   | Palindrome Linked List    | 234   | Easy       |

### DAY 4 — Sliding Window Fixed

**When to apply:** Fixed size K window, track property inside window.

| #   | Problem                                   | LC ID | Difficulty |
| --- | ----------------------------------------- | ----- | ---------- |
| 1   | Maximum Average Subarray I                | 643   | Easy       |
| 2   | Find All Anagrams in String               | 438   | Medium     |
| 3   | Sliding Window Maximum                    | 239   | Hard       |
| 4   | Substring with Concatenation of All Words | 30    | Hard       |

### DAY 5 — Sliding Window Variable

**When to apply:** Expand right always, shrink left when condition breaks.

| #   | Problem                                        | LC ID | Difficulty |
| --- | ---------------------------------------------- | ----- | ---------- |
| 1   | Longest Substring Without Repeating Characters | 3     | Medium     |
| 2   | Minimum Window Substring                       | 76    | Hard       |
| 3   | Longest Repeating Character Replacement        | 424   | Medium     |
| 4   | Permutation in String                          | 567   | Medium     |
| 5   | Minimum Size Subarray Sum                      | 209   | Medium     |

### DAY 6 — Hashing and Prefix Sum

**When to apply:** Frequency count, existence check O(1), subarray sum queries.

| #   | Problem                      | LC ID | Difficulty |
| --- | ---------------------------- | ----- | ---------- |
| 1   | Two Sum                      | 1     | Easy       |
| 2   | Group Anagrams               | 49    | Medium     |
| 3   | Subarray Sum Equals K        | 560   | Medium     |
| 4   | Product of Array Except Self | 238   | Medium     |
| 5   | Longest Consecutive Sequence | 128   | Medium     |

### DAY 7 — Kadane's Algorithm

**When to apply:** Maximum or minimum contiguous subarray sum, single pass.

| #   | Problem                         | LC ID | Difficulty |
| --- | ------------------------------- | ----- | ---------- |
| 1   | Maximum Subarray                | 53    | Medium     |
| 2   | Maximum Product Subarray        | 152   | Medium     |
| 3   | Best Time to Buy and Sell Stock | 121   | Easy       |
| 4   | Maximum Sum Circular Subarray   | 918   | Medium     |

### DAY 8 — Binary Search Basic

**When to apply:** Sorted array, search for exact target in O(log n).

| #   | Problem                              | LC ID | Difficulty |
| --- | ------------------------------------ | ----- | ---------- |
| 1   | Binary Search                        | 704   | Easy       |
| 2   | First Bad Version                    | 278   | Easy       |
| 3   | Search in Rotated Sorted Array       | 33    | Medium     |
| 4   | Find Minimum in Rotated Sorted Array | 153   | Medium     |
| 5   | Find First and Last Position         | 34    | Medium     |

### DAY 9 — Binary Search Modified

**When to apply:** Answer lies in a value range, feasibility check function exists.

| #   | Problem                     | LC ID | Difficulty |
| --- | --------------------------- | ----- | ---------- |
| 1   | Koko Eating Bananas         | 875   | Medium     |
| 2   | Capacity to Ship Packages   | 1011  | Medium     |
| 3   | Find Peak Element           | 162   | Medium     |
| 4   | Median of Two Sorted Arrays | 4     | Hard       |

### DAY 10 — Cyclic Sort

**When to apply:** Numbers in range 1 to N, find missing or duplicate in place.

| #   | Problem                               | LC ID | Difficulty |
| --- | ------------------------------------- | ----- | ---------- |
| 1   | Missing Number                        | 268   | Easy       |
| 2   | Find All Duplicates in Array          | 442   | Medium     |
| 3   | Find All Numbers Disappeared in Array | 448   | Easy       |
| 4   | First Missing Positive                | 41    | Hard       |

### DAY 11 — Divide and Conquer

**When to apply:** Split into halves, solve independently, merge results.

| #   | Problem                             | LC ID | Difficulty |
| --- | ----------------------------------- | ----- | ---------- |
| 1   | Sort Array                          | 912   | Medium     |
| 2   | Kth Largest Element in Array        | 215   | Medium     |
| 3   | Count of Smaller Numbers After Self | 315   | Hard       |

### DAY 12 — Linked List Manipulation

**When to apply:** Reverse, merge, reorder, remove nodes in linked list.

| #   | Problem                       | LC ID | Difficulty |
| --- | ----------------------------- | ----- | ---------- |
| 1   | Reverse Linked List           | 206   | Easy       |
| 2   | Merge Two Sorted Lists        | 21    | Easy       |
| 3   | Add Two Numbers               | 2     | Medium     |
| 4   | Remove Nth Node From End      | 19    | Medium     |
| 5   | Reorder List                  | 143   | Medium     |
| 6   | Copy List with Random Pointer | 138   | Medium     |

### DAY 13 — Stack and Monotonic Stack

**When to apply:** Stack for LIFO, balanced brackets, expression eval. Monotonic for next greater or smaller.

| #   | Problem                          | LC ID | Difficulty |
| --- | -------------------------------- | ----- | ---------- |
| 1   | Valid Parentheses                | 20    | Easy       |
| 2   | Min Stack                        | 155   | Medium     |
| 3   | Evaluate Reverse Polish Notation | 150   | Medium     |
| 4   | Decode String                    | 394   | Medium     |
| 5   | Daily Temperatures               | 739   | Medium     |
| 6   | Largest Rectangle in Histogram   | 84    | Hard       |
| 7   | Car Fleet                        | 853   | Medium     |

### DAY 14 — Queue, Deque, Heap Single

**When to apply:** Queue for BFS. Deque for O(1) front and back. Heap for top K or priority.

| #   | Problem                       | LC ID | Difficulty |
| --- | ----------------------------- | ----- | ---------- |
| 1   | Kth Largest Element in Array  | 215   | Medium     |
| 2   | Implement Queue Using Stacks  | 232   | Easy       |
| 3   | Sliding Window Maximum        | 239   | Hard       |
| 4   | Kth Largest Element in Stream | 703   | Easy       |
| 5   | Top K Frequent Elements       | 347   | Medium     |
| 6   | Task Scheduler                | 621   | Medium     |
| 7   | K Closest Points to Origin    | 973   | Medium     |

### DAY 15 — Two Heaps and Intervals

**When to apply:** Two heaps to balance halves for median. Intervals for range overlap and merging.

| #   | Problem                      | LC ID | Difficulty |
| --- | ---------------------------- | ----- | ---------- |
| 1   | Find Median from Data Stream | 295   | Hard       |
| 2   | Merge Intervals              | 56    | Medium     |
| 3   | Insert Interval              | 57    | Medium     |
| 4   | Non-Overlapping Intervals    | 435   | Medium     |
| 5   | Meeting Rooms II             | 253   | Medium     |

### DAY 16 — K-way Merge and Greedy

**When to apply:** K-way merge for multiple sorted sources. Greedy when local optimal gives global optimal.

| #   | Problem                         | LC ID | Difficulty |
| --- | ------------------------------- | ----- | ---------- |
| 1   | Merge K Sorted Lists            | 23    | Hard       |
| 2   | Smallest Range Covering K Lists | 632   | Hard       |
| 3   | Jump Game                       | 55    | Medium     |
| 4   | Jump Game II                    | 45    | Medium     |
| 5   | Gas Station                     | 134   | Medium     |
| 6   | Partition Labels                | 763   | Medium     |

### DAY 17 — Tree DFS

**When to apply:** Root to leaf paths, recursive subtree logic, depth and diameter problems.

| #   | Problem                      | LC ID | Difficulty |
| --- | ---------------------------- | ----- | ---------- |
| 1   | Maximum Depth of Binary Tree | 104   | Easy       |
| 2   | Diameter of Binary Tree      | 543   | Easy       |
| 3   | Path Sum II                  | 113   | Medium     |
| 4   | Lowest Common Ancestor       | 236   | Medium     |
| 5   | Binary Tree Maximum Path Sum | 124   | Hard       |

### DAY 18 — Tree BFS

**When to apply:** Level by level processing, shortest path in tree, right side view.

| #   | Problem                           | LC ID | Difficulty |
| --- | --------------------------------- | ----- | ---------- |
| 1   | Binary Tree Level Order Traversal | 102   | Medium     |
| 2   | Binary Tree Right Side View       | 199   | Medium     |
| 3   | Average of Levels                 | 637   | Easy       |
| 4   | Zigzag Level Order Traversal      | 103   | Medium     |
| 5   | Minimum Depth of Binary Tree      | 111   | Easy       |

### DAY 19 — Binary Search Tree

**When to apply:** Ordered tree queries, validate BST, LCA in BST, Kth smallest.

| #   | Problem                       | LC ID | Difficulty |
| --- | ----------------------------- | ----- | ---------- |
| 1   | Validate Binary Search Tree   | 98    | Medium     |
| 2   | Kth Smallest Element in BST   | 230   | Medium     |
| 3   | LCA of BST                    | 235   | Medium     |
| 4   | Convert Sorted Array to BST   | 108   | Easy       |
| 5   | Serialize and Deserialize BST | 449   | Medium     |

### DAY 20 — Trie

**When to apply:** Prefix matching, autocomplete, word search with wildcards.

| #   | Problem                     | LC ID | Difficulty |
| --- | --------------------------- | ----- | ---------- |
| 1   | Implement Trie              | 208   | Medium     |
| 2   | Design Add and Search Words | 211   | Medium     |
| 3   | Word Search II              | 212   | Hard       |
| 4   | Replace Words               | 648   | Medium     |

### DAY 21 — Graph DFS

**When to apply:** Connected components, flood fill, all paths, directed cycle detection.

| #   | Problem                     | LC ID | Difficulty |
| --- | --------------------------- | ----- | ---------- |
| 1   | Number of Islands           | 200   | Medium     |
| 2   | Max Area of Island          | 695   | Medium     |
| 3   | Clone Graph                 | 133   | Medium     |
| 4   | Pacific Atlantic Water Flow | 417   | Medium     |
| 5   | Course Schedule             | 207   | Medium     |

### DAY 22 — Graph BFS and Multi-source BFS

**When to apply:** Shortest path unweighted graph. Multi-source when all starting points spread simultaneously.

| #   | Problem                        | LC ID | Difficulty |
| --- | ------------------------------ | ----- | ---------- |
| 1   | Word Ladder                    | 127   | Hard       |
| 2   | Shortest Path in Binary Matrix | 1091  | Medium     |
| 3   | Rotting Oranges                | 994   | Medium     |
| 4   | Walls and Gates                | 286   | Medium     |
| 5   | 01 Matrix                      | 542   | Medium     |

### DAY 23 — Union Find

**When to apply:** Dynamic connectivity, undirected cycle detection, grouping components.

| #   | Problem                        | LC ID | Difficulty |
| --- | ------------------------------ | ----- | ---------- |
| 1   | Number of Connected Components | 323   | Medium     |
| 2   | Graph Valid Tree               | 261   | Medium     |
| 3   | Redundant Connection           | 684   | Medium     |
| 4   | Accounts Merge                 | 721   | Medium     |
| 5   | Number of Islands II           | 305   | Hard       |

### DAY 24 — Topological Sort

**When to apply:** Task ordering with dependencies, directed cycle detection, build order.

| #   | Problem                 | LC ID | Difficulty |
| --- | ----------------------- | ----- | ---------- |
| 1   | Course Schedule         | 207   | Medium     |
| 2   | Course Schedule II      | 210   | Medium     |
| 3   | Alien Dictionary        | 269   | Hard       |
| 4   | Minimum Height Trees    | 310   | Medium     |
| 5   | Sequence Reconstruction | 444   | Medium     |

### DAY 25 — Backtracking

**When to apply:** Generate all subsets, permutations, combinations, constraint satisfaction.

| #   | Problem                             | LC ID | Difficulty |
| --- | ----------------------------------- | ----- | ---------- |
| 1   | Subsets                             | 78    | Medium     |
| 2   | Permutations                        | 46    | Medium     |
| 3   | Letter Combinations of Phone Number | 17    | Medium     |
| 4   | Combination Sum                     | 39    | Medium     |
| 5   | Word Search                         | 79    | Medium     |
| 6   | N-Queens                            | 51    | Hard       |
| 7   | Palindrome Partitioning             | 131   | Medium     |

### DAY 26 — 1D DP and Memoization to Tabulation

**When to apply:** Single sequence overlapping subproblems. Memoization top-down, Tabulation bottom-up.

| #   | Problem                        | LC ID | Difficulty |
| --- | ------------------------------ | ----- | ---------- |
| 1   | Climbing Stairs                | 70    | Easy       |
| 2   | House Robber                   | 198   | Medium     |
| 3   | House Robber II                | 213   | Medium     |
| 4   | Decode Ways                    | 91    | Medium     |
| 5   | Coin Change                    | 322   | Medium     |
| 6   | Word Break                     | 139   | Medium     |
| 7   | Longest Increasing Subsequence | 300   | Medium     |
| 8   | Fibonacci Number               | 509   | Easy       |

### DAY 27 — 2D DP

**When to apply:** Two sequences or grid, choices at each cell, fill dp table.

| #   | Problem                    | LC ID | Difficulty |
| --- | -------------------------- | ----- | ---------- |
| 1   | Unique Paths               | 62    | Medium     |
| 2   | Longest Common Subsequence | 1143  | Medium     |
| 3   | Distinct Subsequences      | 115   | Hard       |
| 4   | Minimum Window Subsequence | 727   | Hard       |
| 5   | Edit Distance              | 72    | Medium     |
| 6   | Maximal Square             | 221   | Medium     |
| 7   | Interleaving String        | 97    | Medium     |
| 8   | Burst Balloons             | 312   | Hard       |

### DAY 28 — Matrix Manipulation and Bit Manipulation

**When to apply:** Matrix for in-place index math transforms. Bits for XOR tricks and binary representation.

| #   | Problem             | LC ID | Difficulty |
| --- | ------------------- | ----- | ---------- |
| 1   | Rotate Image        | 48    | Medium     |
| 2   | Spiral Matrix       | 54    | Medium     |
| 3   | Set Matrix Zeroes   | 73    | Medium     |
| 4   | Search a 2D Matrix  | 74    | Medium     |
| 5   | Single Number       | 136   | Easy       |
| 6   | Number of 1 Bits    | 191   | Easy       |
| 7   | Missing Number      | 268   | Easy       |
| 8   | Sum of Two Integers | 371   | Medium     |
| 9   | Counting Bits       | 338   | Easy       |

### DAY 29 — Segment Tree, BIT and Recursion to Iteration

**When to apply:** Segment tree for range queries with updates. Recursion to iteration using explicit stack.

| #   | Problem                             | LC ID | Difficulty |
| --- | ----------------------------------- | ----- | ---------- |
| 1   | Range Sum Query Immutable           | 303   | Easy       |
| 2   | Range Sum Query Mutable             | 307   | Medium     |
| 3   | Count of Smaller Numbers After Self | 315   | Hard       |
| 4   | My Calendar I                       | 729   | Medium     |
| 5   | Binary Tree Inorder Iterative       | 94    | Easy       |
| 6   | Binary Tree Preorder Iterative      | 144   | Easy       |
| 7   | Decode String Iterative             | 394   | Medium     |

### DAY 30 — Reservoir Sampling and Hard Revision

**When to apply:** Reservoir sampling for fair random selection from unknown size stream.

| #   | Problem                 | LC ID | Difficulty |
| --- | ----------------------- | ----- | ---------- |
| 1   | Shuffle an Array        | 384   | Medium     |
| 2   | Random Pick Index       | 398   | Medium     |
| 3   | Linked List Random Node | 382   | Medium     |
| 4   | LRU Cache               | 146   | Hard       |
| 5   | LFU Cache               | 460   | Hard       |

### DAY 31 — Dijkstra and Weighted Graphs

**When to apply:** Shortest path in weighted graph, minimum cost to reach destination.

| #   | Problem                         | LC ID | Difficulty |
| --- | ------------------------------- | ----- | ---------- |
| 1   | Network Delay Time              | 743   | Medium     |
| 2   | Path with Minimum Effort        | 1631  | Medium     |
| 3   | Cheapest Flights Within K Stops | 787   | Medium     |
| 4   | Swim in Rising Water            | 778   | Hard       |

### DAY 32 — Interval DP and Bitmask DP

**When to apply:** Interval DP for merging ranges. Bitmask DP when state is a subset of items.

| #   | Problem                          | LC ID | Difficulty |
| --- | -------------------------------- | ----- | ---------- |
| 1   | Burst Balloons                   | 312   | Hard       |
| 2   | Strange Printer                  | 664   | Hard       |
| 3   | Minimum Cost to Cut a Stick      | 1547  | Hard       |
| 4   | Partition to K Equal Sum Subsets | 698   | Medium     |
| 5   | Shortest Path Visiting All Nodes | 847   | Hard       |

### DAY 33 — String Algorithms (KMP and Rabin-Karp)

**When to apply:** Pattern matching in text, substring search, rolling hash for repeated substring.

| #   | Problem                     | LC ID | Difficulty |
| --- | --------------------------- | ----- | ---------- |
| 1   | Implement strStr            | 28    | Easy       |
| 2   | Repeated Substring Pattern  | 459   | Easy       |
| 3   | Longest Happy Prefix        | 1392  | Hard       |
| 4   | Longest Duplicate Substring | 1044  | Hard       |

### DAY 34 — Math and Number Theory

**When to apply:** Count arrangements, prime checking, modular operations, digit problems.

| #   | Problem                   | LC ID | Difficulty |
| --- | ------------------------- | ----- | ---------- |
| 1   | Count Primes              | 204   | Medium     |
| 2   | Power of Two              | 231   | Easy       |
| 3   | Factorial Trailing Zeroes | 172   | Medium     |
| 4   | Super Pow                 | 372   | Medium     |
| 5   | Excel Sheet Column Number | 168   | Easy       |

### DAY 35 — Google and Meta Hard Revision

**Description:** Full hard problem set. No new patterns. Apply everything learned.

| #   | Problem                               | LC ID | Difficulty |
| --- | ------------------------------------- | ----- | ---------- |
| 1   | Serialize and Deserialize Binary Tree | 297   | Hard       |
| 2   | Word Ladder II                        | 126   | Hard       |
| 3   | Longest Increasing Path in Matrix     | 329   | Hard       |
| 4   | Remove Invalid Parentheses            | 301   | Hard       |
| 5   | Expression Add Operators              | 282   | Hard       |
| 6   | Race Car                              | 818   | Hard       |

### DAY 36 — Substring and Subsequence DP

**When to apply:** Longest or count of substrings or subsequences, palindrome based problems, two string comparison.

| #   | Problem                    | LC ID | Difficulty |
| --- | -------------------------- | ----- | ---------- |
| 1   | Longest Common Subsequence | 1143  | Medium     |
| 2   | Distinct Subsequences      | 115   | Hard       |
| 3   | Minimum Window Subsequence | 727   | Hard       |
| 4   | Edit Distance              | 72    | Medium     |

---

## Total Summary

| Metric         | Count |
| -------------- | ----- |
| Total Days     | 36    |
| Total Patterns | 44    |
| Total Problems | 191   |
| **Easy**       | 43    |
| **Medium**     | 111   |
| **Hard**       | 37    |
