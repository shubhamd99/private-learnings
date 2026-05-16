// LRU Cache: Least Recently Used item is removed when capacity is full.
// Map maintains insertion order, so the first key is the least recently used.
// We delete + set a key again to move it to the end and mark it recent.

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }

    const value = this.cache.get(key);

    // Move key to the end because it was recently used.
    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    this.cache.set(key, value);

    if (this.cache.size > this.capacity) {
      // keys().next().value gives the first key, not the value.
      const leastUsedKey = this.cache.keys().next().value;
      this.cache.delete(leastUsedKey);
    }
  }
}

const lru = new LRUCache(2);

lru.put(1, 10);
lru.put(2, 20);

console.log(lru.get(1)); // 10, key 1 becomes recently used

lru.put(3, 30); // Removes key 2

console.log(lru.get(2)); // -1
console.log(lru.get(3)); // 30

lru.put(4, 40); // Removes key 1

console.log(lru.get(1)); // -1
console.log(lru.get(3)); // 30
console.log(lru.get(4)); // 40

// Time complexity: get and put are O(1)
// Space complexity: O(capacity)
