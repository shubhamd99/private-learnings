// An algorithm to convert the given string to jadenCase or capitalize the string.
// JadenCase: Every first letter of each words of string should be uppercase.

// Input:
// "How can mirrors be real if our eyes aren't real"

// Output:
// "How Can Mirrors Be Real If Our Eyes Aren't Real"

// We will see three different methods to convert the string to jadencase.

// We are going to convert the string to an array of words and then convert the first letter of each word to uppercase which will work in O(n*m),
// Where n is the length of the string and m is the length of the longest word in the string.

// Time complexity: O(n * m). space complexity: O(n).
// We are splitting the string on whitespace and creating an array of words which will take O(n).
// After that, we will be converting an array of characters for each word that will take O(m) time.
// We will be doing it for each word so Time complexity is O(n * m).
/**
 *
 * @param {string} str
 */
let toJadenCase = (str) => {
  // create an array of words
  const x = str.split(" ");

  // create an empty array to store the converted words
  let y = [];

  // loop through each words
  for (let i = 0; i < x.length; i++) {
    // splite each words to an array of characters
    let s = x[i].split("");

    // convert the first letter to uppercase
    s[0] = s[0].toUpperCase();

    // push the converted word
    y.push(s.join(""));
  }

  // Join the converted words and return the string
  return y.join(" ");
};

console.log(toJadenCase("How can mirrors be real if our eyes aren't real"));
// "How Can Mirrors Be Real If Our Eyes Aren't Real"

// Above solution with inbuilt array methods
// Time - O(n), Space - O(n)
let toJadenCase2 = (str) => {
  return str
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

console.log(toJadenCase2("How can mirrors be real if our eyes aren't real"));

// Using regular expression
// We are going to use regular expressions to replace the first letter of each word and with its uppercase.
// We will use string.replace() method.

// Time complexity: O(n). Space complexity: O(1).
// As regular expression time depends upon it implementation, still we will be checking the first character of each word. so Time complexity O(n).
// We are using constant space, so Space complexity is O(1).
let toJadenCase3 = (str) => {
  // / ... /g
  // g = global → replace all matches, not just first
  // (^|\s)
  // ^ → start of the string
  // \s → any whitespace character (space, tab, newline)
  // [a-z] - Match any lowercase letter from a to z
  return str.replace(/(^|\s)[a-z]/g, (x) => x.toUpperCase());
};

console.log(toJadenCase3("How can mirrors be real if our eyes aren't real"));
