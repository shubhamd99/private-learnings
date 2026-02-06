// A Stack can be used to convert a number from one base to another
//  Given a number n which we want to convert to base b.
// Here is the algorithm which we can use to convert a number from decimal to binary, octal or hexadecimal format.

// With Stack - A stack is an ordered collection of items that follow (LIFO) Last In First Out principle.
// Store the last digit of the n by n % b and push it into the stack.
// Remove the last digit from n by n / b.
// Repeat the step 1 and 2 until n becomes 0.
// Pop the items from the stack and create a converted number string.

class Stack {
  #items;

  constructor(iterable = []) {
    this.#items = Array.from(iterable);
  }

  push(value) {
    this.#items.push(value);
    return this.size;
  }

  pop() {
    return this.#items.pop();
  }

  peek() {
    return this.isEmpty ? undefined : this.#items[this.#items.length - 1];
  }

  clear() {
    this.#items.length = 0;
  }

  get size() {
    return this.#items.length;
  }

  get isEmpty() {
    return this.#items.length === 0;
  }

  toArray() {
    // return a shallow copy (top of stack at the end)
    return this.#items.slice();
  }
}

// Time Complexity: O(log(n)) where n is the no of digits in input number.
// Space Complexity: O(n) (no of digits in n).
function baseConverter(n, b) {
  // Remainders come in reverse order. Stack (LIFO) helps reverse them automatically
  let stack = new Stack();

  let rem;
  let convertedString = "";
  let digits = "0123456789ABCDEF"; // digits is a lookup table that maps a number value → its character representation

  while (n > 0) {
    rem = Math.floor(n % b); // Divide number by base
    stack.push(rem); // Push remainder into stack
    n = Math.floor(n / b); // Update number
  }

  while (!stack.isEmpty) {
    convertedString += digits[stack.pop()];
  }

  return convertedString;
}

// base 2 → binary
// base 8 → octal
// base 16 → hexadecimal
console.log(baseConverter(1021313, 2));
console.log(baseConverter(1021313, 8));
console.log(baseConverter(1021313, 16));

// Output:
// 11111001010110000001
// 3712601
// F9581

// 0 → '0'
// 1 → '1'
// 2 → '2'
// ...
// 9 → '9'
// 10 → 'A'
// 11 → 'B'
// 12 → 'C'
// 13 → 'D'
// 14 → 'E'
// 15 → 'F'

// Maths behind:
// We do repeated division because any number can be represented as a sum of powers of the base, and division extracts those powers from right to left.
// Convert 10 to binary (base 2)
// | n  | n % 2 | pushed | n / 2 |
// | -- | ----- | ------ | ----- |
// | 10 | 0     | 0      | 5     |
// | 5  | 1     | 1      | 2     |
// | 2  | 0     | 0      | 1     |
// | 1  | 1     | 1      | 0     |

// Brute force method to convert decimal to binary, octal or hexadecimal
// Time Complexity: Arithmetic operation like n % b and n / b takes O(1) time
// and we are reducing n by removing one digit after each operation so it takes O(log(n))
// where n is the no of digits in input number.
// Space Complexity: We are storing the digits in single variable so space complexity is O(1).
function baseConverter2(n, b) {
  let rem;
  let convertedString = "";
  const digits = "0123456789ABCDEF";

  while (n > 0) {
    rem = Math.floor(n % b);
    convertedString = digits[rem] + convertedString;
    n = Math.floor(n / b);
  }

  return convertedString;
}

// base 2 → binary
// base 8 → octal
// base 16 → hexadecimal
console.log(baseConverter2(1021313, 2));
console.log(baseConverter2(1021313, 8));
console.log(baseConverter2(1021313, 16));
