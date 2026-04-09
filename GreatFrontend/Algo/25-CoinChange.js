// Coin Change — Minimum Coins to Reach Amount (DP)
// Given an array of coin denominations and a target amount,
// return the minimum number of coins needed to make up that amount.
// Return -1 if it's not possible.
//
// Input:  coins = [1, 5, 6, 9], amount = 11
// Output: 2   → 5 + 6 = 11
//
// Input:  coins = [1, 2, 5], amount = 11
// Output: 3   → 5 + 5 + 1
//
// Input:  coins = [2], amount = 3
// Output: -1  → not possible

// ---- SIMPLE VERSION (for interviews) ----
// Idea: bottom-up DP.
// dp[i] = minimum coins needed to make amount i.
// For each amount from 1 to target, try every coin:
//   if coin <= i, dp[i] = min(dp[i], dp[i - coin] + 1)
// Base case: dp[0] = 0 (0 coins needed to make amount 0).
// Initialize all other dp values to Infinity (unreachable).

function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0; // base case: 0 coins to make amount 0

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] + 1 < dp[i]) {
        dp[i] = dp[i - coin] + 1; // use this coin + best way to make remainder
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

// Examples
console.log(coinChange([1, 2, 5], 11)); // 3
console.log(coinChange([2], 3)); // -1
console.log(coinChange([1], 0)); // 0

// Trace for coins=[1,5,6,9], amount=11:
// dp[0]=0, dp[1]=1(1), dp[2]=2(1+1), dp[5]=1(5), dp[6]=1(6)
// dp[10]=2(5+5), dp[11]=2(5+6)

// Time: O(amount * coins)
// Space: O(amount)
