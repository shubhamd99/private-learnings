// as (Type Assertion):
// You are forcing TypeScript to believe you.
// You are overriding the compiler.
// Attitude: "Shut up TypeScript, I know what I'm doing."

// is (Type Predicate): You are proving to TypeScript that a type is correct
// via a logical check.
// Attitude: "Hey TypeScript, let me run this test to show you what this actually is."

// The is keyword in TypeScript is used to create Custom Type Guards.
// It is known as a Type Predicate.

// It allows you to tell the TypeScript compiler: "If this function returns true,
// then the variable passed into it is definitely Type X."

// -----------------------------------------------------------------------------------

// IS (Type Predicate)

// Without is (TypeScript stays confused):
function isString(test: any): boolean {
  return typeof test === "string";
}

function example(value: any) {
  if (isString(value)) {
    // TypeScript still thinks 'value' is 'any' here.
    // It doesn't know it's safe to use string methods.
    console.log(value.toUpperCase()); // No autocomplete assistance
  }
}

// With is (TypeScript becomes smart):                           vvvvvvvvvvvvvvv (The Magic)
function isString2(test: any): test is string {
  return typeof test === "string";
}

function example2(value: any) {
  if (isString2(value)) {
    // TypeScript NOW knows 'value' is definitely a string
    console.log(value.toUpperCase()); // You get full autocomplete!
  }
}

// Real-World Example: Interface Narrowing
// This is the most common use case. You have a Union Type (e.g., Fish | Bird) and
// need to check which specific one you have based on a unique property.

interface Fish {
  swim: () => void;
}
interface Bird {
  fly: () => void;
}

// The Type Guard Function
// "pet is Fish" connects the boolean result to the type system
function isFish(pet: Fish | Bird): pet is Fish {
  // We check if the 'swim' method exists on the object
  return (pet as Fish).swim !== undefined;
}

function move(animal: Fish | Bird) {
  if (isFish(animal)) {
    // Inside this block, 'animal' is treated purely as Fish
    animal.swim();
  } else {
    // TypeScript acts smart: if it's not Fish, it MUST be Bird
    animal.fly();
  }
}

// Advanced Example: Filtering Arrays

const mixedList = ["A", null, "B", null, "C"];

// 1. Standard Filter (Result is still (string | null)[])
const badFilter = mixedList.filter((item) => item !== null);
// badFilter[0].toLowerCase(); // TS might warn that object is possibly null

// 2. Type Guard Filter (Result is string[])
function notNull(item: string | null): item is string {
  return item !== null;
}

const cleanList = mixedList.filter(notNull);
// cleanList is now strictly string[]
cleanList[0].toLowerCase(); // Safe!

// -----------------------------------------------------------------------------------
// AS (Type Assertion)

const castValue: any = "Hello";

// You force TS to treat it as a number
const length_as = (castValue as number).toFixed(2);

// RUNTIME ERROR!
// "value.toFixed is not a function"
// (because 'value' is actually a string)

// -----------------------------------------------------------------------------------

// Angle-bracket syntax (Alternative casting)
// NOTE: Not usable in .tsx files (JSX)
const length_angle = (<string>castValue).length;
