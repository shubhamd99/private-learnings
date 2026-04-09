// LRU Cache ⭐ (MUST DO)
// Design a data structure that follows Least Recently Used cache eviction.
// Both get() and put() must run in O(1).
//
// Input:  capacity = 2
//   put(1, 1)  → cache: {1=1}
//   put(2, 2)  → cache: {1=1, 2=2}
//   get(1)     → returns 1, cache: {2=2, 1=1}  (1 is now most recent)
//   put(3, 3)  → evicts key 2, cache: {1=1, 3=3}
//   get(2)     → returns -1  (evicted)
//   get(1)     → returns 1
//   get(3)     → returns 3

// ---- SIMPLE VERSION (for interviews) ----
// Idea: Map preserves insertion order — we can use it as an ordered cache.
// On get: delete and re-insert the key to move it to the "most recently used" end.
// On put: same — delete + re-insert. If over capacity, delete the first (oldest) key.
// Map.keys().next().value gives the least recently used key (oldest insertion).

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // preserves insertion order
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    const value = this.cache.get(key);
    // move to most recently used: delete then re-insert at end
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key); // remove old position
    } else if (this.cache.size >= this.capacity) {
      // evict LRU: first key in Map is the least recently used
      const lruKey = this.cache.keys().next().value;
      this.cache.delete(lruKey);
    }
    this.cache.set(key, value); // insert at most-recent end
  }
}

// Example
const cache = new LRUCache(2);
cache.put(1, 1); // cache: {1=1}
cache.put(2, 2); // cache: {1=1, 2=2}
cache.get(1); // returns 1, cache: {2=2, 1=1}
cache.put(3, 3); // evicts key 2, cache: {1=1, 3=3}
cache.get(2); // returns -1 (evicted)
cache.put(4, 4); // evicts key 1, cache: {3=3, 4=4}
cache.get(1); // returns -1
cache.get(3); // returns 3
cache.get(4); // returns 4

// Why Map works for O(1):
// Map.get / Map.set / Map.delete are all O(1).
// Map.keys().next().value gets the oldest key in O(1).

// Time: O(1) for both get and put
// Space: O(capacity)
