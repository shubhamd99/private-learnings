class MyHeap {
  constructor(compare) {
    this.data = [];
    this.compare = compare;
  }

  size() {
    return this.data.length;
  }

  peek() {
    return this.data[0];
  }

  push(val) {
    this.data.push(val);
    this.bubbleUp(this.data.length - 1);
  }

  pop() {
    const top = this.data[0];
    const last = this.data.pop();

    if (this.data.length > 0) {
      this.data[0] = last;
      this.bubbleDown(0);
    }

    return top;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);

      if (!this.compare(this.data[index], this.data[parent])) break;

      [this.data[index], this.data[parent]] = [
        this.data[parent],
        this.data[index],
      ];

      index = parent;
    }
  }

  bubbleDown(index) {
    const n = this.data.length;

    while (true) {
      let best = index;
      const left = index * 2 + 1;
      const right = index * 2 + 2;

      if (left < n && this.compare(this.data[left], this.data[best])) {
        best = left;
      }

      if (right < n && this.compare(this.data[right], this.data[best])) {
        best = right;
      }

      if (best === index) break;

      [this.data[index], this.data[best]] = [this.data[best], this.data[index]];

      index = best;
    }
  }
}
