// This is an advanced version of problem based on the publisher-subscriber pattern,
// this question was asked to me in the Coursera's frontend interview.

// Implement the pub-sub pattern in JavaScript that has following methods: subscribe, subscribeOnce, and subscribeOnceAsync

class Events {
  // # is used to declare private fields or private methods inside a class.
  #subscriptionList;
  #subscribeOnceList;
  #subscribeOnceAsyncList;

  constructor() {
    this.#subscriptionList = new Map();
    this.#subscribeOnceList = new Map();
    this.#subscribeOnceAsyncList = new Map();
  }

  subscribe = (name, callback) => {
    if (!this.#subscriptionList.has(name)) {
      this.#subscriptionList.set(name, [callback]);
    } else {
      const exisitngCallbacks = this.#subscriptionList.get(name);
      this.#subscriptionList.set(name, [...exisitngCallbacks, callback]);
    }

    return {
      remove: () => {
        const exisitngCallbacks = this.#subscriptionList.get(name);
        const filtered = exisitngCallbacks.filter((e) => e !== callback);
        this.#subscriptionList.set(name, filtered);
      },
    };
  };

  subscribeOnce = (name, callback) => {
    if (!this.#subscribeOnceList.has(name)) {
      this.#subscribeOnceList.set(name, [callback]);
    } else {
      const exisitngCallbacks = this.#subscribeOnceList.get(name);
      this.#subscribeOnceList.set(name, [...exisitngCallbacks, callback]);
    }
  };

  subscribeOnceAsync = async (name) => {
    return new Promise((resolve, reject) => {
      if (!this.#subscribeOnceAsyncList.has(name)) {
        this.#subscribeOnceAsyncList.set(name, [resolve]);
      } else {
        const exisitngCallbacks = this.#subscribeOnceAsyncList.get(name);
        this.#subscribeOnceAsyncList.set(name, [...exisitngCallbacks, resolve]);
      }
    });
  };

  publish = (name, data) => {
    const callbacks = this.#subscriptionList.get(name) || [];
    callbacks.forEach((e) => {
      e(data);
    });

    const subscribeOnceCallbacks = this.#subscribeOnceList.get(name) || [];
    subscribeOnceCallbacks.forEach((e) => {
      e(data);
    });
    this.#subscribeOnceList.set(name, []);

    const subscribeOnceAsyncCallbacks =
      this.#subscribeOnceAsyncList.get(name) || [];
    subscribeOnceAsyncCallbacks.forEach((e) => {
      e(data);
    });
    this.#subscribeOnceAsyncList.set(name, []);
  };

  publishAll = (data) => {
    const entries = this.#subscriptionList.entries(); // Returns an iterable of key, value pairs for every entry in the map.
    for (let [_, value] of entries) {
      value.forEach((e) => {
        e(data);
      });
    }
  };
}

// Test cases
const events = new Events();

const newUserNewsSubscription = events.subscribe(
  "new-user",
  function (payload) {
    console.log(`Sending Q1 News to: ${payload}`);
  }
);

events.publish("new-user", "Jhon");

//output: "Sending Q1 News to: Jhon"

const newUserNewsSubscription2 = events.subscribe(
  "new-user",
  function (payload) {
    console.log(`Sending Q2 News to: ${payload}`);
  }
);

events.publish("new-user", "Doe");

//output: "Sending Q1 News to: Doe"
//output: "Sending Q2 News to: Doe"

newUserNewsSubscription.remove(); // Q1 news is removed

events.publish("new-user", "Foo");
//output: "Sending Q2 News to: Foo"

events.publishAll("FooBar");
//output: "Sending Q2 News to: FooBar"

events.subscribeOnce("new-user", function (payload) {
  console.log(`I am invoked once ${payload}`);
});

events.publish("new-user", "Foo Once");
//output: "Sending Q2 News to: Foo Once" - normal event
//output: "I am invoked once Foo Once" - once event

events.publish("new-user", "Foo Twice");
//output: "Sending Q2 News to: Foo Twice" - normal event
// once event should not invoke for second time

events.subscribeOnceAsync("new-user").then(function (payload) {
  console.log(`I am invoked once ${payload}`);
});

events.publish("new-user", "Foo Once Async");
//output: "Sending Q2 News to: Foo Once Async"
//output: "I am invoked once Foo Once Async"
