// The Command design pattern is a behavioural design pattern that turns a request
// into a stand-alone object containing all information about the request

// This transformation allows parameterizing methods with different requests,
// queuing requests, logging them, and supporting undoable operations.

// The key components of this pattern are the Command, the Receiver, the Invoker, and the Client.

// Command: Declares an interface for executing an operation.
// ConcreteCommand: Implements the Command interface and defines a binding between a Receiver and an action.
// Receiver: Knows how to perform the operations associated with carrying out a request.
// Invoker: Asks the command to carry out the request.
// Client: Creates a ConcreteCommand object and sets its receiver.

// Let's implement a simple example where we have a set of operations (commands)
// that can be executed on a text editor (receiver).

// Command interface
class Command {
  execute() {}
  undo() {}
}

// Concrete commands
class AddTextCommand extends Command {
  constructor(receiver, text) {
    super();
    this.receiver = receiver;
    this.text = text;
  }

  execute() {
    this.receiver.addText(this.text);
  }

  undo() {
    this.receiver.removeText(this.text);
  }
}

class RemoveTextCommand extends Command {
  constructor(receiver, text) {
    super();
    this.receiver = receiver;
    this.text = text;
  }

  execute() {
    this.receiver.removeText(this.text);
  }

  undo() {
    this.receiver.addText(this.text);
  }
}

// Receiver
class TextEditor {
  constructor() {
    this.content = "";
  }

  addText(text) {
    this.content += text;
    console.log(`Current content: "${this.content}"`);
  }

  removeText(text) {
    this.content = this.content.replace(new RegExp(`${text}`), "");
    console.log(`Current content: "${this.content}"`);
  }
}

// Invoker
class TextEditorInvoker {
  constructor() {
    this.history = [];
  }
  executeCommand(command) {
    command.execute();
    this.history.push(command);
  }
  undo() {
    if (this.history.length > 0) {
      const command = this.history.pop();
      command.undo();
    }
  }
}

// Client
const editor = new TextEditor();
const invoker = new TextEditorInvoker();

const addHelloCommand = new AddTextCommand(editor, "Hello ");
const addWorldCommand = new AddTextCommand(editor, "World!");

invoker.executeCommand(addHelloCommand);
invoker.executeCommand(addWorldCommand);

invoker.undo();
invoker.undo();

const removeHelloCommand = new RemoveTextCommand(editor, "Hello ");
invoker.executeCommand(removeHelloCommand);

// Let's create a more complex implementation of the Command design pattern by simulating a simple
// remote control system for home automation. This system will allow you to turn on
// and off multiple devices like lights and fans.

// Command interface
class Command2 {
  execute() {}
  undo() {}
}

// Concrete commands
class LightOnCommand extends Command2 {
  constructor(light) {
    super();
    this.light = light;
  }
  execute() {
    this.light.on();
  }
  undo() {
    this.light.off();
  }
}

class LightOffCommand extends Command2 {
  constructor(light) {
    super();
    this.light = light;
  }
  execute() {
    this.light.off();
  }
  undo() {
    this.light.on();
  }
}

class FanOnCommand extends Command2 {
  constructor(fan) {
    super();
    this.fan = fan;
  }
  execute() {
    this.fan.on();
  }
  undo() {
    this.fan.off();
  }
}

class FanOffCommand extends Command2 {
  constructor(fan) {
    super();
    this.fan = fan;
  }
  execute() {
    this.fan.off();
  }
  undo() {
    this.fan.on();
  }
}

// Receiver classes
class Light {
  on() {
    console.log("The light is on");
  }
  off() {
    console.log("The light is off");
  }
}

class Fan {
  on() {
    console.log("The fan is on");
  }
  off() {
    console.log("The fan is off");
  }
}

// Invoker
class RemoteControl {
  constructor() {
    this.history = [];
    this.undoHistory = [];
  }

  executeCommand(command) {
    command.execute();
    this.history.push(command);
  }

  undo() {
    if (this.history.length > 0) {
      const command = this.history.pop();
      command.undo();
      this.undoHistory.push(command);
    }
  }

  redo() {
    if (this.undoHistory.length > 0) {
      const command = this.undoHistory.pop();
      command.execute();
      this.history.push(command);
    }
  }
}

// Client
const livingRoomLight = new Light();
const kitchenLight = new Light();
const livingRoomFan = new Fan();
const remoteControl = new RemoteControl();

const livingRoomLightOn = new LightOnCommand(livingRoomLight);
const livingRoomLightOff = new LightOffCommand(livingRoomLight);
const kitchenLightOn = new LightOnCommand(kitchenLight);
const kitchenLightOff = new LightOffCommand(kitchenLight);
const livingRoomFanOn = new FanOnCommand(livingRoomFan);
const livingRoomFanOff = new FanOffCommand(livingRoomFan);

remoteControl.executeCommand(livingRoomLightOn);
remoteControl.executeCommand(kitchenLightOn);
remoteControl.executeCommand(livingRoomFanOn);

remoteControl.undo();
remoteControl.undo();
remoteControl.redo();

// The light is on
// The light is on
// The fan is on
// The fan is off
// The light is off
// The light is on

// In this complex implementation, we have a RemoteControl invoker that can execute, undo, and redo commands.
// We defined multiple commands: LightOnCommand, LightOffCommand, FanOnCommand, and FanOffCommand, each of which takes a receiver (either a Light or a Fan)
// Each command class implements the execute and undo methods to turn the respective devices on or off.

// The RemoteControl class maintains a history of executed commands
// and an undo history to support redo functionality
// The client code creates instances of the receiver classes (Light and Fan)
// and the command objects, then uses the remote control to execute commands to turn on and off the lights and fans.

// The undo method reverses the last executed command,
// and the redo method re-executes the last undone command.
// This demonstrates a practical use case where the Command pattern helps manage
// complex operations on multiple devices with support for undo and redo functionalities.
