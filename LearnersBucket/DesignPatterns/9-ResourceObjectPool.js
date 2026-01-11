// This question was asked in Thoughtspot MTS-3 interview.

// Object pool, also known as resource pool, is a design pattern in which,
// when an object is requested, it is returned from the pool of available objects;
// if the object is not available, it will be created.
// Objects whose work is done can be released back to the pool so that they can be returned.

// Why a resource pool?
// Each programming language uses a resource (memory) to function,
// and every object or variable defined consumes memory,
// so it is important to manage the memory properly to make the application's performance efficient.

// When initializing a class instance is expensive,
// there is a high rate of class instantiation, and
// there are few instantiations in use at any given time,
// object pooling can result in significant performance gains.

// The memory is periodically cleaned with the help of garbage collection.
// for example,
let arr = new Array(1000).fill(0);
let newArray = arr;

// In this, we have created a new array, arr and the variable newArray is pointing to arr,
// which means newArray is pointing to the memory address of the arr.

// In order for garbage collection to collect memory, we will have to set both instances to null.

arr = null;
newArray = null;

// Similar to objects, we have to delete them, in order for garbage collection.

let obj = {
  name: "learnersbucket",
};

delete obj.name;
obj = null;

// Thus, it is better to maintain a pool of resources and
// reuse them rather than create a new one and release them when work is done.

// Implementing a resource pool or object pool design pattern in JavaScript.
// The resource pool is only concerned with managing the pool of resources and how to release them.
// What to maintain and how to reset the resource during the release are handled externally,
// making the resource pool flexible and reusable to handle any type of object.

// A resource pool will always have a fixed size and will increase gradually. We will see both implementations.
// Remember, we are designing the resource pool only to make the application memory efficient
// and handle garbage collection effectively.

// Considering this, let us first see the difference between array initialization
// and its performance impact.
// The normal way: declare the array and push the data.

const normalArray = (n) => {
  // Internally:
  // JS creates a small dynamic array
  // As you push, when capacity is exceeded:
  // Engine allocates a bigger memory block
  // Copies old elements into new memory
  // Frees old memory
  // This repeats multiple times
  // So cost is: Multiple allocations + multiple memory copies + resizing overhead
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
};

// Efficient way: declare the array, initialize it, and then push the data.

const arrayWithPreAllocation = (n) => {
  const arr = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    arr[i] = i;
  }
};

// In the majority of cases, arrayWithPreAllocation will outperform normalArray.
// The second version is more performant because it pre-allocates memory and avoids repeated array resizing and reallocation.
// Thus, we are going to go with the second way and pre allocate the array with the default value.

// Also because resoruce pool has to be only, we will follow the Signleton design pattern
// to share the resource pool instance accross the codebase.

class ResourcePoolSample {
  poolArray = null;

  constructor(constructorFunction, initialSize = 1000) {
    this.poolArray = new Array(initialSize).fill(0).map(constructorFunction);
  }
}

// We will accept the constructor function in the input, and
// it will return us an object or any resource that will be managed.

// The two important methods that this ResourcePool class has are getElement and releaseElement.
// There are two ways of releasing an element:
// By manually releasing the element
// Duration-based: the resource will be released after the specified duration.

// For either of these, we will need to maintain an object with the data and the flag to check if it is free or not.

class ResourcePoolMember {
  constructor(data) {
    this.data = data;
    this.available = true;
  }
}

// Using this, we can create a new object or resource every time and track it.

// Resource pool with manual release function
class ResourcePool {
  poolArray = null;

  // this two will be provided externally
  // this is default delcaration:
  creatorFunc = () => {};
  resetFunction = () => {};

  constructor(creatorFunc, resetFunction, size = 1000) {
    this.resetFunction = resetFunction;
    this.creatorFunc = creatorFunc;
    this.poolArray = new Array(size).fill(0).map(() => this.createElement());
  }

  // this will create a fresh instance
  // reset for safer side
  createElement() {
    const data = this.resetFunction(this.creatorFunc());
    return new ResourcePoolMember(data);
  }

  // returns the free resource from the pool
  getElement() {
    for (let i = 0; i < this.poolArray.length; i++) {
      if (this.poolArray[i].available) {
        this.poolArray[i].available = false;
        return this.poolArray[i];
      }
    }
  }

