// typeof (For primitives)

function double(value: string | number) {
  if (typeof value === "number") {
    return value * 2; // TS knows value is 'number' here
  }
  return value.repeat(2); // TS knows value is 'string' here
}

// --------------------------------------------------------------------------------------

// instanceof (For Classes)

class Dog {
  bark() {
    console.log("Woof");
  }
}
class Cat {
  meow() {
    console.log("Meow");
  }
}

function makeSound(pet: Dog | Cat) {
  if (pet instanceof Dog) {
    pet.bark(); // Safe to call bark()
  } else {
    pet.meow(); // Must be a Cat
  }
}

// --------------------------------------------------------------------------------------

// Custom Type Predicates (is)
// This is a powerful pattern where you write a function specifically to tell TypeScript
// "Yes, this is that type."

interface Fish {
  swim: () => void;
}
interface Bird {
  fly: () => void;
}

// The return type 'pet is Fish' tells TS:
// "If this function returns true, treat 'pet' as a 'Fish'"
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim(); // TS knows it's a Fish
  } else {
    pet.fly(); // TS knows it's a Bird
  }
}

// --------------------------------------------------------------------------------------

// Async TypeScript (Promise<T>)
// Async functions always return a Promise.
// You must tell TypeScript what the Promise eventually resolves to.

interface User {
  id: number;
  name: string;
}

// 1. Define the return type as Promise<User>
async function getUser(id: number): Promise<User> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { id, name: "Alice" };
}

// 2. Usage
async function main() {
  const user = await getUser(1);
  console.log(user.name); // TS knows 'user' is type User
}

// --------------------------------------------------------------------------------------

// Conditional Types

interface Success {
  message: string;
  code: number;
}
interface Error {
  error: string;
}

// "If T has a message prop, give me T, otherwise ignore it"
type HasMessage<T> = T extends { message: string } ? T : never;

type A = HasMessage<Success>; // Result: Success
type B = HasMessage<Error>; // Result: never

// --------------------------------------------------------------------------------------

// The infer Keyword
// Used inside conditional types to "extract" or "infer" a type variable.
// It's often used to get the return type of a function automatically.

// Getting the return type of ANY function

// "If T is a function, infer its return type (R) and give me R. Otherwise give me any."
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

function getNumber() {
  return 42;
}

// ResultType becomes 'number' automatically
type ResultType = MyReturnType<typeof getNumber>;

// --------------------------------------------------------------------------------------

// Decorators
// A special kind of declaration that can be attached to a class, method, or property.
// They are heavily used in frameworks like Angular and NestJS. (Requires
// "experimentalDecorators": true in tsconfig.json).

// A decorator is just a function
function Logger(target: Function) {
  console.log("Class loaded:", target.name);
}

@Logger
class Calculator {
  // ...
}
// Output when code runs: "Class loaded: Calculator"

// --------------------------------------------------------------------------------------

// Modules vs. Namespaces

// Modern TypeScript uses Modules (ES Modules).
// Avoid Namespaces unless you are maintaining very old legacy code
// or writing declaration files for old libraries

// Modules: File-based. Each file is its own scope. You use export and import.
// Namespaces: Internal modules using the namespace keyword (older, largely obsolete for app code).

// utils.ts
// export const PI = 3.14;

// main.ts
// import { PI } from "./utils";

// --------------------------------------------------------------------------------------

// Declaration Files (.d.ts)

// You want to use a JavaScript library (like lodash or jquery) that
// wasn't written in TypeScript, and it doesn't have built-in types.
// TS will complain it doesn't know what _ or $ is.

// You install or write a .d.ts file.
// This file contains only type definitions, no logic.

// Usually, you just install them: npm install --save-dev @types/lodash
// But if you wrote a custom JS file math.js, you create math.d.ts:
// math.d.ts (No code, only types)
export declare function add(a: number, b: number): number;
export declare function subtract(a: number, b: number): number;
