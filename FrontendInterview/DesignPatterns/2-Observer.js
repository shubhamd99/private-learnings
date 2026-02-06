// Observer design pattern, Also known as pub/sub pattern short for publication/subscription.
// It is clear from the name itself that if you are subscribed to the publication and
// if something is published in the publication it will notify the subscriber.

// A subscription model in which an object subscribes to a host
// and the host notifies the object whenever an event occurs is known as the observer pattern.

// It is one of the important pillars of event-driven programming
// and JavaScript is one of the most popular event-driven programming languages.
// This pattern promotes loose coupling facilitating good object-oriented design.

// We write event handlers by creating event listeners that listen to an event
// and notify them every time the event is fired with some additional details of the event.

// For example, when a click event is triggered you can access the event object to get all the event details
// about the click like its position on the screen, etc.
// You can also remove the listener (unsubscribe) to stop listening if you want.

// Creating observer design pattern in JavaScript

// To create the observer design pattern, we need to have two types of participants.
// 1. Host- It will maintain the list of observers.Provides option to subscribe and unsubscribe to the observers.
// Notifies the observer when state changes.
// 2. Observer - Has a function that gets called/invoked every time a state changes.
// Keeping these two things in mind, we can create the Observer design pattern in JavaScript.

class Move {
  constructor() {
    this.handlers = [];
  }

  subscribe = (fn) => {
    this.handlers.push(fn);
  };

  unsubscribe = (fn) => {
    this.handlers = this.handlers.filter((item) => item !== fn);
  };

  // Why globalThis?
  // Node: globalThis === global
  // Browser: globalThis === window
  // Web Workers: globalThis === self
  fire = (payload, thisObj) => {
    const scope = thisObj || globalThis;
    this.handlers.forEach((handler) => {
      handler.call(scope, payload);
    });
  };
}

const move = new Move();

function onMove(e) {
  console.log("Move event:", e);
}

move.subscribe(onMove);
move.fire({ x: 10 });
move.unsubscribe(onMove);
move.fire({ x: 20 }); // nothing logs

// Coursera Interview Question
// Implement the subscribe, subscribeOnce, and subscribeOnceAsync.
// Refer - 5-PublisherSubscriber2.js
