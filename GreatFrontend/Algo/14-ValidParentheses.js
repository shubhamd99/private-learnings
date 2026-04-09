// Valid Parentheses
// Given a string of brackets, return true if it is valid.
// Valid means: every opening bracket has a matching closing bracket in the correct order.
//
// Input:  "()"       → true
// Input:  "()[]{}"   → true
// Input:  "(]"       → false  (mismatched)
// Input:  "([)]"     → false  (wrong order)
// Input:  "{[]}"     → true

// ---- SIMPLE VERSION (for interviews) ----
// Idea: use a stack.
// Push opening brackets. On closing bracket, check if top of stack is the matching opener.
// If mismatch or stack is empty when closing → invalid.
// At the end, stack must be empty (all openers matched).

function isValid(s) {
  const stack = [];
  const match = { ")": "(", "]": "[", "}": "{" };

  for (const char of s) {
    if ("([{".includes(char)) {
      stack.push(char); // opening bracket — push
    } else {
      // closing bracket — must match top of stack
      if (stack.pop() !== match[char]) return false;
    }
  }

  return stack.length === 0; // all openers must be matched
}

// Examples
console.log(isValid("()[]{}")); // true
console.log(isValid("(]")); // false
console.log(isValid("([)]")); // false
console.log(isValid("{[]}")); // true

// Time: O(n)
// Space: O(n) — stack holds at most n/2 openers
