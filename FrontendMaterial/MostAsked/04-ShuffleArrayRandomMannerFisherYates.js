// Shuffle array in random manner
// Fisher-Yates Shuffle Algorithm

function shuffleArray(arr) {
  const result = [...arr];

  // Start from the last element and swap one by one
  for (let i = result.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i

    // swap
    [result[i], result[randomIndex]] = [result[randomIndex], result[i]];
  }

  return result;
}

// Usage
const arr = [1, 2, 3, 4, 5];

console.log(shuffleArray(arr)); // [3, 1, 5, 2, 4]
console.log(shuffleArray(arr)); // [5, 2, 1, 4, 3]
console.log(shuffleArray(arr)); // [2, 4, 3, 1, 5]

console.log(arr); // [1, 2, 3, 4, 5] ← original unchanged

// ### How it works

// Start:   [1, 2, 3, 4, 5]

// i = 4 → random pick from [0..4] → swap 4 with random → [1, 2, 3, 5, 4]
// i = 3 → random pick from [0..3] → swap 3 with random → [1, 5, 3, 2, 4]
// i = 2 → random pick from [0..2] → swap 2 with random → [3, 5, 1, 2, 4]
// i = 1 → random pick from [0..1] → swap 1 with random → [5, 3, 1, 2, 4]

// Result: [5, 3, 1, 2, 4]

// Time O(n) — single pass
// Space O(n) — copy of array
