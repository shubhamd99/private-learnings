// ⁠Find who wins the election ['a','a','b','b','a','b','c'].
// If multiple candidates have same votes,
// then first one wins in order of occurrence.

// votes = ['a','a','b','b','a','b','c']

// count votes:
// a → 3
// b → 3
// c → 1

// a and b both have 3 votes
// a appeared first → a wins

function findWinner(votes) {
  const count = {};
  const order = [];

  for (let vote of votes) {
    if (count[vote] === undefined) {
      count[vote] = 0;
      order.push(vote); // first time seeing this candidate
    }
    count[vote]++;
  }

  let winner = order[0]; // start with the first candidate

  for (let candidate of order) {
    if (count[candidate] > count[winner]) {
      winner = candidate; // higher votes → new winner
    }
    // equal votes → keep current winner (first occurrence wins)
  }

  return winner;
}

// Usage
console.log(findWinner(["a", "a", "b", "b", "a", "b", "c"])); // 'a'
console.log(findWinner(["a", "b", "b", "b", "a"])); // 'b'
console.log(findWinner(["a", "b", "c"])); // 'a'  all equal, first wins
