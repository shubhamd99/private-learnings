// 1. Readonly<Type>
// It makes all properties of an object type read-only.
// Any attempt to modify a property will result in a compiler error.
// Useful for ensuring immutability, especially in state management.

{
  interface ReadonlyUser {
    id: number;
    name: string;
  }

  const user: Readonly<ReadonlyUser> = {
    id: 1,
    name: "John Doe",
  };

  // user.id = 2; // Error: Cannot assign to 'id' because it is a read-only property.
}

// -----------------------------------------------------------------------------------

// 2. ReadonlyArray<Type>
// A built-in type that represents an array where elements cannot be changed.
// Methods that mutate the array (like push, pop, shift, etc.) are missing.

{
  const numbers: ReadonlyArray<number> = [1, 2, 3];
  // numbers.push(4); // Error: Property 'push' does not exist on type 'readonly number[]'.
  // numbers[0] = 10;  // Error: Index signature in type 'readonly number[]' only permits reading.

  // You can also use the shorthand:
  const names: readonly string[] = ["Alice", "Bob"];
  // names[0] = "Charlie"; // Error
}

// -----------------------------------------------------------------------------------

// 3. Type Assertions (Casting)
// Sometimes you know more about a value's type than TypeScript does.
// This is common when working with JSON data, DOM elements, or "any" types.

{
  // TWO SYNTAXES:

  // A. The "as" syntax (Preferred for JSX/React Compatibility)
  const castingValue: any = "Hello World";
  const lengthA = (castingValue as string).length; // TS now knows 'value' is a string.

  // B. The Angle-bracket syntax (Classic Casting)
  // NOTE: This cannot be used in .tsx files (React) because it conflicts with JSX tags.
  const lengthB = (<string>castingValue).length; // Identical to 'as string'

  // Example with a specific value:
  const myString = <string>"Hello";
  console.log(myString.toUpperCase());
}

// Why use casting?
// Imagine fetching data:
// const response = await fetch("...");
// const result = (await response.json()) as User; // We "cast" the unknown JSON to our User type.

// -----------------------------------------------------------------------------------

// Summary of Immuntability in TS:
// 1. Readonly<T>: For object properties.
// 2. ReadonlyArray<T> or readonly T[]: For arrays.
// 3. const (keyword): For variable references.
// 4. as const: For deeply immutable objects/tuples.

{
  const readonlyConfig = {
    api: "https://api.example.com",
    port: 8080,
  } as const;

  // readonlyConfig.port = 9000; // Error: Cannot assign to 'port' because it is a read-only property.
}