  // releases an element
  releaseElement(element) {
    element.available = true;
    this.resetFunction(element.data);
  }
}

// We can test this by creating a creator function and a reset function.

const creatorFunc = () => {
  return { counter: 0 };
};

const resetFunc = (coolThing) => {
  coolThing.counter = 0;
  delete coolThing.name;
  return coolThing;
};

const myPool = new ResourcePool(creatorFunc, resetFunc, 1);
const objectThatIsReadyToUse = myPool.getElement();

console.log(objectThatIsReadyToUse);
// {
//   "free": false,
//   "data": {
//     "counter": 0
//   }
// }

// ... doing stuff with objectThatIsReadyToUse.data

myPool.releaseElement(objectThatIsReadyToUse);
console.log(objectThatIsReadyToUse);
// {
//   "free": true,
//   "data": {
//     "counter": 0
//   }
// }

// Here once the object is released, it will be reset according to the logic present in the reset function.
// Note: You would restrict the mutation of certain keys of the object, like the available flag, externally.

// Resource pool with duration based allocation.

class ResourcePoolMemberTimeBased {
  constructor(data) {
    this.data = data;
    this.time = 0;
  }
}

const DURATION = 3000;

class ResourcePool2 {
  poolArray = null;
  resetFunction = () => {};
  creatorFunc = () => {};

  constructor(creatorFunc, resetFunction, size = 1000) {
    this.resetFunction = resetFunction;
    this.creatorFunc = creatorFunc;
    this.poolArray = new Array(size).fill(0).map(() => this.createElement());
  }

  createElement() {
    const data = this.resetFunction(this.creatorFunc());
    return new ResourcePoolMemberTimeBased(data);
  }

  getElement() {
    for (let i = 0; i < this.poolArray.length; i++) {
      // check if the resource allocation duration has expired
      if (Date.now() - this.poolArray[i].time > DURATION) {
        // release the element
        this.releaseElement(this.poolArray[i]);
        // assign the current time
        this.poolArray[i].time = Date.now();
        // return it
        return this.poolArray[i];
      }
    }
  }

  releaseElement(element) {
    element.time = 0;
    this.resetFunction(element.data);
  }
}

// We can test this asking for resource after the duration of any previous resource.

const myPool2 = new ResourcePool2(creatorFunc, resetFunc, 10);
const objectThatIsReadyToUse2 = myPool2.getElement();

objectThatIsReadyToUse2.data.counter++;
console.log(objectThatIsReadyToUse2);
// {
//   "data": {
//     "counter": 1
//   },
//   "time": 1710445681593
// }

setTimeout(() => {
  const objectThatIsReadyToUse3 = myPool.getElement();

  console.log(objectThatIsReadyToUse2 === objectThatIsReadyToUse3);
  // true
  // same object is returned

  console.log(objectThatIsReadyToUse3);
  // {
  //   "data": {
  //     "counter": 0
  //   },
  //   "time": 1710445685157
  // }
}, 3500);

// Increasing the size of the resource pool

// There is a chance that you encounter a scenario where you want to increase the resource pool size,
// but you want to do it intelligently. You don't want to create a large pool that is never used.

// There are two ways of doing it:

// You increase the size of the pool by a percentage X,
// when only Y percent of the pool is available if you are using the array,
// called amortized space increase, which works in linear time O(N).

// Second, use the doubly linked list or double ended queue and increase the size as and when required.
// This is the best approach, as you won't have to worry about reducing the size;
// it will be adjusted as per the requirements and the changes.

// Approach 1: Increasing the pool size
// One caveat in this is that you have to handle the edge case of reducing the pool size when a certain threshold of elements is free.

const THRESHOLD_PERCENT = 10;
const INCREASE_PERCENT = 50;

class ResourcePool3 {
  poolArray = [];
  freeElements = 0;
  freeIndex = 0;
  resetFunction = () => {};
  creatorFunc = () => {};

  constructor(creatorFunc, resetFunction, size = 1000) {
    this.resetFunction = resetFunction;
    this.creatorFunc = creatorFunc;
    for (let i = 0; i < size; i++) {
      this.createElement();
    }
  }

