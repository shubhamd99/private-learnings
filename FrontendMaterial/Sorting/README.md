# Sorting Algorithms

A sorting algorithm arranges elements of a list in a specific order (ascending or descending). Understanding sorting algorithms is fundamental to computer science and software engineering interviews.

---

## Quick Comparison Table

| Algorithm      | Best       | Average    | Worst      | Space    | Stable | In-Place |
|----------------|------------|------------|------------|----------|--------|----------|
| Bubble Sort    | O(n)       | O(n²)      | O(n²)      | O(1)     | Yes    | Yes      |
| Selection Sort | O(n²)      | O(n²)      | O(n²)      | O(1)     | No     | Yes      |
| Insertion Sort | O(n)       | O(n²)      | O(n²)      | O(1)     | Yes    | Yes      |
| Merge Sort     | O(n log n) | O(n log n) | O(n log n) | O(n)     | Yes    | No       |
| Quick Sort     | O(n log n) | O(n log n) | O(n²)      | O(log n) | No     | Yes      |
| Heap Sort      | O(n log n) | O(n log n) | O(n log n) | O(1)     | No     | Yes      |
| Counting Sort  | O(n + k)   | O(n + k)   | O(n + k)   | O(n + k) | Yes    | No       |
| Radix Sort     | O(nk)      | O(nk)      | O(nk)      | O(n + k) | Yes    | No       |
| Shell Sort     | O(n log n) | O(n log²n) | O(n²)      | O(1)     | No     | Yes      |
| Tim Sort       | O(n)       | O(n log n) | O(n log n) | O(n)     | Yes    | No       |

> **Stable** = equal elements maintain their original relative order.
> **In-Place** = sorts without requiring significant extra memory.
> **k** = range of input values (Counting/Radix), or number of digits (Radix).

---

## 1. Bubble Sort (`1-BubbleSort.js`)

### How it works
Repeatedly walks through the array comparing adjacent pairs. If a pair is out of order, it swaps them. After each full pass, the largest unsorted element "bubbles up" to its correct position at the end.

### Key characteristics
- Simple to understand and implement
- Optimizable with an early-exit flag (stops if no swaps occur in a pass)
- Rarely used in production due to O(n²) performance

### When to use
- Educational purposes
- Nearly-sorted small arrays

### Mental model
> Think of bubbles rising in water — heavier elements sink, lighter ones rise.

---

## 2. Selection Sort (`2-SelectionSort.js`)

### How it works
Divides the array into a sorted left portion and an unsorted right portion. In each pass, finds the **minimum element** in the unsorted portion and swaps it to the beginning of the unsorted section.

### Key characteristics
- Always makes exactly O(n²) comparisons regardless of input
- Makes at most O(n) swaps — useful when writes are expensive
- Not stable (swapping can displace equal elements)

### When to use
- When memory writes are expensive (e.g., flash memory)
- Small arrays where simplicity matters

### Mental model
> Like picking the smallest card from your hand each time and placing it face-down in order.

---

## 3. Insertion Sort (`3-InsertionSort.js`)

### How it works
Builds the sorted array one element at a time. Takes each new element and **inserts** it into the correct position among the already-sorted elements by shifting larger elements one step right.

### Key characteristics
- Excellent for small arrays or nearly-sorted data
- Online algorithm — can sort as data comes in
- Used as the base case in hybrid algorithms (Tim Sort, Intro Sort)

### When to use
- Small arrays (n < 20)
- Nearly sorted data
- Online/streaming sorting

### Mental model
> Like sorting playing cards in your hand — you pick up each new card and slide it into its correct position.

---

## 4. Merge Sort (`4-MergeSort.js`)

### How it works
A classic **Divide and Conquer** algorithm:
1. **Divide**: Split the array in half recursively until each piece has 1 element.
2. **Conquer**: Merge the pieces back together in sorted order.

The merge step compares the fronts of both halves and picks the smaller element.

### Key characteristics
- Guaranteed O(n log n) in all cases
- Stable sort — preserves relative order of equal elements
- Requires O(n) extra space for merging
- Preferred for sorting linked lists (no random access needed)

### When to use
- When stability is required
- Sorting linked lists
- External sorting (data too large for memory)
- When worst-case performance matters

### Mental model
> Like merging two sorted piles of documents — compare the top of each pile, take the smaller one.

---

## 5. Quick Sort (`5-QuickSort.js`)

### How it works
A **Divide and Conquer** algorithm:
1. **Pick a pivot** element (commonly the last, first, or random element).
2. **Partition**: Rearrange so all elements < pivot go left, all > pivot go right.
3. **Recurse** on left and right partitions.

The pivot is now in its final sorted position.

### Key characteristics
- Fastest in practice for random data (small constants)
- In-place — no extra array needed
- Worst case O(n²) when pivot is always the smallest/largest (e.g., sorted input)
- Random pivot or median-of-three pivot selection avoids worst case

### When to use
- General-purpose sorting (most common choice in practice)
- When average performance matters more than worst-case guarantees
- When in-place sorting is required

### Mental model
> Pick a reference point, put everything smaller on the left and larger on the right, then repeat for each side.

---

## 6. Heap Sort (`6-HeapSort.js`)

### How it works
Uses a **Max-Heap** data structure:
1. **Build max-heap**: Rearrange the array so it satisfies the heap property (parent ≥ children).
2. **Extract max**: Swap root (max) with last element, reduce heap size, re-heapify.
3. Repeat until the heap is empty — the array is sorted.

