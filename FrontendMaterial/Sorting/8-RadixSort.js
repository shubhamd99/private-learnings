/**
 * RADIX SORT
 * - Non-comparison based sorting algorithm.
 * - Sorts numbers digit by digit, from the least significant digit (LSD)
 *   to the most significant digit (MSD).
 * - Uses Counting Sort as a subroutine for each digit position.
 *
 * Time Complexity:  O(d × (n + b))  where d = number of digits, b = base (10)
 * Space Complexity: O(n + b)
 * Stable: YES
 */

function radixSort(arr) {
  const max = Math.max(...arr);

  // Process each digit position (1s, 10s, 100s, ...)
  for (let place = 1; Math.floor(max / place) > 0; place *= 10) {
    countingSortByDigit(arr, place);
  }

  return arr;
}

// Sort array based on digit at a specific place value
function countingSortByDigit(arr, place) {
  const n = arr.length;
  const output = new Array(n).fill(0);
  const count = new Array(10).fill(0); // Digits 0-9

  // Step 1: Count occurrences of each digit at 'place'
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / place) % 10;
    count[digit]++;
  }

  // Step 2: Change count[i] to actual position in output
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // Step 3: Build output array (traverse from right for stability)
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / place) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }

  // Step 4: Copy output back to arr
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}

// Example
const arr = [170, 45, 75, 90, 802, 24, 2, 66];
console.log("Before:", [...arr]);
console.log("After: ", radixSort(arr));
// After: [2, 24, 45, 66, 75, 90, 170, 802]

/**
 * Step-by-step for [170, 45, 75, 90, 802, 24, 2, 66]:
 *
 * Sort by 1s digit:  [170, 90, 802, 2, 24, 45, 75, 66]
 * Sort by 10s digit: [802, 2, 24, 45, 66, 170, 75, 90]
 * Sort by 100s digit:[2, 24, 45, 66, 75, 90, 170, 802]
 * Done!
 */
