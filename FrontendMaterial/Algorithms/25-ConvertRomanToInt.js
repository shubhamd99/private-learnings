// Input:
// 'IV'
// 'XXIX'
// 'XVII'

// Output:
// 4
// 29
// 17

// We will create an array with sequence of roman letters and
// an object which will store the value of the respective roman letters.
// Then we will loop through each letter of the given roman numerals in reverse order.
// With each iteration we will check if the current letters sequence is greater or less than its previous letters.
// If it is less then we will add the value else we will subtract the value.

let romanToInteger = (roman) => {
  // sequence of roman letters
  let arr = ["I", "V", "X", "L", "C", "D", "M"];

  // value of the respective roman letters
  let values = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let sum = 0;

  // keep track of the previous index
  let prevIndex = 0;

  for (let i = roman.length - 1; i >= 0; i--) {
    // if the current letter is having greater index than previous letter then add values
    if (arr.indexOf(roman[i]) >= prevIndex) {
      sum = sum + values[roman[i]];
    } else {
      // if the current letter is having lesser index than previous letter then sub values
      sum = sum - values[roman[i]];
    }

    // store the index of the previous roman letters
    prevIndex = arr.indexOf(roman[i]);
  }

  return sum;
};

console.log(romanToInteger("I"));
console.log(romanToInteger("VI"));
console.log(romanToInteger("XVI"));
console.log(romanToInteger("XXIX"));

// Output:
// 1
// 6
// 16
// 29

/*How it works
'IV'

'I' is less than 'V' in the sequence ['I','V','X','L','C','D','M'], so we will subtract the value so 5 - 1 = 4;

'XIV' we are looping in reverse direction 'VIX' like this

sum = 'V' = 5;
As I sequence is less than V we will subtract it
sum = sum - 'I' = 5 - 1 = 4;
As X sequence is greater than V so we will add it
sum = sum +  'X' = 4 + 10 = 14
*/

// We are iterating each letter of the given string, so Time complexity is O(n) where n is the length of the string.
// We are using constant space, so Space complexity is O(1).
