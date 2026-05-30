// https://leetcode.com/problems/valid-parentheses/

// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
// determine if the input string is valid.

/*
Logic:
Use a stack. A stack is a Last In, First Out data structure.

Meaning: The last thing we push is the first thing we pop.

Example:
push "("
push "{"

stack = ["(", "{"]

pop gives "{", because it was added last.

Why stack for brackets?
Brackets must close in reverse order.

Example:
s = "({})"

First opened: (
Second opened: {

But closing happens like:
} closes {
) closes (

So the most recently opened bracket must close first.
That is exactly stack behavior.

Steps:
1. If character is opening bracket, push it into stack.
2. If character is closing bracket, pop from stack.
3. The popped opening bracket must match the closing bracket.
4. If it does not match, return false.
5. At the end, stack must be empty.
*/
// Time - O(n)
// Space - O(n)
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const stack = [];

  const map = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  for (const char of s) {
    if (char === "(" || char === "{" || char === "[") {
      stack.push(char);
    } else {
      const top = stack.pop();

      if (top !== map[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
};
