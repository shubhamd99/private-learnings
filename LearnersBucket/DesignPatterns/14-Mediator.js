// The Mediator design pattern is a behavioural design pattern that encapsulates
// how objects interact with one another,
// ensuring that they do not refer to each other explicitly
// This reduces the dependencies between communicating objects,
// leading to a more loosely coupled system
// The pattern introduces a mediator object that handles all communications and control between the objects.

// Mediator: Declares an interface for communicating with Colleague objects.
// ConcreteMediator: Implements the Mediator interface and coordinates communication between Colleague objects.
// Colleague: Each Colleague class knows its Mediator object and communicates with its Mediator whenever
// it would have otherwise communicated with another Colleague.

// Complex UI Forms (The Developer's Reality)
// The Problem: You have a Checkout Page with a "Submit" button, a "Terms & Conditions" checkbox,
// and a "Coupon Code" field.
// The Mediator: The Form Controller.
// The Logic:
// The Checkbox doesn't enable the Button directly.
// The Checkbox tells the Controller: "I am checked."
// The Coupon field tells the Controller: "I am valid."
// The Mediator (Controller) decides: "Since both are true, I will now enable the Submit Button."

// Let's implement a simple example where we have a set of user objects
// that can send messages to each other via a chat mediator.

// Mediator interface
class Mediator {
  send(message, colleague) {}
}

// ConcreteMediator
class ChatMediator extends Mediator {
  constructor() {
    super();
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
  }

  send(message, sender) {
    this.users.forEach((user) => {
      if (user !== sender) {
        user.receive(message);
      }
    });
  }
}

// Colleague
class User {
  constructor(name, mediator) {
    this.name = name;
    this.mediator = mediator;
  }

  send(message) {
    console.log(`${this.name} sends: ${message}`);
    this.mediator.send(message, this);
  }

  receive(message) {
    console.log(`${this.name} receives: ${message}`);
  }
}

// Client
const mediator = new ChatMediator();

const user1 = new User("Alice", mediator);
const user2 = new User("Bob", mediator);
const user3 = new User("Charlie", mediator);

mediator.addUser(user1);
mediator.addUser(user2);
mediator.addUser(user3);

user1.send("Hello everyone!");
// user2.send("Hi Alice!");

// Alice sends: Hello everyone!
// Bob receives: Hello everyone!
// Charlie receives: Hello everyone!

// Let's create a more complex implementation of the Mediator design pattern by simulating
// an air traffic control system where planes communicate with the control tower (mediator)
// for takeoff and landing.

// Mediator interface
class Mediator2 {
  notify(sender, event) {}
}

// ConcreteMediator
class ControlTower extends Mediator2 {
  constructor() {
    super();
    this.runwayFree = true;
    this.planes = [];
  }

  registerPlane(plane) {
    this.planes.push(plane);
  }

  notify(sender, event) {
    if (event === "readyForLanding") {
      if (this.runwayFree) {
        console.log(`ControlTower: Plane ${sender.id} is clear to land.`);
        this.runwayFree = false;
      } else {
        console.log(`ControlTower: Plane ${sender.id} is waiting to land.`);
      }
    }

    if (event === "landed") {
      console.log(`ControlTower: Plane ${sender.id} has landed.`);
      this.runwayFree = true;
      this.checkWaitingPlanes();
    }

    if (event === "readyForTakeoff") {
      if (this.runwayFree) {
        console.log(`ControlTower: Plane ${sender.id} is clear to take off.`);
        this.runwayFree = false;
      } else {
        console.log(`ControlTower: Plane ${sender.id} is waiting to take off.`);
      }
    }

    if (event === "takenOff") {
      console.log(`ControlTower: Plane ${sender.id} has taken off.`);
      this.runwayFree = true;
      this.checkWaitingPlanes();
    }
  }

  checkWaitingPlanes() {
    for (let plane of this.planes) {
      if (plane.state === "waitingForLanding" && this.runwayFree) {
        this.notify(plane, "readyForLanding");
        plane.state = "landing";
        break;
      }

      if (plane.state === "waitingForTakeoff" && this.runwayFree) {
        this.notify(plane, "readyForTakeoff");
        plane.state = "takingOff";
        break;
      }
    }
  }
}

// Colleague
class Plane {
  constructor(id, mediator) {
    this.id = id;
    this.mediator = mediator;
    this.state = "onGround";
    mediator.registerPlane(this);
  }

  readyForLanding() {
    console.log(`Plane ${this.id}: Ready for landing.`);
    this.state = "waitingForLanding";
    this.mediator.notify(this, "readyForLanding");
  }

  landed() {
    console.log(`Plane ${this.id}: Landed.`);
    this.state = "onGround";
    this.mediator.notify(this, "landed");
  }

  readyForTakeoff() {
    console.log(`Plane ${this.id}: Ready for takeoff.`);
    this.state = "waitingForTakeoff";
    this.mediator.notify(this, "readyForTakeoff");
  }

  takenOff() {
    console.log(`Plane ${this.id}: Taken off.`);
    this.state = "inAir";
    this.mediator.notify(this, "takenOff");
  }
}

const controlTower = new ControlTower();
const plane1 = new Plane("A1", controlTower);
const plane2 = new Plane("B2", controlTower);
const plane3 = new Plane("C3", controlTower);

plane1.readyForTakeoff();
plane2.readyForLanding();
plane3.readyForTakeoff();
plane1.takenOff();
plane2.landed();

// Plane A1: Ready for takeoff.
// ControlTower: Plane A1 is clear to take off.
// Plane B2: Ready for landing.
// ControlTower: Plane B2 is waiting to land.
// Plane C3: Ready for takeoff.
// ControlTower: Plane C3 is waiting to take off.
// Plane A1: Taken off.
// ControlTower: Plane A1 has taken off.
// ControlTower: Plane B2 is clear to land.
// Plane B2: Landed.
// ControlTower: Plane B2 has landed.
// ControlTower: Plane C3 is clear to take off.
