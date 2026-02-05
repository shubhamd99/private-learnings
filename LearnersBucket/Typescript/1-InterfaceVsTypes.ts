// Interfaces vs. Type Aliases
// Both define the shape of an object.

// Use interface for defining the shape of objects (especially if you are writing object-oriented code with classes).
// It supports "merging" and is generally faster for the compiler.

// Use type for more complex features like Unions,
// Primitives, or advanced function types.

// Interface

interface UserInterface {
  name: string;
  age: number;
}

const userA: UserInterface = {
  name: "Alice",
  age: 30,
};

// Type

type UserType = {
  name: string;
  age: number;
};

const userB: UserType = {
  name: "Bob",
  age: 25,
};

// Extending (Inheritance vs. Intersection)

interface Animal {
  name: string;
}

// Bear gets 'name' from Animal and adds 'honey'
interface Bear extends Animal {
  honey: boolean;
}

const pooh: Bear = { name: "Pooh", honey: true };

// Type (Using Intersection &)

type AnimalType = {
  name: string;
};

// BearType combines AnimalType AND the new properties
type BearType = AnimalType & {
  honey: boolean;
};

const paddington: BearType = { name: "Paddington", honey: true };

// What ONLY type can do (Unions & Primitives)

// Valid: 'ID' can be a string OR a number
type ID = string | number;

// Invalid: You cannot do this with an interface
// interface ID = string | number; // ERROR

// Giving a specific name to a primitive type
type SanitizedString = string;

// Useful for documentation even if it's just a string
type UUID = string;

// What ONLY interface can do (Declaration Merging)

interface Car {
  brand: string;
}

// Later in the code...
interface Car {
  wheels: number;
}

// Result: 'Car' now requires BOTH brand and wheels
const myCar: Car = {
  brand: "Ford",
  wheels: 4,
};

type Bus = {
  brand: string;
};

// Error: Duplicate identifier 'Bus'.
// type Bus = {
//   wheels: number;
// };
