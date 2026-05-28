// a letter representing a vowel sound, such as a, e, i, o, u.

// "hello"        → vowels are e, o
//                  reversed vowels → o, e
//                  result → "holle"

// "leetcode"     → vowels are e, e, o, e
//                  reversed vowels → e, o, e, e
//                  result → "leotcede"

// Solution — Two Pointer

// Time O(n) — one pass
// Space O(n) — string to array

// Two pointer is the most efficient — move both pointers towards each other,
// swap vowels when both pointers land on one, stop when they meet.

function reverseVowels(str) {
  const vowels = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);

  const arr = str.split(""); // string to array
  let left = 0;
  let right = arr.length - 1;

  // move both pointers towards each other,
  // swap vowels when both pointers land on one,
  // stop when they meet
  while (left < right) {
    // move left pointer until vowel found
    while (left < right && !vowels.has(arr[left])) {
      left++;
    }

    // move right pointer until vowel found
    while (left < right && !vowels.has(arr[right])) {
      right--;
    }

    // swap vowels
    if (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }

  return arr.join("");
}

console.log(reverseVowels("hello")); // "holle"
console.log(reverseVowels("leetcode")); // "leotcede"
console.log(reverseVowels("aeiou")); // "uoiea"
console.log(reverseVowels("rhythm")); // "rhythm"   no vowels, unchanged

// ### Trace

// str = "hello"
// arr = ['h','e','l','l','o']
// left = 0, right = 4

// step 1:
//   left  → 'h' not vowel → left++  → left = 1
//   left  → 'e' vowel   → stop
//   right → 'o' vowel   → stop
//   swap arr[1] and arr[4]
//   arr = ['h','o','l','l','e']
//   left = 2, right = 3

// step 2:
//   left  → 'l' not vowel → left++  → left = 3
//   right → 'l' not vowel → right-- → right = 2
//   left(3) > right(2) → stop

// return "holle"
