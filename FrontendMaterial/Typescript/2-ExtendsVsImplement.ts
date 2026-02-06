// Extends
// Class inheritance (Child gets Parent's code).
// "I am a type of Animal, so I automatically have legs."

// Implements
// Contract enforcement (No code shared, only rules).
// "I signed a contract to be a Driver, so I promise to bring my own license."

// The implements keyword is used to enforce a "contract" on a Class.
// It tells TypeScript: "This class must have all the properties and
// methods defined in this interface."

// When a class implements an interface, the interface acts as a minimum requirement. The class must contain everything listed in the interface,
// but it is free to add as many extra properties and methods as you like.

// 1. The Contract (Interface)
interface Logger {
  log(message: string): void;
  version: string;
}

// 2. The Implementation (Class)
class ConsoleLogger implements Logger {
  // We MUST define 'version' to satisfy the contract
  version: string = "1.0";

  // We MUST define 'log' to satisfy the contract
  log(message: string) {
    console.log(`[Console]: ${message}`);
  }
}

// 3. Usage
const myLogger = new ConsoleLogger();
myLogger.log("System started");

// Implementing Multiple Interfaces

interface Driveable {
  drive(): void;
}

interface Refuelable {
  refuel(amount: number): void;
}

// This Car class must satisfy BOTH interfaces
class SportsCar implements Driveable, Refuelable {
  fuelLevel: number = 0;

  drive() {
    console.log("Vroom! Driving fast.");
    this.fuelLevel -= 1;
  }

  refuel(amount: number) {
    this.fuelLevel += amount;
    console.log(`Added ${amount} gallons.`);
  }
}

// Add Number
interface Addition<T> {
  add(a: T, b: T): T;
}

class AddNumber implements Addition<number> {
  add(a: number, b: number): number {
    return a + b;
  }
}

let myNumberAdditon: AddNumber = new AddNumber();
myNumberAdditon.add(2, 3); // 5
