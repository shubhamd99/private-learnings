// The State design pattern is a behavioural design pattern that allows an object to change
// its behaviour when its internal state changes.
// The pattern involves three key components: the Context, State, and Concrete State classes.

// The Context class is the main class whose behaviour varies based on its state.
// The State interface declares the methods that all Concrete States should implement.
// The Concrete State classes implement the specific behaviour associated with a state of the Context.

// This pattern is useful for scenarios where an object needs to exhibit different behaviours
// based on its state, without using large conditional statements.

// Let's implement a simple example where a player can be in different states (playing, paused, or stopped)
// and the behaviour of the player changes based on its state.

// State interface
class State {
  play() {}
  pause() {}
  stop() {}
}

// Concrete States
class PlayingState extends State {
  constructor(player) {
    super();
    this.player = player;
  }

  play() {
    console.log("Already playing.");
  }

  pause() {
    console.log("Pausing the player.");
    this.player.setState(this.player.pausedState);
  }

  stop() {
    console.log("Stopping the player.");
    this.player.setState(this.player.stoppedState);
  }
}

class PausedState extends State {
  constructor(player) {
    super();
    this.player = player;
  }
  play() {
    console.log("Resuming play.");
    this.player.setState(this.player.playingState);
  }
  pause() {
    console.log("Already paused.");
  }
  stop() {
    console.log("Stopping the player.");
    this.player.setState(this.player.stoppedState);
  }
}

class StoppedState extends State {
  constructor(player) {
    super();
    this.player = player;
  }
  play() {
    console.log("Starting play.");
    this.player.setState(this.player.playingState);
  }
  pause() {
    console.log("Cannot pause. The player is stopped.");
  }
  stop() {
    console.log("Already stopped.");
  }
}

// Context
class Player {
  constructor() {
    this.playingState = new PlayingState(this);
    this.pausedState = new PausedState(this);
    this.stoppedState = new StoppedState(this);
    this.state = this.stoppedState;
  }

  setState(state) {
    this.state = state;
  }

  play() {
    this.state.play();
  }

  pause() {
    this.state.pause();
  }

  stop() {
    this.state.stop();
  }
}

// Client
const player = new Player();
player.play(); // Starting play.
player.pause(); // Pausing the player.
player.play(); // Resuming play.
player.stop(); // Stopping the player.
player.stop(); // Already stopped.

// For example, if the player is in the stopped state and play is called,
// it transitions to the playing state. If it's in the playing state and pause is called,
// it transitions to the paused state. This approach avoids conditional statements
// and makes the code more maintainable and extensible.

// Let's create a more detailed implementation of the State design pattern by simulating
// an order processing system where an order can be in different states such as New, Processing, Shipped,
// and Delivered.

// State interface
class State2 {
  processOrder() {}
  shipOrder() {}
  deliverOrder() {}
}

// Concrete States
class NewOrderState extends State2 {
  constructor(order) {
    super();
    this.order = order;
  }

  processOrder() {
    console.log("Processing the order.");
    this.order.setState(this.order.processingState);
  }

  shipOrder() {
    console.log("Cannot ship. The order is not processed yet.");
  }

  deliverOrder() {
    console.log("Cannot deliver. The order is not shipped yet.");
  }
}

class ProcessingOrderState extends State2 {
  constructor(order) {
    super();
    this.order = order;
  }
  processOrder() {
    console.log("Order is already being processed.");
  }
  shipOrder() {
    console.log("Shipping the order.");
    this.order.setState(this.order.shippedState);
  }
  deliverOrder() {
    console.log("Cannot deliver. The order is not shipped yet.");
  }
}

class ShippedOrderState extends State2 {
  constructor(order) {
    super();
    this.order = order;
  }
  processOrder() {
    console.log("Order is already processed.");
  }
  shipOrder() {
    console.log("Order is already shipped.");
  }
  deliverOrder() {
    console.log("Delivering the order.");
    this.order.setState(this.order.deliveredState);
  }
}

class DeliveredOrderState extends State2 {
  constructor(order) {
    super();
    this.order = order;
  }
  processOrder() {
    console.log("Order is already delivered.");
  }
  shipOrder() {
    console.log("Order is already delivered.");
  }
  deliverOrder() {
    console.log("Order is already delivered.");
  }
}

// Context
class Order {
  constructor() {
    this.newOrderState = new NewOrderState(this);
    this.processingState = new ProcessingOrderState(this);
    this.shippedState = new ShippedOrderState(this);
    this.deliveredState = new DeliveredOrderState(this);
    this.state = this.newOrderState;
  }

  setState(state) {
    this.state = state;
  }

  processOrder() {
    this.state.processOrder();
  }

  shipOrder() {
    this.state.shipOrder();
  }

  deliverOrder() {
    this.state.deliverOrder();
  }
}

// Client
const order = new Order();
order.processOrder(); // Processing the order.
order.shipOrder(); // Shipping the order.
order.deliverOrder(); // Delivering the order.
order.processOrder(); // Order is already delivered.
order.shipOrder(); // Order is already delivered.
order.deliverOrder(); // Order is already delivered.

// REAL USECASE

// Problem with this approach
// Logic is centralized in if/else
// Every new state = modify this block
// Behavior is not encapsulated
// Grows into a mess in big apps

// if (status === "idle") {
//   showLoginButton();
// } else if (status === "loading") {
//   showSpinner();
//   disableButton();
// } else if (status === "success") {
//   showDashboard();
// } else if (status === "error") {
//   showError();
// }

class UIState {
  render(ui) {}
}

class IdleState extends UIState {
  render(ui) {
    ui.showLoginButton();
  }
}

class LoadingState extends UIState {
  render(ui) {
    ui.showSpinner();
    ui.disableButton();
  }
}

class SuccessState extends UIState {
  render(ui) {
    ui.showDashboard();
  }
}

class ErrorState extends UIState {
  render(ui) {
    ui.showError();
  }
}

class LoginUI {
  constructor() {
    this.idleState = new IdleState();
    this.loadingState = new LoadingState();
    this.successState = new SuccessState();
    this.errorState = new ErrorState();

    this.state = this.idleState; // initial state
  }

  setState(state) {
    this.state = state;
    this.render();
  }

  render() {
    this.state.render(this); // delegate to state
  }

  // UI methods
  showLoginButton() {
    console.log("Show login button");
  }
  showSpinner() {
    console.log("Show spinner");
  }
  disableButton() {
    console.log("Disable button");
  }
  showDashboard() {
    console.log("Show dashboard");
  }
  showError() {
    console.log("Show error");
  }
}

const ui = new LoginUI();
ui.render(); // idle
ui.setState(ui.loadingState);
ui.setState(ui.successState);
ui.setState(ui.errorState);
