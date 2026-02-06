// This question was asked in Uber's frontend interview and Swiggy's frontend interview.

// Create a simple Observable class that implements the observer pattern.
// The class should:Allow subscribing to data changes via a subscribe method
// Notify all subscribers when data changes via a notify method
// Allow unsubscribing from updatesMaintain a list of subscriber callbacks

// It is the variation of the pub-sub - 1 and implements the observer design pattern.

class Observable {
  #observers;

  constructor() {
    this.#observers = [];
  }

  subscribe = (callback) => {
    if (typeof callback !== "function") {
      throw new Error("Callback must be a function");
    }

    this.#observers.push(callback);

    // Return subscription object with unsubscribe method using arrow function
    return {
      unsubscribe: () => {
        const index = this.#observers.indexOf(callback);
        if (index > -1) {
          this.#observers.splice(index, 1);
        }
      },
    };
  };

  // Can accept any number of arguments
  notify = (...data) => {
    this.#observers.forEach((observer) => {
      try {
        // Pass the arguments to callback
        observer(...data);
      } catch (err) {
        console.error("Error in observer callback:", error);
      }
    });
  };

  // Additional utility methods
  hasObservers = function () {
    return this.#observers.length > 0;
  };

  getObserverCount = function () {
    return this.#observers.length;
  };

  clear = function () {
    this.#observers = [];
  };
}

const observable = new Observable();

// Multiple subscribers
const sub1 = observable.subscribe(function (data) {
  console.log("Sub1:", data);
});

const sub2 = observable.subscribe(function (data) {
  console.log("Sub2:", data);
});

const sub3 = observable.subscribe(function (data) {
  console.log("Sub3:", data);
});

console.log("Observer count:", observable.getObserverCount()); // 3

observable.notify("Broadcast message");
// Logs:
// Sub1: Broadcast message
// Sub2: Broadcast message
// Sub3: Broadcast message

// Unsubscribe one
sub2.unsubscribe();

observable.notify("Another message");
// Logs:
// Sub1: Another message
// Sub3: Another message

// Clear all observers
observable.clear();
observable.notify("No one listening"); // Nothing logged
