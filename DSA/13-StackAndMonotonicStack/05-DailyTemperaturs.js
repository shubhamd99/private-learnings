// https://leetcode.com/problems/daily-temperatures/description/

// Given an array of integers temperatures represents the daily temperatures, return an array answer
// such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.
// If there is no future day for which this is possible, keep answer[i] == 0 instead.

// Input: temperatures = [73,74,75,71,69,72,76,73]
// Output: [1,1,4,2,1,1,0,0]

/*
Logic:
For each day, find how many days until a warmer temperature.

Use a monotonic decreasing stack.

Stack stores indexes, not temperatures.

Why indexes?
Because answer needs distance:
current index - previous index

Stack keeps days whose warmer day has not been found yet.

When current temperature is warmer than stack top temperature,
current day is the next warmer day for that old index.
*/

// Time: O(n)
// Space: O(n)
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  const result = new Array(temperatures.length).fill(0);
  const stack = [];

  for (let i = 0; i < temperatures.length; i++) {
    while (
      stack.length > 0 &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const prevIndex = stack.pop();

      result[prevIndex] = i - prevIndex;
    }

    stack.push(i);
  }

  return result;
};

// temperatures = [73, 74, 75, 71, 69, 72, 76, 73]

// result starts as:
// [0, 0, 0, 0, 0, 0, 0, 0]

// stack stores indexes of days waiting for warmer temperature.

// --------------------------------------------------
// i = 0, temp = 73

// stack is empty, so push index 0.

// stack indexes = [0]
// stack temps   = [73]

// result = [0, 0, 0, 0, 0, 0, 0, 0]

// --------------------------------------------------
// i = 1, temp = 74

// Compare with stack top:
// stack top index = 0
// temperature = 73

// 74 > 73, so day 1 is warmer for day 0.

// pop index 0
// result[0] = i - 0 = 1 - 0 = 1

// stack is now empty.

// Push index 1.

// stack indexes = [1]
// stack temps   = [74]

// result = [1, 0, 0, 0, 0, 0, 0, 0]

// --------------------------------------------------
// i = 2, temp = 75

// Compare with stack top:
// stack top index = 1
// temperature = 74

// 75 > 74, so day 2 is warmer for day 1.

// pop index 1
// result[1] = i - 1 = 2 - 1 = 1

// stack is now empty.

// Push index 2.

// stack indexes = [2]
// stack temps   = [75]

// result = [1, 1, 0, 0, 0, 0, 0, 0]

// --------------------------------------------------
// i = 3, temp = 71

// Compare with stack top:
// stack top index = 2
// temperature = 75

// 71 > 75? no.

// So day 3 is not warmer for day 2.
// Push index 3.

// stack indexes = [2, 3]
// stack temps   = [75, 71]

// result = [1, 1, 0, 0, 0, 0, 0, 0]

// --------------------------------------------------
// i = 4, temp = 69

// Compare with stack top:
// stack top index = 3
// temperature = 71

// 69 > 71? no.

// Push index 4.

// stack indexes = [2, 3, 4]
// stack temps   = [75, 71, 69]

// result = [1, 1, 0, 0, 0, 0, 0, 0]

// --------------------------------------------------
// i = 5, temp = 72

// Compare with stack top:
// stack top index = 4
// temperature = 69

// 72 > 69, so day 5 is warmer for day 4.

// pop index 4
// result[4] = i - 4 = 5 - 4 = 1

// stack indexes = [2, 3]
// stack temps   = [75, 71]

// Now compare again with new stack top:
// stack top index = 3
// temperature = 71

// 72 > 71, so day 5 is warmer for day 3.

// pop index 3
// result[3] = i - 3 = 5 - 3 = 2

// stack indexes = [2]
// stack temps   = [75]

// Compare again:
// stack top index = 2
// temperature = 75

// 72 > 75? no.

// Push index 5.

// stack indexes = [2, 5]
// stack temps   = [75, 72]

// result = [1, 1, 0, 2, 1, 0, 0, 0]

// --------------------------------------------------
// i = 6, temp = 76

// Compare with stack top:
// stack top index = 5
// temperature = 72

// 76 > 72, so day 6 is warmer for day 5.

// pop index 5
// result[5] = i - 5 = 6 - 5 = 1

// stack indexes = [2]
// stack temps   = [75]

// Compare again:
// stack top index = 2
// temperature = 75

// 76 > 75, so day 6 is warmer for day 2.

// pop index 2
// result[2] = i - 2 = 6 - 2 = 4

// stack is now empty.

// Push index 6.

// stack indexes = [6]
// stack temps   = [76]

// result = [1, 1, 4, 2, 1, 1, 0, 0]

// --------------------------------------------------
// i = 7, temp = 73

// Compare with stack top:
// stack top index = 6
// temperature = 76

// 73 > 76? no.

// Push index 7.

// stack indexes = [6, 7]
// stack temps   = [76, 73]

// result = [1, 1, 4, 2, 1, 1, 0, 0]

// --------------------------------------------------

// End of array.

// Indexes left in stack:
// [6, 7]

// This means:
// day 6 has no warmer future day
// day 7 has no warmer future day

// Their result stays 0.

// Final result:
// [1, 1, 4, 2, 1, 1, 0, 0]