### Key characteristics
- Guaranteed O(n log n) in all cases — no worst-case degradation like Quick Sort
- In-place with O(1) space
- Not stable
- Poor cache performance (accesses non-sequential memory)

### When to use
- When guaranteed O(n log n) is needed with O(1) space
- Implementing a priority queue
- Finding the k-th largest/smallest element efficiently

### Mental model
> Always pull out the largest item from a priority queue and put it at the end.

---

## 7. Counting Sort (`7-CountingSort.js`)

### How it works
Instead of comparing elements, it **counts occurrences** of each value:
1. Create a count array of size = value range.
2. Count how many times each value appears.
3. Reconstruct the sorted array by outputting each value `count[value]` times.

### Key characteristics
- Linear time O(n + k) — faster than comparison-based sorts for small k
- Only works for **integer values** within a known, limited range
- Inefficient when the value range k is much larger than n

### When to use
- Sorting integers within a small range (e.g., ages 0–120, exam scores 0–100)
- As a subroutine in Radix Sort

### Mental model
> Count how many of each number you have, then list them in order.

---

## 8. Radix Sort (`8-RadixSort.js`)

### How it works
Sorts numbers **digit by digit** from the least significant to the most significant:
1. Sort by 1s digit (using Counting Sort).
2. Sort by 10s digit.
3. Sort by 100s digit.
4. Continue until the highest digit position.

### Key characteristics
- Linear time for fixed-length integers: O(d × (n + b)) where d = digits, b = base
- Stable (when using stable subroutine like Counting Sort)
- Works well for integers and fixed-length strings
- Does not work with floating-point numbers directly

### When to use
- Large datasets of integers or fixed-length strings
- When the number of digits is small compared to n
- Sorting IP addresses, phone numbers, zip codes

### Mental model
> Sort a pile of numbers by their last digit, then re-sort by second-to-last digit, and so on.

---

## 9. Shell Sort (`9-ShellSort.js`)

### How it works
A generalization of Insertion Sort that:
1. Starts by comparing elements far apart (large gap).
2. Gradually reduces the gap until it reaches 1 (standard Insertion Sort).

Large gaps quickly move elements close to their final positions, making the final Insertion Sort pass very fast.

### Key characteristics
- Performance depends heavily on the gap sequence chosen
- Better than O(n²) for most gap sequences in practice
- No extra memory needed
- Gap sequences: Shell (n/2), Knuth (3k+1), Hibbard, Sedgewick

### When to use
- Medium-sized arrays
- When you want better-than-Insertion-Sort without extra memory

### Mental model
> Instead of moving one step at a time like Insertion Sort, take big jumps to quickly get elements near their correct positions.

---

## 10. Tim Sort (`10-TimSort.js`)

### How it works
A **hybrid** of Merge Sort and Insertion Sort, designed for real-world data:
1. Splits the array into small chunks called **runs** (size 32–64).
2. Sorts each run using **Insertion Sort** (fast for small arrays).
3. Merges sorted runs using **Merge Sort**.

Also detects naturally ordered sequences in the input and uses them as pre-sorted runs.

### Key characteristics
- Default sorting algorithm in Python and JavaScript (V8 engine)
- Exceptional performance on real-world data (partially sorted, repeated patterns)
- O(n) for already-sorted or reverse-sorted data
- Stable and adaptive

### When to use
- This is essentially what `Array.prototype.sort()` uses — it's the industry standard
- Real-world datasets with natural ordering patterns

### Mental model
> Find all the naturally sorted groups in your data, sort any small unsorted groups efficiently, then merge everything together.

---

## Key Concepts

### Stability
A sort is **stable** if elements with equal keys appear in the same order in the output as in the input.

```
Input:  [(2, 'a'), (1, 'b'), (2, 'c')]
Stable output:   [(1, 'b'), (2, 'a'), (2, 'c')]  ← 'a' before 'c'
Unstable output: [(1, 'b'), (2, 'c'), (2, 'a')]  ← order of 2s may change
```

### In-Place Sorting
An algorithm sorts **in-place** if it uses O(1) extra space (only a constant number of extra variables). The sorting happens within the original array.

### Comparison vs Non-Comparison Sorts

- **Comparison sorts** (Bubble, Insertion, Merge, Quick, Heap): Must compare elements to determine order. Lower bound is O(n log n).
- **Non-comparison sorts** (Counting, Radix): Use element values directly. Can beat O(n log n) but require constraints on input.

### Adaptive Sorting
An algorithm is **adaptive** if it runs faster on partially sorted input.
- Insertion Sort and Tim Sort are adaptive.
- Selection Sort and Heap Sort are not.

---

## Choosing the Right Algorithm

| Scenario | Best Choice |
|---|---|
| Small array (n < 20) | Insertion Sort |
| General purpose | Quick Sort or Tim Sort |
| Need stability | Merge Sort or Tim Sort |
| Limited memory | Quick Sort or Heap Sort |
| Nearly sorted data | Insertion Sort or Tim Sort |
| Integers in small range | Counting Sort |
| Large integers, many digits | Radix Sort |
| Guaranteed O(n log n), O(1) space | Heap Sort |
| Real-world production code | Tim Sort (built-in `.sort()`) |
