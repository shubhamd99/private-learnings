// An algorithm to find the largest perfect square in an array. Return -1 if not found
// Input:
// [1 ,10 ,19 ,27 ,25 ,23]
// [7, 33, 55, 26, 18]

// Output:
// 25
// -1

// A perfect square is a number that can be written as:
// n = x × x
// 1, 4, 9, 16, 25, 36 ...

// A simple Solution O(nlogn).
// We should first sort the array in desc order which will take O(nlogn) time in worst case.
// Then we should start checking for a perfect square using Math.sqrt() method, Which takes O(logx).
// The first number we will get is the largest perfect square. If no perfect square is found then return -1.

// Why descending? We want the largest perfect square
// [17, 20, 27, 2, 3, 10] → [27, 20, 17, 10, 3, 2]

// e[i] > 0 → ignore zero/negative numbers
// Math.sqrt(e[i]) → square root
// % 1 === 0 → checks if result is an integer
// Math.sqrt(25) = 5     → 5 % 1 === 0 ✅
// Math.sqrt(20) ≈ 4.47 → not integer ❌
// Because the array is sorted descending, the first valid match is the largest perfect square.

// Time Complexity: O(nlogn). Space Complexity: O(n).
// To sort the given array it would take O(nlogn).
// To find the square root it will take O(logx) time and we have to check it for all the elements so it is O(n * logx) = O(nlogx).
// As we are executing them one after another O(nlogn + nlogx) = O(nlogn).
let perfectSquare = (e) => {
  // sort the array in desc order
  e.sort((a, b) => b - a); // O(nlogn)

  //Check the perfect square for each element

  for (let i = 0; i < e.length; i++) {
    if (e[i] > 0 && Math.sqrt(e[i]) % 1 === 0) {
      return e[i];
    }
  }

  return -1;
};

console.log(perfectSquare([17, 20, 27, 2, 3, 10])); // Math.sqrt(27) ≈ 5.196152422706632
console.log(perfectSquare([16, 20, 25, 2, 3, 10])); // Math.sqrt(25) = 5     → 5 % 1 === 0 ✅

// Output:
// -1
// 25

// Computing √x takes O(log x) time because algorithms find it using binary search or iterative approximation, halving the search space each step.
// The computer does not magically know √x. It approximates it using math algorithms.

// Another Solution O(nlogx).
// We should start checking for a perfect square using Math.sqrt() method for all the elements, Which takes O(nlogx).
// Then compare the maximum element between the current and the previous element and store the maximum.
// Time Complexity: O(nlogx). Space Complexity: O(1).
// To find the square root it will take O(logx) time and we have to check it for all the elements so it is O(n * logx) = O(nlogx).
// We are using constant space so the Space complexity is O(1).
let perfectSquare2 = (e) => {
  let max = -1;

  // Check the perfect square for each element
  for (let i = 0; i < e.length; i++) {
    if (e[i] > 0 && Math.sqrt(e[i]) % 1 === 0) {
      max = Math.max(max, e[i]);
    }
  }

  return max;
};

console.log(perfectSquare2([17, 20, 27, 2, 3, 10])); // - 1
console.log(perfectSquare2([16, 20, 25, 2, 3, 10])); // 25
