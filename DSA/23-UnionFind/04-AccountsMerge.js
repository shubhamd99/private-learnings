// https://leetcode.com/problems/accounts-merge/

// Given a list of accounts where each element accounts[i] is a list of strings,
// where the first element accounts[i][0] is a name, and the rest of the elements are
// emails representing emails of the account.
// Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts.

// Input: accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
// Output: [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
// Explanation:
// The first and second John's are the same person as they have the common email "johnsmith@mail.com".
// The third John and Mary are different people as none of their email addresses are used by other accounts.
// We could return these lists in any order, for example the answer [['Mary', 'mary@mail.com'], ['John', 'johnnybravo@mail.com'],
// ['John', 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com']] would still be accepted.

/**
 * Approach:
 * We need to merge accounts that share at least one common email, then return
 * the merged accounts with sorted emails.
 *
 * Idea:
 * We will use Union-Find to group the Account Indices (0, 1, 2...).
 * We iterate through all accounts and map each email to its Account Index. If
 * we encounter an email that we have already mapped to a previous account, we
 * `union` the current account index with the previous account index.
 * After processing all emails, all connected accounts will be merged into groups
 * under a "Top Boss" account index. Finally, we group the emails by their Top
 * Boss, sort them, and format the output.
 *
 * Steps:
 * 1. Setup Union-Find: Create `parent` and `rank` arrays up to `accounts.length`.
 * 2. Map Emails & Union: Create a Map `emailToAccId`. Loop through all accounts.
 *    For each email, if it's already in the Map, `union` the current account index `i`
 *    with the previously saved index in the Map. If not, save it to the Map.
 * 3. Group Emails by Top Boss: Create a Map `mergedGroups`. Loop through the
 *    `emailToAccId` map. For every email, `find` the Top Boss of its account index.
 *    Push the email into `mergedGroups` under that Top Boss's index.
 * 4. Format Output: Loop through `mergedGroups`. For each Boss index, sort the
 *    array of emails alphabetically, unshift the account Name to the front, and
 *    push it to the final result array.
 *
 * Time Complexity: O(N * K * log(N * K))
 * - N is the number of accounts, K is the max number of emails per account.
 * - The Union-Find operations take almost O(1).
 * - The dominant factor is sorting the emails at the end, which takes O(E log E)
 *   where E is the total number of emails.
 *
 * Space Complexity: O(N * K)
 * - To store the maps and the resulting arrays.
 */

/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function (accounts) {
  const n = accounts.length;
  const parent = [];
  const rank = [];

  // Standard Union-Find Setup (Everyone is their own boss)
  for (let i = 0; i < n; i++) {
    parent[i] = i;
    rank[i] = 1;
  }

  function find(node) {
    let current = node;

    while (current !== parent[current]) {
      parent[current] = parent[parent[current]];
      current = parent[current];
    }

    return current;
  }

  function union(n1, n2) {
    const root1 = find(n1);
    const root2 = find(n2);

    if (root1 === root2) return 0; // Already merged

    if (rank[root1] > rank[root2]) {
      parent[root2] = root1;
      rank[root1] += rank[root2];
    } else {
      parent[root1] = root2;
      rank[root2] += rank[root1];
    }

    return 1;
  }

  // Read every email and merge accounts if we see duplicates
  const emailToAccId = new Map();

  for (let i = 0; i < accounts.length; i++) {
    // Start j at 1 because index 0 is the Name, not an email
    for (let j = 1; j < accounts[i].length; j++) {
      const email = accounts[i][j];

      if (emailToAccId.has(email)) {
        // We've seen this email before! Merge the current account (i)
        // with the account that previously claimed this email.
        union(i, emailToAccId.get(email));
      } else {
        // First time seeing this email, write it down in the notebook
        emailToAccId.set(email, i);
      }
    }
  }

  // Group all emails by their Top Boss Account ID
  const mergedGroups = new Map(); // Key: Top Boss ID, Value: Array of Emails

  for (const [email, accId] of emailToAccId.entries()) {
    const topBossId = find(accId); // Who ultimately owns this email?

    if (!mergedGroups.has(topBossId)) {
      mergedGroups.set(topBossId, []);
    }

    mergedGroups.get(topBossId).push(email);
  }

  // Format the output (Sort emails and add the Name)
  const result = [];

  for (const [bossId, emails] of mergedGroups.entries()) {
    emails.sort(); // Sort emails alphabetically

    // Grab the name from the original accounts array
    const name = accounts[bossId][0];

    // Put the name at the front of the emails array
    emails.unshift(name);

    result.push(emails);
  }

  return result;
};
