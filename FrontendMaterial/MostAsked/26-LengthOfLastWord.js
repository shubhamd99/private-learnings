// "Hello World"      → last word is "World"   → length 5
// "my name is John"  → last word is "John"    → length 4
// "Hello   "         → last word is "Hello"   → length 5 (ignore trailing spaces)

function lengthOfLastWord(str) {
  const words = str.trim().split(" ");
  const lastWord = words[words.length - 1];
  return lastWord.length;
}

console.log(lengthOfLastWord("Hello World")); // 5
console.log(lengthOfLastWord("my name is John")); // 4
console.log(lengthOfLastWord("Hello   ")); // 5  trim handles trailing spaces
console.log(lengthOfLastWord("a")); // 1

function lengthOfLastWord2(str) {
  const trimmed = str.trim(); // remove leading and trailing spaces
  let count = 0;

  // Loop backwards until we hit a space or the start of the string
  for (let i = trimmed.length - 1; i >= 0; i--) {
    if (trimmed[i] === " ") {
      break; // hit a space → stop counting
    }
    count++; // still in last word
  }

  return count;
}

console.log(lengthOfLastWord2("Hello World")); // 5
console.log(lengthOfLastWord2("my name is John")); // 4
console.log(lengthOfLastWord2("Hello   ")); // 5  trim handles trailing spaces
console.log(lengthOfLastWord2("a")); // 1

// Without split — loop approach
// Split - Time O(n) and Space O(n) — creates array
// Loop from end - Time O(n) and Space O(1) — no extra space
