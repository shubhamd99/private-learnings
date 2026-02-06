// The Memento design pattern is a behavioural design pattern that provides the ability to restore an object
// to its previous state.
// This pattern is useful for implementing undo mechanisms. The key components of this pattern are:

// Memento: Stores the internal state of the Originator object
// and protects against access by anything other than the Originator.

// Originator: Creates a memento containing a snapshot of its current internal state
// and uses the memento to restore its state.

// Caretaker: Responsible for keeping the memento but never operates on or examines its contents.

// Let's implement a simple example where we have a text editor that can save its state and restore it later.

// Memento
class Memento {
  constructor(state) {
    this.state = state;
  }
  getState() {
    return this.state;
  }
}

// Originator
class TextEditor {
  constructor() {
    this.content = "";
  }

  setState(state) {
    this.content = state;
  }

  getState() {
    return this.content;
  }

  save() {
    return new Memento(this.content);
  }

  restore(memento) {
    this.content = memento.getState();
  }
}

// Caretaker
class History {
  constructor() {
    this.mementos = [];
  }

  addMemento(memento) {
    this.mementos.push(memento);
  }

  getMemento(index) {
    return this.mementos[index];
  }
}

// Client
const editor = new TextEditor();
const history = new History();

editor.setState("Version 1");
history.addMemento(editor.save());

editor.setState("Version 2");
history.addMemento(editor.save());

editor.setState("Version 3");
history.addMemento(editor.save());

console.log(editor.getState());
// Output: Version 3

editor.restore(history.getMemento(1));
console.log(editor.getState());
// Output: Version 2

editor.restore(history.getMemento(0));
console.log(editor.getState());
// Output: Version 1

// When we need to restore a previous state, we use the restore method with the mementos stored in the history,
// effectively reverting the state of the text editor.

// Let's create a more detailed implementation of the Memento design pattern by simulating a game
// where a player's state can be saved and restored.

// Memento
class PlayerMemento {
  constructor(state) {
    this.state = state;
  }
  getState() {
    return this.state;
  }
}

// Originator
class Player {
  constructor(name) {
    this.name = name;
    this.level = 1;
    this.health = 100;
  }

  setState(state) {
    this.level = state.level;
    this.health = state.health;
  }

  getState() {
    return {
      level: this.level,
      health: this.health,
    };
  }

  save() {
    return new PlayerMemento(this.getState());
  }

  restore(memento) {
    this.setState(memento.getState());
  }

  levelUp() {
    this.level += 1;
    this.health = 100;
    console.log(`${this.name} leveled up to level ${this.level}`);
  }

  takeDamage(damage) {
    this.health -= damage;
    console.log(
      `${this.name} took ${damage} damage, health is now ${this.health}`,
    );
  }
}

// Caretaker
class GameHistory {
  constructor() {
    this.mementos = [];
  }
  addMemento(memento) {
    this.mementos.push(memento);
  }
  getMemento(index) {
    return this.mementos[index];
  }
}

// Client
const player = new Player("Hero");
const gameHistory = new GameHistory();
player.levelUp();

gameHistory.addMemento(player.save());
player.takeDamage(30);

gameHistory.addMemento(player.save());
player.levelUp();

gameHistory.addMemento(player.save());
player.takeDamage(50);
console.log(player.getState());
// Output: { level: 3, health: 50 }

player.restore(gameHistory.getMemento(1));
console.log(player.getState());
// Output: { level: 2, health: 70 }

player.restore(gameHistory.getMemento(0));
console.log(player.getState());
// Output: { level: 2, health: 100 }

// The player levels up and takes damage, with their state saved at each significant point.
// When the player needs to revert to a previous state, the restore method is used with the stored mementos,
// allowing the player to return to an earlier level and health state.