  createElement() {
    this.freeElements++;
    this.poolArray.push(this.resetFunction(this.creatorFunc()));
    return this.poolArray[this.poolArray.length - 1];
  }

  increasePoolSize() {
    // Calculate how much to grow
    const increaseSize = Math.round(
      (INCREASE_PERCENT * this.poolArray.length) / 100
    );

    for (let i = 0; i < increaseSize; i++) {
      this.createElement();
    }

    this.freeElements += increaseSize;
  }

  getElement() {
    // free elements % left in pool. If free objects ≤ threshold, grow the pool.
    if (this.freeElements / this.poolArray.length <= THRESHOLD_PERCENT / 100) {
      this.increasePoolSize();
    }
    this.freeElements--;
    const freeElement = this.poolArray[this.freeIndex];
    this.poolArray[this.freeIndex++] = null;
    return freeElement;
  }

  releaseElement(element) {
    this.poolArray[--this.freeIndex] = element;
    this.resetFunction(element);
  }

  get size() {
    return this.poolArray.length;
  }
}

// Approach 2: Using a doubly linked list or deque.
// The advantage of using a deque of a doubly linked list is that when the next object is released
// and all its subsequent objects are also free, the next is marked as null
// and the list size is reduced, which releases the memory through garbage collection, making it memory efficient.

class ResourcePoolMemberLL {
  previousElement = null;
  nextElement = null;
  free = true;
  constructor(data) {
    this.data = data;
  }
}

class ResourcePoolLL {
  poolArray = [];
  freeElements = 0;
  nextFree = null;
  lastFree = null;
  resetFunction = () => {};
  creatorFunc = () => {};

  constructor(creatorFunc, resetFunction = (any) => any, size = 1000) {
    this.resetFunction = resetFunction;
    this.creatorFunc = creatorFunc;
    for (let i = 0; i < size; i++) {
      this.createElement();
    }
    this.nextFree = this.poolArray[0];
  }

  createElement() {
    this.freeElements++;
    const data = this.resetFunction(this.creatorFunc());
    const newResourcePoolMember = new ResourcePoolMember(data);
    this.poolArray.push(newResourcePoolMember);
    if (!this.lastFree) {
      this.lastFree = newResourcePoolMember;
    } else {
      this.linkElement(newResourcePoolMember);
    }
    return newResourcePoolMember;
  }

  linkElement(element) {
    element.previousElement = this.lastFree;
    this.lastFree.nextElement = element;
    this.lastFree = element;
  }

  unlinkFirstElement(element) {
    this.nextFree = element.nextElement;
    this.nextFree.previousElement = null;
    element.nextElement = this.previousElement = null;
  }

  catchElement(element) {
    element.free = false;
    this.freeElements--;
    if (this.freeElements / this.poolArray.length < THRESHOLD_PERCENT / 100) {
      const increaseSize = Math.round(
        (INCREASE_PERCENT * this.poolArray.length) / 100
      );
      for (let i = 0; i < increaseSize; i++) {
        this.createElement();
      }
      this.freeElement += increaseSize;
    }
  }

  getElement() {
    const availableElement = this.nextFree;
    this.unlinkFirstElement(availableElement);
    this.catchElement(availableElement);
    return availableElement;
  }

  setElementAsFree(element) {
    element.free = true;
    this.linkElement(element);
    this.freeElements++;
  }

  releaseElement(element) {
    this.setElementAsFree(element);
    this.resetFunction(element.data);
  }
}

function createResource() {
  return {
    id: Math.random().toString(36).slice(2),
    inUse: false,
  };
}

function resetResource(resource) {
  resource.inUse = false;
  return resource;
}

const poolLL = new ResourcePoolLL(createResource, resetResource, 3);

const r1 = poolLL.getElement();
r1.data.inUse = true;
console.log("Got resource 1:", r1.data);

const r2 = poolLL.getElement();
r2.data.inUse = true;
console.log("Got resource 2:", r2.data);

poolLL.releaseElement(r1);
console.log("Released resource 1");

const r3 = poolLL.getElement();
console.log("Got resource again (reused):", r3.data);
