// https://leetcode.com/problems/evaluate-reverse-polish-notation/description/

// Reverse Polish Notation, also called RPN or postfix notation,
// is a way of writing math expressions where the operator comes after the numbers.
// Normal expression: 2 + 3
// Reverse Polish Notation: 2 3 +
// Normal expression: (2 + 3) * 4
// Reverse Polish Notation: 2 3 + 4 *

// You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation.
// Evaluate the expression. Return an integer that represents the value of the expression.

// The valid operators are '+', '-', '*', and '/'.
// Each operand may be an integer or another expression.
// The division between two integers always truncates toward zero.
// There will not be any division by zero.

// Input: tokens = ["2","1","+","3","*"]
// Output: 9
// Explanation: ((2 + 1) * 3) = 9

/*
Logic: Use a stack.

When token is a number: push it into stack.

When token is an operator: 
pop two numbers from stack.
Apply the operator.
Push the result back into stack.

Important: For subtraction and division, order matters.

If stack has [2, 1] and operator is "-"
We pop:
b = 1
a = 2

Result:
a - b = 2 - 1 = 1

At the end, stack has one number. That is the answer.
*/

// Time: O(n)
// Space: O(n)
/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  const stack = [];

  for (const token of tokens) {
    if (token === "+" || token === "-" || token === "*" || token === "/") {
      const b = stack.pop();
      const a = stack.pop();

      let result;

      if (token === "+") {
        result = a + b;
      } else if (token === "-") {
        result = a - b;
      } else if (token === "*") {
        result = a * b;
      } else {
        // Math.trunc() in JavaScript removes the decimal part of a number.
        // Important: Math.floor() is not correct for negative numbers.
        // divide a by b, then remove decimal part toward zero, division truncates toward zero
        result = Math.trunc(a / b);
      }

      stack.push(result);
    } else {
      stack.push(Number(token));
    }
  }

  return stack[0];
};
