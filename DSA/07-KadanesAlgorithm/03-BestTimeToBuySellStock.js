// https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/

// You are given an array prices where prices[i] is the price of a given stock on the ith day.

// You want to maximize your profit by choosing a single day to buy one stock and
// choosing a different day in the future to sell that stock.

// Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

// Input: prices = [7,1,5,3,6,4]
// Output: 5
// Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
// Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

/*
Logic:
We want the maximum profit from one buy and one sell.

To make profit, we must buy before we sell.

As we scan prices from left to right:
- minPrice stores the cheapest price seen so far
- maxProfit stores the best profit seen so far

At each day:
1. Update minPrice if today's price is cheaper.
2. Pretend we sell today.
3. Profit = today's price - minPrice.
4. Update maxProfit if this profit is better.

If prices only go down, maxProfit stays 0.
*/

// Time - O(n)
// Space - O(1)
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let maxProfit = 0;
  let minPrice = prices[0];

  for (let i = 1; i < prices.length; i++) {
    const price = prices[i];

    minPrice = Math.min(price, minPrice);

    const profit = price - minPrice;

    maxProfit = Math.max(profit, maxProfit);
  }

  return maxProfit;
};
