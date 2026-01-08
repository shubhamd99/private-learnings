// In a singleton design pattern, only one object is created for each interface (class or function)
// and the same object is returned every time when the function or class is called.

// It is really useful in scenarios where only one object is needed to coordinate actions across the system.
// For example, notification object, which sends notification across the system.

// const object1 = singleton.getInstance();
// const object2 = singleton.getInstance();

// console.log(object1 === object2); //true

// We can implement the singleton pattern by creating a closure with a variable that stores the created instance
// and returns it every time.

const Singleton = (function () {
  let instance;

  function createInstance() {
    const object = new Object("I'm the instance");
    return object;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

const object1 = Singleton.getInstance();
const object2 = Singleton.getInstance();

console.log(object1 === object2); //true

// In JavaScript, a Singleton can be enforced by returning the same instance from the constructor
// or by blocking direct construction and exposing a static factory method.

class SingletonClass {
  static instance;
  static #isCreating = false;

  constructor() {
    if (!SingletonClass.#isCreating) {
      throw new Error("Use SingletonClass.getInstance()");
    }
  }

  static getInstance() {
    if (!SingletonClass.instance) {
      SingletonClass.#isCreating = true;
      SingletonClass.instance = new SingletonClass();
      SingletonClass.#isCreating = false;
    }
    return SingletonClass.instance;
  }
}

// new SingletonClass(); // ❌ throws error
// Singleton.getInstance(); // ✅ works

const object3 = SingletonClass.getInstance();
const object4 = SingletonClass.getInstance();

console.log(object3 === object4); // true
