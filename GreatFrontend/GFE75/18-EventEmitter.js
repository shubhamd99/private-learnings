// In the observer pattern (also commonly known as the publish-subscribe model),
// we can observe/subscribe to events emitted by publishers and
// execute code whenever an event happens.

// You are free to use alternative approaches of
// instantiating the EventEmitter as long as the
// default export has the same interface.

class EventEmitter {
  constructor() {
    // Avoid creating objects via `{}` to exclude unwanted properties
    // on the prototype (such as `.toString`).
    this._events = Object.create(null);
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */
  on(eventName, listener) {
    if (!Object.hasOwn(this._events, eventName)) {
      this._events[eventName] = [];
    }

    this._events[eventName].push(listener);
    return this;
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */
  off(eventName, listener) {
    // Ignore non-existing eventNames.
    if (!Object.hasOwn(this._events, eventName)) {
      return this;
    }

    const listeners = this._events[eventName];

    // Find only first instance of the listener.
    const index = listeners.findIndex(
      (listnerItem) => listnerItem === listener,
    );

    if (index < 0) {
      return this;
    }

    this._events[eventName].splice(index, 1);
    return this;
  }

  /**
   * @param {string} eventName
   * @param  {...any} args
   * @returns {boolean}
   */
  emit(eventName, ...args) {
    // Return false for non-existing eventNames or events without listeners.
    if (
      !Object.hasOwn(this._events, eventName) ||
      this._events[eventName].length === 0
    ) {
      return false;
    }

    // Make a clone of the listeners in case one of the listeners
    // mutates this listener array.
    const listeners = this._events[eventName].slice();
    listeners.forEach((listener) => {
      listener.apply(null, args);
    });

    return true;
  }
}

const emitter = new EventEmitter();

function addTwoNumbers(a, b) {
  console.log(`The sum is ${a + b}`);
}
emitter.on("foo", addTwoNumbers);
emitter.emit("foo", 2, 5);
// > "The sum is 7"

emitter.on("foo", (a, b) => console.log(`The product is ${a * b}`));
emitter.emit("foo", 4, 5);
// > "The sum is 9"
// > "The product is 20"

emitter.off("foo", addTwoNumbers);
emitter.emit("foo", -3, 9);
// > "The product is -27"

// With normal {} object creation

// You are free to use alternative approaches of
// instantiating the EventEmitter as long as the
// default export has the same interface.

class EventEmitter2 {
  constructor() {
    this._events = {};
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */
  on(eventName, listener) {
    if (!this._events.hasOwnProperty(eventName)) {
      this._events[eventName] = [];
    }

    this._events[eventName].push(listener);
    return this;
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */
  off(eventName, listener) {
    // Ignore non-existing eventNames.
    if (!this._events.hasOwnProperty(eventName)) {
      return this;
    }

    const listeners = this._events[eventName];

    // Find only first instance of the listener.
    const index = listeners.findIndex(
      (listnerItem) => listnerItem === listener,
    );

    if (index < 0) {
      return this;
    }

    this._events[eventName].splice(index, 1);
    return this;
  }

  /**
   * @param {string} eventName
   * @param  {...any} args
   * @returns {boolean}
   */
  emit(eventName, ...args) {
    // Return false for non-existing eventNames or events without listeners.
    if (
      !this._events.hasOwnProperty(eventName) ||
      this._events[eventName].length === 0
    ) {
      return false;
    }

    // Make a clone of the listeners in case one of the listeners
    // mutates this listener array.
    const listeners = this._events[eventName].slice();
    listeners.forEach((listener) => {
      listener.apply(null, args);
    });

    return true;
  }
}

// ---- SIMPLE VERSION (for interviews) ----
// Idea: store listeners in a Map keyed by event name.
// on() → push listener into the array for that event.
// off() → find and remove the first matching listener.
// emit() → call each listener with the provided args; return false if none exist.
class EventEmitter {
  constructor() {
    this.events = new Map(); // eventName → [listeners]
  }

  on(eventName, listener) {
    if (!this.events.has(eventName)) this.events.set(eventName, []);
    this.events.get(eventName).push(listener);
    return this;
  }

  off(eventName, listener) {
    if (!this.events.has(eventName)) return this;
    const listeners = this.events.get(eventName);
    const index = listeners.indexOf(listener); // remove first match only
    if (index >= 0) listeners.splice(index, 1);
    // if (listeners.length === 0) this.events.delete(eventName);
    return this;
  }

  emit(eventName, ...args) {
    if (!this.events.has(eventName) || this.events.get(eventName).length === 0)
      return false;
    // snapshot to guard against listeners mutating the array mid-emit
    this.events
      .get(eventName)
      .slice()
      .forEach((fn) => fn(...args));
    return true;
  }
}
