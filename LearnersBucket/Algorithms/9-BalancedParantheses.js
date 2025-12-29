// An algorithm to check if an expressions (parentheses) given in a string are balanced or not.
// Input:
// '[{}]'
// '[{}{}{}}]'

// Output:
// true
// false

// We will use Stack to solve the balanced parentheses problem.
// We have to create a Stack of characters.
// We are then going to traverse through the given string and check if the characters matches to any one of these '{', '(', '[' then push it into the Stack.
// If the characters matches to '}', ')', ']' then pop an item from the Stack and check if it matches to its corresponding parentheses.
// If it matches then continue and check for others, otherwise it is not balanced.
// In the end after traversing the string if there are still items in stack then also it is not balanced

class Stack {
  constructor() {
    this.items = [];
  }

  push(elm) {
    this.items.push(elm);
  }

  pop() {
    return this.items.pop();
  }

  get isEmpty() {
    return this.items.length === 0;
  }
}

// Time Complexity: O(n) where n is the no of characters in the string. We are traversing through each character of string.
// Space Complexity: O(n) where n is the no of characters in the string.
// We are storing the opposite parentheses characters in the stack, in the worst case there can be all the opposite characters in the string.
let checkBalancedParentheses = (str) => {
  let stack = new Stack();

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "{" || str[i] === "(" || str[i] === "[") {
      stack.push(str[i]);
    }

    if (str[i] == "}" || str[i] == ")" || str[i] == "]") {
      // return false if stack is empty
      if (stack.isEmpty) {
        return false;
      }

      // Pop an item from the stack and check if it matches the corresponding parentheses
      let temp = stack.pop();
      if (temp === "{" && str[i] !== "}") {
        return false;
      } else if (temp === "[" && str[i] !== "]") {
        return false;
      } else if (temp === "(" && str[i] !== ")") {
        return false;
      }
    }

    // If stack is empty after traversing the string then return true
    if (stack.isEmpty) {
      return true;
    } else {
      return false;
    }
  }
};

console.log(checkBalancedParentheses("[{}]"));
console.log(checkBalancedParentheses("[{}{}{}{]"));
console.log(checkBalancedParentheses("({[]}){}[][({})]"));
// Output:
// true
// false
// true

// console.log("[{}]".length, "[{}]".length - 1); // 4  3
// console.log([1, 2, 3, 4].length, [1, 2, 3, 4].length - 1); // 4 3
